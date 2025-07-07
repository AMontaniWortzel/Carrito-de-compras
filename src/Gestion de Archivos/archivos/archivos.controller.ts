import {
  Controller,
  UploadedFile,
  UseInterceptors,
  Post,
  Param,
  ParseUUIDPipe,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileUploadService } from './archivos.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes } from '@nestjs/swagger';
import { AuthGuard } from 'src/Auth/guard/auth.guard';
import { Role } from 'src/roles.enum';
import { Roles } from 'src/Decorators/role.decorators';
import { RolesGuard } from 'src/Auth/guard/roles.guard';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @ApiBearerAuth()
  @Post('uploadImage/:productId')
  @Roles(Role.Admin)
  @UseGuards(AuthGuard, RolesGuard)
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Imagen a subir a Cloudinary',
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
  @UseInterceptors(FileInterceptor('file'))
  uploadImage(
    @Param(
      'productId',
      new ParseUUIDPipe({
        version: '4',
        exceptionFactory: () =>
          new BadRequestException('The format of the Product ID is not valid.'),
      }),
    )
    productId: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({
            maxSize: 200000,
            message: 'File size is to large',
          }),
          new FileTypeValidator({
            fileType: /(jpg|jpeg|png|webp)$/,
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.fileUploadService.uploadImage(file, productId);
  }
}
