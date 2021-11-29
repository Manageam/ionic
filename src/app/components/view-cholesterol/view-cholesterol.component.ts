import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { CholesterolService } from 'src/app/services/cholesterol/cholesterol.service';
import dateFormat from 'dateformat';
import { fetchBloodPressureTips } from 'src/assets/scripts/misc';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-view-cholesterol',
  templateUrl: './view-cholesterol.component.html',
  styleUrls: ['./view-cholesterol.component.scss'],
})
export class ViewCholesterolComponent implements OnInit {
  expand = null;
  allCholesterol = [];
  subs = [];
  constructor(
    public modalController: ModalController,
    private cholesterolService: CholesterolService,
    private global: GlobalService,
    private platform: Platform
  ) {}

  ngOnInit() {
    let sub = this.cholesterolService.get().subscribe((data) => {
      this.allCholesterol = data.map((d) => {
        d.date = dateFormat(new Date(d.created_at), 'dd mmm, yyyy-hh:MMtt');
        d.tip = fetchBloodPressureTips(d.unit, d.reading);
        return d;
      });
    });

    this.subs.push(sub);

    sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }
  share() {}
  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  async remove(id) {
    const { role } = <{ role }>await this.global.alert(
      'Remove Cholesterol reading.',
      'Are you sure you want to remove cholesterol reading?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );

    if (!role) return;

    this.cholesterolService.remove(id).subscribe((data) => {
      this.allCholesterol = this.allCholesterol.filter((d) => d != id);
      this.cholesterolService.update();
    });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
