const request = require('supertest');
const app = require('../index'); // your Express app

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

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('message');
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
        expect(res.body).toHaveProperty('error');
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
        expect(res.body).toHaveProperty('error');
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
        expect(res.body).toHaveProperty('error');
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
        expect(res.body).toHaveProperty('error');
    });
});
