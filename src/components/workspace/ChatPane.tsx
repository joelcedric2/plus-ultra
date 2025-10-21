import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Sparkles, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

export const ChatPane = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: "Welcome to PlusUltra. I'm your AI development partner. Describe what you want to build, and I'll help you design, code, and ship it.",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: "I'm analyzing your request and preparing the implementation. This is a demo interface - the full AI orchestration layer will be connected soon.",
          timestamp: new Date(),
        },
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col bg-background/50 backdrop-blur-xl border-r border-border/30">
      {/* Chat Header */}
      <div className="p-5 border-b border-border/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-2.5 h-2.5 rounded-full bg-primary ai-glow" />
              <div className="absolute inset-0 w-2.5 h-2.5 rounded-full bg-primary animate-ping opacity-75" />
            </div>
            <div>
              <span className="text-sm font-semibold text-foreground">AI Workspace</span>
              <p className="text-xs text-muted-foreground">Multi-agent orchestration active</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-5">
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-2 animate-fade-in",
                message.role === "user" && "items-end"
              )}
            >
              {message.role === "assistant" && (
                <div className="flex items-center gap-2 mb-1">
                  <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">PlusUltra AI</span>
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 shadow-lg",
                  message.role === "user"
                    ? "bg-gradient-to-br from-primary/90 to-purple/90 text-primary-foreground border border-primary/20"
                    : "glass-panel border border-border/50"
                )}
              >
                <p className="text-sm leading-relaxed">{message.content}</p>
              </div>
              <span className="text-xs text-muted-foreground/70 px-1">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-start gap-3 animate-fade-in">
              <div className="w-6 h-6 rounded-lg bg-gradient-to-br from-primary to-purple flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary-foreground" />
              </div>
              <div className="glass-panel border border-border/50 p-4 rounded-2xl skeleton-ai shadow-lg">
                <div className="flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <span className="text-sm text-muted-foreground">Processing request...</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-5 border-t border-border/30 bg-card/30 backdrop-blur-xl">
        <div className="relative">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe your app or feature..."
            className="min-h-[100px] resize-none bg-secondary/50 border-border/50 focus:border-primary/50 rounded-xl pr-12 placeholder:text-muted-foreground/50"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            size="sm"
            className="absolute bottom-3 right-3 bg-gradient-to-r from-primary to-purple hover:opacity-90 text-primary-foreground shadow-lg shadow-primary/20 rounded-lg"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <div className="flex items-center justify-between mt-3 px-1">
          <div className="flex items-center gap-2 text-xs text-muted-foreground/70">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            <span>Powered by multi-agent AI orchestration</span>
          </div>
          <span className="text-xs text-muted-foreground/50">⌘ + Enter to send</span>
        </div>
      </div>
    </div>
  );
};
