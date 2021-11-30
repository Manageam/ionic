import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { StatusBar, Style } from '@capacitor/status-bar';
import { SplashScreen } from '@capacitor/splash-screen';
import { AuthenticationService } from './services/authentication/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private authenticationService: AuthenticationService,
    private router: Router
  ) {
    if (this.platform.is('hybrid')) {
      if (this.platform.is('ios')) {
        SplashScreen.hide();
      } else {
        setTimeout(() => {
          SplashScreen.hide();
        }, 5000);
      }
      this.platform.is('ios')
        ? StatusBar.setStyle({ style: Style.Light })
        : StatusBar.setStyle({ style: Style.Dark });
    }
    this.initializeApp();
  }

  async initializeApp() {
    if (!this.authenticationService.isAuthenticated())
      await this.router.navigate(['/auth']);
  }
}
