import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  constructor(private appService: AppService, private router: Router) { }

token: any;

  ngOnInit(): void {
    this.token = this.appService.getLoginToken()
  }

  logOutAction(){
    this.appService.logOut()
    location.replace('/')
//    this.router.navigateByUrl("/login");
  }

  tracking_id = null

  trackingOrderAction(id: any){
if(id == null){
  alert("Invalid!")
}else{
  this.token = localStorage.getItem('customer_login_token');
    this.appService.getOrderDetails(this.token, id).subscribe({
      next: data => {
        this.viewOrderAction(data)
      },
    error: error => {
      alert("Order Not Found!")
         console.error('There was an error!', error)
    }

    })
}
  }

  viewOrderAction(data: any){
    this.router.navigateByUrl('/'+data+"/order_list");
  }

}
