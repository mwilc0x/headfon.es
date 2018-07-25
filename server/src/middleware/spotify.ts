import passport from 'passport';
import scope from '../scope.json';
const { SCOPE_VALUES } = scope;

const base = passport.authenticate('spotify');

const redirect =  (req, res, next) => {
  req.session.spotifyScopes = req.query.scopes ? Object.keys(req.query.scopes) : SCOPE_VALUES;    
  return passport.authenticate('spotify', <any>{
    scope: req.session.spotifyScopes,
    showDialog: true
  })(req, res, next);
}

export default {
  base,
  redirect
};
