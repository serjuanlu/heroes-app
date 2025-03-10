import { Component } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { User } from '../../../auth/interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: [
  ]
})
export class LayoutPageComponent {
  public sidebarItems=[
    {label:'Listado', icon:'label', url:'./list'},
    {label:'Añadido', icon:'add', url:'./new-hero'},
    {label:'Buscar', icon:'search', url:'./search'}
  ]
   constructor(private authService:AuthService,
    private router:Router
    ){}
    onClick():void{
      this.authService.currentUser
    }

    onLogout():void{
      this.authService.logout();
      this.router.navigate(['/auth'])
    }

    get user():User|undefined{
      return this.authService.currentUser;
    }

}
