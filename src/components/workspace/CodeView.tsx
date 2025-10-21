import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode2, Folder } from "lucide-react";

export const CodeView = () => {
  const mockCode = `import { useState } from "react";
import { Button } from "@/components/ui/button";

export const App = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">
          PlusUltra
        </h1>
        <p className="text-muted-foreground">
          AI-Powered Development Platform
        </p>
        <div className="flex items-center justify-center gap-4">
          <Button onClick={() => setCount(count - 1)}>-</Button>
          <span className="text-2xl font-mono">{count}</span>
          <Button onClick={() => setCount(count + 1)}>+</Button>
        </div>
      </div>
    </div>
  );
};`;

  return (
    <div className="h-full flex flex-col bg-card/20">
      {/* File Tree Header */}
      <div className="h-12 border-b border-border glass-panel flex items-center px-4">
        <div className="flex items-center gap-2">
          <Folder className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">src/App.tsx</span>
        </div>
      </div>

      {/* Code Editor Area */}
      <ScrollArea className="flex-1">
        <div className="p-4">
          <div className="glass-panel rounded-lg p-4 font-mono text-sm">
            <div className="space-y-1">
              {mockCode.split("\n").map((line, i) => (
                <div key={i} className="flex gap-4">
                  <span className="text-muted-foreground select-none w-8 text-right">
                    {i + 1}
                  </span>
                  <span className="flex-1">
                    {line.split(" ").map((word, j) => {
                      if (word.startsWith("import") || word.startsWith("export") || word.startsWith("const") || word.startsWith("return")) {
                        return <span key={j} className="text-primary">{word} </span>;
                      }
                      if (word.startsWith("from") || word.startsWith("className")) {
                        return <span key={j} className="text-accent">{word} </span>;
                      }
                      if (word.startsWith('"') || word.startsWith("'")) {
                        return <span key={j} className="text-gold">{word} </span>;
                      }
                      return <span key={j}>{word} </span>;
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <div className="h-8 border-t border-border glass-panel flex items-center justify-between px-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-4">
          <span>TypeScript React</span>
          <span>•</span>
          <span>UTF-8</span>
        </div>
        <div className="flex items-center gap-2">
          <FileCode2 className="w-3 h-3" />
          <span>Ready</span>
        </div>
      </div>
    </div>
  );
};
