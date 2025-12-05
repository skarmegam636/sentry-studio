import { motion, AnimatePresence } from 'framer-motion';
import { 
  ChevronRight, 
  Eye, 
  EyeOff, 
  Lock, 
  Unlock,
  Box,
  Lightbulb,
  Camera,
  Circle
} from 'lucide-react';
import { useStudioStore } from '@/stores/studioStore';
import type { SceneObject } from '@/types/sentry';
import { cn } from '@/lib/utils';

const getObjectIcon = (type: SceneObject['type']) => {
  switch (type) {
    case 'mesh': return <Box className="w-4 h-4" />;
    case 'light': return <Lightbulb className="w-4 h-4" />;
    case 'camera': return <Camera className="w-4 h-4" />;
    default: return <Circle className="w-4 h-4" />;
  }
};

const SceneObjectItem = ({ 
  object, 
  depth = 0 
}: { 
  object: SceneObject; 
  depth?: number;
}) => {
  const { selectedObjectId, selectObject, toggleObjectVisibility } = useStudioStore();
  const isSelected = selectedObjectId === object.id;

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -10 }}
    >
      <div
        className={cn(
          'flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer transition-colors',
          'hover:bg-secondary/50',
          isSelected && 'bg-primary/20 text-primary'
        )}
        style={{ paddingLeft: `${8 + depth * 16}px` }}
        onClick={() => selectObject(object.id)}
      >
        {object.children && object.children.length > 0 && (
          <ChevronRight className="w-3 h-3 text-muted-foreground" />
        )}
        
        <span className={cn(
          'text-muted-foreground',
          isSelected && 'text-primary'
        )}>
          {getObjectIcon(object.type)}
        </span>
        
        <span className={cn(
          'flex-1 text-sm truncate',
          !object.visible && 'opacity-50'
        )}>
          {object.name}
        </span>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleObjectVisibility(object.id);
          }}
          className="p-1 rounded hover:bg-secondary text-muted-foreground hover:text-foreground"
        >
          {object.visible ? (
            <Eye className="w-3 h-3" />
          ) : (
            <EyeOff className="w-3 h-3" />
          )}
        </button>
        
        <span className="text-muted-foreground">
          {object.locked ? (
            <Lock className="w-3 h-3" />
          ) : (
            <Unlock className="w-3 h-3 opacity-30" />
          )}
        </span>
      </div>
      
      {object.children && (
        <AnimatePresence>
          {object.children.map(child => (
            <SceneObjectItem key={child.id} object={child} depth={depth + 1} />
          ))}
        </AnimatePresence>
      )}
    </motion.div>
  );
};

export const SceneHierarchy = () => {
  const { sceneObjects } = useStudioStore();

  return (
    <div className="flex flex-col h-full">
      <div className="studio-panel-header">
        <Box className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Scene</span>
        <span className="text-xs text-muted-foreground ml-auto">
          {sceneObjects.length} objects
        </span>
      </div>
      
      <div className="flex-1 overflow-auto p-2">
        <AnimatePresence>
          {sceneObjects.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground text-sm">
              No objects in scene
            </div>
          ) : (
            sceneObjects.map(obj => (
              <SceneObjectItem key={obj.id} object={obj} />
            ))
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
