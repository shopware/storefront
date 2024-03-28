"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["plugin_spatial_spatial-gallery-slider-viewer_plugin_ts"],{5450:(i,e,l)=>{l.r(e),l.d(e,{default:()=>u});var t=l(8077);class s{init(){this.refreshSliderElements(),null!=this.sliderElement&&null!=this.tnsSlider&&this.initEventListeners()}initRender(){var i,e,l;let t=(i=this.tnsSlider)===null||void 0===i?void 0:i.getInfo();(((l=this.plugin.el)===null||void 0===l?void 0:(e=l.closest(s.options.gallerySliderSelector))===null||void 0===e?void 0:e.querySelector(s.options.singleImageGallerySelector))||(null==t?void 0:t.slideItems[t.index])===this.sliderElement)&&this.plugin.startRendering()}initEventListeners(){var i,e;(i=this.tnsSlider)===null||void 0===i||i.events.on("indexChanged",this.indexChangedEvent.bind(this)),(e=this.sliderPlugin)===null||void 0===e||e.$emitter.subscribe("rebuild",this.rebuildEvent.bind(this))}removeDisabled(){var i,e,l;(l=this.plugin.el)===null||void 0===l||(e=l.parentElement)===null||void 0===e||(i=e.parentElement)===null||void 0===i||i.classList.remove(s.options.gallerySliderDisabledClass)}rebuildEvent(i){this.plugin.setReady(!1),this.plugin.el=i.target.querySelector("[".concat(s.options.sliderPositionAttribute,'="').concat(this.plugin.sliderIndex,'"]')),this.init(),this.plugin.initViewer(!1)}indexChangedEvent(i){this.plugin.sliderIndex==i.index?setTimeout(()=>{this.plugin.sliderIndex==this.tnsSlider.getInfo().index&&this.plugin.startRendering()},500):this.plugin.stopRendering()}refreshSliderElements(){var i,e;this.sliderElement=(e=this.plugin)===null||void 0===e?void 0:(i=e.el)===null||void 0===i?void 0:i.closest(s.options.sliderSelector),this.sliderPlugin=this.getSliderPlugin(),null!=this.sliderPlugin&&(this.tnsSlider=this.sliderPlugin._slider)}getSliderPlugin(){var i,e;let l=(e=this.plugin)===null||void 0===e?void 0:(i=e.el)===null||void 0===i?void 0:i.closest(s.options.gallerySliderSelector);if(null==l||void 0==l)return null;let t=window.PluginManager.getPluginInstanceFromElement(l,"GallerySlider");return null==t?null:t}constructor(i){this.sliderElement=null,this.tnsSlider=null,this.sliderPlugin=null,this.plugin=i,this.init()}}s.options={sliderSelector:".tns-item",gallerySliderSelector:".gallery-slider-row",sliderPositionAttribute:"data-product-slider-position",singleImageGallerySelector:".gallery-slider-single-image",gallerySliderDisabledClass:"gallery-slider-canvas-disabled"};var n=l(5469),r=l(4161),d=l(7073),a=l(9183),o=l(9943),h=l(6896);class u extends t.Z{async init(){await (0,h.n)(),this.el&&(this.sliderIndex=Number(this.el.dataset.productSliderPosition),this.spatialProductSliderRenderUtil=new s(this),this.spatialProductSliderRenderUtil.removeDisabled(),this.initViewer(!0))}initViewer(i){var e,l,t,s,h,u,p;if(super.initViewer(i),(e=this.renderer)===null||void 0===e||e.setClearColor(16777215,0),(l=this.camera)===null||void 0===l||l.position.set(0,.6,1.2),(t=this.camera)===null||void 0===t||t.lookAt(0,0,0),(s=this.spatialOrbitControlsUtil)===null||void 0===s||s.dispose(),this.camera&&this.renderer&&(this.spatialOrbitControlsUtil=new d.Z(this.camera,this.renderer.domElement)),this.spatialMovementNoteUtil=new a.Z(this),this.spatialCanvasSizeUpdateUtil=new n.Z(this),(void 0==this.spatialLightCompositionUtil||i)&&((u=this.spatialLightCompositionUtil)===null||void 0===u||u.dispose(),this.scene&&(this.spatialLightCompositionUtil=new o.Z(this.scene))),(void 0==this.spatialObjectLoaderUtil||i)&&(this.spatialObjectLoaderUtil=new r.Z(this)),void 0==this.model||i){let i=(p=this.el)===null||void 0===p?void 0:p.dataset.spatialModelUrl;if(null==i)return;this.spatialObjectLoaderUtil.loadSingleObjectByUrl(i,{center:!0,clampSize:!0,clampMaxSize:{x:4/3,y:1,z:4/3}}).then(i=>{this.model=i,this.scene&&this.scene.add(this.model),this.setReady(!0)}).catch(()=>{var i,e,l;(l=this.el)===null||void 0===l||(e=l.parentElement)===null||void 0===e||(i=e.parentElement)===null||void 0===i||i.classList.add("gallery-slider-canvas-disabled")})}else this.setReady(!0);(h=this.spatialProductSliderRenderUtil)===null||void 0===h||h.initRender()}preRender(i){var e,l;(e=this.spatialCanvasSizeUpdateUtil)===null||void 0===e||e.update(),(l=this.spatialOrbitControlsUtil)===null||void 0===l||l.update()}postRender(i){}}}}]);