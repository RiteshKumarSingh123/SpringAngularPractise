import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spring-boot-practise-customer',
  templateUrl: './spring-boot-practise-customer.component.html',
  styleUrls: ['./spring-boot-practise-customer.component.css']
})
export class SpringBootPractiseCustomerComponent implements OnInit {

  public lowerBound: number = 1;
  public upperBound: number = 5;
  public count!: number;
  public customerList : any [] = [];
  public perPage: number = 5;
  public totalRecords: number = 5;
  public name:String | null = null;
  public customerHead:String | null = null;
  public customerName!: String;
  public customerAdress!: String;
  public customerAge!: String;


  constructor(private service:SpringBootPractiseServiceService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.route.queryParams.subscribe(res=>{
      this.customerHead = res['customerHead'];
    })
    this.getCustomerList();
  }

  public getCustomerList(){
    let data={
    lowerBound: this.lowerBound,
    upperBound: this.upperBound
    }
    return this.service.getCustomersList(data.lowerBound,data.upperBound).subscribe(res=>{
    this.customerList = res.customersFilter;
    this.count = res.count;
    console.log(this.count);
    })
  }

  customerForm = new FormGroup({
     customerName : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
     customerAdress    : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
     customerAge : new FormControl('', [ Validators.required,Validators.min(18),Validators.max(100), ])
     })

   public onSubmit(){
   let data = this.customerForm.value;
   return this.service.saveCustomers(data).subscribe(res=>{
    Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data Saved Successfully',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                  popup: 'small-swal'
                }
              });
   console.log("data saved sucessfully");
   this.customerForm.reset();
   this.getCustomerList();
   })
   }
  


  public perPageChange() {
    this.lowerBound = 1;
    this.upperBound = this.perPage;
    this.getCustomerList();
  }

  public nextPage() {
    this.lowerBound = this.lowerBound+1; 
    this.totalRecords = this.totalRecords + this.perPage;
    console.log(this.totalRecords+'this.totalRecords')
    this.getCustomerList();
  }

  public prevPage() {
    this.lowerBound = this.lowerBound-1; 
    if(this.lowerBound==1){
     this.totalRecords = 5;
    }
    this.getCustomerList();
  }

  public getCompany(){
    this.router.navigate(['/company']);
  }

}
