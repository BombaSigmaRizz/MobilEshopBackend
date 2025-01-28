/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'

const ApiController = () => import('#controllers/api_controller')
const AuthController = () => import('#controllers/auth_controller')

router.group(() => {
  router.get('product/:id', [ApiController, 'getProduct'])
}).prefix('api')

router.group(() => {
  router.post('login', [AuthController, 'login'])
  router.post('register', [AuthController, 'register'])
  router.get('me', [AuthController, 'me'])
}).prefix('auth')