import { Component, Injectable, OnInit, signal, inject } from '@angular/core';
import { ModelServiceService, Modeldto, ModelCreateDto } from '../Service/model-service.service';
import { CommonModule } from '@angular/common';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { MatTooltip } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from '../api-authorization/authentication.service';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule,
    MatToolbar,
    MatButton,
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatTooltip,
    MatCardModule,
  ],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})
export class ModelsComponent {

  public modelCreateForm: FormGroup;
  modelInfo = signal<Modeldto[]>(undefined);
 
  modelName: string;
  category: string;
  description: string;
  picturePath: string;
  constructor(private model_service: ModelServiceService, private formBuilder: FormBuilder) {

    this.modelCreateForm = this.formBuilder.group({
      modelName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit() {

    this.model_service.getModels().subscribe(modelPage => {
      this.modelInfo.set(modelPage);
    }, error => console.error(error));
  }
  onSubmit() {
    this.modelName = this.modelCreateForm.value.modelName;
    this.category = this.modelCreateForm.value.category;
    this.description = this.modelCreateForm.value.description;
 
    // TODO: Use EventEmitter with form value
    this.model_service.createModel(this.modelName, this.category, this.description).subscribe(modelPage => {
      this.modelInfo.set(modelPage)

    }, error => console.error(error));
  }

}
