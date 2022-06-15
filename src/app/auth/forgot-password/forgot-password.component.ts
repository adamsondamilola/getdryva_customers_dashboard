import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {

  public form1 = {
    email: null
  };

  public form2 = {
    code: null,
    password: null,
    password2: null
  };


  error:any
  resp: any;
  token: any;

  buttonClicked = false;
  buttonClicked2 = false;
  creatPassword = false;

  constructor(private http: HttpClient,
    private router: Router,
    private appService: AppService,) { }

  ngOnInit(): void {
  }

  requestPasswordResetAction() {
    this.buttonClicked=true
    this.appService.requestPasswordReset(this.form1).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
        this.creatPassword = true
        //this.router.navigateByUrl('/login');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }

  confirmPasswordResetAction() {
    this.buttonClicked2=true
    this.appService.confirmPasswordReset(this.form2).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
       this.router.navigateByUrl('/login');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked2=false
    }

    })
  }

}
