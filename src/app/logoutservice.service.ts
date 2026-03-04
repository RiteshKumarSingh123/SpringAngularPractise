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
  //   this.monitorTokenExpiry2(expirationTime);
  // }
  
  getTokenExpirationTime(token: string): number {
    const payload = token.split('.')[1]; 
    const decoded = JSON.parse(atob(payload)); 
    return decoded.exp * 1000; 
  }
  
  // monitorTokenExpiry(expirationTime: number): void {
  //   const timeBeforeExpiry = expirationTime - 30000; 
  //   const currentTime = Date.now();
  //   if (currentTime < timeBeforeExpiry) {
  //     setTimeout(() => {
  //       this.logoutData();
  //     }, timeBeforeExpiry - currentTime);
  //   }
  // }

  // monitorTokenExpiry(expirationTime: number): void {
  //   const timeBeforeExpiry = expirationTime - 60000;  
  //   const currentTime = Date.now();

  //   if (currentTime < timeBeforeExpiry) {
  //       setTimeout(() => {
           
  //           const userResponse = window.confirm("Your session is about to expire. Do you want to stay logged in?");

  //           if (userResponse) {
                
  //               this.refreshData();
  //           } else {
                
  //               this.logoutData();
  //           }
  //       }, timeBeforeExpiry - currentTime);
  //   }
  //   }

//   monitorTokenExpiry(expirationTime: number): void {
//     const timeBeforeExpiry = expirationTime - 90000;  
//     const currentTime = Date.now();

//     if (currentTime < timeBeforeExpiry) {
//         setTimeout(() => {
            
//             const userResponse = window.confirm("Your session is about to expire. Do you want to stay logged in?");
            
            
//             const autoLogoutTimer = setTimeout(() => {
//                 this.logoutData();
//             }, 60000); 

//             if (userResponse) {
//                 clearTimeout(autoLogoutTimer);  
//                 this.refreshData();
//             } else {
//                 clearTimeout(autoLogoutTimer);  
//                 this.logoutData();
//             }
//         }, timeBeforeExpiry - currentTime);
//     }
// }

monitorTokenExpiry(expirationTime: number): void {
    const timeBeforeExpiry = expirationTime - 90000;  
    const currentTime = Date.now();

    if (currentTime < timeBeforeExpiry) {
        setTimeout(() => {
            
            
            Swal.fire({
                title: 'Token Expiry Warning!',
                text: 'Your Token is about to expire. Do you want to stay logged in?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonText: 'Yes, keep me logged in!',
                cancelButtonText: 'Logout',
                timer: 60000, 
                timerProgressBar: true,
            }).then((result) => {
                if (result.isConfirmed) {
                    
                    this.refreshData();
                } else {
                    
                    this.logoutData();
                }
            });

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

  
    refreshData() {
    const oldToken = this.getToken(); 
    if(oldToken)
      this.service.refresh(oldToken).subscribe(
      (response) => {
        console.log('Token refreshed:', response.refreshedToken);
        this.saveToken(response.refreshedToken)
      },
      (error) => {
        console.error('Token refresh error:', error);
      }
    );
  }
  

}
