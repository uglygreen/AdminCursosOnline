import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { PermisosService } from '../service/permisos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-permiso-edit',
  templateUrl: './permiso-edit.component.html',
  styleUrls: ['./permiso-edit.component.scss']
})
export class PermisoEditComponent implements OnInit {

  @Input() PERMISO:any;
  @Output() PermisoE: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public userService: PermisosService,
    public modal: NgbActiveModal
  ) { }

  rol: string = 'admin';
  name: string = '';
  surname: string = '';
  email: string = '';
  password: string = '';
  profession: string = '';
  description: string = '';

  FILE_AVATAR:any;
  IMAGEN_PREVISUALIZAR:any = 'assets/media/avatars/300-6.jpg';
  ngOnInit(): void {

    this.rol = this.PERMISO.rol;
    this.name = this.PERMISO.name;
    this.surname = this.PERMISO.surname;
    this.email = this.PERMISO.email;
    this.profession = this.PERMISO.profession;
    this.description = this.PERMISO.description;
    this.IMAGEN_PREVISUALIZAR = this.PERMISO.avatar;
  }

  save(){
    if(!this.name || !this.surname ||  !this.email ){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    let formData = new FormData();


    formData.append("_id", this.PERMISO._id);
    formData.append("name", this.name);
    formData.append("surname", this.surname);
    formData.append("email", this.email);
    if(this.password){
      formData.append("password", this.password);
    }
    formData.append("rol", this.rol);
    if( this.profession){
      formData.append("profession", this.profession);

    }
    if(this.description){
      formData.append("description", this.description);
    }

    this.userService.update(formData).subscribe((resp:any) => {
      console.log(resp);
      this.PermisoE.emit(resp.user);
      this.modal.close();

      this.toaster.open({
        text: 'Usuario editado',
        caption: 'Editado',
        type: 'primary'
      });
    })


  }

}
