import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SpringBootPractiseComponent } from './spring-boot-practise/spring-boot-practise.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SpringBootPractiseWorkerComponent } from './spring-boot-practise-worker/spring-boot-practise-worker.component';
import { AppRoutingModule } from './app.route';
import { SpringBootPractiseCustomerComponent } from './spring-boot-practise-customer/spring-boot-practise-customer.component';
import { LoginComponent } from './login/login.component';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';


@NgModule({
  declarations: [
    AppComponent,
    SpringBootPractiseComponent,
    SpringBootPractiseWorkerComponent,
    SpringBootPractiseCustomerComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,AppRoutingModule,ReactiveFormsModule
  ],
  providers: [{
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorInterceptor, 
      multi: true                
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
