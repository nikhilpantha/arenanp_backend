import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class OtpRequestResult {
  @Field()
  phoneNumber!: string;

  @Field(() => Int, { description: 'How long until the OTP expires.' })
  expiresInSeconds!: number;

  @Field(() => Int, { description: 'Seconds the client must wait before requesting another OTP.' })
  resendAvailableInSeconds!: number;

  @Field({ nullable: true, description: 'Only populated in dev (SMS_PROVIDER=stub).' })
  devCode?: string;

  @Field({
    nullable: true,
    description: 'True when this request granted a capability the account did not have yet.',
  })
  roleAdded?: boolean;
}
