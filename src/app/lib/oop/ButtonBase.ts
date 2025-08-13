// Base Button class demonstrating inheritance, polymorphism, and encapsulation
export abstract class ButtonBase {
  protected _text: string;
  protected _disabled: boolean;
  protected _type: 'button' | 'submit' | 'reset';

  constructor(text: string, type: 'button' | 'submit' | 'reset' = 'button') {
    this._text = text;
    this._disabled = false;
    this._type = type;
  }

  // Encapsulation: Private properties with public getters/setters
  get text(): string {
    return this._text;
  }

  set text(value: string) {
    this._text = value;
  }

  get disabled(): boolean {
    return this._disabled;
  }

  set disabled(value: boolean) {
    this._disabled = value;
  }

  get type(): 'button' | 'submit' | 'reset' {
    return this._type;
  }

  // Polymorphism: Abstract method that subclasses must implement
  abstract getClassName(): string;

  // Polymorphism: Virtual method that can be overridden
  getAriaLabel(): string {
    return `${this._text} Button`;
  }

  // Common functionality
  isDisabled(): boolean {
    return this._disabled;
  }

  // Factory method demonstrating polymorphism
  static createButton(
    type: 'primary' | 'cta' | 'submit',
    text: string
  ): ButtonBase {
    switch (type) {
      case 'primary':
        return new PrimaryButton(text);
      case 'cta':
        return new CtaButton(text);
      case 'submit':
        return new SubmitButton();
      default:
        throw new Error(`Unknown button type: ${type}`);
    }
  }
}

// Inheritance: PrimaryButton extends ButtonBase
export class PrimaryButton extends ButtonBase {
  constructor(text: string) {
    super(text, 'button');
  }

  // Polymorphism: Implementing abstract method
  getClassName(): string {
    return `text-accent/80 uppercase text-lg py-2 px-4 rounded-lg cursor-pointer transition-all duration-200
      active:scale-95 border-[1.5px] border-gray-500 z-10 bg-gray-900/40 backdrop-blur-lg font-lato
      shadow-accent/60 hover:shadow-accent hover:border-accent shadow-inner hover:text-accent font-bold
      ${this._disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  }

  // Polymorphism: Overriding virtual method
  getAriaLabel(): string {
    return `Primary ${this._text} Button`;
  }
}

// Inheritance: CtaButton extends ButtonBase
export class CtaButton extends ButtonBase {
  constructor(text: string) {
    super(text, 'button');
  }

  // Polymorphism: Implementing abstract method
  getClassName(): string {
    return `text-xl md:text-2xl font-playwrite font-bold bg-linear-120 from-primary to-accent/70 px-4 py-3 rounded-md text-highlight z-20 border border-highlight/70
    shadow-lg shadow-black/40 cursor-pointer hover:scale-105 transition-all duration-300 hover:shadow-black/70 active:scale-100
    ${this._disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  }

  // Polymorphism: Overriding virtual method
  getAriaLabel(): string {
    return `Call to Action ${this._text} Button`;
  }
}

// Inheritance: SubmitButton extends ButtonBase
export class SubmitButton extends ButtonBase {
  constructor() {
    super('Submit', 'submit');
  }

  // Polymorphism: Implementing abstract method
  getClassName(): string {
    return `text-accent/80 uppercase text-lg py-2 px-4 rounded-lg cursor-pointer transition-all duration-200
      active:scale-95 border-[1.5px] border-neutral-500 z-10 bg-neutral-900/40 backdrop-blur-lg font-lato
      shadow-accent/60 hover:shadow-accent hover:border-accent shadow-inner hover:text-accent font-bold
      ${this._disabled ? 'opacity-50 cursor-not-allowed' : ''}`;
  }

  // Polymorphism: Overriding virtual method
  getAriaLabel(): string {
    return 'Submit Form Button';
  }
}
