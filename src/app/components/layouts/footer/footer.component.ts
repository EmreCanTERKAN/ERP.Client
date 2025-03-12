import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent implements OnInit, OnDestroy {
  currentTime: string = '';
  private intervalId: any;

  ngOnInit(): void {
    this.updateTime(); // İlk değeri ayarla
    this.intervalId = setInterval(() => {
      this.updateTime();
    }, 1000); // Her saniye güncelle
  }

  updateTime() {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('tr-TR'); // Saat formatı: 20:44:01
  }

  ngOnDestroy(): void {
    clearInterval(this.intervalId); // Bileşen yok olursa intervali temizle
  }
}
