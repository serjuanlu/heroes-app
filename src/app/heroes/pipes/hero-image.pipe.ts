import { Pipe, PipeTransform } from '@angular/core';
import { Hero } from '../interfaces/hero.interface';

@Pipe({
  name: 'heroImage'
})
export class HeroImagePipe implements PipeTransform {

  transform(hero: Hero): string {
    console.log('Hero:', hero); // Verificar datos del héroe en consola

    if(hero.alt_img){
      console.log('Imagen externa detectada:', hero.alt_img);
      return hero.alt_img;
    }
    if(!hero.id&&!hero.alt_img){
      console.log('Usando imagen por defecto');
      return 'assets/no-image.png'
    }
    // Devolvemos la imagen
    console.log('Imagen local usada:', `assets/heroes/${hero.id}.jpg`);
    return `assets/heroes/${hero.id}.jpg`;
  }

}
