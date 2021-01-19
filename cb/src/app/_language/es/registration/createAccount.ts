
export class Ui {
  title = 'Crear una cuenta';
  fieldLabels = {
    firstName: 'Nombre de pila',
    lastName: 'Apellido',
    email: 'correo electrónico',
    password: 'Contraseña',
    passwordConfirmation: 'Contraseña nuevamente',
    termsPrefix: 'He leído y acepto e',
    signInPrefix: '¿Ya tienes una cuenta?'
  };
  buttonLabels = {
    submit: 'continuar',
    submitting: 'creando cuenta...',
    verificationLinkAgain: 'Reenviar enlace de verificación',
    signUpAgain: 'Regístrate'
  };
  linkLabels = {
    terms: 'Términos y condiciones',
    signIn: 'Iniciar sesión'
  };
  labels = {
    verifyHeader: 'Por favor revise su correo electrónico para completar el registro',
    verificationTo: 'Se ha enviado un correo electrónico de verificación a',
    // tslint:disable: max-line-length
    verificationContinue: 'Puede completar el proceso de registro una vez que revise su correo electrónico y haga clic en el enlace de verificación',
    verificationTip: 'Compruebe su carpeta de correo no deseado en caso de que el correo electrónico se haya identificado incorrectamente',
    noVerifyEmailQuestion: '¿No recibió el correo electrónico de verificación?',
    signUpAgain: 'Si ingresó una dirección de correo electrónico incorrecta, proceda a registrarse nuevamente'
  };
  words = {
    tip: 'el indicio'
  };
}

export class Messages {
  validation = {
    common: 'Por favor complete todos los detalles válidos',
    emailExists: 'Este correo electronico ya esta en uso',
    passwordMismatch: 'Las contraseñas deben coincidir',
    readTerms: 'Por favor acepte los términos y condiciones de uso'
  };
  success: {
    registered: 'Cuenta creada exitosamente'
  };
}

