"use strict";(self.webpackChunk=self.webpackChunk||[]).push([["plugin_google-analytics_google-analytics_plugin_js","plugin_cookie_cookie-configuration_plugin_js"],{7642:(e,t,i)=>{i.d(t,{Z:()=>s});var r=i(1374);class n{setItem(e,t){return this._storage[e]=t}getItem(e){return Object.prototype.hasOwnProperty.call(this._storage,e)?this._storage[e]:null}removeItem(e){return delete this._storage[e]}key(e){return Object.values(this._storage)[e]||null}clear(){return this._storage={}}constructor(){this._storage={}}}class o{_chooseStorage(){return o._isSupported(window.localStorage)?this._storage=window.localStorage:o._isSupported(window.sessionStorage)?this._storage=window.sessionStorage:r.Z.isSupported()?this._storage=r.Z:this._storage=new n}static _isSupported(e){try{let t="__storage_test";return e.setItem(t,"1"),e.removeItem(t),!0}catch(e){return!1}}_validateStorage(){if("function"!=typeof this._storage.setItem)throw Error('The storage must have a "setItem" function');if("function"!=typeof this._storage.getItem)throw Error('The storage must have a "getItem" function');if("function"!=typeof this._storage.removeItem)throw Error('The storage must have a "removeItem" function');if("function"!=typeof this._storage.key)throw Error('The storage must have a "key" function');if("function"!=typeof this._storage.clear)throw Error('The storage must have a "clear" function')}getStorage(){return this._storage}constructor(){this._storage=null,this._chooseStorage(),this._validateStorage()}}let s=Object.freeze(new o).getStorage()},9197:(e,t,i)=>{i.r(t),i.d(t,{COOKIE_CONFIGURATION_CLOSE_OFF_CANVAS:()=>u,COOKIE_CONFIGURATION_UPDATE:()=>l,default:()=>h});var r=i(9568),n=i(1374),o=i(7),s=i(9062),a=i(3107),c=i(3327);let l="CookieConfiguration_Update",u="CookieConfiguration_CloseOffCanvas";class h extends r.Z{init(){this.lastState={active:[],inactive:[]},this._httpClient=new a.Z,this._registerEvents()}_registerEvents(){let{submitEvent:e,buttonOpenSelector:t,customLinkSelector:i,globalButtonAcceptAllSelector:r}=this.options;Array.from(document.querySelectorAll(t)).forEach(t=>{t.addEventListener(e,this.openOffCanvas.bind(this))}),Array.from(document.querySelectorAll(i)).forEach(t=>{t.addEventListener(e,this._handleCustomLink.bind(this))}),Array.from(document.querySelectorAll(r)).forEach(t=>{t.addEventListener(e,this._acceptAllCookiesFromCookieBar.bind(this))})}_registerOffCanvasEvents(){let{submitEvent:e,buttonSubmitSelector:t,buttonAcceptAllSelector:i,wrapperToggleSelector:r}=this.options,o=this._getOffCanvas();if(o){let s=o.querySelector(t),a=o.querySelector(i),c=Array.from(o.querySelectorAll('input[type="checkbox"]')),l=Array.from(o.querySelectorAll(r));s&&s.addEventListener(e,this._handleSubmit.bind(this,n.Z)),a&&a.addEventListener(e,this._acceptAllCookiesFromOffCanvas.bind(this,n.Z)),c.forEach(t=>{t.addEventListener(e,this._handleCheckbox.bind(this))}),l.forEach(t=>{t.addEventListener(e,this._handleWrapperTrigger.bind(this))})}}_handleCustomLink(e){e.preventDefault(),this.openOffCanvas()}_handleUpdateListener(e,t){let i=this._getUpdatedCookies(e,t);document.$emitter.publish(l,i)}_getUpdatedCookies(e,t){let{lastState:i}=this,r={};return e.forEach(e=>{i.inactive.includes(e)&&(r[e]=!0)}),t.forEach(e=>{i.active.includes(e)&&(r[e]=!1)}),r}openOffCanvas(e){let{offCanvasPosition:t}=this.options,i=window.router["frontend.cookie.offcanvas"];this._hideCookieBar(),o.Z.open(i,!1,this._onOffCanvasOpened.bind(this,e),t)}closeOffCanvas(e){o.Z.close(),"function"==typeof e&&e()}_onOffCanvasOpened(e){this._registerOffCanvasEvents(),this._setInitialState(),this._setInitialOffcanvasState(),PluginManager.initializePlugins(),"function"==typeof e&&e()}_hideCookieBar(){let e=PluginManager.getPluginInstances("CookiePermission");e&&e[0]&&(e[0]._hideCookieBar(),e[0]._removeBodyPadding())}_setInitialState(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=e||this._getCookies("all"),i=[],r=[];t.forEach(e=>{let{cookie:t,required:o}=e;n.Z.getItem(t)||o?i.push(t):r.push(t)}),this.lastState={active:i,inactive:r}}_setInitialOffcanvasState(){let e=this.lastState.active,t=this._getOffCanvas();e.forEach(e=>{let i=t.querySelector('[data-cookie="'.concat(e,'"]'));i.checked=!0,this._childCheckboxEvent(i)})}_handleWrapperTrigger(e){e.preventDefault();let{entriesActiveClass:t,entriesClass:i,groupClass:r}=this.options,{target:n}=e,o=this._findParentEl(n,i,r);o&&(o.classList.contains(t)?o.classList.remove(t):o.classList.add(t))}_handleCheckbox(e){let{parentInputClass:t}=this.options,{target:i}=e;(i.classList.contains(t)?this._parentCheckboxEvent:this._childCheckboxEvent).call(this,i)}_findParentEl(e,t){let i=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null;for(;e&&!e.classList.contains(i);){if(e.classList.contains(t))return e;e=e.parentElement}return null}_isChecked(e){return!!e.checked}_parentCheckboxEvent(e){let{groupClass:t}=this.options,i=this._isChecked(e),r=this._findParentEl(e,t);this._toggleWholeGroup(i,r)}_childCheckboxEvent(e){let{groupClass:t}=this.options,i=this._isChecked(e),r=this._findParentEl(e,t);this._toggleParentCheckbox(i,r)}_toggleWholeGroup(e,t){Array.from(t.querySelectorAll("input")).forEach(t=>{t.checked=e})}_toggleParentCheckbox(e,t){let{parentInputSelector:i}=this.options,r=Array.from(t.querySelectorAll("input:not(".concat(i,")"))),n=Array.from(t.querySelectorAll("input:not(".concat(i,"):checked")));if(r.length>0){let e=t.querySelector(i);if(e){let t=n.length>0,i=t&&n.length!==r.length;e.checked=t,e.indeterminate=i}}}_handleSubmit(){let e=this._getCookies("active"),t=this._getCookies("inactive"),{cookiePreference:i}=this.options,r=[],o=[];t.forEach(e=>{let{cookie:t}=e;o.push(t),n.Z.getItem(t)&&n.Z.removeItem(t)}),e.forEach(e=>{let{cookie:t,value:i,expiration:o}=e;r.push(t),t&&i&&n.Z.setItem(t,i,o)}),n.Z.setItem(i,"1","30"),this._handleUpdateListener(r,o),this.closeOffCanvas(document.$emitter.publish(u))}acceptAllCookies(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0];if(!e){this._handleAcceptAll(),this.closeOffCanvas();return}c.Z.create(this.el);let t=window.router["frontend.cookie.offcanvas"];this._httpClient.get(t,e=>{let t=new DOMParser().parseFromString(e,"text/html");this._handleAcceptAll(t),c.Z.remove(this.el),this._hideCookieBar()})}_acceptAllCookiesFromCookieBar(){return this.acceptAllCookies(!0)}_acceptAllCookiesFromOffCanvas(){return this.acceptAllCookies()}_handleAcceptAll(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:null,t=this._getCookies("all",e);this._setInitialState(t);let{cookiePreference:i}=this.options;t.forEach(e=>{let{cookie:t,value:i,expiration:r}=e;t&&i&&n.Z.setItem(t,i,r)}),n.Z.setItem(i,"1","30"),this._handleUpdateListener(t.map(e=>{let{cookie:t}=e;return t}),[])}_getCookies(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:"all",t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null,{cookieSelector:i}=this.options;return t||(t=this._getOffCanvas()),Array.from(t.querySelectorAll(i)).filter(t=>{switch(e){case"all":return!0;case"active":return this._isChecked(t);case"inactive":return!this._isChecked(t);default:return!1}}).map(e=>{let{cookie:t,cookieValue:i,cookieExpiration:r,cookieRequired:n}=e.dataset;return{cookie:t,value:i,expiration:r,required:n}})}_getOffCanvas(){let e=s.Z?s.Z.getOffCanvas():[];return!!e&&e.length>0&&e[0]}}h.options={offCanvasPosition:"left",submitEvent:"click",cookiePreference:"cookie-preference",cookieSelector:"[data-cookie]",buttonOpenSelector:".js-cookie-configuration-button button",buttonSubmitSelector:".js-offcanvas-cookie-submit",buttonAcceptAllSelector:".js-offcanvas-cookie-accept-all",globalButtonAcceptAllSelector:".js-cookie-accept-all-button",wrapperToggleSelector:".offcanvas-cookie-entries span",parentInputSelector:".offcanvas-cookie-parent-input",customLinkSelector:'[href="'.concat(window.router["frontend.cookie.offcanvas"],'"]'),entriesActiveClass:"offcanvas-cookie-entries--active",entriesClass:"offcanvas-cookie-entries",groupClass:"offcanvas-cookie-group",parentInputClass:"offcanvas-cookie-parent-input"}},5997:(e,t,i)=>{i.r(t),i.d(t,{default:()=>S});var r=i(9568),n=i(9197);class o{supports(e,t){return console.warn("[Google Analytics Plugin] Method 'supports' was not overridden by `"+this.constructor.name+"`. Default return set to false."),!1}execute(){console.warn("[Google Analytics Plugin] Method 'execute' was not overridden by `"+this.constructor.name+"`.")}disable(){this.active=!1}constructor(){this.active=!0}}class s extends o{execute(){let e=this.getEvents();window.PluginManager.getPluginInstances(this.getPluginName()).forEach(t=>{Object.keys(e).forEach(i=>{t.$emitter.subscribe(i,e[i])})})}getEvents(){console.warn("[Google Analytics Plugin] Method 'getEvents' was not overridden by `"+this.constructor.name+"`.")}getPluginName(){console.warn("[Google Analytics Plugin] Method 'getPluginName' was not overridden by `"+this.constructor.name+"`.")}}class a extends s{supports(){return!0}getPluginName(){return"AddToCart"}getEvents(){return{beforeFormSubmit:this._beforeFormSubmit.bind(this)}}_beforeFormSubmit(e){if(!this.active)return;let t=e.detail,i=null;if(t.forEach((e,t)=>{t.endsWith("[id]")&&(i=e)}),!i){console.warn("[Google Analytics Plugin] Product ID could not be fetched. Skipping.");return}gtag("event","add_to_cart",{items:[{id:i,name:t.get("product-name"),quantity:t.get("lineItems["+i+"][quantity]")}]})}}var c=i(4049);class l extends o{supports(e,t){return"checkout"===e&&"cartpage"===t}execute(){let e=c.Z.querySelector(document,".cart-add-product",!1);e&&e.addEventListener("submit",this._formSubmit.bind(this))}_formSubmit(e){if(!this.active)return;let t=c.Z.querySelector(e.currentTarget,".form-control");gtag("event","add_to_cart",{items:[{id:t.value,quantity:1}]})}}class u{static getLineItems(){let e=c.Z.querySelector(document,".hidden-line-items-information"),t=c.Z.querySelectorAll(e,".hidden-line-item"),i=[];return t.forEach(t=>{i.push({id:c.Z.getDataAttribute(t,"id"),name:c.Z.getDataAttribute(t,"name"),quantity:c.Z.getDataAttribute(t,"quantity"),price:c.Z.getDataAttribute(t,"price"),currency:c.Z.getDataAttribute(e,"currency")})}),i}static getAdditionalProperties(){let e=c.Z.querySelector(document,".hidden-line-items-information");return{currency:c.Z.getDataAttribute(e,"currency"),shipping:c.Z.getDataAttribute(e,"shipping"),value:c.Z.getDataAttribute(e,"value"),tax:c.Z.getDataAttribute(e,"tax")}}}class h extends s{supports(){return!0}getEvents(){return{offCanvasOpened:this._offCanvasOpened.bind(this)}}getPluginName(){return"OffCanvasCart"}_offCanvasOpened(){c.Z.querySelector(document,".begin-checkout-btn").addEventListener("click",this._onBeginCheckout.bind(this))}_onBeginCheckout(){this.active&&gtag("event","begin_checkout",{items:u.getLineItems()})}}class d extends o{supports(e,t){return"checkout"===e&&"cartpage"===t}execute(){let e=c.Z.querySelector(document,".begin-checkout-btn",!1);e&&e.addEventListener("click",this._onBeginCheckout.bind(this))}_onBeginCheckout(){this.active&&gtag("event","begin_checkout",{items:u.getLineItems()})}}class g extends o{supports(e,t){return"checkout"===e&&"confirmpage"===t}execute(){this.active&&gtag("event","checkout_progress",{items:u.getLineItems()})}}class m extends s{supports(e,t){return"auth"===e&&"loginpage"===t||"register"===e&&"checkoutregisterpage"===t}getPluginName(){return"FormValidation"}getEvents(){return{beforeSubmit:this._onFormSubmit.bind(this)}}_onFormSubmit(e){this.active&&e.target.classList.contains("login-form")&&e.detail.validity&&gtag("event","login",{method:"mail"})}}class p extends o{supports(e,t){return"checkout"===e&&"finishpage"===t&&window.trackOrders}execute(){if(!this.active)return;let e=c.Z.querySelector(document,".finish-ordernumber");if(!e)return;let t=c.Z.getDataAttribute(e,"order-number");if(!t){console.warn("Cannot determine order number - Skip order tracking");return}gtag("event","purchase",{transaction_id:t,items:u.getLineItems(),...u.getAdditionalProperties()})}}class f extends o{supports(){return!0}execute(){document.addEventListener("click",this._onRemoveFromCart.bind(this))}_onRemoveFromCart(e){if(!this.active)return;let t=e.target.closest(".line-item-remove-button");t&&gtag("event","remove_from_cart",{items:[{id:c.Z.getDataAttribute(t,"product-id")}]})}}class v extends s{supports(){return!0}getPluginName(){return"SearchWidget"}getEvents(){return{handleInputEvent:this._onSearch.bind(this)}}_onSearch(e){this.active&&gtag("event","search",{search_term:e.detail.value})}}class _ extends s{supports(e,t){return"auth"===e&&"loginpage"===t||"register"===e&&"checkoutregisterpage"===t}getPluginName(){return"FormValidation"}getEvents(){return{beforeSubmit:this._onFormSubmit.bind(this)}}_onFormSubmit(e){this.active&&e.target.classList.contains("register-form")&&e.detail.validity&&gtag("event","sign_up",{method:"mail"})}}var k=i(7642);class b extends o{supports(e,t){return"product"===e&&"index"===t}execute(){if(!this.active)return;let e=c.Z.querySelector(document,'[itemtype="https://schema.org/Product"]',!1);if(!e){console.warn('[Google Analytics Plugin] Product itemtype ([itemtype="https://schema.org/Product"]) could not be found in document.');return}let t=c.Z.querySelector(e,'meta[itemprop="productID"]',!1),i=c.Z.querySelector(e,'[itemprop="name"]',!1);if(!t||!i){console.warn('[Google Analytics Plugin] Product ID (meta[itemprop="productID"]) or product name ([itemprop="name"]) could not be found within product scope.');return}let r=t.content,n=i.textContent.trim();if(!r||!n){console.warn("[Google Analytics Plugin] Product ID or product name is empty, do not track page view.");return}gtag("event","view_item",{items:[{id:r,name:n}]})}}class C extends o{supports(){return!!c.Z.querySelector(document,".cms-element-product-listing-wrapper",!1)}execute(){this.active&&gtag("event","view_item_list",{items:this.getListItems()})}getListItems(){let e=c.Z.querySelectorAll(document,".product-box",!1),t=[];if(e)return e.forEach(e=>{if(window.Feature.isActive("v6.7.0.0"))e.dataset.productInformation&&t.push(JSON.parse(e.dataset.productInformation));else{let i=c.Z.querySelector(e,"input[name=product-id]").value,r=c.Z.querySelector(e,"input[name=product-name]").value;if(!i||!r)return;t.push({id:i,name:r})}}),t}fetchProductId(e){let t=null;return e.forEach(e=>{c.Z.getAttribute(e,"name").endsWith("[id]")&&(t=e.value)}),t}}class E extends o{supports(e,t){return"search"===e&&"search"===t}execute(){if(!this.active)return;let e=c.Z.querySelector(document,".header-search-input");gtag("event","view_search_results",{search_term:e.value})}}var y=i(1374);class S extends r.Z{init(){this.cookieEnabledName="google-analytics-enabled",this.cookieAdsEnabledName="google-ads-enabled",this.storage=k.Z,this.handleTrackingLocation(),this.handleCookieChangeEvent(),(!window.useDefaultCookieConsent||y.Z.getItem(this.cookieEnabledName))&&this.startGoogleAnalytics()}startGoogleAnalytics(){let e=document.createElement("script");e.src=window.gtagURL,document.head.append(e),gtag("js",new Date),gtag("config",window.gtagTrackingId,window.gtagConfig),this.controllerName=window.controllerName,this.actionName=window.actionName,this.events=[],this.registerDefaultEvents(),this.handleEvents()}handleTrackingLocation(){this.trackingUrl=new URL(window.location.href);let e=this.trackingUrl.searchParams.get("gclid");e?this.storage.setItem(this._getGclidStorageKey(),e):this.storage.getItem(this._getGclidStorageKey())&&this.trackingUrl.searchParams.set("gclid",this.storage.getItem(this._getGclidStorageKey())),this.trackingUrl.searchParams.get("gclid")&&(window.gtagConfig.page_location=this.trackingUrl.toString())}handleEvents(){this.events.forEach(e=>{e.supports(this.controllerName,this.actionName)&&e.execute()})}registerDefaultEvents(){this.registerEvent(a),this.registerEvent(l),this.registerEvent(h),this.registerEvent(d),this.registerEvent(g),this.registerEvent(m),this.registerEvent(p),this.registerEvent(f),this.registerEvent(v),this.registerEvent(_),this.registerEvent(b),this.registerEvent(C),this.registerEvent(E)}registerEvent(e){this.events.push(new e)}handleCookieChangeEvent(){document.$emitter.subscribe(n.COOKIE_CONFIGURATION_UPDATE,this.handleCookies.bind(this))}handleCookies(e){let t=e.detail;if(this._updateConsent(t),Object.prototype.hasOwnProperty.call(t,this.cookieEnabledName)){if(t[this.cookieEnabledName]){this.startGoogleAnalytics();return}this.removeCookies(),this.disableEvents()}}removeCookies(){let e=document.cookie.split(";"),t=/^(_swag_ga|_gat_gtag)/;e.forEach(e=>{let i=e.split("=")[0].trim();i.match(t)&&y.Z.removeItem(i)})}disableEvents(){this.events.forEach(e=>{e.disable()})}_updateConsent(e){if(0===Object.keys(e).length)return;let t={};Object.prototype.hasOwnProperty.call(e,this.cookieEnabledName)&&(t.analytics_storage=e[this.cookieEnabledName]?"granted":"denied"),Object.prototype.hasOwnProperty.call(e,this.cookieAdsEnabledName)&&(t.ad_storage=e[this.cookieAdsEnabledName]?"granted":"denied",t.ad_user_data=e[this.cookieAdsEnabledName]?"granted":"denied",t.ad_personalization=e[this.cookieAdsEnabledName]?"granted":"denied"),0!==Object.keys(t).length&&gtag("consent","update",t)}_getGclidStorageKey(){return"google-analytics-"+(window.salesChannelId||"")+"-gclid"}}}}]);