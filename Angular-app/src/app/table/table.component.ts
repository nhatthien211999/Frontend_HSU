import { Product } from './../models/products';
import { ProductService } from './../services/product.service';
import { Component, OnInit } from '@angular/core';

//firebase import
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';



import { FormGroup, FormControl, FormBuilder, Validators, NgForm } from '@angular/forms';



@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css']
})

export class TableComponent implements OnInit {

  private productsCollection: AngularFirestoreCollection<Product>;


  //list product
  products: Product[];

  editState: boolean = false;

  productToEdit: Product;

  searchCode: FormGroup;

  formdata: FormGroup;
  forSearch: FormGroup;
  // value search
  searchName: string;

  constructor(private productService: ProductService, private readonly afs: AngularFirestore, private fb: FormBuilder) { 
    
    this.productsCollection= afs.collection<Product>('product');

  }

  ngOnInit(): void {
    this.productService.getProducts().subscribe(products => {
      // console.log("ran");
      //   console.log(products);
        this.products = products;
    });

    this.formdata = this.fb.group({
      code:['',[
        Validators.required,
        // Validators.pattern('/^[0-9]{1,5}$/'),
        Validators.minLength(3),
        Validators.maxLength(5)
      ]], 
      name:['',[Validators.required, Validators.minLength(10)]],
      image:['',[Validators.required]],
      price:['',[Validators.required]],
      quantity:['',[Validators.required]],
      status:['',[Validators.required]]
    })

    this.forSearch = new FormGroup({
      search: new FormControl(),
      searchCode: new FormControl()
    })

    this.searchCode = new FormGroup({
      search_Code: new FormControl()
    })
  }
  
  Update (data,product){
    let pro : Product = {};
    pro.code=data.code
    pro.name = data.name
    pro.image=data.image;
    pro.price=data.price
    pro.quantity=data.quantity
    pro.status=data.status

    // let docid = "id1";

    this.productsCollection.doc(product.id).update(pro)//thêm với docid tự động tạo
    this.clearState();
    alert('Sửa sản phẩm thành công ...!!!');

  }

  Delete(event, product){
    this.productService.deleteProduct(product);
    alert('Xóa sản phẩm thành công...!!')
  } 
  
  Edit(event, product: Product){
    this.editState = true;
    this.productToEdit = product;
  }

  clearState(){
    this.editState = false;
    this.productToEdit = null;
  }

  Search(){
    // console.log(this.searchName);
    if(this.searchName == ""){
      this.ngOnInit();
    }else{
      this.products = this.products.filter(res=>{
        return res.name.toLocaleLowerCase().match(this.searchName.toLocaleLowerCase()) ||
        res.price.toString().toLocaleLowerCase().match(this.searchName.toLocaleLowerCase());
      })
    }
  }

  inputNull(){
    if(this.searchName == ""){
      this.ngOnInit();
    }
  }

  SearchCode(choose){
    console.log(choose.search_Code);

    this.products = this.products.filter(res=>{
      if(choose.search_Code === "casio"){
        return res.code === "CASIO";
      }       
      else if(choose.search_Code === "omega"){
        return res.code == "OMEGA";
      }
      else if(choose.search_Code === "app"){
        return res.code == "APPLE";
      }
      else if(choose.search_Code === "ci"){
        return res.code == "CIGA";
      }
      else if(choose.search_Code === "sam"){
        return res.code == "SAMSUNG";
      }
      else if(choose.search_Code == "all"){
        this.ngOnInit();
      }
      else{
        this.ngOnInit();
      }
  
    })
  }

  sortAZ(){
    this.products.sort((a, b) =>{
    const genreA = a.code.toUpperCase();
    const genreB = b.code.toUpperCase();
 

    if (genreA > genreB) {
      return 1;
    } else if (genreA < genreB) {
      return -1;
  }
  return 0;
    })
  }
  sortAZName(){
    this.products.sort((a, b) =>{
    const genreA = a.name.toUpperCase();
    const genreB = b.name.toUpperCase();
 

    if (genreA < genreB) {
      return 1;
    } else if (genreA > genreB) {
      return -1;
 }
  return 0;
    })
  }
  sortNumber19Pri(){
    this.products.sort((a,b) =>{
      return a.price-b.price;
    })
  }
  sortNumber19Qua(){
    this.products.sort((a,b) =>{
      return a.quantity-b.quantity;
    })
  }
}

