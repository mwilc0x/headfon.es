import passport from 'passport';
import scope from '../scope.json';
const { SCOPE_VALUES } = scope;

const base = passport.authenticate('spotify', { session: false, failureRedirect: '/' });

const redirect =  (req, res, next) => {
  return passport.authenticate('spotify', <any>{
    scope: SCOPE_VALUES,
    showDialog: true,
    session: false
  })(req, res, next);
}

export default {
  base,
  redirect
};
