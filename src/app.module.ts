import { Module } from '@nestjs/common';
import { PrismaModule } from './modules/prisma/prisma.module';
import { UserModule } from './modules/users/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { MailerModule } from '@nestjs-modules/mailer';
import { HotelsModule } from './modules/hotels/hotels.module';
import { ReservationsModule } from './modules/reservations/reservations.module';
import { RedisModule } from '@nestjs-modules/ioredis';

@Module({
  imports: [
    PrismaModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 5000,
      limit: 3
    }]),
    MailerModule.forRoot({
      transport: process.env.SMTP,
      defaults: {
        from: `"hotel" <${process.env.EMAIL_USER}>`,
      }
    }),
    HotelsModule,
    ReservationsModule,
    RedisModule.forRoot({
      type: 'single',
      url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    }),
    /*
    ServeStaticModule.forRoot(
      {
        rootPath: join(__dirname, '..', 'uploads'),
        serveRoot: '/user-avatar',
      },
      {
        rootPath: join(__dirname, '..', 'uploads-hotel'),
        serveRoot: '/hotel-image',
      },
    ),
    */
  ],
  providers: [
    {
      provide: 'APP_GUARD',
      useClass: ThrottlerGuard
    }
  ]
})
export class AppModule { }
