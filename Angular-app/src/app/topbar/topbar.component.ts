import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { SharingService } from '../services/sharing.service';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.css']
})
export class TopbarComponent implements OnInit {

  displayName:string="";
  constructor(private userService:UserService, private sharingService:SharingService, private fauthService: AuthService) 
  {
    this.sharingService.isUserLoggedIn
            .subscribe(value => {
                    if(value){
                      this.userService.getCurrentUser()
                        .then(user => {
                                this.displayName = user.displayName!=null? user.displayName: user.email   
                                console.log(this.displayName);} 
                          ).catch(e => {console.log(e);}
                        );
                      
                  }	  
            })
  }

  ngOnInit(): void {
    this.userService.getCurrentUser().then(user=> this.displayName = user.displayName!=null? user.displayName: user.email);
		
    console.log(this.displayName);
  }
  Logout(){
    this.fauthService.logout();
    location.href="/login";
  }
}
