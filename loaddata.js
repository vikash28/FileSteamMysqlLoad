var async = require('async');
var ftptos3  = require('./ftptos3');
var s3tomysql  = require('./s3tomysql'); 
async.series([
    function (callback) {
        ftptos3(callback);
        //callback(null, '1');
    },
    function (callback) {
        s3tomysql(callback,"AC_Lens-ACLens_com_Main_Product_Catalog.txt.gz","STG"," ");   
        //callback(null, '2');
    }
],
function (err, result) {
    console.log(result);
});
//var promise  = ftptos3();
//console.log(returned);