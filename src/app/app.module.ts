import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { SpringBootPractiseComponent } from './spring-boot-practise/spring-boot-practise.component';
import { FormsModule } from '@angular/forms';
import { SpringBootPractiseWorkerComponent } from './spring-boot-practise-worker/spring-boot-practise-worker.component';
import { AppRoutingModule } from './app.route';
import { SpringBootPractiseCustomerComponent } from './spring-boot-practise-customer/spring-boot-practise-customer.component';


@NgModule({
  declarations: [
    AppComponent,
    SpringBootPractiseComponent,
    SpringBootPractiseWorkerComponent,
    SpringBootPractiseCustomerComponent,
  ],
  imports: [
    BrowserModule,HttpClientModule,FormsModule,AppRoutingModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
