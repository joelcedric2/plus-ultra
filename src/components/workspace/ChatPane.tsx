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
      content: "👋 Welcome to PlusUltra! I'm your AI assistant ready to help you build, debug, and ship amazing apps. What would you like to create today?",
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
          content: "I'm analyzing your request and generating the code... This is a demo UI, so I'm not actually processing anything yet!",
          timestamp: new Date(),
        },
      ]);
      setIsProcessing(false);
    }, 1500);
  };

  return (
    <div className="h-full flex flex-col glass-panel border-r border-border">
      {/* Chat Header */}
      <div className="p-4 border-b border-border">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary ai-glow" />
          <span className="text-sm font-medium">AI Assistant</span>
          <span className="text-xs text-muted-foreground ml-auto">Active</span>
        </div>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                "flex flex-col gap-2",
                message.role === "user" && "items-end"
              )}
            >
              <div
                className={cn(
                  "max-w-[85%] rounded-lg p-3",
                  message.role === "user"
                    ? "bg-primary/20 border border-primary/30"
                    : "glass-panel"
                )}
              >
                <p className="text-sm">{message.content}</p>
              </div>
              <span className="text-xs text-muted-foreground">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </div>
          ))}
          {isProcessing && (
            <div className="flex items-center gap-2 glass-panel p-3 rounded-lg w-fit skeleton-ai">
              <Loader2 className="w-4 h-4 animate-spin text-primary" />
              <span className="text-sm text-muted-foreground">Thinking...</span>
            </div>
          )}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe what you want to build..."
            className="min-h-[80px] resize-none glass-panel"
          />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Sparkles className="w-3 h-3" />
            <span>AI-powered development</span>
          </div>
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isProcessing}
            size="sm"
            className="gap-2"
          >
            <Send className="w-4 h-4" />
            Send
          </Button>
        </div>
      </div>
    </div>
  );
};
