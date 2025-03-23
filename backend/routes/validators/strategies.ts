import {
  Strategy as JwtStrategy,
  ExtractJwt,
  StrategyOptions,
} from "passport-jwt";
import userQueries from "../../models/userQueries.js";

const opts: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || "fallback-dev-secret",
};

const strategy = new JwtStrategy(opts, async (jwt_payload, done) => {
  try {
    // Find user in database by ID from token
    const user = await userQueries.getUserById(jwt_payload.id);
    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
});

export default strategy;
