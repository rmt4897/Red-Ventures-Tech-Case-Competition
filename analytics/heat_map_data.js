/* blank file, going to be used for heat map */
var myLatlng = new google.maps.LatLng(25.6586, -80.3568);
// map options,
var myOptions = {
  zoom: 3,
  center: myLatlng
};
// standard map
map = new google.maps.Map(document.getElementById("map-canvas"), myOptions);
// heatmap layer
heatmap = new HeatmapOverlay(map,
  {
    // radius should be small ONLY if scaleRadius is true (or small radius is intended)
    "radius": 2,
    "maxOpacity": 1,
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
  }
);
var masfy_api_data;
function location_data(our_data) {
        masfy_api_data = {
        max: 10000,
        data: []
      };
      var api_array = [];
    for (i = 0; i < our_data.data.length; i++) {
        var newData = {
            lat: our_data.data[i].lat,
            lng: our_data.data[i].lng,
            count: 1
        };
        api_array.push(newData);
    }

    masfy_api_data.data = api_array;

    heatmap.setData(masfy_api_data);
}

var _api_data = {
    data: [{lat: 2408, lng: 7728},{lat: 905075, lng:-15555}]
  };

location_data(_api_data);
console.log(masfy_api_data);

// heatmap.setData(masfy_api_data);