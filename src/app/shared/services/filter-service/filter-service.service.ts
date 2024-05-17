import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FilterServiceService {

  constructor() { }
  applyFilter(dataSource: any[], searchTerm: string): any[] {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    return dataSource.filter(element =>
      Object.values(element).some(value =>
        value && typeof value === 'string' && value.toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
  }
}
