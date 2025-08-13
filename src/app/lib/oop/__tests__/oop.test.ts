import { describe, it, expect } from 'vitest';
import {
  ButtonBase,
  PrimaryButton,
  CtaButton,
  SubmitButton,
  LogModel,
  StudentLogModel,
  MoodModel,
  ValidationUtility,
} from '../index';

describe('OOP Classes - Inheritance, Polymorphism, and Encapsulation', () => {
  describe('Button Classes - Inheritance and Polymorphism', () => {
    it('should demonstrate inheritance with ButtonBase and subclasses', () => {
      // Test inheritance - all buttons should be instances of ButtonBase
      const primaryBtn = new PrimaryButton('Save');
      const ctaBtn = new CtaButton('Get Started');
      const submitBtn = new SubmitButton();

      expect(primaryBtn).toBeInstanceOf(ButtonBase);
      expect(ctaBtn).toBeInstanceOf(ButtonBase);
      expect(submitBtn).toBeInstanceOf(ButtonBase);
    });

    it('should demonstrate polymorphism with getClassName method', () => {
      // Test polymorphism - each button implements getClassName differently
      const primaryBtn = new PrimaryButton('Save');
      const ctaBtn = new CtaButton('Get Started');
      const submitBtn = new SubmitButton();

      const primaryClass = primaryBtn.getClassName();
      const ctaClass = ctaBtn.getClassName();
      const submitClass = submitBtn.getClassName();

      // Each should have different class names (polymorphism)
      expect(primaryClass).not.toBe(ctaClass);
      expect(ctaClass).not.toBe(submitClass);
      expect(submitClass).not.toBe(primaryClass);

      // All should contain common button styling
      expect(primaryClass).toContain('cursor-pointer');
      expect(ctaClass).toContain('cursor-pointer');
      expect(submitClass).toContain('cursor-pointer');
    });

    it('should demonstrate encapsulation with getters and setters', () => {
      const primaryBtn = new PrimaryButton('Original');

      // Test encapsulation - accessing private properties through getters
      expect(primaryBtn.text).toBe('Original');
      expect(primaryBtn.type).toBe('button');
      expect(primaryBtn.disabled).toBe(false);

      // Test encapsulation - modifying private properties through setters
      primaryBtn.text = 'Updated';
      primaryBtn.disabled = true;

      expect(primaryBtn.text).toBe('Updated');
      expect(primaryBtn.disabled).toBe(true);
    });

    it('should demonstrate factory method polymorphism', () => {
      // Test factory method that creates different button types
      const primaryBtn = ButtonBase.createButton('primary', 'Factory Primary');
      const ctaBtn = ButtonBase.createButton('cta', 'Factory CTA');
      const submitBtn = ButtonBase.createButton('submit', 'Factory Submit');

      expect(primaryBtn).toBeInstanceOf(PrimaryButton);
      expect(ctaBtn).toBeInstanceOf(CtaButton);
      expect(submitBtn).toBeInstanceOf(SubmitButton);

      // All should be ButtonBase instances (polymorphism)
      expect(primaryBtn).toBeInstanceOf(ButtonBase);
      expect(ctaBtn).toBeInstanceOf(ButtonBase);
      expect(submitBtn).toBeInstanceOf(ButtonBase);
    });
  });

  describe('Data Models - Encapsulation and Inheritance', () => {
    it('should demonstrate data model encapsulation', () => {
      const logModel = new LogModel(
        'student-uuid' as any,
        'category-uuid' as any,
        'user-uuid' as any,
        'Happy',
        'Test notes'
      );

      // Test encapsulation - accessing private properties through getters
      expect(logModel.studentId).toBe('student-uuid');
      expect(logModel.mood).toBe('Happy');
      expect(logModel.notes).toBe('Test notes');

      // Test encapsulation - modifying through setters
      logModel.mood = 'Very Happy';
      logModel.notes = 'Updated notes';

      expect(logModel.mood).toBe('Very Happy');
      expect(logModel.notes).toBe('Updated notes');
    });

    it('should demonstrate model validation polymorphism', () => {
      const validLog = new LogModel(
        'student-uuid' as any,
        'category-uuid' as any
      );
      const invalidLog = new LogModel('' as any, '' as any);

      const validStudentLog = new StudentLogModel(
        'John',
        'Doe',
        'Good',
        'Happy'
      );
      const invalidStudentLog = new StudentLogModel('', '', '', '');

      // Test polymorphism - each model implements validate() differently
      expect(validLog.validate()).toBe(true);
      expect(invalidLog.validate()).toBe(false);
      expect(validStudentLog.validate()).toBe(true);
      expect(invalidStudentLog.validate()).toBe(false);
    });

    it('should demonstrate method overriding', () => {
      const moodModel = new MoodModel('😊', 'Happy');

      // Test method overriding - custom display method
      expect(moodModel.getDisplayText()).toBe('😊 Happy');

      // Test inherited toJSON method
      const json = moodModel.toJSON();
      expect(json).toHaveProperty('emoji', '😊');
      expect(json).toHaveProperty('name', 'Happy');
    });
  });

  describe('Validation Utility - Polymorphism and Encapsulation', () => {
    it('should demonstrate singleton pattern and encapsulation', () => {
      const validator1 = ValidationUtility.getInstance();
      const validator2 = ValidationUtility.getInstance();

      // Test singleton pattern
      expect(validator1).toBe(validator2);

      // Test encapsulation - validation rules are private
      const rules = validator1.validationRules;
      expect(rules).toBeInstanceOf(Map);
      expect(rules.size).toBeGreaterThan(0);
    });

    it('should demonstrate polymorphic validation', () => {
      const validator = ValidationUtility.getInstance();

      const models = [
        new LogModel('student-uuid' as any, 'category-uuid' as any),
        new StudentLogModel('John', 'Doe', 'Good', 'Happy'),
        new MoodModel('😊', 'Happy'),
      ];

      // Test polymorphism - validateModels works with any BaseModel array
      const result = validator.validateModels(models);
      expect(result.isValid).toBe(true);
      expect(result.errors).toHaveLength(0);
    });

    it('should demonstrate field validation', () => {
      const validator = ValidationUtility.getInstance();

      // Test different validation rules
      expect(validator.validateField('test@example.com', 'email')).toBe(true);
      expect(validator.validateField('invalid-email', 'email')).toBe(false);
      expect(validator.validateField('longpassword123', 'password')).toBe(true);
      expect(validator.validateField('short', 'password')).toBe(false);
    });

    it('should demonstrate factory method for validators', () => {
      // Test factory method polymorphism
      const emailValidator = ValidationUtility.createValidator('email');
      const passwordValidator = ValidationUtility.createValidator('password');

      expect(typeof emailValidator).toBe('function');
      expect(typeof passwordValidator).toBe('function');

      expect(emailValidator('test@example.com')).toBe(true);
      expect(passwordValidator('longpassword123')).toBe(true);
    });
  });
});
