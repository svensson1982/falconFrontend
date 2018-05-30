import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { Chart } from 'angular-highcharts';
import { ChartService } from '../../services/chart-service/chart.service';

@Component({
    selector: 'app-chart',
    templateUrl: './chart.component.html',
    styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
    data: any;
    chart: any;

    constructor(private route: ActivatedRoute,
                private chartService: ChartService) {
    }

    ngOnInit() {
        this.route.data
            .subscribe((res: any) => {
                    let timestamps: string[] = [],
                        postImpressions: number[] = [],
                        postImpressionsOrganic: number[] = [],
                        postImpressionsViral: number[] = [],
                        postImpressionsPaid: number[] = [];

                    this.data = res.chartData;

                    res.chartData.forEach(element => {
                        if (Object.keys(element).length > 0) {
                                let d = new Date(element.post_impressions[0].timestamp);
                                timestamps.push(d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' ' + d.getHours() + ':' +
                                    + d.getMinutes() + ':' + d.getSeconds());
                                postImpressions.push(Number(element.post_impressions[0].value));
                                postImpressionsOrganic.push(Number(element.post_impressions_organic[0].value));
                                postImpressionsViral.push(Number(element.post_impressions_viral[0].value));
                                postImpressionsPaid.push(Number(element.post_impressions_paid[0].value));
                            }
                    });

                    this.chart = new Chart({
                        chart: {
                            type: 'line',
                        },
                        title: {
                            text: 'Reach data'
                        },
                        credits: {
                            enabled: false
                        },
                        xAxis: {
                            categories: [...timestamps]
                        },
                        series: [
                            {
                                name: 'postImpressions',
                                data: [...postImpressions]
                            }, {
                                name: 'postImpressionsOrganic',
                                data: [...postImpressionsOrganic]
                            }, {
                                name: 'postImpressionsViral',
                                data: [...postImpressionsViral]
                            }, {
                                name: 'postImpressionsPaid',
                                data: [...postImpressionsPaid]
                            },
                        ]
                    });

                    console.log(this.chart);
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log('Client-side error occurred.');
                    } else {
                        console.log('Server-side error occurred.');
                    }
                }
            );
        this.chartService.receivePoints()
            .subscribe((random) => {
                // timestamp
                this.chart.ref.axes[0].categories
                    .push(new Date(new Date().toString().split('GMT')[0] + ' UTC').toISOString().split('.')[0].replace('T', ' '));
                // data
                this.chart.ref.series[0].addPoint(random.random1);
                this.chart.ref.series[1].addPoint(random.random2);
                this.chart.ref.series[2].addPoint(random.random3);
                this.chart.ref.series[3].addPoint(random.random4);

            });

    }

    // add point to chart series
    addPoints(): void {
        const randoms = {
            random1: Math.round(Math.random() * 100000),
            random2: Math.round(Math.random() * 100000),
            random3: Math.round(Math.random() * 100000),
            random4: Math.round(Math.random() * 10)
        };
        this.chartService.addPoints(randoms);
    }


}
