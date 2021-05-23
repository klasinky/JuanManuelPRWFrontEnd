import { Component, OnInit } from '@angular/core';
import { PrimeIcons } from 'primeng/api';

@Component({
  selector: 'app-stock-tutorial',
  templateUrl: './stock-tutorial.component.html',
  styleUrls: ['./stock-tutorial.component.scss']
})
export class StockTutorialComponent implements OnInit {

  constructor() { }

  events1!: any[];

  ngOnInit() {
    this.events1 = [
      {
        status: '1º Paso',
        icon: PrimeIcons.SHOPPING_CART,
        color: '#9C27B0',
        image: '../../../../../../assets/img/tutorial/1.png',
        description: 'Presiona el botón "+" que esta ubicado en la parte inferior derecha de la página, dicho botón nos abrirá una ventana.'
      },
      {
        status: '2º Paso',
        icon: PrimeIcons.COG,
        color: '#673AB7',
        image: '../../../../../../assets/img/tutorial/2.png',
        description: 'En la ventana que se nos acaba de abrir vas a seleccionar la acción a la que te quieres suscribir para ver su registro semanal.'
      },
      {
        status: '3º Paso',
        icon: PrimeIcons.ENVELOPE,
        color: '#FF9800',
        image: '../../../../../../assets/img/tutorial/3.png',
        description: 'Una vez seleccionada la acción, lo siguiente que vas a hacer es hacer click al botón Suscribirse el cual te agregará la acción a tus acciones suscritas.'
      },
      {
        status: '¿Cómo desuscribirse a una acción?',
        icon: PrimeIcons.LINK,
        color: '#AAF214',
        image: '../../../../../../assets/img/tutorial/4.png',
        description: 'Una vez tengas tus acciones, en la esquina superior derecha del gráfico de la acción saldra una "X" la cual al presionarla te desuscribiras de la acción.'
      }
    ];
  }
}
