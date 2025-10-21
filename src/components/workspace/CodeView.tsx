import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FileCode2, Folder, ChevronRight, ChevronDown, File } from "lucide-react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { cn } from "@/lib/utils";

interface FileNode {
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
}

const fileStructure: FileNode[] = [
  {
    name: "src",
    type: "folder",
    children: [
      {
        name: "components",
        type: "folder",
        children: [
          {
            name: "ui",
            type: "folder",
            children: [
              { name: "button.tsx", type: "file" },
              { name: "card.tsx", type: "file" },
              { name: "input.tsx", type: "file" },
            ],
          },
          {
            name: "workspace",
            type: "folder",
            children: [
              { name: "ChatPane.tsx", type: "file" },
              { name: "CodeView.tsx", type: "file" },
              { name: "Header.tsx", type: "file" },
              { name: "PreviewPane.tsx", type: "file" },
            ],
          },
          { name: "Workspace.tsx", type: "file" },
        ],
      },
      {
        name: "pages",
        type: "folder",
        children: [
          { name: "Index.tsx", type: "file" },
          { name: "NotFound.tsx", type: "file" },
        ],
      },
      { name: "App.tsx", type: "file" },
      { name: "main.tsx", type: "file" },
      { name: "index.css", type: "file" },
    ],
  },
  {
    name: "public",
    type: "folder",
    children: [
      { name: "favicon.ico", type: "file" },
      { name: "robots.txt", type: "file" },
    ],
  },
  { name: "index.html", type: "file" },
  { name: "package.json", type: "file" },
  { name: "tailwind.config.ts", type: "file" },
  { name: "vite.config.ts", type: "file" },
  { name: "README.md", type: "file" },
];

interface FileTreeItemProps {
  node: FileNode;
  depth?: number;
  onSelect: (path: string) => void;
  selectedFile: string;
  parentPath?: string;
}

const FileTreeItem = ({ node, depth = 0, onSelect, selectedFile, parentPath = "" }: FileTreeItemProps) => {
  const [isOpen, setIsOpen] = useState(depth === 0 || node.name === "src");
  const fullPath = parentPath ? `${parentPath}/${node.name}` : node.name;
  const isSelected = selectedFile === fullPath;

  return (
    <div>
      <button
        onClick={() => {
          if (node.type === "folder") {
            setIsOpen(!isOpen);
          } else {
            onSelect(fullPath);
          }
        }}
        className={cn(
          "w-full flex items-center gap-2 px-2 py-1.5 text-sm hover:bg-primary/10 transition-colors rounded-md group",
          isSelected && "bg-primary/20 text-primary"
        )}
        style={{ paddingLeft: `${depth * 12 + 8}px` }}
      >
        {node.type === "folder" ? (
          <>
            {isOpen ? (
              <ChevronDown className="w-4 h-4 text-muted-foreground" />
            ) : (
              <ChevronRight className="w-4 h-4 text-muted-foreground" />
            )}
            <Folder className={cn("w-4 h-4", isOpen ? "text-primary" : "text-muted-foreground")} />
          </>
        ) : (
          <>
            <div className="w-4" />
            <File className="w-4 h-4 text-muted-foreground group-hover:text-foreground" />
          </>
        )}
        <span className={cn("flex-1 text-left truncate", isSelected && "font-medium")}>
          {node.name}
        </span>
      </button>
      {node.type === "folder" && isOpen && node.children && (
        <div>
          {node.children.map((child, index) => (
            <FileTreeItem
              key={index}
              node={child}
              depth={depth + 1}
              onSelect={onSelect}
              selectedFile={selectedFile}
              parentPath={fullPath}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const CodeView = () => {
  const [selectedFile, setSelectedFile] = useState("src/App.tsx");

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
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          {/* File Explorer Sidebar */}
          <Panel defaultSize={20} minSize={15} maxSize={35}>
            <div className="h-full flex flex-col border-r border-border/30 bg-card/30 backdrop-blur-xl">
              {/* Explorer Header */}
              <div className="h-14 border-b border-border/30 glass-panel flex items-center px-4">
                <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                  Explorer
                </span>
              </div>

              {/* File Tree */}
              <ScrollArea className="flex-1">
                <div className="p-2">
                  {fileStructure.map((node, index) => (
                    <FileTreeItem
                      key={index}
                      node={node}
                      onSelect={setSelectedFile}
                      selectedFile={selectedFile}
                    />
                  ))}
                </div>
              </ScrollArea>
            </div>
          </Panel>

          <PanelResizeHandle className="w-1 bg-border/30 hover:bg-primary/50 hover:shadow-[0_0_20px_rgba(23,217,227,0.3)] transition-all duration-300" />

          {/* Code Editor */}
          <Panel defaultSize={80} minSize={50}>
            <div className="h-full flex flex-col">
              {/* Editor Header */}
              <div className="h-14 border-b border-border/30 glass-panel flex items-center justify-between px-6">
                <div className="flex items-center gap-3">
                  <FileCode2 className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">{selectedFile}</span>
                  <span className="text-xs text-muted-foreground px-2 py-1 bg-muted rounded-md border border-border">
                    Modified
                  </span>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>TypeScript React</span>
                </div>
              </div>

              {/* Code Editor Area */}
              <ScrollArea className="flex-1">
                <div className="p-6">
                  <div className="glass-panel rounded-xl p-6 font-mono text-sm border border-primary/10 shadow-2xl">
                    <div className="space-y-0.5">
                      {mockCode.split("\n").map((line, i) => (
                        <div
                          key={i}
                          className="flex gap-6 hover:bg-primary/5 px-2 py-0.5 rounded transition-colors"
                        >
                          <span className="text-muted-foreground/50 select-none w-10 text-right shrink-0 text-xs leading-6">
                            {i + 1}
                          </span>
                          <span className="flex-1 leading-6">
                            {line.split(" ").map((word, j) => {
                              if (
                                word.startsWith("import") ||
                                word.startsWith("export") ||
                                word.startsWith("const") ||
                                word.startsWith("return")
                              ) {
                                return (
                                  <span key={j} className="text-purple">
                                    {word}{" "}
                                  </span>
                                );
                              }
                              if (word.startsWith("from") || word.startsWith("className")) {
                                return (
                                  <span key={j} className="text-primary">
                                    {word}{" "}
                                  </span>
                                );
                              }
                              if (word.startsWith('"') || word.startsWith("'")) {
                                return (
                                  <span key={j} className="text-gold">
                                    {word}{" "}
                                  </span>
                                );
                              }
                              if (word.startsWith("//")) {
                                return (
                                  <span key={j} className="text-muted-foreground/70 italic">
                                    {word}{" "}
                                  </span>
                                );
                              }
                              return (
                                <span key={j} className="text-foreground/90">
                                  {word}{" "}
                                </span>
                              );
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
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
