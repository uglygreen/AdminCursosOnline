import { Component, OnInit } from '@angular/core';
import { UsersService } from '../../users/service/users.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PermisoAddComponent } from '../permiso-add/permiso-add.component';
import { PermisoEditComponent } from '../permiso-edit/permiso-edit.component';
import { PermisoDeleteComponent } from '../permiso-delete/permiso-delete.component';
import { PermisosService } from '../service/permisos.service';

@Component({
  selector: 'app-permiso-list',
  templateUrl: './permiso-list.component.html',
  styleUrls: ['./permiso-list.component.scss']
})
export class PermisoListComponent implements OnInit {
  isLoading: any;
  PERMISOS: any =  [];
  search: string = '';
  estado: string='';

  constructor(
    public modalService: NgbModal,
    public permisoService: PermisosService
  ) { }

  ngOnInit(): void {
    this.isLoading = this.permisoService.isLoading$;
    this.listPermiso();
  }


  listPermiso(){

    this.permisoService.listPermiso(this.search, this.estado).subscribe((resp:any) => {

      this.PERMISOS = resp.users;
    })
  }

  registerPermiso(){
    const modalRef = this.modalService.open(PermisoAddComponent, {centered: true, size: 'md'});

    modalRef.componentInstance.PermisoC.subscribe((Permiso: any) => {
      console.log(Permiso)
      this.PERMISOS.unshift(Permiso);
    })
  }

  editPermiso(permiso: any){
    const modalRef = this.modalService.open(PermisoEditComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.PERMISO = permiso;
    modalRef.componentInstance.PermisoE.subscribe((Permiso: any) => {
      let INDEX = this.PERMISOS.findIndex((item:any) => item._id == permiso._id)
      if(INDEX != -1){
        this.PERMISOS[INDEX] = Permiso;
      }
    });
  }

  deletePermiso(permiso: any){
    const modalRef = this.modalService.open(PermisoDeleteComponent, {centered: true, size: 'md'});
    modalRef.componentInstance.PERMISO = permiso;
    modalRef.componentInstance.PermisoD.subscribe((val: any) => {
      let INDEX = this.PERMISOS.findIndex((item:any) => item._id == permiso._id)
      if(INDEX != -1){
        this.PERMISOS.splice(INDEX,1);
      }
    });
  }

}
