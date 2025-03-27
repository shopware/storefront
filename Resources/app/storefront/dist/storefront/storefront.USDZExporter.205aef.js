"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[79965],{9965:(e,r,t)=>{t.d(r,{USDZExporter:()=>ep});var n=t(9451),a={},o=function(e){return URL.createObjectURL(new Blob([e],{type:"text/javascript"}))},i=function(e){return new Worker(e)};try{URL.revokeObjectURL(o(""))}catch(e){o=function(e){return"data:application/javascript;charset=UTF-8,"+encodeURI(e)},i=function(e){return new Worker(e,{type:"module"})}}var s=function(e,r,t,n,s){var l=i(a[r]||(a[r]=o(e)));return l.onerror=function(e){return s(e.error,null)},l.onmessage=function(e){return s(null,e.data)},l.postMessage(t,n),l},l=Uint8Array,u=Uint16Array,f=Uint32Array,c=new l([0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0,0]),p=new l([0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,13,0,0]),h=new l([16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15]),d=function(e,r){for(var t=new u(31),n=0;n<31;++n)t[n]=r+=1<<e[n-1];for(var a=new f(t[30]),n=1;n<30;++n)for(var o=t[n];o<t[n+1];++o)a[o]=o-t[n]<<5|n;return[t,a]},v=d(c,2),m=v[0],g=v[1];m[28]=258,g[258]=28;for(var $=d(p,0),x=$[0],M=$[1],w=new u(32768),y=0;y<32768;++y){var b=(43690&y)>>>1|(21845&y)<<1;b=(61680&(b=(52428&b)>>>2|(13107&b)<<2))>>>4|(3855&b)<<4,w[y]=((65280&b)>>>8|(255&b)<<8)>>>1}for(var _=function(e,r,t){for(var n,a=e.length,o=0,i=new u(r);o<a;++o)++i[e[o]-1];var s=new u(r);for(o=0;o<r;++o)s[o]=s[o-1]+i[o-1]<<1;if(t){n=new u(1<<r);var l=15-r;for(o=0;o<a;++o)if(e[o])for(var f=o<<4|e[o],c=r-e[o],p=s[e[o]-1]++<<c,h=p|(1<<c)-1;p<=h;++p)n[w[p]>>>l]=f}else for(o=0,n=new u(a);o<a;++o)e[o]&&(n[o]=w[s[e[o]-1]++]>>>15-e[o]);return n},k=new l(288),y=0;y<144;++y)k[y]=8;for(var y=144;y<256;++y)k[y]=9;for(var y=256;y<280;++y)k[y]=7;for(var y=280;y<288;++y)k[y]=8;for(var S=new l(32),y=0;y<32;++y)S[y]=5;var T=_(k,9,0),U=_(S,5,0),E=function(e){for(var r=e[0],t=1;t<e.length;++t)e[t]>r&&(r=e[t]);return r},O=function(e,r,t){var n=r/8|0;return(e[n]|e[n+1]<<8)>>(7&r)&t},P=function(e,r){var t=r/8|0;return(e[t]|e[t+1]<<8|e[t+2]<<16)>>(7&r)},C=function(e){return(e/8|0)+(7&e&&1)},A=function(e,r,t){(null==r||r<0)&&(r=0),(null==t||t>e.length)&&(t=e.length);var n=new(e instanceof u?u:e instanceof f?f:l)(t-r);return n.set(e.subarray(r,t)),n},D=function(e,r,t){var n=e.length;if(!n||t&&!t.l&&n<5)return r||new l(0);var a=!r||t,o=!t||t.i;t||(t={}),r||(r=new l(3*n));var i=function(e){var t=r.length;if(e>t){var n=new l(Math.max(2*t,e));n.set(r),r=n}},s=t.f||0,u=t.p||0,f=t.b||0,d=t.l,v=t.d,g=t.m,$=t.n,M=8*n;do{if(!d){t.f=s=O(e,u,1);var w=O(e,u+1,3);if(u+=3,w){if(1==w)d=null,v=null,g=9,$=5;else if(2==w){var y=O(e,u,31)+257,b=O(e,u+10,15)+4,k=y+O(e,u+5,31)+1;u+=14;for(var S=new l(k),T=new l(19),U=0;U<b;++U)T[h[U]]=O(e,u+3*U,7);u+=3*b;for(var D=E(T),R=(1<<D)-1,j=_(T,D,1),U=0;U<k;){var L=j[O(e,u,R)];u+=15&L;var Z=L>>>4;if(Z<16)S[U++]=Z;else{var H=0,F=0;for(16==Z?(F=3+O(e,u,3),u+=2,H=S[U-1]):17==Z?(F=3+O(e,u,7),u+=3):18==Z&&(F=11+O(e,u,127),u+=7);F--;)S[U++]=H}}var I=S.subarray(0,y),W=S.subarray(y);g=E(I),$=E(W),d=_(I,g,1),v=_(W,$,1)}else throw"invalid block type"}else{var Z=C(u)+4,z=e[Z-4]|e[Z-3]<<8,B=Z+z;if(B>n){if(o)throw"unexpected EOF";break}a&&i(f+z),r.set(e.subarray(Z,B),f),t.b=f+=z,t.p=u=8*B;continue}if(u>M){if(o)throw"unexpected EOF";break}}a&&i(f+131072);for(var G=(1<<g)-1,X=(1<<$)-1,Y=u;;Y=u){var H=d[P(e,u)&G],N=H>>>4;if((u+=15&H)>M){if(o)throw"unexpected EOF";break}if(!H)throw"invalid length/literal";if(N<256)r[f++]=N;else if(256==N){Y=u,d=null;break}else{var V=N-254;if(N>264){var U=N-257,q=c[U];V=O(e,u,(1<<q)-1)+m[U],u+=q}var J=v[P(e,u)&X],K=J>>>4;if(!J)throw"invalid distance";u+=15&J;var W=x[K];if(K>3){var q=p[K];W+=P(e,u)&(1<<q)-1,u+=q}if(u>M){if(o)throw"unexpected EOF";break}a&&i(f+131072);for(var Q=f+V;f<Q;f+=4)r[f]=r[f-W],r[f+1]=r[f+1-W],r[f+2]=r[f+2-W],r[f+3]=r[f+3-W];f=Q}}t.l=d,t.p=Y,t.b=f,d&&(s=1,t.m=g,t.d=v,t.n=$)}while(!s)return f==r.length?r:A(r,0,f)},R=function(e,r,t){t<<=7&r;var n=r/8|0;e[n]|=t,e[n+1]|=t>>>8},j=function(e,r,t){t<<=7&r;var n=r/8|0;e[n]|=t,e[n+1]|=t>>>8,e[n+2]|=t>>>16},L=function(e,r){for(var t=[],n=0;n<e.length;++n)e[n]&&t.push({s:n,f:e[n]});var a=t.length,o=t.slice();if(!a)return[B,0];if(1==a){var i=new l(t[0].s+1);return i[t[0].s]=1,[i,1]}t.sort(function(e,r){return e.f-r.f}),t.push({s:-1,f:25001});var s=t[0],f=t[1],c=0,p=1,h=2;for(t[0]={s:-1,f:s.f+f.f,l:s,r:f};p!=a-1;)s=t[t[c].f<t[h].f?c++:h++],f=t[c!=p&&t[c].f<t[h].f?c++:h++],t[p++]={s:-1,f:s.f+f.f,l:s,r:f};for(var d=o[0].s,n=1;n<a;++n)o[n].s>d&&(d=o[n].s);var v=new u(d+1),m=Z(t[p-1],v,0);if(m>r){var n=0,g=0,$=m-r,x=1<<$;for(o.sort(function(e,r){return v[r.s]-v[e.s]||e.f-r.f});n<a;++n){var M=o[n].s;if(v[M]>r)g+=x-(1<<m-v[M]),v[M]=r;else break}for(g>>>=$;g>0;){var w=o[n].s;v[w]<r?g-=1<<r-v[w]++-1:++n}for(;n>=0&&g;--n){var y=o[n].s;v[y]==r&&(--v[y],++g)}m=r}return[new l(v),m]},Z=function(e,r,t){return -1==e.s?Math.max(Z(e.l,r,t+1),Z(e.r,r,t+1)):r[e.s]=t},H=function(e){for(var r=e.length;r&&!e[--r];);for(var t=new u(++r),n=0,a=e[0],o=1,i=function(e){t[n++]=e},s=1;s<=r;++s)if(e[s]==a&&s!=r)++o;else{if(!a&&o>2){for(;o>138;o-=138)i(32754);o>2&&(i(o>10?o-11<<5|28690:o-3<<5|12305),o=0)}else if(o>3){for(i(a),--o;o>6;o-=6)i(8304);o>2&&(i(o-3<<5|8208),o=0)}for(;o--;)i(a);o=1,a=e[s]}return[t.subarray(0,n),r]},F=function(e,r){for(var t=0,n=0;n<r.length;++n)t+=e[n]*r[n];return t},I=function(e,r,t){var n=t.length,a=C(r+2);e[a]=255&n,e[a+1]=n>>>8,e[a+2]=255^e[a],e[a+3]=255^e[a+1];for(var o=0;o<n;++o)e[a+o+4]=t[o];return(a+4+n)*8},W=function(e,r,t,n,a,o,i,s,l,f,d){R(r,d++,t),++a[256];for(var v,m,g,$,x=L(a,15),M=x[0],w=x[1],y=L(o,15),b=y[0],E=y[1],O=H(M),P=O[0],C=O[1],A=H(b),D=A[0],Z=A[1],W=new u(19),z=0;z<P.length;++z)W[31&P[z]]++;for(var z=0;z<D.length;++z)W[31&D[z]]++;for(var B=L(W,7),G=B[0],X=B[1],Y=19;Y>4&&!G[h[Y-1]];--Y);var N=f+5<<3,V=F(a,k)+F(o,S)+i,q=F(a,M)+F(o,b)+i+14+3*Y+F(W,G)+(2*W[16]+3*W[17]+7*W[18]);if(N<=V&&N<=q)return I(r,d,e.subarray(l,l+f));if(R(r,d,1+(q<V)),d+=2,q<V){v=_(M,w,0),m=M,g=_(b,E,0),$=b;var J=_(G,X,0);R(r,d,C-257),R(r,d+5,Z-1),R(r,d+10,Y-4),d+=14;for(var z=0;z<Y;++z)R(r,d+3*z,G[h[z]]);d+=3*Y;for(var K=[P,D],Q=0;Q<2;++Q)for(var ee=K[Q],z=0;z<ee.length;++z){var er=31&ee[z];R(r,d,J[er]),d+=G[er],er>15&&(R(r,d,ee[z]>>>5&127),d+=ee[z]>>>12)}}else v=T,m=k,g=U,$=S;for(var z=0;z<s;++z)if(n[z]>255){var er=n[z]>>>18&31;j(r,d,v[er+257]),d+=m[er+257],er>7&&(R(r,d,n[z]>>>23&31),d+=c[er]);var et=31&n[z];j(r,d,g[et]),d+=$[et],et>3&&(j(r,d,n[z]>>>5&8191),d+=p[et])}else j(r,d,v[n[z]]),d+=m[n[z]];return j(r,d,v[256]),d+m[256]},z=new f([65540,131080,131088,131104,262176,1048704,1048832,2114560,2117632]),B=new l(0),G=function(e,r,t,n,a,o){var i=e.length,s=new l(n+i+5*(1+Math.ceil(i/7e3))+a),h=s.subarray(n,s.length-a),d=0;if(!r||i<8)for(var v=0;v<=i;v+=65535){var m=v+65535;m<i?d=I(h,d,e.subarray(v,m)):(h[v]=o,d=I(h,d,e.subarray(v,i)))}else{for(var $=z[r-1],x=$>>>13,w=8191&$,y=(1<<t)-1,b=new u(32768),_=new u(y+1),k=Math.ceil(t/3),S=2*k,T=function(r){return(e[r]^e[r+1]<<k^e[r+2]<<S)&y},U=new f(25e3),E=new u(288),O=new u(32),P=0,D=0,v=0,R=0,j=0,L=0;v<i;++v){var Z=T(v),H=32767&v,F=_[Z];if(b[H]=F,_[Z]=H,j<=v){var G=i-v;if((P>7e3||R>24576)&&G>423){d=W(e,h,0,U,E,O,D,R,L,v-L,d),R=P=D=0,L=v;for(var X=0;X<286;++X)E[X]=0;for(var X=0;X<30;++X)O[X]=0}var Y=2,N=0,V=w,q=H-F&32767;if(G>2&&Z==T(v-q))for(var J=Math.min(x,G)-1,K=Math.min(32767,v),Q=Math.min(258,G);q<=K&&--V&&H!=F;){if(e[v+Y]==e[v+Y-q]){for(var ee=0;ee<Q&&e[v+ee]==e[v+ee-q];++ee);if(ee>Y){if(Y=ee,N=q,ee>J)break;for(var er=Math.min(q,ee-2),et=0,X=0;X<er;++X){var en=v-q+X+32768&32767,ea=b[en],eo=en-ea+32768&32767;eo>et&&(et=eo,F=en)}}}F=b[H=F],q+=H-F+32768&32767}if(N){U[R++]=0x10000000|g[Y]<<18|M[N];var ei=31&g[Y],es=31&M[N];D+=c[ei]+p[es],++E[257+ei],++O[es],j=v+Y,++P}else U[R++]=e[v],++E[e[v]]}}d=W(e,h,o,U,E,O,D,R,L,v-L,d),!o&&7&d&&(d=I(h,d+1,B))}return A(s,0,n+C(d)+a)},X=function(){for(var e=new f(256),r=0;r<256;++r){for(var t=r,n=9;--n;)t=(1&t&&0xedb88320)^t>>>1;e[r]=t}return e}(),Y=function(){var e=-1;return{p:function(r){for(var t=e,n=0;n<r.length;++n)t=X[255&t^r[n]]^t>>>8;e=t},d:function(){return~e}}},N=function(e,r){var t={};for(var n in e)t[n]=e[n];for(var n in r)t[n]=r[n];return t},V=function(e,r,t){for(var n=e(),a=e.toString(),o=a.slice(a.indexOf("[")+1,a.lastIndexOf("]")).replace(/ /g,"").split(","),i=0;i<n.length;++i){var s=n[i],l=o[i];if("function"==typeof s){r+=";"+l+"=";var u=s.toString();if(s.prototype){if(-1!=u.indexOf("[native code]")){var f=u.indexOf(" ",8)+1;r+=u.slice(f,u.indexOf("(",f))}else for(var c in r+=u,s.prototype)r+=";"+l+".prototype."+c+"="+s.prototype[c].toString()}else r+=u}else t[l]=s}return[r,t]},q=function(e){var r=[];for(var t in e)(e[t]instanceof l||e[t]instanceof u||e[t]instanceof f)&&r.push((e[t]=new e[t].constructor(e[t])).buffer);return r},J=function(e,r,t,n){if(!null[t]){for(var a,o="",i={},l=e.length-1,u=0;u<l;++u)o=(a=V(e[u],o,i))[0],i=a[1];null[t]=V(e[l],o,i)}var f=N({},null[t][1]);return s(null[t][0]+";onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage="+r.toString()+"}",t,f,q(f),n)},K=function(e){return postMessage(e,[e.buffer])},Q=function(e){return e&&e.size&&new l(e.size)},ee=function(e,r){return e[r]|e[r+1]<<8},er=function(e,r){return(e[r]|e[r+1]<<8|e[r+2]<<16|e[r+3]<<24)>>>0},et=function(e,r){return er(e,r)+0x100000000*er(e,r+4)},en=function(e,r,t){for(;t;++r)e[r]=t,t>>>=8};function ea(e,r){return D(e,r)}var eo=function(e,r,t,n){for(var a in e){var o=e[a],i=r+a;o instanceof l?t[i]=[o,n]:Array.isArray(o)?t[i]=[o[0],N(n,o[1])]:eo(o,i+"/",t,n)}},ei="undefined"!=typeof TextEncoder&&new TextEncoder,es="undefined"!=typeof TextDecoder&&new TextDecoder;try{es.decode(B,{stream:!0})}catch(e){}function el(e,r){if(r){for(var t=new l(e.length),n=0;n<e.length;++n)t[n]=e.charCodeAt(n);return t}if(ei)return ei.encode(e);for(var a=e.length,o=new l(e.length+(e.length>>1)),i=0,s=function(e){o[i++]=e},n=0;n<a;++n){if(i+5>o.length){var u=new l(i+8+(a-n<<1));u.set(o),o=u}var f=e.charCodeAt(n);f<128||r?s(f):(f<2048?s(192|f>>6):(f>55295&&f<57344?(s(240|(f=65536+(1047552&f)|1023&e.charCodeAt(++n))>>18),s(128|f>>12&63)):s(224|f>>12),s(128|f>>6&63)),s(128|63&f))}return A(o,0,i)}var eu=function(e){var r=0;if(e)for(var t in e){var n=e[t].length;if(n>65535)throw"extra field too long";r+=n+4}return r},ef=function(e,r,t,n,a,o,i,s){var l=n.length,u=t.extra,f=s&&s.length,c=eu(u);en(e,r,null!=i?0x2014b50:0x4034b50),r+=4,null!=i&&(e[r++]=20,e[r++]=t.os),e[r]=20,r+=2,e[r++]=t.flag<<1|(null==o&&8),e[r++]=a&&8,e[r++]=255&t.compression,e[r++]=t.compression>>8;var p=new Date(null==t.mtime?Date.now():t.mtime),h=p.getFullYear()-1980;if(h<0||h>119)throw"date not in range 1980-2099";if(en(e,r,h<<25|p.getMonth()+1<<21|p.getDate()<<16|p.getHours()<<11|p.getMinutes()<<5|p.getSeconds()>>>1),r+=4,null!=o&&(en(e,r,t.crc),en(e,r+4,o),en(e,r+8,t.size)),en(e,r+12,l),en(e,r+14,c),r+=16,null!=i&&(en(e,r,f),en(e,r+6,t.attrs),en(e,r+10,i),r+=14),e.set(n,r),r+=l,c)for(var d in u){var v=u[d],m=v.length;en(e,r,+d),en(e,r+2,m),e.set(v,r+4),r+=4+m}return f&&(e.set(s,r),r+=f),r},ec=function(e,r,t,n,a){en(e,r,0x6054b50),en(e,r+8,t),en(e,r+10,t),en(e,r+12,n),en(e,r+16,a)};class ep{async parse(e,r={}){var t;r=Object.assign({ar:{anchoring:{type:"plane"},planeAnchoring:{alignment:"horizontal"}},quickLookCompatible:!1},r);let a={},o="model.usda";a[o]=null;let i=eh();i+=(t=r,`def Xform "Root"
{
	def Scope "Scenes" (
		kind = "sceneLibrary"
	)
	{
		def Xform "Scene" (
			customData = {
				bool preliminary_collidesWithEnvironment = 0
				string sceneName = "Scene"
			}
			sceneName = "Scene"
		)
		{
		token preliminary:anchoring:type = "${t.ar.anchoring.type}"
		token preliminary:planeAnchoring:alignment = "${t.ar.planeAnchoring.alignment}"

`);let s={},u={};for(let t in e.traverseVisible(e=>{if(e.isMesh){let t=e.geometry,n=e.material;if(n.isMeshStandardMaterial){let o="geometries/Geometry_"+t.id+".usda";if(!(o in a)){var r;let e;let n=function(e){let r=function(e){var r;let t=e.attributes,n=t.position.count;return`
	def Mesh "Geometry"
	{
		int[] faceVertexCounts = [${Array((null!==(r=e).index?r.index.count:r.attributes.position.count)/3).fill(3).join(", ")}]
		int[] faceVertexIndices = [${function(e){let r=e.index,t=[];if(null!==r)for(let e=0;e<r.count;e++)t.push(r.getX(e));else{let r=e.attributes.position.count;for(let e=0;e<r;e++)t.push(e)}return t.join(", ")}(e)}]
		normal3f[] normals = [${em(t.normal,n)}] (
			interpolation = "vertex"
		)
		point3f[] points = [${em(t.position,n)}]
${function(e,r){let t="";for(let n=0;n<4;n++){let a=n>0?n:"",o=e["uv"+a];void 0!==o&&(t+=`
		texCoord2f[] primvars:st${a} = [${function(e,r){if(void 0===e)return console.warn("USDZExporter: UVs missing."),Array(r).fill("(0, 0)").join(", ");let t=[];for(let r=0;r<e.count;r++){let n=e.getX(r),a=e.getY(r);t.push(`(${n.toPrecision(7)}, ${1-a.toPrecision(7)})`)}return t.join(", ")}(o,r)}] (
			interpolation = "vertex"
		)`)}return t}(t,n)}
		uniform token subdivisionScheme = "none"
	}
`}(e);return`
def "Geometry"
{
${r}
}
`}(t);a[o]=(r=n,el(eh()+r))}n.uuid in s||(s[n.uuid]=n),i+=function(e,r,t){let n="Object_"+e.id,a=ed(e.matrixWorld);return 0>e.matrixWorld.determinant()&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",e),`def Xform "${n}" (
	prepend references = @./geometries/Geometry_${r.id}.usda@</Geometry>
	prepend apiSchemas = ["MaterialBindingAPI"]
)
{
	matrix4d xformOp:transform = ${a}
	uniform token[] xformOpOrder = ["xformOp:transform"]

	rel material:binding = </Materials/Material_${t.id}>
}

`}(e,t,n)}else console.warn("THREE.USDZExporter: Unsupported material type (USDZ only supports MeshStandardMaterial)",e)}else e.isCamera&&(i+=function(e){let r=e.name?e.name:"Camera_"+e.id,t=ed(e.matrixWorld);return(0>e.matrixWorld.determinant()&&console.warn("THREE.USDZExporter: USDZ does not support negative scales",e),e.isOrthographicCamera)?`def Camera "${r}"
		{
			matrix4d xformOp:transform = ${t}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${e.near.toPrecision(7)}, ${e.far.toPrecision(7)})
			float horizontalAperture = ${((Math.abs(e.left)+Math.abs(e.right))*10).toPrecision(7)}
			float verticalAperture = ${((Math.abs(e.top)+Math.abs(e.bottom))*10).toPrecision(7)}
			token projection = "orthographic"
		}
	
	`:`def Camera "${r}"
		{
			matrix4d xformOp:transform = ${t}
			uniform token[] xformOpOrder = ["xformOp:transform"]

			float2 clippingRange = (${e.near.toPrecision(7)}, ${e.far.toPrecision(7)})
			float focalLength = ${e.getFocalLength().toPrecision(7)}
			float focusDistance = ${e.focus.toPrecision(7)}
			float horizontalAperture = ${e.getFilmWidth().toPrecision(7)}
			token projection = "perspective"
			float verticalAperture = ${e.getFilmHeight().toPrecision(7)}
		}
	
	`}(e))}),i+=`
		}
	}
}

`,i+=function(e,r,t=!1){let a=[];for(let o in e){let i=e[o];a.push(function(e,r,t=!1){let a=[],o=[];function i(a,o,i){var s;let l=a.source.id+"_"+a.flipY;r[l]=a;let u=a.channel>0?"st"+a.channel:"st",f={1e3:"repeat",1001:"clamp",1002:"mirror"},c=a.repeat.clone(),p=a.offset.clone(),h=a.rotation,d=Math.sin(h),v=Math.cos(h);return p.y=1-p.y-c.y,t?(p.x=p.x/c.x,p.y=p.y/c.y,p.x+=d/c.x,p.y+=v-1):(p.x+=d*c.x,p.y+=(1-v)*c.y),`
		def Shader "PrimvarReader_${o}"
		{
			uniform token info:id = "UsdPrimvarReader_float2"
			float2 inputs:fallback = (0.0, 0.0)
			token inputs:varname = "${u}"
			float2 outputs:result
		}

		def Shader "Transform2d_${o}"
		{
			uniform token info:id = "UsdTransform2d"
			token inputs:in.connect = </Materials/Material_${e.id}/PrimvarReader_${o}.outputs:result>
			float inputs:rotation = ${(180/Math.PI*h).toFixed(7)}
			float2 inputs:scale = ${e$(c)}
			float2 inputs:translation = ${e$(p)}
			float2 outputs:result
		}

		def Shader "Texture_${a.id}_${o}"
		{
			uniform token info:id = "UsdUVTexture"
			asset inputs:file = @textures/Texture_${l}.png@
			float2 inputs:st.connect = </Materials/Material_${e.id}/Transform2d_${o}.outputs:result>
			${void 0!==i?"float4 inputs:scale = "+(s=i,`(${s.r}, ${s.g}, ${s.b}, 1.0)`):""}
			token inputs:sourceColorSpace = "${a.colorSpace===n.NoColorSpace?"raw":"sRGB"}"
			token inputs:wrapS = "${f[a.wrapS]}"
			token inputs:wrapT = "${f[a.wrapT]}"
			float outputs:r
			float outputs:g
			float outputs:b
			float3 outputs:rgb
			${e.transparent||e.alphaTest>0?"float outputs:a":""}
		}`}return e.side===n.DoubleSide&&console.warn("THREE.USDZExporter: USDZ does not support double sided materials",e),null!==e.map?(a.push(`			color3f inputs:diffuseColor.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:rgb>`),e.transparent?a.push(`			float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`):e.alphaTest>0&&(a.push(`			float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.map.id}_diffuse.outputs:a>`),a.push(`			float inputs:opacityThreshold = ${e.alphaTest}`)),o.push(i(e.map,"diffuse",e.color))):a.push(`			color3f inputs:diffuseColor = ${eg(e.color)}`),null!==e.emissiveMap?(a.push(`			color3f inputs:emissiveColor.connect = </Materials/Material_${e.id}/Texture_${e.emissiveMap.id}_emissive.outputs:rgb>`),o.push(i(e.emissiveMap,"emissive"))):e.emissive.getHex()>0&&a.push(`			color3f inputs:emissiveColor = ${eg(e.emissive)}`),null!==e.normalMap&&(a.push(`			normal3f inputs:normal.connect = </Materials/Material_${e.id}/Texture_${e.normalMap.id}_normal.outputs:rgb>`),o.push(i(e.normalMap,"normal"))),null!==e.aoMap&&(a.push(`			float inputs:occlusion.connect = </Materials/Material_${e.id}/Texture_${e.aoMap.id}_occlusion.outputs:r>`),o.push(i(e.aoMap,"occlusion"))),null!==e.roughnessMap&&1===e.roughness?(a.push(`			float inputs:roughness.connect = </Materials/Material_${e.id}/Texture_${e.roughnessMap.id}_roughness.outputs:g>`),o.push(i(e.roughnessMap,"roughness"))):a.push(`			float inputs:roughness = ${e.roughness}`),null!==e.metalnessMap&&1===e.metalness?(a.push(`			float inputs:metallic.connect = </Materials/Material_${e.id}/Texture_${e.metalnessMap.id}_metallic.outputs:b>`),o.push(i(e.metalnessMap,"metallic"))):a.push(`			float inputs:metallic = ${e.metalness}`),null!==e.alphaMap?(a.push(`			float inputs:opacity.connect = </Materials/Material_${e.id}/Texture_${e.alphaMap.id}_opacity.outputs:r>`),a.push(`			float inputs:opacityThreshold = 0.0001`),o.push(i(e.alphaMap,"opacity"))):a.push(`			float inputs:opacity = ${e.opacity}`),e.isMeshPhysicalMaterial&&(a.push(`			float inputs:clearcoat = ${e.clearcoat}`),a.push(`			float inputs:clearcoatRoughness = ${e.clearcoatRoughness}`),a.push(`			float inputs:ior = ${e.ior}`)),`
	def Material "Material_${e.id}"
	{
		def Shader "PreviewSurface"
		{
			uniform token info:id = "UsdPreviewSurface"
${a.join("\n")}
			int inputs:useSpecularWorkflow = 0
			token outputs:surface
		}

		token outputs:surface.connect = </Materials/Material_${e.id}/PreviewSurface.outputs:surface>

${o.join("\n")}

	}
`}(i,r,t))}return`def "Materials"
{
${a.join("")}
}

`}(s,u,r.quickLookCompatible),a[o]=el(i),i=null,u){let e=u[t],r=function(e,r){if("undefined"!=typeof HTMLImageElement&&e instanceof HTMLImageElement||"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement||"undefined"!=typeof OffscreenCanvas&&e instanceof OffscreenCanvas||"undefined"!=typeof ImageBitmap&&e instanceof ImageBitmap){let t=1024/Math.max(e.width,e.height),n=document.createElement("canvas");n.width=e.width*Math.min(1,t),n.height=e.height*Math.min(1,t);let a=n.getContext("2d");return!0===r&&(a.translate(0,n.height),a.scale(1,-1)),a.drawImage(e,0,0,n.width,n.height),n}throw Error("THREE.USDZExporter: No valid image data found. Unable to process texture.")}(e.image,e.flipY),n=await new Promise(e=>r.toBlob(e,"image/png",1));a[`textures/Texture_${t}.png`]=new Uint8Array(await n.arrayBuffer())}let f=0;for(let e in a){let r=a[e],t=63&(f+=34+e.length);if(4!==t){let n=new Uint8Array(64-t);a[e]=[r,{extra:{12345:n}}]}f=r.length}return function(e,r){r||(r={});var t={},n=[];eo(e,"",t,r);var a=0,o=0;for(var i in t){var s=t[i],u=s[0],f=s[1],c=8*(0!=f.level),p=el(i),h=p.length,d=f.comment,v=d&&el(d),m=v&&v.length,g=eu(f.extra);if(h>65535)throw"filename too long";var $=c?function(e,r){var t,n,a,o,i;return a=0,o=0,G(t=e,null==(n=r||{}).level?6:n.level,null==n.mem?Math.ceil(1.5*Math.max(8,Math.min(13,Math.log(t.length)))):12+n.mem,0,0,true)}(u,f):u,x=$.length,M=Y();M.p(u),n.push(N(f,{size:u.length,crc:M.d(),c:$,f:p,m:v,u:h!=i.length||v&&d.length!=m,o:a,compression:c})),a+=30+h+g+x,o+=76+2*(h+g)+(m||0)+x}for(var w=new l(o+22),y=a,b=o-a,_=0;_<n.length;++_){var p=n[_];ef(w,p.o,p,p.f,p.u,p.c.length);var k=30+p.f.length+eu(p.extra);w.set(p.c,p.o+k),ef(w,a,p,p.f,p.u,p.c.length,p.o,p.m),a+=16+k+(p.m?p.m.length:0)}return ec(w,a,n.length,b,y),w}(a,{level:0})}}function eh(){return`#usda 1.0
(
	customLayerData = {
		string creator = "Three.js USDZExporter"
	}
	defaultPrim = "Root"
	metersPerUnit = 1
	upAxis = "Y"
)

`}function ed(e){let r=e.elements;return`( ${ev(r,0)}, ${ev(r,4)}, ${ev(r,8)}, ${ev(r,12)} )`}function ev(e,r){return`(${e[r+0]}, ${e[r+1]}, ${e[r+2]}, ${e[r+3]})`}function em(e,r){if(void 0===e)return console.warn("USDZExporter: Normals missing."),Array(r).fill("(0, 0, 0)").join(", ");let t=[];for(let r=0;r<e.count;r++){let n=e.getX(r),a=e.getY(r),o=e.getZ(r);t.push(`(${n.toPrecision(7)}, ${a.toPrecision(7)}, ${o.toPrecision(7)})`)}return t.join(", ")}function eg(e){return`(${e.r}, ${e.g}, ${e.b})`}function e$(e){return`(${e.x}, ${e.y})`}}}]);