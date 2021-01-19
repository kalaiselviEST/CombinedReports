export class Ui {
  public title = 'Create Account';
  public fieldLabels = {
    firstName: 'First Name',
    lastName: 'Last Name',
    email: 'Email address',
    password: 'Password',
    passwordConfirmation: 'Password Again',
    termsPrefix: 'I have read and accept the',
    signInPrefix: 'Already have an account?'
  };
  public buttonLabels = {
    submit: 'Continue',
    submitting: 'Creating account...',
    verificationLinkAgain: 'Resend verification link',
    signUpAgain: 'Sign Up'
  };
  public linkLabels = {
    terms: 'Terms & conditions',
    signIn: 'Sign In'
  };
  public labels = {
    verifyHeader: 'Please check your email to complete the registration',
    verificationTo: 'Verification email has been sent to',
    verificationContinue: 'You can complete the sign-up process once you check your email and click the verification link',
    verificationTip: 'Check your spam folder in case the email was incorrectly identified',
    noVerifyEmailQuestion: 'Did not receive the verification email?',
    signUpAgain: 'If you entered the wrong email address, please proceed to sign up again'
  };
  public words = {
    tip: 'Tip'
  };
}


export class Messages {
  public validation = {
    firstNameRequired: 'First Name is required',
    lastNameRequired: 'Last Name is required',
    emailInvalid: 'Enter a valid email',
    passwordLength: 'Should be at least 8 charaters',
    common: 'Please fill in all valid details',
    emailExists: 'This email has already been taken',
    passwordMismatch: 'Passwords should match',
    readTerms: `Please accept the ${new Ui().linkLabels.terms}`
  };
  public success = {
    registered: 'Account created successfully'
  };
}
