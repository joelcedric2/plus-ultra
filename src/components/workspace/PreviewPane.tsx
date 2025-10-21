import { Button } from "@/components/ui/button";
import { Smartphone, Monitor, Tablet, RefreshCw } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

type DeviceMode = "mobile" | "tablet" | "desktop";

export const PreviewPane = () => {
  const [deviceMode, setDeviceMode] = useState<DeviceMode>("desktop");
  const [count, setCount] = useState(0);

  return (
    <div className="h-full flex flex-col bg-card/10">
      {/* Preview Controls */}
      <div className="h-12 border-b border-border glass-panel flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Live Preview</span>
          <div className="w-2 h-2 rounded-full bg-primary ai-glow" />
        </div>
        
        <div className="flex items-center gap-2">
          {/* Device Mode Selector */}
          <div className="flex items-center gap-1 glass-panel rounded-lg p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeviceMode("mobile")}
              className={cn(
                "h-7 w-7 p-0",
                deviceMode === "mobile" && "bg-primary/20 text-primary"
              )}
            >
              <Smartphone className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeviceMode("tablet")}
              className={cn(
                "h-7 w-7 p-0",
                deviceMode === "tablet" && "bg-primary/20 text-primary"
              )}
            >
              <Tablet className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setDeviceMode("desktop")}
              className={cn(
                "h-7 w-7 p-0",
                deviceMode === "desktop" && "bg-primary/20 text-primary"
              )}
            >
              <Monitor className="w-4 h-4" />
            </Button>
          </div>
          
          <Button variant="ghost" size="sm" className="h-7 w-7 p-0 glass-button">
            <RefreshCw className="w-4 h-4" />
          </Button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
        <div
          className={cn(
            "glass-panel rounded-lg transition-all duration-300 h-full",
            deviceMode === "mobile" && "max-w-[375px]",
            deviceMode === "tablet" && "max-w-[768px]",
            deviceMode === "desktop" && "w-full"
          )}
        >
          {/* Mock App Preview */}
          <div className="h-full flex items-center justify-center p-8">
            <div className="text-center space-y-6">
              <div className="space-y-2">
                <h1 className="text-5xl font-bold bg-gradient-to-r from-primary via-primary to-primary/70 bg-clip-text text-transparent">
                  PlusUltra
                </h1>
                <p className="text-xl text-muted-foreground">
                  The Self-Healing App Studio
                </p>
              </div>

              <div className="flex flex-col items-center gap-4 pt-4">
                <div className="text-sm text-muted-foreground">
                  Counter Demo
                </div>
                <div className="flex items-center gap-6">
                  <Button
                    onClick={() => setCount(count - 1)}
                    size="lg"
                    variant="outline"
                    className="glass-button w-12 h-12 rounded-full text-xl"
                  >
                    -
                  </Button>
                  <span className="text-4xl font-mono font-bold text-primary min-w-[80px]">
                    {count}
                  </span>
                  <Button
                    onClick={() => setCount(count + 1)}
                    size="lg"
                    className="w-12 h-12 rounded-full text-xl"
                  >
                    +
                  </Button>
                </div>
              </div>

              <div className="pt-8 space-y-3">
                <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
                  <div className="w-2 h-2 rounded-full bg-primary ai-glow" />
                  <span>AI-Powered • Self-Healing • Multi-Platform</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Status Bar */}
      <div className="h-8 border-t border-border glass-panel flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Ready</span>
        </div>
        <span>{deviceMode} view</span>
      </div>
    </div>
  );
};
