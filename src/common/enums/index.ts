import { registerEnumType } from '@nestjs/graphql';
import { OrganizerStatus, UserRole, VenueOwnerStatus } from '@prisma/client';

registerEnumType(UserRole, {
  name: 'UserRole',
  description: 'Base user role. USER for everyone, SUPER_ADMIN for platform admins.',
});

registerEnumType(OrganizerStatus, {
  name: 'OrganizerStatus',
  description:
    'Lifecycle of a user requesting tournament-organizer access. Approved organizers can create tournaments.',
});

registerEnumType(VenueOwnerStatus, {
  name: 'VenueOwnerStatus',
  description:
    'Lifecycle of a user requesting venue-owner access. Approved venue owners can create venues.',
});

export { OrganizerStatus, UserRole, VenueOwnerStatus };
