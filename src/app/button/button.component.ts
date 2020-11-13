import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {

  @Input() disabled: boolean;
  @Input() startButton: boolean;
  @Input() startetGame: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
