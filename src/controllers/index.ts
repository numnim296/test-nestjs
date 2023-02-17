import { PaymentController } from './payment/payment.controller';
import { DeviceController } from './device/device.controller';
import { CustomersController } from './customers/customers.controller';
import { RoleController } from './role/role.controller';
import { AuthController } from './auth/auth.controller';
import { Type } from '@nestjs/common'
import { UserController } from './user/user.controller';

export const controllers: Type[] = [
    UserController,
    AuthController,
    RoleController,
    CustomersController,
    DeviceController,
    PaymentController
]
