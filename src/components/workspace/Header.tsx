import { Code2, Eye, Github, Share2, Sparkles, Cloud, PanelLeftClose, Monitor, Smartphone, Tablet, ArrowUpRight, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ViewMode, DeviceMode } from "../Workspace";
import { cn } from "@/lib/utils";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

type ExtendedViewMode = ViewMode | "cloud";

interface HeaderProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
  deviceMode: DeviceMode;
  setDeviceMode: (mode: DeviceMode) => void;
  onToggleChat: () => void;
  isChatCollapsed: boolean;
}

export const Header = ({ viewMode, setViewMode, deviceMode, setDeviceMode, onToggleChat, isChatCollapsed }: HeaderProps) => {
  const [supabaseUrl, setSupabaseUrl] = useState("");
  const [supabaseKey, setSupabaseKey] = useState("");
  const [isCloudDialogOpen, setIsCloudDialogOpen] = useState(false);

  const handleConnectSupabase = () => {
    // Handle Supabase connection here
    console.log("Connecting to Supabase:", { supabaseUrl, supabaseKey });
    setIsCloudDialogOpen(false);
  };

  return (
    <header className="h-16 bg-card/80 backdrop-blur-2xl flex items-center justify-between px-6 relative z-10">
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
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggleChat}
          className="h-8 w-8 p-0 hover:bg-primary/10 rounded-lg transition-all mr-12"
        >
          <PanelLeftClose className={cn(
            "w-4 h-4 text-muted-foreground hover:text-foreground transition-transform",
            isChatCollapsed && "rotate-180"
          )} />
        </Button>
      </div>

      {/* View Mode Toggle */}
      <div className="absolute left-1/2 -translate-x-1/2 flex items-center gap-1 ml-8">
        <div className="flex items-center gap-0.5">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("preview")}
            className={cn(
              "gap-1.5 rounded-lg transition-all duration-200 h-8 px-2.5 text-xs",
              viewMode === "preview" 
                ? "bg-muted shadow-sm border border-border" 
                : "hover:bg-muted/50"
            )}
          >
            <Eye className="w-3.5 h-3.5" />
            {viewMode === "preview" && <span className="font-medium">Preview</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setViewMode("code")}
            className={cn(
              "gap-1.5 rounded-lg transition-all duration-200 h-8 px-2.5 text-xs",
              viewMode === "code" 
                ? "bg-muted shadow-sm border border-border" 
                : "hover:bg-muted/50"
            )}
          >
            <Code2 className="w-3.5 h-3.5" />
            {viewMode === "code" && <span className="font-medium">Code</span>}
          </Button>

        <Dialog open={isCloudDialogOpen} onOpenChange={setIsCloudDialogOpen}>
          <DialogTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                "gap-1.5 rounded-lg transition-all duration-200 hover:bg-muted/50 h-8 w-8 p-0"
              )}
            >
              <Cloud className="w-3.5 h-3.5" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[525px]">
            <DialogHeader>
              <DialogTitle>Connect to Supabase</DialogTitle>
              <DialogDescription>
                Sync your Supabase project with PlusUltra. You'll need your project's API key and URL.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="supabase-url">Supabase Project URL</Label>
                <Input
                  id="supabase-url"
                  placeholder="https://your-project.supabase.co"
                  value={supabaseUrl}
                  onChange={(e) => setSupabaseUrl(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="supabase-key">Supabase Anon Key</Label>
                <Input
                  id="supabase-key"
                  type="password"
                  placeholder="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
                  value={supabaseKey}
                  onChange={(e) => setSupabaseKey(e.target.value)}
                />
              </div>
              <div className="rounded-lg border border-border p-4 bg-muted/30">
                <p className="text-sm text-muted-foreground mb-2">
                  Find your credentials in your Supabase project settings:
                </p>
                <a
                  href="https://supabase.com/dashboard/project/_/settings/api"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-primary hover:underline"
                >
                  Open Supabase Dashboard →
                </a>
              </div>
              <Button
                onClick={handleConnectSupabase}
                className="w-full bg-gradient-to-r from-accent to-purple hover:opacity-90 text-accent-foreground shadow-lg shadow-accent/20"
                disabled={!supabaseUrl || !supabaseKey}
              >
                Connect Project
              </Button>
            </div>
          </DialogContent>
        </Dialog>
        </div>

        {/* Device & Page Controls - Only show in preview mode */}
        {viewMode === "preview" && (
          <div className="flex items-center gap-2 ml-3 bg-secondary border border-border rounded-xl px-2 py-1">
            {/* Cycling Screen Size Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                const modes: DeviceMode[] = ["mobile", "tablet", "desktop"];
                const currentIndex = modes.indexOf(deviceMode);
                const nextIndex = (currentIndex + 1) % modes.length;
                setDeviceMode(modes[nextIndex]);
              }}
              className="h-7 w-7 p-0 hover:bg-card/50 rounded-lg transition-all"
            >
              {deviceMode === "mobile" && <Smartphone className="w-3.5 h-3.5" />}
              {deviceMode === "tablet" && <Tablet className="w-3.5 h-3.5" />}
              {deviceMode === "desktop" && <Monitor className="w-3.5 h-3.5" />}
            </Button>

            {/* Separator */}
            <span className="text-muted-foreground text-sm">/</span>

            {/* Page Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-7 px-2 hover:bg-card/50 rounded-lg text-xs font-medium"
                >
                  home
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-card border-border">
                <DropdownMenuItem className="text-xs">/home</DropdownMenuItem>
                <DropdownMenuItem className="text-xs">/camera</DropdownMenuItem>
                <DropdownMenuItem className="text-xs">/settings</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Spacer */}
            <div className="w-2" />

            {/* Open in New Window */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open(window.location.href, '_blank')}
              className="h-7 w-7 p-0 hover:bg-card/50 rounded-lg transition-all"
            >
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Button>

            {/* Refresh Preview */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              className="h-7 w-7 p-0 hover:bg-card/50 rounded-lg transition-all"
            >
              <RotateCw className="w-3.5 h-3.5" />
            </Button>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="sm" className="gap-2 glass-button rounded-lg">
          <Github className="w-4 h-4" />
        </Button>
        <Button variant="ghost" size="sm" className="gap-2 glass-button rounded-lg">
          <Share2 className="w-4 h-4" />
        </Button>
        <Button size="sm" className="gap-2 bg-gradient-to-r from-accent to-purple hover:opacity-90 text-accent-foreground shadow-lg shadow-accent/20 rounded-lg font-medium">
          <Sparkles className="w-4 h-4" />
          Publish
        </Button>
      </div>
    </header>
  );
};
