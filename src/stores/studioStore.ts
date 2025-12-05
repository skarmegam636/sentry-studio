import { create } from 'zustand';
import type { Domain, ModelAnalysis, SceneObject, ViewportSettings, StudioState } from '@/types/sentry';

interface StudioActions {
  // Scene
  setSceneObjects: (objects: SceneObject[]) => void;
  selectObject: (id: string | null) => void;
  toggleObjectVisibility: (id: string) => void;
  
  // Sentry AI
  setDomain: (domain: Domain) => void;
  setModelAnalysis: (analysis: ModelAnalysis | null) => void;
  setIsAnalyzing: (isAnalyzing: boolean) => void;
  
  // Viewport
  updateViewportSettings: (settings: Partial<ViewportSettings>) => void;
  
  // UI
  setLeftPanelWidth: (width: number) => void;
  setRightPanelWidth: (width: number) => void;
  setBottomPanelHeight: (height: number) => void;
  setActiveTool: (toolId: string | null) => void;
  
  // File
  setCurrentFile: (file: File | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setLoadProgress: (progress: number) => void;
  
  // Reset
  reset: () => void;
}

const initialState: StudioState = {
  sceneObjects: [],
  selectedObjectId: null,
  currentDomain: 'unknown',
  modelAnalysis: null,
  isAnalyzing: false,
  viewportSettings: {
    showGrid: true,
    showAxes: true,
    showStats: true,
    renderMode: 'textured',
    shadingMode: 'pbr',
  },
  leftPanelWidth: 280,
  rightPanelWidth: 300,
  bottomPanelHeight: 200,
  activeToolId: 'select',
  currentFile: null,
  isLoading: false,
  loadProgress: 0,
};

export const useStudioStore = create<StudioState & StudioActions>((set) => ({
  ...initialState,
  
  setSceneObjects: (objects) => set({ sceneObjects: objects }),
  selectObject: (id) => set({ selectedObjectId: id }),
  toggleObjectVisibility: (id) => set((state) => ({
    sceneObjects: state.sceneObjects.map(obj =>
      obj.id === id ? { ...obj, visible: !obj.visible } : obj
    ),
  })),
  
  setDomain: (domain) => set({ currentDomain: domain }),
  setModelAnalysis: (analysis) => set({ modelAnalysis: analysis }),
  setIsAnalyzing: (isAnalyzing) => set({ isAnalyzing }),
  
  updateViewportSettings: (settings) => set((state) => ({
    viewportSettings: { ...state.viewportSettings, ...settings },
  })),
  
  setLeftPanelWidth: (width) => set({ leftPanelWidth: width }),
  setRightPanelWidth: (width) => set({ rightPanelWidth: width }),
  setBottomPanelHeight: (height) => set({ bottomPanelHeight: height }),
  setActiveTool: (toolId) => set({ activeToolId: toolId }),
  
  setCurrentFile: (file) => set({ currentFile: file }),
  setIsLoading: (isLoading) => set({ isLoading }),
  setLoadProgress: (progress) => set({ loadProgress: progress }),
  
  reset: () => set(initialState),
}));
