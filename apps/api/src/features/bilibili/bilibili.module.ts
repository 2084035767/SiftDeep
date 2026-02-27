import { Module, Global } from '@nestjs/common';
import { BilibiliService } from './bilibili.service';

@Global()
@Module({
  providers: [BilibiliService],
  exports: [BilibiliService],
})
export class BilibiliModule {}
