import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../service/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.scss']
})
export class UserEditComponent implements OnInit {

  @Input() USER:any;
  @Output() UserE: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public userService: UsersService,
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

    this.rol = this.USER.rol;
    this.name = this.USER.name;
    this.surname = this.USER.surname;
    this.email = this.USER.email;
    this.profession = this.USER.profession;
    this.description = this.USER.description;
    this.IMAGEN_PREVISUALIZAR = this.USER.avatar;
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
    if(!this.name || !this.surname ||  !this.email ){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    let formData = new FormData();

    if(this.FILE_AVATAR) {
      formData.append("avatar", this.FILE_AVATAR);
    }
    formData.append("_id", this.USER._id);
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
      this.UserE.emit(resp.user);
      this.modal.close();
    })
    

  }

}
