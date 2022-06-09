import { Injectable } from '@angular/core';
import { HttpService } from '../http.service';

export interface LongestDownwardDays {
  highestValue: number;
  downwardDays: number;
  from: number;
  to: number;
  isEmpty: boolean;
  bestDayToBuy: number;
  bestDayToSell: number;
  profit: number;
}

@Injectable({
  providedIn: 'root',
})
export class AdditionalInformationService {
  constructor(private httpService: HttpService) {}

  // Resetting values
  result: LongestDownwardDays = this.resetValues();

  countLongestDownwardDays(prices: number[], unixTimeStamps: number[]) {
    // Resetting values
    this.resetValues();

    // Setting highestValue
    const max = Math.max(...prices);
    const index = prices.indexOf(max);
    this.result.highestValue = index;

    console.log('Arr length: ' + prices.length);
    for (let i = 0; i < prices.length; i++) {
      let downwardsDays = 0;
      for (let j = i; j < prices.length - 1; j++) {
        if (prices[j] > prices[j + 1]) {
          downwardsDays++;
        }
        if (prices[j] < prices[j + 1]) {
          if (downwardsDays > this.result.downwardDays) {
            this.result.from = i;
            this.result.to = j;

            // Setting downward days via method
            this.result.downwardDays = this.countDaysBetweenTwoUnixTimeStamp(
              unixTimeStamps,
              this.result.from,
              this.result.to
            );
            this.result.isEmpty = false;
          }
          break;
        }
        // In case rest of the days are going downwards, including last one
        if (
          j + 1 === prices.length - 1 &&
          downwardsDays > this.result.downwardDays
        ) {
          this.result.from = i;
          this.result.to = j + 1;

          // Setting downward days via method
          this.result.downwardDays = this.countDaysBetweenTwoUnixTimeStamp(
            unixTimeStamps,
            this.result.from,
            this.result.to
          );
          this.result.isEmpty = false;
          break;
        }
      }
    }

    // Getting best days to buy and sell
    this.getBestDaysToBuyAndSell(prices);

    console.log(this.result);
    return this.result;
  }

  resetValues() {
    return (this.result = {
      highestValue: 0,
      downwardDays: 0,
      from: 0,
      to: 0,
      isEmpty: true,
      bestDayToBuy: 0,
      bestDayToSell: 0,
      profit: 0,
    });
  }

  getBestDaysToBuyAndSell(prices: number[]) {
    if (prices.length <= 1) return;

    let profit = 0;
    prices.forEach((currEl, index) => {
      for (let i = index + 1; i < prices.length - 1; i++) {
        console.log('i = ' + 1);
        if (prices[i] - currEl > profit) {
          profit = prices[i] - currEl;
          this.result.bestDayToBuy = index;
          this.result.bestDayToSell = i;
          this.result.profit = +profit.toFixed(2);
        }
      }
    });
  }

  countDaysBetweenTwoUnixTimeStamp(
    unixTimeStamps: number[],
    from: number,
    to: number
  ): number {
    const difference =
      new Date(unixTimeStamps[to]).getTime() -
      new Date(unixTimeStamps[from]).getTime();
    const totalDays = Math.ceil(difference / (1000 * 3600 * 24));
    console.log(totalDays);
    return totalDays === 1 ? totalDays : totalDays - 1;
  }
}
