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

map.addControl(new mapboxgl.NavigationControl(), 'bottom-right').addControl(
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
    })
    .catch((err) => console.log(err));
}

function loadAllItems(items) {
  items.forEach((marker) => {
    const marker__container = document.createElement('div');
    const marker__category = document.createElement('div');
    marker__container.className = 'marker--purple';
    marker__container.appendChild(marker__category);

    switch (marker.properties.category[0]) {
      case 'Plant':
        marker__category.classList.add('marker__plant');
        break;
      case 'Kombucha':
        marker__category.classList.add('marker__kombucha');
        break;
      case 'Kefir':
        marker__category.classList.add('marker__vinegar');
        break;
      case 'Vinegar':
        marker__category.classList.add('marker__kefir');
        break;
    }

    new mapboxgl.Marker(marker__container)
      .setLngLat(marker.geometry.coordinates)
      .addTo(map);

    marker__container.addEventListener('click', () => {
      itemInfo.style.visibility = 'visible';
      itemInfo.innerHTML = `
      <a class="closeLink">Close</a>
      <div class="round__image"><img class='info-card__UserImg' src='${marker.properties.image}'></img></div>
      <h2 class='info-card__title'>${marker.properties.name}</h2>
      <div class="info-card__info">
      <span>Quantity: ${marker.properties.quantity}</span> |
      
        <span>${marker.properties.category} </span></div>
        <p class=''>${marker.properties.description}</p>
        <div class="user__info">
        <div class="round__image__user">
        <img src='${marker.properties.userImg}'></img></div>
        <span>Given away by ${marker.properties.userName}</span></div>
        <div class="contact__information">Contact ${marker.properties.userName} at <b>${marker.properties.contact}</b></div>
        `;

      document.querySelector('.closeLink').addEventListener('click', () => {
        itemInfo.style.visibility = 'hidden';
      });
    });
  });
}

getAllItems();

document.querySelector('.mapboxgl-canvas').addEventListener('click', () => {
  itemInfo.style.visibility = 'hidden';
});
