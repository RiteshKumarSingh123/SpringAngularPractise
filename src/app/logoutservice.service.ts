import { Injectable } from '@angular/core';
import { SpringBootPractiseServiceService } from './spring-boot-practise-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class LogoutserviceService {

  public tokenKey = 'authToken';

  public refreshTokenKey = 'authToken';

  constructor(private service:SpringBootPractiseServiceService, private router:Router) { }


  saveToken(token: string): void {
    sessionStorage.setItem(this.tokenKey, token);
    const expirationTime = this.getTokenExpirationTime(token); 
    sessionStorage.setItem('tokenExpiry', expirationTime.toString());
    this.monitorTokenExpiry(expirationTime);
  }

  // refreshSaveToken(token: string): void {
  //   sessionStorage.setItem(this.refreshTokenKey, token);
  //   const expirationTime = this.getTokenExpirationTime(token); 
  //   sessionStorage.setItem('tokenExpiry', expirationTime.toString());
  //   this.monitorTokenExpiry(expirationTime);
  // }
  
  getTokenExpirationTime(token: string): number {
    const payload = token.split('.')[1]; 
    const decoded = JSON.parse(atob(payload)); 
    return decoded.exp * 1000; 
  }
  
  monitorTokenExpiry(expirationTime: number): void {
    const timeBeforeExpiry = expirationTime - 30000; 
    const currentTime = Date.now();
    if (currentTime < timeBeforeExpiry) {
      setTimeout(() => {
        this.logoutData();
      }, timeBeforeExpiry - currentTime);
    }
  }
  
  getToken(): string | null {
    return sessionStorage.getItem(this.tokenKey);
  }

  
  // getrefreshToken(): string | null {
  //   return sessionStorage.getItem(this.refreshTokenKey);
  // }

  
  isAuthenticated(): boolean {
    const accessToken = this.getToken();
    // const refreshToken = this.getrefreshToken();
    // return !!accessToken || !!refreshToken;
    return !!accessToken;
  }

  logoutData(){
  return this.service.logout().subscribe(res=>{
      Swal.fire({
                   icon: 'success',
                   title: 'Success',
                   text: 'Logged out Successfully',
                   showConfirmButton: false,
                   timer: 2000,
                   customClass: {
                     popup: 'small-swal'
                   }
                 });
      console.log("called");
      sessionStorage.removeItem(this.tokenKey);
      // sessionStorage.removeItem(this.refreshTokenKey);           
      this.router.navigate(['/']);
    })
    }


}
