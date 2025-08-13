//Class
class Cart {
    cartItems;//public property
    #localStorageKey;//private property

    constructor(localStorageKey){
        this.#localStorageKey = localStorageKey;
        this.loadFromStorage();
    }
    

    loadFromStorage(){
        this.cartItems = JSON.parse(localStorage.getItem(this.#localStorageKey));
        if(!this.cartItems){
            this.cartItems = [{
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6', // Default product ID
                quantity:2,
                deliveryOptionId: '1' 
            },{
                productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity: 1,
                deliveryOptionId: '2'
            }];
        }
    }


    saveToStorage(){
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
    }


    addToCart(productId) {
        let boolean = true;
        this.cartItems.forEach(item => {
            item.productId === productId && (item.quantity++ , boolean = false); // Increment quantity if product already in cart
        });
        boolean && this.cartItems.push({
            productId: productId,
            quantity: 1 ,// Default quantity to 1,
            deliveryOptionId: '1' // Default delivery option
        });
        this.saveToStorage();
    }


    removeFromCart(productId) {
        const newCart = this.cartItems.filter(item => item.productId !== productId);
        this.cartItems.length = 0; // Clear the cart
        this.cartItems.push(...newCart); // Push the filtered items back to the cart
        this.saveToStorage(); // Save the updated cart to local storage  
    }

    
    updateDeliveryOption(productId, deliveryOptionId){
        let matchingItem;
        this.cartItems.forEach(item => {
            if(productId === item.productId){
                matchingItem = item;
            }
        });
        matchingItem.deliveryOptionId = deliveryOptionId;
        this.saveToStorage();
    }
}

const cart =new Cart('cart-oop');

console.log(cart instanceof Cart);//checa si es generado de la clase Cart






