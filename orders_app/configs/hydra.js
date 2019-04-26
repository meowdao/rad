module.exports = {
  hydra: {
    serviceName: "orders",
    serviceDescription: "Hydra Orders App",
    serviceVersion: "1.0.0",
    serviceIP: "127.0.0.1",
    serviceDNS: "",
    servicePort: process.env.PORT,
    serviceType: "mcp",
    serviceWorker: false,
    redis: {
      url: process.env.REDIS_URL
    },
  },
};
