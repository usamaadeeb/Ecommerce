import { Action, Selector, State, StateContext } from '@ngxs/store';
import { Products } from 'src/app/product/products';
import { Injectable } from '@angular/core';

import {
  Add_item_in_Cart,
  Category,
  Delete_item_in_Cart,
  GetProducts,
  Read_item_in_Cart,
  Specific,
  Update_item_in_Cart,
} from '../actions/cart.actions';
import { BackendService } from 'src/app/backend.service';
import { tap } from 'rxjs/operators';

// Interface
export interface CartTB {
  products: Products[];
  loaded: boolean;
  specific: Products;
  category: Products[];
  Cart: Products[];
  Total: number;
}

// CartState

@State<CartTB>({
  name: 'Cart',
  defaults: <CartTB>{
    products: [],
    loaded: false,
    specific: <Products>{},
    category: [],
    Cart: [],
    Total: 0,
  },
})
@Injectable()
export class CartState {
  constructor(private backend: BackendService) {}
  // Selectors has logic to get state data

  @Selector()
  static getproductsList(state: CartTB) {
    return state.products;
  }

  @Selector()
  static getloadedproduct(state: CartTB) {
    return state.loaded;
  }

  @Selector()
  static Specific(state: CartTB) {
    return state.specific;
  }

  @Selector()
  static Category(state: CartTB) {
    return state.category;
  }

  @Selector()
  static DisplayCart(state: CartTB) {
    return state.Cart;
  }

  @Selector()
  static price(state: CartTB) {
    return state.Total;
  }

  @Action(GetProducts)
  getproducts({ getState, setState }: StateContext<CartTB>) {
    return this.backend.AllProductsService().pipe(
      tap((res) => {
        console.log(res);
        const state = getState();

        setState({
          ...state,
          products: res,
          loaded: true,
        });
      })
    );
  }

  @Action(Specific)
  specific_product(
    { getState, setState }: StateContext<CartTB>,
    { payload }: Specific
  ) {
    const state = getState();
    const prod = state.products;
    const index = prod.findIndex((p) => p.id == payload);

    setState({ ...state, specific: prod[index] });
  }

  @Action(Category)
  category_product(
    { getState, setState }: StateContext<CartTB>,
    { category }: Category
  ) {
    const state = getState();
    const prod = state.products;
    const catePro = prod.filter((p) => p.category == category);

    setState({ ...state, category: catePro });
  }
  //Add in Cart
  @Action(Add_item_in_Cart)
  additem(
    { getState, setState }: StateContext<CartTB>,
    { product }: Add_item_in_Cart
  ) {
    const state = getState();

    const prod = state.products;
    const check = state.Cart.filter((p) => p.id == product.id);
    if (!check.length) {
      product.quantity = 1;
      const price=Number(product.price)
      const total = state.Total +  price;
      console.log(total);
      const updatedCart = state.Cart;
      updatedCart.push(product);

      setState({ ...state, Total:300, Cart: updatedCart });
    } else {
      alert('Already in Cart');
    }

    setState({ ...state });
  }
  //Update in Cart
  @Action(Update_item_in_Cart)
  updateitems(
    { getState, setState }: StateContext<CartTB>,
    { id, quantity }: Update_item_in_Cart
  ) {
    const state = getState();
    const prod = state.Cart;

    const cart = prod.findIndex((p) => p.id == id);

    prod[cart].quantity = quantity;

    const updatedCart = prod.filter((p) => p.id != id);

    const newcart = [prod[cart], ...updatedCart];

    setState({ ...state, Cart: newcart });
  }
  //Delete in Cart
  @Action(Delete_item_in_Cart)
  deleteitems(
    { getState, setState }: StateContext<CartTB>,
    { id }: Delete_item_in_Cart
  ) {
    const state = getState();
    const update = state.Cart;
    const cart = update.filter((p) => p.id != id);

    setState({ ...state, Cart: cart });
  }
}
