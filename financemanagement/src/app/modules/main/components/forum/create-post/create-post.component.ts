import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.scss']
})
export class CreatePostComponent implements OnInit {

  text: string = "";
  title: string = "";
  constructor(
    private httpService: HttpService,
    private toastr: ToastrService,
    private router : Router) { }

  ngOnInit(): void {
  }

  createPost() {
    if (this.checkPost()) {
      const data = {
        'title': this.title,
        'description': this.text,
        'tags': []
      }
      this.httpService.postAuth('posts', data).subscribe(
        (data) => {
    
          this.router.navigate(['/dashboard/post']).then(() => {
            // Notificación
            this.toastr.success('Post creado')
          })
        }, (error) => {
          this.toastr.error(error.error.detail, 'Error')

        }
      )
    }else{
      console.log("Es fake")
    }
  }


  checkPost(): boolean {
    return this.text.length > 10 && this.text.length < 5000000
      && this.title.length > 3 && this.title.length < 255;
  }

}
