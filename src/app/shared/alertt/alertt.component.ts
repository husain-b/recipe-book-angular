import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alertt',
  templateUrl: './alertt.component.html',
  styleUrls: ['./alertt.component.css']
})
export class AlerttComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() message : String;

  @Output() close = new EventEmitter<void>();

  onClose(){
    this.close.emit();
  }

}
