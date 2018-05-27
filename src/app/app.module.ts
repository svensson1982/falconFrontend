import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';

/*Components*/
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { ChartComponent } from './components/chart/chart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublishingComponent } from './components/publishing/publishing.component';

/*Services*/
import { GlobalService } from './services/global/global.service';
import { ChartService } from "./services/chart-service/chart.service";
import { PublishingService } from './services/publishing-service/publishing.service';

/*Module*/
import { ChartModule } from 'angular-highcharts';
import { NgJsonEditorModule } from 'ang-jsoneditor';
import { AppRoutingModule } from './app-routing/app-routing.module';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        ChartComponent,
        NotFoundComponent,
        PublishingComponent,
    ],
    imports: [
        ChartModule,
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgJsonEditorModule,
    ],
    providers: [
        ChartService,
        GlobalService,
        PublishingService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
