import {cart, removeFromCart, updateDeliveryOption} from '../../data/cart.js'; // Importing the cart array from cart.js
import {products, getProduct} from '../../data/products.js'; // Importing the products array from products.js
import {formatCurrency} from '../utils/money.js'; // Importing the formatCurrency function
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js'; // default export - without {} and can be only one per file
import {deliveryOptions} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
let cartHTML = '';
    cart.forEach((cartItem, index) => {
        const productId = cartItem.productId;
       
        const matchingProduct = getProduct(productId);

        const deliveryOptionId= cartItem.deliveryOptionId;
        let deliveryOption;

        deliveryOptions.forEach(option => {
            if(option.id === deliveryOptionId){
                deliveryOption = option;
            }
        });

        const today = dayjs();
        const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
        const dateString = deliveryDate.format('dddd, MMMM D');
        cartHTML += 
        `<div class="cart-item-container js-cart-item-${matchingProduct.id}">
                <div class="delivery-date">
                Delivery date: ${dateString}
                </div>

                <div class="cart-item-details-grid">
                <img class="product-image"
                    src="${matchingProduct.image}">

                <div class="cart-item-details">
                    <div class="product-name">
                        ${matchingProduct.name}
                    </div>
                    <div class="product-price">
                        $${formatCurrency(matchingProduct.priceCents)}
                    </div>
                    <div class="product-quantity">
                    <span>
                        Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                    </span>
                    <span class="update-quantity-link link-primary">
                        Update
                    </span>
                    <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                        Delete
                    </span>
                    </div>
                </div>

                <div class="delivery-options">
                    <div class="delivery-options-title">
                    Choose a delivery option:
                    </div>
                    ${deliveryOptionsHTML(matchingProduct, cartItem)}
                </div>
                </div>
            </div>`;
    });
document.querySelector('.js-order-summary').innerHTML = cartHTML;

document.querySelectorAll('.js-delete-link').forEach(link => {
    link.addEventListener('click', () => {
        const productId = link.dataset.productId;
        removeFromCart(productId); // Remove the item from the cart
        document.querySelector(`.js-cart-item-${productId}`).remove(); // Remove the item from the DOM
        headerCartQuantity(); // Update the cart quantity in the header
        renderPaymentSummary();
    });
});
document.querySelectorAll('.delivery-option-input').forEach(input => {
    input.addEventListener('click', () => {
        const {productId, deliveryId} = input.dataset;
        updateDeliveryOption(productId,deliveryId);
        renderOrderSummary();
        renderPaymentSummary();
    });
});

}





function deliveryOptionsHTML(matchingProduct, cartItem) {
    let html = '';
    deliveryOptions.forEach(option =>{
        const today = dayjs();
        const deliveryDate = today.add(option.deliveryDays, 'days'); 
        const dateString = deliveryDate.format('dddd, MMMM D');
        const deliveryPrice = option.priceCents === 0 ? 'FREE' : `$${formatCurrency(option.priceCents)} -`;

        const isChecked = option.id === cartItem.deliveryOptionId;

        html += `<div class="delivery-option">
                    <input type="radio" ${isChecked ? 'checked': ''}
                        class="delivery-option-input"
                        name="delivery-option-${matchingProduct.id}" data-delivery-id="${option.id}" data-product-id="${cartItem.productId}">
                    <div>
                        <div class="delivery-option-date">
                        ${dateString}
                        </div>
                        <div class="delivery-option-price">
                        ${deliveryPrice} Shipping
                        </div>
                    </div>
                    </div>`;
    });
    return html;
}

export function headerCartQuantity(){
    let cartQuantity = 0;
    cart.forEach(item => {
        cartQuantity += item.quantity;
    });
    document.querySelector('.return-to-home-link').innerHTML = cartQuantity + ' items';
}