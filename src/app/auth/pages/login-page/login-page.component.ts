import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {


  // Inyectamos el servicio
  constructor(private authService:AuthService,
    private router: Router
  ){}
  onLogin(){
    this.authService.login('prueba@mail.com','123456')
    .subscribe( user=> {
      this.router.navigate(['/'])
      console.log({user});
    }

    )
  }
}
