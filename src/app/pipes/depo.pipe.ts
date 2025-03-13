import { Pipe, PipeTransform } from '@angular/core';
import { DepotModel } from '../models/depot.model';

@Pipe({
  name: 'depo'
})
export class DepoPipe implements PipeTransform {

  transform(value: DepotModel[], search: string): DepotModel[] {
    if(!search){
      return value;
    }
    return value.filter(p => {
      p.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.address.fullAddress.toLocaleLowerCase().includes(search.toLocaleLowerCase())||
      p.address.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.address.town.toLocaleLowerCase().includes(search.toLocaleLowerCase())
    })
  }

}
