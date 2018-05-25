import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from '@angular/platform-browser';

/*Components*/
import { AppComponent } from './app.component';
import { NavComponent } from './shared/nav/nav.component';
import { ChartComponent } from './components/chart/chart.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PublishingComponent } from './components/publishing/publishing.component';

/*Services*/
import { PublishingService } from "./services/publishing-service/publishing.service";

/*Module*/
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
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        NgJsonEditorModule,
    ],
    providers: [PublishingService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
