import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class GlobalService {
  constructor(
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController
  ) {}

  async alert(header: string, message: string, buttons: any) {
    return new Promise(async (resolve) => {
      const alert = await this.alertCtrl.create({
        header,
        message,
        cssClass: 'alert-class',
        buttons,
      });
      alert.onDidDismiss().then(resolve);
      await alert.present();
    });
  }

  async showLoader() {
    const loading = await this.loadingCtrl.create({
      cssClass: 'loader-class',
      showBackdrop: true,
      mode: 'ios',
    });
    await loading.present();
  }

  async hideLoader() {
    await this.loadingCtrl.dismiss();
  }
}
