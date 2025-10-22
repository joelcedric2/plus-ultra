import { useState, useRef } from "react";
import logoImage from "@/assets/plusultra-logo.png";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ArrowUp, Sparkles, Loader2, Paperclip, Mic, Edit3, Plus, Bot, UserPlus, Image, FileText, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from "@/components/ui/dropdown-menu";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

interface AttachedFile {
  id: string;
  file: File;
  preview?: string;
  type: string;
}

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  attachments?: AttachedFile[];
}
export const ChatPane = () => {
  const { toast } = useToast();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessages] = useState<Message[]>([{
    id: "1",
    role: "assistant",
    content: "Welcome to PlusUltra. I'm your AI development partner. Describe what you want to build, and I'll help you design, code, and ship it.",
    timestamp: new Date()
  }]);
  const [input, setInput] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [projectManagerEnabled, setProjectManagerEnabled] = useState(true);
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([]);
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const maxSize = 20 * 1024 * 1024; // 20MB
    const maxFiles = 10;

    if (attachedFiles.length + files.length > maxFiles) {
      toast({
        title: "Too many files",
        description: `You can only attach up to ${maxFiles} files at once.`,
        variant: "destructive"
      });
      return;
    }

    const validFiles: AttachedFile[] = [];
    
    files.forEach(file => {
      if (file.size > maxSize) {
        toast({
          title: "File too large",
          description: `${file.name} exceeds the 20MB limit.`,
          variant: "destructive"
        });
        return;
      }

      const attachedFile: AttachedFile = {
        id: `${Date.now()}-${Math.random()}`,
        file,
        type: file.type
      };

      // Generate preview for images
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          attachedFile.preview = e.target?.result as string;
          setAttachedFiles(prev => [...prev]);
        };
        reader.readAsDataURL(file);
      }

      validFiles.push(attachedFile);
    });

    setAttachedFiles(prev => [...prev, ...validFiles]);
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const removeAttachedFile = (fileId: string) => {
    setAttachedFiles(prev => prev.filter(f => f.id !== fileId));
  };

  const handleSend = () => {
    if (!input.trim() && attachedFiles.length === 0) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input || "Shared files",
      timestamp: new Date(),
      attachments: attachedFiles.length > 0 ? [...attachedFiles] : undefined
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInput("");
    setAttachedFiles([]);
    setIsProcessing(true);

    // Simulate AI response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: "I'm analyzing your request and preparing the implementation. This is a demo interface - the full AI orchestration layer will be connected soon.",
        timestamp: new Date()
      }]);
      setIsProcessing(false);
    }, 1500);
  };
  return <div className="h-full flex flex-col bg-background/50 backdrop-blur-xl border-r border-border/30">
      {/* Messages */}
      <ScrollArea className="flex-1 p-5">
        <div className="space-y-6">
          {messages.map(message => <div key={message.id} className={cn("flex gap-3 group animate-in fade-in-50 slide-in-from-bottom-3", message.role === "assistant" ? "items-start justify-start flex-col" : "items-start justify-end")}>
              {message.role === "assistant" && <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0">
                    <img src={logoImage} alt="PlusUltra" className="w-7 h-7 object-contain" />
                  </div>
                  <span className="text-sm font-semibold text-foreground">PlusUltra</span>
                </div>}
              <div className={cn("max-w-[80%] space-y-2 overflow-hidden", message.role === "assistant" ? "mr-auto ml-0" : "ml-auto")}>
                <div className={cn("prose prose-sm max-w-none rounded-xl px-4 py-3", message.role === "user" ? "bg-secondary/50 border border-border/50" : "bg-muted/50 border border-border/30")}>
                  {message.attachments && message.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {message.attachments.map(attachment => (
                        <div key={attachment.id} className="relative group">
                          {attachment.preview ? (
                            <img 
                              src={attachment.preview} 
                              alt={attachment.file.name}
                              className="max-w-[200px] max-h-[200px] rounded-lg object-cover border border-border"
                            />
                          ) : (
                            <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border">
                              <FileText className="w-4 h-4 text-muted-foreground" />
                              <span className="text-sm truncate max-w-[150px]">{attachment.file.name}</span>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p className={cn("text-base leading-relaxed whitespace-pre-wrap break-words m-0", message.role === "assistant" && "text-muted-foreground")}>
                    {message.content}
                  </p>
                </div>
                <div className={cn("flex items-center gap-2 text-xs text-muted-foreground", message.role === "user" && "justify-end")}>
                  <span>{message.timestamp.toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}</span>
                </div>
              </div>
            </div>)}
          {isProcessing && <div className="flex gap-3 items-start animate-in fade-in-50">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center">
                <img src={logoImage} alt="PlusUltra" className="w-7 h-7 object-contain animate-pulse" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-muted-foreground">Processing your request...</p>
              </div>
            </div>}
        </div>
      </ScrollArea>

      {/* Input Area */}
      <div className="p-5 border-t border-border/30 bg-card/30 backdrop-blur-xl">
        {/* Attached Files Preview */}
        {attachedFiles.length > 0 && (
          <div className="mb-3 flex flex-wrap gap-2">
            {attachedFiles.map(file => (
              <div key={file.id} className="relative group">
                {file.preview ? (
                  <div className="relative">
                    <img 
                      src={file.preview} 
                      alt={file.file.name}
                      className="w-20 h-20 rounded-lg object-cover border border-border"
                    />
                    <Button
                      size="sm"
                      variant="destructive"
                      className="absolute -top-2 -right-2 h-5 w-5 p-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeAttachedFile(file.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2 px-3 py-2 bg-muted rounded-lg border border-border group-hover:border-primary/50 transition-colors">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm truncate max-w-[150px]">{file.file.name}</span>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-5 w-5 p-0 ml-2"
                      onClick={() => removeAttachedFile(file.id)}
                    >
                      <X className="w-3 h-3" />
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
        
        <div className="relative bg-secondary/50 border border-border/50 rounded-xl focus-within:border-primary/50 transition-colors">
          {/* Text Input Field */}
          <Textarea value={input} onChange={e => {
          setInput(e.target.value);
          // Auto-resize
          e.target.style.height = 'auto';
          e.target.style.height = e.target.scrollHeight + 'px';
        }} onKeyDown={e => {
          if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }} placeholder="Describe your app or feature..." rows={1} className="w-full resize-none bg-transparent border-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-xl py-2 px-4 pr-20 placeholder:text-muted-foreground/50 max-h-[200px] overflow-y-auto leading-tight min-h-[56px] text-base" style={{
          height: 'auto'
        }} />

          {/* Bottom Row: Tools and Actions - Inside the text field container */}
          <div className="flex items-center justify-between px-2 pb-1.5">
            <TooltipProvider>
              <div className="flex items-center gap-1">
                {/* More Tools Dropdown - Moved to far left */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all">
                          <Plus className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56 bg-card/95 backdrop-blur-xl border-border/50 z-50">
                        <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-primary/10 focus:bg-primary/10">
                          <UserPlus className="w-4 h-4 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Invite a collaborator</div>
                            <div className="text-xs text-muted-foreground">Add team member to project</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-primary/10 focus:bg-primary/10">
                          <Image className="w-4 h-4 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Generate Logo</div>
                            <div className="text-xs text-muted-foreground">AI logo generation</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-primary/10 focus:bg-primary/10">
                          <FileText className="w-4 h-4 text-primary" />
                          <div>
                            <div className="font-medium text-sm">Documentation</div>
                            <div className="text-xs text-muted-foreground">Generate docs</div>
                          </div>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator className="bg-border/50" />
                        <DropdownMenuItem className="gap-3 cursor-pointer hover:bg-primary/10 focus:bg-primary/10" onClick={() => setProjectManagerEnabled(!projectManagerEnabled)}>
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

                {/* Voice Button */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="sm" onClick={() => setIsRecording(!isRecording)} className={cn("h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all", isRecording && "bg-destructive/20")}>
                      <Mic className={cn("w-4 h-4 text-muted-foreground", isRecording && "text-destructive")} />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{isRecording ? "Stop recording" : "Voice input"}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Attach Button - Moved to where Plus was */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all"
                      onClick={() => fileInputRef.current?.click()}
                    >
                      <Paperclip className="w-4 h-4 text-muted-foreground hover:text-foreground" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Attach files (images, PDFs, screenshots)</p>
                  </TooltipContent>
                </Tooltip>
                
                {/* Hidden File Input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  multiple
                  accept="image/*,.pdf,.svg,.doc,.docx"
                  className="hidden"
                  onChange={handleFileSelect}
                />

                {/* Status Indicators */}
                {projectManagerEnabled && <div className="flex items-center gap-1.5 ml-2 px-2 text-xs text-primary">
                    <Bot className="w-3 h-3" />
                    <span>PM</span>
                  </div>}
              </div>
            </TooltipProvider>

            {/* Right Side: Send Button */}
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button 
                    onClick={handleSend} 
                    disabled={(!input.trim() && attachedFiles.length === 0) || isProcessing} 
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
    </div>;
};