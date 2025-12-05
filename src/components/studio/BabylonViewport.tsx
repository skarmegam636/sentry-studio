import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import { Engine, Scene, ArcRotateCamera, HemisphericLight, Vector3, MeshBuilder, StandardMaterial, Color3, Color4, PBRMaterial, CubeTexture, SceneLoader, GlowLayer, DefaultRenderingPipeline } from '@babylonjs/core';
import '@babylonjs/loaders';
import { useStudioStore } from '@/stores/studioStore';

interface BabylonViewportProps {
  onSceneReady?: (scene: Scene) => void;
}

export interface BabylonViewportRef {
  canvas: HTMLCanvasElement | null;
  scene: Scene | null;
}

export const BabylonViewport = forwardRef<BabylonViewportRef, BabylonViewportProps>(({ onSceneReady }, ref) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<Engine | null>(null);
  const sceneRef = useRef<Scene | null>(null);
  
  const { viewportSettings, currentFile, setIsLoading, setLoadProgress, setSceneObjects } = useStudioStore();

  useImperativeHandle(ref, () => ({
    canvas: canvasRef.current,
    scene: sceneRef.current,
  }));

  const createScene = useCallback((engine: Engine, canvas: HTMLCanvasElement): Scene => {
    const scene = new Scene(engine);
    scene.clearColor = new Color4(0.05, 0.06, 0.08, 1);
    
    // Camera
    const camera = new ArcRotateCamera('camera', -Math.PI / 2, Math.PI / 3, 10, Vector3.Zero(), scene);
    camera.attachControl(canvas, true);
    camera.lowerRadiusLimit = 1;
    camera.upperRadiusLimit = 100;
    camera.wheelPrecision = 50;
    camera.panningSensibility = 100;
    
    // Lighting
    const hemiLight = new HemisphericLight('hemi', new Vector3(0, 1, 0), scene);
    hemiLight.intensity = 0.6;
    hemiLight.groundColor = new Color3(0.1, 0.1, 0.15);
    
    // Create grid
    if (viewportSettings.showGrid) {
      const gridSize = 20;
      const grid = MeshBuilder.CreateGround('grid', { width: gridSize, height: gridSize, subdivisions: gridSize }, scene);
      const gridMat = new StandardMaterial('gridMat', scene);
      gridMat.wireframe = true;
      gridMat.emissiveColor = new Color3(0.15, 0.18, 0.22);
      gridMat.disableLighting = true;
      grid.material = gridMat;
      grid.position.y = -0.01;
    }
    
    // Create axes helper
    if (viewportSettings.showAxes) {
      const axisLength = 2;
      const axisThickness = 0.02;
      
      // X axis (red)
      const xAxis = MeshBuilder.CreateCylinder('xAxis', { height: axisLength, diameter: axisThickness }, scene);
      xAxis.rotation.z = -Math.PI / 2;
      xAxis.position.x = axisLength / 2;
      const xMat = new StandardMaterial('xMat', scene);
      xMat.emissiveColor = new Color3(1, 0.2, 0.2);
      xMat.disableLighting = true;
      xAxis.material = xMat;
      
      // Y axis (green)
      const yAxis = MeshBuilder.CreateCylinder('yAxis', { height: axisLength, diameter: axisThickness }, scene);
      yAxis.position.y = axisLength / 2;
      const yMat = new StandardMaterial('yMat', scene);
      yMat.emissiveColor = new Color3(0.2, 1, 0.2);
      yMat.disableLighting = true;
      yAxis.material = yMat;
      
      // Z axis (blue)
      const zAxis = MeshBuilder.CreateCylinder('zAxis', { height: axisLength, diameter: axisThickness }, scene);
      zAxis.rotation.x = Math.PI / 2;
      zAxis.position.z = axisLength / 2;
      const zMat = new StandardMaterial('zMat', scene);
      zMat.emissiveColor = new Color3(0.2, 0.4, 1);
      zMat.disableLighting = true;
      zAxis.material = zMat;
    }
    
    // Add glow layer
    const gl = new GlowLayer('glow', scene);
    gl.intensity = 0.3;
    
    // Post-processing pipeline
    const pipeline = new DefaultRenderingPipeline('pipeline', true, scene, [camera]);
    pipeline.bloomEnabled = true;
    pipeline.bloomThreshold = 0.8;
    pipeline.bloomWeight = 0.3;
    pipeline.bloomScale = 0.5;
    pipeline.fxaaEnabled = true;
    
    return scene;
  }, [viewportSettings.showGrid, viewportSettings.showAxes]);

  const createDefaultObject = useCallback((scene: Scene) => {
    // Create a beautiful default object to show
    const sphere = MeshBuilder.CreateSphere('defaultSphere', { diameter: 2, segments: 64 }, scene);
    sphere.position.y = 1;
    
    const pbr = new PBRMaterial('pbrMat', scene);
    pbr.metallic = 0.8;
    pbr.roughness = 0.2;
    pbr.albedoColor = new Color3(0.2, 0.8, 0.9);
    pbr.emissiveColor = new Color3(0.02, 0.08, 0.09);
    sphere.material = pbr;
    
    // Create torus around sphere
    const torus = MeshBuilder.CreateTorus('torus', { diameter: 3.5, thickness: 0.1, tessellation: 64 }, scene);
    torus.position.y = 1;
    torus.rotation.x = Math.PI / 3;
    
    const torusMat = new PBRMaterial('torusMat', scene);
    torusMat.metallic = 1;
    torusMat.roughness = 0.1;
    torusMat.albedoColor = new Color3(0.9, 0.5, 0.1);
    torusMat.emissiveColor = new Color3(0.1, 0.05, 0.01);
    torus.material = torusMat;
    
    // Animate the torus
    scene.registerBeforeRender(() => {
      if (torus) {
        torus.rotation.y += 0.005;
        torus.rotation.z += 0.002;
      }
    });
    
    setSceneObjects([
      { id: 'defaultSphere', name: 'Sphere', type: 'mesh', visible: true, locked: false },
      { id: 'torus', name: 'Torus Ring', type: 'mesh', visible: true, locked: false },
    ]);
  }, [setSceneObjects]);

  const loadModel = useCallback(async (scene: Scene, file: File) => {
    setIsLoading(true);
    setLoadProgress(0);
    
    try {
      // Clear existing meshes except grid and axes
      scene.meshes.forEach(mesh => {
        if (!['grid', 'xAxis', 'yAxis', 'zAxis'].includes(mesh.name)) {
          mesh.dispose();
        }
      });
      
      const extension = file.name.split('.').pop()?.toLowerCase();
      const url = URL.createObjectURL(file);
      
      // Create a fake progress
      let progress = 0;
      const progressInterval = setInterval(() => {
        progress = Math.min(progress + 10, 90);
        setLoadProgress(progress);
      }, 200);
      
      await SceneLoader.AppendAsync('', url, scene, undefined, '.' + extension);
      
      clearInterval(progressInterval);
      setLoadProgress(100);
      
      // Center camera on loaded model
      const meshes = scene.meshes.filter(m => !['grid', 'xAxis', 'yAxis', 'zAxis'].includes(m.name) && m.name !== '__root__');
      if (meshes.length > 0) {
        const camera = scene.activeCamera as ArcRotateCamera;
        if (camera) {
          let min = new Vector3(Infinity, Infinity, Infinity);
          let max = new Vector3(-Infinity, -Infinity, -Infinity);
          
          meshes.forEach(mesh => {
            mesh.computeWorldMatrix(true);
            const boundingInfo = mesh.getBoundingInfo();
            min = Vector3.Minimize(min, boundingInfo.boundingBox.minimumWorld);
            max = Vector3.Maximize(max, boundingInfo.boundingBox.maximumWorld);
          });
          
          const center = min.add(max).scale(0.5);
          const size = max.subtract(min).length();
          
          camera.setTarget(center);
          camera.radius = size * 1.5;
        }
        
        // Update scene objects
        setSceneObjects(meshes.map(m => ({
          id: m.uniqueId.toString(),
          name: m.name || 'Unnamed',
          type: 'mesh',
          visible: m.isVisible,
          locked: false,
        })));
      }
      
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Failed to load model:', error);
    } finally {
      setIsLoading(false);
    }
  }, [setIsLoading, setLoadProgress, setSceneObjects]);

  useEffect(() => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true, { preserveDrawingBuffer: true, stencil: true });
    engineRef.current = engine;
    
    const scene = createScene(engine, canvas);
    sceneRef.current = scene;
    
    // Create default object if no file
    if (!currentFile) {
      createDefaultObject(scene);
    }
    
    onSceneReady?.(scene);
    
    engine.runRenderLoop(() => {
      scene.render();
    });
    
    const handleResize = () => {
      engine.resize();
    };
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
      scene.dispose();
      engine.dispose();
    };
  }, [createScene, createDefaultObject, onSceneReady, currentFile]);

  // Handle file loading
  useEffect(() => {
    if (currentFile && sceneRef.current) {
      loadModel(sceneRef.current, currentFile);
    }
  }, [currentFile, loadModel]);

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full outline-none"
      style={{ touchAction: 'none' }}
    />
  );
});

BabylonViewport.displayName = 'BabylonViewport';
