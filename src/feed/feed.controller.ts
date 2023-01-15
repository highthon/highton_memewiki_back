import { Controller, Get, Post } from '@nestjs/common';

@Controller('feed')
export class FeedController {
  @Post()
  createPost() {}

  @Get()
  getAllPost() {}

  @Get()
  getMyPost() {}

  @Get()
  getPostByTag() {}
}
