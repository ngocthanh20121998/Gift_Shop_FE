const passport = require('passport')
const JwtStrategy = require('passport-jwt').Strategy
const LocalStrategy = require('passport-local').Strategy
const { ExtractJwt } = require('passport-jwt')
const { JWT_SECRET } = require('../configs/index')

const User = require('../models/User')

passport.use(new JwtStrategy({  
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken('Authorization'),
  secretOrKey: JWT_SECRET
}, async (payload, done)=>{
  try {
    console.log('payload', payload)
    const user = await User.findById(payload.sub)

    if(!user) return done(null, false)
    done(null, user)
  } catch (error) {
    done(err, false)
  }
}))

passport.use(new LocalStrategy({
  usernameField: 'email'
}, async (email, password, done) =>{
  try {

    const user = await User.findOne({email})
    if(!user) return done({message: 'Email không tồn tại!'}, false)
    
    if(user.password!=password) return done({message: 'Mật khẩu không chính xác!'}, false)
    else {
      if(user.status == false) return done({message: 'Tài khoản đã bị chặn!'}, false)
        else done(null, user)
    }
  } catch (error) {
    done(error, false)
  }
}))