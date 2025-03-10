import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: [
  ]
})
export class HeroPageComponent implements OnInit{
// El heroe para los datos de la pagina
  public hero?:Hero;

constructor(
  private heroService:HeroService,
  private activatedRoute:ActivatedRoute,
  private router:Router
){ }

ngOnInit():void{
  // Esto lo que va a hacer es que coge el parametro de la url, que es la id
  this.activatedRoute.params
  .pipe( // Dependiendo de la pagina, el id que vamos a coger es uno u otro
    switchMap(({ id })=> this.heroService.getHeroById(id) ) // Sacamos el heroe
  ).subscribe( hero => // Y nos suscribimos al servicio
  {
    // Si el heroe no existe, vamos a volver a la lista
    if (!hero) return this.router.navigate([ 'heroes' ]);

    // Como ya hemos obtenido el heroe
    this.hero = hero;
    console.log(hero);

    return;
  }
  )

 }

}
