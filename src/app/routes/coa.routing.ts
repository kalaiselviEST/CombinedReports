import { CoaComponent } from '../views/coa/coa.component';
import { NewFundComponent } from '../views/coa/new-fund/new-fund.component';
import { NewAccountComponent } from '../views/coa/new-account/new-account.component';
import { CoaFundsComponent } from '../views/coa/coa-funds/coa-funds.component';
import { CoaAccountsComponent } from '../views/coa/coa-accounts/coa-accounts.component';
import { CoaDepartmentsComponent } from '../views/coa/coa-departments/coa-departments.component';
import { NewDepartmentComponent } from '../views/coa/new-department/new-department.component';
import { ItemsComponent } from '../views/coa/coa-groups/coa-groups.component';
import { RatesTableComponent } from '../views/coa/coa-groups/rates-table/rates-table.component';
import { ItemDetailsComponent } from '../views/coa/coa-groups/group-details/group-details.component';

export const CoaRoutes =
{
  path: 'coa',
  component: CoaComponent,
  data: {
    breadcrumb: 'COA'
  },
  children: [
    {
      path: 'funds',
      component: CoaFundsComponent,
      data: {
        breadcrumb: 'Funds'
      },
      children: [
        {
          path: 'new',
          component: NewFundComponent,
          data: {
            breadcrumb: 'New'
          }
        },
        {
          path: 'edit/:id',
          component: NewFundComponent,
          data: {
            breadcrumb: 'Edit'
          }
        }
      ]
    }, {
      path: 'departments',
      component: CoaDepartmentsComponent,
      data: {
        breadcrumb: 'Departments'
      },
      children: [
        {
          path: 'new',
          component: NewDepartmentComponent,
          data: {
            breadcrumb: 'New'
          }
        },
        {
          path: 'edit/:id',
          component: NewDepartmentComponent,
          data: {
            breadcrumb: 'Edit'
          }
        }
      ]
    },
    {
      path: 'accounts',
      component: CoaAccountsComponent,
      data: {
        breadcrumb: 'Accounts'
      },
      children: [
        {
          path: 'new',
          component: NewAccountComponent,
          data: {
            breadcrumb: 'New'
          }
        },
        {
          path: 'edit/:id',
          component: NewAccountComponent,
          data: {
            breadcrumb: 'Edit'
          }
        }
      ]
    },
    {
      path: 'groups',
      component: ItemsComponent,
      data: {
        breadcrumb: 'Groups'
      },
      children: [
        {
          path: 'rates/:id',
          component: RatesTableComponent,
          data: {
            breadcrumb: 'Rates Table'
          }
        },
        {
          path: 'edit/:id',
          component: ItemDetailsComponent,
          data: {
            breadcrumb: 'Edit'
          }
        },
        {
          path: 'new',
          component: ItemDetailsComponent,
          data: {
            breadcrumb: 'New'
          }
        }
      ]
    },
    {
      path: "",
      redirectTo: "/coa/funds",
      pathMatch: 'full'
    }
  ]
};