import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-view-order',
  templateUrl: './view-order.component.html',
  styleUrls: ['./view-order.component.css']
})
export class ViewOrderComponent implements OnInit {

  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private router: Router, private spinner: NgxSpinnerService) { }

    id:any
    token:any;
    token2:any;
    company:any;
    customer: any;
    order: any;
    progress: number | undefined;
loader=true
vendorId:any
orderId:any
resp: any
vendor: any


routeDetails:any
driverDetails:any

    ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
  //  if(this.loader) {this.spinner.show()};
  this.getOrderTrackingDetails();
    this.getOrderDetailsAction();

     }

  formatNum(x:any){
    return this.appService.numberFormatToNaira(x)
      }

tracking: any;
      getOrderTrackingDetails(){
        this.token = localStorage.getItem('customer_login_token');
        this.appService.trackOrder(this.id).subscribe({
          next: data => {
            this.resp = data;
            this.resp = this.resp
            this.tracking=this.resp

          },
        error: error => {
             console.error('There was an error!', error)
        }

        })
      }

      getVendorDetailsAction(){
        this.token = localStorage.getItem('customer_login_token');
        this.appService.getOrderVendorById(this.token, this.vendorId).subscribe({
          next: data => {
            this.resp = data;
            this.resp = this.resp.result
            this.vendor=this.resp

          },
        error: error => {
             console.error('There was an error!', error)
        }

        })
      }

      getDriverRouteDetailsAction(){
        this.token = localStorage.getItem('customer_login_token');
        this.appService.getOrderDriverAndRouteById(this.token, this.orderId).subscribe({
          next: data => {
            this.resp = data;
            //this.resp = this.resp.result
            this.driverDetails=this.resp.driver_details
            this.routeDetails=this.resp.route_details

          },
        error: error => {
             console.error('There was an error!', error)
        }

        })
      }

  getOrderDetailsAction(){
    this.token = localStorage.getItem('customer_login_token');
    this.appService.getOrderDetails(this.token, this.id).subscribe({
      next: data => {
        this.order = data;
        this.order=this.order.result
        this.vendorId=this.order.vendor_id
        this.orderId=this.order.id

        if(this.vendorId > 0) this.getVendorDetailsAction();
        if(this.orderId > 0) this.getDriverRouteDetailsAction();

        this.progress = Number(this.order.progress.toString())

        this.spinner.hide()
        this.loader=false

      },
    error: error => {
         console.error('There was an error!', error)
    }

    })
  }

}
