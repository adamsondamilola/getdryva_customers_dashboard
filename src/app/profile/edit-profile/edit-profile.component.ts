import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  public form = {
    email: null,
    phone: null,
    first_name: null,
    last_name: null,
  };

buttonClicked = false;

    error:any
    resp: any;
    token: any;
    customer: any;
    company: any;

  constructor(
    private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {
    this.getUserDetailsAction()
//    this.getCompanyDetailsAction();
  }

  getUserDetailsAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getUserDetails(this.token).subscribe({
      next: data => {
        this.customer = data;
        this.customer=this.customer.result
        this.form.phone = this.customer.phone
        this.form.email = this.customer.email
        this.form.first_name = this.customer.first_name
        this.form.last_name = this.customer.last_name
      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }


  updateProfileAction() {
    this.getUserDetailsAction()
    this.buttonClicked=true
    this.appService.updateProfileDetails(this.form).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
        this.router.navigateByUrl('/profile');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }

}
