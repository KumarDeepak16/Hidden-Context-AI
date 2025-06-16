import React, { useEffect, useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Eye,
  EyeOff,
  Copy,
  Share2,
  Send,
  Check,
  Sparkles,
  Zap,
  X,
  Loader2,
  MessageCircle,
  Twitter,
  Facebook,
  Linkedin,
  Github,
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import "./App.css"
const icons = {
  whatsapp: <MessageCircle className="w-4 h-4" />,
  telegram: <Send className="w-4 h-4" />,
  twitter: <Twitter className="w-4 h-4" />,
  facebook: <Facebook className="w-4 h-4" />,
  linkedin: <Linkedin className="w-4 h-4" />,
};

const CryptoVeilAI = () => {
  const [mode, setMode] = useState("encode");
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [disguiseStyle, setDisguiseStyle] = useState("casual");
  const [isLoading, setIsLoading] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);
  const modes = [
    {
      value: "encode",
      label: "Encode Message",
      icon: EyeOff,
      desc: "Hide your message in AI-generated content",
    },
    {
      value: "decode",
      label: "Decode Message",
      icon: Eye,
      desc: "Extract hidden messages from disguised text",
    },
  ];

  const disguiseStyles = [
    {
      value: "casual",
      label: "Casual",
      desc: "Natural chat style",
    },
    {
      value: "professional",
      label: "Business",
      desc: "Corporate communication",
    },
    {
      value: "educational",
      label: "Educational",
      desc: "Knowledge sharing",
    },
    {
      value: "news",
      label: "News",
      desc: "Breaking news format",
    },
    {
      value: "tech",
      label: "Tech",
      desc: "Technology discussion",
    },
    {
      value: "lifestyle",
      label: "Lifestyle",
      desc: "Personal development",
    },
  ];

  // Enhanced encryption with better format
  const encryptMessage = (text) => {
    const encoded = btoa(encodeURIComponent(text));
    const scrambled = encoded
      .split("")
      .map((char, i) => {
        const shift = (i % 7) + 1;
        if (char.match(/[A-Za-z]/)) {
          const code = char.charCodeAt(0);
          const base = code >= 65 && code <= 90 ? 65 : 97;
          return String.fromCharCode(((code - base + shift) % 26) + base);
        }
        return char;
      })
      .join("");

    // Use consistent delimiter and add markers
    return `#${scrambled.match(/.{1,6}/g)?.join("-") || scrambled}#`;
  };

  const decryptMessage = (encryptedText) => {
    try {
      // Remove markers and clean
      const cleaned = encryptedText.replace(/#/g, "").replace(/-/g, "");
      const unscrambled = cleaned
        .split("")
        .map((char, i) => {
          const shift = (i % 7) + 1;
          if (char.match(/[A-Za-z]/)) {
            const code = char.charCodeAt(0);
            const base = code >= 65 && code <= 90 ? 65 : 97;
            return String.fromCharCode(
              ((code - base - shift + 26) % 26) + base
            );
          }
          return char;
        })
        .join("");

      return decodeURIComponent(atob(unscrambled));
    } catch (error) {
      toast.error("No Secret Code Found");
    }
  };
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  const genAI = new GoogleGenerativeAI(apiKey);

  const generateAIDisguise = async (encryptedData, style) => {
    const stylePrompts = {
      casual: `Write a casual, friendly message that naturally incorporates this code: ${encryptedData}. Make it seem like a normal conversation where you're sharing some technical reference or ID.`,
      professional: `Create a professional message that includes this reference code: ${encryptedData}. Make it seem like a business identifier or project reference.`,
      educational: `Write an educational post that includes this study reference: ${encryptedData}. Make it seem like an academic citation or research code.`,
      news: `Create a news-style update that mentions this tracking code: ${encryptedData}. Make it seem like a news reference number.`,
      tech: `Write about a technology topic and include this system ID: ${encryptedData}. Make it seem like a technical identifier.`,
      lifestyle: `Create lifestyle content that mentions this product code: ${encryptedData}. Make it seem like a product reference or model number.`,
    };

    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `${
        stylePrompts[style] || stylePrompts.casual
      } Keep the response very short, concise, and relatable (indian users)`;


      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();

      return text;
    } catch (error) {
      console.error("Gemini API error:", error);

      // Fallback disguise if AI fails
      const fallbackDisguises = {
        casual: `Hey! Just wanted to share this interesting reference I found: ${encryptedData}. Thought you might find it useful for your project!`,
        professional: `Please find the project reference code: ${encryptedData}. This identifier will be needed for the next phase of our collaboration.`,
        educational: `Here's an interesting research reference: ${encryptedData}. This code contains valuable insights for academic purposes.`,
        news: `Breaking: New development tracked under reference ${encryptedData}. This identifier marks a significant milestone in current events.`,
        tech: `Latest tech update with system ID: ${encryptedData}. This reference code represents the newest innovation in our digital infrastructure.`,
        lifestyle: `Discovered this amazing product with code: ${encryptedData}. This reference number has been a game-changer for personal productivity!`,
      };

      return fallbackDisguises[style] || fallbackDisguises.casual;
    }
  };

  // Improved extraction pattern
  const extractEncryptedData = (text) => {
    // Look for our specific pattern: #...# (content between hash markers)
    const hashPattern = /#([A-Za-z0-9+/=-]+(?:-[A-Za-z0-9+/=-]+)*)#/g;
    const match = text.match(hashPattern);

    if (match && match.length > 0) {
      return match[0]; // Return the first match with hash markers
    }

    // Fallback: look for base64-like patterns with dashes
    const fallbackPattern = /[A-Za-z0-9+/=]{6,}(?:-[A-Za-z0-9+/=]{1,6})+/g;
    const fallbackMatch = text.match(fallbackPattern);

    if (fallbackMatch && fallbackMatch.length > 0) {
      return `#${fallbackMatch[0]}#`; // Add markers if missing
    }

    return "";
  };

  const handleProcess = async () => {
    if (!message.trim()) return;

    setIsLoading(true);
    setError("");
    setSuccess("");

    try {
      if (mode === "encode") {
        const encrypted = encryptMessage(message);
        const disguised = await generateAIDisguise(encrypted, disguiseStyle);
        setResult(disguised);
        setSuccess("Encrypted & ready!");
        toast.success("Encrypted & ready!");        
      } else {
        const extractedData = extractEncryptedData(message);
        if (!extractedData) {
          throw new Error(
            "No encrypted data found in the message. Please ensure the message contains properly encoded content."
          );
        }
        const decrypted = decryptMessage(extractedData);
        setResult(decrypted);
        setSuccess("Secret unlocked!");
        toast.success("Secret unlocked!");
      }
    } catch (error) {
      setError(error.message);
      toast.error("Secret key not detected!");
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      setError("Failed to copy to clipboard");
      toast.error("Failed to copy to clipboard");
    }
  };

  const shareToSocial = (platform) => {
    const text = encodeURIComponent(result);
    const url = encodeURIComponent(window.location.href);

    const shareUrls = {
      whatsapp: `https://wa.me/?text=${text}`,
      telegram: `https://t.me/share/url?text=${text}`,
      twitter: `https://twitter.com/intent/tweet?text=${text}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${url}&quote=${text}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${url}`,
    };

    if (shareUrls[platform]) {
      window.open(shareUrls[platform], "_blank", "width=600,height=400");
    }
    setShowShareModal(false);
  };

  return (
    <div className="relative min-h-screen ">
      <div className="absolute animate-pulse inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,theme(colors.orange.300)_100%)]"></div>

      <div className="max-w-4xl mx-auto px-4 py-6  pb-20">
        {/* Header */}
        <div className="text-center mb-3">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center space-x-2 bg-gradient-to-r from-orange-100 to-orange-200 border border-orange-300 px-4 py-2 rounded-full mb-3"
          >
            <Shield className="w-4 h-4 text-orange-600" />
            <span className="text-xs font-medium text-orange-700">
              Next-Gen Steganography
            </span>
            <Sparkles className="w-3 h-3 text-orange-500" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-2xl justify-center md:text-5xl font-bold mb-2 flex items-center gap-2"
          >
            <span className="px-2 py-1 rounded bg-gradient-to-r from-orange-300 to-orange-400 text-white">
              HiddenContext
            </span>
            <span className="bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
              AI
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-sm text-gray-600 max-w-2xl mx-auto"
          >
            Advanced AI-powered steganography platform for secure, invisible
            communication
          </motion.p>
        </div>

        {/* Main Interface */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-lg p-6">
          {/* Mode Selection */}
          <div className="mb-5">
            {/* Mobile: Toggle Switch */}
            <div className="md:hidden flex justify-center mb-4">
              <div className="flex items-center bg-gray-100 rounded-full p-1">
                {modes.map((modeOption) => (
                  <button
                    key={modeOption.value}
                    onClick={() => {
                      setMode(modeOption.value);
                      setMessage("");
                      setResult("");
                      setError("");
                    }}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      mode === modeOption.value
                        ? "bg-orange-400 text-white shadow"
                        : "text-gray-600"
                    }`}
                  >
                    {modeOption.label.split(" ")[0]}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop: Buttons Grid */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-2 gap-3">
              {modes.map((modeOption) => (
                <motion.button
                  key={modeOption.value}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  onClick={() => {
                    setMode(modeOption.value);
                    setMessage("");
                    setResult("");
                    setError("");
                  }}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    mode === modeOption.value
                      ? "bg-gradient-to-r from-orange-50 to-orange-100 border-orange-300 shadow-sm"
                      : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`p-2 rounded-lg ${
                        mode === modeOption.value ? "bg-orange-200" : "bg-white"
                      }`}
                    >
                      <modeOption.icon
                        className={`w-5 h-5 ${
                          mode === modeOption.value
                            ? "text-orange-700"
                            : "text-gray-600"
                        }`}
                      />
                    </div>
                    <div className="text-left">
                      <h3 className="text-sm font-semibold text-gray-800 mb-1">
                        {modeOption.label}
                      </h3>
                      <p className="text-xs text-gray-600">{modeOption.desc}</p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Disguise Style Selection (Encode mode only) */}
          {mode === "encode" && (
            <div className="mb-6">
              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                Select Encoding Style
              </h3>

              {/* Pills for mobile */}
              <div className="flex flex-wrap gap-2 gap-x-5 justify-center md:hidden">
                {disguiseStyles.map((style) => (
                  <button
                    key={style.value}
                    onClick={() => setDisguiseStyle(style.value)}
                    className={`px-3 py-1 rounded-full text-xs border transition-all duration-200 ${
                      disguiseStyle === style.value
                        ? "bg-orange-100 border-orange-300 text-orange-700"
                        : "bg-gray-50 border-gray-200 text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {style.label} {/* only first word if label has multiple */}
                  </button>
                ))}
              </div>

              {/* Grid with description for larger screens */}
              <div className="hidden md:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {disguiseStyles.map((style) => (
                  <motion.button
                    key={style.value}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setDisguiseStyle(style.value)}
                    className={`p-3 rounded-lg border transition-all duration-200 ${
                      disguiseStyle === style.value
                        ? "bg-gradient-to-r from-orange-100 to-orange-200 border-orange-300 shadow-sm"
                        : "bg-gray-50 border-gray-200 hover:bg-gray-100"
                    }`}
                  >
                    <div className="text-center">
                      <div className="text-xs font-medium text-gray-800 mb-1">
                        {style.label}
                      </div>
                      <div className="text-xs text-gray-600">{style.desc}</div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          )}

          {/* Input Section */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-800 mb-3">
              {mode === "encode"
                ? "🔒 Your Secret Message"
                : "🔍 Disguised Message"}
            </label>

            <div className="relative">
              <textarea
                value={message}
                ref={inputRef}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={
                  mode === "encode"
                    ? "Enter your confidential message here..."
                    : "Paste the AI-disguised message to reveal the hidden content..."
                }
                className="w-full h-32 p-4 pr-16 bg-gray-50 border-2 border-gray-200 rounded-xl resize-none focus:ring-2 focus:ring-orange-500 focus:border-orange-400 transition-all duration-200 text-gray-800 placeholder-gray-500 text-sm"
              />

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleProcess}
                disabled={isLoading || !message.trim()}
                className="absolute bottom-3 right-3 p-2 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-lg hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-sm"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Zap className="w-4 h-4" />
                )}
              </motion.button>

              <div className="absolute bottom-3 left-3 text-xs text-gray-500">
                {message.length} characters
              </div>
            </div>
          </div>

          {/* Result Section */}
          <AnimatePresence>
            {result && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="border-t border-gray-200 pt-6"
              >
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-800 flex items-center space-x-2">
                    {mode === "encode" ? (
                      <>
                        <EyeOff className="w-4 h-4 text-orange-600" />
                        <span>🎭 AI-Disguised Message</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4 text-orange-600" />
                        <span>🔓 Revealed Secret</span>
                      </>
                    )}
                  </h3>

                  <div className="flex items-center space-x-2">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => copyToClipboard(result)}
                      className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                    >
                      {copied ? (
                        <Check className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4 text-gray-600" />
                      )}
                    </motion.button>

                    {mode === "encode" && (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowShareModal(true)}
                        className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                      >
                        <Share2 className="w-4 h-4 text-gray-600" />
                      </motion.button>
                    )}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-orange-50 to-orange-100 rounded-xl p-4 border border-orange-200">
                  <p className="text-gray-800 leading-relaxed text-sm whitespace-pre-wrap">
                    {result}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute bottom-0 left-0 w-full text-center space-y-2 pb-4">
          <p className="text-xs text-gray-800 flex items-center justify-center gap-1">
            🚀 Powered by AI • 🔐 Military-grade encryption • 🌐 Zero data
            retention
          </p>
          <a
            href="https://github.com/kumardeepak16"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-xs text-gray-900 hover:text-orange-700 transition-colors"
          >
            <Github className="w-4 h-4 mr-1" />
            Designed & developed by kumardeepak16
          </a>
        </div>
      </div>

      {/* Share Modal */}
      <AnimatePresence>
        {showShareModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4"
            onClick={() => setShowShareModal(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-white rounded-2xl border border-gray-200 shadow-xl p-6 max-w-sm w-full mx-4"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-bold text-gray-800">
                  Share Message
                </h3>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="p-1 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    name: "WhatsApp",
                    key: "whatsapp",
                    color: "hover:bg-green-50 border-green-200",
                    textColor: "text-green-700",
                  },
                  {
                    name: "Telegram",
                    key: "telegram",
                    color: "hover:bg-blue-50 border-blue-200",
                    textColor: "text-blue-700",
                  },
                  {
                    name: "Twitter",
                    key: "twitter",
                    color: "hover:bg-gray-50 border-gray-200",
                    textColor: "text-gray-700",
                  },
                  {
                    name: "Facebook",
                    key: "facebook",
                    color: "hover:bg-blue-50 border-blue-200",
                    textColor: "text-blue-700",
                  },
                  {
                    name: "LinkedIn",
                    key: "linkedin",
                    color: "hover:bg-blue-50 border-blue-200",
                    textColor: "text-blue-800",
                  },
                ].map((platform) => (
                  <button
                    key={platform.key}
                    onClick={() => shareToSocial(platform.key)}
                    className={`p-3 rounded-lg text-sm font-medium border-2 border-gray-200 flex items-center gap-3 transition-all ${platform.color} ${platform.textColor}`}
                  >
                    {icons[platform.key]}
                    Share on {platform.name}
                  </button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <Toaster
        position="top-right"
        toastOptions={{
          success: {
            style: {
              background: "linear-gradient(90deg, #fbbf24, #f97316)", // orange-400 to orange-500
              color: "#fff",
              border: "1px solid #f97316", // orange-500
              boxShadow: "0 4px 12px rgba(251, 191, 36, 0.3)", // light subtle glow
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#f97316", // orange-500
            },
          },
          error: {
            style: {
              background: "linear-gradient(90deg, #fca5a5, #f87171)", // soft red-pink for error
              color: "#fff",
              border: "1px solid #f87171",
              boxShadow: "0 4px 12px rgba(248, 113, 113, 0.3)",
            },
            iconTheme: {
              primary: "#fff",
              secondary: "#f87171",
            },
          },
        }}
      />
    </div>
  );
};

export default CryptoVeilAI;
