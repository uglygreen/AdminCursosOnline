import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { URL_SERVICIOS } from 'src/app/config/config';
import { AuthService } from '../../auth';

@Injectable({
  providedIn: 'root'
})
export class UbicacionService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }


   listUbicacion(search: any = null){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});
    let LINK = "?";
    if(search){
      LINK += "search="+search;
    }

    let URL = URL_SERVICIOS+"/ubicacion/list"+LINK;
    console.log(URL)

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }


   register(data: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/ubicacion/register";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   update(data: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/ubicacion/update";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   remove(ubicacion_id: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/ubicacion/delete/"+ubicacion_id ;

    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }
}
