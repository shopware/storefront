"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[86179],{122(e,i,A){A.d(i,{D:()=>eB,a:()=>eP});var t=A(9451);let n=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,r=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_APLHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,s=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,a=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,o=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,g=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,h=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

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

}
`,c=`
#if DEPTH_PACKING == 3200

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

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z. This assumes depthRange has been left to its default values.
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#endif

}
`,f=`
#define DISTANCE

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

	#include <morphinstance_vertex>

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

}
`,l=`
#define DISTANCE

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

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`,u=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,p=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`,d=`
uniform float scale;
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
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,B=`
uniform vec3 diffuse;
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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`,P=`
#include <common>
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
	#include <morphinstance_vertex>
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

}
`,v=`
uniform vec3 diffuse;
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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
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

}
`,z=`
#define LAMBERT

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
	#include <morphinstance_vertex>
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

}
`,C=`
#define LAMBERT

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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

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

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,I=`
#define MATCAP

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
	#include <morphinstance_vertex>
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

}
`,w=`
#define MATCAP

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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

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
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,G=`
#define NORMAL

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
	#include <morphinstance_vertex>
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

}
`,y=`
#define NORMAL

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

	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`,D=`
#define PHONG

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
	#include <morphinstance_vertex>
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

}
`,b=`
#define PHONG

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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

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

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,K=`
#define STANDARD

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
	#include <morphinstance_vertex>
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
}
`,_=`
#define STANDARD

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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

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

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
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

}
`,H=`
#define TOON

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
	#include <morphinstance_vertex>
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

}
`,q=`
#define TOON

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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

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

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`,M=`
uniform float size;
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
	#include <morphinstance_vertex>
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

}
`,x=`
uniform vec3 diffuse;
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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

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

}
`,Y=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
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

}
`,O=`
uniform vec3 color;
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

}
`,L=`
uniform float rotation;
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

}
`,F=`
uniform vec3 diffuse;
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

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

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

}
`,X="srgb",j="srgb-linear",E="display-p3-linear",k="linear",Z="srgb",S="rec709";class Q{constructor(e,i,A,t,n,r,s,a,o){Q.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],void 0!==e&&this.set(e,i,A,t,n,r,s,a,o)}set(e,i,A,t,n,r,s,a,o){let g=this.elements;return g[0]=e,g[1]=t,g[2]=s,g[3]=i,g[4]=n,g[5]=a,g[6]=A,g[7]=r,g[8]=o,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let i=this.elements,A=e.elements;return i[0]=A[0],i[1]=A[1],i[2]=A[2],i[3]=A[3],i[4]=A[4],i[5]=A[5],i[6]=A[6],i[7]=A[7],i[8]=A[8],this}extractBasis(e,i,A){return e.setFromMatrix3Column(this,0),i.setFromMatrix3Column(this,1),A.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let i=e.elements;return this.set(i[0],i[4],i[8],i[1],i[5],i[9],i[2],i[6],i[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,i){let A=e.elements,t=i.elements,n=this.elements,r=A[0],s=A[3],a=A[6],o=A[1],g=A[4],h=A[7],c=A[2],f=A[5],l=A[8],u=t[0],p=t[3],d=t[6],B=t[1],P=t[4],v=t[7],z=t[2],C=t[5],I=t[8];return n[0]=r*u+s*B+a*z,n[3]=r*p+s*P+a*C,n[6]=r*d+s*v+a*I,n[1]=o*u+g*B+h*z,n[4]=o*p+g*P+h*C,n[7]=o*d+g*v+h*I,n[2]=c*u+f*B+l*z,n[5]=c*p+f*P+l*C,n[8]=c*d+f*v+l*I,this}multiplyScalar(e){let i=this.elements;return i[0]*=e,i[3]*=e,i[6]*=e,i[1]*=e,i[4]*=e,i[7]*=e,i[2]*=e,i[5]*=e,i[8]*=e,this}determinant(){let e=this.elements,i=e[0],A=e[1],t=e[2],n=e[3],r=e[4],s=e[5],a=e[6],o=e[7],g=e[8];return i*r*g-i*s*o-A*n*g+A*s*a+t*n*o-t*r*a}invert(){let e=this.elements,i=e[0],A=e[1],t=e[2],n=e[3],r=e[4],s=e[5],a=e[6],o=e[7],g=e[8],h=g*r-s*o,c=s*a-g*n,f=o*n-r*a,l=i*h+A*c+t*f;if(0===l)return this.set(0,0,0,0,0,0,0,0,0);let u=1/l;return e[0]=h*u,e[1]=(t*o-g*A)*u,e[2]=(s*A-t*r)*u,e[3]=c*u,e[4]=(g*i-t*a)*u,e[5]=(t*n-s*i)*u,e[6]=f*u,e[7]=(A*a-o*i)*u,e[8]=(r*i-A*n)*u,this}transpose(){let e;let i=this.elements;return e=i[1],i[1]=i[3],i[3]=e,e=i[2],i[2]=i[6],i[6]=e,e=i[5],i[5]=i[7],i[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let i=this.elements;return e[0]=i[0],e[1]=i[3],e[2]=i[6],e[3]=i[1],e[4]=i[4],e[5]=i[7],e[6]=i[2],e[7]=i[5],e[8]=i[8],this}setUvTransform(e,i,A,t,n,r,s){let a=Math.cos(n),o=Math.sin(n);return this.set(A*a,A*o,-A*(a*r+o*s)+r+e,-t*o,t*a,-t*(-o*r+a*s)+s+i,0,0,1),this}scale(e,i){return this.premultiply(W.makeScale(e,i)),this}rotate(e){return this.premultiply(W.makeRotation(-e)),this}translate(e,i){return this.premultiply(W.makeTranslation(e,i)),this}makeTranslation(e,i){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,i,0,0,1),this}makeRotation(e){let i=Math.cos(e),A=Math.sin(e);return this.set(i,-A,0,A,i,0,0,0,1),this}makeScale(e,i){return this.set(e,0,0,0,i,0,0,0,1),this}equals(e){let i=this.elements,A=e.elements;for(let e=0;e<9;e++)if(i[e]!==A[e])return!1;return!0}fromArray(e,i=0){for(let A=0;A<9;A++)this.elements[A]=e[A+i];return this}toArray(e=[],i=0){let A=this.elements;return e[i]=A[0],e[i+1]=A[1],e[i+2]=A[2],e[i+3]=A[3],e[i+4]=A[4],e[i+5]=A[5],e[i+6]=A[6],e[i+7]=A[7],e[i+8]=A[8],e}clone(){return new this.constructor().fromArray(this.elements)}}let W=new Q,N=new Q().set(.8224621,.177538,0,.0331941,.9668058,0,.0170827,.0723974,.9105199),T=new Q().set(1.2249401,-.2249404,0,-.0420569,1.0420571,0,-.0196376,-.0786361,1.0982735),J={[j]:{transfer:k,primaries:S,toReference:e=>e,fromReference:e=>e},[X]:{transfer:Z,primaries:S,toReference:e=>e.convertSRGBToLinear(),fromReference:e=>e.convertLinearToSRGB()},[E]:{transfer:k,primaries:"p3",toReference:e=>e.applyMatrix3(T),fromReference:e=>e.applyMatrix3(N)},"display-p3":{transfer:Z,primaries:"p3",toReference:e=>e.convertSRGBToLinear().applyMatrix3(T),fromReference:e=>e.applyMatrix3(N).convertLinearToSRGB()}},R=new Set([j,E]),V={enabled:!0,_workingColorSpace:j,get workingColorSpace(){return this._workingColorSpace},set workingColorSpace(m){if(!R.has(m))throw Error(`Unsupported working color space, "${m}".`);this._workingColorSpace=m},convert:function(e,i,A){if(!1===this.enabled||i===A||!i||!A)return e;let t=J[i].toReference;return(0,J[A].fromReference)(t(e))},fromWorkingColorSpace:function(e,i){return this.convert(e,this._workingColorSpace,i)},toWorkingColorSpace:function(e,i){return this.convert(e,i,this._workingColorSpace)},getPrimaries:function(e){return J[e].primaries},getTransfer:function(e){return""===e?k:J[e].transfer}};function U(e){return e<.04045?.0773993808*e:Math.pow(.9478672986*e+.0521327014,2.4)}function $(e){return e<.0031308?12.92*e:1.055*Math.pow(e,.41666)-.055}function ee(e){let i={};for(let A=0;A<e.length;A++){let t=function(e){let i={};for(let A in e)for(let t in i[A]={},e[A]){let n=e[A][t];n&&(n.isColor||n.isMatrix3||n.isMatrix4||n.isVector2||n.isVector3||n.isVector4||n.isTexture||n.isQuaternion)?n.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),i[A][t]=null):i[A][t]=n.clone():Array.isArray(n)?i[A][t]=n.slice():i[A][t]=n}return i}(e[A]);for(let e in t)i[e]=t[e]}return i}function ei(e,i,A){return Math.max(i,Math.min(A,e))}class eA{constructor(e=0,i=0){eA.prototype.isVector2=!0,this.x=e,this.y=i}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,i){return this.x=e,this.y=i,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let i=this.x,A=this.y,t=e.elements;return this.x=t[0]*i+t[3]*A+t[6],this.y=t[1]*i+t[4]*A+t[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this}clampLength(e,i){let A=this.length();return this.divideScalar(A||1).multiplyScalar(Math.max(e,Math.min(i,A)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let i=Math.sqrt(this.lengthSq()*e.lengthSq());return 0===i?Math.PI/2:Math.acos(ei(this.dot(e)/i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let i=this.x-e.x,A=this.y-e.y;return i*i+A*A}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this}lerpVectors(e,i,A){return this.x=e.x+(i.x-e.x)*A,this.y=e.y+(i.y-e.y)*A,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this}rotateAround(e,i){let A=Math.cos(i),t=Math.sin(i),n=this.x-e.x,r=this.y-e.y;return this.x=n*A-r*t+e.x,this.y=n*t+r*A+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class et{constructor(e=0,i=0,A=0,t=1){this.isQuaternion=!0,this._x=e,this._y=i,this._z=A,this._w=t}static slerpFlat(e,i,A,t,n,r,s){let a=A[t+0],o=A[t+1],g=A[t+2],h=A[t+3],c=n[r+0],f=n[r+1],l=n[r+2],u=n[r+3];if(0===s){e[i+0]=a,e[i+1]=o,e[i+2]=g,e[i+3]=h;return}if(1===s){e[i+0]=c,e[i+1]=f,e[i+2]=l,e[i+3]=u;return}if(h!==u||a!==c||o!==f||g!==l){let e=1-s,i=a*c+o*f+g*l+h*u,A=i>=0?1:-1,t=1-i*i;if(t>Number.EPSILON){let n=Math.sqrt(t),r=Math.atan2(n,i*A);e=Math.sin(e*r)/n,s=Math.sin(s*r)/n}let n=s*A;if(a=a*e+c*n,o=o*e+f*n,g=g*e+l*n,h=h*e+u*n,e===1-s){let e=1/Math.sqrt(a*a+o*o+g*g+h*h);a*=e,o*=e,g*=e,h*=e}}e[i]=a,e[i+1]=o,e[i+2]=g,e[i+3]=h}static multiplyQuaternionsFlat(e,i,A,t,n,r){let s=A[t],a=A[t+1],o=A[t+2],g=A[t+3],h=n[r],c=n[r+1],f=n[r+2],l=n[r+3];return e[i]=s*l+g*h+a*f-o*c,e[i+1]=a*l+g*c+o*h-s*f,e[i+2]=o*l+g*f+s*c-a*h,e[i+3]=g*l-s*h-a*c-o*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,i,A,t){return this._x=e,this._y=i,this._z=A,this._w=t,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,i=!0){let A=e._x,t=e._y,n=e._z,r=e._order,s=Math.cos,a=Math.sin,o=s(A/2),g=s(t/2),h=s(n/2),c=a(A/2),f=a(t/2),l=a(n/2);switch(r){case"XYZ":this._x=c*g*h+o*f*l,this._y=o*f*h-c*g*l,this._z=o*g*l+c*f*h,this._w=o*g*h-c*f*l;break;case"YXZ":this._x=c*g*h+o*f*l,this._y=o*f*h-c*g*l,this._z=o*g*l-c*f*h,this._w=o*g*h+c*f*l;break;case"ZXY":this._x=c*g*h-o*f*l,this._y=o*f*h+c*g*l,this._z=o*g*l+c*f*h,this._w=o*g*h-c*f*l;break;case"ZYX":this._x=c*g*h-o*f*l,this._y=o*f*h+c*g*l,this._z=o*g*l-c*f*h,this._w=o*g*h+c*f*l;break;case"YZX":this._x=c*g*h+o*f*l,this._y=o*f*h+c*g*l,this._z=o*g*l-c*f*h,this._w=o*g*h-c*f*l;break;case"XZY":this._x=c*g*h-o*f*l,this._y=o*f*h-c*g*l,this._z=o*g*l+c*f*h,this._w=o*g*h+c*f*l;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+r)}return!0===i&&this._onChangeCallback(),this}setFromAxisAngle(e,i){let A=i/2,t=Math.sin(A);return this._x=e.x*t,this._y=e.y*t,this._z=e.z*t,this._w=Math.cos(A),this._onChangeCallback(),this}setFromRotationMatrix(e){let i=e.elements,A=i[0],t=i[4],n=i[8],r=i[1],s=i[5],a=i[9],o=i[2],g=i[6],h=i[10],c=A+s+h;if(c>0){let e=.5/Math.sqrt(c+1);this._w=.25/e,this._x=(g-a)*e,this._y=(n-o)*e,this._z=(r-t)*e}else if(A>s&&A>h){let e=2*Math.sqrt(1+A-s-h);this._w=(g-a)/e,this._x=.25*e,this._y=(t+r)/e,this._z=(n+o)/e}else if(s>h){let e=2*Math.sqrt(1+s-A-h);this._w=(n-o)/e,this._x=(t+r)/e,this._y=.25*e,this._z=(a+g)/e}else{let e=2*Math.sqrt(1+h-A-s);this._w=(r-t)/e,this._x=(n+o)/e,this._y=(a+g)/e,this._z=.25*e}return this._onChangeCallback(),this}setFromUnitVectors(e,i){let A=e.dot(i)+1;return A<Number.EPSILON?(A=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0):(this._x=0,this._y=-e.z,this._z=e.y)):(this._x=e.y*i.z-e.z*i.y,this._y=e.z*i.x-e.x*i.z,this._z=e.x*i.y-e.y*i.x),this._w=A,this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(ei(this.dot(e),-1,1)))}rotateTowards(e,i){let A=this.angleTo(e);if(0===A)return this;let t=Math.min(1,i/A);return this.slerp(e,t),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return 0===e?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,i){let A=e._x,t=e._y,n=e._z,r=e._w,s=i._x,a=i._y,o=i._z,g=i._w;return this._x=A*g+r*s+t*o-n*a,this._y=t*g+r*a+n*s-A*o,this._z=n*g+r*o+A*a-t*s,this._w=r*g-A*s-t*a-n*o,this._onChangeCallback(),this}slerp(e,i){if(0===i)return this;if(1===i)return this.copy(e);let A=this._x,t=this._y,n=this._z,r=this._w,s=r*e._w+A*e._x+t*e._y+n*e._z;if(s<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,s=-s):this.copy(e),s>=1)return this._w=r,this._x=A,this._y=t,this._z=n,this;let a=1-s*s;if(a<=Number.EPSILON){let e=1-i;return this._w=e*r+i*this._w,this._x=e*A+i*this._x,this._y=e*t+i*this._y,this._z=e*n+i*this._z,this.normalize(),this}let o=Math.sqrt(a),g=Math.atan2(o,s),h=Math.sin((1-i)*g)/o,c=Math.sin(i*g)/o;return this._w=r*h+this._w*c,this._x=A*h+this._x*c,this._y=t*h+this._y*c,this._z=n*h+this._z*c,this._onChangeCallback(),this}slerpQuaternions(e,i,A){return this.copy(e).slerp(i,A)}random(){let e=2*Math.PI*Math.random(),i=2*Math.PI*Math.random(),A=Math.random(),t=Math.sqrt(1-A),n=Math.sqrt(A);return this.set(t*Math.sin(e),t*Math.cos(e),n*Math.sin(i),n*Math.cos(i))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,i=0){return this._x=e[i],this._y=e[i+1],this._z=e[i+2],this._w=e[i+3],this._onChangeCallback(),this}toArray(e=[],i=0){return e[i]=this._x,e[i+1]=this._y,e[i+2]=this._z,e[i+3]=this._w,e}fromBufferAttribute(e,i){return this._x=e.getX(i),this._y=e.getY(i),this._z=e.getZ(i),this._w=e.getW(i),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class en{constructor(e=0,i=0,A=0){en.prototype.isVector3=!0,this.x=e,this.y=i,this.z=A}set(e,i,A){return void 0===A&&(A=this.z),this.x=e,this.y=i,this.z=A,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,i){switch(e){case 0:this.x=i;break;case 1:this.y=i;break;case 2:this.z=i;break;default:throw Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,i){return this.x=e.x+i.x,this.y=e.y+i.y,this.z=e.z+i.z,this}addScaledVector(e,i){return this.x+=e.x*i,this.y+=e.y*i,this.z+=e.z*i,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,i){return this.x=e.x-i.x,this.y=e.y-i.y,this.z=e.z-i.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,i){return this.x=e.x*i.x,this.y=e.y*i.y,this.z=e.z*i.z,this}applyEuler(e){return this.applyQuaternion(es.setFromEuler(e))}applyAxisAngle(e,i){return this.applyQuaternion(es.setFromAxisAngle(e,i))}applyMatrix3(e){let i=this.x,A=this.y,t=this.z,n=e.elements;return this.x=n[0]*i+n[3]*A+n[6]*t,this.y=n[1]*i+n[4]*A+n[7]*t,this.z=n[2]*i+n[5]*A+n[8]*t,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let i=this.x,A=this.y,t=this.z,n=e.elements,r=1/(n[3]*i+n[7]*A+n[11]*t+n[15]);return this.x=(n[0]*i+n[4]*A+n[8]*t+n[12])*r,this.y=(n[1]*i+n[5]*A+n[9]*t+n[13])*r,this.z=(n[2]*i+n[6]*A+n[10]*t+n[14])*r,this}applyQuaternion(e){let i=this.x,A=this.y,t=this.z,n=e.x,r=e.y,s=e.z,a=e.w,o=2*(r*t-s*A),g=2*(s*i-n*t),h=2*(n*A-r*i);return this.x=i+a*o+r*h-s*g,this.y=A+a*g+s*o-n*h,this.z=t+a*h+n*g-r*o,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let i=this.x,A=this.y,t=this.z,n=e.elements;return this.x=n[0]*i+n[4]*A+n[8]*t,this.y=n[1]*i+n[5]*A+n[9]*t,this.z=n[2]*i+n[6]*A+n[10]*t,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,i){return this.x=Math.max(e.x,Math.min(i.x,this.x)),this.y=Math.max(e.y,Math.min(i.y,this.y)),this.z=Math.max(e.z,Math.min(i.z,this.z)),this}clampScalar(e,i){return this.x=Math.max(e,Math.min(i,this.x)),this.y=Math.max(e,Math.min(i,this.y)),this.z=Math.max(e,Math.min(i,this.z)),this}clampLength(e,i){let A=this.length();return this.divideScalar(A||1).multiplyScalar(Math.max(e,Math.min(i,A)))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,i){return this.x+=(e.x-this.x)*i,this.y+=(e.y-this.y)*i,this.z+=(e.z-this.z)*i,this}lerpVectors(e,i,A){return this.x=e.x+(i.x-e.x)*A,this.y=e.y+(i.y-e.y)*A,this.z=e.z+(i.z-e.z)*A,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,i){let A=e.x,t=e.y,n=e.z,r=i.x,s=i.y,a=i.z;return this.x=t*a-n*s,this.y=n*r-A*a,this.z=A*s-t*r,this}projectOnVector(e){let i=e.lengthSq();if(0===i)return this.set(0,0,0);let A=e.dot(this)/i;return this.copy(e).multiplyScalar(A)}projectOnPlane(e){return er.copy(this).projectOnVector(e),this.sub(er)}reflect(e){return this.sub(er.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let i=Math.sqrt(this.lengthSq()*e.lengthSq());return 0===i?Math.PI/2:Math.acos(ei(this.dot(e)/i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let i=this.x-e.x,A=this.y-e.y,t=this.z-e.z;return i*i+A*A+t*t}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,i,A){let t=Math.sin(i)*e;return this.x=t*Math.sin(A),this.y=Math.cos(i)*e,this.z=t*Math.cos(A),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,i,A){return this.x=e*Math.sin(i),this.y=A,this.z=e*Math.cos(i),this}setFromMatrixPosition(e){let i=e.elements;return this.x=i[12],this.y=i[13],this.z=i[14],this}setFromMatrixScale(e){let i=this.setFromMatrixColumn(e,0).length(),A=this.setFromMatrixColumn(e,1).length(),t=this.setFromMatrixColumn(e,2).length();return this.x=i,this.y=A,this.z=t,this}setFromMatrixColumn(e,i){return this.fromArray(e.elements,4*i)}setFromMatrix3Column(e,i){return this.fromArray(e.elements,3*i)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,i=0){return this.x=e[i],this.y=e[i+1],this.z=e[i+2],this}toArray(e=[],i=0){return e[i]=this.x,e[i+1]=this.y,e[i+2]=this.z,e}fromBufferAttribute(e,i){return this.x=e.getX(i),this.y=e.getY(i),this.z=e.getZ(i),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,i=2*Math.random()-1,A=Math.sqrt(1-i*i);return this.x=A*Math.cos(e),this.y=i,this.z=A*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}let er=new en,es=new et,ea={aliceblue:0xf0f8ff,antiquewhite:0xfaebd7,aqua:65535,aquamarine:8388564,azure:0xf0ffff,beige:0xf5f5dc,bisque:0xffe4c4,black:0,blanchedalmond:0xffebcd,blue:255,blueviolet:9055202,brown:0xa52a2a,burlywood:0xdeb887,cadetblue:6266528,chartreuse:8388352,chocolate:0xd2691e,coral:0xff7f50,cornflowerblue:6591981,cornsilk:0xfff8dc,crimson:0xdc143c,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:0xb8860b,darkgray:0xa9a9a9,darkgreen:25600,darkgrey:0xa9a9a9,darkkhaki:0xbdb76b,darkmagenta:9109643,darkolivegreen:5597999,darkorange:0xff8c00,darkorchid:0x9932cc,darkred:9109504,darksalmon:0xe9967a,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:0xff1493,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:0xb22222,floralwhite:0xfffaf0,forestgreen:2263842,fuchsia:0xff00ff,gainsboro:0xdcdcdc,ghostwhite:0xf8f8ff,gold:0xffd700,goldenrod:0xdaa520,gray:8421504,green:32768,greenyellow:0xadff2f,grey:8421504,honeydew:0xf0fff0,hotpink:0xff69b4,indianred:0xcd5c5c,indigo:4915330,ivory:0xfffff0,khaki:0xf0e68c,lavender:0xe6e6fa,lavenderblush:0xfff0f5,lawngreen:8190976,lemonchiffon:0xfffacd,lightblue:0xadd8e6,lightcoral:0xf08080,lightcyan:0xe0ffff,lightgoldenrodyellow:0xfafad2,lightgray:0xd3d3d3,lightgreen:9498256,lightgrey:0xd3d3d3,lightpink:0xffb6c1,lightsalmon:0xffa07a,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:0xb0c4de,lightyellow:0xffffe0,lime:65280,limegreen:3329330,linen:0xfaf0e6,magenta:0xff00ff,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:0xba55d3,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:0xc71585,midnightblue:1644912,mintcream:0xf5fffa,mistyrose:0xffe4e1,moccasin:0xffe4b5,navajowhite:0xffdead,navy:128,oldlace:0xfdf5e6,olive:8421376,olivedrab:7048739,orange:0xffa500,orangered:0xff4500,orchid:0xda70d6,palegoldenrod:0xeee8aa,palegreen:0x98fb98,paleturquoise:0xafeeee,palevioletred:0xdb7093,papayawhip:0xffefd5,peachpuff:0xffdab9,peru:0xcd853f,pink:0xffc0cb,plum:0xdda0dd,powderblue:0xb0e0e6,purple:8388736,rebeccapurple:6697881,red:0xff0000,rosybrown:0xbc8f8f,royalblue:4286945,saddlebrown:9127187,salmon:0xfa8072,sandybrown:0xf4a460,seagreen:3050327,seashell:0xfff5ee,sienna:0xa0522d,silver:0xc0c0c0,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:0xfffafa,springgreen:65407,steelblue:4620980,tan:0xd2b48c,teal:32896,thistle:0xd8bfd8,tomato:0xff6347,turquoise:4251856,violet:0xee82ee,wheat:0xf5deb3,white:0xffffff,whitesmoke:0xf5f5f5,yellow:0xffff00,yellowgreen:0x9acd32},eo={h:0,s:0,l:0},eg={h:0,s:0,l:0};function eh(e,i,A){return A<0&&(A+=1),A>1&&(A-=1),A<1/6?e+(i-e)*6*A:A<.5?i:A<2/3?e+(i-e)*6*(2/3-A):e}class ec{constructor(e,i,A){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,i,A)}set(e,i,A){return void 0===i&&void 0===A?e&&e.isColor?this.copy(e):"number"==typeof e?this.setHex(e):"string"==typeof e&&this.setStyle(e):this.setRGB(e,i,A),this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,i=X){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(255&e)/255,V.toWorkingColorSpace(this,i),this}setRGB(e,i,A,t=V.workingColorSpace){return this.r=e,this.g=i,this.b=A,V.toWorkingColorSpace(this,t),this}setHSL(e,i,A,t=V.workingColorSpace){if(e=(e%1+1)%1,i=ei(i,0,1),A=ei(A,0,1),0===i)this.r=this.g=this.b=A;else{let t=A<=.5?A*(1+i):A+i-A*i,n=2*A-t;this.r=eh(n,t,e+1/3),this.g=eh(n,t,e),this.b=eh(n,t,e-1/3)}return V.toWorkingColorSpace(this,t),this}setStyle(e,i=X){let A;function t(i){void 0!==i&&1>parseFloat(i)&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}if(A=/^(\w+)\(([^\)]*)\)/.exec(e)){let n;let r=A[1],s=A[2];switch(r){case"rgb":case"rgba":if(n=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setRGB(Math.min(255,parseInt(n[1],10))/255,Math.min(255,parseInt(n[2],10))/255,Math.min(255,parseInt(n[3],10))/255,i);if(n=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setRGB(Math.min(100,parseInt(n[1],10))/100,Math.min(100,parseInt(n[2],10))/100,Math.min(100,parseInt(n[3],10))/100,i);break;case"hsl":case"hsla":if(n=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(s))return t(n[4]),this.setHSL(parseFloat(n[1])/360,parseFloat(n[2])/100,parseFloat(n[3])/100,i);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(A=/^\#([A-Fa-f\d]+)$/.exec(e)){let t=A[1],n=t.length;if(3===n)return this.setRGB(parseInt(t.charAt(0),16)/15,parseInt(t.charAt(1),16)/15,parseInt(t.charAt(2),16)/15,i);if(6===n)return this.setHex(parseInt(t,16),i);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,i);return this}setColorName(e,i=X){let A=ea[e.toLowerCase()];return void 0!==A?this.setHex(A,i):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=U(e.r),this.g=U(e.g),this.b=U(e.b),this}copyLinearToSRGB(e){return this.r=$(e.r),this.g=$(e.g),this.b=$(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=X){return V.fromWorkingColorSpace(ef.copy(this),e),65536*Math.round(ei(255*ef.r,0,255))+256*Math.round(ei(255*ef.g,0,255))+Math.round(ei(255*ef.b,0,255))}getHexString(e=X){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,i=V.workingColorSpace){let A,t;V.fromWorkingColorSpace(ef.copy(this),i);let n=ef.r,r=ef.g,s=ef.b,a=Math.max(n,r,s),o=Math.min(n,r,s),g=(o+a)/2;if(o===a)A=0,t=0;else{let e=a-o;switch(t=g<=.5?e/(a+o):e/(2-a-o),a){case n:A=(r-s)/e+6*(r<s);break;case r:A=(s-n)/e+2;break;case s:A=(n-r)/e+4}A/=6}return e.h=A,e.s=t,e.l=g,e}getRGB(e,i=V.workingColorSpace){return V.fromWorkingColorSpace(ef.copy(this),i),e.r=ef.r,e.g=ef.g,e.b=ef.b,e}getStyle(e=X){V.fromWorkingColorSpace(ef.copy(this),e);let i=ef.r,A=ef.g,t=ef.b;return e!==X?`color(${e} ${i.toFixed(3)} ${A.toFixed(3)} ${t.toFixed(3)})`:`rgb(${Math.round(255*i)},${Math.round(255*A)},${Math.round(255*t)})`}offsetHSL(e,i,A){return this.getHSL(eo),this.setHSL(eo.h+e,eo.s+i,eo.l+A)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,i){return this.r=e.r+i.r,this.g=e.g+i.g,this.b=e.b+i.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,i){return this.r+=(e.r-this.r)*i,this.g+=(e.g-this.g)*i,this.b+=(e.b-this.b)*i,this}lerpColors(e,i,A){return this.r=e.r+(i.r-e.r)*A,this.g=e.g+(i.g-e.g)*A,this.b=e.b+(i.b-e.b)*A,this}lerpHSL(e,i){this.getHSL(eo),e.getHSL(eg);let A=(1-i)*eo.h+i*eg.h,t=(1-i)*eo.s+i*eg.s,n=(1-i)*eo.l+i*eg.l;return this.setHSL(A,t,n),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let i=this.r,A=this.g,t=this.b,n=e.elements;return this.r=n[0]*i+n[3]*A+n[6]*t,this.g=n[1]*i+n[4]*A+n[7]*t,this.b=n[2]*i+n[5]*A+n[8]*t,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,i=0){return this.r=e[i],this.g=e[i+1],this.b=e[i+2],this}toArray(e=[],i=0){return e[i]=this.r,e[i+1]=this.g,e[i+2]=this.b,e}fromBufferAttribute(e,i){return this.r=e.getX(i),this.g=e.getY(i),this.b=e.getZ(i),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}let ef=new ec;ec.NAMES=ea;let el={common:{diffuse:{value:new ec(0xffffff)},opacity:{value:1},map:{value:null},mapTransform:{value:new Q},alphaMap:{value:null},alphaMapTransform:{value:new Q},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Q}},envmap:{envMap:{value:null},envMapRotation:{value:new Q},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Q}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Q}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Q},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Q},normalScale:{value:new eA(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Q},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Q}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Q}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Q}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ec(0xffffff)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ec(0xffffff)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Q},alphaTest:{value:0},uvTransform:{value:new Q}},sprite:{diffuse:{value:new ec(0xffffff)},opacity:{value:1},center:{value:new eA(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Q},alphaMap:{value:null},alphaMapTransform:{value:new Q},alphaTest:{value:0}}},eu={basic:{uniforms:ee([el.common,el.specularmap,el.envmap,el.aomap,el.lightmap,el.fog]),vertexShader:P,fragmentShader:v},lambert:{uniforms:ee([el.common,el.specularmap,el.envmap,el.aomap,el.lightmap,el.emissivemap,el.bumpmap,el.normalmap,el.displacementmap,el.fog,el.lights,{emissive:{value:new ec(0)}}]),vertexShader:z,fragmentShader:C},phong:{uniforms:ee([el.common,el.specularmap,el.envmap,el.aomap,el.lightmap,el.emissivemap,el.bumpmap,el.normalmap,el.displacementmap,el.fog,el.lights,{emissive:{value:new ec(0)},specular:{value:new ec(1118481)},shininess:{value:30}}]),vertexShader:D,fragmentShader:b},standard:{uniforms:ee([el.common,el.envmap,el.aomap,el.lightmap,el.emissivemap,el.bumpmap,el.normalmap,el.displacementmap,el.roughnessmap,el.metalnessmap,el.fog,el.lights,{emissive:{value:new ec(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:K,fragmentShader:_},toon:{uniforms:ee([el.common,el.aomap,el.lightmap,el.emissivemap,el.bumpmap,el.normalmap,el.displacementmap,el.gradientmap,el.fog,el.lights,{emissive:{value:new ec(0)}}]),vertexShader:H,fragmentShader:q},matcap:{uniforms:ee([el.common,el.bumpmap,el.normalmap,el.displacementmap,el.fog,{matcap:{value:null}}]),vertexShader:I,fragmentShader:w},points:{uniforms:ee([el.points,el.fog]),vertexShader:M,fragmentShader:x},dashed:{uniforms:ee([el.common,el.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:d,fragmentShader:B},depth:{uniforms:ee([el.common,el.displacementmap]),vertexShader:h,fragmentShader:c},normal:{uniforms:ee([el.common,el.bumpmap,el.normalmap,el.displacementmap,{opacity:{value:1}}]),vertexShader:G,fragmentShader:y},sprite:{uniforms:ee([el.sprite,el.fog]),vertexShader:L,fragmentShader:F},background:{uniforms:{uvTransform:{value:new Q},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:n,fragmentShader:r},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Q}},vertexShader:s,fragmentShader:a},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:o,fragmentShader:g},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:u,fragmentShader:p},distanceRGBA:{uniforms:ee([el.common,el.displacementmap,{referencePosition:{value:new en},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:f,fragmentShader:l},shadow:{uniforms:ee([el.lights,el.fog,{color:{value:new ec(0)},opacity:{value:1}}]),vertexShader:Y,fragmentShader:O}};eu.physical={uniforms:ee([eu.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Q},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Q},clearcoatNormalScale:{value:new eA(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Q},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Q},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Q},sheen:{value:0},sheenColor:{value:new ec(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Q},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Q},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Q},transmissionSamplerSize:{value:new eA},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Q},attenuationDistance:{value:0},attenuationColor:{value:new ec(0)},specularColor:{value:new ec(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Q},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Q},anisotropyVector:{value:new eA},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Q}}]),vertexShader:K,fragmentShader:_};let em=`varying vec3 vWorldPosition;

void main() {
    vec4 worldPos = modelMatrix * vec4(position, 1.0);
    vWorldPosition = worldPos.xyz;
    gl_Position = projectionMatrix * viewMatrix * worldPos;
}`,ep=`uniform float uGridSize;
uniform float uMajorLineEvery;
uniform vec3 uMinorLineColor;
uniform vec3 uMajorLineColor;
uniform float uFadeDistance;

varying vec3 vWorldPosition;

void main() {
    vec2 coord = vWorldPosition.xz;

    // Minor grid
    vec2 minorCoord = coord / uGridSize;
    vec2 minorGrid = abs(fract(minorCoord - 0.5) - 0.5) / fwidth(minorCoord);
    float lineMinor = min(minorGrid.x, minorGrid.y);

    // Major grid
    float majorSize = uGridSize * uMajorLineEvery;
    vec2 majorCoord = coord / majorSize;
    vec2 majorGrid = abs(fract(majorCoord - 0.5) - 0.5) / fwidth(majorCoord);
    float lineMajor = min(majorGrid.x, majorGrid.y);

    // Line alpha: minor = 1px, major = 2px wide
    float minorAlpha = 1.0 - min(lineMinor, 1.0);
    float majorAlpha = 1.0 - min(lineMajor / 2.0, 1.0);

    float alpha = max(minorAlpha, majorAlpha);
    vec3 color = mix(uMinorLineColor, uMajorLineColor, step(minorAlpha, majorAlpha));

    // Radial fade from camera
    float dist = length(vWorldPosition.xz - cameraPosition.xz);
    alpha *= 1.0 - smoothstep(uFadeDistance * 0.5, uFadeDistance, dist);

    if (alpha < 0.001) discard;

    gl_FragColor = vec4(color, alpha);
}`,ed={uniforms:{uGridSize:{value:1},uMajorLineEvery:{value:10},uMinorLineColor:{value:new t.Q1f("#dddddd")},uMajorLineColor:{value:new t.Q1f("#888888")},uFadeDistance:{value:10}},vertexShader:em,fragmentShader:ep},eB={...eu,grid:ed};class eP extends t.BKk{}},5075(e,i,A){A.d(i,{C:()=>o,D:()=>u,H:()=>h,P:()=>c,U:()=>g,a:()=>f,b:()=>a});var t=A(9451),n=Object.defineProperty,r=(e,i,A)=>i in e?n(e,i,{enumerable:!0,configurable:!0,writable:!0,value:A}):e[i]=A,s=(e,i,A)=>r(e,"symbol"!=typeof i?i+"":i,A);let a=1,o=2,g=4,h=8,c=16,f={fov:70,near:.001,far:1e3},l=class e extends t.ubm{constructor(i=f){super(i.fov||f.fov,1,i.near||f.near,i.far||f.far),s(this,"isDIVEPerspectiveCamera",!0),s(this,"onSetCameraLayer",()=>{}),this.layers.mask=e.EDITOR_VIEW_LAYER_MASK}onResize(e,i){this.aspect=e/i,this.updateProjectionMatrix()}setCameraLayer(i){this.layers.mask="LIVE"===i?e.LIVE_VIEW_LAYER_MASK:e.EDITOR_VIEW_LAYER_MASK,this.onSetCameraLayer(this.layers.mask)}};s(l,"EDITOR_VIEW_LAYER_MASK",29),s(l,"LIVE_VIEW_LAYER_MASK",c);let u=l},6179(e,i,A){A.d(i,{B:()=>G,D:()=>j,F:()=>Z,G:()=>q,O:()=>F,S:()=>S,b:()=>E,c:()=>y,d:()=>v,e:()=>g,f:()=>k,g:()=>l,h:()=>f,i:()=>K,j:()=>M,k:()=>b,l:()=>w,m:()=>z,n:()=>D,o:()=>d,p:()=>p,q:()=>u,r:()=>B,s:()=>_,t:()=>Y,u:()=>x,v:()=>C,w:()=>P,x:()=>H,y:()=>I});var t=A(9451),n=A(5075),r=A(122),s=Object.defineProperty,a=(e,i,A)=>i in e?s(e,i,{enumerable:!0,configurable:!0,writable:!0,value:A}):e[i]=A,o=(e,i,A)=>a(e,"symbol"!=typeof i?i+"":i,A);class g{constructor(){o(this,"isDIVEClock",!0),o(this,"_lastTime",0),o(this,"_isRunning",!1),o(this,"_tickers",[])}start(){this._isRunning||(this._isRunning=!0,this._lastTime=performance.now(),requestAnimationFrame(this._tick.bind(this)))}stop(){this._isRunning=!1}addTicker(e){this._tickers.find(i=>i.uuid===e.uuid)||this._tickers.push(e)}hasTicker(e){return void 0!==this._tickers.find(i=>i.uuid===e.uuid)}removeTicker(e){let i=this._tickers.findIndex(i=>i.uuid===e.uuid);-1!==i&&this._tickers.splice(i,1)}dispose(){this.stop(),this._tickers=[],this._isRunning=!1,this._lastTime=0}_tick(e){if(!this._isRunning)return;let i=(e-this._lastTime)/1e3;this._lastTime=e,this._tickers.forEach(e=>e.tick(i)),requestAnimationFrame(this._tick.bind(this))}}class h extends t.BRH{constructor(e){super(e),this.type=t.ix0}parse(e){let i,A,n;let r=function(e,i){switch(e){case 1:throw Error("THREE.RGBELoader: Read Error: "+(i||""));case 2:throw Error("THREE.RGBELoader: Write Error: "+(i||""));case 3:throw Error("THREE.RGBELoader: Bad File Format: "+(i||""));default:throw Error("THREE.RGBELoader: Memory Error: "+(i||""))}},s=`
`,a=function(e,i,A){i=i||1024;let t=e.pos,n=-1,r=0,a="",o=String.fromCharCode.apply(null,new Uint16Array(e.subarray(t,t+128)));for(;0>(n=o.indexOf(s))&&r<i&&t<e.byteLength;)a+=o,r+=o.length,t+=128,o+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(t,t+128)));return -1<n&&(e.pos+=r+n+1,a+o.slice(0,n))},o=new Uint8Array(e);o.pos=0;let g=function(e){let i,A;let t=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,n=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,s=/^\s*FORMAT=(\S+)\s*$/,o=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,g={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0};for(!(e.pos>=e.byteLength)&&(i=a(e))||r(1,"no header found"),(A=i.match(/^#\?(\S+)/))||r(3,"bad initial token"),g.valid|=1,g.programtype=A[1],g.string+=i+`
`;!1!==(i=a(e));){if(g.string+=i+`
`,"#"===i.charAt(0)){g.comments+=i+`
`;continue}if((A=i.match(t))&&(g.gamma=parseFloat(A[1])),(A=i.match(n))&&(g.exposure=parseFloat(A[1])),(A=i.match(s))&&(g.valid|=2,g.format=A[1]),(A=i.match(o))&&(g.valid|=4,g.height=parseInt(A[1],10),g.width=parseInt(A[2],10)),2&g.valid&&4&g.valid)break}return 2&g.valid||r(3,"missing format specifier"),4&g.valid||r(3,"missing image size specifier"),g}(o),h=g.width,c=g.height,f=function(e,i,A){if(i<8||i>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);i!==(e[2]<<8|e[3])&&r(3,"wrong scanline width");let t=new Uint8Array(4*i*A);t.length||r(4,"unable to allocate buffer space");let n=0,s=0,a=4*i,o=new Uint8Array(4),g=new Uint8Array(a),h=A;for(;h>0&&s<e.byteLength;){s+4>e.byteLength&&r(1),o[0]=e[s++],o[1]=e[s++],o[2]=e[s++],o[3]=e[s++],(2!=o[0]||2!=o[1]||(o[2]<<8|o[3])!=i)&&r(3,"bad rgbe scanline format");let A=0,c;for(;A<a&&s<e.byteLength;){let i=(c=e[s++])>128;if(i&&(c-=128),(0===c||A+c>a)&&r(3,"bad scanline data"),i){let i=e[s++];for(let e=0;e<c;e++)g[A++]=i}else g.set(e.subarray(s,s+c),A),A+=c,s+=c}for(let e=0;e<i;e++){let A=0;t[n]=g[e+A],A+=i,t[n+1]=g[e+A],A+=i,t[n+2]=g[e+A],A+=i,t[n+3]=g[e+A],n+=4}h--}return t}(o.subarray(o.pos),h,c);switch(this.type){case t.RQf:let l=new Float32Array(4*(n=f.length/4));for(let e=0;e<n;e++)!function(e,i,A,t){let n=Math.pow(2,e[i+3]-128)/255;A[t+0]=e[i+0]*n,A[t+1]=e[i+1]*n,A[t+2]=e[i+2]*n,A[t+3]=1}(f,4*e,l,4*e);i=l,A=t.RQf;break;case t.ix0:let u=new Uint16Array(4*(n=f.length/4));for(let e=0;e<n;e++)!function(e,i,A,n){let r=Math.pow(2,e[i+3]-128)/255;A[n+0]=t.GxU.toHalfFloat(Math.min(e[i+0]*r,65504)),A[n+1]=t.GxU.toHalfFloat(Math.min(e[i+1]*r,65504)),A[n+2]=t.GxU.toHalfFloat(Math.min(e[i+2]*r,65504)),A[n+3]=t.GxU.toHalfFloat(1)}(f,4*e,u,4*e);i=u,A=t.ix0;break;default:throw Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:h,height:c,data:i,header:g.string,gamma:g.gamma,exposure:g.exposure,type:A}}setDataType(e){return this.type=e,this}load(e,i,A,n){return super.load(e,function(e,A){switch(e.type){case t.RQf:case t.ix0:e.colorSpace=t.Zr2,e.minFilter=t.k6q,e.magFilter=t.k6q,e.generateMipmaps=!1,e.flipY=!0}i&&i(e,A)},A,n)}}let c="data:application/octet-stream;base64,Iz9SQURJQU5DRQojIE1hZGUgd2l0aCBBZG9iZSBQaG90b3Nob3AKRk9STUFUPTMyLWJpdF9ybGVfcmdiZQoKLVkgNTEyICtYIDEwMjQKAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/3P/c/9z/3P/c/9z/3P/ciNz/gf+B/4H/gf+B/4H/gf+BiIECAgQA/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/9z/3P/c/9z/3P/c/9z/3Ijc/4H/gf+B/4H/gf+B/4H/gYiBAgIEAP/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P/c/9z/3P/c/9z/3P/c/9yI3P+B/4H/gf+B/4H/gf+B/4GIgQICBAD/3P/c/9z/3P/c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0AfX/ZOnuMrZodwH0sKyoI7y0v/Q/9AI0NDQ75Ksx9vk3OCAs4H/gNCAtYH/gNOAq4H/gP+AhoDogQICBAAIzs/Oz8/Ozs6GzwvOz8/Oz8/Pzs/OzobPBs7Pzs/OzobPEM7Pzs7Pzs/Oz8/Ozs/Pz86EzwXOz8/PzobPhM4Iz87Pzs/Ozs6JzwzOzs/PztT7kqS0xNSc3BTazL2unYntz8/Oz8/Oz8/Pzs7PzoTPC87Pz87Pzs7Pzs/Ohs8BzoTPBc7Pz8/OhM8Dzs/Oh88BzojPAc6FzwTOz87OhM8Ezs/PzorPB87Pz8/Ozs6IzwXOz87PzoTPhM6EzwbOz87Pz86Ezw7Oz87Pz8/Oz87Pzs/OzofPAc6EzxHOz87Oz87Ozs/Pz87Pz87PzoXPB87Ozs/Pzs6NzwfOzs/Oz8/PhM4Uz8/U6YGMlpyjqrG3vsXMzNHU1NmG3BLZ1NTQzMrEvLWtpZ6WjoTz2c6FzwHOhM8Fzs/Pz86FzyTOzs/Oz8/Oz87Ozs/Oz8/Pzs/Pzs/Oz8/Pzs/Pzs/Pz87Pzs6IzwXOzs/OzobPCM7Pz8/Ozs/Ohc8Ezs/PzpTPBM7Pz86EzwbOz87Pzs+EzoXPCc7Pz87Pz8/OzoTPHM7Pz8/Ozs/Oz8/Ozs/Pzs/Pzs/Pz87Oz8/Ozs6EzwXOzs7PzoTPhM4Dz8/Ohc8BzoXPG87Pz87Pz8/Oz8/PztDmgo6Yoaqzu8XMztTU24XcDtTUz8zFvrSropmRhvLXhM8Gzs7Pzs/OiM8BzoTPC87Oz8/Pzs7Pzs7Oh88Jzs7Pz87Pzs/Ohs8Nzs/Pzs/Pzs7Oz8/PzoXPEs7Pzs/Pzs/Pzs7Oz8/Ozs/OzobPB87Ozs/Pz86EzwTOz87PhM4az87Pzs/Oz8/Ozs/Pz87Pzs/Oz8/Oz87Pz86GzxDOz8/Oz87Oz87Oz87Pzs/OhM8Gzs/Oz8/OhM8Lzs/Pz87Pz87Pzs6EzybOz8/Ozs7Pz8/Ozs/Ozs7Pz87Pz87Ozs/Pzs/Oz87Oz87Pzs7PzoTPAc6Ez4XOhc8BzoTPAc6FzwvOz8/Oz8/ahqG71eDcAc+HzgXPzs/PzoTPFM7Oz87Oz8/Oz8/Pzs/Ozs7Pz8/Ohs8Hzs7Pz8/OzobPBM7Pz86EzxHOz87Pz87Pzs7Pz87Pz87PzoXPBc7Pzs7PhM4Mz8/Pzs/U+5KktMTUnNwQ2sy9rp2J7c/Ozs/Oz8/PzoXPB87Pz8/Ozs6Fzx7Oz87Oz87Pzs7Oz87Pz87Pzs/Pz87Pz8/Ozs/Ozs6GzxDOzs/Pz87Oz87Pzs/Pzs/OhM8BzoTPC87Pzs/Oz8/Oz87Ohs+FzgPPzs+FzgnPz87Pz8/Ozs+EzhfPzs/Oz87Pzs/Pzs/Ozs/Oz87Ozs/PzoTPDs7Pzs7Pzs7Oz87Pz8/OhM8Mzs/Oz8/Pzs7Oz8/OhM8Gzs7Pz87PhM4Ez8/PzofPGM7Pz87Pz9TpgYyWnKOqsbe+xczM0dTU2YbcF9nU1NDMysS8ta2lnpaOhPPZzs/Ozs7Phc4Sz8/Ozs/Oz87Ozs/Oz8/Pzs7Phs4Mz87Pzs/Pz87Pzs7Phc4Lz87Pzs7Oz8/Oz8+FzoLPh84Kz8/Pzs/Oz87OzoXPHs7Pz87Pzs/Ozs7Pz87Pzs/Ozs7Pzs/Pz87Ozs/PzoTPgs6EzxrOz8/Pzs7Oz87Ozs/Pzs/Pz87Oz87Oz8/OzoTPEc7Oz87Ozs/Pz87Pz8/Oz87PhM6Ezw3Ozs/Ozs/Pzs7Pz87Phc4ez87Oz87Oz8/Oz87Oz87P0OaCjpihqrO7xczO1NTbhdwb1NTPzMW+tKuimZGG8tfPzs7Pz8/Ozs/Ozs/PhM41z8/Oz87Pzs7Pzs/Pzs/Pzs/Pzs/Oz87Pz87Pz87Pz87Pzs/Pzs/Oz8/Ozs/Ozs7Pzs/Pzs+EzoLPhc6Cz4XOBs/Pzs7Pz4TOCM/Ozs/Ozs/Ohc+EzoPPhM4Hz8/Oz87OzoXPBc7Ozs/PhM4dz87Pz8/Oz8/Pzs/Oz87Ozs/Oz87Ozs/Oz87Pzs+FzgfPzs/Oz8/OhM8hzs7Pzs7Oz8/Oz87Oz87Oz87Ozs/Ozs/Ozs/Ozs7Pz87OiM+CzobPB87Pzs/Pz86EzxnOz87Ozs/Pz87Ozs/Pzs/Ozs/Oz9qGobvV4NwEz8/PzojPA87PzofPAc6IzwHOhc8Ezs/OzoTPBM7Pz86KzwHOhM+CzojPBc7Pzs/Ohc+DzoTPEM7Pzs/Pzs/Pz9T7kqS0xNSc3AnazL2unYntz86GzwbOzs/Pzs6Nz4LOhc+EzgrPz87Pzs7Pz87Ohc8Rzs/Pz87Oz87Pz87Pz8/Oz86EzwHOhM+DzoXPAc6EzwXOz8/PzoXPFs7Oz87Pz87Pzs7Oz87Pz8/Oz8/Oz86GzwjOz8/Pzs/PzonPBM7Pzs6GzwHOhs8BzoXPBM7Pz86SzwHOk88Yzs/Pz87P1OmBjJaco6qxt77FzMzR1NTZhtwc2dTU0MzKxLy1raWelo6E89nOz8/Oz87Pz87PzoXPgs6GzxPOz8/Pzs/Pz87Pz8/Ozs/Ozs/OhM8Hzs7Pz87PzofPhM4Hz8/Oz8/PzojPCc7Oz8/Oz87PzoXPBc7Pz8/OhM+CzoTPgs6FzwbOz87Pzs6FzwXOz87PzofPgs6Hz4POhc8Gzs7Pz87OhM8Rzs/Oz87Pzs/Oz87Oz87Pz86EzxXOz87Pz8/Oz8/Pzs/Oz8/Oz8/Pzs6Mzw/Q5oKOmKGqs7vFzM7U1NuF3BPU1M/Mxb60q6KZkYby18/Pz87OlM8Wzs7Pz87Oz8/Pzs7Pzs/Pzs/Oz8/PzoXPAc6Fzw3Oz8/Ozs7Pzs/Oz8/Ojc8Dzs/Oh8+CzoXPAc6FzwHOh88Izs/Pzs7Pz86EzwTOz87Oh88BzoTPB87Pzs/Pz86EzwHOjs8Bzo/PAc6EzwHOjs8Ezs/OzoTPA87Pz4TOBs/Oz87PzoXPB87Ozs/Pz86IzwLOz4XOCc/Oz8/Ozs7PzoXPBs7ahqG71eDc5oCngf+A3oClgf+A4YCegf+A/4CRgOSBAgIEAOvNHd7/i5ehq7fByc3U1tzc3NbU0MzKwrmvpZuRhevR/83/zf/N/83/zf/Nnc0Fz/aVsMvc3OvNHd7/i5ehq7fByc3U1tzc3NbU0MzKwrmvpZuRhevR/83/zf/N/83/zf/Nnc0Fz/aVsMvc3OvNHd7/i5ehq7fByc3U1tzc3NbU0MzKwrmvpZuRhevR/83/zf/N/83/zf/Nnc0Fz/aVsMvc3O2AmYH/gP+A/4D/gP+A/4ChgN+BAgIEAP/M/8z/zP/M/8z/zP/Mq8wF34miu9TX3P/M/8z/zP/M/8z/zP/Mq8wF34miu9TX3P/M/8z/zP/M/8z/zP/Mq8wF34miu9TX3P+A/4D/gP+A/4D/gP+ArIDbgQICBAD/y//L/8v/y//L/8v/y7DLBe2QqcHY0tz/y//L/8v/y//L/8v/y7DLBe2QqcHY0tz/y//L/8v/y//L/8v/y7DLBe2QqcHY0tz/gP+A/4D/gP+A/4D/gLGA1oECAgQA/8n/yf/J/8n/yf/J/8m0yQbO+ZOpv9XN3P/J/8n/yf/J/8n/yf/JtMkGzvmTqb/Vzdz/yf/J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AgQA/5n/mf+Z/5mlmQKRxIe+AoCG/4qpigL2pYe+Afa7mQHwhb4Bsf+KtYoBxYW+Acelmf+Z/5n/mf+ZpZkCkcSHvgKAhv+KqYoC9qWHvgH2u5kB8IW+AbH/irWKAcWFvgHHpZn/mf+Z/5n/maWZApHEh74CgIb/iqmKAvalh74B9ruZAfCFvgGx/4q1igHFhb4Bx6WZ/4D/gP+A/4CmgIh/AYH/gqqCAoGAiH+7gIZ/AYH/grWCAYGGf6WAAgIEAP+Y/5j/mP+YpZgB0oa8AsCp/4qsigKCyoe8Af26mAHdhbwB0v+KtYoCh/2FvAGJpJj/mP+Y/5j/mKWYAdKGvALAqf+KrIoCgsqHvAH9upgB3YW8AdL/irWKAof9hbwBiaSY/5j/mP+Y/5ilmAHShrwCwKn/iqyKAoLKh7wB/bqYAd2FvAHS/4q1igKH/YW8AYmkmP+A/4D/gP+ApYCIfwGB/4KtggGAiH+6gIZ/AYH/graChn+lgAICBAD/l/+X/5f/l6SXAeKGuwLGvP+KrooChtGHuwGCuZcB0YW7Aej/iraKAYmFuwHtpJf/l/+X/5f/l6SXAeKGuwLGvP+KrooChtGHuwGCuZcB0YW7Aej/iraKAYmFuwHtpJf/l/+X/5f/l6SXAeKGuwLGvP+KrooChtGHuwGCuZcB0YW7Aej/iraKAYmFuwHtpJf/gP+A/4D/gKSAiH8Bgf+Cr4IBgId/uoCGfwGB/4K2ggGBhn+kgAICBAD/lf+V/5X/laOVAfeGuQLExf+KsIoChcWGuQK/jriVAcSFuQH9/4q2igHOhbkB0aSV/5X/lf+V/5WjlQH3hrkCxMX/irCKAoXFhrkCv464lQHEhbkB/f+KtooBzoW5AdGklf+V/5X/lf+Vo5UB94a5AsTF/4qwigKFxYa5Ar+OuJUBxIW5Af3/iraKAc6FuQHRpJX/gP+A/4D/gKOAiH8Bgf+CsYIBgId/uYCGfwGB/4K2ggGBhn+kgAICBAD/lP+U/5T/lKKUAYCHuAG2/4qyigKDrYa4AeK4lAG7hbgBhv+KtooChtWFuAGSo5T/lP+U/5T/lKKUAYCHuAG2/4qyigKDrYa4AeK4lAG7hbgBhv+KtooChtWFuAGSo5T/lP+U/5T/lKKUAYCHuAG2/4qyigKDrYa4AeK4lAG7hbgBhv+KtooChtWFuAGSo5T/gP+A/4D/gKOAh38Bgf+Cs4IBgId/uICGf/+CuIKGf6SAAgIEAP+T/5P/k/+ToZMCjL2GtgGa/4q0igL7hoa2Afy3k4a2/4q4igHLhbYBhaOT/5P/k/+T/5OhkwKMvYa2AZr/irSKAvuGhrYB/LeThrb/iriKAcuFtgGFo5P/k/+T/5P/k6GTAoy9hrYBmv+KtIoC+4aGtgH8t5OGtv+KuIoBy4W2AYWjk/+A/4D/gP+AooCHfwGB/4K0ggKBgId/t4CGf/+CuIIBgIV/pIACAgQA/5L/kv+S/5KhkgHphrUB6v+KtooC3cOFtQK4ibWSAZCFtQHL/4q4igGchbUB7qOS/5L/kv+S/5KhkgHphrUB6v+KtooC3cOFtQK4ibWSAZCFtQHL/4q4igGchbUB7qOS/5L/kv+S/5KhkgHphrUB6v+KtooC3cOFtQK4ibWSAZCFtQHL/4q4igGchbUB7qOS/4D/gP+A/4ChgId/AYD/graCAYGHf7eAhn//griCAYGGf6OAAgIEAP+R/5H/kf+RoJEBhYazAoyB/4q3igGjhrMB3rWRAY2FswHq/4q4igHOhbMB1aOR/5H/kf+R/5GgkQGFhrMCjIH/ireKAaOGswHetZEBjYWzAer/iriKAc6FswHVo5H/kf+R/5H/kaCRAYWGswKMgf+Kt4oBo4azAd61kQGNhbMB6v+KuIoBzoWzAdWjkf+A/4D/gP+AoYCGfwGA/4K4ggGBh3+2gIZ//4K4ggGBhn+jgAICBAD/kP+Q/5D/kKCQAdeFsgK22/+KuIoCiLuGsgGCtJABj4ay/4q4igH3hbIBwKOQ/5D/kP+Q/5CgkAHXhbICttv/iriKAoi7hrIBgrSQAY+Gsv+KuIoB94WyAcCjkP+Q/5D/kP+QoJAB14WyArbb/4q4igKIu4ayAYK0kAGPhrL/iriKAfeFsgHAo5D/gP+A/4D/gKCAh38Bgf+CuYIBgIZ/toCGf/+CuIIBgYZ/o4ACAgQA/47/jv+O/46fjgGBhrEBhP+KuooC79GFsQHMtY6Gsf+KuYoB4IWxAYuijv+O/47/jv+On44BgYaxAYT/irqKAu/RhbEBzLWOhrH/irmKAeCFsQGLoo7/jv+O/47/jp+OAYGGsQGE/4q6igLv0YWxAcy1joax/4q5igHghbEBi6KO/4D/gP+A/4CggIZ/AYH/grqCAYGHf7WAhn//grmChn+jgAICBAD/jf+N/43/jZ+NAdaFrwLqgf+Ku4oBoIavAfy0jQG0ha8Bhf+KuIoBqoWvAYSijf+N/43/jf+Nn40B1oWvAuqB/4q7igGghq8B/LSNAbSFrwGF/4q4igGqha8BhKKN/43/jf+N/42fjQHWha8C6oH/iruKAaCGrwH8tI0BtIWvAYX/iriKAaqFrwGEoo3/gP+A/4D/gJ+Ah3//gryCAYGHf7SAhn//grmCAYCFf6OAAgIEAP+M/4z/jP+MnowBgIauAav/iryKAoaIha4BybSMAbqFrgH4/4q4igHgha4B+aKM/4z/jP+M/4yejAGAhq4Bq/+KvIoChoiFrgHJtIwBuoWuAfj/iriKAeCFrgH5ooz/jP+M/4z/jJ6MAYCGrgGr/4q8igKGiIWuAcm0jAG6ha4B+P+KuIoB4IWuAfmijP+A/4D/gP+An4CGfwGB/4K9ggGAhn+0gIZ/AYH/griCAYCGf6KAAgIEAP+L/4v/i/+LnosB24WsAvaF/4q9igG+hqwB+bOLAcCFrAHo/4q4igGIhawB66KL/4v/i/+L/4ueiwHbhawC9oX/ir2KAb6GrAH5s4sBwIWsAej/iriKAYiFrAHroov/i/+L/4v/i56LAduFrAL2hf+KvYoBvoasAfmziwHAhawB6P+KuIoBiIWsAeyii/+A/4D/gP+AnoCHf/+CvoIBgYd/s4CGfwGB/4K4ggGBhn+igAICBAD/iv+K/4r/ip6KAbqFqwGk/4q/igGihasBzbOKAceFqwHU/4q4igGbhasB4aKK/4r/iv+K/4qeigG6hasBpP+Kv4oBooWrAc2zigHHhasB1P+KuIoBm4WrAeGiiv+K/4r/iv+KnooBuoWrAaT/ir+KAaKFqwHNs4oBx4WrAdT/iriKAZuFqwHhoor/gP+A/4D/gJ6Ahn8Bgf+Cv4IBgIZ/s4CGfwGB/4K4ggGBhn+igAICBAD/if+J/4n/iZ2JCPWpqqqqqcOC/4q/igi+qqqpqqqq+7KJB9Gqqampqrv/iriKB6yqqaqpqdiiif+J/4n/if+JnYkI9aqpqaqqw4L/ir+KCL6qqqqpqan7sokH0amqqamqu/+KuIoHrKmqqqmp2KKJ/4n/if+J/4mdiQj1qqmqqqnDgv+Kv4oIvqqpqqqqqfuyiQfRqqmpqqm7/4q4igesqqmpqqrYoon/gP+A/4D/gJ2Ah3//gsCCAYGHf7KAhn8Bgf+CuIIBgYZ/ooACAgQA/4j/iP+I/4idiAHShagB7/+KwIoCiIuFqAHWsogB2oWoAaL/iriKAbSFqAHSooj/iP+I/4j/iJ2IAdKFqAHv/4rAigKIi4WoAdayiAHahagBov+KuIoBtIWoAdKiiP+I/4j/iP+InYgB0oWoAe//isCKAoiLhagB1rKIAduFqAGi/4q4igG0hagB0qKI/4D/gP+A/4CdgIZ/AYD/gsGCAYCGf7KAhn8Bgf+CuIIBgYZ/ooACAgQA/4b/hv+G/4adhgGzhacBz/+KwYoBrIWnAbWyhgHmhacBhP+KuIoBwoWnAcuihv+G/4b/hv+GnYYBs4WnAc//isGKAayFpwG1soYB5oWnAYT/iriKAcKFpwHLoob/hv+G/4b/hp2GAbOFpwHP/4rBigGshacBtbKGAeaFpwGE/4q4igHChacBy6KG/4D/gP+A/4CdgIZ/AYH/gsGCAYGGf7KAhn8Bgf+CuIIBgYZ/ooACAgQA/4X/hf+F/4WchQH6haUC6Ij/isGKAoG8haUB77GFAfKFpQHD/4q4igHChaUByaKF/4X/hf+F/4WchQH6haUC6Ij/isGKAoG8haUB77GFAfKFpQHD/4q4igHChaUByaKF/4X/hf+F/4WchQH6haUC6Ij/isGKAoG8haUB77GFAfKFpQHD/4q4igHChaUByaKF/4D/gP+A/4CcgId//4LDgod/sYCGfwGA/4K4ggGBhn+igAICBAD/hP+E/4T/hJyEAeGFpAH4/4rDigHthaQBzLGEAf6FpAGE/4q4igHBhaQBx6KE/4T/hP+E/4SchAHhhaQB+P+Kw4oB7YWkAcyxhAH+haQBhP+KuIoBwYWkAceihP+E/4T/hP+EnIQB4YWkAfj/isOKAe2FpAHMsYQB/oWkAYT/iriKAcGFpAHHooT/gP+A/4D/gJyAhn8BgP+Cw4IBgIZ/sYCGfwGA/4K4ggGBhn+igAICBAC+gwWArreExrgABcalt6+AkIMFiuymydj/3NPcBdXEpuqKj4MFgK63hMa4AAXGpbevgNuDAceFowG8/4rDigHPhaMBrbKDAaiFowGD/4q3igG+haMBx6KDvoMFgK63hMa4AAXGpbevgJCDBYrspsnY/9zT3AXVxKbqio+D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zADW1wGOhYUB+v+Kx4oB/YWFAY2z1wHNhYUB0f+Kr4oB9IWFAc2l17nXzACG1//c59yF18wA1tcBjoWFAfr/iseKAf2FhQGNs9cBzYWFAdH/iq+KAfSFhQHNpde5f8wAhn//geeBhX/MANx/AYH/gseCAYHAf/+Cr4KsfwICBAC51cwAhtX/3OfchdXMANbVAZyFhAHN/4rHigGDhYQBiLTVAZCFhAHs/4qtigH6hYQBjabVudXMAIbV/9zn3IXVzADW1QGchYQBzf+Kx4oBg4WEAYi01QGQhYQB7P+KrYoB+oWEAY2m1bnVzACG1f/c59yF1cwA1tUBnIWEAc3/iseKAYOFhAGItNUBkIWEAez/iq2KAfqFhAGNptW5f8wAhn//geeBhX/MANx/AYH/gsiCwH8Bgf+CrYIBgax/AgIEALnUzACG1P/c59yF1MwA1tQBqoWDAZ7/iseKhoMBh7TUAaOFgwGw/4qtigHDhYMBnabUudTMAIbU/9zn3IXUzADW1AGqhYMBnv+Kx4qGgwGHtNQBo4WDAbD/iq2KAcOFgwGdptS51MwAhtT/3OfchdTMANbUAaqFgwGe/4rHioaDAYe01AGjhYMBsP+KrYoBw4WDAZ2m1Ll/zACGf/+B54GFf8wA3H8Bgf+CyILAfwGB/4KtggGBrH8CAgQAudLMAIbS/9zn3IXSzADW0gG4hYIB3P+Kx4oBh4WCAYS00gG1hYIB6v+KrYoBiIWCAa+m0rnSzACG0v/c59yF0swA1tIBuIWCAdz/iseKAYeFggGEtNIBtYWCAer/iq2KAYiFggGvptK50swAhtL/3OfchdLMANbSAbiFggHc/4rHigGHhYIBhLTSAbWFggHq/4qtigGIhYIBr6bSuX/MAIZ//4HngYV/zADcfwGA/4LIgsB/AYD/gq2CAYGsfwICBAC50MwAhtD/3OfchdDMANbQAciFgQHl/4rIioaBtNABxoWBAeX/iq2KAZeFgQHBptC50MwAhtD/3OfchdDMANbQAciFgQHl/4rIioaBtNABxoWBAeX/iq2KAZeFgQHBptC50MwAhtD/3OfchdDMANbQAciFgQHl/4rIioaBtNABxoWBAeX/iq2KAZeFgQHBptC5f8wAhn//geeBhX/MAN1//4LIgsF//4KtggGArH8CAgQAuc/MAIbP/9zn3IXPzADXzwGI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hcAB0debAobGicACjcPpigOFqtuJwAHuwpu5m8wAhpv/3OfchZvMAOObAcqFwAHt/4qyigGrhcAB0debAobGicACjcPpigOFqtuJwAHuwpu5m8wAhpv/3OfchZvMAOObAcqFwAHt/4qyigGrhcAB0debAobGicACjcPpigOFqtuJwAHuwpu5f8wAhn//geeBhX/MAON/hn4Bgf+CsoIBgYZ+2H+KfgKAgeqCAoF/in7CfwICBAC5m8wAhpv/3OfchZvMAOObAemFwAGj/4qyigGThcAB9NibApPuisADh62E5IoD95azisABgMObuZvMAIab/9zn3IWbzADjmwHphcABo/+KsooBk4XAAfTYmwKT7orAA4ethOSKA/eWs4rAAYDDm7mbzACGm//c59yFm8wA45sB6YXAAaP/irKKAZOFwAH02JsCk+6KwAOHrYTkigP3lrOKwAGAw5u5f8wAhn//geeBhX/MAON/hn4Bgf+CsoIBgIZ+2X+LfgKAgeWCA4GBf4p+xH8CAgQAuZvMAIab/9zn3IWbzADjmwGFhcABsf+KsYoB3obAAY3amwKEworAA5eB4d+KBIW9v9CKwALHhsSbuZvMAIab/9zn3IWbzADjmwGFhcABsf+KsYoB3obAAY3amwKEworAA5eB4d+KBIW9v9CKwALHhsSbuZvMAIab/9zn3IWbzADjmwGFhcABsf+KsYoB3obAAY3amwKEworAA5eB4d+KBIW9v9CKwALHhsSbuX/MAIZ//4HngYV/zADkf4V+AYD/grGCAYGGftx/i34Df4GB4IICgYCMfsV/AgIEALmazACGmv/c59yFmswA45oBkoXAAueD/4qwigHqhcAB4NyaApHsjMAD447i2YoE9rHOh4zAAveTxZq5mswAhpr/3OfchZrMAOOaAZKFwALng/+KsIoB6oXAAeDcmgKR7IzAA+OO4tmKBPaxzoeMwAL3k8WauZrMAIaa/9zn3IWazADjmgGShcAC54P/irCKAeqFwAHg3JoCkeyMwAPjjuLZigT2sc6HjMAC95PFmrl/zACGf/+B54GFf8wA5H+Gfv+CsYIBgIZ+3X+NfgN/gYHZggSBgYB/jX7GfwICBAC5mswAhpr/3OfchZrMAOSaAdmFvwG9/4qvigL874W/AYjemgKL2I6/A+S3/NGKBO64/PKOvwLljseauZrM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xf/c59yFxcwA/8X/xf/F/8XCxbl/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC5x8wAhsf/3OfchcfMAP/H/8f/x//Hwse5x8wAhsf/3OfchcfMAP/H/8f/x//Hwse5x8wAhsf/3OfchcfMAP/H/8f/x//Hwse5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAucjMAIbI/9zn3IXIzAD/yP/I/8j/yMLIucjMAIbI/9zn3IXIzAD/yP/I/8j/yMLIucjMAIbI/9zn3IXIzAD/yP/I/8j/yMLIuX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnKzACGyv/c59yFyswA/8r/yv/K/8rCyrnKzACGyv/c59yFyswA/8r/yv/K/8rCyrnKzACGyv/c59yFyswA/8r/yv/K/8rCyrl/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC5y8wAhsv/3OfchcvMAP/L/8v/y//Lwsu5y8wAhsv/3OfchcvMAP/L/8v/y//Lwsu5y8wAhsv/3OfchcvMAP/L/8v/y//Lwsu5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAuc3MAIbN/9zn3IXNzAD/zf/N/83/zcLNuc3MAIbN/9zn3IXNzAD/zf/N/83/zcLNuc3MAIbN/9zn3IXNzAD/zf/N/83/zcLNuX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnPzACGz//c59yFz8wA/8//z//P/8/Cz7nPzACGz//c59yFz8wA/8//z//P/8/Cz7nPzACGz//c59yFz8wA/8//z//P/8/Cz7l/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC50MwAhtD/3OfchdDMAP/Q/9D/0P/QwtC50MwAhtD/3OfchdDMAP/Q/9D/0P/QwtC50MwAhtD/3OfchdDMAP/Q/9D/0P/QwtC5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAudLMAIbS/9zn3IXSzAD/0v/S/9L/0sLSudLMAIbS/9zn3IXSzAD/0v/S/9L/0sLSudLMAIbS/9zn3IXSzAD/0v/S/9L/0sLSuX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnUzACG1P/c59yF1MwA/9T/1P/U/9TC1LnUzACG1P/c59yF1MwA/9T/1P/U/9TC1LnUzACG1P/c59yF1MwA/9T/1P/U/9TC1Ll/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC51cwAhtX/3OfchdXMAP/V/9X/1f/VwtW51cwAhtX/3OfchdXMAP/V/9X/1f/VwtW51cwAhtX/3OfchdXMAP/V/9X/1f/VwtW5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAudfMAIbX/9zn3IXXzAD/1//X/9f/18LXudfMAIbX/9zn3IXXzAD/1//X/9f/18LXudfMAIbX/9zn3IXXzAD/1//X/9f/18LXuX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnZzACG2f/c59yF2cwA/9n/2f/Z/9nC2bnZzACG2f/c59yF2cwA/9n/2f/Z/9nC2bnZzACG2f/c59yF2cwA/9n/2f/Z/9nC2bl/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC528wAhtv/3OfchdvMAP/b/9v/2//bwtu528wAhtv/3OfchdvMAP/b/9v/2//bwtu528wAhtv/3OfchdvMAP/b/9v/2//bwtu5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAud3MAIbd/9zn3IXdzAD/3f/d/93/3cLdud3MAIbd/9zn3IXdzAD/3f/d/93/3cLdud3MAIbd/9zn3IXdzAD/3f/d/93/3cLduX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnezACG3v/c59yF3swA/97/3v/e/97C3rnezACG3v/c59yF3swA/97/3v/e/97C3rnezACG3v/c59yF3swA/97/3v/e/97C3rl/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC54MwAhuD/3OfcheDMAP/g/+D/4P/gwuC54MwAhuD/3OfcheDMAP/g/+D/4P/gwuC54MwAhuD/3OfcheDMAP/g/+D/4P/gwuC5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAueLMAIbi/9zn3IXizAD/4v/i/+L/4sLiueLMAIbi/9zn3IXizAD/4v/i/+L/4sLiueLMAIbi/9zn3IXizAD/4v/i/+L/4sLiuX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnkzACG5P/c59yF5MwA/+T/5P/k/+TC5LnkzACG5P/c59yF5MwA/+T/5P/k/+TC5LnkzACG5P/c59yF5MwA/+T/5P/k/+TC5Ll/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC55swAhub/3OfchebMAP/m/+b/5v/mwua55swAhub/3OfchebMAP/m/+b/5v/mwua55swAhub/3OfchebMAP/m/+b/5v/mwua5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAuejMAIbo/9zn3IXozAD/6P/o/+j/6MLouejMAIbo/9zn3IXozAD/6P/o/+j/6MLouejMAIbo/9zn3IXozAD/6P/o/+j/6MLouX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnqzACG6v/c59yF6swA/+r/6v/q/+rC6rnqzACG6v/c59yF6swA/+r/6v/q/+rC6rnqzACG6v/c59yF6swA/+r/6v/q/+rC6rl/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC57MwAhuz/3OfchezMAP/s/+z/7P/swuy57MwAhuz/3OfchezMAP/s/+z/7P/swuy57MwAhuz/3OfchezMAP/s/+z/7P/swuy5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAue7MAIbu/9zn3IXuzAD/7v/u/+7/7sLuue7MAIbu/9zn3IXuzAD/7v/u/+7/7sLuue7MAIbu/9zn3IXuzAD/7v/u/+7/7sLuuX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALnwzACG8P/c59yF8MwA//D/8P/w//DC8LnwzACG8P/c59yF8MwA//D/8P/w//DC8LnwzACG8P/c59yF8MwA//D/8P/w//DC8Ll/zACGf/+B54GFf8wA/3//f/9//3/CfwICBAC58swAhvL/3OfchfLMAP/y//L/8v/ywvK58swAhvL/3OfchfLMAP/y//L/8v/ywvK58swAhvL/3OfchfLMAP/y//L/8v/ywvK5f8wAhn//geeBhX/MAP9//3//f/9/wn8CAgQAufTMAIb0/9zn3IX0zAD/9P/0//T/9ML0ufTMAIb0/9zn3IX0zAD/9P/0//T/9ML0ufTMAIb0/9zn3IX0zAD/9P/0//T/9ML0uX/MAIZ//4HngYV/zAD/f/9//3//f8J/AgIEALn2zACG9v/c59yF9swA//b/9v/2//bC9rn2zACG9v/c59yF9swA//b/9v/2//bC9rn2zACG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p8en/6f/p/+n/6f/p5ynAaKJAAG+/5qOmgGGiQABrf+nx6f/gP+A/4D/gP+AnIABf4kAAYH/go6CAYGJAAF//4DHgAICBAD/qP+o/6j/qP+om6gCmL6IAALyl/+ajpoCioiIAALTmP+oxqj/qP+o/6j/qP+om6gCmL6IAALyl/+ajpoCioiIAALTmP+oxqj/qP+o/6j/qP+om6gCmL6IAALyl/+ajpoCioiIAALTmP+oxqj/gP+A/4D/gP+AnIABe4gAAX7/gpCCAX2IAAF7/4DHgAICBAD/qv+q/6r/qv+qm6oBqIkAAaf/mpCaAf+JAAGh/6rGqv+q/6r/qv+q/6qbqgGoiQABp/+akJoB/4kAAaH/qsaq/6r/qv+q/6r/qpuqAaiJAAGn/5qQmgH/iQABof+qxqr/gP+A/4D/gP+Am4ABf4kAAYH/gpCCAYCJAAF//4DGgAICBAD/q/+r/6v/q/+rmqsCmqyIAAKbkf+akJoCh+mIAAKBlf+rxav/q/+r/6v/q/+rmqsCmqyIAAKbkf+akJoCh+mIAAKBlf+rxav/q/+r/6v/q/+rmqsCmqyIAAKbkf+akJoCh+mIAAKBlf+rxav/gP+A/4D/gP+Am4ABe4gAAX7/gpKCAXyIAAF6/4DGgAICBAD/rP+s/6z/rP+smqwBp4kAAYz/mpKaAYOJAAGD/6zFrP+s/6z/rP+s/6yarAGniQABjP+akpoBg4kAAYP/rMWs/6z/rP+s/6z/rJqsAaeJAAGM/5qSmgGDiQABg/+sxaz/gP+A/4D/gP+AmoABf4kAAYH/gpKCAYGJAAF//4DFgAICBAD/rv+u/67/rv+uma4CnJiIAAKujP+akpoCi8KJAAGL/67Erv+u/67/rv+u/66ZrgKcmIgAAq6M/5qSmgKLwokAAYv/rsSu/67/rv+u/67/rpmuApyYiAACroz/mpKaAovCiQABi/+uxK7/gP+A/4D/gP+AmoABe4gAAX3/gpSCAX2JAP+AxYACAgQA/6//r/+v/6//r5mvAaeJAAGK/5qUmgGQiQABu/+vxK//r/+v/6//r/+vma8Bp4kAAYr/mpSaAZCJAAG7/6/Er/+v/6//r/+v/6+ZrwGniQABiv+alJoBkIkAAbv/r8Sv/4D/gP+A/4D/gJmAAX+JAAGB/4KUggGBiQABfv+AxIACAgQA/7D/sP+w/7D/sJiwAp2FiAACwoz/mpSaAo+uiQAB+v+ww7D/sP+w/7D/sP+wmLACnYWIAALCjP+alJoCj66JAAH6/7DDsP+w/7D/sP+w/7CYsAKdhYgAAsKM/5qUmgKProkAAfr/sMOw/4D/gP+A/4D/gJmAAXuIAAF9/4KWggF+iQABf/+Aw4ACAgQA/7H/sf+x/7H/sZixAaSJAAGM/5qWmgGtiQACp6b/scKx/7H/sf+x/7H/sZixAaSJAAGM/5qWmgGtiQACp6b/scKx/7H/sf+x/7H/sZixAaSJAAGM/5qWmgGtiQACp6b/scKx/4D/gP+A/4D/gJiAAX+JAAGB/4KWggGBiQABff+Aw4ACAgQA/7P/s/+z/7P/s5ezAZyJAALVjf+alpoCl66JAAHU/7PCs/+z/7P/s/+z/7OXswGciQAC1Y3/mpaaApeuiQAB1P+zwrP/s/+z/7P/s/+zl7MBnIkAAtWN/5qWmgKXrokAAdT/s8Kz/4D/gP+A/4D/gJiAiQABff+CmIIBf4kAAX//gMKAAgIEAP+0/7T/tP+0/7SXtAGQiQABj/+amJoB0IkAArWk/7TBtP+0/7T/tP+0/7SXtAGQiQABj/+amJoB0IkAArWk/7TBtP+0/7T/tP+0/7SXtAGQiQABj/+amJoB0IkAArWk/7TBtP+A/4D/gP+A/4CXgAF/iQABgf+CmIIBgYkAAXz/gMKAAgIEAP+1/7X/tf+1/7WWtQGXiQAC6Y7/mpmaAY+JAAGu/7XBtf+1/7X/tf+1/7WWtQGXiQAC6Y7/mpmaAY+JAAGu/7XBtf+1/7X/tf+1/7WWtQGXiQAC6Y7/mpmaAY+JAAGu/7XBtf+A/4D/gP+A/4CXgIkAAX3/gpqCAYCJAAF//4DBgAICBAD/t/+3/7f/t/+3lrcB8YkAAZT/mpqaAvSbiQABnf+3wLf/t/+3/7f/t/+3lrcB8YkAAZT/mpqaAvSbiQABnf+3wLf/t/+3/7f/t/+3lrcB8YkAAZT/mpqaAvSbiQABnf+3wLf/gP+A/4D/gP+AloABfokAAYH/gpqCAoF6iQD/gMGAAgIEAP+4/7j/uP+4/7iVuAGQiQACrpH/mpuaAdiJAAH2/7jAuP+4/7j/uP+4/7iVuAGQiQACrpH/mpuaAdiJAAH2/7jAuP+4/7j/uP+4/7iVuAGQiQACrpH/mpuaAdiJAAH2/7jAuP+A/4D/gP+A/4CWgIkAAX7/gpyCAYCJAAF+/4DAgAICBAD/uv+6/7r/uv+6lboByYkAAaf/mpyaAoibiQABhP+6v7r/uv+6/7r/uv+6lboByYkAAaf/mpyaAoibiQABhP+6v7r/uv+6/7r/uv+6lboByYkAAaf/mpyaAoibiQABhP+6v7r/gP+A/4D/gP+AlYABfokAAYH/gp2CAX2JAP+AwIACAgQA/7v/u/+7/7v/u5S7AYiJAAKIlf+anZoBj4kAArCv/7u+u/+7/7v/u/+7/7uUuwGIiQACiJX/mp2aAY+JAAKwr/+7vrv/u/+7/7v/u/+7lLsBiIkAAoiV/5qdmgGPiQACsK//u767/4D/gP+A/4D/gJWAiQABf/+CnoIBgYkAAX3/gL+AAgIEAP+8/7z/vP+8/7yUvAGOiQABvf+anpoCkcyJAAHd/7y+vP+8/7z/vP+8/7yUvAGOiQABvf+anpoCkcyJAAHd/7y+vP+8/7z/vP+8/7yUvAGOiQABvf+anpoCkcyJAAHd/7y+vP+A/4D/gP+A/4CUgAF+iQABgf+Cn4IBfokAAX//gL6AAgIEAP+9/73/vf+9/72TvQHviQACwpj/mp+aAbyJAAKOqf+9vb3/vf+9/73/vf+9k70B74kAAsKY/5qfmgG8iQACjqn/vb29/73/vf+9/73/vZO9Ae+JAALCmP+an5oBvIkAAo+p/729vf+A/4D/gP+A/4CTgAF/iQABf/+CoIIBgYkAAXz/gL6AAgIEAP+//7//v/+//7+SvwKwj4kAAc//mqCaApnpiQABoP+/vb//v/+//7//v/+/kr8CsI+JAAHP/5qgmgKZ6YkAAaD/v72//7//v/+//7//v5K/ArCPiQABz/+aoJoCmemJAAGg/7+9v/+A/4D/gP+A/4CTgAF9iQABgf+CoYIBf4kAAX//gL2AAgIEAP/A/8D/wP/A/8CSwAHHiQABg/+aopoC65uJAAGZ/8C8wP/A/8D/wP/A/8CSwAHHiQABg/+aopoC65uJAAGZ/8C8wP/A/8D/wP/A/8CSwAHHiQABg/+aopoC65uJAAGZ/8C8wP+A/4D/gP+A/4CSgAF/iQABgP+CooICgXqJAP+AvYACAgQA/8H/wf/B/8H/wZHBAquRiQAB6f+ao5oB2okAAbb/wbzB/8H/wf/B/8H/wZHBAquRiQAB6f+ao5oB2okAAbb/wbzB/8H/wf/B/8H/wZHBAquRiQAB6f+ao5oB2okAAbb/wbzB/4D/gP+A/4D/gJKAAXuJAAGB/4KjggGAiQABfv+AvIACAgQA/8P/w//D/8P/w5HDAZ+JAAG//5qkmgKK6YkAAfb/w7vD/8P/w//D/8P/w5HDAZ+JAAG//5qkmgKK6YkAAfb/w7vD/8P/w//D/8P/w5HDAZ+JAAG//5qkmgKK6YkAAfb/w7vD/4D/gP+A/4D/gJGAAX+JAAGA/4KlggF9iQABf/+Au4ACAgQA/8T/xP/E/8T/xJDEAaCJAAKbg/+apZoBoYkAAt2y/8S6xP/E/8T/xP/E/8SQxAGgiQACm4P/mqWaAaGJAALdsv/EusT/xP/E/8T/xP/EkMQBoIkAApuD/5qlmgGhiQAC3bL/xLrE/4D/gP+A/4D/gJGAiQABfP+CpoIBgYkAAXz/gLuAAgIEAP/F/8X/xf/F/8WQxQHliQABg/+appoClrOJAAGq/8W6xf/F/8X/xf/F/8WQxQHliQABg/+appoClrOJAAGq/8W6xf/F/8X/xf/F/8WQxQHliQABg/+appoClrOJAAGq/8W6xf+A/4D/gP+A/4CQgAF+iQABgf+Cp4IBf4kAAX//gLqAAgIEAP/H/8f/x//H/8ePxwGMiQACkY7/mqeaAdqKAAGg/8e5xwTHx8fGlMcBxo7HAcaUxwHGlccBxoXHAcanxwHGkMcBxoTHAcaMxwXGx8fHxoTHAcaJxwHGnccBxqzHAcaPxwHGh8cBxqTHAcaNx4LGjccBxo/HAcaExwHGhscBxofHBMbGx8aPxwHGlscBxrbHAcbIxwHGk8cBxpfHAcaMxwHGl8cBxo7HAsaMiQACkY7/mqeaAdqKAAGghccBxobHBcbHx8fGnMcBxonHAcaSxwHGtMcBxoTHgsaJxwHGpccDxsfH/8f/x//H/8f/x4/HAYyJAAKRjv+ap5oB2ooAAaD/x7nH/4D/gP+A/4D/gJCAiQABfv+CqIIBgYoA/4C6gAICBAD/yP/I/8j/yP/IjsgCuraJAAGl/5qpmgG/iQABvP/Iucj/yP/I/8j/yP/IjsgCuraJAAGl/5qpmgG/iQABvP/Iucj/yP/I/8j/yP/IjsgCuraJAAGl/5qpmgG/iQABvP/Iucj/gP+A/4D/gP+Aj4ABfYkAAYH/gqmCAYCJAAF+/4C5gAICBAD/yf/J/8n/yf/JjskB44kAgpb/mqmaAoabiQAB/v/JuMn/yf/J/8n/yf/JjskB44kAgpb/mqmaAoabiQAB/v/JuMn/yf/J/8n/yf/JjskB44kAgpb/mqmaAoabiQAB/v/JuMn/gP+A/4D/gP+AjoABf4kAAX//gquCAX2JAAF//4C4gAICBAD/yv/K/8r/yv/KjcoCs+WJAAHJ/5qrmgGdiQACpbT/yrfK/8r/yv/K/8r/yo3KArPliQAByf+aq5oBnYkAAqW0/8q3yv/K/8r/yv/K/8qNygKz5YkAAcn/mquaAZ2JAAKltP/Kt8r/gP+A/4D/gP+AjoABe4kAAYH/gquCAYGJAAF8/4C4gAICBAD/zP/M/8z/zP/MjcwBqIkAAYz/mqyaApaliQABlv/Mt8z/zP/M/8z/zP/MjcwBqIkAAYz/mqyaApaliQABlv/Mt8z/zP/M/8z/zP/MjcwBqIkAAYz/mqyaApaliQABlv/Mt8z/gP+A/4D/gP+AjYABf4kAAYD/gq2CAX+JAAF//4C3gAICBAD/zf/N/83/zf/NjM0BpIkAApv2/5qtmgHaigABj//Nts3/zf/N/83/zf/NjM0BpIkAApv2/5qtmgHaigABj//Nts3/zf/N/83/zf/NjM0BpIkAApv2/5qtmgHaigABj//Nts3/gP+A/4D/gP+AjYCJAAJ7gf+CrYIBgYoA/4C3gAICBAD/zv/O/87/zv/OjM4BzIkAAen/mq+aAb+JAAKuv//Otc7/zv/O/87/zv/OjM4BzIkAAen/mq+aAb+JAAKuv//Otc7/zv/O/87/zv/OjM4BzIkAAen/mq+aAb+JAAKuv//Otc7/gP+A/4D/gP+AjIABfokAAYD/gq+CAYCJAAF9/4C2gAICBAD/z//P/8//z//Pi88BhokAAoiM/5qvmgKJ/IkAAcb/z7XP/8//z//P/8//z4vPAYaJAAKIjP+ar5oCifyJAAHG/8+1z//P/8//z//P/8+LzwGGiQACiIz/mq+aAon8iQABxv/Ptc//gP+A/4D/gP+AjICJAAF+/4KxggF9iQABf/+AtYACAgQA/9D/0P/Q/9D/0IrQAr75iQABo/+asZoBsYoAAZT/0LTQ/9D/0P/Q/9D/0IrQAr75iQABo/+asZoBsYoAAZT/0LTQ/9D/0P/Q/9D/0IrQAr75iQABo/+asZoBsYoAAZT/0LTQ/4D/gP+A/4D/gIuAAXyJAAGB/4KxggGBigD/gLWAAgIEAP/S/9L/0v/S/9KK0gG7iQACrpb/mrGaApmDiQCCxf/Ss9L/0v/S/9L/0v/SitIBu4kAAq6W/5qxmgKZg4kAgsX/0rPS/9L/0v/S/9L/0orSAbuJAAKulv+asZoCmYOJAILF/9Kz0v+A/4D/gP+A/4CKgAF/iQABf/+Cs4IBgIkAAX3/gLSAAgIEAP/T/9P/0//T/9OJ0wGrigAB1/+as5oC/JuJAAHF/9Oz0//T/9P/0//T/9OJ0wGrigAB1/+as5oC/JuJAAHF/9Oz0//T/9P/0//T/9OJ0wGrigAB1/+as5oC/JuJAAHF/9Oz0/+A/4D/gP+A/4CKgIoAAYH/grOCAoF8iQABf/+As4ACAgQA/9T/1P/U/9T/1InUAcuJAAG2/5q1mgGPigABlP/UstT/1P/U/9T/1P/UidQBy4kAAbb/mrWaAY+KAAGU/9Sy1P/U/9T/1P/U/9SJ1AHLiQABtv+atZoBj4oAAZT/1LLU/4D/gP+A/4D/gImAAX6JAAGA/4K1ggGBigD/gLOAAgIEAP/V/9X/1f/V/9WI1QGCiQACm4b/mrWaApSliQACtcX/1bHV/9X/1f/V/9X/1YjVAYKJAAKbhv+atZoClKWJAAK1xf/VsdX/1f/V/9X/1f/ViNUBgokAApuG/5q1mgKUpYkAArXF/9Wx1f+A/4D/gP+A/4CJgIkAAX3/greCAX+JAAF9/4CygAICBAD/1v/W/9b/1v/Wh9YCt7yJAAGZ/5q3mgLjm4kAAcD/1rHW/9b/1v/W/9b/1ofWAre8iQABmf+at5oC45uJAAHA/9ax1v/W/9b/1v/W/9aH1gK3vIkAAZn/mreaAuObiQABwP/Wsdb/gP+A/4D/gP+AiIABe4kAAYH/greCAoF6iQABf/+AsYACAgQA/9j/2P/Y/9j/2IfYAeaJAAKglv+auJoBhIoAAZL/2LDY/9j/2P/Y/9j/2IfYAeaJAAKglv+auJoBhIoAAZL/2LDY/9j/2P/Y/9j/2IfYAeaJAAKglv+auJoBhIoAAZL/2LDY/4D/gP+A/4D/gIeAAX6JAAF//4K5ggGBigD/gLGAAgIEAP/Z/9n/2f/Z/9mG2QGtigAB2f+auZoClL2JAAKVxP/Zr9n/2f/Z/9n/2f/ZhtkBrYoAAdn/mrmaApS9iQAClcT/2a/Z/9n/2f/Z/9n/2YbZAa2KAAHZ/5q5mgKUvYkAApXE/9mv2f+A/4D/gP+A/4CGgAF/igABgf+CuoIBf4kAAX3/gLCAAgIEAP/a/9r/2v/a/9qF2gHIigABzP+au5oC9JuJAAGY/9qv2v/a/9r/2v/a/9qF2gHIigABzP+au5oC9JuJAAGY/9qv2v/a/9r/2v/a/9qF2gHIigABzP+au5oC9JuJAAGY/9qv2v+A/4D/gP+A/4CFgAF/igABgP+Cu4ICgXyJAAF//4CvgAICBAD/2//b/9v/2//bhNsB0ooAAtWN/5q8mgGXigAByf/brtv/2//b/9v/2//bhNsB0ooAAtWN/5q8mgGXigAByf/brtv/2//b/9v/2//bhNsB0ooAAtWN/5q8mgGXigAByf/brtv/gP+A/4D/gP+AhIABf4oAAX7/gr2CAYGKAAF//4CugAICBAD/3P/c/9z/3P/cBNzc3JyLAAHQ/5q9mgKX94oAAZj/3K3c/9z/3P/c/9z/3ATc3NyciwAB0P+avZoCl/eKAAGY/9yt3P/c/9z/3P/c/9wE3NzcnIsAAdD/mr2aApf3igABmP/crdz/gP+A/4D/gP+AhICLAAGB/4K+ggF/igD/gK6AAgIEAP/d/93/3f/d/90E3d3G+ooAAYH/mr+aAoGuiQACrcv/3azd/93/3f/d/93/3QTd3cb6igABgf+av5oCga6JAAKty//drN3/3f/d/93/3f/dBN3dxvqKAAGB/5q/mgKBrokAAq3L/92s3f+A/4D/gP+A/4AEgICAfIoAAYH/gsCCAX2JAAF9/4CtgAICBAD/3v/e/97/3v/eA97N7YoAAvyX/5rAmgG3igAB///erN7/3v/e/97/3v/eA97N7YoAAvyX/5rAmgG3igAB///erN7/3v/e/97/3v/eA97N7YoAAvyX/5rAmgG3igAB///erN7/gP+A/4D/gP+AA4CAfYoAAX//gsGCAYGKAAF+/4CsgAICBAAD4ODfh+AM3+Df4ODf4ODg3+DfhuBe3+Df4ODf4ODf4ODf4N/f3+Df4N/f4ODf3+Dg4N/g39/g4N/f4N/f4ODf4ODg3+Df4ODg39/f4ODf4N/g3+Df3+Df4ODf3+Df4N/g4ODf3+Df3+Dg4N/g4ODf3+Dg34XgAd+H4AHfh+AB34TgIN/f3+Df4ODg39/g3+Dg3+Df4ODf3+Dg39/g4ODf4N/fhuAX3+Df4N/g3+Dg39/g4N/f4N/g4ODf39+E4ATf4ODfheAN3+Df3+Df3+Df4ODf34TgGt/g39/g4N/g4N/g3+Df4ODg3+Df4ODf4N/fhOAG39/f4ODfhOAB34ngBd/f4ODfi+AF39/f4N+F4ILfheAY3+Dg4N/g4N/g4ODf4N/f3+Dg39/f4ODfhOCE34Tggt+E4ATf4ODfhOAF39/f4N+I4AHfhOAH3+Dg4N/g34bgiN8l4ODf4N/g3+Dg4N/f4ODg3+Df3+Dg39/g4N/g4N/g4N/g3+Dg34Tght+D4IXfCODg3+Dg4N/fhOAF39/g39+F4Arf4ODf3+Df4ODghN8b4N/f4ODf4ODf3+Dg39/f4N/g4ODf4ODg3+DfhuAE39/g34bgBd/f4ODfhOAN3+Df4ODf39/g3+Df4ITfEeDg3+Dg39/g4N/g4ODf4N/fheAm39/g3+Df3+Df3+Dg4N/g39/g39/f4ODf3+Dg4N/g4ODf3+Dg4N+E4ALPqIoAAsyH/5rCmgHMigAGs9/f4ODfhOAW3+Dg3+Df4N/f4N/f3+Dg4N/g39/g34XgB9/f3+Dg39+F4APf4N+F4Aff3+Df4N/ghN+C4ITfBODf39+E4B7f3+Dg39/f4N/f4N/g4ODf4N/g4ODf39/g4ODf39+E4ILfhOAF3+Dg4N+E4Cjf39/g3+Dg3+Df39/g3+Dg4N/g4N/g3+Dg4N/g4N/g4ODf4N/f4ODfC9/g4N/f4N/f3+Dght8j4N/f4ODg3+Dg3+Df4ODf4N/f4ODf3+Dg39/f4ODg3+Df4OCK3wjg39/f4N/f4ITfA+Df4ITfEODg39/f4N/g39/g39/f4N+E4Ajf39/g3+Dg4IXfJODf3+Df39/g39/g39/g4N/g39/g4N/g39/g39/g4N/f4N/g34TgBd/f3+Dghd+D4ITfN+Dg4N/g39/g3+Df4N/f3+Df4N/f3+Df4N/f3+Df39/g4N/g3+Dg4N/f4N/f4N/g4ODf4N/f3+CE3xDg39/f4ODf3+Df3+Df39/gid8N4N/g39/g3+Df39/g4IffCeDf4ODg39/g4I7fBeDf4N/fhOAI3+Df4ODf4OCI3xbg3+Dg4N/g3+Df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z//PiM//z//P/8//z//P/8//z//PiM//gP+A/4D/gP+A/4D/gP+AiIACAgQA/83/zf/N/83/zf/N/83/zYjN/83/zf/N/83/zf/N/83/zYjN/83/zf/N/83/zf/N/83/zYjN/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP/L/8v/y//L/8v/y//L/8uIy//L/8v/y//L/8v/y//L/8uIy//L/8v/y//L/8v/y//L/8uIy/+A/4D/gP+A/4D/gP+A/4CIgAICBAD/yf/J/8n/yf/J/8n/yf/JiMn/yf/J/8n/yf/J/8n/yf/JiMn/yf/J/8n/yf/J/8n/yf/JiMn/gP+A/4D/gP+A/4D/gP+AiIACAgQA/8f/x//H/8f/x//H/8f/x4jH/8f/x//H/8f/x//H/8f/x4jH/8f/x//H/8f/x//H/8f/x4jH/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP/F/8X/xf/F/8X/xf/F/8WIxf/F/8X/xf/F/8X/xf/F/8WIxf/F/8X/xf/F/8X/xf/F/8WIxf+A/4D/gP+A/4D/gP+A/4CIgAICBAD/w//D/8P/w//D/8P/w//DiMP/w//D/8P/w//D/8P/w//DiMP/w//D/8P/w//D/8P/w//DiMP/gP+A/4D/gP+A/4D/gP+AiIACAgQA/8H/wf/B/8H/wf/B/8H/wYjB/8H/wf/B/8H/wf/B/8H/wYjB/8H/wf/B/8H/wf/B/8H/wYjB/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+//7//v/+//7//v/+//7+Iv/+//7//v/+//7//v/+//7+Iv/+//7//v/+//7//v/+//7+Iv/+A/4D/gP+A/4D/gP+A/4CIgAICBAD/vf+9/73/vf+9/73/vf+9iL3/vf+9/73/vf+9/73/vf+9iL3/vf+9/73/vf+9/73/vf+9iL3/gP+A/4D/gP+A/4D/gP+AiIACAgQA/7v/u/+7/7v/u/+7/7v/u4i7/7v/u/+7/7v/u/+7/7v/u4i7/7v/u/+7/7v/u/+7/7v/u4i7/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+6/7r/uv+6/7r/uv+6/7qIuv+6/7r/uv+6/7r/uv+6/7qIuv+6/7r/uv+6/7r/uv+6/7qIuv+A/4D/gP+A/4D/gP+A/4CIgAICBAD/uP+4/7j/uP+4/7j/uP+4iLj/uP+4/7j/uP+4/7j/uP+4iLj/uP+4/7j/uP+4/7j/uP+4iLj/gP+A/4D/gP+A/4D/gP+AiIACAgQA/7b/tv+2/7b/tv+2/7b/toi2/7b/tv+2/7b/tv+2/7b/toi2/7b/tv+2/7b/tv+2/7b/toi2/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+0/7T/tP+0/7T/tP+0/7SItP+0/7T/tP+0/7T/tP+0/7SItP+0/7T/tP+0/7T/tP+0/7SItP+A/4D/gP+A/4D/gP+A/4CIgAICBAD/s/+z/7P/s/+z/7P/s/+ziLP/s/+z/7P/s/+z/7P/s/+ziLP/s/+z/7P/s/+z/7P/s/+ziLP/gP+A/4D/gP+A/4D/gP+AiIACAgQA/7H/sf+x/7H/sf+x/7H/sYix/7H/sf+x/7H/sf+x/7H/sYix/7H/sf+x/7H/sf+x/7H/sYix/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+v/6//r/+v/6//r/+v/6+Ir/+v/6//r/+v/6//r/+v/6+Ir/+v/6//r/+v/6//r/+v/6+Ir/+A/4D/gP+A/4D/gP+A/4CIgAICBAD/rv+u/67/rv+u/67/rv+uiK7/rv+u/67/rv+u/67/rv+uiK7/rv+u/67/rv+u/67/rv+uiK7/gP+A/4D/gP+A/4D/gP+AiIACAgQA/6z/rP+s/6z/rP+s/6z/rIis/6z/rP+s/6z/rP+s/6z/rIis/6z/rP+s/6z/rP+s/6z/rIis/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+q/6r/qv+q/6r/qv+q/6qIqv+q/6r/qv+q/6r/qv+q/6qIqv+q/6r/qv+q/6r/qv+q/6qIqv+A/4D/gP+A/4D/gP+A/4CIgAICBAD/qf+p/6n/qf+p/6n/qf+piKn/qf+p/6n/qf+p/6n/qf+piKn/qf+p/6n/qf+p/6n/qf+piKn/gP+A/4D/gP+A/4D/gP+AiIACAgQA/6f/p/+n/6f/p/+n/6f/p4in/6f/p/+n/6f/p/+n/6f/p4in/6f/p/+n/6f/p/+n/6f/p4in/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+m/6b/pv+m/6b/pv+m/6aIpv+m/6b/pv+m/6b/pv+m/6aIpv+m/6b/pv+m/6b/pv+m/6aIpv+A/4D/gP+A/4D/gP+A/4CIgAICBAD/pf+l/6X/pf+l/6X/pf+liKX/pf+l/6X/pf+l/6X/pf+liKX/pf+l/6X/pf+l/6X/pf+liKX/gP+A/4D/gP+A/4D/gP+AiIACAgQA/6P/o/+j/6P/o/+j/6P/o4ij/6P/o/+j/6P/o/+j/6P/o4ij/6P/o/+j/6P/o/+j/6P/o4ij/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+i/6L/ov+i/6L/ov+i/6KIov+i/6L/ov+i/6L/ov+i/6KIov+i/6L/ov+i/6L/ov+i/6KIov+A/4D/gP+A/4D/gP+A/4CIgAICBAD/of+h/6H/of+h/6H/of+hiKH/of+h/6H/of+h/6H/of+hiKH/of+h/6H/of+h/6H/of+hiKH/gP+A/4D/gP+A/4D/gP+AiIACAgQA/6D/oP+g/6D/oP+g/6D/oIig/6D/oP+g/6D/oP+g/6D/oIig/6D/oP+g/6D/oP+g/6D/oIig/4D/gP+A/4D/gP+A/4D/gIiAAgIEAAKfnoefBJ6fn56EnwGeiZ8Nnp+fnp+fnp+en56fnoafBJ6fn56EnwGehp8Enp+enoefB56enp+fn56HnwSen5+eiJ+CnoufAZ6OnwGehJ8BnoWfAZ6Hnwien5+fnp+fnpGfAZ6PnwWenp+enoafAZ6MnwGehJ8BnoafAZ6In4KekJ+CnpafAZ6MnwWen5+fnoSfAZ6UnwGeip8BnoSfg56UnwGejJ8BnoafB56en56fn56GnwGehZ8Hnp+fnp+fno+fAZ6KnwGehJ8BnomfAZ6FnwOen56HnwGekZ8BnoefBp6fnp+fnoafg56HnwGeip8BnoyfAZ6GnwWen5+fnoifCZ6fn5+enp+fnomfAZ6NnwGehp8Bnoyfgp6GnwGehJ8BnoafAZ6PnwGehJ8BnoqfAZ6Jnweenp+fnp+eiZ8Enp+fnoSfBJ6fn56GnwGehZ+CnoafAZ6Inwaen56en56Hn4KejZ8Jnp+fnp+fnp6ehJ8BnpGfAZ6EnwGeiZ8Fnp+fn56GnxSen5+fnp+fn56enp+fn56en5+fnoafgp6EnwGehZ+CnoifBZ6fn5+eip8BnpGfAZ6TnwGeip8BnqyfAZ6NnwSen5+ehJ8Mnp+fnp+fn56fn5+ehJ8BnomfAZ6Mn4Wfg56EnwWen5+fnoSfA56fnoefg56Jn4KehZ8Fnp+fn56FnwGelp8Gnp+enp+eh58Gnp+fn56ehJ8BnoWfCp6en56fnp+fn56FnwOen56Gnwmen56fn56fnp6GnwGehZ+CnoSfBp6fn56fnoifAZ6KnwGehZ8Bnomfgp6EnxSenp+fnp+fnp+fnp6fn56fnp+fnoqfE56enp+fnp6en5+fnp6fnp+fn56Gn4KehJ8BnoSfCp6fn5+en56fn56Enweenp+fnp+ehJ8Gnp+fn56ehZ8Gnp+en5+ehJ8Jnp6fn5+enp+ehp8Snp+fn56fnp6fn5+en5+en56fhJ4Ln5+fnp+fnp+en56Fnwyenp6fn5+en56fn5+EngOfn56En4KehZ8Fnp+en56FnwGeip8Nnp6fn56fn5+en56enoSfAZ6Enwqenp+fnp+en5+eiZ8BnoSfCZ6fn56fn56fnoifAZ6HnwGehJ8BnoWfCJ6enp+fnp+ekJ8Knp+fnp+fnp+fn4SeEZ+fn56fnp+enp6fn56fn5+ei58anp6fnp6fn5+en5+enp+fnp+en5+enp+fn56JnwSen56eh58BnoSfBZ6fn5+emZ8fnp+fn56fn56fn56fn56en56fnp+en5+fnp6en5+fnoafDp6fnp6fn5+en56fnp+ehJ8BnoSfBp6fnp+enoWfCZ6enp+en5+fnoWfEZ6fn56fn5+en56fnp6en5+ei5+CnoefCJ6fnp+fnp+ehJ8BnomfAZ6JnwGehp8Knp6fn56enp+fnoefBJ6fn56Fn4Keh58Fnp+fnp6Fnween5+en56fhJ4Cn56JnwGeiZ8Gnp+fnp+ehZ8Fnp6fnp6Gn4KehJ8BnoWfg56Gn4KehZ8BnoefAZ6EnwSen5+ehp8Hnp+fn56enoSfAZ6FnwWenp6fnoSfA56fnoWfCJ6enp+fnp+ejJ8Enp6fn4ifBZ6fn5+ek58BnoSfAZ6PnwGekp8BnpafAZ6MnwWen5+fnoSfAZ6fnwGehZ+CnqGfAZ6GnwGehZ8BnoafAZ6InwGesp8Dnp+emZ8BnoefBp6fnp+fnoafgp6WnwGejZ8BnpefAZ6OnwGehJ8BnoafAZ6Lnwaen5+fnp6HnwGehp8BnoyfBZ6en5+ehZ8Fnp6fn56ZnwGehJ8BnpCfAZ6LnwGeiJ8BnpSfBZ6en5+ejp8Fnp6fn56Onw6en56fnp+en5+fnp+fnp6fAZ6TnwGenJ8BnoqfAZ6qnwOen56On4KejJ8Enp+fnpGfAZ6TnwGehJ8BnpGfBp6fn5+enpOfAZ6OnwGehJ8BnoefAZ6GnwGeip8BnpGfAZ6Vn4KelJ8Bno2fA56fnqaf/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+d/53/nf+d/53/nf+d/52Inf+d/53/nf+d/53/nf+d/52Inf+d/53/nf+d/53/nf+d/52Inf+A/4D/gP+A/4D/gP+A/4CIgAICBAD/nP+c/5z/nP+c/5z/nP+ciJz/nP+c/5z/nP+c/5z/nP+ciJz/nP+c/5z/nP+c/5z/nP+ciJz/gP+A/4D/gP+A/4D/gP+AiIACAgQA/5z/nP+c/5z/nP+c/5z/nIic/5z/nP+c/5z/nP+c/5z/nIic/5z/nP+c/5z/nP+c/5z/nIic/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+b/5v/m/+b/5v/m/+b/5uIm/+b/5v/m/+b/5v/m/+b/5uIm/+b/5v/m/+b/5v/m/+b/5uIm/+A/4D/gP+A/4D/gP+A/4CIgAICBAD/mv+a/5r/mv+a/5r/mv+aiJr/mv+a/5r/mv+a/5r/mv+aiJr/mv+a/5r/mv+a/5r/mv+aiJr/gP+A/4D/gP+A/4D/gP+AiIACAgQA/5n/mf+Z/5n/mf+Z/5n/mYiZ/5n/mf+Z/5n/mf+Z/5n/mYiZ/5n/mf+Z/5n/mf+Z/5n/mYiZ/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+Y/5j/mP+Y/5j/mP+Y/5iImP+Y/5j/mP+Y/5j/mP+Y/5iImP+Y/5j/mP+Y/5j/mP+Y/5iImP+A/4D/gP+A/4D/gP+A/4CIgAICBAD/mP+Y/5j/mP+Y/5j/mP+YiJj/mP+Y/5j/mP+Y/5j/mP+YiJj/mP+Y/5j/mP+Y/5j/mP+YiJj/gP+A/4D/gP+A/4D/gP+AiIACAgQA/5f/l/+X/5f/l/+X/5f/l4iX/5f/l/+X/5f/l/+X/5f/l4iX/5f/l/+X/5f/l/+X/5f/l4iX/4D/gP+A/4D/gP+A/4D/gIiAAgIEAP+X/5f/l/+X/5f/l/+X/5eIl/+X/5f/l/+X/5f/l/+X/5eIl/+X/5f/l/+X/5f/l/+X/5eIl/+A/4D/gP+A/4D/gP+A/4CIgA==",f={enabled:!0,imageUrl:c,useAsBackground:!1,rotateY:0,globalEnvIntensity:1,exposure:1,replaceLights:!1};class l{constructor(e,i,A={}){o(this,"originalBackground"),o(this,"renderer"),o(this,"scene"),o(this,"pmrem"),o(this,"currentEnvRT",null),o(this,"currentBackgroundCube",null),o(this,"sourceImage",null),o(this,"options"),this.renderer=e,this.scene=i,this.originalBackground=this.scene.background,this.pmrem=new t.BdL(e),this.options={...f,...A},this.loadHDRImage(this.options.imageUrl).then(e=>{this.sourceImage=e,this.update()})}dispose(){var e;this.pmrem.dispose(),null==(e=this.sourceImage)||e.dispose(),this.sourceImage=null,this.clearEnvironment()}clearEnvironment(){this.scene.environment=null,this.scene.background=this.originalBackground,this.currentEnvRT&&(this.currentEnvRT.texture.dispose(),this.currentEnvRT.dispose(),this.currentEnvRT=null),this.currentBackgroundCube&&(this.currentBackgroundCube.texture.dispose(),this.currentBackgroundCube.dispose(),this.currentBackgroundCube=null)}update(){if(!this.sourceImage){this.clearEnvironment();return}let e=new t.Z58,i=new t.Gu$(10,60,40),A=new t.V9B({map:this.sourceImage,side:t.hsX}),n=new t.eaF(i,A);n.scale.set(1,1,-1),n.rotation.y=this.options.rotateY??0,e.add(n);let r=this.renderer.toneMapping,s=this.renderer.outputColorSpace;this.renderer.toneMapping=t.y_p,this.renderer.outputColorSpace=t.Zr2;let a=new t.o6l(1024,{type:t.ix0});new t.F1T(.1,1e3,a).update(this.renderer,e),this.renderer.toneMapping=r,this.renderer.outputColorSpace=s;let o=this.pmrem.fromCubemap(a.texture);this.currentEnvRT&&(this.currentEnvRT.texture.dispose(),this.currentEnvRT.dispose(),this.currentEnvRT=null),this.currentBackgroundCube&&(this.currentBackgroundCube.texture.dispose(),this.currentBackgroundCube.dispose(),this.currentBackgroundCube=null),this.currentEnvRT=o,this.scene.environment=o.texture,this.options.useAsBackground?(this.scene.background=a.texture,this.currentBackgroundCube=a):(this.scene.background=this.originalBackground,a.texture.dispose(),a.dispose())}setRenderer(e){this.renderer=e,this.pmrem.dispose(),this.pmrem=new t.BdL(e),this.update()}async setImageUrl(e){var i;this.options.imageUrl=e??c,null==(i=this.sourceImage)||i.dispose(),this.sourceImage=null,this.sourceImage=await this.loadHDRImage(this.options.imageUrl),this.update()}setRotationY(e){this.options.rotateY=e,this.update()}setUseAsBackground(e){this.options.useAsBackground=e,this.update()}async loadHDRImage(e){let i=await new h().loadAsync(e);return i.mapping=t.wfO,i}setGlobalEnvIntensity(e){console.warn("setGlobalEnvIntensity is deprecated and does nothing.")}setExposure(e){console.warn("setExposure is deprecated and does nothing.")}disable(){console.warn("disable is deprecated and does nothing. Environment is enabled by default.")}async enable(){this.update()}}let u={canvas:void 0,antialias:!0,alpha:!0,powerPreference:"high-performance",precision:"highp",stencil:!1,depth:!0,logarithmicDepthBuffer:!0,shadows:!0,shadowQuality:"high"};class p{constructor(e,i,A){o(this,"isDIVERenderer",!0),o(this,"_webglrenderer"),o(this,"_environment"),o(this,"_settings"),this._scene=e,this._camera=i,this._settings={...u,...A??{}},this._webglrenderer=this._createWebGLRenderer(),this._environment=new l(this._webglrenderer,this._scene)}get webglrenderer(){return this._webglrenderer}get environment(){return this._environment}get canvas(){return this._webglrenderer.domElement}render(){this._webglrenderer.render(this._scene,this._camera)}onResize(e,i){this._webglrenderer.setSize(e,i)}dispose(){this._environment.dispose(),this._webglrenderer.dispose()}setCanvas(e){this._webglrenderer.dispose(),this._settings.canvas=e,this._webglrenderer=this._createWebGLRenderer(),this._environment.setRenderer(this._webglrenderer)}_createWebGLRenderer(){var e;let i=null==(e=this._settings.canvas)?void 0:e.getContext("webgl2");null==i||i.pixelStorei(i.UNPACK_FLIP_Y_WEBGL,!1),null==i||i.pixelStorei(i.UNPACK_PREMULTIPLY_ALPHA_WEBGL,!1);let A=new t.JeP(this._settings);return A.shadowMap.enabled=this._settings.shadows,A.shadowMap.type="high"===this._settings.shadowQuality?t.Wk7:"medium"===this._settings.shadowQuality?t.QP0:t.bTm,A.setPixelRatio(window.devicePixelRatio),A.outputColorSpace=t.er$,A.toneMapping=t.kyO,A.toneMappingExposure=1,A}}let d=p;class B{constructor(e,i){o(this,"isDIVEResizeManager",!0),o(this,"_resizeObserver"),o(this,"_width",0),o(this,"_height",0),this._renderer=e,this._camera=i,this._resizeObserver=new ResizeObserver(e=>{let{width:i,height:A}=e[0].contentRect;i===this._width&&A===this._height||(this._camera.onResize(i,A),this._renderer.onResize(i,A),this._width=i,this._height=A,this._renderer.render())}),this._observeCanvas(this._renderer.canvas)}setCanvas(e){this._resizeObserver.disconnect(),this._observeCanvas(e);let{width:i,height:A}=e.getBoundingClientRect();this._camera.onResize(i,A),this._renderer.onResize(i,A),this._width=i,this._height=A,this._renderer.render()}dispose(){this._resizeObserver.disconnect()}_observeCanvas(e){if(e.parentElement)this._resizeObserver.observe(e.parentElement);else{let i=setInterval(()=>{e.parentElement&&(this._resizeObserver.observe(e.parentElement),clearInterval(i))},16)}}}class P{constructor(e,i,A){o(this,"isDIVEView",!0),o(this,"uuid",t.cj9.generateUUID()),o(this,"_paused",!1),o(this,"_renderer"),o(this,"_resizeManager"),this._scene=e,this._camera=i,this._settings=A,this._renderer=new p(this._scene,this._camera,this._settings),this._resizeManager=new B(this._renderer,this._camera)}get renderer(){return this._renderer}get camera(){return this._camera}get canvas(){return this._renderer.canvas}tick(){this._paused||this._renderer.render()}dispose(){this._resizeManager.dispose(),this._renderer.dispose()}onResize(e,i){this._renderer.onResize(e,i),this._camera.onResize(e,i)}setCanvas(e){this._renderer.setCanvas(e),this._resizeManager.setCanvas(e),this.onResize(this._renderer.canvas.clientWidth,this._renderer.canvas.clientHeight)}pause(){this._paused=!0}resume(){this._paused=!1}}class v extends t.B69{constructor(){super(),o(this,"isDIVELight",!0),o(this,"isDIVEAmbientLight",!0),o(this,"isSelectable",!0),o(this,"_light"),this.name="DIVEAmbientLight",this._light=new t.$p8(0xffffff,1),this._light.layers.mask=n.P,this.add(this._light)}setColor(e){this._light.color=e}setIntensity(e){this._light.intensity=e}setEnabled(e){this._light.visible=e}}class z extends t.B69{constructor(){super(),o(this,"isDIVELight",!0),o(this,"isDIVEPointLight",!0),o(this,"isMovable",!0),o(this,"isSelectable",!0),o(this,"gizmo",null),o(this,"light"),o(this,"mesh"),this.name="DIVEPointLight",this.light=new t.HiM(0xffffff,1),this.light.layers.mask=n.P,this.light.castShadow=!0,this.light.shadow.mapSize.width=512,this.light.shadow.mapSize.height=512,this.add(this.light);let e=new t.Gu$(.1,32,32),i=new t.V9B({color:this.light.color,transparent:!0,opacity:.8,side:t.hB5});this.mesh=new t.eaF(e,i),this.mesh.layers.mask=n.U,this.add(this.mesh)}setColor(e){this.light.color=e,this.mesh.material.color=e}setIntensity(e){this.light.intensity=e,this.mesh.material.opacity=e>.8?.8:.8*e}setEnabled(e){this.light.visible=e}onMove(){A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("UPDATE_OBJECT",{id:this.userData.id,position:this.position})})}onSelect(){A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("SELECT_OBJECT",{id:this.userData.id})})}onDeselect(){A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("DESELECT_OBJECT",{id:this.userData.id})})}}class C extends t.B69{constructor(){super(),o(this,"isDIVELight",!0),o(this,"isDIVESceneLight",!0),o(this,"isSelectable",!0),o(this,"_hemiLight"),o(this,"_dirLight"),this.name="DIVESceneLight",this._hemiLight=new t.dth(0xffffff,0xffffff,2),this._hemiLight.layers.mask=n.P,this._hemiLight.position.set(0,50,0),this._hemiLight.visible=!0,this.add(this._hemiLight),this._dirLight=new t.ZyN(0xffffff,3),this._dirLight.layers.mask=n.P,this._dirLight.position.set(1,1.75,1),this._dirLight.position.multiplyScalar(30),this._dirLight.castShadow=!0,this._dirLight.visible=!0,this._dirLight.shadow.mapSize.width=2048,this._dirLight.shadow.mapSize.height=2048,this._dirLight.shadow.camera.left=-5,this._dirLight.shadow.camera.right=5,this._dirLight.shadow.camera.top=5,this._dirLight.shadow.camera.bottom=-5,this._dirLight.shadow.camera.far=3500,this.add(this._dirLight)}setColor(e){this._hemiLight.color=e,this._dirLight.color=e}setIntensity(e){this._hemiLight.intensity=2*e,this._dirLight.intensity=3*e}setEnabled(e){this._hemiLight.visible=e,this._dirLight.visible=e}}let I=e=>e.parent?I(e.parent):e;class w extends t.B69{constructor(){super(),o(this,"isSelectable",!0),o(this,"isMovable",!0),o(this,"isDIVENode",!0),o(this,"gizmo",null),o(this,"_positionWorldBuffer"),o(this,"_boundingBox"),this.layers.mask=n.P,this._positionWorldBuffer=new t.Pq0,this._boundingBox=new t.NRn}setPosition(e){if(!this.parent){this.position.set(e.x,e.y,e.z);return}let i=new t.Pq0(e.x,e.y,e.z);this.position.copy(this.parent.worldToLocal(i)),"isDIVEGroup"in this.parent&&this.parent.updateLineTo(this)}setRotation(e){this.rotation.set(e.x,e.y,e.z)}setScale(e){this.scale.set(e.x,e.y,e.z)}setVisibility(e){this.visible=e}setToWorldOrigin(){this.position.set(0,0,0),A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})})}onMove(){A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("UPDATE_OBJECT",{id:this.userData.id,position:this.getWorldPosition(this._positionWorldBuffer),rotation:this.rotation,scale:this.scale})})}onSelect(){A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("SELECT_OBJECT",{id:this.userData.id})})}onDeselect(){A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("DESELECT_OBJECT",{id:this.userData.id})})}}class G extends w{constructor(e,i=!1,A=65280){super(),o(this,"_box"),o(this,"_sphere"),o(this,"_center"),o(this,"_radius"),o(this,"_boxHelper"),o(this,"_sphereHelper"),o(this,"_size");let n=new t.NRn;i?n.setFromObject(e):(e.updateWorldMatrix(!0,!0),e.traverse(e=>{"isMesh"in e&&e.isMesh&&(e.geometry.computeBoundingBox(),e.geometry.boundingBox&&n.union(e.geometry.boundingBox.clone().applyMatrix4(e.matrixWorld)))})),this.rotation.copy(e.rotation),this._box=n,this._size=n.getSize(new t.Pq0),this._center=n.getCenter(new t.Pq0),this._boxHelper=new t.BND(this._box,A),this._boxHelper.visible=!1,this.add(this._boxHelper),this._sphere=n.getBoundingSphere(new t.iyt),this._radius=this._sphere.radius;let r=new t.Gu$(this._radius,32,32);r.translate(this._center.x,this._center.y,this._center.z),this._sphereHelper=new t.eaF(r,new t.V9B({color:A,wireframe:!0})),this._sphereHelper.visible=!1,this.add(this._sphereHelper)}get box(){return this._box}get sphere(){return this._sphere}get center(){return this._center}get radius(){return this._radius}get size(){return this._size}setBoxHelperVisible(e){this._boxHelper.visible=e}setSphereHelperVisible(e){this._sphereHelper.visible=e}}class y extends w{constructor(){super(),o(this,"isDIVEModel",!0),o(this,"_gltf",null),o(this,"_mesh",null),o(this,"_material",null),o(this,"_assetLoader",null),this.name="DIVEModel",this.userData.isDIVEModel=!0}async _getAssetLoader(){return this._assetLoader||(this._assetLoader=new(await Promise.all([A.e(55399),A.e(25896)]).then(A.bind(A,5896))).AssetLoader),this._assetLoader}async setFromURL(e){let i=await (await this._getAssetLoader()).load(e);return this.setFromGLTF(i),A.e(98022).then(A.bind(A,8022)).then(({State:e})=>{var i;null==(i=e.get(this.userData.id))||i.performAction("MODEL_LOADED",{id:this.userData.id})}),this}setFromGLTF(e){this.clear(),this._boundingBox.makeEmpty();let i=null;return e.traverse(e=>{!i&&e.userData.isDIVEModel&&(i=e),e.castShadow=!0,e.receiveShadow=!0,e.layers.mask=this.layers.mask,this._boundingBox.expandByObject(e),!this._mesh&&"isMesh"in e&&(this._mesh=e,this._material?this._mesh.material=this._material:this._material=e.material)}),i||(i=e),this.position.copy(i.position),this.quaternion.copy(i.quaternion),this.scale.copy(i.scale),this.add(...i.children),this.animations=e.animations,this}setMaterial(e){this._material||(this._material=new t._4j),void 0!==e.vertexColors&&(this._material.vertexColors=e.vertexColors),void 0!==e.color&&this._material.color.set(e.color),void 0!==e.map&&(this._material.map=e.map),void 0!==e.normalMap&&(this._material.normalMap=e.normalMap),void 0!==e.roughness&&(this._material.roughness=e.roughness),void 0!==e.roughnessMap&&(this._material.roughnessMap=e.roughnessMap,this._material.roughnessMap&&(this._material.roughness=1)),void 0!==e.metalness&&(this._material.metalness=e.metalness),void 0!==e.metalnessMap&&(this._material.metalnessMap=e.metalnessMap,this._material.metalnessMap&&(this._material.metalness=1)),this._mesh&&(this._mesh.material=this._material)}placeOnFloor(){this.updateWorldMatrix(!0,!0);let e=this.getWorldPosition(this._positionWorldBuffer),i=e.clone(),n=new t.NRn;this.children.forEach(e=>{e instanceof G||n.expandByObject(e,!0)});let r=-n.min.y;1e-9>Math.abs(r)||(e.y+=r,e.y!==i.y&&(this.setPosition(e),A.e(98022).then(A.bind(A,8022)).then(({State:i})=>{var A;null==(A=i.get(this.userData.id))||A.performAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale})}),this.onMove()))}dropIt(){if(!this.parent){console.warn("DIVEModel: dropIt() called on a model that is not in the scene.",this);return}let e=this.getWorldPosition(this._positionWorldBuffer),i=e.clone(),r=new t.NRn;this.children.forEach(e=>{e instanceof G||r.expandByObject(e,!0)});let s=r.getCenter(new t.Pq0);s.y=r.min.y;let a=new t.tBo(s,new t.Pq0(0,-1,0));a.layers.mask=n.P;let o=a.intersectObjects(I(this).root.children,!0);if(o.length>0){let n=o[0].object,s=new t.NRn().setFromObject(n).max.y-r.min.y;if(1e-9>Math.abs(s)||(e.y+=s,e.y===i.y))return;this.setPosition(e),A.e(98022).then(A.bind(A,8022)).then(({State:i})=>{var A;null==(A=i.get(this.userData.id))||A.performAction("UPDATE_OBJECT",{id:this.userData.id,position:e,rotation:this.rotation,scale:this.scale})}),this.onMove()}else this.placeOnFloor()}}class D extends y{constructor(){super(),o(this,"isDIVEPrimitive",!0),o(this,"_mesh"),o(this,"_material"),this._mesh=new t.eaF,this._mesh.name="PrimitiveMesh",this._mesh.layers.mask=n.P,this._mesh.castShadow=!0,this._mesh.receiveShadow=!0,this.add(this._mesh),this._material=new t._4j,this._mesh.material=this._material}setGeometry(e){let i=this.assembleGeometry(e);i&&(i.computeVertexNormals(),i.computeBoundingBox(),i.computeBoundingSphere(),this._mesh.geometry=i,this._boundingBox.setFromObject(this._mesh))}assembleGeometry(e){switch(this._material.flatShading=!1,e.name.toLowerCase()){case"cylinder":return this.createCylinderGeometry(e);case"sphere":return this.createSphereGeometry(e);case"pyramid":return this._material.flatShading=!0,this.createPyramidGeometry(e);case"cube":case"box":return this.createBoxGeometry(e);case"cone":return this.createConeGeometry(e);case"wall":return this.createWallGeometry(e);case"plane":return this.createPlaneGeometry(e);default:return console.warn("DIVEPrimitive.assembleGeometry: Invalid geometry type:",e.name.toLowerCase()),null}}createCylinderGeometry(e){let i=new t.Ho_(e.width/2,e.width/2,e.height,64);return i.translate(0,e.height/2,0),i}createSphereGeometry(e){return new t.Gu$(e.width/2,256,256)}createPyramidGeometry(e){let i=new Float32Array([-e.width/2,0,-e.depth/2,e.width/2,0,-e.depth/2,e.width/2,0,e.depth/2,-e.width/2,0,e.depth/2,0,e.height,0]),A=new Uint16Array([0,1,2,0,2,3,0,4,1,1,4,2,2,4,3,3,4,0]),n=new t.LoY;return n.setAttribute("position",new t.THS(i,3)),n.setIndex(new t.THS(A,1)),n}createBoxGeometry(e){let i=new t.iNn(e.width,e.height,e.depth);return i.translate(0,e.height/2,0),i}createConeGeometry(e){let i=new t.qFE(e.width/2,e.height,256);return i.translate(0,e.height/2,0),i}createWallGeometry(e){let i=new t.iNn(e.width,e.height,e.depth||.05,16);return i.translate(0,e.height/2,0),i}createPlaneGeometry(e){let i=new t.iNn(e.width,e.height,e.depth);return i.translate(0,e.height/2,0),i}}class b extends w{constructor(){super(),o(this,"isDIVEGroup",!0),o(this,"_members"),o(this,"_lines"),this.name="DIVEGroup",this._members=[],this._lines=[]}get members(){return this._members}setPosition(e){super.setPosition(e),this._members.forEach(e=>{"isDIVENode"in e&&e.onMove()})}setLinesVisibility(e,i){if(!i){this._lines.forEach(i=>{i.visible=e});return}let A=this._members.indexOf(i);-1!==A&&(this._lines[A].visible=e)}attach(e){if(this._members.includes(e))return this;let i=this.createLine();return this.add(i),this._lines.push(i),super.attach(e),this._members.push(e),this._updateLineTo(i,e),this.setLinesVisibility(!0,e),this}remove(e){let i=this._members.indexOf(e);if(-1===i)return this;let A=this._lines[i];return super.remove(A),this._lines.splice(i,1),super.remove(e),this._members.splice(i,1),this}updateLineTo(e){let i=this._members.indexOf(e);-1!==i&&this._updateLineTo(this._lines[i],e)}createLine(){let e=new t.LoY,i=new t.Fvt({color:6710886,dashSize:.05,gapSize:.025}),A=new t.N1A(e,i);return A.visible=!1,A}_updateLineTo(e,i){let A=[new t.Pq0(0,0,0),i.position.clone()];e.geometry.setFromPoints(A),e.computeLineDistances()}}class K extends t.eaF{constructor(){let e=new t.bdM(1,1);e.scale(1e3,1e3,1),e.rotateX(-Math.PI/2),super(e,new t._4j({color:new t.Q1f(0xffffff),side:t.hB5})),o(this,"isDIVEFloor",!0),this.name="Floor",this.layers.mask=n.P,this.receiveShadow=!0}setVisibility(e){this.visible=e}setColor(e){this.material.color=new t.Q1f(e)}}class _ extends t.B69{constructor(){super(),o(this,"isDIVERoot",!0),o(this,"_floor"),this.name="Root",this._floor=new K,this.add(this._floor)}get floor(){return this._floor}computeSceneBB(){let e=new t.NRn;return this.children.forEach(i=>{"isDIVEFloor"in i||i.traverse(i=>{"isObject3D"in i&&e.expandByObject(i)})}),e}getSceneObject(e){let i;return this.traverse(A=>{i||A.userData.id===e.id&&(i=A)}),i}addSceneObject(e){let i=this.getSceneObject(e);if(i)return console.warn(`DIVERoot.addSceneObject: Scene object with id ${e.id} already exists`),i;switch(e.entityType){case"pov":break;case"light":switch(e.type){case"scene":i=new C;break;case"ambient":i=new v;break;case"point":i=new z;break;default:throw Error(`DIVERoot.addSceneObject: Unknown light type: ${e.type}`)}i.name=e.name,i.userData.id=e.id,this.add(i),this._updateLight(i,e);break;case"model":(i=new y).name=e.name,i.userData.id=e.id,i.userData.uri=e.uri,this.add(i),this._updateModel(i,e);break;case"primitive":(i=new D).name=e.name,i.userData.id=e.id,this.add(i),this._updatePrimitive(i,e);break;case"group":(i=new b).name=e.name,i.userData.id=e.id,this.add(i),this._updateGroup(i,e);break;default:throw Error(`DIVERoot.addSceneObject: Unknown entity type: ${e.entityType}`)}return i}updateSceneObject(e){let i=this.getSceneObject(e);if(!i){console.warn(`DIVERoot.updateSceneObject: Scene object with id ${e.id} does not exist`);return}switch(e.entityType){case"pov":break;case"light":this._updateLight(i,e);break;case"model":this._updateModel(i,e);break;case"primitive":this._updatePrimitive(i,e);break;case"group":this._updateGroup(i,e);break;default:throw Error(`DIVERoot.updateSceneObject: Unknown entity type: ${e.entityType}`)}}deleteSceneObject(e){let i=this.getSceneObject(e);if(!i){console.warn(`DIVERoot.deleteSceneObject: Object with id ${e.id} not found`);return}switch(e.entityType){case"pov":break;case"light":this._deleteLight(i);break;case"model":this._deleteModel(i);break;case"primitive":this._deletePrimitive(i);break;case"group":this._deleteGroup(i);break;default:throw Error(`DIVERoot.deleteSceneObject: Unknown entity type: ${e.entityType}`)}}_updateLight(e,i){void 0!==i.name&&null!==i.name&&(e.name=i.name),void 0!==i.position&&null!==i.position&&e.position.set(i.position.x,i.position.y,i.position.z),void 0!==i.intensity&&null!==i.intensity&&e.setIntensity(i.intensity),void 0!==i.enabled&&null!==i.enabled&&e.setEnabled(i.enabled),void 0!==i.color&&null!==i.color&&e.setColor(new t.Q1f(i.color)),void 0!==i.visible&&null!==i.visible&&(e.visible=i.visible),void 0!==i.parentId&&this._setParent({...i,parentId:i.parentId})}_updateModel(e,i){void 0!==i.uri&&e.setFromURL(i.uri),void 0!==i.name&&(e.name=i.name),void 0!==i.position&&e.setPosition(i.position),void 0!==i.rotation&&e.setRotation(i.rotation),void 0!==i.scale&&e.setScale(i.scale),void 0!==i.visible&&e.setVisibility(i.visible),void 0!==i.material&&e.setMaterial(i.material),void 0!==i.parentId&&this._setParent({...i,parentId:i.parentId})}_updatePrimitive(e,i){void 0!==i.name&&(e.name=i.name),void 0!==i.geometry&&e.setGeometry(i.geometry),void 0!==i.position&&e.setPosition(i.position),void 0!==i.rotation&&e.setRotation(i.rotation),void 0!==i.scale&&e.setScale(i.scale),void 0!==i.visible&&e.setVisibility(i.visible),void 0!==i.material&&e.setMaterial(i.material),void 0!==i.parentId&&this._setParent({...i,parentId:i.parentId})}_updateGroup(e,i){void 0!==i.name&&(e.name=i.name),void 0!==i.position&&e.setPosition(i.position),void 0!==i.rotation&&e.setRotation(i.rotation),void 0!==i.scale&&e.setScale(i.scale),void 0!==i.visible&&e.setVisibility(i.visible),void 0!==i.bbVisible&&e.setLinesVisibility(i.bbVisible),void 0!==i.parentId&&this._setParent({...i,parentId:i.parentId})}_deleteLight(e){this._detachTransformControls(e),e.parent.remove(e)}_deleteModel(e){this._detachTransformControls(e),e.parent.remove(e)}_deletePrimitive(e){this._detachTransformControls(e),e.parent.remove(e)}_deleteGroup(e){this._detachTransformControls(e);for(let i=e.members.length-1;i>=0;i--)this.attach(e.members[i]);e.parent.remove(e)}_setParent(e){let i=this.getSceneObject(e);if(null!==e.parentId){let A=this.getSceneObject({id:e.parentId,entityType:e.entityType});if(!A)return;A.attach(i)}else this.attach(i)}_detachTransformControls(e){this._findScene(e).children.find(e=>{"isTransformControls"in e&&e.detach()})}_findScene(e){return null!==e.parent?this._findScene(e.parent):e}}let H="#dddddd",q="#888888";class M extends t.B69{constructor(e){super(),o(this,"_mesh"),o(this,"_material"),o(this,"_gridSize"),this.name="Grid",this._gridSize=(null==e?void 0:e.gridSize)??1;let i=(null==e?void 0:e.majorLineEvery)??10,A=new t.bdM(50,50);A.rotateX(-Math.PI/2),this._material=new r.a({...r.D.grid,uniforms:{uGridSize:{value:this._gridSize},uMajorLineEvery:{value:i},uMinorLineColor:{value:new t.Q1f(H)},uMajorLineColor:{value:new t.Q1f(q)},uFadeDistance:{value:25}},transparent:!0,depthWrite:!1,side:t.$EB}),this._mesh=new t.eaF(A,this._material),this._mesh.layers.mask=n.H,this._mesh.frustumCulled=!1,this._mesh.renderOrder=-1,this._mesh.onBeforeRender=(e,i,A)=>{let t=this._gridSize;this._mesh.position.x=Math.round(A.position.x/t)*t,this._mesh.position.z=Math.round(A.position.z/t)*t,this._mesh.updateMatrixWorld(!0)},this.add(this._mesh)}setVisibility(e){this.visible=e}setGridSize(e){this._gridSize=e,this._material.uniforms.uGridSize.value=e}setMajorLineEvery(e){this._material.uniforms.uMajorLineEvery.value=e}dispose(){this._mesh.geometry.dispose(),this._material.dispose()}}let x={displayFloor:!1,displayGrid:!1,gridSize:1,gridMajorLineEvery:5,backgroundColor:"transparent"};class Y extends t.Z58{constructor(e){super(),o(this,"isDIVEScene",!0),o(this,"_settings"),o(this,"_root"),o(this,"_grid",null),this._settings={...x,...e??{}},this.setBackground(this._settings.backgroundColor),this._root=new _,this._root.floor.setVisibility(this._settings.displayFloor),this.add(this._root),this._settings.displayGrid&&(this._grid=new M({gridSize:this._settings.gridSize,majorLineEvery:this._settings.gridMajorLineEvery}),this._grid.setVisibility(this._settings.displayGrid),this.add(this._grid))}get root(){return this._root}get grid(){return this._grid||(this._grid=new M({gridSize:this._settings.gridSize,majorLineEvery:this._settings.gridMajorLineEvery}),this._grid.setVisibility(this._settings.displayGrid),this.add(this._grid)),this._grid}setBackground(e){"transparent"===e?this.background=null:"string"==typeof e||"number"==typeof e?this.background=new t.Q1f(e):this.background=e}computeSceneBB(){return this._root.computeSceneBB()}dispose(){this.remove(this._root),this._grid&&this.remove(this._grid)}}let O={enableDamping:!0,dampingFactor:.05,enabled:!0,target:new t.Pq0,minDistance:0,maxDistance:1/0,minZoom:0,maxZoom:1/0,minPolarAngle:0,maxPolarAngle:Math.PI,minAzimuthAngle:-1/0,maxAzimuthAngle:1/0,enableZoom:!0,zoomSpeed:1,enableRotate:!0,rotateSpeed:1,enablePan:!0,panSpeed:1,screenSpacePanning:!0,keyPanSpeed:7,autoRotate:!1,autoRotateSpeed:2,keys:{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},mouseButtons:{LEFT:t.kBv.ROTATE,MIDDLE:t.kBv.DOLLY,RIGHT:t.kBv.PAN},touches:{ONE:t.wtR.ROTATE,TWO:t.wtR.DOLLY_PAN}},L=class e extends t.Qev{constructor(e,i,A){super(),o(this,"object"),o(this,"domElements"),o(this,"enabled",!0),o(this,"target",new t.Pq0),o(this,"minDistance",0),o(this,"maxDistance",1/0),o(this,"minZoom",0),o(this,"maxZoom",1/0),o(this,"minPolarAngle",0),o(this,"maxPolarAngle",Math.PI),o(this,"minAzimuthAngle",-1/0),o(this,"maxAzimuthAngle",1/0),o(this,"enableDamping",!0),o(this,"dampingFactor",.05),o(this,"enableZoom",!0),o(this,"zoomSpeed",1),o(this,"enableRotate",!0),o(this,"rotateSpeed",1),o(this,"enablePan",!0),o(this,"panSpeed",1),o(this,"screenSpacePanning",!0),o(this,"keyPanSpeed",7),o(this,"autoRotate",!1),o(this,"autoRotateSpeed",2),o(this,"keys",{LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"}),o(this,"mouseButtons",{LEFT:t.kBv.ROTATE,MIDDLE:t.kBv.DOLLY,RIGHT:t.kBv.PAN}),o(this,"touches",{ONE:t.wtR.ROTATE,TWO:t.wtR.DOLLY_PAN}),o(this,"target0"),o(this,"position0"),o(this,"zoom0"),o(this,"uuid",t.cj9.generateUUID()),o(this,"state",-1),o(this,"EPS",1e-6),o(this,"spherical",new t.YHV),o(this,"sphericalDelta",new t.YHV),o(this,"scale",1),o(this,"panOffset",new t.Pq0),o(this,"zoomChanged",!1),o(this,"rotateStart",new t.I9Y),o(this,"rotateEnd",new t.I9Y),o(this,"rotateDelta",new t.I9Y),o(this,"panStart",new t.I9Y),o(this,"panEnd",new t.I9Y),o(this,"panDelta",new t.I9Y),o(this,"dollyStart",new t.I9Y),o(this,"dollyEnd",new t.I9Y),o(this,"dollyDelta",new t.I9Y),o(this,"pointers",[]),o(this,"pointerPositions",{}),o(this,"offset",new t.Pq0),o(this,"quat"),o(this,"quatInverse"),o(this,"lastPosition",new t.Pq0),o(this,"lastQuaternion",new t.PTz),o(this,"lastTarget",new t.Pq0),o(this,"panLeft",(()=>{let e=new t.Pq0;return(i,A)=>{e.setFromMatrixColumn(A,0),e.multiplyScalar(-i),this.panOffset.add(e)}})()),o(this,"panUp",(()=>{let e=new t.Pq0;return(i,A)=>{!0===this.screenSpacePanning?e.setFromMatrixColumn(A,1):(e.setFromMatrixColumn(A,0),e.crossVectors(this.object.up,e)),e.multiplyScalar(i),this.panOffset.add(e)}})()),o(this,"onMouseDown",e=>{let i;switch(e.button){case 0:i=this.mouseButtons.LEFT;break;case 1:i=this.mouseButtons.MIDDLE;break;case 2:i=this.mouseButtons.RIGHT;break;default:i=-1}switch(i){case t.kBv.DOLLY:if(!1===this.enableZoom)return;this.handleMouseDownDolly(e),this.state=1;break;case t.kBv.ROTATE:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===this.enablePan)return;this.handleMouseDownPan(e),this.state=2}else{if(!1===this.enableRotate)return;this.handleMouseDownRotate(e),this.state=0}break;case t.kBv.PAN:if(e.ctrlKey||e.metaKey||e.shiftKey){if(!1===this.enableRotate)return;this.handleMouseDownRotate(e),this.state=0}else{if(!1===this.enablePan)return;this.handleMouseDownPan(e),this.state=2}break;default:this.state=-1}-1!==this.state&&this.dispatchEvent({type:"start"})}),o(this,"onMouseMove",e=>{if(!1!==this.enabled)switch(this.state){case 0:if(!1===this.enableRotate)return;this.handleMouseMoveRotate(e);break;case 1:if(!1===this.enableZoom)return;this.handleMouseMoveDolly(e);break;case 2:if(!1===this.enablePan)return;this.handleMouseMovePan(e)}}),o(this,"onMouseWheel",e=>{!1===this.enabled||!1===this.enableZoom||-1!==this.state||(e.preventDefault(),this.dispatchEvent({type:"start"}),this.handleMouseWheel(e),this.dispatchEvent({type:"end"}))}),o(this,"onKeyDown",e=>{!1===this.enabled||!1===this.enablePan||this.handleKeyDown(e)}),o(this,"onTouchStart",e=>{switch(this.trackPointer(e),this.pointers.length){case 1:switch(this.touches.ONE){case t.wtR.ROTATE:if(!1===this.enableRotate)return;this.handleTouchStartRotate(e),this.state=3;break;case t.wtR.PAN:if(!1===this.enablePan)return;this.handleTouchStartPan(e),this.state=4;break;default:this.state=-1}break;case 2:switch(this.touches.TWO){case t.wtR.DOLLY_PAN:if(!1===this.enableZoom&&!1===this.enablePan)return;this.handleTouchStartDollyPan(e),this.state=5;break;case t.wtR.DOLLY_ROTATE:if(!1===this.enableZoom&&!1===this.enableRotate)return;this.handleTouchStartDollyRotate(e),this.state=6;break;default:this.state=-1}break;default:this.state=-1}-1!==this.state&&this.dispatchEvent({type:"start"})}),o(this,"onTouchMove",e=>{switch(this.trackPointer(e),this.state){case 3:if(!1===this.enableRotate)return;this.handleTouchMoveRotate(e),this.update();break;case 4:if(!1===this.enablePan)return;this.handleTouchMovePan(e),this.update();break;case 5:if(!1===this.enableZoom&&!1===this.enablePan)return;this.handleTouchMoveDollyPan(e),this.update();break;case 6:if(!1===this.enableZoom&&!1===this.enableRotate)return;this.handleTouchMoveDollyRotate(e),this.update();break;default:this.state=-1}}),o(this,"onPointerDown",e=>{if(!1!==this.enabled){if(0===this.pointers.length){let i=e.currentTarget;i.setPointerCapture(e.pointerId),i.addEventListener("pointermove",this.onPointerMove),i.addEventListener("pointerup",this.onPointerUp)}this.isTrackingPointer(e)||(this.addPointer(e),"touch"===e.pointerType?this.onTouchStart(e):this.onMouseDown(e))}}),o(this,"onPointerMove",e=>{!1!==this.enabled&&("touch"===e.pointerType?this.onTouchMove(e):this.onMouseMove(e))}),o(this,"onPointerUp",e=>{if(this.removePointer(e),0===this.pointers.length){let i=e.currentTarget;i.releasePointerCapture(e.pointerId),i.removeEventListener("pointermove",this.onPointerMove),i.removeEventListener("pointerup",this.onPointerUp),this.dispatchEvent({type:"end"}),this.state=-1}}),o(this,"onPointerCancel",e=>{this.removePointer(e)}),o(this,"onContextMenu",e=>{!1!==this.enabled&&e.preventDefault()}),this.object=e,this.domElements=Array.isArray(i)?i:[i],Object.assign(this,A),this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this.quat=new t.PTz().setFromUnitVectors(e.up,new t.Pq0(0,1,0)),this.quatInverse=this.quat.clone().invert(),this.domElements.forEach(e=>this.addEventListeners(e)),this.update()}get domElement(){return this.domElements[0]}tick(){this.enabled&&this.update()}getPolarAngle(){return this.spherical.phi}getAzimuthalAngle(){return this.spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent({type:"change"}),this.update(),this.state=-1}update(){return this.offset.copy(this.object.position).sub(this.target),this.offset.applyQuaternion(this.quat),this.spherical.setFromVector3(this.offset),this.autoRotate&&-1===this.state&&this.rotateLeft(this.getAutoRotationAngle()),this.enableDamping?(this.spherical.theta+=this.sphericalDelta.theta*this.dampingFactor,this.spherical.phi+=this.sphericalDelta.phi*this.dampingFactor):(this.spherical.theta+=this.sphericalDelta.theta,this.spherical.phi+=this.sphericalDelta.phi),this.spherical.theta=Math.max(this.minAzimuthAngle,Math.min(this.maxAzimuthAngle,this.spherical.theta)),this.spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this.spherical.phi)),this.spherical.makeSafe(),this.spherical.radius*=this.scale,this.spherical.radius=Math.max(this.minDistance,Math.min(this.maxDistance,this.spherical.radius)),!0===this.enableDamping?this.target.addScaledVector(this.panOffset,this.dampingFactor):this.target.add(this.panOffset),this.offset.setFromSpherical(this.spherical),this.offset.applyQuaternion(this.quatInverse),this.object.position.copy(this.target).add(this.offset),this.object.lookAt(this.target),!0===this.enableDamping?(this.sphericalDelta.theta*=1-this.dampingFactor,this.sphericalDelta.phi*=1-this.dampingFactor,this.panOffset.multiplyScalar(1-this.dampingFactor)):(this.sphericalDelta.set(0,0,0),this.panOffset.set(0,0,0)),this.scale=1,!!(this.zoomChanged||this.lastPosition.distanceToSquared(this.object.position)>this.EPS||8*(1-this.lastQuaternion.dot(this.object.quaternion))>this.EPS||this.lastTarget.distanceToSquared(this.target)>this.EPS)&&(this.dispatchEvent({type:"change"}),this.lastPosition.copy(this.object.position),this.lastQuaternion.copy(this.object.quaternion),this.lastTarget.copy(this.target),this.zoomChanged=!1,!0)}dispose(){this.domElements.forEach(e=>this.removeEventListeners(e)),this.dispatchEvent({type:"dispose"})}addDomElements(...e){e.forEach(e=>{this.domElements.includes(e)||(this.domElements.push(e),this.addEventListeners(e))})}removeDomElements(...e){e.forEach(e=>{let i=this.domElements.indexOf(e);i>-1&&(this.removeEventListeners(e),this.domElements.splice(i,1))})}setDomElements(...e){this.removeDomElements(...this.domElements),this.domElements=[],this.addDomElements(...e)}computeEncompassingView(e,i=0){let A=e.center,n=e.sphere.radius,r=this.object.fov*(Math.PI/180),s=this.object.aspect,a=r/2,o=Math.atan(Math.tan(a)*s),g=Math.max(n/Math.sin(a),n/Math.sin(o))*(1+i),h=this.object.position.clone().sub(this.target).normalize(),c=h.length()>.001?h:new t.Pq0(0,0,1);return{position:A.clone().add(c.multiplyScalar(g)),target:A}}focusObject(e,i=0){let A=new G(e),t=this.computeEncompassingView(A,i);this.object.position.copy(t.position),this.target.copy(t.target),this.update()}zoomIn(i){this.dollyIn(Math.pow(.95,i??e.DEFAULT_ZOOM_FACTOR)),this.update()}zoomOut(i){this.dollyOut(Math.pow(.95,i??e.DEFAULT_ZOOM_FACTOR)),this.update()}getState(){return{target:this.target.clone(),azimuthalAngle:this.getAzimuthalAngle(),polarAngle:this.getPolarAngle(),distance:this.getDistance(),position:this.object.position.clone(),quaternion:this.object.quaternion.clone()}}setState(e){this.target.copy(e.target),this.object.position.copy(e.position),this.object.quaternion.copy(e.quaternion),this.update()}addEventListeners(e){e.style.touchAction="none",e.addEventListener("contextmenu",this.onContextMenu),e.addEventListener("pointerdown",this.onPointerDown),e.addEventListener("pointercancel",this.onPointerCancel),e.addEventListener("wheel",this.onMouseWheel,{passive:!1}),e.addEventListener("keydown",this.onKeyDown)}removeEventListeners(e){e.removeEventListener("contextmenu",this.onContextMenu),e.removeEventListener("pointerdown",this.onPointerDown),e.removeEventListener("pointercancel",this.onPointerCancel),e.removeEventListener("wheel",this.onMouseWheel),e.removeEventListener("keydown",this.onKeyDown),e.removeEventListener("pointermove",this.onPointerMove),e.removeEventListener("pointerup",this.onPointerUp)}getAutoRotationAngle(){return 2*Math.PI/60/60*this.autoRotateSpeed}getZoomScale(){return Math.pow(.95,this.zoomSpeed)}rotateLeft(e){this.sphericalDelta.theta-=e}rotateUp(e){this.sphericalDelta.phi-=e}pan(e,i,A){let n=new t.Pq0;if("isPerspectiveCamera"in this.object){let t=this.object.position;n.copy(t).sub(this.target);let r=n.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this.panLeft(2*e*r/A.clientHeight,this.object.matrix),this.panUp(2*i*r/A.clientHeight,this.object.matrix)}else"isOrthographicCamera"in this.object?(this.panLeft(e*(this.object.right-this.object.left)/this.object.zoom/A.clientWidth,this.object.matrix),this.panUp(i*(this.object.top-this.object.bottom)/this.object.zoom/A.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitController encountered an unknown camera type - pan disabled."),this.enablePan=!1)}dollyIn(e){"isPerspectiveCamera"in this.object||"isOrthographicCamera"in this.object?this.scale*=e:(console.warn("WARNING: OrbitController encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}dollyOut(e){"isPerspectiveCamera"in this.object||"isOrthographicCamera"in this.object?this.scale/=e:(console.warn("WARNING: OrbitController encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}handleMouseDownRotate(e){this.rotateStart.set(e.clientX,e.clientY)}handleMouseDownDolly(e){this.dollyStart.set(e.clientX,e.clientY)}handleMouseDownPan(e){this.panStart.set(e.clientX,e.clientY)}handleMouseMoveRotate(e){this.rotateEnd.set(e.clientX,e.clientY),this.rotateDelta.subVectors(this.rotateEnd,this.rotateStart).multiplyScalar(this.rotateSpeed);let i=e.currentTarget;this.rotateLeft(2*Math.PI*this.rotateDelta.x/i.clientHeight),this.rotateUp(2*Math.PI*this.rotateDelta.y/i.clientHeight),this.rotateStart.copy(this.rotateEnd),this.update()}handleMouseMoveDolly(e){this.dollyEnd.set(e.clientX,e.clientY),this.dollyDelta.subVectors(this.dollyEnd,this.dollyStart),this.dollyDelta.y>0?this.dollyIn(this.getZoomScale()):this.dollyDelta.y<0&&this.dollyOut(this.getZoomScale()),this.dollyStart.copy(this.dollyEnd),this.update()}handleMouseMovePan(e){let i=e.currentTarget;this.panEnd.set(e.clientX,e.clientY),this.panDelta.subVectors(this.panEnd,this.panStart).multiplyScalar(this.panSpeed),this.pan(this.panDelta.x,this.panDelta.y,i),this.panStart.copy(this.panEnd),this.update()}handleMouseWheel(e){e.deltaY<0?this.dollyIn(this.getZoomScale()):e.deltaY>0&&this.dollyOut(this.getZoomScale()),this.update()}handleKeyDown(e){let i=!1,A=e.currentTarget;switch(e.code){case this.keys.UP:this.pan(0,this.keyPanSpeed,A),i=!0;break;case this.keys.BOTTOM:this.pan(0,-this.keyPanSpeed,A),i=!0;break;case this.keys.LEFT:this.pan(this.keyPanSpeed,0,A),i=!0;break;case this.keys.RIGHT:this.pan(-this.keyPanSpeed,0,A),i=!0}i&&(e.preventDefault(),this.update())}handleTouchStartRotate(e){if(1===this.pointers.length)this.rotateStart.set(e.pageX,e.pageY);else{let i=this.getSecondPointer(e),A=.5*(e.pageX+i.pageX),t=.5*(e.pageY+i.pageY);this.rotateStart.set(A,t)}}handleTouchStartPan(e){if(1===this.pointers.length)this.panStart.set(e.pageX,e.pageY);else{let i=this.getSecondPointer(e),A=.5*(e.pageX+i.pageX),t=.5*(e.pageY+i.pageY);this.panStart.set(A,t)}}handleTouchStartDolly(e){let i=this.getSecondPointer(e),A=e.pageX-i.pageX,t=e.pageY-i.pageY,n=Math.sqrt(A*A+t*t);this.dollyStart.set(0,n)}handleTouchStartDollyPan(e){this.enableZoom&&this.handleTouchStartDolly(e),this.enablePan&&this.handleTouchStartPan(e)}handleTouchStartDollyRotate(e){this.enableZoom&&this.handleTouchStartDolly(e),this.enableRotate&&this.handleTouchStartRotate(e)}handleTouchMoveRotate(e){if(1===this.pointers.length)this.rotateEnd.set(e.pageX,e.pageY);else{let i=this.getSecondPointer(e),A=.5*(e.pageX+i.pageX),t=.5*(e.pageY+i.pageY);this.rotateEnd.set(A,t)}let i=e.currentTarget;this.rotateDelta.subVectors(this.rotateEnd,this.rotateStart).multiplyScalar(this.rotateSpeed),this.rotateLeft(2*Math.PI*this.rotateDelta.x/i.clientHeight),this.rotateUp(2*Math.PI*this.rotateDelta.y/i.clientHeight),this.rotateStart.copy(this.rotateEnd)}handleTouchMovePan(e){if(1===this.pointers.length)this.panEnd.set(e.pageX,e.pageY);else{let i=this.getSecondPointer(e),A=.5*(e.pageX+i.pageX),t=.5*(e.pageY+i.pageY);this.panEnd.set(A,t)}let i=e.currentTarget;this.panDelta.subVectors(this.panEnd,this.panStart).multiplyScalar(this.panSpeed),this.pan(this.panDelta.x,this.panDelta.y,i),this.panStart.copy(this.panEnd)}handleTouchMoveDolly(e){let i=this.getSecondPointer(e),A=e.pageX-i.pageX,t=e.pageY-i.pageY,n=Math.sqrt(A*A+t*t);this.dollyEnd.set(0,n),this.dollyDelta.set(0,Math.pow(this.dollyEnd.y/this.dollyStart.y,this.zoomSpeed)),this.dollyOut(this.dollyDelta.y),this.dollyStart.copy(this.dollyEnd)}handleTouchMoveDollyPan(e){this.enableZoom&&this.handleTouchMoveDolly(e),this.enablePan&&this.handleTouchMovePan(e)}handleTouchMoveDollyRotate(e){this.enableZoom&&this.handleTouchMoveDolly(e),this.enableRotate&&this.handleTouchMoveRotate(e)}addPointer(e){this.pointers.push(e)}removePointer(e){delete this.pointerPositions[e.pointerId];for(let i=0;i<this.pointers.length;i++)if(this.pointers[i].pointerId==e.pointerId){this.pointers.splice(i,1);return}}trackPointer(e){let i=this.pointerPositions[e.pointerId];void 0===i&&(i=new t.I9Y,this.pointerPositions[e.pointerId]=i),i.set(e.pageX,e.pageY)}getSecondPointer(e){return this.pointers[0].pointerId===e.pointerId?this.pointers[1]:this.pointers[0]}isTrackingPointer(e){return this.pointers.some(i=>i.pointerId===e.pointerId)}};o(L,"DEFAULT_ZOOM_FACTOR",1);let F=L,X=`
                @@@@@@@@@@@@@@@@@@@@@@@              @@@@@@@@@@@@@@@@@@@@@@@
           @@@@+-:::::::---------------------==------------------------------=#@@@@
        @@%=::::.......::---------------------------------------------------------+@@
      @@+:::...........::-----------------------------------------------------------#@@
    @@=:::.........::::::-------------------------------------------------------------%@
   @%:::.......:::::::-----------------------------------------------------------------#@
  @*:::.....:::::-----------------------------------------------------------------------*@
 @%::::::.::::---------------------------------------------------------------------------@@
@@-:::::::::-----------------------------------------------------------------------------=@
@%::::::::--------------------------------------------------------------------------------%@
@+::::::::--------------------------------=@@@@@%-----------------------------------------%@
@=:::::::--------------------------------*@@    @@+---------------------------------------#@
@+:::::::-------------------------------*@        @*--------------------------------------%@
@#::::::::-----------------------------=@@        @@=-------------------------------------%@
@@-::::::::----------------------------@@          @@------------------------------------=@
 @%:::::::::--------------------------*@            @*-----------------------------------@@
  @*:::::::::-------------------------@@            @@----------------------------------%@
   @#::::::::::----------------------%@              @%--------------------------------%@
    @#:::::::::::-------------------=@@              @@=------------------------------%@
     @@-::::::::::::----------------%@                @%----------------------------=@@
      @@#::::::::::::::------------*@                  @*--------------------------#@@
        @@+::::::::::::::::--------@@                  @@------------------------+@@
          @@*:::::::::::::::::----@@                    @@---------------------+@@
            @@@-:::::::::::::::--#@                      @#-----------------=%@@
               @@%-::::::::::::-%@                        @%-------------=%@@
                  @@@@+:::::::#@@                          @@*-------*@@@@
                       @@@@@@@                                @@@@@@
`;window.DIVE={instances:[],get instance(){return window.DIVE.instances[0]}};let j={autoStart:!0,displayAxes:!1,...x,...n.a,...u,...O};class E{constructor(e){o(this,"_instanceId",t.cj9.generateUUID()),o(this,"_settings"),o(this,"_views"),o(this,"_mainView"),o(this,"_scene"),o(this,"_clock"),o(this,"_orientationDisplay",null),this._settings={...j,...e??{}},this._clock=new g,this._scene=new Y({backgroundColor:(null==e?void 0:e.backgroundColor)??j.backgroundColor,displayGrid:(null==e?void 0:e.displayGrid)??j.displayGrid,displayFloor:(null==e?void 0:e.displayFloor)??j.displayFloor});let i=new P(this._scene,new n.D,this._settings);this._clock.addTicker(i),this._views=[i],this._mainView=i,this._settings.displayAxes&&A.e(19449).then(A.bind(A,9449)).then(({OrientationDisplay:e})=>{this._orientationDisplay=new e(this.mainView.renderer,this.scene,this.mainView.camera),this._clock.addTicker(this._orientationDisplay)}),this._settings.autoStart&&this.start(),console.log("DIVE 2.3.4 initialized successfully!"),console.log(X),window.DIVE.instances.push(this)}static async QuickView(e,i){return A.e(9792).then(A.bind(A,7411)).then(({QuickView:A})=>A(e,i))}get engine(){return{scene:this.scene,camera:this.mainView.camera,renderer:this.mainView.renderer,setCanvas:e=>{this.mainView.setCanvas(e)},clock:this.clock,start:()=>{this.start()},stop:()=>{this.stop()},dispose:()=>{this.dispose()}}}get views(){return this._views}get mainView(){return this._mainView}get canvas(){return this.mainView.canvas}get scene(){return this._scene}get clock(){return this._clock}start(){this._clock.start()}stop(){this._clock.stop()}async dispose(){return new Promise(e=>{this._views.forEach(e=>{e.dispose()}),this._views=[],this._orientationDisplay&&(this._clock.removeTicker(this._orientationDisplay),this._orientationDisplay.dispose()),this.scene.dispose(),window.DIVE.instances=window.DIVE.instances.filter(e=>e._instanceId!==this._instanceId),e()})}createView(e){let i=new P(this._scene,e??new n.D,{...this._settings,canvas:void 0});return this._views.push(i),this._clock.addTicker(i),1===this._views.length&&(this._mainView=i),i}disposeView(e){this._views=this._views.filter(i=>i!==e),this._clock.removeTicker(e),this._mainView===e&&(this._mainView=this._views[0]),e.dispose()}}let k=E,Z={glb:{key:"glb",extension:"glb"},gltf:{key:"gltf",extension:"gltf"},usdz:{key:"usdz",extension:"usdz"},step:{key:"step",extension:"step"},stp:{key:"stp",extension:"stp"},iges:{key:"iges",extension:"iges"},igs:{key:"igs",extension:"igs"}},S=Object.values(Z).map(e=>e.extension)}}]);