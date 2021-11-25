import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { MedicationsService } from 'src/app/services/medications/medications.service';

import dateFormat from 'dateformat';

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
    private medicationService: MedicationsService
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
  share() {
    console.log('share shit');
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
