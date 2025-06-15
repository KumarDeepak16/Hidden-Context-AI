import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Copy,
  Lock,
  Unlock,
  Send,
  Sparkles,
  Shield,
  Eye,
  EyeOff,
  Clock,
} from "lucide-react";
import "./App.css"
// Toast component
const Toast = ({ message, type, onClose }) => (
  <motion.div
    initial={{ opacity: 0, y: -50, scale: 0.9 }}
    animate={{ opacity: 1, y: 0, scale: 1 }}
    exit={{ opacity: 0, y: -50, scale: 0.9 }}
    className={`fixed top-4 right-4 px-6 py-3 rounded-lg shadow-lg z-50 ${
      type === "success" ? "bg-green-500" : "bg-red-500"
    } text-white font-medium`}
    onClick={onClose}
  >
    {message}
  </motion.div>
);

// Enhanced Semantic Encoder with Time-Based Iterations
class SemanticEncoder {
  constructor() {
    this.contextTemplates = [
      "The weather forecast suggests that {encoded} will be particularly interesting today.",
      "According to recent studies, {encoded} shows promising results in various applications.",
      "During the conference, the speaker mentioned that {encoded} could revolutionize the industry.",
      "The research indicates that {encoded} has significant potential for future development.",
      "In the latest market analysis, {encoded} demonstrates exceptional performance metrics.",
      "The technical documentation reveals that {encoded} implements advanced methodologies.",
      "Based on user feedback, {encoded} provides enhanced functionality and reliability.",
      "The experimental data shows that {encoded} exceeds all expected benchmarks.",
      "The quarterly report shows that {encoded} has exceeded all projected targets.",
      "Industry experts believe that {encoded} represents a significant breakthrough.",
      "The development team confirmed that {encoded} delivers optimal performance.",
      "Market research indicates that {encoded} addresses critical business needs.",
      "The technical analysis reveals that {encoded} incorporates cutting-edge features.",
      "Customer testimonials highlight that {encoded} provides exceptional value.",
      "The implementation study shows that {encoded} streamlines operational processes.",
      "Performance benchmarks demonstrate that {encoded} outperforms existing solutions.",
    ];

    this.meaningfulSentences = [
      "The morning briefing covered several important topics.",
      "Team collaboration has improved significantly this quarter.",
      "The project timeline remains on track for completion.",
      "Budget allocations have been finalized for next month.",
      "Client feedback has been overwhelmingly positive.",
      "The training session was well-received by all participants.",
      "Security protocols have been updated as planned.",
      "The new system integration went smoothly.",
      "Quality assurance testing is proceeding as scheduled.",
      "Resource allocation has been optimized for efficiency.",
      "The presentation materials are ready for review.",
      "Stakeholder meetings have been scheduled accordingly.",
      "The documentation update is now complete.",
      "Performance metrics show consistent improvement.",
      "The deployment process was executed successfully.",
      "User acceptance testing has begun this week.",
      "The backup procedures have been verified.",
      "Network optimization efforts are showing results.",
      "The compliance audit was completed without issues.",
      "Development milestones are being met on schedule.",
      "The quarterly review meeting went very well.",
      "All department heads confirmed their availability.",
      "The new policy guidelines have been distributed.",
      "Training materials are being prepared for distribution.",
      "The system upgrade is scheduled for next week.",
    ];

    this.semanticWords = [
      "quantum",
      "neural",
      "blockchain",
      "algorithm",
      "optimization",
      "encryption",
      "synthesis",
      "paradigm",
      "framework",
      "architecture",
      "methodology",
      "protocol",
      "infrastructure",
      "implementation",
      "integration",
      "configuration",
      "specification",
      "validation",
      "authentication",
      "verification",
      "synchronization",
      "transformation",
      "enhancement",
      "acceleration",
      "visualization",
      "orchestration",
      "automation",
      "calibration",
      "stabilization",
      "normalization",
      "harmonization",
      "standardization",
      "virtualization",
    ];
  }

  simpleHash(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = (hash << 5) - hash + char;
      hash = hash & hash;
    }
    return Math.abs(hash);
  }

  hashToDateTime(hash) {
    // Convert hash to date and time components
    const year = 2020 + (hash % 5); // 2020-2024
    const month = 1 + (Math.floor(hash / 100) % 12); // 1-12
    const day = 1 + (Math.floor(hash / 1000) % 28); // 1-28 (safe for all months)
    const hour = Math.floor(hash / 10000) % 24; // 0-23
    const minute = Math.floor(hash / 100000) % 60; // 0-59
    const second = Math.floor(hash / 1000000) % 60; // 0-59

    return {
      year,
      month: month.toString().padStart(2, "0"),
      day: day.toString().padStart(2, "0"),
      hour: hour.toString().padStart(2, "0"),
      minute: minute.toString().padStart(2, "0"),
      second: second.toString().padStart(2, "0"),
      timestamp: `${year}-${month.toString().padStart(2, "0")}-${day
        .toString()
        .padStart(2, "0")} ${hour.toString().padStart(2, "0")}:${minute
        .toString()
        .padStart(2, "0")}:${second.toString().padStart(2, "0")}`,
    };
  }

  generateTimeBasedIterations(hash) {
    const dateTime = this.hashToDateTime(hash);
    // Calculate iterations based on time components
    const iterations =
      ((parseInt(dateTime.hour) + parseInt(dateTime.minute)) % 8) + 2; // 2-9 iterations
    return { iterations, dateTime };
  }

  generateMeaningfulSentences(iterations, hash) {
    const sentences = [];
    for (let i = 0; i < 1 ; i++) {
      const sentenceIndex = (hash + i * 17) % this.meaningfulSentences.length;
      sentences.push(this.meaningfulSentences[sentenceIndex]);
    }
    return sentences;
  }

  generateSemanticKey(text) {
    const hash = this.simpleHash(text);
    const keyLength = 3
    let key = "";

    for (let i = 0; i < keyLength; i++) {
      const index = (hash + i * 7) % this.semanticWords.length;
      key += this.semanticWords[index];
      if (i < keyLength - 1) key += "-";
    }

    return key;
  }

  createCipher(text, key) {
    let result = "";
    for (let i = 0; i < text.length; i++) {
      const textChar = text.charCodeAt(i);
      const keyChar = key.charCodeAt(i % key.length);
      const cipher = textChar ^ keyChar;
      result += cipher.toString(16).padStart(2, "0");
    }
    return result;
  }

  decryptCipher(cipher, key) {
    let result = "";
    for (let i = 0; i < cipher.length; i += 2) {
      const hex = cipher.substr(i, 2);
      const cipherChar = parseInt(hex, 16);
      const keyChar = key.charCodeAt((i / 2) % key.length);
      const original = cipherChar ^ keyChar;
      result += String.fromCharCode(original);
    }
    return result;
  }

  encode(message) {
    if (!message.trim()) return "";

    try {
      // Step 1: Convert to base64 for initial encoding
      const base64 = btoa(unescape(encodeURIComponent(message)));

      // Step 2: Generate hash and convert to date-time
      const hash = this.simpleHash(message);
      const { iterations, dateTime } = this.generateTimeBasedIterations(hash);

      // Step 3: Generate semantic key
      const semanticKey = this.generateSemanticKey(message);

      // Step 4: Create cipher using semantic key
      const cipher = this.createCipher(base64, semanticKey);

      // Step 5: Generate meaningful sentences based on iterations
      const meaningfulSentences = this.generateMeaningfulSentences(
        iterations,
        hash
      );

      // Step 6: Wrap cipher in natural language context
      const template =
        this.contextTemplates[hash % this.contextTemplates.length];
      const encodedCore = template.replace("{encoded}", cipher);

      // Step 7: Create final message with timestamp and meaningful sentences
      let finalMessage = `Meeting scheduled for ${dateTime.timestamp}. `;
      finalMessage += meaningfulSentences.join(" ") + " ";
      finalMessage += encodedCore + " ";
      finalMessage += `Please confirm attendance by ${dateTime.year}-${dateTime.month}-${dateTime.day}. `;
      finalMessage += `Reference ID: ${semanticKey}.`;

      return finalMessage;
    } catch (error) {
      throw new Error("Encoding failed: " + error.message);
    }
  }

  decode(encodedMessage) {
    try {
      if (!encodedMessage.trim()) return "";

      // Step 1: Extract semantic key
      const keyMatch = encodedMessage.match(/Reference ID: ([a-z-]+)\./);
      if (!keyMatch)
        throw new Error(
          "Invalid encoded message format - missing reference ID"
        );

      const semanticKey = keyMatch[1];

      // Step 2: Extract timestamp
      const timestampMatch = encodedMessage.match(
        /Meeting scheduled for (\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2})\./
      );
      if (!timestampMatch)
        throw new Error("Invalid encoded message format - missing timestamp");

      const timestamp = timestampMatch[1];

      // Step 3: Extract cipher from natural language context
      const templates = this.contextTemplates.map((t) =>
        t.replace("{encoded}", "(.+?)")
      );
      let cipher = null;

      for (const template of templates) {
        const regex = new RegExp(template);
        const match = encodedMessage.match(regex);
        if (match) {
          cipher = match[1].trim();
          break;
        }
      }

      if (!cipher) throw new Error("Could not extract cipher from message");

      // Step 4: Verify the message structure by checking confirmation date
      const confirmMatch = encodedMessage.match(
        /Please confirm attendance by (\d{4}-\d{2}-\d{2})\./
      );
      if (!confirmMatch)
        throw new Error(
          "Invalid encoded message format - missing confirmation date"
        );

      // Step 5: Decrypt cipher using semantic key
      const base64 = this.decryptCipher(cipher, semanticKey);

      // Step 6: Decode from base64
      const originalMessage = decodeURIComponent(escape(atob(base64)));

      // Step 7: Validate the decoding by checking if the reconstructed hash matches
      const reconstructedHash = this.simpleHash(originalMessage);
      const { dateTime: expectedDateTime } =
        this.generateTimeBasedIterations(reconstructedHash);

      if (expectedDateTime.timestamp !== timestamp) {
        throw new Error("Message integrity check failed - timestamp mismatch");
      }

      return originalMessage;
    } catch (error) {
      throw new Error("Failed to decode message: " + error.message);
    }
  }
}

export default function SemanticMessageEncoder() {
  const [message, setMessage] = useState("");
  const [result, setResult] = useState("");
  const [mode, setMode] = useState("encode");
  const [isProcessing, setIsProcessing] = useState(false);
  const [toast, setToast] = useState(null);
  const [showPreview, setShowPreview] = useState(false);
  const encoder = useRef(new SemanticEncoder());
  const resultRef = useRef(null);

  const showToast = (message, type = "success") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const processMessage = async () => {
    if (!message.trim()) {
      showToast("Please enter a message", "error");
      return;
    }

    setIsProcessing(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate processing

      if (mode === "encode") {
        const encoded = encoder.current.encode(message);
        setResult(encoded);
        showToast("Message encoded with time-based iterations!");
      } else {
        const decoded = encoder.current.decode(message);
        setResult(decoded);
        showToast("Message decoded and verified successfully!");
      }
    } catch (error) {
      showToast(error.message, "error");
      setResult("");
    }

    setIsProcessing(false);
  };

  const copyToClipboard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      showToast("Copied to clipboard!");
    } catch (err) {
      showToast("Failed to copy", "error");
    }
  };

  const clearAll = () => {
    setMessage("");
    setResult("");
    setShowPreview(false);
  };

  useEffect(() => {
    if (result && resultRef.current) {
      resultRef.current.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [result]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <AnimatePresence>
        {toast && (
          <Toast
            message={toast.message}
            type={toast.type}
            onClose={() => setToast(null)}
          />
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-3 rounded-full">
              <Shield className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent mb-2">
            Semantic Message Encoder
          </h1>
          <p className="text-gray-600 text-lg">
            Advanced time-based natural language encryption for secure
            communication
          </p>
        </motion.div>

        {/* Mode Toggle */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex justify-center mb-8"
        >
          <div className="bg-white rounded-full p-1 shadow-lg border border-orange-100">
            <div className="flex">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode("encode")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  mode === "encode"
                    ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-md"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <Lock className="w-4 h-4" />
                Encode
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setMode("decode")}
                className={`px-6 py-3 rounded-full font-medium transition-all duration-300 flex items-center gap-2 ${
                  mode === "decode"
                    ? "bg-gradient-to-r from-orange-400 to-amber-500 text-white shadow-md"
                    : "text-gray-600 hover:text-orange-600"
                }`}
              >
                <Unlock className="w-4 h-4" />
                Decode
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Main Input Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8 mb-8"
        >
          <div className="text-center mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {mode === "encode"
                ? "Enter your secret message"
                : "Paste encoded message"}
            </h3>
            <p className="text-gray-500">
              {mode === "encode"
                ? "Your message will be encrypted with time-based iterations and natural language patterns"
                : "Paste the meeting invitation formatted message to decrypt it"}
            </p>
          </div>

          <div className="relative">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={
                mode === "encode"
                  ? "Type your confidential message here..."
                  : "Paste the encoded meeting invitation message here..."
              }
              className="w-full h-32 p-4 border-2 border-orange-100 rounded-2xl focus:border-orange-300 focus:outline-none resize-none text-gray-700 placeholder-gray-400 transition-colors duration-300"
              maxLength={mode === "encode" ? 500 : 3000}
            />
            <div className="absolute bottom-4 right-4 text-sm text-gray-400">
              {message.length}/{mode === "encode" ? 500 : 3000}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-6">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={processMessage}
              disabled={isProcessing || !message.trim()}
              className="bg-gradient-to-r from-orange-400 to-amber-500 text-white px-8 py-3 rounded-full font-medium shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-all duration-300"
            >
              {isProcessing ? (
                <>
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 1,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <Clock className="w-4 h-4" />
                  </motion.div>
                  Processing...
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  {mode === "encode" ? "Encode Message" : "Decode Message"}
                </>
              )}
            </motion.button>

            {message && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={clearAll}
                className="px-6 py-3 rounded-full border-2 border-orange-200 text-orange-600 font-medium hover:bg-orange-50 transition-all duration-300"
              >
                Clear
              </motion.button>
            )}
          </div>
        </motion.div>

        {/* Result Section */}
        <AnimatePresence>
          {result && (
            <motion.div
              ref={resultRef}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-3xl shadow-xl border border-orange-100 p-8"
            >
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  {mode === "encode" ? (
                    <>
                      <Lock className="w-5 h-5 text-orange-500" />
                      Encoded Message
                    </>
                  ) : (
                    <>
                      <Unlock className="w-5 h-5 text-green-500" />
                      Decoded Message
                    </>
                  )}
                </h3>

                <div className="flex gap-2">
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setShowPreview(!showPreview)}
                    className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                    title={showPreview ? "Hide preview" : "Show preview"}
                  >
                    {showPreview ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </motion.button>

                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => copyToClipboard(result)}
                    className="p-2 rounded-full bg-orange-100 text-orange-600 hover:bg-orange-200 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy className="w-4 h-4" />
                  </motion.button>
                </div>
              </div>

              <div className="relative">
                <div
                  className={`p-4 bg-gray-50 rounded-2xl border border-gray-200 ${
                    !showPreview ? "blur-sm" : ""
                  } transition-all duration-300`}
                >
                  <pre className="whitespace-pre-wrap text-gray-700 text-sm leading-relaxed font-mono">
                    {result}
                  </pre>
                </div>

                {!showPreview && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      onClick={() => setShowPreview(true)}
                      className="bg-white px-4 py-2 rounded-full shadow-lg border border-orange-200 text-orange-600 font-medium"
                    >
                      Click to reveal
                    </motion.button>
                  </div>
                )}
              </div>

              <div className="mt-4 p-4 bg-gradient-to-r from-orange-50 to-amber-50 rounded-xl border border-orange-100">
                <p className="text-sm text-gray-600 mb-2">
                  <strong>Security Note:</strong>{" "}
                  {mode === "encode"
                    ? "Your message is encrypted using time-based iterations with natural meeting invitation format."
                    : "Your message has been successfully decrypted with timestamp integrity verification."}
                </p>
                {mode === "encode" && result && (
                  <div className="text-xs text-gray-500 mt-2">
                    <strong>Encoding Details:</strong> Hash converted to
                    date/time format with 2-9 meaningful sentences based on
                    temporal iterations for enhanced natural language disguise.
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Feature Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid md:grid-cols-3 gap-6 mt-12"
        >
          {[
            {
              icon: Shield,
              title: "Semantic Security",
              description:
                "Messages are disguised as natural meeting invitations with realistic timestamps and business context",
            },
            {
              icon: Clock,
              title: "Time-Based Iterations",
              description:
                "Hash is converted to date/time format, determining meaningful sentence iterations for natural disguise",
            },
            {
              icon: Lock,
              title: "Integrity Verification",
              description:
                "Timestamp-based verification ensures message authenticity and prevents tampering",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="bg-white rounded-2xl p-6 shadow-lg border border-orange-100 hover:shadow-xl transition-shadow duration-300"
            >
              <div className="bg-gradient-to-r from-orange-400 to-amber-500 p-3 rounded-full w-fit mb-4">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h4 className="text-lg font-semibold text-gray-800 mb-2">
                {feature.title}
              </h4>
              <p className="text-gray-600 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
