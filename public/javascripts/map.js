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

async function getAllItems() {
  await axios
    .get('/items')
    .then((response) => {
      const items = response.data.map((item) => {
        return {
          type: 'Feature',
          geometry: {
            type: 'Point',
            coordinates: [
              item.location.coordinates[1],
              item.location.coordinates[0],
            ],
          },
        };
      });
      loadAllItems(items);
    })
    .catch((err) => console.log(err));
}

function loadAllItems(items) {
  map.loadImage(
    'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
    function (error, image) {
      if (error) throw error;
      map.addImage('cat', image);
      map.addSource('point', {
        type: 'geojson',
        data: {
          type: 'FeatureCollection',
          features: items,
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
    }
  );
}

getAllItems();

// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'symbols', function (e) {
  map.flyTo({
    center: e.features[0].geometry.coordinates,
  });
});

// Change the cursor to a pointer when the it enters a feature in the 'symbols' layer.
map.on('mouseenter', 'symbols', function () {
  map.getCanvas().style.cursor = 'pointer';
});

// Change it back to a pointer when it leaves.
map.on('mouseleave', 'symbols', function () {
  map.getCanvas().style.cursor = '';
});
