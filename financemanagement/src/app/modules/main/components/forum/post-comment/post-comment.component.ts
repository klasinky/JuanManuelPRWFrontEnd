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
  toBottom: boolean = false;
  formMessage: FormGroup;
  countMessage: number = 0;
  showLoading: boolean = false;

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
    if (this.toBottom) {
      if (event.target.scrollTop == 0) {
        if (this.nextUrl) {
          this.getComments(this.nextUrl, true);
        }
      }
    }
  }



  scrollToBottom(): void {
    try {
      if (this.messageContainerScroll != undefined) {
        this.messageContainerScroll.nativeElement.scrollTop = this.messageContainerScroll.nativeElement.scrollHeight;
        this.toBottom = true
      }
    } catch (err) {

    }

  }

  getFormMessage(): FormGroup {
    return this.fb.group({
      'message': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(210)]],
    });
  }

  sendMessage() {
    if (this.formMessage.valid) {
      const message = this.formMessage?.value.message;
      const dataSend = {
        description: message
      }
      const url = 'posts/' + this.idPost + '/comment'
      this.httpService.postAuth(url, dataSend).subscribe(
        (data) => {
          this.getComments();
          this.formMessage.reset();
          this.countMessage = 0;
        },
        (error) => {
          this.toastr.error(error.error.detail)
        }
      )
    }

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
          setTimeout(() => {
            this.scrollToBottom();
          }, 100)

        } else {
          data.results.forEach((comment: CommentPost) => {
            this.comments?.unshift(comment);
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
