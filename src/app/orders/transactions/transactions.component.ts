import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-transactions',
  templateUrl: './transactions.component.html',
  styleUrls: ['./transactions.component.css']
})
export class TransactionsComponent implements OnInit {


  constructor(private appService: AppService, private router: Router) { }

  ngOnInit(): void {
    this.getOrderListAction();
  }

  loginToken:any;
  token:any;
  orders: any;

  getOrderListAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.transactionList(this.token).subscribe({
      next: data => {
        this.orders = data;
        this.orders = this.orders.result
      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }

formatOrderDate(data: any){
return this.appService.format_date(data)
}

tracking_id = null;

formatNum(x:any){
  return this.appService.numberFormatToNaira(x)
    }

trackingOrderAction(tracking_id: any){
  this.token = localStorage.getItem('customer_login_token');
  this.appService.getOrderDetails(this.token, tracking_id).subscribe({
    next: data => {
      this.viewOrderAction(tracking_id)
    },
  error: error => {
    alert("Order Not Found!")
       console.error('There was an error!', error)
  }

  })
}

viewOrderAction(data: any){
  this.router.navigateByUrl('/'+data+"/order");
}

deleteOrderAction(data: any){

  const con = confirm("Are you sure you want to delete this order?")
if(con==true){
  this.token = localStorage.getItem('customer_login_token');
  this.appService.deleteOrder(this.token, data).subscribe({
    next: data => {
      this.getOrderListAction();
    },
  error: error => {
    alert("Order not found or already deleted!")
       console.error('There was an error!', error)
  }

  })
}

}

}
