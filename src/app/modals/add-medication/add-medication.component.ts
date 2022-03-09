import { Component, OnInit } from '@angular/core';
import { ModalController, Platform } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { MedicationsService } from 'src/app/services/medications/medications.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
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
  subs = [];
  constructor(
    public modalController: ModalController,
    private global: GlobalService,
    private medicationService: MedicationsService,
    private platform: Platform,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    this.allMedication = this.medicationService.all();
    const sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  search() {
    this.med = null;
    if (this.medication.name.length < 3) {
      this.searched = [];
      return;
    }

    const regx = new RegExp(this.medication.name, 'i');
    this.searched = this.allMedication
      .filter((med) => regx.test(med.name))
      .slice(0, 6);
  }

  save() {
    if (!this.medication.name)
      return this.global.alert('New medication', 'Medication is required', [
        'OK',
      ]);

    let id = Math.floor(Math.random() * 1000000 + 1);
    const data: any = { id, medication_name: this.medication.name };
    if (this.med) data.medication_id = this.med.id;
    this.medicationService.add(data).subscribe(() => {
      this.webSocket.emit('medications:update', {
        user_id: this.auth.loggedUser().id,
      });
      this.modalController.dismiss();
    });
  }

  scrollIntoView(el: Element) {
    el.scrollIntoView();
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
