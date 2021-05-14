import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
export class DeleteButtonComponent implements OnInit {

  @Output() sendDelete: EventEmitter<any> =  new EventEmitter();
  @Input() showLoader?: boolean;

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  sendDeleteEvent(){
    this.confirmationService.confirm({
      message: '¿Estás seguro de que lo quieres eliminar?',
      accept: () => {
        this.sendDelete.emit();
        this.confirmationService.close();
      },
      reject: () => {
        this.confirmationService.close();
      }
    });

  }

}
