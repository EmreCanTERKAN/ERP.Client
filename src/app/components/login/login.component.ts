import { Component } from '@angular/core';
import { LoginModel } from '../../models/login.model';
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-login',
  imports: [SharedModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  model: LoginModel = new LoginModel();
  signIn(){
    
  }
}
