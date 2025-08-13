# OOP Implementation for MindTrace

This directory contains the Object-Oriented Programming (OOP) implementation that satisfies the course requirements for **inheritance**, **polymorphism**, and **encapsulation**.

## Files Overview

### 1. `ButtonBase.ts` - Inheritance and Polymorphism

- **Abstract base class** `ButtonBase` with common button functionality
- **Inheritance**: `PrimaryButton`, `CtaButton`, and `SubmitButton` extend `ButtonBase`
- **Polymorphism**: Each subclass implements the abstract `getClassName()` method differently
- **Encapsulation**: Protected properties with public getters/setters
- **Factory method**: `ButtonBase.createButton()` demonstrates polymorphic object creation

### 2. `DataModels.ts` - Encapsulation and Inheritance

- **Abstract base class** `BaseModel` with common model functionality
- **Inheritance**: `LogModel`, `StudentLogModel`, and `MoodModel` extend `BaseModel`
- **Encapsulation**: Private properties with public getters/setters
- **Polymorphism**: Each model implements the abstract `validate()` method
- **Method overriding**: Each model overrides `toJSON()` method

### 3. `ValidationUtility.ts` - Polymorphism and Encapsulation

- **Singleton pattern** with encapsulated validation rules
- **Polymorphism**: `validateModel()` works with any `BaseModel` type
- **Encapsulation**: Private validation rules with public access methods
- **Factory methods**: `createValidator()` for different validation types

### 4. `example.ts` - Demonstration

- Complete examples showing all OOP concepts in action
- Run with `demonstrateOOP()` function

## OOP Concepts Demonstrated

### ✅ Inheritance

- `ButtonBase` → `PrimaryButton`, `CtaButton`, `SubmitButton`
- `BaseModel` → `LogModel`, `StudentLogModel`, `MoodModel`

### ✅ Polymorphism

- **Abstract methods**: `getClassName()`, `validate()`
- **Method overriding**: `getAriaLabel()`, `toJSON()`
- **Factory methods**: `ButtonBase.createButton()`, `ValidationUtility.createValidator()`
- **Type polymorphism**: Methods that work with base class types

### ✅ Encapsulation

- **Private properties**: `_text`, `_disabled`, `_validationRules`
- **Public getters/setters**: Controlled access to private data
- **Protected properties**: Shared between parent and child classes
- **Private methods**: Internal implementation details hidden

## Usage Examples

```typescript
// Inheritance and Polymorphism
import { ButtonBase, PrimaryButton } from './lib/oop';

const buttons: ButtonBase[] = [
  new PrimaryButton('Save'),
  new CtaButton('Get Started'),
  new SubmitButton(),
];

// Each button implements getClassName() differently
buttons.forEach((button) => {
  console.log(button.getClassName()); // Different output for each type
});

// Encapsulation
import { LogModel } from './lib/oop';

const log = new LogModel(studentId, behaviorCategoryId);
log.mood = 'Happy'; // Uses setter
console.log(log.mood); // Uses getter

// Polymorphic validation
import { ValidationUtility } from './lib/oop';

const validator = ValidationUtility.getInstance();
const result = validator.validateModel(log); // Works with any BaseModel
```

## Requirements Satisfaction

This implementation satisfies the course requirement for:

- **Code including inheritance, polymorphism, and encapsulation** ✅

The OOP classes are designed to work with your existing components without requiring any changes to your current UI components. They provide a solid foundation for data validation, button styling, and model management while demonstrating all three required OOP concepts.
