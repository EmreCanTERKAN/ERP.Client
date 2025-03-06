import { Component } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { SharedModule } from '../../modules/shared.module';
import { HttpService } from '../../services/http.service';
import { LoginResponseModel } from '../../models/login.response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginModel = new LoginModel();
  constructor(
    private http: HttpService,
    private router: Router
  ){

  }
  signIn(){
    this.http.post<LoginResponseModel>("auth/login",this.model,(res) => {
      localStorage.setItem("token", res.accessToken);
      this.router.navigateByUrl("/");
      
    })
  }
}
