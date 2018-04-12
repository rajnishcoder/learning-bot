import { Directive, ElementRef, HostListener, NgZone, OnInit, Output, EventEmitter } from '@angular/core';
import { MapsAPILoader } from '@agm/core';
import { } from '@types/googlemaps';
import { RegistrationService } from '../services/Registration.service';

@Directive({
    selector: '[appAddSuggestion]'
})

export class AddressSuggDirective implements OnInit {
    constructor(private element: ElementRef, private ngZone: NgZone,
        private mapsAPILoader: MapsAPILoader, private regService: RegistrationService) {
    }
    @Output()
    sendAddress = new EventEmitter();

    ngOnInit() {
        const that = this;
        this.mapsAPILoader.load().then(() => {
            const autocomplete = new google.maps.places.Autocomplete(this.element.nativeElement, {
                types: ['address']
            });
            autocomplete.addListener('place_changed', () => {
                this.ngZone.run(() => {
                    // get the place result
                    const place: google.maps.places.PlaceResult = autocomplete.getPlace();
                    // verify result
                    if (place.geometry === undefined || place.geometry === null) {
                        return;
                    } else {
                        const Lattitude = place.geometry.location.lat();
                        const Longitude = place.geometry.location.lng();
                        // this.zoom = 12;
                        this.regService.callReverseGeoCodingApi(Lattitude, Longitude, this.element.nativeElement.value);
                        this.sendAddress.emit({ address: this.regService.address});
                    }
                });
            });
        });
    }
} 