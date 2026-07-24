(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const o of i)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&n(r)}).observe(document,{childList:!0,subtree:!0});function e(i){const o={};return i.integrity&&(o.integrity=i.integrity),i.referrerPolicy&&(o.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?o.credentials="include":i.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function n(i){if(i.ep)return;i.ep=!0;const o=e(i);fetch(i.href,o)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const Ja="160",Rd=0,Pl=1,Pd=2,$h=1,tu=2,On=3,ei=0,je=1,Ae=2,Oe=0,Ki=1,Pa=2,Ll=3,La=4,eu=5,vn=100,Ld=101,Id=102,Il=103,Dl=104,As=200,Dd=201,Nd=202,Ud=203,Ia=204,Da=205,Na=206,Fd=207,Ua=208,Od=209,zd=210,Bd=211,kd=212,Gd=213,Hd=214,Wd=0,Vd=1,Xd=2,ir=3,qd=4,Yd=5,jd=6,Zd=7,nu=0,Kd=1,Jd=2,$n=0,iu=1,su=2,ou=3,Qa=4,Qd=5,ru=6,au=300,ts=301,es=302,Fa=303,Oa=304,pr=306,ye=1e3,xn=1001,za=1002,Se=1003,Nl=1004,Cr=1005,Je=1006,$d=1007,ns=1008,Bn=1009,tf=1010,ef=1011,$a=1012,lu=1013,Kn=1014,Jn=1015,sn=1016,cu=1017,hu=1018,ti=1020,nf=1021,cn=1023,sf=1024,of=1025,gi=1026,yi=1027,rf=1028,uu=1029,af=1030,du=1031,fu=1033,Rr=33776,Pr=33777,Lr=33778,Ir=33779,Ul=35840,Fl=35841,Ol=35842,zl=35843,pu=36196,Bl=37492,kl=37496,Gl=37808,Hl=37809,Wl=37810,Vl=37811,Xl=37812,ql=37813,Yl=37814,jl=37815,Zl=37816,Kl=37817,Jl=37818,Ql=37819,$l=37820,tc=37821,Dr=36492,ec=36494,nc=36495,lf=36283,ic=36284,sc=36285,oc=36286,mu=3e3,vi=3001,cf=3200,hf=3201,tl=0,uf=1,hn="",Qt="srgb",kn="srgb-linear",el="display-p3",mr="display-p3-linear",sr="linear",ue="srgb",or="rec709",rr="p3",Ei=7680,rc=519,df=512,ff=513,pf=514,gu=515,mf=516,gf=517,vf=518,xf=519,ac=35044,yf=35048,lc="300 es",Ba=1035,zn=2e3,ar=2001;class os{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const o=i.indexOf(e);o!==-1&&i.splice(o,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let o=0,r=i.length;o<r;o++)i[o].call(this,t);t.target=null}}}const Ge=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let cc=1234567;const Rs=Math.PI/180,Os=180/Math.PI;function Si(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ge[s&255]+Ge[s>>8&255]+Ge[s>>16&255]+Ge[s>>24&255]+"-"+Ge[t&255]+Ge[t>>8&255]+"-"+Ge[t>>16&15|64]+Ge[t>>24&255]+"-"+Ge[e&63|128]+Ge[e>>8&255]+"-"+Ge[e>>16&255]+Ge[e>>24&255]+Ge[n&255]+Ge[n>>8&255]+Ge[n>>16&255]+Ge[n>>24&255]).toLowerCase()}function Te(s,t,e){return Math.max(t,Math.min(e,s))}function nl(s,t){return(s%t+t)%t}function Mf(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function _f(s,t,e){return s!==t?(e-s)/(t-s):0}function Ps(s,t,e){return(1-e)*s+e*t}function Sf(s,t,e,n){return Ps(s,t,1-Math.exp(-e*n))}function wf(s,t=1){return t-Math.abs(nl(s,t*2)-t)}function bf(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function Ef(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function Tf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function Af(s,t){return s+Math.random()*(t-s)}function Cf(s){return s*(.5-Math.random())}function Rf(s){s!==void 0&&(cc=s);let t=cc+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function Pf(s){return s*Rs}function Lf(s){return s*Os}function ka(s){return(s&s-1)===0&&s!==0}function If(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function lr(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Df(s,t,e,n,i){const o=Math.cos,r=Math.sin,a=o(e/2),l=r(e/2),c=o((t+n)/2),h=r((t+n)/2),d=o((t-n)/2),u=r((t-n)/2),f=o((n-t)/2),p=r((n-t)/2);switch(i){case"XYX":s.set(a*h,l*d,l*u,a*c);break;case"YZY":s.set(l*u,a*h,l*d,a*c);break;case"ZXZ":s.set(l*d,l*u,a*h,a*c);break;case"XZX":s.set(a*h,l*p,l*f,a*c);break;case"YXY":s.set(l*f,a*h,l*p,a*c);break;case"ZYZ":s.set(l*p,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function Xi(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function qe(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const We={DEG2RAD:Rs,RAD2DEG:Os,generateUUID:Si,clamp:Te,euclideanModulo:nl,mapLinear:Mf,inverseLerp:_f,lerp:Ps,damp:Sf,pingpong:wf,smoothstep:bf,smootherstep:Ef,randInt:Tf,randFloat:Af,randFloatSpread:Cf,seededRandom:Rf,degToRad:Pf,radToDeg:Lf,isPowerOfTwo:ka,ceilPowerOfTwo:If,floorPowerOfTwo:lr,setQuaternionFromProperEuler:Df,normalize:qe,denormalize:Xi};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),o=this.x-t.x,r=this.y-t.y;return this.x=o*n-r*i+t.x,this.y=o*i+r*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Jt{constructor(t,e,n,i,o,r,a,l,c){Jt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,l,c)}set(t,e,n,i,o,r,a,l,c){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=o,h[5]=l,h[6]=n,h[7]=r,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[3],l=n[6],c=n[1],h=n[4],d=n[7],u=n[2],f=n[5],p=n[8],v=i[0],g=i[3],m=i[6],x=i[1],y=i[4],M=i[7],w=i[2],S=i[5],b=i[8];return o[0]=r*v+a*x+l*w,o[3]=r*g+a*y+l*S,o[6]=r*m+a*M+l*b,o[1]=c*v+h*x+d*w,o[4]=c*g+h*y+d*S,o[7]=c*m+h*M+d*b,o[2]=u*v+f*x+p*w,o[5]=u*g+f*y+p*S,o[8]=u*m+f*M+p*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8];return e*r*h-e*a*c-n*o*h+n*a*l+i*o*c-i*r*l}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=h*r-a*c,u=a*l-h*o,f=c*o-r*l,p=e*d+n*u+i*f;if(p===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/p;return t[0]=d*v,t[1]=(i*c-h*n)*v,t[2]=(a*n-i*r)*v,t[3]=u*v,t[4]=(h*e-i*l)*v,t[5]=(i*o-a*e)*v,t[6]=f*v,t[7]=(n*l-c*e)*v,t[8]=(r*e-n*o)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,o,r,a){const l=Math.cos(o),c=Math.sin(o);return this.set(n*l,n*c,-n*(l*r+c*a)+r+t,-i*c,i*l,-i*(-c*r+l*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Nr.makeScale(t,e)),this}rotate(t){return this.premultiply(Nr.makeRotation(-t)),this}translate(t,e){return this.premultiply(Nr.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Nr=new Jt;function vu(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function cr(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Nf(){const s=cr("canvas");return s.style.display="block",s}const hc={};function Ls(s){s in hc||(hc[s]=!0,console.warn(s))}const uc=new Jt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),dc=new Jt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),Zs={[kn]:{transfer:sr,primaries:or,toReference:s=>s,fromReference:s=>s},[Qt]:{transfer:ue,primaries:or,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[mr]:{transfer:sr,primaries:rr,toReference:s=>s.applyMatrix3(dc),fromReference:s=>s.applyMatrix3(uc)},[el]:{transfer:ue,primaries:rr,toReference:s=>s.convertSRGBToLinear().applyMatrix3(dc),fromReference:s=>s.applyMatrix3(uc).convertLinearToSRGB()}},Uf=new Set([kn,mr]),se={enabled:!0,_workingColorSpace:kn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!Uf.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=Zs[t].toReference,i=Zs[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return Zs[s].primaries},getTransfer:function(s){return s===hn?sr:Zs[s].transfer}};function Ji(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Ur(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ti;class xu{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ti===void 0&&(Ti=cr("canvas")),Ti.width=t.width,Ti.height=t.height;const n=Ti.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ti}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=cr("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),o=i.data;for(let r=0;r<o.length;r++)o[r]=Ji(o[r]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(Ji(e[n]/255)*255):e[n]=Ji(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ff=0;class yu{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ff++}),this.uuid=Si(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let o;if(Array.isArray(i)){o=[];for(let r=0,a=i.length;r<a;r++)i[r].isDataTexture?o.push(Fr(i[r].image)):o.push(Fr(i[r]))}else o=Fr(i);n.url=o}return e||(t.images[this.uuid]=n),n}}function Fr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?xu.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Of=0;class ze extends os{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=xn,i=xn,o=Je,r=ns,a=cn,l=Bn,c=ze.DEFAULT_ANISOTROPY,h=hn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=Si(),this.name="",this.source=new yu(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=o,this.minFilter=r,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Jt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ls("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===vi?Qt:hn),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==au)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case ye:t.x=t.x-Math.floor(t.x);break;case xn:t.x=t.x<0?0:1;break;case za:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case ye:t.y=t.y-Math.floor(t.y);break;case xn:t.y=t.y<0?0:1;break;case za:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ls("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===Qt?vi:mu}set encoding(t){Ls("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===vi?Qt:hn}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=au;ze.DEFAULT_ANISOTROPY=1;class Fe{constructor(t=0,e=0,n=0,i=1){Fe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=this.w,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i+r[12]*o,this.y=r[1]*e+r[5]*n+r[9]*i+r[13]*o,this.z=r[2]*e+r[6]*n+r[10]*i+r[14]*o,this.w=r[3]*e+r[7]*n+r[11]*i+r[15]*o,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,o;const l=t.elements,c=l[0],h=l[4],d=l[8],u=l[1],f=l[5],p=l[9],v=l[2],g=l[6],m=l[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(p-g)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(p+g)<.1&&Math.abs(c+f+m-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(c+1)/2,M=(f+1)/2,w=(m+1)/2,S=(h+u)/4,b=(d+v)/4,A=(p+g)/4;return y>M&&y>w?y<.01?(n=0,i=.707106781,o=.707106781):(n=Math.sqrt(y),i=S/n,o=b/n):M>w?M<.01?(n=.707106781,i=0,o=.707106781):(i=Math.sqrt(M),n=S/i,o=A/i):w<.01?(n=.707106781,i=.707106781,o=0):(o=Math.sqrt(w),n=b/o,i=A/o),this.set(n,i,o,e),this}let x=Math.sqrt((g-p)*(g-p)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(g-p)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((c+f+m-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class zf extends os{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Fe(0,0,t,e),this.scissorTest=!1,this.viewport=new Fe(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Ls("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===vi?Qt:hn),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Je,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ze(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new yu(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Ze extends zf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Mu extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Se,this.minFilter=Se,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Bf extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Se,this.minFilter=Se,this.wrapR=xn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let on=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,o,r,a){let l=n[i+0],c=n[i+1],h=n[i+2],d=n[i+3];const u=o[r+0],f=o[r+1],p=o[r+2],v=o[r+3];if(a===0){t[e+0]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=p,t[e+3]=v;return}if(d!==v||l!==u||c!==f||h!==p){let g=1-a;const m=l*u+c*f+h*p+d*v,x=m>=0?1:-1,y=1-m*m;if(y>Number.EPSILON){const w=Math.sqrt(y),S=Math.atan2(w,m*x);g=Math.sin(g*S)/w,a=Math.sin(a*S)/w}const M=a*x;if(l=l*g+u*M,c=c*g+f*M,h=h*g+p*M,d=d*g+v*M,g===1-a){const w=1/Math.sqrt(l*l+c*c+h*h+d*d);l*=w,c*=w,h*=w,d*=w}}t[e]=l,t[e+1]=c,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,o,r){const a=n[i],l=n[i+1],c=n[i+2],h=n[i+3],d=o[r],u=o[r+1],f=o[r+2],p=o[r+3];return t[e]=a*p+h*d+l*f-c*u,t[e+1]=l*p+h*u+c*d-a*f,t[e+2]=c*p+h*f+a*u-l*d,t[e+3]=h*p-a*d-l*u-c*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,o=t._z,r=t._order,a=Math.cos,l=Math.sin,c=a(n/2),h=a(i/2),d=a(o/2),u=l(n/2),f=l(i/2),p=l(o/2);switch(r){case"XYZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"YXZ":this._x=u*h*d+c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"ZXY":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d-u*f*p;break;case"ZYX":this._x=u*h*d-c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d+u*f*p;break;case"YZX":this._x=u*h*d+c*f*p,this._y=c*f*d+u*h*p,this._z=c*h*p-u*f*d,this._w=c*h*d-u*f*p;break;case"XZY":this._x=u*h*d-c*f*p,this._y=c*f*d-u*h*p,this._z=c*h*p+u*f*d,this._w=c*h*d+u*f*p;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],o=e[8],r=e[1],a=e[5],l=e[9],c=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-l)*f,this._y=(o-c)*f,this._z=(r-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-l)/f,this._x=.25*f,this._y=(i+r)/f,this._z=(o+c)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(o-c)/f,this._x=(i+r)/f,this._y=.25*f,this._z=(l+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(r-i)/f,this._x=(o+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Te(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,o=t._z,r=t._w,a=e._x,l=e._y,c=e._z,h=e._w;return this._x=n*h+r*a+i*c-o*l,this._y=i*h+r*l+o*a-n*c,this._z=o*h+r*c+n*l-i*a,this._w=r*h-n*a-i*l-o*c,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,o=this._z,r=this._w;let a=r*t._w+n*t._x+i*t._y+o*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=r,this._x=n,this._y=i,this._z=o,this;const l=1-a*a;if(l<=Number.EPSILON){const f=1-e;return this._w=f*r+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*o+e*this._z,this.normalize(),this}const c=Math.sqrt(l),h=Math.atan2(c,a),d=Math.sin((1-e)*h)/c,u=Math.sin(e*h)/c;return this._w=r*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=o*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),o=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(o),n*Math.cos(o),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class z{constructor(t=0,e=0,n=0){z.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(fc.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(fc.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[3]*n+o[6]*i,this.y=o[1]*e+o[4]*n+o[7]*i,this.z=o[2]*e+o[5]*n+o[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,o=t.elements,r=1/(o[3]*e+o[7]*n+o[11]*i+o[15]);return this.x=(o[0]*e+o[4]*n+o[8]*i+o[12])*r,this.y=(o[1]*e+o[5]*n+o[9]*i+o[13])*r,this.z=(o[2]*e+o[6]*n+o[10]*i+o[14])*r,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z,l=t.w,c=2*(r*i-a*n),h=2*(a*e-o*i),d=2*(o*n-r*e);return this.x=e+l*c+r*d-a*h,this.y=n+l*h+a*c-o*d,this.z=i+l*d+o*h-r*c,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i,this.y=o[1]*e+o[5]*n+o[9]*i,this.z=o[2]*e+o[6]*n+o[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,o=t.z,r=e.x,a=e.y,l=e.z;return this.x=i*l-o*a,this.y=o*r-n*l,this.z=n*a-i*r,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return Or.copy(this).projectOnVector(t),this.sub(Or)}reflect(t){return this.sub(Or.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Te(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Or=new z,fc=new on;class wi{constructor(t=new z(1/0,1/0,1/0),e=new z(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(dn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(dn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=dn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const o=n.getAttribute("position");if(e===!0&&o!==void 0&&t.isInstancedMesh!==!0)for(let r=0,a=o.count;r<a;r++)t.isMesh===!0?t.getVertexPosition(r,dn):dn.fromBufferAttribute(o,r),dn.applyMatrix4(t.matrixWorld),this.expandByPoint(dn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),Ks.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Ks.copy(n.boundingBox)),Ks.applyMatrix4(t.matrixWorld),this.union(Ks)}const i=t.children;for(let o=0,r=i.length;o<r;o++)this.expandByObject(i[o],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,dn),dn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(us),Js.subVectors(this.max,us),Ai.subVectors(t.a,us),Ci.subVectors(t.b,us),Ri.subVectors(t.c,us),Vn.subVectors(Ci,Ai),Xn.subVectors(Ri,Ci),oi.subVectors(Ai,Ri);let e=[0,-Vn.z,Vn.y,0,-Xn.z,Xn.y,0,-oi.z,oi.y,Vn.z,0,-Vn.x,Xn.z,0,-Xn.x,oi.z,0,-oi.x,-Vn.y,Vn.x,0,-Xn.y,Xn.x,0,-oi.y,oi.x,0];return!zr(e,Ai,Ci,Ri,Js)||(e=[1,0,0,0,1,0,0,0,1],!zr(e,Ai,Ci,Ri,Js))?!1:(Qs.crossVectors(Vn,Xn),e=[Qs.x,Qs.y,Qs.z],zr(e,Ai,Ci,Ri,Js))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,dn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(dn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(Cn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),Cn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),Cn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),Cn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),Cn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),Cn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),Cn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),Cn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(Cn),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const Cn=[new z,new z,new z,new z,new z,new z,new z,new z],dn=new z,Ks=new wi,Ai=new z,Ci=new z,Ri=new z,Vn=new z,Xn=new z,oi=new z,us=new z,Js=new z,Qs=new z,ri=new z;function zr(s,t,e,n,i){for(let o=0,r=s.length-3;o<=r;o+=3){ri.fromArray(s,o);const a=i.x*Math.abs(ri.x)+i.y*Math.abs(ri.y)+i.z*Math.abs(ri.z),l=t.dot(ri),c=e.dot(ri),h=n.dot(ri);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}const kf=new wi,ds=new z,Br=new z;class Hs{constructor(t=new z,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):kf.setFromPoints(t).getCenter(n);let i=0;for(let o=0,r=t.length;o<r;o++)i=Math.max(i,n.distanceToSquared(t[o]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ds.subVectors(t,this.center);const e=ds.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ds,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Br.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ds.copy(t.center).add(Br)),this.expandByPoint(ds.copy(t.center).sub(Br))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Rn=new z,kr=new z,$s=new z,qn=new z,Gr=new z,to=new z,Hr=new z;let Gf=class{constructor(t=new z,e=new z(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Rn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Rn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Rn.copy(this.origin).addScaledVector(this.direction,e),Rn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){kr.copy(t).add(e).multiplyScalar(.5),$s.copy(e).sub(t).normalize(),qn.copy(this.origin).sub(kr);const o=t.distanceTo(e)*.5,r=-this.direction.dot($s),a=qn.dot(this.direction),l=-qn.dot($s),c=qn.lengthSq(),h=Math.abs(1-r*r);let d,u,f,p;if(h>0)if(d=r*l-a,u=r*a-l,p=o*h,d>=0)if(u>=-p)if(u<=p){const v=1/h;d*=v,u*=v,f=d*(d+r*u+2*a)+u*(r*d+u+2*l)+c}else u=o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*l)+c;else u=-o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*l)+c;else u<=-p?(d=Math.max(0,-(-r*o+a)),u=d>0?-o:Math.min(Math.max(-o,-l),o),f=-d*d+u*(u+2*l)+c):u<=p?(d=0,u=Math.min(Math.max(-o,-l),o),f=u*(u+2*l)+c):(d=Math.max(0,-(r*o+a)),u=d>0?o:Math.min(Math.max(-o,-l),o),f=-d*d+u*(u+2*l)+c);else u=r>0?-o:o,d=Math.max(0,-(r*u+a)),f=-d*d+u*(u+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(kr).addScaledVector($s,u),f}intersectSphere(t,e){Rn.subVectors(t.center,this.origin);const n=Rn.dot(this.direction),i=Rn.dot(Rn)-n*n,o=t.radius*t.radius;if(i>o)return null;const r=Math.sqrt(o-i),a=n-r,l=n+r;return l<0?null:a<0?this.at(l,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,o,r,a,l;const c=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return c>=0?(n=(t.min.x-u.x)*c,i=(t.max.x-u.x)*c):(n=(t.max.x-u.x)*c,i=(t.min.x-u.x)*c),h>=0?(o=(t.min.y-u.y)*h,r=(t.max.y-u.y)*h):(o=(t.max.y-u.y)*h,r=(t.min.y-u.y)*h),n>r||o>i||((o>n||isNaN(n))&&(n=o),(r<i||isNaN(i))&&(i=r),d>=0?(a=(t.min.z-u.z)*d,l=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,l=(t.min.z-u.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Rn)!==null}intersectTriangle(t,e,n,i,o){Gr.subVectors(e,t),to.subVectors(n,t),Hr.crossVectors(Gr,to);let r=this.direction.dot(Hr),a;if(r>0){if(i)return null;a=1}else if(r<0)a=-1,r=-r;else return null;qn.subVectors(this.origin,t);const l=a*this.direction.dot(to.crossVectors(qn,to));if(l<0)return null;const c=a*this.direction.dot(Gr.cross(qn));if(c<0||l+c>r)return null;const h=-a*qn.dot(Hr);return h<0?null:this.at(h/r,o)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class $t{constructor(t,e,n,i,o,r,a,l,c,h,d,u,f,p,v,g){$t.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,o,r,a,l,c,h,d,u,f,p,v,g)}set(t,e,n,i,o,r,a,l,c,h,d,u,f,p,v,g){const m=this.elements;return m[0]=t,m[4]=e,m[8]=n,m[12]=i,m[1]=o,m[5]=r,m[9]=a,m[13]=l,m[2]=c,m[6]=h,m[10]=d,m[14]=u,m[3]=f,m[7]=p,m[11]=v,m[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new $t().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Pi.setFromMatrixColumn(t,0).length(),o=1/Pi.setFromMatrixColumn(t,1).length(),r=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*o,e[5]=n[5]*o,e[6]=n[6]*o,e[7]=0,e[8]=n[8]*r,e[9]=n[9]*r,e[10]=n[10]*r,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,o=t.z,r=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),h=Math.cos(o),d=Math.sin(o);if(t.order==="XYZ"){const u=r*h,f=r*d,p=a*h,v=a*d;e[0]=l*h,e[4]=-l*d,e[8]=c,e[1]=f+p*c,e[5]=u-v*c,e[9]=-a*l,e[2]=v-u*c,e[6]=p+f*c,e[10]=r*l}else if(t.order==="YXZ"){const u=l*h,f=l*d,p=c*h,v=c*d;e[0]=u+v*a,e[4]=p*a-f,e[8]=r*c,e[1]=r*d,e[5]=r*h,e[9]=-a,e[2]=f*a-p,e[6]=v+u*a,e[10]=r*l}else if(t.order==="ZXY"){const u=l*h,f=l*d,p=c*h,v=c*d;e[0]=u-v*a,e[4]=-r*d,e[8]=p+f*a,e[1]=f+p*a,e[5]=r*h,e[9]=v-u*a,e[2]=-r*c,e[6]=a,e[10]=r*l}else if(t.order==="ZYX"){const u=r*h,f=r*d,p=a*h,v=a*d;e[0]=l*h,e[4]=p*c-f,e[8]=u*c+v,e[1]=l*d,e[5]=v*c+u,e[9]=f*c-p,e[2]=-c,e[6]=a*l,e[10]=r*l}else if(t.order==="YZX"){const u=r*l,f=r*c,p=a*l,v=a*c;e[0]=l*h,e[4]=v-u*d,e[8]=p*d+f,e[1]=d,e[5]=r*h,e[9]=-a*h,e[2]=-c*h,e[6]=f*d+p,e[10]=u-v*d}else if(t.order==="XZY"){const u=r*l,f=r*c,p=a*l,v=a*c;e[0]=l*h,e[4]=-d,e[8]=c*h,e[1]=u*d+v,e[5]=r*h,e[9]=f*d-p,e[2]=p*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Hf,t,Wf)}lookAt(t,e,n){const i=this.elements;return tn.subVectors(t,e),tn.lengthSq()===0&&(tn.z=1),tn.normalize(),Yn.crossVectors(n,tn),Yn.lengthSq()===0&&(Math.abs(n.z)===1?tn.x+=1e-4:tn.z+=1e-4,tn.normalize(),Yn.crossVectors(n,tn)),Yn.normalize(),eo.crossVectors(tn,Yn),i[0]=Yn.x,i[4]=eo.x,i[8]=tn.x,i[1]=Yn.y,i[5]=eo.y,i[9]=tn.y,i[2]=Yn.z,i[6]=eo.z,i[10]=tn.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,o=this.elements,r=n[0],a=n[4],l=n[8],c=n[12],h=n[1],d=n[5],u=n[9],f=n[13],p=n[2],v=n[6],g=n[10],m=n[14],x=n[3],y=n[7],M=n[11],w=n[15],S=i[0],b=i[4],A=i[8],_=i[12],E=i[1],N=i[5],D=i[9],F=i[13],R=i[2],L=i[6],U=i[10],q=i[14],H=i[3],G=i[7],j=i[11],k=i[15];return o[0]=r*S+a*E+l*R+c*H,o[4]=r*b+a*N+l*L+c*G,o[8]=r*A+a*D+l*U+c*j,o[12]=r*_+a*F+l*q+c*k,o[1]=h*S+d*E+u*R+f*H,o[5]=h*b+d*N+u*L+f*G,o[9]=h*A+d*D+u*U+f*j,o[13]=h*_+d*F+u*q+f*k,o[2]=p*S+v*E+g*R+m*H,o[6]=p*b+v*N+g*L+m*G,o[10]=p*A+v*D+g*U+m*j,o[14]=p*_+v*F+g*q+m*k,o[3]=x*S+y*E+M*R+w*H,o[7]=x*b+y*N+M*L+w*G,o[11]=x*A+y*D+M*U+w*j,o[15]=x*_+y*F+M*q+w*k,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],o=t[12],r=t[1],a=t[5],l=t[9],c=t[13],h=t[2],d=t[6],u=t[10],f=t[14],p=t[3],v=t[7],g=t[11],m=t[15];return p*(+o*l*d-i*c*d-o*a*u+n*c*u+i*a*f-n*l*f)+v*(+e*l*f-e*c*u+o*r*u-i*r*f+i*c*h-o*l*h)+g*(+e*c*d-e*a*f-o*r*d+n*r*f+o*a*h-n*c*h)+m*(-i*a*h-e*l*d+e*a*u+i*r*d-n*r*u+n*l*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],o=t[3],r=t[4],a=t[5],l=t[6],c=t[7],h=t[8],d=t[9],u=t[10],f=t[11],p=t[12],v=t[13],g=t[14],m=t[15],x=d*g*c-v*u*c+v*l*f-a*g*f-d*l*m+a*u*m,y=p*u*c-h*g*c-p*l*f+r*g*f+h*l*m-r*u*m,M=h*v*c-p*d*c+p*a*f-r*v*f-h*a*m+r*d*m,w=p*d*l-h*v*l-p*a*u+r*v*u+h*a*g-r*d*g,S=e*x+n*y+i*M+o*w;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/S;return t[0]=x*b,t[1]=(v*u*o-d*g*o-v*i*f+n*g*f+d*i*m-n*u*m)*b,t[2]=(a*g*o-v*l*o+v*i*c-n*g*c-a*i*m+n*l*m)*b,t[3]=(d*l*o-a*u*o-d*i*c+n*u*c+a*i*f-n*l*f)*b,t[4]=y*b,t[5]=(h*g*o-p*u*o+p*i*f-e*g*f-h*i*m+e*u*m)*b,t[6]=(p*l*o-r*g*o-p*i*c+e*g*c+r*i*m-e*l*m)*b,t[7]=(r*u*o-h*l*o+h*i*c-e*u*c-r*i*f+e*l*f)*b,t[8]=M*b,t[9]=(p*d*o-h*v*o-p*n*f+e*v*f+h*n*m-e*d*m)*b,t[10]=(r*v*o-p*a*o+p*n*c-e*v*c-r*n*m+e*a*m)*b,t[11]=(h*a*o-r*d*o-h*n*c+e*d*c+r*n*f-e*a*f)*b,t[12]=w*b,t[13]=(h*v*i-p*d*i+p*n*u-e*v*u-h*n*g+e*d*g)*b,t[14]=(p*a*i-r*v*i-p*n*l+e*v*l+r*n*g-e*a*g)*b,t[15]=(r*d*i-h*a*i+h*n*l-e*d*l-r*n*u+e*a*u)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,o=t.z;return e[0]*=n,e[4]*=i,e[8]*=o,e[1]*=n,e[5]*=i,e[9]*=o,e[2]*=n,e[6]*=i,e[10]*=o,e[3]*=n,e[7]*=i,e[11]*=o,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),o=1-n,r=t.x,a=t.y,l=t.z,c=o*r,h=o*a;return this.set(c*r+n,c*a-i*l,c*l+i*a,0,c*a+i*l,h*a+n,h*l-i*r,0,c*l-i*a,h*l+i*r,o*l*l+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,o,r){return this.set(1,n,o,0,t,1,r,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,o=e._x,r=e._y,a=e._z,l=e._w,c=o+o,h=r+r,d=a+a,u=o*c,f=o*h,p=o*d,v=r*h,g=r*d,m=a*d,x=l*c,y=l*h,M=l*d,w=n.x,S=n.y,b=n.z;return i[0]=(1-(v+m))*w,i[1]=(f+M)*w,i[2]=(p-y)*w,i[3]=0,i[4]=(f-M)*S,i[5]=(1-(u+m))*S,i[6]=(g+x)*S,i[7]=0,i[8]=(p+y)*b,i[9]=(g-x)*b,i[10]=(1-(u+v))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let o=Pi.set(i[0],i[1],i[2]).length();const r=Pi.set(i[4],i[5],i[6]).length(),a=Pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(o=-o),t.x=i[12],t.y=i[13],t.z=i[14],fn.copy(this);const c=1/o,h=1/r,d=1/a;return fn.elements[0]*=c,fn.elements[1]*=c,fn.elements[2]*=c,fn.elements[4]*=h,fn.elements[5]*=h,fn.elements[6]*=h,fn.elements[8]*=d,fn.elements[9]*=d,fn.elements[10]*=d,e.setFromRotationMatrix(fn),n.x=o,n.y=r,n.z=a,this}makePerspective(t,e,n,i,o,r,a=zn){const l=this.elements,c=2*o/(e-t),h=2*o/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,p;if(a===zn)f=-(r+o)/(r-o),p=-2*r*o/(r-o);else if(a===ar)f=-r/(r-o),p=-r*o/(r-o);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return l[0]=c,l[4]=0,l[8]=d,l[12]=0,l[1]=0,l[5]=h,l[9]=u,l[13]=0,l[2]=0,l[6]=0,l[10]=f,l[14]=p,l[3]=0,l[7]=0,l[11]=-1,l[15]=0,this}makeOrthographic(t,e,n,i,o,r,a=zn){const l=this.elements,c=1/(e-t),h=1/(n-i),d=1/(r-o),u=(e+t)*c,f=(n+i)*h;let p,v;if(a===zn)p=(r+o)*d,v=-2*d;else if(a===ar)p=o*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return l[0]=2*c,l[4]=0,l[8]=0,l[12]=-u,l[1]=0,l[5]=2*h,l[9]=0,l[13]=-f,l[2]=0,l[6]=0,l[10]=v,l[14]=-p,l[3]=0,l[7]=0,l[11]=0,l[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Pi=new z,fn=new $t,Hf=new z(0,0,0),Wf=new z(1,1,1),Yn=new z,eo=new z,tn=new z,pc=new $t,mc=new on;class Wn{constructor(t=0,e=0,n=0,i=Wn.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,o=i[0],r=i[4],a=i[8],l=i[1],c=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Te(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-r,o)):(this._x=Math.atan2(u,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Te(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,o),this._z=0);break;case"ZXY":this._x=Math.asin(Te(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-r,c)):(this._y=0,this._z=Math.atan2(l,o));break;case"ZYX":this._y=Math.asin(-Te(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(l,o)):(this._x=0,this._z=Math.atan2(-r,c));break;case"YZX":this._z=Math.asin(Te(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-d,o)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Te(r,-1,1)),Math.abs(r)<.9999999?(this._x=Math.atan2(u,c),this._y=Math.atan2(a,o)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return pc.makeRotationFromQuaternion(t),this.setFromRotationMatrix(pc,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return mc.setFromEuler(this),this.setFromQuaternion(mc,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Wn.DEFAULT_ORDER="XYZ";class _u{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let Vf=0;const gc=new z,Li=new on,Pn=new $t,no=new z,fs=new z,Xf=new z,qf=new on,vc=new z(1,0,0),xc=new z(0,1,0),yc=new z(0,0,1),Yf={type:"added"},jf={type:"removed"};class Be extends os{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Vf++}),this.uuid=Si(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Be.DEFAULT_UP.clone();const t=new z,e=new Wn,n=new on,i=new z(1,1,1);function o(){n.setFromEuler(e,!1)}function r(){e.setFromQuaternion(n,void 0,!1)}e._onChange(o),n._onChange(r),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new $t},normalMatrix:{value:new Jt}}),this.matrix=new $t,this.matrixWorld=new $t,this.matrixAutoUpdate=Be.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new _u,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(vc,t)}rotateY(t){return this.rotateOnAxis(xc,t)}rotateZ(t){return this.rotateOnAxis(yc,t)}translateOnAxis(t,e){return gc.copy(t).applyQuaternion(this.quaternion),this.position.add(gc.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(vc,t)}translateY(t){return this.translateOnAxis(xc,t)}translateZ(t){return this.translateOnAxis(yc,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Pn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?no.copy(t):no.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),fs.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Pn.lookAt(fs,no,this.up):Pn.lookAt(no,fs,this.up),this.quaternion.setFromRotationMatrix(Pn),i&&(Pn.extractRotation(i.matrixWorld),Li.setFromRotationMatrix(Pn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Yf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(jf)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Pn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Pn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Pn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const r=this.children[n].getObjectByProperty(t,e);if(r!==void 0)return r}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let o=0,r=i.length;o<r;o++)i[o].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fs,t,Xf),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(fs,qf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const o=e[n];(o.matrixWorldAutoUpdate===!0||t===!0)&&o.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let o=0,r=i.length;o<r;o++){const a=i[o];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function o(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(t)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=o(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){const d=l[c];o(t.shapes,d)}else o(t.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(o(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(o(t.materials,this.material[l]));i.material=a}else i.material=o(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(o(t.animations,l))}}if(e){const a=r(t.geometries),l=r(t.materials),c=r(t.textures),h=r(t.images),d=r(t.shapes),u=r(t.skeletons),f=r(t.animations),p=r(t.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),p.length>0&&(n.nodes=p)}return n.object=i,n;function r(a){const l=[];for(const c in a){const h=a[c];delete h.metadata,l.push(h)}return l}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Be.DEFAULT_UP=new z(0,1,0);Be.DEFAULT_MATRIX_AUTO_UPDATE=!0;Be.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const pn=new z,Ln=new z,Wr=new z,In=new z,Ii=new z,Di=new z,Mc=new z,Vr=new z,Xr=new z,qr=new z;let io=!1;class gn{constructor(t=new z,e=new z,n=new z){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),pn.subVectors(t,e),i.cross(pn);const o=i.lengthSq();return o>0?i.multiplyScalar(1/Math.sqrt(o)):i.set(0,0,0)}static getBarycoord(t,e,n,i,o){pn.subVectors(i,e),Ln.subVectors(n,e),Wr.subVectors(t,e);const r=pn.dot(pn),a=pn.dot(Ln),l=pn.dot(Wr),c=Ln.dot(Ln),h=Ln.dot(Wr),d=r*c-a*a;if(d===0)return o.set(0,0,0),null;const u=1/d,f=(c*l-a*h)*u,p=(r*h-a*l)*u;return o.set(1-f-p,p,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getUV(t,e,n,i,o,r,a,l){return io===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),io=!0),this.getInterpolation(t,e,n,i,o,r,a,l)}static getInterpolation(t,e,n,i,o,r,a,l){return this.getBarycoord(t,e,n,i,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(o,In.x),l.addScaledVector(r,In.y),l.addScaledVector(a,In.z),l)}static isFrontFacing(t,e,n,i){return pn.subVectors(n,e),Ln.subVectors(t,e),pn.cross(Ln).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return pn.subVectors(this.c,this.b),Ln.subVectors(this.a,this.b),pn.cross(Ln).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return gn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return gn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,o){return io===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),io=!0),gn.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}getInterpolation(t,e,n,i,o){return gn.getInterpolation(t,this.a,this.b,this.c,e,n,i,o)}containsPoint(t){return gn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return gn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,o=this.c;let r,a;Ii.subVectors(i,n),Di.subVectors(o,n),Vr.subVectors(t,n);const l=Ii.dot(Vr),c=Di.dot(Vr);if(l<=0&&c<=0)return e.copy(n);Xr.subVectors(t,i);const h=Ii.dot(Xr),d=Di.dot(Xr);if(h>=0&&d<=h)return e.copy(i);const u=l*d-h*c;if(u<=0&&l>=0&&h<=0)return r=l/(l-h),e.copy(n).addScaledVector(Ii,r);qr.subVectors(t,o);const f=Ii.dot(qr),p=Di.dot(qr);if(p>=0&&f<=p)return e.copy(o);const v=f*c-l*p;if(v<=0&&c>=0&&p<=0)return a=c/(c-p),e.copy(n).addScaledVector(Di,a);const g=h*p-f*d;if(g<=0&&d-h>=0&&f-p>=0)return Mc.subVectors(o,i),a=(d-h)/(d-h+(f-p)),e.copy(i).addScaledVector(Mc,a);const m=1/(g+v+u);return r=v*m,a=u*m,e.copy(n).addScaledVector(Ii,r).addScaledVector(Di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const Su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},jn={h:0,s:0,l:0},so={h:0,s:0,l:0};function Yr(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Nt{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=Qt){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=se.workingColorSpace){if(t=nl(t,1),e=Te(e,0,1),n=Te(n,0,1),e===0)this.r=this.g=this.b=n;else{const o=n<=.5?n*(1+e):n+e-n*e,r=2*n-o;this.r=Yr(r,o,t+1/3),this.g=Yr(r,o,t),this.b=Yr(r,o,t-1/3)}return se.toWorkingColorSpace(this,i),this}setStyle(t,e=Qt){function n(o){o!==void 0&&parseFloat(o)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let o;const r=i[1],a=i[2];switch(r){case"rgb":case"rgba":if(o=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(255,parseInt(o[1],10))/255,Math.min(255,parseInt(o[2],10))/255,Math.min(255,parseInt(o[3],10))/255,e);if(o=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setRGB(Math.min(100,parseInt(o[1],10))/100,Math.min(100,parseInt(o[2],10))/100,Math.min(100,parseInt(o[3],10))/100,e);break;case"hsl":case"hsla":if(o=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(o[4]),this.setHSL(parseFloat(o[1])/360,parseFloat(o[2])/100,parseFloat(o[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const o=i[1],r=o.length;if(r===3)return this.setRGB(parseInt(o.charAt(0),16)/15,parseInt(o.charAt(1),16)/15,parseInt(o.charAt(2),16)/15,e);if(r===6)return this.setHex(parseInt(o,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=Qt){const n=Su[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=Ji(t.r),this.g=Ji(t.g),this.b=Ji(t.b),this}copyLinearToSRGB(t){return this.r=Ur(t.r),this.g=Ur(t.g),this.b=Ur(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=Qt){return se.fromWorkingColorSpace(He.copy(this),t),Math.round(Te(He.r*255,0,255))*65536+Math.round(Te(He.g*255,0,255))*256+Math.round(Te(He.b*255,0,255))}getHexString(t=Qt){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(He.copy(this),e);const n=He.r,i=He.g,o=He.b,r=Math.max(n,i,o),a=Math.min(n,i,o);let l,c;const h=(a+r)/2;if(a===r)l=0,c=0;else{const d=r-a;switch(c=h<=.5?d/(r+a):d/(2-r-a),r){case n:l=(i-o)/d+(i<o?6:0);break;case i:l=(o-n)/d+2;break;case o:l=(n-i)/d+4;break}l/=6}return t.h=l,t.s=c,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(He.copy(this),e),t.r=He.r,t.g=He.g,t.b=He.b,t}getStyle(t=Qt){se.fromWorkingColorSpace(He.copy(this),t);const e=He.r,n=He.g,i=He.b;return t!==Qt?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(jn),this.setHSL(jn.h+t,jn.s+e,jn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(jn),t.getHSL(so);const n=Ps(jn.h,so.h,e),i=Ps(jn.s,so.s,e),o=Ps(jn.l,so.l,e);return this.setHSL(n,i,o),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,o=t.elements;return this.r=o[0]*e+o[3]*n+o[6]*i,this.g=o[1]*e+o[4]*n+o[7]*i,this.b=o[2]*e+o[5]*n+o[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const He=new Nt;Nt.NAMES=Su;let Zf=0,rs=class extends os{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Zf++}),this.uuid=Si(),this.name="",this.type="Material",this.blending=Ki,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Ia,this.blendDst=Da,this.blendEquation=vn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Nt(0,0,0),this.blendAlpha=0,this.depthFunc=ir,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=rc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=Ei,this.stencilZFail=Ei,this.stencilZPass=Ei,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Ki&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Ia&&(n.blendSrc=this.blendSrc),this.blendDst!==Da&&(n.blendDst=this.blendDst),this.blendEquation!==vn&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==ir&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==rc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==Ei&&(n.stencilFail=this.stencilFail),this.stencilZFail!==Ei&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==Ei&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(o){const r=[];for(const a in o){const l=o[a];delete l.metadata,r.push(l)}return r}if(e){const o=i(t.textures),r=i(t.images);o.length>0&&(n.textures=o),r.length>0&&(n.images=r)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let o=0;o!==i;++o)n[o]=e[o].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class bi extends rs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Nt(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=nu,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const we=new z,oo=new nt;class ne{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=ac,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,o=this.itemSize;i<o;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)oo.fromBufferAttribute(this,e),oo.applyMatrix3(t),this.setXY(e,oo.x,oo.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix3(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyMatrix4(t),this.setXYZ(e,we.x,we.y,we.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.applyNormalMatrix(t),this.setXYZ(e,we.x,we.y,we.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)we.fromBufferAttribute(this,e),we.transformDirection(t),this.setXYZ(e,we.x,we.y,we.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=Xi(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=qe(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=Xi(e,this.array)),e}setX(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=Xi(e,this.array)),e}setY(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=Xi(e,this.array)),e}setZ(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=Xi(e,this.array)),e}setW(t,e){return this.normalized&&(e=qe(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),i=qe(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,o){return t*=this.itemSize,this.normalized&&(e=qe(e,this.array),n=qe(n,this.array),i=qe(i,this.array),o=qe(o,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=o,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==ac&&(t.usage=this.usage),t}}class wu extends ne{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class bu extends ne{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class ee extends ne{constructor(t,e,n){super(new Float32Array(t),e,n)}}let Kf=0;const ln=new $t,jr=new Be,Ni=new z,en=new wi,ps=new wi,Ne=new z;class ae extends os{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kf++}),this.uuid=Si(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(vu(t)?bu:wu)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const o=new Jt().getNormalMatrix(t);n.applyNormalMatrix(o),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return ln.makeRotationFromQuaternion(t),this.applyMatrix4(ln),this}rotateX(t){return ln.makeRotationX(t),this.applyMatrix4(ln),this}rotateY(t){return ln.makeRotationY(t),this.applyMatrix4(ln),this}rotateZ(t){return ln.makeRotationZ(t),this.applyMatrix4(ln),this}translate(t,e,n){return ln.makeTranslation(t,e,n),this.applyMatrix4(ln),this}scale(t,e,n){return ln.makeScale(t,e,n),this.applyMatrix4(ln),this}lookAt(t){return jr.lookAt(t),jr.updateMatrix(),this.applyMatrix4(jr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const o=t[n];e.push(o.x,o.y,o.z||0)}return this.setAttribute("position",new ee(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new wi);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new z(-1/0,-1/0,-1/0),new z(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const o=e[n];en.setFromBufferAttribute(o),this.morphTargetsRelative?(Ne.addVectors(this.boundingBox.min,en.min),this.boundingBox.expandByPoint(Ne),Ne.addVectors(this.boundingBox.max,en.max),this.boundingBox.expandByPoint(Ne)):(this.boundingBox.expandByPoint(en.min),this.boundingBox.expandByPoint(en.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Hs);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new z,1/0);return}if(t){const n=this.boundingSphere.center;if(en.setFromBufferAttribute(t),e)for(let o=0,r=e.length;o<r;o++){const a=e[o];ps.setFromBufferAttribute(a),this.morphTargetsRelative?(Ne.addVectors(en.min,ps.min),en.expandByPoint(Ne),Ne.addVectors(en.max,ps.max),en.expandByPoint(Ne)):(en.expandByPoint(ps.min),en.expandByPoint(ps.max))}en.getCenter(n);let i=0;for(let o=0,r=t.count;o<r;o++)Ne.fromBufferAttribute(t,o),i=Math.max(i,n.distanceToSquared(Ne));if(e)for(let o=0,r=e.length;o<r;o++){const a=e[o],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Ne.fromBufferAttribute(a,c),l&&(Ni.fromBufferAttribute(t,c),Ne.add(Ni)),i=Math.max(i,n.distanceToSquared(Ne))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,o=e.normal.array,r=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ne(new Float32Array(4*a),4));const l=this.getAttribute("tangent").array,c=[],h=[];for(let E=0;E<a;E++)c[E]=new z,h[E]=new z;const d=new z,u=new z,f=new z,p=new nt,v=new nt,g=new nt,m=new z,x=new z;function y(E,N,D){d.fromArray(i,E*3),u.fromArray(i,N*3),f.fromArray(i,D*3),p.fromArray(r,E*2),v.fromArray(r,N*2),g.fromArray(r,D*2),u.sub(d),f.sub(d),v.sub(p),g.sub(p);const F=1/(v.x*g.y-g.x*v.y);isFinite(F)&&(m.copy(u).multiplyScalar(g.y).addScaledVector(f,-v.y).multiplyScalar(F),x.copy(f).multiplyScalar(v.x).addScaledVector(u,-g.x).multiplyScalar(F),c[E].add(m),c[N].add(m),c[D].add(m),h[E].add(x),h[N].add(x),h[D].add(x))}let M=this.groups;M.length===0&&(M=[{start:0,count:n.length}]);for(let E=0,N=M.length;E<N;++E){const D=M[E],F=D.start,R=D.count;for(let L=F,U=F+R;L<U;L+=3)y(n[L+0],n[L+1],n[L+2])}const w=new z,S=new z,b=new z,A=new z;function _(E){b.fromArray(o,E*3),A.copy(b);const N=c[E];w.copy(N),w.sub(b.multiplyScalar(b.dot(N))).normalize(),S.crossVectors(A,N);const F=S.dot(h[E])<0?-1:1;l[E*4]=w.x,l[E*4+1]=w.y,l[E*4+2]=w.z,l[E*4+3]=F}for(let E=0,N=M.length;E<N;++E){const D=M[E],F=D.start,R=D.count;for(let L=F,U=F+R;L<U;L+=3)_(n[L+0]),_(n[L+1]),_(n[L+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ne(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new z,o=new z,r=new z,a=new z,l=new z,c=new z,h=new z,d=new z;if(t)for(let u=0,f=t.count;u<f;u+=3){const p=t.getX(u+0),v=t.getX(u+1),g=t.getX(u+2);i.fromBufferAttribute(e,p),o.fromBufferAttribute(e,v),r.fromBufferAttribute(e,g),h.subVectors(r,o),d.subVectors(i,o),h.cross(d),a.fromBufferAttribute(n,p),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(h),l.add(h),c.add(h),n.setXYZ(p,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),o.fromBufferAttribute(e,u+1),r.fromBufferAttribute(e,u+2),h.subVectors(r,o),d.subVectors(i,o),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ne.fromBufferAttribute(t,e),Ne.normalize(),t.setXYZ(e,Ne.x,Ne.y,Ne.z)}toNonIndexed(){function t(a,l){const c=a.array,h=a.itemSize,d=a.normalized,u=new c.constructor(l.length*h);let f=0,p=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?f=l[v]*a.data.stride+a.offset:f=l[v]*h;for(let m=0;m<h;m++)u[p++]=c[f++]}return new ne(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new ae,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=t(l,n);e.setAttribute(a,c)}const o=this.morphAttributes;for(const a in o){const l=[],c=o[a];for(let h=0,d=c.length;h<d;h++){const u=c[h],f=t(u,n);l.push(f)}e.morphAttributes[a]=l}e.morphTargetsRelative=this.morphTargetsRelative;const r=this.groups;for(let a=0,l=r.length;a<l;a++){const c=r[a];e.addGroup(c.start,c.count,c.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(t[c]=l[c]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const l in n){const c=n[l];t.data.attributes[l]=c.toJSON(t.data)}const i={};let o=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],h=[];for(let d=0,u=c.length;d<u;d++){const f=c[d];h.push(f.toJSON(t.data))}h.length>0&&(i[l]=h,o=!0)}o&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const r=this.groups;r.length>0&&(t.data.groups=JSON.parse(JSON.stringify(r)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const c in i){const h=i[c];this.setAttribute(c,h.clone(e))}const o=t.morphAttributes;for(const c in o){const h=[],d=o[c];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[c]=h}this.morphTargetsRelative=t.morphTargetsRelative;const r=t.groups;for(let c=0,h=r.length;c<h;c++){const d=r[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=t.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const _c=new $t,ai=new Gf,ro=new Hs,Sc=new z,Ui=new z,Fi=new z,Oi=new z,Zr=new z,ao=new z,lo=new nt,co=new nt,ho=new nt,wc=new z,bc=new z,Ec=new z,uo=new z,fo=new z;class Q extends Be{constructor(t=new ae,e=new bi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let o=0,r=i.length;o<r;o++){const a=i[o].name||String(o);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=o}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,o=n.morphAttributes.position,r=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(o&&a){ao.set(0,0,0);for(let l=0,c=o.length;l<c;l++){const h=a[l],d=o[l];h!==0&&(Zr.fromBufferAttribute(d,t),r?ao.addScaledVector(Zr,h):ao.addScaledVector(Zr.sub(e),h))}e.add(ao)}return e}raycast(t,e){const n=this.geometry,i=this.material,o=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),ro.copy(n.boundingSphere),ro.applyMatrix4(o),ai.copy(t.ray).recast(t.near),!(ro.containsPoint(ai.origin)===!1&&(ai.intersectSphere(ro,Sc)===null||ai.origin.distanceToSquared(Sc)>(t.far-t.near)**2))&&(_c.copy(o).invert(),ai.copy(t.ray).applyMatrix4(_c),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let i;const o=this.geometry,r=this.material,a=o.index,l=o.attributes.position,c=o.attributes.uv,h=o.attributes.uv1,d=o.attributes.normal,u=o.groups,f=o.drawRange;if(a!==null)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(a.count,Math.min(g.start+g.count,f.start+f.count));for(let M=x,w=y;M<w;M+=3){const S=a.getX(M),b=a.getX(M+1),A=a.getX(M+2);i=po(this,m,t,n,c,h,d,S,b,A),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=a.getX(g),y=a.getX(g+1),M=a.getX(g+2);i=po(this,r,t,n,c,h,d,x,y,M),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}else if(l!==void 0)if(Array.isArray(r))for(let p=0,v=u.length;p<v;p++){const g=u[p],m=r[g.materialIndex],x=Math.max(g.start,f.start),y=Math.min(l.count,Math.min(g.start+g.count,f.start+f.count));for(let M=x,w=y;M<w;M+=3){const S=M,b=M+1,A=M+2;i=po(this,m,t,n,c,h,d,S,b,A),i&&(i.faceIndex=Math.floor(M/3),i.face.materialIndex=g.materialIndex,e.push(i))}}else{const p=Math.max(0,f.start),v=Math.min(l.count,f.start+f.count);for(let g=p,m=v;g<m;g+=3){const x=g,y=g+1,M=g+2;i=po(this,r,t,n,c,h,d,x,y,M),i&&(i.faceIndex=Math.floor(g/3),e.push(i))}}}}function Jf(s,t,e,n,i,o,r,a){let l;if(t.side===je?l=n.intersectTriangle(r,o,i,!0,a):l=n.intersectTriangle(i,o,r,t.side===ei,a),l===null)return null;fo.copy(a),fo.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(fo);return c<e.near||c>e.far?null:{distance:c,point:fo.clone(),object:s}}function po(s,t,e,n,i,o,r,a,l,c){s.getVertexPosition(a,Ui),s.getVertexPosition(l,Fi),s.getVertexPosition(c,Oi);const h=Jf(s,t,e,n,Ui,Fi,Oi,uo);if(h){i&&(lo.fromBufferAttribute(i,a),co.fromBufferAttribute(i,l),ho.fromBufferAttribute(i,c),h.uv=gn.getInterpolation(uo,Ui,Fi,Oi,lo,co,ho,new nt)),o&&(lo.fromBufferAttribute(o,a),co.fromBufferAttribute(o,l),ho.fromBufferAttribute(o,c),h.uv1=gn.getInterpolation(uo,Ui,Fi,Oi,lo,co,ho,new nt),h.uv2=h.uv1),r&&(wc.fromBufferAttribute(r,a),bc.fromBufferAttribute(r,l),Ec.fromBufferAttribute(r,c),h.normal=gn.getInterpolation(uo,Ui,Fi,Oi,wc,bc,Ec,new z),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:l,c,normal:new z,materialIndex:0};gn.getNormal(Ui,Fi,Oi,d.normal),h.face=d}return h}class Rt extends ae{constructor(t=1,e=1,n=1,i=1,o=1,r=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:o,depthSegments:r};const a=this;i=Math.floor(i),o=Math.floor(o),r=Math.floor(r);const l=[],c=[],h=[],d=[];let u=0,f=0;p("z","y","x",-1,-1,n,e,t,r,o,0),p("z","y","x",1,-1,n,e,-t,r,o,1),p("x","z","y",1,1,t,n,e,i,r,2),p("x","z","y",1,-1,t,n,-e,i,r,3),p("x","y","z",1,-1,t,e,n,i,o,4),p("x","y","z",-1,-1,t,e,-n,i,o,5),this.setIndex(l),this.setAttribute("position",new ee(c,3)),this.setAttribute("normal",new ee(h,3)),this.setAttribute("uv",new ee(d,2));function p(v,g,m,x,y,M,w,S,b,A,_){const E=M/b,N=w/A,D=M/2,F=w/2,R=S/2,L=b+1,U=A+1;let q=0,H=0;const G=new z;for(let j=0;j<U;j++){const k=j*N-F;for(let V=0;V<L;V++){const Y=V*E-D;G[v]=Y*x,G[g]=k*y,G[m]=R,c.push(G.x,G.y,G.z),G[v]=0,G[g]=0,G[m]=S>0?1:-1,h.push(G.x,G.y,G.z),d.push(V/b),d.push(1-j/A),q+=1}}for(let j=0;j<A;j++)for(let k=0;k<b;k++){const V=u+k+L*j,Y=u+k+L*(j+1),et=u+(k+1)+L*(j+1),ht=u+(k+1)+L*j;l.push(V,Y,ht),l.push(Y,et,ht),H+=6}a.addGroup(f,H,_),f+=H,u+=q}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Rt(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function is(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function Ye(s){const t={};for(let e=0;e<s.length;e++){const n=is(s[e]);for(const i in n)t[i]=n[i]}return t}function Qf(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function Eu(s){return s.getRenderTarget()===null?s.outputColorSpace:se.workingColorSpace}const Qe={clone:is,merge:Ye};var $f=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,tp=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ve extends rs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=$f,this.fragmentShader=tp,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=is(t.uniforms),this.uniformsGroups=Qf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const r=this.uniforms[i].value;r&&r.isTexture?e.uniforms[i]={type:"t",value:r.toJSON(t).uuid}:r&&r.isColor?e.uniforms[i]={type:"c",value:r.getHex()}:r&&r.isVector2?e.uniforms[i]={type:"v2",value:r.toArray()}:r&&r.isVector3?e.uniforms[i]={type:"v3",value:r.toArray()}:r&&r.isVector4?e.uniforms[i]={type:"v4",value:r.toArray()}:r&&r.isMatrix3?e.uniforms[i]={type:"m3",value:r.toArray()}:r&&r.isMatrix4?e.uniforms[i]={type:"m4",value:r.toArray()}:e.uniforms[i]={value:r}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class Tu extends Be{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new $t,this.projectionMatrix=new $t,this.projectionMatrixInverse=new $t,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class nn extends Tu{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Os*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Rs*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Os*2*Math.atan(Math.tan(Rs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,o,r){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Rs*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,o=-.5*i;const r=this.view;if(this.view!==null&&this.view.enabled){const l=r.fullWidth,c=r.fullHeight;o+=r.offsetX*i/l,e-=r.offsetY*n/c,i*=r.width/l,n*=r.height/c}const a=this.filmOffset;a!==0&&(o+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(o,o+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const zi=-90,Bi=1;class ep extends Be{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new nn(zi,Bi,t,e);i.layers=this.layers,this.add(i);const o=new nn(zi,Bi,t,e);o.layers=this.layers,this.add(o);const r=new nn(zi,Bi,t,e);r.layers=this.layers,this.add(r);const a=new nn(zi,Bi,t,e);a.layers=this.layers,this.add(a);const l=new nn(zi,Bi,t,e);l.layers=this.layers,this.add(l);const c=new nn(zi,Bi,t,e);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,o,r,a,l]=e;for(const c of e)this.remove(c);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),o.up.set(0,0,-1),o.lookAt(0,1,0),r.up.set(0,0,1),r.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(t===ar)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),o.up.set(0,0,1),o.lookAt(0,1,0),r.up.set(0,0,-1),r.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const c of e)this.add(c),c.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[o,r,a,l,c,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),p=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,o),t.setRenderTarget(n,1,i),t.render(e,r),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,l),t.setRenderTarget(n,4,i),t.render(e,c),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=p,n.texture.needsPMREMUpdate=!0}}class Au extends ze{constructor(t,e,n,i,o,r,a,l,c,h){t=t!==void 0?t:[],e=e!==void 0?e:ts,super(t,e,n,i,o,r,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class np extends Ze{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Ls("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===vi?Qt:hn),this.texture=new Au(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Je}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new Rt(5,5,5),o=new ve({name:"CubemapFromEquirect",uniforms:is(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:je,blending:Oe});o.uniforms.tEquirect.value=e;const r=new Q(i,o),a=e.minFilter;return e.minFilter===ns&&(e.minFilter=Je),new ep(1,10,this).update(t,r),e.minFilter=a,r.geometry.dispose(),r.material.dispose(),this}clear(t,e,n,i){const o=t.getRenderTarget();for(let r=0;r<6;r++)t.setRenderTarget(this,r),t.clear(e,n,i);t.setRenderTarget(o)}}const Kr=new z,ip=new z,sp=new Jt;class di{constructor(t=new z(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Kr.subVectors(n,e).cross(ip.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Kr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const o=-(t.start.dot(this.normal)+this.constant)/i;return o<0||o>1?null:e.copy(t.start).addScaledVector(n,o)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||sp.getNormalMatrix(t),i=this.coplanarPoint(Kr).applyMatrix4(t),o=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(o),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const li=new Hs,mo=new z;class il{constructor(t=new di,e=new di,n=new di,i=new di,o=new di,r=new di){this.planes=[t,e,n,i,o,r]}set(t,e,n,i,o,r){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(o),a[5].copy(r),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn){const n=this.planes,i=t.elements,o=i[0],r=i[1],a=i[2],l=i[3],c=i[4],h=i[5],d=i[6],u=i[7],f=i[8],p=i[9],v=i[10],g=i[11],m=i[12],x=i[13],y=i[14],M=i[15];if(n[0].setComponents(l-o,u-c,g-f,M-m).normalize(),n[1].setComponents(l+o,u+c,g+f,M+m).normalize(),n[2].setComponents(l+r,u+h,g+p,M+x).normalize(),n[3].setComponents(l-r,u-h,g-p,M-x).normalize(),n[4].setComponents(l-a,u-d,g-v,M-y).normalize(),e===zn)n[5].setComponents(l+a,u+d,g+v,M+y).normalize();else if(e===ar)n[5].setComponents(a,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),li.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),li.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(li)}intersectsSprite(t){return li.center.set(0,0,0),li.radius=.7071067811865476,li.applyMatrix4(t.matrixWorld),this.intersectsSphere(li)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let o=0;o<6;o++)if(e[o].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(mo.x=i.normal.x>0?t.max.x:t.min.x,mo.y=i.normal.y>0?t.max.y:t.min.y,mo.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(mo)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function Cu(){let s=null,t=!1,e=null,n=null;function i(o,r){e(o,r),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(o){e=o},setContext:function(o){s=o}}}function op(s,t){const e=t.isWebGL2,n=new WeakMap;function i(c,h){const d=c.array,u=c.usage,f=d.byteLength,p=s.createBuffer();s.bindBuffer(h,p),s.bufferData(h,d,u),c.onUploadCallback();let v;if(d instanceof Float32Array)v=s.FLOAT;else if(d instanceof Uint16Array)if(c.isFloat16BufferAttribute)if(e)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=s.SHORT;else if(d instanceof Uint32Array)v=s.UNSIGNED_INT;else if(d instanceof Int32Array)v=s.INT;else if(d instanceof Int8Array)v=s.BYTE;else if(d instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:p,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:c.version,size:f}}function o(c,h,d){const u=h.array,f=h._updateRange,p=h.updateRanges;if(s.bindBuffer(d,c),f.count===-1&&p.length===0&&s.bufferSubData(d,0,u),p.length!==0){for(let v=0,g=p.length;v<g;v++){const m=p[v];e?s.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u,m.start,m.count):s.bufferSubData(d,m.start*u.BYTES_PER_ELEMENT,u.subarray(m.start,m.start+m.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function r(c){return c.isInterleavedBufferAttribute&&(c=c.data),n.get(c)}function a(c){c.isInterleavedBufferAttribute&&(c=c.data);const h=n.get(c);h&&(s.deleteBuffer(h.buffer),n.delete(c))}function l(c,h){if(c.isGLBufferAttribute){const u=n.get(c);(!u||u.version<c.version)&&n.set(c,{buffer:c.buffer,type:c.type,bytesPerElement:c.elementSize,version:c.version});return}c.isInterleavedBufferAttribute&&(c=c.data);const d=n.get(c);if(d===void 0)n.set(c,i(c,h));else if(d.version<c.version){if(d.size!==c.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");o(d.buffer,c,h),d.version=c.version}}return{get:r,remove:a,update:l}}class Ce extends ae{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const o=t/2,r=e/2,a=Math.floor(n),l=Math.floor(i),c=a+1,h=l+1,d=t/a,u=e/l,f=[],p=[],v=[],g=[];for(let m=0;m<h;m++){const x=m*u-r;for(let y=0;y<c;y++){const M=y*d-o;p.push(M,-x,0),v.push(0,0,1),g.push(y/a),g.push(1-m/l)}}for(let m=0;m<l;m++)for(let x=0;x<a;x++){const y=x+c*m,M=x+c*(m+1),w=x+1+c*(m+1),S=x+1+c*m;f.push(y,M,S),f.push(M,w,S)}this.setIndex(f),this.setAttribute("position",new ee(p,3)),this.setAttribute("normal",new ee(v,3)),this.setAttribute("uv",new ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ce(t.width,t.height,t.widthSegments,t.heightSegments)}}var rp=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,ap=`#ifdef USE_ALPHAHASH
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
#endif`,lp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,cp=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,hp=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,up=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,dp=`#ifdef USE_AOMAP
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
#endif`,fp=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,pp=`#ifdef USE_BATCHING
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
#endif`,mp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,gp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,vp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,xp=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,yp=`#ifdef USE_IRIDESCENCE
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
#endif`,Mp=`#ifdef USE_BUMPMAP
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
#endif`,_p=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,Sp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,wp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Ep=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Ap=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,Cp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,Rp=`#define PI 3.141592653589793
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
} // validated`,Pp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,Lp=`vec3 transformedNormal = objectNormal;
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
#endif`,Ip=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Dp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Np=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Up=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Fp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Op=`
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
}`,zp=`#ifdef USE_ENVMAP
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
#endif`,Bp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,kp=`#ifdef USE_ENVMAP
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
#endif`,Gp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Vp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Xp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,qp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Yp=`#ifdef USE_GRADIENTMAP
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
}`,jp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Zp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,Kp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Jp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Qp=`uniform bool receiveShadow;
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
#endif`,$p=`#ifdef USE_ENVMAP
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
#endif`,tm=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,em=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,nm=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,im=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,sm=`PhysicalMaterial material;
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
#endif`,om=`struct PhysicalMaterial {
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
}`,rm=`
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
#endif`,am=`#if defined( RE_IndirectDiffuse )
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
#endif`,lm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,cm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,hm=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,um=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,dm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,fm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,pm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,mm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,gm=`#if defined( USE_POINTS_UV )
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
#endif`,vm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,xm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,ym=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,Mm=`#ifdef USE_MORPHNORMALS
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
#endif`,_m=`#ifdef USE_MORPHTARGETS
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
#endif`,Sm=`#ifdef USE_MORPHTARGETS
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
#endif`,wm=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,bm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,Em=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Am=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Cm=`#ifdef USE_NORMALMAP
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
#endif`,Rm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,Pm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Lm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Im=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Dm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Nm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,Um=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Fm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Om=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,zm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Bm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,km=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Gm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Hm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Wm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Vm=`float getShadowMask() {
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
}`,Xm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,qm=`#ifdef USE_SKINNING
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
#endif`,Ym=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,jm=`#ifdef USE_SKINNING
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
#endif`,Zm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,Km=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Jm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Qm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,$m=`#ifdef USE_TRANSMISSION
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
#endif`,t0=`#ifdef USE_TRANSMISSION
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
#endif`,e0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,n0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,i0=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,s0=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const o0=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,r0=`uniform sampler2D t2D;
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
}`,a0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,l0=`#ifdef ENVMAP_TYPE_CUBE
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
}`,c0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,h0=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,u0=`#include <common>
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
}`,d0=`#if DEPTH_PACKING == 3200
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
}`,f0=`#define DISTANCE
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
}`,p0=`#define DISTANCE
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
}`,m0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,g0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,v0=`uniform float scale;
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
}`,x0=`uniform vec3 diffuse;
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
}`,y0=`#include <common>
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
}`,M0=`uniform vec3 diffuse;
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
}`,_0=`#define LAMBERT
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
}`,S0=`#define LAMBERT
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
}`,w0=`#define MATCAP
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
}`,b0=`#define MATCAP
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
}`,E0=`#define NORMAL
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
}`,T0=`#define NORMAL
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
}`,A0=`#define PHONG
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
}`,C0=`#define PHONG
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
}`,R0=`#define STANDARD
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
}`,P0=`#define STANDARD
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
}`,L0=`#define TOON
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
}`,I0=`#define TOON
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
}`,D0=`uniform float size;
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
}`,N0=`uniform vec3 diffuse;
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
}`,U0=`#include <common>
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
}`,F0=`uniform vec3 color;
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
}`,O0=`uniform float rotation;
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
}`,z0=`uniform vec3 diffuse;
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
}`,jt={alphahash_fragment:rp,alphahash_pars_fragment:ap,alphamap_fragment:lp,alphamap_pars_fragment:cp,alphatest_fragment:hp,alphatest_pars_fragment:up,aomap_fragment:dp,aomap_pars_fragment:fp,batching_pars_vertex:pp,batching_vertex:mp,begin_vertex:gp,beginnormal_vertex:vp,bsdfs:xp,iridescence_fragment:yp,bumpmap_pars_fragment:Mp,clipping_planes_fragment:_p,clipping_planes_pars_fragment:Sp,clipping_planes_pars_vertex:wp,clipping_planes_vertex:bp,color_fragment:Ep,color_pars_fragment:Tp,color_pars_vertex:Ap,color_vertex:Cp,common:Rp,cube_uv_reflection_fragment:Pp,defaultnormal_vertex:Lp,displacementmap_pars_vertex:Ip,displacementmap_vertex:Dp,emissivemap_fragment:Np,emissivemap_pars_fragment:Up,colorspace_fragment:Fp,colorspace_pars_fragment:Op,envmap_fragment:zp,envmap_common_pars_fragment:Bp,envmap_pars_fragment:kp,envmap_pars_vertex:Gp,envmap_physical_pars_fragment:$p,envmap_vertex:Hp,fog_vertex:Wp,fog_pars_vertex:Vp,fog_fragment:Xp,fog_pars_fragment:qp,gradientmap_pars_fragment:Yp,lightmap_fragment:jp,lightmap_pars_fragment:Zp,lights_lambert_fragment:Kp,lights_lambert_pars_fragment:Jp,lights_pars_begin:Qp,lights_toon_fragment:tm,lights_toon_pars_fragment:em,lights_phong_fragment:nm,lights_phong_pars_fragment:im,lights_physical_fragment:sm,lights_physical_pars_fragment:om,lights_fragment_begin:rm,lights_fragment_maps:am,lights_fragment_end:lm,logdepthbuf_fragment:cm,logdepthbuf_pars_fragment:hm,logdepthbuf_pars_vertex:um,logdepthbuf_vertex:dm,map_fragment:fm,map_pars_fragment:pm,map_particle_fragment:mm,map_particle_pars_fragment:gm,metalnessmap_fragment:vm,metalnessmap_pars_fragment:xm,morphcolor_vertex:ym,morphnormal_vertex:Mm,morphtarget_pars_vertex:_m,morphtarget_vertex:Sm,normal_fragment_begin:wm,normal_fragment_maps:bm,normal_pars_fragment:Em,normal_pars_vertex:Tm,normal_vertex:Am,normalmap_pars_fragment:Cm,clearcoat_normal_fragment_begin:Rm,clearcoat_normal_fragment_maps:Pm,clearcoat_pars_fragment:Lm,iridescence_pars_fragment:Im,opaque_fragment:Dm,packing:Nm,premultiplied_alpha_fragment:Um,project_vertex:Fm,dithering_fragment:Om,dithering_pars_fragment:zm,roughnessmap_fragment:Bm,roughnessmap_pars_fragment:km,shadowmap_pars_fragment:Gm,shadowmap_pars_vertex:Hm,shadowmap_vertex:Wm,shadowmask_pars_fragment:Vm,skinbase_vertex:Xm,skinning_pars_vertex:qm,skinning_vertex:Ym,skinnormal_vertex:jm,specularmap_fragment:Zm,specularmap_pars_fragment:Km,tonemapping_fragment:Jm,tonemapping_pars_fragment:Qm,transmission_fragment:$m,transmission_pars_fragment:t0,uv_pars_fragment:e0,uv_pars_vertex:n0,uv_vertex:i0,worldpos_vertex:s0,background_vert:o0,background_frag:r0,backgroundCube_vert:a0,backgroundCube_frag:l0,cube_vert:c0,cube_frag:h0,depth_vert:u0,depth_frag:d0,distanceRGBA_vert:f0,distanceRGBA_frag:p0,equirect_vert:m0,equirect_frag:g0,linedashed_vert:v0,linedashed_frag:x0,meshbasic_vert:y0,meshbasic_frag:M0,meshlambert_vert:_0,meshlambert_frag:S0,meshmatcap_vert:w0,meshmatcap_frag:b0,meshnormal_vert:E0,meshnormal_frag:T0,meshphong_vert:A0,meshphong_frag:C0,meshphysical_vert:R0,meshphysical_frag:P0,meshtoon_vert:L0,meshtoon_frag:I0,points_vert:D0,points_frag:N0,shadow_vert:U0,shadow_frag:F0,sprite_vert:O0,sprite_frag:z0},yt={common:{diffuse:{value:new Nt(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Jt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Jt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Jt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Jt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Jt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Jt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Jt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Jt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Jt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Nt(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Nt(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0},uvTransform:{value:new Jt}},sprite:{diffuse:{value:new Nt(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Jt},alphaMap:{value:null},alphaMapTransform:{value:new Jt},alphaTest:{value:0}}},bn={basic:{uniforms:Ye([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.fog]),vertexShader:jt.meshbasic_vert,fragmentShader:jt.meshbasic_frag},lambert:{uniforms:Ye([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:jt.meshlambert_vert,fragmentShader:jt.meshlambert_frag},phong:{uniforms:Ye([yt.common,yt.specularmap,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,yt.lights,{emissive:{value:new Nt(0)},specular:{value:new Nt(1118481)},shininess:{value:30}}]),vertexShader:jt.meshphong_vert,fragmentShader:jt.meshphong_frag},standard:{uniforms:Ye([yt.common,yt.envmap,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.roughnessmap,yt.metalnessmap,yt.fog,yt.lights,{emissive:{value:new Nt(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag},toon:{uniforms:Ye([yt.common,yt.aomap,yt.lightmap,yt.emissivemap,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.gradientmap,yt.fog,yt.lights,{emissive:{value:new Nt(0)}}]),vertexShader:jt.meshtoon_vert,fragmentShader:jt.meshtoon_frag},matcap:{uniforms:Ye([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,yt.fog,{matcap:{value:null}}]),vertexShader:jt.meshmatcap_vert,fragmentShader:jt.meshmatcap_frag},points:{uniforms:Ye([yt.points,yt.fog]),vertexShader:jt.points_vert,fragmentShader:jt.points_frag},dashed:{uniforms:Ye([yt.common,yt.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:jt.linedashed_vert,fragmentShader:jt.linedashed_frag},depth:{uniforms:Ye([yt.common,yt.displacementmap]),vertexShader:jt.depth_vert,fragmentShader:jt.depth_frag},normal:{uniforms:Ye([yt.common,yt.bumpmap,yt.normalmap,yt.displacementmap,{opacity:{value:1}}]),vertexShader:jt.meshnormal_vert,fragmentShader:jt.meshnormal_frag},sprite:{uniforms:Ye([yt.sprite,yt.fog]),vertexShader:jt.sprite_vert,fragmentShader:jt.sprite_frag},background:{uniforms:{uvTransform:{value:new Jt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:jt.background_vert,fragmentShader:jt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:jt.backgroundCube_vert,fragmentShader:jt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:jt.cube_vert,fragmentShader:jt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:jt.equirect_vert,fragmentShader:jt.equirect_frag},distanceRGBA:{uniforms:Ye([yt.common,yt.displacementmap,{referencePosition:{value:new z},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:jt.distanceRGBA_vert,fragmentShader:jt.distanceRGBA_frag},shadow:{uniforms:Ye([yt.lights,yt.fog,{color:{value:new Nt(0)},opacity:{value:1}}]),vertexShader:jt.shadow_vert,fragmentShader:jt.shadow_frag}};bn.physical={uniforms:Ye([bn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Jt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Jt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Jt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Jt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Jt},sheen:{value:0},sheenColor:{value:new Nt(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Jt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Jt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Jt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Jt},attenuationDistance:{value:0},attenuationColor:{value:new Nt(0)},specularColor:{value:new Nt(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Jt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Jt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Jt}}]),vertexShader:jt.meshphysical_vert,fragmentShader:jt.meshphysical_frag};const go={r:0,b:0,g:0};function B0(s,t,e,n,i,o,r){const a=new Nt(0);let l=o===!0?0:1,c,h,d=null,u=0,f=null;function p(g,m){let x=!1,y=m.isScene===!0?m.background:null;y&&y.isTexture&&(y=(m.backgroundBlurriness>0?e:t).get(y)),y===null?v(a,l):y&&y.isColor&&(v(y,1),x=!0);const M=s.xr.getEnvironmentBlendMode();M==="additive"?n.buffers.color.setClear(0,0,0,1,r):M==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,r),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===pr)?(h===void 0&&(h=new Q(new Rt(1,1,1),new ve({name:"BackgroundCubeMaterial",uniforms:is(bn.backgroundCube.uniforms),vertexShader:bn.backgroundCube.vertexShader,fragmentShader:bn.backgroundCube.fragmentShader,side:je,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(w,S,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=m.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,h.material.toneMapped=se.getTransfer(y.colorSpace)!==ue,(d!==y||u!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),h.layers.enableAll(),g.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(c===void 0&&(c=new Q(new Ce(2,2),new ve({name:"BackgroundMaterial",uniforms:is(bn.background.uniforms),vertexShader:bn.background.vertexShader,fragmentShader:bn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=y,c.material.uniforms.backgroundIntensity.value=m.backgroundIntensity,c.material.toneMapped=se.getTransfer(y.colorSpace)!==ue,y.matrixAutoUpdate===!0&&y.updateMatrix(),c.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||f!==s.toneMapping)&&(c.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),c.layers.enableAll(),g.unshift(c,c.geometry,c.material,0,0,null))}function v(g,m){g.getRGB(go,Eu(s)),n.buffers.color.setClear(go.r,go.g,go.b,m,r)}return{getClearColor:function(){return a},setClearColor:function(g,m=1){a.set(g),l=m,v(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(g){l=g,v(a,l)},render:p}}function k0(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),o=n.isWebGL2?null:t.get("OES_vertex_array_object"),r=n.isWebGL2||o!==null,a={},l=g(null);let c=l,h=!1;function d(R,L,U,q,H){let G=!1;if(r){const j=v(q,U,L);c!==j&&(c=j,f(c.object)),G=m(R,q,U,H),G&&x(R,q,U,H)}else{const j=L.wireframe===!0;(c.geometry!==q.id||c.program!==U.id||c.wireframe!==j)&&(c.geometry=q.id,c.program=U.id,c.wireframe=j,G=!0)}H!==null&&e.update(H,s.ELEMENT_ARRAY_BUFFER),(G||h)&&(h=!1,A(R,L,U,q),H!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(H).buffer))}function u(){return n.isWebGL2?s.createVertexArray():o.createVertexArrayOES()}function f(R){return n.isWebGL2?s.bindVertexArray(R):o.bindVertexArrayOES(R)}function p(R){return n.isWebGL2?s.deleteVertexArray(R):o.deleteVertexArrayOES(R)}function v(R,L,U){const q=U.wireframe===!0;let H=a[R.id];H===void 0&&(H={},a[R.id]=H);let G=H[L.id];G===void 0&&(G={},H[L.id]=G);let j=G[q];return j===void 0&&(j=g(u()),G[q]=j),j}function g(R){const L=[],U=[],q=[];for(let H=0;H<i;H++)L[H]=0,U[H]=0,q[H]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:L,enabledAttributes:U,attributeDivisors:q,object:R,attributes:{},index:null}}function m(R,L,U,q){const H=c.attributes,G=L.attributes;let j=0;const k=U.getAttributes();for(const V in k)if(k[V].location>=0){const et=H[V];let ht=G[V];if(ht===void 0&&(V==="instanceMatrix"&&R.instanceMatrix&&(ht=R.instanceMatrix),V==="instanceColor"&&R.instanceColor&&(ht=R.instanceColor)),et===void 0||et.attribute!==ht||ht&&et.data!==ht.data)return!0;j++}return c.attributesNum!==j||c.index!==q}function x(R,L,U,q){const H={},G=L.attributes;let j=0;const k=U.getAttributes();for(const V in k)if(k[V].location>=0){let et=G[V];et===void 0&&(V==="instanceMatrix"&&R.instanceMatrix&&(et=R.instanceMatrix),V==="instanceColor"&&R.instanceColor&&(et=R.instanceColor));const ht={};ht.attribute=et,et&&et.data&&(ht.data=et.data),H[V]=ht,j++}c.attributes=H,c.attributesNum=j,c.index=q}function y(){const R=c.newAttributes;for(let L=0,U=R.length;L<U;L++)R[L]=0}function M(R){w(R,0)}function w(R,L){const U=c.newAttributes,q=c.enabledAttributes,H=c.attributeDivisors;U[R]=1,q[R]===0&&(s.enableVertexAttribArray(R),q[R]=1),H[R]!==L&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](R,L),H[R]=L)}function S(){const R=c.newAttributes,L=c.enabledAttributes;for(let U=0,q=L.length;U<q;U++)L[U]!==R[U]&&(s.disableVertexAttribArray(U),L[U]=0)}function b(R,L,U,q,H,G,j){j===!0?s.vertexAttribIPointer(R,L,U,H,G):s.vertexAttribPointer(R,L,U,q,H,G)}function A(R,L,U,q){if(n.isWebGL2===!1&&(R.isInstancedMesh||q.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;y();const H=q.attributes,G=U.getAttributes(),j=L.defaultAttributeValues;for(const k in G){const V=G[k];if(V.location>=0){let Y=H[k];if(Y===void 0&&(k==="instanceMatrix"&&R.instanceMatrix&&(Y=R.instanceMatrix),k==="instanceColor"&&R.instanceColor&&(Y=R.instanceColor)),Y!==void 0){const et=Y.normalized,ht=Y.itemSize,ut=e.get(Y);if(ut===void 0)continue;const it=ut.buffer,ft=ut.type,pt=ut.bytesPerElement,dt=n.isWebGL2===!0&&(ft===s.INT||ft===s.UNSIGNED_INT||Y.gpuType===lu);if(Y.isInterleavedBufferAttribute){const Mt=Y.data,O=Mt.stride,lt=Y.offset;if(Mt.isInstancedInterleavedBuffer){for(let Z=0;Z<V.locationSize;Z++)w(V.location+Z,Mt.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Mt.meshPerAttribute*Mt.count)}else for(let Z=0;Z<V.locationSize;Z++)M(V.location+Z);s.bindBuffer(s.ARRAY_BUFFER,it);for(let Z=0;Z<V.locationSize;Z++)b(V.location+Z,ht/V.locationSize,ft,et,O*pt,(lt+ht/V.locationSize*Z)*pt,dt)}else{if(Y.isInstancedBufferAttribute){for(let Mt=0;Mt<V.locationSize;Mt++)w(V.location+Mt,Y.meshPerAttribute);R.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let Mt=0;Mt<V.locationSize;Mt++)M(V.location+Mt);s.bindBuffer(s.ARRAY_BUFFER,it);for(let Mt=0;Mt<V.locationSize;Mt++)b(V.location+Mt,ht/V.locationSize,ft,et,ht*pt,ht/V.locationSize*Mt*pt,dt)}}else if(j!==void 0){const et=j[k];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(V.location,et);break;case 3:s.vertexAttrib3fv(V.location,et);break;case 4:s.vertexAttrib4fv(V.location,et);break;default:s.vertexAttrib1fv(V.location,et)}}}}S()}function _(){D();for(const R in a){const L=a[R];for(const U in L){const q=L[U];for(const H in q)p(q[H].object),delete q[H];delete L[U]}delete a[R]}}function E(R){if(a[R.id]===void 0)return;const L=a[R.id];for(const U in L){const q=L[U];for(const H in q)p(q[H].object),delete q[H];delete L[U]}delete a[R.id]}function N(R){for(const L in a){const U=a[L];if(U[R.id]===void 0)continue;const q=U[R.id];for(const H in q)p(q[H].object),delete q[H];delete U[R.id]}}function D(){F(),h=!0,c!==l&&(c=l,f(c.object))}function F(){l.geometry=null,l.program=null,l.wireframe=!1}return{setup:d,reset:D,resetDefaultState:F,dispose:_,releaseStatesOfGeometry:E,releaseStatesOfProgram:N,initAttributes:y,enableAttribute:M,disableUnusedAttributes:S}}function G0(s,t,e,n){const i=n.isWebGL2;let o;function r(h){o=h}function a(h,d){s.drawArrays(o,h,d),e.update(d,o,1)}function l(h,d,u){if(u===0)return;let f,p;if(i)f=s,p="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),p="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[p](o,h,d,u),e.update(d,o,u)}function c(h,d,u){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let p=0;p<u;p++)this.render(h[p],d[p]);else{f.multiDrawArraysWEBGL(o,h,0,d,0,u);let p=0;for(let v=0;v<u;v++)p+=d[v];e.update(p,o,1)}}this.setMode=r,this.render=a,this.renderInstances=l,this.renderMultiDraw=c}function H0(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function o(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const r=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const l=o(a);l!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",l,"instead."),a=l);const c=r||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),p=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),g=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),m=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=u>0,M=r||t.has("OES_texture_float"),w=y&&M,S=r?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:r,drawBuffers:c,getMaxAnisotropy:i,getMaxPrecision:o,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:p,maxAttributes:v,maxVertexUniforms:g,maxVaryings:m,maxFragmentUniforms:x,vertexTextures:y,floatFragmentTextures:M,floatVertexTextures:w,maxSamples:S}}function W0(s){const t=this;let e=null,n=0,i=!1,o=!1;const r=new di,a=new Jt,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){o=!0,h(null)},this.endShadows=function(){o=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const p=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,m=s.get(d);if(!i||p===null||p.length===0||o&&!g)o?h(null):c();else{const x=o?0:n,y=x*4;let M=m.clippingState||null;l.value=M,M=h(p,u,y,f);for(let w=0;w!==y;++w)M[w]=e[w];m.clippingState=M,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function c(){l.value!==e&&(l.value=e,l.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,p){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,p!==!0||g===null){const m=f+v*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(g===null||g.length<m)&&(g=new Float32Array(m));for(let y=0,M=f;y!==v;++y,M+=4)r.copy(d[y]).applyMatrix4(x,a),r.normal.toArray(g,M),g[M+3]=r.constant}l.value=g,l.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,g}}function V0(s){let t=new WeakMap;function e(r,a){return a===Fa?r.mapping=ts:a===Oa&&(r.mapping=es),r}function n(r){if(r&&r.isTexture){const a=r.mapping;if(a===Fa||a===Oa)if(t.has(r)){const l=t.get(r).texture;return e(l,r.mapping)}else{const l=r.image;if(l&&l.height>0){const c=new np(l.height/2);return c.fromEquirectangularTexture(s,r),t.set(r,c),r.addEventListener("dispose",i),e(c.texture,r.mapping)}else return null}}return r}function i(r){const a=r.target;a.removeEventListener("dispose",i);const l=t.get(a);l!==void 0&&(t.delete(a),l.dispose())}function o(){t=new WeakMap}return{get:n,dispose:o}}class sl extends Tu{constructor(t=-1,e=1,n=1,i=-1,o=.1,r=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=o,this.far=r,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,o,r){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=o,this.view.height=r,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let o=n-t,r=n+t,a=i+e,l=i-e;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;o+=c*this.view.offsetX,r=o+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(o,r,a,l,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const qi=4,Tc=[.125,.215,.35,.446,.526,.582],pi=20,Jr=new sl,Ac=new Nt;let Qr=null,$r=0,ta=0;const fi=(1+Math.sqrt(5))/2,ki=1/fi,Cc=[new z(1,1,1),new z(-1,1,1),new z(1,1,-1),new z(-1,1,-1),new z(0,fi,ki),new z(0,fi,-ki),new z(ki,0,fi),new z(-ki,0,fi),new z(fi,ki,0),new z(-fi,ki,0)];class Ga{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){Qr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel(),this._setSize(256);const o=this._allocateTargets();return o.depthBuffer=!0,this._sceneToCubeUV(t,n,i,o),e>0&&this._blur(o,0,0,e),this._applyPMREM(o),this._cleanup(o),o}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Lc(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Pc(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget(Qr,$r,ta),t.scissorTest=!1,vo(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===ts||t.mapping===es?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),Qr=this._renderer.getRenderTarget(),$r=this._renderer.getActiveCubeFace(),ta=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Je,minFilter:Je,generateMipmaps:!1,type:sn,format:cn,colorSpace:kn,depthBuffer:!1},i=Rc(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Rc(t,e,n);const{_lodMax:o}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=X0(o)),this._blurMaterial=q0(o,t,e)}return i}_compileMaterial(t){const e=new Q(this._lodPlanes[0],t);this._renderer.compile(e,Jr)}_sceneToCubeUV(t,e,n,i){const a=new nn(90,1,e,n),l=[1,-1,1,1,1,1],c=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(Ac),h.toneMapping=$n,h.autoClear=!1;const f=new bi({name:"PMREM.Background",side:je,depthWrite:!1,depthTest:!1}),p=new Q(new Rt,f);let v=!1;const g=t.background;g?g.isColor&&(f.color.copy(g),t.background=null,v=!0):(f.color.copy(Ac),v=!0);for(let m=0;m<6;m++){const x=m%3;x===0?(a.up.set(0,l[m],0),a.lookAt(c[m],0,0)):x===1?(a.up.set(0,0,l[m]),a.lookAt(0,c[m],0)):(a.up.set(0,l[m],0),a.lookAt(0,0,c[m]));const y=this._cubeSize;vo(i,x*y,m>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(p,a),h.render(t,a)}p.geometry.dispose(),p.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=g}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===ts||t.mapping===es;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Lc()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Pc());const o=i?this._cubemapMaterial:this._equirectMaterial,r=new Q(this._lodPlanes[0],o),a=o.uniforms;a.envMap.value=t;const l=this._cubeSize;vo(e,0,0,3*l,2*l),n.setRenderTarget(e),n.render(r,Jr)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const o=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),r=Cc[(i-1)%Cc.length];this._blur(t,i-1,i,o,r)}e.autoClear=n}_blur(t,e,n,i,o){const r=this._pingPongRenderTarget;this._halfBlur(t,r,e,n,i,"latitudinal",o),this._halfBlur(r,t,n,n,i,"longitudinal",o)}_halfBlur(t,e,n,i,o,r,a){const l=this._renderer,c=this._blurMaterial;r!=="latitudinal"&&r!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new Q(this._lodPlanes[i],c),u=c.uniforms,f=this._sizeLods[n]-1,p=isFinite(o)?Math.PI/(2*f):2*Math.PI/(2*pi-1),v=o/p,g=isFinite(o)?1+Math.floor(h*v):pi;g>pi&&console.warn(`sigmaRadians, ${o}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${pi}`);const m=[];let x=0;for(let b=0;b<pi;++b){const A=b/v,_=Math.exp(-A*A/2);m.push(_),b===0?x+=_:b<g&&(x+=2*_)}for(let b=0;b<m.length;b++)m[b]=m[b]/x;u.envMap.value=t.texture,u.samples.value=g,u.weights.value=m,u.latitudinal.value=r==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:y}=this;u.dTheta.value=p,u.mipInt.value=y-n;const M=this._sizeLods[i],w=3*M*(i>y-qi?i-y+qi:0),S=4*(this._cubeSize-M);vo(e,w,S,3*M,2*M),l.setRenderTarget(e),l.render(d,Jr)}}function X0(s){const t=[],e=[],n=[];let i=s;const o=s-qi+1+Tc.length;for(let r=0;r<o;r++){const a=Math.pow(2,i);e.push(a);let l=1/a;r>s-qi?l=Tc[r-s+qi-1]:r===0&&(l=0),n.push(l);const c=1/(a-2),h=-c,d=1+c,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,p=6,v=3,g=2,m=1,x=new Float32Array(v*p*f),y=new Float32Array(g*p*f),M=new Float32Array(m*p*f);for(let S=0;S<f;S++){const b=S%3*2/3-1,A=S>2?0:-1,_=[b,A,0,b+2/3,A,0,b+2/3,A+1,0,b,A,0,b+2/3,A+1,0,b,A+1,0];x.set(_,v*p*S),y.set(u,g*p*S);const E=[S,S,S,S,S,S];M.set(E,m*p*S)}const w=new ae;w.setAttribute("position",new ne(x,v)),w.setAttribute("uv",new ne(y,g)),w.setAttribute("faceIndex",new ne(M,m)),t.push(w),i>qi&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function Rc(s,t,e){const n=new Ze(s,t,e);return n.texture.mapping=pr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function vo(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function q0(s,t,e){const n=new Float32Array(pi),i=new z(0,1,0);return new ve({name:"SphericalGaussianBlur",defines:{n:pi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:ol(),fragmentShader:`

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
		`,blending:Oe,depthTest:!1,depthWrite:!1})}function Pc(){return new ve({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:ol(),fragmentShader:`

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
		`,blending:Oe,depthTest:!1,depthWrite:!1})}function Lc(){return new ve({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:ol(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Oe,depthTest:!1,depthWrite:!1})}function ol(){return`

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
	`}function Y0(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Fa||l===Oa,h=l===ts||l===es;if(c||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=t.get(a);return e===null&&(e=new Ga(s)),d=c?e.fromEquirectangular(a,d):e.fromCubemap(a,d),t.set(a,d),d.texture}else{if(t.has(a))return t.get(a).texture;{const d=a.image;if(c&&d&&d.height>0||h&&d&&i(d)){e===null&&(e=new Ga(s));const u=c?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,u),a.addEventListener("dispose",o),u.texture}else return null}}}return a}function i(a){let l=0;const c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function o(a){const l=a.target;l.removeEventListener("dispose",o);const c=t.get(l);c!==void 0&&(t.delete(l),c.dispose())}function r(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:r}}function j0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Z0(s,t,e,n){const i={},o=new WeakMap;function r(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const p in u.attributes)t.remove(u.attributes[p]);for(const p in u.morphAttributes){const v=u.morphAttributes[p];for(let g=0,m=v.length;g<m;g++)t.remove(v[g])}u.removeEventListener("dispose",r),delete i[u.id];const f=o.get(u);f&&(t.remove(f),o.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",r),i[u.id]=!0,e.memory.geometries++),u}function l(d){const u=d.attributes;for(const p in u)t.update(u[p],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const p in f){const v=f[p];for(let g=0,m=v.length;g<m;g++)t.update(v[g],s.ARRAY_BUFFER)}}function c(d){const u=[],f=d.index,p=d.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let y=0,M=x.length;y<M;y+=3){const w=x[y+0],S=x[y+1],b=x[y+2];u.push(w,S,S,b,b,w)}}else if(p!==void 0){const x=p.array;v=p.version;for(let y=0,M=x.length/3-1;y<M;y+=3){const w=y+0,S=y+1,b=y+2;u.push(w,S,S,b,b,w)}}else return;const g=new(vu(u)?bu:wu)(u,1);g.version=v;const m=o.get(d);m&&t.remove(m),o.set(d,g)}function h(d){const u=o.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&c(d)}else c(d);return o.get(d)}return{get:a,update:l,getWireframeAttribute:h}}function K0(s,t,e,n){const i=n.isWebGL2;let o;function r(f){o=f}let a,l;function c(f){a=f.type,l=f.bytesPerElement}function h(f,p){s.drawElements(o,p,a,f*l),e.update(p,o,1)}function d(f,p,v){if(v===0)return;let g,m;if(i)g=s,m="drawElementsInstanced";else if(g=t.get("ANGLE_instanced_arrays"),m="drawElementsInstancedANGLE",g===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}g[m](o,p,a,f*l,v),e.update(p,o,v)}function u(f,p,v){if(v===0)return;const g=t.get("WEBGL_multi_draw");if(g===null)for(let m=0;m<v;m++)this.render(f[m]/l,p[m]);else{g.multiDrawElementsWEBGL(o,p,0,a,f,0,v);let m=0;for(let x=0;x<v;x++)m+=p[x];e.update(m,o,1)}}this.setMode=r,this.setIndex=c,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function J0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(o,r,a){switch(e.calls++,r){case s.TRIANGLES:e.triangles+=a*(o/3);break;case s.LINES:e.lines+=a*(o/2);break;case s.LINE_STRIP:e.lines+=a*(o-1);break;case s.LINE_LOOP:e.lines+=a*o;break;case s.POINTS:e.points+=a*o;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",r);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function Q0(s,t){return s[0]-t[0]}function $0(s,t){return Math.abs(t[1])-Math.abs(s[1])}function tg(s,t,e){const n={},i=new Float32Array(8),o=new WeakMap,r=new Fe,a=[];for(let c=0;c<8;c++)a[c]=[c,0];function l(c,h,d){const u=c.morphTargetInfluences;if(t.isWebGL2===!0){const p=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=p!==void 0?p.length:0;let g=o.get(h);if(g===void 0||g.count!==v){let L=function(){F.dispose(),o.delete(h),h.removeEventListener("dispose",L)};var f=L;g!==void 0&&g.texture.dispose();const y=h.morphAttributes.position!==void 0,M=h.morphAttributes.normal!==void 0,w=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],A=h.morphAttributes.color||[];let _=0;y===!0&&(_=1),M===!0&&(_=2),w===!0&&(_=3);let E=h.attributes.position.count*_,N=1;E>t.maxTextureSize&&(N=Math.ceil(E/t.maxTextureSize),E=t.maxTextureSize);const D=new Float32Array(E*N*4*v),F=new Mu(D,E,N,v);F.type=Jn,F.needsUpdate=!0;const R=_*4;for(let U=0;U<v;U++){const q=S[U],H=b[U],G=A[U],j=E*N*4*U;for(let k=0;k<q.count;k++){const V=k*R;y===!0&&(r.fromBufferAttribute(q,k),D[j+V+0]=r.x,D[j+V+1]=r.y,D[j+V+2]=r.z,D[j+V+3]=0),M===!0&&(r.fromBufferAttribute(H,k),D[j+V+4]=r.x,D[j+V+5]=r.y,D[j+V+6]=r.z,D[j+V+7]=0),w===!0&&(r.fromBufferAttribute(G,k),D[j+V+8]=r.x,D[j+V+9]=r.y,D[j+V+10]=r.z,D[j+V+11]=G.itemSize===4?r.w:1)}}g={count:v,texture:F,size:new nt(E,N)},o.set(h,g),h.addEventListener("dispose",L)}let m=0;for(let y=0;y<u.length;y++)m+=u[y];const x=h.morphTargetsRelative?1:1-m;d.getUniforms().setValue(s,"morphTargetBaseInfluence",x),d.getUniforms().setValue(s,"morphTargetInfluences",u),d.getUniforms().setValue(s,"morphTargetsTexture",g.texture,e),d.getUniforms().setValue(s,"morphTargetsTextureSize",g.size)}else{const p=u===void 0?0:u.length;let v=n[h.id];if(v===void 0||v.length!==p){v=[];for(let M=0;M<p;M++)v[M]=[M,0];n[h.id]=v}for(let M=0;M<p;M++){const w=v[M];w[0]=M,w[1]=u[M]}v.sort($0);for(let M=0;M<8;M++)M<p&&v[M][1]?(a[M][0]=v[M][0],a[M][1]=v[M][1]):(a[M][0]=Number.MAX_SAFE_INTEGER,a[M][1]=0);a.sort(Q0);const g=h.morphAttributes.position,m=h.morphAttributes.normal;let x=0;for(let M=0;M<8;M++){const w=a[M],S=w[0],b=w[1];S!==Number.MAX_SAFE_INTEGER&&b?(g&&h.getAttribute("morphTarget"+M)!==g[S]&&h.setAttribute("morphTarget"+M,g[S]),m&&h.getAttribute("morphNormal"+M)!==m[S]&&h.setAttribute("morphNormal"+M,m[S]),i[M]=b,x+=b):(g&&h.hasAttribute("morphTarget"+M)===!0&&h.deleteAttribute("morphTarget"+M),m&&h.hasAttribute("morphNormal"+M)===!0&&h.deleteAttribute("morphNormal"+M),i[M]=0)}const y=h.morphTargetsRelative?1:1-x;d.getUniforms().setValue(s,"morphTargetBaseInfluence",y),d.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:l}}function eg(s,t,e,n){let i=new WeakMap;function o(l){const c=n.render.frame,h=l.geometry,d=t.get(l,h);if(i.get(d)!==c&&(t.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(e.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&e.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const u=l.skeleton;i.get(u)!==c&&(u.update(),i.set(u,c))}return d}function r(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),e.remove(c.instanceMatrix),c.instanceColor!==null&&e.remove(c.instanceColor)}return{update:o,dispose:r}}class rl extends ze{constructor(t,e,n,i,o,r,a,l,c,h){if(h=h!==void 0?h:gi,h!==gi&&h!==yi)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===gi&&(n=Kn),n===void 0&&h===yi&&(n=ti),super(null,i,o,r,a,l,h,n,c),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Se,this.minFilter=l!==void 0?l:Se,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const Ru=new ze,Pu=new rl(1,1);Pu.compareFunction=gu;const Lu=new Mu,Iu=new Bf,Du=new Au,Ic=[],Dc=[],Nc=new Float32Array(16),Uc=new Float32Array(9),Fc=new Float32Array(4);function as(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let o=Ic[i];if(o===void 0&&(o=new Float32Array(i),Ic[i]=o),t!==0){n.toArray(o,0);for(let r=1,a=0;r!==t;++r)a+=e,s[r].toArray(o,a)}return o}function Re(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Pe(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function gr(s,t){let e=Dc[t];e===void 0&&(e=new Int32Array(t),Dc[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function ng(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function ig(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2fv(this.addr,t),Pe(e,t)}}function sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(Re(e,t))return;s.uniform3fv(this.addr,t),Pe(e,t)}}function og(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4fv(this.addr,t),Pe(e,t)}}function rg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,n))return;Fc.set(n),s.uniformMatrix2fv(this.addr,!1,Fc),Pe(e,n)}}function ag(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,n))return;Uc.set(n),s.uniformMatrix3fv(this.addr,!1,Uc),Pe(e,n)}}function lg(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(Re(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Pe(e,t)}else{if(Re(e,n))return;Nc.set(n),s.uniformMatrix4fv(this.addr,!1,Nc),Pe(e,n)}}function cg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function hg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2iv(this.addr,t),Pe(e,t)}}function ug(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;s.uniform3iv(this.addr,t),Pe(e,t)}}function dg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4iv(this.addr,t),Pe(e,t)}}function fg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function pg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(Re(e,t))return;s.uniform2uiv(this.addr,t),Pe(e,t)}}function mg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(Re(e,t))return;s.uniform3uiv(this.addr,t),Pe(e,t)}}function gg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(Re(e,t))return;s.uniform4uiv(this.addr,t),Pe(e,t)}}function vg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const o=this.type===s.SAMPLER_2D_SHADOW?Pu:Ru;e.setTexture2D(t||o,i)}function xg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||Iu,i)}function yg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||Du,i)}function Mg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||Lu,i)}function _g(s){switch(s){case 5126:return ng;case 35664:return ig;case 35665:return sg;case 35666:return og;case 35674:return rg;case 35675:return ag;case 35676:return lg;case 5124:case 35670:return cg;case 35667:case 35671:return hg;case 35668:case 35672:return ug;case 35669:case 35673:return dg;case 5125:return fg;case 36294:return pg;case 36295:return mg;case 36296:return gg;case 35678:case 36198:case 36298:case 36306:case 35682:return vg;case 35679:case 36299:case 36307:return xg;case 35680:case 36300:case 36308:case 36293:return yg;case 36289:case 36303:case 36311:case 36292:return Mg}}function Sg(s,t){s.uniform1fv(this.addr,t)}function wg(s,t){const e=as(t,this.size,2);s.uniform2fv(this.addr,e)}function bg(s,t){const e=as(t,this.size,3);s.uniform3fv(this.addr,e)}function Eg(s,t){const e=as(t,this.size,4);s.uniform4fv(this.addr,e)}function Tg(s,t){const e=as(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function Ag(s,t){const e=as(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function Cg(s,t){const e=as(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function Rg(s,t){s.uniform1iv(this.addr,t)}function Pg(s,t){s.uniform2iv(this.addr,t)}function Lg(s,t){s.uniform3iv(this.addr,t)}function Ig(s,t){s.uniform4iv(this.addr,t)}function Dg(s,t){s.uniform1uiv(this.addr,t)}function Ng(s,t){s.uniform2uiv(this.addr,t)}function Ug(s,t){s.uniform3uiv(this.addr,t)}function Fg(s,t){s.uniform4uiv(this.addr,t)}function Og(s,t,e){const n=this.cache,i=t.length,o=gr(e,i);Re(n,o)||(s.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==i;++r)e.setTexture2D(t[r]||Ru,o[r])}function zg(s,t,e){const n=this.cache,i=t.length,o=gr(e,i);Re(n,o)||(s.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==i;++r)e.setTexture3D(t[r]||Iu,o[r])}function Bg(s,t,e){const n=this.cache,i=t.length,o=gr(e,i);Re(n,o)||(s.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==i;++r)e.setTextureCube(t[r]||Du,o[r])}function kg(s,t,e){const n=this.cache,i=t.length,o=gr(e,i);Re(n,o)||(s.uniform1iv(this.addr,o),Pe(n,o));for(let r=0;r!==i;++r)e.setTexture2DArray(t[r]||Lu,o[r])}function Gg(s){switch(s){case 5126:return Sg;case 35664:return wg;case 35665:return bg;case 35666:return Eg;case 35674:return Tg;case 35675:return Ag;case 35676:return Cg;case 5124:case 35670:return Rg;case 35667:case 35671:return Pg;case 35668:case 35672:return Lg;case 35669:case 35673:return Ig;case 5125:return Dg;case 36294:return Ng;case 36295:return Ug;case 36296:return Fg;case 35678:case 36198:case 36298:case 36306:case 35682:return Og;case 35679:case 36299:case 36307:return zg;case 35680:case 36300:case 36308:case 36293:return Bg;case 36289:case 36303:case 36311:case 36292:return kg}}class Hg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=_g(e.type)}}class Wg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Gg(e.type)}}class Vg{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let o=0,r=i.length;o!==r;++o){const a=i[o];a.setValue(t,e[a.id],n)}}}const ea=/(\w+)(\])?(\[|\.)?/g;function Oc(s,t){s.seq.push(t),s.map[t.id]=t}function Xg(s,t,e){const n=s.name,i=n.length;for(ea.lastIndex=0;;){const o=ea.exec(n),r=ea.lastIndex;let a=o[1];const l=o[2]==="]",c=o[3];if(l&&(a=a|0),c===void 0||c==="["&&r+2===i){Oc(e,c===void 0?new Hg(a,s,t):new Wg(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Vg(a),Oc(e,d)),e=d}}}class nr{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const o=t.getActiveUniform(e,i),r=t.getUniformLocation(e,o.name);Xg(o,r,this)}}setValue(t,e,n,i){const o=this.map[e];o!==void 0&&o.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let o=0,r=e.length;o!==r;++o){const a=e[o],l=n[a.id];l.needsUpdate!==!1&&a.setValue(t,l.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,o=t.length;i!==o;++i){const r=t[i];r.id in e&&n.push(r)}return n}}function zc(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const qg=37297;let Yg=0;function jg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),o=Math.min(t+6,e.length);for(let r=i;r<o;r++){const a=r+1;n.push(`${a===t?">":" "} ${a}: ${e[r]}`)}return n.join(`
`)}function Zg(s){const t=se.getPrimaries(se.workingColorSpace),e=se.getPrimaries(s);let n;switch(t===e?n="":t===rr&&e===or?n="LinearDisplayP3ToLinearSRGB":t===or&&e===rr&&(n="LinearSRGBToLinearDisplayP3"),s){case kn:case mr:return[n,"LinearTransferOETF"];case Qt:case el:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Bc(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const o=/ERROR: 0:(\d+)/.exec(i);if(o){const r=parseInt(o[1]);return e.toUpperCase()+`

`+i+`

`+jg(s.getShaderSource(t),r)}else return i}function Kg(s,t){const e=Zg(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Jg(s,t){let e;switch(t){case iu:e="Linear";break;case su:e="Reinhard";break;case ou:e="OptimizedCineon";break;case Qa:e="ACESFilmic";break;case ru:e="AgX";break;case Qd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Qg(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Yi).join(`
`)}function $g(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Yi).join(`
`)}function tv(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function ev(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const o=s.getActiveAttrib(t,i),r=o.name;let a=1;o.type===s.FLOAT_MAT2&&(a=2),o.type===s.FLOAT_MAT3&&(a=3),o.type===s.FLOAT_MAT4&&(a=4),e[r]={type:o.type,location:s.getAttribLocation(t,r),locationSize:a}}return e}function Yi(s){return s!==""}function kc(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Gc(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const nv=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ha(s){return s.replace(nv,sv)}const iv=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function sv(s,t){let e=jt[t];if(e===void 0){const n=iv.get(t);if(n!==void 0)e=jt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ha(e)}const ov=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Hc(s){return s.replace(ov,rv)}function rv(s,t,e,n){let i="";for(let o=parseInt(t);o<parseInt(e);o++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+o+" ]").replace(/UNROLLED_LOOP_INDEX/g,o);return i}function Wc(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function av(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===$h?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===tu?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===On&&(t="SHADOWMAP_TYPE_VSM"),t}function lv(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ts:case es:t="ENVMAP_TYPE_CUBE";break;case pr:t="ENVMAP_TYPE_CUBE_UV";break}return t}function cv(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case es:t="ENVMAP_MODE_REFRACTION";break}return t}function hv(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case nu:t="ENVMAP_BLENDING_MULTIPLY";break;case Kd:t="ENVMAP_BLENDING_MIX";break;case Jd:t="ENVMAP_BLENDING_ADD";break}return t}function uv(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function dv(s,t,e,n){const i=s.getContext(),o=e.defines;let r=e.vertexShader,a=e.fragmentShader;const l=av(e),c=lv(e),h=cv(e),d=hv(e),u=uv(e),f=e.isWebGL2?"":Qg(e),p=$g(e),v=tv(o),g=i.createProgram();let m,x,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(m=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Yi).join(`
`),m.length>0&&(m+=`
`),x=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Yi).join(`
`),x.length>0&&(x+=`
`)):(m=[Wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Yi).join(`
`),x=[f,Wc(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+c:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+l:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?jt.tonemapping_pars_fragment:"",e.toneMapping!==$n?Jg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",jt.colorspace_pars_fragment,Kg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Yi).join(`
`)),r=Ha(r),r=kc(r,e),r=Gc(r,e),a=Ha(a),a=kc(a,e),a=Gc(a,e),r=Hc(r),a=Hc(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,m=[p,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,x=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===lc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===lc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const M=y+m+r,w=y+x+a,S=zc(i,i.VERTEX_SHADER,M),b=zc(i,i.FRAGMENT_SHADER,w);i.attachShader(g,S),i.attachShader(g,b),e.index0AttributeName!==void 0?i.bindAttribLocation(g,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(g,0,"position"),i.linkProgram(g);function A(D){if(s.debug.checkShaderErrors){const F=i.getProgramInfoLog(g).trim(),R=i.getShaderInfoLog(S).trim(),L=i.getShaderInfoLog(b).trim();let U=!0,q=!0;if(i.getProgramParameter(g,i.LINK_STATUS)===!1)if(U=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,g,S,b);else{const H=Bc(i,S,"vertex"),G=Bc(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(g,i.VALIDATE_STATUS)+`

Program Info Log: `+F+`
`+H+`
`+G)}else F!==""?console.warn("THREE.WebGLProgram: Program Info Log:",F):(R===""||L==="")&&(q=!1);q&&(D.diagnostics={runnable:U,programLog:F,vertexShader:{log:R,prefix:m},fragmentShader:{log:L,prefix:x}})}i.deleteShader(S),i.deleteShader(b),_=new nr(i,g),E=ev(i,g)}let _;this.getUniforms=function(){return _===void 0&&A(this),_};let E;this.getAttributes=function(){return E===void 0&&A(this),E};let N=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return N===!1&&(N=i.getProgramParameter(g,qg)),N},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(g),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Yg++,this.cacheKey=t,this.usedTimes=1,this.program=g,this.vertexShader=S,this.fragmentShader=b,this}let fv=0;class pv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),o=this._getShaderStage(n),r=this._getShaderCacheForMaterial(t);return r.has(i)===!1&&(r.add(i),i.usedTimes++),r.has(o)===!1&&(r.add(o),o.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new mv(t),e.set(t,n)),n}}class mv{constructor(t){this.id=fv++,this.code=t,this.usedTimes=0}}function gv(s,t,e,n,i,o,r){const a=new _u,l=new pv,c=[],h=i.isWebGL2,d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const p={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(_){return _===0?"uv":`uv${_}`}function g(_,E,N,D,F){const R=D.fog,L=F.geometry,U=_.isMeshStandardMaterial?D.environment:null,q=(_.isMeshStandardMaterial?e:t).get(_.envMap||U),H=q&&q.mapping===pr?q.image.height:null,G=p[_.type];_.precision!==null&&(f=i.getMaxPrecision(_.precision),f!==_.precision&&console.warn("THREE.WebGLProgram.getParameters:",_.precision,"not supported, using",f,"instead."));const j=L.morphAttributes.position||L.morphAttributes.normal||L.morphAttributes.color,k=j!==void 0?j.length:0;let V=0;L.morphAttributes.position!==void 0&&(V=1),L.morphAttributes.normal!==void 0&&(V=2),L.morphAttributes.color!==void 0&&(V=3);let Y,et,ht,ut;if(G){const Ve=bn[G];Y=Ve.vertexShader,et=Ve.fragmentShader}else Y=_.vertexShader,et=_.fragmentShader,l.update(_),ht=l.getVertexShaderID(_),ut=l.getFragmentShaderID(_);const it=s.getRenderTarget(),ft=F.isInstancedMesh===!0,pt=F.isBatchedMesh===!0,dt=!!_.map,Mt=!!_.matcap,O=!!q,lt=!!_.aoMap,Z=!!_.lightMap,ct=!!_.bumpMap,tt=!!_.normalMap,Tt=!!_.displacementMap,vt=!!_.emissiveMap,P=!!_.metalnessMap,C=!!_.roughnessMap,W=_.anisotropy>0,rt=_.clearcoat>0,ot=_.iridescence>0,st=_.sheen>0,xt=_.transmission>0,mt=W&&!!_.anisotropyMap,St=rt&&!!_.clearcoatMap,Dt=rt&&!!_.clearcoatNormalMap,Ft=rt&&!!_.clearcoatRoughnessMap,at=ot&&!!_.iridescenceMap,Yt=ot&&!!_.iridescenceThicknessMap,Xt=st&&!!_.sheenColorMap,Bt=st&&!!_.sheenRoughnessMap,_t=!!_.specularMap,Et=!!_.specularColorMap,Ht=!!_.specularIntensityMap,te=xt&&!!_.transmissionMap,oe=xt&&!!_.thicknessMap,Wt=!!_.gradientMap,gt=!!_.alphaMap,B=_.alphaTest>0,wt=!!_.alphaHash,bt=!!_.extensions,kt=!!L.attributes.uv1,Ot=!!L.attributes.uv2,le=!!L.attributes.uv3;let ce=$n;return _.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(ce=s.toneMapping),{isWebGL2:h,shaderID:G,shaderType:_.type,shaderName:_.name,vertexShader:Y,fragmentShader:et,defines:_.defines,customVertexShaderID:ht,customFragmentShaderID:ut,isRawShaderMaterial:_.isRawShaderMaterial===!0,glslVersion:_.glslVersion,precision:f,batching:pt,instancing:ft,instancingColor:ft&&F.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:it===null?s.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:kn,map:dt,matcap:Mt,envMap:O,envMapMode:O&&q.mapping,envMapCubeUVHeight:H,aoMap:lt,lightMap:Z,bumpMap:ct,normalMap:tt,displacementMap:u&&Tt,emissiveMap:vt,normalMapObjectSpace:tt&&_.normalMapType===uf,normalMapTangentSpace:tt&&_.normalMapType===tl,metalnessMap:P,roughnessMap:C,anisotropy:W,anisotropyMap:mt,clearcoat:rt,clearcoatMap:St,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Ft,iridescence:ot,iridescenceMap:at,iridescenceThicknessMap:Yt,sheen:st,sheenColorMap:Xt,sheenRoughnessMap:Bt,specularMap:_t,specularColorMap:Et,specularIntensityMap:Ht,transmission:xt,transmissionMap:te,thicknessMap:oe,gradientMap:Wt,opaque:_.transparent===!1&&_.blending===Ki,alphaMap:gt,alphaTest:B,alphaHash:wt,combine:_.combine,mapUv:dt&&v(_.map.channel),aoMapUv:lt&&v(_.aoMap.channel),lightMapUv:Z&&v(_.lightMap.channel),bumpMapUv:ct&&v(_.bumpMap.channel),normalMapUv:tt&&v(_.normalMap.channel),displacementMapUv:Tt&&v(_.displacementMap.channel),emissiveMapUv:vt&&v(_.emissiveMap.channel),metalnessMapUv:P&&v(_.metalnessMap.channel),roughnessMapUv:C&&v(_.roughnessMap.channel),anisotropyMapUv:mt&&v(_.anisotropyMap.channel),clearcoatMapUv:St&&v(_.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&v(_.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Ft&&v(_.clearcoatRoughnessMap.channel),iridescenceMapUv:at&&v(_.iridescenceMap.channel),iridescenceThicknessMapUv:Yt&&v(_.iridescenceThicknessMap.channel),sheenColorMapUv:Xt&&v(_.sheenColorMap.channel),sheenRoughnessMapUv:Bt&&v(_.sheenRoughnessMap.channel),specularMapUv:_t&&v(_.specularMap.channel),specularColorMapUv:Et&&v(_.specularColorMap.channel),specularIntensityMapUv:Ht&&v(_.specularIntensityMap.channel),transmissionMapUv:te&&v(_.transmissionMap.channel),thicknessMapUv:oe&&v(_.thicknessMap.channel),alphaMapUv:gt&&v(_.alphaMap.channel),vertexTangents:!!L.attributes.tangent&&(tt||W),vertexColors:_.vertexColors,vertexAlphas:_.vertexColors===!0&&!!L.attributes.color&&L.attributes.color.itemSize===4,vertexUv1s:kt,vertexUv2s:Ot,vertexUv3s:le,pointsUvs:F.isPoints===!0&&!!L.attributes.uv&&(dt||gt),fog:!!R,useFog:_.fog===!0,fogExp2:R&&R.isFogExp2,flatShading:_.flatShading===!0,sizeAttenuation:_.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:F.isSkinnedMesh===!0,morphTargets:L.morphAttributes.position!==void 0,morphNormals:L.morphAttributes.normal!==void 0,morphColors:L.morphAttributes.color!==void 0,morphTargetsCount:k,morphTextureStride:V,numDirLights:E.directional.length,numPointLights:E.point.length,numSpotLights:E.spot.length,numSpotLightMaps:E.spotLightMap.length,numRectAreaLights:E.rectArea.length,numHemiLights:E.hemi.length,numDirLightShadows:E.directionalShadowMap.length,numPointLightShadows:E.pointShadowMap.length,numSpotLightShadows:E.spotShadowMap.length,numSpotLightShadowsWithMaps:E.numSpotLightShadowsWithMaps,numLightProbes:E.numLightProbes,numClippingPlanes:r.numPlanes,numClipIntersection:r.numIntersection,dithering:_.dithering,shadowMapEnabled:s.shadowMap.enabled&&N.length>0,shadowMapType:s.shadowMap.type,toneMapping:ce,useLegacyLights:s._useLegacyLights,decodeVideoTexture:dt&&_.map.isVideoTexture===!0&&se.getTransfer(_.map.colorSpace)===ue,premultipliedAlpha:_.premultipliedAlpha,doubleSided:_.side===Ae,flipSided:_.side===je,useDepthPacking:_.depthPacking>=0,depthPacking:_.depthPacking||0,index0AttributeName:_.index0AttributeName,extensionDerivatives:bt&&_.extensions.derivatives===!0,extensionFragDepth:bt&&_.extensions.fragDepth===!0,extensionDrawBuffers:bt&&_.extensions.drawBuffers===!0,extensionShaderTextureLOD:bt&&_.extensions.shaderTextureLOD===!0,extensionClipCullDistance:bt&&_.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:_.customProgramCacheKey()}}function m(_){const E=[];if(_.shaderID?E.push(_.shaderID):(E.push(_.customVertexShaderID),E.push(_.customFragmentShaderID)),_.defines!==void 0)for(const N in _.defines)E.push(N),E.push(_.defines[N]);return _.isRawShaderMaterial===!1&&(x(E,_),y(E,_),E.push(s.outputColorSpace)),E.push(_.customProgramCacheKey),E.join()}function x(_,E){_.push(E.precision),_.push(E.outputColorSpace),_.push(E.envMapMode),_.push(E.envMapCubeUVHeight),_.push(E.mapUv),_.push(E.alphaMapUv),_.push(E.lightMapUv),_.push(E.aoMapUv),_.push(E.bumpMapUv),_.push(E.normalMapUv),_.push(E.displacementMapUv),_.push(E.emissiveMapUv),_.push(E.metalnessMapUv),_.push(E.roughnessMapUv),_.push(E.anisotropyMapUv),_.push(E.clearcoatMapUv),_.push(E.clearcoatNormalMapUv),_.push(E.clearcoatRoughnessMapUv),_.push(E.iridescenceMapUv),_.push(E.iridescenceThicknessMapUv),_.push(E.sheenColorMapUv),_.push(E.sheenRoughnessMapUv),_.push(E.specularMapUv),_.push(E.specularColorMapUv),_.push(E.specularIntensityMapUv),_.push(E.transmissionMapUv),_.push(E.thicknessMapUv),_.push(E.combine),_.push(E.fogExp2),_.push(E.sizeAttenuation),_.push(E.morphTargetsCount),_.push(E.morphAttributeCount),_.push(E.numDirLights),_.push(E.numPointLights),_.push(E.numSpotLights),_.push(E.numSpotLightMaps),_.push(E.numHemiLights),_.push(E.numRectAreaLights),_.push(E.numDirLightShadows),_.push(E.numPointLightShadows),_.push(E.numSpotLightShadows),_.push(E.numSpotLightShadowsWithMaps),_.push(E.numLightProbes),_.push(E.shadowMapType),_.push(E.toneMapping),_.push(E.numClippingPlanes),_.push(E.numClipIntersection),_.push(E.depthPacking)}function y(_,E){a.disableAll(),E.isWebGL2&&a.enable(0),E.supportsVertexTextures&&a.enable(1),E.instancing&&a.enable(2),E.instancingColor&&a.enable(3),E.matcap&&a.enable(4),E.envMap&&a.enable(5),E.normalMapObjectSpace&&a.enable(6),E.normalMapTangentSpace&&a.enable(7),E.clearcoat&&a.enable(8),E.iridescence&&a.enable(9),E.alphaTest&&a.enable(10),E.vertexColors&&a.enable(11),E.vertexAlphas&&a.enable(12),E.vertexUv1s&&a.enable(13),E.vertexUv2s&&a.enable(14),E.vertexUv3s&&a.enable(15),E.vertexTangents&&a.enable(16),E.anisotropy&&a.enable(17),E.alphaHash&&a.enable(18),E.batching&&a.enable(19),_.push(a.mask),a.disableAll(),E.fog&&a.enable(0),E.useFog&&a.enable(1),E.flatShading&&a.enable(2),E.logarithmicDepthBuffer&&a.enable(3),E.skinning&&a.enable(4),E.morphTargets&&a.enable(5),E.morphNormals&&a.enable(6),E.morphColors&&a.enable(7),E.premultipliedAlpha&&a.enable(8),E.shadowMapEnabled&&a.enable(9),E.useLegacyLights&&a.enable(10),E.doubleSided&&a.enable(11),E.flipSided&&a.enable(12),E.useDepthPacking&&a.enable(13),E.dithering&&a.enable(14),E.transmission&&a.enable(15),E.sheen&&a.enable(16),E.opaque&&a.enable(17),E.pointsUvs&&a.enable(18),E.decodeVideoTexture&&a.enable(19),_.push(a.mask)}function M(_){const E=p[_.type];let N;if(E){const D=bn[E];N=Qe.clone(D.uniforms)}else N=_.uniforms;return N}function w(_,E){let N;for(let D=0,F=c.length;D<F;D++){const R=c[D];if(R.cacheKey===E){N=R,++N.usedTimes;break}}return N===void 0&&(N=new dv(s,E,_,o),c.push(N)),N}function S(_){if(--_.usedTimes===0){const E=c.indexOf(_);c[E]=c[c.length-1],c.pop(),_.destroy()}}function b(_){l.remove(_)}function A(){l.dispose()}return{getParameters:g,getProgramCacheKey:m,getUniforms:M,acquireProgram:w,releaseProgram:S,releaseShaderCache:b,programs:c,dispose:A}}function vv(){let s=new WeakMap;function t(o){let r=s.get(o);return r===void 0&&(r={},s.set(o,r)),r}function e(o){s.delete(o)}function n(o,r,a){s.get(o)[r]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function xv(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Vc(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Xc(){const s=[];let t=0;const e=[],n=[],i=[];function o(){t=0,e.length=0,n.length=0,i.length=0}function r(d,u,f,p,v,g){let m=s[t];return m===void 0?(m={id:d.id,object:d,geometry:u,material:f,groupOrder:p,renderOrder:d.renderOrder,z:v,group:g},s[t]=m):(m.id=d.id,m.object=d,m.geometry=u,m.material=f,m.groupOrder=p,m.renderOrder=d.renderOrder,m.z=v,m.group=g),t++,m}function a(d,u,f,p,v,g){const m=r(d,u,f,p,v,g);f.transmission>0?n.push(m):f.transparent===!0?i.push(m):e.push(m)}function l(d,u,f,p,v,g){const m=r(d,u,f,p,v,g);f.transmission>0?n.unshift(m):f.transparent===!0?i.unshift(m):e.unshift(m)}function c(d,u){e.length>1&&e.sort(d||xv),n.length>1&&n.sort(u||Vc),i.length>1&&i.sort(u||Vc)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:o,push:a,unshift:l,finish:h,sort:c}}function yv(){let s=new WeakMap;function t(n,i){const o=s.get(n);let r;return o===void 0?(r=new Xc,s.set(n,[r])):i>=o.length?(r=new Xc,o.push(r)):r=o[i],r}function e(){s=new WeakMap}return{get:t,dispose:e}}function Mv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new z,color:new Nt};break;case"SpotLight":e={position:new z,direction:new z,color:new Nt,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new z,color:new Nt,distance:0,decay:0};break;case"HemisphereLight":e={direction:new z,skyColor:new Nt,groundColor:new Nt};break;case"RectAreaLight":e={color:new Nt,position:new z,halfWidth:new z,halfHeight:new z};break}return s[t.id]=e,e}}}function _v(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let Sv=0;function wv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function bv(s,t){const e=new Mv,n=_v(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new z);const o=new z,r=new $t,a=new $t;function l(h,d){let u=0,f=0,p=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let v=0,g=0,m=0,x=0,y=0,M=0,w=0,S=0,b=0,A=0,_=0;h.sort(wv);const E=d===!0?Math.PI:1;for(let D=0,F=h.length;D<F;D++){const R=h[D],L=R.color,U=R.intensity,q=R.distance,H=R.shadow&&R.shadow.map?R.shadow.map.texture:null;if(R.isAmbientLight)u+=L.r*U*E,f+=L.g*U*E,p+=L.b*U*E;else if(R.isLightProbe){for(let G=0;G<9;G++)i.probe[G].addScaledVector(R.sh.coefficients[G],U);_++}else if(R.isDirectionalLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity*E),R.castShadow){const j=R.shadow,k=n.get(R);k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,i.directionalShadow[v]=k,i.directionalShadowMap[v]=H,i.directionalShadowMatrix[v]=R.shadow.matrix,M++}i.directional[v]=G,v++}else if(R.isSpotLight){const G=e.get(R);G.position.setFromMatrixPosition(R.matrixWorld),G.color.copy(L).multiplyScalar(U*E),G.distance=q,G.coneCos=Math.cos(R.angle),G.penumbraCos=Math.cos(R.angle*(1-R.penumbra)),G.decay=R.decay,i.spot[m]=G;const j=R.shadow;if(R.map&&(i.spotLightMap[b]=R.map,b++,j.updateMatrices(R),R.castShadow&&A++),i.spotLightMatrix[m]=j.matrix,R.castShadow){const k=n.get(R);k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,i.spotShadow[m]=k,i.spotShadowMap[m]=H,S++}m++}else if(R.isRectAreaLight){const G=e.get(R);G.color.copy(L).multiplyScalar(U),G.halfWidth.set(R.width*.5,0,0),G.halfHeight.set(0,R.height*.5,0),i.rectArea[x]=G,x++}else if(R.isPointLight){const G=e.get(R);if(G.color.copy(R.color).multiplyScalar(R.intensity*E),G.distance=R.distance,G.decay=R.decay,R.castShadow){const j=R.shadow,k=n.get(R);k.shadowBias=j.bias,k.shadowNormalBias=j.normalBias,k.shadowRadius=j.radius,k.shadowMapSize=j.mapSize,k.shadowCameraNear=j.camera.near,k.shadowCameraFar=j.camera.far,i.pointShadow[g]=k,i.pointShadowMap[g]=H,i.pointShadowMatrix[g]=R.shadow.matrix,w++}i.point[g]=G,g++}else if(R.isHemisphereLight){const G=e.get(R);G.skyColor.copy(R.color).multiplyScalar(U*E),G.groundColor.copy(R.groundColor).multiplyScalar(U*E),i.hemi[y]=G,y++}}x>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_FLOAT_1,i.rectAreaLTC2=yt.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=yt.LTC_HALF_1,i.rectAreaLTC2=yt.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=p;const N=i.hash;(N.directionalLength!==v||N.pointLength!==g||N.spotLength!==m||N.rectAreaLength!==x||N.hemiLength!==y||N.numDirectionalShadows!==M||N.numPointShadows!==w||N.numSpotShadows!==S||N.numSpotMaps!==b||N.numLightProbes!==_)&&(i.directional.length=v,i.spot.length=m,i.rectArea.length=x,i.point.length=g,i.hemi.length=y,i.directionalShadow.length=M,i.directionalShadowMap.length=M,i.pointShadow.length=w,i.pointShadowMap.length=w,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=M,i.pointShadowMatrix.length=w,i.spotLightMatrix.length=S+b-A,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=A,i.numLightProbes=_,N.directionalLength=v,N.pointLength=g,N.spotLength=m,N.rectAreaLength=x,N.hemiLength=y,N.numDirectionalShadows=M,N.numPointShadows=w,N.numSpotShadows=S,N.numSpotMaps=b,N.numLightProbes=_,i.version=Sv++)}function c(h,d){let u=0,f=0,p=0,v=0,g=0;const m=d.matrixWorldInverse;for(let x=0,y=h.length;x<y;x++){const M=h[x];if(M.isDirectionalLight){const w=i.directional[u];w.direction.setFromMatrixPosition(M.matrixWorld),o.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(m),u++}else if(M.isSpotLight){const w=i.spot[p];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),w.direction.setFromMatrixPosition(M.matrixWorld),o.setFromMatrixPosition(M.target.matrixWorld),w.direction.sub(o),w.direction.transformDirection(m),p++}else if(M.isRectAreaLight){const w=i.rectArea[v];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),a.identity(),r.copy(M.matrixWorld),r.premultiply(m),a.extractRotation(r),w.halfWidth.set(M.width*.5,0,0),w.halfHeight.set(0,M.height*.5,0),w.halfWidth.applyMatrix4(a),w.halfHeight.applyMatrix4(a),v++}else if(M.isPointLight){const w=i.point[f];w.position.setFromMatrixPosition(M.matrixWorld),w.position.applyMatrix4(m),f++}else if(M.isHemisphereLight){const w=i.hemi[g];w.direction.setFromMatrixPosition(M.matrixWorld),w.direction.transformDirection(m),g++}}}return{setup:l,setupView:c,state:i}}function qc(s,t){const e=new bv(s,t),n=[],i=[];function o(){n.length=0,i.length=0}function r(d){n.push(d)}function a(d){i.push(d)}function l(d){e.setup(n,d)}function c(d){e.setupView(n,d)}return{init:o,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:l,setupLightsView:c,pushLight:r,pushShadow:a}}function Ev(s,t){let e=new WeakMap;function n(o,r=0){const a=e.get(o);let l;return a===void 0?(l=new qc(s,t),e.set(o,[l])):r>=a.length?(l=new qc(s,t),a.push(l)):l=a[r],l}function i(){e=new WeakMap}return{get:n,dispose:i}}class Tv extends rs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=cf,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class Av extends rs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const Cv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Rv=`uniform sampler2D shadow_pass;
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
}`;function Pv(s,t,e){let n=new il;const i=new nt,o=new nt,r=new Fe,a=new Tv({depthPacking:hf}),l=new Av,c={},h=e.maxTextureSize,d={[ei]:je,[je]:ei,[Ae]:Ae},u=new ve({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:Cv,fragmentShader:Rv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const p=new ae;p.setAttribute("position",new ne(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new Q(p,u),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=$h;let m=this.type;this.render=function(S,b,A){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||S.length===0)return;const _=s.getRenderTarget(),E=s.getActiveCubeFace(),N=s.getActiveMipmapLevel(),D=s.state;D.setBlending(Oe),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const F=m!==On&&this.type===On,R=m===On&&this.type!==On;for(let L=0,U=S.length;L<U;L++){const q=S[L],H=q.shadow;if(H===void 0){console.warn("THREE.WebGLShadowMap:",q,"has no shadow.");continue}if(H.autoUpdate===!1&&H.needsUpdate===!1)continue;i.copy(H.mapSize);const G=H.getFrameExtents();if(i.multiply(G),o.copy(H.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(o.x=Math.floor(h/G.x),i.x=o.x*G.x,H.mapSize.x=o.x),i.y>h&&(o.y=Math.floor(h/G.y),i.y=o.y*G.y,H.mapSize.y=o.y)),H.map===null||F===!0||R===!0){const k=this.type!==On?{minFilter:Se,magFilter:Se}:{};H.map!==null&&H.map.dispose(),H.map=new Ze(i.x,i.y,k),H.map.texture.name=q.name+".shadowMap",H.camera.updateProjectionMatrix()}s.setRenderTarget(H.map),s.clear();const j=H.getViewportCount();for(let k=0;k<j;k++){const V=H.getViewport(k);r.set(o.x*V.x,o.y*V.y,o.x*V.z,o.y*V.w),D.viewport(r),H.updateMatrices(q,k),n=H.getFrustum(),M(b,A,H.camera,q,this.type)}H.isPointLightShadow!==!0&&this.type===On&&x(H,A),H.needsUpdate=!1}m=this.type,g.needsUpdate=!1,s.setRenderTarget(_,E,N)};function x(S,b){const A=t.update(v);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Ze(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(b,null,A,u,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(b,null,A,f,v,null)}function y(S,b,A,_){let E=null;const N=A.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(N!==void 0)E=N;else if(E=A.isPointLight===!0?l:a,s.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const D=E.uuid,F=b.uuid;let R=c[D];R===void 0&&(R={},c[D]=R);let L=R[F];L===void 0&&(L=E.clone(),R[F]=L,b.addEventListener("dispose",w)),E=L}if(E.visible=b.visible,E.wireframe=b.wireframe,_===On?E.side=b.shadowSide!==null?b.shadowSide:b.side:E.side=b.shadowSide!==null?b.shadowSide:d[b.side],E.alphaMap=b.alphaMap,E.alphaTest=b.alphaTest,E.map=b.map,E.clipShadows=b.clipShadows,E.clippingPlanes=b.clippingPlanes,E.clipIntersection=b.clipIntersection,E.displacementMap=b.displacementMap,E.displacementScale=b.displacementScale,E.displacementBias=b.displacementBias,E.wireframeLinewidth=b.wireframeLinewidth,E.linewidth=b.linewidth,A.isPointLight===!0&&E.isMeshDistanceMaterial===!0){const D=s.properties.get(E);D.light=A}return E}function M(S,b,A,_,E){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&E===On)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(A.matrixWorldInverse,S.matrixWorld);const F=t.update(S),R=S.material;if(Array.isArray(R)){const L=F.groups;for(let U=0,q=L.length;U<q;U++){const H=L[U],G=R[H.materialIndex];if(G&&G.visible){const j=y(S,G,_,E);S.onBeforeShadow(s,S,b,A,F,j,H),s.renderBufferDirect(A,null,F,j,S,H),S.onAfterShadow(s,S,b,A,F,j,H)}}}else if(R.visible){const L=y(S,R,_,E);S.onBeforeShadow(s,S,b,A,F,L,null),s.renderBufferDirect(A,null,F,L,S,null),S.onAfterShadow(s,S,b,A,F,L,null)}}const D=S.children;for(let F=0,R=D.length;F<R;F++)M(D[F],b,A,_,E)}function w(S){S.target.removeEventListener("dispose",w);for(const A in c){const _=c[A],E=S.target.uuid;E in _&&(_[E].dispose(),delete _[E])}}}function Lv(s,t,e){const n=e.isWebGL2;function i(){let B=!1;const wt=new Fe;let bt=null;const kt=new Fe(0,0,0,0);return{setMask:function(Ot){bt!==Ot&&!B&&(s.colorMask(Ot,Ot,Ot,Ot),bt=Ot)},setLocked:function(Ot){B=Ot},setClear:function(Ot,le,ce,Ie,Ve){Ve===!0&&(Ot*=Ie,le*=Ie,ce*=Ie),wt.set(Ot,le,ce,Ie),kt.equals(wt)===!1&&(s.clearColor(Ot,le,ce,Ie),kt.copy(wt))},reset:function(){B=!1,bt=null,kt.set(-1,0,0,0)}}}function o(){let B=!1,wt=null,bt=null,kt=null;return{setTest:function(Ot){Ot?pt(s.DEPTH_TEST):dt(s.DEPTH_TEST)},setMask:function(Ot){wt!==Ot&&!B&&(s.depthMask(Ot),wt=Ot)},setFunc:function(Ot){if(bt!==Ot){switch(Ot){case Wd:s.depthFunc(s.NEVER);break;case Vd:s.depthFunc(s.ALWAYS);break;case Xd:s.depthFunc(s.LESS);break;case ir:s.depthFunc(s.LEQUAL);break;case qd:s.depthFunc(s.EQUAL);break;case Yd:s.depthFunc(s.GEQUAL);break;case jd:s.depthFunc(s.GREATER);break;case Zd:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}bt=Ot}},setLocked:function(Ot){B=Ot},setClear:function(Ot){kt!==Ot&&(s.clearDepth(Ot),kt=Ot)},reset:function(){B=!1,wt=null,bt=null,kt=null}}}function r(){let B=!1,wt=null,bt=null,kt=null,Ot=null,le=null,ce=null,Ie=null,Ve=null;return{setTest:function(he){B||(he?pt(s.STENCIL_TEST):dt(s.STENCIL_TEST))},setMask:function(he){wt!==he&&!B&&(s.stencilMask(he),wt=he)},setFunc:function(he,Xe,Mn){(bt!==he||kt!==Xe||Ot!==Mn)&&(s.stencilFunc(he,Xe,Mn),bt=he,kt=Xe,Ot=Mn)},setOp:function(he,Xe,Mn){(le!==he||ce!==Xe||Ie!==Mn)&&(s.stencilOp(he,Xe,Mn),le=he,ce=Xe,Ie=Mn)},setLocked:function(he){B=he},setClear:function(he){Ve!==he&&(s.clearStencil(he),Ve=he)},reset:function(){B=!1,wt=null,bt=null,kt=null,Ot=null,le=null,ce=null,Ie=null,Ve=null}}}const a=new i,l=new o,c=new r,h=new WeakMap,d=new WeakMap;let u={},f={},p=new WeakMap,v=[],g=null,m=!1,x=null,y=null,M=null,w=null,S=null,b=null,A=null,_=new Nt(0,0,0),E=0,N=!1,D=null,F=null,R=null,L=null,U=null;const q=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let H=!1,G=0;const j=s.getParameter(s.VERSION);j.indexOf("WebGL")!==-1?(G=parseFloat(/^WebGL (\d)/.exec(j)[1]),H=G>=1):j.indexOf("OpenGL ES")!==-1&&(G=parseFloat(/^OpenGL ES (\d)/.exec(j)[1]),H=G>=2);let k=null,V={};const Y=s.getParameter(s.SCISSOR_BOX),et=s.getParameter(s.VIEWPORT),ht=new Fe().fromArray(Y),ut=new Fe().fromArray(et);function it(B,wt,bt,kt){const Ot=new Uint8Array(4),le=s.createTexture();s.bindTexture(B,le),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ce=0;ce<bt;ce++)n&&(B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY)?s.texImage3D(wt,0,s.RGBA,1,1,kt,0,s.RGBA,s.UNSIGNED_BYTE,Ot):s.texImage2D(wt+ce,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Ot);return le}const ft={};ft[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),ft[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(ft[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ft[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),l.setClear(1),c.setClear(0),pt(s.DEPTH_TEST),l.setFunc(ir),vt(!1),P(Pl),pt(s.CULL_FACE),tt(Oe);function pt(B){u[B]!==!0&&(s.enable(B),u[B]=!0)}function dt(B){u[B]!==!1&&(s.disable(B),u[B]=!1)}function Mt(B,wt){return f[B]!==wt?(s.bindFramebuffer(B,wt),f[B]=wt,n&&(B===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=wt),B===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=wt)),!0):!1}function O(B,wt){let bt=v,kt=!1;if(B)if(bt=p.get(wt),bt===void 0&&(bt=[],p.set(wt,bt)),B.isWebGLMultipleRenderTargets){const Ot=B.texture;if(bt.length!==Ot.length||bt[0]!==s.COLOR_ATTACHMENT0){for(let le=0,ce=Ot.length;le<ce;le++)bt[le]=s.COLOR_ATTACHMENT0+le;bt.length=Ot.length,kt=!0}}else bt[0]!==s.COLOR_ATTACHMENT0&&(bt[0]=s.COLOR_ATTACHMENT0,kt=!0);else bt[0]!==s.BACK&&(bt[0]=s.BACK,kt=!0);kt&&(e.isWebGL2?s.drawBuffers(bt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(bt))}function lt(B){return g!==B?(s.useProgram(B),g=B,!0):!1}const Z={[vn]:s.FUNC_ADD,[Ld]:s.FUNC_SUBTRACT,[Id]:s.FUNC_REVERSE_SUBTRACT};if(n)Z[Il]=s.MIN,Z[Dl]=s.MAX;else{const B=t.get("EXT_blend_minmax");B!==null&&(Z[Il]=B.MIN_EXT,Z[Dl]=B.MAX_EXT)}const ct={[As]:s.ZERO,[Dd]:s.ONE,[Nd]:s.SRC_COLOR,[Ia]:s.SRC_ALPHA,[zd]:s.SRC_ALPHA_SATURATE,[Ua]:s.DST_COLOR,[Na]:s.DST_ALPHA,[Ud]:s.ONE_MINUS_SRC_COLOR,[Da]:s.ONE_MINUS_SRC_ALPHA,[Od]:s.ONE_MINUS_DST_COLOR,[Fd]:s.ONE_MINUS_DST_ALPHA,[Bd]:s.CONSTANT_COLOR,[kd]:s.ONE_MINUS_CONSTANT_COLOR,[Gd]:s.CONSTANT_ALPHA,[Hd]:s.ONE_MINUS_CONSTANT_ALPHA};function tt(B,wt,bt,kt,Ot,le,ce,Ie,Ve,he){if(B===Oe){m===!0&&(dt(s.BLEND),m=!1);return}if(m===!1&&(pt(s.BLEND),m=!0),B!==eu){if(B!==x||he!==N){if((y!==vn||S!==vn)&&(s.blendEquation(s.FUNC_ADD),y=vn,S=vn),he)switch(B){case Ki:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pa:s.blendFunc(s.ONE,s.ONE);break;case Ll:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case La:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case Ki:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Pa:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Ll:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case La:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}M=null,w=null,b=null,A=null,_.set(0,0,0),E=0,x=B,N=he}return}Ot=Ot||wt,le=le||bt,ce=ce||kt,(wt!==y||Ot!==S)&&(s.blendEquationSeparate(Z[wt],Z[Ot]),y=wt,S=Ot),(bt!==M||kt!==w||le!==b||ce!==A)&&(s.blendFuncSeparate(ct[bt],ct[kt],ct[le],ct[ce]),M=bt,w=kt,b=le,A=ce),(Ie.equals(_)===!1||Ve!==E)&&(s.blendColor(Ie.r,Ie.g,Ie.b,Ve),_.copy(Ie),E=Ve),x=B,N=!1}function Tt(B,wt){B.side===Ae?dt(s.CULL_FACE):pt(s.CULL_FACE);let bt=B.side===je;wt&&(bt=!bt),vt(bt),B.blending===Ki&&B.transparent===!1?tt(Oe):tt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),l.setFunc(B.depthFunc),l.setTest(B.depthTest),l.setMask(B.depthWrite),a.setMask(B.colorWrite);const kt=B.stencilWrite;c.setTest(kt),kt&&(c.setMask(B.stencilWriteMask),c.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),c.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),W(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?pt(s.SAMPLE_ALPHA_TO_COVERAGE):dt(s.SAMPLE_ALPHA_TO_COVERAGE)}function vt(B){D!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),D=B)}function P(B){B!==Rd?(pt(s.CULL_FACE),B!==F&&(B===Pl?s.cullFace(s.BACK):B===Pd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):dt(s.CULL_FACE),F=B}function C(B){B!==R&&(H&&s.lineWidth(B),R=B)}function W(B,wt,bt){B?(pt(s.POLYGON_OFFSET_FILL),(L!==wt||U!==bt)&&(s.polygonOffset(wt,bt),L=wt,U=bt)):dt(s.POLYGON_OFFSET_FILL)}function rt(B){B?pt(s.SCISSOR_TEST):dt(s.SCISSOR_TEST)}function ot(B){B===void 0&&(B=s.TEXTURE0+q-1),k!==B&&(s.activeTexture(B),k=B)}function st(B,wt,bt){bt===void 0&&(k===null?bt=s.TEXTURE0+q-1:bt=k);let kt=V[bt];kt===void 0&&(kt={type:void 0,texture:void 0},V[bt]=kt),(kt.type!==B||kt.texture!==wt)&&(k!==bt&&(s.activeTexture(bt),k=bt),s.bindTexture(B,wt||ft[B]),kt.type=B,kt.texture=wt)}function xt(){const B=V[k];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function mt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function St(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ft(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function at(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Yt(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Xt(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Bt(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function _t(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Et(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Ht(B){ht.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),ht.copy(B))}function te(B){ut.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),ut.copy(B))}function oe(B,wt){let bt=d.get(wt);bt===void 0&&(bt=new WeakMap,d.set(wt,bt));let kt=bt.get(B);kt===void 0&&(kt=s.getUniformBlockIndex(wt,B.name),bt.set(B,kt))}function Wt(B,wt){const kt=d.get(wt).get(B);h.get(wt)!==kt&&(s.uniformBlockBinding(wt,kt,B.__bindingPointIndex),h.set(wt,kt))}function gt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},k=null,V={},f={},p=new WeakMap,v=[],g=null,m=!1,x=null,y=null,M=null,w=null,S=null,b=null,A=null,_=new Nt(0,0,0),E=0,N=!1,D=null,F=null,R=null,L=null,U=null,ht.set(0,0,s.canvas.width,s.canvas.height),ut.set(0,0,s.canvas.width,s.canvas.height),a.reset(),l.reset(),c.reset()}return{buffers:{color:a,depth:l,stencil:c},enable:pt,disable:dt,bindFramebuffer:Mt,drawBuffers:O,useProgram:lt,setBlending:tt,setMaterial:Tt,setFlipSided:vt,setCullFace:P,setLineWidth:C,setPolygonOffset:W,setScissorTest:rt,activeTexture:ot,bindTexture:st,unbindTexture:xt,compressedTexImage2D:mt,compressedTexImage3D:St,texImage2D:_t,texImage3D:Et,updateUBOMapping:oe,uniformBlockBinding:Wt,texStorage2D:Xt,texStorage3D:Bt,texSubImage2D:Dt,texSubImage3D:Ft,compressedTexSubImage2D:at,compressedTexSubImage3D:Yt,scissor:Ht,viewport:te,reset:gt}}function Iv(s,t,e,n,i,o,r){const a=i.isWebGL2,l=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,c=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function p(P,C){return f?new OffscreenCanvas(P,C):cr("canvas")}function v(P,C,W,rt){let ot=1;if((P.width>rt||P.height>rt)&&(ot=rt/Math.max(P.width,P.height)),ot<1||C===!0)if(typeof HTMLImageElement<"u"&&P instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&P instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&P instanceof ImageBitmap){const st=C?lr:Math.floor,xt=st(ot*P.width),mt=st(ot*P.height);d===void 0&&(d=p(xt,mt));const St=W?p(xt,mt):d;return St.width=xt,St.height=mt,St.getContext("2d").drawImage(P,0,0,xt,mt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+P.width+"x"+P.height+") to ("+xt+"x"+mt+")."),St}else return"data"in P&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+P.width+"x"+P.height+")."),P;return P}function g(P){return ka(P.width)&&ka(P.height)}function m(P){return a?!1:P.wrapS!==xn||P.wrapT!==xn||P.minFilter!==Se&&P.minFilter!==Je}function x(P,C){return P.generateMipmaps&&C&&P.minFilter!==Se&&P.minFilter!==Je}function y(P){s.generateMipmap(P)}function M(P,C,W,rt,ot=!1){if(a===!1)return C;if(P!==null){if(s[P]!==void 0)return s[P];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+P+"'")}let st=C;if(C===s.RED&&(W===s.FLOAT&&(st=s.R32F),W===s.HALF_FLOAT&&(st=s.R16F),W===s.UNSIGNED_BYTE&&(st=s.R8)),C===s.RED_INTEGER&&(W===s.UNSIGNED_BYTE&&(st=s.R8UI),W===s.UNSIGNED_SHORT&&(st=s.R16UI),W===s.UNSIGNED_INT&&(st=s.R32UI),W===s.BYTE&&(st=s.R8I),W===s.SHORT&&(st=s.R16I),W===s.INT&&(st=s.R32I)),C===s.RG&&(W===s.FLOAT&&(st=s.RG32F),W===s.HALF_FLOAT&&(st=s.RG16F),W===s.UNSIGNED_BYTE&&(st=s.RG8)),C===s.RGBA){const xt=ot?sr:se.getTransfer(rt);W===s.FLOAT&&(st=s.RGBA32F),W===s.HALF_FLOAT&&(st=s.RGBA16F),W===s.UNSIGNED_BYTE&&(st=xt===ue?s.SRGB8_ALPHA8:s.RGBA8),W===s.UNSIGNED_SHORT_4_4_4_4&&(st=s.RGBA4),W===s.UNSIGNED_SHORT_5_5_5_1&&(st=s.RGB5_A1)}return(st===s.R16F||st===s.R32F||st===s.RG16F||st===s.RG32F||st===s.RGBA16F||st===s.RGBA32F)&&t.get("EXT_color_buffer_float"),st}function w(P,C,W){return x(P,W)===!0||P.isFramebufferTexture&&P.minFilter!==Se&&P.minFilter!==Je?Math.log2(Math.max(C.width,C.height))+1:P.mipmaps!==void 0&&P.mipmaps.length>0?P.mipmaps.length:P.isCompressedTexture&&Array.isArray(P.image)?C.mipmaps.length:1}function S(P){return P===Se||P===Nl||P===Cr?s.NEAREST:s.LINEAR}function b(P){const C=P.target;C.removeEventListener("dispose",b),_(C),C.isVideoTexture&&h.delete(C)}function A(P){const C=P.target;C.removeEventListener("dispose",A),N(C)}function _(P){const C=n.get(P);if(C.__webglInit===void 0)return;const W=P.source,rt=u.get(W);if(rt){const ot=rt[C.__cacheKey];ot.usedTimes--,ot.usedTimes===0&&E(P),Object.keys(rt).length===0&&u.delete(W)}n.remove(P)}function E(P){const C=n.get(P);s.deleteTexture(C.__webglTexture);const W=P.source,rt=u.get(W);delete rt[C.__cacheKey],r.memory.textures--}function N(P){const C=P.texture,W=n.get(P),rt=n.get(C);if(rt.__webglTexture!==void 0&&(s.deleteTexture(rt.__webglTexture),r.memory.textures--),P.depthTexture&&P.depthTexture.dispose(),P.isWebGLCubeRenderTarget)for(let ot=0;ot<6;ot++){if(Array.isArray(W.__webglFramebuffer[ot]))for(let st=0;st<W.__webglFramebuffer[ot].length;st++)s.deleteFramebuffer(W.__webglFramebuffer[ot][st]);else s.deleteFramebuffer(W.__webglFramebuffer[ot]);W.__webglDepthbuffer&&s.deleteRenderbuffer(W.__webglDepthbuffer[ot])}else{if(Array.isArray(W.__webglFramebuffer))for(let ot=0;ot<W.__webglFramebuffer.length;ot++)s.deleteFramebuffer(W.__webglFramebuffer[ot]);else s.deleteFramebuffer(W.__webglFramebuffer);if(W.__webglDepthbuffer&&s.deleteRenderbuffer(W.__webglDepthbuffer),W.__webglMultisampledFramebuffer&&s.deleteFramebuffer(W.__webglMultisampledFramebuffer),W.__webglColorRenderbuffer)for(let ot=0;ot<W.__webglColorRenderbuffer.length;ot++)W.__webglColorRenderbuffer[ot]&&s.deleteRenderbuffer(W.__webglColorRenderbuffer[ot]);W.__webglDepthRenderbuffer&&s.deleteRenderbuffer(W.__webglDepthRenderbuffer)}if(P.isWebGLMultipleRenderTargets)for(let ot=0,st=C.length;ot<st;ot++){const xt=n.get(C[ot]);xt.__webglTexture&&(s.deleteTexture(xt.__webglTexture),r.memory.textures--),n.remove(C[ot])}n.remove(C),n.remove(P)}let D=0;function F(){D=0}function R(){const P=D;return P>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+P+" texture units while this GPU supports only "+i.maxTextures),D+=1,P}function L(P){const C=[];return C.push(P.wrapS),C.push(P.wrapT),C.push(P.wrapR||0),C.push(P.magFilter),C.push(P.minFilter),C.push(P.anisotropy),C.push(P.internalFormat),C.push(P.format),C.push(P.type),C.push(P.generateMipmaps),C.push(P.premultiplyAlpha),C.push(P.flipY),C.push(P.unpackAlignment),C.push(P.colorSpace),C.join()}function U(P,C){const W=n.get(P);if(P.isVideoTexture&&Tt(P),P.isRenderTargetTexture===!1&&P.version>0&&W.__version!==P.version){const rt=P.image;if(rt===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(rt.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ht(W,P,C);return}}e.bindTexture(s.TEXTURE_2D,W.__webglTexture,s.TEXTURE0+C)}function q(P,C){const W=n.get(P);if(P.version>0&&W.__version!==P.version){ht(W,P,C);return}e.bindTexture(s.TEXTURE_2D_ARRAY,W.__webglTexture,s.TEXTURE0+C)}function H(P,C){const W=n.get(P);if(P.version>0&&W.__version!==P.version){ht(W,P,C);return}e.bindTexture(s.TEXTURE_3D,W.__webglTexture,s.TEXTURE0+C)}function G(P,C){const W=n.get(P);if(P.version>0&&W.__version!==P.version){ut(W,P,C);return}e.bindTexture(s.TEXTURE_CUBE_MAP,W.__webglTexture,s.TEXTURE0+C)}const j={[ye]:s.REPEAT,[xn]:s.CLAMP_TO_EDGE,[za]:s.MIRRORED_REPEAT},k={[Se]:s.NEAREST,[Nl]:s.NEAREST_MIPMAP_NEAREST,[Cr]:s.NEAREST_MIPMAP_LINEAR,[Je]:s.LINEAR,[$d]:s.LINEAR_MIPMAP_NEAREST,[ns]:s.LINEAR_MIPMAP_LINEAR},V={[df]:s.NEVER,[xf]:s.ALWAYS,[ff]:s.LESS,[gu]:s.LEQUAL,[pf]:s.EQUAL,[vf]:s.GEQUAL,[mf]:s.GREATER,[gf]:s.NOTEQUAL};function Y(P,C,W){if(W?(s.texParameteri(P,s.TEXTURE_WRAP_S,j[C.wrapS]),s.texParameteri(P,s.TEXTURE_WRAP_T,j[C.wrapT]),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,j[C.wrapR]),s.texParameteri(P,s.TEXTURE_MAG_FILTER,k[C.magFilter]),s.texParameteri(P,s.TEXTURE_MIN_FILTER,k[C.minFilter])):(s.texParameteri(P,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(P,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(P===s.TEXTURE_3D||P===s.TEXTURE_2D_ARRAY)&&s.texParameteri(P,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(C.wrapS!==xn||C.wrapT!==xn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(P,s.TEXTURE_MAG_FILTER,S(C.magFilter)),s.texParameteri(P,s.TEXTURE_MIN_FILTER,S(C.minFilter)),C.minFilter!==Se&&C.minFilter!==Je&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),C.compareFunction&&(s.texParameteri(P,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(P,s.TEXTURE_COMPARE_FUNC,V[C.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const rt=t.get("EXT_texture_filter_anisotropic");if(C.magFilter===Se||C.minFilter!==Cr&&C.minFilter!==ns||C.type===Jn&&t.has("OES_texture_float_linear")===!1||a===!1&&C.type===sn&&t.has("OES_texture_half_float_linear")===!1)return;(C.anisotropy>1||n.get(C).__currentAnisotropy)&&(s.texParameterf(P,rt.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(C.anisotropy,i.getMaxAnisotropy())),n.get(C).__currentAnisotropy=C.anisotropy)}}function et(P,C){let W=!1;P.__webglInit===void 0&&(P.__webglInit=!0,C.addEventListener("dispose",b));const rt=C.source;let ot=u.get(rt);ot===void 0&&(ot={},u.set(rt,ot));const st=L(C);if(st!==P.__cacheKey){ot[st]===void 0&&(ot[st]={texture:s.createTexture(),usedTimes:0},r.memory.textures++,W=!0),ot[st].usedTimes++;const xt=ot[P.__cacheKey];xt!==void 0&&(ot[P.__cacheKey].usedTimes--,xt.usedTimes===0&&E(C)),P.__cacheKey=st,P.__webglTexture=ot[st].texture}return W}function ht(P,C,W){let rt=s.TEXTURE_2D;(C.isDataArrayTexture||C.isCompressedArrayTexture)&&(rt=s.TEXTURE_2D_ARRAY),C.isData3DTexture&&(rt=s.TEXTURE_3D);const ot=et(P,C),st=C.source;e.bindTexture(rt,P.__webglTexture,s.TEXTURE0+W);const xt=n.get(st);if(st.version!==xt.__version||ot===!0){e.activeTexture(s.TEXTURE0+W);const mt=se.getPrimaries(se.workingColorSpace),St=C.colorSpace===hn?null:se.getPrimaries(C.colorSpace),Dt=C.colorSpace===hn||mt===St?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);const Ft=m(C)&&g(C.image)===!1;let at=v(C.image,Ft,!1,i.maxTextureSize);at=vt(C,at);const Yt=g(at)||a,Xt=o.convert(C.format,C.colorSpace);let Bt=o.convert(C.type),_t=M(C.internalFormat,Xt,Bt,C.colorSpace,C.isVideoTexture);Y(rt,C,Yt);let Et;const Ht=C.mipmaps,te=a&&C.isVideoTexture!==!0&&_t!==pu,oe=xt.__version===void 0||ot===!0,Wt=w(C,at,Yt);if(C.isDepthTexture)_t=s.DEPTH_COMPONENT,a?C.type===Jn?_t=s.DEPTH_COMPONENT32F:C.type===Kn?_t=s.DEPTH_COMPONENT24:C.type===ti?_t=s.DEPTH24_STENCIL8:_t=s.DEPTH_COMPONENT16:C.type===Jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),C.format===gi&&_t===s.DEPTH_COMPONENT&&C.type!==$a&&C.type!==Kn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),C.type=Kn,Bt=o.convert(C.type)),C.format===yi&&_t===s.DEPTH_COMPONENT&&(_t=s.DEPTH_STENCIL,C.type!==ti&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),C.type=ti,Bt=o.convert(C.type))),oe&&(te?e.texStorage2D(s.TEXTURE_2D,1,_t,at.width,at.height):e.texImage2D(s.TEXTURE_2D,0,_t,at.width,at.height,0,Xt,Bt,null));else if(C.isDataTexture)if(Ht.length>0&&Yt){te&&oe&&e.texStorage2D(s.TEXTURE_2D,Wt,_t,Ht[0].width,Ht[0].height);for(let gt=0,B=Ht.length;gt<B;gt++)Et=Ht[gt],te?e.texSubImage2D(s.TEXTURE_2D,gt,0,0,Et.width,Et.height,Xt,Bt,Et.data):e.texImage2D(s.TEXTURE_2D,gt,_t,Et.width,Et.height,0,Xt,Bt,Et.data);C.generateMipmaps=!1}else te?(oe&&e.texStorage2D(s.TEXTURE_2D,Wt,_t,at.width,at.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,at.width,at.height,Xt,Bt,at.data)):e.texImage2D(s.TEXTURE_2D,0,_t,at.width,at.height,0,Xt,Bt,at.data);else if(C.isCompressedTexture)if(C.isCompressedArrayTexture){te&&oe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Wt,_t,Ht[0].width,Ht[0].height,at.depth);for(let gt=0,B=Ht.length;gt<B;gt++)Et=Ht[gt],C.format!==cn?Xt!==null?te?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,gt,0,0,0,Et.width,Et.height,at.depth,Xt,Et.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,gt,_t,Et.width,Et.height,at.depth,0,Et.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?e.texSubImage3D(s.TEXTURE_2D_ARRAY,gt,0,0,0,Et.width,Et.height,at.depth,Xt,Bt,Et.data):e.texImage3D(s.TEXTURE_2D_ARRAY,gt,_t,Et.width,Et.height,at.depth,0,Xt,Bt,Et.data)}else{te&&oe&&e.texStorage2D(s.TEXTURE_2D,Wt,_t,Ht[0].width,Ht[0].height);for(let gt=0,B=Ht.length;gt<B;gt++)Et=Ht[gt],C.format!==cn?Xt!==null?te?e.compressedTexSubImage2D(s.TEXTURE_2D,gt,0,0,Et.width,Et.height,Xt,Et.data):e.compressedTexImage2D(s.TEXTURE_2D,gt,_t,Et.width,Et.height,0,Et.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):te?e.texSubImage2D(s.TEXTURE_2D,gt,0,0,Et.width,Et.height,Xt,Bt,Et.data):e.texImage2D(s.TEXTURE_2D,gt,_t,Et.width,Et.height,0,Xt,Bt,Et.data)}else if(C.isDataArrayTexture)te?(oe&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Wt,_t,at.width,at.height,at.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,at.width,at.height,at.depth,Xt,Bt,at.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,_t,at.width,at.height,at.depth,0,Xt,Bt,at.data);else if(C.isData3DTexture)te?(oe&&e.texStorage3D(s.TEXTURE_3D,Wt,_t,at.width,at.height,at.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,at.width,at.height,at.depth,Xt,Bt,at.data)):e.texImage3D(s.TEXTURE_3D,0,_t,at.width,at.height,at.depth,0,Xt,Bt,at.data);else if(C.isFramebufferTexture){if(oe)if(te)e.texStorage2D(s.TEXTURE_2D,Wt,_t,at.width,at.height);else{let gt=at.width,B=at.height;for(let wt=0;wt<Wt;wt++)e.texImage2D(s.TEXTURE_2D,wt,_t,gt,B,0,Xt,Bt,null),gt>>=1,B>>=1}}else if(Ht.length>0&&Yt){te&&oe&&e.texStorage2D(s.TEXTURE_2D,Wt,_t,Ht[0].width,Ht[0].height);for(let gt=0,B=Ht.length;gt<B;gt++)Et=Ht[gt],te?e.texSubImage2D(s.TEXTURE_2D,gt,0,0,Xt,Bt,Et):e.texImage2D(s.TEXTURE_2D,gt,_t,Xt,Bt,Et);C.generateMipmaps=!1}else te?(oe&&e.texStorage2D(s.TEXTURE_2D,Wt,_t,at.width,at.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,Xt,Bt,at)):e.texImage2D(s.TEXTURE_2D,0,_t,Xt,Bt,at);x(C,Yt)&&y(rt),xt.__version=st.version,C.onUpdate&&C.onUpdate(C)}P.__version=C.version}function ut(P,C,W){if(C.image.length!==6)return;const rt=et(P,C),ot=C.source;e.bindTexture(s.TEXTURE_CUBE_MAP,P.__webglTexture,s.TEXTURE0+W);const st=n.get(ot);if(ot.version!==st.__version||rt===!0){e.activeTexture(s.TEXTURE0+W);const xt=se.getPrimaries(se.workingColorSpace),mt=C.colorSpace===hn?null:se.getPrimaries(C.colorSpace),St=C.colorSpace===hn||xt===mt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,C.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,C.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,C.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,St);const Dt=C.isCompressedTexture||C.image[0].isCompressedTexture,Ft=C.image[0]&&C.image[0].isDataTexture,at=[];for(let gt=0;gt<6;gt++)!Dt&&!Ft?at[gt]=v(C.image[gt],!1,!0,i.maxCubemapSize):at[gt]=Ft?C.image[gt].image:C.image[gt],at[gt]=vt(C,at[gt]);const Yt=at[0],Xt=g(Yt)||a,Bt=o.convert(C.format,C.colorSpace),_t=o.convert(C.type),Et=M(C.internalFormat,Bt,_t,C.colorSpace),Ht=a&&C.isVideoTexture!==!0,te=st.__version===void 0||rt===!0;let oe=w(C,Yt,Xt);Y(s.TEXTURE_CUBE_MAP,C,Xt);let Wt;if(Dt){Ht&&te&&e.texStorage2D(s.TEXTURE_CUBE_MAP,oe,Et,Yt.width,Yt.height);for(let gt=0;gt<6;gt++){Wt=at[gt].mipmaps;for(let B=0;B<Wt.length;B++){const wt=Wt[B];C.format!==cn?Bt!==null?Ht?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B,0,0,wt.width,wt.height,Bt,wt.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B,Et,wt.width,wt.height,0,wt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B,0,0,wt.width,wt.height,Bt,_t,wt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B,Et,wt.width,wt.height,0,Bt,_t,wt.data)}}}else{Wt=C.mipmaps,Ht&&te&&(Wt.length>0&&oe++,e.texStorage2D(s.TEXTURE_CUBE_MAP,oe,Et,at[0].width,at[0].height));for(let gt=0;gt<6;gt++)if(Ft){Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,at[gt].width,at[gt].height,Bt,_t,at[gt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Et,at[gt].width,at[gt].height,0,Bt,_t,at[gt].data);for(let B=0;B<Wt.length;B++){const bt=Wt[B].image[gt].image;Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B+1,0,0,bt.width,bt.height,Bt,_t,bt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B+1,Et,bt.width,bt.height,0,Bt,_t,bt.data)}}else{Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,0,0,Bt,_t,at[gt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0,Et,Bt,_t,at[gt]);for(let B=0;B<Wt.length;B++){const wt=Wt[B];Ht?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B+1,0,0,Bt,_t,wt.image[gt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,B+1,Et,Bt,_t,wt.image[gt])}}}x(C,Xt)&&y(s.TEXTURE_CUBE_MAP),st.__version=ot.version,C.onUpdate&&C.onUpdate(C)}P.__version=C.version}function it(P,C,W,rt,ot,st){const xt=o.convert(W.format,W.colorSpace),mt=o.convert(W.type),St=M(W.internalFormat,xt,mt,W.colorSpace);if(!n.get(C).__hasExternalTextures){const Ft=Math.max(1,C.width>>st),at=Math.max(1,C.height>>st);ot===s.TEXTURE_3D||ot===s.TEXTURE_2D_ARRAY?e.texImage3D(ot,st,St,Ft,at,C.depth,0,xt,mt,null):e.texImage2D(ot,st,St,Ft,at,0,xt,mt,null)}e.bindFramebuffer(s.FRAMEBUFFER,P),tt(C)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,rt,ot,n.get(W).__webglTexture,0,ct(C)):(ot===s.TEXTURE_2D||ot>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&ot<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,rt,ot,n.get(W).__webglTexture,st),e.bindFramebuffer(s.FRAMEBUFFER,null)}function ft(P,C,W){if(s.bindRenderbuffer(s.RENDERBUFFER,P),C.depthBuffer&&!C.stencilBuffer){let rt=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(W||tt(C)){const ot=C.depthTexture;ot&&ot.isDepthTexture&&(ot.type===Jn?rt=s.DEPTH_COMPONENT32F:ot.type===Kn&&(rt=s.DEPTH_COMPONENT24));const st=ct(C);tt(C)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,st,rt,C.width,C.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,st,rt,C.width,C.height)}else s.renderbufferStorage(s.RENDERBUFFER,rt,C.width,C.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,P)}else if(C.depthBuffer&&C.stencilBuffer){const rt=ct(C);W&&tt(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,s.DEPTH24_STENCIL8,C.width,C.height):tt(C)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,rt,s.DEPTH24_STENCIL8,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,C.width,C.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,P)}else{const rt=C.isWebGLMultipleRenderTargets===!0?C.texture:[C.texture];for(let ot=0;ot<rt.length;ot++){const st=rt[ot],xt=o.convert(st.format,st.colorSpace),mt=o.convert(st.type),St=M(st.internalFormat,xt,mt,st.colorSpace),Dt=ct(C);W&&tt(C)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,St,C.width,C.height):tt(C)?l.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Dt,St,C.width,C.height):s.renderbufferStorage(s.RENDERBUFFER,St,C.width,C.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function pt(P,C){if(C&&C.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,P),!(C.depthTexture&&C.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(C.depthTexture).__webglTexture||C.depthTexture.image.width!==C.width||C.depthTexture.image.height!==C.height)&&(C.depthTexture.image.width=C.width,C.depthTexture.image.height=C.height,C.depthTexture.needsUpdate=!0),U(C.depthTexture,0);const rt=n.get(C.depthTexture).__webglTexture,ot=ct(C);if(C.depthTexture.format===gi)tt(C)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,rt,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,rt,0);else if(C.depthTexture.format===yi)tt(C)?l.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,rt,0,ot):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,rt,0);else throw new Error("Unknown depthTexture format")}function dt(P){const C=n.get(P),W=P.isWebGLCubeRenderTarget===!0;if(P.depthTexture&&!C.__autoAllocateDepthBuffer){if(W)throw new Error("target.depthTexture not supported in Cube render targets");pt(C.__webglFramebuffer,P)}else if(W){C.__webglDepthbuffer=[];for(let rt=0;rt<6;rt++)e.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer[rt]),C.__webglDepthbuffer[rt]=s.createRenderbuffer(),ft(C.__webglDepthbuffer[rt],P,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,C.__webglFramebuffer),C.__webglDepthbuffer=s.createRenderbuffer(),ft(C.__webglDepthbuffer,P,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function Mt(P,C,W){const rt=n.get(P);C!==void 0&&it(rt.__webglFramebuffer,P,P.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),W!==void 0&&dt(P)}function O(P){const C=P.texture,W=n.get(P),rt=n.get(C);P.addEventListener("dispose",A),P.isWebGLMultipleRenderTargets!==!0&&(rt.__webglTexture===void 0&&(rt.__webglTexture=s.createTexture()),rt.__version=C.version,r.memory.textures++);const ot=P.isWebGLCubeRenderTarget===!0,st=P.isWebGLMultipleRenderTargets===!0,xt=g(P)||a;if(ot){W.__webglFramebuffer=[];for(let mt=0;mt<6;mt++)if(a&&C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer[mt]=[];for(let St=0;St<C.mipmaps.length;St++)W.__webglFramebuffer[mt][St]=s.createFramebuffer()}else W.__webglFramebuffer[mt]=s.createFramebuffer()}else{if(a&&C.mipmaps&&C.mipmaps.length>0){W.__webglFramebuffer=[];for(let mt=0;mt<C.mipmaps.length;mt++)W.__webglFramebuffer[mt]=s.createFramebuffer()}else W.__webglFramebuffer=s.createFramebuffer();if(st)if(i.drawBuffers){const mt=P.texture;for(let St=0,Dt=mt.length;St<Dt;St++){const Ft=n.get(mt[St]);Ft.__webglTexture===void 0&&(Ft.__webglTexture=s.createTexture(),r.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&P.samples>0&&tt(P)===!1){const mt=st?C:[C];W.__webglMultisampledFramebuffer=s.createFramebuffer(),W.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,W.__webglMultisampledFramebuffer);for(let St=0;St<mt.length;St++){const Dt=mt[St];W.__webglColorRenderbuffer[St]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,W.__webglColorRenderbuffer[St]);const Ft=o.convert(Dt.format,Dt.colorSpace),at=o.convert(Dt.type),Yt=M(Dt.internalFormat,Ft,at,Dt.colorSpace,P.isXRRenderTarget===!0),Xt=ct(P);s.renderbufferStorageMultisample(s.RENDERBUFFER,Xt,Yt,P.width,P.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+St,s.RENDERBUFFER,W.__webglColorRenderbuffer[St])}s.bindRenderbuffer(s.RENDERBUFFER,null),P.depthBuffer&&(W.__webglDepthRenderbuffer=s.createRenderbuffer(),ft(W.__webglDepthRenderbuffer,P,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(ot){e.bindTexture(s.TEXTURE_CUBE_MAP,rt.__webglTexture),Y(s.TEXTURE_CUBE_MAP,C,xt);for(let mt=0;mt<6;mt++)if(a&&C.mipmaps&&C.mipmaps.length>0)for(let St=0;St<C.mipmaps.length;St++)it(W.__webglFramebuffer[mt][St],P,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,St);else it(W.__webglFramebuffer[mt],P,C,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+mt,0);x(C,xt)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(st){const mt=P.texture;for(let St=0,Dt=mt.length;St<Dt;St++){const Ft=mt[St],at=n.get(Ft);e.bindTexture(s.TEXTURE_2D,at.__webglTexture),Y(s.TEXTURE_2D,Ft,xt),it(W.__webglFramebuffer,P,Ft,s.COLOR_ATTACHMENT0+St,s.TEXTURE_2D,0),x(Ft,xt)&&y(s.TEXTURE_2D)}e.unbindTexture()}else{let mt=s.TEXTURE_2D;if((P.isWebGL3DRenderTarget||P.isWebGLArrayRenderTarget)&&(a?mt=P.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(mt,rt.__webglTexture),Y(mt,C,xt),a&&C.mipmaps&&C.mipmaps.length>0)for(let St=0;St<C.mipmaps.length;St++)it(W.__webglFramebuffer[St],P,C,s.COLOR_ATTACHMENT0,mt,St);else it(W.__webglFramebuffer,P,C,s.COLOR_ATTACHMENT0,mt,0);x(C,xt)&&y(mt),e.unbindTexture()}P.depthBuffer&&dt(P)}function lt(P){const C=g(P)||a,W=P.isWebGLMultipleRenderTargets===!0?P.texture:[P.texture];for(let rt=0,ot=W.length;rt<ot;rt++){const st=W[rt];if(x(st,C)){const xt=P.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,mt=n.get(st).__webglTexture;e.bindTexture(xt,mt),y(xt),e.unbindTexture()}}}function Z(P){if(a&&P.samples>0&&tt(P)===!1){const C=P.isWebGLMultipleRenderTargets?P.texture:[P.texture],W=P.width,rt=P.height;let ot=s.COLOR_BUFFER_BIT;const st=[],xt=P.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,mt=n.get(P),St=P.isWebGLMultipleRenderTargets===!0;if(St)for(let Dt=0;Dt<C.length;Dt++)e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,mt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,mt.__webglFramebuffer);for(let Dt=0;Dt<C.length;Dt++){st.push(s.COLOR_ATTACHMENT0+Dt),P.depthBuffer&&st.push(xt);const Ft=mt.__ignoreDepthValues!==void 0?mt.__ignoreDepthValues:!1;if(Ft===!1&&(P.depthBuffer&&(ot|=s.DEPTH_BUFFER_BIT),P.stencilBuffer&&(ot|=s.STENCIL_BUFFER_BIT)),St&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,mt.__webglColorRenderbuffer[Dt]),Ft===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[xt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[xt])),St){const at=n.get(C[Dt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,at,0)}s.blitFramebuffer(0,0,W,rt,0,0,W,rt,ot,s.NEAREST),c&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,st)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),St)for(let Dt=0;Dt<C.length;Dt++){e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,mt.__webglColorRenderbuffer[Dt]);const Ft=n.get(C[Dt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,mt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,Ft,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,mt.__webglMultisampledFramebuffer)}}function ct(P){return Math.min(i.maxSamples,P.samples)}function tt(P){const C=n.get(P);return a&&P.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&C.__useRenderToTexture!==!1}function Tt(P){const C=r.render.frame;h.get(P)!==C&&(h.set(P,C),P.update())}function vt(P,C){const W=P.colorSpace,rt=P.format,ot=P.type;return P.isCompressedTexture===!0||P.isVideoTexture===!0||P.format===Ba||W!==kn&&W!==hn&&(se.getTransfer(W)===ue?a===!1?t.has("EXT_sRGB")===!0&&rt===cn?(P.format=Ba,P.minFilter=Je,P.generateMipmaps=!1):C=xu.sRGBToLinear(C):(rt!==cn||ot!==Bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",W)),C}this.allocateTextureUnit=R,this.resetTextureUnits=F,this.setTexture2D=U,this.setTexture2DArray=q,this.setTexture3D=H,this.setTextureCube=G,this.rebindTextures=Mt,this.setupRenderTarget=O,this.updateRenderTargetMipmap=lt,this.updateMultisampleRenderTarget=Z,this.setupDepthRenderbuffer=dt,this.setupFrameBufferTexture=it,this.useMultisampledRTT=tt}function Dv(s,t,e){const n=e.isWebGL2;function i(o,r=hn){let a;const l=se.getTransfer(r);if(o===Bn)return s.UNSIGNED_BYTE;if(o===cu)return s.UNSIGNED_SHORT_4_4_4_4;if(o===hu)return s.UNSIGNED_SHORT_5_5_5_1;if(o===tf)return s.BYTE;if(o===ef)return s.SHORT;if(o===$a)return s.UNSIGNED_SHORT;if(o===lu)return s.INT;if(o===Kn)return s.UNSIGNED_INT;if(o===Jn)return s.FLOAT;if(o===sn)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(o===nf)return s.ALPHA;if(o===cn)return s.RGBA;if(o===sf)return s.LUMINANCE;if(o===of)return s.LUMINANCE_ALPHA;if(o===gi)return s.DEPTH_COMPONENT;if(o===yi)return s.DEPTH_STENCIL;if(o===Ba)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(o===rf)return s.RED;if(o===uu)return s.RED_INTEGER;if(o===af)return s.RG;if(o===du)return s.RG_INTEGER;if(o===fu)return s.RGBA_INTEGER;if(o===Rr||o===Pr||o===Lr||o===Ir)if(l===ue)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(o===Rr)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(o===Pr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(o===Lr)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(o===Ir)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(o===Rr)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(o===Pr)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(o===Lr)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(o===Ir)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(o===Ul||o===Fl||o===Ol||o===zl)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(o===Ul)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(o===Fl)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(o===Ol)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(o===zl)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(o===pu)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(o===Bl||o===kl)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(o===Bl)return l===ue?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(o===kl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(o===Gl||o===Hl||o===Wl||o===Vl||o===Xl||o===ql||o===Yl||o===jl||o===Zl||o===Kl||o===Jl||o===Ql||o===$l||o===tc)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(o===Gl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(o===Hl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(o===Wl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(o===Vl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(o===Xl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(o===ql)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(o===Yl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(o===jl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(o===Zl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(o===Kl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(o===Jl)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(o===Ql)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(o===$l)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(o===tc)return l===ue?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(o===Dr||o===ec||o===nc)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(o===Dr)return l===ue?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(o===ec)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(o===nc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(o===lf||o===ic||o===sc||o===oc)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(o===Dr)return a.COMPRESSED_RED_RGTC1_EXT;if(o===ic)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(o===sc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(o===oc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return o===ti?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[o]!==void 0?s[o]:null}return{convert:i}}class Nv extends nn{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class re extends Be{constructor(){super(),this.isGroup=!0,this.type="Group"}}const Uv={type:"move"};class na{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new re,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new re,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new z,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new z),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new re,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new z,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new z),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,o=null,r=null;const a=this._targetRay,l=this._grip,c=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(c&&t.hand){r=!0;for(const v of t.hand.values()){const g=e.getJointPose(v,n),m=this._getHandJoint(c,v);g!==null&&(m.matrix.fromArray(g.transform.matrix),m.matrix.decompose(m.position,m.rotation,m.scale),m.matrixWorldNeedsUpdate=!0,m.jointRadius=g.radius),m.visible=g!==null}const h=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,p=.005;c.inputState.pinching&&u>f+p?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!c.inputState.pinching&&u<=f-p&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else l!==null&&t.gripSpace&&(o=e.getPose(t.gripSpace,n),o!==null&&(l.matrix.fromArray(o.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,o.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(o.linearVelocity)):l.hasLinearVelocity=!1,o.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(o.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&o!==null&&(i=o),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(Uv)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=o!==null),c!==null&&(c.visible=r!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new re;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Fv extends os{constructor(t,e){super();const n=this;let i=null,o=1,r=null,a="local-floor",l=1,c=null,h=null,d=null,u=null,f=null,p=null;const v=e.getContextAttributes();let g=null,m=null;const x=[],y=[],M=new nt;let w=null;const S=new nn;S.layers.enable(1),S.viewport=new Fe;const b=new nn;b.layers.enable(2),b.viewport=new Fe;const A=[S,b],_=new Nv;_.layers.enable(1),_.layers.enable(2);let E=null,N=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let et=x[Y];return et===void 0&&(et=new na,x[Y]=et),et.getTargetRaySpace()},this.getControllerGrip=function(Y){let et=x[Y];return et===void 0&&(et=new na,x[Y]=et),et.getGripSpace()},this.getHand=function(Y){let et=x[Y];return et===void 0&&(et=new na,x[Y]=et),et.getHandSpace()};function D(Y){const et=y.indexOf(Y.inputSource);if(et===-1)return;const ht=x[et];ht!==void 0&&(ht.update(Y.inputSource,Y.frame,c||r),ht.dispatchEvent({type:Y.type,data:Y.inputSource}))}function F(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",F),i.removeEventListener("inputsourceschange",R);for(let Y=0;Y<x.length;Y++){const et=y[Y];et!==null&&(y[Y]=null,x[Y].disconnect(et))}E=null,N=null,t.setRenderTarget(g),f=null,u=null,d=null,i=null,m=null,V.stop(),n.isPresenting=!1,t.setPixelRatio(w),t.setSize(M.width,M.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){o=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||r},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return p},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(g=t.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",F),i.addEventListener("inputsourceschange",R),v.xrCompatible!==!0&&await e.makeXRCompatible(),w=t.getPixelRatio(),t.getSize(M),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const et={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:o};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),m=new Ze(f.framebufferWidth,f.framebufferHeight,{format:cn,type:Bn,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let et=null,ht=null,ut=null;v.depth&&(ut=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=v.stencil?yi:gi,ht=v.stencil?ti:Kn);const it={colorFormat:e.RGBA8,depthFormat:ut,scaleFactor:o};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(it),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),m=new Ze(u.textureWidth,u.textureHeight,{format:cn,type:Bn,depthTexture:new rl(u.textureWidth,u.textureHeight,ht,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});const ft=t.properties.get(m);ft.__ignoreDepthValues=u.ignoreDepthValues}m.isXRRenderTarget=!0,this.setFoveation(l),c=null,r=await i.requestReferenceSpace(a),V.setContext(i),V.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function R(Y){for(let et=0;et<Y.removed.length;et++){const ht=Y.removed[et],ut=y.indexOf(ht);ut>=0&&(y[ut]=null,x[ut].disconnect(ht))}for(let et=0;et<Y.added.length;et++){const ht=Y.added[et];let ut=y.indexOf(ht);if(ut===-1){for(let ft=0;ft<x.length;ft++)if(ft>=y.length){y.push(ht),ut=ft;break}else if(y[ft]===null){y[ft]=ht,ut=ft;break}if(ut===-1)break}const it=x[ut];it&&it.connect(ht)}}const L=new z,U=new z;function q(Y,et,ht){L.setFromMatrixPosition(et.matrixWorld),U.setFromMatrixPosition(ht.matrixWorld);const ut=L.distanceTo(U),it=et.projectionMatrix.elements,ft=ht.projectionMatrix.elements,pt=it[14]/(it[10]-1),dt=it[14]/(it[10]+1),Mt=(it[9]+1)/it[5],O=(it[9]-1)/it[5],lt=(it[8]-1)/it[0],Z=(ft[8]+1)/ft[0],ct=pt*lt,tt=pt*Z,Tt=ut/(-lt+Z),vt=Tt*-lt;et.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(vt),Y.translateZ(Tt),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert();const P=pt+Tt,C=dt+Tt,W=ct-vt,rt=tt+(ut-vt),ot=Mt*dt/C*P,st=O*dt/C*P;Y.projectionMatrix.makePerspective(W,rt,ot,st,P,C),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}function H(Y,et){et===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(et.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;_.near=b.near=S.near=Y.near,_.far=b.far=S.far=Y.far,(E!==_.near||N!==_.far)&&(i.updateRenderState({depthNear:_.near,depthFar:_.far}),E=_.near,N=_.far);const et=Y.parent,ht=_.cameras;H(_,et);for(let ut=0;ut<ht.length;ut++)H(ht[ut],et);ht.length===2?q(_,S,b):_.projectionMatrix.copy(S.projectionMatrix),G(Y,_,et)};function G(Y,et,ht){ht===null?Y.matrix.copy(et.matrixWorld):(Y.matrix.copy(ht.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(et.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(et.projectionMatrix),Y.projectionMatrixInverse.copy(et.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Os*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return _},this.getFoveation=function(){if(!(u===null&&f===null))return l},this.setFoveation=function(Y){l=Y,u!==null&&(u.fixedFoveation=Y),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=Y)};let j=null;function k(Y,et){if(h=et.getViewerPose(c||r),p=et,h!==null){const ht=h.views;f!==null&&(t.setRenderTargetFramebuffer(m,f.framebuffer),t.setRenderTarget(m));let ut=!1;ht.length!==_.cameras.length&&(_.cameras.length=0,ut=!0);for(let it=0;it<ht.length;it++){const ft=ht[it];let pt=null;if(f!==null)pt=f.getViewport(ft);else{const Mt=d.getViewSubImage(u,ft);pt=Mt.viewport,it===0&&(t.setRenderTargetTextures(m,Mt.colorTexture,u.ignoreDepthValues?void 0:Mt.depthStencilTexture),t.setRenderTarget(m))}let dt=A[it];dt===void 0&&(dt=new nn,dt.layers.enable(it),dt.viewport=new Fe,A[it]=dt),dt.matrix.fromArray(ft.transform.matrix),dt.matrix.decompose(dt.position,dt.quaternion,dt.scale),dt.projectionMatrix.fromArray(ft.projectionMatrix),dt.projectionMatrixInverse.copy(dt.projectionMatrix).invert(),dt.viewport.set(pt.x,pt.y,pt.width,pt.height),it===0&&(_.matrix.copy(dt.matrix),_.matrix.decompose(_.position,_.quaternion,_.scale)),ut===!0&&_.cameras.push(dt)}}for(let ht=0;ht<x.length;ht++){const ut=y[ht],it=x[ht];ut!==null&&it!==void 0&&it.update(ut,et,c||r)}j&&j(Y,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),p=null}const V=new Cu;V.setAnimationLoop(k),this.setAnimationLoop=function(Y){j=Y},this.dispose=function(){}}}function Ov(s,t){function e(g,m){g.matrixAutoUpdate===!0&&g.updateMatrix(),m.value.copy(g.matrix)}function n(g,m){m.color.getRGB(g.fogColor.value,Eu(s)),m.isFog?(g.fogNear.value=m.near,g.fogFar.value=m.far):m.isFogExp2&&(g.fogDensity.value=m.density)}function i(g,m,x,y,M){m.isMeshBasicMaterial||m.isMeshLambertMaterial?o(g,m):m.isMeshToonMaterial?(o(g,m),d(g,m)):m.isMeshPhongMaterial?(o(g,m),h(g,m)):m.isMeshStandardMaterial?(o(g,m),u(g,m),m.isMeshPhysicalMaterial&&f(g,m,M)):m.isMeshMatcapMaterial?(o(g,m),p(g,m)):m.isMeshDepthMaterial?o(g,m):m.isMeshDistanceMaterial?(o(g,m),v(g,m)):m.isMeshNormalMaterial?o(g,m):m.isLineBasicMaterial?(r(g,m),m.isLineDashedMaterial&&a(g,m)):m.isPointsMaterial?l(g,m,x,y):m.isSpriteMaterial?c(g,m):m.isShadowMaterial?(g.color.value.copy(m.color),g.opacity.value=m.opacity):m.isShaderMaterial&&(m.uniformsNeedUpdate=!1)}function o(g,m){g.opacity.value=m.opacity,m.color&&g.diffuse.value.copy(m.color),m.emissive&&g.emissive.value.copy(m.emissive).multiplyScalar(m.emissiveIntensity),m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.bumpMap&&(g.bumpMap.value=m.bumpMap,e(m.bumpMap,g.bumpMapTransform),g.bumpScale.value=m.bumpScale,m.side===je&&(g.bumpScale.value*=-1)),m.normalMap&&(g.normalMap.value=m.normalMap,e(m.normalMap,g.normalMapTransform),g.normalScale.value.copy(m.normalScale),m.side===je&&g.normalScale.value.negate()),m.displacementMap&&(g.displacementMap.value=m.displacementMap,e(m.displacementMap,g.displacementMapTransform),g.displacementScale.value=m.displacementScale,g.displacementBias.value=m.displacementBias),m.emissiveMap&&(g.emissiveMap.value=m.emissiveMap,e(m.emissiveMap,g.emissiveMapTransform)),m.specularMap&&(g.specularMap.value=m.specularMap,e(m.specularMap,g.specularMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest);const x=t.get(m).envMap;if(x&&(g.envMap.value=x,g.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=m.reflectivity,g.ior.value=m.ior,g.refractionRatio.value=m.refractionRatio),m.lightMap){g.lightMap.value=m.lightMap;const y=s._useLegacyLights===!0?Math.PI:1;g.lightMapIntensity.value=m.lightMapIntensity*y,e(m.lightMap,g.lightMapTransform)}m.aoMap&&(g.aoMap.value=m.aoMap,g.aoMapIntensity.value=m.aoMapIntensity,e(m.aoMap,g.aoMapTransform))}function r(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform))}function a(g,m){g.dashSize.value=m.dashSize,g.totalSize.value=m.dashSize+m.gapSize,g.scale.value=m.scale}function l(g,m,x,y){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.size.value=m.size*x,g.scale.value=y*.5,m.map&&(g.map.value=m.map,e(m.map,g.uvTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function c(g,m){g.diffuse.value.copy(m.color),g.opacity.value=m.opacity,g.rotation.value=m.rotation,m.map&&(g.map.value=m.map,e(m.map,g.mapTransform)),m.alphaMap&&(g.alphaMap.value=m.alphaMap,e(m.alphaMap,g.alphaMapTransform)),m.alphaTest>0&&(g.alphaTest.value=m.alphaTest)}function h(g,m){g.specular.value.copy(m.specular),g.shininess.value=Math.max(m.shininess,1e-4)}function d(g,m){m.gradientMap&&(g.gradientMap.value=m.gradientMap)}function u(g,m){g.metalness.value=m.metalness,m.metalnessMap&&(g.metalnessMap.value=m.metalnessMap,e(m.metalnessMap,g.metalnessMapTransform)),g.roughness.value=m.roughness,m.roughnessMap&&(g.roughnessMap.value=m.roughnessMap,e(m.roughnessMap,g.roughnessMapTransform)),t.get(m).envMap&&(g.envMapIntensity.value=m.envMapIntensity)}function f(g,m,x){g.ior.value=m.ior,m.sheen>0&&(g.sheenColor.value.copy(m.sheenColor).multiplyScalar(m.sheen),g.sheenRoughness.value=m.sheenRoughness,m.sheenColorMap&&(g.sheenColorMap.value=m.sheenColorMap,e(m.sheenColorMap,g.sheenColorMapTransform)),m.sheenRoughnessMap&&(g.sheenRoughnessMap.value=m.sheenRoughnessMap,e(m.sheenRoughnessMap,g.sheenRoughnessMapTransform))),m.clearcoat>0&&(g.clearcoat.value=m.clearcoat,g.clearcoatRoughness.value=m.clearcoatRoughness,m.clearcoatMap&&(g.clearcoatMap.value=m.clearcoatMap,e(m.clearcoatMap,g.clearcoatMapTransform)),m.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=m.clearcoatRoughnessMap,e(m.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),m.clearcoatNormalMap&&(g.clearcoatNormalMap.value=m.clearcoatNormalMap,e(m.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(m.clearcoatNormalScale),m.side===je&&g.clearcoatNormalScale.value.negate())),m.iridescence>0&&(g.iridescence.value=m.iridescence,g.iridescenceIOR.value=m.iridescenceIOR,g.iridescenceThicknessMinimum.value=m.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=m.iridescenceThicknessRange[1],m.iridescenceMap&&(g.iridescenceMap.value=m.iridescenceMap,e(m.iridescenceMap,g.iridescenceMapTransform)),m.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=m.iridescenceThicknessMap,e(m.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),m.transmission>0&&(g.transmission.value=m.transmission,g.transmissionSamplerMap.value=x.texture,g.transmissionSamplerSize.value.set(x.width,x.height),m.transmissionMap&&(g.transmissionMap.value=m.transmissionMap,e(m.transmissionMap,g.transmissionMapTransform)),g.thickness.value=m.thickness,m.thicknessMap&&(g.thicknessMap.value=m.thicknessMap,e(m.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=m.attenuationDistance,g.attenuationColor.value.copy(m.attenuationColor)),m.anisotropy>0&&(g.anisotropyVector.value.set(m.anisotropy*Math.cos(m.anisotropyRotation),m.anisotropy*Math.sin(m.anisotropyRotation)),m.anisotropyMap&&(g.anisotropyMap.value=m.anisotropyMap,e(m.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=m.specularIntensity,g.specularColor.value.copy(m.specularColor),m.specularColorMap&&(g.specularColorMap.value=m.specularColorMap,e(m.specularColorMap,g.specularColorMapTransform)),m.specularIntensityMap&&(g.specularIntensityMap.value=m.specularIntensityMap,e(m.specularIntensityMap,g.specularIntensityMapTransform))}function p(g,m){m.matcap&&(g.matcap.value=m.matcap)}function v(g,m){const x=t.get(m).light;g.referencePosition.value.setFromMatrixPosition(x.matrixWorld),g.nearDistance.value=x.shadow.camera.near,g.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function zv(s,t,e,n){let i={},o={},r=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function l(x,y){const M=y.program;n.uniformBlockBinding(x,M)}function c(x,y){let M=i[x.id];M===void 0&&(p(x),M=h(x),i[x.id]=M,x.addEventListener("dispose",g));const w=y.program;n.updateUBOMapping(x,w);const S=t.render.frame;o[x.id]!==S&&(u(x),o[x.id]=S)}function h(x){const y=d();x.__bindingPointIndex=y;const M=s.createBuffer(),w=x.__size,S=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,M),s.bufferData(s.UNIFORM_BUFFER,w,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,M),M}function d(){for(let x=0;x<a;x++)if(r.indexOf(x)===-1)return r.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const y=i[x.id],M=x.uniforms,w=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let S=0,b=M.length;S<b;S++){const A=Array.isArray(M[S])?M[S]:[M[S]];for(let _=0,E=A.length;_<E;_++){const N=A[_];if(f(N,S,_,w)===!0){const D=N.__offset,F=Array.isArray(N.value)?N.value:[N.value];let R=0;for(let L=0;L<F.length;L++){const U=F[L],q=v(U);typeof U=="number"||typeof U=="boolean"?(N.__data[0]=U,s.bufferSubData(s.UNIFORM_BUFFER,D+R,N.__data)):U.isMatrix3?(N.__data[0]=U.elements[0],N.__data[1]=U.elements[1],N.__data[2]=U.elements[2],N.__data[3]=0,N.__data[4]=U.elements[3],N.__data[5]=U.elements[4],N.__data[6]=U.elements[5],N.__data[7]=0,N.__data[8]=U.elements[6],N.__data[9]=U.elements[7],N.__data[10]=U.elements[8],N.__data[11]=0):(U.toArray(N.__data,R),R+=q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,N.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,M,w){const S=x.value,b=y+"_"+M;if(w[b]===void 0)return typeof S=="number"||typeof S=="boolean"?w[b]=S:w[b]=S.clone(),!0;{const A=w[b];if(typeof S=="number"||typeof S=="boolean"){if(A!==S)return w[b]=S,!0}else if(A.equals(S)===!1)return A.copy(S),!0}return!1}function p(x){const y=x.uniforms;let M=0;const w=16;for(let b=0,A=y.length;b<A;b++){const _=Array.isArray(y[b])?y[b]:[y[b]];for(let E=0,N=_.length;E<N;E++){const D=_[E],F=Array.isArray(D.value)?D.value:[D.value];for(let R=0,L=F.length;R<L;R++){const U=F[R],q=v(U),H=M%w;H!==0&&w-H<q.boundary&&(M+=w-H),D.__data=new Float32Array(q.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=M,M+=q.storage}}}const S=M%w;return S>0&&(M+=w-S),x.__size=M,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function g(x){const y=x.target;y.removeEventListener("dispose",g);const M=r.indexOf(y.__bindingPointIndex);r.splice(M,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete o[y.id]}function m(){for(const x in i)s.deleteBuffer(i[x]);r=[],i={},o={}}return{bind:l,update:c,dispose:m}}class Nu{constructor(t={}){const{canvas:e=Nf(),context:n=null,depth:i=!0,stencil:o=!0,alpha:r=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=r;const f=new Uint32Array(4),p=new Int32Array(4);let v=null,g=null;const m=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=Qt,this._useLegacyLights=!1,this.toneMapping=$n,this.toneMappingExposure=1;const y=this;let M=!1,w=0,S=0,b=null,A=-1,_=null;const E=new Fe,N=new Fe;let D=null;const F=new Nt(0);let R=0,L=e.width,U=e.height,q=1,H=null,G=null;const j=new Fe(0,0,L,U),k=new Fe(0,0,L,U);let V=!1;const Y=new il;let et=!1,ht=!1,ut=null;const it=new $t,ft=new nt,pt=new z,dt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function Mt(){return b===null?q:1}let O=n;function lt(I,X){for(let J=0;J<I.length;J++){const $=I[J],K=e.getContext($,X);if(K!==null)return K}return null}try{const I={alpha:!0,depth:i,stencil:o,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${Ja}`),e.addEventListener("webglcontextlost",gt,!1),e.addEventListener("webglcontextrestored",B,!1),e.addEventListener("webglcontextcreationerror",wt,!1),O===null){const X=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&X.shift(),O=lt(X,I),O===null)throw lt(X)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&O instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),O.getShaderPrecisionFormat===void 0&&(O.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(I){throw console.error("THREE.WebGLRenderer: "+I.message),I}let Z,ct,tt,Tt,vt,P,C,W,rt,ot,st,xt,mt,St,Dt,Ft,at,Yt,Xt,Bt,_t,Et,Ht,te;function oe(){Z=new j0(O),ct=new H0(O,Z,t),Z.init(ct),Et=new Dv(O,Z,ct),tt=new Lv(O,Z,ct),Tt=new J0(O),vt=new vv,P=new Iv(O,Z,tt,vt,ct,Et,Tt),C=new V0(y),W=new Y0(y),rt=new op(O,ct),Ht=new k0(O,Z,rt,ct),ot=new Z0(O,rt,Tt,Ht),st=new eg(O,ot,rt,Tt),Xt=new tg(O,ct,P),Ft=new W0(vt),xt=new gv(y,C,W,Z,ct,Ht,Ft),mt=new Ov(y,vt),St=new yv,Dt=new Ev(Z,ct),Yt=new B0(y,C,W,tt,st,u,l),at=new Pv(y,st,ct),te=new zv(O,Tt,ct,tt),Bt=new G0(O,Z,Tt,ct),_t=new K0(O,Z,Tt,ct),Tt.programs=xt.programs,y.capabilities=ct,y.extensions=Z,y.properties=vt,y.renderLists=St,y.shadowMap=at,y.state=tt,y.info=Tt}oe();const Wt=new Fv(y,O);this.xr=Wt,this.getContext=function(){return O},this.getContextAttributes=function(){return O.getContextAttributes()},this.forceContextLoss=function(){const I=Z.get("WEBGL_lose_context");I&&I.loseContext()},this.forceContextRestore=function(){const I=Z.get("WEBGL_lose_context");I&&I.restoreContext()},this.getPixelRatio=function(){return q},this.setPixelRatio=function(I){I!==void 0&&(q=I,this.setSize(L,U,!1))},this.getSize=function(I){return I.set(L,U)},this.setSize=function(I,X,J=!0){if(Wt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}L=I,U=X,e.width=Math.floor(I*q),e.height=Math.floor(X*q),J===!0&&(e.style.width=I+"px",e.style.height=X+"px"),this.setViewport(0,0,I,X)},this.getDrawingBufferSize=function(I){return I.set(L*q,U*q).floor()},this.setDrawingBufferSize=function(I,X,J){L=I,U=X,q=J,e.width=Math.floor(I*J),e.height=Math.floor(X*J),this.setViewport(0,0,I,X)},this.getCurrentViewport=function(I){return I.copy(E)},this.getViewport=function(I){return I.copy(j)},this.setViewport=function(I,X,J,$){I.isVector4?j.set(I.x,I.y,I.z,I.w):j.set(I,X,J,$),tt.viewport(E.copy(j).multiplyScalar(q).floor())},this.getScissor=function(I){return I.copy(k)},this.setScissor=function(I,X,J,$){I.isVector4?k.set(I.x,I.y,I.z,I.w):k.set(I,X,J,$),tt.scissor(N.copy(k).multiplyScalar(q).floor())},this.getScissorTest=function(){return V},this.setScissorTest=function(I){tt.setScissorTest(V=I)},this.setOpaqueSort=function(I){H=I},this.setTransparentSort=function(I){G=I},this.getClearColor=function(I){return I.copy(Yt.getClearColor())},this.setClearColor=function(){Yt.setClearColor.apply(Yt,arguments)},this.getClearAlpha=function(){return Yt.getClearAlpha()},this.setClearAlpha=function(){Yt.setClearAlpha.apply(Yt,arguments)},this.clear=function(I=!0,X=!0,J=!0){let $=0;if(I){let K=!1;if(b!==null){const At=b.texture.format;K=At===fu||At===du||At===uu}if(K){const At=b.texture.type,Ut=At===Bn||At===Kn||At===$a||At===ti||At===cu||At===hu,zt=Yt.getClearColor(),Gt=Yt.getClearAlpha(),Zt=zt.r,Vt=zt.g,qt=zt.b;Ut?(f[0]=Zt,f[1]=Vt,f[2]=qt,f[3]=Gt,O.clearBufferuiv(O.COLOR,0,f)):(p[0]=Zt,p[1]=Vt,p[2]=qt,p[3]=Gt,O.clearBufferiv(O.COLOR,0,p))}else $|=O.COLOR_BUFFER_BIT}X&&($|=O.DEPTH_BUFFER_BIT),J&&($|=O.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),O.clear($)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",gt,!1),e.removeEventListener("webglcontextrestored",B,!1),e.removeEventListener("webglcontextcreationerror",wt,!1),St.dispose(),Dt.dispose(),vt.dispose(),C.dispose(),W.dispose(),st.dispose(),Ht.dispose(),te.dispose(),xt.dispose(),Wt.dispose(),Wt.removeEventListener("sessionstart",Ve),Wt.removeEventListener("sessionend",he),ut&&(ut.dispose(),ut=null),Xe.stop()};function gt(I){I.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),M=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),M=!1;const I=Tt.autoReset,X=at.enabled,J=at.autoUpdate,$=at.needsUpdate,K=at.type;oe(),Tt.autoReset=I,at.enabled=X,at.autoUpdate=J,at.needsUpdate=$,at.type=K}function wt(I){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",I.statusMessage)}function bt(I){const X=I.target;X.removeEventListener("dispose",bt),kt(X)}function kt(I){Ot(I),vt.remove(I)}function Ot(I){const X=vt.get(I).programs;X!==void 0&&(X.forEach(function(J){xt.releaseProgram(J)}),I.isShaderMaterial&&xt.releaseShaderCache(I))}this.renderBufferDirect=function(I,X,J,$,K,At){X===null&&(X=dt);const Ut=K.isMesh&&K.matrixWorld.determinant()<0,zt=Ed(I,X,J,$,K);tt.setMaterial($,Ut);let Gt=J.index,Zt=1;if($.wireframe===!0){if(Gt=ot.getWireframeAttribute(J),Gt===void 0)return;Zt=2}const Vt=J.drawRange,qt=J.attributes.position;let _e=Vt.start*Zt,$e=(Vt.start+Vt.count)*Zt;At!==null&&(_e=Math.max(_e,At.start*Zt),$e=Math.min($e,(At.start+At.count)*Zt)),Gt!==null?(_e=Math.max(_e,0),$e=Math.min($e,Gt.count)):qt!=null&&(_e=Math.max(_e,0),$e=Math.min($e,qt.count));const De=$e-_e;if(De<0||De===1/0)return;Ht.setup(K,$,zt,J,Gt);let An,ge=Bt;if(Gt!==null&&(An=rt.get(Gt),ge=_t,ge.setIndex(An)),K.isMesh)$.wireframe===!0?(tt.setLineWidth($.wireframeLinewidth*Mt()),ge.setMode(O.LINES)):ge.setMode(O.TRIANGLES);else if(K.isLine){let Kt=$.linewidth;Kt===void 0&&(Kt=1),tt.setLineWidth(Kt*Mt()),K.isLineSegments?ge.setMode(O.LINES):K.isLineLoop?ge.setMode(O.LINE_LOOP):ge.setMode(O.LINE_STRIP)}else K.isPoints?ge.setMode(O.POINTS):K.isSprite&&ge.setMode(O.TRIANGLES);if(K.isBatchedMesh)ge.renderMultiDraw(K._multiDrawStarts,K._multiDrawCounts,K._multiDrawCount);else if(K.isInstancedMesh)ge.renderInstances(_e,De,K.count);else if(J.isInstancedBufferGeometry){const Kt=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,br=Math.min(J.instanceCount,Kt);ge.renderInstances(_e,De,br)}else ge.render(_e,De)};function le(I,X,J){I.transparent===!0&&I.side===Ae&&I.forceSinglePass===!1?(I.side=je,I.needsUpdate=!0,js(I,X,J),I.side=ei,I.needsUpdate=!0,js(I,X,J),I.side=Ae):js(I,X,J)}this.compile=function(I,X,J=null){J===null&&(J=I),g=Dt.get(J),g.init(),x.push(g),J.traverseVisible(function(K){K.isLight&&K.layers.test(X.layers)&&(g.pushLight(K),K.castShadow&&g.pushShadow(K))}),I!==J&&I.traverseVisible(function(K){K.isLight&&K.layers.test(X.layers)&&(g.pushLight(K),K.castShadow&&g.pushShadow(K))}),g.setupLights(y._useLegacyLights);const $=new Set;return I.traverse(function(K){const At=K.material;if(At)if(Array.isArray(At))for(let Ut=0;Ut<At.length;Ut++){const zt=At[Ut];le(zt,J,K),$.add(zt)}else le(At,J,K),$.add(At)}),x.pop(),g=null,$},this.compileAsync=function(I,X,J=null){const $=this.compile(I,X,J);return new Promise(K=>{function At(){if($.forEach(function(Ut){vt.get(Ut).currentProgram.isReady()&&$.delete(Ut)}),$.size===0){K(I);return}setTimeout(At,10)}Z.get("KHR_parallel_shader_compile")!==null?At():setTimeout(At,10)})};let ce=null;function Ie(I){ce&&ce(I)}function Ve(){Xe.stop()}function he(){Xe.start()}const Xe=new Cu;Xe.setAnimationLoop(Ie),typeof self<"u"&&Xe.setContext(self),this.setAnimationLoop=function(I){ce=I,Wt.setAnimationLoop(I),I===null?Xe.stop():Xe.start()},Wt.addEventListener("sessionstart",Ve),Wt.addEventListener("sessionend",he),this.render=function(I,X){if(X!==void 0&&X.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(M===!0)return;I.matrixWorldAutoUpdate===!0&&I.updateMatrixWorld(),X.parent===null&&X.matrixWorldAutoUpdate===!0&&X.updateMatrixWorld(),Wt.enabled===!0&&Wt.isPresenting===!0&&(Wt.cameraAutoUpdate===!0&&Wt.updateCamera(X),X=Wt.getCamera()),I.isScene===!0&&I.onBeforeRender(y,I,X,b),g=Dt.get(I,x.length),g.init(),x.push(g),it.multiplyMatrices(X.projectionMatrix,X.matrixWorldInverse),Y.setFromProjectionMatrix(it),ht=this.localClippingEnabled,et=Ft.init(this.clippingPlanes,ht),v=St.get(I,m.length),v.init(),m.push(v),Mn(I,X,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(H,G),this.info.render.frame++,et===!0&&Ft.beginShadows();const J=g.state.shadowsArray;if(at.render(J,I,X),et===!0&&Ft.endShadows(),this.info.autoReset===!0&&this.info.reset(),Yt.render(v,I),g.setupLights(y._useLegacyLights),X.isArrayCamera){const $=X.cameras;for(let K=0,At=$.length;K<At;K++){const Ut=$[K];bl(v,I,Ut,Ut.viewport)}}else bl(v,I,X);b!==null&&(P.updateMultisampleRenderTarget(b),P.updateRenderTargetMipmap(b)),I.isScene===!0&&I.onAfterRender(y,I,X),Ht.resetDefaultState(),A=-1,_=null,x.pop(),x.length>0?g=x[x.length-1]:g=null,m.pop(),m.length>0?v=m[m.length-1]:v=null};function Mn(I,X,J,$){if(I.visible===!1)return;if(I.layers.test(X.layers)){if(I.isGroup)J=I.renderOrder;else if(I.isLOD)I.autoUpdate===!0&&I.update(X);else if(I.isLight)g.pushLight(I),I.castShadow&&g.pushShadow(I);else if(I.isSprite){if(!I.frustumCulled||Y.intersectsSprite(I)){$&&pt.setFromMatrixPosition(I.matrixWorld).applyMatrix4(it);const Ut=st.update(I),zt=I.material;zt.visible&&v.push(I,Ut,zt,J,pt.z,null)}}else if((I.isMesh||I.isLine||I.isPoints)&&(!I.frustumCulled||Y.intersectsObject(I))){const Ut=st.update(I),zt=I.material;if($&&(I.boundingSphere!==void 0?(I.boundingSphere===null&&I.computeBoundingSphere(),pt.copy(I.boundingSphere.center)):(Ut.boundingSphere===null&&Ut.computeBoundingSphere(),pt.copy(Ut.boundingSphere.center)),pt.applyMatrix4(I.matrixWorld).applyMatrix4(it)),Array.isArray(zt)){const Gt=Ut.groups;for(let Zt=0,Vt=Gt.length;Zt<Vt;Zt++){const qt=Gt[Zt],_e=zt[qt.materialIndex];_e&&_e.visible&&v.push(I,Ut,_e,J,pt.z,qt)}}else zt.visible&&v.push(I,Ut,zt,J,pt.z,null)}}const At=I.children;for(let Ut=0,zt=At.length;Ut<zt;Ut++)Mn(At[Ut],X,J,$)}function bl(I,X,J,$){const K=I.opaque,At=I.transmissive,Ut=I.transparent;g.setupLightsView(J),et===!0&&Ft.setGlobalState(y.clippingPlanes,J),At.length>0&&bd(K,At,X,J),$&&tt.viewport(E.copy($)),K.length>0&&Ys(K,X,J),At.length>0&&Ys(At,X,J),Ut.length>0&&Ys(Ut,X,J),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function bd(I,X,J,$){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;const At=ct.isWebGL2;ut===null&&(ut=new Ze(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")?sn:Bn,minFilter:ns,samples:At?4:0})),y.getDrawingBufferSize(ft),At?ut.setSize(ft.x,ft.y):ut.setSize(lr(ft.x),lr(ft.y));const Ut=y.getRenderTarget();y.setRenderTarget(ut),y.getClearColor(F),R=y.getClearAlpha(),R<1&&y.setClearColor(16777215,.5),y.clear();const zt=y.toneMapping;y.toneMapping=$n,Ys(I,J,$),P.updateMultisampleRenderTarget(ut),P.updateRenderTargetMipmap(ut);let Gt=!1;for(let Zt=0,Vt=X.length;Zt<Vt;Zt++){const qt=X[Zt],_e=qt.object,$e=qt.geometry,De=qt.material,An=qt.group;if(De.side===Ae&&_e.layers.test($.layers)){const ge=De.side;De.side=je,De.needsUpdate=!0,El(_e,J,$,$e,De,An),De.side=ge,De.needsUpdate=!0,Gt=!0}}Gt===!0&&(P.updateMultisampleRenderTarget(ut),P.updateRenderTargetMipmap(ut)),y.setRenderTarget(Ut),y.setClearColor(F,R),y.toneMapping=zt}function Ys(I,X,J){const $=X.isScene===!0?X.overrideMaterial:null;for(let K=0,At=I.length;K<At;K++){const Ut=I[K],zt=Ut.object,Gt=Ut.geometry,Zt=$===null?Ut.material:$,Vt=Ut.group;zt.layers.test(J.layers)&&El(zt,X,J,Gt,Zt,Vt)}}function El(I,X,J,$,K,At){I.onBeforeRender(y,X,J,$,K,At),I.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,I.matrixWorld),I.normalMatrix.getNormalMatrix(I.modelViewMatrix),K.onBeforeRender(y,X,J,$,I,At),K.transparent===!0&&K.side===Ae&&K.forceSinglePass===!1?(K.side=je,K.needsUpdate=!0,y.renderBufferDirect(J,X,$,K,I,At),K.side=ei,K.needsUpdate=!0,y.renderBufferDirect(J,X,$,K,I,At),K.side=Ae):y.renderBufferDirect(J,X,$,K,I,At),I.onAfterRender(y,X,J,$,K,At)}function js(I,X,J){X.isScene!==!0&&(X=dt);const $=vt.get(I),K=g.state.lights,At=g.state.shadowsArray,Ut=K.state.version,zt=xt.getParameters(I,K.state,At,X,J),Gt=xt.getProgramCacheKey(zt);let Zt=$.programs;$.environment=I.isMeshStandardMaterial?X.environment:null,$.fog=X.fog,$.envMap=(I.isMeshStandardMaterial?W:C).get(I.envMap||$.environment),Zt===void 0&&(I.addEventListener("dispose",bt),Zt=new Map,$.programs=Zt);let Vt=Zt.get(Gt);if(Vt!==void 0){if($.currentProgram===Vt&&$.lightsStateVersion===Ut)return Al(I,zt),Vt}else zt.uniforms=xt.getUniforms(I),I.onBuild(J,zt,y),I.onBeforeCompile(zt,y),Vt=xt.acquireProgram(zt,Gt),Zt.set(Gt,Vt),$.uniforms=zt.uniforms;const qt=$.uniforms;return(!I.isShaderMaterial&&!I.isRawShaderMaterial||I.clipping===!0)&&(qt.clippingPlanes=Ft.uniform),Al(I,zt),$.needsLights=Ad(I),$.lightsStateVersion=Ut,$.needsLights&&(qt.ambientLightColor.value=K.state.ambient,qt.lightProbe.value=K.state.probe,qt.directionalLights.value=K.state.directional,qt.directionalLightShadows.value=K.state.directionalShadow,qt.spotLights.value=K.state.spot,qt.spotLightShadows.value=K.state.spotShadow,qt.rectAreaLights.value=K.state.rectArea,qt.ltc_1.value=K.state.rectAreaLTC1,qt.ltc_2.value=K.state.rectAreaLTC2,qt.pointLights.value=K.state.point,qt.pointLightShadows.value=K.state.pointShadow,qt.hemisphereLights.value=K.state.hemi,qt.directionalShadowMap.value=K.state.directionalShadowMap,qt.directionalShadowMatrix.value=K.state.directionalShadowMatrix,qt.spotShadowMap.value=K.state.spotShadowMap,qt.spotLightMatrix.value=K.state.spotLightMatrix,qt.spotLightMap.value=K.state.spotLightMap,qt.pointShadowMap.value=K.state.pointShadowMap,qt.pointShadowMatrix.value=K.state.pointShadowMatrix),$.currentProgram=Vt,$.uniformsList=null,Vt}function Tl(I){if(I.uniformsList===null){const X=I.currentProgram.getUniforms();I.uniformsList=nr.seqWithValue(X.seq,I.uniforms)}return I.uniformsList}function Al(I,X){const J=vt.get(I);J.outputColorSpace=X.outputColorSpace,J.batching=X.batching,J.instancing=X.instancing,J.instancingColor=X.instancingColor,J.skinning=X.skinning,J.morphTargets=X.morphTargets,J.morphNormals=X.morphNormals,J.morphColors=X.morphColors,J.morphTargetsCount=X.morphTargetsCount,J.numClippingPlanes=X.numClippingPlanes,J.numIntersection=X.numClipIntersection,J.vertexAlphas=X.vertexAlphas,J.vertexTangents=X.vertexTangents,J.toneMapping=X.toneMapping}function Ed(I,X,J,$,K){X.isScene!==!0&&(X=dt),P.resetTextureUnits();const At=X.fog,Ut=$.isMeshStandardMaterial?X.environment:null,zt=b===null?y.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:kn,Gt=($.isMeshStandardMaterial?W:C).get($.envMap||Ut),Zt=$.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,Vt=!!J.attributes.tangent&&(!!$.normalMap||$.anisotropy>0),qt=!!J.morphAttributes.position,_e=!!J.morphAttributes.normal,$e=!!J.morphAttributes.color;let De=$n;$.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(De=y.toneMapping);const An=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,ge=An!==void 0?An.length:0,Kt=vt.get($),br=g.state.lights;if(et===!0&&(ht===!0||I!==_)){const an=I===_&&$.id===A;Ft.setState($,I,an)}let Me=!1;$.version===Kt.__version?(Kt.needsLights&&Kt.lightsStateVersion!==br.state.version||Kt.outputColorSpace!==zt||K.isBatchedMesh&&Kt.batching===!1||!K.isBatchedMesh&&Kt.batching===!0||K.isInstancedMesh&&Kt.instancing===!1||!K.isInstancedMesh&&Kt.instancing===!0||K.isSkinnedMesh&&Kt.skinning===!1||!K.isSkinnedMesh&&Kt.skinning===!0||K.isInstancedMesh&&Kt.instancingColor===!0&&K.instanceColor===null||K.isInstancedMesh&&Kt.instancingColor===!1&&K.instanceColor!==null||Kt.envMap!==Gt||$.fog===!0&&Kt.fog!==At||Kt.numClippingPlanes!==void 0&&(Kt.numClippingPlanes!==Ft.numPlanes||Kt.numIntersection!==Ft.numIntersection)||Kt.vertexAlphas!==Zt||Kt.vertexTangents!==Vt||Kt.morphTargets!==qt||Kt.morphNormals!==_e||Kt.morphColors!==$e||Kt.toneMapping!==De||ct.isWebGL2===!0&&Kt.morphTargetsCount!==ge)&&(Me=!0):(Me=!0,Kt.__version=$.version);let ii=Kt.currentProgram;Me===!0&&(ii=js($,X,K));let Cl=!1,hs=!1,Er=!1;const ke=ii.getUniforms(),si=Kt.uniforms;if(tt.useProgram(ii.program)&&(Cl=!0,hs=!0,Er=!0),$.id!==A&&(A=$.id,hs=!0),Cl||_!==I){ke.setValue(O,"projectionMatrix",I.projectionMatrix),ke.setValue(O,"viewMatrix",I.matrixWorldInverse);const an=ke.map.cameraPosition;an!==void 0&&an.setValue(O,pt.setFromMatrixPosition(I.matrixWorld)),ct.logarithmicDepthBuffer&&ke.setValue(O,"logDepthBufFC",2/(Math.log(I.far+1)/Math.LN2)),($.isMeshPhongMaterial||$.isMeshToonMaterial||$.isMeshLambertMaterial||$.isMeshBasicMaterial||$.isMeshStandardMaterial||$.isShaderMaterial)&&ke.setValue(O,"isOrthographic",I.isOrthographicCamera===!0),_!==I&&(_=I,hs=!0,Er=!0)}if(K.isSkinnedMesh){ke.setOptional(O,K,"bindMatrix"),ke.setOptional(O,K,"bindMatrixInverse");const an=K.skeleton;an&&(ct.floatVertexTextures?(an.boneTexture===null&&an.computeBoneTexture(),ke.setValue(O,"boneTexture",an.boneTexture,P)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}K.isBatchedMesh&&(ke.setOptional(O,K,"batchingTexture"),ke.setValue(O,"batchingTexture",K._matricesTexture,P));const Tr=J.morphAttributes;if((Tr.position!==void 0||Tr.normal!==void 0||Tr.color!==void 0&&ct.isWebGL2===!0)&&Xt.update(K,J,ii),(hs||Kt.receiveShadow!==K.receiveShadow)&&(Kt.receiveShadow=K.receiveShadow,ke.setValue(O,"receiveShadow",K.receiveShadow)),$.isMeshGouraudMaterial&&$.envMap!==null&&(si.envMap.value=Gt,si.flipEnvMap.value=Gt.isCubeTexture&&Gt.isRenderTargetTexture===!1?-1:1),hs&&(ke.setValue(O,"toneMappingExposure",y.toneMappingExposure),Kt.needsLights&&Td(si,Er),At&&$.fog===!0&&mt.refreshFogUniforms(si,At),mt.refreshMaterialUniforms(si,$,q,U,ut),nr.upload(O,Tl(Kt),si,P)),$.isShaderMaterial&&$.uniformsNeedUpdate===!0&&(nr.upload(O,Tl(Kt),si,P),$.uniformsNeedUpdate=!1),$.isSpriteMaterial&&ke.setValue(O,"center",K.center),ke.setValue(O,"modelViewMatrix",K.modelViewMatrix),ke.setValue(O,"normalMatrix",K.normalMatrix),ke.setValue(O,"modelMatrix",K.matrixWorld),$.isShaderMaterial||$.isRawShaderMaterial){const an=$.uniformsGroups;for(let Ar=0,Cd=an.length;Ar<Cd;Ar++)if(ct.isWebGL2){const Rl=an[Ar];te.update(Rl,ii),te.bind(Rl,ii)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ii}function Td(I,X){I.ambientLightColor.needsUpdate=X,I.lightProbe.needsUpdate=X,I.directionalLights.needsUpdate=X,I.directionalLightShadows.needsUpdate=X,I.pointLights.needsUpdate=X,I.pointLightShadows.needsUpdate=X,I.spotLights.needsUpdate=X,I.spotLightShadows.needsUpdate=X,I.rectAreaLights.needsUpdate=X,I.hemisphereLights.needsUpdate=X}function Ad(I){return I.isMeshLambertMaterial||I.isMeshToonMaterial||I.isMeshPhongMaterial||I.isMeshStandardMaterial||I.isShadowMaterial||I.isShaderMaterial&&I.lights===!0}this.getActiveCubeFace=function(){return w},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(I,X,J){vt.get(I.texture).__webglTexture=X,vt.get(I.depthTexture).__webglTexture=J;const $=vt.get(I);$.__hasExternalTextures=!0,$.__hasExternalTextures&&($.__autoAllocateDepthBuffer=J===void 0,$.__autoAllocateDepthBuffer||Z.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),$.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(I,X){const J=vt.get(I);J.__webglFramebuffer=X,J.__useDefaultFramebuffer=X===void 0},this.setRenderTarget=function(I,X=0,J=0){b=I,w=X,S=J;let $=!0,K=null,At=!1,Ut=!1;if(I){const Gt=vt.get(I);Gt.__useDefaultFramebuffer!==void 0?(tt.bindFramebuffer(O.FRAMEBUFFER,null),$=!1):Gt.__webglFramebuffer===void 0?P.setupRenderTarget(I):Gt.__hasExternalTextures&&P.rebindTextures(I,vt.get(I.texture).__webglTexture,vt.get(I.depthTexture).__webglTexture);const Zt=I.texture;(Zt.isData3DTexture||Zt.isDataArrayTexture||Zt.isCompressedArrayTexture)&&(Ut=!0);const Vt=vt.get(I).__webglFramebuffer;I.isWebGLCubeRenderTarget?(Array.isArray(Vt[X])?K=Vt[X][J]:K=Vt[X],At=!0):ct.isWebGL2&&I.samples>0&&P.useMultisampledRTT(I)===!1?K=vt.get(I).__webglMultisampledFramebuffer:Array.isArray(Vt)?K=Vt[J]:K=Vt,E.copy(I.viewport),N.copy(I.scissor),D=I.scissorTest}else E.copy(j).multiplyScalar(q).floor(),N.copy(k).multiplyScalar(q).floor(),D=V;if(tt.bindFramebuffer(O.FRAMEBUFFER,K)&&ct.drawBuffers&&$&&tt.drawBuffers(I,K),tt.viewport(E),tt.scissor(N),tt.setScissorTest(D),At){const Gt=vt.get(I.texture);O.framebufferTexture2D(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,O.TEXTURE_CUBE_MAP_POSITIVE_X+X,Gt.__webglTexture,J)}else if(Ut){const Gt=vt.get(I.texture),Zt=X||0;O.framebufferTextureLayer(O.FRAMEBUFFER,O.COLOR_ATTACHMENT0,Gt.__webglTexture,J||0,Zt)}A=-1},this.readRenderTargetPixels=function(I,X,J,$,K,At,Ut){if(!(I&&I.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let zt=vt.get(I).__webglFramebuffer;if(I.isWebGLCubeRenderTarget&&Ut!==void 0&&(zt=zt[Ut]),zt){tt.bindFramebuffer(O.FRAMEBUFFER,zt);try{const Gt=I.texture,Zt=Gt.format,Vt=Gt.type;if(Zt!==cn&&Et.convert(Zt)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const qt=Vt===sn&&(Z.has("EXT_color_buffer_half_float")||ct.isWebGL2&&Z.has("EXT_color_buffer_float"));if(Vt!==Bn&&Et.convert(Vt)!==O.getParameter(O.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Vt===Jn&&(ct.isWebGL2||Z.has("OES_texture_float")||Z.has("WEBGL_color_buffer_float")))&&!qt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}X>=0&&X<=I.width-$&&J>=0&&J<=I.height-K&&O.readPixels(X,J,$,K,Et.convert(Zt),Et.convert(Vt),At)}finally{const Gt=b!==null?vt.get(b).__webglFramebuffer:null;tt.bindFramebuffer(O.FRAMEBUFFER,Gt)}}},this.copyFramebufferToTexture=function(I,X,J=0){const $=Math.pow(2,-J),K=Math.floor(X.image.width*$),At=Math.floor(X.image.height*$);P.setTexture2D(X,0),O.copyTexSubImage2D(O.TEXTURE_2D,J,0,0,I.x,I.y,K,At),tt.unbindTexture()},this.copyTextureToTexture=function(I,X,J,$=0){const K=X.image.width,At=X.image.height,Ut=Et.convert(J.format),zt=Et.convert(J.type);P.setTexture2D(J,0),O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,J.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,J.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,J.unpackAlignment),X.isDataTexture?O.texSubImage2D(O.TEXTURE_2D,$,I.x,I.y,K,At,Ut,zt,X.image.data):X.isCompressedTexture?O.compressedTexSubImage2D(O.TEXTURE_2D,$,I.x,I.y,X.mipmaps[0].width,X.mipmaps[0].height,Ut,X.mipmaps[0].data):O.texSubImage2D(O.TEXTURE_2D,$,I.x,I.y,Ut,zt,X.image),$===0&&J.generateMipmaps&&O.generateMipmap(O.TEXTURE_2D),tt.unbindTexture()},this.copyTextureToTexture3D=function(I,X,J,$,K=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const At=I.max.x-I.min.x+1,Ut=I.max.y-I.min.y+1,zt=I.max.z-I.min.z+1,Gt=Et.convert($.format),Zt=Et.convert($.type);let Vt;if($.isData3DTexture)P.setTexture3D($,0),Vt=O.TEXTURE_3D;else if($.isDataArrayTexture||$.isCompressedArrayTexture)P.setTexture2DArray($,0),Vt=O.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}O.pixelStorei(O.UNPACK_FLIP_Y_WEBGL,$.flipY),O.pixelStorei(O.UNPACK_PREMULTIPLY_ALPHA_WEBGL,$.premultiplyAlpha),O.pixelStorei(O.UNPACK_ALIGNMENT,$.unpackAlignment);const qt=O.getParameter(O.UNPACK_ROW_LENGTH),_e=O.getParameter(O.UNPACK_IMAGE_HEIGHT),$e=O.getParameter(O.UNPACK_SKIP_PIXELS),De=O.getParameter(O.UNPACK_SKIP_ROWS),An=O.getParameter(O.UNPACK_SKIP_IMAGES),ge=J.isCompressedTexture?J.mipmaps[K]:J.image;O.pixelStorei(O.UNPACK_ROW_LENGTH,ge.width),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,ge.height),O.pixelStorei(O.UNPACK_SKIP_PIXELS,I.min.x),O.pixelStorei(O.UNPACK_SKIP_ROWS,I.min.y),O.pixelStorei(O.UNPACK_SKIP_IMAGES,I.min.z),J.isDataTexture||J.isData3DTexture?O.texSubImage3D(Vt,K,X.x,X.y,X.z,At,Ut,zt,Gt,Zt,ge.data):J.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),O.compressedTexSubImage3D(Vt,K,X.x,X.y,X.z,At,Ut,zt,Gt,ge.data)):O.texSubImage3D(Vt,K,X.x,X.y,X.z,At,Ut,zt,Gt,Zt,ge),O.pixelStorei(O.UNPACK_ROW_LENGTH,qt),O.pixelStorei(O.UNPACK_IMAGE_HEIGHT,_e),O.pixelStorei(O.UNPACK_SKIP_PIXELS,$e),O.pixelStorei(O.UNPACK_SKIP_ROWS,De),O.pixelStorei(O.UNPACK_SKIP_IMAGES,An),K===0&&$.generateMipmaps&&O.generateMipmap(Vt),tt.unbindTexture()},this.initTexture=function(I){I.isCubeTexture?P.setTextureCube(I,0):I.isData3DTexture?P.setTexture3D(I,0):I.isDataArrayTexture||I.isCompressedArrayTexture?P.setTexture2DArray(I,0):P.setTexture2D(I,0),tt.unbindTexture()},this.resetState=function(){w=0,S=0,b=null,tt.reset(),Ht.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===el?"display-p3":"srgb",e.unpackColorSpace=se.workingColorSpace===mr?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===Qt?vi:mu}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===vi?Qt:kn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Bv extends Nu{}Bv.prototype.isWebGL1Renderer=!0;class vr{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Nt(t),this.near=e,this.far=n}clone(){return new vr(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class kv extends Be{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Uu extends ze{constructor(t=null,e=1,n=1,i,o,r,a,l,c=Se,h=Se,d,u){super(null,r,a,l,c,h,i,o,d,u),this.isDataTexture=!0,this.image={data:t,width:e,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Yc extends ne{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Gi=new $t,jc=new $t,xo=[],Zc=new wi,Gv=new $t,ms=new Q,gs=new Hs;class Gn extends Q{constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Yc(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Gv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new wi),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),Zc.copy(t.boundingBox).applyMatrix4(Gi),this.boundingBox.union(Zc)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Hs),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Gi),gs.copy(t.boundingSphere).applyMatrix4(Gi),this.boundingSphere.union(gs)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(ms.geometry=this.geometry,ms.material=this.material,ms.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),gs.copy(this.boundingSphere),gs.applyMatrix4(n),t.ray.intersectsSphere(gs)!==!1))for(let o=0;o<i;o++){this.getMatrixAt(o,Gi),jc.multiplyMatrices(n,Gi),ms.matrixWorld=jc,ms.raycast(t,xo);for(let r=0,a=xo.length;r<a;r++){const l=xo[r];l.instanceId=o,l.object=this,e.push(l)}xo.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Yc(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Le extends ze{constructor(t,e,n,i,o,r,a,l,c){super(t,e,n,i,o,r,a,l,c),this.isCanvasTexture=!0,this.needsUpdate=!0}}class Tn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),o=0;e.push(0);for(let r=1;r<=t;r++)n=this.getPoint(r/t),o+=n.distanceTo(i),e.push(o),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const o=n.length;let r;e?r=e:r=t*n[o-1];let a=0,l=o-1,c;for(;a<=l;)if(i=Math.floor(a+(l-a)/2),c=n[i]-r,c<0)a=i+1;else if(c>0)l=i-1;else{l=i;break}if(i=l,n[i]===r)return i/(o-1);const h=n[i],u=n[i+1]-h,f=(r-h)/u;return(i+f)/(o-1)}getTangent(t,e){let i=t-1e-4,o=t+1e-4;i<0&&(i=0),o>1&&(o=1);const r=this.getPoint(i),a=this.getPoint(o),l=e||(r.isVector2?new nt:new z);return l.copy(a).sub(r).normalize(),l}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new z,i=[],o=[],r=[],a=new z,l=new $t;for(let f=0;f<=t;f++){const p=f/t;i[f]=this.getTangentAt(p,new z)}o[0]=new z,r[0]=new z;let c=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=c&&(c=h,n.set(1,0,0)),d<=c&&(c=d,n.set(0,1,0)),u<=c&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),o[0].crossVectors(i[0],a),r[0].crossVectors(i[0],o[0]);for(let f=1;f<=t;f++){if(o[f]=o[f-1].clone(),r[f]=r[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const p=Math.acos(Te(i[f-1].dot(i[f]),-1,1));o[f].applyMatrix4(l.makeRotationAxis(a,p))}r[f].crossVectors(i[f],o[f])}if(e===!0){let f=Math.acos(Te(o[0].dot(o[t]),-1,1));f/=t,i[0].dot(a.crossVectors(o[0],o[t]))>0&&(f=-f);for(let p=1;p<=t;p++)o[p].applyMatrix4(l.makeRotationAxis(i[p],f*p)),r[p].crossVectors(i[p],o[p])}return{tangents:i,normals:o,binormals:r}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class al extends Tn{constructor(t=0,e=0,n=1,i=1,o=0,r=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=o,this.aEndAngle=r,this.aClockwise=a,this.aRotation=l}getPoint(t,e){const n=e||new nt,i=Math.PI*2;let o=this.aEndAngle-this.aStartAngle;const r=Math.abs(o)<Number.EPSILON;for(;o<0;)o+=i;for(;o>i;)o-=i;o<Number.EPSILON&&(r?o=0:o=i),this.aClockwise===!0&&!r&&(o===i?o=-i:o=o-i);const a=this.aStartAngle+t*o;let l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=l-this.aX,f=c-this.aY;l=u*h-f*d+this.aX,c=u*d+f*h+this.aY}return n.set(l,c)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Hv extends al{constructor(t,e,n,i,o,r){super(t,e,n,n,i,o,r),this.isArcCurve=!0,this.type="ArcCurve"}}function ll(){let s=0,t=0,e=0,n=0;function i(o,r,a,l){s=o,t=a,e=-3*o+3*r-2*a-l,n=2*o-2*r+a+l}return{initCatmullRom:function(o,r,a,l,c){i(r,a,c*(a-o),c*(l-r))},initNonuniformCatmullRom:function(o,r,a,l,c,h,d){let u=(r-o)/c-(a-o)/(c+h)+(a-r)/h,f=(a-r)/h-(l-r)/(h+d)+(l-a)/d;u*=h,f*=h,i(r,a,u,f)},calc:function(o){const r=o*o,a=r*o;return s+t*o+e*r+n*a}}}const yo=new z,ia=new ll,sa=new ll,oa=new ll;class Fu extends Tn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new z){const n=e,i=this.points,o=i.length,r=(o-(this.closed?0:1))*t;let a=Math.floor(r),l=r-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/o)+1)*o:l===0&&a===o-1&&(a=o-2,l=1);let c,h;this.closed||a>0?c=i[(a-1)%o]:(yo.subVectors(i[0],i[1]).add(i[0]),c=yo);const d=i[a%o],u=i[(a+1)%o];if(this.closed||a+2<o?h=i[(a+2)%o]:(yo.subVectors(i[o-1],i[o-2]).add(i[o-1]),h=yo),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let p=Math.pow(c.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),g=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),p<1e-4&&(p=v),g<1e-4&&(g=v),ia.initNonuniformCatmullRom(c.x,d.x,u.x,h.x,p,v,g),sa.initNonuniformCatmullRom(c.y,d.y,u.y,h.y,p,v,g),oa.initNonuniformCatmullRom(c.z,d.z,u.z,h.z,p,v,g)}else this.curveType==="catmullrom"&&(ia.initCatmullRom(c.x,d.x,u.x,h.x,this.tension),sa.initCatmullRom(c.y,d.y,u.y,h.y,this.tension),oa.initCatmullRom(c.z,d.z,u.z,h.z,this.tension));return n.set(ia.calc(l),sa.calc(l),oa.calc(l)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new z().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Kc(s,t,e,n,i){const o=(n-t)*.5,r=(i-e)*.5,a=s*s,l=s*a;return(2*e-2*n+o+r)*l+(-3*e+3*n-2*o-r)*a+o*s+e}function Wv(s,t){const e=1-s;return e*e*t}function Vv(s,t){return 2*(1-s)*s*t}function Xv(s,t){return s*s*t}function Is(s,t,e,n){return Wv(s,t)+Vv(s,e)+Xv(s,n)}function qv(s,t){const e=1-s;return e*e*e*t}function Yv(s,t){const e=1-s;return 3*e*e*s*t}function jv(s,t){return 3*(1-s)*s*s*t}function Zv(s,t){return s*s*s*t}function Ds(s,t,e,n,i){return qv(s,t)+Yv(s,e)+jv(s,n)+Zv(s,i)}class Ou extends Tn{constructor(t=new nt,e=new nt,n=new nt,i=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new nt){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Ds(t,i.x,o.x,r.x,a.x),Ds(t,i.y,o.y,r.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Kv extends Tn{constructor(t=new z,e=new z,n=new z,i=new z){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new z){const n=e,i=this.v0,o=this.v1,r=this.v2,a=this.v3;return n.set(Ds(t,i.x,o.x,r.x,a.x),Ds(t,i.y,o.y,r.y,a.y),Ds(t,i.z,o.z,r.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class zu extends Tn{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Jv extends Tn{constructor(t=new z,e=new z){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new z){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new z){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Bu extends Tn{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(Is(t,i.x,o.x,r.x),Is(t,i.y,o.y,r.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Qv extends Tn{constructor(t=new z,e=new z,n=new z){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new z){const n=e,i=this.v0,o=this.v1,r=this.v2;return n.set(Is(t,i.x,o.x,r.x),Is(t,i.y,o.y,r.y),Is(t,i.z,o.z,r.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class hr extends Tn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,i=this.points,o=(i.length-1)*t,r=Math.floor(o),a=o-r,l=i[r===0?r:r-1],c=i[r],h=i[r>i.length-2?i.length-1:r+1],d=i[r>i.length-3?i.length-1:r+2];return n.set(Kc(a,l.x,c.x,h.x,d.x),Kc(a,l.y,c.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new nt().fromArray(i))}return this}}var Wa=Object.freeze({__proto__:null,ArcCurve:Hv,CatmullRomCurve3:Fu,CubicBezierCurve:Ou,CubicBezierCurve3:Kv,EllipseCurve:al,LineCurve:zu,LineCurve3:Jv,QuadraticBezierCurve:Bu,QuadraticBezierCurve3:Qv,SplineCurve:hr});class $v extends Tn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Wa[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let o=0;for(;o<i.length;){if(i[o]>=n){const r=i[o]-n,a=this.curves[o],l=a.getLength(),c=l===0?0:1-r/l;return a.getPointAt(c,e)}o++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,o=this.curves;i<o.length;i++){const r=o[i],a=r.isEllipseCurve?t*2:r.isLineCurve||r.isLineCurve3?1:r.isSplineCurve?t*r.points.length:t,l=r.getPoints(a);for(let c=0;c<l.length;c++){const h=l[c];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Wa[i.type]().fromJSON(i))}return this}}class Jc extends $v{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new zu(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const o=new Bu(this.currentPoint.clone(),new nt(t,e),new nt(n,i));return this.curves.push(o),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,o,r){const a=new Ou(this.currentPoint.clone(),new nt(t,e),new nt(n,i),new nt(o,r));return this.curves.push(a),this.currentPoint.set(o,r),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new hr(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,o,r){const a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(t+a,e+l,n,i,o,r),this}absarc(t,e,n,i,o,r){return this.absellipse(t,e,n,n,i,o,r),this}ellipse(t,e,n,i,o,r,a,l){const c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+c,e+h,n,i,o,r,a,l),this}absellipse(t,e,n,i,o,r,a,l){const c=new al(t,e,n,i,o,r,a,l);if(this.curves.length>0){const d=c.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(c);const h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class cl extends ae{constructor(t=[new nt(0,-.5),new nt(.5,0),new nt(0,.5)],e=12,n=0,i=Math.PI*2){super(),this.type="LatheGeometry",this.parameters={points:t,segments:e,phiStart:n,phiLength:i},e=Math.floor(e),i=Te(i,0,Math.PI*2);const o=[],r=[],a=[],l=[],c=[],h=1/e,d=new z,u=new nt,f=new z,p=new z,v=new z;let g=0,m=0;for(let x=0;x<=t.length-1;x++)switch(x){case 0:g=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,f.x=m*1,f.y=-g,f.z=m*0,v.copy(f),f.normalize(),l.push(f.x,f.y,f.z);break;case t.length-1:l.push(v.x,v.y,v.z);break;default:g=t[x+1].x-t[x].x,m=t[x+1].y-t[x].y,f.x=m*1,f.y=-g,f.z=m*0,p.copy(f),f.x+=v.x,f.y+=v.y,f.z+=v.z,f.normalize(),l.push(f.x,f.y,f.z),v.copy(p)}for(let x=0;x<=e;x++){const y=n+x*h*i,M=Math.sin(y),w=Math.cos(y);for(let S=0;S<=t.length-1;S++){d.x=t[S].x*M,d.y=t[S].y,d.z=t[S].x*w,r.push(d.x,d.y,d.z),u.x=x/e,u.y=S/(t.length-1),a.push(u.x,u.y);const b=l[3*S+0]*M,A=l[3*S+1],_=l[3*S+0]*w;c.push(b,A,_)}}for(let x=0;x<e;x++)for(let y=0;y<t.length-1;y++){const M=y+x*t.length,w=M,S=M+t.length,b=M+t.length+1,A=M+1;o.push(w,S,A),o.push(b,A,S)}this.setIndex(o),this.setAttribute("position",new ee(r,3)),this.setAttribute("uv",new ee(a,2)),this.setAttribute("normal",new ee(c,3))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new cl(t.points,t.segments,t.phiStart,t.phiLength)}}class fe extends ae{constructor(t=1,e=1,n=1,i=32,o=1,r=!1,a=0,l=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:o,openEnded:r,thetaStart:a,thetaLength:l};const c=this;i=Math.floor(i),o=Math.floor(o);const h=[],d=[],u=[],f=[];let p=0;const v=[],g=n/2;let m=0;x(),r===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new ee(d,3)),this.setAttribute("normal",new ee(u,3)),this.setAttribute("uv",new ee(f,2));function x(){const M=new z,w=new z;let S=0;const b=(e-t)/n;for(let A=0;A<=o;A++){const _=[],E=A/o,N=E*(e-t)+t;for(let D=0;D<=i;D++){const F=D/i,R=F*l+a,L=Math.sin(R),U=Math.cos(R);w.x=N*L,w.y=-E*n+g,w.z=N*U,d.push(w.x,w.y,w.z),M.set(L,b,U).normalize(),u.push(M.x,M.y,M.z),f.push(F,1-E),_.push(p++)}v.push(_)}for(let A=0;A<i;A++)for(let _=0;_<o;_++){const E=v[_][A],N=v[_+1][A],D=v[_+1][A+1],F=v[_][A+1];h.push(E,N,F),h.push(N,D,F),S+=6}c.addGroup(m,S,0),m+=S}function y(M){const w=p,S=new nt,b=new z;let A=0;const _=M===!0?t:e,E=M===!0?1:-1;for(let D=1;D<=i;D++)d.push(0,g*E,0),u.push(0,E,0),f.push(.5,.5),p++;const N=p;for(let D=0;D<=i;D++){const R=D/i*l+a,L=Math.cos(R),U=Math.sin(R);b.x=_*U,b.y=g*E,b.z=_*L,d.push(b.x,b.y,b.z),u.push(0,E,0),S.x=L*.5+.5,S.y=U*.5*E+.5,f.push(S.x,S.y),p++}for(let D=0;D<i;D++){const F=w+D,R=N+D;M===!0?h.push(R,R+1,F):h.push(R+1,R,F),A+=3}c.addGroup(m,A,M===!0?1:2),m+=A}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new fe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class Qi extends fe{constructor(t=1,e=1,n=32,i=1,o=!1,r=0,a=Math.PI*2){super(0,t,e,n,i,o,r,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:o,thetaStart:r,thetaLength:a}}static fromJSON(t){return new Qi(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class hl extends ae{constructor(t=[],e=[],n=1,i=0){super(),this.type="PolyhedronGeometry",this.parameters={vertices:t,indices:e,radius:n,detail:i};const o=[],r=[];a(i),c(n),h(),this.setAttribute("position",new ee(o,3)),this.setAttribute("normal",new ee(o.slice(),3)),this.setAttribute("uv",new ee(r,2)),i===0?this.computeVertexNormals():this.normalizeNormals();function a(x){const y=new z,M=new z,w=new z;for(let S=0;S<e.length;S+=3)f(e[S+0],y),f(e[S+1],M),f(e[S+2],w),l(y,M,w,x)}function l(x,y,M,w){const S=w+1,b=[];for(let A=0;A<=S;A++){b[A]=[];const _=x.clone().lerp(M,A/S),E=y.clone().lerp(M,A/S),N=S-A;for(let D=0;D<=N;D++)D===0&&A===S?b[A][D]=_:b[A][D]=_.clone().lerp(E,D/N)}for(let A=0;A<S;A++)for(let _=0;_<2*(S-A)-1;_++){const E=Math.floor(_/2);_%2===0?(u(b[A][E+1]),u(b[A+1][E]),u(b[A][E])):(u(b[A][E+1]),u(b[A+1][E+1]),u(b[A+1][E]))}}function c(x){const y=new z;for(let M=0;M<o.length;M+=3)y.x=o[M+0],y.y=o[M+1],y.z=o[M+2],y.normalize().multiplyScalar(x),o[M+0]=y.x,o[M+1]=y.y,o[M+2]=y.z}function h(){const x=new z;for(let y=0;y<o.length;y+=3){x.x=o[y+0],x.y=o[y+1],x.z=o[y+2];const M=g(x)/2/Math.PI+.5,w=m(x)/Math.PI+.5;r.push(M,1-w)}p(),d()}function d(){for(let x=0;x<r.length;x+=6){const y=r[x+0],M=r[x+2],w=r[x+4],S=Math.max(y,M,w),b=Math.min(y,M,w);S>.9&&b<.1&&(y<.2&&(r[x+0]+=1),M<.2&&(r[x+2]+=1),w<.2&&(r[x+4]+=1))}}function u(x){o.push(x.x,x.y,x.z)}function f(x,y){const M=x*3;y.x=t[M+0],y.y=t[M+1],y.z=t[M+2]}function p(){const x=new z,y=new z,M=new z,w=new z,S=new nt,b=new nt,A=new nt;for(let _=0,E=0;_<o.length;_+=9,E+=6){x.set(o[_+0],o[_+1],o[_+2]),y.set(o[_+3],o[_+4],o[_+5]),M.set(o[_+6],o[_+7],o[_+8]),S.set(r[E+0],r[E+1]),b.set(r[E+2],r[E+3]),A.set(r[E+4],r[E+5]),w.copy(x).add(y).add(M).divideScalar(3);const N=g(w);v(S,E+0,x,N),v(b,E+2,y,N),v(A,E+4,M,N)}}function v(x,y,M,w){w<0&&x.x===1&&(r[y]=x.x-1),M.x===0&&M.z===0&&(r[y]=w/2/Math.PI+.5)}function g(x){return Math.atan2(x.z,-x.x)}function m(x){return Math.atan2(-x.y,Math.sqrt(x.x*x.x+x.z*x.z))}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new hl(t.vertices,t.indices,t.radius,t.details)}}let xr=class extends Jc{constructor(t){super(t),this.uuid=Si(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new Jc().fromJSON(i))}return this}};const tx={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let o=ku(s,0,i,e,!0);const r=[];if(!o||o.next===o.prev)return r;let a,l,c,h,d,u,f;if(n&&(o=ox(s,t,o,e)),s.length>80*e){a=c=s[0],l=h=s[1];for(let p=e;p<i;p+=e)d=s[p],u=s[p+1],d<a&&(a=d),u<l&&(l=u),d>c&&(c=d),u>h&&(h=u);f=Math.max(c-a,h-l),f=f!==0?32767/f:0}return zs(o,r,e,a,l,f,0),r}};function ku(s,t,e,n,i){let o,r;if(i===gx(s,t,e,n)>0)for(o=t;o<e;o+=n)r=Qc(o,s[o],s[o+1],r);else for(o=e-n;o>=t;o-=n)r=Qc(o,s[o],s[o+1],r);return r&&yr(r,r.next)&&(ks(r),r=r.next),r}function Mi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(yr(e,e.next)||xe(e.prev,e,e.next)===0)){if(ks(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function zs(s,t,e,n,i,o,r){if(!s)return;!r&&o&&hx(s,n,i,o);let a=s,l,c;for(;s.prev!==s.next;){if(l=s.prev,c=s.next,o?nx(s,n,i,o):ex(s)){t.push(l.i/e|0),t.push(s.i/e|0),t.push(c.i/e|0),ks(s),s=c.next,a=c.next;continue}if(s=c,s===a){r?r===1?(s=ix(Mi(s),t,e),zs(s,t,e,n,i,o,2)):r===2&&sx(s,t,e,n,i,o):zs(Mi(s),t,e,n,i,o,1);break}}}function ex(s){const t=s.prev,e=s,n=s.next;if(xe(t,e,n)>=0)return!1;const i=t.x,o=e.x,r=n.x,a=t.y,l=e.y,c=n.y,h=i<o?i<r?i:r:o<r?o:r,d=a<l?a<c?a:c:l<c?l:c,u=i>o?i>r?i:r:o>r?o:r,f=a>l?a>c?a:c:l>c?l:c;let p=n.next;for(;p!==t;){if(p.x>=h&&p.x<=u&&p.y>=d&&p.y<=f&&ji(i,a,o,l,r,c,p.x,p.y)&&xe(p.prev,p,p.next)>=0)return!1;p=p.next}return!0}function nx(s,t,e,n){const i=s.prev,o=s,r=s.next;if(xe(i,o,r)>=0)return!1;const a=i.x,l=o.x,c=r.x,h=i.y,d=o.y,u=r.y,f=a<l?a<c?a:c:l<c?l:c,p=h<d?h<u?h:u:d<u?d:u,v=a>l?a>c?a:c:l>c?l:c,g=h>d?h>u?h:u:d>u?d:u,m=Va(f,p,t,e,n),x=Va(v,g,t,e,n);let y=s.prevZ,M=s.nextZ;for(;y&&y.z>=m&&M&&M.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&ji(a,h,l,d,c,u,y.x,y.y)&&xe(y.prev,y,y.next)>=0||(y=y.prevZ,M.x>=f&&M.x<=v&&M.y>=p&&M.y<=g&&M!==i&&M!==r&&ji(a,h,l,d,c,u,M.x,M.y)&&xe(M.prev,M,M.next)>=0))return!1;M=M.nextZ}for(;y&&y.z>=m;){if(y.x>=f&&y.x<=v&&y.y>=p&&y.y<=g&&y!==i&&y!==r&&ji(a,h,l,d,c,u,y.x,y.y)&&xe(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;M&&M.z<=x;){if(M.x>=f&&M.x<=v&&M.y>=p&&M.y<=g&&M!==i&&M!==r&&ji(a,h,l,d,c,u,M.x,M.y)&&xe(M.prev,M,M.next)>=0)return!1;M=M.nextZ}return!0}function ix(s,t,e){let n=s;do{const i=n.prev,o=n.next.next;!yr(i,o)&&Gu(i,n,n.next,o)&&Bs(i,o)&&Bs(o,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(o.i/e|0),ks(n),ks(n.next),n=s=o),n=n.next}while(n!==s);return Mi(n)}function sx(s,t,e,n,i,o){let r=s;do{let a=r.next.next;for(;a!==r.prev;){if(r.i!==a.i&&fx(r,a)){let l=Hu(r,a);r=Mi(r,r.next),l=Mi(l,l.next),zs(r,t,e,n,i,o,0),zs(l,t,e,n,i,o,0);return}a=a.next}r=r.next}while(r!==s)}function ox(s,t,e,n){const i=[];let o,r,a,l,c;for(o=0,r=t.length;o<r;o++)a=t[o]*n,l=o<r-1?t[o+1]*n:s.length,c=ku(s,a,l,n,!1),c===c.next&&(c.steiner=!0),i.push(dx(c));for(i.sort(rx),o=0;o<i.length;o++)e=ax(i[o],e);return e}function rx(s,t){return s.x-t.x}function ax(s,t){const e=lx(s,t);if(!e)return t;const n=Hu(e,s);return Mi(n,n.next),Mi(e,e.next)}function lx(s,t){let e=t,n=-1/0,i;const o=s.x,r=s.y;do{if(r<=e.y&&r>=e.next.y&&e.next.y!==e.y){const u=e.x+(r-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=o&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===o))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,l=i.x,c=i.y;let h=1/0,d;e=i;do o>=e.x&&e.x>=l&&o!==e.x&&ji(r<c?o:n,r,l,c,r<c?n:o,r,e.x,e.y)&&(d=Math.abs(r-e.y)/(o-e.x),Bs(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&cx(i,e)))&&(i=e,h=d)),e=e.next;while(e!==a);return i}function cx(s,t){return xe(s.prev,s,t.prev)<0&&xe(t.next,s,s.next)<0}function hx(s,t,e,n){let i=s;do i.z===0&&(i.z=Va(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,ux(i)}function ux(s){let t,e,n,i,o,r,a,l,c=1;do{for(e=s,s=null,o=null,r=0;e;){for(r++,n=e,a=0,t=0;t<c&&(a++,n=n.nextZ,!!n);t++);for(l=c;a>0||l>0&&n;)a!==0&&(l===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,l--),o?o.nextZ=i:s=i,i.prevZ=o,o=i;e=n}o.nextZ=null,c*=2}while(r>1);return s}function Va(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function dx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function ji(s,t,e,n,i,o,r,a){return(i-r)*(t-a)>=(s-r)*(o-a)&&(s-r)*(n-a)>=(e-r)*(t-a)&&(e-r)*(o-a)>=(i-r)*(n-a)}function fx(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!px(s,t)&&(Bs(s,t)&&Bs(t,s)&&mx(s,t)&&(xe(s.prev,s,t.prev)||xe(s,t.prev,t))||yr(s,t)&&xe(s.prev,s,s.next)>0&&xe(t.prev,t,t.next)>0)}function xe(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function yr(s,t){return s.x===t.x&&s.y===t.y}function Gu(s,t,e,n){const i=_o(xe(s,t,e)),o=_o(xe(s,t,n)),r=_o(xe(e,n,s)),a=_o(xe(e,n,t));return!!(i!==o&&r!==a||i===0&&Mo(s,e,t)||o===0&&Mo(s,n,t)||r===0&&Mo(e,s,n)||a===0&&Mo(e,t,n))}function Mo(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function _o(s){return s>0?1:s<0?-1:0}function px(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Gu(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Bs(s,t){return xe(s.prev,s,s.next)<0?xe(s,t,s.next)>=0&&xe(s,s.prev,t)>=0:xe(s,t,s.prev)<0||xe(s,s.next,t)<0}function mx(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,o=(s.y+t.y)/2;do e.y>o!=e.next.y>o&&e.next.y!==e.y&&i<(e.next.x-e.x)*(o-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Hu(s,t){const e=new Xa(s.i,s.x,s.y),n=new Xa(t.i,t.x,t.y),i=s.next,o=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,o.next=n,n.prev=o,n}function Qc(s,t,e,n){const i=new Xa(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ks(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Xa(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function gx(s,t,e,n){let i=0;for(let o=t,r=e-n;o<e;o+=n)i+=(s[r]-s[o])*(s[o+1]+s[r+1]),r=o;return i}class Ns{static area(t){const e=t.length;let n=0;for(let i=e-1,o=0;o<e;i=o++)n+=t[i].x*t[o].y-t[o].x*t[i].y;return n*.5}static isClockWise(t){return Ns.area(t)<0}static triangulateShape(t,e){const n=[],i=[],o=[];$c(t),th(n,t);let r=t.length;e.forEach($c);for(let l=0;l<e.length;l++)i.push(r),r+=e[l].length,th(n,e[l]);const a=tx.triangulate(n,i);for(let l=0;l<a.length;l+=3)o.push(a.slice(l,l+3));return o}}function $c(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function th(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class Ws extends ae{constructor(t=new xr([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],o=[];for(let a=0,l=t.length;a<l;a++){const c=t[a];r(c)}this.setAttribute("position",new ee(i,3)),this.setAttribute("uv",new ee(o,2)),this.computeVertexNormals();function r(a){const l=[],c=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,p=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,g=e.bevelSegments!==void 0?e.bevelSegments:3;const m=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:vx;let y,M=!1,w,S,b,A;m&&(y=m.getSpacedPoints(h),M=!0,u=!1,w=m.computeFrenetFrames(h,!1),S=new z,b=new z,A=new z),u||(g=0,f=0,p=0,v=0);const _=a.extractPoints(c);let E=_.shape;const N=_.holes;if(!Ns.isClockWise(E)){E=E.reverse();for(let O=0,lt=N.length;O<lt;O++){const Z=N[O];Ns.isClockWise(Z)&&(N[O]=Z.reverse())}}const F=Ns.triangulateShape(E,N),R=E;for(let O=0,lt=N.length;O<lt;O++){const Z=N[O];E=E.concat(Z)}function L(O,lt,Z){return lt||console.error("THREE.ExtrudeGeometry: vec does not exist"),O.clone().addScaledVector(lt,Z)}const U=E.length,q=F.length;function H(O,lt,Z){let ct,tt,Tt;const vt=O.x-lt.x,P=O.y-lt.y,C=Z.x-O.x,W=Z.y-O.y,rt=vt*vt+P*P,ot=vt*W-P*C;if(Math.abs(ot)>Number.EPSILON){const st=Math.sqrt(rt),xt=Math.sqrt(C*C+W*W),mt=lt.x-P/st,St=lt.y+vt/st,Dt=Z.x-W/xt,Ft=Z.y+C/xt,at=((Dt-mt)*W-(Ft-St)*C)/(vt*W-P*C);ct=mt+vt*at-O.x,tt=St+P*at-O.y;const Yt=ct*ct+tt*tt;if(Yt<=2)return new nt(ct,tt);Tt=Math.sqrt(Yt/2)}else{let st=!1;vt>Number.EPSILON?C>Number.EPSILON&&(st=!0):vt<-Number.EPSILON?C<-Number.EPSILON&&(st=!0):Math.sign(P)===Math.sign(W)&&(st=!0),st?(ct=-P,tt=vt,Tt=Math.sqrt(rt)):(ct=vt,tt=P,Tt=Math.sqrt(rt/2))}return new nt(ct/Tt,tt/Tt)}const G=[];for(let O=0,lt=R.length,Z=lt-1,ct=O+1;O<lt;O++,Z++,ct++)Z===lt&&(Z=0),ct===lt&&(ct=0),G[O]=H(R[O],R[Z],R[ct]);const j=[];let k,V=G.concat();for(let O=0,lt=N.length;O<lt;O++){const Z=N[O];k=[];for(let ct=0,tt=Z.length,Tt=tt-1,vt=ct+1;ct<tt;ct++,Tt++,vt++)Tt===tt&&(Tt=0),vt===tt&&(vt=0),k[ct]=H(Z[ct],Z[Tt],Z[vt]);j.push(k),V=V.concat(k)}for(let O=0;O<g;O++){const lt=O/g,Z=f*Math.cos(lt*Math.PI/2),ct=p*Math.sin(lt*Math.PI/2)+v;for(let tt=0,Tt=R.length;tt<Tt;tt++){const vt=L(R[tt],G[tt],ct);it(vt.x,vt.y,-Z)}for(let tt=0,Tt=N.length;tt<Tt;tt++){const vt=N[tt];k=j[tt];for(let P=0,C=vt.length;P<C;P++){const W=L(vt[P],k[P],ct);it(W.x,W.y,-Z)}}}const Y=p+v;for(let O=0;O<U;O++){const lt=u?L(E[O],V[O],Y):E[O];M?(b.copy(w.normals[0]).multiplyScalar(lt.x),S.copy(w.binormals[0]).multiplyScalar(lt.y),A.copy(y[0]).add(b).add(S),it(A.x,A.y,A.z)):it(lt.x,lt.y,0)}for(let O=1;O<=h;O++)for(let lt=0;lt<U;lt++){const Z=u?L(E[lt],V[lt],Y):E[lt];M?(b.copy(w.normals[O]).multiplyScalar(Z.x),S.copy(w.binormals[O]).multiplyScalar(Z.y),A.copy(y[O]).add(b).add(S),it(A.x,A.y,A.z)):it(Z.x,Z.y,d/h*O)}for(let O=g-1;O>=0;O--){const lt=O/g,Z=f*Math.cos(lt*Math.PI/2),ct=p*Math.sin(lt*Math.PI/2)+v;for(let tt=0,Tt=R.length;tt<Tt;tt++){const vt=L(R[tt],G[tt],ct);it(vt.x,vt.y,d+Z)}for(let tt=0,Tt=N.length;tt<Tt;tt++){const vt=N[tt];k=j[tt];for(let P=0,C=vt.length;P<C;P++){const W=L(vt[P],k[P],ct);M?it(W.x,W.y+y[h-1].y,y[h-1].x+Z):it(W.x,W.y,d+Z)}}}et(),ht();function et(){const O=i.length/3;if(u){let lt=0,Z=U*lt;for(let ct=0;ct<q;ct++){const tt=F[ct];ft(tt[2]+Z,tt[1]+Z,tt[0]+Z)}lt=h+g*2,Z=U*lt;for(let ct=0;ct<q;ct++){const tt=F[ct];ft(tt[0]+Z,tt[1]+Z,tt[2]+Z)}}else{for(let lt=0;lt<q;lt++){const Z=F[lt];ft(Z[2],Z[1],Z[0])}for(let lt=0;lt<q;lt++){const Z=F[lt];ft(Z[0]+U*h,Z[1]+U*h,Z[2]+U*h)}}n.addGroup(O,i.length/3-O,0)}function ht(){const O=i.length/3;let lt=0;ut(R,lt),lt+=R.length;for(let Z=0,ct=N.length;Z<ct;Z++){const tt=N[Z];ut(tt,lt),lt+=tt.length}n.addGroup(O,i.length/3-O,1)}function ut(O,lt){let Z=O.length;for(;--Z>=0;){const ct=Z;let tt=Z-1;tt<0&&(tt=O.length-1);for(let Tt=0,vt=h+g*2;Tt<vt;Tt++){const P=U*Tt,C=U*(Tt+1),W=lt+ct+P,rt=lt+tt+P,ot=lt+tt+C,st=lt+ct+C;pt(W,rt,ot,st)}}}function it(O,lt,Z){l.push(O),l.push(lt),l.push(Z)}function ft(O,lt,Z){dt(O),dt(lt),dt(Z);const ct=i.length/3,tt=x.generateTopUV(n,i,ct-3,ct-2,ct-1);Mt(tt[0]),Mt(tt[1]),Mt(tt[2])}function pt(O,lt,Z,ct){dt(O),dt(lt),dt(ct),dt(lt),dt(Z),dt(ct);const tt=i.length/3,Tt=x.generateSideWallUV(n,i,tt-6,tt-3,tt-2,tt-1);Mt(Tt[0]),Mt(Tt[1]),Mt(Tt[3]),Mt(Tt[1]),Mt(Tt[2]),Mt(Tt[3])}function dt(O){i.push(l[O*3+0]),i.push(l[O*3+1]),i.push(l[O*3+2])}function Mt(O){o.push(O.x),o.push(O.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return xx(e,n,t)}static fromJSON(t,e){const n=[];for(let o=0,r=t.shapes.length;o<r;o++){const a=e[t.shapes[o]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Wa[i.type]().fromJSON(i)),new Ws(n,t.options)}}const vx={generateTopUV:function(s,t,e,n,i){const o=t[e*3],r=t[e*3+1],a=t[n*3],l=t[n*3+1],c=t[i*3],h=t[i*3+1];return[new nt(o,r),new nt(a,l),new nt(c,h)]},generateSideWallUV:function(s,t,e,n,i,o){const r=t[e*3],a=t[e*3+1],l=t[e*3+2],c=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],p=t[i*3+2],v=t[o*3],g=t[o*3+1],m=t[o*3+2];return Math.abs(a-h)<Math.abs(r-c)?[new nt(r,1-l),new nt(c,1-d),new nt(u,1-p),new nt(v,1-m)]:[new nt(a,1-l),new nt(h,1-d),new nt(f,1-p),new nt(g,1-m)]}};function xx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const o=s[n];e.shapes.push(o.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ul extends hl{constructor(t=1,e=0){const n=(1+Math.sqrt(5))/2,i=[-1,n,0,1,n,0,-1,-n,0,1,-n,0,0,-1,n,0,1,n,0,-1,-n,0,1,-n,n,0,-1,n,0,1,-n,0,-1,-n,0,1],o=[0,11,5,0,5,1,0,1,7,0,7,10,0,10,11,1,5,9,5,11,4,11,10,2,10,7,6,7,1,8,3,9,4,3,4,2,3,2,6,3,6,8,3,8,9,4,9,5,2,4,11,6,2,10,8,6,7,9,8,1];super(i,o,t,e),this.type="IcosahedronGeometry",this.parameters={radius:t,detail:e}}static fromJSON(t){return new ul(t.radius,t.detail)}}class ur extends ae{constructor(t=1,e=32,n=16,i=0,o=Math.PI*2,r=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:o,thetaStart:r,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const l=Math.min(r+a,Math.PI);let c=0;const h=[],d=new z,u=new z,f=[],p=[],v=[],g=[];for(let m=0;m<=n;m++){const x=[],y=m/n;let M=0;m===0&&r===0?M=.5/e:m===n&&l===Math.PI&&(M=-.5/e);for(let w=0;w<=e;w++){const S=w/e;d.x=-t*Math.cos(i+S*o)*Math.sin(r+y*a),d.y=t*Math.cos(r+y*a),d.z=t*Math.sin(i+S*o)*Math.sin(r+y*a),p.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),g.push(S+M,1-y),x.push(c++)}h.push(x)}for(let m=0;m<n;m++)for(let x=0;x<e;x++){const y=h[m][x+1],M=h[m][x],w=h[m+1][x],S=h[m+1][x+1];(m!==0||r>0)&&f.push(y,M,S),(m!==n-1||l<Math.PI)&&f.push(M,w,S)}this.setIndex(f),this.setAttribute("position",new ee(p,3)),this.setAttribute("normal",new ee(v,3)),this.setAttribute("uv",new ee(g,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ur(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class ls extends ae{constructor(t=1,e=.4,n=12,i=48,o=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:o},n=Math.floor(n),i=Math.floor(i);const r=[],a=[],l=[],c=[],h=new z,d=new z,u=new z;for(let f=0;f<=n;f++)for(let p=0;p<=i;p++){const v=p/i*o,g=f/n*Math.PI*2;d.x=(t+e*Math.cos(g))*Math.cos(v),d.y=(t+e*Math.cos(g))*Math.sin(v),d.z=e*Math.sin(g),a.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),l.push(u.x,u.y,u.z),c.push(p/i),c.push(f/n)}for(let f=1;f<=n;f++)for(let p=1;p<=i;p++){const v=(i+1)*f+p-1,g=(i+1)*(f-1)+p-1,m=(i+1)*(f-1)+p,x=(i+1)*f+p;r.push(v,g,x),r.push(g,m,x)}this.setIndex(r),this.setAttribute("position",new ee(a,3)),this.setAttribute("normal",new ee(l,3)),this.setAttribute("uv",new ee(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ls(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class yx extends ve{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class It extends rs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Nt(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Nt(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class un extends It{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Te(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Nt(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Nt(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Nt(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class Mx extends rs{constructor(t){super(),this.isMeshNormalMaterial=!0,this.type="MeshNormalMaterial",this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=tl,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.flatShading=!1,this.setValues(t)}copy(t){return super.copy(t),this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.flatShading=t.flatShading,this}}class Wu extends Be{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Nt(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class _x extends Wu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Nt(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ra=new $t,eh=new z,nh=new z;class Sx{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new $t,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new il,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new Fe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;eh.setFromMatrixPosition(t.matrixWorld),e.position.copy(eh),nh.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(nh),e.updateMatrixWorld(),ra.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ra),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ra)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class wx extends Sx{constructor(){super(new sl(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class ih extends Wu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Be.DEFAULT_UP),this.updateMatrix(),this.target=new Be,this.shadow=new wx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class bx{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=sh(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=sh();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function sh(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:Ja}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=Ja);class Mr extends Q{constructor(){const t=Mr.SkyShader,e=new ve({name:t.name,uniforms:Qe.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:je,depthWrite:!1});super(new Rt(1,1,1),e),this.isSky=!0}}Mr.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new z},up:{value:new z(0,1,0)}},vertexShader:`
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

		}`};const Us={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class ni{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const Ex=new sl(-1,1,1,-1,0,1);class Tx extends ae{constructor(){super(),this.setAttribute("position",new ee([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ee([0,2,0,0,2,0],2))}}const Ax=new Tx;class Vs{constructor(t){this._mesh=new Q(Ax,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,Ex)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class Vu extends ni{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof ve?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Qe.clone(t.uniforms),this.material=new ve({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Vs(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class oh extends ni{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),o=t.state;o.buffers.color.setMask(!1),o.buffers.depth.setMask(!1),o.buffers.color.setLocked(!0),o.buffers.depth.setLocked(!0);let r,a;this.inverse?(r=0,a=1):(r=1,a=0),o.buffers.stencil.setTest(!0),o.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),o.buffers.stencil.setFunc(i.ALWAYS,r,4294967295),o.buffers.stencil.setClear(a),o.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),o.buffers.color.setLocked(!1),o.buffers.depth.setLocked(!1),o.buffers.color.setMask(!0),o.buffers.depth.setMask(!0),o.buffers.stencil.setLocked(!1),o.buffers.stencil.setFunc(i.EQUAL,1,4294967295),o.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),o.buffers.stencil.setLocked(!0)}}class Cx extends ni{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class Rx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new nt);this._width=n.width,this._height=n.height,e=new Ze(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:sn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new Vu(Us),this.copyPass.material.blending=Oe,this.clock=new bx}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,o=this.passes.length;i<o;i++){const r=this.passes[i];if(r.enabled!==!1){if(r.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),r.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),r.needsSwap){if(n){const a=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),l.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}oh!==void 0&&(r instanceof oh?n=!0:r instanceof Cx&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new nt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let o=0;o<this.passes.length;o++)this.passes[o].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class Px extends ni{constructor(t,e,n=null,i=null,o=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=o,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Nt}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let o,r;this.overrideMaterial!==null&&(r=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(o=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(o),this.overrideMaterial!==null&&(this.scene.overrideMaterial=r),t.autoClear=i}}const So={defines:{PERSPECTIVE_CAMERA:1,SAMPLES:16,NORMAL_VECTOR_TYPE:1,DEPTH_SWIZZLING:"x",SCREEN_SPACE_RADIUS:0,SCREEN_SPACE_RADIUS_SCALE:100,SCENE_CLIP_BOX:0},uniforms:{tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new nt},cameraNear:{value:null},cameraFar:{value:null},cameraProjectionMatrix:{value:new $t},cameraProjectionMatrixInverse:{value:new $t},cameraWorldMatrix:{value:new $t},radius:{value:.25},distanceExponent:{value:1},thickness:{value:1},distanceFallOff:{value:1},scale:{value:1},sceneBoxMin:{value:new z(-1,-1,-1)},sceneBoxMax:{value:new z(1,1,1)}},vertexShader:`

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
		}`},wo={defines:{PERSPECTIVE_CAMERA:1},uniforms:{tDepth:{value:null},cameraNear:{value:null},cameraFar:{value:null}},vertexShader:`
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

		}`},aa={uniforms:{tDiffuse:{value:null},intensity:{value:1}},vertexShader:`
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
		}`};function Lx(s=5){const t=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),e=Ix(t),n=e.length,i=new Uint8Array(n*4);for(let r=0;r<n;++r){const a=e[r],l=2*Math.PI*a/n,c=new z(Math.cos(l),Math.sin(l),0).normalize();i[r*4]=(c.x*.5+.5)*255,i[r*4+1]=(c.y*.5+.5)*255,i[r*4+2]=127,i[r*4+3]=255}const o=new Uu(i,t,t);return o.wrapS=ye,o.wrapT=ye,o.needsUpdate=!0,o}function Ix(s){const t=Math.floor(s)%2===0?Math.floor(s)+1:Math.floor(s),e=t*t,n=Array(e).fill(0);let i=Math.floor(t/2),o=t-1;for(let r=1;r<=e;){if(i===-1&&o===t?(o=t-2,i=0):(o===t&&(o=0),i<0&&(i=t-1)),n[i*t+o]!==0){o-=2,i++;continue}else n[i*t+o]=r++;o++,i--}return n}const bo={defines:{SAMPLES:16,SAMPLE_VECTORS:Xu(16,2,1),NORMAL_VECTOR_TYPE:1,DEPTH_VALUE_SOURCE:0},uniforms:{tDiffuse:{value:null},tNormal:{value:null},tDepth:{value:null},tNoise:{value:null},resolution:{value:new nt},cameraProjectionMatrixInverse:{value:new $t},lumaPhi:{value:5},depthPhi:{value:5},normalPhi:{value:5},radius:{value:4},index:{value:0}},vertexShader:`

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
		}`};function Xu(s,t,e){const n=Dx(s,t,e);let i="vec3[SAMPLES](";for(let o=0;o<s;o++){const r=n[o];i+=`vec3(${r.x}, ${r.y}, ${r.z})${o<s-1?",":")"}`}return i}function Dx(s,t,e){const n=[];for(let i=0;i<s;i++){const o=2*Math.PI*t*i/s,r=Math.pow(i/(s-1),e);n.push(new z(Math.cos(o),Math.sin(o),r))}return n}class Nx{constructor(t=Math){this.grad3=[[1,1,0],[-1,1,0],[1,-1,0],[-1,-1,0],[1,0,1],[-1,0,1],[1,0,-1],[-1,0,-1],[0,1,1],[0,-1,1],[0,1,-1],[0,-1,-1]],this.grad4=[[0,1,1,1],[0,1,1,-1],[0,1,-1,1],[0,1,-1,-1],[0,-1,1,1],[0,-1,1,-1],[0,-1,-1,1],[0,-1,-1,-1],[1,0,1,1],[1,0,1,-1],[1,0,-1,1],[1,0,-1,-1],[-1,0,1,1],[-1,0,1,-1],[-1,0,-1,1],[-1,0,-1,-1],[1,1,0,1],[1,1,0,-1],[1,-1,0,1],[1,-1,0,-1],[-1,1,0,1],[-1,1,0,-1],[-1,-1,0,1],[-1,-1,0,-1],[1,1,1,0],[1,1,-1,0],[1,-1,1,0],[1,-1,-1,0],[-1,1,1,0],[-1,1,-1,0],[-1,-1,1,0],[-1,-1,-1,0]],this.p=[];for(let e=0;e<256;e++)this.p[e]=Math.floor(t.random()*256);this.perm=[];for(let e=0;e<512;e++)this.perm[e]=this.p[e&255];this.simplex=[[0,1,2,3],[0,1,3,2],[0,0,0,0],[0,2,3,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,3,0],[0,2,1,3],[0,0,0,0],[0,3,1,2],[0,3,2,1],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,3,2,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[1,2,0,3],[0,0,0,0],[1,3,0,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,3,0,1],[2,3,1,0],[1,0,2,3],[1,0,3,2],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,3,1],[0,0,0,0],[2,1,3,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0],[2,0,1,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,0,1,2],[3,0,2,1],[0,0,0,0],[3,1,2,0],[2,1,0,3],[0,0,0,0],[0,0,0,0],[0,0,0,0],[3,1,0,2],[0,0,0,0],[3,2,0,1],[3,2,1,0]]}dot(t,e,n){return t[0]*e+t[1]*n}dot3(t,e,n,i){return t[0]*e+t[1]*n+t[2]*i}dot4(t,e,n,i,o){return t[0]*e+t[1]*n+t[2]*i+t[3]*o}noise(t,e){let n,i,o;const r=.5*(Math.sqrt(3)-1),a=(t+e)*r,l=Math.floor(t+a),c=Math.floor(e+a),h=(3-Math.sqrt(3))/6,d=(l+c)*h,u=l-d,f=c-d,p=t-u,v=e-f;let g,m;p>v?(g=1,m=0):(g=0,m=1);const x=p-g+h,y=v-m+h,M=p-1+2*h,w=v-1+2*h,S=l&255,b=c&255,A=this.perm[S+this.perm[b]]%12,_=this.perm[S+g+this.perm[b+m]]%12,E=this.perm[S+1+this.perm[b+1]]%12;let N=.5-p*p-v*v;N<0?n=0:(N*=N,n=N*N*this.dot(this.grad3[A],p,v));let D=.5-x*x-y*y;D<0?i=0:(D*=D,i=D*D*this.dot(this.grad3[_],x,y));let F=.5-M*M-w*w;return F<0?o=0:(F*=F,o=F*F*this.dot(this.grad3[E],M,w)),70*(n+i+o)}noise3d(t,e,n){let i,o,r,a;const c=(t+e+n)*.3333333333333333,h=Math.floor(t+c),d=Math.floor(e+c),u=Math.floor(n+c),f=1/6,p=(h+d+u)*f,v=h-p,g=d-p,m=u-p,x=t-v,y=e-g,M=n-m;let w,S,b,A,_,E;x>=y?y>=M?(w=1,S=0,b=0,A=1,_=1,E=0):x>=M?(w=1,S=0,b=0,A=1,_=0,E=1):(w=0,S=0,b=1,A=1,_=0,E=1):y<M?(w=0,S=0,b=1,A=0,_=1,E=1):x<M?(w=0,S=1,b=0,A=0,_=1,E=1):(w=0,S=1,b=0,A=1,_=1,E=0);const N=x-w+f,D=y-S+f,F=M-b+f,R=x-A+2*f,L=y-_+2*f,U=M-E+2*f,q=x-1+3*f,H=y-1+3*f,G=M-1+3*f,j=h&255,k=d&255,V=u&255,Y=this.perm[j+this.perm[k+this.perm[V]]]%12,et=this.perm[j+w+this.perm[k+S+this.perm[V+b]]]%12,ht=this.perm[j+A+this.perm[k+_+this.perm[V+E]]]%12,ut=this.perm[j+1+this.perm[k+1+this.perm[V+1]]]%12;let it=.6-x*x-y*y-M*M;it<0?i=0:(it*=it,i=it*it*this.dot3(this.grad3[Y],x,y,M));let ft=.6-N*N-D*D-F*F;ft<0?o=0:(ft*=ft,o=ft*ft*this.dot3(this.grad3[et],N,D,F));let pt=.6-R*R-L*L-U*U;pt<0?r=0:(pt*=pt,r=pt*pt*this.dot3(this.grad3[ht],R,L,U));let dt=.6-q*q-H*H-G*G;return dt<0?a=0:(dt*=dt,a=dt*dt*this.dot3(this.grad3[ut],q,H,G)),32*(i+o+r+a)}noise4d(t,e,n,i){const o=this.grad4,r=this.simplex,a=this.perm,l=(Math.sqrt(5)-1)/4,c=(5-Math.sqrt(5))/20;let h,d,u,f,p;const v=(t+e+n+i)*l,g=Math.floor(t+v),m=Math.floor(e+v),x=Math.floor(n+v),y=Math.floor(i+v),M=(g+m+x+y)*c,w=g-M,S=m-M,b=x-M,A=y-M,_=t-w,E=e-S,N=n-b,D=i-A,F=_>E?32:0,R=_>N?16:0,L=E>N?8:0,U=_>D?4:0,q=E>D?2:0,H=N>D?1:0,G=F+R+L+U+q+H,j=r[G][0]>=3?1:0,k=r[G][1]>=3?1:0,V=r[G][2]>=3?1:0,Y=r[G][3]>=3?1:0,et=r[G][0]>=2?1:0,ht=r[G][1]>=2?1:0,ut=r[G][2]>=2?1:0,it=r[G][3]>=2?1:0,ft=r[G][0]>=1?1:0,pt=r[G][1]>=1?1:0,dt=r[G][2]>=1?1:0,Mt=r[G][3]>=1?1:0,O=_-j+c,lt=E-k+c,Z=N-V+c,ct=D-Y+c,tt=_-et+2*c,Tt=E-ht+2*c,vt=N-ut+2*c,P=D-it+2*c,C=_-ft+3*c,W=E-pt+3*c,rt=N-dt+3*c,ot=D-Mt+3*c,st=_-1+4*c,xt=E-1+4*c,mt=N-1+4*c,St=D-1+4*c,Dt=g&255,Ft=m&255,at=x&255,Yt=y&255,Xt=a[Dt+a[Ft+a[at+a[Yt]]]]%32,Bt=a[Dt+j+a[Ft+k+a[at+V+a[Yt+Y]]]]%32,_t=a[Dt+et+a[Ft+ht+a[at+ut+a[Yt+it]]]]%32,Et=a[Dt+ft+a[Ft+pt+a[at+dt+a[Yt+Mt]]]]%32,Ht=a[Dt+1+a[Ft+1+a[at+1+a[Yt+1]]]]%32;let te=.6-_*_-E*E-N*N-D*D;te<0?h=0:(te*=te,h=te*te*this.dot4(o[Xt],_,E,N,D));let oe=.6-O*O-lt*lt-Z*Z-ct*ct;oe<0?d=0:(oe*=oe,d=oe*oe*this.dot4(o[Bt],O,lt,Z,ct));let Wt=.6-tt*tt-Tt*Tt-vt*vt-P*P;Wt<0?u=0:(Wt*=Wt,u=Wt*Wt*this.dot4(o[_t],tt,Tt,vt,P));let gt=.6-C*C-W*W-rt*rt-ot*ot;gt<0?f=0:(gt*=gt,f=gt*gt*this.dot4(o[Et],C,W,rt,ot));let B=.6-st*st-xt*xt-mt*mt-St*St;return B<0?p=0:(B*=B,p=B*B*this.dot4(o[Ht],st,xt,mt,St)),27*(h+d+u+f+p)}}class En extends ni{constructor(t,e,n,i,o,r,a){super(),this.width=n!==void 0?n:512,this.height=i!==void 0?i:512,this.clear=!0,this.camera=e,this.scene=t,this.output=0,this._renderGBuffer=!0,this._visibilityCache=new Map,this.blendIntensity=1,this.pdRings=2,this.pdRadiusExponent=2,this.pdSamples=16,this.gtaoNoiseTexture=Lx(),this.pdNoiseTexture=this.generateNoise(),this.gtaoRenderTarget=new Ze(this.width,this.height,{type:sn}),this.pdRenderTarget=this.gtaoRenderTarget.clone(),this.gtaoMaterial=new ve({defines:Object.assign({},So.defines),uniforms:Qe.clone(So.uniforms),vertexShader:So.vertexShader,fragmentShader:So.fragmentShader,blending:Oe,depthTest:!1,depthWrite:!1}),this.gtaoMaterial.definesPERSPECTIVE_CAMERA=this.camera.isPerspectiveCamera?1:0,this.gtaoMaterial.uniforms.tNoise.value=this.gtaoNoiseTexture,this.gtaoMaterial.uniforms.resolution.value.set(this.width,this.height),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.normalMaterial=new Mx,this.normalMaterial.blending=Oe,this.pdMaterial=new ve({defines:Object.assign({},bo.defines),uniforms:Qe.clone(bo.uniforms),vertexShader:bo.vertexShader,fragmentShader:bo.fragmentShader,depthTest:!1,depthWrite:!1}),this.pdMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.pdMaterial.uniforms.tNoise.value=this.pdNoiseTexture,this.pdMaterial.uniforms.resolution.value.set(this.width,this.height),this.pdMaterial.uniforms.lumaPhi.value=10,this.pdMaterial.uniforms.depthPhi.value=2,this.pdMaterial.uniforms.normalPhi.value=3,this.pdMaterial.uniforms.radius.value=8,this.depthRenderMaterial=new ve({defines:Object.assign({},wo.defines),uniforms:Qe.clone(wo.uniforms),vertexShader:wo.vertexShader,fragmentShader:wo.fragmentShader,blending:Oe}),this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.copyMaterial=new ve({uniforms:Qe.clone(Us.uniforms),vertexShader:Us.vertexShader,fragmentShader:Us.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blendSrc:Ua,blendDst:As,blendEquation:vn,blendSrcAlpha:Na,blendDstAlpha:As,blendEquationAlpha:vn}),this.blendMaterial=new ve({uniforms:Qe.clone(aa.uniforms),vertexShader:aa.vertexShader,fragmentShader:aa.fragmentShader,transparent:!0,depthTest:!1,depthWrite:!1,blending:eu,blendSrc:Ua,blendDst:As,blendEquation:vn,blendSrcAlpha:Na,blendDstAlpha:As,blendEquationAlpha:vn}),this.fsQuad=new Vs(null),this.originalClearColor=new Nt,this.setGBuffer(o?o.depthTexture:void 0,o?o.normalTexture:void 0),r!==void 0&&this.updateGtaoMaterial(r),a!==void 0&&this.updatePdMaterial(a)}dispose(){this.gtaoNoiseTexture.dispose(),this.pdNoiseTexture.dispose(),this.normalRenderTarget.dispose(),this.gtaoRenderTarget.dispose(),this.pdRenderTarget.dispose(),this.normalMaterial.dispose(),this.pdMaterial.dispose(),this.copyMaterial.dispose(),this.depthRenderMaterial.dispose(),this.fsQuad.dispose()}setGBuffer(t,e){t!==void 0?(this.depthTexture=t,this.normalTexture=e,this._renderGBuffer=!1):(this.depthTexture=new rl,this.depthTexture.format=yi,this.depthTexture.type=ti,this.normalRenderTarget=new Ze(this.width,this.height,{minFilter:Se,magFilter:Se,type:sn,depthTexture:this.depthTexture}),this.normalTexture=this.normalRenderTarget.texture,this._renderGBuffer=!0);const n=this.normalTexture?1:0,i=this.depthTexture===this.normalTexture?"w":"x";this.gtaoMaterial.defines.NORMAL_VECTOR_TYPE=n,this.gtaoMaterial.defines.DEPTH_SWIZZLING=i,this.gtaoMaterial.uniforms.tNormal.value=this.normalTexture,this.gtaoMaterial.uniforms.tDepth.value=this.depthTexture,this.pdMaterial.defines.NORMAL_VECTOR_TYPE=n,this.pdMaterial.defines.DEPTH_SWIZZLING=i,this.pdMaterial.uniforms.tNormal.value=this.normalTexture,this.pdMaterial.uniforms.tDepth.value=this.depthTexture,this.depthRenderMaterial.uniforms.tDepth.value=this.normalRenderTarget.depthTexture}setSceneClipBox(t){t?(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX!==1,this.gtaoMaterial.defines.SCENE_CLIP_BOX=1,this.gtaoMaterial.uniforms.sceneBoxMin.value.copy(t.min),this.gtaoMaterial.uniforms.sceneBoxMax.value.copy(t.max)):(this.gtaoMaterial.needsUpdate=this.gtaoMaterial.defines.SCENE_CLIP_BOX===0,this.gtaoMaterial.defines.SCENE_CLIP_BOX=0)}updateGtaoMaterial(t){t.radius!==void 0&&(this.gtaoMaterial.uniforms.radius.value=t.radius),t.distanceExponent!==void 0&&(this.gtaoMaterial.uniforms.distanceExponent.value=t.distanceExponent),t.thickness!==void 0&&(this.gtaoMaterial.uniforms.thickness.value=t.thickness),t.distanceFallOff!==void 0&&(this.gtaoMaterial.uniforms.distanceFallOff.value=t.distanceFallOff,this.gtaoMaterial.needsUpdate=!0),t.scale!==void 0&&(this.gtaoMaterial.uniforms.scale.value=t.scale),t.samples!==void 0&&t.samples!==this.gtaoMaterial.defines.SAMPLES&&(this.gtaoMaterial.defines.SAMPLES=t.samples,this.gtaoMaterial.needsUpdate=!0),t.screenSpaceRadius!==void 0&&(t.screenSpaceRadius?1:0)!==this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS&&(this.gtaoMaterial.defines.SCREEN_SPACE_RADIUS=t.screenSpaceRadius?1:0,this.gtaoMaterial.needsUpdate=!0)}updatePdMaterial(t){let e=!1;t.lumaPhi!==void 0&&(this.pdMaterial.uniforms.lumaPhi.value=t.lumaPhi),t.depthPhi!==void 0&&(this.pdMaterial.uniforms.depthPhi.value=t.depthPhi),t.normalPhi!==void 0&&(this.pdMaterial.uniforms.normalPhi.value=t.normalPhi),t.radius!==void 0&&t.radius!==this.radius&&(this.pdMaterial.uniforms.radius.value=t.radius),t.radiusExponent!==void 0&&t.radiusExponent!==this.pdRadiusExponent&&(this.pdRadiusExponent=t.radiusExponent,e=!0),t.rings!==void 0&&t.rings!==this.pdRings&&(this.pdRings=t.rings,e=!0),t.samples!==void 0&&t.samples!==this.pdSamples&&(this.pdSamples=t.samples,e=!0),e&&(this.pdMaterial.defines.SAMPLES=this.pdSamples,this.pdMaterial.defines.SAMPLE_VECTORS=Xu(this.pdSamples,this.pdRings,this.pdRadiusExponent),this.pdMaterial.needsUpdate=!0)}render(t,e,n){switch(this._renderGBuffer&&(this.overrideVisibility(),this.renderOverride(t,this.normalMaterial,this.normalRenderTarget,7829503,1),this.restoreVisibility()),this.gtaoMaterial.uniforms.cameraNear.value=this.camera.near,this.gtaoMaterial.uniforms.cameraFar.value=this.camera.far,this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.gtaoMaterial.uniforms.cameraWorldMatrix.value.copy(this.camera.matrixWorld),this.renderPass(t,this.gtaoMaterial,this.gtaoRenderTarget,16777215,1),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.renderPass(t,this.pdMaterial,this.pdRenderTarget,16777215,1),this.output){case En.OUTPUT.Diffuse:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case En.OUTPUT.AO:this.copyMaterial.uniforms.tDiffuse.value=this.gtaoRenderTarget.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case En.OUTPUT.Denoise:this.copyMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case En.OUTPUT.Depth:this.depthRenderMaterial.uniforms.cameraNear.value=this.camera.near,this.depthRenderMaterial.uniforms.cameraFar.value=this.camera.far,this.renderPass(t,this.depthRenderMaterial,this.renderToScreen?null:e);break;case En.OUTPUT.Normal:this.copyMaterial.uniforms.tDiffuse.value=this.normalRenderTarget.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e);break;case En.OUTPUT.Default:this.copyMaterial.uniforms.tDiffuse.value=n.texture,this.copyMaterial.blending=Oe,this.renderPass(t,this.copyMaterial,this.renderToScreen?null:e),this.blendMaterial.uniforms.intensity.value=this.blendIntensity,this.blendMaterial.uniforms.tDiffuse.value=this.pdRenderTarget.texture,this.renderPass(t,this.blendMaterial,this.renderToScreen?null:e);break;default:console.warn("THREE.GTAOPass: Unknown output type.")}}renderPass(t,e,n,i,o){t.getClearColor(this.originalClearColor);const r=t.getClearAlpha(),a=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,i!=null&&(t.setClearColor(i),t.setClearAlpha(o||0),t.clear()),this.fsQuad.material=e,this.fsQuad.render(t),t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(r)}renderOverride(t,e,n,i,o){t.getClearColor(this.originalClearColor);const r=t.getClearAlpha(),a=t.autoClear;t.setRenderTarget(n),t.autoClear=!1,i=e.clearColor||i,o=e.clearAlpha||o,i!=null&&(t.setClearColor(i),t.setClearAlpha(o||0),t.clear()),this.scene.overrideMaterial=e,t.render(this.scene,this.camera),this.scene.overrideMaterial=null,t.autoClear=a,t.setClearColor(this.originalClearColor),t.setClearAlpha(r)}setSize(t,e){this.width=t,this.height=e,this.gtaoRenderTarget.setSize(t,e),this.normalRenderTarget.setSize(t,e),this.pdRenderTarget.setSize(t,e),this.gtaoMaterial.uniforms.resolution.value.set(t,e),this.gtaoMaterial.uniforms.cameraProjectionMatrix.value.copy(this.camera.projectionMatrix),this.gtaoMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse),this.pdMaterial.uniforms.resolution.value.set(t,e),this.pdMaterial.uniforms.cameraProjectionMatrixInverse.value.copy(this.camera.projectionMatrixInverse)}overrideVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(n){e.set(n,n.visible),(n.isPoints||n.isLine)&&(n.visible=!1)})}restoreVisibility(){const t=this.scene,e=this._visibilityCache;t.traverse(function(n){const i=e.get(n);n.visible=i}),e.clear()}generateNoise(t=64){const e=new Nx,n=t*t*4,i=new Uint8Array(n);for(let r=0;r<t;r++)for(let a=0;a<t;a++){const l=r,c=a;i[(r*t+a)*4]=(e.noise(l,c)*.5+.5)*255,i[(r*t+a)*4+1]=(e.noise(l+t,c)*.5+.5)*255,i[(r*t+a)*4+2]=(e.noise(l,c+t)*.5+.5)*255,i[(r*t+a)*4+3]=(e.noise(l+t,c+t)*.5+.5)*255}const o=new Uu(i,t,t,cn,Bn);return o.wrapS=ye,o.wrapT=ye,o.needsUpdate=!0,o}}En.OUTPUT={Default:0,Diffuse:1,Depth:2,Normal:3,AO:4,Denoise:5};const Ux={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Nt(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class ss extends ni{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new nt(t.x,t.y):new nt(256,256),this.clearColor=new Nt(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);this.renderTargetBright=new Ze(o,r,{type:sn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new Ze(o,r,{type:sn});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new Ze(o,r,{type:sn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),o=Math.round(o/2),r=Math.round(r/2)}const a=Ux;this.highPassUniforms=Qe.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new ve({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];o=Math.round(this.resolution.x/2),r=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(l[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new nt(1/o,1/r),o=Math.round(o/2),r=Math.round(r/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const c=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=c,this.bloomTintColors=[new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1),new z(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Us;this.copyUniforms=Qe.clone(h.uniforms),this.blendMaterial=new ve({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Pa,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Nt,this.oldClearAlpha=1,this.basic=new bi,this.fsQuad=new Vs(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let o=0;o<this.nMips;o++)this.renderTargetsHorizontal[o].setSize(n,i),this.renderTargetsVertical[o].setSize(n,i),this.separableBlurMaterials[o].uniforms.invSize.value=new nt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,o){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const r=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),o&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this.fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[l].uniforms.direction.value=ss.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[l]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=ss.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[l]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[l];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=r}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new ve({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new nt(.5,.5)},direction:{value:new nt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new ve({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}ss.BlurDirectionX=new nt(1,0);ss.BlurDirectionY=new nt(0,1);const Eo={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`},To={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`},la={uniforms:{tDiffuse:{value:null},tColor:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`};class Fx extends ni{constructor(t,e){super(),this.edgesRT=new Ze(t,e,{depthBuffer:!1,type:sn}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new Ze(t,e,{depthBuffer:!1,type:sn}),this.weightsRT.texture.name="SMAAPass.weights";const n=this,i=new Image;i.src=this.getAreaTexture(),i.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new ze,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=i,this.areaTexture.minFilter=Je,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const o=new Image;o.src=this.getSearchTexture(),o.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new ze,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=o,this.searchTexture.magFilter=Se,this.searchTexture.minFilter=Se,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=Qe.clone(Eo.uniforms),this.uniformsEdges.resolution.value.set(1/t,1/e),this.materialEdges=new ve({defines:Object.assign({},Eo.defines),uniforms:this.uniformsEdges,vertexShader:Eo.vertexShader,fragmentShader:Eo.fragmentShader}),this.uniformsWeights=Qe.clone(To.uniforms),this.uniformsWeights.resolution.value.set(1/t,1/e),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new ve({defines:Object.assign({},To.defines),uniforms:this.uniformsWeights,vertexShader:To.vertexShader,fragmentShader:To.fragmentShader}),this.uniformsBlend=Qe.clone(la.uniforms),this.uniformsBlend.resolution.value.set(1/t,1/e),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new ve({uniforms:this.uniformsBlend,vertexShader:la.vertexShader,fragmentShader:la.fragmentShader}),this.fsQuad=new Vs(null)}render(t,e,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,t.setRenderTarget(this.edgesRT),this.clear&&t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialWeights,t.setRenderTarget(this.weightsRT),this.clear&&t.clear(),this.fsQuad.render(t),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(),this.fsQuad.render(t))}setSize(t,e){this.edgesRT.setSize(t,e),this.weightsRT.setSize(t,e),this.materialEdges.uniforms.resolution.value.set(1/t,1/e),this.materialWeights.uniforms.resolution.value.set(1/t,1/e),this.materialBlend.uniforms.resolution.value.set(1/t,1/e)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const Ox={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class zx extends ni{constructor(){super();const t=Ox;this.uniforms=Qe.clone(t.uniforms),this.material=new yx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Vs(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},se.getTransfer(this._outputColorSpace)===ue&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===iu?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===su?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===ou?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Qa?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===ru&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function Bx(s){const t=new Nu({canvas:s,antialias:!0,powerPreference:"high-performance",stencil:!1});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(window.innerWidth,window.innerHeight),t.outputColorSpace=Qt,t.toneMapping=Qa,t.toneMappingExposure=1.08,t.shadowMap.enabled=!0,t.shadowMap.type=tu;const e=new kv,n=new nn(62,window.innerWidth/window.innerHeight,.6,3e3),i=new Mr;i.scale.setScalar(8e3),e.add(i);const o=new z,r=i.material.uniforms;r.turbidity.value=4.5,r.rayleigh.value=2.2,r.mieCoefficient.value=.006,r.mieDirectionalG.value=.8;const a=We.degToRad(11),l=We.degToRad(128);o.setFromSphericalCoords(1,Math.PI/2-a,l),r.sunPosition.value.copy(o);const c=new ih(16766368,3.4);c.position.copy(o).multiplyScalar(800),c.castShadow=!0,c.shadow.mapSize.set(4096,4096),c.shadow.camera.near=50,c.shadow.camera.far=1600;const h=90;c.shadow.camera.left=-h,c.shadow.camera.right=h,c.shadow.camera.top=h,c.shadow.camera.bottom=-h,c.shadow.bias=-1e-4,c.shadow.normalBias=.04,c.shadow.radius=3,e.add(c),e.add(c.target);const d=o.clone().normalize(),u=2*h/4096;function f(_){const E=Math.round(_.x/u)*u,N=Math.round(_.z/u)*u;c.target.position.set(E,0,N),c.position.set(E+d.x*800,d.y*800,N+d.z*800)}const p=new _x(9615584,4076832,.6);e.add(p);const v=new ih(9221332,.28);v.position.set(-o.x*300,200,-o.z*300),e.add(v);const g=new Ga(t);g.compileCubemapShader();const m=g.fromScene(e,.04).texture;e.environment=m,g.dispose(),e.fog=new vr(13155238,900,4200);const x=new Rx(t);x.setPixelRatio(Math.min(window.devicePixelRatio,2)),x.setSize(window.innerWidth,window.innerHeight);const y=new Px(e,n);x.addPass(y);const M=.5,w=new En(e,n,Math.round(window.innerWidth*M),Math.round(window.innerHeight*M));w.output=En.OUTPUT.Default,w.blendIntensity=.9,w.updateGtaoMaterial({radius:.6,distanceExponent:1,thickness:1,scale:1,samples:16}),x.addPass(w);const S=new ss(new nt(window.innerWidth,window.innerHeight),.22,.65,.91);x.addPass(S);const b=new Vu(kx);x.addPass(b);const A=new Fx(window.innerWidth*t.getPixelRatio(),window.innerHeight*t.getPixelRatio());return x.addPass(A),x.addPass(new zx),window.addEventListener("resize",()=>{const _=window.innerWidth,E=window.innerHeight;t.setSize(_,E),x.setSize(_,E),w.setSize(Math.round(_*M),Math.round(E*M)),n.aspect=_/E,n.updateProjectionMatrix(),S.resolution.set(_,E)}),{renderer:t,scene:e,camera:n,composer:x,sun:c,updateShadowTarget:f}}const kx={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:1},uCA:{value:9e-4},uGrain:{value:.018}},vertexShader:`
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
  `};class yn{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new T);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new T);const n=this.elements,i=t.x,o=t.y,r=t.z;return e.x=n[0]*i+n[1]*o+n[2]*r,e.y=n[3]*i+n[4]*o+n[5]*r,e.z=n[6]*i+n[7]*o+n[8]*r,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new yn);const n=this.elements,i=t.elements,o=e.elements,r=n[0],a=n[1],l=n[2],c=n[3],h=n[4],d=n[5],u=n[6],f=n[7],p=n[8],v=i[0],g=i[1],m=i[2],x=i[3],y=i[4],M=i[5],w=i[6],S=i[7],b=i[8];return o[0]=r*v+a*x+l*w,o[1]=r*g+a*y+l*S,o[2]=r*m+a*M+l*b,o[3]=c*v+h*x+d*w,o[4]=c*g+h*y+d*S,o[5]=c*m+h*M+d*b,o[6]=u*v+f*x+p*w,o[7]=u*g+f*y+p*S,o[8]=u*m+f*M+p*b,e}scale(t,e){e===void 0&&(e=new yn);const n=this.elements,i=e.elements;for(let o=0;o!==3;o++)i[3*o+0]=t.x*n[3*o+0],i[3*o+1]=t.y*n[3*o+1],i[3*o+2]=t.z*n[3*o+2];return e}solve(t,e){e===void 0&&(e=new T);const n=3,i=4,o=[];let r,a;for(r=0;r<n*i;r++)o.push(0);for(r=0;r<3;r++)for(a=0;a<3;a++)o[r+i*a]=this.elements[r+3*a];o[3+4*0]=t.x,o[3+4*1]=t.y,o[3+4*2]=t.z;let l=3;const c=l;let h;const d=4;let u;do{if(r=c-l,o[r+i*r]===0){for(a=r+1;a<c;a++)if(o[r+i*a]!==0){h=d;do u=d-h,o[u+i*r]+=o[u+i*a];while(--h);break}}if(o[r+i*r]!==0)for(a=r+1;a<c;a++){const f=o[r+i*a]/o[r+i*r];h=d;do u=d-h,o[u+i*a]=u<=r?0:o[u+i*a]-o[u+i*r]*f;while(--h)}}while(--l);if(e.z=o[2*i+3]/o[2*i+2],e.y=(o[1*i+3]-o[1*i+2]*e.z)/o[1*i+1],e.x=(o[0*i+3]-o[0*i+2]*e.z-o[0*i+1]*e.y)/o[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new yn);const e=3,n=6,i=Gx;let o,r;for(o=0;o<3;o++)for(r=0;r<3;r++)i[o+n*r]=this.elements[o+3*r];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const l=a;let c;const h=n;let d;do{if(o=l-a,i[o+n*o]===0){for(r=o+1;r<l;r++)if(i[o+n*r]!==0){c=h;do d=h-c,i[d+n*o]+=i[d+n*r];while(--c);break}}if(i[o+n*o]!==0)for(r=o+1;r<l;r++){const u=i[o+n*r]/i[o+n*o];c=h;do d=h-c,i[d+n*r]=d<=o?0:i[d+n*r]-i[d+n*o]*u;while(--c)}}while(--a);o=2;do{r=o-1;do{const u=i[o+n*r]/i[o+n*o];c=n;do d=n-c,i[d+n*r]=i[d+n*r]-i[d+n*o]*u;while(--c)}while(r--)}while(--o);o=2;do{const u=1/i[o+n*o];c=n;do d=n-c,i[d+n*o]=i[d+n*o]*u;while(--c)}while(o--);o=2;do{r=2;do{if(d=i[e+r+n*o],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(o,r,d)}while(r--)}while(o--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,o=t.w,r=e+e,a=n+n,l=i+i,c=e*r,h=e*a,d=e*l,u=n*a,f=n*l,p=i*l,v=o*r,g=o*a,m=o*l,x=this.elements;return x[3*0+0]=1-(u+p),x[3*0+1]=h-m,x[3*0+2]=d+g,x[3*1+0]=h+m,x[3*1+1]=1-(c+p),x[3*1+2]=f-v,x[3*2+0]=d-g,x[3*2+1]=f+v,x[3*2+2]=1-(c+u),this}transpose(t){t===void 0&&(t=new yn);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const Gx=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class T{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new T);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,l=this.z;return e.x=a*o-l*i,e.y=l*n-r*o,e.z=r*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new T(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new T(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new yn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const o=1/i;this.x*=o,this.y*=o,this.z*=o}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new T);const e=this.x,n=this.y,i=this.z;let o=Math.sqrt(e*e+n*n+i*i);return o>0?(o=1/o,t.x=e*o,t.y=n*o,t.z=i*o):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return Math.sqrt((o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,o=t.x,r=t.y,a=t.z;return(o-e)*(o-e)+(r-n)*(r-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new T);const n=this.x,i=this.y,o=this.z;return e.x=t*n,e.y=t*i,e.z=t*o,e}vmul(t,e){return e===void 0&&(e=new T),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new T),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new T),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=Hx,o=1/n;i.set(this.x*o,this.y*o,this.z*o);const r=Wx;Math.abs(i.x)<.9?(r.set(1,0,0),i.cross(r,t)):(r.set(0,1,0),i.cross(r,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,o=this.y,r=this.z;n.x=i+(t.x-i)*e,n.y=o+(t.y-o)*e,n.z=r+(t.z-r)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(rh),rh.almostEquals(t,e)}clone(){return new T(this.x,this.y,this.z)}}T.ZERO=new T(0,0,0);T.UNIT_X=new T(1,0,0);T.UNIT_Y=new T(0,1,0);T.UNIT_Z=new T(0,0,1);const Hx=new T,Wx=new T,rh=new T;class rn{constructor(t){t===void 0&&(t={}),this.lowerBound=new T,this.upperBound=new T,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const o=this.lowerBound,r=this.upperBound,a=n;o.copy(t[0]),a&&a.vmult(o,o),r.copy(o);for(let l=1;l<t.length;l++){let c=t[l];a&&(a.vmult(c,ah),c=ah),c.x>r.x&&(r.x=c.x),c.x<o.x&&(o.x=c.x),c.y>r.y&&(r.y=c.y),c.y<o.y&&(o.y=c.y),c.z>r.z&&(r.z=c.z),c.z<o.z&&(o.z=c.z)}return e&&(e.vadd(o,o),e.vadd(r,r)),i&&(o.x-=i,o.y-=i,o.z-=i,r.x+=i,r.y+=i,r.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new rn().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound,r=i.x<=n.x&&n.x<=o.x||e.x<=o.x&&o.x<=n.x,a=i.y<=n.y&&n.y<=o.y||e.y<=o.y&&o.y<=n.y,l=i.z<=n.z&&n.z<=o.z||e.z<=o.z&&o.z<=n.z;return r&&a&&l}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,o=t.upperBound;return e.x<=i.x&&n.x>=o.x&&e.y<=i.y&&n.y>=o.y&&e.z<=i.z&&n.z>=o.z}getCorners(t,e,n,i,o,r,a,l){const c=this.lowerBound,h=this.upperBound;t.copy(c),e.set(h.x,c.y,c.z),n.set(h.x,h.y,c.z),i.set(c.x,h.y,h.z),o.set(h.x,c.y,h.z),r.set(c.x,h.y,c.z),a.set(c.x,c.y,h.z),l.copy(h)}toLocalFrame(t,e){const n=lh,i=n[0],o=n[1],r=n[2],a=n[3],l=n[4],c=n[5],h=n[6],d=n[7];this.getCorners(i,o,r,a,l,c,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=lh,i=n[0],o=n[1],r=n[2],a=n[3],l=n[4],c=n[5],h=n[6],d=n[7];this.getCorners(i,o,r,a,l,c,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,o=1/e.y,r=1/e.z,a=(this.lowerBound.x-n.x)*i,l=(this.upperBound.x-n.x)*i,c=(this.lowerBound.y-n.y)*o,h=(this.upperBound.y-n.y)*o,d=(this.lowerBound.z-n.z)*r,u=(this.upperBound.z-n.z)*r,f=Math.max(Math.max(Math.min(a,l),Math.min(c,h)),Math.min(d,u)),p=Math.min(Math.min(Math.max(a,l),Math.max(c,h)),Math.max(d,u));return!(p<0||f>p)}}const ah=new T,lh=[new T,new T,new T,new T,new T,new T,new T,new T];class ch{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const o=i;i=n,n=o}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:o}=e;if(o>i){const r=o;o=i,i=r}this.matrix[(i*(i+1)>>1)+o-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class qu{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,o=n.length;i<o;i++)n[i].call(this,t)}return this}}class me{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new T),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=Vx,i=Xx;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new me);const n=this.x,i=this.y,o=this.z,r=this.w,a=t.x,l=t.y,c=t.z,h=t.w;return e.x=n*h+r*a+i*c-o*l,e.y=i*h+r*l+o*a-n*c,e.z=o*h+r*c+n*l-i*a,e.w=r*h-n*a-i*l-o*c,e}inverse(t){t===void 0&&(t=new me);const e=this.x,n=this.y,i=this.z,o=this.w;this.conjugate(t);const r=1/(e*e+n*n+i*i+o*o);return t.x*=r,t.y*=r,t.z*=r,t.w*=r,t}conjugate(t){return t===void 0&&(t=new me),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new T);const n=t.x,i=t.y,o=t.z,r=this.x,a=this.y,l=this.z,c=this.w,h=c*n+a*o-l*i,d=c*i+l*n-r*o,u=c*o+r*i-a*n,f=-r*n-a*i-l*o;return e.x=h*c+f*-r+d*-l-u*-a,e.y=d*c+f*-a+u*-r-h*-l,e.z=u*c+f*-l+h*-a-d*-r,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,o;const r=this.x,a=this.y,l=this.z,c=this.w;switch(e){case"YZX":const h=r*a+l*c;if(h>.499&&(n=2*Math.atan2(r,c),i=Math.PI/2,o=0),h<-.499&&(n=-2*Math.atan2(r,c),i=-Math.PI/2,o=0),n===void 0){const d=r*r,u=a*a,f=l*l;n=Math.atan2(2*a*c-2*r*l,1-2*u-2*f),i=Math.asin(2*h),o=Math.atan2(2*r*c-2*a*l,1-2*d-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=o}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const o=Math.cos(t/2),r=Math.cos(e/2),a=Math.cos(n/2),l=Math.sin(t/2),c=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=l*r*a+o*c*h,this.y=o*c*a-l*r*h,this.z=o*r*h+l*c*a,this.w=o*r*a-l*c*h):i==="YXZ"?(this.x=l*r*a+o*c*h,this.y=o*c*a-l*r*h,this.z=o*r*h-l*c*a,this.w=o*r*a+l*c*h):i==="ZXY"?(this.x=l*r*a-o*c*h,this.y=o*c*a+l*r*h,this.z=o*r*h+l*c*a,this.w=o*r*a-l*c*h):i==="ZYX"?(this.x=l*r*a-o*c*h,this.y=o*c*a+l*r*h,this.z=o*r*h-l*c*a,this.w=o*r*a+l*c*h):i==="YZX"?(this.x=l*r*a+o*c*h,this.y=o*c*a+l*r*h,this.z=o*r*h-l*c*a,this.w=o*r*a-l*c*h):i==="XZY"&&(this.x=l*r*a-o*c*h,this.y=o*c*a-l*r*h,this.z=o*r*h+l*c*a,this.w=o*r*a+l*c*h),this}clone(){return new me(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new me);const i=this.x,o=this.y,r=this.z,a=this.w;let l=t.x,c=t.y,h=t.z,d=t.w,u,f,p,v,g;return f=i*l+o*c+r*h+a*d,f<0&&(f=-f,l=-l,c=-c,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),p=Math.sin(u),v=Math.sin((1-e)*u)/p,g=Math.sin(e*u)/p):(v=1-e,g=e),n.x=v*i+g*l,n.y=v*o+g*c,n.z=v*r+g*h,n.w=v*a+g*d,n}integrate(t,e,n,i){i===void 0&&(i=new me);const o=t.x*n.x,r=t.y*n.y,a=t.z*n.z,l=this.x,c=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(o*d+r*h-a*c),i.y+=u*(r*d+a*l-o*h),i.z+=u*(a*d+o*c-r*l),i.w+=u*(-o*l-r*c-a*h),i}}const Vx=new T,Xx=new T,qx={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Lt{constructor(t){t===void 0&&(t={}),this.id=Lt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Lt.idCounter=0;Lt.types=qx;class ie{constructor(t){t===void 0&&(t={}),this.position=new T,this.quaternion=new me,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return ie.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return ie.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new T),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new T),n.vsub(t,i),e.conjugate(hh),hh.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new T),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new T),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new T),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const hh=new me;class Fs extends Lt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:o,boundingSphereRadius:r}=t;super({type:Lt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),r?this.boundingSphereRadius=r:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=o?o.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new T;for(let o=0;o!==t.length;o++){const r=t[o],a=r.length;for(let l=0;l!==a;l++){const c=(l+1)%a;e[r[l]].vsub(e[r[c]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new T;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],o=this.vertices[n[1]],r=this.vertices[n[2]];Fs.computeNormal(i,o,r,e)}static computeNormal(t,e,n,i){const o=new T,r=new T;e.vsub(t,r),n.vsub(e,o),o.cross(r,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,o,r,a,l,c){const h=new T;let d=-1,u=-Number.MAX_VALUE;for(let p=0;p<n.faces.length;p++){h.copy(n.faceNormals[p]),o.vmult(h,h);const v=h.dot(r);v>u&&(u=v,d=p)}const f=[];for(let p=0;p<n.faces[d].length;p++){const v=n.vertices[n.faces[d][p]],g=new T;g.copy(v),o.vmult(g,g),i.vadd(g,g),f.push(g)}d>=0&&this.clipFaceAgainstHull(r,t,e,f,a,l,c)}findSeparatingAxis(t,e,n,i,o,r,a,l){const c=new T,h=new T,d=new T,u=new T,f=new T,p=new T;let v=Number.MAX_VALUE;const g=this;if(g.uniqueAxes)for(let m=0;m!==g.uniqueAxes.length;m++){n.vmult(g.uniqueAxes[m],c);const x=g.testSepAxis(c,t,e,n,i,o);if(x===!1)return!1;x<v&&(v=x,r.copy(c))}else{const m=a?a.length:g.faces.length;for(let x=0;x<m;x++){const y=a?a[x]:x;c.copy(g.faceNormals[y]),n.vmult(c,c);const M=g.testSepAxis(c,t,e,n,i,o);if(M===!1)return!1;M<v&&(v=M,r.copy(c))}}if(t.uniqueAxes)for(let m=0;m!==t.uniqueAxes.length;m++){o.vmult(t.uniqueAxes[m],h);const x=g.testSepAxis(h,t,e,n,i,o);if(x===!1)return!1;x<v&&(v=x,r.copy(h))}else{const m=l?l.length:t.faces.length;for(let x=0;x<m;x++){const y=l?l[x]:x;h.copy(t.faceNormals[y]),o.vmult(h,h);const M=g.testSepAxis(h,t,e,n,i,o);if(M===!1)return!1;M<v&&(v=M,r.copy(h))}}for(let m=0;m!==g.uniqueEdges.length;m++){n.vmult(g.uniqueEdges[m],u);for(let x=0;x!==t.uniqueEdges.length;x++)if(o.vmult(t.uniqueEdges[x],f),u.cross(f,p),!p.almostZero()){p.normalize();const y=g.testSepAxis(p,t,e,n,i,o);if(y===!1)return!1;y<v&&(v=y,r.copy(p))}}return i.vsub(e,d),d.dot(r)>0&&r.negate(r),!0}testSepAxis(t,e,n,i,o,r){const a=this;Fs.project(a,t,n,i,ca),Fs.project(e,t,o,r,ha);const l=ca[0],c=ca[1],h=ha[0],d=ha[1];if(l<d||h<c)return!1;const u=l-d,f=h-c;return u<f?u:f}calculateLocalInertia(t,e){const n=new T,i=new T;this.computeLocalAABB(i,n);const o=n.x-i.x,r=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*r*2*r+2*a*2*a),e.y=1/12*t*(2*o*2*o+2*a*2*a),e.z=1/12*t*(2*r*2*r+2*o*2*o)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,o,r,a){const l=new T,c=new T,h=new T,d=new T,u=new T,f=new T,p=new T,v=new T,g=this,m=[],x=i,y=m;let M=-1,w=Number.MAX_VALUE;for(let E=0;E<g.faces.length;E++){l.copy(g.faceNormals[E]),n.vmult(l,l);const N=l.dot(t);N<w&&(w=N,M=E)}if(M<0)return;const S=g.faces[M];S.connectedFaces=[];for(let E=0;E<g.faces.length;E++)for(let N=0;N<g.faces[E].length;N++)S.indexOf(g.faces[E][N])!==-1&&E!==M&&S.connectedFaces.indexOf(E)===-1&&S.connectedFaces.push(E);const b=S.length;for(let E=0;E<b;E++){const N=g.vertices[S[E]],D=g.vertices[S[(E+1)%b]];N.vsub(D,c),h.copy(c),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[M]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(N),n.vmult(f,f),e.vadd(f,f);const F=S.connectedFaces[E];p.copy(this.faceNormals[F]);const R=this.getPlaneConstantOfFace(F);v.copy(p),n.vmult(v,v);const L=R-v.dot(e);for(this.clipFaceAgainstPlane(x,y,v,L);x.length;)x.shift();for(;y.length;)x.push(y.shift())}p.copy(this.faceNormals[M]);const A=this.getPlaneConstantOfFace(M);v.copy(p),n.vmult(v,v);const _=A-v.dot(e);for(let E=0;E<x.length;E++){let N=v.dot(x[E])+_;if(N<=o&&(console.log(`clamped: depth=${N} to minDist=${o}`),N=o),N<=r){const D=x[E];if(N<=1e-6){const F={point:D,normal:v,depth:N};a.push(F)}}}}clipFaceAgainstPlane(t,e,n,i){let o,r;const a=t.length;if(a<2)return e;let l=t[t.length-1],c=t[0];o=n.dot(l)+i;for(let h=0;h<a;h++){if(c=t[h],r=n.dot(c)+i,o<0)if(r<0){const d=new T;d.copy(c),e.push(d)}else{const d=new T;l.lerp(c,o/(o-r),d),e.push(d)}else if(r<0){const d=new T;l.lerp(c,o/(o-r),d),e.push(d),e.push(c)}l=c,o=r}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new T);const n=this.vertices,i=this.worldVertices;for(let o=0;o!==this.vertices.length;o++)e.vmult(n[o],i[o]),t.vadd(i[o],i[o]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const o=n[i];o.x<t.x?t.x=o.x:o.x>e.x&&(e.x=o.x),o.y<t.y?t.y=o.y:o.y>e.y&&(e.y=o.y),o.z<t.z?t.z=o.z:o.z>e.z&&(e.z=o.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new T);const n=this.faceNormals,i=this.worldFaceNormals;for(let o=0;o!==e;o++)t.vmult(n[o],i[o]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const o=this.vertices;let r,a,l,c,h,d,u=new T;for(let f=0;f<o.length;f++){u.copy(o[f]),e.vmult(u,u),t.vadd(u,u);const p=u;(r===void 0||p.x<r)&&(r=p.x),(c===void 0||p.x>c)&&(c=p.x),(a===void 0||p.y<a)&&(a=p.y),(h===void 0||p.y>h)&&(h=p.y),(l===void 0||p.z<l)&&(l=p.z),(d===void 0||p.z>d)&&(d=p.z)}n.set(r,a,l),i.set(c,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new T);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let o=0;o<n;o++){const r=i[o];e.vmult(r,r)}for(let o=0;o<this.faceNormals.length;o++){const r=this.faceNormals[o];e.vmult(r,r)}}if(t)for(let o=0;o<n;o++){const r=i[o];r.vadd(t,r)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,o=new T;this.getAveragePointLocal(o);for(let r=0;r<this.faces.length;r++){let a=i[r];const l=e[n[r][0]],c=new T;t.vsub(l,c);const h=a.dot(c),d=new T;o.vsub(l,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(t,e,n,i,o){const r=t.vertices.length,a=Yx;let l=0,c=0;const h=jx,d=t.vertices;h.setZero(),ie.vectorToLocalFrame(n,i,e,a),ie.pointToLocalFrame(n,i,h,h);const u=h.dot(a);c=l=d[0].dot(a);for(let f=1;f<r;f++){const p=d[f].dot(a);p>l&&(l=p),p<c&&(c=p)}if(c-=u,l-=u,c>l){const f=c;c=l,l=f}o[0]=l,o[1]=c}}const ca=[],ha=[];new T;const Yx=new T,jx=new T;class cs extends Lt{constructor(t){super({type:Lt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=T,o=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],r=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],l=new Fs({vertices:o,faces:r,axes:a});this.convexPolyhedronRepresentation=l,l.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new T),cs.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let o=0;o!==n.length;o++)e.vmult(n[o],n[o]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,o=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let r=0;r<o.length;r++)Zn.set(o[r][0],o[r][1],o[r][2]),e.vmult(Zn,Zn),t.vadd(Zn,Zn),n(Zn.x,Zn.y,Zn.z)}calculateWorldAABB(t,e,n,i){const o=this.halfExtents;_n[0].set(o.x,o.y,o.z),_n[1].set(-o.x,o.y,o.z),_n[2].set(-o.x,-o.y,o.z),_n[3].set(-o.x,-o.y,-o.z),_n[4].set(o.x,-o.y,-o.z),_n[5].set(o.x,o.y,-o.z),_n[6].set(-o.x,o.y,-o.z),_n[7].set(o.x,-o.y,o.z);const r=_n[0];e.vmult(r,r),t.vadd(r,r),i.copy(r),n.copy(r);for(let a=1;a<8;a++){const l=_n[a];e.vmult(l,l),t.vadd(l,l);const c=l.x,h=l.y,d=l.z;c>i.x&&(i.x=c),h>i.y&&(i.y=h),d>i.z&&(i.z=d),c<n.x&&(n.x=c),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}}const Zn=new T,_n=[new T,new T,new T,new T,new T,new T,new T,new T],dl={DYNAMIC:1,STATIC:2,KINEMATIC:4},fl={AWAKE:0,SLEEPY:1,SLEEPING:2};class Pt extends qu{constructor(t){t===void 0&&(t={}),super(),this.id=Pt.idCounter++,this.index=-1,this.world=null,this.vlambda=new T,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new T,this.previousPosition=new T,this.interpolatedPosition=new T,this.initPosition=new T,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new T,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new T,this.force=new T;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?Pt.STATIC:Pt.DYNAMIC,typeof t.type==typeof Pt.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=Pt.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new T,this.quaternion=new me,this.initQuaternion=new me,this.previousQuaternion=new me,this.interpolatedQuaternion=new me,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new T,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new T,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new T,this.invInertia=new T,this.invInertiaWorld=new yn,this.invMassSolve=0,this.invInertiaSolve=new T,this.invInertiaWorldSolve=new yn,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new T(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new T(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new rn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new T,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=Pt.AWAKE,this.wakeUpAfterNarrowphase=!1,t===Pt.SLEEPING&&this.dispatchEvent(Pt.wakeupEvent)}sleep(){this.sleepState=Pt.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===Pt.AWAKE&&n<i?(this.sleepState=Pt.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(Pt.sleepyEvent)):e===Pt.SLEEPY&&n>i?this.wakeUp():e===Pt.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(Pt.sleepEvent))}}updateSolveMassProperties(){this.sleepState===Pt.SLEEPING||this.type===Pt.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new T),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new T),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new T),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new T),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new T,o=new me;return e&&i.copy(e),n&&o.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(o),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let o=0;o!==n;o++){const r=t[o];r.updateBoundingSphereRadius();const a=e[o].length(),l=r.boundingSphereRadius;a+l>i&&(i=a+l)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,o=Zx,r=Kx,a=this.quaternion,l=this.aabb,c=Jx;for(let h=0;h!==i;h++){const d=t[h];a.vmult(e[h],o),o.vadd(this.position,o),a.mult(n[h],r),d.calculateWorldAABB(o,r,c.lowerBound,c.upperBound),h===0?l.copy(c):l.extend(c)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=Qx,i=$x;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new T),this.type!==Pt.DYNAMIC)return;this.sleepState===Pt.SLEEPING&&this.wakeUp();const n=ty;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new T),this.type!==Pt.DYNAMIC)return;const n=ey,i=ny;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===Pt.DYNAMIC&&(this.sleepState===Pt.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new T),this.type!==Pt.DYNAMIC)return;this.sleepState===Pt.SLEEPING&&this.wakeUp();const n=e,i=iy;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const o=sy;n.cross(t,o),this.invInertiaWorld.vmult(o,o),this.angularVelocity.vadd(o,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new T),this.type!==Pt.DYNAMIC)return;const n=oy,i=ry;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=ay;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),cs.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new T;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===Pt.DYNAMIC||this.type===Pt.KINEMATIC)||this.sleepState===Pt.SLEEPING)return;const i=this.velocity,o=this.angularVelocity,r=this.position,a=this.force,l=this.torque,c=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*t;i.x+=a.x*f*u.x,i.y+=a.y*f*u.y,i.z+=a.z*f*u.z;const p=d.elements,v=this.angularFactor,g=l.x*v.x,m=l.y*v.y,x=l.z*v.z;o.x+=t*(p[0]*g+p[1]*m+p[2]*x),o.y+=t*(p[3]*g+p[4]*m+p[5]*x),o.z+=t*(p[6]*g+p[7]*m+p[8]*x),r.x+=i.x*t,r.y+=i.y*t,r.z+=i.z*t,c.integrate(this.angularVelocity,t,this.angularFactor,c),e&&(n?c.normalizeFast():c.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}Pt.idCounter=0;Pt.COLLIDE_EVENT_NAME="collide";Pt.DYNAMIC=dl.DYNAMIC;Pt.STATIC=dl.STATIC;Pt.KINEMATIC=dl.KINEMATIC;Pt.AWAKE=fl.AWAKE;Pt.SLEEPY=fl.SLEEPY;Pt.SLEEPING=fl.SLEEPING;Pt.wakeupEvent={type:"wakeup"};Pt.sleepyEvent={type:"sleepy"};Pt.sleepEvent={type:"sleep"};const Zx=new T,Kx=new me,Jx=new rn,Qx=new yn,$x=new yn;new yn;const ty=new T,ey=new T,ny=new T,iy=new T,sy=new T,oy=new T,ry=new T,ay=new T;class ly{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&Pt.STATIC||t.sleepState===Pt.SLEEPING)&&(e.type&Pt.STATIC||e.sleepState===Pt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const o=cy;e.position.vsub(t.position,o);const r=(t.boundingRadius+e.boundingRadius)**2;o.lengthSquared()<r&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=hy,i=uy,o=dy,r=t.length;for(let a=0;a!==r;a++)i[a]=t[a],o[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==r;a++){const l=i[a].id,c=o[a].id,h=l<c?`${l},${c}`:`${c},${l}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const l=n.keys.pop(),c=n[l];t.push(i[c]),e.push(o[c]),delete n[l]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new T;t.position.vsub(e.position,n);const i=t.shapes[0],o=e.shapes[0];return Math.pow(i.boundingSphereRadius+o.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const cy=new T;new T;new me;new T;const hy={keys:[]},uy=[],dy=[];new T;new T;new T;class Yu extends ly{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,o=i.length;let r,a;for(let l=0;l!==o;l++)for(let c=0;c!==l;c++)r=i[l],a=i[c],this.needBroadphaseCollision(r,a)&&this.intersectionTest(r,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const o=t.bodies[i];o.aabbNeedsUpdate&&o.updateAABB(),o.aabb.overlaps(e)&&n.push(o)}return n}}class Gs{constructor(){this.rayFromWorld=new T,this.rayToWorld=new T,this.hitNormalWorld=new T,this.hitPointWorld=new T,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,o,r,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=o,this.body=r,this.distance=a}}let ju,Zu,Ku,Ju,Qu,$u,td;const pl={CLOSEST:1,ANY:2,ALL:4};ju=Lt.types.SPHERE;Zu=Lt.types.PLANE;Ku=Lt.types.BOX;Ju=Lt.types.CYLINDER;Qu=Lt.types.CONVEXPOLYHEDRON;$u=Lt.types.HEIGHTFIELD;td=Lt.types.TRIMESH;class be{get[ju](){return this._intersectSphere}get[Zu](){return this._intersectPlane}get[Ku](){return this._intersectBox}get[Ju](){return this._intersectConvex}get[Qu](){return this._intersectConvex}get[$u](){return this._intersectHeightfield}get[td](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new T),e===void 0&&(e=new T),this.from=t.clone(),this.to=e.clone(),this.direction=new T,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=be.ANY,this.result=new Gs,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||be.ANY,this.result=e.result||new Gs,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(uh),ua.length=0,t.broadphase.aabbQuery(t,uh,ua),this.intersectBodies(ua),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=fy,o=py;for(let r=0,a=t.shapes.length;r<a;r++){const l=t.shapes[r];if(!(n&&!l.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[r],o),t.quaternion.vmult(t.shapeOffsets[r],i),i.vadd(t.position,i),this.intersectShape(l,o,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const o=this.from;if(Cy(o,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,o){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,o)}_intersectPlane(t,e,n,i,o){const r=this.from,a=this.to,l=this.direction,c=new T(0,0,1);e.vmult(c,c);const h=new T;r.vsub(n,h);const d=h.dot(c);a.vsub(n,h);const u=h.dot(c);if(d*u>0||r.distanceTo(a)<d)return;const f=c.dot(l);if(Math.abs(f)<this.precision)return;const p=new T,v=new T,g=new T;r.vsub(n,p);const m=-c.dot(p)/f;l.scale(m,v),r.vadd(v,g),this.reportIntersection(c,g,o,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,o=this.from;e.x=Math.min(i.x,o.x),e.y=Math.min(i.y,o.y),e.z=Math.min(i.z,o.z),n.x=Math.max(i.x,o.x),n.y=Math.max(i.y,o.y),n.z=Math.max(i.z,o.z)}_intersectHeightfield(t,e,n,i,o){t.data,t.elementSize;const r=my;r.from.copy(this.from),r.to.copy(this.to),ie.pointToLocalFrame(n,e,r.from,r.from),ie.pointToLocalFrame(n,e,r.to,r.to),r.updateDirection();const a=gy;let l,c,h,d;l=c=0,h=d=t.data.length-1;const u=new rn;r.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),l=Math.max(l,a[0]),c=Math.max(c,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=l;f<h;f++)for(let p=c;p<d;p++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,p,u),!!u.overlapsRay(r)){if(t.getConvexTrianglePillar(f,p,!1),ie.pointToWorldFrame(n,e,t.pillarOffset,Ao),this._intersectConvex(t.pillarConvex,e,Ao,i,o,dh),this.result.shouldStop)return;t.getConvexTrianglePillar(f,p,!0),ie.pointToWorldFrame(n,e,t.pillarOffset,Ao),this._intersectConvex(t.pillarConvex,e,Ao,i,o,dh)}}}_intersectSphere(t,e,n,i,o){const r=this.from,a=this.to,l=t.radius,c=(a.x-r.x)**2+(a.y-r.y)**2+(a.z-r.z)**2,h=2*((a.x-r.x)*(r.x-n.x)+(a.y-r.y)*(r.y-n.y)+(a.z-r.z)*(r.z-n.z)),d=(r.x-n.x)**2+(r.y-n.y)**2+(r.z-n.z)**2-l**2,u=h**2-4*c*d,f=vy,p=xy;if(!(u<0))if(u===0)r.lerp(a,u,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,o,i,-1);else{const v=(-h-Math.sqrt(u))/(2*c),g=(-h+Math.sqrt(u))/(2*c);if(v>=0&&v<=1&&(r.lerp(a,v,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,o,i,-1)),this.result.shouldStop)return;g>=0&&g<=1&&(r.lerp(a,g,f),f.vsub(n,p),p.normalize(),this.reportIntersection(p,f,o,i,-1))}}_intersectConvex(t,e,n,i,o,r){const a=yy,l=fh,c=r&&r.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,f=this.direction,p=this.from,v=this.to,g=p.distanceTo(v),m=c?c.length:h.length,x=this.result;for(let y=0;!x.shouldStop&&y<m;y++){const M=c?c[y]:y,w=h[M],S=u[M],b=e,A=n;l.copy(d[w[0]]),b.vmult(l,l),l.vadd(A,l),l.vsub(p,l),b.vmult(S,a);const _=f.dot(a);if(Math.abs(_)<this.precision)continue;const E=a.dot(l)/_;if(!(E<0)){f.scale(E,Ke),Ke.vadd(p,Ke),mn.copy(d[w[0]]),b.vmult(mn,mn),A.vadd(mn,mn);for(let N=1;!x.shouldStop&&N<w.length-1;N++){Sn.copy(d[w[N]]),wn.copy(d[w[N+1]]),b.vmult(Sn,Sn),b.vmult(wn,wn),A.vadd(Sn,Sn),A.vadd(wn,wn);const D=Ke.distanceTo(p);!(be.pointInTriangle(Ke,mn,Sn,wn)||be.pointInTriangle(Ke,Sn,mn,wn))||D>g||this.reportIntersection(a,Ke,o,i,M)}}}}_intersectTrimesh(t,e,n,i,o,r){const a=My,l=Ty,c=Ay,h=fh,d=_y,u=Sy,f=wy,p=Ey,v=by,g=t.indices;t.vertices;const m=this.from,x=this.to,y=this.direction;c.position.copy(n),c.quaternion.copy(e),ie.vectorToLocalFrame(n,e,y,d),ie.pointToLocalFrame(n,e,m,u),ie.pointToLocalFrame(n,e,x,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,f.vsub(u,d),d.normalize();const M=u.distanceSquared(f);t.tree.rayQuery(this,c,l);for(let w=0,S=l.length;!this.result.shouldStop&&w!==S;w++){const b=l[w];t.getNormal(b,a),t.getVertex(g[b*3],mn),mn.vsub(u,h);const A=d.dot(a),_=a.dot(h)/A;if(_<0)continue;d.scale(_,Ke),Ke.vadd(u,Ke),t.getVertex(g[b*3+1],Sn),t.getVertex(g[b*3+2],wn);const E=Ke.distanceSquared(u);!(be.pointInTriangle(Ke,Sn,mn,wn)||be.pointInTriangle(Ke,mn,Sn,wn))||E>M||(ie.vectorToWorldFrame(e,a,v),ie.pointToWorldFrame(n,e,Ke,p),this.reportIntersection(v,p,o,i,b))}l.length=0}reportIntersection(t,e,n,i,o){const r=this.from,a=this.to,l=r.distanceTo(e),c=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(c.hitFaceIndex=typeof o<"u"?o:-1,this.mode){case be.ALL:this.hasHit=!0,c.set(r,a,t,e,n,i,l),c.hasHit=!0,this.callback(c);break;case be.CLOSEST:(l<c.distance||!c.hasHit)&&(this.hasHit=!0,c.hasHit=!0,c.set(r,a,t,e,n,i,l));break;case be.ANY:this.hasHit=!0,c.hasHit=!0,c.set(r,a,t,e,n,i,l),c.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,mi),n.vsub(e,vs),t.vsub(e,da);const o=mi.dot(mi),r=mi.dot(vs),a=mi.dot(da),l=vs.dot(vs),c=vs.dot(da);let h,d;return(h=l*a-r*c)>=0&&(d=o*c-r*a)>=0&&h+d<o*l-r*r}}be.CLOSEST=pl.CLOSEST;be.ANY=pl.ANY;be.ALL=pl.ALL;const uh=new rn,ua=[],vs=new T,da=new T,fy=new T,py=new me,Ke=new T,mn=new T,Sn=new T,wn=new T;new T;new Gs;const dh={faceList:[0]},Ao=new T,my=new be,gy=[],vy=new T,xy=new T,yy=new T;new T;new T;const fh=new T,My=new T,_y=new T,Sy=new T,wy=new T,by=new T,Ey=new T;new rn;const Ty=[],Ay=new ie,mi=new T,Co=new T;function Cy(s,t,e){e.vsub(s,mi);const n=mi.dot(t);return t.scale(n,Co),Co.vadd(s,Co),e.distanceTo(Co)}class ed{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class ph{constructor(){this.spatial=new T,this.rotational=new T}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Xs{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Xs.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new ph,this.jacobianElementB=new ph,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,o=t,r=n;this.a=4/(r*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(r*r*o*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),o=this.computeGq(),r=this.computeGiMf();return-o*t-i*e-r*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.position,r=i.position;return t.spatial.dot(o)+e.spatial.dot(r)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.velocity,r=i.velocity,a=n.angularVelocity,l=i.angularVelocity;return t.multiplyVectors(o,a)+e.multiplyVectors(r,l)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.vlambda,r=i.vlambda,a=n.wlambda,l=i.wlambda;return t.multiplyVectors(o,a)+e.multiplyVectors(r,l)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.force,r=n.torque,a=i.force,l=i.torque,c=n.invMassSolve,h=i.invMassSolve;return o.scale(c,mh),a.scale(h,gh),n.invInertiaWorldSolve.vmult(r,vh),i.invInertiaWorldSolve.vmult(l,xh),t.multiplyVectors(mh,vh)+e.multiplyVectors(gh,xh)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,o=n.invMassSolve,r=i.invMassSolve,a=n.invInertiaWorldSolve,l=i.invInertiaWorldSolve;let c=o+r;return a.vmult(t.rotational,Ro),c+=Ro.dot(t.rotational),l.vmult(e.rotational,Ro),c+=Ro.dot(e.rotational),c}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,o=this.bj,r=Ry;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),o.vlambda.addScaledVector(o.invMassSolve*t,n.spatial,o.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,r),i.wlambda.addScaledVector(t,r,i.wlambda),o.invInertiaWorldSolve.vmult(n.rotational,r),o.wlambda.addScaledVector(t,r,o.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Xs.idCounter=0;const mh=new T,gh=new T,vh=new T,xh=new T,Ro=new T,Ry=new T;class Py extends Xs{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new T,this.rj=new T,this.ni=new T}computeB(t){const e=this.a,n=this.b,i=this.bi,o=this.bj,r=this.ri,a=this.rj,l=Ly,c=Iy,h=i.velocity,d=i.angularVelocity;i.force,i.torque;const u=o.velocity,f=o.angularVelocity;o.force,o.torque;const p=Dy,v=this.jacobianElementA,g=this.jacobianElementB,m=this.ni;r.cross(m,l),a.cross(m,c),m.negate(v.spatial),l.negate(v.rotational),g.spatial.copy(m),g.rotational.copy(c),p.copy(o.position),p.vadd(a,p),p.vsub(i.position,p),p.vsub(r,p);const x=m.dot(p),y=this.restitution+1,M=y*u.dot(m)-y*h.dot(m)+f.dot(c)-d.dot(l),w=this.computeGiMf();return-x*e-M*n-t*w}getImpactVelocityAlongNormal(){const t=Ny,e=Uy,n=Fy,i=Oy,o=zy;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,o),this.ni.dot(o)}}const Ly=new T,Iy=new T,Dy=new T,Ny=new T,Uy=new T,Fy=new T,Oy=new T,zy=new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;class yh extends Xs{constructor(t,e,n){super(t,e,-n,n),this.ri=new T,this.rj=new T,this.t=new T}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,o=By,r=ky,a=this.t;n.cross(a,o),i.cross(a,r);const l=this.jacobianElementA,c=this.jacobianElementB;a.negate(l.spatial),o.negate(l.rotational),c.spatial.copy(a),c.rotational.copy(r);const h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}}const By=new T,ky=new T;class xi{constructor(t,e,n){n=ed.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=xi.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}xi.idCounter=0;class Qn{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Qn.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Qn.idCounter=0;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;class Gy{constructor(t){t===void 0&&(t={}),t=ed.defaults(t,{chassisConnectionPointLocal:new T,chassisConnectionPointWorld:new T,directionLocal:new T,directionWorld:new T,axleLocal:new T,axleWorld:new T,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:10.5,forwardAcceleration:1,sideAcceleration:1,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,slipInfo:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),this.maxSuspensionTravel=t.maxSuspensionTravel,this.customSlidingRotationalSpeed=t.customSlidingRotationalSpeed,this.useCustomSlidingRotationalSpeed=t.useCustomSlidingRotationalSpeed,this.sliding=!1,this.chassisConnectionPointLocal=t.chassisConnectionPointLocal.clone(),this.chassisConnectionPointWorld=t.chassisConnectionPointWorld.clone(),this.directionLocal=t.directionLocal.clone(),this.directionWorld=t.directionWorld.clone(),this.axleLocal=t.axleLocal.clone(),this.axleWorld=t.axleWorld.clone(),this.suspensionRestLength=t.suspensionRestLength,this.suspensionMaxLength=t.suspensionMaxLength,this.radius=t.radius,this.suspensionStiffness=t.suspensionStiffness,this.dampingCompression=t.dampingCompression,this.dampingRelaxation=t.dampingRelaxation,this.frictionSlip=t.frictionSlip,this.forwardAcceleration=t.forwardAcceleration,this.sideAcceleration=t.sideAcceleration,this.steering=0,this.rotation=0,this.deltaRotation=0,this.rollInfluence=t.rollInfluence,this.maxSuspensionForce=t.maxSuspensionForce,this.engineForce=0,this.brake=0,this.isFrontWheel=t.isFrontWheel,this.clippedInvContactDotSuspension=1,this.suspensionRelativeVelocity=0,this.suspensionForce=0,this.slipInfo=0,this.skidInfo=0,this.suspensionLength=0,this.sideImpulse=0,this.forwardImpulse=0,this.raycastResult=new Gs,this.worldTransform=new ie,this.isInContact=!1}updateWheel(t){const e=this.raycastResult;if(this.isInContact){const n=e.hitNormalWorld.dot(e.directionWorld);e.hitPointWorld.vsub(t.position,_h),t.getVelocityAtWorldPoint(_h,Mh);const i=e.hitNormalWorld.dot(Mh);if(n>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=1/.1;else{const o=-1/n;this.suspensionRelativeVelocity=i*o,this.clippedInvContactDotSuspension=o}}else e.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,e.directionWorld.scale(-1,e.hitNormalWorld),this.clippedInvContactDotSuspension=1}}const Mh=new T,_h=new T;class Hy{constructor(t){this.chassisBody=t.chassisBody,this.wheelInfos=[],this.sliding=!1,this.world=null,this.indexRightAxis=typeof t.indexRightAxis<"u"?t.indexRightAxis:2,this.indexForwardAxis=typeof t.indexForwardAxis<"u"?t.indexForwardAxis:0,this.indexUpAxis=typeof t.indexUpAxis<"u"?t.indexUpAxis:1,this.constraints=[],this.preStepCallback=()=>{},this.currentVehicleSpeedKmHour=0,this.numWheelsOnGround=0}addWheel(t){t===void 0&&(t={});const e=new Gy(t),n=this.wheelInfos.length;return this.wheelInfos.push(e),n}setSteeringValue(t,e){const n=this.wheelInfos[e];n.steering=t}applyEngineForce(t,e){this.wheelInfos[e].engineForce=t}setBrake(t,e){this.wheelInfos[e].brake=t}addToWorld(t){t.addBody(this.chassisBody);const e=this;this.preStepCallback=()=>{e.updateVehicle(t.dt)},t.addEventListener("preStep",this.preStepCallback),this.world=t}getVehicleAxisWorld(t,e){e.set(t===0?1:0,t===1?1:0,t===2?1:0),this.chassisBody.vectorToWorldFrame(e,e)}updateVehicle(t){const e=this.wheelInfos,n=e.length,i=this.chassisBody;for(let d=0;d<n;d++)this.updateWheelTransform(d);this.currentVehicleSpeedKmHour=3.6*i.velocity.length();const o=new T;this.getVehicleAxisWorld(this.indexForwardAxis,o),o.dot(i.velocity)<0&&(this.currentVehicleSpeedKmHour*=-1);for(let d=0;d<n;d++)this.castRay(e[d]);this.updateSuspension(t);const r=new T,a=new T;for(let d=0;d<n;d++){const u=e[d];let f=u.suspensionForce;f>u.maxSuspensionForce&&(f=u.maxSuspensionForce),u.raycastResult.hitNormalWorld.scale(f*t,r),u.raycastResult.hitPointWorld.vsub(i.position,a),i.applyImpulse(r,a)}this.updateFriction(t);const l=new T,c=new T,h=new T;for(let d=0;d<n;d++){const u=e[d];i.getVelocityAtWorldPoint(u.chassisConnectionPointWorld,h);let f=1;switch(this.indexUpAxis){case 1:f=-1;break}if(u.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,c);const p=c.dot(u.raycastResult.hitNormalWorld);u.raycastResult.hitNormalWorld.scale(p,l),c.vsub(l,c);const v=c.dot(h);u.deltaRotation=f*v*t/u.radius}(u.sliding||!u.isInContact)&&u.engineForce!==0&&u.useCustomSlidingRotationalSpeed&&(u.deltaRotation=(u.engineForce>0?1:-1)*u.customSlidingRotationalSpeed*t),Math.abs(u.brake)>Math.abs(u.engineForce)&&(u.deltaRotation=0),u.rotation+=u.deltaRotation,u.deltaRotation*=.99}}updateSuspension(t){const n=this.chassisBody.mass,i=this.wheelInfos,o=i.length;for(let r=0;r<o;r++){const a=i[r];if(a.isInContact){let l;const c=a.suspensionRestLength,h=a.suspensionLength,d=c-h;l=a.suspensionStiffness*d*a.clippedInvContactDotSuspension;const u=a.suspensionRelativeVelocity;let f;u<0?f=a.dampingCompression:f=a.dampingRelaxation,l-=f*u,a.suspensionForce=l*n,a.suspensionForce<0&&(a.suspensionForce=0)}else a.suspensionForce=0}}removeFromWorld(t){this.constraints,t.removeBody(this.chassisBody),t.removeEventListener("preStep",this.preStepCallback),this.world=null}castRay(t){const e=qy,n=Yy;this.updateWheelTransformWorld(t);const i=this.chassisBody;let o=-1;const r=t.suspensionRestLength+t.radius;t.directionWorld.scale(r,e);const a=t.chassisConnectionPointWorld;a.vadd(e,n);const l=t.raycastResult;l.reset();const c=i.collisionResponse;i.collisionResponse=!1,this.world.rayTest(a,n,l),i.collisionResponse=c;const h=l.body;if(t.raycastResult.groundObject=0,h){o=l.distance,t.raycastResult.hitNormalWorld=l.hitNormalWorld,t.isInContact=!0;const d=l.distance;t.suspensionLength=d-t.radius;const u=t.suspensionRestLength-t.maxSuspensionTravel,f=t.suspensionRestLength+t.maxSuspensionTravel;t.suspensionLength<u&&(t.suspensionLength=u),t.suspensionLength>f&&(t.suspensionLength=f,t.raycastResult.reset());const p=t.raycastResult.hitNormalWorld.dot(t.directionWorld),v=new T;i.getVelocityAtWorldPoint(t.raycastResult.hitPointWorld,v);const g=t.raycastResult.hitNormalWorld.dot(v);if(p>=-.1)t.suspensionRelativeVelocity=0,t.clippedInvContactDotSuspension=1/.1;else{const m=-1/p;t.suspensionRelativeVelocity=g*m,t.clippedInvContactDotSuspension=m}}else t.suspensionLength=t.suspensionRestLength+0*t.maxSuspensionTravel,t.suspensionRelativeVelocity=0,t.directionWorld.scale(-1,t.raycastResult.hitNormalWorld),t.clippedInvContactDotSuspension=1;return o}updateWheelTransformWorld(t){t.isInContact=!1;const e=this.chassisBody;e.pointToWorldFrame(t.chassisConnectionPointLocal,t.chassisConnectionPointWorld),e.vectorToWorldFrame(t.directionLocal,t.directionWorld),e.vectorToWorldFrame(t.axleLocal,t.axleWorld)}updateWheelTransform(t){const e=Wy,n=Vy,i=Xy,o=this.wheelInfos[t];this.updateWheelTransformWorld(o),o.directionLocal.scale(-1,e),n.copy(o.axleLocal),e.cross(n,i),i.normalize(),n.normalize();const r=o.steering,a=new me;a.setFromAxisAngle(e,r);const l=new me;l.setFromAxisAngle(n,o.rotation);const c=o.worldTransform.quaternion;this.chassisBody.quaternion.mult(a,c),c.mult(l,c),c.normalize();const h=o.worldTransform.position;h.copy(o.directionWorld),h.scale(o.suspensionLength,h),h.vadd(o.chassisConnectionPointWorld,h)}getWheelTransformWorld(t){return this.wheelInfos[t].worldTransform}updateFriction(t){const e=Zy,n=this.wheelInfos,i=n.length,o=this.chassisBody,r=Jy,a=Ky;this.numWheelsOnGround=0;for(let h=0;h<i;h++){const d=n[h];d.raycastResult.body&&this.numWheelsOnGround++,d.sideImpulse=0,d.forwardImpulse=0,r[h]||(r[h]=new T),a[h]||(a[h]=new T)}for(let h=0;h<i;h++){const d=n[h],u=d.raycastResult.body;if(u){const f=a[h];this.getWheelTransformWorld(h).vectorToWorldFrame(jy[this.indexRightAxis],f);const v=d.raycastResult.hitNormalWorld,g=f.dot(v);v.scale(g,e),f.vsub(e,f),f.normalize(),v.cross(f,r[h]),r[h].normalize(),d.sideImpulse=hM(o,d.raycastResult.hitPointWorld,u,d.raycastResult.hitPointWorld,f),d.sideImpulse*=Qy}}const l=1,c=.5;this.sliding=!1;for(let h=0;h<i;h++){const d=n[h],u=d.raycastResult.body;let f=0;if(d.slipInfo=1,u){const v=d.brake?d.brake:0;f=nM(o,u,d.raycastResult.hitPointWorld,r[h],v),f+=d.engineForce*t;const g=v/f;d.slipInfo*=g}if(d.forwardImpulse=0,d.skidInfo=1,u){d.skidInfo=1;const p=d.suspensionForce*t*d.frictionSlip,g=p*p;d.forwardImpulse=f;const m=d.forwardImpulse*c/d.forwardAcceleration,x=d.sideImpulse*l/d.sideAcceleration,y=m*m+x*x;if(d.sliding=!1,y>g){this.sliding=!0,d.sliding=!0;const M=p/Math.sqrt(y);d.skidInfo*=M}}}if(this.sliding)for(let h=0;h<i;h++){const d=n[h];d.sideImpulse!==0&&d.skidInfo<1&&(d.forwardImpulse*=d.skidInfo,d.sideImpulse*=d.skidInfo)}for(let h=0;h<i;h++){const d=n[h],u=new T;if(d.raycastResult.hitPointWorld.vsub(o.position,u),d.forwardImpulse!==0){const f=new T;r[h].scale(d.forwardImpulse,f),o.applyImpulse(f,u)}if(d.sideImpulse!==0){const f=d.raycastResult.body,p=new T;d.raycastResult.hitPointWorld.vsub(f.position,p);const v=new T;a[h].scale(d.sideImpulse,v),o.vectorToLocalFrame(u,u),u["xyz"[this.indexUpAxis]]*=d.rollInfluence,o.vectorToWorldFrame(u,u),o.applyImpulse(v,u),v.scale(-1,v),f.applyImpulse(v,p)}}}}new T;new T;new T;const Wy=new T,Vy=new T,Xy=new T;new be;new T;const qy=new T,Yy=new T,jy=[new T(1,0,0),new T(0,1,0),new T(0,0,1)],Zy=new T,Ky=[],Jy=[],Qy=1,$y=new T,tM=new T,eM=new T;function nM(s,t,e,n,i){let o=0;const r=e,a=$y,l=tM,c=eM;s.getVelocityAtWorldPoint(r,a),t.getVelocityAtWorldPoint(r,l),a.vsub(l,c);const h=n.dot(c),d=Sh(s,e,n),u=Sh(t,e,n),p=1/(d+u);return o=-h*p,i<o&&(o=i),o<-i&&(o=-i),o}const iM=new T,sM=new T,oM=new T,rM=new T;function Sh(s,t,e){const n=iM,i=sM,o=oM,r=rM;return t.vsub(s.position,n),n.cross(e,i),s.invInertiaWorld.vmult(i,r),r.cross(n,o),s.invMass+e.dot(o)}const aM=new T,lM=new T,cM=new T;function hM(s,t,e,n,i){if(i.lengthSquared()>1.1)return 0;const r=aM,a=lM,l=cM;s.getVelocityAtWorldPoint(t,r),e.getVelocityAtWorldPoint(n,a),r.vsub(a,l);const c=i.dot(l),h=1/(s.invMass+e.invMass);return-.2*c*h}new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new T;new rn;new T;new rn;new T;new T;new T;new T;new T;new T;new T;new rn;new T;new ie;new rn;class uM{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class dM extends uM{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,o=this.tolerance*this.tolerance,r=this.equations,a=r.length,l=e.bodies,c=l.length,h=t;let d,u,f,p,v,g;if(a!==0)for(let M=0;M!==c;M++)l[M].updateSolveMassProperties();const m=pM,x=mM,y=fM;m.length=a,x.length=a,y.length=a;for(let M=0;M!==a;M++){const w=r[M];y[M]=0,x[M]=w.computeB(h),m[M]=1/w.computeC()}if(a!==0){for(let S=0;S!==c;S++){const b=l[S],A=b.vlambda,_=b.wlambda;A.set(0,0,0),_.set(0,0,0)}for(n=0;n!==i;n++){p=0;for(let S=0;S!==a;S++){const b=r[S];d=x[S],u=m[S],g=y[S],v=b.computeGWlambda(),f=u*(d-v-b.eps*g),g+f<b.minForce?f=b.minForce-g:g+f>b.maxForce&&(f=b.maxForce-g),y[S]+=f,p+=f>0?f:-f,b.addToWlambda(f)}if(p*p<o)break}for(let S=0;S!==c;S++){const b=l[S],A=b.velocity,_=b.angularVelocity;b.vlambda.vmul(b.linearFactor,b.vlambda),A.vadd(b.vlambda,A),b.wlambda.vmul(b.angularFactor,b.wlambda),_.vadd(b.wlambda,_)}let M=r.length;const w=1/h;for(;M--;)r[M].multiplier=y[M]*w}return n}}const fM=[],pM=[],mM=[];class gM{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class vM extends gM{constructor(){super(...arguments),this.type=T}constructObject(){return new T}}const pe={sphereSphere:Lt.types.SPHERE,spherePlane:Lt.types.SPHERE|Lt.types.PLANE,boxBox:Lt.types.BOX|Lt.types.BOX,sphereBox:Lt.types.SPHERE|Lt.types.BOX,planeBox:Lt.types.PLANE|Lt.types.BOX,convexConvex:Lt.types.CONVEXPOLYHEDRON,sphereConvex:Lt.types.SPHERE|Lt.types.CONVEXPOLYHEDRON,planeConvex:Lt.types.PLANE|Lt.types.CONVEXPOLYHEDRON,boxConvex:Lt.types.BOX|Lt.types.CONVEXPOLYHEDRON,sphereHeightfield:Lt.types.SPHERE|Lt.types.HEIGHTFIELD,boxHeightfield:Lt.types.BOX|Lt.types.HEIGHTFIELD,convexHeightfield:Lt.types.CONVEXPOLYHEDRON|Lt.types.HEIGHTFIELD,sphereParticle:Lt.types.PARTICLE|Lt.types.SPHERE,planeParticle:Lt.types.PLANE|Lt.types.PARTICLE,boxParticle:Lt.types.BOX|Lt.types.PARTICLE,convexParticle:Lt.types.PARTICLE|Lt.types.CONVEXPOLYHEDRON,cylinderCylinder:Lt.types.CYLINDER,sphereCylinder:Lt.types.SPHERE|Lt.types.CYLINDER,planeCylinder:Lt.types.PLANE|Lt.types.CYLINDER,boxCylinder:Lt.types.BOX|Lt.types.CYLINDER,convexCylinder:Lt.types.CONVEXPOLYHEDRON|Lt.types.CYLINDER,heightfieldCylinder:Lt.types.HEIGHTFIELD|Lt.types.CYLINDER,particleCylinder:Lt.types.PARTICLE|Lt.types.CYLINDER,sphereTrimesh:Lt.types.SPHERE|Lt.types.TRIMESH,planeTrimesh:Lt.types.PLANE|Lt.types.TRIMESH};class xM{get[pe.sphereSphere](){return this.sphereSphere}get[pe.spherePlane](){return this.spherePlane}get[pe.boxBox](){return this.boxBox}get[pe.sphereBox](){return this.sphereBox}get[pe.planeBox](){return this.planeBox}get[pe.convexConvex](){return this.convexConvex}get[pe.sphereConvex](){return this.sphereConvex}get[pe.planeConvex](){return this.planeConvex}get[pe.boxConvex](){return this.boxConvex}get[pe.sphereHeightfield](){return this.sphereHeightfield}get[pe.boxHeightfield](){return this.boxHeightfield}get[pe.convexHeightfield](){return this.convexHeightfield}get[pe.sphereParticle](){return this.sphereParticle}get[pe.planeParticle](){return this.planeParticle}get[pe.boxParticle](){return this.boxParticle}get[pe.convexParticle](){return this.convexParticle}get[pe.cylinderCylinder](){return this.convexConvex}get[pe.sphereCylinder](){return this.sphereConvex}get[pe.planeCylinder](){return this.planeConvex}get[pe.boxCylinder](){return this.boxConvex}get[pe.convexCylinder](){return this.convexConvex}get[pe.heightfieldCylinder](){return this.heightfieldCylinder}get[pe.particleCylinder](){return this.particleCylinder}get[pe.sphereTrimesh](){return this.sphereTrimesh}get[pe.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new vM,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,o,r){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new Py(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const l=this.currentContactMaterial;a.restitution=l.restitution,a.setSpookParams(l.contactEquationStiffness,l.contactEquationRelaxation,this.world.dt);const c=n.material||t.material,h=i.material||e.material;return c&&h&&c.restitution>=0&&h.restitution>=0&&(a.restitution=c.restitution*h.restitution),a.si=o||n,a.sj=r||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,o=t.si,r=t.sj,a=this.world,l=this.currentContactMaterial;let c=l.friction;const h=o.material||n.material,d=r.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(c=h.friction*d.friction),c>0){const u=c*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const p=this.frictionEquationPool,v=p.length?p.pop():new yh(n,i,u*f),g=p.length?p.pop():new yh(n,i,u*f);return v.bi=g.bi=n,v.bj=g.bj=i,v.minForce=g.minForce=-u*f,v.maxForce=g.maxForce=u*f,v.ri.copy(t.ri),v.rj.copy(t.rj),g.ri.copy(t.ri),g.rj.copy(t.rj),t.ni.tangents(v.t,g.t),v.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),g.setSpookParams(l.frictionEquationStiffness,l.frictionEquationRelaxation,a.dt),v.enabled=g.enabled=t.enabled,e.push(v,g),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];ci.setZero(),Hi.setZero(),Wi.setZero();const o=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==o?(ci.vadd(e.ni,ci),Hi.vadd(e.ri,Hi),Wi.vadd(e.rj,Wi)):(ci.vsub(e.ni,ci),Hi.vadd(e.rj,Hi),Wi.vadd(e.ri,Wi));const r=1/t;Hi.scale(r,n.ri),Wi.scale(r,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),ci.normalize(),ci.tangents(n.t,i.t)}getContacts(t,e,n,i,o,r,a){this.contactPointPool=o,this.frictionEquationPool=a,this.result=i,this.frictionResult=r;const l=_M,c=SM,h=yM,d=MM;for(let u=0,f=t.length;u!==f;u++){const p=t[u],v=e[u];let g=null;p.material&&v.material&&(g=n.getContactMaterial(p.material,v.material)||null);const m=p.type&Pt.KINEMATIC&&v.type&Pt.STATIC||p.type&Pt.STATIC&&v.type&Pt.KINEMATIC||p.type&Pt.KINEMATIC&&v.type&Pt.KINEMATIC;for(let x=0;x<p.shapes.length;x++){p.quaternion.mult(p.shapeOrientations[x],l),p.quaternion.vmult(p.shapeOffsets[x],h),h.vadd(p.position,h);const y=p.shapes[x];for(let M=0;M<v.shapes.length;M++){v.quaternion.mult(v.shapeOrientations[M],c),v.quaternion.vmult(v.shapeOffsets[M],d),d.vadd(v.position,d);const w=v.shapes[M];if(!(y.collisionFilterMask&w.collisionFilterGroup&&w.collisionFilterMask&y.collisionFilterGroup)||h.distanceTo(d)>y.boundingSphereRadius+w.boundingSphereRadius)continue;let S=null;y.material&&w.material&&(S=n.getContactMaterial(y.material,w.material)||null),this.currentContactMaterial=S||g||n.defaultContactMaterial;const b=y.type|w.type,A=this[b];if(A){let _=!1;y.type<w.type?_=A.call(this,y,w,h,d,l,c,p,v,y,w,m):_=A.call(this,w,y,d,h,c,l,v,p,y,w,m),_&&m&&(n.shapeOverlapKeeper.set(y.id,w.id),n.bodyOverlapKeeper.set(p.id,v.id))}}}}}sphereSphere(t,e,n,i,o,r,a,l,c,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;const u=this.createContactEquation(a,l,t,e,c,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(l.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,o,r,a,l,c,h,d){const u=this.createContactEquation(a,l,t,e,c,h);if(u.ni.set(0,0,1),r.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,Po),u.ni.scale(u.ni.dot(Po),wh),Po.vsub(wh,u.rj),-Po.dot(u.ni)<=t.radius){if(d)return!0;const f=u.ri,p=u.rj;f.vadd(n,f),f.vsub(a.position,f),p.vadd(i,p),p.vsub(l.position,p),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,o,r,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,o,r,a,l,t,e,d)}sphereBox(t,e,n,i,o,r,a,l,c,h,d){const u=this.v3pool,f=jM;n.vsub(i,Lo),e.getSideNormals(f,r);const p=t.radius;let v=!1;const g=KM,m=JM,x=QM;let y=null,M=0,w=0,S=0,b=null;for(let U=0,q=f.length;U!==q&&v===!1;U++){const H=XM;H.copy(f[U]);const G=H.length();H.normalize();const j=Lo.dot(H);if(j<G+p&&j>0){const k=qM,V=YM;k.copy(f[(U+1)%3]),V.copy(f[(U+2)%3]);const Y=k.length(),et=V.length();k.normalize(),V.normalize();const ht=Lo.dot(k),ut=Lo.dot(V);if(ht<Y&&ht>-Y&&ut<et&&ut>-et){const it=Math.abs(j-G-p);if((b===null||it<b)&&(b=it,w=ht,S=ut,y=G,g.copy(H),m.copy(k),x.copy(V),M++,d))return!0}}}if(M){v=!0;const U=this.createContactEquation(a,l,t,e,c,h);g.scale(-p,U.ri),U.ni.copy(g),U.ni.negate(U.ni),g.scale(y,g),m.scale(w,m),g.vadd(m,g),x.scale(S,x),g.vadd(x,U.rj),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),U.rj.vadd(i,U.rj),U.rj.vsub(l.position,U.rj),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}let A=u.get();const _=ZM;for(let U=0;U!==2&&!v;U++)for(let q=0;q!==2&&!v;q++)for(let H=0;H!==2&&!v;H++)if(A.set(0,0,0),U?A.vadd(f[0],A):A.vsub(f[0],A),q?A.vadd(f[1],A):A.vsub(f[1],A),H?A.vadd(f[2],A):A.vsub(f[2],A),i.vadd(A,_),_.vsub(n,_),_.lengthSquared()<p*p){if(d)return!0;v=!0;const G=this.createContactEquation(a,l,t,e,c,h);G.ri.copy(_),G.ri.normalize(),G.ni.copy(G.ri),G.ri.scale(p,G.ri),G.rj.copy(A),G.ri.vadd(n,G.ri),G.ri.vsub(a.position,G.ri),G.rj.vadd(i,G.rj),G.rj.vsub(l.position,G.rj),this.result.push(G),this.createFrictionEquationsFromContact(G,this.frictionResult)}u.release(A),A=null;const E=u.get(),N=u.get(),D=u.get(),F=u.get(),R=u.get(),L=f.length;for(let U=0;U!==L&&!v;U++)for(let q=0;q!==L&&!v;q++)if(U%3!==q%3){f[q].cross(f[U],E),E.normalize(),f[U].vadd(f[q],N),D.copy(n),D.vsub(N,D),D.vsub(i,D);const H=D.dot(E);E.scale(H,F);let G=0;for(;G===U%3||G===q%3;)G++;R.copy(n),R.vsub(F,R),R.vsub(N,R),R.vsub(i,R);const j=Math.abs(H),k=R.length();if(j<f[G].length()&&k<p){if(d)return!0;v=!0;const V=this.createContactEquation(a,l,t,e,c,h);N.vadd(F,V.rj),V.rj.copy(V.rj),R.negate(V.ni),V.ni.normalize(),V.ri.copy(V.rj),V.ri.vadd(i,V.ri),V.ri.vsub(n,V.ri),V.ri.normalize(),V.ri.scale(p,V.ri),V.ri.vadd(n,V.ri),V.ri.vsub(a.position,V.ri),V.rj.vadd(i,V.rj),V.rj.vsub(l.position,V.rj),this.result.push(V),this.createFrictionEquationsFromContact(V,this.frictionResult)}}u.release(E,N,D,F,R)}planeBox(t,e,n,i,o,r,a,l,c,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,o,r,a,l,t,e,d)}convexConvex(t,e,n,i,o,r,a,l,c,h,d,u,f){const p=f_;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,o,i,r,p,u,f)){const v=[],g=p_;t.clipAgainstHull(n,o,e,i,r,p,-100,100,v);let m=0;for(let x=0;x!==v.length;x++){if(d)return!0;const y=this.createContactEquation(a,l,t,e,c,h),M=y.ri,w=y.rj;p.negate(y.ni),v[x].normal.negate(g),g.scale(v[x].depth,g),v[x].point.vadd(g,M),w.copy(v[x].point),M.vsub(n,M),w.vsub(i,w),M.vadd(n,M),M.vsub(a.position,M),w.vadd(i,w),w.vsub(l.position,w),this.result.push(y),m++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&m&&this.createFrictionFromAverage(m)}}sphereConvex(t,e,n,i,o,r,a,l,c,h,d){const u=this.v3pool;n.vsub(i,$M);const f=e.faceNormals,p=e.faces,v=e.vertices,g=t.radius;let m=!1;for(let x=0;x!==v.length;x++){const y=v[x],M=i_;r.vmult(y,M),i.vadd(M,M);const w=n_;if(M.vsub(n,w),w.lengthSquared()<g*g){if(d)return!0;m=!0;const S=this.createContactEquation(a,l,t,e,c,h);S.ri.copy(w),S.ri.normalize(),S.ni.copy(S.ri),S.ri.scale(g,S.ri),M.vsub(i,S.rj),S.ri.vadd(n,S.ri),S.ri.vsub(a.position,S.ri),S.rj.vadd(i,S.rj),S.rj.vsub(l.position,S.rj),this.result.push(S),this.createFrictionEquationsFromContact(S,this.frictionResult);return}}for(let x=0,y=p.length;x!==y&&m===!1;x++){const M=f[x],w=p[x],S=s_;r.vmult(M,S);const b=o_;r.vmult(v[w[0]],b),b.vadd(i,b);const A=r_;S.scale(-g,A),n.vadd(A,A);const _=a_;A.vsub(b,_);const E=_.dot(S),N=l_;if(n.vsub(b,N),E<0&&N.dot(S)>0){const D=[];for(let F=0,R=w.length;F!==R;F++){const L=u.get();r.vmult(v[w[F]],L),i.vadd(L,L),D.push(L)}if(VM(D,S,n)){if(d)return!0;m=!0;const F=this.createContactEquation(a,l,t,e,c,h);S.scale(-g,F.ri),S.negate(F.ni);const R=u.get();S.scale(-E,R);const L=u.get();S.scale(-g,L),n.vsub(i,F.rj),F.rj.vadd(L,F.rj),F.rj.vadd(R,F.rj),F.rj.vadd(i,F.rj),F.rj.vsub(l.position,F.rj),F.ri.vadd(n,F.ri),F.ri.vsub(a.position,F.ri),u.release(R),u.release(L),this.result.push(F),this.createFrictionEquationsFromContact(F,this.frictionResult);for(let U=0,q=D.length;U!==q;U++)u.release(D[U]);return}else for(let F=0;F!==w.length;F++){const R=u.get(),L=u.get();r.vmult(v[w[(F+1)%w.length]],R),r.vmult(v[w[(F+2)%w.length]],L),i.vadd(R,R),i.vadd(L,L);const U=t_;L.vsub(R,U);const q=e_;U.unit(q);const H=u.get(),G=u.get();n.vsub(R,G);const j=G.dot(q);q.scale(j,H),H.vadd(R,H);const k=u.get();if(H.vsub(n,k),j>0&&j*j<U.lengthSquared()&&k.lengthSquared()<g*g){if(d)return!0;const V=this.createContactEquation(a,l,t,e,c,h);H.vsub(i,V.rj),H.vsub(n,V.ni),V.ni.normalize(),V.ni.scale(g,V.ri),V.rj.vadd(i,V.rj),V.rj.vsub(l.position,V.rj),V.ri.vadd(n,V.ri),V.ri.vsub(a.position,V.ri),this.result.push(V),this.createFrictionEquationsFromContact(V,this.frictionResult);for(let Y=0,et=D.length;Y!==et;Y++)u.release(D[Y]);u.release(R),u.release(L),u.release(H),u.release(k),u.release(G);return}u.release(R),u.release(L),u.release(H),u.release(k),u.release(G)}for(let F=0,R=D.length;F!==R;F++)u.release(D[F])}}}planeConvex(t,e,n,i,o,r,a,l,c,h,d){const u=c_,f=h_;f.set(0,0,1),o.vmult(f,f);let p=0;const v=u_;for(let g=0;g!==e.vertices.length;g++)if(u.copy(e.vertices[g]),r.vmult(u,u),i.vadd(u,u),u.vsub(n,v),f.dot(v)<=0){if(d)return!0;const x=this.createContactEquation(a,l,t,e,c,h),y=d_;f.scale(f.dot(v),y),u.vsub(y,y),y.vsub(n,x.ri),x.ni.copy(f),u.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(l.position,x.rj),this.result.push(x),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}boxConvex(t,e,n,i,o,r,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,o,r,a,l,t,e,d)}sphereHeightfield(t,e,n,i,o,r,a,l,c,h,d){const u=e.data,f=t.radius,p=e.elementSize,v=T_,g=E_;ie.pointToLocalFrame(i,r,n,g);let m=Math.floor((g.x-f)/p)-1,x=Math.ceil((g.x+f)/p)+1,y=Math.floor((g.y-f)/p)-1,M=Math.ceil((g.y+f)/p)+1;if(x<0||M<0||m>u.length||y>u[0].length)return;m<0&&(m=0),x<0&&(x=0),y<0&&(y=0),M<0&&(M=0),m>=u.length&&(m=u.length-1),x>=u.length&&(x=u.length-1),M>=u[0].length&&(M=u[0].length-1),y>=u[0].length&&(y=u[0].length-1);const w=[];e.getRectMinMax(m,y,x,M,w);const S=w[0],b=w[1];if(g.z-f>b||g.z+f<S)return;const A=this.result;for(let _=m;_<x;_++)for(let E=y;E<M;E++){const N=A.length;let D=!1;if(e.getConvexTrianglePillar(_,E,!1),ie.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(D=this.sphereConvex(t,e.pillarConvex,n,v,o,r,a,l,t,e,d)),d&&D||(e.getConvexTrianglePillar(_,E,!0),ie.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(D=this.sphereConvex(t,e.pillarConvex,n,v,o,r,a,l,t,e,d)),d&&D))return!0;if(A.length-N>2)return}}boxHeightfield(t,e,n,i,o,r,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,o,r,a,l,t,e,d)}convexHeightfield(t,e,n,i,o,r,a,l,c,h,d){const u=e.data,f=e.elementSize,p=t.boundingSphereRadius,v=w_,g=b_,m=S_;ie.pointToLocalFrame(i,r,n,m);let x=Math.floor((m.x-p)/f)-1,y=Math.ceil((m.x+p)/f)+1,M=Math.floor((m.y-p)/f)-1,w=Math.ceil((m.y+p)/f)+1;if(y<0||w<0||x>u.length||M>u[0].length)return;x<0&&(x=0),y<0&&(y=0),M<0&&(M=0),w<0&&(w=0),x>=u.length&&(x=u.length-1),y>=u.length&&(y=u.length-1),w>=u[0].length&&(w=u[0].length-1),M>=u[0].length&&(M=u[0].length-1);const S=[];e.getRectMinMax(x,M,y,w,S);const b=S[0],A=S[1];if(!(m.z-p>A||m.z+p<b))for(let _=x;_<y;_++)for(let E=M;E<w;E++){let N=!1;if(e.getConvexTrianglePillar(_,E,!1),ie.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(N=this.convexConvex(t,e.pillarConvex,n,v,o,r,a,l,null,null,d,g,null)),d&&N||(e.getConvexTrianglePillar(_,E,!0),ie.pointToWorldFrame(i,r,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(N=this.convexConvex(t,e.pillarConvex,n,v,o,r,a,l,null,null,d,g,null)),d&&N))return!0}}sphereParticle(t,e,n,i,o,r,a,l,c,h,d){const u=x_;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;const p=this.createContactEquation(l,a,e,t,c,h);u.normalize(),p.rj.copy(u),p.rj.scale(t.radius,p.rj),p.ni.copy(u),p.ni.negate(p.ni),p.ri.set(0,0,0),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}}planeParticle(t,e,n,i,o,r,a,l,c,h,d){const u=m_;u.set(0,0,1),a.quaternion.vmult(u,u);const f=g_;if(i.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;const v=this.createContactEquation(l,a,e,t,c,h);v.ni.copy(u),v.ni.negate(v.ni),v.ri.set(0,0,0);const g=v_;u.scale(u.dot(i),g),i.vsub(g,g),v.rj.copy(g),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,o,r,a,l,c,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,o,r,a,l,t,e,d)}convexParticle(t,e,n,i,o,r,a,l,c,h,d){let u=-1;const f=M_,p=__;let v=null;const g=y_;if(g.copy(i),g.vsub(n,g),o.conjugate(bh),bh.vmult(g,g),t.pointIsInside(g)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,o),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(o);for(let m=0,x=t.faces.length;m!==x;m++){const y=[t.worldVertices[t.faces[m][0]]],M=t.worldFaceNormals[m];i.vsub(y[0],Eh);const w=-M.dot(Eh);if(v===null||Math.abs(w)<Math.abs(v)){if(d)return!0;v=w,u=m,f.copy(M)}}if(u!==-1){const m=this.createContactEquation(l,a,e,t,c,h);f.scale(v,p),p.vadd(i,p),p.vsub(n,p),m.rj.copy(p),f.negate(m.ni),m.ri.set(0,0,0);const x=m.ri,y=m.rj;x.vadd(i,x),x.vsub(l.position,x),y.vadd(n,y),y.vsub(a.position,y),this.result.push(m),this.createFrictionEquationsFromContact(m,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,o,r,a,l,c,h,d){return this.convexHeightfield(e,t,i,n,r,o,l,a,c,h,d)}particleCylinder(t,e,n,i,o,r,a,l,c,h,d){return this.convexParticle(e,t,i,n,r,o,l,a,c,h,d)}sphereTrimesh(t,e,n,i,o,r,a,l,c,h,d){const u=PM,f=LM,p=IM,v=DM,g=NM,m=UM,x=BM,y=RM,M=AM,w=kM;ie.pointToLocalFrame(i,r,n,g);const S=t.radius;x.lowerBound.set(g.x-S,g.y-S,g.z-S),x.upperBound.set(g.x+S,g.y+S,g.z+S),e.getTrianglesInAABB(x,w);const b=CM,A=t.radius*t.radius;for(let F=0;F<w.length;F++)for(let R=0;R<3;R++)if(e.getVertex(e.indices[w[F]*3+R],b),b.vsub(g,M),M.lengthSquared()<=A){if(y.copy(b),ie.pointToWorldFrame(i,r,y,b),b.vsub(n,M),d)return!0;let L=this.createContactEquation(a,l,t,e,c,h);L.ni.copy(M),L.ni.normalize(),L.ri.copy(L.ni),L.ri.scale(t.radius,L.ri),L.ri.vadd(n,L.ri),L.ri.vsub(a.position,L.ri),L.rj.copy(b),L.rj.vsub(l.position,L.rj),this.result.push(L),this.createFrictionEquationsFromContact(L,this.frictionResult)}for(let F=0;F<w.length;F++)for(let R=0;R<3;R++){e.getVertex(e.indices[w[F]*3+R],u),e.getVertex(e.indices[w[F]*3+(R+1)%3],f),f.vsub(u,p),g.vsub(f,m);const L=m.dot(p);g.vsub(u,m);let U=m.dot(p);if(U>0&&L<0&&(g.vsub(u,m),v.copy(p),v.normalize(),U=m.dot(v),v.scale(U,m),m.vadd(u,m),m.distanceTo(g)<t.radius)){if(d)return!0;const H=this.createContactEquation(a,l,t,e,c,h);m.vsub(g,H.ni),H.ni.normalize(),H.ni.scale(t.radius,H.ri),H.ri.vadd(n,H.ri),H.ri.vsub(a.position,H.ri),ie.pointToWorldFrame(i,r,m,m),m.vsub(l.position,H.rj),ie.vectorToWorldFrame(r,H.ni,H.ni),ie.vectorToWorldFrame(r,H.ri,H.ri),this.result.push(H),this.createFrictionEquationsFromContact(H,this.frictionResult)}}const _=FM,E=OM,N=zM,D=TM;for(let F=0,R=w.length;F!==R;F++){e.getTriangleVertices(w[F],_,E,N),e.getNormal(w[F],D),g.vsub(_,m);let L=m.dot(D);if(D.scale(L,m),g.vsub(m,m),L=m.distanceTo(g),be.pointInTriangle(m,_,E,N)&&L<t.radius){if(d)return!0;let U=this.createContactEquation(a,l,t,e,c,h);m.vsub(g,U.ni),U.ni.normalize(),U.ni.scale(t.radius,U.ri),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),ie.pointToWorldFrame(i,r,m,m),m.vsub(l.position,U.rj),ie.vectorToWorldFrame(r,U.ni,U.ni),ie.vectorToWorldFrame(r,U.ri,U.ri),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}}w.length=0}planeTrimesh(t,e,n,i,o,r,a,l,c,h,d){const u=new T,f=wM;f.set(0,0,1),o.vmult(f,f);for(let p=0;p<e.vertices.length/3;p++){e.getVertex(p,u);const v=new T;v.copy(u),ie.pointToWorldFrame(i,r,v,u);const g=bM;if(u.vsub(n,g),f.dot(g)<=0){if(d)return!0;const x=this.createContactEquation(a,l,t,e,c,h);x.ni.copy(f);const y=EM;f.scale(g.dot(f),y),u.vsub(y,y),x.ri.copy(y),x.ri.vsub(a.position,x.ri),x.rj.copy(u),x.rj.vsub(l.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}}const ci=new T,Hi=new T,Wi=new T,yM=new T,MM=new T,_M=new me,SM=new me,wM=new T,bM=new T,EM=new T,TM=new T,AM=new T;new T;const CM=new T,RM=new T,PM=new T,LM=new T,IM=new T,DM=new T,NM=new T,UM=new T,FM=new T,OM=new T,zM=new T,BM=new rn,kM=[],Po=new T,wh=new T,GM=new T,HM=new T,WM=new T;function VM(s,t,e){let n=null;const i=s.length;for(let o=0;o!==i;o++){const r=s[o],a=GM;s[(o+1)%i].vsub(r,a);const l=HM;a.cross(t,l);const c=WM;e.vsub(r,c);const h=l.dot(c);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Lo=new T,XM=new T,qM=new T,YM=new T,jM=[new T,new T,new T,new T,new T,new T],ZM=new T,KM=new T,JM=new T,QM=new T,$M=new T,t_=new T,e_=new T,n_=new T,i_=new T,s_=new T,o_=new T,r_=new T,a_=new T,l_=new T;new T;new T;const c_=new T,h_=new T,u_=new T,d_=new T,f_=new T,p_=new T,m_=new T,g_=new T,v_=new T,x_=new T,bh=new me,y_=new T;new T;const M_=new T,Eh=new T,__=new T,S_=new T,w_=new T,b_=[0],E_=new T,T_=new T;class Th{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let o=0;for(;n>i[o];)o++;if(n!==i[o]){for(let r=i.length-1;r>=o;r--)i[r+1]=i[r];i[o]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,o=n.length,r=i.length;let a=0;for(let l=0;l<o;l++){let c=!1;const h=n[l];for(;h>i[a];)a++;c=h===i[a],c||Ah(t,h)}a=0;for(let l=0;l<r;l++){let c=!1;const h=i[l];for(;h>n[a];)a++;c=n[a]===h,c||Ah(e,h)}}}function Ah(s,t){s.push((t&4294901760)>>16,t&65535)}const fa=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`;class A_{constructor(){this.data={keys:[]}}get(t,e){const n=fa(t,e);return this.data[n]}set(t,e,n){const i=fa(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=fa(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class C_ extends qu{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new T,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new T,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Yu,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new dM,this.constraints=[],this.narrowphase=new xM(this),this.collisionMatrix=new ch,this.collisionMatrixPrevious=new ch,this.bodyOverlapKeeper=new Th,this.shapeOverlapKeeper=new Th,this.contactmaterials=[],this.contactMaterialTable=new A_,this.defaultMaterial=new Qn("default"),this.defaultContactMaterial=new xi(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof Gs?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=be.ALL,n.from=t,n.to=e,n.callback=i,pa.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=be.ANY,n.from=t,n.to=e,n.result=i,pa.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=be.CLOSEST,n.from=t,n.to=e,n.result=i,pa.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof Pt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let o=0;o!==n.length;o++)n[o].index=o;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let o=0;o<i.length;o++){const r=i[o];if(r.id===t)return r}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Ee.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Ee.now();let o=0;for(;this.accumulator>=t&&o<n&&(this.internalStep(t),this.accumulator-=t,o++,!(Ee.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const r=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const l=this.bodies[a];l.previousPosition.lerp(l.position,r,l.interpolatedPosition),l.previousQuaternion.slerp(l.quaternion,r,l.interpolatedQuaternion),l.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=D_,i=N_,o=this.bodies.length,r=this.bodies,a=this.solver,l=this.gravity,c=this.doProfiling,h=this.profile,d=Pt.DYNAMIC;let u=-1/0;const f=this.constraints,p=I_;l.length();const v=l.x,g=l.y,m=l.z;let x=0;for(c&&(u=Ee.now()),x=0;x!==o;x++){const F=r[x];if(F.type===d){const R=F.force,L=F.mass;R.x+=L*v,R.y+=L*g,R.z+=L*m}}for(let F=0,R=this.subsystems.length;F!==R;F++)this.subsystems[F].update();c&&(u=Ee.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),c&&(h.broadphase=Ee.now()-u);let y=f.length;for(x=0;x!==y;x++){const F=f[x];if(!F.collideConnected)for(let R=n.length-1;R>=0;R-=1)(F.bodyA===n[R]&&F.bodyB===i[R]||F.bodyB===n[R]&&F.bodyA===i[R])&&(n.splice(R,1),i.splice(R,1))}this.collisionMatrixTick(),c&&(u=Ee.now());const M=L_,w=e.length;for(x=0;x!==w;x++)M.push(e[x]);e.length=0;const S=this.frictionEquations.length;for(x=0;x!==S;x++)p.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,M,this.frictionEquations,p),c&&(h.narrowphase=Ee.now()-u),c&&(u=Ee.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);const b=e.length;for(let F=0;F!==b;F++){const R=e[F],L=R.bi,U=R.bj,q=R.si,H=R.sj;let G;if(L.material&&U.material?G=this.getContactMaterial(L.material,U.material)||this.defaultContactMaterial:G=this.defaultContactMaterial,G.friction,L.material&&U.material&&(L.material.friction>=0&&U.material.friction>=0&&L.material.friction*U.material.friction,L.material.restitution>=0&&U.material.restitution>=0&&(R.restitution=L.material.restitution*U.material.restitution)),a.addEquation(R),L.allowSleep&&L.type===Pt.DYNAMIC&&L.sleepState===Pt.SLEEPING&&U.sleepState===Pt.AWAKE&&U.type!==Pt.STATIC){const j=U.velocity.lengthSquared()+U.angularVelocity.lengthSquared(),k=U.sleepSpeedLimit**2;j>=k*2&&(L.wakeUpAfterNarrowphase=!0)}if(U.allowSleep&&U.type===Pt.DYNAMIC&&U.sleepState===Pt.SLEEPING&&L.sleepState===Pt.AWAKE&&L.type!==Pt.STATIC){const j=L.velocity.lengthSquared()+L.angularVelocity.lengthSquared(),k=L.sleepSpeedLimit**2;j>=k*2&&(U.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(L,U,!0),this.collisionMatrixPrevious.get(L,U)||(xs.body=U,xs.contact=R,L.dispatchEvent(xs),xs.body=L,U.dispatchEvent(xs)),this.bodyOverlapKeeper.set(L.id,U.id),this.shapeOverlapKeeper.set(q.id,H.id)}for(this.emitContactEvents(),c&&(h.makeContactConstraints=Ee.now()-u,u=Ee.now()),x=0;x!==o;x++){const F=r[x];F.wakeUpAfterNarrowphase&&(F.wakeUp(),F.wakeUpAfterNarrowphase=!1)}for(y=f.length,x=0;x!==y;x++){const F=f[x];F.update();for(let R=0,L=F.equations.length;R!==L;R++){const U=F.equations[R];a.addEquation(U)}}a.solve(t,this),c&&(h.solve=Ee.now()-u),a.removeAllEquations();const A=Math.pow;for(x=0;x!==o;x++){const F=r[x];if(F.type&d){const R=A(1-F.linearDamping,t),L=F.velocity;L.scale(R,L);const U=F.angularVelocity;if(U){const q=A(1-F.angularDamping,t);U.scale(q,U)}}}this.dispatchEvent(P_),c&&(u=Ee.now());const E=this.stepnumber%(this.quatNormalizeSkip+1)===0,N=this.quatNormalizeFast;for(x=0;x!==o;x++)r[x].integrate(t,E,N);this.clearForces(),this.broadphase.dirty=!0,c&&(h.integrate=Ee.now()-u),this.stepnumber+=1,this.dispatchEvent(R_);let D=!0;if(this.allowSleep)for(D=!1,x=0;x!==o;x++){const F=r[x];F.sleepTick(this.time),F.sleepState!==Pt.SLEEPING&&(D=!0)}this.hasActiveBodies=D}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(Dn,Nn),t){for(let o=0,r=Dn.length;o<r;o+=2)ys.bodyA=this.getBodyById(Dn[o]),ys.bodyB=this.getBodyById(Dn[o+1]),this.dispatchEvent(ys);ys.bodyA=ys.bodyB=null}if(e){for(let o=0,r=Nn.length;o<r;o+=2)Ms.bodyA=this.getBodyById(Nn[o]),Ms.bodyB=this.getBodyById(Nn[o+1]),this.dispatchEvent(Ms);Ms.bodyA=Ms.bodyB=null}Dn.length=Nn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(Dn,Nn),n){for(let o=0,r=Dn.length;o<r;o+=2){const a=this.getShapeById(Dn[o]),l=this.getShapeById(Dn[o+1]);Un.shapeA=a,Un.shapeB=l,a&&(Un.bodyA=a.body),l&&(Un.bodyB=l.body),this.dispatchEvent(Un)}Un.bodyA=Un.bodyB=Un.shapeA=Un.shapeB=null}if(i){for(let o=0,r=Nn.length;o<r;o+=2){const a=this.getShapeById(Nn[o]),l=this.getShapeById(Nn[o+1]);Fn.shapeA=a,Fn.shapeB=l,a&&(Fn.bodyA=a.body),l&&(Fn.bodyB=l.body),this.dispatchEvent(Fn)}Fn.bodyA=Fn.bodyB=Fn.shapeA=Fn.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new rn;const pa=new be,Ee=globalThis.performance||{};if(!Ee.now){let s=Date.now();Ee.timing&&Ee.timing.navigationStart&&(s=Ee.timing.navigationStart),Ee.now=()=>Date.now()-s}new T;const R_={type:"postStep"},P_={type:"preStep"},xs={type:Pt.COLLIDE_EVENT_NAME,body:null,contact:null},L_=[],I_=[],D_=[],N_=[],Dn=[],Nn=[],ys={type:"beginContact",bodyA:null,bodyB:null},Ms={type:"endContact",bodyA:null,bodyB:null},Un={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Fn={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};function U_(){const s=new C_({gravity:new T(0,-9.82,0)});s.broadphase=new Yu,s.allowSleep=!0,s.defaultContactMaterial.friction=.4;const t=new Qn("ground"),e=new Qn("wheel"),n=new Qn("chassis"),i=new Qn("barrier");return s.addContactMaterial(new xi(t,e,{friction:0,restitution:0,contactEquationStiffness:1e3})),s.addContactMaterial(new xi(n,i,{friction:.08,restitution:.04})),s.addContactMaterial(new xi(n,t,{friction:.2,restitution:.05})),{world:s,materials:{groundMat:t,wheelMat:e,chassisMat:n,barrierMat:i}}}function ml(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),o={},r={},a=s[0].morphTargetsRelative,l=new ae;let c=0;for(let h=0;h<s.length;++h){const d=s[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;l.addGroup(c,f,h),c+=f}}if(e){let h=0;const d=[];for(let u=0;u<s.length;++u){const f=s[u].index;for(let p=0;p<f.count;++p)d.push(f.getX(p)+h);h+=s[u].attributes.position.count}l.setIndex(d)}for(const h in o){const d=Ch(o[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;l.setAttribute(h,d)}for(const h in r){const d=r[h][0].length;if(d===0)break;l.morphAttributes=l.morphAttributes||{},l.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<r[h].length;++v)f.push(r[h][v][u]);const p=Ch(f);if(!p)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;l.morphAttributes[h].push(p)}}return l}function Ch(s){let t,e,n,i=-1,o=0;for(let c=0;c<s.length;++c){const h=s[c];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;o+=h.array.length}const r=new t(o);let a=0;for(let c=0;c<s.length;++c)r.set(s[c].array,a),a+=s[c].array.length;const l=new ne(r,e,n);return i!==void 0&&(l.gpuType=i),l}const F_=600,O_=14,z_=2,B_=5.5;function Rh(s,t,e,n){const i=n.roadWidth??O_,o=n.kerbWidth??z_,r=n.runoffWidth??B_,a=i/2+r+.5,l=n.theme||{},c={road:i,kerb:o,armco:a},h=new re;s.add(h);const d=[],u=n.controlPoints.map(([j,k])=>new z(j,0,k)),f=new Fu(u,n.closed!==!1,"catmullrom",n.tension??.5),p=G_(f,F_),v=H_(p),g=W_(p),m=new Set,x=E1(l.ground||"grass"),y=new Q(new Ce(4e3,4e3,1,1),x);y.rotation.x=-Math.PI/2,y.position.y=-.02,y.receiveShadow=!0,h.add(y);const M=new Pt({mass:0,material:e.groundMat});M.addShape(new cs(new T(2e3,.5,2e3))),M.position.set(0,-.5,0),t.addBody(M),d.push(M);const w=X_(p,g),S=K_(),b=q_(p,i,w,v),A=new Q(b,S);A.position.y=.01,A.receiveShadow=!0,h.add(A),l.skid!==!1&&j_(h,p,g,w);const _=new It({color:14474454,roughness:.7,metalness:0,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),E=.2,N=i/2-E/2-.05,D=new Q(ma(p,N,E),_);D.position.y=.016,h.add(D);const F=new Q(ma(p,-N,E),_);if(F.position.y=.016,h.add(F),l.kerbs!==!1){const j=t1(),k=V_(g,45e-5,8);for(const V of[1,-1]){const Y=new Q(Y_(p,V*i/2,o,V,k,v),j);Y.receiveShadow=!0,Y.castShadow=!1,h.add(Y)}}if((l.ground||"grass")!=="city"){const j=Q_(l.ground||"grass"),k=i/2+o+.7;for(const V of[1,-1]){const Y=new Q(ma(p,V*k,1.6),j);Y.position.y=.004,Y.receiveShadow=!0,h.add(Y)}}l.gravel&&Z_(h,p,g,m,c);const R=e1(),L=new It({map:R,roughness:.6,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),U=new Q(new Ce(i,1.6),L);U.rotation.x=-Math.PI/2,U.position.copy(p[0].pos).add(new z(0,.014,0));const q=Math.atan2(p[0].tan.x,p[0].tan.z);U.rotation.z=-q,h.add(U),v1(h,p[0]),y1(h,p[0],i),l.barrier==="wall"?C1(h,p,a):M1(h,p,a),l.tireStacks&&S1(h,p,g,a-1.4),l.sponsors&&w1(h,p,a+1.6),l.pit&&f1(h,p[0]),l.catchFence&&p1(h,p,c),l.brakeMarkers&&m1(h,p,g,c),l.trees&&h1(h,p,l.trees),l.buildings&&P1(h,p,c),l.mountains&&u1(h,l.mountains),l.grandstands&&d1(h,p,c),l.rocks&&L1(h,p,c),l.clouds!==!1&&g1(h),b1(t,p,a,e,d),l.fog&&(s.fog=new vr(l.fog[0],l.fog[1],l.fog[2]));const H={position:new z().copy(p[0].pos).add(p[0].tan.clone().multiplyScalar(-6)).add(new z(0,1,0)),yaw:Math.atan2(p[0].tan.x,p[0].tan.z)};function G(){s.remove(h),k_(h);for(const j of d)t.removeBody(j)}return{id:n.id,name:n.name,curve:f,frames:p,spawn:H,width:i,kerbWidth:o,armcoOffset:a,racingLineOffset:w,isGravel:j=>m.has(j),length:f.getLength(),dispose:G}}function k_(s){s.traverse(t=>{t.geometry&&t.geometry.dispose();const e=t.material?Array.isArray(t.material)?t.material:[t.material]:[];for(const n of e){for(const i in n){const o=n[i];o&&o.isTexture&&o.dispose()}n.dispose()}})}function G_(s,t){const e=[];for(let n=0;n<t;n++){const i=n/t,o=s.getPointAt(i),r=s.getTangentAt(i).normalize(),a=new z(-r.z,0,r.x).normalize();e.push({t:i,pos:o,tan:r,left:a})}return e}function H_(s){const t=[0];for(let e=1;e<s.length;e++)t.push(t[e-1]+s[e].pos.distanceTo(s[e-1].pos));return t}function W_(s){const t=s.length,e=new Array(t).fill(0);for(let i=0;i<t;i++){const o=s[i].tan,r=s[(i+1)%t].tan;e[i]=1-o.dot(r)}const n=new Array(t).fill(0);for(let i=0;i<t;i++){let o=0;for(let r=-3;r<=3;r++)o+=e[(i+r+t)%t];n[i]=o/7}return n}function V_(s,t,e){const n=s.length,i=new Array(n).fill(!1);for(let r=0;r<n;r++)i[r]=s[r]>t;const o=new Array(n).fill(!1);for(let r=0;r<n;r++)for(let a=-e;a<=e;a++)if(i[(r+a+n)%n]){o[r]=!0;break}return o}function ma(s,t,e){const n=s.length,i=new Float32Array(n*2*3),o=new Float32Array(n*2*2),r=new Float32Array(n*2*3);for(let c=0;c<n;c++){const h=s[c],d=h.pos.clone().add(h.left.clone().multiplyScalar(t-e/2)),u=h.pos.clone().add(h.left.clone().multiplyScalar(t+e/2));i.set([d.x,d.y,d.z],c*2*3),i.set([u.x,u.y,u.z],(c*2+1)*3),o.set([0,c/n],c*2*2),o.set([1,c/n],(c*2+1)*2),r.set([0,1,0],c*2*3),r.set([0,1,0],(c*2+1)*3)}const a=[];for(let c=0;c<n;c++){const h=c*2,d=c*2+1,u=(c+1)%n*2,f=(c+1)%n*2+1;a.push(h,u,d,d,u,f)}const l=new ae;return l.setAttribute("position",new ne(i,3)),l.setAttribute("uv",new ne(o,2)),l.setAttribute("normal",new ne(r,3)),l.setIndex(a),l}function X_(s,t){const e=s.length,n=new Float32Array(e);for(let o=0;o<e;o++){const r=s[o].tan,a=s[(o+1)%e].tan,l=r.x*a.z-r.z*a.x,c=Math.min(3.2,t[o]*900);n[o]=(l>0?-1:1)*c*(t[o]>8e-4?1:0)}let i=n;for(let o=0;o<3;o++){const r=new Float32Array(e);for(let a=0;a<e;a++){let l=0;for(let c=-6;c<=6;c++)l+=i[(a+c+e)%e];r[a]=l/13}i=r}return i}function q_(s,t,e,n){const i=s.length,o=11,r=new Float32Array(i*o*3),a=new Float32Array(i*o*2),l=new Float32Array(i*o*3),c=new Float32Array(i*o*3);for(let u=0;u<i;u++){const f=s[u],p=n[u],v=e[u],g=.93+.1*de(p*.013,.37,3);for(let m=0;m<o;m++){const x=m/(o-1),y=(.5-x)*t,M=f.pos.clone().add(f.left.clone().multiplyScalar(y)),w=u*o+m;r.set([M.x,M.y,M.z],w*3),a.set([x,p/4],w*2),l.set([0,1,0],w*3);const S=Math.abs(y-v),b=Math.exp(-((S-.85)**2)/(2*.55*.55))+Math.exp(-((S+.85)**2)/(2*.55*.55)),A=1-.24*Math.min(1,b)-.08*Math.exp(-S*S/4),E=1+Math.max(0,Math.abs(y)/(t/2)-.82)/.18*.1,N=g*A*E;c.set([N,N,N*1.003],w*3)}}const h=[];for(let u=0;u<i;u++){const f=u*o,p=(u+1)%i*o;for(let v=0;v<o-1;v++)h.push(f+v,p+v,f+v+1),h.push(f+v+1,p+v,p+v+1)}const d=new ae;return d.setAttribute("position",new ne(r,3)),d.setAttribute("uv",new ne(a,2)),d.setAttribute("normal",new ne(l,3)),d.setAttribute("color",new ne(c,3)),d.setIndex(h),d}function Y_(s,t,e,n,i,o){const r=s.length,a=[],l=[],c=[],h=o[r-1]+s[0].pos.distanceTo(s[r-1].pos),d=3;let u=-1,f=!1;for(let v=0;v<=r;v++){const g=v%r,m=s[g];if(i[g]){const x=v===r?h:o[g],y=.5+.5*Math.sin(x*Math.PI*2/1),M=.05+.024*y,w=.014+.01*y,S=(b,A)=>{const _=m.pos.clone().add(m.left.clone().multiplyScalar(t+n*b));a.push(_.x,A,_.z)};if(S(0,.012),S(e*.38,M),S(e,w),l.push(0,x,.45,x,1,x),f){const b=u,A=a.length/3-d;for(let _=0;_<d-1;_++)n>0?c.push(b+_,A+_,b+_+1,b+_+1,A+_,A+_+1):c.push(b+_,b+_+1,A+_,b+_+1,A+_+1,A+_)}u=a.length/3-d,f=!0}else f=!1}const p=new ae;return p.setAttribute("position",new ne(new Float32Array(a),3)),p.setAttribute("uv",new ne(new Float32Array(l),2)),p.setIndex(c),p.computeVertexNormals(),p}function j_(s,t,e,n,i){const o=t.length,r=new bi({color:1447450,transparent:!0,opacity:.3,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),a=[];let l=0;for(;l<o;)if(e[l]>.004){let p=l;for(;p<o&&e[p]>.0016;)p++;a.push([Math.max(0,l-10),Math.min(o-1,p+4)]),l=p+12}else l++;const c=[],h=[];let d=0;for(const[p,v]of a)for(const g of[-.85,.85]){const m=(Math.random()-.5)*.3;for(let x=p;x<=v;x++){const y=t[x],M=n[x]+g+m,w=.16,S=y.pos.clone().add(y.left.clone().multiplyScalar(M+w)),b=y.pos.clone().add(y.left.clone().multiplyScalar(M-w));if(c.push(S.x,.018,S.z,b.x,.018,b.z),x>p){const A=d+(x-p)*2;h.push(A-2,A,A-1,A-1,A,A+1)}}d=c.length/3}if(!c.length)return;const u=new ae;u.setAttribute("position",new ne(new Float32Array(c),3)),u.setIndex(h),u.computeVertexNormals();const f=new Q(u,r);f.renderOrder=2,s.add(f)}function Z_(s,t,e,n,i){const o=t.length,r=[];let a=0;for(;a<o;)if(e[a]>.0045){let h=a,d=0;for(;h<o&&e[h]>.002;)e[h]>d&&(d=e[h]),h++;h-a>6&&r.push({i0:Math.max(0,a-14),i1:Math.min(o-1,h+8),peak:d}),a=h+10}else a++;r.sort((h,d)=>d.peak-h.peak);const l=r.slice(0,4),c=$_();for(const h of l){const d=Math.floor((h.i0+h.i1)/2),u=t[d].tan,f=t[(d+1)%o].tan,v=u.x*f.z-u.z*f.x>0?1:-1,g=i.road/2+i.kerb+.3,m=i.armco-.6,x=[],y=[],M=[];let w=0;for(let A=h.i0;A<=h.i1;A++){const _=t[A%o];n.add(A%o);const E=_.pos.clone().add(_.left.clone().multiplyScalar(v*g)),N=_.pos.clone().add(_.left.clone().multiplyScalar(v*m));x.push(E.x,.006,E.z,N.x,.006,N.z),y.push(0,A*.5,3,A*.5),A>h.i0&&M.push(w-2,w,w-1,w-1,w,w+1),w+=2}const S=new ae;S.setAttribute("position",new ne(new Float32Array(x),3)),S.setAttribute("uv",new ne(new Float32Array(y),2)),S.setIndex(M),S.computeVertexNormals();const b=new Q(S,c);b.receiveShadow=!0,s.add(b)}}function K_(){const s=_i(1024,(n,i)=>{const o=de(n*28,i*28,5),r=de(n*95+11,i*95+5,2),a=de(n*7+4,i*7+9,3),l=de(n*2.3+17,i*2.3+6,3);let c=.112+o*.078+a*.028+(l-.5)*.045;r>.68&&(c+=.09),r<.16&&(c-=.04);const h=c*.96,d=c*.98,u=c*1.04;return[h,d,u]});s.wrapS=s.wrapT=ye,s.repeat.set(3,1),s.anisotropy=16,s.colorSpace=Qt;const t=_r(512,2.4);t.wrapS=t.wrapT=ye,t.repeat.set(3,1);const e=_i(512,(n,i)=>{const o=de(n*6+3,i*6+7,4)*.26+.7,r=de(n*2+8,i*2+2,3)*.08;return[o-r,o-r,o-r]});return e.wrapS=e.wrapT=ye,e.repeat.set(3,1),new It({map:s,vertexColors:!0,normalMap:t,normalScale:new nt(.78,.78),roughnessMap:e,roughness:.86,metalness:0,envMapIntensity:.55,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function J_(){const s=_i(1024,(e,n)=>{const i=de(e*65,n*65,5),o=de(e*5+9,n*5+3,4),r=de(e*11+31,n*11+17,3),a=de(e*3+2,n*3+7,3),l=1+.1*Math.sin(e*Math.PI*8);let c=(.205+i*.15+o*.15+a*.11+r*.05)*l,h=c*(.52+r*.42),d=c*(.35+a*.11);return[h,c,d]});s.wrapS=s.wrapT=ye,s.repeat.set(38,38),s.anisotropy=16,s.colorSpace=Qt;const t=_r(256,.9);return t.wrapS=t.wrapT=ye,t.repeat.set(80,80),new It({map:s,normalMap:t,normalScale:new nt(.45,.45),roughness:.95,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function Q_(s="grass"){const t={grass:[.17,.27,.13],alpine:[.14,.24,.14],sand:[.6,.49,.3]}[s]||[.17,.27,.13],e=s==="sand"?[.58,.46,.28]:[.34,.27,.17],n=_i(512,(i,o)=>{const r=de(i*14,o*60,4),a=de(i*6+4,o*22+8,3),l=Math.min(1,Math.abs(i-.5)*2.6),c=e[0]+r*.16,h=e[1]+r*.13,d=e[2]+r*.08,u=t[0]+a*.12,f=t[1]+a*.16,p=t[2]+a*.07,v=dr(.45,1,l);return[c*(1-v)+u*v,h*(1-v)+f*v,d*(1-v)+p*v]});return n.wrapS=n.wrapT=ye,n.repeat.set(1,60),n.anisotropy=8,n.colorSpace=Qt,new It({map:n,roughness:.97,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function $_(){const s=_i(512,(t,e)=>{const n=de(t*40,e*40,4),i=1+.05*Math.sin(e*Math.PI*50),o=(.42+n*.2)*i;return[o*1.02,o*.95,o*.78]});return s.wrapS=s.wrapT=ye,s.anisotropy=8,s.colorSpace=Qt,new It({map:s,roughness:1,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function t1(){const s=document.createElement("canvas");s.width=64,s.height=64;const t=s.getContext("2d");t.fillStyle="#e02020",t.fillRect(0,0,64,64),t.fillStyle="#f9f9f9",t.fillRect(0,32,64,32);for(let n=0;n<180;n++){const i=Math.random()*64,o=Math.random()*64,r=Math.random()*.06;t.fillStyle=`rgba(0,0,0,${r})`,t.fillRect(i,o,1+Math.random()*2,1+Math.random()*2)}const e=new Le(s);return e.wrapS=e.wrapT=ye,e.repeat.set(1,1),e.colorSpace=Qt,e.generateMipmaps=!0,e.minFilter=ns,e.magFilter=Je,e.anisotropy=8,new It({map:e,roughness:.48,metalness:0,envMapIntensity:.4,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function e1(){const s=document.createElement("canvas");s.width=256,s.height=32;const t=s.getContext("2d");for(let n=0;n<16;n++)for(let i=0;i<2;i++)t.fillStyle=(n+i)%2===0?"#ffffff":"#000000",t.fillRect(n*16,i*16,16,16);const e=new Le(s);return e.colorSpace=Qt,e}function n1(){const t=document.createElement("canvas");t.width=t.height=512;const e=t.getContext("2d");e.clearRect(0,0,512,512);const n=[],i=4+Math.floor(Math.random()*2);for(let a=0;a<i;a++){const l=a/i*Math.PI*2+Math.random()*1.4,c=512*(.06+Math.random()*.14);n.push({x:512*.5+Math.cos(l)*c*1.1,y:512*.5+Math.sin(l)*c*.75,r:512*(.12+Math.random()*.09)})}const o=[];for(let a=0;a<260;a++){const l=n[Math.floor(Math.random()*n.length)],c=Math.random()*Math.PI*2,h=Math.pow(Math.random(),.65)*l.r;o.push({x:Math.min(512*.92,Math.max(512*.08,l.x+Math.cos(c)*h*1.05)),y:Math.min(512*.9,Math.max(512*.1,l.y+Math.sin(c)*h*.9)),r:8+Math.random()*24,hue:.29+(Math.random()-.5)*.08})}o.sort((a,l)=>l.y-a.y);for(const a of o){const l=a.y/512,c=Math.pow(1-l*.9,1.4),h=56+c*104,d=16+c*62,u=16+c*22,f=.88+Math.random()*.1,p=e.createRadialGradient(a.x,a.y-a.r*.4,a.r*.06,a.x,a.y,a.r*1.05);p.addColorStop(0,`rgba(${d+28|0},${Math.min(255,h+32|0)},${u+10|0},${f})`),p.addColorStop(.55,`rgba(${d|0},${h|0},${u|0},${f*.9})`),p.addColorStop(.85,`rgba(${d*.55|0},${h*.52|0},${u*.45|0},${f*.5})`),p.addColorStop(1,"rgba(0,0,0,0)"),e.fillStyle=p,e.beginPath(),e.arc(a.x,a.y,a.r*1.05,0,Math.PI*2),e.fill()}const r=new Le(t);return r.colorSpace=Qt,r}function i1(){const s=["VELOCE","APEX","NITRO","AERO","TORQUE","VORTEX","RACE1","FLUX"],t=["#e8e8ea","#101418","#c41e1e","#1e40af","#059669","#f5b301","#0891b2","#7c3aed"];return s.map((e,n)=>{const r=document.createElement("canvas");r.width=512,r.height=80;const a=r.getContext("2d");a.fillStyle=t[n%t.length],a.fillRect(0,0,512,80);const l=n%t.length===0||n%t.length===5?"#16181d":"#f4f6f8";a.fillStyle=l,a.beginPath(),a.moveTo(20,60),a.lineTo(50,18),a.lineTo(70,18),a.lineTo(40,60),a.closePath(),a.fill(),a.fillRect(58,18,14,42),a.font="bold 50px Arial Black, Arial",a.textBaseline="middle",a.fillText(e,100,44);const c=new Le(r);return c.colorSpace=Qt,c.anisotropy=8,c})}function s1(s){const n=document.createElement("canvas");n.width=2048,n.height=64;const i=n.getContext("2d");i.fillStyle="#15181d",i.fillRect(0,0,2048,64);for(const r of[0,1952])for(let a=0;a<6;a++)for(let l=0;l<4;l++)i.fillStyle=(a+l)%2?"#e8e8e8":"#15181d",i.fillRect(r+a*16,l*16,16,16);i.fillStyle="#e8eaee",i.font="bold 40px Arial Black, Arial",i.textAlign="center",i.textBaseline="middle",i.letterSpacing="14px",i.fillText(s,2048/2,64/2+2),i.fillStyle="#c41e1e",i.fillRect(2048/2-460,56,920,4);const o=new Le(n);return o.colorSpace=Qt,o.anisotropy=8,o}function o1(s){const t=document.createElement("canvas");t.width=256,t.height=192;const e=t.getContext("2d");e.fillStyle="#f2f3f5",e.fillRect(0,0,256,192),e.strokeStyle="#c41e1e",e.lineWidth=14,e.strokeRect(7,7,242,178),e.fillStyle="#c41e1e",e.font="bold 104px Arial Black, Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(s,128,102);const n=new Le(t);return n.colorSpace=Qt,n.anisotropy=8,n}function r1(){const e=document.createElement("canvas");e.width=512,e.height=96;const n=e.getContext("2d");n.fillStyle="#7e8288",n.fillRect(0,0,512,96);for(let o=0;o<512;o+=64)n.fillStyle=o/64%2?"#787c82":"#83878d",n.fillRect(o,0,64,96),n.fillStyle="rgba(30,32,36,0.45)",n.fillRect(o,0,2,96);for(let o=0;o<90;o++){const r=Math.random()*512;n.fillStyle=`rgba(40,44,48,${.04+Math.random()*.08})`,n.fillRect(r,0,1+Math.random()*3,96)}for(const o of[96*.26,96*.74])n.fillStyle="#565a60",n.fillRect(0,o-4,512,9),n.fillStyle="rgba(255,255,255,0.18)",n.fillRect(0,o-4,512,2),n.fillStyle="rgba(0,0,0,0.35)",n.fillRect(0,o+5,512,2);const i=new Le(e);return i.colorSpace=Qt,i.anisotropy=8,i}function a1(){const e=document.createElement("canvas");e.width=96,e.height=128;const n=e.getContext("2d"),i=n.createLinearGradient(0,0,96,0);i.addColorStop(0,"#2b2e34"),i.addColorStop(.5,"#565b62"),i.addColorStop(1,"#33363c"),n.fillStyle=i,n.fillRect(0,0,96,128);const o=15;for(let a=1;a<o;a++){const l=Math.round(a*128/o);n.fillStyle="rgba(0,0,0,0.5)",n.fillRect(0,l-1,96,2),n.fillStyle="rgba(255,255,255,0.16)",n.fillRect(0,l+1,96,1)}n.fillStyle="#2c2e33",n.fillRect(0,110,96,6);const r=new Le(e);return r.colorSpace=Qt,r.anisotropy=8,r}function l1(){const e=document.createElement("canvas");e.width=512,e.height=256;const n=e.getContext("2d");n.clearRect(0,0,512,256);for(let a=0;a<18;a++){const l=256+(Math.random()-.5)*512*.65,c=256*.72+(Math.random()-.5)*256*.28,h=30+Math.random()*55,d=n.createRadialGradient(l,c,2,l,c,h),u=208+Math.random()*20;d.addColorStop(0,`rgba(${u-12},${u-8},${u+10},0.24)`),d.addColorStop(.6,`rgba(${u-16},${u-12},${u+6},0.11)`),d.addColorStop(1,"rgba(210,218,235,0)"),n.fillStyle=d,n.beginPath(),n.arc(l,c,h,0,Math.PI*2),n.fill()}for(let a=0;a<60;a++){const l=256+(Math.random()-.5)*512*.78,c=256*.5+(Math.random()-.5)*256*.46,h=14+Math.random()*38,d=n.createRadialGradient(l,c-h*.25,h*.05,l,c,h),u=240+Math.random()*15,f=Math.min(255,u+8),p=Math.min(255,u+2);d.addColorStop(0,`rgba(${f},${p},${u-5},0.68)`),d.addColorStop(.55,`rgba(${u},${u},${u+3},0.42)`),d.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=d,n.beginPath(),n.arc(l,c,h,0,Math.PI*2),n.fill()}const i=n.getImageData(0,0,512,256),o=i.data;for(let a=0;a<256;a++){const l=a/255*2-1;for(let c=0;c<512;c++){const h=c/511*2-1,d=Math.hypot(h,l);let u=d<=.45?1:Math.max(0,1-(d-.45)/.55);u=u*u*(3-2*u),o[(a*512+c)*4+3]*=u}}n.putImageData(i,0,0);const r=new Le(e);return r.colorSpace=Qt,r}function Io(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function dr(s,t,e){return e=Math.max(0,Math.min(1,(e-s)/(t-s))),e*e*(3-2*e)}function c1(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,o=t-n,r=Io(e,n),a=Io(e+1,n),l=Io(e,n+1),c=Io(e+1,n+1),h=dr(0,1,i),d=dr(0,1,o);return(r*(1-h)+a*h)*(1-d)+(l*(1-h)+c*h)*d}function de(s,t,e){let n=.5,i=1,o=0,r=0;for(let a=0;a<e;a++)o+=n*c1(s*i,t*i),r+=n,n*=.5,i*=2;return o/r}function _i(s,t){const e=document.createElement("canvas");e.width=s,e.height=s;const n=e.getContext("2d"),i=n.createImageData(s,s);for(let r=0;r<s;r++)for(let a=0;a<s;a++){const[l,c,h]=t(a/s,r/s),d=(r*s+a)*4;i.data[d]=Math.min(255,Math.max(0,l*255)),i.data[d+1]=Math.min(255,Math.max(0,c*255)),i.data[d+2]=Math.min(255,Math.max(0,h*255)),i.data[d+3]=255}n.putImageData(i,0,0);const o=new Le(e);return o.needsUpdate=!0,o}function _r(s,t){const e=new Float32Array(s*s);for(let a=0;a<s;a++)for(let l=0;l<s;l++)e[a*s+l]=de(l/s*8,a/s*8,4);const n=document.createElement("canvas");n.width=s,n.height=s;const i=n.getContext("2d"),o=i.createImageData(s,s);for(let a=0;a<s;a++)for(let l=0;l<s;l++){const c=e[a*s+(l-1+s)%s],h=e[a*s+(l+1)%s],d=e[(a-1+s)%s*s+l],u=e[(a+1)%s*s+l],f=(h-c)*t,p=(u-d)*t,v=-f,g=-p,m=1,x=Math.hypot(v,g,m),y=(a*s+l)*4;o.data[y]=(v/x*.5+.5)*255,o.data[y+1]=(g/x*.5+.5)*255,o.data[y+2]=(m/x*.5+.5)*255,o.data[y+3]=255}i.putImageData(o,0,0);const r=new Le(n);return r.needsUpdate=!0,r}function h1(s,t,e={}){const n=e.type||"broadleaf",i=e.count||600,o=e.nearMin||35,r=e.band?e.band[1]:800;if(n==="pine"){Ph(s,t,i,o,r);return}const a=new It({color:4008984,roughness:.96,metalness:0,envMapIntensity:.1}),l=new It({map:n1(),alphaTest:.38,roughness:.88,metalness:0,side:Ae,envMapIntensity:.2}),c=new fe(.2,.4,3.2,8);c.translate(0,1.6,0);const h=new Ce(7.2,7.4);h.translate(0,3.7,0);const d=h.clone();d.rotateY(Math.PI/3);const u=h.clone();u.rotateY(2*Math.PI/3);const f=ml([h,d,u]);f.translate(0,2.4,0);{const A=f.getAttribute("normal"),_=f.getAttribute("position"),E=6.1;for(let N=0;N<_.count;N++){const D=_.getX(N),F=_.getY(N)-E,R=_.getZ(N),L=Math.hypot(D,F,R)||1;A.setXYZ(N,D/L,F/L*.6+.55,R/L)}A.needsUpdate=!0}const p=i,v=new Gn(c,a,p),g=new Gn(f,l,p);v.castShadow=v.receiveShadow=!0,g.castShadow=!0,gl(g);const m=[],x=Math.max(6,Math.round(i/20));for(let A=0;A<x;A++)m.push({x:(Math.random()*2-1)*r,z:(Math.random()*2-1)*r,r:16+Math.random()*40,size:.75+Math.random()*.5});const y=new $t,M=new on,w=new z,S=new Nt;let b=0;for(let A=0;A<p*6&&b<p;A++){let _,E,N=1;if(Math.random()<.78){const L=m[Math.floor(Math.random()*m.length)],U=Math.random()*Math.PI*2,q=(Math.random()+Math.random())*.5*L.r;_=L.x+Math.cos(U)*q,E=L.z+Math.sin(U)*q,N=L.size}else _=(Math.random()*2-1)*r,E=(Math.random()*2-1)*r;if(Math.abs(_)>r||Math.abs(E)>r)continue;const D=new z(_,0,E);let F=1/0;for(let L=0;L<t.length;L+=6){const U=D.distanceToSquared(t[L].pos);U<F&&(F=U)}if(F<o*o)continue;const R=N*(.55+Math.random()*1.05);w.set(R,R*(.85+Math.random()*.5),R),M.setFromEuler(new Wn(0,Math.random()*Math.PI*2,0)),y.compose(D,M,w),v.setMatrixAt(b,y),g.setMatrixAt(b,y),S.setHSL(.25+(Math.random()-.5)*.1,.4+Math.random()*.2,.34+Math.random()*.18),g.setColorAt(b,S),b++}v.count=b,g.count=b,v.instanceMatrix.needsUpdate=!0,g.instanceMatrix.needsUpdate=!0,g.instanceColor&&(g.instanceColor.needsUpdate=!0),s.add(v),s.add(g),Ph(s,t,Math.round(i*.28),o,r)}function Ph(s,t,e,n,i){const o=new It({color:4862754,roughness:.95,metalness:0,envMapIntensity:.1}),r=new It({color:3032359,roughness:.92,metalness:0,envMapIntensity:.12,flatShading:!0}),a=new Qi(1.7,3,9);a.translate(0,2.6,0);const l=new Qi(1.3,2.6,9);l.translate(0,4.1,0);const c=new Qi(.8,2.2,9);c.translate(0,5.6,0);const h=ml([a,l,c]),d=new fe(.16,.26,1.8,6);d.translate(0,.9,0);const u=e,f=new Gn(d,o,u),p=new Gn(h,r,u);f.castShadow=f.receiveShadow=!0,p.castShadow=!0;const v=[],g=Math.max(4,Math.round(e/16));for(let S=0;S<g;S++)v.push({x:(Math.random()*2-1)*i,z:(Math.random()*2-1)*i,r:12+Math.random()*30});const m=new $t,x=new on,y=new z,M=new Nt;let w=0;for(let S=0;S<u*7&&w<u;S++){let b,A;if(Math.random()<.8){const F=v[Math.floor(Math.random()*v.length)],R=Math.random()*Math.PI*2,L=(Math.random()+Math.random())*.5*F.r;b=F.x+Math.cos(R)*L,A=F.z+Math.sin(R)*L}else b=(Math.random()*2-1)*i,A=(Math.random()*2-1)*i;if(Math.abs(b)>i||Math.abs(A)>i)continue;const _=new z(b,0,A);let E=1/0;for(let F=0;F<t.length;F+=6){const R=_.distanceToSquared(t[F].pos);R<E&&(E=R)}if(E<n*n)continue;const N=Math.sqrt(E);if(N>110&&Math.random()<(N-110)/Math.max(1,i-110)*.75)continue;const D=.8+Math.random()*1.5;y.set(D*(.7+Math.random()*.3),D,D*(.7+Math.random()*.3)),x.setFromEuler(new Wn(0,Math.random()*Math.PI*2,0)),m.compose(_,x,y),f.setMatrixAt(w,m),p.setMatrixAt(w,m),M.setHSL(.3+(Math.random()-.5)*.1,.35+Math.random()*.25,.48+Math.random()*.22),p.setColorAt(w,M),w++}f.count=w,p.count=w,f.instanceMatrix.needsUpdate=!0,p.instanceMatrix.needsUpdate=!0,p.instanceColor&&(p.instanceColor.needsUpdate=!0),s.add(f),s.add(p)}function u1(s,t="far"){const e=new It({vertexColors:!0,roughness:1,metalness:0,envMapIntensity:.42,fog:!0}),n={far:{haze:12174022,rock:7305348,forest:5464140,snow:14673646,bands:[[1450,650,15,230,300,.16,.3,!0],[2350,750,21,180,230,.46,.34,!0],[3300,900,27,130,170,.74,.28,!1]]},near:{haze:12898520,rock:7042176,forest:5003846,snow:15660024,bands:[[780,420,13,340,360,.1,.26,!0],[1450,600,19,270,300,.3,.3,!0],[2500,800,25,190,220,.55,.3,!1]]},mesa:{haze:13809548,rock:10246198,forest:9072712,snow:15325624,bands:[[1100,520,12,190,230,.14,.3,!1],[1950,700,18,150,190,.4,.32,!1],[2950,900,24,120,150,.62,.28,!1]]},hills:{haze:14076072,rock:9408608,forest:6057028,snow:15656655,bands:[[1350,500,11,85,100,.18,.3,!1],[2150,650,16,65,85,.46,.32,!1],[3e3,800,21,50,70,.72,.26,!1]]}},i=n[t]||n.far,o=new Nt(i.haze),r=new Nt(i.rock),a=new Nt(i.forest),l=new Nt(i.snow),c=new Nt,h=i.bands;for(let d=0;d<h.length;d++){const[u,f,p,v,g,m,x,y]=h[d];for(let M=0;M<p;M++){const w=u+Math.random()*f,S=M/p*Math.PI*2+(Math.random()-.5)*(Math.PI/p)*1.6,b=Math.cos(S)*w,A=Math.sin(S)*w,_=v+Math.random()*g,E=(250+Math.random()*300)*(1+d*.13),N=new Qi(E,_,36,20),D=N.getAttribute("position"),F=[],R=d*31.7+M*7.13,L=Math.min(1,Math.max(0,(w-700)/2600)),U=Math.random()*Math.PI*2,q=_*(.1+Math.random()*.22),H=Math.cos(U)*q,G=Math.sin(U)*q;for(let k=0;k<D.count;k++){const V=D.getX(k),Y=D.getY(k),et=D.getZ(k),ht=Math.atan2(et,V),ut=(Y+_/2)/_,it=de(ht*2.2+R,R*.37,5),ft=1-Math.abs(it*2-1),pt=de(ht*6.5+R*1.7,ut*4+R,4),dt=de(ht*3.4+R*2.3,ut*2+R,3),Mt=1-ut*.35,O=ft*1.02+pt*.58-dt*.42,lt=(.76+O*.52)*Mt+.12,Z=Math.pow(Math.max(0,Math.min(1,ut)),1.7);D.setX(k,V*lt+H*Z),D.setZ(k,et*lt+G*Z);const ct=1-dr(.78,.97,ut);D.setY(k,Y+((ft-.45)*_*.24+(pt-.5)*_*.1)*ct);const tt=.58+(1-ft)*.22+(pt-.5)*.2;y&&ut>tt?c.copy(l).lerp(r,Math.min(.6,Math.max(0,dt-.45)*1.5)):ut<.2?c.copy(a).lerp(r,pt*.5):c.copy(r).lerp(a,Math.max(0,.34-ut)*1.3),c.multiplyScalar(.84+O*.2);const Tt=Math.min(.95,m+L*x);c.lerp(o,Tt),F.push(c.r,c.g,c.b)}N.setAttribute("color",new ee(F,3)),N.computeVertexNormals();const j=new Q(N,e);j.position.set(b,_/2-12,A),j.rotation.y=Math.random()*Math.PI,s.add(j)}}}function d1(s,t,e){const n=new It({color:10330534,roughness:.78,metalness:.12}),i=new It({color:3817287,roughness:.5,metalness:.6}),o=new It({color:11711928,roughness:.6,metalness:.25,side:Ae}),r=new It({color:5133146,roughness:.85,metalness:.1}),a=9,l=30,c=.62,h=1,d=[595,245,430],u=e.armco+4.5,f=new Rt(.34,.5,.3),p=a*44,v=new Gn(f,new It({roughness:.9,metalness:0}),p*d.length),g=new $t,m=new on,x=new z(1,1,1),y=new Nt;let M=0;for(const w of d){const S=t[w],b=S.pos.clone().add(S.left.clone().multiplyScalar(-u)),A=Math.atan2(S.left.x,S.left.z),_=new re;for(let L=0;L<a;L++){const U=new Q(new Rt(l,c,h),n);U.position.set(0,1.2+L*c+c/2,-L*h),U.castShadow=U.receiveShadow=!0,_.add(U)}const E=new Q(new Rt(l,1.2,a*h+1),n);E.position.set(0,.6,-9/2+.5),E.castShadow=E.receiveShadow=!0,_.add(E);const N=1.2+a*c+1.9,D=new Q(new Rt(l,N,.3),r);D.position.set(0,N/2+.5,-8.5*h-.3),D.castShadow=!0,_.add(D);for(const L of[-1,1]){const U=new Q(new Rt(.3,1.2+a*c,a*h+1),r);U.position.set(L*(l/2+.15),(1.2+a*c)/2,-9/2+.5),_.add(U)}const F=new Q(new Rt(l+1.5,.25,a*h+3),o);F.position.set(0,1.2+a*c+1.9,-9/2+1.2),F.rotation.x=.1,F.castShadow=!0,_.add(F);const R=new Q(new Rt(l+1.5,.7,.22),i);R.position.set(0,1.2+a*c+1.9-.85,-9/2+1.2+(a*h+3)/2-.1),R.castShadow=!0,_.add(R);for(const L of[-l/2+2,-l/6,l/6,l/2-2]){const U=new Q(new Rt(.5,a*c+2.4,.5),i);U.position.set(L,(a*c+2.4)/2+1.2,-8*h),U.castShadow=!0,_.add(U)}_.position.copy(b),_.rotation.y=A,s.add(_),m.setFromEuler(new Wn(0,A,0));for(let L=0;L<a;L++)for(let U=0;U<44;U++){if(Math.random()<.28)continue;const q=(U/43-.5)*(l-2),H=1.2+L*c+c+.25,G=-L*h+(Math.random()-.5)*.2,j=new z(q,H,G).applyQuaternion(m).add(b);g.compose(j,m,x),v.setMatrixAt(M,g),y.setHSL(Math.random(),.3+Math.random()*.3,.35+Math.random()*.22),v.setColorAt(M,y),M++}}v.count=M,v.instanceMatrix.needsUpdate=!0,v.instanceColor&&(v.instanceColor.needsUpdate=!0),v.castShadow=!1,s.add(v)}function f1(s,t){const e=new re,n=new It({color:10198432,roughness:.85,metalness:.05}),i=new It({color:5593180,roughness:.9,metalness:.05}),o=new un({color:2832711,roughness:.15,metalness:.8,envMapIntensity:1.2}),r=new It({color:2303531,roughness:.6,metalness:.4}),a=-45,l=100,c=l-a,h=(a+l)/2,d=new Q(new Ce(11.5,c+10),i);d.rotation.x=-Math.PI/2,d.position.set(-20.5,.012,h),d.receiveShadow=!0,e.add(d);const u=new Q(new Rt(.4,1,c),n);u.position.set(-14.6,.5,h),u.castShadow=u.receiveShadow=!0,e.add(u);const f=new Q(new Rt(10,7.6,c),n);f.position.set(-31.5,3.8,h),f.castShadow=f.receiveShadow=!0,e.add(f);const p=new It({map:a1(),roughness:.78,metalness:.15}),v=new Rt(.22,3.4,.22),g=12;for(let w=0;w<g;w++){const S=a+8+w*((c-16)/(g-1)),b=new Q(new Ce(4.4,3.1),p);b.position.set(-26.46,1.65,S),b.rotation.y=Math.PI/2,b.receiveShadow=!0,e.add(b);const A=new Q(new Rt(.2,.42,5),r);A.position.set(-26.4,3.42,S),A.castShadow=!0,e.add(A);const _=new Q(new Rt(.24,.12,5),i);_.position.set(-26.38,.07,S),e.add(_);for(const E of[-2.4,2.4]){const N=new Q(v,r);N.position.set(-26.4,1.7,S+E),N.castShadow=!0,e.add(N)}}const m=new Q(new Rt(.25,1.9,c-6),o);m.position.set(-26.35,5.6,h),e.add(m);for(let w=a+6;w<=l-6;w+=6){const S=new Q(new Rt(.3,1.9,.16),r);S.position.set(-26.33,5.6,w),e.add(S)}const x=new Q(new Rt(11,.3,c+2),r);x.position.set(-31.5,7.75,h),x.castShadow=!0,e.add(x);for(let w=a;w<=l;w+=4){const S=new Q(new Rt(.08,.9,.08),r);S.position.set(-26.6,8.3,w),e.add(S)}const y=new Q(new Rt(.1,.08,c),r);y.position.set(-26.6,8.72,h),e.add(y);for(const w of[-20,20,60]){const S=new Q(new Rt(6,2.6,9),n);S.position.set(-32.5,9.2,w),S.castShadow=!0,e.add(S);const b=new Q(new Rt(.2,1.2,8),o);b.position.set(-29.45,9.4,w),e.add(b)}const M=new Q(new Ce(c-10,1.15),new It({map:s1("RACER GRAND PRIX"),roughness:.55,metalness:0}));M.position.set(-26.28,7.1,h),M.rotation.y=Math.PI/2,e.add(M),e.position.copy(t.pos),e.rotation.y=Math.atan2(t.tan.x,t.tan.z),s.add(e)}function p1(s,t,e){const n=new It({color:4146249,roughness:.55,metalness:.75}),i=new It({color:2369323,roughness:.8,metalness:.3,transparent:!0,opacity:.22,side:Ae,depthWrite:!1}),o=[];for(let p=0;p<t.length;p++){const v=t[p].pos;Math.abs(v.x)<6&&v.z>-55&&v.z<135&&o.push(p)}if(!o.length)return;const r=[];let a=[o[0]];for(let p=1;p<o.length;p++)o[p]===o[p-1]+1?a.push(o[p]):(r.push(a),a=[o[p]]);if(r.push(a),r.length>1){const p=r[0],v=r[r.length-1];p[0]===0&&v[v.length-1]===t.length-1&&(r[0]=v.concat(p),r.pop())}const l=new Rt(.14,3.1,.14),c=new Gn(l,n,o.length*2);c.castShadow=!0;const h=new $t,d=new on,u=new z(1,1,1);let f=0;for(const p of[1,-1])for(const v of r){const g=[],m=[],x=[];let y=0;for(let S=0;S<v.length;S++){const b=t[v[S]],A=b.pos.clone().add(b.left.clone().multiplyScalar(p*(e.armco+.45)));S%2===0&&(d.setFromEuler(new Wn(0,Math.atan2(b.tan.x,b.tan.z),0)),h.compose(new z(A.x,1.55,A.z),d,u),c.setMatrixAt(f++,h)),g.push(A.x,.85,A.z,A.x,3.05,A.z);const _=-p*b.left.x,E=-p*b.left.z;m.push(_,0,E,_,0,E),S>0&&x.push(y-2,y,y-1,y-1,y,y+1),y+=2}const M=new ae;M.setAttribute("position",new ne(new Float32Array(g),3)),M.setAttribute("normal",new ne(new Float32Array(m),3)),M.setIndex(x);const w=new Q(M,i);gl(w),s.add(w)}c.count=f,c.instanceMatrix.needsUpdate=!0,s.add(c)}function m1(s,t,e,n){const i=t.length,o=[];let r=0;for(;r<i;)if(e[r]>.0045){let h=r,d=0;for(;h<i&&e[h]>.002;)d=Math.max(d,e[h]),h++;h-r>6&&o.push({i0:r,peak:d}),r=h+10}else r++;o.sort((h,d)=>d.peak-h.peak);const a=new It({color:5922403,roughness:.7,metalness:.4}),l=new It({color:13224909,roughness:.75,metalness:0}),c=new Ce(1.15,.85);for(const h of o.slice(0,3)){const d=t[h.i0].tan,u=t[(h.i0+4)%i].tan,p=d.x*u.z-d.z*u.x>0?1:-1;for(const v of[100,50]){const g=Math.round(v/3.2),m=(h.i0-g+i)%i,x=t[m],y=x.pos.clone().add(x.left.clone().multiplyScalar(p*(n.armco-1.6))),M=Math.atan2(x.tan.x,x.tan.z),w=new Q(c,new It({map:o1(String(v)),roughness:.5,metalness:0}));w.position.set(y.x,1.5,y.z),w.rotation.y=M,w.castShadow=!0,s.add(w);const S=new Q(c,l);S.position.set(y.x-Math.sin(M)*.02,1.5,y.z-Math.cos(M)*.02),S.rotation.y=M+Math.PI,s.add(S);const b=new Q(new Rt(.08,1.1,.08),a);b.position.set(y.x,.55,y.z),s.add(b)}}}function gl(s){const t=s.geometry;s.onBeforeRender=(e,n)=>{n.overrideMaterial&&t.setDrawRange(0,0)},s.onAfterRender=(e,n)=>{n.overrideMaterial&&t.setDrawRange(0,1/0)}}function g1(s){const t=l1(),e=new Ce(1,1);for(let n=0;n<16;n++){const i=new bi({map:t,transparent:!0,opacity:.22+Math.random()*.22,fog:!1,depthWrite:!1,side:Ae}),o=new Q(e,i),r=Math.random()*Math.PI*2,a=1e3+Math.random()*1800;o.position.set(Math.cos(r)*a,580+Math.random()*360,Math.sin(r)*a);const l=420+Math.random()*500,c=l*(.28+Math.random()*.14);o.scale.set(l,c,1),o.lookAt(0,o.position.y*.5,0),gl(o),s.add(o)}}function v1(s,t){const e=Math.atan2(t.tan.x,t.tan.z),n=t.tan.clone().normalize(),i=t.left.clone().normalize(),o=2,r=4.6,a=7,l=2.5,c=4,h=new It({color:16777215,roughness:.7,metalness:0,transparent:!0,opacity:.7,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),d=new It({color:16767050,roughness:.7,metalness:0,transparent:!0,opacity:.85,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(let u=0;u<c;u++)for(const f of[1,-1]){const p=-2.8-u*a,v=l*f,g=t.pos.clone().add(n.clone().multiplyScalar(p)).add(i.clone().multiplyScalar(v)),m=x1(o,r,.14,h);m.position.set(g.x,.0135,g.z),m.rotation.y=-e,s.add(m);const x=new Q(new Ce(o-.4,.22),d);x.rotation.x=-Math.PI/2;const y=g.clone().add(n.clone().multiplyScalar(r/2-.4));x.position.set(y.x,.014,y.z),x.rotation.z=-e,s.add(x)}}function x1(s,t,e,n){const i=new re;for(const o of[-1,1]){const r=new Q(new Ce(s,e),n);r.rotation.x=-Math.PI/2,r.position.z=o*(t/2-e/2),i.add(r)}for(const o of[-1,1]){const r=new Q(new Ce(e,t),n);r.rotation.x=-Math.PI/2,r.position.x=o*(s/2-e/2),i.add(r)}return i}function y1(s,t,e){const n=Math.atan2(t.tan.x,t.tan.z),i=t.pos.clone().add(t.tan.clone().multiplyScalar(8)),o=new re,r=new It({color:9343897,roughness:.4,metalness:.85}),a=new It({color:2303531,roughness:.55,metalness:.6}),l=8.6,c=e/2+2.6,h=c*2;for(const m of[-1,1]){for(const x of[-.35,.35])for(const y of[-.35,.35]){const M=new Q(new Rt(.12,l,.12),r);M.position.set(m*c+x,l/2,y),M.castShadow=!0,o.add(M)}for(let x=1;x<l-.5;x+=1.4){const y=new Q(new Rt(.08,1.1,.08),r);y.position.set(m*c,x,.35),y.rotation.z=.62,o.add(y);const M=y.clone();M.rotation.z=-.62,M.position.z=-.35,o.add(M)}}for(const m of[-.4,.4])for(const x of[-.4,.4]){const y=new Q(new Rt(h+1,.12,.12),r);y.position.set(0,l+m,x),y.castShadow=!0,o.add(y)}const d=12;for(let m=0;m<d;m++){const x=-h/2+(m+.5)*(h/d);for(const y of[-.4,.4]){const M=new Q(new Rt(.07,1.05,.07),r);M.position.set(x,l,y),M.rotation.z=(m%2?1:-1)*.75,o.add(M)}}const u=(()=>{const m=document.createElement("canvas");m.width=512,m.height=64;const x=m.getContext("2d");x.fillStyle="#101317",x.fillRect(0,0,512,64);for(let M=0;M<32;M++)for(let w=0;w<2;w++)(M+w)%2!==0&&(x.fillStyle="#e8e8e8",x.fillRect(M*16,w*16,16,16));x.fillStyle="#e8eaee",x.font="bold 26px Arial Black, Arial",x.textAlign="center",x.fillText("RACER GRAND PRIX",256,54);const y=new Le(m);return y.colorSpace=Qt,y})(),f=new Q(new Ce(h-2,1.1),new It({map:u,side:Ae,roughness:.6}));f.position.set(0,l-1,0),o.add(f);const p=new Q(new Rt(2.3,.7,.4),a);p.position.set(0,l-2,0),p.castShadow=!0,o.add(p);const v=new It({color:3148043,emissive:16720688,emissiveIntensity:1.4,roughness:.35});for(let m=0;m<5;m++){const x=new Q(new fe(.13,.13,.1,14),v);x.rotation.x=Math.PI/2,x.position.set(-.88+m*.44,l-2,.22),o.add(x)}const g=new Q(new Rt(.14,1.6,.14),a);g.position.set(0,l-1.2,0),o.add(g),o.position.copy(i),o.rotation.y=n,s.add(o)}function M1(s,t,e){const n=new It({color:6844020,roughness:.58,metalness:.45,side:Ae}),i=new It({color:5659746,roughness:.7,metalness:.5});for(const p of[1,-1]){const v=new Q(_1(t,e*p),n);v.castShadow=!0,s.add(v)}const o=5,r=Math.floor(t.length/o)*2,a=new Rt(.22,.85,.16),l=new Gn(a,i,r);l.castShadow=!0,l.receiveShadow=!0;let c=0;const h=new $t,d=new on,u=new z(1,1,1),f=new z(0,1,0);for(let p=0;p<t.length;p+=o){const v=t[p],g=Math.atan2(v.tan.x,v.tan.z);d.setFromAxisAngle(f,g);for(const m of[1,-1]){const x=v.pos.clone().add(v.left.clone().multiplyScalar(e*m));x.y=.425,h.compose(x,d,u),l.setMatrixAt(c++,h)}}l.count=c,l.instanceMatrix.needsUpdate=!0,s.add(l)}function _1(s,t){const e=s.length,n=[],i=[],o=[],r=[],a=.45,l=.76,c=t>0?-1:1;for(let d=0;d<e;d++){const u=s[d],f=u.pos.clone().add(u.left.clone().multiplyScalar(t));n.push(f.x,a,f.z),n.push(f.x,l,f.z),o.push(0,d/8,1,d/8);const p=u.left.x*c,v=u.left.z*c;i.push(p,0,v,p,0,v)}for(let d=0;d<e;d++){const u=d*2,f=d*2+1,p=(d+1)%e*2,v=(d+1)%e*2+1;r.push(u,p,f,f,p,v)}const h=new ae;return h.setAttribute("position",new ne(new Float32Array(n),3)),h.setAttribute("uv",new ne(new Float32Array(o),2)),h.setAttribute("normal",new ne(new Float32Array(i),3)),h.setIndex(r),h}function S1(s,t,e,n){const i=new It({color:1052688,roughness:.95,metalness:0}),o=new fe(.42,.42,.32,14);o.rotateX(Math.PI/2);const r=[];let a=0,l=-50;for(let y=0;y<t.length;y++){if(y>0&&(a+=t[y].pos.distanceTo(t[y-1].pos)),e[y]<.0055||a-l<30)continue;const M=t[(y-1+t.length)%t.length].tan,w=t[(y+1)%t.length].tan,b=M.x*w.z-M.z*w.x>0?-1:1;r.push({frameIdx:y,sign:b}),l=a}const c=6,h=3,d=.86,u=r.length*c*h;if(u===0)return;const f=new Gn(o,i,u);f.castShadow=!0,f.receiveShadow=!0;const p=new $t,v=new on,g=new z(1,1,1),m=new z(0,1,0);let x=0;for(const y of r){const M=t[y.frameIdx],w=Math.atan2(M.tan.x,M.tan.z);v.setFromAxisAngle(m,w);const S=M.pos.clone().add(M.left.clone().multiplyScalar(y.sign*n));for(let b=0;b<c;b++){const A=(b-(c-1)/2)*d,_=S.clone().add(M.tan.clone().multiplyScalar(A));for(let E=0;E<h;E++){const N=new z(_.x,.21+E*.34,_.z);p.compose(N,v,g),f.setMatrixAt(x++,p)}}}f.count=x,f.instanceMatrix.needsUpdate=!0,s.add(f)}function w1(s,t,e){const i=i1().map(u=>new It({map:u,roughness:.5,metalness:.1})),o=new It({map:r1(),roughness:.78,metalness:.25}),r=new It({color:4869716,roughness:.7,metalness:.4}),a=new Rt(8,1.2,.16),l=new Rt(8.4,1.6,.12),c=new Rt(.24,2.1,.24),d=Math.floor(t.length/22);for(let u=0;u<t.length;u+=d){if(Math.random()<.35)continue;const f=t[u],p=Math.random()<.5?1:-1,v=f.pos.clone().add(f.left.clone().multiplyScalar(p*e)),g=Math.atan2(f.tan.x,f.tan.z),m=i[Math.floor(Math.random()*i.length)],x=new Q(a,m);x.position.set(v.x,1.45,v.z),x.rotation.y=g,x.castShadow=!0,x.receiveShadow=!0,s.add(x);const y=new Q(l,o);y.position.set(v.x,1.45,v.z),y.rotation.y=g,y.translateZ(-.05),y.castShadow=!0,s.add(y);for(const M of[-3.7,3.7]){const w=new Q(c,r),S=new z(f.tan.x*M,0,f.tan.z*M);w.position.set(v.x+S.x,.9,v.z+S.z),w.rotation.y=g,w.castShadow=!0,s.add(w)}}}function b1(s,t,e,n,i){const o=n.barrierMat,r=2,a=.6,l=1.9,c=.7,h=t.length,d=new me,u=new T(0,1,0);for(const f of[1,-1]){const p=(e+a-.25)*f;for(let v=0;v<h;v+=r){const g=t[v],m=t[(v+r)%h],x=g.pos.x+g.left.x*p,y=g.pos.z+g.left.z*p,M=m.pos.x+m.left.x*p,w=m.pos.z+m.left.z*p,S=M-x,b=w-y,A=Math.hypot(S,b),_=new Pt({mass:0,material:o});_.addShape(new cs(new T(a,l,A/2+c))),_.position.set((x+M)/2,l-.3,(y+w)/2),d.setFromAxisAngle(u,Math.atan2(S,b)),_.quaternion.copy(d),s.addBody(_),i&&i.push(_)}}}function E1(s){if(s==="city")return T1();if(s==="sand")return A1();const t=J_();return s==="alpine"&&(t.color=new Nt(11453606)),t}function T1(){const s=_i(1024,(e,n)=>{const i=de(e*30,n*30,4),o=de(e*5+2,n*5+9,3),r=de(e*2+7,n*2+1,3),a=.205+i*.05+o*.05-r*.04;return[a*.99,a,a*1.04]});s.wrapS=s.wrapT=ye,s.repeat.set(60,60),s.anisotropy=8,s.colorSpace=Qt;const t=_r(256,1.1);return t.wrapS=t.wrapT=ye,t.repeat.set(120,120),new It({map:s,normalMap:t,normalScale:new nt(.3,.3),roughness:.9,metalness:0,envMapIntensity:.4,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function A1(){const s=_i(1024,(e,n)=>{const i=de(e*40,n*40,4),o=de(e*3+5,n*3+2,3),r=.5+.5*Math.sin(n*Math.PI*58+o*6);let a=.52+i*.1+o*.1;return a*=.97+.05*r,[a*1.08,a*.93,a*.66]});s.wrapS=s.wrapT=ye,s.repeat.set(50,50),s.anisotropy=8,s.colorSpace=Qt;const t=_r(256,1);return t.wrapS=t.wrapT=ye,t.repeat.set(90,90),new It({map:s,normalMap:t,normalScale:new nt(.4,.4),roughness:.98,metalness:0,envMapIntensity:.35,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function C1(s,t,e){const n=new It({color:14211282,roughness:.85,metalness:.02,side:Ae,envMapIntensity:.3}),i=new It({color:12591146,roughness:.6,metalness:0,side:Ae});for(const o of[1,-1]){const r=new Q(Lh(t,e*o,0,1.05),n);r.castShadow=!0,r.receiveShadow=!0,s.add(r);const a=new Q(Lh(t,e*o,1.02,1.2),i);s.add(a)}}function Lh(s,t,e,n){const i=s.length,o=[],r=[],a=[],l=[],c=t>0?-1:1;for(let d=0;d<i;d++){const u=s[d],f=u.pos.clone().add(u.left.clone().multiplyScalar(t));o.push(f.x,e,f.z,f.x,n,f.z),a.push(0,d/8,1,d/8);const p=u.left.x*c,v=u.left.z*c;r.push(p,0,v,p,0,v)}for(let d=0;d<i;d++){const u=d*2,f=d*2+1,p=(d+1)%i*2,v=(d+1)%i*2+1;l.push(u,p,f,f,p,v)}const h=new ae;return h.setAttribute("position",new ne(new Float32Array(o),3)),h.setAttribute("uv",new ne(new Float32Array(a),2)),h.setAttribute("normal",new ne(new Float32Array(r),3)),h.setIndex(l),h}function R1(s,t,e){const o=document.createElement("canvas");o.width=128,o.height=256;const r=o.getContext("2d");r.fillStyle=e||"#2a2f38",r.fillRect(0,0,128,256);const a=128/s,l=256/t;for(let h=0;h<t;h++)for(let d=0;d<s;d++){const u=Math.random();let f;u>.6?f=`rgb(255,${200+Math.random()*45|0},${135+Math.random()*60|0})`:u>.46?f=`rgb(${95+Math.random()*40|0},${120+Math.random()*40|0},${150+Math.random()*50|0})`:f="rgb(16,20,26)",r.fillStyle=f,r.fillRect(d*a+a*.16,h*l+l*.16,a*.68,l*.62)}const c=new Le(o);return c.colorSpace=Qt,c.wrapS=c.wrapT=ye,c.anisotropy=8,c}function P1(s,t,e){const i=["#262b34","#2e2a2a","#222a30","#30303a","#283034","#2b2622"].map(l=>R1(6,8,l)),o=new It({color:1777445,roughness:.8,metalness:.25}),r=t.length,a=Math.max(6,Math.floor(r/50));for(let l=0;l<r;l+=a)for(const c of[1,-1]){if(Math.random()<.3)continue;const h=t[l],d=12+Math.random()*24,u=16+Math.random()*30,f=18+Math.random()*66,p=e.armco+6+Math.random()*24+d/2,v=h.pos.clone().add(h.left.clone().multiplyScalar(c*p)),g=Math.atan2(h.tan.x,h.tan.z),m=new Rt(u,f,d);m.translate(0,f/2,0);const x=m.getAttribute("uv"),y=Math.max(2,Math.round(u/6)),M=Math.max(3,Math.round(f/4));for(let E=0;E<x.count;E++)x.setXY(E,x.getX(E)*y,x.getY(E)*M);const w=i[Math.random()*i.length|0],S=new It({map:w,emissive:16773336,emissiveMap:w,emissiveIntensity:.5,roughness:.55,metalness:.2,envMapIntensity:.6}),b=new re,A=new Q(m,S);A.castShadow=!0,A.receiveShadow=!0,b.add(A);const _=new Q(new Rt(u+.4,1.3,d+.4),o);_.position.y=f,_.castShadow=!0,b.add(_),b.position.copy(v),b.rotation.y=g,s.add(b)}}function L1(s,t,e){const n=new ul(1,0).toNonIndexed(),i=n.getAttribute("position");for(let m=0;m<i.count;m++){const x=(de(i.getX(m)*1.7+3,i.getZ(m)*1.7+1,3)-.5)*.7;i.setXYZ(m,i.getX(m)*(1+x),i.getY(m)*(1+x*.6),i.getZ(m)*(1+x))}n.computeVertexNormals();const o=new It({roughness:.96,metalness:0,flatShading:!0,envMapIntensity:.3}),r=150,a=new Gn(n,o,r);a.castShadow=!0,a.receiveShadow=!0;const l=new $t,c=new on,h=new z,d=new Wn,u=new Nt,f=440;let p=0;for(let m=0;m<r*5&&p<r;m++){const x=(Math.random()*2-1)*f,y=(Math.random()*2-1)*f,M=new z(x,0,y);let w=1/0;for(let A=0;A<t.length;A+=6){const _=M.distanceToSquared(t[A].pos);_<w&&(w=_)}if(w<(e.armco+5)*(e.armco+5))continue;const S=Math.sqrt(w);if(S>120&&Math.random()<(S-120)/(f-120)*.6)continue;const b=1+Math.random()*4.5;h.set(b*(.8+Math.random()*.6),b*(.5+Math.random()*.7),b*(.8+Math.random()*.6)),d.set((Math.random()-.5)*.5,Math.random()*Math.PI*2,(Math.random()-.5)*.5),c.setFromEuler(d),M.y=-.3*b,l.compose(M,c,h),a.setMatrixAt(p,l),u.setHSL(.045+Math.random()*.03,.45+Math.random()*.18,.3+Math.random()*.12),a.setColorAt(p,u),p++}a.count=p,a.instanceMatrix.needsUpdate=!0,a.instanceColor&&(a.instanceColor.needsUpdate=!0),s.add(a);const v=new It({vertexColors:!0,roughness:.97,metalness:0,envMapIntensity:.3}),g=[new Nt(9062956),new Nt(11101754),new Nt(12618325)];for(let m=0;m<7;m++){const x=m/7*Math.PI*2+(Math.random()-.5)*.6,y=240+Math.random()*260,M=60+Math.random()*90,w=26+Math.random()*30,S=new fe(w,w*1.5,M,18,6),b=S.getAttribute("position"),A=[],_=new Nt;for(let N=0;N<b.count;N++){const D=(b.getY(N)+M/2)/M,F=Math.atan2(b.getZ(N),b.getX(N)),R=.9+de(F*2.5+m,D*3,3)*.22;b.setX(N,b.getX(N)*R),b.setZ(N,b.getZ(N)*R);const L=Math.max(0,Math.min(g.length-1,Math.floor(D*g.length+de(F*4,D*6,2)*.6))),U=g[L];_.copy(U).multiplyScalar(.85+D*.2),A.push(_.r,_.g,_.b)}S.setAttribute("color",new ee(A,3)),S.computeVertexNormals();const E=new Q(S,v);E.position.set(Math.cos(x)*y,M/2-4,Math.sin(x)*y),E.castShadow=!0,E.receiveShadow=!0,s.add(E)}}const qa=[{id:"gp",name:"AUTODROMO",subtitle:"GRAND PRIX CIRCUIT",difficulty:"MEDIUM",blurb:"The full GT circuit: fast sweeps, heavy braking zones, gravel and grandstands.",roadWidth:14,kerbWidth:2,runoffWidth:5.5,closed:!0,tension:.5,controlPoints:[[0,0],[0,140],[10,240],[90,290],[200,290],[280,240],[300,150],[240,90],[180,60],[200,-20],[280,-80],[300,-160],[240,-220],[120,-240],[0,-220],[-90,-180],[-160,-115],[-115,-85],[-50,-105],[0,-110],[0,-55]],theme:{ground:"grass",fog:[13155238,900,4200],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!0,catchFence:!0,grandstands:!0,sponsors:!0,tireStacks:!0,brakeMarkers:!0,trees:{type:"broadleaf",count:600},mountains:"far",clouds:!0}},{id:"sprint",name:"SUNSET SPEEDWAY",subtitle:"NATIONAL CIRCUIT",difficulty:"EASY",blurb:"Fast and friendly: flowing sweepers, one easy ess, acres of run-off to learn on.",roadWidth:20,kerbWidth:2.2,runoffWidth:9,closed:!0,tension:.5,controlPoints:[[0,0],[0,110],[26,170],[86,204],[160,212],[226,186],[268,128],[278,58],[258,-8],[280,-72],[258,-148],[200,-192],[120,-210],[46,-196],[8,-156],[0,-110]],theme:{ground:"grass",fog:[13155238,1e3,4400],barrier:"armco",kerbs:!0,gravel:!1,skid:!0,pit:!0,catchFence:!1,grandstands:!0,sponsors:!0,tireStacks:!1,brakeMarkers:!1,trees:{type:"broadleaf",count:460},mountains:"hills",clouds:!0}},{id:"downtown",name:"MARINA STREET",subtitle:"CITY GRAND PRIX",difficulty:"HARD",blurb:"A street fight between the barriers: square corners, a snap chicane, zero room for error.",roadWidth:12,kerbWidth:1.1,runoffWidth:1.3,closed:!0,tension:.5,controlPoints:[[0,0],[0,96],[0,168],[22,204],[72,216],[150,216],[196,200],[210,152],[210,96],[224,62],[268,50],[304,34],[316,-12],[316,-120],[302,-166],[258,-182],[160,-182],[118,-182],[78,-160],[42,-156],[8,-134],[0,-96]],theme:{ground:"city",fog:[12041412,650,3200],barrier:"wall",kerbs:!0,gravel:!1,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!0,tireStacks:!0,brakeMarkers:!0,trees:!1,buildings:!0,mountains:!1,clouds:!0}},{id:"alpine",name:"COL DU PIN",subtitle:"MOUNTAIN PASS",difficulty:"MEDIUM-HARD",blurb:"A pass road through the pines: ridge-top esses, two switchback hairpins, a carousel drop.",roadWidth:13,kerbWidth:1.6,runoffWidth:3,closed:!0,tension:.5,controlPoints:[[0,-210],[90,-210],[168,-198],[216,-158],[240,-92],[218,-30],[246,36],[226,108],[164,144],[92,138],[24,158],[-48,142],[-116,166],[-182,150],[-240,140],[-272,104],[-252,66],[-188,48],[-124,34],[-66,44],[-6,20],[44,-8],[64,-52],[44,-96],[-4,-110],[-92,-124],[-156,-112],[-224,-128],[-262,-166],[-244,-204],[-180,-214],[-90,-210]],theme:{ground:"alpine",fog:[13424349,680,3400],barrier:"guardrail",kerbs:!0,gravel:!1,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!1,tireStacks:!1,brakeMarkers:!0,trees:{type:"pine",count:900,nearMin:22,band:[22,360]},mountains:"near",clouds:!0}},{id:"dunes",name:"RED MESA",subtitle:"CANYON SPEEDWAY",difficulty:"MEDIUM",blurb:"Desert speedway: a 400 m drag into a heavy stop, fast esses, sand waiting off-line.",roadWidth:16,kerbWidth:2,runoffWidth:6.5,closed:!0,tension:.5,controlPoints:[[0,-200],[110,-200],[188,-192],[228,-166],[242,-126],[240,-88],[216,-32],[242,30],[224,96],[166,134],[64,142],[-22,140],[-88,160],[-148,124],[-206,112],[-236,68],[-240,-10],[-238,-96],[-232,-150],[-198,-184],[-140,-198]],theme:{ground:"sand",fog:[14271643,850,4400],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!1,catchFence:!1,grandstands:!1,sponsors:!0,tireStacks:!1,brakeMarkers:!0,trees:!1,mountains:"mesa",rocks:!0,clouds:!0}},{id:"parco",name:"PARCO VELOCE",subtitle:"TEMPLE OF SPEED",difficulty:"MEDIUM",blurb:"Old-school parkland speed: two hard chicanes, twin right-handers, one endless sweeper.",roadWidth:13,kerbWidth:2,runoffWidth:5,closed:!0,tension:.5,controlPoints:[[-260,0],[-260,120],[-252,178],[-228,202],[-208,228],[-170,240],[-100,248],[-20,230],[28,192],[56,140],[50,92],[76,58],[104,44],[122,10],[124,-34],[112,-82],[78,-116],[-8,-162],[-80,-196],[-96,-240],[-140,-262],[-176,-264],[-204,-262],[-244,-244],[-262,-196],[-264,-130],[-260,-40]],theme:{ground:"grass",fog:[12568498,800,4e3],barrier:"armco",kerbs:!0,gravel:!0,skid:!0,pit:!0,catchFence:!0,grandstands:!0,sponsors:!0,tireStacks:!1,brakeMarkers:!0,trees:{type:"broadleaf",count:900},mountains:!1,clouds:!0}}],Ih="gp";function I1(s){return qa.find(t=>t.id===s)||qa[0]}function D1(s,t,e,n,i){const o=i*i,r=o*i;return .5*(2*t+(-s+e)*i+(2*s-5*t+4*e-n)*o+(-s+3*t-3*e+n)*r)}function Ue(s,t,e){const n=s.length,i=Math.min(n-2,Math.floor(e)),o=e-i,r=s[Math.max(0,i-1)][t],a=s[i][t],l=s[i+1][t],c=s[Math.min(n-1,i+2)][t];return D1(r,a,l,c,o)}function vl(s,t){const e=s.hw,n=s.yb,i=s.hip,o=s.yt,r=s.topW,a=Math.max(3,Math.round(t*.55)),l=t-a,c=new hr([new nt(0,n),new nt(e*.72,n),new nt(e*.955,n+(i-n)*.42),new nt(e,i)]),h=new hr([new nt(e*.955,i+(o-i)*.1),new nt(r+(e-r)*.42,i+(o-i)*.56),new nt(r,o-.006),new nt(r*.52,o),new nt(0,o)]),d=c.getPoints(a-1).concat(h.getPoints(l-1));for(const u of d)u.x<0&&(u.x=0);return d[0].x=0,d[t-1].x=0,d}function N1(s,t={}){const e=t.ringsPerSegment??8,n=t.profilePoints??14,i=2*(n-1),o=t.capEnds??!0,r=s.length-1,a=r*e,l=[],c=[],h=[];for(let p=0;p<=a;p++){const v=p/a*r,g={z:Ue(s,"z",v),hw:Ue(s,"hw",v),yb:Ue(s,"yb",v),hip:Ue(s,"hip",v),yt:Ue(s,"yt",v),topW:Ue(s,"topW",v)};h.push(g.z);const m=vl(g,n),x=p/a;for(let y=0;y<n;y++)l.push(m[y].x,m[y].y,g.z),c.push(y/i,x);for(let y=n-2;y>=1;y--)l.push(-m[y].x,m[y].y,g.z),c.push((2*(n-1)-y)/i,x)}const d=[],u=p=>p*i;for(let p=0;p<a;p++){const v=u(p),g=u(p+1);for(let m=0;m<i;m++){const x=(m+1)%i,y=v+m,M=v+x,w=g+m,S=g+x;d.push(y,S,w),d.push(y,M,S)}}if(o){const p=(v,g)=>{let m=0,x=0;for(let w=0;w<i;w++)m+=l[(u(v)+w)*3],x+=l[(u(v)+w)*3+1];m/=i,x/=i;const y=h[v],M=l.length/3;l.push(m,x,y),c.push(.5,g?1:0);for(let w=0;w<i;w++){const S=(w+1)%i,b=u(v)+w,A=u(v)+S;g?d.push(M,b,A):d.push(M,A,b)}};p(0,!1),p(a,!0)}const f=new ae;return f.setAttribute("position",new ee(l,3)),f.setAttribute("uv",new ee(c,2)),f.setIndex(d),f.computeVertexNormals(),f.setAttribute("uv2",new ee(c,2)),f.computeBoundingBox(),f.computeBoundingSphere(),f}function ga(s,t){const e=s.length,n=Math.max(0,Math.min(e-1,t*(e-1))),i=Math.min(e-2,Math.floor(n)),o=n-i,r=s[i],a=s[i+1];let l=a.x-r.x,c=a.y-r.y;const h=Math.hypot(l,c)||1;return l/=h,c/=h,{x:r.x+(a.x-r.x)*o,y:r.y+(a.y-r.y)*o,tx:l,ty:c,nx:c,ny:-l}}function nd(s,t,e={}){const n=e.profilePoints??16,i=e.proud??.006,o=(e.width??.014)/2,r=e.arcSteps??10,a=e.railSteps??24,l=s.length-1,c=g=>Ue(s,"z",g),h=g=>{let m=0,x=l;for(let y=0;y<36;y++){const M=(m+x)/2;c(M)<g?m=M:x=M}return(m+x)/2},d=g=>{const m=h(g);return vl({hw:Ue(s,"hw",m),yb:Ue(s,"yb",m),hip:Ue(s,"hip",m),yt:Ue(s,"yt",m),topW:Ue(s,"topW",m)},n)},u=[],f=[],p=(g,m,x)=>{const y=x?m:g,M=x?g:m,w=u.length/3;for(let S=0;S<y.length;S++)u.push(y[S][0],y[S][1],y[S][2]),u.push(M[S][0],M[S][1],M[S][2]);for(let S=0;S<y.length-1;S++){const b=w+S*2,A=b+1,_=b+2,E=b+3;f.push(b,_,E,b,E,A)}};for(const g of t)for(const m of[1,-1]){const x=[],y=[];if(g.type==="ring"){const M=d(g.z-o),w=d(g.z+o);for(let S=0;S<=r;S++){const b=g.from+(g.to-g.from)*(S/r),A=ga(M,b),_=ga(w,b);x.push([m*(A.x+A.nx*i),A.y+A.ny*i,g.z-o]),y.push([m*(_.x+_.nx*i),_.y+_.ny*i,g.z+o])}p(x,y,m<0)}else{const M=Math.min(g.zFrom,g.zTo),w=Math.max(g.zFrom,g.zTo);for(let S=0;S<=a;S++){const b=M+(w-M)*(S/a),A=ga(d(b),g.k),_=A.x+A.nx*i,E=A.y+A.ny*i;x.push([m*(_-A.tx*o),E-A.ty*o,b]),y.push([m*(_+A.tx*o),E+A.ty*o,b])}p(x,y,m>0)}}const v=new ae;return v.setAttribute("position",new ee(u,3)),v.setIndex(f),v.computeVertexNormals(),v.computeBoundingBox(),v.computeBoundingSphere(),v}function id(s,t={}){const e=t.profilePoints??14,n=t.beltFrac??.6,i=Math.round(n*(e-1)),o=t.zStart,r=t.zEnd,a=t.steps??24,l=t.proud??.012,c=s.length-1,h=m=>Ue(s,"z",m),d=m=>{let x=0,y=c;for(let M=0;M<36;M++){const w=(x+y)/2;h(w)<m?x=w:y=w}return(x+y)/2},u=[],f=[];let p=0;for(let m=0;m<=a;m++){const x=o+(r-o)*(m/a),y=d(x),M={hw:Ue(s,"hw",y),yb:Ue(s,"yb",y),hip:Ue(s,"hip",y),yt:Ue(s,"yt",y),topW:Ue(s,"topW",y)},w=vl(M,e),S=[];for(let b=i;b<=e-1;b++)S.push(w[b]);for(let b=e-2;b>=i;b--)S.push(new nt(-w[b].x,w[b].y));p=S.length;for(let b=0;b<p;b++){const A=S[b].x*(1+l*.7),_=S[b].y+l;u.push(A,_,x),f.push(b/(p-1),m/a)}}const v=[];for(let m=0;m<a;m++)for(let x=0;x<p-1;x++){const y=m*p+x,M=m*p+x+1,w=(m+1)*p+x,S=(m+1)*p+x+1;v.push(y,w,S,y,S,M)}const g=new ae;return g.setAttribute("position",new ee(u,3)),g.setAttribute("uv",new ee(f,2)),g.setIndex(v),g.computeVertexNormals(),g}function Zi(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function Dh(s){return s=Math.max(0,Math.min(1,s)),s*s*(3-2*s)}function U1(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,o=t-n,r=Zi(e,n),a=Zi(e+1,n),l=Zi(e,n+1),c=Zi(e+1,n+1),h=Dh(i),d=Dh(o);return(r*(1-h)+a*h)*(1-d)+(l*(1-h)+c*h)*d}function sd(s,t,e=4){let n=.5,i=1,o=0,r=0;for(let a=0;a<e;a++)o+=n*U1(s*i,t*i),r+=n,n*=.5,i*=2;return o/r}function Sr(s,t,e){const n=new Float32Array(s*s);for(let l=0;l<s;l++)for(let c=0;c<s;c++)n[l*s+c]=t(c/s,l/s);const i=document.createElement("canvas");i.width=s,i.height=s;const o=i.getContext("2d"),r=o.createImageData(s,s);for(let l=0;l<s;l++)for(let c=0;c<s;c++){const h=n[l*s+(c-1+s)%s],d=n[l*s+(c+1)%s],u=n[(l-1+s)%s*s+c],f=n[(l+1)%s*s+c];let p=(h-d)*e,v=(u-f)*e,g=1;const m=Math.hypot(p,v,g)||1;p/=m,v/=m,g/=m;const x=(l*s+c)*4;r.data[x]=(p*.5+.5)*255,r.data[x+1]=(v*.5+.5)*255,r.data[x+2]=(g*.5+.5)*255,r.data[x+3]=255}o.putImageData(r,0,0);const a=new Le(i);return a.wrapS=a.wrapT=ye,a.needsUpdate=!0,a}let hi=null;function F1(){if(hi)return hi;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let o=0;o<s;o++){const r=Zi(o*1,i*1)*Math.PI*2,a=Zi(o*1.7+4.2,i*2.3+1.1)*.5,l=Math.cos(r)*a*.35,c=Math.sin(r)*a*.35,h=Math.sqrt(Math.max(1e-4,1-l*l-c*c)),d=(i*s+o)*4;n.data[d]=(l*.5+.5)*255,n.data[d+1]=(c*.5+.5)*255,n.data[d+2]=(h*.5+.5)*255,n.data[d+3]=255}return e.putImageData(n,0,0),hi=new Le(t),hi.wrapS=hi.wrapT=ye,hi.needsUpdate=!0,hi}let Do=null;function O1(){return Do||(Do=Sr(128,(s,t)=>sd(s*14,t*14,3),.6),Do)}let _s=null;function z1(){return _s||(_s=Sr(128,(s,t)=>{const n=s*8,i=t*8,o=Math.floor(n),r=Math.floor(i),a=n-o,l=i-r,c=(o+r)%2===0;return .35+Math.sin(c?a*Math.PI:l*Math.PI)*.65},1.4),_s.repeat.set(1,1),_s)}let Ss=null;function B1(){return Ss||(Ss=Sr(128,(s,t)=>{const e=Math.sin(t*Math.PI*26)>.4?0:1,n=Math.sin(s*Math.PI*8)*.15;return e*.8+n+.1},1.6),Ss.repeat.set(1,1),Ss)}let ui=null;function k1(){if(ui)return ui;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let o=0;o<s;o++){const a=.2+sd(o/s*18,i/s*18,3)*.16,l=(i*s+o)*4;n.data[l]=n.data[l+1]=n.data[l+2]=a*255,n.data[l+3]=255}return e.putImageData(n,0,0),ui=new Le(t),ui.wrapS=ui.wrapT=ye,ui.needsUpdate=!0,ui}let No=null;function G1(){return No||(No=Sr(128,(s,t)=>{const i=Math.floor(t*9)%2*.5,o=(s*9+i)%1-.5,r=t*9%1-.5;return Math.hypot(o,r)<.34?0:1},1.8),No)}function H1(s="GT 0142"){const t=document.createElement("canvas");t.width=256,t.height=80;const e=t.getContext("2d");e.fillStyle="#f2f3ea",e.fillRect(0,0,256,80),e.fillStyle="#1d3a8a",e.fillRect(0,0,30,80),e.fillStyle="#ffcb05",e.beginPath(),e.arc(15,22,4,0,Math.PI*2),e.fill(),e.fillStyle="#111417",e.font="bold 52px Arial",e.textBaseline="middle",e.fillText(s,44,44);const n=new Le(t);return n.colorSpace=Qt,n.anisotropy=8,n}let ws=null;function W1(){if(ws)return ws;const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,50,8,64,64,64);return e.addColorStop(0,"#fdfdff"),e.addColorStop(1,"#8b9099"),t.fillStyle=e,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.fill(),t.strokeStyle="#3a3f47",t.lineWidth=5,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.stroke(),t.fillStyle="#1b1e24",t.font="bold 56px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText("R",64,66),ws=new Le(s),ws.colorSpace=Qt,ws}const va=new Map;function V1(s){const t=new Nt(s),e={};return t.getHSL(e),e.s=Math.min(1,e.s*1.12),e.l=e.l*.44,t.setHSL(e.h,e.s,e.l),t}function wr(s){if(va.has(s))return va.get(s);const t=F1();t.repeat.set(10,22);const e=new un({color:V1(s),metalness:.16,roughness:.85,roughnessMap:k1(),clearcoat:1,clearcoatRoughness:.085,clearcoatNormalMap:O1(),clearcoatNormalScale:new nt(.05,.05),normalMap:t,normalScale:new nt(.11,.11),envMapIntensity:1.12});return va.set(s,e),e}let Uo=null;function Hn(){return Uo||(Uo=new un({color:723983,metalness:.12,roughness:.62,clearcoat:.18,envMapIntensity:.6}),Uo)}let Fo=null;function fr(){if(Fo)return Fo;const s=z1();return s.repeat.set(5,5),Fo=new un({color:921878,metalness:.35,roughness:.42,clearcoat:.55,clearcoatRoughness:.16,normalMap:s,normalScale:new nt(.7,.7),envMapIntensity:.8}),Fo}let Oo=null;function od(){return Oo||(Oo=new un({color:661026,metalness:0,roughness:.03,transmission:.25,thickness:.35,ior:1.52,envMapIntensity:1.6,clearcoat:1,clearcoatRoughness:.02,transparent:!0,opacity:.86,side:Ae,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1}),Oo)}let zo=null;function xl(){return zo||(zo=new un({color:6975092,metalness:1,roughness:.42}),zo)}let Bo=null;function X1(){if(Bo)return Bo;const s=B1();return s.repeat.set(8,1),Bo=new un({color:526345,roughness:.9,metalness:0,sheen:.4,sheenRoughness:.45,normalMap:s,normalScale:new nt(.75,.75)}),Bo}let ko=null;function q1(){return ko||(ko=new un({color:855311,roughness:.78,metalness:0,sheen:.3}),ko)}let Go=null;function $i(){return Go||(Go=new un({color:1711136,metalness:.9,roughness:.35}),Go)}let Ho=null;function Y1(){return Ho||(Ho=new It({color:3817028,metalness:1,roughness:.45}),Ho)}let Wo=null;function Ya(){return Wo||(Wo=new It({color:13114910,metalness:.4,roughness:.35}),Wo)}let Vo=null;function j1(){return Vo||(Vo=new It({color:15657696,emissive:16775400,emissiveIntensity:1.1,roughness:.18,metalness:0}),Vo)}let Xo=null;function Z1(){return Xo||(Xo=new un({color:16777215,metalness:0,roughness:.06,transmission:.9,thickness:.05,ior:1.45,transparent:!0,opacity:.4,envMapIntensity:1.2}),Xo)}function rd(){return new It({color:4852236,emissive:16716834,emissiveIntensity:.6,roughness:.3,metalness:0,transparent:!0,opacity:.7})}let qo=null;function K1(){if(qo)return qo;const s=G1();return s.repeat.set(2,1),qo=new It({color:1053206,metalness:.8,roughness:.5,normalMap:s,normalScale:new nt(1,1)}),qo}function J1(s,t){let e=s.index?s.toNonIndexed():s.clone();if(e.applyMatrix4(t),!e.getAttribute("uv")){const n=e.getAttribute("position").count;e.setAttribute("uv",new ee(new Float32Array(n*2),2))}for(const n of Object.keys(e.attributes))n!=="position"&&n!=="normal"&&n!=="uv"&&e.deleteAttribute(n);return e.getAttribute("normal")||e.computeVertexNormals(),e}function ad(s){s.updateMatrixWorld(!0);const t=new $t().copy(s.matrixWorld).invert(),e=new Map,n=[];s.traverse(i=>{if(!i.isMesh||i.userData.noMerge||i.material.transparent)return;const o=i.material;e.has(o)||e.set(o,{geos:[],cast:!1,receive:!1});const r=e.get(o),a=new $t().multiplyMatrices(t,i.matrixWorld);r.geos.push(J1(i.geometry,a)),r.cast=r.cast||i.castShadow,r.receive=r.receive||i.receiveShadow,n.push(i)});for(const i of n)i.parent&&i.parent.remove(i);for(const[i,o]of e){if(!o.geos.length)continue;const r=o.geos.length===1?o.geos[0]:ml(o.geos,!1);if(!r)continue;const a=new Q(r,i);a.castShadow=o.cast,a.receiveShadow=o.receive,s.add(a)}return s}let Yo=null;function Q1(){return Yo||(Yo=new un({color:8685967,metalness:1,roughness:.34,clearcoat:.3,clearcoatRoughness:.12,envMapIntensity:.65}),Yo)}const Nh=.36,$1=.235,Uh=.096,tS=$1-.002,eS=.216,Fh=.048,Oh=.043,Cs=.016,zh=.075,nS=.218,xa=new Map,Bh={gt:{spokes:5,twin:!0,spokeW:.04,rim:"bright",lock:"lugs"},muscle:{spokes:5,twin:!1,spokeW:.085,rim:"bright",lock:"lugs"},openWheel:{spokes:10,twin:!1,spokeW:.03,rim:"dark",lock:"center"}},kh=[[.3595,.086],[.3565,.1],[.349,.113],[.334,.127],[.3235,.1315],[.3185,.137],[.3135,.133],[.306,.14],[.286,.131],[.266,.114],[.243,.101]],iS=[[.3595,-.086],[Nh,-.045],[Nh,.045],[.3595,.086]];function Gh(s,t){const e=new cl(s.map(n=>new nt(n[0],n[1])),t);return e.rotateZ(-Math.PI/2),e}function sS(s,t){const e=nS-zh,n=new Rt(.03,e,s.spokeW),i=n.getAttribute("position"),o=Cs-Oh;for(let r=0;r<i.count;r++){const a=(i.getY(r)+e/2)/e,l=We.lerp(.6,1,a);i.setZ(r,i.getZ(r)*l),i.setX(r,i.getX(r)*l+t*(Oh+(1-a)*o))}return n.translate(0,zh+e/2,0),n.computeVertexNormals(),n}function Hh(s,t){const e=new re,n=s.rim==="dark"?$i():Q1(),i=new Q(new ls(.238,.013,6,30),n);i.rotation.y=Math.PI/2,i.position.x=t*Uh,e.add(i);const o=new fe(tS,eS,Fh,28,1,!0);o.rotateZ(-t*(Math.PI/2));const r=new Q(o,n);r.position.x=t*(Uh-.002-Fh/2),e.add(r);const a=sS(s,t),l=s.spokes;for(let h=0;h<l;h++){const d=h/l*Math.PI*2;if(s.twin)for(const u of[-.1,.1]){const f=new Q(a,n);f.rotation.x=d+u,e.add(f)}else{const u=new Q(a,n);u.rotation.x=d,e.add(u)}}const c=new Q(new fe(.078,.078,.055,18),n);if(c.rotation.z=Math.PI/2,c.position.x=t*Cs,e.add(c),s.lock==="center"){const h=new Q(new fe(.03,.03,.034,6),Ya());h.rotation.z=Math.PI/2,h.position.x=t*(Cs+.026),e.add(h)}else{const h=new Q(new fe(.032,.032,.02,16),$i());h.rotation.z=Math.PI/2,h.position.x=t*(Cs+.024),e.add(h);const d=new fe(.013,.013,.024,6);for(let u=0;u<5;u++){const f=u/5*Math.PI*2,p=new Q(d,$i());p.rotation.z=Math.PI/2,p.position.set(t*(Cs+.024),Math.cos(f)*.05,Math.sin(f)*.05),e.add(p)}}return e}function oS(s){const t=Bh[s]??Bh.gt,e=rS(s,t);return ad(e)}function rS(s,t){const e=new re,n=new Q(Gh(iS,30),X1());n.castShadow=!0,e.add(n);for(const d of[1,-1]){const u=d>0?kh:[...kh].reverse().map(p=>[p[0],-p[1]]),f=new Q(Gh(u,30),q1());f.castShadow=!0,e.add(f)}const i=new Q(new fe(.23,.23,.18,28,1,!0),$i());i.rotateZ(Math.PI/2),e.add(i);const o=new Q(new fe(.23,.23,.012,28),$i());o.rotateZ(Math.PI/2),e.add(o);const r=new Q(new fe(.185,.185,.032,28),Y1());r.rotateZ(Math.PI/2),e.add(r);const a=new Q(new fe(.085,.085,.044,18),$i());a.rotateZ(Math.PI/2),e.add(a);const l=new ls(.19,.03,5,8,1);l.rotateY(Math.PI/2);const c=new Q(l,Ya());c.rotation.x=1.22,e.add(c);const h=new Q(new Rt(.068,.045,.085),Ya());return h.position.set(0,.188,.028),e.add(h),e.add(Hh(t,1)),e.add(Hh(t,-1)),e}function aS(s="gt"){return xa.has(s)||xa.set(s,oS(s)),xa.get(s).clone()}function ld({z:s=1.92,y:t=.64,x:e=.6}={}){const n=new re,i=Hn(),o=Z1(),r=j1();for(const a of[-1,1]){const l=new re,c=new Q(new Rt(.44,.13,.12),i);l.add(c);const h=new Q(new fe(.045,.05,.07,16),r);h.rotation.x=Math.PI/2,h.position.set(-a*.1,-.005,.055),l.add(h);const d=new Q(new ls(.052,.012,8,18),i);d.position.set(-a*.1,-.005,.088),l.add(d);const u=new Q(new Rt(.38,.018,.02),r);u.position.set(0,.048,.055),u.rotation.z=a*.06,l.add(u);const f=new Q(new Rt(.45,.15,.035),o);f.position.z=.075,l.add(f),l.position.set(a*e,t,s),l.rotation.y=a>0?-.32:.32,l.rotation.x=-.12,n.add(l)}return n}function cd({z:s=-2.04,y:t=.74,width:e=1.5}={}){const n=new re,i=new Q(new Rt(e+.05,.12,.08),Hn());i.position.set(0,t,s+.02),n.add(i);const o=rd(),r=new Q(new Rt(e,.07,.05),o);r.position.set(0,t,s-.02),r.userData.noMerge=!0,n.add(r);for(const a of[-1,1]){const l=new Q(new fe(.04,.04,.1,16),o);l.rotation.z=Math.PI/2,l.position.set(a*(e/2-.02),t,s-.02),n.add(l)}return{group:n,brakeMesh:r}}let jo=null;function lS(){return jo||(jo=new It({color:2567219,metalness:1,roughness:.14,envMapIntensity:.7}),jo)}function hd({z:s=.5,y:t=.98,x:e=.95,color:n=13112861}={}){const i=new re,o=wr(n);for(const r of[-1,1]){const a=new re,l=new Q(new Rt(.11,.022,.05),Hn());l.rotation.z=r*.5,l.position.set(r*.04,-.03,0),a.add(l);const c=new Q(new Rt(.16,.068,.095),o);c.rotation.y=r*.08,c.position.set(r*.12,.01,0),a.add(c);const h=new Q(new Ce(.125,.05),lS());h.rotation.y=Math.PI+r*.08,h.position.set(r*.124,.01,-.052),a.add(h),a.position.set(r*e,t,s),i.add(a)}return i}function ud({z:s=2.02,y:t=.44,w:e=.9,h:n=.22}={}){const i=new re,o=new Q(new Ce(e,n),K1());o.position.set(0,t,s),i.add(o);const r=new Q(new Rt(e+.08,n+.06,.05),Hn());return r.position.set(0,t,s-.03),i.add(r),i}function dd({z:s=1.98,y:t=-.19,w:e=1.3}={}){const n=new re,i=new Q(new Rt(e,.024,.2),yl());return i.position.set(0,t,s),i.castShadow=!0,n.add(i),n}function fd({z:s=-1.95,y:t=-.27,w:e=1.44}={}){const n=new re,i=yl(),o=new Q(new Rt(e,.035,.44),i);o.rotation.x=.3,o.position.set(0,t,s),n.add(o);const r=5;for(let a=0;a<r;a++){const l=new Q(new Rt(.022,.09,.38),i);l.rotation.x=.3,l.position.set((a/(r-1)-.5)*(e*.88),t+.05,s),n.add(l)}return n}function pd({z:s=-1.92,y:t=1.06,span:e=1.62,deckY:n=.82,style:i="gt"}={}){const o=new re;if(i==="ducktail"){const c=new Q(new Rt(e,.05,.3),wr(1118998));return c.position.set(0,n+.03,s+.16),c.rotation.x=-.18,o.add(c),o}const r=new xr;r.moveTo(-.19,0),r.quadraticCurveTo(-.1,.05,.06,.032),r.quadraticCurveTo(.15,.016,.19,0),r.quadraticCurveTo(.06,-.03,-.06,-.028),r.quadraticCurveTo(-.15,-.02,-.19,0);const a=new Ws(r,{depth:e,bevelEnabled:!1,steps:1});a.translate(0,0,-e/2),a.rotateY(Math.PI/2);const l=new Q(a,fr());if(l.rotation.x=-.16,l.position.set(0,t,s),l.castShadow=!0,o.add(l),i==="f1"){const c=l.clone();c.position.y=t+.14,c.rotation.x=-.3,c.scale.set(1,.7,.9),o.add(c)}for(const c of[-1,1]){const h=new Q(new Rt(.02,.22,.42),fr());h.position.set(c*e/2,t,s),o.add(h)}for(const c of[-1,1]){const h=new Q(new Rt(.04,t-n+.06,.1),xl());h.position.set(c*.55,(t+n)/2,s+.02),o.add(h)}return o}function md({z:s=-2.07,y:t=.38,x:e=.45,count:n=2}={}){const i=new re,o=new fe(.05,.058,.14,18);o.rotateX(Math.PI/2);const r=new fe(.038,.038,.15,14);r.rotateX(Math.PI/2);const a=n===4?[-e-.1,-e+.04,e-.04,e+.1]:[-e,e];for(const l of a){const c=new Q(o,xl());c.position.set(l,t,s),i.add(c);const h=new Q(r,Hn());h.position.set(l,t,s-.01),i.add(h)}return i}let Zo=null,ya=null;function gd({frontZ:s=2.06,frontY:t=.06,rearZ:e=-2.06,rearY:n=.22,plateY:i=-.04}={}){const o=new re;Zo||(Zo=new It({map:W1(),metalness:.4,roughness:.4}));const r=new fe(.042,.042,.01,18);r.rotateX(Math.PI/2);const a=new Q(r,Zo);a.position.set(0,t,s),o.add(a);const l=new Q(r,Zo);l.position.set(0,n,e),l.rotation.y=Math.PI,o.add(l),ya||(ya=new It({map:H1(),roughness:.6,metalness:0}));const c=new Ce(.42,.13),h=new Q(c,ya);return h.position.set(0,i,e-.005),h.rotation.y=Math.PI,o.add(h),o}let Ko=null;function yl(){return Ko||(Ko=new It({color:395016,roughness:1,metalness:0,envMapIntensity:0}),Ko)}function Ml({y:s=-.26,w:t=1.42,len:e=3.5}={}){const n=t/2,i=e/2,o=.3,r=new xr;r.moveTo(-n+o,-i),r.lineTo(n-o,-i),r.lineTo(n,-i+o),r.lineTo(n,i-o),r.lineTo(n-o,i),r.lineTo(-n+o,i),r.lineTo(-n,i-o),r.lineTo(-n,-i+o),r.closePath();const a=new Ws(r,{depth:.03,bevelEnabled:!0,bevelThickness:.03,bevelSize:.04,bevelSegments:1});a.rotateX(-Math.PI/2);const l=new Q(a,yl());return l.position.set(0,s,0),l}let Jo=null;function cS(){return Jo||(Jo=new It({color:723982,roughness:.94,metalness:0,side:Ae}),Jo)}function vd({zF:s=1.45,zR:t=-1.45,x:e=.86,r:n=.41,width:i=.3}={}){const o=new re,r=new fe(n,n,i,22,1,!0,0,Math.PI);r.rotateZ(Math.PI/2);for(const a of[s,t])for(const l of[-1,1]){const c=new Q(r,cS());c.position.set(l*e,0,a),o.add(c)}return o}let bs=null;function hS(){if(bs)return bs;const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d");t.fillStyle="#ffffff",t.fillRect(0,0,128,128);const e=t.createRadialGradient(64,64,6,64,64,62);return e.addColorStop(0,"rgb(64,64,68)"),e.addColorStop(.5,"rgb(150,150,156)"),e.addColorStop(.82,"rgb(214,214,218)"),e.addColorStop(1,"rgb(255,255,255)"),t.fillStyle=e,t.fillRect(0,0,128,128),bs=new Le(s),bs.colorSpace=Qt,bs}function uS({y:s=-.355,w:t=2.3,len:e=4.8}={}){const n=new bi({map:hS(),transparent:!0,depthWrite:!1,blending:La,toneMapped:!1}),i=new Q(new Ce(t,e),n);return i.rotation.x=-Math.PI/2,i.position.set(0,s,0),i.renderOrder=-1,i}const ja=[{z:-2.16,hw:.84,yb:-.13,hip:.16,yt:.33,topW:.6},{z:-1.9,hw:.98,yb:-.06,hip:.14,yt:.4,topW:.76},{z:-1.45,hw:1.05,yb:.04,hip:.12,yt:.46,topW:.78},{z:-1.1,hw:.97,yb:-.19,hip:.15,yt:.66,topW:.58},{z:-.72,hw:.95,yb:-.2,hip:.16,yt:.83,topW:.5},{z:-.3,hw:.95,yb:-.2,hip:.16,yt:.85,topW:.5},{z:.24,hw:.96,yb:-.18,hip:.13,yt:.64,topW:.6},{z:.8,hw:.98,yb:-.16,hip:.08,yt:.44,topW:.8},{z:1.45,hw:1.04,yb:.04,hip:.05,yt:.43,topW:.82},{z:1.85,hw:.94,yb:-.08,hip:.05,yt:.36,topW:.72},{z:2.08,hw:.8,yb:-.13,hip:.02,yt:.26,topW:.6},{z:2.2,hw:.68,yb:-.14,hip:0,yt:.18,topW:.52}],dS="gt";function fS(s,t){const e=new Q(id(ja,{zStart:.28,zEnd:-1.16,beltFrac:.6,steps:26}),od());s.add(e),s.add(new Q(nd(ja,[{type:"ring",z:.46,from:.8,to:1},{type:"rail",k:.8,zFrom:.46,zTo:1.92},{type:"ring",z:1.92,from:.8,to:1},{type:"ring",z:.3,from:.2,to:.58},{type:"ring",z:-1.05,from:.2,to:.58},{type:"ring",z:-1.24,from:.8,to:1},{type:"rail",k:.8,zFrom:-1.9,zTo:-1.24},{type:"ring",z:-1.9,from:.8,to:1}]),Hn())),s.add(ld({z:1.98,y:.12,x:.56}));const n=cd({z:-2.13,y:.16,width:1.34});return s.add(n.group),s.add(hd({z:.34,y:.3,x:.95,color:t.color})),s.add(ud({z:2.205,y:-.05,w:.62,h:.13})),s.add(dd({z:2.12,y:-.18,w:1.3})),s.add(fd({z:-1.95,y:-.27,w:1.44})),s.add(pd({z:-1.9,y:.58,span:1.5,deckY:.38,style:"gt"})),s.add(md({z:-2.1,y:-.16,x:.42,count:2})),s.add(gd({frontZ:2.21,frontY:.05,rearZ:-2.17,rearY:.27,plateY:-.03})),s.add(Ml({y:-.26,w:1.42,len:3.5})),s.add(vd({zF:1.45,zR:-1.45,x:.86})),{brakeLights:n.brakeMesh}}const pS=Object.freeze(Object.defineProperty({__proto__:null,decorate:fS,keys:ja,wheelStyle:dS},Symbol.toStringTag,{value:"Module"})),Za=[{z:-2.18,hw:.9,yb:-.1,hip:.2,yt:.44,topW:.66},{z:-1.92,hw:1.02,yb:-.02,hip:.16,yt:.5,topW:.84},{z:-1.45,hw:1.09,yb:.05,hip:.13,yt:.54,topW:.84},{z:-1.08,hw:1,yb:-.17,hip:.17,yt:.78,topW:.62},{z:-.72,hw:.98,yb:-.18,hip:.18,yt:.89,topW:.58},{z:-.3,hw:.98,yb:-.18,hip:.17,yt:.9,topW:.58},{z:.28,hw:1,yb:-.16,hip:.13,yt:.68,topW:.68},{z:.62,hw:1.02,yb:-.15,hip:.08,yt:.5,topW:.84},{z:1.45,hw:1.06,yb:.05,hip:.05,yt:.47,topW:.84},{z:1.98,hw:.94,yb:-.1,hip:.06,yt:.42,topW:.74},{z:2.22,hw:.78,yb:-.12,hip:.02,yt:.3,topW:.6}],mS="muscle";function gS(s,t){const e=new Q(id(Za,{zStart:.4,zEnd:-1.1,beltFrac:.62,steps:24}),od());s.add(e),s.add(new Q(nd(Za,[{type:"ring",z:.5,from:.8,to:1},{type:"rail",k:.8,zFrom:.5,zTo:2.02},{type:"ring",z:2.02,from:.8,to:1},{type:"ring",z:.34,from:.2,to:.58},{type:"ring",z:-1.02,from:.2,to:.58},{type:"ring",z:-1.18,from:.8,to:1},{type:"rail",k:.8,zFrom:-1.86,zTo:-1.18},{type:"ring",z:-1.86,from:.8,to:1}]),Hn()));const n=new Q(new Rt(.56,.1,.85),Hn());n.position.set(0,.49,1.02),s.add(n);const i=new Q(new Rt(.46,.07,.1),fr());i.position.set(0,.51,1.46),s.add(i),s.add(ld({z:2.1,y:.16,x:.58}));const o=cd({z:-2.15,y:.22,width:1.44});return s.add(o.group),s.add(hd({z:.44,y:.34,x:.99,color:t.color})),s.add(ud({z:2.225,y:.1,w:1,h:.22})),s.add(dd({z:2.14,y:-.17,w:1.36})),s.add(fd({z:-1.97,y:-.26,w:1.5})),s.add(pd({z:-1.96,deckY:.5,span:1.6,style:"ducktail"})),s.add(md({z:-2.14,y:-.14,x:.48,count:4})),s.add(gd({frontZ:2.24,frontY:.1,rearZ:-2.19,rearY:.37,plateY:.02})),s.add(Ml({y:-.26,w:1.48,len:3.7})),s.add(vd({zF:1.45,zR:-1.45,x:.88})),{brakeLights:o.brakeMesh}}const vS=Object.freeze(Object.defineProperty({__proto__:null,decorate:gS,keys:Za,wheelStyle:mS},Symbol.toStringTag,{value:"Module"})),xS=[{z:-2.1,hw:.24,yb:-.1,hip:0,yt:.16,topW:.14},{z:-1.55,hw:.36,yb:-.12,hip:0,yt:.36,topW:.18},{z:-.95,hw:.42,yb:-.12,hip:.02,yt:.56,topW:.22},{z:-.35,hw:.48,yb:-.13,hip:.04,yt:.34,topW:.4},{z:.35,hw:.44,yb:-.13,hip:.02,yt:.26,topW:.36},{z:1.05,hw:.32,yb:-.1,hip:0,yt:.18,topW:.24},{z:1.6,hw:.22,yb:-.07,hip:0,yt:.13,topW:.15},{z:2.05,hw:.11,yb:-.03,hip:0,yt:.08,topW:.07}],yS="openWheel";function Wh({z:s,y:t,span:e,chord:n=.32,mat:i,tilt:o=-.12,elements:r=1}){const a=new re,l=new xr;l.moveTo(-n/2,0),l.quadraticCurveTo(-n*.25,.045,n*.18,.028),l.quadraticCurveTo(n*.42,.012,n/2,0),l.quadraticCurveTo(n*.18,-.028,-n*.18,-.025),l.quadraticCurveTo(-n*.4,-.018,-n/2,0);const c=new Ws(l,{depth:e,bevelEnabled:!1});c.translate(0,0,-e/2),c.rotateY(Math.PI/2);for(let h=0;h<r;h++){const d=new Q(c,i);d.rotation.x=o-h*.18,d.position.set(0,t+h*.12,s+h*.05),d.castShadow=!0,a.add(d)}for(const h of[-1,1]){const d=new Q(new Rt(.025,.26,n*1.3),i);d.position.set(h*e/2,t+.05,s),a.add(d)}return a}function MS(s,t){const e=wr(t.color),n=fr(),i=new Q(new fe(.12,.16,.22,16,1,!1,0,Math.PI),n);i.rotation.set(Math.PI/2,0,0),i.position.set(0,.5,-.78),s.add(i);const o=Hn(),r=new Q(new ls(.3,.025,10,24,Math.PI),o);r.rotation.set(0,Math.PI/2,0),r.position.set(0,.16,-.3),s.add(r);const a=new Q(new fe(.03,.03,.26,8),o);a.position.set(0,.12,.18),a.rotation.x=.2,s.add(a);const l=new Q(new Rt(.34,.18,.22),n);l.position.set(0,.26,-.62),s.add(l);const c=new Q(new ur(.13,16,12),e);c.scale.set(1,1.1,1.15),c.position.set(0,.26,-.42),s.add(c);const h=new Q(new ur(.118,16,8,0,Math.PI*2,.7,.5),new un({color:1053720,roughness:.1,metalness:.2}));h.scale.set(1,1.1,1.15),h.position.set(0,.27,-.41),s.add(h);for(const v of[-1,1]){const g=new Q(new Rt(.34,.3,1.2),e);g.geometry.translate(0,0,0),g.position.set(v*.52,-.05,.05),g.scale.set(1,1,1),g.castShadow=!0,s.add(g);const m=new Q(new Rt(.3,.24,.08),n);m.position.set(v*.52,-.04,.66),s.add(m)}for(const v of[-1,1]){const g=new Q(new Rt(.02,.22,.5),n);g.position.set(v*.62,-.12,.85),g.rotation.y=v*.2,s.add(g)}s.add(Wh({z:1.95,y:-.22,span:1.75,chord:.42,mat:n,tilt:.06,elements:2}));for(const v of[-1,1]){const g=new Q(new Rt(.04,.22,.1),n);g.position.set(v*.12,-.12,1.9),s.add(g)}s.add(Wh({z:-1.95,y:.5,span:1.25,chord:.34,mat:n,tilt:-.34,elements:2}));for(const v of[-1,1]){const g=new Q(new Rt(.05,.7,.1),n);g.position.set(v*.18,.2,-1.95),s.add(g)}const d=rd(),u=new Q(new Rt(.08,.12,.05),d);u.position.set(0,.12,-2.06),u.userData.noMerge=!0,s.add(u);const f=new Q((()=>{const v=new fe(.06,.06,.2,14);return v.rotateX(Math.PI/2),v})(),xl());f.position.set(0,.06,-2.12),s.add(f);const p=Ml({y:-.28,w:.95,len:3.2});return p.position.z=-.1,s.add(p),{brakeLights:u}}const _S=Object.freeze(Object.defineProperty({__proto__:null,decorate:MS,keys:xS,wheelStyle:yS},Symbol.toStringTag,{value:"Module"})),Vh={gt:pS,muscle:vS,"open-wheel":_S},SS=-.37,Ma=new Map;function wS(s,t){return Ma.has(s)||Ma.set(s,t.keys?N1(t.keys,{ringsPerSegment:9,profilePoints:16}):null),Ma.get(s)}function bS(s="gt",t=13112861){const e=Vh[s]||Vh.gt,n=new re,i=new re;i.position.y=SS,n.add(i);const o=wr(t),r=wS(s,e);if(r){const c=new Q(r,o);c.castShadow=!0,c.receiveShadow=!0,c.userData.noMerge=!0,c.userData.isHull=!0,i.add(c)}const a=e.decorate(i,{color:t});ad(i);const l=[];for(let c=0;c<4;c++)l.push(aS(e.wheelStyle));return i.add(uS()),{root:n,wheels:l,brakeLights:a.brakeLights,_brakeLevel:0}}const _a={x:.92,y:.32,z:2.18},Vi=.36,ES=.32,Xh=2.9,Ct={massKg:1350,idleRpm:1100,redlineRpm:7600,shiftUpRpm:7250,shiftDownRpm:3300,shiftTime:.22,torqueCurve:[[1e3,320],[2200,430],[3500,505],[4900,540],[5900,525],[6800,500],[7300,472],[7600,440]],gears:[3.45,2.28,1.71,1.34,1.08,.9],reverseRatio:3.3,finalDrive:3.55,drivelineEff:.88,engineBrakeNm:36,engineInertia:.15,wheelInertia:.9,airDensity:1.225,cdA:.92,clA:2.1,downforcePos:-.25,crr:.014,mu:{road:1.45,kerb:1.22,grass:.55,gravel:.5},surfaceDrag:{road:0,kerb:0,grass:.12,gravel:.2},scrubCoef:.38,loadSensitivity:.14,loadMuClamp:.22,slipGripFloor:.86,brakeFront:50,brakeRear:28,handbrake:55,maxSteer:.62,steerSlipMargin:2,steerFloor:.02,maxReverseSpeed:8.5};function TS(s){const t=Ct.torqueCurve;if(s<=t[0][0])return t[0][1];for(let e=1;e<t.length;e++)if(s<=t[e][0]){const n=(s-t[e-1][0])/(t[e][0]-t[e-1][0]);return t[e-1][1]+(t[e][1]-t[e-1][1])*n}return t[t.length-1][1]}function Sa(s,t,e){if(e<=1)return s;const n=1-Ct.loadSensitivity*(t/e-1),i=1-Ct.loadMuClamp,o=1+Ct.loadMuClamp;return s*Math.min(o,Math.max(i,n))}function xd(s,t,e={}){const n=e.color??13112861,i=e.archetype??"gt",o=bS(i,n),r=new cs(new T(_a.x,_a.y,_a.z)),a=new Pt({mass:Ct.massKg,material:t.chassisMat});a.addShape(r,new T(0,.2,0)),a.shapeOffsets[0].y=-.05,a.angularDamping=.25;const l=new Hy({chassisBody:a,indexRightAxis:0,indexUpAxis:1,indexForwardAxis:2}),c={radius:Vi,directionLocal:new T(0,-1,0),suspensionStiffness:46,suspensionRestLength:ES,frictionSlip:Ct.mu.road,dampingRelaxation:2.6,dampingCompression:4.8,maxSuspensionForce:1e5,rollInfluence:.05,axleLocal:new T(-1,0,0),chassisConnectionPointLocal:new T,maxSuspensionTravel:.3,customSlidingRotationalSpeed:-30,useCustomSlidingRotationalSpeed:!0,forwardAcceleration:.55},h=Xh/2,d=.86,u=-.05;[new T(d,u,h),new T(-d,u,h),new T(d,u,-h),new T(-d,u,-h)].forEach(D=>{l.addWheel({...c,chassisConnectionPointLocal:D})}),l.addToWorld(s);const p={gear:1,mode:"D",shiftT:0,rpm:Ct.idleRpm,engineRpm:Ct.idleRpm,wheelOmega:0,smoothedRpm:Ct.idleRpm,steer:0,surfaces:["road","road","road","road"],slip:0},v={rpm:Ct.idleRpm,rpmFrac:0,gearLabel:"N",speedKmh:0,slip:0};new T;const g=new T,m=new T,x=new T;function y(){const D=a.quaternion,F=2*(D.x*D.z+D.w*D.y),R=1-2*(D.x*D.x+D.y*D.y),L=a.velocity;return L.x*F+L.z*R}function M(){const D=a.quaternion,F=1-2*(D.y*D.y+D.z*D.z),R=2*(D.x*D.z-D.w*D.y),L=a.velocity;return L.x*F+L.z*R}function w(){const D=a.velocity,F=D.x*D.x+D.y*D.y+D.z*D.z,R=Math.sqrt(F);if(R>.5){const k=.5*Ct.airDensity*Ct.cdA*F;g.set(-D.x/R*k,-D.y/R*k,-D.z/R*k),a.applyForce(g,T.ZERO)}const L=D.x*D.x+D.z*D.z,U=.5*Ct.airDensity*Ct.clA*L;if(U>1){const k=a.quaternion;x.set(2*(k.x*k.y-k.w*k.z),1-2*(k.x*k.x+k.z*k.z),2*(k.y*k.z+k.w*k.x)),g.set(-x.x*U,-x.y*U,-x.z*U);const V=Ct.downforcePos;m.set(2*(k.x*k.z+k.w*k.y)*V,2*(k.y*k.z-k.w*k.x)*V,(1-2*(k.x*k.x+k.y*k.y))*V),a.applyForce(g,m)}let q=0;for(let k=0;k<4;k++){const V=l.wheelInfos[k];if(!V.isInContact)continue;q+=V.suspensionForce;const Y=Ct.surfaceDrag[p.surfaces[k]]||0;if(Y>0&&R>.5){const et=Y*V.suspensionForce;g.set(-D.x/R*et,0,-D.z/R*et),m.set(V.raycastResult.hitPointWorld.x-a.position.x,0,V.raycastResult.hitPointWorld.z-a.position.z),a.applyForce(g,m)}}if(R>.5&&q>0){const k=Ct.crr*q;g.set(-D.x/R*k,0,-D.z/R*k),a.applyForce(g,T.ZERO)}const H=y(),G=M();if(Math.hypot(H,G)>4){const k=Math.atan2(Math.abs(G),Math.abs(H));if(k>.035){const V=Ct.scrubCoef*Math.sin(k)*Math.max(q,1);g.set(-D.x/R*V,0,-D.z/R*V),a.applyForce(g,T.ZERO)}}}s.addEventListener("preStep",w);function S(D,F,R){if(R)for(let _t=0;_t<4;_t++)p.surfaces[_t]=R[_t];const L=y(),U=Math.hypot(a.velocity.x,a.velocity.z),q=[0,0,0,0];let H=0,G=0;for(let _t=0;_t<4;_t++){const Et=l.wheelInfos[_t].suspensionForce||0;q[_t]=Et,Et>0&&(H+=Et,G+=1)}const j=G>0?H/G:Ct.massKg*9.82/4;p.mode==="D"&&D.brake>.1&&L<.5&&U<1?(p.mode="R",p.gear=1):p.mode==="R"&&D.throttle>.1&&L>-.5&&(p.mode="D",p.gear=1);const k=_t=>Ct.gears[_t-1]*Ct.finalDrive;p.shiftT>0&&(p.shiftT-=F);const V=p.mode==="D"?k(p.gear):Ct.reverseRatio*Ct.finalDrive,Y=Math.abs(L)/(2*Math.PI*Vi),et=We.clamp(Y*60*V,Ct.idleRpm,Ct.redlineRpm);p.mode==="D"&&p.shiftT<=0&&(et>Ct.shiftUpRpm&&p.gear<Ct.gears.length?(p.gear+=1,p.shiftT=Ct.shiftTime):et<Ct.shiftDownRpm&&p.gear>1&&(p.gear-=1,p.shiftT=Ct.shiftTime*.6));const ht=p.mode==="D"?k(p.gear):Ct.reverseRatio*Ct.finalDrive,ut=p.mode==="D"?D.throttle:D.brake,it=p.mode==="D"?D.brake:D.throttle,ft=ut>.02&&p.shiftT<=0;let pt;ft?pt=TS(p.engineRpm)*ut:pt=-Ct.engineBrakeNm*(p.engineRpm/Ct.redlineRpm)*(L>1||p.engineRpm>Ct.idleRpm+50?1:0);const dt=p.mode==="R"?-1:1,Mt=pt*ht*Ct.drivelineEff/Vi*dt,O=a.angularVelocity.y,lt=Math.abs(U*O),Z=q[2],ct=q[3],tt=Sa(Ct.mu[p.surfaces[2]]??Ct.mu.road,Z,j)*Z+Sa(Ct.mu[p.surfaces[3]]??Ct.mu.road,ct,j)*ct,Tt=Ct.massKg*lt*.5*1.3;let vt=tt*tt-Tt*Tt;if(vt=vt>0?Math.sqrt(vt):0,p.slip>.14){const _t=We.clamp((p.slip-.14)/.5,0,1);vt*=We.lerp(1,Ct.slipGripFloor,_t)}let P=Mt;Z+ct>100&&(P=Mt>=0?Math.min(Mt,vt):Math.max(Mt,-vt)),p.mode==="R"&&-L>Ct.maxReverseSpeed&&(P=0);const C=Math.abs(L)/Vi,W=Ct.redlineRpm/60*2*Math.PI/ht;if(ft&&Z+ct>100&&Math.abs(Mt)>vt+1){const _t=Ct.engineInertia*ht*ht+2*Ct.wheelInertia,Et=Math.abs(pt)*ht*Ct.drivelineEff,Ht=Math.abs(P)*Vi;p.wheelOmega<C&&(p.wheelOmega=C),p.wheelOmega+=(Et-Ht)/_t*F,p.wheelOmega=We.clamp(p.wheelOmega,C,W)}else p.wheelOmega=C;p.engineRpm=We.clamp(Math.max(p.wheelOmega*ht*60/(2*Math.PI),Ct.idleRpm),Ct.idleRpm,Ct.redlineRpm),p.rpm=p.engineRpm;const ot=p.wheelOmega*Vi;p.slip=(ot-Math.abs(L))/Math.max(2.5,Math.abs(L));let st=0;it>.02&&(p.mode==="D"&&L>.5||p.mode==="R"&&L<-.5)&&(st=it),l.applyEngineForce(-P/2,2),l.applyEngineForce(-P/2,3);const xt=Ct.brakeFront*st;let mt=Ct.brakeRear*st;D.handbrake&&(mt=Math.max(mt,Ct.handbrake)),l.setBrake(xt,0),l.setBrake(xt,1),l.setBrake(mt,2),l.setBrake(mt,3);const St=Ct.mu.road*9.82*Ct.steerSlipMargin,Dt=Math.max(1,U*U),Ft=Math.min(Ct.maxSteer,St*Xh/Dt+Ct.steerFloor),at=-D.steer*Ft,Yt=4*Math.max(Ft,.12),Xt=We.clamp(at-p.steer,-Yt*F,Yt*F);p.steer+=Xt,l.setSteeringValue(p.steer,0),l.setSteeringValue(p.steer,1);for(let _t=0;_t<4;_t++){let Et=Sa(Ct.mu[p.surfaces[_t]]??Ct.mu.road,q[_t],j);D.handbrake&&_t>=2&&(Et*=.55),l.wheelInfos[_t].frictionSlip=Et}p.smoothedRpm+=(p.rpm-p.smoothedRpm)*Math.min(1,F*12),v.rpm=p.smoothedRpm,v.rpmFrac=We.clamp((p.smoothedRpm-Ct.idleRpm)/(Ct.redlineRpm-Ct.idleRpm),0,1),v.speedKmh=U*3.6,v.slip=p.slip,U<.6&&ut<.05?v.gearLabel="N":p.mode==="R"?v.gearLabel="R":v.gearLabel=String(p.gear);const Bt=Math.min(1,Math.max(st,D.handbrake?.8:0));_(Bt*1.6)}const b=o.wheels;function A(){for(let D=0;D<l.wheelInfos.length;D++){l.updateWheelTransform(D);const F=l.wheelInfos[D].worldTransform,R=b[D];R.position.copy(F.position),R.quaternion.copy(F.quaternion)}o.root.position.copy(a.position),o.root.quaternion.copy(a.quaternion),o.brakeLights.material.emissiveIntensity=o._brakeLevel,o.brakeLights.material.opacity=.5+o._brakeLevel*.5}function _(D){o._brakeLevel=D}function E(D,F=0){a.position.set(D.x,D.y,D.z),a.velocity.setZero(),a.angularVelocity.setZero();const R=new me;R.setFromAxisAngle(new T(0,1,0),F),a.quaternion.copy(R),p.gear=1,p.mode="D",p.shiftT=0,p.steer=0,p.rpm=Ct.idleRpm,p.engineRpm=Ct.idleRpm,p.wheelOmega=0,p.smoothedRpm=Ct.idleRpm,p.slip=0,l.applyEngineForce(0,2),l.applyEngineForce(0,3),l.setSteeringValue(0,0),l.setSteeringValue(0,1);for(let L=0;L<4;L++)l.setBrake(0,L)}function N(){s.removeEventListener("preStep",w),l.removeFromWorld(s),s.removeBody(a)}return{visual:o,body:a,vehicle:l,update:A,setBrakeLight:_,reset:E,applyControls:S,dispose:N,telemetry:v,spec:Ct}}function AS(s){const t=new Set,e={throttle:0,brake:0,steer:0,handbrake:!1,cameraToggle:!1,reset:!1,rescue:!1,lineToggle:!1},n=PS(s),i=u=>{t.add(u.code),Qo(u.code,s.cameraToggle)&&(e.cameraToggle=!0),Qo(u.code,s.reset)&&(e.reset=!0),Qo(u.code,s.rescue)&&(e.rescue=!0),Qo(u.code,s.lineToggle)&&(e.lineToggle=!0),n.has(u.code)&&u.preventDefault()},o=u=>t.delete(u.code),r=()=>t.clear();window.addEventListener("keydown",i),window.addEventListener("keyup",o),window.addEventListener("blur",r);function a(u){const f=Es(t,s.throttle),p=Es(t,s.brake),v=Es(t,s.left),g=Es(t,s.right);e.handbrake=Es(t,s.handbrake),e.throttle=wa(e.throttle,f?1:0,u*(f?4:6)),e.brake=wa(e.brake,p?1:0,u*(p?6:8));let m=0;return v&&(m-=1),g&&(m+=1),e.steer=wa(e.steer,m,u*(m===0?6:3.2)),e}function l(){const u=e.cameraToggle;return e.cameraToggle=!1,u}function c(){const u=e.reset;return e.reset=!1,u}function h(){const u=e.rescue;return e.rescue=!1,u}function d(){const u=e.lineToggle;return e.lineToggle=!1,u}return{update:a,consumeToggle:l,consumeReset:c,consumeRescue:h,consumeLineToggle:d,state:e}}const qh={throttle:["KeyW","ArrowUp"],brake:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],handbrake:"Space",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},CS={throttle:"KeyW",brake:"KeyS",left:"KeyA",right:"KeyD",handbrake:"ShiftLeft",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},RS={throttle:"ArrowUp",brake:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",handbrake:"Numpad0",cameraToggle:null,reset:null,rescue:null,lineToggle:null};function Es(s,t){return t?Array.isArray(t)?t.some(e=>s.has(e)):s.has(t):!1}function Qo(s,t){return t?Array.isArray(t)?t.includes(s):s===t:!1}function PS(s){const t=new Set;for(const e of Object.values(s))e&&(Array.isArray(e)?e.forEach(n=>t.add(n)):t.add(e));return t}function wa(s,t,e){const n=1-Math.exp(-e);return s+(t-s)*n}function LS(s){let t=0;const e=new z,n=new z,i=new z,o=new z;let r=!1;const a=new on;new z;const l=new z,c=new z,h=new z(0,1,0),d=[{dist:7.2,height:2.7,lookHeight:1,fov:62,lag:.18},{dist:0,height:1.05,lookHeight:1.05,fov:72,lag:.04,hood:!0},{dist:10,height:4,lookHeight:1.2,fov:56,lag:.32}];function u(p,v,g){const m=d[t];if(s.fov+=(m.fov-s.fov)*Math.min(1,p*6),s.updateProjectionMatrix(),a.set(v.quaternion.x,v.quaternion.y,v.quaternion.z,v.quaternion.w),l.set(0,0,1).applyQuaternion(a).normalize(),c.crossVectors(h,l).normalize(),m.hood)e.set(v.position.x,v.position.y+m.height,v.position.z).add(l.clone().multiplyScalar(.25)),n.copy(e).add(l.clone().multiplyScalar(8));else{const y=m.dist+Math.min(2.5,g*.04),M=m.height+Math.min(.8,g*.012);e.copy(v.position).add(l.clone().multiplyScalar(-y)).add(h.clone().multiplyScalar(M)),n.copy(v.position).add(l.clone().multiplyScalar(2)).add(h.clone().multiplyScalar(m.lookHeight))}r||(i.copy(e),o.copy(n),r=!0);const x=1-Math.exp(-p/Math.max(.001,m.lag));i.lerp(e,x),o.lerp(n,Math.min(1,x*1.4)),s.position.copy(i),s.lookAt(o)}function f(){t=(t+1)%d.length,r=!1}return{update:u,cycle:f,getMode:()=>t}}function IS(s=320){const t=document.getElementById("rpm-arc"),e=document.getElementById("speed-num"),n=document.getElementById("gear-num"),i=document.getElementById("lap-current"),o=document.getElementById("lap-total"),r=document.getElementById("lap-time"),a=document.getElementById("best-time"),l=document.getElementById("hud-position-block"),c=document.getElementById("pos-current"),h=document.getElementById("pos-total"),d=document.getElementById("race-banner"),u=document.getElementById("wrong-way"),f=document.getElementById("pace-pill"),p=document.getElementById("pace-target"),v=document.getElementById("pace-delta");let g=null;const m=document.getElementById("ticks"),x=110,y=110,M=96,w=Math.PI*.75,S=Math.PI*.25+Math.PI*2;for(let it=0;it<=16;it++){const ft=it/16,pt=w+(S-w)*ft,dt=x+Math.cos(pt)*(M-2),Mt=y+Math.sin(pt)*(M-2),O=x+Math.cos(pt)*(M-(it%4===0?16:9)),lt=y+Math.sin(pt)*(M-(it%4===0?16:9)),Z=document.createElementNS("http://www.w3.org/2000/svg","line");Z.setAttribute("x1",dt),Z.setAttribute("y1",Mt),Z.setAttribute("x2",O),Z.setAttribute("y2",lt),Z.setAttribute("stroke",it%4===0?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.35)"),Z.setAttribute("stroke-width",it%4===0?"2":"1"),m.appendChild(Z)}const b=document.getElementById("minimap"),A=b.getContext("2d");let _=null,E=null,N=null;function D(it,ft,pt){const dt=pt!=null?Math.max(0,Math.min(1,pt)):Math.max(0,Math.min(1,it/s)),Mt=w,O=w+(S-w)*dt,lt=x+Math.cos(Mt)*M,Z=y+Math.sin(Mt)*M,ct=x+Math.cos(O)*M,tt=y+Math.sin(O)*M,Tt=O-Mt>Math.PI?1:0;t.setAttribute("d",`M ${lt} ${Z} A ${M} ${M} 0 ${Tt} 1 ${ct} ${tt}`),e.textContent=Math.round(it),n.textContent=ft}function F(it,ft){i.textContent=it,o.textContent=ft}function R(it){r.textContent=Yh(it)}function L(it){a.textContent=it==null?"--:--.---":Yh(it)}function U(it,ft){l.classList.remove("hidden"),c.textContent=it,h.textContent=ft}function q(){l.classList.add("hidden")}function H(it,ft=1800){d.textContent=it,d.classList.remove("hidden"),g&&clearTimeout(g),g=setTimeout(()=>{d.classList.add("hidden"),g=null},ft)}function G(it){u.classList.toggle("hidden",!it)}function j(it,ft){f.classList.remove("hidden"),p.textContent=Math.round(it);let pt,dt;ft>3?(pt="pace-over",dt=`+${Math.round(ft)} TOO FAST`):ft<-8?(pt="pace-under",dt=`−${Math.round(-ft)} COULD GO FASTER`):(pt="pace-on",dt="ON PACE"),v.textContent=dt,v.className=pt}function k(){f.classList.add("hidden")}function V(){g&&(clearTimeout(g),g=null),d.classList.add("hidden"),u.classList.add("hidden")}function Y(){document.getElementById("ui").classList.remove("hidden")}function et(){document.getElementById("ui").classList.add("hidden")}function ht(it){const ft=it.frames;let pt=1/0,dt=-1/0,Mt=1/0,O=-1/0;for(const xt of ft)xt.pos.x<pt&&(pt=xt.pos.x),xt.pos.x>dt&&(dt=xt.pos.x),xt.pos.z<Mt&&(Mt=xt.pos.z),xt.pos.z>O&&(O=xt.pos.z);const lt=18,Z=b.width,ct=b.height,tt=dt-pt,Tt=O-Mt,vt=(Z-lt*2)/tt,P=(ct-lt*2)/Tt,C=Math.min(vt,P),W=(Z-tt*C)/2-pt*C,rt=(ct-Tt*C)/2-Mt*C;_={minX:pt,maxX:dt,minZ:Mt,maxZ:O,scale:C,ox:W,oz:rt};const ot=new Path2D;for(let xt=0;xt<ft.length;xt++){const mt=ft[xt].pos.x*C+W,St=ft[xt].pos.z*C+rt;xt===0?ot.moveTo(mt,St):ot.lineTo(mt,St)}ot.closePath(),E=ot;const st=ft[0];N={x:st.pos.x*C+W,y:st.pos.z*C+rt}}function ut(it){if(!E)return;const ft=b.width,pt=b.height;A.clearRect(0,0,ft,pt),A.lineWidth=12,A.lineJoin="round",A.lineCap="round",A.strokeStyle="rgba(255, 255, 255, 0.10)",A.stroke(E),A.lineWidth=6,A.strokeStyle="rgba(220, 230, 240, 0.85)",A.stroke(E),N&&(A.fillStyle="rgba(255, 215, 74, 0.9)",A.beginPath(),A.arc(N.x,N.y,4,0,Math.PI*2),A.fill(),A.strokeStyle="rgba(0, 0, 0, 0.6)",A.lineWidth=1,A.stroke());const dt=[...it].sort((Mt,O)=>(Mt.isPlayer?1:0)-(O.isPlayer?1:0));for(const Mt of dt){const O=Mt.pos.x*_.scale+_.ox,lt=Mt.pos.z*_.scale+_.oz,Z=Mt.isPlayer?5:4;A.beginPath(),A.arc(O,lt,Z+2,0,Math.PI*2),A.fillStyle="rgba(0, 0, 0, 0.55)",A.fill(),A.beginPath(),A.arc(O,lt,Z,0,Math.PI*2),A.fillStyle=DS(Mt.color),A.fill(),Mt.isPlayer&&(A.strokeStyle="#fff",A.lineWidth=1.4,A.stroke())}}return{setSpeed:D,setLap:F,setLapTime:R,setBest:L,setPosition:U,hidePosition:q,setPace:j,hidePace:k,flashBanner:H,setWrongWay:G,clearAnnouncements:V,show:Y,hide:et,buildMinimap:ht,drawMinimap:ut}}function DS(s){const t=s>>16&255,e=s>>8&255,n=s&255;return`rgb(${t}, ${e}, ${n})`}function Yh(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3;return`${ba(e,2)}:${ba(n,2)}.${ba(i,3)}`}function ba(s,t){return s.toString().padStart(t,"0")}function yd(s,t={}){const e=t.skill??.85,n=9.82*1.45*(.62+.3*e),i=8.5,o=46+14*e,r={throttle:0,brake:0,steer:0,handbrake:!1},a=s.frames,l=a.length,c=new Float32Array(l);for(let x=0;x<l;x++)c[x]=a[x].pos.distanceTo(a[(x+1)%l].pos);const h=new Float32Array(l);for(let x=0;x<l;x++){const y=a[x].tan,M=a[(x+1)%l].tan,w=Math.max(0,1-y.dot(M)),S=Math.sqrt(2*w);h[x]=S/Math.max(.5,c[x])}const d=new Float32Array(l);for(let x=0;x<l;x++){let y=0;for(let M=-2;M<=2;M++)y+=h[(x+M+l)%l];d[x]=y/5}const u=new Float32Array(l);for(let x=0;x<l;x++)u[x]=Math.min(o,Math.sqrt(n/Math.max(1e-4,d[x])));for(let x=0;x<2;x++)for(let y=l-1;y>=0;y--){const M=u[(y+1)%l],w=Math.sqrt(M*M+2*i*c[y]);u[y]>w&&(u[y]=w)}const f=new z,p=new z;let v=0,g=0;function m(x,y,M=1/60){const w=x.body.position,S=NS(a,w),b=Math.hypot(x.body.velocity.x,x.body.velocity.z),A=2+Math.floor(b/18);let _=1/0;for(let ut=0;ut<=A;ut++)_=Math.min(_,u[(S+ut)%l]);const E=Math.max(7,b*.55);let N=S,D=0;for(;D<E;)D+=c[N%l],N++;const F=a[N%l].pos,R=x.body.quaternion,L=2*(R.x*R.z+R.w*R.y),U=1-2*(R.x*R.x+R.y*R.y);p.set(L,0,U).normalize(),f.set(F.x-w.x,0,F.z-w.z);const q=Math.max(2,f.length());f.normalize();const H=We.clamp(p.dot(f),-1,1),G=Math.acos(H),k=p.x*f.z-p.z*f.x<0?-G:G,Y=2*Math.sin(k)/q*2.9,et=Math.max(1,b*b),ht=Math.min(.62,1.45*9.82*2*2.9/et+.02);if(r.steer=We.clamp(Y/ht,-1,1),b<_-.5){const ut=Math.min(1,Math.abs(r.steer));r.throttle=We.lerp(1,.55,ut*.7),r.brake=0}else b>_+1?(r.throttle=0,r.brake=We.clamp((b-_)/6,.2,1)):(r.throttle=.35,r.brake=0);if(y)for(const ut of y){if(!ut||ut===x)continue;const it=ut.body.position.x-w.x,ft=ut.body.position.z-w.z,pt=it*p.x+ft*p.z,dt=-it*p.z+ft*p.x,Mt=Math.max(12,b*.95);if(pt<1||pt>Mt||Math.abs(dt)>2.4)continue;const O=ut.body.velocity,lt=b-Math.hypot(O.x,O.z);if(pt<6.5)r.throttle=0,r.brake=Math.max(r.brake,lt>1?1:.5);else if(lt>0){const Z=lt*lt/(2*Math.max(1,pt-6));r.brake=Math.max(r.brake,We.clamp(Z/6,0,1)),(r.brake>.1||pt<b*.45)&&(r.throttle=Math.min(r.throttle,.35))}Math.abs(r.steer)<.5&&(r.steer=We.clamp(r.steer+(dt>=0?-.15:.15),-1,1))}return g>0?(g-=M,r.throttle=0,r.brake=1,r.steer=-r.steer):(b<1.5&&r.throttle>.5?v+=M:v=Math.max(0,v-M*2),v>1.2&&(v=0,g=1.5)),r}return{update:m}}function NS(s,t){let e=0,n=1/0;for(let i=0;i<s.length;i++){const o=s[i].pos.x-t.x,r=s[i].pos.z-t.z,a=o*o+r*r;a<n&&(n=a,e=i)}return e}const US=13,FS=10,OS=7.5,zS=71,BS=215e3,Md=1350,kS=.5*1.225*.92,GS=.014*Md*9.82,HS=.55,jh=.045,WS=[1,.13,.1],$o=[.93,.95,.97],VS=[.1,.95,.32];function Zh(s,t){const e=t.frames,n=t.racingLineOffset,i=e.length,o=[];for(let w=0;w<i;w++){const S=e[w];o.push(new z(S.pos.x+S.left.x*n[w],S.pos.y,S.pos.z+S.left.z*n[w]))}const r=new Float32Array(i);for(let w=0;w<i;w++)r[w]=Math.max(.5,o[w].distanceTo(o[(w+1)%i]));const a=new Float32Array(i);for(let w=0;w<i;w++){const S=o[(w-1+i)%i],b=o[w],A=o[(w+1)%i],_=b.x-S.x,E=b.z-S.z,N=A.x-b.x,D=A.z-b.z,F=Math.hypot(_,E),R=Math.hypot(N,D),L=(_*N+E*D)/Math.max(1e-6,F*R),U=Math.acos(Math.min(1,Math.max(-1,L)));a[w]=U/Math.max(.5,(F+R)/2)}const l=new Float32Array(i);for(let w=0;w<i;w++){let S=0;for(let b=-2;b<=2;b++)S+=a[(w+b+i)%i];l[w]=S/5}const c=new Float32Array(i);for(let w=0;w<i;w++)c[w]=Math.min(zS,Math.sqrt(US/Math.max(1e-4,l[w])));for(let w=0;w<2;w++)for(let S=i-1;S>=0;S--){const b=c[(S+1)%i],A=Math.sqrt(b*b+2*FS*r[S]);c[S]>A&&(c[S]=A)}const h=w=>Math.min(OS,Math.max(0,(BS/Math.max(8,w)-kS*w*w-GS)/Md));for(let w=0;w<2;w++)for(let S=0;S<i;S++){const b=(S+1)%i,A=Math.sqrt(c[S]*c[S]+2*h(c[S])*r[S]);c[b]>A&&(c[b]=A)}const d=new Float32Array(i*2*3),u=new Float32Array(i*2*3),f=HS/2;for(let w=0;w<i;w++){const S=e[w],b=o[w];d.set([b.x+S.left.x*f,b.y+jh,b.z+S.left.z*f],w*6),d.set([b.x-S.left.x*f,b.y+jh,b.z-S.left.z*f],w*6+3),u.set($o,w*6),u.set($o,w*6+3)}const p=[];for(let w=0;w<i;w++){const S=w*2,b=w*2+1,A=(w+1)%i*2,_=(w+1)%i*2+1;p.push(S,A,b,b,A,_)}const v=new ae;v.setAttribute("position",new ne(d,3));const g=new ne(u,3);g.setUsage(yf),v.setAttribute("color",g),v.setIndex(p);const m=new Q(v,new bi({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));m.renderOrder=3,m.visible=!1,s.add(m);function x(w){const S=g.array;for(let b=0;b<i;b++){const A=c[b]-w;let _,E,N;A<=1?(_=WS,E=$o,N=Math.max(0,(A+1)/2)):(_=$o,E=VS,N=Math.min(1,(A-1)/2));const D=_[0]+(E[0]-_[0])*N,F=_[1]+(E[1]-_[1])*N,R=_[2]+(E[2]-_[2])*N,L=b*6;S[L]=D,S[L+1]=F,S[L+2]=R,S[L+3]=D,S[L+4]=F,S[L+5]=R}g.needsUpdate=!0}function y(w){m.visible=w}function M(){s.remove(m),m.geometry.dispose(),m.material.dispose()}return{profile:c,update:x,setVisible:y,mesh:m,dispose:M}}const XS=3,qS=320;function YS(s){return s==="time-trial"?1:XS}const Ea=13112861,jS=2059519,ZS=[16436245,366185,15357964],Ta="gt",KS="muscle",JS=["open-wheel","gt","muscle"];QS();async function QS(){const s=document.getElementById("loading-status"),t=document.getElementById("loading-fill"),e=(y,M)=>{t.style.width=`${Math.round(y*100)}%`,M&&(s.textContent=M)};e(.05,"Booting renderer"),await Ts();const n=document.getElementById("game"),{renderer:i,scene:o,camera:r,composer:a,updateShadowTarget:l}=Bx(n);e(.25,"Building physics world"),await Ts();const{world:c,materials:h}=U_();e(.45,"Laying asphalt"),await Ts();const d=Rh(o,c,h,I1(Ih));e(.7,"Calibrating telemetry"),await Ts();const u=IS(qS);u.buildMinimap(d);const f=Zh(o,d),p=new nn(62,window.innerWidth/window.innerHeight,.6,3e3);o.add(p),e(1,"Ready"),await Ts(),document.getElementById("loading").classList.add("fade");const v={renderer:i,scene:o,camera:r,camera2:p,composer:a,world:c,materials:h,track:d,hud:u,racingLine:f,selectedTrackId:Ih,lineAid:!1,updateShadowTarget:l,cars:[],primaryPlayerIdx:0,mode:null,state:null};typeof window<"u"&&(window.__ctx=v,window.__createAIDriver=yd,window.__tick=y=>Qh(v,y,performance.now())),document.querySelectorAll("button.mode").forEach(y=>{y.addEventListener("click",()=>{const M=y.dataset.mode;Kh(v,M)})}),document.getElementById("finish-restart").addEventListener("click",()=>{v.mode&&Kh(v,v.mode)}),document.getElementById("finish-menu").addEventListener("click",()=>{Jh(v)}),window.addEventListener("keydown",y=>{y.code==="Escape"&&v.mode&&Jh(v)});function g(y){v.track.dispose(),v.racingLine.dispose(),v.track=Rh(o,c,h,y),v.racingLine=Zh(o,v.track),v.racingLine.setVisible(!1),v.hud.buildMinimap(v.track),v.selectedTrackId=y.id}tw(document.getElementById("track-list"),v,g),_d();let m=performance.now();function x(y){requestAnimationFrame(x);const M=Math.min(.05,(y-m)/1e3);m=y,v.mode&&Qh(v,M,y)}requestAnimationFrame(x)}function _d(){document.getElementById("menu").classList.remove("hidden")}function $S(){document.getElementById("menu").classList.add("hidden")}function tw(s,t,e){if(!s)return;s.innerHTML="";const n=[];for(const i of qa){const o=document.createElement("button");o.className="track-card"+(i.id===t.selectedTrackId?" selected":""),o.dataset.track=i.id;const r=i.difficulty.toLowerCase().replace(/[^a-z]/g,"");o.innerHTML=`<div class="track-head"><span class="track-name">${i.name}</span><span class="track-diff diff-${r}">${i.difficulty}</span></div><div class="track-sub">${i.subtitle}</div><div class="track-blurb">${i.blurb}</div>`,o.addEventListener("click",()=>{t.selectedTrackId!==i.id&&(n.forEach(a=>a.classList.remove("selected")),o.classList.add("selected"),e(i))}),s.appendChild(o),n.push(o)}}function Kh(s,t){if(Sd(s),s.mode=t,s.primaryPlayerIdx=0,s.state=iw(t),t==="time-trial")tr(s,qh,Ea,0,Ta),s.hud.hidePosition();else if(t==="quick-race"){tr(s,qh,Ea,0,Ta);for(let e=0;e<3;e++)sw(s,ZS[e],e+1,.78+e*.04,JS[e]);s.hud.setPosition(1,s.cars.length)}else t==="two-player"&&(tr(s,CS,Ea,0,Ta),tr(s,RS,jS,1,KS),s.hud.hidePosition());s.lineAid=t!=="two-player",s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace(),s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),_l(),$S(),s.hud.show()}function Jh(s){Sd(s),s.mode=null,s.state=null,s.racingLine.setVisible(!1),s.hud.hide(),s.hud.hidePosition(),s.hud.hidePace(),s.hud.clearAnnouncements(),_l(),_d()}function ew(s,t){return[...s.cars].sort((n,i)=>i.state.progress-n.state.progress).indexOf(t)+1}function nw(s){const t=s.cars[s.primaryPlayerIdx],e=t.state;let n="FINISHED",i="";if(s.mode==="time-trial")i=`LAP TIME   ${Aa(e.bestMs)}`;else if(s.mode==="quick-race"){const o=ew(s,t);n=o===1?"YOU WIN":`FINISHED  P${o}/${s.cars.length}`,i=`RACE TIME   ${Aa(e.finishMs)}`}else if(s.mode==="two-player"){const o=s.state.finishOrder[0];n=o&&o.label==="P2"?"PLAYER 2 WINS":"PLAYER 1 WINS",i=`TIME   ${Aa(o?o.state.finishMs:e.finishMs)}`}document.getElementById("finish-title").textContent=n,document.getElementById("finish-detail").textContent=i,document.getElementById("finish").classList.remove("hidden")}function _l(){document.getElementById("finish").classList.add("hidden")}function Aa(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3,o=(r,a)=>r.toString().padStart(a,"0");return`${o(e,2)}:${o(n,2)}.${o(i,3)}`}function iw(s){return{mode:s,totalLaps:YS(s),finishOrder:[],finishShown:!1,perCar:[]}}function Sl(){const s=performance.now();return{lap:1,bestMs:null,lapStart:s,raceStart:s,finishMs:null,lastT:0,sectorReached:!1,finished:!1,progress:0}}function tr(s,t,e,n,i="gt"){const o=xd(s.world,s.materials,{color:e,archetype:i});s.scene.add(o.visual.root),o.visual.wheels.forEach(c=>s.scene.add(c));const r=wl(s.track,n);o.reset(r.position,r.yaw);const a=AS(t),l=LS(n===0?s.camera:s.camera2);s.cars.push({car:o,color:e,isPlayer:!0,input:a,chase:l,state:Sl(),label:n===0?"P1":"P2"}),s.state.perCar.push(s.cars[s.cars.length-1])}function sw(s,t,e,n,i="gt"){const o=xd(s.world,s.materials,{color:t,archetype:i});s.scene.add(o.visual.root),o.visual.wheels.forEach(l=>s.scene.add(l));const r=wl(s.track,e);o.reset(r.position,r.yaw);const a=yd(s.track,{skill:n});s.cars.push({car:o,color:t,isPlayer:!1,ai:a,state:Sl(),label:"AI"}),s.state.perCar.push(s.cars[s.cars.length-1])}function wl(s,t){const e=-2.8-t*7,n=(t%2===0?1:-1)*2.5,i=s.frames[0];return{position:new z().copy(i.pos).add(i.tan.clone().multiplyScalar(e)).add(i.left.clone().multiplyScalar(n)).add(new z(0,1,0)),yaw:Math.atan2(i.tan.x,i.tan.z)}}function Sd(s){for(const t of s.cars)t.car.dispose(),s.scene.remove(t.car.visual.root),t.car.visual.wheels.forEach(e=>s.scene.remove(e));s.cars=[]}const Ca=1/120;let Ra=0;function Qh(s,t,e){Ra+=t;const n=window.innerWidth,i=window.innerHeight;if(s.mode==="two-player"){const c=Math.floor(n/2);s.camera.aspect=c/i,s.camera2.aspect=(n-c)/i}else s.camera.aspect=n/i;const o=s.cars.map(c=>c.car);for(const c of s.cars){let h;if(c.isPlayer){if(h=c.input.update(t),c.input.consumeToggle()&&c.chase.cycle(),c.input.consumeLineToggle()&&s.mode!=="two-player"&&(s.lineAid=!s.lineAid,s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace()),c.input.consumeReset()){for(const d of s.cars){const u=s.cars.indexOf(d),f=wl(s.track,u);d.car.reset(f.position,f.yaw),d.state=Sl()}s.state.finishOrder=[],s.state.finishShown=!1,s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),_l()}c.input.consumeRescue()&&Ka(s.track,c.car)}else h=c.ai.update(c.car,o,t);c.car.applyControls(h,t,rw(s.track,c.car))}for(;Ra>=Ca;)s.world.step(Ca),Ra-=Ca;for(const c of s.cars)c.car.update();for(const c of s.cars)aw(s.track,c.car);const r=s.cars[s.primaryPlayerIdx];r&&s.updateShadowTarget(r.car.body.position);for(const c of s.cars){if(!c.isPlayer)continue;const h=c.car.body.velocity,d=Math.hypot(h.x,h.y,h.z)*3.6;c.chase.update(t,c.car.body,d)}const a=s.cars[s.primaryPlayerIdx];if(a&&a.isPlayer){const c=a.car.telemetry;if(s.hud.setSpeed(c.speedKmh,c.gearLabel,c.rpmFrac),lw(a,s.track,s.hud,s.state),s.hud.setWrongWay(!a.state.finished&&uw(s.track,a.car)),s.lineAid){const h=a.car.body.velocity,d=Math.hypot(h.x,h.z);s.racingLine.update(d);const u=s.racingLine.profile[qs(s.track,a.car.body.position)];s.hud.setPace(u*3.6,(d-u)*3.6)}}for(const c of s.cars)c!==a&&cw(c,s.track,s.state);if(s.mode==="quick-race"){const h=[...s.cars].sort((d,u)=>u.state.progress-d.state.progress).indexOf(a)+1;s.hud.setPosition(h,s.cars.length)}(s.mode==="two-player"?s.state.finishOrder.length>=1:a&&a.state.finished)&&!s.state.finishShown&&(s.state.finishShown=!0,s.hud.setWrongWay(!1),nw(s)),s.hud.drawMinimap(s.cars.map(c=>({pos:c.car.body.position,color:c.color,isPlayer:c.isPlayer}))),s.mode!=="two-player"&&s.composer.passes.forEach(c=>{c.uniforms&&c.uniforms.uTime&&(c.uniforms.uTime.value=e*.001)}),s.mode==="two-player"?ow(s):s.composer.render()}function ow(s){const t=window.innerWidth,e=window.innerHeight,n=Math.floor(t/2);s.renderer.setScissorTest(!0),s.renderer.setViewport(0,0,n,e),s.renderer.setScissor(0,0,n,e),s.camera.aspect=n/e,s.camera.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera),s.renderer.setViewport(n,0,t-n,e),s.renderer.setScissor(n,0,t-n,e),s.camera2.aspect=(t-n)/e,s.camera2.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera2),s.renderer.setScissorTest(!1),s.renderer.setViewport(0,0,t,e),s.renderer.setScissor(0,0,t,e)}function Ts(){return new Promise(s=>requestAnimationFrame(()=>s()))}const er=["road","road","road","road"];function rw(s,t){const e=s.frames,n=e.length,i=qs(s,t.body.position);for(let o=0;o<4;o++){const r=t.vehicle.wheelInfos[o],a=r.isInContact?r.raycastResult.hitPointWorld:r.chassisConnectionPointWorld;let l=i,c=1/0;for(let f=-4;f<=4;f++){const p=(i+f+n)%n,v=e[p].pos.x-a.x,g=e[p].pos.z-a.z,m=v*v+g*g;m<c&&(c=m,l=p)}const h=e[l],d=Math.abs((a.x-h.pos.x)*h.left.x+(a.z-h.pos.z)*h.left.z),u=s.width/2;d<=u?er[o]="road":d<=u+s.kerbWidth?er[o]="kerb":er[o]=s.isGravel&&s.isGravel(l)?"gravel":"grass"}return er}function Ka(s,t){const e=t.body.position,n=s.frames;let i=0,o=1/0;for(let h=0;h<n.length;h++){const d=n[h].pos.x-e.x,u=n[h].pos.z-e.z,f=d*d+u*u;f<o&&(o=f,i=h)}const r=(i+4)%n.length,a=n[r],l=new z(a.pos.x,a.pos.y+1,a.pos.z),c=Math.atan2(a.tan.x,a.tan.z);t.reset(l,c)}function aw(s,t){const e=t.body.position;if(e.y<-2){Ka(s,t);return}const n=s.frames[qs(s,e)];Math.abs((e.x-n.pos.x)*n.left.x+(e.z-n.pos.z)*n.left.z)>s.armcoOffset+2.5&&Ka(s,t)}function wd(s,t,e,n){const i=s.state;if(i.finished)return null;const o=hw(t,s.car.body.position);o>.4&&o<.6&&(i.sectorReached=!0);let r=null;if(i.sectorReached&&i.lastT>.92&&o<.08){const a=n-i.lapStart;if((i.bestMs==null||a<i.bestMs)&&(i.bestMs=a),i.sectorReached=!1,i.lap>=e.totalLaps)return i.finished=!0,i.finishMs=n-i.raceStart,e.finishOrder.push(s),i.lastT=o,i.progress=e.totalLaps+100-(e.finishOrder.length-1),"finish";i.lap+=1,i.lapStart=n,r=i.lap===e.totalLaps?"final":"lap"}return i.lastT=o,i.progress=i.lap-1+o,r}function lw(s,t,e,n){const i=s.state,o=i.bestMs,r=performance.now(),a=wd(s,t,n,r);i.bestMs!==o&&e.setBest(i.bestMs),a==="finish"?(e.setLap(n.totalLaps,n.totalLaps),e.flashBanner("FINISH")):a==="final"?(e.setLap(i.lap,n.totalLaps),e.flashBanner("FINAL LAP")):a==="lap"&&(e.setLap(i.lap,n.totalLaps),e.flashBanner(`LAP ${i.lap} / ${n.totalLaps}`)),i.finished||e.setLapTime(r-i.lapStart)}function cw(s,t,e){wd(s,t,e,performance.now())}function qs(s,t){const e=s.frames;let n=0,i=1/0;for(let o=0;o<e.length;o++){const r=e[o].pos.x-t.x,a=e[o].pos.z-t.z,l=r*r+a*a;l<i&&(i=l,n=o)}return n}function hw(s,t){return qs(s,t)/s.frames.length}function uw(s,t){const e=t.body.velocity,n=Math.hypot(e.x,e.z);if(n<5)return!1;const i=s.frames[qs(s,t.body.position)].tan;return(e.x*i.x+e.z*i.z)/n<-.25}
