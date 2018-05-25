import { ActivatedRoute } from "@angular/router";
import { Component, ElementRef, ViewChild } from '@angular/core';
import { HttpErrorResponse } from "@angular/common/http";

import { JsonEditorComponent, JsonEditorOptions } from 'ang-jsoneditor';
import { PublishingService } from "../../services/publishing-service/publishing.service";

@Component({
    selector: 'app-publishing',
    templateUrl: './publishing.component.html',
    styleUrls: ['./publishing.component.css']
})
export class PublishingComponent {
    public data: any;
    public editorOptions: JsonEditorOptions;
    @ViewChild(JsonEditorComponent) editor: JsonEditorComponent;

    constructor(private route: ActivatedRoute,
                private publishingService: PublishingService) {

        this.editorOptions = new JsonEditorOptions();
        // set all allowed modes
        this.editorOptions.modes = ['code', 'text', 'tree', 'view'];
        // ⇊if we would have another json, we should modify this part⇊
        this.route.data
            .subscribe((res: any) => {
                    this.data = res.publishing;
                },
                (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                        console.log('Client-side error occurred.');
                    } else {
                        console.log('Server-side error occurred.');
                    }
                }
            );
    }

    saveJson() {
        let JsonData = {publishing: this.editor.get()}
        this.publishingService.saveJson(JSON.stringify(JsonData))
            .subscribe((response: any) => {
                    console.log(response);
                    window.alert(response.message);
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
