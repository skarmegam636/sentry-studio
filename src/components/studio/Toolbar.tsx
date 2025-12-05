import { motion } from 'framer-motion';
import { 
  MousePointer, 
  Move, 
  RotateCw, 
  Maximize, 
  Ruler,
  Grid3X3,
  Eye,
  Box,
  Layers,
  Camera,
  Play,
  Pause,
  SkipBack
} from 'lucide-react';
import { useStudioStore } from '@/stores/studioStore';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';

interface Tool {
  id: string;
  icon: React.ReactNode;
  label: string;
  shortcut: string;
}

const transformTools: Tool[] = [
  { id: 'select', icon: <MousePointer className="w-4 h-4" />, label: 'Select', shortcut: 'Q' },
  { id: 'move', icon: <Move className="w-4 h-4" />, label: 'Move', shortcut: 'G' },
  { id: 'rotate', icon: <RotateCw className="w-4 h-4" />, label: 'Rotate', shortcut: 'R' },
  { id: 'scale', icon: <Maximize className="w-4 h-4" />, label: 'Scale', shortcut: 'S' },
];

const viewTools: Tool[] = [
  { id: 'measure', icon: <Ruler className="w-4 h-4" />, label: 'Measure', shortcut: 'M' },
  { id: 'grid', icon: <Grid3X3 className="w-4 h-4" />, label: 'Toggle Grid', shortcut: 'Shift+G' },
  { id: 'wireframe', icon: <Box className="w-4 h-4" />, label: 'Wireframe', shortcut: 'Z' },
  { id: 'layers', icon: <Layers className="w-4 h-4" />, label: 'Layers', shortcut: 'L' },
];

const cameraTools: Tool[] = [
  { id: 'camera', icon: <Camera className="w-4 h-4" />, label: 'Camera', shortcut: 'C' },
  { id: 'focus', icon: <Eye className="w-4 h-4" />, label: 'Focus Selected', shortcut: 'F' },
];

const playbackTools: Tool[] = [
  { id: 'play', icon: <Play className="w-4 h-4" />, label: 'Play', shortcut: 'Space' },
  { id: 'pause', icon: <Pause className="w-4 h-4" />, label: 'Pause', shortcut: 'Space' },
  { id: 'reset', icon: <SkipBack className="w-4 h-4" />, label: 'Reset', shortcut: 'Home' },
];

const ToolButton = ({ tool, isActive, onClick }: { tool: Tool; isActive: boolean; onClick: () => void }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <motion.button
        onClick={onClick}
        className={cn(
          'tool-button relative',
          isActive && 'tool-button-active'
        )}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {tool.icon}
        {isActive && (
          <motion.div
            layoutId="activeToolIndicator"
            className="absolute inset-0 rounded-md bg-primary"
            style={{ zIndex: -1 }}
          />
        )}
      </motion.button>
    </TooltipTrigger>
    <TooltipContent side="right" className="flex items-center gap-2">
      <span>{tool.label}</span>
      <kbd className="text-xs px-1.5 py-0.5 rounded bg-muted font-mono">{tool.shortcut}</kbd>
    </TooltipContent>
  </Tooltip>
);

const ToolGroup = ({ tools, activeToolId, onToolSelect }: { 
  tools: Tool[]; 
  activeToolId: string | null; 
  onToolSelect: (id: string) => void;
}) => (
  <div className="flex flex-col gap-1">
    {tools.map(tool => (
      <ToolButton
        key={tool.id}
        tool={tool}
        isActive={activeToolId === tool.id}
        onClick={() => onToolSelect(tool.id)}
      />
    ))}
  </div>
);

export const Toolbar = () => {
  const { activeToolId, setActiveTool } = useStudioStore();

  return (
    <div className="w-12 bg-toolbar border-r border-panel-border flex flex-col items-center py-2 gap-4">
      <ToolGroup tools={transformTools} activeToolId={activeToolId} onToolSelect={setActiveTool} />
      
      <div className="w-6 h-px bg-border" />
      
      <ToolGroup tools={viewTools} activeToolId={activeToolId} onToolSelect={setActiveTool} />
      
      <div className="w-6 h-px bg-border" />
      
      <ToolGroup tools={cameraTools} activeToolId={activeToolId} onToolSelect={setActiveTool} />
      
      <div className="flex-1" />
      
      <ToolGroup tools={playbackTools} activeToolId={activeToolId} onToolSelect={setActiveTool} />
    </div>
  );
};
