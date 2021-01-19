
export class Company {
  id: string;
  name: string;
  primaryContact: CompanyUser;
  userCount: number;
  licenseType: string;
  startDate: string;
  endDate: string;
  status: string;
}

export class CompanyDetail {
  id: string;
  name: string;
  primaryContact: CompanyUser;
  totalContracts: number;
  totalValue: number;
  totalCustomers: number;
  invoiceCount: number;
  userCount: number;
  licenseType: string;
  startDate: string;
  endDate: string;
  lastLogin: string;
  status: string;
  consecutiveDays: number;
  users: CompanyUser[];
}

class CompanyUser {
  id: string;
  name: string;
  email: string;
  createdDate: string;
  active: boolean;
}
