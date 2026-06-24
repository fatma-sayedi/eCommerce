import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
type JwtPayload = {
    sub: string; //id
    email: string;
    role: string;

};
@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.ACCESSKEY as string,
        });
    }
    validate(payload: JwtPayload) {
        return {
            userId: payload.sub,
            email: payload.email,
            role: payload.role,
        }
    }
}