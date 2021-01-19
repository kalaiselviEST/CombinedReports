

export * from './common';

//#region Registration

import * as CreateAccountLang from './registration/createAccount';
import * as VerifyAccountLang from './registration/VerifyAccount';
import * as LoginLang from './login';

export const CreateAccount = {
  ui: new CreateAccountLang.Ui(),
  messages: new CreateAccountLang.Messages(),
};

export const VerifyAccount = {
  ui: new VerifyAccountLang.Ui(),
  messages: new VerifyAccountLang.Messages(),
};

export const Login = {
  ui: new LoginLang.Ui(),
  messages: new LoginLang.Messages(),
};

//#endregion

export const code = 'en-us';

