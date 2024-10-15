import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModelServiceService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string,) { }

  

  getModels() {

    return this.http.get<Modeldto[]>(this.baseUrl + '/models/getModel')
  }

  getDetails(id: number) : Observable<ModelDetailsdto> {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<ModelDetailsdto>(this.baseUrl + '/models/getModelDetails', { params: queryParams });
  }
  createModel(modelName: string, category: string, description: string,  ownerId: string) {
    let queryParams = new HttpParams()
      .set("modelName", modelName)
      .set("category", category)
      .set("description", description)
      .set("ownerId", ownerId);

    return this.http.put<Modeldto[]>(this.baseUrl + '/models/createModel', null, { params: queryParams });

  }
  getMyModels(id:string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<Modeldto[]>(this.baseUrl + '/models/getMyModel', { params: queryParams })
  }
  deleteThisModel(id: number, ownerId: string) {
    let queryParams = new HttpParams()
      .set("id", id)
      .set("ownerId", ownerId);
    return this.http.put<Modeldto[]>(this.baseUrl + '/models/deleteModel', null, { params: queryParams });
  }
}

export interface Modeldto {
  id: number;
  name: string;
  category: string;
  likes: number;
  ownerId: string;
  picturePath: string;
}
export interface ModelDetailsdto {
  id: number;
  name: string;
  category: string;
  likes: number;
  ownerId: string;
  description: string;
  picturePath: string;
}

export interface ModelCreateDto {
  ownerId: string;
  name: string;
  description: string;
  category: string;
}
