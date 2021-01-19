import { MemTxnComponent } from '../views/mem-txn/mem-txn.component';

export const MemTxnRoutes =
{
  path: 'memorized_transactions',
  component: MemTxnComponent,
  data: {
    breadcrumb: 'Memorized Transactions'
  },
  children: [
    {
      path: 'new',
      component: MemTxnComponent,
      data: {
        breadcrumb: 'New'
      }
    }
  ]
};