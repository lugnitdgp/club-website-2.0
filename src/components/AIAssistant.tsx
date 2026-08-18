"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2, X, AlertTriangle, FileText, ExternalLink, BookOpen, HelpCircle } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { logo, penguinSticker } from "@/assets";

import { useTheme } from "next-themes";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// ─── PYQ Payload Types ────────────────────────────────────────────────────────
interface PYQFile {
  year: string;
  exam_type: string;
  label: string;
  url: string;
}

interface PYQSubject {
  code: string;
  files: PYQFile[];
}

interface PYQResultsPayload {
  type: "results";
  semester: number;
  message: string;
  subjects: PYQSubject[];
}

interface PYQClarifyPayload {
  type: "clarify";
  message: string;
  options: string[];
}

interface PYQEmptyPayload {
  type: "empty";
  code: string;
  message: string;
}

interface PYQNotFoundPayload {
  type: "not_found";
  message: string;
  options: string[];
}

type PYQPayload = PYQResultsPayload | PYQClarifyPayload | PYQEmptyPayload | PYQNotFoundPayload;

// ─── PYQ Card Renderer ────────────────────────────────────────────────────────
function PYQCard({ payload }: { payload: PYQPayload }) {
  if (payload.type === "results") {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <div className="h-6 w-6 rounded-full bg-purple-100 dark:bg-purple-900/40 flex items-center justify-center flex-shrink-0">
            <BookOpen size={12} className="text-purple-600 dark:text-purple-400" />
          </div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-100 leading-snug">
            {payload.message}
          </p>
        </div>
        {payload.subjects.map((subject) => (
          <div
            key={subject.code}
            className="rounded-xl border border-purple-200/60 dark:border-purple-800/40 bg-purple-50/50 dark:bg-purple-950/20 overflow-hidden"
          >
            <div className="flex items-center gap-2 px-3 py-2 bg-purple-100/60 dark:bg-purple-900/30 border-b border-purple-200/50 dark:border-purple-800/30">
              <FileText size={12} className="text-purple-600 dark:text-purple-400 flex-shrink-0" />
              <span className="text-[11px] font-bold text-purple-700 dark:text-purple-300 tracking-wide uppercase">
                {subject.code}
              </span>
            </div>
            <div className="p-2 space-y-1.5">
              {subject.files.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between gap-2 px-2.5 py-2 rounded-lg bg-white/70 dark:bg-black/30 border border-white/60 dark:border-white/10 hover:border-purple-400/50 dark:hover:border-purple-500/50 hover:bg-purple-50 dark:hover:bg-purple-950/40 transition-all duration-150 group"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className={`text-[9px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider flex-shrink-0 ${
                        file.exam_type === "endsem"
                          ? "bg-indigo-100 text-indigo-700 dark:bg-indigo-900/40 dark:text-indigo-300"
                          : "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300"
                      }`}
                    >
                      {file.exam_type === "endsem" ? "End" : "Mid"}
                    </span>
                    <span className="text-[11px] font-medium text-slate-700 dark:text-slate-200 truncate">
                      {file.label}
                    </span>
                  </div>
                  <ExternalLink
                    size={11}
                    className="text-slate-400 group-hover:text-purple-500 dark:text-slate-600 dark:group-hover:text-purple-400 flex-shrink-0 transition-colors"
                  />
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (payload.type === "not_found") {
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="h-6 w-6 rounded-full bg-red-100 dark:bg-red-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <AlertTriangle size={12} className="text-red-600 dark:text-red-400" />
          </div>
          <div className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed [&>p]:mb-1 last:[&>p]:mb-0">
            <ReactMarkdown
              components={{
                strong: ({ node, ...props }) => <strong className="font-semibold text-slate-900 dark:text-white" {...props} />,
                em: ({ node, ...props }) => <em className="italic" {...props} />
              }}
            >
              {payload.message}
            </ReactMarkdown>
          </div>
        </div>
        {payload.options && payload.options.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-8">
            {payload.options.map((opt) => (
              <span
                key={opt}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 border border-red-200 dark:border-red-700/40"
              >
                {opt}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  if (payload.type === "clarify") {
    return (
      <div className="space-y-2">
        <div className="flex items-start gap-2">
          <div className="h-6 w-6 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center flex-shrink-0 mt-0.5">
            <HelpCircle size={12} className="text-amber-600 dark:text-amber-400" />
          </div>
          <p className="text-xs text-slate-700 dark:text-slate-200 leading-relaxed">
            {payload.message}
          </p>
        </div>
        {payload.options && payload.options.length > 0 && (
          <div className="flex flex-wrap gap-1.5 pl-8">
            {payload.options.map((opt) => (
              <span
                key={opt}
                className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-700/40"
              >
                {opt}
              </span>
            ))}
          </div>
        )}
      </div>
    );
  }

  // type === "empty"
  return (
    <div className="flex items-start gap-2">
      <div className="h-6 w-6 rounded-full bg-slate-100 dark:bg-slate-800/60 flex items-center justify-center flex-shrink-0 mt-0.5">
        <FileText size={12} className="text-slate-500 dark:text-slate-400" />
      </div>
      <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
        {payload.message}
      </p>
    </div>
  );
}

// ─── Helpers to detect a PYQ payload ─────────────────────────────────────────
function isPYQPayload(value: unknown): value is PYQPayload {
  if (typeof value !== "object" || value === null) return false;
  const t = (value as Record<string, unknown>).type;
  return t === "results" || t === "clarify" || t === "empty" || t === "not_found";
}

interface Message {
  role: "user" | "bot";
  content: string;
  pyq?: PYQPayload;
}

const DEFAULT_MESSAGE: Message = { 
  role: "bot", 
  content: "Hello! I am your GLUG AI assistant. Ask me anything about the club, upcoming events, or Linux!" 
};

// Heuristic: does this message contain a GFM markdown table?
// (at least one pipe-delimited line plus a "---" style separator row)
const containsTable = (content: string) => /\|/.test(content) && /-{2,}/.test(content);

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);
  // Whether we should auto-follow new content to the bottom — true by default,
  // and flips off if the user manually scrolls up to read earlier messages
  // (same behavior as Claude's own chat).
  const [stickToBottom, setStickToBottom] = useState(true);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted ? resolvedTheme === "dark" : null;

  
  const [panelWidth, setPanelWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(400);

  const getResponsivePanelWidth = () => {
    if (typeof window === "undefined") return 400;
    const safeWidth = Math.max(window.innerWidth - 24, 280);
    return Math.min(safeWidth, 720);
  };

  // Bubble width now tracks the live panel width instead of a fixed rem cap,
  // so it actually uses the extra room when the user drags the panel wider,
  // and shrinks gracefully (with tables falling back to horizontal scroll)
  // when the panel is narrow.
  const getBubbleMaxWidth = (isBot: boolean, hasTable: boolean, isPyq: boolean) => {
    const available = panelWidth - 64; // avatar + gaps + panel padding
    const cap = isBot ? (isPyq ? available : hasTable ? 760 : 480) : 420;
    return Math.max(200, Math.min(available, cap));
  };

  const startResizing = (e: React.PointerEvent<HTMLDivElement>) => {
    e.preventDefault();
    isResizing.current = true;
    setIsDragging(true);
    startX.current = e.clientX;
    startWidth.current = panelWidth;
    
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
    
    const onPointerMove = (moveEvent: PointerEvent) => {
      if (!isResizing.current) return;
      const delta = startX.current - moveEvent.clientX;
      const newWidth = startWidth.current + delta;
      
      if (newWidth >= 280 && newWidth <= 720) {
        setPanelWidth(newWidth);
      }
    };

    const onPointerUp = () => {
      isResizing.current = false;
      setIsDragging(false);
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("pointermove", onPointerMove as any);
      window.removeEventListener("pointerup", onPointerUp);
    };

    window.addEventListener("pointermove", onPointerMove as any);
    window.addEventListener("pointerup", onPointerUp);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setPanelWidth(getResponsivePanelWidth());
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (isOpen) {
        setPanelWidth(getResponsivePanelWidth());
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  useEffect(() => {
    const savedChat = localStorage.getItem("glug-chat-history");
    if (savedChat) {
      try {
        const parsed = JSON.parse(savedChat);
        if (parsed.length > 0) setMessages(parsed);
      } catch (e) {
        console.error("Failed to load chat history");
      }
    }
  }, []);

  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("glug-chat-history", JSON.stringify(messages));
    }
  }, [messages]);

  // ScrollArea's own ref points at the non-scrolling Root wrapper, not the
  // element that actually scrolls — Radix always tags the real scrollable
  // node with this data attribute, so we reach through to it directly.
  const getViewport = () =>
    scrollRef.current?.querySelector<HTMLDivElement>(
      "[data-radix-scroll-area-viewport]"
    ) ?? null;

  const scrollToBottom = (behavior: ScrollBehavior = "smooth") => {
    const viewport = getViewport();
    if (!viewport) return;
    viewport.scrollTo({ top: viewport.scrollHeight, behavior });
  };

  // Detect when the user scrolls up to read earlier messages, so we stop
  // yanking them back down — and resume auto-following once they're back
  // near the bottom (or send a new message).
  useEffect(() => {
    const viewport = getViewport();
    if (!viewport) return;

    const handleScroll = () => {
      const distanceFromBottom =
        viewport.scrollHeight - viewport.scrollTop - viewport.clientHeight;
      setStickToBottom(distanceFromBottom < 80);
    };

    viewport.addEventListener("scroll", handleScroll);
    return () => viewport.removeEventListener("scroll", handleScroll);
  }, [isOpen]);

  // Follow the bottom as messages arrive, while "Thinking..." shows, and as
  // the reply streams in — instant during streaming so rapid token updates
  // don't animate-jitter, a single smooth glide for a new send/open.
  useEffect(() => {
    if (!isOpen || !stickToBottom) return;
    scrollToBottom(isStreaming ? "auto" : "smooth");
  }, [messages, isLoading, isStreaming, isOpen, stickToBottom]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
    // A new prompt always jumps to the bottom, even if the user had
    // scrolled up to read earlier history.
    setStickToBottom(true);
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setInput("");
    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_CHATBOT_URL;
      
      const response = await fetch(`${baseUrl}/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage }), 
      });

      if (!response.body) throw new Error("ReadableStream is not supported by the browser.");

      setIsLoading(false); 
      setIsStreaming(true);
      setMessages((prev) => [...prev, { role: "bot", content: "" }]);

      const reader = response.body.getReader();
      const decoder = new TextDecoder("utf-8");
      
      let buffer = "";
      let fullMessage = ""; // Track the accumulated tokens here

      while (true) {
        const { value, done } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split('\n\n');
        buffer = events.pop() || ""; 

        for (const event of events) {
          if (!event.startsWith('data: ')) continue;
          const dataString = event.replace(/^data:\s*/, '').trim();

          if (dataString === '[DONE]') {
            setIsStreaming(false); 
            return; 
          }

          try {
            const payload = JSON.parse(dataString);
            const responseValue = payload.response;

            // PYQ matcher returns a structured object — render it as a card,
            // not as a stringified token.
            if (isPYQPayload(responseValue)) {
              setIsStreaming(false);
              setMessages((prev) => {
                const updatedMessages = [...prev];
                const lastIndex = updatedMessages.length - 1;
                if (updatedMessages[lastIndex].role === "bot") {
                  updatedMessages[lastIndex] = {
                    ...updatedMessages[lastIndex],
                    content: "",
                    pyq: responseValue,
                  };
                }
                return updatedMessages;
              });
              return;
            }

            // Ordinary text token — accumulate and stream into the bubble.
            const token = typeof responseValue === "string" ? responseValue : "";
            if (token) {
              fullMessage += token;
              setMessages((prev) => {
                const updatedMessages = [...prev];
                const lastIndex = updatedMessages.length - 1;
                if (updatedMessages[lastIndex].role === "bot") {
                  updatedMessages[lastIndex] = { ...updatedMessages[lastIndex], content: fullMessage };
                }
                return updatedMessages;
              });
            }
          } catch (err) {
            console.error("Error parsing stream payload:", err);
          }
        }
      }
    } catch (error) {
      console.error("Stream Connection Error:", error);
      setMessages((prev) => [...prev, { role: "bot", content: "⚠️ Sorry, I couldn't reach the server." }]);
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  // Instead of the browser's native window.confirm() (which renders as an
  // unstyled OS dialog), a themed in-panel modal handles the confirmation.
  const requestClearChat = () => setShowClearConfirm(true);

  const confirmClearChat = () => {
    setMessages([DEFAULT_MESSAGE]);
    localStorage.removeItem("glug-chat-history");
    setShowClearConfirm(false);
  };

  return (
    <>
      {/* Visible horizontal scrollbar just for wide tables inside chat bubbles */}
      <style jsx global>{`
        .glug-table-scroll::-webkit-scrollbar {
          height: 6px;
        }
        .glug-table-scroll::-webkit-scrollbar-track {
          background: transparent;
        }
        .glug-table-scroll::-webkit-scrollbar-thumb {
          background-color: rgba(147, 51, 234, 0.45);
          border-radius: 999px;
        }
        .glug-table-scroll::-webkit-scrollbar-thumb:hover {
          background-color: rgba(147, 51, 234, 0.65);
        }
      `}</style>

      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] h-20 w-20 hover:-translate-y-2 transition-transform duration-300 group focus:outline-none"
      >
        <img 
          src={penguinSticker.src} 
          alt="Chat with GLUG" 
          className="w-full h-full object-contain drop-shadow-xl group-hover:drop-shadow-2xl group-hover:rotate-12 transition-all duration-300"
        />
        <span className="absolute top-1 right-1 flex h-4 w-4">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-purple-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-4 w-4 bg-purple-500 border-2 border-white dark:border-[#09090b]"></span>
        </span>
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-black/10 dark:bg-black/50 z-[9998] pointer-events-auto backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ x: "100%", opacity: 0, scale: 0.95 }}
              animate={{ x: 0, opacity: 1, scale: 1 }}
              exit={{ x: "100%", opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              style={{ width: panelWidth, maxWidth: "calc(100vw - 1rem)" }}
              className="fixed right-2 top-2 bottom-2 sm:right-4 sm:top-4 sm:bottom-4 z-[9999] pointer-events-none flex flex-col gap-3 sm:gap-4"
            >
              
              <div 
                onPointerDown={startResizing}
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-32 cursor-col-resize pointer-events-auto z-[10000] flex items-center justify-center group"
              >
                <div className={`w-1.5 h-12 rounded-full transition-colors duration-200 ${isDragging ? 'bg-purple-500' : 'bg-black/10 dark:bg-white/10 group-hover:bg-purple-500/50'}`} />
              </div>

              <div className="w-full h-[56px] shrink-0 pointer-events-auto relative rounded-full">
                <div
                  className="relative z-10 w-full h-full flex items-center justify-between px-5 rounded-full bg-white/90 dark:bg-black/80"
                  style={{
                    border: isDark === false
                      ? "1.5px solid rgba(0,0,0,0.08)"
                      : "1.5px solid rgba(255,255,255,0.13)",
                  }}
                >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8 border shadow-sm dark:border-white/10 bg-white/80 dark:bg-black/50">
                        <AvatarImage src={logo.src} alt="GLUG Bot Logo" className="object-contain p-0.5" />
                        <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300">
                          <Bot size={16} />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h2 className="font-semibold text-sm text-slate-900 dark:text-white leading-tight">GLUG Assistant</h2>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 shrink-0">
                      {messages.length > 1 && (
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={requestClearChat}
                          className="text-slate-600 hover:text-red-500 hover:bg-white/50 dark:text-slate-300 dark:hover:bg-red-500/20 h-8 w-8 rounded-full transition-colors"
                        >
                          <Trash2 size={16} />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(false)}
                        className="text-slate-600 hover:text-slate-900 dark:text-slate-300 hover:bg-white/50 dark:hover:bg-white/10 h-8 w-8 rounded-full transition-colors"
                      >
                        <X size={18} />
                      </Button>
                    </div>
                </div>
              </div>

              <div className="w-full flex-1 pointer-events-auto rounded-[32px] overflow-hidden flex flex-col shadow-2xl bg-white/60 dark:bg-[#111113]/60 backdrop-blur-[18px] border border-black/5 dark:border-white/10">
                
                <ScrollArea className="flex-1 p-5" ref={scrollRef}>
                  {/* Hard pixel clip (not a % max-width) so a wide table can never
                      inflate this column and drag the rest of the chat sideways. */}
                  <div
                    className="flex flex-col gap-5 pb-4 overflow-x-hidden"
                    style={{ maxWidth: Math.max(200, panelWidth - 40) }}
                  >
                    {messages.map((msg, index) => {
                      // 1. Unescape escaped characters (like \*\* or \\n)
                      // 2. Force double newlines before specific Markdown blocks to satisfy strict parsing
                      let cleanContent = msg.content || "";
                      cleanContent = cleanContent
                        .replace(/\\n/g, '\n')           // Fix stringified newlines
                        .replace(/\r\n/g, '\n')          // Normalize Windows line endings
                        .replace(/\\\*/g, '*')           // Unescape asterisks
                        .replace(/\\#/g, '#')            // Unescape headers
                        .replace(/([^\n])\n(#+)\s/g, '$1\n\n$2 ')          // Ensure blank line before headers
                        .replace(/([^\n|])\n(\|)/g, '$1\n\n$2')            // Ensure blank line before tables
                        .replace(/([^\n])\n([*+-]|\d+\.)\s/g, '$1\n\n$2')  // Ensure blank line before lists
                        .replace(/\n\n\n+/g, '\n\n');                      // Clean up excessive spacing

                      const isBot = msg.role === "bot";
                      const hasTable = isBot && containsTable(cleanContent);
                      const isPyq = !!msg.pyq;
                      const bubbleMaxWidth = getBubbleMaxWidth(isBot, hasTable, isPyq);

                      return (
                        <div
                          key={index}
                          className={`flex w-full min-w-0 gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                        >
                          {msg.role === "bot" && (
                            <Avatar className="h-7 w-7 mt-0.5 border shadow-sm dark:border-white/10 bg-white/80 dark:bg-black/50 flex-shrink-0">
                              <AvatarImage src={logo.src} alt="GLUG Bot Logo" className="object-contain p-0.5" />
                              <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px]">
                                <Bot size={14} />
                              </AvatarFallback>
                            </Avatar>
                          )}

                          <div
                            className={`min-w-0 px-3.5 py-2.5 text-xs shadow-sm leading-relaxed break-words ${
                              msg.role === "user"
                                ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm border border-purple-500/50 whitespace-pre-wrap"
                                : "bg-white/90 dark:bg-black/60 text-slate-800 dark:text-slate-100 rounded-2xl rounded-tl-sm border border-white/50 dark:border-white/10 backdrop-blur-md overflow-hidden"
                            }`}
                            style={{
                              width: msg.pyq ? "100%" : undefined,
                              maxWidth: bubbleMaxWidth,
                              overflowWrap: "anywhere",
                              wordBreak: "break-word",
                            }}
                          >
                            {msg.role === "user" ? (
                              msg.content
                            ) : msg.pyq ? (
                              // ── Structured PYQ response ──────────────────
                              <PYQCard payload={msg.pyq} />
                            ) : (
                              // ── Regular markdown / streamed text ─────────
                              <div className="space-y-3 markdown-body">
                                <ReactMarkdown
                                  remarkPlugins={[remarkGfm]}
                                  components={{
                                    h2: ({ node, ...props }) => <h2 className="text-sm font-bold text-slate-900 dark:text-white mt-4 mb-2 border-b border-slate-200 dark:border-slate-700 pb-1" {...props} />,
                                    h3: ({ node, ...props }) => <h3 className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-3 mb-1" {...props} />,
                                    a: ({ node, ...props }) => <a className="text-purple-600 dark:text-purple-400 hover:underline font-medium break-all" target="_blank" rel="noopener noreferrer" {...props} />,
                                    ul: ({ node, ...props }) => <ul className="list-disc pl-4 space-y-1 my-2 marker:text-purple-500" {...props} />,
                                    ol: ({ node, ...props }) => <ol className="list-decimal pl-4 space-y-1 my-2 marker:text-purple-500" {...props} />,
                                    strong: ({ node, ...props }) => <strong className="font-bold text-slate-900 dark:text-white" {...props} />,
                                    table: ({ node, ...props }) => {
                                      const tableCap = Math.max(160, bubbleMaxWidth - 28);
                                      return (
                                        <div
                                          className="glug-table-scroll my-3 rounded-lg border border-slate-200 dark:border-slate-700 overflow-x-auto"
                                          style={{
                                            maxWidth: tableCap,
                                            WebkitOverflowScrolling: "touch",
                                            scrollbarWidth: "thin",
                                          }}
                                        >
                                          <table
                                            className="w-max min-w-full text-left border-collapse text-[11px] sm:text-xs"
                                            style={{
                                              tableLayout: "auto",
                                              wordBreak: "normal",
                                              overflowWrap: "normal",
                                            }}
                                            {...props}
                                          />
                                        </div>
                                      );
                                    },
                                    thead: ({ node, ...props }) => <thead className="bg-slate-100 dark:bg-slate-800/50" {...props} />,
                                    tr: ({ node, ...props }) => <tr className="even:bg-slate-50/60 dark:even:bg-white/[0.03]" {...props} />,
                                    th: ({ node, ...props }) => <th className="px-3 py-2 font-semibold border-b border-slate-200 dark:border-slate-700 whitespace-nowrap" {...props} />,
                                    td: ({ node, ...props }) => <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/50 align-top" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0 whitespace-pre-wrap" {...props} />
                                  }}
                                >
                                  {cleanContent}
                                </ReactMarkdown>
                                {hasTable && (
                                  <p className="text-[10px] text-slate-400 dark:text-slate-500 italic">
                                    Scroll the table sideways to see more columns →
                                  </p>
                                )}
                              </div>
                            )}
                          </div>

                          {msg.role === "user" && (
                            <Avatar className="h-7 w-7 mt-0.5 border shadow-sm dark:border-white/10 flex-shrink-0">
                              <AvatarFallback className="bg-slate-800 dark:bg-black/50 text-white text-[10px]">
                                <User size={14} />
                              </AvatarFallback>
                            </Avatar>
                          )}
                        </div>
                      );
                    })}

                    {isLoading && (
                      <div className="flex gap-2.5 justify-start">
                        <Avatar className="h-7 w-7 mt-0.5 border shadow-sm dark:border-white/10 bg-white/80 dark:bg-black/50 flex-shrink-0">
                          <AvatarImage src={logo.src} alt="GLUG Bot Logo" className="object-contain p-0.5" />
                          <AvatarFallback className="bg-purple-100 dark:bg-purple-900/30 text-purple-700 dark:text-purple-300 text-[10px]">
                            <Bot size={14} />
                          </AvatarFallback>
                        </Avatar>
                        <div className="px-3.5 py-2.5 text-xs bg-white/80 dark:bg-black/40 backdrop-blur-md text-slate-500 dark:text-slate-400 rounded-2xl rounded-tl-sm border border-white/50 dark:border-white/10 shadow-sm flex items-center gap-1 animate-pulse">
                          Thinking...
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>

                <div className="p-4 shrink-0 bg-white/30 dark:bg-black/20 border-t border-black/5 dark:border-white/10">
                  <form onSubmit={handleSendMessage} className="relative flex items-center">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value.slice(0, 200))}
                      placeholder="Ask about events, projects..."
                      maxLength={200}
                      className="pr-10 py-5 rounded-full bg-white/60 dark:bg-black/40 border-white/50 dark:border-white/10 text-slate-900 dark:text-white text-xs shadow-sm focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 backdrop-blur-md"
                      disabled={isLoading || isStreaming}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || isStreaming || !input.trim() || input.length > 200}
                      className="absolute right-1 h-8 w-9 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors border border-purple-500/50"
                    >
                      <Send size={12} />
                    </Button>
                  </form>
                  {input.length > 140 && (
                    <p
                      className={`mt-1.5 text-right text-[10px] font-medium transition-colors duration-200 ${
                        input.length >= 200
                          ? "text-red-500 dark:text-red-400"
                          : "text-slate-400 dark:text-slate-500"
                      }`}
                    >
                      {input.length}/200
                    </p>
                  )}
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {showClearConfirm && (
          <div className="fixed inset-0 z-[10050] flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowClearConfirm(false)}
              className="absolute inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-sm pointer-events-auto"
            />
            <motion.div
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="clear-chat-title"
              initial={{ opacity: 0, scale: 0.94, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 8 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative z-[10051] w-full max-w-sm max-h-[85vh] overflow-y-auto pointer-events-auto rounded-3xl bg-white/95 dark:bg-[#111113]/95 backdrop-blur-xl border border-black/5 dark:border-white/10 shadow-2xl p-5 sm:p-6"
            >
              <div className="flex items-start gap-3.5">
                <div className="shrink-0 h-10 w-10 rounded-full bg-red-100 dark:bg-red-500/15 flex items-center justify-center">
                  <AlertTriangle size={18} className="text-red-500 dark:text-red-400" />
                </div>
                <div className="min-w-0">
                  <h3 id="clear-chat-title" className="text-sm font-semibold text-slate-900 dark:text-white">
                    Clear conversation history?
                  </h3>
                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
                    This will remove all messages in this chat. This action can't be undone.
                  </p>
                </div>
              </div>

              <div className="mt-5 flex items-center justify-end gap-2">
                <Button
                  variant="ghost"
                  onClick={() => setShowClearConfirm(false)}
                  className="h-9 px-4 rounded-full text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10"
                >
                  Cancel
                </Button>
                <Button
                  onClick={confirmClearChat}
                  className="h-9 px-4 rounded-full text-xs font-medium bg-red-600 hover:bg-red-700 text-white border border-red-500/50"
                >
                  Clear chat
                </Button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}