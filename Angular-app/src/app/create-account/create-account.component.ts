import { UserService } from './../services/user.service';

import { AccountService } from './../services/account.service';
import { Account } from './../models/account';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import {MustMatch} from '../models/customValidator'

import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.css']
})
export class CreateAccountComponent implements OnInit {
  private AccountsCollection: AngularFirestoreCollection<Account>;
  product: Observable<Account[]>;

  constructor(private fb: FormBuilder, private accountService: AccountService,private userService: UserService, 
    private readonly afs: AngularFirestore) 
  { 
    this.AccountsCollection= afs.collection<Account>('users');
  }
  registerFrom: FormGroup;
  ngOnInit(): void {
    this.registerFrom = this.fb.group({
      firstName:['',[Validators.required]], 
      lastName:['',[Validators.required]],
      email:['',[Validators.required,Validators.email]],
      password:['',[Validators.required]],
      confirmpassword:['',[Validators.required]]
    },
    {
      validator: MustMatch('password', 'confirmpassword')
    });
  }
  onSubmit(){			
    let acc = new Account;
    acc.firstName = this.registerFrom.controls["firstName"].value;
    acc.lastName = this.registerFrom.controls['lastName'].value;
    acc.email = this.registerFrom.controls["email"].value;
    acc.passWord = this.registerFrom.controls["password"].value;
    console.log(acc);
    this.accountService.insertAccount(acc).subscribe(data => console.log(data));
  }

  createAccount(){
    let acc = new Account;
    acc.firstName = this.registerFrom.controls["firstName"].value;
    acc.lastName = this.registerFrom.controls['lastName'].value;
    acc.email = this.registerFrom.controls["email"].value;
    acc.passWord = this.registerFrom.controls["password"].value;
    this.userService.signup(acc.email, acc.passWord).then(res=>{console.log (res)})
    //nên xuất thông báo trên console để theo dõi service có lỗi gì không
  }
  Add (data){

	  console.log(data);
    if(data.firstName === "" || data.lastName === "" || data.email === "" || data.passWord == ""){
      alert('Tạo tài khoản thất bại vui lòng kiểm tra lại ...!!!');
    }
    else
    {
      let it : Account = {};
      it.firstName=data.firstName
      it.lastName = data.lastName
      it.email=data.email
      it.passWord=data.password
      this.AccountsCollection.add(it);
      alert('Tạo tài khoản thành công ...!!!');
      // location.href="/main/table" ??? (((why not ??? = > update firebase === nulll )))
    }

  }

}
