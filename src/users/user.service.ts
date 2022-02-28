import { UserAuthService } from "../utils/service.util";
import { UserInterface, UserLoginInterface } from "../utils/interface.util";
export const register = async (args: UserInterface, context: any) => {
  const res = await UserAuthService.registerUser(args);
  return res;
};

export const login = async (args: UserLoginInterface, context: any) => {
  const res = await UserAuthService.loginUser(args);
  return res;
};

export const currentUser = async (args: any, context: any) => {
  const res = await UserAuthService.currentUser(context);
  return res;
};

export const update = async (args: UserInterface, context: any) => {
  const res = await UserAuthService.updateUser(args, context);
  return res;
};
