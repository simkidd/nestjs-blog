import { Injectable, NestMiddleware } from "@nestjs/common";
import { UserService } from "../user/services/user.service";
import { NextFunction, Request, Response } from "express";

declare global {
    namespace Express{
        interface Request {
            token?: string;
            user?: User;
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware{
    constructor(private userService: UserService){}

    async use(req: Request, res: Response, next: NextFunction) {
        const payload = req.headers?.authorization;

        const user = await this.userService.decodeJWT(payload)

        req.user = user;

        next()
    }
}