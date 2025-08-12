const { 
    isValidAadhaar, 
    isValidOwnerName,
    isValidPan,
    isValidPinCode
} = require('../utils/validation');

describe('Validation utils', () => {
    // Aadhaar Tests
    test('valid aadhaar', () => {
        expect(isValidAadhaar('123456789012')).toBe(true);
    });
    test('invalid aadhaar - letters', () => {
        expect(isValidAadhaar('12345abc9012')).toBe(false);
    });
    test('invalid aadhaar - short', () => {
        expect(isValidAadhaar('1234')).toBe(false);
    });

    // Owner Name Tests
    test('owner name optional', () => {
        expect(isValidOwnerName(null)).toBe(true);
        expect(isValidOwnerName(undefined)).toBe(true);
    });
    test('owner name valid', () => {
        expect(isValidOwnerName('Paritosh Test')).toBe(true);
    });
    test('owner name too long', () => {
        const long = 'a'.repeat(101);
        expect(isValidOwnerName(long)).toBe(false);
    });

    // PAN Tests
    test('valid PAN', () => {
        expect(isValidPan('ABCDE1234F')).toBe(true); // Format: 5 letters, 4 digits, 1 letter
    });
    test('invalid PAN - wrong format', () => {
        expect(isValidPan('1234ABCDE1')).toBe(false);
    });
    test('invalid PAN - lowercase', () => {
        expect(isValidPan('abcde1234f')).toBe(false);
    });

    // Pin Code Tests
    test('valid pin code', () => {
        expect(isValidPinCode('110001')).toBe(true); // Delhi pin code example
    });
    test('invalid pin code - short', () => {
        expect(isValidPinCode('123')).toBe(false);
    });
    test('invalid pin code - letters', () => {
        expect(isValidPinCode('11A0B1')).toBe(false);
    });
});
