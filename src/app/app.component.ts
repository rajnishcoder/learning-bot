import { ChatMainModel } from './models/ChatMainModel';
import { Component, OnInit } from '@angular/core';


@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	mainUserInput: string;
	chatMainModel: ChatMainModel[];

	ngOnInit(): void {
	}

	onInputEnter(mainUserInput: string) {
	}

	appendUserChat(query: string) {
		if (query) {
			// this.chatMainModel.
		}
	}

	apiCall() {
		
	}

}
