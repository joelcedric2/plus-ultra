import { useState, useRef } from "react";
import { Panel, PanelGroup, PanelResizeHandle, ImperativePanelHandle } from "react-resizable-panels";
import { Header } from "./workspace/Header";
import { ChatPane } from "./workspace/ChatPane";
import { CodeView } from "./workspace/CodeView";
import { PreviewPane } from "./workspace/PreviewPane";

export type ViewMode = "code" | "preview";

export const Workspace = () => {
  const [viewMode, setViewMode] = useState<ViewMode>("preview");
  const chatPanelRef = useRef<ImperativePanelHandle>(null);
  const [isChatCollapsed, setIsChatCollapsed] = useState(false);

  const handleToggleChat = () => {
    if (chatPanelRef.current) {
      if (isChatCollapsed) {
        chatPanelRef.current.expand();
      } else {
        chatPanelRef.current.collapse();
      }
      setIsChatCollapsed(!isChatCollapsed);
    }
  };

  return (
    <div className="h-screen w-full flex flex-col bg-background">
      <Header 
        viewMode={viewMode} 
        setViewMode={setViewMode}
        onToggleChat={handleToggleChat}
        isChatCollapsed={isChatCollapsed}
      />
      
      <div className="flex-1 overflow-hidden">
        <PanelGroup direction="horizontal">
          <Panel 
            ref={chatPanelRef}
            defaultSize={35} 
            minSize={25} 
            maxSize={50}
            collapsible
            onCollapse={() => setIsChatCollapsed(true)}
            onExpand={() => setIsChatCollapsed(false)}
          >
            <ChatPane onToggleCollapse={handleToggleChat} isCollapsed={isChatCollapsed} />
          </Panel>
          
          <PanelResizeHandle className="w-1 bg-border/30 hover:bg-primary/50 hover:shadow-[0_0_20px_rgba(23,217,227,0.3)] transition-all duration-300" />
          
          <Panel defaultSize={65} minSize={40}>
            {viewMode === "code" ? <CodeView /> : <PreviewPane />}
          </Panel>
        </PanelGroup>
      </div>
    </div>
  );
};
