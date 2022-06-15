import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {


  constructor(private appService: AppService, private router: Router) { }

  progressBar:any;

  ngOnInit(): void {

  this.progressBar = false;
  this.getUserDetailsAction();
  this.getOrderListAction();

  }
  error: any
  loginToken:any;
  token:any;
  vendorId:any
  vendors:any
  orders: any;
  resp: any;
isContractCustomer: any;
userId = null;


buttonClicked = false;
selectVendor = false;

getVendors(){
  this.appService.vendorsList().subscribe({
    next: data => {
      this.resp = data;
      this.vendors=this.resp.result
    },
  error: error => {
       console.error('There was an error!', error)
  }

  })
}

trucks:any;
truck_list:any;
vendorInfo:any;

backButton(){
this.trucks=null;
this.truck_list=null
this.vendorInfo=null
}

viewButton(VenId: any){
  this.getVendorTruckList(VenId)
  }

getVendorTruckList(VenId: any){
  this.appService.vendorsDetails(VenId).subscribe({
    next: data => {
      this.resp = data;
if(this.resp.vendor_trucks > 0){
  this.trucks=this.resp.vendor_trucks
  this.truck_list=this.resp.vendor_truck_list
  this.vendorInfo=this.resp.vendor
}else{
alert("No further information found for vendor")
}

    },
  error: error => {
       console.error('There was an error!', error)
  }

  })
}


ifContractCustomer(){
  this.token = localStorage.getItem('customer_login_token');
  this.appService.checkIfOrderHasNCC(this.userId).subscribe({
    next: data => {
      this.isContractCustomer = data;
      this.isContractCustomer = this.isContractCustomer.message

    },
  error: error => {
       console.error('There was an error!', error)
  }

  })
}


getUserDetailsAction(){
  this.token = localStorage.getItem('customer_login_token');
  this.appService.getUserDetails(this.token).subscribe({
    next: data => {
      this.resp = data;
      this.userId=this.resp.result.user_id

    },
  error: error => {
       console.error('There was an error!', error)
  }

  })
}

  getOrderListAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getPendingCartOrderList(this.token).subscribe({
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

addMoreOrder(){
  this.router.navigateByUrl('/add_order');
}

submitOrder(){

this.getVendors()

this.buttonClicked = true
this.ifContractCustomer()
if(this.isContractCustomer == "CC"){
  this.vendorId = 1
  this.submitOrderWithVendor(this.vendorId)
}
else {
this.selectVendor = true
this.buttonClicked = false
}
this.progressBar = true


}

submitOrderWithVendor(venId: any){

  if(parseInt(venId) > 0){
    this.buttonClicked = true
    this.token = localStorage.getItem('customer_login_token');
    this.appService.SubmitOrderList(this.token, venId).subscribe({
      next: data => {
        this.resp = data;
        //this.resp = this.resp.message
        this.buttonClicked = false
        this.router.navigateByUrl('/orders')
      },
    error: error => {
      this.error = error.error.message;
      this.buttonClicked = false
         console.error('There was an error!', error)
    }

    })
}else{
  this.error = "An error occured, please try again.";
}


}

tracking_id = null;


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
