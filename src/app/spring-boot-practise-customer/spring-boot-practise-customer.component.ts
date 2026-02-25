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


 page: number = 1;
 size: number = 5;
 count!: number;
 customerList : any [] = [];
 perPage: number = 5;
 totalRecords: number = 5;
 name:string | null = null;
 customerHead:string | null = null;
 customerName!: string;
 customerAdress!: string;
 customerAge!: string;
 customerId!: number;
 isEditMode: boolean = false;


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
    page: this.page,
    size: this.size
    }
    return this.service.getCustomersList(data.page,data.size).subscribe(res=>{
    this.customerList = res.customersFilter;
    this.count = res.count;
    console.log(this.count);
    })
  }

  customerForm = new FormGroup({
     customerId : new FormControl('',),
     customerName : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
     customerAdress    : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
     customerAge : new FormControl('', [ Validators.required,Validators.min(18),Validators.max(100), ])
     });

   onSubmit() {
    if (this.isEditMode) {
      this.updatedCustomerSubmit();
    } else {
      this.saveCustomerSubmit();
    }
  }  

   public saveCustomerSubmit(){
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

   public updatedCustomerSubmit(){
   let data = this.customerForm.value;
   return this.service.updateCustomers(data).subscribe(res=>{
     Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data Updated Successfully',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                  popup: 'small-swal'
                }
              }); 
    this.getCustomerList();
    this.customerForm.reset();
    console.log(res.status);
    })
   }
  
  public editCustomerById(id:number){
    let data ={
    customerId : id
    }
  return this.service.getCustomerById(id).subscribe(res=>{
    this.customerForm.setValue({
      customerId : res.customerId,
      customerName : res.customerName,
      customerAdress : res.customerAdress,
      customerAge : res.customerAge
    });
    this.isEditMode = true;
    })
  }

  public getDeleteCustomerById(id:number){
    let data ={
     customerId:id
    }
  return this.service.deleteCustomerById(id).subscribe(res=>{
  Swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data Deleted Successfully',
                showConfirmButton: false,
                timer: 2000,
                customClass: {
                  popup: 'small-swal'
                }
              });
  this.getCustomerList();
  console.log(res.status);
    })
  }

  public perPageChange() {
    this.page = 1;
    this.size = this.perPage;
    this.getCustomerList();
  }

  public nextPage() {
    this.page = this.page+1; 
    this.totalRecords = this.totalRecords + this.perPage;
    console.log(this.totalRecords+'this.totalRecords')
    this.getCustomerList();
  }

  public prevPage() {
    this.page = this.page-1; 
    if(this.page==1){
     this.totalRecords = 5;
    }
    this.getCustomerList();
  }

  public getCompany(){
    this.router.navigate(['/company']);
  }

}
