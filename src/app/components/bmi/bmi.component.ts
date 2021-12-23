import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { BmiService } from 'src/app/services/bmi/bmi.service';
import { UpdateBmiComponent } from '../update-bmi/update-bmi.component';
import { ViewBmiComponent } from '../view-bmi/view-bmi.component';

@Component({
  selector: 'app-bmi',
  templateUrl: './bmi.component.html',
  styleUrls: ['./bmi.component.scss'],
})
export class BmiComponent implements OnInit {
  subs = [];
  bmi: any = null;
  color = 'gray';
  constructor(
    private modalController: ModalController,
    private bmiService: BmiService
  ) {}

  ngOnInit() {
    const sub = this.bmiService.get().subscribe((data) => {
      this.bmi = data.slice(-1)[0];
      this.color = this.updateColor(this.bmi?.mass);
    });
    this.subs.push(sub);
  }

  updateColor(value) {
    switch (true) {
      case value === 0 || value === '0':
        return '#fff';
      case value < 18.5:
        return '#0784c3';
      case value >= 18.5 && value <= 24.9:
        return 'green';
      case value >= 25 && value < 30:
        return 'rgb(255, 236, 0)';
      case value >= 30:
        return 'red';
      default:
        return '#fff';
    }
  }
  async view() {
    const modal = await this.modalController.create({
      component: ViewBmiComponent,
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateBmiComponent,
      cssClass: 'modal-80',
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
