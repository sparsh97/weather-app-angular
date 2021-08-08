import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(
    private http: HttpClient
  ) { }

  getWeatherDetails(cityName: string): Observable<any>{
    return this.http.get<any>(environment.weatherApi+`?q=${cityName}&units=metric&appid=${environment.weatherKey}`);
  }
}
