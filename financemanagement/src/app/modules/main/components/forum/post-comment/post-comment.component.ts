import { Component, ElementRef, HostListener, Input, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommentPost } from 'src/app/interfaces/comment';
import { HttpService } from 'src/app/services/http.service';

@Component({
  selector: 'app-post-comment',
  templateUrl: './post-comment.component.html',
  styleUrls: ['./post-comment.component.scss']
})
@HostListener('scroll', ['$event'])

export class PostCommentComponent implements OnInit {

  @ViewChild('messageContainerScroll') messageContainerScroll?: ElementRef;
  @Input() idPost?: number;
  comments?: CommentPost[];
  nextUrl?: string;
  previousUrl?: string;
  formMessage: FormGroup;
  countMessage: number = 0;
  showLoading: boolean = false;
  endMessages: boolean = false;

  loadingMessage: boolean = false;

  max = 210;
  responsive = true;

  constructor(private httpService: HttpService,
    private toastr: ToastrService,
    private fb: FormBuilder) {
    this.formMessage = this.getFormMessage();
  }

  ngOnInit(): void {
    this.getComments();
    this.ifChangeInput();
  }

  onScroll(event: any) {

    if (event.target.offsetHeight + event.target.scrollTop >= event.target.scrollHeight) {
      if (this.nextUrl) {
        this.endMessages = false;
        this.getComments(this.nextUrl, true);
      } else {
        this.endMessages = true;

      }
    }
  }


  getFormMessage(): FormGroup {
    return this.fb.group({
      'message': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.max)]],
    });
  }

  sendMessage() {
    if (this.formMessage.valid) {
      this.loadingMessage = true;
      const message = this.formMessage?.value.message;
      const dataSend = {
        description: message
      }
      const url = 'posts/' + this.idPost + '/comment'
      this.httpService.postAuth(url, dataSend).subscribe(
        (data) => {
          this.loadingMessage = false;

          this.getComments();
          this.resetForm();

        },
        (error) => {
          this.loadingMessage = false;
          this.toastr.error(error.error.detail)
        }
      )
    } else {
      let msg = 'Tu mensaje tiene que tener al menos 10 caracteres';
      if (this.formMessage.get('message')?.value.length > this.max) {
        msg = 'Tu mensaje no puede superar los 210 caracteres';
      }
      this.toastr.error(msg, 'Error');
    }

  }

  resetForm() {
    this.formMessage = this.getFormMessage();
    this.countMessage = 0;
    this.ifChangeInput();
  }

  getComments(url?: string, pagination = false) {
    if (!url)
      url = 'posts/' + this.idPost + '/comment/all';
    this.showLoading = true;
    this.httpService.getAuth(url, pagination).subscribe(
      (data: any) => {
        this.showLoading = false;

        this.nextUrl = data.next;
        this.previousUrl = data.previous;
        if (!pagination) {
          this.comments = data.results as CommentPost[];


        } else {
          const arr = data.results as CommentPost[];
          arr.forEach((comment: CommentPost) => {
            this.comments?.push(comment);
          });
        }

      },
      (error) => {
        this.showLoading = false;
        console.log(error);

      }
    )
  }

  ifChangeInput() {
    this.formMessage.get("message")?.valueChanges.subscribe((val: any) => {
      this.countMessage = val.length;
    });
  }
}
