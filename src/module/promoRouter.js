import { Router } from 'express';
import { promotion } from '../models';
import {
  verifyUser,
  verifyAdmin,
} from './auth/authenticate';


const router = Router();

router.route('/')
.get((req, res, next) => {
  // Get call to fetch the promotions
  promotion.find({}).then((promotions) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: promotions,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.post(verifyUser, verifyAdmin, (req, res, next) => {
  // Create a new promotion
  console.log('gets here tpp', promotion);
  promotion.create(req.body).then((promotion) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: promotion,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.put(verifyUser, verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('Put operation not allowed on route /promos');
})
.delete(verifyUser, verifyAdmin, (req, res, next) => {
  // Delete all promotions
  promotion.remove({}).then((resp) => {
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

router.route('/:promoId')
.get((req, res, next) => {
  // Get call to fetch the promotions of ID passed
  promotion.findById(req.params.promoId).then((promotion) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: promotion,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.post(verifyUser, verifyAdmin, (req, res, next) => {
  res.statusCode = 403;
  res.end('POST operation not allowed on route /promos/:promoId with id: ' + req.params.promoId);
})
.put(verifyUser, verifyAdmin, (req, res, next) => {
  // Update promotion with specific ID
  promotion.findByIdAndUpdate(req.params.promoId, 
    { $set: req.body },
    { new: true }
    ).then((promotion) => {
    res.setHeader('Content-Type', 'application/json');
    res.status('200').json({
      status: 200,
      success: true,
      data: promotion,
    });
  }, (error) => next(error))
  .catch((e) => {
    console.log(e);
    next(e);
  });
})
.delete(verifyUser, verifyAdmin, (req, res, next) => {
  // Delete all promotions
  promotion.findByIdAndRemove(req.params.promoId).then((resp) => {
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