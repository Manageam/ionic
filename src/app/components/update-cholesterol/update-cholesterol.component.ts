import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import { GlobalService } from 'src/app/services/global/global.service';
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
  subs = [];
  constructor(
    public modalController: ModalController,
    private cholesterolService: CholesterolService,
    private platform: Platform,
    private global: GlobalService
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

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
      this.global.alert(
        'Update cholesterol',
        'Cholesterol sucessfully updated!',
        ['OK']
      );
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
