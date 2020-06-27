import { MaintableComponent } from './maintable/maintable.component';
import { LoginComponent } from './login/login.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';

import { CreateAccountComponent } from './create-account/create-account.component';
import { AddProductComponent } from './add-product/add-product.component';
import {AuthGuard} from './auth.guard';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableComponent } from './table/table.component';


const routes: Routes = [
  // {path: "main", component: MainComponent},

  
  {path: "main", component:MainLayoutComponent,
      canActivate:[AuthGuard],
      children: [
        {path: "table",component: TableComponent},
        {path: "addproduct",component: AddProductComponent},
      ]},
  {path:  "login", component:LoginComponent},


  {path:"maintable", component: MaintableComponent,
    canActivate:[AuthGuard],
    children:[
      {path: "table",component: TableComponent},
    ]
},


{path: "create", component:CreateAccountComponent},

{path: "**", component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
