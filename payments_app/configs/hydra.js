module.exports = {
  environment: process.env.NODE_ENV,
  hydra: {
    serviceName: "payments",
    serviceDescription: "Hydra Payments Processor",
    serviceVersion: "1.0.0",
    serviceIP: "127.0.0.1",
    serviceDNS: "",
    servicePort: parseInt(process.env.PORT),
    serviceType: "mcp",
    serviceWorker: false,
    redis: {
      host: "127.0.0.1",
      port: 6379,
      db: 15,
    },
  },
};
