"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Bot, User, Trash2, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { logo, penguinSticker } from "@/assets";

import GlassSurface from "@/components/GlassSurface";
import { useTheme } from "next-themes";


import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";


interface Message {
  role: "user" | "bot";
  content: string;
}

const DEFAULT_MESSAGE: Message = { 
  role: "bot", 
  content: "Hello! I am your GLUG AI assistant. Ask me anything about the club, upcoming events, or Linux!" 
};

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([DEFAULT_MESSAGE]);
  const [input, setInput] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);
  const isDark = mounted ? resolvedTheme === "dark" : null;

  
  const [panelWidth, setPanelWidth] = useState(400);
  const [isDragging, setIsDragging] = useState(false);
  const isResizing = useRef(false);
  const startX = useRef(0);
  const startWidth = useRef(400);

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
      
      if (newWidth >= 320 && newWidth <= 800) {
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
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
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

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading, isOpen, isStreaming]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = input.trim();
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
            const token = payload.response || "";

            if (token) {
              fullMessage += token; // Append the new chunk to our full message

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

  const clearChat = () => {
    if (window.confirm("Clear conversation history?")) {
      setMessages([DEFAULT_MESSAGE]);
      localStorage.removeItem("glug-chat-history");
    }
  };

  return (
    <>
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
              style={{ width: panelWidth, maxWidth: "calc(100vw - 2rem)" }}
              className="fixed right-4 top-4 bottom-4 z-[9999] pointer-events-none flex flex-col gap-4"
            >
              
              <div 
                onPointerDown={startResizing}
                className="absolute -left-3 top-1/2 -translate-y-1/2 w-6 h-32 cursor-col-resize pointer-events-auto z-[10000] flex items-center justify-center group"
              >
                <div className={`w-1.5 h-12 rounded-full transition-colors duration-200 ${isDragging ? 'bg-purple-500' : 'bg-black/10 dark:bg-white/10 group-hover:bg-purple-500/50'}`} />
              </div>

              <div className="w-full h-[56px] shrink-0 pointer-events-auto relative shadow-xl rounded-full">
                <GlassSurface
                  width="100%"
                  height={56} 
                  borderRadius={999}
                  distortionScale={-160}
                  redOffset={0}
                  greenOffset={8}
                  blueOffset={18}
                  brightness={isDark === false ? 140 : 35}
                  opacity={1.5}
                  blur={18}
                  backgroundOpacity={isDark === false ? 0.18 : 0.12}
                  saturation={isDark === false ? 1.1 : 1.4}
                  className="w-full h-full"
                  style={{
                    border: isDark === false
                      ? "1.5px solid rgba(0,0,0,0.08)"
                      : "1.5px solid rgba(255,255,255,0.13)",
                    isolation: "isolate",
                  }}
                >
                  {isDark === false && (
                    <div
                      className="absolute inset-0 rounded-full pointer-events-none"
                      style={{ background: "rgba(255,255,255,0.55)" }}
                    />
                  )}

                  <div className="relative z-10 w-full h-full flex items-center justify-between px-5">
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
                          onClick={clearChat}
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
                </GlassSurface>
              </div>

              <div className="w-full flex-1 pointer-events-auto rounded-[32px] overflow-hidden flex flex-col shadow-2xl bg-white/60 dark:bg-[#111113]/60 backdrop-blur-[18px] border border-black/5 dark:border-white/10">
                
                <ScrollArea className="flex-1 p-5" ref={scrollRef}>
                  <div className="flex flex-col gap-5 pb-4">
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

                      return (
                        <div
                          key={index}
                          className={`flex gap-2.5 ${msg.role === "user" ? "justify-end" : "justify-start"}`}
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
                            className={`px-3.5 py-2.5 text-xs shadow-sm max-w-[90%] leading-relaxed ${
                              msg.role === "user"
                                ? "bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-2xl rounded-tr-sm border border-purple-500/50 whitespace-pre-wrap"
                                : "bg-white/90 dark:bg-black/60 text-slate-800 dark:text-slate-100 rounded-2xl rounded-tl-sm border border-white/50 dark:border-white/10 backdrop-blur-md overflow-hidden"
                            }`}
                          >
                            {msg.role === "user" ? (
                              msg.content
                            ) : (
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
                                    table: ({ node, ...props }) => (
                                      <div className="overflow-x-auto my-3 rounded-lg border border-slate-200 dark:border-slate-700">
                                        <table className="w-full text-left border-collapse min-w-[300px]" {...props} />
                                      </div>
                                    ),
                                    thead: ({ node, ...props }) => <thead className="bg-slate-100 dark:bg-slate-800/50" {...props} />,
                                    th: ({ node, ...props }) => <th className="px-3 py-2 font-semibold border-b border-slate-200 dark:border-slate-700" {...props} />,
                                    td: ({ node, ...props }) => <td className="px-3 py-2 border-b border-slate-100 dark:border-slate-800/50 align-top" {...props} />,
                                    p: ({ node, ...props }) => <p className="mb-2 last:mb-0 whitespace-pre-wrap" {...props} />
                                  }}
                                >
                                  {cleanContent}
                                </ReactMarkdown>
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
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Ask about events, projects..."
                      className="pr-10 py-5 rounded-full bg-white/60 dark:bg-black/40 border-white/50 dark:border-white/10 text-slate-900 dark:text-white text-xs shadow-sm focus-visible:ring-purple-500 dark:focus-visible:ring-purple-500 placeholder:text-slate-500 dark:placeholder:text-slate-400 backdrop-blur-md"
                      disabled={isLoading || isStreaming}
                    />
                    <Button
                      type="submit"
                      size="icon"
                      disabled={isLoading || isStreaming || !input.trim()}
                      className="absolute right-1 h-8 w-9 rounded-full bg-purple-600 hover:bg-purple-700 text-white transition-colors border border-purple-500/50"
                    >
                      <Send size={12} />
                    </Button>
                  </form>
                </div>

              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}