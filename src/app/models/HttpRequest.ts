import { BaseModelResponse } from './BaseModelResponse';
import { Http, Request, RequestMethod, Response, Headers, RequestOptions } from '@angular/http';
import { ClassType } from 'class-transformer/ClassTransformer';

export class HttpRequest  {
	url: string;
	params: any;
	taskCode: number;
    headers: Headers;
	method: string;
	classTypeValue: ClassType<any> = BaseModelResponse;
	isArrayResponse: false;
	storageKeyName: string;


	constructor(url: string) {
		this.url = url;
		this.method = 'GET';
		this.headers = new Headers();
        this.addDefaultHeaders();
	}

	addDefaultHeaders() {
		this.addHeader('Content-Type', 'application/json');
		// for production
		this.addHeader('authToken', localStorage.getItem('loginT'));
		this.addHeader('roleType', '1');
		// for testing
		// this.addHeader('authToken', '12345678');
		// this.addHeader('roleType', '4');
	}

	removeDefaultHeaders() {
		this.removeHeader('authToken');
		this.removeHeader('roleType');
		this.removeHeader('Content-Type');
	}

	removeHeader(key: string) {
		this.headers.delete(key);
	}

	setPostMethod() {
		this.method = 'POST';
	}

	setPutMethod() {
		this.method = 'PUT';
	}

	setPatchMethod() {
		this.method = 'PATCH';
	}

	setDeleteMethod() {
		this.method = 'DELETE';
	}

	addHeader(key: string, value: string) {
		this.headers.append(key, value);
	}
}
export class HttpGenericRequest<T> extends HttpRequest {
    classType: ClassType<T>;
    constructor(url: string) {
        super(url);
    }
}
