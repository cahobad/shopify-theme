import {register} from '@shopify/theme-sections';
import {ProductForm, getUrlWithVariant} from '@shopify/theme-product-form';

/* Product start */
const myProductForm = document.querySelector('#product-form');

const buttonAddToCard = document.querySelector('#add-to-card');
const buttonBuyItNow = document.querySelector('#buy-it-now');

const buttonIncreaseProductAmount = document.querySelector(
  '#product-increase-amount',
);
const buttonDecreaseProductAmount = document.querySelector(
  '#product-decrease-amount',
);

const warningField = document.querySelector('#product-warning');

if (buttonIncreaseProductAmount) {
  buttonIncreaseProductAmount.addEventListener('click', () => {
    document.querySelector('#product-quantity').value =
      Number(document.querySelector('#product-quantity').value) + 1;
  });
}

if (buttonDecreaseProductAmount) {
  buttonDecreaseProductAmount.addEventListener('click', () => {
    const currentAmount = Number(
      document.querySelector('#product-quantity').value,
    );

    if (currentAmount > 1) {
      document.querySelector('#product-quantity').value = currentAmount - 1;
    }
  });
}

/* Product end */

/* Accordion start */

function Accordion() {
  const accordionButtons = document.querySelectorAll(
    '.product-accordion__button',
  );

  const accordionContents = document.querySelectorAll(
    '.product-accordion__content',
  );

  this.init = () => {
    accordionButtons.forEach((button) => {
      button.addEventListener('click', () => {
        this.accordionButtonClick(button.id);
      });
    });
  };

  this.accordionButtonClick = (buttonIndex) => {
    accordionButtons.forEach((button) => {
      if (button.id === buttonIndex) {
        // this button was pressed
        if (button.getAttribute('aria-expanded') === 'true') {
          // accordion is open. need to close
          button.setAttribute('aria-expanded', 'false');

          button.classList.remove('product-accordion__button--open');
        } else {
          // accordion is close. need to open
          button.setAttribute('aria-expanded', 'true');

          button.classList.add('product-accordion__button--open');
        }
      }

      if (
        button.id !== buttonIndex &&
        button.getAttribute('aria-expanded') === 'true'
      ) {
        // other button was pressed and accordion is open. need to close
        button.setAttribute('aria-expanded', 'false');

        button.classList.remove('product-accordion__button--open');
      }
    });

    accordionContents.forEach((block) => {
      if (block.getAttribute('aria-labelledby') === buttonIndex) {
        // this block need show
        block.classList.toggle('product-accordion__content--visible');

        if (block.getAttribute('aria-hidden') === 'true') {
          block.setAttribute('aria-hidden', 'false');
        } else {
          block.setAttribute('aria-hidden', 'true');
        }
      } else {
        // this block need hidden
        if (block.getAttribute('aria-hidden') === 'true') {
          block.setAttribute('aria-hidden', 'false');
        }

        block.classList.remove('product-accordion__content--visible');
      }
    });
  };
}

/* Accordion end */

register('alternate-main-product', {
  // Shortcut function called when a section is loaded via 'sections.load()' or by the Theme Editor 'shopify:section:load' event.
  accordion: null,

  onLoad() {
    // Do something when a section instance is loaded
    // console.log('onLoad');

    this.accordion = new Accordion();
    this.accordion.init();

    // product form

    if (myProductForm) {
      fetch(`${Shopify.routes.root}products/${myProductForm.dataset.handle}.js`)
        .then((response) => {
          return response.json();
        })
        .then((productJSON) => {
          this.productForm = new ProductForm(myProductForm, productJSON, {
            onOptionChange: this.onOptionChange,
            onFormSubmit: this.onFormSubmit,
          });
        })
        // eslint-disable-next-line no-console
        .catch((error) => console.error(error));
    }
  },

  onOptionChange: (event) => {
    // hidden warning with error 422
    if (warningField.textContent) {
      warningField.textContent = '';
    }

    const variant = event.dataset.variant;
    console.log(variant);
    if (!variant) {
      return false;
    }

    if (variant.available) {
      buttonAddToCard.disabled = false;
      buttonBuyItNow.disabled = false;
      const url = getUrlWithVariant(window.location.href, variant.id);

      window.history.replaceState({path: url}, '', url);
    } else {
      buttonAddToCard.disabled = true;
      buttonBuyItNow.disabled = true;
    }
  },

  onFormSubmit: (event) => {
    event.preventDefault();

    fetch(`${Shopify.routes.root}cart/add.js`, {
      method: 'POST',
      body: new FormData(event.target),
      headers: {'x-requested-with': 'XMLHttpRequest'},
    })
      .then((response) => response.json())

      .then((response) => {
        if (response.status === 422) {
          warningField.innerText = `${response.message}. ${response.description}`;

          return false;
        } else {
          const cartEvent = new CustomEvent('cart:added', {
            detail: {
              header: response.sections['alternate-header'],
            },
            bubbles: true,
          });

          event.target.dispatchEvent(cartEvent);
          return true;
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(error);
      });
  },

  // Shortcut function called when a section unloaded by the Theme Editor 'shopify:section:unload' event.
  onUnload() {
    // Do something when a section instance is unloaded
    this.productForm.destroy();
  },

  // Shortcut function called when a section is selected by the Theme Editor 'shopify:section:select' event.
  onSelect() {
    // Do something when a section instance is selected
    // console.log('onSelect', '');
  },

  // Shortcut function called when a section is deselected by the Theme Editor 'shopify:section:deselect' event.
  onDeselect() {
    // Do something when a section instance is deselected
    // console.log('onDeselect', '');
  },

  // Shortcut function called when a section block is selected by the Theme Editor 'shopify:block:select' event.
  onBlockSelect(event) {
    // Do something when a section block is selected
    // console.log('onBlockSelect');

    if (this.accordion) {
      this.accordion.accordionButtonClick(`button-${event.target.id}`);
    }
  },

  // Shortcut function called when a section block is deselected by the Theme Editor 'shopify:block:deselect' event.
  // onBlockDeselect(event) {
  // Do something when a section block is deselected
  // console.log('onBlockDeselect');
  // },
});
