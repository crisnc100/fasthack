import { describe, expect, it } from 'bun:test';
import { validateEmail, validatePassword, validateName, validateConfirmPassword } from '../validation';

describe('validateEmail', () => {
  it('returns null for valid email', () => {
    expect(validateEmail('test@example.com')).toBeNull();
  });

  it('returns error when email is empty', () => {
    expect(validateEmail('')).toBe('Email is required');
  });

  it('returns error for invalid email', () => {
    expect(validateEmail('invalid-email')).toBe('Please enter a valid email address');
  });
});

describe('validatePassword', () => {
  it('returns null for valid password', () => {
    expect(validatePassword('abcdef')).toBeNull();
  });

  it('returns error when password is empty', () => {
    expect(validatePassword('')).toBe('Password is required');
  });

  it('returns error when password is too short', () => {
    expect(validatePassword('123')).toBe('Password must be at least 6 characters');
  });
});

describe('validateName', () => {
  it('returns null for valid name', () => {
    expect(validateName('John')).toBeNull();
  });

  it('returns error when name is empty', () => {
    expect(validateName('')).toBe('Name is required');
  });

  it('returns error when name is too short', () => {
    expect(validateName('A')).toBe('Name must be at least 2 characters');
  });
});

describe('validateConfirmPassword', () => {
  it('returns null when passwords match', () => {
    expect(validateConfirmPassword('password', 'password')).toBeNull();
  });

  it('returns error when confirm password is empty', () => {
    expect(validateConfirmPassword('password', '')).toBe('Please confirm your password');
  });

  it('returns error when passwords do not match', () => {
    expect(validateConfirmPassword('password', 'pass')).toBe('Passwords do not match');
  });
});
