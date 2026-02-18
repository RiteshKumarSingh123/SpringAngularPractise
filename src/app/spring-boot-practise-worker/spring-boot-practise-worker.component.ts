
import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-spring-boot-practise-worker',
  templateUrl: './spring-boot-practise-worker.component.html',
  styleUrls: ['./spring-boot-practise-worker.component.css']
})
export class SpringBootPractiseWorkerComponent implements OnInit {

  public lowerBound: number = 1;
  public upperBound: number = 5;
  public perPage: number = 5;
  public totalRecords: number = 5;
  public workersList : any [] = [];
  public count!: number;
  public name: string | null = null;
  public workerHead : String | null = null;

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
     lowerBound : this.lowerBound,
     upperBound : this.upperBound
    }
    return this.service.getWorkersList(data.lowerBound,data.upperBound).subscribe(res=>{
    this.workersList = res.workersFilter;
    this.count = res.count;
    console.log(this.count);
    })
  }

  public perPageChange() {
    this.lowerBound = 1;
    this.upperBound = this.perPage;
    this.getWorkersList();
  }

  public nextPage() {
    this.lowerBound = this.lowerBound+1; 
    this.totalRecords = this.totalRecords + this.perPage;
    console.log(this.totalRecords+'this.totalRecords')
    this.getWorkersList();
  }

  public prevPage() {
    this.lowerBound = this.lowerBound-1; 
    if(this.lowerBound==1){
     this.totalRecords = 5;
    }
    this.getWorkersList();
  }

  public getCompany(){
    this.router.navigate(['/company']);
  }

  

}
