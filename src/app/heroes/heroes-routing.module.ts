import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { HeroPageComponent } from './pages/hero-page/hero-page.component';

const routes: Routes=[
  {
    // Localhost:4200/auth/
    path:'',
    component:LayoutPageComponent,
    children:[
      {path:'new-hero', component:NewPageComponent},
      {path:'search', component:SearchPageComponent},
      {path:'edit/:id', component:NewPageComponent},
      {path:'list', component:ListPageComponent},
      // Esta tiene que ir la ultima (sin contar el comodin)
      {path:':id', component:HeroPageComponent},
      {path:'**', redirectTo:'list'},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class HeroesRoutingModule { }
