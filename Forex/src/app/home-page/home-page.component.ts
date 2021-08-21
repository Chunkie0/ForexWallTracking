import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  results: any;
  userInput = { firstCurrency: '', secondCurrency: '', interval: 2 };
  userInputForm!: FormGroup;
  currencyString: string = "";
  notInitialized: boolean = true;
  currencyInterval: any;
  constructor() { }

  ngOnInit(): void {
    this.userInputForm = new FormGroup({
      firstCurrency: new FormControl(this.userInput.firstCurrency, Validators.required),
      secondCurrency: new FormControl(this.userInput.secondCurrency, Validators.required),
      interval: new FormControl(this.userInput.interval, [Validators.max(600)])
    })
  }

  onSubmit() {
    this.currencyString = this.input.firstCurrency.value + this.input.secondCurrency.value
    
    if (this.notInitialized) {
      this.fetchCurrency(this.currencyString);
      this.notInitialized = false;
    }

    clearInterval(this.currencyInterval)

    this.currencyInterval = setInterval(() => {
      this.fetchCurrency(this.currencyString)
    }, this.input.interval.value * 1000)
  }

  get input() { return this.userInputForm.controls }

  private async fetchCurrency(currency: string): Promise<any> {
    
    const getCurrency = await fetch(`https://financialmodelingprep.com/api/v3/fx/${currency}?apikey=696cb5103decbd1a9cc7a96dffd0ee73`)
    getCurrency.json().then(data => {
      this.results = data
      if (this.results[0].ticker === null) {
        this.notInitialized = true
        clearInterval(this.currencyInterval)
        alert("No such currency pair available. Try different one!:)")
      }
    })
  }

  dateTime() {
    const today = new Date();
    return today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate() + ' ' + today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  }

}
