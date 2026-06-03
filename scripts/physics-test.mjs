// Deterministic driving test: freeze the render loop and step the physics
// directly so render speed can't skew sim time. Proves the car settles,
// accelerates under engine force, steers, and brakes.
import { chromium } from 'playwright-core';
const EXE = process.env.HOME + '/Library/Caches/ms-playwright/chromium-1208/chrome-mac-arm64/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing';
const b = await chromium.launch({ executablePath: EXE, headless: true, args: ['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader'] });
const page = await b.newPage({ viewport: { width: 640, height: 480 } });
const errs=[]; page.on('pageerror',e=>errs.push(e.message)); page.on('console',m=>{if(m.type()==='error')errs.push(m.text());});
await page.goto('http://localhost:5173/', { waitUntil: 'load' });
await page.waitForFunction(() => !!window.__ctx, { timeout: 20000 });

let pass=0, fail=0;
const ck=(n,ok,d='')=>{console.log(`${ok?'PASS':'FAIL'}  ${n}${d?'  — '+d:''}`); ok?pass++:fail++;};

async function run(mode){
  await page.waitForSelector(`button.mode[data-mode="${mode}"]`);
  await page.evaluate((mode) => document.querySelector(`button.mode[data-mode="${mode}"]`).click(), mode);
  await page.waitForTimeout(800);
  return page.evaluate((mode) => {
    const ctx = window.__ctx;
    ctx.mode = null;                         // stop rAF tick from also stepping
    const world = ctx.world;
    const cars = ctx.cars.map(c=>c.car);
    const me = cars[0];
    const step = (n)=>{ for(let i=0;i<n;i++){ world.step(1/120); for(const c of cars) c.update(); } };
    const speed = (c)=>Math.hypot(c.body.velocity.x,c.body.velocity.z)*3.6;
    const yawOf = (c)=>{const q=c.body.quaternion;return Math.atan2(2*(q.x*q.z+q.w*q.y),1-2*(q.x*q.x+q.y*q.y));};
    const flat=(p)=>({x:p.x,z:p.z});
    const D=(a,b)=>Math.hypot(a.x-b.x,a.z-b.z);

    // settle
    step(360);
    let contacts = 0;
    for(let i=0;i<20;i++){ world.step(1/120); for(const c of cars) c.update();
      contacts = Math.max(contacts, me.vehicle.wheelInfos.filter(w=>w.isInContact).length); }
    const p0 = flat(me.body.position);

    // AI cars: let their own driver command them from the fresh grid.
    const aiStart = cars.slice(1).map(c=>flat(c.body.position));
    for(let i=0;i<420;i++){
      for(const c of ctx.cars){ if(c.ai){ const cmd=c.ai.update(c.car); const v=c.car.vehicle;
        v.applyEngineForce(-2000*(cmd.throttle||0),2); v.applyEngineForce(-2000*(cmd.throttle||0),3);
        v.setSteeringValue(-(cmd.steer||0)*0.5,0); v.setSteeringValue(-(cmd.steer||0)*0.5,1);
      }}
      world.step(1/120); for(const c of cars) c.update();
    }
    const aiMoved = cars.slice(1).map((c,i)=>D(flat(c.body.position),aiStart[i]));

    // accelerate (mirror applyDriving: negative engine force on rear wheels)
    for(let i=0;i<700;i++){
      me.vehicle.applyEngineForce(-2200,2); me.vehicle.applyEngineForce(-2200,3);
      me.vehicle.setBrake(0.4,0); me.vehicle.setBrake(0.4,1); me.vehicle.setBrake(0.4,2); me.vehicle.setBrake(0.4,3);
      world.step(1/120); for(const c of cars) c.update();
    }
    const accelKmh = speed(me);
    const p1 = flat(me.body.position);
    const yaw1 = yawOf(me);

    // steer right under power
    for(let i=0;i<240;i++){
      me.vehicle.applyEngineForce(-1800,2); me.vehicle.applyEngineForce(-1800,3);
      me.vehicle.setSteeringValue(-0.5,0); me.vehicle.setSteeringValue(-0.5,1);
      world.step(1/120); for(const c of cars) c.update();
    }
    let dyaw = Math.abs(yawOf(me)-yaw1); if(dyaw>Math.PI) dyaw=2*Math.PI-dyaw;
    me.vehicle.setSteeringValue(0,0); me.vehicle.setSteeringValue(0,1);

    // brake hard
    const beforeBrake = speed(me);
    for(let i=0;i<260;i++){
      me.vehicle.applyEngineForce(0,2); me.vehicle.applyEngineForce(0,3);
      me.vehicle.setBrake(50,0); me.vehicle.setBrake(50,1); me.vehicle.setBrake(50,2); me.vehicle.setBrake(50,3);
      world.step(1/120); for(const c of cars) c.update();
    }
    const afterBrake = speed(me);

    return { mode, nCars:cars.length, contacts, settleY:+me.body.position.y.toFixed(2),
      accelKmh:+accelKmh.toFixed(1), accelDist:+D(p0,p1).toFixed(1),
      steerDeg:+(dyaw*180/Math.PI).toFixed(1),
      brake:`${beforeBrake.toFixed(0)}->${afterBrake.toFixed(0)}`,
      aiMoved: aiMoved.map(x=>+x.toFixed(0)) };
  }, mode);
}

const tt = await run('time-trial');
console.log('time-trial:', JSON.stringify(tt));
ck('car settles on the track (not falling through)', tt.settleY>0.3 && tt.settleY<1.6, `y=${tt.settleY}`);
ck('accelerates under power', tt.accelKmh>40, `${tt.accelKmh} km/h`);
ck('travels a meaningful distance', tt.accelDist>30, `${tt.accelDist} m`);
ck('steering turns the car', tt.steerDeg>10, `${tt.steerDeg} deg`);
ck('braking sheds speed', (()=>{const[a,c]=tt.brake.split('->').map(Number);return c<a-15;})(), `${tt.brake} km/h`);

const qr = await run('quick-race');
console.log('quick-race:', JSON.stringify(qr));
ck('quick-race spawns 4 cars', qr.nCars===4, `${qr.nCars}`);
ck('AI cars drive themselves', qr.aiMoved.every(d=>d>10), 'moved='+qr.aiMoved.join(','));

ck('no console errors', errs.length===0, errs.slice(0,3).join(' | ')||'clean');
console.log(`\n${pass} passed, ${fail} failed`);
await b.close(); process.exit(fail?1:0);
