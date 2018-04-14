import { StorageUtil } from './StorageUtil';
import { OnInit } from '@angular/core';
import { CommonServices } from '../services/common.service';
import { TaskCode } from '../globals';
import { BaseModelResponse } from '../models/BaseModelResponse';
// import { Logger } from './utils/Logger';
import { HttpRequest, HttpGenericRequest } from './models/HttpRequest';
import { DownloadManager } from './DownloadManager';
import { Router } from '@angular/router/src/router';

export class BaseComponent implements OnInit {

    constructor(protected commonService: CommonServices, protected router: Router) { }

    ngOnInit() {
    }

    downloadData(req: HttpRequest) {
        this.checkLocalStorage(req);
        const manager = new DownloadManager(this, this.commonService);
        manager.downloadData(req);
    }

    checkOnline() {
        return true;
    }


    checkLocalStorage(req: HttpRequest) {
        if (req.storageKeyName) {
            const response = StorageUtil.getConvertedObjFromLocalStorage(req.storageKeyName, req.classTypeValue);
            if (response) {
                this.onResponseReceived(req.taskCode, response);
            }
        }
    }

    showCommonLoader(taskCode: TaskCode) {
		document.getElementById('commonFullLoader').style.display = 'block';
	}
	hideCommonLoader(taskCode: TaskCode) {
		document.getElementById('commonFullLoader').style.display = 'none';
	}

    onPreExecute(taskCode: TaskCode) {
        switch (taskCode) {
            default:
                this.showCommonLoader(taskCode);
                break;
        }
    }

    onErrorReceived(taskCode: TaskCode) {
        this.hideCommonLoader(taskCode);
        console.log('on error recevied of base compo');
    }

    onResponseReceived(taskCode: TaskCode, response: any) {
        // Logger.log(response);
        this.hideCommonLoader(taskCode);
        if (response instanceof BaseResponse) {
            return !response.error;
        }
        return true;
    }
    onTokenInvalid(response: any) {
        alert(response.message);
        // log out here
    }
    
    onApiError(taskCode: TaskCode, response: any) {
    }

    
}
