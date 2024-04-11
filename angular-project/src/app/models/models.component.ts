import { Component, Injectable, OnInit, signal } from '@angular/core';
import { ModelServiceService, Modeldto } from '../Service/model-service.service';
import { CommonModule } from '@angular/common';
import { MatButton } from '@angular/material/button';
import { MatToolbar } from '@angular/material/toolbar';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormControl, ReactiveFormsModule, FormGroup, Validators, FormsModule } from '@angular/forms';

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
    FormGroup,
    Validators
  ],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})
export class ModelsComponent {

  public modelCreateForm: FormControl;
  modelInfo = signal<Modeldto[]>(undefined);

  modelName: string;
  category: string;
  description: string;
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
   /* this.guildservice.addToGuildItem(this.guildName, this.description, this.maxMembers).subscribe(guildInfo => {
      this.GuildData.set(guildInfo)

    }, error => console.error(error));*/
  }

}
