
export * from './common';

//#region Registration

import * as CreateAccountLang from './registration/createAccount';
import * as VerifyAccountLang from './registration/VerifyAccount';

export const CreateAccount = {
  ui: new CreateAccountLang.Ui(),
  messages: new CreateAccountLang.Messages(),
};

export const VerifyAccount = {
  ui: new VerifyAccountLang.Ui(),
  messages: new VerifyAccountLang.Messages(),
};

//#endregion

export const code = 'es';
