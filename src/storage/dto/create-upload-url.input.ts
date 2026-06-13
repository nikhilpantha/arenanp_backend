import { Field, InputType } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, Matches, MaxLength } from 'class-validator';

import { UploadCategory } from '../storage.constants';

// Side-effect import: registers the UploadCategory enum with GraphQL.
import '../storage.constants';

@InputType({
  description: 'Ask the backend for a presigned URL to upload one file directly to S3.',
})
export class CreateUploadUrlInput {
  @Field(() => UploadCategory, {
    description: 'What the file is — fixes the S3 prefix and accepted types.',
  })
  @IsEnum(UploadCategory)
  category!: UploadCategory;

  @Field({
    description:
      'MIME type of the file, e.g. "image/jpeg". Must match the category and the PUT Content-Type header.',
  })
  @IsString()
  @Matches(/^[\w.+-]+\/[\w.+-]+$/, { message: 'contentType must be a valid MIME type' })
  contentType!: string;

  @Field({
    nullable: true,
    description:
      'Original filename — optional, used only to derive the extension when the MIME is ambiguous.',
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  filename?: string;
}
