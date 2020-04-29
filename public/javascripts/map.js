// map box token
mapboxgl.accessToken =
  'pk.eyJ1Ijoid2lsbGlhbWh6byIsImEiOiJjazlpaXFtMmowM2Z1M2Vxc2thY3dxOHFoIn0.hpSIzole5o67JqS1A7lp3A';

// create map
const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/williamhzo/ck9l3pl0s26xd1irzartpvnm2',
  center: [2.351027, 48.856669], //   [longitude,latitude]
  zoom: 12,
});

// add geocoder location search field to map --> to be implemented in 'add item' form?
// add zoom and rotation controls to the map
// add geolocation to controls
map
  // .addControl(
  //   new MapboxGeocoder({
  //     accessToken: mapboxgl.accessToken,
  //     mapboxgl: mapboxgl,
  //     marker: {
  //       color: 'green',
  //     },
  //   })
  // )
  .addControl(new mapboxgl.NavigationControl(), 'bottom-right')
  .addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: {
        enableHighAccuracy: true,
      },
      trackUserLocation: true,
    }),
    'bottom-right'
  );

function getAllItems() {
  axios
    .get('/items')
    .then((response) => {
      console.log(response.data);
      const items = response.data.map((item) => {
        return {
          type: 'Feature',
          properties: {
            name: item.name,
            category: item.category,
            description: item.description,
            quantity: item.quantity,
            address: item.address,
            image: item.image,
            creation_date: item.createdAt,
          },
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
  items.forEach((marker) => {
    const marker__container = document.createElement('div');
    marker__container.className = 'marker';
    new mapboxgl.Marker(marker__container)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<h3> 
              ${marker.properties.name} 
            </h3>
            <p> 
              ${marker.properties.category} 
            </p>
            <p> 
              ${marker.properties.description} 
            </p>
            <img src='${marker.properties.image}'></img>`
        )
      )
      .addTo(map);
  });
}

getAllItems();

// Center the map on the coordinates of any clicked symbol from the 'symbols' layer.
map.on('click', 'marker', (e) => {
  map.flyTo({
    center: e.features[0].geometry.coordinates,
  });
});

// previous way of updating map with data
// function loadAllItems(items) {
//   map.loadImage(
//     'https://upload.wikimedia.org/wikipedia/commons/7/7c/201408_cat.png',
//     function (error, image) {
//       if (error) throw error;
//       map.addImage('cat', image);
//       map.addSource('point', {
//         type: 'geojson',
//         data: {
//           type: 'FeatureCollection',
//           features: items,
//         },
//       });
//       map.addLayer({
//         id: 'points',
//         type: 'symbol',
//         source: 'point',
//         layout: {
//           'icon-image': 'cat',
//           'icon-size': 0.25,
//         },
//       });
//     }
//   );
// }
