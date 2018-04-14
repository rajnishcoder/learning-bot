import { CommonServices } from './../services/common.service';
import { StorageUtil } from './StorageUtil';
import { HttpRequest, HttpGenericRequest } from '../models/HttpRequest';
import { BaseComponent } from './BaseCompo';
import { Http } from '@angular/http';
import { ApiGenerator, JsonParser } from './ApiGenerator';
import { TaskCode } from '../globals';
import { Router } from '@angular/router';

export class DownloadManager {
    protected commonService: CommonServices;
    protected c: BaseComponent;
    constructor(c: BaseComponent, service: CommonServices) {
        this.c = c;
        this.commonService = service;
    }
    downloadData(req: HttpRequest) {
        this.onPreExecute(req.taskCode);
        this.commonService.callAPI(req)
            .subscribe(
            res => {
                if (res.error === true) {
                    if (res.code === '401') {
                        this.onTokenInvalid(res);
                    }
                }
                this.onResponseReceived(req.taskCode, res, req);
            },
            error => { this.onErrorReceived(req.taskCode); },
            () => { }
            );
    }
    onTokenInvalid(response: any) {
        this.c.onTokenInvalid(response);
    }
    onPreExecute(taskCode: TaskCode) {
        this.c.onPreExecute(taskCode);
    }

    onApiError(taskCode: TaskCode, response: any, req: HttpRequest) {
        this.c.onApiError(taskCode, this.parseJson(response, req));
    }

    onErrorReceived(taskCode: TaskCode) {
        console.log('onerrorrReceived of download data in data service class');
        // alert('error in api calling with taskcode =' + taskCode);
        this.c.onErrorReceived(taskCode);
    }
    onResponseReceived(taskCode: TaskCode, response: any, req: HttpRequest) {
        if (req.storageKeyName !== undefined && response !== undefined && response.error !== undefined && response.error === false){
            // console.log("SaveToStorage:" + req.storageKeyName);
            StorageUtil.saveJsonObjToLocalStorage(response, req.storageKeyName);
        }
        this.c.onResponseReceived(taskCode, this.parseJson(response, req));
    }

    parseJson(response: any, req: HttpRequest) {
        if (req.isArrayResponse) {
            return JsonParser.parseJsonArray(response, req.classTypeValue);
        } else {
            return JsonParser.parseJsonString(response, req.classTypeValue);
        }

    }

    saveJsonResponse(response: any, req: HttpRequest) {
        // convert response to string
        // jsonStringResponse: string =
        // sessionStorage.setItem(req.keyName,jsonStringResponse);
    }
}
