import { renderOrderSummary, headerCartQuantity } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFecth } from "../data/products.js";
import { loadCart } from "../data/cart.js";
//import '../data/cart-class.js';
//import '../data/backend-practice.js';

Promise.all([//Promise.all let us run multiple promises at the same time and  waits for all the promises to finish 
    loadProductsFecth(),
    new Promise ((resolve) => { //resolve let us control when to go to the next step
        // it runs the inner function immediately
        loadCart(() => {
            resolve();
             //next step. this next step is separate from the rest of the code.
        });
    })

]).then((values) => {
    console.log(values);
    renderOrderSummary();
    headerCartQuantity(); // Update the cart quantity in the header
    renderPaymentSummary();
});

/*
new Promise ((resolve) => { //resolve let us control when to go to the next step
    // it runs the inner function immediately
    loadProducts(() => {
        resolve('value1');
        //next step. this next step is separate from the rest of the code.
    });
}).then((value) => {
    console.log(value);
    return new Promise ((resolve) => {
        loadCart(() => {
            resolve();
        });
    });
}).then(() => {
    renderOrderSummary();
    headerCartQuantity(); // Update the cart quantity in the header
    renderPaymentSummary();
})
    */

/*
loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        headerCartQuantity(); // Update the cart quantity in the header
        renderPaymentSummary();
    });
    
});
*/
