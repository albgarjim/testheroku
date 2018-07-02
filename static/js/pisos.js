$(document).ready(function(){

	var obj = "";
	fetch('../object.json')
	  .then(response => response.json())
	  .then(jsonResponse => {
	  	obj = jsonResponse;
	  	console.log("---")
	  	console.log(obj);
	  	console.log("----")
	  		$.each(obj, function(i, item) {
		$( "#filter-content" ).append( 
		`<div onclick="window.location='`+item.url+`';" class="mix category-2 category-6 category-5 col-lg-3 col-md-4 col-sm-6 single-filter-content" data-myorder="8" style="background:url(`+item.thumbnail+`) no-repeat center center/cover">
			<div class="overlay overlay-bg-content d-flex align-items-center justify-content-center flex-column">
				<p class="text-white">`+item.address+`</p>
				<div class="line"></div>
				<h5 class="text-white text-uppercase">`+item.price+`€</h5>
			</div>
		</div>` );
		console.log(item.thumbnail);
	});
	  }) 

})
