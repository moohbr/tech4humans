import { CreateUserDTO } from "@/types/user/types";

export interface SignUpFormStore {
    data: CreateUserDTO;
    updateData: (data: CreateUserDTO) => void;
    clearData: () => void;
}