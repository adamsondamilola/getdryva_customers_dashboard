import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  public form = {
    email: null,
    password: null,
    password2: null,
    first_name: null,
    last_name: null,
    phone: null,
  };

  error:any
  resp: any;
  token: any;

buttonClicked = false;


  constructor(private http: HttpClient,
    private router: Router,
    private appService: AppService,) { }

  ngOnInit(): void {


  }

  signUpAction() {

    this.buttonClicked=true
    this.appService.signupCustomer(this.form).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
        this.router.navigateByUrl('/verify_email');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }

}
