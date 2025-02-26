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

@Component({
    selector: 'app-my-models',
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
    templateUrl: './my-models.component.html',
    styleUrl: './my-models.component.css'
})
export class MyModelsComponent {
  modelInfo = signal<Modeldto[]>(undefined);

  constructor(private model_service: ModelServiceService ) {


  }
  likeModel(model: any, event: Event): void {
    event.stopPropagation(); // Zastaví propagáciu udalosti na rodičovské prvky
    model.likes += 1; // Príklad: Zvýši počet lajkov (prispôsobte podľa potreby)
    console.log(`Liked model: ${model.name}`);
  }


  ngOnInit() {

    this.model_service.getMyModels().subscribe(modelPage => {
      this.modelInfo.set(modelPage);
    }, error => console.error(error));
  }

  deleteModel(id: number) {
    this.model_service.deleteThisModel(id).subscribe(modelPage => {
      this.modelInfo.set(modelPage);
    }, error => console.error(error));
  }
}
