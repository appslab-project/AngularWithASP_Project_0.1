import { CommonModule } from '@angular/common';
import { Component, signal, inject, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatTooltip } from '@angular/material/tooltip';
import { ModelServiceService, Modeldto } from '../Service/model-service.service';
import { MatSelectModule } from '@angular/material/select';
import { MatToolbar } from '@angular/material/toolbar';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDividerModule } from '@angular/material/divider';
import { RouterModule } from '@angular/router';
import { AuthenticationService } from '../api-authorization/authentication.service';
import { HttpClient, HttpErrorResponse, HttpEventType } from '@angular/common/http';


@Component({
  selector: 'app-model-create',
  standalone: true,
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
export class ModelCreateComponent {

  public modelCreateForm: FormGroup;
  modelInfo = signal<Modeldto[]>(undefined);
  private authService: AuthenticationService = inject(AuthenticationService);


  ownerId: string;
  modelName: string;
  category: string;
  description: string;

  public message: string;
  public progress: number;

  @Output() public onUploadFinished = new EventEmitter();

  constructor(private model_service: ModelServiceService, private formBuilder: FormBuilder, private http: HttpClient) {

    this.modelCreateForm = this.formBuilder.group({
      modelName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit() {
    this.modelName = this.modelCreateForm.value.modelName;
    this.category = this.modelCreateForm.value.category;
    this.description = this.modelCreateForm.value.description;
    this.ownerId = this.authService.getCurrentId();
    // TODO: Use EventEmitter with form value
    this.model_service.createModel(this.modelName, this.category, this.description, this.ownerId).subscribe(modelPage => {
      this.modelInfo.set(modelPage)

    }, error => console.error(error));
  }

  uploadFile = (files) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:5001/api/upload', formData, { reportProgress: true, observe: 'events' })
      .subscribe({
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
}
