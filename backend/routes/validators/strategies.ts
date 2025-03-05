const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
interface JwtOptions {
  jwtFromRequest: any;
  secretOrKey: string | undefined;
}

const opts: JwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY,
};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.SECRET_KEY; //normally store this in process.env.secret
const strategy = new JwtStrategy(opts, (jwt_payload, done) => {
  if (jwt_payload.email === "paul@nanosoft.co.za") {
    return done(null, true);
  }
  return done(null, false);
});

export default strategy;
