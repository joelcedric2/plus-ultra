import { Code2, Eye, Github, Share2, Sparkles, Cloud } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewMode } from "../Workspace";
import { cn } from "@/lib/utils";

type ExtendedViewMode = ViewMode | "cloud";

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const Header = ({ viewMode, setViewMode }: HeaderProps) => {
  return (
    <header className="h-16 border-b border-border/50 glass-panel flex items-center justify-between px-6 relative z-10">
      {/* Logo and Project Name */}
        <div className="flex items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-primary/10 border border-border flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary" />
          </div>
          <span className="font-bold text-xl text-foreground">
            PlusUltra
          </span>
        </div>
        <div className="h-6 w-px bg-border/50" />
        <span className="text-sm text-muted-foreground font-medium">Untitled Project</span>
      </div>

      {/* View Mode Toggle */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMode("preview")}
          className={cn(
            "gap-2 rounded-lg transition-all duration-200",
            viewMode === "preview" 
              ? "bg-muted shadow-sm border border-border" 
              : "hover:bg-muted/50"
          )}
        >
          <Eye className="w-4 h-4" />
          {viewMode === "preview" && <span className="font-medium">Preview</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMode("code")}
          className={cn(
            "gap-2 rounded-lg transition-all duration-200",
            viewMode === "code" 
              ? "bg-muted shadow-sm border border-border" 
              : "hover:bg-muted/50"
          )}
        >
          <Code2 className="w-4 h-4" />
          {viewMode === "code" && <span className="font-medium">Code</span>}
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 rounded-lg transition-all duration-200 hover:bg-muted/50"
          )}
        >
          <Cloud className="w-4 h-4" />
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2 glass-button rounded-lg">
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 glass-button rounded-lg">
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">Share</span>
        </Button>
        <Button size="sm" className="gap-2 bg-gradient-to-r from-accent to-purple hover:opacity-90 text-accent-foreground shadow-lg shadow-accent/20 rounded-lg font-medium">
          <Sparkles className="w-4 h-4" />
          Publish
        </Button>
      </div>
    </header>
  );
};
