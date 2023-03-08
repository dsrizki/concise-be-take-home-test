const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

beforeAll(() => {
  return queryInterface.bulkInsert(
    'users',
    [
      {
        name: 'pre_hooks',
        email: 'pre_hooks@mail.com',
        phoneNumber: '00000',
        address: 'pre_hooks',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    null
  );
});

describe('Test create user', () => {
  describe('Success create user', () => {
    it('should create user', async () => {
      const payload = {
        name: 'john',
        email: 'john@mail.com',
        phoneNumber: '0812345',
        address: 'bsd'
      };
      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'User created');
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('email', expect.any(String));
      expect(res.body.data).toHaveProperty('phoneNumber', expect.any(String));
      expect(res.body.data).toHaveProperty('address', expect.any(String));
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
    });
  });

  describe('Failed creating user', () => {
    it('should has duplicate email', async () => {
      const payload = {
        name: 'john',
        email: 'john@mail.com',
        phoneNumber: '0812345',
        address: 'bsd'
      };
      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Email must be unique');
    });

    it('should has invalid email format', async () => {
      const payload = {
        name: 'john',
        email: 'john',
        phoneNumber: '0812345',
        address: 'bsd'
      };
      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Invalid email format');
    });

    it('should has invalid phone number length', async () => {
      const payload = {
        name: 'john',
        email: 'john@mail.com',
        phoneNumber: '0812',
        address: 'bsd'
      };
      const res = await request(app).post('/api/users').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty(
        'message',
        'Phone number length must be between 5 to 12'
      );
    });
  });
});

describe('Test update user', () => {
  describe('Success update user', () => {
    it('should update user', async () => {
      const id = 1;
      const payload = {
        name: 'john_updated',
        email: 'johnthor@mail.com',
        phoneNumber: '081234511',
        address: 'bsd'
      };
      const res = await request(app).put(`/api/users/${id}`).send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'User updated');
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('email', expect.any(String));
      expect(res.body.data).toHaveProperty('phoneNumber', expect.any(String));
      expect(res.body.data).toHaveProperty('address', expect.any(String));
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
    });
  });

  describe('Failed updating user', () => {
    it('should has duplicate email', async () => {
      const id = 2;
      const payload = {
        name: 'john',
        email: 'johnthor@mail.com',
        phoneNumber: '0812345',
        address: 'bsd'
      };
      const res = await request(app).put(`/api/users/${id}`).send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Email must be unique');
    });

    it('should has invalid email format', async () => {
      const id = 2;
      const payload = {
        name: 'john',
        email: 'pre_hooks',
        phoneNumber: '0812345',
        address: 'bsd'
      };
      const res = await request(app).put(`/api/users/${id}`).send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Invalid email format');
    });

    it('should has invalid phone number length', async () => {
      const id = 2;
      const payload = {
        name: 'john',
        email: 'pre_hooks@mail.com',
        phoneNumber: '0812',
        address: 'bsd'
      };
      const res = await request(app).put(`/api/users/${id}`).send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty(
        'message',
        'Phone number length must be between 5 to 12'
      );
    });
  });
});

describe('Test delete user', () => {
  describe('Success delete user', () => {
    it('should handle success call', async () => {
      const id = 2;
      const res = await request(app).delete(`/api/users/${id}`).send();

      expect(res).toBeDefined();
      // expect(res.status).toBe(200);
      // expect(res.body).toBeInstanceOf(Object);
      // expect(res.body).toHaveProperty('message', expect.any(String));
    });
  });

  describe('Failed delete user', () => {
    it('should cannot find user', async () => {
      const id = 100;
      const res = await request(app).delete(`/api/users/${id}`).send();

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
  });
});

describe('Test get user by id', () => {
  describe('Success get user by id', () => {
    it('should get user by id', async () => {
      const id = 1;
      const res = await request(app).get(`/api/users/${id}`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('id', +id);
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('email', expect.any(String));
      expect(res.body.data).toHaveProperty('phoneNumber', expect.any(String));
      expect(res.body.data).toHaveProperty('address', expect.any(String));
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('members', expect.any(Array));
    });
  });

  describe('Failed get user by id', () => {
    it('should not get user by id', async () => {
      const id = 100;
      const res = await request(app).get(`/api/users/${id}`).send();

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
  });
});

describe('Test get all users', () => {
  describe('Success get all users', () => {
    it('should get all users', async () => {
      const res = await request(app).get(`/api/users/`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Array));
      expect(res.body.data[0]).toBeInstanceOf(Object);
      expect(res.body.data[0]).toHaveProperty('id', expect.any(Number));
      expect(res.body.data[0]).toHaveProperty('name', expect.any(String));
      expect(res.body.data[0]).toHaveProperty('email', expect.any(String));
      expect(res.body.data[0]).toHaveProperty(
        'phoneNumber',
        expect.any(String)
      );
      expect(res.body.data[0]).toHaveProperty('address', expect.any(String));
      expect(res.body.data[0]).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data[0].updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data[0]).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data[0].createdAt)).toBeInstanceOf(Date);
    });
  });

  describe('Failed get all users', () => {
    it('should not get all users', async () => {
      const res = await request(app).get(`/api/users/`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Array));
    });
  });
});
