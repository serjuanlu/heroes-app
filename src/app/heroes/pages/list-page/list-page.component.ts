import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero.interface';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
})
export class ListPageComponent implements OnInit{
  heroes:Hero[]=[];
  constructor(private heroService: HeroService) {}

  ngOnInit(): void {
    this.heroService.getHeroes().subscribe({
      next: (data) => {
        this.heroes = data;
      },
      error: (err) => {
        console.error('Error al obtener los héroes:', err);
      }
    })
  }

}
