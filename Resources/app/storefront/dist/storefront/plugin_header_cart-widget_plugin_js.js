"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["plugin_header_cart-widget_plugin_js"],{7642:(t,e,r)=>{r.d(e,{Z:()=>n});var s=r(1374);class o{setItem(t,e){return this._storage[t]=e}getItem(t){return Object.prototype.hasOwnProperty.call(this._storage,t)?this._storage[t]:null}removeItem(t){return delete this._storage[t]}key(t){return Object.values(this._storage)[t]||null}clear(){return this._storage={}}constructor(){this._storage={}}}class i{_chooseStorage(){return i._isSupported(window.localStorage)?this._storage=window.localStorage:i._isSupported(window.sessionStorage)?this._storage=window.sessionStorage:s.Z.isSupported()?this._storage=s.Z:this._storage=new o}static _isSupported(t){try{let e="__storage_test";return t.setItem(e,"1"),t.removeItem(e),!0}catch(t){return!1}}_validateStorage(){if("function"!=typeof this._storage.setItem)throw Error('The storage must have a "setItem" function');if("function"!=typeof this._storage.getItem)throw Error('The storage must have a "getItem" function');if("function"!=typeof this._storage.removeItem)throw Error('The storage must have a "removeItem" function');if("function"!=typeof this._storage.key)throw Error('The storage must have a "key" function');if("function"!=typeof this._storage.clear)throw Error('The storage must have a "clear" function')}getStorage(){return this._storage}constructor(){this._storage=null,this._chooseStorage(),this._validateStorage()}}let n=Object.freeze(new i).getStorage()},4813:(t,e,r)=>{r.r(e),r.d(e,{default:()=>n});var s=r(9568),o=r(3107),i=r(7642);class n extends s.Z{init(){this._client=new o.Z,this.insertStoredContent(),this.fetch()}insertStoredContent(){i.Z.setItem(this.options.emptyCartWidgetStorageKey,this.el.innerHTML);let t=i.Z.getItem(this.options.cartWidgetStorageKey);t&&(this.el.innerHTML=t),this.$emitter.publish("insertStoredContent")}fetch(){this._client.get(window.router["frontend.checkout.info"],(t,e)=>{if(!(e.status>=500)){if(204===e.status){i.Z.removeItem(this.options.cartWidgetStorageKey);let t=i.Z.getItem(this.options.emptyCartWidgetStorageKey);t&&(this.el.innerHTML=t);return}i.Z.setItem(this.options.cartWidgetStorageKey,t),this.el.innerHTML=t,this.$emitter.publish("fetch",{content:t})}})}}n.options={cartWidgetStorageKey:"cart-widget-template",emptyCartWidgetStorageKey:"empty-cart-widget"}},3107:(t,e,r)=>{r.d(e,{Z:()=>s});class s{get(t,e){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:"application/json",s=this._createPreparedRequest("GET",t,r);return this._sendRequest(s,null,e)}post(t,e,r){let s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";s=this._getContentType(e,s);let o=this._createPreparedRequest("POST",t,s);return this._sendRequest(o,e,r)}delete(t,e,r){let s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";s=this._getContentType(e,s);let o=this._createPreparedRequest("DELETE",t,s);return this._sendRequest(o,e,r)}patch(t,e,r){let s=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"application/json";s=this._getContentType(e,s);let o=this._createPreparedRequest("PATCH",t,s);return this._sendRequest(o,e,r)}abort(){if(this._request)return this._request.abort()}_registerOnLoaded(t,e){e&&t.addEventListener("loadend",()=>{e(t.responseText,t)})}_sendRequest(t,e,r){return this._registerOnLoaded(t,r),t.send(e),t}_getContentType(t,e){return t instanceof FormData&&(e=!1),e}_createPreparedRequest(t,e,r){return this._request=new XMLHttpRequest,this._request.open(t,e),this._request.setRequestHeader("X-Requested-With","XMLHttpRequest"),r&&this._request.setRequestHeader("Content-type",r),this._request}constructor(){this._request=null}}}}]);