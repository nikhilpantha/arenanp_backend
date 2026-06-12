import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Sport as PrismaSport } from '@prisma/client';

@ObjectType({
  description: 'Compact sport reference embedded in venue / booking / tournament payloads.',
})
export class SportStub {
  @Field(() => ID) id!: string;
  @Field() slug!: string;
  @Field() name!: string;
  /** Stored S3 object key; presigned to a download URL by SportStubResolver. */
  iconUrl?: string;
}

export function mapSportStub(s: Pick<PrismaSport, 'id' | 'slug' | 'name' | 'iconUrl'>): SportStub {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    iconUrl: s.iconUrl ?? undefined,
  };
}
