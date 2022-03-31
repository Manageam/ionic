import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AddMedicationComponent } from 'src/app/modals/add-medication/add-medication.component';
import { AllMedicationsComponent } from 'src/app/modals/all-medications/all-medications.component';
import { MedicationsService } from 'src/app/services/medications/medications.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
@Component({
  selector: 'app-health',
  templateUrl: './health.page.html',
  styleUrls: ['./health.page.scss'],
})
export class HealthPage implements OnInit {
  medication: any = null;
  allMedications = [];
  subs = [];
  constructor(
    private modalController: ModalController,
    private medicationService: MedicationsService,
    private webSocketService: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.medicationService.get().subscribe((data) => {
      this.allMedications = data;
      this.medication = data[0];
    });

    this.subs.push(sub);

    sub = this.webSocketService
      .listen('medications:update')
      .subscribe(({ user_id }: { user_id }) => {
        if (this.auth.loggedUser().id != user_id) return;
        this.medicationService.update();
      });
    this.subs.push(sub);
  }

  async addMedication(e = null) {
    e?.stopPropagation();
    const modal = await this.modalController.create({
      component: AddMedicationComponent,
      cssClass: 'modal-80',
    });
    modal.present();
  }

  async showMedication() {
    const modal = await this.modalController.create({
      component: AllMedicationsComponent,
      componentProps: {
        medications: this.allMedications,
      },
    });
    modal.present();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
