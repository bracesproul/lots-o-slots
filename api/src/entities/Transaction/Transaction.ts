import { Field, ObjectType, registerEnumType } from 'type-graphql';
import { Column, Entity, JoinColumn, ManyToOne, OneToOne } from 'typeorm';
import {
  AccountV2,
  BankOfAmericaTransaction,
  BitcoinTransaction,
  CashAppTransaction,
  ChaseTransaction,
  EmailLogV2,
  EthereumTransaction,
  MainEntity,
  PayPalTransaction,
  UserV2,
} from '@/entities';
import { PaymentStatus, PaymentType } from './types';
import { PaymentProvider } from '../Payment/Payment';

@Entity({ name: 'transactions' })
@ObjectType({
  implements: MainEntity.objectTypeImplements,
})
export default class Transaction extends MainEntity {
  @ManyToOne(() => UserV2, {
    nullable: true,
  })
  user?: UserV2;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'uuid', nullable: true })
  userId?: string;

  @Field(() => Number, {
    nullable: false,
  })
  @Column({ type: 'numeric', nullable: false })
  amount!: number;

  @Field(() => PaymentStatus, {
    nullable: false,
  })
  @Column({
    type: 'enum',
    nullable: false,
    enum: PaymentStatus,
    default: PaymentStatus.PENDING,
  })
  status!: PaymentStatus;

  @OneToOne(() => EmailLogV2)
  @JoinColumn({ name: 'emailLogId' })
  emailLog!: EmailLogV2;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  emailLogId!: string;

  @Field(() => PaymentProvider, {
    nullable: false,
  })
  @Column({ type: 'enum', enum: PaymentProvider, nullable: false })
  provider!: PaymentProvider;

  @Field(() => String, {
    nullable: false,
  })
  @Column({ type: 'varchar', nullable: false })
  senderName!: string;

  @Field(() => PaymentType, {
    nullable: false,
  })
  @Column({ type: 'enum', enum: PaymentType, nullable: false })
  paymentType!: PaymentType;

  @OneToOne(() => BitcoinTransaction, {
    nullable: true,
  })
  @JoinColumn({ name: 'bitcoinTransactionId' })
  bitcoinTransaction?: BitcoinTransaction;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  bitcoinTransactionId?: string;

  @OneToOne(() => EthereumTransaction, {
    nullable: true,
  })
  @JoinColumn({ name: 'ethereumTransactionId' })
  ethereumTransaction?: EthereumTransaction;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  ethereumTransactionId?: string;

  @OneToOne(() => PayPalTransaction, {
    nullable: true,
  })
  @JoinColumn({ name: 'payPalTransactionId' })
  payPalTransaction?: PayPalTransaction;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  payPalTransactionId?: string;

  @OneToOne(() => CashAppTransaction, {
    nullable: true,
  })
  @JoinColumn({ name: 'cashAppTransactionId' })
  cashAppTransaction?: CashAppTransaction;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  cashAppTransactionId?: string;

  @OneToOne(() => BankOfAmericaTransaction, {
    nullable: true,
  })
  @JoinColumn({ name: 'bankOfAmericaTransactionId' })
  bankOfAmericaTransaction?: BankOfAmericaTransaction;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  bankOfAmericaTransactionId?: string;

  @OneToOne(() => AccountV2, {
    nullable: true,
  })
  @JoinColumn({ name: 'accountId' })
  account?: AccountV2;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'uuid', nullable: true })
  accountId?: string;

  @OneToOne(() => ChaseTransaction, {
    nullable: true,
  })
  @JoinColumn({ name: 'chaseTransactionId' })
  chaseTransaction?: ChaseTransaction;

  @Field(() => String, {
    nullable: true,
  })
  @Column({ type: 'varchar', nullable: true })
  chaseTransactionId?: string;
}
