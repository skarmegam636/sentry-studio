import type { Domain, ModelAnalysis } from '@/types/sentry';

// Simulated Sentry AI - In production, this would use TensorFlow.js or an API
export class SentryAI {
  private static instance: SentryAI;
  
  static getInstance(): SentryAI {
    if (!SentryAI.instance) {
      SentryAI.instance = new SentryAI();
    }
    return SentryAI.instance;
  }
  
  async analyzeModel(file: File): Promise<ModelAnalysis> {
    // Simulate analysis delay
    await this.simulateProcessing();
    
    const fileName = file.name.toLowerCase();
    const extension = fileName.split('.').pop() || '';
    
    // Domain detection based on file extension and name patterns
    const domain = this.detectDomain(fileName, extension);
    const confidence = this.calculateConfidence(fileName, extension);
    
    return {
      domain,
      confidence,
      subType: this.getSubType(domain, fileName),
      vertexCount: Math.floor(Math.random() * 500000) + 10000,
      faceCount: Math.floor(Math.random() * 250000) + 5000,
      materialCount: Math.floor(Math.random() * 20) + 1,
      hasAnimations: domain === 'character' || domain === 'gaming',
      hasSkeleton: domain === 'character',
      boundingBox: {
        min: [-1, 0, -1],
        max: [1, 2, 1],
      },
      recommendedTools: this.getRecommendedTools(domain),
      recommendedWorkflow: this.getRecommendedWorkflow(domain),
    };
  }
  
  private async simulateProcessing(): Promise<void> {
    // Simulate 2-3 second analysis time
    const delay = 2000 + Math.random() * 1000;
    return new Promise(resolve => setTimeout(resolve, delay));
  }
  
  private detectDomain(fileName: string, extension: string): Domain {
    // CAD/Mechanical
    if (['step', 'stp', 'iges', 'igs', 'catpart', 'sldprt', 'prt'].includes(extension)) {
      return 'cad';
    }
    
    // Building/Architecture
    if (['ifc', 'rvt', 'dwg', 'dxf'].includes(extension) || 
        fileName.includes('building') || fileName.includes('house') || fileName.includes('arch')) {
      return 'building';
    }
    
    // Character detection
    if (fileName.includes('character') || fileName.includes('human') || 
        fileName.includes('person') || fileName.includes('avatar') ||
        fileName.includes('body') || fileName.includes('rig')) {
      return 'character';
    }
    
    // Vehicle detection
    if (fileName.includes('car') || fileName.includes('vehicle') || 
        fileName.includes('truck') || fileName.includes('auto')) {
      return 'cad';
    }
    
    // Nature/Vegetation
    if (fileName.includes('tree') || fileName.includes('forest') || 
        fileName.includes('plant') || fileName.includes('vegetation')) {
      return 'vegetation';
    }
    
    // Gaming assets
    if (fileName.includes('game') || fileName.includes('prop') || 
        fileName.includes('weapon') || fileName.includes('armor')) {
      return 'gaming';
    }
    
    // Fashion/Textile
    if (fileName.includes('cloth') || fileName.includes('dress') || 
        fileName.includes('shirt') || fileName.includes('garment')) {
      return 'textile';
    }
    
    // Furniture
    if (fileName.includes('chair') || fileName.includes('table') || 
        fileName.includes('sofa') || fileName.includes('furniture')) {
      return 'furniture';
    }
    
    // Product
    if (fileName.includes('product') || fileName.includes('packaging') || 
        fileName.includes('bottle') || fileName.includes('consumer')) {
      return 'product';
    }
    
    // Based on common 3D formats, default to gaming (most versatile)
    if (['fbx', 'gltf', 'glb', 'obj'].includes(extension)) {
      return 'gaming';
    }
    
    return 'unknown';
  }
  
  private calculateConfidence(fileName: string, extension: string): number {
    // Higher confidence for domain-specific file formats
    const domainSpecificExtensions = ['ifc', 'rvt', 'step', 'stp', 'catpart', 'sldprt'];
    if (domainSpecificExtensions.includes(extension)) {
      return 0.95 + Math.random() * 0.04;
    }
    
    // Medium confidence for name-based detection
    const domainKeywords = ['character', 'building', 'car', 'tree', 'game'];
    if (domainKeywords.some(kw => fileName.includes(kw))) {
      return 0.85 + Math.random() * 0.10;
    }
    
    // Lower confidence for generic formats
    return 0.60 + Math.random() * 0.20;
  }
  
  private getSubType(domain: Domain, fileName: string): string | undefined {
    const subTypes: Record<Domain, string[]> = {
      building: ['Residential', 'Commercial', 'Industrial', 'Infrastructure'],
      character: ['Humanoid', 'Stylized', 'Realistic', 'Creature'],
      cad: ['Assembly', 'Part', 'Drawing', 'Sheet Metal'],
      vegetation: ['Deciduous', 'Coniferous', 'Tropical', 'Ground Cover'],
      textile: ['Dress', 'Casual', 'Sportswear', 'Formal'],
      ocean: ['Surface', 'Underwater', 'Coastal', 'Deep Sea'],
      mining: ['Open Pit', 'Underground', 'Processing', 'Survey'],
      aerospace: ['Aircraft', 'Spacecraft', 'Satellite', 'UAV'],
      gaming: ['Character', 'Environment', 'Prop', 'Vehicle'],
      film: ['Character', 'Set', 'Prop', 'Effect'],
      medical: ['Anatomical', 'Implant', 'Scan', 'Prosthetic'],
      product: ['Consumer', 'Electronics', 'Packaging', 'Tool'],
      furniture: ['Seating', 'Table', 'Storage', 'Decor'],
      jewelry: ['Ring', 'Necklace', 'Earring', 'Bracelet'],
      unknown: undefined,
    };
    
    const options = subTypes[domain];
    if (options) {
      return options[Math.floor(Math.random() * options.length)];
    }
    return undefined;
  }
  
  private getRecommendedTools(domain: Domain): string[] {
    const toolRecommendations: Record<Domain, string[]> = {
      building: ['measure', 'section', 'bim-inspector', 'clash-detect'],
      character: ['rig-tools', 'weight-paint', 'morph-targets', 'pose-library'],
      cad: ['parametric', 'assembly-tree', 'tolerance', 'section-views'],
      vegetation: ['density-paint', 'lod-gen', 'wind-sim', 'seasonal'],
      textile: ['pattern', 'seam', 'fabric-sim', 'size-grade'],
      ocean: ['wave-sim', 'fluid', 'buoyancy', 'caustics'],
      mining: ['volume', 'ore-grade', 'blast', 'stockpile'],
      aerospace: ['aero', 'thermal', 'stress', 'mass'],
      gaming: ['lod', 'uv', 'pbr', 'collision'],
      film: ['camera-track', 'motion-blur', 'dof', 'composite'],
      medical: ['slice', 'segment', 'measure-3d', 'annotate'],
      product: ['material', 'render', 'turntable', 'ar-preview'],
      furniture: ['dimension', 'material', 'configurator', 'room-place'],
      jewelry: ['gem', 'prong', 'metal', 'ring-sizer'],
      unknown: ['select', 'move', 'rotate', 'scale'],
    };
    
    return toolRecommendations[domain] || toolRecommendations.unknown;
  }
  
  private getRecommendedWorkflow(domain: Domain): string {
    const workflows: Record<Domain, string> = {
      building: 'Design Review',
      character: 'Rig Setup',
      cad: 'Design Review',
      vegetation: 'Forest Setup',
      textile: 'Garment Design',
      ocean: 'Underwater Scene',
      mining: 'Pit Design',
      aerospace: 'Flight Analysis',
      gaming: 'Asset Preparation',
      film: 'VFX Shot',
      medical: 'Medical Review',
      product: 'Product Visualization',
      furniture: 'Furniture Design',
      jewelry: 'Ring Design',
      unknown: 'Basic Editing',
    };
    
    return workflows[domain] || workflows.unknown;
  }
}

export const sentryAI = SentryAI.getInstance();
