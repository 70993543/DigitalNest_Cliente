import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

  login_cliente(data: any): Observable<any> {
    let headers = new HttpHeaders().set('Content-type', 'application/json');
    return this._http.post(this.url + 'login_cliente', data, {
      headers: headers,
    });
  }

  /* obtener_cliente_guest(id: any, token: any):Observable<any>{
    let headers = new HttpHeaders({'Content-Type': 'application/json', 'Authorization': token});

    return this._http.get(this.url + 'obtener_cliente_guest/' + id, {headers: headers})

  } */

  obtener_cliente_guest(id: any, token: any): Observable<any> {
    if (!id || !token) {
      return throwError('ID o token nulo');
    }

    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: token,
    });

    return this._http.get(this.url + 'obtener_cliente_guest/' + id, {
      headers: headers,
    });
  }

  actualizar_perfil_cliente_guest(
    id: any,
    data: any,
    token: any
  ): Observable<any> {
    let headers = new HttpHeaders({
      'Content-type': 'application/json',
      Authorization: token,
    });

    return this._http
      .put(this.url + 'actualizar_perfil_cliente_guest/' + id, data, {
        headers: headers,
      })
      .pipe(
        catchError((error) => {
          console.error(
            'Error en la solicitud de actualizar_cliente_guest:',
            error
          );
          return throwError(() => error);
        })
      );
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('token');

    if (!token) {
      return false;
    }

    try {
      const helper = new JwtHelperService();
      var decodedToken = helper.decodeToken(token);

      console.log(decodedToken);

      if (helper.isTokenExpired(token)) {
        localStorage.clear();
        return false;
      }

      if (!decodedToken) {
        localStorage.clear();
        return false;
      }
    } catch (error) {
      localStorage.clear();
      return false;
    }

    return true;
  }

  obtener_config_publico():Observable<any>{
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(this.url + 'obtener_config_public', {headers: headers})
  }
}
