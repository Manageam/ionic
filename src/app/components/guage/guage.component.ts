import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-guage',
  templateUrl: './guage.component.html',
  styleUrls: ['./guage.component.scss'],
})
export class GuageComponent implements OnInit {
  range = -10;
  appearance = 'green';
  constructor() {}

  ngOnInit() {}
  @Input()
  set value(val) {
    this.range = -(val / 100) * 141;
  }

  @Input()
  set color(val) {
    this.appearance = val;
  }
}
