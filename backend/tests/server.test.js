import request from 'supertest';
import app from '../server.js';

describe('Health Check', () => {
  test('GET /health should return 200', async () => {
    const response = await request(app).get('/health');
    expect(response.status).toBe(200);
    expect(response.body.status).toBe('OK');
    expect(response.body.timestamp).toBeDefined();
  });
});

describe('API Rate Limiting', () => {
  test('should handle requests within rate limit', async () => {
    const response = await request(app).get('/api/sheets');
    // Should not be rate limited for first request
    expect(response.status).not.toBe(429);
  });
});

describe('CORS Headers', () => {
  test('should include CORS headers', async () => {
    const response = await request(app).get('/health');
    expect(response.headers['access-control-allow-origin']).toBeDefined();
  });
});

describe('Validation Middleware', () => {
  test('should validate required fields for creating records', async () => {
    const response = await request(app)
      .post('/api/sheets')
      .send({
        // Missing required 'name' and 'email' fields
        age: 25
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
    expect(response.body.details).toBeDefined();
  });

  test('should validate email format', async () => {
    const response = await request(app)
      .post('/api/sheets')
      .send({
        name: 'Test User',
        email: 'invalid-email'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  test('should validate age range', async () => {
    const response = await request(app)
      .post('/api/sheets')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        age: 200 // Invalid age
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });

  test('should validate phone format', async () => {
    const response = await request(app)
      .post('/api/sheets')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        phone: 'invalid-phone'
      });
    
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('Validation failed');
  });
});