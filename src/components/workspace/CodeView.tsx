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
    <div className="h-full flex flex-col bg-background/30">
      {/* File Tree Header */}
      <div className="h-14 border-b border-border/30 glass-panel flex items-center justify-between px-6">
        <div className="flex items-center gap-3">
          <Folder className="w-4 h-4 text-primary" />
          <span className="text-sm font-medium">src/App.tsx</span>
          <span className="text-xs text-muted-foreground px-2 py-1 bg-primary/10 rounded-md border border-primary/20">Modified</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <FileCode2 className="w-3.5 h-3.5" />
          <span>TypeScript React</span>
        </div>
      </div>

      {/* Code Editor Area */}
      <ScrollArea className="flex-1">
        <div className="p-6">
          <div className="glass-panel rounded-xl p-6 font-mono text-sm border border-primary/10 shadow-2xl">
            <div className="space-y-0.5">
              {mockCode.split("\n").map((line, i) => (
                <div key={i} className="flex gap-6 hover:bg-primary/5 px-2 py-0.5 rounded transition-colors">
                  <span className="text-muted-foreground/50 select-none w-10 text-right shrink-0 text-xs leading-6">
                    {i + 1}
                  </span>
                  <span className="flex-1 leading-6">
                    {line.split(" ").map((word, j) => {
                      if (word.startsWith("import") || word.startsWith("export") || word.startsWith("const") || word.startsWith("return")) {
                        return <span key={j} className="text-purple">{word} </span>;
                      }
                      if (word.startsWith("from") || word.startsWith("className")) {
                        return <span key={j} className="text-primary">{word} </span>;
                      }
                      if (word.startsWith('"') || word.startsWith("'")) {
                        return <span key={j} className="text-gold">{word} </span>;
                      }
                      if (word.startsWith("//")) {
                        return <span key={j} className="text-muted-foreground/70 italic">{word} </span>;
                      }
                      return <span key={j} className="text-foreground/90">{word} </span>;
                    })}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </ScrollArea>

      {/* Status Bar */}
      <div className="h-10 border-t border-border/30 glass-panel flex items-center justify-between px-6 text-xs">
        <div className="flex items-center gap-4 text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-primary" />
            <span className="font-medium">No errors</span>
          </div>
          <span>•</span>
          <span>UTF-8</span>
          <span>•</span>
          <span>LF</span>
        </div>
        <div className="flex items-center gap-4 text-muted-foreground">
          <span>Ln 1, Col 1</span>
          <span>•</span>
          <span className="text-primary">TSX</span>
        </div>
      </div>
    </div>
  );
};
