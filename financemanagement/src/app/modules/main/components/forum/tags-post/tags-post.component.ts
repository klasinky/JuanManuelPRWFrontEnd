import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-post',
  templateUrl: './tags-post.component.html',
  styleUrls: ['./tags-post.component.scss']
})
export class TagsPostComponent implements OnInit {

  @Input()tags?: any[] ;

  constructor() { }

  ngOnInit(): void {
  }

}
