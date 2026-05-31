const PRODUCTS = [
  {
    id: "milch",
    name: "Milch",
    shelf: "Kuehlung A2",
    color: "#5bcaff",
    type: "carton",
    target: { x: -4.46, y: 1.28, z: -7.45, yaw: 90, labelYaw: 90, shelfItem: true },
    pickup: { x: -3.6, z: -7.45 },
    route: [
      { x: 0, z: 6.55 },
      { x: 0, z: 4.8 },
      { x: 0, z: 1.55 },
      { x: -1.05, z: 1.55 },
      { x: -1.05, z: -0.45 },
      { x: -3.6, z: -0.45 },
      { x: -3.6, z: -7.45 }
    ]
  },
  {
    id: "brot",
    name: "Brot",
    shelf: "Baeckerei B1",
    color: "#d99b4a",
    type: "bread",
    target: { x: -2.45, y: 1.03, z: 2.85, yaw: 0, labelYaw: 0 },
    pickup: { x: -2.45, z: 3.65 },
    route: [
      { x: 0, z: 6.55 },
      { x: 0, z: 4.05 },
      { x: -2.45, z: 4.05 },
      { x: -2.45, z: 3.65 }
    ]
  },
  {
    id: "kaffee",
    name: "Kaffee",
    shelf: "Getraenke C3",
    color: "#6f4e37",
    type: "coffee",
    target: { x: 0.54, y: 0.86, z: -3.35, yaw: 90, labelYaw: 90, shelfItem: true },
    pickup: { x: 1.4, z: -3.35 },
    route: [
      { x: 0, z: 6.55 },
      { x: 0, z: 4.8 },
      { x: 0, z: 1.55 },
      { x: 1.4, z: 1.55 },
      { x: 1.4, z: -3.35 }
    ]
  },
  {
    id: "aepfel",
    name: "Aepfel",
    shelf: "Obst D1",
    color: "#ef4444",
    type: "apples",
    target: { x: 2.65, y: 0.72, z: 4.35, yaw: 0, labelYaw: 0 },
    pickup: { x: 1.8, z: 4.35 },
    route: [
      { x: 0, z: 6.55 },
      { x: 0, z: 4.35 },
      { x: 1.8, z: 4.35 }
    ]
  },
  {
    id: "shampoo",
    name: "Shampoo",
    shelf: "Drogerie E2",
    color: "#a78bfa",
    type: "shampoo",
    target: { x: -4.46, y: 0.86, z: -1.7, yaw: 90, labelYaw: 90, shelfItem: true },
    pickup: { x: -3.6, z: -1.7 },
    route: [
      { x: 0, z: 6.55 },
      { x: 0, z: 4.8 },
      { x: 0, z: 1.55 },
      { x: -1.05, z: 1.55 },
      { x: -1.05, z: -0.45 },
      { x: -3.6, z: -0.45 },
      { x: -3.6, z: -1.7 }
    ]
  },
  {
    id: "nudeln",
    name: "Nudeln",
    shelf: "Trockenware F4",
    color: "#facc15",
    type: "pasta",
    target: { x: 5.06, y: 0.9, z: -8.25, yaw: 90, labelYaw: 90, shelfItem: true },
    pickup: { x: 5.75, z: -8.25 },
    route: [
      { x: 0, z: 6.55 },
      { x: 0, z: 4.8 },
      { x: 0, z: 1.55 },
      { x: 5.75, z: 1.55 },
      { x: 5.75, z: -8.25 }
    ]
  }
];

const START_POSITION = { x: 0, y: 0, z: 7 };
const CHECKOUT_POINT = { x: 2.1, z: 6.05 };
const WALK_BOUNDS = { minX: -6.55, maxX: 6.55, minZ: -12.15, maxZ: 7.55 };
const PLAYER_RADIUS = 0.28;
const ROUTE_STEP = 0.5;
const ROUTE_CLEARANCE = 0.36;
const BLOCKERS = [
  { name: "left-wall", minX: -7.2, maxX: -6.55, minZ: -12.9, maxZ: 8.1 },
  { name: "right-wall", minX: 6.55, maxX: 7.2, minZ: -12.9, maxZ: 8.1 },
  { name: "back-wall", minX: -7.2, maxX: 7.2, minZ: -13.0, maxZ: -12.15 },
  { name: "checkout-left-1", minX: -5.55, maxX: -4.55, minZ: 5.15, maxZ: 7.3 },
  { name: "checkout-left-2", minX: -3.65, maxX: -2.65, minZ: 5.15, maxZ: 7.3 },
  { name: "checkout-right-1", minX: 2.65, maxX: 3.65, minZ: 5.15, maxZ: 7.3 },
  { name: "checkout-right-2", minX: 4.55, maxX: 5.55, minZ: 5.15, maxZ: 7.3 },
  { name: "produce-aepfel", minX: 2.18, maxX: 3.12, minZ: 3.92, maxZ: 4.78 },
  { name: "produce-salat", minX: 3.0, maxX: 3.9, minZ: 3.92, maxZ: 4.78 },
  { name: "produce-karotten", minX: 3.8, maxX: 4.7, minZ: 3.92, maxZ: 4.78 },
  { name: "produce-birnen", minX: 2.5, maxX: 3.4, minZ: 2.92, maxZ: 3.78 },
  { name: "produce-bananen", minX: 3.3, maxX: 4.2, minZ: 2.92, maxZ: 3.78 },
  { name: "meat-counter", minX: -5.2, maxX: -2.05, minZ: 0.35, maxZ: 1.95 },
  { name: "bakery-counter", minX: -3.7, maxX: -1.2, minZ: 2.0, maxZ: 3.2 },
  { name: "left-shelf-row", minX: -5.35, maxX: -4.25, minZ: -9.8, maxZ: 0.0 },
  { name: "middle-shelf-row", minX: -0.35, maxX: 0.75, minZ: -9.8, maxZ: 0.0 },
  { name: "right-shelf-row", minX: 4.25, maxX: 5.35, minZ: -9.8, maxZ: 0.0 },
  { name: "basket-stack", minX: -6.45, maxX: -5.72, minZ: 3.82, maxZ: 4.68 },
  { name: "cart-front", minX: 5.58, maxX: 6.45, minZ: 4.42, maxZ: 5.35 },
  { name: "cart-back", minX: 5.58, maxX: 6.45, minZ: 3.48, maxZ: 4.42 },
  { name: "promo-left", minX: -6.42, maxX: -5.58, minZ: -11.25, maxZ: -10.35 },
  { name: "promo-right", minX: 5.62, maxX: 6.45, minZ: -11.45, maxZ: -10.55 },
  { name: "pallet-left", minX: -6.45, maxX: -5.35, minZ: -11.6, maxZ: -10.7 },
  { name: "endcap-sale", minX: -3.58, maxX: -2.52, minZ: -10.75, maxZ: -9.62 },
  { name: "endcap-bio", minX: 2.15, maxX: 3.25, minZ: -10.75, maxZ: -9.62 }
];

const productGroups = new Map();
const productParts = new Map();
let selectedProductId = null;
let activeProduct = null;
let currentPhase = "selecting";
let finishTimer = null;

registerSupermarketFlow();

if (document.readyState === "loading") {
  window.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

function init() {
  buildStore(document.querySelector("#store"));
  buildProducts(document.querySelector("#store"));
  buildMenu(document.querySelector("#selection-panel"));
  const rig = document.querySelector("#rig");
  if (rig) rig.setAttribute("supermarket-flow", "");
}

function make(tag, attrs = {}, parent) {
  const node = document.createElement(tag);
  Object.entries(attrs).forEach(([name, value]) => node.setAttribute(name, value));
  if (parent) parent.appendChild(node);
  return node;
}

function registerSupermarketFlow() {
  if (typeof AFRAME === "undefined" || AFRAME.components["supermarket-flow"]) return;

  AFRAME.registerComponent("supermarket-flow", {
    tick() {
      constrainRigPosition(this.el);
      updateFlowByPosition(this.el);
    }
  });
}

function constrainRigPosition(rig) {
  if (!rig || !rig.object3D) return;
  const position = rig.object3D.position;

  position.x = clamp(position.x, WALK_BOUNDS.minX, WALK_BOUNDS.maxX);
  position.z = clamp(position.z, WALK_BOUNDS.minZ, WALK_BOUNDS.maxZ);

  BLOCKERS.forEach((blocker) => pushPositionOutOfBlocker(position, blocker));
}

function pushPositionOutOfBlocker(position, blocker) {
  const minX = blocker.minX - PLAYER_RADIUS;
  const maxX = blocker.maxX + PLAYER_RADIUS;
  const minZ = blocker.minZ - PLAYER_RADIUS;
  const maxZ = blocker.maxZ + PLAYER_RADIUS;

  if (position.x <= minX || position.x >= maxX || position.z <= minZ || position.z >= maxZ) return;

  const distances = [
    { axis: "x", value: minX, distance: Math.abs(position.x - minX) },
    { axis: "x", value: maxX, distance: Math.abs(maxX - position.x) },
    { axis: "z", value: minZ, distance: Math.abs(position.z - minZ) },
    { axis: "z", value: maxZ, distance: Math.abs(maxZ - position.z) }
  ].sort((a, b) => a.distance - b.distance);

  position[distances[0].axis] = distances[0].value;
}

function updateFlowByPosition(rig) {
  if (!rig || !rig.object3D || !activeProduct) return;
  const position = rig.object3D.position;

  if (currentPhase === "toProduct") {
    const nearProduct = distanceXZ(position, activeProduct.pickup) < 1.35;
    if (nearProduct) {
      setActionHint(
        `Trigger auf ${activeProduct.name}: einsammeln`,
        activeProduct.target.x,
        activeProduct.target.z,
        activeProduct.target.y + 1.15,
        activeProduct.target.labelYaw ?? activeProduct.target.yaw
      );
    } else {
      clearActionHint();
    }
  }

  if (currentPhase === "toCheckout") {
    const nearCheckout = distanceXZ(position, CHECKOUT_POINT) < 1.35;
    if (nearCheckout) {
      setActionHint("Trigger auf BEZAHLEN druecken", CHECKOUT_POINT.x, CHECKOUT_POINT.z, 1.95, 180);
    } else {
      clearActionHint();
    }
  }
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function distanceXZ(a, b) {
  return Math.hypot(a.x - b.x, a.z - b.z);
}

function getRigRoutePoint(fallback = START_POSITION) {
  const rig = document.querySelector("#rig");
  if (!rig || !rig.object3D) return { x: fallback.x, z: fallback.z };
  return { x: rig.object3D.position.x, z: rig.object3D.position.z };
}

function findRoute(start, goal) {
  const grid = createRouteGrid();
  const startNode = nearestWalkableNode(toGridNode(start, grid), grid);
  const goalNode = nearestWalkableNode(toGridNode(goal, grid), grid);
  if (!startNode || !goalNode) return [start, goal];

  const open = new Set([nodeKey(startNode)]);
  const cameFrom = new Map();
  const gScore = new Map([[nodeKey(startNode), 0]]);
  const fScore = new Map([[nodeKey(startNode), routeHeuristic(startNode, goalNode)]]);

  while (open.size) {
    const currentKey = [...open].sort((a, b) => (fScore.get(a) ?? Infinity) - (fScore.get(b) ?? Infinity))[0];
    const current = nodeFromKey(currentKey);

    if (current.ix === goalNode.ix && current.iz === goalNode.iz) {
      const gridPoints = simplifyGridRoute(reconstructRoute(cameFrom, currentKey).map((node) => fromGridNode(node, grid)));
      return mergeRouteEndpoints(start, goal, gridPoints);
    }

    open.delete(currentKey);

    getRouteNeighbors(current, grid).forEach((neighbor) => {
      const neighborKey = nodeKey(neighbor);
      const tentativeG = (gScore.get(currentKey) ?? Infinity) + 1;
      if (tentativeG >= (gScore.get(neighborKey) ?? Infinity)) return;

      cameFrom.set(neighborKey, currentKey);
      gScore.set(neighborKey, tentativeG);
      fScore.set(neighborKey, tentativeG + routeHeuristic(neighbor, goalNode));
      open.add(neighborKey);
    });
  }

  return [start, goal];
}

function createRouteGrid() {
  const minX = WALK_BOUNDS.minX + PLAYER_RADIUS;
  const maxX = WALK_BOUNDS.maxX - PLAYER_RADIUS;
  const minZ = WALK_BOUNDS.minZ + PLAYER_RADIUS;
  const maxZ = WALK_BOUNDS.maxZ - PLAYER_RADIUS;

  return {
    minX,
    minZ,
    maxIx: Math.floor((maxX - minX) / ROUTE_STEP),
    maxIz: Math.floor((maxZ - minZ) / ROUTE_STEP)
  };
}

function toGridNode(point, grid) {
  return {
    ix: clamp(Math.round((point.x - grid.minX) / ROUTE_STEP), 0, grid.maxIx),
    iz: clamp(Math.round((point.z - grid.minZ) / ROUTE_STEP), 0, grid.maxIz)
  };
}

function fromGridNode(node, grid) {
  return {
    x: grid.minX + node.ix * ROUTE_STEP,
    z: grid.minZ + node.iz * ROUTE_STEP
  };
}

function nearestWalkableNode(origin, grid) {
  for (let radius = 0; radius <= 12; radius += 1) {
    const candidates = [];
    for (let dx = -radius; dx <= radius; dx += 1) {
      for (let dz = -radius; dz <= radius; dz += 1) {
        if (Math.max(Math.abs(dx), Math.abs(dz)) !== radius) continue;
        const node = { ix: origin.ix + dx, iz: origin.iz + dz };
        if (node.ix < 0 || node.ix > grid.maxIx || node.iz < 0 || node.iz > grid.maxIz) continue;
        candidates.push(node);
      }
    }

    candidates.sort((a, b) => routeHeuristic(a, origin) - routeHeuristic(b, origin));
    const match = candidates.find((node) => isWalkableRouteNode(node, grid));
    if (match) return match;
  }

  return null;
}

function getRouteNeighbors(node, grid) {
  return [
    { ix: node.ix + 1, iz: node.iz },
    { ix: node.ix - 1, iz: node.iz },
    { ix: node.ix, iz: node.iz + 1 },
    { ix: node.ix, iz: node.iz - 1 }
  ].filter((candidate) => (
    candidate.ix >= 0 &&
    candidate.ix <= grid.maxIx &&
    candidate.iz >= 0 &&
    candidate.iz <= grid.maxIz &&
    isWalkableRouteNode(candidate, grid)
  ));
}

function isWalkableRouteNode(node, grid) {
  const point = fromGridNode(node, grid);
  return !BLOCKERS.some((blocker) => pointInsideExpandedBlocker(point, blocker, ROUTE_CLEARANCE));
}

function pointInsideExpandedBlocker(point, blocker, clearance) {
  return (
    point.x >= blocker.minX - clearance &&
    point.x <= blocker.maxX + clearance &&
    point.z >= blocker.minZ - clearance &&
    point.z <= blocker.maxZ + clearance
  );
}

function routeHeuristic(a, b) {
  return Math.abs(a.ix - b.ix) + Math.abs(a.iz - b.iz);
}

function nodeKey(node) {
  return `${node.ix},${node.iz}`;
}

function nodeFromKey(key) {
  const [ix, iz] = key.split(",").map(Number);
  return { ix, iz };
}

function reconstructRoute(cameFrom, currentKey) {
  const route = [nodeFromKey(currentKey)];
  let cursor = currentKey;
  while (cameFrom.has(cursor)) {
    cursor = cameFrom.get(cursor);
    route.push(nodeFromKey(cursor));
  }
  return route.reverse();
}

function simplifyGridRoute(points) {
  if (points.length <= 2) return points;
  const simplified = [points[0]];
  let previousDirection = null;

  for (let index = 1; index < points.length; index += 1) {
    const previous = points[index - 1];
    const current = points[index];
    const direction = {
      x: Math.sign(current.x - previous.x),
      z: Math.sign(current.z - previous.z)
    };

    if (!previousDirection || direction.x !== previousDirection.x || direction.z !== previousDirection.z) {
      simplified.push(previous);
      previousDirection = direction;
    }
  }

  simplified.push(points[points.length - 1]);
  return removeDuplicateRoutePoints(simplified);
}

function mergeRouteEndpoints(start, goal, gridPoints) {
  const merged = [start];
  gridPoints.forEach((point) => {
    if (distanceXZ(merged[merged.length - 1], point) > 0.12) merged.push(point);
  });
  if (distanceXZ(merged[merged.length - 1], goal) > 0.12) merged.push(goal);
  return removeDuplicateRoutePoints(merged);
}

function removeDuplicateRoutePoints(points) {
  return points.filter((point, index) => index === 0 || distanceXZ(point, points[index - 1]) > 0.05);
}

function buildStore(parent) {
  make("a-entity", { light: "type: ambient; intensity: 0.62; color: #ffffff" }, parent);
  make("a-entity", { light: "type: directional; intensity: 0.55; color: #ffffff", position: "0 6 3" }, parent);

  make("a-plane", {
    position: "0 0 -1.7",
    rotation: "-90 0 0",
    width: 14,
    height: 22,
    material: "color: #d9e0e7; roughness: 0.92"
  }, parent);

  for (let x = -6; x <= 6; x += 2) {
    make("a-box", {
      position: `${x} 0.012 -1.7`,
      width: 0.018,
      height: 0.018,
      depth: 22,
      material: "color: #c4ccd6; opacity: 0.65; transparent: true"
    }, parent);
  }

  for (let z = -12; z <= 8; z += 2) {
    make("a-box", {
      position: `0 0.014 ${z}`,
      width: 14,
      height: 0.018,
      depth: 0.018,
      material: "color: #c4ccd6; opacity: 0.65; transparent: true"
    }, parent);
  }

  make("a-box", { position: "-7.05 1.35 -1.7", width: 0.18, height: 2.7, depth: 22, material: "color: #eef2f7" }, parent);
  make("a-box", { position: "7.05 1.35 -1.7", width: 0.18, height: 2.7, depth: 22, material: "color: #eef2f7" }, parent);
  make("a-box", { position: "0 1.35 -12.75", width: 14.2, height: 2.7, depth: 0.18, material: "color: #eef2f7" }, parent);
  make("a-box", { position: "0 2.72 -1.7", width: 14.2, height: 0.08, depth: 22, material: "color: #f8fafc; opacity: 0.75; transparent: true" }, parent);

  make("a-text", {
    value: "EINGANG",
    position: "0 2.35 8.35",
    rotation: "0 180 0",
    align: "center",
    width: 4,
    color: "#0f172a"
  }, parent);
  createRestartButton(parent);

  createCheckoutLane(parent, -5.05, 6.25);
  createCheckoutLane(parent, -3.15, 6.25);
  createCheckoutLane(parent, 3.15, 6.25);
  createCheckoutLane(parent, 5.05, 6.25);
  createPayButton(parent);

  createProduceArea(parent);
  createMeatCounter(parent);
  createBakeryArea(parent);
  createFillerProps(parent);

  createShelfRun(parent, -4.8, 90, ["DROGERIE", "KOSMETIK", "KUEHLUNG", "MOLKEREI"]);
  createShelfRun(parent, 0.2, 90, ["GETRAENKE", "KAFFEE", "SNACKS", "CEREALIEN"]);
  createShelfRun(parent, 4.8, 90, ["KOCHEN", "PASTA", "KONSERVEN", "REIS"]);

  createOverheadSign(parent, "REGALGAENGE", "0 2.25 0.45", "0 0 0", 2.4, "#334155");

  for (let z = -10; z <= 6; z += 4) {
    make("a-box", {
      position: `0 2.72 ${z}`,
      width: 6.8,
      height: 0.05,
      depth: 0.18,
      material: "color: #f8fafc; emissive: #e0f2fe; emissiveIntensity: 0.55"
    }, parent);
  }
}

function createCheckoutLane(parent, x, z) {
  const lane = make("a-entity", { position: `${x} 0 ${z}` }, parent);
  make("a-box", { position: "0 0.48 0", width: 0.78, height: 0.2, depth: 1.95, material: "color: #475569; roughness: 0.55" }, lane);
  make("a-box", { position: "0 0.62 0.12", width: 0.62, height: 0.05, depth: 1.25, material: "color: #111827; roughness: 0.35" }, lane);
  make("a-box", { position: "0.27 0.83 -0.48", width: 0.18, height: 0.36, depth: 0.18, material: "color: #0ea5e9; emissive: #0369a1; emissiveIntensity: 0.25" }, lane);
  make("a-box", { position: "0 0.95 0.92", width: 0.9, height: 0.55, depth: 0.08, material: "color: #e2e8f0" }, lane);
  make("a-text", { value: "KASSE", position: "0 0.96 0.97", align: "center", width: 1.4, color: "#0f172a" }, lane);
}

function createRestartButton(parent) {
  const button = make("a-entity", {
    id: "restart-button",
    class: "clickable",
    position: "-5.35 1.45 7.05",
    rotation: "0 180 0"
  }, parent);

  const plate = make("a-plane", {
    class: "clickable",
    position: "0 0 0",
    width: 1.75,
    height: 0.56,
    material: "color: #991b1b; emissive: #450a0a; emissiveIntensity: 0.35; roughness: 0.35"
  }, button);

  make("a-text", {
    value: "ABBRECHEN",
    position: "0 0.08 0.04",
    align: "center",
    width: 2.4,
    color: "#ffffff"
  }, button);

  make("a-text", {
    value: "Restart",
    position: "0 -0.15 0.04",
    align: "center",
    width: 1.9,
    color: "#fee2e2"
  }, button);

  button.addEventListener("mouseenter", () => {
    plate.setAttribute("material", "color: #dc2626; emissive: #ef4444; emissiveIntensity: 0.45");
  });

  button.addEventListener("mouseleave", () => {
    plate.setAttribute("material", "color: #991b1b; emissive: #450a0a; emissiveIntensity: 0.35; roughness: 0.35");
  });

  plate.addEventListener("click", () => resetExperience());
}

function createPayButton(parent) {
  const button = make("a-entity", {
    id: "pay-button",
    class: "clickable",
    position: "2.1 1.35 6.95",
    rotation: "0 180 0"
  }, parent);

  const plate = make("a-plane", {
    class: "clickable",
    position: "0 0 0",
    width: 1.55,
    height: 0.56,
    material: "color: #64748b; emissive: #0f172a; emissiveIntensity: 0.15; roughness: 0.35"
  }, button);

  make("a-text", {
    value: "BEZAHLEN",
    position: "0 0.08 0.04",
    align: "center",
    width: 2.1,
    color: "#ffffff"
  }, button);

  make("a-text", {
    value: "erst Produkt holen",
    position: "0 -0.15 0.04",
    align: "center",
    width: 1.85,
    color: "#e2e8f0"
  }, button);

  button.addEventListener("mouseenter", () => {
    if (currentPhase === "toCheckout") {
      plate.setAttribute("material", "color: #16a34a; emissive: #22c55e; emissiveIntensity: 0.45; roughness: 0.35");
    }
  });

  button.addEventListener("mouseleave", () => updatePayButton());
  plate.addEventListener("click", () => handlePayClick());
  updatePayButton();
}

function updatePayButton() {
  const button = document.querySelector("#pay-button");
  if (!button || !button.children.length) return;

  const isActive = currentPhase === "toCheckout";
  button.children[0].setAttribute(
    "material",
    isActive
      ? "color: #15803d; emissive: #22c55e; emissiveIntensity: 0.28; roughness: 0.35"
      : "color: #64748b; emissive: #0f172a; emissiveIntensity: 0.15; roughness: 0.35"
  );

  if (button.children[2]) {
    button.children[2].setAttribute("value", isActive ? "Trigger druecken" : "erst Produkt holen");
    button.children[2].setAttribute("color", isActive ? "#dcfce7" : "#e2e8f0");
  }
}

function createFillerProps(parent) {
  createBasketStack(parent, -6.1, 4.25);
  createShoppingCart(parent, 6.05, 4.9, -90);
  createShoppingCart(parent, 6.05, 3.95, -90);
  createPromoStand(parent, -6.0, -10.8, "ANGEBOT", "#ef4444");
  createPromoStand(parent, 6.05, -11.0, "NEU", "#2563eb");
  createPalletDisplay(parent, -5.9, -11.15, "#f59e0b");
  createEndcapDisplay(parent, -3.05, -10.15, "SALE");
  createEndcapDisplay(parent, 2.7, -10.15, "BIO");
  createWallPoster(parent, -6.93, 1.55, -4.4, 90, "WOCHEN\\nANGEBOTE", "#dc2626");
  createWallPoster(parent, 6.93, 1.55, -6.6, -90, "FRISCH\\nEINKAUFEN", "#16a34a");
  createSmallFloorDecal(parent, -1.75, 4.9, "FRISCHE");
  createSmallFloorDecal(parent, 3.4, 1.8, "REGAL");
}

function createBasketStack(parent, x, z) {
  const stack = make("a-entity", { position: `${x} 0 ${z}`, rotation: "0 28 0" }, parent);
  for (let i = 0; i < 5; i += 1) {
    make("a-box", { position: `0 ${0.16 + i * 0.075} 0`, width: 0.72, height: 0.05, depth: 0.48, material: "color: #ef4444; roughness: 0.55" }, stack);
    make("a-box", { position: `0 ${0.19 + i * 0.075} -0.22`, width: 0.58, height: 0.04, depth: 0.035, material: "color: #7f1d1d; roughness: 0.55" }, stack);
  }
  make("a-text", { value: "KOERBE", position: "0 0.72 0.02", align: "center", width: 1.2, color: "#7f1d1d" }, stack);
}

function createShoppingCart(parent, x, z, yaw) {
  const cart = make("a-entity", { position: `${x} 0 ${z}`, rotation: `0 ${yaw} 0` }, parent);
  make("a-box", { position: "0 0.55 0", width: 0.62, height: 0.34, depth: 0.82, material: "color: #cbd5e1; opacity: 0.42; transparent: true; roughness: 0.25" }, cart);
  make("a-box", { position: "0 0.38 0", width: 0.72, height: 0.05, depth: 0.9, material: "color: #64748b; roughness: 0.45" }, cart);
  make("a-box", { position: "0 0.78 -0.48", width: 0.78, height: 0.05, depth: 0.06, material: "color: #475569; roughness: 0.4" }, cart);
  [-0.25, 0.25].forEach((px) => {
    [-0.32, 0.32].forEach((pz) => {
      make("a-cylinder", { position: `${px} 0.16 ${pz}`, radius: 0.08, height: 0.045, rotation: "90 0 0", "segments-radial": 16, material: "color: #111827; roughness: 0.5" }, cart);
    });
  });
}

function createPromoStand(parent, x, z, text, color) {
  const stand = make("a-entity", { position: `${x} 0 ${z}`, rotation: "0 90 0" }, parent);
  make("a-cylinder", { position: "0 0.06 0", radius: 0.35, height: 0.12, "segments-radial": 24, material: "color: #334155; roughness: 0.55" }, stand);
  make("a-box", { position: "0 0.55 0", width: 0.72, height: 0.88, depth: 0.08, material: `color: ${color}; roughness: 0.4` }, stand);
  make("a-text", { value: text, position: "0 0.64 0.06", align: "center", width: 1.2, color: "#ffffff" }, stand);
  make("a-text", { value: "-20%", position: "0 0.36 0.06", align: "center", width: 1.0, color: "#ffffff" }, stand);
}

function createPalletDisplay(parent, x, z, color) {
  const pallet = make("a-entity", { position: `${x} 0 ${z}` }, parent);
  make("a-box", { position: "0 0.08 0", width: 1.05, height: 0.16, depth: 0.72, material: "color: #92400e; roughness: 0.75" }, pallet);
  for (let row = 0; row < 2; row += 1) {
    for (let col = 0; col < 3; col += 1) {
      make("a-box", {
        position: `${-0.32 + col * 0.32} ${0.28 + row * 0.28} ${-0.18 + row * 0.24}`,
        width: 0.26,
        height: 0.26,
        depth: 0.24,
        material: `color: ${row === 0 ? color : "#fde68a"}; roughness: 0.55`
      }, pallet);
    }
  }
}

function createEndcapDisplay(parent, x, z, text) {
  const endcap = make("a-entity", { position: `${x} 0 ${z}` }, parent);
  make("a-box", { position: "0 0.55 0", width: 0.95, height: 1.05, depth: 0.46, material: "color: #475569; roughness: 0.55" }, endcap);
  for (let i = 0; i < 6; i += 1) {
    make("a-box", {
      position: `${-0.28 + (i % 3) * 0.28} ${0.35 + Math.floor(i / 3) * 0.34} 0.25`,
      width: 0.18,
      height: 0.24,
      depth: 0.12,
      material: `color: ${i % 2 ? "#38bdf8" : "#f97316"}; roughness: 0.45`
    }, endcap);
  }
  make("a-plane", { position: "0 1.18 0.26", width: 0.9, height: 0.28, material: "color: #f8fafc; roughness: 0.35" }, endcap);
  make("a-text", { value: text, position: "0 1.17 0.29", align: "center", width: 1.2, color: "#0f172a" }, endcap);
}

function createWallPoster(parent, x, y, z, yaw, text, color) {
  const poster = make("a-entity", { position: `${x} ${y} ${z}`, rotation: `0 ${yaw} 0` }, parent);
  make("a-plane", { position: "0 0 0", width: 1.15, height: 1.0, material: `color: ${color}; roughness: 0.45` }, poster);
  make("a-text", { value: text, position: "0 -0.04 0.035", align: "center", width: 1.55, color: "#ffffff" }, poster);
}

function createSmallFloorDecal(parent, x, z, text) {
  make("a-circle", { position: `${x} 0.018 ${z}`, rotation: "-90 0 0", radius: 0.55, material: "color: #f8fafc; opacity: 0.42; transparent: true; shader: flat; side: double" }, parent);
  make("a-text", { value: text, position: `${x} 0.025 ${z + 0.02}`, rotation: "-90 0 0", align: "center", width: 1.4, color: "#334155" }, parent);
}

function createProduceArea(parent) {
  createOverheadSign(parent, "OBST & GEMUESE", "3.45 2.25 4.35", "0 0 0", 2.8, "#166534");
  createProduceCrate(parent, 2.65, 4.35, "#ef4444", "Aepfel");
  createProduceCrate(parent, 3.45, 4.35, "#22c55e", "Salat");
  createProduceCrate(parent, 4.25, 4.35, "#f97316", "Karotten");
  createProduceCrate(parent, 2.95, 3.35, "#84cc16", "Birnen");
  createProduceCrate(parent, 3.75, 3.35, "#eab308", "Bananen");
}

function createProduceCrate(parent, x, z, color, label) {
  const crate = make("a-entity", { position: `${x} 0 ${z}` }, parent);
  make("a-box", { position: "0 0.38 0", width: 0.68, height: 0.18, depth: 0.58, material: "color: #8b5a2b; roughness: 0.75" }, crate);
  make("a-box", { position: "0 0.52 0", width: 0.72, height: 0.1, depth: 0.62, material: "color: #a16207; roughness: 0.75" }, crate);
  for (let i = 0; i < 9; i += 1) {
    const px = -0.22 + (i % 3) * 0.22;
    const pz = -0.18 + Math.floor(i / 3) * 0.18;
    make("a-sphere", {
      position: `${px} ${0.66 + (i % 2) * 0.04} ${pz}`,
      radius: 0.085,
      material: `color: ${color}; roughness: 0.55`
    }, crate);
  }
  make("a-text", { value: label, position: "0 0.32 0.34", align: "center", width: 1.0, color: "#f8fafc" }, crate);
}

function createMeatCounter(parent) {
  const counter = make("a-entity", { position: "-3.65 0 1.15", rotation: "0 18 0" }, parent);
  createOverheadSign(parent, "FLEISCHTHEKE", "-3.65 2.18 1.15", "0 18 0", 2.5, "#991b1b");
  make("a-box", { position: "0 0.48 0", width: 2.8, height: 0.72, depth: 0.76, material: "color: #e5e7eb; roughness: 0.42" }, counter);
  make("a-box", { position: "0 0.9 0.05", width: 2.72, height: 0.32, depth: 0.7, material: "color: #bfdbfe; opacity: 0.45; transparent: true; roughness: 0.1" }, counter);
  ["#fca5a5", "#ef4444", "#fb7185", "#fecaca"].forEach((color, i) => {
    make("a-box", {
      position: `${-0.95 + i * 0.62} 0.77 0.13`,
      width: 0.42,
      height: 0.08,
      depth: 0.32,
      material: `color: ${color}; roughness: 0.7`
    }, counter);
  });
}

function createBakeryArea(parent) {
  const bakery = make("a-entity", { position: "-2.45 0 2.42" }, parent);
  createOverheadSign(parent, "BAECKEREI", "-2.45 2.18 2.42", "0 0 0", 2.3, "#92400e");
  make("a-box", { position: "0 0.55 0.28", width: 2.3, height: 0.72, depth: 0.72, material: "color: #c4a484; roughness: 0.7" }, bakery);
  make("a-box", { position: "0 0.95 0.32", width: 2.22, height: 0.1, depth: 0.74, material: "color: #7c2d12; roughness: 0.6" }, bakery);
  for (let i = 0; i < 8; i += 1) {
    make("a-sphere", {
      position: `${-0.82 + i * 0.24} 1.1 ${0.21 + (i % 2) * 0.14}`,
      scale: "0.18 0.08 0.12",
      material: "color: #d99b4a; roughness: 0.8"
    }, bakery);
  }
}

function createOverheadSign(parent, text, position, rotation, width, color) {
  const sign = make("a-entity", { position, rotation }, parent);
  make("a-plane", { position: "0 0 0", width, height: 0.42, material: `color: ${color}; roughness: 0.45` }, sign);
  make("a-text", { value: text, position: "0 -0.015 0.03", align: "center", width: width * 1.15, color: "#ffffff" }, sign);
}

function createShelfRun(parent, x, yaw, labels) {
  const zPositions = [-1.2, -3.65, -6.1, -8.55];
  zPositions.forEach((z, index) => {
    createRack(parent, x, z, yaw, labels[index] || labels[0]);
  });
}

function createRack(parent, x, z, yaw, label) {
  const rack = make("a-entity", { position: `${x} 0 ${z}`, rotation: `0 ${yaw} 0` }, parent);

  make("a-box", { position: "0 0.78 -0.16", width: 2.35, height: 1.48, depth: 0.54, material: "color: #637083; roughness: 0.7" }, rack);
  make("a-box", { position: "0 0.20 0.15", width: 2.45, height: 0.07, depth: 0.70, material: "color: #334155" }, rack);
  make("a-box", { position: "0 0.62 0.15", width: 2.45, height: 0.06, depth: 0.70, material: "color: #334155" }, rack);
  make("a-box", { position: "0 1.04 0.15", width: 2.45, height: 0.06, depth: 0.70, material: "color: #334155" }, rack);
  make("a-box", { position: "0 1.45 0.15", width: 2.45, height: 0.06, depth: 0.70, material: "color: #334155" }, rack);

  make("a-plane", { position: "0 1.78 0.24", width: 2.25, height: 0.34, material: "color: #f8fafc" }, rack);
  make("a-text", { value: label, position: "0 1.77 0.27", align: "center", width: 2.8, color: "#0f172a" }, rack);

  const colors = ["#f97316", "#22c55e", "#38bdf8", "#e879f9", "#facc15", "#fb7185"];
  const rows = [0.38, 0.78, 1.18];
  rows.forEach((y, rowIndex) => {
    for (let i = 0; i < 6; i += 1) {
      const px = -0.9 + i * 0.36;
      make("a-box", {
        position: `${px} ${y} 0.26`,
        width: 0.22,
        height: 0.28,
        depth: 0.16,
        material: `color: ${colors[(i + rowIndex) % colors.length]}; roughness: 0.5`
      }, rack);
    }
  });
}

function buildProducts(parent) {
  PRODUCTS.forEach((product) => {
    const group = make("a-entity", {
      id: `product-${product.id}`,
      position: `${product.target.x} ${product.target.y} ${product.target.z}`,
      rotation: `0 ${product.target.yaw} 0`
    }, parent);

    const parts = [];
    const addPart = (tag, attrs) => {
      const part = make(tag, { ...attrs, class: "target-part clickable product-clickable" }, group);
      part.dataset.productId = product.id;
      part.dataset.baseColor = attrs["data-color"] || product.color;
      part.addEventListener("click", () => handleProductClick(product.id));
      parts.push(part);
      return part;
    };

    if (product.target.shelfItem) {
      createShelfProductPackage(product, addPart, group);
    } else if (product.type === "carton") {
      addPart("a-box", { position: "0 0 0", width: 0.32, height: 0.48, depth: 0.18, material: `color: ${product.color}; roughness: 0.35`, "data-color": product.color });
      addPart("a-cone", { position: "0 0.31 0", "radius-bottom": 0.21, "radius-top": 0.03, height: 0.18, "segments-radial": 4, rotation: "0 45 0", material: "color: #dff7ff; roughness: 0.4", "data-color": "#dff7ff" });
    } else if (product.type === "bread") {
      addPart("a-sphere", { position: "-0.13 0 0", scale: "0.34 0.18 0.18", material: `color: ${product.color}; roughness: 0.8`, "data-color": product.color });
      addPart("a-sphere", { position: "0.13 0 0", scale: "0.34 0.18 0.18", material: "color: #f0b867; roughness: 0.8", "data-color": "#f0b867" });
    } else if (product.type === "coffee") {
      addPart("a-cylinder", { position: "0 0 0", radius: 0.18, height: 0.46, "segments-radial": 24, material: `color: ${product.color}; roughness: 0.5`, "data-color": product.color });
      addPart("a-cylinder", { position: "0 0.26 0", radius: 0.18, height: 0.04, "segments-radial": 24, material: "color: #f8fafc; roughness: 0.4", "data-color": "#f8fafc" });
    } else if (product.type === "apples") {
      [
        [-0.18, 0, 0],
        [0, 0.04, 0.02],
        [0.18, 0, 0],
        [-0.08, 0.2, 0],
        [0.1, 0.2, 0.01]
      ].forEach(([x, y, z]) => {
        addPart("a-sphere", { position: `${x} ${y} ${z}`, radius: 0.13, material: `color: ${product.color}; roughness: 0.55`, "data-color": product.color });
      });
    } else if (product.type === "shampoo") {
      addPart("a-box", { position: "0 0 0", width: 0.24, height: 0.52, depth: 0.16, material: `color: ${product.color}; roughness: 0.35`, "data-color": product.color });
      addPart("a-cylinder", { position: "0 0.31 0", radius: 0.09, height: 0.09, "segments-radial": 16, material: "color: #312e81; roughness: 0.35", "data-color": "#312e81" });
    } else {
      addPart("a-box", { position: "-0.08 0 0", width: 0.18, height: 0.54, depth: 0.14, material: `color: ${product.color}; roughness: 0.45`, "data-color": product.color });
      addPart("a-box", { position: "0.11 0 0", width: 0.18, height: 0.48, depth: 0.14, material: "color: #fde68a; roughness: 0.45", "data-color": "#fde68a" });
    }

    if (!product.target.shelfItem) {
      make("a-plane", { position: "0 -0.43 0.04", width: 0.92, height: 0.24, material: "color: #0f172a; opacity: 0.82; transparent: true" }, group);
      make("a-text", { value: product.name, position: "0 -0.445 0.065", align: "center", width: 1.45, color: "#ffffff" }, group);
    }

    productGroups.set(product.id, group);
    productParts.set(product.id, parts);
  });
}

function createShelfProductPackage(product, addPart, group) {
  make("a-box", {
    position: "0 -0.3 0",
    width: 0.58,
    height: 0.045,
    depth: 0.42,
    material: "color: #334155; roughness: 0.55"
  }, group);

  if (product.type === "carton") {
    addPart("a-box", { position: "0 0 0.02", width: 0.34, height: 0.52, depth: 0.22, material: `color: ${product.color}; roughness: 0.32`, "data-color": product.color });
    addPart("a-box", { position: "0 0.18 0.145", width: 0.24, height: 0.12, depth: 0.012, material: "color: #f8fafc; roughness: 0.25", "data-color": "#f8fafc" });
  } else if (product.type === "coffee") {
    addPart("a-box", { position: "0 0 0.02", width: 0.34, height: 0.44, depth: 0.2, material: `color: ${product.color}; roughness: 0.6`, "data-color": product.color });
    addPart("a-box", { position: "0 -0.04 0.14", width: 0.24, height: 0.2, depth: 0.012, material: "color: #f5e6c8; roughness: 0.35", "data-color": "#f5e6c8" });
  } else if (product.type === "shampoo") {
    addPart("a-box", { position: "0 0 0.02", width: 0.24, height: 0.52, depth: 0.17, material: `color: ${product.color}; roughness: 0.34`, "data-color": product.color });
    addPart("a-box", { position: "0 0.3 0.02", width: 0.16, height: 0.08, depth: 0.13, material: "color: #312e81; roughness: 0.35", "data-color": "#312e81" });
  } else {
    addPart("a-box", { position: "-0.08 0 0.02", width: 0.2, height: 0.5, depth: 0.16, material: `color: ${product.color}; roughness: 0.42`, "data-color": product.color });
    addPart("a-box", { position: "0.13 -0.02 0.02", width: 0.18, height: 0.44, depth: 0.16, material: "color: #fde68a; roughness: 0.42", "data-color": "#fde68a" });
  }

  make("a-plane", { position: "0 -0.37 0.22", width: 0.62, height: 0.16, material: "color: #f8fafc; roughness: 0.3" }, group);
  make("a-text", { value: product.name, position: "0 -0.385 0.235", align: "center", width: 0.9, color: "#0f172a" }, group);
}

function buildMenu(panel) {
  make("a-plane", {
    position: "0 0 0",
    width: 4.25,
    height: 2.75,
    material: "color: #111827; opacity: 0.92; transparent: true"
  }, panel);

  make("a-text", {
    value: "Produkt waehlen",
    position: "0 1.06 0.04",
    align: "center",
    width: 4.6,
    color: "#f8fafc"
  }, panel);

  make("a-text", {
    id: "route-status",
    value: "Zeige mit dem Controller-Laser auf ein Produkt und druecke den Trigger.",
    position: "0 -1.12 0.04",
    align: "center",
    width: 3.9,
    color: "#bae6fd"
  }, panel);

  PRODUCTS.forEach((product, index) => {
    const col = index % 2;
    const row = Math.floor(index / 2);
    const x = col === 0 ? -1.05 : 1.05;
    const y = 0.48 - row * 0.55;

    const button = make("a-plane", {
      class: "clickable menu-button",
      position: `${x} ${y} 0.06`,
      width: 1.7,
      height: 0.38,
      material: "color: #1e293b; roughness: 0.45"
    }, panel);

    button.dataset.productId = product.id;

    make("a-text", {
      value: product.name,
      position: "0 0 0.035",
      align: "center",
      width: 2.7,
      color: "#ffffff"
    }, button);

    button.addEventListener("mouseenter", () => {
      if (selectedProductId !== product.id) {
        button.setAttribute("material", "color: #334155; emissive: #0ea5e9; emissiveIntensity: 0.18");
      }
    });

    button.addEventListener("mouseleave", () => updateButtons());
    button.addEventListener("click", () => selectProduct(product.id));
  });
}

function selectProduct(productId) {
  if (currentPhase !== "selecting") return;
  const product = PRODUCTS.find((item) => item.id === productId);
  if (!product) return;

  if (finishTimer) {
    window.clearTimeout(finishTimer);
    finishTimer = null;
  }

  selectedProductId = productId;
  activeProduct = product;
  currentPhase = "toProduct";
  clearRoute();
  resetProducts();
  updateButtons();
  drawRoute(findRoute(getRigRoutePoint(START_POSITION), product.pickup), "#22d3ee");
  highlightProduct(product);
  showRouteBanner(`Folge den Pfeilen zu ${product.name}`);

  document.querySelector("#route-status").setAttribute(
    "value",
    `Route zu ${product.name} aktiv. Ziel: ${product.shelf}.`
  );
  hideSelectionPanel();
}

function handleProductClick(productId) {
  if (currentPhase !== "toProduct" || !activeProduct || activeProduct.id !== productId) return;

  const rig = document.querySelector("#rig");
  if (rig && rig.object3D && distanceXZ(rig.object3D.position, activeProduct.pickup) > 1.55) {
    setActionHint(
      "Noch naeher zum markierten Produkt gehen.",
      activeProduct.target.x,
      activeProduct.target.z,
      activeProduct.target.y + 1.15,
      activeProduct.target.labelYaw ?? activeProduct.target.yaw
    );
    return;
  }

  collectProduct(activeProduct);
}

function collectProduct(product) {
  currentPhase = "toCheckout";
  selectedProductId = product.id;

  clearRoute();
  resetProducts();
  clearActionHint();

  const group = productGroups.get(product.id);
  if (group) group.setAttribute("visible", "false");

  drawRoute(getCheckoutRoute(product, getRigRoutePoint(product.pickup)), "#22c55e");
  highlightCheckout(product);
  updatePayButton();
  showRouteBanner(`${product.name} eingesammelt. Folge den gruenen Pfeilen zur Kasse.`, "#bbf7d0");
}

function handlePayClick() {
  if (currentPhase !== "toCheckout" || !activeProduct) {
    setActionHint("Erst ein Produkt einsammeln.", CHECKOUT_POINT.x, CHECKOUT_POINT.z, 1.95, 180);
    return;
  }

  const rig = document.querySelector("#rig");
  if (rig && rig.object3D && distanceXZ(rig.object3D.position, CHECKOUT_POINT) > 1.45) {
    setActionHint("Zur markierten Kasse gehen.", CHECKOUT_POINT.x, CHECKOUT_POINT.z, 1.95, 180);
    return;
  }

  finishShopping();
}

function getCheckoutRoute(product, start = product.pickup) {
  return findRoute(start, CHECKOUT_POINT);
}

function highlightCheckout(product) {
  const layer = document.querySelector("#route-layer");

  make("a-ring", {
    position: `${CHECKOUT_POINT.x} 0.07 ${CHECKOUT_POINT.z}`,
    rotation: "-90 0 0",
    "radius-inner": 0.45,
    "radius-outer": 0.72,
    material: "color: #22c55e; shader: flat; transparent: true; opacity: 0.86; side: double",
    animation__pulse: "property: scale; dir: alternate; dur: 760; loop: true; to: 1.18 1.18 1.18"
  }, layer);

  make("a-entity", {
    position: `${CHECKOUT_POINT.x} 1.1 ${CHECKOUT_POINT.z}`,
    light: "type: point; color: #22c55e; intensity: 1.25; distance: 3"
  }, layer);

  const label = make("a-entity", {
    position: `${CHECKOUT_POINT.x} 2.05 ${CHECKOUT_POINT.z}`,
    rotation: "0 180 0"
  }, layer);

  make("a-plane", {
    position: "0 0 0.05",
    width: 2.3,
    height: 0.5,
    material: "color: #052e16; opacity: 0.9; transparent: true"
  }, label);

  make("a-text", {
    value: `Zur Kasse mit ${product.name}`,
    position: "0 -0.02 0.09",
    align: "center",
    width: 3,
    color: "#dcfce7"
  }, label);
}

function finishShopping() {
  if (currentPhase !== "toCheckout" || finishTimer) return;
  currentPhase = "complete";
  updatePayButton();
  clearRoute();
  showRouteBanner("Fertig bezahlt. Neuer Einkauf startet gleich.", "#dcfce7");

  finishTimer = window.setTimeout(() => {
    resetExperience();
    finishTimer = null;
  }, 1400);
}

function resetExperience() {
  clearRoute();
  resetProducts();
  clearActionHint();

  selectedProductId = null;
  activeProduct = null;
  currentPhase = "selecting";
  updateButtons();
  updatePayButton();
  teleportRigToStart();
  showSelectionPanel();
}

function teleportRigToStart() {
  const rig = document.querySelector("#rig");
  if (!rig) return;

  rig.setAttribute("position", `${START_POSITION.x} ${START_POSITION.y} ${START_POSITION.z}`);
  if (rig.object3D) {
    rig.object3D.position.set(START_POSITION.x, START_POSITION.y, START_POSITION.z);
  }
}

function updateButtons() {
  document.querySelectorAll(".menu-button").forEach((button) => {
    const isActive = button.dataset.productId === selectedProductId;
    button.setAttribute(
      "material",
      isActive
        ? "color: #0891b2; emissive: #22d3ee; emissiveIntensity: 0.45"
        : "color: #1e293b; emissive: #000000; emissiveIntensity: 0"
    );
  });
}

function clearRoute() {
  const routeLayer = document.querySelector("#route-layer");
  while (routeLayer.firstChild) routeLayer.removeChild(routeLayer.firstChild);
}

function hideSelectionPanel() {
  const panel = document.querySelector("#selection-panel");
  panel.setAttribute(
    "animation__hide",
    "property: scale; to: 0.001 0.001 0.001; dur: 240; easing: easeInQuad"
  );
  window.setTimeout(() => panel.setAttribute("visible", "false"), 260);
}

function showSelectionPanel() {
  const panel = document.querySelector("#selection-panel");
  panel.removeAttribute("animation__hide");
  panel.setAttribute("visible", "true");
  panel.setAttribute("scale", "1 1 1");

  const status = document.querySelector("#route-status");
  if (status) {
    status.setAttribute(
      "value",
      "Zeige mit dem Controller-Laser auf ein Produkt und druecke den Trigger."
    );
  }
}

function showRouteBanner(text, color = "#e0f2fe") {
  const layer = document.querySelector("#route-layer");
  const banner = make("a-entity", { position: "0 2.25 4.95" }, layer);

  make("a-plane", {
    position: "0 0 0",
    width: 3.25,
    height: 0.44,
    material: "color: #0f172a; opacity: 0.86; transparent: true"
  }, banner);

  make("a-text", {
    value: text,
    position: "0 -0.015 0.04",
    align: "center",
    width: 3.75,
    color
  }, banner);
}

function setActionHint(text, x, z, y = 2.15, yaw = 0) {
  const existing = document.querySelector("#action-hint");
  if (existing && existing.dataset.text === text) return;

  clearActionHint();
  const layer = document.querySelector("#route-layer");
  const hint = make("a-entity", {
    id: "action-hint",
    position: `${x} ${y} ${z}`,
    rotation: `0 ${yaw} 0`
  }, layer);
  hint.dataset.text = text;

  make("a-plane", {
    position: "0 0 0.05",
    width: 2.35,
    height: 0.44,
    material: "color: #111827; opacity: 0.9; transparent: true"
  }, hint);

  make("a-text", {
    value: text,
    position: "0 -0.015 0.09",
    align: "center",
    width: 3,
    color: "#ffffff"
  }, hint);
}

function clearActionHint() {
  const hint = document.querySelector("#action-hint");
  if (hint && hint.parentNode) hint.parentNode.removeChild(hint);
}

function resetProducts() {
  PRODUCTS.forEach((product) => {
    const group = productGroups.get(product.id);
    const parts = productParts.get(product.id) || [];
    if (group) {
      group.removeAttribute("animation__pulse");
      group.setAttribute("scale", "1 1 1");
      group.setAttribute("visible", "true");
    }

    parts.forEach((part) => {
      const baseColor = part.dataset.baseColor || product.color;
      part.setAttribute("material", `color: ${baseColor}; roughness: 0.42; metalness: 0.02; emissive: #000000; emissiveIntensity: 0`);
    });
  });
}

function drawRoute(points, color = "#22d3ee") {
  const layer = document.querySelector("#route-layer");

  for (let index = 0; index < points.length - 1; index += 1) {
    const from = points[index];
    const to = points[index + 1];
    const dx = to.x - from.x;
    const dz = to.z - from.z;
    const length = Math.hypot(dx, dz);
    const yaw = THREE.MathUtils.radToDeg(Math.atan2(dx, dz));
    const midX = from.x + dx / 2;
    const midZ = from.z + dz / 2;

    make("a-plane", {
      position: `${midX} 0.024 ${midZ}`,
      rotation: `90 ${yaw} 0`,
      width: 0.18,
      height: length,
      material: `color: ${color}; shader: flat; transparent: true; opacity: 0.24; side: double`
    }, layer);

    const arrowCount = Math.max(1, Math.floor(length / 1.05));
    for (let step = 0; step < arrowCount; step += 1) {
      const t = (step + 0.5) / arrowCount;
      createArrow(from.x + dx * t, from.z + dz * t, yaw, layer, step, color);
    }
  }
}

function createArrow(x, z, yaw, parent, step, color) {
  const group = make("a-entity", {
    position: `${x} 0.045 ${z}`,
    rotation: `0 ${yaw} 0`,
    animation__pulse: `property: scale; dir: alternate; dur: 700; delay: ${step * 70}; loop: true; to: 1.13 1.13 1.13`
  }, parent);

  make("a-circle", {
    position: "0 0 0",
    rotation: "-90 0 0",
    radius: 0.26,
    material: "color: #083344; shader: flat; transparent: true; opacity: 0.36; side: double"
  }, group);

  make("a-plane", {
    position: "0 0.008 -0.12",
    rotation: "90 0 0",
    width: 0.16,
    height: 0.44,
    material: `color: ${color}; shader: flat; transparent: true; opacity: 0.92; side: double`
  }, group);

  make("a-triangle", {
    position: "0 0.01 0.18",
    rotation: "90 0 0",
    "vertex-a": "0 0.24 0",
    "vertex-b": "-0.22 -0.16 0",
    "vertex-c": "0.22 -0.16 0",
    material: `color: ${color}; shader: flat; transparent: true; opacity: 0.98; side: double`
  }, group);
}

function highlightProduct(product) {
  const group = productGroups.get(product.id);
  const layer = document.querySelector("#route-layer");
  const lastPoint = product.pickup;
  const labelYaw = product.target.labelYaw ?? product.target.yaw;

  if (group) {
    group.setAttribute(
      "animation__pulse",
      "property: scale; dir: alternate; dur: 720; easing: easeInOutSine; loop: true; to: 1.08 1.08 1.08"
    );
  }

  (productParts.get(product.id) || []).forEach((part) => {
    const baseColor = part.dataset.baseColor || product.color;
    part.setAttribute(
      "material",
      `color: ${baseColor}; roughness: 0.26; metalness: 0.02; emissive: ${product.color}; emissiveIntensity: 0.32`
    );
  });

  make("a-ring", {
    position: `${lastPoint.x} 0.06 ${lastPoint.z}`,
    rotation: "-90 0 0",
    "radius-inner": 0.38,
    "radius-outer": 0.52,
    material: "color: #22d3ee; shader: flat; transparent: true; opacity: 0.38; side: double",
    animation__pulse: "property: scale; dir: alternate; dur: 900; loop: true; to: 1.1 1.1 1.1"
  }, layer);

  make("a-ring", {
    position: `${product.target.x} ${product.target.y + 0.02} ${product.target.z}`,
    rotation: `0 ${labelYaw} 0`,
    "radius-inner": 0.34,
    "radius-outer": 0.4,
    material: `color: ${product.color}; shader: flat; transparent: true; opacity: 0.55; side: double`,
    animation__pulse: "property: scale; dir: alternate; dur: 720; easing: easeInOutSine; loop: true; to: 1.08 1.08 1.08"
  }, layer);

  const label = make("a-entity", {
    position: `${product.target.x} 1.92 ${product.target.z}`,
    rotation: `0 ${labelYaw} 0`
  }, layer);

  make("a-plane", {
    position: "0 0 0.05",
    width: 1.65,
    height: 0.34,
    material: "color: #0f172a; opacity: 0.72; transparent: true"
  }, label);

  make("a-text", {
    value: `${product.name} nehmen`,
    position: "0 -0.012 0.09",
    align: "center",
    width: 2.35,
    color: "#ffffff"
  }, label);
}
