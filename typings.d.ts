import { Author } from "@prisma/client";

// Use the models created in Prisma to as a type interface.
// NOTE: If you hover over 'Author' in the imports from prisma client,
// you will notice
export interface AuthorTypes extends Author {
  novels: [];
}
