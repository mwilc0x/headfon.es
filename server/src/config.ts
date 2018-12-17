const PORT = process.env.NODE_ENV === 'production' 
  ? process.env.PROD_PORT 
  : process.env.DEV_PORT;

export {
  PORT
};
