import { Router } from 'express';
import { leaders } from '../models';
import {
  verifyUser,
  verifyAdmin,
} from './auth/authenticate';

const router = Router();

router.route('/')
.get((req, res, next) => {
  // Get call to fetch the leaders
  leaders.find({}).then((leaders) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: leaders,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.post(verifyUser, verifyAdmin, (req, res, next) => {
  // Create a new leader
  leaders.create(req.body).then((leader) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: leader,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.put(verifyUser, verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('Put operation not allowed on route /leaders');
})
.delete(verifyUser, verifyAdmin, (req, res, next) => {
  // Delete all leaders
  leaders.remove({}).then((resp) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: resp,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
});

router.route('/:leaderId')
.get((req, res, next) => {
  // Get call to fetch the leader with the ID given
  leaders.findById(req.params.leaderId).then((leader) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: leader,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.post(verifyUser, verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not allowed on route /leaders/:leaderId with id: ' + req.params.leaderId);
})
.put(verifyUser, verifyAdmin, (req, res, next) => {
  // Update leader with specific ID
  leaders.findByIdAndUpdate(req.params.leaderId, 
    { $set: req.body },
    { new: true }
    ).then((leader) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: leader,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.delete(verifyUser, verifyAdmin, (req, res, next) => {
  // Delete leader with ID
  leaders.findByIdAndRemove(req.params.leaderId).then((resp) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: resp,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
});

export { router };