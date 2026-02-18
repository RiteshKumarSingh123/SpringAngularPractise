
import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';

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

  constructor(private service:SpringBootPractiseServiceService) { }

  ngOnInit(): void {
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

  

}
