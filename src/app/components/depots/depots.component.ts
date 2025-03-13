import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { DepotModel } from '../../models/depot.model';
import { HttpService } from '../../services/http.service';
import { SwalService } from '../../services/swal.service';
import { NgForm } from '@angular/forms';
import { DepoPipe } from "../../pipes/depo.pipe";

@Component({
  selector: 'app-depots',
  imports: [SharedModule, DepoPipe],
  templateUrl: './depots.component.html',
  styleUrl: './depots.component.css'
})
export class DepotsComponent implements OnInit {
  depots : DepotModel[] = [];
  search : string = "";

  createModel : DepotModel = new DepotModel();
  updateModel : DepotModel = new DepotModel();

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
      this.http.post<DepotModel[]>("depot/getAll",{}, (res) => {
        this.depots = res
      })
    }

    create(form : NgForm){
      if(form.valid){
        this.http.post<string>("depot/create", this.createModel, (res) => {
          this.swal.callToast(res);
          this.createModel = new DepotModel();
          this.createModalCloseBtn?.nativeElement.click();
          form.resetForm();
          this.getAll();
        });
      }
    }

    deleteById(model : DepotModel){
      this.swal.callSwal("Depoyu Sil ?", `${model.name} deposunu silmek istiyor musunuz ?`, () => {
        this.http.post<string>("depot/deleteById", {id : model.id}, (res) => {
          this.getAll();
          this.swal.callToast(res,"info");
        });
      })
    }

    update(form : NgForm) {
      if(form.valid){
        this.http.post<string>("depot/update", this.updateModel,(res)=> {
          this.swal.callToast(res,"info");
          this.updateModalCloseBtn?.nativeElement.click();
          form.resetForm();
          this.getAll();
        });
      }
    }

    get(model:DepotModel){
      this.updateModel = JSON.parse(JSON.stringify(model));
    }


}
