import { Component, Injectable, OnInit, signal } from '@angular/core';
import { ModelServiceService, Modeldto } from '../Service/model-service.service';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-models',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './models.component.html',
  styleUrl: './models.component.css'
})
export class ModelsComponent {

  modelInfo = signal<Modeldto[]>(undefined);
  constructor(private model_service: ModelServiceService) {

  }

  ngOnInit() {

    this.model_service.getModels().subscribe(modelPage => {
      this.modelInfo.set(modelPage);
    }, error => console.error(error));
  }

}
