import {
  NestjsQueryGraphQLModule,
  PagingStrategies,
} from '@ptc-org/nestjs-query-graphql';
import { NestjsQueryTypeOrmModule } from '@ptc-org/nestjs-query-typeorm';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DriverTransactionEntity } from '@ridy/database/driver-transaction.entity';
import { DriverWalletEntity } from '@ridy/database/driver-wallet.entity';
import { PaymentGatewayEntity } from '@ridy/database/payment-gateway.entity';
import { RequestEntity } from '@ridy/database/request.entity';

import { GqlAuthGuard } from '../auth/jwt-gql-auth.guard';
import { DriverTransactionDTO } from './dto/driver-transaction.dto';
import { DriverWalletDTO } from './dto/driver-wallet.dto';
import { PaymentGatewayDTO } from './dto/payment-gateway.dto';
import { EarningsService } from './earnings.service';
import { WalletResolver } from './wallet-resolver';
import { SavedPaymentMethodEntity } from '@ridy/database/saved-payment-method.entity';
import { SavedPaymentMethodDto } from './dto/saved-payment-method.dto';
import { GiftCodeEntity } from '@ridy/database/gift-code.entity';
import { CommonCouponModule } from '@ridy/coupon';
import { HttpModule } from '@nestjs/axios';
import { CryptoService } from '@ridy/database';
import { WalletService } from './wallet.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([RequestEntity]),
    CommonCouponModule,
    HttpModule,
    NestjsQueryGraphQLModule.forFeature({
      imports: [
        NestjsQueryTypeOrmModule.forFeature([
          DriverTransactionEntity,
          DriverWalletEntity,
          PaymentGatewayEntity,
          SavedPaymentMethodEntity,
          GiftCodeEntity,
        ]),
      ],
      resolvers: [
        {
          EntityClass: DriverTransactionEntity,
          DTOClass: DriverTransactionDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
        },
        {
          EntityClass: DriverWalletEntity,
          DTOClass: DriverWalletDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          guards: [GqlAuthGuard],
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: PaymentGatewayEntity,
          DTOClass: PaymentGatewayDTO,
          read: { one: { disabled: true } },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
        {
          EntityClass: SavedPaymentMethodEntity,
          DTOClass: SavedPaymentMethodDto,
          guards: [GqlAuthGuard],
          read: { disabled: false },
          create: { disabled: true },
          update: { disabled: true },
          delete: { disabled: true },
          pagingStrategy: PagingStrategies.NONE,
        },
      ],
    }),
  ],
  providers: [WalletResolver, EarningsService, CryptoService, WalletService],
  exports: [WalletService],
})
export class WalletModule {}
