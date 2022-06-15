import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppService } from '../services/app.service';

import { GoogleChartInterface, GoogleChartType } from 'ng2-google-charts';

import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { DatePipe } from '@angular/common';
import { globalVariables } from 'src/global';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})


export class MainComponent implements OnInit {


  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  constructor(private route: ActivatedRoute,
    private appService: AppService,
    private router: Router, private spinner: NgxSpinnerService, public datepipe: DatePipe) {    }

pendingAmount=0
pendingOrderPayment: any
resp:any
labels_ = '';
datasets_:any;
//let ;

makePayment(){
  this.token2 = localStorage.getItem('customer_login_token');
  window.location.replace(this.appService.webUrl + this.token2+"/pay_order");
}

getPendingOrderPayment(){
  this.token2 = localStorage.getItem('customer_login_token');
  this.appService.checkPendingPayment(this.token2).subscribe({
    next: data => {
      this.resp = data;
      this.pendingOrderPayment=this.resp.result
      this.pendingAmount=this.resp.total_cost
    },
  error: error => {
       console.error('There was an error!', error)
  }

  })
}

    formatNum(x:any){
      return this.appService.numberFormatToNaira(x)
        }

  ngOnInit(): void {
//    if(this.loader) {this.spinner.show()};

/*
    setTimeout(() => {
      //spinner ends after 5 seconds
      this.spinner.hide();
    }, 5000); */
    this.getOrderCountAction()

this.getPendingOrderPayment()

    this.getLoginToken()
    this.getUserDetailsAction()
    this.getCompanyDetailsAction()
    this.getOrderListAction(5)
this.getOrderListByTruckingAction()
this.getOrderListByWarehousingAction()
//    alert(this.pendingOrders())
var d = new Date();
var months = "6";
var days = 6;
//var defaultToDate = d.setDate(d.getDate()-days);
var defaultToDate = d.setDate(d.getDate()-days);
this.filterOrderListAction(months)

  }

  pieData:any;
  DifferentWindow: any;
  loginToken:any;
  token:any;
  token2:any;
  company:any;
  customer: any;
  counter: any;
  completed: any;
  pending: any;
  processing: any;

  loader=true

getLoginToken(){
/*
  this.token = this.route.snapshot.params['token'];
if(this.appService.getLoginToken() == null && this.token.length > 15){
if(this.token != null && this.token != ""){
  localStorage.setItem("customer_login_token", this.token);
}
}
*/

if(this.appService.getLoginToken() == null || this.appService.getLoginToken() == ""){
//  location.replace('/login')
this.router.navigateByUrl('/login')
  }
}

viewOrderList(data: any){
  this.router.navigateByUrl('/'+data);
}


getUserDetailsAction(){
  this.token = localStorage.getItem('customer_login_token');
  this.appService.getUserDetails(this.token).subscribe({
    next: data => {

      this.customer = data;
      this.customer=this.customer.result
    },
  error: error => {
        //this.router.navigateByUrl('/login')
       console.error('There was an error!', error)

  }

  })
}

getCompanyDetailsAction(){
  this.token2 = localStorage.getItem('customer_login_token');
  this.appService.getCompany(this.token2).subscribe({
    next: data => {
      this.company = data;
      this.company=this.company.result

      if(this.company == ""){
  this.router.navigateByUrl('/add_company');
}
    },
  error: error => {
if(error.error.message=="Access Denied!" && this.customer.email != null){
  //this.router.navigateByUrl('/add_company');
}
       console.error('There was an error!', error)
  }

  })
}

tracking_id = null;

trackingOrderAction(tracking_id: any){
  this.token = localStorage.getItem('customer_login_token');
  this.appService.getOrderDetails(this.token, tracking_id).subscribe({
    next: data => {
      this.resp = data;
if(this.resp == null || this.resp == '')  alert("Order Not Found!")
else this.viewOrderAction(tracking_id)
    },
  error: error => {
    alert("Order Not Found!")
       console.error('There was an error!', error)
  }

  })
}

viewOrderAction(data: any){
  this.router.navigateByUrl('/'+data+"/order_list");
}


getOrderCountAction(){
  this.token2 = localStorage.getItem('customer_login_token');
  this.appService.getOrderCount(this.token2).subscribe({
    next: data => {
      this.counter = data;
      this.counter=this.counter.result

      localStorage.setItem("pendingOrder", this.counter.pending)
      localStorage.setItem("processingOrder", this.counter.processing)
      localStorage.setItem("completedOrder", this.counter.completed)
      //this.getOrderCountAction()

      this.pending=this.counter.pending;
      this.completed=this.counter.completed;
      this.processing=this.counter.processing;

if(this.counter.pending >= 0){
  this.spinner.hide()
      this.loader=false
}

},
  error: error => {
if(error.error.message=="Access Denied!" && this.customer.email != null){
  //this.router.navigateByUrl('/add_company');
}
       console.error('There was an error!', error)
  }

  })

}

/////
 getCountsAction(x: any){
  this.token2 = localStorage.getItem('customer_login_token');
   this.appService.getOrderCount(this.token2).subscribe({
    next: data => {
      this.counter = data;
      this.counter=this.counter.result
      if(x == 0){
        alert (this.counter.pending);
              }
              if(x == 1){
                return this.counter.processing;
                      }
                      if(x == 2){
                        return this.counter.completed;
                              }
},
  error: error => {
    console.error('There was an error!', error)
    return 0;
  }

  })


}

/////////
pen: any;
 pendingOrders(){
try {
  this.pen = localStorage.getItem("pendingOrder");
if(this.pen !== null) return parseInt(this.pen)
else return 0;
} catch (error) {
  return 0
}

  }

  pro:any
  processingOrders(){
    try {
      this.pro = localStorage.getItem("processingOrder");
    if(this.pro !== null) return parseInt(this.pro)
    else return 0;
    } catch (error) {
      return 0
    }
    }

    com:any;
    completedOrders(){
      try {
        this.com = localStorage.getItem("completedOrder");
      if(this.com !== null) return parseInt(this.com)
      else return 0;
      } catch (error) {
        return 0
      }
      }

      formatOrderDate(data: any){
        return this.appService.format_date(data)
        }

        orders: any;
        getOrderListAction(num: any){
          this.token = localStorage.getItem('customer_login_token');
          this.appService.getOrderListNum(this.token, num).subscribe({
            next: data => {
              this.spinner.hide()
              this.loader=false

              this.orders = data;
              this.orders = this.orders.result

            },
          error: error => {
               console.error('There was an error!', error)
          }

          })
        }

        trucking_orders: any;
        getOrderListByTruckingAction(){
          this.token = localStorage.getItem('customer_login_token');
          this.appService.getOrderListByType(this.token, "Trucking").subscribe({
            next: data => {
              this.spinner.hide()
              this.loader=false

              this.trucking_orders = data;
              this.trucking_orders = this.trucking_orders.result

            },
          error: error => {
               console.error('There was an error!', error)
          }

          })
        }

        warehousing_orders: any;
        getOrderListByWarehousingAction(){
          this.token = localStorage.getItem('customer_login_token');
          this.appService.getOrderListByType(this.token, "Warehousing").subscribe({
            next: data => {
              this.spinner.hide()
              this.loader=false

              this.warehousing_orders = data;
              this.warehousing_orders = this.warehousing_orders.result

            },
          error: error => {
               console.error('There was an error!', error)
          }

          })
        }

date_:any
convertDateToInt(fullDate: any){
if(fullDate == null){
  fullDate = new Date();
}
  let date =this.datepipe.transform(fullDate, 'yyyy-MM-dd');
//alert("date: "+date +" == "+date?.substring(5, 7))
  const searchRegExp = /-/gi;
  const replaceWith = '';
  this.date_ = date?.replace(searchRegExp, replaceWith);
  const result = parseInt(this.date_);
//  alert("date: "+result +" == "+result.toString().substring(0, 6))
return result;
}

thisYear(){
var fullDate = new Date();
let date =this.datepipe.transform(fullDate, 'yyyy-MM-dd');
const searchRegExp = /-/gi;
const replaceWith = '';
this.date_ = date?.replace(searchRegExp, replaceWith);
const result = parseInt(this.date_);
return result.toString().substring(0, 4);
}

filterOrders: any;
filteredResult: any;

dataVal: any;
comp1 = 0;
pend1 = 0;
        proc1 = 0;
        comp2 = 0;
        pend2 = 0;
        proc2 = 0;
        comp3 = 0;
        pend3 = 0;
        proc3 = 0;
        comp4 = 0;
        pend4 = 0;
        proc4 = 0;
        comp5 = 0;
        pend5 = 0;
        proc5 = 0;
        comp6 = 0;
        pend6 = 0;
        proc6 = 0;
        barChartData_:any;
        respo:any;

        public form = {
          duration: "6"
        };

//filterOrderListAction(fromDate: any, toDate: any, duration: any){
  filterOrderListAction(duration: any){
    this.token = localStorage.getItem('customer_login_token');
          this.appService.getOrderList(this.token).subscribe({
            next: data => {
              this.spinner.hide()
              this.loader=false
              this.filteredResult = data;
              this.filteredResult = this.filteredResult.result


if(duration == '12'){
//Jul
var jul = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"07")

jul.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend1 += 1
}
if (item.status == 2) {
  this.proc1 += 1
}
if (item.status == 3) {
  this.comp1 += 1
}
});

//Aug
var aug = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"08")

aug.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend2 += 1
}
if (item.status == 2) {
  this.proc2 += 1
}
if (item.status == 3) {
  this.comp2 += 1
}
});

//Sep
var sep = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"09")

sep.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend3 += 1
}
if (item.status == 2) {
  this.proc3 += 1
}
if (item.status == 3) {
  this.comp3 += 1
}
});

//Oct
var oct = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"10")

oct.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend4 += 1
}
if (item.status == 2) {
  this.proc4 += 1
}
if (item.status == 3) {
  this.comp4 += 1
}
});

//Nov
var nov = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"11")

nov.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend5 += 1
}
if (item.status == 2) {
  this.proc5 += 1
}
if (item.status == 3) {
  this.comp5 += 1
}
});

//Dec
var dec = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"12")

dec.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend6 += 1
}
if (item.status == 2) {
  this.proc6 += 1
}
if (item.status == 3) {
  this.comp6 += 1
}
});

this.barChartData_ =
{
x: ['Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
y1:[this.comp1, this.comp2, this.comp3, this.comp4, this.comp5, this.comp6],
y2:[this.proc1, this.proc2, this.proc3, this.proc4, this.proc5, this.proc6],
y3:[this.pend1, this.pend2, this.pend3, this.pend4, this.pend5, this.pend6]
};

localStorage.setItem("barChartData", JSON.stringify(this.barChartData_))
this.respo = JSON.stringify(this.barChartData_);
}
else
{
//Jan
var jan = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"01")

jan.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend1 += 1
}
if (item.status == 2) {
  this.proc1 += 1
}
if (item.status == 3) {
  this.comp1 += 1
}
});

//Feb
var feb = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"02")

feb.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend2 += 1
}
if (item.status == 2) {
  this.proc2 += 1
}
if (item.status == 3) {
  this.comp2 += 1
}
});

//Mar
var mar = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"03")

mar.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend3 += 1
}
if (item.status == 2) {
  this.proc3 += 1
}
if (item.status == 3) {
  this.comp3 += 1
}
});

//Apr
var apr = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"04")

apr.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend4 += 1
}
if (item.status == 2) {
  this.proc4 += 1
}
if (item.status == 3) {
  this.comp4 += 1
}
});

//May
var may = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"05")
may.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend5 += 1
}
if (item.status == 2) {
  this.proc5 += 1
}
if (item.status == 3) {
  this.comp5 += 1
}
});

//Jun
var jun = this.filteredResult.filter((x: { date_added: any; }) =>
this.convertDateToInt(x.date_added).toString().substring(0, 6) == this.thisYear()+"06")

jun.forEach( (item: any) => {
  if (item.status < 2) {
    this.pend6 += 1
}
if (item.status == 2) {
  this.proc6 += 1
}
if (item.status == 3) {
  this.comp6 += 1
}
});

this.barChartData_ =
{
x: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
y1:[this.comp1, this.comp2, this.comp3, this.comp4, this.comp5, this.comp6],
y2:[this.proc1, this.proc2, this.proc3, this.proc4, this.proc5, this.proc6],
y3:[this.pend1, this.pend2, this.pend3, this.pend4, this.pend5, this.pend6]
};

localStorage.setItem("barChartData", JSON.stringify(this.barChartData_))
this.respo = JSON.stringify(this.barChartData_);
}
},
          error: error => {
               console.error('There was an error!', error)
          }

          })

        }

        barChartTitle(){
try {
  this.respo = localStorage.getItem("barChartData");
  this.respo = JSON.parse(this.respo);
            //alert(this.respo.y3)
                       return this.respo.x
} catch (error) {
return JSON.stringify(['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']);
}
                                }

        pendingOrdersBarVal(){
try {
  this.respo = localStorage.getItem("barChartData");
  this.respo = JSON.parse(this.respo);
                        return this.respo.y3
} catch (error) {
return []
}
                                }

        processingOrdersBarVal(){
          try {
            this.respo = localStorage.getItem("barChartData");
            this.respo = JSON.parse(this.respo);
                                  return this.respo.y2
          } catch (error) {
          return []
          }
                                }


        completedOrdersBarVal(){
          try {
            this.respo = localStorage.getItem("barChartData");
            this.respo = JSON.parse(this.respo);
                                  return this.respo.y1
          } catch (error) {
          return []
          }
                                }
                                public barChartOptions: ChartConfiguration['options'] = {
                                  responsive: true,
                                  maintainAspectRatio: false,
                                  // We use these empty structures as placeholders for dynamic theming.
                                  scales: {
                                    x: {},
                                    y: {
                                      min: 0
                                    }
                                  },
                                  plugins: {
                                    legend: {
                                      display: true,
                                    },
                                    datalabels: {
                                      anchor: 'end',
                                      align: 'end'
                                    }
                                  }
                                };
                                public barChartType: ChartType = 'bar';
                                public barChartPlugins = [
                                  DataLabelsPlugin
                                ];

                                public barChartData: ChartData<'bar'> = {
                                  labels: this.barChartTitle(),
                                  datasets: [
                                    { data: this.completedOrdersBarVal(), label: 'Completed' },
                                    { data: this.pendingOrdersBarVal(), label: 'Pending' },
                                    { data: this.processingOrdersBarVal(), label: 'Processing' },
                                  ]
                                };

                                // events
                                public chartClicked({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
                                  console.log(event, active);
                                }

                                public chartHovered({ event, active }: { event?: ChartEvent, active?: {}[] }): void {
                                  console.log(event, active);
                                }

/////////PIE/////////////
// Pie
public pieChartOptions: ChartConfiguration['options'] = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: true,
      position: 'top',
    },
    datalabels: {
    display: false,//removes text on chart
      formatter: (value, ctx) => {
        if (ctx.chart.data.labels) {
          return ctx.chart.data.labels[ctx.dataIndex];
        }
      },
    },
  }
};
public pieChartData: ChartData<'pie', number[], string | string[]> = {
  labels: [ 'Completed', 'Pending', 'Processing' ],
  datasets: [ {
    data: [ this.completedOrders(), this.pendingOrders(), this.processingOrders() ]
  } ]
};
public pieChartType: ChartType = 'pie';
public pieChartPlugins = [ DataLabelsPlugin ];

// events
public pieChartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}

public pieChartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
  console.log(event, active);
}
////////PIE/////////////


  pieChart: GoogleChartInterface = {

    chartType: GoogleChartType.PieChart,
    dataTable: [
      ['Order', 'Stat'],
      ['Completed', this.completedOrders()],
      ['Pending', this.pendingOrders()],
      ['Processing', this.processingOrders()]
    ],
    options: {
      'legend':'left',
      'title': ' ',
    'is3D':false,
    'width':0,
    'height':0 },

  };



}
