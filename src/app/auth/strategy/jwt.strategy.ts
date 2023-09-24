import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { User } from "src/app/user/schemas/user.schema";
import { UserService } from "src/app/user/services/user.service";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        private userService: UserService,
        private configService: ConfigService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: configService.get<string>('JWT_SECRET')
        })
    }

    async validate(payload: any) {
        try {
            if (!payload) {
                throw new UnauthorizedException()
            }

            const user: User = await this.userService.getUserByEmail(payload.email);

            if (!user) {
                throw new UnauthorizedException()
            }

            return user

        } catch (error) {
            throw error
        }
    }
}