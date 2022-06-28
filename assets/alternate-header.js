document.addEventListener('cart:added', (CustomEvent) => {
  const newHeader = CustomEvent.detail.header;
  const selectorAmountCart = '#product-amount-cart';

  const newCartAmount = new DOMParser()
  .parseFromString(newHeader, "text/html")
  .querySelector(selectorAmountCart)
  .innerHTML;

  document.querySelector(selectorAmountCart).innerHTML = newCartAmount;
  
})