import { Id } from './id';
import { User } from '../../main/users/entities/user.entity';

export class UsersBy extends Id {
  createdBy: User;
  updatedBy: User;
}
