import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { UsersModule } from './Users/users.module';
import { ProductModule } from './Products/product.module';
import { AuthModule } from './Auth/auth.module';
import { loggerMiddleware } from './middleware/logger.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeorm from './Config/typeorm';
import { CategoriesModule } from './Categories/categories.module';
import { FileUploadModule } from './Gestion de Archivos/archivos/archivos.module';
import { OrdersModule } from './Orders/orders.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => config.get('typeorm')!,
    }),
    UsersModule,
    ProductModule,
    AuthModule,
    CategoriesModule,
    FileUploadModule,
    OrdersModule,
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '30m' },
    }),
  ],
  controllers: [],
  providers: [loggerMiddleware],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(loggerMiddleware).forRoutes('*');
  }
}
