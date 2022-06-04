import { GetCurrentUserId, Public } from '@/common/decorator';
import { UserService, UserProfileService } from '@/user/service/index';
import { multerOptions2 } from '@/utils/multerOptions';
import { Controller, Get, Post, Delete, UseInterceptors, UploadedFile } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import multer from 'multer';

@ApiTags('user')
@Controller('/user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userProfileService: UserProfileService,
  ) {}

  @Public()
  @Get()
  async getCurrentUser(@GetCurrentUserId() userId: number) {
    return await this.userService.getCurrentUser(userId);
  }

  // 회원가입 후에 프로필 등록
  @Post('/profile')
  @UseInterceptors(FileInterceptor('file', multerOptions2))
  async profileUpload(
    @GetCurrentUserId() userId: number,
    @UploadedFile() file: Express.Multer.File,
  ){
    return await this.userProfileService.profileUp(userId, file);
  }

  @Delete('/profile')
  async profileDelete(
    @GetCurrentUserId() userId: number
  ){
    return await this.userProfileService.profileDel(userId);
  }

  @Get('/profile')
  async profileGet(
    @GetCurrentUserId() userId: number
  ){
    return await this.userProfileService.profileGet(userId);
  }
}
