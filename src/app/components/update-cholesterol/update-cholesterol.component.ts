import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import { fetchCholesterolTips } from 'src/assets/scripts/misc';

@Component({
  selector: 'app-update-cholesterol',
  templateUrl: './update-cholesterol.component.html',
  styleUrls: ['./update-cholesterol.component.scss'],
})
export class UpdateCholesterolComponent implements OnInit {
  cholesterol = {
    unit: '',
    reading: '',
  };
  tip = '';
  constructor(
    public modalController: ModalController,
    private cholesterolService: CholesterolService
  ) {}

  ngOnInit() {}

  updateTip() {
    if (this.cholesterol.unit == '' || this.cholesterol.reading == '') {
      this.tip = '';
      return;
    }

    this.tip = fetchCholesterolTips(
      this.cholesterol.unit,
      this.cholesterol.reading
    );
  }
  save() {
    this.cholesterolService.add(this.cholesterol).subscribe(() => {
      this.cholesterolService.update();
      this.modalController.dismiss();
    });
  }
}
