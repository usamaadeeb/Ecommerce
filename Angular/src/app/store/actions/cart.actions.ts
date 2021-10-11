import { Products } from 'src/app/product/products';

//AllProducts
export class GetProducts {
  static readonly type = '[Products] GET';
}



//Display Specific Product
export class Specific {
  static readonly type = '[Products] Specific';
  constructor(public payload: number) { }

}
//Display Category Product
export class Category {
  static readonly type = '[Products] Category';
  constructor(public category: string) { }
}


//Add Items in Cart
export class Add_item_in_Cart {
  static readonly type = '[Cart] Add';
  constructor(public product: Products) { }
}

//Read Items in Cart
export class Read_item_in_Cart {
  static readonly type = '[Cart] Read';
  constructor() { }
}

//Update Items in Cart
export class Update_item_in_Cart {
  static readonly type = '[Cart] Update';
  constructor(public id: number, public quantity: number,) { }
}

//Delete Items in Cart
export class Delete_item_in_Cart {
  static readonly type = '[Cart] Delete';
  constructor(public id: number) { }
}

