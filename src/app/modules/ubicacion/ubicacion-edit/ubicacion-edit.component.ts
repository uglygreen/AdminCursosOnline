import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Toaster } from 'ngx-toast-notifications';
import { UbicacionService } from '../service/ubicacion.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-ubicacion-edit',
  templateUrl: './ubicacion-edit.component.html',
  styleUrls: ['./ubicacion-edit.component.scss']
})
export class UbicacionEditComponent implements OnInit {

  @Input() UBICACION:any;
  @Output() UbicacionE: EventEmitter<any> = new EventEmitter();


  constructor(
    public toaster: Toaster,
    public ubicacionService: UbicacionService,
    public modal: NgbActiveModal
  ) { }

  numero: string = '';
  descripcion: string = '';

  ngOnInit(): void {

    this.descripcion = this.UBICACION.descripcion;
  }

  save(){
    if( !this.descripcion ){

      this.toaster.open({
        text: 'Necesitas rellenar los campos obligatorios',
        caption: 'Validacion',
        type: 'danger'
      });
      return;
    }

    // let formData = new FormData();

    // formData.append("_id", this.ALARMA._id);
    // formData.append("numero", this.numero);
    // formData.append("descripcion", this.descripcion);
    const data = {
      _id: this.UBICACION._id,
      descripcion: this.descripcion
    };
    this.ubicacionService.update(data).subscribe((resp:any) => {
      console.log(resp);
      this.UbicacionE.emit(resp.ubicacion);
      this.modal.close();

      this.toaster.open({
        text: 'Ubicacion editado',
        caption: 'Editado',
        type: 'primary'
      });
    })


  }

}
