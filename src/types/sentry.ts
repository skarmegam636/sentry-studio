export type Domain = 
  | 'building'
  | 'character'
  | 'cad'
  | 'vegetation'
  | 'textile'
  | 'ocean'
  | 'mining'
  | 'aerospace'
  | 'gaming'
  | 'film'
  | 'medical'
  | 'product'
  | 'furniture'
  | 'jewelry'
  | 'unknown';

export interface DomainConfig {
  id: Domain;
  name: string;
  icon: string;
  color: string;
  description: string;
  tools: ToolConfig[];
  workflows: WorkflowConfig[];
}

export interface ToolConfig {
  id: string;
  name: string;
  icon: string;
  shortcut?: string;
  description: string;
  category: string;
}

export interface WorkflowConfig {
  id: string;
  name: string;
  steps: string[];
}

export interface ModelAnalysis {
  domain: Domain;
  confidence: number;
  subType?: string;
  vertexCount: number;
  faceCount: number;
  materialCount: number;
  hasAnimations: boolean;
  hasSkeleton: boolean;
  boundingBox: {
    min: [number, number, number];
    max: [number, number, number];
  };
  recommendedTools: string[];
  recommendedWorkflow: string;
}

export interface SceneObject {
  id: string;
  name: string;
  type: 'mesh' | 'light' | 'camera' | 'empty';
  visible: boolean;
  locked: boolean;
  children?: SceneObject[];
}

export interface ViewportSettings {
  showGrid: boolean;
  showAxes: boolean;
  showStats: boolean;
  renderMode: 'solid' | 'wireframe' | 'textured' | 'material';
  shadingMode: 'flat' | 'smooth' | 'pbr';
}

export interface StudioState {
  // Scene
  sceneObjects: SceneObject[];
  selectedObjectId: string | null;
  
  // Sentry AI
  currentDomain: Domain;
  modelAnalysis: ModelAnalysis | null;
  isAnalyzing: boolean;
  
  // Viewport
  viewportSettings: ViewportSettings;
  
  // UI
  leftPanelWidth: number;
  rightPanelWidth: number;
  bottomPanelHeight: number;
  activeToolId: string | null;
  
  // File
  currentFile: File | null;
  isLoading: boolean;
  loadProgress: number;
}
