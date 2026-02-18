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
    return this.http.get<any>(`http://192.168.10.186:8585/company/getCompanyDetailsList?page=${page}&size=${size}`);
  }

  public saveCompany(company:any):Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8585/company/saveCompany`,company);
  }

  public deleteCompanyById(companyId:number){
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<any>(`http://192.168.10.186:8585/company/deleteCompanyById?`,{params});
  }

  public getCompanyById(companyId:number){
    const params = new HttpParams().set('companyId', companyId.toString());
    return this.http.get<any>(`http://192.168.10.186:8585/company/getCompanyById?`,{params});
  }

  public updateCompany(company:any):Observable<any> {
    return this.http.post<any>(`http://192.168.10.186:8585/company/updateCompany`,company);
  }

  public getWorkersList(page:number,size:number): Observable<any> {
    return this.http.get<any>(`http://192.168.10.186:8585/company/getWorkersList?page=${page}&size=${size}`)
  }

  public getCustomersList(page:number,size:number): Observable<any> {
    return this.http.get<any>(`http://192.168.10.186:8585/company/getCustomersList?page=${page}&size=${size}`);
  }

}
