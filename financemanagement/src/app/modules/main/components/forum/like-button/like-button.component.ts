import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-like-button',
  templateUrl: './like-button.component.html',
  styleUrls: ['./like-button.component.scss']
})
export class LikeButtonComponent implements OnInit {

  @Input() showLoading?: boolean;
  @Input() liked?: boolean;
  @Input() countLike?: number;

  @Output() sendLike: EventEmitter<any> =  new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  sendLikeEvent(){
    this.sendLike.emit();
  }
}
