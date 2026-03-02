import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { SpringBootPractiseServiceService } from './spring-boot-practise-service.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor(private service:SpringBootPractiseServiceService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    

    let token = this.service.getToken() || this.service.getrefreshToken();

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
