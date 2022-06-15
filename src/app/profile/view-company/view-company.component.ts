import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-view-company',
  templateUrl: './view-company.component.html',
  styleUrls: ['./view-company.component.css']
})
export class ViewCompanyComponent implements OnInit {

  error:any
  resp: any;
  token: any;
  customer: any;
  company: any;
  logo: any;
  counter: any;
  id:any
  loader=true


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private appService: AppService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    //if(this.loader) {this.spinner.show()};
    this.getUserDetailsAction()
    this.getCompanyDetailsAction();
    this.getOrderCountAction()
  }

  getUserDetailsAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getUserDetails(this.token).subscribe({
      next: data => {
        this.customer = data;
        this.customer=this.customer.result
      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }

  getCompanyDetailsAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getCompanyDetails(this.token, this.id).subscribe({
      next: data => {
        this.company = data;
        this.company=this.company.result
        this.spinner.hide()
        this.loader=false
      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }

  getOrderCountAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getOrderCount(this.token).subscribe({
      next: data => {
        this.counter = data;
        this.counter=this.counter.result
  console.log(this.counter)
      },
    error: error => {
  if(error.error.message=="Access Denied!" && this.customer.email != null){
    //this.router.navigateByUrl('/add_company');
  }
         console.error('There was an error!', error)
    }

    })
  }


}
