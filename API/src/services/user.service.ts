import userStore from "../stores/user.store";
import { User } from "../types/user.types";


interface IUserService {
    getAuthenticatedUser: (username:string, password:string) => Promise<User | null>
    addUser: (username:string, password:string) => Promise<User | null>
}

class UserService implements IUserService {
    async getAuthenticatedUser(username:string, password:string): Promise<User | null> {
        const user = await userStore.getUser(username);
        if (user && user.password === password) {
            return user;
        }

        return null;
    }

    async addUser(username:string, password:string): Promise<User | null> {
        const userExists = await userStore.userExists(username);
        if (userExists) {
            return null;
        }
        const user = await userStore.addUser(username, password);
        return user;
    }
}

export default new UserService as IUserService;