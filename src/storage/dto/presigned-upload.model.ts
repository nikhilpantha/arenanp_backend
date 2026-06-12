import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description:
    'A presigned S3 upload. PUT the file to `uploadUrl`, then store `key` in the relevant mutation.',
})
export class PresignedUpload {
  @Field({
    description:
      'The S3 object key. Persist THIS (not uploadUrl) in avatarUrl / imageUrls / documentUrls etc.',
  })
  key!: string;

  @Field({
    description:
      'Presigned URL to PUT the file to. Send the same Content-Type header used to request it.',
  })
  uploadUrl!: string;

  @Field({ description: 'HTTP method to use against uploadUrl (always "PUT").' })
  method!: string;

  @Field({ description: 'Content-Type header the client MUST send on the PUT.' })
  contentType!: string;

  @Field(() => Int, { description: 'Seconds until uploadUrl expires — PUT promptly.' })
  expiresIn!: number;

  @Field(() => Int, { description: 'Advisory max file size in bytes for this category.' })
  maxBytes!: number;
}
