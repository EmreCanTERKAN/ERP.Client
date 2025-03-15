import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RecipeModel } from '../../models/recipe.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { ProductModel } from '../../models/product.model';
import { NgForm } from '@angular/forms';
import { SharedModule } from '../../modules/shared.module';
import { RecipePipe } from '../../pipes/recipe.pipe';
import { RecipeDetailModel } from '../../models/recipe-detail.model';

@Component({
  selector: 'app-recipes',
  imports: [SharedModule,RecipePipe],
  templateUrl: './recipes.component.html',
  styleUrl: './recipes.component.css'
})
export class RecipesComponent implements OnInit {
  recipes : RecipeModel[] = [];
  search : string = "";
  products : ProductModel[] = [];
  semiProducts : ProductModel[] = [];


  detail: RecipeDetailModel = new RecipeDetailModel();

  createModel : RecipeModel = new RecipeModel();
  updateModel : RecipeModel = new RecipeModel();

    @ViewChild("createModalCloseBtn") createModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;
    @ViewChild("updateModalCloseBtn") updateModalCloseBtn: ElementRef<HTMLButtonElement> | undefined;

    constructor(
      private http: HttpService,
      private swal: SwalService
      
    ){}
    ngOnInit(): void {
      this.getAll();
      this.getAllProducts();
    }

    getAll(){
      this.http.post<RecipeModel[]>("recipe/getAll",{}, (res) => {
        this.recipes = res
      })
    }

    getAllProducts(){
      this.http.post<ProductModel[]>("product/getAll",{}, (res) => {
        this.products = res;
        this.semiProducts = res.filter(p => p.type.value == 2);
      })
    }

    addDetail(){
      const product = this.products.find(p => p.id == this.detail.productId);
      if(product){
        this.detail.product = product;
      }
      this.createModel.details.push(this.detail);

      this.detail = new RecipeDetailModel();
    }

    removeDetail(index: number, form: NgForm) {
      this.createModel.details.splice(index, 1);
      form.form.markAsDirty(); // Formu değişmiş gibi işaretler
      form.form.updateValueAndValidity(); // Formun durumunu günceller
    }

    create(form : NgForm){
      if(form.valid){
        this.http.post<string>("recipe/create", this.createModel, (res) => {
          this.swal.callToast(res);
          this.createModel = new RecipeModel();
          this.createModalCloseBtn?.nativeElement.click();
          form.resetForm();
          this.getAll();
        });
      }
    }

    deleteById(model : RecipeModel){
      this.swal.callSwal("Reçeteyi Sil ?", `${model.product.name} ürüne ait reçeteyi silmek istiyor musunuz ?`, () => {
        this.http.post<string>("recipe/deleteById", {id : model.id}, (res) => {
          this.getAll();
          this.swal.callToast(res,"info");
        });
      })
    }

  

}

