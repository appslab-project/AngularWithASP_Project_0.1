import { Component, Injectable, signal, OnInit } from '@angular/core';
import { ActivatedRoute} from '@angular/router'
import { ModelServiceService, ModelDetailsdto } from '../Service/model-service.service';
import { CommonModule } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
@Component({
  selector: 'app-models-details',
  standalone: true,
  imports: [
    CommonModule,
    
  ],
  templateUrl: './models-details.component.html',
  styleUrl: './models-details.component.css'
})
export class ModelsDetailsComponent {
  modelIdFromRoute: number;
  modelDetailInfo = signal<ModelDetailsdto[]>(undefined);
  constructor(private model_service: ModelServiceService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    // Get guild Id
    const routeParams = this.route.snapshot.paramMap;
    this.modelIdFromRoute = Number(routeParams.get('modelId'));

    this.model_service.getDetails(this.modelIdFromRoute).subscribe(modelDetailsPage => {
      this.modelDetailInfo.set(modelDetailsPage);
    }, error => console.error(error));
  }
}
