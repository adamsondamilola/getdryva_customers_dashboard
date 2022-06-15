import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private appService: AppService) { }


  token:any
  resp:any;
  ngOnInit(): void {
    this.token = this.appService.getLoginToken()

if(this.token !== null){
    this.appService.checkIfLoggedIn(this.token).subscribe({
    next: data => {
      this.resp = data;
      this.resp=this.resp.mins

    },
    error: error => {
//alert(JSON.stringify(error.error))
      localStorage.removeItem('customer_login_token')
      location.replace('/login')
        console.error('There was an error!', error)
    }
    });
  }

//if(this.login != 1){
//localStorage.removeItem('customer_login_token')
//  location.replace('/login')
//}

  }

  logOutAction(){
    this.appService.logOut()
    location.replace('/login')
  }

hrefLink(link:any){
location.href=link
}

}
