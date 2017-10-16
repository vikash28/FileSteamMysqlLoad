/*var ftpClient = require('ftp-client');
var config = { host: 'cloudhiti.com', port: 21, user: 'cloudhitiadmin@cloudhiti.com', password: 'cloudhitiadmin2017'};
 

var options = {
        logging: 'debug'
    };
client = new ftpClient(config,options);
var callback= function(err,data)
{
	if (err) throw err;
    console.log(data);
}
client.connect(function(){
	  console.log('ready');
});*/
 

var Client = require('ftp');
var fs = require('fs');
var c = new Client();
var connectionProperties = {
    host: "datatransfer.cj.com",
    user: "4708603",
    password: "oRvGWar%"
};  
/*var connectionProperties = {
    host: "cloudhiti.com",
    user: "cloudhitiadmin@cloudhiti.com",
    password: "cloudhitiadmin2017"
};*/

c.on('ready', function () {
    console.log('ready');
         c.get('/outgoing/productcatalog/194608/AC_Lens-ACLens_com_Main_Product_Catalog.txt.gz', function (err, stream) {
                 if (err) throw err;
                 console.log(stream);
                 stream.once('close', function () {
                            c.end();
                  });
                 stream.pipe(fs.createWriteStream('AC_Lens-ACLens_com_Main_Product_Catalog.txt.gz'));
         });   
        /* c.list(function (err, list) {
                if (err) throw err;
                list.forEach(function(element, index, array)
                {
                      console.log( element);
                        if (element.type === 'd') {
                            console.log('ignoring directory ' + element.name);
                         return;
                        } 

                        c.get(element.name, function (err, stream) {
                        if (err) throw err;
                         stream.once('close', function () {
                            c.end();
                        });
                        stream.pipe(fs.createWriteStream(element.name));
                        });
                });
         }); */
});

c.connect(connectionProperties); 