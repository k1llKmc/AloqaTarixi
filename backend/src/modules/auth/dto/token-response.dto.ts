import {ApiProperty} from "@nestjs/swagger";

export class TokenResponseDto {
    @ApiProperty()
    accessToken: string;

    @ApiProperty()
    refreshToken: string;
}
