import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Upload, FileBox, Sparkles, Zap, Layers, Cpu, Loader2 } from 'lucide-react';
import { useStudioStore } from '@/stores/studioStore';
import { sentryAI } from '@/lib/sentryAI';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const features = [
  {
    icon: <Cpu className="w-5 h-5" />,
    title: 'Sentry AI Detection',
    description: 'Auto-detects model type and adapts tools',
  },
  {
    icon: <Layers className="w-5 h-5" />,
    title: '15+ Domain Workflows',
    description: 'Building, Character, CAD, VFX, and more',
  },
  {
    icon: <Sparkles className="w-5 h-5" />,
    title: 'Smart Recommendations',
    description: 'AI-powered tool suggestions',
  },
  {
    icon: <Zap className="w-5 h-5" />,
    title: 'Real-time Rendering',
    description: 'WebGPU-powered 60 FPS',
  },
];

const supportedFormats = ['GLTF', 'GLB', 'OBJ', 'FBX', 'STL', 'PLY', '3DS'];

const demoModels = [
  { name: 'character_model.glb', domain: 'character' as const },
  { name: 'building_facade.ifc', domain: 'building' as const },
  { name: 'engine_assembly.step', domain: 'cad' as const },
  { name: 'forest_scene.gltf', domain: 'vegetation' as const },
];

export const WelcomeOverlay = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [loadingDemo, setLoadingDemo] = useState(false);
  const { 
    currentFile, 
    setCurrentFile, 
    setIsAnalyzing, 
    setModelAnalysis, 
    setDomain,
    setSceneObjects
  } = useStudioStore();

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setCurrentFile(file);
    setIsAnalyzing(true);
    
    try {
      const analysis = await sentryAI.analyzeModel(file);
      setModelAnalysis(analysis);
      setDomain(analysis.domain);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleDrop = async (event: React.DragEvent) => {
    event.preventDefault();
    const file = event.dataTransfer.files?.[0];
    if (!file) return;
    
    setCurrentFile(file);
    setIsAnalyzing(true);
    
    try {
      const analysis = await sentryAI.analyzeModel(file);
      setModelAnalysis(analysis);
      setDomain(analysis.domain);
    } catch (error) {
      console.error('Analysis failed:', error);
    } finally {
      setIsAnalyzing(false);
    }
  };

  if (currentFile) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-background via-background to-primary/5"
    >
      <div className="max-w-2xl w-full mx-4">
        {/* Logo and title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            className="w-20 h-20 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center"
            animate={{ 
              boxShadow: [
                '0 0 20px hsl(185 80% 50% / 0.3)',
                '0 0 40px hsl(185 80% 50% / 0.5)',
                '0 0 20px hsl(185 80% 50% / 0.3)',
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Zap className="w-10 h-10 text-primary-foreground" />
          </motion.div>
          <h1 className="text-3xl font-bold mb-2">Sentry 3D Studio</h1>
          <p className="text-muted-foreground">
            AI-powered 3D viewer & editor with adaptive domain-specific workflows
          </p>
        </motion.div>

        {/* Drop zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="relative group"
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".gltf,.glb,.obj,.fbx,.stl,.ply,.3ds"
            onChange={handleFileSelect}
            className="hidden"
          />
          
          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-border rounded-2xl p-8 text-center cursor-pointer transition-all hover:border-primary hover:bg-primary/5 group-hover:shadow-lg group-hover:shadow-primary/10"
          >
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/20 transition-colors">
              <Upload className="w-8 h-8 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
            <div className="text-lg font-medium mb-1">Drop your 3D model here</div>
            <div className="text-sm text-muted-foreground mb-4">or click to browse</div>
            
            <div className="flex flex-wrap justify-center gap-2">
              {supportedFormats.map((format) => (
                <span
                  key={format}
                  className="px-2 py-1 rounded-md bg-secondary text-xs font-mono text-muted-foreground"
                >
                  .{format.toLowerCase()}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="p-4 rounded-xl bg-card border border-border hover:border-primary/50 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center text-primary mb-3">
                {feature.icon}
              </div>
              <div className="text-sm font-medium mb-1">{feature.title}</div>
              <div className="text-xs text-muted-foreground">{feature.description}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Demo buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-center mt-8 space-y-3"
        >
          <div className="text-sm text-muted-foreground mb-2">Or try a demo:</div>
          <div className="flex flex-wrap justify-center gap-2">
            {demoModels.map((demo) => (
              <Button 
                key={demo.name}
                variant="outline" 
                size="sm"
                disabled={loadingDemo}
                className="gap-2"
                onClick={async () => {
                  setLoadingDemo(true);
                  setIsAnalyzing(true);
                  
                  // Create a fake file
                  const fakeFile = new File([''], demo.name, { type: 'model/gltf-binary' });
                  
                  try {
                    const analysis = await sentryAI.analyzeModel(fakeFile);
                    setModelAnalysis(analysis);
                    setDomain(analysis.domain);
                    setSceneObjects([
                      { id: 'demo-1', name: 'Demo Model', type: 'mesh', visible: true, locked: false },
                      { id: 'demo-2', name: 'Material Group', type: 'mesh', visible: true, locked: false },
                      { id: 'demo-3', name: 'Sub Component', type: 'mesh', visible: true, locked: false },
                    ]);
                    toast.success(`Loaded ${demo.name}`, {
                      description: `Domain detected: ${analysis.domain} (${(analysis.confidence * 100).toFixed(0)}% confidence)`,
                    });
                  } catch (error) {
                    console.error('Demo load failed:', error);
                  } finally {
                    setIsAnalyzing(false);
                    setLoadingDemo(false);
                  }
                }}
              >
                {loadingDemo ? (
                  <Loader2 className="w-3 h-3 animate-spin" />
                ) : (
                  <FileBox className="w-3 h-3" />
                )}
                {demo.name.split('_')[0]}
              </Button>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
