const dns = require('dns');

const configureDns = (servers = []) => {
  if (!servers.length) {
    return false;
  }

  dns.setServers(servers);
  return true;
};

const createIpv4Lookup = () => {
  return (hostname, options, callback) => {
    dns.resolve4(hostname, (error, addresses) => {
      if (error) {
        return callback(error);
      }

      if (options?.all) {
        return callback(
          null,
          addresses.map((address) => ({
            address,
            family: 4
          }))
        );
      }

      return callback(null, addresses[0], 4);
    });
  };
};

module.exports = {
  configureDns,
  createIpv4Lookup
};
