import { Component, OnInit } from '@angular/core';
import { SpringBootPractiseServiceService } from '../spring-boot-practise-service.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private service:SpringBootPractiseServiceService, private router:Router) { }

  name!: string;
  password!: string;

  ngOnInit(): void {
  }

 public onLogin(){
    let data ={
    name :this.name,
    password :this.password
    }
    return this.service.login(data).subscribe(res=>{
    Swal.fire({
                      icon: 'success',
                      title: 'Success',
                      text: 'Logged In Successfully',
                      showConfirmButton: false,
                      timer: 2000,
                      customClass: {
                        popup: 'small-swal'
                      }
                    });
    this.service.saveToken(res.accessToken);
    this.service.refreshSaveToken(res.refreshToken);
    this.router.navigate(['company']);
    
    },
  
    error => {   
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Username or Password is incorrect',
        confirmButtonColor: '#d33'
      });
    }

  )
  }

}
