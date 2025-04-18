import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./entities/user.entity";
import {UserController} from "./controllers/user.controller";
import {UserService} from "./services/user.service";


@Module({
    imports: [
        TypeOrmModule.forFeature([User]), // Register the User repository
    ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})
export class UserModule {}