import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  counter: any;

  constructor(private appService: AppService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    //if(this.loader) {this.spinner.show()};
    this.getOrderListAction();
    this.getOrderCountAction()
  }


  loginToken:any;
  token:any;
  orders: any;
  loader=true

  getOrderCountAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getOrderCount(this.token).subscribe({
      next: data => {
        this.counter = data;
        this.counter=this.counter.result

  if(this.counter.pending >= 0){
    this.spinner.hide()
        this.loader=false
  }

      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }

  formatNum(x:any){
return this.appService.numberFormatToNaira(x)
  }
  getOrderListAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getOrderList(this.token).subscribe({
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

viewOrderList(data: any){
  this.router.navigateByUrl('/'+data);
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
