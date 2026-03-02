import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SpringBootPractiseComponent } from './spring-boot-practise/spring-boot-practise.component';
import { SpringBootPractiseWorkerComponent } from './spring-boot-practise-worker/spring-boot-practise-worker.component';
import { SpringBootPractiseCustomerComponent } from './spring-boot-practise-customer/spring-boot-practise-customer.component';
import { LoginComponent } from './login/login.component';


export const appRoutes: Routes = [
  { path: '',         component: LoginComponent },  
  { path: 'login', component: LoginComponent },
  { path: 'worker',   component: SpringBootPractiseWorkerComponent },
  { path: 'customer', component: SpringBootPractiseCustomerComponent },
  { path: 'company',  component: SpringBootPractiseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],  
  exports: [RouterModule]
})
export class AppRoutingModule { }