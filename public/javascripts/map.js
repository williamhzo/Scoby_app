// map box token
mapboxgl.accessToken =
  'pk.eyJ1Ijoid2lsbGlhbWh6byIsImEiOiJjazlpaXFtMmowM2Z1M2Vxc2thY3dxOHFoIn0.hpSIzole5o67JqS1A7lp3A';

// create map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/williamhzo/ck9ijqka14hy61ip1yja423sl',
  center: [2.351027, 48.856669], //   [longitude,latitude]
  zoom: 12,
});

// add control location search field to map --> to be implemented in 'add item' form?
map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);

// add a default marker
const marker = new mapboxgl.Marker()
  .setLngLat([2.351027, 48.856669]) // set coordinates
  .addTo(map);

// define function to retrieve all items and display them on the map
map.on('load', function () {
  // get all items from db
  function getItems() {}

  // load and display items on map
  map.addSource('point', {
    type: 'geojson',
    data: {
      type: 'FeatureCollection',
      features: [
        {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [0, 0], // insert coordinates from items in db
          },
        },
      ],
    },
  });
  map.addLayer({
    id: 'points',
    type: 'symbol',
    source: 'point',
    layout: {
      'icon-image': 'cat',
      'icon-size': 0.25,
    },
  });
});

// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'symbols', function (e) {
  map.flyTo({ center: e.features[0].geometry.coordinates });
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map.on('mouseenter', 'symbols', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'symbols', function () {
  map.getCanvas().style.cursor = '';
});
