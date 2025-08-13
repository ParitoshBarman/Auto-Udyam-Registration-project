const prisma = require('../prismaClient');

async function submitRegistration(req, res) {
    try {
        const payload = req.body || {};
        const { aadhaar, ownerName, name, declarationA, step, pan, address, pinCode, pincode, city, state } = payload;

        const record = await prisma.registration.create({
            data: {
                aadhaar: aadhaar ? String(aadhaar).trim() : null,
                ownerName: (ownerName || name) ? String(ownerName || name).trim() : null,
                pan: pan ? String(pan).trim() : null,
                address: address ? String(address).trim() : null,
                pinCode: String(pinCode || pincode || '').trim() || null,
                city: city ? String(city).trim() : null,
                state: state ? String(state).trim() : null,
                declarationA: !!declarationA,
                step: Number(step || 1),
                rawPayload: payload
            }
        });


        return res.status(201).json({ ok: true, id: record.id });
    } catch (err) {
        console.error('submitRegistration error', err);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
}

async function getAllRegistrations(req, res) {
    try {
        const records = await prisma.registration.findMany({
            orderBy: { createdAt: 'desc' }
        });
        return res.status(200).json({ ok: true, data: records });
    } catch (err) {
        console.error('getAllRegistrations error', err);
        return res.status(500).json({ ok: false, error: 'Server error' });
    }
}

module.exports = {
    submitRegistration,
    getAllRegistrations
};