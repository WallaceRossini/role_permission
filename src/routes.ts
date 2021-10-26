import { Router } from "express";
import { GetAllProductsController } from "./controllers/GetAllProductsController";
import { PermissionController } from "./controllers/PermissionController";
import { ProductController } from "./controllers/ProductController";
import { RoleController } from "./controllers/RoleController";
import { RolePermissionController } from "./controllers/RolePermissionController";
import { SessionController } from "./controllers/SessionController";
import { UserController } from "./controllers/UserController";
import { Authenticated } from './middlewares/Authenticated';
import { can, is } from './middlewares/Authorization';
import { UserACLController } from "./controllers/UserAccessControlListController";

const routes = Router();

const get_all_product_ctrl = new GetAllProductsController();
const permission_ctrl = new PermissionController();
const product_ctrl = new ProductController();
const role_ctrl = new RoleController();
const role_permission_ctrl = new RolePermissionController();
const session_ctrl = new SessionController();
const user_acl_ctrl = new UserACLController();
const user_ctrl = new UserController();

// ROUTE CREATE USER
routes.post('/users', user_ctrl.handle);

// ROUTE LOG IN
routes.post('/login', session_ctrl.handle);

// ROUTE CREATE PRODUCTS
routes.post(
  '/products',
  Authenticated(),
  can(['create_product', 'list_product']),
  product_ctrl.handle
);

// ROUTE LIST ALL PRODUCTS
routes.get(
  '/products',
  get_all_product_ctrl.handle
)

// ROUTE CREATE ROLE
routes.post(
  '/roles',
  Authenticated(),
  is(['admin']),
  role_ctrl.handle
);

// ROUTE CREATE PERMISSION
routes.post(
  '/permissions',
  Authenticated(),
  permission_ctrl.handle
);

// ROUTE ACCESS CONTROL LIST
routes.post(
  '/users/acl',
  Authenticated(),
  user_acl_ctrl.handle
);

routes.post(
  '/roles/:role_id',
  role_permission_ctrl.handle
);

export { routes }


