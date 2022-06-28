document.addEventListener('cart:added', (CustomEvent) => {
  const newHeader = CustomEvent.detail.header;

  const newCartAmount = new DOMParser()
  .parseFromString(newHeader, "text/html")
  .querySelector('#product-amount-cart')
  .innerHTML;

  document.querySelector('#product-amount-cart').innerHTML = newCartAmount;
  
})