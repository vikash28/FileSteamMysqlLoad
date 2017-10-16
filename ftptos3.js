var Client = require('ftp');
var AWS = require('aws-sdk');
var zlib = require('zlib');


AWS.config.update({
  "accessKeyId": "AKIAJ6CSCKGR37I5LMJA",
  "secretAccessKey": "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",
  "region": "us-west-2",
})

var s3 = new AWS.S3({apiVersion: '2006-03-01'});
var fs = require('fs');
var c = new Client();

var connectionProperties = {
    host: "cloudhiti.com",
    user: "cloudhitiadmin@cloudhiti.com",
    password: "cloudhitiadmin2017"
}; 

 
c.connect(connectionProperties);

var fttoS3 = function(callback)
{
	callback(null, '1');
	return true;
	c.get('/Sample2/AC_Lens-ACLens_com_Main_Product_Catalog.txt.gz', function (err, stream) {
                 if (err) { console.log("Error in ftp getting file");   c.end(); };
                 
                 console.log("ftp getting file started");
                  
                 
                 stream.once('close', function () {
                     
                     console.log("Load file to s3 start");
                     
                     fs.readFile('AC_Lens-ACLens_com_Main_Product_Catalog.txt.gz', function (err, data) {
                        console.log("Read file from local start");
                        if (err) {  console.log("Error local file");  c.end();}
                       
                        s3.putObject({
                        Bucket: 'vikash2017',
                        Key: 'my.txt.gz',
                        Body: data
                        } ,function(err, data) {  
                        	console.log('Successfully uploaded package in s3.' );
                        	c.end();
                        	console.log('ftp to s3 done.');
                        	callback(null, '1');
                        	 
                        }); 

                    	});   
                            
                  });
                  
                  console.log("ftp download file from ftp to local");
                  stream.pipe(zlib.createGunzip()).pipe(fs.createWriteStream('AC_Lens-ACLens_com_Main_Product_Catalog.txt.gz'));
   				  
                
         }); 

}

module.exports = fttoS3;

