/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from './kernel.js'

const ApiController = () => import('#controllers/api_controller')
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.get('product/:id', [ApiController, 'getProduct']).use(middleware.auth())
  router.get('check', [ApiController, 'isUp'])
}).prefix('api')

router.group(() => {
  router.post('login', [AuthController, 'login'])
  router.post('register', [AuthController, 'register'])
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('me', [AuthController, 'me']).use(middleware.auth())
}).prefix('auth')
