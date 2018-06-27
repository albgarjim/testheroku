var server_info = require('./serverInfo.js'),
	fs			= require('fs'),
	ml          = require('./mylogger.js');

exports.CreatePage = function(req, res) {
	ml.one('CreatePage');

    var page = req.params.page_name;
    console.log(page);
	ml.three('CreatePage', 'Creating page: ', page);


	fs.readFile('base.html', function(err, contents) {
		if (err) {
			ml.three('CreatePage', 'Fail creating page: ', page);
			server_Info.failCreatePage();
			return;
		}

		contents = contents.toString('utf8');

		//TODO: Remove duplication of contents.replace
		contents = contents.replace('{{PAGE_NAME}}', page);
		contents = contents.replace('{{PAGE_NAME}}', page);
		ml.three('CreatePage', 'Page created correctly: ', page);
		res.writeHead(200, { "Content-Type": "text/html" });

		res.end(contents);
	});
};
