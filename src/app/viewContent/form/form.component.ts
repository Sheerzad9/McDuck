import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { ChartDataset, ChartOptions } from 'chart.js';
import { HttpService } from './http.service';
import { Subscription } from 'rxjs';

interface MyFormData {
  cryptoCurrency: string;
  toCurrency: string;
  fromDate: string;
  toDate: string;
}

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  mySub: Subscription;
  //chartData: fromHttpService.ChartModel | null;
  myForm: FormGroup;
  todaysDate = new Date();
  dateMax: string = `${this.todaysDate.getFullYear()}-${
    this.todaysDate.getMonth() + 1 < 10
      ? '0' + (+this.todaysDate.getMonth() + 1)
      : this.todaysDate.getMonth() + 1
  }-${
    this.todaysDate.getDate() < 10
      ? '0' + this.todaysDate.getDate()
      : this.todaysDate.getDate()
  }`;

  dateMin: string;
  chartDataIsNotEmpty: boolean = false;

  // Setting chart variables
  public data: ChartDataset[];
  public labels: string[];
  public options: ChartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  constructor(private http: HttpClient, private httpServices: HttpService) {}

  ngOnInit(): void {
    this.mySub = this.httpServices.chartDataChanged.subscribe((chartData) => {
      if (chartData) {
        this.data = [
          {
            data: chartData.pricePerDay,
            label: 'Bitcoin in Euro',
          },
        ];
        this.labels = chartData.labels;
        this.chartDataIsNotEmpty = true;
      }
      console.log(chartData);
    });
  }

  async onSubmit(formData: NgForm) {
    const myFormValues: MyFormData = formData.value;

    // Changing date's to unix timestamp
    const fromDateInUnix = Math.floor(
      new Date(myFormValues.fromDate).getTime() / 1000
    );
    // Adding 1 hour to get next days data aswell
    const toDateInUnix = Math.floor(
      new Date(myFormValues.toDate).getTime() / 1000 + 75 * 60
    );
    console.log('From unix = ' + fromDateInUnix + ' To unix = ' + toDateInUnix);

    console.log(myFormValues);
    const url: string = `https://api.coingecko.com/api/v3/coins/${myFormValues.cryptoCurrency}/market_chart/range?vs_currency=${myFormValues.toCurrency}&from=${fromDateInUnix}&to=${toDateInUnix}`;

    this.httpServices.fetchDataAndGetDates(url);

    formData.resetForm();
    //this.fetchDataAndAssign(url);
    //this.chartData = await this.httpServices.fetchDataAndGetDates(url);
    // if (this.chartData) {
    //   this.data = [
    //     {
    //       data: this.chartData.pricePerDay,
    //       label: 'Bitcoin in Euro',
    //     },
    //   ];
    //   this.labels = this.chartData.labels;
    //   this.chartDataIsNotEmpty = true;
    // }
    // console.log(this.chartData);
    // formData.resetForm();
  }
}
