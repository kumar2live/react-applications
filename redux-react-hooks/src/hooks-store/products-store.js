import { initStore } from './store';
import { productsRef } from '../contexts/products-context';

const configureStore = () => {
  const actions = {
    TOGGLE_FAV: (currState, productID) => {
      const prodIndex = currState.products.findIndex((p) => p.id === productID);
      const newFavStatus = !currState.products[prodIndex].isFavorite;
      const updatedProducts = [...currState.products];
      updatedProducts[prodIndex] = {
        ...currState.products[prodIndex],
        isFavorite: newFavStatus
      };
      return {
        products: updatedProducts,
      }
    }
  }

  initStore(actions, {products: productsRef});
}

export default configureStore;