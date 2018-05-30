import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';

import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { PublishingService } from '../../services/publishing-service/publishing.service';

@Component({
    selector: 'app-publishing',
    templateUrl: './publishing.component.html',
    styleUrls: ['./publishing.component.css']
})
export class PublishingComponent implements OnInit{
    public jsonData: any;
    public editorOptions: JsonEditorOptions;
    @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

    constructor(private route: ActivatedRoute,
                private publishingService: PublishingService) {
        // we get data from json
        this.route.data
            .subscribe((res: any) => {
                    this.jsonData = res.publishing;
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log('Client-side error occurred.');
                    } else {
                        console.log('Server-side error occurred.');
                    }
                }
            );

        this.editorOptions = new JsonEditorOptions();
        // set all allowed modes
        this.editorOptions.modes = ['code', 'text', 'tree', 'view'];

    }

    ngOnInit(){
        // when we have new data or something removed/updated
        this.publishingService.receiveData()
            .subscribe((data) => {
                console.log(data);
                this.jsonData = data;
                window.alert('updated');
            });
    }

    /**
     * Save the modified data, send to backend.
     */
    saveJson() {
        // get the modified json data
        let JsonData = {publishing: this.editor.get()}
        this.publishingService.saveJson(JSON.stringify(JsonData))
            .subscribe((response: string) => {
                    this.publishingService.addData(this.editor.get());
                    // window.alert(response.message);
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log('Client-side error occurred.');
                    } else {
                        console.log('Server-side error occurred.');
                    }
                });
    }

}
