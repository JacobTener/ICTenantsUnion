const LocalStrategy = require('passport-local').Strategy
const bcrypt = require('bcrypt');

function initialize(passport, getUserByUsername, getUserById) {
    const authenticateUser = async (username, password, done) => {
        // Use function parameter to query for user
        const user = await getUserByUsername(username);
        if (user == null) {
            return done(null, false, {message: 'Incorrect Username/Password'});
        }

        try {
            // Use bcrypt to compare password hashes
            if (await bcrypt.compare(password, user.password)) {
                return done(null, user);
            } else {
                return done(null, false, {message: 'Incorrect Username/Password'});
            }
        } catch (error) {
            return done(error);
        }
    }

    // Local Strategy
    passport.use(new LocalStrategy(authenticateUser))

    passport.serializeUser((user, done) => done(null, user.id))
    passport.deserializeUser((id, done) => {
        return done(null, getUserById(id))
      })
}

module.exports = initialize;