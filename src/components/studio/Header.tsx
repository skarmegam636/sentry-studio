import { useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Upload, 
  Download, 
  Settings, 
  HelpCircle, 
  Maximize2,
  Sun,
  Moon,
  Cpu,
  Zap
} from 'lucide-react';
import { useStudioStore } from '@/stores/studioStore';
import { getDomainConfig } from '@/lib/domainConfig';
import { sentryAI } from '@/lib/sentryAI';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const Header = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { 
    currentDomain, 
    isAnalyzing, 
    modelAnalysis,
    setCurrentFile, 
    setIsAnalyzing, 
    setModelAnalysis, 
    setDomain 
  } = useStudioStore();
  
  const domainConfig = getDomainConfig(currentDomain);

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

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <header className="h-12 bg-panel border-b border-panel-border flex items-center justify-between px-4">
      {/* Left: Logo & Domain */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-primary/50 flex items-center justify-center">
            <Zap className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="font-semibold text-lg tracking-tight">Sentry 3D</span>
        </div>
        
        <div className="h-6 w-px bg-border" />
        
        {/* Domain Indicator */}
        <motion.div 
          className="flex items-center gap-2"
          animate={{ opacity: 1 }}
          initial={{ opacity: 0 }}
          key={currentDomain}
        >
          <span className="text-xl">{domainConfig.icon}</span>
          <span className="text-sm font-medium text-muted-foreground">
            {domainConfig.name}
          </span>
          {modelAnalysis && (
            <span className="text-xs px-1.5 py-0.5 rounded bg-success/20 text-success font-mono">
              {(modelAnalysis.confidence * 100).toFixed(0)}%
            </span>
          )}
        </motion.div>
        
        {/* Analyzing Indicator */}
        {isAnalyzing && (
          <motion.div 
            className="flex items-center gap-2 text-primary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <Cpu className="w-4 h-4 animate-pulse" />
            <span className="text-sm font-medium animate-pulse-glow">
              Sentry AI Analyzing...
            </span>
          </motion.div>
        )}
      </div>
      
      {/* Center: File name */}
      <div className="flex items-center gap-2">
        {useStudioStore.getState().currentFile && (
          <span className="text-sm text-muted-foreground font-mono">
            {useStudioStore.getState().currentFile?.name}
          </span>
        )}
      </div>
      
      {/* Right: Actions */}
      <div className="flex items-center gap-2">
        <input
          ref={fileInputRef}
          type="file"
          accept=".gltf,.glb,.obj,.fbx,.stl,.ply,.3ds"
          onChange={handleFileSelect}
          className="hidden"
        />
        
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={handleImportClick}
          className="gap-2"
        >
          <Upload className="w-4 h-4" />
          Import
        </Button>
        
        <Button variant="ghost" size="sm" className="gap-2">
          <Download className="w-4 h-4" />
          Export
        </Button>
        
        <div className="h-6 w-px bg-border mx-1" />
        
        <Button variant="ghost" size="icon" className="w-8 h-8">
          <Maximize2 className="w-4 h-4" />
        </Button>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="w-8 h-8">
              <Settings className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem>
              <Settings className="w-4 h-4 mr-2" />
              Preferences
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Sun className="w-4 h-4 mr-2" />
              Theme
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <HelpCircle className="w-4 h-4 mr-2" />
              Help & Docs
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};
