import { Author } from "@prisma/client";

// Use the models created in Prisma to as a type interface.
// NOTE: If you hover over 'Author' in the imports from prisma client,
// you will notice Novels is that included. This is why we need to
// declare it in a type definition in order for it to be applied
// elsewhere in the app.
export interface AuthorTypes extends Author {
  novels: [];
}
