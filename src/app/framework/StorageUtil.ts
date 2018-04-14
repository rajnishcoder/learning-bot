import { JsonParser } from './ApiGenerator';
import { ClassType } from 'class-transformer/ClassTransformer';
import { classToPlain } from 'class-transformer';

export class StorageUtil {
    static setItem(key: string, value: string) {
        localStorage.setItem(key, value);
    }

    static getItem(key: string) {
        return localStorage.getItem(key);
    }

    static convertObjToString(dataObj: any) {
        if (dataObj !== undefined) {
            return JSON.stringify(classToPlain(dataObj));
        } else {
            return null;
        }
    }

    static convertStringToObj(dataString: string, classTypeValue: ClassType<any>) {
        const json = JSON.parse(dataString);
        if (json) {
            return JsonParser.parseJson(json, classTypeValue);
        } else {
            return null;
        }
    }

    static saveJsonObjToLocalStorage(response: any, keyName: string) {
        if (response) {
            const dataString = JSON.stringify(response);
            if (dataString) {
                this.setItem(keyName, dataString);
            }
        }
    }


    static saveObjToLocalStorage(response: any, keyName: string) {
        const dataString = this.convertObjToString(response);
        if (dataString) {
            this.setItem(keyName, dataString);
        }
    }



    static getConvertedObjFromLocalStorage(keyName: string, classTypeValue: ClassType<any>) {
        const dataString = this.getItem(keyName);
        if (dataString) {
            return this.convertStringToObj(dataString, classTypeValue);
        } else {
            return null;
        }
    }

    static clearAll() {
        localStorage.clear();
    }


    // static saveQueueList(response: QueueModelResponse) {
    //     this.saveObjToLocalStorage(response, KeyNames.QUEUE_LIST_RESPONSE);
    // }
    // static getQueueList() {
    //     return this.getConvertedObjFromLocalStorage(KeyNames.QUEUE_LIST_RESPONSE, QueueModelResponse);
    // }



}


export class KeyNames {
    static sample = 'test';
    }
