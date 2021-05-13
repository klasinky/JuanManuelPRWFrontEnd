import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

  @Output() sendDelete: EventEmitter<any> =  new EventEmitter();
  @Input() showLoader?: boolean;

  constructor() { }

  ngOnInit(): void {
  }

  sendDeleteEvent(){
    this.sendDelete.emit();
  }

}
