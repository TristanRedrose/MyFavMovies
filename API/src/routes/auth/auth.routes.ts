import express from "express";
import { AuthRequest } from "../../types/auth.types";
import { TypedRequestBody } from "../../types/shared.types";
import { body, validationResult } from "express-validator";
import authController from "../../controllers/auth.controller";

const router = express.Router();


router.post('/register', 
    body('username').isLength({ min:1 }),
    body('password').isLength({ min:1 }),
    (req: TypedRequestBody<AuthRequest>, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return authController.register(req.body, res);
        } catch (err) {
            console.log(err);
        }
    }
)

router.post('/login',
    body('username').isLength({ min:1 }),
    body('password').isLength({ min:1 }),  
    (req: TypedRequestBody<AuthRequest>, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
            return authController.login(req.body, res);
        } catch (err) {
            console.log(err);
        }
    }
)

export default router;