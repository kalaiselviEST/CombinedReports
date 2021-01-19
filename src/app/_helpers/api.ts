'use strict';

export class Api {

  public static auth = {
    login: 'Users/Authenticate',
    validateSesssion: '/session/validate'
  };

  public static portal = {
    list: userID => `portal/list/${userID}`,
    load: portaID => `portal/load/${portaID}`
  }

  public static account = {
    list: (portalID, typeID) => `accounts/${portalID}/?type=${typeID}`,
    listAll: (portalID, typeID) => `accounts/${portalID}/all?type=${typeID}`,
    listChildren: (portalID, parentID) => `accounts/children/${portalID}/?parentId=${parentID}`,
    fetchOne: (portalID, accID) => `accounts/${portalID}/single?id=${accID}`,
    create: portalID => `accounts/${portalID}/create`,
    update: portalID => `accounts/${portalID}/update`,
    toggleActive: (portalID, ID, active) => `accounts/${portalID}/toggle/${ID}?active=${active}`,
    delete: (portalID, ID) => `accounts/${portalID}/delete/${ID}`,
    types: 'accounts/types',
    boxW2: 'accounts/boxw2',
    box1099: 'accounts/box1099'
  }

  public static fund = {
    list: portalID => `funds/${portalID}/`,
    listAll: portalID => `funds/${portalID}/all`,
    fetchOne: (portalID, fundID) => `funds/${portalID}/single?fundId=${fundID}`,
    create: portalID => `funds/${portalID}/create`,
    update: portalID => `funds/${portalID}/update`,
    toggleActive: (portalID, ID, active) => `funds/${portalID}/toggle/${ID}?active=${active}`,
    delete: (portalID, ID) => `funds/${portalID}/delete/${ID}`
  }

  public static department = {
    list: portalID => `departments/${portalID}/`,
    listAll: portalID => `departments/${portalID}/all`,
    fetchOne: (portalID, departmentID) => `departments/${portalID}/single?departmentId=${departmentID}`,
    create: portalID => `departments/${portalID}/create`,
    update: portalID => `departments/${portalID}/update`,
    toggleActive: (portalID, ID, active) => `departments/${portalID}/toggle/${ID}?active=${active}`,
    delete: (portalID, ID) => `departments/${portalID}/delete/${ID}`
  }

  public static item = {
    list: (portalID, typeID) => `items/${portalID}/?type=${typeID}`,
    listAll: (portalID, typeID) => `items/${portalID}/all?type=${typeID}`,
    listChildren: (portalID, parentID) => `items/children/${portalID}/?parentId=${parentID}`,
    fetchOne: (portalID, accID) => `items/${portalID}/single?id=${accID}`,
    create: portalID => `items/${portalID}/create`,
    update: portalID => `items/${portalID}/update`,
    toggleActive: (portalID, ID, active) => `items/${portalID}/toggle/${ID}?active=${active}`,
    delete: (portalID, ID) => `items/${portalID}/delete/${ID}`,
    types: 'items/types',
    rates: (portalID, itemID) => `items/${portalID}/rates/${itemID}`,
    ratesUdpate: (portalID, itemID) => `items/${portalID}/rates/${itemID}/update`
  }

  public static contact = {
    list: (portalID, typeID) => `contacts/${portalID}/?type=${typeID}`,
    listAll: (portalID, typeID) => `contacts/${portalID}/all?type=${typeID}`,
    fetchOne: (portalID, accID) => `contacts/${portalID}/single?id=${accID}`,
    create: portalID => `contacts/${portalID}/create`,
    update: portalID => `contacts/${portalID}/update`,
    toggleActive: (portalID, ID, active) => `contacts/${portalID}/toggle/${ID}?active=${active}`,
    delete: (portalID, ID) => `contacts/${portalID}/delete/${ID}`,
  }


  public static utilityBilling = {
    serviceTypes: `utility-billing/service-types`
  }

  public static admin = {
    companyList: '/companyList.json',
    companyDetail: '/companyDetail.json'
  };

  public static register = {
    createAccount: '/register',
    verifyAccount: '/register/verify/'
  };

}
