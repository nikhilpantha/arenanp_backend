import { Field, ID, InputType } from '@nestjs/graphql';
import { TournamentStatus, TournamentVisibility } from '@prisma/client';
import { IsEnum, IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

@InputType()
export class SuspendTournamentInput {
  @Field(() => ID)
  @IsString()
  tournamentId!: string;

  @Field({ description: 'Reason shown to the organizer.' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;
}

@InputType()
export class CancelTournamentInput {
  @Field(() => ID)
  @IsString()
  tournamentId!: string;

  @Field({ description: 'Reason shown to organizer + registered teams.' })
  @IsString()
  @MinLength(3)
  @MaxLength(500)
  reason!: string;
}

@InputType()
export class ApproveTournamentInput {
  @Field(() => ID)
  @IsString()
  tournamentId!: string;

  @Field({ nullable: true, description: 'Optional internal note.' })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  note?: string;
}

@InputType()
export class UpdateTournamentVisibilityInput {
  @Field(() => ID)
  @IsString()
  tournamentId!: string;

  @Field(() => TournamentVisibility)
  @IsEnum(TournamentVisibility)
  visibility!: TournamentVisibility;
}

@InputType()
export class UpdateTournamentStatusInput {
  @Field(() => ID)
  @IsString()
  tournamentId!: string;

  @Field(() => TournamentStatus)
  @IsEnum(TournamentStatus)
  status!: TournamentStatus;

  @Field({
    nullable: true,
    description: 'Required when transitioning to SUSPENDED / CANCELLED / REJECTED.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(500)
  reason?: string;
}
