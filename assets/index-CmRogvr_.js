(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const ic="160",Fd=0,Uc=1,Od=2,su=1,ou=2,kn=3,ni=0,Ke=1,be=2,Oe=0,Qi=1,za=2,Fc=3,Ba=4,ru=5,Mn=100,zd=101,Bd=102,Oc=103,zc=104,Is=200,kd=201,Gd=202,Hd=203,ka=204,Ga=205,Ha=206,Wd=207,Wa=208,Vd=209,Xd=210,qd=211,Yd=212,jd=213,Zd=214,Kd=0,Jd=1,Qd=2,pr=3,$d=4,tf=5,ef=6,nf=7,au=0,sf=1,of=2,ti=0,cu=1,lu=2,hu=3,sc=4,rf=5,uu=6,du=300,ns=301,is=302,Va=303,Xa=304,Er=306,le=1e3,yn=1001,qa=1002,Se=1003,Bc=1004,zr=1005,$e=1006,af=1007,ss=1008,Hn=1009,cf=1010,lf=1011,oc=1012,fu=1013,Jn=1014,Qn=1015,an=1016,pu=1017,mu=1018,ei=1020,hf=1021,un=1023,uf=1024,df=1025,xi=1026,wi=1027,ff=1028,gu=1029,pf=1030,vu=1031,xu=1033,Br=33776,kr=33777,Gr=33778,Hr=33779,kc=35840,Gc=35841,Hc=35842,Wc=35843,Mu=36196,Vc=37492,Xc=37496,qc=37808,Yc=37809,jc=37810,Zc=37811,Kc=37812,Jc=37813,Qc=37814,$c=37815,tl=37816,el=37817,nl=37818,il=37819,sl=37820,ol=37821,Wr=36492,rl=36494,al=36495,mf=36283,cl=36284,ll=36285,hl=36286,yu=3e3,Mi=3001,gf=3200,vf=3201,rc=0,xf=1,dn="",Yt="srgb",Wn="srgb-linear",ac="display-p3",Tr="display-p3-linear",mr="linear",pe="srgb",gr="rec709",vr="p3",Ai=7680,ul=519,Mf=512,yf=513,wf=514,wu=515,_f=516,Sf=517,bf=518,Ef=519,dl=35044,Tf=35048,fl="300 es",Ya=1035,Gn=2e3,xr=2001;class cs{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const We=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let pl=1234567;const Ns=Math.PI/180,Ws=180/Math.PI;function Si(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(We[s&255]+We[s>>8&255]+We[s>>16&255]+We[s>>24&255]+"-"+We[t&255]+We[t>>8&255]+"-"+We[t>>16&15|64]+We[t>>24&255]+"-"+We[e&63|128]+We[e>>8&255]+"-"+We[e>>16&255]+We[e>>24&255]+We[n&255]+We[n>>8&255]+We[n>>16&255]+We[n>>24&255]).toLowerCase()}function Ce(s,t,e){return Math.max(t,Math.min(e,s))}function cc(s,t){return(s%t+t)%t}function Af(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function Rf(s,t,e){return s!==t?(e-s)/(t-s):0}function Us(s,t,e){return(1-e)*s+e*t}function Cf(s,t,e,n){return Us(s,t,1-Math.exp(-e*n))}function Pf(s,t=1){return t-Math.abs(cc(s,t*2)-t)}function Lf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function If(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Df(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Nf(s,t){return s+Math.random()*(t-s)}function Uf(s){return s*(.5-Math.random())}function Ff(s){s!==void 0&&(pl=s);let t=pl+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Of(s){return s*Ns}function zf(s){return s*Ws}function ja(s){return(s&s-1)===0&&s!==0}function Bf(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Mr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function kf(s,t,e,n,i){const o=Math.cos,r=Math.sin,a=o(e/2),c=r(e/2),l=o((t+n)/2),h=r((t+n)/2),d=o((t-n)/2),u=r((t-n)/2),f=o((n-t)/2),p=r((n-t)/2);switch(i){case"XYX":s.set(a*h,c*d,c*u,a*l);break;case"YZY":s.set(c*u,a*h,c*d,a*l);break;case"ZXZ":s.set(c*d,c*u,a*h,a*l);break;case"XZX":s.set(a*h,c*p,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*p,a*l);break;case"ZYZ":s.set(c*p,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Yi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function je(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Xe={DEG2RAD:Ns,RAD2DEG:Ws,generateUUID:Si,clamp:Ce,euclideanModulo:cc,mapLinear:Af,inverseLerp:Rf,lerp:Us,damp:Cf,pingpong:Pf,smoothstep:Lf,smootherstep:If,randInt:Df,randFloat:Nf,randFloatSpread:Uf,seededRandom:Ff,degToRad:Of,radToDeg:zf,isPowerOfTwo:ja,ceilPowerOfTwo:Bf,floorPowerOfTwo:Mr,setQuaternionFromProperEuler:kf,normalize:je,denormalize:Yi};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class $t{constructor(t,e,n,i,o,r,a,c,l){$t.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l)}set(t,e,n,i,o,r,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=o,h[5]=c,h[6]=n,h[7]=r,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],x=i[1],M=i[4],y=i[7],w=i[2],S=i[5],b=i[8];return o[0]=r*v+a*x+c*w,o[3]=r*g+a*M+c*S,o[6]=r*m+a*y+c*b,o[1]=l*v+h*x+d*w,o[4]=l*g+h*M+d*S,o[7]=l*m+h*y+d*b,o[2]=u*v+f*x+p*w,o[5]=u*g+f*M+p*S,o[8]=u*m+f*y+p*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*r*h-e*a*l-n*o*h+n*a*c+i*o*l-i*r*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*r-a*l,u=a*c-h*o,f=l*o-r*c,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=d*v,t[1]=(i*l-h*n)*v,t[2]=(a*n-i*r)*v,t[3]=u*v,t[4]=(h*e-i*c)*v,t[5]=(i*o-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(r*e-n*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const c=Math.cos(o),l=Math.sin(o);return this.set(n*c,n*l,-n*(c*r+l*a)+r+t,-i*l,i*c,-i*(-l*r+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Vr.makeScale(t,e)),this}rotate(t){return this.premultiply(Vr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Vr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Vr=new $t;function _u(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function yr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Gf(){const s=yr("canvas");return s.style.display="block",s}const ml={};function Fs(s){s in ml||(ml[s]=!0,console.warn(s))}const gl=new $t().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),vl=new $t().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),io={[Wn]:{transfer:mr,primaries:gr,toReference:s=>s,fromReference:s=>s},[Yt]:{transfer:pe,primaries:gr,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[Tr]:{transfer:mr,primaries:vr,toReference:s=>s.applyMatrix3(vl),fromReference:s=>s.applyMatrix3(gl)},[ac]:{transfer:pe,primaries:vr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(vl),fromReference:s=>s.applyMatrix3(gl).convertLinearToSRGB()}},Hf=new Set([Wn,Tr]),oe={enabled:!0,_workingColorSpace:Wn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Hf.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=io[t].toReference,i=io[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return io[s].primaries},getTransfer:function(s){return s===dn?mr:io[s].transfer}};function $i(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Xr(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ri;class Su{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ri===void 0&&(Ri=yr("canvas")),Ri.width=t.width,Ri.height=t.height;const n=Ri.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ri}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=yr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=$i(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor($i(e[n]/255)*255):e[n]=$i(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Wf=0;class bu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Wf++}),this.uuid=Si(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(qr(i[r].image)):o.push(qr(i[r]))}else o=qr(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function qr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Su.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Vf=0;class ze extends cs{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=yn,i=yn,o=$e,r=ss,a=un,c=Hn,l=ze.DEFAULT_ANISOTROPY,h=dn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Si(),this.name="",this.source=new bu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new $t,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===Mi?Yt:dn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==du)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case le:t.x=t.x-Math.floor(t.x);break;case yn:t.x=t.x<0?0:1;break;case qa:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case le:t.y=t.y-Math.floor(t.y);break;case yn:t.y=t.y<0?0:1;break;case qa:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Yt?Mi:yu}set encoding(t){Fs("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===Mi?Yt:dn}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=du;ze.DEFAULT_ANISOTROPY=1;class Fe{constructor(t=0,e=0,n=0,i=1){Fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],p=c[9],v=c[2],g=c[6],m=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(l+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const M=(l+1)/2,y=(f+1)/2,w=(m+1)/2,S=(h+u)/4,b=(d+v)/4,T=(p+g)/4;return M>y&&M>w?M<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(M),i=S/n,o=b/n):y>w?y<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(y),n=S/i,o=T/i):w<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(w),n=b/o,i=T/o),this.set(n,i,o,e),this}let x=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((l+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Xf extends cs{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Fe(0,0,t,e),this.scissorTest=!1,this.viewport=new Fe(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Fs("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===Mi?Yt:dn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:$e,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ze(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new bu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Je extends Xf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Eu extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Se,this.minFilter=Se,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class qf extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Se,this.minFilter=Se,this.wrapR=yn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let Ge=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const u=o[r+0],f=o[r+1],p=o[r+2],v=o[r+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=p,t[e+3]=v;return}if(d!==v||c!==u||l!==f||h!==p){let g=1-a;const m=c*u+l*f+h*p+d*v,x=m>=0?1:-1,M=1-m*m;if(M>Number.EPSILON){const w=Math.sqrt(M),S=Math.atan2(w,m*x);g=Math.sin(g*S)/w,a=Math.sin(a*S)/w}const y=a*x;if(c=c*g+u*y,l=l*g+f*y,h=h*g+p*y,d=d*g+v*y,g===1-a){const w=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=w,l*=w,h*=w,d*=w}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=o[r],u=o[r+1],f=o[r+2],p=o[r+3];return t[e]=a*p+h*d+c*f-l*u,t[e+1]=c*p+h*u+l*d-a*f,t[e+2]=l*p+h*f+a*u-c*d,t[e+3]=h*p-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(o/2),u=c(n/2),f=c(i/2),p=c(o/2);switch(r){case"XYZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d+u*f*p;break;case"YZX":this._x=u*h*d+l*f*p,this._y=l*f*d+u*h*p,this._z=l*h*p-u*f*d,this._w=l*h*d-u*f*p;break;case"XZY":this._x=u*h*d-l*f*p,this._y=l*f*d-u*h*p,this._z=l*h*p+u*f*d,this._w=l*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(o-l)*f,this._z=(r-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(o+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(o-l)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(r-i)/f,this._x=(o+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Ce(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+r*a+i*l-o*c,this._y=i*h+r*c+o*a-n*l,this._z=o*h+r*l+n*c-i*a,this._w=r*h-n*a-i*c-o*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=o*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(o),n*Math.cos(o),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class O{constructor(t=0,e=0,n=0){O.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(xl.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(xl.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,c=t.w,l=2*(r*i-a*n),h=2*(a*e-o*i),d=2*(o*n-r*e);return this.x=e+c*l+r*d-a*h,this.y=n+c*h+a*l-o*d,this.z=i+c*d+o*h-r*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,c=e.z;return this.x=i*c-o*a,this.y=o*r-n*c,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Yr.copy(this).projectOnVector(t),this.sub(Yr)}reflect(t){return this.sub(Yr.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Ce(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Yr=new O,xl=new Ge;class bi{constructor(t=new O(1/0,1/0,1/0),e=new O(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(pn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(pn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=pn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,pn):pn.fromBufferAttribute(o,r),pn.applyMatrix4(t.matrixWorld),this.expandByPoint(pn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),so.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),so.copy(n.boundingBox)),so.applyMatrix4(t.matrixWorld),this.union(so)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,pn),pn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(ms),oo.subVectors(this.max,ms),Ci.subVectors(t.a,ms),Pi.subVectors(t.b,ms),Li.subVectors(t.c,ms),Xn.subVectors(Pi,Ci),qn.subVectors(Li,Pi),ai.subVectors(Ci,Li);let e=[0,-Xn.z,Xn.y,0,-qn.z,qn.y,0,-ai.z,ai.y,Xn.z,0,-Xn.x,qn.z,0,-qn.x,ai.z,0,-ai.x,-Xn.y,Xn.x,0,-qn.y,qn.x,0,-ai.y,ai.x,0];return!jr(e,Ci,Pi,Li,oo)||(e=[1,0,0,0,1,0,0,0,1],!jr(e,Ci,Pi,Li,oo))?!1:(ro.crossVectors(Xn,qn),e=[ro.x,ro.y,ro.z],jr(e,Ci,Pi,Li,oo))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,pn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(pn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Ln[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Ln[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Ln[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Ln[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Ln[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Ln[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Ln[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Ln[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Ln),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Ln=[new O,new O,new O,new O,new O,new O,new O,new O],pn=new O,so=new bi,Ci=new O,Pi=new O,Li=new O,Xn=new O,qn=new O,ai=new O,ms=new O,oo=new O,ro=new O,ci=new O;function jr(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){ci.fromArray(s,o);const a=i.x*Math.abs(ci.x)+i.y*Math.abs(ci.y)+i.z*Math.abs(ci.z),c=t.dot(ci),l=e.dot(ci),h=n.dot(ci);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Yf=new bi,gs=new O,Zr=new O;class Zs{constructor(t=new O,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Yf.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;gs.subVectors(t,this.center);const e=gs.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(gs,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Zr.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(gs.copy(t.center).add(Zr)),this.expandByPoint(gs.copy(t.center).sub(Zr))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const In=new O,Kr=new O,ao=new O,Yn=new O,Jr=new O,co=new O,Qr=new O;let jf=class{constructor(t=new O,e=new O(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,In)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=In.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(In.copy(this.origin).addScaledVector(this.direction,e),In.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Kr.copy(t).add(e).multiplyScalar(.5),ao.copy(e).sub(t).normalize(),Yn.copy(this.origin).sub(Kr);const o=t.distanceTo(e)*.5,r=-this.direction.dot(ao),a=Yn.dot(this.direction),c=-Yn.dot(ao),l=Yn.lengthSq(),h=Math.abs(1-r*r);let d,u,f,p;if(h>0)if(d=r*c-a,u=r*a-c,p=o*h,d>=0)if(u>=-p)if(u<=p){const v=1/h;d*=v,u*=v,f=d*(d+r*u+2*a)+u*(r*d+u+2*c)+l}else u=o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;else u=-o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-p?(d=Math.max(0,-(-r*o+a)),u=d>0?-o:Math.min(Math.max(-o,-c),o),f=-d*d+u*(u+2*c)+l):u<=p?(d=0,u=Math.min(Math.max(-o,-c),o),f=u*(u+2*c)+l):(d=Math.max(0,-(r*o+a)),u=d>0?o:Math.min(Math.max(-o,-c),o),f=-d*d+u*(u+2*c)+l);else u=r>0?-o:o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Kr).addScaledVector(ao,u),f}intersectSphere(t,e){In.subVectors(t.center,this.origin);const n=In.dot(this.direction),i=In.dot(In)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,c=n+r;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(o=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(o=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,In)!==null}intersectTriangle(t,e,n,i,o){Jr.subVectors(e,t),co.subVectors(n,t),Qr.crossVectors(Jr,co);let r=this.direction.dot(Qr),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;Yn.subVectors(this.origin,t);const c=a*this.direction.dot(co.crossVectors(Yn,co));if(c<0)return null;const l=a*this.direction.dot(Jr.cross(Yn));if(l<0||c+l>r)return null;const h=-a*Yn.dot(Qr);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class jt{constructor(t,e,n,i,o,r,a,c,l,h,d,u,f,p,v,g){jt.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,c,l,h,d,u,f,p,v,g)}set(t,e,n,i,o,r,a,c,l,h,d,u,f,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=o,m[5]=r,m[9]=a,m[13]=c,m[2]=l,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new jt().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Ii.setFromMatrixColumn(t,0).length(),o=1/Ii.setFromMatrixColumn(t,1).length(),r=1/Ii.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const u=r*h,f=r*d,p=a*h,v=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+p*l,e[5]=u-v*l,e[9]=-a*c,e[2]=v-u*l,e[6]=p+f*l,e[10]=r*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,p=l*h,v=l*d;e[0]=u+v*a,e[4]=p*a-f,e[8]=r*l,e[1]=r*d,e[5]=r*h,e[9]=-a,e[2]=f*a-p,e[6]=v+u*a,e[10]=r*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,p=l*h,v=l*d;e[0]=u-v*a,e[4]=-r*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=r*h,e[9]=v-u*a,e[2]=-r*l,e[6]=a,e[10]=r*c}else if(t.order==="ZYX"){const u=r*h,f=r*d,p=a*h,v=a*d;e[0]=c*h,e[4]=p*l-f,e[8]=u*l+v,e[1]=c*d,e[5]=v*l+u,e[9]=f*l-p,e[2]=-l,e[6]=a*c,e[10]=r*c}else if(t.order==="YZX"){const u=r*c,f=r*l,p=a*c,v=a*l;e[0]=c*h,e[4]=v-u*d,e[8]=p*d+f,e[1]=d,e[5]=r*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+p,e[10]=u-v*d}else if(t.order==="XZY"){const u=r*c,f=r*l,p=a*c,v=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+v,e[5]=r*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Zf,t,Kf)}lookAt(t,e,n){const i=this.elements;return sn.subVectors(t,e),sn.lengthSq()===0&&(sn.z=1),sn.normalize(),jn.crossVectors(n,sn),jn.lengthSq()===0&&(Math.abs(n.z)===1?sn.x+=1e-4:sn.z+=1e-4,sn.normalize(),jn.crossVectors(n,sn)),jn.normalize(),lo.crossVectors(sn,jn),i[0]=jn.x,i[4]=lo.x,i[8]=sn.x,i[1]=jn.y,i[5]=lo.y,i[9]=sn.y,i[2]=jn.z,i[6]=lo.z,i[10]=sn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],M=n[7],y=n[11],w=n[15],S=i[0],b=i[4],T=i[8],_=i[12],E=i[1],L=i[5],P=i[9],U=i[13],C=i[2],D=i[6],F=i[10],V=i[14],G=i[3],B=i[7],q=i[11],H=i[15];return o[0]=r*S+a*E+c*C+l*G,o[4]=r*b+a*L+c*D+l*B,o[8]=r*T+a*P+c*F+l*q,o[12]=r*_+a*U+c*V+l*H,o[1]=h*S+d*E+u*C+f*G,o[5]=h*b+d*L+u*D+f*B,o[9]=h*T+d*P+u*F+f*q,o[13]=h*_+d*U+u*V+f*H,o[2]=p*S+v*E+g*C+m*G,o[6]=p*b+v*L+g*D+m*B,o[10]=p*T+v*P+g*F+m*q,o[14]=p*_+v*U+g*V+m*H,o[3]=x*S+M*E+y*C+w*G,o[7]=x*b+M*L+y*D+w*B,o[11]=x*T+M*P+y*F+w*q,o[15]=x*_+M*U+y*V+w*H,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15];return p*(+o*c*d-i*l*d-o*a*u+n*l*u+i*a*f-n*c*f)+v*(+e*c*f-e*l*u+o*r*u-i*r*f+i*l*h-o*c*h)+g*(+e*l*d-e*a*f-o*r*d+n*r*f+o*a*h-n*l*h)+m*(-i*a*h-e*c*d+e*a*u+i*r*d-n*r*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],x=d*g*l-v*u*l+v*c*f-a*g*f-d*c*m+a*u*m,M=p*u*l-h*g*l-p*c*f+r*g*f+h*c*m-r*u*m,y=h*v*l-p*d*l+p*a*f-r*v*f-h*a*m+r*d*m,w=p*d*c-h*v*c-p*a*u+r*v*u+h*a*g-r*d*g,S=e*x+n*M+i*y+o*w;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/S;return t[0]=x*b,t[1]=(v*u*o-d*g*o-v*i*f+n*g*f+d*i*m-n*u*m)*b,t[2]=(a*g*o-v*c*o+v*i*l-n*g*l-a*i*m+n*c*m)*b,t[3]=(d*c*o-a*u*o-d*i*l+n*u*l+a*i*f-n*c*f)*b,t[4]=M*b,t[5]=(h*g*o-p*u*o+p*i*f-e*g*f-h*i*m+e*u*m)*b,t[6]=(p*c*o-r*g*o-p*i*l+e*g*l+r*i*m-e*c*m)*b,t[7]=(r*u*o-h*c*o+h*i*l-e*u*l-r*i*f+e*c*f)*b,t[8]=y*b,t[9]=(p*d*o-h*v*o-p*n*f+e*v*f+h*n*m-e*d*m)*b,t[10]=(r*v*o-p*a*o+p*n*l-e*v*l-r*n*m+e*a*m)*b,t[11]=(h*a*o-r*d*o-h*n*l+e*d*l+r*n*f-e*a*f)*b,t[12]=w*b,t[13]=(h*v*i-p*d*i+p*n*u-e*v*u-h*n*g+e*d*g)*b,t[14]=(p*a*i-r*v*i-p*n*c+e*v*c+r*n*g-e*a*g)*b,t[15]=(r*d*i-h*a*i+h*n*c-e*d*c-r*n*u+e*a*u)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,c=t.z,l=o*r,h=o*a;return this.set(l*r+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*r,0,l*c-i*a,h*c+i*r,o*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,c=e._w,l=o+o,h=r+r,d=a+a,u=o*l,f=o*h,p=o*d,v=r*h,g=r*d,m=a*d,x=c*l,M=c*h,y=c*d,w=n.x,S=n.y,b=n.z;return i[0]=(1-(v+m))*w,i[1]=(f+y)*w,i[2]=(p-M)*w,i[3]=0,i[4]=(f-y)*S,i[5]=(1-(u+m))*S,i[6]=(g+x)*S,i[7]=0,i[8]=(p+M)*b,i[9]=(g-x)*b,i[10]=(1-(u+v))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=Ii.set(i[0],i[1],i[2]).length();const r=Ii.set(i[4],i[5],i[6]).length(),a=Ii.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],mn.copy(this);const l=1/o,h=1/r,d=1/a;return mn.elements[0]*=l,mn.elements[1]*=l,mn.elements[2]*=l,mn.elements[4]*=h,mn.elements[5]*=h,mn.elements[6]*=h,mn.elements[8]*=d,mn.elements[9]*=d,mn.elements[10]*=d,e.setFromRotationMatrix(mn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=Gn){const c=this.elements,l=2*o/(e-t),h=2*o/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,p;if(a===Gn)f=-(r+o)/(r-o),p=-2*r*o/(r-o);else if(a===xr)f=-r/(r-o),p=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=p,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=Gn){const c=this.elements,l=1/(e-t),h=1/(n-i),d=1/(r-o),u=(e+t)*l,f=(n+i)*h;let p,v;if(a===Gn)p=(r+o)*d,v=-2*d;else if(a===xr)p=o*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-p,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Ii=new O,mn=new jt,Zf=new O(0,0,0),Kf=new O(1,1,1),jn=new O,lo=new O,sn=new O,Ml=new jt,yl=new Ge;class en{constructor(t=0,e=0,n=0,i=en.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Ce(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Ce(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Ce(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,l)):(this._y=0,this._z=Math.atan2(c,o));break;case"ZYX":this._y=Math.asin(-Ce(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,o)):(this._x=0,this._z=Math.atan2(-r,l));break;case"YZX":this._z=Math.asin(Ce(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Ce(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return Ml.makeRotationFromQuaternion(t),this.setFromRotationMatrix(Ml,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return yl.setFromEuler(this),this.setFromQuaternion(yl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}en.DEFAULT_ORDER="XYZ";class Tu{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Jf=0;const wl=new O,Di=new Ge,Dn=new jt,ho=new O,vs=new O,Qf=new O,$f=new Ge,_l=new O(1,0,0),Sl=new O(0,1,0),bl=new O(0,0,1),tp={type:"added"},ep={type:"removed"};class Be extends cs{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Jf++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Be.DEFAULT_UP.clone();const t=new O,e=new en,n=new Ge,i=new O(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new jt},normalMatrix:{value:new $t}}),this.matrix=new jt,this.matrixWorld=new jt,this.matrixAutoUpdate=Be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Tu,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.multiply(Di),this}rotateOnWorldAxis(t,e){return Di.setFromAxisAngle(t,e),this.quaternion.premultiply(Di),this}rotateX(t){return this.rotateOnAxis(_l,t)}rotateY(t){return this.rotateOnAxis(Sl,t)}rotateZ(t){return this.rotateOnAxis(bl,t)}translateOnAxis(t,e){return wl.copy(t).applyQuaternion(this.quaternion),this.position.add(wl.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(_l,t)}translateY(t){return this.translateOnAxis(Sl,t)}translateZ(t){return this.translateOnAxis(bl,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Dn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?ho.copy(t):ho.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),vs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Dn.lookAt(vs,ho,this.up):Dn.lookAt(ho,vs,this.up),this.quaternion.setFromRotationMatrix(Dn),i&&(Dn.extractRotation(i.matrixWorld),Di.setFromRotationMatrix(Dn),this.quaternion.premultiply(Di.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(tp)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(ep)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Dn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Dn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Dn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,t,Qf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(vs,$f,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++){const a=i[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];o(t.shapes,d)}else o(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(o(t.materials,this.material[c]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(o(t.animations,c))}}if(e){const a=r(t.geometries),c=r(t.materials),l=r(t.textures),h=r(t.images),d=r(t.shapes),u=r(t.skeletons),f=r(t.animations),p=r(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Be.DEFAULT_UP=new O(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const gn=new O,Nn=new O,$r=new O,Un=new O,Ni=new O,Ui=new O,El=new O,ta=new O,ea=new O,na=new O;let uo=!1;class xn{constructor(t=new O,e=new O,n=new O){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),gn.subVectors(t,e),i.cross(gn);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){gn.subVectors(i,e),Nn.subVectors(n,e),$r.subVectors(t,e);const r=gn.dot(gn),a=gn.dot(Nn),c=gn.dot($r),l=Nn.dot(Nn),h=Nn.dot($r),d=r*l-a*a;if(d===0)return o.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,p=(r*h-a*c)*u;return o.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Un)===null?!1:Un.x>=0&&Un.y>=0&&Un.x+Un.y<=1}static getUV(t,e,n,i,o,r,a,c){return uo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),uo=!0),this.getInterpolation(t,e,n,i,o,r,a,c)}static getInterpolation(t,e,n,i,o,r,a,c){return this.getBarycoord(t,e,n,i,Un)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(o,Un.x),c.addScaledVector(r,Un.y),c.addScaledVector(a,Un.z),c)}static isFrontFacing(t,e,n,i){return gn.subVectors(n,e),Nn.subVectors(t,e),gn.cross(Nn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return gn.subVectors(this.c,this.b),Nn.subVectors(this.a,this.b),gn.cross(Nn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return xn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return xn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,o){return uo===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),uo=!0),xn.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}getInterpolation(t,e,n,i,o){return xn.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return xn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return xn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;Ni.subVectors(i,n),Ui.subVectors(o,n),ta.subVectors(t,n);const c=Ni.dot(ta),l=Ui.dot(ta);if(c<=0&&l<=0)return e.copy(n);ea.subVectors(t,i);const h=Ni.dot(ea),d=Ui.dot(ea);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return r=c/(c-h),e.copy(n).addScaledVector(Ni,r);na.subVectors(t,o);const f=Ni.dot(na),p=Ui.dot(na);if(p>=0&&f<=p)return e.copy(o);const v=f*l-c*p;if(v<=0&&l>=0&&p<=0)return a=l/(l-p),e.copy(n).addScaledVector(Ui,a);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return El.subVectors(o,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(El,a);const m=1/(g+v+u);return r=v*m,a=u*m,e.copy(n).addScaledVector(Ni,r).addScaledVector(Ui,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Au={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},fo={h:0,s:0,l:0};function ia(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Dt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Yt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,oe.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=oe.workingColorSpace){return this.r=t,this.g=e,this.b=n,oe.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=oe.workingColorSpace){if(t=cc(t,1),e=Ce(e,0,1),n=Ce(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=ia(r,o,t+1/3),this.g=ia(r,o,t),this.b=ia(r,o,t-1/3)}return oe.toWorkingColorSpace(this,i),this}setStyle(t,e=Yt){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Yt){const n=Au[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=$i(t.r),this.g=$i(t.g),this.b=$i(t.b),this}copyLinearToSRGB(t){return this.r=Xr(t.r),this.g=Xr(t.g),this.b=Xr(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Yt){return oe.fromWorkingColorSpace(Ve.copy(this),t),Math.round(Ce(Ve.r*255,0,255))*65536+Math.round(Ce(Ve.g*255,0,255))*256+Math.round(Ce(Ve.b*255,0,255))}getHexString(t=Yt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=oe.workingColorSpace){oe.fromWorkingColorSpace(Ve.copy(this),e);const n=Ve.r,i=Ve.g,o=Ve.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let c,l;const h=(a+r)/2;if(a===r)c=0,l=0;else{const d=r-a;switch(l=h<=.5?d/(r+a):d/(2-r-a),r){case n:c=(i-o)/d+(i<o?6:0);break;case i:c=(o-n)/d+2;break;case o:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=oe.workingColorSpace){return oe.fromWorkingColorSpace(Ve.copy(this),e),t.r=Ve.r,t.g=Ve.g,t.b=Ve.b,t}getStyle(t=Yt){oe.fromWorkingColorSpace(Ve.copy(this),t);const e=Ve.r,n=Ve.g,i=Ve.b;return t!==Yt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Zn),this.setHSL(Zn.h+t,Zn.s+e,Zn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Zn),t.getHSL(fo);const n=Us(Zn.h,fo.h,e),i=Us(Zn.s,fo.s,e),o=Us(Zn.l,fo.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Ve=new Dt;Dt.NAMES=Au;let np=0,ls=class extends cs{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:np++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=Qi,this.side=ni,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=ka,this.blendDst=Ga,this.blendEquation=Mn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Dt(0,0,0),this.blendAlpha=0,this.depthFunc=pr,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=ul,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ai,this.stencilZFail=Ai,this.stencilZPass=Ai,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Qi&&(n.blending=this.blending),this.side!==ni&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==ka&&(n.blendSrc=this.blendSrc),this.blendDst!==Ga&&(n.blendDst=this.blendDst),this.blendEquation!==Mn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==pr&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==ul&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ai&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ai&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ai&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const c=o[a];delete c.metadata,r.push(c)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class Ei extends ls{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Dt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=au,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const Te=new O,po=new nt;class ie{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=dl,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Qn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)po.fromBufferAttribute(this,e),po.applyMatrix3(t),this.setXY(e,po.x,po.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix3(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyMatrix4(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.applyNormalMatrix(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)Te.fromBufferAttribute(this,e),Te.transformDirection(t),this.setXYZ(e,Te.x,Te.y,Te.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Yi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=je(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Yi(e,this.array)),e}setX(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Yi(e,this.array)),e}setY(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Yi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Yi(e,this.array)),e}setW(t,e){return this.normalized&&(e=je(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),i=je(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=je(e,this.array),n=je(n,this.array),i=je(i,this.array),o=je(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==dl&&(t.usage=this.usage),t}}class Ru extends ie{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class Cu extends ie{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ee extends ie{constructor(t,e,n){super(new Float32Array(t),e,n)}}let ip=0;const hn=new jt,sa=new Be,Fi=new O,on=new bi,xs=new bi,Ne=new O;class he extends cs{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ip++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(_u(t)?Cu:Ru)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new $t().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return hn.makeRotationFromQuaternion(t),this.applyMatrix4(hn),this}rotateX(t){return hn.makeRotationX(t),this.applyMatrix4(hn),this}rotateY(t){return hn.makeRotationY(t),this.applyMatrix4(hn),this}rotateZ(t){return hn.makeRotationZ(t),this.applyMatrix4(hn),this}translate(t,e,n){return hn.makeTranslation(t,e,n),this.applyMatrix4(hn),this}scale(t,e,n){return hn.makeScale(t,e,n),this.applyMatrix4(hn),this}lookAt(t){return sa.lookAt(t),sa.updateMatrix(),this.applyMatrix4(sa.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Fi).negate(),this.translate(Fi.x,Fi.y,Fi.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new ee(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new bi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new O(-1/0,-1/0,-1/0),new O(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];on.setFromBufferAttribute(o),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,on.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,on.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(on.min),this.boundingBox.expandByPoint(on.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Zs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new O,1/0);return}if(t){const n=this.boundingSphere.center;if(on.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];xs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(on.min,xs.min),on.expandByPoint(Ne),Ne.addVectors(on.max,xs.max),on.expandByPoint(Ne)):(on.expandByPoint(xs.min),on.expandByPoint(xs.max))}on.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)Ne.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(Ne));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ne.fromBufferAttribute(a,l),c&&(Fi.fromBufferAttribute(t,l),Ne.add(Fi)),i=Math.max(i,n.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,o=e.normal.array,r=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ie(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let E=0;E<a;E++)l[E]=new O,h[E]=new O;const d=new O,u=new O,f=new O,p=new nt,v=new nt,g=new nt,m=new O,x=new O;function M(E,L,P){d.fromArray(i,E*3),u.fromArray(i,L*3),f.fromArray(i,P*3),p.fromArray(r,E*2),v.fromArray(r,L*2),g.fromArray(r,P*2),u.sub(d),f.sub(d),v.sub(p),g.sub(p);const U=1/(v.x*g.y-g.x*v.y);isFinite(U)&&(m.copy(u).multiplyScalar(g.y).addScaledVector(f,-v.y).multiplyScalar(U),x.copy(f).multiplyScalar(v.x).addScaledVector(u,-g.x).multiplyScalar(U),l[E].add(m),l[L].add(m),l[P].add(m),h[E].add(x),h[L].add(x),h[P].add(x))}let y=this.groups;y.length===0&&(y=[{start:0,count:n.length}]);for(let E=0,L=y.length;E<L;++E){const P=y[E],U=P.start,C=P.count;for(let D=U,F=U+C;D<F;D+=3)M(n[D+0],n[D+1],n[D+2])}const w=new O,S=new O,b=new O,T=new O;function _(E){b.fromArray(o,E*3),T.copy(b);const L=l[E];w.copy(L),w.sub(b.multiplyScalar(b.dot(L))).normalize(),S.crossVectors(T,L);const U=S.dot(h[E])<0?-1:1;c[E*4]=w.x,c[E*4+1]=w.y,c[E*4+2]=w.z,c[E*4+3]=U}for(let E=0,L=y.length;E<L;++E){const P=y[E],U=P.start,C=P.count;for(let D=U,F=U+C;D<F;D+=3)_(n[D+0]),_(n[D+1]),_(n[D+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ie(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new O,o=new O,r=new O,a=new O,c=new O,l=new O,h=new O,d=new O;if(t)for(let u=0,f=t.count;u<f;u+=3){const p=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),h.subVectors(r,o),d.subVectors(i,o),h.cross(d),a.fromBufferAttribute(n,p),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,g),a.add(h),c.add(h),l.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(g,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),o.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),h.subVectors(r,o),d.subVectors(i,o),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,p=0;for(let v=0,g=c.length;v<g;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let m=0;m<h;m++)u[p++]=l[f++]}return new ie(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new he,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const o=this.morphAttributes;for(const a in o){const c=[],l=o[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,c=r.length;a<c;a++){const l=r[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let o=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const o=t.morphAttributes;for(const l in o){const h=[],d=o[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let l=0,h=r.length;l<h;l++){const d=r[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const Tl=new jt,li=new jf,mo=new Zs,Al=new O,Oi=new O,zi=new O,Bi=new O,oa=new O,go=new O,vo=new nt,xo=new nt,Mo=new nt,Rl=new O,Cl=new O,Pl=new O,yo=new O,wo=new O;class Z extends Be{constructor(t=new he,e=new Ei){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){go.set(0,0,0);for(let c=0,l=o.length;c<l;c++){const h=a[c],d=o[c];h!==0&&(oa.fromBufferAttribute(d,t),r?go.addScaledVector(oa,h):go.addScaledVector(oa.sub(e),h))}e.add(go)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),mo.copy(n.boundingSphere),mo.applyMatrix4(o),li.copy(t.ray).recast(t.near),!(mo.containsPoint(li.origin)===!1&&(li.intersectSphere(mo,Al)===null||li.origin.distanceToSquared(Al)>(t.far-t.near)**2))&&(Tl.copy(o).invert(),li.copy(t.ray).applyMatrix4(Tl),!(n.boundingBox!==null&&li.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,li)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,c=o.attributes.position,l=o.attributes.uv,h=o.attributes.uv1,d=o.attributes.normal,u=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],x=Math.max(g.start,f.start),M=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,w=M;y<w;y+=3){const S=a.getX(y),b=a.getX(y+1),T=a.getX(y+2);i=_o(this,m,t,n,l,h,d,S,b,T),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=a.getX(g),M=a.getX(g+1),y=a.getX(g+2);i=_o(this,r,t,n,l,h,d,x,M,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],x=Math.max(g.start,f.start),M=Math.min(c.count,Math.min(g.start+g.count,f.start+f.count));for(let y=x,w=M;y<w;y+=3){const S=y,b=y+1,T=y+2;i=_o(this,m,t,n,l,h,d,S,b,T),i&&(i.faceIndex=Math.floor(y/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=g,M=g+1,y=g+2;i=_o(this,r,t,n,l,h,d,x,M,y),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function sp(s,t,e,n,i,o,r,a){let c;if(t.side===Ke?c=n.intersectTriangle(r,o,i,!0,a):c=n.intersectTriangle(i,o,r,t.side===ni,a),c===null)return null;wo.copy(a),wo.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(wo);return l<e.near||l>e.far?null:{distance:l,point:wo.clone(),object:s}}function _o(s,t,e,n,i,o,r,a,c,l){s.getVertexPosition(a,Oi),s.getVertexPosition(c,zi),s.getVertexPosition(l,Bi);const h=sp(s,t,e,n,Oi,zi,Bi,yo);if(h){i&&(vo.fromBufferAttribute(i,a),xo.fromBufferAttribute(i,c),Mo.fromBufferAttribute(i,l),h.uv=xn.getInterpolation(yo,Oi,zi,Bi,vo,xo,Mo,new nt)),o&&(vo.fromBufferAttribute(o,a),xo.fromBufferAttribute(o,c),Mo.fromBufferAttribute(o,l),h.uv1=xn.getInterpolation(yo,Oi,zi,Bi,vo,xo,Mo,new nt),h.uv2=h.uv1),r&&(Rl.fromBufferAttribute(r,a),Cl.fromBufferAttribute(r,c),Pl.fromBufferAttribute(r,l),h.normal=xn.getInterpolation(yo,Oi,zi,Bi,Rl,Cl,Pl,new O),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new O,materialIndex:0};xn.getNormal(Oi,zi,Bi,d.normal),h.face=d}return h}class Mt extends he{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const c=[],l=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,e,t,r,o,0),p("z","y","x",1,-1,n,e,-t,r,o,1),p("x","z","y",1,1,t,n,e,i,r,2),p("x","z","y",1,-1,t,n,-e,i,r,3),p("x","y","z",1,-1,t,e,n,i,o,4),p("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(c),this.setAttribute("position",new ee(l,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(d,2));function p(v,g,m,x,M,y,w,S,b,T,_){const E=y/b,L=w/T,P=y/2,U=w/2,C=S/2,D=b+1,F=T+1;let V=0,G=0;const B=new O;for(let q=0;q<F;q++){const H=q*L-U;for(let X=0;X<D;X++){const W=X*E-P;B[v]=W*x,B[g]=H*M,B[m]=C,l.push(B.x,B.y,B.z),B[v]=0,B[g]=0,B[m]=S>0?1:-1,h.push(B.x,B.y,B.z),d.push(X/b),d.push(1-q/T),V+=1}}for(let q=0;q<T;q++)for(let H=0;H<b;H++){const X=u+H+D*q,W=u+H+D*(q+1),et=u+(H+1)+D*(q+1),ut=u+(H+1)+D*q;c.push(X,W,ut),c.push(W,et,ut),G+=6}a.addGroup(f,G,_),f+=G,u+=V}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Mt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function os(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ze(s){const t={};for(let e=0;e<s.length;e++){const n=os(s[e]);for(const i in n)t[i]=n[i]}return t}function op(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Pu(s){return s.getRenderTarget()===null?s.outputColorSpace:oe.workingColorSpace}const tn={clone:os,merge:Ze};var rp=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ap=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Me extends ls{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=rp,this.fragmentShader=ap,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=os(t.uniforms),this.uniformsGroups=op(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Lu extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new jt,this.projectionMatrix=new jt,this.projectionMatrixInverse=new jt,this.coordinateSystem=Gn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class rn extends Lu{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Ws*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Ns*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Ws*2*Math.atan(Math.tan(Ns*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Ns*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const c=r.fullWidth,l=r.fullHeight;o+=r.offsetX*i/c,e-=r.offsetY*n/l,i*=r.width/c,n*=r.height/l}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const ki=-90,Gi=1;class cp extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new rn(ki,Gi,t,e);i.layers=this.layers,this.add(i);const o=new rn(ki,Gi,t,e);o.layers=this.layers,this.add(o);const r=new rn(ki,Gi,t,e);r.layers=this.layers,this.add(r);const a=new rn(ki,Gi,t,e);a.layers=this.layers,this.add(a);const c=new rn(ki,Gi,t,e);c.layers=this.layers,this.add(c);const l=new rn(ki,Gi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,c]=e;for(const l of e)this.remove(l);if(t===Gn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Iu extends ze{constructor(t,e,n,i,o,r,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:ns,super(t,e,n,i,o,r,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class lp extends Je{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Fs("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===Mi?Yt:dn),this.texture=new Iu(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:$e}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Mt(5,5,5),o=new Me({name:"CubemapFromEquirect",uniforms:os(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ke,blending:Oe});o.uniforms.tEquirect.value=e;const r=new Z(i,o),a=e.minFilter;return e.minFilter===ss&&(e.minFilter=$e),new cp(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const ra=new O,hp=new O,up=new $t;class pi{constructor(t=new O(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=ra.subVectors(n,e).cross(hp.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(ra),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||up.getNormalMatrix(t),i=this.coplanarPoint(ra).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const hi=new Zs,So=new O;class lc{constructor(t=new pi,e=new pi,n=new pi,i=new pi,o=new pi,r=new pi){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=Gn){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],c=i[3],l=i[4],h=i[5],d=i[6],u=i[7],f=i[8],p=i[9],v=i[10],g=i[11],m=i[12],x=i[13],M=i[14],y=i[15];if(n[0].setComponents(c-o,u-l,g-f,y-m).normalize(),n[1].setComponents(c+o,u+l,g+f,y+m).normalize(),n[2].setComponents(c+r,u+h,g+p,y+x).normalize(),n[3].setComponents(c-r,u-h,g-p,y-x).normalize(),n[4].setComponents(c-a,u-d,g-v,y-M).normalize(),e===Gn)n[5].setComponents(c+a,u+d,g+v,y+M).normalize();else if(e===xr)n[5].setComponents(a,d,v,M).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),hi.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),hi.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(hi)}intersectsSprite(t){return hi.center.set(0,0,0),hi.radius=.7071067811865476,hi.applyMatrix4(t.matrixWorld),this.intersectsSphere(hi)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(So.x=i.normal.x>0?t.max.x:t.min.x,So.y=i.normal.y>0?t.max.y:t.min.y,So.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(So)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Du(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function dp(s,t){const e=t.isWebGL2,n=new WeakMap;function i(l,h){const d=l.array,u=l.usage,f=d.byteLength,p=s.createBuffer();s.bindBuffer(h,p),s.bufferData(h,d,u),l.onUploadCallback();let v;if(d instanceof Float32Array)v=s.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=s.SHORT;else if(d instanceof Uint32Array)v=s.UNSIGNED_INT;else if(d instanceof Int32Array)v=s.INT;else if(d instanceof Int8Array)v=s.BYTE;else if(d instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:p,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:f}}function o(l,h,d){const u=h.array,f=h._updateRange,p=h.updateRanges;if(s.bindBuffer(d,l),f.count===-1&&p.length===0&&s.bufferSubData(d,0,u),p.length!==0){for(let v=0,g=p.length;v<g;v++){const m=p[v];e?s.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):s.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function r(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const u=n.get(l);(!u||u.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const d=n.get(l);if(d===void 0)n.set(l,i(l,h));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,l,h),d.version=l.version}}return{get:r,remove:a,update:c}}class ge extends he{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const x=m*u-r;for(let M=0;M<l;M++){const y=M*d-o;p.push(y,-x,0),v.push(0,0,1),g.push(M/a),g.push(1-m/c)}}for(let m=0;m<c;m++)for(let x=0;x<a;x++){const M=x+l*m,y=x+l*(m+1),w=x+1+l*(m+1),S=x+1+l*m;f.push(M,y,S),f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new ee(p,3)),this.setAttribute("normal",new ee(v,3)),this.setAttribute("uv",new ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ge(t.width,t.height,t.widthSegments,t.heightSegments)}}var fp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,pp=`#ifdef USE_ALPHAHASH
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
#endif`,mp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,gp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,vp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,xp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,Mp=`#ifdef USE_AOMAP
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
#endif`,yp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,wp=`#ifdef USE_BATCHING
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
#endif`,_p=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,Sp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,bp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,Ep=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,Tp=`#ifdef USE_IRIDESCENCE
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
#endif`,Ap=`#ifdef USE_BUMPMAP
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
#endif`,Rp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Cp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,Pp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,Lp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ip=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Dp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Np=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Up=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Fp=`#define PI 3.141592653589793
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
} // validated`,Op=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,zp=`vec3 transformedNormal = objectNormal;
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
#endif`,Bp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,kp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Gp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Hp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Wp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Vp=`
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
}`,Xp=`#ifdef USE_ENVMAP
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
#endif`,qp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Yp=`#ifdef USE_ENVMAP
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
#endif`,jp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Zp=`#ifdef USE_ENVMAP
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
#endif`,Kp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Jp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Qp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,$p=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,t0=`#ifdef USE_GRADIENTMAP
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
}`,e0=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,n0=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,i0=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,s0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,o0=`uniform bool receiveShadow;
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
#endif`,r0=`#ifdef USE_ENVMAP
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
#endif`,a0=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,c0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,l0=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,h0=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,u0=`PhysicalMaterial material;
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
#endif`,d0=`struct PhysicalMaterial {
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
}`,f0=`
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
#endif`,p0=`#if defined( RE_IndirectDiffuse )
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
#endif`,m0=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,g0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,v0=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,x0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,M0=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,y0=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,w0=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,_0=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,S0=`#if defined( USE_POINTS_UV )
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
#endif`,b0=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,E0=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,T0=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,A0=`#ifdef USE_MORPHNORMALS
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
#endif`,R0=`#ifdef USE_MORPHTARGETS
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
#endif`,C0=`#ifdef USE_MORPHTARGETS
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
#endif`,P0=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,L0=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,I0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,D0=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,N0=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,U0=`#ifdef USE_NORMALMAP
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
#endif`,F0=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,O0=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,z0=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,B0=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,k0=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,G0=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,H0=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,W0=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,V0=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,X0=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,q0=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Y0=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,j0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Z0=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,K0=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,J0=`float getShadowMask() {
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
}`,Q0=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,$0=`#ifdef USE_SKINNING
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
#endif`,tm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,em=`#ifdef USE_SKINNING
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
#endif`,nm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,im=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,sm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,om=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,rm=`#ifdef USE_TRANSMISSION
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
#endif`,am=`#ifdef USE_TRANSMISSION
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
#endif`,cm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,lm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,hm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,um=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const dm=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,fm=`uniform sampler2D t2D;
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
}`,pm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,mm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,gm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,vm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,xm=`#include <common>
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
}`,Mm=`#if DEPTH_PACKING == 3200
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
}`,ym=`#define DISTANCE
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
}`,wm=`#define DISTANCE
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
}`,_m=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,Sm=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,bm=`uniform float scale;
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
}`,Em=`uniform vec3 diffuse;
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
}`,Tm=`#include <common>
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
}`,Am=`uniform vec3 diffuse;
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
}`,Rm=`#define LAMBERT
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
}`,Cm=`#define LAMBERT
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
}`,Pm=`#define MATCAP
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
}`,Lm=`#define MATCAP
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
}`,Im=`#define NORMAL
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
}`,Dm=`#define NORMAL
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
}`,Nm=`#define PHONG
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
}`,Um=`#define PHONG
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
}`,Fm=`#define STANDARD
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
}`,Om=`#define STANDARD
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
}`,zm=`#define TOON
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
}`,Bm=`#define TOON
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
}`,km=`uniform float size;
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
}`,Gm=`uniform vec3 diffuse;
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
}`,Hm=`#include <common>
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
}`,Wm=`uniform vec3 color;
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
}`,Vm=`uniform float rotation;
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
}`,Xm=`uniform vec3 diffuse;
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
}`,Kt={alphahash_fragment:fp,alphahash_pars_fragment:pp,alphamap_fragment:mp,alphamap_pars_fragment:gp,alphatest_fragment:vp,alphatest_pars_fragment:xp,aomap_fragment:Mp,aomap_pars_fragment:yp,batching_pars_vertex:wp,batching_vertex:_p,begin_vertex:Sp,beginnormal_vertex:bp,bsdfs:Ep,iridescence_fragment:Tp,bumpmap_pars_fragment:Ap,clipping_planes_fragment:Rp,clipping_planes_pars_fragment:Cp,clipping_planes_pars_vertex:Pp,clipping_planes_vertex:Lp,color_fragment:Ip,color_pars_fragment:Dp,color_pars_vertex:Np,color_vertex:Up,common:Fp,cube_uv_reflection_fragment:Op,defaultnormal_vertex:zp,displacementmap_pars_vertex:Bp,displacementmap_vertex:kp,emissivemap_fragment:Gp,emissivemap_pars_fragment:Hp,colorspace_fragment:Wp,colorspace_pars_fragment:Vp,envmap_fragment:Xp,envmap_common_pars_fragment:qp,envmap_pars_fragment:Yp,envmap_pars_vertex:jp,envmap_physical_pars_fragment:r0,envmap_vertex:Zp,fog_vertex:Kp,fog_pars_vertex:Jp,fog_fragment:Qp,fog_pars_fragment:$p,gradientmap_pars_fragment:t0,lightmap_fragment:e0,lightmap_pars_fragment:n0,lights_lambert_fragment:i0,lights_lambert_pars_fragment:s0,lights_pars_begin:o0,lights_toon_fragment:a0,lights_toon_pars_fragment:c0,lights_phong_fragment:l0,lights_phong_pars_fragment:h0,lights_physical_fragment:u0,lights_physical_pars_fragment:d0,lights_fragment_begin:f0,lights_fragment_maps:p0,lights_fragment_end:m0,logdepthbuf_fragment:g0,logdepthbuf_pars_fragment:v0,logdepthbuf_pars_vertex:x0,logdepthbuf_vertex:M0,map_fragment:y0,map_pars_fragment:w0,map_particle_fragment:_0,map_particle_pars_fragment:S0,metalnessmap_fragment:b0,metalnessmap_pars_fragment:E0,morphcolor_vertex:T0,morphnormal_vertex:A0,morphtarget_pars_vertex:R0,morphtarget_vertex:C0,normal_fragment_begin:P0,normal_fragment_maps:L0,normal_pars_fragment:I0,normal_pars_vertex:D0,normal_vertex:N0,normalmap_pars_fragment:U0,clearcoat_normal_fragment_begin:F0,clearcoat_normal_fragment_maps:O0,clearcoat_pars_fragment:z0,iridescence_pars_fragment:B0,opaque_fragment:k0,packing:G0,premultiplied_alpha_fragment:H0,project_vertex:W0,dithering_fragment:V0,dithering_pars_fragment:X0,roughnessmap_fragment:q0,roughnessmap_pars_fragment:Y0,shadowmap_pars_fragment:j0,shadowmap_pars_vertex:Z0,shadowmap_vertex:K0,shadowmask_pars_fragment:J0,skinbase_vertex:Q0,skinning_pars_vertex:$0,skinning_vertex:tm,skinnormal_vertex:em,specularmap_fragment:nm,specularmap_pars_fragment:im,tonemapping_fragment:sm,tonemapping_pars_fragment:om,transmission_fragment:rm,transmission_pars_fragment:am,uv_pars_fragment:cm,uv_pars_vertex:lm,uv_vertex:hm,worldpos_vertex:um,background_vert:dm,background_frag:fm,backgroundCube_vert:pm,backgroundCube_frag:mm,cube_vert:gm,cube_frag:vm,depth_vert:xm,depth_frag:Mm,distanceRGBA_vert:ym,distanceRGBA_frag:wm,equirect_vert:_m,equirect_frag:Sm,linedashed_vert:bm,linedashed_frag:Em,meshbasic_vert:Tm,meshbasic_frag:Am,meshlambert_vert:Rm,meshlambert_frag:Cm,meshmatcap_vert:Pm,meshmatcap_frag:Lm,meshnormal_vert:Im,meshnormal_frag:Dm,meshphong_vert:Nm,meshphong_frag:Um,meshphysical_vert:Fm,meshphysical_frag:Om,meshtoon_vert:zm,meshtoon_frag:Bm,points_vert:km,points_frag:Gm,shadow_vert:Hm,shadow_frag:Wm,sprite_vert:Vm,sprite_frag:Xm},wt={common:{diffuse:{value:new Dt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new $t}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new $t}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new $t}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new $t},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new $t},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new $t},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new $t}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new $t}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new $t}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Dt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Dt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0},uvTransform:{value:new $t}},sprite:{diffuse:{value:new Dt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new $t},alphaMap:{value:null},alphaMapTransform:{value:new $t},alphaTest:{value:0}}},An={basic:{uniforms:Ze([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.fog]),vertexShader:Kt.meshbasic_vert,fragmentShader:Kt.meshbasic_frag},lambert:{uniforms:Ze([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Kt.meshlambert_vert,fragmentShader:Kt.meshlambert_frag},phong:{uniforms:Ze([wt.common,wt.specularmap,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,wt.lights,{emissive:{value:new Dt(0)},specular:{value:new Dt(1118481)},shininess:{value:30}}]),vertexShader:Kt.meshphong_vert,fragmentShader:Kt.meshphong_frag},standard:{uniforms:Ze([wt.common,wt.envmap,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.roughnessmap,wt.metalnessmap,wt.fog,wt.lights,{emissive:{value:new Dt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag},toon:{uniforms:Ze([wt.common,wt.aomap,wt.lightmap,wt.emissivemap,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.gradientmap,wt.fog,wt.lights,{emissive:{value:new Dt(0)}}]),vertexShader:Kt.meshtoon_vert,fragmentShader:Kt.meshtoon_frag},matcap:{uniforms:Ze([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,wt.fog,{matcap:{value:null}}]),vertexShader:Kt.meshmatcap_vert,fragmentShader:Kt.meshmatcap_frag},points:{uniforms:Ze([wt.points,wt.fog]),vertexShader:Kt.points_vert,fragmentShader:Kt.points_frag},dashed:{uniforms:Ze([wt.common,wt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Kt.linedashed_vert,fragmentShader:Kt.linedashed_frag},depth:{uniforms:Ze([wt.common,wt.displacementmap]),vertexShader:Kt.depth_vert,fragmentShader:Kt.depth_frag},normal:{uniforms:Ze([wt.common,wt.bumpmap,wt.normalmap,wt.displacementmap,{opacity:{value:1}}]),vertexShader:Kt.meshnormal_vert,fragmentShader:Kt.meshnormal_frag},sprite:{uniforms:Ze([wt.sprite,wt.fog]),vertexShader:Kt.sprite_vert,fragmentShader:Kt.sprite_frag},background:{uniforms:{uvTransform:{value:new $t},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Kt.background_vert,fragmentShader:Kt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Kt.backgroundCube_vert,fragmentShader:Kt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Kt.cube_vert,fragmentShader:Kt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Kt.equirect_vert,fragmentShader:Kt.equirect_frag},distanceRGBA:{uniforms:Ze([wt.common,wt.displacementmap,{referencePosition:{value:new O},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Kt.distanceRGBA_vert,fragmentShader:Kt.distanceRGBA_frag},shadow:{uniforms:Ze([wt.lights,wt.fog,{color:{value:new Dt(0)},opacity:{value:1}}]),vertexShader:Kt.shadow_vert,fragmentShader:Kt.shadow_frag}};An.physical={uniforms:Ze([An.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new $t},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new $t},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new $t},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new $t},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new $t},sheen:{value:0},sheenColor:{value:new Dt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new $t},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new $t},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new $t},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new $t},attenuationDistance:{value:0},attenuationColor:{value:new Dt(0)},specularColor:{value:new Dt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new $t},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new $t},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new $t}}]),vertexShader:Kt.meshphysical_vert,fragmentShader:Kt.meshphysical_frag};const bo={r:0,b:0,g:0};function qm(s,t,e,n,i,o,r){const a=new Dt(0);let c=o===!0?0:1,l,h,d=null,u=0,f=null;function p(g,m){let x=!1,M=m.isScene===!0?m.background:null;M&&M.isTexture&&(M=(m.backgroundBlurriness>0?e:t).get(M)),M===null?v(a,c):M&&M.isColor&&(v(M,1),x=!0);const y=s.xr.getEnvironmentBlendMode();y==="additive"?n.buffers.color.setClear(0,0,0,1,r):y==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),M&&(M.isCubeTexture||M.mapping===Er)?(h===void 0&&(h=new Z(new Mt(1,1,1),new Me({name:"BackgroundCubeMaterial",uniforms:os(An.backgroundCube.uniforms),vertexShader:An.backgroundCube.vertexShader,fragmentShader:An.backgroundCube.fragmentShader,side:Ke,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,S,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=M,h.material.uniforms.flipEnvMap.value=M.isCubeTexture&&M.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=oe.getTransfer(M.colorSpace)!==pe,(d!==M||u!==M.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=M,u=M.version,f=s.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null)):M&&M.isTexture&&(l===void 0&&(l=new Z(new ge(2,2),new Me({name:"BackgroundMaterial",uniforms:os(An.background.uniforms),vertexShader:An.background.vertexShader,fragmentShader:An.background.fragmentShader,side:ni,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=M,l.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,l.material.toneMapped=oe.getTransfer(M.colorSpace)!==pe,M.matrixAutoUpdate===!0&&M.updateMatrix(),l.material.uniforms.uvTransform.value.copy(M.matrix),(d!==M||u!==M.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,d=M,u=M.version,f=s.toneMapping),l.layers.enableAll(),g.unshift(l,l.geometry,l.material,0,0,null))}function v(g,m){g.getRGB(bo,Pu(s)),n.buffers.color.setClear(bo.r,bo.g,bo.b,m,r)}return{getClearColor:function(){return a},setClearColor:function(g,m=1){a.set(g),c=m,v(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(g){c=g,v(a,c)},render:p}}function Ym(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),o=n.isWebGL2?null:t.get("OES_vertex_array_object"),r=n.isWebGL2||o!==null,a={},c=g(null);let l=c,h=!1;function d(C,D,F,V,G){let B=!1;if(r){const q=v(V,F,D);l!==q&&(l=q,f(l.object)),B=m(C,V,F,G),B&&x(C,V,F,G)}else{const q=D.wireframe===!0;(l.geometry!==V.id||l.program!==F.id||l.wireframe!==q)&&(l.geometry=V.id,l.program=F.id,l.wireframe=q,B=!0)}G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(B||h)&&(h=!1,T(C,D,F,V),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function u(){return n.isWebGL2?s.createVertexArray():o.createVertexArrayOES()}function f(C){return n.isWebGL2?s.bindVertexArray(C):o.bindVertexArrayOES(C)}function p(C){return n.isWebGL2?s.deleteVertexArray(C):o.deleteVertexArrayOES(C)}function v(C,D,F){const V=F.wireframe===!0;let G=a[C.id];G===void 0&&(G={},a[C.id]=G);let B=G[D.id];B===void 0&&(B={},G[D.id]=B);let q=B[V];return q===void 0&&(q=g(u()),B[V]=q),q}function g(C){const D=[],F=[],V=[];for(let G=0;G<i;G++)D[G]=0,F[G]=0,V[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:D,enabledAttributes:F,attributeDivisors:V,object:C,attributes:{},index:null}}function m(C,D,F,V){const G=l.attributes,B=D.attributes;let q=0;const H=F.getAttributes();for(const X in H)if(H[X].location>=0){const et=G[X];let ut=B[X];if(ut===void 0&&(X==="instanceMatrix"&&C.instanceMatrix&&(ut=C.instanceMatrix),X==="instanceColor"&&C.instanceColor&&(ut=C.instanceColor)),et===void 0||et.attribute!==ut||ut&&et.data!==ut.data)return!0;q++}return l.attributesNum!==q||l.index!==V}function x(C,D,F,V){const G={},B=D.attributes;let q=0;const H=F.getAttributes();for(const X in H)if(H[X].location>=0){let et=B[X];et===void 0&&(X==="instanceMatrix"&&C.instanceMatrix&&(et=C.instanceMatrix),X==="instanceColor"&&C.instanceColor&&(et=C.instanceColor));const ut={};ut.attribute=et,et&&et.data&&(ut.data=et.data),G[X]=ut,q++}l.attributes=G,l.attributesNum=q,l.index=V}function M(){const C=l.newAttributes;for(let D=0,F=C.length;D<F;D++)C[D]=0}function y(C){w(C,0)}function w(C,D){const F=l.newAttributes,V=l.enabledAttributes,G=l.attributeDivisors;F[C]=1,V[C]===0&&(s.enableVertexAttribArray(C),V[C]=1),G[C]!==D&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,D),G[C]=D)}function S(){const C=l.newAttributes,D=l.enabledAttributes;for(let F=0,V=D.length;F<V;F++)D[F]!==C[F]&&(s.disableVertexAttribArray(F),D[F]=0)}function b(C,D,F,V,G,B,q){q===!0?s.vertexAttribIPointer(C,D,F,G,B):s.vertexAttribPointer(C,D,F,V,G,B)}function T(C,D,F,V){if(n.isWebGL2===!1&&(C.isInstancedMesh||V.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;M();const G=V.attributes,B=F.getAttributes(),q=D.defaultAttributeValues;for(const H in B){const X=B[H];if(X.location>=0){let W=G[H];if(W===void 0&&(H==="instanceMatrix"&&C.instanceMatrix&&(W=C.instanceMatrix),H==="instanceColor"&&C.instanceColor&&(W=C.instanceColor)),W!==void 0){const et=W.normalized,ut=W.itemSize,dt=e.get(W);if(dt===void 0)continue;const it=dt.buffer,ht=dt.type,ft=dt.bytesPerElement,pt=n.isWebGL2===!0&&(ht===s.INT||ht===s.UNSIGNED_INT||W.gpuType===fu);if(W.isInterleavedBufferAttribute){const _t=W.data,z=_t.stride,ct=W.offset;if(_t.isInstancedInterleavedBuffer){for(let K=0;K<X.locationSize;K++)w(X.location+K,_t.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=_t.meshPerAttribute*_t.count)}else for(let K=0;K<X.locationSize;K++)y(X.location+K);s.bindBuffer(s.ARRAY_BUFFER,it);for(let K=0;K<X.locationSize;K++)b(X.location+K,ut/X.locationSize,ht,et,z*ft,(ct+ut/X.locationSize*K)*ft,pt)}else{if(W.isInstancedBufferAttribute){for(let _t=0;_t<X.locationSize;_t++)w(X.location+_t,W.meshPerAttribute);C.isInstancedMesh!==!0&&V._maxInstanceCount===void 0&&(V._maxInstanceCount=W.meshPerAttribute*W.count)}else for(let _t=0;_t<X.locationSize;_t++)y(X.location+_t);s.bindBuffer(s.ARRAY_BUFFER,it);for(let _t=0;_t<X.locationSize;_t++)b(X.location+_t,ut/X.locationSize,ht,et,ut*ft,ut/X.locationSize*_t*ft,pt)}}else if(q!==void 0){const et=q[H];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(X.location,et);break;case 3:s.vertexAttrib3fv(X.location,et);break;case 4:s.vertexAttrib4fv(X.location,et);break;default:s.vertexAttrib1fv(X.location,et)}}}}S()}function _(){P();for(const C in a){const D=a[C];for(const F in D){const V=D[F];for(const G in V)p(V[G].object),delete V[G];delete D[F]}delete a[C]}}function E(C){if(a[C.id]===void 0)return;const D=a[C.id];for(const F in D){const V=D[F];for(const G in V)p(V[G].object),delete V[G];delete D[F]}delete a[C.id]}function L(C){for(const D in a){const F=a[D];if(F[C.id]===void 0)continue;const V=F[C.id];for(const G in V)p(V[G].object),delete V[G];delete F[C.id]}}function P(){U(),h=!0,l!==c&&(l=c,f(l.object))}function U(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:P,resetDefaultState:U,dispose:_,releaseStatesOfGeometry:E,releaseStatesOfProgram:L,initAttributes:M,enableAttribute:y,disableUnusedAttributes:S}}function jm(s,t,e,n){const i=n.isWebGL2;let o;function r(h){o=h}function a(h,d){s.drawArrays(o,h,d),e.update(d,o,1)}function c(h,d,u){if(u===0)return;let f,p;if(i)f=s,p="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](o,h,d,u),e.update(d,o,u)}function l(h,d,u){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<u;p++)this.render(h[p],d[p]);else{f.multiDrawArraysWEBGL(o,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=d[v];e.update(p,o,1)}}this.setMode=r,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function Zm(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const c=o(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=r||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),g=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),m=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),M=u>0,y=r||t.has("OES_texture_float"),w=M&&y,S=r?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:r,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:p,maxAttributes:v,maxVertexUniforms:g,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:M,floatFragmentTextures:y,floatVertexTextures:w,maxSamples:S}}function Km(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new pi,a=new $t,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||o&&!g)o?h(null):l();else{const x=o?0:n,M=x*4;let y=m.clippingState||null;c.value=y,y=h(p,u,M,f);for(let w=0;w!==M;++w)y[w]=e[w];m.clippingState=y,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=c.value,p!==!0||g===null){const m=f+v*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let M=0,y=f;M!==v;++M,y+=4)r.copy(d[M]).applyMatrix4(x,a),r.normal.toArray(g,y),g[y+3]=r.constant}c.value=g,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function Jm(s){let t=new WeakMap;function e(r,a){return a===Va?r.mapping=ns:a===Xa&&(r.mapping=is),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Va||a===Xa)if(t.has(r)){const c=t.get(r).texture;return e(c,r.mapping)}else{const c=r.image;if(c&&c.height>0){const l=new lp(c.height/2);return l.fromEquirectangularTexture(s,r),t.set(r,l),r.addEventListener("dispose",i),e(l.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class hc extends Lu{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=l*this.view.offsetX,r=o+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const ji=4,Ll=[.125,.215,.35,.446,.526,.582],gi=20,aa=new hc,Il=new Dt;let ca=null,la=0,ha=0;const mi=(1+Math.sqrt(5))/2,Hi=1/mi,Dl=[new O(1,1,1),new O(-1,1,1),new O(1,1,-1),new O(-1,1,-1),new O(0,mi,Hi),new O(0,mi,-Hi),new O(Hi,0,mi),new O(-Hi,0,mi),new O(mi,Hi,0),new O(-mi,Hi,0)];class Za{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Fl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(ca,la,ha),t.scissorTest=!1,Eo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ns||t.mapping===is?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),ca=this._renderer.getRenderTarget(),la=this._renderer.getActiveCubeFace(),ha=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:$e,minFilter:$e,generateMipmaps:!1,type:an,format:un,colorSpace:Wn,depthBuffer:!1},i=Nl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Nl(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Qm(o)),this._blurMaterial=$m(o,t,e)}return i}_compileMaterial(t){const e=new Z(this._lodPlanes[0],t);this._renderer.compile(e,aa)}_sceneToCubeUV(t,e,n,i){const a=new rn(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Il),h.toneMapping=ti,h.autoClear=!1;const f=new Ei({name:"PMREM.Background",side:Ke,depthWrite:!1,depthTest:!1}),p=new Z(new Mt,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(Il),v=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,c[m],0),a.lookAt(l[m],0,0)):x===1?(a.up.set(0,0,c[m]),a.lookAt(0,l[m],0)):(a.up.set(0,c[m],0),a.lookAt(0,0,l[m]));const M=this._cubeSize;Eo(i,x*M,m>2?M:0,M,M),h.setRenderTarget(i),v&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ns||t.mapping===is;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Fl()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new Z(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const c=this._cubeSize;Eo(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(r,aa)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const o=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),r=Dl[(i-1)%Dl.length];this._blur(t,i-1,i,o,r)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const c=this._renderer,l=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Z(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,p=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*gi-1),v=o/p,g=isFinite(o)?1+Math.floor(h*v):gi;g>gi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${gi}`);const m=[];let x=0;for(let b=0;b<gi;++b){const T=b/v,_=Math.exp(-T*T/2);m.push(_),b===0?x+=_:b<g&&(x+=2*_)}for(let b=0;b<m.length;b++)m[b]=m[b]/x;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=r==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:M}=this;u.dTheta.value=p,u.mipInt.value=M-n;const y=this._sizeLods[i],w=3*y*(i>M-ji?i-M+ji:0),S=4*(this._cubeSize-y);Eo(e,w,S,3*y,2*y),c.setRenderTarget(e),c.render(d,aa)}}function Qm(s){const t=[],e=[],n=[];let i=s;const o=s-ji+1+Ll.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let c=1/a;r>s-ji?c=Ll[r-s+ji-1]:r===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*f),M=new Float32Array(g*p*f),y=new Float32Array(m*p*f);for(let S=0;S<f;S++){const b=S%3*2/3-1,T=S>2?0:-1,_=[b,T,0,b+2/3,T,0,b+2/3,T+1,0,b,T,0,b+2/3,T+1,0,b,T+1,0];x.set(_,v*p*S),M.set(u,g*p*S);const E=[S,S,S,S,S,S];y.set(E,m*p*S)}const w=new he;w.setAttribute("position",new ie(x,v)),w.setAttribute("uv",new ie(M,g)),w.setAttribute("faceIndex",new ie(y,m)),t.push(w),i>ji&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Nl(s,t,e){const n=new Je(s,t,e);return n.texture.mapping=Er,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function Eo(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function $m(s,t,e){const n=new Float32Array(gi),i=new O(0,1,0);return new Me({name:"SphericalGaussianBlur",defines:{n:gi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:uc(),fragmentShader:`

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
		`,blending:Oe,depthTest:!1,depthWrite:!1})}function Ul(){return new Me({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:uc(),fragmentShader:`

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
		`,blending:Oe,depthTest:!1,depthWrite:!1})}function Fl(){return new Me({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:uc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oe,depthTest:!1,depthWrite:!1})}function uc(){return`

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
	`}function tg(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Va||c===Xa,h=c===ns||c===is;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=t.get(a);return e===null&&(e=new Za(s)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),t.set(a,d),d.texture}else{if(t.has(a))return t.get(a).texture;{const d=a.image;if(l&&d&&d.height>0||h&&d&&i(d)){e===null&&(e=new Za(s));const u=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,u),a.addEventListener("dispose",o),u.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function o(a){const c=a.target;c.removeEventListener("dispose",o);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function eg(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function ng(s,t,e,n){const i={},o=new WeakMap;function r(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);for(const p in u.morphAttributes){const v=u.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)t.remove(v[g])}u.removeEventListener("dispose",r),delete i[u.id];const f=o.get(u);f&&(t.remove(f),o.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const p in u)t.update(u[p],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const p in f){const v=f[p];for(let g=0,m=v.length;g<m;g++)t.update(v[g],s.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,p=d.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let M=0,y=x.length;M<y;M+=3){const w=x[M+0],S=x[M+1],b=x[M+2];u.push(w,S,S,b,b,w)}}else if(p!==void 0){const x=p.array;v=p.version;for(let M=0,y=x.length/3-1;M<y;M+=3){const w=M+0,S=M+1,b=M+2;u.push(w,S,S,b,b,w)}}else return;const g=new(_u(u)?Cu:Ru)(u,1);g.version=v;const m=o.get(d);m&&t.remove(m),o.set(d,g)}function h(d){const u=o.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return o.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function ig(s,t,e,n){const i=n.isWebGL2;let o;function r(f){o=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,p){s.drawElements(o,p,a,f*c),e.update(p,o,1)}function d(f,p,v){if(v===0)return;let g,m;if(i)g=s,m="drawElementsInstanced";else if(g=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[m](o,p,a,f*c,v),e.update(p,o,v)}function u(f,p,v){if(v===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<v;m++)this.render(f[m]/c,p[m]);else{g.multiDrawElementsWEBGL(o,p,0,a,f,0,v);let m=0;for(let x=0;x<v;x++)m+=p[x];e.update(m,o,1)}}this.setMode=r,this.setIndex=l,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function sg(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function og(s,t){return s[0]-t[0]}function rg(s,t){return Math.abs(t[1])-Math.abs(s[1])}function ag(s,t,e){const n={},i=new Float32Array(8),o=new WeakMap,r=new Fe,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,d){const u=l.morphTargetInfluences;if(t.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=p!==void 0?p.length:0;let g=o.get(h);if(g===void 0||g.count!==v){let D=function(){U.dispose(),o.delete(h),h.removeEventListener("dispose",D)};var f=D;g!==void 0&&g.texture.dispose();const M=h.morphAttributes.position!==void 0,y=h.morphAttributes.normal!==void 0,w=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],T=h.morphAttributes.color||[];let _=0;M===!0&&(_=1),y===!0&&(_=2),w===!0&&(_=3);let E=h.attributes.position.count*_,L=1;E>t.maxTextureSize&&(L=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const P=new Float32Array(E*L*4*v),U=new Eu(P,E,L,v);U.type=Qn,U.needsUpdate=!0;const C=_*4;for(let F=0;F<v;F++){const V=S[F],G=b[F],B=T[F],q=E*L*4*F;for(let H=0;H<V.count;H++){const X=H*C;M===!0&&(r.fromBufferAttribute(V,H),P[q+X+0]=r.x,P[q+X+1]=r.y,P[q+X+2]=r.z,P[q+X+3]=0),y===!0&&(r.fromBufferAttribute(G,H),P[q+X+4]=r.x,P[q+X+5]=r.y,P[q+X+6]=r.z,P[q+X+7]=0),w===!0&&(r.fromBufferAttribute(B,H),P[q+X+8]=r.x,P[q+X+9]=r.y,P[q+X+10]=r.z,P[q+X+11]=B.itemSize===4?r.w:1)}}g={count:v,texture:U,size:new nt(E,L)},o.set(h,g),h.addEventListener("dispose",D)}let m=0;for(let M=0;M<u.length;M++)m+=u[M];const x=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(s,"morphTargetBaseInfluence",x),d.getUniforms().setValue(s,"morphTargetInfluences",u),d.getUniforms().setValue(s,"morphTargetsTexture",g.texture,e),d.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}else{const p=u===void 0?0:u.length;let v=n[h.id];if(v===void 0||v.length!==p){v=[];for(let y=0;y<p;y++)v[y]=[y,0];n[h.id]=v}for(let y=0;y<p;y++){const w=v[y];w[0]=y,w[1]=u[y]}v.sort(rg);for(let y=0;y<8;y++)y<p&&v[y][1]?(a[y][0]=v[y][0],a[y][1]=v[y][1]):(a[y][0]=Number.MAX_SAFE_INTEGER,a[y][1]=0);a.sort(og);const g=h.morphAttributes.position,m=h.morphAttributes.normal;let x=0;for(let y=0;y<8;y++){const w=a[y],S=w[0],b=w[1];S!==Number.MAX_SAFE_INTEGER&&b?(g&&h.getAttribute("morphTarget"+y)!==g[S]&&h.setAttribute("morphTarget"+y,g[S]),m&&h.getAttribute("morphNormal"+y)!==m[S]&&h.setAttribute("morphNormal"+y,m[S]),i[y]=b,x+=b):(g&&h.hasAttribute("morphTarget"+y)===!0&&h.deleteAttribute("morphTarget"+y),m&&h.hasAttribute("morphNormal"+y)===!0&&h.deleteAttribute("morphNormal"+y),i[y]=0)}const M=h.morphTargetsRelative?1:1-x;d.getUniforms().setValue(s,"morphTargetBaseInfluence",M),d.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function cg(s,t,e,n){let i=new WeakMap;function o(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function r(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:o,dispose:r}}class dc extends ze{constructor(t,e,n,i,o,r,a,c,l,h){if(h=h!==void 0?h:xi,h!==xi&&h!==wi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===xi&&(n=Jn),n===void 0&&h===wi&&(n=ei),super(null,i,o,r,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Se,this.minFilter=c!==void 0?c:Se,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Nu=new ze,Uu=new dc(1,1);Uu.compareFunction=wu;const Fu=new Eu,Ou=new qf,zu=new Iu,Ol=[],zl=[],Bl=new Float32Array(16),kl=new Float32Array(9),Gl=new Float32Array(4);function hs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=Ol[i];if(o===void 0&&(o=new Float32Array(i),Ol[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function Pe(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Le(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function Ar(s,t){let e=zl[t];e===void 0&&(e=new Int32Array(t),zl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function lg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2fv(this.addr,t),Le(e,t)}}function ug(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Pe(e,t))return;s.uniform3fv(this.addr,t),Le(e,t)}}function dg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4fv(this.addr,t),Le(e,t)}}function fg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;Gl.set(n),s.uniformMatrix2fv(this.addr,!1,Gl),Le(e,n)}}function pg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;kl.set(n),s.uniformMatrix3fv(this.addr,!1,kl),Le(e,n)}}function mg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Pe(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Le(e,t)}else{if(Pe(e,n))return;Bl.set(n),s.uniformMatrix4fv(this.addr,!1,Bl),Le(e,n)}}function gg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function vg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2iv(this.addr,t),Le(e,t)}}function xg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3iv(this.addr,t),Le(e,t)}}function Mg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4iv(this.addr,t),Le(e,t)}}function yg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function wg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Pe(e,t))return;s.uniform2uiv(this.addr,t),Le(e,t)}}function _g(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Pe(e,t))return;s.uniform3uiv(this.addr,t),Le(e,t)}}function Sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Pe(e,t))return;s.uniform4uiv(this.addr,t),Le(e,t)}}function bg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const o=this.type===s.SAMPLER_2D_SHADOW?Uu:Nu;e.setTexture2D(t||o,i)}function Eg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Ou,i)}function Tg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||zu,i)}function Ag(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Fu,i)}function Rg(s){switch(s){case 5126:return lg;case 35664:return hg;case 35665:return ug;case 35666:return dg;case 35674:return fg;case 35675:return pg;case 35676:return mg;case 5124:case 35670:return gg;case 35667:case 35671:return vg;case 35668:case 35672:return xg;case 35669:case 35673:return Mg;case 5125:return yg;case 36294:return wg;case 36295:return _g;case 36296:return Sg;case 35678:case 36198:case 36298:case 36306:case 35682:return bg;case 35679:case 36299:case 36307:return Eg;case 35680:case 36300:case 36308:case 36293:return Tg;case 36289:case 36303:case 36311:case 36292:return Ag}}function Cg(s,t){s.uniform1fv(this.addr,t)}function Pg(s,t){const e=hs(t,this.size,2);s.uniform2fv(this.addr,e)}function Lg(s,t){const e=hs(t,this.size,3);s.uniform3fv(this.addr,e)}function Ig(s,t){const e=hs(t,this.size,4);s.uniform4fv(this.addr,e)}function Dg(s,t){const e=hs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ng(s,t){const e=hs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Ug(s,t){const e=hs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Fg(s,t){s.uniform1iv(this.addr,t)}function Og(s,t){s.uniform2iv(this.addr,t)}function zg(s,t){s.uniform3iv(this.addr,t)}function Bg(s,t){s.uniform4iv(this.addr,t)}function kg(s,t){s.uniform1uiv(this.addr,t)}function Gg(s,t){s.uniform2uiv(this.addr,t)}function Hg(s,t){s.uniform3uiv(this.addr,t)}function Wg(s,t){s.uniform4uiv(this.addr,t)}function Vg(s,t,e){const n=this.cache,i=t.length,o=Ar(e,i);Pe(n,o)||(s.uniform1iv(this.addr,o),Le(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||Nu,o[r])}function Xg(s,t,e){const n=this.cache,i=t.length,o=Ar(e,i);Pe(n,o)||(s.uniform1iv(this.addr,o),Le(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Ou,o[r])}function qg(s,t,e){const n=this.cache,i=t.length,o=Ar(e,i);Pe(n,o)||(s.uniform1iv(this.addr,o),Le(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||zu,o[r])}function Yg(s,t,e){const n=this.cache,i=t.length,o=Ar(e,i);Pe(n,o)||(s.uniform1iv(this.addr,o),Le(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Fu,o[r])}function jg(s){switch(s){case 5126:return Cg;case 35664:return Pg;case 35665:return Lg;case 35666:return Ig;case 35674:return Dg;case 35675:return Ng;case 35676:return Ug;case 5124:case 35670:return Fg;case 35667:case 35671:return Og;case 35668:case 35672:return zg;case 35669:case 35673:return Bg;case 5125:return kg;case 36294:return Gg;case 36295:return Hg;case 36296:return Wg;case 35678:case 36198:case 36298:case 36306:case 35682:return Vg;case 35679:case 36299:case 36307:return Xg;case 35680:case 36300:case 36308:case 36293:return qg;case 36289:case 36303:case 36311:case 36292:return Yg}}class Zg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=Rg(e.type)}}class Kg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=jg(e.type)}}class Jg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const ua=/(\w+)(\])?(\[|\.)?/g;function Hl(s,t){s.seq.push(t),s.map[t.id]=t}function Qg(s,t,e){const n=s.name,i=n.length;for(ua.lastIndex=0;;){const o=ua.exec(n),r=ua.lastIndex;let a=o[1];const c=o[2]==="]",l=o[3];if(c&&(a=a|0),l===void 0||l==="["&&r+2===i){Hl(e,l===void 0?new Zg(a,s,t):new Kg(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Jg(a),Hl(e,d)),e=d}}}class ur{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);Qg(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function Wl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const $g=37297;let tv=0;function ev(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function nv(s){const t=oe.getPrimaries(oe.workingColorSpace),e=oe.getPrimaries(s);let n;switch(t===e?n="":t===vr&&e===gr?n="LinearDisplayP3ToLinearSRGB":t===gr&&e===vr&&(n="LinearSRGBToLinearDisplayP3"),s){case Wn:case Tr:return[n,"LinearTransferOETF"];case Yt:case ac:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Vl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+ev(s.getShaderSource(t),r)}else return i}function iv(s,t){const e=nv(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function sv(s,t){let e;switch(t){case cu:e="Linear";break;case lu:e="Reinhard";break;case hu:e="OptimizedCineon";break;case sc:e="ACESFilmic";break;case uu:e="AgX";break;case rf:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function ov(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zi).join(`
`)}function rv(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Zi).join(`
`)}function av(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function cv(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function Zi(s){return s!==""}function Xl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function ql(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const lv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ka(s){return s.replace(lv,uv)}const hv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function uv(s,t){let e=Kt[t];if(e===void 0){const n=hv.get(t);if(n!==void 0)e=Kt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ka(e)}const dv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(s){return s.replace(dv,fv)}function fv(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function jl(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function pv(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===su?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===ou?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===kn&&(t="SHADOWMAP_TYPE_VSM"),t}function mv(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ns:case is:t="ENVMAP_TYPE_CUBE";break;case Er:t="ENVMAP_TYPE_CUBE_UV";break}return t}function gv(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case is:t="ENVMAP_MODE_REFRACTION";break}return t}function vv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case au:t="ENVMAP_BLENDING_MULTIPLY";break;case sf:t="ENVMAP_BLENDING_MIX";break;case of:t="ENVMAP_BLENDING_ADD";break}return t}function xv(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function Mv(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const c=pv(e),l=mv(e),h=gv(e),d=vv(e),u=xv(e),f=e.isWebGL2?"":ov(e),p=rv(e),v=av(o),g=i.createProgram();let m,x,M=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Zi).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Zi).join(`
`),x.length>0&&(x+=`
`)):(m=[jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),x=[f,jl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==ti?"#define TONE_MAPPING":"",e.toneMapping!==ti?Kt.tonemapping_pars_fragment:"",e.toneMapping!==ti?sv("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Kt.colorspace_pars_fragment,iv("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zi).join(`
`)),r=Ka(r),r=Xl(r,e),r=ql(r,e),a=Ka(a),a=Xl(a,e),a=ql(a,e),r=Yl(r),a=Yl(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(M=`#version 300 es
`,m=[p,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===fl?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===fl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const y=M+m+r,w=M+x+a,S=Wl(i,i.VERTEX_SHADER,y),b=Wl(i,i.FRAGMENT_SHADER,w);i.attachShader(g,S),i.attachShader(g,b),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function T(P){if(s.debug.checkShaderErrors){const U=i.getProgramInfoLog(g).trim(),C=i.getShaderInfoLog(S).trim(),D=i.getShaderInfoLog(b).trim();let F=!0,V=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(F=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,S,b);else{const G=Vl(i,S,"vertex"),B=Vl(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+U+`
`+G+`
`+B)}else U!==""?console.warn("THREE.WebGLProgram: Program Info Log:",U):(C===""||D==="")&&(V=!1);V&&(P.diagnostics={runnable:F,programLog:U,vertexShader:{log:C,prefix:m},fragmentShader:{log:D,prefix:x}})}i.deleteShader(S),i.deleteShader(b),_=new ur(i,g),E=cv(i,g)}let _;this.getUniforms=function(){return _===void 0&&T(this),_};let E;this.getAttributes=function(){return E===void 0&&T(this),E};let L=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return L===!1&&(L=i.getProgramParameter(g,$g)),L},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=tv++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=b,this}let yv=0;class wv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new _v(t),e.set(t,n)),n}}class _v{constructor(t){this.id=yv++,this.code=t,this.usedTimes=0}}function Sv(s,t,e,n,i,o,r){const a=new Tu,c=new wv,l=[],h=i.isWebGL2,d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(_){return _===0?"uv":`uv${_}`}function g(_,E,L,P,U){const C=P.fog,D=U.geometry,F=_.isMeshStandardMaterial?P.environment:null,V=(_.isMeshStandardMaterial?e:t).get(_.envMap||F),G=V&&V.mapping===Er?V.image.height:null,B=p[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));const q=D.morphAttributes.position||D.morphAttributes.normal||D.morphAttributes.color,H=q!==void 0?q.length:0;let X=0;D.morphAttributes.position!==void 0&&(X=1),D.morphAttributes.normal!==void 0&&(X=2),D.morphAttributes.color!==void 0&&(X=3);let W,et,ut,dt;if(B){const qe=An[B];W=qe.vertexShader,et=qe.fragmentShader}else W=_.vertexShader,et=_.fragmentShader,c.update(_),ut=c.getVertexShaderID(_),dt=c.getFragmentShaderID(_);const it=s.getRenderTarget(),ht=U.isInstancedMesh===!0,ft=U.isBatchedMesh===!0,pt=!!_.map,_t=!!_.matcap,z=!!V,ct=!!_.aoMap,K=!!_.lightMap,lt=!!_.bumpMap,tt=!!_.normalMap,Rt=!!_.displacementMap,xt=!!_.emissiveMap,I=!!_.metalnessMap,R=!!_.roughnessMap,Y=_.anisotropy>0,rt=_.clearcoat>0,ot=_.iridescence>0,st=_.sheen>0,yt=_.transmission>0,gt=Y&&!!_.anisotropyMap,bt=rt&&!!_.clearcoatMap,Nt=rt&&!!_.clearcoatNormalMap,Ft=rt&&!!_.clearcoatRoughnessMap,at=ot&&!!_.iridescenceMap,Zt=ot&&!!_.iridescenceThicknessMap,Xt=st&&!!_.sheenColorMap,Bt=st&&!!_.sheenRoughnessMap,St=!!_.specularMap,At=!!_.specularColorMap,Ht=!!_.specularIntensityMap,ne=yt&&!!_.transmissionMap,ce=yt&&!!_.thicknessMap,Wt=!!_.gradientMap,vt=!!_.alphaMap,k=_.alphaTest>0,Et=!!_.alphaHash,Tt=!!_.extensions,kt=!!D.attributes.uv1,Ot=!!D.attributes.uv2,ue=!!D.attributes.uv3;let de=ti;return _.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(de=s.toneMapping),{isWebGL2:h,shaderID:B,shaderType:_.type,shaderName:_.name,vertexShader:W,fragmentShader:et,defines:_.defines,customVertexShaderID:ut,customFragmentShaderID:dt,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:ft,instancing:ht,instancingColor:ht&&U.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:it===null?s.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Wn,map:pt,matcap:_t,envMap:z,envMapMode:z&&V.mapping,envMapCubeUVHeight:G,aoMap:ct,lightMap:K,bumpMap:lt,normalMap:tt,displacementMap:u&&Rt,emissiveMap:xt,normalMapObjectSpace:tt&&_.normalMapType===xf,normalMapTangentSpace:tt&&_.normalMapType===rc,metalnessMap:I,roughnessMap:R,anisotropy:Y,anisotropyMap:gt,clearcoat:rt,clearcoatMap:bt,clearcoatNormalMap:Nt,clearcoatRoughnessMap:Ft,iridescence:ot,iridescenceMap:at,iridescenceThicknessMap:Zt,sheen:st,sheenColorMap:Xt,sheenRoughnessMap:Bt,specularMap:St,specularColorMap:At,specularIntensityMap:Ht,transmission:yt,transmissionMap:ne,thicknessMap:ce,gradientMap:Wt,opaque:_.transparent===!1&&_.blending===Qi,alphaMap:vt,alphaTest:k,alphaHash:Et,combine:_.combine,mapUv:pt&&v(_.map.channel),aoMapUv:ct&&v(_.aoMap.channel),lightMapUv:K&&v(_.lightMap.channel),bumpMapUv:lt&&v(_.bumpMap.channel),normalMapUv:tt&&v(_.normalMap.channel),displacementMapUv:Rt&&v(_.displacementMap.channel),emissiveMapUv:xt&&v(_.emissiveMap.channel),metalnessMapUv:I&&v(_.metalnessMap.channel),roughnessMapUv:R&&v(_.roughnessMap.channel),anisotropyMapUv:gt&&v(_.anisotropyMap.channel),clearcoatMapUv:bt&&v(_.clearcoatMap.channel),clearcoatNormalMapUv:Nt&&v(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ft&&v(_.clearcoatRoughnessMap.channel),iridescenceMapUv:at&&v(_.iridescenceMap.channel),iridescenceThicknessMapUv:Zt&&v(_.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&v(_.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&v(_.sheenRoughnessMap.channel),specularMapUv:St&&v(_.specularMap.channel),specularColorMapUv:At&&v(_.specularColorMap.channel),specularIntensityMapUv:Ht&&v(_.specularIntensityMap.channel),transmissionMapUv:ne&&v(_.transmissionMap.channel),thicknessMapUv:ce&&v(_.thicknessMap.channel),alphaMapUv:vt&&v(_.alphaMap.channel),vertexTangents:!!D.attributes.tangent&&(tt||Y),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!D.attributes.color&&D.attributes.color.itemSize===4,vertexUv1s:kt,vertexUv2s:Ot,vertexUv3s:ue,pointsUvs:U.isPoints===!0&&!!D.attributes.uv&&(pt||vt),fog:!!C,useFog:_.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:U.isSkinnedMesh===!0,morphTargets:D.morphAttributes.position!==void 0,morphNormals:D.morphAttributes.normal!==void 0,morphColors:D.morphAttributes.color!==void 0,morphTargetsCount:H,morphTextureStride:X,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&L.length>0,shadowMapType:s.shadowMap.type,toneMapping:de,useLegacyLights:s._useLegacyLights,decodeVideoTexture:pt&&_.map.isVideoTexture===!0&&oe.getTransfer(_.map.colorSpace)===pe,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===be,flipSided:_.side===Ke,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:Tt&&_.extensions.derivatives===!0,extensionFragDepth:Tt&&_.extensions.fragDepth===!0,extensionDrawBuffers:Tt&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:Tt&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Tt&&_.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function m(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const L in _.defines)E.push(L),E.push(_.defines[L]);return _.isRawShaderMaterial===!1&&(x(E,_),M(E,_),E.push(s.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function x(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function M(_,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function y(_){const E=p[_.type];let L;if(E){const P=An[E];L=tn.clone(P.uniforms)}else L=_.uniforms;return L}function w(_,E){let L;for(let P=0,U=l.length;P<U;P++){const C=l[P];if(C.cacheKey===E){L=C,++L.usedTimes;break}}return L===void 0&&(L=new Mv(s,E,_,o),l.push(L)),L}function S(_){if(--_.usedTimes===0){const E=l.indexOf(_);l[E]=l[l.length-1],l.pop(),_.destroy()}}function b(_){c.remove(_)}function T(){c.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:y,acquireProgram:w,releaseProgram:S,releaseShaderCache:b,programs:l,dispose:T}}function bv(){let s=new WeakMap;function t(o){let r=s.get(o);return r===void 0&&(r={},s.set(o,r)),r}function e(o){s.delete(o)}function n(o,r,a){s.get(o)[r]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function Ev(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Zl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Kl(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(d,u,f,p,v,g){let m=s[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:v,group:g},s[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=v,m.group=g),t++,m}function a(d,u,f,p,v,g){const m=r(d,u,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function c(d,u,f,p,v,g){const m=r(d,u,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function l(d,u){e.length>1&&e.sort(d||Ev),n.length>1&&n.sort(u||Zl),i.length>1&&i.sort(u||Zl)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:c,finish:h,sort:l}}function Tv(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new Kl,s.set(n,[r])):i>=o.length?(r=new Kl,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function Av(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new O,color:new Dt};break;case"SpotLight":e={position:new O,direction:new O,color:new Dt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new O,color:new Dt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new O,skyColor:new Dt,groundColor:new Dt};break;case"RectAreaLight":e={color:new Dt,position:new O,halfWidth:new O,halfHeight:new O};break}return s[t.id]=e,e}}}function Rv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Cv=0;function Pv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function Lv(s,t){const e=new Av,n=Rv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new O);const o=new O,r=new jt,a=new jt;function c(h,d){let u=0,f=0,p=0;for(let P=0;P<9;P++)i.probe[P].set(0,0,0);let v=0,g=0,m=0,x=0,M=0,y=0,w=0,S=0,b=0,T=0,_=0;h.sort(Pv);const E=d===!0?Math.PI:1;for(let P=0,U=h.length;P<U;P++){const C=h[P],D=C.color,F=C.intensity,V=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=D.r*F*E,f+=D.g*F*E,p+=D.b*F*E;else if(C.isLightProbe){for(let B=0;B<9;B++)i.probe[B].addScaledVector(C.sh.coefficients[B],F);_++}else if(C.isDirectionalLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity*E),C.castShadow){const q=C.shadow,H=n.get(C);H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.directionalShadow[v]=H,i.directionalShadowMap[v]=G,i.directionalShadowMatrix[v]=C.shadow.matrix,y++}i.directional[v]=B,v++}else if(C.isSpotLight){const B=e.get(C);B.position.setFromMatrixPosition(C.matrixWorld),B.color.copy(D).multiplyScalar(F*E),B.distance=V,B.coneCos=Math.cos(C.angle),B.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),B.decay=C.decay,i.spot[m]=B;const q=C.shadow;if(C.map&&(i.spotLightMap[b]=C.map,b++,q.updateMatrices(C),C.castShadow&&T++),i.spotLightMatrix[m]=q.matrix,C.castShadow){const H=n.get(C);H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,i.spotShadow[m]=H,i.spotShadowMap[m]=G,S++}m++}else if(C.isRectAreaLight){const B=e.get(C);B.color.copy(D).multiplyScalar(F),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),i.rectArea[x]=B,x++}else if(C.isPointLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity*E),B.distance=C.distance,B.decay=C.decay,C.castShadow){const q=C.shadow,H=n.get(C);H.shadowBias=q.bias,H.shadowNormalBias=q.normalBias,H.shadowRadius=q.radius,H.shadowMapSize=q.mapSize,H.shadowCameraNear=q.camera.near,H.shadowCameraFar=q.camera.far,i.pointShadow[g]=H,i.pointShadowMap[g]=G,i.pointShadowMatrix[g]=C.shadow.matrix,w++}i.point[g]=B,g++}else if(C.isHemisphereLight){const B=e.get(C);B.skyColor.copy(C.color).multiplyScalar(F*E),B.groundColor.copy(C.groundColor).multiplyScalar(F*E),i.hemi[M]=B,M++}}x>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_FLOAT_1,i.rectAreaLTC2=wt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=wt.LTC_HALF_1,i.rectAreaLTC2=wt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=p;const L=i.hash;(L.directionalLength!==v||L.pointLength!==g||L.spotLength!==m||L.rectAreaLength!==x||L.hemiLength!==M||L.numDirectionalShadows!==y||L.numPointShadows!==w||L.numSpotShadows!==S||L.numSpotMaps!==b||L.numLightProbes!==_)&&(i.directional.length=v,i.spot.length=m,i.rectArea.length=x,i.point.length=g,i.hemi.length=M,i.directionalShadow.length=y,i.directionalShadowMap.length=y,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=y,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+b-T,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=T,i.numLightProbes=_,L.directionalLength=v,L.pointLength=g,L.spotLength=m,L.rectAreaLength=x,L.hemiLength=M,L.numDirectionalShadows=y,L.numPointShadows=w,L.numSpotShadows=S,L.numSpotMaps=b,L.numLightProbes=_,i.version=Cv++)}function l(h,d){let u=0,f=0,p=0,v=0,g=0;const m=d.matrixWorldInverse;for(let x=0,M=h.length;x<M;x++){const y=h[x];if(y.isDirectionalLight){const w=i.directional[u];w.direction.setFromMatrixPosition(y.matrixWorld),o.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(m),u++}else if(y.isSpotLight){const w=i.spot[p];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(y.matrixWorld),o.setFromMatrixPosition(y.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(m),p++}else if(y.isRectAreaLight){const w=i.rectArea[v];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),a.identity(),r.copy(y.matrixWorld),r.premultiply(m),a.extractRotation(r),w.halfWidth.set(y.width*.5,0,0),w.halfHeight.set(0,y.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(y.isPointLight){const w=i.point[f];w.position.setFromMatrixPosition(y.matrixWorld),w.position.applyMatrix4(m),f++}else if(y.isHemisphereLight){const w=i.hemi[g];w.direction.setFromMatrixPosition(y.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:c,setupView:l,state:i}}function Jl(s,t){const e=new Lv(s,t),n=[],i=[];function o(){n.length=0,i.length=0}function r(d){n.push(d)}function a(d){i.push(d)}function c(d){e.setup(n,d)}function l(d){e.setupView(n,d)}return{init:o,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:r,pushShadow:a}}function Iv(s,t){let e=new WeakMap;function n(o,r=0){const a=e.get(o);let c;return a===void 0?(c=new Jl(s,t),e.set(o,[c])):r>=a.length?(c=new Jl(s,t),a.push(c)):c=a[r],c}function i(){e=new WeakMap}return{get:n,dispose:i}}class Dv extends ls{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=gf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Nv extends ls{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Uv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Fv=`uniform sampler2D shadow_pass;
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
}`;function Ov(s,t,e){let n=new lc;const i=new nt,o=new nt,r=new Fe,a=new Dv({depthPacking:vf}),c=new Nv,l={},h=e.maxTextureSize,d={[ni]:Ke,[Ke]:ni,[be]:be},u=new Me({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Uv,fragmentShader:Fv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new he;p.setAttribute("position",new ie(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Z(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=su;let m=this.type;this.render=function(S,b,T){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const _=s.getRenderTarget(),E=s.getActiveCubeFace(),L=s.getActiveMipmapLevel(),P=s.state;P.setBlending(Oe),P.buffers.color.setClear(1,1,1,1),P.buffers.depth.setTest(!0),P.setScissorTest(!1);const U=m!==kn&&this.type===kn,C=m===kn&&this.type!==kn;for(let D=0,F=S.length;D<F;D++){const V=S[D],G=V.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",V,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const B=G.getFrameExtents();if(i.multiply(B),o.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/B.x),i.x=o.x*B.x,G.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/B.y),i.y=o.y*B.y,G.mapSize.y=o.y)),G.map===null||U===!0||C===!0){const H=this.type!==kn?{minFilter:Se,magFilter:Se}:{};G.map!==null&&G.map.dispose(),G.map=new Je(i.x,i.y,H),G.map.texture.name=V.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const q=G.getViewportCount();for(let H=0;H<q;H++){const X=G.getViewport(H);r.set(o.x*X.x,o.y*X.y,o.x*X.z,o.y*X.w),P.viewport(r),G.updateMatrices(V,H),n=G.getFrustum(),y(b,T,G.camera,V,this.type)}G.isPointLightShadow!==!0&&this.type===kn&&x(G,T),G.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(_,E,L)};function x(S,b){const T=t.update(v);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Je(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(b,null,T,u,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(b,null,T,f,v,null)}function M(S,b,T,_){let E=null;const L=T.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(L!==void 0)E=L;else if(E=T.isPointLight===!0?c:a,s.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const P=E.uuid,U=b.uuid;let C=l[P];C===void 0&&(C={},l[P]=C);let D=C[U];D===void 0&&(D=E.clone(),C[U]=D,b.addEventListener("dispose",w)),E=D}if(E.visible=b.visible,E.wireframe=b.wireframe,_===kn?E.side=b.shadowSide!==null?b.shadowSide:b.side:E.side=b.shadowSide!==null?b.shadowSide:d[b.side],E.alphaMap=b.alphaMap,E.alphaTest=b.alphaTest,E.map=b.map,E.clipShadows=b.clipShadows,E.clippingPlanes=b.clippingPlanes,E.clipIntersection=b.clipIntersection,E.displacementMap=b.displacementMap,E.displacementScale=b.displacementScale,E.displacementBias=b.displacementBias,E.wireframeLinewidth=b.wireframeLinewidth,E.linewidth=b.linewidth,T.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const P=s.properties.get(E);P.light=T}return E}function y(S,b,T,_,E){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&E===kn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(T.matrixWorldInverse,S.matrixWorld);const U=t.update(S),C=S.material;if(Array.isArray(C)){const D=U.groups;for(let F=0,V=D.length;F<V;F++){const G=D[F],B=C[G.materialIndex];if(B&&B.visible){const q=M(S,B,_,E);S.onBeforeShadow(s,S,b,T,U,q,G),s.renderBufferDirect(T,null,U,q,S,G),S.onAfterShadow(s,S,b,T,U,q,G)}}}else if(C.visible){const D=M(S,C,_,E);S.onBeforeShadow(s,S,b,T,U,D,null),s.renderBufferDirect(T,null,U,D,S,null),S.onAfterShadow(s,S,b,T,U,D,null)}}const P=S.children;for(let U=0,C=P.length;U<C;U++)y(P[U],b,T,_,E)}function w(S){S.target.removeEventListener("dispose",w);for(const T in l){const _=l[T],E=S.target.uuid;E in _&&(_[E].dispose(),delete _[E])}}}function zv(s,t,e){const n=e.isWebGL2;function i(){let k=!1;const Et=new Fe;let Tt=null;const kt=new Fe(0,0,0,0);return{setMask:function(Ot){Tt!==Ot&&!k&&(s.colorMask(Ot,Ot,Ot,Ot),Tt=Ot)},setLocked:function(Ot){k=Ot},setClear:function(Ot,ue,de,Ie,qe){qe===!0&&(Ot*=Ie,ue*=Ie,de*=Ie),Et.set(Ot,ue,de,Ie),kt.equals(Et)===!1&&(s.clearColor(Ot,ue,de,Ie),kt.copy(Et))},reset:function(){k=!1,Tt=null,kt.set(-1,0,0,0)}}}function o(){let k=!1,Et=null,Tt=null,kt=null;return{setTest:function(Ot){Ot?ft(s.DEPTH_TEST):pt(s.DEPTH_TEST)},setMask:function(Ot){Et!==Ot&&!k&&(s.depthMask(Ot),Et=Ot)},setFunc:function(Ot){if(Tt!==Ot){switch(Ot){case Kd:s.depthFunc(s.NEVER);break;case Jd:s.depthFunc(s.ALWAYS);break;case Qd:s.depthFunc(s.LESS);break;case pr:s.depthFunc(s.LEQUAL);break;case $d:s.depthFunc(s.EQUAL);break;case tf:s.depthFunc(s.GEQUAL);break;case ef:s.depthFunc(s.GREATER);break;case nf:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Tt=Ot}},setLocked:function(Ot){k=Ot},setClear:function(Ot){kt!==Ot&&(s.clearDepth(Ot),kt=Ot)},reset:function(){k=!1,Et=null,Tt=null,kt=null}}}function r(){let k=!1,Et=null,Tt=null,kt=null,Ot=null,ue=null,de=null,Ie=null,qe=null;return{setTest:function(fe){k||(fe?ft(s.STENCIL_TEST):pt(s.STENCIL_TEST))},setMask:function(fe){Et!==fe&&!k&&(s.stencilMask(fe),Et=fe)},setFunc:function(fe,Ye,Sn){(Tt!==fe||kt!==Ye||Ot!==Sn)&&(s.stencilFunc(fe,Ye,Sn),Tt=fe,kt=Ye,Ot=Sn)},setOp:function(fe,Ye,Sn){(ue!==fe||de!==Ye||Ie!==Sn)&&(s.stencilOp(fe,Ye,Sn),ue=fe,de=Ye,Ie=Sn)},setLocked:function(fe){k=fe},setClear:function(fe){qe!==fe&&(s.clearStencil(fe),qe=fe)},reset:function(){k=!1,Et=null,Tt=null,kt=null,Ot=null,ue=null,de=null,Ie=null,qe=null}}}const a=new i,c=new o,l=new r,h=new WeakMap,d=new WeakMap;let u={},f={},p=new WeakMap,v=[],g=null,m=!1,x=null,M=null,y=null,w=null,S=null,b=null,T=null,_=new Dt(0,0,0),E=0,L=!1,P=null,U=null,C=null,D=null,F=null;const V=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,B=0;const q=s.getParameter(s.VERSION);q.indexOf("WebGL")!==-1?(B=parseFloat(/^WebGL (\d)/.exec(q)[1]),G=B>=1):q.indexOf("OpenGL ES")!==-1&&(B=parseFloat(/^OpenGL ES (\d)/.exec(q)[1]),G=B>=2);let H=null,X={};const W=s.getParameter(s.SCISSOR_BOX),et=s.getParameter(s.VIEWPORT),ut=new Fe().fromArray(W),dt=new Fe().fromArray(et);function it(k,Et,Tt,kt){const Ot=new Uint8Array(4),ue=s.createTexture();s.bindTexture(k,ue),s.texParameteri(k,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(k,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let de=0;de<Tt;de++)n&&(k===s.TEXTURE_3D||k===s.TEXTURE_2D_ARRAY)?s.texImage3D(Et,0,s.RGBA,1,1,kt,0,s.RGBA,s.UNSIGNED_BYTE,Ot):s.texImage2D(Et+de,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ot);return ue}const ht={};ht[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),ht[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ht[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ht[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),ft(s.DEPTH_TEST),c.setFunc(pr),xt(!1),I(Uc),ft(s.CULL_FACE),tt(Oe);function ft(k){u[k]!==!0&&(s.enable(k),u[k]=!0)}function pt(k){u[k]!==!1&&(s.disable(k),u[k]=!1)}function _t(k,Et){return f[k]!==Et?(s.bindFramebuffer(k,Et),f[k]=Et,n&&(k===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=Et),k===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=Et)),!0):!1}function z(k,Et){let Tt=v,kt=!1;if(k)if(Tt=p.get(Et),Tt===void 0&&(Tt=[],p.set(Et,Tt)),k.isWebGLMultipleRenderTargets){const Ot=k.texture;if(Tt.length!==Ot.length||Tt[0]!==s.COLOR_ATTACHMENT0){for(let ue=0,de=Ot.length;ue<de;ue++)Tt[ue]=s.COLOR_ATTACHMENT0+ue;Tt.length=Ot.length,kt=!0}}else Tt[0]!==s.COLOR_ATTACHMENT0&&(Tt[0]=s.COLOR_ATTACHMENT0,kt=!0);else Tt[0]!==s.BACK&&(Tt[0]=s.BACK,kt=!0);kt&&(e.isWebGL2?s.drawBuffers(Tt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Tt))}function ct(k){return g!==k?(s.useProgram(k),g=k,!0):!1}const K={[Mn]:s.FUNC_ADD,[zd]:s.FUNC_SUBTRACT,[Bd]:s.FUNC_REVERSE_SUBTRACT};if(n)K[Oc]=s.MIN,K[zc]=s.MAX;else{const k=t.get("EXT_blend_minmax");k!==null&&(K[Oc]=k.MIN_EXT,K[zc]=k.MAX_EXT)}const lt={[Is]:s.ZERO,[kd]:s.ONE,[Gd]:s.SRC_COLOR,[ka]:s.SRC_ALPHA,[Xd]:s.SRC_ALPHA_SATURATE,[Wa]:s.DST_COLOR,[Ha]:s.DST_ALPHA,[Hd]:s.ONE_MINUS_SRC_COLOR,[Ga]:s.ONE_MINUS_SRC_ALPHA,[Vd]:s.ONE_MINUS_DST_COLOR,[Wd]:s.ONE_MINUS_DST_ALPHA,[qd]:s.CONSTANT_COLOR,[Yd]:s.ONE_MINUS_CONSTANT_COLOR,[jd]:s.CONSTANT_ALPHA,[Zd]:s.ONE_MINUS_CONSTANT_ALPHA};function tt(k,Et,Tt,kt,Ot,ue,de,Ie,qe,fe){if(k===Oe){m===!0&&(pt(s.BLEND),m=!1);return}if(m===!1&&(ft(s.BLEND),m=!0),k!==ru){if(k!==x||fe!==L){if((M!==Mn||S!==Mn)&&(s.blendEquation(s.FUNC_ADD),M=Mn,S=Mn),fe)switch(k){case Qi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case za:s.blendFunc(s.ONE,s.ONE);break;case Fc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ba:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}else switch(k){case Qi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case za:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Fc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Ba:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",k);break}y=null,w=null,b=null,T=null,_.set(0,0,0),E=0,x=k,L=fe}return}Ot=Ot||Et,ue=ue||Tt,de=de||kt,(Et!==M||Ot!==S)&&(s.blendEquationSeparate(K[Et],K[Ot]),M=Et,S=Ot),(Tt!==y||kt!==w||ue!==b||de!==T)&&(s.blendFuncSeparate(lt[Tt],lt[kt],lt[ue],lt[de]),y=Tt,w=kt,b=ue,T=de),(Ie.equals(_)===!1||qe!==E)&&(s.blendColor(Ie.r,Ie.g,Ie.b,qe),_.copy(Ie),E=qe),x=k,L=!1}function Rt(k,Et){k.side===be?pt(s.CULL_FACE):ft(s.CULL_FACE);let Tt=k.side===Ke;Et&&(Tt=!Tt),xt(Tt),k.blending===Qi&&k.transparent===!1?tt(Oe):tt(k.blending,k.blendEquation,k.blendSrc,k.blendDst,k.blendEquationAlpha,k.blendSrcAlpha,k.blendDstAlpha,k.blendColor,k.blendAlpha,k.premultipliedAlpha),c.setFunc(k.depthFunc),c.setTest(k.depthTest),c.setMask(k.depthWrite),a.setMask(k.colorWrite);const kt=k.stencilWrite;l.setTest(kt),kt&&(l.setMask(k.stencilWriteMask),l.setFunc(k.stencilFunc,k.stencilRef,k.stencilFuncMask),l.setOp(k.stencilFail,k.stencilZFail,k.stencilZPass)),Y(k.polygonOffset,k.polygonOffsetFactor,k.polygonOffsetUnits),k.alphaToCoverage===!0?ft(s.SAMPLE_ALPHA_TO_COVERAGE):pt(s.SAMPLE_ALPHA_TO_COVERAGE)}function xt(k){P!==k&&(k?s.frontFace(s.CW):s.frontFace(s.CCW),P=k)}function I(k){k!==Fd?(ft(s.CULL_FACE),k!==U&&(k===Uc?s.cullFace(s.BACK):k===Od?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):pt(s.CULL_FACE),U=k}function R(k){k!==C&&(G&&s.lineWidth(k),C=k)}function Y(k,Et,Tt){k?(ft(s.POLYGON_OFFSET_FILL),(D!==Et||F!==Tt)&&(s.polygonOffset(Et,Tt),D=Et,F=Tt)):pt(s.POLYGON_OFFSET_FILL)}function rt(k){k?ft(s.SCISSOR_TEST):pt(s.SCISSOR_TEST)}function ot(k){k===void 0&&(k=s.TEXTURE0+V-1),H!==k&&(s.activeTexture(k),H=k)}function st(k,Et,Tt){Tt===void 0&&(H===null?Tt=s.TEXTURE0+V-1:Tt=H);let kt=X[Tt];kt===void 0&&(kt={type:void 0,texture:void 0},X[Tt]=kt),(kt.type!==k||kt.texture!==Et)&&(H!==Tt&&(s.activeTexture(Tt),H=Tt),s.bindTexture(k,Et||ht[k]),kt.type=k,kt.texture=Et)}function yt(){const k=X[H];k!==void 0&&k.type!==void 0&&(s.bindTexture(k.type,null),k.type=void 0,k.texture=void 0)}function gt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function bt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Nt(){try{s.texSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ft(){try{s.texSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function at(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Zt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Xt(){try{s.texStorage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Bt(){try{s.texStorage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function St(){try{s.texImage2D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function At(){try{s.texImage3D.apply(s,arguments)}catch(k){console.error("THREE.WebGLState:",k)}}function Ht(k){ut.equals(k)===!1&&(s.scissor(k.x,k.y,k.z,k.w),ut.copy(k))}function ne(k){dt.equals(k)===!1&&(s.viewport(k.x,k.y,k.z,k.w),dt.copy(k))}function ce(k,Et){let Tt=d.get(Et);Tt===void 0&&(Tt=new WeakMap,d.set(Et,Tt));let kt=Tt.get(k);kt===void 0&&(kt=s.getUniformBlockIndex(Et,k.name),Tt.set(k,kt))}function Wt(k,Et){const kt=d.get(Et).get(k);h.get(Et)!==kt&&(s.uniformBlockBinding(Et,kt,k.__bindingPointIndex),h.set(Et,kt))}function vt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},H=null,X={},f={},p=new WeakMap,v=[],g=null,m=!1,x=null,M=null,y=null,w=null,S=null,b=null,T=null,_=new Dt(0,0,0),E=0,L=!1,P=null,U=null,C=null,D=null,F=null,ut.set(0,0,s.canvas.width,s.canvas.height),dt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:ft,disable:pt,bindFramebuffer:_t,drawBuffers:z,useProgram:ct,setBlending:tt,setMaterial:Rt,setFlipSided:xt,setCullFace:I,setLineWidth:R,setPolygonOffset:Y,setScissorTest:rt,activeTexture:ot,bindTexture:st,unbindTexture:yt,compressedTexImage2D:gt,compressedTexImage3D:bt,texImage2D:St,texImage3D:At,updateUBOMapping:ce,uniformBlockBinding:Wt,texStorage2D:Xt,texStorage3D:Bt,texSubImage2D:Nt,texSubImage3D:Ft,compressedTexSubImage2D:at,compressedTexSubImage3D:Zt,scissor:Ht,viewport:ne,reset:vt}}function Bv(s,t,e,n,i,o,r){const a=i.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(I,R){return f?new OffscreenCanvas(I,R):yr("canvas")}function v(I,R,Y,rt){let ot=1;if((I.width>rt||I.height>rt)&&(ot=rt/Math.max(I.width,I.height)),ot<1||R===!0)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap){const st=R?Mr:Math.floor,yt=st(ot*I.width),gt=st(ot*I.height);d===void 0&&(d=p(yt,gt));const bt=Y?p(yt,gt):d;return bt.width=yt,bt.height=gt,bt.getContext("2d").drawImage(I,0,0,yt,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+I.width+"x"+I.height+") to ("+yt+"x"+gt+")."),bt}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+I.width+"x"+I.height+")."),I;return I}function g(I){return ja(I.width)&&ja(I.height)}function m(I){return a?!1:I.wrapS!==yn||I.wrapT!==yn||I.minFilter!==Se&&I.minFilter!==$e}function x(I,R){return I.generateMipmaps&&R&&I.minFilter!==Se&&I.minFilter!==$e}function M(I){s.generateMipmap(I)}function y(I,R,Y,rt,ot=!1){if(a===!1)return R;if(I!==null){if(s[I]!==void 0)return s[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let st=R;if(R===s.RED&&(Y===s.FLOAT&&(st=s.R32F),Y===s.HALF_FLOAT&&(st=s.R16F),Y===s.UNSIGNED_BYTE&&(st=s.R8)),R===s.RED_INTEGER&&(Y===s.UNSIGNED_BYTE&&(st=s.R8UI),Y===s.UNSIGNED_SHORT&&(st=s.R16UI),Y===s.UNSIGNED_INT&&(st=s.R32UI),Y===s.BYTE&&(st=s.R8I),Y===s.SHORT&&(st=s.R16I),Y===s.INT&&(st=s.R32I)),R===s.RG&&(Y===s.FLOAT&&(st=s.RG32F),Y===s.HALF_FLOAT&&(st=s.RG16F),Y===s.UNSIGNED_BYTE&&(st=s.RG8)),R===s.RGBA){const yt=ot?mr:oe.getTransfer(rt);Y===s.FLOAT&&(st=s.RGBA32F),Y===s.HALF_FLOAT&&(st=s.RGBA16F),Y===s.UNSIGNED_BYTE&&(st=yt===pe?s.SRGB8_ALPHA8:s.RGBA8),Y===s.UNSIGNED_SHORT_4_4_4_4&&(st=s.RGBA4),Y===s.UNSIGNED_SHORT_5_5_5_1&&(st=s.RGB5_A1)}return(st===s.R16F||st===s.R32F||st===s.RG16F||st===s.RG32F||st===s.RGBA16F||st===s.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function w(I,R,Y){return x(I,Y)===!0||I.isFramebufferTexture&&I.minFilter!==Se&&I.minFilter!==$e?Math.log2(Math.max(R.width,R.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?R.mipmaps.length:1}function S(I){return I===Se||I===Bc||I===zr?s.NEAREST:s.LINEAR}function b(I){const R=I.target;R.removeEventListener("dispose",b),_(R),R.isVideoTexture&&h.delete(R)}function T(I){const R=I.target;R.removeEventListener("dispose",T),L(R)}function _(I){const R=n.get(I);if(R.__webglInit===void 0)return;const Y=I.source,rt=u.get(Y);if(rt){const ot=rt[R.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&E(I),Object.keys(rt).length===0&&u.delete(Y)}n.remove(I)}function E(I){const R=n.get(I);s.deleteTexture(R.__webglTexture);const Y=I.source,rt=u.get(Y);delete rt[R.__cacheKey],r.memory.textures--}function L(I){const R=I.texture,Y=n.get(I),rt=n.get(R);if(rt.__webglTexture!==void 0&&(s.deleteTexture(rt.__webglTexture),r.memory.textures--),I.depthTexture&&I.depthTexture.dispose(),I.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(Y.__webglFramebuffer[ot]))for(let st=0;st<Y.__webglFramebuffer[ot].length;st++)s.deleteFramebuffer(Y.__webglFramebuffer[ot][st]);else s.deleteFramebuffer(Y.__webglFramebuffer[ot]);Y.__webglDepthbuffer&&s.deleteRenderbuffer(Y.__webglDepthbuffer[ot])}else{if(Array.isArray(Y.__webglFramebuffer))for(let ot=0;ot<Y.__webglFramebuffer.length;ot++)s.deleteFramebuffer(Y.__webglFramebuffer[ot]);else s.deleteFramebuffer(Y.__webglFramebuffer);if(Y.__webglDepthbuffer&&s.deleteRenderbuffer(Y.__webglDepthbuffer),Y.__webglMultisampledFramebuffer&&s.deleteFramebuffer(Y.__webglMultisampledFramebuffer),Y.__webglColorRenderbuffer)for(let ot=0;ot<Y.__webglColorRenderbuffer.length;ot++)Y.__webglColorRenderbuffer[ot]&&s.deleteRenderbuffer(Y.__webglColorRenderbuffer[ot]);Y.__webglDepthRenderbuffer&&s.deleteRenderbuffer(Y.__webglDepthRenderbuffer)}if(I.isWebGLMultipleRenderTargets)for(let ot=0,st=R.length;ot<st;ot++){const yt=n.get(R[ot]);yt.__webglTexture&&(s.deleteTexture(yt.__webglTexture),r.memory.textures--),n.remove(R[ot])}n.remove(R),n.remove(I)}let P=0;function U(){P=0}function C(){const I=P;return I>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+i.maxTextures),P+=1,I}function D(I){const R=[];return R.push(I.wrapS),R.push(I.wrapT),R.push(I.wrapR||0),R.push(I.magFilter),R.push(I.minFilter),R.push(I.anisotropy),R.push(I.internalFormat),R.push(I.format),R.push(I.type),R.push(I.generateMipmaps),R.push(I.premultiplyAlpha),R.push(I.flipY),R.push(I.unpackAlignment),R.push(I.colorSpace),R.join()}function F(I,R){const Y=n.get(I);if(I.isVideoTexture&&Rt(I),I.isRenderTargetTexture===!1&&I.version>0&&Y.__version!==I.version){const rt=I.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ut(Y,I,R);return}}e.bindTexture(s.TEXTURE_2D,Y.__webglTexture,s.TEXTURE0+R)}function V(I,R){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){ut(Y,I,R);return}e.bindTexture(s.TEXTURE_2D_ARRAY,Y.__webglTexture,s.TEXTURE0+R)}function G(I,R){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){ut(Y,I,R);return}e.bindTexture(s.TEXTURE_3D,Y.__webglTexture,s.TEXTURE0+R)}function B(I,R){const Y=n.get(I);if(I.version>0&&Y.__version!==I.version){dt(Y,I,R);return}e.bindTexture(s.TEXTURE_CUBE_MAP,Y.__webglTexture,s.TEXTURE0+R)}const q={[le]:s.REPEAT,[yn]:s.CLAMP_TO_EDGE,[qa]:s.MIRRORED_REPEAT},H={[Se]:s.NEAREST,[Bc]:s.NEAREST_MIPMAP_NEAREST,[zr]:s.NEAREST_MIPMAP_LINEAR,[$e]:s.LINEAR,[af]:s.LINEAR_MIPMAP_NEAREST,[ss]:s.LINEAR_MIPMAP_LINEAR},X={[Mf]:s.NEVER,[Ef]:s.ALWAYS,[yf]:s.LESS,[wu]:s.LEQUAL,[wf]:s.EQUAL,[bf]:s.GEQUAL,[_f]:s.GREATER,[Sf]:s.NOTEQUAL};function W(I,R,Y){if(Y?(s.texParameteri(I,s.TEXTURE_WRAP_S,q[R.wrapS]),s.texParameteri(I,s.TEXTURE_WRAP_T,q[R.wrapT]),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,q[R.wrapR]),s.texParameteri(I,s.TEXTURE_MAG_FILTER,H[R.magFilter]),s.texParameteri(I,s.TEXTURE_MIN_FILTER,H[R.minFilter])):(s.texParameteri(I,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(I,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(I===s.TEXTURE_3D||I===s.TEXTURE_2D_ARRAY)&&s.texParameteri(I,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(R.wrapS!==yn||R.wrapT!==yn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(I,s.TEXTURE_MAG_FILTER,S(R.magFilter)),s.texParameteri(I,s.TEXTURE_MIN_FILTER,S(R.minFilter)),R.minFilter!==Se&&R.minFilter!==$e&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),R.compareFunction&&(s.texParameteri(I,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(I,s.TEXTURE_COMPARE_FUNC,X[R.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const rt=t.get("EXT_texture_filter_anisotropic");if(R.magFilter===Se||R.minFilter!==zr&&R.minFilter!==ss||R.type===Qn&&t.has("OES_texture_float_linear")===!1||a===!1&&R.type===an&&t.has("OES_texture_half_float_linear")===!1)return;(R.anisotropy>1||n.get(R).__currentAnisotropy)&&(s.texParameterf(I,rt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(R.anisotropy,i.getMaxAnisotropy())),n.get(R).__currentAnisotropy=R.anisotropy)}}function et(I,R){let Y=!1;I.__webglInit===void 0&&(I.__webglInit=!0,R.addEventListener("dispose",b));const rt=R.source;let ot=u.get(rt);ot===void 0&&(ot={},u.set(rt,ot));const st=D(R);if(st!==I.__cacheKey){ot[st]===void 0&&(ot[st]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,Y=!0),ot[st].usedTimes++;const yt=ot[I.__cacheKey];yt!==void 0&&(ot[I.__cacheKey].usedTimes--,yt.usedTimes===0&&E(R)),I.__cacheKey=st,I.__webglTexture=ot[st].texture}return Y}function ut(I,R,Y){let rt=s.TEXTURE_2D;(R.isDataArrayTexture||R.isCompressedArrayTexture)&&(rt=s.TEXTURE_2D_ARRAY),R.isData3DTexture&&(rt=s.TEXTURE_3D);const ot=et(I,R),st=R.source;e.bindTexture(rt,I.__webglTexture,s.TEXTURE0+Y);const yt=n.get(st);if(st.version!==yt.__version||ot===!0){e.activeTexture(s.TEXTURE0+Y);const gt=oe.getPrimaries(oe.workingColorSpace),bt=R.colorSpace===dn?null:oe.getPrimaries(R.colorSpace),Nt=R.colorSpace===dn||gt===bt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Nt);const Ft=m(R)&&g(R.image)===!1;let at=v(R.image,Ft,!1,i.maxTextureSize);at=xt(R,at);const Zt=g(at)||a,Xt=o.convert(R.format,R.colorSpace);let Bt=o.convert(R.type),St=y(R.internalFormat,Xt,Bt,R.colorSpace,R.isVideoTexture);W(rt,R,Zt);let At;const Ht=R.mipmaps,ne=a&&R.isVideoTexture!==!0&&St!==Mu,ce=yt.__version===void 0||ot===!0,Wt=w(R,at,Zt);if(R.isDepthTexture)St=s.DEPTH_COMPONENT,a?R.type===Qn?St=s.DEPTH_COMPONENT32F:R.type===Jn?St=s.DEPTH_COMPONENT24:R.type===ei?St=s.DEPTH24_STENCIL8:St=s.DEPTH_COMPONENT16:R.type===Qn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),R.format===xi&&St===s.DEPTH_COMPONENT&&R.type!==oc&&R.type!==Jn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),R.type=Jn,Bt=o.convert(R.type)),R.format===wi&&St===s.DEPTH_COMPONENT&&(St=s.DEPTH_STENCIL,R.type!==ei&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),R.type=ei,Bt=o.convert(R.type))),ce&&(ne?e.texStorage2D(s.TEXTURE_2D,1,St,at.width,at.height):e.texImage2D(s.TEXTURE_2D,0,St,at.width,at.height,0,Xt,Bt,null));else if(R.isDataTexture)if(Ht.length>0&&Zt){ne&&ce&&e.texStorage2D(s.TEXTURE_2D,Wt,St,Ht[0].width,Ht[0].height);for(let vt=0,k=Ht.length;vt<k;vt++)At=Ht[vt],ne?e.texSubImage2D(s.TEXTURE_2D,vt,0,0,At.width,At.height,Xt,Bt,At.data):e.texImage2D(s.TEXTURE_2D,vt,St,At.width,At.height,0,Xt,Bt,At.data);R.generateMipmaps=!1}else ne?(ce&&e.texStorage2D(s.TEXTURE_2D,Wt,St,at.width,at.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,at.width,at.height,Xt,Bt,at.data)):e.texImage2D(s.TEXTURE_2D,0,St,at.width,at.height,0,Xt,Bt,at.data);else if(R.isCompressedTexture)if(R.isCompressedArrayTexture){ne&&ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Wt,St,Ht[0].width,Ht[0].height,at.depth);for(let vt=0,k=Ht.length;vt<k;vt++)At=Ht[vt],R.format!==un?Xt!==null?ne?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,vt,0,0,0,At.width,At.height,at.depth,Xt,At.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,vt,St,At.width,At.height,at.depth,0,At.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?e.texSubImage3D(s.TEXTURE_2D_ARRAY,vt,0,0,0,At.width,At.height,at.depth,Xt,Bt,At.data):e.texImage3D(s.TEXTURE_2D_ARRAY,vt,St,At.width,At.height,at.depth,0,Xt,Bt,At.data)}else{ne&&ce&&e.texStorage2D(s.TEXTURE_2D,Wt,St,Ht[0].width,Ht[0].height);for(let vt=0,k=Ht.length;vt<k;vt++)At=Ht[vt],R.format!==un?Xt!==null?ne?e.compressedTexSubImage2D(s.TEXTURE_2D,vt,0,0,At.width,At.height,Xt,At.data):e.compressedTexImage2D(s.TEXTURE_2D,vt,St,At.width,At.height,0,At.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ne?e.texSubImage2D(s.TEXTURE_2D,vt,0,0,At.width,At.height,Xt,Bt,At.data):e.texImage2D(s.TEXTURE_2D,vt,St,At.width,At.height,0,Xt,Bt,At.data)}else if(R.isDataArrayTexture)ne?(ce&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Wt,St,at.width,at.height,at.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,Xt,Bt,at.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,St,at.width,at.height,at.depth,0,Xt,Bt,at.data);else if(R.isData3DTexture)ne?(ce&&e.texStorage3D(s.TEXTURE_3D,Wt,St,at.width,at.height,at.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,Xt,Bt,at.data)):e.texImage3D(s.TEXTURE_3D,0,St,at.width,at.height,at.depth,0,Xt,Bt,at.data);else if(R.isFramebufferTexture){if(ce)if(ne)e.texStorage2D(s.TEXTURE_2D,Wt,St,at.width,at.height);else{let vt=at.width,k=at.height;for(let Et=0;Et<Wt;Et++)e.texImage2D(s.TEXTURE_2D,Et,St,vt,k,0,Xt,Bt,null),vt>>=1,k>>=1}}else if(Ht.length>0&&Zt){ne&&ce&&e.texStorage2D(s.TEXTURE_2D,Wt,St,Ht[0].width,Ht[0].height);for(let vt=0,k=Ht.length;vt<k;vt++)At=Ht[vt],ne?e.texSubImage2D(s.TEXTURE_2D,vt,0,0,Xt,Bt,At):e.texImage2D(s.TEXTURE_2D,vt,St,Xt,Bt,At);R.generateMipmaps=!1}else ne?(ce&&e.texStorage2D(s.TEXTURE_2D,Wt,St,at.width,at.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,Xt,Bt,at)):e.texImage2D(s.TEXTURE_2D,0,St,Xt,Bt,at);x(R,Zt)&&M(rt),yt.__version=st.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function dt(I,R,Y){if(R.image.length!==6)return;const rt=et(I,R),ot=R.source;e.bindTexture(s.TEXTURE_CUBE_MAP,I.__webglTexture,s.TEXTURE0+Y);const st=n.get(ot);if(ot.version!==st.__version||rt===!0){e.activeTexture(s.TEXTURE0+Y);const yt=oe.getPrimaries(oe.workingColorSpace),gt=R.colorSpace===dn?null:oe.getPrimaries(R.colorSpace),bt=R.colorSpace===dn||yt===gt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,R.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,R.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,R.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,bt);const Nt=R.isCompressedTexture||R.image[0].isCompressedTexture,Ft=R.image[0]&&R.image[0].isDataTexture,at=[];for(let vt=0;vt<6;vt++)!Nt&&!Ft?at[vt]=v(R.image[vt],!1,!0,i.maxCubemapSize):at[vt]=Ft?R.image[vt].image:R.image[vt],at[vt]=xt(R,at[vt]);const Zt=at[0],Xt=g(Zt)||a,Bt=o.convert(R.format,R.colorSpace),St=o.convert(R.type),At=y(R.internalFormat,Bt,St,R.colorSpace),Ht=a&&R.isVideoTexture!==!0,ne=st.__version===void 0||rt===!0;let ce=w(R,Zt,Xt);W(s.TEXTURE_CUBE_MAP,R,Xt);let Wt;if(Nt){Ht&&ne&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ce,At,Zt.width,Zt.height);for(let vt=0;vt<6;vt++){Wt=at[vt].mipmaps;for(let k=0;k<Wt.length;k++){const Et=Wt[k];R.format!==un?Bt!==null?Ht?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k,0,0,Et.width,Et.height,Bt,Et.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k,At,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k,0,0,Et.width,Et.height,Bt,St,Et.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k,At,Et.width,Et.height,0,Bt,St,Et.data)}}}else{Wt=R.mipmaps,Ht&&ne&&(Wt.length>0&&ce++,e.texStorage2D(s.TEXTURE_CUBE_MAP,ce,At,at[0].width,at[0].height));for(let vt=0;vt<6;vt++)if(Ft){Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,at[vt].width,at[vt].height,Bt,St,at[vt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,At,at[vt].width,at[vt].height,0,Bt,St,at[vt].data);for(let k=0;k<Wt.length;k++){const Tt=Wt[k].image[vt].image;Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k+1,0,0,Tt.width,Tt.height,Bt,St,Tt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k+1,At,Tt.width,Tt.height,0,Bt,St,Tt.data)}}else{Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,0,0,Bt,St,at[vt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,0,At,Bt,St,at[vt]);for(let k=0;k<Wt.length;k++){const Et=Wt[k];Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k+1,0,0,Bt,St,Et.image[vt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+vt,k+1,At,Bt,St,Et.image[vt])}}}x(R,Xt)&&M(s.TEXTURE_CUBE_MAP),st.__version=ot.version,R.onUpdate&&R.onUpdate(R)}I.__version=R.version}function it(I,R,Y,rt,ot,st){const yt=o.convert(Y.format,Y.colorSpace),gt=o.convert(Y.type),bt=y(Y.internalFormat,yt,gt,Y.colorSpace);if(!n.get(R).__hasExternalTextures){const Ft=Math.max(1,R.width>>st),at=Math.max(1,R.height>>st);ot===s.TEXTURE_3D||ot===s.TEXTURE_2D_ARRAY?e.texImage3D(ot,st,bt,Ft,at,R.depth,0,yt,gt,null):e.texImage2D(ot,st,bt,Ft,at,0,yt,gt,null)}e.bindFramebuffer(s.FRAMEBUFFER,I),tt(R)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,rt,ot,n.get(Y).__webglTexture,0,lt(R)):(ot===s.TEXTURE_2D||ot>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,rt,ot,n.get(Y).__webglTexture,st),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(I,R,Y){if(s.bindRenderbuffer(s.RENDERBUFFER,I),R.depthBuffer&&!R.stencilBuffer){let rt=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(Y||tt(R)){const ot=R.depthTexture;ot&&ot.isDepthTexture&&(ot.type===Qn?rt=s.DEPTH_COMPONENT32F:ot.type===Jn&&(rt=s.DEPTH_COMPONENT24));const st=lt(R);tt(R)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,st,rt,R.width,R.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,st,rt,R.width,R.height)}else s.renderbufferStorage(s.RENDERBUFFER,rt,R.width,R.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,I)}else if(R.depthBuffer&&R.stencilBuffer){const rt=lt(R);Y&&tt(R)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,s.DEPTH24_STENCIL8,R.width,R.height):tt(R)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,rt,s.DEPTH24_STENCIL8,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,I)}else{const rt=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let ot=0;ot<rt.length;ot++){const st=rt[ot],yt=o.convert(st.format,st.colorSpace),gt=o.convert(st.type),bt=y(st.internalFormat,yt,gt,st.colorSpace),Nt=lt(R);Y&&tt(R)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Nt,bt,R.width,R.height):tt(R)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Nt,bt,R.width,R.height):s.renderbufferStorage(s.RENDERBUFFER,bt,R.width,R.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function ft(I,R){if(R&&R.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,I),!(R.depthTexture&&R.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(R.depthTexture).__webglTexture||R.depthTexture.image.width!==R.width||R.depthTexture.image.height!==R.height)&&(R.depthTexture.image.width=R.width,R.depthTexture.image.height=R.height,R.depthTexture.needsUpdate=!0),F(R.depthTexture,0);const rt=n.get(R.depthTexture).__webglTexture,ot=lt(R);if(R.depthTexture.format===xi)tt(R)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,rt,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,rt,0);else if(R.depthTexture.format===wi)tt(R)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,rt,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function pt(I){const R=n.get(I),Y=I.isWebGLCubeRenderTarget===!0;if(I.depthTexture&&!R.__autoAllocateDepthBuffer){if(Y)throw new Error("target.depthTexture not supported in Cube render targets");ft(R.__webglFramebuffer,I)}else if(Y){R.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)e.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer[rt]),R.__webglDepthbuffer[rt]=s.createRenderbuffer(),ht(R.__webglDepthbuffer[rt],I,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,R.__webglFramebuffer),R.__webglDepthbuffer=s.createRenderbuffer(),ht(R.__webglDepthbuffer,I,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function _t(I,R,Y){const rt=n.get(I);R!==void 0&&it(rt.__webglFramebuffer,I,I.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),Y!==void 0&&pt(I)}function z(I){const R=I.texture,Y=n.get(I),rt=n.get(R);I.addEventListener("dispose",T),I.isWebGLMultipleRenderTargets!==!0&&(rt.__webglTexture===void 0&&(rt.__webglTexture=s.createTexture()),rt.__version=R.version,r.memory.textures++);const ot=I.isWebGLCubeRenderTarget===!0,st=I.isWebGLMultipleRenderTargets===!0,yt=g(I)||a;if(ot){Y.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(a&&R.mipmaps&&R.mipmaps.length>0){Y.__webglFramebuffer[gt]=[];for(let bt=0;bt<R.mipmaps.length;bt++)Y.__webglFramebuffer[gt][bt]=s.createFramebuffer()}else Y.__webglFramebuffer[gt]=s.createFramebuffer()}else{if(a&&R.mipmaps&&R.mipmaps.length>0){Y.__webglFramebuffer=[];for(let gt=0;gt<R.mipmaps.length;gt++)Y.__webglFramebuffer[gt]=s.createFramebuffer()}else Y.__webglFramebuffer=s.createFramebuffer();if(st)if(i.drawBuffers){const gt=I.texture;for(let bt=0,Nt=gt.length;bt<Nt;bt++){const Ft=n.get(gt[bt]);Ft.__webglTexture===void 0&&(Ft.__webglTexture=s.createTexture(),r.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&I.samples>0&&tt(I)===!1){const gt=st?R:[R];Y.__webglMultisampledFramebuffer=s.createFramebuffer(),Y.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,Y.__webglMultisampledFramebuffer);for(let bt=0;bt<gt.length;bt++){const Nt=gt[bt];Y.__webglColorRenderbuffer[bt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,Y.__webglColorRenderbuffer[bt]);const Ft=o.convert(Nt.format,Nt.colorSpace),at=o.convert(Nt.type),Zt=y(Nt.internalFormat,Ft,at,Nt.colorSpace,I.isXRRenderTarget===!0),Xt=lt(I);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt,Zt,I.width,I.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+bt,s.RENDERBUFFER,Y.__webglColorRenderbuffer[bt])}s.bindRenderbuffer(s.RENDERBUFFER,null),I.depthBuffer&&(Y.__webglDepthRenderbuffer=s.createRenderbuffer(),ht(Y.__webglDepthRenderbuffer,I,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ot){e.bindTexture(s.TEXTURE_CUBE_MAP,rt.__webglTexture),W(s.TEXTURE_CUBE_MAP,R,yt);for(let gt=0;gt<6;gt++)if(a&&R.mipmaps&&R.mipmaps.length>0)for(let bt=0;bt<R.mipmaps.length;bt++)it(Y.__webglFramebuffer[gt][bt],I,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,bt);else it(Y.__webglFramebuffer[gt],I,R,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);x(R,yt)&&M(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){const gt=I.texture;for(let bt=0,Nt=gt.length;bt<Nt;bt++){const Ft=gt[bt],at=n.get(Ft);e.bindTexture(s.TEXTURE_2D,at.__webglTexture),W(s.TEXTURE_2D,Ft,yt),it(Y.__webglFramebuffer,I,Ft,s.COLOR_ATTACHMENT0+bt,s.TEXTURE_2D,0),x(Ft,yt)&&M(s.TEXTURE_2D)}e.unbindTexture()}else{let gt=s.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(a?gt=I.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(gt,rt.__webglTexture),W(gt,R,yt),a&&R.mipmaps&&R.mipmaps.length>0)for(let bt=0;bt<R.mipmaps.length;bt++)it(Y.__webglFramebuffer[bt],I,R,s.COLOR_ATTACHMENT0,gt,bt);else it(Y.__webglFramebuffer,I,R,s.COLOR_ATTACHMENT0,gt,0);x(R,yt)&&M(gt),e.unbindTexture()}I.depthBuffer&&pt(I)}function ct(I){const R=g(I)||a,Y=I.isWebGLMultipleRenderTargets===!0?I.texture:[I.texture];for(let rt=0,ot=Y.length;rt<ot;rt++){const st=Y[rt];if(x(st,R)){const yt=I.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,gt=n.get(st).__webglTexture;e.bindTexture(yt,gt),M(yt),e.unbindTexture()}}}function K(I){if(a&&I.samples>0&&tt(I)===!1){const R=I.isWebGLMultipleRenderTargets?I.texture:[I.texture],Y=I.width,rt=I.height;let ot=s.COLOR_BUFFER_BIT;const st=[],yt=I.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=n.get(I),bt=I.isWebGLMultipleRenderTargets===!0;if(bt)for(let Nt=0;Nt<R.length;Nt++)e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Nt=0;Nt<R.length;Nt++){st.push(s.COLOR_ATTACHMENT0+Nt),I.depthBuffer&&st.push(yt);const Ft=gt.__ignoreDepthValues!==void 0?gt.__ignoreDepthValues:!1;if(Ft===!1&&(I.depthBuffer&&(ot|=s.DEPTH_BUFFER_BIT),I.stencilBuffer&&(ot|=s.STENCIL_BUFFER_BIT)),bt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,gt.__webglColorRenderbuffer[Nt]),Ft===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[yt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[yt])),bt){const at=n.get(R[Nt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,at,0)}s.blitFramebuffer(0,0,Y,rt,0,0,Y,rt,ot,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,st)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),bt)for(let Nt=0;Nt<R.length;Nt++){e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.RENDERBUFFER,gt.__webglColorRenderbuffer[Nt]);const Ft=n.get(R[Nt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Nt,s.TEXTURE_2D,Ft,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}}function lt(I){return Math.min(i.maxSamples,I.samples)}function tt(I){const R=n.get(I);return a&&I.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&R.__useRenderToTexture!==!1}function Rt(I){const R=r.render.frame;h.get(I)!==R&&(h.set(I,R),I.update())}function xt(I,R){const Y=I.colorSpace,rt=I.format,ot=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||I.format===Ya||Y!==Wn&&Y!==dn&&(oe.getTransfer(Y)===pe?a===!1?t.has("EXT_sRGB")===!0&&rt===un?(I.format=Ya,I.minFilter=$e,I.generateMipmaps=!1):R=Su.sRGBToLinear(R):(rt!==un||ot!==Hn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",Y)),R}this.allocateTextureUnit=C,this.resetTextureUnits=U,this.setTexture2D=F,this.setTexture2DArray=V,this.setTexture3D=G,this.setTextureCube=B,this.rebindTextures=_t,this.setupRenderTarget=z,this.updateRenderTargetMipmap=ct,this.updateMultisampleRenderTarget=K,this.setupDepthRenderbuffer=pt,this.setupFrameBufferTexture=it,this.useMultisampledRTT=tt}function kv(s,t,e){const n=e.isWebGL2;function i(o,r=dn){let a;const c=oe.getTransfer(r);if(o===Hn)return s.UNSIGNED_BYTE;if(o===pu)return s.UNSIGNED_SHORT_4_4_4_4;if(o===mu)return s.UNSIGNED_SHORT_5_5_5_1;if(o===cf)return s.BYTE;if(o===lf)return s.SHORT;if(o===oc)return s.UNSIGNED_SHORT;if(o===fu)return s.INT;if(o===Jn)return s.UNSIGNED_INT;if(o===Qn)return s.FLOAT;if(o===an)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===hf)return s.ALPHA;if(o===un)return s.RGBA;if(o===uf)return s.LUMINANCE;if(o===df)return s.LUMINANCE_ALPHA;if(o===xi)return s.DEPTH_COMPONENT;if(o===wi)return s.DEPTH_STENCIL;if(o===Ya)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(o===ff)return s.RED;if(o===gu)return s.RED_INTEGER;if(o===pf)return s.RG;if(o===vu)return s.RG_INTEGER;if(o===xu)return s.RGBA_INTEGER;if(o===Br||o===kr||o===Gr||o===Hr)if(c===pe)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(o===Br)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===kr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Gr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Hr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Br)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===kr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Gr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Hr)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===kc||o===Gc||o===Hc||o===Wc)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===kc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Gc)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===Hc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===Wc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===Mu)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===Vc||o===Xc)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(o===Vc)return c===pe?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(o===Xc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===qc||o===Yc||o===jc||o===Zc||o===Kc||o===Jc||o===Qc||o===$c||o===tl||o===el||o===nl||o===il||o===sl||o===ol)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(o===qc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Yc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===jc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Zc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===Kc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===Jc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Qc)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===$c)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===tl)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===el)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===nl)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===il)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===sl)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===ol)return c===pe?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Wr||o===rl||o===al)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(o===Wr)return c===pe?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===rl)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===al)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===mf||o===cl||o===ll||o===hl)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(o===Wr)return a.COMPRESSED_RED_RGTC1_EXT;if(o===cl)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===ll)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===hl)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===ei?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[o]!==void 0?s[o]:null}return{convert:i}}class Gv extends rn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class ae extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Hv={type:"move"};class da{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new ae,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new ae,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new O,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new O),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new ae,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new O,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new O),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){r=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(l,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;l.inputState.pinching&&u>f+p?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-p&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(c.matrix.fromArray(o.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,o.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(o.linearVelocity)):c.hasLinearVelocity=!1,o.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(o.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Hv)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=o!==null),l!==null&&(l.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new ae;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Wv extends cs{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,p=null;const v=e.getContextAttributes();let g=null,m=null;const x=[],M=[],y=new nt;let w=null;const S=new rn;S.layers.enable(1),S.viewport=new Fe;const b=new rn;b.layers.enable(2),b.viewport=new Fe;const T=[S,b],_=new Gv;_.layers.enable(1),_.layers.enable(2);let E=null,L=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(W){let et=x[W];return et===void 0&&(et=new da,x[W]=et),et.getTargetRaySpace()},this.getControllerGrip=function(W){let et=x[W];return et===void 0&&(et=new da,x[W]=et),et.getGripSpace()},this.getHand=function(W){let et=x[W];return et===void 0&&(et=new da,x[W]=et),et.getHandSpace()};function P(W){const et=M.indexOf(W.inputSource);if(et===-1)return;const ut=x[et];ut!==void 0&&(ut.update(W.inputSource,W.frame,l||r),ut.dispatchEvent({type:W.type,data:W.inputSource}))}function U(){i.removeEventListener("select",P),i.removeEventListener("selectstart",P),i.removeEventListener("selectend",P),i.removeEventListener("squeeze",P),i.removeEventListener("squeezestart",P),i.removeEventListener("squeezeend",P),i.removeEventListener("end",U),i.removeEventListener("inputsourceschange",C);for(let W=0;W<x.length;W++){const et=M[W];et!==null&&(M[W]=null,x[W].disconnect(et))}E=null,L=null,t.setRenderTarget(g),f=null,u=null,d=null,i=null,m=null,X.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(y.width,y.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(W){o=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(W){a=W,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||r},this.setReferenceSpace=function(W){l=W},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(W){if(i=W,i!==null){if(g=t.getRenderTarget(),i.addEventListener("select",P),i.addEventListener("selectstart",P),i.addEventListener("selectend",P),i.addEventListener("squeeze",P),i.addEventListener("squeezestart",P),i.addEventListener("squeezeend",P),i.addEventListener("end",U),i.addEventListener("inputsourceschange",C),v.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(y),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const et={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new Je(f.framebufferWidth,f.framebufferHeight,{format:un,type:Hn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let et=null,ut=null,dt=null;v.depth&&(dt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=v.stencil?wi:xi,ut=v.stencil?ei:Jn);const it={colorFormat:e.RGBA8,depthFormat:dt,scaleFactor:o};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(it),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new Je(u.textureWidth,u.textureHeight,{format:un,type:Hn,depthTexture:new dc(u.textureWidth,u.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});const ht=t.properties.get(m);ht.__ignoreDepthValues=u.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(c),l=null,r=await i.requestReferenceSpace(a),X.setContext(i),X.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function C(W){for(let et=0;et<W.removed.length;et++){const ut=W.removed[et],dt=M.indexOf(ut);dt>=0&&(M[dt]=null,x[dt].disconnect(ut))}for(let et=0;et<W.added.length;et++){const ut=W.added[et];let dt=M.indexOf(ut);if(dt===-1){for(let ht=0;ht<x.length;ht++)if(ht>=M.length){M.push(ut),dt=ht;break}else if(M[ht]===null){M[ht]=ut,dt=ht;break}if(dt===-1)break}const it=x[dt];it&&it.connect(ut)}}const D=new O,F=new O;function V(W,et,ut){D.setFromMatrixPosition(et.matrixWorld),F.setFromMatrixPosition(ut.matrixWorld);const dt=D.distanceTo(F),it=et.projectionMatrix.elements,ht=ut.projectionMatrix.elements,ft=it[14]/(it[10]-1),pt=it[14]/(it[10]+1),_t=(it[9]+1)/it[5],z=(it[9]-1)/it[5],ct=(it[8]-1)/it[0],K=(ht[8]+1)/ht[0],lt=ft*ct,tt=ft*K,Rt=dt/(-ct+K),xt=Rt*-ct;et.matrixWorld.decompose(W.position,W.quaternion,W.scale),W.translateX(xt),W.translateZ(Rt),W.matrixWorld.compose(W.position,W.quaternion,W.scale),W.matrixWorldInverse.copy(W.matrixWorld).invert();const I=ft+Rt,R=pt+Rt,Y=lt-xt,rt=tt+(dt-xt),ot=_t*pt/R*I,st=z*pt/R*I;W.projectionMatrix.makePerspective(Y,rt,ot,st,I,R),W.projectionMatrixInverse.copy(W.projectionMatrix).invert()}function G(W,et){et===null?W.matrixWorld.copy(W.matrix):W.matrixWorld.multiplyMatrices(et.matrixWorld,W.matrix),W.matrixWorldInverse.copy(W.matrixWorld).invert()}this.updateCamera=function(W){if(i===null)return;_.near=b.near=S.near=W.near,_.far=b.far=S.far=W.far,(E!==_.near||L!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),E=_.near,L=_.far);const et=W.parent,ut=_.cameras;G(_,et);for(let dt=0;dt<ut.length;dt++)G(ut[dt],et);ut.length===2?V(_,S,b):_.projectionMatrix.copy(S.projectionMatrix),B(W,_,et)};function B(W,et,ut){ut===null?W.matrix.copy(et.matrixWorld):(W.matrix.copy(ut.matrixWorld),W.matrix.invert(),W.matrix.multiply(et.matrixWorld)),W.matrix.decompose(W.position,W.quaternion,W.scale),W.updateMatrixWorld(!0),W.projectionMatrix.copy(et.projectionMatrix),W.projectionMatrixInverse.copy(et.projectionMatrixInverse),W.isPerspectiveCamera&&(W.fov=Ws*2*Math.atan(1/W.projectionMatrix.elements[5]),W.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(W){c=W,u!==null&&(u.fixedFoveation=W),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=W)};let q=null;function H(W,et){if(h=et.getViewerPose(l||r),p=et,h!==null){const ut=h.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let dt=!1;ut.length!==_.cameras.length&&(_.cameras.length=0,dt=!0);for(let it=0;it<ut.length;it++){const ht=ut[it];let ft=null;if(f!==null)ft=f.getViewport(ht);else{const _t=d.getViewSubImage(u,ht);ft=_t.viewport,it===0&&(t.setRenderTargetTextures(m,_t.colorTexture,u.ignoreDepthValues?void 0:_t.depthStencilTexture),t.setRenderTarget(m))}let pt=T[it];pt===void 0&&(pt=new rn,pt.layers.enable(it),pt.viewport=new Fe,T[it]=pt),pt.matrix.fromArray(ht.transform.matrix),pt.matrix.decompose(pt.position,pt.quaternion,pt.scale),pt.projectionMatrix.fromArray(ht.projectionMatrix),pt.projectionMatrixInverse.copy(pt.projectionMatrix).invert(),pt.viewport.set(ft.x,ft.y,ft.width,ft.height),it===0&&(_.matrix.copy(pt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),dt===!0&&_.cameras.push(pt)}}for(let ut=0;ut<x.length;ut++){const dt=M[ut],it=x[ut];dt!==null&&it!==void 0&&it.update(dt,et,l||r)}q&&q(W,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}const X=new Du;X.setAnimationLoop(H),this.setAnimationLoop=function(W){q=W},this.dispose=function(){}}}function Vv(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Pu(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,M,y){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(g,m):m.isMeshToonMaterial?(o(g,m),d(g,m)):m.isMeshPhongMaterial?(o(g,m),h(g,m)):m.isMeshStandardMaterial?(o(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,y)):m.isMeshMatcapMaterial?(o(g,m),p(g,m)):m.isMeshDepthMaterial?o(g,m):m.isMeshDistanceMaterial?(o(g,m),v(g,m)):m.isMeshNormalMaterial?o(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?c(g,m,x,M):m.isSpriteMaterial?l(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===Ke&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===Ke&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=t.get(m).envMap;if(x&&(g.envMap.value=x,g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap){g.lightMap.value=m.lightMap;const M=s._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=m.lightMapIntensity*M,e(m.lightMap,g.lightMapTransform)}m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function c(g,m,x,M){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=M*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function l(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),t.get(m).envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===Ke&&g.clearcoatNormalScale.value.negate())),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Xv(s,t,e,n){let i={},o={},r=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,M){const y=M.program;n.uniformBlockBinding(x,y)}function l(x,M){let y=i[x.id];y===void 0&&(p(x),y=h(x),i[x.id]=y,x.addEventListener("dispose",g));const w=M.program;n.updateUBOMapping(x,w);const S=t.render.frame;o[x.id]!==S&&(u(x),o[x.id]=S)}function h(x){const M=d();x.__bindingPointIndex=M;const y=s.createBuffer(),w=x.__size,S=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,y),s.bufferData(s.UNIFORM_BUFFER,w,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,M,y),y}function d(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const M=i[x.id],y=x.uniforms,w=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,M);for(let S=0,b=y.length;S<b;S++){const T=Array.isArray(y[S])?y[S]:[y[S]];for(let _=0,E=T.length;_<E;_++){const L=T[_];if(f(L,S,_,w)===!0){const P=L.__offset,U=Array.isArray(L.value)?L.value:[L.value];let C=0;for(let D=0;D<U.length;D++){const F=U[D],V=v(F);typeof F=="number"||typeof F=="boolean"?(L.__data[0]=F,s.bufferSubData(s.UNIFORM_BUFFER,P+C,L.__data)):F.isMatrix3?(L.__data[0]=F.elements[0],L.__data[1]=F.elements[1],L.__data[2]=F.elements[2],L.__data[3]=0,L.__data[4]=F.elements[3],L.__data[5]=F.elements[4],L.__data[6]=F.elements[5],L.__data[7]=0,L.__data[8]=F.elements[6],L.__data[9]=F.elements[7],L.__data[10]=F.elements[8],L.__data[11]=0):(F.toArray(L.__data,C),C+=V.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,P,L.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,M,y,w){const S=x.value,b=M+"_"+y;if(w[b]===void 0)return typeof S=="number"||typeof S=="boolean"?w[b]=S:w[b]=S.clone(),!0;{const T=w[b];if(typeof S=="number"||typeof S=="boolean"){if(T!==S)return w[b]=S,!0}else if(T.equals(S)===!1)return T.copy(S),!0}return!1}function p(x){const M=x.uniforms;let y=0;const w=16;for(let b=0,T=M.length;b<T;b++){const _=Array.isArray(M[b])?M[b]:[M[b]];for(let E=0,L=_.length;E<L;E++){const P=_[E],U=Array.isArray(P.value)?P.value:[P.value];for(let C=0,D=U.length;C<D;C++){const F=U[C],V=v(F),G=y%w;G!==0&&w-G<V.boundary&&(y+=w-G),P.__data=new Float32Array(V.storage/Float32Array.BYTES_PER_ELEMENT),P.__offset=y,y+=V.storage}}}const S=y%w;return S>0&&(y+=w-S),x.__size=y,x.__cache={},this}function v(x){const M={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(M.boundary=4,M.storage=4):x.isVector2?(M.boundary=8,M.storage=8):x.isVector3||x.isColor?(M.boundary=16,M.storage=12):x.isVector4?(M.boundary=16,M.storage=16):x.isMatrix3?(M.boundary=48,M.storage=48):x.isMatrix4?(M.boundary=64,M.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),M}function g(x){const M=x.target;M.removeEventListener("dispose",g);const y=r.indexOf(M.__bindingPointIndex);r.splice(y,1),s.deleteBuffer(i[M.id]),delete i[M.id],delete o[M.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);r=[],i={},o={}}return{bind:c,update:l,dispose:m}}class Bu{constructor(t={}){const{canvas:e=Gf(),context:n=null,depth:i=!0,stencil:o=!0,alpha:r=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=r;const f=new Uint32Array(4),p=new Int32Array(4);let v=null,g=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Yt,this._useLegacyLights=!1,this.toneMapping=ti,this.toneMappingExposure=1;const M=this;let y=!1,w=0,S=0,b=null,T=-1,_=null;const E=new Fe,L=new Fe;let P=null;const U=new Dt(0);let C=0,D=e.width,F=e.height,V=1,G=null,B=null;const q=new Fe(0,0,D,F),H=new Fe(0,0,D,F);let X=!1;const W=new lc;let et=!1,ut=!1,dt=null;const it=new jt,ht=new nt,ft=new O,pt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function _t(){return b===null?V:1}let z=n;function ct(N,j){for(let Q=0;Q<N.length;Q++){const $=N[Q],J=e.getContext($,j);if(J!==null)return J}return null}try{const N={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${ic}`),e.addEventListener("webglcontextlost",vt,!1),e.addEventListener("webglcontextrestored",k,!1),e.addEventListener("webglcontextcreationerror",Et,!1),z===null){const j=["webgl2","webgl","experimental-webgl"];if(M.isWebGL1Renderer===!0&&j.shift(),z=ct(j,N),z===null)throw ct(j)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&z instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),z.getShaderPrecisionFormat===void 0&&(z.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(N){throw console.error("THREE.WebGLRenderer: "+N.message),N}let K,lt,tt,Rt,xt,I,R,Y,rt,ot,st,yt,gt,bt,Nt,Ft,at,Zt,Xt,Bt,St,At,Ht,ne;function ce(){K=new eg(z),lt=new Zm(z,K,t),K.init(lt),At=new kv(z,K,lt),tt=new zv(z,K,lt),Rt=new sg(z),xt=new bv,I=new Bv(z,K,tt,xt,lt,At,Rt),R=new Jm(M),Y=new tg(M),rt=new dp(z,lt),Ht=new Ym(z,K,rt,lt),ot=new ng(z,rt,Rt,Ht),st=new cg(z,ot,rt,Rt),Xt=new ag(z,lt,I),Ft=new Km(xt),yt=new Sv(M,R,Y,K,lt,Ht,Ft),gt=new Vv(M,xt),bt=new Tv,Nt=new Iv(K,lt),Zt=new qm(M,R,Y,tt,st,u,c),at=new Ov(M,st,lt),ne=new Xv(z,Rt,lt,tt),Bt=new jm(z,K,Rt,lt),St=new ig(z,K,Rt,lt),Rt.programs=yt.programs,M.capabilities=lt,M.extensions=K,M.properties=xt,M.renderLists=bt,M.shadowMap=at,M.state=tt,M.info=Rt}ce();const Wt=new Wv(M,z);this.xr=Wt,this.getContext=function(){return z},this.getContextAttributes=function(){return z.getContextAttributes()},this.forceContextLoss=function(){const N=K.get("WEBGL_lose_context");N&&N.loseContext()},this.forceContextRestore=function(){const N=K.get("WEBGL_lose_context");N&&N.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(N){N!==void 0&&(V=N,this.setSize(D,F,!1))},this.getSize=function(N){return N.set(D,F)},this.setSize=function(N,j,Q=!0){if(Wt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}D=N,F=j,e.width=Math.floor(N*V),e.height=Math.floor(j*V),Q===!0&&(e.style.width=N+"px",e.style.height=j+"px"),this.setViewport(0,0,N,j)},this.getDrawingBufferSize=function(N){return N.set(D*V,F*V).floor()},this.setDrawingBufferSize=function(N,j,Q){D=N,F=j,V=Q,e.width=Math.floor(N*Q),e.height=Math.floor(j*Q),this.setViewport(0,0,N,j)},this.getCurrentViewport=function(N){return N.copy(E)},this.getViewport=function(N){return N.copy(q)},this.setViewport=function(N,j,Q,$){N.isVector4?q.set(N.x,N.y,N.z,N.w):q.set(N,j,Q,$),tt.viewport(E.copy(q).multiplyScalar(V).floor())},this.getScissor=function(N){return N.copy(H)},this.setScissor=function(N,j,Q,$){N.isVector4?H.set(N.x,N.y,N.z,N.w):H.set(N,j,Q,$),tt.scissor(L.copy(H).multiplyScalar(V).floor())},this.getScissorTest=function(){return X},this.setScissorTest=function(N){tt.setScissorTest(X=N)},this.setOpaqueSort=function(N){G=N},this.setTransparentSort=function(N){B=N},this.getClearColor=function(N){return N.copy(Zt.getClearColor())},this.setClearColor=function(){Zt.setClearColor.apply(Zt,arguments)},this.getClearAlpha=function(){return Zt.getClearAlpha()},this.setClearAlpha=function(){Zt.setClearAlpha.apply(Zt,arguments)},this.clear=function(N=!0,j=!0,Q=!0){let $=0;if(N){let J=!1;if(b!==null){const Ct=b.texture.format;J=Ct===xu||Ct===vu||Ct===gu}if(J){const Ct=b.texture.type,Ut=Ct===Hn||Ct===Jn||Ct===oc||Ct===ei||Ct===pu||Ct===mu,zt=Zt.getClearColor(),Gt=Zt.getClearAlpha(),Jt=zt.r,Vt=zt.g,qt=zt.b;Ut?(f[0]=Jt,f[1]=Vt,f[2]=qt,f[3]=Gt,z.clearBufferuiv(z.COLOR,0,f)):(p[0]=Jt,p[1]=Vt,p[2]=qt,p[3]=Gt,z.clearBufferiv(z.COLOR,0,p))}else $|=z.COLOR_BUFFER_BIT}j&&($|=z.DEPTH_BUFFER_BIT),Q&&($|=z.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),z.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",vt,!1),e.removeEventListener("webglcontextrestored",k,!1),e.removeEventListener("webglcontextcreationerror",Et,!1),bt.dispose(),Nt.dispose(),xt.dispose(),R.dispose(),Y.dispose(),st.dispose(),Ht.dispose(),ne.dispose(),yt.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",qe),Wt.removeEventListener("sessionend",fe),dt&&(dt.dispose(),dt=null),Ye.stop()};function vt(N){N.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),y=!0}function k(){console.log("THREE.WebGLRenderer: Context Restored."),y=!1;const N=Rt.autoReset,j=at.enabled,Q=at.autoUpdate,$=at.needsUpdate,J=at.type;ce(),Rt.autoReset=N,at.enabled=j,at.autoUpdate=Q,at.needsUpdate=$,at.type=J}function Et(N){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",N.statusMessage)}function Tt(N){const j=N.target;j.removeEventListener("dispose",Tt),kt(j)}function kt(N){Ot(N),xt.remove(N)}function Ot(N){const j=xt.get(N).programs;j!==void 0&&(j.forEach(function(Q){yt.releaseProgram(Q)}),N.isShaderMaterial&&yt.releaseShaderCache(N))}this.renderBufferDirect=function(N,j,Q,$,J,Ct){j===null&&(j=pt);const Ut=J.isMesh&&J.matrixWorld.determinant()<0,zt=Id(N,j,Q,$,J);tt.setMaterial($,Ut);let Gt=Q.index,Jt=1;if($.wireframe===!0){if(Gt=ot.getWireframeAttribute(Q),Gt===void 0)return;Jt=2}const Vt=Q.drawRange,qt=Q.attributes.position;let _e=Vt.start*Jt,nn=(Vt.start+Vt.count)*Jt;Ct!==null&&(_e=Math.max(_e,Ct.start*Jt),nn=Math.min(nn,(Ct.start+Ct.count)*Jt)),Gt!==null?(_e=Math.max(_e,0),nn=Math.min(nn,Gt.count)):qt!=null&&(_e=Math.max(_e,0),nn=Math.min(nn,qt.count));const De=nn-_e;if(De<0||De===1/0)return;Ht.setup(J,$,zt,Q,Gt);let Pn,xe=Bt;if(Gt!==null&&(Pn=rt.get(Gt),xe=St,xe.setIndex(Pn)),J.isMesh)$.wireframe===!0?(tt.setLineWidth($.wireframeLinewidth*_t()),xe.setMode(z.LINES)):xe.setMode(z.TRIANGLES);else if(J.isLine){let Qt=$.linewidth;Qt===void 0&&(Qt=1),tt.setLineWidth(Qt*_t()),J.isLineSegments?xe.setMode(z.LINES):J.isLineLoop?xe.setMode(z.LINE_LOOP):xe.setMode(z.LINE_STRIP)}else J.isPoints?xe.setMode(z.POINTS):J.isSprite&&xe.setMode(z.TRIANGLES);if(J.isBatchedMesh)xe.renderMultiDraw(J._multiDrawStarts,J._multiDrawCounts,J._multiDrawCount);else if(J.isInstancedMesh)xe.renderInstances(_e,De,J.count);else if(Q.isInstancedBufferGeometry){const Qt=Q._maxInstanceCount!==void 0?Q._maxInstanceCount:1/0,Nr=Math.min(Q.instanceCount,Qt);xe.renderInstances(_e,De,Nr)}else xe.render(_e,De)};function ue(N,j,Q){N.transparent===!0&&N.side===be&&N.forceSinglePass===!1?(N.side=Ke,N.needsUpdate=!0,no(N,j,Q),N.side=ni,N.needsUpdate=!0,no(N,j,Q),N.side=be):no(N,j,Q)}this.compile=function(N,j,Q=null){Q===null&&(Q=N),g=Nt.get(Q),g.init(),x.push(g),Q.traverseVisible(function(J){J.isLight&&J.layers.test(j.layers)&&(g.pushLight(J),J.castShadow&&g.pushShadow(J))}),N!==Q&&N.traverseVisible(function(J){J.isLight&&J.layers.test(j.layers)&&(g.pushLight(J),J.castShadow&&g.pushShadow(J))}),g.setupLights(M._useLegacyLights);const $=new Set;return N.traverse(function(J){const Ct=J.material;if(Ct)if(Array.isArray(Ct))for(let Ut=0;Ut<Ct.length;Ut++){const zt=Ct[Ut];ue(zt,Q,J),$.add(zt)}else ue(Ct,Q,J),$.add(Ct)}),x.pop(),g=null,$},this.compileAsync=function(N,j,Q=null){const $=this.compile(N,j,Q);return new Promise(J=>{function Ct(){if($.forEach(function(Ut){xt.get(Ut).currentProgram.isReady()&&$.delete(Ut)}),$.size===0){J(N);return}setTimeout(Ct,10)}K.get("KHR_parallel_shader_compile")!==null?Ct():setTimeout(Ct,10)})};let de=null;function Ie(N){de&&de(N)}function qe(){Ye.stop()}function fe(){Ye.start()}const Ye=new Du;Ye.setAnimationLoop(Ie),typeof self<"u"&&Ye.setContext(self),this.setAnimationLoop=function(N){de=N,Wt.setAnimationLoop(N),N===null?Ye.stop():Ye.start()},Wt.addEventListener("sessionstart",qe),Wt.addEventListener("sessionend",fe),this.render=function(N,j){if(j!==void 0&&j.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(y===!0)return;N.matrixWorldAutoUpdate===!0&&N.updateMatrixWorld(),j.parent===null&&j.matrixWorldAutoUpdate===!0&&j.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(j),j=Wt.getCamera()),N.isScene===!0&&N.onBeforeRender(M,N,j,b),g=Nt.get(N,x.length),g.init(),x.push(g),it.multiplyMatrices(j.projectionMatrix,j.matrixWorldInverse),W.setFromProjectionMatrix(it),ut=this.localClippingEnabled,et=Ft.init(this.clippingPlanes,ut),v=bt.get(N,m.length),v.init(),m.push(v),Sn(N,j,0,M.sortObjects),v.finish(),M.sortObjects===!0&&v.sort(G,B),this.info.render.frame++,et===!0&&Ft.beginShadows();const Q=g.state.shadowsArray;if(at.render(Q,N,j),et===!0&&Ft.endShadows(),this.info.autoReset===!0&&this.info.reset(),Zt.render(v,N),g.setupLights(M._useLegacyLights),j.isArrayCamera){const $=j.cameras;for(let J=0,Ct=$.length;J<Ct;J++){const Ut=$[J];Cc(v,N,Ut,Ut.viewport)}}else Cc(v,N,j);b!==null&&(I.updateMultisampleRenderTarget(b),I.updateRenderTargetMipmap(b)),N.isScene===!0&&N.onAfterRender(M,N,j),Ht.resetDefaultState(),T=-1,_=null,x.pop(),x.length>0?g=x[x.length-1]:g=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function Sn(N,j,Q,$){if(N.visible===!1)return;if(N.layers.test(j.layers)){if(N.isGroup)Q=N.renderOrder;else if(N.isLOD)N.autoUpdate===!0&&N.update(j);else if(N.isLight)g.pushLight(N),N.castShadow&&g.pushShadow(N);else if(N.isSprite){if(!N.frustumCulled||W.intersectsSprite(N)){$&&ft.setFromMatrixPosition(N.matrixWorld).applyMatrix4(it);const Ut=st.update(N),zt=N.material;zt.visible&&v.push(N,Ut,zt,Q,ft.z,null)}}else if((N.isMesh||N.isLine||N.isPoints)&&(!N.frustumCulled||W.intersectsObject(N))){const Ut=st.update(N),zt=N.material;if($&&(N.boundingSphere!==void 0?(N.boundingSphere===null&&N.computeBoundingSphere(),ft.copy(N.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),ft.copy(Ut.boundingSphere.center)),ft.applyMatrix4(N.matrixWorld).applyMatrix4(it)),Array.isArray(zt)){const Gt=Ut.groups;for(let Jt=0,Vt=Gt.length;Jt<Vt;Jt++){const qt=Gt[Jt],_e=zt[qt.materialIndex];_e&&_e.visible&&v.push(N,Ut,_e,Q,ft.z,qt)}}else zt.visible&&v.push(N,Ut,zt,Q,ft.z,null)}}const Ct=N.children;for(let Ut=0,zt=Ct.length;Ut<zt;Ut++)Sn(Ct[Ut],j,Q,$)}function Cc(N,j,Q,$){const J=N.opaque,Ct=N.transmissive,Ut=N.transparent;g.setupLightsView(Q),et===!0&&Ft.setGlobalState(M.clippingPlanes,Q),Ct.length>0&&Ld(J,Ct,j,Q),$&&tt.viewport(E.copy($)),J.length>0&&eo(J,j,Q),Ct.length>0&&eo(Ct,j,Q),Ut.length>0&&eo(Ut,j,Q),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function Ld(N,j,Q,$){if((Q.isScene===!0?Q.overrideMaterial:null)!==null)return;const Ct=lt.isWebGL2;dt===null&&(dt=new Je(1,1,{generateMipmaps:!0,type:K.has("EXT_color_buffer_half_float")?an:Hn,minFilter:ss,samples:Ct?4:0})),M.getDrawingBufferSize(ht),Ct?dt.setSize(ht.x,ht.y):dt.setSize(Mr(ht.x),Mr(ht.y));const Ut=M.getRenderTarget();M.setRenderTarget(dt),M.getClearColor(U),C=M.getClearAlpha(),C<1&&M.setClearColor(16777215,.5),M.clear();const zt=M.toneMapping;M.toneMapping=ti,eo(N,Q,$),I.updateMultisampleRenderTarget(dt),I.updateRenderTargetMipmap(dt);let Gt=!1;for(let Jt=0,Vt=j.length;Jt<Vt;Jt++){const qt=j[Jt],_e=qt.object,nn=qt.geometry,De=qt.material,Pn=qt.group;if(De.side===be&&_e.layers.test($.layers)){const xe=De.side;De.side=Ke,De.needsUpdate=!0,Pc(_e,Q,$,nn,De,Pn),De.side=xe,De.needsUpdate=!0,Gt=!0}}Gt===!0&&(I.updateMultisampleRenderTarget(dt),I.updateRenderTargetMipmap(dt)),M.setRenderTarget(Ut),M.setClearColor(U,C),M.toneMapping=zt}function eo(N,j,Q){const $=j.isScene===!0?j.overrideMaterial:null;for(let J=0,Ct=N.length;J<Ct;J++){const Ut=N[J],zt=Ut.object,Gt=Ut.geometry,Jt=$===null?Ut.material:$,Vt=Ut.group;zt.layers.test(Q.layers)&&Pc(zt,j,Q,Gt,Jt,Vt)}}function Pc(N,j,Q,$,J,Ct){N.onBeforeRender(M,j,Q,$,J,Ct),N.modelViewMatrix.multiplyMatrices(Q.matrixWorldInverse,N.matrixWorld),N.normalMatrix.getNormalMatrix(N.modelViewMatrix),J.onBeforeRender(M,j,Q,$,N,Ct),J.transparent===!0&&J.side===be&&J.forceSinglePass===!1?(J.side=Ke,J.needsUpdate=!0,M.renderBufferDirect(Q,j,$,J,N,Ct),J.side=ni,J.needsUpdate=!0,M.renderBufferDirect(Q,j,$,J,N,Ct),J.side=be):M.renderBufferDirect(Q,j,$,J,N,Ct),N.onAfterRender(M,j,Q,$,J,Ct)}function no(N,j,Q){j.isScene!==!0&&(j=pt);const $=xt.get(N),J=g.state.lights,Ct=g.state.shadowsArray,Ut=J.state.version,zt=yt.getParameters(N,J.state,Ct,j,Q),Gt=yt.getProgramCacheKey(zt);let Jt=$.programs;$.environment=N.isMeshStandardMaterial?j.environment:null,$.fog=j.fog,$.envMap=(N.isMeshStandardMaterial?Y:R).get(N.envMap||$.environment),Jt===void 0&&(N.addEventListener("dispose",Tt),Jt=new Map,$.programs=Jt);let Vt=Jt.get(Gt);if(Vt!==void 0){if($.currentProgram===Vt&&$.lightsStateVersion===Ut)return Ic(N,zt),Vt}else zt.uniforms=yt.getUniforms(N),N.onBuild(Q,zt,M),N.onBeforeCompile(zt,M),Vt=yt.acquireProgram(zt,Gt),Jt.set(Gt,Vt),$.uniforms=zt.uniforms;const qt=$.uniforms;return(!N.isShaderMaterial&&!N.isRawShaderMaterial||N.clipping===!0)&&(qt.clippingPlanes=Ft.uniform),Ic(N,zt),$.needsLights=Nd(N),$.lightsStateVersion=Ut,$.needsLights&&(qt.ambientLightColor.value=J.state.ambient,qt.lightProbe.value=J.state.probe,qt.directionalLights.value=J.state.directional,qt.directionalLightShadows.value=J.state.directionalShadow,qt.spotLights.value=J.state.spot,qt.spotLightShadows.value=J.state.spotShadow,qt.rectAreaLights.value=J.state.rectArea,qt.ltc_1.value=J.state.rectAreaLTC1,qt.ltc_2.value=J.state.rectAreaLTC2,qt.pointLights.value=J.state.point,qt.pointLightShadows.value=J.state.pointShadow,qt.hemisphereLights.value=J.state.hemi,qt.directionalShadowMap.value=J.state.directionalShadowMap,qt.directionalShadowMatrix.value=J.state.directionalShadowMatrix,qt.spotShadowMap.value=J.state.spotShadowMap,qt.spotLightMatrix.value=J.state.spotLightMatrix,qt.spotLightMap.value=J.state.spotLightMap,qt.pointShadowMap.value=J.state.pointShadowMap,qt.pointShadowMatrix.value=J.state.pointShadowMatrix),$.currentProgram=Vt,$.uniformsList=null,Vt}function Lc(N){if(N.uniformsList===null){const j=N.currentProgram.getUniforms();N.uniformsList=ur.seqWithValue(j.seq,N.uniforms)}return N.uniformsList}function Ic(N,j){const Q=xt.get(N);Q.outputColorSpace=j.outputColorSpace,Q.batching=j.batching,Q.instancing=j.instancing,Q.instancingColor=j.instancingColor,Q.skinning=j.skinning,Q.morphTargets=j.morphTargets,Q.morphNormals=j.morphNormals,Q.morphColors=j.morphColors,Q.morphTargetsCount=j.morphTargetsCount,Q.numClippingPlanes=j.numClippingPlanes,Q.numIntersection=j.numClipIntersection,Q.vertexAlphas=j.vertexAlphas,Q.vertexTangents=j.vertexTangents,Q.toneMapping=j.toneMapping}function Id(N,j,Q,$,J){j.isScene!==!0&&(j=pt),I.resetTextureUnits();const Ct=j.fog,Ut=$.isMeshStandardMaterial?j.environment:null,zt=b===null?M.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Wn,Gt=($.isMeshStandardMaterial?Y:R).get($.envMap||Ut),Jt=$.vertexColors===!0&&!!Q.attributes.color&&Q.attributes.color.itemSize===4,Vt=!!Q.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),qt=!!Q.morphAttributes.position,_e=!!Q.morphAttributes.normal,nn=!!Q.morphAttributes.color;let De=ti;$.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(De=M.toneMapping);const Pn=Q.morphAttributes.position||Q.morphAttributes.normal||Q.morphAttributes.color,xe=Pn!==void 0?Pn.length:0,Qt=xt.get($),Nr=g.state.lights;if(et===!0&&(ut===!0||N!==_)){const ln=N===_&&$.id===T;Ft.setState($,N,ln)}let we=!1;$.version===Qt.__version?(Qt.needsLights&&Qt.lightsStateVersion!==Nr.state.version||Qt.outputColorSpace!==zt||J.isBatchedMesh&&Qt.batching===!1||!J.isBatchedMesh&&Qt.batching===!0||J.isInstancedMesh&&Qt.instancing===!1||!J.isInstancedMesh&&Qt.instancing===!0||J.isSkinnedMesh&&Qt.skinning===!1||!J.isSkinnedMesh&&Qt.skinning===!0||J.isInstancedMesh&&Qt.instancingColor===!0&&J.instanceColor===null||J.isInstancedMesh&&Qt.instancingColor===!1&&J.instanceColor!==null||Qt.envMap!==Gt||$.fog===!0&&Qt.fog!==Ct||Qt.numClippingPlanes!==void 0&&(Qt.numClippingPlanes!==Ft.numPlanes||Qt.numIntersection!==Ft.numIntersection)||Qt.vertexAlphas!==Jt||Qt.vertexTangents!==Vt||Qt.morphTargets!==qt||Qt.morphNormals!==_e||Qt.morphColors!==nn||Qt.toneMapping!==De||lt.isWebGL2===!0&&Qt.morphTargetsCount!==xe)&&(we=!0):(we=!0,Qt.__version=$.version);let oi=Qt.currentProgram;we===!0&&(oi=no($,j,J));let Dc=!1,ps=!1,Ur=!1;const He=oi.getUniforms(),ri=Qt.uniforms;if(tt.useProgram(oi.program)&&(Dc=!0,ps=!0,Ur=!0),$.id!==T&&(T=$.id,ps=!0),Dc||_!==N){He.setValue(z,"projectionMatrix",N.projectionMatrix),He.setValue(z,"viewMatrix",N.matrixWorldInverse);const ln=He.map.cameraPosition;ln!==void 0&&ln.setValue(z,ft.setFromMatrixPosition(N.matrixWorld)),lt.logarithmicDepthBuffer&&He.setValue(z,"logDepthBufFC",2/(Math.log(N.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&He.setValue(z,"isOrthographic",N.isOrthographicCamera===!0),_!==N&&(_=N,ps=!0,Ur=!0)}if(J.isSkinnedMesh){He.setOptional(z,J,"bindMatrix"),He.setOptional(z,J,"bindMatrixInverse");const ln=J.skeleton;ln&&(lt.floatVertexTextures?(ln.boneTexture===null&&ln.computeBoneTexture(),He.setValue(z,"boneTexture",ln.boneTexture,I)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}J.isBatchedMesh&&(He.setOptional(z,J,"batchingTexture"),He.setValue(z,"batchingTexture",J._matricesTexture,I));const Fr=Q.morphAttributes;if((Fr.position!==void 0||Fr.normal!==void 0||Fr.color!==void 0&&lt.isWebGL2===!0)&&Xt.update(J,Q,oi),(ps||Qt.receiveShadow!==J.receiveShadow)&&(Qt.receiveShadow=J.receiveShadow,He.setValue(z,"receiveShadow",J.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(ri.envMap.value=Gt,ri.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),ps&&(He.setValue(z,"toneMappingExposure",M.toneMappingExposure),Qt.needsLights&&Dd(ri,Ur),Ct&&$.fog===!0&&gt.refreshFogUniforms(ri,Ct),gt.refreshMaterialUniforms(ri,$,V,F,dt),ur.upload(z,Lc(Qt),ri,I)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(ur.upload(z,Lc(Qt),ri,I),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&He.setValue(z,"center",J.center),He.setValue(z,"modelViewMatrix",J.modelViewMatrix),He.setValue(z,"normalMatrix",J.normalMatrix),He.setValue(z,"modelMatrix",J.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const ln=$.uniformsGroups;for(let Or=0,Ud=ln.length;Or<Ud;Or++)if(lt.isWebGL2){const Nc=ln[Or];ne.update(Nc,oi),ne.bind(Nc,oi)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return oi}function Dd(N,j){N.ambientLightColor.needsUpdate=j,N.lightProbe.needsUpdate=j,N.directionalLights.needsUpdate=j,N.directionalLightShadows.needsUpdate=j,N.pointLights.needsUpdate=j,N.pointLightShadows.needsUpdate=j,N.spotLights.needsUpdate=j,N.spotLightShadows.needsUpdate=j,N.rectAreaLights.needsUpdate=j,N.hemisphereLights.needsUpdate=j}function Nd(N){return N.isMeshLambertMaterial||N.isMeshToonMaterial||N.isMeshPhongMaterial||N.isMeshStandardMaterial||N.isShadowMaterial||N.isShaderMaterial&&N.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(N,j,Q){xt.get(N.texture).__webglTexture=j,xt.get(N.depthTexture).__webglTexture=Q;const $=xt.get(N);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=Q===void 0,$.__autoAllocateDepthBuffer||K.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(N,j){const Q=xt.get(N);Q.__webglFramebuffer=j,Q.__useDefaultFramebuffer=j===void 0},this.setRenderTarget=function(N,j=0,Q=0){b=N,w=j,S=Q;let $=!0,J=null,Ct=!1,Ut=!1;if(N){const Gt=xt.get(N);Gt.__useDefaultFramebuffer!==void 0?(tt.bindFramebuffer(z.FRAMEBUFFER,null),$=!1):Gt.__webglFramebuffer===void 0?I.setupRenderTarget(N):Gt.__hasExternalTextures&&I.rebindTextures(N,xt.get(N.texture).__webglTexture,xt.get(N.depthTexture).__webglTexture);const Jt=N.texture;(Jt.isData3DTexture||Jt.isDataArrayTexture||Jt.isCompressedArrayTexture)&&(Ut=!0);const Vt=xt.get(N).__webglFramebuffer;N.isWebGLCubeRenderTarget?(Array.isArray(Vt[j])?J=Vt[j][Q]:J=Vt[j],Ct=!0):lt.isWebGL2&&N.samples>0&&I.useMultisampledRTT(N)===!1?J=xt.get(N).__webglMultisampledFramebuffer:Array.isArray(Vt)?J=Vt[Q]:J=Vt,E.copy(N.viewport),L.copy(N.scissor),P=N.scissorTest}else E.copy(q).multiplyScalar(V).floor(),L.copy(H).multiplyScalar(V).floor(),P=X;if(tt.bindFramebuffer(z.FRAMEBUFFER,J)&&lt.drawBuffers&&$&&tt.drawBuffers(N,J),tt.viewport(E),tt.scissor(L),tt.setScissorTest(P),Ct){const Gt=xt.get(N.texture);z.framebufferTexture2D(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,z.TEXTURE_CUBE_MAP_POSITIVE_X+j,Gt.__webglTexture,Q)}else if(Ut){const Gt=xt.get(N.texture),Jt=j||0;z.framebufferTextureLayer(z.FRAMEBUFFER,z.COLOR_ATTACHMENT0,Gt.__webglTexture,Q||0,Jt)}T=-1},this.readRenderTargetPixels=function(N,j,Q,$,J,Ct,Ut){if(!(N&&N.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=xt.get(N).__webglFramebuffer;if(N.isWebGLCubeRenderTarget&&Ut!==void 0&&(zt=zt[Ut]),zt){tt.bindFramebuffer(z.FRAMEBUFFER,zt);try{const Gt=N.texture,Jt=Gt.format,Vt=Gt.type;if(Jt!==un&&At.convert(Jt)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const qt=Vt===an&&(K.has("EXT_color_buffer_half_float")||lt.isWebGL2&&K.has("EXT_color_buffer_float"));if(Vt!==Hn&&At.convert(Vt)!==z.getParameter(z.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Vt===Qn&&(lt.isWebGL2||K.has("OES_texture_float")||K.has("WEBGL_color_buffer_float")))&&!qt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}j>=0&&j<=N.width-$&&Q>=0&&Q<=N.height-J&&z.readPixels(j,Q,$,J,At.convert(Jt),At.convert(Vt),Ct)}finally{const Gt=b!==null?xt.get(b).__webglFramebuffer:null;tt.bindFramebuffer(z.FRAMEBUFFER,Gt)}}},this.copyFramebufferToTexture=function(N,j,Q=0){const $=Math.pow(2,-Q),J=Math.floor(j.image.width*$),Ct=Math.floor(j.image.height*$);I.setTexture2D(j,0),z.copyTexSubImage2D(z.TEXTURE_2D,Q,0,0,N.x,N.y,J,Ct),tt.unbindTexture()},this.copyTextureToTexture=function(N,j,Q,$=0){const J=j.image.width,Ct=j.image.height,Ut=At.convert(Q.format),zt=At.convert(Q.type);I.setTexture2D(Q,0),z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,Q.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Q.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,Q.unpackAlignment),j.isDataTexture?z.texSubImage2D(z.TEXTURE_2D,$,N.x,N.y,J,Ct,Ut,zt,j.image.data):j.isCompressedTexture?z.compressedTexSubImage2D(z.TEXTURE_2D,$,N.x,N.y,j.mipmaps[0].width,j.mipmaps[0].height,Ut,j.mipmaps[0].data):z.texSubImage2D(z.TEXTURE_2D,$,N.x,N.y,Ut,zt,j.image),$===0&&Q.generateMipmaps&&z.generateMipmap(z.TEXTURE_2D),tt.unbindTexture()},this.copyTextureToTexture3D=function(N,j,Q,$,J=0){if(M.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Ct=N.max.x-N.min.x+1,Ut=N.max.y-N.min.y+1,zt=N.max.z-N.min.z+1,Gt=At.convert($.format),Jt=At.convert($.type);let Vt;if($.isData3DTexture)I.setTexture3D($,0),Vt=z.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)I.setTexture2DArray($,0),Vt=z.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}z.pixelStorei(z.UNPACK_FLIP_Y_WEBGL,$.flipY),z.pixelStorei(z.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),z.pixelStorei(z.UNPACK_ALIGNMENT,$.unpackAlignment);const qt=z.getParameter(z.UNPACK_ROW_LENGTH),_e=z.getParameter(z.UNPACK_IMAGE_HEIGHT),nn=z.getParameter(z.UNPACK_SKIP_PIXELS),De=z.getParameter(z.UNPACK_SKIP_ROWS),Pn=z.getParameter(z.UNPACK_SKIP_IMAGES),xe=Q.isCompressedTexture?Q.mipmaps[J]:Q.image;z.pixelStorei(z.UNPACK_ROW_LENGTH,xe.width),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,xe.height),z.pixelStorei(z.UNPACK_SKIP_PIXELS,N.min.x),z.pixelStorei(z.UNPACK_SKIP_ROWS,N.min.y),z.pixelStorei(z.UNPACK_SKIP_IMAGES,N.min.z),Q.isDataTexture||Q.isData3DTexture?z.texSubImage3D(Vt,J,j.x,j.y,j.z,Ct,Ut,zt,Gt,Jt,xe.data):Q.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),z.compressedTexSubImage3D(Vt,J,j.x,j.y,j.z,Ct,Ut,zt,Gt,xe.data)):z.texSubImage3D(Vt,J,j.x,j.y,j.z,Ct,Ut,zt,Gt,Jt,xe),z.pixelStorei(z.UNPACK_ROW_LENGTH,qt),z.pixelStorei(z.UNPACK_IMAGE_HEIGHT,_e),z.pixelStorei(z.UNPACK_SKIP_PIXELS,nn),z.pixelStorei(z.UNPACK_SKIP_ROWS,De),z.pixelStorei(z.UNPACK_SKIP_IMAGES,Pn),J===0&&$.generateMipmaps&&z.generateMipmap(Vt),tt.unbindTexture()},this.initTexture=function(N){N.isCubeTexture?I.setTextureCube(N,0):N.isData3DTexture?I.setTexture3D(N,0):N.isDataArrayTexture||N.isCompressedArrayTexture?I.setTexture2DArray(N,0):I.setTexture2D(N,0),tt.unbindTexture()},this.resetState=function(){w=0,S=0,b=null,tt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Gn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===ac?"display-p3":"srgb",e.unpackColorSpace=oe.workingColorSpace===Tr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Yt?Mi:yu}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===Mi?Yt:Wn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class qv extends Bu{}qv.prototype.isWebGL1Renderer=!0;class Rr{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Dt(t),this.near=e,this.far=n}clone(){return new Rr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Yv extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class ku extends ze{constructor(t=null,e=1,n=1,i,o,r,a,c,l=Se,h=Se,d,u){super(null,r,a,c,l,h,i,o,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Ql extends ie{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Wi=new jt,$l=new jt,To=[],th=new bi,jv=new jt,Ms=new Z,ys=new Zs;class ke extends Z{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Ql(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,jv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new bi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Wi),th.copy(t.boundingBox).applyMatrix4(Wi),this.boundingBox.union(th)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Zs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Wi),ys.copy(t.boundingSphere).applyMatrix4(Wi),this.boundingSphere.union(ys)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(Ms.geometry=this.geometry,Ms.material=this.material,Ms.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ys.copy(this.boundingSphere),ys.applyMatrix4(n),t.ray.intersectsSphere(ys)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,Wi),$l.multiplyMatrices(n,Wi),Ms.matrixWorld=$l,Ms.raycast(t,To);for(let r=0,a=To.length;r<a;r++){const c=To[r];c.instanceId=o,c.object=this,e.push(c)}To.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Ql(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Ee extends ze{constructor(t,e,n,i,o,r,a,c,l){super(t,e,n,i,o,r,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Cn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(i),e.push(o),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,c=o-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-r,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===r)return i/(o-1);const h=n[i],u=n[i+1]-h,f=(r-h)/u;return(i+f)/(o-1)}getTangent(t,e){let i=t-1e-4,o=t+1e-4;i<0&&(i=0),o>1&&(o=1);const r=this.getPoint(i),a=this.getPoint(o),c=e||(r.isVector2?new nt:new O);return c.copy(a).sub(r).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new O,i=[],o=[],r=[],a=new O,c=new jt;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new O)}o[0]=new O,r[0]=new O;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],a),r[0].crossVectors(i[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Ce(i[f-1].dot(i[f]),-1,1));o[f].applyMatrix4(c.makeRotationAxis(a,p))}r[f].crossVectors(i[f],o[f])}if(e===!0){let f=Math.acos(Ce(o[0].dot(o[t]),-1,1));f/=t,i[0].dot(a.crossVectors(o[0],o[t]))>0&&(f=-f);for(let p=1;p<=t;p++)o[p].applyMatrix4(c.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],o[p])}return{tangents:i,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class fc extends Cn{constructor(t=0,e=0,n=1,i=1,o=0,r=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=c}getPoint(t,e){const n=e||new nt,i=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(r?o=0:o=i),this.aClockwise===!0&&!r&&(o===i?o=-i:o=o-i);const a=this.aStartAngle+t*o;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Zv extends fc{constructor(t,e,n,i,o,r){super(t,e,n,n,i,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function pc(){let s=0,t=0,e=0,n=0;function i(o,r,a,c){s=o,t=a,e=-3*o+3*r-2*a-c,n=2*o-2*r+a+c}return{initCatmullRom:function(o,r,a,c,l){i(r,a,l*(a-o),l*(c-r))},initNonuniformCatmullRom:function(o,r,a,c,l,h,d){let u=(r-o)/l-(a-o)/(l+h)+(a-r)/h,f=(a-r)/h-(c-r)/(h+d)+(c-a)/d;u*=h,f*=h,i(r,a,u,f)},calc:function(o){const r=o*o,a=r*o;return s+t*o+e*r+n*a}}}const Ao=new O,fa=new pc,pa=new pc,ma=new pc;class Gu extends Cn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new O){const n=e,i=this.points,o=i.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),c=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:c===0&&a===o-1&&(a=o-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%o]:(Ao.subVectors(i[0],i[1]).add(i[0]),l=Ao);const d=i[a%o],u=i[(a+1)%o];if(this.closed||a+2<o?h=i[(a+2)%o]:(Ao.subVectors(i[o-1],i[o-2]).add(i[o-1]),h=Ao),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(l.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),fa.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,p,v,g),pa.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,p,v,g),ma.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(fa.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),pa.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),ma.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(fa.calc(c),pa.calc(c),ma.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new O().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function eh(s,t,e,n,i){const o=(n-t)*.5,r=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+o+r)*c+(-3*e+3*n-2*o-r)*a+o*s+e}function Kv(s,t){const e=1-s;return e*e*t}function Jv(s,t){return 2*(1-s)*s*t}function Qv(s,t){return s*s*t}function Os(s,t,e,n){return Kv(s,t)+Jv(s,e)+Qv(s,n)}function $v(s,t){const e=1-s;return e*e*e*t}function tx(s,t){const e=1-s;return 3*e*e*s*t}function ex(s,t){return 3*(1-s)*s*s*t}function nx(s,t){return s*s*s*t}function zs(s,t,e,n,i){return $v(s,t)+tx(s,e)+ex(s,n)+nx(s,i)}class Hu extends Cn{constructor(t=new nt,e=new nt,n=new nt,i=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new nt){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(zs(t,i.x,o.x,r.x,a.x),zs(t,i.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class ix extends Cn{constructor(t=new O,e=new O,n=new O,i=new O){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new O){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(zs(t,i.x,o.x,r.x,a.x),zs(t,i.y,o.y,r.y,a.y),zs(t,i.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Wu extends Cn{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class sx extends Cn{constructor(t=new O,e=new O){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new O){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new O){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Vu extends Cn{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(Os(t,i.x,o.x,r.x),Os(t,i.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ox extends Cn{constructor(t=new O,e=new O,n=new O){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new O){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(Os(t,i.x,o.x,r.x),Os(t,i.y,o.y,r.y),Os(t,i.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class wr extends Cn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,i=this.points,o=(i.length-1)*t,r=Math.floor(o),a=o-r,c=i[r===0?r:r-1],l=i[r],h=i[r>i.length-2?i.length-1:r+1],d=i[r>i.length-3?i.length-1:r+2];return n.set(eh(a,c.x,l.x,h.x,d.x),eh(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new nt().fromArray(i))}return this}}var Ja=Object.freeze({__proto__:null,ArcCurve:Zv,CatmullRomCurve3:Gu,CubicBezierCurve:Hu,CubicBezierCurve3:ix,EllipseCurve:fc,LineCurve:Wu,LineCurve3:sx,QuadraticBezierCurve:Vu,QuadraticBezierCurve3:ox,SplineCurve:wr});class rx extends Cn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ja[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let o=0;for(;o<i.length;){if(i[o]>=n){const r=i[o]-n,a=this.curves[o],c=a.getLength(),l=c===0?0:1-r/c;return a.getPointAt(l,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,o=this.curves;i<o.length;i++){const r=o[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,c=r.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Ja[i.type]().fromJSON(i))}return this}}class nh extends rx{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new Wu(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const o=new Vu(this.currentPoint.clone(),new nt(t,e),new nt(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,o,r){const a=new Hu(this.currentPoint.clone(),new nt(t,e),new nt(n,i),new nt(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new wr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,o,r){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,o,r),this}absarc(t,e,n,i,o,r){return this.absellipse(t,e,n,n,i,o,r),this}ellipse(t,e,n,i,o,r,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,o,r,a,c),this}absellipse(t,e,n,i,o,r,a,c){const l=new fc(t,e,n,i,o,r,a,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class mc extends he{constructor(t=[new nt(0,-.5),new nt(.5,0),new nt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Ce(i,0,Math.PI*2);const o=[],r=[],a=[],c=[],l=[],h=1/e,d=new O,u=new nt,f=new O,p=new O,v=new O;let g=0,m=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:g=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),c.push(f.x,f.y,f.z);break;case t.length-1:c.push(v.x,v.y,v.z);break;default:g=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),c.push(f.x,f.y,f.z),v.copy(p)}for(let x=0;x<=e;x++){const M=n+x*h*i,y=Math.sin(M),w=Math.cos(M);for(let S=0;S<=t.length-1;S++){d.x=t[S].x*y,d.y=t[S].y,d.z=t[S].x*w,r.push(d.x,d.y,d.z),u.x=x/e,u.y=S/(t.length-1),a.push(u.x,u.y);const b=c[3*S+0]*y,T=c[3*S+1],_=c[3*S+0]*w;l.push(b,T,_)}}for(let x=0;x<e;x++)for(let M=0;M<t.length-1;M++){const y=M+x*t.length,w=y,S=y+t.length,b=y+t.length+1,T=y+1;o.push(w,S,T),o.push(b,T,S)}this.setIndex(o),this.setAttribute("position",new ee(r,3)),this.setAttribute("uv",new ee(a,2)),this.setAttribute("normal",new ee(l,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new mc(t.points,t.segments,t.phiStart,t.phiLength)}}class te extends he{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),o=Math.floor(o);const h=[],d=[],u=[],f=[];let p=0;const v=[],g=n/2;let m=0;x(),r===!1&&(t>0&&M(!0),e>0&&M(!1)),this.setIndex(h),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function x(){const y=new O,w=new O;let S=0;const b=(e-t)/n;for(let T=0;T<=o;T++){const _=[],E=T/o,L=E*(e-t)+t;for(let P=0;P<=i;P++){const U=P/i,C=U*c+a,D=Math.sin(C),F=Math.cos(C);w.x=L*D,w.y=-E*n+g,w.z=L*F,d.push(w.x,w.y,w.z),y.set(D,b,F).normalize(),u.push(y.x,y.y,y.z),f.push(U,1-E),_.push(p++)}v.push(_)}for(let T=0;T<i;T++)for(let _=0;_<o;_++){const E=v[_][T],L=v[_+1][T],P=v[_+1][T+1],U=v[_][T+1];h.push(E,L,U),h.push(L,P,U),S+=6}l.addGroup(m,S,0),m+=S}function M(y){const w=p,S=new nt,b=new O;let T=0;const _=y===!0?t:e,E=y===!0?1:-1;for(let P=1;P<=i;P++)d.push(0,g*E,0),u.push(0,E,0),f.push(.5,.5),p++;const L=p;for(let P=0;P<=i;P++){const C=P/i*c+a,D=Math.cos(C),F=Math.sin(C);b.x=_*F,b.y=g*E,b.z=_*D,d.push(b.x,b.y,b.z),u.push(0,E,0),S.x=D*.5+.5,S.y=F*.5*E+.5,f.push(S.x,S.y),p++}for(let P=0;P<i;P++){const U=w+P,C=L+P;y===!0?h.push(C,C+1,U):h.push(C+1,C,U),T+=3}l.addGroup(m,T,y===!0?1:2),m+=T}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new te(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class ts extends te{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new ts(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class gc extends he{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const o=[],r=[];a(i),l(n),h(),this.setAttribute("position",new ee(o,3)),this.setAttribute("normal",new ee(o.slice(),3)),this.setAttribute("uv",new ee(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const M=new O,y=new O,w=new O;for(let S=0;S<e.length;S+=3)f(e[S+0],M),f(e[S+1],y),f(e[S+2],w),c(M,y,w,x)}function c(x,M,y,w){const S=w+1,b=[];for(let T=0;T<=S;T++){b[T]=[];const _=x.clone().lerp(y,T/S),E=M.clone().lerp(y,T/S),L=S-T;for(let P=0;P<=L;P++)P===0&&T===S?b[T][P]=_:b[T][P]=_.clone().lerp(E,P/L)}for(let T=0;T<S;T++)for(let _=0;_<2*(S-T)-1;_++){const E=Math.floor(_/2);_%2===0?(u(b[T][E+1]),u(b[T+1][E]),u(b[T][E])):(u(b[T][E+1]),u(b[T+1][E+1]),u(b[T+1][E]))}}function l(x){const M=new O;for(let y=0;y<o.length;y+=3)M.x=o[y+0],M.y=o[y+1],M.z=o[y+2],M.normalize().multiplyScalar(x),o[y+0]=M.x,o[y+1]=M.y,o[y+2]=M.z}function h(){const x=new O;for(let M=0;M<o.length;M+=3){x.x=o[M+0],x.y=o[M+1],x.z=o[M+2];const y=g(x)/2/Math.PI+.5,w=m(x)/Math.PI+.5;r.push(y,1-w)}p(),d()}function d(){for(let x=0;x<r.length;x+=6){const M=r[x+0],y=r[x+2],w=r[x+4],S=Math.max(M,y,w),b=Math.min(M,y,w);S>.9&&b<.1&&(M<.2&&(r[x+0]+=1),y<.2&&(r[x+2]+=1),w<.2&&(r[x+4]+=1))}}function u(x){o.push(x.x,x.y,x.z)}function f(x,M){const y=x*3;M.x=t[y+0],M.y=t[y+1],M.z=t[y+2]}function p(){const x=new O,M=new O,y=new O,w=new O,S=new nt,b=new nt,T=new nt;for(let _=0,E=0;_<o.length;_+=9,E+=6){x.set(o[_+0],o[_+1],o[_+2]),M.set(o[_+3],o[_+4],o[_+5]),y.set(o[_+6],o[_+7],o[_+8]),S.set(r[E+0],r[E+1]),b.set(r[E+2],r[E+3]),T.set(r[E+4],r[E+5]),w.copy(x).add(M).add(y).divideScalar(3);const L=g(w);v(S,E+0,x,L),v(b,E+2,M,L),v(T,E+4,y,L)}}function v(x,M,y,w){w<0&&x.x===1&&(r[M]=x.x-1),y.x===0&&y.z===0&&(r[M]=w/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new gc(t.vertices,t.indices,t.radius,t.details)}}let Cr=class extends nh{constructor(t){super(t),this.uuid=Si(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new nh().fromJSON(i))}return this}};const ax={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let o=Xu(s,0,i,e,!0);const r=[];if(!o||o.next===o.prev)return r;let a,c,l,h,d,u,f;if(n&&(o=dx(s,t,o,e)),s.length>80*e){a=l=s[0],c=h=s[1];for(let p=e;p<i;p+=e)d=s[p],u=s[p+1],d<a&&(a=d),u<c&&(c=u),d>l&&(l=d),u>h&&(h=u);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Vs(o,r,e,a,c,f,0),r}};function Xu(s,t,e,n,i){let o,r;if(i===Sx(s,t,e,n)>0)for(o=t;o<e;o+=n)r=ih(o,s[o],s[o+1],r);else for(o=e-n;o>=t;o-=n)r=ih(o,s[o],s[o+1],r);return r&&Pr(r,r.next)&&(qs(r),r=r.next),r}function _i(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(Pr(e,e.next)||ye(e.prev,e,e.next)===0)){if(qs(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Vs(s,t,e,n,i,o,r){if(!s)return;!r&&o&&vx(s,n,i,o);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,o?lx(s,n,i,o):cx(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),qs(s),s=l.next,a=l.next;continue}if(s=l,s===a){r?r===1?(s=hx(_i(s),t,e),Vs(s,t,e,n,i,o,2)):r===2&&ux(s,t,e,n,i,o):Vs(_i(s),t,e,n,i,o,1);break}}}function cx(s){const t=s.prev,e=s,n=s.next;if(ye(t,e,n)>=0)return!1;const i=t.x,o=e.x,r=n.x,a=t.y,c=e.y,l=n.y,h=i<o?i<r?i:r:o<r?o:r,d=a<c?a<l?a:l:c<l?c:l,u=i>o?i>r?i:r:o>r?o:r,f=a>c?a>l?a:l:c>l?c:l;let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&Ki(i,a,o,c,r,l,p.x,p.y)&&ye(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function lx(s,t,e,n){const i=s.prev,o=s,r=s.next;if(ye(i,o,r)>=0)return!1;const a=i.x,c=o.x,l=r.x,h=i.y,d=o.y,u=r.y,f=a<c?a<l?a:l:c<l?c:l,p=h<d?h<u?h:u:d<u?d:u,v=a>c?a>l?a:l:c>l?c:l,g=h>d?h>u?h:u:d>u?d:u,m=Qa(f,p,t,e,n),x=Qa(v,g,t,e,n);let M=s.prevZ,y=s.nextZ;for(;M&&M.z>=m&&y&&y.z<=x;){if(M.x>=f&&M.x<=v&&M.y>=p&&M.y<=g&&M!==i&&M!==r&&Ki(a,h,c,d,l,u,M.x,M.y)&&ye(M.prev,M,M.next)>=0||(M=M.prevZ,y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&Ki(a,h,c,d,l,u,y.x,y.y)&&ye(y.prev,y,y.next)>=0))return!1;y=y.nextZ}for(;M&&M.z>=m;){if(M.x>=f&&M.x<=v&&M.y>=p&&M.y<=g&&M!==i&&M!==r&&Ki(a,h,c,d,l,u,M.x,M.y)&&ye(M.prev,M,M.next)>=0)return!1;M=M.prevZ}for(;y&&y.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&Ki(a,h,c,d,l,u,y.x,y.y)&&ye(y.prev,y,y.next)>=0)return!1;y=y.nextZ}return!0}function hx(s,t,e){let n=s;do{const i=n.prev,o=n.next.next;!Pr(i,o)&&qu(i,n,n.next,o)&&Xs(i,o)&&Xs(o,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),qs(n),qs(n.next),n=s=o),n=n.next}while(n!==s);return _i(n)}function ux(s,t,e,n,i,o){let r=s;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&yx(r,a)){let c=Yu(r,a);r=_i(r,r.next),c=_i(c,c.next),Vs(r,t,e,n,i,o,0),Vs(c,t,e,n,i,o,0);return}a=a.next}r=r.next}while(r!==s)}function dx(s,t,e,n){const i=[];let o,r,a,c,l;for(o=0,r=t.length;o<r;o++)a=t[o]*n,c=o<r-1?t[o+1]*n:s.length,l=Xu(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(Mx(l));for(i.sort(fx),o=0;o<i.length;o++)e=px(i[o],e);return e}function fx(s,t){return s.x-t.x}function px(s,t){const e=mx(s,t);if(!e)return t;const n=Yu(e,s);return _i(n,n.next),_i(e,e.next)}function mx(s,t){let e=t,n=-1/0,i;const o=s.x,r=s.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const u=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=o&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===o))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,d;e=i;do o>=e.x&&e.x>=c&&o!==e.x&&Ki(r<l?o:n,r,c,l,r<l?n:o,r,e.x,e.y)&&(d=Math.abs(r-e.y)/(o-e.x),Xs(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&gx(i,e)))&&(i=e,h=d)),e=e.next;while(e!==a);return i}function gx(s,t){return ye(s.prev,s,t.prev)<0&&ye(t.next,s,s.next)<0}function vx(s,t,e,n){let i=s;do i.z===0&&(i.z=Qa(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,xx(i)}function xx(s){let t,e,n,i,o,r,a,c,l=1;do{for(e=s,s=null,o=null,r=0;e;){for(r++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),o?o.nextZ=i:s=i,i.prevZ=o,o=i;e=n}o.nextZ=null,l*=2}while(r>1);return s}function Qa(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function Mx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ki(s,t,e,n,i,o,r,a){return(i-r)*(t-a)>=(s-r)*(o-a)&&(s-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(o-a)>=(i-r)*(n-a)}function yx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!wx(s,t)&&(Xs(s,t)&&Xs(t,s)&&_x(s,t)&&(ye(s.prev,s,t.prev)||ye(s,t.prev,t))||Pr(s,t)&&ye(s.prev,s,s.next)>0&&ye(t.prev,t,t.next)>0)}function ye(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function Pr(s,t){return s.x===t.x&&s.y===t.y}function qu(s,t,e,n){const i=Co(ye(s,t,e)),o=Co(ye(s,t,n)),r=Co(ye(e,n,s)),a=Co(ye(e,n,t));return!!(i!==o&&r!==a||i===0&&Ro(s,e,t)||o===0&&Ro(s,n,t)||r===0&&Ro(e,s,n)||a===0&&Ro(e,t,n))}function Ro(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Co(s){return s>0?1:s<0?-1:0}function wx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&qu(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Xs(s,t){return ye(s.prev,s,s.next)<0?ye(s,t,s.next)>=0&&ye(s,s.prev,t)>=0:ye(s,t,s.prev)<0||ye(s,s.next,t)<0}function _x(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,o=(s.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&i<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Yu(s,t){const e=new $a(s.i,s.x,s.y),n=new $a(t.i,t.x,t.y),i=s.next,o=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function ih(s,t,e,n){const i=new $a(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function qs(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function $a(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function Sx(s,t,e,n){let i=0;for(let o=t,r=e-n;o<e;o+=n)i+=(s[r]-s[o])*(s[o+1]+s[r+1]),r=o;return i}class Bs{static area(t){const e=t.length;let n=0;for(let i=e-1,o=0;o<e;i=o++)n+=t[i].x*t[o].y-t[o].x*t[i].y;return n*.5}static isClockWise(t){return Bs.area(t)<0}static triangulateShape(t,e){const n=[],i=[],o=[];sh(t),oh(n,t);let r=t.length;e.forEach(sh);for(let c=0;c<e.length;c++)i.push(r),r+=e[c].length,oh(n,e[c]);const a=ax.triangulate(n,i);for(let c=0;c<a.length;c+=3)o.push(a.slice(c,c+3));return o}}function sh(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function oh(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Ks extends he{constructor(t=new Cr([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],o=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];r(l)}this.setAttribute("position",new ee(i,3)),this.setAttribute("uv",new ee(o,2)),this.computeVertexNormals();function r(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:bx;let M,y=!1,w,S,b,T;m&&(M=m.getSpacedPoints(h),y=!0,u=!1,w=m.computeFrenetFrames(h,!1),S=new O,b=new O,T=new O),u||(g=0,f=0,p=0,v=0);const _=a.extractPoints(l);let E=_.shape;const L=_.holes;if(!Bs.isClockWise(E)){E=E.reverse();for(let z=0,ct=L.length;z<ct;z++){const K=L[z];Bs.isClockWise(K)&&(L[z]=K.reverse())}}const U=Bs.triangulateShape(E,L),C=E;for(let z=0,ct=L.length;z<ct;z++){const K=L[z];E=E.concat(K)}function D(z,ct,K){return ct||console.error("THREE.ExtrudeGeometry: vec does not exist"),z.clone().addScaledVector(ct,K)}const F=E.length,V=U.length;function G(z,ct,K){let lt,tt,Rt;const xt=z.x-ct.x,I=z.y-ct.y,R=K.x-z.x,Y=K.y-z.y,rt=xt*xt+I*I,ot=xt*Y-I*R;if(Math.abs(ot)>Number.EPSILON){const st=Math.sqrt(rt),yt=Math.sqrt(R*R+Y*Y),gt=ct.x-I/st,bt=ct.y+xt/st,Nt=K.x-Y/yt,Ft=K.y+R/yt,at=((Nt-gt)*Y-(Ft-bt)*R)/(xt*Y-I*R);lt=gt+xt*at-z.x,tt=bt+I*at-z.y;const Zt=lt*lt+tt*tt;if(Zt<=2)return new nt(lt,tt);Rt=Math.sqrt(Zt/2)}else{let st=!1;xt>Number.EPSILON?R>Number.EPSILON&&(st=!0):xt<-Number.EPSILON?R<-Number.EPSILON&&(st=!0):Math.sign(I)===Math.sign(Y)&&(st=!0),st?(lt=-I,tt=xt,Rt=Math.sqrt(rt)):(lt=xt,tt=I,Rt=Math.sqrt(rt/2))}return new nt(lt/Rt,tt/Rt)}const B=[];for(let z=0,ct=C.length,K=ct-1,lt=z+1;z<ct;z++,K++,lt++)K===ct&&(K=0),lt===ct&&(lt=0),B[z]=G(C[z],C[K],C[lt]);const q=[];let H,X=B.concat();for(let z=0,ct=L.length;z<ct;z++){const K=L[z];H=[];for(let lt=0,tt=K.length,Rt=tt-1,xt=lt+1;lt<tt;lt++,Rt++,xt++)Rt===tt&&(Rt=0),xt===tt&&(xt=0),H[lt]=G(K[lt],K[Rt],K[xt]);q.push(H),X=X.concat(H)}for(let z=0;z<g;z++){const ct=z/g,K=f*Math.cos(ct*Math.PI/2),lt=p*Math.sin(ct*Math.PI/2)+v;for(let tt=0,Rt=C.length;tt<Rt;tt++){const xt=D(C[tt],B[tt],lt);it(xt.x,xt.y,-K)}for(let tt=0,Rt=L.length;tt<Rt;tt++){const xt=L[tt];H=q[tt];for(let I=0,R=xt.length;I<R;I++){const Y=D(xt[I],H[I],lt);it(Y.x,Y.y,-K)}}}const W=p+v;for(let z=0;z<F;z++){const ct=u?D(E[z],X[z],W):E[z];y?(b.copy(w.normals[0]).multiplyScalar(ct.x),S.copy(w.binormals[0]).multiplyScalar(ct.y),T.copy(M[0]).add(b).add(S),it(T.x,T.y,T.z)):it(ct.x,ct.y,0)}for(let z=1;z<=h;z++)for(let ct=0;ct<F;ct++){const K=u?D(E[ct],X[ct],W):E[ct];y?(b.copy(w.normals[z]).multiplyScalar(K.x),S.copy(w.binormals[z]).multiplyScalar(K.y),T.copy(M[z]).add(b).add(S),it(T.x,T.y,T.z)):it(K.x,K.y,d/h*z)}for(let z=g-1;z>=0;z--){const ct=z/g,K=f*Math.cos(ct*Math.PI/2),lt=p*Math.sin(ct*Math.PI/2)+v;for(let tt=0,Rt=C.length;tt<Rt;tt++){const xt=D(C[tt],B[tt],lt);it(xt.x,xt.y,d+K)}for(let tt=0,Rt=L.length;tt<Rt;tt++){const xt=L[tt];H=q[tt];for(let I=0,R=xt.length;I<R;I++){const Y=D(xt[I],H[I],lt);y?it(Y.x,Y.y+M[h-1].y,M[h-1].x+K):it(Y.x,Y.y,d+K)}}}et(),ut();function et(){const z=i.length/3;if(u){let ct=0,K=F*ct;for(let lt=0;lt<V;lt++){const tt=U[lt];ht(tt[2]+K,tt[1]+K,tt[0]+K)}ct=h+g*2,K=F*ct;for(let lt=0;lt<V;lt++){const tt=U[lt];ht(tt[0]+K,tt[1]+K,tt[2]+K)}}else{for(let ct=0;ct<V;ct++){const K=U[ct];ht(K[2],K[1],K[0])}for(let ct=0;ct<V;ct++){const K=U[ct];ht(K[0]+F*h,K[1]+F*h,K[2]+F*h)}}n.addGroup(z,i.length/3-z,0)}function ut(){const z=i.length/3;let ct=0;dt(C,ct),ct+=C.length;for(let K=0,lt=L.length;K<lt;K++){const tt=L[K];dt(tt,ct),ct+=tt.length}n.addGroup(z,i.length/3-z,1)}function dt(z,ct){let K=z.length;for(;--K>=0;){const lt=K;let tt=K-1;tt<0&&(tt=z.length-1);for(let Rt=0,xt=h+g*2;Rt<xt;Rt++){const I=F*Rt,R=F*(Rt+1),Y=ct+lt+I,rt=ct+tt+I,ot=ct+tt+R,st=ct+lt+R;ft(Y,rt,ot,st)}}}function it(z,ct,K){c.push(z),c.push(ct),c.push(K)}function ht(z,ct,K){pt(z),pt(ct),pt(K);const lt=i.length/3,tt=x.generateTopUV(n,i,lt-3,lt-2,lt-1);_t(tt[0]),_t(tt[1]),_t(tt[2])}function ft(z,ct,K,lt){pt(z),pt(ct),pt(lt),pt(ct),pt(K),pt(lt);const tt=i.length/3,Rt=x.generateSideWallUV(n,i,tt-6,tt-3,tt-2,tt-1);_t(Rt[0]),_t(Rt[1]),_t(Rt[3]),_t(Rt[1]),_t(Rt[2]),_t(Rt[3])}function pt(z){i.push(c[z*3+0]),i.push(c[z*3+1]),i.push(c[z*3+2])}function _t(z){o.push(z.x),o.push(z.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return Ex(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,r=t.shapes.length;o<r;o++){const a=e[t.shapes[o]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Ja[i.type]().fromJSON(i)),new Ks(n,t.options)}}const bx={generateTopUV:function(s,t,e,n,i){const o=t[e*3],r=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new nt(o,r),new nt(a,c),new nt(l,h)]},generateSideWallUV:function(s,t,e,n,i,o){const r=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],p=t[i*3+2],v=t[o*3],g=t[o*3+1],m=t[o*3+2];return Math.abs(a-h)<Math.abs(r-l)?[new nt(r,1-c),new nt(l,1-d),new nt(u,1-p),new nt(v,1-m)]:[new nt(a,1-c),new nt(h,1-d),new nt(f,1-p),new nt(g,1-m)]}};function Ex(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const o=s[n];e.shapes.push(o.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class Lr extends gc{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new Lr(t.radius,t.detail)}}class Ys extends he{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(r+a,Math.PI);let l=0;const h=[],d=new O,u=new O,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const x=[],M=m/n;let y=0;m===0&&r===0?y=.5/e:m===n&&c===Math.PI&&(y=-.5/e);for(let w=0;w<=e;w++){const S=w/e;d.x=-t*Math.cos(i+S*o)*Math.sin(r+M*a),d.y=t*Math.cos(r+M*a),d.z=t*Math.sin(i+S*o)*Math.sin(r+M*a),p.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(S+y,1-M),x.push(l++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const M=h[m][x+1],y=h[m][x],w=h[m+1][x],S=h[m+1][x+1];(m!==0||r>0)&&f.push(M,y,S),(m!==n-1||c<Math.PI)&&f.push(y,w,S)}this.setIndex(f),this.setAttribute("position",new ee(p,3)),this.setAttribute("normal",new ee(v,3)),this.setAttribute("uv",new ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ys(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class us extends he{constructor(t=1,e=.4,n=12,i=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:o},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],c=[],l=[],h=new O,d=new O,u=new O;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*o,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(v),d.y=(t+e*Math.cos(g))*Math.sin(v),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(p/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,x=(i+1)*f+p;r.push(v,g,x),r.push(g,m,x)}this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(c,3)),this.setAttribute("uv",new ee(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new us(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class Tx extends Me{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class mt extends ls{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Dt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Dt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class fn extends mt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ce(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Dt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Dt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Dt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Ax extends ls{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=rc,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class ju extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Dt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class Rx extends ju{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Dt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ga=new jt,rh=new O,ah=new O;class Cx{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new jt,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new lc,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new Fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;rh.setFromMatrixPosition(t.matrixWorld),e.position.copy(rh),ah.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(ah),e.updateMatrixWorld(),ga.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ga),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ga)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class Px extends Cx{constructor(){super(new hc(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ch extends ju{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new Px}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class Lx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=lh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=lh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function lh(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:ic}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=ic);class Ir extends Z{constructor(){const t=Ir.SkyShader,e=new Me({name:t.name,uniforms:tn.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Ke,depthWrite:!1});super(new Mt(1,1,1),e),this.isSky=!0}}Ir.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new O},up:{value:new O(0,1,0)}},vertexShader:`
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

		}`};const ks={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class si{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ix=new hc(-1,1,1,-1,0,1);class Dx extends he{constructor(){super(),this.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ee([0,2,0,0,2,0],2))}}const Nx=new Dx;class Js{constructor(t){this._mesh=new Z(Nx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ix)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Zu extends si{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Me?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=tn.clone(t.uniforms),this.material=new Me({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Js(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class hh extends si{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,a;this.inverse?(r=0,a=1):(r=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),o.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(i.EQUAL,1,4294967295),o.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),o.buffers.stencil.setLocked(!0)}}class Ux extends si{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Fx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new nt);this._width=n.width,this._height=n.height,e=new Je(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:an}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Zu(ks),this.copyPass.material.blending=Oe,this.clock=new Lx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,o=this.passes.length;i<o;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),r.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}hh!==void 0&&(r instanceof hh?n=!0:r instanceof Ux&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new nt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Ox extends si{constructor(t,e,n=null,i=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Dt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=i}}const Po={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new nt},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new jt},cameraProjectionMatrixInverse:{value:new jt},cameraWorldMatrix:{value:new jt},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new O(-1,-1,-1)},sceneBoxMax:{value:new O(1,1,1)}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		varying vec2 vUv;
		uniform highp sampler2D tNormal;
		uniform highp sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform float cameraNear;
		uniform float cameraFar;
		uniform mat4 cameraProjectionMatrix;
		uniform mat4 cameraProjectionMatrixInverse;		
		uniform mat4 cameraWorldMatrix;
		uniform float radius;
		uniform float distanceExponent;
		uniform float thickness;
		uniform float distanceFallOff;
		uniform float scale;
		#if SCENE_CLIP_BOX == 1
			uniform vec3 sceneBoxMin;
			uniform vec3 sceneBoxMax;
		#endif
		
		#include <common>
		#include <packing>

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(vec3(ao), 1.)
		#endif

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}

		float getDepth(const vec2 uv) {  
			return textureLod(tDepth, uv.xy, 0.0).DEPTH_SWIZZLING;
		}

		float fetchDepth(const ivec2 uv) {   
			return texelFetch(tDepth, uv.xy, 0).DEPTH_SWIZZLING;
		}

		float getViewZ(const in float depth) {
			#if PERSPECTIVE_CAMERA == 1
				return perspectiveDepthToViewZ(depth, cameraNear, cameraFar);
			#else
				return orthographicDepthToViewZ(depth, cameraNear, cameraFar);
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ? ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz : -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ? ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz : -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
			#if NORMAL_VECTOR_TYPE == 2
				return normalize(textureLod(tNormal, uv, 0.).rgb);
			#elif NORMAL_VECTOR_TYPE == 1
				return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
			#else
				return computeNormalFromDepth(uv);
			#endif
		}

		vec3 getSceneUvAndDepth(vec3 sampleViewPos) {
			vec4 sampleClipPos = cameraProjectionMatrix * vec4(sampleViewPos, 1.);
			vec2 sampleUv = sampleClipPos.xy / sampleClipPos.w * 0.5 + 0.5;
			float sampleSceneDepth = getDepth(sampleUv);
			return vec3(sampleUv, sampleSceneDepth);
		}
		
		void main() {
			float depth = getDepth(vUv.xy);
			if (depth >= 1.0) {
				discard;
				return;
			}
			vec3 viewPos = getViewPosition(vUv, depth);
			vec3 viewNormal = getViewNormal(vUv);

			float radiusToUse = radius;
			float distanceFalloffToUse = thickness;
			#if SCREEN_SPACE_RADIUS == 1
				float radiusScale = getViewPosition(vec2(0.5 + float(SCREEN_SPACE_RADIUS_SCALE) / resolution.x, 0.0), depth).x;
				radiusToUse *= radiusScale;
				distanceFalloffToUse *= radiusScale;
			#endif

			#if SCENE_CLIP_BOX == 1
				vec3 worldPos = (cameraWorldMatrix * vec4(viewPos, 1.0)).xyz;
				float boxDistance = length(max(vec3(0.0), max(sceneBoxMin - worldPos, worldPos - sceneBoxMax)));
				if (boxDistance > radiusToUse) {
					discard;
					return;
				}
			#endif
			
			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
			vec3 randomVec = noiseTexel.xyz * 2.0 - 1.0;
			vec3 tangent = normalize(vec3(randomVec.xy, 0.));
			vec3 bitangent = vec3(-tangent.y, tangent.x, 0.);
			mat3 kernelMatrix = mat3(tangent, bitangent, vec3(0., 0., 1.));

			const int DIRECTIONS = SAMPLES < 30 ? 3 : 5;
			const int STEPS = (SAMPLES + DIRECTIONS - 1) / DIRECTIONS;
			float ao = 0.0, totalWeight = 0.0;
			for (int i = 0; i < DIRECTIONS; ++i) {
				
				float angle = float(i) / float(DIRECTIONS) * PI;
				vec4 sampleDir = vec4(cos(angle), sin(angle), 0., 0.5 + 0.5 * noiseTexel.w); 
				sampleDir.xyz = normalize(kernelMatrix * sampleDir.xyz);

				vec3 viewDir = normalize(-viewPos.xyz);
				vec3 sliceBitangent = normalize(cross(sampleDir.xyz, viewDir));
				vec3 sliceTangent = cross(sliceBitangent, viewDir);
				vec3 normalInSlice = normalize(viewNormal - sliceBitangent * dot(viewNormal, sliceBitangent));
				
				vec3 tangentToNormalInSlice = cross(normalInSlice, sliceBitangent);
				vec2 cosHorizons = vec2(dot(viewDir, tangentToNormalInSlice), dot(viewDir, -tangentToNormalInSlice));
				
				for (int j = 0; j < STEPS; ++j) {
					vec3 sampleViewOffset = sampleDir.xyz * radiusToUse * sampleDir.w * pow(float(j + 1) / float(STEPS), distanceExponent);	

					vec3 sampleSceneUvDepth = getSceneUvAndDepth(viewPos + sampleViewOffset);
					vec3 sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					vec3 viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.x += max(0., (sampleCosHorizon - cosHorizons.x) * mix(1., 2. / float(j + 2), distanceFallOff));
					}		

					sampleSceneUvDepth = getSceneUvAndDepth(viewPos - sampleViewOffset);
					sampleSceneViewPos = getViewPosition(sampleSceneUvDepth.xy, sampleSceneUvDepth.z);
					viewDelta = sampleSceneViewPos - viewPos;
					if (abs(viewDelta.z) < thickness) {
						float sampleCosHorizon = dot(viewDir, normalize(viewDelta));
						cosHorizons.y += max(0., (sampleCosHorizon - cosHorizons.y) * mix(1., 2. / float(j + 2), distanceFallOff));
					}
				}

				vec2 sinHorizons = sqrt(1. - cosHorizons * cosHorizons);
				float nx = dot(normalInSlice, sliceTangent);
				float ny = dot(normalInSlice, viewDir);
				float nxb = 1. / 2. * (acos(cosHorizons.y) - acos(cosHorizons.x) + sinHorizons.x * cosHorizons.x - sinHorizons.y * cosHorizons.y);
				float nyb = 1. / 2. * (2. - cosHorizons.x * cosHorizons.x - cosHorizons.y * cosHorizons.y);
				float occlusion = nx * nxb + ny * nyb;
				ao += occlusion;
			}

			ao = clamp(ao / float(DIRECTIONS), 0., 1.);		
		#if SCENE_CLIP_BOX == 1
			ao = mix(ao, 1., smoothstep(0., radiusToUse, boxDistance));
		#endif
			ao = pow(ao, scale);

			gl_FragColor = FRAGMENT_OUTPUT;
		}`},Lo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform sampler2D tDepth;
		uniform float cameraNear;
		uniform float cameraFar;
		varying vec2 vUv;

		#include <packing>

		float getLinearDepth( const in vec2 screenPosition ) {
			#if PERSPECTIVE_CAMERA == 1
				float fragCoordZ = texture2D( tDepth, screenPosition ).x;
				float viewZ = perspectiveDepthToViewZ( fragCoordZ, cameraNear, cameraFar );
				return viewZToOrthographicDepth( viewZ, cameraNear, cameraFar );
			#else
				return texture2D( tDepth, screenPosition ).x;
			#endif
		}

		void main() {
			float depth = getLinearDepth( vUv );
			gl_FragColor = vec4( vec3( 1.0 - depth ), 1.0 );

		}`},va={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`
		uniform float intensity;
		uniform sampler2D tDiffuse;
		varying vec2 vUv;

		void main() {
			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = vec4(mix(vec3(1.), texel.rgb, intensity), texel.a);
		}`};function zx(s=5){const t=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),e=Bx(t),n=e.length,i=new Uint8Array(n*4);for(let r=0;r<n;++r){const a=e[r],c=2*Math.PI*a/n,l=new O(Math.cos(c),Math.sin(c),0).normalize();i[r*4]=(l.x*.5+.5)*255,i[r*4+1]=(l.y*.5+.5)*255,i[r*4+2]=127,i[r*4+3]=255}const o=new ku(i,t,t);return o.wrapS=le,o.wrapT=le,o.needsUpdate=!0,o}function Bx(s){const t=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),e=t*t,n=Array(e).fill(0);let i=Math.floor(t/2),o=t-1;for(let r=1;r<=e;){if(i===-1&&o===t?(o=t-2,i=0):(o===t&&(o=0),i<0&&(i=t-1)),n[i*t+o]!==0){o-=2,i++;continue}else n[i*t+o]=r++;o++,i--}return n}const Io={defines:{SAMPLES:16,SAMPLE_VECTORS:Ku(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new nt},cameraProjectionMatrixInverse:{value:new jt},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
		}`,fragmentShader:`

		varying vec2 vUv;

		uniform sampler2D tDiffuse;
		uniform sampler2D tNormal;
		uniform sampler2D tDepth;
		uniform sampler2D tNoise;
		uniform vec2 resolution;
		uniform mat4 cameraProjectionMatrixInverse;
		uniform float lumaPhi;
		uniform float depthPhi;
		uniform float normalPhi;
		uniform float radius;
		uniform int index;
		
		#include <common>
		#include <packing>

		#ifndef SAMPLE_LUMINANCE
		#define SAMPLE_LUMINANCE dot(vec3(0.2125, 0.7154, 0.0721), a)
		#endif

		#ifndef FRAGMENT_OUTPUT
		#define FRAGMENT_OUTPUT vec4(denoised, 1.)
		#endif

		float getLuminance(const in vec3 a) {
			return SAMPLE_LUMINANCE;
		}

		const vec3 poissonDisk[SAMPLES] = SAMPLE_VECTORS;

		vec3 getViewPosition(const in vec2 screenPosition, const in float depth) {
			vec4 clipSpacePosition = vec4(vec3(screenPosition, depth) * 2.0 - 1.0, 1.0);
			vec4 viewSpacePosition = cameraProjectionMatrixInverse * clipSpacePosition;
			return viewSpacePosition.xyz / viewSpacePosition.w;
		}
		
		float getDepth(const vec2 uv) {
		#if DEPTH_VALUE_SOURCE == 1    
			return textureLod(tDepth, uv.xy, 0.0).a;
		#else
			return textureLod(tDepth, uv.xy, 0.0).r;
		#endif
		}

		float fetchDepth(const ivec2 uv) {
			#if DEPTH_VALUE_SOURCE == 1    
				return texelFetch(tDepth, uv.xy, 0).a;
			#else
				return texelFetch(tDepth, uv.xy, 0).r;
			#endif
		}

		vec3 computeNormalFromDepth(const vec2 uv) {
			vec2 size = vec2(textureSize(tDepth, 0));
			ivec2 p = ivec2(uv * size);
			float c0 = fetchDepth(p);
			float l2 = fetchDepth(p - ivec2(2, 0));
			float l1 = fetchDepth(p - ivec2(1, 0));
			float r1 = fetchDepth(p + ivec2(1, 0));
			float r2 = fetchDepth(p + ivec2(2, 0));
			float b2 = fetchDepth(p - ivec2(0, 2));
			float b1 = fetchDepth(p - ivec2(0, 1));
			float t1 = fetchDepth(p + ivec2(0, 1));
			float t2 = fetchDepth(p + ivec2(0, 2));
			float dl = abs((2.0 * l1 - l2) - c0);
			float dr = abs((2.0 * r1 - r2) - c0);
			float db = abs((2.0 * b1 - b2) - c0);
			float dt = abs((2.0 * t1 - t2) - c0);
			vec3 ce = getViewPosition(uv, c0).xyz;
			vec3 dpdx = (dl < dr) ?  ce - getViewPosition((uv - vec2(1.0 / size.x, 0.0)), l1).xyz
									: -ce + getViewPosition((uv + vec2(1.0 / size.x, 0.0)), r1).xyz;
			vec3 dpdy = (db < dt) ?  ce - getViewPosition((uv - vec2(0.0, 1.0 / size.y)), b1).xyz
									: -ce + getViewPosition((uv + vec2(0.0, 1.0 / size.y)), t1).xyz;
			return normalize(cross(dpdx, dpdy));
		}

		vec3 getViewNormal(const vec2 uv) {
		#if NORMAL_VECTOR_TYPE == 2
			return normalize(textureLod(tNormal, uv, 0.).rgb);
		#elif NORMAL_VECTOR_TYPE == 1
			return unpackRGBToNormal(textureLod(tNormal, uv, 0.).rgb);
		#else
			return computeNormalFromDepth(uv);
		#endif
		}

		void denoiseSample(in vec3 center, in vec3 viewNormal, in vec3 viewPos, in vec2 sampleUv, inout vec3 denoised, inout float totalWeight) {
			vec4 sampleTexel = textureLod(tDiffuse, sampleUv, 0.0);
			float sampleDepth = getDepth(sampleUv);
			vec3 sampleNormal = getViewNormal(sampleUv);
			vec3 neighborColor = sampleTexel.rgb;
			vec3 viewPosSample = getViewPosition(sampleUv, sampleDepth);
			
			float normalDiff = dot(viewNormal, sampleNormal);
			float normalSimilarity = pow(max(normalDiff, 0.), normalPhi);
			float lumaDiff = abs(getLuminance(neighborColor) - getLuminance(center));
			float lumaSimilarity = max(1.0 - lumaDiff / lumaPhi, 0.0);
			float depthDiff = abs(dot(viewPos - viewPosSample, viewNormal));
			float depthSimilarity = max(1. - depthDiff / depthPhi, 0.);
			float w = lumaSimilarity * depthSimilarity * normalSimilarity;
		
			denoised += w * neighborColor;
			totalWeight += w;
		}
		
		void main() {
			float depth = getDepth(vUv.xy);	
			vec3 viewNormal = getViewNormal(vUv);	
			if (depth == 1. || dot(viewNormal, viewNormal) == 0.) {
				discard;
				return;
			}
			vec4 texel = textureLod(tDiffuse, vUv, 0.0);
			vec3 center = texel.rgb;
			vec3 viewPos = getViewPosition(vUv, depth);

			vec2 noiseResolution = vec2(textureSize(tNoise, 0));
			vec2 noiseUv = vUv * resolution / noiseResolution;
			vec4 noiseTexel = textureLod(tNoise, noiseUv, 0.0);
      		vec2 noiseVec = vec2(sin(noiseTexel[index % 4] * 2. * PI), cos(noiseTexel[index % 4] * 2. * PI));
    		mat2 rotationMatrix = mat2(noiseVec.x, -noiseVec.y, noiseVec.x, noiseVec.y);
		
			float totalWeight = 1.0;
			vec3 denoised = texel.rgb;
			for (int i = 0; i < SAMPLES; i++) {
				vec3 sampleDir = poissonDisk[i];
				vec2 offset = rotationMatrix * (sampleDir.xy * (1. + sampleDir.z * (radius - 1.)) / resolution);
				vec2 sampleUv = vUv + offset;
				denoiseSample(center, viewNormal, viewPos, sampleUv, denoised, totalWeight);
			}
		
			if (totalWeight > 0.) { 
				denoised /= totalWeight;
			}
			gl_FragColor = FRAGMENT_OUTPUT;
		}`};function Ku(s,t,e){const n=kx(s,t,e);let i="vec3[SAMPLES](";for(let o=0;o<s;o++){const r=n[o];i+=`vec3(${r.x}, ${r.y}, ${r.z})${o<s-1?",":")"}`}return i}function kx(s,t,e){const n=[];for(let i=0;i<s;i++){const o=2*Math.PI*t*i/s,r=Math.pow(i/(s-1),e);n.push(new O(Math.cos(o),Math.sin(o),r))}return n}class Gx{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,n){return t[0]*e+t[1]*n}dot3(t,e,n,i){return t[0]*e+t[1]*n+t[2]*i}dot4(t,e,n,i,o){return t[0]*e+t[1]*n+t[2]*i+t[3]*o}noise(t,e){let n,i,o;const r=.5*(Math.sqrt(3)-1),a=(t+e)*r,c=Math.floor(t+a),l=Math.floor(e+a),h=(3-Math.sqrt(3))/6,d=(c+l)*h,u=c-d,f=l-d,p=t-u,v=e-f;let g,m;p>v?(g=1,m=0):(g=0,m=1);const x=p-g+h,M=v-m+h,y=p-1+2*h,w=v-1+2*h,S=c&255,b=l&255,T=this.perm[S+this.perm[b]]%12,_=this.perm[S+g+this.perm[b+m]]%12,E=this.perm[S+1+this.perm[b+1]]%12;let L=.5-p*p-v*v;L<0?n=0:(L*=L,n=L*L*this.dot(this.grad3[T],p,v));let P=.5-x*x-M*M;P<0?i=0:(P*=P,i=P*P*this.dot(this.grad3[_],x,M));let U=.5-y*y-w*w;return U<0?o=0:(U*=U,o=U*U*this.dot(this.grad3[E],y,w)),70*(n+i+o)}noise3d(t,e,n){let i,o,r,a;const l=(t+e+n)*.3333333333333333,h=Math.floor(t+l),d=Math.floor(e+l),u=Math.floor(n+l),f=1/6,p=(h+d+u)*f,v=h-p,g=d-p,m=u-p,x=t-v,M=e-g,y=n-m;let w,S,b,T,_,E;x>=M?M>=y?(w=1,S=0,b=0,T=1,_=1,E=0):x>=y?(w=1,S=0,b=0,T=1,_=0,E=1):(w=0,S=0,b=1,T=1,_=0,E=1):M<y?(w=0,S=0,b=1,T=0,_=1,E=1):x<y?(w=0,S=1,b=0,T=0,_=1,E=1):(w=0,S=1,b=0,T=1,_=1,E=0);const L=x-w+f,P=M-S+f,U=y-b+f,C=x-T+2*f,D=M-_+2*f,F=y-E+2*f,V=x-1+3*f,G=M-1+3*f,B=y-1+3*f,q=h&255,H=d&255,X=u&255,W=this.perm[q+this.perm[H+this.perm[X]]]%12,et=this.perm[q+w+this.perm[H+S+this.perm[X+b]]]%12,ut=this.perm[q+T+this.perm[H+_+this.perm[X+E]]]%12,dt=this.perm[q+1+this.perm[H+1+this.perm[X+1]]]%12;let it=.6-x*x-M*M-y*y;it<0?i=0:(it*=it,i=it*it*this.dot3(this.grad3[W],x,M,y));let ht=.6-L*L-P*P-U*U;ht<0?o=0:(ht*=ht,o=ht*ht*this.dot3(this.grad3[et],L,P,U));let ft=.6-C*C-D*D-F*F;ft<0?r=0:(ft*=ft,r=ft*ft*this.dot3(this.grad3[ut],C,D,F));let pt=.6-V*V-G*G-B*B;return pt<0?a=0:(pt*=pt,a=pt*pt*this.dot3(this.grad3[dt],V,G,B)),32*(i+o+r+a)}noise4d(t,e,n,i){const o=this.grad4,r=this.simplex,a=this.perm,c=(Math.sqrt(5)-1)/4,l=(5-Math.sqrt(5))/20;let h,d,u,f,p;const v=(t+e+n+i)*c,g=Math.floor(t+v),m=Math.floor(e+v),x=Math.floor(n+v),M=Math.floor(i+v),y=(g+m+x+M)*l,w=g-y,S=m-y,b=x-y,T=M-y,_=t-w,E=e-S,L=n-b,P=i-T,U=_>E?32:0,C=_>L?16:0,D=E>L?8:0,F=_>P?4:0,V=E>P?2:0,G=L>P?1:0,B=U+C+D+F+V+G,q=r[B][0]>=3?1:0,H=r[B][1]>=3?1:0,X=r[B][2]>=3?1:0,W=r[B][3]>=3?1:0,et=r[B][0]>=2?1:0,ut=r[B][1]>=2?1:0,dt=r[B][2]>=2?1:0,it=r[B][3]>=2?1:0,ht=r[B][0]>=1?1:0,ft=r[B][1]>=1?1:0,pt=r[B][2]>=1?1:0,_t=r[B][3]>=1?1:0,z=_-q+l,ct=E-H+l,K=L-X+l,lt=P-W+l,tt=_-et+2*l,Rt=E-ut+2*l,xt=L-dt+2*l,I=P-it+2*l,R=_-ht+3*l,Y=E-ft+3*l,rt=L-pt+3*l,ot=P-_t+3*l,st=_-1+4*l,yt=E-1+4*l,gt=L-1+4*l,bt=P-1+4*l,Nt=g&255,Ft=m&255,at=x&255,Zt=M&255,Xt=a[Nt+a[Ft+a[at+a[Zt]]]]%32,Bt=a[Nt+q+a[Ft+H+a[at+X+a[Zt+W]]]]%32,St=a[Nt+et+a[Ft+ut+a[at+dt+a[Zt+it]]]]%32,At=a[Nt+ht+a[Ft+ft+a[at+pt+a[Zt+_t]]]]%32,Ht=a[Nt+1+a[Ft+1+a[at+1+a[Zt+1]]]]%32;let ne=.6-_*_-E*E-L*L-P*P;ne<0?h=0:(ne*=ne,h=ne*ne*this.dot4(o[Xt],_,E,L,P));let ce=.6-z*z-ct*ct-K*K-lt*lt;ce<0?d=0:(ce*=ce,d=ce*ce*this.dot4(o[Bt],z,ct,K,lt));let Wt=.6-tt*tt-Rt*Rt-xt*xt-I*I;Wt<0?u=0:(Wt*=Wt,u=Wt*Wt*this.dot4(o[St],tt,Rt,xt,I));let vt=.6-R*R-Y*Y-rt*rt-ot*ot;vt<0?f=0:(vt*=vt,f=vt*vt*this.dot4(o[At],R,Y,rt,ot));let k=.6-st*st-yt*yt-gt*gt-bt*bt;return k<0?p=0:(k*=k,p=k*k*this.dot4(o[Ht],st,yt,gt,bt)),27*(h+d+u+f+p)}}class Rn extends si{constructor(t,e,n,i,o,r,a){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=zx(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Je(this.width,this.height,{type:an}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new Me({defines:Object.assign({},Po.defines),uniforms:tn.clone(Po.uniforms),vertexShader:Po.vertexShader,fragmentShader:Po.fragmentShader,blending:Oe,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.definesPERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Ax,this.normalMaterial.blending=Oe,this.pdMaterial=new Me({defines:Object.assign({},Io.defines),uniforms:tn.clone(Io.uniforms),vertexShader:Io.vertexShader,fragmentShader:Io.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new Me({defines:Object.assign({},Lo.defines),uniforms:tn.clone(Lo.uniforms),vertexShader:Lo.vertexShader,fragmentShader:Lo.fragmentShader,blending:Oe}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new Me({uniforms:tn.clone(ks.uniforms),vertexShader:ks.vertexShader,fragmentShader:ks.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Wa,blendDst:Is,blendEquation:Mn,blendSrcAlpha:Ha,blendDstAlpha:Is,blendEquationAlpha:Mn}),this.blendMaterial=new Me({uniforms:tn.clone(va.uniforms),vertexShader:va.vertexShader,fragmentShader:va.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:ru,blendSrc:Wa,blendDst:Is,blendEquation:Mn,blendSrcAlpha:Ha,blendDstAlpha:Is,blendEquationAlpha:Mn}),this.fsQuad=new Js(null),this.originalClearColor=new Dt,this.setGBuffer(o?o.depthTexture:void 0,o?o.normalTexture:void 0),r!==void 0&&this.updateGtaoMaterial(r),a!==void 0&&this.updatePdMaterial(a)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new dc,this.depthTexture.format=wi,this.depthTexture.type=ei,this.normalRenderTarget=new Je(this.width,this.height,{minFilter:Se,magFilter:Se,type:an,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Ku(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case Rn.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Rn.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Rn.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Rn.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case Rn.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case Rn.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,e,n,i,o){t.getClearColor(this.originalClearColor);const r=t.getClearAlpha(),a=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,i!=null&&(t.setClearColor(i),t.setClearAlpha(o||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(r)}renderOverride(t,e,n,i,o){t.getClearColor(this.originalClearColor);const r=t.getClearAlpha(),a=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,i=e.clearColor||i,o=e.clearAlpha||o,i!=null&&(t.setClearColor(i),t.setClearAlpha(o||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(r)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(n){e.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(n){const i=e.get(n);n.visible=i}),e.clear()}generateNoise(t=64){const e=new Gx,n=t*t*4,i=new Uint8Array(n);for(let r=0;r<t;r++)for(let a=0;a<t;a++){const c=r,l=a;i[(r*t+a)*4]=(e.noise(c,l)*.5+.5)*255,i[(r*t+a)*4+1]=(e.noise(c+t,l)*.5+.5)*255,i[(r*t+a)*4+2]=(e.noise(c,l+t)*.5+.5)*255,i[(r*t+a)*4+3]=(e.noise(c+t,l+t)*.5+.5)*255}const o=new ku(i,t,t,un,Hn);return o.wrapS=le,o.wrapT=le,o.needsUpdate=!0,o}}Rn.OUTPUT={Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Hx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Dt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class rs extends si{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new nt(t.x,t.y):new nt(256,256),this.clearColor=new Dt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Je(o,r,{type:an}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new Je(o,r,{type:an});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new Je(o,r,{type:an});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),o=Math.round(o/2),r=Math.round(r/2)}const a=Hx;this.highPassUniforms=tn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Me({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new nt(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1),new O(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=ks;this.copyUniforms=tn.clone(h.uniforms),this.blendMaterial=new Me({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:za,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Dt,this.oldClearAlpha=1,this.basic=new Ei,this.fsQuad=new Js(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(n,i),this.renderTargetsVertical[o].setSize(n,i),this.separableBlurMaterials[o].uniforms.invSize.value=new nt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,o){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),o&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=rs.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=rs.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=r}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Me({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new nt(.5,.5)},direction:{value:new nt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Me({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}rs.BlurDirectionX=new nt(1,0);rs.BlurDirectionY=new nt(0,1);const Do={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`},No={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`},xa={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`};class Wx extends si{constructor(t,e){super(),this.edgesRT=new Je(t,e,{depthBuffer:!1,type:an}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new Je(t,e,{depthBuffer:!1,type:an}),this.weightsRT.texture.name="SMAAPass.weights";const n=this,i=new Image;i.src=this.getAreaTexture(),i.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new ze,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=i,this.areaTexture.minFilter=$e,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const o=new Image;o.src=this.getSearchTexture(),o.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new ze,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=o,this.searchTexture.magFilter=Se,this.searchTexture.minFilter=Se,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=tn.clone(Do.uniforms),this.uniformsEdges.resolution.value.set(1/t,1/e),this.materialEdges=new Me({defines:Object.assign({},Do.defines),uniforms:this.uniformsEdges,vertexShader:Do.vertexShader,fragmentShader:Do.fragmentShader}),this.uniformsWeights=tn.clone(No.uniforms),this.uniformsWeights.resolution.value.set(1/t,1/e),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new Me({defines:Object.assign({},No.defines),uniforms:this.uniformsWeights,vertexShader:No.vertexShader,fragmentShader:No.fragmentShader}),this.uniformsBlend=tn.clone(xa.uniforms),this.uniformsBlend.resolution.value.set(1/t,1/e),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new Me({uniforms:this.uniformsBlend,vertexShader:xa.vertexShader,fragmentShader:xa.fragmentShader}),this.fsQuad=new Js(null)}render(t,e,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,t.setRenderTarget(this.edgesRT),this.clear&&t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialWeights,t.setRenderTarget(this.weightsRT),this.clear&&t.clear(),this.fsQuad.render(t),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(),this.fsQuad.render(t))}setSize(t,e){this.edgesRT.setSize(t,e),this.weightsRT.setSize(t,e),this.materialEdges.uniforms.resolution.value.set(1/t,1/e),this.materialWeights.uniforms.resolution.value.set(1/t,1/e),this.materialBlend.uniforms.resolution.value.set(1/t,1/e)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const Vx={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Xx extends si{constructor(){super();const t=Vx;this.uniforms=tn.clone(t.uniforms),this.material=new Tx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Js(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},oe.getTransfer(this._outputColorSpace)===pe&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===cu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===lu?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===hu?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===sc?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===uu&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function qx(s){const t=new Bu({canvas:s,antialias:!0,powerPreference:"high-performance",stencil:!1});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(window.innerWidth,window.innerHeight),t.outputColorSpace=Yt,t.toneMapping=sc,t.toneMappingExposure=1.08,t.shadowMap.enabled=!0,t.shadowMap.type=ou;const e=new Yv,n=new rn(62,window.innerWidth/window.innerHeight,.6,3e3),i=new Ir;i.scale.setScalar(8e3),e.add(i);const o=new O,r=i.material.uniforms;r.turbidity.value=4.5,r.rayleigh.value=2.2,r.mieCoefficient.value=.006,r.mieDirectionalG.value=.8;const a=Xe.degToRad(11),c=Xe.degToRad(128);o.setFromSphericalCoords(1,Math.PI/2-a,c),r.sunPosition.value.copy(o);const l=new ch(16766368,3.4);l.position.copy(o).multiplyScalar(800),l.castShadow=!0,l.shadow.mapSize.set(4096,4096),l.shadow.camera.near=50,l.shadow.camera.far=1600;const h=90;l.shadow.camera.left=-h,l.shadow.camera.right=h,l.shadow.camera.top=h,l.shadow.camera.bottom=-h,l.shadow.bias=-1e-4,l.shadow.normalBias=.04,l.shadow.radius=3,e.add(l),e.add(l.target);const d=o.clone().normalize(),u=2*h/4096;function f(_){const E=Math.round(_.x/u)*u,L=Math.round(_.z/u)*u;l.target.position.set(E,0,L),l.position.set(E+d.x*800,d.y*800,L+d.z*800)}const p=new Rx(9615584,4076832,.6);e.add(p);const v=new ch(9221332,.28);v.position.set(-o.x*300,200,-o.z*300),e.add(v);const g=new Za(t);g.compileCubemapShader();const m=g.fromScene(e,.04).texture;e.environment=m,g.dispose(),e.fog=new Rr(13155238,900,4200);const x=new Fx(t);x.setPixelRatio(Math.min(window.devicePixelRatio,2)),x.setSize(window.innerWidth,window.innerHeight);const M=new Ox(e,n);x.addPass(M);const y=.5,w=new Rn(e,n,Math.round(window.innerWidth*y),Math.round(window.innerHeight*y));w.output=Rn.OUTPUT.Default,w.blendIntensity=.9,w.updateGtaoMaterial({radius:.6,distanceExponent:1,thickness:1,scale:1,samples:16}),x.addPass(w);const S=new rs(new nt(window.innerWidth,window.innerHeight),.22,.65,.91);x.addPass(S);const b=new Zu(Yx);x.addPass(b);const T=new Wx(window.innerWidth*t.getPixelRatio(),window.innerHeight*t.getPixelRatio());return x.addPass(T),x.addPass(new Xx),window.addEventListener("resize",()=>{const _=window.innerWidth,E=window.innerHeight;t.setSize(_,E),x.setSize(_,E),w.setSize(Math.round(_*y),Math.round(E*y)),n.aspect=_/E,n.updateProjectionMatrix(),S.resolution.set(_,E)}),{renderer:t,scene:e,camera:n,composer:x,sun:l,updateShadowTarget:f}}const Yx={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:1},uCA:{value:9e-4},uGrain:{value:.018}},vertexShader:`
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
  `};class wn{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new A);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new A);const n=this.elements,i=t.x,o=t.y,r=t.z;return e.x=n[0]*i+n[1]*o+n[2]*r,e.y=n[3]*i+n[4]*o+n[5]*r,e.z=n[6]*i+n[7]*o+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new wn);const n=this.elements,i=t.elements,o=e.elements,r=n[0],a=n[1],c=n[2],l=n[3],h=n[4],d=n[5],u=n[6],f=n[7],p=n[8],v=i[0],g=i[1],m=i[2],x=i[3],M=i[4],y=i[5],w=i[6],S=i[7],b=i[8];return o[0]=r*v+a*x+c*w,o[1]=r*g+a*M+c*S,o[2]=r*m+a*y+c*b,o[3]=l*v+h*x+d*w,o[4]=l*g+h*M+d*S,o[5]=l*m+h*y+d*b,o[6]=u*v+f*x+p*w,o[7]=u*g+f*M+p*S,o[8]=u*m+f*y+p*b,e}scale(t,e){e===void 0&&(e=new wn);const n=this.elements,i=e.elements;for(let o=0;o!==3;o++)i[3*o+0]=t.x*n[3*o+0],i[3*o+1]=t.y*n[3*o+1],i[3*o+2]=t.z*n[3*o+2];return e}solve(t,e){e===void 0&&(e=new A);const n=3,i=4,o=[];let r,a;for(r=0;r<n*i;r++)o.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)o[r+i*a]=this.elements[r+3*a];o[3+4*0]=t.x,o[3+4*1]=t.y,o[3+4*2]=t.z;let c=3;const l=c;let h;const d=4;let u;do{if(r=l-c,o[r+i*r]===0){for(a=r+1;a<l;a++)if(o[r+i*a]!==0){h=d;do u=d-h,o[u+i*r]+=o[u+i*a];while(--h);break}}if(o[r+i*r]!==0)for(a=r+1;a<l;a++){const f=o[r+i*a]/o[r+i*r];h=d;do u=d-h,o[u+i*a]=u<=r?0:o[u+i*a]-o[u+i*r]*f;while(--h)}}while(--c);if(e.z=o[2*i+3]/o[2*i+2],e.y=(o[1*i+3]-o[1*i+2]*e.z)/o[1*i+1],e.x=(o[0*i+3]-o[0*i+2]*e.z-o[0*i+1]*e.y)/o[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new wn);const e=3,n=6,i=jx;let o,r;for(o=0;o<3;o++)for(r=0;r<3;r++)i[o+n*r]=this.elements[o+3*r];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const c=a;let l;const h=n;let d;do{if(o=c-a,i[o+n*o]===0){for(r=o+1;r<c;r++)if(i[o+n*r]!==0){l=h;do d=h-l,i[d+n*o]+=i[d+n*r];while(--l);break}}if(i[o+n*o]!==0)for(r=o+1;r<c;r++){const u=i[o+n*r]/i[o+n*o];l=h;do d=h-l,i[d+n*r]=d<=o?0:i[d+n*r]-i[d+n*o]*u;while(--l)}}while(--a);o=2;do{r=o-1;do{const u=i[o+n*r]/i[o+n*o];l=n;do d=n-l,i[d+n*r]=i[d+n*r]-i[d+n*o]*u;while(--l)}while(r--)}while(--o);o=2;do{const u=1/i[o+n*o];l=n;do d=n-l,i[d+n*o]=i[d+n*o]*u;while(--l)}while(o--);o=2;do{r=2;do{if(d=i[e+r+n*o],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(o,r,d)}while(r--)}while(o--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,o=t.w,r=e+e,a=n+n,c=i+i,l=e*r,h=e*a,d=e*c,u=n*a,f=n*c,p=i*c,v=o*r,g=o*a,m=o*c,x=this.elements;return x[3*0+0]=1-(u+p),x[3*0+1]=h-m,x[3*0+2]=d+g,x[3*1+0]=h+m,x[3*1+1]=1-(l+p),x[3*1+2]=f-v,x[3*2+0]=d-g,x[3*2+1]=f+v,x[3*2+2]=1-(l+u),this}transpose(t){t===void 0&&(t=new wn);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const jx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class A{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new A);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,c=this.z;return e.x=a*o-c*i,e.y=c*n-r*o,e.z=r*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new A(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new A(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new wn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const o=1/i;this.x*=o,this.y*=o,this.z*=o}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new A);const e=this.x,n=this.y,i=this.z;let o=Math.sqrt(e*e+n*n+i*i);return o>0?(o=1/o,t.x=e*o,t.y=n*o,t.z=i*o):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return Math.sqrt((o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return(o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new A);const n=this.x,i=this.y,o=this.z;return e.x=t*n,e.y=t*i,e.z=t*o,e}vmul(t,e){return e===void 0&&(e=new A),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new A),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new A),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=Zx,o=1/n;i.set(this.x*o,this.y*o,this.z*o);const r=Kx;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,o=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=o+(t.y-o)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(uh),uh.almostEquals(t,e)}clone(){return new A(this.x,this.y,this.z)}}A.ZERO=new A(0,0,0);A.UNIT_X=new A(1,0,0);A.UNIT_Y=new A(0,1,0);A.UNIT_Z=new A(0,0,1);const Zx=new A,Kx=new A,uh=new A;class cn{constructor(t){t===void 0&&(t={}),this.lowerBound=new A,this.upperBound=new A,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const o=this.lowerBound,r=this.upperBound,a=n;o.copy(t[0]),a&&a.vmult(o,o),r.copy(o);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,dh),l=dh),l.x>r.x&&(r.x=l.x),l.x<o.x&&(o.x=l.x),l.y>r.y&&(r.y=l.y),l.y<o.y&&(o.y=l.y),l.z>r.z&&(r.z=l.z),l.z<o.z&&(o.z=l.z)}return e&&(e.vadd(o,o),e.vadd(r,r)),i&&(o.x-=i,o.y-=i,o.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new cn().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound,r=i.x<=n.x&&n.x<=o.x||e.x<=o.x&&o.x<=n.x,a=i.y<=n.y&&n.y<=o.y||e.y<=o.y&&o.y<=n.y,c=i.z<=n.z&&n.z<=o.z||e.z<=o.z&&o.z<=n.z;return r&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound;return e.x<=i.x&&n.x>=o.x&&e.y<=i.y&&n.y>=o.y&&e.z<=i.z&&n.z>=o.z}getCorners(t,e,n,i,o,r,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),o.set(h.x,l.y,h.z),r.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=fh,i=n[0],o=n[1],r=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,o,r,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=fh,i=n[0],o=n[1],r=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,o,r,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,o=1/e.y,r=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*o,h=(this.upperBound.y-n.y)*o,d=(this.lowerBound.z-n.z)*r,u=(this.upperBound.z-n.z)*r,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(d,u)),p=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(d,u));return!(p<0||f>p)}}const dh=new A,fh=[new A,new A,new A,new A,new A,new A,new A,new A];class ph{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const o=i;i=n,n=o}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:o}=e;if(o>i){const r=o;o=i,i=r}this.matrix[(i*(i+1)>>1)+o-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class Ju{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,o=n.length;i<o;i++)n[i].call(this,t)}return this}}class ve{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new A),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=Jx,i=Qx;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new ve);const n=this.x,i=this.y,o=this.z,r=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+r*a+i*l-o*c,e.y=i*h+r*c+o*a-n*l,e.z=o*h+r*l+n*c-i*a,e.w=r*h-n*a-i*c-o*l,e}inverse(t){t===void 0&&(t=new ve);const e=this.x,n=this.y,i=this.z,o=this.w;this.conjugate(t);const r=1/(e*e+n*n+i*i+o*o);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new ve),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new A);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*o-c*i,d=l*i+c*n-r*o,u=l*o+r*i-a*n,f=-r*n-a*i-c*o;return e.x=h*l+f*-r+d*-c-u*-a,e.y=d*l+f*-a+u*-r-h*-c,e.z=u*l+f*-c+h*-a-d*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,o;const r=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=r*a+c*l;if(h>.499&&(n=2*Math.atan2(r,l),i=Math.PI/2,o=0),h<-.499&&(n=-2*Math.atan2(r,l),i=-Math.PI/2,o=0),n===void 0){const d=r*r,u=a*a,f=c*c;n=Math.atan2(2*a*l-2*r*c,1-2*u-2*f),i=Math.asin(2*h),o=Math.atan2(2*r*l-2*a*c,1-2*d-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=o}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const o=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*r*a+o*l*h,this.y=o*l*a-c*r*h,this.z=o*r*h+c*l*a,this.w=o*r*a-c*l*h):i==="YXZ"?(this.x=c*r*a+o*l*h,this.y=o*l*a-c*r*h,this.z=o*r*h-c*l*a,this.w=o*r*a+c*l*h):i==="ZXY"?(this.x=c*r*a-o*l*h,this.y=o*l*a+c*r*h,this.z=o*r*h+c*l*a,this.w=o*r*a-c*l*h):i==="ZYX"?(this.x=c*r*a-o*l*h,this.y=o*l*a+c*r*h,this.z=o*r*h-c*l*a,this.w=o*r*a+c*l*h):i==="YZX"?(this.x=c*r*a+o*l*h,this.y=o*l*a+c*r*h,this.z=o*r*h-c*l*a,this.w=o*r*a-c*l*h):i==="XZY"&&(this.x=c*r*a-o*l*h,this.y=o*l*a-c*r*h,this.z=o*r*h+c*l*a,this.w=o*r*a+c*l*h),this}clone(){return new ve(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new ve);const i=this.x,o=this.y,r=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,d=t.w,u,f,p,v,g;return f=i*c+o*l+r*h+a*d,f<0&&(f=-f,c=-c,l=-l,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),p=Math.sin(u),v=Math.sin((1-e)*u)/p,g=Math.sin(e*u)/p):(v=1-e,g=e),n.x=v*i+g*c,n.y=v*o+g*l,n.z=v*r+g*h,n.w=v*a+g*d,n}integrate(t,e,n,i){i===void 0&&(i=new ve);const o=t.x*n.x,r=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(o*d+r*h-a*l),i.y+=u*(r*d+a*c-o*h),i.z+=u*(a*d+o*l-r*c),i.w+=u*(-o*c-r*l-a*h),i}}const Jx=new A,Qx=new A,$x={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class It{constructor(t){t===void 0&&(t={}),this.id=It.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}It.idCounter=0;It.types=$x;class se{constructor(t){t===void 0&&(t={}),this.position=new A,this.quaternion=new ve,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return se.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return se.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new A),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new A),n.vsub(t,i),e.conjugate(mh),mh.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new A),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new A),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new A),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const mh=new ve;class Gs extends It{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:o,boundingSphereRadius:r}=t;super({type:It.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=o?o.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new A;for(let o=0;o!==t.length;o++){const r=t[o],a=r.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[r[c]].vsub(e[r[l]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new A;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],o=this.vertices[n[1]],r=this.vertices[n[2]];Gs.computeNormal(i,o,r,e)}static computeNormal(t,e,n,i){const o=new A,r=new A;e.vsub(t,r),n.vsub(e,o),o.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,o,r,a,c,l){const h=new A;let d=-1,u=-Number.MAX_VALUE;for(let p=0;p<n.faces.length;p++){h.copy(n.faceNormals[p]),o.vmult(h,h);const v=h.dot(r);v>u&&(u=v,d=p)}const f=[];for(let p=0;p<n.faces[d].length;p++){const v=n.vertices[n.faces[d][p]],g=new A;g.copy(v),o.vmult(g,g),i.vadd(g,g),f.push(g)}d>=0&&this.clipFaceAgainstHull(r,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,o,r,a,c){const l=new A,h=new A,d=new A,u=new A,f=new A,p=new A;let v=Number.MAX_VALUE;const g=this;if(g.uniqueAxes)for(let m=0;m!==g.uniqueAxes.length;m++){n.vmult(g.uniqueAxes[m],l);const x=g.testSepAxis(l,t,e,n,i,o);if(x===!1)return!1;x<v&&(v=x,r.copy(l))}else{const m=a?a.length:g.faces.length;for(let x=0;x<m;x++){const M=a?a[x]:x;l.copy(g.faceNormals[M]),n.vmult(l,l);const y=g.testSepAxis(l,t,e,n,i,o);if(y===!1)return!1;y<v&&(v=y,r.copy(l))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){o.vmult(t.uniqueAxes[m],h);const x=g.testSepAxis(h,t,e,n,i,o);if(x===!1)return!1;x<v&&(v=x,r.copy(h))}else{const m=c?c.length:t.faces.length;for(let x=0;x<m;x++){const M=c?c[x]:x;h.copy(t.faceNormals[M]),o.vmult(h,h);const y=g.testSepAxis(h,t,e,n,i,o);if(y===!1)return!1;y<v&&(v=y,r.copy(h))}}for(let m=0;m!==g.uniqueEdges.length;m++){n.vmult(g.uniqueEdges[m],u);for(let x=0;x!==t.uniqueEdges.length;x++)if(o.vmult(t.uniqueEdges[x],f),u.cross(f,p),!p.almostZero()){p.normalize();const M=g.testSepAxis(p,t,e,n,i,o);if(M===!1)return!1;M<v&&(v=M,r.copy(p))}}return i.vsub(e,d),d.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,o,r){const a=this;Gs.project(a,t,n,i,Ma),Gs.project(e,t,o,r,ya);const c=Ma[0],l=Ma[1],h=ya[0],d=ya[1];if(c<d||h<l)return!1;const u=c-d,f=h-l;return u<f?u:f}calculateLocalInertia(t,e){const n=new A,i=new A;this.computeLocalAABB(i,n);const o=n.x-i.x,r=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*o*2*o+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*o*2*o)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,o,r,a){const c=new A,l=new A,h=new A,d=new A,u=new A,f=new A,p=new A,v=new A,g=this,m=[],x=i,M=m;let y=-1,w=Number.MAX_VALUE;for(let E=0;E<g.faces.length;E++){c.copy(g.faceNormals[E]),n.vmult(c,c);const L=c.dot(t);L<w&&(w=L,y=E)}if(y<0)return;const S=g.faces[y];S.connectedFaces=[];for(let E=0;E<g.faces.length;E++)for(let L=0;L<g.faces[E].length;L++)S.indexOf(g.faces[E][L])!==-1&&E!==y&&S.connectedFaces.indexOf(E)===-1&&S.connectedFaces.push(E);const b=S.length;for(let E=0;E<b;E++){const L=g.vertices[S[E]],P=g.vertices[S[(E+1)%b]];L.vsub(P,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[y]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(L),n.vmult(f,f),e.vadd(f,f);const U=S.connectedFaces[E];p.copy(this.faceNormals[U]);const C=this.getPlaneConstantOfFace(U);v.copy(p),n.vmult(v,v);const D=C-v.dot(e);for(this.clipFaceAgainstPlane(x,M,v,D);x.length;)x.shift();for(;M.length;)x.push(M.shift())}p.copy(this.faceNormals[y]);const T=this.getPlaneConstantOfFace(y);v.copy(p),n.vmult(v,v);const _=T-v.dot(e);for(let E=0;E<x.length;E++){let L=v.dot(x[E])+_;if(L<=o&&(console.log(`clamped: depth=${L} to minDist=${o}`),L=o),L<=r){const P=x[E];if(L<=1e-6){const U={point:P,normal:v,depth:L};a.push(U)}}}}clipFaceAgainstPlane(t,e,n,i){let o,r;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];o=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],r=n.dot(l)+i,o<0)if(r<0){const d=new A;d.copy(l),e.push(d)}else{const d=new A;c.lerp(l,o/(o-r),d),e.push(d)}else if(r<0){const d=new A;c.lerp(l,o/(o-r),d),e.push(d),e.push(l)}c=l,o=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new A);const n=this.vertices,i=this.worldVertices;for(let o=0;o!==this.vertices.length;o++)e.vmult(n[o],i[o]),t.vadd(i[o],i[o]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const o=n[i];o.x<t.x?t.x=o.x:o.x>e.x&&(e.x=o.x),o.y<t.y?t.y=o.y:o.y>e.y&&(e.y=o.y),o.z<t.z?t.z=o.z:o.z>e.z&&(e.z=o.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new A);const n=this.faceNormals,i=this.worldFaceNormals;for(let o=0;o!==e;o++)t.vmult(n[o],i[o]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const o=this.vertices;let r,a,c,l,h,d,u=new A;for(let f=0;f<o.length;f++){u.copy(o[f]),e.vmult(u,u),t.vadd(u,u);const p=u;(r===void 0||p.x<r)&&(r=p.x),(l===void 0||p.x>l)&&(l=p.x),(a===void 0||p.y<a)&&(a=p.y),(h===void 0||p.y>h)&&(h=p.y),(c===void 0||p.z<c)&&(c=p.z),(d===void 0||p.z>d)&&(d=p.z)}n.set(r,a,c),i.set(l,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new A);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let o=0;o<n;o++){const r=i[o];e.vmult(r,r)}for(let o=0;o<this.faceNormals.length;o++){const r=this.faceNormals[o];e.vmult(r,r)}}if(t)for(let o=0;o<n;o++){const r=i[o];r.vadd(t,r)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,o=new A;this.getAveragePointLocal(o);for(let r=0;r<this.faces.length;r++){let a=i[r];const c=e[n[r][0]],l=new A;t.vsub(c,l);const h=a.dot(l),d=new A;o.vsub(c,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(t,e,n,i,o){const r=t.vertices.length,a=tM;let c=0,l=0;const h=eM,d=t.vertices;h.setZero(),se.vectorToLocalFrame(n,i,e,a),se.pointToLocalFrame(n,i,h,h);const u=h.dot(a);l=c=d[0].dot(a);for(let f=1;f<r;f++){const p=d[f].dot(a);p>c&&(c=p),p<l&&(l=p)}if(l-=u,c-=u,l>c){const f=l;l=c,c=f}o[0]=c,o[1]=l}}const Ma=[],ya=[];new A;const tM=new A,eM=new A;class ds extends It{constructor(t){super({type:It.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=A,o=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new Gs({vertices:o,faces:r,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new A),ds.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let o=0;o!==n.length;o++)e.vmult(n[o],n[o]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,o=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<o.length;r++)Kn.set(o[r][0],o[r][1],o[r][2]),e.vmult(Kn,Kn),t.vadd(Kn,Kn),n(Kn.x,Kn.y,Kn.z)}calculateWorldAABB(t,e,n,i){const o=this.halfExtents;bn[0].set(o.x,o.y,o.z),bn[1].set(-o.x,o.y,o.z),bn[2].set(-o.x,-o.y,o.z),bn[3].set(-o.x,-o.y,-o.z),bn[4].set(o.x,-o.y,-o.z),bn[5].set(o.x,o.y,-o.z),bn[6].set(-o.x,o.y,-o.z),bn[7].set(o.x,-o.y,o.z);const r=bn[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let a=1;a<8;a++){const c=bn[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,d=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),d>i.z&&(i.z=d),l<n.x&&(n.x=l),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}}const Kn=new A,bn=[new A,new A,new A,new A,new A,new A,new A,new A],vc={DYNAMIC:1,STATIC:2,KINEMATIC:4},xc={AWAKE:0,SLEEPY:1,SLEEPING:2};class Lt extends Ju{constructor(t){t===void 0&&(t={}),super(),this.id=Lt.idCounter++,this.index=-1,this.world=null,this.vlambda=new A,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new A,this.previousPosition=new A,this.interpolatedPosition=new A,this.initPosition=new A,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new A,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new A,this.force=new A;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?Lt.STATIC:Lt.DYNAMIC,typeof t.type==typeof Lt.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=Lt.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new A,this.quaternion=new ve,this.initQuaternion=new ve,this.previousQuaternion=new ve,this.interpolatedQuaternion=new ve,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new A,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new A,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new A,this.invInertia=new A,this.invInertiaWorld=new wn,this.invMassSolve=0,this.invInertiaSolve=new A,this.invInertiaWorldSolve=new wn,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new A(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new A(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new cn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new A,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=Lt.AWAKE,this.wakeUpAfterNarrowphase=!1,t===Lt.SLEEPING&&this.dispatchEvent(Lt.wakeupEvent)}sleep(){this.sleepState=Lt.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===Lt.AWAKE&&n<i?(this.sleepState=Lt.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(Lt.sleepyEvent)):e===Lt.SLEEPY&&n>i?this.wakeUp():e===Lt.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(Lt.sleepEvent))}}updateSolveMassProperties(){this.sleepState===Lt.SLEEPING||this.type===Lt.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new A),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new A),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new A),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new A),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new A,o=new ve;return e&&i.copy(e),n&&o.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(o),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let o=0;o!==n;o++){const r=t[o];r.updateBoundingSphereRadius();const a=e[o].length(),c=r.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,o=nM,r=iM,a=this.quaternion,c=this.aabb,l=sM;for(let h=0;h!==i;h++){const d=t[h];a.vmult(e[h],o),o.vadd(this.position,o),a.mult(n[h],r),d.calculateWorldAABB(o,r,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=oM,i=rM;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new A),this.type!==Lt.DYNAMIC)return;this.sleepState===Lt.SLEEPING&&this.wakeUp();const n=aM;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new A),this.type!==Lt.DYNAMIC)return;const n=cM,i=lM;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===Lt.DYNAMIC&&(this.sleepState===Lt.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new A),this.type!==Lt.DYNAMIC)return;this.sleepState===Lt.SLEEPING&&this.wakeUp();const n=e,i=hM;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const o=uM;n.cross(t,o),this.invInertiaWorld.vmult(o,o),this.angularVelocity.vadd(o,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new A),this.type!==Lt.DYNAMIC)return;const n=dM,i=fM;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=pM;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),ds.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new A;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===Lt.DYNAMIC||this.type===Lt.KINEMATIC)||this.sleepState===Lt.SLEEPING)return;const i=this.velocity,o=this.angularVelocity,r=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*t;i.x+=a.x*f*u.x,i.y+=a.y*f*u.y,i.z+=a.z*f*u.z;const p=d.elements,v=this.angularFactor,g=c.x*v.x,m=c.y*v.y,x=c.z*v.z;o.x+=t*(p[0]*g+p[1]*m+p[2]*x),o.y+=t*(p[3]*g+p[4]*m+p[5]*x),o.z+=t*(p[6]*g+p[7]*m+p[8]*x),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}Lt.idCounter=0;Lt.COLLIDE_EVENT_NAME="collide";Lt.DYNAMIC=vc.DYNAMIC;Lt.STATIC=vc.STATIC;Lt.KINEMATIC=vc.KINEMATIC;Lt.AWAKE=xc.AWAKE;Lt.SLEEPY=xc.SLEEPY;Lt.SLEEPING=xc.SLEEPING;Lt.wakeupEvent={type:"wakeup"};Lt.sleepyEvent={type:"sleepy"};Lt.sleepEvent={type:"sleep"};const nM=new A,iM=new ve,sM=new cn,oM=new wn,rM=new wn;new wn;const aM=new A,cM=new A,lM=new A,hM=new A,uM=new A,dM=new A,fM=new A,pM=new A;class mM{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&Lt.STATIC||t.sleepState===Lt.SLEEPING)&&(e.type&Lt.STATIC||e.sleepState===Lt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const o=gM;e.position.vsub(t.position,o);const r=(t.boundingRadius+e.boundingRadius)**2;o.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=vM,i=xM,o=MM,r=t.length;for(let a=0;a!==r;a++)i[a]=t[a],o[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){const c=i[a].id,l=o[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(o[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new A;t.position.vsub(e.position,n);const i=t.shapes[0],o=e.shapes[0];return Math.pow(i.boundingSphereRadius+o.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const gM=new A;new A;new ve;new A;const vM={keys:[]},xM=[],MM=[];new A;new A;new A;class Qu extends mM{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,o=i.length;let r,a;for(let c=0;c!==o;c++)for(let l=0;l!==c;l++)r=i[c],a=i[l],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const o=t.bodies[i];o.aabbNeedsUpdate&&o.updateAABB(),o.aabb.overlaps(e)&&n.push(o)}return n}}class js{constructor(){this.rayFromWorld=new A,this.rayToWorld=new A,this.hitNormalWorld=new A,this.hitPointWorld=new A,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,o,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=o,this.body=r,this.distance=a}}let $u,td,ed,nd,id,sd,od;const Mc={CLOSEST:1,ANY:2,ALL:4};$u=It.types.SPHERE;td=It.types.PLANE;ed=It.types.BOX;nd=It.types.CYLINDER;id=It.types.CONVEXPOLYHEDRON;sd=It.types.HEIGHTFIELD;od=It.types.TRIMESH;class Ae{get[$u](){return this._intersectSphere}get[td](){return this._intersectPlane}get[ed](){return this._intersectBox}get[nd](){return this._intersectConvex}get[id](){return this._intersectConvex}get[sd](){return this._intersectHeightfield}get[od](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new A),e===void 0&&(e=new A),this.from=t.clone(),this.to=e.clone(),this.direction=new A,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Ae.ANY,this.result=new js,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||Ae.ANY,this.result=e.result||new js,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(gh),wa.length=0,t.broadphase.aabbQuery(t,gh,wa),this.intersectBodies(wa),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=yM,o=wM;for(let r=0,a=t.shapes.length;r<a;r++){const c=t.shapes[r];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],o),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(c,o,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const o=this.from;if(UM(o,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,o){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,o)}_intersectPlane(t,e,n,i,o){const r=this.from,a=this.to,c=this.direction,l=new A(0,0,1);e.vmult(l,l);const h=new A;r.vsub(n,h);const d=h.dot(l);a.vsub(n,h);const u=h.dot(l);if(d*u>0||r.distanceTo(a)<d)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const p=new A,v=new A,g=new A;r.vsub(n,p);const m=-l.dot(p)/f;c.scale(m,v),r.vadd(v,g),this.reportIntersection(l,g,o,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,o=this.from;e.x=Math.min(i.x,o.x),e.y=Math.min(i.y,o.y),e.z=Math.min(i.z,o.z),n.x=Math.max(i.x,o.x),n.y=Math.max(i.y,o.y),n.z=Math.max(i.z,o.z)}_intersectHeightfield(t,e,n,i,o){t.data,t.elementSize;const r=_M;r.from.copy(this.from),r.to.copy(this.to),se.pointToLocalFrame(n,e,r.from,r.from),se.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();const a=SM;let c,l,h,d;c=l=0,h=d=t.data.length-1;const u=new cn;r.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=c;f<h;f++)for(let p=l;p<d;p++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,p,u),!!u.overlapsRay(r)){if(t.getConvexTrianglePillar(f,p,!1),se.pointToWorldFrame(n,e,t.pillarOffset,Uo),this._intersectConvex(t.pillarConvex,e,Uo,i,o,vh),this.result.shouldStop)return;t.getConvexTrianglePillar(f,p,!0),se.pointToWorldFrame(n,e,t.pillarOffset,Uo),this._intersectConvex(t.pillarConvex,e,Uo,i,o,vh)}}}_intersectSphere(t,e,n,i,o){const r=this.from,a=this.to,c=t.radius,l=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,h=2*((a.x-r.x)*(r.x-n.x)+(a.y-r.y)*(r.y-n.y)+(a.z-r.z)*(r.z-n.z)),d=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-c**2,u=h**2-4*l*d,f=bM,p=EM;if(!(u<0))if(u===0)r.lerp(a,u,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,o,i,-1);else{const v=(-h-Math.sqrt(u))/(2*l),g=(-h+Math.sqrt(u))/(2*l);if(v>=0&&v<=1&&(r.lerp(a,v,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,o,i,-1)),this.result.shouldStop)return;g>=0&&g<=1&&(r.lerp(a,g,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,o,i,-1))}}_intersectConvex(t,e,n,i,o,r){const a=TM,c=xh,l=r&&r.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,f=this.direction,p=this.from,v=this.to,g=p.distanceTo(v),m=l?l.length:h.length,x=this.result;for(let M=0;!x.shouldStop&&M<m;M++){const y=l?l[M]:M,w=h[y],S=u[y],b=e,T=n;c.copy(d[w[0]]),b.vmult(c,c),c.vadd(T,c),c.vsub(p,c),b.vmult(S,a);const _=f.dot(a);if(Math.abs(_)<this.precision)continue;const E=a.dot(c)/_;if(!(E<0)){f.scale(E,Qe),Qe.vadd(p,Qe),vn.copy(d[w[0]]),b.vmult(vn,vn),T.vadd(vn,vn);for(let L=1;!x.shouldStop&&L<w.length-1;L++){En.copy(d[w[L]]),Tn.copy(d[w[L+1]]),b.vmult(En,En),b.vmult(Tn,Tn),T.vadd(En,En),T.vadd(Tn,Tn);const P=Qe.distanceTo(p);!(Ae.pointInTriangle(Qe,vn,En,Tn)||Ae.pointInTriangle(Qe,En,vn,Tn))||P>g||this.reportIntersection(a,Qe,o,i,y)}}}}_intersectTrimesh(t,e,n,i,o,r){const a=AM,c=DM,l=NM,h=xh,d=RM,u=CM,f=PM,p=IM,v=LM,g=t.indices;t.vertices;const m=this.from,x=this.to,M=this.direction;l.position.copy(n),l.quaternion.copy(e),se.vectorToLocalFrame(n,e,M,d),se.pointToLocalFrame(n,e,m,u),se.pointToLocalFrame(n,e,x,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,f.vsub(u,d),d.normalize();const y=u.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let w=0,S=c.length;!this.result.shouldStop&&w!==S;w++){const b=c[w];t.getNormal(b,a),t.getVertex(g[b*3],vn),vn.vsub(u,h);const T=d.dot(a),_=a.dot(h)/T;if(_<0)continue;d.scale(_,Qe),Qe.vadd(u,Qe),t.getVertex(g[b*3+1],En),t.getVertex(g[b*3+2],Tn);const E=Qe.distanceSquared(u);!(Ae.pointInTriangle(Qe,En,vn,Tn)||Ae.pointInTriangle(Qe,vn,En,Tn))||E>y||(se.vectorToWorldFrame(e,a,v),se.pointToWorldFrame(n,e,Qe,p),this.reportIntersection(v,p,o,i,b))}c.length=0}reportIntersection(t,e,n,i,o){const r=this.from,a=this.to,c=r.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof o<"u"?o:-1,this.mode){case Ae.ALL:this.hasHit=!0,l.set(r,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case Ae.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c));break;case Ae.ANY:this.hasHit=!0,l.hasHit=!0,l.set(r,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,vi),n.vsub(e,ws),t.vsub(e,_a);const o=vi.dot(vi),r=vi.dot(ws),a=vi.dot(_a),c=ws.dot(ws),l=ws.dot(_a);let h,d;return(h=c*a-r*l)>=0&&(d=o*l-r*a)>=0&&h+d<o*c-r*r}}Ae.CLOSEST=Mc.CLOSEST;Ae.ANY=Mc.ANY;Ae.ALL=Mc.ALL;const gh=new cn,wa=[],ws=new A,_a=new A,yM=new A,wM=new ve,Qe=new A,vn=new A,En=new A,Tn=new A;new A;new js;const vh={faceList:[0]},Uo=new A,_M=new Ae,SM=[],bM=new A,EM=new A,TM=new A;new A;new A;const xh=new A,AM=new A,RM=new A,CM=new A,PM=new A,LM=new A,IM=new A;new cn;const DM=[],NM=new se,vi=new A,Fo=new A;function UM(s,t,e){e.vsub(s,vi);const n=vi.dot(t);return t.scale(n,Fo),Fo.vadd(s,Fo),e.distanceTo(Fo)}class rd{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class Mh{constructor(){this.spatial=new A,this.rotational=new A}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Qs{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Qs.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new Mh,this.jacobianElementB=new Mh,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,o=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*o*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),o=this.computeGq(),r=this.computeGiMf();return-o*t-i*e-r*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.position,r=i.position;return t.spatial.dot(o)+e.spatial.dot(r)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.velocity,r=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(o,a)+e.multiplyVectors(r,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.vlambda,r=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(o,a)+e.multiplyVectors(r,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.force,r=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return o.scale(l,yh),a.scale(h,wh),n.invInertiaWorldSolve.vmult(r,_h),i.invInertiaWorldSolve.vmult(c,Sh),t.multiplyVectors(yh,_h)+e.multiplyVectors(wh,Sh)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.invMassSolve,r=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=o+r;return a.vmult(t.rotational,Oo),l+=Oo.dot(t.rotational),c.vmult(e.rotational,Oo),l+=Oo.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,o=this.bj,r=FM;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),o.vlambda.addScaledVector(o.invMassSolve*t,n.spatial,o.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),o.invInertiaWorldSolve.vmult(n.rotational,r),o.wlambda.addScaledVector(t,r,o.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Qs.idCounter=0;const yh=new A,wh=new A,_h=new A,Sh=new A,Oo=new A,FM=new A;class OM extends Qs{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new A,this.rj=new A,this.ni=new A}computeB(t){const e=this.a,n=this.b,i=this.bi,o=this.bj,r=this.ri,a=this.rj,c=zM,l=BM,h=i.velocity,d=i.angularVelocity;i.force,i.torque;const u=o.velocity,f=o.angularVelocity;o.force,o.torque;const p=kM,v=this.jacobianElementA,g=this.jacobianElementB,m=this.ni;r.cross(m,c),a.cross(m,l),m.negate(v.spatial),c.negate(v.rotational),g.spatial.copy(m),g.rotational.copy(l),p.copy(o.position),p.vadd(a,p),p.vsub(i.position,p),p.vsub(r,p);const x=m.dot(p),M=this.restitution+1,y=M*u.dot(m)-M*h.dot(m)+f.dot(l)-d.dot(c),w=this.computeGiMf();return-x*e-y*n-t*w}getImpactVelocityAlongNormal(){const t=GM,e=HM,n=WM,i=VM,o=XM;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,o),this.ni.dot(o)}}const zM=new A,BM=new A,kM=new A,GM=new A,HM=new A,WM=new A,VM=new A,XM=new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;class bh extends Qs{constructor(t,e,n){super(t,e,-n,n),this.ri=new A,this.rj=new A,this.t=new A}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,o=qM,r=YM,a=this.t;n.cross(a,o),i.cross(a,r);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),o.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(r);const h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}}const qM=new A,YM=new A;class yi{constructor(t,e,n){n=rd.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=yi.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}yi.idCounter=0;class $n{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=$n.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}$n.idCounter=0;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;class jM{constructor(t){t===void 0&&(t={}),t=rd.defaults(t,{chassisConnectionPointLocal:new A,chassisConnectionPointWorld:new A,directionLocal:new A,directionWorld:new A,axleLocal:new A,axleWorld:new A,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:10.5,forwardAcceleration:1,sideAcceleration:1,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,slipInfo:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),this.maxSuspensionTravel=t.maxSuspensionTravel,this.customSlidingRotationalSpeed=t.customSlidingRotationalSpeed,this.useCustomSlidingRotationalSpeed=t.useCustomSlidingRotationalSpeed,this.sliding=!1,this.chassisConnectionPointLocal=t.chassisConnectionPointLocal.clone(),this.chassisConnectionPointWorld=t.chassisConnectionPointWorld.clone(),this.directionLocal=t.directionLocal.clone(),this.directionWorld=t.directionWorld.clone(),this.axleLocal=t.axleLocal.clone(),this.axleWorld=t.axleWorld.clone(),this.suspensionRestLength=t.suspensionRestLength,this.suspensionMaxLength=t.suspensionMaxLength,this.radius=t.radius,this.suspensionStiffness=t.suspensionStiffness,this.dampingCompression=t.dampingCompression,this.dampingRelaxation=t.dampingRelaxation,this.frictionSlip=t.frictionSlip,this.forwardAcceleration=t.forwardAcceleration,this.sideAcceleration=t.sideAcceleration,this.steering=0,this.rotation=0,this.deltaRotation=0,this.rollInfluence=t.rollInfluence,this.maxSuspensionForce=t.maxSuspensionForce,this.engineForce=0,this.brake=0,this.isFrontWheel=t.isFrontWheel,this.clippedInvContactDotSuspension=1,this.suspensionRelativeVelocity=0,this.suspensionForce=0,this.slipInfo=0,this.skidInfo=0,this.suspensionLength=0,this.sideImpulse=0,this.forwardImpulse=0,this.raycastResult=new js,this.worldTransform=new se,this.isInContact=!1}updateWheel(t){const e=this.raycastResult;if(this.isInContact){const n=e.hitNormalWorld.dot(e.directionWorld);e.hitPointWorld.vsub(t.position,Th),t.getVelocityAtWorldPoint(Th,Eh);const i=e.hitNormalWorld.dot(Eh);if(n>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=1/.1;else{const o=-1/n;this.suspensionRelativeVelocity=i*o,this.clippedInvContactDotSuspension=o}}else e.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,e.directionWorld.scale(-1,e.hitNormalWorld),this.clippedInvContactDotSuspension=1}}const Eh=new A,Th=new A;class ZM{constructor(t){this.chassisBody=t.chassisBody,this.wheelInfos=[],this.sliding=!1,this.world=null,this.indexRightAxis=typeof t.indexRightAxis<"u"?t.indexRightAxis:2,this.indexForwardAxis=typeof t.indexForwardAxis<"u"?t.indexForwardAxis:0,this.indexUpAxis=typeof t.indexUpAxis<"u"?t.indexUpAxis:1,this.constraints=[],this.preStepCallback=()=>{},this.currentVehicleSpeedKmHour=0,this.numWheelsOnGround=0}addWheel(t){t===void 0&&(t={});const e=new jM(t),n=this.wheelInfos.length;return this.wheelInfos.push(e),n}setSteeringValue(t,e){const n=this.wheelInfos[e];n.steering=t}applyEngineForce(t,e){this.wheelInfos[e].engineForce=t}setBrake(t,e){this.wheelInfos[e].brake=t}addToWorld(t){t.addBody(this.chassisBody);const e=this;this.preStepCallback=()=>{e.updateVehicle(t.dt)},t.addEventListener("preStep",this.preStepCallback),this.world=t}getVehicleAxisWorld(t,e){e.set(t===0?1:0,t===1?1:0,t===2?1:0),this.chassisBody.vectorToWorldFrame(e,e)}updateVehicle(t){const e=this.wheelInfos,n=e.length,i=this.chassisBody;for(let d=0;d<n;d++)this.updateWheelTransform(d);this.currentVehicleSpeedKmHour=3.6*i.velocity.length();const o=new A;this.getVehicleAxisWorld(this.indexForwardAxis,o),o.dot(i.velocity)<0&&(this.currentVehicleSpeedKmHour*=-1);for(let d=0;d<n;d++)this.castRay(e[d]);this.updateSuspension(t);const r=new A,a=new A;for(let d=0;d<n;d++){const u=e[d];let f=u.suspensionForce;f>u.maxSuspensionForce&&(f=u.maxSuspensionForce),u.raycastResult.hitNormalWorld.scale(f*t,r),u.raycastResult.hitPointWorld.vsub(i.position,a),i.applyImpulse(r,a)}this.updateFriction(t);const c=new A,l=new A,h=new A;for(let d=0;d<n;d++){const u=e[d];i.getVelocityAtWorldPoint(u.chassisConnectionPointWorld,h);let f=1;switch(this.indexUpAxis){case 1:f=-1;break}if(u.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,l);const p=l.dot(u.raycastResult.hitNormalWorld);u.raycastResult.hitNormalWorld.scale(p,c),l.vsub(c,l);const v=l.dot(h);u.deltaRotation=f*v*t/u.radius}(u.sliding||!u.isInContact)&&u.engineForce!==0&&u.useCustomSlidingRotationalSpeed&&(u.deltaRotation=(u.engineForce>0?1:-1)*u.customSlidingRotationalSpeed*t),Math.abs(u.brake)>Math.abs(u.engineForce)&&(u.deltaRotation=0),u.rotation+=u.deltaRotation,u.deltaRotation*=.99}}updateSuspension(t){const n=this.chassisBody.mass,i=this.wheelInfos,o=i.length;for(let r=0;r<o;r++){const a=i[r];if(a.isInContact){let c;const l=a.suspensionRestLength,h=a.suspensionLength,d=l-h;c=a.suspensionStiffness*d*a.clippedInvContactDotSuspension;const u=a.suspensionRelativeVelocity;let f;u<0?f=a.dampingCompression:f=a.dampingRelaxation,c-=f*u,a.suspensionForce=c*n,a.suspensionForce<0&&(a.suspensionForce=0)}else a.suspensionForce=0}}removeFromWorld(t){this.constraints,t.removeBody(this.chassisBody),t.removeEventListener("preStep",this.preStepCallback),this.world=null}castRay(t){const e=$M,n=t1;this.updateWheelTransformWorld(t);const i=this.chassisBody;let o=-1;const r=t.suspensionRestLength+t.radius;t.directionWorld.scale(r,e);const a=t.chassisConnectionPointWorld;a.vadd(e,n);const c=t.raycastResult;c.reset();const l=i.collisionResponse;i.collisionResponse=!1,this.world.rayTest(a,n,c),i.collisionResponse=l;const h=c.body;if(t.raycastResult.groundObject=0,h){o=c.distance,t.raycastResult.hitNormalWorld=c.hitNormalWorld,t.isInContact=!0;const d=c.distance;t.suspensionLength=d-t.radius;const u=t.suspensionRestLength-t.maxSuspensionTravel,f=t.suspensionRestLength+t.maxSuspensionTravel;t.suspensionLength<u&&(t.suspensionLength=u),t.suspensionLength>f&&(t.suspensionLength=f,t.raycastResult.reset());const p=t.raycastResult.hitNormalWorld.dot(t.directionWorld),v=new A;i.getVelocityAtWorldPoint(t.raycastResult.hitPointWorld,v);const g=t.raycastResult.hitNormalWorld.dot(v);if(p>=-.1)t.suspensionRelativeVelocity=0,t.clippedInvContactDotSuspension=1/.1;else{const m=-1/p;t.suspensionRelativeVelocity=g*m,t.clippedInvContactDotSuspension=m}}else t.suspensionLength=t.suspensionRestLength+0*t.maxSuspensionTravel,t.suspensionRelativeVelocity=0,t.directionWorld.scale(-1,t.raycastResult.hitNormalWorld),t.clippedInvContactDotSuspension=1;return o}updateWheelTransformWorld(t){t.isInContact=!1;const e=this.chassisBody;e.pointToWorldFrame(t.chassisConnectionPointLocal,t.chassisConnectionPointWorld),e.vectorToWorldFrame(t.directionLocal,t.directionWorld),e.vectorToWorldFrame(t.axleLocal,t.axleWorld)}updateWheelTransform(t){const e=KM,n=JM,i=QM,o=this.wheelInfos[t];this.updateWheelTransformWorld(o),o.directionLocal.scale(-1,e),n.copy(o.axleLocal),e.cross(n,i),i.normalize(),n.normalize();const r=o.steering,a=new ve;a.setFromAxisAngle(e,r);const c=new ve;c.setFromAxisAngle(n,o.rotation);const l=o.worldTransform.quaternion;this.chassisBody.quaternion.mult(a,l),l.mult(c,l),l.normalize();const h=o.worldTransform.position;h.copy(o.directionWorld),h.scale(o.suspensionLength,h),h.vadd(o.chassisConnectionPointWorld,h)}getWheelTransformWorld(t){return this.wheelInfos[t].worldTransform}updateFriction(t){const e=n1,n=this.wheelInfos,i=n.length,o=this.chassisBody,r=s1,a=i1;this.numWheelsOnGround=0;for(let h=0;h<i;h++){const d=n[h];d.raycastResult.body&&this.numWheelsOnGround++,d.sideImpulse=0,d.forwardImpulse=0,r[h]||(r[h]=new A),a[h]||(a[h]=new A)}for(let h=0;h<i;h++){const d=n[h],u=d.raycastResult.body;if(u){const f=a[h];this.getWheelTransformWorld(h).vectorToWorldFrame(e1[this.indexRightAxis],f);const v=d.raycastResult.hitNormalWorld,g=f.dot(v);v.scale(g,e),f.vsub(e,f),f.normalize(),v.cross(f,r[h]),r[h].normalize(),d.sideImpulse=v1(o,d.raycastResult.hitPointWorld,u,d.raycastResult.hitPointWorld,f),d.sideImpulse*=o1}}const c=1,l=.5;this.sliding=!1;for(let h=0;h<i;h++){const d=n[h],u=d.raycastResult.body;let f=0;if(d.slipInfo=1,u){const v=d.brake?d.brake:0;f=l1(o,u,d.raycastResult.hitPointWorld,r[h],v),f+=d.engineForce*t;const g=v/f;d.slipInfo*=g}if(d.forwardImpulse=0,d.skidInfo=1,u){d.skidInfo=1;const p=d.suspensionForce*t*d.frictionSlip,g=p*p;d.forwardImpulse=f;const m=d.forwardImpulse*l/d.forwardAcceleration,x=d.sideImpulse*c/d.sideAcceleration,M=m*m+x*x;if(d.sliding=!1,M>g){this.sliding=!0,d.sliding=!0;const y=p/Math.sqrt(M);d.skidInfo*=y}}}if(this.sliding)for(let h=0;h<i;h++){const d=n[h];d.sideImpulse!==0&&d.skidInfo<1&&(d.forwardImpulse*=d.skidInfo,d.sideImpulse*=d.skidInfo)}for(let h=0;h<i;h++){const d=n[h],u=new A;if(d.raycastResult.hitPointWorld.vsub(o.position,u),d.forwardImpulse!==0){const f=new A;r[h].scale(d.forwardImpulse,f),o.applyImpulse(f,u)}if(d.sideImpulse!==0){const f=d.raycastResult.body,p=new A;d.raycastResult.hitPointWorld.vsub(f.position,p);const v=new A;a[h].scale(d.sideImpulse,v),o.vectorToLocalFrame(u,u),u["xyz"[this.indexUpAxis]]*=d.rollInfluence,o.vectorToWorldFrame(u,u),o.applyImpulse(v,u),v.scale(-1,v),f.applyImpulse(v,p)}}}}new A;new A;new A;const KM=new A,JM=new A,QM=new A;new Ae;new A;const $M=new A,t1=new A,e1=[new A(1,0,0),new A(0,1,0),new A(0,0,1)],n1=new A,i1=[],s1=[],o1=1,r1=new A,a1=new A,c1=new A;function l1(s,t,e,n,i){let o=0;const r=e,a=r1,c=a1,l=c1;s.getVelocityAtWorldPoint(r,a),t.getVelocityAtWorldPoint(r,c),a.vsub(c,l);const h=n.dot(l),d=Ah(s,e,n),u=Ah(t,e,n),p=1/(d+u);return o=-h*p,i<o&&(o=i),o<-i&&(o=-i),o}const h1=new A,u1=new A,d1=new A,f1=new A;function Ah(s,t,e){const n=h1,i=u1,o=d1,r=f1;return t.vsub(s.position,n),n.cross(e,i),s.invInertiaWorld.vmult(i,r),r.cross(n,o),s.invMass+e.dot(o)}const p1=new A,m1=new A,g1=new A;function v1(s,t,e,n,i){if(i.lengthSquared()>1.1)return 0;const r=p1,a=m1,c=g1;s.getVelocityAtWorldPoint(t,r),e.getVelocityAtWorldPoint(n,a),r.vsub(a,c);const l=i.dot(c),h=1/(s.invMass+e.invMass);return-.2*l*h}new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new A;new cn;new A;new cn;new A;new A;new A;new A;new A;new A;new A;new cn;new A;new se;new cn;class x1{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class M1 extends x1{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,o=this.tolerance*this.tolerance,r=this.equations,a=r.length,c=e.bodies,l=c.length,h=t;let d,u,f,p,v,g;if(a!==0)for(let y=0;y!==l;y++)c[y].updateSolveMassProperties();const m=w1,x=_1,M=y1;m.length=a,x.length=a,M.length=a;for(let y=0;y!==a;y++){const w=r[y];M[y]=0,x[y]=w.computeB(h),m[y]=1/w.computeC()}if(a!==0){for(let S=0;S!==l;S++){const b=c[S],T=b.vlambda,_=b.wlambda;T.set(0,0,0),_.set(0,0,0)}for(n=0;n!==i;n++){p=0;for(let S=0;S!==a;S++){const b=r[S];d=x[S],u=m[S],g=M[S],v=b.computeGWlambda(),f=u*(d-v-b.eps*g),g+f<b.minForce?f=b.minForce-g:g+f>b.maxForce&&(f=b.maxForce-g),M[S]+=f,p+=f>0?f:-f,b.addToWlambda(f)}if(p*p<o)break}for(let S=0;S!==l;S++){const b=c[S],T=b.velocity,_=b.angularVelocity;b.vlambda.vmul(b.linearFactor,b.vlambda),T.vadd(b.vlambda,T),b.wlambda.vmul(b.angularFactor,b.wlambda),_.vadd(b.wlambda,_)}let y=r.length;const w=1/h;for(;y--;)r[y].multiplier=M[y]*w}return n}}const y1=[],w1=[],_1=[];class S1{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class b1 extends S1{constructor(){super(...arguments),this.type=A}constructObject(){return new A}}const me={sphereSphere:It.types.SPHERE,spherePlane:It.types.SPHERE|It.types.PLANE,boxBox:It.types.BOX|It.types.BOX,sphereBox:It.types.SPHERE|It.types.BOX,planeBox:It.types.PLANE|It.types.BOX,convexConvex:It.types.CONVEXPOLYHEDRON,sphereConvex:It.types.SPHERE|It.types.CONVEXPOLYHEDRON,planeConvex:It.types.PLANE|It.types.CONVEXPOLYHEDRON,boxConvex:It.types.BOX|It.types.CONVEXPOLYHEDRON,sphereHeightfield:It.types.SPHERE|It.types.HEIGHTFIELD,boxHeightfield:It.types.BOX|It.types.HEIGHTFIELD,convexHeightfield:It.types.CONVEXPOLYHEDRON|It.types.HEIGHTFIELD,sphereParticle:It.types.PARTICLE|It.types.SPHERE,planeParticle:It.types.PLANE|It.types.PARTICLE,boxParticle:It.types.BOX|It.types.PARTICLE,convexParticle:It.types.PARTICLE|It.types.CONVEXPOLYHEDRON,cylinderCylinder:It.types.CYLINDER,sphereCylinder:It.types.SPHERE|It.types.CYLINDER,planeCylinder:It.types.PLANE|It.types.CYLINDER,boxCylinder:It.types.BOX|It.types.CYLINDER,convexCylinder:It.types.CONVEXPOLYHEDRON|It.types.CYLINDER,heightfieldCylinder:It.types.HEIGHTFIELD|It.types.CYLINDER,particleCylinder:It.types.PARTICLE|It.types.CYLINDER,sphereTrimesh:It.types.SPHERE|It.types.TRIMESH,planeTrimesh:It.types.PLANE|It.types.TRIMESH};class E1{get[me.sphereSphere](){return this.sphereSphere}get[me.spherePlane](){return this.spherePlane}get[me.boxBox](){return this.boxBox}get[me.sphereBox](){return this.sphereBox}get[me.planeBox](){return this.planeBox}get[me.convexConvex](){return this.convexConvex}get[me.sphereConvex](){return this.sphereConvex}get[me.planeConvex](){return this.planeConvex}get[me.boxConvex](){return this.boxConvex}get[me.sphereHeightfield](){return this.sphereHeightfield}get[me.boxHeightfield](){return this.boxHeightfield}get[me.convexHeightfield](){return this.convexHeightfield}get[me.sphereParticle](){return this.sphereParticle}get[me.planeParticle](){return this.planeParticle}get[me.boxParticle](){return this.boxParticle}get[me.convexParticle](){return this.convexParticle}get[me.cylinderCylinder](){return this.convexConvex}get[me.sphereCylinder](){return this.sphereConvex}get[me.planeCylinder](){return this.planeConvex}get[me.boxCylinder](){return this.boxConvex}get[me.convexCylinder](){return this.convexConvex}get[me.heightfieldCylinder](){return this.heightfieldCylinder}get[me.particleCylinder](){return this.particleCylinder}get[me.sphereTrimesh](){return this.sphereTrimesh}get[me.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new b1,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,o,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new OM(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=o||n,a.sj=r||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,o=t.si,r=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=o.material||n.material,d=r.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(l=h.friction*d.friction),l>0){const u=l*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const p=this.frictionEquationPool,v=p.length?p.pop():new bh(n,i,u*f),g=p.length?p.pop():new bh(n,i,u*f);return v.bi=g.bi=n,v.bj=g.bj=i,v.minForce=g.minForce=-u*f,v.maxForce=g.maxForce=u*f,v.ri.copy(t.ri),v.rj.copy(t.rj),g.ri.copy(t.ri),g.rj.copy(t.rj),t.ni.tangents(v.t,g.t),v.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),g.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),v.enabled=g.enabled=t.enabled,e.push(v,g),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];ui.setZero(),Vi.setZero(),Xi.setZero();const o=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==o?(ui.vadd(e.ni,ui),Vi.vadd(e.ri,Vi),Xi.vadd(e.rj,Xi)):(ui.vsub(e.ni,ui),Vi.vadd(e.rj,Vi),Xi.vadd(e.ri,Xi));const r=1/t;Vi.scale(r,n.ri),Xi.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),ui.normalize(),ui.tangents(n.t,i.t)}getContacts(t,e,n,i,o,r,a){this.contactPointPool=o,this.frictionEquationPool=a,this.result=i,this.frictionResult=r;const c=R1,l=C1,h=T1,d=A1;for(let u=0,f=t.length;u!==f;u++){const p=t[u],v=e[u];let g=null;p.material&&v.material&&(g=n.getContactMaterial(p.material,v.material)||null);const m=p.type&Lt.KINEMATIC&&v.type&Lt.STATIC||p.type&Lt.STATIC&&v.type&Lt.KINEMATIC||p.type&Lt.KINEMATIC&&v.type&Lt.KINEMATIC;for(let x=0;x<p.shapes.length;x++){p.quaternion.mult(p.shapeOrientations[x],c),p.quaternion.vmult(p.shapeOffsets[x],h),h.vadd(p.position,h);const M=p.shapes[x];for(let y=0;y<v.shapes.length;y++){v.quaternion.mult(v.shapeOrientations[y],l),v.quaternion.vmult(v.shapeOffsets[y],d),d.vadd(v.position,d);const w=v.shapes[y];if(!(M.collisionFilterMask&w.collisionFilterGroup&&w.collisionFilterMask&M.collisionFilterGroup)||h.distanceTo(d)>M.boundingSphereRadius+w.boundingSphereRadius)continue;let S=null;M.material&&w.material&&(S=n.getContactMaterial(M.material,w.material)||null),this.currentContactMaterial=S||g||n.defaultContactMaterial;const b=M.type|w.type,T=this[b];if(T){let _=!1;M.type<w.type?_=T.call(this,M,w,h,d,c,l,p,v,M,w,m):_=T.call(this,w,M,d,h,l,c,v,p,M,w,m),_&&m&&(n.shapeOverlapKeeper.set(M.id,w.id),n.bodyOverlapKeeper.set(p.id,v.id))}}}}}sphereSphere(t,e,n,i,o,r,a,c,l,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;const u=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(c.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,o,r,a,c,l,h,d){const u=this.createContactEquation(a,c,t,e,l,h);if(u.ni.set(0,0,1),r.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,zo),u.ni.scale(u.ni.dot(zo),Rh),zo.vsub(Rh,u.rj),-zo.dot(u.ni)<=t.radius){if(d)return!0;const f=u.ri,p=u.rj;f.vadd(n,f),f.vsub(a.position,f),p.vadd(i,p),p.vsub(c.position,p),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,o,r,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,o,r,a,c,t,e,d)}sphereBox(t,e,n,i,o,r,a,c,l,h,d){const u=this.v3pool,f=ey;n.vsub(i,Bo),e.getSideNormals(f,r);const p=t.radius;let v=!1;const g=iy,m=sy,x=oy;let M=null,y=0,w=0,S=0,b=null;for(let F=0,V=f.length;F!==V&&v===!1;F++){const G=Q1;G.copy(f[F]);const B=G.length();G.normalize();const q=Bo.dot(G);if(q<B+p&&q>0){const H=$1,X=ty;H.copy(f[(F+1)%3]),X.copy(f[(F+2)%3]);const W=H.length(),et=X.length();H.normalize(),X.normalize();const ut=Bo.dot(H),dt=Bo.dot(X);if(ut<W&&ut>-W&&dt<et&&dt>-et){const it=Math.abs(q-B-p);if((b===null||it<b)&&(b=it,w=ut,S=dt,M=B,g.copy(G),m.copy(H),x.copy(X),y++,d))return!0}}}if(y){v=!0;const F=this.createContactEquation(a,c,t,e,l,h);g.scale(-p,F.ri),F.ni.copy(g),F.ni.negate(F.ni),g.scale(M,g),m.scale(w,m),g.vadd(m,g),x.scale(S,x),g.vadd(x,F.rj),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),F.rj.vadd(i,F.rj),F.rj.vsub(c.position,F.rj),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult)}let T=u.get();const _=ny;for(let F=0;F!==2&&!v;F++)for(let V=0;V!==2&&!v;V++)for(let G=0;G!==2&&!v;G++)if(T.set(0,0,0),F?T.vadd(f[0],T):T.vsub(f[0],T),V?T.vadd(f[1],T):T.vsub(f[1],T),G?T.vadd(f[2],T):T.vsub(f[2],T),i.vadd(T,_),_.vsub(n,_),_.lengthSquared()<p*p){if(d)return!0;v=!0;const B=this.createContactEquation(a,c,t,e,l,h);B.ri.copy(_),B.ri.normalize(),B.ni.copy(B.ri),B.ri.scale(p,B.ri),B.rj.copy(T),B.ri.vadd(n,B.ri),B.ri.vsub(a.position,B.ri),B.rj.vadd(i,B.rj),B.rj.vsub(c.position,B.rj),this.result.push(B),this.createFrictionEquationsFromContact(B,this.frictionResult)}u.release(T),T=null;const E=u.get(),L=u.get(),P=u.get(),U=u.get(),C=u.get(),D=f.length;for(let F=0;F!==D&&!v;F++)for(let V=0;V!==D&&!v;V++)if(F%3!==V%3){f[V].cross(f[F],E),E.normalize(),f[F].vadd(f[V],L),P.copy(n),P.vsub(L,P),P.vsub(i,P);const G=P.dot(E);E.scale(G,U);let B=0;for(;B===F%3||B===V%3;)B++;C.copy(n),C.vsub(U,C),C.vsub(L,C),C.vsub(i,C);const q=Math.abs(G),H=C.length();if(q<f[B].length()&&H<p){if(d)return!0;v=!0;const X=this.createContactEquation(a,c,t,e,l,h);L.vadd(U,X.rj),X.rj.copy(X.rj),C.negate(X.ni),X.ni.normalize(),X.ri.copy(X.rj),X.ri.vadd(i,X.ri),X.ri.vsub(n,X.ri),X.ri.normalize(),X.ri.scale(p,X.ri),X.ri.vadd(n,X.ri),X.ri.vsub(a.position,X.ri),X.rj.vadd(i,X.rj),X.rj.vsub(c.position,X.rj),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult)}}u.release(E,L,P,U,C)}planeBox(t,e,n,i,o,r,a,c,l,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,o,r,a,c,t,e,d)}convexConvex(t,e,n,i,o,r,a,c,l,h,d,u,f){const p=yy;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,o,i,r,p,u,f)){const v=[],g=wy;t.clipAgainstHull(n,o,e,i,r,p,-100,100,v);let m=0;for(let x=0;x!==v.length;x++){if(d)return!0;const M=this.createContactEquation(a,c,t,e,l,h),y=M.ri,w=M.rj;p.negate(M.ni),v[x].normal.negate(g),g.scale(v[x].depth,g),v[x].point.vadd(g,y),w.copy(v[x].point),y.vsub(n,y),w.vsub(i,w),y.vadd(n,y),y.vsub(a.position,y),w.vadd(i,w),w.vsub(c.position,w),this.result.push(M),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(M,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,o,r,a,c,l,h,d){const u=this.v3pool;n.vsub(i,ry);const f=e.faceNormals,p=e.faces,v=e.vertices,g=t.radius;let m=!1;for(let x=0;x!==v.length;x++){const M=v[x],y=hy;r.vmult(M,y),i.vadd(y,y);const w=ly;if(y.vsub(n,w),w.lengthSquared()<g*g){if(d)return!0;m=!0;const S=this.createContactEquation(a,c,t,e,l,h);S.ri.copy(w),S.ri.normalize(),S.ni.copy(S.ri),S.ri.scale(g,S.ri),y.vsub(i,S.rj),S.ri.vadd(n,S.ri),S.ri.vsub(a.position,S.ri),S.rj.vadd(i,S.rj),S.rj.vsub(c.position,S.rj),this.result.push(S),this.createFrictionEquationsFromContact(S,this.frictionResult);return}}for(let x=0,M=p.length;x!==M&&m===!1;x++){const y=f[x],w=p[x],S=uy;r.vmult(y,S);const b=dy;r.vmult(v[w[0]],b),b.vadd(i,b);const T=fy;S.scale(-g,T),n.vadd(T,T);const _=py;T.vsub(b,_);const E=_.dot(S),L=my;if(n.vsub(b,L),E<0&&L.dot(S)>0){const P=[];for(let U=0,C=w.length;U!==C;U++){const D=u.get();r.vmult(v[w[U]],D),i.vadd(D,D),P.push(D)}if(J1(P,S,n)){if(d)return!0;m=!0;const U=this.createContactEquation(a,c,t,e,l,h);S.scale(-g,U.ri),S.negate(U.ni);const C=u.get();S.scale(-E,C);const D=u.get();S.scale(-g,D),n.vsub(i,U.rj),U.rj.vadd(D,U.rj),U.rj.vadd(C,U.rj),U.rj.vadd(i,U.rj),U.rj.vsub(c.position,U.rj),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),u.release(C),u.release(D),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult);for(let F=0,V=P.length;F!==V;F++)u.release(P[F]);return}else for(let U=0;U!==w.length;U++){const C=u.get(),D=u.get();r.vmult(v[w[(U+1)%w.length]],C),r.vmult(v[w[(U+2)%w.length]],D),i.vadd(C,C),i.vadd(D,D);const F=ay;D.vsub(C,F);const V=cy;F.unit(V);const G=u.get(),B=u.get();n.vsub(C,B);const q=B.dot(V);V.scale(q,G),G.vadd(C,G);const H=u.get();if(G.vsub(n,H),q>0&&q*q<F.lengthSquared()&&H.lengthSquared()<g*g){if(d)return!0;const X=this.createContactEquation(a,c,t,e,l,h);G.vsub(i,X.rj),G.vsub(n,X.ni),X.ni.normalize(),X.ni.scale(g,X.ri),X.rj.vadd(i,X.rj),X.rj.vsub(c.position,X.rj),X.ri.vadd(n,X.ri),X.ri.vsub(a.position,X.ri),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult);for(let W=0,et=P.length;W!==et;W++)u.release(P[W]);u.release(C),u.release(D),u.release(G),u.release(H),u.release(B);return}u.release(C),u.release(D),u.release(G),u.release(H),u.release(B)}for(let U=0,C=P.length;U!==C;U++)u.release(P[U])}}}planeConvex(t,e,n,i,o,r,a,c,l,h,d){const u=gy,f=vy;f.set(0,0,1),o.vmult(f,f);let p=0;const v=xy;for(let g=0;g!==e.vertices.length;g++)if(u.copy(e.vertices[g]),r.vmult(u,u),i.vadd(u,u),u.vsub(n,v),f.dot(v)<=0){if(d)return!0;const x=this.createContactEquation(a,c,t,e,l,h),M=My;f.scale(f.dot(v),M),u.vsub(M,M),M.vsub(n,x.ri),x.ni.copy(f),u.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(c.position,x.rj),this.result.push(x),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}boxConvex(t,e,n,i,o,r,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,d)}sphereHeightfield(t,e,n,i,o,r,a,c,l,h,d){const u=e.data,f=t.radius,p=e.elementSize,v=Dy,g=Iy;se.pointToLocalFrame(i,r,n,g);let m=Math.floor((g.x-f)/p)-1,x=Math.ceil((g.x+f)/p)+1,M=Math.floor((g.y-f)/p)-1,y=Math.ceil((g.y+f)/p)+1;if(x<0||y<0||m>u.length||M>u[0].length)return;m<0&&(m=0),x<0&&(x=0),M<0&&(M=0),y<0&&(y=0),m>=u.length&&(m=u.length-1),x>=u.length&&(x=u.length-1),y>=u[0].length&&(y=u[0].length-1),M>=u[0].length&&(M=u[0].length-1);const w=[];e.getRectMinMax(m,M,x,y,w);const S=w[0],b=w[1];if(g.z-f>b||g.z+f<S)return;const T=this.result;for(let _=m;_<x;_++)for(let E=M;E<y;E++){const L=T.length;let P=!1;if(e.getConvexTrianglePillar(_,E,!1),se.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.sphereConvex(t,e.pillarConvex,n,v,o,r,a,c,t,e,d)),d&&P||(e.getConvexTrianglePillar(_,E,!0),se.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(P=this.sphereConvex(t,e.pillarConvex,n,v,o,r,a,c,t,e,d)),d&&P))return!0;if(T.length-L>2)return}}boxHeightfield(t,e,n,i,o,r,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,d)}convexHeightfield(t,e,n,i,o,r,a,c,l,h,d){const u=e.data,f=e.elementSize,p=t.boundingSphereRadius,v=Py,g=Ly,m=Cy;se.pointToLocalFrame(i,r,n,m);let x=Math.floor((m.x-p)/f)-1,M=Math.ceil((m.x+p)/f)+1,y=Math.floor((m.y-p)/f)-1,w=Math.ceil((m.y+p)/f)+1;if(M<0||w<0||x>u.length||y>u[0].length)return;x<0&&(x=0),M<0&&(M=0),y<0&&(y=0),w<0&&(w=0),x>=u.length&&(x=u.length-1),M>=u.length&&(M=u.length-1),w>=u[0].length&&(w=u[0].length-1),y>=u[0].length&&(y=u[0].length-1);const S=[];e.getRectMinMax(x,y,M,w,S);const b=S[0],T=S[1];if(!(m.z-p>T||m.z+p<b))for(let _=x;_<M;_++)for(let E=y;E<w;E++){let L=!1;if(e.getConvexTrianglePillar(_,E,!1),se.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(L=this.convexConvex(t,e.pillarConvex,n,v,o,r,a,c,null,null,d,g,null)),d&&L||(e.getConvexTrianglePillar(_,E,!0),se.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(L=this.convexConvex(t,e.pillarConvex,n,v,o,r,a,c,null,null,d,g,null)),d&&L))return!0}}sphereParticle(t,e,n,i,o,r,a,c,l,h,d){const u=Ey;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;const p=this.createContactEquation(c,a,e,t,l,h);u.normalize(),p.rj.copy(u),p.rj.scale(t.radius,p.rj),p.ni.copy(u),p.ni.negate(p.ni),p.ri.set(0,0,0),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}}planeParticle(t,e,n,i,o,r,a,c,l,h,d){const u=_y;u.set(0,0,1),a.quaternion.vmult(u,u);const f=Sy;if(i.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;const v=this.createContactEquation(c,a,e,t,l,h);v.ni.copy(u),v.ni.negate(v.ni),v.ri.set(0,0,0);const g=by;u.scale(u.dot(i),g),i.vsub(g,g),v.rj.copy(g),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,o,r,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,o,r,a,c,t,e,d)}convexParticle(t,e,n,i,o,r,a,c,l,h,d){let u=-1;const f=Ay,p=Ry;let v=null;const g=Ty;if(g.copy(i),g.vsub(n,g),o.conjugate(Ch),Ch.vmult(g,g),t.pointIsInside(g)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,o),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(o);for(let m=0,x=t.faces.length;m!==x;m++){const M=[t.worldVertices[t.faces[m][0]]],y=t.worldFaceNormals[m];i.vsub(M[0],Ph);const w=-y.dot(Ph);if(v===null||Math.abs(w)<Math.abs(v)){if(d)return!0;v=w,u=m,f.copy(y)}}if(u!==-1){const m=this.createContactEquation(c,a,e,t,l,h);f.scale(v,p),p.vadd(i,p),p.vsub(n,p),m.rj.copy(p),f.negate(m.ni),m.ri.set(0,0,0);const x=m.ri,M=m.rj;x.vadd(i,x),x.vsub(c.position,x),M.vadd(n,M),M.vsub(a.position,M),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,o,r,a,c,l,h,d){return this.convexHeightfield(e,t,i,n,r,o,c,a,l,h,d)}particleCylinder(t,e,n,i,o,r,a,c,l,h,d){return this.convexParticle(e,t,i,n,r,o,c,a,l,h,d)}sphereTrimesh(t,e,n,i,o,r,a,c,l,h,d){const u=O1,f=z1,p=B1,v=k1,g=G1,m=H1,x=q1,M=F1,y=N1,w=Y1;se.pointToLocalFrame(i,r,n,g);const S=t.radius;x.lowerBound.set(g.x-S,g.y-S,g.z-S),x.upperBound.set(g.x+S,g.y+S,g.z+S),e.getTrianglesInAABB(x,w);const b=U1,T=t.radius*t.radius;for(let U=0;U<w.length;U++)for(let C=0;C<3;C++)if(e.getVertex(e.indices[w[U]*3+C],b),b.vsub(g,y),y.lengthSquared()<=T){if(M.copy(b),se.pointToWorldFrame(i,r,M,b),b.vsub(n,y),d)return!0;let D=this.createContactEquation(a,c,t,e,l,h);D.ni.copy(y),D.ni.normalize(),D.ri.copy(D.ni),D.ri.scale(t.radius,D.ri),D.ri.vadd(n,D.ri),D.ri.vsub(a.position,D.ri),D.rj.copy(b),D.rj.vsub(c.position,D.rj),this.result.push(D),this.createFrictionEquationsFromContact(D,this.frictionResult)}for(let U=0;U<w.length;U++)for(let C=0;C<3;C++){e.getVertex(e.indices[w[U]*3+C],u),e.getVertex(e.indices[w[U]*3+(C+1)%3],f),f.vsub(u,p),g.vsub(f,m);const D=m.dot(p);g.vsub(u,m);let F=m.dot(p);if(F>0&&D<0&&(g.vsub(u,m),v.copy(p),v.normalize(),F=m.dot(v),v.scale(F,m),m.vadd(u,m),m.distanceTo(g)<t.radius)){if(d)return!0;const G=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,G.ni),G.ni.normalize(),G.ni.scale(t.radius,G.ri),G.ri.vadd(n,G.ri),G.ri.vsub(a.position,G.ri),se.pointToWorldFrame(i,r,m,m),m.vsub(c.position,G.rj),se.vectorToWorldFrame(r,G.ni,G.ni),se.vectorToWorldFrame(r,G.ri,G.ri),this.result.push(G),this.createFrictionEquationsFromContact(G,this.frictionResult)}}const _=W1,E=V1,L=X1,P=D1;for(let U=0,C=w.length;U!==C;U++){e.getTriangleVertices(w[U],_,E,L),e.getNormal(w[U],P),g.vsub(_,m);let D=m.dot(P);if(P.scale(D,m),g.vsub(m,m),D=m.distanceTo(g),Ae.pointInTriangle(m,_,E,L)&&D<t.radius){if(d)return!0;let F=this.createContactEquation(a,c,t,e,l,h);m.vsub(g,F.ni),F.ni.normalize(),F.ni.scale(t.radius,F.ri),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),se.pointToWorldFrame(i,r,m,m),m.vsub(c.position,F.rj),se.vectorToWorldFrame(r,F.ni,F.ni),se.vectorToWorldFrame(r,F.ri,F.ri),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult)}}w.length=0}planeTrimesh(t,e,n,i,o,r,a,c,l,h,d){const u=new A,f=P1;f.set(0,0,1),o.vmult(f,f);for(let p=0;p<e.vertices.length/3;p++){e.getVertex(p,u);const v=new A;v.copy(u),se.pointToWorldFrame(i,r,v,u);const g=L1;if(u.vsub(n,g),f.dot(g)<=0){if(d)return!0;const x=this.createContactEquation(a,c,t,e,l,h);x.ni.copy(f);const M=I1;f.scale(g.dot(f),M),u.vsub(M,M),x.ri.copy(M),x.ri.vsub(a.position,x.ri),x.rj.copy(u),x.rj.vsub(c.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}}const ui=new A,Vi=new A,Xi=new A,T1=new A,A1=new A,R1=new ve,C1=new ve,P1=new A,L1=new A,I1=new A,D1=new A,N1=new A;new A;const U1=new A,F1=new A,O1=new A,z1=new A,B1=new A,k1=new A,G1=new A,H1=new A,W1=new A,V1=new A,X1=new A,q1=new cn,Y1=[],zo=new A,Rh=new A,j1=new A,Z1=new A,K1=new A;function J1(s,t,e){let n=null;const i=s.length;for(let o=0;o!==i;o++){const r=s[o],a=j1;s[(o+1)%i].vsub(r,a);const c=Z1;a.cross(t,c);const l=K1;e.vsub(r,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Bo=new A,Q1=new A,$1=new A,ty=new A,ey=[new A,new A,new A,new A,new A,new A],ny=new A,iy=new A,sy=new A,oy=new A,ry=new A,ay=new A,cy=new A,ly=new A,hy=new A,uy=new A,dy=new A,fy=new A,py=new A,my=new A;new A;new A;const gy=new A,vy=new A,xy=new A,My=new A,yy=new A,wy=new A,_y=new A,Sy=new A,by=new A,Ey=new A,Ch=new ve,Ty=new A;new A;const Ay=new A,Ph=new A,Ry=new A,Cy=new A,Py=new A,Ly=[0],Iy=new A,Dy=new A;class Lh{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let o=0;for(;n>i[o];)o++;if(n!==i[o]){for(let r=i.length-1;r>=o;r--)i[r+1]=i[r];i[o]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,o=n.length,r=i.length;let a=0;for(let c=0;c<o;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||Ih(t,h)}a=0;for(let c=0;c<r;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||Ih(e,h)}}}function Ih(s,t){s.push((t&4294901760)>>16,t&65535)}const Sa=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`;class Ny{constructor(){this.data={keys:[]}}get(t,e){const n=Sa(t,e);return this.data[n]}set(t,e,n){const i=Sa(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=Sa(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class Uy extends Ju{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new A,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new A,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Qu,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new M1,this.constraints=[],this.narrowphase=new E1(this),this.collisionMatrix=new ph,this.collisionMatrixPrevious=new ph,this.bodyOverlapKeeper=new Lh,this.shapeOverlapKeeper=new Lh,this.contactmaterials=[],this.contactMaterialTable=new Ny,this.defaultMaterial=new $n("default"),this.defaultContactMaterial=new yi(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof js?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Ae.ALL,n.from=t,n.to=e,n.callback=i,ba.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Ae.ANY,n.from=t,n.to=e,n.result=i,ba.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Ae.CLOSEST,n.from=t,n.to=e,n.result=i,ba.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof Lt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let o=0;o!==n.length;o++)n[o].index=o;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let o=0;o<i.length;o++){const r=i[o];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Re.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Re.now();let o=0;for(;this.accumulator>=t&&o<n&&(this.internalStep(t),this.accumulator-=t,o++,!(Re.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,r,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,r,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=ky,i=Gy,o=this.bodies.length,r=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,d=Lt.DYNAMIC;let u=-1/0;const f=this.constraints,p=By;c.length();const v=c.x,g=c.y,m=c.z;let x=0;for(l&&(u=Re.now()),x=0;x!==o;x++){const U=r[x];if(U.type===d){const C=U.force,D=U.mass;C.x+=D*v,C.y+=D*g,C.z+=D*m}}for(let U=0,C=this.subsystems.length;U!==C;U++)this.subsystems[U].update();l&&(u=Re.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Re.now()-u);let M=f.length;for(x=0;x!==M;x++){const U=f[x];if(!U.collideConnected)for(let C=n.length-1;C>=0;C-=1)(U.bodyA===n[C]&&U.bodyB===i[C]||U.bodyB===n[C]&&U.bodyA===i[C])&&(n.splice(C,1),i.splice(C,1))}this.collisionMatrixTick(),l&&(u=Re.now());const y=zy,w=e.length;for(x=0;x!==w;x++)y.push(e[x]);e.length=0;const S=this.frictionEquations.length;for(x=0;x!==S;x++)p.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,y,this.frictionEquations,p),l&&(h.narrowphase=Re.now()-u),l&&(u=Re.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);const b=e.length;for(let U=0;U!==b;U++){const C=e[U],D=C.bi,F=C.bj,V=C.si,G=C.sj;let B;if(D.material&&F.material?B=this.getContactMaterial(D.material,F.material)||this.defaultContactMaterial:B=this.defaultContactMaterial,B.friction,D.material&&F.material&&(D.material.friction>=0&&F.material.friction>=0&&D.material.friction*F.material.friction,D.material.restitution>=0&&F.material.restitution>=0&&(C.restitution=D.material.restitution*F.material.restitution)),a.addEquation(C),D.allowSleep&&D.type===Lt.DYNAMIC&&D.sleepState===Lt.SLEEPING&&F.sleepState===Lt.AWAKE&&F.type!==Lt.STATIC){const q=F.velocity.lengthSquared()+F.angularVelocity.lengthSquared(),H=F.sleepSpeedLimit**2;q>=H*2&&(D.wakeUpAfterNarrowphase=!0)}if(F.allowSleep&&F.type===Lt.DYNAMIC&&F.sleepState===Lt.SLEEPING&&D.sleepState===Lt.AWAKE&&D.type!==Lt.STATIC){const q=D.velocity.lengthSquared()+D.angularVelocity.lengthSquared(),H=D.sleepSpeedLimit**2;q>=H*2&&(F.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(D,F,!0),this.collisionMatrixPrevious.get(D,F)||(_s.body=F,_s.contact=C,D.dispatchEvent(_s),_s.body=D,F.dispatchEvent(_s)),this.bodyOverlapKeeper.set(D.id,F.id),this.shapeOverlapKeeper.set(V.id,G.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Re.now()-u,u=Re.now()),x=0;x!==o;x++){const U=r[x];U.wakeUpAfterNarrowphase&&(U.wakeUp(),U.wakeUpAfterNarrowphase=!1)}for(M=f.length,x=0;x!==M;x++){const U=f[x];U.update();for(let C=0,D=U.equations.length;C!==D;C++){const F=U.equations[C];a.addEquation(F)}}a.solve(t,this),l&&(h.solve=Re.now()-u),a.removeAllEquations();const T=Math.pow;for(x=0;x!==o;x++){const U=r[x];if(U.type&d){const C=T(1-U.linearDamping,t),D=U.velocity;D.scale(C,D);const F=U.angularVelocity;if(F){const V=T(1-U.angularDamping,t);F.scale(V,F)}}}this.dispatchEvent(Oy),l&&(u=Re.now());const E=this.stepnumber%(this.quatNormalizeSkip+1)===0,L=this.quatNormalizeFast;for(x=0;x!==o;x++)r[x].integrate(t,E,L);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Re.now()-u),this.stepnumber+=1,this.dispatchEvent(Fy);let P=!0;if(this.allowSleep)for(P=!1,x=0;x!==o;x++){const U=r[x];U.sleepTick(this.time),U.sleepState!==Lt.SLEEPING&&(P=!0)}this.hasActiveBodies=P}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Fn,On),t){for(let o=0,r=Fn.length;o<r;o+=2)Ss.bodyA=this.getBodyById(Fn[o]),Ss.bodyB=this.getBodyById(Fn[o+1]),this.dispatchEvent(Ss);Ss.bodyA=Ss.bodyB=null}if(e){for(let o=0,r=On.length;o<r;o+=2)bs.bodyA=this.getBodyById(On[o]),bs.bodyB=this.getBodyById(On[o+1]),this.dispatchEvent(bs);bs.bodyA=bs.bodyB=null}Fn.length=On.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Fn,On),n){for(let o=0,r=Fn.length;o<r;o+=2){const a=this.getShapeById(Fn[o]),c=this.getShapeById(Fn[o+1]);zn.shapeA=a,zn.shapeB=c,a&&(zn.bodyA=a.body),c&&(zn.bodyB=c.body),this.dispatchEvent(zn)}zn.bodyA=zn.bodyB=zn.shapeA=zn.shapeB=null}if(i){for(let o=0,r=On.length;o<r;o+=2){const a=this.getShapeById(On[o]),c=this.getShapeById(On[o+1]);Bn.shapeA=a,Bn.shapeB=c,a&&(Bn.bodyA=a.body),c&&(Bn.bodyB=c.body),this.dispatchEvent(Bn)}Bn.bodyA=Bn.bodyB=Bn.shapeA=Bn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new cn;const ba=new Ae,Re=globalThis.performance||{};if(!Re.now){let s=Date.now();Re.timing&&Re.timing.navigationStart&&(s=Re.timing.navigationStart),Re.now=()=>Date.now()-s}new A;const Fy={type:"postStep"},Oy={type:"preStep"},_s={type:Lt.COLLIDE_EVENT_NAME,body:null,contact:null},zy=[],By=[],ky=[],Gy=[],Fn=[],On=[],Ss={type:"beginContact",bodyA:null,bodyB:null},bs={type:"endContact",bodyA:null,bodyB:null},zn={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Bn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};function Hy(){const s=new Uy({gravity:new A(0,-9.82,0)});s.broadphase=new Qu,s.allowSleep=!0,s.defaultContactMaterial.friction=.4;const t=new $n("ground"),e=new $n("wheel"),n=new $n("chassis"),i=new $n("barrier");return s.addContactMaterial(new yi(t,e,{friction:0,restitution:0,contactEquationStiffness:1e3})),s.addContactMaterial(new yi(n,i,{friction:.08,restitution:.04})),s.addContactMaterial(new yi(n,t,{friction:.2,restitution:.05})),{world:s,materials:{groundMat:t,wheelMat:e,chassisMat:n,barrierMat:i}}}function _n(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),o={},r={},a=s[0].morphTargetsRelative,c=new he;let l=0;for(let h=0;h<s.length;++h){const d=s[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const d=[];for(let u=0;u<s.length;++u){const f=s[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=s[u].attributes.position.count}c.setIndex(d)}for(const h in o){const d=Dh(o[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in r){const d=r[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<r[h].length;++v)f.push(r[h][v][u]);const p=Dh(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(p)}}return c}function Dh(s){let t,e,n,i=-1,o=0;for(let l=0;l<s.length;++l){const h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=h.array.length}const r=new t(o);let a=0;for(let l=0;l<s.length;++l)r.set(s[l].array,a),a+=s[l].array.length;const c=new ie(r,e,n);return i!==void 0&&(c.gpuType=i),c}const Wy=600,Vy=14,Xy=2,qy=5.5;function Nh(s,t,e,n){const i=n.roadWidth??Vy,o=n.kerbWidth??Xy,r=n.runoffWidth??qy,a=i/2+r+.5,c=n.theme||{},l={road:i,kerb:o,armco:a},h=new ae;s.add(h);const d=[],u=n.controlPoints.map(([q,H])=>new O(q,0,H)),f=new Gu(u,n.closed!==!1,"catmullrom",n.tension??.5),p=jy(f,Wy),v=ad(p),g=Zy(p),m=new Set,x=Lw(c.ground||"grass"),M=new Z(new ge(4e3,4e3,1,1),x);M.rotation.x=-Math.PI/2,M.position.y=-.02,M.receiveShadow=!0,h.add(M);const y=new Lt({mass:0,material:e.groundMat});y.addShape(new ds(new A(2e3,.5,2e3))),y.position.set(0,-.5,0),t.addBody(y),d.push(y);const w=Jy(p,g),S=nw(),b=Qy(p,i,w,v),T=new Z(b,S);T.position.y=.01,T.receiveShadow=!0,h.add(T),c.skid!==!1&&tw(h,p,g,w);const _=new mt({color:14474454,roughness:.7,metalness:0,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),E=.2,L=i/2-E/2-.05,P=new Z(Hs(p,L,E),_);P.position.y=.016,h.add(P);const U=new Z(Hs(p,-L,E),_);if(U.position.y=.016,h.add(U),c.kerbs!==!1){const q=rw(),H=Ky(g,45e-5,8);for(const X of[1,-1]){const W=new Z($y(p,X*i/2,o,X,H,v),q);W.receiveShadow=!0,W.castShadow=!1,h.add(W)}}if((c.ground||"grass")!=="city"){const q=sw(c.ground||"grass"),H=i/2+o+.7;for(const X of[1,-1]){const W=new Z(Hs(p,X*H,1.6),q);W.position.y=.004,W.receiveShadow=!0,h.add(W)}}c.gravel&&ew(h,p,g,m,l);const C=aw(),D=new mt({map:C,roughness:.6,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),F=new Z(new ge(i,1.6),D);F.rotation.x=-Math.PI/2,F.position.copy(p[0].pos).add(new O(0,.014,0));const V=Math.atan2(p[0].tan.x,p[0].tan.z);F.rotation.z=-V,h.add(F),Sw(h,p[0]),Ew(h,p[0],i),c.barrier==="wall"?Nw(h,p,a):Tw(h,p,a),c.tireStacks&&Rw(h,p,g,a-1.4),c.sponsors&&Cw(h,p,a+1.6),c.pit&&Mw(h,p[0],l),c.catchFence&&yw(h,p,l),c.brakeMarkers&&ww(h,p,g,l),c.trees&&gw(h,p,c.trees),c.sidewalks&&kw(h,p,l),c.buildings&&Ow(h,p,l),c.skyline&&zw(h),c.marina&&Bw(h,p,l),c.streetlights&&Gw(h,p,l),c.crosswalks&&Hw(h,p,g,i),c.mountains&&vw(h,c.mountains),c.grandstands&&xw(h,p,l),c.rocks&&Ww(h,p,l),c.scrub&&Vw(h,p,l),c.farmland&&Xw(h,p,l),c.huts&&qw(h,p,l),c.marshals&&Yw(h,p,g,l),c.clouds!==!1&&_w(h),Pw(t,p,a,e,d),c.fog&&(s.fog=new Rr(c.fog[0],c.fog[1],c.fog[2]));const G={position:new O().copy(p[0].pos).add(p[0].tan.clone().multiplyScalar(-6)).add(new O(0,1,0)),yaw:Math.atan2(p[0].tan.x,p[0].tan.z)};function B(){s.remove(h),Yy(h);for(const q of d)t.removeBody(q)}return{id:n.id,name:n.name,curve:f,frames:p,spawn:G,width:i,kerbWidth:o,armcoOffset:a,racingLineOffset:w,isGravel:q=>m.has(q),length:f.getLength(),dispose:B}}function Yy(s){s.traverse(t=>{t.geometry&&t.geometry.dispose();const e=t.material?Array.isArray(t.material)?t.material:[t.material]:[];for(const n of e){for(const i in n){const o=n[i];o&&o.isTexture&&o.dispose()}n.dispose()}})}function jy(s,t){const e=[];for(let n=0;n<t;n++){const i=n/t,o=s.getPointAt(i),r=s.getTangentAt(i).normalize(),a=new O(-r.z,0,r.x).normalize();e.push({t:i,pos:o,tan:r,left:a})}return e}function ad(s){const t=[0];for(let e=1;e<s.length;e++)t.push(t[e-1]+s[e].pos.distanceTo(s[e-1].pos));return t}function Zy(s){const t=s.length,e=new Array(t).fill(0);for(let i=0;i<t;i++){const o=s[i].tan,r=s[(i+1)%t].tan;e[i]=1-o.dot(r)}const n=new Array(t).fill(0);for(let i=0;i<t;i++){let o=0;for(let r=-3;r<=3;r++)o+=e[(i+r+t)%t];n[i]=o/7}return n}function Ky(s,t,e){const n=s.length,i=new Array(n).fill(!1);for(let r=0;r<n;r++)i[r]=s[r]>t;const o=new Array(n).fill(!1);for(let r=0;r<n;r++)for(let a=-e;a<=e;a++)if(i[(r+a+n)%n]){o[r]=!0;break}return o}function Hs(s,t,e){const n=s.length,i=new Float32Array(n*2*3),o=new Float32Array(n*2*2),r=new Float32Array(n*2*3);for(let l=0;l<n;l++){const h=s[l],d=h.pos.clone().add(h.left.clone().multiplyScalar(t-e/2)),u=h.pos.clone().add(h.left.clone().multiplyScalar(t+e/2));i.set([d.x,d.y,d.z],l*2*3),i.set([u.x,u.y,u.z],(l*2+1)*3),o.set([0,l/n],l*2*2),o.set([1,l/n],(l*2+1)*2),r.set([0,1,0],l*2*3),r.set([0,1,0],(l*2+1)*3)}const a=[];for(let l=0;l<n;l++){const h=l*2,d=l*2+1,u=(l+1)%n*2,f=(l+1)%n*2+1;a.push(h,u,d,d,u,f)}const c=new he;return c.setAttribute("position",new ie(i,3)),c.setAttribute("uv",new ie(o,2)),c.setAttribute("normal",new ie(r,3)),c.setIndex(a),c}function Jy(s,t){const e=s.length,n=new Float32Array(e);for(let o=0;o<e;o++){const r=s[o].tan,a=s[(o+1)%e].tan,c=r.x*a.z-r.z*a.x,l=Math.min(3.2,t[o]*900);n[o]=(c>0?-1:1)*l*(t[o]>8e-4?1:0)}let i=n;for(let o=0;o<3;o++){const r=new Float32Array(e);for(let a=0;a<e;a++){let c=0;for(let l=-6;l<=6;l++)c+=i[(a+l+e)%e];r[a]=c/13}i=r}return i}function Qy(s,t,e,n){const i=s.length,o=11,r=new Float32Array(i*o*3),a=new Float32Array(i*o*2),c=new Float32Array(i*o*3),l=new Float32Array(i*o*3);for(let u=0;u<i;u++){const f=s[u],p=n[u],v=e[u],g=.93+.1*re(p*.013,.37,3);for(let m=0;m<o;m++){const x=m/(o-1),M=(.5-x)*t,y=f.pos.clone().add(f.left.clone().multiplyScalar(M)),w=u*o+m;r.set([y.x,y.y,y.z],w*3),a.set([x,p/4],w*2),c.set([0,1,0],w*3);const S=Math.abs(M-v),b=Math.exp(-((S-.85)**2)/(2*.55*.55))+Math.exp(-((S+.85)**2)/(2*.55*.55)),T=1-.24*Math.min(1,b)-.08*Math.exp(-S*S/4),E=1+Math.max(0,Math.abs(M)/(t/2)-.82)/.18*.1,L=g*T*E;l.set([L,L,L*1.003],w*3)}}const h=[];for(let u=0;u<i;u++){const f=u*o,p=(u+1)%i*o;for(let v=0;v<o-1;v++)h.push(f+v,p+v,f+v+1),h.push(f+v+1,p+v,p+v+1)}const d=new he;return d.setAttribute("position",new ie(r,3)),d.setAttribute("uv",new ie(a,2)),d.setAttribute("normal",new ie(c,3)),d.setAttribute("color",new ie(l,3)),d.setIndex(h),d}function $y(s,t,e,n,i,o){const r=s.length,a=[],c=[],l=[],h=o[r-1]+s[0].pos.distanceTo(s[r-1].pos),d=3;let u=-1,f=!1;for(let v=0;v<=r;v++){const g=v%r,m=s[g];if(i[g]){const x=v===r?h:o[g],M=.5+.5*Math.sin(x*Math.PI*2/1),y=.05+.024*M,w=.014+.01*M,S=(b,T)=>{const _=m.pos.clone().add(m.left.clone().multiplyScalar(t+n*b));a.push(_.x,T,_.z)};if(S(0,.012),S(e*.38,y),S(e,w),c.push(0,x,.45,x,1,x),f){const b=u,T=a.length/3-d;for(let _=0;_<d-1;_++)n>0?l.push(b+_,T+_,b+_+1,b+_+1,T+_,T+_+1):l.push(b+_,b+_+1,T+_,b+_+1,T+_+1,T+_)}u=a.length/3-d,f=!0}else f=!1}const p=new he;return p.setAttribute("position",new ie(new Float32Array(a),3)),p.setAttribute("uv",new ie(new Float32Array(c),2)),p.setIndex(l),p.computeVertexNormals(),p}function tw(s,t,e,n,i){const o=t.length,r=new Ei({color:1447450,transparent:!0,opacity:.3,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),a=[];let c=0;for(;c<o;)if(e[c]>.004){let p=c;for(;p<o&&e[p]>.0016;)p++;a.push([Math.max(0,c-10),Math.min(o-1,p+4)]),c=p+12}else c++;const l=[],h=[];let d=0;for(const[p,v]of a)for(const g of[-.85,.85]){const m=(Math.random()-.5)*.3;for(let x=p;x<=v;x++){const M=t[x],y=n[x]+g+m,w=.16,S=M.pos.clone().add(M.left.clone().multiplyScalar(y+w)),b=M.pos.clone().add(M.left.clone().multiplyScalar(y-w));if(l.push(S.x,.018,S.z,b.x,.018,b.z),x>p){const T=d+(x-p)*2;h.push(T-2,T,T-1,T-1,T,T+1)}}d=l.length/3}if(!l.length)return;const u=new he;u.setAttribute("position",new ie(new Float32Array(l),3)),u.setIndex(h),u.computeVertexNormals();const f=new Z(u,r);f.renderOrder=2,s.add(f)}function ew(s,t,e,n,i){const o=t.length,r=[];let a=0;for(;a<o;)if(e[a]>.0045){let h=a,d=0;for(;h<o&&e[h]>.002;)e[h]>d&&(d=e[h]),h++;h-a>6&&r.push({i0:Math.max(0,a-14),i1:Math.min(o-1,h+8),peak:d}),a=h+10}else a++;r.sort((h,d)=>d.peak-h.peak);const c=r.slice(0,4),l=ow();for(const h of c){const d=Math.floor((h.i0+h.i1)/2),u=t[d].tan,f=t[(d+1)%o].tan,v=u.x*f.z-u.z*f.x>0?1:-1,g=i.road/2+i.kerb+.3,m=i.armco-.6,x=[],M=[],y=[];let w=0;for(let T=h.i0;T<=h.i1;T++){const _=t[T%o];n.add(T%o);const E=_.pos.clone().add(_.left.clone().multiplyScalar(v*g)),L=_.pos.clone().add(_.left.clone().multiplyScalar(v*m));x.push(E.x,.006,E.z,L.x,.006,L.z),M.push(0,T*.5,3,T*.5),T>h.i0&&(v>0?y.push(w-2,w,w-1,w-1,w,w+1):y.push(w-2,w-1,w,w-1,w+1,w)),w+=2}const S=new he;S.setAttribute("position",new ie(new Float32Array(x),3)),S.setAttribute("uv",new ie(new Float32Array(M),2)),S.setIndex(y),S.computeVertexNormals();const b=new Z(S,l);b.receiveShadow=!0,s.add(b)}}function nw(){const s=Vn(1024,(n,i)=>{const o=re(n*28,i*28,5),r=re(n*95+11,i*95+5,2),a=re(n*7+4,i*7+9,3),c=re(n*2.3+17,i*2.3+6,3);let l=.112+o*.078+a*.028+(c-.5)*.045;r>.68&&(l+=.09),r<.16&&(l-=.04);const h=l*.96,d=l*.98,u=l*1.04;return[h,d,u]});s.wrapS=s.wrapT=le,s.repeat.set(3,1),s.anisotropy=16,s.colorSpace=Yt;const t=$s(512,2.4);t.wrapS=t.wrapT=le,t.repeat.set(3,1);const e=Vn(512,(n,i)=>{const o=re(n*6+3,i*6+7,4)*.26+.7,r=re(n*2+8,i*2+2,3)*.08;return[o-r,o-r,o-r]});return e.wrapS=e.wrapT=le,e.repeat.set(3,1),new mt({map:s,vertexColors:!0,normalMap:t,normalScale:new nt(.78,.78),roughnessMap:e,roughness:.86,metalness:0,envMapIntensity:.55,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function iw(){const s=Vn(1024,yc((e,n)=>{const i=re(e*65,n*65,5),o=re(e*5+9,n*5+3,4),r=re(e*11+31,n*11+17,3),a=re(e*3+2,n*3+7,3),c=1+.05*Math.sin(e*Math.PI*8);let l=(.205+i*.15+o*.15+a*.11+r*.05)*c,h=l*(.52+r*.42),d=l*(.35+a*.11);return[h,l,d]}));s.wrapS=s.wrapT=le,s.repeat.set(38,38),s.anisotropy=16,s.colorSpace=Yt;const t=$s(256,.9);return t.wrapS=t.wrapT=le,t.repeat.set(80,80),new mt({map:s,normalMap:t,normalScale:new nt(.45,.45),roughness:.95,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function sw(s="grass"){const t={grass:[.17,.27,.13],alpine:[.14,.24,.14],sand:[.6,.49,.3]}[s]||[.17,.27,.13],e=s==="sand"?[.58,.46,.28]:[.34,.27,.17],n=Vn(512,(i,o)=>{const r=re(i*14,o*60,4),a=re(i*6+4,o*22+8,3),c=Math.min(1,Math.abs(i-.5)*2.6),l=e[0]+r*.16,h=e[1]+r*.13,d=e[2]+r*.08,u=t[0]+a*.12,f=t[1]+a*.16,p=t[2]+a*.07,v=as(.45,1,c);return[l*(1-v)+u*v,h*(1-v)+f*v,d*(1-v)+p*v]});return n.wrapS=n.wrapT=le,n.repeat.set(1,60),n.anisotropy=8,n.colorSpace=Yt,new mt({map:n,roughness:.97,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function ow(){const s=Vn(512,(t,e)=>{const n=re(t*40,e*40,4),i=1+.05*Math.sin(e*Math.PI*50),o=(.62+n*.24)*i;return[o*1.04,o*.96,o*.74]});return s.wrapS=s.wrapT=le,s.anisotropy=8,s.colorSpace=Yt,new mt({map:s,roughness:1,metalness:0,envMapIntensity:.55,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function rw(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d");t.fillStyle="#e02020",t.fillRect(0,0,64,64),t.fillStyle="#f9f9f9",t.fillRect(0,32,64,32);for(let n=0;n<180;n++){const i=Math.random()*64,o=Math.random()*64,r=Math.random()*.06;t.fillStyle=`rgba(0,0,0,${r})`,t.fillRect(i,o,1+Math.random()*2,1+Math.random()*2)}const e=new Ee(s);return e.wrapS=e.wrapT=le,e.repeat.set(1,1),e.colorSpace=Yt,e.generateMipmaps=!0,e.minFilter=ss,e.magFilter=$e,e.anisotropy=8,new mt({map:e,roughness:.48,metalness:0,envMapIntensity:.4,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function aw(){const s=document.createElement("canvas");s.width=256,s.height=32;const t=s.getContext("2d");for(let n=0;n<16;n++)for(let i=0;i<2;i++)t.fillStyle=(n+i)%2===0?"#ffffff":"#000000",t.fillRect(n*16,i*16,16,16);const e=new Ee(s);return e.colorSpace=Yt,e}function cw(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d");e.clearRect(0,0,512,512);const n=[],i=4+Math.floor(Math.random()*2);for(let a=0;a<i;a++){const c=a/i*Math.PI*2+Math.random()*1.4,l=512*(.06+Math.random()*.14);n.push({x:512*.5+Math.cos(c)*l*1.1,y:512*.5+Math.sin(c)*l*.75,r:512*(.12+Math.random()*.09)})}const o=[];for(let a=0;a<260;a++){const c=n[Math.floor(Math.random()*n.length)],l=Math.random()*Math.PI*2,h=Math.pow(Math.random(),.65)*c.r;o.push({x:Math.min(512*.92,Math.max(512*.08,c.x+Math.cos(l)*h*1.05)),y:Math.min(512*.9,Math.max(512*.1,c.y+Math.sin(l)*h*.9)),r:8+Math.random()*24,hue:.29+(Math.random()-.5)*.08})}o.sort((a,c)=>c.y-a.y);for(const a of o){const c=a.y/512,l=Math.pow(1-c*.9,1.4),h=56+l*104,d=16+l*62,u=16+l*22,f=.88+Math.random()*.1,p=e.createRadialGradient(a.x,a.y-a.r*.4,a.r*.06,a.x,a.y,a.r*1.05);p.addColorStop(0,`rgba(${d+28|0},${Math.min(255,h+32|0)},${u+10|0},${f})`),p.addColorStop(.55,`rgba(${d|0},${h|0},${u|0},${f*.9})`),p.addColorStop(.85,`rgba(${d*.55|0},${h*.52|0},${u*.45|0},${f*.5})`),p.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=p,e.beginPath(),e.arc(a.x,a.y,a.r*1.05,0,Math.PI*2),e.fill()}const r=new Ee(t);return r.colorSpace=Yt,r}function lw(){const s=["VELOCE","APEX","NITRO","AERO","TORQUE","VORTEX","RACE1","FLUX"],t=["#e8e8ea","#101418","#c41e1e","#1e40af","#059669","#f5b301","#0891b2","#7c3aed"];return s.map((e,n)=>{const r=document.createElement("canvas");r.width=512,r.height=80;const a=r.getContext("2d");a.fillStyle=t[n%t.length],a.fillRect(0,0,512,80);const c=n%t.length===0||n%t.length===5?"#16181d":"#f4f6f8";a.fillStyle=c,a.beginPath(),a.moveTo(20,60),a.lineTo(50,18),a.lineTo(70,18),a.lineTo(40,60),a.closePath(),a.fill(),a.fillRect(58,18,14,42),a.font="bold 50px Arial Black, Arial",a.textBaseline="middle",a.fillText(e,100,44);const l=new Ee(r);return l.colorSpace=Yt,l.anisotropy=8,l})}function hw(s){const n=document.createElement("canvas");n.width=2048,n.height=64;const i=n.getContext("2d");i.fillStyle="#15181d",i.fillRect(0,0,2048,64);for(const r of[0,1952])for(let a=0;a<6;a++)for(let c=0;c<4;c++)i.fillStyle=(a+c)%2?"#e8e8e8":"#15181d",i.fillRect(r+a*16,c*16,16,16);i.fillStyle="#e8eaee",i.font="bold 40px Arial Black, Arial",i.textAlign="center",i.textBaseline="middle",i.letterSpacing="14px",i.fillText(s,2048/2,64/2+2),i.fillStyle="#c41e1e",i.fillRect(2048/2-460,56,920,4);const o=new Ee(n);return o.colorSpace=Yt,o.anisotropy=8,o}function uw(s){const t=document.createElement("canvas");t.width=256,t.height=192;const e=t.getContext("2d");e.fillStyle="#f2f3f5",e.fillRect(0,0,256,192),e.strokeStyle="#c41e1e",e.lineWidth=14,e.strokeRect(7,7,242,178),e.fillStyle="#c41e1e",e.font="bold 104px Arial Black, Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(s,128,102);const n=new Ee(t);return n.colorSpace=Yt,n.anisotropy=8,n}function dw(){const e=document.createElement("canvas");e.width=512,e.height=96;const n=e.getContext("2d");n.fillStyle="#7e8288",n.fillRect(0,0,512,96);for(let o=0;o<512;o+=64)n.fillStyle=o/64%2?"#787c82":"#83878d",n.fillRect(o,0,64,96),n.fillStyle="rgba(30,32,36,0.45)",n.fillRect(o,0,2,96);for(let o=0;o<90;o++){const r=Math.random()*512;n.fillStyle=`rgba(40,44,48,${.04+Math.random()*.08})`,n.fillRect(r,0,1+Math.random()*3,96)}for(const o of[96*.26,96*.74])n.fillStyle="#565a60",n.fillRect(0,o-4,512,9),n.fillStyle="rgba(255,255,255,0.18)",n.fillRect(0,o-4,512,2),n.fillStyle="rgba(0,0,0,0.35)",n.fillRect(0,o+5,512,2);const i=new Ee(e);return i.colorSpace=Yt,i.anisotropy=8,i}function fw(){const e=document.createElement("canvas");e.width=96,e.height=128;const n=e.getContext("2d"),i=n.createLinearGradient(0,0,96,0);i.addColorStop(0,"#2b2e34"),i.addColorStop(.5,"#565b62"),i.addColorStop(1,"#33363c"),n.fillStyle=i,n.fillRect(0,0,96,128);const o=15;for(let a=1;a<o;a++){const c=Math.round(a*128/o);n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,c-1,96,2),n.fillStyle="rgba(255,255,255,0.16)",n.fillRect(0,c+1,96,1)}n.fillStyle="#2c2e33",n.fillRect(0,110,96,6);const r=new Ee(e);return r.colorSpace=Yt,r.anisotropy=8,r}function pw(){const e=document.createElement("canvas");e.width=512,e.height=256;const n=e.getContext("2d");n.clearRect(0,0,512,256);for(let a=0;a<18;a++){const c=256+(Math.random()-.5)*512*.65,l=256*.72+(Math.random()-.5)*256*.28,h=30+Math.random()*55,d=n.createRadialGradient(c,l,2,c,l,h),u=208+Math.random()*20;d.addColorStop(0,`rgba(${u-12},${u-8},${u+10},0.24)`),d.addColorStop(.6,`rgba(${u-16},${u-12},${u+6},0.11)`),d.addColorStop(1,"rgba(210,218,235,0)"),n.fillStyle=d,n.beginPath(),n.arc(c,l,h,0,Math.PI*2),n.fill()}for(let a=0;a<60;a++){const c=256+(Math.random()-.5)*512*.78,l=256*.5+(Math.random()-.5)*256*.46,h=14+Math.random()*38,d=n.createRadialGradient(c,l-h*.25,h*.05,c,l,h),u=240+Math.random()*15,f=Math.min(255,u+8),p=Math.min(255,u+2);d.addColorStop(0,`rgba(${f},${p},${u-5},0.68)`),d.addColorStop(.55,`rgba(${u},${u},${u+3},0.42)`),d.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=d,n.beginPath(),n.arc(c,l,h,0,Math.PI*2),n.fill()}const i=n.getImageData(0,0,512,256),o=i.data;for(let a=0;a<256;a++){const c=a/255*2-1;for(let l=0;l<512;l++){const h=l/511*2-1,d=Math.hypot(h,c);let u=d<=.45?1:Math.max(0,1-(d-.45)/.55);u=u*u*(3-2*u),o[(a*512+l)*4+3]*=u}}n.putImageData(i,0,0);const r=new Ee(e);return r.colorSpace=Yt,r}function ko(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function as(s,t,e){return e=Math.max(0,Math.min(1,(e-s)/(t-s))),e*e*(3-2*e)}function mw(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,o=t-n,r=ko(e,n),a=ko(e+1,n),c=ko(e,n+1),l=ko(e+1,n+1),h=as(0,1,i),d=as(0,1,o);return(r*(1-h)+a*h)*(1-d)+(c*(1-h)+l*h)*d}function re(s,t,e){let n=.5,i=1,o=0,r=0;for(let a=0;a<e;a++)o+=n*mw(s*i,t*i),r+=n,n*=.5,i*=2;return o/r}function yc(s,t=.15){const e=(i,o,r)=>[i[0]+(o[0]-i[0])*r,i[1]+(o[1]-i[1])*r,i[2]+(o[2]-i[2])*r],n=(i,o)=>{if(i<1-t)return s(i,o);const r=as(0,1,(i-(1-t))/t);return e(s(i,o),s(i-1,o),r)};return(i,o)=>{if(o<1-t)return n(i,o);const r=as(0,1,(o-(1-t))/t);return e(n(i,o),n(i,o-1),r)}}function Vn(s,t){const e=document.createElement("canvas");e.width=s,e.height=s;const n=e.getContext("2d"),i=n.createImageData(s,s);for(let r=0;r<s;r++)for(let a=0;a<s;a++){const[c,l,h]=t(a/s,r/s),d=(r*s+a)*4;i.data[d]=Math.min(255,Math.max(0,c*255)),i.data[d+1]=Math.min(255,Math.max(0,l*255)),i.data[d+2]=Math.min(255,Math.max(0,h*255)),i.data[d+3]=255}n.putImageData(i,0,0);const o=new Ee(e);return o.needsUpdate=!0,o}function $s(s,t){const e=new Float32Array(s*s);for(let a=0;a<s;a++)for(let c=0;c<s;c++)e[a*s+c]=re(c/s*8,a/s*8,4);const n=document.createElement("canvas");n.width=s,n.height=s;const i=n.getContext("2d"),o=i.createImageData(s,s);for(let a=0;a<s;a++)for(let c=0;c<s;c++){const l=e[a*s+(c-1+s)%s],h=e[a*s+(c+1)%s],d=e[(a-1+s)%s*s+c],u=e[(a+1)%s*s+c],f=(h-l)*t,p=(u-d)*t,v=-f,g=-p,m=1,x=Math.hypot(v,g,m),M=(a*s+c)*4;o.data[M]=(v/x*.5+.5)*255,o.data[M+1]=(g/x*.5+.5)*255,o.data[M+2]=(m/x*.5+.5)*255,o.data[M+3]=255}i.putImageData(o,0,0);const r=new Ee(n);return r.needsUpdate=!0,r}function ii(s,t,e){let n=1/0;for(let i=0;i<s.length;i+=2){const o=s[i].pos,r=(o.x-t)*(o.x-t)+(o.z-e)*(o.z-e);r<n&&(n=r)}return Math.sqrt(n)}function gw(s,t,e={}){const n=e.type||"broadleaf",i=e.count||600,o=e.nearMin||(e.band?e.band[0]:35),r=e.band?e.band[1]:800;if(n==="pine"){Uh(s,t,i,o,r);return}const a=new mt({color:4008984,roughness:.96,metalness:0,envMapIntensity:.1}),c=new mt({map:cw(),alphaTest:.38,roughness:.88,metalness:0,side:be,envMapIntensity:.2}),l=new te(.2,.4,3.2,8);l.translate(0,1.6,0);const h=new ge(7.2,7.4);h.translate(0,3.7,0);const d=h.clone();d.rotateY(Math.PI/3);const u=h.clone();u.rotateY(2*Math.PI/3);const f=_n([h,d,u]);f.translate(0,2.4,0);{const T=f.getAttribute("normal"),_=f.getAttribute("position"),E=6.1;for(let L=0;L<_.count;L++){const P=_.getX(L),U=_.getY(L)-E,C=_.getZ(L),D=Math.hypot(P,U,C)||1;T.setXYZ(L,P/D,U/D*.6+.55,C/D)}T.needsUpdate=!0}const p=i,v=new ke(l,a,p),g=new ke(f,c,p);v.castShadow=v.receiveShadow=!0,g.castShadow=!0,wc(g);const m=[],x=Math.max(6,Math.round(i/20));for(let T=0;T<x;T++)m.push({x:(Math.random()*2-1)*r,z:(Math.random()*2-1)*r,r:16+Math.random()*40,size:.75+Math.random()*.5});const M=new jt,y=new Ge,w=new O,S=new Dt;let b=0;for(let T=0;T<p*6&&b<p;T++){let _,E,L=1;if(Math.random()<.78){const D=m[Math.floor(Math.random()*m.length)],F=Math.random()*Math.PI*2,V=(Math.random()+Math.random())*.5*D.r;_=D.x+Math.cos(F)*V,E=D.z+Math.sin(F)*V,L=D.size}else _=(Math.random()*2-1)*r,E=(Math.random()*2-1)*r;if(Math.abs(_)>r||Math.abs(E)>r)continue;const P=new O(_,0,E);let U=1/0;for(let D=0;D<t.length;D+=6){const F=P.distanceToSquared(t[D].pos);F<U&&(U=F)}if(U<o*o)continue;const C=L*(.55+Math.random()*1.05);w.set(C,C*(.85+Math.random()*.5),C),y.setFromEuler(new en(0,Math.random()*Math.PI*2,0)),M.compose(P,y,w),v.setMatrixAt(b,M),g.setMatrixAt(b,M),S.setHSL(.25+(Math.random()-.5)*.1,.4+Math.random()*.2,.34+Math.random()*.18),g.setColorAt(b,S),b++}v.count=b,g.count=b,v.instanceMatrix.needsUpdate=!0,g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),s.add(v),s.add(g),Uh(s,t,Math.round(i*.28),o,r)}function Uh(s,t,e,n,i){const o=new mt({color:4862754,roughness:.95,metalness:0,envMapIntensity:.1}),r=new mt({color:3032359,roughness:.92,metalness:0,envMapIntensity:.12,flatShading:!0}),a=new ts(1.7,3,9);a.translate(0,2.6,0);const c=new ts(1.3,2.6,9);c.translate(0,4.1,0);const l=new ts(.8,2.2,9);l.translate(0,5.6,0);const h=_n([a,c,l]),d=new te(.16,.26,1.8,6);d.translate(0,.9,0);const u=e,f=new ke(d,o,u),p=new ke(h,r,u);f.castShadow=f.receiveShadow=!0,p.castShadow=!0;const v=[],g=Math.max(4,Math.round(e/16));for(let S=0;S<g;S++)v.push({x:(Math.random()*2-1)*i,z:(Math.random()*2-1)*i,r:12+Math.random()*30});const m=new jt,x=new Ge,M=new O,y=new Dt;let w=0;for(let S=0;S<u*7&&w<u;S++){let b,T;if(Math.random()<.8){const U=v[Math.floor(Math.random()*v.length)],C=Math.random()*Math.PI*2,D=(Math.random()+Math.random())*.5*U.r;b=U.x+Math.cos(C)*D,T=U.z+Math.sin(C)*D}else b=(Math.random()*2-1)*i,T=(Math.random()*2-1)*i;if(Math.abs(b)>i||Math.abs(T)>i)continue;const _=new O(b,0,T);let E=1/0;for(let U=0;U<t.length;U+=6){const C=_.distanceToSquared(t[U].pos);C<E&&(E=C)}if(E<n*n)continue;const L=Math.sqrt(E);if(L>110&&Math.random()<(L-110)/Math.max(1,i-110)*.75)continue;const P=.8+Math.random()*1.5;M.set(P*(.7+Math.random()*.3),P,P*(.7+Math.random()*.3)),x.setFromEuler(new en(0,Math.random()*Math.PI*2,0)),m.compose(_,x,M),f.setMatrixAt(w,m),p.setMatrixAt(w,m),y.setHSL(.3+(Math.random()-.5)*.1,.35+Math.random()*.25,.48+Math.random()*.22),p.setColorAt(w,y),w++}f.count=w,p.count=w,f.instanceMatrix.needsUpdate=!0,p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0),s.add(f),s.add(p)}function vw(s,t="far"){const e=new mt({vertexColors:!0,roughness:1,metalness:0,envMapIntensity:.42,fog:!0}),n={far:{haze:12174022,rock:7305348,forest:5464140,snow:14673646,bands:[[1800,650,15,170,220,.22,.3,!0],[2650,750,21,140,180,.5,.32,!0],[3500,900,27,100,140,.76,.26,!1]]},near:{haze:12898520,rock:6581625,forest:4609087,snow:15660024,wMul:.74,relief:1.28,bands:[[780,420,13,340,360,.16,.26,!0],[1450,600,19,270,300,.34,.3,!0],[2500,800,25,190,220,.55,.3,!1]]},mesa:{haze:13809548,rock:10246198,forest:9072712,snow:15325624,bands:[[1100,520,12,190,230,.14,.3,!1],[1950,700,18,150,190,.4,.32,!1],[2950,900,24,120,150,.62,.28,!1]]},hills:{haze:14469538,rock:10129244,forest:6714430,snow:15656655,bands:[[1350,500,11,85,100,.18,.3,!1],[2150,650,16,65,85,.46,.32,!1],[3e3,800,21,50,70,.72,.26,!1]]}},i=n[t]||n.far,o=new Dt(i.haze),r=new Dt(i.rock),a=new Dt(i.forest),c=new Dt(i.snow),l=new Dt,h=i.bands;for(let d=0;d<h.length;d++){const[u,f,p,v,g,m,x,M]=h[d];for(let y=0;y<p;y++){const w=u+Math.random()*f,S=y/p*Math.PI*2+(Math.random()-.5)*(Math.PI/p)*1.6,b=Math.cos(S)*w,T=Math.sin(S)*w,_=v+Math.random()*g,E=(250+Math.random()*300)*(1+d*.13)*(i.wMul||1),L=new ts(E,_,36,20),P=L.getAttribute("position"),U=[],C=d*31.7+y*7.13,D=Math.min(1,Math.max(0,(w-700)/2600)),F=Math.random()*Math.PI*2,V=_*(.1+Math.random()*.22),G=Math.cos(F)*V,B=Math.sin(F)*V;for(let H=0;H<P.count;H++){const X=P.getX(H),W=P.getY(H),et=P.getZ(H),ut=Math.atan2(et,X),dt=(W+_/2)/_,it=re(ut*2.2+C,C*.37,5),ht=1-Math.abs(it*2-1),ft=re(ut*6.5+C*1.7,dt*4+C,4),pt=re(ut*3.4+C*2.3,dt*2+C,3),_t=1-dt*.35,z=(ht*1.02+ft*.58-pt*.42)*(i.relief||1),ct=(.76+z*.52)*_t+.12,K=Math.pow(Math.max(0,Math.min(1,dt)),1.7);P.setX(H,X*ct+G*K),P.setZ(H,et*ct+B*K);const lt=1-as(.78,.97,dt);P.setY(H,W+((ht-.45)*_*.24+(ft-.5)*_*.1)*lt);const tt=.58+(1-ht)*.22+(ft-.5)*.2;M&&dt>tt?l.copy(c).lerp(r,Math.min(.6,Math.max(0,pt-.45)*1.5)):dt<.2?l.copy(a).lerp(r,ft*.5):l.copy(r).lerp(a,Math.max(0,.34-dt)*1.3),l.multiplyScalar(.84+z*.2);const Rt=Math.min(.95,m+D*x);l.lerp(o,Rt),U.push(l.r,l.g,l.b)}L.setAttribute("color",new ee(U,3)),L.computeVertexNormals();const q=new Z(L,e);q.position.set(b,_/2-12,T),q.rotation.y=Math.random()*Math.PI,s.add(q)}}}function xw(s,t,e){const n=new mt({color:10330534,roughness:.78,metalness:.12}),i=new mt({color:3817287,roughness:.5,metalness:.6}),o=new mt({color:11711928,roughness:.6,metalness:.25,side:be}),r=new mt({color:5133146,roughness:.85,metalness:.1}),a=9,c=30,l=.62,h=1,d=[595,245,430],u=e.armco+4.5,f=b=>{const T=t[b],_=T.pos.x-T.left.x*(u+6),E=T.pos.z-T.left.z*(u+6);for(let L=0;L<t.length;L+=2){if(Math.min(Math.abs(L-b),t.length-Math.abs(L-b))<30)continue;const U=t[L].pos;if((U.x-_)*(U.x-_)+(U.z-E)*(U.z-E)<30*30)return!1}return!0},p=[];for(const b of d)for(const T of[0,8,-8,16,-16,24,-24,36,-36,48,-48,64,-64]){const _=(b+T+t.length)%t.length;if(f(_)){p.push(_);break}}const v=new Mt(.34,.5,.3),g=a*44,m=new ke(v,new mt({roughness:.9,metalness:0}),g*d.length),x=new jt,M=new Ge,y=new O(1,1,1),w=new Dt;let S=0;for(const b of p){const T=t[b],_=T.pos.clone().add(T.left.clone().multiplyScalar(-u)),E=Math.atan2(T.left.x,T.left.z),L=new ae;for(let V=0;V<a;V++){const G=new Z(new Mt(c,l,h),n);G.position.set(0,1.2+V*l+l/2,-V*h),G.castShadow=G.receiveShadow=!0,L.add(G)}const P=new Z(new Mt(c,1.2,a*h+1),n);P.position.set(0,.6,-9/2+.5),P.castShadow=P.receiveShadow=!0,L.add(P);const U=1.2+a*l+1.9,C=new Z(new Mt(c,U,.3),r);C.position.set(0,U/2+.5,-8.5*h-.3),C.castShadow=!0,L.add(C);for(const V of[-1,1]){const G=new Z(new Mt(.3,1.2+a*l,a*h+1),r);G.position.set(V*(c/2+.15),(1.2+a*l)/2,-9/2+.5),L.add(G)}const D=new Z(new Mt(c+1.5,.25,a*h+3),o);D.position.set(0,1.2+a*l+1.9,-9/2+1.2),D.rotation.x=.1,D.castShadow=!0,L.add(D);const F=new Z(new Mt(c+1.5,.7,.22),i);F.position.set(0,1.2+a*l+1.9-.85,-9/2+1.2+(a*h+3)/2-.1),F.castShadow=!0,L.add(F);for(const V of[-c/2+2,-c/6,c/6,c/2-2]){const G=new Z(new Mt(.5,a*l+2.4,.5),i);G.position.set(V,(a*l+2.4)/2+1.2,-8*h),G.castShadow=!0,L.add(G)}L.position.copy(_),L.rotation.y=E,s.add(L),M.setFromEuler(new en(0,E,0));for(let V=0;V<a;V++)for(let G=0;G<44;G++){if(Math.random()<.28)continue;const B=(G/43-.5)*(c-2),q=1.2+V*l+l+.25,H=-V*h+(Math.random()-.5)*.2,X=new O(B,q,H).applyQuaternion(M).add(_);x.compose(X,M,y),m.setMatrixAt(S,x),w.setHSL(Math.random(),.3+Math.random()*.3,.35+Math.random()*.22),m.setColorAt(S,w),S++}}m.count=S,m.instanceMatrix.needsUpdate=!0,m.instanceColor&&(m.instanceColor.needsUpdate=!0),m.castShadow=!1,s.add(m)}function Mw(s,t,e){const n=new ae,i=Math.max(0,(e?.armco??13)+1.6-14.6),o=new mt({color:10198432,roughness:.85,metalness:.05}),r=new mt({color:8750987,roughness:.9,metalness:.05}),a=new fn({color:2832711,roughness:.15,metalness:.8,envMapIntensity:1.2}),c=new mt({color:2303531,roughness:.6,metalness:.4}),l=-45,h=100,d=h-l,u=(l+h)/2,f=new Z(new ge(11.5,d+10),r);f.rotation.x=-Math.PI/2,f.position.set(-20.5,.012,u),f.receiveShadow=!0,n.add(f);const p=new Z(new Mt(.4,1,d),o);p.position.set(-14.6,.5,u),p.castShadow=p.receiveShadow=!0,n.add(p);const v=new Z(new Mt(10,7.6,d),o);v.position.set(-31.5,3.8,u),v.castShadow=v.receiveShadow=!0,n.add(v);const g=new mt({map:fw(),roughness:.78,metalness:.15}),m=new Mt(.22,3.4,.22),x=12;for(let b=0;b<x;b++){const T=l+8+b*((d-16)/(x-1)),_=new Z(new ge(4.4,3.1),g);_.position.set(-26.46,1.65,T),_.rotation.y=Math.PI/2,_.receiveShadow=!0,n.add(_);const E=new Z(new Mt(.2,.42,5),c);E.position.set(-26.4,3.42,T),E.castShadow=!0,n.add(E);const L=new Z(new Mt(.24,.12,5),r);L.position.set(-26.38,.07,T),n.add(L);for(const P of[-2.4,2.4]){const U=new Z(m,c);U.position.set(-26.4,1.7,T+P),U.castShadow=!0,n.add(U)}}const M=new Z(new Mt(.25,1.9,d-6),a);M.position.set(-26.35,5.6,u),n.add(M);for(let b=l+6;b<=h-6;b+=6){const T=new Z(new Mt(.3,1.9,.16),c);T.position.set(-26.33,5.6,b),n.add(T)}const y=new Z(new Mt(11,.3,d+2),c);y.position.set(-31.5,7.75,u),y.castShadow=!0,n.add(y);for(let b=l;b<=h;b+=4){const T=new Z(new Mt(.08,.9,.08),c);T.position.set(-26.6,8.3,b),n.add(T)}const w=new Z(new Mt(.1,.08,d),c);w.position.set(-26.6,8.72,u),n.add(w);for(const b of[-20,20,60]){const T=new Z(new Mt(6,2.6,9),o);T.position.set(-32.5,9.2,b),T.castShadow=!0,n.add(T);const _=new Z(new Mt(.2,1.2,8),a);_.position.set(-29.45,9.4,b),n.add(_)}const S=new Z(new ge(d-10,1.15),new mt({map:hw("RACER GRAND PRIX"),roughness:.55,metalness:0}));if(S.position.set(-26.28,7.1,u),S.rotation.y=Math.PI/2,n.add(S),i>0)for(const b of n.children)b.position.x-=i;n.position.copy(t.pos),n.rotation.y=Math.atan2(t.tan.x,t.tan.z),s.add(n)}function yw(s,t,e){const n=new mt({color:4146249,roughness:.55,metalness:.75}),i=new mt({color:2369323,roughness:.8,metalness:.3,transparent:!0,opacity:.22,side:be,depthWrite:!1}),o=ad(t),r=o[t.length-1]+t[0].pos.distanceTo(t[t.length-1].pos),a=[];for(let g=0;g<t.length;g++)(o[g]<135||o[g]>r-55)&&a.push(g);if(!a.length)return;const c=[];let l=[a[0]];for(let g=1;g<a.length;g++)a[g]===a[g-1]+1?l.push(a[g]):(c.push(l),l=[a[g]]);if(c.push(l),c.length>1){const g=c[0],m=c[c.length-1];g[0]===0&&m[m.length-1]===t.length-1&&(c[0]=m.concat(g),c.pop())}const h=new Mt(.14,3.1,.14),d=new ke(h,n,a.length*2);d.castShadow=!0;const u=new jt,f=new Ge,p=new O(1,1,1);let v=0;for(const g of[1,-1])for(const m of c){const x=[],M=[],y=[];let w=0;for(let T=0;T<m.length;T++){const _=t[m[T]],E=_.pos.clone().add(_.left.clone().multiplyScalar(g*(e.armco+.45)));T%2===0&&(f.setFromEuler(new en(0,Math.atan2(_.tan.x,_.tan.z),0)),u.compose(new O(E.x,1.55,E.z),f,p),d.setMatrixAt(v++,u)),x.push(E.x,.85,E.z,E.x,3.05,E.z);const L=-g*_.left.x,P=-g*_.left.z;M.push(L,0,P,L,0,P),T>0&&y.push(w-2,w,w-1,w-1,w,w+1),w+=2}const S=new he;S.setAttribute("position",new ie(new Float32Array(x),3)),S.setAttribute("normal",new ie(new Float32Array(M),3)),S.setIndex(y);const b=new Z(S,i);wc(b),s.add(b)}d.count=v,d.instanceMatrix.needsUpdate=!0,s.add(d)}function ww(s,t,e,n){const i=t.length,o=[];let r=0;for(;r<i;)if(e[r]>.0045){let h=r,d=0;for(;h<i&&e[h]>.002;)d=Math.max(d,e[h]),h++;h-r>6&&o.push({i0:r,peak:d}),r=h+10}else r++;o.sort((h,d)=>d.peak-h.peak);const a=new mt({color:5922403,roughness:.7,metalness:.4}),c=new mt({color:13224909,roughness:.75,metalness:0}),l=new ge(1.15,.85);for(const h of o.slice(0,3)){const d=t[h.i0].tan,u=t[(h.i0+4)%i].tan,p=d.x*u.z-d.z*u.x>0?1:-1;for(const v of[100,50]){const g=Math.round(v/3.2),m=(h.i0-g+i)%i,x=t[m],M=x.pos.clone().add(x.left.clone().multiplyScalar(p*(n.armco-1.6))),y=Math.atan2(x.tan.x,x.tan.z),w=new Z(l,new mt({map:uw(String(v)),roughness:.5,metalness:0}));w.position.set(M.x,1.5,M.z),w.rotation.y=y,w.castShadow=!0,s.add(w);const S=new Z(l,c);S.position.set(M.x-Math.sin(y)*.02,1.5,M.z-Math.cos(y)*.02),S.rotation.y=y+Math.PI,s.add(S);const b=new Z(new Mt(.08,1.1,.08),a);b.position.set(M.x,.55,M.z),s.add(b)}}}function wc(s){const t=s.geometry;s.onBeforeRender=(e,n)=>{n.overrideMaterial&&t.setDrawRange(0,0)},s.onAfterRender=(e,n)=>{n.overrideMaterial&&t.setDrawRange(0,1/0)}}function _w(s){const t=pw(),e=new ge(1,1);for(let n=0;n<16;n++){const i=new Ei({map:t,transparent:!0,opacity:.22+Math.random()*.22,fog:!1,depthWrite:!1,side:be}),o=new Z(e,i),r=Math.random()*Math.PI*2,a=1e3+Math.random()*1800;o.position.set(Math.cos(r)*a,580+Math.random()*360,Math.sin(r)*a);const c=420+Math.random()*500,l=c*(.28+Math.random()*.14);o.scale.set(c,l,1),o.lookAt(0,o.position.y*.5,0),wc(o),s.add(o)}}function Sw(s,t){const e=Math.atan2(t.tan.x,t.tan.z),n=t.tan.clone().normalize(),i=t.left.clone().normalize(),o=2,r=4.6,a=7,c=2.5,l=4,h=new mt({color:16777215,roughness:.7,metalness:0,transparent:!0,opacity:.7,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),d=new mt({color:16767050,roughness:.7,metalness:0,transparent:!0,opacity:.85,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(let u=0;u<l;u++)for(const f of[1,-1]){const p=-2.8-u*a,v=c*f,g=t.pos.clone().add(n.clone().multiplyScalar(p)).add(i.clone().multiplyScalar(v)),m=bw(o,r,.14,h);m.position.set(g.x,.0135,g.z),m.rotation.y=-e,s.add(m);const x=new Z(new ge(o-.4,.22),d);x.rotation.x=-Math.PI/2;const M=g.clone().add(n.clone().multiplyScalar(r/2-.4));x.position.set(M.x,.014,M.z),x.rotation.z=-e,s.add(x)}}function bw(s,t,e,n){const i=new ae;for(const o of[-1,1]){const r=new Z(new ge(s,e),n);r.rotation.x=-Math.PI/2,r.position.z=o*(t/2-e/2),i.add(r)}for(const o of[-1,1]){const r=new Z(new ge(e,t),n);r.rotation.x=-Math.PI/2,r.position.x=o*(s/2-e/2),i.add(r)}return i}function Ew(s,t,e){const n=Math.atan2(t.tan.x,t.tan.z),i=t.pos.clone().add(t.tan.clone().multiplyScalar(8)),o=new ae,r=new mt({color:9343897,roughness:.4,metalness:.85}),a=new mt({color:2303531,roughness:.55,metalness:.6}),c=8.6,l=e/2+2.6,h=l*2;for(const m of[-1,1]){for(const x of[-.35,.35])for(const M of[-.35,.35]){const y=new Z(new Mt(.12,c,.12),r);y.position.set(m*l+x,c/2,M),y.castShadow=!0,o.add(y)}for(let x=1;x<c-.5;x+=1.4){const M=new Z(new Mt(.08,1.1,.08),r);M.position.set(m*l,x,.35),M.rotation.z=.62,o.add(M);const y=M.clone();y.rotation.z=-.62,y.position.z=-.35,o.add(y)}}for(const m of[-.4,.4])for(const x of[-.4,.4]){const M=new Z(new Mt(h+1,.12,.12),r);M.position.set(0,c+m,x),M.castShadow=!0,o.add(M)}const d=12;for(let m=0;m<d;m++){const x=-h/2+(m+.5)*(h/d);for(const M of[-.4,.4]){const y=new Z(new Mt(.07,1.05,.07),r);y.position.set(x,c,M),y.rotation.z=(m%2?1:-1)*.75,o.add(y)}}const u=(()=>{const m=document.createElement("canvas");m.width=512,m.height=64;const x=m.getContext("2d");x.fillStyle="#101317",x.fillRect(0,0,512,64);for(let y=0;y<32;y++)for(let w=0;w<2;w++)(y+w)%2!==0&&(x.fillStyle="#e8e8e8",x.fillRect(y*16,w*16,16,16));x.fillStyle="#e8eaee",x.font="bold 26px Arial Black, Arial",x.textAlign="center",x.fillText("RACER GRAND PRIX",256,54);const M=new Ee(m);return M.colorSpace=Yt,M})(),f=new Z(new ge(h-2,1.1),new mt({map:u,side:be,roughness:.6}));f.position.set(0,c-1,0),o.add(f);const p=new Z(new Mt(2.3,.7,.4),a);p.position.set(0,c-2,0),p.castShadow=!0,o.add(p);const v=new mt({color:3148043,emissive:16720688,emissiveIntensity:1.4,roughness:.35});for(let m=0;m<5;m++){const x=new Z(new te(.13,.13,.1,14),v);x.rotation.x=Math.PI/2,x.position.set(-.88+m*.44,c-2,.22),o.add(x)}const g=new Z(new Mt(.14,1.6,.14),a);g.position.set(0,c-1.2,0),o.add(g),o.position.copy(i),o.rotation.y=n,s.add(o)}function Tw(s,t,e){const n=new mt({color:6844020,roughness:.58,metalness:.45,side:be}),i=new mt({color:5659746,roughness:.7,metalness:.5});for(const p of[1,-1]){const v=new Z(Aw(t,e*p),n);v.castShadow=!0,s.add(v)}const o=5,r=Math.floor(t.length/o)*2,a=new Mt(.22,.85,.16),c=new ke(a,i,r);c.castShadow=!0,c.receiveShadow=!0;let l=0;const h=new jt,d=new Ge,u=new O(1,1,1),f=new O(0,1,0);for(let p=0;p<t.length;p+=o){const v=t[p],g=Math.atan2(v.tan.x,v.tan.z);d.setFromAxisAngle(f,g);for(const m of[1,-1]){const x=v.pos.clone().add(v.left.clone().multiplyScalar(e*m));x.y=.425,h.compose(x,d,u),c.setMatrixAt(l++,h)}}c.count=l,c.instanceMatrix.needsUpdate=!0,s.add(c)}function Aw(s,t){const e=s.length,n=[],i=[],o=[],r=[],a=.45,c=.76,l=t>0?-1:1;for(let d=0;d<e;d++){const u=s[d],f=u.pos.clone().add(u.left.clone().multiplyScalar(t));n.push(f.x,a,f.z),n.push(f.x,c,f.z),o.push(0,d/8,1,d/8);const p=u.left.x*l,v=u.left.z*l;i.push(p,0,v,p,0,v)}for(let d=0;d<e;d++){const u=d*2,f=d*2+1,p=(d+1)%e*2,v=(d+1)%e*2+1;r.push(u,p,f,f,p,v)}const h=new he;return h.setAttribute("position",new ie(new Float32Array(n),3)),h.setAttribute("uv",new ie(new Float32Array(o),2)),h.setAttribute("normal",new ie(new Float32Array(i),3)),h.setIndex(r),h}function Rw(s,t,e,n){const i=new mt({color:1052688,roughness:.95,metalness:0}),o=new te(.42,.42,.32,14);o.rotateX(Math.PI/2);const r=[];let a=0,c=-50;for(let M=0;M<t.length;M++){if(M>0&&(a+=t[M].pos.distanceTo(t[M-1].pos)),e[M]<.0055||a-c<30)continue;const y=t[(M-1+t.length)%t.length].tan,w=t[(M+1)%t.length].tan,b=y.x*w.z-y.z*w.x>0?-1:1;r.push({frameIdx:M,sign:b}),c=a}const l=6,h=3,d=.86,u=r.length*l*h;if(u===0)return;const f=new ke(o,i,u);f.castShadow=!0,f.receiveShadow=!0;const p=new jt,v=new Ge,g=new O(1,1,1),m=new O(0,1,0);let x=0;for(const M of r){const y=t[M.frameIdx],w=Math.atan2(y.tan.x,y.tan.z);v.setFromAxisAngle(m,w);const S=y.pos.clone().add(y.left.clone().multiplyScalar(M.sign*n));for(let b=0;b<l;b++){const T=(b-(l-1)/2)*d,_=S.clone().add(y.tan.clone().multiplyScalar(T));for(let E=0;E<h;E++){const L=new O(_.x,.21+E*.34,_.z);p.compose(L,v,g),f.setMatrixAt(x++,p)}}}f.count=x,f.instanceMatrix.needsUpdate=!0,s.add(f)}function Cw(s,t,e){const i=lw().map(u=>new mt({map:u,roughness:.5,metalness:.1})),o=new mt({map:dw(),roughness:.78,metalness:.25}),r=new mt({color:4869716,roughness:.7,metalness:.4}),a=new Mt(8,1.2,.16),c=new Mt(8.4,1.6,.12),l=new Mt(.24,2.1,.24),d=Math.floor(t.length/22);for(let u=0;u<t.length;u+=d){if(Math.random()<.35)continue;const f=t[u],p=Math.random()<.5?1:-1,v=f.pos.clone().add(f.left.clone().multiplyScalar(p*e)),g=Math.atan2(f.tan.x,f.tan.z),m=i[Math.floor(Math.random()*i.length)],x=new Z(a,m);x.position.set(v.x,1.45,v.z),x.rotation.y=g,x.castShadow=!0,x.receiveShadow=!0,s.add(x);const M=new Z(c,o);M.position.set(v.x,1.45,v.z),M.rotation.y=g,M.translateZ(-.05),M.castShadow=!0,s.add(M);for(const y of[-3.7,3.7]){const w=new Z(l,r),S=new O(f.tan.x*y,0,f.tan.z*y);w.position.set(v.x+S.x,.9,v.z+S.z),w.rotation.y=g,w.castShadow=!0,s.add(w)}}}function Pw(s,t,e,n,i){const o=n.barrierMat,r=2,a=.6,c=1.9,l=.7,h=t.length,d=new ve,u=new A(0,1,0);for(const f of[1,-1]){const p=(e+a-.25)*f;for(let v=0;v<h;v+=r){const g=t[v],m=t[(v+r)%h],x=g.pos.x+g.left.x*p,M=g.pos.z+g.left.z*p,y=m.pos.x+m.left.x*p,w=m.pos.z+m.left.z*p,S=y-x,b=w-M,T=Math.hypot(S,b),_=new Lt({mass:0,material:o});_.addShape(new ds(new A(a,c,T/2+l))),_.position.set((x+y)/2,c-.3,(M+w)/2),d.setFromAxisAngle(u,Math.atan2(S,b)),_.quaternion.copy(d),s.addBody(_),i&&i.push(_)}}}function Lw(s){if(s==="city")return Iw();if(s==="sand")return Dw();const t=iw();return s==="alpine"&&(t.color=new Dt(11453606)),t}function Iw(){const s=Vn(1024,yc((e,n)=>{const i=re(e*30,n*30,4),o=re(e*5+2,n*5+9,3),r=re(e*2+7,n*2+1,3),a=.315+i*.07+o*.06-r*.06;return[a*.99,a,a*1.03]}));s.wrapS=s.wrapT=le,s.repeat.set(60,60),s.anisotropy=8,s.colorSpace=Yt;const t=$s(256,1.1);return t.wrapS=t.wrapT=le,t.repeat.set(120,120),new mt({map:s,normalMap:t,normalScale:new nt(.3,.3),roughness:.9,metalness:0,envMapIntensity:.4,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function Dw(){const s=Vn(1024,yc((e,n)=>{const i=re(e*40,n*40,4),o=re(e*3+5,n*3+2,3),r=.5+.5*Math.sin(n*Math.PI*58+o*6);let a=.52+i*.1+o*.1;return a*=.97+.05*r,[a*1.08,a*.93,a*.66]}));s.wrapS=s.wrapT=le,s.repeat.set(50,50),s.anisotropy=8,s.colorSpace=Yt;const t=$s(256,1);return t.wrapS=t.wrapT=le,t.repeat.set(90,90),new mt({map:s,normalMap:t,normalScale:new nt(.4,.4),roughness:.98,metalness:0,envMapIntensity:.35,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function Nw(s,t,e){const n=new mt({color:14211282,roughness:.85,metalness:.02,side:be,envMapIntensity:.3}),i=new mt({color:12591146,roughness:.6,metalness:0,side:be});for(const o of[1,-1]){const r=new Z(Fh(t,e*o,0,1.05),n);r.castShadow=!0,r.receiveShadow=!0,s.add(r);const a=new Z(Fh(t,e*o,1.02,1.2),i);s.add(a)}}function Fh(s,t,e,n){const i=s.length,o=[],r=[],a=[],c=[],l=t>0?-1:1;for(let d=0;d<i;d++){const u=s[d],f=u.pos.clone().add(u.left.clone().multiplyScalar(t));o.push(f.x,e,f.z,f.x,n,f.z),a.push(0,d/8,1,d/8);const p=u.left.x*l,v=u.left.z*l;r.push(p,0,v,p,0,v)}for(let d=0;d<i;d++){const u=d*2,f=d*2+1,p=(d+1)%i*2,v=(d+1)%i*2+1;c.push(u,p,f,f,p,v)}const h=new he;return h.setAttribute("position",new ie(new Float32Array(o),3)),h.setAttribute("uv",new ie(new Float32Array(a),2)),h.setAttribute("normal",new ie(new Float32Array(r),3)),h.setIndex(c),h}function Uw(s,t,e=.1){const o=document.createElement("canvas");o.width=128,o.height=256;const r=o.getContext("2d");if(r.fillStyle=t,r.fillRect(0,0,128,256),s==="glass"){for(let c=0;c<8;c++){const l=c*16,h=r.createLinearGradient(l,0,l+13,256);h.addColorStop(0,"#9db4c6"),h.addColorStop(.45,"#6e8496"),h.addColorStop(.55,"#b9cbd8"),h.addColorStop(1,"#556878"),r.fillStyle=h,r.fillRect(l+2,0,12,256)}r.fillStyle="rgba(20,26,32,0.5)";for(let c=0;c<8;c++)r.fillRect(0,c*32,128,2)}else{const c=21.333333333333332,l=256/8;for(let h=0;h<8;h++){for(let d=0;d<6;d++){const u=Math.random();let f;u<e?f=`rgb(255,${208+Math.random()*35|0},${150+Math.random()*55|0})`:u<e+.3?f=`rgb(${88+Math.random()*34|0},${108+Math.random()*36|0},${132+Math.random()*44|0})`:f=`rgb(${18+Math.random()*10|0},${22+Math.random()*10|0},${28+Math.random()*10|0})`,r.fillStyle=f,s==="masonry"?(r.fillRect(d*c+c*.2,h*l+l*.22,c*.6,l*.52),r.fillStyle="rgba(255,255,255,0.16)",r.fillRect(d*c+c*.16,h*l+l*.76,c*.68,2)):r.fillRect(d*c+c*.12,h*l+l*.14,c*.76,l*.64)}s==="masonry"&&(r.fillStyle="rgba(0,0,0,0.22)",r.fillRect(0,h*l,128,2))}}for(let c=0;c<40;c++){const l=Math.random()*128;r.fillStyle=`rgba(10,12,14,${.02+Math.random()*.05})`,r.fillRect(l,0,1+Math.random()*2,256)}const a=new Ee(o);return a.colorSpace=Yt,a.wrapS=a.wrapT=le,a.anisotropy=8,a}function Fw(){const e=document.createElement("canvas");e.width=256,e.height=64;const n=e.getContext("2d");n.fillStyle="#3a3d42",n.fillRect(0,0,256,64);const i=["#8e3232","#2f5d43","#31517a","#8a6a2c","#54406e"];let o=0;for(;o<248;){const a=34+Math.random()*30|0;n.fillStyle="#1d2830",n.fillRect(o+3,16,a-6,42),n.fillStyle="rgba(150,180,200,0.25)",n.fillRect(o+5,18,(a-10)*.4,38),n.fillStyle="#11181d",n.fillRect(o+a*.62,20,10,38),n.fillStyle=i[Math.random()*i.length|0],n.fillRect(o+1,6,a-2,9),n.fillStyle="rgba(255,255,255,0.35)",n.fillRect(o+4,8,a*.4,3),o+=a}n.fillStyle="rgba(0,0,0,0.4)",n.fillRect(0,60,256,4);const r=new Ee(e);return r.colorSpace=Yt,r.wrapS=r.wrapT=le,r.anisotropy=8,r}function _r(s,t,e,n,i,o){for(let r=0;r<s.length;r+=2){const a=s[r].pos;if(Math.abs(a.x-t)<n+o&&Math.abs(a.z-e)<i+o)return!1}return!0}function Ow(s,t,e){const i=new Set,o=(x,M,y,w)=>{const S=[];for(let b=Math.floor((x-y)/6);b<=Math.floor((x+y)/6);b++)for(let T=Math.floor((M-w)/6);T<=Math.floor((M+w)/6);T++)S.push(b+":"+T);return S},r=[["curtain","#262b33",.14],["curtain","#2d3038",.12],["curtain","#23282e",.16],["masonry","#8f8371",.06],["masonry","#96705a",.06],["masonry","#7f7f7c",.07],["glass","#5b6f80",0],["glass","#4e6273",0]].map(([x,M,y])=>{const w=Uw(x,M,y);return x==="glass"?new mt({map:w,roughness:.24,metalness:.7,envMapIntensity:1}):new mt({map:w,emissive:16770756,emissiveMap:w,emissiveIntensity:.13,roughness:.62,metalness:.12,envMapIntensity:.5})}),a=Fw(),c=new mt({map:a,emissive:14214896,emissiveMap:a,emissiveIntensity:.1,roughness:.6,metalness:.15,envMapIntensity:.5}),l=new mt({color:2369324,roughness:.8,metalness:.25}),h=r.map(()=>[]),d=[],u=[];let f=-1/0;for(const x of t)f=Math.max(f,x.pos.x);f+=e.armco+2;const p=(x,M,y,w,S,b,T,_=1,E=1)=>{const L=new Mt(M,y,w);if(_!==1||E!==1){const P=L.getAttribute("uv");for(let U=0;U<P.count;U++)P.setXY(U,P.getX(U)*_,P.getY(U)*E)}L.translate(S,b,T),x.push(L)},v=t.length,g=5;for(let x=0;x<v;x+=g){const M=t[x];for(const y of[1,-1])for(const w of[0,1]){if(Math.random()<.18)continue;const S=6*(2+(Math.random()*3|0)),b=6*(2+(Math.random()*3|0)),T=e.armco+3.6+b/2+w*(30+Math.random()*14);let _=M.pos.x+M.left.x*y*T,E=M.pos.z+M.left.z*y*T;_=Math.round(_/6)*6,E=Math.round(E/6)*6;const L=S/2,P=b/2;if(_+L>f||!_r(t,_,E,L,P,e.armco+2.6))continue;const U=o(_,E,L+2,P+2);if(U.some(W=>i.has(W)))continue;U.forEach(W=>i.add(W));const C=Math.random()*r.length|0,D=w===0?16+Math.random()*46:22+Math.random()*60,F=Math.random()<.7;let V=0;if(F){const W=Math.random()<.5?4.5:9;p(d,S,W,b,_,W/2,E,Math.max(1,Math.round(S/12)),Math.max(1,Math.round(W/4.5))),p(u,S+.5,.4,b+.5,_,W+.2,E),V=W+.4}const G=F?Math.max(9,S-3.5):S,B=F?Math.max(9,b-3.5):b,q=D;p(h[C],G,q,B,_,V+q/2,E,Math.max(1,Math.round(G/13)),Math.max(1,Math.round(q/24)));const H=V+q;p(u,G+.5,.6,B+.5,_,H+.3,E);const X=Math.random()*3|0;for(let W=0;W<X;W++)p(u,1.6,1,1.2,_+(Math.random()-.5)*(G-3),H+1.1,E+(Math.random()-.5)*(B-3));Math.random()<.22&&p(u,.22,4+Math.random()*5,.22,_,H+2.5,E)}}const m=(x,M)=>{if(!x.length)return;const y=_n(x),w=new Z(y,M);w.castShadow=!0,w.receiveShadow=!0,s.add(w);for(const S of x)S.dispose()};h.forEach((x,M)=>m(x,r[M])),m(d,c),m(u,l)}function zw(s,t){const e=new Dt(12041412),n=new Dt,i=[[780,340,26,55,150,.28],[1180,420,30,85,210,.46],[1650,500,34,110,250,.62]],o=[];for(const[a,c,l,h,d,u]of i)for(let f=0;f<l;f++){const p=f/l*Math.PI*2+(Math.random()-.5)*.18;if(Math.cos(p)>.35)continue;const v=a+Math.random()*c,g=Math.cos(p)*v,m=Math.sin(p)*v,x=1+(Math.random()*3|0);for(let M=0;M<x;M++){const y=26+Math.random()*48,w=26+Math.random()*48,S=h+Math.random()*d,b=g+(Math.random()-.5)*90,T=m+(Math.random()-.5)*90,_=new Mt(y,S,w);_.translate(b,S/2,T),n.setHSL(.58+(Math.random()-.5)*.04,.1+Math.random()*.08,.15+Math.random()*.07),n.lerp(e,u);const E=_.getAttribute("position").count,L=new Float32Array(E*3);for(let P=0;P<E;P++)L[P*3]=n.r,L[P*3+1]=n.g,L[P*3+2]=n.b;_.setAttribute("color",new ie(L,3)),o.push(_)}}if(!o.length)return;const r=new Z(_n(o),new mt({vertexColors:!0,roughness:.95,metalness:0,envMapIntensity:.14,fog:!0}));for(const a of o)a.dispose();s.add(r)}function Bw(s,t,e){let n=-1/0;for(const B of t)n=Math.max(n,B.pos.x);const i=n+e.armco+9;let o=1/0,r=-1/0;for(const B of t)B.pos.x>n-40&&(o=Math.min(o,B.pos.z),r=Math.max(r,B.pos.z));o-=60,r+=60;const a=$s(256,.55);a.wrapS=a.wrapT=le,a.repeat.set(160,160);const c=new Z(new ge(3800,4200),new mt({color:1325132,roughness:.16,metalness:.1,normalMap:a,normalScale:new nt(.35,.35),envMapIntensity:1.2}));c.rotation.x=-Math.PI/2,c.position.set(i+1900,0,(o+r)/2),c.receiveShadow=!0,s.add(c);const l=new Z(new ge(i-(n+e.armco)+2,r-o),new mt({color:11117722,roughness:.9,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}));l.rotation.x=-Math.PI/2,l.position.set((n+e.armco+i)/2+1,.02,(o+r)/2),l.receiveShadow=!0,s.add(l);const h=new mt({color:9276032,roughness:.9}),d=new Z(new Mt(1,.5,r-o),h);d.position.set(i,.25,(o+r)/2),d.castShadow=d.receiveShadow=!0,s.add(d);const u=new mt({color:3948614,roughness:.5,metalness:.6}),f=new Mt(.08,1,.08),p=Math.floor((r-o)/4),v=new ke(f,u,p),g=new jt;for(let B=0;B<p;B++)g.makeTranslation(i-.6,.95,o+2+B*4),v.setMatrixAt(B,g);v.instanceMatrix.needsUpdate=!0,s.add(v);const m=new Z(new Mt(.1,.07,r-o),u);m.position.set(i-.6,1.45,(o+r)/2),s.add(m);const x=Math.max(6,Math.floor((r-o)/17)),M=new te(.11,.18,4.8,6);M.translate(0,2.4,0);const y=new ge(.55,2.8,1,4);{const B=y.getAttribute("position");for(let q=0;q<B.count;q++){const H=(B.getY(q)+1.4)/2.8;B.setZ(q,-Math.pow(H,1.7)*1.3),B.setX(q,B.getX(q)*(1-H*.55))}}const w=[];for(let B=0;B<8;B++){const q=y.clone();q.rotateX(-Math.PI/2+.45),q.rotateY(B/8*Math.PI*2+.2),q.translate(0,4.8,0),w.push(q)}const S=_n(w),b=new mt({color:9071434,roughness:.95}),T=new mt({color:4286511,roughness:.9,side:be}),_=new ke(M,b,x),E=new ke(S,T,x);_.castShadow=E.castShadow=!0;const L=new Ge,P=new O;for(let B=0;B<x;B++){const q=o+10+B*((r-o-20)/(x-1))+(Math.random()-.5)*3,H=i-3.6+(Math.random()-.5)*1.2,X=.85+Math.random()*.4;L.setFromEuler(new en(0,Math.random()*Math.PI*2,(Math.random()-.5)*.08)),P.set(X,X,X),g.compose(new O(H,0,q),L,P),_.setMatrixAt(B,g),E.setMatrixAt(B,g)}_.instanceMatrix.needsUpdate=!0,E.instanceMatrix.needsUpdate=!0,s.add(_),s.add(E);const U=new mt({color:15263456,roughness:.35,metalness:.1}),C=new mt({color:5461853,roughness:.5,metalness:.5}),D=[],F=[],V=9;for(let B=0;B<V;B++){const q=i+10+Math.random()*45,H=o+20+(B+Math.random()*.6)*((r-o-40)/V),X=(Math.random()-.5)*.5+(Math.random()<.5?0:Math.PI),W=.8+Math.random()*.7,et=new Mt(2.2*W,.9*W,6.5*W);{const ht=et.getAttribute("position");for(let ft=0;ft<ht.count;ft++){const pt=Math.max(0,ht.getZ(ft)/(3.25*W)-.35);ht.setX(ft,ht.getX(ft)*(1-pt*.75))}}const ut=new Mt(1.5*W,.7*W,2.2*W);ut.translate(0,.8*W,-.8*W);const dt=_n([et,ut]),it=new jt().makeRotationY(X);if(dt.applyMatrix4(it),dt.translate(q,.42*W,H),D.push(dt),Math.random()<.55){const ht=new te(.04,.05,6*W,6);ht.translate(0,3.4*W,-.4*W),ht.applyMatrix4(it),ht.translate(q,0,H),F.push(ht)}}const G=new Z(_n(D),U);if(G.castShadow=!0,s.add(G),F.length){const B=new Z(_n(F),C);s.add(B)}}function kw(s,t,e){const n=Vn(256,(r,a)=>{const c=re(r*22,a*90,3),l=a*34%1<.06?-.1:0,h=.42+c*.1+l;return[h,h*.99,h*.96]});n.wrapS=n.wrapT=le,n.repeat.set(1,200);const i=new mt({map:n,roughness:.92,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),o=new mt({color:3816768,roughness:.9,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2});for(const r of[1,-1]){const a=new Z(Hs(t,r*(e.armco+2.1),3.4),i);a.position.y=.02,a.receiveShadow=!0,s.add(a);const c=new Z(Hs(t,r*(e.armco+.28),.35),o);c.position.y=.022,s.add(c)}}function Gw(s,t,e){const n=(()=>{const g=new te(.07,.1,6.6,7);g.translate(0,3.3,0);const m=new Mt(.09,.09,2.1);return m.translate(0,6.5,1),_n([g,m])})(),i=new Mt(.5,.14,.24);i.translate(0,6.44,2);const o=new mt({color:4409165,roughness:.55,metalness:.6}),r=new mt({color:3158575,emissive:16767392,emissiveIntensity:1.4,roughness:.4}),a=t.length,c=11,l=Math.ceil(a/c),h=new ke(n,o,l),d=new ke(i,r,l);h.castShadow=!0;const u=new jt,f=new Ge,p=new O(1,1,1);let v=0;for(let g=0,m=0;g<a;g+=c,m++){const x=t[g],M=m%2?1:-1,y=x.pos.x+x.left.x*M*(e.armco+2.9),w=x.pos.z+x.left.z*M*(e.armco+2.9);if(ii(t,y,w)<e.armco+1.6)continue;const S=Math.atan2(-M*x.left.x,-M*x.left.z);f.setFromEuler(new en(0,S,0)),u.compose(new O(y,0,w),f,p),h.setMatrixAt(v,u),d.setMatrixAt(v,u),v++}h.count=d.count=v,h.instanceMatrix.needsUpdate=!0,d.instanceMatrix.needsUpdate=!0,s.add(h),s.add(d)}function Hw(s,t,e,n){const i=(()=>{const l=document.createElement("canvas");l.width=256,l.height=64;const h=l.getContext("2d");h.clearRect(0,0,256,64);for(let u=8;u<248;u+=26)h.fillStyle="rgba(235,235,230,0.92)",h.fillRect(u,4,15,56);const d=new Ee(l);return d.colorSpace=Yt,d})(),o=new mt({map:i,transparent:!0,alphaTest:.3,roughness:.7,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}),r=t.length;let a=0,c=0;for(let l=0;l<r&&a<5;l++){if(c>0){c--;continue}if(e[l]>.005&&e[(l-1+r)%r]<=.005){const h=(l-12+r)%r;if(e[h]>.0014){c=30;continue}const d=t[h],u=new Z(new ge(n-1.4,3),o);u.rotation.x=-Math.PI/2,u.position.set(d.pos.x,.018,d.pos.z),u.rotation.z=-Math.atan2(d.tan.x,d.tan.z),s.add(u),a++,c=40}}}function Ww(s,t,e){const n=new Lr(1,0).toNonIndexed(),i=n.getAttribute("position");for(let m=0;m<i.count;m++){const x=(re(i.getX(m)*1.7+3,i.getZ(m)*1.7+1,3)-.5)*.7;i.setXYZ(m,i.getX(m)*(1+x),i.getY(m)*(1+x*.6),i.getZ(m)*(1+x))}n.computeVertexNormals();const o=new mt({roughness:.96,metalness:0,flatShading:!0,envMapIntensity:.3}),r=150,a=new ke(n,o,r);a.castShadow=!0,a.receiveShadow=!0;const c=new jt,l=new Ge,h=new O,d=new en,u=new Dt,f=440;let p=0;for(let m=0;m<r*5&&p<r;m++){const x=(Math.random()*2-1)*f,M=(Math.random()*2-1)*f,y=1+Math.random()*4.5,w=ii(t,x,M);if(w<e.armco+4+y*1.7||w>120&&Math.random()<(w-120)/(f-120)*.6)continue;const S=new O(x,0,M);h.set(y*(.8+Math.random()*.6),y*(.5+Math.random()*.7),y*(.8+Math.random()*.6)),d.set((Math.random()-.5)*.5,Math.random()*Math.PI*2,(Math.random()-.5)*.5),l.setFromEuler(d),S.y=-.3*y,c.compose(S,l,h),a.setMatrixAt(p,c),u.setHSL(.045+Math.random()*.03,.45+Math.random()*.18,.3+Math.random()*.12),a.setColorAt(p,u),p++}a.count=p,a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),s.add(a);const v=new mt({vertexColors:!0,roughness:.97,metalness:0,envMapIntensity:.3}),g=[new Dt(9062956),new Dt(11101754),new Dt(12618325)];for(let m=0;m<7;m++){const x=60+Math.random()*90,M=26+Math.random()*30;let y=0,w=0,S=!1;for(let P=0;P<50&&!S;P++){const U=Math.random()*Math.PI*2,C=250+Math.random()*280;y=Math.cos(U)*C,w=Math.sin(U)*C,ii(t,y,w)>M*1.7+e.armco+12&&(S=!0)}if(!S)continue;const b=new te(M,M*1.5,x,18,6),T=b.getAttribute("position"),_=[],E=new Dt;for(let P=0;P<T.count;P++){const U=(T.getY(P)+x/2)/x,C=Math.atan2(T.getZ(P),T.getX(P)),D=.9+re(C*2.5+m,U*3,3)*.22;T.setX(P,T.getX(P)*D),T.setZ(P,T.getZ(P)*D);const F=Math.max(0,Math.min(g.length-1,Math.floor(U*g.length+re(C*4,U*6,2)*.6))),V=g[F];E.copy(V).multiplyScalar(.85+U*.2);const G=.9+.11*Math.sin(U*30+re(C*3,U*9,2)*4);E.multiplyScalar(G),_.push(E.r,E.g,E.b)}b.setAttribute("color",new ee(_,3)),b.computeVertexNormals();const L=new Z(b,v);L.position.set(y,x/2-4,w),L.castShadow=!0,L.receiveShadow=!0,s.add(L)}}function Vw(s,t,e){const n=new Lr(1,1);n.scale(1,.55,1);const i=new mt({roughness:1,metalness:0,flatShading:!0,envMapIntensity:.25}),o=260,r=new ke(n,i,o);r.castShadow=!0,r.receiveShadow=!0;const a=new jt,c=new Ge,l=new O,h=new Dt,d=420;let u=0;for(let S=0;S<o*5&&u<o;S++){const b=(Math.random()*2-1)*d,T=(Math.random()*2-1)*d,_=ii(t,b,T);if(_<e.armco+4||_>150&&Math.random()<(_-150)/(d-150)*.6)continue;const E=.5+Math.random()*1.3;l.set(E*(.8+Math.random()*.5),E,E*(.8+Math.random()*.5)),c.setFromEuler(new en(0,Math.random()*Math.PI*2,0)),a.compose(new O(b,E*.3,T),c,l),r.setMatrixAt(u,a),h.setHSL(.13+Math.random()*.09,.28+Math.random()*.22,.26+Math.random()*.14),r.setColorAt(u,h),u++}r.count=u,r.instanceMatrix.needsUpdate=!0,r.instanceColor&&(r.instanceColor.needsUpdate=!0),s.add(r);const f=new te(.26,.32,4.6,7);f.translate(0,2.3,0);const p=new te(.16,.18,1.7,6);p.translate(0,.85,0),p.rotateZ(.5),p.translate(-.55,1.7,0);const v=new te(.16,.16,1.3,6);v.translate(-.98,3.1,0);const g=new te(.15,.17,1.4,6);g.translate(0,.7,0),g.rotateZ(-.55),g.translate(.5,2.4,0);const m=new te(.15,.15,1.1,6);m.translate(.92,3.6,0);const x=_n([f,p,v,g,m]),M=new mt({roughness:.85,metalness:0,envMapIntensity:.25}),y=46,w=new ke(x,M,y);w.castShadow=!0,u=0;for(let S=0;S<y*6&&u<y;S++){const b=(Math.random()*2-1)*d,T=(Math.random()*2-1)*d,_=ii(t,b,T);if(_<e.armco+8||_>380)continue;const E=.7+Math.random()*.9;l.set(E,E*(.85+Math.random()*.4),E),c.setFromEuler(new en(0,Math.random()*Math.PI*2,0)),a.compose(new O(b,0,T),c,l),w.setMatrixAt(u,a),h.setHSL(.28+Math.random()*.05,.22+Math.random()*.15,.3+Math.random()*.1),w.setColorAt(u,h),u++}w.count=u,w.instanceMatrix.needsUpdate=!0,w.instanceColor&&(w.instanceColor.needsUpdate=!0),s.add(w)}function Xw(s,t,e){const i=[{tint:[.72,.58,.28],rows:34},{tint:[.3,.42,.18],rows:26},{tint:[.38,.3,.2],rows:40}].map(({tint:x,rows:M})=>{const y=Vn(256,(w,S)=>{const b=.88+.16*Math.sin(S*Math.PI*M),T=re(w*9+3,S*9+7,3);return[x[0]*b*(.85+T*.3),x[1]*b*(.85+T*.3),x[2]*b*(.85+T*.3)]});return y.wrapS=y.wrapT=le,y.anisotropy=8,y.colorSpace=Yt,new mt({map:y,roughness:.98,metalness:0,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}),o=[];for(let x=0;x<140&&o.length<18;x++){const M=55+Math.random()*110,y=45+Math.random()*100,w=Math.round((Math.random()*2-1)*680/10)*10,S=Math.round((Math.random()*2-1)*680/10)*10;if(!_r(t,w,S,M/2,y/2,e.armco+6)||o.some(_=>Math.abs(_.px-w)<(_.w+M)/2-8&&Math.abs(_.pz-S)<(_.d+y)/2-8))continue;o.push({px:w,pz:S,w:M,d:y});const b=i[Math.random()*i.length|0],T=new Z(new ge(M,y),b);T.rotation.x=-Math.PI/2,Math.random()<.5&&(T.rotation.z=Math.PI/2),T.position.set(w,.004,S),T.receiveShadow=!0,s.add(T)}const r=new mt({color:9318180,roughness:.8}),a=new mt({color:5001044,roughness:.6,metalness:.3}),c=new mt({color:12106942,roughness:.45,metalness:.5});let l=0;for(const x of o){if(l>=3)break;if(ii(t,x.px,x.pz)<90)continue;const M=x.px+x.w/2-12,y=x.pz+x.d/2-10;if(!_r(t,M,y,8,6,e.armco+6))continue;const w=new ae,S=new Z(new Mt(9,4.2,6),r);S.position.y=2.1,S.castShadow=S.receiveShadow=!0,w.add(S);for(const _ of[1,-1]){const E=new Z(new Mt(9.6,.18,3.8),a);E.position.set(0,5.15,_*1.62),E.rotation.x=_*.55,E.castShadow=!0,w.add(E)}const b=new Z(new te(1.7,1.7,7,12),c);b.position.set(6.6,3.5,-1),b.castShadow=!0,w.add(b);const T=new Z(new Ys(1.7,12,6,0,Math.PI*2,0,Math.PI/2),c);T.position.set(6.6,7,-1),w.add(T),w.position.set(M,0,y),w.rotation.y=(Math.random()<.5?0:Math.PI/2)+(Math.random()-.5)*.1,s.add(w),l++}const h=new te(.75,.75,1.3,10);h.rotateZ(Math.PI/2);const d=new mt({color:13216092,roughness:.95}),u=60,f=new ke(h,d,u);f.castShadow=f.receiveShadow=!0;const p=new jt,v=new Ge,g=new O(1,1,1);let m=0;for(let x=0;x<u*4&&m<u&&o.length;x++){const M=o[Math.random()*o.length|0],y=M.px+(Math.random()-.5)*(M.w-10),w=M.pz+(Math.random()-.5)*(M.d-10);ii(t,y,w)<e.armco+8||(v.setFromEuler(new en(0,Math.random()*Math.PI,0)),p.compose(new O(y,.75,w),v,g),f.setMatrixAt(m,p),m++)}f.count=m,f.instanceMatrix.needsUpdate=!0,s.add(f)}function qw(s,t,e){const n=new mt({color:7032627,roughness:.9}),i=new mt({color:4143155,roughness:.8}),o=new mt({color:9079430,roughness:.95});let r=0;for(let a=0;a<80&&r<4;a++){const c=Math.random()*t.length|0,l=t[c],h=Math.random()<.5?1:-1,d=34+Math.random()*70,u=l.pos.x+l.left.x*h*d,f=l.pos.z+l.left.z*h*d;if(!_r(t,u,f,4.5,4,e.armco+5))continue;const p=new ae,v=new Z(new Mt(5.4,.5,4.5),o);v.position.y=.25,p.add(v);const g=new Z(new Mt(5,2.5,4.2),n);g.position.y=1.75,g.castShadow=g.receiveShadow=!0,p.add(g);for(const x of[1,-1]){const M=new Z(new Mt(5.9,.16,2.9),i);M.position.set(0,3.75,x*1.18),M.rotation.x=x*.52,M.castShadow=!0,p.add(M)}const m=new Z(new Mt(.5,1.2,.5),o);m.position.set(1.4,4.1,0),p.add(m),p.position.set(u,0,f),p.rotation.y=Math.atan2(l.left.x,l.left.z)+(Math.random()-.5)*.4,s.add(p),r++}}function Yw(s,t,e,n){const i=t.length,o=[];let r=0;for(;r<i;)if(e[r]>.0045){let u=r,f=0;for(;u<i&&e[u]>.002;)f=Math.max(f,e[u]),u++;u-r>6&&o.push({i0:r,peak:f}),r=u+10}else r++;o.sort((u,f)=>f.peak-u.peak);const a=new mt({color:15000282,roughness:.85}),c=new mt({color:13787690,roughness:.7}),l=new mt({color:5461853,roughness:.5,metalness:.5}),h=new mt({color:14708768,emissive:9976840,emissiveIntensity:.25,side:be,roughness:.8});let d=0;for(const u of o){if(d>=5)break;const f=(u.i0-6+i)%i,p=t[f],v=t[(f-1+i)%i].tan,g=t[(f+1)%i].tan,x=v.x*g.z-v.z*g.x>0?1:-1,M=p.pos.x+p.left.x*x*(n.armco+3.4),y=p.pos.z+p.left.z*x*(n.armco+3.4);if(ii(t,M,y)<n.armco+2.4)continue;const w=new ae,S=new Z(new Mt(2.3,2.2,2.1),a);S.position.y=1.1,S.castShadow=S.receiveShadow=!0,w.add(S);const b=new Z(new Mt(2.6,.14,2.4),c);b.position.y=2.28,b.castShadow=!0,w.add(b);const T=new Z(new te(.05,.05,3.6,6),l);T.position.set(1.5,1.8,0),w.add(T);const _=new Z(new ge(.85,.55),h);_.position.set(1.95,3.3,0),w.add(_),w.position.set(M,0,y),w.rotation.y=Math.atan2(-x*p.left.x,-x*p.left.z),s.add(w),d++}}const tc=[{id:"gp",name:"AUTODROMO",subtitle:"GRAND PRIX CIRCUIT",difficulty:"MEDIUM",blurb:"Interlagos in miniature: the Senna S, a long back straight, a twisty infield climb.",roadWidth:14,kerbWidth:2,runoffWidth:5.5,closed:!0,tension:.5,controlPoints:[[0,0],[0,100],[0,160],[-14,204],[-48,214],[-90,206],[-146,186],[-184,146],[-196,98],[-198,20],[-196,-64],[-186,-108],[-156,-130],[-116,-134],[-76,-128],[-48,-130],[-28,-156],[-34,-190],[-62,-206],[-88,-224],[-96,-252],[-80,-276],[-48,-282],[-10,-272],[8,-248],[14,-206],[6,-150],[2,-100],[0,-44]],theme:{ground:"grass",fog:[13155238,900,4200],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!0,catchFence:!0,grandstands:!0,sponsors:!0,tireStacks:!0,brakeMarkers:!0,trees:{type:"broadleaf",count:700,band:[26,430]},mountains:"far",marshals:!0,clouds:!0}},{id:"sprint",name:"SUNSET SPEEDWAY",subtitle:"SPEEDWAY OVAL",difficulty:"EASY",blurb:"A perfect oval: two long straights, two sweeping 115 m turns, flat-out forever.",roadWidth:20,kerbWidth:2.2,runoffWidth:9,closed:!0,tension:.5,controlPoints:[[0,0],[0,70],[0,100],[0,130],[-3.9,159.8],[-15.4,187.5],[-33.7,211.3],[-57.5,229.6],[-85.2,241.1],[-115,245],[-144.8,241.1],[-172.5,229.6],[-196.3,211.3],[-214.6,187.5],[-226.1,159.8],[-230,130],[-230,100],[-230,40],[-230,-40],[-230,-100],[-230,-130],[-226.1,-159.8],[-214.6,-187.5],[-196.3,-211.3],[-172.5,-229.6],[-144.8,-241.1],[-115,-245],[-85.2,-241.1],[-57.5,-229.6],[-33.7,-211.3],[-15.4,-187.5],[-3.9,-159.8],[0,-130],[0,-100],[0,-70]],theme:{ground:"grass",fog:[13155238,1e3,4400],barrier:"armco",kerbs:!0,gravel:!1,skid:!0,pit:!0,catchFence:!1,grandstands:!0,sponsors:!0,tireStacks:!1,brakeMarkers:!1,trees:{type:"broadleaf",count:520,band:[30,440]},mountains:"hills",farmland:!0,marshals:!0,clouds:!0}},{id:"downtown",name:"MARINA STREET",subtitle:"CITY GRAND PRIX",difficulty:"HARD",blurb:"Marina Bay by night-race rules: a snap T1 complex, right-angle blocks, a waterfront run.",roadWidth:12,kerbWidth:1.1,runoffWidth:1.3,closed:!0,tension:.5,controlPoints:[[0,0],[0,90],[0,150],[18,194],[52,206],[88,216],[118,202],[156,200],[216,200],[252,188],[262,152],[262,110],[278,92],[306,88],[326,74],[330,40],[330,-40],[330,-110],[318,-152],[284,-166],[220,-166],[150,-166],[112,-150],[80,-160],[40,-160],[8,-150],[-2,-116],[0,-60]],theme:{ground:"city",fog:[12041412,650,3200],barrier:"wall",kerbs:!0,gravel:!1,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!0,tireStacks:!0,brakeMarkers:!0,trees:!1,buildings:!0,sidewalks:!0,streetlights:!0,crosswalks:!0,skyline:!0,marina:!0,mountains:!1,clouds:!0}},{id:"alpine",name:"COL DU PIN",subtitle:"MOUNTAIN PASS",difficulty:"MEDIUM-HARD",blurb:"Spa through the pines: an Eau Rouge flick, a long climb, Pouhon, one hairpin at home.",roadWidth:13,kerbWidth:1.6,runoffWidth:3,closed:!0,tension:.5,controlPoints:[[0,0],[90,0],[148,-8],[192,10],[218,48],[232,120],[224,190],[192,204],[162,190],[120,178],[60,184],[0,176],[-62,182],[-104,162],[-124,128],[-118,92],[-120,44],[-132,12],[-124,-14],[-126,-40],[-112,-58],[-88,-52],[-74,-24],[-64,-4],[-44,4],[-20,0]],theme:{ground:"alpine",fog:[13424349,680,3400],barrier:"guardrail",kerbs:!0,gravel:!1,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!1,tireStacks:!1,brakeMarkers:!0,trees:{type:"pine",count:900,nearMin:22,band:[22,360]},mountains:"near",huts:!0,clouds:!0}},{id:"dunes",name:"RED MESA",subtitle:"CANYON SPEEDWAY",difficulty:"MEDIUM",blurb:"Sakhir in the canyon: a 280 m drag into a hard stop, snaking esses, sand off-line.",roadWidth:16,kerbWidth:2,runoffWidth:6.5,closed:!0,tension:.5,controlPoints:[[0,0],[60,0],[155,0],[206,-12],[228,-46],[234,-86],[224,-124],[202,-160],[164,-174],[124,-162],[84,-178],[44,-166],[8,-178],[-8,-214],[-48,-232],[-84,-222],[-124,-212],[-158,-196],[-172,-156],[-174,-100],[-172,-48],[-158,-8],[-122,6],[-86,0],[-60,-3]],theme:{ground:"sand",fog:[14271643,850,4400],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!0,tireStacks:!1,brakeMarkers:!0,trees:!1,mountains:"mesa",rocks:!0,scrub:!0,clouds:!0}},{id:"parco",name:"PARCO VELOCE",subtitle:"TEMPLE OF SPEED",difficulty:"MEDIUM",blurb:"Monza in the park: the Rettifilo, Curva Grande, both Lesmos, Ascari, Parabolica.",roadWidth:13,kerbWidth:2,runoffWidth:5,closed:!0,tension:.5,controlPoints:[[0,0],[0,110],[0,180],[10,224],[34,238],[42,264],[76,294],[130,310],[184,296],[218,258],[236,224],[220,196],[212,158],[190,136],[150,112],[118,94],[92,64],[86,18],[100,-20],[76,-48],[84,-84],[102,-118],[110,-150],[94,-189],[55,-205],[16,-189],[0,-150],[0,-90]],theme:{ground:"grass",fog:[12568498,800,4e3],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!0,catchFence:!0,grandstands:!0,sponsors:!0,tireStacks:!1,brakeMarkers:!0,trees:{type:"broadleaf",count:1300,band:[24,400]},mountains:!1,marshals:!0,clouds:!0}}],Oh="gp";function jw(s){return tc.find(t=>t.id===s)||tc[0]}function Zw(s,t,e,n,i){const o=i*i,r=o*i;return .5*(2*t+(-s+e)*i+(2*s-5*t+4*e-n)*o+(-s+3*t-3*e+n)*r)}function Ue(s,t,e){const n=s.length,i=Math.min(n-2,Math.floor(e)),o=e-i,r=s[Math.max(0,i-1)][t],a=s[i][t],c=s[i+1][t],l=s[Math.min(n-1,i+2)][t];return Zw(r,a,c,l,o)}function _c(s,t){const e=s.hw,n=s.yb,i=s.hip,o=s.yt,r=s.topW,a=Math.max(3,Math.round(t*.55)),c=t-a,l=new wr([new nt(0,n),new nt(e*.72,n),new nt(e*.955,n+(i-n)*.42),new nt(e,i)]),h=new wr([new nt(e*.955,i+(o-i)*.1),new nt(r+(e-r)*.42,i+(o-i)*.56),new nt(r,o-.006),new nt(r*.52,o),new nt(0,o)]),d=l.getPoints(a-1).concat(h.getPoints(c-1));for(const u of d)u.x<0&&(u.x=0);return d[0].x=0,d[t-1].x=0,d}function Kw(s,t={}){const e=t.ringsPerSegment??8,n=t.profilePoints??14,i=2*(n-1),o=t.capEnds??!0,r=s.length-1,a=r*e,c=[],l=[],h=[];for(let p=0;p<=a;p++){const v=p/a*r,g={z:Ue(s,"z",v),hw:Ue(s,"hw",v),yb:Ue(s,"yb",v),hip:Ue(s,"hip",v),yt:Ue(s,"yt",v),topW:Ue(s,"topW",v)};h.push(g.z);const m=_c(g,n),x=p/a;for(let M=0;M<n;M++)c.push(m[M].x,m[M].y,g.z),l.push(M/i,x);for(let M=n-2;M>=1;M--)c.push(-m[M].x,m[M].y,g.z),l.push((2*(n-1)-M)/i,x)}const d=[],u=p=>p*i;for(let p=0;p<a;p++){const v=u(p),g=u(p+1);for(let m=0;m<i;m++){const x=(m+1)%i,M=v+m,y=v+x,w=g+m,S=g+x;d.push(M,S,w),d.push(M,y,S)}}if(o){const p=(v,g)=>{let m=0,x=0;for(let w=0;w<i;w++)m+=c[(u(v)+w)*3],x+=c[(u(v)+w)*3+1];m/=i,x/=i;const M=h[v],y=c.length/3;c.push(m,x,M),l.push(.5,g?1:0);for(let w=0;w<i;w++){const S=(w+1)%i,b=u(v)+w,T=u(v)+S;g?d.push(y,b,T):d.push(y,T,b)}};p(0,!1),p(a,!0)}const f=new he;return f.setAttribute("position",new ee(c,3)),f.setAttribute("uv",new ee(l,2)),f.setIndex(d),f.computeVertexNormals(),f.setAttribute("uv2",new ee(l,2)),f.computeBoundingBox(),f.computeBoundingSphere(),f}function cd(s,t){const e=s.length-1;let n=0,i=e;for(let r=0;r<36;r++){const a=(n+i)/2;Ue(s,"z",a)<t?n=a:i=a}const o=(n+i)/2;return{hw:Ue(s,"hw",o),yb:Ue(s,"yb",o),hip:Ue(s,"hip",o),yt:Ue(s,"yt",o),topW:Ue(s,"topW",o)}}const Jw=s=>s<0?2+s:s;function Es(s,t,e,n,i){const o=t.toFixed(4);let r=i.get(o);r||(r=_c(cd(s,t),n),i.set(o,r));const a=e>1?-1:1,c=Math.min(1,Math.max(0,e>1?2-e:e))*(n-1),l=Math.min(n-2,Math.floor(c)),h=c-l;return new O(a*(r[l].x+(r[l+1].x-r[l].x)*h),r[l].y+(r[l+1].y-r[l].y)*h,t)}const Qw=1.2;function $w(s,t=.09){if(s.length<3)return s;const e=(o,r)=>Math.hypot(r[0]-o[0],(r[1]-o[1])*Qw),n=(o,r,a)=>[o[0]+(r[0]-o[0])*a,o[1]+(r[1]-o[1])*a],i=[s[0]];for(let o=1;o<s.length-1;o++){const r=e(s[o-1],s[o]),a=e(s[o],s[o+1]);if(r<1e-6||a<1e-6){i.push(s[o]);continue}const c=1-Math.min(t,r*.4)/r,l=Math.min(t,a*.4)/a;i.push(n(s[o-1],s[o],c),n(s[o],s[o+1],l))}return i.push(s[s.length-1]),i}function Sr(s,t,e={}){const n=e.profilePoints??16,i=new Map,o=[],r=[],a=[],c=[],l=(d,u,f)=>{const p=$w(d.map(([y,w])=>[y,Jw(w)])),v=[];for(let y=0;y<p.length-1;y++){const[w,S]=p[y],[b,T]=p[y+1],_=Math.max(2,Math.ceil(Math.abs(b-w)/.05)+Math.ceil(Math.abs(T-S)*24));for(let E=0;E<_;E++){const L=E/_;v.push([w+(b-w)*L,S+(T-S)*L])}}v.push(p[p.length-1]);const g=[],m=[];for(const[y,w]of v){const S=Es(s,y,w,n,i),b=.008,T=.03,_=Es(s,y,Math.min(2,w+T),n,i).sub(Es(s,y,Math.max(0,w-T),n,i)),E=Es(s,y+b,w,n,i).sub(Es(s,y-b,w,n,i)),L=_.cross(E);L.lengthSq()<1e-12?L.set(0,1,0):L.normalize();const P=cd(s,y);L.dot(new O(S.x,S.y-(P.yb+P.yt)*.5,0))<0&&L.negate(),g.push(S),m.push(L)}const x=o.length/3;let M=0;for(let y=0;y<g.length;y++){const w=g[Math.max(0,y-1)],S=g[Math.min(g.length-1,y+1)],b=S.clone().sub(w);b.lengthSq()<1e-12?b.set(0,0,1):b.normalize();const T=y>0?g[y].clone().sub(w):S.clone().sub(g[y]);T.lengthSq()<1e-12?T.copy(b):T.normalize();const _=b.clone().cross(m[y]);_.lengthSq()<1e-12?_.set(1,0,0):_.normalize();const E=T.clone().cross(m[y]),L=E.lengthSq()>1e-12?1/Math.max(.62,Math.abs(_.dot(E.normalize()))):1;y>0&&(M+=g[y].distanceTo(g[y-1]));const P=g[y].clone().addScaledVector(m[y],f);for(const U of[-1,1]){const C=P.clone().addScaledVector(_,U*u*.5*L);o.push(C.x,C.y,C.z),r.push(m[y].x,m[y].y,m[y].z),a.push(U>0?1:0,M)}}for(let y=0;y<g.length-1;y++){const w=x+y*2,S=w+1,b=w+2,T=w+3;c.push(w,T,b,w,S,T)}};for(const d of t){const u=d.width??.01,f=d.proud??.004;l(d.path,u,f),d.mirror&&l(d.path.map(([p,v])=>[p,-v]),u,f)}if(!c.length)return null;const h=new he;return h.setAttribute("position",new ee(o,3)),h.setAttribute("normal",new ee(r,3)),h.setAttribute("uv",new ee(a,2)),h.setIndex(c),h.computeBoundingBox(),h.computeBoundingSphere(),h}function ld(s,t={}){const e=t.profilePoints??14,n=t.beltFrac??.6,i=Math.round(n*(e-1)),o=t.zStart,r=t.zEnd,a=t.steps??24,c=t.proud??.012,l=s.length-1,h=m=>Ue(s,"z",m),d=m=>{let x=0,M=l;for(let y=0;y<36;y++){const w=(x+M)/2;h(w)<m?x=w:M=w}return(x+M)/2},u=[],f=[];let p=0;for(let m=0;m<=a;m++){const x=o+(r-o)*(m/a),M=d(x),y={hw:Ue(s,"hw",M),yb:Ue(s,"yb",M),hip:Ue(s,"hip",M),yt:Ue(s,"yt",M),topW:Ue(s,"topW",M)},w=_c(y,e),S=[];for(let b=i;b<=e-1;b++)S.push(w[b]);for(let b=e-2;b>=i;b--)S.push(new nt(-w[b].x,w[b].y));p=S.length;for(let b=0;b<p;b++){const T=S[b].x*(1+c*.7),_=S[b].y+c;u.push(T,_,x),f.push(b/(p-1),m/a)}}const v=[];for(let m=0;m<a;m++)for(let x=0;x<p-1;x++){const M=m*p+x,y=m*p+x+1,w=(m+1)*p+x,S=(m+1)*p+x+1;v.push(M,w,S,M,S,y)}const g=new he;return g.setAttribute("position",new ee(u,3)),g.setAttribute("uv",new ee(f,2)),g.setIndex(v),g.computeVertexNormals(),g}function Ji(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function zh(s){return s=Math.max(0,Math.min(1,s)),s*s*(3-2*s)}function t_(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,o=t-n,r=Ji(e,n),a=Ji(e+1,n),c=Ji(e,n+1),l=Ji(e+1,n+1),h=zh(i),d=zh(o);return(r*(1-h)+a*h)*(1-d)+(c*(1-h)+l*h)*d}function hd(s,t,e=4){let n=.5,i=1,o=0,r=0;for(let a=0;a<e;a++)o+=n*t_(s*i,t*i),r+=n,n*=.5,i*=2;return o/r}function Dr(s,t,e){const n=new Float32Array(s*s);for(let c=0;c<s;c++)for(let l=0;l<s;l++)n[c*s+l]=t(l/s,c/s);const i=document.createElement("canvas");i.width=s,i.height=s;const o=i.getContext("2d"),r=o.createImageData(s,s);for(let c=0;c<s;c++)for(let l=0;l<s;l++){const h=n[c*s+(l-1+s)%s],d=n[c*s+(l+1)%s],u=n[(c-1+s)%s*s+l],f=n[(c+1)%s*s+l];let p=(h-d)*e,v=(u-f)*e,g=1;const m=Math.hypot(p,v,g)||1;p/=m,v/=m,g/=m;const x=(c*s+l)*4;r.data[x]=(p*.5+.5)*255,r.data[x+1]=(v*.5+.5)*255,r.data[x+2]=(g*.5+.5)*255,r.data[x+3]=255}o.putImageData(r,0,0);const a=new Ee(i);return a.wrapS=a.wrapT=le,a.needsUpdate=!0,a}let di=null;function e_(){if(di)return di;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let o=0;o<s;o++){const r=Ji(o*1,i*1)*Math.PI*2,a=Ji(o*1.7+4.2,i*2.3+1.1)*.5,c=Math.cos(r)*a*.35,l=Math.sin(r)*a*.35,h=Math.sqrt(Math.max(1e-4,1-c*c-l*l)),d=(i*s+o)*4;n.data[d]=(c*.5+.5)*255,n.data[d+1]=(l*.5+.5)*255,n.data[d+2]=(h*.5+.5)*255,n.data[d+3]=255}return e.putImageData(n,0,0),di=new Ee(t),di.wrapS=di.wrapT=le,di.needsUpdate=!0,di}let Go=null;function n_(){return Go||(Go=Dr(128,(s,t)=>hd(s*14,t*14,3),.6),Go)}let Ts=null;function i_(){return Ts||(Ts=Dr(128,(s,t)=>{const n=s*8,i=t*8,o=Math.floor(n),r=Math.floor(i),a=n-o,c=i-r,l=(o+r)%2===0;return .35+Math.sin(l?a*Math.PI:c*Math.PI)*.65},1.4),Ts.repeat.set(1,1),Ts)}let As=null;function s_(){return As||(As=Dr(128,(s,t)=>{const e=Math.sin(t*Math.PI*26)>.4?0:1,n=Math.sin(s*Math.PI*8)*.15;return e*.8+n+.1},1.6),As.repeat.set(1,1),As)}let fi=null;function o_(){if(fi)return fi;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let o=0;o<s;o++){const a=.2+hd(o/s*18,i/s*18,3)*.16,c=(i*s+o)*4;n.data[c]=n.data[c+1]=n.data[c+2]=a*255,n.data[c+3]=255}return e.putImageData(n,0,0),fi=new Ee(t),fi.wrapS=fi.wrapT=le,fi.needsUpdate=!0,fi}let Ho=null;function r_(){return Ho||(Ho=Dr(128,(s,t)=>{const i=Math.floor(t*9)%2*.5,o=(s*9+i)%1-.5,r=t*9%1-.5;return Math.hypot(o,r)<.34?0:1},1.8),Ho)}function a_(s="GT 0142"){const t=document.createElement("canvas");t.width=256,t.height=80;const e=t.getContext("2d");e.fillStyle="#f2f3ea",e.fillRect(0,0,256,80),e.fillStyle="#1d3a8a",e.fillRect(0,0,30,80),e.fillStyle="#ffcb05",e.beginPath(),e.arc(15,22,4,0,Math.PI*2),e.fill(),e.fillStyle="#111417",e.font="bold 52px Arial",e.textBaseline="middle",e.fillText(s,44,44);const n=new Ee(t);return n.colorSpace=Yt,n.anisotropy=8,n}let Rs=null;function c_(){if(Rs)return Rs;const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,50,8,64,64,64);return e.addColorStop(0,"#fdfdff"),e.addColorStop(1,"#8b9099"),t.fillStyle=e,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.fill(),t.strokeStyle="#3a3f47",t.lineWidth=5,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.stroke(),t.fillStyle="#1b1e24",t.font="bold 56px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText("R",64,66),Rs=new Ee(s),Rs.colorSpace=Yt,Rs}const Ea=new Map;function l_(s){const t=new Dt(s),e={};return t.getHSL(e),e.s=Math.min(1,e.s*1.12),e.l=e.l*.44,t.setHSL(e.h,e.s,e.l),t}function fs(s){if(Ea.has(s))return Ea.get(s);const t=e_();t.repeat.set(10,22);const e=new fn({color:l_(s),metalness:.16,roughness:.85,roughnessMap:o_(),clearcoat:1,clearcoatRoughness:.085,clearcoatNormalMap:n_(),clearcoatNormalScale:new nt(.05,.05),normalMap:t,normalScale:new nt(.11,.11),envMapIntensity:1.12});return Ea.set(s,e),e}let Wo=null;function Ti(){return Wo||(Wo=new fn({color:723983,metalness:.12,roughness:.62,clearcoat:.18,envMapIntensity:.6}),Wo)}let Vo=null;function ud(){return Vo||(Vo=new mt({color:856083,metalness:0,roughness:.95,envMapIntensity:.35,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),Vo)}let Xo=null;function br(){if(Xo)return Xo;const s=i_();return s.repeat.set(5,5),Xo=new fn({color:921878,metalness:.35,roughness:.42,clearcoat:.55,clearcoatRoughness:.16,normalMap:s,normalScale:new nt(.7,.7),envMapIntensity:.8}),Xo}let qo=null;function dd(){return qo||(qo=new fn({color:661026,metalness:0,roughness:.03,transmission:.25,thickness:.35,ior:1.52,envMapIntensity:1.6,clearcoat:1,clearcoatRoughness:.02,transparent:!0,opacity:.86,side:be,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),qo)}let Yo=null;function Sc(){return Yo||(Yo=new fn({color:6975092,metalness:1,roughness:.42}),Yo)}let jo=null;function h_(){if(jo)return jo;const s=s_();return s.repeat.set(8,1),jo=new fn({color:526345,roughness:.9,metalness:0,sheen:.4,sheenRoughness:.45,normalMap:s,normalScale:new nt(.75,.75)}),jo}let Zo=null;function u_(){return Zo||(Zo=new fn({color:855311,roughness:.78,metalness:0,sheen:.3}),Zo)}let Ko=null;function es(){return Ko||(Ko=new fn({color:1711136,metalness:.9,roughness:.35}),Ko)}let Jo=null;function d_(){return Jo||(Jo=new mt({color:3817028,metalness:1,roughness:.45}),Jo)}let Qo=null;function ec(){return Qo||(Qo=new mt({color:13114910,metalness:.4,roughness:.35}),Qo)}let $o=null;function f_(){return $o||($o=new mt({color:15657696,emissive:16775400,emissiveIntensity:1.1,roughness:.18,metalness:0}),$o)}let tr=null;function p_(){return tr||(tr=new fn({color:16777215,metalness:0,roughness:.06,transmission:.9,thickness:.05,ior:1.45,transparent:!0,opacity:.4,envMapIntensity:1.2}),tr)}function fd(){return new mt({color:4852236,emissive:16716834,emissiveIntensity:.6,roughness:.3,metalness:0,transparent:!0,opacity:.7})}let er=null;function m_(){if(er)return er;const s=r_();return s.repeat.set(2,1),er=new mt({color:1053206,metalness:.8,roughness:.5,normalMap:s,normalScale:new nt(1,1)}),er}function g_(s,t){let e=s.index?s.toNonIndexed():s.clone();if(e.applyMatrix4(t),!e.getAttribute("uv")){const n=e.getAttribute("position").count;e.setAttribute("uv",new ee(new Float32Array(n*2),2))}for(const n of Object.keys(e.attributes))n!=="position"&&n!=="normal"&&n!=="uv"&&e.deleteAttribute(n);return e.getAttribute("normal")||e.computeVertexNormals(),e}function pd(s){s.updateMatrixWorld(!0);const t=new jt().copy(s.matrixWorld).invert(),e=new Map,n=[];s.traverse(i=>{if(!i.isMesh||i.userData.noMerge||i.material.transparent)return;const o=i.material;e.has(o)||e.set(o,{geos:[],cast:!1,receive:!1});const r=e.get(o),a=new jt().multiplyMatrices(t,i.matrixWorld);r.geos.push(g_(i.geometry,a)),r.cast=r.cast||i.castShadow,r.receive=r.receive||i.receiveShadow,n.push(i)});for(const i of n)i.parent&&i.parent.remove(i);for(const[i,o]of e){if(!o.geos.length)continue;const r=o.geos.length===1?o.geos[0]:_n(o.geos,!1);if(!r)continue;const a=new Z(r,i);a.castShadow=o.cast,a.receiveShadow=o.receive,s.add(a)}return s}let nr=null;function v_(){return nr||(nr=new fn({color:8685967,metalness:1,roughness:.34,clearcoat:.3,clearcoatRoughness:.12,envMapIntensity:.65}),nr)}const Bh=.36,x_=.235,kh=.096,M_=x_-.002,y_=.216,Gh=.048,Hh=.043,Ds=.016,Wh=.075,w_=.218,Ta=new Map,Vh={gt:{spokes:5,twin:!0,spokeW:.04,rim:"bright",lock:"lugs"},muscle:{spokes:5,twin:!1,spokeW:.085,rim:"bright",lock:"lugs"},openWheel:{spokes:10,twin:!1,spokeW:.03,rim:"dark",lock:"center"}},Xh=[[.3595,.086],[.3565,.1],[.349,.113],[.334,.127],[.3235,.1315],[.3185,.137],[.3135,.133],[.306,.14],[.286,.131],[.266,.114],[.243,.101]],__=[[.3595,-.086],[Bh,-.045],[Bh,.045],[.3595,.086]];function qh(s,t){const e=new mc(s.map(n=>new nt(n[0],n[1])),t);return e.rotateZ(-Math.PI/2),e}function S_(s,t){const e=w_-Wh,n=new Mt(.03,e,s.spokeW),i=n.getAttribute("position"),o=Ds-Hh;for(let r=0;r<i.count;r++){const a=(i.getY(r)+e/2)/e,c=Xe.lerp(.6,1,a);i.setZ(r,i.getZ(r)*c),i.setX(r,i.getX(r)*c+t*(Hh+(1-a)*o))}return n.translate(0,Wh+e/2,0),n.computeVertexNormals(),n}function Yh(s,t){const e=new ae,n=s.rim==="dark"?es():v_(),i=new Z(new us(.238,.013,6,30),n);i.rotation.y=Math.PI/2,i.position.x=t*kh,e.add(i);const o=new te(M_,y_,Gh,28,1,!0);o.rotateZ(-t*(Math.PI/2));const r=new Z(o,n);r.position.x=t*(kh-.002-Gh/2),e.add(r);const a=S_(s,t),c=s.spokes;for(let h=0;h<c;h++){const d=h/c*Math.PI*2;if(s.twin)for(const u of[-.1,.1]){const f=new Z(a,n);f.rotation.x=d+u,e.add(f)}else{const u=new Z(a,n);u.rotation.x=d,e.add(u)}}const l=new Z(new te(.078,.078,.055,18),n);if(l.rotation.z=Math.PI/2,l.position.x=t*Ds,e.add(l),s.lock==="center"){const h=new Z(new te(.03,.03,.034,6),ec());h.rotation.z=Math.PI/2,h.position.x=t*(Ds+.026),e.add(h)}else{const h=new Z(new te(.032,.032,.02,16),es());h.rotation.z=Math.PI/2,h.position.x=t*(Ds+.024),e.add(h);const d=new te(.013,.013,.024,6);for(let u=0;u<5;u++){const f=u/5*Math.PI*2,p=new Z(d,es());p.rotation.z=Math.PI/2,p.position.set(t*(Ds+.024),Math.cos(f)*.05,Math.sin(f)*.05),e.add(p)}}return e}function b_(s){const t=Vh[s]??Vh.gt,e=E_(s,t);return pd(e)}function E_(s,t){const e=new ae,n=new Z(qh(__,30),h_());n.castShadow=!0,e.add(n);for(const d of[1,-1]){const u=d>0?Xh:[...Xh].reverse().map(p=>[p[0],-p[1]]),f=new Z(qh(u,30),u_());f.castShadow=!0,e.add(f)}const i=new Z(new te(.23,.23,.18,28,1,!0),es());i.rotateZ(Math.PI/2),e.add(i);const o=new Z(new te(.23,.23,.012,28),es());o.rotateZ(Math.PI/2),e.add(o);const r=new Z(new te(.185,.185,.032,28),d_());r.rotateZ(Math.PI/2),e.add(r);const a=new Z(new te(.085,.085,.044,18),es());a.rotateZ(Math.PI/2),e.add(a);const c=new us(.19,.03,5,8,1);c.rotateY(Math.PI/2);const l=new Z(c,ec());l.rotation.x=1.22,e.add(l);const h=new Z(new Mt(.068,.045,.085),ec());return h.position.set(0,.188,.028),e.add(h),e.add(Yh(t,1)),e.add(Yh(t,-1)),e}function T_(s="gt"){return Ta.has(s)||Ta.set(s,b_(s)),Ta.get(s).clone()}function md({z:s=1.92,y:t=.64,x:e=.6}={}){const n=new ae,i=Ti(),o=p_(),r=f_();for(const a of[-1,1]){const c=new ae,l=new Z(new Mt(.44,.13,.12),i);c.add(l);const h=new Z(new te(.045,.05,.07,16),r);h.rotation.x=Math.PI/2,h.position.set(-a*.1,-.005,.055),c.add(h);const d=new Z(new us(.052,.012,8,18),i);d.position.set(-a*.1,-.005,.088),c.add(d);const u=new Z(new Mt(.38,.018,.02),r);u.position.set(0,.048,.055),u.rotation.z=a*.06,c.add(u);const f=new Z(new Mt(.45,.15,.035),o);f.position.z=.075,c.add(f),c.position.set(a*e,t,s),c.rotation.y=a>0?-.32:.32,c.rotation.x=-.12,n.add(c)}return n}function gd({z:s=-2.04,y:t=.74,width:e=1.5}={}){const n=new ae,i=new Z(new Mt(e+.05,.12,.08),Ti());i.position.set(0,t,s+.02),n.add(i);const o=fd(),r=new Z(new Mt(e,.07,.05),o);r.position.set(0,t,s-.02),r.userData.noMerge=!0,n.add(r);for(const a of[-1,1]){const c=new Z(new te(.04,.04,.1,16),o);c.rotation.z=Math.PI/2,c.position.set(a*(e/2-.02),t,s-.02),n.add(c)}return{group:n,brakeMesh:r}}let ir=null;function A_(){return ir||(ir=new mt({color:2567219,metalness:1,roughness:.14,envMapIntensity:.7}),ir)}function vd({z:s=.5,y:t=.98,x:e=.95,color:n=13112861}={}){const i=new ae,o=fs(n);for(const r of[-1,1]){const a=new ae,c=new Z(new Mt(.11,.022,.05),Ti());c.rotation.z=r*.5,c.position.set(r*.04,-.03,0),a.add(c);const l=new Z(new Mt(.16,.068,.095),o);l.rotation.y=r*.08,l.position.set(r*.12,.01,0),a.add(l);const h=new Z(new ge(.125,.05),A_());h.rotation.y=Math.PI+r*.08,h.position.set(r*.124,.01,-.052),a.add(h),a.position.set(r*e,t,s),i.add(a)}return i}function xd({z:s=2.02,y:t=.44,w:e=.9,h:n=.22}={}){const i=new ae,o=new Z(new ge(e,n),m_());o.position.set(0,t,s),i.add(o);const r=new Z(new Mt(e+.08,n+.06,.05),Ti());return r.position.set(0,t,s-.03),i.add(r),i}function Md({z:s=1.98,y:t=-.19,w:e=1.3}={}){const n=new ae,i=new Z(new Mt(e,.024,.2),bc());return i.position.set(0,t,s),i.castShadow=!0,n.add(i),n}function yd({z:s=-1.95,y:t=-.27,w:e=1.44}={}){const n=new ae,i=bc(),o=new Z(new Mt(e,.035,.44),i);o.rotation.x=.3,o.position.set(0,t,s),n.add(o);const r=5;for(let a=0;a<r;a++){const c=new Z(new Mt(.022,.09,.38),i);c.rotation.x=.3,c.position.set((a/(r-1)-.5)*(e*.88),t+.05,s),n.add(c)}return n}function wd({z:s=-1.92,y:t=1.06,span:e=1.62,deckY:n=.82,style:i="gt"}={}){const o=new ae;if(i==="ducktail"){const l=new Z(new Mt(e,.05,.3),fs(1118998));return l.position.set(0,n+.03,s+.16),l.rotation.x=-.18,o.add(l),o}const r=new Cr;r.moveTo(-.19,0),r.quadraticCurveTo(-.1,.05,.06,.032),r.quadraticCurveTo(.15,.016,.19,0),r.quadraticCurveTo(.06,-.03,-.06,-.028),r.quadraticCurveTo(-.15,-.02,-.19,0);const a=new Ks(r,{depth:e,bevelEnabled:!1,steps:1});a.translate(0,0,-e/2),a.rotateY(Math.PI/2);const c=new Z(a,br());if(c.rotation.x=-.16,c.position.set(0,t,s),c.castShadow=!0,o.add(c),i==="f1"){const l=c.clone();l.position.y=t+.14,l.rotation.x=-.3,l.scale.set(1,.7,.9),o.add(l)}for(const l of[-1,1]){const h=new Z(new Mt(.02,.22,.42),br());h.position.set(l*e/2,t,s),o.add(h)}for(const l of[-1,1]){const h=new Z(new Mt(.04,t-n+.06,.1),Sc());h.position.set(l*.55,(t+n)/2,s+.02),o.add(h)}return o}function _d({z:s=-2.07,y:t=.38,x:e=.45,count:n=2}={}){const i=new ae,o=new te(.05,.058,.14,18);o.rotateX(Math.PI/2);const r=new te(.038,.038,.15,14);r.rotateX(Math.PI/2);const a=n===4?[-e-.1,-e+.04,e-.04,e+.1]:[-e,e];for(const c of a){const l=new Z(o,Sc());l.position.set(c,t,s),i.add(l);const h=new Z(r,Ti());h.position.set(c,t,s-.01),i.add(h)}return i}let sr=null,Aa=null;function Sd({frontZ:s=2.06,frontY:t=.06,rearZ:e=-2.06,rearY:n=.22,plateY:i=-.04}={}){const o=new ae;sr||(sr=new mt({map:c_(),metalness:.4,roughness:.4}));const r=new te(.042,.042,.01,18);r.rotateX(Math.PI/2);const a=new Z(r,sr);a.position.set(0,t,s),o.add(a);const c=new Z(r,sr);c.position.set(0,n,e),c.rotation.y=Math.PI,o.add(c),Aa||(Aa=new mt({map:a_(),roughness:.6,metalness:0}));const l=new ge(.42,.13),h=new Z(l,Aa);return h.position.set(0,i,e-.005),h.rotation.y=Math.PI,o.add(h),o}let or=null;function bc(){return or||(or=new mt({color:395016,roughness:1,metalness:0,envMapIntensity:0}),or)}function Ec({y:s=-.26,w:t=1.42,len:e=3.5}={}){const n=t/2,i=e/2,o=.3,r=new Cr;r.moveTo(-n+o,-i),r.lineTo(n-o,-i),r.lineTo(n,-i+o),r.lineTo(n,i-o),r.lineTo(n-o,i),r.lineTo(-n+o,i),r.lineTo(-n,i-o),r.lineTo(-n,-i+o),r.closePath();const a=new Ks(r,{depth:.03,bevelEnabled:!0,bevelThickness:.03,bevelSize:.04,bevelSegments:1});a.rotateX(-Math.PI/2);const c=new Z(a,bc());return c.position.set(0,s,0),c}let rr=null;function R_(){return rr||(rr=new mt({color:723982,roughness:.94,metalness:0,side:be}),rr)}function bd({zF:s=1.45,zR:t=-1.45,x:e=.86,r:n=.41,width:i=.3}={}){const o=new ae,r=new te(n,n,i,22,1,!0,0,Math.PI);r.rotateZ(Math.PI/2);for(const a of[s,t])for(const c of[-1,1]){const l=new Z(r,R_());l.position.set(c*e,0,a),o.add(l)}return o}let Cs=null;function C_(){if(Cs)return Cs;const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,128,128);const e=t.createRadialGradient(64,64,6,64,64,62);return e.addColorStop(0,"rgb(64,64,68)"),e.addColorStop(.5,"rgb(150,150,156)"),e.addColorStop(.82,"rgb(214,214,218)"),e.addColorStop(1,"rgb(255,255,255)"),t.fillStyle=e,t.fillRect(0,0,128,128),Cs=new Ee(s),Cs.colorSpace=Yt,Cs}function P_({y:s=-.355,w:t=2.3,len:e=4.8}={}){const n=new Ei({map:C_(),transparent:!0,depthWrite:!1,blending:Ba,toneMapped:!1}),i=new Z(new ge(t,e),n);return i.rotation.x=-Math.PI/2,i.position.set(0,s,0),i.renderOrder=-1,i}const dr=[{z:-2.16,hw:.84,yb:-.13,hip:.16,yt:.33,topW:.6},{z:-1.9,hw:.98,yb:-.06,hip:.14,yt:.4,topW:.76},{z:-1.45,hw:1.05,yb:.04,hip:.12,yt:.46,topW:.78},{z:-1.1,hw:.97,yb:-.19,hip:.15,yt:.66,topW:.58},{z:-.72,hw:.95,yb:-.2,hip:.16,yt:.83,topW:.5},{z:-.3,hw:.95,yb:-.2,hip:.16,yt:.85,topW:.5},{z:.24,hw:.96,yb:-.18,hip:.13,yt:.64,topW:.6},{z:.8,hw:.98,yb:-.16,hip:.08,yt:.44,topW:.8},{z:1.45,hw:1.04,yb:.04,hip:.05,yt:.43,topW:.82},{z:1.85,hw:.94,yb:-.08,hip:.05,yt:.36,topW:.72},{z:2.08,hw:.8,yb:-.13,hip:.02,yt:.26,topW:.6},{z:2.2,hw:.68,yb:-.14,hip:0,yt:.18,topW:.52}],L_="gt",I_=[{path:[[.34,.8],[.34,1],[.34,-.8]]},{path:[[1.94,.8],[1.94,1],[1.94,-.8]]},{path:[[.36,.8],[1.94,.8]],mirror:!0},{path:[[.6,.27],[.6,.59],[-.88,.59],[-.88,.27],[.6,.27]],mirror:!0},{path:[[-1.22,.8],[-1.22,1],[-1.22,-.8]]},{path:[[-1.78,.8],[-1.78,1],[-1.78,-.8]]},{path:[[-1.22,.8],[-1.78,.8]],mirror:!0}],D_=[{path:[[.28,.6],[.1,.66],[-.1,.74],[-.28,.8],[-.8,.8],[-1,.74],[-1.14,.62]],mirror:!0,width:.05,proud:.022}];function N_(s,t){const e=new Z(ld(dr,{zStart:.28,zEnd:-1.16,beltFrac:.6,steps:26}),dd());s.add(e);const n=Sr(dr,I_,{profilePoints:16});if(n){const r=new Z(n,ud());r.receiveShadow=!0,s.add(r)}const i=Sr(dr,D_,{profilePoints:16});if(i){const r=new Z(i,fs(t.color));r.castShadow=!0,r.receiveShadow=!0,s.add(r)}s.add(md({z:1.98,y:.12,x:.56}));const o=gd({z:-2.13,y:.16,width:1.34});return s.add(o.group),s.add(vd({z:.34,y:.3,x:.95,color:t.color})),s.add(xd({z:2.205,y:-.05,w:.62,h:.13})),s.add(Md({z:2.12,y:-.18,w:1.3})),s.add(yd({z:-1.95,y:-.27,w:1.44})),s.add(wd({z:-1.9,y:.58,span:1.5,deckY:.38,style:"gt"})),s.add(_d({z:-2.1,y:-.16,x:.42,count:2})),s.add(Sd({frontZ:2.21,frontY:.05,rearZ:-2.17,rearY:.27,plateY:-.03})),s.add(Ec({y:-.26,w:1.42,len:3.5})),s.add(bd({zF:1.45,zR:-1.45,x:.86})),{brakeLights:o.brakeMesh}}const U_=Object.freeze(Object.defineProperty({__proto__:null,decorate:N_,keys:dr,wheelStyle:L_},Symbol.toStringTag,{value:"Module"})),fr=[{z:-2.18,hw:.9,yb:-.1,hip:.2,yt:.44,topW:.66},{z:-1.92,hw:1.02,yb:-.02,hip:.16,yt:.5,topW:.84},{z:-1.45,hw:1.09,yb:.05,hip:.13,yt:.54,topW:.84},{z:-1.08,hw:1,yb:-.17,hip:.17,yt:.78,topW:.62},{z:-.72,hw:.98,yb:-.18,hip:.18,yt:.89,topW:.58},{z:-.3,hw:.98,yb:-.18,hip:.17,yt:.9,topW:.58},{z:.28,hw:1,yb:-.16,hip:.13,yt:.68,topW:.68},{z:.62,hw:1.02,yb:-.15,hip:.08,yt:.5,topW:.84},{z:1.45,hw:1.06,yb:.05,hip:.05,yt:.47,topW:.84},{z:1.98,hw:.94,yb:-.1,hip:.06,yt:.42,topW:.74},{z:2.22,hw:.78,yb:-.12,hip:.02,yt:.3,topW:.6}],F_="muscle",O_=[{path:[[.32,.8],[.32,1],[.32,-.8]]},{path:[[2,.8],[2,1],[2,-.8]]},{path:[[.34,.8],[2,.8]],mirror:!0},{path:[[.62,.27],[.62,.59],[-1,.59],[-1,.27],[.62,.27]],mirror:!0},{path:[[-1.18,.8],[-1.18,1],[-1.18,-.8]]},{path:[[-2.02,.8],[-2.02,1],[-2.02,-.8]]},{path:[[-1.18,.8],[-2.02,.8]],mirror:!0}],z_=[{path:[[.4,.6],[.16,.7],[-.04,.77],[-.22,.8],[-.78,.8],[-.94,.74],[-1.08,.62]],mirror:!0,width:.05,proud:.022}];function B_(s,t){const e=new Z(ld(fr,{zStart:.4,zEnd:-1.1,beltFrac:.62,steps:24}),dd());s.add(e);const n=Sr(fr,O_,{profilePoints:16});if(n){const c=new Z(n,ud());c.receiveShadow=!0,s.add(c)}const i=Sr(fr,z_,{profilePoints:16});if(i){const c=new Z(i,fs(t.color));c.castShadow=!0,c.receiveShadow=!0,s.add(c)}const o=new Z(new Mt(.56,.1,.85),Ti());o.position.set(0,.49,1.02),s.add(o);const r=new Z(new Mt(.46,.07,.1),br());r.position.set(0,.51,1.46),s.add(r),s.add(md({z:2.1,y:.16,x:.58}));const a=gd({z:-2.15,y:.22,width:1.44});return s.add(a.group),s.add(vd({z:.44,y:.34,x:.99,color:t.color})),s.add(xd({z:2.225,y:.1,w:1,h:.22})),s.add(Md({z:2.14,y:-.17,w:1.36})),s.add(yd({z:-1.97,y:-.26,w:1.5})),s.add(wd({z:-1.96,deckY:.5,span:1.6,style:"ducktail"})),s.add(_d({z:-2.14,y:-.14,x:.48,count:4})),s.add(Sd({frontZ:2.24,frontY:.1,rearZ:-2.19,rearY:.37,plateY:.02})),s.add(Ec({y:-.26,w:1.48,len:3.7})),s.add(bd({zF:1.45,zR:-1.45,x:.88})),{brakeLights:a.brakeMesh}}const k_=Object.freeze(Object.defineProperty({__proto__:null,decorate:B_,keys:fr,wheelStyle:F_},Symbol.toStringTag,{value:"Module"})),G_=[{z:-2.1,hw:.24,yb:-.1,hip:0,yt:.16,topW:.14},{z:-1.55,hw:.36,yb:-.12,hip:0,yt:.36,topW:.18},{z:-.95,hw:.42,yb:-.12,hip:.02,yt:.56,topW:.22},{z:-.35,hw:.48,yb:-.13,hip:.04,yt:.34,topW:.4},{z:.35,hw:.44,yb:-.13,hip:.02,yt:.26,topW:.36},{z:1.05,hw:.32,yb:-.1,hip:0,yt:.18,topW:.24},{z:1.6,hw:.22,yb:-.07,hip:0,yt:.13,topW:.15},{z:2.05,hw:.11,yb:-.03,hip:0,yt:.08,topW:.07}],H_="openWheel";function jh({z:s,y:t,span:e,chord:n=.32,mat:i,tilt:o=-.12,elements:r=1}){const a=new ae,c=new Cr;c.moveTo(-n/2,0),c.quadraticCurveTo(-n*.25,.045,n*.18,.028),c.quadraticCurveTo(n*.42,.012,n/2,0),c.quadraticCurveTo(n*.18,-.028,-n*.18,-.025),c.quadraticCurveTo(-n*.4,-.018,-n/2,0);const l=new Ks(c,{depth:e,bevelEnabled:!1});l.translate(0,0,-e/2),l.rotateY(Math.PI/2);for(let h=0;h<r;h++){const d=new Z(l,i);d.rotation.x=o-h*.18,d.position.set(0,t+h*.12,s+h*.05),d.castShadow=!0,a.add(d)}for(const h of[-1,1]){const d=new Z(new Mt(.025,.26,n*1.3),i);d.position.set(h*e/2,t+.05,s),a.add(d)}return a}function W_(s,t){const e=fs(t.color),n=br(),i=new Z(new te(.12,.16,.22,16,1,!1,0,Math.PI),n);i.rotation.set(Math.PI/2,0,0),i.position.set(0,.5,-.78),s.add(i);const o=Ti(),r=new Z(new us(.3,.025,10,24,Math.PI),o);r.rotation.set(0,Math.PI/2,0),r.position.set(0,.16,-.3),s.add(r);const a=new Z(new te(.03,.03,.26,8),o);a.position.set(0,.12,.18),a.rotation.x=.2,s.add(a);const c=new Z(new Mt(.34,.18,.22),n);c.position.set(0,.26,-.62),s.add(c);const l=new Z(new Ys(.13,16,12),e);l.scale.set(1,1.1,1.15),l.position.set(0,.26,-.42),s.add(l);const h=new Z(new Ys(.118,16,8,0,Math.PI*2,.7,.5),new fn({color:1053720,roughness:.1,metalness:.2}));h.scale.set(1,1.1,1.15),h.position.set(0,.27,-.41),s.add(h);for(const v of[-1,1]){const g=new Z(new Mt(.34,.3,1.2),e);g.geometry.translate(0,0,0),g.position.set(v*.52,-.05,.05),g.scale.set(1,1,1),g.castShadow=!0,s.add(g);const m=new Z(new Mt(.3,.24,.08),n);m.position.set(v*.52,-.04,.66),s.add(m)}for(const v of[-1,1]){const g=new Z(new Mt(.02,.22,.5),n);g.position.set(v*.62,-.12,.85),g.rotation.y=v*.2,s.add(g)}s.add(jh({z:1.95,y:-.22,span:1.75,chord:.42,mat:n,tilt:.06,elements:2}));for(const v of[-1,1]){const g=new Z(new Mt(.04,.22,.1),n);g.position.set(v*.12,-.12,1.9),s.add(g)}s.add(jh({z:-1.95,y:.5,span:1.25,chord:.34,mat:n,tilt:-.34,elements:2}));for(const v of[-1,1]){const g=new Z(new Mt(.05,.7,.1),n);g.position.set(v*.18,.2,-1.95),s.add(g)}const d=fd(),u=new Z(new Mt(.08,.12,.05),d);u.position.set(0,.12,-2.06),u.userData.noMerge=!0,s.add(u);const f=new Z((()=>{const v=new te(.06,.06,.2,14);return v.rotateX(Math.PI/2),v})(),Sc());f.position.set(0,.06,-2.12),s.add(f);const p=Ec({y:-.28,w:.95,len:3.2});return p.position.z=-.1,s.add(p),{brakeLights:u}}const V_=Object.freeze(Object.defineProperty({__proto__:null,decorate:W_,keys:G_,wheelStyle:H_},Symbol.toStringTag,{value:"Module"})),Zh={gt:U_,muscle:k_,"open-wheel":V_},X_=-.37,Ra=new Map;function q_(s,t){return Ra.has(s)||Ra.set(s,t.keys?Kw(t.keys,{ringsPerSegment:9,profilePoints:16}):null),Ra.get(s)}function Y_(s="gt",t=13112861){const e=Zh[s]||Zh.gt,n=new ae,i=new ae;i.position.y=X_,n.add(i);const o=fs(t),r=q_(s,e);if(r){const l=new Z(r,o);l.castShadow=!0,l.receiveShadow=!0,l.userData.noMerge=!0,i.add(l)}const a=e.decorate(i,{color:t});pd(i);const c=[];for(let l=0;l<4;l++)c.push(T_(e.wheelStyle));return i.add(P_()),{root:n,wheels:c,brakeLights:a.brakeLights,_brakeLevel:0}}const Ca={x:.92,y:.32,z:2.18},qi=.36,j_=.32,Kh=2.9,Pt={massKg:1350,idleRpm:1100,redlineRpm:7600,shiftUpRpm:7250,shiftDownRpm:3300,shiftTime:.22,torqueCurve:[[1e3,320],[2200,430],[3500,505],[4900,540],[5900,525],[6800,500],[7300,472],[7600,440]],gears:[3.45,2.28,1.71,1.34,1.08,.9],reverseRatio:3.3,finalDrive:3.55,drivelineEff:.88,engineBrakeNm:36,engineInertia:.15,wheelInertia:.9,airDensity:1.225,cdA:.92,clA:2.1,downforcePos:-.25,crr:.014,mu:{road:1.45,kerb:1.22,grass:.55,gravel:.5},surfaceDrag:{road:0,kerb:0,grass:.12,gravel:.2},scrubCoef:.38,loadSensitivity:.14,loadMuClamp:.22,slipGripFloor:.86,brakeFront:50,brakeRear:28,handbrake:55,maxSteer:.62,steerSlipMargin:2,steerFloor:.02,maxReverseSpeed:8.5};function Z_(s){const t=Pt.torqueCurve;if(s<=t[0][0])return t[0][1];for(let e=1;e<t.length;e++)if(s<=t[e][0]){const n=(s-t[e-1][0])/(t[e][0]-t[e-1][0]);return t[e-1][1]+(t[e][1]-t[e-1][1])*n}return t[t.length-1][1]}function Pa(s,t,e){if(e<=1)return s;const n=1-Pt.loadSensitivity*(t/e-1),i=1-Pt.loadMuClamp,o=1+Pt.loadMuClamp;return s*Math.min(o,Math.max(i,n))}function Ed(s,t,e={}){const n=e.color??13112861,i=e.archetype??"gt",o=Y_(i,n),r=new ds(new A(Ca.x,Ca.y,Ca.z)),a=new Lt({mass:Pt.massKg,material:t.chassisMat});a.addShape(r,new A(0,.2,0)),a.shapeOffsets[0].y=-.05,a.angularDamping=.25;const c=new ZM({chassisBody:a,indexRightAxis:0,indexUpAxis:1,indexForwardAxis:2}),l={radius:qi,directionLocal:new A(0,-1,0),suspensionStiffness:46,suspensionRestLength:j_,frictionSlip:Pt.mu.road,dampingRelaxation:2.6,dampingCompression:4.8,maxSuspensionForce:1e5,rollInfluence:.05,axleLocal:new A(-1,0,0),chassisConnectionPointLocal:new A,maxSuspensionTravel:.3,customSlidingRotationalSpeed:-30,useCustomSlidingRotationalSpeed:!0,forwardAcceleration:.55},h=Kh/2,d=.86,u=-.05;[new A(d,u,h),new A(-d,u,h),new A(d,u,-h),new A(-d,u,-h)].forEach(P=>{c.addWheel({...l,chassisConnectionPointLocal:P})}),c.addToWorld(s);const p={gear:1,mode:"D",shiftT:0,rpm:Pt.idleRpm,engineRpm:Pt.idleRpm,wheelOmega:0,smoothedRpm:Pt.idleRpm,steer:0,surfaces:["road","road","road","road"],slip:0},v={rpm:Pt.idleRpm,rpmFrac:0,gearLabel:"N",speedKmh:0,slip:0};new A;const g=new A,m=new A,x=new A;function M(){const P=a.quaternion,U=2*(P.x*P.z+P.w*P.y),C=1-2*(P.x*P.x+P.y*P.y),D=a.velocity;return D.x*U+D.z*C}function y(){const P=a.quaternion,U=1-2*(P.y*P.y+P.z*P.z),C=2*(P.x*P.z-P.w*P.y),D=a.velocity;return D.x*U+D.z*C}function w(){const P=a.velocity,U=P.x*P.x+P.y*P.y+P.z*P.z,C=Math.sqrt(U);if(C>.5){const H=.5*Pt.airDensity*Pt.cdA*U;g.set(-P.x/C*H,-P.y/C*H,-P.z/C*H),a.applyForce(g,A.ZERO)}const D=P.x*P.x+P.z*P.z,F=.5*Pt.airDensity*Pt.clA*D;if(F>1){const H=a.quaternion;x.set(2*(H.x*H.y-H.w*H.z),1-2*(H.x*H.x+H.z*H.z),2*(H.y*H.z+H.w*H.x)),g.set(-x.x*F,-x.y*F,-x.z*F);const X=Pt.downforcePos;m.set(2*(H.x*H.z+H.w*H.y)*X,2*(H.y*H.z-H.w*H.x)*X,(1-2*(H.x*H.x+H.y*H.y))*X),a.applyForce(g,m)}let V=0;for(let H=0;H<4;H++){const X=c.wheelInfos[H];if(!X.isInContact)continue;V+=X.suspensionForce;const W=Pt.surfaceDrag[p.surfaces[H]]||0;if(W>0&&C>.5){const et=W*X.suspensionForce;g.set(-P.x/C*et,0,-P.z/C*et),m.set(X.raycastResult.hitPointWorld.x-a.position.x,0,X.raycastResult.hitPointWorld.z-a.position.z),a.applyForce(g,m)}}if(C>.5&&V>0){const H=Pt.crr*V;g.set(-P.x/C*H,0,-P.z/C*H),a.applyForce(g,A.ZERO)}const G=M(),B=y();if(Math.hypot(G,B)>4){const H=Math.atan2(Math.abs(B),Math.abs(G));if(H>.035){const X=Pt.scrubCoef*Math.sin(H)*Math.max(V,1);g.set(-P.x/C*X,0,-P.z/C*X),a.applyForce(g,A.ZERO)}}}s.addEventListener("preStep",w);function S(P,U,C){if(C)for(let St=0;St<4;St++)p.surfaces[St]=C[St];const D=M(),F=Math.hypot(a.velocity.x,a.velocity.z),V=[0,0,0,0];let G=0,B=0;for(let St=0;St<4;St++){const At=c.wheelInfos[St].suspensionForce||0;V[St]=At,At>0&&(G+=At,B+=1)}const q=B>0?G/B:Pt.massKg*9.82/4;p.mode==="D"&&P.brake>.1&&D<.5&&F<1?(p.mode="R",p.gear=1):p.mode==="R"&&P.throttle>.1&&D>-.5&&(p.mode="D",p.gear=1);const H=St=>Pt.gears[St-1]*Pt.finalDrive;p.shiftT>0&&(p.shiftT-=U);const X=p.mode==="D"?H(p.gear):Pt.reverseRatio*Pt.finalDrive,W=Math.abs(D)/(2*Math.PI*qi),et=Xe.clamp(W*60*X,Pt.idleRpm,Pt.redlineRpm);p.mode==="D"&&p.shiftT<=0&&(et>Pt.shiftUpRpm&&p.gear<Pt.gears.length?(p.gear+=1,p.shiftT=Pt.shiftTime):et<Pt.shiftDownRpm&&p.gear>1&&(p.gear-=1,p.shiftT=Pt.shiftTime*.6));const ut=p.mode==="D"?H(p.gear):Pt.reverseRatio*Pt.finalDrive,dt=p.mode==="D"?P.throttle:P.brake,it=p.mode==="D"?P.brake:P.throttle,ht=dt>.02&&p.shiftT<=0;let ft;ht?ft=Z_(p.engineRpm)*dt:ft=-Pt.engineBrakeNm*(p.engineRpm/Pt.redlineRpm)*(D>1||p.engineRpm>Pt.idleRpm+50?1:0);const pt=p.mode==="R"?-1:1,_t=ft*ut*Pt.drivelineEff/qi*pt,z=a.angularVelocity.y,ct=Math.abs(F*z),K=V[2],lt=V[3],tt=Pa(Pt.mu[p.surfaces[2]]??Pt.mu.road,K,q)*K+Pa(Pt.mu[p.surfaces[3]]??Pt.mu.road,lt,q)*lt,Rt=Pt.massKg*ct*.5*1.3;let xt=tt*tt-Rt*Rt;if(xt=xt>0?Math.sqrt(xt):0,p.slip>.14){const St=Xe.clamp((p.slip-.14)/.5,0,1);xt*=Xe.lerp(1,Pt.slipGripFloor,St)}let I=_t;K+lt>100&&(I=_t>=0?Math.min(_t,xt):Math.max(_t,-xt)),p.mode==="R"&&-D>Pt.maxReverseSpeed&&(I=0);const R=Math.abs(D)/qi,Y=Pt.redlineRpm/60*2*Math.PI/ut;if(ht&&K+lt>100&&Math.abs(_t)>xt+1){const St=Pt.engineInertia*ut*ut+2*Pt.wheelInertia,At=Math.abs(ft)*ut*Pt.drivelineEff,Ht=Math.abs(I)*qi;p.wheelOmega<R&&(p.wheelOmega=R),p.wheelOmega+=(At-Ht)/St*U,p.wheelOmega=Xe.clamp(p.wheelOmega,R,Y)}else p.wheelOmega=R;p.engineRpm=Xe.clamp(Math.max(p.wheelOmega*ut*60/(2*Math.PI),Pt.idleRpm),Pt.idleRpm,Pt.redlineRpm),p.rpm=p.engineRpm;const ot=p.wheelOmega*qi;p.slip=(ot-Math.abs(D))/Math.max(2.5,Math.abs(D));let st=0;it>.02&&(p.mode==="D"&&D>.5||p.mode==="R"&&D<-.5)&&(st=it),c.applyEngineForce(-I/2,2),c.applyEngineForce(-I/2,3);const yt=Pt.brakeFront*st;let gt=Pt.brakeRear*st;P.handbrake&&(gt=Math.max(gt,Pt.handbrake)),c.setBrake(yt,0),c.setBrake(yt,1),c.setBrake(gt,2),c.setBrake(gt,3);const bt=Pt.mu.road*9.82*Pt.steerSlipMargin,Nt=Math.max(1,F*F),Ft=Math.min(Pt.maxSteer,bt*Kh/Nt+Pt.steerFloor),at=-P.steer*Ft,Zt=4*Math.max(Ft,.12),Xt=Xe.clamp(at-p.steer,-Zt*U,Zt*U);p.steer+=Xt,c.setSteeringValue(p.steer,0),c.setSteeringValue(p.steer,1);for(let St=0;St<4;St++){let At=Pa(Pt.mu[p.surfaces[St]]??Pt.mu.road,V[St],q);P.handbrake&&St>=2&&(At*=.55),c.wheelInfos[St].frictionSlip=At}p.smoothedRpm+=(p.rpm-p.smoothedRpm)*Math.min(1,U*12),v.rpm=p.smoothedRpm,v.rpmFrac=Xe.clamp((p.smoothedRpm-Pt.idleRpm)/(Pt.redlineRpm-Pt.idleRpm),0,1),v.speedKmh=F*3.6,v.slip=p.slip,F<.6&&dt<.05?v.gearLabel="N":p.mode==="R"?v.gearLabel="R":v.gearLabel=String(p.gear);const Bt=Math.min(1,Math.max(st,P.handbrake?.8:0));_(Bt*1.6)}const b=o.wheels;function T(){for(let P=0;P<c.wheelInfos.length;P++){c.updateWheelTransform(P);const U=c.wheelInfos[P].worldTransform,C=b[P];C.position.copy(U.position),C.quaternion.copy(U.quaternion)}o.root.position.copy(a.position),o.root.quaternion.copy(a.quaternion),o.brakeLights.material.emissiveIntensity=o._brakeLevel,o.brakeLights.material.opacity=.5+o._brakeLevel*.5}function _(P){o._brakeLevel=P}function E(P,U=0){a.position.set(P.x,P.y,P.z),a.velocity.setZero(),a.angularVelocity.setZero();const C=new ve;C.setFromAxisAngle(new A(0,1,0),U),a.quaternion.copy(C),p.gear=1,p.mode="D",p.shiftT=0,p.steer=0,p.rpm=Pt.idleRpm,p.engineRpm=Pt.idleRpm,p.wheelOmega=0,p.smoothedRpm=Pt.idleRpm,p.slip=0,c.applyEngineForce(0,2),c.applyEngineForce(0,3),c.setSteeringValue(0,0),c.setSteeringValue(0,1);for(let D=0;D<4;D++)c.setBrake(0,D)}function L(){s.removeEventListener("preStep",w),c.removeFromWorld(s),s.removeBody(a)}return{visual:o,body:a,vehicle:c,update:T,setBrakeLight:_,reset:E,applyControls:S,dispose:L,telemetry:v,spec:Pt}}function K_(s){const t=new Set,e={throttle:0,brake:0,steer:0,handbrake:!1,cameraToggle:!1,reset:!1,rescue:!1,lineToggle:!1},n=$_(s),i=u=>{t.add(u.code),ar(u.code,s.cameraToggle)&&(e.cameraToggle=!0),ar(u.code,s.reset)&&(e.reset=!0),ar(u.code,s.rescue)&&(e.rescue=!0),ar(u.code,s.lineToggle)&&(e.lineToggle=!0),n.has(u.code)&&u.preventDefault()},o=u=>t.delete(u.code),r=()=>t.clear();window.addEventListener("keydown",i),window.addEventListener("keyup",o),window.addEventListener("blur",r);function a(u){const f=Ps(t,s.throttle),p=Ps(t,s.brake),v=Ps(t,s.left),g=Ps(t,s.right);e.handbrake=Ps(t,s.handbrake),e.throttle=La(e.throttle,f?1:0,u*(f?4:6)),e.brake=La(e.brake,p?1:0,u*(p?6:8));let m=0;return v&&(m-=1),g&&(m+=1),e.steer=La(e.steer,m,u*(m===0?6:3.2)),e}function c(){const u=e.cameraToggle;return e.cameraToggle=!1,u}function l(){const u=e.reset;return e.reset=!1,u}function h(){const u=e.rescue;return e.rescue=!1,u}function d(){const u=e.lineToggle;return e.lineToggle=!1,u}return{update:a,consumeToggle:c,consumeReset:l,consumeRescue:h,consumeLineToggle:d,state:e}}const Jh={throttle:["KeyW","ArrowUp"],brake:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],handbrake:"Space",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},J_={throttle:"KeyW",brake:"KeyS",left:"KeyA",right:"KeyD",handbrake:"ShiftLeft",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},Q_={throttle:"ArrowUp",brake:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",handbrake:"Numpad0",cameraToggle:null,reset:null,rescue:null,lineToggle:null};function Ps(s,t){return t?Array.isArray(t)?t.some(e=>s.has(e)):s.has(t):!1}function ar(s,t){return t?Array.isArray(t)?t.includes(s):s===t:!1}function $_(s){const t=new Set;for(const e of Object.values(s))e&&(Array.isArray(e)?e.forEach(n=>t.add(n)):t.add(e));return t}function La(s,t,e){const n=1-Math.exp(-e);return s+(t-s)*n}function tS(s){let t=0;const e=new O,n=new O,i=new O,o=new O;let r=!1;const a=new Ge;new O;const c=new O,l=new O,h=new O(0,1,0),d=[{dist:7.2,height:2.7,lookHeight:1,fov:62,lag:.18},{dist:0,height:1.05,lookHeight:1.05,fov:72,lag:.04,hood:!0},{dist:10,height:4,lookHeight:1.2,fov:56,lag:.32}];function u(p,v,g){const m=d[t];if(s.fov+=(m.fov-s.fov)*Math.min(1,p*6),s.updateProjectionMatrix(),a.set(v.quaternion.x,v.quaternion.y,v.quaternion.z,v.quaternion.w),c.set(0,0,1).applyQuaternion(a).normalize(),l.crossVectors(h,c).normalize(),m.hood)e.set(v.position.x,v.position.y+m.height,v.position.z).add(c.clone().multiplyScalar(.25)),n.copy(e).add(c.clone().multiplyScalar(8));else{const M=m.dist+Math.min(2.5,g*.04),y=m.height+Math.min(.8,g*.012);e.copy(v.position).add(c.clone().multiplyScalar(-M)).add(h.clone().multiplyScalar(y)),n.copy(v.position).add(c.clone().multiplyScalar(2)).add(h.clone().multiplyScalar(m.lookHeight))}r||(i.copy(e),o.copy(n),r=!0);const x=1-Math.exp(-p/Math.max(.001,m.lag));i.lerp(e,x),o.lerp(n,Math.min(1,x*1.4)),s.position.copy(i),s.lookAt(o)}function f(){t=(t+1)%d.length,r=!1}return{update:u,cycle:f,getMode:()=>t}}function eS(s=320){const t=document.getElementById("rpm-arc"),e=document.getElementById("speed-num"),n=document.getElementById("gear-num"),i=document.getElementById("lap-current"),o=document.getElementById("lap-total"),r=document.getElementById("lap-time"),a=document.getElementById("best-time"),c=document.getElementById("hud-position-block"),l=document.getElementById("pos-current"),h=document.getElementById("pos-total"),d=document.getElementById("race-banner"),u=document.getElementById("wrong-way"),f=document.getElementById("pace-pill"),p=document.getElementById("pace-target"),v=document.getElementById("pace-delta");let g=null;const m=document.getElementById("ticks"),x=110,M=110,y=96,w=Math.PI*.75,S=Math.PI*.25+Math.PI*2;for(let it=0;it<=16;it++){const ht=it/16,ft=w+(S-w)*ht,pt=x+Math.cos(ft)*(y-2),_t=M+Math.sin(ft)*(y-2),z=x+Math.cos(ft)*(y-(it%4===0?16:9)),ct=M+Math.sin(ft)*(y-(it%4===0?16:9)),K=document.createElementNS("http://www.w3.org/2000/svg","line");K.setAttribute("x1",pt),K.setAttribute("y1",_t),K.setAttribute("x2",z),K.setAttribute("y2",ct),K.setAttribute("stroke",it%4===0?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.35)"),K.setAttribute("stroke-width",it%4===0?"2":"1"),m.appendChild(K)}const b=document.getElementById("minimap"),T=b.getContext("2d");let _=null,E=null,L=null;function P(it,ht,ft){const pt=ft!=null?Math.max(0,Math.min(1,ft)):Math.max(0,Math.min(1,it/s)),_t=w,z=w+(S-w)*pt,ct=x+Math.cos(_t)*y,K=M+Math.sin(_t)*y,lt=x+Math.cos(z)*y,tt=M+Math.sin(z)*y,Rt=z-_t>Math.PI?1:0;t.setAttribute("d",`M ${ct} ${K} A ${y} ${y} 0 ${Rt} 1 ${lt} ${tt}`),e.textContent=Math.round(it),n.textContent=ht}function U(it,ht){i.textContent=it,o.textContent=ht}function C(it){r.textContent=Qh(it)}function D(it){a.textContent=it==null?"--:--.---":Qh(it)}function F(it,ht){c.classList.remove("hidden"),l.textContent=it,h.textContent=ht}function V(){c.classList.add("hidden")}function G(it,ht=1800){d.textContent=it,d.classList.remove("hidden"),g&&clearTimeout(g),g=setTimeout(()=>{d.classList.add("hidden"),g=null},ht)}function B(it){u.classList.toggle("hidden",!it)}function q(it,ht){f.classList.remove("hidden"),p.textContent=Math.round(it);let ft,pt;ht>3?(ft="pace-over",pt=`+${Math.round(ht)} TOO FAST`):ht<-8?(ft="pace-under",pt=`−${Math.round(-ht)} COULD GO FASTER`):(ft="pace-on",pt="ON PACE"),v.textContent=pt,v.className=ft}function H(){f.classList.add("hidden")}function X(){g&&(clearTimeout(g),g=null),d.classList.add("hidden"),u.classList.add("hidden")}function W(){document.getElementById("ui").classList.remove("hidden")}function et(){document.getElementById("ui").classList.add("hidden")}function ut(it){const ht=it.frames;let ft=1/0,pt=-1/0,_t=1/0,z=-1/0;for(const yt of ht)yt.pos.x<ft&&(ft=yt.pos.x),yt.pos.x>pt&&(pt=yt.pos.x),yt.pos.z<_t&&(_t=yt.pos.z),yt.pos.z>z&&(z=yt.pos.z);const ct=18,K=b.width,lt=b.height,tt=pt-ft,Rt=z-_t,xt=(K-ct*2)/tt,I=(lt-ct*2)/Rt,R=Math.min(xt,I),Y=(K-tt*R)/2-ft*R,rt=(lt-Rt*R)/2-_t*R;_={minX:ft,maxX:pt,minZ:_t,maxZ:z,scale:R,ox:Y,oz:rt};const ot=new Path2D;for(let yt=0;yt<ht.length;yt++){const gt=ht[yt].pos.x*R+Y,bt=ht[yt].pos.z*R+rt;yt===0?ot.moveTo(gt,bt):ot.lineTo(gt,bt)}ot.closePath(),E=ot;const st=ht[0];L={x:st.pos.x*R+Y,y:st.pos.z*R+rt}}function dt(it){if(!E)return;const ht=b.width,ft=b.height;T.clearRect(0,0,ht,ft),T.lineWidth=12,T.lineJoin="round",T.lineCap="round",T.strokeStyle="rgba(255, 255, 255, 0.10)",T.stroke(E),T.lineWidth=6,T.strokeStyle="rgba(220, 230, 240, 0.85)",T.stroke(E),L&&(T.fillStyle="rgba(255, 215, 74, 0.9)",T.beginPath(),T.arc(L.x,L.y,4,0,Math.PI*2),T.fill(),T.strokeStyle="rgba(0, 0, 0, 0.6)",T.lineWidth=1,T.stroke());const pt=[...it].sort((_t,z)=>(_t.isPlayer?1:0)-(z.isPlayer?1:0));for(const _t of pt){const z=_t.pos.x*_.scale+_.ox,ct=_t.pos.z*_.scale+_.oz,K=_t.isPlayer?5:4;T.beginPath(),T.arc(z,ct,K+2,0,Math.PI*2),T.fillStyle="rgba(0, 0, 0, 0.55)",T.fill(),T.beginPath(),T.arc(z,ct,K,0,Math.PI*2),T.fillStyle=nS(_t.color),T.fill(),_t.isPlayer&&(T.strokeStyle="#fff",T.lineWidth=1.4,T.stroke())}}return{setSpeed:P,setLap:U,setLapTime:C,setBest:D,setPosition:F,hidePosition:V,setPace:q,hidePace:H,flashBanner:G,setWrongWay:B,clearAnnouncements:X,show:W,hide:et,buildMinimap:ut,drawMinimap:dt}}function nS(s){const t=s>>16&255,e=s>>8&255,n=s&255;return`rgb(${t}, ${e}, ${n})`}function Qh(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3;return`${Ia(e,2)}:${Ia(n,2)}.${Ia(i,3)}`}function Ia(s,t){return s.toString().padStart(t,"0")}function Td(s,t={}){const e=t.skill??.85,n=9.82*1.45*(.62+.3*e),i=8.5,o=46+14*e,r={throttle:0,brake:0,steer:0,handbrake:!1},a=s.frames,c=a.length,l=new Float32Array(c);for(let x=0;x<c;x++)l[x]=a[x].pos.distanceTo(a[(x+1)%c].pos);const h=new Float32Array(c);for(let x=0;x<c;x++){const M=a[x].tan,y=a[(x+1)%c].tan,w=Math.max(0,1-M.dot(y)),S=Math.sqrt(2*w);h[x]=S/Math.max(.5,l[x])}const d=new Float32Array(c);for(let x=0;x<c;x++){let M=0;for(let y=-2;y<=2;y++)M+=h[(x+y+c)%c];d[x]=M/5}const u=new Float32Array(c);for(let x=0;x<c;x++)u[x]=Math.min(o,Math.sqrt(n/Math.max(1e-4,d[x])));for(let x=0;x<2;x++)for(let M=c-1;M>=0;M--){const y=u[(M+1)%c],w=Math.sqrt(y*y+2*i*l[M]);u[M]>w&&(u[M]=w)}const f=new O,p=new O;let v=0,g=0;function m(x,M,y=1/60){const w=x.body.position,S=iS(a,w),b=Math.hypot(x.body.velocity.x,x.body.velocity.z),T=2+Math.floor(b/18);let _=1/0;for(let dt=0;dt<=T;dt++)_=Math.min(_,u[(S+dt)%c]);const E=Math.max(7,b*.55);let L=S,P=0;for(;P<E;)P+=l[L%c],L++;const U=a[L%c].pos,C=x.body.quaternion,D=2*(C.x*C.z+C.w*C.y),F=1-2*(C.x*C.x+C.y*C.y);p.set(D,0,F).normalize(),f.set(U.x-w.x,0,U.z-w.z);const V=Math.max(2,f.length());f.normalize();const G=Xe.clamp(p.dot(f),-1,1),B=Math.acos(G),H=p.x*f.z-p.z*f.x<0?-B:B,W=2*Math.sin(H)/V*2.9,et=Math.max(1,b*b),ut=Math.min(.62,1.45*9.82*2*2.9/et+.02);if(r.steer=Xe.clamp(W/ut,-1,1),b<_-.5){const dt=Math.min(1,Math.abs(r.steer));r.throttle=Xe.lerp(1,.55,dt*.7),r.brake=0}else b>_+1?(r.throttle=0,r.brake=Xe.clamp((b-_)/6,.2,1)):(r.throttle=.35,r.brake=0);if(M)for(const dt of M){if(!dt||dt===x)continue;const it=dt.body.position.x-w.x,ht=dt.body.position.z-w.z,ft=it*p.x+ht*p.z,pt=-it*p.z+ht*p.x,_t=Math.max(12,b*.95);if(ft<1||ft>_t||Math.abs(pt)>2.4)continue;const z=dt.body.velocity,ct=b-Math.hypot(z.x,z.z);if(ft<6.5)r.throttle=0,r.brake=Math.max(r.brake,ct>1?1:.5);else if(ct>0){const K=ct*ct/(2*Math.max(1,ft-6));r.brake=Math.max(r.brake,Xe.clamp(K/6,0,1)),(r.brake>.1||ft<b*.45)&&(r.throttle=Math.min(r.throttle,.35))}Math.abs(r.steer)<.5&&(r.steer=Xe.clamp(r.steer+(pt>=0?-.15:.15),-1,1))}return g>0?(g-=y,r.throttle=0,r.brake=1,r.steer=-r.steer):(b<1.5&&r.throttle>.5?v+=y:v=Math.max(0,v-y*2),v>1.2&&(v=0,g=1.5)),r}return{update:m}}function iS(s,t){let e=0,n=1/0;for(let i=0;i<s.length;i++){const o=s[i].pos.x-t.x,r=s[i].pos.z-t.z,a=o*o+r*r;a<n&&(n=a,e=i)}return e}const sS=13,oS=10,rS=7.5,aS=71,cS=215e3,Ad=1350,lS=.5*1.225*.92,hS=.014*Ad*9.82,uS=.55,$h=.045,dS=[1,.13,.1],cr=[.93,.95,.97],fS=[.1,.95,.32];function tu(s,t){const e=t.frames,n=t.racingLineOffset,i=e.length,o=[];for(let w=0;w<i;w++){const S=e[w];o.push(new O(S.pos.x+S.left.x*n[w],S.pos.y,S.pos.z+S.left.z*n[w]))}const r=new Float32Array(i);for(let w=0;w<i;w++)r[w]=Math.max(.5,o[w].distanceTo(o[(w+1)%i]));const a=new Float32Array(i);for(let w=0;w<i;w++){const S=o[(w-1+i)%i],b=o[w],T=o[(w+1)%i],_=b.x-S.x,E=b.z-S.z,L=T.x-b.x,P=T.z-b.z,U=Math.hypot(_,E),C=Math.hypot(L,P),D=(_*L+E*P)/Math.max(1e-6,U*C),F=Math.acos(Math.min(1,Math.max(-1,D)));a[w]=F/Math.max(.5,(U+C)/2)}const c=new Float32Array(i);for(let w=0;w<i;w++){let S=0;for(let b=-2;b<=2;b++)S+=a[(w+b+i)%i];c[w]=S/5}const l=new Float32Array(i);for(let w=0;w<i;w++)l[w]=Math.min(aS,Math.sqrt(sS/Math.max(1e-4,c[w])));for(let w=0;w<2;w++)for(let S=i-1;S>=0;S--){const b=l[(S+1)%i],T=Math.sqrt(b*b+2*oS*r[S]);l[S]>T&&(l[S]=T)}const h=w=>Math.min(rS,Math.max(0,(cS/Math.max(8,w)-lS*w*w-hS)/Ad));for(let w=0;w<2;w++)for(let S=0;S<i;S++){const b=(S+1)%i,T=Math.sqrt(l[S]*l[S]+2*h(l[S])*r[S]);l[b]>T&&(l[b]=T)}const d=new Float32Array(i*2*3),u=new Float32Array(i*2*3),f=uS/2;for(let w=0;w<i;w++){const S=e[w],b=o[w];d.set([b.x+S.left.x*f,b.y+$h,b.z+S.left.z*f],w*6),d.set([b.x-S.left.x*f,b.y+$h,b.z-S.left.z*f],w*6+3),u.set(cr,w*6),u.set(cr,w*6+3)}const p=[];for(let w=0;w<i;w++){const S=w*2,b=w*2+1,T=(w+1)%i*2,_=(w+1)%i*2+1;p.push(S,T,b,b,T,_)}const v=new he;v.setAttribute("position",new ie(d,3));const g=new ie(u,3);g.setUsage(Tf),v.setAttribute("color",g),v.setIndex(p);const m=new Z(v,new Ei({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));m.renderOrder=3,m.visible=!1,s.add(m);function x(w){const S=g.array;for(let b=0;b<i;b++){const T=l[b]-w;let _,E,L;T<=1?(_=dS,E=cr,L=Math.max(0,(T+1)/2)):(_=cr,E=fS,L=Math.min(1,(T-1)/2));const P=_[0]+(E[0]-_[0])*L,U=_[1]+(E[1]-_[1])*L,C=_[2]+(E[2]-_[2])*L,D=b*6;S[D]=P,S[D+1]=U,S[D+2]=C,S[D+3]=P,S[D+4]=U,S[D+5]=C}g.needsUpdate=!0}function M(w){m.visible=w}function y(){s.remove(m),m.geometry.dispose(),m.material.dispose()}return{profile:l,update:x,setVisible:M,mesh:m,dispose:y}}const pS=3,mS=320;function gS(s){return s==="time-trial"?1:pS}const Da=13112861,vS=2059519,xS=[16436245,366185,15357964],Na="gt",MS="muscle",yS=["open-wheel","gt","muscle"];wS();async function wS(){const s=document.getElementById("loading-status"),t=document.getElementById("loading-fill"),e=(M,y)=>{t.style.width=`${Math.round(M*100)}%`,y&&(s.textContent=y)};e(.05,"Booting renderer"),await Ls();const n=document.getElementById("game"),{renderer:i,scene:o,camera:r,composer:a,updateShadowTarget:c}=qx(n);e(.25,"Building physics world"),await Ls();const{world:l,materials:h}=Hy();e(.45,"Laying asphalt"),await Ls();const d=Nh(o,l,h,jw(Oh));e(.7,"Calibrating telemetry"),await Ls();const u=eS(mS);u.buildMinimap(d);const f=tu(o,d),p=new rn(62,window.innerWidth/window.innerHeight,.6,3e3);o.add(p),e(1,"Ready"),await Ls(),document.getElementById("loading").classList.add("fade");const v={renderer:i,scene:o,camera:r,camera2:p,composer:a,world:l,materials:h,track:d,hud:u,racingLine:f,selectedTrackId:Oh,lineAid:!1,updateShadowTarget:c,cars:[],primaryPlayerIdx:0,mode:null,state:null};typeof window<"u"&&(window.__ctx=v,window.__createAIDriver=Td,window.__tick=M=>iu(v,M,performance.now())),document.querySelectorAll("button.mode").forEach(M=>{M.addEventListener("click",()=>{const y=M.dataset.mode;eu(v,y)})}),document.getElementById("finish-restart").addEventListener("click",()=>{v.mode&&eu(v,v.mode)}),document.getElementById("finish-menu").addEventListener("click",()=>{nu(v)}),window.addEventListener("keydown",M=>{M.code==="Escape"&&v.mode&&nu(v)});function g(M){v.track.dispose(),v.racingLine.dispose(),v.track=Nh(o,l,h,M),v.racingLine=tu(o,v.track),v.racingLine.setVisible(!1),v.hud.buildMinimap(v.track),v.selectedTrackId=M.id}SS(document.getElementById("track-list"),v,g),Rd();let m=performance.now();function x(M){requestAnimationFrame(x);const y=Math.min(.05,(M-m)/1e3);m=M,v.mode&&iu(v,y,M)}requestAnimationFrame(x)}function Rd(){document.getElementById("menu").classList.remove("hidden")}function _S(){document.getElementById("menu").classList.add("hidden")}function SS(s,t,e){if(!s)return;s.innerHTML="";const n=[];for(const i of tc){const o=document.createElement("button");o.className="track-card"+(i.id===t.selectedTrackId?" selected":""),o.dataset.track=i.id;const r=i.difficulty.toLowerCase().replace(/[^a-z]/g,"");o.innerHTML=`<div class="track-head"><span class="track-name">${i.name}</span><span class="track-diff diff-${r}">${i.difficulty}</span></div><div class="track-sub">${i.subtitle}</div><div class="track-blurb">${i.blurb}</div>`,o.addEventListener("click",()=>{t.selectedTrackId!==i.id&&(n.forEach(a=>a.classList.remove("selected")),o.classList.add("selected"),e(i))}),s.appendChild(o),n.push(o)}}function eu(s,t){if(Cd(s),s.mode=t,s.primaryPlayerIdx=0,s.state=TS(t),t==="time-trial")lr(s,Jh,Da,0,Na),s.hud.hidePosition();else if(t==="quick-race"){lr(s,Jh,Da,0,Na);for(let e=0;e<3;e++)AS(s,xS[e],e+1,.78+e*.04,yS[e]);s.hud.setPosition(1,s.cars.length)}else t==="two-player"&&(lr(s,J_,Da,0,Na),lr(s,Q_,vS,1,MS),s.hud.hidePosition());s.lineAid=t!=="two-player",s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace(),s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),Tc(),_S(),s.hud.show()}function nu(s){Cd(s),s.mode=null,s.state=null,s.racingLine.setVisible(!1),s.hud.hide(),s.hud.hidePosition(),s.hud.hidePace(),s.hud.clearAnnouncements(),Tc(),Rd()}function bS(s,t){return[...s.cars].sort((n,i)=>i.state.progress-n.state.progress).indexOf(t)+1}function ES(s){const t=s.cars[s.primaryPlayerIdx],e=t.state;let n="FINISHED",i="";if(s.mode==="time-trial")i=`LAP TIME   ${Ua(e.bestMs)}`;else if(s.mode==="quick-race"){const o=bS(s,t);n=o===1?"YOU WIN":`FINISHED  P${o}/${s.cars.length}`,i=`RACE TIME   ${Ua(e.finishMs)}`}else if(s.mode==="two-player"){const o=s.state.finishOrder[0];n=o&&o.label==="P2"?"PLAYER 2 WINS":"PLAYER 1 WINS",i=`TIME   ${Ua(o?o.state.finishMs:e.finishMs)}`}document.getElementById("finish-title").textContent=n,document.getElementById("finish-detail").textContent=i,document.getElementById("finish").classList.remove("hidden")}function Tc(){document.getElementById("finish").classList.add("hidden")}function Ua(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3,o=(r,a)=>r.toString().padStart(a,"0");return`${o(e,2)}:${o(n,2)}.${o(i,3)}`}function TS(s){return{mode:s,totalLaps:gS(s),finishOrder:[],finishShown:!1,perCar:[]}}function Ac(){const s=performance.now();return{lap:1,bestMs:null,lapStart:s,raceStart:s,finishMs:null,lastT:0,sectorReached:!1,finished:!1,progress:0}}function lr(s,t,e,n,i="gt"){const o=Ed(s.world,s.materials,{color:e,archetype:i});s.scene.add(o.visual.root),o.visual.wheels.forEach(l=>s.scene.add(l));const r=Rc(s.track,n);o.reset(r.position,r.yaw);const a=K_(t),c=tS(n===0?s.camera:s.camera2);s.cars.push({car:o,color:e,isPlayer:!0,input:a,chase:c,state:Ac(),label:n===0?"P1":"P2"}),s.state.perCar.push(s.cars[s.cars.length-1])}function AS(s,t,e,n,i="gt"){const o=Ed(s.world,s.materials,{color:t,archetype:i});s.scene.add(o.visual.root),o.visual.wheels.forEach(c=>s.scene.add(c));const r=Rc(s.track,e);o.reset(r.position,r.yaw);const a=Td(s.track,{skill:n});s.cars.push({car:o,color:t,isPlayer:!1,ai:a,state:Ac(),label:"AI"}),s.state.perCar.push(s.cars[s.cars.length-1])}function Rc(s,t){const e=-2.8-t*7,n=(t%2===0?1:-1)*2.5,i=s.frames[0];return{position:new O().copy(i.pos).add(i.tan.clone().multiplyScalar(e)).add(i.left.clone().multiplyScalar(n)).add(new O(0,1,0)),yaw:Math.atan2(i.tan.x,i.tan.z)}}function Cd(s){for(const t of s.cars)t.car.dispose(),s.scene.remove(t.car.visual.root),t.car.visual.wheels.forEach(e=>s.scene.remove(e));s.cars=[]}const Fa=1/120;let Oa=0;function iu(s,t,e){Oa+=t;const n=window.innerWidth,i=window.innerHeight;if(s.mode==="two-player"){const l=Math.floor(n/2);s.camera.aspect=l/i,s.camera2.aspect=(n-l)/i}else s.camera.aspect=n/i;const o=s.cars.map(l=>l.car);for(const l of s.cars){let h;if(l.isPlayer){if(h=l.input.update(t),l.input.consumeToggle()&&l.chase.cycle(),l.input.consumeLineToggle()&&s.mode!=="two-player"&&(s.lineAid=!s.lineAid,s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace()),l.input.consumeReset()){for(const d of s.cars){const u=s.cars.indexOf(d),f=Rc(s.track,u);d.car.reset(f.position,f.yaw),d.state=Ac()}s.state.finishOrder=[],s.state.finishShown=!1,s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),Tc()}l.input.consumeRescue()&&nc(s.track,l.car)}else h=l.ai.update(l.car,o,t);l.car.applyControls(h,t,CS(s.track,l.car))}for(;Oa>=Fa;)s.world.step(Fa),Oa-=Fa;for(const l of s.cars)l.car.update();for(const l of s.cars)PS(s.track,l.car);const r=s.cars[s.primaryPlayerIdx];r&&s.updateShadowTarget(r.car.body.position);for(const l of s.cars){if(!l.isPlayer)continue;const h=l.car.body.velocity,d=Math.hypot(h.x,h.y,h.z)*3.6;l.chase.update(t,l.car.body,d)}const a=s.cars[s.primaryPlayerIdx];if(a&&a.isPlayer){const l=a.car.telemetry;if(s.hud.setSpeed(l.speedKmh,l.gearLabel,l.rpmFrac),LS(a,s.track,s.hud,s.state),s.hud.setWrongWay(!a.state.finished&&NS(s.track,a.car)),s.lineAid){const h=a.car.body.velocity,d=Math.hypot(h.x,h.z);s.racingLine.update(d);const u=s.racingLine.profile[to(s.track,a.car.body.position)];s.hud.setPace(u*3.6,(d-u)*3.6)}}for(const l of s.cars)l!==a&&IS(l,s.track,s.state);if(s.mode==="quick-race"){const h=[...s.cars].sort((d,u)=>u.state.progress-d.state.progress).indexOf(a)+1;s.hud.setPosition(h,s.cars.length)}(s.mode==="two-player"?s.state.finishOrder.length>=1:a&&a.state.finished)&&!s.state.finishShown&&(s.state.finishShown=!0,s.hud.setWrongWay(!1),ES(s)),s.hud.drawMinimap(s.cars.map(l=>({pos:l.car.body.position,color:l.color,isPlayer:l.isPlayer}))),s.mode!=="two-player"&&s.composer.passes.forEach(l=>{l.uniforms&&l.uniforms.uTime&&(l.uniforms.uTime.value=e*.001)}),s.mode==="two-player"?RS(s):s.composer.render()}function RS(s){const t=window.innerWidth,e=window.innerHeight,n=Math.floor(t/2);s.renderer.setScissorTest(!0),s.renderer.setViewport(0,0,n,e),s.renderer.setScissor(0,0,n,e),s.camera.aspect=n/e,s.camera.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera),s.renderer.setViewport(n,0,t-n,e),s.renderer.setScissor(n,0,t-n,e),s.camera2.aspect=(t-n)/e,s.camera2.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera2),s.renderer.setScissorTest(!1),s.renderer.setViewport(0,0,t,e),s.renderer.setScissor(0,0,t,e)}function Ls(){return new Promise(s=>requestAnimationFrame(()=>s()))}const hr=["road","road","road","road"];function CS(s,t){const e=s.frames,n=e.length,i=to(s,t.body.position);for(let o=0;o<4;o++){const r=t.vehicle.wheelInfos[o],a=r.isInContact?r.raycastResult.hitPointWorld:r.chassisConnectionPointWorld;let c=i,l=1/0;for(let f=-4;f<=4;f++){const p=(i+f+n)%n,v=e[p].pos.x-a.x,g=e[p].pos.z-a.z,m=v*v+g*g;m<l&&(l=m,c=p)}const h=e[c],d=Math.abs((a.x-h.pos.x)*h.left.x+(a.z-h.pos.z)*h.left.z),u=s.width/2;d<=u?hr[o]="road":d<=u+s.kerbWidth?hr[o]="kerb":hr[o]=s.isGravel&&s.isGravel(c)?"gravel":"grass"}return hr}function nc(s,t){const e=t.body.position,n=s.frames;let i=0,o=1/0;for(let h=0;h<n.length;h++){const d=n[h].pos.x-e.x,u=n[h].pos.z-e.z,f=d*d+u*u;f<o&&(o=f,i=h)}const r=(i+4)%n.length,a=n[r],c=new O(a.pos.x,a.pos.y+1,a.pos.z),l=Math.atan2(a.tan.x,a.tan.z);t.reset(c,l)}function PS(s,t){const e=t.body.position;if(e.y<-2){nc(s,t);return}const n=s.frames[to(s,e)];Math.abs((e.x-n.pos.x)*n.left.x+(e.z-n.pos.z)*n.left.z)>s.armcoOffset+2.5&&nc(s,t)}function Pd(s,t,e,n){const i=s.state;if(i.finished)return null;const o=DS(t,s.car.body.position);o>.4&&o<.6&&(i.sectorReached=!0);let r=null;if(i.sectorReached&&i.lastT>.92&&o<.08){const a=n-i.lapStart;if((i.bestMs==null||a<i.bestMs)&&(i.bestMs=a),i.sectorReached=!1,i.lap>=e.totalLaps)return i.finished=!0,i.finishMs=n-i.raceStart,e.finishOrder.push(s),i.lastT=o,i.progress=e.totalLaps+100-(e.finishOrder.length-1),"finish";i.lap+=1,i.lapStart=n,r=i.lap===e.totalLaps?"final":"lap"}return i.lastT=o,i.progress=i.lap-1+o,r}function LS(s,t,e,n){const i=s.state,o=i.bestMs,r=performance.now(),a=Pd(s,t,n,r);i.bestMs!==o&&e.setBest(i.bestMs),a==="finish"?(e.setLap(n.totalLaps,n.totalLaps),e.flashBanner("FINISH")):a==="final"?(e.setLap(i.lap,n.totalLaps),e.flashBanner("FINAL LAP")):a==="lap"&&(e.setLap(i.lap,n.totalLaps),e.flashBanner(`LAP ${i.lap} / ${n.totalLaps}`)),i.finished||e.setLapTime(r-i.lapStart)}function IS(s,t,e){Pd(s,t,e,performance.now())}function to(s,t){const e=s.frames;let n=0,i=1/0;for(let o=0;o<e.length;o++){const r=e[o].pos.x-t.x,a=e[o].pos.z-t.z,c=r*r+a*a;c<i&&(i=c,n=o)}return n}function DS(s,t){return to(s,t)/s.frames.length}function NS(s,t){const e=t.body.velocity,n=Math.hypot(e.x,e.z);if(n<5)return!1;const i=s.frames[to(s,t.body.position)].tan;return(e.x*i.x+e.z*i.z)/n<-.25}
