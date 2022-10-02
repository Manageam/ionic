import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, LoadingController, ModalController, Platform} from '@ionic/angular';
import {} from 'googlemaps';
import {GlobalService} from 'src/app/services/global/global.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss'],
})

export class LocationsComponent implements OnInit {
  locations = [];
  currentLocation: any = {};
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
  ) {
  }

  async ngOnInit() {
    await this.fetchLocations();
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
    navigator.geolocation.getCurrentPosition((d) => {
      this.currentLocation = d.coords;
    });
  }


  distance(lat1, lon1, lat2, lon2) {
    const R = 6371e3; // metres
    const l1 = (lat1 * Math.PI) / 180; // l, t in radians
    const l2 = (lat2 * Math.PI) / 180;
    const dl = ((lat2 - lat1) * Math.PI) / 180;
    const dt = ((lon2 - lon1) * Math.PI) / 180;

    const a =
      Math.sin(dl / 2) * Math.sin(dl / 2) +
      Math.cos(l1) * Math.cos(l2) * Math.sin(dt / 2) * Math.sin(dt / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

    const d = R * c;
    return d;
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

    const {role} = await actionSheet.onDidDismiss();
    return role;
  }

  async fetchLocations() {
    this.location = '';
    this.location = await this.requestLocation();
    if (this.location === 'backdrop') return this.modalController.dismiss();

    if (!navigator.geolocation) {
      await this.global.alert(
        'Location finder',
        'Unable to get health locations at the moment. Make sure you enable location services for manageAm app',
        ['Okay']
      );
      return;
    }

    await this.loadLocation();
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
            stylers: [{visibility: 'off'}],
          },
        ];

        const map = new google.maps.Map(this.mapElement.nativeElement, {
          center: pos,
          zoom: 15,
        });


        map.set('styles', customStyled);
        let request = {
          location: pos,
          rankBy: google.maps.places.RankBy.DISTANCE,
          fields: ['name', 'geometry', 'formatted_address'],
          types: [this.location],
        };

        let service = new google.maps.places.PlacesService(map);

        service.nearbySearch(request, function (results, status) {
          viz.locations = results;
          viz.locations = viz.locations.sort((a, b) => {
            const da = viz.distance(
              a.geometry.location.lat(),
              a.geometry.location.lng(),
              viz.currentLocation.latitude,
              viz.currentLocation.longitude
            );

            const db = viz.distance(
              b.geometry.location.lat(),
              b.geometry.location.lng(),
              viz.currentLocation.latitude,
              viz.currentLocation.longitude
            );

            if (da > db) {
              return 1;
            } else {
              return -1;
            }
          });

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
      {timeout: 20000, enableHighAccuracy: true, maximumAge: 75000}
    );
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
