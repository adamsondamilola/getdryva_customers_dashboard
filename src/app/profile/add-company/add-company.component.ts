import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, ReplaySubject } from 'rxjs';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-company',
  templateUrl: './add-company.component.html',
  styleUrls: ['./add-company.component.css']
})
export class AddCompanyComponent implements OnInit {

  public form = {
    email: null,
    logo: null,
    name: null,
    state: null,
    city: null,
    phone: null,
    address: null,
    user_id: null,
  };

  error:any
  resp: any;
  token: any;
  cities: any;

buttonClicked = false;

states =this.appService.nigeriaStatesAndLga();

  constructor(private http: HttpClient,
    private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {

    this.cities =[{"lgas": ""}]

    this.getUserDetailsAction()

  }


  customer:any;
  getUserDetailsAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getUserDetails(this.token).subscribe({
      next: data => {
        this.resp = data;
        this.form.user_id = this.resp.result.user_id
        this.customer=this.resp.result

      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }

findCity(){
if(this.form.state != null)
{
  this.cities = this.states.filter(x => x.state == this.form.state);
  this.cities=this.cities[0].lgas
}
}

  addCompanyAction() {
    this.getUserDetailsAction()
    this.buttonClicked=true
    this.appService.addCompany(this.form).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
        this.router.navigateByUrl('/companies');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }

  getFiledetials(element: { value: any; }) {
    console.log(element.value);
 }

//cobvert image to base64
imageError: any;
    isImageSaved: any;
    cardImageBase64: any;

fileChangeEvent(fileInput: any) {
  this.imageError = null;
  if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
          this.imageError =
              'Maximum size allowed is ' + max_size / 1000 + 'Mb';

          return false;
      }
/*
      if (!_.includes(allowed_types, fileInput.target.files[0].type)) {
          this.imageError = 'Only Images are allowed ( JPG | PNG )';
          return false;
      }*/
      const reader = new FileReader();
      reader.onload = (e: any) => {
          const image = new Image();
          image.src = e.target.result;

          const imgBase64Path = e.target.result;
          this.cardImageBase64 = imgBase64Path;
this.form.logo =imgBase64Path
          this.isImageSaved = true;
          /*
          image.onload = rs => {
              const img_height = rs.currentTarget(100);
              const img_width = rs.currentTarget['width'];

              console.log(img_height, img_width);


              if (img_height > max_height && img_width > max_width) {
                  this.imageError =
                      'Maximum dimentions allowed ' +
                      max_height +
                      '*' +
                      max_width +
                      'px';
                  return false;
              } else {
                  const imgBase64Path = e.target.result;
                  this.cardImageBase64 = imgBase64Path;
                  this.isImageSaved = true;
                  // this.previewImagePath = imgBase64Path;
              }
          };
*/
      };

      reader.readAsDataURL(fileInput.target.files[0]);
  }
return this.cardImageBase64;
}

removeImage() {
  this.cardImageBase64 = null;
  this.isImageSaved = false;
}



}


