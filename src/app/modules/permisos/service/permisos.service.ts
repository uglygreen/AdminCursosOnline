import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class PermisosService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }


   listPermiso(search: any = null, rol:any = null ){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});
    let LINK = "?";
    if(search){
      LINK += "search="+search;
    }
    // if(rol){
    //   if(search){
    //     LINK += "&rol="+rol;
    //   }else{
    //     LINK += "rol="+rol;
    //   }

    // }
    let URL = URL_SERVICIOS+"/permisos/list"+LINK;
    console.log(URL)

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }


   register(data: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/permisos/register";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   update(data: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/permisos/update";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   remove(user_id: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/permisos/delete/"+user_id;

    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }
}
