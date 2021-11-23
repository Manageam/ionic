import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddMedicationComponent } from 'src/app/components/add-medication/add-medication.component';
import { AllMedicationsComponent } from 'src/app/components/all-medications/all-medications.component';
import { MedicationsService } from 'src/app/services/medications/medications.service';

@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})
export class HealthPage implements OnInit {
  medication: any = null;
  constructor(
    private modalController: ModalController,
    private medicationService: MedicationsService
  ) {}

  ngOnInit() {
    this.medication = this.medicationService.myMedications()[0];
  }
  async addMedication() {
    const modal = await this.modalController.create({
      component: AddMedicationComponent,
      cssClass: 'modal-40',
    });
    modal.present();
  }
  async showMedication() {
    const modal = await this.modalController.create({
      component: AllMedicationsComponent,
    });
    modal.present();
  }
}
