

/* Product start */
const productForm = document.querySelector('#product-form');
const buttonAddProductToCart = document.querySelector('#product-form-add-to-cart');
const buttonBuyProduct = document.querySelector('#product-form-submit');

buttonBuyProduct.addEventListener('click', sendProductForm);
buttonAddProductToCart.addEventListener('click', addProductToCart);

const buttonIncreaseProductAmount = document.querySelector('#product-increase-amount');
const buttonDecreaseProductAmount = document.querySelector('#product-decrease-amount');

buttonIncreaseProductAmount.addEventListener('click', () => {
  document.querySelector('#product-quantity').value = Number(document.querySelector('#product-quantity').value) + 1;
});

buttonDecreaseProductAmount.addEventListener('click', () => {
  const currentAmount = Number(document.querySelector('#product-quantity').value);

  if (currentAmount > 1) {
    document.querySelector('#product-quantity').value = currentAmount - 1;
  }
});


function updateAmountProductsInCart() {
  const productAmountInCart = document.querySelector('#product-amount-cart').textContent;

  const productQuantityToAddInCart = document.querySelector('#product-quantity').value;

  document.querySelector('#product-amount-cart').textContent = Number(productAmountInCart) + Number(productQuantityToAddInCart);
}

function getProductParameters() {
  const product = {
    name: null,
    price: null,
    size: null,
    color: null,
    quantity: null,
  }
  product.name = document.querySelector('#product-name').textContent;
  product.price = document.querySelector('#product-price').textContent;

  const productSizes = document.getElementsByName('size');

  for (let i = 0; i < productSizes.length; i++) {
    if (productSizes[i].checked) {
      product.size = productSizes[i].value;
      break;
    }
  }

  const productColors = document.getElementsByName('color');

  for (let i = 0; i < productColors.length; i++) {
    if (productColors[i].checked) {
      product.color = productColors[i].value;
      break;
    }
  }

  product.quantity = document.querySelector('#product-quantity').value;

  return product;
}

function addProductToCart() {
  updateAmountProductsInCart();
  const product = getProductParameters();

  console.log('Пользователь желает добавить в корзину данный продукт:');
  console.log(product);
}

function sendProductForm(event) {
  event.preventDefault();
  const product = getProductParameters();

  console.log('Пользователь желает купить данный продукт:')
  console.log(product);
} 



function updateCurrentProductColor(newColor) {
  if (!newColor) return false;

  newColor = newColor.replace('-', ' ');

  document.querySelector('#product-current-color').textContent = newColor;
}

const productColors = document.getElementsByName('color');

productColors.forEach(color => {
  color.addEventListener('change', () => {
    updateCurrentProductColor(color.value)
  })
});

/* Product end */



/* Accordion start */


// temp without IIFE 🙁

const accordionButtons = document.querySelectorAll('.product-accordion__button');

const accordionContents = document.querySelectorAll('.product-accordion__content');

accordionButtons.forEach((button) => {
  button.addEventListener('click', () => {
    accordionButtonClick(button.id);
  });
})


function accordionButtonClick(buttonIndex) {

  accordionButtons.forEach(buton => {
  
    if (buton.id === buttonIndex) { // this button was pressed

      if (buton.getAttribute('aria-expanded') == 'true') {
        // accordion is open. need to close
        buton.setAttribute('aria-expanded', 'false');
    
        buton.classList.remove('product-accordion__button--open')
    
      } else { 
        // accordion is close. need to open
        buton.setAttribute('aria-expanded', 'true');
    
        buton.classList.add('product-accordion__button--open')
      }
    } else {
      // other button was pressed
      if (buton.getAttribute('aria-expanded') == 'true') {
        // accordion is open. need to close
        buton.setAttribute('aria-expanded', 'false');
    
        buton.classList.remove('product-accordion__button--open')
    
      }

    }
    
  });

  

  accordionContents.forEach(block => {

    if (block.getAttribute('aria-labelledby') == buttonIndex) {
      // this block need show
      block.classList.toggle('product-accordion__content--visible');
      
      if (block.getAttribute('aria-hidden') == 'true') {
        block.setAttribute('aria-hidden', 'false')
      } else {
        block.setAttribute('aria-hidden', 'true')
      }
    } else {
      // this block need hidden
      if (block.getAttribute('aria-hidden') == 'true') {
        block.setAttribute('aria-hidden', 'false')
      }

      block.classList.remove('product-accordion__content--visible');
    }
  })
}


/* Accordion end */


Shopify.theme.sections.register('alternate-main-product', {
  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  onLoad: function() {
    // Do something when a section instance is loaded
    
    // не успел разобраться, как инициировать аккордион от сюда таким образом, чтобы отрабатывал onBlockSelect
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload: function() {
    // Do something when a section instance is unloaded
    // Здесь должен быть дестрой если он необходим
    // console.log('onUnload', 'Здесь должен быть дестрой если он необходим');

  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect: function() {
    // Do something when a section instance is selected
    // console.log('onSelect', '');
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect: function() {
    // Do something when a section instance is deselected
    // console.log('onDeselect', '');

  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect: function(event) {
    // Do something when a section block is selected
    // console.log('onBlockSelect');

    accordionButtonClick('button-' + event.detail.blockId)
 
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect: function(event) {
    // Do something when a section block is deselected
    // console.log('onBlockDeselect');

  }
});