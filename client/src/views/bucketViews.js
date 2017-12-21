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
