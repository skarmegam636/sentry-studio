import { motion, AnimatePresence } from 'framer-motion';
import { useStudioStore } from '@/stores/studioStore';
import { Cpu, Loader2 } from 'lucide-react';
import { Progress } from '@/components/ui/progress';

export const ViewportOverlay = () => {
  const { isLoading, loadProgress, isAnalyzing, viewportSettings } = useStudioStore();

  return (
    <>
      {/* Stats overlay */}
      {viewportSettings.showStats && (
        <div className="absolute top-3 left-3 bg-panel/80 backdrop-blur-sm rounded-lg p-2 text-xs font-mono space-y-1">
          <div className="text-muted-foreground">FPS: <span className="text-foreground">60</span></div>
          <div className="text-muted-foreground">Draw: <span className="text-foreground">142</span></div>
          <div className="text-muted-foreground">Tris: <span className="text-foreground">45.2K</span></div>
        </div>
      )}
      
      {/* Render mode indicator */}
      <div className="absolute top-3 right-3 bg-panel/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-mono text-muted-foreground">
        {viewportSettings.renderMode.toUpperCase()} · {viewportSettings.shadingMode.toUpperCase()}
      </div>
      
      {/* Camera controls hint */}
      <div className="absolute bottom-3 left-3 bg-panel/80 backdrop-blur-sm rounded-lg px-2 py-1 text-xs text-muted-foreground">
        LMB: Orbit · RMB: Pan · Scroll: Zoom
      </div>
      
      {/* Loading overlay */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <div className="text-sm font-medium mb-2">Loading Model...</div>
            <Progress value={loadProgress} className="w-48" />
            <div className="text-xs text-muted-foreground mt-2">{loadProgress}%</div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Sentry AI analyzing overlay */}
      <AnimatePresence>
        {isAnalyzing && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center"
          >
            <motion.div
              animate={{ 
                boxShadow: [
                  '0 0 20px hsl(185 80% 50% / 0.3)',
                  '0 0 40px hsl(185 80% 50% / 0.5)',
                  '0 0 20px hsl(185 80% 50% / 0.3)',
                ]
              }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center mb-4"
            >
              <Cpu className="w-10 h-10 text-primary-foreground" />
            </motion.div>
            
            <div className="text-lg font-semibold text-primary mb-2">Sentry AI Analyzing</div>
            <div className="text-sm text-muted-foreground">Detecting model type and optimal tools...</div>
            
            {/* Scanning line effect */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <motion.div
                className="absolute left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"
                animate={{ top: ['0%', '100%'] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
