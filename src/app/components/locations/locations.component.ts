import { Component, OnInit } from '@angular/core';
import { ActionSheetController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  constructor(
    private actionSheetController: ActionSheetController,
    public modalController: ModalController
  ) {}

  ngOnInit() {
    this.fetchLocations();
  }

  async requestLocation() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Selection Location',
      cssClass: 'image-action-sheet',
      buttons: [
        {
          text: 'Hospital',
          role: 'hospital',
          icon: 'medkit-outline',
        },
        {
          text: 'Pharmacy',
          role: 'pharmacy',
          icon: 'eyedrop',
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    return role == 'backdrop' ? 'hospital' : role;
  }

  async fetchLocations() {
    const location = await this.requestLocation();
    console.log(location);
    // fetch locations
  }
}
