import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,) { }

  /*getDetails(id: number): Observable < GuildDetaildto > {
  let queryParams = new HttpParams();
  queryParams = queryParams.append("id", id);
  return this.http.get<GuildDetaildto>(this.baseUrl + '/guild/guildDetails', { params: queryParams });
  }*/
  getModels() {

    return this.http.get<Modeldto[]>(this.baseUrl + '/models/getModel')
  }

  getDetails(id: number) : Observable<ModelDetailsdto> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<ModelDetailsdto>(this.baseUrl + '/models/getModelDetails', { params: queryParams });
  }
}

export interface Modeldto {
  id: number;
  name: string;
  category: string;
  likes: number;
  ownerId: number;
}
export interface ModelDetailsdto {
  id: number;
  name: string;
  category: string;
  likes: number;
  ownerId: number;
  description: string;
}
