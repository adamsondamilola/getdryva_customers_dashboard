import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
    email: null,
password:null
  };

  error:any
  resp: any;
  token: any;

buttonClicked = false;

  constructor(private http: HttpClient,
    private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {
    this.buttonClicked=false
  }

  logInAction() {

    this.buttonClicked=true
    this.appService.loginCustomer(this.form).subscribe({
      next: data => {
        this.resp = data;
console.log("customer_login_token "+this.resp.login_token)
        this.error=null
        localStorage.setItem('customer_login_token', this.resp.login_token);
        //this.router.navigateByUrl('/');
        //window.open('/');

      //  localStorage.removeItem("pendingOrder")
        //localStorage.removeItem("processingOrder")
        //localStorage.removeItem("completedOrder")

location.replace('/')
    },
    error: error => {
        this.error = error.error.message;
    if(this.error == "Invalid Account"){this.router.navigateByUrl('/verify_email');}
    else{console.error('There was an error!', error);}

        this.buttonClicked=false
    }

    })
  }

}
