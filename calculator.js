$(document).ready(function(){
	var chosenCountry = 'USA';
	var myData;
	var xhttp = new XMLHttpRequest();
	xhttp.onreadystatechange = function() {
		if (this.readyState == 4 && this.status == 200) {
		  // console.log(JSON.stringify(this.responseText));
		  myData = JSON.parse(this.responseText);
		  console.log(myData);
		  $('.categories')[0].innerHTML = "";
		  var innerText = "<ul class = 'market-categories'>";
		  
		  for (var i = 0; i <= myData.category.length - 1; i++) {
		  	var innerLi = "<li class = 'market-category'><div class = 'name-and-image'><img src='" + "assets/baby_white.png" + "' class = 'market-category-image'><div class = 'market-category-name'> " + myData.category[i].name + "</div></div></li>";
		  	innerText+=innerLi;
		  }
		  innerText+= "</ul>";
		  $('.categories')[0].innerHTML = innerText;
		}
	};
	xhttp.open("GET", "json/usa.json", true);
	xhttp.send();

	$('.market-place').click(function(){
		$('.arrow_box').removeClass('arrow_box');
		$(this).addClass('arrow_box');
		var country = $(this).children().children().text().toLowerCase();
		chosenCountry = $(this).children().children().text();
		var url = "json/"+ country + ".json";
		xhttp.open("GET", url, true);
		xhttp.send();
	})

	$(document).on("click", '.market-category', function(){
		console.log("i am in!!");
		var self = this;
		$('.market-place-value').text(chosenCountry);
		$('.market-category-value').text($(this).children().children().text());
		 $(this).animate({opacity: 0},350);
		 $('.popup').animate({width: "100%"},350);
		 $(this).animate({opacity: 1},350);

		 myData.requiredData = myData.category.find(function(value){
		 	return value.name===($(self).children().children().text().trim());
		 });
		 $('.popup-wrapper').removeClass('hidden');
	});
	$('.estimate-button').click(function(){
		console.log(JSON.stringify(myData.requiredData));
		var salesRank = $('.sales-rank')[0].value || 0;
		var sales = (myData.requiredData.valueA * Math.pow(salesRank, 3)) + (myData.requiredData.valueB * Math.pow(salesRank, 2)) + (myData.requiredData.valueC * Math.pow(salesRank, 1)) + myData.requiredData.valueD;
		console.log(sales);
	});

	$('.glyphicon-remove').click(function(){
		$('.popup-wrapper').addClass('hidden');
	})

});