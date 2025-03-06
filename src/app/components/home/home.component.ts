import { Component } from '@angular/core';
import { SharedModule } from '../../modules/shared.module';
import { SwalService } from '../../services/swal.service';

@Component({
  selector: 'app-home',
  imports: [SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(
    private swal: SwalService
  ){
    this.swal.callSwal("Kaydı sil","Kaydı silmek istiyor musunuz ?", () => {
      alert("Silme işlemi başarılı");
    })
  }
}
