import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';
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
  public companyId!: number;
  public companyName!: String | null;
  public companyAddress!: String | null;
  public companyTotalMembers!: String | null;
  public ownerName!: String | null;
  public companyProducts!: String | null;
  public workingHours!: String | null;
  public status!: String | null;
  public flag!: boolean;
  

  constructor(private service:SpringBootPractiseServiceService) { }

  ngOnInit(): void {
   this.listOfCompanyDetails();
  }

  public listOfCompanyDetails(){
  this.service.getCompanyDetailsList().subscribe(res=>{
  this.listOfComapanyDetails = res.companyFilter;
  this.count = res.count;
  console.log(this.listOfComapanyDetails+this.count);
  })
  }

  submitCompanyData(){
    let data ={
    companyName : this.companyName,
    companyAddress : this.companyAddress,
    companyTotalMembers : this.companyTotalMembers,
    ownerName : this.ownerName,
    companyProducts : this.companyProducts,
    workingHours : this.workingHours
    }
    this.service.saveCompany(data).subscribe(res=>{
      Swal.fire({
      title: "Do you want to save the Data?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Save",
      denyButtonText: "Don't save"
      }).then((result) => {
      if (result.isConfirmed) {
      Swal.fire("Saved!", "", "success");
      } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
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

  deleteCompanyData(id:number){
    let data = {
    companyId : id
    }
    this.service.deleteCompanyById(id).subscribe(res=>{
      Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
      title: "Deleted!",
      text: "Your file has been deleted.",
      icon: "success"
      });
     }
     });
    this.status = res.status;
    console.log(this.status);
    this.listOfCompanyDetails();
    })

  }

  getCompanyDataById(id:number){
  let data ={
  companyId : id
  }
  this.service.getCompanyById(id).subscribe(res=>{
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

  updateCompanyData(){
    let data ={
    companyId : this.companyId,
    companyName : this.companyName,
    companyAddress : this.companyAddress,
    companyTotalMembers : this.companyTotalMembers,
    ownerName : this.ownerName,
    companyProducts : this.companyProducts,
    workingHours : this.workingHours 
    }
    this.service.updateCompany(data).subscribe(res=>{
      Swal.fire({
  title: "Do you want to update the Data?",
  showDenyButton: true,
  showCancelButton: true,
  confirmButtonText: "Update",
  denyButtonText: `Don't Update`
  }).then((result) => {
  if (result.isConfirmed) {
    Swal.fire("Updated!", "", "success");
  } else if (result.isDenied) {
    Swal.fire("Changes are not Updated", "", "info");
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

}
