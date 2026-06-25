(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ja="160",_d=0,Sc=1,Md=2,Bh=1,kh=2,Fn=3,ei=0,Ye=1,be=2,zn=0,ts=1,Pa=2,bc=3,Ec=4,wd=5,pi=100,Sd=101,bd=102,Tc=103,Ac=104,Ed=200,Td=201,Ad=202,Cd=203,La=204,Ia=205,Rd=206,Pd=207,Ld=208,Id=209,Dd=210,Nd=211,Ud=212,Fd=213,Od=214,zd=0,Bd=1,kd=2,so=3,Gd=4,Hd=5,Wd=6,Vd=7,Gh=0,Xd=1,qd=2,$n=0,Hh=1,Wh=2,Vh=3,Ka=4,Yd=5,Xh=6,qh=300,is=301,ss=302,Da=303,Na=304,fo=306,Ee=1e3,pn=1001,Ua=1002,Ue=1003,Cc=1004,Ro=1005,Ke=1006,jd=1007,rs=1008,ti=1009,Kd=1010,Zd=1011,Za=1012,Yh=1013,Zn=1014,Jn=1015,vn=1016,jh=1017,Kh=1018,vi=1020,Jd=1021,mn=1023,Qd=1024,$d=1025,xi=1026,os=1027,tf=1028,Zh=1029,ef=1030,Jh=1031,Qh=1033,Po=33776,Lo=33777,Io=33778,Do=33779,Rc=35840,Pc=35841,Lc=35842,Ic=35843,$h=36196,Dc=37492,Nc=37496,Uc=37808,Fc=37809,Oc=37810,zc=37811,Bc=37812,kc=37813,Gc=37814,Hc=37815,Wc=37816,Vc=37817,Xc=37818,qc=37819,Yc=37820,jc=37821,No=36492,Kc=36494,Zc=36495,nf=36283,Jc=36284,Qc=36285,$c=36286,tu=3e3,yi=3001,sf=3200,rf=3201,eu=0,of=1,ln="",Qt="srgb",kn="srgb-linear",Ja="display-p3",po="display-p3-linear",ro="linear",ue="srgb",oo="rec709",ao="p3",Ei=7680,tl=519,af=512,cf=513,lf=514,nu=515,hf=516,uf=517,df=518,ff=519,Fa=35044,pf=35048,el="300 es",Oa=1035,On=2e3,co=2001;class ls{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Be=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let nl=1234567;const Ds=Math.PI/180,ks=180/Math.PI;function bn(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Be[s&255]+Be[s>>8&255]+Be[s>>16&255]+Be[s>>24&255]+"-"+Be[t&255]+Be[t>>8&255]+"-"+Be[t>>16&15|64]+Be[t>>24&255]+"-"+Be[e&63|128]+Be[e>>8&255]+"-"+Be[e>>16&255]+Be[e>>24&255]+Be[n&255]+Be[n>>8&255]+Be[n>>16&255]+Be[n>>24&255]).toLowerCase()}function Le(s,t,e){return Math.max(t,Math.min(e,s))}function Qa(s,t){return(s%t+t)%t}function mf(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function gf(s,t,e){return s!==t?(e-s)/(t-s):0}function Ns(s,t,e){return(1-e)*s+e*t}function vf(s,t,e,n){return Ns(s,t,1-Math.exp(-e*n))}function xf(s,t=1){return t-Math.abs(Qa(s,t*2)-t)}function yf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function _f(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Mf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function wf(s,t){return s+Math.random()*(t-s)}function Sf(s){return s*(.5-Math.random())}function bf(s){s!==void 0&&(nl=s);let t=nl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Ef(s){return s*Ds}function Tf(s){return s*ks}function za(s){return(s&s-1)===0&&s!==0}function Af(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function lo(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Cf(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),u=r((t-n)/2),d=o((t-n)/2),f=r((n-t)/2),p=o((n-t)/2);switch(i){case"XYX":s.set(a*h,c*u,c*d,a*l);break;case"YZY":s.set(c*d,a*h,c*u,a*l);break;case"ZXZ":s.set(c*u,c*d,a*h,a*l);break;case"XZX":s.set(a*h,c*p,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*p,a*l);break;case"ZYZ":s.set(c*p,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Sn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function re(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const qe={DEG2RAD:Ds,RAD2DEG:ks,generateUUID:bn,clamp:Le,euclideanModulo:Qa,mapLinear:mf,inverseLerp:gf,lerp:Ns,damp:vf,pingpong:xf,smoothstep:yf,smootherstep:_f,randInt:Mf,randFloat:wf,randFloatSpread:Sf,seededRandom:bf,degToRad:Ef,radToDeg:Tf,isPowerOfTwo:za,ceilPowerOfTwo:Af,floorPowerOfTwo:lo,setQuaternionFromProperEuler:Cf,normalize:re,denormalize:Sn};class et{constructor(t=0,e=0){et.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Zt{constructor(t,e,n,i,r,o,a,c,l){Zt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],u=n[7],d=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],x=i[1],y=i[4],_=i[7],M=i[2],S=i[5],b=i[8];return r[0]=o*v+a*x+c*M,r[3]=o*g+a*y+c*S,r[6]=o*m+a*_+c*b,r[1]=l*v+h*x+u*M,r[4]=l*g+h*y+u*S,r[7]=l*m+h*_+u*b,r[2]=d*v+f*x+p*M,r[5]=d*g+f*y+p*S,r[8]=d*m+f*_+p*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=h*o-a*l,d=a*c-h*r,f=l*r-o*c,p=e*u+n*d+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=u*v,t[1]=(i*l-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=d*v,t[4]=(h*e-i*c)*v,t[5]=(i*r-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Uo.makeScale(t,e)),this}rotate(t){return this.premultiply(Uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new Zt;function iu(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function ho(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Rf(){const s=ho("canvas");return s.style.display="block",s}const il={};function Us(s){s in il||(il[s]=!0,console.warn(s))}const sl=new Zt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),rl=new Zt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Qs={[kn]:{transfer:ro,primaries:oo,toReference:s=>s,fromReference:s=>s},[Qt]:{transfer:ue,primaries:oo,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[po]:{transfer:ro,primaries:ao,toReference:s=>s.applyMatrix3(rl),fromReference:s=>s.applyMatrix3(sl)},[Ja]:{transfer:ue,primaries:ao,toReference:s=>s.convertSRGBToLinear().applyMatrix3(rl),fromReference:s=>s.applyMatrix3(sl).convertLinearToSRGB()}},Pf=new Set([kn,po]),se={enabled:!0,_workingColorSpace:kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Pf.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Qs[t].toReference,i=Qs[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Qs[s].primaries},getTransfer:function(s){return s===ln?ro:Qs[s].transfer}};function es(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Fo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ti;class su{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ti===void 0&&(Ti=ho("canvas")),Ti.width=t.width,Ti.height=t.height;const n=Ti.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ti}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=ho("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=es(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(es(e[n]/255)*255):e[n]=es(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Lf=0;class ru{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Lf++}),this.uuid=bn(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Oo(i[o].image)):r.push(Oo(i[o]))}else r=Oo(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Oo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?su.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let If=0;class Ge extends ls{constructor(t=Ge.DEFAULT_IMAGE,e=Ge.DEFAULT_MAPPING,n=pn,i=pn,r=Ke,o=rs,a=mn,c=ti,l=Ge.DEFAULT_ANISOTROPY,h=ln){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=bn(),this.name="",this.source=new ru(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new et(0,0),this.repeat=new et(1,1),this.center=new et(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Zt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===yi?Qt:ln),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==qh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Ee:t.x=t.x-Math.floor(t.x);break;case pn:t.x=t.x<0?0:1;break;case Ua:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Ee:t.y=t.y-Math.floor(t.y);break;case pn:t.y=t.y<0?0:1;break;case Ua:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Qt?yi:tu}set encoding(t){Us("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===yi?Qt:ln}}Ge.DEFAULT_IMAGE=null;Ge.DEFAULT_MAPPING=qh;Ge.DEFAULT_ANISOTROPY=1;class Ie{constructor(t=0,e=0,n=0,i=1){Ie.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],h=c[4],u=c[8],d=c[1],f=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(h-d)<.01&&Math.abs(u-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(f+1)/2,M=(m+1)/2,S=(h+d)/4,b=(u+v)/4,R=(p+g)/4;return y>_&&y>M?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=S/n,r=b/n):_>M?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=S/i,r=R/i):M<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(M),n=b/r,i=R/r),this.set(n,i,r,e),this}let x=Math.sqrt((g-p)*(g-p)+(u-v)*(u-v)+(d-h)*(d-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(u-v)/x,this.z=(d-h)/x,this.w=Math.acos((l+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Df extends ls{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Ie(0,0,t,e),this.scissorTest=!1,this.viewport=new Ie(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Us("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===yi?Qt:ln),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new Ge(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new ru(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class tn extends Df{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class ou extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Nf extends Ge{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ue,this.minFilter=Ue,this.wrapR=pn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let en=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],u=n[i+3];const d=r[o+0],f=r[o+1],p=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u;return}if(a===1){t[e+0]=d,t[e+1]=f,t[e+2]=p,t[e+3]=v;return}if(u!==v||c!==d||l!==f||h!==p){let g=1-a;const m=c*d+l*f+h*p+u*v,x=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const M=Math.sqrt(y),S=Math.atan2(M,m*x);g=Math.sin(g*S)/M,a=Math.sin(a*S)/M}const _=a*x;if(c=c*g+d*_,l=l*g+f*_,h=h*g+p*_,u=u*g+v*_,g===1-a){const M=1/Math.sqrt(c*c+l*l+h*h+u*u);c*=M,l*=M,h*=M,u*=M}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=u}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],u=r[o],d=r[o+1],f=r[o+2],p=r[o+3];return t[e]=a*p+h*u+c*f-l*d,t[e+1]=c*p+h*d+l*u-a*f,t[e+2]=l*p+h*f+a*d-c*u,t[e+3]=h*p-a*u-c*d-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),u=a(r/2),d=c(n/2),f=c(i/2),p=c(r/2);switch(o){case"XYZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"YXZ":this._x=d*h*u+l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"ZXY":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u-d*f*p;break;case"ZYX":this._x=d*h*u-l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u+d*f*p;break;case"YZX":this._x=d*h*u+l*f*p,this._y=l*f*u+d*h*p,this._z=l*h*p-d*f*u,this._w=l*h*u-d*f*p;break;case"XZY":this._x=d*h*u-l*f*p,this._y=l*f*u-d*h*p,this._z=l*h*p+d*f*u,this._w=l*h*u+d*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],u=e[10],d=n+a+u;if(d>0){const f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>u){const f=2*Math.sqrt(1+n-a-u);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>u){const f=2*Math.sqrt(1+a-n-u);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+u-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Le(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),u=Math.sin((1-e)*h)/l,d=Math.sin(e*h)/l;return this._w=o*u+this._w*d,this._x=n*u+this._x*d,this._y=i*u+this._y*d,this._z=r*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(ol.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(ol.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-r*i),u=2*(r*n-o*e);return this.x=e+c*l+o*u-a*h,this.y=n+c*h+a*l-r*u,this.z=i+c*u+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zo.copy(this).projectOnVector(t),this.sub(zo)}reflect(t){return this.sub(zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Le(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zo=new O,ol=new en;class Si{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(hn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(hn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=hn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,hn):hn.fromBufferAttribute(r,o),hn.applyMatrix4(t.matrixWorld),this.expandByPoint(hn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),$s.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),$s.copy(n.boundingBox)),$s.applyMatrix4(t.matrixWorld),this.union($s)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,hn),hn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),tr.subVectors(this.max,ms),Ai.subVectors(t.a,ms),Ci.subVectors(t.b,ms),Ri.subVectors(t.c,ms),Vn.subVectors(Ci,Ai),Xn.subVectors(Ri,Ci),ri.subVectors(Ai,Ri);let e=[0,-Vn.z,Vn.y,0,-Xn.z,Xn.y,0,-ri.z,ri.y,Vn.z,0,-Vn.x,Xn.z,0,-Xn.x,ri.z,0,-ri.x,-Vn.y,Vn.x,0,-Xn.y,Xn.x,0,-ri.y,ri.x,0];return!Bo(e,Ai,Ci,Ri,tr)||(e=[1,0,0,0,1,0,0,0,1],!Bo(e,Ai,Ci,Ri,tr))?!1:(er.crossVectors(Vn,Xn),e=[er.x,er.y,er.z],Bo(e,Ai,Ci,Ri,tr))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,hn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(hn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const An=[new O,new O,new O,new O,new O,new O,new O,new O],hn=new O,$s=new Si,Ai=new O,Ci=new O,Ri=new O,Vn=new O,Xn=new O,ri=new O,ms=new O,tr=new O,er=new O,oi=new O;function Bo(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){oi.fromArray(s,r);const a=i.x*Math.abs(oi.x)+i.y*Math.abs(oi.y)+i.z*Math.abs(oi.z),c=t.dot(oi),l=e.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Uf=new Si,gs=new O,ko=new O;class qs{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Uf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(gs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(ko.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(ko)),this.expandByPoint(gs.copy(t.center).sub(ko))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cn=new O,Go=new O,nr=new O,qn=new O,Ho=new O,ir=new O,Wo=new O;let Ff=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Go.copy(t).add(e).multiplyScalar(.5),nr.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(Go);const r=t.distanceTo(e)*.5,o=-this.direction.dot(nr),a=qn.dot(this.direction),c=-qn.dot(nr),l=qn.lengthSq(),h=Math.abs(1-o*o);let u,d,f,p;if(h>0)if(u=o*c-a,d=o*a-c,p=r*h,u>=0)if(d>=-p)if(d<=p){const v=1/h;u*=v,d*=v,f=u*(u+o*d+2*a)+d*(o*u+d+2*c)+l}else d=r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d=-r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;else d<=-p?(u=Math.max(0,-(-o*r+a)),d=u>0?-r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l):d<=p?(u=0,d=Math.min(Math.max(-r,-c),r),f=d*(d+2*c)+l):(u=Math.max(0,-(o*r+a)),d=u>0?r:Math.min(Math.max(-r,-c),r),f=-u*u+d*(d+2*c)+l);else d=o>0?-r:r,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,u),i&&i.copy(Go).addScaledVector(nr,d),f}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);const n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return l>=0?(n=(t.min.x-d.x)*l,i=(t.max.x-d.x)*l):(n=(t.max.x-d.x)*l,i=(t.min.x-d.x)*l),h>=0?(r=(t.min.y-d.y)*h,o=(t.max.y-d.y)*h):(r=(t.max.y-d.y)*h,o=(t.min.y-d.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),u>=0?(a=(t.min.z-d.z)*u,c=(t.max.z-d.z)*u):(a=(t.max.z-d.z)*u,c=(t.min.z-d.z)*u),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,i,r){Ho.subVectors(e,t),ir.subVectors(n,t),Wo.crossVectors(Ho,ir);let o=this.direction.dot(Wo),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,t);const c=a*this.direction.dot(ir.crossVectors(qn,ir));if(c<0)return null;const l=a*this.direction.dot(Ho.cross(qn));if(l<0||c+l>o)return null;const h=-a*qn.dot(Wo);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ee{constructor(t,e,n,i,r,o,a,c,l,h,u,d,f,p,v,g){ee.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,h,u,d,f,p,v,g)}set(t,e,n,i,r,o,a,c,l,h,u,d,f,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=r,m[5]=o,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=u,m[14]=d,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ee().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Pi.setFromMatrixColumn(t,0).length(),r=1/Pi.setFromMatrixColumn(t,1).length(),o=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),u=Math.sin(r);if(t.order==="XYZ"){const d=o*h,f=o*u,p=a*h,v=a*u;e[0]=c*h,e[4]=-c*u,e[8]=l,e[1]=f+p*l,e[5]=d-v*l,e[9]=-a*c,e[2]=v-d*l,e[6]=p+f*l,e[10]=o*c}else if(t.order==="YXZ"){const d=c*h,f=c*u,p=l*h,v=l*u;e[0]=d+v*a,e[4]=p*a-f,e[8]=o*l,e[1]=o*u,e[5]=o*h,e[9]=-a,e[2]=f*a-p,e[6]=v+d*a,e[10]=o*c}else if(t.order==="ZXY"){const d=c*h,f=c*u,p=l*h,v=l*u;e[0]=d-v*a,e[4]=-o*u,e[8]=p+f*a,e[1]=f+p*a,e[5]=o*h,e[9]=v-d*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const d=o*h,f=o*u,p=a*h,v=a*u;e[0]=c*h,e[4]=p*l-f,e[8]=d*l+v,e[1]=c*u,e[5]=v*l+d,e[9]=f*l-p,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const d=o*c,f=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=v-d*u,e[8]=p*u+f,e[1]=u,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*u+p,e[10]=d-v*u}else if(t.order==="XZY"){const d=o*c,f=o*l,p=a*c,v=a*l;e[0]=c*h,e[4]=-u,e[8]=l*h,e[1]=d*u+v,e[5]=o*h,e[9]=f*u-p,e[2]=p*u-f,e[6]=a*h,e[10]=v*u+d}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Of,t,zf)}lookAt(t,e,n){const i=this.elements;return Je.subVectors(t,e),Je.lengthSq()===0&&(Je.z=1),Je.normalize(),Yn.crossVectors(n,Je),Yn.lengthSq()===0&&(Math.abs(n.z)===1?Je.x+=1e-4:Je.z+=1e-4,Je.normalize(),Yn.crossVectors(n,Je)),Yn.normalize(),sr.crossVectors(Je,Yn),i[0]=Yn.x,i[4]=sr.x,i[8]=Je.x,i[1]=Yn.y,i[5]=sr.y,i[9]=Je.y,i[2]=Yn.z,i[6]=sr.z,i[10]=Je.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],u=n[5],d=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],y=n[7],_=n[11],M=n[15],S=i[0],b=i[4],R=i[8],w=i[12],E=i[1],U=i[5],I=i[9],F=i[13],C=i[2],D=i[6],N=i[10],q=i[14],k=i[3],X=i[7],Z=i[11],G=i[15];return r[0]=o*S+a*E+c*C+l*k,r[4]=o*b+a*U+c*D+l*X,r[8]=o*R+a*I+c*N+l*Z,r[12]=o*w+a*F+c*q+l*G,r[1]=h*S+u*E+d*C+f*k,r[5]=h*b+u*U+d*D+f*X,r[9]=h*R+u*I+d*N+f*Z,r[13]=h*w+u*F+d*q+f*G,r[2]=p*S+v*E+g*C+m*k,r[6]=p*b+v*U+g*D+m*X,r[10]=p*R+v*I+g*N+m*Z,r[14]=p*w+v*F+g*q+m*G,r[3]=x*S+y*E+_*C+M*k,r[7]=x*b+y*U+_*D+M*X,r[11]=x*R+y*I+_*N+M*Z,r[15]=x*w+y*F+_*q+M*G,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],u=t[6],d=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15];return p*(+r*c*u-i*l*u-r*a*d+n*l*d+i*a*f-n*c*f)+v*(+e*c*f-e*l*d+r*o*d-i*o*f+i*l*h-r*c*h)+g*(+e*l*u-e*a*f-r*o*u+n*o*f+r*a*h-n*l*h)+m*(-i*a*h-e*c*u+e*a*d+i*o*u-n*o*d+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],u=t[9],d=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],x=u*g*l-v*d*l+v*c*f-a*g*f-u*c*m+a*d*m,y=p*d*l-h*g*l-p*c*f+o*g*f+h*c*m-o*d*m,_=h*v*l-p*u*l+p*a*f-o*v*f-h*a*m+o*u*m,M=p*u*c-h*v*c-p*a*d+o*v*d+h*a*g-o*u*g,S=e*x+n*y+i*_+r*M;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/S;return t[0]=x*b,t[1]=(v*d*r-u*g*r-v*i*f+n*g*f+u*i*m-n*d*m)*b,t[2]=(a*g*r-v*c*r+v*i*l-n*g*l-a*i*m+n*c*m)*b,t[3]=(u*c*r-a*d*r-u*i*l+n*d*l+a*i*f-n*c*f)*b,t[4]=y*b,t[5]=(h*g*r-p*d*r+p*i*f-e*g*f-h*i*m+e*d*m)*b,t[6]=(p*c*r-o*g*r-p*i*l+e*g*l+o*i*m-e*c*m)*b,t[7]=(o*d*r-h*c*r+h*i*l-e*d*l-o*i*f+e*c*f)*b,t[8]=_*b,t[9]=(p*u*r-h*v*r-p*n*f+e*v*f+h*n*m-e*u*m)*b,t[10]=(o*v*r-p*a*r+p*n*l-e*v*l-o*n*m+e*a*m)*b,t[11]=(h*a*r-o*u*r-h*n*l+e*u*l+o*n*f-e*a*f)*b,t[12]=M*b,t[13]=(h*v*i-p*u*i+p*n*d-e*v*d-h*n*g+e*u*g)*b,t[14]=(p*a*i-o*v*i-p*n*c+e*v*c+o*n*g-e*a*g)*b,t[15]=(o*u*i-h*a*i+h*n*c-e*u*c-o*n*d+e*a*d)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,u=a+a,d=r*l,f=r*h,p=r*u,v=o*h,g=o*u,m=a*u,x=c*l,y=c*h,_=c*u,M=n.x,S=n.y,b=n.z;return i[0]=(1-(v+m))*M,i[1]=(f+_)*M,i[2]=(p-y)*M,i[3]=0,i[4]=(f-_)*S,i[5]=(1-(d+m))*S,i[6]=(g+x)*S,i[7]=0,i[8]=(p+y)*b,i[9]=(g-x)*b,i[10]=(1-(d+v))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Pi.set(i[0],i[1],i[2]).length();const o=Pi.set(i[4],i[5],i[6]).length(),a=Pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],un.copy(this);const l=1/r,h=1/o,u=1/a;return un.elements[0]*=l,un.elements[1]*=l,un.elements[2]*=l,un.elements[4]*=h,un.elements[5]*=h,un.elements[6]*=h,un.elements[8]*=u,un.elements[9]*=u,un.elements[10]*=u,e.setFromRotationMatrix(un),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=On){const c=this.elements,l=2*r/(e-t),h=2*r/(n-i),u=(e+t)/(e-t),d=(n+i)/(n-i);let f,p;if(a===On)f=-(o+r)/(o-r),p=-2*o*r/(o-r);else if(a===co)f=-o/(o-r),p=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=u,c[12]=0,c[1]=0,c[5]=h,c[9]=d,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=On){const c=this.elements,l=1/(e-t),h=1/(n-i),u=1/(o-r),d=(e+t)*l,f=(n+i)*h;let p,v;if(a===On)p=(o+r)*u,v=-2*u;else if(a===co)p=r*u,v=-1*u;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-d,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Pi=new O,un=new ee,Of=new O(0,0,0),zf=new O(1,1,1),Yn=new O,sr=new O,Je=new O,al=new ee,cl=new en;class Wn{constructor(t=0,e=0,n=0,i=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],u=i[2],d=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Le(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(d,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Le(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-u,r),this._z=0);break;case"ZXY":this._x=Math.asin(Le(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Le(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Le(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-u,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Le(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return al.makeRotationFromQuaternion(t),this.setFromRotationMatrix(al,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return cl.setFromEuler(this),this.setFromQuaternion(cl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class au{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Bf=0;const ll=new O,Li=new en,Rn=new ee,rr=new O,vs=new O,kf=new O,Gf=new en,hl=new O(1,0,0),ul=new O(0,1,0),dl=new O(0,0,1),Hf={type:"added"},Wf={type:"removed"};class Ne extends ls{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Bf++}),this.uuid=bn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ne.DEFAULT_UP.clone();const t=new O,e=new Wn,n=new en,i=new O(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ee},normalMatrix:{value:new Zt}}),this.matrix=new ee,this.matrixWorld=new ee,this.matrixAutoUpdate=Ne.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new au,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(hl,t)}rotateY(t){return this.rotateOnAxis(ul,t)}rotateZ(t){return this.rotateOnAxis(dl,t)}translateOnAxis(t,e){return ll.copy(t).applyQuaternion(this.quaternion),this.position.add(ll.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(hl,t)}translateY(t){return this.translateOnAxis(ul,t)}translateZ(t){return this.translateOnAxis(dl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?rr.copy(t):rr.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(vs,rr,this.up):Rn.lookAt(rr,vs,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Li.setFromRotationMatrix(Rn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Hf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Wf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,t,kf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,Gf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const u=c[l];r(t.shapes,u)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),u=o(t.shapes),d=o(t.skeletons),f=o(t.animations),p=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),u.length>0&&(n.shapes=u),d.length>0&&(n.skeletons=d),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ne.DEFAULT_UP=new O(0,1,0);Ne.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ne.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const dn=new O,Pn=new O,Vo=new O,Ln=new O,Ii=new O,Di=new O,fl=new O,Xo=new O,qo=new O,Yo=new O;let or=!1;class an{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),dn.subVectors(t,e),i.cross(dn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){dn.subVectors(i,e),Pn.subVectors(n,e),Vo.subVectors(t,e);const o=dn.dot(dn),a=dn.dot(Pn),c=dn.dot(Vo),l=Pn.dot(Pn),h=Pn.dot(Vo),u=o*l-a*a;if(u===0)return r.set(0,0,0),null;const d=1/u,f=(l*c-a*h)*d,p=(o*h-a*c)*d;return r.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getUV(t,e,n,i,r,o,a,c){return or===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),or=!0),this.getInterpolation(t,e,n,i,r,o,a,c)}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ln.x),c.addScaledVector(o,Ln.y),c.addScaledVector(a,Ln.z),c)}static isFrontFacing(t,e,n,i){return dn.subVectors(n,e),Pn.subVectors(t,e),dn.cross(Pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return dn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),dn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return an.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return an.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return or===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),or=!0),an.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return an.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return an.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return an.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Ii.subVectors(i,n),Di.subVectors(r,n),Xo.subVectors(t,n);const c=Ii.dot(Xo),l=Di.dot(Xo);if(c<=0&&l<=0)return e.copy(n);qo.subVectors(t,i);const h=Ii.dot(qo),u=Di.dot(qo);if(h>=0&&u<=h)return e.copy(i);const d=c*u-h*l;if(d<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ii,o);Yo.subVectors(t,r);const f=Ii.dot(Yo),p=Di.dot(Yo);if(p>=0&&f<=p)return e.copy(r);const v=f*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(Di,a);const g=h*p-f*u;if(g<=0&&u-h>=0&&f-p>=0)return fl.subVectors(r,i),a=(u-h)/(u-h+(f-p)),e.copy(i).addScaledVector(fl,a);const m=1/(g+v+d);return o=v*m,a=d*m,e.copy(n).addScaledVector(Ii,o).addScaledVector(Di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const cu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},ar={h:0,s:0,l:0};function jo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class It{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=se.workingColorSpace){if(t=Qa(t,1),e=Le(e,0,1),n=Le(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=jo(o,r,t+1/3),this.g=jo(o,r,t),this.b=jo(o,r,t-1/3)}return se.toWorkingColorSpace(this,i),this}setStyle(t,e=Qt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qt){const n=cu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=es(t.r),this.g=es(t.g),this.b=es(t.b),this}copyLinearToSRGB(t){return this.r=Fo(t.r),this.g=Fo(t.g),this.b=Fo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qt){return se.fromWorkingColorSpace(ke.copy(this),t),Math.round(Le(ke.r*255,0,255))*65536+Math.round(Le(ke.g*255,0,255))*256+Math.round(Le(ke.b*255,0,255))}getHexString(t=Qt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(ke.copy(this),e);const n=ke.r,i=ke.g,r=ke.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const u=o-a;switch(l=h<=.5?u/(o+a):u/(2-o-a),o){case n:c=(i-r)/u+(i<r?6:0);break;case i:c=(r-n)/u+2;break;case r:c=(n-i)/u+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(ke.copy(this),e),t.r=ke.r,t.g=ke.g,t.b=ke.b,t}getStyle(t=Qt){se.fromWorkingColorSpace(ke.copy(this),t);const e=ke.r,n=ke.g,i=ke.b;return t!==Qt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(ar);const n=Ns(jn.h,ar.h,e),i=Ns(jn.s,ar.s,e),r=Ns(jn.l,ar.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const ke=new It;It.NAMES=cu;let Vf=0,hs=class extends ls{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=bn(),this.name="",this.type="Material",this.blending=ts,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=La,this.blendDst=Ia,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new It(0,0,0),this.blendAlpha=0,this.depthFunc=so,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=tl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==ts&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==La&&(n.blendSrc=this.blendSrc),this.blendDst!==Ia&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==so&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==tl&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class us extends hs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new It(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Gh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Me=new O,cr=new et;class te{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Fa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)cr.fromBufferAttribute(this,e),cr.applyMatrix3(t),this.setXY(e,cr.x,cr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix3(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyMatrix4(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.applyNormalMatrix(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Me.fromBufferAttribute(this,e),Me.transformDirection(t),this.setXYZ(e,Me.x,Me.y,Me.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Sn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Sn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Sn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Sn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Sn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Fa&&(t.usage=this.usage),t}}class lu extends te{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class hu extends te{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Jt extends te{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Xf=0;const on=new ee,Ko=new Ne,Ni=new O,Qe=new Si,xs=new Si,Pe=new O;class oe extends ls{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Xf++}),this.uuid=bn(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(iu(t)?hu:lu)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Zt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return on.makeRotationFromQuaternion(t),this.applyMatrix4(on),this}rotateX(t){return on.makeRotationX(t),this.applyMatrix4(on),this}rotateY(t){return on.makeRotationY(t),this.applyMatrix4(on),this}rotateZ(t){return on.makeRotationZ(t),this.applyMatrix4(on),this}translate(t,e,n){return on.makeTranslation(t,e,n),this.applyMatrix4(on),this}scale(t,e,n){return on.makeScale(t,e,n),this.applyMatrix4(on),this}lookAt(t){return Ko.lookAt(t),Ko.updateMatrix(),this.applyMatrix4(Ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Jt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];Qe.setFromBufferAttribute(r),this.morphTargetsRelative?(Pe.addVectors(this.boundingBox.min,Qe.min),this.boundingBox.expandByPoint(Pe),Pe.addVectors(this.boundingBox.max,Qe.max),this.boundingBox.expandByPoint(Pe)):(this.boundingBox.expandByPoint(Qe.min),this.boundingBox.expandByPoint(Qe.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new qs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(Qe.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Pe.addVectors(Qe.min,xs.min),Qe.expandByPoint(Pe),Pe.addVectors(Qe.max,xs.max),Qe.expandByPoint(Pe)):(Qe.expandByPoint(xs.min),Qe.expandByPoint(xs.max))}Qe.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Pe.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Pe));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Pe.fromBufferAttribute(a,l),c&&(Ni.fromBufferAttribute(t,l),Pe.add(Ni)),i=Math.max(i,n.distanceToSquared(Pe))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new te(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let E=0;E<a;E++)l[E]=new O,h[E]=new O;const u=new O,d=new O,f=new O,p=new et,v=new et,g=new et,m=new O,x=new O;function y(E,U,I){u.fromArray(i,E*3),d.fromArray(i,U*3),f.fromArray(i,I*3),p.fromArray(o,E*2),v.fromArray(o,U*2),g.fromArray(o,I*2),d.sub(u),f.sub(u),v.sub(p),g.sub(p);const F=1/(v.x*g.y-g.x*v.y);isFinite(F)&&(m.copy(d).multiplyScalar(g.y).addScaledVector(f,-v.y).multiplyScalar(F),x.copy(f).multiplyScalar(v.x).addScaledVector(d,-g.x).multiplyScalar(F),l[E].add(m),l[U].add(m),l[I].add(m),h[E].add(x),h[U].add(x),h[I].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:n.length}]);for(let E=0,U=_.length;E<U;++E){const I=_[E],F=I.start,C=I.count;for(let D=F,N=F+C;D<N;D+=3)y(n[D+0],n[D+1],n[D+2])}const M=new O,S=new O,b=new O,R=new O;function w(E){b.fromArray(r,E*3),R.copy(b);const U=l[E];M.copy(U),M.sub(b.multiplyScalar(b.dot(U))).normalize(),S.crossVectors(R,U);const F=S.dot(h[E])<0?-1:1;c[E*4]=M.x,c[E*4+1]=M.y,c[E*4+2]=M.z,c[E*4+3]=F}for(let E=0,U=_.length;E<U;++E){const I=_[E],F=I.start,C=I.count;for(let D=F,N=F+C;D<N;D+=3)w(n[D+0]),w(n[D+1]),w(n[D+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new te(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let d=0,f=n.count;d<f;d++)n.setXYZ(d,0,0,0);const i=new O,r=new O,o=new O,a=new O,c=new O,l=new O,h=new O,u=new O;if(t)for(let d=0,f=t.count;d<f;d+=3){const p=t.getX(d+0),v=t.getX(d+1),g=t.getX(d+2);i.fromBufferAttribute(e,p),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,g),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let d=0,f=e.count;d<f;d+=3)i.fromBufferAttribute(e,d+0),r.fromBufferAttribute(e,d+1),o.fromBufferAttribute(e,d+2),h.subVectors(o,r),u.subVectors(i,r),h.cross(u),n.setXYZ(d+0,h.x,h.y,h.z),n.setXYZ(d+1,h.x,h.y,h.z),n.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Pe.fromBufferAttribute(t,e),Pe.normalize(),t.setXYZ(e,Pe.x,Pe.y,Pe.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,u=a.normalized,d=new l.constructor(c.length*h);let f=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let m=0;m<h;m++)d[p++]=l[f++]}return new te(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new oe,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,u=l.length;h<u;h++){const d=l[h],f=t(d,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let u=0,d=l.length;u<d;u++){const f=l[u];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],u=r[l];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const u=o[l];this.addGroup(u.start,u.count,u.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const pl=new ee,ai=new Ff,lr=new qs,ml=new O,Ui=new O,Fi=new O,Oi=new O,Zo=new O,hr=new O,ur=new et,dr=new et,fr=new et,gl=new O,vl=new O,xl=new O,pr=new O,mr=new O;class $ extends Ne{constructor(t=new oe,e=new us){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){hr.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],u=r[c];h!==0&&(Zo.fromBufferAttribute(u,t),o?hr.addScaledVector(Zo,h):hr.addScaledVector(Zo.sub(e),h))}e.add(hr)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),lr.copy(n.boundingSphere),lr.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(lr.containsPoint(ai.origin)===!1&&(ai.intersectSphere(lr,ml)===null||ai.origin.distanceToSquared(ml)>(t.far-t.near)**2))&&(pl.copy(r).invert(),ai.copy(t.ray).applyMatrix4(pl),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,u=r.attributes.normal,d=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,M=y;_<M;_+=3){const S=a.getX(_),b=a.getX(_+1),R=a.getX(_+2);i=gr(this,m,t,n,l,h,u,S,b,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=a.getX(g),y=a.getX(g+1),_=a.getX(g+2);i=gr(this,o,t,n,l,h,u,x,y,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let p=0,v=d.length;p<v;p++){const g=d[p],m=o[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let _=x,M=y;_<M;_+=3){const S=_,b=_+1,R=_+2;i=gr(this,m,t,n,l,h,u,S,b,R),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=g,y=g+1,_=g+2;i=gr(this,o,t,n,l,h,u,x,y,_),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function qf(s,t,e,n,i,r,o,a){let c;if(t.side===Ye?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===ei,a),c===null)return null;mr.copy(a),mr.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(mr);return l<e.near||l>e.far?null:{distance:l,point:mr.clone(),object:s}}function gr(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,Ui),s.getVertexPosition(c,Fi),s.getVertexPosition(l,Oi);const h=qf(s,t,e,n,Ui,Fi,Oi,pr);if(h){i&&(ur.fromBufferAttribute(i,a),dr.fromBufferAttribute(i,c),fr.fromBufferAttribute(i,l),h.uv=an.getInterpolation(pr,Ui,Fi,Oi,ur,dr,fr,new et)),r&&(ur.fromBufferAttribute(r,a),dr.fromBufferAttribute(r,c),fr.fromBufferAttribute(r,l),h.uv1=an.getInterpolation(pr,Ui,Fi,Oi,ur,dr,fr,new et),h.uv2=h.uv1),o&&(gl.fromBufferAttribute(o,a),vl.fromBufferAttribute(o,c),xl.fromBufferAttribute(o,l),h.normal=an.getInterpolation(pr,Ui,Fi,Oi,gl,vl,xl,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const u={a,b:c,c:l,normal:new O,materialIndex:0};an.getNormal(Ui,Fi,Oi,u.normal),h.face=u}return h}class Rt extends oe{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],u=[];let d=0,f=0;p("z","y","x",-1,-1,n,e,t,o,r,0),p("z","y","x",1,-1,n,e,-t,o,r,1),p("x","z","y",1,1,t,n,e,i,o,2),p("x","z","y",1,-1,t,n,-e,i,o,3),p("x","y","z",1,-1,t,e,n,i,r,4),p("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(u,2));function p(v,g,m,x,y,_,M,S,b,R,w){const E=_/b,U=M/R,I=_/2,F=M/2,C=S/2,D=b+1,N=R+1;let q=0,k=0;const X=new O;for(let Z=0;Z<N;Z++){const G=Z*U-F;for(let W=0;W<D;W++){const Y=W*E-I;X[v]=Y*x,X[g]=G*y,X[m]=C,l.push(X.x,X.y,X.z),X[v]=0,X[g]=0,X[m]=S>0?1:-1,h.push(X.x,X.y,X.z),u.push(W/b),u.push(1-Z/R),q+=1}}for(let Z=0;Z<R;Z++)for(let G=0;G<b;G++){const W=d+G+D*Z,Y=d+G+D*(Z+1),nt=d+(G+1)+D*(Z+1),ht=d+(G+1)+D*Z;c.push(W,Y,ht),c.push(Y,nt,ht),k+=6}a.addGroup(f,k,w),f+=k,d+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function as(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Xe(s){const t={};for(let e=0;e<s.length;e++){const n=as(s[e]);for(const i in n)t[i]=n[i]}return t}function Yf(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function uu(s){return s.getRenderTarget()===null?s.outputColorSpace:se.workingColorSpace}const Bn={clone:as,merge:Xe};var jf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Kf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class De extends hs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=jf,this.fragmentShader=Kf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=as(t.uniforms),this.uniformsGroups=Yf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class du extends Ne{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ee,this.projectionMatrix=new ee,this.projectionMatrixInverse=new ee,this.coordinateSystem=On}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class $e extends du{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=ks*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ds*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return ks*2*Math.atan(Math.tan(Ds*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ds*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const zi=-90,Bi=1;class Zf extends Ne{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new $e(zi,Bi,t,e);i.layers=this.layers,this.add(i);const r=new $e(zi,Bi,t,e);r.layers=this.layers,this.add(r);const o=new $e(zi,Bi,t,e);o.layers=this.layers,this.add(o);const a=new $e(zi,Bi,t,e);a.layers=this.layers,this.add(a);const c=new $e(zi,Bi,t,e);c.layers=this.layers,this.add(c);const l=new $e(zi,Bi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===On)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===co)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,u=t.getRenderTarget(),d=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(u,d,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class fu extends Ge{constructor(t,e,n,i,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:is,super(t,e,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Jf extends tn{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Us("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===yi?Qt:ln),this.texture=new fu(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ke}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Rt(5,5,5),r=new De({name:"CubemapFromEquirect",uniforms:as(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ye,blending:zn});r.uniforms.tEquirect.value=e;const o=new $(i,r),a=e.minFilter;return e.minFilter===rs&&(e.minFilter=Ke),new Zf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Jo=new O,Qf=new O,$f=new Zt;class di{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Jo.subVectors(n,e).cross(Qf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Jo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||$f.getNormalMatrix(t),i=this.coplanarPoint(Jo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new qs,vr=new O;class $a{constructor(t=new di,e=new di,n=new di,i=new di,r=new di,o=new di){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=On){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],u=i[6],d=i[7],f=i[8],p=i[9],v=i[10],g=i[11],m=i[12],x=i[13],y=i[14],_=i[15];if(n[0].setComponents(c-r,d-l,g-f,_-m).normalize(),n[1].setComponents(c+r,d+l,g+f,_+m).normalize(),n[2].setComponents(c+o,d+h,g+p,_+x).normalize(),n[3].setComponents(c-o,d-h,g-p,_-x).normalize(),n[4].setComponents(c-a,d-u,g-v,_-y).normalize(),e===On)n[5].setComponents(c+a,d+u,g+v,_+y).normalize();else if(e===co)n[5].setComponents(a,u,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(vr.x=i.normal.x>0?t.max.x:t.min.x,vr.y=i.normal.y>0?t.max.y:t.min.y,vr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(vr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function pu(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function tp(s,t){const e=t.isWebGL2,n=new WeakMap;function i(l,h){const u=l.array,d=l.usage,f=u.byteLength,p=s.createBuffer();s.bindBuffer(h,p),s.bufferData(h,u,d),l.onUploadCallback();let v;if(u instanceof Float32Array)v=s.FLOAT;else if(u instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(u instanceof Int16Array)v=s.SHORT;else if(u instanceof Uint32Array)v=s.UNSIGNED_INT;else if(u instanceof Int32Array)v=s.INT;else if(u instanceof Int8Array)v=s.BYTE;else if(u instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(u instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+u);return{buffer:p,type:v,bytesPerElement:u.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,h,u){const d=h.array,f=h._updateRange,p=h.updateRanges;if(s.bindBuffer(u,l),f.count===-1&&p.length===0&&s.bufferSubData(u,0,d),p.length!==0){for(let v=0,g=p.length;v<g;v++){const m=p[v];e?s.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d,m.start,m.count):s.bufferSubData(u,m.start*d.BYTES_PER_ELEMENT,d.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d,f.offset,f.count):s.bufferSubData(u,f.offset*d.BYTES_PER_ELEMENT,d.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const d=n.get(l);(!d||d.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const u=n.get(l);if(u===void 0)n.set(l,i(l,h));else if(u.version<l.version){if(u.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(u.buffer,l,h),u.version=l.version}}return{get:o,remove:a,update:c}}class Fe extends oe{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,u=t/a,d=e/c,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const x=m*d-o;for(let y=0;y<l;y++){const _=y*u-r;p.push(_,-x,0),v.push(0,0,1),g.push(y/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const y=x+l*m,_=x+l*(m+1),M=x+1+l*(m+1),S=x+1+l*m;f.push(y,_,S),f.push(_,M,S)}this.setIndex(f),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Fe(t.width,t.height,t.widthSegments,t.heightSegments)}}var ep=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,np=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,ip=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,sp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,rp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,op=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,ap=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,cp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,lp=`#ifdef USE_BATCHING
	attribute float batchId;
	uniform highp sampler2D batchingTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,hp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,up=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,dp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,fp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,pp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,mp=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,gp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,_p=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,wp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,bp=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,Ep=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Tp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Ap=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Cp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Rp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Pp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Lp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Ip=`
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`,Dp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Np=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Up=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Op=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,zp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Bp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,kp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Hp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Wp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Vp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Xp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,qp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,jp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Kp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Zp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Jp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,$p=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,em=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,nm=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,im=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,sm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,rm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,om=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,am=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,cm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,lm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,hm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,um=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,dm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,fm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,pm=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,mm=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`,gm=`#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`,vm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`,xm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,ym=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,_m=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,wm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Sm=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,bm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Em=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Tm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Am=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Cm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Rm=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Pm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Lm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Im=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Dm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Nm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Um=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Fm=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`,Om=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,zm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,Bm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,km=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Hm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Wm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,Vm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Xm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,qm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Ym=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color *= toneMappingExposure;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	return color;
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,jm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Km=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,Zm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Jm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,$m=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const t0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,e0=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,n0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,i0=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,s0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,r0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,o0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,a0=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`,c0=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,l0=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,h0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,u0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,d0=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,f0=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,p0=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,m0=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,g0=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,v0=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,x0=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,y0=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,_0=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,M0=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,w0=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,S0=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,b0=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,E0=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,T0=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,A0=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,C0=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,R0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,P0=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,L0=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,I0=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,D0=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Xt={alphahash_fragment:ep,alphahash_pars_fragment:np,alphamap_fragment:ip,alphamap_pars_fragment:sp,alphatest_fragment:rp,alphatest_pars_fragment:op,aomap_fragment:ap,aomap_pars_fragment:cp,batching_pars_vertex:lp,batching_vertex:hp,begin_vertex:up,beginnormal_vertex:dp,bsdfs:fp,iridescence_fragment:pp,bumpmap_pars_fragment:mp,clipping_planes_fragment:gp,clipping_planes_pars_fragment:vp,clipping_planes_pars_vertex:xp,clipping_planes_vertex:yp,color_fragment:_p,color_pars_fragment:Mp,color_pars_vertex:wp,color_vertex:Sp,common:bp,cube_uv_reflection_fragment:Ep,defaultnormal_vertex:Tp,displacementmap_pars_vertex:Ap,displacementmap_vertex:Cp,emissivemap_fragment:Rp,emissivemap_pars_fragment:Pp,colorspace_fragment:Lp,colorspace_pars_fragment:Ip,envmap_fragment:Dp,envmap_common_pars_fragment:Np,envmap_pars_fragment:Up,envmap_pars_vertex:Fp,envmap_physical_pars_fragment:jp,envmap_vertex:Op,fog_vertex:zp,fog_pars_vertex:Bp,fog_fragment:kp,fog_pars_fragment:Gp,gradientmap_pars_fragment:Hp,lightmap_fragment:Wp,lightmap_pars_fragment:Vp,lights_lambert_fragment:Xp,lights_lambert_pars_fragment:qp,lights_pars_begin:Yp,lights_toon_fragment:Kp,lights_toon_pars_fragment:Zp,lights_phong_fragment:Jp,lights_phong_pars_fragment:Qp,lights_physical_fragment:$p,lights_physical_pars_fragment:tm,lights_fragment_begin:em,lights_fragment_maps:nm,lights_fragment_end:im,logdepthbuf_fragment:sm,logdepthbuf_pars_fragment:rm,logdepthbuf_pars_vertex:om,logdepthbuf_vertex:am,map_fragment:cm,map_pars_fragment:lm,map_particle_fragment:hm,map_particle_pars_fragment:um,metalnessmap_fragment:dm,metalnessmap_pars_fragment:fm,morphcolor_vertex:pm,morphnormal_vertex:mm,morphtarget_pars_vertex:gm,morphtarget_vertex:vm,normal_fragment_begin:xm,normal_fragment_maps:ym,normal_pars_fragment:_m,normal_pars_vertex:Mm,normal_vertex:wm,normalmap_pars_fragment:Sm,clearcoat_normal_fragment_begin:bm,clearcoat_normal_fragment_maps:Em,clearcoat_pars_fragment:Tm,iridescence_pars_fragment:Am,opaque_fragment:Cm,packing:Rm,premultiplied_alpha_fragment:Pm,project_vertex:Lm,dithering_fragment:Im,dithering_pars_fragment:Dm,roughnessmap_fragment:Nm,roughnessmap_pars_fragment:Um,shadowmap_pars_fragment:Fm,shadowmap_pars_vertex:Om,shadowmap_vertex:zm,shadowmask_pars_fragment:Bm,skinbase_vertex:km,skinning_pars_vertex:Gm,skinning_vertex:Hm,skinnormal_vertex:Wm,specularmap_fragment:Vm,specularmap_pars_fragment:Xm,tonemapping_fragment:qm,tonemapping_pars_fragment:Ym,transmission_fragment:jm,transmission_pars_fragment:Km,uv_pars_fragment:Zm,uv_pars_vertex:Jm,uv_vertex:Qm,worldpos_vertex:$m,background_vert:t0,background_frag:e0,backgroundCube_vert:n0,backgroundCube_frag:i0,cube_vert:s0,cube_frag:r0,depth_vert:o0,depth_frag:a0,distanceRGBA_vert:c0,distanceRGBA_frag:l0,equirect_vert:h0,equirect_frag:u0,linedashed_vert:d0,linedashed_frag:f0,meshbasic_vert:p0,meshbasic_frag:m0,meshlambert_vert:g0,meshlambert_frag:v0,meshmatcap_vert:x0,meshmatcap_frag:y0,meshnormal_vert:_0,meshnormal_frag:M0,meshphong_vert:w0,meshphong_frag:S0,meshphysical_vert:b0,meshphysical_frag:E0,meshtoon_vert:T0,meshtoon_frag:A0,points_vert:C0,points_frag:R0,shadow_vert:P0,shadow_frag:L0,sprite_vert:I0,sprite_frag:D0},gt={common:{diffuse:{value:new It(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Zt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Zt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Zt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Zt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Zt},normalScale:{value:new et(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Zt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Zt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Zt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Zt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new It(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new It(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0},uvTransform:{value:new Zt}},sprite:{diffuse:{value:new It(16777215)},opacity:{value:1},center:{value:new et(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Zt},alphaMap:{value:null},alphaMapTransform:{value:new Zt},alphaTest:{value:0}}},wn={basic:{uniforms:Xe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:Xe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new It(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:Xe([gt.common,gt.specularmap,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,gt.lights,{emissive:{value:new It(0)},specular:{value:new It(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:Xe([gt.common,gt.envmap,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.roughnessmap,gt.metalnessmap,gt.fog,gt.lights,{emissive:{value:new It(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:Xe([gt.common,gt.aomap,gt.lightmap,gt.emissivemap,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.gradientmap,gt.fog,gt.lights,{emissive:{value:new It(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:Xe([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,gt.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:Xe([gt.points,gt.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:Xe([gt.common,gt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:Xe([gt.common,gt.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:Xe([gt.common,gt.bumpmap,gt.normalmap,gt.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:Xe([gt.sprite,gt.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Zt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:Xe([gt.common,gt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:Xe([gt.lights,gt.fog,{color:{value:new It(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};wn.physical={uniforms:Xe([wn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Zt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Zt},clearcoatNormalScale:{value:new et(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Zt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Zt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Zt},sheen:{value:0},sheenColor:{value:new It(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Zt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Zt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Zt},transmissionSamplerSize:{value:new et},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Zt},attenuationDistance:{value:0},attenuationColor:{value:new It(0)},specularColor:{value:new It(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Zt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Zt},anisotropyVector:{value:new et},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Zt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const xr={r:0,b:0,g:0};function N0(s,t,e,n,i,r,o){const a=new It(0);let c=r===!0?0:1,l,h,u=null,d=0,f=null;function p(g,m){let x=!1,y=m.isScene===!0?m.background:null;y&&y.isTexture&&(y=(m.backgroundBlurriness>0?e:t).get(y)),y===null?v(a,c):y&&y.isColor&&(v(y,1),x=!0);const _=s.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,o):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===fo)?(h===void 0&&(h=new $(new Rt(1,1,1),new De({name:"BackgroundCubeMaterial",uniforms:as(wn.backgroundCube.uniforms),vertexShader:wn.backgroundCube.vertexShader,fragmentShader:wn.backgroundCube.fragmentShader,side:Ye,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(M,S,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=se.getTransfer(y.colorSpace)!==ue,(u!==y||d!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,u=y,d=y.version,f=s.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new $(new Fe(2,2),new De({name:"BackgroundMaterial",uniforms:as(wn.background.uniforms),vertexShader:wn.background.vertexShader,fragmentShader:wn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=se.getTransfer(y.colorSpace)!==ue,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(u!==y||d!==y.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,u=y,d=y.version,f=s.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function v(g,m){g.getRGB(xr,uu(s)),n.buffers.color.setClear(xr.r,xr.g,xr.b,m,o)}return{getClearColor:function(){return a},setClearColor:function(g,m=1){a.set(g),c=m,v(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,v(a,c)},render:p}}function U0(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=g(null);let l=c,h=!1;function u(C,D,N,q,k){let X=!1;if(o){const Z=v(q,N,D);l!==Z&&(l=Z,f(l.object)),X=m(C,q,N,k),X&&x(C,q,N,k)}else{const Z=D.wireframe===!0;(l.geometry!==q.id||l.program!==N.id||l.wireframe!==Z)&&(l.geometry=q.id,l.program=N.id,l.wireframe=Z,X=!0)}k!==null&&e.update(k,s.ELEMENT_ARRAY_BUFFER),(X||h)&&(h=!1,R(C,D,N,q),k!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(k).buffer))}function d(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(C){return n.isWebGL2?s.bindVertexArray(C):r.bindVertexArrayOES(C)}function p(C){return n.isWebGL2?s.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function v(C,D,N){const q=N.wireframe===!0;let k=a[C.id];k===void 0&&(k={},a[C.id]=k);let X=k[D.id];X===void 0&&(X={},k[D.id]=X);let Z=X[q];return Z===void 0&&(Z=g(d()),X[q]=Z),Z}function g(C){const D=[],N=[],q=[];for(let k=0;k<i;k++)D[k]=0,N[k]=0,q[k]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:N,attributeDivisors:q,object:C,attributes:{},index:null}}function m(C,D,N,q){const k=l.attributes,X=D.attributes;let Z=0;const G=N.getAttributes();for(const W in G)if(G[W].location>=0){const nt=k[W];let ht=X[W];if(ht===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(ht=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(ht=C.instanceColor)),nt===void 0||nt.attribute!==ht||ht&&nt.data!==ht.data)return!0;Z++}return l.attributesNum!==Z||l.index!==q}function x(C,D,N,q){const k={},X=D.attributes;let Z=0;const G=N.getAttributes();for(const W in G)if(G[W].location>=0){let nt=X[W];nt===void 0&&(W==="instanceMatrix"&&C.instanceMatrix&&(nt=C.instanceMatrix),W==="instanceColor"&&C.instanceColor&&(nt=C.instanceColor));const ht={};ht.attribute=nt,nt&&nt.data&&(ht.data=nt.data),k[W]=ht,Z++}l.attributes=k,l.attributesNum=Z,l.index=q}function y(){const C=l.newAttributes;for(let D=0,N=C.length;D<N;D++)C[D]=0}function _(C){M(C,0)}function M(C,D){const N=l.newAttributes,q=l.enabledAttributes,k=l.attributeDivisors;N[C]=1,q[C]===0&&(s.enableVertexAttribArray(C),q[C]=1),k[C]!==D&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,D),k[C]=D)}function S(){const C=l.newAttributes,D=l.enabledAttributes;for(let N=0,q=D.length;N<q;N++)D[N]!==C[N]&&(s.disableVertexAttribArray(N),D[N]=0)}function b(C,D,N,q,k,X,Z){Z===!0?s.vertexAttribIPointer(C,D,N,k,X):s.vertexAttribPointer(C,D,N,q,k,X)}function R(C,D,N,q){if(n.isWebGL2===!1&&(C.isInstancedMesh||q.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;y();const k=q.attributes,X=N.getAttributes(),Z=D.defaultAttributeValues;for(const G in X){const W=X[G];if(W.location>=0){let Y=k[G];if(Y===void 0&&(G==="instanceMatrix"&&C.instanceMatrix&&(Y=C.instanceMatrix),G==="instanceColor"&&C.instanceColor&&(Y=C.instanceColor)),Y!==void 0){const nt=Y.normalized,ht=Y.itemSize,dt=e.get(Y);if(dt===void 0)continue;const st=dt.buffer,vt=dt.type,xt=dt.bytesPerElement,ft=n.isWebGL2===!0&&(vt===s.INT||vt===s.UNSIGNED_INT||Y.gpuType===Yh);if(Y.isInterleavedBufferAttribute){const Mt=Y.data,z=Mt.stride,ct=Y.offset;if(Mt.isInstancedInterleavedBuffer){for(let J=0;J<W.locationSize;J++)M(W.location+J,Mt.meshPerAttribute);C.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let J=0;J<W.locationSize;J++)_(W.location+J);s.bindBuffer(s.ARRAY_BUFFER,st);for(let J=0;J<W.locationSize;J++)b(W.location+J,ht/W.locationSize,vt,nt,z*xt,(ct+ht/W.locationSize*J)*xt,ft)}else{if(Y.isInstancedBufferAttribute){for(let Mt=0;Mt<W.locationSize;Mt++)M(W.location+Mt,Y.meshPerAttribute);C.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Mt=0;Mt<W.locationSize;Mt++)_(W.location+Mt);s.bindBuffer(s.ARRAY_BUFFER,st);for(let Mt=0;Mt<W.locationSize;Mt++)b(W.location+Mt,ht/W.locationSize,vt,nt,ht*xt,ht/W.locationSize*Mt*xt,ft)}}else if(Z!==void 0){const nt=Z[G];if(nt!==void 0)switch(nt.length){case 2:s.vertexAttrib2fv(W.location,nt);break;case 3:s.vertexAttrib3fv(W.location,nt);break;case 4:s.vertexAttrib4fv(W.location,nt);break;default:s.vertexAttrib1fv(W.location,nt)}}}}S()}function w(){I();for(const C in a){const D=a[C];for(const N in D){const q=D[N];for(const k in q)p(q[k].object),delete q[k];delete D[N]}delete a[C]}}function E(C){if(a[C.id]===void 0)return;const D=a[C.id];for(const N in D){const q=D[N];for(const k in q)p(q[k].object),delete q[k];delete D[N]}delete a[C.id]}function U(C){for(const D in a){const N=a[D];if(N[C.id]===void 0)continue;const q=N[C.id];for(const k in q)p(q[k].object),delete q[k];delete N[C.id]}}function I(){F(),h=!0,l!==c&&(l=c,f(l.object))}function F(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:u,reset:I,resetDefaultState:F,dispose:w,releaseStatesOfGeometry:E,releaseStatesOfProgram:U,initAttributes:y,enableAttribute:_,disableUnusedAttributes:S}}function F0(s,t,e,n){const i=n.isWebGL2;let r;function o(h){r=h}function a(h,u){s.drawArrays(r,h,u),e.update(u,r,1)}function c(h,u,d){if(d===0)return;let f,p;if(i)f=s,p="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](r,h,u,d),e.update(u,r,d)}function l(h,u,d){if(d===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<d;p++)this.render(h[p],u[p]);else{f.multiDrawArraysWEBGL(r,h,0,u,0,d);let p=0;for(let v=0;v<d;v++)p+=u[v];e.update(p,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function O0(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,u=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),d=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),g=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),m=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=d>0,_=o||t.has("OES_texture_float"),M=y&&_,S=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:u,maxVertexTextures:d,maxTextureSize:f,maxCubemapSize:p,maxAttributes:v,maxVertexUniforms:g,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:y,floatFragmentTextures:_,floatVertexTextures:M,maxSamples:S}}function z0(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new di,a=new Zt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){const f=u.length!==0||d||n!==0||i;return i=d,n=u.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(u,d){e=h(u,d,0)},this.setState=function(u,d,f){const p=u.clippingPlanes,v=u.clipIntersection,g=u.clipShadows,m=s.get(u);if(!i||p===null||p.length===0||r&&!g)r?h(null):l();else{const x=r?0:n,y=x*4;let _=m.clippingState||null;c.value=_,_=h(p,d,y,f);for(let M=0;M!==y;++M)_[M]=e[M];m.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(u,d,f,p){const v=u!==null?u.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=f+v*4,x=d.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,_=f;y!==v;++y,_+=4)o.copy(u[y]).applyMatrix4(x,a),o.normal.toArray(g,_),g[_+3]=o.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function B0(s){let t=new WeakMap;function e(o,a){return a===Da?o.mapping=is:a===Na&&(o.mapping=ss),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Da||a===Na)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Jf(c.height/2);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class tc extends du{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Zi=4,yl=[.125,.215,.35,.446,.526,.582],mi=20,Qo=new tc,_l=new It;let $o=null,ta=0,ea=0;const fi=(1+Math.sqrt(5))/2,ki=1/fi,Ml=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,fi,ki),new O(0,fi,-ki),new O(ki,0,fi),new O(-ki,0,fi),new O(fi,ki,0),new O(-fi,ki,0)];class Ba{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){$o=this._renderer.getRenderTarget(),ta=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=bl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Sl(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($o,ta,ea),t.scissorTest=!1,yr(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===is||t.mapping===ss?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$o=this._renderer.getRenderTarget(),ta=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:vn,format:mn,colorSpace:kn,depthBuffer:!1},i=wl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=wl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=k0(r)),this._blurMaterial=G0(r,t,e)}return i}_compileMaterial(t){const e=new $(this._lodPlanes[0],t);this._renderer.compile(e,Qo)}_sceneToCubeUV(t,e,n,i){const a=new $e(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,u=h.autoClear,d=h.toneMapping;h.getClearColor(_l),h.toneMapping=$n,h.autoClear=!1;const f=new us({name:"PMREM.Background",side:Ye,depthWrite:!1,depthTest:!1}),p=new $(new Rt,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(_l),v=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):x===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const y=this._cubeSize;yr(i,x*y,m>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=d,h.autoClear=u,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===is||t.mapping===ss;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=bl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Sl());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new $(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;yr(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Qo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=Ml[(i-1)%Ml.length];this._blur(t,i-1,i,r,o)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,u=new $(this._lodPlanes[i],l),d=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*mi-1),v=r/p,g=isFinite(r)?1+Math.floor(h*v):mi;g>mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${mi}`);const m=[];let x=0;for(let b=0;b<mi;++b){const R=b/v,w=Math.exp(-R*R/2);m.push(w),b===0?x+=w:b<g&&(x+=2*w)}for(let b=0;b<m.length;b++)m[b]=m[b]/x;d.envMap.value=t.texture,d.samples.value=g,d.weights.value=m,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);const{_lodMax:y}=this;d.dTheta.value=p,d.mipInt.value=y-n;const _=this._sizeLods[i],M=3*_*(i>y-Zi?i-y+Zi:0),S=4*(this._cubeSize-_);yr(e,M,S,3*_,2*_),c.setRenderTarget(e),c.render(u,Qo)}}function k0(s){const t=[],e=[],n=[];let i=s;const r=s-Zi+1+yl.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-Zi?c=yl[o-s+Zi-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,u=1+l,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*f),y=new Float32Array(g*p*f),_=new Float32Array(m*p*f);for(let S=0;S<f;S++){const b=S%3*2/3-1,R=S>2?0:-1,w=[b,R,0,b+2/3,R,0,b+2/3,R+1,0,b,R,0,b+2/3,R+1,0,b,R+1,0];x.set(w,v*p*S),y.set(d,g*p*S);const E=[S,S,S,S,S,S];_.set(E,m*p*S)}const M=new oe;M.setAttribute("position",new te(x,v)),M.setAttribute("uv",new te(y,g)),M.setAttribute("faceIndex",new te(_,m)),t.push(M),i>Zi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function wl(s,t,e){const n=new tn(s,t,e);return n.texture.mapping=fo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function yr(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function G0(s,t,e){const n=new Float32Array(mi),i=new O(0,1,0);return new De({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function Sl(){return new De({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function bl(){return new De({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ec(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:zn,depthTest:!1,depthWrite:!1})}function ec(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function H0(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Da||c===Na,h=c===is||c===ss;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let u=t.get(a);return e===null&&(e=new Ba(s)),u=l?e.fromEquirectangular(a,u):e.fromCubemap(a,u),t.set(a,u),u.texture}else{if(t.has(a))return t.get(a).texture;{const u=a.image;if(l&&u&&u.height>0||h&&u&&i(u)){e===null&&(e=new Ba(s));const d=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,d),a.addEventListener("dispose",r),d.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function W0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function V0(s,t,e,n){const i={},r=new WeakMap;function o(u){const d=u.target;d.index!==null&&t.remove(d.index);for(const p in d.attributes)t.remove(d.attributes[p]);for(const p in d.morphAttributes){const v=d.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)t.remove(v[g])}d.removeEventListener("dispose",o),delete i[d.id];const f=r.get(d);f&&(t.remove(f),r.delete(d)),n.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,e.memory.geometries--}function a(u,d){return i[d.id]===!0||(d.addEventListener("dispose",o),i[d.id]=!0,e.memory.geometries++),d}function c(u){const d=u.attributes;for(const p in d)t.update(d[p],s.ARRAY_BUFFER);const f=u.morphAttributes;for(const p in f){const v=f[p];for(let g=0,m=v.length;g<m;g++)t.update(v[g],s.ARRAY_BUFFER)}}function l(u){const d=[],f=u.index,p=u.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let y=0,_=x.length;y<_;y+=3){const M=x[y+0],S=x[y+1],b=x[y+2];d.push(M,S,S,b,b,M)}}else if(p!==void 0){const x=p.array;v=p.version;for(let y=0,_=x.length/3-1;y<_;y+=3){const M=y+0,S=y+1,b=y+2;d.push(M,S,S,b,b,M)}}else return;const g=new(iu(d)?hu:lu)(d,1);g.version=v;const m=r.get(u);m&&t.remove(m),r.set(u,g)}function h(u){const d=r.get(u);if(d){const f=u.index;f!==null&&d.version<f.version&&l(u)}else l(u);return r.get(u)}return{get:a,update:c,getWireframeAttribute:h}}function X0(s,t,e,n){const i=n.isWebGL2;let r;function o(f){r=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,p){s.drawElements(r,p,a,f*c),e.update(p,r,1)}function u(f,p,v){if(v===0)return;let g,m;if(i)g=s,m="drawElementsInstanced";else if(g=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[m](r,p,a,f*c,v),e.update(p,r,v)}function d(f,p,v){if(v===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<v;m++)this.render(f[m]/c,p[m]);else{g.multiDrawElementsWEBGL(r,p,0,a,f,0,v);let m=0;for(let x=0;x<v;x++)m+=p[x];e.update(m,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=u,this.renderMultiDraw=d}function q0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Y0(s,t){return s[0]-t[0]}function j0(s,t){return Math.abs(t[1])-Math.abs(s[1])}function K0(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,o=new Ie,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,u){const d=l.morphTargetInfluences;if(t.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=p!==void 0?p.length:0;let g=r.get(h);if(g===void 0||g.count!==v){let D=function(){F.dispose(),r.delete(h),h.removeEventListener("dispose",D)};var f=D;g!==void 0&&g.texture.dispose();const y=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],R=h.morphAttributes.color||[];let w=0;y===!0&&(w=1),_===!0&&(w=2),M===!0&&(w=3);let E=h.attributes.position.count*w,U=1;E>t.maxTextureSize&&(U=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const I=new Float32Array(E*U*4*v),F=new ou(I,E,U,v);F.type=Jn,F.needsUpdate=!0;const C=w*4;for(let N=0;N<v;N++){const q=S[N],k=b[N],X=R[N],Z=E*U*4*N;for(let G=0;G<q.count;G++){const W=G*C;y===!0&&(o.fromBufferAttribute(q,G),I[Z+W+0]=o.x,I[Z+W+1]=o.y,I[Z+W+2]=o.z,I[Z+W+3]=0),_===!0&&(o.fromBufferAttribute(k,G),I[Z+W+4]=o.x,I[Z+W+5]=o.y,I[Z+W+6]=o.z,I[Z+W+7]=0),M===!0&&(o.fromBufferAttribute(X,G),I[Z+W+8]=o.x,I[Z+W+9]=o.y,I[Z+W+10]=o.z,I[Z+W+11]=X.itemSize===4?o.w:1)}}g={count:v,texture:F,size:new et(E,U)},r.set(h,g),h.addEventListener("dispose",D)}let m=0;for(let y=0;y<d.length;y++)m+=d[y];const x=h.morphTargetsRelative?1:1-m;u.getUniforms().setValue(s,"morphTargetBaseInfluence",x),u.getUniforms().setValue(s,"morphTargetInfluences",d),u.getUniforms().setValue(s,"morphTargetsTexture",g.texture,e),u.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}else{const p=d===void 0?0:d.length;let v=n[h.id];if(v===void 0||v.length!==p){v=[];for(let _=0;_<p;_++)v[_]=[_,0];n[h.id]=v}for(let _=0;_<p;_++){const M=v[_];M[0]=_,M[1]=d[_]}v.sort(j0);for(let _=0;_<8;_++)_<p&&v[_][1]?(a[_][0]=v[_][0],a[_][1]=v[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(Y0);const g=h.morphAttributes.position,m=h.morphAttributes.normal;let x=0;for(let _=0;_<8;_++){const M=a[_],S=M[0],b=M[1];S!==Number.MAX_SAFE_INTEGER&&b?(g&&h.getAttribute("morphTarget"+_)!==g[S]&&h.setAttribute("morphTarget"+_,g[S]),m&&h.getAttribute("morphNormal"+_)!==m[S]&&h.setAttribute("morphNormal"+_,m[S]),i[_]=b,x+=b):(g&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),m&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),i[_]=0)}const y=h.morphTargetsRelative?1:1-x;u.getUniforms().setValue(s,"morphTargetBaseInfluence",y),u.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function Z0(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,u=t.get(c,h);if(i.get(u)!==l&&(t.update(u),i.set(u,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const d=c.skeleton;i.get(d)!==l&&(d.update(),i.set(d,l))}return u}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class mu extends Ge{constructor(t,e,n,i,r,o,a,c,l,h){if(h=h!==void 0?h:xi,h!==xi&&h!==os)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===xi&&(n=Zn),n===void 0&&h===os&&(n=vi),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ue,this.minFilter=c!==void 0?c:Ue,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const gu=new Ge,vu=new mu(1,1);vu.compareFunction=nu;const xu=new ou,yu=new Nf,_u=new fu,El=[],Tl=[],Al=new Float32Array(16),Cl=new Float32Array(9),Rl=new Float32Array(4);function ds(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=El[i];if(r===void 0&&(r=new Float32Array(i),El[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function Te(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ae(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function mo(s,t){let e=Tl[t];e===void 0&&(e=new Int32Array(t),Tl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function J0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function Q0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2fv(this.addr,t),Ae(e,t)}}function $0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Te(e,t))return;s.uniform3fv(this.addr,t),Ae(e,t)}}function tg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4fv(this.addr,t),Ae(e,t)}}function eg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Rl.set(n),s.uniformMatrix2fv(this.addr,!1,Rl),Ae(e,n)}}function ng(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Cl.set(n),s.uniformMatrix3fv(this.addr,!1,Cl),Ae(e,n)}}function ig(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Te(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ae(e,t)}else{if(Te(e,n))return;Al.set(n),s.uniformMatrix4fv(this.addr,!1,Al),Ae(e,n)}}function sg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function rg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2iv(this.addr,t),Ae(e,t)}}function og(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3iv(this.addr,t),Ae(e,t)}}function ag(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4iv(this.addr,t),Ae(e,t)}}function cg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function lg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Te(e,t))return;s.uniform2uiv(this.addr,t),Ae(e,t)}}function hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Te(e,t))return;s.uniform3uiv(this.addr,t),Ae(e,t)}}function ug(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Te(e,t))return;s.uniform4uiv(this.addr,t),Ae(e,t)}}function dg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?vu:gu;e.setTexture2D(t||r,i)}function fg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||yu,i)}function pg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||_u,i)}function mg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||xu,i)}function gg(s){switch(s){case 5126:return J0;case 35664:return Q0;case 35665:return $0;case 35666:return tg;case 35674:return eg;case 35675:return ng;case 35676:return ig;case 5124:case 35670:return sg;case 35667:case 35671:return rg;case 35668:case 35672:return og;case 35669:case 35673:return ag;case 5125:return cg;case 36294:return lg;case 36295:return hg;case 36296:return ug;case 35678:case 36198:case 36298:case 36306:case 35682:return dg;case 35679:case 36299:case 36307:return fg;case 35680:case 36300:case 36308:case 36293:return pg;case 36289:case 36303:case 36311:case 36292:return mg}}function vg(s,t){s.uniform1fv(this.addr,t)}function xg(s,t){const e=ds(t,this.size,2);s.uniform2fv(this.addr,e)}function yg(s,t){const e=ds(t,this.size,3);s.uniform3fv(this.addr,e)}function _g(s,t){const e=ds(t,this.size,4);s.uniform4fv(this.addr,e)}function Mg(s,t){const e=ds(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function wg(s,t){const e=ds(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Sg(s,t){const e=ds(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function bg(s,t){s.uniform1iv(this.addr,t)}function Eg(s,t){s.uniform2iv(this.addr,t)}function Tg(s,t){s.uniform3iv(this.addr,t)}function Ag(s,t){s.uniform4iv(this.addr,t)}function Cg(s,t){s.uniform1uiv(this.addr,t)}function Rg(s,t){s.uniform2uiv(this.addr,t)}function Pg(s,t){s.uniform3uiv(this.addr,t)}function Lg(s,t){s.uniform4uiv(this.addr,t)}function Ig(s,t,e){const n=this.cache,i=t.length,r=mo(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||gu,r[o])}function Dg(s,t,e){const n=this.cache,i=t.length,r=mo(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||yu,r[o])}function Ng(s,t,e){const n=this.cache,i=t.length,r=mo(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||_u,r[o])}function Ug(s,t,e){const n=this.cache,i=t.length,r=mo(e,i);Te(n,r)||(s.uniform1iv(this.addr,r),Ae(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||xu,r[o])}function Fg(s){switch(s){case 5126:return vg;case 35664:return xg;case 35665:return yg;case 35666:return _g;case 35674:return Mg;case 35675:return wg;case 35676:return Sg;case 5124:case 35670:return bg;case 35667:case 35671:return Eg;case 35668:case 35672:return Tg;case 35669:case 35673:return Ag;case 5125:return Cg;case 36294:return Rg;case 36295:return Pg;case 36296:return Lg;case 35678:case 36198:case 36298:case 36306:case 35682:return Ig;case 35679:case 36299:case 36307:return Dg;case 35680:case 36300:case 36308:case 36293:return Ng;case 36289:case 36303:case 36311:case 36292:return Ug}}class Og{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=gg(e.type)}}class zg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Fg(e.type)}}class Bg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const na=/(\w+)(\])?(\[|\.)?/g;function Pl(s,t){s.seq.push(t),s.map[t.id]=t}function kg(s,t,e){const n=s.name,i=n.length;for(na.lastIndex=0;;){const r=na.exec(n),o=na.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Pl(e,l===void 0?new Og(a,s,t):new zg(a,s,t));break}else{let u=e.map[a];u===void 0&&(u=new Bg(a),Pl(e,u)),e=u}}}class no{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);kg(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Ll(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Gg=37297;let Hg=0;function Wg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Vg(s){const t=se.getPrimaries(se.workingColorSpace),e=se.getPrimaries(s);let n;switch(t===e?n="":t===ao&&e===oo?n="LinearDisplayP3ToLinearSRGB":t===oo&&e===ao&&(n="LinearSRGBToLinearDisplayP3"),s){case kn:case po:return[n,"LinearTransferOETF"];case Qt:case Ja:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Il(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Wg(s.getShaderSource(t),o)}else return i}function Xg(s,t){const e=Vg(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function qg(s,t){let e;switch(t){case Hh:e="Linear";break;case Wh:e="Reinhard";break;case Vh:e="OptimizedCineon";break;case Ka:e="ACESFilmic";break;case Xh:e="AgX";break;case Yd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Yg(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Ji).join(`
`)}function jg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Ji).join(`
`)}function Kg(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function Zg(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Ji(s){return s!==""}function Dl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Nl(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Jg=/^[ \t]*#include +<([\w\d./]+)>/gm;function ka(s){return s.replace(Jg,$g)}const Qg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function $g(s,t){let e=Xt[t];if(e===void 0){const n=Qg.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return ka(e)}const tv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Ul(s){return s.replace(tv,ev)}function ev(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Fl(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function nv(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Bh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===kh?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Fn&&(t="SHADOWMAP_TYPE_VSM"),t}function iv(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case is:case ss:t="ENVMAP_TYPE_CUBE";break;case fo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function sv(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ss:t="ENVMAP_MODE_REFRACTION";break}return t}function rv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Gh:t="ENVMAP_BLENDING_MULTIPLY";break;case Xd:t="ENVMAP_BLENDING_MIX";break;case qd:t="ENVMAP_BLENDING_ADD";break}return t}function ov(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function av(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=nv(e),l=iv(e),h=sv(e),u=rv(e),d=ov(e),f=e.isWebGL2?"":Yg(e),p=jg(e),v=Kg(r),g=i.createProgram();let m,x,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ji).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Ji).join(`
`),x.length>0&&(x+=`
`)):(m=[Fl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Ji).join(`
`),x=[f,Fl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Xt.tonemapping_pars_fragment:"",e.toneMapping!==$n?qg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,Xg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Ji).join(`
`)),o=ka(o),o=Dl(o,e),o=Nl(o,e),a=ka(a),a=Dl(a,e),a=Nl(a,e),o=Ul(o),a=Ul(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===el?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===el?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const _=y+m+o,M=y+x+a,S=Ll(i,i.VERTEX_SHADER,_),b=Ll(i,i.FRAGMENT_SHADER,M);i.attachShader(g,S),i.attachShader(g,b),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function R(I){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(g).trim(),C=i.getShaderInfoLog(S).trim(),D=i.getShaderInfoLog(b).trim();let N=!0,q=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(N=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,S,b);else{const k=Il(i,S,"vertex"),X=Il(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+F+`
`+k+`
`+X)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(C===""||D==="")&&(q=!1);q&&(I.diagnostics={runnable:N,programLog:F,vertexShader:{log:C,prefix:m},fragmentShader:{log:D,prefix:x}})}i.deleteShader(S),i.deleteShader(b),w=new no(i,g),E=Zg(i,g)}let w;this.getUniforms=function(){return w===void 0&&R(this),w};let E;this.getAttributes=function(){return E===void 0&&R(this),E};let U=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return U===!1&&(U=i.getProgramParameter(g,Gg)),U},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Hg++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=b,this}let cv=0;class lv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new hv(t),e.set(t,n)),n}}class hv{constructor(t){this.id=cv++,this.code=t,this.usedTimes=0}}function uv(s,t,e,n,i,r,o){const a=new au,c=new lv,l=[],h=i.isWebGL2,u=i.logarithmicDepthBuffer,d=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return w===0?"uv":`uv${w}`}function g(w,E,U,I,F){const C=I.fog,D=F.geometry,N=w.isMeshStandardMaterial?I.environment:null,q=(w.isMeshStandardMaterial?e:t).get(w.envMap||N),k=q&&q.mapping===fo?q.image.height:null,X=p[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const Z=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,G=Z!==void 0?Z.length:0;let W=0;D.morphAttributes.position!==void 0&&(W=1),D.morphAttributes.normal!==void 0&&(W=2),D.morphAttributes.color!==void 0&&(W=3);let Y,nt,ht,dt;if(X){const He=wn[X];Y=He.vertexShader,nt=He.fragmentShader}else Y=w.vertexShader,nt=w.fragmentShader,c.update(w),ht=c.getVertexShaderID(w),dt=c.getFragmentShaderID(w);const st=s.getRenderTarget(),vt=F.isInstancedMesh===!0,xt=F.isBatchedMesh===!0,ft=!!w.map,Mt=!!w.matcap,z=!!q,ct=!!w.aoMap,J=!!w.lightMap,lt=!!w.bumpMap,tt=!!w.normalMap,Pt=!!w.displacementMap,pt=!!w.emissiveMap,P=!!w.metalnessMap,A=!!w.roughnessMap,H=w.anisotropy>0,ot=w.clearcoat>0,rt=w.iridescence>0,it=w.sheen>0,yt=w.transmission>0,ut=H&&!!w.anisotropyMap,Et=ot&&!!w.clearcoatMap,Ut=ot&&!!w.clearcoatNormalMap,Gt=ot&&!!w.clearcoatRoughnessMap,at=rt&&!!w.iridescenceMap,$t=rt&&!!w.iridescenceThicknessMap,qt=it&&!!w.sheenColorMap,Bt=it&&!!w.sheenRoughnessMap,_t=!!w.specularMap,bt=!!w.specularColorMap,Ht=!!w.specularIntensityMap,ie=yt&&!!w.transmissionMap,xe=yt&&!!w.thicknessMap,jt=!!w.gradientMap,mt=!!w.alphaMap,B=w.alphaTest>0,wt=!!w.alphaHash,St=!!w.extensions,zt=!!D.attributes.uv1,Ft=!!D.attributes.uv2,ce=!!D.attributes.uv3;let le=$n;return w.toneMapped&&(st===null||st.isXRRenderTarget===!0)&&(le=s.toneMapping),{isWebGL2:h,shaderID:X,shaderType:w.type,shaderName:w.name,vertexShader:Y,fragmentShader:nt,defines:w.defines,customVertexShaderID:ht,customFragmentShaderID:dt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:xt,instancing:vt,instancingColor:vt&&F.instanceColor!==null,supportsVertexTextures:d,outputColorSpace:st===null?s.outputColorSpace:st.isXRRenderTarget===!0?st.texture.colorSpace:kn,map:ft,matcap:Mt,envMap:z,envMapMode:z&&q.mapping,envMapCubeUVHeight:k,aoMap:ct,lightMap:J,bumpMap:lt,normalMap:tt,displacementMap:d&&Pt,emissiveMap:pt,normalMapObjectSpace:tt&&w.normalMapType===of,normalMapTangentSpace:tt&&w.normalMapType===eu,metalnessMap:P,roughnessMap:A,anisotropy:H,anisotropyMap:ut,clearcoat:ot,clearcoatMap:Et,clearcoatNormalMap:Ut,clearcoatRoughnessMap:Gt,iridescence:rt,iridescenceMap:at,iridescenceThicknessMap:$t,sheen:it,sheenColorMap:qt,sheenRoughnessMap:Bt,specularMap:_t,specularColorMap:bt,specularIntensityMap:Ht,transmission:yt,transmissionMap:ie,thicknessMap:xe,gradientMap:jt,opaque:w.transparent===!1&&w.blending===ts,alphaMap:mt,alphaTest:B,alphaHash:wt,combine:w.combine,mapUv:ft&&v(w.map.channel),aoMapUv:ct&&v(w.aoMap.channel),lightMapUv:J&&v(w.lightMap.channel),bumpMapUv:lt&&v(w.bumpMap.channel),normalMapUv:tt&&v(w.normalMap.channel),displacementMapUv:Pt&&v(w.displacementMap.channel),emissiveMapUv:pt&&v(w.emissiveMap.channel),metalnessMapUv:P&&v(w.metalnessMap.channel),roughnessMapUv:A&&v(w.roughnessMap.channel),anisotropyMapUv:ut&&v(w.anisotropyMap.channel),clearcoatMapUv:Et&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Ut&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Gt&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:at&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:$t&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:qt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&v(w.sheenRoughnessMap.channel),specularMapUv:_t&&v(w.specularMap.channel),specularColorMapUv:bt&&v(w.specularColorMap.channel),specularIntensityMapUv:Ht&&v(w.specularIntensityMap.channel),transmissionMapUv:ie&&v(w.transmissionMap.channel),thicknessMapUv:xe&&v(w.thicknessMap.channel),alphaMapUv:mt&&v(w.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(tt||H),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:zt,vertexUv2s:Ft,vertexUv3s:ce,pointsUvs:F.isPoints===!0&&!!D.attributes.uv&&(ft||mt),fog:!!C,useFog:w.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:u,skinning:F.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:G,morphTextureStride:W,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&U.length>0,shadowMapType:s.shadowMap.type,toneMapping:le,useLegacyLights:s._useLegacyLights,decodeVideoTexture:ft&&w.map.isVideoTexture===!0&&se.getTransfer(w.map.colorSpace)===ue,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===be,flipSided:w.side===Ye,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:St&&w.extensions.derivatives===!0,extensionFragDepth:St&&w.extensions.fragDepth===!0,extensionDrawBuffers:St&&w.extensions.drawBuffers===!0,extensionShaderTextureLOD:St&&w.extensions.shaderTextureLOD===!0,extensionClipCullDistance:St&&w.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()}}function m(w){const E=[];if(w.shaderID?E.push(w.shaderID):(E.push(w.customVertexShaderID),E.push(w.customFragmentShaderID)),w.defines!==void 0)for(const U in w.defines)E.push(U),E.push(w.defines[U]);return w.isRawShaderMaterial===!1&&(x(E,w),y(E,w),E.push(s.outputColorSpace)),E.push(w.customProgramCacheKey),E.join()}function x(w,E){w.push(E.precision),w.push(E.outputColorSpace),w.push(E.envMapMode),w.push(E.envMapCubeUVHeight),w.push(E.mapUv),w.push(E.alphaMapUv),w.push(E.lightMapUv),w.push(E.aoMapUv),w.push(E.bumpMapUv),w.push(E.normalMapUv),w.push(E.displacementMapUv),w.push(E.emissiveMapUv),w.push(E.metalnessMapUv),w.push(E.roughnessMapUv),w.push(E.anisotropyMapUv),w.push(E.clearcoatMapUv),w.push(E.clearcoatNormalMapUv),w.push(E.clearcoatRoughnessMapUv),w.push(E.iridescenceMapUv),w.push(E.iridescenceThicknessMapUv),w.push(E.sheenColorMapUv),w.push(E.sheenRoughnessMapUv),w.push(E.specularMapUv),w.push(E.specularColorMapUv),w.push(E.specularIntensityMapUv),w.push(E.transmissionMapUv),w.push(E.thicknessMapUv),w.push(E.combine),w.push(E.fogExp2),w.push(E.sizeAttenuation),w.push(E.morphTargetsCount),w.push(E.morphAttributeCount),w.push(E.numDirLights),w.push(E.numPointLights),w.push(E.numSpotLights),w.push(E.numSpotLightMaps),w.push(E.numHemiLights),w.push(E.numRectAreaLights),w.push(E.numDirLightShadows),w.push(E.numPointLightShadows),w.push(E.numSpotLightShadows),w.push(E.numSpotLightShadowsWithMaps),w.push(E.numLightProbes),w.push(E.shadowMapType),w.push(E.toneMapping),w.push(E.numClippingPlanes),w.push(E.numClipIntersection),w.push(E.depthPacking)}function y(w,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),w.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),w.push(a.mask)}function _(w){const E=p[w.type];let U;if(E){const I=wn[E];U=Bn.clone(I.uniforms)}else U=w.uniforms;return U}function M(w,E){let U;for(let I=0,F=l.length;I<F;I++){const C=l[I];if(C.cacheKey===E){U=C,++U.usedTimes;break}}return U===void 0&&(U=new av(s,E,w,r),l.push(U)),U}function S(w){if(--w.usedTimes===0){const E=l.indexOf(w);l[E]=l[l.length-1],l.pop(),w.destroy()}}function b(w){c.remove(w)}function R(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:_,acquireProgram:M,releaseProgram:S,releaseShaderCache:b,programs:l,dispose:R}}function dv(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function fv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Ol(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function zl(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(u,d,f,p,v,g){let m=s[t];return m===void 0?(m={id:u.id,object:u,geometry:d,material:f,groupOrder:p,renderOrder:u.renderOrder,z:v,group:g},s[t]=m):(m.id=u.id,m.object=u,m.geometry=d,m.material=f,m.groupOrder=p,m.renderOrder=u.renderOrder,m.z=v,m.group=g),t++,m}function a(u,d,f,p,v,g){const m=o(u,d,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(u,d,f,p,v,g){const m=o(u,d,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(u,d){e.length>1&&e.sort(u||fv),n.length>1&&n.sort(d||Ol),i.length>1&&i.sort(d||Ol)}function h(){for(let u=t,d=s.length;u<d;u++){const f=s[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function pv(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new zl,s.set(n,[o])):i>=r.length?(o=new zl,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function mv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new It};break;case"SpotLight":e={position:new O,direction:new O,color:new It,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new It,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new It,groundColor:new It};break;case"RectAreaLight":e={color:new It,position:new O,halfWidth:new O,halfHeight:new O};break}return s[t.id]=e,e}}}function gv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new et,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let vv=0;function xv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function yv(s,t){const e=new mv,n=gv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new O);const r=new O,o=new ee,a=new ee;function c(h,u){let d=0,f=0,p=0;for(let I=0;I<9;I++)i.probe[I].set(0,0,0);let v=0,g=0,m=0,x=0,y=0,_=0,M=0,S=0,b=0,R=0,w=0;h.sort(xv);const E=u===!0?Math.PI:1;for(let I=0,F=h.length;I<F;I++){const C=h[I],D=C.color,N=C.intensity,q=C.distance,k=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)d+=D.r*N*E,f+=D.g*N*E,p+=D.b*N*E;else if(C.isLightProbe){for(let X=0;X<9;X++)i.probe[X].addScaledVector(C.sh.coefficients[X],N);w++}else if(C.isDirectionalLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity*E),C.castShadow){const Z=C.shadow,G=n.get(C);G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,i.directionalShadow[v]=G,i.directionalShadowMap[v]=k,i.directionalShadowMatrix[v]=C.shadow.matrix,_++}i.directional[v]=X,v++}else if(C.isSpotLight){const X=e.get(C);X.position.setFromMatrixPosition(C.matrixWorld),X.color.copy(D).multiplyScalar(N*E),X.distance=q,X.coneCos=Math.cos(C.angle),X.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),X.decay=C.decay,i.spot[m]=X;const Z=C.shadow;if(C.map&&(i.spotLightMap[b]=C.map,b++,Z.updateMatrices(C),C.castShadow&&R++),i.spotLightMatrix[m]=Z.matrix,C.castShadow){const G=n.get(C);G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,i.spotShadow[m]=G,i.spotShadowMap[m]=k,S++}m++}else if(C.isRectAreaLight){const X=e.get(C);X.color.copy(D).multiplyScalar(N),X.halfWidth.set(C.width*.5,0,0),X.halfHeight.set(0,C.height*.5,0),i.rectArea[x]=X,x++}else if(C.isPointLight){const X=e.get(C);if(X.color.copy(C.color).multiplyScalar(C.intensity*E),X.distance=C.distance,X.decay=C.decay,C.castShadow){const Z=C.shadow,G=n.get(C);G.shadowBias=Z.bias,G.shadowNormalBias=Z.normalBias,G.shadowRadius=Z.radius,G.shadowMapSize=Z.mapSize,G.shadowCameraNear=Z.camera.near,G.shadowCameraFar=Z.camera.far,i.pointShadow[g]=G,i.pointShadowMap[g]=k,i.pointShadowMatrix[g]=C.shadow.matrix,M++}i.point[g]=X,g++}else if(C.isHemisphereLight){const X=e.get(C);X.skyColor.copy(C.color).multiplyScalar(N*E),X.groundColor.copy(C.groundColor).multiplyScalar(N*E),i.hemi[y]=X,y++}}x>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2):(i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_FLOAT_1,i.rectAreaLTC2=gt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=gt.LTC_HALF_1,i.rectAreaLTC2=gt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=d,i.ambient[1]=f,i.ambient[2]=p;const U=i.hash;(U.directionalLength!==v||U.pointLength!==g||U.spotLength!==m||U.rectAreaLength!==x||U.hemiLength!==y||U.numDirectionalShadows!==_||U.numPointShadows!==M||U.numSpotShadows!==S||U.numSpotMaps!==b||U.numLightProbes!==w)&&(i.directional.length=v,i.spot.length=m,i.rectArea.length=x,i.point.length=g,i.hemi.length=y,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+b-R,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=R,i.numLightProbes=w,U.directionalLength=v,U.pointLength=g,U.spotLength=m,U.rectAreaLength=x,U.hemiLength=y,U.numDirectionalShadows=_,U.numPointShadows=M,U.numSpotShadows=S,U.numSpotMaps=b,U.numLightProbes=w,i.version=vv++)}function l(h,u){let d=0,f=0,p=0,v=0,g=0;const m=u.matrixWorldInverse;for(let x=0,y=h.length;x<y;x++){const _=h[x];if(_.isDirectionalLight){const M=i.directional[d];M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),d++}else if(_.isSpotLight){const M=i.spot[p];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(m),M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(m),p++}else if(_.isRectAreaLight){const M=i.rectArea[v];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(m),a.identity(),o.copy(_.matrixWorld),o.premultiply(m),a.extractRotation(o),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),v++}else if(_.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(m),f++}else if(_.isHemisphereLight){const M=i.hemi[g];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(m),g++}}}return{setup:c,setupView:l,state:i}}function Bl(s,t){const e=new yv(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function o(u){n.push(u)}function a(u){i.push(u)}function c(u){e.setup(n,u)}function l(u){e.setupView(n,u)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function _v(s,t){let e=new WeakMap;function n(r,o=0){const a=e.get(r);let c;return a===void 0?(c=new Bl(s,t),e.set(r,[c])):o>=a.length?(c=new Bl(s,t),a.push(c)):c=a[o],c}function i(){e=new WeakMap}return{get:n,dispose:i}}class Mv extends hs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=sf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class wv extends hs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Sv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,bv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ev(s,t,e){let n=new $a;const i=new et,r=new et,o=new Ie,a=new Mv({depthPacking:rf}),c=new wv,l={},h=e.maxTextureSize,u={[ei]:Ye,[Ye]:ei,[be]:be},d=new De({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new et},radius:{value:4}},vertexShader:Sv,fragmentShader:bv}),f=d.clone();f.defines.HORIZONTAL_PASS=1;const p=new oe;p.setAttribute("position",new te(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $(p,d),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Bh;let m=this.type;this.render=function(S,b,R){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const w=s.getRenderTarget(),E=s.getActiveCubeFace(),U=s.getActiveMipmapLevel(),I=s.state;I.setBlending(zn),I.buffers.color.setClear(1,1,1,1),I.buffers.depth.setTest(!0),I.setScissorTest(!1);const F=m!==Fn&&this.type===Fn,C=m===Fn&&this.type!==Fn;for(let D=0,N=S.length;D<N;D++){const q=S[D],k=q.shadow;if(k===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(k.autoUpdate===!1&&k.needsUpdate===!1)continue;i.copy(k.mapSize);const X=k.getFrameExtents();if(i.multiply(X),r.copy(k.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/X.x),i.x=r.x*X.x,k.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/X.y),i.y=r.y*X.y,k.mapSize.y=r.y)),k.map===null||F===!0||C===!0){const G=this.type!==Fn?{minFilter:Ue,magFilter:Ue}:{};k.map!==null&&k.map.dispose(),k.map=new tn(i.x,i.y,G),k.map.texture.name=q.name+".shadowMap",k.camera.updateProjectionMatrix()}s.setRenderTarget(k.map),s.clear();const Z=k.getViewportCount();for(let G=0;G<Z;G++){const W=k.getViewport(G);o.set(r.x*W.x,r.y*W.y,r.x*W.z,r.y*W.w),I.viewport(o),k.updateMatrices(q,G),n=k.getFrustum(),_(b,R,k.camera,q,this.type)}k.isPointLightShadow!==!0&&this.type===Fn&&x(k,R),k.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(w,E,U)};function x(S,b){const R=t.update(v);d.defines.VSM_SAMPLES!==S.blurSamples&&(d.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new tn(i.x,i.y)),d.uniforms.shadow_pass.value=S.map.texture,d.uniforms.resolution.value=S.mapSize,d.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(b,null,R,d,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(b,null,R,f,v,null)}function y(S,b,R,w){let E=null;const U=R.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(U!==void 0)E=U;else if(E=R.isPointLight===!0?c:a,s.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const I=E.uuid,F=b.uuid;let C=l[I];C===void 0&&(C={},l[I]=C);let D=C[F];D===void 0&&(D=E.clone(),C[F]=D,b.addEventListener("dispose",M)),E=D}if(E.visible=b.visible,E.wireframe=b.wireframe,w===Fn?E.side=b.shadowSide!==null?b.shadowSide:b.side:E.side=b.shadowSide!==null?b.shadowSide:u[b.side],E.alphaMap=b.alphaMap,E.alphaTest=b.alphaTest,E.map=b.map,E.clipShadows=b.clipShadows,E.clippingPlanes=b.clippingPlanes,E.clipIntersection=b.clipIntersection,E.displacementMap=b.displacementMap,E.displacementScale=b.displacementScale,E.displacementBias=b.displacementBias,E.wireframeLinewidth=b.wireframeLinewidth,E.linewidth=b.linewidth,R.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const I=s.properties.get(E);I.light=R}return E}function _(S,b,R,w,E){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&E===Fn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(R.matrixWorldInverse,S.matrixWorld);const F=t.update(S),C=S.material;if(Array.isArray(C)){const D=F.groups;for(let N=0,q=D.length;N<q;N++){const k=D[N],X=C[k.materialIndex];if(X&&X.visible){const Z=y(S,X,w,E);S.onBeforeShadow(s,S,b,R,F,Z,k),s.renderBufferDirect(R,null,F,Z,S,k),S.onAfterShadow(s,S,b,R,F,Z,k)}}}else if(C.visible){const D=y(S,C,w,E);S.onBeforeShadow(s,S,b,R,F,D,null),s.renderBufferDirect(R,null,F,D,S,null),S.onAfterShadow(s,S,b,R,F,D,null)}}const I=S.children;for(let F=0,C=I.length;F<C;F++)_(I[F],b,R,w,E)}function M(S){S.target.removeEventListener("dispose",M);for(const R in l){const w=l[R],E=S.target.uuid;E in w&&(w[E].dispose(),delete w[E])}}}function Tv(s,t,e){const n=e.isWebGL2;function i(){let B=!1;const wt=new Ie;let St=null;const zt=new Ie(0,0,0,0);return{setMask:function(Ft){St!==Ft&&!B&&(s.colorMask(Ft,Ft,Ft,Ft),St=Ft)},setLocked:function(Ft){B=Ft},setClear:function(Ft,ce,le,Ce,He){He===!0&&(Ft*=Ce,ce*=Ce,le*=Ce),wt.set(Ft,ce,le,Ce),zt.equals(wt)===!1&&(s.clearColor(Ft,ce,le,Ce),zt.copy(wt))},reset:function(){B=!1,St=null,zt.set(-1,0,0,0)}}}function r(){let B=!1,wt=null,St=null,zt=null;return{setTest:function(Ft){Ft?xt(s.DEPTH_TEST):ft(s.DEPTH_TEST)},setMask:function(Ft){wt!==Ft&&!B&&(s.depthMask(Ft),wt=Ft)},setFunc:function(Ft){if(St!==Ft){switch(Ft){case zd:s.depthFunc(s.NEVER);break;case Bd:s.depthFunc(s.ALWAYS);break;case kd:s.depthFunc(s.LESS);break;case so:s.depthFunc(s.LEQUAL);break;case Gd:s.depthFunc(s.EQUAL);break;case Hd:s.depthFunc(s.GEQUAL);break;case Wd:s.depthFunc(s.GREATER);break;case Vd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}St=Ft}},setLocked:function(Ft){B=Ft},setClear:function(Ft){zt!==Ft&&(s.clearDepth(Ft),zt=Ft)},reset:function(){B=!1,wt=null,St=null,zt=null}}}function o(){let B=!1,wt=null,St=null,zt=null,Ft=null,ce=null,le=null,Ce=null,He=null;return{setTest:function(he){B||(he?xt(s.STENCIL_TEST):ft(s.STENCIL_TEST))},setMask:function(he){wt!==he&&!B&&(s.stencilMask(he),wt=he)},setFunc:function(he,We,xn){(St!==he||zt!==We||Ft!==xn)&&(s.stencilFunc(he,We,xn),St=he,zt=We,Ft=xn)},setOp:function(he,We,xn){(ce!==he||le!==We||Ce!==xn)&&(s.stencilOp(he,We,xn),ce=he,le=We,Ce=xn)},setLocked:function(he){B=he},setClear:function(he){He!==he&&(s.clearStencil(he),He=he)},reset:function(){B=!1,wt=null,St=null,zt=null,Ft=null,ce=null,le=null,Ce=null,He=null}}}const a=new i,c=new r,l=new o,h=new WeakMap,u=new WeakMap;let d={},f={},p=new WeakMap,v=[],g=null,m=!1,x=null,y=null,_=null,M=null,S=null,b=null,R=null,w=new It(0,0,0),E=0,U=!1,I=null,F=null,C=null,D=null,N=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let k=!1,X=0;const Z=s.getParameter(s.VERSION);Z.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(Z)[1]),k=X>=1):Z.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(Z)[1]),k=X>=2);let G=null,W={};const Y=s.getParameter(s.SCISSOR_BOX),nt=s.getParameter(s.VIEWPORT),ht=new Ie().fromArray(Y),dt=new Ie().fromArray(nt);function st(B,wt,St,zt){const Ft=new Uint8Array(4),ce=s.createTexture();s.bindTexture(B,ce),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let le=0;le<St;le++)n&&(B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY)?s.texImage3D(wt,0,s.RGBA,1,1,zt,0,s.RGBA,s.UNSIGNED_BYTE,Ft):s.texImage2D(wt+le,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ft);return ce}const vt={};vt[s.TEXTURE_2D]=st(s.TEXTURE_2D,s.TEXTURE_2D,1),vt[s.TEXTURE_CUBE_MAP]=st(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(vt[s.TEXTURE_2D_ARRAY]=st(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),vt[s.TEXTURE_3D]=st(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),xt(s.DEPTH_TEST),c.setFunc(so),pt(!1),P(Sc),xt(s.CULL_FACE),tt(zn);function xt(B){d[B]!==!0&&(s.enable(B),d[B]=!0)}function ft(B){d[B]!==!1&&(s.disable(B),d[B]=!1)}function Mt(B,wt){return f[B]!==wt?(s.bindFramebuffer(B,wt),f[B]=wt,n&&(B===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=wt),B===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=wt)),!0):!1}function z(B,wt){let St=v,zt=!1;if(B)if(St=p.get(wt),St===void 0&&(St=[],p.set(wt,St)),B.isWebGLMultipleRenderTargets){const Ft=B.texture;if(St.length!==Ft.length||St[0]!==s.COLOR_ATTACHMENT0){for(let ce=0,le=Ft.length;ce<le;ce++)St[ce]=s.COLOR_ATTACHMENT0+ce;St.length=Ft.length,zt=!0}}else St[0]!==s.COLOR_ATTACHMENT0&&(St[0]=s.COLOR_ATTACHMENT0,zt=!0);else St[0]!==s.BACK&&(St[0]=s.BACK,zt=!0);zt&&(e.isWebGL2?s.drawBuffers(St):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(St))}function ct(B){return g!==B?(s.useProgram(B),g=B,!0):!1}const J={[pi]:s.FUNC_ADD,[Sd]:s.FUNC_SUBTRACT,[bd]:s.FUNC_REVERSE_SUBTRACT};if(n)J[Tc]=s.MIN,J[Ac]=s.MAX;else{const B=t.get("EXT_blend_minmax");B!==null&&(J[Tc]=B.MIN_EXT,J[Ac]=B.MAX_EXT)}const lt={[Ed]:s.ZERO,[Td]:s.ONE,[Ad]:s.SRC_COLOR,[La]:s.SRC_ALPHA,[Dd]:s.SRC_ALPHA_SATURATE,[Ld]:s.DST_COLOR,[Rd]:s.DST_ALPHA,[Cd]:s.ONE_MINUS_SRC_COLOR,[Ia]:s.ONE_MINUS_SRC_ALPHA,[Id]:s.ONE_MINUS_DST_COLOR,[Pd]:s.ONE_MINUS_DST_ALPHA,[Nd]:s.CONSTANT_COLOR,[Ud]:s.ONE_MINUS_CONSTANT_COLOR,[Fd]:s.CONSTANT_ALPHA,[Od]:s.ONE_MINUS_CONSTANT_ALPHA};function tt(B,wt,St,zt,Ft,ce,le,Ce,He,he){if(B===zn){m===!0&&(ft(s.BLEND),m=!1);return}if(m===!1&&(xt(s.BLEND),m=!0),B!==wd){if(B!==x||he!==U){if((y!==pi||S!==pi)&&(s.blendEquation(s.FUNC_ADD),y=pi,S=pi),he)switch(B){case ts:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pa:s.blendFunc(s.ONE,s.ONE);break;case bc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ec:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case ts:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pa:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case bc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ec:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}_=null,M=null,b=null,R=null,w.set(0,0,0),E=0,x=B,U=he}return}Ft=Ft||wt,ce=ce||St,le=le||zt,(wt!==y||Ft!==S)&&(s.blendEquationSeparate(J[wt],J[Ft]),y=wt,S=Ft),(St!==_||zt!==M||ce!==b||le!==R)&&(s.blendFuncSeparate(lt[St],lt[zt],lt[ce],lt[le]),_=St,M=zt,b=ce,R=le),(Ce.equals(w)===!1||He!==E)&&(s.blendColor(Ce.r,Ce.g,Ce.b,He),w.copy(Ce),E=He),x=B,U=!1}function Pt(B,wt){B.side===be?ft(s.CULL_FACE):xt(s.CULL_FACE);let St=B.side===Ye;wt&&(St=!St),pt(St),B.blending===ts&&B.transparent===!1?tt(zn):tt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),c.setFunc(B.depthFunc),c.setTest(B.depthTest),c.setMask(B.depthWrite),a.setMask(B.colorWrite);const zt=B.stencilWrite;l.setTest(zt),zt&&(l.setMask(B.stencilWriteMask),l.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),l.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),H(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?xt(s.SAMPLE_ALPHA_TO_COVERAGE):ft(s.SAMPLE_ALPHA_TO_COVERAGE)}function pt(B){I!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),I=B)}function P(B){B!==_d?(xt(s.CULL_FACE),B!==F&&(B===Sc?s.cullFace(s.BACK):B===Md?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):ft(s.CULL_FACE),F=B}function A(B){B!==C&&(k&&s.lineWidth(B),C=B)}function H(B,wt,St){B?(xt(s.POLYGON_OFFSET_FILL),(D!==wt||N!==St)&&(s.polygonOffset(wt,St),D=wt,N=St)):ft(s.POLYGON_OFFSET_FILL)}function ot(B){B?xt(s.SCISSOR_TEST):ft(s.SCISSOR_TEST)}function rt(B){B===void 0&&(B=s.TEXTURE0+q-1),G!==B&&(s.activeTexture(B),G=B)}function it(B,wt,St){St===void 0&&(G===null?St=s.TEXTURE0+q-1:St=G);let zt=W[St];zt===void 0&&(zt={type:void 0,texture:void 0},W[St]=zt),(zt.type!==B||zt.texture!==wt)&&(G!==St&&(s.activeTexture(St),G=St),s.bindTexture(B,wt||vt[B]),zt.type=B,zt.texture=wt)}function yt(){const B=W[G];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function ut(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Et(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ut(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Gt(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function $t(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function qt(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Bt(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _t(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function bt(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ht(B){ht.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),ht.copy(B))}function ie(B){dt.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),dt.copy(B))}function xe(B,wt){let St=u.get(wt);St===void 0&&(St=new WeakMap,u.set(wt,St));let zt=St.get(B);zt===void 0&&(zt=s.getUniformBlockIndex(wt,B.name),St.set(B,zt))}function jt(B,wt){const zt=u.get(wt).get(B);h.get(wt)!==zt&&(s.uniformBlockBinding(wt,zt,B.__bindingPointIndex),h.set(wt,zt))}function mt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),d={},G=null,W={},f={},p=new WeakMap,v=[],g=null,m=!1,x=null,y=null,_=null,M=null,S=null,b=null,R=null,w=new It(0,0,0),E=0,U=!1,I=null,F=null,C=null,D=null,N=null,ht.set(0,0,s.canvas.width,s.canvas.height),dt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:xt,disable:ft,bindFramebuffer:Mt,drawBuffers:z,useProgram:ct,setBlending:tt,setMaterial:Pt,setFlipSided:pt,setCullFace:P,setLineWidth:A,setPolygonOffset:H,setScissorTest:ot,activeTexture:rt,bindTexture:it,unbindTexture:yt,compressedTexImage2D:ut,compressedTexImage3D:Et,texImage2D:_t,texImage3D:bt,updateUBOMapping:xe,uniformBlockBinding:jt,texStorage2D:qt,texStorage3D:Bt,texSubImage2D:Ut,texSubImage3D:Gt,compressedTexSubImage2D:at,compressedTexSubImage3D:$t,scissor:Ht,viewport:ie,reset:mt}}function Av(s,t,e,n,i,r,o){const a=i.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let u;const d=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(P,A){return f?new OffscreenCanvas(P,A):ho("canvas")}function v(P,A,H,ot){let rt=1;if((P.width>ot||P.height>ot)&&(rt=ot/Math.max(P.width,P.height)),rt<1||A===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const it=A?lo:Math.floor,yt=it(rt*P.width),ut=it(rt*P.height);u===void 0&&(u=p(yt,ut));const Et=H?p(yt,ut):u;return Et.width=yt,Et.height=ut,Et.getContext("2d").drawImage(P,0,0,yt,ut),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+yt+"x"+ut+")."),Et}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function g(P){return za(P.width)&&za(P.height)}function m(P){return a?!1:P.wrapS!==pn||P.wrapT!==pn||P.minFilter!==Ue&&P.minFilter!==Ke}function x(P,A){return P.generateMipmaps&&A&&P.minFilter!==Ue&&P.minFilter!==Ke}function y(P){s.generateMipmap(P)}function _(P,A,H,ot,rt=!1){if(a===!1)return A;if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let it=A;if(A===s.RED&&(H===s.FLOAT&&(it=s.R32F),H===s.HALF_FLOAT&&(it=s.R16F),H===s.UNSIGNED_BYTE&&(it=s.R8)),A===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(it=s.R8UI),H===s.UNSIGNED_SHORT&&(it=s.R16UI),H===s.UNSIGNED_INT&&(it=s.R32UI),H===s.BYTE&&(it=s.R8I),H===s.SHORT&&(it=s.R16I),H===s.INT&&(it=s.R32I)),A===s.RG&&(H===s.FLOAT&&(it=s.RG32F),H===s.HALF_FLOAT&&(it=s.RG16F),H===s.UNSIGNED_BYTE&&(it=s.RG8)),A===s.RGBA){const yt=rt?ro:se.getTransfer(ot);H===s.FLOAT&&(it=s.RGBA32F),H===s.HALF_FLOAT&&(it=s.RGBA16F),H===s.UNSIGNED_BYTE&&(it=yt===ue?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT_4_4_4_4&&(it=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(it=s.RGB5_A1)}return(it===s.R16F||it===s.R32F||it===s.RG16F||it===s.RG32F||it===s.RGBA16F||it===s.RGBA32F)&&t.get("EXT_color_buffer_float"),it}function M(P,A,H){return x(P,H)===!0||P.isFramebufferTexture&&P.minFilter!==Ue&&P.minFilter!==Ke?Math.log2(Math.max(A.width,A.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?A.mipmaps.length:1}function S(P){return P===Ue||P===Cc||P===Ro?s.NEAREST:s.LINEAR}function b(P){const A=P.target;A.removeEventListener("dispose",b),w(A),A.isVideoTexture&&h.delete(A)}function R(P){const A=P.target;A.removeEventListener("dispose",R),U(A)}function w(P){const A=n.get(P);if(A.__webglInit===void 0)return;const H=P.source,ot=d.get(H);if(ot){const rt=ot[A.__cacheKey];rt.usedTimes--,rt.usedTimes===0&&E(P),Object.keys(ot).length===0&&d.delete(H)}n.remove(P)}function E(P){const A=n.get(P);s.deleteTexture(A.__webglTexture);const H=P.source,ot=d.get(H);delete ot[A.__cacheKey],o.memory.textures--}function U(P){const A=P.texture,H=n.get(P),ot=n.get(A);if(ot.__webglTexture!==void 0&&(s.deleteTexture(ot.__webglTexture),o.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let rt=0;rt<6;rt++){if(Array.isArray(H.__webglFramebuffer[rt]))for(let it=0;it<H.__webglFramebuffer[rt].length;it++)s.deleteFramebuffer(H.__webglFramebuffer[rt][it]);else s.deleteFramebuffer(H.__webglFramebuffer[rt]);H.__webglDepthbuffer&&s.deleteRenderbuffer(H.__webglDepthbuffer[rt])}else{if(Array.isArray(H.__webglFramebuffer))for(let rt=0;rt<H.__webglFramebuffer.length;rt++)s.deleteFramebuffer(H.__webglFramebuffer[rt]);else s.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&s.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&s.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let rt=0;rt<H.__webglColorRenderbuffer.length;rt++)H.__webglColorRenderbuffer[rt]&&s.deleteRenderbuffer(H.__webglColorRenderbuffer[rt]);H.__webglDepthRenderbuffer&&s.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let rt=0,it=A.length;rt<it;rt++){const yt=n.get(A[rt]);yt.__webglTexture&&(s.deleteTexture(yt.__webglTexture),o.memory.textures--),n.remove(A[rt])}n.remove(A),n.remove(P)}let I=0;function F(){I=0}function C(){const P=I;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),I+=1,P}function D(P){const A=[];return A.push(P.wrapS),A.push(P.wrapT),A.push(P.wrapR||0),A.push(P.magFilter),A.push(P.minFilter),A.push(P.anisotropy),A.push(P.internalFormat),A.push(P.format),A.push(P.type),A.push(P.generateMipmaps),A.push(P.premultiplyAlpha),A.push(P.flipY),A.push(P.unpackAlignment),A.push(P.colorSpace),A.join()}function N(P,A){const H=n.get(P);if(P.isVideoTexture&&Pt(P),P.isRenderTargetTexture===!1&&P.version>0&&H.__version!==P.version){const ot=P.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ht(H,P,A);return}}e.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+A)}function q(P,A){const H=n.get(P);if(P.version>0&&H.__version!==P.version){ht(H,P,A);return}e.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+A)}function k(P,A){const H=n.get(P);if(P.version>0&&H.__version!==P.version){ht(H,P,A);return}e.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+A)}function X(P,A){const H=n.get(P);if(P.version>0&&H.__version!==P.version){dt(H,P,A);return}e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+A)}const Z={[Ee]:s.REPEAT,[pn]:s.CLAMP_TO_EDGE,[Ua]:s.MIRRORED_REPEAT},G={[Ue]:s.NEAREST,[Cc]:s.NEAREST_MIPMAP_NEAREST,[Ro]:s.NEAREST_MIPMAP_LINEAR,[Ke]:s.LINEAR,[jd]:s.LINEAR_MIPMAP_NEAREST,[rs]:s.LINEAR_MIPMAP_LINEAR},W={[af]:s.NEVER,[ff]:s.ALWAYS,[cf]:s.LESS,[nu]:s.LEQUAL,[lf]:s.EQUAL,[df]:s.GEQUAL,[hf]:s.GREATER,[uf]:s.NOTEQUAL};function Y(P,A,H){if(H?(s.texParameteri(P,s.TEXTURE_WRAP_S,Z[A.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,Z[A.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,Z[A.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,G[A.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,G[A.minFilter])):(s.texParameteri(P,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(P,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(A.wrapS!==pn||A.wrapT!==pn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(P,s.TEXTURE_MAG_FILTER,S(A.magFilter)),s.texParameteri(P,s.TEXTURE_MIN_FILTER,S(A.minFilter)),A.minFilter!==Ue&&A.minFilter!==Ke&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,W[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const ot=t.get("EXT_texture_filter_anisotropic");if(A.magFilter===Ue||A.minFilter!==Ro&&A.minFilter!==rs||A.type===Jn&&t.has("OES_texture_float_linear")===!1||a===!1&&A.type===vn&&t.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(s.texParameterf(P,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function nt(P,A){let H=!1;P.__webglInit===void 0&&(P.__webglInit=!0,A.addEventListener("dispose",b));const ot=A.source;let rt=d.get(ot);rt===void 0&&(rt={},d.set(ot,rt));const it=D(A);if(it!==P.__cacheKey){rt[it]===void 0&&(rt[it]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,H=!0),rt[it].usedTimes++;const yt=rt[P.__cacheKey];yt!==void 0&&(rt[P.__cacheKey].usedTimes--,yt.usedTimes===0&&E(A)),P.__cacheKey=it,P.__webglTexture=rt[it].texture}return H}function ht(P,A,H){let ot=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ot=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ot=s.TEXTURE_3D);const rt=nt(P,A),it=A.source;e.bindTexture(ot,P.__webglTexture,s.TEXTURE0+H);const yt=n.get(it);if(it.version!==yt.__version||rt===!0){e.activeTexture(s.TEXTURE0+H);const ut=se.getPrimaries(se.workingColorSpace),Et=A.colorSpace===ln?null:se.getPrimaries(A.colorSpace),Ut=A.colorSpace===ln||ut===Et?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ut);const Gt=m(A)&&g(A.image)===!1;let at=v(A.image,Gt,!1,i.maxTextureSize);at=pt(A,at);const $t=g(at)||a,qt=r.convert(A.format,A.colorSpace);let Bt=r.convert(A.type),_t=_(A.internalFormat,qt,Bt,A.colorSpace,A.isVideoTexture);Y(ot,A,$t);let bt;const Ht=A.mipmaps,ie=a&&A.isVideoTexture!==!0&&_t!==$h,xe=yt.__version===void 0||rt===!0,jt=M(A,at,$t);if(A.isDepthTexture)_t=s.DEPTH_COMPONENT,a?A.type===Jn?_t=s.DEPTH_COMPONENT32F:A.type===Zn?_t=s.DEPTH_COMPONENT24:A.type===vi?_t=s.DEPTH24_STENCIL8:_t=s.DEPTH_COMPONENT16:A.type===Jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===xi&&_t===s.DEPTH_COMPONENT&&A.type!==Za&&A.type!==Zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Zn,Bt=r.convert(A.type)),A.format===os&&_t===s.DEPTH_COMPONENT&&(_t=s.DEPTH_STENCIL,A.type!==vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=vi,Bt=r.convert(A.type))),xe&&(ie?e.texStorage2D(s.TEXTURE_2D,1,_t,at.width,at.height):e.texImage2D(s.TEXTURE_2D,0,_t,at.width,at.height,0,qt,Bt,null));else if(A.isDataTexture)if(Ht.length>0&&$t){ie&&xe&&e.texStorage2D(s.TEXTURE_2D,jt,_t,Ht[0].width,Ht[0].height);for(let mt=0,B=Ht.length;mt<B;mt++)bt=Ht[mt],ie?e.texSubImage2D(s.TEXTURE_2D,mt,0,0,bt.width,bt.height,qt,Bt,bt.data):e.texImage2D(s.TEXTURE_2D,mt,_t,bt.width,bt.height,0,qt,Bt,bt.data);A.generateMipmaps=!1}else ie?(xe&&e.texStorage2D(s.TEXTURE_2D,jt,_t,at.width,at.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,at.width,at.height,qt,Bt,at.data)):e.texImage2D(s.TEXTURE_2D,0,_t,at.width,at.height,0,qt,Bt,at.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ie&&xe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,jt,_t,Ht[0].width,Ht[0].height,at.depth);for(let mt=0,B=Ht.length;mt<B;mt++)bt=Ht[mt],A.format!==mn?qt!==null?ie?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,mt,0,0,0,bt.width,bt.height,at.depth,qt,bt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,mt,_t,bt.width,bt.height,at.depth,0,bt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?e.texSubImage3D(s.TEXTURE_2D_ARRAY,mt,0,0,0,bt.width,bt.height,at.depth,qt,Bt,bt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,mt,_t,bt.width,bt.height,at.depth,0,qt,Bt,bt.data)}else{ie&&xe&&e.texStorage2D(s.TEXTURE_2D,jt,_t,Ht[0].width,Ht[0].height);for(let mt=0,B=Ht.length;mt<B;mt++)bt=Ht[mt],A.format!==mn?qt!==null?ie?e.compressedTexSubImage2D(s.TEXTURE_2D,mt,0,0,bt.width,bt.height,qt,bt.data):e.compressedTexImage2D(s.TEXTURE_2D,mt,_t,bt.width,bt.height,0,bt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?e.texSubImage2D(s.TEXTURE_2D,mt,0,0,bt.width,bt.height,qt,Bt,bt.data):e.texImage2D(s.TEXTURE_2D,mt,_t,bt.width,bt.height,0,qt,Bt,bt.data)}else if(A.isDataArrayTexture)ie?(xe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,jt,_t,at.width,at.height,at.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,qt,Bt,at.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,_t,at.width,at.height,at.depth,0,qt,Bt,at.data);else if(A.isData3DTexture)ie?(xe&&e.texStorage3D(s.TEXTURE_3D,jt,_t,at.width,at.height,at.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,qt,Bt,at.data)):e.texImage3D(s.TEXTURE_3D,0,_t,at.width,at.height,at.depth,0,qt,Bt,at.data);else if(A.isFramebufferTexture){if(xe)if(ie)e.texStorage2D(s.TEXTURE_2D,jt,_t,at.width,at.height);else{let mt=at.width,B=at.height;for(let wt=0;wt<jt;wt++)e.texImage2D(s.TEXTURE_2D,wt,_t,mt,B,0,qt,Bt,null),mt>>=1,B>>=1}}else if(Ht.length>0&&$t){ie&&xe&&e.texStorage2D(s.TEXTURE_2D,jt,_t,Ht[0].width,Ht[0].height);for(let mt=0,B=Ht.length;mt<B;mt++)bt=Ht[mt],ie?e.texSubImage2D(s.TEXTURE_2D,mt,0,0,qt,Bt,bt):e.texImage2D(s.TEXTURE_2D,mt,_t,qt,Bt,bt);A.generateMipmaps=!1}else ie?(xe&&e.texStorage2D(s.TEXTURE_2D,jt,_t,at.width,at.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,qt,Bt,at)):e.texImage2D(s.TEXTURE_2D,0,_t,qt,Bt,at);x(A,$t)&&y(ot),yt.__version=it.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function dt(P,A,H){if(A.image.length!==6)return;const ot=nt(P,A),rt=A.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+H);const it=n.get(rt);if(rt.version!==it.__version||ot===!0){e.activeTexture(s.TEXTURE0+H);const yt=se.getPrimaries(se.workingColorSpace),ut=A.colorSpace===ln?null:se.getPrimaries(A.colorSpace),Et=A.colorSpace===ln||yt===ut?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Et);const Ut=A.isCompressedTexture||A.image[0].isCompressedTexture,Gt=A.image[0]&&A.image[0].isDataTexture,at=[];for(let mt=0;mt<6;mt++)!Ut&&!Gt?at[mt]=v(A.image[mt],!1,!0,i.maxCubemapSize):at[mt]=Gt?A.image[mt].image:A.image[mt],at[mt]=pt(A,at[mt]);const $t=at[0],qt=g($t)||a,Bt=r.convert(A.format,A.colorSpace),_t=r.convert(A.type),bt=_(A.internalFormat,Bt,_t,A.colorSpace),Ht=a&&A.isVideoTexture!==!0,ie=it.__version===void 0||ot===!0;let xe=M(A,$t,qt);Y(s.TEXTURE_CUBE_MAP,A,qt);let jt;if(Ut){Ht&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,xe,bt,$t.width,$t.height);for(let mt=0;mt<6;mt++){jt=at[mt].mipmaps;for(let B=0;B<jt.length;B++){const wt=jt[B];A.format!==mn?Bt!==null?Ht?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B,0,0,wt.width,wt.height,Bt,wt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B,bt,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B,0,0,wt.width,wt.height,Bt,_t,wt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B,bt,wt.width,wt.height,0,Bt,_t,wt.data)}}}else{jt=A.mipmaps,Ht&&ie&&(jt.length>0&&xe++,e.texStorage2D(s.TEXTURE_CUBE_MAP,xe,bt,at[0].width,at[0].height));for(let mt=0;mt<6;mt++)if(Gt){Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,at[mt].width,at[mt].height,Bt,_t,at[mt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,bt,at[mt].width,at[mt].height,0,Bt,_t,at[mt].data);for(let B=0;B<jt.length;B++){const St=jt[B].image[mt].image;Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B+1,0,0,St.width,St.height,Bt,_t,St.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B+1,bt,St.width,St.height,0,Bt,_t,St.data)}}else{Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,0,0,Bt,_t,at[mt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0,bt,Bt,_t,at[mt]);for(let B=0;B<jt.length;B++){const wt=jt[B];Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B+1,0,0,Bt,_t,wt.image[mt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,B+1,bt,Bt,_t,wt.image[mt])}}}x(A,qt)&&y(s.TEXTURE_CUBE_MAP),it.__version=rt.version,A.onUpdate&&A.onUpdate(A)}P.__version=A.version}function st(P,A,H,ot,rt,it){const yt=r.convert(H.format,H.colorSpace),ut=r.convert(H.type),Et=_(H.internalFormat,yt,ut,H.colorSpace);if(!n.get(A).__hasExternalTextures){const Gt=Math.max(1,A.width>>it),at=Math.max(1,A.height>>it);rt===s.TEXTURE_3D||rt===s.TEXTURE_2D_ARRAY?e.texImage3D(rt,it,Et,Gt,at,A.depth,0,yt,ut,null):e.texImage2D(rt,it,Et,Gt,at,0,yt,ut,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),tt(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ot,rt,n.get(H).__webglTexture,0,lt(A)):(rt===s.TEXTURE_2D||rt>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&rt<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ot,rt,n.get(H).__webglTexture,it),e.bindFramebuffer(s.FRAMEBUFFER,null)}function vt(P,A,H){if(s.bindRenderbuffer(s.RENDERBUFFER,P),A.depthBuffer&&!A.stencilBuffer){let ot=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(H||tt(A)){const rt=A.depthTexture;rt&&rt.isDepthTexture&&(rt.type===Jn?ot=s.DEPTH_COMPONENT32F:rt.type===Zn&&(ot=s.DEPTH_COMPONENT24));const it=lt(A);tt(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,it,ot,A.width,A.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,it,ot,A.width,A.height)}else s.renderbufferStorage(s.RENDERBUFFER,ot,A.width,A.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,P)}else if(A.depthBuffer&&A.stencilBuffer){const ot=lt(A);H&&tt(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,s.DEPTH24_STENCIL8,A.width,A.height):tt(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot,s.DEPTH24_STENCIL8,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,P)}else{const ot=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let rt=0;rt<ot.length;rt++){const it=ot[rt],yt=r.convert(it.format,it.colorSpace),ut=r.convert(it.type),Et=_(it.internalFormat,yt,ut,it.colorSpace),Ut=lt(A);H&&tt(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ut,Et,A.width,A.height):tt(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ut,Et,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,Et,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function xt(P,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),N(A.depthTexture,0);const ot=n.get(A.depthTexture).__webglTexture,rt=lt(A);if(A.depthTexture.format===xi)tt(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ot,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ot,0);else if(A.depthTexture.format===os)tt(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ot,0,rt):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function ft(P){const A=n.get(P),H=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!A.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");xt(A.__webglFramebuffer,P)}else if(H){A.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[ot]),A.__webglDepthbuffer[ot]=s.createRenderbuffer(),vt(A.__webglDepthbuffer[ot],P,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=s.createRenderbuffer(),vt(A.__webglDepthbuffer,P,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Mt(P,A,H){const ot=n.get(P);A!==void 0&&st(ot.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&ft(P)}function z(P){const A=P.texture,H=n.get(P),ot=n.get(A);P.addEventListener("dispose",R),P.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=s.createTexture()),ot.__version=A.version,o.memory.textures++);const rt=P.isWebGLCubeRenderTarget===!0,it=P.isWebGLMultipleRenderTargets===!0,yt=g(P)||a;if(rt){H.__webglFramebuffer=[];for(let ut=0;ut<6;ut++)if(a&&A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer[ut]=[];for(let Et=0;Et<A.mipmaps.length;Et++)H.__webglFramebuffer[ut][Et]=s.createFramebuffer()}else H.__webglFramebuffer[ut]=s.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer=[];for(let ut=0;ut<A.mipmaps.length;ut++)H.__webglFramebuffer[ut]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(it)if(i.drawBuffers){const ut=P.texture;for(let Et=0,Ut=ut.length;Et<Ut;Et++){const Gt=n.get(ut[Et]);Gt.__webglTexture===void 0&&(Gt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&P.samples>0&&tt(P)===!1){const ut=it?A:[A];H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let Et=0;Et<ut.length;Et++){const Ut=ut[Et];H.__webglColorRenderbuffer[Et]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[Et]);const Gt=r.convert(Ut.format,Ut.colorSpace),at=r.convert(Ut.type),$t=_(Ut.internalFormat,Gt,at,Ut.colorSpace,P.isXRRenderTarget===!0),qt=lt(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,qt,$t,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Et,s.RENDERBUFFER,H.__webglColorRenderbuffer[Et])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),vt(H.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(rt){e.bindTexture(s.TEXTURE_CUBE_MAP,ot.__webglTexture),Y(s.TEXTURE_CUBE_MAP,A,yt);for(let ut=0;ut<6;ut++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let Et=0;Et<A.mipmaps.length;Et++)st(H.__webglFramebuffer[ut][Et],P,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,Et);else st(H.__webglFramebuffer[ut],P,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+ut,0);x(A,yt)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(it){const ut=P.texture;for(let Et=0,Ut=ut.length;Et<Ut;Et++){const Gt=ut[Et],at=n.get(Gt);e.bindTexture(s.TEXTURE_2D,at.__webglTexture),Y(s.TEXTURE_2D,Gt,yt),st(H.__webglFramebuffer,P,Gt,s.COLOR_ATTACHMENT0+Et,s.TEXTURE_2D,0),x(Gt,yt)&&y(s.TEXTURE_2D)}e.unbindTexture()}else{let ut=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(a?ut=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(ut,ot.__webglTexture),Y(ut,A,yt),a&&A.mipmaps&&A.mipmaps.length>0)for(let Et=0;Et<A.mipmaps.length;Et++)st(H.__webglFramebuffer[Et],P,A,s.COLOR_ATTACHMENT0,ut,Et);else st(H.__webglFramebuffer,P,A,s.COLOR_ATTACHMENT0,ut,0);x(A,yt)&&y(ut),e.unbindTexture()}P.depthBuffer&&ft(P)}function ct(P){const A=g(P)||a,H=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let ot=0,rt=H.length;ot<rt;ot++){const it=H[ot];if(x(it,A)){const yt=P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,ut=n.get(it).__webglTexture;e.bindTexture(yt,ut),y(yt),e.unbindTexture()}}}function J(P){if(a&&P.samples>0&&tt(P)===!1){const A=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],H=P.width,ot=P.height;let rt=s.COLOR_BUFFER_BIT;const it=[],yt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,ut=n.get(P),Et=P.isWebGLMultipleRenderTargets===!0;if(Et)for(let Ut=0;Ut<A.length;Ut++)e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ut,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ut,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,ut.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ut.__webglFramebuffer);for(let Ut=0;Ut<A.length;Ut++){it.push(s.COLOR_ATTACHMENT0+Ut),P.depthBuffer&&it.push(yt);const Gt=ut.__ignoreDepthValues!==void 0?ut.__ignoreDepthValues:!1;if(Gt===!1&&(P.depthBuffer&&(rt|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&(rt|=s.STENCIL_BUFFER_BIT)),Et&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,ut.__webglColorRenderbuffer[Ut]),Gt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[yt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[yt])),Et){const at=n.get(A[Ut]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,at,0)}s.blitFramebuffer(0,0,H,ot,0,0,H,ot,rt,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,it)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),Et)for(let Ut=0;Ut<A.length;Ut++){e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ut,s.RENDERBUFFER,ut.__webglColorRenderbuffer[Ut]);const Gt=n.get(A[Ut]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,ut.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ut,s.TEXTURE_2D,Gt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,ut.__webglMultisampledFramebuffer)}}function lt(P){return Math.min(i.maxSamples,P.samples)}function tt(P){const A=n.get(P);return a&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Pt(P){const A=o.render.frame;h.get(P)!==A&&(h.set(P,A),P.update())}function pt(P,A){const H=P.colorSpace,ot=P.format,rt=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Oa||H!==kn&&H!==ln&&(se.getTransfer(H)===ue?a===!1?t.has("EXT_sRGB")===!0&&ot===mn?(P.format=Oa,P.minFilter=Ke,P.generateMipmaps=!1):A=su.sRGBToLinear(A):(ot!==mn||rt!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),A}this.allocateTextureUnit=C,this.resetTextureUnits=F,this.setTexture2D=N,this.setTexture2DArray=q,this.setTexture3D=k,this.setTextureCube=X,this.rebindTextures=Mt,this.setupRenderTarget=z,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=ft,this.setupFrameBufferTexture=st,this.useMultisampledRTT=tt}function Cv(s,t,e){const n=e.isWebGL2;function i(r,o=ln){let a;const c=se.getTransfer(o);if(r===ti)return s.UNSIGNED_BYTE;if(r===jh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Kh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Kd)return s.BYTE;if(r===Zd)return s.SHORT;if(r===Za)return s.UNSIGNED_SHORT;if(r===Yh)return s.INT;if(r===Zn)return s.UNSIGNED_INT;if(r===Jn)return s.FLOAT;if(r===vn)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Jd)return s.ALPHA;if(r===mn)return s.RGBA;if(r===Qd)return s.LUMINANCE;if(r===$d)return s.LUMINANCE_ALPHA;if(r===xi)return s.DEPTH_COMPONENT;if(r===os)return s.DEPTH_STENCIL;if(r===Oa)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===tf)return s.RED;if(r===Zh)return s.RED_INTEGER;if(r===ef)return s.RG;if(r===Jh)return s.RG_INTEGER;if(r===Qh)return s.RGBA_INTEGER;if(r===Po||r===Lo||r===Io||r===Do)if(c===ue)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Po)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Lo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Io)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Do)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Po)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Lo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Io)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Do)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Rc||r===Pc||r===Lc||r===Ic)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Rc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Pc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Lc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Ic)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===$h)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Dc||r===Nc)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Dc)return c===ue?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Nc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Uc||r===Fc||r===Oc||r===zc||r===Bc||r===kc||r===Gc||r===Hc||r===Wc||r===Vc||r===Xc||r===qc||r===Yc||r===jc)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Uc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Fc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Oc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===zc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Bc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===kc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===Gc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Hc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Wc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Vc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Xc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===qc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Yc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===jc)return c===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===No||r===Kc||r===Zc)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===No)return c===ue?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===Kc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Zc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===nf||r===Jc||r===Qc||r===$c)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===No)return a.COMPRESSED_RED_RGTC1_EXT;if(r===Jc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Qc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===$c)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===vi?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class Rv extends $e{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ae extends Ne{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Pv={type:"move"};class ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],u=l.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,p=.005;l.inputState.pinching&&d>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&d<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Pv)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Lv extends ls{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,u=null,d=null,f=null,p=null;const v=e.getContextAttributes();let g=null,m=null;const x=[],y=[],_=new et;let M=null;const S=new $e;S.layers.enable(1),S.viewport=new Ie;const b=new $e;b.layers.enable(2),b.viewport=new Ie;const R=[S,b],w=new Rv;w.layers.enable(1),w.layers.enable(2);let E=null,U=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let nt=x[Y];return nt===void 0&&(nt=new ia,x[Y]=nt),nt.getTargetRaySpace()},this.getControllerGrip=function(Y){let nt=x[Y];return nt===void 0&&(nt=new ia,x[Y]=nt),nt.getGripSpace()},this.getHand=function(Y){let nt=x[Y];return nt===void 0&&(nt=new ia,x[Y]=nt),nt.getHandSpace()};function I(Y){const nt=y.indexOf(Y.inputSource);if(nt===-1)return;const ht=x[nt];ht!==void 0&&(ht.update(Y.inputSource,Y.frame,l||o),ht.dispatchEvent({type:Y.type,data:Y.inputSource}))}function F(){i.removeEventListener("select",I),i.removeEventListener("selectstart",I),i.removeEventListener("selectend",I),i.removeEventListener("squeeze",I),i.removeEventListener("squeezestart",I),i.removeEventListener("squeezeend",I),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",C);for(let Y=0;Y<x.length;Y++){const nt=y[Y];nt!==null&&(y[Y]=null,x[Y].disconnect(nt))}E=null,U=null,t.setRenderTarget(g),f=null,d=null,u=null,i=null,m=null,W.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(_.width,_.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(Y){l=Y},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(g=t.getRenderTarget(),i.addEventListener("select",I),i.addEventListener("selectstart",I),i.addEventListener("selectend",I),i.addEventListener("squeeze",I),i.addEventListener("squeezestart",I),i.addEventListener("squeezeend",I),i.addEventListener("end",F),i.addEventListener("inputsourceschange",C),v.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(_),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const nt={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,nt),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new tn(f.framebufferWidth,f.framebufferHeight,{format:mn,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let nt=null,ht=null,dt=null;v.depth&&(dt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,nt=v.stencil?os:xi,ht=v.stencil?vi:Zn);const st={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:r};u=new XRWebGLBinding(i,e),d=u.createProjectionLayer(st),i.updateRenderState({layers:[d]}),t.setPixelRatio(1),t.setSize(d.textureWidth,d.textureHeight,!1),m=new tn(d.textureWidth,d.textureHeight,{format:mn,type:ti,depthTexture:new mu(d.textureWidth,d.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,nt),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});const vt=t.properties.get(m);vt.__ignoreDepthValues=d.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),W.setContext(i),W.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function C(Y){for(let nt=0;nt<Y.removed.length;nt++){const ht=Y.removed[nt],dt=y.indexOf(ht);dt>=0&&(y[dt]=null,x[dt].disconnect(ht))}for(let nt=0;nt<Y.added.length;nt++){const ht=Y.added[nt];let dt=y.indexOf(ht);if(dt===-1){for(let vt=0;vt<x.length;vt++)if(vt>=y.length){y.push(ht),dt=vt;break}else if(y[vt]===null){y[vt]=ht,dt=vt;break}if(dt===-1)break}const st=x[dt];st&&st.connect(ht)}}const D=new O,N=new O;function q(Y,nt,ht){D.setFromMatrixPosition(nt.matrixWorld),N.setFromMatrixPosition(ht.matrixWorld);const dt=D.distanceTo(N),st=nt.projectionMatrix.elements,vt=ht.projectionMatrix.elements,xt=st[14]/(st[10]-1),ft=st[14]/(st[10]+1),Mt=(st[9]+1)/st[5],z=(st[9]-1)/st[5],ct=(st[8]-1)/st[0],J=(vt[8]+1)/vt[0],lt=xt*ct,tt=xt*J,Pt=dt/(-ct+J),pt=Pt*-ct;nt.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(pt),Y.translateZ(Pt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const P=xt+Pt,A=ft+Pt,H=lt-pt,ot=tt+(dt-pt),rt=Mt*ft/A*P,it=z*ft/A*P;Y.projectionMatrix.makePerspective(H,ot,rt,it,P,A),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function k(Y,nt){nt===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(nt.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;w.near=b.near=S.near=Y.near,w.far=b.far=S.far=Y.far,(E!==w.near||U!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),E=w.near,U=w.far);const nt=Y.parent,ht=w.cameras;k(w,nt);for(let dt=0;dt<ht.length;dt++)k(ht[dt],nt);ht.length===2?q(w,S,b):w.projectionMatrix.copy(S.projectionMatrix),X(Y,w,nt)};function X(Y,nt,ht){ht===null?Y.matrix.copy(nt.matrixWorld):(Y.matrix.copy(ht.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(nt.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(nt.projectionMatrix),Y.projectionMatrixInverse.copy(nt.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=ks*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(d===null&&f===null))return c},this.setFoveation=function(Y){c=Y,d!==null&&(d.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)};let Z=null;function G(Y,nt){if(h=nt.getViewerPose(l||o),p=nt,h!==null){const ht=h.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let dt=!1;ht.length!==w.cameras.length&&(w.cameras.length=0,dt=!0);for(let st=0;st<ht.length;st++){const vt=ht[st];let xt=null;if(f!==null)xt=f.getViewport(vt);else{const Mt=u.getViewSubImage(d,vt);xt=Mt.viewport,st===0&&(t.setRenderTargetTextures(m,Mt.colorTexture,d.ignoreDepthValues?void 0:Mt.depthStencilTexture),t.setRenderTarget(m))}let ft=R[st];ft===void 0&&(ft=new $e,ft.layers.enable(st),ft.viewport=new Ie,R[st]=ft),ft.matrix.fromArray(vt.transform.matrix),ft.matrix.decompose(ft.position,ft.quaternion,ft.scale),ft.projectionMatrix.fromArray(vt.projectionMatrix),ft.projectionMatrixInverse.copy(ft.projectionMatrix).invert(),ft.viewport.set(xt.x,xt.y,xt.width,xt.height),st===0&&(w.matrix.copy(ft.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),dt===!0&&w.cameras.push(ft)}}for(let ht=0;ht<x.length;ht++){const dt=y[ht],st=x[ht];dt!==null&&st!==void 0&&st.update(dt,nt,l||o)}Z&&Z(Y,nt),nt.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:nt}),p=null}const W=new pu;W.setAnimationLoop(G),this.setAnimationLoop=function(Y){Z=Y},this.dispose=function(){}}}function Iv(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,uu(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,y,_){m.isMeshBasicMaterial||m.isMeshLambertMaterial?r(g,m):m.isMeshToonMaterial?(r(g,m),u(g,m)):m.isMeshPhongMaterial?(r(g,m),h(g,m)):m.isMeshStandardMaterial?(r(g,m),d(g,m),m.isMeshPhysicalMaterial&&f(g,m,_)):m.isMeshMatcapMaterial?(r(g,m),p(g,m)):m.isMeshDepthMaterial?r(g,m):m.isMeshDistanceMaterial?(r(g,m),v(g,m)):m.isMeshNormalMaterial?r(g,m):m.isLineBasicMaterial?(o(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,x,y):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function r(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ye&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ye&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=t.get(m).envMap;if(x&&(g.envMap.value=x,g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap){g.lightMap.value=m.lightMap;const y=s._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=m.lightMapIntensity*y,e(m.lightMap,g.lightMapTransform)}m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function o(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,x,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=y*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function u(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function d(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),t.get(m).envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ye&&g.clearcoatNormalScale.value.negate())),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Dv(s,t,e,n){let i={},r={},o=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,y){const _=y.program;n.uniformBlockBinding(x,_)}function l(x,y){let _=i[x.id];_===void 0&&(p(x),_=h(x),i[x.id]=_,x.addEventListener("dispose",g));const M=y.program;n.updateUBOMapping(x,M);const S=t.render.frame;r[x.id]!==S&&(d(x),r[x.id]=S)}function h(x){const y=u();x.__bindingPointIndex=y;const _=s.createBuffer(),M=x.__size,S=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,M,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,_),_}function u(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(x){const y=i[x.id],_=x.uniforms,M=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let S=0,b=_.length;S<b;S++){const R=Array.isArray(_[S])?_[S]:[_[S]];for(let w=0,E=R.length;w<E;w++){const U=R[w];if(f(U,S,w,M)===!0){const I=U.__offset,F=Array.isArray(U.value)?U.value:[U.value];let C=0;for(let D=0;D<F.length;D++){const N=F[D],q=v(N);typeof N=="number"||typeof N=="boolean"?(U.__data[0]=N,s.bufferSubData(s.UNIFORM_BUFFER,I+C,U.__data)):N.isMatrix3?(U.__data[0]=N.elements[0],U.__data[1]=N.elements[1],U.__data[2]=N.elements[2],U.__data[3]=0,U.__data[4]=N.elements[3],U.__data[5]=N.elements[4],U.__data[6]=N.elements[5],U.__data[7]=0,U.__data[8]=N.elements[6],U.__data[9]=N.elements[7],U.__data[10]=N.elements[8],U.__data[11]=0):(N.toArray(U.__data,C),C+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,I,U.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,_,M){const S=x.value,b=y+"_"+_;if(M[b]===void 0)return typeof S=="number"||typeof S=="boolean"?M[b]=S:M[b]=S.clone(),!0;{const R=M[b];if(typeof S=="number"||typeof S=="boolean"){if(R!==S)return M[b]=S,!0}else if(R.equals(S)===!1)return R.copy(S),!0}return!1}function p(x){const y=x.uniforms;let _=0;const M=16;for(let b=0,R=y.length;b<R;b++){const w=Array.isArray(y[b])?y[b]:[y[b]];for(let E=0,U=w.length;E<U;E++){const I=w[E],F=Array.isArray(I.value)?I.value:[I.value];for(let C=0,D=F.length;C<D;C++){const N=F[C],q=v(N),k=_%M;k!==0&&M-k<q.boundary&&(_+=M-k),I.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),I.__offset=_,_+=q.storage}}}const S=_%M;return S>0&&(_+=M-S),x.__size=_,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function g(x){const y=x.target;y.removeEventListener("dispose",g);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:c,update:l,dispose:m}}class Mu{constructor(t={}){const{canvas:e=Rf(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1}=t;this.isWebGLRenderer=!0;let d;n!==null?d=n.getContextAttributes().alpha:d=o;const f=new Uint32Array(4),p=new Int32Array(4);let v=null,g=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qt,this._useLegacyLights=!1,this.toneMapping=$n,this.toneMappingExposure=1;const y=this;let _=!1,M=0,S=0,b=null,R=-1,w=null;const E=new Ie,U=new Ie;let I=null;const F=new It(0);let C=0,D=e.width,N=e.height,q=1,k=null,X=null;const Z=new Ie(0,0,D,N),G=new Ie(0,0,D,N);let W=!1;const Y=new $a;let nt=!1,ht=!1,dt=null;const st=new ee,vt=new et,xt=new O,ft={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Mt(){return b===null?q:1}let z=n;function ct(L,V){for(let K=0;K<L.length;K++){const Q=L[K],j=e.getContext(Q,V);if(j!==null)return j}return null}try{const L={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ja}`),e.addEventListener("webglcontextlost",mt,!1),e.addEventListener("webglcontextrestored",B,!1),e.addEventListener("webglcontextcreationerror",wt,!1),z===null){const V=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&V.shift(),z=ct(V,L),z===null)throw ct(V)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(L){throw console.error("THREE.WebGLRenderer: "+L.message),L}let J,lt,tt,Pt,pt,P,A,H,ot,rt,it,yt,ut,Et,Ut,Gt,at,$t,qt,Bt,_t,bt,Ht,ie;function xe(){J=new W0(z),lt=new O0(z,J,t),J.init(lt),bt=new Cv(z,J,lt),tt=new Tv(z,J,lt),Pt=new q0(z),pt=new dv,P=new Av(z,J,tt,pt,lt,bt,Pt),A=new B0(y),H=new H0(y),ot=new tp(z,lt),Ht=new U0(z,J,ot,lt),rt=new V0(z,ot,Pt,Ht),it=new Z0(z,rt,ot,Pt),qt=new K0(z,lt,P),Gt=new z0(pt),yt=new uv(y,A,H,J,lt,Ht,Gt),ut=new Iv(y,pt),Et=new pv,Ut=new _v(J,lt),$t=new N0(y,A,H,tt,it,d,c),at=new Ev(y,it,lt),ie=new Dv(z,Pt,lt,tt),Bt=new F0(z,J,Pt,lt),_t=new X0(z,J,Pt,lt),Pt.programs=yt.programs,y.capabilities=lt,y.extensions=J,y.properties=pt,y.renderLists=Et,y.shadowMap=at,y.state=tt,y.info=Pt}xe();const jt=new Lv(y,z);this.xr=jt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const L=J.get("WEBGL_lose_context");L&&L.loseContext()},this.forceContextRestore=function(){const L=J.get("WEBGL_lose_context");L&&L.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(L){L!==void 0&&(q=L,this.setSize(D,N,!1))},this.getSize=function(L){return L.set(D,N)},this.setSize=function(L,V,K=!0){if(jt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=L,N=V,e.width=Math.floor(L*q),e.height=Math.floor(V*q),K===!0&&(e.style.width=L+"px",e.style.height=V+"px"),this.setViewport(0,0,L,V)},this.getDrawingBufferSize=function(L){return L.set(D*q,N*q).floor()},this.setDrawingBufferSize=function(L,V,K){D=L,N=V,q=K,e.width=Math.floor(L*K),e.height=Math.floor(V*K),this.setViewport(0,0,L,V)},this.getCurrentViewport=function(L){return L.copy(E)},this.getViewport=function(L){return L.copy(Z)},this.setViewport=function(L,V,K,Q){L.isVector4?Z.set(L.x,L.y,L.z,L.w):Z.set(L,V,K,Q),tt.viewport(E.copy(Z).multiplyScalar(q).floor())},this.getScissor=function(L){return L.copy(G)},this.setScissor=function(L,V,K,Q){L.isVector4?G.set(L.x,L.y,L.z,L.w):G.set(L,V,K,Q),tt.scissor(U.copy(G).multiplyScalar(q).floor())},this.getScissorTest=function(){return W},this.setScissorTest=function(L){tt.setScissorTest(W=L)},this.setOpaqueSort=function(L){k=L},this.setTransparentSort=function(L){X=L},this.getClearColor=function(L){return L.copy($t.getClearColor())},this.setClearColor=function(){$t.setClearColor.apply($t,arguments)},this.getClearAlpha=function(){return $t.getClearAlpha()},this.setClearAlpha=function(){$t.setClearAlpha.apply($t,arguments)},this.clear=function(L=!0,V=!0,K=!0){let Q=0;if(L){let j=!1;if(b!==null){const Tt=b.texture.format;j=Tt===Qh||Tt===Jh||Tt===Zh}if(j){const Tt=b.texture.type,Dt=Tt===ti||Tt===Zn||Tt===Za||Tt===vi||Tt===jh||Tt===Kh,Ot=$t.getClearColor(),kt=$t.getClearAlpha(),Yt=Ot.r,Wt=Ot.g,Vt=Ot.b;Dt?(f[0]=Yt,f[1]=Wt,f[2]=Vt,f[3]=kt,z.clearBufferuiv(z.COLOR,0,f)):(p[0]=Yt,p[1]=Wt,p[2]=Vt,p[3]=kt,z.clearBufferiv(z.COLOR,0,p))}else Q|=z.COLOR_BUFFER_BIT}V&&(Q|=z.DEPTH_BUFFER_BIT),K&&(Q|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear(Q)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",mt,!1),e.removeEventListener("webglcontextrestored",B,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),Et.dispose(),Ut.dispose(),pt.dispose(),A.dispose(),H.dispose(),it.dispose(),Ht.dispose(),ie.dispose(),yt.dispose(),jt.dispose(),jt.removeEventListener("sessionstart",He),jt.removeEventListener("sessionend",he),dt&&(dt.dispose(),dt=null),We.stop()};function mt(L){L.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;const L=Pt.autoReset,V=at.enabled,K=at.autoUpdate,Q=at.needsUpdate,j=at.type;xe(),Pt.autoReset=L,at.enabled=V,at.autoUpdate=K,at.needsUpdate=Q,at.type=j}function wt(L){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",L.statusMessage)}function St(L){const V=L.target;V.removeEventListener("dispose",St),zt(V)}function zt(L){Ft(L),pt.remove(L)}function Ft(L){const V=pt.get(L).programs;V!==void 0&&(V.forEach(function(K){yt.releaseProgram(K)}),L.isShaderMaterial&&yt.releaseShaderCache(L))}this.renderBufferDirect=function(L,V,K,Q,j,Tt){V===null&&(V=ft);const Dt=j.isMesh&&j.matrixWorld.determinant()<0,Ot=gd(L,V,K,Q,j);tt.setMaterial(Q,Dt);let kt=K.index,Yt=1;if(Q.wireframe===!0){if(kt=rt.getWireframeAttribute(K),kt===void 0)return;Yt=2}const Wt=K.drawRange,Vt=K.attributes.position;let _e=Wt.start*Yt,Ze=(Wt.start+Wt.count)*Yt;Tt!==null&&(_e=Math.max(_e,Tt.start*Yt),Ze=Math.min(Ze,(Tt.start+Tt.count)*Yt)),kt!==null?(_e=Math.max(_e,0),Ze=Math.min(Ze,kt.count)):Vt!=null&&(_e=Math.max(_e,0),Ze=Math.min(Ze,Vt.count));const Re=Ze-_e;if(Re<0||Re===1/0)return;Ht.setup(j,Q,Ot,K,kt);let Tn,ge=Bt;if(kt!==null&&(Tn=ot.get(kt),ge=_t,ge.setIndex(Tn)),j.isMesh)Q.wireframe===!0?(tt.setLineWidth(Q.wireframeLinewidth*Mt()),ge.setMode(z.LINES)):ge.setMode(z.TRIANGLES);else if(j.isLine){let Kt=Q.linewidth;Kt===void 0&&(Kt=1),tt.setLineWidth(Kt*Mt()),j.isLineSegments?ge.setMode(z.LINES):j.isLineLoop?ge.setMode(z.LINE_LOOP):ge.setMode(z.LINE_STRIP)}else j.isPoints?ge.setMode(z.POINTS):j.isSprite&&ge.setMode(z.TRIANGLES);if(j.isBatchedMesh)ge.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)ge.renderInstances(_e,Re,j.count);else if(K.isInstancedBufferGeometry){const Kt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,Eo=Math.min(K.instanceCount,Kt);ge.renderInstances(_e,Re,Eo)}else ge.render(_e,Re)};function ce(L,V,K){L.transparent===!0&&L.side===be&&L.forceSinglePass===!1?(L.side=Ye,L.needsUpdate=!0,Js(L,V,K),L.side=ei,L.needsUpdate=!0,Js(L,V,K),L.side=be):Js(L,V,K)}this.compile=function(L,V,K=null){K===null&&(K=L),g=Ut.get(K),g.init(),x.push(g),K.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))}),L!==K&&L.traverseVisible(function(j){j.isLight&&j.layers.test(V.layers)&&(g.pushLight(j),j.castShadow&&g.pushShadow(j))}),g.setupLights(y._useLegacyLights);const Q=new Set;return L.traverse(function(j){const Tt=j.material;if(Tt)if(Array.isArray(Tt))for(let Dt=0;Dt<Tt.length;Dt++){const Ot=Tt[Dt];ce(Ot,K,j),Q.add(Ot)}else ce(Tt,K,j),Q.add(Tt)}),x.pop(),g=null,Q},this.compileAsync=function(L,V,K=null){const Q=this.compile(L,V,K);return new Promise(j=>{function Tt(){if(Q.forEach(function(Dt){pt.get(Dt).currentProgram.isReady()&&Q.delete(Dt)}),Q.size===0){j(L);return}setTimeout(Tt,10)}J.get("KHR_parallel_shader_compile")!==null?Tt():setTimeout(Tt,10)})};let le=null;function Ce(L){le&&le(L)}function He(){We.stop()}function he(){We.start()}const We=new pu;We.setAnimationLoop(Ce),typeof self<"u"&&We.setContext(self),this.setAnimationLoop=function(L){le=L,jt.setAnimationLoop(L),L===null?We.stop():We.start()},jt.addEventListener("sessionstart",He),jt.addEventListener("sessionend",he),this.render=function(L,V){if(V!==void 0&&V.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;L.matrixWorldAutoUpdate===!0&&L.updateMatrixWorld(),V.parent===null&&V.matrixWorldAutoUpdate===!0&&V.updateMatrixWorld(),jt.enabled===!0&&jt.isPresenting===!0&&(jt.cameraAutoUpdate===!0&&jt.updateCamera(V),V=jt.getCamera()),L.isScene===!0&&L.onBeforeRender(y,L,V,b),g=Ut.get(L,x.length),g.init(),x.push(g),st.multiplyMatrices(V.projectionMatrix,V.matrixWorldInverse),Y.setFromProjectionMatrix(st),ht=this.localClippingEnabled,nt=Gt.init(this.clippingPlanes,ht),v=Et.get(L,m.length),v.init(),m.push(v),xn(L,V,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(k,X),this.info.render.frame++,nt===!0&&Gt.beginShadows();const K=g.state.shadowsArray;if(at.render(K,L,V),nt===!0&&Gt.endShadows(),this.info.autoReset===!0&&this.info.reset(),$t.render(v,L),g.setupLights(y._useLegacyLights),V.isArrayCamera){const Q=V.cameras;for(let j=0,Tt=Q.length;j<Tt;j++){const Dt=Q[j];vc(v,L,Dt,Dt.viewport)}}else vc(v,L,V);b!==null&&(P.updateMultisampleRenderTarget(b),P.updateRenderTargetMipmap(b)),L.isScene===!0&&L.onAfterRender(y,L,V),Ht.resetDefaultState(),R=-1,w=null,x.pop(),x.length>0?g=x[x.length-1]:g=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function xn(L,V,K,Q){if(L.visible===!1)return;if(L.layers.test(V.layers)){if(L.isGroup)K=L.renderOrder;else if(L.isLOD)L.autoUpdate===!0&&L.update(V);else if(L.isLight)g.pushLight(L),L.castShadow&&g.pushShadow(L);else if(L.isSprite){if(!L.frustumCulled||Y.intersectsSprite(L)){Q&&xt.setFromMatrixPosition(L.matrixWorld).applyMatrix4(st);const Dt=it.update(L),Ot=L.material;Ot.visible&&v.push(L,Dt,Ot,K,xt.z,null)}}else if((L.isMesh||L.isLine||L.isPoints)&&(!L.frustumCulled||Y.intersectsObject(L))){const Dt=it.update(L),Ot=L.material;if(Q&&(L.boundingSphere!==void 0?(L.boundingSphere===null&&L.computeBoundingSphere(),xt.copy(L.boundingSphere.center)):(Dt.boundingSphere===null&&Dt.computeBoundingSphere(),xt.copy(Dt.boundingSphere.center)),xt.applyMatrix4(L.matrixWorld).applyMatrix4(st)),Array.isArray(Ot)){const kt=Dt.groups;for(let Yt=0,Wt=kt.length;Yt<Wt;Yt++){const Vt=kt[Yt],_e=Ot[Vt.materialIndex];_e&&_e.visible&&v.push(L,Dt,_e,K,xt.z,Vt)}}else Ot.visible&&v.push(L,Dt,Ot,K,xt.z,null)}}const Tt=L.children;for(let Dt=0,Ot=Tt.length;Dt<Ot;Dt++)xn(Tt[Dt],V,K,Q)}function vc(L,V,K,Q){const j=L.opaque,Tt=L.transmissive,Dt=L.transparent;g.setupLightsView(K),nt===!0&&Gt.setGlobalState(y.clippingPlanes,K),Tt.length>0&&md(j,Tt,V,K),Q&&tt.viewport(E.copy(Q)),j.length>0&&Zs(j,V,K),Tt.length>0&&Zs(Tt,V,K),Dt.length>0&&Zs(Dt,V,K),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function md(L,V,K,Q){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const Tt=lt.isWebGL2;dt===null&&(dt=new tn(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")?vn:ti,minFilter:rs,samples:Tt?4:0})),y.getDrawingBufferSize(vt),Tt?dt.setSize(vt.x,vt.y):dt.setSize(lo(vt.x),lo(vt.y));const Dt=y.getRenderTarget();y.setRenderTarget(dt),y.getClearColor(F),C=y.getClearAlpha(),C<1&&y.setClearColor(16777215,.5),y.clear();const Ot=y.toneMapping;y.toneMapping=$n,Zs(L,K,Q),P.updateMultisampleRenderTarget(dt),P.updateRenderTargetMipmap(dt);let kt=!1;for(let Yt=0,Wt=V.length;Yt<Wt;Yt++){const Vt=V[Yt],_e=Vt.object,Ze=Vt.geometry,Re=Vt.material,Tn=Vt.group;if(Re.side===be&&_e.layers.test(Q.layers)){const ge=Re.side;Re.side=Ye,Re.needsUpdate=!0,xc(_e,K,Q,Ze,Re,Tn),Re.side=ge,Re.needsUpdate=!0,kt=!0}}kt===!0&&(P.updateMultisampleRenderTarget(dt),P.updateRenderTargetMipmap(dt)),y.setRenderTarget(Dt),y.setClearColor(F,C),y.toneMapping=Ot}function Zs(L,V,K){const Q=V.isScene===!0?V.overrideMaterial:null;for(let j=0,Tt=L.length;j<Tt;j++){const Dt=L[j],Ot=Dt.object,kt=Dt.geometry,Yt=Q===null?Dt.material:Q,Wt=Dt.group;Ot.layers.test(K.layers)&&xc(Ot,V,K,kt,Yt,Wt)}}function xc(L,V,K,Q,j,Tt){L.onBeforeRender(y,V,K,Q,j,Tt),L.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,L.matrixWorld),L.normalMatrix.getNormalMatrix(L.modelViewMatrix),j.onBeforeRender(y,V,K,Q,L,Tt),j.transparent===!0&&j.side===be&&j.forceSinglePass===!1?(j.side=Ye,j.needsUpdate=!0,y.renderBufferDirect(K,V,Q,j,L,Tt),j.side=ei,j.needsUpdate=!0,y.renderBufferDirect(K,V,Q,j,L,Tt),j.side=be):y.renderBufferDirect(K,V,Q,j,L,Tt),L.onAfterRender(y,V,K,Q,j,Tt)}function Js(L,V,K){V.isScene!==!0&&(V=ft);const Q=pt.get(L),j=g.state.lights,Tt=g.state.shadowsArray,Dt=j.state.version,Ot=yt.getParameters(L,j.state,Tt,V,K),kt=yt.getProgramCacheKey(Ot);let Yt=Q.programs;Q.environment=L.isMeshStandardMaterial?V.environment:null,Q.fog=V.fog,Q.envMap=(L.isMeshStandardMaterial?H:A).get(L.envMap||Q.environment),Yt===void 0&&(L.addEventListener("dispose",St),Yt=new Map,Q.programs=Yt);let Wt=Yt.get(kt);if(Wt!==void 0){if(Q.currentProgram===Wt&&Q.lightsStateVersion===Dt)return _c(L,Ot),Wt}else Ot.uniforms=yt.getUniforms(L),L.onBuild(K,Ot,y),L.onBeforeCompile(Ot,y),Wt=yt.acquireProgram(Ot,kt),Yt.set(kt,Wt),Q.uniforms=Ot.uniforms;const Vt=Q.uniforms;return(!L.isShaderMaterial&&!L.isRawShaderMaterial||L.clipping===!0)&&(Vt.clippingPlanes=Gt.uniform),_c(L,Ot),Q.needsLights=xd(L),Q.lightsStateVersion=Dt,Q.needsLights&&(Vt.ambientLightColor.value=j.state.ambient,Vt.lightProbe.value=j.state.probe,Vt.directionalLights.value=j.state.directional,Vt.directionalLightShadows.value=j.state.directionalShadow,Vt.spotLights.value=j.state.spot,Vt.spotLightShadows.value=j.state.spotShadow,Vt.rectAreaLights.value=j.state.rectArea,Vt.ltc_1.value=j.state.rectAreaLTC1,Vt.ltc_2.value=j.state.rectAreaLTC2,Vt.pointLights.value=j.state.point,Vt.pointLightShadows.value=j.state.pointShadow,Vt.hemisphereLights.value=j.state.hemi,Vt.directionalShadowMap.value=j.state.directionalShadowMap,Vt.directionalShadowMatrix.value=j.state.directionalShadowMatrix,Vt.spotShadowMap.value=j.state.spotShadowMap,Vt.spotLightMatrix.value=j.state.spotLightMatrix,Vt.spotLightMap.value=j.state.spotLightMap,Vt.pointShadowMap.value=j.state.pointShadowMap,Vt.pointShadowMatrix.value=j.state.pointShadowMatrix),Q.currentProgram=Wt,Q.uniformsList=null,Wt}function yc(L){if(L.uniformsList===null){const V=L.currentProgram.getUniforms();L.uniformsList=no.seqWithValue(V.seq,L.uniforms)}return L.uniformsList}function _c(L,V){const K=pt.get(L);K.outputColorSpace=V.outputColorSpace,K.batching=V.batching,K.instancing=V.instancing,K.instancingColor=V.instancingColor,K.skinning=V.skinning,K.morphTargets=V.morphTargets,K.morphNormals=V.morphNormals,K.morphColors=V.morphColors,K.morphTargetsCount=V.morphTargetsCount,K.numClippingPlanes=V.numClippingPlanes,K.numIntersection=V.numClipIntersection,K.vertexAlphas=V.vertexAlphas,K.vertexTangents=V.vertexTangents,K.toneMapping=V.toneMapping}function gd(L,V,K,Q,j){V.isScene!==!0&&(V=ft),P.resetTextureUnits();const Tt=V.fog,Dt=Q.isMeshStandardMaterial?V.environment:null,Ot=b===null?y.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:kn,kt=(Q.isMeshStandardMaterial?H:A).get(Q.envMap||Dt),Yt=Q.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Wt=!!K.attributes.tangent&&(!!Q.normalMap||Q.anisotropy>0),Vt=!!K.morphAttributes.position,_e=!!K.morphAttributes.normal,Ze=!!K.morphAttributes.color;let Re=$n;Q.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(Re=y.toneMapping);const Tn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,ge=Tn!==void 0?Tn.length:0,Kt=pt.get(Q),Eo=g.state.lights;if(nt===!0&&(ht===!0||L!==w)){const rn=L===w&&Q.id===R;Gt.setState(Q,L,rn)}let ye=!1;Q.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==Eo.state.version||Kt.outputColorSpace!==Ot||j.isBatchedMesh&&Kt.batching===!1||!j.isBatchedMesh&&Kt.batching===!0||j.isInstancedMesh&&Kt.instancing===!1||!j.isInstancedMesh&&Kt.instancing===!0||j.isSkinnedMesh&&Kt.skinning===!1||!j.isSkinnedMesh&&Kt.skinning===!0||j.isInstancedMesh&&Kt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&Kt.instancingColor===!1&&j.instanceColor!==null||Kt.envMap!==kt||Q.fog===!0&&Kt.fog!==Tt||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==Gt.numPlanes||Kt.numIntersection!==Gt.numIntersection)||Kt.vertexAlphas!==Yt||Kt.vertexTangents!==Wt||Kt.morphTargets!==Vt||Kt.morphNormals!==_e||Kt.morphColors!==Ze||Kt.toneMapping!==Re||lt.isWebGL2===!0&&Kt.morphTargetsCount!==ge)&&(ye=!0):(ye=!0,Kt.__version=Q.version);let ii=Kt.currentProgram;ye===!0&&(ii=Js(Q,V,j));let Mc=!1,ps=!1,To=!1;const ze=ii.getUniforms(),si=Kt.uniforms;if(tt.useProgram(ii.program)&&(Mc=!0,ps=!0,To=!0),Q.id!==R&&(R=Q.id,ps=!0),Mc||w!==L){ze.setValue(z,"projectionMatrix",L.projectionMatrix),ze.setValue(z,"viewMatrix",L.matrixWorldInverse);const rn=ze.map.cameraPosition;rn!==void 0&&rn.setValue(z,xt.setFromMatrixPosition(L.matrixWorld)),lt.logarithmicDepthBuffer&&ze.setValue(z,"logDepthBufFC",2/(Math.log(L.far+1)/Math.LN2)),(Q.isMeshPhongMaterial||Q.isMeshToonMaterial||Q.isMeshLambertMaterial||Q.isMeshBasicMaterial||Q.isMeshStandardMaterial||Q.isShaderMaterial)&&ze.setValue(z,"isOrthographic",L.isOrthographicCamera===!0),w!==L&&(w=L,ps=!0,To=!0)}if(j.isSkinnedMesh){ze.setOptional(z,j,"bindMatrix"),ze.setOptional(z,j,"bindMatrixInverse");const rn=j.skeleton;rn&&(lt.floatVertexTextures?(rn.boneTexture===null&&rn.computeBoneTexture(),ze.setValue(z,"boneTexture",rn.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}j.isBatchedMesh&&(ze.setOptional(z,j,"batchingTexture"),ze.setValue(z,"batchingTexture",j._matricesTexture,P));const Ao=K.morphAttributes;if((Ao.position!==void 0||Ao.normal!==void 0||Ao.color!==void 0&&lt.isWebGL2===!0)&&qt.update(j,K,ii),(ps||Kt.receiveShadow!==j.receiveShadow)&&(Kt.receiveShadow=j.receiveShadow,ze.setValue(z,"receiveShadow",j.receiveShadow)),Q.isMeshGouraudMaterial&&Q.envMap!==null&&(si.envMap.value=kt,si.flipEnvMap.value=kt.isCubeTexture&&kt.isRenderTargetTexture===!1?-1:1),ps&&(ze.setValue(z,"toneMappingExposure",y.toneMappingExposure),Kt.needsLights&&vd(si,To),Tt&&Q.fog===!0&&ut.refreshFogUniforms(si,Tt),ut.refreshMaterialUniforms(si,Q,q,N,dt),no.upload(z,yc(Kt),si,P)),Q.isShaderMaterial&&Q.uniformsNeedUpdate===!0&&(no.upload(z,yc(Kt),si,P),Q.uniformsNeedUpdate=!1),Q.isSpriteMaterial&&ze.setValue(z,"center",j.center),ze.setValue(z,"modelViewMatrix",j.modelViewMatrix),ze.setValue(z,"normalMatrix",j.normalMatrix),ze.setValue(z,"modelMatrix",j.matrixWorld),Q.isShaderMaterial||Q.isRawShaderMaterial){const rn=Q.uniformsGroups;for(let Co=0,yd=rn.length;Co<yd;Co++)if(lt.isWebGL2){const wc=rn[Co];ie.update(wc,ii),ie.bind(wc,ii)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ii}function vd(L,V){L.ambientLightColor.needsUpdate=V,L.lightProbe.needsUpdate=V,L.directionalLights.needsUpdate=V,L.directionalLightShadows.needsUpdate=V,L.pointLights.needsUpdate=V,L.pointLightShadows.needsUpdate=V,L.spotLights.needsUpdate=V,L.spotLightShadows.needsUpdate=V,L.rectAreaLights.needsUpdate=V,L.hemisphereLights.needsUpdate=V}function xd(L){return L.isMeshLambertMaterial||L.isMeshToonMaterial||L.isMeshPhongMaterial||L.isMeshStandardMaterial||L.isShadowMaterial||L.isShaderMaterial&&L.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(L,V,K){pt.get(L.texture).__webglTexture=V,pt.get(L.depthTexture).__webglTexture=K;const Q=pt.get(L);Q.__hasExternalTextures=!0,Q.__hasExternalTextures&&(Q.__autoAllocateDepthBuffer=K===void 0,Q.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Q.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(L,V){const K=pt.get(L);K.__webglFramebuffer=V,K.__useDefaultFramebuffer=V===void 0},this.setRenderTarget=function(L,V=0,K=0){b=L,M=V,S=K;let Q=!0,j=null,Tt=!1,Dt=!1;if(L){const kt=pt.get(L);kt.__useDefaultFramebuffer!==void 0?(tt.bindFramebuffer(z.FRAMEBUFFER,null),Q=!1):kt.__webglFramebuffer===void 0?P.setupRenderTarget(L):kt.__hasExternalTextures&&P.rebindTextures(L,pt.get(L.texture).__webglTexture,pt.get(L.depthTexture).__webglTexture);const Yt=L.texture;(Yt.isData3DTexture||Yt.isDataArrayTexture||Yt.isCompressedArrayTexture)&&(Dt=!0);const Wt=pt.get(L).__webglFramebuffer;L.isWebGLCubeRenderTarget?(Array.isArray(Wt[V])?j=Wt[V][K]:j=Wt[V],Tt=!0):lt.isWebGL2&&L.samples>0&&P.useMultisampledRTT(L)===!1?j=pt.get(L).__webglMultisampledFramebuffer:Array.isArray(Wt)?j=Wt[K]:j=Wt,E.copy(L.viewport),U.copy(L.scissor),I=L.scissorTest}else E.copy(Z).multiplyScalar(q).floor(),U.copy(G).multiplyScalar(q).floor(),I=W;if(tt.bindFramebuffer(z.FRAMEBUFFER,j)&&lt.drawBuffers&&Q&&tt.drawBuffers(L,j),tt.viewport(E),tt.scissor(U),tt.setScissorTest(I),Tt){const kt=pt.get(L.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+V,kt.__webglTexture,K)}else if(Dt){const kt=pt.get(L.texture),Yt=V||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,kt.__webglTexture,K||0,Yt)}R=-1},this.readRenderTargetPixels=function(L,V,K,Q,j,Tt,Dt){if(!(L&&L.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ot=pt.get(L).__webglFramebuffer;if(L.isWebGLCubeRenderTarget&&Dt!==void 0&&(Ot=Ot[Dt]),Ot){tt.bindFramebuffer(z.FRAMEBUFFER,Ot);try{const kt=L.texture,Yt=kt.format,Wt=kt.type;if(Yt!==mn&&bt.convert(Yt)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const Vt=Wt===vn&&(J.has("EXT_color_buffer_half_float")||lt.isWebGL2&&J.has("EXT_color_buffer_float"));if(Wt!==ti&&bt.convert(Wt)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Wt===Jn&&(lt.isWebGL2||J.has("OES_texture_float")||J.has("WEBGL_color_buffer_float")))&&!Vt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}V>=0&&V<=L.width-Q&&K>=0&&K<=L.height-j&&z.readPixels(V,K,Q,j,bt.convert(Yt),bt.convert(Wt),Tt)}finally{const kt=b!==null?pt.get(b).__webglFramebuffer:null;tt.bindFramebuffer(z.FRAMEBUFFER,kt)}}},this.copyFramebufferToTexture=function(L,V,K=0){const Q=Math.pow(2,-K),j=Math.floor(V.image.width*Q),Tt=Math.floor(V.image.height*Q);P.setTexture2D(V,0),z.copyTexSubImage2D(z.TEXTURE_2D,K,0,0,L.x,L.y,j,Tt),tt.unbindTexture()},this.copyTextureToTexture=function(L,V,K,Q=0){const j=V.image.width,Tt=V.image.height,Dt=bt.convert(K.format),Ot=bt.convert(K.type);P.setTexture2D(K,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,K.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,K.unpackAlignment),V.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,Q,L.x,L.y,j,Tt,Dt,Ot,V.image.data):V.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,Q,L.x,L.y,V.mipmaps[0].width,V.mipmaps[0].height,Dt,V.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,Q,L.x,L.y,Dt,Ot,V.image),Q===0&&K.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),tt.unbindTexture()},this.copyTextureToTexture3D=function(L,V,K,Q,j=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Tt=L.max.x-L.min.x+1,Dt=L.max.y-L.min.y+1,Ot=L.max.z-L.min.z+1,kt=bt.convert(Q.format),Yt=bt.convert(Q.type);let Wt;if(Q.isData3DTexture)P.setTexture3D(Q,0),Wt=z.TEXTURE_3D;else if(Q.isDataArrayTexture||Q.isCompressedArrayTexture)P.setTexture2DArray(Q,0),Wt=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,Q.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,Q.unpackAlignment);const Vt=z.getParameter(z.UNPACK_ROW_LENGTH),_e=z.getParameter(z.UNPACK_IMAGE_HEIGHT),Ze=z.getParameter(z.UNPACK_SKIP_PIXELS),Re=z.getParameter(z.UNPACK_SKIP_ROWS),Tn=z.getParameter(z.UNPACK_SKIP_IMAGES),ge=K.isCompressedTexture?K.mipmaps[j]:K.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,ge.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,ge.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,L.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,L.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,L.min.z),K.isDataTexture||K.isData3DTexture?z.texSubImage3D(Wt,j,V.x,V.y,V.z,Tt,Dt,Ot,kt,Yt,ge.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(Wt,j,V.x,V.y,V.z,Tt,Dt,Ot,kt,ge.data)):z.texSubImage3D(Wt,j,V.x,V.y,V.z,Tt,Dt,Ot,kt,Yt,ge),z.pixelStorei(z.UNPACK_ROW_LENGTH,Vt),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,_e),z.pixelStorei(z.UNPACK_SKIP_PIXELS,Ze),z.pixelStorei(z.UNPACK_SKIP_ROWS,Re),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Tn),j===0&&Q.generateMipmaps&&z.generateMipmap(Wt),tt.unbindTexture()},this.initTexture=function(L){L.isCubeTexture?P.setTextureCube(L,0):L.isData3DTexture?P.setTexture3D(L,0):L.isDataArrayTexture||L.isCompressedArrayTexture?P.setTexture2DArray(L,0):P.setTexture2D(L,0),tt.unbindTexture()},this.resetState=function(){M=0,S=0,b=null,tt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return On}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ja?"display-p3":"srgb",e.unpackColorSpace=se.workingColorSpace===po?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Qt?yi:tu}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===yi?Qt:kn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Nv extends Mu{}Nv.prototype.isWebGL1Renderer=!0;class go{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new It(t),this.near=e,this.far=n}clone(){return new go(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Uv extends Ne{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Fv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Fa,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=bn()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=bn()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const Ve=new O;class uo{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyMatrix4(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.applyNormalMatrix(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Ve.fromBufferAttribute(this,e),Ve.transformDirection(t),this.setXYZ(e,Ve.x,Ve.y,Ve.z);return this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=Sn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=Sn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=Sn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=Sn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new te(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new uo(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class wu extends hs{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new It(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Gi;const ys=new O,Hi=new O,Wi=new O,Vi=new et,_s=new et,Su=new ee,_r=new O,Ms=new O,Mr=new O,kl=new et,sa=new et,Gl=new et;class Ov extends Ne{constructor(t=new wu){if(super(),this.isSprite=!0,this.type="Sprite",Gi===void 0){Gi=new oe;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Fv(e,5);Gi.setIndex([0,1,2,0,2,3]),Gi.setAttribute("position",new uo(n,3,0,!1)),Gi.setAttribute("uv",new uo(n,2,3,!1))}this.geometry=Gi,this.material=t,this.center=new et(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Hi.setFromMatrixScale(this.matrixWorld),Su.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),Wi.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Hi.multiplyScalar(-Wi.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;wr(_r.set(-.5,-.5,0),Wi,o,Hi,i,r),wr(Ms.set(.5,-.5,0),Wi,o,Hi,i,r),wr(Mr.set(.5,.5,0),Wi,o,Hi,i,r),kl.set(0,0),sa.set(1,0),Gl.set(1,1);let a=t.ray.intersectTriangle(_r,Ms,Mr,!1,ys);if(a===null&&(wr(Ms.set(-.5,.5,0),Wi,o,Hi,i,r),sa.set(0,1),a=t.ray.intersectTriangle(_r,Mr,Ms,!1,ys),a===null))return;const c=t.ray.origin.distanceTo(ys);c<t.near||c>t.far||e.push({distance:c,point:ys.clone(),uv:an.getInterpolation(ys,_r,Ms,Mr,kl,sa,Gl,new et),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function wr(s,t,e,n,i,r){Vi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(_s.x=r*Vi.x-i*Vi.y,_s.y=i*Vi.x+r*Vi.y):_s.copy(Vi),s.copy(t),s.x+=_s.x,s.y+=_s.y,s.applyMatrix4(Su)}class Hl extends te{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Xi=new ee,Wl=new ee,Sr=[],Vl=new Si,zv=new ee,ws=new $,Ss=new qs;class Gn extends ${constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Hl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,zv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xi),Vl.copy(t.boundingBox).applyMatrix4(Xi),this.boundingBox.union(Vl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new qs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xi),Ss.copy(t.boundingSphere).applyMatrix4(Xi),this.boundingSphere.union(Ss)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(ws.geometry=this.geometry,ws.material=this.material,ws.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ss.copy(this.boundingSphere),Ss.applyMatrix4(n),t.ray.intersectsSphere(Ss)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Xi),Wl.multiplyMatrices(n,Xi),ws.matrixWorld=Wl,ws.raycast(t,Sr);for(let o=0,a=Sr.length;o<a;o++){const c=Sr[o];c.instanceId=r,c.object=this,e.push(c)}Sr.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Hl(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Oe extends Ge{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class En{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const h=n[i],d=n[i+1]-h,f=(o-h)/d;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new et:new O);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new O,i=[],r=[],o=[],a=new O,c=new ee;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new O)}r[0]=new O,o[0]=new O;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),u=Math.abs(i[0].y),d=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),u<=l&&(l=u,n.set(0,1,0)),d<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Le(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,p))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Le(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let p=1;p<=t;p++)r[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),o[p].crossVectors(i[p],r[p])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class nc extends En{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e){const n=e||new et,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=c-this.aX,f=l-this.aY;c=d*h-f*u+this.aX,l=d*u+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Bv extends nc{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function ic(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,u){let d=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+u)+(c-a)/u;d*=h,f*=h,i(o,a,d,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const br=new O,ra=new ic,oa=new ic,aa=new ic;class bu extends En{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new O){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(br.subVectors(i[0],i[1]).add(i[0]),l=br);const u=i[a%r],d=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(br.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=br),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(u),f),v=Math.pow(u.distanceToSquared(d),f),g=Math.pow(d.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),ra.initNonuniformCatmullRom(l.x,u.x,d.x,h.x,p,v,g),oa.initNonuniformCatmullRom(l.y,u.y,d.y,h.y,p,v,g),aa.initNonuniformCatmullRom(l.z,u.z,d.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(ra.initCatmullRom(l.x,u.x,d.x,h.x,this.tension),oa.initCatmullRom(l.y,u.y,d.y,h.y,this.tension),aa.initCatmullRom(l.z,u.z,d.z,h.z,this.tension));return n.set(ra.calc(c),oa.calc(c),aa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new O().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Xl(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function kv(s,t){const e=1-s;return e*e*t}function Gv(s,t){return 2*(1-s)*s*t}function Hv(s,t){return s*s*t}function Fs(s,t,e,n){return kv(s,t)+Gv(s,e)+Hv(s,n)}function Wv(s,t){const e=1-s;return e*e*e*t}function Vv(s,t){const e=1-s;return 3*e*e*s*t}function Xv(s,t){return 3*(1-s)*s*s*t}function qv(s,t){return s*s*s*t}function Os(s,t,e,n,i){return Wv(s,t)+Vv(s,e)+Xv(s,n)+qv(s,i)}class Eu extends En{constructor(t=new et,e=new et,n=new et,i=new et){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Os(t,i.x,r.x,o.x,a.x),Os(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Yv extends En{constructor(t=new O,e=new O,n=new O,i=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new O){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Os(t,i.x,r.x,o.x,a.x),Os(t,i.y,r.y,o.y,a.y),Os(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Tu extends En{constructor(t=new et,e=new et){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new et){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new et){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class jv extends En{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Au extends En{constructor(t=new et,e=new et,n=new et){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new et){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Fs(t,i.x,r.x,o.x),Fs(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Kv extends En{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Fs(t,i.x,r.x,o.x),Fs(t,i.y,r.y,o.y),Fs(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sc extends En{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new et){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],u=i[o>i.length-3?i.length-1:o+2];return n.set(Xl(a,c.x,l.x,h.x,u.x),Xl(a,c.y,l.y,h.y,u.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new et().fromArray(i))}return this}}var Ga=Object.freeze({__proto__:null,ArcCurve:Bv,CatmullRomCurve3:bu,CubicBezierCurve:Eu,CubicBezierCurve3:Yv,EllipseCurve:nc,LineCurve:Tu,LineCurve3:jv,QuadraticBezierCurve:Au,QuadraticBezierCurve3:Kv,SplineCurve:sc});class Zv extends En{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ga[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Ga[i.type]().fromJSON(i))}return this}}class ql extends Zv{constructor(t){super(),this.type="Path",this.currentPoint=new et,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Tu(this.currentPoint.clone(),new et(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new Au(this.currentPoint.clone(),new et(t,e),new et(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new Eu(this.currentPoint.clone(),new et(t,e),new et(n,i),new et(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new sc(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){const l=new nc(t,e,n,i,r,o,a,c);if(this.curves.length>0){const u=l.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class rc extends oe{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new O,h=new et;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let u=0,d=3;u<=e;u++,d+=3){const f=n+u/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[d]/t+1)/2,h.y=(o[d+1]/t+1)/2,c.push(h.x,h.y)}for(let u=1;u<=e;u++)r.push(u,u+1,0);this.setIndex(r),this.setAttribute("position",new Jt(o,3)),this.setAttribute("normal",new Jt(a,3)),this.setAttribute("uv",new Jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new rc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class me extends oe{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],u=[],d=[],f=[];let p=0;const v=[],g=n/2;let m=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Jt(u,3)),this.setAttribute("normal",new Jt(d,3)),this.setAttribute("uv",new Jt(f,2));function x(){const _=new O,M=new O;let S=0;const b=(e-t)/n;for(let R=0;R<=r;R++){const w=[],E=R/r,U=E*(e-t)+t;for(let I=0;I<=i;I++){const F=I/i,C=F*c+a,D=Math.sin(C),N=Math.cos(C);M.x=U*D,M.y=-E*n+g,M.z=U*N,u.push(M.x,M.y,M.z),_.set(D,b,N).normalize(),d.push(_.x,_.y,_.z),f.push(F,1-E),w.push(p++)}v.push(w)}for(let R=0;R<i;R++)for(let w=0;w<r;w++){const E=v[w][R],U=v[w+1][R],I=v[w+1][R+1],F=v[w][R+1];h.push(E,U,F),h.push(U,I,F),S+=6}l.addGroup(m,S,0),m+=S}function y(_){const M=p,S=new et,b=new O;let R=0;const w=_===!0?t:e,E=_===!0?1:-1;for(let I=1;I<=i;I++)u.push(0,g*E,0),d.push(0,E,0),f.push(.5,.5),p++;const U=p;for(let I=0;I<=i;I++){const C=I/i*c+a,D=Math.cos(C),N=Math.sin(C);b.x=w*N,b.y=g*E,b.z=w*D,u.push(b.x,b.y,b.z),d.push(0,E,0),S.x=D*.5+.5,S.y=N*.5*E+.5,f.push(S.x,S.y),p++}for(let I=0;I<i;I++){const F=M+I,C=U+I;_===!0?h.push(C,C+1,F):h.push(C+1,C,F),R+=3}l.addGroup(m,R,_===!0?1:2),m+=R}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new me(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ns extends me{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new ns(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class oc extends oe{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const r=[],o=[];a(i),l(n),h(),this.setAttribute("position",new Jt(r,3)),this.setAttribute("normal",new Jt(r.slice(),3)),this.setAttribute("uv",new Jt(o,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const y=new O,_=new O,M=new O;for(let S=0;S<e.length;S+=3)f(e[S+0],y),f(e[S+1],_),f(e[S+2],M),c(y,_,M,x)}function c(x,y,_,M){const S=M+1,b=[];for(let R=0;R<=S;R++){b[R]=[];const w=x.clone().lerp(_,R/S),E=y.clone().lerp(_,R/S),U=S-R;for(let I=0;I<=U;I++)I===0&&R===S?b[R][I]=w:b[R][I]=w.clone().lerp(E,I/U)}for(let R=0;R<S;R++)for(let w=0;w<2*(S-R)-1;w++){const E=Math.floor(w/2);w%2===0?(d(b[R][E+1]),d(b[R+1][E]),d(b[R][E])):(d(b[R][E+1]),d(b[R+1][E+1]),d(b[R+1][E]))}}function l(x){const y=new O;for(let _=0;_<r.length;_+=3)y.x=r[_+0],y.y=r[_+1],y.z=r[_+2],y.normalize().multiplyScalar(x),r[_+0]=y.x,r[_+1]=y.y,r[_+2]=y.z}function h(){const x=new O;for(let y=0;y<r.length;y+=3){x.x=r[y+0],x.y=r[y+1],x.z=r[y+2];const _=g(x)/2/Math.PI+.5,M=m(x)/Math.PI+.5;o.push(_,1-M)}p(),u()}function u(){for(let x=0;x<o.length;x+=6){const y=o[x+0],_=o[x+2],M=o[x+4],S=Math.max(y,_,M),b=Math.min(y,_,M);S>.9&&b<.1&&(y<.2&&(o[x+0]+=1),_<.2&&(o[x+2]+=1),M<.2&&(o[x+4]+=1))}}function d(x){r.push(x.x,x.y,x.z)}function f(x,y){const _=x*3;y.x=t[_+0],y.y=t[_+1],y.z=t[_+2]}function p(){const x=new O,y=new O,_=new O,M=new O,S=new et,b=new et,R=new et;for(let w=0,E=0;w<r.length;w+=9,E+=6){x.set(r[w+0],r[w+1],r[w+2]),y.set(r[w+3],r[w+4],r[w+5]),_.set(r[w+6],r[w+7],r[w+8]),S.set(o[E+0],o[E+1]),b.set(o[E+2],o[E+3]),R.set(o[E+4],o[E+5]),M.copy(x).add(y).add(_).divideScalar(3);const U=g(M);v(S,E+0,x,U),v(b,E+2,y,U),v(R,E+4,_,U)}}function v(x,y,_,M){M<0&&x.x===1&&(o[y]=x.x-1),_.x===0&&_.z===0&&(o[y]=M/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new oc(t.vertices,t.indices,t.radius,t.details)}}let ac=class extends ql{constructor(t){super(t),this.uuid=bn(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new ql().fromJSON(i))}return this}};const Jv={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=Cu(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,u,d,f;if(n&&(r=nx(s,t,r,e)),s.length>80*e){a=l=s[0],c=h=s[1];for(let p=e;p<i;p+=e)u=s[p],d=s[p+1],u<a&&(a=u),d<c&&(c=d),u>l&&(l=u),d>h&&(h=d);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Gs(r,o,e,a,c,f,0),o}};function Cu(s,t,e,n,i){let r,o;if(i===fx(s,t,e,n)>0)for(r=t;r<e;r+=n)o=Yl(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=Yl(r,s[r],s[r+1],o);return o&&vo(o,o.next)&&(Ws(o),o=o.next),o}function Mi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(vo(e,e.next)||ve(e.prev,e,e.next)===0)){if(Ws(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Gs(s,t,e,n,i,r,o){if(!s)return;!o&&r&&ax(s,n,i,r);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?$v(s,n,i,r):Qv(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),Ws(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=tx(Mi(s),t,e),Gs(s,t,e,n,i,r,2)):o===2&&ex(s,t,e,n,i,r):Gs(Mi(s),t,e,n,i,r,1);break}}}function Qv(s){const t=s.prev,e=s,n=s.next;if(ve(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=i<r?i<o?i:o:r<o?r:o,u=a<c?a<l?a:l:c<l?c:l,d=i>r?i>o?i:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=d&&p.y>=u&&p.y<=f&&Qi(i,a,r,c,o,l,p.x,p.y)&&ve(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function $v(s,t,e,n){const i=s.prev,r=s,o=s.next;if(ve(i,r,o)>=0)return!1;const a=i.x,c=r.x,l=o.x,h=i.y,u=r.y,d=o.y,f=a<c?a<l?a:l:c<l?c:l,p=h<u?h<d?h:d:u<d?u:d,v=a>c?a>l?a:l:c>l?c:l,g=h>u?h>d?h:d:u>d?u:d,m=Ha(f,p,t,e,n),x=Ha(v,g,t,e,n);let y=s.prevZ,_=s.nextZ;for(;y&&y.z>=m&&_&&_.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Qi(a,h,c,u,l,d,y.x,y.y)&&ve(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&Qi(a,h,c,u,l,d,_.x,_.y)&&ve(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==o&&Qi(a,h,c,u,l,d,y.x,y.y)&&ve(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=x;){if(_.x>=f&&_.x<=v&&_.y>=p&&_.y<=g&&_!==i&&_!==o&&Qi(a,h,c,u,l,d,_.x,_.y)&&ve(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function tx(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!vo(i,r)&&Ru(i,n,n.next,r)&&Hs(i,r)&&Hs(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),Ws(n),Ws(n.next),n=s=r),n=n.next}while(n!==s);return Mi(n)}function ex(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&hx(o,a)){let c=Pu(o,a);o=Mi(o,o.next),c=Mi(c,c.next),Gs(o,t,e,n,i,r,0),Gs(c,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function nx(s,t,e,n){const i=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:s.length,l=Cu(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(lx(l));for(i.sort(ix),r=0;r<i.length;r++)e=sx(i[r],e);return e}function ix(s,t){return s.x-t.x}function sx(s,t){const e=rx(s,t);if(!e)return t;const n=Pu(e,s);return Mi(n,n.next),Mi(e,e.next)}function rx(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const d=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(d<=r&&d>n&&(n=d,i=e.x<e.next.x?e:e.next,d===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,u;e=i;do r>=e.x&&e.x>=c&&r!==e.x&&Qi(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(u=Math.abs(o-e.y)/(r-e.x),Hs(e,s)&&(u<h||u===h&&(e.x>i.x||e.x===i.x&&ox(i,e)))&&(i=e,h=u)),e=e.next;while(e!==a);return i}function ox(s,t){return ve(s.prev,s,t.prev)<0&&ve(t.next,s,s.next)<0}function ax(s,t,e,n){let i=s;do i.z===0&&(i.z=Ha(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,cx(i)}function cx(s){let t,e,n,i,r,o,a,c,l=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,l*=2}while(o>1);return s}function Ha(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function lx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Qi(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function hx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!ux(s,t)&&(Hs(s,t)&&Hs(t,s)&&dx(s,t)&&(ve(s.prev,s,t.prev)||ve(s,t.prev,t))||vo(s,t)&&ve(s.prev,s,s.next)>0&&ve(t.prev,t,t.next)>0)}function ve(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function vo(s,t){return s.x===t.x&&s.y===t.y}function Ru(s,t,e,n){const i=Tr(ve(s,t,e)),r=Tr(ve(s,t,n)),o=Tr(ve(e,n,s)),a=Tr(ve(e,n,t));return!!(i!==r&&o!==a||i===0&&Er(s,e,t)||r===0&&Er(s,n,t)||o===0&&Er(e,s,n)||a===0&&Er(e,t,n))}function Er(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Tr(s){return s>0?1:s<0?-1:0}function ux(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Ru(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Hs(s,t){return ve(s.prev,s,s.next)<0?ve(s,t,s.next)>=0&&ve(s,s.prev,t)>=0:ve(s,t,s.prev)<0||ve(s,s.next,t)<0}function dx(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Pu(s,t){const e=new Wa(s.i,s.x,s.y),n=new Wa(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Yl(s,t,e,n){const i=new Wa(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function Ws(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Wa(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function fx(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class zs{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return zs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];jl(t),Kl(n,t);let o=t.length;e.forEach(jl);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,Kl(n,e[c]);const a=Jv.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function jl(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function Kl(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class xo extends oe{constructor(t=new ac([new et(.5,.5),new et(-.5,.5),new et(-.5,-.5),new et(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new Jt(i,3)),this.setAttribute("uv",new Jt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,u=e.depth!==void 0?e.depth:1;let d=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:px;let y,_=!1,M,S,b,R;m&&(y=m.getSpacedPoints(h),_=!0,d=!1,M=m.computeFrenetFrames(h,!1),S=new O,b=new O,R=new O),d||(g=0,f=0,p=0,v=0);const w=a.extractPoints(l);let E=w.shape;const U=w.holes;if(!zs.isClockWise(E)){E=E.reverse();for(let z=0,ct=U.length;z<ct;z++){const J=U[z];zs.isClockWise(J)&&(U[z]=J.reverse())}}const F=zs.triangulateShape(E,U),C=E;for(let z=0,ct=U.length;z<ct;z++){const J=U[z];E=E.concat(J)}function D(z,ct,J){return ct||console.error("THREE.ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(ct,J)}const N=E.length,q=F.length;function k(z,ct,J){let lt,tt,Pt;const pt=z.x-ct.x,P=z.y-ct.y,A=J.x-z.x,H=J.y-z.y,ot=pt*pt+P*P,rt=pt*H-P*A;if(Math.abs(rt)>Number.EPSILON){const it=Math.sqrt(ot),yt=Math.sqrt(A*A+H*H),ut=ct.x-P/it,Et=ct.y+pt/it,Ut=J.x-H/yt,Gt=J.y+A/yt,at=((Ut-ut)*H-(Gt-Et)*A)/(pt*H-P*A);lt=ut+pt*at-z.x,tt=Et+P*at-z.y;const $t=lt*lt+tt*tt;if($t<=2)return new et(lt,tt);Pt=Math.sqrt($t/2)}else{let it=!1;pt>Number.EPSILON?A>Number.EPSILON&&(it=!0):pt<-Number.EPSILON?A<-Number.EPSILON&&(it=!0):Math.sign(P)===Math.sign(H)&&(it=!0),it?(lt=-P,tt=pt,Pt=Math.sqrt(ot)):(lt=pt,tt=P,Pt=Math.sqrt(ot/2))}return new et(lt/Pt,tt/Pt)}const X=[];for(let z=0,ct=C.length,J=ct-1,lt=z+1;z<ct;z++,J++,lt++)J===ct&&(J=0),lt===ct&&(lt=0),X[z]=k(C[z],C[J],C[lt]);const Z=[];let G,W=X.concat();for(let z=0,ct=U.length;z<ct;z++){const J=U[z];G=[];for(let lt=0,tt=J.length,Pt=tt-1,pt=lt+1;lt<tt;lt++,Pt++,pt++)Pt===tt&&(Pt=0),pt===tt&&(pt=0),G[lt]=k(J[lt],J[Pt],J[pt]);Z.push(G),W=W.concat(G)}for(let z=0;z<g;z++){const ct=z/g,J=f*Math.cos(ct*Math.PI/2),lt=p*Math.sin(ct*Math.PI/2)+v;for(let tt=0,Pt=C.length;tt<Pt;tt++){const pt=D(C[tt],X[tt],lt);st(pt.x,pt.y,-J)}for(let tt=0,Pt=U.length;tt<Pt;tt++){const pt=U[tt];G=Z[tt];for(let P=0,A=pt.length;P<A;P++){const H=D(pt[P],G[P],lt);st(H.x,H.y,-J)}}}const Y=p+v;for(let z=0;z<N;z++){const ct=d?D(E[z],W[z],Y):E[z];_?(b.copy(M.normals[0]).multiplyScalar(ct.x),S.copy(M.binormals[0]).multiplyScalar(ct.y),R.copy(y[0]).add(b).add(S),st(R.x,R.y,R.z)):st(ct.x,ct.y,0)}for(let z=1;z<=h;z++)for(let ct=0;ct<N;ct++){const J=d?D(E[ct],W[ct],Y):E[ct];_?(b.copy(M.normals[z]).multiplyScalar(J.x),S.copy(M.binormals[z]).multiplyScalar(J.y),R.copy(y[z]).add(b).add(S),st(R.x,R.y,R.z)):st(J.x,J.y,u/h*z)}for(let z=g-1;z>=0;z--){const ct=z/g,J=f*Math.cos(ct*Math.PI/2),lt=p*Math.sin(ct*Math.PI/2)+v;for(let tt=0,Pt=C.length;tt<Pt;tt++){const pt=D(C[tt],X[tt],lt);st(pt.x,pt.y,u+J)}for(let tt=0,Pt=U.length;tt<Pt;tt++){const pt=U[tt];G=Z[tt];for(let P=0,A=pt.length;P<A;P++){const H=D(pt[P],G[P],lt);_?st(H.x,H.y+y[h-1].y,y[h-1].x+J):st(H.x,H.y,u+J)}}}nt(),ht();function nt(){const z=i.length/3;if(d){let ct=0,J=N*ct;for(let lt=0;lt<q;lt++){const tt=F[lt];vt(tt[2]+J,tt[1]+J,tt[0]+J)}ct=h+g*2,J=N*ct;for(let lt=0;lt<q;lt++){const tt=F[lt];vt(tt[0]+J,tt[1]+J,tt[2]+J)}}else{for(let ct=0;ct<q;ct++){const J=F[ct];vt(J[2],J[1],J[0])}for(let ct=0;ct<q;ct++){const J=F[ct];vt(J[0]+N*h,J[1]+N*h,J[2]+N*h)}}n.addGroup(z,i.length/3-z,0)}function ht(){const z=i.length/3;let ct=0;dt(C,ct),ct+=C.length;for(let J=0,lt=U.length;J<lt;J++){const tt=U[J];dt(tt,ct),ct+=tt.length}n.addGroup(z,i.length/3-z,1)}function dt(z,ct){let J=z.length;for(;--J>=0;){const lt=J;let tt=J-1;tt<0&&(tt=z.length-1);for(let Pt=0,pt=h+g*2;Pt<pt;Pt++){const P=N*Pt,A=N*(Pt+1),H=ct+lt+P,ot=ct+tt+P,rt=ct+tt+A,it=ct+lt+A;xt(H,ot,rt,it)}}}function st(z,ct,J){c.push(z),c.push(ct),c.push(J)}function vt(z,ct,J){ft(z),ft(ct),ft(J);const lt=i.length/3,tt=x.generateTopUV(n,i,lt-3,lt-2,lt-1);Mt(tt[0]),Mt(tt[1]),Mt(tt[2])}function xt(z,ct,J,lt){ft(z),ft(ct),ft(lt),ft(ct),ft(J),ft(lt);const tt=i.length/3,Pt=x.generateSideWallUV(n,i,tt-6,tt-3,tt-2,tt-1);Mt(Pt[0]),Mt(Pt[1]),Mt(Pt[3]),Mt(Pt[1]),Mt(Pt[2]),Mt(Pt[3])}function ft(z){i.push(c[z*3+0]),i.push(c[z*3+1]),i.push(c[z*3+2])}function Mt(z){r.push(z.x),r.push(z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return mx(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Ga[i.type]().fromJSON(i)),new xo(n,t.options)}}const px={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new et(r,o),new et(a,c),new et(l,h)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],u=t[n*3+2],d=t[i*3],f=t[i*3+1],p=t[i*3+2],v=t[r*3],g=t[r*3+1],m=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new et(o,1-c),new et(l,1-u),new et(d,1-p),new et(v,1-m)]:[new et(a,1-c),new et(h,1-u),new et(f,1-p),new et(g,1-m)]}};function mx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class cc extends oc{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],r=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,r,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new cc(t.radius,t.detail)}}class lc extends oe{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let u=t;const d=(e-t)/i,f=new O,p=new et;for(let v=0;v<=i;v++){for(let g=0;g<=n;g++){const m=r+g/n*o;f.x=u*Math.cos(m),f.y=u*Math.sin(m),c.push(f.x,f.y,f.z),l.push(0,0,1),p.x=(f.x/e+1)/2,p.y=(f.y/e+1)/2,h.push(p.x,p.y)}u+=d}for(let v=0;v<i;v++){const g=v*(n+1);for(let m=0;m<n;m++){const x=m+g,y=x,_=x+n+1,M=x+n+2,S=x+1;a.push(y,_,S),a.push(_,M,S)}}this.setIndex(a),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new lc(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Vs extends oe{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],u=new O,d=new O,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const x=[],y=m/n;let _=0;m===0&&o===0?_=.5/e:m===n&&c===Math.PI&&(_=-.5/e);for(let M=0;M<=e;M++){const S=M/e;u.x=-t*Math.cos(i+S*r)*Math.sin(o+y*a),u.y=t*Math.cos(o+y*a),u.z=t*Math.sin(i+S*r)*Math.sin(o+y*a),p.push(u.x,u.y,u.z),d.copy(u).normalize(),v.push(d.x,d.y,d.z),g.push(S+_,1-y),x.push(l++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const y=h[m][x+1],_=h[m][x],M=h[m+1][x],S=h[m+1][x+1];(m!==0||o>0)&&f.push(y,_,S),(m!==n-1||c<Math.PI)&&f.push(_,M,S)}this.setIndex(f),this.setAttribute("position",new Jt(p,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class Ys extends oe{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new O,u=new O,d=new O;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*r,g=f/n*Math.PI*2;u.x=(t+e*Math.cos(g))*Math.cos(v),u.y=(t+e*Math.cos(g))*Math.sin(v),u.z=e*Math.sin(g),a.push(u.x,u.y,u.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),d.subVectors(u,h).normalize(),c.push(d.x,d.y,d.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,x=(i+1)*f+p;o.push(v,g,x),o.push(g,m,x)}this.setIndex(o),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ys(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class gx extends De{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Nt extends hs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new It(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new It(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=eu,this.normalScale=new et(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class nn extends Nt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new et(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Le(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new It(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new It(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new It(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Lu extends Ne{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new It(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class vx extends Lu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.groundColor=new It(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ca=new ee,Zl=new O,Jl=new O;class xx{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new et(512,512),this.map=null,this.mapPass=null,this.matrix=new ee,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new $a,this._frameExtents=new et(1,1),this._viewportCount=1,this._viewports=[new Ie(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Zl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Zl),Jl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(Jl),e.updateMatrixWorld(),ca.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ca),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ca)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class yx extends xx{constructor(){super(new tc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class Ql extends Lu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ne.DEFAULT_UP),this.updateMatrix(),this.target=new Ne,this.shadow=new yx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class _x{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=$l(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=$l();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function $l(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ja);class yo extends ${constructor(){const t=yo.SkyShader,e=new De({name:t.name,uniforms:Bn.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Ye,depthWrite:!1});super(new Rt(1,1,1),e),this.isSky=!0}}yo.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new O},up:{value:new O(0,1,0)}},vertexShader:`
		uniform vec3 sunPosition;
		uniform float rayleigh;
		uniform float turbidity;
		uniform float mieCoefficient;
		uniform vec3 up;

		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		// constants for atmospheric scattering
		const float e = 2.71828182845904523536028747135266249775724709369995957;
		const float pi = 3.141592653589793238462643383279502884197169;

		// wavelength of used primaries, according to preetham
		const vec3 lambda = vec3( 680E-9, 550E-9, 450E-9 );
		// this pre-calcuation replaces older TotalRayleigh(vec3 lambda) function:
		// (8.0 * pow(pi, 3.0) * pow(pow(n, 2.0) - 1.0, 2.0) * (6.0 + 3.0 * pn)) / (3.0 * N * pow(lambda, vec3(4.0)) * (6.0 - 7.0 * pn))
		const vec3 totalRayleigh = vec3( 5.804542996261093E-6, 1.3562911419845635E-5, 3.0265902468824876E-5 );

		// mie stuff
		// K coefficient for the primaries
		const float v = 4.0;
		const vec3 K = vec3( 0.686, 0.678, 0.666 );
		// MieConst = pi * pow( ( 2.0 * pi ) / lambda, vec3( v - 2.0 ) ) * K
		const vec3 MieConst = vec3( 1.8399918514433978E14, 2.7798023919660528E14, 4.0790479543861094E14 );

		// earth shadow hack
		// cutoffAngle = pi / 1.95;
		const float cutoffAngle = 1.6110731556870734;
		const float steepness = 1.5;
		const float EE = 1000.0;

		float sunIntensity( float zenithAngleCos ) {
			zenithAngleCos = clamp( zenithAngleCos, -1.0, 1.0 );
			return EE * max( 0.0, 1.0 - pow( e, -( ( cutoffAngle - acos( zenithAngleCos ) ) / steepness ) ) );
		}

		vec3 totalMie( float T ) {
			float c = ( 0.2 * T ) * 10E-18;
			return 0.434 * c * MieConst;
		}

		void main() {

			vec4 worldPosition = modelMatrix * vec4( position, 1.0 );
			vWorldPosition = worldPosition.xyz;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
			gl_Position.z = gl_Position.w; // set z to camera.far

			vSunDirection = normalize( sunPosition );

			vSunE = sunIntensity( dot( vSunDirection, up ) );

			vSunfade = 1.0 - clamp( 1.0 - exp( ( sunPosition.y / 450000.0 ) ), 0.0, 1.0 );

			float rayleighCoefficient = rayleigh - ( 1.0 * ( 1.0 - vSunfade ) );

			// extinction (absorbtion + out scattering)
			// rayleigh coefficients
			vBetaR = totalRayleigh * rayleighCoefficient;

			// mie coefficients
			vBetaM = totalMie( turbidity ) * mieCoefficient;

		}`,fragmentShader:`
		varying vec3 vWorldPosition;
		varying vec3 vSunDirection;
		varying float vSunfade;
		varying vec3 vBetaR;
		varying vec3 vBetaM;
		varying float vSunE;

		uniform float mieDirectionalG;
		uniform vec3 up;

		// constants for atmospheric scattering
		const float pi = 3.141592653589793238462643383279502884197169;

		const float n = 1.0003; // refractive index of air
		const float N = 2.545E25; // number of molecules per unit volume for air at 288.15K and 1013mb (sea level -45 celsius)

		// optical length at zenith for molecules
		const float rayleighZenithLength = 8.4E3;
		const float mieZenithLength = 1.25E3;
		// 66 arc seconds -> degrees, and the cosine of that
		const float sunAngularDiameterCos = 0.999956676946448443553574619906976478926848692873900859324;

		// 3.0 / ( 16.0 * pi )
		const float THREE_OVER_SIXTEENPI = 0.05968310365946075;
		// 1.0 / ( 4.0 * pi )
		const float ONE_OVER_FOURPI = 0.07957747154594767;

		float rayleighPhase( float cosTheta ) {
			return THREE_OVER_SIXTEENPI * ( 1.0 + pow( cosTheta, 2.0 ) );
		}

		float hgPhase( float cosTheta, float g ) {
			float g2 = pow( g, 2.0 );
			float inverse = 1.0 / pow( 1.0 - 2.0 * g * cosTheta + g2, 1.5 );
			return ONE_OVER_FOURPI * ( ( 1.0 - g2 ) * inverse );
		}

		void main() {

			vec3 direction = normalize( vWorldPosition - cameraPosition );

			// optical length
			// cutoff angle at 90 to avoid singularity in next formula.
			float zenithAngle = acos( max( 0.0, dot( up, direction ) ) );
			float inverse = 1.0 / ( cos( zenithAngle ) + 0.15 * pow( 93.885 - ( ( zenithAngle * 180.0 ) / pi ), -1.253 ) );
			float sR = rayleighZenithLength * inverse;
			float sM = mieZenithLength * inverse;

			// combined extinction factor
			vec3 Fex = exp( -( vBetaR * sR + vBetaM * sM ) );

			// in scattering
			float cosTheta = dot( direction, vSunDirection );

			float rPhase = rayleighPhase( cosTheta * 0.5 + 0.5 );
			vec3 betaRTheta = vBetaR * rPhase;

			float mPhase = hgPhase( cosTheta, mieDirectionalG );
			vec3 betaMTheta = vBetaM * mPhase;

			vec3 Lin = pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * ( 1.0 - Fex ), vec3( 1.5 ) );
			Lin *= mix( vec3( 1.0 ), pow( vSunE * ( ( betaRTheta + betaMTheta ) / ( vBetaR + vBetaM ) ) * Fex, vec3( 1.0 / 2.0 ) ), clamp( pow( 1.0 - dot( up, vSunDirection ), 5.0 ), 0.0, 1.0 ) );

			// nightsky
			float theta = acos( direction.y ); // elevation --> y-axis, [-pi/2, pi/2]
			float phi = atan( direction.z, direction.x ); // azimuth --> x-axis [-pi/2, pi/2]
			vec2 uv = vec2( phi, theta ) / vec2( 2.0 * pi, pi ) + vec2( 0.5, 0.0 );
			vec3 L0 = vec3( 0.1 ) * Fex;

			// composition + solar disc
			float sundisk = smoothstep( sunAngularDiameterCos, sunAngularDiameterCos + 0.00002, cosTheta );
			L0 += ( vSunE * 19000.0 * Fex ) * sundisk;

			vec3 texColor = ( Lin + L0 ) * 0.04 + vec3( 0.0, 0.0003, 0.00075 );

			vec3 retColor = pow( texColor, vec3( 1.0 / ( 1.2 + ( 1.2 * vSunfade ) ) ) );

			gl_FragColor = vec4( retColor, 1.0 );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>

		}`};const Iu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class bi{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Mx=new tc(-1,1,1,-1,0,1);class wx extends oe{constructor(){super(),this.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Jt([0,2,0,0,2,0],2))}}const Sx=new wx;class _o{constructor(t){this._mesh=new $(Sx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Mx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Du extends bi{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof De?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Bn.clone(t.uniforms),this.material=new De({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new _o(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class th extends bi{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class bx extends bi{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Ex{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new et);this._width=n.width,this._height=n.height,e=new tn(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:vn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Du(Iu),this.copyPass.material.blending=zn,this.clock=new _x}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}th!==void 0&&(o instanceof th?n=!0:o instanceof bx&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new et);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Tx extends bi{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new It}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const Ax={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new It(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			vec3 luma = vec3( 0.299, 0.587, 0.114 );

			float v = dot( texel.xyz, luma );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class cs extends bi{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new et(t.x,t.y):new et(256,256),this.clearColor=new It(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new tn(r,o,{type:vn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let u=0;u<this.nMips;u++){const d=new tn(r,o,{type:vn});d.texture.name="UnrealBloomPass.h"+u,d.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(d);const f=new tn(r,o,{type:vn});f.texture.name="UnrealBloomPass.v"+u,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=Ax;this.highPassUniforms=Bn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new De({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let u=0;u<this.nMips;u++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[u])),this.separableBlurMaterials[u].uniforms.invSize.value=new et(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Iu;this.copyUniforms=Bn.clone(h.uniforms),this.blendMaterial=new De({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Pa,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new It,this.oldClearAlpha=1,this.basic=new us,this.fsQuad=new _o(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new et(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=cs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=cs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new De({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new et(.5,.5)},direction:{value:new et(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}getCompositeMaterial(t){return new De({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}cs.BlurDirectionX=new et(1,0);cs.BlurDirectionY=new et(0,1);const Ar={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new et(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		void SMAAEdgeDetectionVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0,  1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4(  1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 2 ] = texcoord.xyxy + resolution.xyxy * vec4( -2.0, 0.0, 0.0,  2.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAAEdgeDetectionVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];

		vec4 SMAAColorEdgeDetectionPS( vec2 texcoord, vec4 offset[3], sampler2D colorTex ) {
			vec2 threshold = vec2( SMAA_THRESHOLD, SMAA_THRESHOLD );

			// Calculate color deltas:
			vec4 delta;
			vec3 C = texture2D( colorTex, texcoord ).rgb;

			vec3 Cleft = texture2D( colorTex, offset[0].xy ).rgb;
			vec3 t = abs( C - Cleft );
			delta.x = max( max( t.r, t.g ), t.b );

			vec3 Ctop = texture2D( colorTex, offset[0].zw ).rgb;
			t = abs( C - Ctop );
			delta.y = max( max( t.r, t.g ), t.b );

			// We do the usual threshold:
			vec2 edges = step( threshold, delta.xy );

			// Then discard if there is no edge:
			if ( dot( edges, vec2( 1.0, 1.0 ) ) == 0.0 )
				discard;

			// Calculate right and bottom deltas:
			vec3 Cright = texture2D( colorTex, offset[1].xy ).rgb;
			t = abs( C - Cright );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Cbottom  = texture2D( colorTex, offset[1].zw ).rgb;
			t = abs( C - Cbottom );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the maximum delta in the direct neighborhood:
			float maxDelta = max( max( max( delta.x, delta.y ), delta.z ), delta.w );

			// Calculate left-left and top-top deltas:
			vec3 Cleftleft  = texture2D( colorTex, offset[2].xy ).rgb;
			t = abs( C - Cleftleft );
			delta.z = max( max( t.r, t.g ), t.b );

			vec3 Ctoptop = texture2D( colorTex, offset[2].zw ).rgb;
			t = abs( C - Ctoptop );
			delta.w = max( max( t.r, t.g ), t.b );

			// Calculate the final maximum delta:
			maxDelta = max( max( maxDelta, delta.z ), delta.w );

			// Local contrast adaptation in action:
			edges.xy *= step( 0.5 * maxDelta, delta.xy );

			return vec4( edges, 0.0, 0.0 );
		}

		void main() {

			gl_FragColor = SMAAColorEdgeDetectionPS( vUv, vOffset, tDiffuse );

		}`},Cr={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new et(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 3 ];
		varying vec2 vPixcoord;

		void SMAABlendingWeightCalculationVS( vec2 texcoord ) {
			vPixcoord = texcoord / resolution;

			// We will use these offsets for the searches later on (see @PSEUDO_GATHER4):
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.25, 0.125, 1.25, 0.125 ); // WebGL port note: Changed sign in Y and W components
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( -0.125, 0.25, -0.125, -1.25 ); // WebGL port note: Changed sign in Y and W components

			// And these for the searches, they indicate the ends of the loops:
			vOffset[ 2 ] = vec4( vOffset[ 0 ].xz, vOffset[ 1 ].yw ) + vec4( -2.0, 2.0, -2.0, 2.0 ) * resolution.xxyy * float( SMAA_MAX_SEARCH_STEPS );

		}

		void main() {

			vUv = uv;

			SMAABlendingWeightCalculationVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		#define SMAASampleLevelZeroOffset( tex, coord, offset ) texture2D( tex, coord + float( offset ) * resolution, 0.0 )

		uniform sampler2D tDiffuse;
		uniform sampler2D tArea;
		uniform sampler2D tSearch;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[3];
		varying vec2 vPixcoord;

		#if __VERSION__ == 100
		vec2 round( vec2 x ) {
			return sign( x ) * floor( abs( x ) + 0.5 );
		}
		#endif

		float SMAASearchLength( sampler2D searchTex, vec2 e, float bias, float scale ) {
			// Not required if searchTex accesses are set to point:
			// float2 SEARCH_TEX_PIXEL_SIZE = 1.0 / float2(66.0, 33.0);
			// e = float2(bias, 0.0) + 0.5 * SEARCH_TEX_PIXEL_SIZE +
			//     e * float2(scale, 1.0) * float2(64.0, 32.0) * SEARCH_TEX_PIXEL_SIZE;
			e.r = bias + e.r * scale;
			return 255.0 * texture2D( searchTex, e, 0.0 ).r;
		}

		float SMAASearchXLeft( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			/**
				* @PSEUDO_GATHER4
				* This texcoord has been offset by (-0.25, -0.125) in the vertex shader to
				* sample between edge, thus fetching four edges in a row.
				* Sampling with different offsets in each direction allows to disambiguate
				* which edges are active from the four fetched ones.
				*/
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x > end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			// We correct the previous (-0.25, -0.125) offset we applied:
			texcoord.x += 0.25 * resolution.x;

			// The searches are bias by 1, so adjust the coords accordingly:
			texcoord.x += resolution.x;

			// Disambiguate the length added by the last step:
			texcoord.x += 2.0 * resolution.x; // Undo last step
			texcoord.x -= resolution.x * SMAASearchLength(searchTex, e, 0.0, 0.5);

			return texcoord.x;
		}

		float SMAASearchXRight( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 0.0, 1.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 2.0, 0.0 ) * resolution;
				if ( ! ( texcoord.x < end && e.g > 0.8281 && e.r == 0.0 ) ) break;
			}

			texcoord.x -= 0.25 * resolution.x;
			texcoord.x -= resolution.x;
			texcoord.x -= 2.0 * resolution.x;
			texcoord.x += resolution.x * SMAASearchLength( searchTex, e, 0.5, 0.5 );

			return texcoord.x;
		}

		float SMAASearchYUp( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord += vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y > end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y -= 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y; // WebGL port note: Changed sign
			texcoord.y -= 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y * SMAASearchLength( searchTex, e.gr, 0.0, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		float SMAASearchYDown( sampler2D edgesTex, sampler2D searchTex, vec2 texcoord, float end ) {
			vec2 e = vec2( 1.0, 0.0 );

			for ( int i = 0; i < SMAA_MAX_SEARCH_STEPS; i ++ ) { // WebGL port note: Changed while to for
				e = texture2D( edgesTex, texcoord, 0.0 ).rg;
				texcoord -= vec2( 0.0, 2.0 ) * resolution; // WebGL port note: Changed sign
				if ( ! ( texcoord.y < end && e.r > 0.8281 && e.g == 0.0 ) ) break;
			}

			texcoord.y += 0.25 * resolution.y; // WebGL port note: Changed sign
			texcoord.y += resolution.y; // WebGL port note: Changed sign
			texcoord.y += 2.0 * resolution.y; // WebGL port note: Changed sign
			texcoord.y -= resolution.y * SMAASearchLength( searchTex, e.gr, 0.5, 0.5 ); // WebGL port note: Changed sign

			return texcoord.y;
		}

		vec2 SMAAArea( sampler2D areaTex, vec2 dist, float e1, float e2, float offset ) {
			// Rounding prevents precision errors of bilinear filtering:
			vec2 texcoord = float( SMAA_AREATEX_MAX_DISTANCE ) * round( 4.0 * vec2( e1, e2 ) ) + dist;

			// We do a scale and bias for mapping to texel space:
			texcoord = SMAA_AREATEX_PIXEL_SIZE * texcoord + ( 0.5 * SMAA_AREATEX_PIXEL_SIZE );

			// Move to proper place, according to the subpixel offset:
			texcoord.y += SMAA_AREATEX_SUBTEX_SIZE * offset;

			return texture2D( areaTex, texcoord, 0.0 ).rg;
		}

		vec4 SMAABlendingWeightCalculationPS( vec2 texcoord, vec2 pixcoord, vec4 offset[ 3 ], sampler2D edgesTex, sampler2D areaTex, sampler2D searchTex, ivec4 subsampleIndices ) {
			vec4 weights = vec4( 0.0, 0.0, 0.0, 0.0 );

			vec2 e = texture2D( edgesTex, texcoord ).rg;

			if ( e.g > 0.0 ) { // Edge at north
				vec2 d;

				// Find the distance to the left:
				vec2 coords;
				coords.x = SMAASearchXLeft( edgesTex, searchTex, offset[ 0 ].xy, offset[ 2 ].x );
				coords.y = offset[ 1 ].y; // offset[1].y = texcoord.y - 0.25 * resolution.y (@CROSSING_OFFSET)
				d.x = coords.x;

				// Now fetch the left crossing edges, two at a time using bilinear
				// filtering. Sampling at -0.25 (see @CROSSING_OFFSET) enables to
				// discern what value each edge has:
				float e1 = texture2D( edgesTex, coords, 0.0 ).r;

				// Find the distance to the right:
				coords.x = SMAASearchXRight( edgesTex, searchTex, offset[ 0 ].zw, offset[ 2 ].y );
				d.y = coords.x;

				// We want the distances to be in pixel units (doing this here allow to
				// better interleave arithmetic and memory accesses):
				d = d / resolution.x - pixcoord.x;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the right crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 1, 0 ) ).r;

				// Ok, we know how this pattern looks like, now it is time for getting
				// the actual area:
				weights.rg = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.y ) );
			}

			if ( e.r > 0.0 ) { // Edge at west
				vec2 d;

				// Find the distance to the top:
				vec2 coords;

				coords.y = SMAASearchYUp( edgesTex, searchTex, offset[ 1 ].xy, offset[ 2 ].z );
				coords.x = offset[ 0 ].x; // offset[1].x = texcoord.x - 0.25 * resolution.x;
				d.x = coords.y;

				// Fetch the top crossing edges:
				float e1 = texture2D( edgesTex, coords, 0.0 ).g;

				// Find the distance to the bottom:
				coords.y = SMAASearchYDown( edgesTex, searchTex, offset[ 1 ].zw, offset[ 2 ].w );
				d.y = coords.y;

				// We want the distances to be in pixel units:
				d = d / resolution.y - pixcoord.y;

				// SMAAArea below needs a sqrt, as the areas texture is compressed
				// quadratically:
				vec2 sqrt_d = sqrt( abs( d ) );

				// Fetch the bottom crossing edges:
				coords.y -= 1.0 * resolution.y; // WebGL port note: Added
				float e2 = SMAASampleLevelZeroOffset( edgesTex, coords, ivec2( 0, 1 ) ).g;

				// Get the area for this direction:
				weights.ba = SMAAArea( areaTex, sqrt_d, e1, e2, float( subsampleIndices.x ) );
			}

			return weights;
		}

		void main() {

			gl_FragColor = SMAABlendingWeightCalculationPS( vUv, vPixcoord, vOffset, tDiffuse, tArea, tSearch, ivec4( 0.0 ) );

		}`},la={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new et(1/1024,1/512)}},vertexShader:`

		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		void SMAANeighborhoodBlendingVS( vec2 texcoord ) {
			vOffset[ 0 ] = texcoord.xyxy + resolution.xyxy * vec4( -1.0, 0.0, 0.0, 1.0 ); // WebGL port note: Changed sign in W component
			vOffset[ 1 ] = texcoord.xyxy + resolution.xyxy * vec4( 1.0, 0.0, 0.0, -1.0 ); // WebGL port note: Changed sign in W component
		}

		void main() {

			vUv = uv;

			SMAANeighborhoodBlendingVS( vUv );

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform sampler2D tColor;
		uniform vec2 resolution;

		varying vec2 vUv;
		varying vec4 vOffset[ 2 ];

		vec4 SMAANeighborhoodBlendingPS( vec2 texcoord, vec4 offset[ 2 ], sampler2D colorTex, sampler2D blendTex ) {
			// Fetch the blending weights for current pixel:
			vec4 a;
			a.xz = texture2D( blendTex, texcoord ).xz;
			a.y = texture2D( blendTex, offset[ 1 ].zw ).g;
			a.w = texture2D( blendTex, offset[ 1 ].xy ).a;

			// Is there any blending weight with a value greater than 0.0?
			if ( dot(a, vec4( 1.0, 1.0, 1.0, 1.0 )) < 1e-5 ) {
				return texture2D( colorTex, texcoord, 0.0 );
			} else {
				// Up to 4 lines can be crossing a pixel (one through each edge). We
				// favor blending by choosing the line with the maximum weight for each
				// direction:
				vec2 offset;
				offset.x = a.a > a.b ? a.a : -a.b; // left vs. right
				offset.y = a.g > a.r ? -a.g : a.r; // top vs. bottom // WebGL port note: Changed signs

				// Then we go in the direction that has the maximum weight:
				if ( abs( offset.x ) > abs( offset.y )) { // horizontal vs. vertical
					offset.y = 0.0;
				} else {
					offset.x = 0.0;
				}

				// Fetch the opposite color and lerp by hand:
				vec4 C = texture2D( colorTex, texcoord, 0.0 );
				texcoord += sign( offset ) * resolution;
				vec4 Cop = texture2D( colorTex, texcoord, 0.0 );
				float s = abs( offset.x ) > abs( offset.y ) ? abs( offset.x ) : abs( offset.y );

				// WebGL port note: Added gamma correction
				C.xyz = pow(C.xyz, vec3(2.2));
				Cop.xyz = pow(Cop.xyz, vec3(2.2));
				vec4 mixed = mix(C, Cop, s);
				mixed.xyz = pow(mixed.xyz, vec3(1.0 / 2.2));

				return mixed;
			}
		}

		void main() {

			gl_FragColor = SMAANeighborhoodBlendingPS( vUv, vOffset, tColor, tDiffuse );

		}`};class Cx extends bi{constructor(t,e){super(),this.edgesRT=new tn(t,e,{depthBuffer:!1,type:vn}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new tn(t,e,{depthBuffer:!1,type:vn}),this.weightsRT.texture.name="SMAAPass.weights";const n=this,i=new Image;i.src=this.getAreaTexture(),i.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new Ge,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=i,this.areaTexture.minFilter=Ke,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const r=new Image;r.src=this.getSearchTexture(),r.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new Ge,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=r,this.searchTexture.magFilter=Ue,this.searchTexture.minFilter=Ue,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=Bn.clone(Ar.uniforms),this.uniformsEdges.resolution.value.set(1/t,1/e),this.materialEdges=new De({defines:Object.assign({},Ar.defines),uniforms:this.uniformsEdges,vertexShader:Ar.vertexShader,fragmentShader:Ar.fragmentShader}),this.uniformsWeights=Bn.clone(Cr.uniforms),this.uniformsWeights.resolution.value.set(1/t,1/e),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new De({defines:Object.assign({},Cr.defines),uniforms:this.uniformsWeights,vertexShader:Cr.vertexShader,fragmentShader:Cr.fragmentShader}),this.uniformsBlend=Bn.clone(la.uniforms),this.uniformsBlend.resolution.value.set(1/t,1/e),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new De({uniforms:this.uniformsBlend,vertexShader:la.vertexShader,fragmentShader:la.fragmentShader}),this.fsQuad=new _o(null)}render(t,e,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,t.setRenderTarget(this.edgesRT),this.clear&&t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialWeights,t.setRenderTarget(this.weightsRT),this.clear&&t.clear(),this.fsQuad.render(t),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(),this.fsQuad.render(t))}setSize(t,e){this.edgesRT.setSize(t,e),this.weightsRT.setSize(t,e),this.materialEdges.uniforms.resolution.value.set(1/t,1/e),this.materialWeights.uniforms.resolution.value.set(1/t,1/e),this.materialBlend.uniforms.resolution.value.set(1/t,1/e)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const Rx={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`
	
		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = OptimizedCineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class Px extends bi{constructor(){super();const t=Rx;this.uniforms=Bn.clone(t.uniforms),this.material=new gx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new _o(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},se.getTransfer(this._outputColorSpace)===ue&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Hh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Wh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Vh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ka?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Xh&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function Lx(s){const t=new Mu({canvas:s,antialias:!0,powerPreference:"high-performance",stencil:!1});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(window.innerWidth,window.innerHeight),t.outputColorSpace=Qt,t.toneMapping=Ka,t.toneMappingExposure=1.08,t.shadowMap.enabled=!0,t.shadowMap.type=kh;const e=new Uv,n=new $e(62,window.innerWidth/window.innerHeight,.6,3e3),i=new yo;i.scale.setScalar(8e3),e.add(i);const r=new O,o=i.material.uniforms;o.turbidity.value=4.5,o.rayleigh.value=2.2,o.mieCoefficient.value=.006,o.mieDirectionalG.value=.8;const a=qe.degToRad(11),c=qe.degToRad(128);r.setFromSphericalCoords(1,Math.PI/2-a,c),o.sunPosition.value.copy(r);const l=new Ql(16766368,3.4);l.position.copy(r).multiplyScalar(800),l.castShadow=!0,l.shadow.mapSize.set(4096,4096),l.shadow.camera.near=50,l.shadow.camera.far=1600;const h=90;l.shadow.camera.left=-h,l.shadow.camera.right=h,l.shadow.camera.top=h,l.shadow.camera.bottom=-h,l.shadow.bias=-1e-4,l.shadow.normalBias=.04,l.shadow.radius=3,e.add(l),e.add(l.target);const u=r.clone().normalize(),d=2*h/4096;function f(b){const R=Math.round(b.x/d)*d,w=Math.round(b.z/d)*d;l.target.position.set(R,0,w),l.position.set(R+u.x*800,u.y*800,w+u.z*800)}const p=new vx(9615584,4076832,.6);e.add(p);const v=new Ql(9221332,.28);v.position.set(-r.x*300,200,-r.z*300),e.add(v);const g=new Ba(t);g.compileCubemapShader();const m=g.fromScene(e,.04).texture;e.environment=m,g.dispose(),e.fog=new go(13155238,900,4200);const x=new Ex(t);x.setPixelRatio(Math.min(window.devicePixelRatio,2)),x.setSize(window.innerWidth,window.innerHeight);const y=new Tx(e,n);x.addPass(y);const _=new cs(new et(window.innerWidth,window.innerHeight),.22,.65,.91);x.addPass(_);const M=new Du(Ix);x.addPass(M);const S=new Cx(window.innerWidth*t.getPixelRatio(),window.innerHeight*t.getPixelRatio());return x.addPass(S),x.addPass(new Px),window.addEventListener("resize",()=>{const b=window.innerWidth,R=window.innerHeight;t.setSize(b,R),x.setSize(b,R),n.aspect=b/R,n.updateProjectionMatrix(),_.resolution.set(b,R)}),{renderer:t,scene:e,camera:n,composer:x,sun:l,updateShadowTarget:f}}const Ix={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:1},uCA:{value:9e-4},uGrain:{value:.018}},vertexShader:`
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,fragmentShader:`
    precision highp float;
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uVignette;
    uniform float uCA;
    uniform float uGrain;
    varying vec2 vUv;

    float hash(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
    }

    void main() {
      vec2 uv = vUv;
      vec2 d = uv - 0.5;
      // Chromatic aberration scaled by distance from centre
      float r = texture2D(tDiffuse, uv + d * uCA).r;
      float g = texture2D(tDiffuse, uv).g;
      float b = texture2D(tDiffuse, uv - d * uCA).b;
      vec3 col = vec3(r, g, b);

      // Vignette
      float v = smoothstep(0.95, 0.35, length(d) * 1.25);
      col *= mix(1.0, v, uVignette * 0.55);

      // Grain
      float n = hash(uv * vec2(1920.0, 1080.0) + uTime) - 0.5;
      col += n * uGrain;

      gl_FragColor = vec4(col, 1.0);
    }
  `};class gn{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new T);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new T);const n=this.elements,i=t.x,r=t.y,o=t.z;return e.x=n[0]*i+n[1]*r+n[2]*o,e.y=n[3]*i+n[4]*r+n[5]*o,e.z=n[6]*i+n[7]*r+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new gn);const n=this.elements,i=t.elements,r=e.elements,o=n[0],a=n[1],c=n[2],l=n[3],h=n[4],u=n[5],d=n[6],f=n[7],p=n[8],v=i[0],g=i[1],m=i[2],x=i[3],y=i[4],_=i[5],M=i[6],S=i[7],b=i[8];return r[0]=o*v+a*x+c*M,r[1]=o*g+a*y+c*S,r[2]=o*m+a*_+c*b,r[3]=l*v+h*x+u*M,r[4]=l*g+h*y+u*S,r[5]=l*m+h*_+u*b,r[6]=d*v+f*x+p*M,r[7]=d*g+f*y+p*S,r[8]=d*m+f*_+p*b,e}scale(t,e){e===void 0&&(e=new gn);const n=this.elements,i=e.elements;for(let r=0;r!==3;r++)i[3*r+0]=t.x*n[3*r+0],i[3*r+1]=t.y*n[3*r+1],i[3*r+2]=t.z*n[3*r+2];return e}solve(t,e){e===void 0&&(e=new T);const n=3,i=4,r=[];let o,a;for(o=0;o<n*i;o++)r.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)r[o+i*a]=this.elements[o+3*a];r[3+4*0]=t.x,r[3+4*1]=t.y,r[3+4*2]=t.z;let c=3;const l=c;let h;const u=4;let d;do{if(o=l-c,r[o+i*o]===0){for(a=o+1;a<l;a++)if(r[o+i*a]!==0){h=u;do d=u-h,r[d+i*o]+=r[d+i*a];while(--h);break}}if(r[o+i*o]!==0)for(a=o+1;a<l;a++){const f=r[o+i*a]/r[o+i*o];h=u;do d=u-h,r[d+i*a]=d<=o?0:r[d+i*a]-r[d+i*o]*f;while(--h)}}while(--c);if(e.z=r[2*i+3]/r[2*i+2],e.y=(r[1*i+3]-r[1*i+2]*e.z)/r[1*i+1],e.x=(r[0*i+3]-r[0*i+2]*e.z-r[0*i+1]*e.y)/r[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new gn);const e=3,n=6,i=Dx;let r,o;for(r=0;r<3;r++)for(o=0;o<3;o++)i[r+n*o]=this.elements[r+3*o];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const c=a;let l;const h=n;let u;do{if(r=c-a,i[r+n*r]===0){for(o=r+1;o<c;o++)if(i[r+n*o]!==0){l=h;do u=h-l,i[u+n*r]+=i[u+n*o];while(--l);break}}if(i[r+n*r]!==0)for(o=r+1;o<c;o++){const d=i[r+n*o]/i[r+n*r];l=h;do u=h-l,i[u+n*o]=u<=r?0:i[u+n*o]-i[u+n*r]*d;while(--l)}}while(--a);r=2;do{o=r-1;do{const d=i[r+n*o]/i[r+n*r];l=n;do u=n-l,i[u+n*o]=i[u+n*o]-i[u+n*r]*d;while(--l)}while(o--)}while(--r);r=2;do{const d=1/i[r+n*r];l=n;do u=n-l,i[u+n*r]=i[u+n*r]*d;while(--l)}while(r--);r=2;do{o=2;do{if(u=i[e+o+n*r],isNaN(u)||u===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(r,o,u)}while(o--)}while(r--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,r=t.w,o=e+e,a=n+n,c=i+i,l=e*o,h=e*a,u=e*c,d=n*a,f=n*c,p=i*c,v=r*o,g=r*a,m=r*c,x=this.elements;return x[3*0+0]=1-(d+p),x[3*0+1]=h-m,x[3*0+2]=u+g,x[3*1+0]=h+m,x[3*1+1]=1-(l+p),x[3*1+2]=f-v,x[3*2+0]=u-g,x[3*2+1]=f+v,x[3*2+2]=1-(l+d),this}transpose(t){t===void 0&&(t=new gn);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const Dx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class T{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new T);const n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,c=this.z;return e.x=a*r-c*i,e.y=c*n-o*r,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new T(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new T(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new gn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const r=1/i;this.x*=r,this.y*=r,this.z*=r}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new T);const e=this.x,n=this.y,i=this.z;let r=Math.sqrt(e*e+n*n+i*i);return r>0?(r=1/r,t.x=e*r,t.y=n*r,t.z=i*r):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return Math.sqrt((r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return(r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new T);const n=this.x,i=this.y,r=this.z;return e.x=t*n,e.y=t*i,e.z=t*r,e}vmul(t,e){return e===void 0&&(e=new T),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new T),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new T),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=Nx,r=1/n;i.set(this.x*r,this.y*r,this.z*r);const o=Ux;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,r=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=r+(t.y-r)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(eh),eh.almostEquals(t,e)}clone(){return new T(this.x,this.y,this.z)}}T.ZERO=new T(0,0,0);T.UNIT_X=new T(1,0,0);T.UNIT_Y=new T(0,1,0);T.UNIT_Z=new T(0,0,1);const Nx=new T,Ux=new T,eh=new T;class sn{constructor(t){t===void 0&&(t={}),this.lowerBound=new T,this.upperBound=new T,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const r=this.lowerBound,o=this.upperBound,a=n;r.copy(t[0]),a&&a.vmult(r,r),o.copy(r);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,nh),l=nh),l.x>o.x&&(o.x=l.x),l.x<r.x&&(r.x=l.x),l.y>o.y&&(o.y=l.y),l.y<r.y&&(r.y=l.y),l.z>o.z&&(o.z=l.z),l.z<r.z&&(r.z=l.z)}return e&&(e.vadd(r,r),e.vadd(o,o)),i&&(r.x-=i,r.y-=i,r.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new sn().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound,o=i.x<=n.x&&n.x<=r.x||e.x<=r.x&&r.x<=n.x,a=i.y<=n.y&&n.y<=r.y||e.y<=r.y&&r.y<=n.y,c=i.z<=n.z&&n.z<=r.z||e.z<=r.z&&r.z<=n.z;return o&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound;return e.x<=i.x&&n.x>=r.x&&e.y<=i.y&&n.y>=r.y&&e.z<=i.z&&n.z>=r.z}getCorners(t,e,n,i,r,o,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),r.set(h.x,l.y,h.z),o.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=ih,i=n[0],r=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,r,o,a,c,l,h,u);for(let d=0;d!==8;d++){const f=n[d];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=ih,i=n[0],r=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],u=n[7];this.getCorners(i,r,o,a,c,l,h,u);for(let d=0;d!==8;d++){const f=n[d];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,r=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*r,h=(this.upperBound.y-n.y)*r,u=(this.lowerBound.z-n.z)*o,d=(this.upperBound.z-n.z)*o,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(u,d)),p=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(u,d));return!(p<0||f>p)}}const nh=new T,ih=[new T,new T,new T,new T,new T,new T,new T,new T];class sh{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const r=i;i=n,n=r}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:r}=e;if(r>i){const o=r;r=i,i=o}this.matrix[(i*(i+1)>>1)+r-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class Nu{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,r=n.length;i<r;i++)n[i].call(this,t)}return this}}class pe{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new T),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=Fx,i=Ox;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new pe);const n=this.x,i=this.y,r=this.z,o=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+o*a+i*l-r*c,e.y=i*h+o*c+r*a-n*l,e.z=r*h+o*l+n*c-i*a,e.w=o*h-n*a-i*c-r*l,e}inverse(t){t===void 0&&(t=new pe);const e=this.x,n=this.y,i=this.z,r=this.w;this.conjugate(t);const o=1/(e*e+n*n+i*i+r*r);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new pe),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new T);const n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*r-c*i,u=l*i+c*n-o*r,d=l*r+o*i-a*n,f=-o*n-a*i-c*r;return e.x=h*l+f*-o+u*-c-d*-a,e.y=u*l+f*-a+d*-o-h*-c,e.z=d*l+f*-c+h*-a-u*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,r;const o=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=o*a+c*l;if(h>.499&&(n=2*Math.atan2(o,l),i=Math.PI/2,r=0),h<-.499&&(n=-2*Math.atan2(o,l),i=-Math.PI/2,r=0),n===void 0){const u=o*o,d=a*a,f=c*c;n=Math.atan2(2*a*l-2*o*c,1-2*d-2*f),i=Math.asin(2*h),r=Math.atan2(2*o*l-2*a*c,1-2*u-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=r}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const r=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*o*a+r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a-c*l*h):i==="YXZ"?(this.x=c*o*a+r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a+c*l*h):i==="ZXY"?(this.x=c*o*a-r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a-c*l*h):i==="ZYX"?(this.x=c*o*a-r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a+c*l*h):i==="YZX"?(this.x=c*o*a+r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a-c*l*h):i==="XZY"&&(this.x=c*o*a-r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a+c*l*h),this}clone(){return new pe(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new pe);const i=this.x,r=this.y,o=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,u=t.w,d,f,p,v,g;return f=i*c+r*l+o*h+a*u,f<0&&(f=-f,c=-c,l=-l,h=-h,u=-u),1-f>1e-6?(d=Math.acos(f),p=Math.sin(d),v=Math.sin((1-e)*d)/p,g=Math.sin(e*d)/p):(v=1-e,g=e),n.x=v*i+g*c,n.y=v*r+g*l,n.z=v*o+g*h,n.w=v*a+g*u,n}integrate(t,e,n,i){i===void 0&&(i=new pe);const r=t.x*n.x,o=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,u=this.w,d=e*.5;return i.x+=d*(r*u+o*h-a*l),i.y+=d*(o*u+a*c-r*h),i.z+=d*(a*u+r*l-o*c),i.w+=d*(-r*c-o*l-a*h),i}}const Fx=new T,Ox=new T,zx={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Lt{constructor(t){t===void 0&&(t={}),this.id=Lt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Lt.idCounter=0;Lt.types=zx;class ne{constructor(t){t===void 0&&(t={}),this.position=new T,this.quaternion=new pe,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return ne.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return ne.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new T),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new T),n.vsub(t,i),e.conjugate(rh),rh.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new T),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new T),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new T),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const rh=new pe;class Bs extends Lt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:r,boundingSphereRadius:o}=t;super({type:Lt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new T;for(let r=0;r!==t.length;r++){const o=t[r],a=o.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[o[c]].vsub(e[o[l]],i),i.normalize();let h=!1;for(let u=0;u!==n.length;u++)if(n[u].almostEquals(i)||n[u].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new T;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],r=this.vertices[n[1]],o=this.vertices[n[2]];Bs.computeNormal(i,r,o,e)}static computeNormal(t,e,n,i){const r=new T,o=new T;e.vsub(t,o),n.vsub(e,r),r.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,r,o,a,c,l){const h=new T;let u=-1,d=-Number.MAX_VALUE;for(let p=0;p<n.faces.length;p++){h.copy(n.faceNormals[p]),r.vmult(h,h);const v=h.dot(o);v>d&&(d=v,u=p)}const f=[];for(let p=0;p<n.faces[u].length;p++){const v=n.vertices[n.faces[u][p]],g=new T;g.copy(v),r.vmult(g,g),i.vadd(g,g),f.push(g)}u>=0&&this.clipFaceAgainstHull(o,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,r,o,a,c){const l=new T,h=new T,u=new T,d=new T,f=new T,p=new T;let v=Number.MAX_VALUE;const g=this;if(g.uniqueAxes)for(let m=0;m!==g.uniqueAxes.length;m++){n.vmult(g.uniqueAxes[m],l);const x=g.testSepAxis(l,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(l))}else{const m=a?a.length:g.faces.length;for(let x=0;x<m;x++){const y=a?a[x]:x;l.copy(g.faceNormals[y]),n.vmult(l,l);const _=g.testSepAxis(l,t,e,n,i,r);if(_===!1)return!1;_<v&&(v=_,o.copy(l))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){r.vmult(t.uniqueAxes[m],h);const x=g.testSepAxis(h,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(h))}else{const m=c?c.length:t.faces.length;for(let x=0;x<m;x++){const y=c?c[x]:x;h.copy(t.faceNormals[y]),r.vmult(h,h);const _=g.testSepAxis(h,t,e,n,i,r);if(_===!1)return!1;_<v&&(v=_,o.copy(h))}}for(let m=0;m!==g.uniqueEdges.length;m++){n.vmult(g.uniqueEdges[m],d);for(let x=0;x!==t.uniqueEdges.length;x++)if(r.vmult(t.uniqueEdges[x],f),d.cross(f,p),!p.almostZero()){p.normalize();const y=g.testSepAxis(p,t,e,n,i,r);if(y===!1)return!1;y<v&&(v=y,o.copy(p))}}return i.vsub(e,u),u.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,r,o){const a=this;Bs.project(a,t,n,i,ha),Bs.project(e,t,r,o,ua);const c=ha[0],l=ha[1],h=ua[0],u=ua[1];if(c<u||h<l)return!1;const d=c-u,f=h-l;return d<f?d:f}calculateLocalInertia(t,e){const n=new T,i=new T;this.computeLocalAABB(i,n);const r=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*r*2*r+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*r*2*r)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,r,o,a){const c=new T,l=new T,h=new T,u=new T,d=new T,f=new T,p=new T,v=new T,g=this,m=[],x=i,y=m;let _=-1,M=Number.MAX_VALUE;for(let E=0;E<g.faces.length;E++){c.copy(g.faceNormals[E]),n.vmult(c,c);const U=c.dot(t);U<M&&(M=U,_=E)}if(_<0)return;const S=g.faces[_];S.connectedFaces=[];for(let E=0;E<g.faces.length;E++)for(let U=0;U<g.faces[E].length;U++)S.indexOf(g.faces[E][U])!==-1&&E!==_&&S.connectedFaces.indexOf(E)===-1&&S.connectedFaces.push(E);const b=S.length;for(let E=0;E<b;E++){const U=g.vertices[S[E]],I=g.vertices[S[(E+1)%b]];U.vsub(I,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),u.copy(this.faceNormals[_]),n.vmult(u,u),e.vadd(u,u),h.cross(u,d),d.negate(d),f.copy(U),n.vmult(f,f),e.vadd(f,f);const F=S.connectedFaces[E];p.copy(this.faceNormals[F]);const C=this.getPlaneConstantOfFace(F);v.copy(p),n.vmult(v,v);const D=C-v.dot(e);for(this.clipFaceAgainstPlane(x,y,v,D);x.length;)x.shift();for(;y.length;)x.push(y.shift())}p.copy(this.faceNormals[_]);const R=this.getPlaneConstantOfFace(_);v.copy(p),n.vmult(v,v);const w=R-v.dot(e);for(let E=0;E<x.length;E++){let U=v.dot(x[E])+w;if(U<=r&&(console.log(`clamped: depth=${U} to minDist=${r}`),U=r),U<=o){const I=x[E];if(U<=1e-6){const F={point:I,normal:v,depth:U};a.push(F)}}}}clipFaceAgainstPlane(t,e,n,i){let r,o;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];r=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],o=n.dot(l)+i,r<0)if(o<0){const u=new T;u.copy(l),e.push(u)}else{const u=new T;c.lerp(l,r/(r-o),u),e.push(u)}else if(o<0){const u=new T;c.lerp(l,r/(r-o),u),e.push(u),e.push(l)}c=l,r=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new T);const n=this.vertices,i=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)e.vmult(n[r],i[r]),t.vadd(i[r],i[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const r=n[i];r.x<t.x?t.x=r.x:r.x>e.x&&(e.x=r.x),r.y<t.y?t.y=r.y:r.y>e.y&&(e.y=r.y),r.z<t.z?t.z=r.z:r.z>e.z&&(e.z=r.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new T);const n=this.faceNormals,i=this.worldFaceNormals;for(let r=0;r!==e;r++)t.vmult(n[r],i[r]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const r=this.vertices;let o,a,c,l,h,u,d=new T;for(let f=0;f<r.length;f++){d.copy(r[f]),e.vmult(d,d),t.vadd(d,d);const p=d;(o===void 0||p.x<o)&&(o=p.x),(l===void 0||p.x>l)&&(l=p.x),(a===void 0||p.y<a)&&(a=p.y),(h===void 0||p.y>h)&&(h=p.y),(c===void 0||p.z<c)&&(c=p.z),(u===void 0||p.z>u)&&(u=p.z)}n.set(o,a,c),i.set(l,h,u)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new T);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let r=0;r<n;r++){const o=i[r];e.vmult(o,o)}for(let r=0;r<this.faceNormals.length;r++){const o=this.faceNormals[r];e.vmult(o,o)}}if(t)for(let r=0;r<n;r++){const o=i[r];o.vadd(t,o)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,r=new T;this.getAveragePointLocal(r);for(let o=0;o<this.faces.length;o++){let a=i[o];const c=e[n[o][0]],l=new T;t.vsub(c,l);const h=a.dot(l),u=new T;r.vsub(c,u);const d=a.dot(u);if(h<0&&d>0||h>0&&d<0)return!1}return-1}static project(t,e,n,i,r){const o=t.vertices.length,a=Bx;let c=0,l=0;const h=kx,u=t.vertices;h.setZero(),ne.vectorToLocalFrame(n,i,e,a),ne.pointToLocalFrame(n,i,h,h);const d=h.dot(a);l=c=u[0].dot(a);for(let f=1;f<o;f++){const p=u[f].dot(a);p>c&&(c=p),p<l&&(l=p)}if(l-=d,c-=d,l>c){const f=l;l=c,c=f}r[0]=c,r[1]=l}}const ha=[],ua=[];new T;const Bx=new T,kx=new T;class fs extends Lt{constructor(t){super({type:Lt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=T,r=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new Bs({vertices:r,faces:o,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new T),fs.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let r=0;r!==n.length;r++)e.vmult(n[r],n[r]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,r=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<r.length;o++)Kn.set(r[o][0],r[o][1],r[o][2]),e.vmult(Kn,Kn),t.vadd(Kn,Kn),n(Kn.x,Kn.y,Kn.z)}calculateWorldAABB(t,e,n,i){const r=this.halfExtents;yn[0].set(r.x,r.y,r.z),yn[1].set(-r.x,r.y,r.z),yn[2].set(-r.x,-r.y,r.z),yn[3].set(-r.x,-r.y,-r.z),yn[4].set(r.x,-r.y,-r.z),yn[5].set(r.x,r.y,-r.z),yn[6].set(-r.x,r.y,-r.z),yn[7].set(r.x,-r.y,r.z);const o=yn[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){const c=yn[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,u=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),u>i.z&&(i.z=u),l<n.x&&(n.x=l),h<n.y&&(n.y=h),u<n.z&&(n.z=u)}}}const Kn=new T,yn=[new T,new T,new T,new T,new T,new T,new T,new T],hc={DYNAMIC:1,STATIC:2,KINEMATIC:4},uc={AWAKE:0,SLEEPY:1,SLEEPING:2};class Ct extends Nu{constructor(t){t===void 0&&(t={}),super(),this.id=Ct.idCounter++,this.index=-1,this.world=null,this.vlambda=new T,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new T,this.previousPosition=new T,this.interpolatedPosition=new T,this.initPosition=new T,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new T,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new T,this.force=new T;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?Ct.STATIC:Ct.DYNAMIC,typeof t.type==typeof Ct.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=Ct.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new T,this.quaternion=new pe,this.initQuaternion=new pe,this.previousQuaternion=new pe,this.interpolatedQuaternion=new pe,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new T,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new T,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new T,this.invInertia=new T,this.invInertiaWorld=new gn,this.invMassSolve=0,this.invInertiaSolve=new T,this.invInertiaWorldSolve=new gn,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new T(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new T(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new sn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new T,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=Ct.AWAKE,this.wakeUpAfterNarrowphase=!1,t===Ct.SLEEPING&&this.dispatchEvent(Ct.wakeupEvent)}sleep(){this.sleepState=Ct.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===Ct.AWAKE&&n<i?(this.sleepState=Ct.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(Ct.sleepyEvent)):e===Ct.SLEEPY&&n>i?this.wakeUp():e===Ct.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(Ct.sleepEvent))}}updateSolveMassProperties(){this.sleepState===Ct.SLEEPING||this.type===Ct.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new T),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new T),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new T),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new T),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new T,r=new pe;return e&&i.copy(e),n&&r.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let r=0;r!==n;r++){const o=t[r];o.updateBoundingSphereRadius();const a=e[r].length(),c=o.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,r=Gx,o=Hx,a=this.quaternion,c=this.aabb,l=Wx;for(let h=0;h!==i;h++){const u=t[h];a.vmult(e[h],r),r.vadd(this.position,r),a.mult(n[h],o),u.calculateWorldAABB(r,o,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=Vx,i=Xx;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new T),this.type!==Ct.DYNAMIC)return;this.sleepState===Ct.SLEEPING&&this.wakeUp();const n=qx;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new T),this.type!==Ct.DYNAMIC)return;const n=Yx,i=jx;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===Ct.DYNAMIC&&(this.sleepState===Ct.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new T),this.type!==Ct.DYNAMIC)return;this.sleepState===Ct.SLEEPING&&this.wakeUp();const n=e,i=Kx;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const r=Zx;n.cross(t,r),this.invInertiaWorld.vmult(r,r),this.angularVelocity.vadd(r,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new T),this.type!==Ct.DYNAMIC)return;const n=Jx,i=Qx;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=$x;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),fs.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new T;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===Ct.DYNAMIC||this.type===Ct.KINEMATIC)||this.sleepState===Ct.SLEEPING)return;const i=this.velocity,r=this.angularVelocity,o=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,u=this.invInertiaWorld,d=this.linearFactor,f=h*t;i.x+=a.x*f*d.x,i.y+=a.y*f*d.y,i.z+=a.z*f*d.z;const p=u.elements,v=this.angularFactor,g=c.x*v.x,m=c.y*v.y,x=c.z*v.z;r.x+=t*(p[0]*g+p[1]*m+p[2]*x),r.y+=t*(p[3]*g+p[4]*m+p[5]*x),r.z+=t*(p[6]*g+p[7]*m+p[8]*x),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}Ct.idCounter=0;Ct.COLLIDE_EVENT_NAME="collide";Ct.DYNAMIC=hc.DYNAMIC;Ct.STATIC=hc.STATIC;Ct.KINEMATIC=hc.KINEMATIC;Ct.AWAKE=uc.AWAKE;Ct.SLEEPY=uc.SLEEPY;Ct.SLEEPING=uc.SLEEPING;Ct.wakeupEvent={type:"wakeup"};Ct.sleepyEvent={type:"sleepy"};Ct.sleepEvent={type:"sleep"};const Gx=new T,Hx=new pe,Wx=new sn,Vx=new gn,Xx=new gn;new gn;const qx=new T,Yx=new T,jx=new T,Kx=new T,Zx=new T,Jx=new T,Qx=new T,$x=new T;class ty{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&Ct.STATIC||t.sleepState===Ct.SLEEPING)&&(e.type&Ct.STATIC||e.sleepState===Ct.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const r=ey;e.position.vsub(t.position,r);const o=(t.boundingRadius+e.boundingRadius)**2;r.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=ny,i=iy,r=sy,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],r[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){const c=i[a].id,l=r[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(r[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new T;t.position.vsub(e.position,n);const i=t.shapes[0],r=e.shapes[0];return Math.pow(i.boundingSphereRadius+r.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const ey=new T;new T;new pe;new T;const ny={keys:[]},iy=[],sy=[];new T;new T;new T;class Uu extends ty{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,r=i.length;let o,a;for(let c=0;c!==r;c++)for(let l=0;l!==c;l++)o=i[c],a=i[l],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const r=t.bodies[i];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(e)&&n.push(r)}return n}}class Xs{constructor(){this.rayFromWorld=new T,this.rayToWorld=new T,this.hitNormalWorld=new T,this.hitPointWorld=new T,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,r,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=r,this.body=o,this.distance=a}}let Fu,Ou,zu,Bu,ku,Gu,Hu;const dc={CLOSEST:1,ANY:2,ALL:4};Fu=Lt.types.SPHERE;Ou=Lt.types.PLANE;zu=Lt.types.BOX;Bu=Lt.types.CYLINDER;ku=Lt.types.CONVEXPOLYHEDRON;Gu=Lt.types.HEIGHTFIELD;Hu=Lt.types.TRIMESH;class we{get[Fu](){return this._intersectSphere}get[Ou](){return this._intersectPlane}get[zu](){return this._intersectBox}get[Bu](){return this._intersectConvex}get[ku](){return this._intersectConvex}get[Gu](){return this._intersectHeightfield}get[Hu](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new T),e===void 0&&(e=new T),this.from=t.clone(),this.to=e.clone(),this.direction=new T,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=we.ANY,this.result=new Xs,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||we.ANY,this.result=e.result||new Xs,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(oh),da.length=0,t.broadphase.aabbQuery(t,oh,da),this.intersectBodies(da),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=ry,r=oy;for(let o=0,a=t.shapes.length;o<a;o++){const c=t.shapes[o];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],r),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(c,r,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const r=this.from;if(_y(r,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,r){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,r)}_intersectPlane(t,e,n,i,r){const o=this.from,a=this.to,c=this.direction,l=new T(0,0,1);e.vmult(l,l);const h=new T;o.vsub(n,h);const u=h.dot(l);a.vsub(n,h);const d=h.dot(l);if(u*d>0||o.distanceTo(a)<u)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const p=new T,v=new T,g=new T;o.vsub(n,p);const m=-l.dot(p)/f;c.scale(m,v),o.vadd(v,g),this.reportIntersection(l,g,r,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,r=this.from;e.x=Math.min(i.x,r.x),e.y=Math.min(i.y,r.y),e.z=Math.min(i.z,r.z),n.x=Math.max(i.x,r.x),n.y=Math.max(i.y,r.y),n.z=Math.max(i.z,r.z)}_intersectHeightfield(t,e,n,i,r){t.data,t.elementSize;const o=ay;o.from.copy(this.from),o.to.copy(this.to),ne.pointToLocalFrame(n,e,o.from,o.from),ne.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();const a=cy;let c,l,h,u;c=l=0,h=u=t.data.length-1;const d=new sn;o.getAABB(d),t.getIndexOfPosition(d.lowerBound.x,d.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(d.upperBound.x,d.upperBound.y,a,!0),h=Math.min(h,a[0]+1),u=Math.min(u,a[1]+1);for(let f=c;f<h;f++)for(let p=l;p<u;p++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,p,d),!!d.overlapsRay(o)){if(t.getConvexTrianglePillar(f,p,!1),ne.pointToWorldFrame(n,e,t.pillarOffset,Rr),this._intersectConvex(t.pillarConvex,e,Rr,i,r,ah),this.result.shouldStop)return;t.getConvexTrianglePillar(f,p,!0),ne.pointToWorldFrame(n,e,t.pillarOffset,Rr),this._intersectConvex(t.pillarConvex,e,Rr,i,r,ah)}}}_intersectSphere(t,e,n,i,r){const o=this.from,a=this.to,c=t.radius,l=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),u=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-c**2,d=h**2-4*l*u,f=ly,p=hy;if(!(d<0))if(d===0)o.lerp(a,d,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,r,i,-1);else{const v=(-h-Math.sqrt(d))/(2*l),g=(-h+Math.sqrt(d))/(2*l);if(v>=0&&v<=1&&(o.lerp(a,v,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,r,i,-1)),this.result.shouldStop)return;g>=0&&g<=1&&(o.lerp(a,g,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,r,i,-1))}}_intersectConvex(t,e,n,i,r,o){const a=uy,c=ch,l=o&&o.faceList||null,h=t.faces,u=t.vertices,d=t.faceNormals,f=this.direction,p=this.from,v=this.to,g=p.distanceTo(v),m=l?l.length:h.length,x=this.result;for(let y=0;!x.shouldStop&&y<m;y++){const _=l?l[y]:y,M=h[_],S=d[_],b=e,R=n;c.copy(u[M[0]]),b.vmult(c,c),c.vadd(R,c),c.vsub(p,c),b.vmult(S,a);const w=f.dot(a);if(Math.abs(w)<this.precision)continue;const E=a.dot(c)/w;if(!(E<0)){f.scale(E,je),je.vadd(p,je),fn.copy(u[M[0]]),b.vmult(fn,fn),R.vadd(fn,fn);for(let U=1;!x.shouldStop&&U<M.length-1;U++){_n.copy(u[M[U]]),Mn.copy(u[M[U+1]]),b.vmult(_n,_n),b.vmult(Mn,Mn),R.vadd(_n,_n),R.vadd(Mn,Mn);const I=je.distanceTo(p);!(we.pointInTriangle(je,fn,_n,Mn)||we.pointInTriangle(je,_n,fn,Mn))||I>g||this.reportIntersection(a,je,r,i,_)}}}}_intersectTrimesh(t,e,n,i,r,o){const a=dy,c=xy,l=yy,h=ch,u=fy,d=py,f=my,p=vy,v=gy,g=t.indices;t.vertices;const m=this.from,x=this.to,y=this.direction;l.position.copy(n),l.quaternion.copy(e),ne.vectorToLocalFrame(n,e,y,u),ne.pointToLocalFrame(n,e,m,d),ne.pointToLocalFrame(n,e,x,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,d.x*=t.scale.x,d.y*=t.scale.y,d.z*=t.scale.z,f.vsub(d,u),u.normalize();const _=d.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let M=0,S=c.length;!this.result.shouldStop&&M!==S;M++){const b=c[M];t.getNormal(b,a),t.getVertex(g[b*3],fn),fn.vsub(d,h);const R=u.dot(a),w=a.dot(h)/R;if(w<0)continue;u.scale(w,je),je.vadd(d,je),t.getVertex(g[b*3+1],_n),t.getVertex(g[b*3+2],Mn);const E=je.distanceSquared(d);!(we.pointInTriangle(je,_n,fn,Mn)||we.pointInTriangle(je,fn,_n,Mn))||E>_||(ne.vectorToWorldFrame(e,a,v),ne.pointToWorldFrame(n,e,je,p),this.reportIntersection(v,p,r,i,b))}c.length=0}reportIntersection(t,e,n,i,r){const o=this.from,a=this.to,c=o.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof r<"u"?r:-1,this.mode){case we.ALL:this.hasHit=!0,l.set(o,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case we.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c));break;case we.ANY:this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,gi),n.vsub(e,bs),t.vsub(e,fa);const r=gi.dot(gi),o=gi.dot(bs),a=gi.dot(fa),c=bs.dot(bs),l=bs.dot(fa);let h,u;return(h=c*a-o*l)>=0&&(u=r*l-o*a)>=0&&h+u<r*c-o*o}}we.CLOSEST=dc.CLOSEST;we.ANY=dc.ANY;we.ALL=dc.ALL;const oh=new sn,da=[],bs=new T,fa=new T,ry=new T,oy=new pe,je=new T,fn=new T,_n=new T,Mn=new T;new T;new Xs;const ah={faceList:[0]},Rr=new T,ay=new we,cy=[],ly=new T,hy=new T,uy=new T;new T;new T;const ch=new T,dy=new T,fy=new T,py=new T,my=new T,gy=new T,vy=new T;new sn;const xy=[],yy=new ne,gi=new T,Pr=new T;function _y(s,t,e){e.vsub(s,gi);const n=gi.dot(t);return t.scale(n,Pr),Pr.vadd(s,Pr),e.distanceTo(Pr)}class Wu{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class lh{constructor(){this.spatial=new T,this.rotational=new T}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class js{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=js.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new lh,this.jacobianElementB=new lh,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,r=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*r*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),r=this.computeGq(),o=this.computeGiMf();return-r*t-i*e-o*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.position,o=i.position;return t.spatial.dot(r)+e.spatial.dot(o)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.velocity,o=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(r,a)+e.multiplyVectors(o,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.vlambda,o=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(r,a)+e.multiplyVectors(o,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.force,o=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return r.scale(l,hh),a.scale(h,uh),n.invInertiaWorldSolve.vmult(o,dh),i.invInertiaWorldSolve.vmult(c,fh),t.multiplyVectors(hh,dh)+e.multiplyVectors(uh,fh)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=r+o;return a.vmult(t.rotational,Lr),l+=Lr.dot(t.rotational),c.vmult(e.rotational,Lr),l+=Lr.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,r=this.bj,o=My;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),r.vlambda.addScaledVector(r.invMassSolve*t,n.spatial,r.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),r.invInertiaWorldSolve.vmult(n.rotational,o),r.wlambda.addScaledVector(t,o,r.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}js.idCounter=0;const hh=new T,uh=new T,dh=new T,fh=new T,Lr=new T,My=new T;class wy extends js{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new T,this.rj=new T,this.ni=new T}computeB(t){const e=this.a,n=this.b,i=this.bi,r=this.bj,o=this.ri,a=this.rj,c=Sy,l=by,h=i.velocity,u=i.angularVelocity;i.force,i.torque;const d=r.velocity,f=r.angularVelocity;r.force,r.torque;const p=Ey,v=this.jacobianElementA,g=this.jacobianElementB,m=this.ni;o.cross(m,c),a.cross(m,l),m.negate(v.spatial),c.negate(v.rotational),g.spatial.copy(m),g.rotational.copy(l),p.copy(r.position),p.vadd(a,p),p.vsub(i.position,p),p.vsub(o,p);const x=m.dot(p),y=this.restitution+1,_=y*d.dot(m)-y*h.dot(m)+f.dot(l)-u.dot(c),M=this.computeGiMf();return-x*e-_*n-t*M}getImpactVelocityAlongNormal(){const t=Ty,e=Ay,n=Cy,i=Ry,r=Py;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,r),this.ni.dot(r)}}const Sy=new T,by=new T,Ey=new T,Ty=new T,Ay=new T,Cy=new T,Ry=new T,Py=new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;class ph extends js{constructor(t,e,n){super(t,e,-n,n),this.ri=new T,this.rj=new T,this.t=new T}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,r=Ly,o=Iy,a=this.t;n.cross(a,r),i.cross(a,o);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),r.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(o);const h=this.computeGW(),u=this.computeGiMf();return-h*e-t*u}}const Ly=new T,Iy=new T;class _i{constructor(t,e,n){n=Wu.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=_i.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}_i.idCounter=0;class Qn{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Qn.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Qn.idCounter=0;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;class Dy{constructor(t){t===void 0&&(t={}),t=Wu.defaults(t,{chassisConnectionPointLocal:new T,chassisConnectionPointWorld:new T,directionLocal:new T,directionWorld:new T,axleLocal:new T,axleWorld:new T,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:10.5,forwardAcceleration:1,sideAcceleration:1,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,slipInfo:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),this.maxSuspensionTravel=t.maxSuspensionTravel,this.customSlidingRotationalSpeed=t.customSlidingRotationalSpeed,this.useCustomSlidingRotationalSpeed=t.useCustomSlidingRotationalSpeed,this.sliding=!1,this.chassisConnectionPointLocal=t.chassisConnectionPointLocal.clone(),this.chassisConnectionPointWorld=t.chassisConnectionPointWorld.clone(),this.directionLocal=t.directionLocal.clone(),this.directionWorld=t.directionWorld.clone(),this.axleLocal=t.axleLocal.clone(),this.axleWorld=t.axleWorld.clone(),this.suspensionRestLength=t.suspensionRestLength,this.suspensionMaxLength=t.suspensionMaxLength,this.radius=t.radius,this.suspensionStiffness=t.suspensionStiffness,this.dampingCompression=t.dampingCompression,this.dampingRelaxation=t.dampingRelaxation,this.frictionSlip=t.frictionSlip,this.forwardAcceleration=t.forwardAcceleration,this.sideAcceleration=t.sideAcceleration,this.steering=0,this.rotation=0,this.deltaRotation=0,this.rollInfluence=t.rollInfluence,this.maxSuspensionForce=t.maxSuspensionForce,this.engineForce=0,this.brake=0,this.isFrontWheel=t.isFrontWheel,this.clippedInvContactDotSuspension=1,this.suspensionRelativeVelocity=0,this.suspensionForce=0,this.slipInfo=0,this.skidInfo=0,this.suspensionLength=0,this.sideImpulse=0,this.forwardImpulse=0,this.raycastResult=new Xs,this.worldTransform=new ne,this.isInContact=!1}updateWheel(t){const e=this.raycastResult;if(this.isInContact){const n=e.hitNormalWorld.dot(e.directionWorld);e.hitPointWorld.vsub(t.position,gh),t.getVelocityAtWorldPoint(gh,mh);const i=e.hitNormalWorld.dot(mh);if(n>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=1/.1;else{const r=-1/n;this.suspensionRelativeVelocity=i*r,this.clippedInvContactDotSuspension=r}}else e.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,e.directionWorld.scale(-1,e.hitNormalWorld),this.clippedInvContactDotSuspension=1}}const mh=new T,gh=new T;class Ny{constructor(t){this.chassisBody=t.chassisBody,this.wheelInfos=[],this.sliding=!1,this.world=null,this.indexRightAxis=typeof t.indexRightAxis<"u"?t.indexRightAxis:2,this.indexForwardAxis=typeof t.indexForwardAxis<"u"?t.indexForwardAxis:0,this.indexUpAxis=typeof t.indexUpAxis<"u"?t.indexUpAxis:1,this.constraints=[],this.preStepCallback=()=>{},this.currentVehicleSpeedKmHour=0,this.numWheelsOnGround=0}addWheel(t){t===void 0&&(t={});const e=new Dy(t),n=this.wheelInfos.length;return this.wheelInfos.push(e),n}setSteeringValue(t,e){const n=this.wheelInfos[e];n.steering=t}applyEngineForce(t,e){this.wheelInfos[e].engineForce=t}setBrake(t,e){this.wheelInfos[e].brake=t}addToWorld(t){t.addBody(this.chassisBody);const e=this;this.preStepCallback=()=>{e.updateVehicle(t.dt)},t.addEventListener("preStep",this.preStepCallback),this.world=t}getVehicleAxisWorld(t,e){e.set(t===0?1:0,t===1?1:0,t===2?1:0),this.chassisBody.vectorToWorldFrame(e,e)}updateVehicle(t){const e=this.wheelInfos,n=e.length,i=this.chassisBody;for(let u=0;u<n;u++)this.updateWheelTransform(u);this.currentVehicleSpeedKmHour=3.6*i.velocity.length();const r=new T;this.getVehicleAxisWorld(this.indexForwardAxis,r),r.dot(i.velocity)<0&&(this.currentVehicleSpeedKmHour*=-1);for(let u=0;u<n;u++)this.castRay(e[u]);this.updateSuspension(t);const o=new T,a=new T;for(let u=0;u<n;u++){const d=e[u];let f=d.suspensionForce;f>d.maxSuspensionForce&&(f=d.maxSuspensionForce),d.raycastResult.hitNormalWorld.scale(f*t,o),d.raycastResult.hitPointWorld.vsub(i.position,a),i.applyImpulse(o,a)}this.updateFriction(t);const c=new T,l=new T,h=new T;for(let u=0;u<n;u++){const d=e[u];i.getVelocityAtWorldPoint(d.chassisConnectionPointWorld,h);let f=1;switch(this.indexUpAxis){case 1:f=-1;break}if(d.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,l);const p=l.dot(d.raycastResult.hitNormalWorld);d.raycastResult.hitNormalWorld.scale(p,c),l.vsub(c,l);const v=l.dot(h);d.deltaRotation=f*v*t/d.radius}(d.sliding||!d.isInContact)&&d.engineForce!==0&&d.useCustomSlidingRotationalSpeed&&(d.deltaRotation=(d.engineForce>0?1:-1)*d.customSlidingRotationalSpeed*t),Math.abs(d.brake)>Math.abs(d.engineForce)&&(d.deltaRotation=0),d.rotation+=d.deltaRotation,d.deltaRotation*=.99}}updateSuspension(t){const n=this.chassisBody.mass,i=this.wheelInfos,r=i.length;for(let o=0;o<r;o++){const a=i[o];if(a.isInContact){let c;const l=a.suspensionRestLength,h=a.suspensionLength,u=l-h;c=a.suspensionStiffness*u*a.clippedInvContactDotSuspension;const d=a.suspensionRelativeVelocity;let f;d<0?f=a.dampingCompression:f=a.dampingRelaxation,c-=f*d,a.suspensionForce=c*n,a.suspensionForce<0&&(a.suspensionForce=0)}else a.suspensionForce=0}}removeFromWorld(t){this.constraints,t.removeBody(this.chassisBody),t.removeEventListener("preStep",this.preStepCallback),this.world=null}castRay(t){const e=zy,n=By;this.updateWheelTransformWorld(t);const i=this.chassisBody;let r=-1;const o=t.suspensionRestLength+t.radius;t.directionWorld.scale(o,e);const a=t.chassisConnectionPointWorld;a.vadd(e,n);const c=t.raycastResult;c.reset();const l=i.collisionResponse;i.collisionResponse=!1,this.world.rayTest(a,n,c),i.collisionResponse=l;const h=c.body;if(t.raycastResult.groundObject=0,h){r=c.distance,t.raycastResult.hitNormalWorld=c.hitNormalWorld,t.isInContact=!0;const u=c.distance;t.suspensionLength=u-t.radius;const d=t.suspensionRestLength-t.maxSuspensionTravel,f=t.suspensionRestLength+t.maxSuspensionTravel;t.suspensionLength<d&&(t.suspensionLength=d),t.suspensionLength>f&&(t.suspensionLength=f,t.raycastResult.reset());const p=t.raycastResult.hitNormalWorld.dot(t.directionWorld),v=new T;i.getVelocityAtWorldPoint(t.raycastResult.hitPointWorld,v);const g=t.raycastResult.hitNormalWorld.dot(v);if(p>=-.1)t.suspensionRelativeVelocity=0,t.clippedInvContactDotSuspension=1/.1;else{const m=-1/p;t.suspensionRelativeVelocity=g*m,t.clippedInvContactDotSuspension=m}}else t.suspensionLength=t.suspensionRestLength+0*t.maxSuspensionTravel,t.suspensionRelativeVelocity=0,t.directionWorld.scale(-1,t.raycastResult.hitNormalWorld),t.clippedInvContactDotSuspension=1;return r}updateWheelTransformWorld(t){t.isInContact=!1;const e=this.chassisBody;e.pointToWorldFrame(t.chassisConnectionPointLocal,t.chassisConnectionPointWorld),e.vectorToWorldFrame(t.directionLocal,t.directionWorld),e.vectorToWorldFrame(t.axleLocal,t.axleWorld)}updateWheelTransform(t){const e=Uy,n=Fy,i=Oy,r=this.wheelInfos[t];this.updateWheelTransformWorld(r),r.directionLocal.scale(-1,e),n.copy(r.axleLocal),e.cross(n,i),i.normalize(),n.normalize();const o=r.steering,a=new pe;a.setFromAxisAngle(e,o);const c=new pe;c.setFromAxisAngle(n,r.rotation);const l=r.worldTransform.quaternion;this.chassisBody.quaternion.mult(a,l),l.mult(c,l),l.normalize();const h=r.worldTransform.position;h.copy(r.directionWorld),h.scale(r.suspensionLength,h),h.vadd(r.chassisConnectionPointWorld,h)}getWheelTransformWorld(t){return this.wheelInfos[t].worldTransform}updateFriction(t){const e=Gy,n=this.wheelInfos,i=n.length,r=this.chassisBody,o=Wy,a=Hy;this.numWheelsOnGround=0;for(let h=0;h<i;h++){const u=n[h];u.raycastResult.body&&this.numWheelsOnGround++,u.sideImpulse=0,u.forwardImpulse=0,o[h]||(o[h]=new T),a[h]||(a[h]=new T)}for(let h=0;h<i;h++){const u=n[h],d=u.raycastResult.body;if(d){const f=a[h];this.getWheelTransformWorld(h).vectorToWorldFrame(ky[this.indexRightAxis],f);const v=u.raycastResult.hitNormalWorld,g=f.dot(v);v.scale(g,e),f.vsub(e,f),f.normalize(),v.cross(f,o[h]),o[h].normalize(),u.sideImpulse=n_(r,u.raycastResult.hitPointWorld,d,u.raycastResult.hitPointWorld,f),u.sideImpulse*=Vy}}const c=1,l=.5;this.sliding=!1;for(let h=0;h<i;h++){const u=n[h],d=u.raycastResult.body;let f=0;if(u.slipInfo=1,d){const v=u.brake?u.brake:0;f=jy(r,d,u.raycastResult.hitPointWorld,o[h],v),f+=u.engineForce*t;const g=v/f;u.slipInfo*=g}if(u.forwardImpulse=0,u.skidInfo=1,d){u.skidInfo=1;const p=u.suspensionForce*t*u.frictionSlip,g=p*p;u.forwardImpulse=f;const m=u.forwardImpulse*l/u.forwardAcceleration,x=u.sideImpulse*c/u.sideAcceleration,y=m*m+x*x;if(u.sliding=!1,y>g){this.sliding=!0,u.sliding=!0;const _=p/Math.sqrt(y);u.skidInfo*=_}}}if(this.sliding)for(let h=0;h<i;h++){const u=n[h];u.sideImpulse!==0&&u.skidInfo<1&&(u.forwardImpulse*=u.skidInfo,u.sideImpulse*=u.skidInfo)}for(let h=0;h<i;h++){const u=n[h],d=new T;if(u.raycastResult.hitPointWorld.vsub(r.position,d),u.forwardImpulse!==0){const f=new T;o[h].scale(u.forwardImpulse,f),r.applyImpulse(f,d)}if(u.sideImpulse!==0){const f=u.raycastResult.body,p=new T;u.raycastResult.hitPointWorld.vsub(f.position,p);const v=new T;a[h].scale(u.sideImpulse,v),r.vectorToLocalFrame(d,d),d["xyz"[this.indexUpAxis]]*=u.rollInfluence,r.vectorToWorldFrame(d,d),r.applyImpulse(v,d),v.scale(-1,v),f.applyImpulse(v,p)}}}}new T;new T;new T;const Uy=new T,Fy=new T,Oy=new T;new we;new T;const zy=new T,By=new T,ky=[new T(1,0,0),new T(0,1,0),new T(0,0,1)],Gy=new T,Hy=[],Wy=[],Vy=1,Xy=new T,qy=new T,Yy=new T;function jy(s,t,e,n,i){let r=0;const o=e,a=Xy,c=qy,l=Yy;s.getVelocityAtWorldPoint(o,a),t.getVelocityAtWorldPoint(o,c),a.vsub(c,l);const h=n.dot(l),u=vh(s,e,n),d=vh(t,e,n),p=1/(u+d);return r=-h*p,i<r&&(r=i),r<-i&&(r=-i),r}const Ky=new T,Zy=new T,Jy=new T,Qy=new T;function vh(s,t,e){const n=Ky,i=Zy,r=Jy,o=Qy;return t.vsub(s.position,n),n.cross(e,i),s.invInertiaWorld.vmult(i,o),o.cross(n,r),s.invMass+e.dot(r)}const $y=new T,t_=new T,e_=new T;function n_(s,t,e,n,i){if(i.lengthSquared()>1.1)return 0;const o=$y,a=t_,c=e_;s.getVelocityAtWorldPoint(t,o),e.getVelocityAtWorldPoint(n,a),o.vsub(a,c);const l=i.dot(c),h=1/(s.invMass+e.invMass);return-.2*l*h}new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new sn;new T;new sn;new T;new T;new T;new T;new T;new T;new T;new sn;new T;new ne;new sn;class i_{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class s_ extends i_{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,r=this.tolerance*this.tolerance,o=this.equations,a=o.length,c=e.bodies,l=c.length,h=t;let u,d,f,p,v,g;if(a!==0)for(let _=0;_!==l;_++)c[_].updateSolveMassProperties();const m=o_,x=a_,y=r_;m.length=a,x.length=a,y.length=a;for(let _=0;_!==a;_++){const M=o[_];y[_]=0,x[_]=M.computeB(h),m[_]=1/M.computeC()}if(a!==0){for(let S=0;S!==l;S++){const b=c[S],R=b.vlambda,w=b.wlambda;R.set(0,0,0),w.set(0,0,0)}for(n=0;n!==i;n++){p=0;for(let S=0;S!==a;S++){const b=o[S];u=x[S],d=m[S],g=y[S],v=b.computeGWlambda(),f=d*(u-v-b.eps*g),g+f<b.minForce?f=b.minForce-g:g+f>b.maxForce&&(f=b.maxForce-g),y[S]+=f,p+=f>0?f:-f,b.addToWlambda(f)}if(p*p<r)break}for(let S=0;S!==l;S++){const b=c[S],R=b.velocity,w=b.angularVelocity;b.vlambda.vmul(b.linearFactor,b.vlambda),R.vadd(b.vlambda,R),b.wlambda.vmul(b.angularFactor,b.wlambda),w.vadd(b.wlambda,w)}let _=o.length;const M=1/h;for(;_--;)o[_].multiplier=y[_]*M}return n}}const r_=[],o_=[],a_=[];class c_{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class l_ extends c_{constructor(){super(...arguments),this.type=T}constructObject(){return new T}}const fe={sphereSphere:Lt.types.SPHERE,spherePlane:Lt.types.SPHERE|Lt.types.PLANE,boxBox:Lt.types.BOX|Lt.types.BOX,sphereBox:Lt.types.SPHERE|Lt.types.BOX,planeBox:Lt.types.PLANE|Lt.types.BOX,convexConvex:Lt.types.CONVEXPOLYHEDRON,sphereConvex:Lt.types.SPHERE|Lt.types.CONVEXPOLYHEDRON,planeConvex:Lt.types.PLANE|Lt.types.CONVEXPOLYHEDRON,boxConvex:Lt.types.BOX|Lt.types.CONVEXPOLYHEDRON,sphereHeightfield:Lt.types.SPHERE|Lt.types.HEIGHTFIELD,boxHeightfield:Lt.types.BOX|Lt.types.HEIGHTFIELD,convexHeightfield:Lt.types.CONVEXPOLYHEDRON|Lt.types.HEIGHTFIELD,sphereParticle:Lt.types.PARTICLE|Lt.types.SPHERE,planeParticle:Lt.types.PLANE|Lt.types.PARTICLE,boxParticle:Lt.types.BOX|Lt.types.PARTICLE,convexParticle:Lt.types.PARTICLE|Lt.types.CONVEXPOLYHEDRON,cylinderCylinder:Lt.types.CYLINDER,sphereCylinder:Lt.types.SPHERE|Lt.types.CYLINDER,planeCylinder:Lt.types.PLANE|Lt.types.CYLINDER,boxCylinder:Lt.types.BOX|Lt.types.CYLINDER,convexCylinder:Lt.types.CONVEXPOLYHEDRON|Lt.types.CYLINDER,heightfieldCylinder:Lt.types.HEIGHTFIELD|Lt.types.CYLINDER,particleCylinder:Lt.types.PARTICLE|Lt.types.CYLINDER,sphereTrimesh:Lt.types.SPHERE|Lt.types.TRIMESH,planeTrimesh:Lt.types.PLANE|Lt.types.TRIMESH};class h_{get[fe.sphereSphere](){return this.sphereSphere}get[fe.spherePlane](){return this.spherePlane}get[fe.boxBox](){return this.boxBox}get[fe.sphereBox](){return this.sphereBox}get[fe.planeBox](){return this.planeBox}get[fe.convexConvex](){return this.convexConvex}get[fe.sphereConvex](){return this.sphereConvex}get[fe.planeConvex](){return this.planeConvex}get[fe.boxConvex](){return this.boxConvex}get[fe.sphereHeightfield](){return this.sphereHeightfield}get[fe.boxHeightfield](){return this.boxHeightfield}get[fe.convexHeightfield](){return this.convexHeightfield}get[fe.sphereParticle](){return this.sphereParticle}get[fe.planeParticle](){return this.planeParticle}get[fe.boxParticle](){return this.boxParticle}get[fe.convexParticle](){return this.convexParticle}get[fe.cylinderCylinder](){return this.convexConvex}get[fe.sphereCylinder](){return this.sphereConvex}get[fe.planeCylinder](){return this.planeConvex}get[fe.boxCylinder](){return this.boxConvex}get[fe.convexCylinder](){return this.convexConvex}get[fe.heightfieldCylinder](){return this.heightfieldCylinder}get[fe.particleCylinder](){return this.particleCylinder}get[fe.sphereTrimesh](){return this.sphereTrimesh}get[fe.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new l_,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,r,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new wy(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=r||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,r=t.si,o=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=r.material||n.material,u=o.material||i.material;if(h&&u&&h.friction>=0&&u.friction>=0&&(l=h.friction*u.friction),l>0){const d=l*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const p=this.frictionEquationPool,v=p.length?p.pop():new ph(n,i,d*f),g=p.length?p.pop():new ph(n,i,d*f);return v.bi=g.bi=n,v.bj=g.bj=i,v.minForce=g.minForce=-d*f,v.maxForce=g.maxForce=d*f,v.ri.copy(t.ri),v.rj.copy(t.rj),g.ri.copy(t.ri),g.rj.copy(t.rj),t.ni.tangents(v.t,g.t),v.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),g.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),v.enabled=g.enabled=t.enabled,e.push(v,g),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];li.setZero(),qi.setZero(),Yi.setZero();const r=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==r?(li.vadd(e.ni,li),qi.vadd(e.ri,qi),Yi.vadd(e.rj,Yi)):(li.vsub(e.ni,li),qi.vadd(e.rj,qi),Yi.vadd(e.ri,Yi));const o=1/t;qi.scale(o,n.ri),Yi.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),li.normalize(),li.tangents(n.t,i.t)}getContacts(t,e,n,i,r,o,a){this.contactPointPool=r,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;const c=f_,l=p_,h=u_,u=d_;for(let d=0,f=t.length;d!==f;d++){const p=t[d],v=e[d];let g=null;p.material&&v.material&&(g=n.getContactMaterial(p.material,v.material)||null);const m=p.type&Ct.KINEMATIC&&v.type&Ct.STATIC||p.type&Ct.STATIC&&v.type&Ct.KINEMATIC||p.type&Ct.KINEMATIC&&v.type&Ct.KINEMATIC;for(let x=0;x<p.shapes.length;x++){p.quaternion.mult(p.shapeOrientations[x],c),p.quaternion.vmult(p.shapeOffsets[x],h),h.vadd(p.position,h);const y=p.shapes[x];for(let _=0;_<v.shapes.length;_++){v.quaternion.mult(v.shapeOrientations[_],l),v.quaternion.vmult(v.shapeOffsets[_],u),u.vadd(v.position,u);const M=v.shapes[_];if(!(y.collisionFilterMask&M.collisionFilterGroup&&M.collisionFilterMask&y.collisionFilterGroup)||h.distanceTo(u)>y.boundingSphereRadius+M.boundingSphereRadius)continue;let S=null;y.material&&M.material&&(S=n.getContactMaterial(y.material,M.material)||null),this.currentContactMaterial=S||g||n.defaultContactMaterial;const b=y.type|M.type,R=this[b];if(R){let w=!1;y.type<M.type?w=R.call(this,y,M,h,u,c,l,p,v,y,M,m):w=R.call(this,M,y,u,h,l,c,v,p,y,M,m),w&&m&&(n.shapeOverlapKeeper.set(y.id,M.id),n.bodyOverlapKeeper.set(p.id,v.id))}}}}}sphereSphere(t,e,n,i,r,o,a,c,l,h,u){if(u)return n.distanceSquared(i)<(t.radius+e.radius)**2;const d=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,d.ni),d.ni.normalize(),d.ri.copy(d.ni),d.rj.copy(d.ni),d.ri.scale(t.radius,d.ri),d.rj.scale(-e.radius,d.rj),d.ri.vadd(n,d.ri),d.ri.vsub(a.position,d.ri),d.rj.vadd(i,d.rj),d.rj.vsub(c.position,d.rj),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}spherePlane(t,e,n,i,r,o,a,c,l,h,u){const d=this.createContactEquation(a,c,t,e,l,h);if(d.ni.set(0,0,1),o.vmult(d.ni,d.ni),d.ni.negate(d.ni),d.ni.normalize(),d.ni.scale(t.radius,d.ri),n.vsub(i,Ir),d.ni.scale(d.ni.dot(Ir),xh),Ir.vsub(xh,d.rj),-Ir.dot(d.ni)<=t.radius){if(u)return!0;const f=d.ri,p=d.rj;f.vadd(n,f),f.vsub(a.position,f),p.vadd(i,p),p.vsub(c.position,p),this.result.push(d),this.createFrictionEquationsFromContact(d,this.frictionResult)}}boxBox(t,e,n,i,r,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,r,o,a,c,t,e,u)}sphereBox(t,e,n,i,r,o,a,c,l,h,u){const d=this.v3pool,f=k_;n.vsub(i,Dr),e.getSideNormals(f,o);const p=t.radius;let v=!1;const g=H_,m=W_,x=V_;let y=null,_=0,M=0,S=0,b=null;for(let N=0,q=f.length;N!==q&&v===!1;N++){const k=O_;k.copy(f[N]);const X=k.length();k.normalize();const Z=Dr.dot(k);if(Z<X+p&&Z>0){const G=z_,W=B_;G.copy(f[(N+1)%3]),W.copy(f[(N+2)%3]);const Y=G.length(),nt=W.length();G.normalize(),W.normalize();const ht=Dr.dot(G),dt=Dr.dot(W);if(ht<Y&&ht>-Y&&dt<nt&&dt>-nt){const st=Math.abs(Z-X-p);if((b===null||st<b)&&(b=st,M=ht,S=dt,y=X,g.copy(k),m.copy(G),x.copy(W),_++,u))return!0}}}if(_){v=!0;const N=this.createContactEquation(a,c,t,e,l,h);g.scale(-p,N.ri),N.ni.copy(g),N.ni.negate(N.ni),g.scale(y,g),m.scale(M,m),g.vadd(m,g),x.scale(S,x),g.vadd(x,N.rj),N.ri.vadd(n,N.ri),N.ri.vsub(a.position,N.ri),N.rj.vadd(i,N.rj),N.rj.vsub(c.position,N.rj),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}let R=d.get();const w=G_;for(let N=0;N!==2&&!v;N++)for(let q=0;q!==2&&!v;q++)for(let k=0;k!==2&&!v;k++)if(R.set(0,0,0),N?R.vadd(f[0],R):R.vsub(f[0],R),q?R.vadd(f[1],R):R.vsub(f[1],R),k?R.vadd(f[2],R):R.vsub(f[2],R),i.vadd(R,w),w.vsub(n,w),w.lengthSquared()<p*p){if(u)return!0;v=!0;const X=this.createContactEquation(a,c,t,e,l,h);X.ri.copy(w),X.ri.normalize(),X.ni.copy(X.ri),X.ri.scale(p,X.ri),X.rj.copy(R),X.ri.vadd(n,X.ri),X.ri.vsub(a.position,X.ri),X.rj.vadd(i,X.rj),X.rj.vsub(c.position,X.rj),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult)}d.release(R),R=null;const E=d.get(),U=d.get(),I=d.get(),F=d.get(),C=d.get(),D=f.length;for(let N=0;N!==D&&!v;N++)for(let q=0;q!==D&&!v;q++)if(N%3!==q%3){f[q].cross(f[N],E),E.normalize(),f[N].vadd(f[q],U),I.copy(n),I.vsub(U,I),I.vsub(i,I);const k=I.dot(E);E.scale(k,F);let X=0;for(;X===N%3||X===q%3;)X++;C.copy(n),C.vsub(F,C),C.vsub(U,C),C.vsub(i,C);const Z=Math.abs(k),G=C.length();if(Z<f[X].length()&&G<p){if(u)return!0;v=!0;const W=this.createContactEquation(a,c,t,e,l,h);U.vadd(F,W.rj),W.rj.copy(W.rj),C.negate(W.ni),W.ni.normalize(),W.ri.copy(W.rj),W.ri.vadd(i,W.ri),W.ri.vsub(n,W.ri),W.ri.normalize(),W.ri.scale(p,W.ri),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(c.position,W.rj),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult)}}d.release(E,U,I,F,C)}planeBox(t,e,n,i,r,o,a,c,l,h,u){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,r,o,a,c,t,e,u)}convexConvex(t,e,n,i,r,o,a,c,l,h,u,d,f){const p=rM;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,r,i,o,p,d,f)){const v=[],g=oM;t.clipAgainstHull(n,r,e,i,o,p,-100,100,v);let m=0;for(let x=0;x!==v.length;x++){if(u)return!0;const y=this.createContactEquation(a,c,t,e,l,h),_=y.ri,M=y.rj;p.negate(y.ni),v[x].normal.negate(g),g.scale(v[x].depth,g),v[x].point.vadd(g,_),M.copy(v[x].point),_.vsub(n,_),M.vsub(i,M),_.vadd(n,_),_.vsub(a.position,_),M.vadd(i,M),M.vsub(c.position,M),this.result.push(y),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,r,o,a,c,l,h,u){const d=this.v3pool;n.vsub(i,X_);const f=e.faceNormals,p=e.faces,v=e.vertices,g=t.radius;let m=!1;for(let x=0;x!==v.length;x++){const y=v[x],_=K_;o.vmult(y,_),i.vadd(_,_);const M=j_;if(_.vsub(n,M),M.lengthSquared()<g*g){if(u)return!0;m=!0;const S=this.createContactEquation(a,c,t,e,l,h);S.ri.copy(M),S.ri.normalize(),S.ni.copy(S.ri),S.ri.scale(g,S.ri),_.vsub(i,S.rj),S.ri.vadd(n,S.ri),S.ri.vsub(a.position,S.ri),S.rj.vadd(i,S.rj),S.rj.vsub(c.position,S.rj),this.result.push(S),this.createFrictionEquationsFromContact(S,this.frictionResult);return}}for(let x=0,y=p.length;x!==y&&m===!1;x++){const _=f[x],M=p[x],S=Z_;o.vmult(_,S);const b=J_;o.vmult(v[M[0]],b),b.vadd(i,b);const R=Q_;S.scale(-g,R),n.vadd(R,R);const w=$_;R.vsub(b,w);const E=w.dot(S),U=tM;if(n.vsub(b,U),E<0&&U.dot(S)>0){const I=[];for(let F=0,C=M.length;F!==C;F++){const D=d.get();o.vmult(v[M[F]],D),i.vadd(D,D),I.push(D)}if(F_(I,S,n)){if(u)return!0;m=!0;const F=this.createContactEquation(a,c,t,e,l,h);S.scale(-g,F.ri),S.negate(F.ni);const C=d.get();S.scale(-E,C);const D=d.get();S.scale(-g,D),n.vsub(i,F.rj),F.rj.vadd(D,F.rj),F.rj.vadd(C,F.rj),F.rj.vadd(i,F.rj),F.rj.vsub(c.position,F.rj),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),d.release(C),d.release(D),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult);for(let N=0,q=I.length;N!==q;N++)d.release(I[N]);return}else for(let F=0;F!==M.length;F++){const C=d.get(),D=d.get();o.vmult(v[M[(F+1)%M.length]],C),o.vmult(v[M[(F+2)%M.length]],D),i.vadd(C,C),i.vadd(D,D);const N=q_;D.vsub(C,N);const q=Y_;N.unit(q);const k=d.get(),X=d.get();n.vsub(C,X);const Z=X.dot(q);q.scale(Z,k),k.vadd(C,k);const G=d.get();if(k.vsub(n,G),Z>0&&Z*Z<N.lengthSquared()&&G.lengthSquared()<g*g){if(u)return!0;const W=this.createContactEquation(a,c,t,e,l,h);k.vsub(i,W.rj),k.vsub(n,W.ni),W.ni.normalize(),W.ni.scale(g,W.ri),W.rj.vadd(i,W.rj),W.rj.vsub(c.position,W.rj),W.ri.vadd(n,W.ri),W.ri.vsub(a.position,W.ri),this.result.push(W),this.createFrictionEquationsFromContact(W,this.frictionResult);for(let Y=0,nt=I.length;Y!==nt;Y++)d.release(I[Y]);d.release(C),d.release(D),d.release(k),d.release(G),d.release(X);return}d.release(C),d.release(D),d.release(k),d.release(G),d.release(X)}for(let F=0,C=I.length;F!==C;F++)d.release(I[F])}}}planeConvex(t,e,n,i,r,o,a,c,l,h,u){const d=eM,f=nM;f.set(0,0,1),r.vmult(f,f);let p=0;const v=iM;for(let g=0;g!==e.vertices.length;g++)if(d.copy(e.vertices[g]),o.vmult(d,d),i.vadd(d,d),d.vsub(n,v),f.dot(v)<=0){if(u)return!0;const x=this.createContactEquation(a,c,t,e,l,h),y=sM;f.scale(f.dot(v),y),d.vsub(y,y),y.vsub(n,x.ri),x.ni.copy(f),d.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(c.position,x.rj),this.result.push(x),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}boxConvex(t,e,n,i,r,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,u)}sphereHeightfield(t,e,n,i,r,o,a,c,l,h,u){const d=e.data,f=t.radius,p=e.elementSize,v=xM,g=vM;ne.pointToLocalFrame(i,o,n,g);let m=Math.floor((g.x-f)/p)-1,x=Math.ceil((g.x+f)/p)+1,y=Math.floor((g.y-f)/p)-1,_=Math.ceil((g.y+f)/p)+1;if(x<0||_<0||m>d.length||y>d[0].length)return;m<0&&(m=0),x<0&&(x=0),y<0&&(y=0),_<0&&(_=0),m>=d.length&&(m=d.length-1),x>=d.length&&(x=d.length-1),_>=d[0].length&&(_=d[0].length-1),y>=d[0].length&&(y=d[0].length-1);const M=[];e.getRectMinMax(m,y,x,_,M);const S=M[0],b=M[1];if(g.z-f>b||g.z+f<S)return;const R=this.result;for(let w=m;w<x;w++)for(let E=y;E<_;E++){const U=R.length;let I=!1;if(e.getConvexTrianglePillar(w,E,!1),ne.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(I=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,c,t,e,u)),u&&I||(e.getConvexTrianglePillar(w,E,!0),ne.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(I=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,c,t,e,u)),u&&I))return!0;if(R.length-U>2)return}}boxHeightfield(t,e,n,i,r,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,u)}convexHeightfield(t,e,n,i,r,o,a,c,l,h,u){const d=e.data,f=e.elementSize,p=t.boundingSphereRadius,v=mM,g=gM,m=pM;ne.pointToLocalFrame(i,o,n,m);let x=Math.floor((m.x-p)/f)-1,y=Math.ceil((m.x+p)/f)+1,_=Math.floor((m.y-p)/f)-1,M=Math.ceil((m.y+p)/f)+1;if(y<0||M<0||x>d.length||_>d[0].length)return;x<0&&(x=0),y<0&&(y=0),_<0&&(_=0),M<0&&(M=0),x>=d.length&&(x=d.length-1),y>=d.length&&(y=d.length-1),M>=d[0].length&&(M=d[0].length-1),_>=d[0].length&&(_=d[0].length-1);const S=[];e.getRectMinMax(x,_,y,M,S);const b=S[0],R=S[1];if(!(m.z-p>R||m.z+p<b))for(let w=x;w<y;w++)for(let E=_;E<M;E++){let U=!1;if(e.getConvexTrianglePillar(w,E,!1),ne.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,c,null,null,u,g,null)),u&&U||(e.getConvexTrianglePillar(w,E,!0),ne.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(U=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,c,null,null,u,g,null)),u&&U))return!0}}sphereParticle(t,e,n,i,r,o,a,c,l,h,u){const d=hM;if(d.set(0,0,1),i.vsub(n,d),d.lengthSquared()<=t.radius*t.radius){if(u)return!0;const p=this.createContactEquation(c,a,e,t,l,h);d.normalize(),p.rj.copy(d),p.rj.scale(t.radius,p.rj),p.ni.copy(d),p.ni.negate(p.ni),p.ri.set(0,0,0),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}}planeParticle(t,e,n,i,r,o,a,c,l,h,u){const d=aM;d.set(0,0,1),a.quaternion.vmult(d,d);const f=cM;if(i.vsub(a.position,f),d.dot(f)<=0){if(u)return!0;const v=this.createContactEquation(c,a,e,t,l,h);v.ni.copy(d),v.ni.negate(v.ni),v.ri.set(0,0,0);const g=lM;d.scale(d.dot(i),g),i.vsub(g,g),v.rj.copy(g),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,r,o,a,c,l,h,u){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,u)}convexParticle(t,e,n,i,r,o,a,c,l,h,u){let d=-1;const f=dM,p=fM;let v=null;const g=uM;if(g.copy(i),g.vsub(n,g),r.conjugate(yh),yh.vmult(g,g),t.pointIsInside(g)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,r),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(r);for(let m=0,x=t.faces.length;m!==x;m++){const y=[t.worldVertices[t.faces[m][0]]],_=t.worldFaceNormals[m];i.vsub(y[0],_h);const M=-_.dot(_h);if(v===null||Math.abs(M)<Math.abs(v)){if(u)return!0;v=M,d=m,f.copy(_)}}if(d!==-1){const m=this.createContactEquation(c,a,e,t,l,h);f.scale(v,p),p.vadd(i,p),p.vsub(n,p),m.rj.copy(p),f.negate(m.ni),m.ri.set(0,0,0);const x=m.ri,y=m.rj;x.vadd(i,x),x.vsub(c.position,x),y.vadd(n,y),y.vsub(a.position,y),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,r,o,a,c,l,h,u){return this.convexHeightfield(e,t,i,n,o,r,c,a,l,h,u)}particleCylinder(t,e,n,i,r,o,a,c,l,h,u){return this.convexParticle(e,t,i,n,o,r,c,a,l,h,u)}sphereTrimesh(t,e,n,i,r,o,a,c,l,h,u){const d=w_,f=S_,p=b_,v=E_,g=T_,m=A_,x=L_,y=M_,_=y_,M=I_;ne.pointToLocalFrame(i,o,n,g);const S=t.radius;x.lowerBound.set(g.x-S,g.y-S,g.z-S),x.upperBound.set(g.x+S,g.y+S,g.z+S),e.getTrianglesInAABB(x,M);const b=__,R=t.radius*t.radius;for(let F=0;F<M.length;F++)for(let C=0;C<3;C++)if(e.getVertex(e.indices[M[F]*3+C],b),b.vsub(g,_),_.lengthSquared()<=R){if(y.copy(b),ne.pointToWorldFrame(i,o,y,b),b.vsub(n,_),u)return!0;let D=this.createContactEquation(a,c,t,e,l,h);D.ni.copy(_),D.ni.normalize(),D.ri.copy(D.ni),D.ri.scale(t.radius,D.ri),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),D.rj.copy(b),D.rj.vsub(c.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}for(let F=0;F<M.length;F++)for(let C=0;C<3;C++){e.getVertex(e.indices[M[F]*3+C],d),e.getVertex(e.indices[M[F]*3+(C+1)%3],f),f.vsub(d,p),g.vsub(f,m);const D=m.dot(p);g.vsub(d,m);let N=m.dot(p);if(N>0&&D<0&&(g.vsub(d,m),v.copy(p),v.normalize(),N=m.dot(v),v.scale(N,m),m.vadd(d,m),m.distanceTo(g)<t.radius)){if(u)return!0;const k=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,k.ni),k.ni.normalize(),k.ni.scale(t.radius,k.ri),k.ri.vadd(n,k.ri),k.ri.vsub(a.position,k.ri),ne.pointToWorldFrame(i,o,m,m),m.vsub(c.position,k.rj),ne.vectorToWorldFrame(o,k.ni,k.ni),ne.vectorToWorldFrame(o,k.ri,k.ri),this.result.push(k),this.createFrictionEquationsFromContact(k,this.frictionResult)}}const w=C_,E=R_,U=P_,I=x_;for(let F=0,C=M.length;F!==C;F++){e.getTriangleVertices(M[F],w,E,U),e.getNormal(M[F],I),g.vsub(w,m);let D=m.dot(I);if(I.scale(D,m),g.vsub(m,m),D=m.distanceTo(g),we.pointInTriangle(m,w,E,U)&&D<t.radius){if(u)return!0;let N=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,N.ni),N.ni.normalize(),N.ni.scale(t.radius,N.ri),N.ri.vadd(n,N.ri),N.ri.vsub(a.position,N.ri),ne.pointToWorldFrame(i,o,m,m),m.vsub(c.position,N.rj),ne.vectorToWorldFrame(o,N.ni,N.ni),ne.vectorToWorldFrame(o,N.ri,N.ri),this.result.push(N),this.createFrictionEquationsFromContact(N,this.frictionResult)}}M.length=0}planeTrimesh(t,e,n,i,r,o,a,c,l,h,u){const d=new T,f=m_;f.set(0,0,1),r.vmult(f,f);for(let p=0;p<e.vertices.length/3;p++){e.getVertex(p,d);const v=new T;v.copy(d),ne.pointToWorldFrame(i,o,v,d);const g=g_;if(d.vsub(n,g),f.dot(g)<=0){if(u)return!0;const x=this.createContactEquation(a,c,t,e,l,h);x.ni.copy(f);const y=v_;f.scale(g.dot(f),y),d.vsub(y,y),x.ri.copy(y),x.ri.vsub(a.position,x.ri),x.rj.copy(d),x.rj.vsub(c.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}}const li=new T,qi=new T,Yi=new T,u_=new T,d_=new T,f_=new pe,p_=new pe,m_=new T,g_=new T,v_=new T,x_=new T,y_=new T;new T;const __=new T,M_=new T,w_=new T,S_=new T,b_=new T,E_=new T,T_=new T,A_=new T,C_=new T,R_=new T,P_=new T,L_=new sn,I_=[],Ir=new T,xh=new T,D_=new T,N_=new T,U_=new T;function F_(s,t,e){let n=null;const i=s.length;for(let r=0;r!==i;r++){const o=s[r],a=D_;s[(r+1)%i].vsub(o,a);const c=N_;a.cross(t,c);const l=U_;e.vsub(o,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Dr=new T,O_=new T,z_=new T,B_=new T,k_=[new T,new T,new T,new T,new T,new T],G_=new T,H_=new T,W_=new T,V_=new T,X_=new T,q_=new T,Y_=new T,j_=new T,K_=new T,Z_=new T,J_=new T,Q_=new T,$_=new T,tM=new T;new T;new T;const eM=new T,nM=new T,iM=new T,sM=new T,rM=new T,oM=new T,aM=new T,cM=new T,lM=new T,hM=new T,yh=new pe,uM=new T;new T;const dM=new T,_h=new T,fM=new T,pM=new T,mM=new T,gM=[0],vM=new T,xM=new T;class Mh{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let r=0;for(;n>i[r];)r++;if(n!==i[r]){for(let o=i.length-1;o>=r;o--)i[o+1]=i[o];i[r]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,r=n.length,o=i.length;let a=0;for(let c=0;c<r;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||wh(t,h)}a=0;for(let c=0;c<o;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||wh(e,h)}}}function wh(s,t){s.push((t&4294901760)>>16,t&65535)}const pa=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`;class yM{constructor(){this.data={keys:[]}}get(t,e){const n=pa(t,e);return this.data[n]}set(t,e,n){const i=pa(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=pa(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class _M extends Nu{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new T,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new T,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Uu,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new s_,this.constraints=[],this.narrowphase=new h_(this),this.collisionMatrix=new sh,this.collisionMatrixPrevious=new sh,this.bodyOverlapKeeper=new Mh,this.shapeOverlapKeeper=new Mh,this.contactmaterials=[],this.contactMaterialTable=new yM,this.defaultMaterial=new Qn("default"),this.defaultContactMaterial=new _i(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof Xs?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=we.ALL,n.from=t,n.to=e,n.callback=i,ma.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=we.ANY,n.from=t,n.to=e,n.result=i,ma.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=we.CLOSEST,n.from=t,n.to=e,n.result=i,ma.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof Ct&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let r=0;r!==n.length;r++)n[r].index=r;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let r=0;r<i.length;r++){const o=i[r];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Se.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Se.now();let r=0;for(;this.accumulator>=t&&r<n&&(this.internalStep(t),this.accumulator-=t,r++,!(Se.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,o,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,o,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=EM,i=TM,r=this.bodies.length,o=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,u=Ct.DYNAMIC;let d=-1/0;const f=this.constraints,p=bM;c.length();const v=c.x,g=c.y,m=c.z;let x=0;for(l&&(d=Se.now()),x=0;x!==r;x++){const F=o[x];if(F.type===u){const C=F.force,D=F.mass;C.x+=D*v,C.y+=D*g,C.z+=D*m}}for(let F=0,C=this.subsystems.length;F!==C;F++)this.subsystems[F].update();l&&(d=Se.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Se.now()-d);let y=f.length;for(x=0;x!==y;x++){const F=f[x];if(!F.collideConnected)for(let C=n.length-1;C>=0;C-=1)(F.bodyA===n[C]&&F.bodyB===i[C]||F.bodyB===n[C]&&F.bodyA===i[C])&&(n.splice(C,1),i.splice(C,1))}this.collisionMatrixTick(),l&&(d=Se.now());const _=SM,M=e.length;for(x=0;x!==M;x++)_.push(e[x]);e.length=0;const S=this.frictionEquations.length;for(x=0;x!==S;x++)p.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,_,this.frictionEquations,p),l&&(h.narrowphase=Se.now()-d),l&&(d=Se.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);const b=e.length;for(let F=0;F!==b;F++){const C=e[F],D=C.bi,N=C.bj,q=C.si,k=C.sj;let X;if(D.material&&N.material?X=this.getContactMaterial(D.material,N.material)||this.defaultContactMaterial:X=this.defaultContactMaterial,X.friction,D.material&&N.material&&(D.material.friction>=0&&N.material.friction>=0&&D.material.friction*N.material.friction,D.material.restitution>=0&&N.material.restitution>=0&&(C.restitution=D.material.restitution*N.material.restitution)),a.addEquation(C),D.allowSleep&&D.type===Ct.DYNAMIC&&D.sleepState===Ct.SLEEPING&&N.sleepState===Ct.AWAKE&&N.type!==Ct.STATIC){const Z=N.velocity.lengthSquared()+N.angularVelocity.lengthSquared(),G=N.sleepSpeedLimit**2;Z>=G*2&&(D.wakeUpAfterNarrowphase=!0)}if(N.allowSleep&&N.type===Ct.DYNAMIC&&N.sleepState===Ct.SLEEPING&&D.sleepState===Ct.AWAKE&&D.type!==Ct.STATIC){const Z=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),G=D.sleepSpeedLimit**2;Z>=G*2&&(N.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(D,N,!0),this.collisionMatrixPrevious.get(D,N)||(Es.body=N,Es.contact=C,D.dispatchEvent(Es),Es.body=D,N.dispatchEvent(Es)),this.bodyOverlapKeeper.set(D.id,N.id),this.shapeOverlapKeeper.set(q.id,k.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Se.now()-d,d=Se.now()),x=0;x!==r;x++){const F=o[x];F.wakeUpAfterNarrowphase&&(F.wakeUp(),F.wakeUpAfterNarrowphase=!1)}for(y=f.length,x=0;x!==y;x++){const F=f[x];F.update();for(let C=0,D=F.equations.length;C!==D;C++){const N=F.equations[C];a.addEquation(N)}}a.solve(t,this),l&&(h.solve=Se.now()-d),a.removeAllEquations();const R=Math.pow;for(x=0;x!==r;x++){const F=o[x];if(F.type&u){const C=R(1-F.linearDamping,t),D=F.velocity;D.scale(C,D);const N=F.angularVelocity;if(N){const q=R(1-F.angularDamping,t);N.scale(q,N)}}}this.dispatchEvent(wM),l&&(d=Se.now());const E=this.stepnumber%(this.quatNormalizeSkip+1)===0,U=this.quatNormalizeFast;for(x=0;x!==r;x++)o[x].integrate(t,E,U);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Se.now()-d),this.stepnumber+=1,this.dispatchEvent(MM);let I=!0;if(this.allowSleep)for(I=!1,x=0;x!==r;x++){const F=o[x];F.sleepTick(this.time),F.sleepState!==Ct.SLEEPING&&(I=!0)}this.hasActiveBodies=I}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(In,Dn),t){for(let r=0,o=In.length;r<o;r+=2)Ts.bodyA=this.getBodyById(In[r]),Ts.bodyB=this.getBodyById(In[r+1]),this.dispatchEvent(Ts);Ts.bodyA=Ts.bodyB=null}if(e){for(let r=0,o=Dn.length;r<o;r+=2)As.bodyA=this.getBodyById(Dn[r]),As.bodyB=this.getBodyById(Dn[r+1]),this.dispatchEvent(As);As.bodyA=As.bodyB=null}In.length=Dn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(In,Dn),n){for(let r=0,o=In.length;r<o;r+=2){const a=this.getShapeById(In[r]),c=this.getShapeById(In[r+1]);Nn.shapeA=a,Nn.shapeB=c,a&&(Nn.bodyA=a.body),c&&(Nn.bodyB=c.body),this.dispatchEvent(Nn)}Nn.bodyA=Nn.bodyB=Nn.shapeA=Nn.shapeB=null}if(i){for(let r=0,o=Dn.length;r<o;r+=2){const a=this.getShapeById(Dn[r]),c=this.getShapeById(Dn[r+1]);Un.shapeA=a,Un.shapeB=c,a&&(Un.bodyA=a.body),c&&(Un.bodyB=c.body),this.dispatchEvent(Un)}Un.bodyA=Un.bodyB=Un.shapeA=Un.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new sn;const ma=new we,Se=globalThis.performance||{};if(!Se.now){let s=Date.now();Se.timing&&Se.timing.navigationStart&&(s=Se.timing.navigationStart),Se.now=()=>Date.now()-s}new T;const MM={type:"postStep"},wM={type:"preStep"},Es={type:Ct.COLLIDE_EVENT_NAME,body:null,contact:null},SM=[],bM=[],EM=[],TM=[],In=[],Dn=[],Ts={type:"beginContact",bodyA:null,bodyB:null},As={type:"endContact",bodyA:null,bodyB:null},Nn={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Un={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};function AM(){const s=new _M({gravity:new T(0,-9.82,0)});s.broadphase=new Uu,s.allowSleep=!0,s.defaultContactMaterial.friction=.4;const t=new Qn("ground"),e=new Qn("wheel"),n=new Qn("chassis"),i=new Qn("barrier");return s.addContactMaterial(new _i(t,e,{friction:0,restitution:0,contactEquationStiffness:1e3})),s.addContactMaterial(new _i(n,i,{friction:.08,restitution:.04})),s.addContactMaterial(new _i(n,t,{friction:.2,restitution:.05})),{world:s,materials:{groundMat:t,wheelMat:e,chassisMat:n,barrierMat:i}}}function fc(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,c=new oe;let l=0;for(let h=0;h<s.length;++h){const u=s[h];let d=0;if(e!==(u.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in u.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(u.attributes[f]),d++}if(d!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==u.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in u.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(u.morphAttributes[f])}if(t){let f;if(e)f=u.index.count;else if(u.attributes.position!==void 0)f=u.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const u=[];for(let d=0;d<s.length;++d){const f=s[d].index;for(let p=0;p<f.count;++p)u.push(f.getX(p)+h);h+=s[d].attributes.position.count}c.setIndex(u)}for(const h in r){const u=Sh(r[h]);if(!u)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,u)}for(const h in o){const u=o[h][0].length;if(u===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let d=0;d<u;++d){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][d]);const p=Sh(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}return c}function Sh(s){let t,e,n,i=-1,r=0;for(let l=0;l<s.length;++l){const h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}const o=new t(r);let a=0;for(let l=0;l<s.length;++l)o.set(s[l].array,a),a+=s[l].array.length;const c=new te(o,e,n);return i!==void 0&&(c.gpuType=i),c}const CM=600,RM=14,PM=2,LM=5.5;function bh(s,t,e,n){const i=n.roadWidth??RM,r=n.kerbWidth??PM,o=n.runoffWidth??LM,a=i/2+o+.5,c=n.theme||{},l={road:i,kerb:r,armco:a},h=new ae;s.add(h);const u=[],d=n.controlPoints.map(([Z,G])=>new O(Z,0,G)),f=new bu(d,n.closed!==!1,"catmullrom",n.tension??.5),p=DM(f,CM),v=NM(p),g=UM(p),m=new Set,x=gw(c.ground||"grass"),y=new $(new Fe(4e3,4e3,1,1),x);y.rotation.x=-Math.PI/2,y.position.y=-.02,y.receiveShadow=!0,h.add(y);const _=new Ct({mass:0,material:e.groundMat});_.addShape(new fs(new T(2e3,.5,2e3))),_.position.set(0,-.5,0),t.addBody(_),u.push(_);const M=OM(p,g),S=HM(),b=zM(p,i,M,v),R=new $(b,S);R.position.y=.01,R.receiveShadow=!0,h.add(R),c.skid!==!1&&kM(h,p,g,M);const w=new Nt({color:14474454,roughness:.7,metalness:0,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),E=.2,U=i/2-E/2-.05,I=new $(ga(p,U,E),w);I.position.y=.016,h.add(I);const F=new $(ga(p,-U,E),w);if(F.position.y=.016,h.add(F),c.kerbs!==!1){const Z=qM(),G=FM(g,45e-5,8);for(const W of[1,-1]){const Y=new $(BM(p,W*i/2,r,W,G,v),Z);Y.receiveShadow=!0,Y.castShadow=!1,h.add(Y)}}if((c.ground||"grass")!=="city"){const Z=VM(c.ground||"grass"),G=i/2+r+.7;for(const W of[1,-1]){const Y=new $(ga(p,W*G,1.6),Z);Y.position.y=.004,Y.receiveShadow=!0,h.add(Y)}}c.gravel&&GM(h,p,g,m,l);const C=YM(),D=new Nt({map:C,roughness:.6,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),N=new $(new Fe(i,1.6),D);N.rotation.x=-Math.PI/2,N.position.copy(p[0].pos).add(new O(0,.014,0));const q=Math.atan2(p[0].tan.x,p[0].tan.z);N.rotation.z=-q,h.add(N),cw(h,p[0]),hw(h,p[0],i),c.barrier==="wall"?yw(h,p,a):uw(h,p,a),c.tireStacks&&fw(h,p,g,a-1.4),c.sponsors&&pw(h,p,a+1.6),c.pit&&sw(h,p[0]),c.catchFence&&rw(h,p,l),c.brakeMarkers&&ow(h,p,g,l),c.trees&&tw(h,p,c.trees),c.buildings&&Mw(h,p,l),c.mountains&&nw(h,c.mountains),c.grandstands&&iw(h,p,l),c.rocks&&ww(h,p,l),c.clouds!==!1&&aw(h),mw(t,p,a,e,u),c.fog&&(s.fog=new go(c.fog[0],c.fog[1],c.fog[2]));const k={position:new O().copy(p[0].pos).add(p[0].tan.clone().multiplyScalar(-6)).add(new O(0,1,0)),yaw:Math.atan2(p[0].tan.x,p[0].tan.z)};function X(){s.remove(h),IM(h);for(const Z of u)t.removeBody(Z)}return{id:n.id,name:n.name,curve:f,frames:p,spawn:k,width:i,kerbWidth:r,armcoOffset:a,racingLineOffset:M,isGravel:Z=>m.has(Z),length:f.getLength(),dispose:X}}function IM(s){s.traverse(t=>{t.geometry&&t.geometry.dispose();const e=t.material?Array.isArray(t.material)?t.material:[t.material]:[];for(const n of e){for(const i in n){const r=n[i];r&&r.isTexture&&r.dispose()}n.dispose()}})}function DM(s,t){const e=[];for(let n=0;n<t;n++){const i=n/t,r=s.getPointAt(i),o=s.getTangentAt(i).normalize(),a=new O(-o.z,0,o.x).normalize();e.push({t:i,pos:r,tan:o,left:a})}return e}function NM(s){const t=[0];for(let e=1;e<s.length;e++)t.push(t[e-1]+s[e].pos.distanceTo(s[e-1].pos));return t}function UM(s){const t=s.length,e=new Array(t).fill(0);for(let i=0;i<t;i++){const r=s[i].tan,o=s[(i+1)%t].tan;e[i]=1-r.dot(o)}const n=new Array(t).fill(0);for(let i=0;i<t;i++){let r=0;for(let o=-3;o<=3;o++)r+=e[(i+o+t)%t];n[i]=r/7}return n}function FM(s,t,e){const n=s.length,i=new Array(n).fill(!1);for(let o=0;o<n;o++)i[o]=s[o]>t;const r=new Array(n).fill(!1);for(let o=0;o<n;o++)for(let a=-e;a<=e;a++)if(i[(o+a+n)%n]){r[o]=!0;break}return r}function ga(s,t,e){const n=s.length,i=new Float32Array(n*2*3),r=new Float32Array(n*2*2),o=new Float32Array(n*2*3);for(let l=0;l<n;l++){const h=s[l],u=h.pos.clone().add(h.left.clone().multiplyScalar(t-e/2)),d=h.pos.clone().add(h.left.clone().multiplyScalar(t+e/2));i.set([u.x,u.y,u.z],l*2*3),i.set([d.x,d.y,d.z],(l*2+1)*3),r.set([0,l/n],l*2*2),r.set([1,l/n],(l*2+1)*2),o.set([0,1,0],l*2*3),o.set([0,1,0],(l*2+1)*3)}const a=[];for(let l=0;l<n;l++){const h=l*2,u=l*2+1,d=(l+1)%n*2,f=(l+1)%n*2+1;a.push(h,d,u,u,d,f)}const c=new oe;return c.setAttribute("position",new te(i,3)),c.setAttribute("uv",new te(r,2)),c.setAttribute("normal",new te(o,3)),c.setIndex(a),c}function OM(s,t){const e=s.length,n=new Float32Array(e);for(let r=0;r<e;r++){const o=s[r].tan,a=s[(r+1)%e].tan,c=o.x*a.z-o.z*a.x,l=Math.min(3.2,t[r]*900);n[r]=(c>0?-1:1)*l*(t[r]>8e-4?1:0)}let i=n;for(let r=0;r<3;r++){const o=new Float32Array(e);for(let a=0;a<e;a++){let c=0;for(let l=-6;l<=6;l++)c+=i[(a+l+e)%e];o[a]=c/13}i=o}return i}function zM(s,t,e,n){const i=s.length,r=11,o=new Float32Array(i*r*3),a=new Float32Array(i*r*2),c=new Float32Array(i*r*3),l=new Float32Array(i*r*3);for(let d=0;d<i;d++){const f=s[d],p=n[d],v=e[d],g=.93+.1*de(p*.013,.37,3);for(let m=0;m<r;m++){const x=m/(r-1),y=(.5-x)*t,_=f.pos.clone().add(f.left.clone().multiplyScalar(y)),M=d*r+m;o.set([_.x,_.y,_.z],M*3),a.set([x,p/4],M*2),c.set([0,1,0],M*3);const S=Math.abs(y-v),b=Math.exp(-((S-.85)**2)/(2*.55*.55))+Math.exp(-((S+.85)**2)/(2*.55*.55)),R=1-.24*Math.min(1,b)-.08*Math.exp(-S*S/4),E=1+Math.max(0,Math.abs(y)/(t/2)-.82)/.18*.1,U=g*R*E;l.set([U,U,U*1.003],M*3)}}const h=[];for(let d=0;d<i;d++){const f=d*r,p=(d+1)%i*r;for(let v=0;v<r-1;v++)h.push(f+v,p+v,f+v+1),h.push(f+v+1,p+v,p+v+1)}const u=new oe;return u.setAttribute("position",new te(o,3)),u.setAttribute("uv",new te(a,2)),u.setAttribute("normal",new te(c,3)),u.setAttribute("color",new te(l,3)),u.setIndex(h),u}function BM(s,t,e,n,i,r){const o=s.length,a=[],c=[],l=[],h=r[o-1]+s[0].pos.distanceTo(s[o-1].pos),u=3;let d=-1,f=!1;for(let v=0;v<=o;v++){const g=v%o,m=s[g];if(i[g]){const x=v===o?h:r[g],y=.5+.5*Math.sin(x*Math.PI*2/1),_=.05+.024*y,M=.014+.01*y,S=(b,R)=>{const w=m.pos.clone().add(m.left.clone().multiplyScalar(t+n*b));a.push(w.x,R,w.z)};if(S(0,.012),S(e*.38,_),S(e,M),c.push(0,x,.45,x,1,x),f){const b=d,R=a.length/3-u;for(let w=0;w<u-1;w++)n>0?l.push(b+w,R+w,b+w+1,b+w+1,R+w,R+w+1):l.push(b+w,b+w+1,R+w,b+w+1,R+w+1,R+w)}d=a.length/3-u,f=!0}else f=!1}const p=new oe;return p.setAttribute("position",new te(new Float32Array(a),3)),p.setAttribute("uv",new te(new Float32Array(c),2)),p.setIndex(l),p.computeVertexNormals(),p}function kM(s,t,e,n,i){const r=t.length,o=new us({color:1447450,transparent:!0,opacity:.3,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),a=[];let c=0;for(;c<r;)if(e[c]>.004){let p=c;for(;p<r&&e[p]>.0016;)p++;a.push([Math.max(0,c-10),Math.min(r-1,p+4)]),c=p+12}else c++;const l=[],h=[];let u=0;for(const[p,v]of a)for(const g of[-.85,.85]){const m=(Math.random()-.5)*.3;for(let x=p;x<=v;x++){const y=t[x],_=n[x]+g+m,M=.16,S=y.pos.clone().add(y.left.clone().multiplyScalar(_+M)),b=y.pos.clone().add(y.left.clone().multiplyScalar(_-M));if(l.push(S.x,.018,S.z,b.x,.018,b.z),x>p){const R=u+(x-p)*2;h.push(R-2,R,R-1,R-1,R,R+1)}}u=l.length/3}if(!l.length)return;const d=new oe;d.setAttribute("position",new te(new Float32Array(l),3)),d.setIndex(h),d.computeVertexNormals();const f=new $(d,o);f.renderOrder=2,s.add(f)}function GM(s,t,e,n,i){const r=t.length,o=[];let a=0;for(;a<r;)if(e[a]>.0045){let h=a,u=0;for(;h<r&&e[h]>.002;)e[h]>u&&(u=e[h]),h++;h-a>6&&o.push({i0:Math.max(0,a-14),i1:Math.min(r-1,h+8),peak:u}),a=h+10}else a++;o.sort((h,u)=>u.peak-h.peak);const c=o.slice(0,4),l=XM();for(const h of c){const u=Math.floor((h.i0+h.i1)/2),d=t[u].tan,f=t[(u+1)%r].tan,v=d.x*f.z-d.z*f.x>0?1:-1,g=i.road/2+i.kerb+.3,m=i.armco-.6,x=[],y=[],_=[];let M=0;for(let R=h.i0;R<=h.i1;R++){const w=t[R%r];n.add(R%r);const E=w.pos.clone().add(w.left.clone().multiplyScalar(v*g)),U=w.pos.clone().add(w.left.clone().multiplyScalar(v*m));x.push(E.x,.006,E.z,U.x,.006,U.z),y.push(0,R*.5,3,R*.5),R>h.i0&&_.push(M-2,M,M-1,M-1,M,M+1),M+=2}const S=new oe;S.setAttribute("position",new te(new Float32Array(x),3)),S.setAttribute("uv",new te(new Float32Array(y),2)),S.setIndex(_),S.computeVertexNormals();const b=new $(S,l);b.receiveShadow=!0,s.add(b)}}function HM(){const s=wi(1024,(n,i)=>{const r=de(n*28,i*28,5),o=de(n*95+11,i*95+5,2),a=de(n*7+4,i*7+9,3),c=de(n*2.3+17,i*2.3+6,3);let l=.112+r*.078+a*.028+(c-.5)*.045;o>.68&&(l+=.09),o<.16&&(l-=.04);const h=l*.96,u=l*.98,d=l*1.04;return[h,u,d]});s.wrapS=s.wrapT=Ee,s.repeat.set(3,1),s.anisotropy=16,s.colorSpace=Qt;const t=Mo(512,2.4);t.wrapS=t.wrapT=Ee,t.repeat.set(3,1);const e=wi(512,(n,i)=>{const r=de(n*6+3,i*6+7,4)*.26+.7,o=de(n*2+8,i*2+2,3)*.08;return[r-o,r-o,r-o]});return e.wrapS=e.wrapT=Ee,e.repeat.set(3,1),new Nt({map:s,vertexColors:!0,normalMap:t,normalScale:new et(.78,.78),roughnessMap:e,roughness:.86,metalness:0,envMapIntensity:.55,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function WM(){const s=wi(1024,(e,n)=>{const i=de(e*65,n*65,5),r=de(e*5+9,n*5+3,4),o=de(e*11+31,n*11+17,3),a=de(e*3+2,n*3+7,3),c=1+.1*Math.sin(e*Math.PI*8);let l=(.205+i*.15+r*.15+a*.11+o*.05)*c,h=l*(.52+o*.42),u=l*(.35+a*.11);return[h,l,u]});s.wrapS=s.wrapT=Ee,s.repeat.set(38,38),s.anisotropy=16,s.colorSpace=Qt;const t=Mo(256,.9);return t.wrapS=t.wrapT=Ee,t.repeat.set(80,80),new Nt({map:s,normalMap:t,normalScale:new et(.45,.45),roughness:.95,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function VM(s="grass"){const t={grass:[.17,.27,.13],alpine:[.14,.24,.14],sand:[.6,.49,.3]}[s]||[.17,.27,.13],e=s==="sand"?[.58,.46,.28]:[.34,.27,.17],n=wi(512,(i,r)=>{const o=de(i*14,r*60,4),a=de(i*6+4,r*22+8,3),c=Math.min(1,Math.abs(i-.5)*2.6),l=e[0]+o*.16,h=e[1]+o*.13,u=e[2]+o*.08,d=t[0]+a*.12,f=t[1]+a*.16,p=t[2]+a*.07,v=Va(.45,1,c);return[l*(1-v)+d*v,h*(1-v)+f*v,u*(1-v)+p*v]});return n.wrapS=n.wrapT=Ee,n.repeat.set(1,60),n.anisotropy=8,n.colorSpace=Qt,new Nt({map:n,roughness:.97,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function XM(){const s=wi(512,(t,e)=>{const n=de(t*40,e*40,4),i=1+.05*Math.sin(e*Math.PI*50),r=(.42+n*.2)*i;return[r*1.02,r*.95,r*.78]});return s.wrapS=s.wrapT=Ee,s.anisotropy=8,s.colorSpace=Qt,new Nt({map:s,roughness:1,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function qM(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d");t.fillStyle="#e02020",t.fillRect(0,0,64,64),t.fillStyle="#f9f9f9",t.fillRect(0,32,64,32);for(let n=0;n<180;n++){const i=Math.random()*64,r=Math.random()*64,o=Math.random()*.06;t.fillStyle=`rgba(0,0,0,${o})`,t.fillRect(i,r,1+Math.random()*2,1+Math.random()*2)}const e=new Oe(s);return e.wrapS=e.wrapT=Ee,e.repeat.set(1,1),e.colorSpace=Qt,e.generateMipmaps=!0,e.minFilter=rs,e.magFilter=Ke,e.anisotropy=8,new Nt({map:e,roughness:.48,metalness:0,envMapIntensity:.4,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function YM(){const s=document.createElement("canvas");s.width=256,s.height=32;const t=s.getContext("2d");for(let n=0;n<16;n++)for(let i=0;i<2;i++)t.fillStyle=(n+i)%2===0?"#ffffff":"#000000",t.fillRect(n*16,i*16,16,16);const e=new Oe(s);return e.colorSpace=Qt,e}function jM(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d");e.clearRect(0,0,512,512);const n=[];for(let r=0;r<220;r++){const o=Math.random()*Math.PI*2,a=Math.pow(Math.random(),.6)*512*.44;n.push({x:512/2+Math.cos(o)*a*1.05,y:512/2+Math.sin(o)*a*.88,r:9+Math.random()*28,hue:.29+(Math.random()-.5)*.08})}n.sort((r,o)=>o.y-r.y);for(const r of n){const o=r.y/512,a=Math.pow(1-o*.9,1.4),c=60+a*115,l=18+a*68+a*20,h=16+a*22,u=.88+Math.random()*.1,d=e.createRadialGradient(r.x,r.y-r.r*.4,r.r*.06,r.x,r.y,r.r*1.05);d.addColorStop(0,`rgba(${l+28|0},${Math.min(255,c+32|0)},${h+10|0},${u})`),d.addColorStop(.55,`rgba(${l|0},${c|0},${h|0},${u*.9})`),d.addColorStop(.85,`rgba(${l*.55|0},${c*.52|0},${h*.45|0},${u*.5})`),d.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=d,e.beginPath(),e.arc(r.x,r.y,r.r*1.05,0,Math.PI*2),e.fill()}const i=new Oe(t);return i.colorSpace=Qt,i}function KM(){const s=["VELOCE","APEX","NITRO","AERO","TORQUE","VORTEX","RACE1","FLUX"],t=["#e8e8ea","#101418","#c41e1e","#1e40af","#059669","#f5b301","#0891b2","#7c3aed"];return s.map((e,n)=>{const o=document.createElement("canvas");o.width=512,o.height=80;const a=o.getContext("2d");a.fillStyle=t[n%t.length],a.fillRect(0,0,512,80);const c=n%t.length===0||n%t.length===5?"#16181d":"#f4f6f8";a.fillStyle=c,a.beginPath(),a.moveTo(20,60),a.lineTo(50,18),a.lineTo(70,18),a.lineTo(40,60),a.closePath(),a.fill(),a.fillRect(58,18,14,42),a.font="bold 50px Arial Black, Arial",a.textBaseline="middle",a.fillText(e,100,44);const l=new Oe(o);return l.colorSpace=Qt,l.anisotropy=8,l})}function ZM(s){const n=document.createElement("canvas");n.width=2048,n.height=64;const i=n.getContext("2d");i.fillStyle="#15181d",i.fillRect(0,0,2048,64);for(const o of[0,1952])for(let a=0;a<6;a++)for(let c=0;c<4;c++)i.fillStyle=(a+c)%2?"#e8e8e8":"#15181d",i.fillRect(o+a*16,c*16,16,16);i.fillStyle="#e8eaee",i.font="bold 40px Arial Black, Arial",i.textAlign="center",i.textBaseline="middle",i.letterSpacing="14px",i.fillText(s,2048/2,64/2+2),i.fillStyle="#c41e1e",i.fillRect(2048/2-460,56,920,4);const r=new Oe(n);return r.colorSpace=Qt,r.anisotropy=8,r}function JM(s){const t=document.createElement("canvas");t.width=256,t.height=192;const e=t.getContext("2d");e.fillStyle="#f2f3f5",e.fillRect(0,0,256,192),e.strokeStyle="#c41e1e",e.lineWidth=14,e.strokeRect(7,7,242,178),e.fillStyle="#c41e1e",e.font="bold 104px Arial Black, Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(s,128,102);const n=new Oe(t);return n.colorSpace=Qt,n.anisotropy=8,n}function QM(){const e=document.createElement("canvas");e.width=512,e.height=256;const n=e.getContext("2d");n.clearRect(0,0,512,256);for(let r=0;r<18;r++){const o=256+(Math.random()-.5)*512*.65,a=256*.72+(Math.random()-.5)*256*.28,c=30+Math.random()*55,l=n.createRadialGradient(o,a,2,o,a,c),h=165+Math.random()*20;l.addColorStop(0,`rgba(${h-15},${h-10},${h+12},0.38)`),l.addColorStop(.6,`rgba(${h-20},${h-15},${h+8},0.18)`),l.addColorStop(1,"rgba(200,210,230,0)"),n.fillStyle=l,n.beginPath(),n.arc(o,a,c,0,Math.PI*2),n.fill()}for(let r=0;r<60;r++){const o=256+(Math.random()-.5)*512*.78,a=256*.5+(Math.random()-.5)*256*.46,c=14+Math.random()*38,l=n.createRadialGradient(o,a-c*.25,c*.05,o,a,c),h=240+Math.random()*15,u=Math.min(255,h+8),d=Math.min(255,h+2);l.addColorStop(0,`rgba(${u},${d},${h-5},0.68)`),l.addColorStop(.55,`rgba(${h},${h},${h+3},0.42)`),l.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=l,n.beginPath(),n.arc(o,a,c,0,Math.PI*2),n.fill()}const i=new Oe(e);return i.colorSpace=Qt,i}function Nr(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function Va(s,t,e){return e=Math.max(0,Math.min(1,(e-s)/(t-s))),e*e*(3-2*e)}function $M(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,r=t-n,o=Nr(e,n),a=Nr(e+1,n),c=Nr(e,n+1),l=Nr(e+1,n+1),h=Va(0,1,i),u=Va(0,1,r);return(o*(1-h)+a*h)*(1-u)+(c*(1-h)+l*h)*u}function de(s,t,e){let n=.5,i=1,r=0,o=0;for(let a=0;a<e;a++)r+=n*$M(s*i,t*i),o+=n,n*=.5,i*=2;return r/o}function wi(s,t){const e=document.createElement("canvas");e.width=s,e.height=s;const n=e.getContext("2d"),i=n.createImageData(s,s);for(let o=0;o<s;o++)for(let a=0;a<s;a++){const[c,l,h]=t(a/s,o/s),u=(o*s+a)*4;i.data[u]=Math.min(255,Math.max(0,c*255)),i.data[u+1]=Math.min(255,Math.max(0,l*255)),i.data[u+2]=Math.min(255,Math.max(0,h*255)),i.data[u+3]=255}n.putImageData(i,0,0);const r=new Oe(e);return r.needsUpdate=!0,r}function Mo(s,t){const e=new Float32Array(s*s);for(let a=0;a<s;a++)for(let c=0;c<s;c++)e[a*s+c]=de(c/s*8,a/s*8,4);const n=document.createElement("canvas");n.width=s,n.height=s;const i=n.getContext("2d"),r=i.createImageData(s,s);for(let a=0;a<s;a++)for(let c=0;c<s;c++){const l=e[a*s+(c-1+s)%s],h=e[a*s+(c+1)%s],u=e[(a-1+s)%s*s+c],d=e[(a+1)%s*s+c],f=(h-l)*t,p=(d-u)*t,v=-f,g=-p,m=1,x=Math.hypot(v,g,m),y=(a*s+c)*4;r.data[y]=(v/x*.5+.5)*255,r.data[y+1]=(g/x*.5+.5)*255,r.data[y+2]=(m/x*.5+.5)*255,r.data[y+3]=255}i.putImageData(r,0,0);const o=new Oe(n);return o.needsUpdate=!0,o}function tw(s,t,e={}){const n=e.type||"broadleaf",i=e.count||600,r=e.nearMin||35,o=e.band?e.band[1]:800;if(n==="pine"){ew(s,t,i,r,o);return}const a=new Nt({color:4008984,roughness:.96,metalness:0,envMapIntensity:.1}),c=new Nt({map:jM(),alphaTest:.38,roughness:.88,metalness:0,side:be,envMapIntensity:.2}),l=new me(.2,.4,3.2,8);l.translate(0,1.6,0);const h=new Fe(7.2,7.4);h.translate(0,3.7,0);const u=h.clone();u.rotateY(Math.PI/3);const d=h.clone();d.rotateY(2*Math.PI/3);const f=fc([h,u,d]);f.translate(0,2.4,0);const p=i,v=new Gn(l,a,p),g=new Gn(f,c,p);v.castShadow=v.receiveShadow=!0,g.castShadow=!0;const m=new ee,x=new en,y=new O,_=new It;let M=0;for(let S=0;S<p*4&&M<p;S++){const b=(Math.random()*2-1)*o,R=(Math.random()*2-1)*o,w=new O(b,0,R);let E=1/0;for(let I=0;I<t.length;I+=6){const F=w.distanceToSquared(t[I].pos);F<E&&(E=F)}if(E<r*r)continue;const U=.7+Math.random()*1;y.set(U,.8+Math.random()*.6,U),x.setFromEuler(new Wn(0,Math.random()*Math.PI*2,0)),m.compose(w,x,y),v.setMatrixAt(M,m),g.setMatrixAt(M,m),_.setHSL(.25+(Math.random()-.5)*.1,.4+Math.random()*.2,.34+Math.random()*.18),g.setColorAt(M,_),M++}v.count=M,g.count=M,v.instanceMatrix.needsUpdate=!0,g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),s.add(v),s.add(g)}function ew(s,t,e,n,i){const r=new Nt({color:4862754,roughness:.95,metalness:0,envMapIntensity:.1}),o=new Nt({color:16777215,roughness:.92,metalness:0,envMapIntensity:.16,flatShading:!0}),a=new ns(1.7,3,9);a.translate(0,2.6,0);const c=new ns(1.3,2.6,9);c.translate(0,4.1,0);const l=new ns(.8,2.2,9);l.translate(0,5.6,0);const h=fc([a,c,l]),u=new me(.16,.26,1.8,6);u.translate(0,.9,0);const d=e,f=new Gn(u,r,d),p=new Gn(h,o,d);f.castShadow=f.receiveShadow=!0,p.castShadow=!0;const v=new ee,g=new en,m=new O,x=new It;let y=0;for(let _=0;_<d*5&&y<d;_++){const M=(Math.random()*2-1)*i,S=(Math.random()*2-1)*i,b=new O(M,0,S);let R=1/0;for(let U=0;U<t.length;U+=6){const I=b.distanceToSquared(t[U].pos);I<R&&(R=I)}if(R<n*n)continue;const w=Math.sqrt(R);if(w>110&&Math.random()<(w-110)/Math.max(1,i-110)*.75)continue;const E=.8+Math.random()*1.5;m.set(E*(.7+Math.random()*.3),E,E*(.7+Math.random()*.3)),g.setFromEuler(new Wn(0,Math.random()*Math.PI*2,0)),v.compose(b,g,m),f.setMatrixAt(y,v),p.setMatrixAt(y,v),x.setHSL(.33+(Math.random()-.5)*.05,.36+Math.random()*.2,.17+Math.random()*.12),p.setColorAt(y,x),y++}f.count=y,p.count=y,f.instanceMatrix.needsUpdate=!0,p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0),s.add(f),s.add(p)}function nw(s,t="far"){const e=new Nt({vertexColors:!0,roughness:1,metalness:0,envMapIntensity:.25,fog:!0}),n={far:{haze:12174022,rock:7305348,forest:5464140,snow:14673646,bands:[[1450,650,15,230,300,.16,.3,!0],[2350,750,21,180,230,.4,.34,!0],[3300,900,27,130,170,.64,.28,!1]]},near:{haze:12898520,rock:7042176,forest:5003846,snow:15660024,bands:[[780,420,13,340,360,.1,.26,!0],[1450,600,19,270,300,.3,.3,!0],[2500,800,25,190,220,.55,.3,!1]]},mesa:{haze:13809548,rock:10246198,forest:9072712,snow:15325624,bands:[[1100,520,12,190,230,.14,.3,!1],[1950,700,18,150,190,.4,.32,!1],[2950,900,24,120,150,.62,.28,!1]]}},i=n[t]||n.far,r=new It(i.haze),o=new It(i.rock),a=new It(i.forest),c=new It(i.snow),l=new It,h=i.bands;for(let u=0;u<h.length;u++){const[d,f,p,v,g,m,x,y]=h[u];for(let _=0;_<p;_++){const M=d+Math.random()*f,S=_/p*Math.PI*2+(Math.random()-.5)*(Math.PI/p)*1.6,b=Math.cos(S)*M,R=Math.sin(S)*M,w=v+Math.random()*g,E=(250+Math.random()*300)*(1+u*.22),U=new ns(E,w,36,20),I=U.getAttribute("position"),F=[],C=u*31.7+_*7.13,D=Math.min(1,Math.max(0,(M-700)/2600));for(let q=0;q<I.count;q++){const k=I.getX(q),X=I.getY(q),Z=I.getZ(q),G=Math.atan2(Z,k),W=(X+w/2)/w,Y=de(G*2.2+C,C*.37,5),nt=1-Math.abs(Y*2-1),ht=de(G*6.5+C*1.7,W*4+C,4),dt=de(G*3.4+C*2.3,W*2+C,3),st=1-W*.35,vt=nt*1.02+ht*.58-dt*.42,xt=(.74+vt*.66)*st+.12;I.setX(q,k*xt),I.setZ(q,Z*xt),I.setY(q,X+(nt-.45)*w*.24+(ht-.5)*w*.1);const ft=.6+(1-nt)*.22+(ht-.5)*.08;y&&W>ft?l.copy(c):W<.2?l.copy(a).lerp(o,ht*.5):l.copy(o).lerp(a,Math.max(0,.34-W)*1.3),l.multiplyScalar(.84+vt*.2);const Mt=Math.min(.92,m+D*x);l.lerp(r,Mt),F.push(l.r,l.g,l.b)}U.setAttribute("color",new Jt(F,3)),U.computeVertexNormals();const N=new $(U,e);N.position.set(b,w/2-12,R),N.rotation.y=Math.random()*Math.PI,s.add(N)}}}function iw(s,t,e){const n=new Nt({color:10330534,roughness:.78,metalness:.12}),i=new Nt({color:3817287,roughness:.5,metalness:.6}),r=new Nt({color:13159374,roughness:.55,metalness:.25,side:be}),o=new Nt({color:5133146,roughness:.85,metalness:.1}),a=9,c=30,l=.62,h=1,u=[595,245,430],d=e.armco+4.5,f=new Rt(.34,.5,.3),p=a*44,v=new Gn(f,new Nt({roughness:.9,metalness:0}),p*u.length),g=new ee,m=new en,x=new O(1,1,1),y=new It;let _=0;for(const M of u){const S=t[M],b=S.pos.clone().add(S.left.clone().multiplyScalar(-d)),R=Math.atan2(S.left.x,S.left.z),w=new ae;for(let F=0;F<a;F++){const C=new $(new Rt(c,l,h),n);C.position.set(0,1.2+F*l+l/2,-F*h),C.castShadow=C.receiveShadow=!0,w.add(C)}const E=new $(new Rt(c,1.2,a*h+1),n);E.position.set(0,.6,-9/2+.5),E.castShadow=E.receiveShadow=!0,w.add(E);const U=new $(new Rt(c,1.2+a*l+1.4,.3),o);U.position.set(0,(1.2+a*l)/2+.5,-8.5*h-.3),U.castShadow=!0,w.add(U);for(const F of[-1,1]){const C=new $(new Rt(.3,1.2+a*l,a*h+1),o);C.position.set(F*(c/2+.15),(1.2+a*l)/2,-9/2+.5),w.add(C)}const I=new $(new Rt(c+1.5,.25,a*h+3),r);I.position.set(0,1.2+a*l+2.6,-9/2+1.2),I.rotation.x=.1,I.castShadow=!0,w.add(I);for(const F of[-c/2+2,-c/6,c/6,c/2-2]){const C=new $(new Rt(.35,a*l+3.6,.35),i);C.position.set(F,(a*l+3.6)/2+1.2,-8*h),C.castShadow=!0,w.add(C)}w.position.copy(b),w.rotation.y=R,s.add(w),m.setFromEuler(new Wn(0,R,0));for(let F=0;F<a;F++)for(let C=0;C<44;C++){if(Math.random()<.28)continue;const D=(C/43-.5)*(c-2),N=1.2+F*l+l+.25,q=-F*h+(Math.random()-.5)*.2,k=new O(D,N,q).applyQuaternion(m).add(b);g.compose(k,m,x),v.setMatrixAt(_,g),y.setHSL(Math.random(),.3+Math.random()*.3,.35+Math.random()*.22),v.setColorAt(_,y),_++}}v.count=_,v.instanceMatrix.needsUpdate=!0,v.instanceColor&&(v.instanceColor.needsUpdate=!0),v.castShadow=!1,s.add(v)}function sw(s,t){const e=new ae,n=new Nt({color:10198432,roughness:.85,metalness:.05}),i=new Nt({color:5593180,roughness:.9,metalness:.05}),r=new nn({color:2832711,roughness:.15,metalness:.8,envMapIntensity:1.2}),o=new Nt({color:2303531,roughness:.6,metalness:.4}),a=new Nt({color:789776,roughness:.95,metalness:0}),c=-45,l=100,h=l-c,u=(c+l)/2,d=new $(new Fe(11.5,h+10),i);d.rotation.x=-Math.PI/2,d.position.set(-20.5,.012,u),d.receiveShadow=!0,e.add(d);const f=new $(new Rt(.4,1,h),n);f.position.set(-14.6,.5,u),f.castShadow=f.receiveShadow=!0,e.add(f);const p=new $(new Rt(10,7.6,h),n);p.position.set(-31.5,3.8,u),p.castShadow=p.receiveShadow=!0,e.add(p);const v=12;for(let _=0;_<v;_++){const M=c+8+_*((h-16)/(v-1)),S=new $(new Fe(4.4,3.1),a);S.position.set(-26.44,1.65,M),S.rotation.y=Math.PI/2,e.add(S);const b=new $(new Rt(.15,.5,5.2),o);b.position.set(-26.5,3.5,M),e.add(b)}const g=new $(new Rt(.25,1.9,h-6),r);g.position.set(-26.35,5.6,u),e.add(g);for(let _=c+6;_<=l-6;_+=6){const M=new $(new Rt(.3,1.9,.16),o);M.position.set(-26.33,5.6,_),e.add(M)}const m=new $(new Rt(11,.3,h+2),o);m.position.set(-31.5,7.75,u),m.castShadow=!0,e.add(m);for(let _=c;_<=l;_+=4){const M=new $(new Rt(.08,.9,.08),o);M.position.set(-26.6,8.3,_),e.add(M)}const x=new $(new Rt(.1,.08,h),o);x.position.set(-26.6,8.72,u),e.add(x);for(const _ of[-20,20,60]){const M=new $(new Rt(6,2.6,9),n);M.position.set(-32.5,9.2,_),M.castShadow=!0,e.add(M);const S=new $(new Rt(.2,1.2,8),r);S.position.set(-29.45,9.4,_),e.add(S)}const y=new $(new Fe(h-10,1.15),new Nt({map:ZM("RACER GRAND PRIX"),roughness:.55,metalness:0}));y.position.set(-26.28,7.1,u),y.rotation.y=Math.PI/2,e.add(y),e.position.copy(t.pos),e.rotation.y=Math.atan2(t.tan.x,t.tan.z),s.add(e)}function rw(s,t,e){const n=new Nt({color:5067608,roughness:.6,metalness:.6}),i=new Nt({color:2895924,roughness:.8,metalness:.3,transparent:!0,opacity:.32,side:be,depthWrite:!1}),r=[];for(let d=0;d<t.length;d++){const f=t[d].pos;Math.abs(f.x)<6&&f.z>-55&&f.z<135&&r.push(d)}if(!r.length)return;const o=new Rt(.14,3.1,.14),a=new Gn(o,n,r.length*2),c=new ee,l=new en,h=new O(1,1,1);let u=0;for(const d of[1,-1]){const f=[],p=[];let v=0;for(let m=0;m<r.length;m++){const x=t[r[m]],y=x.pos.clone().add(x.left.clone().multiplyScalar(d*(e.armco+.45)));m%2===0&&(l.setFromEuler(new Wn(0,Math.atan2(x.tan.x,x.tan.z),0)),c.compose(new O(y.x,1.55,y.z),l,h),a.setMatrixAt(u++,c)),f.push(y.x,.85,y.z,y.x,3.05,y.z),m>0&&p.push(v-2,v,v-1,v-1,v,v+1),v+=2}const g=new oe;g.setAttribute("position",new te(new Float32Array(f),3)),g.setIndex(p),g.computeVertexNormals(),s.add(new $(g,i))}a.count=u,a.instanceMatrix.needsUpdate=!0,s.add(a)}function ow(s,t,e,n){const i=t.length,r=[];let o=0;for(;o<i;)if(e[o]>.0045){let c=o,l=0;for(;c<i&&e[c]>.002;)l=Math.max(l,e[c]),c++;c-o>6&&r.push({i0:o,peak:l}),o=c+10}else o++;r.sort((c,l)=>l.peak-c.peak);const a=new Nt({color:5922403,roughness:.7,metalness:.4});for(const c of r.slice(0,3)){const l=t[c.i0].tan,h=t[(c.i0+4)%i].tan,d=l.x*h.z-l.z*h.x>0?1:-1;for(const f of[100,50]){const p=Math.round(f/3.2),v=(c.i0-p+i)%i,g=t[v],m=g.pos.clone().add(g.left.clone().multiplyScalar(d*(n.armco-1.6))),x=Math.atan2(g.tan.x,g.tan.z),y=new $(new Fe(1.15,.85),new Nt({map:JM(String(f)),roughness:.5,metalness:0,side:be}));y.position.set(m.x,1.5,m.z),y.rotation.y=x,y.castShadow=!0,s.add(y);const _=new $(new Rt(.08,1.1,.08),a);_.position.set(m.x,.55,m.z),s.add(_)}}}function aw(s){const t=QM();for(let e=0;e<16;e++){const n=new wu({map:t,transparent:!0,opacity:.38+Math.random()*.35,fog:!1,depthWrite:!1}),i=new Ov(n),r=Math.random()*Math.PI*2,o=900+Math.random()*1800;i.position.set(Math.cos(r)*o,280+Math.random()*280,Math.sin(r)*o);const a=450+Math.random()*550,c=a*(.28+Math.random()*.14);i.scale.set(a,c,1),s.add(i)}}function cw(s,t){const e=Math.atan2(t.tan.x,t.tan.z),n=t.tan.clone().normalize(),i=t.left.clone().normalize(),r=2,o=4.6,a=7,c=2.5,l=4,h=new Nt({color:16777215,roughness:.7,metalness:0,transparent:!0,opacity:.7,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),u=new Nt({color:16767050,roughness:.7,metalness:0,transparent:!0,opacity:.85,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(let d=0;d<l;d++)for(const f of[1,-1]){const p=-2.8-d*a,v=c*f,g=t.pos.clone().add(n.clone().multiplyScalar(p)).add(i.clone().multiplyScalar(v)),m=lw(r,o,.14,h);m.position.set(g.x,.0135,g.z),m.rotation.y=-e,s.add(m);const x=new $(new Fe(r-.4,.22),u);x.rotation.x=-Math.PI/2;const y=g.clone().add(n.clone().multiplyScalar(o/2-.4));x.position.set(y.x,.014,y.z),x.rotation.z=-e,s.add(x)}}function lw(s,t,e,n){const i=new ae;for(const r of[-1,1]){const o=new $(new Fe(s,e),n);o.rotation.x=-Math.PI/2,o.position.z=r*(t/2-e/2),i.add(o)}for(const r of[-1,1]){const o=new $(new Fe(e,t),n);o.rotation.x=-Math.PI/2,o.position.x=r*(s/2-e/2),i.add(o)}return i}function hw(s,t,e){const n=Math.atan2(t.tan.x,t.tan.z),i=t.pos.clone().add(t.tan.clone().multiplyScalar(8)),r=new ae,o=new Nt({color:9343897,roughness:.4,metalness:.85}),a=new Nt({color:2303531,roughness:.55,metalness:.6}),c=8.6,l=e/2+2.6,h=l*2;for(const m of[-1,1]){for(const x of[-.35,.35])for(const y of[-.35,.35]){const _=new $(new Rt(.12,c,.12),o);_.position.set(m*l+x,c/2,y),_.castShadow=!0,r.add(_)}for(let x=1;x<c-.5;x+=1.4){const y=new $(new Rt(.08,1.1,.08),o);y.position.set(m*l,x,.35),y.rotation.z=.62,r.add(y);const _=y.clone();_.rotation.z=-.62,_.position.z=-.35,r.add(_)}}for(const m of[-.4,.4])for(const x of[-.4,.4]){const y=new $(new Rt(h+1,.12,.12),o);y.position.set(0,c+m,x),y.castShadow=!0,r.add(y)}const u=12;for(let m=0;m<u;m++){const x=-h/2+(m+.5)*(h/u);for(const y of[-.4,.4]){const _=new $(new Rt(.07,1.05,.07),o);_.position.set(x,c,y),_.rotation.z=(m%2?1:-1)*.75,r.add(_)}}const d=(()=>{const m=document.createElement("canvas");m.width=512,m.height=64;const x=m.getContext("2d");x.fillStyle="#101317",x.fillRect(0,0,512,64);for(let _=0;_<32;_++)for(let M=0;M<2;M++)(_+M)%2!==0&&(x.fillStyle="#e8e8e8",x.fillRect(_*16,M*16,16,16));x.fillStyle="#e8eaee",x.font="bold 26px Arial Black, Arial",x.textAlign="center",x.fillText("RACER GRAND PRIX",256,54);const y=new Oe(m);return y.colorSpace=Qt,y})(),f=new $(new Fe(h-2,1.1),new Nt({map:d,side:be,roughness:.6}));f.position.set(0,c-1,0),r.add(f);const p=new $(new Rt(2.3,.7,.4),a);p.position.set(0,c-2,0),p.castShadow=!0,r.add(p);const v=new Nt({color:3148043,emissive:16720688,emissiveIntensity:1.4,roughness:.35});for(let m=0;m<5;m++){const x=new $(new me(.13,.13,.1,14),v);x.rotation.x=Math.PI/2,x.position.set(-.88+m*.44,c-2,.22),r.add(x)}const g=new $(new Rt(.14,1.6,.14),a);g.position.set(0,c-1.2,0),r.add(g),r.position.copy(i),r.rotation.y=n,s.add(r)}function uw(s,t,e){const n=new Nt({color:11844289,roughness:.45,metalness:.85,side:be}),i=new Nt({color:6712435,roughness:.7,metalness:.5});for(const p of[1,-1]){const v=new $(dw(t,e*p),n);v.castShadow=!0,s.add(v)}const r=5,o=Math.floor(t.length/r)*2,a=new Rt(.22,.85,.16),c=new Gn(a,i,o);c.castShadow=!0,c.receiveShadow=!0;let l=0;const h=new ee,u=new en,d=new O(1,1,1),f=new O(0,1,0);for(let p=0;p<t.length;p+=r){const v=t[p],g=Math.atan2(v.tan.x,v.tan.z);u.setFromAxisAngle(f,g);for(const m of[1,-1]){const x=v.pos.clone().add(v.left.clone().multiplyScalar(e*m));x.y=.425,h.compose(x,u,d),c.setMatrixAt(l++,h)}}c.count=l,c.instanceMatrix.needsUpdate=!0,s.add(c)}function dw(s,t){const e=s.length,n=[],i=[],r=[],o=[],a=.4,c=.78,l=t>0?-1:1;for(let u=0;u<e;u++){const d=s[u],f=d.pos.clone().add(d.left.clone().multiplyScalar(t));n.push(f.x,a,f.z),n.push(f.x,c,f.z),r.push(0,u/8,1,u/8);const p=d.left.x*l,v=d.left.z*l;i.push(p,0,v,p,0,v)}for(let u=0;u<e;u++){const d=u*2,f=u*2+1,p=(u+1)%e*2,v=(u+1)%e*2+1;o.push(d,p,f,f,p,v)}const h=new oe;return h.setAttribute("position",new te(new Float32Array(n),3)),h.setAttribute("uv",new te(new Float32Array(r),2)),h.setAttribute("normal",new te(new Float32Array(i),3)),h.setIndex(o),h}function fw(s,t,e,n){const i=new Nt({color:1052688,roughness:.95,metalness:0}),r=new me(.42,.42,.32,14);r.rotateX(Math.PI/2);const o=[];let a=0,c=-50;for(let y=0;y<t.length;y++){if(y>0&&(a+=t[y].pos.distanceTo(t[y-1].pos)),e[y]<.0055||a-c<30)continue;const _=t[(y-1+t.length)%t.length].tan,M=t[(y+1)%t.length].tan,b=_.x*M.z-_.z*M.x>0?-1:1;o.push({frameIdx:y,sign:b}),c=a}const l=6,h=3,u=.86,d=o.length*l*h;if(d===0)return;const f=new Gn(r,i,d);f.castShadow=!0,f.receiveShadow=!0;const p=new ee,v=new en,g=new O(1,1,1),m=new O(0,1,0);let x=0;for(const y of o){const _=t[y.frameIdx],M=Math.atan2(_.tan.x,_.tan.z);v.setFromAxisAngle(m,M);const S=_.pos.clone().add(_.left.clone().multiplyScalar(y.sign*n));for(let b=0;b<l;b++){const R=(b-(l-1)/2)*u,w=S.clone().add(_.tan.clone().multiplyScalar(R));for(let E=0;E<h;E++){const U=new O(w.x,.21+E*.34,w.z);p.compose(U,v,g),f.setMatrixAt(x++,p)}}}f.count=x,f.instanceMatrix.needsUpdate=!0,s.add(f)}function pw(s,t,e){const i=KM().map(h=>new Nt({map:h,roughness:.5,metalness:.1})),r=new Nt({color:1776930,roughness:.6,metalness:.4}),o=new Rt(8,1.2,.16),a=new Rt(8.3,1.5,.1),l=Math.floor(t.length/22);for(let h=0;h<t.length;h+=l){if(Math.random()<.35)continue;const u=t[h],d=Math.random()<.5?1:-1,f=u.pos.clone().add(u.left.clone().multiplyScalar(d*e)),p=Math.atan2(u.tan.x,u.tan.z),v=i[Math.floor(Math.random()*i.length)],g=new $(o,v);g.position.set(f.x,1.55,f.z),g.rotation.y=p,g.castShadow=!0,g.receiveShadow=!0,s.add(g);const m=new $(a,r);m.position.set(f.x,1.55,f.z),m.rotation.y=p,m.translateZ(-.05),s.add(m);const x=new Nt({color:4473924,roughness:.7,metalness:.4});for(const y of[-3,3]){const _=new $(new Rt(.12,1.55,.12),x),M=new O(u.tan.x*y,0,u.tan.z*y);_.position.set(f.x+M.x,.75,f.z+M.z),_.rotation.y=Math.atan2(u.tan.x,u.tan.z),s.add(_)}}}function mw(s,t,e,n,i){const r=n.barrierMat,o=2,a=.6,c=1.9,l=.7,h=t.length,u=new pe,d=new T(0,1,0);for(const f of[1,-1]){const p=(e+a-.25)*f;for(let v=0;v<h;v+=o){const g=t[v],m=t[(v+o)%h],x=g.pos.x+g.left.x*p,y=g.pos.z+g.left.z*p,_=m.pos.x+m.left.x*p,M=m.pos.z+m.left.z*p,S=_-x,b=M-y,R=Math.hypot(S,b),w=new Ct({mass:0,material:r});w.addShape(new fs(new T(a,c,R/2+l))),w.position.set((x+_)/2,c-.3,(y+M)/2),u.setFromAxisAngle(d,Math.atan2(S,b)),w.quaternion.copy(u),s.addBody(w),i&&i.push(w)}}}function gw(s){if(s==="city")return vw();if(s==="sand")return xw();const t=WM();return s==="alpine"&&(t.color=new It(11453606)),t}function vw(){const s=wi(1024,(e,n)=>{const i=de(e*30,n*30,4),r=de(e*5+2,n*5+9,3),o=de(e*2+7,n*2+1,3),a=.205+i*.05+r*.05-o*.04;return[a*.99,a,a*1.04]});s.wrapS=s.wrapT=Ee,s.repeat.set(60,60),s.anisotropy=8,s.colorSpace=Qt;const t=Mo(256,1.1);return t.wrapS=t.wrapT=Ee,t.repeat.set(120,120),new Nt({map:s,normalMap:t,normalScale:new et(.3,.3),roughness:.9,metalness:0,envMapIntensity:.4,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function xw(){const s=wi(1024,(e,n)=>{const i=de(e*40,n*40,4),r=de(e*3+5,n*3+2,3),o=.5+.5*Math.sin(n*Math.PI*58+r*6);let a=.52+i*.1+r*.1;return a*=.97+.05*o,[a*1.08,a*.93,a*.66]});s.wrapS=s.wrapT=Ee,s.repeat.set(50,50),s.anisotropy=8,s.colorSpace=Qt;const t=Mo(256,1);return t.wrapS=t.wrapT=Ee,t.repeat.set(90,90),new Nt({map:s,normalMap:t,normalScale:new et(.4,.4),roughness:.98,metalness:0,envMapIntensity:.35,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function yw(s,t,e){const n=new Nt({color:14211282,roughness:.85,metalness:.02,side:be,envMapIntensity:.3}),i=new Nt({color:12591146,roughness:.6,metalness:0,side:be});for(const r of[1,-1]){const o=new $(Eh(t,e*r,0,1.05),n);o.castShadow=!0,o.receiveShadow=!0,s.add(o);const a=new $(Eh(t,e*r,1.02,1.2),i);s.add(a)}}function Eh(s,t,e,n){const i=s.length,r=[],o=[],a=[],c=[],l=t>0?-1:1;for(let u=0;u<i;u++){const d=s[u],f=d.pos.clone().add(d.left.clone().multiplyScalar(t));r.push(f.x,e,f.z,f.x,n,f.z),a.push(0,u/8,1,u/8);const p=d.left.x*l,v=d.left.z*l;o.push(p,0,v,p,0,v)}for(let u=0;u<i;u++){const d=u*2,f=u*2+1,p=(u+1)%i*2,v=(u+1)%i*2+1;c.push(d,p,f,f,p,v)}const h=new oe;return h.setAttribute("position",new te(new Float32Array(r),3)),h.setAttribute("uv",new te(new Float32Array(a),2)),h.setAttribute("normal",new te(new Float32Array(o),3)),h.setIndex(c),h}function _w(s,t,e){const r=document.createElement("canvas");r.width=128,r.height=256;const o=r.getContext("2d");o.fillStyle=e||"#2a2f38",o.fillRect(0,0,128,256);const a=128/s,c=256/t;for(let h=0;h<t;h++)for(let u=0;u<s;u++){const d=Math.random();let f;d>.6?f=`rgb(255,${200+Math.random()*45|0},${135+Math.random()*60|0})`:d>.46?f=`rgb(${95+Math.random()*40|0},${120+Math.random()*40|0},${150+Math.random()*50|0})`:f="rgb(16,20,26)",o.fillStyle=f,o.fillRect(u*a+a*.16,h*c+c*.16,a*.68,c*.62)}const l=new Oe(r);return l.colorSpace=Qt,l.wrapS=l.wrapT=Ee,l.anisotropy=8,l}function Mw(s,t,e){const i=["#262b34","#2e2a2a","#222a30","#30303a","#283034","#2b2622"].map(c=>_w(6,8,c)),r=new Nt({color:1777445,roughness:.8,metalness:.25}),o=t.length,a=Math.max(6,Math.floor(o/50));for(let c=0;c<o;c+=a)for(const l of[1,-1]){if(Math.random()<.3)continue;const h=t[c],u=12+Math.random()*24,d=16+Math.random()*30,f=18+Math.random()*66,p=e.armco+6+Math.random()*24+u/2,v=h.pos.clone().add(h.left.clone().multiplyScalar(l*p)),g=Math.atan2(h.tan.x,h.tan.z),m=new Rt(d,f,u);m.translate(0,f/2,0);const x=m.getAttribute("uv"),y=Math.max(2,Math.round(d/6)),_=Math.max(3,Math.round(f/4));for(let E=0;E<x.count;E++)x.setXY(E,x.getX(E)*y,x.getY(E)*_);const M=i[Math.random()*i.length|0],S=new Nt({map:M,emissive:16773336,emissiveMap:M,emissiveIntensity:.5,roughness:.55,metalness:.2,envMapIntensity:.6}),b=new ae,R=new $(m,S);R.castShadow=!0,R.receiveShadow=!0,b.add(R);const w=new $(new Rt(d+.4,1.3,u+.4),r);w.position.y=f,w.castShadow=!0,b.add(w),b.position.copy(v),b.rotation.y=g,s.add(b)}}function ww(s,t,e){const n=new cc(1,0).toNonIndexed(),i=n.getAttribute("position");for(let m=0;m<i.count;m++){const x=(de(i.getX(m)*1.7+3,i.getZ(m)*1.7+1,3)-.5)*.7;i.setXYZ(m,i.getX(m)*(1+x),i.getY(m)*(1+x*.6),i.getZ(m)*(1+x))}n.computeVertexNormals();const r=new Nt({roughness:.96,metalness:0,flatShading:!0,envMapIntensity:.3}),o=150,a=new Gn(n,r,o);a.castShadow=!0,a.receiveShadow=!0;const c=new ee,l=new en,h=new O,u=new Wn,d=new It,f=440;let p=0;for(let m=0;m<o*5&&p<o;m++){const x=(Math.random()*2-1)*f,y=(Math.random()*2-1)*f,_=new O(x,0,y);let M=1/0;for(let R=0;R<t.length;R+=6){const w=_.distanceToSquared(t[R].pos);w<M&&(M=w)}if(M<(e.armco+5)*(e.armco+5))continue;const S=Math.sqrt(M);if(S>120&&Math.random()<(S-120)/(f-120)*.6)continue;const b=1+Math.random()*4.5;h.set(b*(.8+Math.random()*.6),b*(.5+Math.random()*.7),b*(.8+Math.random()*.6)),u.set((Math.random()-.5)*.5,Math.random()*Math.PI*2,(Math.random()-.5)*.5),l.setFromEuler(u),_.y=-.3*b,c.compose(_,l,h),a.setMatrixAt(p,c),d.setHSL(.045+Math.random()*.03,.45+Math.random()*.18,.3+Math.random()*.12),a.setColorAt(p,d),p++}a.count=p,a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),s.add(a);const v=new Nt({vertexColors:!0,roughness:.97,metalness:0,envMapIntensity:.3}),g=[new It(9062956),new It(11101754),new It(12618325)];for(let m=0;m<7;m++){const x=m/7*Math.PI*2+(Math.random()-.5)*.6,y=240+Math.random()*260,_=60+Math.random()*90,M=26+Math.random()*30,S=new me(M,M*1.5,_,18,6),b=S.getAttribute("position"),R=[],w=new It;for(let U=0;U<b.count;U++){const I=(b.getY(U)+_/2)/_,F=Math.atan2(b.getZ(U),b.getX(U)),C=.9+de(F*2.5+m,I*3,3)*.22;b.setX(U,b.getX(U)*C),b.setZ(U,b.getZ(U)*C);const D=Math.max(0,Math.min(g.length-1,Math.floor(I*g.length+de(F*4,I*6,2)*.6))),N=g[D];w.copy(N).multiplyScalar(.85+I*.2),R.push(w.r,w.g,w.b)}S.setAttribute("color",new Jt(R,3)),S.computeVertexNormals();const E=new $(S,v);E.position.set(Math.cos(x)*y,_/2-4,Math.sin(x)*y),E.castShadow=!0,E.receiveShadow=!0,s.add(E)}}function Sw(s,t,e=3){const n=[];n.push([s,0],[s,t]);for(let i=1;i<=e;i++){const r=i/(e+1)*Math.PI;n.push([Math.cos(r)*s,t+Math.sin(r)*s])}n.push([-s,t],[-s,0],[-s,-t]);for(let i=1;i<=e;i++){const r=Math.PI+i/(e+1)*Math.PI;n.push([Math.cos(r)*s,-t+Math.sin(r)*s])}return n.push([s,-t]),n}function bw(s,t,e,n,i=0,r=0,o=0){const a=[];for(let c=0;c<n;c++){const h=c/n*Math.PI*2+i,u=s+t*Math.sin(e*h);a.push([r+Math.cos(h)*u,o+Math.sin(h)*u])}return a}const Xa=[{id:"gp",name:"AUTODROMO",subtitle:"GRAND PRIX CIRCUIT",difficulty:"MEDIUM",blurb:"The full GT circuit: fast sweeps, heavy braking zones, gravel and grandstands.",roadWidth:14,kerbWidth:2,runoffWidth:5.5,closed:!0,tension:.5,controlPoints:[[0,0],[0,140],[10,240],[90,290],[200,290],[280,240],[300,150],[240,90],[180,60],[200,-20],[280,-80],[300,-160],[240,-220],[120,-240],[0,-220],[-90,-180],[-160,-115],[-115,-85],[-50,-105],[0,-110],[0,-55]],theme:{ground:"grass",fog:[13155238,900,4200],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!0,catchFence:!0,grandstands:!0,sponsors:!0,tireStacks:!0,brakeMarkers:!0,trees:{type:"broadleaf",count:600},mountains:"far",clouds:!0}},{id:"sprint",name:"SUNSET SPEEDWAY",subtitle:"CLUB OVAL",difficulty:"EASY",blurb:"Wide open D-oval. Two gentle sweepers, acres of run-off — flat out and friendly.",roadWidth:20,kerbWidth:2.2,runoffWidth:9,closed:!0,tension:.5,controlPoints:Sw(135,120,3),theme:{ground:"grass",fog:[13155238,1e3,4400],barrier:"armco",kerbs:!0,gravel:!1,skid:!0,pit:!0,catchFence:!1,grandstands:!0,sponsors:!0,tireStacks:!1,brakeMarkers:!1,trees:{type:"broadleaf",count:420},mountains:"far",clouds:!0}},{id:"downtown",name:"MARINA STREET",subtitle:"CITY GRAND PRIX",difficulty:"HARD",blurb:"A street fight between the barriers: square corners, a snap chicane, zero room for error.",roadWidth:12,kerbWidth:1.1,runoffWidth:1.3,closed:!0,tension:.5,controlPoints:[[0,0],[0,60],[0,150],[18,184],[70,198],[170,198],[202,180],[214,130],[214,44],[196,10],[216,-24],[214,-54],[214,-118],[196,-150],[150,-166],[40,-166],[4,-150],[0,-108],[0,-60]],theme:{ground:"city",fog:[12041412,650,3200],barrier:"wall",kerbs:!0,gravel:!1,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!0,tireStacks:!0,brakeMarkers:!0,trees:!1,buildings:!0,mountains:!1,clouds:!0}},{id:"alpine",name:"COL DU PIN",subtitle:"MOUNTAIN PASS",difficulty:"MEDIUM-HARD",blurb:"A flowing pass through the pines: linked esses, blind crests of rock, guardrail close.",roadWidth:13,kerbWidth:1.6,runoffWidth:3,closed:!0,tension:.5,controlPoints:bw(180,48,3,22,2.09),theme:{ground:"alpine",fog:[13424349,680,3400],barrier:"guardrail",kerbs:!0,gravel:!1,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!1,tireStacks:!1,brakeMarkers:!0,trees:{type:"pine",count:900,nearMin:22,band:[22,360]},mountains:"near",clouds:!0}},{id:"dunes",name:"RED MESA",subtitle:"CANYON SPEEDWAY",difficulty:"MEDIUM",blurb:"Wide desert speedway: long flat-out straights, one sandy ess, mesas on the horizon.",roadWidth:16,kerbWidth:2,runoffWidth:6.5,closed:!0,tension:.5,controlPoints:[[0,-168],[70,-166],[120,-158],[165,-120],[180,-55],[168,35],[128,110],[60,178],[-20,196],[-95,168],[-160,110],[-176,35],[-150,-20],[-182,-70],[-150,-118],[-120,-150],[-60,-168]],theme:{ground:"sand",fog:[14271643,850,4400],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!0,tireStacks:!1,brakeMarkers:!0,trees:!1,mountains:"mesa",rocks:!0,clouds:!0}}],Th="gp";function Ew(s){return Xa.find(t=>t.id===s)||Xa[0]}function Tw(s,t,e,n,i){const r=i*i,o=r*i;return .5*(2*t+(-s+e)*i+(2*s-5*t+4*e-n)*r+(-s+3*t-3*e+n)*o)}function cn(s,t,e){const n=s.length,i=Math.min(n-2,Math.floor(e)),r=e-i,o=s[Math.max(0,i-1)][t],a=s[i][t],c=s[i+1][t],l=s[Math.min(n-1,i+2)][t];return Tw(o,a,c,l,r)}function Vu(s,t){const e=s.hw,n=s.yb,i=s.hip,r=s.yt,o=s.topW,a=[new et(0,n),new et(e*.78,n+.015),new et(e,i),new et(e*.93,i+(r-i)*.32),new et(o+(e-o)*.22,r-(r-i)*.14),new et(o,r-.012),new et(0,r)],l=new sc(a).getPoints(t-1);for(const h of l)h.x<0&&(h.x=0);return l[0].x=0,l[t-1].x=0,l}function Aw(s,t={}){const e=t.ringsPerSegment??8,n=t.profilePoints??14,i=2*(n-1),r=t.capEnds??!0,o=s.length-1,a=o*e,c=[],l=[],h=[];for(let p=0;p<=a;p++){const v=p/a*o,g={z:cn(s,"z",v),hw:cn(s,"hw",v),yb:cn(s,"yb",v),hip:cn(s,"hip",v),yt:cn(s,"yt",v),topW:cn(s,"topW",v)};h.push(g.z);const m=Vu(g,n),x=p/a;for(let y=0;y<n;y++)c.push(m[y].x,m[y].y,g.z),l.push(y/i,x);for(let y=n-2;y>=1;y--)c.push(-m[y].x,m[y].y,g.z),l.push((2*(n-1)-y)/i,x)}const u=[],d=p=>p*i;for(let p=0;p<a;p++){const v=d(p),g=d(p+1);for(let m=0;m<i;m++){const x=(m+1)%i,y=v+m,_=v+x,M=g+m,S=g+x;u.push(y,S,M),u.push(y,_,S)}}if(r){const p=(v,g)=>{let m=0,x=0;for(let M=0;M<i;M++)m+=c[(d(v)+M)*3],x+=c[(d(v)+M)*3+1];m/=i,x/=i;const y=h[v],_=c.length/3;c.push(m,x,y),l.push(.5,g?1:0);for(let M=0;M<i;M++){const S=(M+1)%i,b=d(v)+M,R=d(v)+S;g?u.push(_,b,R):u.push(_,R,b)}};p(0,!1),p(a,!0)}const f=new oe;return f.setAttribute("position",new Jt(c,3)),f.setAttribute("uv",new Jt(l,2)),f.setIndex(u),f.computeVertexNormals(),f.setAttribute("uv2",new Jt(l,2)),f.computeBoundingBox(),f.computeBoundingSphere(),f}function Xu(s,t={}){const e=t.profilePoints??14,n=t.beltFrac??.6,i=Math.round(n*(e-1)),r=t.zStart,o=t.zEnd,a=t.steps??24,c=t.inset??.012,l=s.length-1,h=m=>cn(s,"z",m),u=m=>{let x=0,y=l;for(let _=0;_<36;_++){const M=(x+y)/2;h(M)<m?x=M:y=M}return(x+y)/2},d=[],f=[];let p=0;for(let m=0;m<=a;m++){const x=r+(o-r)*(m/a),y=u(x),_={hw:cn(s,"hw",y),yb:cn(s,"yb",y),hip:cn(s,"hip",y),yt:cn(s,"yt",y),topW:cn(s,"topW",y)},M=Vu(_,e),S=[];for(let b=i;b<=e-1;b++)S.push(M[b]);for(let b=e-2;b>=i;b--)S.push(new et(-M[b].x,M[b].y));p=S.length;for(let b=0;b<p;b++){const R=S[b].x*(1-c*1.5),w=S[b].y-c;d.push(R,w,x),f.push(b/(p-1),m/a)}}const v=[];for(let m=0;m<a;m++)for(let x=0;x<p-1;x++){const y=m*p+x,_=m*p+x+1,M=(m+1)*p+x,S=(m+1)*p+x+1;v.push(y,M,S,y,S,_)}const g=new oe;return g.setAttribute("position",new Jt(d,3)),g.setAttribute("uv",new Jt(f,2)),g.setIndex(v),g.computeVertexNormals(),g}function $i(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function Ah(s){return s=Math.max(0,Math.min(1,s)),s*s*(3-2*s)}function Cw(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,r=t-n,o=$i(e,n),a=$i(e+1,n),c=$i(e,n+1),l=$i(e+1,n+1),h=Ah(i),u=Ah(r);return(o*(1-h)+a*h)*(1-u)+(c*(1-h)+l*h)*u}function qu(s,t,e=4){let n=.5,i=1,r=0,o=0;for(let a=0;a<e;a++)r+=n*Cw(s*i,t*i),o+=n,n*=.5,i*=2;return r/o}function wo(s,t,e){const n=new Float32Array(s*s);for(let c=0;c<s;c++)for(let l=0;l<s;l++)n[c*s+l]=t(l/s,c/s);const i=document.createElement("canvas");i.width=s,i.height=s;const r=i.getContext("2d"),o=r.createImageData(s,s);for(let c=0;c<s;c++)for(let l=0;l<s;l++){const h=n[c*s+(l-1+s)%s],u=n[c*s+(l+1)%s],d=n[(c-1+s)%s*s+l],f=n[(c+1)%s*s+l];let p=(h-u)*e,v=(d-f)*e,g=1;const m=Math.hypot(p,v,g)||1;p/=m,v/=m,g/=m;const x=(c*s+l)*4;o.data[x]=(p*.5+.5)*255,o.data[x+1]=(v*.5+.5)*255,o.data[x+2]=(g*.5+.5)*255,o.data[x+3]=255}r.putImageData(o,0,0);const a=new Oe(i);return a.wrapS=a.wrapT=Ee,a.needsUpdate=!0,a}let hi=null;function Rw(){if(hi)return hi;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let r=0;r<s;r++){const o=$i(r*1,i*1)*Math.PI*2,a=$i(r*1.7+4.2,i*2.3+1.1)*.5,c=Math.cos(o)*a*.35,l=Math.sin(o)*a*.35,h=Math.sqrt(Math.max(1e-4,1-c*c-l*l)),u=(i*s+r)*4;n.data[u]=(c*.5+.5)*255,n.data[u+1]=(l*.5+.5)*255,n.data[u+2]=(h*.5+.5)*255,n.data[u+3]=255}return e.putImageData(n,0,0),hi=new Oe(t),hi.wrapS=hi.wrapT=Ee,hi.needsUpdate=!0,hi}let Ur=null;function Pw(){return Ur||(Ur=wo(128,(s,t)=>qu(s*14,t*14,3),.6),Ur)}let Cs=null;function Lw(){return Cs||(Cs=wo(128,(s,t)=>{const n=s*8,i=t*8,r=Math.floor(n),o=Math.floor(i),a=n-r,c=i-o,l=(r+o)%2===0;return .35+Math.sin(l?a*Math.PI:c*Math.PI)*.65},1.4),Cs.repeat.set(1,1),Cs)}let Rs=null;function Iw(){return Rs||(Rs=wo(128,(s,t)=>{const e=Math.sin(t*Math.PI*26)>.4?0:1,n=Math.sin(s*Math.PI*8)*.15;return e*.8+n+.1},1.6),Rs.repeat.set(1,1),Rs)}let ui=null;function Dw(){if(ui)return ui;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let r=0;r<s;r++){const a=.2+qu(r/s*18,i/s*18,3)*.16,c=(i*s+r)*4;n.data[c]=n.data[c+1]=n.data[c+2]=a*255,n.data[c+3]=255}return e.putImageData(n,0,0),ui=new Oe(t),ui.wrapS=ui.wrapT=Ee,ui.needsUpdate=!0,ui}let Fr=null;function Nw(){return Fr||(Fr=wo(128,(s,t)=>{const i=Math.floor(t*9)%2*.5,r=(s*9+i)%1-.5,o=t*9%1-.5;return Math.hypot(r,o)<.34?0:1},1.8),Fr)}function Uw(s="GT 0142"){const t=document.createElement("canvas");t.width=256,t.height=80;const e=t.getContext("2d");e.fillStyle="#f2f3ea",e.fillRect(0,0,256,80),e.fillStyle="#1d3a8a",e.fillRect(0,0,30,80),e.fillStyle="#ffcb05",e.beginPath(),e.arc(15,22,4,0,Math.PI*2),e.fill(),e.fillStyle="#111417",e.font="bold 52px Arial",e.textBaseline="middle",e.fillText(s,44,44);const n=new Oe(t);return n.colorSpace=Qt,n.anisotropy=8,n}let Ps=null;function Fw(){if(Ps)return Ps;const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,50,8,64,64,64);return e.addColorStop(0,"#fdfdff"),e.addColorStop(1,"#8b9099"),t.fillStyle=e,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.fill(),t.strokeStyle="#3a3f47",t.lineWidth=5,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.stroke(),t.fillStyle="#1b1e24",t.font="bold 56px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText("R",64,66),Ps=new Oe(s),Ps.colorSpace=Qt,Ps}const va=new Map;function Ow(s){const t=new It(s),e={};return t.getHSL(e),e.s=Math.min(1,e.s*1),e.l=e.l*.6,t.setHSL(e.h,e.s,e.l),t}function So(s){if(va.has(s))return va.get(s);const t=Rw();t.repeat.set(10,22);const e=new nn({color:Ow(s),metalness:.22,roughness:.36,roughnessMap:Dw(),clearcoat:1,clearcoatRoughness:.05,clearcoatNormalMap:Pw(),clearcoatNormalScale:new et(.05,.05),normalMap:t,normalScale:new et(.11,.11),envMapIntensity:1.35});return va.set(s,e),e}let Or=null;function ni(){return Or||(Or=new nn({color:789776,metalness:.3,roughness:.55,clearcoat:.4}),Or)}let zr=null;function Hn(){if(zr)return zr;const s=Lw();return s.repeat.set(5,5),zr=new nn({color:1119258,metalness:.5,roughness:.38,clearcoat:.75,clearcoatRoughness:.14,normalMap:s,normalScale:new et(.7,.7),envMapIntensity:1.1}),zr}let Br=null;function Yu(){return Br||(Br=new nn({color:661026,metalness:0,roughness:.03,transmission:.25,thickness:.35,ior:1.52,envMapIntensity:1.6,clearcoat:1,clearcoatRoughness:.02,transparent:!0,opacity:.86,side:be,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),Br)}let kr=null;function bo(){return kr||(kr=new nn({color:15922680,metalness:1,roughness:.05,envMapIntensity:1.8}),kr)}let Gr=null;function zw(){if(Gr)return Gr;const s=Iw();return s.repeat.set(8,1),Gr=new nn({color:526345,roughness:.9,metalness:0,sheen:.4,sheenRoughness:.45,normalMap:s,normalScale:new et(.75,.75)}),Gr}let Hr=null;function Bw(){return Hr||(Hr=new nn({color:855311,roughness:.78,metalness:0,sheen:.3}),Hr)}let Wr=null;function kw(){return Wr||(Wr=new nn({color:13488858,metalness:1,roughness:.18,clearcoat:.65,clearcoatRoughness:.08,envMapIntensity:1.5}),Wr)}let Vr=null;function qa(){return Vr||(Vr=new nn({color:1711136,metalness:.9,roughness:.35}),Vr)}let Xr=null;function Gw(){return Xr||(Xr=new Nt({color:3817028,metalness:1,roughness:.45}),Xr)}let qr=null;function Hw(){return qr||(qr=new Nt({color:13114910,metalness:.4,roughness:.35}),qr)}let Yr=null;function Ww(){return Yr||(Yr=new Nt({color:15657696,emissive:16775400,emissiveIntensity:1.1,roughness:.18,metalness:0}),Yr)}let jr=null;function Vw(){return jr||(jr=new nn({color:16777215,metalness:0,roughness:.06,transmission:.9,thickness:.05,ior:1.45,transparent:!0,opacity:.4,envMapIntensity:1.2}),jr)}function ju(){return new Nt({color:4852236,emissive:16716834,emissiveIntensity:.6,roughness:.3,metalness:0,transparent:!0,opacity:.7})}let Kr=null;function Xw(){if(Kr)return Kr;const s=Nw();return s.repeat.set(2,1),Kr=new Nt({color:1053206,metalness:.8,roughness:.5,normalMap:s,normalScale:new et(1,1)}),Kr}function qw(s,t){let e=s.index?s.toNonIndexed():s.clone();if(e.applyMatrix4(t),!e.getAttribute("uv")){const n=e.getAttribute("position").count;e.setAttribute("uv",new Jt(new Float32Array(n*2),2))}for(const n of Object.keys(e.attributes))n!=="position"&&n!=="normal"&&n!=="uv"&&e.deleteAttribute(n);return e.getAttribute("normal")||e.computeVertexNormals(),e}function Ku(s){s.updateMatrixWorld(!0);const t=new ee().copy(s.matrixWorld).invert(),e=new Map,n=[];s.traverse(i=>{if(!i.isMesh||i.userData.noMerge||i.material.transparent)return;const r=i.material;e.has(r)||e.set(r,{geos:[],cast:!1,receive:!1});const o=e.get(r),a=new ee().multiplyMatrices(t,i.matrixWorld);o.geos.push(qw(i.geometry,a)),o.cast=o.cast||i.castShadow,o.receive=o.receive||i.receiveShadow,n.push(i)});for(const i of n)i.parent&&i.parent.remove(i);for(const[i,r]of e){if(!r.geos.length)continue;const o=r.geos.length===1?r.geos[0]:fc(r.geos,!1);if(!o)continue;const a=new $(o,i);a.castShadow=r.cast,a.receiveShadow=r.receive,s.add(a)}return s}const xa=.36,ji=.28,io=.235,ya=new Map,Ch={gt:{spokes:5,twin:!0,spokeW:.045,rim:"bright"},muscle:{spokes:5,twin:!1,spokeW:.085,rim:"bright"},openWheel:{spokes:10,twin:!1,spokeW:.03,rim:"dark"}};function Yw(s){const t=new ae,e=s.rim==="dark"?qa():kw(),n=new Rt(s.spokeW,.175,.028);n.translate(0,.145,0);const i=s.spokes;for(let l=0;l<i;l++){const h=l/i*Math.PI*2;if(s.twin)for(const u of[-.05,.05]){const d=new $(n,e);d.rotation.x=h,d.position.set(0,0,0),d.rotation.z=0,d.translateOnAxis(new O(1,0,0),0),d.rotation.x=h+u,t.add(d)}else{const u=new $(n,e);u.rotation.x=h,t.add(u)}}const r=new $(new Ys(io-.005,.02,10,40),e);r.rotation.y=Math.PI/2,t.add(r);const o=new $(new me(.07,.07,.04,20),e);o.rotation.z=Math.PI/2,t.add(o);const a=new $(new me(.045,.045,.05,18),bo());a.rotation.z=Math.PI/2,t.add(a);const c=new me(.014,.014,.03,6);for(let l=0;l<5;l++){const h=l/5*Math.PI*2,u=new $(c,qa());u.rotation.z=Math.PI/2,u.position.set(0,Math.cos(h)*.085,Math.sin(h)*.085),t.add(u)}return t}function jw(s){const t=Ch[s]??Ch.gt,e=Kw(s,t);return Ku(e)}function Kw(s,t){const e=new ae,n=new me(xa,xa,ji,30,1,!0);n.rotateZ(Math.PI/2);const i=new $(n,zw());i.castShadow=!0,e.add(i);for(const l of[-ji/2,ji/2]){const h=new $(new lc(io-.01,xa-.005,30),Bw());h.rotation.y=Math.PI/2,h.position.x=l,h.scale.x=l<0?-1:1,e.add(h)}const r=new $(new me(io,io,ji*.92,24,1,!0),qa());r.rotateZ(Math.PI/2),e.add(r);const o=new $(new me(.205,.205,.028,24),Gw());o.rotateZ(Math.PI/2),e.add(o);const a=new $(new Rt(.07,.1,.13),Hw());a.position.set(0,.17,.02),e.add(a);const c=Yw(t);for(const l of[-ji/2+.02,ji/2-.02]){const h=c.clone();h.position.x=l,e.add(h)}return e}function Zw(s="gt"){return ya.has(s)||ya.set(s,jw(s)),ya.get(s).clone()}function Zu({z:s=1.92,y:t=.64,x:e=.6}={}){const n=new ae,i=ni(),r=Vw(),o=Ww();for(const a of[-1,1]){const c=new ae,l=new $(new Rt(.44,.13,.12),i);c.add(l);const h=new $(new me(.045,.05,.07,16),o);h.rotation.x=Math.PI/2,h.position.set(-a*.1,-.005,.055),c.add(h);const u=new $(new Ys(.052,.012,8,18),i);u.position.set(-a*.1,-.005,.088),c.add(u);const d=new $(new Rt(.38,.018,.02),o);d.position.set(0,.048,.055),d.rotation.z=a*.06,c.add(d);const f=new $(new Rt(.45,.15,.035),r);f.position.z=.075,c.add(f),c.position.set(a*e,t,s),c.rotation.y=a>0?-.32:.32,c.rotation.x=-.12,n.add(c)}return n}function Ju({z:s=-2.04,y:t=.74,width:e=1.5}={}){const n=new ae,i=new $(new Rt(e+.06,.16,.1),ni());i.position.set(0,t,s+.02),n.add(i);const r=ju(),o=new $(new Rt(e,.09,.05),r);o.position.set(0,t,s-.02),o.userData.noMerge=!0,n.add(o);for(const a of[-1,1]){const c=new $(new me(.05,.05,.12,16),r);c.rotation.z=Math.PI/2,c.position.set(a*(e/2-.02),t,s-.02),n.add(c)}return{group:n,brakeMesh:o}}function Qu({z:s=.5,y:t=.98,x:e=.95,color:n=13112861}={}){const i=new ae,r=So(n),o=new nn({color:9080985,metalness:1,roughness:.03});for(const a of[-1,1]){const c=new ae,l=new $(new me(.018,.03,.16,10),Hn());l.rotation.z=a*.9,l.position.set(a*.08,.02,0),c.add(l);const h=new $(new Vs(.09,14,10),r);h.scale.set(1.1,.7,.7),h.position.set(a*.17,.05,0),c.add(h);const u=new $(new rc(.06,14),o);u.position.set(a*.18,.05,-.06),u.rotation.y=Math.PI,c.add(u),c.position.set(a*e,t,s),i.add(c)}return i}function $u({z:s=2.02,y:t=.44,w:e=.9,h:n=.22}={}){const i=new ae,r=new $(new Fe(e,n),Xw());r.position.set(0,t,s),i.add(r);const o=new $(new Rt(e+.08,n+.06,.05),ni());return o.position.set(0,t,s-.03),i.add(o),i}function td({z:s=1.98,y:t=.28,w:e=1.95}={}){const n=new ae,i=new $(new Rt(e,.05,.34),Hn());i.position.set(0,t,s),i.castShadow=!0,n.add(i);for(const r of[-1,1]){const o=new $(new Rt(.26,.02,.12),Hn());o.position.set(r*(e/2-.05),t+.08,s-.05),o.rotation.z=r*.12,n.add(o)}return n}function ed({z:s=-2,y:t=.3,w:e=1.8}={}){const n=new ae,i=new $(new Rt(e,.16,.5),Hn());i.position.set(0,t,s),i.castShadow=!0,n.add(i);const r=7;for(let o=0;o<r;o++){const a=new $(new Rt(.03,.18,.5),Hn());a.position.set((o/(r-1)-.5)*(e*.92),t+.02,s),n.add(a)}return n}function nd({z:s=-1.92,y:t=1.06,span:e=1.62,deckY:n=.82,style:i="gt"}={}){const r=new ae;if(i==="ducktail"){const l=new $(new Rt(e,.06,.34),So(1118998));return l.position.set(0,n+.1,s+.18),l.rotation.x=-.18,r.add(l),r}const o=new ac;o.moveTo(-.19,0),o.quadraticCurveTo(-.1,.05,.06,.032),o.quadraticCurveTo(.15,.016,.19,0),o.quadraticCurveTo(.06,-.03,-.06,-.028),o.quadraticCurveTo(-.15,-.02,-.19,0);const a=new xo(o,{depth:e,bevelEnabled:!1,steps:1});a.translate(0,0,-e/2),a.rotateY(Math.PI/2);const c=new $(a,Hn());if(c.rotation.x=-.16,c.position.set(0,t,s),c.castShadow=!0,r.add(c),i==="f1"){const l=c.clone();l.position.y=t+.14,l.rotation.x=-.3,l.scale.set(1,.7,.9),r.add(l)}for(const l of[-1,1]){const h=new $(new Rt(.02,.22,.42),Hn());h.position.set(l*e/2,t,s),r.add(h)}for(const l of[-1,1]){const h=new $(new Rt(.04,t-n+.06,.1),bo());h.position.set(l*.55,(t+n)/2,s+.02),r.add(h)}return r}function id({z:s=-2.07,y:t=.38,x:e=.45,count:n=2}={}){const i=new ae,r=new me(.06,.07,.16,18);r.rotateX(Math.PI/2);const o=new me(.045,.045,.17,14);o.rotateX(Math.PI/2);const a=n===4?[-e-.12,-e+.04,e-.04,e+.12]:[-e,e];for(const c of a){const l=new $(r,bo());l.position.set(c,t,s),i.add(l);const h=new $(o,ni());h.position.set(c,t,s-.01),i.add(h)}return i}function sd({frontZ:s=2.06,rearZ:t=-2.06,plateY:e=.42}={}){const n=new ae,i=new Nt({map:Fw(),metalness:.6,roughness:.3}),r=new me(.05,.05,.012,20);r.rotateX(Math.PI/2);const o=new $(r,i);o.position.set(0,.64,s),n.add(o);const a=new $(r,i);a.position.set(0,.84,t),a.rotation.y=Math.PI,n.add(a);const c=new Nt({map:Uw(),roughness:.6,metalness:0}),l=new Fe(.42,.13),h=new $(l,c);return h.position.set(0,e,t-.01),h.rotation.y=Math.PI,n.add(h),n}function rd({y:s=.2,w:t=1.7,len:e=3.8}={}){const n=new $(new Rt(t,.04,e),ni());return n.position.set(0,s,0),n}let Zr=null;function Jw(){return Zr||(Zr=new Nt({color:723982,roughness:.94,metalness:0,side:be}),Zr)}function od({zF:s=1.45,zR:t=-1.45,x:e=.86,r:n=.47,width:i=.36}={}){const r=new ae,o=new me(n,n,i,22,1,!0,0,Math.PI);o.rotateZ(Math.PI/2);for(const a of[s,t])for(const c of[-1,1]){const l=new $(o,Jw());l.position.set(c*e,0,a),r.add(l)}return r}let Jr=null;function Qw(){if(Jr)return Jr;const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,8,64,64,62);return e.addColorStop(0,"rgba(0,0,0,0.55)"),e.addColorStop(.6,"rgba(0,0,0,0.28)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Jr=new Oe(s),Jr}function $w({y:s=-.355,w:t=2.3,len:e=4.8}={}){const n=new us({map:Qw(),transparent:!0,depthWrite:!1,opacity:.8}),i=new $(new Fe(t,e),n);return i.rotation.x=-Math.PI/2,i.position.set(0,s,0),i.renderOrder=-1,i}const ad=[{z:-2.16,hw:.86,yb:-.14,hip:.12,yt:.3,topW:.74},{z:-1.78,hw:1,yb:0,hip:.1,yt:.42,topW:.82},{z:-1.45,hw:1.01,yb:.05,hip:.09,yt:.46,topW:.8},{z:-1.05,hw:.97,yb:-.18,hip:.14,yt:.72,topW:.56},{z:-.45,hw:.95,yb:-.2,hip:.16,yt:.88,topW:.52},{z:.2,hw:.96,yb:-.18,hip:.13,yt:.7,topW:.62},{z:.8,hw:.99,yb:-.16,hip:.06,yt:.4,topW:.82},{z:1.45,hw:1.01,yb:.05,hip:.04,yt:.42,topW:.8},{z:1.8,hw:.98,yb:0,hip:.06,yt:.38,topW:.74},{z:2.04,hw:.82,yb:-.06,hip:.08,yt:.3,topW:.58},{z:2.2,hw:.46,yb:.02,hip:.08,yt:.22,topW:.34}],tS="gt";function eS(s,t){const e=new $(Xu(ad,{zStart:.28,zEnd:-1.16,beltFrac:.6,steps:26}),Yu());s.add(e),s.add(Zu({z:1.92,y:.16,x:.6}));const n=Ju({z:-2.06,y:.16,width:1.46});return s.add(n.group),s.add(Qu({z:.3,y:.3,x:.96,color:t.color})),s.add($u({z:2.04,y:-.08,w:.86,h:.2})),s.add(td({z:1.99,y:-.3,w:1.96})),s.add(ed({z:-2,y:-.26,w:1.8})),s.add(nd({z:-1.9,y:.6,span:1.6,deckY:.4,style:"gt"})),s.add(id({z:-2.08,y:-.18,x:.45,count:2})),s.add(sd({frontZ:2.07,rearZ:-2.08,plateY:-.04})),s.add(rd({y:-.3,w:1.64,len:3.8})),s.add(od({zF:1.45,zR:-1.45,x:.86})),{brakeLights:n.brakeMesh}}const nS=Object.freeze(Object.defineProperty({__proto__:null,decorate:eS,keys:ad,wheelStyle:tS},Symbol.toStringTag,{value:"Module"})),cd=[{z:-2.18,hw:.92,yb:-.12,hip:.14,yt:.4,topW:.8},{z:-1.8,hw:1.05,yb:.02,hip:.1,yt:.52,topW:.88},{z:-1.45,hw:1.06,yb:.06,hip:.1,yt:.56,topW:.86},{z:-1.05,hw:1,yb:-.16,hip:.16,yt:.86,topW:.66},{z:-.55,hw:.98,yb:-.18,hip:.18,yt:.92,topW:.62},{z:.05,hw:.99,yb:-.16,hip:.15,yt:.82,topW:.7},{z:.55,hw:1.02,yb:-.14,hip:.06,yt:.48,topW:.86},{z:1.45,hw:1.05,yb:.06,hip:.04,yt:.46,topW:.84},{z:1.95,hw:.94,yb:-.02,hip:.06,yt:.44,topW:.72},{z:2.22,hw:.62,yb:.04,hip:.08,yt:.34,topW:.46}],iS="muscle";function sS(s,t){const e=new $(Xu(cd,{zStart:.45,zEnd:-1.12,beltFrac:.62,steps:24}),Yu());s.add(e);const n=new $(new Rt(.6,.12,.9),ni());n.position.set(0,.52,1.05),s.add(n);const i=new $(new Rt(.5,.08,.12),Hn());i.position.set(0,.55,1.5),s.add(i),s.add(Zu({z:1.96,y:.22,x:.62}));const r=Ju({z:-2.08,y:.24,width:1.6});return s.add(r.group),s.add(Qu({z:.55,y:.36,x:1,color:t.color})),s.add($u({z:2.06,y:0,w:1.1,h:.26})),s.add(td({z:2,y:-.3,w:2})),s.add(ed({z:-2.05,y:-.24,w:1.9})),s.add(nd({z:-1.95,deckY:.5,span:1.7,style:"ducktail"})),s.add(id({z:-2.12,y:-.16,x:.5,count:4})),s.add(sd({frontZ:2.1,rearZ:-2.1,plateY:0})),s.add(rd({y:-.3,w:1.7,len:4})),s.add(od({zF:1.45,zR:-1.45,x:.88})),{brakeLights:r.brakeMesh}}const rS=Object.freeze(Object.defineProperty({__proto__:null,decorate:sS,keys:cd,wheelStyle:iS},Symbol.toStringTag,{value:"Module"})),oS=[{z:-2.1,hw:.28,yb:-.08,hip:0,yt:.2,topW:.18},{z:-1.55,hw:.4,yb:-.1,hip:0,yt:.4,topW:.28},{z:-.95,hw:.44,yb:-.1,hip:.04,yt:.56,topW:.34},{z:-.35,hw:.5,yb:-.12,hip:.05,yt:.34,topW:.44},{z:.35,hw:.46,yb:-.12,hip:.03,yt:.28,topW:.4},{z:1.05,hw:.36,yb:-.1,hip:0,yt:.2,topW:.3},{z:1.55,hw:.28,yb:-.08,hip:0,yt:.16,topW:.22},{z:2.05,hw:.15,yb:-.02,hip:0,yt:.12,topW:.12}],aS="openWheel";function Rh({z:s,y:t,span:e,chord:n=.32,mat:i,tilt:r=-.12,elements:o=1}){const a=new ae,c=new ac;c.moveTo(-n/2,0),c.quadraticCurveTo(-n*.25,.045,n*.18,.028),c.quadraticCurveTo(n*.42,.012,n/2,0),c.quadraticCurveTo(n*.18,-.028,-n*.18,-.025),c.quadraticCurveTo(-n*.4,-.018,-n/2,0);const l=new xo(c,{depth:e,bevelEnabled:!1});l.translate(0,0,-e/2),l.rotateY(Math.PI/2);for(let h=0;h<o;h++){const u=new $(l,i);u.rotation.x=r-h*.18,u.position.set(0,t+h*.12,s+h*.05),u.castShadow=!0,a.add(u)}for(const h of[-1,1]){const u=new $(new Rt(.025,.26,n*1.3),i);u.position.set(h*e/2,t+.05,s),a.add(u)}return a}function cS(s,t){const e=So(t.color),n=Hn(),i=new $(new me(.12,.16,.22,16,1,!1,0,Math.PI),n);i.rotation.set(Math.PI/2,0,0),i.position.set(0,.5,-.78),s.add(i);const r=ni(),o=new $(new Ys(.3,.025,10,24,Math.PI),r);o.rotation.set(0,Math.PI/2,0),o.position.set(0,.16,-.3),s.add(o);const a=new $(new me(.03,.03,.26,8),r);a.position.set(0,.12,.18),a.rotation.x=.2,s.add(a);const c=new $(new Rt(.34,.18,.22),n);c.position.set(0,.26,-.62),s.add(c);const l=new $(new Vs(.13,16,12),e);l.scale.set(1,1.1,1.15),l.position.set(0,.26,-.42),s.add(l);const h=new $(new Vs(.118,16,8,0,Math.PI*2,.7,.5),new nn({color:1053720,roughness:.1,metalness:.2}));h.scale.set(1,1.1,1.15),h.position.set(0,.27,-.41),s.add(h);for(const v of[-1,1]){const g=new $(new Rt(.34,.3,1.2),e);g.geometry.translate(0,0,0),g.position.set(v*.52,-.05,.05),g.scale.set(1,1,1),g.castShadow=!0,s.add(g);const m=new $(new Rt(.3,.24,.08),n);m.position.set(v*.52,-.04,.66),s.add(m)}for(const v of[-1,1]){const g=new $(new Rt(.02,.22,.5),n);g.position.set(v*.62,-.12,.85),g.rotation.y=v*.2,s.add(g)}s.add(Rh({z:1.95,y:-.22,span:1.75,chord:.42,mat:n,tilt:.06,elements:2}));for(const v of[-1,1]){const g=new $(new Rt(.04,.22,.1),n);g.position.set(v*.12,-.12,1.9),s.add(g)}s.add(Rh({z:-1.95,y:.5,span:1.25,chord:.34,mat:n,tilt:-.34,elements:2}));for(const v of[-1,1]){const g=new $(new Rt(.05,.7,.1),n);g.position.set(v*.18,.2,-1.95),s.add(g)}const u=ju(),d=new $(new Rt(.08,.12,.05),u);d.position.set(0,.12,-2.06),d.userData.noMerge=!0,s.add(d);const f=new $((()=>{const v=new me(.06,.06,.2,14);return v.rotateX(Math.PI/2),v})(),bo());f.position.set(0,.06,-2.12),s.add(f);const p=new $(new Rt(1,.04,3.4),ni());return p.position.set(0,-.32,-.1),s.add(p),{brakeLights:d}}const lS=Object.freeze(Object.defineProperty({__proto__:null,decorate:cS,keys:oS,wheelStyle:aS},Symbol.toStringTag,{value:"Module"})),Ph={gt:nS,muscle:rS,"open-wheel":lS},hS=-.37,_a=new Map;function uS(s,t){return _a.has(s)||_a.set(s,t.keys?Aw(t.keys,{ringsPerSegment:9,profilePoints:16}):null),_a.get(s)}function dS(s="gt",t=13112861){const e=Ph[s]||Ph.gt,n=new ae,i=new ae;i.position.y=hS,n.add(i);const r=So(t),o=uS(s,e);if(o){const l=new $(o,r);l.castShadow=!0,l.receiveShadow=!0,l.userData.noMerge=!0,i.add(l)}const a=e.decorate(i,{color:t});Ku(i);const c=[];for(let l=0;l<4;l++)c.push(Zw(e.wheelStyle));return i.add($w()),{root:n,wheels:c,brakeLights:a.brakeLights,_brakeLevel:0}}const Ma={x:.92,y:.32,z:2.18},Ki=.36,fS=.32,Lh=2.9,At={massKg:1350,idleRpm:1100,redlineRpm:7600,shiftUpRpm:7250,shiftDownRpm:3300,shiftTime:.22,torqueCurve:[[1e3,320],[2200,430],[3500,505],[4900,540],[5900,525],[6800,500],[7300,472],[7600,440]],gears:[3.45,2.28,1.71,1.34,1.08,.9],reverseRatio:3.3,finalDrive:3.55,drivelineEff:.88,engineBrakeNm:36,engineInertia:.15,wheelInertia:.9,airDensity:1.225,cdA:.92,clA:2.1,downforcePos:-.25,crr:.014,mu:{road:1.45,kerb:1.22,grass:.55,gravel:.5},surfaceDrag:{road:0,kerb:0,grass:.12,gravel:.2},scrubCoef:.38,loadSensitivity:.14,loadMuClamp:.22,slipGripFloor:.86,brakeFront:50,brakeRear:28,handbrake:55,maxSteer:.62,steerSlipMargin:2,steerFloor:.02,maxReverseSpeed:8.5};function pS(s){const t=At.torqueCurve;if(s<=t[0][0])return t[0][1];for(let e=1;e<t.length;e++)if(s<=t[e][0]){const n=(s-t[e-1][0])/(t[e][0]-t[e-1][0]);return t[e-1][1]+(t[e][1]-t[e-1][1])*n}return t[t.length-1][1]}function wa(s,t,e){if(e<=1)return s;const n=1-At.loadSensitivity*(t/e-1),i=1-At.loadMuClamp,r=1+At.loadMuClamp;return s*Math.min(r,Math.max(i,n))}function ld(s,t,e={}){const n=e.color??13112861,i=e.archetype??"gt",r=dS(i,n),o=new fs(new T(Ma.x,Ma.y,Ma.z)),a=new Ct({mass:At.massKg,material:t.chassisMat});a.addShape(o,new T(0,.2,0)),a.shapeOffsets[0].y=-.05,a.angularDamping=.25;const c=new Ny({chassisBody:a,indexRightAxis:0,indexUpAxis:1,indexForwardAxis:2}),l={radius:Ki,directionLocal:new T(0,-1,0),suspensionStiffness:46,suspensionRestLength:fS,frictionSlip:At.mu.road,dampingRelaxation:2.6,dampingCompression:4.8,maxSuspensionForce:1e5,rollInfluence:.05,axleLocal:new T(-1,0,0),chassisConnectionPointLocal:new T,maxSuspensionTravel:.3,customSlidingRotationalSpeed:-30,useCustomSlidingRotationalSpeed:!0,forwardAcceleration:.55},h=Lh/2,u=.86,d=-.05;[new T(u,d,h),new T(-u,d,h),new T(u,d,-h),new T(-u,d,-h)].forEach(I=>{c.addWheel({...l,chassisConnectionPointLocal:I})}),c.addToWorld(s);const p={gear:1,mode:"D",shiftT:0,rpm:At.idleRpm,engineRpm:At.idleRpm,wheelOmega:0,smoothedRpm:At.idleRpm,steer:0,surfaces:["road","road","road","road"],slip:0},v={rpm:At.idleRpm,rpmFrac:0,gearLabel:"N",speedKmh:0,slip:0};new T;const g=new T,m=new T,x=new T;function y(){const I=a.quaternion,F=2*(I.x*I.z+I.w*I.y),C=1-2*(I.x*I.x+I.y*I.y),D=a.velocity;return D.x*F+D.z*C}function _(){const I=a.quaternion,F=1-2*(I.y*I.y+I.z*I.z),C=2*(I.x*I.z-I.w*I.y),D=a.velocity;return D.x*F+D.z*C}function M(){const I=a.velocity,F=I.x*I.x+I.y*I.y+I.z*I.z,C=Math.sqrt(F);if(C>.5){const G=.5*At.airDensity*At.cdA*F;g.set(-I.x/C*G,-I.y/C*G,-I.z/C*G),a.applyForce(g,T.ZERO)}const D=I.x*I.x+I.z*I.z,N=.5*At.airDensity*At.clA*D;if(N>1){const G=a.quaternion;x.set(2*(G.x*G.y-G.w*G.z),1-2*(G.x*G.x+G.z*G.z),2*(G.y*G.z+G.w*G.x)),g.set(-x.x*N,-x.y*N,-x.z*N);const W=At.downforcePos;m.set(2*(G.x*G.z+G.w*G.y)*W,2*(G.y*G.z-G.w*G.x)*W,(1-2*(G.x*G.x+G.y*G.y))*W),a.applyForce(g,m)}let q=0;for(let G=0;G<4;G++){const W=c.wheelInfos[G];if(!W.isInContact)continue;q+=W.suspensionForce;const Y=At.surfaceDrag[p.surfaces[G]]||0;if(Y>0&&C>.5){const nt=Y*W.suspensionForce;g.set(-I.x/C*nt,0,-I.z/C*nt),m.set(W.raycastResult.hitPointWorld.x-a.position.x,0,W.raycastResult.hitPointWorld.z-a.position.z),a.applyForce(g,m)}}if(C>.5&&q>0){const G=At.crr*q;g.set(-I.x/C*G,0,-I.z/C*G),a.applyForce(g,T.ZERO)}const k=y(),X=_();if(Math.hypot(k,X)>4){const G=Math.atan2(Math.abs(X),Math.abs(k));if(G>.035){const W=At.scrubCoef*Math.sin(G)*Math.max(q,1);g.set(-I.x/C*W,0,-I.z/C*W),a.applyForce(g,T.ZERO)}}}s.addEventListener("preStep",M);function S(I,F,C){if(C)for(let _t=0;_t<4;_t++)p.surfaces[_t]=C[_t];const D=y(),N=Math.hypot(a.velocity.x,a.velocity.z),q=[0,0,0,0];let k=0,X=0;for(let _t=0;_t<4;_t++){const bt=c.wheelInfos[_t].suspensionForce||0;q[_t]=bt,bt>0&&(k+=bt,X+=1)}const Z=X>0?k/X:At.massKg*9.82/4;p.mode==="D"&&I.brake>.1&&D<.5&&N<1?(p.mode="R",p.gear=1):p.mode==="R"&&I.throttle>.1&&D>-.5&&(p.mode="D",p.gear=1);const G=_t=>At.gears[_t-1]*At.finalDrive;p.shiftT>0&&(p.shiftT-=F);const W=p.mode==="D"?G(p.gear):At.reverseRatio*At.finalDrive,Y=Math.abs(D)/(2*Math.PI*Ki),nt=qe.clamp(Y*60*W,At.idleRpm,At.redlineRpm);p.mode==="D"&&p.shiftT<=0&&(nt>At.shiftUpRpm&&p.gear<At.gears.length?(p.gear+=1,p.shiftT=At.shiftTime):nt<At.shiftDownRpm&&p.gear>1&&(p.gear-=1,p.shiftT=At.shiftTime*.6));const ht=p.mode==="D"?G(p.gear):At.reverseRatio*At.finalDrive,dt=p.mode==="D"?I.throttle:I.brake,st=p.mode==="D"?I.brake:I.throttle,vt=dt>.02&&p.shiftT<=0;let xt;vt?xt=pS(p.engineRpm)*dt:xt=-At.engineBrakeNm*(p.engineRpm/At.redlineRpm)*(D>1||p.engineRpm>At.idleRpm+50?1:0);const ft=p.mode==="R"?-1:1,Mt=xt*ht*At.drivelineEff/Ki*ft,z=a.angularVelocity.y,ct=Math.abs(N*z),J=q[2],lt=q[3],tt=wa(At.mu[p.surfaces[2]]??At.mu.road,J,Z)*J+wa(At.mu[p.surfaces[3]]??At.mu.road,lt,Z)*lt,Pt=At.massKg*ct*.5*1.3;let pt=tt*tt-Pt*Pt;if(pt=pt>0?Math.sqrt(pt):0,p.slip>.14){const _t=qe.clamp((p.slip-.14)/.5,0,1);pt*=qe.lerp(1,At.slipGripFloor,_t)}let P=Mt;J+lt>100&&(P=Mt>=0?Math.min(Mt,pt):Math.max(Mt,-pt)),p.mode==="R"&&-D>At.maxReverseSpeed&&(P=0);const A=Math.abs(D)/Ki,H=At.redlineRpm/60*2*Math.PI/ht;if(vt&&J+lt>100&&Math.abs(Mt)>pt+1){const _t=At.engineInertia*ht*ht+2*At.wheelInertia,bt=Math.abs(xt)*ht*At.drivelineEff,Ht=Math.abs(P)*Ki;p.wheelOmega<A&&(p.wheelOmega=A),p.wheelOmega+=(bt-Ht)/_t*F,p.wheelOmega=qe.clamp(p.wheelOmega,A,H)}else p.wheelOmega=A;p.engineRpm=qe.clamp(Math.max(p.wheelOmega*ht*60/(2*Math.PI),At.idleRpm),At.idleRpm,At.redlineRpm),p.rpm=p.engineRpm;const rt=p.wheelOmega*Ki;p.slip=(rt-Math.abs(D))/Math.max(2.5,Math.abs(D));let it=0;st>.02&&(p.mode==="D"&&D>.5||p.mode==="R"&&D<-.5)&&(it=st),c.applyEngineForce(-P/2,2),c.applyEngineForce(-P/2,3);const yt=At.brakeFront*it;let ut=At.brakeRear*it;I.handbrake&&(ut=Math.max(ut,At.handbrake)),c.setBrake(yt,0),c.setBrake(yt,1),c.setBrake(ut,2),c.setBrake(ut,3);const Et=At.mu.road*9.82*At.steerSlipMargin,Ut=Math.max(1,N*N),Gt=Math.min(At.maxSteer,Et*Lh/Ut+At.steerFloor),at=-I.steer*Gt,$t=4*Math.max(Gt,.12),qt=qe.clamp(at-p.steer,-$t*F,$t*F);p.steer+=qt,c.setSteeringValue(p.steer,0),c.setSteeringValue(p.steer,1);for(let _t=0;_t<4;_t++){let bt=wa(At.mu[p.surfaces[_t]]??At.mu.road,q[_t],Z);I.handbrake&&_t>=2&&(bt*=.55),c.wheelInfos[_t].frictionSlip=bt}p.smoothedRpm+=(p.rpm-p.smoothedRpm)*Math.min(1,F*12),v.rpm=p.smoothedRpm,v.rpmFrac=qe.clamp((p.smoothedRpm-At.idleRpm)/(At.redlineRpm-At.idleRpm),0,1),v.speedKmh=N*3.6,v.slip=p.slip,N<.6&&dt<.05?v.gearLabel="N":p.mode==="R"?v.gearLabel="R":v.gearLabel=String(p.gear);const Bt=Math.min(1,Math.max(it,I.handbrake?.8:0));w(Bt*1.6)}const b=r.wheels;function R(){for(let I=0;I<c.wheelInfos.length;I++){c.updateWheelTransform(I);const F=c.wheelInfos[I].worldTransform,C=b[I];C.position.copy(F.position),C.quaternion.copy(F.quaternion)}r.root.position.copy(a.position),r.root.quaternion.copy(a.quaternion),r.brakeLights.material.emissiveIntensity=r._brakeLevel,r.brakeLights.material.opacity=.5+r._brakeLevel*.5}function w(I){r._brakeLevel=I}function E(I,F=0){a.position.set(I.x,I.y,I.z),a.velocity.setZero(),a.angularVelocity.setZero();const C=new pe;C.setFromAxisAngle(new T(0,1,0),F),a.quaternion.copy(C),p.gear=1,p.mode="D",p.shiftT=0,p.steer=0,p.rpm=At.idleRpm,p.engineRpm=At.idleRpm,p.wheelOmega=0,p.smoothedRpm=At.idleRpm,p.slip=0,c.applyEngineForce(0,2),c.applyEngineForce(0,3),c.setSteeringValue(0,0),c.setSteeringValue(0,1);for(let D=0;D<4;D++)c.setBrake(0,D)}function U(){s.removeEventListener("preStep",M),c.removeFromWorld(s),s.removeBody(a)}return{visual:r,body:a,vehicle:c,update:R,setBrakeLight:w,reset:E,applyControls:S,dispose:U,telemetry:v,spec:At}}function mS(s){const t=new Set,e={throttle:0,brake:0,steer:0,handbrake:!1,cameraToggle:!1,reset:!1,rescue:!1,lineToggle:!1},n=xS(s),i=d=>{t.add(d.code),Qr(d.code,s.cameraToggle)&&(e.cameraToggle=!0),Qr(d.code,s.reset)&&(e.reset=!0),Qr(d.code,s.rescue)&&(e.rescue=!0),Qr(d.code,s.lineToggle)&&(e.lineToggle=!0),n.has(d.code)&&d.preventDefault()},r=d=>t.delete(d.code),o=()=>t.clear();window.addEventListener("keydown",i),window.addEventListener("keyup",r),window.addEventListener("blur",o);function a(d){const f=Ls(t,s.throttle),p=Ls(t,s.brake),v=Ls(t,s.left),g=Ls(t,s.right);e.handbrake=Ls(t,s.handbrake),e.throttle=Sa(e.throttle,f?1:0,d*(f?4:6)),e.brake=Sa(e.brake,p?1:0,d*(p?6:8));let m=0;return v&&(m-=1),g&&(m+=1),e.steer=Sa(e.steer,m,d*(m===0?6:3.2)),e}function c(){const d=e.cameraToggle;return e.cameraToggle=!1,d}function l(){const d=e.reset;return e.reset=!1,d}function h(){const d=e.rescue;return e.rescue=!1,d}function u(){const d=e.lineToggle;return e.lineToggle=!1,d}return{update:a,consumeToggle:c,consumeReset:l,consumeRescue:h,consumeLineToggle:u,state:e}}const Ih={throttle:["KeyW","ArrowUp"],brake:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],handbrake:"Space",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},gS={throttle:"KeyW",brake:"KeyS",left:"KeyA",right:"KeyD",handbrake:"ShiftLeft",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},vS={throttle:"ArrowUp",brake:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",handbrake:"Numpad0",cameraToggle:null,reset:null,rescue:null,lineToggle:null};function Ls(s,t){return t?Array.isArray(t)?t.some(e=>s.has(e)):s.has(t):!1}function Qr(s,t){return t?Array.isArray(t)?t.includes(s):s===t:!1}function xS(s){const t=new Set;for(const e of Object.values(s))e&&(Array.isArray(e)?e.forEach(n=>t.add(n)):t.add(e));return t}function Sa(s,t,e){const n=1-Math.exp(-e);return s+(t-s)*n}function yS(s){let t=0;const e=new O,n=new O,i=new O,r=new O;let o=!1;const a=new en;new O;const c=new O,l=new O,h=new O(0,1,0),u=[{dist:7.2,height:2.7,lookHeight:1,fov:62,lag:.18},{dist:0,height:1.05,lookHeight:1.05,fov:72,lag:.04,hood:!0},{dist:10,height:4,lookHeight:1.2,fov:56,lag:.32}];function d(p,v,g){const m=u[t];if(s.fov+=(m.fov-s.fov)*Math.min(1,p*6),s.updateProjectionMatrix(),a.set(v.quaternion.x,v.quaternion.y,v.quaternion.z,v.quaternion.w),c.set(0,0,1).applyQuaternion(a).normalize(),l.crossVectors(h,c).normalize(),m.hood)e.set(v.position.x,v.position.y+m.height,v.position.z).add(c.clone().multiplyScalar(.25)),n.copy(e).add(c.clone().multiplyScalar(8));else{const y=m.dist+Math.min(2.5,g*.04),_=m.height+Math.min(.8,g*.012);e.copy(v.position).add(c.clone().multiplyScalar(-y)).add(h.clone().multiplyScalar(_)),n.copy(v.position).add(c.clone().multiplyScalar(2)).add(h.clone().multiplyScalar(m.lookHeight))}o||(i.copy(e),r.copy(n),o=!0);const x=1-Math.exp(-p/Math.max(.001,m.lag));i.lerp(e,x),r.lerp(n,Math.min(1,x*1.4)),s.position.copy(i),s.lookAt(r)}function f(){t=(t+1)%u.length,o=!1}return{update:d,cycle:f,getMode:()=>t}}function _S(s=320){const t=document.getElementById("rpm-arc"),e=document.getElementById("speed-num"),n=document.getElementById("gear-num"),i=document.getElementById("lap-current"),r=document.getElementById("lap-total"),o=document.getElementById("lap-time"),a=document.getElementById("best-time"),c=document.getElementById("hud-position-block"),l=document.getElementById("pos-current"),h=document.getElementById("pos-total"),u=document.getElementById("race-banner"),d=document.getElementById("wrong-way"),f=document.getElementById("pace-pill"),p=document.getElementById("pace-target"),v=document.getElementById("pace-delta");let g=null;const m=document.getElementById("ticks"),x=110,y=110,_=96,M=Math.PI*.75,S=Math.PI*.25+Math.PI*2;for(let st=0;st<=16;st++){const vt=st/16,xt=M+(S-M)*vt,ft=x+Math.cos(xt)*(_-2),Mt=y+Math.sin(xt)*(_-2),z=x+Math.cos(xt)*(_-(st%4===0?16:9)),ct=y+Math.sin(xt)*(_-(st%4===0?16:9)),J=document.createElementNS("http://www.w3.org/2000/svg","line");J.setAttribute("x1",ft),J.setAttribute("y1",Mt),J.setAttribute("x2",z),J.setAttribute("y2",ct),J.setAttribute("stroke",st%4===0?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.35)"),J.setAttribute("stroke-width",st%4===0?"2":"1"),m.appendChild(J)}const b=document.getElementById("minimap"),R=b.getContext("2d");let w=null,E=null,U=null;function I(st,vt,xt){const ft=xt!=null?Math.max(0,Math.min(1,xt)):Math.max(0,Math.min(1,st/s)),Mt=M,z=M+(S-M)*ft,ct=x+Math.cos(Mt)*_,J=y+Math.sin(Mt)*_,lt=x+Math.cos(z)*_,tt=y+Math.sin(z)*_,Pt=z-Mt>Math.PI?1:0;t.setAttribute("d",`M ${ct} ${J} A ${_} ${_} 0 ${Pt} 1 ${lt} ${tt}`),e.textContent=Math.round(st),n.textContent=vt}function F(st,vt){i.textContent=st,r.textContent=vt}function C(st){o.textContent=Dh(st)}function D(st){a.textContent=st==null?"--:--.---":Dh(st)}function N(st,vt){c.classList.remove("hidden"),l.textContent=st,h.textContent=vt}function q(){c.classList.add("hidden")}function k(st,vt=1800){u.textContent=st,u.classList.remove("hidden"),g&&clearTimeout(g),g=setTimeout(()=>{u.classList.add("hidden"),g=null},vt)}function X(st){d.classList.toggle("hidden",!st)}function Z(st,vt){f.classList.remove("hidden"),p.textContent=Math.round(st);let xt,ft;vt>3?(xt="pace-over",ft=`+${Math.round(vt)} TOO FAST`):vt<-8?(xt="pace-under",ft=`−${Math.round(-vt)} COULD GO FASTER`):(xt="pace-on",ft="ON PACE"),v.textContent=ft,v.className=xt}function G(){f.classList.add("hidden")}function W(){g&&(clearTimeout(g),g=null),u.classList.add("hidden"),d.classList.add("hidden")}function Y(){document.getElementById("ui").classList.remove("hidden")}function nt(){document.getElementById("ui").classList.add("hidden")}function ht(st){const vt=st.frames;let xt=1/0,ft=-1/0,Mt=1/0,z=-1/0;for(const yt of vt)yt.pos.x<xt&&(xt=yt.pos.x),yt.pos.x>ft&&(ft=yt.pos.x),yt.pos.z<Mt&&(Mt=yt.pos.z),yt.pos.z>z&&(z=yt.pos.z);const ct=18,J=b.width,lt=b.height,tt=ft-xt,Pt=z-Mt,pt=(J-ct*2)/tt,P=(lt-ct*2)/Pt,A=Math.min(pt,P),H=(J-tt*A)/2-xt*A,ot=(lt-Pt*A)/2-Mt*A;w={minX:xt,maxX:ft,minZ:Mt,maxZ:z,scale:A,ox:H,oz:ot};const rt=new Path2D;for(let yt=0;yt<vt.length;yt++){const ut=vt[yt].pos.x*A+H,Et=vt[yt].pos.z*A+ot;yt===0?rt.moveTo(ut,Et):rt.lineTo(ut,Et)}rt.closePath(),E=rt;const it=vt[0];U={x:it.pos.x*A+H,y:it.pos.z*A+ot}}function dt(st){if(!E)return;const vt=b.width,xt=b.height;R.clearRect(0,0,vt,xt),R.lineWidth=12,R.lineJoin="round",R.lineCap="round",R.strokeStyle="rgba(255, 255, 255, 0.10)",R.stroke(E),R.lineWidth=6,R.strokeStyle="rgba(220, 230, 240, 0.85)",R.stroke(E),U&&(R.fillStyle="rgba(255, 215, 74, 0.9)",R.beginPath(),R.arc(U.x,U.y,4,0,Math.PI*2),R.fill(),R.strokeStyle="rgba(0, 0, 0, 0.6)",R.lineWidth=1,R.stroke());const ft=[...st].sort((Mt,z)=>(Mt.isPlayer?1:0)-(z.isPlayer?1:0));for(const Mt of ft){const z=Mt.pos.x*w.scale+w.ox,ct=Mt.pos.z*w.scale+w.oz,J=Mt.isPlayer?5:4;R.beginPath(),R.arc(z,ct,J+2,0,Math.PI*2),R.fillStyle="rgba(0, 0, 0, 0.55)",R.fill(),R.beginPath(),R.arc(z,ct,J,0,Math.PI*2),R.fillStyle=MS(Mt.color),R.fill(),Mt.isPlayer&&(R.strokeStyle="#fff",R.lineWidth=1.4,R.stroke())}}return{setSpeed:I,setLap:F,setLapTime:C,setBest:D,setPosition:N,hidePosition:q,setPace:Z,hidePace:G,flashBanner:k,setWrongWay:X,clearAnnouncements:W,show:Y,hide:nt,buildMinimap:ht,drawMinimap:dt}}function MS(s){const t=s>>16&255,e=s>>8&255,n=s&255;return`rgb(${t}, ${e}, ${n})`}function Dh(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3;return`${ba(e,2)}:${ba(n,2)}.${ba(i,3)}`}function ba(s,t){return s.toString().padStart(t,"0")}function hd(s,t={}){const e=t.skill??.85,n=9.82*1.45*(.62+.3*e),i=8.5,r=46+14*e,o={throttle:0,brake:0,steer:0,handbrake:!1},a=s.frames,c=a.length,l=new Float32Array(c);for(let x=0;x<c;x++)l[x]=a[x].pos.distanceTo(a[(x+1)%c].pos);const h=new Float32Array(c);for(let x=0;x<c;x++){const y=a[x].tan,_=a[(x+1)%c].tan,M=Math.max(0,1-y.dot(_)),S=Math.sqrt(2*M);h[x]=S/Math.max(.5,l[x])}const u=new Float32Array(c);for(let x=0;x<c;x++){let y=0;for(let _=-2;_<=2;_++)y+=h[(x+_+c)%c];u[x]=y/5}const d=new Float32Array(c);for(let x=0;x<c;x++)d[x]=Math.min(r,Math.sqrt(n/Math.max(1e-4,u[x])));for(let x=0;x<2;x++)for(let y=c-1;y>=0;y--){const _=d[(y+1)%c],M=Math.sqrt(_*_+2*i*l[y]);d[y]>M&&(d[y]=M)}const f=new O,p=new O;let v=0,g=0;function m(x,y,_=1/60){const M=x.body.position,S=wS(a,M),b=Math.hypot(x.body.velocity.x,x.body.velocity.z),R=2+Math.floor(b/18);let w=1/0;for(let dt=0;dt<=R;dt++)w=Math.min(w,d[(S+dt)%c]);const E=Math.max(7,b*.55);let U=S,I=0;for(;I<E;)I+=l[U%c],U++;const F=a[U%c].pos,C=x.body.quaternion,D=2*(C.x*C.z+C.w*C.y),N=1-2*(C.x*C.x+C.y*C.y);p.set(D,0,N).normalize(),f.set(F.x-M.x,0,F.z-M.z);const q=Math.max(2,f.length());f.normalize();const k=qe.clamp(p.dot(f),-1,1),X=Math.acos(k),G=p.x*f.z-p.z*f.x<0?-X:X,Y=2*Math.sin(G)/q*2.9,nt=Math.max(1,b*b),ht=Math.min(.62,1.45*9.82*2*2.9/nt+.02);if(o.steer=qe.clamp(Y/ht,-1,1),b<w-.5){const dt=Math.min(1,Math.abs(o.steer));o.throttle=qe.lerp(1,.55,dt*.7),o.brake=0}else b>w+1?(o.throttle=0,o.brake=qe.clamp((b-w)/6,.2,1)):(o.throttle=.35,o.brake=0);if(y)for(const dt of y){if(!dt||dt===x)continue;const st=dt.body.position.x-M.x,vt=dt.body.position.z-M.z,xt=st*p.x+vt*p.z,ft=-st*p.z+vt*p.x,Mt=Math.max(12,b*.95);if(xt<1||xt>Mt||Math.abs(ft)>2.4)continue;const z=dt.body.velocity,ct=b-Math.hypot(z.x,z.z);if(xt<6.5)o.throttle=0,o.brake=Math.max(o.brake,ct>1?1:.5);else if(ct>0){const J=ct*ct/(2*Math.max(1,xt-6));o.brake=Math.max(o.brake,qe.clamp(J/6,0,1)),(o.brake>.1||xt<b*.45)&&(o.throttle=Math.min(o.throttle,.35))}Math.abs(o.steer)<.5&&(o.steer=qe.clamp(o.steer+(ft>=0?-.15:.15),-1,1))}return g>0?(g-=_,o.throttle=0,o.brake=1,o.steer=-o.steer):(b<1.5&&o.throttle>.5?v+=_:v=Math.max(0,v-_*2),v>1.2&&(v=0,g=1.5)),o}return{update:m}}function wS(s,t){let e=0,n=1/0;for(let i=0;i<s.length;i++){const r=s[i].pos.x-t.x,o=s[i].pos.z-t.z,a=r*r+o*o;a<n&&(n=a,e=i)}return e}const SS=13,bS=10,ES=7.5,TS=71,AS=215e3,ud=1350,CS=.5*1.225*.92,RS=.014*ud*9.82,PS=.55,Nh=.045,LS=[1,.13,.1],$r=[.93,.95,.97],IS=[.1,.95,.32];function Uh(s,t){const e=t.frames,n=t.racingLineOffset,i=e.length,r=[];for(let M=0;M<i;M++){const S=e[M];r.push(new O(S.pos.x+S.left.x*n[M],S.pos.y,S.pos.z+S.left.z*n[M]))}const o=new Float32Array(i);for(let M=0;M<i;M++)o[M]=Math.max(.5,r[M].distanceTo(r[(M+1)%i]));const a=new Float32Array(i);for(let M=0;M<i;M++){const S=r[(M-1+i)%i],b=r[M],R=r[(M+1)%i],w=b.x-S.x,E=b.z-S.z,U=R.x-b.x,I=R.z-b.z,F=Math.hypot(w,E),C=Math.hypot(U,I),D=(w*U+E*I)/Math.max(1e-6,F*C),N=Math.acos(Math.min(1,Math.max(-1,D)));a[M]=N/Math.max(.5,(F+C)/2)}const c=new Float32Array(i);for(let M=0;M<i;M++){let S=0;for(let b=-2;b<=2;b++)S+=a[(M+b+i)%i];c[M]=S/5}const l=new Float32Array(i);for(let M=0;M<i;M++)l[M]=Math.min(TS,Math.sqrt(SS/Math.max(1e-4,c[M])));for(let M=0;M<2;M++)for(let S=i-1;S>=0;S--){const b=l[(S+1)%i],R=Math.sqrt(b*b+2*bS*o[S]);l[S]>R&&(l[S]=R)}const h=M=>Math.min(ES,Math.max(0,(AS/Math.max(8,M)-CS*M*M-RS)/ud));for(let M=0;M<2;M++)for(let S=0;S<i;S++){const b=(S+1)%i,R=Math.sqrt(l[S]*l[S]+2*h(l[S])*o[S]);l[b]>R&&(l[b]=R)}const u=new Float32Array(i*2*3),d=new Float32Array(i*2*3),f=PS/2;for(let M=0;M<i;M++){const S=e[M],b=r[M];u.set([b.x+S.left.x*f,b.y+Nh,b.z+S.left.z*f],M*6),u.set([b.x-S.left.x*f,b.y+Nh,b.z-S.left.z*f],M*6+3),d.set($r,M*6),d.set($r,M*6+3)}const p=[];for(let M=0;M<i;M++){const S=M*2,b=M*2+1,R=(M+1)%i*2,w=(M+1)%i*2+1;p.push(S,R,b,b,R,w)}const v=new oe;v.setAttribute("position",new te(u,3));const g=new te(d,3);g.setUsage(pf),v.setAttribute("color",g),v.setIndex(p);const m=new $(v,new us({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));m.renderOrder=3,m.visible=!1,s.add(m);function x(M){const S=g.array;for(let b=0;b<i;b++){const R=l[b]-M;let w,E,U;R<=1?(w=LS,E=$r,U=Math.max(0,(R+1)/2)):(w=$r,E=IS,U=Math.min(1,(R-1)/2));const I=w[0]+(E[0]-w[0])*U,F=w[1]+(E[1]-w[1])*U,C=w[2]+(E[2]-w[2])*U,D=b*6;S[D]=I,S[D+1]=F,S[D+2]=C,S[D+3]=I,S[D+4]=F,S[D+5]=C}g.needsUpdate=!0}function y(M){m.visible=M}function _(){s.remove(m),m.geometry.dispose(),m.material.dispose()}return{profile:l,update:x,setVisible:y,mesh:m,dispose:_}}const DS=3,NS=320;function US(s){return s==="time-trial"?1:DS}const Ea=13112861,FS=2059519,OS=[16436245,366185,15357964],Ta="gt",zS="muscle",BS=["open-wheel","gt","muscle"];kS();async function kS(){const s=document.getElementById("loading-status"),t=document.getElementById("loading-fill"),e=(y,_)=>{t.style.width=`${Math.round(y*100)}%`,_&&(s.textContent=_)};e(.05,"Booting renderer"),await Is();const n=document.getElementById("game"),{renderer:i,scene:r,camera:o,composer:a,updateShadowTarget:c}=Lx(n);e(.25,"Building physics world"),await Is();const{world:l,materials:h}=AM();e(.45,"Laying asphalt"),await Is();const u=bh(r,l,h,Ew(Th));e(.7,"Calibrating telemetry"),await Is();const d=_S(NS);d.buildMinimap(u);const f=Uh(r,u),p=new $e(62,window.innerWidth/window.innerHeight,.6,3e3);r.add(p),e(1,"Ready"),await Is(),document.getElementById("loading").classList.add("fade");const v={renderer:i,scene:r,camera:o,camera2:p,composer:a,world:l,materials:h,track:u,hud:d,racingLine:f,selectedTrackId:Th,lineAid:!1,updateShadowTarget:c,cars:[],primaryPlayerIdx:0,mode:null,state:null};typeof window<"u"&&(window.__ctx=v,window.__createAIDriver=hd,window.__tick=y=>zh(v,y,performance.now())),document.querySelectorAll("button.mode").forEach(y=>{y.addEventListener("click",()=>{const _=y.dataset.mode;Fh(v,_)})}),document.getElementById("finish-restart").addEventListener("click",()=>{v.mode&&Fh(v,v.mode)}),document.getElementById("finish-menu").addEventListener("click",()=>{Oh(v)}),window.addEventListener("keydown",y=>{y.code==="Escape"&&v.mode&&Oh(v)});function g(y){v.track.dispose(),v.racingLine.dispose(),v.track=bh(r,l,h,y),v.racingLine=Uh(r,v.track),v.racingLine.setVisible(!1),v.hud.buildMinimap(v.track),v.selectedTrackId=y.id}HS(document.getElementById("track-list"),v,g),dd();let m=performance.now();function x(y){requestAnimationFrame(x);const _=Math.min(.05,(y-m)/1e3);m=y,v.mode&&zh(v,_,y)}requestAnimationFrame(x)}function dd(){document.getElementById("menu").classList.remove("hidden")}function GS(){document.getElementById("menu").classList.add("hidden")}function HS(s,t,e){if(!s)return;s.innerHTML="";const n=[];for(const i of Xa){const r=document.createElement("button");r.className="track-card"+(i.id===t.selectedTrackId?" selected":""),r.dataset.track=i.id;const o=i.difficulty.toLowerCase().replace(/[^a-z]/g,"");r.innerHTML=`<div class="track-head"><span class="track-name">${i.name}</span><span class="track-diff diff-${o}">${i.difficulty}</span></div><div class="track-sub">${i.subtitle}</div><div class="track-blurb">${i.blurb}</div>`,r.addEventListener("click",()=>{t.selectedTrackId!==i.id&&(n.forEach(a=>a.classList.remove("selected")),r.classList.add("selected"),e(i))}),s.appendChild(r),n.push(r)}}function Fh(s,t){if(fd(s),s.mode=t,s.primaryPlayerIdx=0,s.state=XS(t),t==="time-trial")to(s,Ih,Ea,0,Ta),s.hud.hidePosition();else if(t==="quick-race"){to(s,Ih,Ea,0,Ta);for(let e=0;e<3;e++)qS(s,OS[e],e+1,.78+e*.04,BS[e]);s.hud.setPosition(1,s.cars.length)}else t==="two-player"&&(to(s,gS,Ea,0,Ta),to(s,vS,FS,1,zS),s.hud.hidePosition());s.lineAid=t!=="two-player",s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace(),s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),pc(),GS(),s.hud.show()}function Oh(s){fd(s),s.mode=null,s.state=null,s.racingLine.setVisible(!1),s.hud.hide(),s.hud.hidePosition(),s.hud.hidePace(),s.hud.clearAnnouncements(),pc(),dd()}function WS(s,t){return[...s.cars].sort((n,i)=>i.state.progress-n.state.progress).indexOf(t)+1}function VS(s){const t=s.cars[s.primaryPlayerIdx],e=t.state;let n="FINISHED",i="";if(s.mode==="time-trial")i=`LAP TIME   ${Aa(e.bestMs)}`;else if(s.mode==="quick-race"){const r=WS(s,t);n=r===1?"YOU WIN":`FINISHED  P${r}/${s.cars.length}`,i=`RACE TIME   ${Aa(e.finishMs)}`}else if(s.mode==="two-player"){const r=s.state.finishOrder[0];n=r&&r.label==="P2"?"PLAYER 2 WINS":"PLAYER 1 WINS",i=`TIME   ${Aa(r?r.state.finishMs:e.finishMs)}`}document.getElementById("finish-title").textContent=n,document.getElementById("finish-detail").textContent=i,document.getElementById("finish").classList.remove("hidden")}function pc(){document.getElementById("finish").classList.add("hidden")}function Aa(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3,r=(o,a)=>o.toString().padStart(a,"0");return`${r(e,2)}:${r(n,2)}.${r(i,3)}`}function XS(s){return{mode:s,totalLaps:US(s),finishOrder:[],finishShown:!1,perCar:[]}}function mc(){const s=performance.now();return{lap:1,bestMs:null,lapStart:s,raceStart:s,finishMs:null,lastT:0,sectorReached:!1,finished:!1,progress:0}}function to(s,t,e,n,i="gt"){const r=ld(s.world,s.materials,{color:e,archetype:i});s.scene.add(r.visual.root),r.visual.wheels.forEach(l=>s.scene.add(l));const o=gc(s.track,n);r.reset(o.position,o.yaw);const a=mS(t),c=yS(n===0?s.camera:s.camera2);s.cars.push({car:r,color:e,isPlayer:!0,input:a,chase:c,state:mc(),label:n===0?"P1":"P2"}),s.state.perCar.push(s.cars[s.cars.length-1])}function qS(s,t,e,n,i="gt"){const r=ld(s.world,s.materials,{color:t,archetype:i});s.scene.add(r.visual.root),r.visual.wheels.forEach(c=>s.scene.add(c));const o=gc(s.track,e);r.reset(o.position,o.yaw);const a=hd(s.track,{skill:n});s.cars.push({car:r,color:t,isPlayer:!1,ai:a,state:mc(),label:"AI"}),s.state.perCar.push(s.cars[s.cars.length-1])}function gc(s,t){const e=-2.8-t*7,n=(t%2===0?1:-1)*2.5,i=s.frames[0];return{position:new O().copy(i.pos).add(i.tan.clone().multiplyScalar(e)).add(i.left.clone().multiplyScalar(n)).add(new O(0,1,0)),yaw:Math.atan2(i.tan.x,i.tan.z)}}function fd(s){for(const t of s.cars)t.car.dispose(),s.scene.remove(t.car.visual.root),t.car.visual.wheels.forEach(e=>s.scene.remove(e));s.cars=[]}const Ca=1/120;let Ra=0;function zh(s,t,e){Ra+=t;const n=window.innerWidth,i=window.innerHeight;if(s.mode==="two-player"){const l=Math.floor(n/2);s.camera.aspect=l/i,s.camera2.aspect=(n-l)/i}else s.camera.aspect=n/i;const r=s.cars.map(l=>l.car);for(const l of s.cars){let h;if(l.isPlayer){if(h=l.input.update(t),l.input.consumeToggle()&&l.chase.cycle(),l.input.consumeLineToggle()&&s.mode!=="two-player"&&(s.lineAid=!s.lineAid,s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace()),l.input.consumeReset()){for(const u of s.cars){const d=s.cars.indexOf(u),f=gc(s.track,d);u.car.reset(f.position,f.yaw),u.state=mc()}s.state.finishOrder=[],s.state.finishShown=!1,s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),pc()}l.input.consumeRescue()&&Ya(s.track,l.car)}else h=l.ai.update(l.car,r,t);l.car.applyControls(h,t,jS(s.track,l.car))}for(;Ra>=Ca;)s.world.step(Ca),Ra-=Ca;for(const l of s.cars)l.car.update();for(const l of s.cars)KS(s.track,l.car);const o=s.cars[s.primaryPlayerIdx];o&&s.updateShadowTarget(o.car.body.position);for(const l of s.cars){if(!l.isPlayer)continue;const h=l.car.body.velocity,u=Math.hypot(h.x,h.y,h.z)*3.6;l.chase.update(t,l.car.body,u)}const a=s.cars[s.primaryPlayerIdx];if(a&&a.isPlayer){const l=a.car.telemetry;if(s.hud.setSpeed(l.speedKmh,l.gearLabel,l.rpmFrac),ZS(a,s.track,s.hud,s.state),s.hud.setWrongWay(!a.state.finished&&$S(s.track,a.car)),s.lineAid){const h=a.car.body.velocity,u=Math.hypot(h.x,h.z);s.racingLine.update(u);const d=s.racingLine.profile[Ks(s.track,a.car.body.position)];s.hud.setPace(d*3.6,(u-d)*3.6)}}for(const l of s.cars)l!==a&&JS(l,s.track,s.state);if(s.mode==="quick-race"){const h=[...s.cars].sort((u,d)=>d.state.progress-u.state.progress).indexOf(a)+1;s.hud.setPosition(h,s.cars.length)}(s.mode==="two-player"?s.state.finishOrder.length>=1:a&&a.state.finished)&&!s.state.finishShown&&(s.state.finishShown=!0,s.hud.setWrongWay(!1),VS(s)),s.hud.drawMinimap(s.cars.map(l=>({pos:l.car.body.position,color:l.color,isPlayer:l.isPlayer}))),s.mode!=="two-player"&&s.composer.passes.forEach(l=>{l.uniforms&&l.uniforms.uTime&&(l.uniforms.uTime.value=e*.001)}),s.mode==="two-player"?YS(s):s.composer.render()}function YS(s){const t=window.innerWidth,e=window.innerHeight,n=Math.floor(t/2);s.renderer.setScissorTest(!0),s.renderer.setViewport(0,0,n,e),s.renderer.setScissor(0,0,n,e),s.camera.aspect=n/e,s.camera.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera),s.renderer.setViewport(n,0,t-n,e),s.renderer.setScissor(n,0,t-n,e),s.camera2.aspect=(t-n)/e,s.camera2.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera2),s.renderer.setScissorTest(!1),s.renderer.setViewport(0,0,t,e),s.renderer.setScissor(0,0,t,e)}function Is(){return new Promise(s=>requestAnimationFrame(()=>s()))}const eo=["road","road","road","road"];function jS(s,t){const e=s.frames,n=e.length,i=Ks(s,t.body.position);for(let r=0;r<4;r++){const o=t.vehicle.wheelInfos[r],a=o.isInContact?o.raycastResult.hitPointWorld:o.chassisConnectionPointWorld;let c=i,l=1/0;for(let f=-4;f<=4;f++){const p=(i+f+n)%n,v=e[p].pos.x-a.x,g=e[p].pos.z-a.z,m=v*v+g*g;m<l&&(l=m,c=p)}const h=e[c],u=Math.abs((a.x-h.pos.x)*h.left.x+(a.z-h.pos.z)*h.left.z),d=s.width/2;u<=d?eo[r]="road":u<=d+s.kerbWidth?eo[r]="kerb":eo[r]=s.isGravel&&s.isGravel(c)?"gravel":"grass"}return eo}function Ya(s,t){const e=t.body.position,n=s.frames;let i=0,r=1/0;for(let h=0;h<n.length;h++){const u=n[h].pos.x-e.x,d=n[h].pos.z-e.z,f=u*u+d*d;f<r&&(r=f,i=h)}const o=(i+4)%n.length,a=n[o],c=new O(a.pos.x,a.pos.y+1,a.pos.z),l=Math.atan2(a.tan.x,a.tan.z);t.reset(c,l)}function KS(s,t){const e=t.body.position;if(e.y<-2){Ya(s,t);return}const n=s.frames[Ks(s,e)];Math.abs((e.x-n.pos.x)*n.left.x+(e.z-n.pos.z)*n.left.z)>s.armcoOffset+2.5&&Ya(s,t)}function pd(s,t,e,n){const i=s.state;if(i.finished)return null;const r=QS(t,s.car.body.position);r>.4&&r<.6&&(i.sectorReached=!0);let o=null;if(i.sectorReached&&i.lastT>.92&&r<.08){const a=n-i.lapStart;if((i.bestMs==null||a<i.bestMs)&&(i.bestMs=a),i.sectorReached=!1,i.lap>=e.totalLaps)return i.finished=!0,i.finishMs=n-i.raceStart,e.finishOrder.push(s),i.lastT=r,i.progress=e.totalLaps+100-(e.finishOrder.length-1),"finish";i.lap+=1,i.lapStart=n,o=i.lap===e.totalLaps?"final":"lap"}return i.lastT=r,i.progress=i.lap-1+r,o}function ZS(s,t,e,n){const i=s.state,r=i.bestMs,o=performance.now(),a=pd(s,t,n,o);i.bestMs!==r&&e.setBest(i.bestMs),a==="finish"?(e.setLap(n.totalLaps,n.totalLaps),e.flashBanner("FINISH")):a==="final"?(e.setLap(i.lap,n.totalLaps),e.flashBanner("FINAL LAP")):a==="lap"&&(e.setLap(i.lap,n.totalLaps),e.flashBanner(`LAP ${i.lap} / ${n.totalLaps}`)),i.finished||e.setLapTime(o-i.lapStart)}function JS(s,t,e){pd(s,t,e,performance.now())}function Ks(s,t){const e=s.frames;let n=0,i=1/0;for(let r=0;r<e.length;r++){const o=e[r].pos.x-t.x,a=e[r].pos.z-t.z,c=o*o+a*a;c<i&&(i=c,n=r)}return n}function QS(s,t){return Ks(s,t)/s.frames.length}function $S(s,t){const e=t.body.velocity,n=Math.hypot(e.x,e.z);if(n<5)return!1;const i=s.frames[Ks(s,t.body.position)].tan;return(e.x*i.x+e.z*i.z)/n<-.25}
