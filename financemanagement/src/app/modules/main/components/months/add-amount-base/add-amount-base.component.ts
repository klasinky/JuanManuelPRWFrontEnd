import { ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmountBase } from 'src/app/interfaces/amount-base';
import { Category } from 'src/app/interfaces/category';
import { HttpEventType } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { MonthDetailService } from 'src/app/services/month-detail.service';

@Component({
  selector: 'app-add-amount-base',
  templateUrl: './add-amount-base.component.html',
  styleUrls: ['./add-amount-base.component.scss']
})
export class AddAmountBaseComponent implements OnInit {

  formAmountBase?: FormGroup;
  formXls?: FormGroup;

  @ViewChild('#xls') xlsForm: any;
  @ViewChild('#manual') manualForm: any;
  @Output() refreshMonth: EventEmitter<boolean> = new EventEmitter();

  xlsFormActive: boolean = false;
  filename: string = "Selecciona un archivo.";
  file?: File;

  @Input() isExpense?: boolean; // false = Entry , True = Expense
  title?: string;
  serviceName?: string;
  idMonth?: number;
  categories?: Category[];

  nameError: boolean = false;
  nameErrorMessage: String[] = [];
  fileError: boolean = false;
  fileErrorMessage: String[] = [];

  /** Bar Progress **/
  /**
   * Porcentaje del progreso de carga
   */
  uploadProgress?: number = 0;
  /**
   * Mostrar barra de progreso
   */
  showUploadProgress: boolean = false;

  constructor(
    private monthService: MonthDetailService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.title = (this.isExpense) ? "Gasto" : "Ingreso";
    this.serviceName = (this.isExpense) ? "expense" : "entry";

    this.ifChangeInput('name', 'nameError');
    this.ifChangeInput('file', 'fileError');

    this.route.params.subscribe(params => {
      this.idMonth = JSON.parse(unescape(atob(params.id)));
    })

    this.getCategoriesAction();
    this.formAmountBase = this.getFormAmountBase();
    this.formXls = this.getFormXls();
  }

  /**
   * 
   * @returns Retorna el formulario y las validaciones necesarias para el formulario de AmountBase
   */
  getFormAmountBase() {
    return this.fb.group({
      'name': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      'description': ['', [Validators.required, Validators.minLength(1), Validators.maxLength(255)]],
      'amount': ['', [Validators.required, Validators.min(0)]],
      'category': [null, Validators.required]
    })
  }

  /**
   * 
   * @returns Retorna el formulario y las validaciones necesarias para el formulario de ImportXls
   */
  getFormXls() {
    return this.fb.group({
      'xls': ['', Validators.required]
    })
  }

  /**
   * onFileChange al cambiar el fichero, cambiar el filename
   */
  onFileChange(event: any) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {

      const [file] = event.target.files;

      reader.readAsDataURL(file);

      reader.onload = () => {
        this.formXls?.patchValue({
          file: reader.result
        });
        this.file = file;
        this.filename = file.name;
        this.cd.markForCheck();
      };

    } else {
      this.resetForms();
    }
  }


  /**
   * 
   * @param e target
   */
  changeCategory(e: any) {
    this.formAmountBase?.patchValue(e.target.value, {
      onlySelf: true
    })
  }

  /**
   * Cambiar al modo manual
   */
  manualMode() {
    this.xlsFormActive = false;
  }

  /**
   * Cambiar al modo de importar con xls
   */
  xlsMode() {
    this.xlsFormActive = true;
  }

  /**
   * Agregar un (gasto o ingreso) manualmente
   */
  postAmountBaseAction() {

    if (this.formAmountBase?.valid && this.idMonth && this.serviceName) {
      this.clearFiles();
      this.showUploadProgress = true;
      const dataAmountBase = {
        name: this.formAmountBase.value.name,
        description: this.formAmountBase.value.description,
        amount: this.formAmountBase.value.amount,
        category: this.formAmountBase.value.category
      } as AmountBase;

      this.monthService.addAmountBase(this.idMonth , this.serviceName, dataAmountBase).subscribe(
        (data: any) => {
          this.showUploadProgress = false;
          this.toastr.success("Se ha creado el " + this.title?.toLowerCase(), 'Creado');
          this.formAmountBase?.reset();
          this.refreshMonth.emit(true);
          this.showUploadProgress = false;

        }, (error) => {
          this.showUploadProgress = false;
          const nameError = error.error.name;
          this.nameError = true;
          nameError.forEach((element: string) => {
            this.nameErrorMessage.push(element);
          });
        }
      )

    }
  }

  /**
   * Agregar uno o varios (gastos o ingresos) a partir de un fichero XLS
   */
  postAmountBaseXlsAction() {
    this.showUploadProgress = true;
    if (this.formXls?.valid  && this.idMonth && this.serviceName) {
      this.clearFiles();

      const dataFile = this.file;

      this.monthService.addAmountBaseXML(this.idMonth,this.serviceName, dataFile).subscribe(
        (data: any) => {
          //Barra de progreso
          if (data.type == HttpEventType.UploadProgress) {
            data
            this.uploadProgress = Math.round((data.loaded * 100) / data.total);

          }

          if (data.body) {
            this.showUploadProgress = false;
            const haveInserts: boolean = (data.body.inserts.length > 0) ? true : false;
            if (haveInserts) {
              this.toastr.success('Se han creado ' + data.body.inserts.length + " registros", 'Creado');
              this.refreshMonth.emit(true);
            } else {
              this.toastr.error("No se han agregado registros", 'Error');
              this.fileError = true;
            }
            this.uploadProgress = 0;
            this.resetForms();
          }

        }, (error) => {
          this.showUploadProgress = false;
          this.resetForms();

          const fileError = error.error.file;
          this.fileError = true;
          this.uploadProgress = 0;

          fileError.forEach((element: string) => {
            this.toastr.error(element, 'Error');
            this.fileErrorMessage.push(element);
          });
        }
      )
    }
  }

  /**
   * Obtener todas las categorias
   */
  getCategoriesAction() {

    this.monthService.getCategoriesAll().subscribe(
      (data: any) => {
        this.categories = data;
      }, (error) => {
        console.log(error.error.detail);
      }
    )
  }

  resetForms() {
    this.clearFiles();
    this.filename = 'Selecciona un archivo.';
    this.formXls = this.getFormXls();
    this.formAmountBase = this.getFormAmountBase();
  }

  ifChangeInput(name: any, nameError: any) {
    this.formAmountBase?.get(name)?.valueChanges.subscribe(val => {
      (this as any)[nameError] = false
    });
  }

  clearFiles() {
    this.nameError = false;
    this.fileError = false;
    this.nameErrorMessage = [];
    this.fileErrorMessage = [];
  }


}
