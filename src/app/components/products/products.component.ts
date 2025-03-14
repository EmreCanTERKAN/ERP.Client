import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ProductModel, productTypes } from '../../models/product.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { ProductPipe } from "../../pipes/product.pipe";
import { SharedModule } from '../../modules/shared.module';

@Component({
  selector: 'app-products',
  imports: [SharedModule,ProductPipe],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent implements OnInit {
  products : ProductModel[] = [];
  search : string = "";
  types = productTypes;

  createModel : ProductModel = new ProductModel();
  updateModel : ProductModel = new ProductModel();

    @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
    @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

    constructor(
      private http: HttpService,
      private swal: SwalService
      
    ){}
    ngOnInit(): void {
      this.getAll();
    }

    getAll(){
      this.http.post<ProductModel[]>("product/getAll",{}, (res) => {
        this.products = res
      })
    }

    create(form : NgForm){
      if(form.valid){
        this.http.post<string>("product/create", this.createModel, (res) => {
          this.swal.callToast(res);
          this.createModel = new ProductModel();
          this.createModalCloseBtn?.nativeElement.click();
          form.resetForm();
          this.getAll();
        });
      }
    }

    deleteById(model : ProductModel){
      this.swal.callSwal("Ürünü Sil ?", `${model.name} ürününü silmek istiyor musunuz ?`, () => {
        this.http.post<string>("product/deleteById", {id : model.id}, (res) => {
          this.getAll();
          this.swal.callToast(res,"info");
        });
      })
    }

    update(form : NgForm) {
      if(form.valid){
        this.http.post<string>("product/update", this.updateModel,(res)=> {
          this.swal.callToast(res,"info");
          this.updateModalCloseBtn?.nativeElement.click();
          form.resetForm();
          this.getAll();
        });
      }
    }

    get(model:ProductModel){
      this.updateModel = JSON.parse(JSON.stringify(model));
      this.updateModel.typeValue = model.type.value;
    }


}

