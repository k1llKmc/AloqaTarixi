import {Injectable, UnauthorizedException} from "@nestjs/common";
import {UserService} from "../../user/services/user.service";
import {JwtService} from "@nestjs/jwt";
import {TokenResponseDto} from "../dto/token-response.dto";
import {User} from "../../user/entities/user.entity";
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (user && isPasswordValid) {
            return user;
        }
        throw new UnauthorizedException('Invalid credentials');
    }
    async login(email: string, password: string): Promise<TokenResponseDto> {
        const user = await this.validateUser(email, password);
        const payload = { userId: user.id, email: user.email, role: user.roles };

        const accessToken = this.jwtService.sign(payload, {
            expiresIn: '1d',
        });
        const refreshToken = this.jwtService.sign(payload, {
            expiresIn: '7d',
        });

        return {
            accessToken,
            refreshToken,
        };
    }

    async refresh(refreshToken: string): Promise<TokenResponseDto> {
        try {
            const payload = this.jwtService.verify(refreshToken);

            const user = await this.userService.findOne(payload.sub);
            if (!user) {
                throw new UnauthorizedException('User not found');
            }

            const newPayload = {
                userId: user.id,
                email: user.email,
                role: user.roles,
            };
            const newAccessToken = this.jwtService.sign(newPayload, {
                expiresIn: '15m',
            });
            const newRefreshToken = this.jwtService.sign(newPayload, {
                expiresIn: '7d',
            });

            return {
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            };
        } catch (error) {
            throw new UnauthorizedException('Invalid refresh token');
        }
    }
}