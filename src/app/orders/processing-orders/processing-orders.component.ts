import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-processing-orders',
  templateUrl: './processing-orders.component.html',
  styleUrls: ['./processing-orders.component.css']
})
export class ProcessingOrdersComponent implements OnInit {

  constructor(private appService: AppService, private router: Router,
    private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
   // if(this.loader) {this.spinner.show()};
    this.getOrderListAction();
  }

  loginToken:any;
  token:any;
  orders: any;
  loader=true

  getOrderListAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getOrderList(this.token).subscribe({
      next: data => {

        this.orders = data;
        this.orders = this.orders.result
        this.orders = this.orders.filter((y: { status: number; }) => y.status == 2)
        this.spinner.hide()
        this.loader=false

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
  this.router.navigateByUrl('/'+data+"/order_list");
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
