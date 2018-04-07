import { StorageUtil } from './../framework/StorageUtil';
import { Injectable } from '@angular/core';
import { Http, Request, RequestMethod, Response, Headers, RequestOptions } from '@angular/http';
import { HttpRequest } from '../models/HttpRequest';
// import { Router } from "@angular/router";

// import 'rxjs/add/operator/timeout';
@Injectable()
export class CommonServices{
	constructor(
		private http: Http
	) {}

	hideSideBar() {
        const sideBarCss = 'margin-left:0;width:100%;';
        const sideBar = document.getElementById('sideBar');
        if (sideBar) {
            sideBar.style.display = "none";
        }
        document.getElementById('rightMainWrap').style.cssText = sideBarCss;
        document.getElementById('logOutBtn').style.display = "none";
    }

    showSideBar(){
    	const sideBar = document.getElementById('sideBar');
        sideBar.style.display = "block";
        document.getElementById('rightMainWrap').removeAttribute('style');
        document.getElementById('logOutBtn').style.display = "block";
    }

	getApi(url: any){

		let req = new HttpRequest(url as string)
		return this.callAPI(req)				
		// console.log("data"+data);
		// var data2 = this.http.get("http://52.26.27.78:8080/aboutstays/hotel/sample").map(res => res.json());
		// console.log(data2);http://35.154.72.39:8080/syntagi/prescription/find/patient?patientId=59312567e4b0315ae6859810
		// return data;
	}

	callAPI(req : HttpRequest){
		let method = req.method;
		let options = new RequestOptions({ headers: req.headers});
		if (method == "GET"){
		return this.http.get(req.url, options)
						.map(res => res.json())
		}else if (method == "POST"){
			return this.http.post(req.url, req.params, options)
                    .map(res => res.json());
		}else if (method == "PUT"){
			return this.http.put(req.url, req.params, options)
                    .map(res => res.json());
		}else if (method == "DELETE"){
			return this.http.delete(req.url, options)
                    .map(res => res.json());
		}else if (method == "PATCH"){
			return this.http.patch(req.url, req.params, options)
                    .map(res => res.json());
		}	
	}


	throwError(error: any){
      	if (error != "") {
	      	// alert("Server Error\n"+ error );
	    	console.log(error);
      	}
      	// to check 401 authentication, if true logout.
      	if (error == 'Token is either invalid or expired!') {
      		localStorage.removeItem('loginDetails');
      		window.location.reload();
      	}
  	}
	showCommonLoader(){
		const elem = document.getElementById('commonFullLoader');
		if (elem) {
			elem.style.display = "block";
		}		
	}
	hideCommonLoader(){
		const elem = document.getElementById('commonFullLoader');
		if (elem) {
			elem.style.display = "none";
		}		
	}

	

}
