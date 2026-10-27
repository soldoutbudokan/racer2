// Solves ideal lines off the page's thread for the menu's warm-up
// (main.js warmIdealLines). It runs the same solver on the same numbers, so
// the page keeps each result exactly as if it had solved the line itself.
// The frames arrive as five floats each: position x, y, z and left x, z,
// which is all the solver reads of them.
import { Vector3 } from 'three';
import { solveIdealLine } from './idealLine.js';
import { CAR_SPECS } from './carSpecs.js';

self.onmessage = ({ data: { points, width, specIds } }) => {
  const frames = [];
  for (let o = 0; o < points.length; o += 5) {
    frames.push({
      pos: new Vector3(points[o], points[o + 1], points[o + 2]),
      left: { x: points[o + 3], z: points[o + 4] },
    });
  }
  for (const specId of specIds) {
    // The limits hold functions, which cannot cross to the page; it rebuilds
    // them from the spec (adoptIdealLine).
    const { limits, ...line } = solveIdealLine(frames, width, CAR_SPECS[specId]);
    self.postMessage({ specId, line });
  }
};
