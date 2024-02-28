import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, finalize } from 'rxjs';
import { AuthService } from '../../auth';
import { URL_SERVICIOS } from 'src/app/config/config';

@Injectable({
  providedIn: 'root'
})
export class AlarmaService {

  isLoading$: Observable<boolean>;
  isLoadingSubject: BehaviorSubject<boolean>;

  constructor(
    public http: HttpClient,
    public authService: AuthService
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
   }


   listAlarma(search: any = null){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});
    let LINK = "?";
    if(search){
      LINK += "search="+search;
    }

    let URL = URL_SERVICIOS+"/alarmas/list"+LINK;
    console.log(URL)

    return this.http.get(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }


   register(data: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/alarmas/register";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   update(data: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/alarmas/update";

    return this.http.post(URL, data, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }

   remove(alarma_id: any){
    this.isLoadingSubject.next(true);
    let headers = new HttpHeaders({'token': this.authService.token});

    let URL = URL_SERVICIOS+"/alarmas/delete/"+alarma_id ;

    return this.http.delete(URL, {headers: headers}).pipe(
      finalize(() => this.isLoadingSubject.next(false))
    );
   }
}
