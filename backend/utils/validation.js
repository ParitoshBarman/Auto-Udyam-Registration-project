// Aadhaar: exactly 12 digits
const aadhaarRegex = /^\d{12}$/;
// PAN: 5 uppercase letters, 4 digits, 1 uppercase letter
const panRegex = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
// PIN: exactly 6 digits
const pinRegex = /^\d{6}$/;

/**
 * Aadhaar validation
 */
function isValidAadhaar(aadhaar) {
    return aadhaarRegex.test(String(aadhaar || '').trim());
}

/**
 * Owner name validation (optional, but max 100 chars)
 */
function isValidOwnerName(name) {
    if (name === undefined || name === null) return true; // optional
    if (typeof name !== 'string') return false;
    const trimmed = name.trim();
    return trimmed.length > 0 && trimmed.length <= 100;
}

/**
 * PAN validation
 */
function isValidPan(pan) {
    return panRegex.test(String(pan || '').trim());
}

/**
 * PIN code validation
 */
function isValidPinCode(pinCode) {
    return pinRegex.test(String(pinCode || '').trim());
}

module.exports = {
    isValidAadhaar,
    isValidOwnerName,
    isValidPan,
    isValidPinCode
};