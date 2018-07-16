const HOST = process.env.NODE_ENV === 'production' 
  ? process.env.PROD_HOST 
  : process.env.DEV_HOST;

const PORT = process.env.NODE_ENV === 'production' 
  ? process.env.PROD_PORT 
  : process.env.DEV_PORT;

export {
  HOST,
  PORT
};
