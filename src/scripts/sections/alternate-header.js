function CartAmount() {
  this.cartListener = () => {

    document.addEventListener('cart:added', (CustomEvent) => {
      const newHeader = CustomEvent.detail.header;
      const selectorAmountCart = '#product-amount-cart';
    
      const newCartAmount = new DOMParser()
      .parseFromString(newHeader, "text/html")
      .querySelector(selectorAmountCart)
      .innerHTML;
    
      document.querySelector(selectorAmountCart).innerHTML = newCartAmount;
      
    });
  }

  this.removeCartListener = () => {
    document.removeEventListener('cart:added');
  }

}


Shopify.theme.sections.register('alternate-header', {

  cartAmount: null,
  
  onLoad: function() {
    // Do something when a section instance is loaded
    this.cartAmount = new CartAmount();
    this.cartAmount.cartListener();
    
  },

  
  onUnload: function() {
    // Do something when a section instance is unloaded
    if (this.cartAmount) {
      this.cartAmount.removeCartListener();
    }

  },

  
});