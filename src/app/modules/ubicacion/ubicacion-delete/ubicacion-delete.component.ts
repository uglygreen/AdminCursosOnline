import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UbicacionService } from '../service/ubicacion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ubicacion-delete',
  templateUrl: './ubicacion-delete.component.html',
  styleUrls: ['./ubicacion-delete.component.scss']
})
export class UbicacionDeleteComponent implements OnInit {

  @Input() UBICACION:any;
  @Output() UbicacionD: EventEmitter<any> = new EventEmitter();

  constructor(
    public toaster: Toaster,
    public ubicacionService: UbicacionService,
    public modal: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  delete(){

    this.ubicacionService.remove(this.UBICACION._id).subscribe((resp: any) => {
      console.log(resp);
      this.UbicacionD.emit('');
      this.modal.close();

      this.toaster.open({
        text: 'Ubicacion ha sido eliminado',
        caption: 'Eliminado',
        type: 'primary'
      });
    },
    (error) => {
      console.error('Error al eliminar la ubicacion:', error);
      // Mostrar una notificación al usuario sobre el error
      this.toaster.open({
        text: 'Ocurrió un error al eliminar la ubicacion',
        caption: 'Error',
        type: 'danger'
      });
    });

  }
}
