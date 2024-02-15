import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../service/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.scss']
})
export class UserAddComponent implements OnInit {

  @Output() UserC: EventEmitter<any> = new EventEmitter();


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
    if(!this.name || !this.surname || !this.FILE_AVATAR || !this.email || !this.password){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    let formData = new FormData();

    formData.append("avatar", this.FILE_AVATAR);
    formData.append("name", this.name);
    formData.append("surname", this.surname);
    formData.append("email", this.email);
    formData.append("password", this.password);
    formData.append("rol", this.rol);
    formData.append("profession", this.profession);
    formData.append("description", this.description);

    this.userService.register(formData).subscribe((resp:any) => {
      console.log(resp);
      this.UserC.emit(resp.user);
      this.modal.close();
      this.toaster.open({
        text: 'Nuevo usuario registrado',
        caption: 'Registro',
        type: 'primary'
      });
    })
    

  }

}
