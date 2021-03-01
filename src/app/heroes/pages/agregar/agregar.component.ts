import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';

import { Heroe, Publisher } from '../../interfaces/heroes.interface';
import { HeroesService } from '../../services/heroes.service';
import { ConfirmarComponent } from '../../components/confirmar/confirmar.component';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  styles: [
    `
    img {
      width: 100%;
      border-radius: 5px;
    }
    `
  ]
})
export class AgregarComponent implements OnInit {

  heroe: Heroe ={
    alter_ego: '',
    characters: '',
    first_appearance: '',
    superhero: '',
    publisher: Publisher.DCComics,
    alt_img: ''
  }
  publishers = [
    {
      id: 'DC Comics',
      desc: 'DC - Comics'
    },
    {
      id: 'Marvel Comics',
      desc: 'Marvel - Comics'
    },
  ]
  constructor(private heroesService: HeroesService,
      private activatedRoute: ActivatedRoute,
      private router: Router,
      private snackBar: MatSnackBar,
      private dialog: MatDialog) { }

  ngOnInit(): void {
    if( !this.router.url.includes('editar')) {
      return;
    }

    this.activatedRoute.params
    .pipe(
      switchMap( ({id}) => this.heroesService.getHeroe( id ) )
    )
    .subscribe( heroe => this.heroe = heroe );
  }
  guardarHeroe() {
    // Que el nombre no esté vacío
    if ( this.heroe.superhero.trim().length === 0) {
      return;
    }
    // actualizar o guardar
    if(this.heroe.id){
      // Actualizar registro
      this.heroesService.actualizarHeroe(this.heroe)
      .subscribe( heroe => this.mostrarSnackbar('Héroe actualizado') );
    } else {
      // Crear registro
      this.heroesService.agregarHeroe(this.heroe)
        .subscribe( heroe => {
          this.router.navigate(['/heroes/editar', heroe.id]);
          this.mostrarSnackbar('Héroe creado');
        });
    }  
  }

  borrarHeroe(){
    const dialog = this.dialog.open(ConfirmarComponent, {
      width: '300px',
      // Envía una copia para que no sea modificado el objeto original
      data: {...this.heroe}
    });

    dialog.afterClosed().subscribe(
      (result) =>{
        if (result) {
          this.heroesService.eliminarHeroe(this.heroe.id!).subscribe( resp => {
             this.router.navigate(['/heroes/listado']);
             this.mostrarSnackbar('Heroe eliminado');
          });
        }
      }
    );

  }

  mostrarSnackbar( mensaje: string){
    this.snackBar.open(mensaje, 'Cerrar', {
      duration: 2500
    });
  }
}

