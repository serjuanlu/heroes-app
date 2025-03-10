import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { HeroService } from '../../services/hero.service';
import { Hero } from '../../interfaces/hero.interface';
import { Observable, of } from 'rxjs';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';


@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
})
export class SearchPageComponent {
  // El input observable
  public myControl = new FormControl('');
  public heroes: Hero[] = []; // Los heroes de la api
  public selectedHero?:Hero; // El heroe seleccionado en la busqueda

  // El constructor
  constructor(private heroService: HeroService) {}

  // Metodo para buscar heroes a partir del input de busqueda
  public buscarHeroe(){
    const value:string=this.myControl.value || '';
    // Usamos el valor del buscador para obtener
    this.heroService.getSuggestions(value).subscribe(
      heroes => this.heroes = heroes
    );
  }

  public onSelectedOption(event:MatAutocompleteSelectedEvent){
    // Si no hay un valor para el heroe buscado
    if(!event.option.value){
      this.selectedHero=undefined;
      return;
    }
    // Si el heroe esta definido, llegamos aqui,
    // donde creamos la constante del heroe como un objeto heroe
    const hero:Hero = event.option.value;
    // E igualamos el control al nombre de superheroe
    this.myControl.setValue(hero.superhero);
    // Y el heroe seleccionado al objeto heroe correspondiente
    this.selectedHero=hero;
    console.log({event})
  }


  // ngOnInit(): void {
  //   // Obtenemos la lista de héroes desde el servicio
  //   this.heroService.getHeroes().subscribe(heroes => {
  //     this.heroes = heroes;
  //   });

  //   // Escuchamos los cambios en el input y filtramos
  //   this.myControl.valueChanges.subscribe(value => {
  //     this.buscarHeroes(value ?? ''); // Si `value` es null, usa ''
  //   });
  // }

  // buscarHeroes(term: string): void {
  //   if (!term.trim()) {
  //     this.options$ = of([]); // Si el input está vacío, limpiamos la lista
  //     return;
  //   }

  //   // Filtramos los héroes en el frontend (sin modificar el servicio)
  //   const heroesFiltrados = this.heroes.filter(hero =>
  //     hero.superhero.toLowerCase().includes(term.toLowerCase())
  //   );
  //   // Y ahora los convertimos en un observable
  //   this.options$ = of(heroesFiltrados);
  // }

  // alSeleccionar(nombreHeroe: string):void {
  //   this.options$.subscribe(heroes => {
  //     const hero = heroes.find(heroI => heroI.superhero === nombreHeroe);
  //     if (hero) {
  //       this.router.navigate(['/heroes', hero.id]); // Redirigir al héroe seleccionado
  //     }
  //   });
  // }
}
