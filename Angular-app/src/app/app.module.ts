import { TopbarComponent } from './topbar/topbar.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

//firebase import
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';

// Import forms module
// import { FormsModule } from '@angular/forms';

import { Component } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

//server
import { HttpClientModule } from '@angular/common/http';

import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './sidebar/sidebar.component';


import { FooterComponent } from './footer/footer.component';


import { TableComponent } from './table/table.component';
import { AddProductComponent } from './add-product/add-product.component';

import {ProductService} from './services/product.service';
import { CreateAccountComponent } from './create-account/create-account.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';
import { MaintableComponent } from './maintable/maintable.component';

//search








@NgModule({
  declarations: [
    // Khai báo Forms Module
    // FormsModule,


    AppComponent,
    SidebarComponent,
    TopbarComponent,
  
    FooterComponent,
  

    TableComponent,
    AddProductComponent,
    CreateAccountComponent,
    MainLayoutComponent,
    LoginComponent,
    MaintableComponent,




  ],
  imports: [
    BrowserModule,
    
    ReactiveFormsModule,

    AppRoutingModule,

    //firebase import
    AngularFireModule.initializeApp(environment.firebase),
		AngularFirestoreModule,
    AngularFireAuthModule,
    
    //server
    HttpClientModule
  ],
  providers: [ProductService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { 

}
