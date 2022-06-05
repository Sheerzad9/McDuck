import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header/header.component';
import { FormComponent } from './viewContent/form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { NgChartsModule } from 'ng2-charts';
import { AdditionalInformationListComponent } from './viewContent/form/additional-information-list/additional-information-list.component';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FormComponent, AdditionalInformationListComponent],
  imports: [BrowserModule, FormsModule, HttpClientModule, NgChartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
