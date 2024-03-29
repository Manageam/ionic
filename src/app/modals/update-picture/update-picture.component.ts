import { Component, Input, OnInit } from '@angular/core';
import {
  ActionSheetController,
  ModalController,
  Platform,
} from '@ionic/angular';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { UserService } from 'src/app/services/user/user.service';
import { GlobalService } from 'src/app/services/global/global.service';
import { WebsocketService } from 'src/app/services/websocket/websocket.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-update-picture',
  templateUrl: './update-picture.component.html',
  styleUrls: ['./update-picture.component.scss'],
})
export class UpdatePictureComponent implements OnInit {
  image: any;
  @Input() photo: any;
  subs = [];
  constructor(
    public modalController: ModalController,
    private actionSheetController: ActionSheetController,
    private userService: UserService,
    private platform: Platform,
    private global: GlobalService,
    private webSocket: WebsocketService,
    private auth: AuthenticationService
  ) {}

  ngOnInit() {
    let sub = this.platform.backButton.subscribe(() => {
      this.modalController.dismiss();
    });
    this.subs.push(sub);
  }

  save() {
    // do th api thingy here
    const image = this.DataURIToBlob(this.image);
    const data = new FormData();
    data.append('photo', image);
    this.userService.updatePhoto(data).subscribe((data) => {
      this.userService.getDetails().subscribe((data) => {
        this.userService.setDetails(data);
        this.webSocket.emit('profile:update', {
          user_id: this.auth.loggedUser().id,
        });
        this.global.alert(
          'Update profile',
          'Profile picture sucessfully updated!',
          ['OK']
        );
        this.modalController.dismiss();
      });
    });
  }

  async update() {
    const actionSheet = await this.actionSheetController.create({
      header: 'Select image',
      cssClass: 'image-action-sheet',
      buttons: [
        {
          text: 'Camera',
          role: 'camera',
          icon: 'camera',
        },
        {
          text: 'Library',
          role: 'library',
          icon: 'images',
        },
      ],
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    const source = role == 'camera' ? CameraSource.Camera : CameraSource.Photos;

    if (role != 'backdrop') {
      const image = await Camera.getPhoto({
        quality: role == 'camera' ? 60 : 90,
        allowEditing: true,
        resultType: CameraResultType.Base64,
        source,
      });

      this.image = `data:image/${image.format};base64,${image.base64String}`;
    }
  }

  DataURIToBlob(dataURI: string) {
    const splitDataURI = dataURI.split(',');
    const byteString =
      splitDataURI[0].indexOf('base64') >= 0
        ? atob(splitDataURI[1])
        : decodeURI(splitDataURI[1]);
    const mimeString = splitDataURI[0].split(':')[1].split(';')[0];

    const ia = new Uint8Array(byteString.length);
    for (let i = 0; i < byteString.length; i++)
      ia[i] = byteString.charCodeAt(i);

    return new Blob([ia], { type: mimeString });
  }

  ngOnDestroy() {
    this.subs.forEach((sub) => sub.unsubscribe());
  }
}
