import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';
import { LogoutserviceService } from '../logoutservice.service';

@Component({
  selector: 'app-spring-boot-practise',
  templateUrl: './spring-boot-practise.component.html',
  styleUrls: ['./spring-boot-practise.component.css']
})
export class SpringBootPractiseComponent implements OnInit {


   listOfComapanyDetails: any []=[];
   company : any = {};
   count : any;
   perPage: number = 5;
   companyId!: number;
   totalRecords : number = 5;
   page: number = 1;
   size: number = 5;
   companyName!: string | null;
   companyAddress!: string | null;
   companyTotalMembers!: string | null;
   ownerName!: string | null;
   companyProducts!: string | null;
   workingHours!: string | null;
   status!: string | null;
   flag!: boolean;

  

  constructor(private service:SpringBootPractiseServiceService,
    private router:Router, private logoutserviceService:LogoutserviceService) { }

  ngOnInit(): void {
   this.listOfCompanyDetails();
  }

  public listOfCompanyDetails(){
    let data ={
    page : this.page,
    size : this.size
    }
  return this.service.getCompanyDetailsList(data.page,data.size).subscribe(res=>{
  this.listOfComapanyDetails = res.companyFilter;
  this.count = res.count;
  console.log(this.count);
  console.log(this.page);
  console.log(this.size);
  console.log(this.perPage+'perPage');
  })
  }

 public submitCompanyData(){
   if (!this.companyName) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyName cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.companyAddress) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyAddress cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.companyTotalMembers) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyTotalMembers cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.ownerName) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'ownerName cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.companyProducts) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyProducts cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.workingHours) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'workingHours cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
    let data ={
    companyName : this.companyName,
    companyAddress : this.companyAddress,
    companyTotalMembers : this.companyTotalMembers,
    ownerName : this.ownerName,
    companyProducts : this.companyProducts,
    workingHours : this.workingHours
    }
   return this.service.saveCompany(data).subscribe(res=>{
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

    console.log('saved sucessfully');
    this.listOfCompanyDetails();
    this.companyName = '';
    this.companyAddress = '';
    this.companyTotalMembers = '';
    this.ownerName = '';
    this.companyProducts = '';
    this.workingHours = '';
    })
  }

 public deleteCompanyData(id:number){
    let data = {
    companyId : id
    }
   return this.service.deleteCompanyById(id).subscribe(res=>{
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
    this.status = res.status;
    console.log(this.status);
    this.listOfCompanyDetails();
    })

  }

 public getCompanyDataById(id:number){
  let data ={
  companyId : id
  }
 return this.service.getCompanyById(id).subscribe(res=>{
  this.company = res;
  this.companyId = this.company.companyId;
  this.companyName = this.company.companyName;
  this.companyAddress = this.company.companyAddress;
  this.companyTotalMembers = this.company.companyTotalMembers;
  this.ownerName = this.company.ownerName;
  this.companyProducts = this.company.companyProducts;
  this.workingHours = this.company.workingHours;
  })
  }

 public updateCompanyData(){
  if (!this.companyName) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyName cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.companyAddress) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyAddress cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.companyTotalMembers) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyTotalMembers cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.ownerName) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'ownerName cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.companyProducts) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'companyProducts cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
  if (!this.workingHours) {
    Swal.fire({
      icon: 'error',
      title: 'Validation Error',
      text: 'workingHours cannot be empty',
      showConfirmButton: true,
    });
    return; 
  }
    let data ={
    companyId : this.companyId,
    companyName : this.companyName,
    companyAddress : this.companyAddress,
    companyTotalMembers : this.companyTotalMembers,
    ownerName : this.ownerName,
    companyProducts : this.companyProducts,
    workingHours : this.workingHours 
    }
   return this.service.updateCompany(data).subscribe(res=>{
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
    this.status = res.status;
    console.log(this.status);
    this.listOfCompanyDetails();
    this.companyName = '';
    this.companyAddress = '';
    this.companyTotalMembers = '';
    this.ownerName = '';
    this.companyProducts = '';
    this.workingHours = '';
    })

  }

  public perPageChange() {
    this.page = 1;
    this.size = this.perPage;
    this.listOfCompanyDetails();
  }

  public nextPage() {
    this.page = this.page+1; 
    this.totalRecords = this.totalRecords + this.perPage;
    console.log(this.totalRecords+'this.totalRecords')
    this.listOfCompanyDetails();
  }

  public prevPage() {
    this.page = this.page-1; 
    if(this.page==1){
     this.totalRecords = 5;
    }
    this.listOfCompanyDetails();
  }

  public getCustomerHead(){
  this.router.navigate(['customer'],{queryParams:{customerHead:'Head -> Subasis Dey'}});
  }

  public getWorkerHead(){
  this.router.navigate(['worker'],{queryParams:{workerHead:'Head -> Rajni Das'}});
  }

  public logoutDatas(){
  this.logoutserviceService.logoutData();
  }

  
}
