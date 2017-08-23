import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { DisplayComponent } from './display/display.component';
import { GoodsService } from './goods.service';

import { ChartsModule } from 'ng2-charts';
import { SearchPipe } from './pipe/search.pipe';
@NgModule({
  declarations: [
    AppComponent,
    DisplayComponent,
    SearchPipe,

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ChartsModule
  ],
  providers: [GoodsService],
  bootstrap: [AppComponent]
})
export class AppModule { }
