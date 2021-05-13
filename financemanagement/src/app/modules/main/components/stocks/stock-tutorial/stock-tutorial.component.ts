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
        status: 'Ordered',
        icon: PrimeIcons.SHOPPING_CART,
        color: '#9C27B0',
        image: 'game-controller.jpg',
        description: 'Dale click al botón que esta ubicado en la parte inferior derecha de la página el cual nos abrira un pequeña ventana.'
      },
      {
        status: 'Processing',
        icon: PrimeIcons.COG,
        color: '#673AB7',
        description: 'Lorem ipsum dolor sit amet consectetur, adipi sicing elit. Nemo, esse quis. Placeat iste similique exercitationem nobis itaque sit facilis! Alias tenetur natus, commodi corrupti earum animi nihil mollitia esse ad!'
      },
      {
        status: 'Shipped',
        icon: PrimeIcons.ENVELOPE,
        color: '#FF9800',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, esse quis. Placeat iste similique exercitationem nobis itaque sit facilis! Alias tenetur natus, commodi corrupti earum animi nihil mollitia esse ad!'
      },
      {
        status: 'Delivered',
        icon: PrimeIcons.CHECK,
        color: '#607D8B',
        description: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nemo, esse quis. Placeat iste similique exercitationem nobis itaque sit facilis! Alias tenetur natus, commodi corrupti earum animi nihil mollitia esse ad!'
      }
    ];
  }

}
