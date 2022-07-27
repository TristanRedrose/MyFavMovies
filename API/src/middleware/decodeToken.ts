import jwt from "jsonwebtoken";
import { secretKey } from "../env/env";
import { tokenPayload } from "../types/shared.types";

export function decodeToken(token:string) {
    
    try {
        const decoded = jwt.verify(token, secretKey) as tokenPayload
        return decoded.user.user_id
    } catch(err) {
        console.log(err);
    }
}