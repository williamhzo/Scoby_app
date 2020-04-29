mapboxgl.accessToken =
  'pk.eyJ1Ijoid2lsbGlhbWh6byIsImEiOiJjazlpaXFtMmowM2Z1M2Vxc2thY3dxOHFoIn0.hpSIzole5o67JqS1A7lp3A';
const geocoder = new MapboxGeocoder({
  accessToken: mapboxgl.accessToken,
  types: 'country,region,place,postcode,locality,neighborhood',
});

geocoder.addTo('#geocoder');
