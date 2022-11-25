console.log("Running Map");
let myMap = L.map("weatherstation_map", {
  center: [-29.50, 145],
  zoom: 3.5
});
  
  // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);

  // add markes for NSW, NT, QLD, SA, TAS, VIC and WA
const marker1 = L.marker([-31.2532, 146.9211]).addTo(MyMap);
const marker2 = L.marker([-19.4914, 132.5510]).addTo(MyMap);
const marker3 = L.marker([-22.5752, 144.0848]).addTo(MyMap);
const marker4 = L.marker([-30.002, 136.2092]).addTo(MyMap);
const marker5 = L.marker([-42.0409, 146.8087]).addTo(MyMap);
const marker6 = L.marker([-36.9848, 143.3906]).addTo(MyMap);
const marker7 = L.marker([-27.6728, 121.6283]).addTo(MyMap);

const map = L.map('weatherstation_map', {scrollWheelZoom:false}).setView([-29.50, 145], 3.5);

const basemaps = {
  StreetView: L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',   {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'}),
  Topography: L.tileLayer.wms('http://ows.mundialis.de/services/service?',   {layers: 'TOPO-WMS'}),
  Places: L.tileLayer.wms('http://ows.mundialis.de/services/service?', {layers: 'OSM-Overlay-WMS'})
};
L.control.layers(basemaps).addTo(map);

basemaps.Topography.addTo(map);

  let url = "/api/v1.0/groupbystationdata";

  let geojson;

  d3.json(url).then(function(response) {
    console.log("D3");
    console.log(response);

    features = response.features;

    let heatArray = [];
  
    for (let i = 0; i < features.length; i++) {
      let location = features[i].geometry;
      if (location) {
        //console.log(location);
        heatArray.push([location.coordinates[1], location.coordinates[0]]);
      }
  
    }
  
    let heat = L.heatLayer(heatArray, {
      radius: 20,
      blur: 35
    }).addTo(myMap);
  
  });



