import { ContactsComponent } from '../views/contacts/contacts.component';
import { CustomerDetailsComponent } from '../views/contacts/customer-details/customer-details.component';
import { VendorDetailsComponent } from '../views/contacts/vendor-details/vendor-details.component';
import { EmployeeDetailsComponent } from '../views/contacts/employee-details/employee-details.component';
import { PaymentDetailsComponent } from '../views/contacts/payment-details/payment-details.component';

export const ContactsRoutes =
{
  path: 'contacts',
  component: ContactsComponent,
  data: {
    breadcrumb: 'Contacts'
  },
  children: [
    {
      path: 'new',
      component: ContactsComponent,
      data: {
        breadcrumb: 'New'
      }
    },
    {
      path: 'customer-details',
      component: CustomerDetailsComponent,
      data: {
        breadcrumb: 'Customer Details'
      }
    },
    {
      path: 'vendor-details',
      component: VendorDetailsComponent,
      data: {
        breadcrumb: 'Vendor Details'
      }
    },
    {
      path: 'employee-details',
      component: EmployeeDetailsComponent,
      data: {
        breadcrumb: 'Employee Details'
      }
    },
    {
      path: 'payment-details',
      component: PaymentDetailsComponent,
      data: {
        breadcrumb: 'Payment Details'
      }
    }
  ]
};