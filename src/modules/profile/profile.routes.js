import { Router } from 'express';
import { authJwt } from '../../services/auth.services';
import * as profileController from './profile.controllers';


const routes = new Router();

routes.post('/',
        authJwt,
        profileController.createProfile,
        );

routes.get('/',
        authJwt,
        profileController.getProfileList);


export default routes;
