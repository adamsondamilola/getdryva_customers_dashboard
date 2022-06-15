import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-companies',
  templateUrl: './companies.component.html',
  styleUrls: ['./companies.component.css']
})
export class CompaniesComponent implements OnInit {

  constructor(private appService: AppService, private router: Router, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
  //  if(this.loader) {this.spinner.show()};
    this.getCompanyList();
  }

  loginToken:any;
  token:any;
  companies: any;
  loader=true

  getCompanyList(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getCompany(this.token).subscribe({
      next: data => {
        this.companies = data;
        this.companies = this.companies.result

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
  this.router.navigateByUrl('/'+data+"/view_company");
}

deleteOrderAction(data: any){

  const con = confirm("Are you sure you want to delete this order?")
if(con==true){
  this.token = localStorage.getItem('customer_login_token');
  this.appService.deleteOrder(this.token, data).subscribe({
    next: data => {
      this.getCompanyList();
    },
  error: error => {
    alert("Order not found or already deleted!")
       console.error('There was an error!', error)
  }

  })
}

}

}
