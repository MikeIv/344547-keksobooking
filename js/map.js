'use strict';

var mapRemFad = document.querySelector(".map--faded");
mapRemFad.classList.remove("map--faded");


var titleCount = [
  'Большая уютная квартира',
  'Маленькая неуютная квартира',
  'Огромный прекрасный дворец',
  'Маленький ужасный дворец',
  'Красивый гостевой домик',
  'Некрасивый негостеприимный домик',
  'Уютное бунгало далеко от моря',
  'Неуютное бунгало по колено в воде'];
var imageCount = 8;
var roomCount = 5;
var guestCount = 10;
var typeItem = ['flat', 'house', 'bungalo'];
var typeItemRus = {
  'flat': 'Квартира',
  'house': 'Дом',
  'bungalo': 'Бунгало'
};
var timesCheck = ['12:00', '13:00', '14:00'];
var featuresCount = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var empty = [];


// Случайный элемент массива
var getRandRep = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
};

// Получение неповторяющегося случайного элемента массива
var getRandomNoRepeat = function (arr) {
  var rand = Math.floor(Math.random() * arr.length);
  var removed = arr.splice(rand, 1);
  return removed;
};

// Получение случайного числа от min до max
var getRandomInterval = function (min, max) {
  var rand = Math.floor(min + Math.random() * (max + 1 - min));
  return rand;
};

// массив в случайном порядке и случайной длины
var getRandomOrderLength = function (arr) {
  var copied = arr.slice();
  for (var i = 0; i < copied.length; i++) {
    var randIndex = Math.floor(Math.random() * copied.length);
    var rand = Math.random();
    if (rand < 0.5) {
      copied.splice(randIndex, 1);
    }
  }
  return copied;
};

// массив от 1 до указаного количества
var getArrAmount = function (amount) {
  var arr = [];
  var i = 0;
  while (i < amount) {
    arr[i] = ++i;
  }
  return arr;
};

var getAdverts = function () {
  var imgArr = getArrAmount(imageCount);
  var adverts = [];
  for (var i = 0; i < 8; i++) {
    adverts[i] = {
      'author': {
        'avatar': 'img/avatars/user0' + getRandomNoRepeat(imgArr) + '.png'
      },
      'offer': {
        'title': getRandomNoRepeat(titleCount),
        'address': '',
        'price': getRandomInterval(1000, 1000000) + '&#x20bd;/ночь',
        'type': getRandRep(typeItem),
        'rooms': getRandomInterval(1, roomCount),
        'guests': getRandomInterval(1, guestCount),
        'checkin': getRandRep(timesCheck),
        'checkout': getRandRep(timesCheck),
        'features': getRandomOrderLength(featuresCount),
        'description': '',
        'photos': empty
      },
      'location': {
        'x': getRandomInterval(300, 900),
        'y': getRandomInterval(100, 500)
      }
    };
    adverts[i].offer.address = adverts[i].location.x + ', ' + adverts[i].location.y;
  }
  return adverts;
};

var adverts = getAdverts();

var pinMap = document.querySelector('.tokyo__pin-map');
var pin = document.querySelector('.pin');

var renderPin = function (obj) {
  var pinElem = pin.cloneNode(true);
  pinElem.classList.remove('pin__main');
  pinElem.querySelector('img').src = obj.author.avatar;
  pinElem.style = 'left: ' + (obj.location.x - 28) + 'px; top: ' + (obj.location.y - 75) + 'px';
  return pinElem;
};

var appendPins = function (arr) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < arr.length; i++) {
    fragment.appendChild(renderPin(arr[i]));
  }
  pinMap.appendChild(fragment);
};

appendPins(adverts);

var renderLodge = function (arr) {
  var lodgeTemplate = document.querySelector('#lodge-template').content.querySelector('.dialog__panel');
  var lodgeElem = lodgeTemplate.cloneNode(true);
  lodgeElem.querySelector('.lodge__title').textContent = arr.offer.title;
  lodgeElem.querySelector('.lodge__address').textContent = arr.offer.address;
  lodgeElem.querySelector('.lodge__price').innerHTML = arr.offer.price;
  lodgeElem.querySelector('.lodge__type').textContent = typeItemRus[arr.offer.type];
  lodgeElem.querySelector('.lodge__rooms-and-guests').textContent = 'Для ' + arr.offer.guests + ' гостей в ' + arr.offer.rooms + ' комнатах';
  lodgeElem.querySelector('.lodge__checkin-time').textContent = 'Заезд после ' + arr.offer.checkin + ' , выезд до ' + arr.offer.checkout;
  var keksFeatures = arr.offer.features;
  for (var i = 0; i < keksFeatures.length; i++) {
    lodgeElem.querySelector('.lodge__features').innerHTML += '<span class = "feature__image feature__image--' + keksFeatures[i] + '"></span>';
  }
  lodgeElem.querySelector('.lodge__description').textContent = arr.offer.description;
  return lodgeElem;
};

var appendLodge = function (obj) {
  var dialogPanel = document.querySelector('.dialog__panel');
  dialogPanel.parentElement.replaceChild(renderLodge(obj), dialogPanel);
  var dialogTitle = document.querySelector('.dialog__title');
  dialogTitle.querySelector('img').src = obj.author.avatar;
};

appendLodge(adverts[0]);
