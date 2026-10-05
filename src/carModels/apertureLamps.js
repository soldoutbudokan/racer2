import * as THREE from 'three';
import { buildGreenhouseShell, buildWindowSeals, buildPaneWells, sampleSkin } from './loftBuilder.js';
import { makeWell, makeTrim, makeSatin, makeHeadlight, makeLens } from './carMaterials.js';

// ---------------------------------------------------------------------------
// Lamps IN the bodywork. Each lamp is a flank pane the loft has already cut
// out of the painted shell (the archetype lists it in its PANES), and this
// furnishes the hole: a dark housing (floor + walls) behind it, the lit
// elements laid on the housing floor so they follow the fender corner exactly
// as the opening does, a slim gasket round the rim, and — for a headlamp — a
// clear lens flush with the paint.
//
// A headlamp gets a satin reflector plate, a DRL blade along the top edge of
// the opening, an amber tip and projector buttons in its side-facing part. A
// tail lamp is simpler and deliberately has NO lens or reflector: a clear lens
// over a red element mirrors the sky and reads as a white patch from the
// chase camera, which is exactly the view every AI car is seen from. Its red
// blade is returned as bare geometry for the caller to bake into the one
// pulsed brake mesh (car.js mutates that material every frame).
// ---------------------------------------------------------------------------

const _z = new THREE.Vector3(0, 0, 1);

function strip(keys, panes, lo, hi, proud) {
  return buildGreenhouseShell(keys, {
    panes: panes.map((p) => ({ ...p, beltFrac: lo, topFrac: hi, proud })),
  });
}

/**
 * @param keys   the archetype's key stations
 * @param F      profileFractions(keys)
 * @param opts   { head: panes, tail: panes, depth, projectorZ: [z, ...] }
 *               Every pane must be a FLANK pane (topFrac < 1) with a `side`.
 * @returns { group, tailBlade }  tailBlade: BufferGeometry or null
 */
export function buildApertureLamps(keys, F, { head = [], tail = [], depth = 0.034, projectorZ = [] } = {}) {
  const g = new THREE.Group();
  const col = F.beltTuck - F.shoulder;      // one profile column, as a fraction
  const all = [...head, ...tail];
  if (!all.length) return { group: g, tailBlade: null };

  const wells = buildPaneWells(keys, { panes: all, depth });
  if (wells) g.add(new THREE.Mesh(wells, makeWell()));
  const gaskets = buildWindowSeals(keys, { panes: all, width: 0.011, proud: 0.004 });
  if (gaskets) g.add(new THREE.Mesh(gaskets, makeTrim()));

  if (head.length) {
    const belt = head[0].beltFrac, top = head[0].topFrac;
    const plate = strip(keys, head, belt + col * 0.5, top - col * 0.5, -(depth - 0.008));
    if (plate) g.add(new THREE.Mesh(plate, makeSatin()));
    // DRL blade along the top edge of the opening — the element that reads at
    // race distance is a bright SHAPE along the fender edge, not brightness.
    const blade = strip(keys, head, top - col * 1.7, top - col * 0.7, -(depth - 0.020));
    if (blade) g.add(new THREE.Mesh(blade, makeHeadlight()));
    for (const pane of head) {
      const sx = pane.side;
      for (const z of projectorZ) {
        const { position, normal } = sampleSkin(keys, z, sx * (belt + col * 1.4));
        const dish = new THREE.Mesh(new THREE.CylinderGeometry(0.030, 0.030, 0.010, 16), makeSatin());
        dish.geometry.rotateX(Math.PI / 2);
        dish.quaternion.setFromUnitVectors(_z, normal);
        dish.position.copy(position).addScaledVector(normal, -(depth - 0.012));
        g.add(dish);
        const bulb = new THREE.Mesh(new THREE.CylinderGeometry(0.018, 0.018, 0.012, 12), makeHeadlight());
        bulb.geometry.rotateX(Math.PI / 2);
        bulb.quaternion.copy(dish.quaternion);
        bulb.position.copy(position).addScaledVector(normal, -(depth - 0.020));
        g.add(bulb);
      }
    }
    const lens = strip(keys, head, belt, top, 0.003);
    if (lens) {
      const m = new THREE.Mesh(lens, makeLens());
      m.userData.noMerge = true;
      g.add(m);
    }
  }

  let tailBlade = null;
  if (tail.length) {
    const belt = tail[0].beltFrac, top = tail[0].topFrac;
    tailBlade = strip(keys, tail, belt + col * 0.6, top - col * 0.6, -(depth - 0.024));
  }
  return { group: g, tailBlade };
}
