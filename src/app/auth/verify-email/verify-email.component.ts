import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  public form = {
    code: null
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

  verifyActionAction() {

    this.buttonClicked=true
    this.appService.verifyCustomerEmail(this.form).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
        this.router.navigateByUrl('/login');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }

}
