import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UbicacionService } from '../service/ubicacion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ubicacion-add',
  templateUrl: './ubicacion-add.component.html',
  styleUrls: ['./ubicacion-add.component.scss']
})
export class UbicacionAddComponent implements OnInit {

  @Output() UbicacionC: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public ubicacionService: UbicacionService,
    public modal: NgbActiveModal
  ) { }

  numero: string = '';
  descripcion: string = '';

  ngOnInit(): void {
  }



  save(){
    if(!this.descripcion ){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    const data = {

      descripcion: this.descripcion
    };
    console.log(data);

    this.ubicacionService.register(data).subscribe(
      (resp:any) => {
        console.log(resp);
        this.UbicacionC.emit(resp.ubicacion);
        this.modal.close();
        this.toaster.open({
          text: 'Nueva Ubicacion registrada',
          caption: 'Registro',
          type: 'primary'
        });
      },
      (error) => {
        console.error('Error al registrar la ubicacion:', error);
        // Manejo de errores: notificación al usuario
        this.toaster.open({
          text: 'Ocurrió un error al registrar la ubicacion',
          caption: 'Error',
          type: 'danger'
        });
      });


  }

}
