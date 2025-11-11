// This is now the single source of truth for what a Customer is.
// It matches your Prisma schema.
export interface Customer {
  id: number;
  email: string;
  firstName: string | null;
  lastName: string | null;
  phone: string | null;
  companyName: string | null;
  address: string | null;
  city: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}
