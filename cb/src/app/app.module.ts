import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { ChartsModule } from 'ng2-charts';
import { SimplebarAngularModule } from 'simplebar-angular';
import { CookieService } from 'ngx-cookie-service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BindOnceDirective } from './_directives/bindonce.directive';
import { DecimalOnlyDirective } from './_directives/decimalonly.directive';

import { AppRouterModule } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './_layout/header/header.component';
import { MasterTemplateComponent } from './master-template/master-template.component';
import { SidemenuComponent } from './_layout/sidemenu/sidemenu.component';
import { BreadcrumbsComponent } from './_layout/breadcrumbs/breadcrumbs.component';


import { ToastComponent } from './_components/toast/toast.component';
import { DotLoaderComponent } from './_components/dot-loader/dot-loader.component';
import { LanguageComponent } from './_language/language.component';
import { RequestInterceptor } from './_helpers/request.interceptor';
import { MemTxnComponent } from './views/mem-txn/mem-txn.component';
import { DropdownSelectComponent } from './_components/selects/dropdown-select/dropdown-select.component';
import { ContactsComponent } from './views/contacts/contacts.component';
import { ContactsListComponent } from './views/contacts/contacts-list/contacts-list.component';
import { ContactBasicInfoComponent } from './views/contacts/contact-basic-info/contact-basic-info.component';
import { ContactAddressComponent } from './views/contacts/contact-address/contact-address.component';
import { ContactAdditionalComponent } from './views/contacts/contact-additional/contact-additional.component';
import { CustomerHistoryComponent } from './views/contacts/customer-history/customer-history.component';
import { HistoryUtilityBillingComponent } from './views/contacts/customer-history/history-utility-billing/history-utility-billing.component';
import { HistoryPropertyTaxComponent } from './views/contacts/customer-history/history-property-tax/history-property-tax.component';
import { VendorEmployeeHistoryComponent } from './views/contacts/vendor-employee-history/vendor-employee-history.component';
import { HistoryVendorComponent } from './views/contacts/vendor-employee-history/history-vendor/history-vendor.component';
import { HistoryEmployeeComponent } from './views/contacts/vendor-employee-history/history-employee/history-employee.component';
import { CustomerDetailsComponent } from './views/contacts/customer-details/customer-details.component';
import { VendorDetailsComponent } from './views/contacts/vendor-details/vendor-details.component';
import { PaymentDetailsComponent } from './views/contacts/payment-details/payment-details.component';
import { EmployeeDetailsComponent } from './views/contacts/employee-details/employee-details.component';
import { EmployeeInfoComponent } from './views/contacts/employee-details/employee-info/employee-info.component';
import { EmployeeEarningsAdditionsComponent } from './views/contacts/employee-details/employee-earnings-additions/employee-earnings-additions.component';
import { EmployeeTaxesBenefitsComponent } from './views/contacts/employee-details/employee-taxes-benefits/employee-taxes-benefits.component';
import { EmployeeCompensatedAbsencesComponent } from './views/contacts/employee-details/employee-compensated-absences/employee-compensated-absences.component';
import { EmployeeActivitiesComponent } from './views/contacts/employee-details/employee-activities/employee-activities.component';
import { PropertiesComponent } from './views/properties/properties.component';
import { PropertiesListComponent } from './views/properties/properties-list/properties-list.component';
import { PropertyDetailsComponent } from './views/properties/property-details/property-details.component';
import { PropertyHistoryComponent } from './views/properties/property-history/property-history.component';
import { CustomDetailsComponent } from './views/properties/custom-details/custom-details.component';
import { OwnersComponent } from './views/properties/property-history/owners/owners.component';
import { SalesHistoryComponent } from './views/properties/property-history/sales-history/sales-history.component';
import { ValuationHistoryComponent } from './views/properties/property-history/valuation-history/valuation-history.component';
import { TaxBillingHistoryComponent } from './views/properties/property-history/tax-billing-history/tax-billing-history.component';
import { CustomizeComponent } from './views/properties/customize/customize.component';
import { CoaComponent } from './views/coa/coa.component';
import { CoaFundsComponent } from './views/coa/coa-funds/coa-funds.component';
import { CoaFundsRowComponent } from './views/coa/coa-funds/coa-funds-row.component';
import { CoaDepartmentsComponent } from './views/coa/coa-departments/coa-departments.component';
import { CoaDepartmentsRowComponent } from './views/coa/coa-departments/coa-departments-row.component';
import { CoaAccountsComponent } from './views/coa/coa-accounts/coa-accounts.component';
import { CoaAccountsRowComponent } from './views/coa/coa-accounts/coa-accounts-row.component';
import { NewFundComponent } from './views/coa/new-fund/new-fund.component';
import { NewDepartmentComponent } from './views/coa/new-department/new-department.component';
import { NewAccountComponent } from './views/coa/new-account/new-account.component';
import { SelectPortalComponent } from './login/select-portal/select-portal.component';
import { FundSelectComponent } from './_components/selects/fund-select/fund-select.component';
import { DepartmentSelectComponent } from './_components/selects/department-select/department-select.component';
import { AccountSelectComponent } from './_components/selects/account-select/account-select.component';
import { AccountTypeSelectComponent } from './_components/selects/account-type-select/account-type-select.component';
import { BoxW2SelectComponent } from './_components/selects/box-w2-select/box-w2-select.component';
import { Box1099SelectComponent } from './_components/selects/box-1099-select/box-1099-select.component';
import { ItemsComponent } from './views/coa/coa-groups/coa-groups.component';
import { ItemsRowComponent } from './views/coa/coa-groups/coa-groups-row.component';
import { RatesTableComponent } from './views/coa/coa-groups/rates-table/rates-table.component';
import { ItemDetailsComponent } from './views/coa/coa-groups/group-details/group-details.component';
import { HighlightSearchPipe } from './_pipes/highlight.pipe';
import { ItemTypeSelectComponent } from './_components/selects/item-type-select/item-type-select.component';
import { UbServiceTypeSelectComponent } from './_components/selects/ub-service-type-select/ub-service-type-select.component';
import { ItemSelectComponent } from './_components/selects/item-select/item-select.component';
import { PayableToSelectComponent } from './_components/selects/payable-to-select/payable-to-select.component';

@NgModule({
  declarations: [
    AppComponent,
    BindOnceDirective,
    DecimalOnlyDirective,
    HighlightSearchPipe,
    HomeComponent,
    LoginComponent,
    HeaderComponent,
    MasterTemplateComponent,
    SidemenuComponent,
    BreadcrumbsComponent,
    ToastComponent,
    DotLoaderComponent,
    LanguageComponent,
    MemTxnComponent,
    DropdownSelectComponent,
    ContactsComponent,
    ContactsListComponent,
    ContactBasicInfoComponent,
    ContactAddressComponent,
    ContactAdditionalComponent,
    CustomerHistoryComponent,
    HistoryUtilityBillingComponent,
    HistoryPropertyTaxComponent,
    VendorEmployeeHistoryComponent,
    HistoryVendorComponent,
    HistoryEmployeeComponent,
    CustomerDetailsComponent,
    VendorDetailsComponent,
    PaymentDetailsComponent,
    EmployeeDetailsComponent,
    EmployeeInfoComponent,
    EmployeeEarningsAdditionsComponent,
    EmployeeTaxesBenefitsComponent,
    EmployeeCompensatedAbsencesComponent,
    EmployeeActivitiesComponent,
    PropertiesComponent,
    PropertiesListComponent,
    PropertyDetailsComponent,
    PropertyHistoryComponent,
    CustomDetailsComponent,
    OwnersComponent,
    SalesHistoryComponent,
    ValuationHistoryComponent,
    TaxBillingHistoryComponent,
    CustomizeComponent,
    CoaComponent,
    CoaFundsComponent,
    CoaFundsRowComponent,
    CoaDepartmentsComponent,
    CoaDepartmentsRowComponent,
    CoaAccountsComponent,
    CoaAccountsRowComponent,
    NewFundComponent,
    NewDepartmentComponent,
    NewAccountComponent,
    SelectPortalComponent,
    FundSelectComponent,
    DepartmentSelectComponent,
    AccountSelectComponent,
    AccountTypeSelectComponent,
    Box1099SelectComponent,
    BoxW2SelectComponent,
    ItemSelectComponent,
    ItemTypeSelectComponent,
    PayableToSelectComponent,
    UbServiceTypeSelectComponent,
    ItemsComponent,
    RatesTableComponent,
    ItemDetailsComponent,
    ItemsRowComponent
  ],
  imports: [
    BrowserModule, RouterModule, HttpClientModule,
    AppRouterModule, FormsModule, //ChartsModule,
    SimplebarAngularModule,
    BrowserAnimationsModule,
    ReactiveFormsModule, NgbModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: RequestInterceptor, multi: true },
    CookieService
  ],
  bootstrap: [AppComponent, ToastComponent]
})
export class AppModule { }
