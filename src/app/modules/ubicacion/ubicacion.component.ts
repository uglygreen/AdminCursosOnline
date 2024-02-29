import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AlarmaService } from '../alarma/service/alarma.service';
import { UbicacionAddComponent } from './ubicacion-add/ubicacion-add.component';
import { UbicacionEditComponent } from './ubicacion-edit/ubicacion-edit.component';
import { UbicacionDeleteComponent } from './ubicacion-delete/ubicacion-delete.component';
import { UbicacionService } from './service/ubicacion.service';

@Component({
  selector: 'app-ubicacion',
  templateUrl: './ubicacion.component.html',
  styleUrls: ['./ubicacion.component.scss']
})
export class UbicacionComponent implements OnInit {
  isLoading: any;
  UBICACION: any =  [];
  search: string = '';

  constructor(
    public modalService: NgbModal,
    public ubicacionService: UbicacionService
  ) { }

  ngOnInit(): void {
    this.isLoading = this.ubicacionService.isLoading$;
    this.listUbicacion();
  }


  listUbicacion(){

    this.ubicacionService.listUbicacion(this.search).subscribe((resp:any) => {

      this.UBICACION = resp.ubicacion;
    })
  }

  registerUbicacion(){
    const modalRef = this.modalService.open(UbicacionAddComponent, {centered: true, size: 'md'});

    modalRef.componentInstance.UbicacionC.subscribe((Ubicacion: any) => {
      console.log(Ubicacion)
      this.UBICACION.unshift(Ubicacion);
    })
  }

  editUbicacion(ubicacion: any){
    const modalRef = this.modalService.open(UbicacionEditComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.UBICACION = ubicacion;
    modalRef.componentInstance.UbicacionE.subscribe((Ubicacion: any) => {
      let INDEX = this.UBICACION.findIndex((item:any) => item._id == ubicacion._id)
      if(INDEX != -1){
        this.UBICACION[INDEX] = Ubicacion;
      }
    });
  }

  deleteUbicacion(ubicacion: any){
    const modalRef = this.modalService.open(UbicacionDeleteComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.UBICACION = ubicacion;
    modalRef.componentInstance.UbicacionD.subscribe((val: any) => {
      let INDEX = this.UBICACION.findIndex((item:any) => item._id == ubicacion._id)
      if(INDEX != -1){
        this.UBICACION.splice(INDEX,1);
      }
    });
  }

}
