export const deliveryOptions = [{
    id: '1',
    deliveryDays: 7,
    priceCents:0
},{
    id: '2',
    deliveryDays: 3,
    priceCents: 499
},{
    id: '3',
    deliveryDays: 1,
    priceCents: 999
}];


export function deliveryOptionPrice(item){
    const deliveryId = item.deliveryOptionId;
    let priceCents;
    deliveryOptions.forEach(option => {
        deliveryId===option.id && (priceCents = option.priceCents);
    });
    return priceCents;
}