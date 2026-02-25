
import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-spring-boot-practise-worker',
  templateUrl: './spring-boot-practise-worker.component.html',
  styleUrls: ['./spring-boot-practise-worker.component.css']
})
export class SpringBootPractiseWorkerComponent implements OnInit {

 page: number = 1;
 size: number = 5;
 perPage: number = 5;
 totalRecords: number = 5;
 workersList : any [] = [];
 count!: number;
 workerId!: number;
 name: string | null = null;
 workerHead : string | null = null;
 workerName!: string;
 address!: string;
 underWhichCompany!: string;
 workerPosition!: string;
  

  constructor(private service:SpringBootPractiseServiceService,
              private route:ActivatedRoute,
              private router:Router) { }

  ngOnInit(): void {
    this.name = this.route.snapshot.paramMap.get('name');
    this.route.queryParams.subscribe(res=>{
    this.workerHead = res['workerHead'];
    })
    this.getWorkersList();
  }

  public getWorkersList(){
    let data ={
     page : this.page,
     size : this.size
    }
    return this.service.getWorkersList(data.page,data.size).subscribe(res=>{
    this.workersList = res.workersFilter;
    this.count = res.count;
    console.log(this.count);
    })
  }

   workerForm = new FormGroup({
   workerName : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
   address    : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
   underWhichCompany : new FormControl('', [ Validators.required]),
   workerPosition : new FormControl('', [ Validators.required])
   })


  public onSubmit(){
    let data = this.workerForm.value;
    return this.service.saveWorkers(data).subscribe(res=>{
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
    this.getWorkersList();
    this.workerForm.reset();
    })
  }


   updateWorkerForm = new FormGroup({
   workerId : new FormControl('',) ,
   workerName : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
   address    : new FormControl('', [ Validators.required,Validators.minLength(5), ]),
   underWhichCompany : new FormControl('', [ Validators.required]),
   workerPosition : new FormControl('', [ Validators.required]),
   date: new FormControl('', [ Validators.required,Validators.pattern(/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})(\.\d{6})?$/)])
   })

  public onUpdate(){
   let data = this.updateWorkerForm.value;
   return this.service.updateWorkers(data).subscribe(res=>{
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
   console.log(res.status);
   this.getWorkersList();
   this.updateWorkerForm.reset();
   })
   }


  public getWorkersById(id:number){
    let data = {
    workerId : id
    }
    return this.service.getWorkersById(id).subscribe(res=>{
    this.updateWorkerForm.setValue({
       workerId : res.workerId,
       workerName : res.workerName,
       address : res.address,
       underWhichCompany : res.underWhichCompany,
       workerPosition : res.workerPosition,
       date : res.date
      });
    });
  }

  public deleteWorkerById(id:number){
    let data ={
    workerId : id  
    }
   return this.service.deleteWorkerById(id).subscribe(res=>{
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
    console.log(res.status);
    this.getWorkersList();
    }); 
  }


  public perPageChange() {
    this.page = 1;
    this.size = this.perPage;
    this.getWorkersList();
  }

  public nextPage() {
    this.page = this.page+1; 
    this.totalRecords = this.totalRecords + this.perPage;
    console.log(this.totalRecords+'this.totalRecords')
    this.getWorkersList();
  }

  public prevPage() {
    this.page = this.page-1; 
    if(this.page==1){
     this.totalRecords = 5;
    }
    this.getWorkersList();
  }

  public getCompany(){
    this.router.navigate(['/company']);
  }

  

}
