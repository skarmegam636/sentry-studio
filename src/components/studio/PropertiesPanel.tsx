import { motion } from 'framer-motion';
import { 
  Palette, 
  Box, 
  Move3D, 
  RotateCcw, 
  Maximize,
  Info,
  FileText,
  Cpu
} from 'lucide-react';
import { useStudioStore } from '@/stores/studioStore';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export const PropertiesPanel = () => {
  const { selectedObjectId, sceneObjects, modelAnalysis } = useStudioStore();
  const selectedObject = sceneObjects.find(obj => obj.id === selectedObjectId);

  return (
    <div className="flex flex-col h-full">
      <div className="studio-panel-header">
        <Info className="w-4 h-4 text-muted-foreground" />
        <span className="text-sm font-medium">Properties</span>
      </div>
      
      <Tabs defaultValue="transform" className="flex-1 flex flex-col">
        <TabsList className="w-full justify-start px-2 pt-2 bg-transparent">
          <TabsTrigger value="transform" className="text-xs">Transform</TabsTrigger>
          <TabsTrigger value="material" className="text-xs">Material</TabsTrigger>
          <TabsTrigger value="stats" className="text-xs">Stats</TabsTrigger>
        </TabsList>
        
        <TabsContent value="transform" className="flex-1 p-3 space-y-4">
          {selectedObject ? (
            <>
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-2">
                  <Move3D className="w-3 h-3" /> Position
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground">X</span>
                    <Input type="number" defaultValue="0" className="h-7 text-xs" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Y</span>
                    <Input type="number" defaultValue="0" className="h-7 text-xs" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Z</span>
                    <Input type="number" defaultValue="0" className="h-7 text-xs" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-2">
                  <RotateCcw className="w-3 h-3" /> Rotation
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground">X</span>
                    <Input type="number" defaultValue="0" className="h-7 text-xs" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Y</span>
                    <Input type="number" defaultValue="0" className="h-7 text-xs" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Z</span>
                    <Input type="number" defaultValue="0" className="h-7 text-xs" />
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label className="text-xs text-muted-foreground flex items-center gap-2">
                  <Maximize className="w-3 h-3" /> Scale
                </Label>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <span className="text-[10px] text-muted-foreground">X</span>
                    <Input type="number" defaultValue="1" className="h-7 text-xs" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Y</span>
                    <Input type="number" defaultValue="1" className="h-7 text-xs" />
                  </div>
                  <div>
                    <span className="text-[10px] text-muted-foreground">Z</span>
                    <Input type="number" defaultValue="1" className="h-7 text-xs" />
                  </div>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              Select an object to edit
            </div>
          )}
        </TabsContent>
        
        <TabsContent value="material" className="flex-1 p-3 space-y-4">
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground flex items-center gap-2">
              <Palette className="w-3 h-3" /> Base Color
            </Label>
            <div className="flex gap-2">
              <div className="w-8 h-8 rounded-md bg-primary border border-border cursor-pointer" />
              <Input type="text" defaultValue="#33c3d1" className="h-8 text-xs font-mono" />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Metallic</Label>
            <Slider defaultValue={[0.8]} max={1} step={0.01} />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Roughness</Label>
            <Slider defaultValue={[0.2]} max={1} step={0.01} />
          </div>
          
          <div className="space-y-2">
            <Label className="text-xs text-muted-foreground">Emissive Intensity</Label>
            <Slider defaultValue={[0.1]} max={1} step={0.01} />
          </div>
        </TabsContent>
        
        <TabsContent value="stats" className="flex-1 p-3">
          {modelAnalysis ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-2 text-sm">
                <Cpu className="w-4 h-4 text-primary" />
                <span className="font-medium">Sentry AI Analysis</span>
              </div>
              
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Domain</span>
                  <span className="font-mono">{modelAnalysis.domain}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Confidence</span>
                  <span className="font-mono text-success">
                    {(modelAnalysis.confidence * 100).toFixed(1)}%
                  </span>
                </div>
                {modelAnalysis.subType && (
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Sub-type</span>
                    <span className="font-mono">{modelAnalysis.subType}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Vertices</span>
                  <span className="font-mono">{modelAnalysis.vertexCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Faces</span>
                  <span className="font-mono">{modelAnalysis.faceCount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Materials</span>
                  <span className="font-mono">{modelAnalysis.materialCount}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Animations</span>
                  <span className="font-mono">{modelAnalysis.hasAnimations ? 'Yes' : 'No'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Skeleton</span>
                  <span className="font-mono">{modelAnalysis.hasSkeleton ? 'Yes' : 'No'}</span>
                </div>
              </div>
            </motion.div>
          ) : (
            <div className="text-center py-8 text-muted-foreground text-sm">
              <FileText className="w-8 h-8 mx-auto mb-2 opacity-50" />
              Import a model to see analysis
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};
