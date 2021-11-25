import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';
import { MedicationsService } from 'src/app/services/medications/medications.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss'],
})
export class AddMedicationComponent implements OnInit {
  medication = { type: 'prescribed', name: '' };
  allMedication = [];
  searched = [];
  med: any = null;
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private medicationService: MedicationsService
  ) {}

  ngOnInit() {
    this.allMedication = this.medicationService.all();
  }

  search() {
    this.med = null;
    if (this.medication.name.length < 3) {
      this.searched = [];
      return;
    }

    const regx = new RegExp(this.medication.name, 'i');
    this.searched = this.allMedication.filter((med) => regx.test(med.name));
  }

  save() {
    if (!this.medication.name)
      return this.global.alert('New medication', 'Medication is required', [
        'OK',
      ]);

    let id = Math.floor(Math.random() * 1000000 + 1);
    const data: any = { medication_name: this.medication.name, id };
    if (this.med) data.medication_id = this.med.id;
    this.medicationService.add(data).subscribe(() => {
      this.medicationService.update();
      this.modalController.dismiss();
    });
  }
}
