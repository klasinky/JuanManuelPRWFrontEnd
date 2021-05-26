import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
/**
 * Componete para el Like
 */
export class LikeButtonComponent implements OnInit {

  /**
   * Indica si muestra el spinner de carga
   */
  @Input() showLoading?: boolean;
  /**
   * Indica si el usuario ha dado like
   */
  @Input() liked?: boolean;
  /**
   * Número total de likes
   */
  @Input() countLike?: number;
  /**
   * Evento para avisar que se ha dado like
   */
  @Output() sendLike: EventEmitter<any> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * Envía el Event Emitter
   */
  sendLikeEvent(){
    this.sendLike.emit();
  }
}
