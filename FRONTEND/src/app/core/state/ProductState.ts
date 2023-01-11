import { Injectable } from "@angular/core";
import { Action, Selector, State, StateContext } from "@ngxs/store";
import { AddProduct, DeleteProduct } from "../actions/ProductAction";
import { ProductStateModel } from "./ProductStateModel";

@State<ProductStateModel>({
  name: 'products',
  defaults: {
    products: [],
  },
})

@Injectable()
export class ProductState {

  @Selector()
  static getNbProducts(state: ProductStateModel) {
    return state.products.reduce((acc, product) => acc + product.quantity, 0);
  }

  @Selector()
  static getListProducts(state: ProductStateModel) {
    return state.products;
  }

  @Selector()
  static getTotalPrice(state: ProductStateModel) {
    // reduce = methode de fou !
    return state.products.reduce((acc, product) => acc + product.price * product.quantity, 0).toFixed(2);
  }

  @Action(AddProduct)
  add(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: AddProduct
  ) {
    const state = getState();
    patchState({
      //cherche le produit dans le state
      products: state.products.find((product) => product.id === payload.id)
        ? //si il existe on incrémente sa quantité
        state.products.map((product) =>
          product.id === payload.id ? { ...product, quantity: product.quantity + 1 } : product
        )
        : //sinon on ajoute le produit et on set sa quantité a 1
        [...state.products, { ...payload, quantity: 1 }],
    });
  }

  @Action(DeleteProduct)
  delete(
    { getState, patchState }: StateContext<ProductStateModel>,
    { payload }: DeleteProduct
  ) {
    const state = getState();
    patchState({
      //cherche le produit dans le state
      products: state.products.find((product) => product.id === payload.id)?.quantity === 1
        ? //si il existe et que sa quantité est a 1 on le supprime
        state.products.filter((product) => product.id !== payload.id)
        : //sinon on décrémente sa quantité
        state.products.map((product) =>
          product.id === payload.id ? { ...product, quantity: product.quantity - 1 } : product
        ),
    });
  }
}
