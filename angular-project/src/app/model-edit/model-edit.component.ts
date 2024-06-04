import { Component, EventEmitter, Output, signal } from '@angular/core';
import { ModelDetailsdto, ModelServiceService } from '../Service/model-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { HttpClient, HttpErrorResponse, HttpEventType, HttpParams } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-model-edit',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    FormsModule

  ],
  templateUrl: './model-edit.component.html',
  styleUrl: './model-edit.component.css'
})
export class ModelEditComponent {
  modelIdFromRoute: number;
  modelDetailInfo = signal<ModelDetailsdto>(undefined);

  public progress: number;
  public message: string;

  public messageFile: string;
  public progressFile: number;
  public idOfModel: number;

  //emitter uploadu

  @Output() public onUploadFinished = new EventEmitter();


  constructor(private model_service: ModelServiceService, private route: ActivatedRoute, private http: HttpClient){

  }

  ngOnInit() {
    // Get model Id
    const routeParams = this.route.snapshot.paramMap;
    this.modelIdFromRoute = Number(routeParams.get('modelId'));

    this.model_service.getDetails(this.modelIdFromRoute).subscribe(modelDetailsPage => {
      this.modelDetailInfo.set(modelDetailsPage);
    }, error => console.error(error));
  }

  onChangeImage(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png') {
       
        const formData = new FormData();
        formData.append('file', file);
        formData.append('modelId', this.modelIdFromRoute.toString());

        this.http.post('https://localhost:7186/Models/uploadImage',  formData , { reportProgress: true, observe: 'events' }).subscribe({
          next: (event) => {
            if (event.type === HttpEventType.UploadProgress)
              this.progress = Math.round(100 * event.loaded / event.total);
            else if (event.type === HttpEventType.Response) {
              this.message = 'Upload success.';
              this.onUploadFinished.emit(event.body);
            }
          },
          error: (err: HttpErrorResponse) => console.log(err)
        });
      }
      else {
        alert("Invalid file format. Please insert valid file format. (.png, .jpg, .jpeg)")
      }
    }

  }


  onChangeFile(event: any) {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file)
      this.http.post('https://localhost:7186/Models/uploadFile', formData, { reportProgress: true, observe: 'events' }).subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress)
            this.progressFile = Math.round(100 * event.loaded / event.total);
          else if (event.type === HttpEventType.Response) {
            this.messageFile = 'Upload success.';
            this.onUploadFinished.emit(event.body);
          }
        },
        error: (err: HttpErrorResponse) => console.log(err)
      });
    }

  }
}
