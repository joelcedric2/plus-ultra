import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUp, Sparkles, Loader2, Paperclip, Mic, Edit3, Plus, Bot, Code, Image, FileText } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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
  const [isRecording, setIsRecording] = useState(false);
  const [projectManagerEnabled, setProjectManagerEnabled] = useState(true);

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
                  <div className="w-6 h-6 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                  </div>
                  <span className="text-xs font-medium text-muted-foreground">PlusUltra AI</span>
                </div>
              )}
              <div
                className={cn(
                  "max-w-[85%] rounded-2xl px-4 py-3 shadow-sm",
                  message.role === "user"
                    ? "bg-primary/10 border border-border"
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
              <div className="w-6 h-6 rounded-lg bg-primary/10 border border-border flex items-center justify-center">
                <Sparkles className="w-3.5 h-3.5 text-primary" />
              </div>
              <div className="glass-panel border border-border/50 p-4 rounded-2xl skeleton-ai shadow-sm">
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
        <div className="space-y-3">
          {/* Text Input Field - Full Width */}
          <Textarea
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              // Auto-resize
              e.target.style.height = 'auto';
              e.target.style.height = e.target.scrollHeight + 'px';
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Describe your app or feature..."
            rows={1}
            className="w-full resize-none bg-secondary/50 border-border/50 focus:border-primary/50 rounded-xl py-3 px-4 placeholder:text-muted-foreground/50 max-h-[200px] overflow-y-auto"
            style={{ height: 'auto' }}
          />

          {/* Bottom Row: Tools and Actions */}
          <div className="flex items-center justify-between">
            <TooltipProvider>
              <div className="flex items-center gap-1">
                {/* Attach Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-muted/30 rounded-lg transition-all"
                    >
                      <Paperclip className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attach files</p>
                  </TooltipContent>
                </Tooltip>

                {/* Voice Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsRecording(!isRecording)}
                      className={cn(
                        "h-9 w-9 p-0 hover:bg-muted/30 rounded-lg transition-all",
                        isRecording && "bg-destructive/20"
                      )}
                    >
                      <Mic className={cn("w-4 h-4 text-muted-foreground", isRecording && "text-destructive")} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isRecording ? "Stop recording" : "Voice input"}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Edit Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-9 w-9 p-0 hover:bg-muted/30 rounded-lg transition-all"
                    >
                      <Edit3 className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Edit mode</p>
                  </TooltipContent>
                </Tooltip>

                {/* More Tools Dropdown */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-9 w-9 p-0 hover:bg-muted/30 rounded-lg transition-all"
                        >
                          <Plus className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56 bg-card/95 backdrop-blur-xl border-border/50 z-50">
                        <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-muted/30 focus:bg-muted/30">
                          <Code className="w-4 h-4 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Code Snippet</div>
                            <div className="text-xs text-muted-foreground">Insert code block</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-muted/30 focus:bg-muted/30">
                          <Image className="w-4 h-4 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Generate Image</div>
                            <div className="text-xs text-muted-foreground">AI image generation</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-muted/30 focus:bg-muted/30">
                          <FileText className="w-4 h-4 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Documentation</div>
                            <div className="text-xs text-muted-foreground">Generate docs</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem 
                          className="gap-3 cursor-pointer hover:bg-muted/30 focus:bg-muted/30"
                          onClick={() => setProjectManagerEnabled(!projectManagerEnabled)}
                        >
                          <Bot className={cn("w-4 h-4", projectManagerEnabled ? "text-primary" : "text-muted-foreground")} />
                          <div>
                            <div className="font-medium text-sm">Project Manager</div>
                            <div className="text-xs text-muted-foreground">
                              {projectManagerEnabled ? "Active" : "Inactive"}
                            </div>
                          </div>
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>More tools</p>
                  </TooltipContent>
                </Tooltip>

                {/* Status Indicators */}
                {projectManagerEnabled && (
                  <div className="flex items-center gap-1.5 ml-2 px-2 text-xs text-primary">
                    <Bot className="w-3 h-3" />
                    <span>PM</span>
                  </div>
                )}
              </div>
            </TooltipProvider>

            {/* Right Side: Send Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={handleSend}
                    disabled={!input.trim() || isProcessing}
                    size="sm"
                    className="h-8 w-8 p-0 bg-gradient-to-r from-accent to-purple hover:opacity-90 disabled:opacity-50 text-accent-foreground shadow-lg shadow-accent/20 rounded-lg transition-all"
                  >
                    <ArrowUp className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Send message (⌘↵)</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
};
