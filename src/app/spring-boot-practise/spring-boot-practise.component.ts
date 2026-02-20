import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spring-boot-practise',
  templateUrl: './spring-boot-practise.component.html',
  styleUrls: ['./spring-boot-practise.component.css']
})
export class SpringBootPractiseComponent implements OnInit {

  public listOfComapanyDetails: any []=[];
  public company : any = {};
  public count : any;
  public perPage: number = 5;
  public companyId!: number;
  public totalRecords : number = 5;
  public lowerBound: number = 1;
  public upperBound: number = 5;
  public companyName!: String | null;
  public companyAddress!: String | null;
  public companyTotalMembers!: String | null;
  public ownerName!: String | null;
  public companyProducts!: String | null;
  public workingHours!: String | null;
  public status!: String | null;
  public flag!: boolean;
  

  constructor(private service:SpringBootPractiseServiceService,
    private router:Router) { }

  ngOnInit(): void {
   this.listOfCompanyDetails();
  }

  public listOfCompanyDetails(){
    let data ={
    lowerBound : this.lowerBound,
    upperBound : this.upperBound
    }
  return this.service.getCompanyDetailsList(data.lowerBound,data.upperBound).subscribe(res=>{
  this.listOfComapanyDetails = res.companyFilter;
  this.count = res.count;
  console.log(this.count);
  console.log(this.lowerBound);
  console.log(this.upperBound);
  console.log(this.perPage+'perPage');
  })
  }

 public submitCompanyData(){
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
    this.lowerBound = 1;
    this.upperBound = this.perPage;
    this.listOfCompanyDetails();
  }

  public nextPage() {
    this.lowerBound = this.lowerBound+1; 
    this.totalRecords = this.totalRecords + this.perPage;
    console.log(this.totalRecords+'this.totalRecords')
    this.listOfCompanyDetails();
  }

  public prevPage() {
    this.lowerBound = this.lowerBound-1; 
    if(this.lowerBound==1){
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

  
}
