import { renderOrderSummary, headerCartQuantity } from "./checkout/orderSummary.js";
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import '../data/cart-class.js';

renderOrderSummary();
headerCartQuantity(); // Update the cart quantity in the header

renderPaymentSummary();
