import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../Services/weather.service';

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit {
  place: string | undefined;
  temparture: number | undefined;
  windSpeed: number | undefined;
  humidty: number | undefined;
  sunrise: any | undefined;
  sunset: any | undefined;
  placeCode: string |undefined;
  timezoneb: any | undefined;
  
  constructor(
    private weatherService: WeatherService
  ) { }

  ngOnInit(): void {
    this.getWeatherDetails("Varanasi");
  }

  getWeatherDetails(cityName: string){
    this.weatherService.getWeatherDetails(cityName).subscribe(res =>{
      if(res){
        this.place = res['name'];
        this.temparture = res['main']['temp'];
        this.humidty = res['main']['humidity'];
        this.sunrise = this.convertTime(res['sys']['sunrise'],res['timezone']);
        this.sunset = this.convertTime(res['sys']['sunset'],res['timezone']);
        this.placeCode = res['sys']['country'];
        this.windSpeed = res['wind']['speed'];
        this.timezoneb = res['timezone'];
        console.log(res);
      }
    },(error) =>{
      console.log(error);
    });
  }

  timeToAMPM = (time:any) => {
    let hours = time.split(":")[0];
    let minutes = time.split(":")[1];
    hours = hours % 12;
    hours = hours ? hours : 12;
    return hours + ":" + minutes;
  };

  convertTime = (unixSeconds:any, timezone:any) => {
    const time = new Date((unixSeconds + timezone) * 1000)
      .toISOString()
      .match(/(\d{2}:\d{2})/);
  
    return time;
  };

}
