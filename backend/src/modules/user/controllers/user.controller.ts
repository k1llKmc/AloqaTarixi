import { Public } from "../../../common/decorators/public.decorator";
import {
    BadRequestException,
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Post,
    Put,
} from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { UserService } from "../services/user.service";
import { ApiResponse, ApiTags } from "@nestjs/swagger";
import { GetUserDto } from "../dto/get-user.dto";
import { UpdateUserDto } from "../dto/update-user.dto";

@ApiTags('users')
@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Public()
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        try {
            return this.userService.create(createUserDto);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Get()
    async getAllUsers() {
        try {
            return this.userService.findAll();
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @ApiResponse({
        status: 200,
        type: GetUserDto,
    })
    @Get(':id')
    async getUserById(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.userService.findOne(id);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @ApiResponse({
        status: 200,
        type: GetUserDto,
    })
    // @Get('getUserProfile')
    // async getUserProfile(@Request() req) {
    //     try {
    //         return req.user;
    //     } catch (err) {
    //         throw new BadRequestException(err.message);
    //     }
    // }

    @Put(':id')
    async update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateUserDto: UpdateUserDto,
    ) {
        try {
            return this.userService.update(id, updateUserDto);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }

    @Delete(':id')
    async remove(@Param('id', ParseIntPipe) id: number) {
        try {
            return this.userService.remove(id);
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
}
