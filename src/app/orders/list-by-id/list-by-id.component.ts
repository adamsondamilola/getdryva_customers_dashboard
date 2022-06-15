import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-list-by-id',
  templateUrl: './list-by-id.component.html',
  styleUrls: ['./list-by-id.component.css']
})
export class ListByIdComponent implements OnInit {

  constructor(private route: ActivatedRoute, private appService: AppService, private router: Router,
    private spinner: NgxSpinnerService) { }

  id:any

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //if(this.loader) {this.spinner.show()};
    this.getOrderListAction();
  }

  loginToken:any;
  token:any;
  orders: any;
  loader=true

  getOrderListAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getOrderListById(this.token, this.id).subscribe({
      next: data => {
        this.spinner.hide()
        this.loader=false

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
