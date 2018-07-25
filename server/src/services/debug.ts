export default (app) => {
  if (true) {
    const morgan = require('morgan');
    const uuid = require('node-uuid');
  
    morgan.token('id', (req) => {
      return req.id;
    });
    morgan.token('cookie', (req, res) => { 
      return req.headers['cookie'] 
    });
   
    const assignId = (req, res, next) => {
      req.id = uuid.v4();
      next();
    }
      
    app.use(assignId);
    app.use(morgan(':id :method :url :cookie :response-time'));
  }
}

