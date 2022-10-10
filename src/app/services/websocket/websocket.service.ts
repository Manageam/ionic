import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class WebsocketService {
  socket: any;
  socket_url = environment.socketUrl;

  constructor() {
    this.socket = io.connect(this.socket_url);
  }

  listen(eventname: string): Observable<any> {
    return new Observable((subscriber) => {
      this.socket.on(eventname, (data) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventname: string, data: any) {
    this.socket.emit(eventname, data);
  }
}
