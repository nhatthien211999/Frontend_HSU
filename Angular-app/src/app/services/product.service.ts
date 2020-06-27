import { Observable } from 'rxjs';
import { Product } from './../models/products';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  productcollection: AngularFirestoreCollection<Product>;
  products: Observable<Product[]>;
  productDoc: AngularFirestoreDocument<Product>;

  
  constructor(public afs: AngularFirestore) { 


    this.productcollection = this.afs.collection('product');

    this.products = this.productcollection.snapshotChanges().pipe(map(changes => {
      return changes.map(a =>{
        const data = a.payload.doc.data() as Product;
        data.id = a.payload.doc.id;
        return data;
      })
    })
    );
  }

  getProducts():Observable <Product[]>{
    // console.log('Thanh Cong')
    return this.products;
  }

  deleteProduct(product: Product){
    // console.log(product.id);
    this.productcollection.doc(product.id).delete();

  }1
  updateProduct(product: Product){
    this.productcollection.doc(product.id).update(product);
  }
}