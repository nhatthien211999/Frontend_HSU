import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import * as firebase from 'firebase/app';
import { Router } from '@angular/router';
import 'firebase/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private afAuth: AngularFireAuth,
    private router:Router) { 

    }

    async signinGmail(){
			var provider = new firebase.auth.GoogleAuthProvider();
			provider.addScope('profile');
			provider.addScope('email');
			return await  this.afAuth.signInWithPopup(provider)
              .then(res=>{
                console.log(" da dang nhap thanh cong")
				//  this.router.navigate(['home']);
                // this.router.navigate(['home']);
				})
    }
    
    //Tương tự viết hàm signin với tài khoản firebase như sau:
    siginFirebase(email: string, password:string){
			return new Promise<any>((resolve, reject) => {
			  this.afAuth.signInWithEmailAndPassword(email, password)
			  .then(res => {       

				resolve(res);
				//this.sharingService.isUserLoggedIn.next(true);
			  }, err => reject(err))
      })
    }

    logout(){
      return new Promise<any>((resolve,reject)=>{
        if (this.afAuth.currentUser){
        //if (this.fauth.auth.currentUser){
    
        this.afAuth.signOut();
        resolve("log out");
        }else{
        reject();
        }
    
      })
}
}
