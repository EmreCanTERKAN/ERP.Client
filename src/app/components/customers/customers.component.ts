import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { CustomerModel } from '../../models/customer.model';
import { HttpService } from '../../services/http.service';
import { CustomerPipe } from '../../pipes/customer.pipe';
import { NgForm } from '@angular/forms';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-customer',
  imports: [SharedModule , CustomerPipe],
  templateUrl: './customers.component.html',
  styleUrl: './customers.component.css'
})
export class CustomerComponent implements OnInit {
  customers : CustomerModel[] = [];
  search : string = "";
  createModel: CustomerModel = new CustomerModel();
  updateModel: CustomerModel = new CustomerModel();

  @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;


  constructor(
    private http: HttpService,
    private swal: SwalService

  ){}
  ngOnInit(): void {
    this.getAll();
  }

  getAll(){
    this.http.post<CustomerModel[]>("customer/getAll",{}, (res) =>{
      this.customers = res
    })
  }

  create(form : NgForm) {
    if(form.valid){
      this.http.post<string>("customer/create",this.createModel,(res) => {
        this.swal.callToast(res);
        this.createModel = new CustomerModel();
        this.createModalCloseBtn?.nativeElement.click();
        form.resetForm();
        this.getAll();
      });
    }
  }

  deleteById(model : CustomerModel){
    this.swal.callSwal("Müşteri Sil?", `${model.fullName} müşterisini silmek istiyor musunuz ?`,() => {
      this.http.post<string>("customer/deleteById",{id: model.id},(res) => {
        this.getAll();
        this.swal.callToast(res,"info");
      });
    })

  }

    
  }

