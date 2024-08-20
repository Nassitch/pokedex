import { Injectable } from '@nestjs/common';
import { AuthBody } from 'src/models/auth.body.type';
import { PrismaService } from 'src/prisma.service';
import { compare, hash } from "bcrypt";
import { UserDto } from 'src/models/user.dto';
import { JwtService } from '@nestjs/jwt';


@Injectable()
export class AuthService {
    constructor(private readonly prisma: PrismaService, private readonly jwt: JwtService) {}

    private async hashPassword({ password }: { password: string }) {
        const hashedPassword = await hash(password, 10);
        return hashedPassword;
    }

    private async hashValidate({ password, hashedPassword }: { password: string, hashedPassword: string }) {
        const passwordValidate = await compare(password, hashedPassword);
        return passwordValidate;
    }

    private authenticateUser({ id, email }: { id: number, email: string }) {
        const payload = { id, email };
        return {
            token : this.jwt.sign(payload)
        }
    }

    async logIn({ authBody }: { authBody: AuthBody }) {
        const { email, password } = authBody;
        const existUser = await this.prisma.user.findUnique({
            where: {
                email
            } 
        })
        if (!existUser) { 
            throw new Error(`Utilasateur ${password} n'existe pas!`)
        }
        const isPasswordSame = await this.hashValidate({ password, hashedPassword: existUser.password });
        if (!isPasswordSame) {
            throw new Error('Mot de passe incorrect');
        }
        return this.authenticateUser({ id: existUser.id, email: existUser.email });
    }

    async createUser(data: UserDto) {
        const password = data.password;

        const hashedPassword = await this.hashPassword({password});
        
        return this.prisma.user.create({
            data: {
                name: data.name,
                email: data.email,
                password: hashedPassword,
            },
        });
    }
    

}
