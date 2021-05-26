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
/**
 * Listener para el scroll del componente
 */
@HostListener('scroll', ['$event'])
/**
 * Componente para los mensajes del post
 */
export class PostCommentComponent implements OnInit {

  /**
   * Componente del container que tiene el scroll
   */
  @ViewChild('messageContainerScroll') messageContainerScroll?: ElementRef;
  /**
   * ID del post
   */
  @Input() idPost?: number;
  /**
   * Lista de comentarios
   */
  comments?: CommentPost[];
  /**
   * URL de la paginación
   */
  nextUrl?: string;
  /**
   * URL de la paginación
   */
  previousUrl?: string;
  /**
   * Formulario
   */
  formMessage: FormGroup;
  /**
   * Número de mensajes
   */
  countMessage: number = 0;
  /**
   * Indica si se muestra el spinner de carga
   */
  showLoading: boolean = false;
  /**
   * Indica si ya no hay más mensajes
   */
  endMessages: boolean = false;
  /**
   * Indica si se muestra el spinner de carga
   */
  loadingMessage: boolean = false;
  /**
   * Número máximo de caracteres por mensaje
   */
  max = 210;
  /**
   * Indica si es responsive
   */
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
  ngOnChanges() {
    this.getComments();
  }

  /**
   * Función que se evalúa si el scroll del componente 
   * llega hasta abajo para hacer la petición de los nuevos comentarios
   * @param event 
   */
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

  /**
   * Regresa el formulario y sus validaciones
   */
  getFormMessage(): FormGroup {
    return this.fb.group({
      'message': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(this.max)]],
    });
  }
  /**
   * Envía el comentario
   */
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
  /**
   * Reinicia el formulario
   */
  resetForm() {
    this.formMessage = this.getFormMessage();
    this.countMessage = 0;
    this.ifChangeInput();
  }
  /**
   * 
   * @param url {string} URL de la petición
   * @param pagination {boolean} Si es true, agrega a la lista los comentarios
   * sin eliminar los viejos, si es false, elimina los 
   * viejos y agrega los nuevos
   */
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
      }
    )
  }
  /**
   * Realiza un suscripción al campo del mensaje para ir sumando
   * el número de caracteres
   */
  ifChangeInput() {
    this.formMessage.get("message")?.valueChanges.subscribe((val: any) => {
      this.countMessage = val.length;
    });
  }
}
