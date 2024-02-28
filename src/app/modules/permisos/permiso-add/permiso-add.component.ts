import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UsersService } from '../../users/service/users.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisosService } from '../service/permisos.service';

@Component({
  selector: 'app-permiso-add',
  templateUrl: './permiso-add.component.html',
  styleUrls: ['./permiso-add.component.scss']
})
export class PermisoAddComponent implements OnInit {

  @Output() UserC: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public permisosService: PermisosService,
    public modal: NgbActiveModal

  ) { }

  folio: string = '';
  wtg: string = '';
  descripcion_actividad: string = '';
  gm_vts: string = '';
  alarma: string = '';
  descripcion: string = '';
  ejecutantes: string = '';
  fpt: string = '';
  jsa: string = '';
  solicitante: string = '';


  ngOnInit(): void {
  }


  save(){
    if(!this.wtg || !this.alarma || !this.descripcion){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    let formData = new FormData();


    formData.append("folio", this.folio);
    formData.append("alarma", this.alarma);
    formData.append("wtg", this.wtg);
    formData.append("descripcion_actividad", this.descripcion_actividad);
    formData.append("gm_vts", this.gm_vts);
    formData.append("solicitante", this.solicitante);

    this.permisosService.register(formData).subscribe((resp:any) => {
      console.log(resp);
      this.UserC.emit(resp.permiso);
      this.modal.close();
      this.toaster.open({
        text: 'Nuevo PT registrado',
        caption: 'Registro',
        type: 'primary'
      });
    })


  }

}
