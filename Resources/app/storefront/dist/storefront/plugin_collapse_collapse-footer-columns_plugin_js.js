"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["plugin_collapse_collapse-footer-columns_plugin_js"],{9267:(e,s,o)=>{o.r(s),o.d(s,{default:()=>r});var t=o(9568),l=o(4049),i=o(447),n=o(3266);class r extends t.Z{init(){this._columns=this.el.querySelectorAll(this.options.collapseColumnSelector),this._registerEvents()}_registerEvents(){this._onViewportHasChanged(),document.addEventListener("Viewport/hasChanged",this._onViewportHasChanged.bind(this))}_onViewportHasChanged(){let e="click";n.Z.iterate(this._columns,s=>{let o=l.Z.querySelector(s,this.options.collapseColumnTriggerSelector);o.removeEventListener(e,this._onClickCollapseTrigger),this._isInAllowedViewports()&&o.addEventListener(e,this._onClickCollapseTrigger.bind(this))}),this.$emitter.publish("onViewportHasChanged")}_onClickCollapseTrigger(e){let s=e.target,o=s.parentNode.querySelector(this.options.collapseColumnContentSelector),t=this.options.collapseShowClass;new bootstrap.Collapse(o,{toggle:!0}),o.addEventListener("shown.bs.collapse",()=>{s.classList.add(t),this.$emitter.publish("onCollapseShown")}),o.addEventListener("hidden.bs.collapse",()=>{s.classList.remove(t),this.$emitter.publish("onCollapseHidden")}),this.$emitter.publish("onClickCollapseTrigger")}_isInAllowedViewports(){return i.Z.isXS()||i.Z.isSM()}}r.options={collapseShowClass:"show",collapseColumnSelector:".js-footer-column",collapseColumnTriggerSelector:".js-collapse-footer-column-trigger",collapseColumnContentSelector:".js-footer-column-content"}}}]);