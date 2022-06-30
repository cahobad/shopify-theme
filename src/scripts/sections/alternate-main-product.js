import {register} from '@shopify/theme-sections';
import {getUrlWithVariant, ProductForm} from '@shopify/theme-product-form';

const formElement = document.getElementById('product-form');

register('alternate-main-product', {
  onLoad() {
    if (formElement) {
      fetch(`${Shopify.routes.root}products/${formElement.dataset.handle}.js`)
        .then((response) => {
          return response.json();
        })
        .then((productJSON) => {
          this.productForm = new ProductForm(formElement, productJSON, {
            onOptionChange: this.onOptionChange,
            onFormSubmit: this.onFormSubmit,
          });
        })
        // eslint-disable-next-line no-console
        .catch(console.error);
    }
  },
  onUnload() {
    this.productForm.destroy();
  },

  onOptionChange(event) {
    const variant = event.dataset.variant;

    if (!variant) {
      return;
    }

    const url = getUrlWithVariant(window.location.href, variant.id);
    window.history.replaceState({path: url}, '', url);
  },

  onFormSubmit(event) {
    event.preventDefault();
  },
});
