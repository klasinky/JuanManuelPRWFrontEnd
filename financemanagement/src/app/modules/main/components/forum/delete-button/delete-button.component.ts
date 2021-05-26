import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-delete-button',
  templateUrl: './delete-button.component.html',
  styleUrls: ['./delete-button.component.scss']
})
/**
 * Compoente para eliminar un post
 */
export class DeleteButtonComponent implements OnInit {

  /**
   * Se ejecuta para avisar que se elimina un post
   */
  @Output() sendDelete: EventEmitter<any> = new EventEmitter();
  /**
   * Boolean para mostrar el spinner de carga
   */
  @Input() showLoader?: boolean;

  constructor(private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
  }

  /**
   * Envía un emitter para avisar que se elimina el post
   */
  sendDeleteEvent() {
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
