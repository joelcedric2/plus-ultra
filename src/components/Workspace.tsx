import { useState } from "react";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";
import { Header } from "./workspace/Header";
import { ChatPane } from "./workspace/ChatPane";
import { CodeView } from "./workspace/CodeView";
import { PreviewPane } from "./workspace/PreviewPane";

export type ViewMode = "code" | "preview";

export const Workspace = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("preview");

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <Header viewMode={viewMode} setViewMode={setViewMode} />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel defaultSize={35} minSize={25} maxSize={50}>
            <ChatPane />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border hover:bg-primary/50 transition-colors duration-200" />
          
          <Panel defaultSize={65} minSize={40}>
            {viewMode === "code" ? <CodeView /> : <PreviewPane />}
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
