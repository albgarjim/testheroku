exports.one = function(caller){
	console.log('=======================================');
	console.log(caller);
}

exports.two = function(caller, text){
	console.log('- - - - - - - - - - - - - - - - - - - -');
	console.log('Caller: ' + caller);
	console.log(text);
}

exports.three = function(caller, text, data){
	console.log('- - - - - - - - - - - - - - - - - - - -');
	console.log('Caller: ' + caller);
	console.log(text);
	console.log(data);
}

