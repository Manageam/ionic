import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ActionSheetController,
  LoadingController,
  ModalController,
  Platform,
} from '@ionic/angular';
import {} from 'googlemaps';
import { GlobalService } from 'src/app/services/global/global.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})
export class LocationsComponent implements OnInit {
  locations = [];
  @ViewChild('map') mapElement: any;
  map: google.maps.Map;
  location = '';
  subs = [];
  constructor(
    private actionSheetController: ActionSheetController,
    public modalController: ModalController,
    private global: GlobalService,
    private loadingController: LoadingController,
    private platform: Platform
  ) {}

  ngOnInit() {
    this.fetchLocations();
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  async requestLocation() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select the location you want',
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
    this.location = '';
    this.location = await this.requestLocation();
    if (!navigator.geolocation) {
      this.global.alert(
        'Location finder',
        'Unable to get health locations at the moment. Make sure you enable location services for manageAm app',
        ['Okay']
      );
      return;
    }

    this.loadLocation();
  }

  async loadLocation() {
    const viz = this;
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Please wait...',
      duration: 2000000,
    });
    await loading.present();

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        let pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        let customStyled = [
          {
            featureType: 'poi',
            elementType: 'labels',
            stylers: [{ visibility: 'off' }],
          },
        ];

        const map = new google.maps.Map(this.mapElement.nativeElement, {
          center: pos,
          zoom: 15,
        });

        map.set('styles', customStyled);
        let request = {
          location: pos,
          radius: 5000,
          fields: ['name', 'geometry', 'formatted_address'],
          types: [this.location],
        };

        let service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, function (results, status) {
          viz.locations = results;
          loading.dismiss();
        });
      },
      (error) => {
        loading.dismiss();
        this.global.alert(
          'Location finder',
          'Unable to get health locations at the moment. Make sure you enable location services for manageAm app',
          ['Okay']
        );
      },
      { timeout: 20000, enableHighAccuracy: true, maximumAge: 75000 }
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
