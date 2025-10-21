import { useState } from "react";
import { Monitor, Smartphone, Tablet } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type DeviceMode = "mobile" | "tablet" | "desktop";

export const PreviewPane = () => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");

  const getDeviceWidth = () => {
    switch (deviceMode) {
      case "mobile":
        return "max-w-[375px]";
      case "tablet":
        return "max-w-[768px]";
      default:
        return "w-full";
    }
  };

  return (
    <div className="h-full flex flex-col bg-background/30">
      {/* Preview Header */}
      <div className="h-14 border-b border-border/30 glass-panel flex items-center justify-between px-6">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-medium">Live Preview</span>
        </div>
        
        {/* Device Mode Selector */}
        <div className="flex items-center gap-1 bg-secondary border border-border rounded-xl p-1">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeviceMode("mobile")}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              deviceMode === "mobile" 
                ? "bg-card shadow-sm border border-border" 
                : "hover:bg-card/50"
            )}
          >
            <Smartphone className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeviceMode("tablet")}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              deviceMode === "tablet" 
                ? "bg-card shadow-sm border border-border" 
                : "hover:bg-card/50"
            )}
          >
            <Tablet className="w-4 h-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDeviceMode("desktop")}
            className={cn(
              "p-2 rounded-lg transition-all duration-200",
              deviceMode === "desktop" 
                ? "bg-card shadow-sm border border-border" 
                : "hover:bg-card/50"
            )}
          >
            <Monitor className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 p-8 flex items-center justify-center overflow-auto bg-gradient-to-br from-background via-background to-card/20">
        <div className={cn("h-full transition-all duration-300 mx-auto", getDeviceWidth())}>
          <div className="glass-panel rounded-2xl h-full flex flex-col overflow-hidden shadow-2xl border border-primary/10">
            {/* Mock App Preview - Clean Empty State */}
            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center">
              <div className="space-y-8 max-w-md">
                {/* Logo */}
                <div className="inline-flex">
                  <div className="w-24 h-24 rounded-3xl bg-primary/10 border border-border flex items-center justify-center">
                    <span className="text-5xl">⚡️</span>
                  </div>
                </div>
                
                {/* Text */}
                <div className="space-y-3">
                  <h1 className="text-4xl font-bold text-foreground">
                    Your App Preview
                  </h1>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    Start building by describing what you want in the chat. Watch your app come to life here in real-time.
                  </p>
                </div>

                {/* CTA */}
                <div className="flex items-center justify-center gap-3 pt-4">
                  <Button
                    variant="outline"
                    className="glass-button rounded-xl border-border hover:border-primary/30"
                  >
                    View Examples
                  </Button>
                  <Button className="bg-gradient-to-r from-accent to-purple hover:opacity-90 text-accent-foreground shadow-lg shadow-accent/20 rounded-xl font-medium">
                    Start Building
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
