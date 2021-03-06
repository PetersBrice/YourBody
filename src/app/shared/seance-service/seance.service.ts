import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/defaultIfEmpty';
import 'rxjs/add/operator/filter';

@Injectable()
export class SeanceService {
  // private property to store all backend URLs
  private _backendURL: any;

  constructor(private _http: HttpClient) {
    this._backendURL = {};
    // build backend base url
    let baseUrl = `${environment.backend.protocol}://${environment.backend.host}`;
    if (environment.backend.port) {
      baseUrl += `:${environment.backend.port}`;
    }

    // build all backend urls
    Object.keys(environment.backend.endpoints).forEach(k => this._backendURL[k] = `${baseUrl}${environment.backend.endpoints[k]}`);
  }

  fetch(): Observable<any[]> {
    return this._http.get(this._backendURL.allSeance, this._options())
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }


  fetchOne(id: string): Observable<any> {
    return this._http.get(this._backendURL.oneSeance.replace(':id', id), this._options());
  }

  create(seance: any): Observable<any> {
    const temp = {nom: seance.nom, type: seance.type, description: seance.description, tel: seance.tel};
    return this._http.post(this._backendURL.allSeance, temp, this._options());
  }

  update(seance: any): Observable<any> {
    return this._http.put(this._backendURL.oneSeance.replace(':id', seance.id), seance, this._options());
  }

  delete(id: string): Observable<any[]> {
    return this._http.delete(this._backendURL.oneSeance.replace(':id', id), this._options())
      .filter(_ => !!_)
      .defaultIfEmpty([]);
  }

  private _options(headerList: Object = {}): any {
    const headers = new HttpHeaders(Object.assign({ 'Content-Type': 'application/json' }, headerList));
    return { headers };
  }
}
