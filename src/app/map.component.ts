import { Component, AfterViewInit } from '@angular/core';
import * as L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  template: `
    <div id="map" class="map-container"></div>
  `,
})
export class MapComponent implements AfterViewInit {
  private map: L.Map | undefined;

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {
    // Buenos Aires coordinates
    const buenosAires = {
      lat: -34.6037,
      lng: -58.3816
    };

    this.map = L.map('map', {
      zoomControl: false  // Disable default zoom control
    }).setView([buenosAires.lat, buenosAires.lng], 13);

    // Add zoom control to bottom right
    L.control.zoom({
      position: 'bottomright'
    }).addTo(this.map);

    // Base layers definition
    const openStreetMap = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    });

    const googleHybrid = L.tileLayer('http://{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '© Google Maps'
    });

    const googleSatellite = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
      maxZoom: 20,
      subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
      attribution: '© Google Maps'
    });

    // Define base layers for the control
    const baseLayers = {
      'OpenStreetMap': openStreetMap,
      'Google Hybrid': googleHybrid,
      'Google Satellite': googleSatellite
    };

    // Add OpenStreetMap as default layer
    openStreetMap.addTo(this.map);

    // Add layer control
    L.control.layers(baseLayers).addTo(this.map);

    // Add a marker for Buenos Aires
    L.marker([buenosAires.lat, buenosAires.lng])
      .addTo(this.map)
      .bindPopup('¡Bienvenido a Buenos Aires!')
      .openPopup();
  }
}