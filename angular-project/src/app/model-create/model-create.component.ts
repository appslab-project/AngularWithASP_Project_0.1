import { CommonModule } from '@angular/common';
import { Component, signal, inject, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { ModelServiceService, Modeldto } from '../Service/model-service.service';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../api-authorization/authentication.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';



@Component({
    selector: 'app-model-create',
    imports: [
      CommonModule,
      MatToolbar,
      MatButton,
      FormsModule,
      ReactiveFormsModule,
      MatFormFieldModule,
      MatInputModule,
      MatSelectModule,
      MatButtonModule,
      MatDividerModule,
      MatTooltip,
      RouterModule,
    ],
    templateUrl: './model-create.component.html',
    styleUrl: './model-create.component.css'
})
export class ModelCreateComponent implements OnInit {

  public modelCreateForm: FormGroup;
  modelInfo = signal<number | undefined> (undefined);

  ownerId: string;
  modelName: string;
  category: string;
  description: string;

  public message: string;
  public progress: number;

  public messageFile: string;
  public progressFile: number;


  //emitter uploadu

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private model_service: ModelServiceService, private formBuilder: FormBuilder, private http: HttpClient, private router: Router) {

    this.modelCreateForm = this.formBuilder.group({
      modelName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.modelCreateForm.valid) {
      this.modelName = this.modelCreateForm.value.modelName!;
      this.category = this.modelCreateForm.value.category!;
      this.description = this.modelCreateForm.value.description!;

      this.model_service.createModel(this.modelName, this.category, this.description).subscribe({
        next: (modelPage) => {
          this.router.navigate(['/modelEdit', modelPage]);
        },
        error: (error) => {
          console.error(error);
        }
      });
    }
  }

  ngOnInit(): void {

  }

  // Nefunkcny kód ale radsej ho tu zatial nechávam


  //uploadFile = (files) => {
  //  if (files.length === 0) {
  //    return;
  //  }
  //  let fileToUpload = <File>files[0];
  //  const formData = new FormData();
  //  formData.append('file', fileToUpload, fileToUpload.name);

  //  this.http.post('https://localhost:7186/Models/upladFile', formData, { reportProgress: true, observe: 'events' })
  //    .subscribe({
  //      next: (event) => {
  //        if (event.type === HttpEventType.UploadProgress)
  //          this.progress = Math.round(100 * event.loaded / event.total);
  //        else if (event.type === HttpEventType.Response) {
  //          this.message = 'Upload success.';
  //          this.onUploadFinished.emit(event.body);
  //        }
  //      },
  //      error: (err: HttpErrorResponse) => console.log(err)
  //    });
  //}





  //funkcny kod

  onChangeImage(event: any) {
    debugger;
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      if (file.type == 'image/jpg' || file.type == 'image/jpeg' || file.type == 'image/png') {
        const formData = new FormData();
        formData.append('file', file)
        this.http.post('https://localhost:7186/Models/uploadImage', formData, { reportProgress: true, observe: 'events' }).subscribe({
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
    debugger;
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


