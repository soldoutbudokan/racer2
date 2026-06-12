(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const i of document.querySelectorAll('link[rel="modulepreload"]'))n(i);new MutationObserver(i=>{for(const r of i)if(r.type==="childList")for(const o of r.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&n(o)}).observe(document,{childList:!0,subtree:!0});function e(i){const r={};return i.integrity&&(r.integrity=i.integrity),i.referrerPolicy&&(r.referrerPolicy=i.referrerPolicy),i.crossOrigin==="use-credentials"?r.credentials="include":i.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(i){if(i.ep)return;i.ep=!0;const r=e(i);fetch(i.href,r)}})();/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const qa="160",fd=0,_c=1,pd=2,Lh=1,Ih=2,Fn=3,ei=0,Ve=1,De=2,Bn=0,$i=1,Ra=2,Mc=3,Sc=4,md=5,pi=100,gd=101,vd=102,wc=103,Ec=104,xd=200,yd=201,_d=202,Md=203,Pa=204,La=205,Sd=206,wd=207,Ed=208,bd=209,Td=210,Ad=211,Cd=212,Rd=213,Pd=214,Ld=0,Id=1,Dd=2,oo=3,Nd=4,Ud=5,Fd=6,Od=7,Dh=0,zd=1,Bd=2,$n=0,Nh=1,Uh=2,Fh=3,Ya=4,Gd=5,Oh=6,zh=300,es=301,ns=302,Ia=303,Da=304,mo=306,Je=1e3,dn=1001,Na=1002,Ce=1003,bc=1004,Ro=1005,Ke=1006,Hd=1007,Bs=1008,ti=1009,Wd=1010,kd=1011,ja=1012,Bh=1013,Zn=1014,Jn=1015,mn=1016,Gh=1017,Hh=1018,vi=1020,Vd=1021,fn=1023,Xd=1024,qd=1025,xi=1026,is=1027,Yd=1028,Wh=1029,jd=1030,kh=1031,Vh=1033,Po=33776,Lo=33777,Io=33778,Do=33779,Tc=35840,Ac=35841,Cc=35842,Rc=35843,Xh=36196,Pc=37492,Lc=37496,Ic=37808,Dc=37809,Nc=37810,Uc=37811,Fc=37812,Oc=37813,zc=37814,Bc=37815,Gc=37816,Hc=37817,Wc=37818,kc=37819,Vc=37820,Xc=37821,No=36492,qc=36494,Yc=36495,Kd=36283,jc=36284,Kc=36285,Zc=36286,qh=3e3,yi=3001,Zd=3200,Jd=3201,Yh=0,Qd=1,on="",$t="srgb",Hn="srgb-linear",Ka="display-p3",go="display-p3-linear",ao="linear",le="srgb",co="rec709",lo="p3",bi=7680,Jc=519,$d=512,tf=513,ef=514,jh=515,nf=516,sf=517,rf=518,of=519,Ua=35044,af=35048,Qc="300 es",Fa=1035,zn=2e3,ho=2001;class as{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[t]===void 0&&(n[t]=[]),n[t].indexOf(e)===-1&&n[t].push(e)}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return n[t]!==void 0&&n[t].indexOf(e)!==-1}removeEventListener(t,e){if(this._listeners===void 0)return;const i=this._listeners[t];if(i!==void 0){const r=i.indexOf(e);r!==-1&&i.splice(r,1)}}dispatchEvent(t){if(this._listeners===void 0)return;const n=this._listeners[t.type];if(n!==void 0){t.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,t);t.target=null}}}const Fe=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let $c=1234567;const Is=Math.PI/180,Gs=180/Math.PI;function En(){const s=Math.random()*4294967295|0,t=Math.random()*4294967295|0,e=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Fe[s&255]+Fe[s>>8&255]+Fe[s>>16&255]+Fe[s>>24&255]+"-"+Fe[t&255]+Fe[t>>8&255]+"-"+Fe[t>>16&15|64]+Fe[t>>24&255]+"-"+Fe[e&63|128]+Fe[e>>8&255]+"-"+Fe[e>>16&255]+Fe[e>>24&255]+Fe[n&255]+Fe[n>>8&255]+Fe[n>>16&255]+Fe[n>>24&255]).toLowerCase()}function Re(s,t,e){return Math.max(t,Math.min(e,s))}function Za(s,t){return(s%t+t)%t}function cf(s,t,e,n,i){return n+(s-t)*(i-n)/(e-t)}function lf(s,t,e){return s!==t?(e-s)/(t-s):0}function Ds(s,t,e){return(1-e)*s+e*t}function hf(s,t,e,n){return Ds(s,t,1-Math.exp(-e*n))}function uf(s,t=1){return t-Math.abs(Za(s,t*2)-t)}function df(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*(3-2*s))}function ff(s,t,e){return s<=t?0:s>=e?1:(s=(s-t)/(e-t),s*s*s*(s*(s*6-15)+10))}function pf(s,t){return s+Math.floor(Math.random()*(t-s+1))}function mf(s,t){return s+Math.random()*(t-s)}function gf(s){return s*(.5-Math.random())}function vf(s){s!==void 0&&($c=s);let t=$c+=1831565813;return t=Math.imul(t^t>>>15,t|1),t^=t+Math.imul(t^t>>>7,t|61),((t^t>>>14)>>>0)/4294967296}function xf(s){return s*Is}function yf(s){return s*Gs}function Oa(s){return(s&s-1)===0&&s!==0}function _f(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function uo(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Mf(s,t,e,n,i){const r=Math.cos,o=Math.sin,a=r(e/2),c=o(e/2),l=r((t+n)/2),h=o((t+n)/2),d=r((t-n)/2),u=o((t-n)/2),f=r((n-t)/2),g=o((n-t)/2);switch(i){case"XYX":s.set(a*h,c*d,c*u,a*l);break;case"YZY":s.set(c*u,a*h,c*d,a*l);break;case"ZXZ":s.set(c*d,c*u,a*h,a*l);break;case"XZX":s.set(a*h,c*g,c*f,a*l);break;case"YXY":s.set(c*f,a*h,c*g,a*l);break;case"ZYZ":s.set(c*g,c*f,a*h,a*l);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function wn(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function re(s,t){switch(t.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const Mn={DEG2RAD:Is,RAD2DEG:Gs,generateUUID:En,clamp:Re,euclideanModulo:Za,mapLinear:cf,inverseLerp:lf,lerp:Ds,damp:hf,pingpong:uf,smoothstep:df,smootherstep:ff,randInt:pf,randFloat:mf,randFloatSpread:gf,seededRandom:vf,degToRad:xf,radToDeg:yf,isPowerOfTwo:Oa,ceilPowerOfTwo:_f,floorPowerOfTwo:uo,setQuaternionFromProperEuler:Mf,normalize:re,denormalize:wn};class nt{constructor(t=0,e=0){nt.prototype.isVector2=!0,this.x=t,this.y=e}get width(){return this.x}set width(t){this.x=t}get height(){return this.y}set height(t){this.y=t}set(t,e){return this.x=t,this.y=e,this}setScalar(t){return this.x=t,this.y=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y)}copy(t){return this.x=t.x,this.y=t.y,this}add(t){return this.x+=t.x,this.y+=t.y,this}addScalar(t){return this.x+=t,this.y+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this}subScalar(t){return this.x-=t,this.y-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this}multiply(t){return this.x*=t.x,this.y*=t.y,this}multiplyScalar(t){return this.x*=t,this.y*=t,this}divide(t){return this.x/=t.x,this.y/=t.y,this}divideScalar(t){return this.multiplyScalar(1/t)}applyMatrix3(t){const e=this.x,n=this.y,i=t.elements;return this.x=i[0]*e+i[3]*n+i[6],this.y=i[1]*e+i[4]*n+i[7],this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(t){return this.x*t.x+this.y*t.y}cross(t){return this.x*t.y-this.y*t.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y;return e*e+n*n}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this}equals(t){return t.x===this.x&&t.y===this.y}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this}rotateAround(t,e){const n=Math.cos(e),i=Math.sin(e),r=this.x-t.x,o=this.y-t.y;return this.x=r*n-o*i+t.x,this.y=r*i+o*n+t.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Kt{constructor(t,e,n,i,r,o,a,c,l){Kt.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l)}set(t,e,n,i,r,o,a,c,l){const h=this.elements;return h[0]=t,h[1]=i,h[2]=a,h[3]=e,h[4]=r,h[5]=c,h[6]=n,h[7]=o,h[8]=l,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],this}extractBasis(t,e,n){return t.setFromMatrix3Column(this,0),e.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(t){const e=t.elements;return this.set(e[0],e[4],e[8],e[1],e[5],e[9],e[2],e[6],e[10]),this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[3],c=n[6],l=n[1],h=n[4],d=n[7],u=n[2],f=n[5],g=n[8],v=i[0],m=i[3],p=i[6],x=i[1],y=i[4],_=i[7],M=i[2],S=i[5],b=i[8];return r[0]=o*v+a*x+c*M,r[3]=o*m+a*y+c*S,r[6]=o*p+a*_+c*b,r[1]=l*v+h*x+d*M,r[4]=l*m+h*y+d*S,r[7]=l*p+h*_+d*b,r[2]=u*v+f*x+g*M,r[5]=u*m+f*y+g*S,r[8]=u*p+f*_+g*b,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[3]*=t,e[6]*=t,e[1]*=t,e[4]*=t,e[7]*=t,e[2]*=t,e[5]*=t,e[8]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8];return e*o*h-e*a*l-n*r*h+n*a*c+i*r*l-i*o*c}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=h*o-a*l,u=a*c-h*r,f=l*r-o*c,g=e*d+n*u+i*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/g;return t[0]=d*v,t[1]=(i*l-h*n)*v,t[2]=(a*n-i*o)*v,t[3]=u*v,t[4]=(h*e-i*c)*v,t[5]=(i*r-a*e)*v,t[6]=f*v,t[7]=(n*c-l*e)*v,t[8]=(o*e-n*r)*v,this}transpose(){let t;const e=this.elements;return t=e[1],e[1]=e[3],e[3]=t,t=e[2],e[2]=e[6],e[6]=t,t=e[5],e[5]=e[7],e[7]=t,this}getNormalMatrix(t){return this.setFromMatrix4(t).invert().transpose()}transposeIntoArray(t){const e=this.elements;return t[0]=e[0],t[1]=e[3],t[2]=e[6],t[3]=e[1],t[4]=e[4],t[5]=e[7],t[6]=e[2],t[7]=e[5],t[8]=e[8],this}setUvTransform(t,e,n,i,r,o,a){const c=Math.cos(r),l=Math.sin(r);return this.set(n*c,n*l,-n*(c*o+l*a)+o+t,-i*l,i*c,-i*(-l*o+c*a)+a+e,0,0,1),this}scale(t,e){return this.premultiply(Uo.makeScale(t,e)),this}rotate(t){return this.premultiply(Uo.makeRotation(-t)),this}translate(t,e){return this.premultiply(Uo.makeTranslation(t,e)),this}makeTranslation(t,e){return t.isVector2?this.set(1,0,t.x,0,1,t.y,0,0,1):this.set(1,0,t,0,1,e,0,0,1),this}makeRotation(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,n,e,0,0,0,1),this}makeScale(t,e){return this.set(t,0,0,0,e,0,0,0,1),this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<9;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<9;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t}clone(){return new this.constructor().fromArray(this.elements)}}const Uo=new Kt;function Kh(s){for(let t=s.length-1;t>=0;--t)if(s[t]>=65535)return!0;return!1}function fo(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Sf(){const s=fo("canvas");return s.style.display="block",s}const tl={};function Ns(s){s in tl||(tl[s]=!0,console.warn(s))}const el=new Kt().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),nl=new Kt().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),$s={[Hn]:{transfer:ao,primaries:co,toReference:s=>s,fromReference:s=>s},[$t]:{transfer:le,primaries:co,toReference:s=>s.convertSRGBToLinear(),fromReference:s=>s.convertLinearToSRGB()},[go]:{transfer:ao,primaries:lo,toReference:s=>s.applyMatrix3(nl),fromReference:s=>s.applyMatrix3(el)},[Ka]:{transfer:le,primaries:lo,toReference:s=>s.convertSRGBToLinear().applyMatrix3(nl),fromReference:s=>s.applyMatrix3(el).convertLinearToSRGB()}},wf=new Set([Hn,go]),se={enabled:!0,_workingColorSpace:Hn,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(s){if(!wf.has(s))throw new Error(`Unsupported working color space, "${s}".`);this._workingColorSpace=s},convert:function(s,t,e){if(this.enabled===!1||t===e||!t||!e)return s;const n=$s[t].toReference,i=$s[e].fromReference;return i(n(s))},fromWorkingColorSpace:function(s,t){return this.convert(s,this._workingColorSpace,t)},toWorkingColorSpace:function(s,t){return this.convert(s,t,this._workingColorSpace)},getPrimaries:function(s){return $s[s].primaries},getTransfer:function(s){return s===on?ao:$s[s].transfer}};function ts(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Fo(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let Ti;class Zh{static getDataURL(t){if(/^data:/i.test(t.src)||typeof HTMLCanvasElement>"u")return t.src;let e;if(t instanceof HTMLCanvasElement)e=t;else{Ti===void 0&&(Ti=fo("canvas")),Ti.width=t.width,Ti.height=t.height;const n=Ti.getContext("2d");t instanceof ImageData?n.putImageData(t,0,0):n.drawImage(t,0,0,t.width,t.height),e=Ti}return e.width>2048||e.height>2048?(console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons",t),e.toDataURL("image/jpeg",.6)):e.toDataURL("image/png")}static sRGBToLinear(t){if(typeof HTMLImageElement<"u"&&t instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&t instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&t instanceof ImageBitmap){const e=fo("canvas");e.width=t.width,e.height=t.height;const n=e.getContext("2d");n.drawImage(t,0,0,t.width,t.height);const i=n.getImageData(0,0,t.width,t.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=ts(r[o]/255)*255;return n.putImageData(i,0,0),e}else if(t.data){const e=t.data.slice(0);for(let n=0;n<e.length;n++)e instanceof Uint8Array||e instanceof Uint8ClampedArray?e[n]=Math.floor(ts(e[n]/255)*255):e[n]=ts(e[n]);return{data:e,width:t.width,height:t.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),t}}let Ef=0;class Jh{constructor(t=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Ef++}),this.uuid=En(),this.data=t,this.version=0}set needsUpdate(t){t===!0&&this.version++}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.images[this.uuid]!==void 0)return t.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Oo(i[o].image)):r.push(Oo(i[o]))}else r=Oo(i);n.url=r}return e||(t.images[this.uuid]=n),n}}function Oo(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Zh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let bf=0;class ze extends as{constructor(t=ze.DEFAULT_IMAGE,e=ze.DEFAULT_MAPPING,n=dn,i=dn,r=Ke,o=Bs,a=fn,c=ti,l=ze.DEFAULT_ANISOTROPY,h=on){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:bf++}),this.uuid=En(),this.name="",this.source=new Jh(t),this.mipmaps=[],this.mapping=e,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=l,this.format=a,this.internalFormat=null,this.type=c,this.offset=new nt(0,0),this.repeat=new nt(1,1),this.center=new nt(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Kt,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,typeof h=="string"?this.colorSpace=h:(Ns("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=h===yi?$t:on),this.userData={},this.version=0,this.onUpdate=null,this.isRenderTargetTexture=!1,this.needsPMREMUpdate=!1}get image(){return this.source.data}set image(t=null){this.source.data=t}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}clone(){return new this.constructor().copy(this)}copy(t){return this.name=t.name,this.source=t.source,this.mipmaps=t.mipmaps.slice(0),this.mapping=t.mapping,this.channel=t.channel,this.wrapS=t.wrapS,this.wrapT=t.wrapT,this.magFilter=t.magFilter,this.minFilter=t.minFilter,this.anisotropy=t.anisotropy,this.format=t.format,this.internalFormat=t.internalFormat,this.type=t.type,this.offset.copy(t.offset),this.repeat.copy(t.repeat),this.center.copy(t.center),this.rotation=t.rotation,this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrix.copy(t.matrix),this.generateMipmaps=t.generateMipmaps,this.premultiplyAlpha=t.premultiplyAlpha,this.flipY=t.flipY,this.unpackAlignment=t.unpackAlignment,this.colorSpace=t.colorSpace,this.userData=JSON.parse(JSON.stringify(t.userData)),this.needsUpdate=!0,this}toJSON(t){const e=t===void 0||typeof t=="string";if(!e&&t.textures[this.uuid]!==void 0)return t.textures[this.uuid];const n={metadata:{version:4.6,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(t).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),e||(t.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(t){if(this.mapping!==zh)return t;if(t.applyMatrix3(this.matrix),t.x<0||t.x>1)switch(this.wrapS){case Je:t.x=t.x-Math.floor(t.x);break;case dn:t.x=t.x<0?0:1;break;case Na:Math.abs(Math.floor(t.x)%2)===1?t.x=Math.ceil(t.x)-t.x:t.x=t.x-Math.floor(t.x);break}if(t.y<0||t.y>1)switch(this.wrapT){case Je:t.y=t.y-Math.floor(t.y);break;case dn:t.y=t.y<0?0:1;break;case Na:Math.abs(Math.floor(t.y)%2)===1?t.y=Math.ceil(t.y)-t.y:t.y=t.y-Math.floor(t.y);break}return this.flipY&&(t.y=1-t.y),t}set needsUpdate(t){t===!0&&(this.version++,this.source.needsUpdate=!0)}get encoding(){return Ns("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace===$t?yi:qh}set encoding(t){Ns("THREE.Texture: Property .encoding has been replaced by .colorSpace."),this.colorSpace=t===yi?$t:on}}ze.DEFAULT_IMAGE=null;ze.DEFAULT_MAPPING=zh;ze.DEFAULT_ANISOTROPY=1;class Pe{constructor(t=0,e=0,n=0,i=1){Pe.prototype.isVector4=!0,this.x=t,this.y=e,this.z=n,this.w=i}get width(){return this.z}set width(t){this.z=t}get height(){return this.w}set height(t){this.w=t}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this.w=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setW(t){return this.w=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;case 3:this.w=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w!==void 0?t.w:1,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this.w+=t.w,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this.w+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this.w=t.w+e.w,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this.w+=t.w*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this.w-=t.w,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this.w-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this.w=t.w-e.w,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this.w*=t.w,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this.w*=t,this}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=this.w,o=t.elements;return this.x=o[0]*e+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*e+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*e+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*e+o[7]*n+o[11]*i+o[15]*r,this}divideScalar(t){return this.multiplyScalar(1/t)}setAxisAngleFromQuaternion(t){this.w=2*Math.acos(t.w);const e=Math.sqrt(1-t.w*t.w);return e<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=t.x/e,this.y=t.y/e,this.z=t.z/e),this}setAxisAngleFromRotationMatrix(t){let e,n,i,r;const c=t.elements,l=c[0],h=c[4],d=c[8],u=c[1],f=c[5],g=c[9],v=c[2],m=c[6],p=c[10];if(Math.abs(h-u)<.01&&Math.abs(d-v)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+u)<.1&&Math.abs(d+v)<.1&&Math.abs(g+m)<.1&&Math.abs(l+f+p-3)<.1)return this.set(1,0,0,0),this;e=Math.PI;const y=(l+1)/2,_=(f+1)/2,M=(p+1)/2,S=(h+u)/4,b=(d+v)/4,L=(g+m)/4;return y>_&&y>M?y<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(y),i=S/n,r=b/n):_>M?_<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(_),n=S/i,r=L/i):M<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(M),n=b/r,i=L/r),this.set(n,i,r,e),this}let x=Math.sqrt((m-g)*(m-g)+(d-v)*(d-v)+(u-h)*(u-h));return Math.abs(x)<.001&&(x=1),this.x=(m-g)/x,this.y=(d-v)/x,this.z=(u-h)/x,this.w=Math.acos((l+f+p-1)/2),this}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this.w=Math.min(this.w,t.w),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this.w=Math.max(this.w,t.w),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this.w=Math.max(t.w,Math.min(e.w,this.w)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this.w=Math.max(t,Math.min(e,this.w)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z+this.w*t.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this.w+=(t.w-this.w)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this.w=t.w+(e.w-t.w)*n,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z&&t.w===this.w}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this.w=t[e+3],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t[e+3]=this.w,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this.w=t.getW(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class Tf extends as{constructor(t=1,e=1,n={}){super(),this.isRenderTarget=!0,this.width=t,this.height=e,this.depth=1,this.scissor=new Pe(0,0,t,e),this.scissorTest=!1,this.viewport=new Pe(0,0,t,e);const i={width:t,height:e,depth:1};n.encoding!==void 0&&(Ns("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace."),n.colorSpace=n.encoding===yi?$t:on),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Ke,depthBuffer:!0,stencilBuffer:!1,depthTexture:null,samples:0},n),this.texture=new ze(i,n.mapping,n.wrapS,n.wrapT,n.magFilter,n.minFilter,n.format,n.type,n.anisotropy,n.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.flipY=!1,this.texture.generateMipmaps=n.generateMipmaps,this.texture.internalFormat=n.internalFormat,this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.depthTexture=n.depthTexture,this.samples=n.samples}setSize(t,e,n=1){(this.width!==t||this.height!==e||this.depth!==n)&&(this.width=t,this.height=e,this.depth=n,this.texture.image.width=t,this.texture.image.height=e,this.texture.image.depth=n,this.dispose()),this.viewport.set(0,0,t,e),this.scissor.set(0,0,t,e)}clone(){return new this.constructor().copy(this)}copy(t){this.width=t.width,this.height=t.height,this.depth=t.depth,this.scissor.copy(t.scissor),this.scissorTest=t.scissorTest,this.viewport.copy(t.viewport),this.texture=t.texture.clone(),this.texture.isRenderTargetTexture=!0;const e=Object.assign({},t.texture.image);return this.texture.source=new Jh(e),this.depthBuffer=t.depthBuffer,this.stencilBuffer=t.stencilBuffer,t.depthTexture!==null&&(this.depthTexture=t.depthTexture.clone()),this.samples=t.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class Qe extends Tf{constructor(t=1,e=1,n={}){super(t,e,n),this.isWebGLRenderTarget=!0}}class Qh extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Af extends ze{constructor(t=null,e=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:t,width:e,height:n,depth:i},this.magFilter=Ce,this.minFilter=Ce,this.wrapR=dn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}let gn=class{constructor(t=0,e=0,n=0,i=1){this.isQuaternion=!0,this._x=t,this._y=e,this._z=n,this._w=i}static slerpFlat(t,e,n,i,r,o,a){let c=n[i+0],l=n[i+1],h=n[i+2],d=n[i+3];const u=r[o+0],f=r[o+1],g=r[o+2],v=r[o+3];if(a===0){t[e+0]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d;return}if(a===1){t[e+0]=u,t[e+1]=f,t[e+2]=g,t[e+3]=v;return}if(d!==v||c!==u||l!==f||h!==g){let m=1-a;const p=c*u+l*f+h*g+d*v,x=p>=0?1:-1,y=1-p*p;if(y>Number.EPSILON){const M=Math.sqrt(y),S=Math.atan2(M,p*x);m=Math.sin(m*S)/M,a=Math.sin(a*S)/M}const _=a*x;if(c=c*m+u*_,l=l*m+f*_,h=h*m+g*_,d=d*m+v*_,m===1-a){const M=1/Math.sqrt(c*c+l*l+h*h+d*d);c*=M,l*=M,h*=M,d*=M}}t[e]=c,t[e+1]=l,t[e+2]=h,t[e+3]=d}static multiplyQuaternionsFlat(t,e,n,i,r,o){const a=n[i],c=n[i+1],l=n[i+2],h=n[i+3],d=r[o],u=r[o+1],f=r[o+2],g=r[o+3];return t[e]=a*g+h*d+c*f-l*u,t[e+1]=c*g+h*u+l*d-a*f,t[e+2]=l*g+h*f+a*u-c*d,t[e+3]=h*g-a*d-c*u-l*f,t}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get w(){return this._w}set w(t){this._w=t,this._onChangeCallback()}set(t,e,n,i){return this._x=t,this._y=e,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(t){return this._x=t.x,this._y=t.y,this._z=t.z,this._w=t.w,this._onChangeCallback(),this}setFromEuler(t,e=!0){const n=t._x,i=t._y,r=t._z,o=t._order,a=Math.cos,c=Math.sin,l=a(n/2),h=a(i/2),d=a(r/2),u=c(n/2),f=c(i/2),g=c(r/2);switch(o){case"XYZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"YXZ":this._x=u*h*d+l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"ZXY":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d-u*f*g;break;case"ZYX":this._x=u*h*d-l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d+u*f*g;break;case"YZX":this._x=u*h*d+l*f*g,this._y=l*f*d+u*h*g,this._z=l*h*g-u*f*d,this._w=l*h*d-u*f*g;break;case"XZY":this._x=u*h*d-l*f*g,this._y=l*f*d-u*h*g,this._z=l*h*g+u*f*d,this._w=l*h*d+u*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return e===!0&&this._onChangeCallback(),this}setFromAxisAngle(t,e){const n=e/2,i=Math.sin(n);return this._x=t.x*i,this._y=t.y*i,this._z=t.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(t){const e=t.elements,n=e[0],i=e[4],r=e[8],o=e[1],a=e[5],c=e[9],l=e[2],h=e[6],d=e[10],u=n+a+d;if(u>0){const f=.5/Math.sqrt(u+1);this._w=.25/f,this._x=(h-c)*f,this._y=(r-l)*f,this._z=(o-i)*f}else if(n>a&&n>d){const f=2*Math.sqrt(1+n-a-d);this._w=(h-c)/f,this._x=.25*f,this._y=(i+o)/f,this._z=(r+l)/f}else if(a>d){const f=2*Math.sqrt(1+a-n-d);this._w=(r-l)/f,this._x=(i+o)/f,this._y=.25*f,this._z=(c+h)/f}else{const f=2*Math.sqrt(1+d-n-a);this._w=(o-i)/f,this._x=(r+l)/f,this._y=(c+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(t,e){let n=t.dot(e)+1;return n<Number.EPSILON?(n=0,Math.abs(t.x)>Math.abs(t.z)?(this._x=-t.y,this._y=t.x,this._z=0,this._w=n):(this._x=0,this._y=-t.z,this._z=t.y,this._w=n)):(this._x=t.y*e.z-t.z*e.y,this._y=t.z*e.x-t.x*e.z,this._z=t.x*e.y-t.y*e.x,this._w=n),this.normalize()}angleTo(t){return 2*Math.acos(Math.abs(Re(this.dot(t),-1,1)))}rotateTowards(t,e){const n=this.angleTo(t);if(n===0)return this;const i=Math.min(1,e/n);return this.slerp(t,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(t){return this._x*t._x+this._y*t._y+this._z*t._z+this._w*t._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let t=this.length();return t===0?(this._x=0,this._y=0,this._z=0,this._w=1):(t=1/t,this._x=this._x*t,this._y=this._y*t,this._z=this._z*t,this._w=this._w*t),this._onChangeCallback(),this}multiply(t){return this.multiplyQuaternions(this,t)}premultiply(t){return this.multiplyQuaternions(t,this)}multiplyQuaternions(t,e){const n=t._x,i=t._y,r=t._z,o=t._w,a=e._x,c=e._y,l=e._z,h=e._w;return this._x=n*h+o*a+i*l-r*c,this._y=i*h+o*c+r*a-n*l,this._z=r*h+o*l+n*c-i*a,this._w=o*h-n*a-i*c-r*l,this._onChangeCallback(),this}slerp(t,e){if(e===0)return this;if(e===1)return this.copy(t);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*t._w+n*t._x+i*t._y+r*t._z;if(a<0?(this._w=-t._w,this._x=-t._x,this._y=-t._y,this._z=-t._z,a=-a):this.copy(t),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const c=1-a*a;if(c<=Number.EPSILON){const f=1-e;return this._w=f*o+e*this._w,this._x=f*n+e*this._x,this._y=f*i+e*this._y,this._z=f*r+e*this._z,this.normalize(),this}const l=Math.sqrt(c),h=Math.atan2(l,a),d=Math.sin((1-e)*h)/l,u=Math.sin(e*h)/l;return this._w=o*d+this._w*u,this._x=n*d+this._x*u,this._y=i*d+this._y*u,this._z=r*d+this._z*u,this._onChangeCallback(),this}slerpQuaternions(t,e,n){return this.copy(t).slerp(e,n)}random(){const t=Math.random(),e=Math.sqrt(1-t),n=Math.sqrt(t),i=2*Math.PI*Math.random(),r=2*Math.PI*Math.random();return this.set(e*Math.cos(i),n*Math.sin(r),n*Math.cos(r),e*Math.sin(i))}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._w===this._w}fromArray(t,e=0){return this._x=t[e],this._y=t[e+1],this._z=t[e+2],this._w=t[e+3],this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._w,t}fromBufferAttribute(t,e){return this._x=t.getX(e),this._y=t.getY(e),this._z=t.getZ(e),this._w=t.getW(e),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};class N{constructor(t=0,e=0,n=0){N.prototype.isVector3=!0,this.x=t,this.y=e,this.z=n}set(t,e,n){return n===void 0&&(n=this.z),this.x=t,this.y=e,this.z=n,this}setScalar(t){return this.x=t,this.y=t,this.z=t,this}setX(t){return this.x=t,this}setY(t){return this.y=t,this}setZ(t){return this.z=t,this}setComponent(t,e){switch(t){case 0:this.x=e;break;case 1:this.y=e;break;case 2:this.z=e;break;default:throw new Error("index is out of range: "+t)}return this}getComponent(t){switch(t){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+t)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}add(t){return this.x+=t.x,this.y+=t.y,this.z+=t.z,this}addScalar(t){return this.x+=t,this.y+=t,this.z+=t,this}addVectors(t,e){return this.x=t.x+e.x,this.y=t.y+e.y,this.z=t.z+e.z,this}addScaledVector(t,e){return this.x+=t.x*e,this.y+=t.y*e,this.z+=t.z*e,this}sub(t){return this.x-=t.x,this.y-=t.y,this.z-=t.z,this}subScalar(t){return this.x-=t,this.y-=t,this.z-=t,this}subVectors(t,e){return this.x=t.x-e.x,this.y=t.y-e.y,this.z=t.z-e.z,this}multiply(t){return this.x*=t.x,this.y*=t.y,this.z*=t.z,this}multiplyScalar(t){return this.x*=t,this.y*=t,this.z*=t,this}multiplyVectors(t,e){return this.x=t.x*e.x,this.y=t.y*e.y,this.z=t.z*e.z,this}applyEuler(t){return this.applyQuaternion(il.setFromEuler(t))}applyAxisAngle(t,e){return this.applyQuaternion(il.setFromAxisAngle(t,e))}applyMatrix3(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[3]*n+r[6]*i,this.y=r[1]*e+r[4]*n+r[7]*i,this.z=r[2]*e+r[5]*n+r[8]*i,this}applyNormalMatrix(t){return this.applyMatrix3(t).normalize()}applyMatrix4(t){const e=this.x,n=this.y,i=this.z,r=t.elements,o=1/(r[3]*e+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*e+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*e+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*e+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z,c=t.w,l=2*(o*i-a*n),h=2*(a*e-r*i),d=2*(r*n-o*e);return this.x=e+c*l+o*d-a*h,this.y=n+c*h+a*l-r*d,this.z=i+c*d+r*h-o*l,this}project(t){return this.applyMatrix4(t.matrixWorldInverse).applyMatrix4(t.projectionMatrix)}unproject(t){return this.applyMatrix4(t.projectionMatrixInverse).applyMatrix4(t.matrixWorld)}transformDirection(t){const e=this.x,n=this.y,i=this.z,r=t.elements;return this.x=r[0]*e+r[4]*n+r[8]*i,this.y=r[1]*e+r[5]*n+r[9]*i,this.z=r[2]*e+r[6]*n+r[10]*i,this.normalize()}divide(t){return this.x/=t.x,this.y/=t.y,this.z/=t.z,this}divideScalar(t){return this.multiplyScalar(1/t)}min(t){return this.x=Math.min(this.x,t.x),this.y=Math.min(this.y,t.y),this.z=Math.min(this.z,t.z),this}max(t){return this.x=Math.max(this.x,t.x),this.y=Math.max(this.y,t.y),this.z=Math.max(this.z,t.z),this}clamp(t,e){return this.x=Math.max(t.x,Math.min(e.x,this.x)),this.y=Math.max(t.y,Math.min(e.y,this.y)),this.z=Math.max(t.z,Math.min(e.z,this.z)),this}clampScalar(t,e){return this.x=Math.max(t,Math.min(e,this.x)),this.y=Math.max(t,Math.min(e,this.y)),this.z=Math.max(t,Math.min(e,this.z)),this}clampLength(t,e){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Math.max(t,Math.min(e,n)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(t){return this.normalize().multiplyScalar(t)}lerp(t,e){return this.x+=(t.x-this.x)*e,this.y+=(t.y-this.y)*e,this.z+=(t.z-this.z)*e,this}lerpVectors(t,e,n){return this.x=t.x+(e.x-t.x)*n,this.y=t.y+(e.y-t.y)*n,this.z=t.z+(e.z-t.z)*n,this}cross(t){return this.crossVectors(this,t)}crossVectors(t,e){const n=t.x,i=t.y,r=t.z,o=e.x,a=e.y,c=e.z;return this.x=i*c-r*a,this.y=r*o-n*c,this.z=n*a-i*o,this}projectOnVector(t){const e=t.lengthSq();if(e===0)return this.set(0,0,0);const n=t.dot(this)/e;return this.copy(t).multiplyScalar(n)}projectOnPlane(t){return zo.copy(this).projectOnVector(t),this.sub(zo)}reflect(t){return this.sub(zo.copy(t).multiplyScalar(2*this.dot(t)))}angleTo(t){const e=Math.sqrt(this.lengthSq()*t.lengthSq());if(e===0)return Math.PI/2;const n=this.dot(t)/e;return Math.acos(Re(n,-1,1))}distanceTo(t){return Math.sqrt(this.distanceToSquared(t))}distanceToSquared(t){const e=this.x-t.x,n=this.y-t.y,i=this.z-t.z;return e*e+n*n+i*i}manhattanDistanceTo(t){return Math.abs(this.x-t.x)+Math.abs(this.y-t.y)+Math.abs(this.z-t.z)}setFromSpherical(t){return this.setFromSphericalCoords(t.radius,t.phi,t.theta)}setFromSphericalCoords(t,e,n){const i=Math.sin(e)*t;return this.x=i*Math.sin(n),this.y=Math.cos(e)*t,this.z=i*Math.cos(n),this}setFromCylindrical(t){return this.setFromCylindricalCoords(t.radius,t.theta,t.y)}setFromCylindricalCoords(t,e,n){return this.x=t*Math.sin(e),this.y=n,this.z=t*Math.cos(e),this}setFromMatrixPosition(t){const e=t.elements;return this.x=e[12],this.y=e[13],this.z=e[14],this}setFromMatrixScale(t){const e=this.setFromMatrixColumn(t,0).length(),n=this.setFromMatrixColumn(t,1).length(),i=this.setFromMatrixColumn(t,2).length();return this.x=e,this.y=n,this.z=i,this}setFromMatrixColumn(t,e){return this.fromArray(t.elements,e*4)}setFromMatrix3Column(t,e){return this.fromArray(t.elements,e*3)}setFromEuler(t){return this.x=t._x,this.y=t._y,this.z=t._z,this}setFromColor(t){return this.x=t.r,this.y=t.g,this.z=t.b,this}equals(t){return t.x===this.x&&t.y===this.y&&t.z===this.z}fromArray(t,e=0){return this.x=t[e],this.y=t[e+1],this.z=t[e+2],this}toArray(t=[],e=0){return t[e]=this.x,t[e+1]=this.y,t[e+2]=this.z,t}fromBufferAttribute(t,e){return this.x=t.getX(e),this.y=t.getY(e),this.z=t.getZ(e),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const t=(Math.random()-.5)*2,e=Math.random()*Math.PI*2,n=Math.sqrt(1-t**2);return this.x=n*Math.cos(e),this.y=n*Math.sin(e),this.z=t,this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const zo=new N,il=new gn;class Si{constructor(t=new N(1/0,1/0,1/0),e=new N(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=t,this.max=e}set(t,e){return this.min.copy(t),this.max.copy(e),this}setFromArray(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e+=3)this.expandByPoint(cn.fromArray(t,e));return this}setFromBufferAttribute(t){this.makeEmpty();for(let e=0,n=t.count;e<n;e++)this.expandByPoint(cn.fromBufferAttribute(t,e));return this}setFromPoints(t){this.makeEmpty();for(let e=0,n=t.length;e<n;e++)this.expandByPoint(t[e]);return this}setFromCenterAndSize(t,e){const n=cn.copy(e).multiplyScalar(.5);return this.min.copy(t).sub(n),this.max.copy(t).add(n),this}setFromObject(t,e=!1){return this.makeEmpty(),this.expandByObject(t,e)}clone(){return new this.constructor().copy(this)}copy(t){return this.min.copy(t.min),this.max.copy(t.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(t){return this.isEmpty()?t.set(0,0,0):t.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(t){return this.isEmpty()?t.set(0,0,0):t.subVectors(this.max,this.min)}expandByPoint(t){return this.min.min(t),this.max.max(t),this}expandByVector(t){return this.min.sub(t),this.max.add(t),this}expandByScalar(t){return this.min.addScalar(-t),this.max.addScalar(t),this}expandByObject(t,e=!1){t.updateWorldMatrix(!1,!1);const n=t.geometry;if(n!==void 0){const r=n.getAttribute("position");if(e===!0&&r!==void 0&&t.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)t.isMesh===!0?t.getVertexPosition(o,cn):cn.fromBufferAttribute(r,o),cn.applyMatrix4(t.matrixWorld),this.expandByPoint(cn);else t.boundingBox!==void 0?(t.boundingBox===null&&t.computeBoundingBox(),tr.copy(t.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),tr.copy(n.boundingBox)),tr.applyMatrix4(t.matrixWorld),this.union(tr)}const i=t.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],e);return this}containsPoint(t){return!(t.x<this.min.x||t.x>this.max.x||t.y<this.min.y||t.y>this.max.y||t.z<this.min.z||t.z>this.max.z)}containsBox(t){return this.min.x<=t.min.x&&t.max.x<=this.max.x&&this.min.y<=t.min.y&&t.max.y<=this.max.y&&this.min.z<=t.min.z&&t.max.z<=this.max.z}getParameter(t,e){return e.set((t.x-this.min.x)/(this.max.x-this.min.x),(t.y-this.min.y)/(this.max.y-this.min.y),(t.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(t){return!(t.max.x<this.min.x||t.min.x>this.max.x||t.max.y<this.min.y||t.min.y>this.max.y||t.max.z<this.min.z||t.min.z>this.max.z)}intersectsSphere(t){return this.clampPoint(t.center,cn),cn.distanceToSquared(t.center)<=t.radius*t.radius}intersectsPlane(t){let e,n;return t.normal.x>0?(e=t.normal.x*this.min.x,n=t.normal.x*this.max.x):(e=t.normal.x*this.max.x,n=t.normal.x*this.min.x),t.normal.y>0?(e+=t.normal.y*this.min.y,n+=t.normal.y*this.max.y):(e+=t.normal.y*this.max.y,n+=t.normal.y*this.min.y),t.normal.z>0?(e+=t.normal.z*this.min.z,n+=t.normal.z*this.max.z):(e+=t.normal.z*this.max.z,n+=t.normal.z*this.min.z),e<=-t.constant&&n>=-t.constant}intersectsTriangle(t){if(this.isEmpty())return!1;this.getCenter(fs),er.subVectors(this.max,fs),Ai.subVectors(t.a,fs),Ci.subVectors(t.b,fs),Ri.subVectors(t.c,fs),kn.subVectors(Ci,Ai),Vn.subVectors(Ri,Ci),ri.subVectors(Ai,Ri);let e=[0,-kn.z,kn.y,0,-Vn.z,Vn.y,0,-ri.z,ri.y,kn.z,0,-kn.x,Vn.z,0,-Vn.x,ri.z,0,-ri.x,-kn.y,kn.x,0,-Vn.y,Vn.x,0,-ri.y,ri.x,0];return!Bo(e,Ai,Ci,Ri,er)||(e=[1,0,0,0,1,0,0,0,1],!Bo(e,Ai,Ci,Ri,er))?!1:(nr.crossVectors(kn,Vn),e=[nr.x,nr.y,nr.z],Bo(e,Ai,Ci,Ri,er))}clampPoint(t,e){return e.copy(t).clamp(this.min,this.max)}distanceToPoint(t){return this.clampPoint(t,cn).distanceTo(t)}getBoundingSphere(t){return this.isEmpty()?t.makeEmpty():(this.getCenter(t.center),t.radius=this.getSize(cn).length()*.5),t}intersect(t){return this.min.max(t.min),this.max.min(t.max),this.isEmpty()&&this.makeEmpty(),this}union(t){return this.min.min(t.min),this.max.max(t.max),this}applyMatrix4(t){return this.isEmpty()?this:(An[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(t),An[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(t),An[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(t),An[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(t),An[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(t),An[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(t),An[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(t),An[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(t),this.setFromPoints(An),this)}translate(t){return this.min.add(t),this.max.add(t),this}equals(t){return t.min.equals(this.min)&&t.max.equals(this.max)}}const An=[new N,new N,new N,new N,new N,new N,new N,new N],cn=new N,tr=new Si,Ai=new N,Ci=new N,Ri=new N,kn=new N,Vn=new N,ri=new N,fs=new N,er=new N,nr=new N,oi=new N;function Bo(s,t,e,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){oi.fromArray(s,r);const a=i.x*Math.abs(oi.x)+i.y*Math.abs(oi.y)+i.z*Math.abs(oi.z),c=t.dot(oi),l=e.dot(oi),h=n.dot(oi);if(Math.max(-Math.max(c,l,h),Math.min(c,l,h))>a)return!1}return!0}const Cf=new Si,ps=new N,Go=new N;class Ys{constructor(t=new N,e=-1){this.isSphere=!0,this.center=t,this.radius=e}set(t,e){return this.center.copy(t),this.radius=e,this}setFromPoints(t,e){const n=this.center;e!==void 0?n.copy(e):Cf.setFromPoints(t).getCenter(n);let i=0;for(let r=0,o=t.length;r<o;r++)i=Math.max(i,n.distanceToSquared(t[r]));return this.radius=Math.sqrt(i),this}copy(t){return this.center.copy(t.center),this.radius=t.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(t){return t.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(t){return t.distanceTo(this.center)-this.radius}intersectsSphere(t){const e=this.radius+t.radius;return t.center.distanceToSquared(this.center)<=e*e}intersectsBox(t){return t.intersectsSphere(this)}intersectsPlane(t){return Math.abs(t.distanceToPoint(this.center))<=this.radius}clampPoint(t,e){const n=this.center.distanceToSquared(t);return e.copy(t),n>this.radius*this.radius&&(e.sub(this.center).normalize(),e.multiplyScalar(this.radius).add(this.center)),e}getBoundingBox(t){return this.isEmpty()?(t.makeEmpty(),t):(t.set(this.center,this.center),t.expandByScalar(this.radius),t)}applyMatrix4(t){return this.center.applyMatrix4(t),this.radius=this.radius*t.getMaxScaleOnAxis(),this}translate(t){return this.center.add(t),this}expandByPoint(t){if(this.isEmpty())return this.center.copy(t),this.radius=0,this;ps.subVectors(t,this.center);const e=ps.lengthSq();if(e>this.radius*this.radius){const n=Math.sqrt(e),i=(n-this.radius)*.5;this.center.addScaledVector(ps,i/n),this.radius+=i}return this}union(t){return t.isEmpty()?this:this.isEmpty()?(this.copy(t),this):(this.center.equals(t.center)===!0?this.radius=Math.max(this.radius,t.radius):(Go.subVectors(t.center,this.center).setLength(t.radius),this.expandByPoint(ps.copy(t.center).add(Go)),this.expandByPoint(ps.copy(t.center).sub(Go))),this)}equals(t){return t.center.equals(this.center)&&t.radius===this.radius}clone(){return new this.constructor().copy(this)}}const Cn=new N,Ho=new N,ir=new N,Xn=new N,Wo=new N,sr=new N,ko=new N;let Rf=class{constructor(t=new N,e=new N(0,0,-1)){this.origin=t,this.direction=e}set(t,e){return this.origin.copy(t),this.direction.copy(e),this}copy(t){return this.origin.copy(t.origin),this.direction.copy(t.direction),this}at(t,e){return e.copy(this.origin).addScaledVector(this.direction,t)}lookAt(t){return this.direction.copy(t).sub(this.origin).normalize(),this}recast(t){return this.origin.copy(this.at(t,Cn)),this}closestPointToPoint(t,e){e.subVectors(t,this.origin);const n=e.dot(this.direction);return n<0?e.copy(this.origin):e.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(t){return Math.sqrt(this.distanceSqToPoint(t))}distanceSqToPoint(t){const e=Cn.subVectors(t,this.origin).dot(this.direction);return e<0?this.origin.distanceToSquared(t):(Cn.copy(this.origin).addScaledVector(this.direction,e),Cn.distanceToSquared(t))}distanceSqToSegment(t,e,n,i){Ho.copy(t).add(e).multiplyScalar(.5),ir.copy(e).sub(t).normalize(),Xn.copy(this.origin).sub(Ho);const r=t.distanceTo(e)*.5,o=-this.direction.dot(ir),a=Xn.dot(this.direction),c=-Xn.dot(ir),l=Xn.lengthSq(),h=Math.abs(1-o*o);let d,u,f,g;if(h>0)if(d=o*c-a,u=o*a-c,g=r*h,d>=0)if(u>=-g)if(u<=g){const v=1/h;d*=v,u*=v,f=d*(d+o*u+2*a)+u*(o*d+u+2*c)+l}else u=r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u=-r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;else u<=-g?(d=Math.max(0,-(-o*r+a)),u=d>0?-r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l):u<=g?(d=0,u=Math.min(Math.max(-r,-c),r),f=u*(u+2*c)+l):(d=Math.max(0,-(o*r+a)),u=d>0?r:Math.min(Math.max(-r,-c),r),f=-d*d+u*(u+2*c)+l);else u=o>0?-r:r,d=Math.max(0,-(o*u+a)),f=-d*d+u*(u+2*c)+l;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Ho).addScaledVector(ir,u),f}intersectSphere(t,e){Cn.subVectors(t.center,this.origin);const n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,r=t.radius*t.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,c=n+o;return c<0?null:a<0?this.at(c,e):this.at(a,e)}intersectsSphere(t){return this.distanceSqToPoint(t.center)<=t.radius*t.radius}distanceToPlane(t){const e=t.normal.dot(this.direction);if(e===0)return t.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(t.normal)+t.constant)/e;return n>=0?n:null}intersectPlane(t,e){const n=this.distanceToPlane(t);return n===null?null:this.at(n,e)}intersectsPlane(t){const e=t.distanceToPoint(this.origin);return e===0||t.normal.dot(this.direction)*e<0}intersectBox(t,e){let n,i,r,o,a,c;const l=1/this.direction.x,h=1/this.direction.y,d=1/this.direction.z,u=this.origin;return l>=0?(n=(t.min.x-u.x)*l,i=(t.max.x-u.x)*l):(n=(t.max.x-u.x)*l,i=(t.min.x-u.x)*l),h>=0?(r=(t.min.y-u.y)*h,o=(t.max.y-u.y)*h):(r=(t.max.y-u.y)*h,o=(t.min.y-u.y)*h),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(t.min.z-u.z)*d,c=(t.max.z-u.z)*d):(a=(t.max.z-u.z)*d,c=(t.min.z-u.z)*d),n>c||a>i)||((a>n||n!==n)&&(n=a),(c<i||i!==i)&&(i=c),i<0)?null:this.at(n>=0?n:i,e)}intersectsBox(t){return this.intersectBox(t,Cn)!==null}intersectTriangle(t,e,n,i,r){Wo.subVectors(e,t),sr.subVectors(n,t),ko.crossVectors(Wo,sr);let o=this.direction.dot(ko),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Xn.subVectors(this.origin,t);const c=a*this.direction.dot(sr.crossVectors(Xn,sr));if(c<0)return null;const l=a*this.direction.dot(Wo.cross(Xn));if(l<0||c+l>o)return null;const h=-a*Xn.dot(ko);return h<0?null:this.at(h/o,r)}applyMatrix4(t){return this.origin.applyMatrix4(t),this.direction.transformDirection(t),this}equals(t){return t.origin.equals(this.origin)&&t.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};class ne{constructor(t,e,n,i,r,o,a,c,l,h,d,u,f,g,v,m){ne.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],t!==void 0&&this.set(t,e,n,i,r,o,a,c,l,h,d,u,f,g,v,m)}set(t,e,n,i,r,o,a,c,l,h,d,u,f,g,v,m){const p=this.elements;return p[0]=t,p[4]=e,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=c,p[2]=l,p[6]=h,p[10]=d,p[14]=u,p[3]=f,p[7]=g,p[11]=v,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new ne().fromArray(this.elements)}copy(t){const e=this.elements,n=t.elements;return e[0]=n[0],e[1]=n[1],e[2]=n[2],e[3]=n[3],e[4]=n[4],e[5]=n[5],e[6]=n[6],e[7]=n[7],e[8]=n[8],e[9]=n[9],e[10]=n[10],e[11]=n[11],e[12]=n[12],e[13]=n[13],e[14]=n[14],e[15]=n[15],this}copyPosition(t){const e=this.elements,n=t.elements;return e[12]=n[12],e[13]=n[13],e[14]=n[14],this}setFromMatrix3(t){const e=t.elements;return this.set(e[0],e[3],e[6],0,e[1],e[4],e[7],0,e[2],e[5],e[8],0,0,0,0,1),this}extractBasis(t,e,n){return t.setFromMatrixColumn(this,0),e.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(t,e,n){return this.set(t.x,e.x,n.x,0,t.y,e.y,n.y,0,t.z,e.z,n.z,0,0,0,0,1),this}extractRotation(t){const e=this.elements,n=t.elements,i=1/Pi.setFromMatrixColumn(t,0).length(),r=1/Pi.setFromMatrixColumn(t,1).length(),o=1/Pi.setFromMatrixColumn(t,2).length();return e[0]=n[0]*i,e[1]=n[1]*i,e[2]=n[2]*i,e[3]=0,e[4]=n[4]*r,e[5]=n[5]*r,e[6]=n[6]*r,e[7]=0,e[8]=n[8]*o,e[9]=n[9]*o,e[10]=n[10]*o,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromEuler(t){const e=this.elements,n=t.x,i=t.y,r=t.z,o=Math.cos(n),a=Math.sin(n),c=Math.cos(i),l=Math.sin(i),h=Math.cos(r),d=Math.sin(r);if(t.order==="XYZ"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=c*h,e[4]=-c*d,e[8]=l,e[1]=f+g*l,e[5]=u-v*l,e[9]=-a*c,e[2]=v-u*l,e[6]=g+f*l,e[10]=o*c}else if(t.order==="YXZ"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u+v*a,e[4]=g*a-f,e[8]=o*l,e[1]=o*d,e[5]=o*h,e[9]=-a,e[2]=f*a-g,e[6]=v+u*a,e[10]=o*c}else if(t.order==="ZXY"){const u=c*h,f=c*d,g=l*h,v=l*d;e[0]=u-v*a,e[4]=-o*d,e[8]=g+f*a,e[1]=f+g*a,e[5]=o*h,e[9]=v-u*a,e[2]=-o*l,e[6]=a,e[10]=o*c}else if(t.order==="ZYX"){const u=o*h,f=o*d,g=a*h,v=a*d;e[0]=c*h,e[4]=g*l-f,e[8]=u*l+v,e[1]=c*d,e[5]=v*l+u,e[9]=f*l-g,e[2]=-l,e[6]=a*c,e[10]=o*c}else if(t.order==="YZX"){const u=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=v-u*d,e[8]=g*d+f,e[1]=d,e[5]=o*h,e[9]=-a*h,e[2]=-l*h,e[6]=f*d+g,e[10]=u-v*d}else if(t.order==="XZY"){const u=o*c,f=o*l,g=a*c,v=a*l;e[0]=c*h,e[4]=-d,e[8]=l*h,e[1]=u*d+v,e[5]=o*h,e[9]=f*d-g,e[2]=g*d-f,e[6]=a*h,e[10]=v*d+u}return e[3]=0,e[7]=0,e[11]=0,e[12]=0,e[13]=0,e[14]=0,e[15]=1,this}makeRotationFromQuaternion(t){return this.compose(Pf,t,Lf)}lookAt(t,e,n){const i=this.elements;return Ye.subVectors(t,e),Ye.lengthSq()===0&&(Ye.z=1),Ye.normalize(),qn.crossVectors(n,Ye),qn.lengthSq()===0&&(Math.abs(n.z)===1?Ye.x+=1e-4:Ye.z+=1e-4,Ye.normalize(),qn.crossVectors(n,Ye)),qn.normalize(),rr.crossVectors(Ye,qn),i[0]=qn.x,i[4]=rr.x,i[8]=Ye.x,i[1]=qn.y,i[5]=rr.y,i[9]=Ye.y,i[2]=qn.z,i[6]=rr.z,i[10]=Ye.z,this}multiply(t){return this.multiplyMatrices(this,t)}premultiply(t){return this.multiplyMatrices(t,this)}multiplyMatrices(t,e){const n=t.elements,i=e.elements,r=this.elements,o=n[0],a=n[4],c=n[8],l=n[12],h=n[1],d=n[5],u=n[9],f=n[13],g=n[2],v=n[6],m=n[10],p=n[14],x=n[3],y=n[7],_=n[11],M=n[15],S=i[0],b=i[4],L=i[8],w=i[12],T=i[1],O=i[5],D=i[9],z=i[13],C=i[2],I=i[6],U=i[10],Y=i[14],G=i[3],k=i[7],Q=i[11],V=i[15];return r[0]=o*S+a*T+c*C+l*G,r[4]=o*b+a*O+c*I+l*k,r[8]=o*L+a*D+c*U+l*Q,r[12]=o*w+a*z+c*Y+l*V,r[1]=h*S+d*T+u*C+f*G,r[5]=h*b+d*O+u*I+f*k,r[9]=h*L+d*D+u*U+f*Q,r[13]=h*w+d*z+u*Y+f*V,r[2]=g*S+v*T+m*C+p*G,r[6]=g*b+v*O+m*I+p*k,r[10]=g*L+v*D+m*U+p*Q,r[14]=g*w+v*z+m*Y+p*V,r[3]=x*S+y*T+_*C+M*G,r[7]=x*b+y*O+_*I+M*k,r[11]=x*L+y*D+_*U+M*Q,r[15]=x*w+y*z+_*Y+M*V,this}multiplyScalar(t){const e=this.elements;return e[0]*=t,e[4]*=t,e[8]*=t,e[12]*=t,e[1]*=t,e[5]*=t,e[9]*=t,e[13]*=t,e[2]*=t,e[6]*=t,e[10]*=t,e[14]*=t,e[3]*=t,e[7]*=t,e[11]*=t,e[15]*=t,this}determinant(){const t=this.elements,e=t[0],n=t[4],i=t[8],r=t[12],o=t[1],a=t[5],c=t[9],l=t[13],h=t[2],d=t[6],u=t[10],f=t[14],g=t[3],v=t[7],m=t[11],p=t[15];return g*(+r*c*d-i*l*d-r*a*u+n*l*u+i*a*f-n*c*f)+v*(+e*c*f-e*l*u+r*o*u-i*o*f+i*l*h-r*c*h)+m*(+e*l*d-e*a*f-r*o*d+n*o*f+r*a*h-n*l*h)+p*(-i*a*h-e*c*d+e*a*u+i*o*d-n*o*u+n*c*h)}transpose(){const t=this.elements;let e;return e=t[1],t[1]=t[4],t[4]=e,e=t[2],t[2]=t[8],t[8]=e,e=t[6],t[6]=t[9],t[9]=e,e=t[3],t[3]=t[12],t[12]=e,e=t[7],t[7]=t[13],t[13]=e,e=t[11],t[11]=t[14],t[14]=e,this}setPosition(t,e,n){const i=this.elements;return t.isVector3?(i[12]=t.x,i[13]=t.y,i[14]=t.z):(i[12]=t,i[13]=e,i[14]=n),this}invert(){const t=this.elements,e=t[0],n=t[1],i=t[2],r=t[3],o=t[4],a=t[5],c=t[6],l=t[7],h=t[8],d=t[9],u=t[10],f=t[11],g=t[12],v=t[13],m=t[14],p=t[15],x=d*m*l-v*u*l+v*c*f-a*m*f-d*c*p+a*u*p,y=g*u*l-h*m*l-g*c*f+o*m*f+h*c*p-o*u*p,_=h*v*l-g*d*l+g*a*f-o*v*f-h*a*p+o*d*p,M=g*d*c-h*v*c-g*a*u+o*v*u+h*a*m-o*d*m,S=e*x+n*y+i*_+r*M;if(S===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const b=1/S;return t[0]=x*b,t[1]=(v*u*r-d*m*r-v*i*f+n*m*f+d*i*p-n*u*p)*b,t[2]=(a*m*r-v*c*r+v*i*l-n*m*l-a*i*p+n*c*p)*b,t[3]=(d*c*r-a*u*r-d*i*l+n*u*l+a*i*f-n*c*f)*b,t[4]=y*b,t[5]=(h*m*r-g*u*r+g*i*f-e*m*f-h*i*p+e*u*p)*b,t[6]=(g*c*r-o*m*r-g*i*l+e*m*l+o*i*p-e*c*p)*b,t[7]=(o*u*r-h*c*r+h*i*l-e*u*l-o*i*f+e*c*f)*b,t[8]=_*b,t[9]=(g*d*r-h*v*r-g*n*f+e*v*f+h*n*p-e*d*p)*b,t[10]=(o*v*r-g*a*r+g*n*l-e*v*l-o*n*p+e*a*p)*b,t[11]=(h*a*r-o*d*r-h*n*l+e*d*l+o*n*f-e*a*f)*b,t[12]=M*b,t[13]=(h*v*i-g*d*i+g*n*u-e*v*u-h*n*m+e*d*m)*b,t[14]=(g*a*i-o*v*i-g*n*c+e*v*c+o*n*m-e*a*m)*b,t[15]=(o*d*i-h*a*i+h*n*c-e*d*c-o*n*u+e*a*u)*b,this}scale(t){const e=this.elements,n=t.x,i=t.y,r=t.z;return e[0]*=n,e[4]*=i,e[8]*=r,e[1]*=n,e[5]*=i,e[9]*=r,e[2]*=n,e[6]*=i,e[10]*=r,e[3]*=n,e[7]*=i,e[11]*=r,this}getMaxScaleOnAxis(){const t=this.elements,e=t[0]*t[0]+t[1]*t[1]+t[2]*t[2],n=t[4]*t[4]+t[5]*t[5]+t[6]*t[6],i=t[8]*t[8]+t[9]*t[9]+t[10]*t[10];return Math.sqrt(Math.max(e,n,i))}makeTranslation(t,e,n){return t.isVector3?this.set(1,0,0,t.x,0,1,0,t.y,0,0,1,t.z,0,0,0,1):this.set(1,0,0,t,0,1,0,e,0,0,1,n,0,0,0,1),this}makeRotationX(t){const e=Math.cos(t),n=Math.sin(t);return this.set(1,0,0,0,0,e,-n,0,0,n,e,0,0,0,0,1),this}makeRotationY(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,0,n,0,0,1,0,0,-n,0,e,0,0,0,0,1),this}makeRotationZ(t){const e=Math.cos(t),n=Math.sin(t);return this.set(e,-n,0,0,n,e,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(t,e){const n=Math.cos(e),i=Math.sin(e),r=1-n,o=t.x,a=t.y,c=t.z,l=r*o,h=r*a;return this.set(l*o+n,l*a-i*c,l*c+i*a,0,l*a+i*c,h*a+n,h*c-i*o,0,l*c-i*a,h*c+i*o,r*c*c+n,0,0,0,0,1),this}makeScale(t,e,n){return this.set(t,0,0,0,0,e,0,0,0,0,n,0,0,0,0,1),this}makeShear(t,e,n,i,r,o){return this.set(1,n,r,0,t,1,o,0,e,i,1,0,0,0,0,1),this}compose(t,e,n){const i=this.elements,r=e._x,o=e._y,a=e._z,c=e._w,l=r+r,h=o+o,d=a+a,u=r*l,f=r*h,g=r*d,v=o*h,m=o*d,p=a*d,x=c*l,y=c*h,_=c*d,M=n.x,S=n.y,b=n.z;return i[0]=(1-(v+p))*M,i[1]=(f+_)*M,i[2]=(g-y)*M,i[3]=0,i[4]=(f-_)*S,i[5]=(1-(u+p))*S,i[6]=(m+x)*S,i[7]=0,i[8]=(g+y)*b,i[9]=(m-x)*b,i[10]=(1-(u+v))*b,i[11]=0,i[12]=t.x,i[13]=t.y,i[14]=t.z,i[15]=1,this}decompose(t,e,n){const i=this.elements;let r=Pi.set(i[0],i[1],i[2]).length();const o=Pi.set(i[4],i[5],i[6]).length(),a=Pi.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),t.x=i[12],t.y=i[13],t.z=i[14],ln.copy(this);const l=1/r,h=1/o,d=1/a;return ln.elements[0]*=l,ln.elements[1]*=l,ln.elements[2]*=l,ln.elements[4]*=h,ln.elements[5]*=h,ln.elements[6]*=h,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,e.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(t,e,n,i,r,o,a=zn){const c=this.elements,l=2*r/(e-t),h=2*r/(n-i),d=(e+t)/(e-t),u=(n+i)/(n-i);let f,g;if(a===zn)f=-(o+r)/(o-r),g=-2*o*r/(o-r);else if(a===ho)f=-o/(o-r),g=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=l,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=h,c[9]=u,c[13]=0,c[2]=0,c[6]=0,c[10]=f,c[14]=g,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(t,e,n,i,r,o,a=zn){const c=this.elements,l=1/(e-t),h=1/(n-i),d=1/(o-r),u=(e+t)*l,f=(n+i)*h;let g,v;if(a===zn)g=(o+r)*d,v=-2*d;else if(a===ho)g=r*d,v=-1*d;else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=2*l,c[4]=0,c[8]=0,c[12]=-u,c[1]=0,c[5]=2*h,c[9]=0,c[13]=-f,c[2]=0,c[6]=0,c[10]=v,c[14]=-g,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(t){const e=this.elements,n=t.elements;for(let i=0;i<16;i++)if(e[i]!==n[i])return!1;return!0}fromArray(t,e=0){for(let n=0;n<16;n++)this.elements[n]=t[n+e];return this}toArray(t=[],e=0){const n=this.elements;return t[e]=n[0],t[e+1]=n[1],t[e+2]=n[2],t[e+3]=n[3],t[e+4]=n[4],t[e+5]=n[5],t[e+6]=n[6],t[e+7]=n[7],t[e+8]=n[8],t[e+9]=n[9],t[e+10]=n[10],t[e+11]=n[11],t[e+12]=n[12],t[e+13]=n[13],t[e+14]=n[14],t[e+15]=n[15],t}}const Pi=new N,ln=new ne,Pf=new N(0,0,0),Lf=new N(1,1,1),qn=new N,rr=new N,Ye=new N,sl=new ne,rl=new gn;class wi{constructor(t=0,e=0,n=0,i=wi.DEFAULT_ORDER){this.isEuler=!0,this._x=t,this._y=e,this._z=n,this._order=i}get x(){return this._x}set x(t){this._x=t,this._onChangeCallback()}get y(){return this._y}set y(t){this._y=t,this._onChangeCallback()}get z(){return this._z}set z(t){this._z=t,this._onChangeCallback()}get order(){return this._order}set order(t){this._order=t,this._onChangeCallback()}set(t,e,n,i=this._order){return this._x=t,this._y=e,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(t){return this._x=t._x,this._y=t._y,this._z=t._z,this._order=t._order,this._onChangeCallback(),this}setFromRotationMatrix(t,e=this._order,n=!0){const i=t.elements,r=i[0],o=i[4],a=i[8],c=i[1],l=i[5],h=i[9],d=i[2],u=i[6],f=i[10];switch(e){case"XYZ":this._y=Math.asin(Re(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(u,l),this._z=0);break;case"YXZ":this._x=Math.asin(-Re(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(c,l)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Re(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(-d,f),this._z=Math.atan2(-o,l)):(this._y=0,this._z=Math.atan2(c,r));break;case"ZYX":this._y=Math.asin(-Re(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(u,f),this._z=Math.atan2(c,r)):(this._x=0,this._z=Math.atan2(-o,l));break;case"YZX":this._z=Math.asin(Re(c,-1,1)),Math.abs(c)<.9999999?(this._x=Math.atan2(-h,l),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-Re(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(u,l),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+e)}return this._order=e,n===!0&&this._onChangeCallback(),this}setFromQuaternion(t,e,n){return sl.makeRotationFromQuaternion(t),this.setFromRotationMatrix(sl,e,n)}setFromVector3(t,e=this._order){return this.set(t.x,t.y,t.z,e)}reorder(t){return rl.setFromEuler(this),this.setFromQuaternion(rl,t)}equals(t){return t._x===this._x&&t._y===this._y&&t._z===this._z&&t._order===this._order}fromArray(t){return this._x=t[0],this._y=t[1],this._z=t[2],t[3]!==void 0&&(this._order=t[3]),this._onChangeCallback(),this}toArray(t=[],e=0){return t[e]=this._x,t[e+1]=this._y,t[e+2]=this._z,t[e+3]=this._order,t}_onChange(t){return this._onChangeCallback=t,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}wi.DEFAULT_ORDER="XYZ";class $h{constructor(){this.mask=1}set(t){this.mask=(1<<t|0)>>>0}enable(t){this.mask|=1<<t|0}enableAll(){this.mask=-1}toggle(t){this.mask^=1<<t|0}disable(t){this.mask&=~(1<<t|0)}disableAll(){this.mask=0}test(t){return(this.mask&t.mask)!==0}isEnabled(t){return(this.mask&(1<<t|0))!==0}}let If=0;const ol=new N,Li=new gn,Rn=new ne,or=new N,ms=new N,Df=new N,Nf=new gn,al=new N(1,0,0),cl=new N(0,1,0),ll=new N(0,0,1),Uf={type:"added"},Ff={type:"removed"};class Ie extends as{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:If++}),this.uuid=En(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=Ie.DEFAULT_UP.clone();const t=new N,e=new wi,n=new gn,i=new N(1,1,1);function r(){n.setFromEuler(e,!1)}function o(){e.setFromQuaternion(n,void 0,!1)}e._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:t},rotation:{configurable:!0,enumerable:!0,value:e},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new ne},normalMatrix:{value:new Kt}}),this.matrix=new ne,this.matrixWorld=new ne,this.matrixAutoUpdate=Ie.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new $h,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(t){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(t),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(t){return this.quaternion.premultiply(t),this}setRotationFromAxisAngle(t,e){this.quaternion.setFromAxisAngle(t,e)}setRotationFromEuler(t){this.quaternion.setFromEuler(t,!0)}setRotationFromMatrix(t){this.quaternion.setFromRotationMatrix(t)}setRotationFromQuaternion(t){this.quaternion.copy(t)}rotateOnAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.multiply(Li),this}rotateOnWorldAxis(t,e){return Li.setFromAxisAngle(t,e),this.quaternion.premultiply(Li),this}rotateX(t){return this.rotateOnAxis(al,t)}rotateY(t){return this.rotateOnAxis(cl,t)}rotateZ(t){return this.rotateOnAxis(ll,t)}translateOnAxis(t,e){return ol.copy(t).applyQuaternion(this.quaternion),this.position.add(ol.multiplyScalar(e)),this}translateX(t){return this.translateOnAxis(al,t)}translateY(t){return this.translateOnAxis(cl,t)}translateZ(t){return this.translateOnAxis(ll,t)}localToWorld(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(this.matrixWorld)}worldToLocal(t){return this.updateWorldMatrix(!0,!1),t.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(t,e,n){t.isVector3?or.copy(t):or.set(t,e,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ms.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ms,or,this.up):Rn.lookAt(or,ms,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Li.setFromRotationMatrix(Rn),this.quaternion.premultiply(Li.invert()))}add(t){if(arguments.length>1){for(let e=0;e<arguments.length;e++)this.add(arguments[e]);return this}return t===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",t),this):(t&&t.isObject3D?(t.parent!==null&&t.parent.remove(t),t.parent=this,this.children.push(t),t.dispatchEvent(Uf)):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",t),this)}remove(t){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const e=this.children.indexOf(t);return e!==-1&&(t.parent=null,this.children.splice(e,1),t.dispatchEvent(Ff)),this}removeFromParent(){const t=this.parent;return t!==null&&t.remove(this),this}clear(){return this.remove(...this.children)}attach(t){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),t.parent!==null&&(t.parent.updateWorldMatrix(!0,!1),Rn.multiply(t.parent.matrixWorld)),t.applyMatrix4(Rn),this.add(t),t.updateWorldMatrix(!1,!0),this}getObjectById(t){return this.getObjectByProperty("id",t)}getObjectByName(t){return this.getObjectByProperty("name",t)}getObjectByProperty(t,e){if(this[t]===e)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(t,e);if(o!==void 0)return o}}getObjectsByProperty(t,e,n=[]){this[t]===e&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(t,e,n);return n}getWorldPosition(t){return this.updateWorldMatrix(!0,!1),t.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,t,Df),t}getWorldScale(t){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ms,Nf,t),t}getWorldDirection(t){this.updateWorldMatrix(!0,!1);const e=this.matrixWorld.elements;return t.set(e[8],e[9],e[10]).normalize()}raycast(){}traverse(t){t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverse(t)}traverseVisible(t){if(this.visible===!1)return;t(this);const e=this.children;for(let n=0,i=e.length;n<i;n++)e[n].traverseVisible(t)}traverseAncestors(t){const e=this.parent;e!==null&&(t(e),e.traverseAncestors(t))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(t){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||t)&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),this.matrixWorldNeedsUpdate=!1,t=!0);const e=this.children;for(let n=0,i=e.length;n<i;n++){const r=e[n];(r.matrixWorldAutoUpdate===!0||t===!0)&&r.updateMatrixWorld(t)}}updateWorldMatrix(t,e){const n=this.parent;if(t===!0&&n!==null&&n.matrixWorldAutoUpdate===!0&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix),e===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++){const a=i[r];a.matrixWorldAutoUpdate===!0&&a.updateWorldMatrix(!1,!0)}}}toJSON(t){const e=t===void 0||typeof t=="string",n={};e&&(t={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.6,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.visibility=this._visibility,i.active=this._active,i.bounds=this._bounds.map(a=>({boxInitialized:a.boxInitialized,boxMin:a.box.min.toArray(),boxMax:a.box.max.toArray(),sphereInitialized:a.sphereInitialized,sphereRadius:a.sphere.radius,sphereCenter:a.sphere.center.toArray()})),i.maxGeometryCount=this._maxGeometryCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.geometryCount=this._geometryCount,i.matricesTexture=this._matricesTexture.toJSON(t),this.boundingSphere!==null&&(i.boundingSphere={center:i.boundingSphere.center.toArray(),radius:i.boundingSphere.radius}),this.boundingBox!==null&&(i.boundingBox={min:i.boundingBox.min.toArray(),max:i.boundingBox.max.toArray()}));function r(a,c){return a[c.uuid]===void 0&&(a[c.uuid]=c.toJSON(t)),c.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(t).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(t).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(t.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const c=a.shapes;if(Array.isArray(c))for(let l=0,h=c.length;l<h;l++){const d=c[l];r(t.shapes,d)}else r(t.shapes,c)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(t.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let c=0,l=this.material.length;c<l;c++)a.push(r(t.materials,this.material[c]));i.material=a}else i.material=r(t.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(t).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const c=this.animations[a];i.animations.push(r(t.animations,c))}}if(e){const a=o(t.geometries),c=o(t.materials),l=o(t.textures),h=o(t.images),d=o(t.shapes),u=o(t.skeletons),f=o(t.animations),g=o(t.nodes);a.length>0&&(n.geometries=a),c.length>0&&(n.materials=c),l.length>0&&(n.textures=l),h.length>0&&(n.images=h),d.length>0&&(n.shapes=d),u.length>0&&(n.skeletons=u),f.length>0&&(n.animations=f),g.length>0&&(n.nodes=g)}return n.object=i,n;function o(a){const c=[];for(const l in a){const h=a[l];delete h.metadata,c.push(h)}return c}}clone(t){return new this.constructor().copy(this,t)}copy(t,e=!0){if(this.name=t.name,this.up.copy(t.up),this.position.copy(t.position),this.rotation.order=t.rotation.order,this.quaternion.copy(t.quaternion),this.scale.copy(t.scale),this.matrix.copy(t.matrix),this.matrixWorld.copy(t.matrixWorld),this.matrixAutoUpdate=t.matrixAutoUpdate,this.matrixWorldAutoUpdate=t.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=t.matrixWorldNeedsUpdate,this.layers.mask=t.layers.mask,this.visible=t.visible,this.castShadow=t.castShadow,this.receiveShadow=t.receiveShadow,this.frustumCulled=t.frustumCulled,this.renderOrder=t.renderOrder,this.animations=t.animations.slice(),this.userData=JSON.parse(JSON.stringify(t.userData)),e===!0)for(let n=0;n<t.children.length;n++){const i=t.children[n];this.add(i.clone())}return this}}Ie.DEFAULT_UP=new N(0,1,0);Ie.DEFAULT_MATRIX_AUTO_UPDATE=!0;Ie.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const hn=new N,Pn=new N,Vo=new N,Ln=new N,Ii=new N,Di=new N,hl=new N,Xo=new N,qo=new N,Yo=new N;let ar=!1;class sn{constructor(t=new N,e=new N,n=new N){this.a=t,this.b=e,this.c=n}static getNormal(t,e,n,i){i.subVectors(n,e),hn.subVectors(t,e),i.cross(hn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(t,e,n,i,r){hn.subVectors(i,e),Pn.subVectors(n,e),Vo.subVectors(t,e);const o=hn.dot(hn),a=hn.dot(Pn),c=hn.dot(Vo),l=Pn.dot(Pn),h=Pn.dot(Vo),d=o*l-a*a;if(d===0)return r.set(0,0,0),null;const u=1/d,f=(l*c-a*h)*u,g=(o*h-a*c)*u;return r.set(1-f-g,g,f)}static containsPoint(t,e,n,i){return this.getBarycoord(t,e,n,i,Ln)===null?!1:Ln.x>=0&&Ln.y>=0&&Ln.x+Ln.y<=1}static getUV(t,e,n,i,r,o,a,c){return ar===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ar=!0),this.getInterpolation(t,e,n,i,r,o,a,c)}static getInterpolation(t,e,n,i,r,o,a,c){return this.getBarycoord(t,e,n,i,Ln)===null?(c.x=0,c.y=0,"z"in c&&(c.z=0),"w"in c&&(c.w=0),null):(c.setScalar(0),c.addScaledVector(r,Ln.x),c.addScaledVector(o,Ln.y),c.addScaledVector(a,Ln.z),c)}static isFrontFacing(t,e,n,i){return hn.subVectors(n,e),Pn.subVectors(t,e),hn.cross(Pn).dot(i)<0}set(t,e,n){return this.a.copy(t),this.b.copy(e),this.c.copy(n),this}setFromPointsAndIndices(t,e,n,i){return this.a.copy(t[e]),this.b.copy(t[n]),this.c.copy(t[i]),this}setFromAttributeAndIndices(t,e,n,i){return this.a.fromBufferAttribute(t,e),this.b.fromBufferAttribute(t,n),this.c.fromBufferAttribute(t,i),this}clone(){return new this.constructor().copy(this)}copy(t){return this.a.copy(t.a),this.b.copy(t.b),this.c.copy(t.c),this}getArea(){return hn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),hn.cross(Pn).length()*.5}getMidpoint(t){return t.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(t){return sn.getNormal(this.a,this.b,this.c,t)}getPlane(t){return t.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(t,e){return sn.getBarycoord(t,this.a,this.b,this.c,e)}getUV(t,e,n,i,r){return ar===!1&&(console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation()."),ar=!0),sn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}getInterpolation(t,e,n,i,r){return sn.getInterpolation(t,this.a,this.b,this.c,e,n,i,r)}containsPoint(t){return sn.containsPoint(t,this.a,this.b,this.c)}isFrontFacing(t){return sn.isFrontFacing(this.a,this.b,this.c,t)}intersectsBox(t){return t.intersectsTriangle(this)}closestPointToPoint(t,e){const n=this.a,i=this.b,r=this.c;let o,a;Ii.subVectors(i,n),Di.subVectors(r,n),Xo.subVectors(t,n);const c=Ii.dot(Xo),l=Di.dot(Xo);if(c<=0&&l<=0)return e.copy(n);qo.subVectors(t,i);const h=Ii.dot(qo),d=Di.dot(qo);if(h>=0&&d<=h)return e.copy(i);const u=c*d-h*l;if(u<=0&&c>=0&&h<=0)return o=c/(c-h),e.copy(n).addScaledVector(Ii,o);Yo.subVectors(t,r);const f=Ii.dot(Yo),g=Di.dot(Yo);if(g>=0&&f<=g)return e.copy(r);const v=f*l-c*g;if(v<=0&&l>=0&&g<=0)return a=l/(l-g),e.copy(n).addScaledVector(Di,a);const m=h*g-f*d;if(m<=0&&d-h>=0&&f-g>=0)return hl.subVectors(r,i),a=(d-h)/(d-h+(f-g)),e.copy(i).addScaledVector(hl,a);const p=1/(m+v+u);return o=v*p,a=u*p,e.copy(n).addScaledVector(Ii,o).addScaledVector(Di,a)}equals(t){return t.a.equals(this.a)&&t.b.equals(this.b)&&t.c.equals(this.c)}}const tu={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Yn={h:0,s:0,l:0},cr={h:0,s:0,l:0};function jo(s,t,e){return e<0&&(e+=1),e>1&&(e-=1),e<1/6?s+(t-s)*6*e:e<1/2?t:e<2/3?s+(t-s)*6*(2/3-e):s}class Ft{constructor(t,e,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(t,e,n)}set(t,e,n){if(e===void 0&&n===void 0){const i=t;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(t,e,n);return this}setScalar(t){return this.r=t,this.g=t,this.b=t,this}setHex(t,e=$t){return t=Math.floor(t),this.r=(t>>16&255)/255,this.g=(t>>8&255)/255,this.b=(t&255)/255,se.toWorkingColorSpace(this,e),this}setRGB(t,e,n,i=se.workingColorSpace){return this.r=t,this.g=e,this.b=n,se.toWorkingColorSpace(this,i),this}setHSL(t,e,n,i=se.workingColorSpace){if(t=Za(t,1),e=Re(e,0,1),n=Re(n,0,1),e===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+e):n+e-n*e,o=2*n-r;this.r=jo(o,r,t+1/3),this.g=jo(o,r,t),this.b=jo(o,r,t-1/3)}return se.toWorkingColorSpace(this,i),this}setStyle(t,e=$t){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+t+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(t)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,e);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,e);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,e);break;default:console.warn("THREE.Color: Unknown color model "+t)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(t)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,e);if(o===6)return this.setHex(parseInt(r,16),e);console.warn("THREE.Color: Invalid hex color "+t)}else if(t&&t.length>0)return this.setColorName(t,e);return this}setColorName(t,e=$t){const n=tu[t.toLowerCase()];return n!==void 0?this.setHex(n,e):console.warn("THREE.Color: Unknown color "+t),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(t){return this.r=t.r,this.g=t.g,this.b=t.b,this}copySRGBToLinear(t){return this.r=ts(t.r),this.g=ts(t.g),this.b=ts(t.b),this}copyLinearToSRGB(t){return this.r=Fo(t.r),this.g=Fo(t.g),this.b=Fo(t.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(t=$t){return se.fromWorkingColorSpace(Oe.copy(this),t),Math.round(Re(Oe.r*255,0,255))*65536+Math.round(Re(Oe.g*255,0,255))*256+Math.round(Re(Oe.b*255,0,255))}getHexString(t=$t){return("000000"+this.getHex(t).toString(16)).slice(-6)}getHSL(t,e=se.workingColorSpace){se.fromWorkingColorSpace(Oe.copy(this),e);const n=Oe.r,i=Oe.g,r=Oe.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let c,l;const h=(a+o)/2;if(a===o)c=0,l=0;else{const d=o-a;switch(l=h<=.5?d/(o+a):d/(2-o-a),o){case n:c=(i-r)/d+(i<r?6:0);break;case i:c=(r-n)/d+2;break;case r:c=(n-i)/d+4;break}c/=6}return t.h=c,t.s=l,t.l=h,t}getRGB(t,e=se.workingColorSpace){return se.fromWorkingColorSpace(Oe.copy(this),e),t.r=Oe.r,t.g=Oe.g,t.b=Oe.b,t}getStyle(t=$t){se.fromWorkingColorSpace(Oe.copy(this),t);const e=Oe.r,n=Oe.g,i=Oe.b;return t!==$t?`color(${t} ${e.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(e*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(t,e,n){return this.getHSL(Yn),this.setHSL(Yn.h+t,Yn.s+e,Yn.l+n)}add(t){return this.r+=t.r,this.g+=t.g,this.b+=t.b,this}addColors(t,e){return this.r=t.r+e.r,this.g=t.g+e.g,this.b=t.b+e.b,this}addScalar(t){return this.r+=t,this.g+=t,this.b+=t,this}sub(t){return this.r=Math.max(0,this.r-t.r),this.g=Math.max(0,this.g-t.g),this.b=Math.max(0,this.b-t.b),this}multiply(t){return this.r*=t.r,this.g*=t.g,this.b*=t.b,this}multiplyScalar(t){return this.r*=t,this.g*=t,this.b*=t,this}lerp(t,e){return this.r+=(t.r-this.r)*e,this.g+=(t.g-this.g)*e,this.b+=(t.b-this.b)*e,this}lerpColors(t,e,n){return this.r=t.r+(e.r-t.r)*n,this.g=t.g+(e.g-t.g)*n,this.b=t.b+(e.b-t.b)*n,this}lerpHSL(t,e){this.getHSL(Yn),t.getHSL(cr);const n=Ds(Yn.h,cr.h,e),i=Ds(Yn.s,cr.s,e),r=Ds(Yn.l,cr.l,e);return this.setHSL(n,i,r),this}setFromVector3(t){return this.r=t.x,this.g=t.y,this.b=t.z,this}applyMatrix3(t){const e=this.r,n=this.g,i=this.b,r=t.elements;return this.r=r[0]*e+r[3]*n+r[6]*i,this.g=r[1]*e+r[4]*n+r[7]*i,this.b=r[2]*e+r[5]*n+r[8]*i,this}equals(t){return t.r===this.r&&t.g===this.g&&t.b===this.b}fromArray(t,e=0){return this.r=t[e],this.g=t[e+1],this.b=t[e+2],this}toArray(t=[],e=0){return t[e]=this.r,t[e+1]=this.g,t[e+2]=this.b,t}fromBufferAttribute(t,e){return this.r=t.getX(e),this.g=t.getY(e),this.b=t.getZ(e),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Oe=new Ft;Ft.NAMES=tu;let Of=0,cs=class extends as{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:Of++}),this.uuid=En(),this.name="",this.type="Material",this.blending=$i,this.side=ei,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Pa,this.blendDst=La,this.blendEquation=pi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Ft(0,0,0),this.blendAlpha=0,this.depthFunc=oo,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Jc,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=bi,this.stencilZFail=bi,this.stencilZPass=bi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(t){this._alphaTest>0!=t>0&&this.version++,this._alphaTest=t}onBuild(){}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(t){if(t!==void 0)for(const e in t){const n=t[e];if(n===void 0){console.warn(`THREE.Material: parameter '${e}' has value of undefined.`);continue}const i=this[e];if(i===void 0){console.warn(`THREE.Material: '${e}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[e]=n}}toJSON(t){const e=t===void 0||typeof t=="string";e&&(t={textures:{},images:{}});const n={metadata:{version:4.6,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(t).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(t).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(t).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(t).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(t).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(t).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(t).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(t).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(t).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(t).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(t).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(t).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(t).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(t).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(t).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(t).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(t).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(t).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(t).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(t).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(t).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(t).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(t).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(t).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==$i&&(n.blending=this.blending),this.side!==ei&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==Pa&&(n.blendSrc=this.blendSrc),this.blendDst!==La&&(n.blendDst=this.blendDst),this.blendEquation!==pi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==oo&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Jc&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==bi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==bi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==bi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const c=r[a];delete c.metadata,o.push(c)}return o}if(e){const r=i(t.textures),o=i(t.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(t){this.name=t.name,this.blending=t.blending,this.side=t.side,this.vertexColors=t.vertexColors,this.opacity=t.opacity,this.transparent=t.transparent,this.blendSrc=t.blendSrc,this.blendDst=t.blendDst,this.blendEquation=t.blendEquation,this.blendSrcAlpha=t.blendSrcAlpha,this.blendDstAlpha=t.blendDstAlpha,this.blendEquationAlpha=t.blendEquationAlpha,this.blendColor.copy(t.blendColor),this.blendAlpha=t.blendAlpha,this.depthFunc=t.depthFunc,this.depthTest=t.depthTest,this.depthWrite=t.depthWrite,this.stencilWriteMask=t.stencilWriteMask,this.stencilFunc=t.stencilFunc,this.stencilRef=t.stencilRef,this.stencilFuncMask=t.stencilFuncMask,this.stencilFail=t.stencilFail,this.stencilZFail=t.stencilZFail,this.stencilZPass=t.stencilZPass,this.stencilWrite=t.stencilWrite;const e=t.clippingPlanes;let n=null;if(e!==null){const i=e.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=e[r].clone()}return this.clippingPlanes=n,this.clipIntersection=t.clipIntersection,this.clipShadows=t.clipShadows,this.shadowSide=t.shadowSide,this.colorWrite=t.colorWrite,this.precision=t.precision,this.polygonOffset=t.polygonOffset,this.polygonOffsetFactor=t.polygonOffsetFactor,this.polygonOffsetUnits=t.polygonOffsetUnits,this.dithering=t.dithering,this.alphaTest=t.alphaTest,this.alphaHash=t.alphaHash,this.alphaToCoverage=t.alphaToCoverage,this.premultipliedAlpha=t.premultipliedAlpha,this.forceSinglePass=t.forceSinglePass,this.visible=t.visible,this.toneMapped=t.toneMapped,this.userData=JSON.parse(JSON.stringify(t.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(t){t===!0&&this.version++}};class ls extends cs{constructor(t){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Ft(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.combine=Dh,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.specularMap=t.specularMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.combine=t.combine,this.reflectivity=t.reflectivity,this.refractionRatio=t.refractionRatio,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.fog=t.fog,this}}const _e=new N,lr=new nt;class ee{constructor(t,e,n=!1){if(Array.isArray(t))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,this.name="",this.array=t,this.itemSize=e,this.count=t!==void 0?t.length/e:0,this.normalized=n,this.usage=Ua,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.gpuType=Jn,this.version=0}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.BufferAttribute: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.name=t.name,this.array=new t.array.constructor(t.array),this.itemSize=t.itemSize,this.count=t.count,this.normalized=t.normalized,this.usage=t.usage,this.gpuType=t.gpuType,this}copyAt(t,e,n){t*=this.itemSize,n*=e.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[t+i]=e.array[n+i];return this}copyArray(t){return this.array.set(t),this}applyMatrix3(t){if(this.itemSize===2)for(let e=0,n=this.count;e<n;e++)lr.fromBufferAttribute(this,e),lr.applyMatrix3(t),this.setXY(e,lr.x,lr.y);else if(this.itemSize===3)for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix3(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyMatrix4(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyMatrix4(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.applyNormalMatrix(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)_e.fromBufferAttribute(this,e),_e.transformDirection(t),this.setXYZ(e,_e.x,_e.y,_e.z);return this}set(t,e=0){return this.array.set(t,e),this}getComponent(t,e){let n=this.array[t*this.itemSize+e];return this.normalized&&(n=wn(n,this.array)),n}setComponent(t,e,n){return this.normalized&&(n=re(n,this.array)),this.array[t*this.itemSize+e]=n,this}getX(t){let e=this.array[t*this.itemSize];return this.normalized&&(e=wn(e,this.array)),e}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize]=e,this}getY(t){let e=this.array[t*this.itemSize+1];return this.normalized&&(e=wn(e,this.array)),e}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+1]=e,this}getZ(t){let e=this.array[t*this.itemSize+2];return this.normalized&&(e=wn(e,this.array)),e}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+2]=e,this}getW(t){let e=this.array[t*this.itemSize+3];return this.normalized&&(e=wn(e,this.array)),e}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.array[t*this.itemSize+3]=e,this}setXY(t,e,n){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.array[t+0]=e,this.array[t+1]=n,this}setXYZ(t,e,n,i){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t*=this.itemSize,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.array[t+0]=e,this.array[t+1]=n,this.array[t+2]=i,this.array[t+3]=r,this}onUpload(t){return this.onUploadCallback=t,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const t={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(t.name=this.name),this.usage!==Ua&&(t.usage=this.usage),t}}class eu extends ee{constructor(t,e,n){super(new Uint16Array(t),e,n)}}class nu extends ee{constructor(t,e,n){super(new Uint32Array(t),e,n)}}class Jt extends ee{constructor(t,e,n){super(new Float32Array(t),e,n)}}let zf=0;const nn=new ne,Ko=new Ie,Ni=new N,je=new Si,gs=new Si,Ae=new N;class he extends as{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:zf++}),this.uuid=En(),this.name="",this.type="BufferGeometry",this.index=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(t){return Array.isArray(t)?this.index=new(Kh(t)?nu:eu)(t,1):this.index=t,this}getAttribute(t){return this.attributes[t]}setAttribute(t,e){return this.attributes[t]=e,this}deleteAttribute(t){return delete this.attributes[t],this}hasAttribute(t){return this.attributes[t]!==void 0}addGroup(t,e,n=0){this.groups.push({start:t,count:e,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(t,e){this.drawRange.start=t,this.drawRange.count=e}applyMatrix4(t){const e=this.attributes.position;e!==void 0&&(e.applyMatrix4(t),e.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new Kt().getNormalMatrix(t);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(t),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(t){return nn.makeRotationFromQuaternion(t),this.applyMatrix4(nn),this}rotateX(t){return nn.makeRotationX(t),this.applyMatrix4(nn),this}rotateY(t){return nn.makeRotationY(t),this.applyMatrix4(nn),this}rotateZ(t){return nn.makeRotationZ(t),this.applyMatrix4(nn),this}translate(t,e,n){return nn.makeTranslation(t,e,n),this.applyMatrix4(nn),this}scale(t,e,n){return nn.makeScale(t,e,n),this.applyMatrix4(nn),this}lookAt(t){return Ko.lookAt(t),Ko.updateMatrix(),this.applyMatrix4(Ko.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Ni).negate(),this.translate(Ni.x,Ni.y,Ni.z),this}setFromPoints(t){const e=[];for(let n=0,i=t.length;n<i;n++){const r=t[n];e.push(r.x,r.y,r.z||0)}return this.setAttribute("position",new Jt(e,3)),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Si);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingBox.set(new N(-1/0,-1/0,-1/0),new N(1/0,1/0,1/0));return}if(t!==void 0){if(this.boundingBox.setFromBufferAttribute(t),e)for(let n=0,i=e.length;n<i;n++){const r=e[n];je.setFromBufferAttribute(r),this.morphTargetsRelative?(Ae.addVectors(this.boundingBox.min,je.min),this.boundingBox.expandByPoint(Ae),Ae.addVectors(this.boundingBox.max,je.max),this.boundingBox.expandByPoint(Ae)):(this.boundingBox.expandByPoint(je.min),this.boundingBox.expandByPoint(je.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Ys);const t=this.attributes.position,e=this.morphAttributes.position;if(t&&t.isGLBufferAttribute){console.error('THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set "mesh.frustumCulled" to "false".',this),this.boundingSphere.set(new N,1/0);return}if(t){const n=this.boundingSphere.center;if(je.setFromBufferAttribute(t),e)for(let r=0,o=e.length;r<o;r++){const a=e[r];gs.setFromBufferAttribute(a),this.morphTargetsRelative?(Ae.addVectors(je.min,gs.min),je.expandByPoint(Ae),Ae.addVectors(je.max,gs.max),je.expandByPoint(Ae)):(je.expandByPoint(gs.min),je.expandByPoint(gs.max))}je.getCenter(n);let i=0;for(let r=0,o=t.count;r<o;r++)Ae.fromBufferAttribute(t,r),i=Math.max(i,n.distanceToSquared(Ae));if(e)for(let r=0,o=e.length;r<o;r++){const a=e[r],c=this.morphTargetsRelative;for(let l=0,h=a.count;l<h;l++)Ae.fromBufferAttribute(a,l),c&&(Ni.fromBufferAttribute(t,l),Ae.add(Ni)),i=Math.max(i,n.distanceToSquared(Ae))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const t=this.index,e=this.attributes;if(t===null||e.position===void 0||e.normal===void 0||e.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.array,i=e.position.array,r=e.normal.array,o=e.uv.array,a=i.length/3;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new ee(new Float32Array(4*a),4));const c=this.getAttribute("tangent").array,l=[],h=[];for(let T=0;T<a;T++)l[T]=new N,h[T]=new N;const d=new N,u=new N,f=new N,g=new nt,v=new nt,m=new nt,p=new N,x=new N;function y(T,O,D){d.fromArray(i,T*3),u.fromArray(i,O*3),f.fromArray(i,D*3),g.fromArray(o,T*2),v.fromArray(o,O*2),m.fromArray(o,D*2),u.sub(d),f.sub(d),v.sub(g),m.sub(g);const z=1/(v.x*m.y-m.x*v.y);isFinite(z)&&(p.copy(u).multiplyScalar(m.y).addScaledVector(f,-v.y).multiplyScalar(z),x.copy(f).multiplyScalar(v.x).addScaledVector(u,-m.x).multiplyScalar(z),l[T].add(p),l[O].add(p),l[D].add(p),h[T].add(x),h[O].add(x),h[D].add(x))}let _=this.groups;_.length===0&&(_=[{start:0,count:n.length}]);for(let T=0,O=_.length;T<O;++T){const D=_[T],z=D.start,C=D.count;for(let I=z,U=z+C;I<U;I+=3)y(n[I+0],n[I+1],n[I+2])}const M=new N,S=new N,b=new N,L=new N;function w(T){b.fromArray(r,T*3),L.copy(b);const O=l[T];M.copy(O),M.sub(b.multiplyScalar(b.dot(O))).normalize(),S.crossVectors(L,O);const z=S.dot(h[T])<0?-1:1;c[T*4]=M.x,c[T*4+1]=M.y,c[T*4+2]=M.z,c[T*4+3]=z}for(let T=0,O=_.length;T<O;++T){const D=_[T],z=D.start,C=D.count;for(let I=z,U=z+C;I<U;I+=3)w(n[I+0]),w(n[I+1]),w(n[I+2])}}computeVertexNormals(){const t=this.index,e=this.getAttribute("position");if(e!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new ee(new Float32Array(e.count*3),3),this.setAttribute("normal",n);else for(let u=0,f=n.count;u<f;u++)n.setXYZ(u,0,0,0);const i=new N,r=new N,o=new N,a=new N,c=new N,l=new N,h=new N,d=new N;if(t)for(let u=0,f=t.count;u<f;u+=3){const g=t.getX(u+0),v=t.getX(u+1),m=t.getX(u+2);i.fromBufferAttribute(e,g),r.fromBufferAttribute(e,v),o.fromBufferAttribute(e,m),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),a.fromBufferAttribute(n,g),c.fromBufferAttribute(n,v),l.fromBufferAttribute(n,m),a.add(h),c.add(h),l.add(h),n.setXYZ(g,a.x,a.y,a.z),n.setXYZ(v,c.x,c.y,c.z),n.setXYZ(m,l.x,l.y,l.z)}else for(let u=0,f=e.count;u<f;u+=3)i.fromBufferAttribute(e,u+0),r.fromBufferAttribute(e,u+1),o.fromBufferAttribute(e,u+2),h.subVectors(o,r),d.subVectors(i,r),h.cross(d),n.setXYZ(u+0,h.x,h.y,h.z),n.setXYZ(u+1,h.x,h.y,h.z),n.setXYZ(u+2,h.x,h.y,h.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const t=this.attributes.normal;for(let e=0,n=t.count;e<n;e++)Ae.fromBufferAttribute(t,e),Ae.normalize(),t.setXYZ(e,Ae.x,Ae.y,Ae.z)}toNonIndexed(){function t(a,c){const l=a.array,h=a.itemSize,d=a.normalized,u=new l.constructor(c.length*h);let f=0,g=0;for(let v=0,m=c.length;v<m;v++){a.isInterleavedBufferAttribute?f=c[v]*a.data.stride+a.offset:f=c[v]*h;for(let p=0;p<h;p++)u[g++]=l[f++]}return new ee(u,h,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const e=new he,n=this.index.array,i=this.attributes;for(const a in i){const c=i[a],l=t(c,n);e.setAttribute(a,l)}const r=this.morphAttributes;for(const a in r){const c=[],l=r[a];for(let h=0,d=l.length;h<d;h++){const u=l[h],f=t(u,n);c.push(f)}e.morphAttributes[a]=c}e.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,c=o.length;a<c;a++){const l=o[a];e.addGroup(l.start,l.count,l.materialIndex)}return e}toJSON(){const t={metadata:{version:4.6,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(t.uuid=this.uuid,t.type=this.type,this.name!==""&&(t.name=this.name),Object.keys(this.userData).length>0&&(t.userData=this.userData),this.parameters!==void 0){const c=this.parameters;for(const l in c)c[l]!==void 0&&(t[l]=c[l]);return t}t.data={attributes:{}};const e=this.index;e!==null&&(t.data.index={type:e.array.constructor.name,array:Array.prototype.slice.call(e.array)});const n=this.attributes;for(const c in n){const l=n[c];t.data.attributes[c]=l.toJSON(t.data)}const i={};let r=!1;for(const c in this.morphAttributes){const l=this.morphAttributes[c],h=[];for(let d=0,u=l.length;d<u;d++){const f=l[d];h.push(f.toJSON(t.data))}h.length>0&&(i[c]=h,r=!0)}r&&(t.data.morphAttributes=i,t.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(t.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(t.data.boundingSphere={center:a.center.toArray(),radius:a.radius}),t}clone(){return new this.constructor().copy(this)}copy(t){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const e={};this.name=t.name;const n=t.index;n!==null&&this.setIndex(n.clone(e));const i=t.attributes;for(const l in i){const h=i[l];this.setAttribute(l,h.clone(e))}const r=t.morphAttributes;for(const l in r){const h=[],d=r[l];for(let u=0,f=d.length;u<f;u++)h.push(d[u].clone(e));this.morphAttributes[l]=h}this.morphTargetsRelative=t.morphTargetsRelative;const o=t.groups;for(let l=0,h=o.length;l<h;l++){const d=o[l];this.addGroup(d.start,d.count,d.materialIndex)}const a=t.boundingBox;a!==null&&(this.boundingBox=a.clone());const c=t.boundingSphere;return c!==null&&(this.boundingSphere=c.clone()),this.drawRange.start=t.drawRange.start,this.drawRange.count=t.drawRange.count,this.userData=t.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const ul=new ne,ai=new Rf,hr=new Ys,dl=new N,Ui=new N,Fi=new N,Oi=new N,Zo=new N,ur=new N,dr=new nt,fr=new nt,pr=new nt,fl=new N,pl=new N,ml=new N,mr=new N,gr=new N;class $ extends Ie{constructor(t=new he,e=new ls){super(),this.isMesh=!0,this.type="Mesh",this.geometry=t,this.material=e,this.updateMorphTargets()}copy(t,e){return super.copy(t,e),t.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=t.morphTargetInfluences.slice()),t.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},t.morphTargetDictionary)),this.material=Array.isArray(t.material)?t.material.slice():t.material,this.geometry=t.geometry,this}updateMorphTargets(){const e=this.geometry.morphAttributes,n=Object.keys(e);if(n.length>0){const i=e[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(t,e){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;e.fromBufferAttribute(i,t);const a=this.morphTargetInfluences;if(r&&a){ur.set(0,0,0);for(let c=0,l=r.length;c<l;c++){const h=a[c],d=r[c];h!==0&&(Zo.fromBufferAttribute(d,t),o?ur.addScaledVector(Zo,h):ur.addScaledVector(Zo.sub(e),h))}e.add(ur)}return e}raycast(t,e){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),hr.copy(n.boundingSphere),hr.applyMatrix4(r),ai.copy(t.ray).recast(t.near),!(hr.containsPoint(ai.origin)===!1&&(ai.intersectSphere(hr,dl)===null||ai.origin.distanceToSquared(dl)>(t.far-t.near)**2))&&(ul.copy(r).invert(),ai.copy(t.ray).applyMatrix4(ul),!(n.boundingBox!==null&&ai.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(t,e,ai)))}_computeIntersections(t,e,n){let i;const r=this.geometry,o=this.material,a=r.index,c=r.attributes.position,l=r.attributes.uv,h=r.attributes.uv1,d=r.attributes.normal,u=r.groups,f=r.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,M=y;_<M;_+=3){const S=a.getX(_),b=a.getX(_+1),L=a.getX(_+2);i=vr(this,p,t,n,l,h,d,S,b,L),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(a.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const x=a.getX(m),y=a.getX(m+1),_=a.getX(m+2);i=vr(this,o,t,n,l,h,d,x,y,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}else if(c!==void 0)if(Array.isArray(o))for(let g=0,v=u.length;g<v;g++){const m=u[g],p=o[m.materialIndex],x=Math.max(m.start,f.start),y=Math.min(c.count,Math.min(m.start+m.count,f.start+f.count));for(let _=x,M=y;_<M;_+=3){const S=_,b=_+1,L=_+2;i=vr(this,p,t,n,l,h,d,S,b,L),i&&(i.faceIndex=Math.floor(_/3),i.face.materialIndex=m.materialIndex,e.push(i))}}else{const g=Math.max(0,f.start),v=Math.min(c.count,f.start+f.count);for(let m=g,p=v;m<p;m+=3){const x=m,y=m+1,_=m+2;i=vr(this,o,t,n,l,h,d,x,y,_),i&&(i.faceIndex=Math.floor(m/3),e.push(i))}}}}function Bf(s,t,e,n,i,r,o,a){let c;if(t.side===Ve?c=n.intersectTriangle(o,r,i,!0,a):c=n.intersectTriangle(i,r,o,t.side===ei,a),c===null)return null;gr.copy(a),gr.applyMatrix4(s.matrixWorld);const l=e.ray.origin.distanceTo(gr);return l<e.near||l>e.far?null:{distance:l,point:gr.clone(),object:s}}function vr(s,t,e,n,i,r,o,a,c,l){s.getVertexPosition(a,Ui),s.getVertexPosition(c,Fi),s.getVertexPosition(l,Oi);const h=Bf(s,t,e,n,Ui,Fi,Oi,mr);if(h){i&&(dr.fromBufferAttribute(i,a),fr.fromBufferAttribute(i,c),pr.fromBufferAttribute(i,l),h.uv=sn.getInterpolation(mr,Ui,Fi,Oi,dr,fr,pr,new nt)),r&&(dr.fromBufferAttribute(r,a),fr.fromBufferAttribute(r,c),pr.fromBufferAttribute(r,l),h.uv1=sn.getInterpolation(mr,Ui,Fi,Oi,dr,fr,pr,new nt),h.uv2=h.uv1),o&&(fl.fromBufferAttribute(o,a),pl.fromBufferAttribute(o,c),ml.fromBufferAttribute(o,l),h.normal=sn.getInterpolation(mr,Ui,Fi,Oi,fl,pl,ml,new N),h.normal.dot(n.direction)>0&&h.normal.multiplyScalar(-1));const d={a,b:c,c:l,normal:new N,materialIndex:0};sn.getNormal(Ui,Fi,Oi,d.normal),h.face=d}return h}class At extends he{constructor(t=1,e=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:t,height:e,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const c=[],l=[],h=[],d=[];let u=0,f=0;g("z","y","x",-1,-1,n,e,t,o,r,0),g("z","y","x",1,-1,n,e,-t,o,r,1),g("x","z","y",1,1,t,n,e,i,o,2),g("x","z","y",1,-1,t,n,-e,i,o,3),g("x","y","z",1,-1,t,e,n,i,r,4),g("x","y","z",-1,-1,t,e,-n,i,r,5),this.setIndex(c),this.setAttribute("position",new Jt(l,3)),this.setAttribute("normal",new Jt(h,3)),this.setAttribute("uv",new Jt(d,2));function g(v,m,p,x,y,_,M,S,b,L,w){const T=_/b,O=M/L,D=_/2,z=M/2,C=S/2,I=b+1,U=L+1;let Y=0,G=0;const k=new N;for(let Q=0;Q<U;Q++){const V=Q*O-z;for(let X=0;X<I;X++){const q=X*T-D;k[v]=q*x,k[m]=V*y,k[p]=C,l.push(k.x,k.y,k.z),k[v]=0,k[m]=0,k[p]=S>0?1:-1,h.push(k.x,k.y,k.z),d.push(X/b),d.push(1-Q/L),Y+=1}}for(let Q=0;Q<L;Q++)for(let V=0;V<b;V++){const X=u+V+I*Q,q=u+V+I*(Q+1),et=u+(V+1)+I*(Q+1),ut=u+(V+1)+I*Q;c.push(X,q,ut),c.push(q,et,ut),G+=6}a.addGroup(f,G,w),f+=G,u+=Y}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new At(t.width,t.height,t.depth,t.widthSegments,t.heightSegments,t.depthSegments)}}function ss(s){const t={};for(const e in s){t[e]={};for(const n in s[e]){const i=s[e][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),t[e][n]=null):t[e][n]=i.clone():Array.isArray(i)?t[e][n]=i.slice():t[e][n]=i}}return t}function ke(s){const t={};for(let e=0;e<s.length;e++){const n=ss(s[e]);for(const i in n)t[i]=n[i]}return t}function Gf(s){const t=[];for(let e=0;e<s.length;e++)t.push(s[e].clone());return t}function iu(s){return s.getRenderTarget()===null?s.outputColorSpace:se.workingColorSpace}const Gn={clone:ss,merge:ke};var Hf=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,Wf=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class Le extends cs{constructor(t){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Hf,this.fragmentShader=Wf,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={derivatives:!1,fragDepth:!1,drawBuffers:!1,shaderTextureLOD:!1,clipCullDistance:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,t!==void 0&&this.setValues(t)}copy(t){return super.copy(t),this.fragmentShader=t.fragmentShader,this.vertexShader=t.vertexShader,this.uniforms=ss(t.uniforms),this.uniformsGroups=Gf(t.uniformsGroups),this.defines=Object.assign({},t.defines),this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.fog=t.fog,this.lights=t.lights,this.clipping=t.clipping,this.extensions=Object.assign({},t.extensions),this.glslVersion=t.glslVersion,this}toJSON(t){const e=super.toJSON(t);e.glslVersion=this.glslVersion,e.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?e.uniforms[i]={type:"t",value:o.toJSON(t).uuid}:o&&o.isColor?e.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?e.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?e.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?e.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?e.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?e.uniforms[i]={type:"m4",value:o.toArray()}:e.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(e.defines=this.defines),e.vertexShader=this.vertexShader,e.fragmentShader=this.fragmentShader,e.lights=this.lights,e.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(e.extensions=n),e}}class su extends Ie{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new ne,this.projectionMatrix=new ne,this.projectionMatrixInverse=new ne,this.coordinateSystem=zn}copy(t,e){return super.copy(t,e),this.matrixWorldInverse.copy(t.matrixWorldInverse),this.projectionMatrix.copy(t.projectionMatrix),this.projectionMatrixInverse.copy(t.projectionMatrixInverse),this.coordinateSystem=t.coordinateSystem,this}getWorldDirection(t){return super.getWorldDirection(t).negate()}updateMatrixWorld(t){super.updateMatrixWorld(t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(t,e){super.updateWorldMatrix(t,e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}class Ze extends su{constructor(t=50,e=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=t,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=e,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.fov=t.fov,this.zoom=t.zoom,this.near=t.near,this.far=t.far,this.focus=t.focus,this.aspect=t.aspect,this.view=t.view===null?null:Object.assign({},t.view),this.filmGauge=t.filmGauge,this.filmOffset=t.filmOffset,this}setFocalLength(t){const e=.5*this.getFilmHeight()/t;this.fov=Gs*2*Math.atan(e),this.updateProjectionMatrix()}getFocalLength(){const t=Math.tan(Is*.5*this.fov);return .5*this.getFilmHeight()/t}getEffectiveFOV(){return Gs*2*Math.atan(Math.tan(Is*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}setViewOffset(t,e,n,i,r,o){this.aspect=t/e,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=this.near;let e=t*Math.tan(Is*.5*this.fov)/this.zoom,n=2*e,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const c=o.fullWidth,l=o.fullHeight;r+=o.offsetX*i/c,e-=o.offsetY*n/l,i*=o.width/c,n*=o.height/l}const a=this.filmOffset;a!==0&&(r+=t*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,e,e-n,t,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.fov=this.fov,e.object.zoom=this.zoom,e.object.near=this.near,e.object.far=this.far,e.object.focus=this.focus,e.object.aspect=this.aspect,this.view!==null&&(e.object.view=Object.assign({},this.view)),e.object.filmGauge=this.filmGauge,e.object.filmOffset=this.filmOffset,e}}const zi=-90,Bi=1;class kf extends Ie{constructor(t,e,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ze(zi,Bi,t,e);i.layers=this.layers,this.add(i);const r=new Ze(zi,Bi,t,e);r.layers=this.layers,this.add(r);const o=new Ze(zi,Bi,t,e);o.layers=this.layers,this.add(o);const a=new Ze(zi,Bi,t,e);a.layers=this.layers,this.add(a);const c=new Ze(zi,Bi,t,e);c.layers=this.layers,this.add(c);const l=new Ze(zi,Bi,t,e);l.layers=this.layers,this.add(l)}updateCoordinateSystem(){const t=this.coordinateSystem,e=this.children.concat(),[n,i,r,o,a,c]=e;for(const l of e)this.remove(l);if(t===zn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),c.up.set(0,1,0),c.lookAt(0,0,-1);else if(t===ho)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),c.up.set(0,-1,0),c.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+t);for(const l of e)this.add(l),l.updateMatrixWorld()}update(t,e){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==t.coordinateSystem&&(this.coordinateSystem=t.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,c,l,h]=this.children,d=t.getRenderTarget(),u=t.getActiveCubeFace(),f=t.getActiveMipmapLevel(),g=t.xr.enabled;t.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,t.setRenderTarget(n,0,i),t.render(e,r),t.setRenderTarget(n,1,i),t.render(e,o),t.setRenderTarget(n,2,i),t.render(e,a),t.setRenderTarget(n,3,i),t.render(e,c),t.setRenderTarget(n,4,i),t.render(e,l),n.texture.generateMipmaps=v,t.setRenderTarget(n,5,i),t.render(e,h),t.setRenderTarget(d,u,f),t.xr.enabled=g,n.texture.needsPMREMUpdate=!0}}class ru extends ze{constructor(t,e,n,i,r,o,a,c,l,h){t=t!==void 0?t:[],e=e!==void 0?e:es,super(t,e,n,i,r,o,a,c,l,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(t){this.image=t}}class Vf extends Qe{constructor(t=1,e={}){super(t,t,e),this.isWebGLCubeRenderTarget=!0;const n={width:t,height:t,depth:1},i=[n,n,n,n,n,n];e.encoding!==void 0&&(Ns("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace."),e.colorSpace=e.encoding===yi?$t:on),this.texture=new ru(i,e.mapping,e.wrapS,e.wrapT,e.magFilter,e.minFilter,e.format,e.type,e.anisotropy,e.colorSpace),this.texture.isRenderTargetTexture=!0,this.texture.generateMipmaps=e.generateMipmaps!==void 0?e.generateMipmaps:!1,this.texture.minFilter=e.minFilter!==void 0?e.minFilter:Ke}fromEquirectangularTexture(t,e){this.texture.type=e.type,this.texture.colorSpace=e.colorSpace,this.texture.generateMipmaps=e.generateMipmaps,this.texture.minFilter=e.minFilter,this.texture.magFilter=e.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

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
			`},i=new At(5,5,5),r=new Le({name:"CubemapFromEquirect",uniforms:ss(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Ve,blending:Bn});r.uniforms.tEquirect.value=e;const o=new $(i,r),a=e.minFilter;return e.minFilter===Bs&&(e.minFilter=Ke),new kf(1,10,this).update(t,o),e.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(t,e,n,i){const r=t.getRenderTarget();for(let o=0;o<6;o++)t.setRenderTarget(this,o),t.clear(e,n,i);t.setRenderTarget(r)}}const Jo=new N,Xf=new N,qf=new Kt;class di{constructor(t=new N(1,0,0),e=0){this.isPlane=!0,this.normal=t,this.constant=e}set(t,e){return this.normal.copy(t),this.constant=e,this}setComponents(t,e,n,i){return this.normal.set(t,e,n),this.constant=i,this}setFromNormalAndCoplanarPoint(t,e){return this.normal.copy(t),this.constant=-e.dot(this.normal),this}setFromCoplanarPoints(t,e,n){const i=Jo.subVectors(n,e).cross(Xf.subVectors(t,e)).normalize();return this.setFromNormalAndCoplanarPoint(i,t),this}copy(t){return this.normal.copy(t.normal),this.constant=t.constant,this}normalize(){const t=1/this.normal.length();return this.normal.multiplyScalar(t),this.constant*=t,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(t){return this.normal.dot(t)+this.constant}distanceToSphere(t){return this.distanceToPoint(t.center)-t.radius}projectPoint(t,e){return e.copy(t).addScaledVector(this.normal,-this.distanceToPoint(t))}intersectLine(t,e){const n=t.delta(Jo),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(t.start)===0?e.copy(t.start):null;const r=-(t.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:e.copy(t.start).addScaledVector(n,r)}intersectsLine(t){const e=this.distanceToPoint(t.start),n=this.distanceToPoint(t.end);return e<0&&n>0||n<0&&e>0}intersectsBox(t){return t.intersectsPlane(this)}intersectsSphere(t){return t.intersectsPlane(this)}coplanarPoint(t){return t.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(t,e){const n=e||qf.getNormalMatrix(t),i=this.coplanarPoint(Jo).applyMatrix4(t),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(t){return this.constant-=t.dot(this.normal),this}equals(t){return t.normal.equals(this.normal)&&t.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ci=new Ys,xr=new N;class Ja{constructor(t=new di,e=new di,n=new di,i=new di,r=new di,o=new di){this.planes=[t,e,n,i,r,o]}set(t,e,n,i,r,o){const a=this.planes;return a[0].copy(t),a[1].copy(e),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(t){const e=this.planes;for(let n=0;n<6;n++)e[n].copy(t.planes[n]);return this}setFromProjectionMatrix(t,e=zn){const n=this.planes,i=t.elements,r=i[0],o=i[1],a=i[2],c=i[3],l=i[4],h=i[5],d=i[6],u=i[7],f=i[8],g=i[9],v=i[10],m=i[11],p=i[12],x=i[13],y=i[14],_=i[15];if(n[0].setComponents(c-r,u-l,m-f,_-p).normalize(),n[1].setComponents(c+r,u+l,m+f,_+p).normalize(),n[2].setComponents(c+o,u+h,m+g,_+x).normalize(),n[3].setComponents(c-o,u-h,m-g,_-x).normalize(),n[4].setComponents(c-a,u-d,m-v,_-y).normalize(),e===zn)n[5].setComponents(c+a,u+d,m+v,_+y).normalize();else if(e===ho)n[5].setComponents(a,d,v,y).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+e);return this}intersectsObject(t){if(t.boundingSphere!==void 0)t.boundingSphere===null&&t.computeBoundingSphere(),ci.copy(t.boundingSphere).applyMatrix4(t.matrixWorld);else{const e=t.geometry;e.boundingSphere===null&&e.computeBoundingSphere(),ci.copy(e.boundingSphere).applyMatrix4(t.matrixWorld)}return this.intersectsSphere(ci)}intersectsSprite(t){return ci.center.set(0,0,0),ci.radius=.7071067811865476,ci.applyMatrix4(t.matrixWorld),this.intersectsSphere(ci)}intersectsSphere(t){const e=this.planes,n=t.center,i=-t.radius;for(let r=0;r<6;r++)if(e[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(t){const e=this.planes;for(let n=0;n<6;n++){const i=e[n];if(xr.x=i.normal.x>0?t.max.x:t.min.x,xr.y=i.normal.y>0?t.max.y:t.min.y,xr.z=i.normal.z>0?t.max.z:t.min.z,i.distanceToPoint(xr)<0)return!1}return!0}containsPoint(t){const e=this.planes;for(let n=0;n<6;n++)if(e[n].distanceToPoint(t)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}function ou(){let s=null,t=!1,e=null,n=null;function i(r,o){e(r,o),n=s.requestAnimationFrame(i)}return{start:function(){t!==!0&&e!==null&&(n=s.requestAnimationFrame(i),t=!0)},stop:function(){s.cancelAnimationFrame(n),t=!1},setAnimationLoop:function(r){e=r},setContext:function(r){s=r}}}function Yf(s,t){const e=t.isWebGL2,n=new WeakMap;function i(l,h){const d=l.array,u=l.usage,f=d.byteLength,g=s.createBuffer();s.bindBuffer(h,g),s.bufferData(h,d,u),l.onUploadCallback();let v;if(d instanceof Float32Array)v=s.FLOAT;else if(d instanceof Uint16Array)if(l.isFloat16BufferAttribute)if(e)v=s.HALF_FLOAT;else throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");else v=s.UNSIGNED_SHORT;else if(d instanceof Int16Array)v=s.SHORT;else if(d instanceof Uint32Array)v=s.UNSIGNED_INT;else if(d instanceof Int32Array)v=s.INT;else if(d instanceof Int8Array)v=s.BYTE;else if(d instanceof Uint8Array)v=s.UNSIGNED_BYTE;else if(d instanceof Uint8ClampedArray)v=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+d);return{buffer:g,type:v,bytesPerElement:d.BYTES_PER_ELEMENT,version:l.version,size:f}}function r(l,h,d){const u=h.array,f=h._updateRange,g=h.updateRanges;if(s.bindBuffer(d,l),f.count===-1&&g.length===0&&s.bufferSubData(d,0,u),g.length!==0){for(let v=0,m=g.length;v<m;v++){const p=g[v];e?s.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u,p.start,p.count):s.bufferSubData(d,p.start*u.BYTES_PER_ELEMENT,u.subarray(p.start,p.start+p.count))}h.clearUpdateRanges()}f.count!==-1&&(e?s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u,f.offset,f.count):s.bufferSubData(d,f.offset*u.BYTES_PER_ELEMENT,u.subarray(f.offset,f.offset+f.count)),f.count=-1),h.onUploadCallback()}function o(l){return l.isInterleavedBufferAttribute&&(l=l.data),n.get(l)}function a(l){l.isInterleavedBufferAttribute&&(l=l.data);const h=n.get(l);h&&(s.deleteBuffer(h.buffer),n.delete(l))}function c(l,h){if(l.isGLBufferAttribute){const u=n.get(l);(!u||u.version<l.version)&&n.set(l,{buffer:l.buffer,type:l.type,bytesPerElement:l.elementSize,version:l.version});return}l.isInterleavedBufferAttribute&&(l=l.data);const d=n.get(l);if(d===void 0)n.set(l,i(l,h));else if(d.version<l.version){if(d.size!==l.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");r(d.buffer,l,h),d.version=l.version}}return{get:o,remove:a,update:c}}class Ne extends he{constructor(t=1,e=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:t,height:e,widthSegments:n,heightSegments:i};const r=t/2,o=e/2,a=Math.floor(n),c=Math.floor(i),l=a+1,h=c+1,d=t/a,u=e/c,f=[],g=[],v=[],m=[];for(let p=0;p<h;p++){const x=p*u-o;for(let y=0;y<l;y++){const _=y*d-r;g.push(_,-x,0),v.push(0,0,1),m.push(y/a),m.push(1-p/c)}}for(let p=0;p<c;p++)for(let x=0;x<a;x++){const y=x+l*p,_=x+l*(p+1),M=x+1+l*(p+1),S=x+1+l*p;f.push(y,_,S),f.push(_,M,S)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Ne(t.width,t.height,t.widthSegments,t.heightSegments)}}var jf=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,Kf=`#ifdef USE_ALPHAHASH
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
#endif`,Zf=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,Jf=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,Qf=`#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`,$f=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,tp=`#ifdef USE_AOMAP
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
#endif`,ep=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,np=`#ifdef USE_BATCHING
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
#endif`,ip=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( batchId );
#endif`,sp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,rp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,op=`float G_BlinnPhong_Implicit( ) {
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
} // validated`,ap=`#ifdef USE_IRIDESCENCE
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
#endif`,cp=`#ifdef USE_BUMPMAP
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
#endif`,lp=`#if NUM_CLIPPING_PLANES > 0
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
#endif`,hp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,up=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,dp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,fp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,pp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`,gp=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`,vp=`#define PI 3.141592653589793
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
} // validated`,xp=`#ifdef ENVMAP_TYPE_CUBE_UV
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
#endif`,yp=`vec3 transformedNormal = objectNormal;
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
#endif`,_p=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Mp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Sp=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,wp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Ep="gl_FragColor = linearToOutputTexel( gl_FragColor );",bp=`
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
}`,Tp=`#ifdef USE_ENVMAP
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
#endif`,Ap=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Cp=`#ifdef USE_ENVMAP
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
#endif`,Rp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Pp=`#ifdef USE_ENVMAP
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
#endif`,Lp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,Ip=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Dp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Np=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Up=`#ifdef USE_GRADIENTMAP
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
}`,Fp=`#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`,Op=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,zp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,Bp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Gp=`uniform bool receiveShadow;
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
#endif`,Hp=`#ifdef USE_ENVMAP
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
#endif`,Wp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,kp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,Vp=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Xp=`varying vec3 vViewPosition;
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
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,qp=`PhysicalMaterial material;
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
#endif`,Yp=`struct PhysicalMaterial {
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
}`,jp=`
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
#endif`,Kp=`#if defined( RE_IndirectDiffuse )
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
#endif`,Zp=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,Jp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,Qp=`#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,$p=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`,tm=`#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`,em=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,nm=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,im=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
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
#endif`,sm=`#if defined( USE_POINTS_UV )
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
#endif`,rm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,om=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,am=`#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,cm=`#ifdef USE_MORPHNORMALS
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
#endif`,lm=`#ifdef USE_MORPHTARGETS
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
#endif`,hm=`#ifdef USE_MORPHTARGETS
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
#endif`,um=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
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
vec3 nonPerturbedNormal = normal;`,dm=`#ifdef USE_NORMALMAP_OBJECTSPACE
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
#endif`,fm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,pm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,mm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,gm=`#ifdef USE_NORMALMAP
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
#endif`,vm=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,xm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,ym=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,_m=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Mm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Sm=`vec3 packNormalToRGB( const in vec3 normal ) {
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
}`,wm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Em=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,bm=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Tm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Am=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Cm=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,Rm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Pm=`#if NUM_SPOT_LIGHT_COORDS > 0
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
#endif`,Lm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
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
#endif`,Im=`float getShadowMask() {
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
}`,Dm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Nm=`#ifdef USE_SKINNING
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
#endif`,Um=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Fm=`#ifdef USE_SKINNING
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
#endif`,Om=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,zm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Bm=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Gm=`#ifndef saturate
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
vec3 CustomToneMapping( vec3 color ) { return color; }`,Hm=`#ifdef USE_TRANSMISSION
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
#endif`,Wm=`#ifdef USE_TRANSMISSION
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
#endif`,km=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Vm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,Xm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
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
#endif`,qm=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const Ym=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,jm=`uniform sampler2D t2D;
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
}`,Km=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Zm=`#ifdef ENVMAP_TYPE_CUBE
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
}`,Jm=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,Qm=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,$m=`#include <common>
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
}`,t0=`#if DEPTH_PACKING == 3200
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
}`,e0=`#define DISTANCE
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
}`,n0=`#define DISTANCE
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
}`,i0=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,s0=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,r0=`uniform float scale;
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
}`,o0=`uniform vec3 diffuse;
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
}`,a0=`#include <common>
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
}`,c0=`uniform vec3 diffuse;
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
}`,l0=`#define LAMBERT
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
}`,h0=`#define LAMBERT
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
}`,u0=`#define MATCAP
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
}`,d0=`#define MATCAP
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
}`,f0=`#define NORMAL
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
}`,p0=`#define NORMAL
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
}`,m0=`#define PHONG
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
}`,g0=`#define PHONG
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
}`,v0=`#define STANDARD
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
}`,x0=`#define STANDARD
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
}`,y0=`#define TOON
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
}`,_0=`#define TOON
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
}`,M0=`uniform float size;
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
}`,S0=`uniform vec3 diffuse;
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
}`,w0=`#include <common>
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
}`,E0=`uniform vec3 color;
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
}`,b0=`uniform float rotation;
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
}`,T0=`uniform vec3 diffuse;
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
}`,Xt={alphahash_fragment:jf,alphahash_pars_fragment:Kf,alphamap_fragment:Zf,alphamap_pars_fragment:Jf,alphatest_fragment:Qf,alphatest_pars_fragment:$f,aomap_fragment:tp,aomap_pars_fragment:ep,batching_pars_vertex:np,batching_vertex:ip,begin_vertex:sp,beginnormal_vertex:rp,bsdfs:op,iridescence_fragment:ap,bumpmap_pars_fragment:cp,clipping_planes_fragment:lp,clipping_planes_pars_fragment:hp,clipping_planes_pars_vertex:up,clipping_planes_vertex:dp,color_fragment:fp,color_pars_fragment:pp,color_pars_vertex:mp,color_vertex:gp,common:vp,cube_uv_reflection_fragment:xp,defaultnormal_vertex:yp,displacementmap_pars_vertex:_p,displacementmap_vertex:Mp,emissivemap_fragment:Sp,emissivemap_pars_fragment:wp,colorspace_fragment:Ep,colorspace_pars_fragment:bp,envmap_fragment:Tp,envmap_common_pars_fragment:Ap,envmap_pars_fragment:Cp,envmap_pars_vertex:Rp,envmap_physical_pars_fragment:Hp,envmap_vertex:Pp,fog_vertex:Lp,fog_pars_vertex:Ip,fog_fragment:Dp,fog_pars_fragment:Np,gradientmap_pars_fragment:Up,lightmap_fragment:Fp,lightmap_pars_fragment:Op,lights_lambert_fragment:zp,lights_lambert_pars_fragment:Bp,lights_pars_begin:Gp,lights_toon_fragment:Wp,lights_toon_pars_fragment:kp,lights_phong_fragment:Vp,lights_phong_pars_fragment:Xp,lights_physical_fragment:qp,lights_physical_pars_fragment:Yp,lights_fragment_begin:jp,lights_fragment_maps:Kp,lights_fragment_end:Zp,logdepthbuf_fragment:Jp,logdepthbuf_pars_fragment:Qp,logdepthbuf_pars_vertex:$p,logdepthbuf_vertex:tm,map_fragment:em,map_pars_fragment:nm,map_particle_fragment:im,map_particle_pars_fragment:sm,metalnessmap_fragment:rm,metalnessmap_pars_fragment:om,morphcolor_vertex:am,morphnormal_vertex:cm,morphtarget_pars_vertex:lm,morphtarget_vertex:hm,normal_fragment_begin:um,normal_fragment_maps:dm,normal_pars_fragment:fm,normal_pars_vertex:pm,normal_vertex:mm,normalmap_pars_fragment:gm,clearcoat_normal_fragment_begin:vm,clearcoat_normal_fragment_maps:xm,clearcoat_pars_fragment:ym,iridescence_pars_fragment:_m,opaque_fragment:Mm,packing:Sm,premultiplied_alpha_fragment:wm,project_vertex:Em,dithering_fragment:bm,dithering_pars_fragment:Tm,roughnessmap_fragment:Am,roughnessmap_pars_fragment:Cm,shadowmap_pars_fragment:Rm,shadowmap_pars_vertex:Pm,shadowmap_vertex:Lm,shadowmask_pars_fragment:Im,skinbase_vertex:Dm,skinning_pars_vertex:Nm,skinning_vertex:Um,skinnormal_vertex:Fm,specularmap_fragment:Om,specularmap_pars_fragment:zm,tonemapping_fragment:Bm,tonemapping_pars_fragment:Gm,transmission_fragment:Hm,transmission_pars_fragment:Wm,uv_pars_fragment:km,uv_pars_vertex:Vm,uv_vertex:Xm,worldpos_vertex:qm,background_vert:Ym,background_frag:jm,backgroundCube_vert:Km,backgroundCube_frag:Zm,cube_vert:Jm,cube_frag:Qm,depth_vert:$m,depth_frag:t0,distanceRGBA_vert:e0,distanceRGBA_frag:n0,equirect_vert:i0,equirect_frag:s0,linedashed_vert:r0,linedashed_frag:o0,meshbasic_vert:a0,meshbasic_frag:c0,meshlambert_vert:l0,meshlambert_frag:h0,meshmatcap_vert:u0,meshmatcap_frag:d0,meshnormal_vert:f0,meshnormal_frag:p0,meshphong_vert:m0,meshphong_frag:g0,meshphysical_vert:v0,meshphysical_frag:x0,meshtoon_vert:y0,meshtoon_frag:_0,points_vert:M0,points_frag:S0,shadow_vert:w0,shadow_frag:E0,sprite_vert:b0,sprite_frag:T0},ft={common:{diffuse:{value:new Ft(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Kt}},envmap:{envMap:{value:null},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Kt}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Kt}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Kt},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Kt},normalScale:{value:new nt(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Kt},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Kt}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Kt}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Kt}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Ft(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Ft(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0},uvTransform:{value:new Kt}},sprite:{diffuse:{value:new Ft(16777215)},opacity:{value:1},center:{value:new nt(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Kt},alphaMap:{value:null},alphaMapTransform:{value:new Kt},alphaTest:{value:0}}},Sn={basic:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.fog]),vertexShader:Xt.meshbasic_vert,fragmentShader:Xt.meshbasic_frag},lambert:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Xt.meshlambert_vert,fragmentShader:Xt.meshlambert_frag},phong:{uniforms:ke([ft.common,ft.specularmap,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,ft.lights,{emissive:{value:new Ft(0)},specular:{value:new Ft(1118481)},shininess:{value:30}}]),vertexShader:Xt.meshphong_vert,fragmentShader:Xt.meshphong_frag},standard:{uniforms:ke([ft.common,ft.envmap,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.roughnessmap,ft.metalnessmap,ft.fog,ft.lights,{emissive:{value:new Ft(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag},toon:{uniforms:ke([ft.common,ft.aomap,ft.lightmap,ft.emissivemap,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.gradientmap,ft.fog,ft.lights,{emissive:{value:new Ft(0)}}]),vertexShader:Xt.meshtoon_vert,fragmentShader:Xt.meshtoon_frag},matcap:{uniforms:ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,ft.fog,{matcap:{value:null}}]),vertexShader:Xt.meshmatcap_vert,fragmentShader:Xt.meshmatcap_frag},points:{uniforms:ke([ft.points,ft.fog]),vertexShader:Xt.points_vert,fragmentShader:Xt.points_frag},dashed:{uniforms:ke([ft.common,ft.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:Xt.linedashed_vert,fragmentShader:Xt.linedashed_frag},depth:{uniforms:ke([ft.common,ft.displacementmap]),vertexShader:Xt.depth_vert,fragmentShader:Xt.depth_frag},normal:{uniforms:ke([ft.common,ft.bumpmap,ft.normalmap,ft.displacementmap,{opacity:{value:1}}]),vertexShader:Xt.meshnormal_vert,fragmentShader:Xt.meshnormal_frag},sprite:{uniforms:ke([ft.sprite,ft.fog]),vertexShader:Xt.sprite_vert,fragmentShader:Xt.sprite_frag},background:{uniforms:{uvTransform:{value:new Kt},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:Xt.background_vert,fragmentShader:Xt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1}},vertexShader:Xt.backgroundCube_vert,fragmentShader:Xt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:Xt.cube_vert,fragmentShader:Xt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:Xt.equirect_vert,fragmentShader:Xt.equirect_frag},distanceRGBA:{uniforms:ke([ft.common,ft.displacementmap,{referencePosition:{value:new N},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:Xt.distanceRGBA_vert,fragmentShader:Xt.distanceRGBA_frag},shadow:{uniforms:ke([ft.lights,ft.fog,{color:{value:new Ft(0)},opacity:{value:1}}]),vertexShader:Xt.shadow_vert,fragmentShader:Xt.shadow_frag}};Sn.physical={uniforms:ke([Sn.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Kt},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Kt},clearcoatNormalScale:{value:new nt(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Kt},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Kt},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Kt},sheen:{value:0},sheenColor:{value:new Ft(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Kt},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Kt},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Kt},transmissionSamplerSize:{value:new nt},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Kt},attenuationDistance:{value:0},attenuationColor:{value:new Ft(0)},specularColor:{value:new Ft(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Kt},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Kt},anisotropyVector:{value:new nt},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Kt}}]),vertexShader:Xt.meshphysical_vert,fragmentShader:Xt.meshphysical_frag};const yr={r:0,b:0,g:0};function A0(s,t,e,n,i,r,o){const a=new Ft(0);let c=r===!0?0:1,l,h,d=null,u=0,f=null;function g(m,p){let x=!1,y=p.isScene===!0?p.background:null;y&&y.isTexture&&(y=(p.backgroundBlurriness>0?e:t).get(y)),y===null?v(a,c):y&&y.isColor&&(v(y,1),x=!0);const _=s.xr.getEnvironmentBlendMode();_==="additive"?n.buffers.color.setClear(0,0,0,1,o):_==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||x)&&s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil),y&&(y.isCubeTexture||y.mapping===mo)?(h===void 0&&(h=new $(new At(1,1,1),new Le({name:"BackgroundCubeMaterial",uniforms:ss(Sn.backgroundCube.uniforms),vertexShader:Sn.backgroundCube.vertexShader,fragmentShader:Sn.backgroundCube.fragmentShader,side:Ve,depthTest:!1,depthWrite:!1,fog:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(M,S,b){this.matrixWorld.copyPosition(b.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(h)),h.material.uniforms.envMap.value=y,h.material.uniforms.flipEnvMap.value=y.isCubeTexture&&y.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=p.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,h.material.toneMapped=se.getTransfer(y.colorSpace)!==le,(d!==y||u!==y.version||f!==s.toneMapping)&&(h.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),h.layers.enableAll(),m.unshift(h,h.geometry,h.material,0,0,null)):y&&y.isTexture&&(l===void 0&&(l=new $(new Ne(2,2),new Le({name:"BackgroundMaterial",uniforms:ss(Sn.background.uniforms),vertexShader:Sn.background.vertexShader,fragmentShader:Sn.background.fragmentShader,side:ei,depthTest:!1,depthWrite:!1,fog:!1})),l.geometry.deleteAttribute("normal"),Object.defineProperty(l.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(l)),l.material.uniforms.t2D.value=y,l.material.uniforms.backgroundIntensity.value=p.backgroundIntensity,l.material.toneMapped=se.getTransfer(y.colorSpace)!==le,y.matrixAutoUpdate===!0&&y.updateMatrix(),l.material.uniforms.uvTransform.value.copy(y.matrix),(d!==y||u!==y.version||f!==s.toneMapping)&&(l.material.needsUpdate=!0,d=y,u=y.version,f=s.toneMapping),l.layers.enableAll(),m.unshift(l,l.geometry,l.material,0,0,null))}function v(m,p){m.getRGB(yr,iu(s)),n.buffers.color.setClear(yr.r,yr.g,yr.b,p,o)}return{getClearColor:function(){return a},setClearColor:function(m,p=1){a.set(m),c=p,v(a,c)},getClearAlpha:function(){return c},setClearAlpha:function(m){c=m,v(a,c)},render:g}}function C0(s,t,e,n){const i=s.getParameter(s.MAX_VERTEX_ATTRIBS),r=n.isWebGL2?null:t.get("OES_vertex_array_object"),o=n.isWebGL2||r!==null,a={},c=m(null);let l=c,h=!1;function d(C,I,U,Y,G){let k=!1;if(o){const Q=v(Y,U,I);l!==Q&&(l=Q,f(l.object)),k=p(C,Y,U,G),k&&x(C,Y,U,G)}else{const Q=I.wireframe===!0;(l.geometry!==Y.id||l.program!==U.id||l.wireframe!==Q)&&(l.geometry=Y.id,l.program=U.id,l.wireframe=Q,k=!0)}G!==null&&e.update(G,s.ELEMENT_ARRAY_BUFFER),(k||h)&&(h=!1,L(C,I,U,Y),G!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(G).buffer))}function u(){return n.isWebGL2?s.createVertexArray():r.createVertexArrayOES()}function f(C){return n.isWebGL2?s.bindVertexArray(C):r.bindVertexArrayOES(C)}function g(C){return n.isWebGL2?s.deleteVertexArray(C):r.deleteVertexArrayOES(C)}function v(C,I,U){const Y=U.wireframe===!0;let G=a[C.id];G===void 0&&(G={},a[C.id]=G);let k=G[I.id];k===void 0&&(k={},G[I.id]=k);let Q=k[Y];return Q===void 0&&(Q=m(u()),k[Y]=Q),Q}function m(C){const I=[],U=[],Y=[];for(let G=0;G<i;G++)I[G]=0,U[G]=0,Y[G]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:I,enabledAttributes:U,attributeDivisors:Y,object:C,attributes:{},index:null}}function p(C,I,U,Y){const G=l.attributes,k=I.attributes;let Q=0;const V=U.getAttributes();for(const X in V)if(V[X].location>=0){const et=G[X];let ut=k[X];if(ut===void 0&&(X==="instanceMatrix"&&C.instanceMatrix&&(ut=C.instanceMatrix),X==="instanceColor"&&C.instanceColor&&(ut=C.instanceColor)),et===void 0||et.attribute!==ut||ut&&et.data!==ut.data)return!0;Q++}return l.attributesNum!==Q||l.index!==Y}function x(C,I,U,Y){const G={},k=I.attributes;let Q=0;const V=U.getAttributes();for(const X in V)if(V[X].location>=0){let et=k[X];et===void 0&&(X==="instanceMatrix"&&C.instanceMatrix&&(et=C.instanceMatrix),X==="instanceColor"&&C.instanceColor&&(et=C.instanceColor));const ut={};ut.attribute=et,et&&et.data&&(ut.data=et.data),G[X]=ut,Q++}l.attributes=G,l.attributesNum=Q,l.index=Y}function y(){const C=l.newAttributes;for(let I=0,U=C.length;I<U;I++)C[I]=0}function _(C){M(C,0)}function M(C,I){const U=l.newAttributes,Y=l.enabledAttributes,G=l.attributeDivisors;U[C]=1,Y[C]===0&&(s.enableVertexAttribArray(C),Y[C]=1),G[C]!==I&&((n.isWebGL2?s:t.get("ANGLE_instanced_arrays"))[n.isWebGL2?"vertexAttribDivisor":"vertexAttribDivisorANGLE"](C,I),G[C]=I)}function S(){const C=l.newAttributes,I=l.enabledAttributes;for(let U=0,Y=I.length;U<Y;U++)I[U]!==C[U]&&(s.disableVertexAttribArray(U),I[U]=0)}function b(C,I,U,Y,G,k,Q){Q===!0?s.vertexAttribIPointer(C,I,U,G,k):s.vertexAttribPointer(C,I,U,Y,G,k)}function L(C,I,U,Y){if(n.isWebGL2===!1&&(C.isInstancedMesh||Y.isInstancedBufferGeometry)&&t.get("ANGLE_instanced_arrays")===null)return;y();const G=Y.attributes,k=U.getAttributes(),Q=I.defaultAttributeValues;for(const V in k){const X=k[V];if(X.location>=0){let q=G[V];if(q===void 0&&(V==="instanceMatrix"&&C.instanceMatrix&&(q=C.instanceMatrix),V==="instanceColor"&&C.instanceColor&&(q=C.instanceColor)),q!==void 0){const et=q.normalized,ut=q.itemSize,pt=e.get(q);if(pt===void 0)continue;const it=pt.buffer,vt=pt.type,St=pt.bytesPerElement,mt=n.isWebGL2===!0&&(vt===s.INT||vt===s.UNSIGNED_INT||q.gpuType===Bh);if(q.isInterleavedBufferAttribute){const ht=q.data,F=ht.stride,at=q.offset;if(ht.isInstancedInterleavedBuffer){for(let J=0;J<X.locationSize;J++)M(X.location+J,ht.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=ht.meshPerAttribute*ht.count)}else for(let J=0;J<X.locationSize;J++)_(X.location+J);s.bindBuffer(s.ARRAY_BUFFER,it);for(let J=0;J<X.locationSize;J++)b(X.location+J,ut/X.locationSize,vt,et,F*St,(at+ut/X.locationSize*J)*St,mt)}else{if(q.isInstancedBufferAttribute){for(let ht=0;ht<X.locationSize;ht++)M(X.location+ht,q.meshPerAttribute);C.isInstancedMesh!==!0&&Y._maxInstanceCount===void 0&&(Y._maxInstanceCount=q.meshPerAttribute*q.count)}else for(let ht=0;ht<X.locationSize;ht++)_(X.location+ht);s.bindBuffer(s.ARRAY_BUFFER,it);for(let ht=0;ht<X.locationSize;ht++)b(X.location+ht,ut/X.locationSize,vt,et,ut*St,ut/X.locationSize*ht*St,mt)}}else if(Q!==void 0){const et=Q[V];if(et!==void 0)switch(et.length){case 2:s.vertexAttrib2fv(X.location,et);break;case 3:s.vertexAttrib3fv(X.location,et);break;case 4:s.vertexAttrib4fv(X.location,et);break;default:s.vertexAttrib1fv(X.location,et)}}}}S()}function w(){D();for(const C in a){const I=a[C];for(const U in I){const Y=I[U];for(const G in Y)g(Y[G].object),delete Y[G];delete I[U]}delete a[C]}}function T(C){if(a[C.id]===void 0)return;const I=a[C.id];for(const U in I){const Y=I[U];for(const G in Y)g(Y[G].object),delete Y[G];delete I[U]}delete a[C.id]}function O(C){for(const I in a){const U=a[I];if(U[C.id]===void 0)continue;const Y=U[C.id];for(const G in Y)g(Y[G].object),delete Y[G];delete U[C.id]}}function D(){z(),h=!0,l!==c&&(l=c,f(l.object))}function z(){c.geometry=null,c.program=null,c.wireframe=!1}return{setup:d,reset:D,resetDefaultState:z,dispose:w,releaseStatesOfGeometry:T,releaseStatesOfProgram:O,initAttributes:y,enableAttribute:_,disableUnusedAttributes:S}}function R0(s,t,e,n){const i=n.isWebGL2;let r;function o(h){r=h}function a(h,d){s.drawArrays(r,h,d),e.update(d,r,1)}function c(h,d,u){if(u===0)return;let f,g;if(i)f=s,g="drawArraysInstanced";else if(f=t.get("ANGLE_instanced_arrays"),g="drawArraysInstancedANGLE",f===null){console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}f[g](r,h,d,u),e.update(d,r,u)}function l(h,d,u){if(u===0)return;const f=t.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<u;g++)this.render(h[g],d[g]);else{f.multiDrawArraysWEBGL(r,h,0,d,0,u);let g=0;for(let v=0;v<u;v++)g+=d[v];e.update(g,r,1)}}this.setMode=o,this.render=a,this.renderInstances=c,this.renderMultiDraw=l}function P0(s,t,e){let n;function i(){if(n!==void 0)return n;if(t.has("EXT_texture_filter_anisotropic")===!0){const b=t.get("EXT_texture_filter_anisotropic");n=s.getParameter(b.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else n=0;return n}function r(b){if(b==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";b="mediump"}return b==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}const o=typeof WebGL2RenderingContext<"u"&&s.constructor.name==="WebGL2RenderingContext";let a=e.precision!==void 0?e.precision:"highp";const c=r(a);c!==a&&(console.warn("THREE.WebGLRenderer:",a,"not supported, using",c,"instead."),a=c);const l=o||t.has("WEBGL_draw_buffers"),h=e.logarithmicDepthBuffer===!0,d=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),u=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),f=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),v=s.getParameter(s.MAX_VERTEX_ATTRIBS),m=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),p=s.getParameter(s.MAX_VARYING_VECTORS),x=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),y=u>0,_=o||t.has("OES_texture_float"),M=y&&_,S=o?s.getParameter(s.MAX_SAMPLES):0;return{isWebGL2:o,drawBuffers:l,getMaxAnisotropy:i,getMaxPrecision:r,precision:a,logarithmicDepthBuffer:h,maxTextures:d,maxVertexTextures:u,maxTextureSize:f,maxCubemapSize:g,maxAttributes:v,maxVertexUniforms:m,maxVaryings:p,maxFragmentUniforms:x,vertexTextures:y,floatFragmentTextures:_,floatVertexTextures:M,maxSamples:S}}function L0(s){const t=this;let e=null,n=0,i=!1,r=!1;const o=new di,a=new Kt,c={value:null,needsUpdate:!1};this.uniform=c,this.numPlanes=0,this.numIntersection=0,this.init=function(d,u){const f=d.length!==0||u||n!==0||i;return i=u,n=d.length,f},this.beginShadows=function(){r=!0,h(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,u){e=h(d,u,0)},this.setState=function(d,u,f){const g=d.clippingPlanes,v=d.clipIntersection,m=d.clipShadows,p=s.get(d);if(!i||g===null||g.length===0||r&&!m)r?h(null):l();else{const x=r?0:n,y=x*4;let _=p.clippingState||null;c.value=_,_=h(g,u,y,f);for(let M=0;M!==y;++M)_[M]=e[M];p.clippingState=_,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=x}};function l(){c.value!==e&&(c.value=e,c.needsUpdate=n>0),t.numPlanes=n,t.numIntersection=0}function h(d,u,f,g){const v=d!==null?d.length:0;let m=null;if(v!==0){if(m=c.value,g!==!0||m===null){const p=f+v*4,x=u.matrixWorldInverse;a.getNormalMatrix(x),(m===null||m.length<p)&&(m=new Float32Array(p));for(let y=0,_=f;y!==v;++y,_+=4)o.copy(d[y]).applyMatrix4(x,a),o.normal.toArray(m,_),m[_+3]=o.constant}c.value=m,c.needsUpdate=!0}return t.numPlanes=v,t.numIntersection=0,m}}function I0(s){let t=new WeakMap;function e(o,a){return a===Ia?o.mapping=es:a===Da&&(o.mapping=ns),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Ia||a===Da)if(t.has(o)){const c=t.get(o).texture;return e(c,o.mapping)}else{const c=o.image;if(c&&c.height>0){const l=new Vf(c.height/2);return l.fromEquirectangularTexture(s,o),t.set(o,l),o.addEventListener("dispose",i),e(l.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const c=t.get(a);c!==void 0&&(t.delete(a),c.dispose())}function r(){t=new WeakMap}return{get:n,dispose:r}}class Qa extends su{constructor(t=-1,e=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=t,this.right=e,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(t,e){return super.copy(t,e),this.left=t.left,this.right=t.right,this.top=t.top,this.bottom=t.bottom,this.near=t.near,this.far=t.far,this.zoom=t.zoom,this.view=t.view===null?null:Object.assign({},t.view),this}setViewOffset(t,e,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=t,this.view.fullHeight=e,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const t=(this.right-this.left)/(2*this.zoom),e=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-t,o=n+t,a=i+e,c=i-e;if(this.view!==null&&this.view.enabled){const l=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=l*this.view.offsetX,o=r+l*this.view.width,a-=h*this.view.offsetY,c=a-h*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,c,this.near,this.far,this.coordinateSystem),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(t){const e=super.toJSON(t);return e.object.zoom=this.zoom,e.object.left=this.left,e.object.right=this.right,e.object.top=this.top,e.object.bottom=this.bottom,e.object.near=this.near,e.object.far=this.far,this.view!==null&&(e.object.view=Object.assign({},this.view)),e}}const Ki=4,gl=[.125,.215,.35,.446,.526,.582],mi=20,Qo=new Qa,vl=new Ft;let $o=null,ta=0,ea=0;const fi=(1+Math.sqrt(5))/2,Gi=1/fi,xl=[new N(1,1,1),new N(-1,1,1),new N(1,1,-1),new N(-1,1,-1),new N(0,fi,Gi),new N(0,fi,-Gi),new N(Gi,0,fi),new N(-Gi,0,fi),new N(fi,Gi,0),new N(-fi,Gi,0)];class za{constructor(t){this._renderer=t,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(t,e=0,n=.1,i=100){$o=this._renderer.getRenderTarget(),ta=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel(),this._setSize(256);const r=this._allocateTargets();return r.depthBuffer=!0,this._sceneToCubeUV(t,n,i,r),e>0&&this._blur(r,0,0,e),this._applyPMREM(r),this._cleanup(r),r}fromEquirectangular(t,e=null){return this._fromTexture(t,e)}fromCubemap(t,e=null){return this._fromTexture(t,e)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Ml(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=_l(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(t){this._lodMax=Math.floor(Math.log2(t)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let t=0;t<this._lodPlanes.length;t++)this._lodPlanes[t].dispose()}_cleanup(t){this._renderer.setRenderTarget($o,ta,ea),t.scissorTest=!1,_r(t,0,0,t.width,t.height)}_fromTexture(t,e){t.mapping===es||t.mapping===ns?this._setSize(t.image.length===0?16:t.image[0].width||t.image[0].image.width):this._setSize(t.image.width/4),$o=this._renderer.getRenderTarget(),ta=this._renderer.getActiveCubeFace(),ea=this._renderer.getActiveMipmapLevel();const n=e||this._allocateTargets();return this._textureToCubeUV(t,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const t=3*Math.max(this._cubeSize,112),e=4*this._cubeSize,n={magFilter:Ke,minFilter:Ke,generateMipmaps:!1,type:mn,format:fn,colorSpace:Hn,depthBuffer:!1},i=yl(t,e,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==t||this._pingPongRenderTarget.height!==e){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=yl(t,e,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=D0(r)),this._blurMaterial=N0(r,t,e)}return i}_compileMaterial(t){const e=new $(this._lodPlanes[0],t);this._renderer.compile(e,Qo)}_sceneToCubeUV(t,e,n,i){const a=new Ze(90,1,e,n),c=[1,-1,1,1,1,1],l=[1,1,1,-1,-1,-1],h=this._renderer,d=h.autoClear,u=h.toneMapping;h.getClearColor(vl),h.toneMapping=$n,h.autoClear=!1;const f=new ls({name:"PMREM.Background",side:Ve,depthWrite:!1,depthTest:!1}),g=new $(new At,f);let v=!1;const m=t.background;m?m.isColor&&(f.color.copy(m),t.background=null,v=!0):(f.color.copy(vl),v=!0);for(let p=0;p<6;p++){const x=p%3;x===0?(a.up.set(0,c[p],0),a.lookAt(l[p],0,0)):x===1?(a.up.set(0,0,c[p]),a.lookAt(0,l[p],0)):(a.up.set(0,c[p],0),a.lookAt(0,0,l[p]));const y=this._cubeSize;_r(i,x*y,p>2?y:0,y,y),h.setRenderTarget(i),v&&h.render(g,a),h.render(t,a)}g.geometry.dispose(),g.material.dispose(),h.toneMapping=u,h.autoClear=d,t.background=m}_textureToCubeUV(t,e){const n=this._renderer,i=t.mapping===es||t.mapping===ns;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Ml()),this._cubemapMaterial.uniforms.flipEnvMap.value=t.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=_l());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new $(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=t;const c=this._cubeSize;_r(e,0,0,3*c,2*c),n.setRenderTarget(e),n.render(o,Qo)}_applyPMREM(t){const e=this._renderer,n=e.autoClear;e.autoClear=!1;for(let i=1;i<this._lodPlanes.length;i++){const r=Math.sqrt(this._sigmas[i]*this._sigmas[i]-this._sigmas[i-1]*this._sigmas[i-1]),o=xl[(i-1)%xl.length];this._blur(t,i-1,i,r,o)}e.autoClear=n}_blur(t,e,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(t,o,e,n,i,"latitudinal",r),this._halfBlur(o,t,n,n,i,"longitudinal",r)}_halfBlur(t,e,n,i,r,o,a){const c=this._renderer,l=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const h=3,d=new $(this._lodPlanes[i],l),u=l.uniforms,f=this._sizeLods[n]-1,g=isFinite(r)?Math.PI/(2*f):2*Math.PI/(2*mi-1),v=r/g,m=isFinite(r)?1+Math.floor(h*v):mi;m>mi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${mi}`);const p=[];let x=0;for(let b=0;b<mi;++b){const L=b/v,w=Math.exp(-L*L/2);p.push(w),b===0?x+=w:b<m&&(x+=2*w)}for(let b=0;b<p.length;b++)p[b]=p[b]/x;u.envMap.value=t.texture,u.samples.value=m,u.weights.value=p,u.latitudinal.value=o==="latitudinal",a&&(u.poleAxis.value=a);const{_lodMax:y}=this;u.dTheta.value=g,u.mipInt.value=y-n;const _=this._sizeLods[i],M=3*_*(i>y-Ki?i-y+Ki:0),S=4*(this._cubeSize-_);_r(e,M,S,3*_,2*_),c.setRenderTarget(e),c.render(d,Qo)}}function D0(s){const t=[],e=[],n=[];let i=s;const r=s-Ki+1+gl.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);e.push(a);let c=1/a;o>s-Ki?c=gl[o-s+Ki-1]:o===0&&(c=0),n.push(c);const l=1/(a-2),h=-l,d=1+l,u=[h,h,d,h,d,d,h,h,d,d,h,d],f=6,g=6,v=3,m=2,p=1,x=new Float32Array(v*g*f),y=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let S=0;S<f;S++){const b=S%3*2/3-1,L=S>2?0:-1,w=[b,L,0,b+2/3,L,0,b+2/3,L+1,0,b,L,0,b+2/3,L+1,0,b,L+1,0];x.set(w,v*g*S),y.set(u,m*g*S);const T=[S,S,S,S,S,S];_.set(T,p*g*S)}const M=new he;M.setAttribute("position",new ee(x,v)),M.setAttribute("uv",new ee(y,m)),M.setAttribute("faceIndex",new ee(_,p)),t.push(M),i>Ki&&i--}return{lodPlanes:t,sizeLods:e,sigmas:n}}function yl(s,t,e){const n=new Qe(s,t,e);return n.texture.mapping=mo,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function _r(s,t,e,n,i){s.viewport.set(t,e,n,i),s.scissor.set(t,e,n,i)}function N0(s,t,e){const n=new Float32Array(mi),i=new N(0,1,0);return new Le({name:"SphericalGaussianBlur",defines:{n:mi,CUBEUV_TEXEL_WIDTH:1/t,CUBEUV_TEXEL_HEIGHT:1/e,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:$a(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function _l(){return new Le({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:$a(),fragmentShader:`

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
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function Ml(){return new Le({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:$a(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Bn,depthTest:!1,depthWrite:!1})}function $a(){return`

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
	`}function U0(s){let t=new WeakMap,e=null;function n(a){if(a&&a.isTexture){const c=a.mapping,l=c===Ia||c===Da,h=c===es||c===ns;if(l||h)if(a.isRenderTargetTexture&&a.needsPMREMUpdate===!0){a.needsPMREMUpdate=!1;let d=t.get(a);return e===null&&(e=new za(s)),d=l?e.fromEquirectangular(a,d):e.fromCubemap(a,d),t.set(a,d),d.texture}else{if(t.has(a))return t.get(a).texture;{const d=a.image;if(l&&d&&d.height>0||h&&d&&i(d)){e===null&&(e=new za(s));const u=l?e.fromEquirectangular(a):e.fromCubemap(a);return t.set(a,u),a.addEventListener("dispose",r),u.texture}else return null}}}return a}function i(a){let c=0;const l=6;for(let h=0;h<l;h++)a[h]!==void 0&&c++;return c===l}function r(a){const c=a.target;c.removeEventListener("dispose",r);const l=t.get(c);l!==void 0&&(t.delete(c),l.dispose())}function o(){t=new WeakMap,e!==null&&(e.dispose(),e=null)}return{get:n,dispose:o}}function F0(s){const t={};function e(n){if(t[n]!==void 0)return t[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return t[n]=i,i}return{has:function(n){return e(n)!==null},init:function(n){n.isWebGL2?(e("EXT_color_buffer_float"),e("WEBGL_clip_cull_distance")):(e("WEBGL_depth_texture"),e("OES_texture_float"),e("OES_texture_half_float"),e("OES_texture_half_float_linear"),e("OES_standard_derivatives"),e("OES_element_index_uint"),e("OES_vertex_array_object"),e("ANGLE_instanced_arrays")),e("OES_texture_float_linear"),e("EXT_color_buffer_half_float"),e("WEBGL_multisampled_render_to_texture")},get:function(n){const i=e(n);return i===null&&console.warn("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function O0(s,t,e,n){const i={},r=new WeakMap;function o(d){const u=d.target;u.index!==null&&t.remove(u.index);for(const g in u.attributes)t.remove(u.attributes[g]);for(const g in u.morphAttributes){const v=u.morphAttributes[g];for(let m=0,p=v.length;m<p;m++)t.remove(v[m])}u.removeEventListener("dispose",o),delete i[u.id];const f=r.get(u);f&&(t.remove(f),r.delete(u)),n.releaseStatesOfGeometry(u),u.isInstancedBufferGeometry===!0&&delete u._maxInstanceCount,e.memory.geometries--}function a(d,u){return i[u.id]===!0||(u.addEventListener("dispose",o),i[u.id]=!0,e.memory.geometries++),u}function c(d){const u=d.attributes;for(const g in u)t.update(u[g],s.ARRAY_BUFFER);const f=d.morphAttributes;for(const g in f){const v=f[g];for(let m=0,p=v.length;m<p;m++)t.update(v[m],s.ARRAY_BUFFER)}}function l(d){const u=[],f=d.index,g=d.attributes.position;let v=0;if(f!==null){const x=f.array;v=f.version;for(let y=0,_=x.length;y<_;y+=3){const M=x[y+0],S=x[y+1],b=x[y+2];u.push(M,S,S,b,b,M)}}else if(g!==void 0){const x=g.array;v=g.version;for(let y=0,_=x.length/3-1;y<_;y+=3){const M=y+0,S=y+1,b=y+2;u.push(M,S,S,b,b,M)}}else return;const m=new(Kh(u)?nu:eu)(u,1);m.version=v;const p=r.get(d);p&&t.remove(p),r.set(d,m)}function h(d){const u=r.get(d);if(u){const f=d.index;f!==null&&u.version<f.version&&l(d)}else l(d);return r.get(d)}return{get:a,update:c,getWireframeAttribute:h}}function z0(s,t,e,n){const i=n.isWebGL2;let r;function o(f){r=f}let a,c;function l(f){a=f.type,c=f.bytesPerElement}function h(f,g){s.drawElements(r,g,a,f*c),e.update(g,r,1)}function d(f,g,v){if(v===0)return;let m,p;if(i)m=s,p="drawElementsInstanced";else if(m=t.get("ANGLE_instanced_arrays"),p="drawElementsInstancedANGLE",m===null){console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");return}m[p](r,g,a,f*c,v),e.update(g,r,v)}function u(f,g,v){if(v===0)return;const m=t.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<v;p++)this.render(f[p]/c,g[p]);else{m.multiDrawElementsWEBGL(r,g,0,a,f,0,v);let p=0;for(let x=0;x<v;x++)p+=g[x];e.update(p,r,1)}}this.setMode=o,this.setIndex=l,this.render=h,this.renderInstances=d,this.renderMultiDraw=u}function B0(s){const t={geometries:0,textures:0},e={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(e.calls++,o){case s.TRIANGLES:e.triangles+=a*(r/3);break;case s.LINES:e.lines+=a*(r/2);break;case s.LINE_STRIP:e.lines+=a*(r-1);break;case s.LINE_LOOP:e.lines+=a*r;break;case s.POINTS:e.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){e.calls=0,e.triangles=0,e.points=0,e.lines=0}return{memory:t,render:e,programs:null,autoReset:!0,reset:i,update:n}}function G0(s,t){return s[0]-t[0]}function H0(s,t){return Math.abs(t[1])-Math.abs(s[1])}function W0(s,t,e){const n={},i=new Float32Array(8),r=new WeakMap,o=new Pe,a=[];for(let l=0;l<8;l++)a[l]=[l,0];function c(l,h,d){const u=l.morphTargetInfluences;if(t.isWebGL2===!0){const g=h.morphAttributes.position||h.morphAttributes.normal||h.morphAttributes.color,v=g!==void 0?g.length:0;let m=r.get(h);if(m===void 0||m.count!==v){let I=function(){z.dispose(),r.delete(h),h.removeEventListener("dispose",I)};var f=I;m!==void 0&&m.texture.dispose();const y=h.morphAttributes.position!==void 0,_=h.morphAttributes.normal!==void 0,M=h.morphAttributes.color!==void 0,S=h.morphAttributes.position||[],b=h.morphAttributes.normal||[],L=h.morphAttributes.color||[];let w=0;y===!0&&(w=1),_===!0&&(w=2),M===!0&&(w=3);let T=h.attributes.position.count*w,O=1;T>t.maxTextureSize&&(O=Math.ceil(T/t.maxTextureSize),T=t.maxTextureSize);const D=new Float32Array(T*O*4*v),z=new Qh(D,T,O,v);z.type=Jn,z.needsUpdate=!0;const C=w*4;for(let U=0;U<v;U++){const Y=S[U],G=b[U],k=L[U],Q=T*O*4*U;for(let V=0;V<Y.count;V++){const X=V*C;y===!0&&(o.fromBufferAttribute(Y,V),D[Q+X+0]=o.x,D[Q+X+1]=o.y,D[Q+X+2]=o.z,D[Q+X+3]=0),_===!0&&(o.fromBufferAttribute(G,V),D[Q+X+4]=o.x,D[Q+X+5]=o.y,D[Q+X+6]=o.z,D[Q+X+7]=0),M===!0&&(o.fromBufferAttribute(k,V),D[Q+X+8]=o.x,D[Q+X+9]=o.y,D[Q+X+10]=o.z,D[Q+X+11]=k.itemSize===4?o.w:1)}}m={count:v,texture:z,size:new nt(T,O)},r.set(h,m),h.addEventListener("dispose",I)}let p=0;for(let y=0;y<u.length;y++)p+=u[y];const x=h.morphTargetsRelative?1:1-p;d.getUniforms().setValue(s,"morphTargetBaseInfluence",x),d.getUniforms().setValue(s,"morphTargetInfluences",u),d.getUniforms().setValue(s,"morphTargetsTexture",m.texture,e),d.getUniforms().setValue(s,"morphTargetsTextureSize",m.size)}else{const g=u===void 0?0:u.length;let v=n[h.id];if(v===void 0||v.length!==g){v=[];for(let _=0;_<g;_++)v[_]=[_,0];n[h.id]=v}for(let _=0;_<g;_++){const M=v[_];M[0]=_,M[1]=u[_]}v.sort(H0);for(let _=0;_<8;_++)_<g&&v[_][1]?(a[_][0]=v[_][0],a[_][1]=v[_][1]):(a[_][0]=Number.MAX_SAFE_INTEGER,a[_][1]=0);a.sort(G0);const m=h.morphAttributes.position,p=h.morphAttributes.normal;let x=0;for(let _=0;_<8;_++){const M=a[_],S=M[0],b=M[1];S!==Number.MAX_SAFE_INTEGER&&b?(m&&h.getAttribute("morphTarget"+_)!==m[S]&&h.setAttribute("morphTarget"+_,m[S]),p&&h.getAttribute("morphNormal"+_)!==p[S]&&h.setAttribute("morphNormal"+_,p[S]),i[_]=b,x+=b):(m&&h.hasAttribute("morphTarget"+_)===!0&&h.deleteAttribute("morphTarget"+_),p&&h.hasAttribute("morphNormal"+_)===!0&&h.deleteAttribute("morphNormal"+_),i[_]=0)}const y=h.morphTargetsRelative?1:1-x;d.getUniforms().setValue(s,"morphTargetBaseInfluence",y),d.getUniforms().setValue(s,"morphTargetInfluences",i)}}return{update:c}}function k0(s,t,e,n){let i=new WeakMap;function r(c){const l=n.render.frame,h=c.geometry,d=t.get(c,h);if(i.get(d)!==l&&(t.update(d),i.set(d,l)),c.isInstancedMesh&&(c.hasEventListener("dispose",a)===!1&&c.addEventListener("dispose",a),i.get(c)!==l&&(e.update(c.instanceMatrix,s.ARRAY_BUFFER),c.instanceColor!==null&&e.update(c.instanceColor,s.ARRAY_BUFFER),i.set(c,l))),c.isSkinnedMesh){const u=c.skeleton;i.get(u)!==l&&(u.update(),i.set(u,l))}return d}function o(){i=new WeakMap}function a(c){const l=c.target;l.removeEventListener("dispose",a),e.remove(l.instanceMatrix),l.instanceColor!==null&&e.remove(l.instanceColor)}return{update:r,dispose:o}}class au extends ze{constructor(t,e,n,i,r,o,a,c,l,h){if(h=h!==void 0?h:xi,h!==xi&&h!==is)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");n===void 0&&h===xi&&(n=Zn),n===void 0&&h===is&&(n=vi),super(null,i,r,o,a,c,h,n,l),this.isDepthTexture=!0,this.image={width:t,height:e},this.magFilter=a!==void 0?a:Ce,this.minFilter=c!==void 0?c:Ce,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(t){return super.copy(t),this.compareFunction=t.compareFunction,this}toJSON(t){const e=super.toJSON(t);return this.compareFunction!==null&&(e.compareFunction=this.compareFunction),e}}const cu=new ze,lu=new au(1,1);lu.compareFunction=jh;const hu=new Qh,uu=new Af,du=new ru,Sl=[],wl=[],El=new Float32Array(16),bl=new Float32Array(9),Tl=new Float32Array(4);function hs(s,t,e){const n=s[0];if(n<=0||n>0)return s;const i=t*e;let r=Sl[i];if(r===void 0&&(r=new Float32Array(i),Sl[i]=r),t!==0){n.toArray(r,0);for(let o=1,a=0;o!==t;++o)a+=e,s[o].toArray(r,a)}return r}function we(s,t){if(s.length!==t.length)return!1;for(let e=0,n=s.length;e<n;e++)if(s[e]!==t[e])return!1;return!0}function Ee(s,t){for(let e=0,n=t.length;e<n;e++)s[e]=t[e]}function vo(s,t){let e=wl[t];e===void 0&&(e=new Int32Array(t),wl[t]=e);for(let n=0;n!==t;++n)e[n]=s.allocateTextureUnit();return e}function V0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1f(this.addr,t),e[0]=t)}function X0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2f(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2fv(this.addr,t),Ee(e,t)}}function q0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3f(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else if(t.r!==void 0)(e[0]!==t.r||e[1]!==t.g||e[2]!==t.b)&&(s.uniform3f(this.addr,t.r,t.g,t.b),e[0]=t.r,e[1]=t.g,e[2]=t.b);else{if(we(e,t))return;s.uniform3fv(this.addr,t),Ee(e,t)}}function Y0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4f(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4fv(this.addr,t),Ee(e,t)}}function j0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix2fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;Tl.set(n),s.uniformMatrix2fv(this.addr,!1,Tl),Ee(e,n)}}function K0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix3fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;bl.set(n),s.uniformMatrix3fv(this.addr,!1,bl),Ee(e,n)}}function Z0(s,t){const e=this.cache,n=t.elements;if(n===void 0){if(we(e,t))return;s.uniformMatrix4fv(this.addr,!1,t),Ee(e,t)}else{if(we(e,n))return;El.set(n),s.uniformMatrix4fv(this.addr,!1,El),Ee(e,n)}}function J0(s,t){const e=this.cache;e[0]!==t&&(s.uniform1i(this.addr,t),e[0]=t)}function Q0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2i(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2iv(this.addr,t),Ee(e,t)}}function $0(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3i(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3iv(this.addr,t),Ee(e,t)}}function tg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4i(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4iv(this.addr,t),Ee(e,t)}}function eg(s,t){const e=this.cache;e[0]!==t&&(s.uniform1ui(this.addr,t),e[0]=t)}function ng(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y)&&(s.uniform2ui(this.addr,t.x,t.y),e[0]=t.x,e[1]=t.y);else{if(we(e,t))return;s.uniform2uiv(this.addr,t),Ee(e,t)}}function ig(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z)&&(s.uniform3ui(this.addr,t.x,t.y,t.z),e[0]=t.x,e[1]=t.y,e[2]=t.z);else{if(we(e,t))return;s.uniform3uiv(this.addr,t),Ee(e,t)}}function sg(s,t){const e=this.cache;if(t.x!==void 0)(e[0]!==t.x||e[1]!==t.y||e[2]!==t.z||e[3]!==t.w)&&(s.uniform4ui(this.addr,t.x,t.y,t.z,t.w),e[0]=t.x,e[1]=t.y,e[2]=t.z,e[3]=t.w);else{if(we(e,t))return;s.uniform4uiv(this.addr,t),Ee(e,t)}}function rg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);const r=this.type===s.SAMPLER_2D_SHADOW?lu:cu;e.setTexture2D(t||r,i)}function og(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture3D(t||uu,i)}function ag(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTextureCube(t||du,i)}function cg(s,t,e){const n=this.cache,i=e.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),e.setTexture2DArray(t||hu,i)}function lg(s){switch(s){case 5126:return V0;case 35664:return X0;case 35665:return q0;case 35666:return Y0;case 35674:return j0;case 35675:return K0;case 35676:return Z0;case 5124:case 35670:return J0;case 35667:case 35671:return Q0;case 35668:case 35672:return $0;case 35669:case 35673:return tg;case 5125:return eg;case 36294:return ng;case 36295:return ig;case 36296:return sg;case 35678:case 36198:case 36298:case 36306:case 35682:return rg;case 35679:case 36299:case 36307:return og;case 35680:case 36300:case 36308:case 36293:return ag;case 36289:case 36303:case 36311:case 36292:return cg}}function hg(s,t){s.uniform1fv(this.addr,t)}function ug(s,t){const e=hs(t,this.size,2);s.uniform2fv(this.addr,e)}function dg(s,t){const e=hs(t,this.size,3);s.uniform3fv(this.addr,e)}function fg(s,t){const e=hs(t,this.size,4);s.uniform4fv(this.addr,e)}function pg(s,t){const e=hs(t,this.size,4);s.uniformMatrix2fv(this.addr,!1,e)}function mg(s,t){const e=hs(t,this.size,9);s.uniformMatrix3fv(this.addr,!1,e)}function gg(s,t){const e=hs(t,this.size,16);s.uniformMatrix4fv(this.addr,!1,e)}function vg(s,t){s.uniform1iv(this.addr,t)}function xg(s,t){s.uniform2iv(this.addr,t)}function yg(s,t){s.uniform3iv(this.addr,t)}function _g(s,t){s.uniform4iv(this.addr,t)}function Mg(s,t){s.uniform1uiv(this.addr,t)}function Sg(s,t){s.uniform2uiv(this.addr,t)}function wg(s,t){s.uniform3uiv(this.addr,t)}function Eg(s,t){s.uniform4uiv(this.addr,t)}function bg(s,t,e){const n=this.cache,i=t.length,r=vo(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTexture2D(t[o]||cu,r[o])}function Tg(s,t,e){const n=this.cache,i=t.length,r=vo(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTexture3D(t[o]||uu,r[o])}function Ag(s,t,e){const n=this.cache,i=t.length,r=vo(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTextureCube(t[o]||du,r[o])}function Cg(s,t,e){const n=this.cache,i=t.length,r=vo(e,i);we(n,r)||(s.uniform1iv(this.addr,r),Ee(n,r));for(let o=0;o!==i;++o)e.setTexture2DArray(t[o]||hu,r[o])}function Rg(s){switch(s){case 5126:return hg;case 35664:return ug;case 35665:return dg;case 35666:return fg;case 35674:return pg;case 35675:return mg;case 35676:return gg;case 5124:case 35670:return vg;case 35667:case 35671:return xg;case 35668:case 35672:return yg;case 35669:case 35673:return _g;case 5125:return Mg;case 36294:return Sg;case 36295:return wg;case 36296:return Eg;case 35678:case 36198:case 36298:case 36306:case 35682:return bg;case 35679:case 36299:case 36307:return Tg;case 35680:case 36300:case 36308:case 36293:return Ag;case 36289:case 36303:case 36311:case 36292:return Cg}}class Pg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.setValue=lg(e.type)}}class Lg{constructor(t,e,n){this.id=t,this.addr=n,this.cache=[],this.type=e.type,this.size=e.size,this.setValue=Rg(e.type)}}class Ig{constructor(t){this.id=t,this.seq=[],this.map={}}setValue(t,e,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(t,e[a.id],n)}}}const na=/(\w+)(\])?(\[|\.)?/g;function Al(s,t){s.seq.push(t),s.map[t.id]=t}function Dg(s,t,e){const n=s.name,i=n.length;for(na.lastIndex=0;;){const r=na.exec(n),o=na.lastIndex;let a=r[1];const c=r[2]==="]",l=r[3];if(c&&(a=a|0),l===void 0||l==="["&&o+2===i){Al(e,l===void 0?new Pg(a,s,t):new Lg(a,s,t));break}else{let d=e.map[a];d===void 0&&(d=new Ig(a),Al(e,d)),e=d}}}class io{constructor(t,e){this.seq=[],this.map={};const n=t.getProgramParameter(e,t.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=t.getActiveUniform(e,i),o=t.getUniformLocation(e,r.name);Dg(r,o,this)}}setValue(t,e,n,i){const r=this.map[e];r!==void 0&&r.setValue(t,n,i)}setOptional(t,e,n){const i=e[n];i!==void 0&&this.setValue(t,n,i)}static upload(t,e,n,i){for(let r=0,o=e.length;r!==o;++r){const a=e[r],c=n[a.id];c.needsUpdate!==!1&&a.setValue(t,c.value,i)}}static seqWithValue(t,e){const n=[];for(let i=0,r=t.length;i!==r;++i){const o=t[i];o.id in e&&n.push(o)}return n}}function Cl(s,t,e){const n=s.createShader(t);return s.shaderSource(n,e),s.compileShader(n),n}const Ng=37297;let Ug=0;function Fg(s,t){const e=s.split(`
`),n=[],i=Math.max(t-6,0),r=Math.min(t+6,e.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===t?">":" "} ${a}: ${e[o]}`)}return n.join(`
`)}function Og(s){const t=se.getPrimaries(se.workingColorSpace),e=se.getPrimaries(s);let n;switch(t===e?n="":t===lo&&e===co?n="LinearDisplayP3ToLinearSRGB":t===co&&e===lo&&(n="LinearSRGBToLinearDisplayP3"),s){case Hn:case go:return[n,"LinearTransferOETF"];case $t:case Ka:return[n,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space:",s),[n,"LinearTransferOETF"]}}function Rl(s,t,e){const n=s.getShaderParameter(t,s.COMPILE_STATUS),i=s.getShaderInfoLog(t).trim();if(n&&i==="")return"";const r=/ERROR: 0:(\d+)/.exec(i);if(r){const o=parseInt(r[1]);return e.toUpperCase()+`

`+i+`

`+Fg(s.getShaderSource(t),o)}else return i}function zg(s,t){const e=Og(t);return`vec4 ${s}( vec4 value ) { return ${e[0]}( ${e[1]}( value ) ); }`}function Bg(s,t){let e;switch(t){case Nh:e="Linear";break;case Uh:e="Reinhard";break;case Fh:e="OptimizedCineon";break;case Ya:e="ACESFilmic";break;case Oh:e="AgX";break;case Gd:e="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",t),e="Linear"}return"vec3 "+s+"( vec3 color ) { return "+e+"ToneMapping( color ); }"}function Gg(s){return[s.extensionDerivatives||s.envMapCubeUVHeight||s.bumpMap||s.normalMapTangentSpace||s.clearcoatNormalMap||s.flatShading||s.shaderID==="physical"?"#extension GL_OES_standard_derivatives : enable":"",(s.extensionFragDepth||s.logarithmicDepthBuffer)&&s.rendererExtensionFragDepth?"#extension GL_EXT_frag_depth : enable":"",s.extensionDrawBuffers&&s.rendererExtensionDrawBuffers?"#extension GL_EXT_draw_buffers : require":"",(s.extensionShaderTextureLOD||s.envMap||s.transmission)&&s.rendererExtensionShaderTextureLod?"#extension GL_EXT_shader_texture_lod : enable":""].filter(Zi).join(`
`)}function Hg(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":""].filter(Zi).join(`
`)}function Wg(s){const t=[];for(const e in s){const n=s[e];n!==!1&&t.push("#define "+e+" "+n)}return t.join(`
`)}function kg(s,t){const e={},n=s.getProgramParameter(t,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(t,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),e[o]={type:r.type,location:s.getAttribLocation(t,o),locationSize:a}}return e}function Zi(s){return s!==""}function Pl(s,t){const e=t.numSpotLightShadows+t.numSpotLightMaps-t.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,t.numDirLights).replace(/NUM_SPOT_LIGHTS/g,t.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,t.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,e).replace(/NUM_RECT_AREA_LIGHTS/g,t.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,t.numPointLights).replace(/NUM_HEMI_LIGHTS/g,t.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,t.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,t.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,t.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,t.numPointLightShadows)}function Ll(s,t){return s.replace(/NUM_CLIPPING_PLANES/g,t.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,t.numClippingPlanes-t.numClipIntersection)}const Vg=/^[ \t]*#include +<([\w\d./]+)>/gm;function Ba(s){return s.replace(Vg,qg)}const Xg=new Map([["encodings_fragment","colorspace_fragment"],["encodings_pars_fragment","colorspace_pars_fragment"],["output_fragment","opaque_fragment"]]);function qg(s,t){let e=Xt[t];if(e===void 0){const n=Xg.get(t);if(n!==void 0)e=Xt[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',t,n);else throw new Error("Can not resolve #include <"+t+">")}return Ba(e)}const Yg=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Il(s){return s.replace(Yg,jg)}function jg(s,t,e,n){let i="";for(let r=parseInt(t);r<parseInt(e);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Dl(s){let t="precision "+s.precision+` float;
precision `+s.precision+" int;";return s.precision==="highp"?t+=`
#define HIGH_PRECISION`:s.precision==="mediump"?t+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(t+=`
#define LOW_PRECISION`),t}function Kg(s){let t="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===Lh?t="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ih?t="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Fn&&(t="SHADOWMAP_TYPE_VSM"),t}function Zg(s){let t="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case es:case ns:t="ENVMAP_TYPE_CUBE";break;case mo:t="ENVMAP_TYPE_CUBE_UV";break}return t}function Jg(s){let t="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case ns:t="ENVMAP_MODE_REFRACTION";break}return t}function Qg(s){let t="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case Dh:t="ENVMAP_BLENDING_MULTIPLY";break;case zd:t="ENVMAP_BLENDING_MIX";break;case Bd:t="ENVMAP_BLENDING_ADD";break}return t}function $g(s){const t=s.envMapCubeUVHeight;if(t===null)return null;const e=Math.log2(t)-2,n=1/t;return{texelWidth:1/(3*Math.max(Math.pow(2,e),7*16)),texelHeight:n,maxMip:e}}function tv(s,t,e,n){const i=s.getContext(),r=e.defines;let o=e.vertexShader,a=e.fragmentShader;const c=Kg(e),l=Zg(e),h=Jg(e),d=Qg(e),u=$g(e),f=e.isWebGL2?"":Gg(e),g=Hg(e),v=Wg(r),m=i.createProgram();let p,x,y=e.glslVersion?"#version "+e.glslVersion+`
`:"";e.isRawShaderMaterial?(p=["#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Zi).join(`
`),p.length>0&&(p+=`
`),x=[f,"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v].filter(Zi).join(`
`),x.length>0&&(x+=`
`)):(p=[Dl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",e.batching?"#define USE_BATCHING":"",e.instancing?"#define USE_INSTANCING":"",e.instancingColor?"#define USE_INSTANCING_COLOR":"",e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+h:"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.displacementMap?"#define USE_DISPLACEMENTMAP":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.mapUv?"#define MAP_UV "+e.mapUv:"",e.alphaMapUv?"#define ALPHAMAP_UV "+e.alphaMapUv:"",e.lightMapUv?"#define LIGHTMAP_UV "+e.lightMapUv:"",e.aoMapUv?"#define AOMAP_UV "+e.aoMapUv:"",e.emissiveMapUv?"#define EMISSIVEMAP_UV "+e.emissiveMapUv:"",e.bumpMapUv?"#define BUMPMAP_UV "+e.bumpMapUv:"",e.normalMapUv?"#define NORMALMAP_UV "+e.normalMapUv:"",e.displacementMapUv?"#define DISPLACEMENTMAP_UV "+e.displacementMapUv:"",e.metalnessMapUv?"#define METALNESSMAP_UV "+e.metalnessMapUv:"",e.roughnessMapUv?"#define ROUGHNESSMAP_UV "+e.roughnessMapUv:"",e.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+e.anisotropyMapUv:"",e.clearcoatMapUv?"#define CLEARCOATMAP_UV "+e.clearcoatMapUv:"",e.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+e.clearcoatNormalMapUv:"",e.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+e.clearcoatRoughnessMapUv:"",e.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+e.iridescenceMapUv:"",e.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+e.iridescenceThicknessMapUv:"",e.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+e.sheenColorMapUv:"",e.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+e.sheenRoughnessMapUv:"",e.specularMapUv?"#define SPECULARMAP_UV "+e.specularMapUv:"",e.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+e.specularColorMapUv:"",e.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+e.specularIntensityMapUv:"",e.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+e.transmissionMapUv:"",e.thicknessMapUv?"#define THICKNESSMAP_UV "+e.thicknessMapUv:"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.flatShading?"#define FLAT_SHADED":"",e.skinning?"#define USE_SKINNING":"",e.morphTargets?"#define USE_MORPHTARGETS":"",e.morphNormals&&e.flatShading===!1?"#define USE_MORPHNORMALS":"",e.morphColors&&e.isWebGL2?"#define USE_MORPHCOLORS":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE":"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_TEXTURE_STRIDE "+e.morphTextureStride:"",e.morphTargetsCount>0&&e.isWebGL2?"#define MORPHTARGETS_COUNT "+e.morphTargetsCount:"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.sizeAttenuation?"#define USE_SIZEATTENUATION":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )","	attribute vec3 morphTarget0;","	attribute vec3 morphTarget1;","	attribute vec3 morphTarget2;","	attribute vec3 morphTarget3;","	#ifdef USE_MORPHNORMALS","		attribute vec3 morphNormal0;","		attribute vec3 morphNormal1;","		attribute vec3 morphNormal2;","		attribute vec3 morphNormal3;","	#else","		attribute vec3 morphTarget4;","		attribute vec3 morphTarget5;","		attribute vec3 morphTarget6;","		attribute vec3 morphTarget7;","	#endif","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zi).join(`
`),x=[f,Dl(e),"#define SHADER_TYPE "+e.shaderType,"#define SHADER_NAME "+e.shaderName,v,e.useFog&&e.fog?"#define USE_FOG":"",e.useFog&&e.fogExp2?"#define FOG_EXP2":"",e.map?"#define USE_MAP":"",e.matcap?"#define USE_MATCAP":"",e.envMap?"#define USE_ENVMAP":"",e.envMap?"#define "+l:"",e.envMap?"#define "+h:"",e.envMap?"#define "+d:"",u?"#define CUBEUV_TEXEL_WIDTH "+u.texelWidth:"",u?"#define CUBEUV_TEXEL_HEIGHT "+u.texelHeight:"",u?"#define CUBEUV_MAX_MIP "+u.maxMip+".0":"",e.lightMap?"#define USE_LIGHTMAP":"",e.aoMap?"#define USE_AOMAP":"",e.bumpMap?"#define USE_BUMPMAP":"",e.normalMap?"#define USE_NORMALMAP":"",e.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",e.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",e.emissiveMap?"#define USE_EMISSIVEMAP":"",e.anisotropy?"#define USE_ANISOTROPY":"",e.anisotropyMap?"#define USE_ANISOTROPYMAP":"",e.clearcoat?"#define USE_CLEARCOAT":"",e.clearcoatMap?"#define USE_CLEARCOATMAP":"",e.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",e.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",e.iridescence?"#define USE_IRIDESCENCE":"",e.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",e.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",e.specularMap?"#define USE_SPECULARMAP":"",e.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",e.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",e.roughnessMap?"#define USE_ROUGHNESSMAP":"",e.metalnessMap?"#define USE_METALNESSMAP":"",e.alphaMap?"#define USE_ALPHAMAP":"",e.alphaTest?"#define USE_ALPHATEST":"",e.alphaHash?"#define USE_ALPHAHASH":"",e.sheen?"#define USE_SHEEN":"",e.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",e.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",e.transmission?"#define USE_TRANSMISSION":"",e.transmissionMap?"#define USE_TRANSMISSIONMAP":"",e.thicknessMap?"#define USE_THICKNESSMAP":"",e.vertexTangents&&e.flatShading===!1?"#define USE_TANGENT":"",e.vertexColors||e.instancingColor?"#define USE_COLOR":"",e.vertexAlphas?"#define USE_COLOR_ALPHA":"",e.vertexUv1s?"#define USE_UV1":"",e.vertexUv2s?"#define USE_UV2":"",e.vertexUv3s?"#define USE_UV3":"",e.pointsUvs?"#define USE_POINTS_UV":"",e.gradientMap?"#define USE_GRADIENTMAP":"",e.flatShading?"#define FLAT_SHADED":"",e.doubleSided?"#define DOUBLE_SIDED":"",e.flipSided?"#define FLIP_SIDED":"",e.shadowMapEnabled?"#define USE_SHADOWMAP":"",e.shadowMapEnabled?"#define "+c:"",e.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",e.numLightProbes>0?"#define USE_LIGHT_PROBES":"",e.useLegacyLights?"#define LEGACY_LIGHTS":"",e.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",e.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",e.logarithmicDepthBuffer&&e.rendererExtensionFragDepth?"#define USE_LOGDEPTHBUF_EXT":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",e.toneMapping!==$n?"#define TONE_MAPPING":"",e.toneMapping!==$n?Xt.tonemapping_pars_fragment:"",e.toneMapping!==$n?Bg("toneMapping",e.toneMapping):"",e.dithering?"#define DITHERING":"",e.opaque?"#define OPAQUE":"",Xt.colorspace_pars_fragment,zg("linearToOutputTexel",e.outputColorSpace),e.useDepthPacking?"#define DEPTH_PACKING "+e.depthPacking:"",`
`].filter(Zi).join(`
`)),o=Ba(o),o=Pl(o,e),o=Ll(o,e),a=Ba(a),a=Pl(a,e),a=Ll(a,e),o=Il(o),a=Il(a),e.isWebGL2&&e.isRawShaderMaterial!==!0&&(y=`#version 300 es
`,p=[g,"precision mediump sampler2DArray;","#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+p,x=["precision mediump sampler2DArray;","#define varying in",e.glslVersion===Qc?"":"layout(location = 0) out highp vec4 pc_fragColor;",e.glslVersion===Qc?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+x);const _=y+p+o,M=y+x+a,S=Cl(i,i.VERTEX_SHADER,_),b=Cl(i,i.FRAGMENT_SHADER,M);i.attachShader(m,S),i.attachShader(m,b),e.index0AttributeName!==void 0?i.bindAttribLocation(m,0,e.index0AttributeName):e.morphTargets===!0&&i.bindAttribLocation(m,0,"position"),i.linkProgram(m);function L(D){if(s.debug.checkShaderErrors){const z=i.getProgramInfoLog(m).trim(),C=i.getShaderInfoLog(S).trim(),I=i.getShaderInfoLog(b).trim();let U=!0,Y=!0;if(i.getProgramParameter(m,i.LINK_STATUS)===!1)if(U=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,m,S,b);else{const G=Rl(i,S,"vertex"),k=Rl(i,b,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(m,i.VALIDATE_STATUS)+`

Program Info Log: `+z+`
`+G+`
`+k)}else z!==""?console.warn("THREE.WebGLProgram: Program Info Log:",z):(C===""||I==="")&&(Y=!1);Y&&(D.diagnostics={runnable:U,programLog:z,vertexShader:{log:C,prefix:p},fragmentShader:{log:I,prefix:x}})}i.deleteShader(S),i.deleteShader(b),w=new io(i,m),T=kg(i,m)}let w;this.getUniforms=function(){return w===void 0&&L(this),w};let T;this.getAttributes=function(){return T===void 0&&L(this),T};let O=e.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return O===!1&&(O=i.getProgramParameter(m,Ng)),O},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(m),this.program=void 0},this.type=e.shaderType,this.name=e.shaderName,this.id=Ug++,this.cacheKey=t,this.usedTimes=1,this.program=m,this.vertexShader=S,this.fragmentShader=b,this}let ev=0;class nv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(t){const e=t.vertexShader,n=t.fragmentShader,i=this._getShaderStage(e),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(t);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(t){const e=this.materialCache.get(t);for(const n of e)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(t),this}getVertexShaderID(t){return this._getShaderStage(t.vertexShader).id}getFragmentShaderID(t){return this._getShaderStage(t.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(t){const e=this.materialCache;let n=e.get(t);return n===void 0&&(n=new Set,e.set(t,n)),n}_getShaderStage(t){const e=this.shaderCache;let n=e.get(t);return n===void 0&&(n=new iv(t),e.set(t,n)),n}}class iv{constructor(t){this.id=ev++,this.code=t,this.usedTimes=0}}function sv(s,t,e,n,i,r,o){const a=new $h,c=new nv,l=[],h=i.isWebGL2,d=i.logarithmicDepthBuffer,u=i.vertexTextures;let f=i.precision;const g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(w){return w===0?"uv":`uv${w}`}function m(w,T,O,D,z){const C=D.fog,I=z.geometry,U=w.isMeshStandardMaterial?D.environment:null,Y=(w.isMeshStandardMaterial?e:t).get(w.envMap||U),G=Y&&Y.mapping===mo?Y.image.height:null,k=g[w.type];w.precision!==null&&(f=i.getMaxPrecision(w.precision),f!==w.precision&&console.warn("THREE.WebGLProgram.getParameters:",w.precision,"not supported, using",f,"instead."));const Q=I.morphAttributes.position||I.morphAttributes.normal||I.morphAttributes.color,V=Q!==void 0?Q.length:0;let X=0;I.morphAttributes.position!==void 0&&(X=1),I.morphAttributes.normal!==void 0&&(X=2),I.morphAttributes.color!==void 0&&(X=3);let q,et,ut,pt;if(k){const Ge=Sn[k];q=Ge.vertexShader,et=Ge.fragmentShader}else q=w.vertexShader,et=w.fragmentShader,c.update(w),ut=c.getVertexShaderID(w),pt=c.getFragmentShaderID(w);const it=s.getRenderTarget(),vt=z.isInstancedMesh===!0,St=z.isBatchedMesh===!0,mt=!!w.map,ht=!!w.matcap,F=!!Y,at=!!w.aoMap,J=!!w.lightMap,lt=!!w.bumpMap,tt=!!w.normalMap,Ct=!!w.displacementMap,xt=!!w.emissiveMap,R=!!w.metalnessMap,A=!!w.roughnessMap,H=w.anisotropy>0,ot=w.clearcoat>0,st=w.iridescence>0,rt=w.sheen>0,yt=w.transmission>0,gt=H&&!!w.anisotropyMap,wt=ot&&!!w.clearcoatMap,Dt=ot&&!!w.clearcoatNormalMap,Wt=ot&&!!w.clearcoatRoughnessMap,ct=st&&!!w.iridescenceMap,te=st&&!!w.iridescenceThicknessMap,Zt=rt&&!!w.sheenColorMap,Gt=rt&&!!w.sheenRoughnessMap,It=!!w.specularMap,Rt=!!w.specularColorMap,Vt=!!w.specularIntensityMap,ie=yt&&!!w.transmissionMap,ge=yt&&!!w.thicknessMap,Yt=!!w.gradientMap,dt=!!w.alphaMap,B=w.alphaTest>0,_t=!!w.alphaHash,Mt=!!w.extensions,Ot=!!I.attributes.uv1,Nt=!!I.attributes.uv2,oe=!!I.attributes.uv3;let ae=$n;return w.toneMapped&&(it===null||it.isXRRenderTarget===!0)&&(ae=s.toneMapping),{isWebGL2:h,shaderID:k,shaderType:w.type,shaderName:w.name,vertexShader:q,fragmentShader:et,defines:w.defines,customVertexShaderID:ut,customFragmentShaderID:pt,isRawShaderMaterial:w.isRawShaderMaterial===!0,glslVersion:w.glslVersion,precision:f,batching:St,instancing:vt,instancingColor:vt&&z.instanceColor!==null,supportsVertexTextures:u,outputColorSpace:it===null?s.outputColorSpace:it.isXRRenderTarget===!0?it.texture.colorSpace:Hn,map:mt,matcap:ht,envMap:F,envMapMode:F&&Y.mapping,envMapCubeUVHeight:G,aoMap:at,lightMap:J,bumpMap:lt,normalMap:tt,displacementMap:u&&Ct,emissiveMap:xt,normalMapObjectSpace:tt&&w.normalMapType===Qd,normalMapTangentSpace:tt&&w.normalMapType===Yh,metalnessMap:R,roughnessMap:A,anisotropy:H,anisotropyMap:gt,clearcoat:ot,clearcoatMap:wt,clearcoatNormalMap:Dt,clearcoatRoughnessMap:Wt,iridescence:st,iridescenceMap:ct,iridescenceThicknessMap:te,sheen:rt,sheenColorMap:Zt,sheenRoughnessMap:Gt,specularMap:It,specularColorMap:Rt,specularIntensityMap:Vt,transmission:yt,transmissionMap:ie,thicknessMap:ge,gradientMap:Yt,opaque:w.transparent===!1&&w.blending===$i,alphaMap:dt,alphaTest:B,alphaHash:_t,combine:w.combine,mapUv:mt&&v(w.map.channel),aoMapUv:at&&v(w.aoMap.channel),lightMapUv:J&&v(w.lightMap.channel),bumpMapUv:lt&&v(w.bumpMap.channel),normalMapUv:tt&&v(w.normalMap.channel),displacementMapUv:Ct&&v(w.displacementMap.channel),emissiveMapUv:xt&&v(w.emissiveMap.channel),metalnessMapUv:R&&v(w.metalnessMap.channel),roughnessMapUv:A&&v(w.roughnessMap.channel),anisotropyMapUv:gt&&v(w.anisotropyMap.channel),clearcoatMapUv:wt&&v(w.clearcoatMap.channel),clearcoatNormalMapUv:Dt&&v(w.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Wt&&v(w.clearcoatRoughnessMap.channel),iridescenceMapUv:ct&&v(w.iridescenceMap.channel),iridescenceThicknessMapUv:te&&v(w.iridescenceThicknessMap.channel),sheenColorMapUv:Zt&&v(w.sheenColorMap.channel),sheenRoughnessMapUv:Gt&&v(w.sheenRoughnessMap.channel),specularMapUv:It&&v(w.specularMap.channel),specularColorMapUv:Rt&&v(w.specularColorMap.channel),specularIntensityMapUv:Vt&&v(w.specularIntensityMap.channel),transmissionMapUv:ie&&v(w.transmissionMap.channel),thicknessMapUv:ge&&v(w.thicknessMap.channel),alphaMapUv:dt&&v(w.alphaMap.channel),vertexTangents:!!I.attributes.tangent&&(tt||H),vertexColors:w.vertexColors,vertexAlphas:w.vertexColors===!0&&!!I.attributes.color&&I.attributes.color.itemSize===4,vertexUv1s:Ot,vertexUv2s:Nt,vertexUv3s:oe,pointsUvs:z.isPoints===!0&&!!I.attributes.uv&&(mt||dt),fog:!!C,useFog:w.fog===!0,fogExp2:C&&C.isFogExp2,flatShading:w.flatShading===!0,sizeAttenuation:w.sizeAttenuation===!0,logarithmicDepthBuffer:d,skinning:z.isSkinnedMesh===!0,morphTargets:I.morphAttributes.position!==void 0,morphNormals:I.morphAttributes.normal!==void 0,morphColors:I.morphAttributes.color!==void 0,morphTargetsCount:V,morphTextureStride:X,numDirLights:T.directional.length,numPointLights:T.point.length,numSpotLights:T.spot.length,numSpotLightMaps:T.spotLightMap.length,numRectAreaLights:T.rectArea.length,numHemiLights:T.hemi.length,numDirLightShadows:T.directionalShadowMap.length,numPointLightShadows:T.pointShadowMap.length,numSpotLightShadows:T.spotShadowMap.length,numSpotLightShadowsWithMaps:T.numSpotLightShadowsWithMaps,numLightProbes:T.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:w.dithering,shadowMapEnabled:s.shadowMap.enabled&&O.length>0,shadowMapType:s.shadowMap.type,toneMapping:ae,useLegacyLights:s._useLegacyLights,decodeVideoTexture:mt&&w.map.isVideoTexture===!0&&se.getTransfer(w.map.colorSpace)===le,premultipliedAlpha:w.premultipliedAlpha,doubleSided:w.side===De,flipSided:w.side===Ve,useDepthPacking:w.depthPacking>=0,depthPacking:w.depthPacking||0,index0AttributeName:w.index0AttributeName,extensionDerivatives:Mt&&w.extensions.derivatives===!0,extensionFragDepth:Mt&&w.extensions.fragDepth===!0,extensionDrawBuffers:Mt&&w.extensions.drawBuffers===!0,extensionShaderTextureLOD:Mt&&w.extensions.shaderTextureLOD===!0,extensionClipCullDistance:Mt&&w.extensions.clipCullDistance&&n.has("WEBGL_clip_cull_distance"),rendererExtensionFragDepth:h||n.has("EXT_frag_depth"),rendererExtensionDrawBuffers:h||n.has("WEBGL_draw_buffers"),rendererExtensionShaderTextureLod:h||n.has("EXT_shader_texture_lod"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:w.customProgramCacheKey()}}function p(w){const T=[];if(w.shaderID?T.push(w.shaderID):(T.push(w.customVertexShaderID),T.push(w.customFragmentShaderID)),w.defines!==void 0)for(const O in w.defines)T.push(O),T.push(w.defines[O]);return w.isRawShaderMaterial===!1&&(x(T,w),y(T,w),T.push(s.outputColorSpace)),T.push(w.customProgramCacheKey),T.join()}function x(w,T){w.push(T.precision),w.push(T.outputColorSpace),w.push(T.envMapMode),w.push(T.envMapCubeUVHeight),w.push(T.mapUv),w.push(T.alphaMapUv),w.push(T.lightMapUv),w.push(T.aoMapUv),w.push(T.bumpMapUv),w.push(T.normalMapUv),w.push(T.displacementMapUv),w.push(T.emissiveMapUv),w.push(T.metalnessMapUv),w.push(T.roughnessMapUv),w.push(T.anisotropyMapUv),w.push(T.clearcoatMapUv),w.push(T.clearcoatNormalMapUv),w.push(T.clearcoatRoughnessMapUv),w.push(T.iridescenceMapUv),w.push(T.iridescenceThicknessMapUv),w.push(T.sheenColorMapUv),w.push(T.sheenRoughnessMapUv),w.push(T.specularMapUv),w.push(T.specularColorMapUv),w.push(T.specularIntensityMapUv),w.push(T.transmissionMapUv),w.push(T.thicknessMapUv),w.push(T.combine),w.push(T.fogExp2),w.push(T.sizeAttenuation),w.push(T.morphTargetsCount),w.push(T.morphAttributeCount),w.push(T.numDirLights),w.push(T.numPointLights),w.push(T.numSpotLights),w.push(T.numSpotLightMaps),w.push(T.numHemiLights),w.push(T.numRectAreaLights),w.push(T.numDirLightShadows),w.push(T.numPointLightShadows),w.push(T.numSpotLightShadows),w.push(T.numSpotLightShadowsWithMaps),w.push(T.numLightProbes),w.push(T.shadowMapType),w.push(T.toneMapping),w.push(T.numClippingPlanes),w.push(T.numClipIntersection),w.push(T.depthPacking)}function y(w,T){a.disableAll(),T.isWebGL2&&a.enable(0),T.supportsVertexTextures&&a.enable(1),T.instancing&&a.enable(2),T.instancingColor&&a.enable(3),T.matcap&&a.enable(4),T.envMap&&a.enable(5),T.normalMapObjectSpace&&a.enable(6),T.normalMapTangentSpace&&a.enable(7),T.clearcoat&&a.enable(8),T.iridescence&&a.enable(9),T.alphaTest&&a.enable(10),T.vertexColors&&a.enable(11),T.vertexAlphas&&a.enable(12),T.vertexUv1s&&a.enable(13),T.vertexUv2s&&a.enable(14),T.vertexUv3s&&a.enable(15),T.vertexTangents&&a.enable(16),T.anisotropy&&a.enable(17),T.alphaHash&&a.enable(18),T.batching&&a.enable(19),w.push(a.mask),a.disableAll(),T.fog&&a.enable(0),T.useFog&&a.enable(1),T.flatShading&&a.enable(2),T.logarithmicDepthBuffer&&a.enable(3),T.skinning&&a.enable(4),T.morphTargets&&a.enable(5),T.morphNormals&&a.enable(6),T.morphColors&&a.enable(7),T.premultipliedAlpha&&a.enable(8),T.shadowMapEnabled&&a.enable(9),T.useLegacyLights&&a.enable(10),T.doubleSided&&a.enable(11),T.flipSided&&a.enable(12),T.useDepthPacking&&a.enable(13),T.dithering&&a.enable(14),T.transmission&&a.enable(15),T.sheen&&a.enable(16),T.opaque&&a.enable(17),T.pointsUvs&&a.enable(18),T.decodeVideoTexture&&a.enable(19),w.push(a.mask)}function _(w){const T=g[w.type];let O;if(T){const D=Sn[T];O=Gn.clone(D.uniforms)}else O=w.uniforms;return O}function M(w,T){let O;for(let D=0,z=l.length;D<z;D++){const C=l[D];if(C.cacheKey===T){O=C,++O.usedTimes;break}}return O===void 0&&(O=new tv(s,T,w,r),l.push(O)),O}function S(w){if(--w.usedTimes===0){const T=l.indexOf(w);l[T]=l[l.length-1],l.pop(),w.destroy()}}function b(w){c.remove(w)}function L(){c.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:M,releaseProgram:S,releaseShaderCache:b,programs:l,dispose:L}}function rv(){let s=new WeakMap;function t(r){let o=s.get(r);return o===void 0&&(o={},s.set(r,o)),o}function e(r){s.delete(r)}function n(r,o,a){s.get(r)[o]=a}function i(){s=new WeakMap}return{get:t,remove:e,update:n,dispose:i}}function ov(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.material.id!==t.material.id?s.material.id-t.material.id:s.z!==t.z?s.z-t.z:s.id-t.id}function Nl(s,t){return s.groupOrder!==t.groupOrder?s.groupOrder-t.groupOrder:s.renderOrder!==t.renderOrder?s.renderOrder-t.renderOrder:s.z!==t.z?t.z-s.z:s.id-t.id}function Ul(){const s=[];let t=0;const e=[],n=[],i=[];function r(){t=0,e.length=0,n.length=0,i.length=0}function o(d,u,f,g,v,m){let p=s[t];return p===void 0?(p={id:d.id,object:d,geometry:u,material:f,groupOrder:g,renderOrder:d.renderOrder,z:v,group:m},s[t]=p):(p.id=d.id,p.object=d,p.geometry=u,p.material=f,p.groupOrder=g,p.renderOrder=d.renderOrder,p.z=v,p.group=m),t++,p}function a(d,u,f,g,v,m){const p=o(d,u,f,g,v,m);f.transmission>0?n.push(p):f.transparent===!0?i.push(p):e.push(p)}function c(d,u,f,g,v,m){const p=o(d,u,f,g,v,m);f.transmission>0?n.unshift(p):f.transparent===!0?i.unshift(p):e.unshift(p)}function l(d,u){e.length>1&&e.sort(d||ov),n.length>1&&n.sort(u||Nl),i.length>1&&i.sort(u||Nl)}function h(){for(let d=t,u=s.length;d<u;d++){const f=s[d];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:e,transmissive:n,transparent:i,init:r,push:a,unshift:c,finish:h,sort:l}}function av(){let s=new WeakMap;function t(n,i){const r=s.get(n);let o;return r===void 0?(o=new Ul,s.set(n,[o])):i>=r.length?(o=new Ul,r.push(o)):o=r[i],o}function e(){s=new WeakMap}return{get:t,dispose:e}}function cv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={direction:new N,color:new Ft};break;case"SpotLight":e={position:new N,direction:new N,color:new Ft,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":e={position:new N,color:new Ft,distance:0,decay:0};break;case"HemisphereLight":e={direction:new N,skyColor:new Ft,groundColor:new Ft};break;case"RectAreaLight":e={color:new Ft,position:new N,halfWidth:new N,halfHeight:new N};break}return s[t.id]=e,e}}}function lv(){const s={};return{get:function(t){if(s[t.id]!==void 0)return s[t.id];let e;switch(t.type){case"DirectionalLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"SpotLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt};break;case"PointLight":e={shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new nt,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[t.id]=e,e}}}let hv=0;function uv(s,t){return(t.castShadow?2:0)-(s.castShadow?2:0)+(t.map?1:0)-(s.map?1:0)}function dv(s,t){const e=new cv,n=lv(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let h=0;h<9;h++)i.probe.push(new N);const r=new N,o=new ne,a=new ne;function c(h,d){let u=0,f=0,g=0;for(let D=0;D<9;D++)i.probe[D].set(0,0,0);let v=0,m=0,p=0,x=0,y=0,_=0,M=0,S=0,b=0,L=0,w=0;h.sort(uv);const T=d===!0?Math.PI:1;for(let D=0,z=h.length;D<z;D++){const C=h[D],I=C.color,U=C.intensity,Y=C.distance,G=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=I.r*U*T,f+=I.g*U*T,g+=I.b*U*T;else if(C.isLightProbe){for(let k=0;k<9;k++)i.probe[k].addScaledVector(C.sh.coefficients[k],U);w++}else if(C.isDirectionalLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity*T),C.castShadow){const Q=C.shadow,V=n.get(C);V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.directionalShadow[v]=V,i.directionalShadowMap[v]=G,i.directionalShadowMatrix[v]=C.shadow.matrix,_++}i.directional[v]=k,v++}else if(C.isSpotLight){const k=e.get(C);k.position.setFromMatrixPosition(C.matrixWorld),k.color.copy(I).multiplyScalar(U*T),k.distance=Y,k.coneCos=Math.cos(C.angle),k.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),k.decay=C.decay,i.spot[p]=k;const Q=C.shadow;if(C.map&&(i.spotLightMap[b]=C.map,b++,Q.updateMatrices(C),C.castShadow&&L++),i.spotLightMatrix[p]=Q.matrix,C.castShadow){const V=n.get(C);V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,i.spotShadow[p]=V,i.spotShadowMap[p]=G,S++}p++}else if(C.isRectAreaLight){const k=e.get(C);k.color.copy(I).multiplyScalar(U),k.halfWidth.set(C.width*.5,0,0),k.halfHeight.set(0,C.height*.5,0),i.rectArea[x]=k,x++}else if(C.isPointLight){const k=e.get(C);if(k.color.copy(C.color).multiplyScalar(C.intensity*T),k.distance=C.distance,k.decay=C.decay,C.castShadow){const Q=C.shadow,V=n.get(C);V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,V.shadowCameraNear=Q.camera.near,V.shadowCameraFar=Q.camera.far,i.pointShadow[m]=V,i.pointShadowMap[m]=G,i.pointShadowMatrix[m]=C.shadow.matrix,M++}i.point[m]=k,m++}else if(C.isHemisphereLight){const k=e.get(C);k.skyColor.copy(C.color).multiplyScalar(U*T),k.groundColor.copy(C.groundColor).multiplyScalar(U*T),i.hemi[y]=k,y++}}x>0&&(t.isWebGL2?s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_FLOAT_1,i.rectAreaLTC2=ft.LTC_FLOAT_2):(i.rectAreaLTC1=ft.LTC_HALF_1,i.rectAreaLTC2=ft.LTC_HALF_2):s.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_FLOAT_1,i.rectAreaLTC2=ft.LTC_FLOAT_2):s.has("OES_texture_half_float_linear")===!0?(i.rectAreaLTC1=ft.LTC_HALF_1,i.rectAreaLTC2=ft.LTC_HALF_2):console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.")),i.ambient[0]=u,i.ambient[1]=f,i.ambient[2]=g;const O=i.hash;(O.directionalLength!==v||O.pointLength!==m||O.spotLength!==p||O.rectAreaLength!==x||O.hemiLength!==y||O.numDirectionalShadows!==_||O.numPointShadows!==M||O.numSpotShadows!==S||O.numSpotMaps!==b||O.numLightProbes!==w)&&(i.directional.length=v,i.spot.length=p,i.rectArea.length=x,i.point.length=m,i.hemi.length=y,i.directionalShadow.length=_,i.directionalShadowMap.length=_,i.pointShadow.length=M,i.pointShadowMap.length=M,i.spotShadow.length=S,i.spotShadowMap.length=S,i.directionalShadowMatrix.length=_,i.pointShadowMatrix.length=M,i.spotLightMatrix.length=S+b-L,i.spotLightMap.length=b,i.numSpotLightShadowsWithMaps=L,i.numLightProbes=w,O.directionalLength=v,O.pointLength=m,O.spotLength=p,O.rectAreaLength=x,O.hemiLength=y,O.numDirectionalShadows=_,O.numPointShadows=M,O.numSpotShadows=S,O.numSpotMaps=b,O.numLightProbes=w,i.version=hv++)}function l(h,d){let u=0,f=0,g=0,v=0,m=0;const p=d.matrixWorldInverse;for(let x=0,y=h.length;x<y;x++){const _=h[x];if(_.isDirectionalLight){const M=i.directional[u];M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),u++}else if(_.isSpotLight){const M=i.spot[g];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),M.direction.setFromMatrixPosition(_.matrixWorld),r.setFromMatrixPosition(_.target.matrixWorld),M.direction.sub(r),M.direction.transformDirection(p),g++}else if(_.isRectAreaLight){const M=i.rectArea[v];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),a.identity(),o.copy(_.matrixWorld),o.premultiply(p),a.extractRotation(o),M.halfWidth.set(_.width*.5,0,0),M.halfHeight.set(0,_.height*.5,0),M.halfWidth.applyMatrix4(a),M.halfHeight.applyMatrix4(a),v++}else if(_.isPointLight){const M=i.point[f];M.position.setFromMatrixPosition(_.matrixWorld),M.position.applyMatrix4(p),f++}else if(_.isHemisphereLight){const M=i.hemi[m];M.direction.setFromMatrixPosition(_.matrixWorld),M.direction.transformDirection(p),m++}}}return{setup:c,setupView:l,state:i}}function Fl(s,t){const e=new dv(s,t),n=[],i=[];function r(){n.length=0,i.length=0}function o(d){n.push(d)}function a(d){i.push(d)}function c(d){e.setup(n,d)}function l(d){e.setupView(n,d)}return{init:r,state:{lightsArray:n,shadowsArray:i,lights:e},setupLights:c,setupLightsView:l,pushLight:o,pushShadow:a}}function fv(s,t){let e=new WeakMap;function n(r,o=0){const a=e.get(r);let c;return a===void 0?(c=new Fl(s,t),e.set(r,[c])):o>=a.length?(c=new Fl(s,t),a.push(c)):c=a[o],c}function i(){e=new WeakMap}return{get:n,dispose:i}}class pv extends cs{constructor(t){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Zd,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(t)}copy(t){return super.copy(t),this.depthPacking=t.depthPacking,this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this}}class mv extends cs{constructor(t){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(t)}copy(t){return super.copy(t),this.map=t.map,this.alphaMap=t.alphaMap,this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this}}const gv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,vv=`uniform sampler2D shadow_pass;
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
}`;function xv(s,t,e){let n=new Ja;const i=new nt,r=new nt,o=new Pe,a=new pv({depthPacking:Jd}),c=new mv,l={},h=e.maxTextureSize,d={[ei]:Ve,[Ve]:ei,[De]:De},u=new Le({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new nt},radius:{value:4}},vertexShader:gv,fragmentShader:vv}),f=u.clone();f.defines.HORIZONTAL_PASS=1;const g=new he;g.setAttribute("position",new ee(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $(g,u),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Lh;let p=this.type;this.render=function(S,b,L){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||S.length===0)return;const w=s.getRenderTarget(),T=s.getActiveCubeFace(),O=s.getActiveMipmapLevel(),D=s.state;D.setBlending(Bn),D.buffers.color.setClear(1,1,1,1),D.buffers.depth.setTest(!0),D.setScissorTest(!1);const z=p!==Fn&&this.type===Fn,C=p===Fn&&this.type!==Fn;for(let I=0,U=S.length;I<U;I++){const Y=S[I],G=Y.shadow;if(G===void 0){console.warn("THREE.WebGLShadowMap:",Y,"has no shadow.");continue}if(G.autoUpdate===!1&&G.needsUpdate===!1)continue;i.copy(G.mapSize);const k=G.getFrameExtents();if(i.multiply(k),r.copy(G.mapSize),(i.x>h||i.y>h)&&(i.x>h&&(r.x=Math.floor(h/k.x),i.x=r.x*k.x,G.mapSize.x=r.x),i.y>h&&(r.y=Math.floor(h/k.y),i.y=r.y*k.y,G.mapSize.y=r.y)),G.map===null||z===!0||C===!0){const V=this.type!==Fn?{minFilter:Ce,magFilter:Ce}:{};G.map!==null&&G.map.dispose(),G.map=new Qe(i.x,i.y,V),G.map.texture.name=Y.name+".shadowMap",G.camera.updateProjectionMatrix()}s.setRenderTarget(G.map),s.clear();const Q=G.getViewportCount();for(let V=0;V<Q;V++){const X=G.getViewport(V);o.set(r.x*X.x,r.y*X.y,r.x*X.z,r.y*X.w),D.viewport(o),G.updateMatrices(Y,V),n=G.getFrustum(),_(b,L,G.camera,Y,this.type)}G.isPointLightShadow!==!0&&this.type===Fn&&x(G,L),G.needsUpdate=!1}p=this.type,m.needsUpdate=!1,s.setRenderTarget(w,T,O)};function x(S,b){const L=t.update(v);u.defines.VSM_SAMPLES!==S.blurSamples&&(u.defines.VSM_SAMPLES=S.blurSamples,f.defines.VSM_SAMPLES=S.blurSamples,u.needsUpdate=!0,f.needsUpdate=!0),S.mapPass===null&&(S.mapPass=new Qe(i.x,i.y)),u.uniforms.shadow_pass.value=S.map.texture,u.uniforms.resolution.value=S.mapSize,u.uniforms.radius.value=S.radius,s.setRenderTarget(S.mapPass),s.clear(),s.renderBufferDirect(b,null,L,u,v,null),f.uniforms.shadow_pass.value=S.mapPass.texture,f.uniforms.resolution.value=S.mapSize,f.uniforms.radius.value=S.radius,s.setRenderTarget(S.map),s.clear(),s.renderBufferDirect(b,null,L,f,v,null)}function y(S,b,L,w){let T=null;const O=L.isPointLight===!0?S.customDistanceMaterial:S.customDepthMaterial;if(O!==void 0)T=O;else if(T=L.isPointLight===!0?c:a,s.localClippingEnabled&&b.clipShadows===!0&&Array.isArray(b.clippingPlanes)&&b.clippingPlanes.length!==0||b.displacementMap&&b.displacementScale!==0||b.alphaMap&&b.alphaTest>0||b.map&&b.alphaTest>0){const D=T.uuid,z=b.uuid;let C=l[D];C===void 0&&(C={},l[D]=C);let I=C[z];I===void 0&&(I=T.clone(),C[z]=I,b.addEventListener("dispose",M)),T=I}if(T.visible=b.visible,T.wireframe=b.wireframe,w===Fn?T.side=b.shadowSide!==null?b.shadowSide:b.side:T.side=b.shadowSide!==null?b.shadowSide:d[b.side],T.alphaMap=b.alphaMap,T.alphaTest=b.alphaTest,T.map=b.map,T.clipShadows=b.clipShadows,T.clippingPlanes=b.clippingPlanes,T.clipIntersection=b.clipIntersection,T.displacementMap=b.displacementMap,T.displacementScale=b.displacementScale,T.displacementBias=b.displacementBias,T.wireframeLinewidth=b.wireframeLinewidth,T.linewidth=b.linewidth,L.isPointLight===!0&&T.isMeshDistanceMaterial===!0){const D=s.properties.get(T);D.light=L}return T}function _(S,b,L,w,T){if(S.visible===!1)return;if(S.layers.test(b.layers)&&(S.isMesh||S.isLine||S.isPoints)&&(S.castShadow||S.receiveShadow&&T===Fn)&&(!S.frustumCulled||n.intersectsObject(S))){S.modelViewMatrix.multiplyMatrices(L.matrixWorldInverse,S.matrixWorld);const z=t.update(S),C=S.material;if(Array.isArray(C)){const I=z.groups;for(let U=0,Y=I.length;U<Y;U++){const G=I[U],k=C[G.materialIndex];if(k&&k.visible){const Q=y(S,k,w,T);S.onBeforeShadow(s,S,b,L,z,Q,G),s.renderBufferDirect(L,null,z,Q,S,G),S.onAfterShadow(s,S,b,L,z,Q,G)}}}else if(C.visible){const I=y(S,C,w,T);S.onBeforeShadow(s,S,b,L,z,I,null),s.renderBufferDirect(L,null,z,I,S,null),S.onAfterShadow(s,S,b,L,z,I,null)}}const D=S.children;for(let z=0,C=D.length;z<C;z++)_(D[z],b,L,w,T)}function M(S){S.target.removeEventListener("dispose",M);for(const L in l){const w=l[L],T=S.target.uuid;T in w&&(w[T].dispose(),delete w[T])}}}function yv(s,t,e){const n=e.isWebGL2;function i(){let B=!1;const _t=new Pe;let Mt=null;const Ot=new Pe(0,0,0,0);return{setMask:function(Nt){Mt!==Nt&&!B&&(s.colorMask(Nt,Nt,Nt,Nt),Mt=Nt)},setLocked:function(Nt){B=Nt},setClear:function(Nt,oe,ae,be,Ge){Ge===!0&&(Nt*=be,oe*=be,ae*=be),_t.set(Nt,oe,ae,be),Ot.equals(_t)===!1&&(s.clearColor(Nt,oe,ae,be),Ot.copy(_t))},reset:function(){B=!1,Mt=null,Ot.set(-1,0,0,0)}}}function r(){let B=!1,_t=null,Mt=null,Ot=null;return{setTest:function(Nt){Nt?St(s.DEPTH_TEST):mt(s.DEPTH_TEST)},setMask:function(Nt){_t!==Nt&&!B&&(s.depthMask(Nt),_t=Nt)},setFunc:function(Nt){if(Mt!==Nt){switch(Nt){case Ld:s.depthFunc(s.NEVER);break;case Id:s.depthFunc(s.ALWAYS);break;case Dd:s.depthFunc(s.LESS);break;case oo:s.depthFunc(s.LEQUAL);break;case Nd:s.depthFunc(s.EQUAL);break;case Ud:s.depthFunc(s.GEQUAL);break;case Fd:s.depthFunc(s.GREATER);break;case Od:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}Mt=Nt}},setLocked:function(Nt){B=Nt},setClear:function(Nt){Ot!==Nt&&(s.clearDepth(Nt),Ot=Nt)},reset:function(){B=!1,_t=null,Mt=null,Ot=null}}}function o(){let B=!1,_t=null,Mt=null,Ot=null,Nt=null,oe=null,ae=null,be=null,Ge=null;return{setTest:function(ce){B||(ce?St(s.STENCIL_TEST):mt(s.STENCIL_TEST))},setMask:function(ce){_t!==ce&&!B&&(s.stencilMask(ce),_t=ce)},setFunc:function(ce,He,vn){(Mt!==ce||Ot!==He||Nt!==vn)&&(s.stencilFunc(ce,He,vn),Mt=ce,Ot=He,Nt=vn)},setOp:function(ce,He,vn){(oe!==ce||ae!==He||be!==vn)&&(s.stencilOp(ce,He,vn),oe=ce,ae=He,be=vn)},setLocked:function(ce){B=ce},setClear:function(ce){Ge!==ce&&(s.clearStencil(ce),Ge=ce)},reset:function(){B=!1,_t=null,Mt=null,Ot=null,Nt=null,oe=null,ae=null,be=null,Ge=null}}}const a=new i,c=new r,l=new o,h=new WeakMap,d=new WeakMap;let u={},f={},g=new WeakMap,v=[],m=null,p=!1,x=null,y=null,_=null,M=null,S=null,b=null,L=null,w=new Ft(0,0,0),T=0,O=!1,D=null,z=null,C=null,I=null,U=null;const Y=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let G=!1,k=0;const Q=s.getParameter(s.VERSION);Q.indexOf("WebGL")!==-1?(k=parseFloat(/^WebGL (\d)/.exec(Q)[1]),G=k>=1):Q.indexOf("OpenGL ES")!==-1&&(k=parseFloat(/^OpenGL ES (\d)/.exec(Q)[1]),G=k>=2);let V=null,X={};const q=s.getParameter(s.SCISSOR_BOX),et=s.getParameter(s.VIEWPORT),ut=new Pe().fromArray(q),pt=new Pe().fromArray(et);function it(B,_t,Mt,Ot){const Nt=new Uint8Array(4),oe=s.createTexture();s.bindTexture(B,oe),s.texParameteri(B,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(B,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let ae=0;ae<Mt;ae++)n&&(B===s.TEXTURE_3D||B===s.TEXTURE_2D_ARRAY)?s.texImage3D(_t,0,s.RGBA,1,1,Ot,0,s.RGBA,s.UNSIGNED_BYTE,Nt):s.texImage2D(_t+ae,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,Nt);return oe}const vt={};vt[s.TEXTURE_2D]=it(s.TEXTURE_2D,s.TEXTURE_2D,1),vt[s.TEXTURE_CUBE_MAP]=it(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),n&&(vt[s.TEXTURE_2D_ARRAY]=it(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),vt[s.TEXTURE_3D]=it(s.TEXTURE_3D,s.TEXTURE_3D,1,1)),a.setClear(0,0,0,1),c.setClear(1),l.setClear(0),St(s.DEPTH_TEST),c.setFunc(oo),xt(!1),R(_c),St(s.CULL_FACE),tt(Bn);function St(B){u[B]!==!0&&(s.enable(B),u[B]=!0)}function mt(B){u[B]!==!1&&(s.disable(B),u[B]=!1)}function ht(B,_t){return f[B]!==_t?(s.bindFramebuffer(B,_t),f[B]=_t,n&&(B===s.DRAW_FRAMEBUFFER&&(f[s.FRAMEBUFFER]=_t),B===s.FRAMEBUFFER&&(f[s.DRAW_FRAMEBUFFER]=_t)),!0):!1}function F(B,_t){let Mt=v,Ot=!1;if(B)if(Mt=g.get(_t),Mt===void 0&&(Mt=[],g.set(_t,Mt)),B.isWebGLMultipleRenderTargets){const Nt=B.texture;if(Mt.length!==Nt.length||Mt[0]!==s.COLOR_ATTACHMENT0){for(let oe=0,ae=Nt.length;oe<ae;oe++)Mt[oe]=s.COLOR_ATTACHMENT0+oe;Mt.length=Nt.length,Ot=!0}}else Mt[0]!==s.COLOR_ATTACHMENT0&&(Mt[0]=s.COLOR_ATTACHMENT0,Ot=!0);else Mt[0]!==s.BACK&&(Mt[0]=s.BACK,Ot=!0);Ot&&(e.isWebGL2?s.drawBuffers(Mt):t.get("WEBGL_draw_buffers").drawBuffersWEBGL(Mt))}function at(B){return m!==B?(s.useProgram(B),m=B,!0):!1}const J={[pi]:s.FUNC_ADD,[gd]:s.FUNC_SUBTRACT,[vd]:s.FUNC_REVERSE_SUBTRACT};if(n)J[wc]=s.MIN,J[Ec]=s.MAX;else{const B=t.get("EXT_blend_minmax");B!==null&&(J[wc]=B.MIN_EXT,J[Ec]=B.MAX_EXT)}const lt={[xd]:s.ZERO,[yd]:s.ONE,[_d]:s.SRC_COLOR,[Pa]:s.SRC_ALPHA,[Td]:s.SRC_ALPHA_SATURATE,[Ed]:s.DST_COLOR,[Sd]:s.DST_ALPHA,[Md]:s.ONE_MINUS_SRC_COLOR,[La]:s.ONE_MINUS_SRC_ALPHA,[bd]:s.ONE_MINUS_DST_COLOR,[wd]:s.ONE_MINUS_DST_ALPHA,[Ad]:s.CONSTANT_COLOR,[Cd]:s.ONE_MINUS_CONSTANT_COLOR,[Rd]:s.CONSTANT_ALPHA,[Pd]:s.ONE_MINUS_CONSTANT_ALPHA};function tt(B,_t,Mt,Ot,Nt,oe,ae,be,Ge,ce){if(B===Bn){p===!0&&(mt(s.BLEND),p=!1);return}if(p===!1&&(St(s.BLEND),p=!0),B!==md){if(B!==x||ce!==O){if((y!==pi||S!==pi)&&(s.blendEquation(s.FUNC_ADD),y=pi,S=pi),ce)switch(B){case $i:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ra:s.blendFunc(s.ONE,s.ONE);break;case Mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sc:s.blendFuncSeparate(s.ZERO,s.SRC_COLOR,s.ZERO,s.SRC_ALPHA);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}else switch(B){case $i:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ra:s.blendFunc(s.SRC_ALPHA,s.ONE);break;case Mc:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case Sc:s.blendFunc(s.ZERO,s.SRC_COLOR);break;default:console.error("THREE.WebGLState: Invalid blending: ",B);break}_=null,M=null,b=null,L=null,w.set(0,0,0),T=0,x=B,O=ce}return}Nt=Nt||_t,oe=oe||Mt,ae=ae||Ot,(_t!==y||Nt!==S)&&(s.blendEquationSeparate(J[_t],J[Nt]),y=_t,S=Nt),(Mt!==_||Ot!==M||oe!==b||ae!==L)&&(s.blendFuncSeparate(lt[Mt],lt[Ot],lt[oe],lt[ae]),_=Mt,M=Ot,b=oe,L=ae),(be.equals(w)===!1||Ge!==T)&&(s.blendColor(be.r,be.g,be.b,Ge),w.copy(be),T=Ge),x=B,O=!1}function Ct(B,_t){B.side===De?mt(s.CULL_FACE):St(s.CULL_FACE);let Mt=B.side===Ve;_t&&(Mt=!Mt),xt(Mt),B.blending===$i&&B.transparent===!1?tt(Bn):tt(B.blending,B.blendEquation,B.blendSrc,B.blendDst,B.blendEquationAlpha,B.blendSrcAlpha,B.blendDstAlpha,B.blendColor,B.blendAlpha,B.premultipliedAlpha),c.setFunc(B.depthFunc),c.setTest(B.depthTest),c.setMask(B.depthWrite),a.setMask(B.colorWrite);const Ot=B.stencilWrite;l.setTest(Ot),Ot&&(l.setMask(B.stencilWriteMask),l.setFunc(B.stencilFunc,B.stencilRef,B.stencilFuncMask),l.setOp(B.stencilFail,B.stencilZFail,B.stencilZPass)),H(B.polygonOffset,B.polygonOffsetFactor,B.polygonOffsetUnits),B.alphaToCoverage===!0?St(s.SAMPLE_ALPHA_TO_COVERAGE):mt(s.SAMPLE_ALPHA_TO_COVERAGE)}function xt(B){D!==B&&(B?s.frontFace(s.CW):s.frontFace(s.CCW),D=B)}function R(B){B!==fd?(St(s.CULL_FACE),B!==z&&(B===_c?s.cullFace(s.BACK):B===pd?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):mt(s.CULL_FACE),z=B}function A(B){B!==C&&(G&&s.lineWidth(B),C=B)}function H(B,_t,Mt){B?(St(s.POLYGON_OFFSET_FILL),(I!==_t||U!==Mt)&&(s.polygonOffset(_t,Mt),I=_t,U=Mt)):mt(s.POLYGON_OFFSET_FILL)}function ot(B){B?St(s.SCISSOR_TEST):mt(s.SCISSOR_TEST)}function st(B){B===void 0&&(B=s.TEXTURE0+Y-1),V!==B&&(s.activeTexture(B),V=B)}function rt(B,_t,Mt){Mt===void 0&&(V===null?Mt=s.TEXTURE0+Y-1:Mt=V);let Ot=X[Mt];Ot===void 0&&(Ot={type:void 0,texture:void 0},X[Mt]=Ot),(Ot.type!==B||Ot.texture!==_t)&&(V!==Mt&&(s.activeTexture(Mt),V=Mt),s.bindTexture(B,_t||vt[B]),Ot.type=B,Ot.texture=_t)}function yt(){const B=X[V];B!==void 0&&B.type!==void 0&&(s.bindTexture(B.type,null),B.type=void 0,B.texture=void 0)}function gt(){try{s.compressedTexImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function wt(){try{s.compressedTexImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Dt(){try{s.texSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Wt(){try{s.texSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function ct(){try{s.compressedTexSubImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function te(){try{s.compressedTexSubImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Zt(){try{s.texStorage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Gt(){try{s.texStorage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function It(){try{s.texImage2D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Rt(){try{s.texImage3D.apply(s,arguments)}catch(B){console.error("THREE.WebGLState:",B)}}function Vt(B){ut.equals(B)===!1&&(s.scissor(B.x,B.y,B.z,B.w),ut.copy(B))}function ie(B){pt.equals(B)===!1&&(s.viewport(B.x,B.y,B.z,B.w),pt.copy(B))}function ge(B,_t){let Mt=d.get(_t);Mt===void 0&&(Mt=new WeakMap,d.set(_t,Mt));let Ot=Mt.get(B);Ot===void 0&&(Ot=s.getUniformBlockIndex(_t,B.name),Mt.set(B,Ot))}function Yt(B,_t){const Ot=d.get(_t).get(B);h.get(_t)!==Ot&&(s.uniformBlockBinding(_t,Ot,B.__bindingPointIndex),h.set(_t,Ot))}function dt(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),n===!0&&(s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null)),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},V=null,X={},f={},g=new WeakMap,v=[],m=null,p=!1,x=null,y=null,_=null,M=null,S=null,b=null,L=null,w=new Ft(0,0,0),T=0,O=!1,D=null,z=null,C=null,I=null,U=null,ut.set(0,0,s.canvas.width,s.canvas.height),pt.set(0,0,s.canvas.width,s.canvas.height),a.reset(),c.reset(),l.reset()}return{buffers:{color:a,depth:c,stencil:l},enable:St,disable:mt,bindFramebuffer:ht,drawBuffers:F,useProgram:at,setBlending:tt,setMaterial:Ct,setFlipSided:xt,setCullFace:R,setLineWidth:A,setPolygonOffset:H,setScissorTest:ot,activeTexture:st,bindTexture:rt,unbindTexture:yt,compressedTexImage2D:gt,compressedTexImage3D:wt,texImage2D:It,texImage3D:Rt,updateUBOMapping:ge,uniformBlockBinding:Yt,texStorage2D:Zt,texStorage3D:Gt,texSubImage2D:Dt,texSubImage3D:Wt,compressedTexSubImage2D:ct,compressedTexSubImage3D:te,scissor:Vt,viewport:ie,reset:dt}}function _v(s,t,e,n,i,r,o){const a=i.isWebGL2,c=t.has("WEBGL_multisampled_render_to_texture")?t.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),h=new WeakMap;let d;const u=new WeakMap;let f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(R,A){return f?new OffscreenCanvas(R,A):fo("canvas")}function v(R,A,H,ot){let st=1;if((R.width>ot||R.height>ot)&&(st=ot/Math.max(R.width,R.height)),st<1||A===!0)if(typeof HTMLImageElement<"u"&&R instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&R instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&R instanceof ImageBitmap){const rt=A?uo:Math.floor,yt=rt(st*R.width),gt=rt(st*R.height);d===void 0&&(d=g(yt,gt));const wt=H?g(yt,gt):d;return wt.width=yt,wt.height=gt,wt.getContext("2d").drawImage(R,0,0,yt,gt),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+R.width+"x"+R.height+") to ("+yt+"x"+gt+")."),wt}else return"data"in R&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+R.width+"x"+R.height+")."),R;return R}function m(R){return Oa(R.width)&&Oa(R.height)}function p(R){return a?!1:R.wrapS!==dn||R.wrapT!==dn||R.minFilter!==Ce&&R.minFilter!==Ke}function x(R,A){return R.generateMipmaps&&A&&R.minFilter!==Ce&&R.minFilter!==Ke}function y(R){s.generateMipmap(R)}function _(R,A,H,ot,st=!1){if(a===!1)return A;if(R!==null){if(s[R]!==void 0)return s[R];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+R+"'")}let rt=A;if(A===s.RED&&(H===s.FLOAT&&(rt=s.R32F),H===s.HALF_FLOAT&&(rt=s.R16F),H===s.UNSIGNED_BYTE&&(rt=s.R8)),A===s.RED_INTEGER&&(H===s.UNSIGNED_BYTE&&(rt=s.R8UI),H===s.UNSIGNED_SHORT&&(rt=s.R16UI),H===s.UNSIGNED_INT&&(rt=s.R32UI),H===s.BYTE&&(rt=s.R8I),H===s.SHORT&&(rt=s.R16I),H===s.INT&&(rt=s.R32I)),A===s.RG&&(H===s.FLOAT&&(rt=s.RG32F),H===s.HALF_FLOAT&&(rt=s.RG16F),H===s.UNSIGNED_BYTE&&(rt=s.RG8)),A===s.RGBA){const yt=st?ao:se.getTransfer(ot);H===s.FLOAT&&(rt=s.RGBA32F),H===s.HALF_FLOAT&&(rt=s.RGBA16F),H===s.UNSIGNED_BYTE&&(rt=yt===le?s.SRGB8_ALPHA8:s.RGBA8),H===s.UNSIGNED_SHORT_4_4_4_4&&(rt=s.RGBA4),H===s.UNSIGNED_SHORT_5_5_5_1&&(rt=s.RGB5_A1)}return(rt===s.R16F||rt===s.R32F||rt===s.RG16F||rt===s.RG32F||rt===s.RGBA16F||rt===s.RGBA32F)&&t.get("EXT_color_buffer_float"),rt}function M(R,A,H){return x(R,H)===!0||R.isFramebufferTexture&&R.minFilter!==Ce&&R.minFilter!==Ke?Math.log2(Math.max(A.width,A.height))+1:R.mipmaps!==void 0&&R.mipmaps.length>0?R.mipmaps.length:R.isCompressedTexture&&Array.isArray(R.image)?A.mipmaps.length:1}function S(R){return R===Ce||R===bc||R===Ro?s.NEAREST:s.LINEAR}function b(R){const A=R.target;A.removeEventListener("dispose",b),w(A),A.isVideoTexture&&h.delete(A)}function L(R){const A=R.target;A.removeEventListener("dispose",L),O(A)}function w(R){const A=n.get(R);if(A.__webglInit===void 0)return;const H=R.source,ot=u.get(H);if(ot){const st=ot[A.__cacheKey];st.usedTimes--,st.usedTimes===0&&T(R),Object.keys(ot).length===0&&u.delete(H)}n.remove(R)}function T(R){const A=n.get(R);s.deleteTexture(A.__webglTexture);const H=R.source,ot=u.get(H);delete ot[A.__cacheKey],o.memory.textures--}function O(R){const A=R.texture,H=n.get(R),ot=n.get(A);if(ot.__webglTexture!==void 0&&(s.deleteTexture(ot.__webglTexture),o.memory.textures--),R.depthTexture&&R.depthTexture.dispose(),R.isWebGLCubeRenderTarget)for(let st=0;st<6;st++){if(Array.isArray(H.__webglFramebuffer[st]))for(let rt=0;rt<H.__webglFramebuffer[st].length;rt++)s.deleteFramebuffer(H.__webglFramebuffer[st][rt]);else s.deleteFramebuffer(H.__webglFramebuffer[st]);H.__webglDepthbuffer&&s.deleteRenderbuffer(H.__webglDepthbuffer[st])}else{if(Array.isArray(H.__webglFramebuffer))for(let st=0;st<H.__webglFramebuffer.length;st++)s.deleteFramebuffer(H.__webglFramebuffer[st]);else s.deleteFramebuffer(H.__webglFramebuffer);if(H.__webglDepthbuffer&&s.deleteRenderbuffer(H.__webglDepthbuffer),H.__webglMultisampledFramebuffer&&s.deleteFramebuffer(H.__webglMultisampledFramebuffer),H.__webglColorRenderbuffer)for(let st=0;st<H.__webglColorRenderbuffer.length;st++)H.__webglColorRenderbuffer[st]&&s.deleteRenderbuffer(H.__webglColorRenderbuffer[st]);H.__webglDepthRenderbuffer&&s.deleteRenderbuffer(H.__webglDepthRenderbuffer)}if(R.isWebGLMultipleRenderTargets)for(let st=0,rt=A.length;st<rt;st++){const yt=n.get(A[st]);yt.__webglTexture&&(s.deleteTexture(yt.__webglTexture),o.memory.textures--),n.remove(A[st])}n.remove(A),n.remove(R)}let D=0;function z(){D=0}function C(){const R=D;return R>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+R+" texture units while this GPU supports only "+i.maxTextures),D+=1,R}function I(R){const A=[];return A.push(R.wrapS),A.push(R.wrapT),A.push(R.wrapR||0),A.push(R.magFilter),A.push(R.minFilter),A.push(R.anisotropy),A.push(R.internalFormat),A.push(R.format),A.push(R.type),A.push(R.generateMipmaps),A.push(R.premultiplyAlpha),A.push(R.flipY),A.push(R.unpackAlignment),A.push(R.colorSpace),A.join()}function U(R,A){const H=n.get(R);if(R.isVideoTexture&&Ct(R),R.isRenderTargetTexture===!1&&R.version>0&&H.__version!==R.version){const ot=R.image;if(ot===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(ot.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ut(H,R,A);return}}e.bindTexture(s.TEXTURE_2D,H.__webglTexture,s.TEXTURE0+A)}function Y(R,A){const H=n.get(R);if(R.version>0&&H.__version!==R.version){ut(H,R,A);return}e.bindTexture(s.TEXTURE_2D_ARRAY,H.__webglTexture,s.TEXTURE0+A)}function G(R,A){const H=n.get(R);if(R.version>0&&H.__version!==R.version){ut(H,R,A);return}e.bindTexture(s.TEXTURE_3D,H.__webglTexture,s.TEXTURE0+A)}function k(R,A){const H=n.get(R);if(R.version>0&&H.__version!==R.version){pt(H,R,A);return}e.bindTexture(s.TEXTURE_CUBE_MAP,H.__webglTexture,s.TEXTURE0+A)}const Q={[Je]:s.REPEAT,[dn]:s.CLAMP_TO_EDGE,[Na]:s.MIRRORED_REPEAT},V={[Ce]:s.NEAREST,[bc]:s.NEAREST_MIPMAP_NEAREST,[Ro]:s.NEAREST_MIPMAP_LINEAR,[Ke]:s.LINEAR,[Hd]:s.LINEAR_MIPMAP_NEAREST,[Bs]:s.LINEAR_MIPMAP_LINEAR},X={[$d]:s.NEVER,[of]:s.ALWAYS,[tf]:s.LESS,[jh]:s.LEQUAL,[ef]:s.EQUAL,[rf]:s.GEQUAL,[nf]:s.GREATER,[sf]:s.NOTEQUAL};function q(R,A,H){if(H?(s.texParameteri(R,s.TEXTURE_WRAP_S,Q[A.wrapS]),s.texParameteri(R,s.TEXTURE_WRAP_T,Q[A.wrapT]),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,Q[A.wrapR]),s.texParameteri(R,s.TEXTURE_MAG_FILTER,V[A.magFilter]),s.texParameteri(R,s.TEXTURE_MIN_FILTER,V[A.minFilter])):(s.texParameteri(R,s.TEXTURE_WRAP_S,s.CLAMP_TO_EDGE),s.texParameteri(R,s.TEXTURE_WRAP_T,s.CLAMP_TO_EDGE),(R===s.TEXTURE_3D||R===s.TEXTURE_2D_ARRAY)&&s.texParameteri(R,s.TEXTURE_WRAP_R,s.CLAMP_TO_EDGE),(A.wrapS!==dn||A.wrapT!==dn)&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping."),s.texParameteri(R,s.TEXTURE_MAG_FILTER,S(A.magFilter)),s.texParameteri(R,s.TEXTURE_MIN_FILTER,S(A.minFilter)),A.minFilter!==Ce&&A.minFilter!==Ke&&console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.")),A.compareFunction&&(s.texParameteri(R,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(R,s.TEXTURE_COMPARE_FUNC,X[A.compareFunction])),t.has("EXT_texture_filter_anisotropic")===!0){const ot=t.get("EXT_texture_filter_anisotropic");if(A.magFilter===Ce||A.minFilter!==Ro&&A.minFilter!==Bs||A.type===Jn&&t.has("OES_texture_float_linear")===!1||a===!1&&A.type===mn&&t.has("OES_texture_half_float_linear")===!1)return;(A.anisotropy>1||n.get(A).__currentAnisotropy)&&(s.texParameterf(R,ot.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(A.anisotropy,i.getMaxAnisotropy())),n.get(A).__currentAnisotropy=A.anisotropy)}}function et(R,A){let H=!1;R.__webglInit===void 0&&(R.__webglInit=!0,A.addEventListener("dispose",b));const ot=A.source;let st=u.get(ot);st===void 0&&(st={},u.set(ot,st));const rt=I(A);if(rt!==R.__cacheKey){st[rt]===void 0&&(st[rt]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,H=!0),st[rt].usedTimes++;const yt=st[R.__cacheKey];yt!==void 0&&(st[R.__cacheKey].usedTimes--,yt.usedTimes===0&&T(A)),R.__cacheKey=rt,R.__webglTexture=st[rt].texture}return H}function ut(R,A,H){let ot=s.TEXTURE_2D;(A.isDataArrayTexture||A.isCompressedArrayTexture)&&(ot=s.TEXTURE_2D_ARRAY),A.isData3DTexture&&(ot=s.TEXTURE_3D);const st=et(R,A),rt=A.source;e.bindTexture(ot,R.__webglTexture,s.TEXTURE0+H);const yt=n.get(rt);if(rt.version!==yt.__version||st===!0){e.activeTexture(s.TEXTURE0+H);const gt=se.getPrimaries(se.workingColorSpace),wt=A.colorSpace===on?null:se.getPrimaries(A.colorSpace),Dt=A.colorSpace===on||gt===wt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Dt);const Wt=p(A)&&m(A.image)===!1;let ct=v(A.image,Wt,!1,i.maxTextureSize);ct=xt(A,ct);const te=m(ct)||a,Zt=r.convert(A.format,A.colorSpace);let Gt=r.convert(A.type),It=_(A.internalFormat,Zt,Gt,A.colorSpace,A.isVideoTexture);q(ot,A,te);let Rt;const Vt=A.mipmaps,ie=a&&A.isVideoTexture!==!0&&It!==Xh,ge=yt.__version===void 0||st===!0,Yt=M(A,ct,te);if(A.isDepthTexture)It=s.DEPTH_COMPONENT,a?A.type===Jn?It=s.DEPTH_COMPONENT32F:A.type===Zn?It=s.DEPTH_COMPONENT24:A.type===vi?It=s.DEPTH24_STENCIL8:It=s.DEPTH_COMPONENT16:A.type===Jn&&console.error("WebGLRenderer: Floating point depth texture requires WebGL2."),A.format===xi&&It===s.DEPTH_COMPONENT&&A.type!==ja&&A.type!==Zn&&(console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture."),A.type=Zn,Gt=r.convert(A.type)),A.format===is&&It===s.DEPTH_COMPONENT&&(It=s.DEPTH_STENCIL,A.type!==vi&&(console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture."),A.type=vi,Gt=r.convert(A.type))),ge&&(ie?e.texStorage2D(s.TEXTURE_2D,1,It,ct.width,ct.height):e.texImage2D(s.TEXTURE_2D,0,It,ct.width,ct.height,0,Zt,Gt,null));else if(A.isDataTexture)if(Vt.length>0&&te){ie&&ge&&e.texStorage2D(s.TEXTURE_2D,Yt,It,Vt[0].width,Vt[0].height);for(let dt=0,B=Vt.length;dt<B;dt++)Rt=Vt[dt],ie?e.texSubImage2D(s.TEXTURE_2D,dt,0,0,Rt.width,Rt.height,Zt,Gt,Rt.data):e.texImage2D(s.TEXTURE_2D,dt,It,Rt.width,Rt.height,0,Zt,Gt,Rt.data);A.generateMipmaps=!1}else ie?(ge&&e.texStorage2D(s.TEXTURE_2D,Yt,It,ct.width,ct.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,ct.width,ct.height,Zt,Gt,ct.data)):e.texImage2D(s.TEXTURE_2D,0,It,ct.width,ct.height,0,Zt,Gt,ct.data);else if(A.isCompressedTexture)if(A.isCompressedArrayTexture){ie&&ge&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Yt,It,Vt[0].width,Vt[0].height,ct.depth);for(let dt=0,B=Vt.length;dt<B;dt++)Rt=Vt[dt],A.format!==fn?Zt!==null?ie?e.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,dt,0,0,0,Rt.width,Rt.height,ct.depth,Zt,Rt.data,0,0):e.compressedTexImage3D(s.TEXTURE_2D_ARRAY,dt,It,Rt.width,Rt.height,ct.depth,0,Rt.data,0,0):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?e.texSubImage3D(s.TEXTURE_2D_ARRAY,dt,0,0,0,Rt.width,Rt.height,ct.depth,Zt,Gt,Rt.data):e.texImage3D(s.TEXTURE_2D_ARRAY,dt,It,Rt.width,Rt.height,ct.depth,0,Zt,Gt,Rt.data)}else{ie&&ge&&e.texStorage2D(s.TEXTURE_2D,Yt,It,Vt[0].width,Vt[0].height);for(let dt=0,B=Vt.length;dt<B;dt++)Rt=Vt[dt],A.format!==fn?Zt!==null?ie?e.compressedTexSubImage2D(s.TEXTURE_2D,dt,0,0,Rt.width,Rt.height,Zt,Rt.data):e.compressedTexImage2D(s.TEXTURE_2D,dt,It,Rt.width,Rt.height,0,Rt.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):ie?e.texSubImage2D(s.TEXTURE_2D,dt,0,0,Rt.width,Rt.height,Zt,Gt,Rt.data):e.texImage2D(s.TEXTURE_2D,dt,It,Rt.width,Rt.height,0,Zt,Gt,Rt.data)}else if(A.isDataArrayTexture)ie?(ge&&e.texStorage3D(s.TEXTURE_2D_ARRAY,Yt,It,ct.width,ct.height,ct.depth),e.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,ct.width,ct.height,ct.depth,Zt,Gt,ct.data)):e.texImage3D(s.TEXTURE_2D_ARRAY,0,It,ct.width,ct.height,ct.depth,0,Zt,Gt,ct.data);else if(A.isData3DTexture)ie?(ge&&e.texStorage3D(s.TEXTURE_3D,Yt,It,ct.width,ct.height,ct.depth),e.texSubImage3D(s.TEXTURE_3D,0,0,0,0,ct.width,ct.height,ct.depth,Zt,Gt,ct.data)):e.texImage3D(s.TEXTURE_3D,0,It,ct.width,ct.height,ct.depth,0,Zt,Gt,ct.data);else if(A.isFramebufferTexture){if(ge)if(ie)e.texStorage2D(s.TEXTURE_2D,Yt,It,ct.width,ct.height);else{let dt=ct.width,B=ct.height;for(let _t=0;_t<Yt;_t++)e.texImage2D(s.TEXTURE_2D,_t,It,dt,B,0,Zt,Gt,null),dt>>=1,B>>=1}}else if(Vt.length>0&&te){ie&&ge&&e.texStorage2D(s.TEXTURE_2D,Yt,It,Vt[0].width,Vt[0].height);for(let dt=0,B=Vt.length;dt<B;dt++)Rt=Vt[dt],ie?e.texSubImage2D(s.TEXTURE_2D,dt,0,0,Zt,Gt,Rt):e.texImage2D(s.TEXTURE_2D,dt,It,Zt,Gt,Rt);A.generateMipmaps=!1}else ie?(ge&&e.texStorage2D(s.TEXTURE_2D,Yt,It,ct.width,ct.height),e.texSubImage2D(s.TEXTURE_2D,0,0,0,Zt,Gt,ct)):e.texImage2D(s.TEXTURE_2D,0,It,Zt,Gt,ct);x(A,te)&&y(ot),yt.__version=rt.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function pt(R,A,H){if(A.image.length!==6)return;const ot=et(R,A),st=A.source;e.bindTexture(s.TEXTURE_CUBE_MAP,R.__webglTexture,s.TEXTURE0+H);const rt=n.get(st);if(st.version!==rt.__version||ot===!0){e.activeTexture(s.TEXTURE0+H);const yt=se.getPrimaries(se.workingColorSpace),gt=A.colorSpace===on?null:se.getPrimaries(A.colorSpace),wt=A.colorSpace===on||yt===gt?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,A.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,A.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,A.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,wt);const Dt=A.isCompressedTexture||A.image[0].isCompressedTexture,Wt=A.image[0]&&A.image[0].isDataTexture,ct=[];for(let dt=0;dt<6;dt++)!Dt&&!Wt?ct[dt]=v(A.image[dt],!1,!0,i.maxCubemapSize):ct[dt]=Wt?A.image[dt].image:A.image[dt],ct[dt]=xt(A,ct[dt]);const te=ct[0],Zt=m(te)||a,Gt=r.convert(A.format,A.colorSpace),It=r.convert(A.type),Rt=_(A.internalFormat,Gt,It,A.colorSpace),Vt=a&&A.isVideoTexture!==!0,ie=rt.__version===void 0||ot===!0;let ge=M(A,te,Zt);q(s.TEXTURE_CUBE_MAP,A,Zt);let Yt;if(Dt){Vt&&ie&&e.texStorage2D(s.TEXTURE_CUBE_MAP,ge,Rt,te.width,te.height);for(let dt=0;dt<6;dt++){Yt=ct[dt].mipmaps;for(let B=0;B<Yt.length;B++){const _t=Yt[B];A.format!==fn?Gt!==null?Vt?e.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B,0,0,_t.width,_t.height,Gt,_t.data):e.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B,Rt,_t.width,_t.height,0,_t.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):Vt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B,0,0,_t.width,_t.height,Gt,It,_t.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B,Rt,_t.width,_t.height,0,Gt,It,_t.data)}}}else{Yt=A.mipmaps,Vt&&ie&&(Yt.length>0&&ge++,e.texStorage2D(s.TEXTURE_CUBE_MAP,ge,Rt,ct[0].width,ct[0].height));for(let dt=0;dt<6;dt++)if(Wt){Vt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,ct[dt].width,ct[dt].height,Gt,It,ct[dt].data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,Rt,ct[dt].width,ct[dt].height,0,Gt,It,ct[dt].data);for(let B=0;B<Yt.length;B++){const Mt=Yt[B].image[dt].image;Vt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B+1,0,0,Mt.width,Mt.height,Gt,It,Mt.data):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B+1,Rt,Mt.width,Mt.height,0,Gt,It,Mt.data)}}else{Vt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,0,0,Gt,It,ct[dt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,0,Rt,Gt,It,ct[dt]);for(let B=0;B<Yt.length;B++){const _t=Yt[B];Vt?e.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B+1,0,0,Gt,It,_t.image[dt]):e.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+dt,B+1,Rt,Gt,It,_t.image[dt])}}}x(A,Zt)&&y(s.TEXTURE_CUBE_MAP),rt.__version=st.version,A.onUpdate&&A.onUpdate(A)}R.__version=A.version}function it(R,A,H,ot,st,rt){const yt=r.convert(H.format,H.colorSpace),gt=r.convert(H.type),wt=_(H.internalFormat,yt,gt,H.colorSpace);if(!n.get(A).__hasExternalTextures){const Wt=Math.max(1,A.width>>rt),ct=Math.max(1,A.height>>rt);st===s.TEXTURE_3D||st===s.TEXTURE_2D_ARRAY?e.texImage3D(st,rt,wt,Wt,ct,A.depth,0,yt,gt,null):e.texImage2D(st,rt,wt,Wt,ct,0,yt,gt,null)}e.bindFramebuffer(s.FRAMEBUFFER,R),tt(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,ot,st,n.get(H).__webglTexture,0,lt(A)):(st===s.TEXTURE_2D||st>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&st<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,ot,st,n.get(H).__webglTexture,rt),e.bindFramebuffer(s.FRAMEBUFFER,null)}function vt(R,A,H){if(s.bindRenderbuffer(s.RENDERBUFFER,R),A.depthBuffer&&!A.stencilBuffer){let ot=a===!0?s.DEPTH_COMPONENT24:s.DEPTH_COMPONENT16;if(H||tt(A)){const st=A.depthTexture;st&&st.isDepthTexture&&(st.type===Jn?ot=s.DEPTH_COMPONENT32F:st.type===Zn&&(ot=s.DEPTH_COMPONENT24));const rt=lt(A);tt(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,rt,ot,A.width,A.height):s.renderbufferStorageMultisample(s.RENDERBUFFER,rt,ot,A.width,A.height)}else s.renderbufferStorage(s.RENDERBUFFER,ot,A.width,A.height);s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.RENDERBUFFER,R)}else if(A.depthBuffer&&A.stencilBuffer){const ot=lt(A);H&&tt(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,ot,s.DEPTH24_STENCIL8,A.width,A.height):tt(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,ot,s.DEPTH24_STENCIL8,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,s.DEPTH_STENCIL,A.width,A.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.RENDERBUFFER,R)}else{const ot=A.isWebGLMultipleRenderTargets===!0?A.texture:[A.texture];for(let st=0;st<ot.length;st++){const rt=ot[st],yt=r.convert(rt.format,rt.colorSpace),gt=r.convert(rt.type),wt=_(rt.internalFormat,yt,gt,rt.colorSpace),Dt=lt(A);H&&tt(A)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Dt,wt,A.width,A.height):tt(A)?c.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Dt,wt,A.width,A.height):s.renderbufferStorage(s.RENDERBUFFER,wt,A.width,A.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function St(R,A){if(A&&A.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(e.bindFramebuffer(s.FRAMEBUFFER,R),!(A.depthTexture&&A.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");(!n.get(A.depthTexture).__webglTexture||A.depthTexture.image.width!==A.width||A.depthTexture.image.height!==A.height)&&(A.depthTexture.image.width=A.width,A.depthTexture.image.height=A.height,A.depthTexture.needsUpdate=!0),U(A.depthTexture,0);const ot=n.get(A.depthTexture).__webglTexture,st=lt(A);if(A.depthTexture.format===xi)tt(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ot,0,st):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,ot,0);else if(A.depthTexture.format===is)tt(A)?c.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ot,0,st):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,ot,0);else throw new Error("Unknown depthTexture format")}function mt(R){const A=n.get(R),H=R.isWebGLCubeRenderTarget===!0;if(R.depthTexture&&!A.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");St(A.__webglFramebuffer,R)}else if(H){A.__webglDepthbuffer=[];for(let ot=0;ot<6;ot++)e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer[ot]),A.__webglDepthbuffer[ot]=s.createRenderbuffer(),vt(A.__webglDepthbuffer[ot],R,!1)}else e.bindFramebuffer(s.FRAMEBUFFER,A.__webglFramebuffer),A.__webglDepthbuffer=s.createRenderbuffer(),vt(A.__webglDepthbuffer,R,!1);e.bindFramebuffer(s.FRAMEBUFFER,null)}function ht(R,A,H){const ot=n.get(R);A!==void 0&&it(ot.__webglFramebuffer,R,R.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),H!==void 0&&mt(R)}function F(R){const A=R.texture,H=n.get(R),ot=n.get(A);R.addEventListener("dispose",L),R.isWebGLMultipleRenderTargets!==!0&&(ot.__webglTexture===void 0&&(ot.__webglTexture=s.createTexture()),ot.__version=A.version,o.memory.textures++);const st=R.isWebGLCubeRenderTarget===!0,rt=R.isWebGLMultipleRenderTargets===!0,yt=m(R)||a;if(st){H.__webglFramebuffer=[];for(let gt=0;gt<6;gt++)if(a&&A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer[gt]=[];for(let wt=0;wt<A.mipmaps.length;wt++)H.__webglFramebuffer[gt][wt]=s.createFramebuffer()}else H.__webglFramebuffer[gt]=s.createFramebuffer()}else{if(a&&A.mipmaps&&A.mipmaps.length>0){H.__webglFramebuffer=[];for(let gt=0;gt<A.mipmaps.length;gt++)H.__webglFramebuffer[gt]=s.createFramebuffer()}else H.__webglFramebuffer=s.createFramebuffer();if(rt)if(i.drawBuffers){const gt=R.texture;for(let wt=0,Dt=gt.length;wt<Dt;wt++){const Wt=n.get(gt[wt]);Wt.__webglTexture===void 0&&(Wt.__webglTexture=s.createTexture(),o.memory.textures++)}}else console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");if(a&&R.samples>0&&tt(R)===!1){const gt=rt?A:[A];H.__webglMultisampledFramebuffer=s.createFramebuffer(),H.__webglColorRenderbuffer=[],e.bindFramebuffer(s.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let wt=0;wt<gt.length;wt++){const Dt=gt[wt];H.__webglColorRenderbuffer[wt]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,H.__webglColorRenderbuffer[wt]);const Wt=r.convert(Dt.format,Dt.colorSpace),ct=r.convert(Dt.type),te=_(Dt.internalFormat,Wt,ct,Dt.colorSpace,R.isXRRenderTarget===!0),Zt=lt(R);s.renderbufferStorageMultisample(s.RENDERBUFFER,Zt,te,R.width,R.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+wt,s.RENDERBUFFER,H.__webglColorRenderbuffer[wt])}s.bindRenderbuffer(s.RENDERBUFFER,null),R.depthBuffer&&(H.__webglDepthRenderbuffer=s.createRenderbuffer(),vt(H.__webglDepthRenderbuffer,R,!0)),e.bindFramebuffer(s.FRAMEBUFFER,null)}}if(st){e.bindTexture(s.TEXTURE_CUBE_MAP,ot.__webglTexture),q(s.TEXTURE_CUBE_MAP,A,yt);for(let gt=0;gt<6;gt++)if(a&&A.mipmaps&&A.mipmaps.length>0)for(let wt=0;wt<A.mipmaps.length;wt++)it(H.__webglFramebuffer[gt][wt],R,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,wt);else it(H.__webglFramebuffer[gt],R,A,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+gt,0);x(A,yt)&&y(s.TEXTURE_CUBE_MAP),e.unbindTexture()}else if(rt){const gt=R.texture;for(let wt=0,Dt=gt.length;wt<Dt;wt++){const Wt=gt[wt],ct=n.get(Wt);e.bindTexture(s.TEXTURE_2D,ct.__webglTexture),q(s.TEXTURE_2D,Wt,yt),it(H.__webglFramebuffer,R,Wt,s.COLOR_ATTACHMENT0+wt,s.TEXTURE_2D,0),x(Wt,yt)&&y(s.TEXTURE_2D)}e.unbindTexture()}else{let gt=s.TEXTURE_2D;if((R.isWebGL3DRenderTarget||R.isWebGLArrayRenderTarget)&&(a?gt=R.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY:console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.")),e.bindTexture(gt,ot.__webglTexture),q(gt,A,yt),a&&A.mipmaps&&A.mipmaps.length>0)for(let wt=0;wt<A.mipmaps.length;wt++)it(H.__webglFramebuffer[wt],R,A,s.COLOR_ATTACHMENT0,gt,wt);else it(H.__webglFramebuffer,R,A,s.COLOR_ATTACHMENT0,gt,0);x(A,yt)&&y(gt),e.unbindTexture()}R.depthBuffer&&mt(R)}function at(R){const A=m(R)||a,H=R.isWebGLMultipleRenderTargets===!0?R.texture:[R.texture];for(let ot=0,st=H.length;ot<st;ot++){const rt=H[ot];if(x(rt,A)){const yt=R.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:s.TEXTURE_2D,gt=n.get(rt).__webglTexture;e.bindTexture(yt,gt),y(yt),e.unbindTexture()}}}function J(R){if(a&&R.samples>0&&tt(R)===!1){const A=R.isWebGLMultipleRenderTargets?R.texture:[R.texture],H=R.width,ot=R.height;let st=s.COLOR_BUFFER_BIT;const rt=[],yt=R.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,gt=n.get(R),wt=R.isWebGLMultipleRenderTargets===!0;if(wt)for(let Dt=0;Dt<A.length;Dt++)e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,null),e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,null,0);e.bindFramebuffer(s.READ_FRAMEBUFFER,gt.__webglMultisampledFramebuffer),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,gt.__webglFramebuffer);for(let Dt=0;Dt<A.length;Dt++){rt.push(s.COLOR_ATTACHMENT0+Dt),R.depthBuffer&&rt.push(yt);const Wt=gt.__ignoreDepthValues!==void 0?gt.__ignoreDepthValues:!1;if(Wt===!1&&(R.depthBuffer&&(st|=s.DEPTH_BUFFER_BIT),R.stencilBuffer&&(st|=s.STENCIL_BUFFER_BIT)),wt&&s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,gt.__webglColorRenderbuffer[Dt]),Wt===!0&&(s.invalidateFramebuffer(s.READ_FRAMEBUFFER,[yt]),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[yt])),wt){const ct=n.get(A[Dt]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,ct,0)}s.blitFramebuffer(0,0,H,ot,0,0,H,ot,st,s.NEAREST),l&&s.invalidateFramebuffer(s.READ_FRAMEBUFFER,rt)}if(e.bindFramebuffer(s.READ_FRAMEBUFFER,null),e.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),wt)for(let Dt=0;Dt<A.length;Dt++){e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.RENDERBUFFER,gt.__webglColorRenderbuffer[Dt]);const Wt=n.get(A[Dt]).__webglTexture;e.bindFramebuffer(s.FRAMEBUFFER,gt.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Dt,s.TEXTURE_2D,Wt,0)}e.bindFramebuffer(s.DRAW_FRAMEBUFFER,gt.__webglMultisampledFramebuffer)}}function lt(R){return Math.min(i.maxSamples,R.samples)}function tt(R){const A=n.get(R);return a&&R.samples>0&&t.has("WEBGL_multisampled_render_to_texture")===!0&&A.__useRenderToTexture!==!1}function Ct(R){const A=o.render.frame;h.get(R)!==A&&(h.set(R,A),R.update())}function xt(R,A){const H=R.colorSpace,ot=R.format,st=R.type;return R.isCompressedTexture===!0||R.isVideoTexture===!0||R.format===Fa||H!==Hn&&H!==on&&(se.getTransfer(H)===le?a===!1?t.has("EXT_sRGB")===!0&&ot===fn?(R.format=Fa,R.minFilter=Ke,R.generateMipmaps=!1):A=Zh.sRGBToLinear(A):(ot!==fn||st!==ti)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),A}this.allocateTextureUnit=C,this.resetTextureUnits=z,this.setTexture2D=U,this.setTexture2DArray=Y,this.setTexture3D=G,this.setTextureCube=k,this.rebindTextures=ht,this.setupRenderTarget=F,this.updateRenderTargetMipmap=at,this.updateMultisampleRenderTarget=J,this.setupDepthRenderbuffer=mt,this.setupFrameBufferTexture=it,this.useMultisampledRTT=tt}function Mv(s,t,e){const n=e.isWebGL2;function i(r,o=on){let a;const c=se.getTransfer(o);if(r===ti)return s.UNSIGNED_BYTE;if(r===Gh)return s.UNSIGNED_SHORT_4_4_4_4;if(r===Hh)return s.UNSIGNED_SHORT_5_5_5_1;if(r===Wd)return s.BYTE;if(r===kd)return s.SHORT;if(r===ja)return s.UNSIGNED_SHORT;if(r===Bh)return s.INT;if(r===Zn)return s.UNSIGNED_INT;if(r===Jn)return s.FLOAT;if(r===mn)return n?s.HALF_FLOAT:(a=t.get("OES_texture_half_float"),a!==null?a.HALF_FLOAT_OES:null);if(r===Vd)return s.ALPHA;if(r===fn)return s.RGBA;if(r===Xd)return s.LUMINANCE;if(r===qd)return s.LUMINANCE_ALPHA;if(r===xi)return s.DEPTH_COMPONENT;if(r===is)return s.DEPTH_STENCIL;if(r===Fa)return a=t.get("EXT_sRGB"),a!==null?a.SRGB_ALPHA_EXT:null;if(r===Yd)return s.RED;if(r===Wh)return s.RED_INTEGER;if(r===jd)return s.RG;if(r===kh)return s.RG_INTEGER;if(r===Vh)return s.RGBA_INTEGER;if(r===Po||r===Lo||r===Io||r===Do)if(c===le)if(a=t.get("WEBGL_compressed_texture_s3tc_srgb"),a!==null){if(r===Po)return a.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(r===Lo)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(r===Io)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(r===Do)return a.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(a=t.get("WEBGL_compressed_texture_s3tc"),a!==null){if(r===Po)return a.COMPRESSED_RGB_S3TC_DXT1_EXT;if(r===Lo)return a.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(r===Io)return a.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(r===Do)return a.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(r===Tc||r===Ac||r===Cc||r===Rc)if(a=t.get("WEBGL_compressed_texture_pvrtc"),a!==null){if(r===Tc)return a.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(r===Ac)return a.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(r===Cc)return a.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(r===Rc)return a.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(r===Xh)return a=t.get("WEBGL_compressed_texture_etc1"),a!==null?a.COMPRESSED_RGB_ETC1_WEBGL:null;if(r===Pc||r===Lc)if(a=t.get("WEBGL_compressed_texture_etc"),a!==null){if(r===Pc)return c===le?a.COMPRESSED_SRGB8_ETC2:a.COMPRESSED_RGB8_ETC2;if(r===Lc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:a.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(r===Ic||r===Dc||r===Nc||r===Uc||r===Fc||r===Oc||r===zc||r===Bc||r===Gc||r===Hc||r===Wc||r===kc||r===Vc||r===Xc)if(a=t.get("WEBGL_compressed_texture_astc"),a!==null){if(r===Ic)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:a.COMPRESSED_RGBA_ASTC_4x4_KHR;if(r===Dc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:a.COMPRESSED_RGBA_ASTC_5x4_KHR;if(r===Nc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:a.COMPRESSED_RGBA_ASTC_5x5_KHR;if(r===Uc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:a.COMPRESSED_RGBA_ASTC_6x5_KHR;if(r===Fc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:a.COMPRESSED_RGBA_ASTC_6x6_KHR;if(r===Oc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:a.COMPRESSED_RGBA_ASTC_8x5_KHR;if(r===zc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:a.COMPRESSED_RGBA_ASTC_8x6_KHR;if(r===Bc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:a.COMPRESSED_RGBA_ASTC_8x8_KHR;if(r===Gc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:a.COMPRESSED_RGBA_ASTC_10x5_KHR;if(r===Hc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:a.COMPRESSED_RGBA_ASTC_10x6_KHR;if(r===Wc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:a.COMPRESSED_RGBA_ASTC_10x8_KHR;if(r===kc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:a.COMPRESSED_RGBA_ASTC_10x10_KHR;if(r===Vc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:a.COMPRESSED_RGBA_ASTC_12x10_KHR;if(r===Xc)return c===le?a.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:a.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(r===No||r===qc||r===Yc)if(a=t.get("EXT_texture_compression_bptc"),a!==null){if(r===No)return c===le?a.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:a.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(r===qc)return a.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(r===Yc)return a.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(r===Kd||r===jc||r===Kc||r===Zc)if(a=t.get("EXT_texture_compression_rgtc"),a!==null){if(r===No)return a.COMPRESSED_RED_RGTC1_EXT;if(r===jc)return a.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(r===Kc)return a.COMPRESSED_RED_GREEN_RGTC2_EXT;if(r===Zc)return a.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return r===vi?n?s.UNSIGNED_INT_24_8:(a=t.get("WEBGL_depth_texture"),a!==null?a.UNSIGNED_INT_24_8_WEBGL:null):s[r]!==void 0?s[r]:null}return{convert:i}}class Sv extends Ze{constructor(t=[]){super(),this.isArrayCamera=!0,this.cameras=t}}class de extends Ie{constructor(){super(),this.isGroup=!0,this.type="Group"}}const wv={type:"move"};class ia{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new de,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new de,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new N,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new N),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new de,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new N,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new N),this._grip}dispatchEvent(t){return this._targetRay!==null&&this._targetRay.dispatchEvent(t),this._grip!==null&&this._grip.dispatchEvent(t),this._hand!==null&&this._hand.dispatchEvent(t),this}connect(t){if(t&&t.hand){const e=this._hand;if(e)for(const n of t.hand.values())this._getHandJoint(e,n)}return this.dispatchEvent({type:"connected",data:t}),this}disconnect(t){return this.dispatchEvent({type:"disconnected",data:t}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(t,e,n){let i=null,r=null,o=null;const a=this._targetRay,c=this._grip,l=this._hand;if(t&&e.session.visibilityState!=="visible-blurred"){if(l&&t.hand){o=!0;for(const v of t.hand.values()){const m=e.getJointPose(v,n),p=this._getHandJoint(l,v);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}const h=l.joints["index-finger-tip"],d=l.joints["thumb-tip"],u=h.position.distanceTo(d.position),f=.02,g=.005;l.inputState.pinching&&u>f+g?(l.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:t.handedness,target:this})):!l.inputState.pinching&&u<=f-g&&(l.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:t.handedness,target:this}))}else c!==null&&t.gripSpace&&(r=e.getPose(t.gripSpace,n),r!==null&&(c.matrix.fromArray(r.transform.matrix),c.matrix.decompose(c.position,c.rotation,c.scale),c.matrixWorldNeedsUpdate=!0,r.linearVelocity?(c.hasLinearVelocity=!0,c.linearVelocity.copy(r.linearVelocity)):c.hasLinearVelocity=!1,r.angularVelocity?(c.hasAngularVelocity=!0,c.angularVelocity.copy(r.angularVelocity)):c.hasAngularVelocity=!1));a!==null&&(i=e.getPose(t.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(wv)))}return a!==null&&(a.visible=i!==null),c!==null&&(c.visible=r!==null),l!==null&&(l.visible=o!==null),this}_getHandJoint(t,e){if(t.joints[e.jointName]===void 0){const n=new de;n.matrixAutoUpdate=!1,n.visible=!1,t.joints[e.jointName]=n,t.add(n)}return t.joints[e.jointName]}}class Ev extends as{constructor(t,e){super();const n=this;let i=null,r=1,o=null,a="local-floor",c=1,l=null,h=null,d=null,u=null,f=null,g=null;const v=e.getContextAttributes();let m=null,p=null;const x=[],y=[],_=new nt;let M=null;const S=new Ze;S.layers.enable(1),S.viewport=new Pe;const b=new Ze;b.layers.enable(2),b.viewport=new Pe;const L=[S,b],w=new Sv;w.layers.enable(1),w.layers.enable(2);let T=null,O=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(q){let et=x[q];return et===void 0&&(et=new ia,x[q]=et),et.getTargetRaySpace()},this.getControllerGrip=function(q){let et=x[q];return et===void 0&&(et=new ia,x[q]=et),et.getGripSpace()},this.getHand=function(q){let et=x[q];return et===void 0&&(et=new ia,x[q]=et),et.getHandSpace()};function D(q){const et=y.indexOf(q.inputSource);if(et===-1)return;const ut=x[et];ut!==void 0&&(ut.update(q.inputSource,q.frame,l||o),ut.dispatchEvent({type:q.type,data:q.inputSource}))}function z(){i.removeEventListener("select",D),i.removeEventListener("selectstart",D),i.removeEventListener("selectend",D),i.removeEventListener("squeeze",D),i.removeEventListener("squeezestart",D),i.removeEventListener("squeezeend",D),i.removeEventListener("end",z),i.removeEventListener("inputsourceschange",C);for(let q=0;q<x.length;q++){const et=y[q];et!==null&&(y[q]=null,x[q].disconnect(et))}T=null,O=null,t.setRenderTarget(m),f=null,u=null,d=null,i=null,p=null,X.stop(),n.isPresenting=!1,t.setPixelRatio(M),t.setSize(_.width,_.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(q){r=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(q){a=q,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return l||o},this.setReferenceSpace=function(q){l=q},this.getBaseLayer=function(){return u!==null?u:f},this.getBinding=function(){return d},this.getFrame=function(){return g},this.getSession=function(){return i},this.setSession=async function(q){if(i=q,i!==null){if(m=t.getRenderTarget(),i.addEventListener("select",D),i.addEventListener("selectstart",D),i.addEventListener("selectend",D),i.addEventListener("squeeze",D),i.addEventListener("squeezestart",D),i.addEventListener("squeezeend",D),i.addEventListener("end",z),i.addEventListener("inputsourceschange",C),v.xrCompatible!==!0&&await e.makeXRCompatible(),M=t.getPixelRatio(),t.getSize(_),i.renderState.layers===void 0||t.capabilities.isWebGL2===!1){const et={antialias:i.renderState.layers===void 0?v.antialias:!0,alpha:!0,depth:v.depth,stencil:v.stencil,framebufferScaleFactor:r};f=new XRWebGLLayer(i,e,et),i.updateRenderState({baseLayer:f}),t.setPixelRatio(1),t.setSize(f.framebufferWidth,f.framebufferHeight,!1),p=new Qe(f.framebufferWidth,f.framebufferHeight,{format:fn,type:ti,colorSpace:t.outputColorSpace,stencilBuffer:v.stencil})}else{let et=null,ut=null,pt=null;v.depth&&(pt=v.stencil?e.DEPTH24_STENCIL8:e.DEPTH_COMPONENT24,et=v.stencil?is:xi,ut=v.stencil?vi:Zn);const it={colorFormat:e.RGBA8,depthFormat:pt,scaleFactor:r};d=new XRWebGLBinding(i,e),u=d.createProjectionLayer(it),i.updateRenderState({layers:[u]}),t.setPixelRatio(1),t.setSize(u.textureWidth,u.textureHeight,!1),p=new Qe(u.textureWidth,u.textureHeight,{format:fn,type:ti,depthTexture:new au(u.textureWidth,u.textureHeight,ut,void 0,void 0,void 0,void 0,void 0,void 0,et),stencilBuffer:v.stencil,colorSpace:t.outputColorSpace,samples:v.antialias?4:0});const vt=t.properties.get(p);vt.__ignoreDepthValues=u.ignoreDepthValues}p.isXRRenderTarget=!0,this.setFoveation(c),l=null,o=await i.requestReferenceSpace(a),X.setContext(i),X.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode};function C(q){for(let et=0;et<q.removed.length;et++){const ut=q.removed[et],pt=y.indexOf(ut);pt>=0&&(y[pt]=null,x[pt].disconnect(ut))}for(let et=0;et<q.added.length;et++){const ut=q.added[et];let pt=y.indexOf(ut);if(pt===-1){for(let vt=0;vt<x.length;vt++)if(vt>=y.length){y.push(ut),pt=vt;break}else if(y[vt]===null){y[vt]=ut,pt=vt;break}if(pt===-1)break}const it=x[pt];it&&it.connect(ut)}}const I=new N,U=new N;function Y(q,et,ut){I.setFromMatrixPosition(et.matrixWorld),U.setFromMatrixPosition(ut.matrixWorld);const pt=I.distanceTo(U),it=et.projectionMatrix.elements,vt=ut.projectionMatrix.elements,St=it[14]/(it[10]-1),mt=it[14]/(it[10]+1),ht=(it[9]+1)/it[5],F=(it[9]-1)/it[5],at=(it[8]-1)/it[0],J=(vt[8]+1)/vt[0],lt=St*at,tt=St*J,Ct=pt/(-at+J),xt=Ct*-at;et.matrixWorld.decompose(q.position,q.quaternion,q.scale),q.translateX(xt),q.translateZ(Ct),q.matrixWorld.compose(q.position,q.quaternion,q.scale),q.matrixWorldInverse.copy(q.matrixWorld).invert();const R=St+Ct,A=mt+Ct,H=lt-xt,ot=tt+(pt-xt),st=ht*mt/A*R,rt=F*mt/A*R;q.projectionMatrix.makePerspective(H,ot,st,rt,R,A),q.projectionMatrixInverse.copy(q.projectionMatrix).invert()}function G(q,et){et===null?q.matrixWorld.copy(q.matrix):q.matrixWorld.multiplyMatrices(et.matrixWorld,q.matrix),q.matrixWorldInverse.copy(q.matrixWorld).invert()}this.updateCamera=function(q){if(i===null)return;w.near=b.near=S.near=q.near,w.far=b.far=S.far=q.far,(T!==w.near||O!==w.far)&&(i.updateRenderState({depthNear:w.near,depthFar:w.far}),T=w.near,O=w.far);const et=q.parent,ut=w.cameras;G(w,et);for(let pt=0;pt<ut.length;pt++)G(ut[pt],et);ut.length===2?Y(w,S,b):w.projectionMatrix.copy(S.projectionMatrix),k(q,w,et)};function k(q,et,ut){ut===null?q.matrix.copy(et.matrixWorld):(q.matrix.copy(ut.matrixWorld),q.matrix.invert(),q.matrix.multiply(et.matrixWorld)),q.matrix.decompose(q.position,q.quaternion,q.scale),q.updateMatrixWorld(!0),q.projectionMatrix.copy(et.projectionMatrix),q.projectionMatrixInverse.copy(et.projectionMatrixInverse),q.isPerspectiveCamera&&(q.fov=Gs*2*Math.atan(1/q.projectionMatrix.elements[5]),q.zoom=1)}this.getCamera=function(){return w},this.getFoveation=function(){if(!(u===null&&f===null))return c},this.setFoveation=function(q){c=q,u!==null&&(u.fixedFoveation=q),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=q)};let Q=null;function V(q,et){if(h=et.getViewerPose(l||o),g=et,h!==null){const ut=h.views;f!==null&&(t.setRenderTargetFramebuffer(p,f.framebuffer),t.setRenderTarget(p));let pt=!1;ut.length!==w.cameras.length&&(w.cameras.length=0,pt=!0);for(let it=0;it<ut.length;it++){const vt=ut[it];let St=null;if(f!==null)St=f.getViewport(vt);else{const ht=d.getViewSubImage(u,vt);St=ht.viewport,it===0&&(t.setRenderTargetTextures(p,ht.colorTexture,u.ignoreDepthValues?void 0:ht.depthStencilTexture),t.setRenderTarget(p))}let mt=L[it];mt===void 0&&(mt=new Ze,mt.layers.enable(it),mt.viewport=new Pe,L[it]=mt),mt.matrix.fromArray(vt.transform.matrix),mt.matrix.decompose(mt.position,mt.quaternion,mt.scale),mt.projectionMatrix.fromArray(vt.projectionMatrix),mt.projectionMatrixInverse.copy(mt.projectionMatrix).invert(),mt.viewport.set(St.x,St.y,St.width,St.height),it===0&&(w.matrix.copy(mt.matrix),w.matrix.decompose(w.position,w.quaternion,w.scale)),pt===!0&&w.cameras.push(mt)}}for(let ut=0;ut<x.length;ut++){const pt=y[ut],it=x[ut];pt!==null&&it!==void 0&&it.update(pt,et,l||o)}Q&&Q(q,et),et.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:et}),g=null}const X=new ou;X.setAnimationLoop(V),this.setAnimationLoop=function(q){Q=q},this.dispose=function(){}}}function bv(s,t){function e(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function n(m,p){p.color.getRGB(m.fogColor.value,iu(s)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function i(m,p,x,y,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(m,p):p.isMeshToonMaterial?(r(m,p),d(m,p)):p.isMeshPhongMaterial?(r(m,p),h(m,p)):p.isMeshStandardMaterial?(r(m,p),u(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(r(m,p),g(m,p)):p.isMeshDepthMaterial?r(m,p):p.isMeshDistanceMaterial?(r(m,p),v(m,p)):p.isMeshNormalMaterial?r(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?c(m,p,x,y):p.isSpriteMaterial?l(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,e(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===Ve&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,e(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===Ve&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,e(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,e(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,e(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);const x=t.get(p).envMap;if(x&&(m.envMap.value=x,m.flipEnvMap.value=x.isCubeTexture&&x.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap){m.lightMap.value=p.lightMap;const y=s._useLegacyLights===!0?Math.PI:1;m.lightMapIntensity.value=p.lightMapIntensity*y,e(p.lightMap,m.lightMapTransform)}p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,e(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function c(m,p,x,y){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*x,m.scale.value=y*.5,p.map&&(m.map.value=p.map,e(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function l(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,e(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,e(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function d(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function u(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,e(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,e(p.roughnessMap,m.roughnessMapTransform)),t.get(p).envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,x){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,e(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,e(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,e(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,e(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,e(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Ve&&m.clearcoatNormalScale.value.negate())),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,e(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,e(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=x.texture,m.transmissionSamplerSize.value.set(x.width,x.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,e(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,e(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,e(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,e(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,e(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function v(m,p){const x=t.get(p).light;m.referencePosition.value.setFromMatrixPosition(x.matrixWorld),m.nearDistance.value=x.shadow.camera.near,m.farDistance.value=x.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Tv(s,t,e,n){let i={},r={},o=[];const a=e.isWebGL2?s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS):0;function c(x,y){const _=y.program;n.uniformBlockBinding(x,_)}function l(x,y){let _=i[x.id];_===void 0&&(g(x),_=h(x),i[x.id]=_,x.addEventListener("dispose",m));const M=y.program;n.updateUBOMapping(x,M);const S=t.render.frame;r[x.id]!==S&&(u(x),r[x.id]=S)}function h(x){const y=d();x.__bindingPointIndex=y;const _=s.createBuffer(),M=x.__size,S=x.usage;return s.bindBuffer(s.UNIFORM_BUFFER,_),s.bufferData(s.UNIFORM_BUFFER,M,S),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,y,_),_}function d(){for(let x=0;x<a;x++)if(o.indexOf(x)===-1)return o.push(x),x;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function u(x){const y=i[x.id],_=x.uniforms,M=x.__cache;s.bindBuffer(s.UNIFORM_BUFFER,y);for(let S=0,b=_.length;S<b;S++){const L=Array.isArray(_[S])?_[S]:[_[S]];for(let w=0,T=L.length;w<T;w++){const O=L[w];if(f(O,S,w,M)===!0){const D=O.__offset,z=Array.isArray(O.value)?O.value:[O.value];let C=0;for(let I=0;I<z.length;I++){const U=z[I],Y=v(U);typeof U=="number"||typeof U=="boolean"?(O.__data[0]=U,s.bufferSubData(s.UNIFORM_BUFFER,D+C,O.__data)):U.isMatrix3?(O.__data[0]=U.elements[0],O.__data[1]=U.elements[1],O.__data[2]=U.elements[2],O.__data[3]=0,O.__data[4]=U.elements[3],O.__data[5]=U.elements[4],O.__data[6]=U.elements[5],O.__data[7]=0,O.__data[8]=U.elements[6],O.__data[9]=U.elements[7],O.__data[10]=U.elements[8],O.__data[11]=0):(U.toArray(O.__data,C),C+=Y.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,D,O.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function f(x,y,_,M){const S=x.value,b=y+"_"+_;if(M[b]===void 0)return typeof S=="number"||typeof S=="boolean"?M[b]=S:M[b]=S.clone(),!0;{const L=M[b];if(typeof S=="number"||typeof S=="boolean"){if(L!==S)return M[b]=S,!0}else if(L.equals(S)===!1)return L.copy(S),!0}return!1}function g(x){const y=x.uniforms;let _=0;const M=16;for(let b=0,L=y.length;b<L;b++){const w=Array.isArray(y[b])?y[b]:[y[b]];for(let T=0,O=w.length;T<O;T++){const D=w[T],z=Array.isArray(D.value)?D.value:[D.value];for(let C=0,I=z.length;C<I;C++){const U=z[C],Y=v(U),G=_%M;G!==0&&M-G<Y.boundary&&(_+=M-G),D.__data=new Float32Array(Y.storage/Float32Array.BYTES_PER_ELEMENT),D.__offset=_,_+=Y.storage}}}const S=_%M;return S>0&&(_+=M-S),x.__size=_,x.__cache={},this}function v(x){const y={boundary:0,storage:0};return typeof x=="number"||typeof x=="boolean"?(y.boundary=4,y.storage=4):x.isVector2?(y.boundary=8,y.storage=8):x.isVector3||x.isColor?(y.boundary=16,y.storage=12):x.isVector4?(y.boundary=16,y.storage=16):x.isMatrix3?(y.boundary=48,y.storage=48):x.isMatrix4?(y.boundary=64,y.storage=64):x.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",x),y}function m(x){const y=x.target;y.removeEventListener("dispose",m);const _=o.indexOf(y.__bindingPointIndex);o.splice(_,1),s.deleteBuffer(i[y.id]),delete i[y.id],delete r[y.id]}function p(){for(const x in i)s.deleteBuffer(i[x]);o=[],i={},r={}}return{bind:c,update:l,dispose:p}}class fu{constructor(t={}){const{canvas:e=Sf(),context:n=null,depth:i=!0,stencil:r=!0,alpha:o=!1,antialias:a=!1,premultipliedAlpha:c=!0,preserveDrawingBuffer:l=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:d=!1}=t;this.isWebGLRenderer=!0;let u;n!==null?u=n.getContextAttributes().alpha:u=o;const f=new Uint32Array(4),g=new Int32Array(4);let v=null,m=null;const p=[],x=[];this.domElement=e,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this._outputColorSpace=$t,this._useLegacyLights=!1,this.toneMapping=$n,this.toneMappingExposure=1;const y=this;let _=!1,M=0,S=0,b=null,L=-1,w=null;const T=new Pe,O=new Pe;let D=null;const z=new Ft(0);let C=0,I=e.width,U=e.height,Y=1,G=null,k=null;const Q=new Pe(0,0,I,U),V=new Pe(0,0,I,U);let X=!1;const q=new Ja;let et=!1,ut=!1,pt=null;const it=new ne,vt=new nt,St=new N,mt={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};function ht(){return b===null?Y:1}let F=n;function at(P,W){for(let K=0;K<P.length;K++){const Z=P[K],j=e.getContext(Z,W);if(j!==null)return j}return null}try{const P={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:c,preserveDrawingBuffer:l,powerPreference:h,failIfMajorPerformanceCaveat:d};if("setAttribute"in e&&e.setAttribute("data-engine",`three.js r${qa}`),e.addEventListener("webglcontextlost",dt,!1),e.addEventListener("webglcontextrestored",B,!1),e.addEventListener("webglcontextcreationerror",_t,!1),F===null){const W=["webgl2","webgl","experimental-webgl"];if(y.isWebGL1Renderer===!0&&W.shift(),F=at(W,P),F===null)throw at(W)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}typeof WebGLRenderingContext<"u"&&F instanceof WebGLRenderingContext&&console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163."),F.getShaderPrecisionFormat===void 0&&(F.getShaderPrecisionFormat=function(){return{rangeMin:1,rangeMax:1,precision:1}})}catch(P){throw console.error("THREE.WebGLRenderer: "+P.message),P}let J,lt,tt,Ct,xt,R,A,H,ot,st,rt,yt,gt,wt,Dt,Wt,ct,te,Zt,Gt,It,Rt,Vt,ie;function ge(){J=new F0(F),lt=new P0(F,J,t),J.init(lt),Rt=new Mv(F,J,lt),tt=new yv(F,J,lt),Ct=new B0(F),xt=new rv,R=new _v(F,J,tt,xt,lt,Rt,Ct),A=new I0(y),H=new U0(y),ot=new Yf(F,lt),Vt=new C0(F,J,ot,lt),st=new O0(F,ot,Ct,Vt),rt=new k0(F,st,ot,Ct),Zt=new W0(F,lt,R),Wt=new L0(xt),yt=new sv(y,A,H,J,lt,Vt,Wt),gt=new bv(y,xt),wt=new av,Dt=new fv(J,lt),te=new A0(y,A,H,tt,rt,u,c),ct=new xv(y,rt,lt),ie=new Tv(F,Ct,lt,tt),Gt=new R0(F,J,Ct,lt),It=new z0(F,J,Ct,lt),Ct.programs=yt.programs,y.capabilities=lt,y.extensions=J,y.properties=xt,y.renderLists=wt,y.shadowMap=ct,y.state=tt,y.info=Ct}ge();const Yt=new Ev(y,F);this.xr=Yt,this.getContext=function(){return F},this.getContextAttributes=function(){return F.getContextAttributes()},this.forceContextLoss=function(){const P=J.get("WEBGL_lose_context");P&&P.loseContext()},this.forceContextRestore=function(){const P=J.get("WEBGL_lose_context");P&&P.restoreContext()},this.getPixelRatio=function(){return Y},this.setPixelRatio=function(P){P!==void 0&&(Y=P,this.setSize(I,U,!1))},this.getSize=function(P){return P.set(I,U)},this.setSize=function(P,W,K=!0){if(Yt.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}I=P,U=W,e.width=Math.floor(P*Y),e.height=Math.floor(W*Y),K===!0&&(e.style.width=P+"px",e.style.height=W+"px"),this.setViewport(0,0,P,W)},this.getDrawingBufferSize=function(P){return P.set(I*Y,U*Y).floor()},this.setDrawingBufferSize=function(P,W,K){I=P,U=W,Y=K,e.width=Math.floor(P*K),e.height=Math.floor(W*K),this.setViewport(0,0,P,W)},this.getCurrentViewport=function(P){return P.copy(T)},this.getViewport=function(P){return P.copy(Q)},this.setViewport=function(P,W,K,Z){P.isVector4?Q.set(P.x,P.y,P.z,P.w):Q.set(P,W,K,Z),tt.viewport(T.copy(Q).multiplyScalar(Y).floor())},this.getScissor=function(P){return P.copy(V)},this.setScissor=function(P,W,K,Z){P.isVector4?V.set(P.x,P.y,P.z,P.w):V.set(P,W,K,Z),tt.scissor(O.copy(V).multiplyScalar(Y).floor())},this.getScissorTest=function(){return X},this.setScissorTest=function(P){tt.setScissorTest(X=P)},this.setOpaqueSort=function(P){G=P},this.setTransparentSort=function(P){k=P},this.getClearColor=function(P){return P.copy(te.getClearColor())},this.setClearColor=function(){te.setClearColor.apply(te,arguments)},this.getClearAlpha=function(){return te.getClearAlpha()},this.setClearAlpha=function(){te.setClearAlpha.apply(te,arguments)},this.clear=function(P=!0,W=!0,K=!0){let Z=0;if(P){let j=!1;if(b!==null){const Et=b.texture.format;j=Et===Vh||Et===kh||Et===Wh}if(j){const Et=b.texture.type,Pt=Et===ti||Et===Zn||Et===ja||Et===vi||Et===Gh||Et===Hh,Ut=te.getClearColor(),zt=te.getClearAlpha(),qt=Ut.r,Ht=Ut.g,kt=Ut.b;Pt?(f[0]=qt,f[1]=Ht,f[2]=kt,f[3]=zt,F.clearBufferuiv(F.COLOR,0,f)):(g[0]=qt,g[1]=Ht,g[2]=kt,g[3]=zt,F.clearBufferiv(F.COLOR,0,g))}else Z|=F.COLOR_BUFFER_BIT}W&&(Z|=F.DEPTH_BUFFER_BIT),K&&(Z|=F.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),F.clear(Z)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){e.removeEventListener("webglcontextlost",dt,!1),e.removeEventListener("webglcontextrestored",B,!1),e.removeEventListener("webglcontextcreationerror",_t,!1),wt.dispose(),Dt.dispose(),xt.dispose(),A.dispose(),H.dispose(),rt.dispose(),Vt.dispose(),ie.dispose(),yt.dispose(),Yt.dispose(),Yt.removeEventListener("sessionstart",Ge),Yt.removeEventListener("sessionend",ce),pt&&(pt.dispose(),pt=null),He.stop()};function dt(P){P.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),_=!0}function B(){console.log("THREE.WebGLRenderer: Context Restored."),_=!1;const P=Ct.autoReset,W=ct.enabled,K=ct.autoUpdate,Z=ct.needsUpdate,j=ct.type;ge(),Ct.autoReset=P,ct.enabled=W,ct.autoUpdate=K,ct.needsUpdate=Z,ct.type=j}function _t(P){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",P.statusMessage)}function Mt(P){const W=P.target;W.removeEventListener("dispose",Mt),Ot(W)}function Ot(P){Nt(P),xt.remove(P)}function Nt(P){const W=xt.get(P).programs;W!==void 0&&(W.forEach(function(K){yt.releaseProgram(K)}),P.isShaderMaterial&&yt.releaseShaderCache(P))}this.renderBufferDirect=function(P,W,K,Z,j,Et){W===null&&(W=mt);const Pt=j.isMesh&&j.matrixWorld.determinant()<0,Ut=ld(P,W,K,Z,j);tt.setMaterial(Z,Pt);let zt=K.index,qt=1;if(Z.wireframe===!0){if(zt=st.getWireframeAttribute(K),zt===void 0)return;qt=2}const Ht=K.drawRange,kt=K.attributes.position;let ye=Ht.start*qt,qe=(Ht.start+Ht.count)*qt;Et!==null&&(ye=Math.max(ye,Et.start*qt),qe=Math.min(qe,(Et.start+Et.count)*qt)),zt!==null?(ye=Math.max(ye,0),qe=Math.min(qe,zt.count)):kt!=null&&(ye=Math.max(ye,0),qe=Math.min(qe,kt.count));const Te=qe-ye;if(Te<0||Te===1/0)return;Vt.setup(j,Z,Ut,K,zt);let Tn,pe=Gt;if(zt!==null&&(Tn=ot.get(zt),pe=It,pe.setIndex(Tn)),j.isMesh)Z.wireframe===!0?(tt.setLineWidth(Z.wireframeLinewidth*ht()),pe.setMode(F.LINES)):pe.setMode(F.TRIANGLES);else if(j.isLine){let jt=Z.linewidth;jt===void 0&&(jt=1),tt.setLineWidth(jt*ht()),j.isLineSegments?pe.setMode(F.LINES):j.isLineLoop?pe.setMode(F.LINE_LOOP):pe.setMode(F.LINE_STRIP)}else j.isPoints?pe.setMode(F.POINTS):j.isSprite&&pe.setMode(F.TRIANGLES);if(j.isBatchedMesh)pe.renderMultiDraw(j._multiDrawStarts,j._multiDrawCounts,j._multiDrawCount);else if(j.isInstancedMesh)pe.renderInstances(ye,Te,j.count);else if(K.isInstancedBufferGeometry){const jt=K._maxInstanceCount!==void 0?K._maxInstanceCount:1/0,bo=Math.min(K.instanceCount,jt);pe.renderInstances(ye,Te,bo)}else pe.render(ye,Te)};function oe(P,W,K){P.transparent===!0&&P.side===De&&P.forceSinglePass===!1?(P.side=Ve,P.needsUpdate=!0,Qs(P,W,K),P.side=ei,P.needsUpdate=!0,Qs(P,W,K),P.side=De):Qs(P,W,K)}this.compile=function(P,W,K=null){K===null&&(K=P),m=Dt.get(K),m.init(),x.push(m),K.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(m.pushLight(j),j.castShadow&&m.pushShadow(j))}),P!==K&&P.traverseVisible(function(j){j.isLight&&j.layers.test(W.layers)&&(m.pushLight(j),j.castShadow&&m.pushShadow(j))}),m.setupLights(y._useLegacyLights);const Z=new Set;return P.traverse(function(j){const Et=j.material;if(Et)if(Array.isArray(Et))for(let Pt=0;Pt<Et.length;Pt++){const Ut=Et[Pt];oe(Ut,K,j),Z.add(Ut)}else oe(Et,K,j),Z.add(Et)}),x.pop(),m=null,Z},this.compileAsync=function(P,W,K=null){const Z=this.compile(P,W,K);return new Promise(j=>{function Et(){if(Z.forEach(function(Pt){xt.get(Pt).currentProgram.isReady()&&Z.delete(Pt)}),Z.size===0){j(P);return}setTimeout(Et,10)}J.get("KHR_parallel_shader_compile")!==null?Et():setTimeout(Et,10)})};let ae=null;function be(P){ae&&ae(P)}function Ge(){He.stop()}function ce(){He.start()}const He=new ou;He.setAnimationLoop(be),typeof self<"u"&&He.setContext(self),this.setAnimationLoop=function(P){ae=P,Yt.setAnimationLoop(P),P===null?He.stop():He.start()},Yt.addEventListener("sessionstart",Ge),Yt.addEventListener("sessionend",ce),this.render=function(P,W){if(W!==void 0&&W.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(_===!0)return;P.matrixWorldAutoUpdate===!0&&P.updateMatrixWorld(),W.parent===null&&W.matrixWorldAutoUpdate===!0&&W.updateMatrixWorld(),Yt.enabled===!0&&Yt.isPresenting===!0&&(Yt.cameraAutoUpdate===!0&&Yt.updateCamera(W),W=Yt.getCamera()),P.isScene===!0&&P.onBeforeRender(y,P,W,b),m=Dt.get(P,x.length),m.init(),x.push(m),it.multiplyMatrices(W.projectionMatrix,W.matrixWorldInverse),q.setFromProjectionMatrix(it),ut=this.localClippingEnabled,et=Wt.init(this.clippingPlanes,ut),v=wt.get(P,p.length),v.init(),p.push(v),vn(P,W,0,y.sortObjects),v.finish(),y.sortObjects===!0&&v.sort(G,k),this.info.render.frame++,et===!0&&Wt.beginShadows();const K=m.state.shadowsArray;if(ct.render(K,P,W),et===!0&&Wt.endShadows(),this.info.autoReset===!0&&this.info.reset(),te.render(v,P),m.setupLights(y._useLegacyLights),W.isArrayCamera){const Z=W.cameras;for(let j=0,Et=Z.length;j<Et;j++){const Pt=Z[j];pc(v,P,Pt,Pt.viewport)}}else pc(v,P,W);b!==null&&(R.updateMultisampleRenderTarget(b),R.updateRenderTargetMipmap(b)),P.isScene===!0&&P.onAfterRender(y,P,W),Vt.resetDefaultState(),L=-1,w=null,x.pop(),x.length>0?m=x[x.length-1]:m=null,p.pop(),p.length>0?v=p[p.length-1]:v=null};function vn(P,W,K,Z){if(P.visible===!1)return;if(P.layers.test(W.layers)){if(P.isGroup)K=P.renderOrder;else if(P.isLOD)P.autoUpdate===!0&&P.update(W);else if(P.isLight)m.pushLight(P),P.castShadow&&m.pushShadow(P);else if(P.isSprite){if(!P.frustumCulled||q.intersectsSprite(P)){Z&&St.setFromMatrixPosition(P.matrixWorld).applyMatrix4(it);const Pt=rt.update(P),Ut=P.material;Ut.visible&&v.push(P,Pt,Ut,K,St.z,null)}}else if((P.isMesh||P.isLine||P.isPoints)&&(!P.frustumCulled||q.intersectsObject(P))){const Pt=rt.update(P),Ut=P.material;if(Z&&(P.boundingSphere!==void 0?(P.boundingSphere===null&&P.computeBoundingSphere(),St.copy(P.boundingSphere.center)):(Pt.boundingSphere===null&&Pt.computeBoundingSphere(),St.copy(Pt.boundingSphere.center)),St.applyMatrix4(P.matrixWorld).applyMatrix4(it)),Array.isArray(Ut)){const zt=Pt.groups;for(let qt=0,Ht=zt.length;qt<Ht;qt++){const kt=zt[qt],ye=Ut[kt.materialIndex];ye&&ye.visible&&v.push(P,Pt,ye,K,St.z,kt)}}else Ut.visible&&v.push(P,Pt,Ut,K,St.z,null)}}const Et=P.children;for(let Pt=0,Ut=Et.length;Pt<Ut;Pt++)vn(Et[Pt],W,K,Z)}function pc(P,W,K,Z){const j=P.opaque,Et=P.transmissive,Pt=P.transparent;m.setupLightsView(K),et===!0&&Wt.setGlobalState(y.clippingPlanes,K),Et.length>0&&cd(j,Et,W,K),Z&&tt.viewport(T.copy(Z)),j.length>0&&Js(j,W,K),Et.length>0&&Js(Et,W,K),Pt.length>0&&Js(Pt,W,K),tt.buffers.depth.setTest(!0),tt.buffers.depth.setMask(!0),tt.buffers.color.setMask(!0),tt.setPolygonOffset(!1)}function cd(P,W,K,Z){if((K.isScene===!0?K.overrideMaterial:null)!==null)return;const Et=lt.isWebGL2;pt===null&&(pt=new Qe(1,1,{generateMipmaps:!0,type:J.has("EXT_color_buffer_half_float")?mn:ti,minFilter:Bs,samples:Et?4:0})),y.getDrawingBufferSize(vt),Et?pt.setSize(vt.x,vt.y):pt.setSize(uo(vt.x),uo(vt.y));const Pt=y.getRenderTarget();y.setRenderTarget(pt),y.getClearColor(z),C=y.getClearAlpha(),C<1&&y.setClearColor(16777215,.5),y.clear();const Ut=y.toneMapping;y.toneMapping=$n,Js(P,K,Z),R.updateMultisampleRenderTarget(pt),R.updateRenderTargetMipmap(pt);let zt=!1;for(let qt=0,Ht=W.length;qt<Ht;qt++){const kt=W[qt],ye=kt.object,qe=kt.geometry,Te=kt.material,Tn=kt.group;if(Te.side===De&&ye.layers.test(Z.layers)){const pe=Te.side;Te.side=Ve,Te.needsUpdate=!0,mc(ye,K,Z,qe,Te,Tn),Te.side=pe,Te.needsUpdate=!0,zt=!0}}zt===!0&&(R.updateMultisampleRenderTarget(pt),R.updateRenderTargetMipmap(pt)),y.setRenderTarget(Pt),y.setClearColor(z,C),y.toneMapping=Ut}function Js(P,W,K){const Z=W.isScene===!0?W.overrideMaterial:null;for(let j=0,Et=P.length;j<Et;j++){const Pt=P[j],Ut=Pt.object,zt=Pt.geometry,qt=Z===null?Pt.material:Z,Ht=Pt.group;Ut.layers.test(K.layers)&&mc(Ut,W,K,zt,qt,Ht)}}function mc(P,W,K,Z,j,Et){P.onBeforeRender(y,W,K,Z,j,Et),P.modelViewMatrix.multiplyMatrices(K.matrixWorldInverse,P.matrixWorld),P.normalMatrix.getNormalMatrix(P.modelViewMatrix),j.onBeforeRender(y,W,K,Z,P,Et),j.transparent===!0&&j.side===De&&j.forceSinglePass===!1?(j.side=Ve,j.needsUpdate=!0,y.renderBufferDirect(K,W,Z,j,P,Et),j.side=ei,j.needsUpdate=!0,y.renderBufferDirect(K,W,Z,j,P,Et),j.side=De):y.renderBufferDirect(K,W,Z,j,P,Et),P.onAfterRender(y,W,K,Z,j,Et)}function Qs(P,W,K){W.isScene!==!0&&(W=mt);const Z=xt.get(P),j=m.state.lights,Et=m.state.shadowsArray,Pt=j.state.version,Ut=yt.getParameters(P,j.state,Et,W,K),zt=yt.getProgramCacheKey(Ut);let qt=Z.programs;Z.environment=P.isMeshStandardMaterial?W.environment:null,Z.fog=W.fog,Z.envMap=(P.isMeshStandardMaterial?H:A).get(P.envMap||Z.environment),qt===void 0&&(P.addEventListener("dispose",Mt),qt=new Map,Z.programs=qt);let Ht=qt.get(zt);if(Ht!==void 0){if(Z.currentProgram===Ht&&Z.lightsStateVersion===Pt)return vc(P,Ut),Ht}else Ut.uniforms=yt.getUniforms(P),P.onBuild(K,Ut,y),P.onBeforeCompile(Ut,y),Ht=yt.acquireProgram(Ut,zt),qt.set(zt,Ht),Z.uniforms=Ut.uniforms;const kt=Z.uniforms;return(!P.isShaderMaterial&&!P.isRawShaderMaterial||P.clipping===!0)&&(kt.clippingPlanes=Wt.uniform),vc(P,Ut),Z.needsLights=ud(P),Z.lightsStateVersion=Pt,Z.needsLights&&(kt.ambientLightColor.value=j.state.ambient,kt.lightProbe.value=j.state.probe,kt.directionalLights.value=j.state.directional,kt.directionalLightShadows.value=j.state.directionalShadow,kt.spotLights.value=j.state.spot,kt.spotLightShadows.value=j.state.spotShadow,kt.rectAreaLights.value=j.state.rectArea,kt.ltc_1.value=j.state.rectAreaLTC1,kt.ltc_2.value=j.state.rectAreaLTC2,kt.pointLights.value=j.state.point,kt.pointLightShadows.value=j.state.pointShadow,kt.hemisphereLights.value=j.state.hemi,kt.directionalShadowMap.value=j.state.directionalShadowMap,kt.directionalShadowMatrix.value=j.state.directionalShadowMatrix,kt.spotShadowMap.value=j.state.spotShadowMap,kt.spotLightMatrix.value=j.state.spotLightMatrix,kt.spotLightMap.value=j.state.spotLightMap,kt.pointShadowMap.value=j.state.pointShadowMap,kt.pointShadowMatrix.value=j.state.pointShadowMatrix),Z.currentProgram=Ht,Z.uniformsList=null,Ht}function gc(P){if(P.uniformsList===null){const W=P.currentProgram.getUniforms();P.uniformsList=io.seqWithValue(W.seq,P.uniforms)}return P.uniformsList}function vc(P,W){const K=xt.get(P);K.outputColorSpace=W.outputColorSpace,K.batching=W.batching,K.instancing=W.instancing,K.instancingColor=W.instancingColor,K.skinning=W.skinning,K.morphTargets=W.morphTargets,K.morphNormals=W.morphNormals,K.morphColors=W.morphColors,K.morphTargetsCount=W.morphTargetsCount,K.numClippingPlanes=W.numClippingPlanes,K.numIntersection=W.numClipIntersection,K.vertexAlphas=W.vertexAlphas,K.vertexTangents=W.vertexTangents,K.toneMapping=W.toneMapping}function ld(P,W,K,Z,j){W.isScene!==!0&&(W=mt),R.resetTextureUnits();const Et=W.fog,Pt=Z.isMeshStandardMaterial?W.environment:null,Ut=b===null?y.outputColorSpace:b.isXRRenderTarget===!0?b.texture.colorSpace:Hn,zt=(Z.isMeshStandardMaterial?H:A).get(Z.envMap||Pt),qt=Z.vertexColors===!0&&!!K.attributes.color&&K.attributes.color.itemSize===4,Ht=!!K.attributes.tangent&&(!!Z.normalMap||Z.anisotropy>0),kt=!!K.morphAttributes.position,ye=!!K.morphAttributes.normal,qe=!!K.morphAttributes.color;let Te=$n;Z.toneMapped&&(b===null||b.isXRRenderTarget===!0)&&(Te=y.toneMapping);const Tn=K.morphAttributes.position||K.morphAttributes.normal||K.morphAttributes.color,pe=Tn!==void 0?Tn.length:0,jt=xt.get(Z),bo=m.state.lights;if(et===!0&&(ut===!0||P!==w)){const en=P===w&&Z.id===L;Wt.setState(Z,P,en)}let ve=!1;Z.version===jt.__version?(jt.needsLights&&jt.lightsStateVersion!==bo.state.version||jt.outputColorSpace!==Ut||j.isBatchedMesh&&jt.batching===!1||!j.isBatchedMesh&&jt.batching===!0||j.isInstancedMesh&&jt.instancing===!1||!j.isInstancedMesh&&jt.instancing===!0||j.isSkinnedMesh&&jt.skinning===!1||!j.isSkinnedMesh&&jt.skinning===!0||j.isInstancedMesh&&jt.instancingColor===!0&&j.instanceColor===null||j.isInstancedMesh&&jt.instancingColor===!1&&j.instanceColor!==null||jt.envMap!==zt||Z.fog===!0&&jt.fog!==Et||jt.numClippingPlanes!==void 0&&(jt.numClippingPlanes!==Wt.numPlanes||jt.numIntersection!==Wt.numIntersection)||jt.vertexAlphas!==qt||jt.vertexTangents!==Ht||jt.morphTargets!==kt||jt.morphNormals!==ye||jt.morphColors!==qe||jt.toneMapping!==Te||lt.isWebGL2===!0&&jt.morphTargetsCount!==pe)&&(ve=!0):(ve=!0,jt.__version=Z.version);let ii=jt.currentProgram;ve===!0&&(ii=Qs(Z,W,j));let xc=!1,ds=!1,To=!1;const Ue=ii.getUniforms(),si=jt.uniforms;if(tt.useProgram(ii.program)&&(xc=!0,ds=!0,To=!0),Z.id!==L&&(L=Z.id,ds=!0),xc||w!==P){Ue.setValue(F,"projectionMatrix",P.projectionMatrix),Ue.setValue(F,"viewMatrix",P.matrixWorldInverse);const en=Ue.map.cameraPosition;en!==void 0&&en.setValue(F,St.setFromMatrixPosition(P.matrixWorld)),lt.logarithmicDepthBuffer&&Ue.setValue(F,"logDepthBufFC",2/(Math.log(P.far+1)/Math.LN2)),(Z.isMeshPhongMaterial||Z.isMeshToonMaterial||Z.isMeshLambertMaterial||Z.isMeshBasicMaterial||Z.isMeshStandardMaterial||Z.isShaderMaterial)&&Ue.setValue(F,"isOrthographic",P.isOrthographicCamera===!0),w!==P&&(w=P,ds=!0,To=!0)}if(j.isSkinnedMesh){Ue.setOptional(F,j,"bindMatrix"),Ue.setOptional(F,j,"bindMatrixInverse");const en=j.skeleton;en&&(lt.floatVertexTextures?(en.boneTexture===null&&en.computeBoneTexture(),Ue.setValue(F,"boneTexture",en.boneTexture,R)):console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required."))}j.isBatchedMesh&&(Ue.setOptional(F,j,"batchingTexture"),Ue.setValue(F,"batchingTexture",j._matricesTexture,R));const Ao=K.morphAttributes;if((Ao.position!==void 0||Ao.normal!==void 0||Ao.color!==void 0&&lt.isWebGL2===!0)&&Zt.update(j,K,ii),(ds||jt.receiveShadow!==j.receiveShadow)&&(jt.receiveShadow=j.receiveShadow,Ue.setValue(F,"receiveShadow",j.receiveShadow)),Z.isMeshGouraudMaterial&&Z.envMap!==null&&(si.envMap.value=zt,si.flipEnvMap.value=zt.isCubeTexture&&zt.isRenderTargetTexture===!1?-1:1),ds&&(Ue.setValue(F,"toneMappingExposure",y.toneMappingExposure),jt.needsLights&&hd(si,To),Et&&Z.fog===!0&&gt.refreshFogUniforms(si,Et),gt.refreshMaterialUniforms(si,Z,Y,U,pt),io.upload(F,gc(jt),si,R)),Z.isShaderMaterial&&Z.uniformsNeedUpdate===!0&&(io.upload(F,gc(jt),si,R),Z.uniformsNeedUpdate=!1),Z.isSpriteMaterial&&Ue.setValue(F,"center",j.center),Ue.setValue(F,"modelViewMatrix",j.modelViewMatrix),Ue.setValue(F,"normalMatrix",j.normalMatrix),Ue.setValue(F,"modelMatrix",j.matrixWorld),Z.isShaderMaterial||Z.isRawShaderMaterial){const en=Z.uniformsGroups;for(let Co=0,dd=en.length;Co<dd;Co++)if(lt.isWebGL2){const yc=en[Co];ie.update(yc,ii),ie.bind(yc,ii)}else console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.")}return ii}function hd(P,W){P.ambientLightColor.needsUpdate=W,P.lightProbe.needsUpdate=W,P.directionalLights.needsUpdate=W,P.directionalLightShadows.needsUpdate=W,P.pointLights.needsUpdate=W,P.pointLightShadows.needsUpdate=W,P.spotLights.needsUpdate=W,P.spotLightShadows.needsUpdate=W,P.rectAreaLights.needsUpdate=W,P.hemisphereLights.needsUpdate=W}function ud(P){return P.isMeshLambertMaterial||P.isMeshToonMaterial||P.isMeshPhongMaterial||P.isMeshStandardMaterial||P.isShadowMaterial||P.isShaderMaterial&&P.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return S},this.getRenderTarget=function(){return b},this.setRenderTargetTextures=function(P,W,K){xt.get(P.texture).__webglTexture=W,xt.get(P.depthTexture).__webglTexture=K;const Z=xt.get(P);Z.__hasExternalTextures=!0,Z.__hasExternalTextures&&(Z.__autoAllocateDepthBuffer=K===void 0,Z.__autoAllocateDepthBuffer||J.has("WEBGL_multisampled_render_to_texture")===!0&&(console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided"),Z.__useRenderToTexture=!1))},this.setRenderTargetFramebuffer=function(P,W){const K=xt.get(P);K.__webglFramebuffer=W,K.__useDefaultFramebuffer=W===void 0},this.setRenderTarget=function(P,W=0,K=0){b=P,M=W,S=K;let Z=!0,j=null,Et=!1,Pt=!1;if(P){const zt=xt.get(P);zt.__useDefaultFramebuffer!==void 0?(tt.bindFramebuffer(F.FRAMEBUFFER,null),Z=!1):zt.__webglFramebuffer===void 0?R.setupRenderTarget(P):zt.__hasExternalTextures&&R.rebindTextures(P,xt.get(P.texture).__webglTexture,xt.get(P.depthTexture).__webglTexture);const qt=P.texture;(qt.isData3DTexture||qt.isDataArrayTexture||qt.isCompressedArrayTexture)&&(Pt=!0);const Ht=xt.get(P).__webglFramebuffer;P.isWebGLCubeRenderTarget?(Array.isArray(Ht[W])?j=Ht[W][K]:j=Ht[W],Et=!0):lt.isWebGL2&&P.samples>0&&R.useMultisampledRTT(P)===!1?j=xt.get(P).__webglMultisampledFramebuffer:Array.isArray(Ht)?j=Ht[K]:j=Ht,T.copy(P.viewport),O.copy(P.scissor),D=P.scissorTest}else T.copy(Q).multiplyScalar(Y).floor(),O.copy(V).multiplyScalar(Y).floor(),D=X;if(tt.bindFramebuffer(F.FRAMEBUFFER,j)&&lt.drawBuffers&&Z&&tt.drawBuffers(P,j),tt.viewport(T),tt.scissor(O),tt.setScissorTest(D),Et){const zt=xt.get(P.texture);F.framebufferTexture2D(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,F.TEXTURE_CUBE_MAP_POSITIVE_X+W,zt.__webglTexture,K)}else if(Pt){const zt=xt.get(P.texture),qt=W||0;F.framebufferTextureLayer(F.FRAMEBUFFER,F.COLOR_ATTACHMENT0,zt.__webglTexture,K||0,qt)}L=-1},this.readRenderTargetPixels=function(P,W,K,Z,j,Et,Pt){if(!(P&&P.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ut=xt.get(P).__webglFramebuffer;if(P.isWebGLCubeRenderTarget&&Pt!==void 0&&(Ut=Ut[Pt]),Ut){tt.bindFramebuffer(F.FRAMEBUFFER,Ut);try{const zt=P.texture,qt=zt.format,Ht=zt.type;if(qt!==fn&&Rt.convert(qt)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_FORMAT)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}const kt=Ht===mn&&(J.has("EXT_color_buffer_half_float")||lt.isWebGL2&&J.has("EXT_color_buffer_float"));if(Ht!==ti&&Rt.convert(Ht)!==F.getParameter(F.IMPLEMENTATION_COLOR_READ_TYPE)&&!(Ht===Jn&&(lt.isWebGL2||J.has("OES_texture_float")||J.has("WEBGL_color_buffer_float")))&&!kt){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}W>=0&&W<=P.width-Z&&K>=0&&K<=P.height-j&&F.readPixels(W,K,Z,j,Rt.convert(qt),Rt.convert(Ht),Et)}finally{const zt=b!==null?xt.get(b).__webglFramebuffer:null;tt.bindFramebuffer(F.FRAMEBUFFER,zt)}}},this.copyFramebufferToTexture=function(P,W,K=0){const Z=Math.pow(2,-K),j=Math.floor(W.image.width*Z),Et=Math.floor(W.image.height*Z);R.setTexture2D(W,0),F.copyTexSubImage2D(F.TEXTURE_2D,K,0,0,P.x,P.y,j,Et),tt.unbindTexture()},this.copyTextureToTexture=function(P,W,K,Z=0){const j=W.image.width,Et=W.image.height,Pt=Rt.convert(K.format),Ut=Rt.convert(K.type);R.setTexture2D(K,0),F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,K.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,K.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,K.unpackAlignment),W.isDataTexture?F.texSubImage2D(F.TEXTURE_2D,Z,P.x,P.y,j,Et,Pt,Ut,W.image.data):W.isCompressedTexture?F.compressedTexSubImage2D(F.TEXTURE_2D,Z,P.x,P.y,W.mipmaps[0].width,W.mipmaps[0].height,Pt,W.mipmaps[0].data):F.texSubImage2D(F.TEXTURE_2D,Z,P.x,P.y,Pt,Ut,W.image),Z===0&&K.generateMipmaps&&F.generateMipmap(F.TEXTURE_2D),tt.unbindTexture()},this.copyTextureToTexture3D=function(P,W,K,Z,j=0){if(y.isWebGL1Renderer){console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");return}const Et=P.max.x-P.min.x+1,Pt=P.max.y-P.min.y+1,Ut=P.max.z-P.min.z+1,zt=Rt.convert(Z.format),qt=Rt.convert(Z.type);let Ht;if(Z.isData3DTexture)R.setTexture3D(Z,0),Ht=F.TEXTURE_3D;else if(Z.isDataArrayTexture||Z.isCompressedArrayTexture)R.setTexture2DArray(Z,0),Ht=F.TEXTURE_2D_ARRAY;else{console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");return}F.pixelStorei(F.UNPACK_FLIP_Y_WEBGL,Z.flipY),F.pixelStorei(F.UNPACK_PREMULTIPLY_ALPHA_WEBGL,Z.premultiplyAlpha),F.pixelStorei(F.UNPACK_ALIGNMENT,Z.unpackAlignment);const kt=F.getParameter(F.UNPACK_ROW_LENGTH),ye=F.getParameter(F.UNPACK_IMAGE_HEIGHT),qe=F.getParameter(F.UNPACK_SKIP_PIXELS),Te=F.getParameter(F.UNPACK_SKIP_ROWS),Tn=F.getParameter(F.UNPACK_SKIP_IMAGES),pe=K.isCompressedTexture?K.mipmaps[j]:K.image;F.pixelStorei(F.UNPACK_ROW_LENGTH,pe.width),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,pe.height),F.pixelStorei(F.UNPACK_SKIP_PIXELS,P.min.x),F.pixelStorei(F.UNPACK_SKIP_ROWS,P.min.y),F.pixelStorei(F.UNPACK_SKIP_IMAGES,P.min.z),K.isDataTexture||K.isData3DTexture?F.texSubImage3D(Ht,j,W.x,W.y,W.z,Et,Pt,Ut,zt,qt,pe.data):K.isCompressedArrayTexture?(console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture."),F.compressedTexSubImage3D(Ht,j,W.x,W.y,W.z,Et,Pt,Ut,zt,pe.data)):F.texSubImage3D(Ht,j,W.x,W.y,W.z,Et,Pt,Ut,zt,qt,pe),F.pixelStorei(F.UNPACK_ROW_LENGTH,kt),F.pixelStorei(F.UNPACK_IMAGE_HEIGHT,ye),F.pixelStorei(F.UNPACK_SKIP_PIXELS,qe),F.pixelStorei(F.UNPACK_SKIP_ROWS,Te),F.pixelStorei(F.UNPACK_SKIP_IMAGES,Tn),j===0&&Z.generateMipmaps&&F.generateMipmap(Ht),tt.unbindTexture()},this.initTexture=function(P){P.isCubeTexture?R.setTextureCube(P,0):P.isData3DTexture?R.setTexture3D(P,0):P.isDataArrayTexture||P.isCompressedArrayTexture?R.setTexture2DArray(P,0):R.setTexture2D(P,0),tt.unbindTexture()},this.resetState=function(){M=0,S=0,b=null,tt.reset(),Vt.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return zn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(t){this._outputColorSpace=t;const e=this.getContext();e.drawingBufferColorSpace=t===Ka?"display-p3":"srgb",e.unpackColorSpace=se.workingColorSpace===go?"display-p3":"srgb"}get outputEncoding(){return console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace===$t?yi:qh}set outputEncoding(t){console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead."),this.outputColorSpace=t===yi?$t:Hn}get useLegacyLights(){return console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights}set useLegacyLights(t){console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733."),this._useLegacyLights=t}}class Av extends fu{}Av.prototype.isWebGL1Renderer=!0;class tc{constructor(t,e=1,n=1e3){this.isFog=!0,this.name="",this.color=new Ft(t),this.near=e,this.far=n}clone(){return new tc(this.color,this.near,this.far)}toJSON(){return{type:"Fog",name:this.name,color:this.color.getHex(),near:this.near,far:this.far}}}class Cv extends Ie{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(t,e){return super.copy(t,e),t.background!==null&&(this.background=t.background.clone()),t.environment!==null&&(this.environment=t.environment.clone()),t.fog!==null&&(this.fog=t.fog.clone()),this.backgroundBlurriness=t.backgroundBlurriness,this.backgroundIntensity=t.backgroundIntensity,t.overrideMaterial!==null&&(this.overrideMaterial=t.overrideMaterial.clone()),this.matrixAutoUpdate=t.matrixAutoUpdate,this}toJSON(t){const e=super.toJSON(t);return this.fog!==null&&(e.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(e.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(e.object.backgroundIntensity=this.backgroundIntensity),e}}class Rv{constructor(t,e){this.isInterleavedBuffer=!0,this.array=t,this.stride=e,this.count=t!==void 0?t.length/e:0,this.usage=Ua,this._updateRange={offset:0,count:-1},this.updateRanges=[],this.version=0,this.uuid=En()}onUploadCallback(){}set needsUpdate(t){t===!0&&this.version++}get updateRange(){return console.warn("THREE.InterleavedBuffer: updateRange() is deprecated and will be removed in r169. Use addUpdateRange() instead."),this._updateRange}setUsage(t){return this.usage=t,this}addUpdateRange(t,e){this.updateRanges.push({start:t,count:e})}clearUpdateRanges(){this.updateRanges.length=0}copy(t){return this.array=new t.array.constructor(t.array),this.count=t.count,this.stride=t.stride,this.usage=t.usage,this}copyAt(t,e,n){t*=this.stride,n*=e.stride;for(let i=0,r=this.stride;i<r;i++)this.array[t+i]=e.array[n+i];return this}set(t,e=0){return this.array.set(t,e),this}clone(t){t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const e=new this.array.constructor(t.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(e,this.stride);return n.setUsage(this.usage),n}onUpload(t){return this.onUploadCallback=t,this}toJSON(t){return t.arrayBuffers===void 0&&(t.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=En()),t.arrayBuffers[this.array.buffer._uuid]===void 0&&(t.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const We=new N;class po{constructor(t,e,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=t,this.itemSize=e,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(t){this.data.needsUpdate=t}applyMatrix4(t){for(let e=0,n=this.data.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyMatrix4(t),this.setXYZ(e,We.x,We.y,We.z);return this}applyNormalMatrix(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.applyNormalMatrix(t),this.setXYZ(e,We.x,We.y,We.z);return this}transformDirection(t){for(let e=0,n=this.count;e<n;e++)We.fromBufferAttribute(this,e),We.transformDirection(t),this.setXYZ(e,We.x,We.y,We.z);return this}setX(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset]=e,this}setY(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+1]=e,this}setZ(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+2]=e,this}setW(t,e){return this.normalized&&(e=re(e,this.array)),this.data.array[t*this.data.stride+this.offset+3]=e,this}getX(t){let e=this.data.array[t*this.data.stride+this.offset];return this.normalized&&(e=wn(e,this.array)),e}getY(t){let e=this.data.array[t*this.data.stride+this.offset+1];return this.normalized&&(e=wn(e,this.array)),e}getZ(t){let e=this.data.array[t*this.data.stride+this.offset+2];return this.normalized&&(e=wn(e,this.array)),e}getW(t){let e=this.data.array[t*this.data.stride+this.offset+3];return this.normalized&&(e=wn(e,this.array)),e}setXY(t,e,n){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this}setXYZ(t,e,n,i){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this}setXYZW(t,e,n,i,r){return t=t*this.data.stride+this.offset,this.normalized&&(e=re(e,this.array),n=re(n,this.array),i=re(i,this.array),r=re(r,this.array)),this.data.array[t+0]=e,this.data.array[t+1]=n,this.data.array[t+2]=i,this.data.array[t+3]=r,this}clone(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return new ee(new this.array.constructor(e),this.itemSize,this.normalized)}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.clone(t)),new po(t.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(t){if(t===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const e=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)e.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:e,normalized:this.normalized}}else return t.interleavedBuffers===void 0&&(t.interleavedBuffers={}),t.interleavedBuffers[this.data.uuid]===void 0&&(t.interleavedBuffers[this.data.uuid]=this.data.toJSON(t)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}class pu extends cs{constructor(t){super(),this.isSpriteMaterial=!0,this.type="SpriteMaterial",this.color=new Ft(16777215),this.map=null,this.alphaMap=null,this.rotation=0,this.sizeAttenuation=!0,this.transparent=!0,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.color.copy(t.color),this.map=t.map,this.alphaMap=t.alphaMap,this.rotation=t.rotation,this.sizeAttenuation=t.sizeAttenuation,this.fog=t.fog,this}}let Hi;const vs=new N,Wi=new N,ki=new N,Vi=new nt,xs=new nt,mu=new ne,Mr=new N,ys=new N,Sr=new N,Ol=new nt,sa=new nt,zl=new nt;class Pv extends Ie{constructor(t=new pu){if(super(),this.isSprite=!0,this.type="Sprite",Hi===void 0){Hi=new he;const e=new Float32Array([-.5,-.5,0,0,0,.5,-.5,0,1,0,.5,.5,0,1,1,-.5,.5,0,0,1]),n=new Rv(e,5);Hi.setIndex([0,1,2,0,2,3]),Hi.setAttribute("position",new po(n,3,0,!1)),Hi.setAttribute("uv",new po(n,2,3,!1))}this.geometry=Hi,this.material=t,this.center=new nt(.5,.5)}raycast(t,e){t.camera===null&&console.error('THREE.Sprite: "Raycaster.camera" needs to be set in order to raycast against sprites.'),Wi.setFromMatrixScale(this.matrixWorld),mu.copy(t.camera.matrixWorld),this.modelViewMatrix.multiplyMatrices(t.camera.matrixWorldInverse,this.matrixWorld),ki.setFromMatrixPosition(this.modelViewMatrix),t.camera.isPerspectiveCamera&&this.material.sizeAttenuation===!1&&Wi.multiplyScalar(-ki.z);const n=this.material.rotation;let i,r;n!==0&&(r=Math.cos(n),i=Math.sin(n));const o=this.center;wr(Mr.set(-.5,-.5,0),ki,o,Wi,i,r),wr(ys.set(.5,-.5,0),ki,o,Wi,i,r),wr(Sr.set(.5,.5,0),ki,o,Wi,i,r),Ol.set(0,0),sa.set(1,0),zl.set(1,1);let a=t.ray.intersectTriangle(Mr,ys,Sr,!1,vs);if(a===null&&(wr(ys.set(-.5,.5,0),ki,o,Wi,i,r),sa.set(0,1),a=t.ray.intersectTriangle(Mr,Sr,ys,!1,vs),a===null))return;const c=t.ray.origin.distanceTo(vs);c<t.near||c>t.far||e.push({distance:c,point:vs.clone(),uv:sn.getInterpolation(vs,Mr,ys,Sr,Ol,sa,zl,new nt),face:null,object:this})}copy(t,e){return super.copy(t,e),t.center!==void 0&&this.center.copy(t.center),this.material=t.material,this}}function wr(s,t,e,n,i,r){Vi.subVectors(s,e).addScalar(.5).multiply(n),i!==void 0?(xs.x=r*Vi.x-i*Vi.y,xs.y=i*Vi.x+r*Vi.y):xs.copy(Vi),s.copy(t),s.x+=xs.x,s.y+=xs.y,s.applyMatrix4(mu)}class Bl extends ee{constructor(t,e,n,i=1){super(t,e,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(t){return super.copy(t),this.meshPerAttribute=t.meshPerAttribute,this}toJSON(){const t=super.toJSON();return t.meshPerAttribute=this.meshPerAttribute,t.isInstancedBufferAttribute=!0,t}}const Xi=new ne,Gl=new ne,Er=[],Hl=new Si,Lv=new ne,_s=new $,Ms=new Ys;class rs extends ${constructor(t,e,n){super(t,e),this.isInstancedMesh=!0,this.instanceMatrix=new Bl(new Float32Array(n*16),16),this.instanceColor=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,Lv)}computeBoundingBox(){const t=this.geometry,e=this.count;this.boundingBox===null&&(this.boundingBox=new Si),t.boundingBox===null&&t.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xi),Hl.copy(t.boundingBox).applyMatrix4(Xi),this.boundingBox.union(Hl)}computeBoundingSphere(){const t=this.geometry,e=this.count;this.boundingSphere===null&&(this.boundingSphere=new Ys),t.boundingSphere===null&&t.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<e;n++)this.getMatrixAt(n,Xi),Ms.copy(t.boundingSphere).applyMatrix4(Xi),this.boundingSphere.union(Ms)}copy(t,e){return super.copy(t,e),this.instanceMatrix.copy(t.instanceMatrix),t.instanceColor!==null&&(this.instanceColor=t.instanceColor.clone()),this.count=t.count,t.boundingBox!==null&&(this.boundingBox=t.boundingBox.clone()),t.boundingSphere!==null&&(this.boundingSphere=t.boundingSphere.clone()),this}getColorAt(t,e){e.fromArray(this.instanceColor.array,t*3)}getMatrixAt(t,e){e.fromArray(this.instanceMatrix.array,t*16)}raycast(t,e){const n=this.matrixWorld,i=this.count;if(_s.geometry=this.geometry,_s.material=this.material,_s.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Ms.copy(this.boundingSphere),Ms.applyMatrix4(n),t.ray.intersectsSphere(Ms)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Xi),Gl.multiplyMatrices(n,Xi),_s.matrixWorld=Gl,_s.raycast(t,Er);for(let o=0,a=Er.length;o<a;o++){const c=Er[o];c.instanceId=r,c.object=this,e.push(c)}Er.length=0}}setColorAt(t,e){this.instanceColor===null&&(this.instanceColor=new Bl(new Float32Array(this.instanceMatrix.count*3),3)),e.toArray(this.instanceColor.array,t*3)}setMatrixAt(t,e){e.toArray(this.instanceMatrix.array,t*16)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"})}}class Be extends ze{constructor(t,e,n,i,r,o,a,c,l){super(t,e,n,i,r,o,a,c,l),this.isCanvasTexture=!0,this.needsUpdate=!0}}class bn{constructor(){this.type="Curve",this.arcLengthDivisions=200}getPoint(){return console.warn("THREE.Curve: .getPoint() not implemented."),null}getPointAt(t,e){const n=this.getUtoTmapping(t);return this.getPoint(n,e)}getPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return e}getSpacedPoints(t=5){const e=[];for(let n=0;n<=t;n++)e.push(this.getPointAt(n/t));return e}getLength(){const t=this.getLengths();return t[t.length-1]}getLengths(t=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===t+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;const e=[];let n,i=this.getPoint(0),r=0;e.push(0);for(let o=1;o<=t;o++)n=this.getPoint(o/t),r+=n.distanceTo(i),e.push(r),i=n;return this.cacheArcLengths=e,e}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(t,e){const n=this.getLengths();let i=0;const r=n.length;let o;e?o=e:o=t*n[r-1];let a=0,c=r-1,l;for(;a<=c;)if(i=Math.floor(a+(c-a)/2),l=n[i]-o,l<0)a=i+1;else if(l>0)c=i-1;else{c=i;break}if(i=c,n[i]===o)return i/(r-1);const h=n[i],u=n[i+1]-h,f=(o-h)/u;return(i+f)/(r-1)}getTangent(t,e){let i=t-1e-4,r=t+1e-4;i<0&&(i=0),r>1&&(r=1);const o=this.getPoint(i),a=this.getPoint(r),c=e||(o.isVector2?new nt:new N);return c.copy(a).sub(o).normalize(),c}getTangentAt(t,e){const n=this.getUtoTmapping(t);return this.getTangent(n,e)}computeFrenetFrames(t,e){const n=new N,i=[],r=[],o=[],a=new N,c=new ne;for(let f=0;f<=t;f++){const g=f/t;i[f]=this.getTangentAt(g,new N)}r[0]=new N,o[0]=new N;let l=Number.MAX_VALUE;const h=Math.abs(i[0].x),d=Math.abs(i[0].y),u=Math.abs(i[0].z);h<=l&&(l=h,n.set(1,0,0)),d<=l&&(l=d,n.set(0,1,0)),u<=l&&n.set(0,0,1),a.crossVectors(i[0],n).normalize(),r[0].crossVectors(i[0],a),o[0].crossVectors(i[0],r[0]);for(let f=1;f<=t;f++){if(r[f]=r[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(i[f-1],i[f]),a.length()>Number.EPSILON){a.normalize();const g=Math.acos(Re(i[f-1].dot(i[f]),-1,1));r[f].applyMatrix4(c.makeRotationAxis(a,g))}o[f].crossVectors(i[f],r[f])}if(e===!0){let f=Math.acos(Re(r[0].dot(r[t]),-1,1));f/=t,i[0].dot(a.crossVectors(r[0],r[t]))>0&&(f=-f);for(let g=1;g<=t;g++)r[g].applyMatrix4(c.makeRotationAxis(i[g],f*g)),o[g].crossVectors(i[g],r[g])}return{tangents:i,normals:r,binormals:o}}clone(){return new this.constructor().copy(this)}copy(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}toJSON(){const t={metadata:{version:4.6,type:"Curve",generator:"Curve.toJSON"}};return t.arcLengthDivisions=this.arcLengthDivisions,t.type=this.type,t}fromJSON(t){return this.arcLengthDivisions=t.arcLengthDivisions,this}}class ec extends bn{constructor(t=0,e=0,n=1,i=1,r=0,o=Math.PI*2,a=!1,c=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=t,this.aY=e,this.xRadius=n,this.yRadius=i,this.aStartAngle=r,this.aEndAngle=o,this.aClockwise=a,this.aRotation=c}getPoint(t,e){const n=e||new nt,i=Math.PI*2;let r=this.aEndAngle-this.aStartAngle;const o=Math.abs(r)<Number.EPSILON;for(;r<0;)r+=i;for(;r>i;)r-=i;r<Number.EPSILON&&(o?r=0:r=i),this.aClockwise===!0&&!o&&(r===i?r=-i:r=r-i);const a=this.aStartAngle+t*r;let c=this.aX+this.xRadius*Math.cos(a),l=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){const h=Math.cos(this.aRotation),d=Math.sin(this.aRotation),u=c-this.aX,f=l-this.aY;c=u*h-f*d+this.aX,l=u*d+f*h+this.aY}return n.set(c,l)}copy(t){return super.copy(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}toJSON(){const t=super.toJSON();return t.aX=this.aX,t.aY=this.aY,t.xRadius=this.xRadius,t.yRadius=this.yRadius,t.aStartAngle=this.aStartAngle,t.aEndAngle=this.aEndAngle,t.aClockwise=this.aClockwise,t.aRotation=this.aRotation,t}fromJSON(t){return super.fromJSON(t),this.aX=t.aX,this.aY=t.aY,this.xRadius=t.xRadius,this.yRadius=t.yRadius,this.aStartAngle=t.aStartAngle,this.aEndAngle=t.aEndAngle,this.aClockwise=t.aClockwise,this.aRotation=t.aRotation,this}}class Iv extends ec{constructor(t,e,n,i,r,o){super(t,e,n,n,i,r,o),this.isArcCurve=!0,this.type="ArcCurve"}}function nc(){let s=0,t=0,e=0,n=0;function i(r,o,a,c){s=r,t=a,e=-3*r+3*o-2*a-c,n=2*r-2*o+a+c}return{initCatmullRom:function(r,o,a,c,l){i(o,a,l*(a-r),l*(c-o))},initNonuniformCatmullRom:function(r,o,a,c,l,h,d){let u=(o-r)/l-(a-r)/(l+h)+(a-o)/h,f=(a-o)/h-(c-o)/(h+d)+(c-a)/d;u*=h,f*=h,i(o,a,u,f)},calc:function(r){const o=r*r,a=o*r;return s+t*r+e*o+n*a}}}const br=new N,ra=new nc,oa=new nc,aa=new nc;class gu extends bn{constructor(t=[],e=!1,n="centripetal",i=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=t,this.closed=e,this.curveType=n,this.tension=i}getPoint(t,e=new N){const n=e,i=this.points,r=i.length,o=(r-(this.closed?0:1))*t;let a=Math.floor(o),c=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/r)+1)*r:c===0&&a===r-1&&(a=r-2,c=1);let l,h;this.closed||a>0?l=i[(a-1)%r]:(br.subVectors(i[0],i[1]).add(i[0]),l=br);const d=i[a%r],u=i[(a+1)%r];if(this.closed||a+2<r?h=i[(a+2)%r]:(br.subVectors(i[r-1],i[r-2]).add(i[r-1]),h=br),this.curveType==="centripetal"||this.curveType==="chordal"){const f=this.curveType==="chordal"?.5:.25;let g=Math.pow(l.distanceToSquared(d),f),v=Math.pow(d.distanceToSquared(u),f),m=Math.pow(u.distanceToSquared(h),f);v<1e-4&&(v=1),g<1e-4&&(g=v),m<1e-4&&(m=v),ra.initNonuniformCatmullRom(l.x,d.x,u.x,h.x,g,v,m),oa.initNonuniformCatmullRom(l.y,d.y,u.y,h.y,g,v,m),aa.initNonuniformCatmullRom(l.z,d.z,u.z,h.z,g,v,m)}else this.curveType==="catmullrom"&&(ra.initCatmullRom(l.x,d.x,u.x,h.x,this.tension),oa.initCatmullRom(l.y,d.y,u.y,h.y,this.tension),aa.initCatmullRom(l.z,d.z,u.z,h.z,this.tension));return n.set(ra.calc(c),oa.calc(c),aa.calc(c)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t.closed=this.closed,t.curveType=this.curveType,t.tension=this.tension,t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new N().fromArray(i))}return this.closed=t.closed,this.curveType=t.curveType,this.tension=t.tension,this}}function Wl(s,t,e,n,i){const r=(n-t)*.5,o=(i-e)*.5,a=s*s,c=s*a;return(2*e-2*n+r+o)*c+(-3*e+3*n-2*r-o)*a+r*s+e}function Dv(s,t){const e=1-s;return e*e*t}function Nv(s,t){return 2*(1-s)*s*t}function Uv(s,t){return s*s*t}function Us(s,t,e,n){return Dv(s,t)+Nv(s,e)+Uv(s,n)}function Fv(s,t){const e=1-s;return e*e*e*t}function Ov(s,t){const e=1-s;return 3*e*e*s*t}function zv(s,t){return 3*(1-s)*s*s*t}function Bv(s,t){return s*s*s*t}function Fs(s,t,e,n,i){return Fv(s,t)+Ov(s,e)+zv(s,n)+Bv(s,i)}class vu extends bn{constructor(t=new nt,e=new nt,n=new nt,i=new nt){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new nt){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Fs(t,i.x,r.x,o.x,a.x),Fs(t,i.y,r.y,o.y,a.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class Gv extends bn{constructor(t=new N,e=new N,n=new N,i=new N){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=t,this.v1=e,this.v2=n,this.v3=i}getPoint(t,e=new N){const n=e,i=this.v0,r=this.v1,o=this.v2,a=this.v3;return n.set(Fs(t,i.x,r.x,o.x,a.x),Fs(t,i.y,r.y,o.y,a.y),Fs(t,i.z,r.z,o.z,a.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this.v3.copy(t.v3),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t.v3=this.v3.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this.v3.fromArray(t.v3),this}}class xu extends bn{constructor(t=new nt,e=new nt){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=t,this.v2=e}getPoint(t,e=new nt){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new nt){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Hv extends bn{constructor(t=new N,e=new N){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=t,this.v2=e}getPoint(t,e=new N){const n=e;return t===1?n.copy(this.v2):(n.copy(this.v2).sub(this.v1),n.multiplyScalar(t).add(this.v1)),n}getPointAt(t,e){return this.getPoint(t,e)}getTangent(t,e=new N){return e.subVectors(this.v2,this.v1).normalize()}getTangentAt(t,e){return this.getTangent(t,e)}copy(t){return super.copy(t),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class yu extends bn{constructor(t=new nt,e=new nt,n=new nt){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new nt){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Us(t,i.x,r.x,o.x),Us(t,i.y,r.y,o.y)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class Wv extends bn{constructor(t=new N,e=new N,n=new N){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=t,this.v1=e,this.v2=n}getPoint(t,e=new N){const n=e,i=this.v0,r=this.v1,o=this.v2;return n.set(Us(t,i.x,r.x,o.x),Us(t,i.y,r.y,o.y),Us(t,i.z,r.z,o.z)),n}copy(t){return super.copy(t),this.v0.copy(t.v0),this.v1.copy(t.v1),this.v2.copy(t.v2),this}toJSON(){const t=super.toJSON();return t.v0=this.v0.toArray(),t.v1=this.v1.toArray(),t.v2=this.v2.toArray(),t}fromJSON(t){return super.fromJSON(t),this.v0.fromArray(t.v0),this.v1.fromArray(t.v1),this.v2.fromArray(t.v2),this}}class ic extends bn{constructor(t=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=t}getPoint(t,e=new nt){const n=e,i=this.points,r=(i.length-1)*t,o=Math.floor(r),a=r-o,c=i[o===0?o:o-1],l=i[o],h=i[o>i.length-2?i.length-1:o+1],d=i[o>i.length-3?i.length-1:o+2];return n.set(Wl(a,c.x,l.x,h.x,d.x),Wl(a,c.y,l.y,h.y,d.y)),n}copy(t){super.copy(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.points=[];for(let e=0,n=this.points.length;e<n;e++){const i=this.points[e];t.points.push(i.toArray())}return t}fromJSON(t){super.fromJSON(t),this.points=[];for(let e=0,n=t.points.length;e<n;e++){const i=t.points[e];this.points.push(new nt().fromArray(i))}return this}}var Ga=Object.freeze({__proto__:null,ArcCurve:Iv,CatmullRomCurve3:gu,CubicBezierCurve:vu,CubicBezierCurve3:Gv,EllipseCurve:ec,LineCurve:xu,LineCurve3:Hv,QuadraticBezierCurve:yu,QuadraticBezierCurve3:Wv,SplineCurve:ic});class kv extends bn{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(t){this.curves.push(t)}closePath(){const t=this.curves[0].getPoint(0),e=this.curves[this.curves.length-1].getPoint(1);if(!t.equals(e)){const n=t.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new Ga[n](e,t))}return this}getPoint(t,e){const n=t*this.getLength(),i=this.getCurveLengths();let r=0;for(;r<i.length;){if(i[r]>=n){const o=i[r]-n,a=this.curves[r],c=a.getLength(),l=c===0?0:1-o/c;return a.getPointAt(l,e)}r++}return null}getLength(){const t=this.getCurveLengths();return t[t.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;const t=[];let e=0;for(let n=0,i=this.curves.length;n<i;n++)e+=this.curves[n].getLength(),t.push(e);return this.cacheLengths=t,t}getSpacedPoints(t=40){const e=[];for(let n=0;n<=t;n++)e.push(this.getPoint(n/t));return this.autoClose&&e.push(e[0]),e}getPoints(t=12){const e=[];let n;for(let i=0,r=this.curves;i<r.length;i++){const o=r[i],a=o.isEllipseCurve?t*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?t*o.points.length:t,c=o.getPoints(a);for(let l=0;l<c.length;l++){const h=c[l];n&&n.equals(h)||(e.push(h),n=h)}}return this.autoClose&&e.length>1&&!e[e.length-1].equals(e[0])&&e.push(e[0]),e}copy(t){super.copy(t),this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(i.clone())}return this.autoClose=t.autoClose,this}toJSON(){const t=super.toJSON();t.autoClose=this.autoClose,t.curves=[];for(let e=0,n=this.curves.length;e<n;e++){const i=this.curves[e];t.curves.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.autoClose=t.autoClose,this.curves=[];for(let e=0,n=t.curves.length;e<n;e++){const i=t.curves[e];this.curves.push(new Ga[i.type]().fromJSON(i))}return this}}class kl extends kv{constructor(t){super(),this.type="Path",this.currentPoint=new nt,t&&this.setFromPoints(t)}setFromPoints(t){this.moveTo(t[0].x,t[0].y);for(let e=1,n=t.length;e<n;e++)this.lineTo(t[e].x,t[e].y);return this}moveTo(t,e){return this.currentPoint.set(t,e),this}lineTo(t,e){const n=new xu(this.currentPoint.clone(),new nt(t,e));return this.curves.push(n),this.currentPoint.set(t,e),this}quadraticCurveTo(t,e,n,i){const r=new yu(this.currentPoint.clone(),new nt(t,e),new nt(n,i));return this.curves.push(r),this.currentPoint.set(n,i),this}bezierCurveTo(t,e,n,i,r,o){const a=new vu(this.currentPoint.clone(),new nt(t,e),new nt(n,i),new nt(r,o));return this.curves.push(a),this.currentPoint.set(r,o),this}splineThru(t){const e=[this.currentPoint.clone()].concat(t),n=new ic(e);return this.curves.push(n),this.currentPoint.copy(t[t.length-1]),this}arc(t,e,n,i,r,o){const a=this.currentPoint.x,c=this.currentPoint.y;return this.absarc(t+a,e+c,n,i,r,o),this}absarc(t,e,n,i,r,o){return this.absellipse(t,e,n,n,i,r,o),this}ellipse(t,e,n,i,r,o,a,c){const l=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(t+l,e+h,n,i,r,o,a,c),this}absellipse(t,e,n,i,r,o,a,c){const l=new ec(t,e,n,i,r,o,a,c);if(this.curves.length>0){const d=l.getPoint(0);d.equals(this.currentPoint)||this.lineTo(d.x,d.y)}this.curves.push(l);const h=l.getPoint(1);return this.currentPoint.copy(h),this}copy(t){return super.copy(t),this.currentPoint.copy(t.currentPoint),this}toJSON(){const t=super.toJSON();return t.currentPoint=this.currentPoint.toArray(),t}fromJSON(t){return super.fromJSON(t),this.currentPoint.fromArray(t.currentPoint),this}}class sc extends he{constructor(t=1,e=32,n=0,i=Math.PI*2){super(),this.type="CircleGeometry",this.parameters={radius:t,segments:e,thetaStart:n,thetaLength:i},e=Math.max(3,e);const r=[],o=[],a=[],c=[],l=new N,h=new nt;o.push(0,0,0),a.push(0,0,1),c.push(.5,.5);for(let d=0,u=3;d<=e;d++,u+=3){const f=n+d/e*i;l.x=t*Math.cos(f),l.y=t*Math.sin(f),o.push(l.x,l.y,l.z),a.push(0,0,1),h.x=(o[u]/t+1)/2,h.y=(o[u+1]/t+1)/2,c.push(h.x,h.y)}for(let d=1;d<=e;d++)r.push(d,d+1,0);this.setIndex(r),this.setAttribute("position",new Jt(o,3)),this.setAttribute("normal",new Jt(a,3)),this.setAttribute("uv",new Jt(c,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new sc(t.radius,t.segments,t.thetaStart,t.thetaLength)}}class xe extends he{constructor(t=1,e=1,n=1,i=32,r=1,o=!1,a=0,c=Math.PI*2){super(),this.type="CylinderGeometry",this.parameters={radiusTop:t,radiusBottom:e,height:n,radialSegments:i,heightSegments:r,openEnded:o,thetaStart:a,thetaLength:c};const l=this;i=Math.floor(i),r=Math.floor(r);const h=[],d=[],u=[],f=[];let g=0;const v=[],m=n/2;let p=0;x(),o===!1&&(t>0&&y(!0),e>0&&y(!1)),this.setIndex(h),this.setAttribute("position",new Jt(d,3)),this.setAttribute("normal",new Jt(u,3)),this.setAttribute("uv",new Jt(f,2));function x(){const _=new N,M=new N;let S=0;const b=(e-t)/n;for(let L=0;L<=r;L++){const w=[],T=L/r,O=T*(e-t)+t;for(let D=0;D<=i;D++){const z=D/i,C=z*c+a,I=Math.sin(C),U=Math.cos(C);M.x=O*I,M.y=-T*n+m,M.z=O*U,d.push(M.x,M.y,M.z),_.set(I,b,U).normalize(),u.push(_.x,_.y,_.z),f.push(z,1-T),w.push(g++)}v.push(w)}for(let L=0;L<i;L++)for(let w=0;w<r;w++){const T=v[w][L],O=v[w+1][L],D=v[w+1][L+1],z=v[w][L+1];h.push(T,O,z),h.push(O,D,z),S+=6}l.addGroup(p,S,0),p+=S}function y(_){const M=g,S=new nt,b=new N;let L=0;const w=_===!0?t:e,T=_===!0?1:-1;for(let D=1;D<=i;D++)d.push(0,m*T,0),u.push(0,T,0),f.push(.5,.5),g++;const O=g;for(let D=0;D<=i;D++){const C=D/i*c+a,I=Math.cos(C),U=Math.sin(C);b.x=w*U,b.y=m*T,b.z=w*I,d.push(b.x,b.y,b.z),u.push(0,T,0),S.x=I*.5+.5,S.y=U*.5*T+.5,f.push(S.x,S.y),g++}for(let D=0;D<i;D++){const z=M+D,C=O+D;_===!0?h.push(C,C+1,z):h.push(C+1,C,z),L+=3}l.addGroup(p,L,_===!0?1:2),p+=L}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new xe(t.radiusTop,t.radiusBottom,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}class rc extends xe{constructor(t=1,e=1,n=32,i=1,r=!1,o=0,a=Math.PI*2){super(0,t,e,n,i,r,o,a),this.type="ConeGeometry",this.parameters={radius:t,height:e,radialSegments:n,heightSegments:i,openEnded:r,thetaStart:o,thetaLength:a}}static fromJSON(t){return new rc(t.radius,t.height,t.radialSegments,t.heightSegments,t.openEnded,t.thetaStart,t.thetaLength)}}let oc=class extends kl{constructor(t){super(t),this.uuid=En(),this.type="Shape",this.holes=[]}getPointsHoles(t){const e=[];for(let n=0,i=this.holes.length;n<i;n++)e[n]=this.holes[n].getPoints(t);return e}extractPoints(t){return{shape:this.getPoints(t),holes:this.getPointsHoles(t)}}copy(t){super.copy(t),this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(i.clone())}return this}toJSON(){const t=super.toJSON();t.uuid=this.uuid,t.holes=[];for(let e=0,n=this.holes.length;e<n;e++){const i=this.holes[e];t.holes.push(i.toJSON())}return t}fromJSON(t){super.fromJSON(t),this.uuid=t.uuid,this.holes=[];for(let e=0,n=t.holes.length;e<n;e++){const i=t.holes[e];this.holes.push(new kl().fromJSON(i))}return this}};const Vv={triangulate:function(s,t,e=2){const n=t&&t.length,i=n?t[0]*e:s.length;let r=_u(s,0,i,e,!0);const o=[];if(!r||r.next===r.prev)return o;let a,c,l,h,d,u,f;if(n&&(r=Kv(s,t,r,e)),s.length>80*e){a=l=s[0],c=h=s[1];for(let g=e;g<i;g+=e)d=s[g],u=s[g+1],d<a&&(a=d),u<c&&(c=u),d>l&&(l=d),u>h&&(h=u);f=Math.max(l-a,h-c),f=f!==0?32767/f:0}return Hs(r,o,e,a,c,f,0),o}};function _u(s,t,e,n,i){let r,o;if(i===ox(s,t,e,n)>0)for(r=t;r<e;r+=n)o=Vl(r,s[r],s[r+1],o);else for(r=e-n;r>=t;r-=n)o=Vl(r,s[r],s[r+1],o);return o&&xo(o,o.next)&&(ks(o),o=o.next),o}function Mi(s,t){if(!s)return s;t||(t=s);let e=s,n;do if(n=!1,!e.steiner&&(xo(e,e.next)||me(e.prev,e,e.next)===0)){if(ks(e),e=t=e.prev,e===e.next)break;n=!0}else e=e.next;while(n||e!==t);return t}function Hs(s,t,e,n,i,r,o){if(!s)return;!o&&r&&tx(s,n,i,r);let a=s,c,l;for(;s.prev!==s.next;){if(c=s.prev,l=s.next,r?qv(s,n,i,r):Xv(s)){t.push(c.i/e|0),t.push(s.i/e|0),t.push(l.i/e|0),ks(s),s=l.next,a=l.next;continue}if(s=l,s===a){o?o===1?(s=Yv(Mi(s),t,e),Hs(s,t,e,n,i,r,2)):o===2&&jv(s,t,e,n,i,r):Hs(Mi(s),t,e,n,i,r,1);break}}}function Xv(s){const t=s.prev,e=s,n=s.next;if(me(t,e,n)>=0)return!1;const i=t.x,r=e.x,o=n.x,a=t.y,c=e.y,l=n.y,h=i<r?i<o?i:o:r<o?r:o,d=a<c?a<l?a:l:c<l?c:l,u=i>r?i>o?i:o:r>o?r:o,f=a>c?a>l?a:l:c>l?c:l;let g=n.next;for(;g!==t;){if(g.x>=h&&g.x<=u&&g.y>=d&&g.y<=f&&Ji(i,a,r,c,o,l,g.x,g.y)&&me(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function qv(s,t,e,n){const i=s.prev,r=s,o=s.next;if(me(i,r,o)>=0)return!1;const a=i.x,c=r.x,l=o.x,h=i.y,d=r.y,u=o.y,f=a<c?a<l?a:l:c<l?c:l,g=h<d?h<u?h:u:d<u?d:u,v=a>c?a>l?a:l:c>l?c:l,m=h>d?h>u?h:u:d>u?d:u,p=Ha(f,g,t,e,n),x=Ha(v,m,t,e,n);let y=s.prevZ,_=s.nextZ;for(;y&&y.z>=p&&_&&_.z<=x;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==i&&y!==o&&Ji(a,h,c,d,l,u,y.x,y.y)&&me(y.prev,y,y.next)>=0||(y=y.prevZ,_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&Ji(a,h,c,d,l,u,_.x,_.y)&&me(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;y&&y.z>=p;){if(y.x>=f&&y.x<=v&&y.y>=g&&y.y<=m&&y!==i&&y!==o&&Ji(a,h,c,d,l,u,y.x,y.y)&&me(y.prev,y,y.next)>=0)return!1;y=y.prevZ}for(;_&&_.z<=x;){if(_.x>=f&&_.x<=v&&_.y>=g&&_.y<=m&&_!==i&&_!==o&&Ji(a,h,c,d,l,u,_.x,_.y)&&me(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Yv(s,t,e){let n=s;do{const i=n.prev,r=n.next.next;!xo(i,r)&&Mu(i,n,n.next,r)&&Ws(i,r)&&Ws(r,i)&&(t.push(i.i/e|0),t.push(n.i/e|0),t.push(r.i/e|0),ks(n),ks(n.next),n=s=r),n=n.next}while(n!==s);return Mi(n)}function jv(s,t,e,n,i,r){let o=s;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&ix(o,a)){let c=Su(o,a);o=Mi(o,o.next),c=Mi(c,c.next),Hs(o,t,e,n,i,r,0),Hs(c,t,e,n,i,r,0);return}a=a.next}o=o.next}while(o!==s)}function Kv(s,t,e,n){const i=[];let r,o,a,c,l;for(r=0,o=t.length;r<o;r++)a=t[r]*n,c=r<o-1?t[r+1]*n:s.length,l=_u(s,a,c,n,!1),l===l.next&&(l.steiner=!0),i.push(nx(l));for(i.sort(Zv),r=0;r<i.length;r++)e=Jv(i[r],e);return e}function Zv(s,t){return s.x-t.x}function Jv(s,t){const e=Qv(s,t);if(!e)return t;const n=Su(e,s);return Mi(n,n.next),Mi(e,e.next)}function Qv(s,t){let e=t,n=-1/0,i;const r=s.x,o=s.y;do{if(o<=e.y&&o>=e.next.y&&e.next.y!==e.y){const u=e.x+(o-e.y)*(e.next.x-e.x)/(e.next.y-e.y);if(u<=r&&u>n&&(n=u,i=e.x<e.next.x?e:e.next,u===r))return i}e=e.next}while(e!==t);if(!i)return null;const a=i,c=i.x,l=i.y;let h=1/0,d;e=i;do r>=e.x&&e.x>=c&&r!==e.x&&Ji(o<l?r:n,o,c,l,o<l?n:r,o,e.x,e.y)&&(d=Math.abs(o-e.y)/(r-e.x),Ws(e,s)&&(d<h||d===h&&(e.x>i.x||e.x===i.x&&$v(i,e)))&&(i=e,h=d)),e=e.next;while(e!==a);return i}function $v(s,t){return me(s.prev,s,t.prev)<0&&me(t.next,s,s.next)<0}function tx(s,t,e,n){let i=s;do i.z===0&&(i.z=Ha(i.x,i.y,t,e,n)),i.prevZ=i.prev,i.nextZ=i.next,i=i.next;while(i!==s);i.prevZ.nextZ=null,i.prevZ=null,ex(i)}function ex(s){let t,e,n,i,r,o,a,c,l=1;do{for(e=s,s=null,r=null,o=0;e;){for(o++,n=e,a=0,t=0;t<l&&(a++,n=n.nextZ,!!n);t++);for(c=l;a>0||c>0&&n;)a!==0&&(c===0||!n||e.z<=n.z)?(i=e,e=e.nextZ,a--):(i=n,n=n.nextZ,c--),r?r.nextZ=i:s=i,i.prevZ=r,r=i;e=n}r.nextZ=null,l*=2}while(o>1);return s}function Ha(s,t,e,n,i){return s=(s-e)*i|0,t=(t-n)*i|0,s=(s|s<<8)&16711935,s=(s|s<<4)&252645135,s=(s|s<<2)&858993459,s=(s|s<<1)&1431655765,t=(t|t<<8)&16711935,t=(t|t<<4)&252645135,t=(t|t<<2)&858993459,t=(t|t<<1)&1431655765,s|t<<1}function nx(s){let t=s,e=s;do(t.x<e.x||t.x===e.x&&t.y<e.y)&&(e=t),t=t.next;while(t!==s);return e}function Ji(s,t,e,n,i,r,o,a){return(i-o)*(t-a)>=(s-o)*(r-a)&&(s-o)*(n-a)>=(e-o)*(t-a)&&(e-o)*(r-a)>=(i-o)*(n-a)}function ix(s,t){return s.next.i!==t.i&&s.prev.i!==t.i&&!sx(s,t)&&(Ws(s,t)&&Ws(t,s)&&rx(s,t)&&(me(s.prev,s,t.prev)||me(s,t.prev,t))||xo(s,t)&&me(s.prev,s,s.next)>0&&me(t.prev,t,t.next)>0)}function me(s,t,e){return(t.y-s.y)*(e.x-t.x)-(t.x-s.x)*(e.y-t.y)}function xo(s,t){return s.x===t.x&&s.y===t.y}function Mu(s,t,e,n){const i=Ar(me(s,t,e)),r=Ar(me(s,t,n)),o=Ar(me(e,n,s)),a=Ar(me(e,n,t));return!!(i!==r&&o!==a||i===0&&Tr(s,e,t)||r===0&&Tr(s,n,t)||o===0&&Tr(e,s,n)||a===0&&Tr(e,t,n))}function Tr(s,t,e){return t.x<=Math.max(s.x,e.x)&&t.x>=Math.min(s.x,e.x)&&t.y<=Math.max(s.y,e.y)&&t.y>=Math.min(s.y,e.y)}function Ar(s){return s>0?1:s<0?-1:0}function sx(s,t){let e=s;do{if(e.i!==s.i&&e.next.i!==s.i&&e.i!==t.i&&e.next.i!==t.i&&Mu(e,e.next,s,t))return!0;e=e.next}while(e!==s);return!1}function Ws(s,t){return me(s.prev,s,s.next)<0?me(s,t,s.next)>=0&&me(s,s.prev,t)>=0:me(s,t,s.prev)<0||me(s,s.next,t)<0}function rx(s,t){let e=s,n=!1;const i=(s.x+t.x)/2,r=(s.y+t.y)/2;do e.y>r!=e.next.y>r&&e.next.y!==e.y&&i<(e.next.x-e.x)*(r-e.y)/(e.next.y-e.y)+e.x&&(n=!n),e=e.next;while(e!==s);return n}function Su(s,t){const e=new Wa(s.i,s.x,s.y),n=new Wa(t.i,t.x,t.y),i=s.next,r=t.prev;return s.next=t,t.prev=s,e.next=i,i.prev=e,n.next=e,e.prev=n,r.next=n,n.prev=r,n}function Vl(s,t,e,n){const i=new Wa(s,t,e);return n?(i.next=n.next,i.prev=n,n.next.prev=i,n.next=i):(i.prev=i,i.next=i),i}function ks(s){s.next.prev=s.prev,s.prev.next=s.next,s.prevZ&&(s.prevZ.nextZ=s.nextZ),s.nextZ&&(s.nextZ.prevZ=s.prevZ)}function Wa(s,t,e){this.i=s,this.x=t,this.y=e,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}function ox(s,t,e,n){let i=0;for(let r=t,o=e-n;r<e;r+=n)i+=(s[o]-s[r])*(s[r+1]+s[o+1]),o=r;return i}class Os{static area(t){const e=t.length;let n=0;for(let i=e-1,r=0;r<e;i=r++)n+=t[i].x*t[r].y-t[r].x*t[i].y;return n*.5}static isClockWise(t){return Os.area(t)<0}static triangulateShape(t,e){const n=[],i=[],r=[];Xl(t),ql(n,t);let o=t.length;e.forEach(Xl);for(let c=0;c<e.length;c++)i.push(o),o+=e[c].length,ql(n,e[c]);const a=Vv.triangulate(n,i);for(let c=0;c<a.length;c+=3)r.push(a.slice(c,c+3));return r}}function Xl(s){const t=s.length;t>2&&s[t-1].equals(s[0])&&s.pop()}function ql(s,t){for(let e=0;e<t.length;e++)s.push(t[e].x),s.push(t[e].y)}class yo extends he{constructor(t=new oc([new nt(.5,.5),new nt(-.5,.5),new nt(-.5,-.5),new nt(.5,-.5)]),e={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:t,options:e},t=Array.isArray(t)?t:[t];const n=this,i=[],r=[];for(let a=0,c=t.length;a<c;a++){const l=t[a];o(l)}this.setAttribute("position",new Jt(i,3)),this.setAttribute("uv",new Jt(r,2)),this.computeVertexNormals();function o(a){const c=[],l=e.curveSegments!==void 0?e.curveSegments:12,h=e.steps!==void 0?e.steps:1,d=e.depth!==void 0?e.depth:1;let u=e.bevelEnabled!==void 0?e.bevelEnabled:!0,f=e.bevelThickness!==void 0?e.bevelThickness:.2,g=e.bevelSize!==void 0?e.bevelSize:f-.1,v=e.bevelOffset!==void 0?e.bevelOffset:0,m=e.bevelSegments!==void 0?e.bevelSegments:3;const p=e.extrudePath,x=e.UVGenerator!==void 0?e.UVGenerator:ax;let y,_=!1,M,S,b,L;p&&(y=p.getSpacedPoints(h),_=!0,u=!1,M=p.computeFrenetFrames(h,!1),S=new N,b=new N,L=new N),u||(m=0,f=0,g=0,v=0);const w=a.extractPoints(l);let T=w.shape;const O=w.holes;if(!Os.isClockWise(T)){T=T.reverse();for(let F=0,at=O.length;F<at;F++){const J=O[F];Os.isClockWise(J)&&(O[F]=J.reverse())}}const z=Os.triangulateShape(T,O),C=T;for(let F=0,at=O.length;F<at;F++){const J=O[F];T=T.concat(J)}function I(F,at,J){return at||console.error("THREE.ExtrudeGeometry: vec does not exist"),F.clone().addScaledVector(at,J)}const U=T.length,Y=z.length;function G(F,at,J){let lt,tt,Ct;const xt=F.x-at.x,R=F.y-at.y,A=J.x-F.x,H=J.y-F.y,ot=xt*xt+R*R,st=xt*H-R*A;if(Math.abs(st)>Number.EPSILON){const rt=Math.sqrt(ot),yt=Math.sqrt(A*A+H*H),gt=at.x-R/rt,wt=at.y+xt/rt,Dt=J.x-H/yt,Wt=J.y+A/yt,ct=((Dt-gt)*H-(Wt-wt)*A)/(xt*H-R*A);lt=gt+xt*ct-F.x,tt=wt+R*ct-F.y;const te=lt*lt+tt*tt;if(te<=2)return new nt(lt,tt);Ct=Math.sqrt(te/2)}else{let rt=!1;xt>Number.EPSILON?A>Number.EPSILON&&(rt=!0):xt<-Number.EPSILON?A<-Number.EPSILON&&(rt=!0):Math.sign(R)===Math.sign(H)&&(rt=!0),rt?(lt=-R,tt=xt,Ct=Math.sqrt(ot)):(lt=xt,tt=R,Ct=Math.sqrt(ot/2))}return new nt(lt/Ct,tt/Ct)}const k=[];for(let F=0,at=C.length,J=at-1,lt=F+1;F<at;F++,J++,lt++)J===at&&(J=0),lt===at&&(lt=0),k[F]=G(C[F],C[J],C[lt]);const Q=[];let V,X=k.concat();for(let F=0,at=O.length;F<at;F++){const J=O[F];V=[];for(let lt=0,tt=J.length,Ct=tt-1,xt=lt+1;lt<tt;lt++,Ct++,xt++)Ct===tt&&(Ct=0),xt===tt&&(xt=0),V[lt]=G(J[lt],J[Ct],J[xt]);Q.push(V),X=X.concat(V)}for(let F=0;F<m;F++){const at=F/m,J=f*Math.cos(at*Math.PI/2),lt=g*Math.sin(at*Math.PI/2)+v;for(let tt=0,Ct=C.length;tt<Ct;tt++){const xt=I(C[tt],k[tt],lt);it(xt.x,xt.y,-J)}for(let tt=0,Ct=O.length;tt<Ct;tt++){const xt=O[tt];V=Q[tt];for(let R=0,A=xt.length;R<A;R++){const H=I(xt[R],V[R],lt);it(H.x,H.y,-J)}}}const q=g+v;for(let F=0;F<U;F++){const at=u?I(T[F],X[F],q):T[F];_?(b.copy(M.normals[0]).multiplyScalar(at.x),S.copy(M.binormals[0]).multiplyScalar(at.y),L.copy(y[0]).add(b).add(S),it(L.x,L.y,L.z)):it(at.x,at.y,0)}for(let F=1;F<=h;F++)for(let at=0;at<U;at++){const J=u?I(T[at],X[at],q):T[at];_?(b.copy(M.normals[F]).multiplyScalar(J.x),S.copy(M.binormals[F]).multiplyScalar(J.y),L.copy(y[F]).add(b).add(S),it(L.x,L.y,L.z)):it(J.x,J.y,d/h*F)}for(let F=m-1;F>=0;F--){const at=F/m,J=f*Math.cos(at*Math.PI/2),lt=g*Math.sin(at*Math.PI/2)+v;for(let tt=0,Ct=C.length;tt<Ct;tt++){const xt=I(C[tt],k[tt],lt);it(xt.x,xt.y,d+J)}for(let tt=0,Ct=O.length;tt<Ct;tt++){const xt=O[tt];V=Q[tt];for(let R=0,A=xt.length;R<A;R++){const H=I(xt[R],V[R],lt);_?it(H.x,H.y+y[h-1].y,y[h-1].x+J):it(H.x,H.y,d+J)}}}et(),ut();function et(){const F=i.length/3;if(u){let at=0,J=U*at;for(let lt=0;lt<Y;lt++){const tt=z[lt];vt(tt[2]+J,tt[1]+J,tt[0]+J)}at=h+m*2,J=U*at;for(let lt=0;lt<Y;lt++){const tt=z[lt];vt(tt[0]+J,tt[1]+J,tt[2]+J)}}else{for(let at=0;at<Y;at++){const J=z[at];vt(J[2],J[1],J[0])}for(let at=0;at<Y;at++){const J=z[at];vt(J[0]+U*h,J[1]+U*h,J[2]+U*h)}}n.addGroup(F,i.length/3-F,0)}function ut(){const F=i.length/3;let at=0;pt(C,at),at+=C.length;for(let J=0,lt=O.length;J<lt;J++){const tt=O[J];pt(tt,at),at+=tt.length}n.addGroup(F,i.length/3-F,1)}function pt(F,at){let J=F.length;for(;--J>=0;){const lt=J;let tt=J-1;tt<0&&(tt=F.length-1);for(let Ct=0,xt=h+m*2;Ct<xt;Ct++){const R=U*Ct,A=U*(Ct+1),H=at+lt+R,ot=at+tt+R,st=at+tt+A,rt=at+lt+A;St(H,ot,st,rt)}}}function it(F,at,J){c.push(F),c.push(at),c.push(J)}function vt(F,at,J){mt(F),mt(at),mt(J);const lt=i.length/3,tt=x.generateTopUV(n,i,lt-3,lt-2,lt-1);ht(tt[0]),ht(tt[1]),ht(tt[2])}function St(F,at,J,lt){mt(F),mt(at),mt(lt),mt(at),mt(J),mt(lt);const tt=i.length/3,Ct=x.generateSideWallUV(n,i,tt-6,tt-3,tt-2,tt-1);ht(Ct[0]),ht(Ct[1]),ht(Ct[3]),ht(Ct[1]),ht(Ct[2]),ht(Ct[3])}function mt(F){i.push(c[F*3+0]),i.push(c[F*3+1]),i.push(c[F*3+2])}function ht(F){r.push(F.x),r.push(F.y)}}}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}toJSON(){const t=super.toJSON(),e=this.parameters.shapes,n=this.parameters.options;return cx(e,n,t)}static fromJSON(t,e){const n=[];for(let r=0,o=t.shapes.length;r<o;r++){const a=e[t.shapes[r]];n.push(a)}const i=t.options.extrudePath;return i!==void 0&&(t.options.extrudePath=new Ga[i.type]().fromJSON(i)),new yo(n,t.options)}}const ax={generateTopUV:function(s,t,e,n,i){const r=t[e*3],o=t[e*3+1],a=t[n*3],c=t[n*3+1],l=t[i*3],h=t[i*3+1];return[new nt(r,o),new nt(a,c),new nt(l,h)]},generateSideWallUV:function(s,t,e,n,i,r){const o=t[e*3],a=t[e*3+1],c=t[e*3+2],l=t[n*3],h=t[n*3+1],d=t[n*3+2],u=t[i*3],f=t[i*3+1],g=t[i*3+2],v=t[r*3],m=t[r*3+1],p=t[r*3+2];return Math.abs(a-h)<Math.abs(o-l)?[new nt(o,1-c),new nt(l,1-d),new nt(u,1-g),new nt(v,1-p)]:[new nt(a,1-c),new nt(h,1-d),new nt(f,1-g),new nt(m,1-p)]}};function cx(s,t,e){if(e.shapes=[],Array.isArray(s))for(let n=0,i=s.length;n<i;n++){const r=s[n];e.shapes.push(r.uuid)}else e.shapes.push(s.uuid);return e.options=Object.assign({},t),t.extrudePath!==void 0&&(e.options.extrudePath=t.extrudePath.toJSON()),e}class ac extends he{constructor(t=.5,e=1,n=32,i=1,r=0,o=Math.PI*2){super(),this.type="RingGeometry",this.parameters={innerRadius:t,outerRadius:e,thetaSegments:n,phiSegments:i,thetaStart:r,thetaLength:o},n=Math.max(3,n),i=Math.max(1,i);const a=[],c=[],l=[],h=[];let d=t;const u=(e-t)/i,f=new N,g=new nt;for(let v=0;v<=i;v++){for(let m=0;m<=n;m++){const p=r+m/n*o;f.x=d*Math.cos(p),f.y=d*Math.sin(p),c.push(f.x,f.y,f.z),l.push(0,0,1),g.x=(f.x/e+1)/2,g.y=(f.y/e+1)/2,h.push(g.x,g.y)}d+=u}for(let v=0;v<i;v++){const m=v*(n+1);for(let p=0;p<n;p++){const x=p+m,y=x,_=x+n+1,M=x+n+2,S=x+1;a.push(y,_,S),a.push(_,M,S)}}this.setIndex(a),this.setAttribute("position",new Jt(c,3)),this.setAttribute("normal",new Jt(l,3)),this.setAttribute("uv",new Jt(h,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new ac(t.innerRadius,t.outerRadius,t.thetaSegments,t.phiSegments,t.thetaStart,t.thetaLength)}}class Vs extends he{constructor(t=1,e=32,n=16,i=0,r=Math.PI*2,o=0,a=Math.PI){super(),this.type="SphereGeometry",this.parameters={radius:t,widthSegments:e,heightSegments:n,phiStart:i,phiLength:r,thetaStart:o,thetaLength:a},e=Math.max(3,Math.floor(e)),n=Math.max(2,Math.floor(n));const c=Math.min(o+a,Math.PI);let l=0;const h=[],d=new N,u=new N,f=[],g=[],v=[],m=[];for(let p=0;p<=n;p++){const x=[],y=p/n;let _=0;p===0&&o===0?_=.5/e:p===n&&c===Math.PI&&(_=-.5/e);for(let M=0;M<=e;M++){const S=M/e;d.x=-t*Math.cos(i+S*r)*Math.sin(o+y*a),d.y=t*Math.cos(o+y*a),d.z=t*Math.sin(i+S*r)*Math.sin(o+y*a),g.push(d.x,d.y,d.z),u.copy(d).normalize(),v.push(u.x,u.y,u.z),m.push(S+_,1-y),x.push(l++)}h.push(x)}for(let p=0;p<n;p++)for(let x=0;x<e;x++){const y=h[p][x+1],_=h[p][x],M=h[p+1][x],S=h[p+1][x+1];(p!==0||o>0)&&f.push(y,_,S),(p!==n-1||c<Math.PI)&&f.push(_,M,S)}this.setIndex(f),this.setAttribute("position",new Jt(g,3)),this.setAttribute("normal",new Jt(v,3)),this.setAttribute("uv",new Jt(m,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new Vs(t.radius,t.widthSegments,t.heightSegments,t.phiStart,t.phiLength,t.thetaStart,t.thetaLength)}}class js extends he{constructor(t=1,e=.4,n=12,i=48,r=Math.PI*2){super(),this.type="TorusGeometry",this.parameters={radius:t,tube:e,radialSegments:n,tubularSegments:i,arc:r},n=Math.floor(n),i=Math.floor(i);const o=[],a=[],c=[],l=[],h=new N,d=new N,u=new N;for(let f=0;f<=n;f++)for(let g=0;g<=i;g++){const v=g/i*r,m=f/n*Math.PI*2;d.x=(t+e*Math.cos(m))*Math.cos(v),d.y=(t+e*Math.cos(m))*Math.sin(v),d.z=e*Math.sin(m),a.push(d.x,d.y,d.z),h.x=t*Math.cos(v),h.y=t*Math.sin(v),u.subVectors(d,h).normalize(),c.push(u.x,u.y,u.z),l.push(g/i),l.push(f/n)}for(let f=1;f<=n;f++)for(let g=1;g<=i;g++){const v=(i+1)*f+g-1,m=(i+1)*(f-1)+g-1,p=(i+1)*(f-1)+g,x=(i+1)*f+g;o.push(v,m,x),o.push(m,p,x)}this.setIndex(o),this.setAttribute("position",new Jt(a,3)),this.setAttribute("normal",new Jt(c,3)),this.setAttribute("uv",new Jt(l,2))}copy(t){return super.copy(t),this.parameters=Object.assign({},t.parameters),this}static fromJSON(t){return new js(t.radius,t.tube,t.radialSegments,t.tubularSegments,t.arc)}}class lx extends Le{constructor(t){super(t),this.isRawShaderMaterial=!0,this.type="RawShaderMaterial"}}class Bt extends cs{constructor(t){super(),this.isMeshStandardMaterial=!0,this.defines={STANDARD:""},this.type="MeshStandardMaterial",this.color=new Ft(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Ft(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Yh,this.normalScale=new nt(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(t)}copy(t){return super.copy(t),this.defines={STANDARD:""},this.color.copy(t.color),this.roughness=t.roughness,this.metalness=t.metalness,this.map=t.map,this.lightMap=t.lightMap,this.lightMapIntensity=t.lightMapIntensity,this.aoMap=t.aoMap,this.aoMapIntensity=t.aoMapIntensity,this.emissive.copy(t.emissive),this.emissiveMap=t.emissiveMap,this.emissiveIntensity=t.emissiveIntensity,this.bumpMap=t.bumpMap,this.bumpScale=t.bumpScale,this.normalMap=t.normalMap,this.normalMapType=t.normalMapType,this.normalScale.copy(t.normalScale),this.displacementMap=t.displacementMap,this.displacementScale=t.displacementScale,this.displacementBias=t.displacementBias,this.roughnessMap=t.roughnessMap,this.metalnessMap=t.metalnessMap,this.alphaMap=t.alphaMap,this.envMap=t.envMap,this.envMapIntensity=t.envMapIntensity,this.wireframe=t.wireframe,this.wireframeLinewidth=t.wireframeLinewidth,this.wireframeLinecap=t.wireframeLinecap,this.wireframeLinejoin=t.wireframeLinejoin,this.flatShading=t.flatShading,this.fog=t.fog,this}}class $e extends Bt{constructor(t){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new nt(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Re(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(e){this.ior=(1+.4*e)/(1-.4*e)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new Ft(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new Ft(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new Ft(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(t)}get anisotropy(){return this._anisotropy}set anisotropy(t){this._anisotropy>0!=t>0&&this.version++,this._anisotropy=t}get clearcoat(){return this._clearcoat}set clearcoat(t){this._clearcoat>0!=t>0&&this.version++,this._clearcoat=t}get iridescence(){return this._iridescence}set iridescence(t){this._iridescence>0!=t>0&&this.version++,this._iridescence=t}get sheen(){return this._sheen}set sheen(t){this._sheen>0!=t>0&&this.version++,this._sheen=t}get transmission(){return this._transmission}set transmission(t){this._transmission>0!=t>0&&this.version++,this._transmission=t}copy(t){return super.copy(t),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=t.anisotropy,this.anisotropyRotation=t.anisotropyRotation,this.anisotropyMap=t.anisotropyMap,this.clearcoat=t.clearcoat,this.clearcoatMap=t.clearcoatMap,this.clearcoatRoughness=t.clearcoatRoughness,this.clearcoatRoughnessMap=t.clearcoatRoughnessMap,this.clearcoatNormalMap=t.clearcoatNormalMap,this.clearcoatNormalScale.copy(t.clearcoatNormalScale),this.ior=t.ior,this.iridescence=t.iridescence,this.iridescenceMap=t.iridescenceMap,this.iridescenceIOR=t.iridescenceIOR,this.iridescenceThicknessRange=[...t.iridescenceThicknessRange],this.iridescenceThicknessMap=t.iridescenceThicknessMap,this.sheen=t.sheen,this.sheenColor.copy(t.sheenColor),this.sheenColorMap=t.sheenColorMap,this.sheenRoughness=t.sheenRoughness,this.sheenRoughnessMap=t.sheenRoughnessMap,this.transmission=t.transmission,this.transmissionMap=t.transmissionMap,this.thickness=t.thickness,this.thicknessMap=t.thicknessMap,this.attenuationDistance=t.attenuationDistance,this.attenuationColor.copy(t.attenuationColor),this.specularIntensity=t.specularIntensity,this.specularIntensityMap=t.specularIntensityMap,this.specularColor.copy(t.specularColor),this.specularColorMap=t.specularColorMap,this}}class wu extends Ie{constructor(t,e=1){super(),this.isLight=!0,this.type="Light",this.color=new Ft(t),this.intensity=e}dispose(){}copy(t,e){return super.copy(t,e),this.color.copy(t.color),this.intensity=t.intensity,this}toJSON(t){const e=super.toJSON(t);return e.object.color=this.color.getHex(),e.object.intensity=this.intensity,this.groundColor!==void 0&&(e.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(e.object.distance=this.distance),this.angle!==void 0&&(e.object.angle=this.angle),this.decay!==void 0&&(e.object.decay=this.decay),this.penumbra!==void 0&&(e.object.penumbra=this.penumbra),this.shadow!==void 0&&(e.object.shadow=this.shadow.toJSON()),e}}class hx extends wu{constructor(t,e,n){super(t,n),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Ft(e)}copy(t,e){return super.copy(t,e),this.groundColor.copy(t.groundColor),this}}const ca=new ne,Yl=new N,jl=new N;class ux{constructor(t){this.camera=t,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new nt(512,512),this.map=null,this.mapPass=null,this.matrix=new ne,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Ja,this._frameExtents=new nt(1,1),this._viewportCount=1,this._viewports=[new Pe(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(t){const e=this.camera,n=this.matrix;Yl.setFromMatrixPosition(t.matrixWorld),e.position.copy(Yl),jl.setFromMatrixPosition(t.target.matrixWorld),e.lookAt(jl),e.updateMatrixWorld(),ca.multiplyMatrices(e.projectionMatrix,e.matrixWorldInverse),this._frustum.setFromProjectionMatrix(ca),n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(ca)}getViewport(t){return this._viewports[t]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(t){return this.camera=t.camera.clone(),this.bias=t.bias,this.radius=t.radius,this.mapSize.copy(t.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const t={};return this.bias!==0&&(t.bias=this.bias),this.normalBias!==0&&(t.normalBias=this.normalBias),this.radius!==1&&(t.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(t.mapSize=this.mapSize.toArray()),t.camera=this.camera.toJSON(!1).object,delete t.camera.matrix,t}}class dx extends ux{constructor(){super(new Qa(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class fx extends wu{constructor(t,e){super(t,e),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(Ie.DEFAULT_UP),this.updateMatrix(),this.target=new Ie,this.shadow=new dx}dispose(){this.shadow.dispose()}copy(t){return super.copy(t),this.target=t.target.clone(),this.shadow=t.shadow.clone(),this}}class px{constructor(t=!0){this.autoStart=t,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=Kl(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let t=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const e=Kl();t=(e-this.oldTime)/1e3,this.oldTime=e,this.elapsedTime+=t}return t}}function Kl(){return(typeof performance>"u"?Date:performance).now()}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:qa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=qa);class _o extends ${constructor(){const t=_o.SkyShader,e=new Le({name:t.name,uniforms:Gn.clone(t.uniforms),vertexShader:t.vertexShader,fragmentShader:t.fragmentShader,side:Ve,depthWrite:!1});super(new At(1,1,1),e),this.isSky=!0}}_o.SkyShader={name:"SkyShader",uniforms:{turbidity:{value:2},rayleigh:{value:1},mieCoefficient:{value:.005},mieDirectionalG:{value:.8},sunPosition:{value:new N},up:{value:new N(0,1,0)}},vertexShader:`
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

		}`};const Eu={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class Ei{constructor(){this.isPass=!0,this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}dispose(){}}const mx=new Qa(-1,1,1,-1,0,1);class gx extends he{constructor(){super(),this.setAttribute("position",new Jt([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new Jt([0,2,0,0,2,0],2))}}const vx=new gx;class Mo{constructor(t){this._mesh=new $(vx,t)}dispose(){this._mesh.geometry.dispose()}render(t){t.render(this._mesh,mx)}get material(){return this._mesh.material}set material(t){this._mesh.material=t}}class bu extends Ei{constructor(t,e){super(),this.textureID=e!==void 0?e:"tDiffuse",t instanceof Le?(this.uniforms=t.uniforms,this.material=t):t&&(this.uniforms=Gn.clone(t.uniforms),this.material=new Le({name:t.name!==void 0?t.name:"unspecified",defines:Object.assign({},t.defines),uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader})),this.fsQuad=new Mo(this.material)}render(t,e,n){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=n.texture),this.fsQuad.material=this.material,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}class Zl extends Ei{constructor(t,e){super(),this.scene=t,this.camera=e,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(t,e,n){const i=t.getContext(),r=t.state;r.buffers.color.setMask(!1),r.buffers.depth.setMask(!1),r.buffers.color.setLocked(!0),r.buffers.depth.setLocked(!0);let o,a;this.inverse?(o=0,a=1):(o=1,a=0),r.buffers.stencil.setTest(!0),r.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),r.buffers.stencil.setFunc(i.ALWAYS,o,4294967295),r.buffers.stencil.setClear(a),r.buffers.stencil.setLocked(!0),t.setRenderTarget(n),this.clear&&t.clear(),t.render(this.scene,this.camera),t.setRenderTarget(e),this.clear&&t.clear(),t.render(this.scene,this.camera),r.buffers.color.setLocked(!1),r.buffers.depth.setLocked(!1),r.buffers.color.setMask(!0),r.buffers.depth.setMask(!0),r.buffers.stencil.setLocked(!1),r.buffers.stencil.setFunc(i.EQUAL,1,4294967295),r.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),r.buffers.stencil.setLocked(!0)}}class xx extends Ei{constructor(){super(),this.needsSwap=!1}render(t){t.state.buffers.stencil.setLocked(!1),t.state.buffers.stencil.setTest(!1)}}class yx{constructor(t,e){if(this.renderer=t,this._pixelRatio=t.getPixelRatio(),e===void 0){const n=t.getSize(new nt);this._width=n.width,this._height=n.height,e=new Qe(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:mn}),e.texture.name="EffectComposer.rt1"}else this._width=e.width,this._height=e.height;this.renderTarget1=e,this.renderTarget2=e.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new bu(Eu),this.copyPass.material.blending=Bn,this.clock=new px}swapBuffers(){const t=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=t}addPass(t){this.passes.push(t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(t,e){this.passes.splice(e,0,t),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(t){const e=this.passes.indexOf(t);e!==-1&&this.passes.splice(e,1)}isLastEnabledPass(t){for(let e=t+1;e<this.passes.length;e++)if(this.passes[e].enabled)return!1;return!0}render(t){t===void 0&&(t=this.clock.getDelta());const e=this.renderer.getRenderTarget();let n=!1;for(let i=0,r=this.passes.length;i<r;i++){const o=this.passes[i];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),o.render(this.renderer,this.writeBuffer,this.readBuffer,t,n),o.needsSwap){if(n){const a=this.renderer.getContext(),c=this.renderer.state.buffers.stencil;c.setFunc(a.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,t),c.setFunc(a.EQUAL,1,4294967295)}this.swapBuffers()}Zl!==void 0&&(o instanceof Zl?n=!0:o instanceof xx&&(n=!1))}}this.renderer.setRenderTarget(e)}reset(t){if(t===void 0){const e=this.renderer.getSize(new nt);this._pixelRatio=this.renderer.getPixelRatio(),this._width=e.width,this._height=e.height,t=this.renderTarget1.clone(),t.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=t,this.renderTarget2=t.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(t,e){this._width=t,this._height=e;const n=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(n,i),this.renderTarget2.setSize(n,i);for(let r=0;r<this.passes.length;r++)this.passes[r].setSize(n,i)}setPixelRatio(t){this._pixelRatio=t,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}class _x extends Ei{constructor(t,e,n=null,i=null,r=null){super(),this.scene=t,this.camera=e,this.overrideMaterial=n,this.clearColor=i,this.clearAlpha=r,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new Ft}render(t,e,n){const i=t.autoClear;t.autoClear=!1;let r,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(t.getClearColor(this._oldClearColor),t.setClearColor(this.clearColor)),this.clearAlpha!==null&&(r=t.getClearAlpha(),t.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&t.clearDepth(),t.setRenderTarget(this.renderToScreen?null:n),this.clear===!0&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),t.render(this.scene,this.camera),this.clearColor!==null&&t.setClearColor(this._oldClearColor),this.clearAlpha!==null&&t.setClearAlpha(r),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),t.autoClear=i}}const Mx={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new Ft(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class os extends Ei{constructor(t,e,n,i){super(),this.strength=e!==void 0?e:1,this.radius=n,this.threshold=i,this.resolution=t!==void 0?new nt(t.x,t.y):new nt(256,256),this.clearColor=new Ft(0,0,0),this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Qe(r,o,{type:mn}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let d=0;d<this.nMips;d++){const u=new Qe(r,o,{type:mn});u.texture.name="UnrealBloomPass.h"+d,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const f=new Qe(r,o,{type:mn});f.texture.name="UnrealBloomPass.v"+d,f.texture.generateMipmaps=!1,this.renderTargetsVertical.push(f),r=Math.round(r/2),o=Math.round(o/2)}const a=Mx;this.highPassUniforms=Gn.clone(a.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new Le({uniforms:this.highPassUniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];r=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let d=0;d<this.nMips;d++)this.separableBlurMaterials.push(this.getSeperableBlurMaterial(c[d])),this.separableBlurMaterials[d].uniforms.invSize.value=new nt(1/r,1/o),r=Math.round(r/2),o=Math.round(o/2);this.compositeMaterial=this.getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=e,this.compositeMaterial.uniforms.bloomRadius.value=.1;const l=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=l,this.bloomTintColors=[new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1),new N(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors;const h=Eu;this.copyUniforms=Gn.clone(h.uniforms),this.blendMaterial=new Le({uniforms:this.copyUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader,blending:Ra,depthTest:!1,depthWrite:!1,transparent:!0}),this.enabled=!0,this.needsSwap=!1,this._oldClearColor=new Ft,this.oldClearAlpha=1,this.basic=new ls,this.fsQuad=new Mo(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this.basic.dispose(),this.fsQuad.dispose()}setSize(t,e){let n=Math.round(t/2),i=Math.round(e/2);this.renderTargetBright.setSize(n,i);for(let r=0;r<this.nMips;r++)this.renderTargetsHorizontal[r].setSize(n,i),this.renderTargetsVertical[r].setSize(n,i),this.separableBlurMaterials[r].uniforms.invSize.value=new nt(1/n,1/i),n=Math.round(n/2),i=Math.round(i/2)}render(t,e,n,i,r){t.getClearColor(this._oldClearColor),this.oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),r&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this.fsQuad.material=this.basic,this.basic.map=n.texture,t.setRenderTarget(null),t.clear(),this.fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=n.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this.fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this.fsQuad.render(t);let a=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this.fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=a.texture,this.separableBlurMaterials[c].uniforms.direction.value=os.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this.fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=os.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this.fsQuad.render(t),a=this.renderTargetsVertical[c];this.fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,r&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(n),this.fsQuad.render(t)),t.setClearColor(this._oldClearColor,this.oldClearAlpha),t.autoClear=o}getSeperableBlurMaterial(t){const e=[];for(let n=0;n<t;n++)e.push(.39894*Math.exp(-.5*n*n/(t*t))/t);return new Le({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new nt(.5,.5)},direction:{value:new nt(.5,.5)},gaussianCoefficients:{value:e}},vertexShader:`varying vec2 vUv;
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
				}`})}getCompositeMaterial(t){return new Le({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}}os.BlurDirectionX=new nt(1,0);os.BlurDirectionY=new nt(0,1);const Cr={defines:{SMAA_THRESHOLD:"0.1"},uniforms:{tDiffuse:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`},Rr={defines:{SMAA_MAX_SEARCH_STEPS:"8",SMAA_AREATEX_MAX_DISTANCE:"16",SMAA_AREATEX_PIXEL_SIZE:"( 1.0 / vec2( 160.0, 560.0 ) )",SMAA_AREATEX_SUBTEX_SIZE:"( 1.0 / 7.0 )"},uniforms:{tDiffuse:{value:null},tArea:{value:null},tSearch:{value:null},resolution:{value:new nt(1/1024,1/512)}},vertexShader:`

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

		}`};class Sx extends Ei{constructor(t,e){super(),this.edgesRT=new Qe(t,e,{depthBuffer:!1,type:mn}),this.edgesRT.texture.name="SMAAPass.edges",this.weightsRT=new Qe(t,e,{depthBuffer:!1,type:mn}),this.weightsRT.texture.name="SMAAPass.weights";const n=this,i=new Image;i.src=this.getAreaTexture(),i.onload=function(){n.areaTexture.needsUpdate=!0},this.areaTexture=new ze,this.areaTexture.name="SMAAPass.area",this.areaTexture.image=i,this.areaTexture.minFilter=Ke,this.areaTexture.generateMipmaps=!1,this.areaTexture.flipY=!1;const r=new Image;r.src=this.getSearchTexture(),r.onload=function(){n.searchTexture.needsUpdate=!0},this.searchTexture=new ze,this.searchTexture.name="SMAAPass.search",this.searchTexture.image=r,this.searchTexture.magFilter=Ce,this.searchTexture.minFilter=Ce,this.searchTexture.generateMipmaps=!1,this.searchTexture.flipY=!1,this.uniformsEdges=Gn.clone(Cr.uniforms),this.uniformsEdges.resolution.value.set(1/t,1/e),this.materialEdges=new Le({defines:Object.assign({},Cr.defines),uniforms:this.uniformsEdges,vertexShader:Cr.vertexShader,fragmentShader:Cr.fragmentShader}),this.uniformsWeights=Gn.clone(Rr.uniforms),this.uniformsWeights.resolution.value.set(1/t,1/e),this.uniformsWeights.tDiffuse.value=this.edgesRT.texture,this.uniformsWeights.tArea.value=this.areaTexture,this.uniformsWeights.tSearch.value=this.searchTexture,this.materialWeights=new Le({defines:Object.assign({},Rr.defines),uniforms:this.uniformsWeights,vertexShader:Rr.vertexShader,fragmentShader:Rr.fragmentShader}),this.uniformsBlend=Gn.clone(la.uniforms),this.uniformsBlend.resolution.value.set(1/t,1/e),this.uniformsBlend.tDiffuse.value=this.weightsRT.texture,this.materialBlend=new Le({uniforms:this.uniformsBlend,vertexShader:la.vertexShader,fragmentShader:la.fragmentShader}),this.fsQuad=new Mo(null)}render(t,e,n){this.uniformsEdges.tDiffuse.value=n.texture,this.fsQuad.material=this.materialEdges,t.setRenderTarget(this.edgesRT),this.clear&&t.clear(),this.fsQuad.render(t),this.fsQuad.material=this.materialWeights,t.setRenderTarget(this.weightsRT),this.clear&&t.clear(),this.fsQuad.render(t),this.uniformsBlend.tColor.value=n.texture,this.fsQuad.material=this.materialBlend,this.renderToScreen?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(),this.fsQuad.render(t))}setSize(t,e){this.edgesRT.setSize(t,e),this.weightsRT.setSize(t,e),this.materialEdges.uniforms.resolution.value.set(1/t,1/e),this.materialWeights.uniforms.resolution.value.set(1/t,1/e),this.materialBlend.uniforms.resolution.value.set(1/t,1/e)}getAreaTexture(){return"data:image/png;base64,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"}getSearchTexture(){return"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEIAAAAhCAAAAABIXyLAAAAAOElEQVRIx2NgGAWjYBSMglEwEICREYRgFBZBqDCSLA2MGPUIVQETE9iNUAqLR5gIeoQKRgwXjwAAGn4AtaFeYLEAAAAASUVORK5CYII="}dispose(){this.edgesRT.dispose(),this.weightsRT.dispose(),this.areaTexture.dispose(),this.searchTexture.dispose(),this.materialEdges.dispose(),this.materialWeights.dispose(),this.materialBlend.dispose(),this.fsQuad.dispose()}}const wx={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class Ex extends Ei{constructor(){super();const t=wx;this.uniforms=Gn.clone(t.uniforms),this.material=new lx({name:t.name,uniforms:this.uniforms,vertexShader:t.vertexShader,fragmentShader:t.fragmentShader}),this.fsQuad=new Mo(this.material),this._outputColorSpace=null,this._toneMapping=null}render(t,e,n){this.uniforms.tDiffuse.value=n.texture,this.uniforms.toneMappingExposure.value=t.toneMappingExposure,(this._outputColorSpace!==t.outputColorSpace||this._toneMapping!==t.toneMapping)&&(this._outputColorSpace=t.outputColorSpace,this._toneMapping=t.toneMapping,this.material.defines={},se.getTransfer(this._outputColorSpace)===le&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Nh?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Uh?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Fh?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ya?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Oh&&(this.material.defines.AGX_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(t.setRenderTarget(null),this.fsQuad.render(t)):(t.setRenderTarget(e),this.clear&&t.clear(t.autoClearColor,t.autoClearDepth,t.autoClearStencil),this.fsQuad.render(t))}dispose(){this.material.dispose(),this.fsQuad.dispose()}}function bx(s){const t=new fu({canvas:s,antialias:!0,powerPreference:"high-performance",stencil:!1});t.setPixelRatio(Math.min(window.devicePixelRatio,2)),t.setSize(window.innerWidth,window.innerHeight),t.outputColorSpace=$t,t.toneMapping=Ya,t.toneMappingExposure=1.05,t.shadowMap.enabled=!0,t.shadowMap.type=Ih;const e=new Cv,n=new Ze(62,window.innerWidth/window.innerHeight,.6,3e3),i=new _o;i.scale.setScalar(8e3),e.add(i);const r=new N,o=i.material.uniforms;o.turbidity.value=6.5,o.rayleigh.value=2.6,o.mieCoefficient.value=.0045,o.mieDirectionalG.value=.85;const a=Mn.degToRad(17),c=Mn.degToRad(125);r.setFromSphericalCoords(1,Math.PI/2-a,c),o.sunPosition.value.copy(r);const l=new fx(16768174,3.2);l.position.copy(r).multiplyScalar(800),l.castShadow=!0,l.shadow.mapSize.set(4096,4096),l.shadow.camera.near=50,l.shadow.camera.far=1600;const h=90;l.shadow.camera.left=-h,l.shadow.camera.right=h,l.shadow.camera.top=h,l.shadow.camera.bottom=-h,l.shadow.bias=-1e-4,l.shadow.normalBias=.04,l.shadow.radius=3,e.add(l),e.add(l.target);const d=r.clone().normalize(),u=2*h/4096;function f(S){const b=Math.round(S.x/u)*u,L=Math.round(S.z/u)*u;l.target.position.set(b,0,L),l.position.set(b+d.x*800,d.y*800,L+d.z*800)}const g=new hx(11060456,4865322,.5);e.add(g);const v=new za(t);v.compileCubemapShader();const m=v.fromScene(e,.04).texture;e.environment=m,v.dispose(),e.fog=new tc(14273972,750,3600);const p=new yx(t);p.setPixelRatio(Math.min(window.devicePixelRatio,2)),p.setSize(window.innerWidth,window.innerHeight);const x=new _x(e,n);p.addPass(x);const y=new os(new nt(window.innerWidth,window.innerHeight),.18,.7,.93);p.addPass(y);const _=new bu(Tx);p.addPass(_);const M=new Sx(window.innerWidth*t.getPixelRatio(),window.innerHeight*t.getPixelRatio());return p.addPass(M),p.addPass(new Ex),window.addEventListener("resize",()=>{const S=window.innerWidth,b=window.innerHeight;t.setSize(S,b),p.setSize(S,b),n.aspect=S/b,n.updateProjectionMatrix(),y.resolution.set(S,b)}),{renderer:t,scene:e,camera:n,composer:p,sun:l,updateShadowTarget:f}}const Tx={uniforms:{tDiffuse:{value:null},uTime:{value:0},uVignette:{value:1},uCA:{value:.0011},uGrain:{value:.014}},vertexShader:`
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
  `};class pn{constructor(t){t===void 0&&(t=[0,0,0,0,0,0,0,0,0]),this.elements=t}identity(){const t=this.elements;t[0]=1,t[1]=0,t[2]=0,t[3]=0,t[4]=1,t[5]=0,t[6]=0,t[7]=0,t[8]=1}setZero(){const t=this.elements;t[0]=0,t[1]=0,t[2]=0,t[3]=0,t[4]=0,t[5]=0,t[6]=0,t[7]=0,t[8]=0}setTrace(t){const e=this.elements;e[0]=t.x,e[4]=t.y,e[8]=t.z}getTrace(t){t===void 0&&(t=new E);const e=this.elements;return t.x=e[0],t.y=e[4],t.z=e[8],t}vmult(t,e){e===void 0&&(e=new E);const n=this.elements,i=t.x,r=t.y,o=t.z;return e.x=n[0]*i+n[1]*r+n[2]*o,e.y=n[3]*i+n[4]*r+n[5]*o,e.z=n[6]*i+n[7]*r+n[8]*o,e}smult(t){for(let e=0;e<this.elements.length;e++)this.elements[e]*=t}mmult(t,e){e===void 0&&(e=new pn);const n=this.elements,i=t.elements,r=e.elements,o=n[0],a=n[1],c=n[2],l=n[3],h=n[4],d=n[5],u=n[6],f=n[7],g=n[8],v=i[0],m=i[1],p=i[2],x=i[3],y=i[4],_=i[5],M=i[6],S=i[7],b=i[8];return r[0]=o*v+a*x+c*M,r[1]=o*m+a*y+c*S,r[2]=o*p+a*_+c*b,r[3]=l*v+h*x+d*M,r[4]=l*m+h*y+d*S,r[5]=l*p+h*_+d*b,r[6]=u*v+f*x+g*M,r[7]=u*m+f*y+g*S,r[8]=u*p+f*_+g*b,e}scale(t,e){e===void 0&&(e=new pn);const n=this.elements,i=e.elements;for(let r=0;r!==3;r++)i[3*r+0]=t.x*n[3*r+0],i[3*r+1]=t.y*n[3*r+1],i[3*r+2]=t.z*n[3*r+2];return e}solve(t,e){e===void 0&&(e=new E);const n=3,i=4,r=[];let o,a;for(o=0;o<n*i;o++)r.push(0);for(o=0;o<3;o++)for(a=0;a<3;a++)r[o+i*a]=this.elements[o+3*a];r[3+4*0]=t.x,r[3+4*1]=t.y,r[3+4*2]=t.z;let c=3;const l=c;let h;const d=4;let u;do{if(o=l-c,r[o+i*o]===0){for(a=o+1;a<l;a++)if(r[o+i*a]!==0){h=d;do u=d-h,r[u+i*o]+=r[u+i*a];while(--h);break}}if(r[o+i*o]!==0)for(a=o+1;a<l;a++){const f=r[o+i*a]/r[o+i*o];h=d;do u=d-h,r[u+i*a]=u<=o?0:r[u+i*a]-r[u+i*o]*f;while(--h)}}while(--c);if(e.z=r[2*i+3]/r[2*i+2],e.y=(r[1*i+3]-r[1*i+2]*e.z)/r[1*i+1],e.x=(r[0*i+3]-r[0*i+2]*e.z-r[0*i+1]*e.y)/r[0*i+0],isNaN(e.x)||isNaN(e.y)||isNaN(e.z)||e.x===1/0||e.y===1/0||e.z===1/0)throw`Could not solve equation! Got x=[${e.toString()}], b=[${t.toString()}], A=[${this.toString()}]`;return e}e(t,e,n){if(n===void 0)return this.elements[e+3*t];this.elements[e+3*t]=n}copy(t){for(let e=0;e<t.elements.length;e++)this.elements[e]=t.elements[e];return this}toString(){let t="";const e=",";for(let n=0;n<9;n++)t+=this.elements[n]+e;return t}reverse(t){t===void 0&&(t=new pn);const e=3,n=6,i=Ax;let r,o;for(r=0;r<3;r++)for(o=0;o<3;o++)i[r+n*o]=this.elements[r+3*o];i[3+6*0]=1,i[3+6*1]=0,i[3+6*2]=0,i[4+6*0]=0,i[4+6*1]=1,i[4+6*2]=0,i[5+6*0]=0,i[5+6*1]=0,i[5+6*2]=1;let a=3;const c=a;let l;const h=n;let d;do{if(r=c-a,i[r+n*r]===0){for(o=r+1;o<c;o++)if(i[r+n*o]!==0){l=h;do d=h-l,i[d+n*r]+=i[d+n*o];while(--l);break}}if(i[r+n*r]!==0)for(o=r+1;o<c;o++){const u=i[r+n*o]/i[r+n*r];l=h;do d=h-l,i[d+n*o]=d<=r?0:i[d+n*o]-i[d+n*r]*u;while(--l)}}while(--a);r=2;do{o=r-1;do{const u=i[r+n*o]/i[r+n*r];l=n;do d=n-l,i[d+n*o]=i[d+n*o]-i[d+n*r]*u;while(--l)}while(o--)}while(--r);r=2;do{const u=1/i[r+n*r];l=n;do d=n-l,i[d+n*r]=i[d+n*r]*u;while(--l)}while(r--);r=2;do{o=2;do{if(d=i[e+o+n*r],isNaN(d)||d===1/0)throw`Could not reverse! A=[${this.toString()}]`;t.e(r,o,d)}while(o--)}while(r--);return t}setRotationFromQuaternion(t){const e=t.x,n=t.y,i=t.z,r=t.w,o=e+e,a=n+n,c=i+i,l=e*o,h=e*a,d=e*c,u=n*a,f=n*c,g=i*c,v=r*o,m=r*a,p=r*c,x=this.elements;return x[3*0+0]=1-(u+g),x[3*0+1]=h-p,x[3*0+2]=d+m,x[3*1+0]=h+p,x[3*1+1]=1-(l+g),x[3*1+2]=f-v,x[3*2+0]=d-m,x[3*2+1]=f+v,x[3*2+2]=1-(l+u),this}transpose(t){t===void 0&&(t=new pn);const e=this.elements,n=t.elements;let i;return n[0]=e[0],n[4]=e[4],n[8]=e[8],i=e[1],n[1]=e[3],n[3]=i,i=e[2],n[2]=e[6],n[6]=i,i=e[5],n[5]=e[7],n[7]=i,t}}const Ax=[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];class E{constructor(t,e,n){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),this.x=t,this.y=e,this.z=n}cross(t,e){e===void 0&&(e=new E);const n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,c=this.z;return e.x=a*r-c*i,e.y=c*n-o*r,e.z=o*i-a*n,e}set(t,e,n){return this.x=t,this.y=e,this.z=n,this}setZero(){this.x=this.y=this.z=0}vadd(t,e){if(e)e.x=t.x+this.x,e.y=t.y+this.y,e.z=t.z+this.z;else return new E(this.x+t.x,this.y+t.y,this.z+t.z)}vsub(t,e){if(e)e.x=this.x-t.x,e.y=this.y-t.y,e.z=this.z-t.z;else return new E(this.x-t.x,this.y-t.y,this.z-t.z)}crossmat(){return new pn([0,-this.z,this.y,this.z,0,-this.x,-this.y,this.x,0])}normalize(){const t=this.x,e=this.y,n=this.z,i=Math.sqrt(t*t+e*e+n*n);if(i>0){const r=1/i;this.x*=r,this.y*=r,this.z*=r}else this.x=0,this.y=0,this.z=0;return i}unit(t){t===void 0&&(t=new E);const e=this.x,n=this.y,i=this.z;let r=Math.sqrt(e*e+n*n+i*i);return r>0?(r=1/r,t.x=e*r,t.y=n*r,t.z=i*r):(t.x=1,t.y=0,t.z=0),t}length(){const t=this.x,e=this.y,n=this.z;return Math.sqrt(t*t+e*e+n*n)}lengthSquared(){return this.dot(this)}distanceTo(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return Math.sqrt((r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i))}distanceSquared(t){const e=this.x,n=this.y,i=this.z,r=t.x,o=t.y,a=t.z;return(r-e)*(r-e)+(o-n)*(o-n)+(a-i)*(a-i)}scale(t,e){e===void 0&&(e=new E);const n=this.x,i=this.y,r=this.z;return e.x=t*n,e.y=t*i,e.z=t*r,e}vmul(t,e){return e===void 0&&(e=new E),e.x=t.x*this.x,e.y=t.y*this.y,e.z=t.z*this.z,e}addScaledVector(t,e,n){return n===void 0&&(n=new E),n.x=this.x+t*e.x,n.y=this.y+t*e.y,n.z=this.z+t*e.z,n}dot(t){return this.x*t.x+this.y*t.y+this.z*t.z}isZero(){return this.x===0&&this.y===0&&this.z===0}negate(t){return t===void 0&&(t=new E),t.x=-this.x,t.y=-this.y,t.z=-this.z,t}tangents(t,e){const n=this.length();if(n>0){const i=Cx,r=1/n;i.set(this.x*r,this.y*r,this.z*r);const o=Rx;Math.abs(i.x)<.9?(o.set(1,0,0),i.cross(o,t)):(o.set(0,1,0),i.cross(o,t)),i.cross(t,e)}else t.set(1,0,0),e.set(0,1,0)}toString(){return`${this.x},${this.y},${this.z}`}toArray(){return[this.x,this.y,this.z]}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this}lerp(t,e,n){const i=this.x,r=this.y,o=this.z;n.x=i+(t.x-i)*e,n.y=r+(t.y-r)*e,n.z=o+(t.z-o)*e}almostEquals(t,e){return e===void 0&&(e=1e-6),!(Math.abs(this.x-t.x)>e||Math.abs(this.y-t.y)>e||Math.abs(this.z-t.z)>e)}almostZero(t){return t===void 0&&(t=1e-6),!(Math.abs(this.x)>t||Math.abs(this.y)>t||Math.abs(this.z)>t)}isAntiparallelTo(t,e){return this.negate(Jl),Jl.almostEquals(t,e)}clone(){return new E(this.x,this.y,this.z)}}E.ZERO=new E(0,0,0);E.UNIT_X=new E(1,0,0);E.UNIT_Y=new E(0,1,0);E.UNIT_Z=new E(0,0,1);const Cx=new E,Rx=new E,Jl=new E;class tn{constructor(t){t===void 0&&(t={}),this.lowerBound=new E,this.upperBound=new E,t.lowerBound&&this.lowerBound.copy(t.lowerBound),t.upperBound&&this.upperBound.copy(t.upperBound)}setFromPoints(t,e,n,i){const r=this.lowerBound,o=this.upperBound,a=n;r.copy(t[0]),a&&a.vmult(r,r),o.copy(r);for(let c=1;c<t.length;c++){let l=t[c];a&&(a.vmult(l,Ql),l=Ql),l.x>o.x&&(o.x=l.x),l.x<r.x&&(r.x=l.x),l.y>o.y&&(o.y=l.y),l.y<r.y&&(r.y=l.y),l.z>o.z&&(o.z=l.z),l.z<r.z&&(r.z=l.z)}return e&&(e.vadd(r,r),e.vadd(o,o)),i&&(r.x-=i,r.y-=i,r.z-=i,o.x+=i,o.y+=i,o.z+=i),this}copy(t){return this.lowerBound.copy(t.lowerBound),this.upperBound.copy(t.upperBound),this}clone(){return new tn().copy(this)}extend(t){this.lowerBound.x=Math.min(this.lowerBound.x,t.lowerBound.x),this.upperBound.x=Math.max(this.upperBound.x,t.upperBound.x),this.lowerBound.y=Math.min(this.lowerBound.y,t.lowerBound.y),this.upperBound.y=Math.max(this.upperBound.y,t.upperBound.y),this.lowerBound.z=Math.min(this.lowerBound.z,t.lowerBound.z),this.upperBound.z=Math.max(this.upperBound.z,t.upperBound.z)}overlaps(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound,o=i.x<=n.x&&n.x<=r.x||e.x<=r.x&&r.x<=n.x,a=i.y<=n.y&&n.y<=r.y||e.y<=r.y&&r.y<=n.y,c=i.z<=n.z&&n.z<=r.z||e.z<=r.z&&r.z<=n.z;return o&&a&&c}volume(){const t=this.lowerBound,e=this.upperBound;return(e.x-t.x)*(e.y-t.y)*(e.z-t.z)}contains(t){const e=this.lowerBound,n=this.upperBound,i=t.lowerBound,r=t.upperBound;return e.x<=i.x&&n.x>=r.x&&e.y<=i.y&&n.y>=r.y&&e.z<=i.z&&n.z>=r.z}getCorners(t,e,n,i,r,o,a,c){const l=this.lowerBound,h=this.upperBound;t.copy(l),e.set(h.x,l.y,l.z),n.set(h.x,h.y,l.z),i.set(l.x,h.y,h.z),r.set(h.x,l.y,h.z),o.set(l.x,h.y,l.z),a.set(l.x,l.y,h.z),c.copy(h)}toLocalFrame(t,e){const n=$l,i=n[0],r=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,r,o,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToLocal(f,f)}return e.setFromPoints(n)}toWorldFrame(t,e){const n=$l,i=n[0],r=n[1],o=n[2],a=n[3],c=n[4],l=n[5],h=n[6],d=n[7];this.getCorners(i,r,o,a,c,l,h,d);for(let u=0;u!==8;u++){const f=n[u];t.pointToWorld(f,f)}return e.setFromPoints(n)}overlapsRay(t){const{direction:e,from:n}=t,i=1/e.x,r=1/e.y,o=1/e.z,a=(this.lowerBound.x-n.x)*i,c=(this.upperBound.x-n.x)*i,l=(this.lowerBound.y-n.y)*r,h=(this.upperBound.y-n.y)*r,d=(this.lowerBound.z-n.z)*o,u=(this.upperBound.z-n.z)*o,f=Math.max(Math.max(Math.min(a,c),Math.min(l,h)),Math.min(d,u)),g=Math.min(Math.min(Math.max(a,c),Math.max(l,h)),Math.max(d,u));return!(g<0||f>g)}}const Ql=new E,$l=[new E,new E,new E,new E,new E,new E,new E,new E];class th{constructor(){this.matrix=[]}get(t,e){let{index:n}=t,{index:i}=e;if(i>n){const r=i;i=n,n=r}return this.matrix[(n*(n+1)>>1)+i-1]}set(t,e,n){let{index:i}=t,{index:r}=e;if(r>i){const o=r;r=i,i=o}this.matrix[(i*(i+1)>>1)+r-1]=n?1:0}reset(){for(let t=0,e=this.matrix.length;t!==e;t++)this.matrix[t]=0}setNumObjects(t){this.matrix.length=t*(t-1)>>1}}class Tu{addEventListener(t,e){this._listeners===void 0&&(this._listeners={});const n=this._listeners;return n[t]===void 0&&(n[t]=[]),n[t].includes(e)||n[t].push(e),this}hasEventListener(t,e){if(this._listeners===void 0)return!1;const n=this._listeners;return!!(n[t]!==void 0&&n[t].includes(e))}hasAnyEventListener(t){return this._listeners===void 0?!1:this._listeners[t]!==void 0}removeEventListener(t,e){if(this._listeners===void 0)return this;const n=this._listeners;if(n[t]===void 0)return this;const i=n[t].indexOf(e);return i!==-1&&n[t].splice(i,1),this}dispatchEvent(t){if(this._listeners===void 0)return this;const n=this._listeners[t.type];if(n!==void 0){t.target=this;for(let i=0,r=n.length;i<r;i++)n[i].call(this,t)}return this}}class fe{constructor(t,e,n,i){t===void 0&&(t=0),e===void 0&&(e=0),n===void 0&&(n=0),i===void 0&&(i=1),this.x=t,this.y=e,this.z=n,this.w=i}set(t,e,n,i){return this.x=t,this.y=e,this.z=n,this.w=i,this}toString(){return`${this.x},${this.y},${this.z},${this.w}`}toArray(){return[this.x,this.y,this.z,this.w]}setFromAxisAngle(t,e){const n=Math.sin(e*.5);return this.x=t.x*n,this.y=t.y*n,this.z=t.z*n,this.w=Math.cos(e*.5),this}toAxisAngle(t){t===void 0&&(t=new E),this.normalize();const e=2*Math.acos(this.w),n=Math.sqrt(1-this.w*this.w);return n<.001?(t.x=this.x,t.y=this.y,t.z=this.z):(t.x=this.x/n,t.y=this.y/n,t.z=this.z/n),[t,e]}setFromVectors(t,e){if(t.isAntiparallelTo(e)){const n=Px,i=Lx;t.tangents(n,i),this.setFromAxisAngle(n,Math.PI)}else{const n=t.cross(e);this.x=n.x,this.y=n.y,this.z=n.z,this.w=Math.sqrt(t.length()**2*e.length()**2)+t.dot(e),this.normalize()}return this}mult(t,e){e===void 0&&(e=new fe);const n=this.x,i=this.y,r=this.z,o=this.w,a=t.x,c=t.y,l=t.z,h=t.w;return e.x=n*h+o*a+i*l-r*c,e.y=i*h+o*c+r*a-n*l,e.z=r*h+o*l+n*c-i*a,e.w=o*h-n*a-i*c-r*l,e}inverse(t){t===void 0&&(t=new fe);const e=this.x,n=this.y,i=this.z,r=this.w;this.conjugate(t);const o=1/(e*e+n*n+i*i+r*r);return t.x*=o,t.y*=o,t.z*=o,t.w*=o,t}conjugate(t){return t===void 0&&(t=new fe),t.x=-this.x,t.y=-this.y,t.z=-this.z,t.w=this.w,t}normalize(){let t=Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w);return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(t=1/t,this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}normalizeFast(){const t=(3-(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w))/2;return t===0?(this.x=0,this.y=0,this.z=0,this.w=0):(this.x*=t,this.y*=t,this.z*=t,this.w*=t),this}vmult(t,e){e===void 0&&(e=new E);const n=t.x,i=t.y,r=t.z,o=this.x,a=this.y,c=this.z,l=this.w,h=l*n+a*r-c*i,d=l*i+c*n-o*r,u=l*r+o*i-a*n,f=-o*n-a*i-c*r;return e.x=h*l+f*-o+d*-c-u*-a,e.y=d*l+f*-a+u*-o-h*-c,e.z=u*l+f*-c+h*-a-d*-o,e}copy(t){return this.x=t.x,this.y=t.y,this.z=t.z,this.w=t.w,this}toEuler(t,e){e===void 0&&(e="YZX");let n,i,r;const o=this.x,a=this.y,c=this.z,l=this.w;switch(e){case"YZX":const h=o*a+c*l;if(h>.499&&(n=2*Math.atan2(o,l),i=Math.PI/2,r=0),h<-.499&&(n=-2*Math.atan2(o,l),i=-Math.PI/2,r=0),n===void 0){const d=o*o,u=a*a,f=c*c;n=Math.atan2(2*a*l-2*o*c,1-2*u-2*f),i=Math.asin(2*h),r=Math.atan2(2*o*l-2*a*c,1-2*d-2*f)}break;default:throw new Error(`Euler order ${e} not supported yet.`)}t.y=n,t.z=i,t.x=r}setFromEuler(t,e,n,i){i===void 0&&(i="XYZ");const r=Math.cos(t/2),o=Math.cos(e/2),a=Math.cos(n/2),c=Math.sin(t/2),l=Math.sin(e/2),h=Math.sin(n/2);return i==="XYZ"?(this.x=c*o*a+r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a-c*l*h):i==="YXZ"?(this.x=c*o*a+r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a+c*l*h):i==="ZXY"?(this.x=c*o*a-r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a-c*l*h):i==="ZYX"?(this.x=c*o*a-r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a+c*l*h):i==="YZX"?(this.x=c*o*a+r*l*h,this.y=r*l*a+c*o*h,this.z=r*o*h-c*l*a,this.w=r*o*a-c*l*h):i==="XZY"&&(this.x=c*o*a-r*l*h,this.y=r*l*a-c*o*h,this.z=r*o*h+c*l*a,this.w=r*o*a+c*l*h),this}clone(){return new fe(this.x,this.y,this.z,this.w)}slerp(t,e,n){n===void 0&&(n=new fe);const i=this.x,r=this.y,o=this.z,a=this.w;let c=t.x,l=t.y,h=t.z,d=t.w,u,f,g,v,m;return f=i*c+r*l+o*h+a*d,f<0&&(f=-f,c=-c,l=-l,h=-h,d=-d),1-f>1e-6?(u=Math.acos(f),g=Math.sin(u),v=Math.sin((1-e)*u)/g,m=Math.sin(e*u)/g):(v=1-e,m=e),n.x=v*i+m*c,n.y=v*r+m*l,n.z=v*o+m*h,n.w=v*a+m*d,n}integrate(t,e,n,i){i===void 0&&(i=new fe);const r=t.x*n.x,o=t.y*n.y,a=t.z*n.z,c=this.x,l=this.y,h=this.z,d=this.w,u=e*.5;return i.x+=u*(r*d+o*h-a*l),i.y+=u*(o*d+a*c-r*h),i.z+=u*(a*d+r*l-o*c),i.w+=u*(-r*c-o*l-a*h),i}}const Px=new E,Lx=new E,Ix={SPHERE:1,PLANE:2,BOX:4,COMPOUND:8,CONVEXPOLYHEDRON:16,HEIGHTFIELD:32,PARTICLE:64,CYLINDER:128,TRIMESH:256};class Tt{constructor(t){t===void 0&&(t={}),this.id=Tt.idCounter++,this.type=t.type||0,this.boundingSphereRadius=0,this.collisionResponse=t.collisionResponse?t.collisionResponse:!0,this.collisionFilterGroup=t.collisionFilterGroup!==void 0?t.collisionFilterGroup:1,this.collisionFilterMask=t.collisionFilterMask!==void 0?t.collisionFilterMask:-1,this.material=t.material?t.material:null,this.body=null}updateBoundingSphereRadius(){throw`computeBoundingSphereRadius() not implemented for shape type ${this.type}`}volume(){throw`volume() not implemented for shape type ${this.type}`}calculateLocalInertia(t,e){throw`calculateLocalInertia() not implemented for shape type ${this.type}`}calculateWorldAABB(t,e,n,i){throw`calculateWorldAABB() not implemented for shape type ${this.type}`}}Tt.idCounter=0;Tt.types=Ix;class Qt{constructor(t){t===void 0&&(t={}),this.position=new E,this.quaternion=new fe,t.position&&this.position.copy(t.position),t.quaternion&&this.quaternion.copy(t.quaternion)}pointToLocal(t,e){return Qt.pointToLocalFrame(this.position,this.quaternion,t,e)}pointToWorld(t,e){return Qt.pointToWorldFrame(this.position,this.quaternion,t,e)}vectorToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e}static pointToLocalFrame(t,e,n,i){return i===void 0&&(i=new E),n.vsub(t,i),e.conjugate(eh),eh.vmult(i,i),i}static pointToWorldFrame(t,e,n,i){return i===void 0&&(i=new E),e.vmult(n,i),i.vadd(t,i),i}static vectorToWorldFrame(t,e,n){return n===void 0&&(n=new E),t.vmult(e,n),n}static vectorToLocalFrame(t,e,n,i){return i===void 0&&(i=new E),e.w*=-1,e.vmult(n,i),e.w*=-1,i}}const eh=new fe;class zs extends Tt{constructor(t){t===void 0&&(t={});const{vertices:e=[],faces:n=[],normals:i=[],axes:r,boundingSphereRadius:o}=t;super({type:Tt.types.CONVEXPOLYHEDRON}),this.vertices=e,this.faces=n,this.faceNormals=i,this.faceNormals.length===0&&this.computeNormals(),o?this.boundingSphereRadius=o:this.updateBoundingSphereRadius(),this.worldVertices=[],this.worldVerticesNeedsUpdate=!0,this.worldFaceNormals=[],this.worldFaceNormalsNeedsUpdate=!0,this.uniqueAxes=r?r.slice():null,this.uniqueEdges=[],this.computeEdges()}computeEdges(){const t=this.faces,e=this.vertices,n=this.uniqueEdges;n.length=0;const i=new E;for(let r=0;r!==t.length;r++){const o=t[r],a=o.length;for(let c=0;c!==a;c++){const l=(c+1)%a;e[o[c]].vsub(e[o[l]],i),i.normalize();let h=!1;for(let d=0;d!==n.length;d++)if(n[d].almostEquals(i)||n[d].almostEquals(i)){h=!0;break}h||n.push(i.clone())}}}computeNormals(){this.faceNormals.length=this.faces.length;for(let t=0;t<this.faces.length;t++){for(let i=0;i<this.faces[t].length;i++)if(!this.vertices[this.faces[t][i]])throw new Error(`Vertex ${this.faces[t][i]} not found!`);const e=this.faceNormals[t]||new E;this.getFaceNormal(t,e),e.negate(e),this.faceNormals[t]=e;const n=this.vertices[this.faces[t][0]];if(e.dot(n)<0){console.error(`.faceNormals[${t}] = Vec3(${e.toString()}) looks like it points into the shape? The vertices follow. Make sure they are ordered CCW around the normal, using the right hand rule.`);for(let i=0;i<this.faces[t].length;i++)console.warn(`.vertices[${this.faces[t][i]}] = Vec3(${this.vertices[this.faces[t][i]].toString()})`)}}}getFaceNormal(t,e){const n=this.faces[t],i=this.vertices[n[0]],r=this.vertices[n[1]],o=this.vertices[n[2]];zs.computeNormal(i,r,o,e)}static computeNormal(t,e,n,i){const r=new E,o=new E;e.vsub(t,o),n.vsub(e,r),r.cross(o,i),i.isZero()||i.normalize()}clipAgainstHull(t,e,n,i,r,o,a,c,l){const h=new E;let d=-1,u=-Number.MAX_VALUE;for(let g=0;g<n.faces.length;g++){h.copy(n.faceNormals[g]),r.vmult(h,h);const v=h.dot(o);v>u&&(u=v,d=g)}const f=[];for(let g=0;g<n.faces[d].length;g++){const v=n.vertices[n.faces[d][g]],m=new E;m.copy(v),r.vmult(m,m),i.vadd(m,m),f.push(m)}d>=0&&this.clipFaceAgainstHull(o,t,e,f,a,c,l)}findSeparatingAxis(t,e,n,i,r,o,a,c){const l=new E,h=new E,d=new E,u=new E,f=new E,g=new E;let v=Number.MAX_VALUE;const m=this;if(m.uniqueAxes)for(let p=0;p!==m.uniqueAxes.length;p++){n.vmult(m.uniqueAxes[p],l);const x=m.testSepAxis(l,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(l))}else{const p=a?a.length:m.faces.length;for(let x=0;x<p;x++){const y=a?a[x]:x;l.copy(m.faceNormals[y]),n.vmult(l,l);const _=m.testSepAxis(l,t,e,n,i,r);if(_===!1)return!1;_<v&&(v=_,o.copy(l))}}if(t.uniqueAxes)for(let p=0;p!==t.uniqueAxes.length;p++){r.vmult(t.uniqueAxes[p],h);const x=m.testSepAxis(h,t,e,n,i,r);if(x===!1)return!1;x<v&&(v=x,o.copy(h))}else{const p=c?c.length:t.faces.length;for(let x=0;x<p;x++){const y=c?c[x]:x;h.copy(t.faceNormals[y]),r.vmult(h,h);const _=m.testSepAxis(h,t,e,n,i,r);if(_===!1)return!1;_<v&&(v=_,o.copy(h))}}for(let p=0;p!==m.uniqueEdges.length;p++){n.vmult(m.uniqueEdges[p],u);for(let x=0;x!==t.uniqueEdges.length;x++)if(r.vmult(t.uniqueEdges[x],f),u.cross(f,g),!g.almostZero()){g.normalize();const y=m.testSepAxis(g,t,e,n,i,r);if(y===!1)return!1;y<v&&(v=y,o.copy(g))}}return i.vsub(e,d),d.dot(o)>0&&o.negate(o),!0}testSepAxis(t,e,n,i,r,o){const a=this;zs.project(a,t,n,i,ha),zs.project(e,t,r,o,ua);const c=ha[0],l=ha[1],h=ua[0],d=ua[1];if(c<d||h<l)return!1;const u=c-d,f=h-l;return u<f?u:f}calculateLocalInertia(t,e){const n=new E,i=new E;this.computeLocalAABB(i,n);const r=n.x-i.x,o=n.y-i.y,a=n.z-i.z;e.x=1/12*t*(2*o*2*o+2*a*2*a),e.y=1/12*t*(2*r*2*r+2*a*2*a),e.z=1/12*t*(2*o*2*o+2*r*2*r)}getPlaneConstantOfFace(t){const e=this.faces[t],n=this.faceNormals[t],i=this.vertices[e[0]];return-n.dot(i)}clipFaceAgainstHull(t,e,n,i,r,o,a){const c=new E,l=new E,h=new E,d=new E,u=new E,f=new E,g=new E,v=new E,m=this,p=[],x=i,y=p;let _=-1,M=Number.MAX_VALUE;for(let T=0;T<m.faces.length;T++){c.copy(m.faceNormals[T]),n.vmult(c,c);const O=c.dot(t);O<M&&(M=O,_=T)}if(_<0)return;const S=m.faces[_];S.connectedFaces=[];for(let T=0;T<m.faces.length;T++)for(let O=0;O<m.faces[T].length;O++)S.indexOf(m.faces[T][O])!==-1&&T!==_&&S.connectedFaces.indexOf(T)===-1&&S.connectedFaces.push(T);const b=S.length;for(let T=0;T<b;T++){const O=m.vertices[S[T]],D=m.vertices[S[(T+1)%b]];O.vsub(D,l),h.copy(l),n.vmult(h,h),e.vadd(h,h),d.copy(this.faceNormals[_]),n.vmult(d,d),e.vadd(d,d),h.cross(d,u),u.negate(u),f.copy(O),n.vmult(f,f),e.vadd(f,f);const z=S.connectedFaces[T];g.copy(this.faceNormals[z]);const C=this.getPlaneConstantOfFace(z);v.copy(g),n.vmult(v,v);const I=C-v.dot(e);for(this.clipFaceAgainstPlane(x,y,v,I);x.length;)x.shift();for(;y.length;)x.push(y.shift())}g.copy(this.faceNormals[_]);const L=this.getPlaneConstantOfFace(_);v.copy(g),n.vmult(v,v);const w=L-v.dot(e);for(let T=0;T<x.length;T++){let O=v.dot(x[T])+w;if(O<=r&&(console.log(`clamped: depth=${O} to minDist=${r}`),O=r),O<=o){const D=x[T];if(O<=1e-6){const z={point:D,normal:v,depth:O};a.push(z)}}}}clipFaceAgainstPlane(t,e,n,i){let r,o;const a=t.length;if(a<2)return e;let c=t[t.length-1],l=t[0];r=n.dot(c)+i;for(let h=0;h<a;h++){if(l=t[h],o=n.dot(l)+i,r<0)if(o<0){const d=new E;d.copy(l),e.push(d)}else{const d=new E;c.lerp(l,r/(r-o),d),e.push(d)}else if(o<0){const d=new E;c.lerp(l,r/(r-o),d),e.push(d),e.push(l)}c=l,r=o}return e}computeWorldVertices(t,e){for(;this.worldVertices.length<this.vertices.length;)this.worldVertices.push(new E);const n=this.vertices,i=this.worldVertices;for(let r=0;r!==this.vertices.length;r++)e.vmult(n[r],i[r]),t.vadd(i[r],i[r]);this.worldVerticesNeedsUpdate=!1}computeLocalAABB(t,e){const n=this.vertices;t.set(Number.MAX_VALUE,Number.MAX_VALUE,Number.MAX_VALUE),e.set(-Number.MAX_VALUE,-Number.MAX_VALUE,-Number.MAX_VALUE);for(let i=0;i<this.vertices.length;i++){const r=n[i];r.x<t.x?t.x=r.x:r.x>e.x&&(e.x=r.x),r.y<t.y?t.y=r.y:r.y>e.y&&(e.y=r.y),r.z<t.z?t.z=r.z:r.z>e.z&&(e.z=r.z)}}computeWorldFaceNormals(t){const e=this.faceNormals.length;for(;this.worldFaceNormals.length<e;)this.worldFaceNormals.push(new E);const n=this.faceNormals,i=this.worldFaceNormals;for(let r=0;r!==e;r++)t.vmult(n[r],i[r]);this.worldFaceNormalsNeedsUpdate=!1}updateBoundingSphereRadius(){let t=0;const e=this.vertices;for(let n=0;n!==e.length;n++){const i=e[n].lengthSquared();i>t&&(t=i)}this.boundingSphereRadius=Math.sqrt(t)}calculateWorldAABB(t,e,n,i){const r=this.vertices;let o,a,c,l,h,d,u=new E;for(let f=0;f<r.length;f++){u.copy(r[f]),e.vmult(u,u),t.vadd(u,u);const g=u;(o===void 0||g.x<o)&&(o=g.x),(l===void 0||g.x>l)&&(l=g.x),(a===void 0||g.y<a)&&(a=g.y),(h===void 0||g.y>h)&&(h=g.y),(c===void 0||g.z<c)&&(c=g.z),(d===void 0||g.z>d)&&(d=g.z)}n.set(o,a,c),i.set(l,h,d)}volume(){return 4*Math.PI*this.boundingSphereRadius/3}getAveragePointLocal(t){t===void 0&&(t=new E);const e=this.vertices;for(let n=0;n<e.length;n++)t.vadd(e[n],t);return t.scale(1/e.length,t),t}transformAllPoints(t,e){const n=this.vertices.length,i=this.vertices;if(e){for(let r=0;r<n;r++){const o=i[r];e.vmult(o,o)}for(let r=0;r<this.faceNormals.length;r++){const o=this.faceNormals[r];e.vmult(o,o)}}if(t)for(let r=0;r<n;r++){const o=i[r];o.vadd(t,o)}}pointIsInside(t){const e=this.vertices,n=this.faces,i=this.faceNormals,r=new E;this.getAveragePointLocal(r);for(let o=0;o<this.faces.length;o++){let a=i[o];const c=e[n[o][0]],l=new E;t.vsub(c,l);const h=a.dot(l),d=new E;r.vsub(c,d);const u=a.dot(d);if(h<0&&u>0||h>0&&u<0)return!1}return-1}static project(t,e,n,i,r){const o=t.vertices.length,a=Dx;let c=0,l=0;const h=Nx,d=t.vertices;h.setZero(),Qt.vectorToLocalFrame(n,i,e,a),Qt.pointToLocalFrame(n,i,h,h);const u=h.dot(a);l=c=d[0].dot(a);for(let f=1;f<o;f++){const g=d[f].dot(a);g>c&&(c=g),g<l&&(l=g)}if(l-=u,c-=u,l>c){const f=l;l=c,c=f}r[0]=c,r[1]=l}}const ha=[],ua=[];new E;const Dx=new E,Nx=new E;class us extends Tt{constructor(t){super({type:Tt.types.BOX}),this.halfExtents=t,this.convexPolyhedronRepresentation=null,this.updateConvexPolyhedronRepresentation(),this.updateBoundingSphereRadius()}updateConvexPolyhedronRepresentation(){const t=this.halfExtents.x,e=this.halfExtents.y,n=this.halfExtents.z,i=E,r=[new i(-t,-e,-n),new i(t,-e,-n),new i(t,e,-n),new i(-t,e,-n),new i(-t,-e,n),new i(t,-e,n),new i(t,e,n),new i(-t,e,n)],o=[[3,2,1,0],[4,5,6,7],[5,4,0,1],[2,3,7,6],[0,4,7,3],[1,2,6,5]],a=[new i(0,0,1),new i(0,1,0),new i(1,0,0)],c=new zs({vertices:r,faces:o,axes:a});this.convexPolyhedronRepresentation=c,c.material=this.material}calculateLocalInertia(t,e){return e===void 0&&(e=new E),us.calculateInertia(this.halfExtents,t,e),e}static calculateInertia(t,e,n){const i=t;n.x=1/12*e*(2*i.y*2*i.y+2*i.z*2*i.z),n.y=1/12*e*(2*i.x*2*i.x+2*i.z*2*i.z),n.z=1/12*e*(2*i.y*2*i.y+2*i.x*2*i.x)}getSideNormals(t,e){const n=t,i=this.halfExtents;if(n[0].set(i.x,0,0),n[1].set(0,i.y,0),n[2].set(0,0,i.z),n[3].set(-i.x,0,0),n[4].set(0,-i.y,0),n[5].set(0,0,-i.z),e!==void 0)for(let r=0;r!==n.length;r++)e.vmult(n[r],n[r]);return n}volume(){return 8*this.halfExtents.x*this.halfExtents.y*this.halfExtents.z}updateBoundingSphereRadius(){this.boundingSphereRadius=this.halfExtents.length()}forEachWorldCorner(t,e,n){const i=this.halfExtents,r=[[i.x,i.y,i.z],[-i.x,i.y,i.z],[-i.x,-i.y,i.z],[-i.x,-i.y,-i.z],[i.x,-i.y,-i.z],[i.x,i.y,-i.z],[-i.x,i.y,-i.z],[i.x,-i.y,i.z]];for(let o=0;o<r.length;o++)jn.set(r[o][0],r[o][1],r[o][2]),e.vmult(jn,jn),t.vadd(jn,jn),n(jn.x,jn.y,jn.z)}calculateWorldAABB(t,e,n,i){const r=this.halfExtents;xn[0].set(r.x,r.y,r.z),xn[1].set(-r.x,r.y,r.z),xn[2].set(-r.x,-r.y,r.z),xn[3].set(-r.x,-r.y,-r.z),xn[4].set(r.x,-r.y,-r.z),xn[5].set(r.x,r.y,-r.z),xn[6].set(-r.x,r.y,-r.z),xn[7].set(r.x,-r.y,r.z);const o=xn[0];e.vmult(o,o),t.vadd(o,o),i.copy(o),n.copy(o);for(let a=1;a<8;a++){const c=xn[a];e.vmult(c,c),t.vadd(c,c);const l=c.x,h=c.y,d=c.z;l>i.x&&(i.x=l),h>i.y&&(i.y=h),d>i.z&&(i.z=d),l<n.x&&(n.x=l),h<n.y&&(n.y=h),d<n.z&&(n.z=d)}}}const jn=new E,xn=[new E,new E,new E,new E,new E,new E,new E,new E],cc={DYNAMIC:1,STATIC:2,KINEMATIC:4},lc={AWAKE:0,SLEEPY:1,SLEEPING:2};class bt extends Tu{constructor(t){t===void 0&&(t={}),super(),this.id=bt.idCounter++,this.index=-1,this.world=null,this.vlambda=new E,this.collisionFilterGroup=typeof t.collisionFilterGroup=="number"?t.collisionFilterGroup:1,this.collisionFilterMask=typeof t.collisionFilterMask=="number"?t.collisionFilterMask:-1,this.collisionResponse=typeof t.collisionResponse=="boolean"?t.collisionResponse:!0,this.position=new E,this.previousPosition=new E,this.interpolatedPosition=new E,this.initPosition=new E,t.position&&(this.position.copy(t.position),this.previousPosition.copy(t.position),this.interpolatedPosition.copy(t.position),this.initPosition.copy(t.position)),this.velocity=new E,t.velocity&&this.velocity.copy(t.velocity),this.initVelocity=new E,this.force=new E;const e=typeof t.mass=="number"?t.mass:0;this.mass=e,this.invMass=e>0?1/e:0,this.material=t.material||null,this.linearDamping=typeof t.linearDamping=="number"?t.linearDamping:.01,this.type=e<=0?bt.STATIC:bt.DYNAMIC,typeof t.type==typeof bt.STATIC&&(this.type=t.type),this.allowSleep=typeof t.allowSleep<"u"?t.allowSleep:!0,this.sleepState=bt.AWAKE,this.sleepSpeedLimit=typeof t.sleepSpeedLimit<"u"?t.sleepSpeedLimit:.1,this.sleepTimeLimit=typeof t.sleepTimeLimit<"u"?t.sleepTimeLimit:1,this.timeLastSleepy=0,this.wakeUpAfterNarrowphase=!1,this.torque=new E,this.quaternion=new fe,this.initQuaternion=new fe,this.previousQuaternion=new fe,this.interpolatedQuaternion=new fe,t.quaternion&&(this.quaternion.copy(t.quaternion),this.initQuaternion.copy(t.quaternion),this.previousQuaternion.copy(t.quaternion),this.interpolatedQuaternion.copy(t.quaternion)),this.angularVelocity=new E,t.angularVelocity&&this.angularVelocity.copy(t.angularVelocity),this.initAngularVelocity=new E,this.shapes=[],this.shapeOffsets=[],this.shapeOrientations=[],this.inertia=new E,this.invInertia=new E,this.invInertiaWorld=new pn,this.invMassSolve=0,this.invInertiaSolve=new E,this.invInertiaWorldSolve=new pn,this.fixedRotation=typeof t.fixedRotation<"u"?t.fixedRotation:!1,this.angularDamping=typeof t.angularDamping<"u"?t.angularDamping:.01,this.linearFactor=new E(1,1,1),t.linearFactor&&this.linearFactor.copy(t.linearFactor),this.angularFactor=new E(1,1,1),t.angularFactor&&this.angularFactor.copy(t.angularFactor),this.aabb=new tn,this.aabbNeedsUpdate=!0,this.boundingRadius=0,this.wlambda=new E,this.isTrigger=!!t.isTrigger,t.shape&&this.addShape(t.shape),this.updateMassProperties()}wakeUp(){const t=this.sleepState;this.sleepState=bt.AWAKE,this.wakeUpAfterNarrowphase=!1,t===bt.SLEEPING&&this.dispatchEvent(bt.wakeupEvent)}sleep(){this.sleepState=bt.SLEEPING,this.velocity.set(0,0,0),this.angularVelocity.set(0,0,0),this.wakeUpAfterNarrowphase=!1}sleepTick(t){if(this.allowSleep){const e=this.sleepState,n=this.velocity.lengthSquared()+this.angularVelocity.lengthSquared(),i=this.sleepSpeedLimit**2;e===bt.AWAKE&&n<i?(this.sleepState=bt.SLEEPY,this.timeLastSleepy=t,this.dispatchEvent(bt.sleepyEvent)):e===bt.SLEEPY&&n>i?this.wakeUp():e===bt.SLEEPY&&t-this.timeLastSleepy>this.sleepTimeLimit&&(this.sleep(),this.dispatchEvent(bt.sleepEvent))}}updateSolveMassProperties(){this.sleepState===bt.SLEEPING||this.type===bt.KINEMATIC?(this.invMassSolve=0,this.invInertiaSolve.setZero(),this.invInertiaWorldSolve.setZero()):(this.invMassSolve=this.invMass,this.invInertiaSolve.copy(this.invInertia),this.invInertiaWorldSolve.copy(this.invInertiaWorld))}pointToLocalFrame(t,e){return e===void 0&&(e=new E),t.vsub(this.position,e),this.quaternion.conjugate().vmult(e,e),e}vectorToLocalFrame(t,e){return e===void 0&&(e=new E),this.quaternion.conjugate().vmult(t,e),e}pointToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e.vadd(this.position,e),e}vectorToWorldFrame(t,e){return e===void 0&&(e=new E),this.quaternion.vmult(t,e),e}addShape(t,e,n){const i=new E,r=new fe;return e&&i.copy(e),n&&r.copy(n),this.shapes.push(t),this.shapeOffsets.push(i),this.shapeOrientations.push(r),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=this,this}removeShape(t){const e=this.shapes.indexOf(t);return e===-1?(console.warn("Shape does not belong to the body"),this):(this.shapes.splice(e,1),this.shapeOffsets.splice(e,1),this.shapeOrientations.splice(e,1),this.updateMassProperties(),this.updateBoundingRadius(),this.aabbNeedsUpdate=!0,t.body=null,this)}updateBoundingRadius(){const t=this.shapes,e=this.shapeOffsets,n=t.length;let i=0;for(let r=0;r!==n;r++){const o=t[r];o.updateBoundingSphereRadius();const a=e[r].length(),c=o.boundingSphereRadius;a+c>i&&(i=a+c)}this.boundingRadius=i}updateAABB(){const t=this.shapes,e=this.shapeOffsets,n=this.shapeOrientations,i=t.length,r=Ux,o=Fx,a=this.quaternion,c=this.aabb,l=Ox;for(let h=0;h!==i;h++){const d=t[h];a.vmult(e[h],r),r.vadd(this.position,r),a.mult(n[h],o),d.calculateWorldAABB(r,o,l.lowerBound,l.upperBound),h===0?c.copy(l):c.extend(l)}this.aabbNeedsUpdate=!1}updateInertiaWorld(t){const e=this.invInertia;if(!(e.x===e.y&&e.y===e.z&&!t)){const n=zx,i=Bx;n.setRotationFromQuaternion(this.quaternion),n.transpose(i),n.scale(e,n),n.mmult(i,this.invInertiaWorld)}}applyForce(t,e){if(e===void 0&&(e=new E),this.type!==bt.DYNAMIC)return;this.sleepState===bt.SLEEPING&&this.wakeUp();const n=Gx;e.cross(t,n),this.force.vadd(t,this.force),this.torque.vadd(n,this.torque)}applyLocalForce(t,e){if(e===void 0&&(e=new E),this.type!==bt.DYNAMIC)return;const n=Hx,i=Wx;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyForce(n,i)}applyTorque(t){this.type===bt.DYNAMIC&&(this.sleepState===bt.SLEEPING&&this.wakeUp(),this.torque.vadd(t,this.torque))}applyImpulse(t,e){if(e===void 0&&(e=new E),this.type!==bt.DYNAMIC)return;this.sleepState===bt.SLEEPING&&this.wakeUp();const n=e,i=kx;i.copy(t),i.scale(this.invMass,i),this.velocity.vadd(i,this.velocity);const r=Vx;n.cross(t,r),this.invInertiaWorld.vmult(r,r),this.angularVelocity.vadd(r,this.angularVelocity)}applyLocalImpulse(t,e){if(e===void 0&&(e=new E),this.type!==bt.DYNAMIC)return;const n=Xx,i=qx;this.vectorToWorldFrame(t,n),this.vectorToWorldFrame(e,i),this.applyImpulse(n,i)}updateMassProperties(){const t=Yx;this.invMass=this.mass>0?1/this.mass:0;const e=this.inertia,n=this.fixedRotation;this.updateAABB(),t.set((this.aabb.upperBound.x-this.aabb.lowerBound.x)/2,(this.aabb.upperBound.y-this.aabb.lowerBound.y)/2,(this.aabb.upperBound.z-this.aabb.lowerBound.z)/2),us.calculateInertia(t,this.mass,e),this.invInertia.set(e.x>0&&!n?1/e.x:0,e.y>0&&!n?1/e.y:0,e.z>0&&!n?1/e.z:0),this.updateInertiaWorld(!0)}getVelocityAtWorldPoint(t,e){const n=new E;return t.vsub(this.position,n),this.angularVelocity.cross(n,e),this.velocity.vadd(e,e),e}integrate(t,e,n){if(this.previousPosition.copy(this.position),this.previousQuaternion.copy(this.quaternion),!(this.type===bt.DYNAMIC||this.type===bt.KINEMATIC)||this.sleepState===bt.SLEEPING)return;const i=this.velocity,r=this.angularVelocity,o=this.position,a=this.force,c=this.torque,l=this.quaternion,h=this.invMass,d=this.invInertiaWorld,u=this.linearFactor,f=h*t;i.x+=a.x*f*u.x,i.y+=a.y*f*u.y,i.z+=a.z*f*u.z;const g=d.elements,v=this.angularFactor,m=c.x*v.x,p=c.y*v.y,x=c.z*v.z;r.x+=t*(g[0]*m+g[1]*p+g[2]*x),r.y+=t*(g[3]*m+g[4]*p+g[5]*x),r.z+=t*(g[6]*m+g[7]*p+g[8]*x),o.x+=i.x*t,o.y+=i.y*t,o.z+=i.z*t,l.integrate(this.angularVelocity,t,this.angularFactor,l),e&&(n?l.normalizeFast():l.normalize()),this.aabbNeedsUpdate=!0,this.updateInertiaWorld()}}bt.idCounter=0;bt.COLLIDE_EVENT_NAME="collide";bt.DYNAMIC=cc.DYNAMIC;bt.STATIC=cc.STATIC;bt.KINEMATIC=cc.KINEMATIC;bt.AWAKE=lc.AWAKE;bt.SLEEPY=lc.SLEEPY;bt.SLEEPING=lc.SLEEPING;bt.wakeupEvent={type:"wakeup"};bt.sleepyEvent={type:"sleepy"};bt.sleepEvent={type:"sleep"};const Ux=new E,Fx=new fe,Ox=new tn,zx=new pn,Bx=new pn;new pn;const Gx=new E,Hx=new E,Wx=new E,kx=new E,Vx=new E,Xx=new E,qx=new E,Yx=new E;class jx{constructor(){this.world=null,this.useBoundingBoxes=!1,this.dirty=!0}collisionPairs(t,e,n){throw new Error("collisionPairs not implemented for this BroadPhase class!")}needBroadphaseCollision(t,e){return!(!(t.collisionFilterGroup&e.collisionFilterMask)||!(e.collisionFilterGroup&t.collisionFilterMask)||(t.type&bt.STATIC||t.sleepState===bt.SLEEPING)&&(e.type&bt.STATIC||e.sleepState===bt.SLEEPING))}intersectionTest(t,e,n,i){this.useBoundingBoxes?this.doBoundingBoxBroadphase(t,e,n,i):this.doBoundingSphereBroadphase(t,e,n,i)}doBoundingSphereBroadphase(t,e,n,i){const r=Kx;e.position.vsub(t.position,r);const o=(t.boundingRadius+e.boundingRadius)**2;r.lengthSquared()<o&&(n.push(t),i.push(e))}doBoundingBoxBroadphase(t,e,n,i){t.aabbNeedsUpdate&&t.updateAABB(),e.aabbNeedsUpdate&&e.updateAABB(),t.aabb.overlaps(e.aabb)&&(n.push(t),i.push(e))}makePairsUnique(t,e){const n=Zx,i=Jx,r=Qx,o=t.length;for(let a=0;a!==o;a++)i[a]=t[a],r[a]=e[a];t.length=0,e.length=0;for(let a=0;a!==o;a++){const c=i[a].id,l=r[a].id,h=c<l?`${c},${l}`:`${l},${c}`;n[h]=a,n.keys.push(h)}for(let a=0;a!==n.keys.length;a++){const c=n.keys.pop(),l=n[c];t.push(i[l]),e.push(r[l]),delete n[c]}}setWorld(t){}static boundingSphereCheck(t,e){const n=new E;t.position.vsub(e.position,n);const i=t.shapes[0],r=e.shapes[0];return Math.pow(i.boundingSphereRadius+r.boundingSphereRadius,2)>n.lengthSquared()}aabbQuery(t,e,n){return console.warn(".aabbQuery is not implemented in this Broadphase subclass."),[]}}const Kx=new E;new E;new fe;new E;const Zx={keys:[]},Jx=[],Qx=[];new E;new E;new E;class Au extends jx{constructor(){super()}collisionPairs(t,e,n){const i=t.bodies,r=i.length;let o,a;for(let c=0;c!==r;c++)for(let l=0;l!==c;l++)o=i[c],a=i[l],this.needBroadphaseCollision(o,a)&&this.intersectionTest(o,a,e,n)}aabbQuery(t,e,n){n===void 0&&(n=[]);for(let i=0;i<t.bodies.length;i++){const r=t.bodies[i];r.aabbNeedsUpdate&&r.updateAABB(),r.aabb.overlaps(e)&&n.push(r)}return n}}class Xs{constructor(){this.rayFromWorld=new E,this.rayToWorld=new E,this.hitNormalWorld=new E,this.hitPointWorld=new E,this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}reset(){this.rayFromWorld.setZero(),this.rayToWorld.setZero(),this.hitNormalWorld.setZero(),this.hitPointWorld.setZero(),this.hasHit=!1,this.shape=null,this.body=null,this.hitFaceIndex=-1,this.distance=-1,this.shouldStop=!1}abort(){this.shouldStop=!0}set(t,e,n,i,r,o,a){this.rayFromWorld.copy(t),this.rayToWorld.copy(e),this.hitNormalWorld.copy(n),this.hitPointWorld.copy(i),this.shape=r,this.body=o,this.distance=a}}let Cu,Ru,Pu,Lu,Iu,Du,Nu;const hc={CLOSEST:1,ANY:2,ALL:4};Cu=Tt.types.SPHERE;Ru=Tt.types.PLANE;Pu=Tt.types.BOX;Lu=Tt.types.CYLINDER;Iu=Tt.types.CONVEXPOLYHEDRON;Du=Tt.types.HEIGHTFIELD;Nu=Tt.types.TRIMESH;class Me{get[Cu](){return this._intersectSphere}get[Ru](){return this._intersectPlane}get[Pu](){return this._intersectBox}get[Lu](){return this._intersectConvex}get[Iu](){return this._intersectConvex}get[Du](){return this._intersectHeightfield}get[Nu](){return this._intersectTrimesh}constructor(t,e){t===void 0&&(t=new E),e===void 0&&(e=new E),this.from=t.clone(),this.to=e.clone(),this.direction=new E,this.precision=1e-4,this.checkCollisionResponse=!0,this.skipBackfaces=!1,this.collisionFilterMask=-1,this.collisionFilterGroup=-1,this.mode=Me.ANY,this.result=new Xs,this.hasHit=!1,this.callback=n=>{}}intersectWorld(t,e){return this.mode=e.mode||Me.ANY,this.result=e.result||new Xs,this.skipBackfaces=!!e.skipBackfaces,this.collisionFilterMask=typeof e.collisionFilterMask<"u"?e.collisionFilterMask:-1,this.collisionFilterGroup=typeof e.collisionFilterGroup<"u"?e.collisionFilterGroup:-1,this.checkCollisionResponse=typeof e.checkCollisionResponse<"u"?e.checkCollisionResponse:!0,e.from&&this.from.copy(e.from),e.to&&this.to.copy(e.to),this.callback=e.callback||(()=>{}),this.hasHit=!1,this.result.reset(),this.updateDirection(),this.getAABB(nh),da.length=0,t.broadphase.aabbQuery(t,nh,da),this.intersectBodies(da),this.hasHit}intersectBody(t,e){e&&(this.result=e,this.updateDirection());const n=this.checkCollisionResponse;if(n&&!t.collisionResponse||!(this.collisionFilterGroup&t.collisionFilterMask)||!(t.collisionFilterGroup&this.collisionFilterMask))return;const i=$x,r=ty;for(let o=0,a=t.shapes.length;o<a;o++){const c=t.shapes[o];if(!(n&&!c.collisionResponse)&&(t.quaternion.mult(t.shapeOrientations[o],r),t.quaternion.vmult(t.shapeOffsets[o],i),i.vadd(t.position,i),this.intersectShape(c,r,i,t),this.result.shouldStop))break}}intersectBodies(t,e){e&&(this.result=e,this.updateDirection());for(let n=0,i=t.length;!this.result.shouldStop&&n<i;n++)this.intersectBody(t[n])}updateDirection(){this.to.vsub(this.from,this.direction),this.direction.normalize()}intersectShape(t,e,n,i){const r=this.from;if(py(r,this.direction,n)>t.boundingSphereRadius)return;const a=this[t.type];a&&a.call(this,t,e,n,i,t)}_intersectBox(t,e,n,i,r){return this._intersectConvex(t.convexPolyhedronRepresentation,e,n,i,r)}_intersectPlane(t,e,n,i,r){const o=this.from,a=this.to,c=this.direction,l=new E(0,0,1);e.vmult(l,l);const h=new E;o.vsub(n,h);const d=h.dot(l);a.vsub(n,h);const u=h.dot(l);if(d*u>0||o.distanceTo(a)<d)return;const f=l.dot(c);if(Math.abs(f)<this.precision)return;const g=new E,v=new E,m=new E;o.vsub(n,g);const p=-l.dot(g)/f;c.scale(p,v),o.vadd(v,m),this.reportIntersection(l,m,r,i,-1)}getAABB(t){const{lowerBound:e,upperBound:n}=t,i=this.to,r=this.from;e.x=Math.min(i.x,r.x),e.y=Math.min(i.y,r.y),e.z=Math.min(i.z,r.z),n.x=Math.max(i.x,r.x),n.y=Math.max(i.y,r.y),n.z=Math.max(i.z,r.z)}_intersectHeightfield(t,e,n,i,r){t.data,t.elementSize;const o=ey;o.from.copy(this.from),o.to.copy(this.to),Qt.pointToLocalFrame(n,e,o.from,o.from),Qt.pointToLocalFrame(n,e,o.to,o.to),o.updateDirection();const a=ny;let c,l,h,d;c=l=0,h=d=t.data.length-1;const u=new tn;o.getAABB(u),t.getIndexOfPosition(u.lowerBound.x,u.lowerBound.y,a,!0),c=Math.max(c,a[0]),l=Math.max(l,a[1]),t.getIndexOfPosition(u.upperBound.x,u.upperBound.y,a,!0),h=Math.min(h,a[0]+1),d=Math.min(d,a[1]+1);for(let f=c;f<h;f++)for(let g=l;g<d;g++){if(this.result.shouldStop)return;if(t.getAabbAtIndex(f,g,u),!!u.overlapsRay(o)){if(t.getConvexTrianglePillar(f,g,!1),Qt.pointToWorldFrame(n,e,t.pillarOffset,Pr),this._intersectConvex(t.pillarConvex,e,Pr,i,r,ih),this.result.shouldStop)return;t.getConvexTrianglePillar(f,g,!0),Qt.pointToWorldFrame(n,e,t.pillarOffset,Pr),this._intersectConvex(t.pillarConvex,e,Pr,i,r,ih)}}}_intersectSphere(t,e,n,i,r){const o=this.from,a=this.to,c=t.radius,l=(a.x-o.x)**2+(a.y-o.y)**2+(a.z-o.z)**2,h=2*((a.x-o.x)*(o.x-n.x)+(a.y-o.y)*(o.y-n.y)+(a.z-o.z)*(o.z-n.z)),d=(o.x-n.x)**2+(o.y-n.y)**2+(o.z-n.z)**2-c**2,u=h**2-4*l*d,f=iy,g=sy;if(!(u<0))if(u===0)o.lerp(a,u,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1);else{const v=(-h-Math.sqrt(u))/(2*l),m=(-h+Math.sqrt(u))/(2*l);if(v>=0&&v<=1&&(o.lerp(a,v,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1)),this.result.shouldStop)return;m>=0&&m<=1&&(o.lerp(a,m,f),f.vsub(n,g),g.normalize(),this.reportIntersection(g,f,r,i,-1))}}_intersectConvex(t,e,n,i,r,o){const a=ry,c=sh,l=o&&o.faceList||null,h=t.faces,d=t.vertices,u=t.faceNormals,f=this.direction,g=this.from,v=this.to,m=g.distanceTo(v),p=l?l.length:h.length,x=this.result;for(let y=0;!x.shouldStop&&y<p;y++){const _=l?l[y]:y,M=h[_],S=u[_],b=e,L=n;c.copy(d[M[0]]),b.vmult(c,c),c.vadd(L,c),c.vsub(g,c),b.vmult(S,a);const w=f.dot(a);if(Math.abs(w)<this.precision)continue;const T=a.dot(c)/w;if(!(T<0)){f.scale(T,Xe),Xe.vadd(g,Xe),un.copy(d[M[0]]),b.vmult(un,un),L.vadd(un,un);for(let O=1;!x.shouldStop&&O<M.length-1;O++){yn.copy(d[M[O]]),_n.copy(d[M[O+1]]),b.vmult(yn,yn),b.vmult(_n,_n),L.vadd(yn,yn),L.vadd(_n,_n);const D=Xe.distanceTo(g);!(Me.pointInTriangle(Xe,un,yn,_n)||Me.pointInTriangle(Xe,yn,un,_n))||D>m||this.reportIntersection(a,Xe,r,i,_)}}}}_intersectTrimesh(t,e,n,i,r,o){const a=oy,c=dy,l=fy,h=sh,d=ay,u=cy,f=ly,g=uy,v=hy,m=t.indices;t.vertices;const p=this.from,x=this.to,y=this.direction;l.position.copy(n),l.quaternion.copy(e),Qt.vectorToLocalFrame(n,e,y,d),Qt.pointToLocalFrame(n,e,p,u),Qt.pointToLocalFrame(n,e,x,f),f.x*=t.scale.x,f.y*=t.scale.y,f.z*=t.scale.z,u.x*=t.scale.x,u.y*=t.scale.y,u.z*=t.scale.z,f.vsub(u,d),d.normalize();const _=u.distanceSquared(f);t.tree.rayQuery(this,l,c);for(let M=0,S=c.length;!this.result.shouldStop&&M!==S;M++){const b=c[M];t.getNormal(b,a),t.getVertex(m[b*3],un),un.vsub(u,h);const L=d.dot(a),w=a.dot(h)/L;if(w<0)continue;d.scale(w,Xe),Xe.vadd(u,Xe),t.getVertex(m[b*3+1],yn),t.getVertex(m[b*3+2],_n);const T=Xe.distanceSquared(u);!(Me.pointInTriangle(Xe,yn,un,_n)||Me.pointInTriangle(Xe,un,yn,_n))||T>_||(Qt.vectorToWorldFrame(e,a,v),Qt.pointToWorldFrame(n,e,Xe,g),this.reportIntersection(v,g,r,i,b))}c.length=0}reportIntersection(t,e,n,i,r){const o=this.from,a=this.to,c=o.distanceTo(e),l=this.result;if(!(this.skipBackfaces&&t.dot(this.direction)>0))switch(l.hitFaceIndex=typeof r<"u"?r:-1,this.mode){case Me.ALL:this.hasHit=!0,l.set(o,a,t,e,n,i,c),l.hasHit=!0,this.callback(l);break;case Me.CLOSEST:(c<l.distance||!l.hasHit)&&(this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c));break;case Me.ANY:this.hasHit=!0,l.hasHit=!0,l.set(o,a,t,e,n,i,c),l.shouldStop=!0;break}}static pointInTriangle(t,e,n,i){i.vsub(e,gi),n.vsub(e,Ss),t.vsub(e,fa);const r=gi.dot(gi),o=gi.dot(Ss),a=gi.dot(fa),c=Ss.dot(Ss),l=Ss.dot(fa);let h,d;return(h=c*a-o*l)>=0&&(d=r*l-o*a)>=0&&h+d<r*c-o*o}}Me.CLOSEST=hc.CLOSEST;Me.ANY=hc.ANY;Me.ALL=hc.ALL;const nh=new tn,da=[],Ss=new E,fa=new E,$x=new E,ty=new fe,Xe=new E,un=new E,yn=new E,_n=new E;new E;new Xs;const ih={faceList:[0]},Pr=new E,ey=new Me,ny=[],iy=new E,sy=new E,ry=new E;new E;new E;const sh=new E,oy=new E,ay=new E,cy=new E,ly=new E,hy=new E,uy=new E;new tn;const dy=[],fy=new Qt,gi=new E,Lr=new E;function py(s,t,e){e.vsub(s,gi);const n=gi.dot(t);return t.scale(n,Lr),Lr.vadd(s,Lr),e.distanceTo(Lr)}class Uu{static defaults(t,e){t===void 0&&(t={});for(let n in e)n in t||(t[n]=e[n]);return t}}class rh{constructor(){this.spatial=new E,this.rotational=new E}multiplyElement(t){return t.spatial.dot(this.spatial)+t.rotational.dot(this.rotational)}multiplyVectors(t,e){return t.dot(this.spatial)+e.dot(this.rotational)}}class Ks{constructor(t,e,n,i){n===void 0&&(n=-1e6),i===void 0&&(i=1e6),this.id=Ks.idCounter++,this.minForce=n,this.maxForce=i,this.bi=t,this.bj=e,this.a=0,this.b=0,this.eps=0,this.jacobianElementA=new rh,this.jacobianElementB=new rh,this.enabled=!0,this.multiplier=0,this.setSpookParams(1e7,4,1/60)}setSpookParams(t,e,n){const i=e,r=t,o=n;this.a=4/(o*(1+4*i)),this.b=4*i/(1+4*i),this.eps=4/(o*o*r*(1+4*i))}computeB(t,e,n){const i=this.computeGW(),r=this.computeGq(),o=this.computeGiMf();return-r*t-i*e-o*n}computeGq(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.position,o=i.position;return t.spatial.dot(r)+e.spatial.dot(o)}computeGW(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.velocity,o=i.velocity,a=n.angularVelocity,c=i.angularVelocity;return t.multiplyVectors(r,a)+e.multiplyVectors(o,c)}computeGWlambda(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.vlambda,o=i.vlambda,a=n.wlambda,c=i.wlambda;return t.multiplyVectors(r,a)+e.multiplyVectors(o,c)}computeGiMf(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.force,o=n.torque,a=i.force,c=i.torque,l=n.invMassSolve,h=i.invMassSolve;return r.scale(l,oh),a.scale(h,ah),n.invInertiaWorldSolve.vmult(o,ch),i.invInertiaWorldSolve.vmult(c,lh),t.multiplyVectors(oh,ch)+e.multiplyVectors(ah,lh)}computeGiMGt(){const t=this.jacobianElementA,e=this.jacobianElementB,n=this.bi,i=this.bj,r=n.invMassSolve,o=i.invMassSolve,a=n.invInertiaWorldSolve,c=i.invInertiaWorldSolve;let l=r+o;return a.vmult(t.rotational,Ir),l+=Ir.dot(t.rotational),c.vmult(e.rotational,Ir),l+=Ir.dot(e.rotational),l}addToWlambda(t){const e=this.jacobianElementA,n=this.jacobianElementB,i=this.bi,r=this.bj,o=my;i.vlambda.addScaledVector(i.invMassSolve*t,e.spatial,i.vlambda),r.vlambda.addScaledVector(r.invMassSolve*t,n.spatial,r.vlambda),i.invInertiaWorldSolve.vmult(e.rotational,o),i.wlambda.addScaledVector(t,o,i.wlambda),r.invInertiaWorldSolve.vmult(n.rotational,o),r.wlambda.addScaledVector(t,o,r.wlambda)}computeC(){return this.computeGiMGt()+this.eps}}Ks.idCounter=0;const oh=new E,ah=new E,ch=new E,lh=new E,Ir=new E,my=new E;class gy extends Ks{constructor(t,e,n){n===void 0&&(n=1e6),super(t,e,0,n),this.restitution=0,this.ri=new E,this.rj=new E,this.ni=new E}computeB(t){const e=this.a,n=this.b,i=this.bi,r=this.bj,o=this.ri,a=this.rj,c=vy,l=xy,h=i.velocity,d=i.angularVelocity;i.force,i.torque;const u=r.velocity,f=r.angularVelocity;r.force,r.torque;const g=yy,v=this.jacobianElementA,m=this.jacobianElementB,p=this.ni;o.cross(p,c),a.cross(p,l),p.negate(v.spatial),c.negate(v.rotational),m.spatial.copy(p),m.rotational.copy(l),g.copy(r.position),g.vadd(a,g),g.vsub(i.position,g),g.vsub(o,g);const x=p.dot(g),y=this.restitution+1,_=y*u.dot(p)-y*h.dot(p)+f.dot(l)-d.dot(c),M=this.computeGiMf();return-x*e-_*n-t*M}getImpactVelocityAlongNormal(){const t=_y,e=My,n=Sy,i=wy,r=Ey;return this.bi.position.vadd(this.ri,n),this.bj.position.vadd(this.rj,i),this.bi.getVelocityAtWorldPoint(n,t),this.bj.getVelocityAtWorldPoint(i,e),t.vsub(e,r),this.ni.dot(r)}}const vy=new E,xy=new E,yy=new E,_y=new E,My=new E,Sy=new E,wy=new E,Ey=new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;class hh extends Ks{constructor(t,e,n){super(t,e,-n,n),this.ri=new E,this.rj=new E,this.t=new E}computeB(t){this.a;const e=this.b;this.bi,this.bj;const n=this.ri,i=this.rj,r=by,o=Ty,a=this.t;n.cross(a,r),i.cross(a,o);const c=this.jacobianElementA,l=this.jacobianElementB;a.negate(c.spatial),r.negate(c.rotational),l.spatial.copy(a),l.rotational.copy(o);const h=this.computeGW(),d=this.computeGiMf();return-h*e-t*d}}const by=new E,Ty=new E;class _i{constructor(t,e,n){n=Uu.defaults(n,{friction:.3,restitution:.3,contactEquationStiffness:1e7,contactEquationRelaxation:3,frictionEquationStiffness:1e7,frictionEquationRelaxation:3}),this.id=_i.idCounter++,this.materials=[t,e],this.friction=n.friction,this.restitution=n.restitution,this.contactEquationStiffness=n.contactEquationStiffness,this.contactEquationRelaxation=n.contactEquationRelaxation,this.frictionEquationStiffness=n.frictionEquationStiffness,this.frictionEquationRelaxation=n.frictionEquationRelaxation}}_i.idCounter=0;class Qn{constructor(t){t===void 0&&(t={});let e="";typeof t=="string"&&(e=t,t={}),this.name=e,this.id=Qn.idCounter++,this.friction=typeof t.friction<"u"?t.friction:-1,this.restitution=typeof t.restitution<"u"?t.restitution:-1}}Qn.idCounter=0;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;class Ay{constructor(t){t===void 0&&(t={}),t=Uu.defaults(t,{chassisConnectionPointLocal:new E,chassisConnectionPointWorld:new E,directionLocal:new E,directionWorld:new E,axleLocal:new E,axleWorld:new E,suspensionRestLength:1,suspensionMaxLength:2,radius:1,suspensionStiffness:100,dampingCompression:10,dampingRelaxation:10,frictionSlip:10.5,forwardAcceleration:1,sideAcceleration:1,steering:0,rotation:0,deltaRotation:0,rollInfluence:.01,maxSuspensionForce:Number.MAX_VALUE,isFrontWheel:!0,clippedInvContactDotSuspension:1,suspensionRelativeVelocity:0,suspensionForce:0,slipInfo:0,skidInfo:0,suspensionLength:0,maxSuspensionTravel:1,useCustomSlidingRotationalSpeed:!1,customSlidingRotationalSpeed:-.1}),this.maxSuspensionTravel=t.maxSuspensionTravel,this.customSlidingRotationalSpeed=t.customSlidingRotationalSpeed,this.useCustomSlidingRotationalSpeed=t.useCustomSlidingRotationalSpeed,this.sliding=!1,this.chassisConnectionPointLocal=t.chassisConnectionPointLocal.clone(),this.chassisConnectionPointWorld=t.chassisConnectionPointWorld.clone(),this.directionLocal=t.directionLocal.clone(),this.directionWorld=t.directionWorld.clone(),this.axleLocal=t.axleLocal.clone(),this.axleWorld=t.axleWorld.clone(),this.suspensionRestLength=t.suspensionRestLength,this.suspensionMaxLength=t.suspensionMaxLength,this.radius=t.radius,this.suspensionStiffness=t.suspensionStiffness,this.dampingCompression=t.dampingCompression,this.dampingRelaxation=t.dampingRelaxation,this.frictionSlip=t.frictionSlip,this.forwardAcceleration=t.forwardAcceleration,this.sideAcceleration=t.sideAcceleration,this.steering=0,this.rotation=0,this.deltaRotation=0,this.rollInfluence=t.rollInfluence,this.maxSuspensionForce=t.maxSuspensionForce,this.engineForce=0,this.brake=0,this.isFrontWheel=t.isFrontWheel,this.clippedInvContactDotSuspension=1,this.suspensionRelativeVelocity=0,this.suspensionForce=0,this.slipInfo=0,this.skidInfo=0,this.suspensionLength=0,this.sideImpulse=0,this.forwardImpulse=0,this.raycastResult=new Xs,this.worldTransform=new Qt,this.isInContact=!1}updateWheel(t){const e=this.raycastResult;if(this.isInContact){const n=e.hitNormalWorld.dot(e.directionWorld);e.hitPointWorld.vsub(t.position,dh),t.getVelocityAtWorldPoint(dh,uh);const i=e.hitNormalWorld.dot(uh);if(n>=-.1)this.suspensionRelativeVelocity=0,this.clippedInvContactDotSuspension=1/.1;else{const r=-1/n;this.suspensionRelativeVelocity=i*r,this.clippedInvContactDotSuspension=r}}else e.suspensionLength=this.suspensionRestLength,this.suspensionRelativeVelocity=0,e.directionWorld.scale(-1,e.hitNormalWorld),this.clippedInvContactDotSuspension=1}}const uh=new E,dh=new E;class Cy{constructor(t){this.chassisBody=t.chassisBody,this.wheelInfos=[],this.sliding=!1,this.world=null,this.indexRightAxis=typeof t.indexRightAxis<"u"?t.indexRightAxis:2,this.indexForwardAxis=typeof t.indexForwardAxis<"u"?t.indexForwardAxis:0,this.indexUpAxis=typeof t.indexUpAxis<"u"?t.indexUpAxis:1,this.constraints=[],this.preStepCallback=()=>{},this.currentVehicleSpeedKmHour=0,this.numWheelsOnGround=0}addWheel(t){t===void 0&&(t={});const e=new Ay(t),n=this.wheelInfos.length;return this.wheelInfos.push(e),n}setSteeringValue(t,e){const n=this.wheelInfos[e];n.steering=t}applyEngineForce(t,e){this.wheelInfos[e].engineForce=t}setBrake(t,e){this.wheelInfos[e].brake=t}addToWorld(t){t.addBody(this.chassisBody);const e=this;this.preStepCallback=()=>{e.updateVehicle(t.dt)},t.addEventListener("preStep",this.preStepCallback),this.world=t}getVehicleAxisWorld(t,e){e.set(t===0?1:0,t===1?1:0,t===2?1:0),this.chassisBody.vectorToWorldFrame(e,e)}updateVehicle(t){const e=this.wheelInfos,n=e.length,i=this.chassisBody;for(let d=0;d<n;d++)this.updateWheelTransform(d);this.currentVehicleSpeedKmHour=3.6*i.velocity.length();const r=new E;this.getVehicleAxisWorld(this.indexForwardAxis,r),r.dot(i.velocity)<0&&(this.currentVehicleSpeedKmHour*=-1);for(let d=0;d<n;d++)this.castRay(e[d]);this.updateSuspension(t);const o=new E,a=new E;for(let d=0;d<n;d++){const u=e[d];let f=u.suspensionForce;f>u.maxSuspensionForce&&(f=u.maxSuspensionForce),u.raycastResult.hitNormalWorld.scale(f*t,o),u.raycastResult.hitPointWorld.vsub(i.position,a),i.applyImpulse(o,a)}this.updateFriction(t);const c=new E,l=new E,h=new E;for(let d=0;d<n;d++){const u=e[d];i.getVelocityAtWorldPoint(u.chassisConnectionPointWorld,h);let f=1;switch(this.indexUpAxis){case 1:f=-1;break}if(u.isInContact){this.getVehicleAxisWorld(this.indexForwardAxis,l);const g=l.dot(u.raycastResult.hitNormalWorld);u.raycastResult.hitNormalWorld.scale(g,c),l.vsub(c,l);const v=l.dot(h);u.deltaRotation=f*v*t/u.radius}(u.sliding||!u.isInContact)&&u.engineForce!==0&&u.useCustomSlidingRotationalSpeed&&(u.deltaRotation=(u.engineForce>0?1:-1)*u.customSlidingRotationalSpeed*t),Math.abs(u.brake)>Math.abs(u.engineForce)&&(u.deltaRotation=0),u.rotation+=u.deltaRotation,u.deltaRotation*=.99}}updateSuspension(t){const n=this.chassisBody.mass,i=this.wheelInfos,r=i.length;for(let o=0;o<r;o++){const a=i[o];if(a.isInContact){let c;const l=a.suspensionRestLength,h=a.suspensionLength,d=l-h;c=a.suspensionStiffness*d*a.clippedInvContactDotSuspension;const u=a.suspensionRelativeVelocity;let f;u<0?f=a.dampingCompression:f=a.dampingRelaxation,c-=f*u,a.suspensionForce=c*n,a.suspensionForce<0&&(a.suspensionForce=0)}else a.suspensionForce=0}}removeFromWorld(t){this.constraints,t.removeBody(this.chassisBody),t.removeEventListener("preStep",this.preStepCallback),this.world=null}castRay(t){const e=Iy,n=Dy;this.updateWheelTransformWorld(t);const i=this.chassisBody;let r=-1;const o=t.suspensionRestLength+t.radius;t.directionWorld.scale(o,e);const a=t.chassisConnectionPointWorld;a.vadd(e,n);const c=t.raycastResult;c.reset();const l=i.collisionResponse;i.collisionResponse=!1,this.world.rayTest(a,n,c),i.collisionResponse=l;const h=c.body;if(t.raycastResult.groundObject=0,h){r=c.distance,t.raycastResult.hitNormalWorld=c.hitNormalWorld,t.isInContact=!0;const d=c.distance;t.suspensionLength=d-t.radius;const u=t.suspensionRestLength-t.maxSuspensionTravel,f=t.suspensionRestLength+t.maxSuspensionTravel;t.suspensionLength<u&&(t.suspensionLength=u),t.suspensionLength>f&&(t.suspensionLength=f,t.raycastResult.reset());const g=t.raycastResult.hitNormalWorld.dot(t.directionWorld),v=new E;i.getVelocityAtWorldPoint(t.raycastResult.hitPointWorld,v);const m=t.raycastResult.hitNormalWorld.dot(v);if(g>=-.1)t.suspensionRelativeVelocity=0,t.clippedInvContactDotSuspension=1/.1;else{const p=-1/g;t.suspensionRelativeVelocity=m*p,t.clippedInvContactDotSuspension=p}}else t.suspensionLength=t.suspensionRestLength+0*t.maxSuspensionTravel,t.suspensionRelativeVelocity=0,t.directionWorld.scale(-1,t.raycastResult.hitNormalWorld),t.clippedInvContactDotSuspension=1;return r}updateWheelTransformWorld(t){t.isInContact=!1;const e=this.chassisBody;e.pointToWorldFrame(t.chassisConnectionPointLocal,t.chassisConnectionPointWorld),e.vectorToWorldFrame(t.directionLocal,t.directionWorld),e.vectorToWorldFrame(t.axleLocal,t.axleWorld)}updateWheelTransform(t){const e=Ry,n=Py,i=Ly,r=this.wheelInfos[t];this.updateWheelTransformWorld(r),r.directionLocal.scale(-1,e),n.copy(r.axleLocal),e.cross(n,i),i.normalize(),n.normalize();const o=r.steering,a=new fe;a.setFromAxisAngle(e,o);const c=new fe;c.setFromAxisAngle(n,r.rotation);const l=r.worldTransform.quaternion;this.chassisBody.quaternion.mult(a,l),l.mult(c,l),l.normalize();const h=r.worldTransform.position;h.copy(r.directionWorld),h.scale(r.suspensionLength,h),h.vadd(r.chassisConnectionPointWorld,h)}getWheelTransformWorld(t){return this.wheelInfos[t].worldTransform}updateFriction(t){const e=Uy,n=this.wheelInfos,i=n.length,r=this.chassisBody,o=Oy,a=Fy;this.numWheelsOnGround=0;for(let h=0;h<i;h++){const d=n[h];d.raycastResult.body&&this.numWheelsOnGround++,d.sideImpulse=0,d.forwardImpulse=0,o[h]||(o[h]=new E),a[h]||(a[h]=new E)}for(let h=0;h<i;h++){const d=n[h],u=d.raycastResult.body;if(u){const f=a[h];this.getWheelTransformWorld(h).vectorToWorldFrame(Ny[this.indexRightAxis],f);const v=d.raycastResult.hitNormalWorld,m=f.dot(v);v.scale(m,e),f.vsub(e,f),f.normalize(),v.cross(f,o[h]),o[h].normalize(),d.sideImpulse=Zy(r,d.raycastResult.hitPointWorld,u,d.raycastResult.hitPointWorld,f),d.sideImpulse*=zy}}const c=1,l=.5;this.sliding=!1;for(let h=0;h<i;h++){const d=n[h],u=d.raycastResult.body;let f=0;if(d.slipInfo=1,u){const v=d.brake?d.brake:0;f=Wy(r,u,d.raycastResult.hitPointWorld,o[h],v),f+=d.engineForce*t;const m=v/f;d.slipInfo*=m}if(d.forwardImpulse=0,d.skidInfo=1,u){d.skidInfo=1;const g=d.suspensionForce*t*d.frictionSlip,m=g*g;d.forwardImpulse=f;const p=d.forwardImpulse*l/d.forwardAcceleration,x=d.sideImpulse*c/d.sideAcceleration,y=p*p+x*x;if(d.sliding=!1,y>m){this.sliding=!0,d.sliding=!0;const _=g/Math.sqrt(y);d.skidInfo*=_}}}if(this.sliding)for(let h=0;h<i;h++){const d=n[h];d.sideImpulse!==0&&d.skidInfo<1&&(d.forwardImpulse*=d.skidInfo,d.sideImpulse*=d.skidInfo)}for(let h=0;h<i;h++){const d=n[h],u=new E;if(d.raycastResult.hitPointWorld.vsub(r.position,u),d.forwardImpulse!==0){const f=new E;o[h].scale(d.forwardImpulse,f),r.applyImpulse(f,u)}if(d.sideImpulse!==0){const f=d.raycastResult.body,g=new E;d.raycastResult.hitPointWorld.vsub(f.position,g);const v=new E;a[h].scale(d.sideImpulse,v),r.vectorToLocalFrame(u,u),u["xyz"[this.indexUpAxis]]*=d.rollInfluence,r.vectorToWorldFrame(u,u),r.applyImpulse(v,u),v.scale(-1,v),f.applyImpulse(v,g)}}}}new E;new E;new E;const Ry=new E,Py=new E,Ly=new E;new Me;new E;const Iy=new E,Dy=new E,Ny=[new E(1,0,0),new E(0,1,0),new E(0,0,1)],Uy=new E,Fy=[],Oy=[],zy=1,By=new E,Gy=new E,Hy=new E;function Wy(s,t,e,n,i){let r=0;const o=e,a=By,c=Gy,l=Hy;s.getVelocityAtWorldPoint(o,a),t.getVelocityAtWorldPoint(o,c),a.vsub(c,l);const h=n.dot(l),d=fh(s,e,n),u=fh(t,e,n),g=1/(d+u);return r=-h*g,i<r&&(r=i),r<-i&&(r=-i),r}const ky=new E,Vy=new E,Xy=new E,qy=new E;function fh(s,t,e){const n=ky,i=Vy,r=Xy,o=qy;return t.vsub(s.position,n),n.cross(e,i),s.invInertiaWorld.vmult(i,o),o.cross(n,r),s.invMass+e.dot(r)}const Yy=new E,jy=new E,Ky=new E;function Zy(s,t,e,n,i){if(i.lengthSquared()>1.1)return 0;const o=Yy,a=jy,c=Ky;s.getVelocityAtWorldPoint(t,o),e.getVelocityAtWorldPoint(n,a),o.vsub(a,c);const l=i.dot(c),h=1/(s.invMass+e.invMass);return-.2*l*h}new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new E;new tn;new E;new tn;new E;new E;new E;new E;new E;new E;new E;new tn;new E;new Qt;new tn;class Jy{constructor(){this.equations=[]}solve(t,e){return 0}addEquation(t){t.enabled&&!t.bi.isTrigger&&!t.bj.isTrigger&&this.equations.push(t)}removeEquation(t){const e=this.equations,n=e.indexOf(t);n!==-1&&e.splice(n,1)}removeAllEquations(){this.equations.length=0}}class Qy extends Jy{constructor(){super(),this.iterations=10,this.tolerance=1e-7}solve(t,e){let n=0;const i=this.iterations,r=this.tolerance*this.tolerance,o=this.equations,a=o.length,c=e.bodies,l=c.length,h=t;let d,u,f,g,v,m;if(a!==0)for(let _=0;_!==l;_++)c[_].updateSolveMassProperties();const p=t_,x=e_,y=$y;p.length=a,x.length=a,y.length=a;for(let _=0;_!==a;_++){const M=o[_];y[_]=0,x[_]=M.computeB(h),p[_]=1/M.computeC()}if(a!==0){for(let S=0;S!==l;S++){const b=c[S],L=b.vlambda,w=b.wlambda;L.set(0,0,0),w.set(0,0,0)}for(n=0;n!==i;n++){g=0;for(let S=0;S!==a;S++){const b=o[S];d=x[S],u=p[S],m=y[S],v=b.computeGWlambda(),f=u*(d-v-b.eps*m),m+f<b.minForce?f=b.minForce-m:m+f>b.maxForce&&(f=b.maxForce-m),y[S]+=f,g+=f>0?f:-f,b.addToWlambda(f)}if(g*g<r)break}for(let S=0;S!==l;S++){const b=c[S],L=b.velocity,w=b.angularVelocity;b.vlambda.vmul(b.linearFactor,b.vlambda),L.vadd(b.vlambda,L),b.wlambda.vmul(b.angularFactor,b.wlambda),w.vadd(b.wlambda,w)}let _=o.length;const M=1/h;for(;_--;)o[_].multiplier=y[_]*M}return n}}const $y=[],t_=[],e_=[];class n_{constructor(){this.objects=[],this.type=Object}release(){const t=arguments.length;for(let e=0;e!==t;e++)this.objects.push(e<0||arguments.length<=e?void 0:arguments[e]);return this}get(){return this.objects.length===0?this.constructObject():this.objects.pop()}constructObject(){throw new Error("constructObject() not implemented in this Pool subclass yet!")}resize(t){const e=this.objects;for(;e.length>t;)e.pop();for(;e.length<t;)e.push(this.constructObject());return this}}class i_ extends n_{constructor(){super(...arguments),this.type=E}constructObject(){return new E}}const ue={sphereSphere:Tt.types.SPHERE,spherePlane:Tt.types.SPHERE|Tt.types.PLANE,boxBox:Tt.types.BOX|Tt.types.BOX,sphereBox:Tt.types.SPHERE|Tt.types.BOX,planeBox:Tt.types.PLANE|Tt.types.BOX,convexConvex:Tt.types.CONVEXPOLYHEDRON,sphereConvex:Tt.types.SPHERE|Tt.types.CONVEXPOLYHEDRON,planeConvex:Tt.types.PLANE|Tt.types.CONVEXPOLYHEDRON,boxConvex:Tt.types.BOX|Tt.types.CONVEXPOLYHEDRON,sphereHeightfield:Tt.types.SPHERE|Tt.types.HEIGHTFIELD,boxHeightfield:Tt.types.BOX|Tt.types.HEIGHTFIELD,convexHeightfield:Tt.types.CONVEXPOLYHEDRON|Tt.types.HEIGHTFIELD,sphereParticle:Tt.types.PARTICLE|Tt.types.SPHERE,planeParticle:Tt.types.PLANE|Tt.types.PARTICLE,boxParticle:Tt.types.BOX|Tt.types.PARTICLE,convexParticle:Tt.types.PARTICLE|Tt.types.CONVEXPOLYHEDRON,cylinderCylinder:Tt.types.CYLINDER,sphereCylinder:Tt.types.SPHERE|Tt.types.CYLINDER,planeCylinder:Tt.types.PLANE|Tt.types.CYLINDER,boxCylinder:Tt.types.BOX|Tt.types.CYLINDER,convexCylinder:Tt.types.CONVEXPOLYHEDRON|Tt.types.CYLINDER,heightfieldCylinder:Tt.types.HEIGHTFIELD|Tt.types.CYLINDER,particleCylinder:Tt.types.PARTICLE|Tt.types.CYLINDER,sphereTrimesh:Tt.types.SPHERE|Tt.types.TRIMESH,planeTrimesh:Tt.types.PLANE|Tt.types.TRIMESH};class s_{get[ue.sphereSphere](){return this.sphereSphere}get[ue.spherePlane](){return this.spherePlane}get[ue.boxBox](){return this.boxBox}get[ue.sphereBox](){return this.sphereBox}get[ue.planeBox](){return this.planeBox}get[ue.convexConvex](){return this.convexConvex}get[ue.sphereConvex](){return this.sphereConvex}get[ue.planeConvex](){return this.planeConvex}get[ue.boxConvex](){return this.boxConvex}get[ue.sphereHeightfield](){return this.sphereHeightfield}get[ue.boxHeightfield](){return this.boxHeightfield}get[ue.convexHeightfield](){return this.convexHeightfield}get[ue.sphereParticle](){return this.sphereParticle}get[ue.planeParticle](){return this.planeParticle}get[ue.boxParticle](){return this.boxParticle}get[ue.convexParticle](){return this.convexParticle}get[ue.cylinderCylinder](){return this.convexConvex}get[ue.sphereCylinder](){return this.sphereConvex}get[ue.planeCylinder](){return this.planeConvex}get[ue.boxCylinder](){return this.boxConvex}get[ue.convexCylinder](){return this.convexConvex}get[ue.heightfieldCylinder](){return this.heightfieldCylinder}get[ue.particleCylinder](){return this.particleCylinder}get[ue.sphereTrimesh](){return this.sphereTrimesh}get[ue.planeTrimesh](){return this.planeTrimesh}constructor(t){this.contactPointPool=[],this.frictionEquationPool=[],this.result=[],this.frictionResult=[],this.v3pool=new i_,this.world=t,this.currentContactMaterial=t.defaultContactMaterial,this.enableFrictionReduction=!1}createContactEquation(t,e,n,i,r,o){let a;this.contactPointPool.length?(a=this.contactPointPool.pop(),a.bi=t,a.bj=e):a=new gy(t,e),a.enabled=t.collisionResponse&&e.collisionResponse&&n.collisionResponse&&i.collisionResponse;const c=this.currentContactMaterial;a.restitution=c.restitution,a.setSpookParams(c.contactEquationStiffness,c.contactEquationRelaxation,this.world.dt);const l=n.material||t.material,h=i.material||e.material;return l&&h&&l.restitution>=0&&h.restitution>=0&&(a.restitution=l.restitution*h.restitution),a.si=r||n,a.sj=o||i,a}createFrictionEquationsFromContact(t,e){const n=t.bi,i=t.bj,r=t.si,o=t.sj,a=this.world,c=this.currentContactMaterial;let l=c.friction;const h=r.material||n.material,d=o.material||i.material;if(h&&d&&h.friction>=0&&d.friction>=0&&(l=h.friction*d.friction),l>0){const u=l*(a.frictionGravity||a.gravity).length();let f=n.invMass+i.invMass;f>0&&(f=1/f);const g=this.frictionEquationPool,v=g.length?g.pop():new hh(n,i,u*f),m=g.length?g.pop():new hh(n,i,u*f);return v.bi=m.bi=n,v.bj=m.bj=i,v.minForce=m.minForce=-u*f,v.maxForce=m.maxForce=u*f,v.ri.copy(t.ri),v.rj.copy(t.rj),m.ri.copy(t.ri),m.rj.copy(t.rj),t.ni.tangents(v.t,m.t),v.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),m.setSpookParams(c.frictionEquationStiffness,c.frictionEquationRelaxation,a.dt),v.enabled=m.enabled=t.enabled,e.push(v,m),!0}return!1}createFrictionFromAverage(t){let e=this.result[this.result.length-1];if(!this.createFrictionEquationsFromContact(e,this.frictionResult)||t===1)return;const n=this.frictionResult[this.frictionResult.length-2],i=this.frictionResult[this.frictionResult.length-1];li.setZero(),qi.setZero(),Yi.setZero();const r=e.bi;e.bj;for(let a=0;a!==t;a++)e=this.result[this.result.length-1-a],e.bi!==r?(li.vadd(e.ni,li),qi.vadd(e.ri,qi),Yi.vadd(e.rj,Yi)):(li.vsub(e.ni,li),qi.vadd(e.rj,qi),Yi.vadd(e.ri,Yi));const o=1/t;qi.scale(o,n.ri),Yi.scale(o,n.rj),i.ri.copy(n.ri),i.rj.copy(n.rj),li.normalize(),li.tangents(n.t,i.t)}getContacts(t,e,n,i,r,o,a){this.contactPointPool=r,this.frictionEquationPool=a,this.result=i,this.frictionResult=o;const c=a_,l=c_,h=r_,d=o_;for(let u=0,f=t.length;u!==f;u++){const g=t[u],v=e[u];let m=null;g.material&&v.material&&(m=n.getContactMaterial(g.material,v.material)||null);const p=g.type&bt.KINEMATIC&&v.type&bt.STATIC||g.type&bt.STATIC&&v.type&bt.KINEMATIC||g.type&bt.KINEMATIC&&v.type&bt.KINEMATIC;for(let x=0;x<g.shapes.length;x++){g.quaternion.mult(g.shapeOrientations[x],c),g.quaternion.vmult(g.shapeOffsets[x],h),h.vadd(g.position,h);const y=g.shapes[x];for(let _=0;_<v.shapes.length;_++){v.quaternion.mult(v.shapeOrientations[_],l),v.quaternion.vmult(v.shapeOffsets[_],d),d.vadd(v.position,d);const M=v.shapes[_];if(!(y.collisionFilterMask&M.collisionFilterGroup&&M.collisionFilterMask&y.collisionFilterGroup)||h.distanceTo(d)>y.boundingSphereRadius+M.boundingSphereRadius)continue;let S=null;y.material&&M.material&&(S=n.getContactMaterial(y.material,M.material)||null),this.currentContactMaterial=S||m||n.defaultContactMaterial;const b=y.type|M.type,L=this[b];if(L){let w=!1;y.type<M.type?w=L.call(this,y,M,h,d,c,l,g,v,y,M,p):w=L.call(this,M,y,d,h,l,c,v,g,y,M,p),w&&p&&(n.shapeOverlapKeeper.set(y.id,M.id),n.bodyOverlapKeeper.set(g.id,v.id))}}}}}sphereSphere(t,e,n,i,r,o,a,c,l,h,d){if(d)return n.distanceSquared(i)<(t.radius+e.radius)**2;const u=this.createContactEquation(a,c,t,e,l,h);i.vsub(n,u.ni),u.ni.normalize(),u.ri.copy(u.ni),u.rj.copy(u.ni),u.ri.scale(t.radius,u.ri),u.rj.scale(-e.radius,u.rj),u.ri.vadd(n,u.ri),u.ri.vsub(a.position,u.ri),u.rj.vadd(i,u.rj),u.rj.vsub(c.position,u.rj),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}spherePlane(t,e,n,i,r,o,a,c,l,h,d){const u=this.createContactEquation(a,c,t,e,l,h);if(u.ni.set(0,0,1),o.vmult(u.ni,u.ni),u.ni.negate(u.ni),u.ni.normalize(),u.ni.scale(t.radius,u.ri),n.vsub(i,Dr),u.ni.scale(u.ni.dot(Dr),ph),Dr.vsub(ph,u.rj),-Dr.dot(u.ni)<=t.radius){if(d)return!0;const f=u.ri,g=u.rj;f.vadd(n,f),f.vsub(a.position,f),g.vadd(i,g),g.vsub(c.position,g),this.result.push(u),this.createFrictionEquationsFromContact(u,this.frictionResult)}}boxBox(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,e.convexPolyhedronRepresentation.material=e.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e.convexPolyhedronRepresentation,n,i,r,o,a,c,t,e,d)}sphereBox(t,e,n,i,r,o,a,c,l,h,d){const u=this.v3pool,f=N_;n.vsub(i,Nr),e.getSideNormals(f,o);const g=t.radius;let v=!1;const m=F_,p=O_,x=z_;let y=null,_=0,M=0,S=0,b=null;for(let U=0,Y=f.length;U!==Y&&v===!1;U++){const G=L_;G.copy(f[U]);const k=G.length();G.normalize();const Q=Nr.dot(G);if(Q<k+g&&Q>0){const V=I_,X=D_;V.copy(f[(U+1)%3]),X.copy(f[(U+2)%3]);const q=V.length(),et=X.length();V.normalize(),X.normalize();const ut=Nr.dot(V),pt=Nr.dot(X);if(ut<q&&ut>-q&&pt<et&&pt>-et){const it=Math.abs(Q-k-g);if((b===null||it<b)&&(b=it,M=ut,S=pt,y=k,m.copy(G),p.copy(V),x.copy(X),_++,d))return!0}}}if(_){v=!0;const U=this.createContactEquation(a,c,t,e,l,h);m.scale(-g,U.ri),U.ni.copy(m),U.ni.negate(U.ni),m.scale(y,m),p.scale(M,p),m.vadd(p,m),x.scale(S,x),m.vadd(x,U.rj),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),U.rj.vadd(i,U.rj),U.rj.vsub(c.position,U.rj),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}let L=u.get();const w=U_;for(let U=0;U!==2&&!v;U++)for(let Y=0;Y!==2&&!v;Y++)for(let G=0;G!==2&&!v;G++)if(L.set(0,0,0),U?L.vadd(f[0],L):L.vsub(f[0],L),Y?L.vadd(f[1],L):L.vsub(f[1],L),G?L.vadd(f[2],L):L.vsub(f[2],L),i.vadd(L,w),w.vsub(n,w),w.lengthSquared()<g*g){if(d)return!0;v=!0;const k=this.createContactEquation(a,c,t,e,l,h);k.ri.copy(w),k.ri.normalize(),k.ni.copy(k.ri),k.ri.scale(g,k.ri),k.rj.copy(L),k.ri.vadd(n,k.ri),k.ri.vsub(a.position,k.ri),k.rj.vadd(i,k.rj),k.rj.vsub(c.position,k.rj),this.result.push(k),this.createFrictionEquationsFromContact(k,this.frictionResult)}u.release(L),L=null;const T=u.get(),O=u.get(),D=u.get(),z=u.get(),C=u.get(),I=f.length;for(let U=0;U!==I&&!v;U++)for(let Y=0;Y!==I&&!v;Y++)if(U%3!==Y%3){f[Y].cross(f[U],T),T.normalize(),f[U].vadd(f[Y],O),D.copy(n),D.vsub(O,D),D.vsub(i,D);const G=D.dot(T);T.scale(G,z);let k=0;for(;k===U%3||k===Y%3;)k++;C.copy(n),C.vsub(z,C),C.vsub(O,C),C.vsub(i,C);const Q=Math.abs(G),V=C.length();if(Q<f[k].length()&&V<g){if(d)return!0;v=!0;const X=this.createContactEquation(a,c,t,e,l,h);O.vadd(z,X.rj),X.rj.copy(X.rj),C.negate(X.ni),X.ni.normalize(),X.ri.copy(X.rj),X.ri.vadd(i,X.ri),X.ri.vsub(n,X.ri),X.ri.normalize(),X.ri.scale(g,X.ri),X.ri.vadd(n,X.ri),X.ri.vsub(a.position,X.ri),X.rj.vadd(i,X.rj),X.rj.vsub(c.position,X.rj),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult)}}u.release(T,O,D,z,C)}planeBox(t,e,n,i,r,o,a,c,l,h,d){return e.convexPolyhedronRepresentation.material=e.material,e.convexPolyhedronRepresentation.collisionResponse=e.collisionResponse,e.convexPolyhedronRepresentation.id=e.id,this.planeConvex(t,e.convexPolyhedronRepresentation,n,i,r,o,a,c,t,e,d)}convexConvex(t,e,n,i,r,o,a,c,l,h,d,u,f){const g=$_;if(!(n.distanceTo(i)>t.boundingSphereRadius+e.boundingSphereRadius)&&t.findSeparatingAxis(e,n,r,i,o,g,u,f)){const v=[],m=tM;t.clipAgainstHull(n,r,e,i,o,g,-100,100,v);let p=0;for(let x=0;x!==v.length;x++){if(d)return!0;const y=this.createContactEquation(a,c,t,e,l,h),_=y.ri,M=y.rj;g.negate(y.ni),v[x].normal.negate(m),m.scale(v[x].depth,m),v[x].point.vadd(m,_),M.copy(v[x].point),_.vsub(n,_),M.vsub(i,M),_.vadd(n,_),_.vsub(a.position,_),M.vadd(i,M),M.vsub(c.position,M),this.result.push(y),p++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(y,this.frictionResult)}this.enableFrictionReduction&&p&&this.createFrictionFromAverage(p)}}sphereConvex(t,e,n,i,r,o,a,c,l,h,d){const u=this.v3pool;n.vsub(i,B_);const f=e.faceNormals,g=e.faces,v=e.vertices,m=t.radius;let p=!1;for(let x=0;x!==v.length;x++){const y=v[x],_=k_;o.vmult(y,_),i.vadd(_,_);const M=W_;if(_.vsub(n,M),M.lengthSquared()<m*m){if(d)return!0;p=!0;const S=this.createContactEquation(a,c,t,e,l,h);S.ri.copy(M),S.ri.normalize(),S.ni.copy(S.ri),S.ri.scale(m,S.ri),_.vsub(i,S.rj),S.ri.vadd(n,S.ri),S.ri.vsub(a.position,S.ri),S.rj.vadd(i,S.rj),S.rj.vsub(c.position,S.rj),this.result.push(S),this.createFrictionEquationsFromContact(S,this.frictionResult);return}}for(let x=0,y=g.length;x!==y&&p===!1;x++){const _=f[x],M=g[x],S=V_;o.vmult(_,S);const b=X_;o.vmult(v[M[0]],b),b.vadd(i,b);const L=q_;S.scale(-m,L),n.vadd(L,L);const w=Y_;L.vsub(b,w);const T=w.dot(S),O=j_;if(n.vsub(b,O),T<0&&O.dot(S)>0){const D=[];for(let z=0,C=M.length;z!==C;z++){const I=u.get();o.vmult(v[M[z]],I),i.vadd(I,I),D.push(I)}if(P_(D,S,n)){if(d)return!0;p=!0;const z=this.createContactEquation(a,c,t,e,l,h);S.scale(-m,z.ri),S.negate(z.ni);const C=u.get();S.scale(-T,C);const I=u.get();S.scale(-m,I),n.vsub(i,z.rj),z.rj.vadd(I,z.rj),z.rj.vadd(C,z.rj),z.rj.vadd(i,z.rj),z.rj.vsub(c.position,z.rj),z.ri.vadd(n,z.ri),z.ri.vsub(a.position,z.ri),u.release(C),u.release(I),this.result.push(z),this.createFrictionEquationsFromContact(z,this.frictionResult);for(let U=0,Y=D.length;U!==Y;U++)u.release(D[U]);return}else for(let z=0;z!==M.length;z++){const C=u.get(),I=u.get();o.vmult(v[M[(z+1)%M.length]],C),o.vmult(v[M[(z+2)%M.length]],I),i.vadd(C,C),i.vadd(I,I);const U=G_;I.vsub(C,U);const Y=H_;U.unit(Y);const G=u.get(),k=u.get();n.vsub(C,k);const Q=k.dot(Y);Y.scale(Q,G),G.vadd(C,G);const V=u.get();if(G.vsub(n,V),Q>0&&Q*Q<U.lengthSquared()&&V.lengthSquared()<m*m){if(d)return!0;const X=this.createContactEquation(a,c,t,e,l,h);G.vsub(i,X.rj),G.vsub(n,X.ni),X.ni.normalize(),X.ni.scale(m,X.ri),X.rj.vadd(i,X.rj),X.rj.vsub(c.position,X.rj),X.ri.vadd(n,X.ri),X.ri.vsub(a.position,X.ri),this.result.push(X),this.createFrictionEquationsFromContact(X,this.frictionResult);for(let q=0,et=D.length;q!==et;q++)u.release(D[q]);u.release(C),u.release(I),u.release(G),u.release(V),u.release(k);return}u.release(C),u.release(I),u.release(G),u.release(V),u.release(k)}for(let z=0,C=D.length;z!==C;z++)u.release(D[z])}}}planeConvex(t,e,n,i,r,o,a,c,l,h,d){const u=K_,f=Z_;f.set(0,0,1),r.vmult(f,f);let g=0;const v=J_;for(let m=0;m!==e.vertices.length;m++)if(u.copy(e.vertices[m]),o.vmult(u,u),i.vadd(u,u),u.vsub(n,v),f.dot(v)<=0){if(d)return!0;const x=this.createContactEquation(a,c,t,e,l,h),y=Q_;f.scale(f.dot(v),y),u.vsub(y,y),y.vsub(n,x.ri),x.ni.copy(f),u.vsub(i,x.rj),x.ri.vadd(n,x.ri),x.ri.vsub(a.position,x.ri),x.rj.vadd(i,x.rj),x.rj.vsub(c.position,x.rj),this.result.push(x),g++,this.enableFrictionReduction||this.createFrictionEquationsFromContact(x,this.frictionResult)}this.enableFrictionReduction&&g&&this.createFrictionFromAverage(g)}boxConvex(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexConvex(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,d)}sphereHeightfield(t,e,n,i,r,o,a,c,l,h,d){const u=e.data,f=t.radius,g=e.elementSize,v=dM,m=uM;Qt.pointToLocalFrame(i,o,n,m);let p=Math.floor((m.x-f)/g)-1,x=Math.ceil((m.x+f)/g)+1,y=Math.floor((m.y-f)/g)-1,_=Math.ceil((m.y+f)/g)+1;if(x<0||_<0||p>u.length||y>u[0].length)return;p<0&&(p=0),x<0&&(x=0),y<0&&(y=0),_<0&&(_=0),p>=u.length&&(p=u.length-1),x>=u.length&&(x=u.length-1),_>=u[0].length&&(_=u[0].length-1),y>=u[0].length&&(y=u[0].length-1);const M=[];e.getRectMinMax(p,y,x,_,M);const S=M[0],b=M[1];if(m.z-f>b||m.z+f<S)return;const L=this.result;for(let w=p;w<x;w++)for(let T=y;T<_;T++){const O=L.length;let D=!1;if(e.getConvexTrianglePillar(w,T,!1),Qt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(D=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,c,t,e,d)),d&&D||(e.getConvexTrianglePillar(w,T,!0),Qt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(D=this.sphereConvex(t,e.pillarConvex,n,v,r,o,a,c,t,e,d)),d&&D))return!0;if(L.length-O>2)return}}boxHeightfield(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexHeightfield(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,d)}convexHeightfield(t,e,n,i,r,o,a,c,l,h,d){const u=e.data,f=e.elementSize,g=t.boundingSphereRadius,v=lM,m=hM,p=cM;Qt.pointToLocalFrame(i,o,n,p);let x=Math.floor((p.x-g)/f)-1,y=Math.ceil((p.x+g)/f)+1,_=Math.floor((p.y-g)/f)-1,M=Math.ceil((p.y+g)/f)+1;if(y<0||M<0||x>u.length||_>u[0].length)return;x<0&&(x=0),y<0&&(y=0),_<0&&(_=0),M<0&&(M=0),x>=u.length&&(x=u.length-1),y>=u.length&&(y=u.length-1),M>=u[0].length&&(M=u[0].length-1),_>=u[0].length&&(_=u[0].length-1);const S=[];e.getRectMinMax(x,_,y,M,S);const b=S[0],L=S[1];if(!(p.z-g>L||p.z+g<b))for(let w=x;w<y;w++)for(let T=_;T<M;T++){let O=!1;if(e.getConvexTrianglePillar(w,T,!1),Qt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(O=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,c,null,null,d,m,null)),d&&O||(e.getConvexTrianglePillar(w,T,!0),Qt.pointToWorldFrame(i,o,e.pillarOffset,v),n.distanceTo(v)<e.pillarConvex.boundingSphereRadius+t.boundingSphereRadius&&(O=this.convexConvex(t,e.pillarConvex,n,v,r,o,a,c,null,null,d,m,null)),d&&O))return!0}}sphereParticle(t,e,n,i,r,o,a,c,l,h,d){const u=sM;if(u.set(0,0,1),i.vsub(n,u),u.lengthSquared()<=t.radius*t.radius){if(d)return!0;const g=this.createContactEquation(c,a,e,t,l,h);u.normalize(),g.rj.copy(u),g.rj.scale(t.radius,g.rj),g.ni.copy(u),g.ni.negate(g.ni),g.ri.set(0,0,0),this.result.push(g),this.createFrictionEquationsFromContact(g,this.frictionResult)}}planeParticle(t,e,n,i,r,o,a,c,l,h,d){const u=eM;u.set(0,0,1),a.quaternion.vmult(u,u);const f=nM;if(i.vsub(a.position,f),u.dot(f)<=0){if(d)return!0;const v=this.createContactEquation(c,a,e,t,l,h);v.ni.copy(u),v.ni.negate(v.ni),v.ri.set(0,0,0);const m=iM;u.scale(u.dot(i),m),i.vsub(m,m),v.rj.copy(m),this.result.push(v),this.createFrictionEquationsFromContact(v,this.frictionResult)}}boxParticle(t,e,n,i,r,o,a,c,l,h,d){return t.convexPolyhedronRepresentation.material=t.material,t.convexPolyhedronRepresentation.collisionResponse=t.collisionResponse,this.convexParticle(t.convexPolyhedronRepresentation,e,n,i,r,o,a,c,t,e,d)}convexParticle(t,e,n,i,r,o,a,c,l,h,d){let u=-1;const f=oM,g=aM;let v=null;const m=rM;if(m.copy(i),m.vsub(n,m),r.conjugate(mh),mh.vmult(m,m),t.pointIsInside(m)){t.worldVerticesNeedsUpdate&&t.computeWorldVertices(n,r),t.worldFaceNormalsNeedsUpdate&&t.computeWorldFaceNormals(r);for(let p=0,x=t.faces.length;p!==x;p++){const y=[t.worldVertices[t.faces[p][0]]],_=t.worldFaceNormals[p];i.vsub(y[0],gh);const M=-_.dot(gh);if(v===null||Math.abs(M)<Math.abs(v)){if(d)return!0;v=M,u=p,f.copy(_)}}if(u!==-1){const p=this.createContactEquation(c,a,e,t,l,h);f.scale(v,g),g.vadd(i,g),g.vsub(n,g),p.rj.copy(g),f.negate(p.ni),p.ri.set(0,0,0);const x=p.ri,y=p.rj;x.vadd(i,x),x.vsub(c.position,x),y.vadd(n,y),y.vsub(a.position,y),this.result.push(p),this.createFrictionEquationsFromContact(p,this.frictionResult)}else console.warn("Point found inside convex, but did not find penetrating face!")}}heightfieldCylinder(t,e,n,i,r,o,a,c,l,h,d){return this.convexHeightfield(e,t,i,n,o,r,c,a,l,h,d)}particleCylinder(t,e,n,i,r,o,a,c,l,h,d){return this.convexParticle(e,t,i,n,o,r,c,a,l,h,d)}sphereTrimesh(t,e,n,i,r,o,a,c,l,h,d){const u=g_,f=v_,g=x_,v=y_,m=__,p=M_,x=b_,y=m_,_=f_,M=T_;Qt.pointToLocalFrame(i,o,n,m);const S=t.radius;x.lowerBound.set(m.x-S,m.y-S,m.z-S),x.upperBound.set(m.x+S,m.y+S,m.z+S),e.getTrianglesInAABB(x,M);const b=p_,L=t.radius*t.radius;for(let z=0;z<M.length;z++)for(let C=0;C<3;C++)if(e.getVertex(e.indices[M[z]*3+C],b),b.vsub(m,_),_.lengthSquared()<=L){if(y.copy(b),Qt.pointToWorldFrame(i,o,y,b),b.vsub(n,_),d)return!0;let I=this.createContactEquation(a,c,t,e,l,h);I.ni.copy(_),I.ni.normalize(),I.ri.copy(I.ni),I.ri.scale(t.radius,I.ri),I.ri.vadd(n,I.ri),I.ri.vsub(a.position,I.ri),I.rj.copy(b),I.rj.vsub(c.position,I.rj),this.result.push(I),this.createFrictionEquationsFromContact(I,this.frictionResult)}for(let z=0;z<M.length;z++)for(let C=0;C<3;C++){e.getVertex(e.indices[M[z]*3+C],u),e.getVertex(e.indices[M[z]*3+(C+1)%3],f),f.vsub(u,g),m.vsub(f,p);const I=p.dot(g);m.vsub(u,p);let U=p.dot(g);if(U>0&&I<0&&(m.vsub(u,p),v.copy(g),v.normalize(),U=p.dot(v),v.scale(U,p),p.vadd(u,p),p.distanceTo(m)<t.radius)){if(d)return!0;const G=this.createContactEquation(a,c,t,e,l,h);p.vsub(m,G.ni),G.ni.normalize(),G.ni.scale(t.radius,G.ri),G.ri.vadd(n,G.ri),G.ri.vsub(a.position,G.ri),Qt.pointToWorldFrame(i,o,p,p),p.vsub(c.position,G.rj),Qt.vectorToWorldFrame(o,G.ni,G.ni),Qt.vectorToWorldFrame(o,G.ri,G.ri),this.result.push(G),this.createFrictionEquationsFromContact(G,this.frictionResult)}}const w=S_,T=w_,O=E_,D=d_;for(let z=0,C=M.length;z!==C;z++){e.getTriangleVertices(M[z],w,T,O),e.getNormal(M[z],D),m.vsub(w,p);let I=p.dot(D);if(D.scale(I,p),m.vsub(p,p),I=p.distanceTo(m),Me.pointInTriangle(p,w,T,O)&&I<t.radius){if(d)return!0;let U=this.createContactEquation(a,c,t,e,l,h);p.vsub(m,U.ni),U.ni.normalize(),U.ni.scale(t.radius,U.ri),U.ri.vadd(n,U.ri),U.ri.vsub(a.position,U.ri),Qt.pointToWorldFrame(i,o,p,p),p.vsub(c.position,U.rj),Qt.vectorToWorldFrame(o,U.ni,U.ni),Qt.vectorToWorldFrame(o,U.ri,U.ri),this.result.push(U),this.createFrictionEquationsFromContact(U,this.frictionResult)}}M.length=0}planeTrimesh(t,e,n,i,r,o,a,c,l,h,d){const u=new E,f=l_;f.set(0,0,1),r.vmult(f,f);for(let g=0;g<e.vertices.length/3;g++){e.getVertex(g,u);const v=new E;v.copy(u),Qt.pointToWorldFrame(i,o,v,u);const m=h_;if(u.vsub(n,m),f.dot(m)<=0){if(d)return!0;const x=this.createContactEquation(a,c,t,e,l,h);x.ni.copy(f);const y=u_;f.scale(m.dot(f),y),u.vsub(y,y),x.ri.copy(y),x.ri.vsub(a.position,x.ri),x.rj.copy(u),x.rj.vsub(c.position,x.rj),this.result.push(x),this.createFrictionEquationsFromContact(x,this.frictionResult)}}}}const li=new E,qi=new E,Yi=new E,r_=new E,o_=new E,a_=new fe,c_=new fe,l_=new E,h_=new E,u_=new E,d_=new E,f_=new E;new E;const p_=new E,m_=new E,g_=new E,v_=new E,x_=new E,y_=new E,__=new E,M_=new E,S_=new E,w_=new E,E_=new E,b_=new tn,T_=[],Dr=new E,ph=new E,A_=new E,C_=new E,R_=new E;function P_(s,t,e){let n=null;const i=s.length;for(let r=0;r!==i;r++){const o=s[r],a=A_;s[(r+1)%i].vsub(o,a);const c=C_;a.cross(t,c);const l=R_;e.vsub(o,l);const h=c.dot(l);if(n===null||h>0&&n===!0||h<=0&&n===!1){n===null&&(n=h>0);continue}else return!1}return!0}const Nr=new E,L_=new E,I_=new E,D_=new E,N_=[new E,new E,new E,new E,new E,new E],U_=new E,F_=new E,O_=new E,z_=new E,B_=new E,G_=new E,H_=new E,W_=new E,k_=new E,V_=new E,X_=new E,q_=new E,Y_=new E,j_=new E;new E;new E;const K_=new E,Z_=new E,J_=new E,Q_=new E,$_=new E,tM=new E,eM=new E,nM=new E,iM=new E,sM=new E,mh=new fe,rM=new E;new E;const oM=new E,gh=new E,aM=new E,cM=new E,lM=new E,hM=[0],uM=new E,dM=new E;class vh{constructor(){this.current=[],this.previous=[]}getKey(t,e){if(e<t){const n=e;e=t,t=n}return t<<16|e}set(t,e){const n=this.getKey(t,e),i=this.current;let r=0;for(;n>i[r];)r++;if(n!==i[r]){for(let o=i.length-1;o>=r;o--)i[o+1]=i[o];i[r]=n}}tick(){const t=this.current;this.current=this.previous,this.previous=t,this.current.length=0}getDiff(t,e){const n=this.current,i=this.previous,r=n.length,o=i.length;let a=0;for(let c=0;c<r;c++){let l=!1;const h=n[c];for(;h>i[a];)a++;l=h===i[a],l||xh(t,h)}a=0;for(let c=0;c<o;c++){let l=!1;const h=i[c];for(;h>n[a];)a++;l=n[a]===h,l||xh(e,h)}}}function xh(s,t){s.push((t&4294901760)>>16,t&65535)}const pa=(s,t)=>s<t?`${s}-${t}`:`${t}-${s}`;class fM{constructor(){this.data={keys:[]}}get(t,e){const n=pa(t,e);return this.data[n]}set(t,e,n){const i=pa(t,e);this.get(t,e)||this.data.keys.push(i),this.data[i]=n}delete(t,e){const n=pa(t,e),i=this.data.keys.indexOf(n);i!==-1&&this.data.keys.splice(i,1),delete this.data[n]}reset(){const t=this.data,e=t.keys;for(;e.length>0;){const n=e.pop();delete t[n]}}}class pM extends Tu{constructor(t){t===void 0&&(t={}),super(),this.dt=-1,this.allowSleep=!!t.allowSleep,this.contacts=[],this.frictionEquations=[],this.quatNormalizeSkip=t.quatNormalizeSkip!==void 0?t.quatNormalizeSkip:0,this.quatNormalizeFast=t.quatNormalizeFast!==void 0?t.quatNormalizeFast:!1,this.time=0,this.stepnumber=0,this.default_dt=1/60,this.nextId=0,this.gravity=new E,t.gravity&&this.gravity.copy(t.gravity),t.frictionGravity&&(this.frictionGravity=new E,this.frictionGravity.copy(t.frictionGravity)),this.broadphase=t.broadphase!==void 0?t.broadphase:new Au,this.bodies=[],this.hasActiveBodies=!1,this.solver=t.solver!==void 0?t.solver:new Qy,this.constraints=[],this.narrowphase=new s_(this),this.collisionMatrix=new th,this.collisionMatrixPrevious=new th,this.bodyOverlapKeeper=new vh,this.shapeOverlapKeeper=new vh,this.contactmaterials=[],this.contactMaterialTable=new fM,this.defaultMaterial=new Qn("default"),this.defaultContactMaterial=new _i(this.defaultMaterial,this.defaultMaterial,{friction:.3,restitution:0}),this.doProfiling=!1,this.profile={solve:0,makeContactConstraints:0,broadphase:0,integrate:0,narrowphase:0},this.accumulator=0,this.subsystems=[],this.addBodyEvent={type:"addBody",body:null},this.removeBodyEvent={type:"removeBody",body:null},this.idToBodyMap={},this.broadphase.setWorld(this)}getContactMaterial(t,e){return this.contactMaterialTable.get(t.id,e.id)}collisionMatrixTick(){const t=this.collisionMatrixPrevious;this.collisionMatrixPrevious=this.collisionMatrix,this.collisionMatrix=t,this.collisionMatrix.reset(),this.bodyOverlapKeeper.tick(),this.shapeOverlapKeeper.tick()}addConstraint(t){this.constraints.push(t)}removeConstraint(t){const e=this.constraints.indexOf(t);e!==-1&&this.constraints.splice(e,1)}rayTest(t,e,n){n instanceof Xs?this.raycastClosest(t,e,{skipBackfaces:!0},n):this.raycastAll(t,e,{skipBackfaces:!0},n)}raycastAll(t,e,n,i){return n===void 0&&(n={}),n.mode=Me.ALL,n.from=t,n.to=e,n.callback=i,ma.intersectWorld(this,n)}raycastAny(t,e,n,i){return n===void 0&&(n={}),n.mode=Me.ANY,n.from=t,n.to=e,n.result=i,ma.intersectWorld(this,n)}raycastClosest(t,e,n,i){return n===void 0&&(n={}),n.mode=Me.CLOSEST,n.from=t,n.to=e,n.result=i,ma.intersectWorld(this,n)}addBody(t){this.bodies.includes(t)||(t.index=this.bodies.length,this.bodies.push(t),t.world=this,t.initPosition.copy(t.position),t.initVelocity.copy(t.velocity),t.timeLastSleepy=this.time,t instanceof bt&&(t.initAngularVelocity.copy(t.angularVelocity),t.initQuaternion.copy(t.quaternion)),this.collisionMatrix.setNumObjects(this.bodies.length),this.addBodyEvent.body=t,this.idToBodyMap[t.id]=t,this.dispatchEvent(this.addBodyEvent))}removeBody(t){t.world=null;const e=this.bodies.length-1,n=this.bodies,i=n.indexOf(t);if(i!==-1){n.splice(i,1);for(let r=0;r!==n.length;r++)n[r].index=r;this.collisionMatrix.setNumObjects(e),this.removeBodyEvent.body=t,delete this.idToBodyMap[t.id],this.dispatchEvent(this.removeBodyEvent)}}getBodyById(t){return this.idToBodyMap[t]}getShapeById(t){const e=this.bodies;for(let n=0;n<e.length;n++){const i=e[n].shapes;for(let r=0;r<i.length;r++){const o=i[r];if(o.id===t)return o}}return null}addContactMaterial(t){this.contactmaterials.push(t),this.contactMaterialTable.set(t.materials[0].id,t.materials[1].id,t)}removeContactMaterial(t){const e=this.contactmaterials.indexOf(t);e!==-1&&(this.contactmaterials.splice(e,1),this.contactMaterialTable.delete(t.materials[0].id,t.materials[1].id))}fixedStep(t,e){t===void 0&&(t=1/60),e===void 0&&(e=10);const n=Se.now()/1e3;if(!this.lastCallTime)this.step(t,void 0,e);else{const i=n-this.lastCallTime;this.step(t,i,e)}this.lastCallTime=n}step(t,e,n){if(n===void 0&&(n=10),e===void 0)this.internalStep(t),this.time+=t;else{this.accumulator+=e;const i=Se.now();let r=0;for(;this.accumulator>=t&&r<n&&(this.internalStep(t),this.accumulator-=t,r++,!(Se.now()-i>t*1e3)););this.accumulator=this.accumulator%t;const o=this.accumulator/t;for(let a=0;a!==this.bodies.length;a++){const c=this.bodies[a];c.previousPosition.lerp(c.position,o,c.interpolatedPosition),c.previousQuaternion.slerp(c.quaternion,o,c.interpolatedQuaternion),c.previousQuaternion.normalize()}this.time+=e}}internalStep(t){this.dt=t;const e=this.contacts,n=yM,i=_M,r=this.bodies.length,o=this.bodies,a=this.solver,c=this.gravity,l=this.doProfiling,h=this.profile,d=bt.DYNAMIC;let u=-1/0;const f=this.constraints,g=xM;c.length();const v=c.x,m=c.y,p=c.z;let x=0;for(l&&(u=Se.now()),x=0;x!==r;x++){const z=o[x];if(z.type===d){const C=z.force,I=z.mass;C.x+=I*v,C.y+=I*m,C.z+=I*p}}for(let z=0,C=this.subsystems.length;z!==C;z++)this.subsystems[z].update();l&&(u=Se.now()),n.length=0,i.length=0,this.broadphase.collisionPairs(this,n,i),l&&(h.broadphase=Se.now()-u);let y=f.length;for(x=0;x!==y;x++){const z=f[x];if(!z.collideConnected)for(let C=n.length-1;C>=0;C-=1)(z.bodyA===n[C]&&z.bodyB===i[C]||z.bodyB===n[C]&&z.bodyA===i[C])&&(n.splice(C,1),i.splice(C,1))}this.collisionMatrixTick(),l&&(u=Se.now());const _=vM,M=e.length;for(x=0;x!==M;x++)_.push(e[x]);e.length=0;const S=this.frictionEquations.length;for(x=0;x!==S;x++)g.push(this.frictionEquations[x]);for(this.frictionEquations.length=0,this.narrowphase.getContacts(n,i,this,e,_,this.frictionEquations,g),l&&(h.narrowphase=Se.now()-u),l&&(u=Se.now()),x=0;x<this.frictionEquations.length;x++)a.addEquation(this.frictionEquations[x]);const b=e.length;for(let z=0;z!==b;z++){const C=e[z],I=C.bi,U=C.bj,Y=C.si,G=C.sj;let k;if(I.material&&U.material?k=this.getContactMaterial(I.material,U.material)||this.defaultContactMaterial:k=this.defaultContactMaterial,k.friction,I.material&&U.material&&(I.material.friction>=0&&U.material.friction>=0&&I.material.friction*U.material.friction,I.material.restitution>=0&&U.material.restitution>=0&&(C.restitution=I.material.restitution*U.material.restitution)),a.addEquation(C),I.allowSleep&&I.type===bt.DYNAMIC&&I.sleepState===bt.SLEEPING&&U.sleepState===bt.AWAKE&&U.type!==bt.STATIC){const Q=U.velocity.lengthSquared()+U.angularVelocity.lengthSquared(),V=U.sleepSpeedLimit**2;Q>=V*2&&(I.wakeUpAfterNarrowphase=!0)}if(U.allowSleep&&U.type===bt.DYNAMIC&&U.sleepState===bt.SLEEPING&&I.sleepState===bt.AWAKE&&I.type!==bt.STATIC){const Q=I.velocity.lengthSquared()+I.angularVelocity.lengthSquared(),V=I.sleepSpeedLimit**2;Q>=V*2&&(U.wakeUpAfterNarrowphase=!0)}this.collisionMatrix.set(I,U,!0),this.collisionMatrixPrevious.get(I,U)||(ws.body=U,ws.contact=C,I.dispatchEvent(ws),ws.body=I,U.dispatchEvent(ws)),this.bodyOverlapKeeper.set(I.id,U.id),this.shapeOverlapKeeper.set(Y.id,G.id)}for(this.emitContactEvents(),l&&(h.makeContactConstraints=Se.now()-u,u=Se.now()),x=0;x!==r;x++){const z=o[x];z.wakeUpAfterNarrowphase&&(z.wakeUp(),z.wakeUpAfterNarrowphase=!1)}for(y=f.length,x=0;x!==y;x++){const z=f[x];z.update();for(let C=0,I=z.equations.length;C!==I;C++){const U=z.equations[C];a.addEquation(U)}}a.solve(t,this),l&&(h.solve=Se.now()-u),a.removeAllEquations();const L=Math.pow;for(x=0;x!==r;x++){const z=o[x];if(z.type&d){const C=L(1-z.linearDamping,t),I=z.velocity;I.scale(C,I);const U=z.angularVelocity;if(U){const Y=L(1-z.angularDamping,t);U.scale(Y,U)}}}this.dispatchEvent(gM),l&&(u=Se.now());const T=this.stepnumber%(this.quatNormalizeSkip+1)===0,O=this.quatNormalizeFast;for(x=0;x!==r;x++)o[x].integrate(t,T,O);this.clearForces(),this.broadphase.dirty=!0,l&&(h.integrate=Se.now()-u),this.stepnumber+=1,this.dispatchEvent(mM);let D=!0;if(this.allowSleep)for(D=!1,x=0;x!==r;x++){const z=o[x];z.sleepTick(this.time),z.sleepState!==bt.SLEEPING&&(D=!0)}this.hasActiveBodies=D}emitContactEvents(){const t=this.hasAnyEventListener("beginContact"),e=this.hasAnyEventListener("endContact");if((t||e)&&this.bodyOverlapKeeper.getDiff(In,Dn),t){for(let r=0,o=In.length;r<o;r+=2)Es.bodyA=this.getBodyById(In[r]),Es.bodyB=this.getBodyById(In[r+1]),this.dispatchEvent(Es);Es.bodyA=Es.bodyB=null}if(e){for(let r=0,o=Dn.length;r<o;r+=2)bs.bodyA=this.getBodyById(Dn[r]),bs.bodyB=this.getBodyById(Dn[r+1]),this.dispatchEvent(bs);bs.bodyA=bs.bodyB=null}In.length=Dn.length=0;const n=this.hasAnyEventListener("beginShapeContact"),i=this.hasAnyEventListener("endShapeContact");if((n||i)&&this.shapeOverlapKeeper.getDiff(In,Dn),n){for(let r=0,o=In.length;r<o;r+=2){const a=this.getShapeById(In[r]),c=this.getShapeById(In[r+1]);Nn.shapeA=a,Nn.shapeB=c,a&&(Nn.bodyA=a.body),c&&(Nn.bodyB=c.body),this.dispatchEvent(Nn)}Nn.bodyA=Nn.bodyB=Nn.shapeA=Nn.shapeB=null}if(i){for(let r=0,o=Dn.length;r<o;r+=2){const a=this.getShapeById(Dn[r]),c=this.getShapeById(Dn[r+1]);Un.shapeA=a,Un.shapeB=c,a&&(Un.bodyA=a.body),c&&(Un.bodyB=c.body),this.dispatchEvent(Un)}Un.bodyA=Un.bodyB=Un.shapeA=Un.shapeB=null}}clearForces(){const t=this.bodies,e=t.length;for(let n=0;n!==e;n++){const i=t[n];i.force,i.torque,i.force.set(0,0,0),i.torque.set(0,0,0)}}}new tn;const ma=new Me,Se=globalThis.performance||{};if(!Se.now){let s=Date.now();Se.timing&&Se.timing.navigationStart&&(s=Se.timing.navigationStart),Se.now=()=>Date.now()-s}new E;const mM={type:"postStep"},gM={type:"preStep"},ws={type:bt.COLLIDE_EVENT_NAME,body:null,contact:null},vM=[],xM=[],yM=[],_M=[],In=[],Dn=[],Es={type:"beginContact",bodyA:null,bodyB:null},bs={type:"endContact",bodyA:null,bodyB:null},Nn={type:"beginShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null},Un={type:"endShapeContact",bodyA:null,bodyB:null,shapeA:null,shapeB:null};function MM(){const s=new pM({gravity:new E(0,-9.82,0)});s.broadphase=new Au,s.allowSleep=!0,s.defaultContactMaterial.friction=.4;const t=new Qn("ground"),e=new Qn("wheel"),n=new Qn("chassis"),i=new Qn("barrier");return s.addContactMaterial(new _i(t,e,{friction:0,restitution:0,contactEquationStiffness:1e3})),s.addContactMaterial(new _i(n,i,{friction:.08,restitution:.04})),s.addContactMaterial(new _i(n,t,{friction:.2,restitution:.05})),{world:s,materials:{groundMat:t,wheelMat:e,chassisMat:n,barrierMat:i}}}function Fu(s,t=!1){const e=s[0].index!==null,n=new Set(Object.keys(s[0].attributes)),i=new Set(Object.keys(s[0].morphAttributes)),r={},o={},a=s[0].morphTargetsRelative,c=new he;let l=0;for(let h=0;h<s.length;++h){const d=s[h];let u=0;if(e!==(d.index!==null))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". All geometries must have compatible attributes; make sure index attribute exists among all geometries, or in none of them."),null;for(const f in d.attributes){if(!n.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+'. All geometries must have compatible attributes; make sure "'+f+'" attribute exists among all geometries, or in none of them.'),null;r[f]===void 0&&(r[f]=[]),r[f].push(d.attributes[f]),u++}if(u!==n.size)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". Make sure all geometries have the same number of attributes."),null;if(a!==d.morphTargetsRelative)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". .morphTargetsRelative must be consistent throughout all geometries."),null;for(const f in d.morphAttributes){if(!i.has(f))return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+".  .morphAttributes must be consistent throughout all geometries."),null;o[f]===void 0&&(o[f]=[]),o[f].push(d.morphAttributes[f])}if(t){let f;if(e)f=d.index.count;else if(d.attributes.position!==void 0)f=d.attributes.position.count;else return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed with geometry at index "+h+". The geometry must have either an index or a position attribute"),null;c.addGroup(l,f,h),l+=f}}if(e){let h=0;const d=[];for(let u=0;u<s.length;++u){const f=s[u].index;for(let g=0;g<f.count;++g)d.push(f.getX(g)+h);h+=s[u].attributes.position.count}c.setIndex(d)}for(const h in r){const d=yh(r[h]);if(!d)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" attribute."),null;c.setAttribute(h,d)}for(const h in o){const d=o[h][0].length;if(d===0)break;c.morphAttributes=c.morphAttributes||{},c.morphAttributes[h]=[];for(let u=0;u<d;++u){const f=[];for(let v=0;v<o[h].length;++v)f.push(o[h][v][u]);const g=yh(f);if(!g)return console.error("THREE.BufferGeometryUtils: .mergeGeometries() failed while trying to merge the "+h+" morphAttribute."),null;c.morphAttributes[h].push(g)}}return c}function yh(s){let t,e,n,i=-1,r=0;for(let l=0;l<s.length;++l){const h=s[l];if(h.isInterleavedBufferAttribute)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. InterleavedBufferAttributes are not supported."),null;if(t===void 0&&(t=h.array.constructor),t!==h.array.constructor)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.array must be of consistent array types across matching attributes."),null;if(e===void 0&&(e=h.itemSize),e!==h.itemSize)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.itemSize must be consistent across matching attributes."),null;if(n===void 0&&(n=h.normalized),n!==h.normalized)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.normalized must be consistent across matching attributes."),null;if(i===-1&&(i=h.gpuType),i!==h.gpuType)return console.error("THREE.BufferGeometryUtils: .mergeAttributes() failed. BufferAttribute.gpuType must be consistent across matching attributes."),null;r+=h.array.length}const o=new t(r);let a=0;for(let l=0;l<s.length;++l)o.set(s[l].array,a),a+=s[l].array.length;const c=new ee(o,e,n);return i!==void 0&&(c.gpuType=i),c}const On=14,so=2,SM=5.5,wM=600,Kn=On/2+SM+.5;function EM(s,t,e){const n=[new N(0,0,0),new N(0,0,140),new N(10,0,240),new N(90,0,290),new N(200,0,290),new N(280,0,240),new N(300,0,150),new N(240,0,90),new N(180,0,60),new N(200,0,-20),new N(280,0,-80),new N(300,0,-160),new N(240,0,-220),new N(120,0,-240),new N(0,0,-220),new N(-90,0,-180),new N(-160,0,-115),new N(-115,0,-85),new N(-50,0,-105),new N(0,0,-110),new N(0,0,-55)],i=new gu(n,!0,"catmullrom",.5),r=bM(i,wM),o=TM(r),a=AM(r),c=new Set,l=UM(),h=new $(new Ne(4e3,4e3,1,1),l);h.rotation.x=-Math.PI/2,h.position.y=-.02,h.receiveShadow=!0,s.add(h);const d=new bt({mass:0,material:e.groundMat});d.addShape(new us(new E(2e3,.5,2e3))),d.position.set(0,-.5,0),t.addBody(d);const u=RM(r,a),f=NM(),g=PM(r,On,u,o),v=new $(g,f);v.position.y=.01,v.receiveShadow=!0,s.add(v),IM(s,r,a,u);const m=new Bt({color:14474454,roughness:.7,metalness:0,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),p=.2,x=On/2-p/2-.05,y=new $(ga(r,x,p),m);y.position.y=.016,s.add(y);const _=new $(ga(r,-x,p),m);_.position.y=.016,s.add(_);const M=zM(),S=CM(a,45e-5,8);for(const C of[1,-1]){const I=new $(LM(r,C*On/2,so,C,S,o),M);I.receiveShadow=!0,I.castShadow=!1,s.add(I)}const b=FM(),L=On/2+so+.7;for(const C of[1,-1]){const I=new $(ga(r,C*L,1.6),b);I.position.y=.004,I.receiveShadow=!0,s.add(I)}DM(s,r,a,c);const w=BM(),T=new Bt({map:w,roughness:.6,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),O=new $(new Ne(On,1.6),T);O.rotation.x=-Math.PI/2,O.position.copy(r[0].pos).add(new N(0,.014,0));const D=Math.atan2(r[0].tan.x,r[0].tan.z);O.rotation.z=-D,s.add(O),tS(s,r[0]),nS(s,r[0]),iS(s,r,Kn),rS(s,r,a,Kn-1.4),oS(s,r,Kn+1.6),ZM(s),JM(s,r),QM(s,r,a),YM(s,r),jM(s),KM(s,r),$M(s),aS(t,r,Kn,e);const z={position:new N().copy(r[0].pos).add(r[0].tan.clone().multiplyScalar(-6)).add(new N(0,1,0)),yaw:Math.atan2(r[0].tan.x,r[0].tan.z)};return{curve:i,frames:r,spawn:z,width:On,kerbWidth:so,armcoOffset:Kn,racingLineOffset:u,isGravel:C=>c.has(C),length:i.getLength()}}function bM(s,t){const e=[];for(let n=0;n<t;n++){const i=n/t,r=s.getPointAt(i),o=s.getTangentAt(i).normalize(),a=new N(-o.z,0,o.x).normalize();e.push({t:i,pos:r,tan:o,left:a})}return e}function TM(s){const t=[0];for(let e=1;e<s.length;e++)t.push(t[e-1]+s[e].pos.distanceTo(s[e-1].pos));return t}function AM(s){const t=s.length,e=new Array(t).fill(0);for(let i=0;i<t;i++){const r=s[i].tan,o=s[(i+1)%t].tan;e[i]=1-r.dot(o)}const n=new Array(t).fill(0);for(let i=0;i<t;i++){let r=0;for(let o=-3;o<=3;o++)r+=e[(i+o+t)%t];n[i]=r/7}return n}function CM(s,t,e){const n=s.length,i=new Array(n).fill(!1);for(let o=0;o<n;o++)i[o]=s[o]>t;const r=new Array(n).fill(!1);for(let o=0;o<n;o++)for(let a=-e;a<=e;a++)if(i[(o+a+n)%n]){r[o]=!0;break}return r}function ga(s,t,e){const n=s.length,i=new Float32Array(n*2*3),r=new Float32Array(n*2*2),o=new Float32Array(n*2*3);for(let l=0;l<n;l++){const h=s[l],d=h.pos.clone().add(h.left.clone().multiplyScalar(t-e/2)),u=h.pos.clone().add(h.left.clone().multiplyScalar(t+e/2));i.set([d.x,d.y,d.z],l*2*3),i.set([u.x,u.y,u.z],(l*2+1)*3),r.set([0,l/n],l*2*2),r.set([1,l/n],(l*2+1)*2),o.set([0,1,0],l*2*3),o.set([0,1,0],(l*2+1)*3)}const a=[];for(let l=0;l<n;l++){const h=l*2,d=l*2+1,u=(l+1)%n*2,f=(l+1)%n*2+1;a.push(h,u,d,d,u,f)}const c=new he;return c.setAttribute("position",new ee(i,3)),c.setAttribute("uv",new ee(r,2)),c.setAttribute("normal",new ee(o,3)),c.setIndex(a),c}function RM(s,t){const e=s.length,n=new Float32Array(e);for(let r=0;r<e;r++){const o=s[r].tan,a=s[(r+1)%e].tan,c=o.x*a.z-o.z*a.x,l=Math.min(3.2,t[r]*900);n[r]=(c>0?-1:1)*l*(t[r]>8e-4?1:0)}let i=n;for(let r=0;r<3;r++){const o=new Float32Array(e);for(let a=0;a<e;a++){let c=0;for(let l=-6;l<=6;l++)c+=i[(a+l+e)%e];o[a]=c/13}i=o}return i}function PM(s,t,e,n){const i=s.length,r=11,o=new Float32Array(i*r*3),a=new Float32Array(i*r*2),c=new Float32Array(i*r*3),l=new Float32Array(i*r*3);for(let u=0;u<i;u++){const f=s[u],g=n[u],v=e[u],m=.93+.1*an(g*.013,.37,3);for(let p=0;p<r;p++){const x=p/(r-1),y=(.5-x)*t,_=f.pos.clone().add(f.left.clone().multiplyScalar(y)),M=u*r+p;o.set([_.x,_.y,_.z],M*3),a.set([x,g/4],M*2),c.set([0,1,0],M*3);const S=Math.abs(y-v),b=Math.exp(-((S-.85)**2)/(2*.55*.55))+Math.exp(-((S+.85)**2)/(2*.55*.55)),L=1-.24*Math.min(1,b)-.08*Math.exp(-S*S/4),T=1+Math.max(0,Math.abs(y)/(t/2)-.82)/.18*.1,O=m*L*T;l.set([O,O,O*1.003],M*3)}}const h=[];for(let u=0;u<i;u++){const f=u*r,g=(u+1)%i*r;for(let v=0;v<r-1;v++)h.push(f+v,g+v,f+v+1),h.push(f+v+1,g+v,g+v+1)}const d=new he;return d.setAttribute("position",new ee(o,3)),d.setAttribute("uv",new ee(a,2)),d.setAttribute("normal",new ee(c,3)),d.setAttribute("color",new ee(l,3)),d.setIndex(h),d}function LM(s,t,e,n,i,r){const o=s.length,a=[],c=[],l=[],h=r[o-1]+s[0].pos.distanceTo(s[o-1].pos),d=3;let u=-1,f=!1;for(let v=0;v<=o;v++){const m=v%o,p=s[m];if(i[m]){const x=v===o?h:r[m],y=.5+.5*Math.sin(x*Math.PI*2/1),_=.05+.024*y,M=.014+.01*y,S=(b,L)=>{const w=p.pos.clone().add(p.left.clone().multiplyScalar(t+n*b));a.push(w.x,L,w.z)};if(S(0,.012),S(e*.38,_),S(e,M),c.push(0,x,.45,x,1,x),f){const b=u,L=a.length/3-d;for(let w=0;w<d-1;w++)n>0?l.push(b+w,L+w,b+w+1,b+w+1,L+w,L+w+1):l.push(b+w,b+w+1,L+w,b+w+1,L+w+1,L+w)}u=a.length/3-d,f=!0}else f=!1}const g=new he;return g.setAttribute("position",new ee(new Float32Array(a),3)),g.setAttribute("uv",new ee(new Float32Array(c),2)),g.setIndex(l),g.computeVertexNormals(),g}function IM(s,t,e,n,i){const r=t.length,o=new ls({color:1447450,transparent:!0,opacity:.3,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),a=[];let c=0;for(;c<r;)if(e[c]>.004){let g=c;for(;g<r&&e[g]>.0016;)g++;a.push([Math.max(0,c-10),Math.min(r-1,g+4)]),c=g+12}else c++;const l=[],h=[];let d=0;for(const[g,v]of a)for(const m of[-.85,.85]){const p=(Math.random()-.5)*.3;for(let x=g;x<=v;x++){const y=t[x],_=n[x]+m+p,M=.16,S=y.pos.clone().add(y.left.clone().multiplyScalar(_+M)),b=y.pos.clone().add(y.left.clone().multiplyScalar(_-M));if(l.push(S.x,.018,S.z,b.x,.018,b.z),x>g){const L=d+(x-g)*2;h.push(L-2,L,L-1,L-1,L,L+1)}}d=l.length/3}if(!l.length)return;const u=new he;u.setAttribute("position",new ee(new Float32Array(l),3)),u.setIndex(h),u.computeVertexNormals();const f=new $(u,o);f.renderOrder=2,s.add(f)}function DM(s,t,e,n){const i=t.length,r=[];let o=0;for(;o<i;)if(e[o]>.0045){let l=o,h=0;for(;l<i&&e[l]>.002;)e[l]>h&&(h=e[l]),l++;l-o>6&&r.push({i0:Math.max(0,o-14),i1:Math.min(i-1,l+8),peak:h}),o=l+10}else o++;r.sort((l,h)=>h.peak-l.peak);const a=r.slice(0,4),c=OM();for(const l of a){const h=Math.floor((l.i0+l.i1)/2),d=t[h].tan,u=t[(h+1)%i].tan,g=d.x*u.z-d.z*u.x>0?1:-1,v=On/2+so+.3,m=Kn-.6,p=[],x=[],y=[];let _=0;for(let b=l.i0;b<=l.i1;b++){const L=t[b%i];n.add(b%i);const w=L.pos.clone().add(L.left.clone().multiplyScalar(g*v)),T=L.pos.clone().add(L.left.clone().multiplyScalar(g*m));p.push(w.x,.006,w.z,T.x,.006,T.z),x.push(0,b*.5,3,b*.5),b>l.i0&&y.push(_-2,_,_-1,_-1,_,_+1),_+=2}const M=new he;M.setAttribute("position",new ee(new Float32Array(p),3)),M.setAttribute("uv",new ee(new Float32Array(x),2)),M.setIndex(y),M.computeVertexNormals();const S=new $(M,c);S.receiveShadow=!0,s.add(S)}}function NM(){const s=qs(1024,(n,i)=>{const r=an(n*26,i*26,5),o=an(n*90+11,i*90+5,2);let a=.135+r*.075;return o>.72&&(a+=.05),o<.18&&(a-=.03),[a,a,a+.006]});s.wrapS=s.wrapT=Je,s.repeat.set(3,1),s.anisotropy=16,s.colorSpace=$t;const t=qM(512,1.8);t.wrapS=t.wrapT=Je,t.repeat.set(3,1);const e=qs(512,(n,i)=>{const r=an(n*6+3,i*6+7,4)*.3+.68;return[r,r,r]});return e.wrapS=e.wrapT=Je,e.repeat.set(3,1),new Bt({map:s,vertexColors:!0,normalMap:t,normalScale:new nt(.5,.5),roughnessMap:e,roughness:.88,metalness:0,envMapIntensity:.5,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function UM(){const s=qs(1024,(t,e)=>{const n=an(t*60,e*60,4),i=an(t*5+9,e*5+3,4),r=an(t*11+31,e*11+17,3),o=1+.05*Math.sign(Math.sin(t*Math.PI*8));let a=(.23+n*.16+i*.1)*o,c=a*(.52+r*.33),l=a*.42;return[c,a,l]});return s.wrapS=s.wrapT=Je,s.repeat.set(46,46),s.anisotropy=16,s.colorSpace=$t,new Bt({map:s,roughness:.96,metalness:0,envMapIntensity:.35,polygonOffset:!0,polygonOffsetFactor:2,polygonOffsetUnits:2})}function FM(){const s=qs(512,(t,e)=>{const n=an(t*14,e*60,4),i=an(t*6+4,e*22+8,3),r=Math.min(1,Math.abs(t-.5)*2.6),o=.34+n*.16,a=.27+n*.13,c=.17+n*.08,l=.17+i*.12,h=.27+i*.16,d=.13+i*.07,u=ka(.45,1,r);return[o*(1-u)+l*u,a*(1-u)+h*u,c*(1-u)+d*u]});return s.wrapS=s.wrapT=Je,s.repeat.set(1,60),s.anisotropy=8,s.colorSpace=$t,new Bt({map:s,roughness:.97,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function OM(){const s=qs(512,(t,e)=>{const n=an(t*40,e*40,4),i=1+.05*Math.sin(e*Math.PI*50),r=(.42+n*.2)*i;return[r*1.02,r*.95,r*.78]});return s.wrapS=s.wrapT=Je,s.anisotropy=8,s.colorSpace=$t,new Bt({map:s,roughness:1,metalness:0,envMapIntensity:.3,polygonOffset:!0,polygonOffsetFactor:-1,polygonOffsetUnits:-1})}function zM(){const s=document.createElement("canvas");s.width=32,s.height=32;const t=s.getContext("2d");t.fillStyle="#cf2222",t.fillRect(0,0,32,32),t.fillStyle="#f4f4f4",t.fillRect(0,16,32,16);const e=new Be(s);return e.wrapS=e.wrapT=Je,e.repeat.set(1,1),e.colorSpace=$t,e.magFilter=Ce,new Bt({map:e,roughness:.55,metalness:0,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2})}function BM(){const s=document.createElement("canvas");s.width=256,s.height=32;const t=s.getContext("2d");for(let n=0;n<16;n++)for(let i=0;i<2;i++)t.fillStyle=(n+i)%2===0?"#ffffff":"#000000",t.fillRect(n*16,i*16,16,16);const e=new Be(s);return e.colorSpace=$t,e}function GM(){const t=document.createElement("canvas");t.width=t.height=256;const e=t.getContext("2d");e.clearRect(0,0,256,256);const n=[];for(let r=0;r<160;r++){const o=Math.random()*Math.PI*2,a=Math.pow(Math.random(),.65)*256*.42;n.push({x:256/2+Math.cos(o)*a,y:256/2+Math.sin(o)*a*.92,r:8+Math.random()*22})}n.sort((r,o)=>o.y-r.y);for(const r of n){const o=1-r.y/256*.85,a=70+o*105|0,c=26+o*52|0,l=24+o*30|0,h=e.createRadialGradient(r.x,r.y-r.r*.35,r.r*.1,r.x,r.y,r.r);h.addColorStop(0,`rgba(${c+20},${Math.min(255,a+26)},${l+8},0.95)`),h.addColorStop(.75,`rgba(${c},${a},${l},0.9)`),h.addColorStop(1,`rgba(${c*.6|0},${a*.6|0},${l*.6|0},0)`),e.fillStyle=h,e.beginPath(),e.arc(r.x,r.y,r.r,0,Math.PI*2),e.fill()}const i=new Be(t);return i.colorSpace=$t,i}function HM(){const s=["VELOCE","APEX","NITRO","AERO","TORQUE","VORTEX","RACE1","FLUX"],t=["#e8e8ea","#101418","#c41e1e","#1e40af","#059669","#f5b301","#0891b2","#7c3aed"];return s.map((e,n)=>{const o=document.createElement("canvas");o.width=512,o.height=80;const a=o.getContext("2d");a.fillStyle=t[n%t.length],a.fillRect(0,0,512,80);const c=n%t.length===0||n%t.length===5?"#16181d":"#f4f6f8";a.fillStyle=c,a.beginPath(),a.moveTo(20,60),a.lineTo(50,18),a.lineTo(70,18),a.lineTo(40,60),a.closePath(),a.fill(),a.fillRect(58,18,14,42),a.font="bold 50px Arial Black, Arial",a.textBaseline="middle",a.fillText(e,100,44);const l=new Be(o);return l.colorSpace=$t,l.anisotropy=8,l})}function WM(s){const n=document.createElement("canvas");n.width=2048,n.height=64;const i=n.getContext("2d");i.fillStyle="#15181d",i.fillRect(0,0,2048,64);for(const o of[0,1952])for(let a=0;a<6;a++)for(let c=0;c<4;c++)i.fillStyle=(a+c)%2?"#e8e8e8":"#15181d",i.fillRect(o+a*16,c*16,16,16);i.fillStyle="#e8eaee",i.font="bold 40px Arial Black, Arial",i.textAlign="center",i.textBaseline="middle",i.letterSpacing="14px",i.fillText(s,2048/2,64/2+2),i.fillStyle="#c41e1e",i.fillRect(2048/2-460,56,920,4);const r=new Be(n);return r.colorSpace=$t,r.anisotropy=8,r}function kM(s){const t=document.createElement("canvas");t.width=256,t.height=192;const e=t.getContext("2d");e.fillStyle="#f2f3f5",e.fillRect(0,0,256,192),e.strokeStyle="#c41e1e",e.lineWidth=14,e.strokeRect(7,7,242,178),e.fillStyle="#c41e1e",e.font="bold 104px Arial Black, Arial",e.textAlign="center",e.textBaseline="middle",e.fillText(s,128,102);const n=new Be(t);return n.colorSpace=$t,n.anisotropy=8,n}function VM(){const e=document.createElement("canvas");e.width=256,e.height=128;const n=e.getContext("2d");n.clearRect(0,0,256,128);for(let r=0;r<46;r++){const o=128+(Math.random()-.5)*256*.72,a=128*.62+(Math.random()-.5)*128*.4,c=12+Math.random()*26,l=n.createRadialGradient(o,a-c*.3,2,o,a,c),h=235+Math.random()*20;l.addColorStop(0,`rgba(${h},${h},${h+4},0.55)`),l.addColorStop(1,"rgba(255,255,255,0)"),n.fillStyle=l,n.beginPath(),n.arc(o,a,c,0,Math.PI*2),n.fill()}const i=new Be(e);return i.colorSpace=$t,i}function Ur(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function ka(s,t,e){return e=Math.max(0,Math.min(1,(e-s)/(t-s))),e*e*(3-2*e)}function XM(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,r=t-n,o=Ur(e,n),a=Ur(e+1,n),c=Ur(e,n+1),l=Ur(e+1,n+1),h=ka(0,1,i),d=ka(0,1,r);return(o*(1-h)+a*h)*(1-d)+(c*(1-h)+l*h)*d}function an(s,t,e){let n=.5,i=1,r=0,o=0;for(let a=0;a<e;a++)r+=n*XM(s*i,t*i),o+=n,n*=.5,i*=2;return r/o}function qs(s,t){const e=document.createElement("canvas");e.width=s,e.height=s;const n=e.getContext("2d"),i=n.createImageData(s,s);for(let o=0;o<s;o++)for(let a=0;a<s;a++){const[c,l,h]=t(a/s,o/s),d=(o*s+a)*4;i.data[d]=Math.min(255,Math.max(0,c*255)),i.data[d+1]=Math.min(255,Math.max(0,l*255)),i.data[d+2]=Math.min(255,Math.max(0,h*255)),i.data[d+3]=255}n.putImageData(i,0,0);const r=new Be(e);return r.needsUpdate=!0,r}function qM(s,t){const e=new Float32Array(s*s);for(let a=0;a<s;a++)for(let c=0;c<s;c++)e[a*s+c]=an(c/s*8,a/s*8,4);const n=document.createElement("canvas");n.width=s,n.height=s;const i=n.getContext("2d"),r=i.createImageData(s,s);for(let a=0;a<s;a++)for(let c=0;c<s;c++){const l=e[a*s+(c-1+s)%s],h=e[a*s+(c+1)%s],d=e[(a-1+s)%s*s+c],u=e[(a+1)%s*s+c],f=(h-l)*t,g=(u-d)*t,v=-f,m=-g,p=1,x=Math.hypot(v,m,p),y=(a*s+c)*4;r.data[y]=(v/x*.5+.5)*255,r.data[y+1]=(m/x*.5+.5)*255,r.data[y+2]=(p/x*.5+.5)*255,r.data[y+3]=255}i.putImageData(r,0,0);const o=new Be(n);return o.needsUpdate=!0,o}function YM(s,t){const e=new Bt({color:4863264,roughness:.95,metalness:0}),n=new Bt({map:GM(),alphaTest:.45,roughness:.9,metalness:0,side:De}),i=new xe(.22,.42,2.6,7);i.translate(0,1.3,0);const r=new Ne(7.2,7.4);r.translate(0,3.7,0);const o=r.clone();o.rotateY(Math.PI/3);const a=r.clone();a.rotateY(2*Math.PI/3);const c=Fu([r,o,a]);c.translate(0,2.4,0);const l=600,h=new rs(i,e,l),d=new rs(c,n,l);h.castShadow=h.receiveShadow=!0,d.castShadow=!0;const u=new ne,f=new gn,g=new N,v=new Ft;let m=0;for(let p=0;p<l*4&&m<l;p++){const x=(Math.random()*2-1)*800,y=(Math.random()*2-1)*800,_=new N(x,0,y);let M=1/0;for(let b=0;b<t.length;b+=6){const L=_.distanceToSquared(t[b].pos);L<M&&(M=L)}if(M<35*35)continue;const S=.7+Math.random()*1;g.set(S,.8+Math.random()*.6,S),f.setFromEuler(new wi(0,Math.random()*Math.PI*2,0)),u.compose(_,f,g),h.setMatrixAt(m,u),d.setMatrixAt(m,u),v.setHSL(.26+(Math.random()-.5)*.06,.5,.32+Math.random()*.12),d.setColorAt(m,v),m++}h.count=m,d.count=m,h.instanceMatrix.needsUpdate=!0,d.instanceMatrix.needsUpdate=!0,d.instanceColor&&(d.instanceColor.needsUpdate=!0),s.add(h),s.add(d)}function jM(s){const t=new Bt({vertexColors:!0,roughness:1,metalness:0}),e=new Ft(7042437),n=new Ft(5068872),i=new Ft(14673646),r=new Ft,o=13;for(let a=0;a<o;a++){const c=1500+Math.random()*800,l=a/o*Math.PI*2+Math.random()*.35,h=Math.cos(l)*c,d=Math.sin(l)*c,u=130+Math.random()*240,f=320+Math.random()*380,g=new rc(f,u,14,7),v=g.getAttribute("position"),m=[],p=a*7.13;for(let y=0;y<v.count;y++){const _=v.getX(y),M=v.getY(y),S=v.getZ(y),b=Math.atan2(S,_),L=(M+u/2)/u,w=an(b*2.2+p,L*3+p,4),T=(.6+w*.8)*(1-L*.5);v.setX(y,_*(.7+T*.5)),v.setZ(y,S*(.7+T*.5)),v.setY(y,M+(w-.5)*u*.12);const O=.74+(w-.5)*.14;L>O?r.copy(i):L<.18?r.copy(n):r.copy(e).lerp(i,(L-.18)/(O-.18)*.4),m.push(r.r,r.g,r.b)}g.setAttribute("color",new Jt(m,3)),g.computeVertexNormals();const x=new $(g,t);x.position.set(h,u/2-8,d),x.rotation.y=Math.random()*Math.PI,s.add(x)}}function KM(s,t){const e=new Bt({color:10330534,roughness:.78,metalness:.12}),n=new Bt({color:3817287,roughness:.5,metalness:.6}),i=new Bt({color:13159374,roughness:.55,metalness:.25,side:De}),r=new Bt({color:5133146,roughness:.85,metalness:.1}),o=9,a=30,c=.62,l=1,h=[595,245,430],d=new At(.34,.5,.3),u=o*44,f=new rs(d,new Bt({roughness:.9,metalness:0}),u*h.length),g=new ne,v=new gn,m=new N(1,1,1),p=new Ft;let x=0;for(const y of h){const _=t[y],M=_.pos.clone().add(_.left.clone().multiplyScalar(-17.5)),S=Math.atan2(_.left.x,_.left.z),b=new de;for(let O=0;O<o;O++){const D=new $(new At(a,c,l),e);D.position.set(0,1.2+O*c+c/2,-O*l),D.castShadow=D.receiveShadow=!0,b.add(D)}const L=new $(new At(a,1.2,o*l+1),e);L.position.set(0,.6,-9/2+.5),L.castShadow=L.receiveShadow=!0,b.add(L);const w=new $(new At(a,1.2+o*c+1.4,.3),r);w.position.set(0,(1.2+o*c)/2+.5,-8.5*l-.3),w.castShadow=!0,b.add(w);for(const O of[-1,1]){const D=new $(new At(.3,1.2+o*c,o*l+1),r);D.position.set(O*(a/2+.15),(1.2+o*c)/2,-9/2+.5),b.add(D)}const T=new $(new At(a+1.5,.25,o*l+3),i);T.position.set(0,1.2+o*c+2.6,-9/2+1.2),T.rotation.x=.1,T.castShadow=!0,b.add(T);for(const O of[-a/2+2,-a/6,a/6,a/2-2]){const D=new $(new At(.35,o*c+3.6,.35),n);D.position.set(O,(o*c+3.6)/2+1.2,-8*l),D.castShadow=!0,b.add(D)}b.position.copy(M),b.rotation.y=S,s.add(b),v.setFromEuler(new wi(0,S,0));for(let O=0;O<o;O++)for(let D=0;D<44;D++){if(Math.random()<.28)continue;const z=(D/43-.5)*(a-2),C=1.2+O*c+c+.25,I=-O*l+(Math.random()-.5)*.2,U=new N(z,C,I).applyQuaternion(v).add(M);g.compose(U,v,m),f.setMatrixAt(x,g),p.setHSL(Math.random(),.3+Math.random()*.3,.35+Math.random()*.22),f.setColorAt(x,p),x++}}f.count=x,f.instanceMatrix.needsUpdate=!0,f.instanceColor&&(f.instanceColor.needsUpdate=!0),f.castShadow=!1,s.add(f)}function ZM(s){const t=new de,e=new Bt({color:10198432,roughness:.85,metalness:.05}),n=new Bt({color:5593180,roughness:.9,metalness:.05}),i=new $e({color:2832711,roughness:.15,metalness:.8,envMapIntensity:1.2}),r=new Bt({color:2303531,roughness:.6,metalness:.4}),o=new Bt({color:789776,roughness:.95,metalness:0}),a=-45,c=100,l=c-a,h=(a+c)/2,d=new $(new Ne(11.5,l+10),n);d.rotation.x=-Math.PI/2,d.position.set(-20.5,.012,h),d.receiveShadow=!0,t.add(d);const u=new $(new At(.4,1,l),e);u.position.set(-14.6,.5,h),u.castShadow=u.receiveShadow=!0,t.add(u);const f=new $(new At(10,7.6,l),e);f.position.set(-31.5,3.8,h),f.castShadow=f.receiveShadow=!0,t.add(f);const g=12;for(let y=0;y<g;y++){const _=a+8+y*((l-16)/(g-1)),M=new $(new Ne(4.4,3.1),o);M.position.set(-26.44,1.65,_),M.rotation.y=Math.PI/2,t.add(M);const S=new $(new At(.15,.5,5.2),r);S.position.set(-26.5,3.5,_),t.add(S)}const v=new $(new At(.25,1.9,l-6),i);v.position.set(-26.35,5.6,h),t.add(v);for(let y=a+6;y<=c-6;y+=6){const _=new $(new At(.3,1.9,.16),r);_.position.set(-26.33,5.6,y),t.add(_)}const m=new $(new At(11,.3,l+2),r);m.position.set(-31.5,7.75,h),m.castShadow=!0,t.add(m);for(let y=a;y<=c;y+=4){const _=new $(new At(.08,.9,.08),r);_.position.set(-26.6,8.3,y),t.add(_)}const p=new $(new At(.1,.08,l),r);p.position.set(-26.6,8.72,h),t.add(p);for(const y of[-20,20,60]){const _=new $(new At(6,2.6,9),e);_.position.set(-32.5,9.2,y),_.castShadow=!0,t.add(_);const M=new $(new At(.2,1.2,8),i);M.position.set(-29.45,9.4,y),t.add(M)}const x=new $(new Ne(l-10,1.15),new Bt({map:WM("RACER GRAND PRIX"),roughness:.55,metalness:0}));x.position.set(-26.28,7.1,h),x.rotation.y=Math.PI/2,t.add(x),s.add(t)}function JM(s,t){const e=new Bt({color:5067608,roughness:.6,metalness:.6}),n=new Bt({color:2895924,roughness:.8,metalness:.3,transparent:!0,opacity:.32,side:De,depthWrite:!1}),i=[];for(let d=0;d<t.length;d++){const u=t[d].pos;Math.abs(u.x)<6&&u.z>-55&&u.z<135&&i.push(d)}if(!i.length)return;const r=new At(.14,3.1,.14),o=new rs(r,e,i.length*2),a=new ne,c=new gn,l=new N(1,1,1);let h=0;for(const d of[1,-1]){const u=[],f=[];let g=0;for(let m=0;m<i.length;m++){const p=t[i[m]],x=p.pos.clone().add(p.left.clone().multiplyScalar(d*(Kn+.45)));m%2===0&&(c.setFromEuler(new wi(0,Math.atan2(p.tan.x,p.tan.z),0)),a.compose(new N(x.x,1.55,x.z),c,l),o.setMatrixAt(h++,a)),u.push(x.x,.85,x.z,x.x,3.05,x.z),m>0&&f.push(g-2,g,g-1,g-1,g,g+1),g+=2}const v=new he;v.setAttribute("position",new ee(new Float32Array(u),3)),v.setIndex(f),v.computeVertexNormals(),s.add(new $(v,n))}o.count=h,o.instanceMatrix.needsUpdate=!0,s.add(o)}function QM(s,t,e){const n=t.length,i=[];let r=0;for(;r<n;)if(e[r]>.0045){let a=r,c=0;for(;a<n&&e[a]>.002;)c=Math.max(c,e[a]),a++;a-r>6&&i.push({i0:r,peak:c}),r=a+10}else r++;i.sort((a,c)=>c.peak-a.peak);const o=new Bt({color:5922403,roughness:.7,metalness:.4});for(const a of i.slice(0,3)){const c=t[a.i0].tan,l=t[(a.i0+4)%n].tan,d=c.x*l.z-c.z*l.x>0?1:-1;for(const u of[100,50]){const f=Math.round(u/3.2),g=(a.i0-f+n)%n,v=t[g],m=v.pos.clone().add(v.left.clone().multiplyScalar(d*(Kn-1.6))),p=Math.atan2(v.tan.x,v.tan.z),x=new $(new Ne(1.15,.85),new Bt({map:kM(String(u)),roughness:.5,metalness:0,side:De}));x.position.set(m.x,1.5,m.z),x.rotation.y=p,x.castShadow=!0,s.add(x);const y=new $(new At(.08,1.1,.08),o);y.position.set(m.x,.55,m.z),s.add(y)}}}function $M(s){const t=VM();for(let e=0;e<11;e++){const n=new pu({map:t,transparent:!0,opacity:.45+Math.random()*.3,fog:!1,depthWrite:!1}),i=new Pv(n),r=Math.random()*Math.PI*2,o=1100+Math.random()*1500;i.position.set(Math.cos(r)*o,260+Math.random()*220,Math.sin(r)*o);const a=380+Math.random()*420;i.scale.set(a,a*(.32+Math.random()*.12),1),s.add(i)}}function tS(s,t){const e=Math.atan2(t.tan.x,t.tan.z),n=t.tan.clone().normalize(),i=t.left.clone().normalize(),r=2,o=4.6,a=7,c=2.5,l=4,h=new Bt({color:16777215,roughness:.7,metalness:0,transparent:!0,opacity:.7,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3}),d=new Bt({color:16767050,roughness:.7,metalness:0,transparent:!0,opacity:.85,polygonOffset:!0,polygonOffsetFactor:-3,polygonOffsetUnits:-3});for(let u=0;u<l;u++)for(const f of[1,-1]){const g=-2.8-u*a,v=c*f,m=t.pos.clone().add(n.clone().multiplyScalar(g)).add(i.clone().multiplyScalar(v)),p=eS(r,o,.14,h);p.position.set(m.x,.0135,m.z),p.rotation.y=-e,s.add(p);const x=new $(new Ne(r-.4,.22),d);x.rotation.x=-Math.PI/2;const y=m.clone().add(n.clone().multiplyScalar(o/2-.4));x.position.set(y.x,.014,y.z),x.rotation.z=-e,s.add(x)}}function eS(s,t,e,n){const i=new de;for(const r of[-1,1]){const o=new $(new Ne(s,e),n);o.rotation.x=-Math.PI/2,o.position.z=r*(t/2-e/2),i.add(o)}for(const r of[-1,1]){const o=new $(new Ne(e,t),n);o.rotation.x=-Math.PI/2,o.position.x=r*(s/2-e/2),i.add(o)}return i}function nS(s,t){const e=Math.atan2(t.tan.x,t.tan.z),n=t.pos.clone().add(t.tan.clone().multiplyScalar(8)),i=new de,r=new Bt({color:9343897,roughness:.4,metalness:.85}),o=new Bt({color:2303531,roughness:.55,metalness:.6}),a=8.6,c=On/2+2.6,l=c*2;for(const m of[-1,1]){for(const p of[-.35,.35])for(const x of[-.35,.35]){const y=new $(new At(.12,a,.12),r);y.position.set(m*c+p,a/2,x),y.castShadow=!0,i.add(y)}for(let p=1;p<a-.5;p+=1.4){const x=new $(new At(.08,1.1,.08),r);x.position.set(m*c,p,.35),x.rotation.z=.62,i.add(x);const y=x.clone();y.rotation.z=-.62,y.position.z=-.35,i.add(y)}}for(const m of[-.4,.4])for(const p of[-.4,.4]){const x=new $(new At(l+1,.12,.12),r);x.position.set(0,a+m,p),x.castShadow=!0,i.add(x)}const h=12;for(let m=0;m<h;m++){const p=-l/2+(m+.5)*(l/h);for(const x of[-.4,.4]){const y=new $(new At(.07,1.05,.07),r);y.position.set(p,a,x),y.rotation.z=(m%2?1:-1)*.75,i.add(y)}}const d=(()=>{const m=document.createElement("canvas");m.width=512,m.height=64;const p=m.getContext("2d");p.fillStyle="#101317",p.fillRect(0,0,512,64);for(let y=0;y<32;y++)for(let _=0;_<2;_++)(y+_)%2!==0&&(p.fillStyle="#e8e8e8",p.fillRect(y*16,_*16,16,16));p.fillStyle="#e8eaee",p.font="bold 26px Arial Black, Arial",p.textAlign="center",p.fillText("RACER GRAND PRIX",256,54);const x=new Be(m);return x.colorSpace=$t,x})(),u=new $(new Ne(l-2,1.1),new Bt({map:d,side:De,roughness:.6}));u.position.set(0,a-1,0),i.add(u);const f=new $(new At(2.3,.7,.4),o);f.position.set(0,a-2,0),f.castShadow=!0,i.add(f);const g=new Bt({color:3148043,emissive:16720688,emissiveIntensity:1.4,roughness:.35});for(let m=0;m<5;m++){const p=new $(new xe(.13,.13,.1,14),g);p.rotation.x=Math.PI/2,p.position.set(-.88+m*.44,a-2,.22),i.add(p)}const v=new $(new At(.14,1.6,.14),o);v.position.set(0,a-1.2,0),i.add(v),i.position.copy(n),i.rotation.y=e,s.add(i)}function iS(s,t,e){const n=new Bt({color:11844289,roughness:.45,metalness:.85,side:De}),i=new Bt({color:6712435,roughness:.7,metalness:.5});for(const g of[1,-1]){const v=new $(sS(t,e*g),n);v.castShadow=!0,s.add(v)}const r=5,o=Math.floor(t.length/r)*2,a=new At(.22,.85,.16),c=new rs(a,i,o);c.castShadow=!0,c.receiveShadow=!0;let l=0;const h=new ne,d=new gn,u=new N(1,1,1),f=new N(0,1,0);for(let g=0;g<t.length;g+=r){const v=t[g],m=Math.atan2(v.tan.x,v.tan.z);d.setFromAxisAngle(f,m);for(const p of[1,-1]){const x=v.pos.clone().add(v.left.clone().multiplyScalar(e*p));x.y=.425,h.compose(x,d,u),c.setMatrixAt(l++,h)}}c.count=l,c.instanceMatrix.needsUpdate=!0,s.add(c)}function sS(s,t){const e=s.length,n=[],i=[],r=[],o=[],a=.4,c=.78,l=t>0?-1:1;for(let d=0;d<e;d++){const u=s[d],f=u.pos.clone().add(u.left.clone().multiplyScalar(t));n.push(f.x,a,f.z),n.push(f.x,c,f.z),r.push(0,d/8,1,d/8);const g=u.left.x*l,v=u.left.z*l;i.push(g,0,v,g,0,v)}for(let d=0;d<e;d++){const u=d*2,f=d*2+1,g=(d+1)%e*2,v=(d+1)%e*2+1;o.push(u,g,f,f,g,v)}const h=new he;return h.setAttribute("position",new ee(new Float32Array(n),3)),h.setAttribute("uv",new ee(new Float32Array(r),2)),h.setAttribute("normal",new ee(new Float32Array(i),3)),h.setIndex(o),h}function rS(s,t,e,n){const i=new Bt({color:1052688,roughness:.95,metalness:0}),r=new xe(.42,.42,.32,14);r.rotateX(Math.PI/2);const o=[];let a=0,c=-50;for(let y=0;y<t.length;y++){if(y>0&&(a+=t[y].pos.distanceTo(t[y-1].pos)),e[y]<.0055||a-c<30)continue;const _=t[(y-1+t.length)%t.length].tan,M=t[(y+1)%t.length].tan,b=_.x*M.z-_.z*M.x>0?-1:1;o.push({frameIdx:y,sign:b}),c=a}const l=6,h=3,d=.86,u=o.length*l*h;if(u===0)return;const f=new rs(r,i,u);f.castShadow=!0,f.receiveShadow=!0;const g=new ne,v=new gn,m=new N(1,1,1),p=new N(0,1,0);let x=0;for(const y of o){const _=t[y.frameIdx],M=Math.atan2(_.tan.x,_.tan.z);v.setFromAxisAngle(p,M);const S=_.pos.clone().add(_.left.clone().multiplyScalar(y.sign*n));for(let b=0;b<l;b++){const L=(b-(l-1)/2)*d,w=S.clone().add(_.tan.clone().multiplyScalar(L));for(let T=0;T<h;T++){const O=new N(w.x,.21+T*.34,w.z);g.compose(O,v,m),f.setMatrixAt(x++,g)}}}f.count=x,f.instanceMatrix.needsUpdate=!0,s.add(f)}function oS(s,t,e){const i=HM().map(h=>new Bt({map:h,roughness:.5,metalness:.1})),r=new Bt({color:1776930,roughness:.6,metalness:.4}),o=new At(8,1.2,.16),a=new At(8.3,1.5,.1),l=Math.floor(t.length/22);for(let h=0;h<t.length;h+=l){if(Math.random()<.35)continue;const d=t[h],u=Math.random()<.5?1:-1,f=d.pos.clone().add(d.left.clone().multiplyScalar(u*e)),g=Math.atan2(d.tan.x,d.tan.z),v=i[Math.floor(Math.random()*i.length)],m=new $(o,v);m.position.set(f.x,1.55,f.z),m.rotation.y=g,m.castShadow=!0,m.receiveShadow=!0,s.add(m);const p=new $(a,r);p.position.set(f.x,1.55,f.z),p.rotation.y=g,p.translateZ(-.05),s.add(p);const x=new Bt({color:4473924,roughness:.7,metalness:.4});for(const y of[-3,3]){const _=new $(new At(.12,1.55,.12),x),M=new N(d.tan.x*y,0,d.tan.z*y);_.position.set(f.x+M.x,.75,f.z+M.z),_.rotation.y=Math.atan2(d.tan.x,d.tan.z),s.add(_)}}}function aS(s,t,e,n){const i=n.barrierMat,r=2,o=.6,a=1.9,c=.7,l=t.length,h=new fe,d=new E(0,1,0);for(const u of[1,-1]){const f=(e+o-.25)*u;for(let g=0;g<l;g+=r){const v=t[g],m=t[(g+r)%l],p=v.pos.x+v.left.x*f,x=v.pos.z+v.left.z*f,y=m.pos.x+m.left.x*f,_=m.pos.z+m.left.z*f,M=y-p,S=_-x,b=Math.hypot(M,S),L=new bt({mass:0,material:i});L.addShape(new us(new E(o,a,b/2+c))),L.position.set((p+y)/2,a-.3,(x+_)/2),h.setFromAxisAngle(d,Math.atan2(M,S)),L.quaternion.copy(h),s.addBody(L)}}}function cS(s,t,e,n,i){const r=i*i,o=r*i;return .5*(2*t+(-s+e)*i+(2*s-5*t+4*e-n)*r+(-s+3*t-3*e+n)*o)}function rn(s,t,e){const n=s.length,i=Math.min(n-2,Math.floor(e)),r=e-i,o=s[Math.max(0,i-1)][t],a=s[i][t],c=s[i+1][t],l=s[Math.min(n-1,i+2)][t];return cS(o,a,c,l,r)}function Ou(s,t){const e=s.hw,n=s.yb,i=s.hip,r=s.yt,o=s.topW,a=[new nt(0,n),new nt(e*.78,n+.015),new nt(e,i),new nt(e*.93,i+(r-i)*.32),new nt(o+(e-o)*.22,r-(r-i)*.14),new nt(o,r-.012),new nt(0,r)],l=new ic(a).getPoints(t-1);for(const h of l)h.x<0&&(h.x=0);return l[0].x=0,l[t-1].x=0,l}function lS(s,t={}){const e=t.ringsPerSegment??8,n=t.profilePoints??14,i=2*(n-1),r=t.capEnds??!0,o=s.length-1,a=o*e,c=[],l=[],h=[];for(let g=0;g<=a;g++){const v=g/a*o,m={z:rn(s,"z",v),hw:rn(s,"hw",v),yb:rn(s,"yb",v),hip:rn(s,"hip",v),yt:rn(s,"yt",v),topW:rn(s,"topW",v)};h.push(m.z);const p=Ou(m,n),x=g/a;for(let y=0;y<n;y++)c.push(p[y].x,p[y].y,m.z),l.push(y/i,x);for(let y=n-2;y>=1;y--)c.push(-p[y].x,p[y].y,m.z),l.push((2*(n-1)-y)/i,x)}const d=[],u=g=>g*i;for(let g=0;g<a;g++){const v=u(g),m=u(g+1);for(let p=0;p<i;p++){const x=(p+1)%i,y=v+p,_=v+x,M=m+p,S=m+x;d.push(y,S,M),d.push(y,_,S)}}if(r){const g=(v,m)=>{let p=0,x=0;for(let M=0;M<i;M++)p+=c[(u(v)+M)*3],x+=c[(u(v)+M)*3+1];p/=i,x/=i;const y=h[v],_=c.length/3;c.push(p,x,y),l.push(.5,m?1:0);for(let M=0;M<i;M++){const S=(M+1)%i,b=u(v)+M,L=u(v)+S;m?d.push(_,b,L):d.push(_,L,b)}};g(0,!1),g(a,!0)}const f=new he;return f.setAttribute("position",new Jt(c,3)),f.setAttribute("uv",new Jt(l,2)),f.setIndex(d),f.computeVertexNormals(),f.setAttribute("uv2",new Jt(l,2)),f.computeBoundingBox(),f.computeBoundingSphere(),f}function zu(s,t={}){const e=t.profilePoints??14,n=t.beltFrac??.6,i=Math.round(n*(e-1)),r=t.zStart,o=t.zEnd,a=t.steps??24,c=t.inset??.012,l=s.length-1,h=p=>rn(s,"z",p),d=p=>{let x=0,y=l;for(let _=0;_<36;_++){const M=(x+y)/2;h(M)<p?x=M:y=M}return(x+y)/2},u=[],f=[];let g=0;for(let p=0;p<=a;p++){const x=r+(o-r)*(p/a),y=d(x),_={hw:rn(s,"hw",y),yb:rn(s,"yb",y),hip:rn(s,"hip",y),yt:rn(s,"yt",y),topW:rn(s,"topW",y)},M=Ou(_,e),S=[];for(let b=i;b<=e-1;b++)S.push(M[b]);for(let b=e-2;b>=i;b--)S.push(new nt(-M[b].x,M[b].y));g=S.length;for(let b=0;b<g;b++){const L=S[b].x*(1-c*1.5),w=S[b].y-c;u.push(L,w,x),f.push(b/(g-1),p/a)}}const v=[];for(let p=0;p<a;p++)for(let x=0;x<g-1;x++){const y=p*g+x,_=p*g+x+1,M=(p+1)*g+x,S=(p+1)*g+x+1;v.push(y,M,S,y,S,_)}const m=new he;return m.setAttribute("position",new Jt(u,3)),m.setAttribute("uv",new Jt(f,2)),m.setIndex(v),m.computeVertexNormals(),m}function Qi(s,t){const e=Math.sin(s*12.9898+t*78.233)*43758.5453;return e-Math.floor(e)}function _h(s){return s=Math.max(0,Math.min(1,s)),s*s*(3-2*s)}function hS(s,t){const e=Math.floor(s),n=Math.floor(t),i=s-e,r=t-n,o=Qi(e,n),a=Qi(e+1,n),c=Qi(e,n+1),l=Qi(e+1,n+1),h=_h(i),d=_h(r);return(o*(1-h)+a*h)*(1-d)+(c*(1-h)+l*h)*d}function Bu(s,t,e=4){let n=.5,i=1,r=0,o=0;for(let a=0;a<e;a++)r+=n*hS(s*i,t*i),o+=n,n*=.5,i*=2;return r/o}function So(s,t,e){const n=new Float32Array(s*s);for(let c=0;c<s;c++)for(let l=0;l<s;l++)n[c*s+l]=t(l/s,c/s);const i=document.createElement("canvas");i.width=s,i.height=s;const r=i.getContext("2d"),o=r.createImageData(s,s);for(let c=0;c<s;c++)for(let l=0;l<s;l++){const h=n[c*s+(l-1+s)%s],d=n[c*s+(l+1)%s],u=n[(c-1+s)%s*s+l],f=n[(c+1)%s*s+l];let g=(h-d)*e,v=(u-f)*e,m=1;const p=Math.hypot(g,v,m)||1;g/=p,v/=p,m/=p;const x=(c*s+l)*4;o.data[x]=(g*.5+.5)*255,o.data[x+1]=(v*.5+.5)*255,o.data[x+2]=(m*.5+.5)*255,o.data[x+3]=255}r.putImageData(o,0,0);const a=new Be(i);return a.wrapS=a.wrapT=Je,a.needsUpdate=!0,a}let hi=null;function uS(){if(hi)return hi;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let r=0;r<s;r++){const o=Qi(r*1,i*1)*Math.PI*2,a=Qi(r*1.7+4.2,i*2.3+1.1)*.5,c=Math.cos(o)*a*.35,l=Math.sin(o)*a*.35,h=Math.sqrt(Math.max(1e-4,1-c*c-l*l)),d=(i*s+r)*4;n.data[d]=(c*.5+.5)*255,n.data[d+1]=(l*.5+.5)*255,n.data[d+2]=(h*.5+.5)*255,n.data[d+3]=255}return e.putImageData(n,0,0),hi=new Be(t),hi.wrapS=hi.wrapT=Je,hi.needsUpdate=!0,hi}let Fr=null;function dS(){return Fr||(Fr=So(128,(s,t)=>Bu(s*14,t*14,3),.6),Fr)}let Ts=null;function fS(){return Ts||(Ts=So(128,(s,t)=>{const n=s*8,i=t*8,r=Math.floor(n),o=Math.floor(i),a=n-r,c=i-o,l=(r+o)%2===0;return .35+Math.sin(l?a*Math.PI:c*Math.PI)*.65},1.4),Ts.repeat.set(1,1),Ts)}let As=null;function pS(){return As||(As=So(128,(s,t)=>{const e=Math.sin(t*Math.PI*26)>.4?0:1,n=Math.sin(s*Math.PI*8)*.15;return e*.8+n+.1},1.6),As.repeat.set(1,1),As)}let ui=null;function mS(){if(ui)return ui;const s=256,t=document.createElement("canvas");t.width=s,t.height=s;const e=t.getContext("2d"),n=e.createImageData(s,s);for(let i=0;i<s;i++)for(let r=0;r<s;r++){const a=.2+Bu(r/s*18,i/s*18,3)*.16,c=(i*s+r)*4;n.data[c]=n.data[c+1]=n.data[c+2]=a*255,n.data[c+3]=255}return e.putImageData(n,0,0),ui=new Be(t),ui.wrapS=ui.wrapT=Je,ui.needsUpdate=!0,ui}let Or=null;function gS(){return Or||(Or=So(128,(s,t)=>{const i=Math.floor(t*9)%2*.5,r=(s*9+i)%1-.5,o=t*9%1-.5;return Math.hypot(r,o)<.34?0:1},1.8),Or)}function vS(s="GT 0142"){const t=document.createElement("canvas");t.width=256,t.height=80;const e=t.getContext("2d");e.fillStyle="#f2f3ea",e.fillRect(0,0,256,80),e.fillStyle="#1d3a8a",e.fillRect(0,0,30,80),e.fillStyle="#ffcb05",e.beginPath(),e.arc(15,22,4,0,Math.PI*2),e.fill(),e.fillStyle="#111417",e.font="bold 52px Arial",e.textBaseline="middle",e.fillText(s,44,44);const n=new Be(t);return n.colorSpace=$t,n.anisotropy=8,n}let Cs=null;function xS(){if(Cs)return Cs;const s=document.createElement("canvas");s.width=128,s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,50,8,64,64,64);return e.addColorStop(0,"#fdfdff"),e.addColorStop(1,"#8b9099"),t.fillStyle=e,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.fill(),t.strokeStyle="#3a3f47",t.lineWidth=5,t.beginPath(),t.arc(64,64,60,0,Math.PI*2),t.stroke(),t.fillStyle="#1b1e24",t.font="bold 56px Arial",t.textAlign="center",t.textBaseline="middle",t.fillText("R",64,66),Cs=new Be(s),Cs.colorSpace=$t,Cs}const va=new Map;function yS(s){const t=new Ft(s),e={};return t.getHSL(e),e.s=Math.min(1,e.s*1),e.l=e.l*.5,t.setHSL(e.h,e.s,e.l),t}function wo(s){if(va.has(s))return va.get(s);const t=uS();t.repeat.set(8,18);const e=new $e({color:yS(s),metalness:.1,roughness:.52,roughnessMap:mS(),clearcoat:.9,clearcoatRoughness:.13,clearcoatNormalMap:dS(),clearcoatNormalScale:new nt(.05,.05),normalMap:t,normalScale:new nt(.05,.05),envMapIntensity:.55});return va.set(s,e),e}let zr=null;function ni(){return zr||(zr=new $e({color:789776,metalness:.3,roughness:.55,clearcoat:.4}),zr)}let Br=null;function Wn(){if(Br)return Br;const s=fS();return s.repeat.set(4,4),Br=new $e({color:1316636,metalness:.45,roughness:.42,clearcoat:.7,clearcoatRoughness:.18,normalMap:s,normalScale:new nt(.5,.5),envMapIntensity:1}),Br}let Gr=null;function Gu(){return Gr||(Gr=new $e({color:329738,metalness:.1,roughness:.06,transmission:.18,thickness:.3,ior:1.5,envMapIntensity:1,clearcoat:1,clearcoatRoughness:.04,transparent:!0,opacity:.88,side:De,polygonOffset:!0,polygonOffsetFactor:-2,polygonOffsetUnits:-2}),Gr)}let Hr=null;function Eo(){return Hr||(Hr=new $e({color:15659509,metalness:1,roughness:.08,envMapIntensity:1.5}),Hr)}let Wr=null;function _S(){if(Wr)return Wr;const s=pS();return s.repeat.set(8,1),Wr=new $e({color:657931,roughness:.92,metalness:0,sheen:.25,sheenRoughness:.5,normalMap:s,normalScale:new nt(.6,.6)}),Wr}let kr=null;function MS(){return kr||(kr=new $e({color:855311,roughness:.78,metalness:0,sheen:.3}),kr)}let Vr=null;function SS(){return Vr||(Vr=new $e({color:13094099,metalness:1,roughness:.22,clearcoat:.5,envMapIntensity:1.3}),Vr)}let Xr=null;function Va(){return Xr||(Xr=new $e({color:1711136,metalness:.9,roughness:.35}),Xr)}let qr=null;function wS(){return qr||(qr=new Bt({color:3817028,metalness:1,roughness:.45}),qr)}let Yr=null;function ES(){return Yr||(Yr=new Bt({color:13114910,metalness:.4,roughness:.35}),Yr)}let jr=null;function bS(){return jr||(jr=new Bt({color:15328989,emissive:16773844,emissiveIntensity:.85,roughness:.25,metalness:0}),jr)}let Kr=null;function TS(){return Kr||(Kr=new $e({color:16777215,metalness:0,roughness:.06,transmission:.9,thickness:.05,ior:1.45,transparent:!0,opacity:.4,envMapIntensity:1.2}),Kr)}function Hu(){return new Bt({color:4852236,emissive:16716834,emissiveIntensity:.6,roughness:.3,metalness:0,transparent:!0,opacity:.7})}let Zr=null;function AS(){if(Zr)return Zr;const s=gS();return s.repeat.set(2,1),Zr=new Bt({color:1053206,metalness:.8,roughness:.5,normalMap:s,normalScale:new nt(1,1)}),Zr}function CS(s,t){let e=s.index?s.toNonIndexed():s.clone();if(e.applyMatrix4(t),!e.getAttribute("uv")){const n=e.getAttribute("position").count;e.setAttribute("uv",new Jt(new Float32Array(n*2),2))}for(const n of Object.keys(e.attributes))n!=="position"&&n!=="normal"&&n!=="uv"&&e.deleteAttribute(n);return e.getAttribute("normal")||e.computeVertexNormals(),e}function Wu(s){s.updateMatrixWorld(!0);const t=new ne().copy(s.matrixWorld).invert(),e=new Map,n=[];s.traverse(i=>{if(!i.isMesh||i.userData.noMerge||i.material.transparent)return;const r=i.material;e.has(r)||e.set(r,{geos:[],cast:!1,receive:!1});const o=e.get(r),a=new ne().multiplyMatrices(t,i.matrixWorld);o.geos.push(CS(i.geometry,a)),o.cast=o.cast||i.castShadow,o.receive=o.receive||i.receiveShadow,n.push(i)});for(const i of n)i.parent&&i.parent.remove(i);for(const[i,r]of e){if(!r.geos.length)continue;const o=r.geos.length===1?r.geos[0]:Fu(r.geos,!1);if(!o)continue;const a=new $(o,i);a.castShadow=r.cast,a.receiveShadow=r.receive,s.add(a)}return s}const xa=.36,ji=.28,ro=.235,ya=new Map,Mh={gt:{spokes:5,twin:!0,spokeW:.045,rim:"bright"},muscle:{spokes:5,twin:!1,spokeW:.085,rim:"bright"},openWheel:{spokes:10,twin:!1,spokeW:.03,rim:"dark"}};function RS(s){const t=new de,e=s.rim==="dark"?Va():SS(),n=new At(s.spokeW,.175,.028);n.translate(0,.145,0);const i=s.spokes;for(let l=0;l<i;l++){const h=l/i*Math.PI*2;if(s.twin)for(const d of[-.05,.05]){const u=new $(n,e);u.rotation.x=h,u.position.set(0,0,0),u.rotation.z=0,u.translateOnAxis(new N(1,0,0),0),u.rotation.x=h+d,t.add(u)}else{const d=new $(n,e);d.rotation.x=h,t.add(d)}}const r=new $(new js(ro-.005,.02,10,40),e);r.rotation.y=Math.PI/2,t.add(r);const o=new $(new xe(.07,.07,.04,20),e);o.rotation.z=Math.PI/2,t.add(o);const a=new $(new xe(.045,.045,.05,18),Eo());a.rotation.z=Math.PI/2,t.add(a);const c=new xe(.014,.014,.03,6);for(let l=0;l<5;l++){const h=l/5*Math.PI*2,d=new $(c,Va());d.rotation.z=Math.PI/2,d.position.set(0,Math.cos(h)*.085,Math.sin(h)*.085),t.add(d)}return t}function PS(s){const t=Mh[s]??Mh.gt,e=LS(s,t);return Wu(e)}function LS(s,t){const e=new de,n=new xe(xa,xa,ji,30,1,!0);n.rotateZ(Math.PI/2);const i=new $(n,_S());i.castShadow=!0,e.add(i);for(const l of[-ji/2,ji/2]){const h=new $(new ac(ro-.01,xa-.005,30),MS());h.rotation.y=Math.PI/2,h.position.x=l,h.scale.x=l<0?-1:1,e.add(h)}const r=new $(new xe(ro,ro,ji*.92,24,1,!0),Va());r.rotateZ(Math.PI/2),e.add(r);const o=new $(new xe(.205,.205,.028,24),wS());o.rotateZ(Math.PI/2),e.add(o);const a=new $(new At(.07,.1,.13),ES());a.position.set(0,.17,.02),e.add(a);const c=RS(t);for(const l of[-ji/2+.02,ji/2-.02]){const h=c.clone();h.position.x=l,e.add(h)}return e}function IS(s="gt"){return ya.has(s)||ya.set(s,PS(s)),ya.get(s).clone()}function ku({z:s=1.92,y:t=.64,x:e=.6}={}){const n=new de,i=ni(),r=TS(),o=bS();for(const a of[-1,1]){const c=new de,l=new $(new At(.44,.13,.12),i);c.add(l);const h=new $(new xe(.045,.05,.07,16),o);h.rotation.x=Math.PI/2,h.position.set(-a*.1,-.005,.055),c.add(h);const d=new $(new js(.052,.012,8,18),i);d.position.set(-a*.1,-.005,.088),c.add(d);const u=new $(new At(.38,.018,.02),o);u.position.set(0,.048,.055),u.rotation.z=a*.06,c.add(u);const f=new $(new At(.45,.15,.035),r);f.position.z=.075,c.add(f),c.position.set(a*e,t,s),c.rotation.y=a>0?-.32:.32,c.rotation.x=-.12,n.add(c)}return n}function Vu({z:s=-2.04,y:t=.74,width:e=1.5}={}){const n=new de,i=new $(new At(e+.06,.16,.1),ni());i.position.set(0,t,s+.02),n.add(i);const r=Hu(),o=new $(new At(e,.09,.05),r);o.position.set(0,t,s-.02),o.userData.noMerge=!0,n.add(o);for(const a of[-1,1]){const c=new $(new xe(.05,.05,.12,16),r);c.rotation.z=Math.PI/2,c.position.set(a*(e/2-.02),t,s-.02),n.add(c)}return{group:n,brakeMesh:o}}function Xu({z:s=.5,y:t=.98,x:e=.95,color:n=13112861}={}){const i=new de,r=wo(n),o=new $e({color:9080985,metalness:1,roughness:.03});for(const a of[-1,1]){const c=new de,l=new $(new xe(.018,.03,.16,10),Wn());l.rotation.z=a*.9,l.position.set(a*.08,.02,0),c.add(l);const h=new $(new Vs(.09,14,10),r);h.scale.set(1.1,.7,.7),h.position.set(a*.17,.05,0),c.add(h);const d=new $(new sc(.06,14),o);d.position.set(a*.18,.05,-.06),d.rotation.y=Math.PI,c.add(d),c.position.set(a*e,t,s),i.add(c)}return i}function qu({z:s=2.02,y:t=.44,w:e=.9,h:n=.22}={}){const i=new de,r=new $(new Ne(e,n),AS());r.position.set(0,t,s),i.add(r);const o=new $(new At(e+.08,n+.06,.05),ni());return o.position.set(0,t,s-.03),i.add(o),i}function Yu({z:s=1.98,y:t=.28,w:e=1.95}={}){const n=new de,i=new $(new At(e,.05,.34),Wn());i.position.set(0,t,s),i.castShadow=!0,n.add(i);for(const r of[-1,1]){const o=new $(new At(.26,.02,.12),Wn());o.position.set(r*(e/2-.05),t+.08,s-.05),o.rotation.z=r*.12,n.add(o)}return n}function ju({z:s=-2,y:t=.3,w:e=1.8}={}){const n=new de,i=new $(new At(e,.16,.5),Wn());i.position.set(0,t,s),i.castShadow=!0,n.add(i);const r=7;for(let o=0;o<r;o++){const a=new $(new At(.03,.18,.5),Wn());a.position.set((o/(r-1)-.5)*(e*.92),t+.02,s),n.add(a)}return n}function Ku({z:s=-1.92,y:t=1.06,span:e=1.62,deckY:n=.82,style:i="gt"}={}){const r=new de;if(i==="ducktail"){const l=new $(new At(e,.06,.34),wo(1118998));return l.position.set(0,n+.1,s+.18),l.rotation.x=-.18,r.add(l),r}const o=new oc;o.moveTo(-.19,0),o.quadraticCurveTo(-.1,.05,.06,.032),o.quadraticCurveTo(.15,.016,.19,0),o.quadraticCurveTo(.06,-.03,-.06,-.028),o.quadraticCurveTo(-.15,-.02,-.19,0);const a=new yo(o,{depth:e,bevelEnabled:!1,steps:1});a.translate(0,0,-e/2),a.rotateY(Math.PI/2);const c=new $(a,Wn());if(c.rotation.x=-.16,c.position.set(0,t,s),c.castShadow=!0,r.add(c),i==="f1"){const l=c.clone();l.position.y=t+.14,l.rotation.x=-.3,l.scale.set(1,.7,.9),r.add(l)}for(const l of[-1,1]){const h=new $(new At(.02,.22,.42),Wn());h.position.set(l*e/2,t,s),r.add(h)}for(const l of[-1,1]){const h=new $(new At(.04,t-n+.06,.1),Eo());h.position.set(l*.55,(t+n)/2,s+.02),r.add(h)}return r}function Zu({z:s=-2.07,y:t=.38,x:e=.45,count:n=2}={}){const i=new de,r=new xe(.06,.07,.16,18);r.rotateX(Math.PI/2);const o=new xe(.045,.045,.17,14);o.rotateX(Math.PI/2);const a=n===4?[-e-.12,-e+.04,e-.04,e+.12]:[-e,e];for(const c of a){const l=new $(r,Eo());l.position.set(c,t,s),i.add(l);const h=new $(o,ni());h.position.set(c,t,s-.01),i.add(h)}return i}function Ju({frontZ:s=2.06,rearZ:t=-2.06,plateY:e=.42}={}){const n=new de,i=new Bt({map:xS(),metalness:.6,roughness:.3}),r=new xe(.05,.05,.012,20);r.rotateX(Math.PI/2);const o=new $(r,i);o.position.set(0,.64,s),n.add(o);const a=new $(r,i);a.position.set(0,.84,t),a.rotation.y=Math.PI,n.add(a);const c=new Bt({map:vS(),roughness:.6,metalness:0}),l=new Ne(.42,.13),h=new $(l,c);return h.position.set(0,e,t-.01),h.rotation.y=Math.PI,n.add(h),n}function Qu({y:s=.2,w:t=1.7,len:e=3.8}={}){const n=new $(new At(t,.04,e),ni());return n.position.set(0,s,0),n}let Jr=null;function DS(){return Jr||(Jr=new Bt({color:723982,roughness:.94,metalness:0,side:De}),Jr)}function $u({zF:s=1.45,zR:t=-1.45,x:e=.86,r:n=.47,width:i=.36}={}){const r=new de,o=new xe(n,n,i,22,1,!0,0,Math.PI);o.rotateZ(Math.PI/2);for(const a of[s,t])for(const c of[-1,1]){const l=new $(o,DS());l.position.set(c*e,0,a),r.add(l)}return r}let Qr=null;function NS(){if(Qr)return Qr;const s=document.createElement("canvas");s.width=s.height=128;const t=s.getContext("2d"),e=t.createRadialGradient(64,64,8,64,64,62);return e.addColorStop(0,"rgba(0,0,0,0.55)"),e.addColorStop(.6,"rgba(0,0,0,0.28)"),e.addColorStop(1,"rgba(0,0,0,0)"),t.fillStyle=e,t.fillRect(0,0,128,128),Qr=new Be(s),Qr}function US({y:s=-.355,w:t=2.3,len:e=4.8}={}){const n=new ls({map:NS(),transparent:!0,depthWrite:!1,opacity:.8}),i=new $(new Ne(t,e),n);return i.rotation.x=-Math.PI/2,i.position.set(0,s,0),i.renderOrder=-1,i}const td=[{z:-2.16,hw:.86,yb:-.14,hip:.12,yt:.3,topW:.74},{z:-1.78,hw:1,yb:0,hip:.1,yt:.42,topW:.82},{z:-1.45,hw:1.01,yb:.05,hip:.09,yt:.46,topW:.8},{z:-1.05,hw:.97,yb:-.18,hip:.14,yt:.72,topW:.56},{z:-.45,hw:.95,yb:-.2,hip:.16,yt:.88,topW:.52},{z:.2,hw:.96,yb:-.18,hip:.13,yt:.7,topW:.62},{z:.8,hw:.99,yb:-.16,hip:.06,yt:.4,topW:.82},{z:1.45,hw:1.01,yb:.05,hip:.04,yt:.42,topW:.8},{z:1.8,hw:.98,yb:0,hip:.06,yt:.38,topW:.74},{z:2.04,hw:.82,yb:-.06,hip:.08,yt:.3,topW:.58},{z:2.2,hw:.46,yb:.02,hip:.08,yt:.22,topW:.34}],FS="gt";function OS(s,t){const e=new $(zu(td,{zStart:.28,zEnd:-1.16,beltFrac:.6,steps:26}),Gu());s.add(e),s.add(ku({z:1.92,y:.16,x:.6}));const n=Vu({z:-2.06,y:.16,width:1.46});return s.add(n.group),s.add(Xu({z:.3,y:.3,x:.96,color:t.color})),s.add(qu({z:2.04,y:-.08,w:.86,h:.2})),s.add(Yu({z:1.99,y:-.3,w:1.96})),s.add(ju({z:-2,y:-.26,w:1.8})),s.add(Ku({z:-1.9,y:.6,span:1.6,deckY:.4,style:"gt"})),s.add(Zu({z:-2.08,y:-.18,x:.45,count:2})),s.add(Ju({frontZ:2.07,rearZ:-2.08,plateY:-.04})),s.add(Qu({y:-.3,w:1.64,len:3.8})),s.add($u({zF:1.45,zR:-1.45,x:.86})),{brakeLights:n.brakeMesh}}const zS=Object.freeze(Object.defineProperty({__proto__:null,decorate:OS,keys:td,wheelStyle:FS},Symbol.toStringTag,{value:"Module"})),ed=[{z:-2.18,hw:.92,yb:-.12,hip:.14,yt:.4,topW:.8},{z:-1.8,hw:1.05,yb:.02,hip:.1,yt:.52,topW:.88},{z:-1.45,hw:1.06,yb:.06,hip:.1,yt:.56,topW:.86},{z:-1.05,hw:1,yb:-.16,hip:.16,yt:.86,topW:.66},{z:-.55,hw:.98,yb:-.18,hip:.18,yt:.92,topW:.62},{z:.05,hw:.99,yb:-.16,hip:.15,yt:.82,topW:.7},{z:.55,hw:1.02,yb:-.14,hip:.06,yt:.48,topW:.86},{z:1.45,hw:1.05,yb:.06,hip:.04,yt:.46,topW:.84},{z:1.95,hw:.94,yb:-.02,hip:.06,yt:.44,topW:.72},{z:2.22,hw:.62,yb:.04,hip:.08,yt:.34,topW:.46}],BS="muscle";function GS(s,t){const e=new $(zu(ed,{zStart:.45,zEnd:-1.12,beltFrac:.62,steps:24}),Gu());s.add(e);const n=new $(new At(.6,.12,.9),ni());n.position.set(0,.52,1.05),s.add(n);const i=new $(new At(.5,.08,.12),Wn());i.position.set(0,.55,1.5),s.add(i),s.add(ku({z:1.96,y:.22,x:.62}));const r=Vu({z:-2.08,y:.24,width:1.6});return s.add(r.group),s.add(Xu({z:.55,y:.36,x:1,color:t.color})),s.add(qu({z:2.06,y:0,w:1.1,h:.26})),s.add(Yu({z:2,y:-.3,w:2})),s.add(ju({z:-2.05,y:-.24,w:1.9})),s.add(Ku({z:-1.95,deckY:.5,span:1.7,style:"ducktail"})),s.add(Zu({z:-2.12,y:-.16,x:.5,count:4})),s.add(Ju({frontZ:2.1,rearZ:-2.1,plateY:0})),s.add(Qu({y:-.3,w:1.7,len:4})),s.add($u({zF:1.45,zR:-1.45,x:.88})),{brakeLights:r.brakeMesh}}const HS=Object.freeze(Object.defineProperty({__proto__:null,decorate:GS,keys:ed,wheelStyle:BS},Symbol.toStringTag,{value:"Module"})),WS=[{z:-2.1,hw:.28,yb:-.08,hip:0,yt:.2,topW:.18},{z:-1.55,hw:.4,yb:-.1,hip:0,yt:.4,topW:.28},{z:-.95,hw:.44,yb:-.1,hip:.04,yt:.56,topW:.34},{z:-.35,hw:.5,yb:-.12,hip:.05,yt:.34,topW:.44},{z:.35,hw:.46,yb:-.12,hip:.03,yt:.28,topW:.4},{z:1.05,hw:.36,yb:-.1,hip:0,yt:.2,topW:.3},{z:1.55,hw:.28,yb:-.08,hip:0,yt:.16,topW:.22},{z:2.05,hw:.15,yb:-.02,hip:0,yt:.12,topW:.12}],kS="openWheel";function Sh({z:s,y:t,span:e,chord:n=.32,mat:i,tilt:r=-.12,elements:o=1}){const a=new de,c=new oc;c.moveTo(-n/2,0),c.quadraticCurveTo(-n*.25,.045,n*.18,.028),c.quadraticCurveTo(n*.42,.012,n/2,0),c.quadraticCurveTo(n*.18,-.028,-n*.18,-.025),c.quadraticCurveTo(-n*.4,-.018,-n/2,0);const l=new yo(c,{depth:e,bevelEnabled:!1});l.translate(0,0,-e/2),l.rotateY(Math.PI/2);for(let h=0;h<o;h++){const d=new $(l,i);d.rotation.x=r-h*.18,d.position.set(0,t+h*.12,s+h*.05),d.castShadow=!0,a.add(d)}for(const h of[-1,1]){const d=new $(new At(.025,.26,n*1.3),i);d.position.set(h*e/2,t+.05,s),a.add(d)}return a}function VS(s,t){const e=wo(t.color),n=Wn(),i=new $(new xe(.12,.16,.22,16,1,!1,0,Math.PI),n);i.rotation.set(Math.PI/2,0,0),i.position.set(0,.5,-.78),s.add(i);const r=ni(),o=new $(new js(.3,.025,10,24,Math.PI),r);o.rotation.set(0,Math.PI/2,0),o.position.set(0,.16,-.3),s.add(o);const a=new $(new xe(.03,.03,.26,8),r);a.position.set(0,.12,.18),a.rotation.x=.2,s.add(a);const c=new $(new At(.34,.18,.22),n);c.position.set(0,.26,-.62),s.add(c);const l=new $(new Vs(.13,16,12),e);l.scale.set(1,1.1,1.15),l.position.set(0,.26,-.42),s.add(l);const h=new $(new Vs(.118,16,8,0,Math.PI*2,.7,.5),new $e({color:1053720,roughness:.1,metalness:.2}));h.scale.set(1,1.1,1.15),h.position.set(0,.27,-.41),s.add(h);for(const v of[-1,1]){const m=new $(new At(.34,.3,1.2),e);m.geometry.translate(0,0,0),m.position.set(v*.52,-.05,.05),m.scale.set(1,1,1),m.castShadow=!0,s.add(m);const p=new $(new At(.3,.24,.08),n);p.position.set(v*.52,-.04,.66),s.add(p)}for(const v of[-1,1]){const m=new $(new At(.02,.22,.5),n);m.position.set(v*.62,-.12,.85),m.rotation.y=v*.2,s.add(m)}s.add(Sh({z:1.95,y:-.22,span:1.75,chord:.42,mat:n,tilt:.06,elements:2}));for(const v of[-1,1]){const m=new $(new At(.04,.22,.1),n);m.position.set(v*.12,-.12,1.9),s.add(m)}s.add(Sh({z:-1.95,y:.5,span:1.25,chord:.34,mat:n,tilt:-.34,elements:2}));for(const v of[-1,1]){const m=new $(new At(.05,.7,.1),n);m.position.set(v*.18,.2,-1.95),s.add(m)}const d=Hu(),u=new $(new At(.08,.12,.05),d);u.position.set(0,.12,-2.06),u.userData.noMerge=!0,s.add(u);const f=new $((()=>{const v=new xe(.06,.06,.2,14);return v.rotateX(Math.PI/2),v})(),Eo());f.position.set(0,.06,-2.12),s.add(f);const g=new $(new At(1,.04,3.4),ni());return g.position.set(0,-.32,-.1),s.add(g),{brakeLights:u}}const XS=Object.freeze(Object.defineProperty({__proto__:null,decorate:VS,keys:WS,wheelStyle:kS},Symbol.toStringTag,{value:"Module"})),wh={gt:zS,muscle:HS,"open-wheel":XS},qS=-.37,_a=new Map;function YS(s,t){return _a.has(s)||_a.set(s,t.keys?lS(t.keys,{ringsPerSegment:9,profilePoints:16}):null),_a.get(s)}function jS(s="gt",t=13112861){const e=wh[s]||wh.gt,n=new de,i=new de;i.position.y=qS,n.add(i);const r=wo(t),o=YS(s,e);if(o){const l=new $(o,r);l.castShadow=!0,l.receiveShadow=!0,l.userData.noMerge=!0,i.add(l)}const a=e.decorate(i,{color:t});Wu(i);const c=[];for(let l=0;l<4;l++)c.push(IS(e.wheelStyle));return i.add(US()),{root:n,wheels:c,brakeLights:a.brakeLights,_brakeLevel:0}}const Ma={x:.92,y:.32,z:2.18},Rs=.36,KS=.32,Eh=2.9,Lt={massKg:1350,idleRpm:1100,redlineRpm:7600,shiftUpRpm:7250,shiftDownRpm:3300,shiftTime:.22,torqueCurve:[[1e3,320],[2200,430],[3500,505],[4900,540],[5900,525],[6800,500],[7300,472],[7600,440]],gears:[3.45,2.28,1.71,1.34,1.08,.9],reverseRatio:3.3,finalDrive:3.55,drivelineEff:.88,engineBrakeNm:36,airDensity:1.225,cdA:.92,clA:2.1,downforcePos:-.25,crr:.014,mu:{road:1.45,kerb:1.22,grass:.55,gravel:.5},surfaceDrag:{road:0,kerb:0,grass:.12,gravel:.2},scrubCoef:.38,brakeFront:50,brakeRear:28,handbrake:55,maxSteer:.62,steerSlipMargin:2,steerFloor:.02,maxReverseSpeed:8.5};function ZS(s){const t=Lt.torqueCurve;if(s<=t[0][0])return t[0][1];for(let e=1;e<t.length;e++)if(s<=t[e][0]){const n=(s-t[e-1][0])/(t[e][0]-t[e-1][0]);return t[e-1][1]+(t[e][1]-t[e-1][1])*n}return t[t.length-1][1]}function nd(s,t,e={}){const n=e.color??13112861,i=e.archetype??"gt",r=jS(i,n),o=new us(new E(Ma.x,Ma.y,Ma.z)),a=new bt({mass:Lt.massKg,material:t.chassisMat});a.addShape(o,new E(0,.2,0)),a.shapeOffsets[0].y=-.05,a.angularDamping=.25;const c=new Cy({chassisBody:a,indexRightAxis:0,indexUpAxis:1,indexForwardAxis:2}),l={radius:Rs,directionLocal:new E(0,-1,0),suspensionStiffness:46,suspensionRestLength:KS,frictionSlip:Lt.mu.road,dampingRelaxation:2.6,dampingCompression:4.8,maxSuspensionForce:1e5,rollInfluence:.05,axleLocal:new E(-1,0,0),chassisConnectionPointLocal:new E,maxSuspensionTravel:.3,customSlidingRotationalSpeed:-30,useCustomSlidingRotationalSpeed:!0,forwardAcceleration:.55},h=Eh/2,d=.86,u=-.05;[new E(d,u,h),new E(-d,u,h),new E(d,u,-h),new E(-d,u,-h)].forEach(D=>{c.addWheel({...l,chassisConnectionPointLocal:D})}),c.addToWorld(s);const g={gear:1,mode:"D",shiftT:0,rpm:Lt.idleRpm,smoothedRpm:Lt.idleRpm,steer:0,surfaces:["road","road","road","road"]},v={rpm:Lt.idleRpm,rpmFrac:0,gearLabel:"N",speedKmh:0};new E;const m=new E,p=new E,x=new E;function y(){const D=a.quaternion,z=2*(D.x*D.z+D.w*D.y),C=1-2*(D.x*D.x+D.y*D.y),I=a.velocity;return I.x*z+I.z*C}function _(){const D=a.quaternion,z=1-2*(D.y*D.y+D.z*D.z),C=2*(D.x*D.z-D.w*D.y),I=a.velocity;return I.x*z+I.z*C}function M(){const D=a.velocity,z=D.x*D.x+D.y*D.y+D.z*D.z,C=Math.sqrt(z);if(C>.5){const V=.5*Lt.airDensity*Lt.cdA*z;m.set(-D.x/C*V,-D.y/C*V,-D.z/C*V),a.applyForce(m,E.ZERO)}const I=D.x*D.x+D.z*D.z,U=.5*Lt.airDensity*Lt.clA*I;if(U>1){const V=a.quaternion;x.set(2*(V.x*V.y-V.w*V.z),1-2*(V.x*V.x+V.z*V.z),2*(V.y*V.z+V.w*V.x)),m.set(-x.x*U,-x.y*U,-x.z*U);const X=Lt.downforcePos;p.set(2*(V.x*V.z+V.w*V.y)*X,2*(V.y*V.z-V.w*V.x)*X,(1-2*(V.x*V.x+V.y*V.y))*X),a.applyForce(m,p)}let Y=0;for(let V=0;V<4;V++){const X=c.wheelInfos[V];if(!X.isInContact)continue;Y+=X.suspensionForce;const q=Lt.surfaceDrag[g.surfaces[V]]||0;if(q>0&&C>.5){const et=q*X.suspensionForce;m.set(-D.x/C*et,0,-D.z/C*et),p.set(X.raycastResult.hitPointWorld.x-a.position.x,0,X.raycastResult.hitPointWorld.z-a.position.z),a.applyForce(m,p)}}if(C>.5&&Y>0){const V=Lt.crr*Y;m.set(-D.x/C*V,0,-D.z/C*V),a.applyForce(m,E.ZERO)}const G=y(),k=_();if(Math.hypot(G,k)>4){const V=Math.atan2(Math.abs(k),Math.abs(G));if(V>.035){const X=Lt.scrubCoef*Math.sin(V)*Math.max(Y,1);m.set(-D.x/C*X,0,-D.z/C*X),a.applyForce(m,E.ZERO)}}}s.addEventListener("preStep",M);function S(D,z,C){if(C)for(let ht=0;ht<4;ht++)g.surfaces[ht]=C[ht];const I=y(),U=Math.hypot(a.velocity.x,a.velocity.z);g.mode==="D"&&D.brake>.1&&I<.5&&U<1?(g.mode="R",g.gear=1):g.mode==="R"&&D.throttle>.1&&I>-.5&&(g.mode="D",g.gear=1);const Y=ht=>Lt.gears[ht-1]*Lt.finalDrive;if(g.shiftT>0&&(g.shiftT-=z),g.mode==="D"){const ht=Math.max(0,I)/(2*Math.PI*Rs)*60;g.rpm=Math.max(Lt.idleRpm,ht*Y(g.gear)),g.shiftT<=0&&(g.rpm>Lt.shiftUpRpm&&g.gear<Lt.gears.length?(g.gear+=1,g.shiftT=Lt.shiftTime):g.rpm<Lt.shiftDownRpm&&g.gear>1&&(g.gear-=1,g.shiftT=Lt.shiftTime*.6)),g.rpm=Math.min(Lt.redlineRpm,Math.max(Lt.idleRpm,ht*Y(g.gear)))}else{const ht=Math.abs(Math.min(0,I))/(2*Math.PI*Rs)*60;g.rpm=Math.min(Lt.redlineRpm,Math.max(Lt.idleRpm,ht*Lt.reverseRatio*Lt.finalDrive))}let G=0,k=0;const Q=g.mode==="D"?D.throttle:D.brake,V=g.mode==="D"?D.brake:D.throttle;if(Q>.02&&g.shiftT<=0){const ht=g.mode==="D"?Y(g.gear):Lt.reverseRatio*Lt.finalDrive;G=ZS(g.rpm)*Q*ht*Lt.drivelineEff/Rs;const at=a.angularVelocity.y,J=Math.abs(U*at),lt=(c.wheelInfos[2].suspensionForce||0)+(c.wheelInfos[3].suspensionForce||0),tt=((Lt.mu[g.surfaces[2]]??Lt.mu.road)+(Lt.mu[g.surfaces[3]]??Lt.mu.road))/2,Ct=Lt.massKg*J*.5*1.3,xt=(tt*lt)**2-Ct**2,R=xt>0?Math.sqrt(xt):0;lt>100&&(G=Math.min(G,R)),g.mode==="R"&&(G=-G,-I>Lt.maxReverseSpeed&&(G=0))}else Q<=.02&&g.mode==="D"&&I>1&&(G=-(Lt.engineBrakeNm*(g.rpm/Lt.redlineRpm))*Y(g.gear)*Lt.drivelineEff/Rs);V>.02&&(g.mode==="D"&&I>.5||g.mode==="R"&&I<-.5)&&(k=V),c.applyEngineForce(-G/2,2),c.applyEngineForce(-G/2,3);const X=Lt.brakeFront*k;let q=Lt.brakeRear*k;D.handbrake&&(q=Math.max(q,Lt.handbrake)),c.setBrake(X,0),c.setBrake(X,1),c.setBrake(q,2),c.setBrake(q,3);const et=Lt.mu.road*9.82*Lt.steerSlipMargin,ut=Math.max(1,U*U),pt=Math.min(Lt.maxSteer,et*Eh/ut+Lt.steerFloor),it=-D.steer*pt,vt=4*Math.max(pt,.12),St=Mn.clamp(it-g.steer,-vt*z,vt*z);g.steer+=St,c.setSteeringValue(g.steer,0),c.setSteeringValue(g.steer,1);for(let ht=0;ht<4;ht++){let F=Lt.mu[g.surfaces[ht]]??Lt.mu.road;D.handbrake&&ht>=2&&(F*=.55),c.wheelInfos[ht].frictionSlip=F}g.smoothedRpm+=(g.rpm-g.smoothedRpm)*Math.min(1,z*12),v.rpm=g.smoothedRpm,v.rpmFrac=Mn.clamp((g.smoothedRpm-Lt.idleRpm)/(Lt.redlineRpm-Lt.idleRpm),0,1),v.speedKmh=U*3.6,U<.6&&Q<.05?v.gearLabel="N":g.mode==="R"?v.gearLabel="R":v.gearLabel=String(g.gear);const mt=Math.min(1,Math.max(k,D.handbrake?.8:0));w(mt*1.6)}const b=r.wheels;function L(){for(let D=0;D<c.wheelInfos.length;D++){c.updateWheelTransform(D);const z=c.wheelInfos[D].worldTransform,C=b[D];C.position.copy(z.position),C.quaternion.copy(z.quaternion)}r.root.position.copy(a.position),r.root.quaternion.copy(a.quaternion),r.brakeLights.material.emissiveIntensity=r._brakeLevel,r.brakeLights.material.opacity=.5+r._brakeLevel*.5}function w(D){r._brakeLevel=D}function T(D,z=0){a.position.set(D.x,D.y,D.z),a.velocity.setZero(),a.angularVelocity.setZero();const C=new fe;C.setFromAxisAngle(new E(0,1,0),z),a.quaternion.copy(C),g.gear=1,g.mode="D",g.shiftT=0,g.steer=0,g.rpm=Lt.idleRpm,c.applyEngineForce(0,2),c.applyEngineForce(0,3),c.setSteeringValue(0,0),c.setSteeringValue(0,1);for(let I=0;I<4;I++)c.setBrake(0,I)}function O(){s.removeEventListener("preStep",M),c.removeFromWorld(s),s.removeBody(a)}return{visual:r,body:a,vehicle:c,update:L,setBrakeLight:w,reset:T,applyControls:S,dispose:O,telemetry:v,spec:Lt}}function JS(s){const t=new Set,e={throttle:0,brake:0,steer:0,handbrake:!1,cameraToggle:!1,reset:!1,rescue:!1,lineToggle:!1},n=tw(s),i=u=>{t.add(u.code),$r(u.code,s.cameraToggle)&&(e.cameraToggle=!0),$r(u.code,s.reset)&&(e.reset=!0),$r(u.code,s.rescue)&&(e.rescue=!0),$r(u.code,s.lineToggle)&&(e.lineToggle=!0),n.has(u.code)&&u.preventDefault()},r=u=>t.delete(u.code),o=()=>t.clear();window.addEventListener("keydown",i),window.addEventListener("keyup",r),window.addEventListener("blur",o);function a(u){const f=Ps(t,s.throttle),g=Ps(t,s.brake),v=Ps(t,s.left),m=Ps(t,s.right);e.handbrake=Ps(t,s.handbrake),e.throttle=Sa(e.throttle,f?1:0,u*(f?4:6)),e.brake=Sa(e.brake,g?1:0,u*(g?6:8));let p=0;return v&&(p-=1),m&&(p+=1),e.steer=Sa(e.steer,p,u*(p===0?6:3.2)),e}function c(){const u=e.cameraToggle;return e.cameraToggle=!1,u}function l(){const u=e.reset;return e.reset=!1,u}function h(){const u=e.rescue;return e.rescue=!1,u}function d(){const u=e.lineToggle;return e.lineToggle=!1,u}return{update:a,consumeToggle:c,consumeReset:l,consumeRescue:h,consumeLineToggle:d,state:e}}const bh={throttle:["KeyW","ArrowUp"],brake:["KeyS","ArrowDown"],left:["KeyA","ArrowLeft"],right:["KeyD","ArrowRight"],handbrake:"Space",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},QS={throttle:"KeyW",brake:"KeyS",left:"KeyA",right:"KeyD",handbrake:"ShiftLeft",cameraToggle:"KeyC",reset:"KeyR",rescue:"KeyB",lineToggle:"KeyL"},$S={throttle:"ArrowUp",brake:"ArrowDown",left:"ArrowLeft",right:"ArrowRight",handbrake:"Numpad0",cameraToggle:null,reset:null,rescue:null,lineToggle:null};function Ps(s,t){return t?Array.isArray(t)?t.some(e=>s.has(e)):s.has(t):!1}function $r(s,t){return t?Array.isArray(t)?t.includes(s):s===t:!1}function tw(s){const t=new Set;for(const e of Object.values(s))e&&(Array.isArray(e)?e.forEach(n=>t.add(n)):t.add(e));return t}function Sa(s,t,e){const n=1-Math.exp(-e);return s+(t-s)*n}function ew(s){let t=0;const e=new N,n=new N,i=new N,r=new N;let o=!1;const a=new gn;new N;const c=new N,l=new N,h=new N(0,1,0),d=[{dist:7.2,height:2.7,lookHeight:1,fov:62,lag:.18},{dist:0,height:1.05,lookHeight:1.05,fov:72,lag:.04,hood:!0},{dist:10,height:4,lookHeight:1.2,fov:56,lag:.32}];function u(g,v,m){const p=d[t];if(s.fov+=(p.fov-s.fov)*Math.min(1,g*6),s.updateProjectionMatrix(),a.set(v.quaternion.x,v.quaternion.y,v.quaternion.z,v.quaternion.w),c.set(0,0,1).applyQuaternion(a).normalize(),l.crossVectors(h,c).normalize(),p.hood)e.set(v.position.x,v.position.y+p.height,v.position.z).add(c.clone().multiplyScalar(.25)),n.copy(e).add(c.clone().multiplyScalar(8));else{const y=p.dist+Math.min(2.5,m*.04),_=p.height+Math.min(.8,m*.012);e.copy(v.position).add(c.clone().multiplyScalar(-y)).add(h.clone().multiplyScalar(_)),n.copy(v.position).add(c.clone().multiplyScalar(2)).add(h.clone().multiplyScalar(p.lookHeight))}o||(i.copy(e),r.copy(n),o=!0);const x=1-Math.exp(-g/Math.max(.001,p.lag));i.lerp(e,x),r.lerp(n,Math.min(1,x*1.4)),s.position.copy(i),s.lookAt(r)}function f(){t=(t+1)%d.length,o=!1}return{update:u,cycle:f,getMode:()=>t}}function nw(s=320){const t=document.getElementById("rpm-arc"),e=document.getElementById("speed-num"),n=document.getElementById("gear-num"),i=document.getElementById("lap-current"),r=document.getElementById("lap-total"),o=document.getElementById("lap-time"),a=document.getElementById("best-time"),c=document.getElementById("hud-position-block"),l=document.getElementById("pos-current"),h=document.getElementById("pos-total"),d=document.getElementById("race-banner"),u=document.getElementById("wrong-way"),f=document.getElementById("pace-pill"),g=document.getElementById("pace-target"),v=document.getElementById("pace-delta");let m=null;const p=document.getElementById("ticks"),x=110,y=110,_=96,M=Math.PI*.75,S=Math.PI*.25+Math.PI*2;for(let it=0;it<=16;it++){const vt=it/16,St=M+(S-M)*vt,mt=x+Math.cos(St)*(_-2),ht=y+Math.sin(St)*(_-2),F=x+Math.cos(St)*(_-(it%4===0?16:9)),at=y+Math.sin(St)*(_-(it%4===0?16:9)),J=document.createElementNS("http://www.w3.org/2000/svg","line");J.setAttribute("x1",mt),J.setAttribute("y1",ht),J.setAttribute("x2",F),J.setAttribute("y2",at),J.setAttribute("stroke",it%4===0?"rgba(255,255,255,0.85)":"rgba(255,255,255,0.35)"),J.setAttribute("stroke-width",it%4===0?"2":"1"),p.appendChild(J)}const b=document.getElementById("minimap"),L=b.getContext("2d");let w=null,T=null,O=null;function D(it,vt,St){const mt=St!=null?Math.max(0,Math.min(1,St)):Math.max(0,Math.min(1,it/s)),ht=M,F=M+(S-M)*mt,at=x+Math.cos(ht)*_,J=y+Math.sin(ht)*_,lt=x+Math.cos(F)*_,tt=y+Math.sin(F)*_,Ct=F-ht>Math.PI?1:0;t.setAttribute("d",`M ${at} ${J} A ${_} ${_} 0 ${Ct} 1 ${lt} ${tt}`),e.textContent=Math.round(it),n.textContent=vt}function z(it,vt){i.textContent=it,r.textContent=vt}function C(it){o.textContent=Th(it)}function I(it){a.textContent=it==null?"--:--.---":Th(it)}function U(it,vt){c.classList.remove("hidden"),l.textContent=it,h.textContent=vt}function Y(){c.classList.add("hidden")}function G(it,vt=1800){d.textContent=it,d.classList.remove("hidden"),m&&clearTimeout(m),m=setTimeout(()=>{d.classList.add("hidden"),m=null},vt)}function k(it){u.classList.toggle("hidden",!it)}function Q(it,vt){f.classList.remove("hidden"),g.textContent=Math.round(it);let St,mt;vt>3?(St="pace-over",mt=`+${Math.round(vt)} TOO FAST`):vt<-8?(St="pace-under",mt=`−${Math.round(-vt)} COULD GO FASTER`):(St="pace-on",mt="ON PACE"),v.textContent=mt,v.className=St}function V(){f.classList.add("hidden")}function X(){m&&(clearTimeout(m),m=null),d.classList.add("hidden"),u.classList.add("hidden")}function q(){document.getElementById("ui").classList.remove("hidden")}function et(){document.getElementById("ui").classList.add("hidden")}function ut(it){const vt=it.frames;let St=1/0,mt=-1/0,ht=1/0,F=-1/0;for(const yt of vt)yt.pos.x<St&&(St=yt.pos.x),yt.pos.x>mt&&(mt=yt.pos.x),yt.pos.z<ht&&(ht=yt.pos.z),yt.pos.z>F&&(F=yt.pos.z);const at=18,J=b.width,lt=b.height,tt=mt-St,Ct=F-ht,xt=(J-at*2)/tt,R=(lt-at*2)/Ct,A=Math.min(xt,R),H=(J-tt*A)/2-St*A,ot=(lt-Ct*A)/2-ht*A;w={minX:St,maxX:mt,minZ:ht,maxZ:F,scale:A,ox:H,oz:ot};const st=new Path2D;for(let yt=0;yt<vt.length;yt++){const gt=vt[yt].pos.x*A+H,wt=vt[yt].pos.z*A+ot;yt===0?st.moveTo(gt,wt):st.lineTo(gt,wt)}st.closePath(),T=st;const rt=vt[0];O={x:rt.pos.x*A+H,y:rt.pos.z*A+ot}}function pt(it){if(!T)return;const vt=b.width,St=b.height;L.clearRect(0,0,vt,St),L.lineWidth=12,L.lineJoin="round",L.lineCap="round",L.strokeStyle="rgba(255, 255, 255, 0.10)",L.stroke(T),L.lineWidth=6,L.strokeStyle="rgba(220, 230, 240, 0.85)",L.stroke(T),O&&(L.fillStyle="rgba(255, 215, 74, 0.9)",L.beginPath(),L.arc(O.x,O.y,4,0,Math.PI*2),L.fill(),L.strokeStyle="rgba(0, 0, 0, 0.6)",L.lineWidth=1,L.stroke());const mt=[...it].sort((ht,F)=>(ht.isPlayer?1:0)-(F.isPlayer?1:0));for(const ht of mt){const F=ht.pos.x*w.scale+w.ox,at=ht.pos.z*w.scale+w.oz,J=ht.isPlayer?5:4;L.beginPath(),L.arc(F,at,J+2,0,Math.PI*2),L.fillStyle="rgba(0, 0, 0, 0.55)",L.fill(),L.beginPath(),L.arc(F,at,J,0,Math.PI*2),L.fillStyle=iw(ht.color),L.fill(),ht.isPlayer&&(L.strokeStyle="#fff",L.lineWidth=1.4,L.stroke())}}return{setSpeed:D,setLap:z,setLapTime:C,setBest:I,setPosition:U,hidePosition:Y,setPace:Q,hidePace:V,flashBanner:G,setWrongWay:k,clearAnnouncements:X,show:q,hide:et,buildMinimap:ut,drawMinimap:pt}}function iw(s){const t=s>>16&255,e=s>>8&255,n=s&255;return`rgb(${t}, ${e}, ${n})`}function Th(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3;return`${wa(e,2)}:${wa(n,2)}.${wa(i,3)}`}function wa(s,t){return s.toString().padStart(t,"0")}function id(s,t={}){const e=t.skill??.85,n=9.82*1.45*(.62+.3*e),i=8.5,r=46+14*e,o={throttle:0,brake:0,steer:0,handbrake:!1},a=s.frames,c=a.length,l=new Float32Array(c);for(let x=0;x<c;x++)l[x]=a[x].pos.distanceTo(a[(x+1)%c].pos);const h=new Float32Array(c);for(let x=0;x<c;x++){const y=a[x].tan,_=a[(x+1)%c].tan,M=Math.max(0,1-y.dot(_)),S=Math.sqrt(2*M);h[x]=S/Math.max(.5,l[x])}const d=new Float32Array(c);for(let x=0;x<c;x++){let y=0;for(let _=-2;_<=2;_++)y+=h[(x+_+c)%c];d[x]=y/5}const u=new Float32Array(c);for(let x=0;x<c;x++)u[x]=Math.min(r,Math.sqrt(n/Math.max(1e-4,d[x])));for(let x=0;x<2;x++)for(let y=c-1;y>=0;y--){const _=u[(y+1)%c],M=Math.sqrt(_*_+2*i*l[y]);u[y]>M&&(u[y]=M)}const f=new N,g=new N;let v=0,m=0;function p(x,y,_=1/60){const M=x.body.position,S=sw(a,M),b=Math.hypot(x.body.velocity.x,x.body.velocity.z),L=2+Math.floor(b/18);let w=1/0;for(let pt=0;pt<=L;pt++)w=Math.min(w,u[(S+pt)%c]);const T=Math.max(7,b*.55);let O=S,D=0;for(;D<T;)D+=l[O%c],O++;const z=a[O%c].pos,C=x.body.quaternion,I=2*(C.x*C.z+C.w*C.y),U=1-2*(C.x*C.x+C.y*C.y);g.set(I,0,U).normalize(),f.set(z.x-M.x,0,z.z-M.z);const Y=Math.max(2,f.length());f.normalize();const G=Mn.clamp(g.dot(f),-1,1),k=Math.acos(G),V=g.x*f.z-g.z*f.x<0?-k:k,q=2*Math.sin(V)/Y*2.9,et=Math.max(1,b*b),ut=Math.min(.62,1.45*9.82*2*2.9/et+.02);if(o.steer=Mn.clamp(q/ut,-1,1),b<w-.5){const pt=Math.min(1,Math.abs(o.steer));o.throttle=Mn.lerp(1,.55,pt*.7),o.brake=0}else b>w+1?(o.throttle=0,o.brake=Mn.clamp((b-w)/6,.2,1)):(o.throttle=.35,o.brake=0);if(y)for(const pt of y){if(!pt||pt===x)continue;const it=pt.body.position.x-M.x,vt=pt.body.position.z-M.z,St=it*g.x+vt*g.z,mt=-it*g.z+vt*g.x,ht=Math.max(12,b*.95);if(St<1||St>ht||Math.abs(mt)>2.4)continue;const F=pt.body.velocity,at=b-Math.hypot(F.x,F.z);if(St<6.5)o.throttle=0,o.brake=Math.max(o.brake,at>1?1:.5);else if(at>0){const J=at*at/(2*Math.max(1,St-6));o.brake=Math.max(o.brake,Mn.clamp(J/6,0,1)),(o.brake>.1||St<b*.45)&&(o.throttle=Math.min(o.throttle,.35))}Math.abs(o.steer)<.5&&(o.steer=Mn.clamp(o.steer+(mt>=0?-.15:.15),-1,1))}return m>0?(m-=_,o.throttle=0,o.brake=1,o.steer=-o.steer):(b<1.5&&o.throttle>.5?v+=_:v=Math.max(0,v-_*2),v>1.2&&(v=0,m=1.5)),o}return{update:p}}function sw(s,t){let e=0,n=1/0;for(let i=0;i<s.length;i++){const r=s[i].pos.x-t.x,o=s[i].pos.z-t.z,a=r*r+o*o;a<n&&(n=a,e=i)}return e}const rw=13,ow=10,aw=7.5,cw=71,lw=215e3,sd=1350,hw=.5*1.225*.92,uw=.014*sd*9.82,dw=.55,Ah=.045,fw=[1,.13,.1],to=[.93,.95,.97],pw=[.1,.95,.32];function mw(s,t){const e=t.frames,n=t.racingLineOffset,i=e.length,r=[];for(let _=0;_<i;_++){const M=e[_];r.push(new N(M.pos.x+M.left.x*n[_],M.pos.y,M.pos.z+M.left.z*n[_]))}const o=new Float32Array(i);for(let _=0;_<i;_++)o[_]=Math.max(.5,r[_].distanceTo(r[(_+1)%i]));const a=new Float32Array(i);for(let _=0;_<i;_++){const M=r[(_-1+i)%i],S=r[_],b=r[(_+1)%i],L=S.x-M.x,w=S.z-M.z,T=b.x-S.x,O=b.z-S.z,D=Math.hypot(L,w),z=Math.hypot(T,O),C=(L*T+w*O)/Math.max(1e-6,D*z),I=Math.acos(Math.min(1,Math.max(-1,C)));a[_]=I/Math.max(.5,(D+z)/2)}const c=new Float32Array(i);for(let _=0;_<i;_++){let M=0;for(let S=-2;S<=2;S++)M+=a[(_+S+i)%i];c[_]=M/5}const l=new Float32Array(i);for(let _=0;_<i;_++)l[_]=Math.min(cw,Math.sqrt(rw/Math.max(1e-4,c[_])));for(let _=0;_<2;_++)for(let M=i-1;M>=0;M--){const S=l[(M+1)%i],b=Math.sqrt(S*S+2*ow*o[M]);l[M]>b&&(l[M]=b)}const h=_=>Math.min(aw,Math.max(0,(lw/Math.max(8,_)-hw*_*_-uw)/sd));for(let _=0;_<2;_++)for(let M=0;M<i;M++){const S=(M+1)%i,b=Math.sqrt(l[M]*l[M]+2*h(l[M])*o[M]);l[S]>b&&(l[S]=b)}const d=new Float32Array(i*2*3),u=new Float32Array(i*2*3),f=dw/2;for(let _=0;_<i;_++){const M=e[_],S=r[_];d.set([S.x+M.left.x*f,S.y+Ah,S.z+M.left.z*f],_*6),d.set([S.x-M.left.x*f,S.y+Ah,S.z-M.left.z*f],_*6+3),u.set(to,_*6),u.set(to,_*6+3)}const g=[];for(let _=0;_<i;_++){const M=_*2,S=_*2+1,b=(_+1)%i*2,L=(_+1)%i*2+1;g.push(M,b,S,S,b,L)}const v=new he;v.setAttribute("position",new ee(d,3));const m=new ee(u,3);m.setUsage(af),v.setAttribute("color",m),v.setIndex(g);const p=new $(v,new ls({vertexColors:!0,transparent:!0,opacity:.85,depthWrite:!1,polygonOffset:!0,polygonOffsetFactor:-4,polygonOffsetUnits:-4}));p.renderOrder=3,p.visible=!1,s.add(p);function x(_){const M=m.array;for(let S=0;S<i;S++){const b=l[S]-_;let L,w,T;b<=1?(L=fw,w=to,T=Math.max(0,(b+1)/2)):(L=to,w=pw,T=Math.min(1,(b-1)/2));const O=L[0]+(w[0]-L[0])*T,D=L[1]+(w[1]-L[1])*T,z=L[2]+(w[2]-L[2])*T,C=S*6;M[C]=O,M[C+1]=D,M[C+2]=z,M[C+3]=O,M[C+4]=D,M[C+5]=z}m.needsUpdate=!0}function y(_){p.visible=_}return{profile:l,update:x,setVisible:y,mesh:p}}const gw=3,vw=320;function xw(s){return s==="time-trial"?1:gw}const Ea=13112861,yw=2059519,_w=[16436245,366185,15357964],ba="gt",Mw="muscle",Sw=["open-wheel","gt","muscle"];ww();async function ww(){const s=document.getElementById("loading-status"),t=document.getElementById("loading-fill"),e=(x,y)=>{t.style.width=`${Math.round(x*100)}%`,y&&(s.textContent=y)};e(.05,"Booting renderer"),await Ls();const n=document.getElementById("game"),{renderer:i,scene:r,camera:o,composer:a,updateShadowTarget:c}=bx(n);e(.25,"Building physics world"),await Ls();const{world:l,materials:h}=MM();e(.45,"Laying asphalt"),await Ls();const d=EM(r,l,h);e(.7,"Calibrating telemetry"),await Ls();const u=nw(vw);u.buildMinimap(d);const f=mw(r,d),g=new Ze(62,window.innerWidth/window.innerHeight,.6,3e3);r.add(g),e(1,"Ready"),await Ls(),document.getElementById("loading").classList.add("fade");const v={renderer:i,scene:r,camera:o,camera2:g,composer:a,world:l,materials:h,track:d,hud:u,racingLine:f,lineAid:!1,updateShadowTarget:c,cars:[],primaryPlayerIdx:0,mode:null,state:null};typeof window<"u"&&(window.__ctx=v,window.__createAIDriver=id,window.__tick=x=>Ph(v,x,performance.now())),document.querySelectorAll("button.mode").forEach(x=>{x.addEventListener("click",()=>{const y=x.dataset.mode;Ch(v,y)})}),document.getElementById("finish-restart").addEventListener("click",()=>{v.mode&&Ch(v,v.mode)}),document.getElementById("finish-menu").addEventListener("click",()=>{Rh(v)}),window.addEventListener("keydown",x=>{x.code==="Escape"&&v.mode&&Rh(v)}),rd();let m=performance.now();function p(x){requestAnimationFrame(p);const y=Math.min(.05,(x-m)/1e3);m=x,v.mode&&Ph(v,y,x)}requestAnimationFrame(p)}function rd(){document.getElementById("menu").classList.remove("hidden")}function Ew(){document.getElementById("menu").classList.add("hidden")}function Ch(s,t){if(od(s),s.mode=t,s.primaryPlayerIdx=0,s.state=Aw(t),t==="time-trial")eo(s,bh,Ea,0,ba),s.hud.hidePosition();else if(t==="quick-race"){eo(s,bh,Ea,0,ba);for(let e=0;e<3;e++)Cw(s,_w[e],e+1,.78+e*.04,Sw[e]);s.hud.setPosition(1,s.cars.length)}else t==="two-player"&&(eo(s,QS,Ea,0,ba),eo(s,$S,yw,1,Mw),s.hud.hidePosition());s.lineAid=t!=="two-player",s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace(),s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),uc(),Ew(),s.hud.show()}function Rh(s){od(s),s.mode=null,s.state=null,s.racingLine.setVisible(!1),s.hud.hide(),s.hud.hidePosition(),s.hud.hidePace(),s.hud.clearAnnouncements(),uc(),rd()}function bw(s,t){return[...s.cars].sort((n,i)=>i.state.progress-n.state.progress).indexOf(t)+1}function Tw(s){const t=s.cars[s.primaryPlayerIdx],e=t.state;let n="FINISHED",i="";if(s.mode==="time-trial")i=`LAP TIME   ${Ta(e.bestMs)}`;else if(s.mode==="quick-race"){const r=bw(s,t);n=r===1?"YOU WIN":`FINISHED  P${r}/${s.cars.length}`,i=`RACE TIME   ${Ta(e.finishMs)}`}else if(s.mode==="two-player"){const r=s.state.finishOrder[0];n=r&&r.label==="P2"?"PLAYER 2 WINS":"PLAYER 1 WINS",i=`TIME   ${Ta(r?r.state.finishMs:e.finishMs)}`}document.getElementById("finish-title").textContent=n,document.getElementById("finish-detail").textContent=i,document.getElementById("finish").classList.remove("hidden")}function uc(){document.getElementById("finish").classList.add("hidden")}function Ta(s){if(s==null||!isFinite(s))return"--:--.---";const t=Math.max(0,Math.floor(s)),e=Math.floor(t/6e4),n=Math.floor(t%6e4/1e3),i=t%1e3,r=(o,a)=>o.toString().padStart(a,"0");return`${r(e,2)}:${r(n,2)}.${r(i,3)}`}function Aw(s){return{mode:s,totalLaps:xw(s),finishOrder:[],finishShown:!1,perCar:[]}}function dc(){const s=performance.now();return{lap:1,bestMs:null,lapStart:s,raceStart:s,finishMs:null,lastT:0,sectorReached:!1,finished:!1,progress:0}}function eo(s,t,e,n,i="gt"){const r=nd(s.world,s.materials,{color:e,archetype:i});s.scene.add(r.visual.root),r.visual.wheels.forEach(l=>s.scene.add(l));const o=fc(s.track,n);r.reset(o.position,o.yaw);const a=JS(t),c=ew(n===0?s.camera:s.camera2);s.cars.push({car:r,color:e,isPlayer:!0,input:a,chase:c,state:dc(),label:n===0?"P1":"P2"}),s.state.perCar.push(s.cars[s.cars.length-1])}function Cw(s,t,e,n,i="gt"){const r=nd(s.world,s.materials,{color:t,archetype:i});s.scene.add(r.visual.root),r.visual.wheels.forEach(c=>s.scene.add(c));const o=fc(s.track,e);r.reset(o.position,o.yaw);const a=id(s.track,{skill:n});s.cars.push({car:r,color:t,isPlayer:!1,ai:a,state:dc(),label:"AI"}),s.state.perCar.push(s.cars[s.cars.length-1])}function fc(s,t){const e=-2.8-t*7,n=(t%2===0?1:-1)*2.5,i=s.frames[0];return{position:new N().copy(i.pos).add(i.tan.clone().multiplyScalar(e)).add(i.left.clone().multiplyScalar(n)).add(new N(0,1,0)),yaw:Math.atan2(i.tan.x,i.tan.z)}}function od(s){for(const t of s.cars)t.car.dispose(),s.scene.remove(t.car.visual.root),t.car.visual.wheels.forEach(e=>s.scene.remove(e));s.cars=[]}const Aa=1/120;let Ca=0;function Ph(s,t,e){Ca+=t;const n=window.innerWidth,i=window.innerHeight;if(s.mode==="two-player"){const l=Math.floor(n/2);s.camera.aspect=l/i,s.camera2.aspect=(n-l)/i}else s.camera.aspect=n/i;const r=s.cars.map(l=>l.car);for(const l of s.cars){let h;if(l.isPlayer){if(h=l.input.update(t),l.input.consumeToggle()&&l.chase.cycle(),l.input.consumeLineToggle()&&s.mode!=="two-player"&&(s.lineAid=!s.lineAid,s.racingLine.setVisible(s.lineAid),s.lineAid||s.hud.hidePace()),l.input.consumeReset()){for(const d of s.cars){const u=s.cars.indexOf(d),f=fc(s.track,u);d.car.reset(f.position,f.yaw),d.state=dc()}s.state.finishOrder=[],s.state.finishShown=!1,s.hud.setLap(1,s.state.totalLaps),s.hud.setBest(null),s.hud.setLapTime(0),s.hud.clearAnnouncements(),uc()}l.input.consumeRescue()&&Xa(s.track,l.car)}else h=l.ai.update(l.car,r,t);l.car.applyControls(h,t,Pw(s.track,l.car))}for(;Ca>=Aa;)s.world.step(Aa),Ca-=Aa;for(const l of s.cars)l.car.update();for(const l of s.cars)Lw(s.track,l.car);const o=s.cars[s.primaryPlayerIdx];o&&s.updateShadowTarget(o.car.body.position);for(const l of s.cars){if(!l.isPlayer)continue;const h=l.car.body.velocity,d=Math.hypot(h.x,h.y,h.z)*3.6;l.chase.update(t,l.car.body,d)}const a=s.cars[s.primaryPlayerIdx];if(a&&a.isPlayer){const l=a.car.telemetry;if(s.hud.setSpeed(l.speedKmh,l.gearLabel,l.rpmFrac),Iw(a,s.track,s.hud,s.state),s.hud.setWrongWay(!a.state.finished&&Uw(s.track,a.car)),s.lineAid){const h=a.car.body.velocity,d=Math.hypot(h.x,h.z);s.racingLine.update(d);const u=s.racingLine.profile[Zs(s.track,a.car.body.position)];s.hud.setPace(u*3.6,(d-u)*3.6)}}for(const l of s.cars)l!==a&&Dw(l,s.track,s.state);if(s.mode==="quick-race"){const h=[...s.cars].sort((d,u)=>u.state.progress-d.state.progress).indexOf(a)+1;s.hud.setPosition(h,s.cars.length)}(s.mode==="two-player"?s.state.finishOrder.length>=1:a&&a.state.finished)&&!s.state.finishShown&&(s.state.finishShown=!0,s.hud.setWrongWay(!1),Tw(s)),s.hud.drawMinimap(s.cars.map(l=>({pos:l.car.body.position,color:l.color,isPlayer:l.isPlayer}))),s.mode!=="two-player"&&s.composer.passes.forEach(l=>{l.uniforms&&l.uniforms.uTime&&(l.uniforms.uTime.value=e*.001)}),s.mode==="two-player"?Rw(s):s.composer.render()}function Rw(s){const t=window.innerWidth,e=window.innerHeight,n=Math.floor(t/2);s.renderer.setScissorTest(!0),s.renderer.setViewport(0,0,n,e),s.renderer.setScissor(0,0,n,e),s.camera.aspect=n/e,s.camera.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera),s.renderer.setViewport(n,0,t-n,e),s.renderer.setScissor(n,0,t-n,e),s.camera2.aspect=(t-n)/e,s.camera2.updateProjectionMatrix(),s.renderer.render(s.scene,s.camera2),s.renderer.setScissorTest(!1),s.renderer.setViewport(0,0,t,e),s.renderer.setScissor(0,0,t,e)}function Ls(){return new Promise(s=>requestAnimationFrame(()=>s()))}const no=["road","road","road","road"];function Pw(s,t){const e=s.frames,n=e.length,i=Zs(s,t.body.position);for(let r=0;r<4;r++){const o=t.vehicle.wheelInfos[r],a=o.isInContact?o.raycastResult.hitPointWorld:o.chassisConnectionPointWorld;let c=i,l=1/0;for(let f=-4;f<=4;f++){const g=(i+f+n)%n,v=e[g].pos.x-a.x,m=e[g].pos.z-a.z,p=v*v+m*m;p<l&&(l=p,c=g)}const h=e[c],d=Math.abs((a.x-h.pos.x)*h.left.x+(a.z-h.pos.z)*h.left.z),u=s.width/2;d<=u?no[r]="road":d<=u+s.kerbWidth?no[r]="kerb":no[r]=s.isGravel&&s.isGravel(c)?"gravel":"grass"}return no}function Xa(s,t){const e=t.body.position,n=s.frames;let i=0,r=1/0;for(let h=0;h<n.length;h++){const d=n[h].pos.x-e.x,u=n[h].pos.z-e.z,f=d*d+u*u;f<r&&(r=f,i=h)}const o=(i+4)%n.length,a=n[o],c=new N(a.pos.x,a.pos.y+1,a.pos.z),l=Math.atan2(a.tan.x,a.tan.z);t.reset(c,l)}function Lw(s,t){const e=t.body.position;if(e.y<-2){Xa(s,t);return}const n=s.frames[Zs(s,e)];Math.abs((e.x-n.pos.x)*n.left.x+(e.z-n.pos.z)*n.left.z)>s.armcoOffset+2.5&&Xa(s,t)}function ad(s,t,e,n){const i=s.state;if(i.finished)return null;const r=Nw(t,s.car.body.position);r>.4&&r<.6&&(i.sectorReached=!0);let o=null;if(i.sectorReached&&i.lastT>.92&&r<.08){const a=n-i.lapStart;if((i.bestMs==null||a<i.bestMs)&&(i.bestMs=a),i.sectorReached=!1,i.lap>=e.totalLaps)return i.finished=!0,i.finishMs=n-i.raceStart,e.finishOrder.push(s),i.lastT=r,i.progress=e.totalLaps+100-(e.finishOrder.length-1),"finish";i.lap+=1,i.lapStart=n,o=i.lap===e.totalLaps?"final":"lap"}return i.lastT=r,i.progress=i.lap-1+r,o}function Iw(s,t,e,n){const i=s.state,r=i.bestMs,o=performance.now(),a=ad(s,t,n,o);i.bestMs!==r&&e.setBest(i.bestMs),a==="finish"?(e.setLap(n.totalLaps,n.totalLaps),e.flashBanner("FINISH")):a==="final"?(e.setLap(i.lap,n.totalLaps),e.flashBanner("FINAL LAP")):a==="lap"&&(e.setLap(i.lap,n.totalLaps),e.flashBanner(`LAP ${i.lap} / ${n.totalLaps}`)),i.finished||e.setLapTime(o-i.lapStart)}function Dw(s,t,e){ad(s,t,e,performance.now())}function Zs(s,t){const e=s.frames;let n=0,i=1/0;for(let r=0;r<e.length;r++){const o=e[r].pos.x-t.x,a=e[r].pos.z-t.z,c=o*o+a*a;c<i&&(i=c,n=r)}return n}function Nw(s,t){return Zs(s,t)/s.frames.length}function Uw(s,t){const e=t.body.velocity,n=Math.hypot(e.x,e.z);if(n<5)return!1;const i=s.frames[Zs(s,t.body.position)].tan;return(e.x*i.x+e.z*i.z)/n<-.25}
