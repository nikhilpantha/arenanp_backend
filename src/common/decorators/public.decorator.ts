import { SetMetadata } from '@nestjs/common';

export const IS_PUBLIC_KEY = 'isPublic';

/**
 * Mark a controller / resolver / handler as accessible without a JWT.
 * Used by `JwtAuthGuard` and `GqlAuthGuard` to short-circuit auth.
 */
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
