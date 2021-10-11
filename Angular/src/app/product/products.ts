export interface Products {

id: number;
title: string
category: string;
price:number;
image:string;
Incart: boolean;
quantity: number;
description: string;
rating:{
  count: number;
  rate:number;
}


}

export interface price
{
  product: number,
  unit_amount:number,
  currency:string,
  recurring:{
    'interval': 'month',}

}



export interface lineitems{
  price:number,
  quantity: number;
  }

