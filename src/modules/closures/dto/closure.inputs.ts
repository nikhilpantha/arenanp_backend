import { Field, ID, InputType } from '@nestjs/graphql';
import { Type } from 'class-transformer';
import { IsBoolean, IsDate, IsOptional, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateClosureInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field(() => ID, {
    nullable: true,
    description: 'Court to block; omit to close the whole venue (all courts).',
  })
  @IsOptional()
  @IsString()
  courtId?: string;

  @Field({ description: 'Block start (absolute instant).' })
  @Type(() => Date)
  @IsDate()
  startAt!: Date;

  @Field({ description: 'Block end (absolute instant); must be after startAt.' })
  @Type(() => Date)
  @IsDate()
  endAt!: Date;

  @Field({ nullable: true, description: 'Shown to players, e.g. "Maintenance", "Dashain".' })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  reason?: string;
}

@InputType()
export class ListClosuresInput {
  @Field(() => ID) @IsString() venueId!: string;

  @Field({ nullable: true, description: 'Only closures that have not yet ended.' })
  @IsOptional()
  @IsBoolean()
  upcomingOnly?: boolean;
}
