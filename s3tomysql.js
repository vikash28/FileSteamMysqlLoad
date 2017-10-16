var mysql = require('mysql');
var con = mysql.createConnection({
        host: "localhost",
        user: "root",
        password: "root",
        database: "cloudhiti"
});
var AWS = require('aws-sdk');
AWS.config.update({
  "accessKeyId": "AKIAJ6CSCKGR37I5LMJA",
  "secretAccessKey": "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",
  "region": "us-west-2",
})
var s3 = new AWS.S3({apiVersion: '2006-03-01'});

con.connect();

var s3tomysql= function(callback,path,stagingTablename,delimiter)
{
	 con.query("load data local infile '" + path + "' into table " + stagingTablename
						+ " fields terminated by '" + delimiter + "' ", function (err, result, fields) {  if (err) throw err;
	 	 console.log(result);
	 	 callback(null, '2');
	 });
}
module.exports = s3tomysql;
