import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ChartModel, HttpService } from '../http.service';
import {
  AdditionalInformationService,
  LongestDownwardDays,
} from './additionalInformation.service';

@Component({
  selector: 'app-additional-information-list',
  templateUrl: './additional-information-list.component.html',
  styleUrls: ['./additional-information-list.component.css'],
})
export class AdditionalInformationListComponent implements OnInit, OnDestroy {
  additionalInformation: LongestDownwardDays;
  dates: string;
  chartData: ChartModel;
  // = {
  //   labels: [],
  //   pricePerDay: [],
  // };
  chartIsEmpty: boolean = true;
  private mySubscription: Subscription;

  constructor(
    private httpService: HttpService,
    private additionalService: AdditionalInformationService
  ) {}

  ngOnInit() {
    // Setting the initial value
    this.additionalInformation = this.additionalService.resetValues();

    // Setting subscription up to listen chartData changes
    this.mySubscription = this.httpService.chartDataChanged.subscribe(
      (chartData: ChartModel) => {
        if (chartData === null) {
          this.additionalInformation = this.additionalService.resetValues();
          this.chartIsEmpty = true;
          return;
        }

        this.chartData = chartData;
        console.log(this.chartData);

        // Setting date
        this.dates = `${chartData.labels[0]} - ${
          chartData.labels[chartData.labels.length - 1]
        }`;

        this.additionalInformation =
          this.additionalService.countLongestDownwardDays(
            chartData.pricePerDay,
            chartData.daysInUnixTimeStamp
          );

        console.log(chartData);
        this.chartIsEmpty = false;
      }
    );
  }

  ngOnDestroy() {
    this.mySubscription.unsubscribe();
  }
}
