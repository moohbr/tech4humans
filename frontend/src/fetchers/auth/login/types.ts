import { User } from "@/types/user/types";

export type LoginResponse = {
    message: string;
    data: {
      token: string;
      user: User;
    };
}