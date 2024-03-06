import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../service/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.scss']
})
export class CategorieEditComponent implements OnInit {

  @Input() CATEGORIE:any;
  @Output() CatE: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public categorieService: CategorieService,
    public modal: NgbActiveModal
  ) { }

  title: string = '';
  state: string = '';

  FILE_IMAGEN:any;
  IMAGEN_PREVISUALIZAR:any = 'assets/media/avatars/300-6.jpg';
  ngOnInit(): void {

    this.title = this.CATEGORIE.title;
    this.state = this.CATEGORIE.state;

    this.IMAGEN_PREVISUALIZAR = this.CATEGORIE.imagen;
  }


  processAvatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){

      this.toaster.open({text: 'Solo se acepta imagenes', caption: 'Validaciones', type: 'danger'});
      return;

    }


    this.FILE_IMAGEN = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_IMAGEN);
    reader.onloadend = () => this.IMAGEN_PREVISUALIZAR = reader.result;

  }

  save(){
    if(!this.title || !this.state ){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    let formData = new FormData();

    if(this.FILE_IMAGEN) {
      formData.append("imagen", this.FILE_IMAGEN);
    }
    formData.append("_id", this.CATEGORIE._id);
    formData.append("title", this.title);
    formData.append("state", this.state);


    this.categorieService.update(formData).subscribe((resp:any) => {
      console.log(resp);
      this.CatE.emit(resp.categoria);
      this.modal.close();

      this.toaster.open({
        text: 'Categoria editado',
        caption: 'Editado',
        type: 'primary'
      });
    })


  }

}
