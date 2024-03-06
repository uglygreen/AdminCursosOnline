import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { CategorieService } from '../service/categorie.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-categorie-add',
  templateUrl: './categorie-add.component.html',
  styleUrls: ['./categorie-add.component.scss']
})
export class CategorieAddComponent implements OnInit {

  @Output() CatC: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public categorieService: CategorieService,
    public modal: NgbActiveModal
  ) { }

  title: string = '';

  FILE_AVATAR:any;
  IMAGEN_PREVISUALIZAR:any = 'assets/media/avatars/300-6.jpg';
  ngOnInit(): void {
  }


  processAvatar($event:any){
    if($event.target.files[0].type.indexOf("image") < 0){

      this.toaster.open({text: 'Solo se acepta imagenes', caption: 'Validaciones', type: 'danger'});
      return;

    }


    this.FILE_AVATAR = $event.target.files[0];
    let reader = new FileReader();
    reader.readAsDataURL(this.FILE_AVATAR);
    reader.onloadend = () => this.IMAGEN_PREVISUALIZAR = reader.result;

  }

  save(){
    if(!this.title || !this.FILE_AVATAR ){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    let formData = new FormData();

    formData.append("imagen", this.FILE_AVATAR);
    formData.append("title", this.title);

    this.categorieService.register(formData).subscribe((resp:any) => {
      console.log(resp);
      this.CatC.emit(resp.categoria);
      this.modal.close();
      this.toaster.open({
        text: 'Nueva categoria registrado',
        caption: 'Registro',
        type: 'primary'
      });
    },
    (error) => {
      console.error('Error al registrar la categoria:', error);
      // Manejo de errores: notificación al usuario
      this.toaster.open({
        text: 'Ocurrió un error al registrar la categoria',
        caption: 'Error',
        type: 'danger'
      });
    });


  }

}
