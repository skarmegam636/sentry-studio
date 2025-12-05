import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Camera, 
  Download,
  Image,
  Film,
  Settings2,
  Monitor,
  Smartphone,
  Square
} from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface RenderExportProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  canvasRef: React.RefObject<HTMLCanvasElement> | null;
}

interface RenderSettings {
  width: number;
  height: number;
  format: 'png' | 'jpeg' | 'webp';
  quality: number;
  transparentBackground: boolean;
  antiAliasing: boolean;
  filename: string;
}

const presets = [
  { name: 'HD', width: 1920, height: 1080, icon: <Monitor className="w-4 h-4" /> },
  { name: '4K', width: 3840, height: 2160, icon: <Monitor className="w-4 h-4" /> },
  { name: 'Square', width: 1080, height: 1080, icon: <Square className="w-4 h-4" /> },
  { name: 'Mobile', width: 1080, height: 1920, icon: <Smartphone className="w-4 h-4" /> },
  { name: 'Thumbnail', width: 512, height: 512, icon: <Image className="w-4 h-4" /> },
];

export const RenderExport = ({ open, onOpenChange, canvasRef }: RenderExportProps) => {
  const [settings, setSettings] = useState<RenderSettings>({
    width: 1920,
    height: 1080,
    format: 'png',
    quality: 100,
    transparentBackground: false,
    antiAliasing: true,
    filename: 'render',
  });
  const [isRendering, setIsRendering] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  const updateSetting = <K extends keyof RenderSettings>(key: K, value: RenderSettings[K]) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const applyPreset = (preset: typeof presets[0]) => {
    setSettings(prev => ({
      ...prev,
      width: preset.width,
      height: preset.height,
    }));
  };

  const captureRender = async () => {
    if (!canvasRef?.current) return;
    
    setIsRendering(true);
    
    // Small delay to ensure render is complete
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      const canvas = canvasRef.current;
      const mimeType = `image/${settings.format}`;
      const quality = settings.format === 'png' ? undefined : settings.quality / 100;
      
      // Create a temporary canvas for resizing
      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = settings.width;
      tempCanvas.height = settings.height;
      const ctx = tempCanvas.getContext('2d');
      
      if (ctx) {
        if (settings.transparentBackground) {
          ctx.clearRect(0, 0, settings.width, settings.height);
        }
        ctx.drawImage(canvas, 0, 0, settings.width, settings.height);
        
        const dataUrl = tempCanvas.toDataURL(mimeType, quality);
        setPreviewUrl(dataUrl);
      }
    } catch (error) {
      console.error('Render capture failed:', error);
    } finally {
      setIsRendering(false);
    }
  };

  const downloadRender = () => {
    if (!previewUrl) return;
    
    const link = document.createElement('a');
    link.href = previewUrl;
    link.download = `${settings.filename}.${settings.format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const aspectRatio = settings.width / settings.height;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[85vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Camera className="w-5 h-5 text-primary" />
            Render Export
          </DialogTitle>
        </DialogHeader>

        <div className="flex gap-6 flex-1 overflow-hidden">
          {/* Left: Settings */}
          <div className="w-64 flex flex-col gap-4">
            <Tabs defaultValue="output" className="w-full">
              <TabsList className="w-full">
                <TabsTrigger value="output" className="flex-1">Output</TabsTrigger>
                <TabsTrigger value="settings" className="flex-1">Settings</TabsTrigger>
              </TabsList>
              
              <TabsContent value="output" className="space-y-4 mt-4">
                {/* Resolution Presets */}
                <div className="space-y-2">
                  <Label className="text-xs text-muted-foreground">Presets</Label>
                  <div className="flex flex-wrap gap-1">
                    {presets.map(preset => (
                      <Button
                        key={preset.name}
                        variant={settings.width === preset.width && settings.height === preset.height ? 'default' : 'outline'}
                        size="sm"
                        className="text-xs gap-1"
                        onClick={() => applyPreset(preset)}
                      >
                        {preset.icon}
                        {preset.name}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Resolution */}
                <div className="grid grid-cols-2 gap-2">
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Width</Label>
                    <Input
                      type="number"
                      value={settings.width}
                      onChange={(e) => updateSetting('width', parseInt(e.target.value) || 1920)}
                      className="h-8"
                    />
                  </div>
                  <div className="space-y-1">
                    <Label className="text-xs text-muted-foreground">Height</Label>
                    <Input
                      type="number"
                      value={settings.height}
                      onChange={(e) => updateSetting('height', parseInt(e.target.value) || 1080)}
                      className="h-8"
                    />
                  </div>
                </div>

                {/* Format */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Format</Label>
                  <Select
                    value={settings.format}
                    onValueChange={(v) => updateSetting('format', v as RenderSettings['format'])}
                  >
                    <SelectTrigger className="h-8">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="png">PNG (Lossless)</SelectItem>
                      <SelectItem value="jpeg">JPEG (Compressed)</SelectItem>
                      <SelectItem value="webp">WebP (Modern)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Quality (for JPEG/WebP) */}
                {settings.format !== 'png' && (
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <Label className="text-xs text-muted-foreground">Quality</Label>
                      <span className="text-xs font-mono text-primary">{settings.quality}%</span>
                    </div>
                    <Slider
                      value={[settings.quality]}
                      onValueChange={([v]) => updateSetting('quality', v)}
                      min={10}
                      max={100}
                      step={5}
                    />
                  </div>
                )}

                {/* Filename */}
                <div className="space-y-1">
                  <Label className="text-xs text-muted-foreground">Filename</Label>
                  <Input
                    value={settings.filename}
                    onChange={(e) => updateSetting('filename', e.target.value)}
                    className="h-8"
                    placeholder="render"
                  />
                </div>
              </TabsContent>

              <TabsContent value="settings" className="space-y-4 mt-4">
                {/* Transparent Background */}
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Transparent Background</Label>
                  <Switch
                    checked={settings.transparentBackground}
                    onCheckedChange={(v) => updateSetting('transparentBackground', v)}
                  />
                </div>

                {/* Anti-aliasing */}
                <div className="flex items-center justify-between">
                  <Label className="text-xs">Anti-Aliasing</Label>
                  <Switch
                    checked={settings.antiAliasing}
                    onCheckedChange={(v) => updateSetting('antiAliasing', v)}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right: Preview */}
          <div className="flex-1 flex flex-col gap-4">
            <div className="flex-1 bg-muted/30 rounded-lg border border-border flex items-center justify-center overflow-hidden">
              {previewUrl ? (
                <img 
                  src={previewUrl} 
                  alt="Render preview"
                  className="max-w-full max-h-full object-contain"
                />
              ) : (
                <div className="text-center text-muted-foreground">
                  <Film className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="text-sm">Click "Capture" to preview render</p>
                  <p className="text-xs mt-1">
                    {settings.width} × {settings.height} • {settings.format.toUpperCase()}
                  </p>
                </div>
              )}
            </div>

            <div className="flex gap-2">
              <Button 
                onClick={captureRender} 
                className="flex-1 gap-2"
                disabled={isRendering}
              >
                <Camera className="w-4 h-4" />
                {isRendering ? 'Rendering...' : 'Capture'}
              </Button>
              <Button 
                onClick={downloadRender} 
                variant="outline"
                className="flex-1 gap-2"
                disabled={!previewUrl}
              >
                <Download className="w-4 h-4" />
                Download
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};