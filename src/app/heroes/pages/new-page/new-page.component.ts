import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroService } from '../../services/hero.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{
// El formulario
  public heroForm = new FormGroup({
    id:new FormControl<string>(''),
    superhero:new FormControl<string>('',{nonNullable:true}),
    publisher:new FormControl<Publisher>(Publisher.DCComics,),
    alter_ego:new FormControl<string>('',{nonNullable:true}),
    first_appearance:new FormControl<string>(''),
    characters:new FormControl<string>('',{nonNullable:true}),
    alt_img:new FormControl<string>('')
  });


// Guardamos los publishers aqui
  public publishers =[
    {id:'DC Comics', desc: 'DC - Comics'},
    {id:'Marvel Comics', desc: 'Marvel - Comics'},
    {id:'Image Comics', desc: 'Image - Comics'}
  ]

  // Inyectamos el servicio
  constructor(
    private heroService:HeroService,
    private router: Router,
    private route: ActivatedRoute,
    private snackbar:MatSnackBar,
    private dialog:MatDialog
  ){

  }
  //
  ngOnInit(): void {
    // Si incluye edit, estamos en modo edicion
    if(!this.router.url.includes('edit'))
      return;
    // Recuperamos la id
    this.route.params.subscribe(params=>{
      const heroId = params['id']; // Obtener ID desde la URL dinámica
      this.heroService.getHeroById(heroId).subscribe(hero => {
        if (!hero) {
          this.router.navigate(['/heroes/list']); // Si no existe,
          // redirigir a la lista, es decir, al inicio de la app
          return;
        }

        // Resetear el formulario con los datos del héroe
        this.heroForm.reset(hero);

        console.log('Formulario actualizado:', this.heroForm.value); // Verificar en consola
      });

    });
    }

  // Metodo para obtener un heroe a partir del formulario
  get currentHero():Hero{
    const hero = this.heroForm.value as Hero;
    return hero;
  }


  // Metodo para cuando hagamos submit
  onSubmit():void{
    if (this.heroForm.invalid)
      return;

    // Comprobamos si tiene id o no
    if(this.currentHero.id){
      this.heroService.updateHero(this.currentHero)
      .subscribe(hero=>{
        this.showSnackbar(`${hero.superhero} updated!`)
      });
      return;
    }

    this.heroService.addHero(this.currentHero)
    .subscribe(hero=>{
      // TO DO: Mostrar snackbar y navegar a heroes/edit/hero.id
      this.showSnackbar(`${hero.superhero} created!`)
    })
    //  this.heroService.updateHero(this.heroForm.value)
  }
// Metodo para el deleteHero
  public onDeleteHero(){
    if(!this.currentHero.id)
      throw Error('Hero id is required');

    const dialogRef=this.dialog.open(ConfirmDialogComponent,{
      data:this.heroForm.value,
    });

    dialogRef.afterClosed()
      .subscribe( result => {
        console.log('The dialog was closed');
         if (result) {
      // Respuesta de eliminacion definida en el service
      this.heroService.deleteHeroById(this.currentHero.id).subscribe((response) => {
        // Si da true, es que se ha eliminado, por lo que podemos volver y mostrar la confirmacion
        if(response){
          this.showSnackbar(`El heroe ${this.currentHero.superhero} se ha eliminado`)
          this.router.navigate(['/heroes/list']);
          // En cualquier otro caso, el heroe no se ha eliminado
        }else{
          this.showSnackbar(`El heroe ${this.currentHero.superhero} no se ha eliminado`)
        }
      });
    }else{
      this.showSnackbar(`El heroe ${this.currentHero.superhero} no se ha eliminado`)
    }
  });


  }
  // Metodo Snackbar
  private showSnackbar(message:string):void{
    this.snackbar.open(message, 'ok',{
      duration:2500
    })
  }

}
