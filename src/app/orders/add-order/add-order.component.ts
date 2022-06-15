import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-add-order',
  templateUrl: './add-order.component.html',
  styleUrls: ['./add-order.component.css']
})
export class AddOrderComponent implements OnInit {

  error:any
  resp: any;
  token: any;
  cities: any;
  cities2: any;
  cities3: any;
  cities03: any;
  cities02: any;

  progressPercent:any;
  progressBar_:any;
  p1: any;
  p2: any;
  p3: any;

  companyId = null;
  userId = null;
  orderId = null;

  public serviceType= ["Trucking", "Warehousing"]
  public storageType= ["Cold Storage", "Dry Storage"]
  public truckType= [
    "Covered Body",
    "Open Body",
    "Flatbeds",
    "Vans"
    ]

  public form = {
    is_fragile: 0,
    is_dangerous: 0,
    is_hazardous: 0,
    is_explosive: 0,
    service_type: null,
    product_description: null,
    user_id: null,
  };


  public form2 = {
    user_id: null,
    order_id: this.orderId,
    truck_type: null,
    tonnage: 0,
    start_point_state: null,
    start_point_city: null,
    start_point_address: null,
    end_point_state: null,
    end_point_city: null,
    end_point_address: null

  };

  public form3 = {
    user_id: null,
    order_id: this.orderId,
    warehousing_type: null,
    start_point_state: null,
    start_point_city: null,
    start_point_address: null,
    size: null,
    duration: null,
    product_name: null

  };

firstForm=true
secondForm=false
thirdForm=false


buttonClicked = false;

states =this.appService.nigeriaStatesAndLga();

  constructor(private http: HttpClient,
    private router: Router,
    private appService: AppService) { }

  ngOnInit(): void {
this.progressBar_=false;
    this.cities =[{"lgas": ""}]

    this.getUserDetailsAction()
    this.getUserCompany()
  }

  is_fragile: any
  isFragile(){
      this.form.is_fragile = 1
      this.is_fragile=1
    }
    notFragile(){
      this.form.is_fragile = 0
      this.is_fragile=0
    }

    is_dangerous: any
    isDangerous(){
        this.form.is_dangerous = 1
        this.is_dangerous=1
      }
      notDangerous(){
        this.form.is_dangerous = 0
        this.is_dangerous=0
      }

      is_hazardous: any
      isHazardous(){
          this.form.is_hazardous = 1
          this.is_hazardous=1
        }
        notHazardous(){
          this.form.is_hazardous = 0
          this.is_hazardous=0
        }

        is_explosive: any
    isExplosive(){
        this.form.is_explosive = 1
        this.is_explosive=1
      }
      notExplosive(){
        this.form.is_explosive = 0
        this.is_explosive=0
      }

companies:any
  getUserCompany(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getCompanyList(this.token).subscribe({
      next: data => {
        this.resp = data;
        this.companies=this.resp.result
        this.companyId=this.companies.id
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
        this.form.user_id=this.userId
        this.form2.user_id=this.userId
        this.form3.user_id=this.userId

      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }

  findCityStart2(){
    if(this.form2.start_point_state != null)
    {
      this.cities2 = this.states.filter(x => x.state == this.form2.start_point_state);
      this.cities2=this.cities2[0].lgas
    }
    }

    findCityEnd2(){
      if(this.form2.end_point_state != null)
      {
        this.cities02 = this.states.filter(x => x.state == this.form2.end_point_state);
        this.cities02=this.cities02[0].lgas
      }
      }

      findCityStart3(){
        if(this.form3.start_point_state != null)
        {
          this.cities3 = this.states.filter(x => x.state == this.form3.start_point_state);
          this.cities3=this.cities3[0].lgas
        }
        }



        addOrderAction() {
    this.getUserDetailsAction()
    this.buttonClicked=true
    this.appService.addOrder(this.form).subscribe({
      next: data => {

        this.progressBar_=true;
        this.progressPercent = 40;
        this.p1 = null;
        this.p2 = "active";
        this.p3 = null;

        this.resp = data;
        this.resp = this.resp.message
        this.orderId = this.resp.order_id
        this.form2.order_id = this.orderId
        this.form3.order_id = this.orderId

        this.error=null
        if(this.form.service_type == "Trucking"){
          this.firstForm=false
          this.secondForm=true
          this.thirdForm=false
        }
        else
        {
                this.firstForm=false
                this.secondForm=false
                this.thirdForm=true
        }
        this.buttonClicked=false


//        this.router.navigateByUrl('/profile');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }

  updateTruckingOrderAction() {
    this.getUserDetailsAction()
    this.buttonClicked=true
    this.appService.updateTruckingOrder(this.form2).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
        this.buttonClicked=false
//        this.router.navigateByUrl('/orders');
this.progressPercent = 80;
this.p1 = null;
        this.p2 = null;
        this.p3 = "active";

        this.router.navigateByUrl('/check_out');
      },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }

  updateWarehousingOrderAction() {
    this.getUserDetailsAction()
    this.buttonClicked=true
    this.appService.updateWarehousingOrder(this.form3).subscribe({
      next: data => {
        this.resp = data;
        this.resp = this.resp.message
        this.error=null
        this.buttonClicked=false
       // this.router.navigateByUrl('/orders');
       this.progressPercent = 80;
       this.p1 = null;
       this.p2 = null;
       this.p3 = "active";

        this.router.navigateByUrl('/check_out');
    },
    error: error => {
        this.error = error.error.message;
        console.error('There was an error!', error);
        this.buttonClicked=false
    }

    })
  }


}
