import { motion } from 'framer-motion';
import { 
  Circle, Sparkles, Ruler, Scissors, Search, AlertTriangle, Package, Columns,
  Bone, Paintbrush, Smile, Users, Shirt, RefreshCw, Settings, GitBranch, Target,
  FileText, Layers, Expand, Brush, Leaf, Wind, Sun, Mountain, Grid, Minus,
  Maximize, Image, MoreHorizontal, Activity, Droplet, ArrowUp, Navigation,
  Flower, Box, Map, Zap, Database, ArrowDown, Thermometer, Globe, Play, Scale,
  Video, Aperture, Palette, RotateCw, Smartphone, Home, Diamond, Camera, MousePointer, Move
} from 'lucide-react';
import { useStudioStore } from '@/stores/studioStore';
import { getDomainConfig } from '@/lib/domainConfig';
import { cn } from '@/lib/utils';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { Badge } from '@/components/ui/badge';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Circle, Ruler, Scissors, Search, AlertTriangle, Package, Columns,
  Bone, Paintbrush, Smile, Users, Shirt, RefreshCw, Settings, GitBranch, Target,
  FileText, Layers, Expand, Brush, Leaf, Wind, Sun, Mountain, Grid, Minus,
  Maximize, Image, MoreHorizontal, Activity, Droplet, ArrowUp, Navigation,
  Flower, Box, Map, Zap, Database, ArrowDown, Thermometer, Globe, Play, Scale,
  Video, Aperture, Palette, RotateCw, Smartphone, Home, Diamond, Camera, MousePointer, Move
};

const getIcon = (iconName: string) => {
  const Icon = iconMap[iconName];
  return Icon ? <Icon className="w-4 h-4" /> : <Circle className="w-4 h-4" />;
};

export const DomainTools = () => {
  const { currentDomain, modelAnalysis, activeToolId, setActiveTool } = useStudioStore();
  const domainConfig = getDomainConfig(currentDomain);
  
  // Group tools by category
  const toolsByCategory = domainConfig.tools.reduce((acc, tool) => {
    if (!acc[tool.category]) {
      acc[tool.category] = [];
    }
    acc[tool.category].push(tool);
    return acc;
  }, {} as Record<string, typeof domainConfig.tools>);

  const isRecommended = (toolId: string) => 
    modelAnalysis?.recommendedTools.includes(toolId) ?? false;

  return (
    <div className="flex flex-col h-full">
      <div className="studio-panel-header">
        <span className="text-lg">{domainConfig.icon}</span>
        <span className="text-sm font-medium">{domainConfig.name} Tools</span>
      </div>
      
      <div className="flex-1 overflow-auto p-3 space-y-4">
        {Object.entries(toolsByCategory).map(([category, tools], categoryIndex) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: categoryIndex * 0.05 }}
          >
            <div className="text-xs font-medium text-muted-foreground uppercase tracking-wider mb-2">
              {category}
            </div>
            
            <div className="grid grid-cols-2 gap-2">
              {tools.map((tool, toolIndex) => (
                <Tooltip key={tool.id}>
                  <TooltipTrigger asChild>
                    <motion.button
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: categoryIndex * 0.05 + toolIndex * 0.02 }}
                      onClick={() => setActiveTool(tool.id)}
                      className={cn(
                        'relative flex items-center gap-2 p-2 rounded-lg text-left transition-all',
                        'bg-secondary/50 hover:bg-secondary border border-transparent',
                        activeToolId === tool.id && 'bg-primary/20 border-primary/50 text-primary',
                        isRecommended(tool.id) && 'ring-1 ring-success/30'
                      )}
                    >
                      <span className={cn(
                        'text-muted-foreground',
                        activeToolId === tool.id && 'text-primary'
                      )}>
                        {getIcon(tool.icon)}
                      </span>
                      <span className="text-sm truncate">{tool.name}</span>
                      
                      {isRecommended(tool.id) && (
                        <Badge 
                          variant="secondary" 
                          className="absolute -top-1 -right-1 text-[10px] px-1 py-0 bg-success/20 text-success border-0"
                        >
                          AI
                        </Badge>
                      )}
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-48">
                    <div className="font-medium">{tool.name}</div>
                    <div className="text-xs text-muted-foreground">{tool.description}</div>
                    {tool.shortcut && (
                      <kbd className="text-xs mt-1 inline-block px-1.5 py-0.5 rounded bg-muted font-mono">
                        {tool.shortcut}
                      </kbd>
                    )}
                  </TooltipContent>
                </Tooltip>
              ))}
            </div>
          </motion.div>
        ))}
        
        {/* Recommended Workflow */}
        {modelAnalysis && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-4 p-3 rounded-lg bg-primary/10 border border-primary/20"
          >
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-primary">Recommended Workflow</span>
            </div>
            <div className="text-sm text-muted-foreground">
              {modelAnalysis.recommendedWorkflow}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};
