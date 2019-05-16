import { Router } from 'express';
import passport from 'passport';
import { users } from '../models';
import {
  getToken, verifyUser, verifyAdmin,
} from './auth/authenticate';


const router = Router();

router.post('/login', passport.authenticate('local'), (req, res) => {
  var token = getToken({_id: req.user._id});
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({success: true, token: token, status: 'You are successfully logged in!'});
});

router.post('/signup', (req, res, next) => {
  users.register(new users({username: req.body.username}), 
    req.body.password, (err, user) => {
    if(err) {
      res.statusCode = 500;
      res.setHeader('Content-Type', 'application/json');
      res.json({err: err});
    }
    else {
      if (req.body.firstName)
        user.firstName = req.body.firstName;
      if (req.body.lastname)
        user.lastName = req.body.lastName;
      user.save((err, user) => {
        if (err) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.json({err: err});
          return ;
        }
        passport.authenticate('local')(req, res, () => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json({success: true, status: 'Registration Successful!'});
        });
      });
    }
  });
});

router.get('/logout', (req, res) => {
  if (req.session) {
    req.session.destroy();
    res.clearCookie('session-id');
    res.redirect('/');
  }
  else {
    var err = new Error('You are not logged in!');
    err.status = 403;
    next(err);
  }
});

router.get('/', verifyUser, verifyAdmin, (req, res, next) => {
  users.find({}).then((user) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: user,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})

export { router };