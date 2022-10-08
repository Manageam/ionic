import { Injectable } from '@angular/core';
import { PushNotifications } from '@capacitor/push-notifications';
import { Capacitor } from '@capacitor/core';
import { Device } from '@capacitor/device';
import { SettingsService } from '../settings/settings.service';

@Injectable({
  providedIn: 'root',
})
export class FcmService {
  constructor(private settingService: SettingsService) {}

  async init() {
    // dont run this for the web
    if (Capacitor.getPlatform() == 'web') return;

    this.registerPush();
    this.registerListeners();
  }

  private async registerPush() {
    let permStatus = await PushNotifications.checkPermissions();

    if (permStatus.receive === 'prompt') {
      permStatus = await PushNotifications.requestPermissions();
    }

    if (permStatus.receive !== 'granted') {
      throw new Error('User denied permissions!');
    }

    await PushNotifications.register();
  }

  private async registerListeners() {
    const device_id = (await Device.getId()).uuid;
    await PushNotifications.addListener('registration', (token) => {
      this.settingService
        .pushFCMToken({ token: token.value, device_id })
        .subscribe();
      console.info('Registration token: ', token.value);
    });

    await PushNotifications.addListener('registrationError', (err) => {
      console.error('Registration error: ', err.error);
    });

    await PushNotifications.addListener(
      'pushNotificationActionPerformed',
      (notification) => {
        console.log(
          'Push notification action performed',
          notification.actionId,
          notification.inputValue
        );
      }
    );
  }
}
