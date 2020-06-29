import { Router } from 'express';
import validate from 'express-validation';
import * as postController from './post.controllers';
import { authJwt } from '../../services/auth.services';
import postValidations from './post.validations';

const routes = new Router();

routes.post(
  '/',
  authJwt,
  validate(postValidations.createPost),
  postController.createPost,
);
routes.get('/', authJwt,postController.getPostsList);
routes.get('/:id', authJwt,postController.getPostById);
routes.patch(
  '/:id',
  authJwt,
  validate(postValidations.updatePost),
  postController.updatePost,
);
routes.post('/:id/favorite', authJwt, postController.favoritePost);
export default routes;
