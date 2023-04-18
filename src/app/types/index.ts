import { User } from '@prisma/client';

// This type is created by omitting the date type attributes for strings (or null if they're optionals)
// This is required because only plain objects can be passed to client components from server components (Date objects are not supported)
// So we use this type instead of User type coming from prisma to match the type of the object that is passed as a prop with this exact model (see getCurrentUser file)

export type SafeUser = Omit<
  User,
  'createdAt' | 'updatedAt' | 'emailVerified'
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};
