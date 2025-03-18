import { Pipe, PipeTransform } from '@angular/core';
import { Modeldto } from '../Service/model-service.service';

@Pipe({
  name: 'filterPipe'
})
export class FilterPipe implements PipeTransform {
  transform(models: Modeldto[], searchText: string): Modeldto[] {
    if (!models || !searchText) {
      return models;
    }
    return models.filter(model =>
      model.name.toLowerCase().includes(searchText.toLowerCase())
    );
  }
}
