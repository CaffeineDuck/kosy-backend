import {
  Controller,
  Get,
  StreamableFile,
  Param,
  Post,
  UseInterceptors,
  UploadedFile,
  UseGuards,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { createReadStream } from 'fs';
import { join } from 'path';
import { Express } from 'express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private configService: ConfigService) {}

  @Get(':fileName')
  async getFile(@Param('fileName') fileName: string): Promise<StreamableFile> {
    const file = createReadStream(join(process.cwd(), 'uploads', fileName));
    return new StreamableFile(file);
  }

  @ApiConsumes('multipart/form-data')
  @ApiBearerAuth()
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(
    FileInterceptor('file'),
  )
  @Post()
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return {
      filename: file.filename,
      filepath: `uploads/${file.filename}`,
    }
    
  }
}
