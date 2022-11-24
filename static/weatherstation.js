// Creating the map object
let myMap = L.map("map", {
    center: [-25.274398, 133.775136],
    zoom: 3
  });
  
//   // Adding the tile layer
  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  }).addTo(myMap);
  
  // Use this link to get the GeoJSON data.
  let link = "http://127.0.0.1:5000/api/v1.0/stationdata";

  // Getting our GeoJSON data
d3.json(link).then(function(data) {
    // Creating a GeoJSON layer with the retrieved data
    function getdepth(depth) {
        switch (true) {
            case depth > 90:
              return "#1f005c";
            case depth > 70:
              return "#5b1060";
            case depth > 50:
              return "#ac255e";
            case depth > 30:
              return "#ca485c";
            case depth > 10:
              return "#e16b5c";
            default:
              return "#ffb56b";
          }
        }
        function getmagnitude(magnitude) {
            if (magnitude === 0) {
              return 1;
            }
        
            return magnitude * 4;
          }


// don't forget to include leaflet-heatmap.js
var testData = {
    max: 8,
    data: [{lat: 24.6408, lng:46.7728, count: 3},{lat: 50.75, lng:-1.55, count: 1},]
  };
  
  var baseLayer = L.tileLayer(
    'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{
      attribution: '...',
      maxZoom: 18
    }
  );
  
  var cfg = {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    // if scaleRadius is false it will be the constant radius used in pixels
    "radius": 2,
    "maxOpacity": .8,
    // scales the radius based on map zoom
    "scaleRadius": true,
    // if set to false the heatmap uses the global maximum for colorization
    // if activated: uses the data maximum within the current map boundaries
    //   (there will always be a red spot with useLocalExtremas true)
    "useLocalExtrema": true,
    // which field name in your data represents the latitude - default "lat"
    latField: 'lat',
    // which field name in your data represents the longitude - default "lng"
    lngField: 'lng',
    // which field name in your data represents the data value - default "value"
    valueField: 'count'
  };
  
  
  var heatmapLayer = new HeatmapOverlay(cfg);
  
  var map = new L.Map('map-canvas', {
    center: new L.LatLng(25.6586, -80.3568),
    zoom: 4,
    layers: [baseLayer, heatmapLayer]
  });
  
  heatmapLayer.setData(testData);


    L.geoJson(data, {
        pointToLayer: function (feature, latlng) {
            return L.circleMarker(latlng);
          },
      
  
      style: function(feature) {
        return {
            opacity: 1,
            fillOpacity: 1,
            fillColor: getdepth (feature.geometry.coordinates[2]),
            color: "#000000",
            radius: getmagnitude(feature.properties.mag),
            stroke: true,
            weight: 0.5
      
        };
      },
      // This is called on each feature.
      onEachFeature: function(feature, layer) {
  
        // Giving each feature a popup with information that's relevant to it
        layer.bindPopup("<h5> <b>Adress: </b>"  + feature.properties.place + "</h5> <hr> <h5> <b>Location: </b>"  + feature.geometry.coordinates[0] + "," +feature.geometry.coordinates[1] + "</h5> <hr> <h5> <b>Depth: </b>"  + feature.geometry.coordinates[2] + "</h5> <hr> <h5> <b>Magnitude: </b>"  + feature.properties.mag + "</h5>");
  
      }

    }).addTo(myMap);


      // Set up the legend.
  // Create a legend to display info about our map.
  var legend = L.control({ 
    position: 'bottomright' 
  });

  // When the layer control is added, insert a div with the class of "info legend".
  legend.onAdd = function () {

    var div = L.DomUtil.create('div', 'info legend'),
        magnitude = [-10, 10, 30, 50, 70, 90];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < magnitude.length; i++) {
      div.innerHTML +=
        '<i style="background:' + getdepth(magnitude[i] + 1) + '"></i> ' +
        magnitude[i] + (magnitude[i + 1] ? '&ndash;' + magnitude[i + 1] + '<br>' : '+');
    }

    return div;
  };



// Adding the legend to the map
legend.addTo(myMap);

  });
  