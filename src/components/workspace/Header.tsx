import { Code2, Eye, Github, Share2, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewMode } from "../Workspace";
import { cn } from "@/lib/utils";

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

export const Header = ({ viewMode, setViewMode }: HeaderProps) => {
  return (
    <header className="h-14 border-b border-border glass-panel flex items-center justify-between px-4 relative z-10">
      {/* Logo and Project Name */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
            <Sparkles className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-bold text-lg bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
            PlusUltra
          </span>
        </div>
        <div className="h-5 w-px bg-border" />
        <span className="text-sm text-muted-foreground">My Project</span>
      </div>

      {/* View Mode Toggle */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 glass-panel rounded-lg p-1">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMode("preview")}
          className={cn(
            "gap-2",
            viewMode === "preview" && "bg-primary/20 text-primary"
          )}
        >
          <Eye className="w-4 h-4" />
          Preview
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setViewMode("code")}
          className={cn(
            "gap-2",
            viewMode === "code" && "bg-primary/20 text-primary"
          )}
        >
          <Code2 className="w-4 h-4" />
          Code
        </Button>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2 glass-button">
          <Github className="w-4 h-4" />
          <span className="hidden sm:inline">GitHub</span>
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 glass-button">
          <Share2 className="w-4 h-4" />
          Share
        </Button>
        <Button size="sm" className="gap-2 bg-primary hover:bg-primary/90 text-primary-foreground">
          <Sparkles className="w-4 h-4" />
          Publish
        </Button>
      </div>
    </header>
  );
};
