import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-add-medication',
  templateUrl: './add-medication.component.html',
  styleUrls: ['./add-medication.component.scss'],
})
export class AddMedicationComponent implements OnInit {
  medication = { type: 'prescribed', name: '' };
  constructor(
    public modalController: ModalController,
    private global: GlobalService
  ) {}

  ngOnInit() {}
  save() {
    if (!this.medication.name)
      return this.global.alert('New medication', 'Medication is required', [
        'OK',
      ]);
  }
}
