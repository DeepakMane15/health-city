import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GoogleService {
  private apiUrl =
    'https://maps.googleapis.com/maps/api/place/autocomplete/json';

  constructor(private http: HttpClient) {}

  getAddressPredictions(input: string): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };

    const params = new HttpParams()
      .set('input', input)
      .set('types', 'geocode')
      .set('key', 'AIzaSyBAztsIXonxMQ3DP70bFYgqClDw1QvCIp4'); // Replace with your API key

    return this.http.get<any>(this.apiUrl, { params, ...httpOptions });
  }
}
