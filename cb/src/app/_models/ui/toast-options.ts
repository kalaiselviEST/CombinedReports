export class ToastOptions {
  icon: string;
  message: string;
  duration: number;
  type: string;

  constructor(msg: string, dur = null) {
    this.message = msg;
    this.duration = dur;
  }

}
