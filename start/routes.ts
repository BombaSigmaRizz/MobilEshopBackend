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
  router.get('products/:id', [ApiController, 'getProduct'])
  router.get('products/:id/reviews', [ApiController, 'getProductReviews'])
  router.get('check', [ApiController, 'isUp'])
  router.post('products', [ApiController, 'addProduct']).use(middleware.auth())
  router.get('products', [ApiController, 'getProducts'])
  router.get('uploads/*', [ApiController, 'getUpload'])
})

router.group(() => {
  router.post('login', [AuthController, 'login'])
  router.post('register', [AuthController, 'register'])
  router.post('logout', [AuthController, 'logout']).use(middleware.auth())
  router.get('me', [AuthController, 'me']).use(middleware.auth())
}).prefix('auth')
