import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SpringBootPractiseServiceService {


  constructor(private http:HttpClient) { }

  // public getCompanyDetailsList(company:any):Observable<any> {
  //   return this.http.get<any>(`http://192.168.10.186:8585/company/getCompanyDetailsList?` + company);
  // }

  public getCompanyDetailsList(page: number,size:number): Observable<any> {
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/getCompanyDetailsList?page=${page}&size=${size}`);
  }

  public saveCompany(company:any):Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8085/MyBusinessPro/company/saveCompany`,company);
  }

  public deleteCompanyById(companyId:number){
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/deleteCompanyById?`,{params});
  }

  public getCompanyById(companyId:number){
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/getCompanyById?`,{params});
  }

  public updateCompany(company:any):Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8085/MyBusinessPro/company/updateCompany`,company);
  }

  public getWorkersList(page:number,size:number): Observable<any> {
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/getWorkersList?page=${page}&size=${size}`);
  }

  public saveWorkers(worker:any) : Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8085/MyBusinessPro/company/saveWorkers`,worker);
  }

  public getWorkersById(workerId:number){
    const params = new HttpParams().set('workerId', workerId.toString());
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/getWorkersById?`,{params});
  }

  public deleteWorkerById(workerId:number){
    const params = new HttpParams().set('workerId', workerId.toString());
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/deleteWorkerById?`,{params});
  }

  public updateWorkers(worker:any) : Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8085/MyBusinessPro/company/updateWorkers`,worker);
  }

  public getCustomersList(page:number,size:number): Observable<any> {
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/getCustomersList?page=${page}&size=${size}`);
  }

  public saveCustomers(customer:any) : Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8085/MyBusinessPro/company/saveCustomers`,customer);
  }

  public getCustomerById(customerId:number) : Observable<any> {
    const params = new HttpParams().set('customerId', customerId.toString());
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/getCustomerById?`,{params});
  }

  public deleteCustomerById(customerId:number) : Observable<any> {
    const params = new HttpParams().set('customerId', customerId.toString());
    return this.http.get<any>(`http://192.168.10.186:8085/MyBusinessPro/company/deleteCustomerById?`,{params});
  }

  public updateCustomers(customer:any) : Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8085/MyBusinessPro/company/updateCustomers`,customer);
  }

  public login(loginData:any) : Observable<any> {
    return this.http.post<any>(`http://localhost:8085/MyBusinessPro/bussiness/login`,loginData);
  }

  public logout() : Observable<any> {
    return this.http.post<any>(`http://localhost:8085/MyBusinessPro/bussiness/logout`,{});
  }

   

}
