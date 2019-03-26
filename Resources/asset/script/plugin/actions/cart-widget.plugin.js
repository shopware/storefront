import HttpClient from "../../service/http-client.service";
import DomAccess from "../../helper/dom-access.helper";
import Plugin from '../../helper/plugin.helper';

const CART_WIDGET_ITEM_SELECTOR = '*[data-cart-widget=true]';
const CART_WIDGET_STORAGE_KEY = 'cart-widget-template';

export default class CartWidget extends Plugin {

    /**
     * Constructor.
     */
    constructor() {
        super();
        CartWidget.fetch();
    }

    /**
     * Fetch the current cart widget template by calling the storefront-api
     * and persist the response to the browser's session storage
     */
    static fetch() {
        let client = new HttpClient(window.accessKey, window.contextToken);
        let parent = DomAccess.querySelector(document, CART_WIDGET_ITEM_SELECTOR).parentElement;
        let storageExists = (window.sessionStorage instanceof Storage);

        if (storageExists) {
            parent.innerHTML = window.sessionStorage.getItem(CART_WIDGET_STORAGE_KEY) || parent.innerHTML;
        }

        client.get(window.router["widgets.checkout.info"], (response) => {
            if (storageExists) {
                // persist the fetched template in the storage
                window.sessionStorage.setItem(CART_WIDGET_STORAGE_KEY, response);
            }

            parent.innerHTML = response || parent.innerHTML;
        });

    }
}