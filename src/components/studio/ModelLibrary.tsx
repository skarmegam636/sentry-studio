import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Box, 
  Circle, 
  Cylinder, 
  Triangle, 
  Hexagon,
  Search,
  Star,
  Grid3X3,
  Layers
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface ModelLibraryProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddModel: (modelType: string) => void;
}

interface ModelItem {
  id: string;
  name: string;
  icon: React.ReactNode;
  category: string;
  description: string;
}

const primitives: ModelItem[] = [
  { id: 'cube', name: 'Cube', icon: <Box className="w-8 h-8" />, category: 'primitives', description: 'Basic cube mesh' },
  { id: 'sphere', name: 'Sphere', icon: <Circle className="w-8 h-8" />, category: 'primitives', description: 'UV sphere' },
  { id: 'cylinder', name: 'Cylinder', icon: <Cylinder className="w-8 h-8" />, category: 'primitives', description: 'Cylinder mesh' },
  { id: 'cone', name: 'Cone', icon: <Triangle className="w-8 h-8" />, category: 'primitives', description: 'Cone mesh' },
  { id: 'torus', name: 'Torus', icon: <Circle className="w-8 h-8" />, category: 'primitives', description: 'Torus donut shape' },
  { id: 'plane', name: 'Plane', icon: <Grid3X3 className="w-8 h-8" />, category: 'primitives', description: 'Flat plane mesh' },
  { id: 'capsule', name: 'Capsule', icon: <Cylinder className="w-8 h-8" />, category: 'primitives', description: 'Capsule shape' },
  { id: 'icosphere', name: 'Icosphere', icon: <Hexagon className="w-8 h-8" />, category: 'primitives', description: 'Icosahedron sphere' },
];

const lights: ModelItem[] = [
  { id: 'point-light', name: 'Point Light', icon: <Star className="w-8 h-8" />, category: 'lights', description: 'Omnidirectional light' },
  { id: 'spot-light', name: 'Spot Light', icon: <Triangle className="w-8 h-8" />, category: 'lights', description: 'Directional cone light' },
  { id: 'directional-light', name: 'Sun Light', icon: <Circle className="w-8 h-8" />, category: 'lights', description: 'Parallel rays light' },
  { id: 'hemispheric-light', name: 'Ambient', icon: <Layers className="w-8 h-8" />, category: 'lights', description: 'Hemisphere ambient' },
];

const helpers: ModelItem[] = [
  { id: 'empty', name: 'Empty', icon: <Circle className="w-8 h-8" />, category: 'helpers', description: 'Empty transform node' },
  { id: 'camera', name: 'Camera', icon: <Box className="w-8 h-8" />, category: 'helpers', description: 'Perspective camera' },
  { id: 'target', name: 'Target', icon: <Circle className="w-8 h-8" />, category: 'helpers', description: 'Target locator' },
];

export const ModelLibrary = ({ open, onOpenChange, onAddModel }: ModelLibraryProps) => {
  const [search, setSearch] = useState('');
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);

  const filterItems = (items: ModelItem[]) => 
    items.filter(item => 
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.description.toLowerCase().includes(search.toLowerCase())
    );

  const handleAddModel = (modelType: string) => {
    onAddModel(modelType);
    onOpenChange(false);
  };

  const ModelGrid = ({ items }: { items: ModelItem[] }) => (
    <div className="grid grid-cols-4 gap-3 p-4">
      {filterItems(items).map((item) => (
        <motion.button
          key={item.id}
          className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted/50 border border-transparent hover:border-primary/50 hover:bg-muted transition-all group"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onMouseEnter={() => setHoveredItem(item.id)}
          onMouseLeave={() => setHoveredItem(null)}
          onClick={() => handleAddModel(item.id)}
        >
          <div className="text-muted-foreground group-hover:text-primary transition-colors">
            {item.icon}
          </div>
          <span className="text-xs font-medium text-foreground">{item.name}</span>
          {hoveredItem === item.id && (
            <motion.span 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-[10px] text-muted-foreground"
            >
              {item.description}
            </motion.span>
          )}
        </motion.button>
      ))}
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Layers className="w-5 h-5 text-primary" />
            Model Library
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search models..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        <Tabs defaultValue="primitives" className="flex-1 flex flex-col overflow-hidden">
          <TabsList className="w-full justify-start">
            <TabsTrigger value="primitives">Primitives</TabsTrigger>
            <TabsTrigger value="lights">Lights</TabsTrigger>
            <TabsTrigger value="helpers">Helpers</TabsTrigger>
          </TabsList>
          
          <ScrollArea className="flex-1">
            <TabsContent value="primitives" className="mt-0">
              <ModelGrid items={primitives} />
            </TabsContent>
            <TabsContent value="lights" className="mt-0">
              <ModelGrid items={lights} />
            </TabsContent>
            <TabsContent value="helpers" className="mt-0">
              <ModelGrid items={helpers} />
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <div className="flex justify-between items-center pt-4 border-t border-border">
          <span className="text-xs text-muted-foreground">
            Click to add to scene • Shift+A for quick add
          </span>
          <Button variant="outline" size="sm" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};