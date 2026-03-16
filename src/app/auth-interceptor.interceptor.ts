import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpringBootPractiseServiceService } from './spring-boot-practise-service.service';
import { LogoutserviceService } from './logoutservice.service';
import { jwtDecode as jwt_decode } from 'jwt-decode';  

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private service:SpringBootPractiseServiceService,private logoutserviceService:LogoutserviceService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

     let token = this.logoutserviceService.getToken() || this.logoutserviceService.getrefreshToken();
    // let token = this.logoutserviceService.getToken() ;

    if (token) {
       
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(clonedRequest);
    }

    return next.handle(req);
  }

  
}
