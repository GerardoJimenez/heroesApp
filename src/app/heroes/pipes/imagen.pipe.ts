import { Pipe, PipeTransform } from '@angular/core';
import { Heroe } from '../interfaces/heroes.interface';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(value: Heroe): string {
    const path = 'assets/heroes/' + value.id + '.jpg';
    return path;
    // O
    // return `assets/heroes/${value.id}.jpg`;
  }

}
