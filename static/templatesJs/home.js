$(function() {
	var tmpl,
		tdata = {};

	var initPage = function() {
		$.get("/templatesHtml/home.html", function(d) {
			tmpl = d;
		});

		$(document).ajaxStop(function() {
			var renderedPage = Mustache.to_html( tmpl, tdata );

			$("body").html( renderedPage );
		})
	}();
});