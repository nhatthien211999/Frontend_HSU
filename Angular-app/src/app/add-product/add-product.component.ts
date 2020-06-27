import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';

//firebase import
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

import {Product} from '../models/products'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  private productsCollection: AngularFirestoreCollection<Product>;
  product: Observable<Product[]>;
  
  constructor(private readonly afs: AngularFirestore, private fb: FormBuilder) { 
    this.productsCollection= afs.collection<Product>('product');


  }
  formdata: FormGroup;

  ngOnInit(): void {
      // this.formdata = new FormGroup({
      //   code: new FormControl(),
      //   name: new FormControl(),
      //   image: new FormControl(),
      //   price: new FormControl(),
      //   quantity: new FormControl(),
      //   status: new FormControl()
      // })
      this.formdata = this.fb.group({
        code:['',[
          Validators.required,
          // Validators.pattern('/^[0-9]{1,5}$/'),
          Validators.minLength(3),
          Validators.maxLength(10)
        ]], 
        name:['',[Validators.required, Validators.minLength(10)]],
        image:['',[Validators.required]],
        price:['',[Validators.required]],
        quantity:['',[Validators.required]],
        status:['',[Validators.required]]
      })
  }
  
  Add (data){

	  console.log(data);
    if(data.code === "" || data.name === "" || data.image === "" || data.price == "" || data.quantity === ""){
      alert('Thêm sản phẩm thất bại vui lòng kiểm tra lại ...!!!');
    }
    else if(data.status ===""){

      let it : Product = {};
      it.code=data.code.toUpperCase()
      it.name = data.name
      it.image="../../assets/img/clock/"+data.image
      it.price=data.price
      it.quantity=data.quantity
      it.status= false
      this.productsCollection.add(it);//thêm với docid tự động tạo
      alert('Thêm sản phẩm thành công ...!!!');
    }
    else{
      let it : Product = {};
      it.code=data.code.toUpperCase()
      it.name = data.name
      it.image="../../assets/img/clock/"+data.image
      it.price=data.price
      it.quantity=data.quantity
      it.status= data.status
      this.productsCollection.add(it);//thêm với docid tự động tạo
      alert('Thêm sản phẩm thành công ...!!!');
    }
  }

}
