import { motion, AnimatePresence } from 'framer-motion';
import { useStudioStore } from '@/stores/studioStore';
import { Header } from './Header';
import { Toolbar } from './Toolbar';
import { BabylonViewport } from './BabylonViewport';
import { SceneHierarchy } from './SceneHierarchy';
import { DomainTools } from './DomainTools';
import { PropertiesPanel } from './PropertiesPanel';
import { ViewportOverlay } from './ViewportOverlay';
import { WelcomeOverlay } from './WelcomeOverlay';

export const StudioLayout = () => {
  const { leftPanelWidth, rightPanelWidth, currentFile, currentDomain } = useStudioStore();

  return (
    <div className="h-screen w-screen flex flex-col overflow-hidden bg-background">
      <Header />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <Toolbar />
        
        {/* Left Panel */}
        <motion.div
          initial={{ width: leftPanelWidth }}
          animate={{ width: leftPanelWidth }}
          className="bg-panel border-r border-panel-border flex flex-col overflow-hidden"
        >
          <div className="flex-1 overflow-hidden">
            <SceneHierarchy />
          </div>
          <div className="h-px bg-panel-border" />
          <div className="h-[50%] overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentDomain}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                className="h-full"
              >
                <DomainTools />
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
        
        {/* Main Viewport */}
        <div className="flex-1 relative overflow-hidden">
          <BabylonViewport />
          <ViewportOverlay />
          <WelcomeOverlay />
        </div>
        
        {/* Right Panel */}
        <motion.div
          initial={{ width: rightPanelWidth }}
          animate={{ width: rightPanelWidth }}
          className="bg-panel border-l border-panel-border overflow-hidden"
        >
          <PropertiesPanel />
        </motion.div>
      </div>
      
      {/* Status Bar */}
      <div className="h-6 bg-panel border-t border-panel-border flex items-center px-3 text-xs text-muted-foreground">
        <span>Ready</span>
        <span className="mx-2">·</span>
        <span>Babylon.js v7.x</span>
        <span className="ml-auto">
          {currentFile ? currentFile.name : 'No file loaded'}
        </span>
      </div>
    </div>
  );
};
