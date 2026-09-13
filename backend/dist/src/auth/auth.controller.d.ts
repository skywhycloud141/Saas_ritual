import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        access_token: string;
    }>;
    login(dto: LoginDto): Promise<{
        access_token: string;
    }>;
    getProfile(req: {
        user: {
            agencyId: any;
        };
    }): Promise<{
        projects: {
            name: string;
            id: string;
            length: number;
            width: number;
            sceneData: string;
            installationDate: Date;
            agencyId: string;
        }[];
        name: string;
        email: string;
        id: string;
        createdAt: Date;
        subscriptionUntil: Date | null;
        role: string;
    }>;
}
