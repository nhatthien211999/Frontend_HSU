import { Injectable } from '@angular/core';
import {Observable} from 'rxjs'; 
import * as firebase from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth'
import { AngularFirestore } from '@angular/fire/firestore';



@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private fauth: AngularFireAuth, public db: AngularFirestore,	public afAuth: AngularFireAuth) { }

  signup(email: string, password:string){
    return new Promise<any>((resolve, reject)=>{
      this.fauth.createUserWithEmailAndPassword(email,password)
      .then(res => {
        resolve(res);
        location.href="/main/table"
      }, err =>reject(err))
    })
  }
  
  getCurrentUser(){

    return new Promise<any>((resolve, reject) => {
      var user = this.afAuth.onAuthStateChanged(function(user){
      if (user) {
        resolve(user);
      } else {				 
        reject('No user logged in');
      }
      })
  })
}


}