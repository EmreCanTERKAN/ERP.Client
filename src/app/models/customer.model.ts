import { AddressModel } from "./address.model";

export class CustomerModel {
    id: string = "";
    firstName: string = "";
    lastName: string = "";
    fullName: string = "";
    taxDepartment: string = "";
    taxNumber: string = "";
    address: AddressModel = new AddressModel();
}