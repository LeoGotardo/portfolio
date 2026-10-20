import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * The hero's 3D piece: an original voxel tabby kitten lying on an office chair in a small voxel dev
 * corner (floor tile, white desk, PC with RGB, Raspberry Pi, white Monster, cactus, guitar), floating
 * on the page background. Everything is modelled in code; there is no model file. The camera swings in on load and then circles slowly; a
 * mouse drag turns it (touch is left alone, so swipes scroll the page). Hero loads this chunk lazily,
 * on the client only. Frames run only while the hero is on screen, and reduced motion gets a still
 * frame that moves only when dragged.
 */

type Vec = [number, number, number];
type Part = "body" | "head" | "eyes" | "tail";
type Shape = { part: Part; inside: (p: Vec) => boolean; color: (p: Vec) => string };

// A brown mackerel tabby kitten: sandy coat with narrow dark stripes down the flanks, a dark line along
// the spine, an M on the forehead, lines from the eyes across the cheeks, ringed legs and tail, cream
// muzzle, chest and paws.
const FUR = "#a8916f";
const CREAM = "#eadfc9";
const STRIPE = "#4a3b2c";
const DARK = "#2e241b";
const PINK = "#d9928a";
const LIME = "#c8f04a";

// The kitten is modelled as rounded solids in voxel units (it faces +z, y is up) and then voxelized:
// every integer cell inside a solid becomes a cube. It lies in a sphinx pose, front paws stretched
// out, head up, tail curled along its +x flank, with a kitten's big head, big ears and short body.
const VOXEL = 0.1;
const SKULL: Vec = [0, 12.5, 5];
const NECK: Vec = [0, 8, 3];
const EYE: Vec = [0, 13.5, 10.4];
const TAIL: Vec[] = [
  [2.5, 2, -10.5],
  [6, 1.8, -9.5],
  [7.5, 1.8, -5.5],
  [7, 1.8, -1.5],
];

const ellipsoid =
  (c: Vec, r: Vec) =>
  (p: Vec): boolean =>
    ((p[0] - c[0]) / r[0]) ** 2 + ((p[1] - c[1]) / r[1]) ** 2 + ((p[2] - c[2]) / r[2]) ** 2 <= 1;

/** Distance from p to the segment a–b, and where along it (0..1) the nearest point lies. */
function along(p: Vec, a: Vec, b: Vec) {
  const ab: Vec = [b[0] - a[0], b[1] - a[1], b[2] - a[2]];
  const ap: Vec = [p[0] - a[0], p[1] - a[1], p[2] - a[2]];
  const len = ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2;
  const t = Math.min(1, Math.max(0, (ap[0] * ab[0] + ap[1] * ab[1] + ap[2] * ab[2]) / len));
  const d = Math.hypot(ap[0] - ab[0] * t, ap[1] - ab[1] * t, ap[2] - ab[2] * t);
  return { t, d };
}
const capsule = (a: Vec, b: Vec, r: number) => (p: Vec) => along(p, a, b).d <= r;
const cone = (base: Vec, tip: Vec, r: number) => (p: Vec) => {
  const { t, d } = along(p, base, tip);
  return d <= r * (1 - t) + 0.3;
};
const plain = (c: string) => () => c;
const mod = (n: number, m: number) => ((n % m) + m) % m;

// Mackerel: one-voxel stripes across the body every three cells, down from a dark line on the spine,
// leaving the belly plain.
const mackerel = (p: Vec) =>
  (p[1] > 8.5 && Math.abs(p[0]) <= 1) || (p[1] > 3 && mod(p[2], 3) === 0) ? STRIPE : FUR;
// The M on the forehead, four rows from its top, read left to right across x = -3..3.
const M = ["X.....X", "XX...XX", "X.X.X.X", "X..X..X"];
const tailTip = TAIL[TAIL.length - 1]!;

const skull = ellipsoid(SKULL, [7.5, 6.8, 6.8]);
const muzzle = ellipsoid([0, 10.5, 10.2], [3.4, 2.4, 2.2]);
const face = (p: Vec) => skull(p) || muzzle(p);
const headColor = (p: Vec) => {
  const [x, y, z] = p;
  const front = z > SKULL[2] + 1;
  const row = Math.round(EYE[1] + 5 - y);
  if (front && row >= 0 && row < M.length && M[row]![x + 3] === "X") return STRIPE;
  if (front && Math.abs(x) >= 5 && (y === EYE[1] - 0.5 || y === EYE[1] - 2.5)) return STRIPE;
  if (!front && y > EYE[1] + 3 && mod(x, 2) === 0) return STRIPE;
  return FUR;
};

// Earlier shapes win where solids overlap. Eyes and nose are clipped to the face, so they sit flush
// with it instead of poking out: big lime eyes with a dark pupil, and an inverted-triangle nose.
const SHAPES: Shape[] = [
  ...([-3, 3] as const).map((x): Shape => ({
    part: "eyes",
    inside: (p) => ellipsoid([x, EYE[1], EYE[2]], [1.7, 2.1, 2])(p) && skull(p),
    color: (p) => (p[0] === x && Math.abs(p[1] - EYE[1]) <= 1 ? DARK : LIME),
  })),
  {
    part: "head",
    inside: (p) =>
      (ellipsoid([0, 12, 12], [1.6, 0.5, 2])(p) || ellipsoid([0, 11, 12], [0.6, 0.5, 2])(p)) &&
      face(p),
    color: plain(PINK),
  },
  { part: "head", inside: muzzle, color: plain(CREAM) },
  ...([-1, 1] as const).map((s): Shape => ({
    part: "head",
    inside: cone([4.5 * s, 17.5, 3.5], [6.2 * s, 25, 3], 3.2),
    color: (p) =>
      p[1] > 23.5 ? DARK : p[2] >= 4.5 && Math.abs(p[0]) < 6 && p[1] < 23 ? PINK : STRIPE,
  })),
  { part: "head", inside: skull, color: headColor },
  // Short front legs stretched forward with cream paws, and one hind paw tucked against the -x flank.
  ...([-3, 3] as const).flatMap((x): Shape[] => [
    { part: "body", inside: ellipsoid([x, 1.3, 8], [1.7, 1.3, 1.8]), color: plain(CREAM) },
    {
      part: "body",
      inside: capsule([x, 2, 3], [x, 1.5, 7.5], 1.5),
      color: (p) => (mod(p[2], 3) === 1 ? STRIPE : FUR),
    },
  ]),
  { part: "body", inside: ellipsoid([-5.5, 1.2, -4], [1.5, 1.2, 2.2]), color: plain(CREAM) },
  {
    part: "body",
    inside: ellipsoid([0, 5, 1], [5, 4.5, 5]),
    color: (p) => (p[2] > 3 && Math.abs(p[0]) < 3 ? CREAM : mackerel(p)),
  },
  { part: "body", inside: ellipsoid([0, 5, -3.5], [5.5, 5, 6]), color: mackerel },
  { part: "body", inside: ellipsoid([0, 5, -7], [6, 5, 4.5]), color: mackerel },
  ...TAIL.slice(1).map((b, i): Shape => ({
    part: "tail",
    inside: capsule(TAIL[i]!, b, 1.3),
    color: (p) =>
      Math.hypot(p[0] - tailTip[0], p[1] - tailTip[1], p[2] - tailTip[2]) < 2
        ? DARK
        : Math.floor((p[0] + p[2] + 40) / 2) % 2
          ? STRIPE
          : FUR,
  })),
];

type Cell = { p: Vec; color: string };

/** Voxelizes SHAPES, keeping only cells with an empty neighbour (the inside is never seen). */
function voxelize() {
  const owner = new Map<string, { part: Part; color: string }>();
  const key = (x: number, y: number, z: number) => `${x},${y},${z}`;
  for (let x = -12; x <= 13; x++)
    for (let y = 0; y <= 26; y++)
      for (let z = -16; z <= 16; z++) {
        const p: Vec = [x, y, z];
        const shape = SHAPES.find((s) => s.inside(p));
        if (shape) owner.set(key(x, y, z), { part: shape.part, color: shape.color(p) });
      }
  const parts: Record<Part, Cell[]> = { body: [], head: [], eyes: [], tail: [] };
  const around: Vec[] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  for (const [k, cell] of owner) {
    const [x, y, z] = k.split(",").map(Number) as Vec;
    // The eyes sit in the head's surface, so the head cells behind them count as exposed too.
    const exposed = around.some(([dx, dy, dz]) => {
      const n = owner.get(key(x + dx, y + dy, z + dz));
      return !n || (n.part === "eyes") !== (cell.part === "eyes");
    });
    if (exposed) parts[cell.part].push({ p: [x, y, z], color: cell.color });
  }
  return parts;
}

const CUBE = new THREE.BoxGeometry(1, 1, 1);

/** One instanced mesh per part; each voxel is a scaled unit cube placed relative to `pivot`. */
function instanced(cells: Cell[], pivot: Vec, material: THREE.Material) {
  const mesh = new THREE.InstancedMesh(CUBE, material, cells.length);
  const m = new THREE.Matrix4();
  const c = new THREE.Color();
  cells.forEach(({ p, color }, i) => {
    m.makeScale(VOXEL, VOXEL, VOXEL).setPosition(
      (p[0] - pivot[0]) * VOXEL,
      (p[1] - pivot[1]) * VOXEL,
      (p[2] - pivot[2]) * VOXEL,
    );
    mesh.setMatrixAt(i, m);
    mesh.setColorAt(i, c.set(color));
  });
  return mesh;
}

/* ---------------------------------------------------------------------------------------------
 * The corner the cat lives in, on a coarser voxel grid than the cat (VOXEL each): a wooden floor
 * tile (its top at y = 0), a white desk with a drawer unit carrying a PC (monitor showing code, white
 * RGB keyboard and mouse; the white tower with RGB fans stands under the desk), a Raspberry Pi wired
 * to the monitor, a white Monster and a potted cactus; an office chair turned toward the visitor with
 * the cat lying on it; and an acoustic guitar on a stand, its back to the left edge by the Pi. Lime
 * is kept for the cat's eyes, the code, the cursor and the Pi's LED; the peripherals carry RGB.
 * ------------------------------------------------------------------------------------------- */

const DESK_TOP = 18;
const CHAIR = { x: 4, z: 4, seat: 10 };
// The kitten is drawn at half the scene's voxel size, lying on the seat with its rump to the backrest.
const CAT_SCALE = 0.5;
const CAT_AT: Vec = [CHAIR.x, CHAIR.seat + 0.5 + CAT_SCALE / 2, CHAIR.z + 0.5];
const CURSOR: Vec = [-8, DESK_TOP + 5, -19];
const LED: Vec = [-20, DESK_TOP + 1, -15];
// The can stands on the desk at this cell, drawn in half-size voxels like the kitten.
const CAN = { x: 9, z: -18 };
// The guitar's back plane and the middle of its width; it faces +x.
const GUITAR = { x: -22, z: 6 };
const SCREEN_BG = "#0f130d";
const CODE = [
  "ggg.wwwww.ww..",
  ".gg.www.ww....",
  ".ggggg.www.ww.",
  "..www.wwww....",
  "..............",
  "gg.wwww.www...",
  ".gg.ww.www....",
  "..............",
];
const DESK = "#e8eae3";
const DESK_SHADE = "#c9ccc4";
const SEAT = "#30343c";
const STEEL = "#b8bcc2";

function corner() {
  const solid = new Map<string, Cell>();
  const glow = new Map<string, Cell>();
  const key = (x: number, y: number, z: number) => `${x},${y},${z}`;
  const put = (x: number, y: number, z: number, color: string | null) => {
    if (color) solid.set(key(x, y, z), { p: [x, y, z], color });
  };
  const shine = (x: number, y: number, z: number, color: string) => {
    solid.delete(key(x, y, z));
    glow.set(key(x, y, z), { p: [x, y, z], color });
  };
  // RGB lights: their colour is animated by Corner, so only the cell is kept here.
  const rgb = new Map<string, Vec>();
  const light = (x: number, y: number, z: number) => {
    solid.delete(key(x, y, z));
    rgb.set(key(x, y, z), [x, y, z]);
  };
  const box = (
    [x0, x1]: [number, number],
    [y0, y1]: [number, number],
    [z0, z1]: [number, number],
    paint: string | ((x: number, y: number, z: number) => string | null),
  ) => {
    for (let x = x0; x < x1; x++)
      for (let y = y0; y < y1; y++)
        for (let z = z0; z < z1; z++)
          put(x, y, z, typeof paint === "string" ? paint : paint(x, y, z));
  };
  const disc = (
    cx: number,
    cz: number,
    r: number,
    [y0, y1]: [number, number],
    paint: (x: number, y: number, z: number, d: number) => string | null,
  ) => {
    for (let x = Math.floor(cx - r); x <= Math.ceil(cx + r); x++)
      for (let z = Math.floor(cz - r); z <= Math.ceil(cz + r); z++) {
        const d = Math.hypot(x - cx, z - cz);
        if (d <= r) for (let y = y0; y < y1; y++) put(x, y, z, paint(x, y, z, d));
      }
  };

  // Floor: planks running along x, four voxels wide, with staggered seams; dark wood on the sides.
  box([-24, 25], [-4, 0], [-24, 25], (x, y, z) => {
    if (y < -1) return "#3d3128";
    const row = Math.floor((z + 24) / 4);
    if ((x + 24 + row * 7) % 12 === 0) return "#4a3a2e";
    return row % 2 ? "#6b5443" : "#5e4a3b";
  });

  // White desk against the back: a top with a shaded edge, two legs on the left, a drawer unit on the
  // right with three drawers and graphite handles.
  const D = DESK_TOP;
  box([-22, 23], [D - 2, D], [-22, -8], (x, y, z) =>
    y === D - 2 || z === -9 || x === -22 || x === 22 ? DESK_SHADE : DESK,
  );
  for (const z of [-22, -10]) box([-22, -20], [0, D - 2], [z, z + 2], DESK_SHADE);
  box([13, 23], [0, D - 2], [-22, -9], (_x, y) => (y === 5 || y === 10 ? "#a9ada4" : DESK_SHADE));
  for (const y of [2, 7, 13]) box([16, 20], [y, y + 1], [-9, -8], "#3a3d42");

  // Raspberry Pi on the desk: green board, chip, USB block, GPIO header, and a cable to the monitor.
  box([-21, -13], [D, D + 1], [-20, -14], "#2f6b3a");
  box([-18, -16], [D + 1, D + 2], [-18, -16], "#16181a");
  box([-15, -13], [D + 1, D + 3], [-20, -18], STEEL);
  box([-20, -14], [D + 1, D + 2], [-20, -19], (x) => (x % 2 ? "#1a1a1a" : null));
  solid.delete(key(...LED));
  box([-13, -5], [D, D + 1], [-17, -16], "#26282c");

  // PC: a monitor on a stand (panel two voxels thick so the glow has a back); a white keyboard whose
  // keys sit in RGB light; a white mouse with an RGB glow at the back; and a white tower under the left
  // end of the desk with three RGB fans on its front.
  box([-6, 1], [D, D + 1], [-22, -18], "#26282c");
  box([-3, -1], [D + 1, D + 4], [-21, -20], "#26282c");
  box([-10, 6], [D + 4, D + 14], [-20, -18], "#2a2c31");
  CODE.forEach((row, i) =>
    [...row].forEach((ch, j) => {
      const at: Vec = [-9 + j, D + 12 - i, -19];
      // The cursor's cell is left empty; its own mesh blinks there.
      if (at[0] === CURSOR[0] && at[1] === CURSOR[1]) solid.delete(key(...at));
      else shine(...at, ch === "g" ? LIME : ch === "w" ? "#a7ad9c" : SCREEN_BG);
    }),
  );
  box([-9, 4], [D, D + 1], [-15, -11], DESK);
  for (let x = -9; x < 4; x++)
    for (let z = -15; z < -11; z++) {
      if ((x + z) % 2 === 0) put(x, D + 1, z, "#f5f6f2");
      else light(x, D + 1, z);
    }
  box([6, 8], [D, D + 1], [-14, -11], DESK);
  box([6, 8], [D + 1, D + 2], [-14, -12], DESK);
  for (const x of [6, 7]) light(x, D, -11);
  box([-18, -12], [0, 14], [-20, -9], (x, y) =>
    x === -18 || x === -13 || y === 0 ? DESK_SHADE : DESK,
  );
  for (const y0 of [1, 5, 9])
    for (let x = -17; x < -13; x++)
      for (let y = y0; y < y0 + 4; y++) {
        const ring = x === -17 || x === -14 || y === y0 || y === y0 + 3;
        if (ring) light(x, y, -10);
        else put(x, y, -10, "#2a2c31");
      }
  put(-13, 12, -10, STEEL);

  // Potted cactus at the right end of the desk: terracotta pot with soil, a ribbed column with two
  // arms turned upward, a few pale spines and a pink flower on top.
  disc(16, -16, 2.6, [D, D + 4], (_x, y, _z, d) =>
    y === D + 3 ? (d < 1.8 ? "#3b2a20" : "#874c35") : "#9a5a40",
  );
  const cactus = (x: number, _y: number, z: number) => ((x + z) % 2 === 0 ? "#5f9e57" : "#4f8a4b");
  box([15, 18], [D + 4, D + 14], [-17, -14], cactus);
  box([18, 20], [D + 7, D + 12], [-16, -14], cactus);
  box([13, 15], [D + 6, D + 11], [-16, -14], cactus);
  for (const [x, y] of [
    [15, D + 6],
    [17, D + 9],
    [16, D + 12],
    [19, D + 10],
    [13, D + 9],
  ] as const)
    put(x, y, -14, "#e8eae3");
  put(16, D + 14, -16, "#f2c94c");
  for (const [x, z] of [
    [15, -16],
    [17, -16],
    [16, -17],
    [16, -15],
  ] as const)
    put(x, D + 14, z, "#e58fb1");

  // Office chair turned toward the visitor: five-star base on wheels, gas lift, seat, backrest, arms.
  const { x: cx, z: cz, seat } = CHAIR;
  box([cx - 5, cx + 6], [1, 2], [cz, cz + 1], "#26282c");
  box([cx, cx + 1], [1, 2], [cz - 5, cz + 6], "#26282c");
  for (const [x, z] of [
    [cx - 5, cz],
    [cx + 5, cz],
    [cx, cz - 5],
    [cx, cz + 5],
  ] as const)
    put(x, 0, z, "#121315");
  box([cx - 1, cx + 1], [2, seat - 1], [cz - 1, cz + 1], STEEL);
  box([cx - 6, cx + 7], [seat - 1, seat + 1], [cz - 6, cz + 7], (_x, y) =>
    y === seat ? "#3a3f48" : SEAT,
  );
  box([cx - 6, cx + 7], [seat + 1, seat + 15], [cz - 7, cz - 5], (x, y) =>
    y === seat + 14 && (x === cx - 6 || x === cx + 6) ? null : SEAT,
  );
  for (const x of [cx - 7, cx + 7]) {
    box([x, x + 1], [seat + 1, seat + 4], [cz - 1, cz], "#26282c");
    box([x, x + 1], [seat + 4, seat + 5], [cz - 4, cz + 4], "#26282c");
  }

  // Acoustic guitar on a floor stand by the left edge, its back to the Pi's side and facing +x: a
  // figure-eight body with a spruce top, dark binding, sound hole and bridge, dark sides and back; a
  // neck with frets, and a headstock with tuning pegs. Drawn across its width (u), up (y) and out of
  // its top (w), then turned to face +x.
  const guitar = (u: number, y: number, w: number, color: string) =>
    put(GUITAR.x + w, y, GUITAR.z - u, color);
  for (const u of [-4, 4])
    for (let w = -2; w < 4; w++) for (const y of [0, 1]) guitar(u, y, w, "#26282c");
  for (let u = -4; u <= 4; u++) guitar(u, 1, 3, "#26282c");
  const body = (u: number, y: number) =>
    (u / 4.4) ** 2 + ((y - 5.5) / 4.2) ** 2 <= 1 || (u / 3.4) ** 2 + ((y - 11.5) / 3.1) ** 2 <= 1;
  for (let u = -5; u <= 5; u++)
    for (let y = 1; y <= 15; y++) {
      if (!body(u, y)) continue;
      const edge = !body(u - 1, y) || !body(u + 1, y) || !body(u, y - 1) || !body(u, y + 1);
      const top =
        Math.hypot(u, y - 10) < 1.4
          ? "#1a1410"
          : y === 4 && Math.abs(u) <= 2
            ? "#3a2618"
            : edge
              ? "#7a4a2a"
              : "#d9a35c";
      for (let w = 0; w < 3; w++) guitar(u, 1 + y, w, w === 2 ? top : "#7a4a2a");
    }
  for (let u = -1; u <= 1; u++)
    for (let y = 16; y < 28; y++) {
      guitar(u, y, 1, "#5a3a22");
      guitar(u, y, 2, y % 3 === 0 ? "#5c4a36" : "#2a1d14");
    }
  for (let u = -1; u <= 1; u++) for (let y = 28; y < 32; y++) guitar(u, y, 1, "#3a2618");
  for (const u of [-2, 2]) for (const y of [29, 30, 31]) guitar(u, y, 1, "#c9ccc4");

  // Keep only cells something can see.
  const around: Vec[] = [
    [1, 0, 0],
    [-1, 0, 0],
    [0, 1, 0],
    [0, -1, 0],
    [0, 0, 1],
    [0, 0, -1],
  ];
  const filled = (x: number, y: number, z: number) =>
    solid.has(key(x, y, z)) || glow.has(key(x, y, z)) || rgb.has(key(x, y, z));
  const visible = [...solid.values()].filter(({ p }) =>
    around.some(([dx, dy, dz]) => !filled(p[0] + dx, p[1] + dy, p[2] + dz)),
  );
  return { solid: visible, glow: [...glow.values()], rgb: [...rgb.values()] };
}

/**
 * A white Monster (Ultra), in half-size voxels so the claw mark fits: a tall white can with silver
 * rims and ring pull, a black band low on the front, and the claw as three metallic-grey scratches on
 * the columns facing the visitor, the middle one set higher.
 */
function monster() {
  const cells: Cell[] = [];
  for (let x = -2; x <= 2; x++)
    for (let z = -2; z <= 2; z++) {
      if (Math.hypot(x, z) > 2.3) continue;
      const scratch = (x === 0 && z === 2) || (Math.abs(x) === 2 && z === 1);
      const front = z >= 1;
      for (let y = 0; y <= 13; y++) {
        const color =
          y === 0 || y >= 12
            ? STEEL
            : scratch && (x === 0 ? y >= 4 && y <= 10 : y >= 3 && y <= 8)
              ? "#7d838a"
              : front && y === 2
                ? "#2a2c30"
                : "#f2f3ef";
        cells.push({ p: [x, y, z], color });
      }
    }
  cells.push({ p: [0, 14, 0], color: "#9aa0a6" });
  return cells;
}

/** A soft round shadow under the floor tile, so it floats on the page without a visible edge. */
function shadowTexture() {
  const size = 128;
  const canvas = document.createElement("canvas");
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(0,0,0,0.6)");
  g.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return new THREE.CanvasTexture(canvas);
}

type Motion = { live: boolean; still: boolean };
type Drag = { angle: number; active: boolean };

/** A clock advanced only by rendered frames, so nothing jumps when the hero comes back on screen. */
function useTicks(still: boolean, tick: (t: number, dt: number) => void) {
  const time = useRef(0);
  useFrame((state, delta) => {
    const dt = still ? 0 : Math.min(delta, 0.1);
    time.current += dt;
    tick(time.current, dt);
  });
}

const disposeAll = (meshes: THREE.Mesh[]) => () => {
  for (const mesh of meshes) {
    if (mesh instanceof THREE.InstancedMesh) mesh.dispose();
    const material = mesh.material as THREE.MeshBasicMaterial;
    material.map?.dispose();
    material.dispose();
  }
};

function Cat({ still }: { still: boolean }) {
  const parts = useMemo(() => {
    const cells = voxelize();
    const fur = new THREE.MeshStandardMaterial({ roughness: 0.85, flatShading: true });
    // Unlit and not tone-mapped, so the eyes stay exactly the site's lime from every angle.
    const glow = new THREE.MeshBasicMaterial({ toneMapped: false });
    return {
      body: instanced(cells.body, [0, 0, 0], fur),
      head: instanced(cells.head, NECK, fur),
      eyes: instanced(cells.eyes, EYE, glow),
      tail: instanced(cells.tail, TAIL[0]!, fur),
    };
  }, []);
  useEffect(() => disposeAll([parts.body, parts.head, parts.eyes, parts.tail]), [parts]);

  const head = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  useTicks(still, (t) => {
    if (head.current)
      head.current.rotation.set(Math.sin(t * 0.45) * 0.04, 0, Math.sin(t * 0.6) * 0.05);
    if (tail.current) tail.current.rotation.y = Math.sin(t * 1.6) * 0.18;
    if (eyes.current) eyes.current.scale.y = t % 4.5 > 4.35 ? 0.15 : 1;
  });

  const at = (p: Vec, from: Vec = [0, 0, 0]): Vec => [
    (p[0] - from[0]) * VOXEL,
    (p[1] - from[1]) * VOXEL,
    (p[2] - from[2]) * VOXEL,
  ];
  return (
    <group position={at(CAT_AT)} scale={CAT_SCALE}>
      <primitive object={parts.body} />
      <group ref={head} position={at(NECK)}>
        <primitive object={parts.head} />
        <group ref={eyes} position={at(EYE, NECK)}>
          <primitive object={parts.eyes} />
        </group>
      </group>
      <group ref={tail} position={at(TAIL[0]!)}>
        <primitive object={parts.tail} />
      </group>
    </group>
  );
}

function Corner({ still }: { still: boolean }) {
  const parts = useMemo(() => {
    const cells = corner();
    const blink = (p: Vec) => {
      const mesh = new THREE.Mesh(
        CUBE,
        new THREE.MeshBasicMaterial({ color: LIME, toneMapped: false }),
      );
      mesh.position.set(p[0] * VOXEL, p[1] * VOXEL, p[2] * VOXEL);
      mesh.scale.setScalar(VOXEL);
      return mesh;
    };
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1),
      new THREE.MeshBasicMaterial({ map: shadowTexture(), transparent: true, depthWrite: false }),
    );
    return {
      solid: instanced(
        cells.solid,
        [0, 0, 0],
        new THREE.MeshStandardMaterial({ roughness: 0.85, flatShading: true }),
      ),
      glow: instanced(cells.glow, [0, 0, 0], new THREE.MeshBasicMaterial({ toneMapped: false })),
      can: instanced(
        monster(),
        [0, 0, 0],
        new THREE.MeshStandardMaterial({ roughness: 0.5, flatShading: true }),
      ),
      rgb: Object.assign(
        instanced(
          cells.rgb.map((p) => ({ p, color: "#ffffff" })),
          [0, 0, 0],
          new THREE.MeshBasicMaterial({ toneMapped: false }),
        ),
        { userData: { cells: cells.rgb } },
      ),
      cursor: blink(CURSOR),
      led: blink(LED),
      shadow,
    };
  }, []);
  useEffect(() => {
    const dispose = disposeAll(Object.values(parts));
    return () => {
      dispose();
      parts.shadow.geometry.dispose();
    };
  }, [parts]);

  // RGB: a rainbow that drifts across the keyboard, mouse and fans; it holds still under reduced motion.
  const color = useRef(new THREE.Color());
  const painted = useRef(false);
  useTicks(still, (t) => {
    (parts.cursor.material as THREE.MeshBasicMaterial).color.set(t % 1 < 0.55 ? LIME : SCREEN_BG);
    (parts.led.material as THREE.MeshBasicMaterial).color.set(
      (t * 1.7) % 1 < 0.25 ? "#1d3a12" : LIME,
    );
    if (still && painted.current) return;
    (parts.rgb.userData.cells as Vec[]).forEach(([x, y, z], i) => {
      const hue = mod(t * 0.15 - (x + z + y * 0.5) * 0.03, 1);
      parts.rgb.setColorAt(i, color.current.setHSL(hue, 0.9, 0.55));
    });
    if (parts.rgb.instanceColor) parts.rgb.instanceColor.needsUpdate = true;
    painted.current = true;
  });

  return (
    <group>
      <primitive
        object={parts.shadow}
        rotation-x={-Math.PI / 2}
        position={[0, -4.6 * VOXEL, 0]}
        scale={8.5}
      />
      <primitive object={parts.solid} />
      <primitive object={parts.glow} />
      <primitive object={parts.cursor} />
      <primitive object={parts.led} />
      <primitive object={parts.rgb} />
      <primitive
        object={parts.can}
        position={[CAN.x * VOXEL, (DESK_TOP - 0.25) * VOXEL, CAN.z * VOXEL]}
        scale={0.5}
      />
    </group>
  );
}

// The camera circles the scene at a fixed height; it swings in from behind on load, then drifts.
// Framed for a square canvas.
const TARGET = new THREE.Vector3(0, 0.75, -0.3);
const RADIUS = 12.5;
const HEIGHT = 8.5;
const REST = 0.5;
const INTRO = 2;
const SPIN = 0.15;

function Rig({ still, drag }: { still: boolean; drag: React.RefObject<Drag> }) {
  const spin = useRef(0);
  const camera = useThree((s) => s.camera);
  useTicks(still, (t, dt) => {
    const d = drag.current;
    if (!d.active && t > INTRO) spin.current += dt * SPIN;
    // easeOutCirc from a quarter-turn-and-more behind the resting angle.
    const intro = still ? 1 : Math.min(1, t / INTRO);
    const swing = (1 - Math.sqrt(1 - (intro - 1) ** 2)) * -2.2;
    const angle = REST + swing + spin.current + d.angle;
    camera.position.set(Math.sin(angle) * RADIUS, HEIGHT, Math.cos(angle) * RADIUS);
    camera.lookAt(TARGET);
  });
  return null;
}

function Ready({ onReady }: { onReady: () => void }) {
  useEffect(onReady, [onReady]);
  return null;
}

export default function VoxelCat({ live, still, onReady }: Motion & { onReady: () => void }) {
  // Mouse drag turns the scene; touch is ignored so a swipe over it still scrolls the page.
  const drag = useRef<Drag>({ angle: 0, active: false });
  const invalidate = useRef<() => void>(() => {});
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || e.button !== 0) return;
    e.preventDefault();
    const d = drag.current;
    d.active = true;
    let x = e.clientX;
    const move = (ev: PointerEvent) => {
      d.angle -= (ev.clientX - x) * 0.008;
      x = ev.clientX;
      invalidate.current();
    };
    const up = () => {
      d.active = false;
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
  };

  return (
    <div className="h-full w-full" onPointerDown={onPointerDown} data-hover>
      <Canvas
        frameloop={live && !still ? "always" : "demand"}
        dpr={[1, 1.5]}
        camera={{ position: [0, HEIGHT, RADIUS], fov: 30 }}
        gl={{ antialias: true, alpha: true, powerPreference: "low-power" }}
        // Layout size, not the transformed box: the card scales in from 0.9, and measuring then left the
        // canvas at 90% resolution. No scroll listener either; the card only changes size on resize.
        resize={{ offsetSize: true, scroll: false }}
        onCreated={(s) => {
          invalidate.current = s.invalidate;
        }}
        style={{ pointerEvents: "none" }}
      >
        <hemisphereLight args={["#f4f4ee", "#24272d", 1.6]} />
        <directionalLight position={[4, 8, 6]} intensity={2} />
        {/* The camera circles, so the back gets a neutral fill and only a faint lime rim. */}
        <directionalLight position={[2, 6, -8]} intensity={1.2} />
        <directionalLight position={[-6, 3, -4]} color={LIME} intensity={0.35} />
        <Corner still={still} />
        <Cat still={still} />
        <Rig still={still} drag={drag} />
        <Ready onReady={onReady} />
      </Canvas>
    </div>
  );
}
