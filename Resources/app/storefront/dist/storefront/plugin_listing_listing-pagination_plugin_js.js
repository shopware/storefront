"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["plugin_listing_listing-pagination_plugin_js"],{9304:(t,e,i)=>{i.d(e,{Z:()=>r});var n=i(9568),s=i(4049);class r extends n.Z{_init(){super._init(),this._validateMethods();let t=s.Z.querySelector(document,this.options.parentFilterPanelSelector);this.listing=window.PluginManager.getPluginInstanceFromElement(t,"Listing"),this.listing.registerFilter(this),this._preventDropdownClose()}_preventDropdownClose(){let t=s.Z.querySelector(this.el,this.options.dropdownSelector,!1);t&&t.addEventListener("click",t=>{t.stopPropagation()})}_validateMethods(){if("function"!=typeof this.getValues)throw Error("[".concat(this._pluginName,'] Needs the method "getValues"\''));if("function"!=typeof this.getLabels)throw Error("[".concat(this._pluginName,'] Needs the method "getLabels"\''));if("function"!=typeof this.reset)throw Error("[".concat(this._pluginName,'] Needs the method "reset"\''));if("function"!=typeof this.resetAll)throw Error("[".concat(this._pluginName,'] Needs the method "resetAll"\''))}}r.options={parentFilterPanelSelector:".cms-element-product-listing-wrapper",dropdownSelector:".filter-panel-item-dropdown"}},9775:(t,e,i)=>{i.r(e),i.d(e,{default:()=>l});var n=i(4049),s=i(9304),r=i(1857),o=i.n(r);class l extends s.Z{init(){this._initButtons(),this.tempValue=null}_initButtons(){this.buttons=n.Z.querySelectorAll(this.el,".pagination input[type=radio]",!1),this.buttons&&this._registerButtonEvents()}_registerButtonEvents(){this.buttons.forEach(t=>{t.addEventListener("change",this.onChangePage.bind(this))})}onChangePage(t){this.tempValue=t.target.value,this.listing.changeListing(),this.tempValue=null}reset(){}resetAll(){}getValues(){return null!==this.tempValue?{p:this.tempValue}:{p:1}}afterContentChange(){this._initButtons()}getLabels(){return[]}setValuesFromUrl(t){let e=!1;return this.tempValue=1,t.p&&parseInt(t.p)!==parseInt(this.tempValue)&&(this.tempValue=parseInt(t.p),e=!0),e}}l.options=o()(s.Z.options,{page:1})}}]);