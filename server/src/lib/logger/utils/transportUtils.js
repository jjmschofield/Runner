module.exports = {
  addTransportSync: (logger, transportConstructor, logLevel) => {
    const transport = transportConstructor(logLevel);
    logger.add(transport.constructor, transport.options);
  },
};
