export let cart = JSON.parse(localStorage.getItem('cart'));
if(!cart){
    cart = [{
    productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // Default product ID
    quantity:2
},{
    productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity: 1
}];
}


function saveToStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));

}

export function addToCart(productId, productPrice) {
  let boolean = true;
        cart.forEach(item => {
            item.productId === productId && (item.quantity++ , boolean = false); // Increment quantity if product already in cart
        });
        boolean && cart.push({
            productId: productId,
            productPrice: productPrice,
            quantity: 1 // Default quantity to 1
        });
    saveToStorage();

}

export function removeFromCart(productId) {
   const newCart = cart.filter(item => item.productId !== productId);
   cart.length = 0; // Clear the cart
   cart.push(...newCart); // Push the filtered items back to the cart

   saveToStorage(); // Save the updated cart to local storage
   
   
}