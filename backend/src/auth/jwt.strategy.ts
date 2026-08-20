import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy,"jwt") {
    constructor(){
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "dfadsadsadsdedqwadsadsadsadsadsszzss"
        })
    }
    validate(payload:{sub:string;email:string}) {
        return {
            agencyId:payload.sub,
            email:payload.email
        }
    }
}