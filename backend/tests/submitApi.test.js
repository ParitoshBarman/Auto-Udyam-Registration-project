const request = require('supertest');
const app = require('../index');

describe('POST /submit endpoint', () => {
    test('should return 200 for valid data', async () => {
        const res = await request(app)
            .post('/api/registration/submit')
            .send({
                aadhaar: '123456789012',
                ownerName: 'Paritosh Barman',
                pan: 'ABCDE1234F',
                pinCode: '110001'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.ok).toBe(true);
        expect(res.body).toHaveProperty('id');
    });

    test('should return 400 for invalid Aadhaar', async () => {
        const res = await request(app)
            .post('/api/registration/submit')
            .send({
                aadhaar: 'abc123', // invalid
                ownerName: 'Paritosh Barman',
                pan: 'ABCDE1234F',
                pinCode: '110001'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.ok).toBe(false);
        expect(res.body).toHaveProperty('errors');
        expect(res.body.errors[0].field).toBe('aadhaar');
        expect(res.body.errors[0].message).toMatch(/Aadhaar must be exactly 12 digits/i);
    });

    test('should return 400 for too long owner name', async () => {
        const res = await request(app)
            .post('/api/registration/submit')
            .send({
                aadhaar: '123456789012',
                ownerName: 'a'.repeat(101), // too long
                pan: 'ABCDE1234F',
                pinCode: '110001'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.ok).toBe(false);
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0].field).toBe('ownerName');
        expect(res.body.errors[0].message).toMatch(/owner name invalid|too long/i);
    });

    test('should return 400 for invalid PAN', async () => {
        const res = await request(app)
            .post('/api/registration/submit')
            .send({
                aadhaar: '123456789012',
                ownerName: 'Paritosh Barman',
                pan: 'ABCDE12345', // invalid last char
                pinCode: '110001'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.ok).toBe(false);
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0].field).toBe('pan');
        expect(res.body.errors[0].message).toMatch(/invalid pan/i);
    });

    test('should return 400 for invalid PIN code', async () => {
        const res = await request(app)
            .post('/api/registration/submit')
            .send({
                aadhaar: '123456789012',
                ownerName: 'Paritosh Barman',
                pan: 'ABCDE1234F',
                pinCode: '12345' // only 5 digits
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.ok).toBe(false);
        expect(res.body).toHaveProperty('errors');
        expect(Array.isArray(res.body.errors)).toBe(true);
        expect(res.body.errors[0].field).toBe('pinCode');
        expect(res.body.errors[0].message).toMatch(/must be exactly 6 digits/i);
    });
});



describe('GET /api/registration/all', () => {
    test('should return 200 and an array of registrations', async () => {
        const res = await request(app).get('/api/registration/all');

        expect(res.statusCode).toBe(200);
        expect(res.body.ok).toBe(true);
        expect(res.body).toHaveProperty('data');
        expect(Array.isArray(res.body.data)).toBe(true);

        // Optional: If data exists, check structure of the first record
        if (res.body.data.length > 0) {
            const record = res.body.data[0];
            expect(record).toHaveProperty('id');
            expect(record).toHaveProperty('aadhaar');
            expect(record).toHaveProperty('ownerName');
            expect(record).toHaveProperty('createdAt');
        }
    });

});