import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero.interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit{
  // Guardamos los heroes en un array de la interfaz heroe
  // para despues inicializarlos con los datos del servicio,
  // que son los de nuestra base de datos
  heroes:Hero[]=[];
// Como los datos tienen la misma estructura, se convierten en objetos Heroe

  // Inyectamos el servicio
  constructor(private heroService: HeroService) { }
  // El ngOnInit
  ngOnInit(): void {
    // Nos suscibimos al servicio
    this.heroService.getHeroes().subscribe({
      // para el mensaje de error
      next: (data) => {
        // y guardamos los datos del servicio
        this.heroes = data;
      },
      // El mensaje de error
      error: (err) => {
        console.error('Error al obtener los héroes:', err);
      }
    })
  }
}
