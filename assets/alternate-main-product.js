/* Product start */
const productForm = document.querySelector('#product-form');

const buttonIncreaseProductAmount = document.querySelector('#product-increase-amount');
const buttonDecreaseProductAmount = document.querySelector('#product-decrease-amount');


if (buttonIncreaseProductAmount) {
  buttonIncreaseProductAmount.addEventListener('click', () => {
    document.querySelector('#product-quantity').value = Number(document.querySelector('#product-quantity').value) + 1;
  });
}

if (buttonDecreaseProductAmount) {
  buttonDecreaseProductAmount.addEventListener('click', () => {
    const currentAmount = Number(document.querySelector('#product-quantity').value);
  
    if (currentAmount > 1) {
      document.querySelector('#product-quantity').value = currentAmount - 1;
    }
  });
}

if (productForm) {
  productForm.addEventListener('submit', (event) => {
    event.preventDefault();
    
    fetch(Shopify.routes.root + 'cart/add.js', {
      method: "POST",
      body: new FormData(event.target),
    })
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(error => console.error(error))
  })
}



/* Product end */



/* Accordion start */

function Accordion() {
  const accordionButtons = document.querySelectorAll('.product-accordion__button');

  const accordionContents = document.querySelectorAll('.product-accordion__content');

  this.init = () => {
    accordionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.accordionButtonClick(button.id);
      });
    })
  }

  this.accordionButtonClick = (buttonIndex) => {
    
    accordionButtons.forEach(button => {
        
      if (button.id === buttonIndex) { // this button was pressed
        if (button.getAttribute('aria-expanded') == 'true') {
          // accordion is open. need to close
          button.setAttribute('aria-expanded', 'false');
      
          button.classList.remove('product-accordion__button--open')
      
        } else { 
          // accordion is close. need to open
          button.setAttribute('aria-expanded', 'true');
      
          button.classList.add('product-accordion__button--open')
        }
      } else {
        // other button was pressed
        if (button.getAttribute('aria-expanded') == 'true') {
          // accordion is open. need to close
          button.setAttribute('aria-expanded', 'false');
      
          button.classList.remove('product-accordion__button--open');
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
}



/* Accordion end */


Shopify.theme.sections.register('alternate-main-product', {
  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  accordion: null,

  onLoad: function() {
    // Do something when a section instance is loaded
    // console.log('onLoad');
    
    this.accordion = new Accordion();
    this.accordion.init();
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

    if (this.accordion) {
      this.accordion.accordionButtonClick('button-' + event.target.id);
    }

  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  onBlockDeselect: function(event) {
    // Do something when a section block is deselected
    // console.log('onBlockDeselect');

  }
});