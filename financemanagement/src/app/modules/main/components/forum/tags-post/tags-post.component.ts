import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-tags-post',
  templateUrl: './tags-post.component.html',
  styleUrls: ['./tags-post.component.scss']
})
/**
 * Componente para los Tags del POST (En Detail)
 */
export class TagsPostComponent implements OnInit {

  /**
   * Lista de los tags del post
   */
  @Input() tags?: any[];
  /**
   * Indica si se muestra el skeleton
   */
  tagsLoader: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }

}
