import { validateEmail, validateAge, validatePhone } from '../sections/sheets/utils.js';

// Test validation functions
describe('Form Validation Utils', () => {
  describe('validateEmail', () => {
    test('should validate correct email formats', () => {
      expect(validateEmail('test@example.com')).toBe(true);
      expect(validateEmail('user.name@domain.co.uk')).toBe(true);
      expect(validateEmail('user+tag@example.org')).toBe(true);
    });

    test('should reject invalid email formats', () => {
      expect(validateEmail('invalid-email')).toBe(false);
      expect(validateEmail('test@')).toBe(false);
      expect(validateEmail('@example.com')).toBe(false);
      expect(validateEmail('')).toBe(false);
    });
  });

  describe('validateAge', () => {
    test('should validate correct ages', () => {
      expect(validateAge('25')).toBe(true);
      expect(validateAge('0')).toBe(true);
      expect(validateAge('150')).toBe(true);
    });

    test('should reject invalid ages', () => {
      expect(validateAge('-1')).toBe(false);
      expect(validateAge('151')).toBe(false);
      expect(validateAge('abc')).toBe(false);
      expect(validateAge('')).toBe(false);
    });
  });

  describe('validatePhone', () => {
    test('should validate correct phone formats', () => {
      expect(validatePhone('+1234567890')).toBe(true);
      expect(validatePhone('1234567890')).toBe(true);
      expect(validatePhone('+84123456789')).toBe(true);
    });

    test('should reject invalid phone formats', () => {
      expect(validatePhone('invalid-phone')).toBe(false);
      expect(validatePhone('+abc123')).toBe(false);
      expect(validatePhone('')).toBe(false);
      expect(validatePhone('0123456789')).toBe(false); // Starting with 0 is invalid
    });
  });
});