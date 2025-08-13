import { BaseModel, LogModel, StudentLogModel, MoodModel } from './DataModels';

// Utility class demonstrating polymorphism and encapsulation
export class ValidationUtility {
  private static instance: ValidationUtility;
  private _validationRules: Map<string, (value: any) => boolean>;

  // Singleton pattern with encapsulation
  private constructor() {
    this._validationRules = new Map();
    this.initializeValidationRules();
  }

  // Encapsulation: Private method to initialize rules
  private initializeValidationRules(): void {
    this._validationRules.set('email', (value: string) => {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(value);
    });

    this._validationRules.set('password', (value: string) => {
      return value.length >= 8;
    });

    this._validationRules.set('uuid', (value: string) => {
      const uuidRegex =
        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
      return uuidRegex.test(value);
    });

    this._validationRules.set('required', (value: any) => {
      return value !== null && value !== undefined && value !== '';
    });
  }

  // Singleton getInstance method
  public static getInstance(): ValidationUtility {
    if (!ValidationUtility.instance) {
      ValidationUtility.instance = new ValidationUtility();
    }
    return ValidationUtility.instance;
  }

  // Encapsulation: Private property with public getter
  get validationRules(): Map<string, (value: any) => boolean> {
    return new Map(this._validationRules); // Return a copy for encapsulation
  }

  // Polymorphism: Method that works with any BaseModel
  public validateModel(model: BaseModel): {
    isValid: boolean;
    errors: string[];
  } {
    const errors: string[] = [];

    if (!model.validate()) {
      errors.push('Model validation failed');
    }

    // Type-specific validation using polymorphism
    if (model instanceof LogModel) {
      const logModel = model as LogModel;
      if (!this._validationRules.get('uuid')!(logModel.studentId)) {
        errors.push('Invalid student ID format');
      }
      if (!this._validationRules.get('uuid')!(logModel.behaviorCategoryId)) {
        errors.push('Invalid behavior category ID format');
      }
    } else if (model instanceof StudentLogModel) {
      const studentLogModel = model as StudentLogModel;
      if (!this._validationRules.get('required')!(studentLogModel.firstName)) {
        errors.push('First name is required');
      }
      if (!this._validationRules.get('required')!(studentLogModel.lastName)) {
        errors.push('Last name is required');
      }
    } else if (model instanceof MoodModel) {
      const moodModel = model as MoodModel;
      if (!this._validationRules.get('required')!(moodModel.emoji)) {
        errors.push('Emoji is required');
      }
      if (!this._validationRules.get('required')!(moodModel.name)) {
        errors.push('Mood name is required');
      }
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  // Polymorphism: Generic validation method
  public validateField(value: any, ruleName: string): boolean {
    const rule = this._validationRules.get(ruleName);
    if (!rule) {
      throw new Error(`Validation rule '${ruleName}' not found`);
    }
    return rule(value);
  }

  // Polymorphism: Method that works with arrays of models
  public validateModels(models: BaseModel[]): {
    isValid: boolean;
    errors: string[];
  } {
    const allErrors: string[] = [];
    let allValid = true;

    models.forEach((model, index) => {
      const result = this.validateModel(model);
      if (!result.isValid) {
        allValid = false;
        result.errors.forEach((error) => {
          allErrors.push(`Model ${index + 1}: ${error}`);
        });
      }
    });

    return {
      isValid: allValid,
      errors: allErrors,
    };
  }

  // Factory method demonstrating polymorphism
  public static createValidator(
    type: 'email' | 'password' | 'uuid' | 'required'
  ): (value: any) => boolean {
    const instance = ValidationUtility.getInstance();
    return (value: any) => instance.validateField(value, type);
  }
}
