import { Component, OnInit } from '@angular/core';
import { TagDetail } from 'src/app/interfaces/post';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-tags-detail',
  templateUrl: './tags-detail.component.html',
  styleUrls: ['./tags-detail.component.scss']
})
/**
 * Componente para los tags con el número de post
 */
export class TagsDetailComponent implements OnInit {

  /**
   * Objeto de Tag
   */
  tags?: TagDetail[];
  /**
   * Número de skeletons que se mostrarán
   */
  numberSkeleton: number[]

  constructor(private httpService: HttpService) {
    this.numberSkeleton = Array(5).fill(0).map((x, i) => i);
  }

  ngOnInit(): void {
    this.getTags();
  }
  /**
   * Obtiene los tags
   */
  getTags() {
    this.httpService.getAuth('tags/detail').subscribe(
      (data) => {
        this.tags = data as TagDetail[];
      }, (error) => {
      }
    )
  }
}
