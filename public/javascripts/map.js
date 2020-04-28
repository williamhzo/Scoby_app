// require('dotenv').config();

// mapboxgl.accessToken =
//   'pk.eyJ1Ijoid2lsbGlhbWh6byIsImEiOiJjazlpaXFtMmowM2Z1M2Vxc2thY3dxOHFoIn0.hpSIzole5o67JqS1A7lp3A';

// mapboxgl.accessToken = process.env.MAPBOX_TOKEN;

mapboxgl.accessToken =
  'pk.eyJ1Ijoid2lsbGlhbWh6byIsImEiOiJjazlpaXFtMmowM2Z1M2Vxc2thY3dxOHFoIn0.hpSIzole5o67JqS1A7lp3A';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/williamhzo/ck9ijqka14hy61ip1yja423sl',
  center: [2.351027, 48.856669], //   [longitude,latitude]
  zoom: 12,
});

map.addControl(
  new MapboxGeocoder({
    accessToken: mapboxgl.accessToken,
    mapboxgl: mapboxgl,
  })
);

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
