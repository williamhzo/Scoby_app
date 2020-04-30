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

const itemInfo = document.querySelector('.info-card__container');

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
  axios.get('/items').then((response) => {
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
          userName: item.id_user.firstName,
          userImg: item.id_user.profileImg,
          contact: item.contact,
        },
        geometry: {
          type: 'Point',
          coordinates: [
            item.location.coordinates[0],
            item.location.coordinates[1],
          ],
        },
      };
    });
    loadAllItems(items);
  });
  // .catch((err) => console.log(err));
}

function loadAllItems(items) {
  items.forEach((marker) => {
    const marker__container = document.createElement('div');
    marker__container.className = 'marker';
    // marker__container.className = 'marker-plant';
    // marker__container.className = 'marker-mushroom';
    // if (category)
    new mapboxgl.Marker(marker__container)
      .setLngLat(marker.geometry.coordinates)
      // .setPopup(
      //   new mapboxgl.Popup({ offset: 25 }).setHTML(
      //     `<h3>
      //         ${marker.properties.name}
      //       </h3>
      //       <p>
      //         ${marker.properties.category}
      //       </p>
      //       <p>
      //         ${marker.properties.description}
      //       </p>
      //       <p>
      //         ${marker.properties.user}
      //       </p>
      //       <a>Contact</a>
      //       <img src='${marker.properties.image}'></img>`
      //   )
      // )
      .addTo(map);

    marker__container.addEventListener('click', () => {
      itemInfo.style.visibility = 'visible';
      itemInfo.innerHTML = `
        <h3 class='.info-card__title'>${marker.properties.name}</h3>
        <p class='.info-card__text'>${marker.properties.category}</p>
        <p class='.info-card__text'>${marker.properties.description}</p>
        <p class='.info-card__text'>${marker.properties.contact}</p>
        <p class='.info-card__text'>${marker.properties.userName}</p>
        <img src='${marker.properties.userImg}'></img>;
        <a class='.info-card__btn' href='' >Contact</a>
        <img class='info-card__UserImg' src='${marker.properties.image}'></img>`;
    });
  });
}

//onclick event handler

getAllItems();

document.querySelector('.mapboxgl-canvas').addEventListener('click', () => {
  itemInfo.style.visibility = 'hidden';
});