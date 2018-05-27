import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

/* Components */
import { ChartComponent } from "../components/chart/chart.component";
import { NotFoundComponent } from "../components/not-found/not-found.component";
import { PublishingComponent } from "../components/publishing/publishing.component";

/*Services*/
import { ChartService } from "../services/chart-service/chart.service";
import { PublishingService } from '../services/publishing-service/publishing.service';

const appRoutes: Routes = [
    {pathMatch: 'full', path: '', redirectTo: '/publishing'},
    {path: 'publishing', component: PublishingComponent, resolve: {publishing: PublishingService}},
    {path: 'charts', component: ChartComponent,  resolve: {chartData: ChartService}},

    {path: 'not-found', component: NotFoundComponent},
    {path: '**', redirectTo: '/not-found'},

];

@NgModule({
    imports: [
        RouterModule.forRoot(appRoutes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule {
}
