import type { Domain, DomainConfig, ToolConfig } from '@/types/sentry';

export const domainConfigs: Record<Domain, DomainConfig> = {
  building: {
    id: 'building',
    name: 'Building / Civil',
    icon: '🏗️',
    color: 'domain-building',
    description: 'BIM, architectural models, structural engineering',
    tools: [
      { id: 'measure', name: 'Measurements', icon: 'Ruler', shortcut: 'M', description: 'Take precise measurements', category: 'Analysis' },
      { id: 'section', name: 'Section Cuts', icon: 'Scissors', shortcut: 'X', description: 'Create section planes', category: 'Visualization' },
      { id: 'bim-inspector', name: 'BIM Inspector', icon: 'Search', description: 'Inspect BIM properties', category: 'Analysis' },
      { id: 'clash-detect', name: 'Clash Detection', icon: 'AlertTriangle', description: 'Detect model clashes', category: 'Analysis' },
      { id: 'material-takeoff', name: 'Material Takeoff', icon: 'Package', description: 'Generate material quantities', category: 'Export' },
      { id: 'structural', name: 'Structural Analysis', icon: 'Columns', description: 'Analyze structural loads', category: 'Analysis' },
    ],
    workflows: [
      { id: 'review', name: 'Design Review', steps: ['Load model', 'Section cuts', 'Measurements', 'Export report'] },
      { id: 'clash', name: 'Clash Analysis', steps: ['Load models', 'Run detection', 'Review clashes', 'Export results'] },
    ],
  },
  character: {
    id: 'character',
    name: 'Human / Character',
    icon: '👤',
    color: 'domain-character',
    description: 'Character models, rigging, animation',
    tools: [
      { id: 'rig-tools', name: 'Rigging Tools', icon: 'Bone', shortcut: 'R', description: 'Edit skeleton and rig', category: 'Rigging' },
      { id: 'weight-paint', name: 'Weight Painting', icon: 'Paintbrush', shortcut: 'W', description: 'Paint vertex weights', category: 'Rigging' },
      { id: 'morph-targets', name: 'Morph Targets', icon: 'Smile', description: 'Edit blend shapes', category: 'Animation' },
      { id: 'pose-library', name: 'Pose Library', icon: 'Users', description: 'Save and apply poses', category: 'Animation' },
      { id: 'cloth-sim', name: 'Cloth Simulation', icon: 'Shirt', description: 'Simulate cloth physics', category: 'Physics' },
      { id: 'retarget', name: 'Animation Retarget', icon: 'RefreshCw', description: 'Transfer animations', category: 'Animation' },
    ],
    workflows: [
      { id: 'rig-setup', name: 'Rig Setup', steps: ['Import character', 'Create skeleton', 'Paint weights', 'Test poses'] },
      { id: 'animate', name: 'Animation', steps: ['Load rig', 'Record keyframes', 'Polish curves', 'Export'] },
    ],
  },
  cad: {
    id: 'cad',
    name: 'CAD / Mechanical',
    icon: '🚗',
    color: 'domain-cad',
    description: 'CAD models, mechanical parts, assemblies',
    tools: [
      { id: 'parametric', name: 'Parametric Edit', icon: 'Settings', shortcut: 'P', description: 'Edit parameters', category: 'Modeling' },
      { id: 'assembly-tree', name: 'Assembly Tree', icon: 'GitBranch', description: 'Manage assembly hierarchy', category: 'Organization' },
      { id: 'tolerance', name: 'Tolerance Analysis', icon: 'Target', description: 'Analyze tolerances', category: 'Analysis' },
      { id: 'gdt', name: 'GD&T Inspector', icon: 'FileText', description: 'Inspect GD&T data', category: 'Analysis' },
      { id: 'section-views', name: 'Section Views', icon: 'Layers', description: 'Create technical sections', category: 'Visualization' },
      { id: 'explode', name: 'Explode View', icon: 'Expand', description: 'Create exploded views', category: 'Visualization' },
    ],
    workflows: [
      { id: 'design-review', name: 'Design Review', steps: ['Import CAD', 'Check tolerances', 'Section analysis', 'Report'] },
      { id: 'documentation', name: 'Documentation', steps: ['Load assembly', 'Create views', 'Add annotations', 'Export drawings'] },
    ],
  },
  vegetation: {
    id: 'vegetation',
    name: 'Forest / Vegetation',
    icon: '🌲',
    color: 'domain-vegetation',
    description: 'Trees, plants, forest environments',
    tools: [
      { id: 'density-paint', name: 'Density Painting', icon: 'Brush', shortcut: 'D', description: 'Paint vegetation density', category: 'Placement' },
      { id: 'species', name: 'Species Library', icon: 'Leaf', description: 'Manage plant species', category: 'Assets' },
      { id: 'lod-gen', name: 'LOD Generation', icon: 'Layers', description: 'Generate LOD levels', category: 'Optimization' },
      { id: 'wind-sim', name: 'Wind Simulation', icon: 'Wind', description: 'Simulate wind effects', category: 'Physics' },
      { id: 'seasonal', name: 'Seasonal Presets', icon: 'Sun', description: 'Apply seasonal variations', category: 'Appearance' },
      { id: 'terrain', name: 'Terrain Tools', icon: 'Mountain', description: 'Edit terrain', category: 'Modeling' },
    ],
    workflows: [
      { id: 'forest-setup', name: 'Forest Setup', steps: ['Create terrain', 'Paint vegetation', 'Add wind', 'Optimize LODs'] },
    ],
  },
  textile: {
    id: 'textile',
    name: 'Textiles / Fashion',
    icon: '🧵',
    color: 'domain-textile',
    description: 'Clothing, fabrics, fashion design',
    tools: [
      { id: 'pattern', name: 'Pattern Editor', icon: 'Grid', shortcut: 'T', description: 'Edit 2D patterns', category: 'Design' },
      { id: 'seam', name: 'Seam Lines', icon: 'Minus', description: 'Define seam lines', category: 'Design' },
      { id: 'fabric-sim', name: 'Fabric Simulation', icon: 'Wind', description: 'Simulate fabric physics', category: 'Physics' },
      { id: 'size-grade', name: 'Size Grading', icon: 'Maximize', description: 'Grade sizes', category: 'Production' },
      { id: 'print-map', name: 'Print Mapping', icon: 'Image', description: 'Map print patterns', category: 'Texturing' },
      { id: 'stitch', name: 'Stitch Editor', icon: 'MoreHorizontal', description: 'Edit stitch types', category: 'Details' },
    ],
    workflows: [
      { id: 'garment', name: 'Garment Design', steps: ['Create pattern', 'Define seams', 'Simulate fit', 'Export'] },
    ],
  },
  ocean: {
    id: 'ocean',
    name: 'Ocean / Water',
    icon: '🌊',
    color: 'domain-ocean',
    description: 'Marine environments, underwater scenes',
    tools: [
      { id: 'wave-sim', name: 'Wave Simulation', icon: 'Activity', shortcut: 'V', description: 'Simulate waves', category: 'Physics' },
      { id: 'fluid', name: 'Fluid Dynamics', icon: 'Droplet', description: 'Fluid simulation', category: 'Physics' },
      { id: 'buoyancy', name: 'Buoyancy Calculator', icon: 'ArrowUp', description: 'Calculate buoyancy', category: 'Analysis' },
      { id: 'currents', name: 'Current Editor', icon: 'Navigation', description: 'Define water currents', category: 'Physics' },
      { id: 'caustics', name: 'Caustics', icon: 'Sparkles', description: 'Underwater lighting', category: 'Rendering' },
      { id: 'coral', name: 'Coral Generator', icon: 'Flower', description: 'Generate coral', category: 'Assets' },
    ],
    workflows: [
      { id: 'underwater', name: 'Underwater Scene', steps: ['Setup ocean', 'Add currents', 'Place life', 'Render caustics'] },
    ],
  },
  mining: {
    id: 'mining',
    name: 'Mining',
    icon: '⛏️',
    color: 'domain-mining',
    description: 'Mining operations, geological models',
    tools: [
      { id: 'volume', name: 'Volumetric Analysis', icon: 'Box', shortcut: 'V', description: 'Calculate volumes', category: 'Analysis' },
      { id: 'ore-grade', name: 'Ore Grade Mapping', icon: 'Map', description: 'Map ore grades', category: 'Analysis' },
      { id: 'blast', name: 'Blast Pattern', icon: 'Zap', description: 'Design blast patterns', category: 'Planning' },
      { id: 'tunnel', name: 'Tunnel Cross-Section', icon: 'Circle', description: 'Define tunnel sections', category: 'Design' },
      { id: 'stockpile', name: 'Stockpile Measurement', icon: 'Database', description: 'Measure stockpiles', category: 'Analysis' },
      { id: 'drill', name: 'Drill Planning', icon: 'ArrowDown', description: 'Plan drill holes', category: 'Planning' },
    ],
    workflows: [
      { id: 'pit-design', name: 'Pit Design', steps: ['Import terrain', 'Define pit', 'Calculate volumes', 'Plan blast'] },
    ],
  },
  aerospace: {
    id: 'aerospace',
    name: 'Space / Aerospace',
    icon: '🚀',
    color: 'domain-aerospace',
    description: 'Aircraft, spacecraft, satellites',
    tools: [
      { id: 'aero', name: 'Aerodynamics', icon: 'Wind', shortcut: 'A', description: 'Aerodynamic analysis', category: 'Analysis' },
      { id: 'thermal', name: 'Thermal Analysis', icon: 'Thermometer', description: 'Heat distribution', category: 'Analysis' },
      { id: 'orbital', name: 'Orbital Paths', icon: 'Globe', description: 'Define orbital paths', category: 'Simulation' },
      { id: 'stress', name: 'Material Stress', icon: 'Activity', description: 'Stress analysis', category: 'Analysis' },
      { id: 'deploy', name: 'Deployment Sim', icon: 'Play', description: 'Simulate deployment', category: 'Simulation' },
      { id: 'mass', name: 'Mass Properties', icon: 'Scale', description: 'Calculate mass', category: 'Analysis' },
    ],
    workflows: [
      { id: 'flight-analysis', name: 'Flight Analysis', steps: ['Import model', 'Run aerodynamics', 'Check thermal', 'Report'] },
    ],
  },
  gaming: {
    id: 'gaming',
    name: 'Gaming',
    icon: '🎮',
    color: 'domain-gaming',
    description: 'Game assets, real-time rendering',
    tools: [
      { id: 'lod', name: 'LOD Generation', icon: 'Layers', shortcut: 'L', description: 'Generate LOD levels', category: 'Optimization' },
      { id: 'uv', name: 'UV Unwrapping', icon: 'Grid', shortcut: 'U', description: 'Unwrap UVs', category: 'Texturing' },
      { id: 'pbr', name: 'PBR Material', icon: 'Palette', description: 'Edit PBR materials', category: 'Materials' },
      { id: 'retarget', name: 'Animation Retarget', icon: 'RefreshCw', description: 'Retarget animations', category: 'Animation' },
      { id: 'lightmap', name: 'Lightmap Baking', icon: 'Sun', description: 'Bake lightmaps', category: 'Rendering' },
      { id: 'collision', name: 'Collision Mesh', icon: 'Shield', description: 'Generate colliders', category: 'Physics' },
    ],
    workflows: [
      { id: 'asset-prep', name: 'Asset Preparation', steps: ['Import model', 'Unwrap UVs', 'Setup materials', 'Generate LODs', 'Export'] },
    ],
  },
  film: {
    id: 'film',
    name: 'Film / VFX',
    icon: '🎬',
    color: 'domain-film',
    description: 'Visual effects, cinematography',
    tools: [
      { id: 'camera-track', name: 'Camera Tracking', icon: 'Video', shortcut: 'C', description: 'Track camera motion', category: 'Animation' },
      { id: 'motion-blur', name: 'Motion Blur', icon: 'Zap', description: 'Configure motion blur', category: 'Rendering' },
      { id: 'dof', name: 'Depth of Field', icon: 'Aperture', description: 'Adjust depth of field', category: 'Rendering' },
      { id: 'composite', name: 'Compositing', icon: 'Layers', description: 'Composite layers', category: 'Post' },
      { id: 'render-layers', name: 'Render Layers', icon: 'Stack', description: 'Setup render passes', category: 'Rendering' },
      { id: 'matchmove', name: 'Matchmove', icon: 'Target', description: 'Match camera to footage', category: 'Animation' },
    ],
    workflows: [
      { id: 'vfx-shot', name: 'VFX Shot', steps: ['Track footage', 'Import assets', 'Composite', 'Render passes'] },
    ],
  },
  medical: {
    id: 'medical',
    name: 'Medical',
    icon: '🏥',
    color: 'domain-building',
    description: 'Medical imaging, anatomical models',
    tools: [
      { id: 'slice', name: 'Slice Viewer', icon: 'Scan', description: 'View CT/MRI slices', category: 'Visualization' },
      { id: 'segment', name: 'Segmentation', icon: 'Scissors', description: 'Segment anatomy', category: 'Analysis' },
      { id: 'measure-3d', name: '3D Measurements', icon: 'Ruler', description: 'Measure anatomy', category: 'Analysis' },
      { id: 'annotate', name: 'Annotations', icon: 'MessageSquare', description: 'Add annotations', category: 'Documentation' },
    ],
    workflows: [
      { id: 'review', name: 'Medical Review', steps: ['Load DICOM', 'Segment regions', 'Measure', 'Report'] },
    ],
  },
  product: {
    id: 'product',
    name: 'Product Design',
    icon: '📦',
    color: 'domain-cad',
    description: 'Consumer products, industrial design',
    tools: [
      { id: 'material', name: 'Material Editor', icon: 'Palette', description: 'Edit materials', category: 'Materials' },
      { id: 'render', name: 'Product Render', icon: 'Camera', description: 'Render product shots', category: 'Rendering' },
      { id: 'turntable', name: 'Turntable', icon: 'RotateCw', description: 'Create turntables', category: 'Animation' },
      { id: 'ar-preview', name: 'AR Preview', icon: 'Smartphone', description: 'Preview in AR', category: 'Visualization' },
    ],
    workflows: [
      { id: 'product-viz', name: 'Product Visualization', steps: ['Import model', 'Setup materials', 'Light scene', 'Render'] },
    ],
  },
  furniture: {
    id: 'furniture',
    name: 'Furniture',
    icon: '🪑',
    color: 'domain-textile',
    description: 'Furniture design, interior objects',
    tools: [
      { id: 'dimension', name: 'Dimensions', icon: 'Ruler', description: 'Add dimensions', category: 'Documentation' },
      { id: 'material', name: 'Material Library', icon: 'Palette', description: 'Apply materials', category: 'Materials' },
      { id: 'configurator', name: 'Configurator', icon: 'Settings', description: 'Product variants', category: 'Configuration' },
      { id: 'room-place', name: 'Room Placement', icon: 'Home', description: 'Place in room', category: 'Visualization' },
    ],
    workflows: [
      { id: 'furniture-design', name: 'Furniture Design', steps: ['Model', 'Apply materials', 'Add dimensions', 'Render'] },
    ],
  },
  jewelry: {
    id: 'jewelry',
    name: 'Jewelry',
    icon: '💎',
    color: 'domain-textile',
    description: 'Jewelry design, gemstones',
    tools: [
      { id: 'gem', name: 'Gem Editor', icon: 'Diamond', description: 'Edit gemstones', category: 'Modeling' },
      { id: 'prong', name: 'Prong Settings', icon: 'Circle', description: 'Create prong settings', category: 'Modeling' },
      { id: 'metal', name: 'Metal Materials', icon: 'Palette', description: 'Precious metals', category: 'Materials' },
      { id: 'ring-sizer', name: 'Ring Sizer', icon: 'Circle', description: 'Size rings', category: 'Tools' },
    ],
    workflows: [
      { id: 'ring-design', name: 'Ring Design', steps: ['Create band', 'Add setting', 'Place gem', 'Render'] },
    ],
  },
  unknown: {
    id: 'unknown',
    name: 'General',
    icon: '📁',
    color: 'primary',
    description: 'General 3D editing tools',
    tools: [
      { id: 'select', name: 'Select', icon: 'MousePointer', shortcut: 'Q', description: 'Select objects', category: 'Selection' },
      { id: 'move', name: 'Move', icon: 'Move', shortcut: 'G', description: 'Move objects', category: 'Transform' },
      { id: 'rotate', name: 'Rotate', icon: 'RotateCw', shortcut: 'R', description: 'Rotate objects', category: 'Transform' },
      { id: 'scale', name: 'Scale', icon: 'Maximize', shortcut: 'S', description: 'Scale objects', category: 'Transform' },
      { id: 'measure', name: 'Measure', icon: 'Ruler', shortcut: 'M', description: 'Measure distances', category: 'Analysis' },
      { id: 'material', name: 'Materials', icon: 'Palette', description: 'Edit materials', category: 'Materials' },
    ],
    workflows: [
      { id: 'basic', name: 'Basic Editing', steps: ['Import model', 'Transform', 'Edit materials', 'Export'] },
    ],
  },
};

export const getDomainConfig = (domain: Domain): DomainConfig => {
  return domainConfigs[domain] || domainConfigs.unknown;
};

export const getAllDomains = (): Domain[] => {
  return Object.keys(domainConfigs) as Domain[];
};
