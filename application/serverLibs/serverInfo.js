var path = require('path');


exports.invalidPage = function(res) {
	var err = exports.error("invalid_page", "The requested page does not exist");
	log_failure(res, err);
}

exports.failCreatePage = function(res) {
	var err = exports.error("fail_create", "The base page could not be created");
	log_failure(res, err)
}



log_failure = function(res, error) {
	res.writeHead(404, { "Content-Type" : "application/json" });
	res.end(JSON.stringify(error) + "\n");
}

exports.error = function(code, message) {
	var e = new Error(message);
	e.code = code;
	return e;
}

// ================= USER ERROR HANDLING =================

exports.send_failure = function(res, server_code, err) {
	var code = (err.code) ? err.code : err.name;
	res.writeHead(server_code, {"Content-Type" : "application/json" });
	res.end(JSON.stringify({ error: code, message: err.message }) + "\n");
}


exports.send_success = function(res, data) {
    res.writeHead(200, {"Content-Type": "application/json"});
    var output = { error: null, data: data };
    res.end(JSON.stringify(output) + "\n");
}


exports.file_error = function (err) {
    return exports.error("file_error", JSON.stringify(err));
};


exports.invalid_resource = function () {
    return exports.error("invalid_resource",
                         "The requested resource does not exist.");
};


exports.missing_data = function (what) {
    return exports.error("missing_data",
                         "You must include " + what);
}


exports.invalid_project_data = function () {
    return exports.error("invalid_project_data",
                         "The specified album does not exist");
};

exports.no_such_user = function () {
    return exports.error("no_such_user",
                         "The specified user does not exist");
};


exports.http_code_for_error = function (err) {
  //TODO error code for invalid page
    switch (err.code) {
      case "invalid_project_data":
        return 400;
      case "invalid_resource":
        return 400;
      case "invalid_email_address":
        return 400;
      case "no_such_user":
        return 404;
      case "auth_failed":
        return 404;
      case "missing_data":
        return 400;
      case "user_already_registered":
        return 400;
      case "already_logged_in":
        return 200;
    }

    console.log("*** Error needs HTTP response code: " + err.message);
    return 503;
}

exports.invalid_email_address = function () {
    return exports.error("invalid_email_address",
                        "That's not a valid email address, sorry");
};

exports.auth_failed = function () {
    return exports.error("auth_failure",
                         "Invalid email address / password combination.");
};






/*

exports.valid_filename = function (fn) {
    var re = /[^\.a-zA-Z0-9_-]/;
    return typeof fn == 'string' && fn.length > 0 && !(fn.match(re));
};

exports.not_image = function () {
    return exports.error("not_image_file",
                         "The uploaded file must be an image file.");
};

exports.is_image = function (filename) {
    switch (path.extname(filename).toLowerCase()) {
      case '.jpg':  case '.jpeg': case '.png':  case '.bmp':
      case '.gif':  case '.tif':  case '.tiff':
        return true;
    }

    return false;
};
*/
