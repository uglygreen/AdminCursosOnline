import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { PermisosService } from '../service/permisos.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-permiso-delete',
  templateUrl: './permiso-delete.component.html',
  styleUrls: ['./permiso-delete.component.scss']
})
export class PermisoDeleteComponent implements OnInit {

  @Input() PERMISO:any;
  @Output() PermisoD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public permisosService: PermisosService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  delete(){
    this.permisosService.remove(this.PERMISO._id).subscribe((resp: any) => {
      console.log(resp);
      this.PermisoD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'Usuario ha sido eliminado',
        caption: 'Eliminado',
        type: 'primary'
      });
    })

  }
}
