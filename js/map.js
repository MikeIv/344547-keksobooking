'use strict';

var adverts = ['advert1', 'advert2', 'advert3', 'advert4', 'advert5', 'advert6', 'advert7', 'advert8'];

for (var i = 1; i <= 8; i++) {
  var advertNumber = 'advert' + i;
  console.log(advertNumber);
}

advertNumber = {
  "author": {
    "avatar": 'img/avatars/user{{xx}}.png'
  },
  "offer": {
    "title": "Большая уютная квартира",
    "address": "{{location.x}}, {{location.y}}",
    "price": 1000,
    "type": 'flat',
    "rooms": 1,
    "guests": 1,
    "checkin": '12:00',
    "checkout": '13:00',
    "features": ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"],
    "description": '',
    "photos": []
  },

  "location": {
    "x": 400,
    "y": 500
  }
};
console.log(advertNumber);
