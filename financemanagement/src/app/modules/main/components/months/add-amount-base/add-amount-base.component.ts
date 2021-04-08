import { ChangeDetectorRef, Component, Input, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AmountBase } from 'src/app/interfaces/amount-base';
import { HttpService } from 'src/app/services/http.service';
import { Category } from 'src/app/interfaces/category';

@Component({
  selector: 'app-add-amount-base',
  templateUrl: './add-amount-base.component.html',
  styleUrls: ['./add-amount-base.component.scss']
})
export class AddAmountBaseComponent implements OnInit {

  formAmountBase: FormGroup;
  formXls: FormGroup;

  @ViewChild('#xls') xlsForm: any;
  @ViewChild('#manual') manualForm: any;
  xlsFormActive: boolean = false;
  filename: string = "Selecciona un archivo.";
  file?: File;

  @Input() isExpense?: boolean; // false = Entry , True = Expense
  title?: string;
  serviceName?: string;
  idMonth?: number;
  categories?: Category[];

  constructor(private httpService: HttpService,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private cd: ChangeDetectorRef) {
    this.formAmountBase = this.getFormAmountBase();
    this.formXls = this.getFormXls();

  }

  ngOnInit(): void {
    this.title = (this.isExpense) ? "Gasto" : "Ingresos";
    this.serviceName = (this.isExpense) ? "expense" : "entry";
    
    this.route.params.subscribe(params => {
      this.idMonth = JSON.parse(unescape(atob(params.id)));
    })

    this.getCategoriesAction();
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
      'category': ['', Validators.required]
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

    this.formXls.patchValue({
      file: event.target.files[0]
    })
    this.file = event.target.files[0];
    this.filename = event.target.files[0].name;
  }

  /**
   * 
   * @param e target
   */
  changeCity(e:any) {
    this.formAmountBase.patchValue(e.target.value, {
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
    const serviceName = 'months/' + this.idMonth + '/create/' + this.serviceName;

    if(this.formAmountBase.valid){
      const dataAmountBase = {
        name: this.formAmountBase.value.name,
        description: this.formAmountBase.value.description,
        amount: this.formAmountBase.value.amount,
        category: this.formAmountBase.value.category
      } as AmountBase;
      console.log(dataAmountBase)

      this.httpService.postAuth(serviceName, dataAmountBase).subscribe(
        (data: any) => {
          const amountBase = data as AmountBase;
          this.toastr.success(data.detail, 'Creado');
          this.formAmountBase.reset();
        }, (error) => {
          console.log(error);
        }
      )
    }
  }

  /**
   * Agregar uno o varios (gastos o ingresos) a partir de un fichero XLS
   */
  postAmountBaseXlsAction(){
    const serviceName = 'months/' + this.idMonth + '/import/' + this.serviceName;

    if(this.formXls.valid){
      const dataFile = this.file;
      
      this.httpService.postXml(serviceName, dataFile).subscribe(
        (data: any) => {
          console.log(data);
          this.toastr.success(data.detail, 'Creado');
          this.clearFiles();
        }, (error) => {
          console.log(error);
        }
      )
    }
  }

  /**
   * Obtener todas las categorias
   */
  getCategoriesAction(){
    this.httpService.getAuth('categories/all').subscribe(
      (data: any) => {
        this.categories = data;
      }, (error) => {
        console.log(error.error.detail);
      }
    )
  }

   clearFiles(){
    this.filename = 'Selecciona un archivo.';
    this.formXls.reset();
  }
}
