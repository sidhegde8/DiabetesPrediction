import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'https://backend-service-936845130727.us-central1.run.app'; 

  constructor(private http: HttpClient) {}

  predictDiabetes(data: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/api/predict`, data);
  }
}