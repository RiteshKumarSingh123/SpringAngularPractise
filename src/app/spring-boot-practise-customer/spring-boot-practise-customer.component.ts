import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';

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

  constructor(private service:SpringBootPractiseServiceService) { }

  ngOnInit(): void {
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

}
