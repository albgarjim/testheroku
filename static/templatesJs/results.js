$(function() {
	var tmpl,
		tdata = {};

	var initPage = function() {
		$.get("/templatesHtml/results.html", function(d) {
			tmpl = d;
		});

		$(document).ajaxStop(function() {
			var renderedPage = Mustache.to_html( tmpl, tdata );

			$("body").html( renderedPage );
		})
	}();
});
