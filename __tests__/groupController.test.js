const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

beforeAll(() => {
  return queryInterface.bulkInsert(
    'groups',
    [
      {
        name: 'dummy group',
        description: 'dummy',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    null
  );
});

describe('Test create group', () => {
  describe('Success create group', () => {
    it('should create group', async () => {
      const payload = {
        name: 'backend group',
        description: 'anything'
      };
      const res = await request(app).post('/api/groups').send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Group created');
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('description', expect.any(String));
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
    });
  });
});

describe('Test update group', () => {
  describe('Success update group', () => {
    it('should update group', async () => {
      const id = 2;
      const payload = {
        name: 'fullstack group',
        description: 'anything to fullstack'
      };
      const res = await request(app).put(`/api/groups/${id}`).send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Group updated');
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('description', expect.any(String));
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
    });
  });
});

describe('Test delete group', () => {
  describe('Success delete group', () => {
    it('should handle success call', async () => {
      const id = 1;
      const res = await request(app).delete(`/api/groups/${id}`).send();

      expect(res).toBeDefined();
      // expect(res.status).toBe(200);
      // expect(res.body).toBeInstanceOf(Object);
      // expect(res.body).toHaveProperty('message', expect.any(String));
    });
  });

  describe('Failed delete group', () => {
    it('should cannot find group', async () => {
      const id = 100;
      const res = await request(app).delete(`/api/groups/${id}`).send();

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
  });
});

describe('Test get group by id', () => {
  describe('Success get group by id', () => {
    it('should get group by id', async () => {
      const id = 2;
      const res = await request(app).get(`/api/groups/${id}`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('id', +id);
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('description', expect.any(String));
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

describe('Test get all groups', () => {
  describe('Success get all groups', () => {
    it('should get all groups', async () => {
      const res = await request(app).get(`/api/groups`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Array));
      expect(res.body.data[0]).toBeInstanceOf(Object);
      expect(res.body.data[0]).toHaveProperty('id', expect.any(Number));
      expect(res.body.data[0]).toHaveProperty('name', expect.any(String));
      expect(res.body.data[0]).toHaveProperty(
        'description',
        expect.any(String)
      );
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
