import { describe, it, expect } from 'vitest';
import { checkAuthInputs } from '../checkAuthInputs';
import { checkProfileInputs } from '../checkProfileInputs';

describe('Input Validation Functions', () => {
  describe('Authentication Input Validation', () => {
    it('should validate correct email format', () => {
      const result = checkAuthInputs(
        'test@example.com',
        'Password123!',
        undefined,
        true
      );

      expect(result.result).toBe(true);
      expect(result.cleanEmail).toBe('test@example.com');
      expect(result.cleanPassword).toBe('Password123!');
    });

    it('should reject invalid email format', () => {
      const result = checkAuthInputs(
        'invalid-email',
        'Password123!',
        undefined,
        true
      );

      expect(result.result).toBe(false);
      expect(result.error).toContain('email');
    });

    it('should validate password requirements', () => {
      const result = checkAuthInputs(
        'test@example.com',
        'Password123!',
        undefined,
        true
      );

      expect(result.result).toBe(true);
    });

    it('should reject weak password', () => {
      const result = checkAuthInputs(
        'test@example.com',
        'weak',
        undefined,
        true
      );

      expect(result.result).toBe(false);
      expect(result.error).toContain('password');
    });

    it('should validate password confirmation for signup', () => {
      const result = checkAuthInputs(
        'test@example.com',
        'Password123!',
        'Password123!',
        false
      );

      expect(result.result).toBe(true);
    });

    it('should reject mismatched passwords for signup', () => {
      const result = checkAuthInputs(
        'test@example.com',
        'Password123!',
        'DifferentPassword123!',
        false
      );

      expect(result.result).toBe(false);
      expect(result.error).toContain('match');
    });

    it('should sanitize email input', () => {
      const result = checkAuthInputs(
        '  TEST@EXAMPLE.COM  ',
        'Password123!',
        undefined,
        true
      );

      expect(result.result).toBe(true);
      expect(result.cleanEmail).toBe('test@example.com');
    });
  });

  describe('Profile Input Validation', () => {
    it('should validate correct profile data', () => {
      const result = checkProfileInputs({
        first_name: 'John',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      });

      expect(result.result).toBe(true);
      expect(result.cleanData.first_name).toBe('John');
      expect(result.cleanData.last_name).toBe('Doe');
      expect(result.cleanData.email).toBe('john.doe@example.com');
    });

    it('should reject empty required fields', () => {
      const result = checkProfileInputs({
        first_name: '',
        last_name: 'Doe',
        email: 'john.doe@example.com',
      });

      expect(result.result).toBe(false);
      expect(result.error).toContain('first name');
    });

    it('should reject invalid email in profile', () => {
      const result = checkProfileInputs({
        first_name: 'John',
        last_name: 'Doe',
        email: 'invalid-email',
      });

      expect(result.result).toBe(false);
      expect(result.error).toContain('email');
    });

    it('should sanitize profile input data', () => {
      const result = checkProfileInputs({
        first_name: '  JOHN  ',
        last_name: '  DOE  ',
        email: '  JOHN.DOE@EXAMPLE.COM  ',
      });

      expect(result.result).toBe(true);
      expect(result.cleanData.first_name).toBe('John');
      expect(result.cleanData.last_name).toBe('Doe');
      expect(result.cleanData.email).toBe('john.doe@example.com');
    });
  });

  describe('Edge Cases and Error Handling', () => {
    it('should handle null/undefined inputs gracefully', () => {
      const result = checkAuthInputs('', '', undefined, true);

      expect(result.result).toBe(false);
      expect(result.error).toBeDefined();
    });

    it('should handle very long inputs', () => {
      const longEmail = 'a'.repeat(100) + '@example.com';
      const result = checkAuthInputs(
        longEmail,
        'Password123!',
        undefined,
        true
      );

      expect(result.result).toBe(false);
      expect(result.error).toContain('email');
    });

    it('should handle special characters in names', () => {
      const result = checkProfileInputs({
        first_name: 'Jean-Pierre',
        last_name: "O'Connor",
        email: 'jean-pierre@example.com',
      });

      expect(result.result).toBe(true);
    });
  });
});
