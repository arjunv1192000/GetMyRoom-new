const serverConfig = (server,config) => {
  const startServer = () => {
    server.listen(config.port,() => {
      console.log(`Server listening on Port 3000`);
    });
  };
  return {
    startServer,
  };
};

export default serverConfig;