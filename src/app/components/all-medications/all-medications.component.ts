import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { MedicationsService } from 'src/app/services/medications/medications.service';

import dateFormat from 'dateformat';
import { CalendarModalComponent } from '../calendar-modal/calendar-modal.component';
import { ShareEmailComponent } from '../share-email/share-email.component';
import { HealthService } from 'src/app/services/health/health.service';

@Component({
  selector: 'app-all-medications',
  templateUrl: './all-medications.component.html',
  styleUrls: ['./all-medications.component.scss'],
})
export class AllMedicationsComponent implements OnInit {
  expand = null;
  allMedication = [];
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private medicationService: MedicationsService,
    private healthService: HealthService
  ) {}

  ngOnInit() {
    this.medicationService.get().subscribe((data) => {
      this.allMedication = data.map((datum) => {
        datum.date = dateFormat(
          new Date(datum.created_at),
          'dd mmm, yyyy-hh:MMtt'
        );
        return datum;
      });
    });
  }

  async share() {
    this.modalController.dismiss();
    const modal = await this.modalController.create({
      component: CalendarModalComponent,
      cssClass: 'modal-80',
    });

    modal.onDidDismiss().then(async ({ data }) => {
      if (!data) return;
      const modal = await this.modalController.create({
        component: ShareEmailComponent,
        cssClass: 'modal-50',
      });
      const date = data;
      modal.onDidDismiss().then(({ data }) => {
        if (!data) return;
        this.healthService
          .share({ email: data, ...date, type: 'medications' })
          .subscribe((data: string) => {
            return this.global.alert('Share record', data, [
              { role: true, text: 'OK' },
            ]);
          });
      });
      await modal.present();
    });

    await modal.present();
  }

  toggle(i) {
    if (i == this.expand) {
      this.expand = null;
    } else {
      this.expand = i;
    }
  }
  async remove(id) {
    const { role } = <{ role }>await this.global.alert(
      'Remove Medication',
      'Are you sure you want to remove medication?',
      [
        { role: false, text: 'Cancel' },
        { role: true, text: 'OK' },
      ]
    );

    if (!role) return;

    this.medicationService.remove(id).subscribe(() => {
      this.medicationService.update();
      this.allMedication = this.allMedication.filter((med) => (med.id! = id));
    });
  }
}
