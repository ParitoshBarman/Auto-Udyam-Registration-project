const { isValidAadhaar, isValidPan, isValidPinCode } = require('../utils/validation');

function validateRegistration(req, res, next) {
    const { aadhaar, ownerName, pan, pinCode } = req.body;
    const errors = [];

    if (!isValidAadhaar(aadhaar)) {
        errors.push({ field: 'aadhaar', message: 'Aadhaar must be exactly 12 digits.' });
    }

    if (ownerName && (typeof ownerName !== 'string' || ownerName.trim().length > 100)) {
        errors.push({ field: 'ownerName', message: 'Owner name invalid or too long (max 100).' });
    }

    if (!isValidPan(pan)) {
        errors.push({ field: 'pan', message: 'Invalid PAN format (e.g., ABCDE1234F).' });
    }

    if (!isValidPinCode(pinCode)) {
        errors.push({ field: 'pinCode', message: 'PIN code must be exactly 6 digits.' });
    }

    if (errors.length) {
        return res.status(400).json({ ok: false, errors });
    }

    next();
}

module.exports = validateRegistration;