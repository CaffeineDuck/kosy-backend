import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { imageFileFilter, editFileName } from 'src/utils';
import { UploadsController } from './uploads.controller';

@Module({
  controllers: [UploadsController],
  imports: [
    MulterModule.registerAsync({
      useFactory: async (configService: ConfigService) => ({
        dest: await configService.get('MULTER_DEST'),
        fileFilter: imageFileFilter,
        storage: diskStorage({
          filename: editFileName,
          destination: await configService.get('MULTER_DEST'),
        }),
      }),
      inject: [ConfigService],
    }),
  ],
})
export class UploadsModule {}
