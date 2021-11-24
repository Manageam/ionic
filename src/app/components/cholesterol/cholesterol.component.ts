import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import { UpdateCholesterolComponent } from '../update-cholesterol/update-cholesterol.component';
import { ViewCholesterolComponent } from '../view-cholesterol/view-cholesterol.component';

@Component({
  selector: 'app-cholesterol',
  templateUrl: './cholesterol.component.html',
  styleUrls: ['./cholesterol.component.scss'],
})
export class CholesterolComponent implements OnInit {
  color = 'gray';
  cholesterol: any = null;
  subs = [];
  constructor(
    private modalController: ModalController,
    private cholesterolService: CholesterolService
  ) {}

  ngOnInit() {
    let sub = this.cholesterolService.get().subscribe((data) => {
      this.cholesterol = data.slice(-1)[0];
      this.color = this.changeColor(
        this.cholesterol.unit,
        this.cholesterol.reading
      );
    });

    this.subs.push(sub);
  }

  changeColor(unit, value) {
    if (String(unit).toLowerCase() === 'mmol/l') {
      switch (true) {
        case value === 0:
          return '#fff';
        case value < 5.2:
          return 'green';
        case value >= 5.2 && value < 6.3:
          return 'orange';
        case value >= 6.3:
          return 'red';
        default:
          return '#fff';
      }
    }

    switch (true) {
      case value === '0':
        return '#fff';
      case value < 200:
        return 'green';
      case value >= 200 && value < 240:
        return 'orange';
      case value >= 240:
        return 'red';
      default:
        return '#fff';
    }
  }

  async view() {
    const modal = await this.modalController.create({
      component: ViewCholesterolComponent,
    });
    modal.present();
  }

  async record(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: UpdateCholesterolComponent,
      cssClass: 'modal-50',
    });
    await modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
