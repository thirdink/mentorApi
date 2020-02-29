import { Router } from 'express';
import validate from 'express-validation';
import * as postController from './post.controllers';
import { authJwt } from '../../services/auth.services';
import postValidations from './post.validations';


const routes = new Router();

routes.post('/',
            authJwt,
            validate(postValidations.createPost),
            postController.createPost,
            );
routes.get('/',postController.getPostsList);
export default routes;