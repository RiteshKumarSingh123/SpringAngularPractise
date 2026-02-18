import { Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { RouterModule} from '@angular/router';
import { SpringBootPractiseComponent } from './spring-boot-practise/spring-boot-practise.component';
import { SpringBootPractiseWorkerComponent } from './spring-boot-practise-worker/spring-boot-practise-worker.component';
import { SpringBootPractiseCustomerComponent } from './spring-boot-practise-customer/spring-boot-practise-customer.component';


export const appRoutes: Routes = [
  { path: '',         component: SpringBootPractiseComponent },  
  { path: 'worker',   component: SpringBootPractiseWorkerComponent },
  { path: 'customer', component: SpringBootPractiseCustomerComponent },
  { path: 'company',  component: SpringBootPractiseComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],  // Add your routes here
  exports: [RouterModule]
})
export class AppRoutingModule { }