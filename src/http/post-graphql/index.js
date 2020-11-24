let arc = require("@architect/functions");
let query = require("./query");

exports.handler = arc.http.async(query);
