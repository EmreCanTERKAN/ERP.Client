import { Pipe, PipeTransform } from '@angular/core';
import { CustomerModel } from '../models/customer.model';

@Pipe({
  name: 'customer'
})
export class CustomerPipe implements PipeTransform {

  transform(value: CustomerModel[], search:string): CustomerModel[] {
    if(!search){
      return value;
    }

    return value.filter(p => 
      p.fullName.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.taxDepartment.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.taxNumber.toString().includes(search.toLocaleLowerCase()) ||
      p.address.fullAddress.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.address.city.toLocaleLowerCase().includes(search.toLocaleLowerCase()) ||
      p.address.town.toLocaleLowerCase().includes(search.toLocaleLowerCase())     
    )
  }

}
