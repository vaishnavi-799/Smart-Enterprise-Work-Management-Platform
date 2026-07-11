const dns = require("dns");

dns.setServers(["8.8.8.8"]);

dns.resolveSrv(
    "_mongodb._tcp.cluster1.4ahiztr.mongodb.net",
    (err, addresses) => {

        if(err){
            console.log(err);
        }
        else{
            console.log(addresses);
        }

    }
);