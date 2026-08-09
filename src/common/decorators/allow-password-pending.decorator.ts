import { SetMetadata } from '@nestjs/common';

export const ALLOW_PASSWORD_PENDING_KEY = 'allowPasswordPending';

/**
 * Let this handler run even though the caller still owes us a password change.
 *
 * Exactly two things need it: reading `me` (the client has to know who it is
 * to render the "choose a password" screen) and the mutation that changes the
 * password. Anything else would be a hole in the wall.
 */
export const AllowWhilePasswordPending = () => SetMetadata(ALLOW_PASSWORD_PENDING_KEY, true);
