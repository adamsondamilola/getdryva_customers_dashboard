import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  public form = {
    email: null,
    password: null,
    password1: null,
    password2: null,
  };

buttonClicked = false;

error:any
success:any
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
        this.form.email = this.customer.email
      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }


  updatePasswordAction() {
    this.getUserDetailsAction()
    this.buttonClicked=true
    this.appService.updatePassword(this.form).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
this.success="Password Successfully Changed!"
this.buttonClicked=false
        //this.router.navigateByUrl('/profile');
    },
    error: error => {
      this.success=null
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }
}
