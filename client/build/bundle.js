/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const BucketView = __webpack_require__(2);
const Request = __webpack_require__(1);

const bucketView = new BucketView();
const request = new Request("http://localhost:3000/api/list")

let countries = [];

const app = function(){

  const url = 'https://restcountries.eu/rest/v2/all';
  const onSelect = document.querySelector('#select');
  makeRequest(url, requestCompleteDropdown)
  onSelect.addEventListener('change', function(){

    const createCountryButton = document.querySelector('#save-country');
    createCountryButton.addEventListener('click', createButtonClicked);

    request.get(getCountriesRequestComplete);

    const ul = document.querySelector('#country-list');
    const p = document.querySelector('#country-info');
    ul.innerHTML = "";
    p.innerHTML = "";
    const li = document.createElement("li");
    const img = document.createElement("img")
    const para = document.createElement("p");
    const para2 = document.createElement("p");
    li.innerText = "Name: " + countries[this.value].name
    para.innerText = "Population: " + countries[this.value].population
    para2.innerText = "Region: " + countries[this.value].region
    img.src = countries[this.value].flag;
    ul.appendChild(li);
    ul.appendChild(img);
    p.appendChild(para);
    p.appendChild(para2);
  });

}
const createButtonClicked = function(evt) {
  evt.preventDefault();
  console.log('submit button clicked')


  const value = document.querySelector('#select').value;
  const country = countries[value];
  const reasonValue = document.querySelector('#reason').value;
  // const nameValue = document.querySelector(value.name);

  const body = {
    name: country.name,
    reason: reasonValue,
    flag: country.flag
  }

  request.post(getCountriesRequestComplete, body);
  bucketView.render(body);

}

const makeRequest = function(url, callback) {
  const request = new XMLHttpRequest();
  request.open('GET', url);
  request.send();
  request.addEventListener('load', callback);
}

const requestCompleteDropdown = function() {
  if (this.status !== 200) return;
  const jsonString = this.responseText;
  countries = JSON.parse(jsonString);
  handlSelectChange(countries);
}

const handlSelectChange = function(countries) {
  const select = document.querySelector("#select")
  countries.forEach(function(country, index) {
    let option = document.createElement("option")
    option.innerText = country.name;
    option.value = index;
    select.appendChild(option);

  }.bind(this));

}

const getCountriesRequestComplete = function(country) {
    bucketView.addCountry(country); //calls object, function, item.

}



document.addEventListener('DOMContentLoaded', app);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if(this.status !== 200) {
      return;
    }

    const responseBody =  JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send();
}

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if(this.status !== 201) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);
    callback(responseBody);
  });
  request.send(JSON.stringify(body));

}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if(this.status !== 204) {
      return;
    }
    callback();
  });
  request.send();
}

module.exports = Request;


/***/ }),
/* 2 */
/***/ (function(module, exports) {

const BucketView = function(){
 this.countries = [];
 console.log(this.countries);
}

BucketView.prototype.addCountry = function(country) {
 this.countries.push(country);
 // this.render(country);
}

BucketView.prototype.clear = function(country) {
 this.countries = [];
 const ul = document.querySelector('#save-country');
 ul.innerHTML = '';
}

BucketView.prototype.render = function(country){
   const ul = document.querySelector('#populate');
   const li = document.createElement('li');
   const text = document.createElement('p');
   text.innerText = `${country.name}: ${country.reason}`;
   li.appendChild(text);
   ul.appendChild(li);
}

module.exports = BucketView;


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map