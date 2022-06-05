import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

export interface APIResponseLoad {
  prices: number[][];
  market_caps: number[];
  total_volumes: number[];
}

export interface ChartModel {
  labels: string[];
  pricePerDay: number[];
  daysInUnixTimeStamp: number[];
}

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  chartDataChanged = new Subject<ChartModel>();
  chartData: ChartModel | null;
  labels: string[];
  daysInUnixTimeStamp: number[];
  pricePerDay: number[];
  responseData: APIResponseLoad;

  constructor(private http: HttpClient) {}

  async fetchDataAndGetDates(url: string) {
    // Getting response data with get request
    // this.responseData = await this.http.get<APIResponseLoad>(url).toPromise();

    await this.http.get<APIResponseLoad>(url).subscribe(
      (response) => {
        console.log(response);
        this.chartData = this.getSpecificDates(response.prices);
        if (this.chartData) this.chartDataChanged.next(this.chartData);
      },
      (reject) => {
        alert('Error in API request');
      }
    );

    // if (this.responseData !== undefined) {
    //   // Getting one price value per date (date = nearest 00:00 time of the date)
    //   this.chartData = this.getSpecificDates(this.responseData.prices);
    //   if (this.chartData !== null) this.chartDataChanged.next(this.chartData);
    // }
    // console.log(this.chartData);
    return this.chartData;
  }

  private getSpecificDates(dates: number[][]): ChartModel | null {
    if (dates.length === 0) return null;

    // Clearing values from arrays in case there is some from previous search
    this.labels = [];
    this.pricePerDay = [];
    this.daysInUnixTimeStamp = [];

    for (let i = 0, j = 0; i < dates.length / 24; i++) {
      // Saving times in unixTimeStamp
      this.daysInUnixTimeStamp.push(+dates[j][0]);

      let date = new Date(dates[j][0]);
      //   myArr.push(dates[j]);
      let fromUnixtoReadable =
        date.getUTCDate() +
        '.' +
        (date.getUTCMonth() + 1) +
        '.' +
        date.getUTCFullYear();
      this.labels.push(fromUnixtoReadable);
      this.pricePerDay.push(+dates[j][1].toFixed(2));
      j += 24;
    }

    return {
      labels: this.labels,
      pricePerDay: this.pricePerDay,
      daysInUnixTimeStamp: this.daysInUnixTimeStamp,
    };
  }
}