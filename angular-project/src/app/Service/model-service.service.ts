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
  createModel(modelName: string, category: string, description: string) {
    let queryParams = new HttpParams()
      .set("modelName", modelName)
      .set("category", category)
      .set("description", description)

    return this.http.put<number>(this.baseUrl + '/models/createModel', null, { params: queryParams });

  }
  getMyModels() {

    return this.http.get<Modeldto[]>(this.baseUrl + '/models/getMyModel')
  }
  deleteThisModel(id: number) {
    let queryParams = new HttpParams()
      .set("id", id)
    return this.http.put<Modeldto[]>(this.baseUrl + '/models/deleteModel', null, { params: queryParams });
  }
  uploadModelImage(formData: FormData) {

    return this.http.post( this.baseUrl + '/models/uploadImage', formData, { reportProgress: true, observe: 'events' })
  }
  submitLike(modelId: number) {
    let queryParams = new HttpParams()
      .set("modelId", modelId)
    return this.http.put<number>(this.baseUrl + '/models/submitLikes', null, { params: queryParams });

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
  modelPath: string;
}

export interface ModelCreateDto {
  ownerId: string;
  name: string;
  description: string;
  category: string;
}
