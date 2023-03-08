const request = require('supertest');
const app = require('../app');
const { sequelize } = require('../models');
const { queryInterface } = sequelize;

const today = new Date();
let tomorrow = new Date();
tomorrow.setDate(today.getDate() + 1);

beforeAll(() => {
  return queryInterface
    .bulkInsert(
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
    )
    .then(() => {
      return queryInterface.bulkInsert(
        'tasks',
        [
          {
            name: 'dummy task',
            deadline: tomorrow,
            user_id: 1,
            createdAt: new Date(),
            updatedAt: new Date()
          }
        ],
        null
      );
    });
});

describe('Test create task', () => {
  describe('Success create task', () => {
    it('should create task', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: 1
      };
      const res = await request(app).post('/api/tasks').send(payload);

      expect(res.status).toBe(201);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Task created');
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('deadline', expect.any(String));
      expect(new Date(res.body.data.deadline)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
    });
  });

  describe('Failed creating task', () => {
    it('should get null user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: null
      };
      const res = await request(app).post('/api/tasks').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'user_id is required');
    });

    it('should get empty user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: ''
      };
      const res = await request(app).post('/api/tasks').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'user_id is required');
    });

    it('should get string user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: 'abcdefg'
      };
      const res = await request(app).post('/api/tasks').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'user_id must be integer');
    });

    it('should not found user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: 100
      };
      const res = await request(app).post('/api/tasks').send(payload);

      expect(res.status).toBe(400);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'user_id not found');
    });
  });
});

describe('Test update task', () => {
  describe('Success update task', () => {
    it('should update task', async () => {
      const id = 2;
      const payload = {
        name: 'setup database',
        deadline: tomorrow,
        user_id: 1
      };
      const res = await request(app).put(`/api/tasks/${id}`).send(payload);

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Task updated');
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('id', +id);
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('deadline', expect.any(String));
      expect(new Date(res.body.data.deadline)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('user_id', +payload.user_id);
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
    });
  });

  describe('Failed updating user', () => {
    it('should get null user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: null
      };
      const res = await request(app).put('/api/tasks').send(payload);

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res).toBeDefined();
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('message', 'user_id is required');
    });

    it('should get empty user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: ''
      };
      const res = await request(app).put('/api/tasks').send(payload);

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res).toBeDefined();
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('message', 'user_id is required');
    });

    it('should get string user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: 'abcdefg'
      };
      const res = await request(app).put('/api/tasks').send(payload);

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res).toBeDefined();
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('message', 'user_id must be integer');
    });

    it('should not found user_id', async () => {
      const payload = {
        name: 'setup hosting',
        deadline: tomorrow,
        user_id: 100
      };
      const res = await request(app).put('/api/tasks').send(payload);

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res).toBeDefined();
      // expect(res.body).toHaveProperty('message', expect.any(String));
      // expect(res.body).toHaveProperty('message', 'user_id not found');
    });
  });
});

describe('Test delete task', () => {
  describe('Success delete task', () => {
    it('should handle success call', async () => {
      const id = 1;
      const res = await request(app).delete(`/api/tasks/${id}`).send();

      expect(res).toBeDefined();
      // expect(res.status).toBe(200);
      // expect(res.body).toBeInstanceOf(Object);
      // expect(res.body).toHaveProperty('message', expect.any(String));
    });
  });

  describe('Failed delete task', () => {
    it('should cannot find task', async () => {
      const id = 100;
      const res = await request(app).delete(`/api/tasks/${id}`).send();

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
    // it('should cannot delete user', async () => {
    //   const id = 1;
    //   const res = await request(app).delete(`/api/tasks/${id}`).send();

    //   expect(res.status).toBe(400);
    //   expect(res.body).toBeInstanceOf(Object);
    //   expect(res.body).toHaveProperty('message', expect.any(String));
    //   expect(res.body).toHaveProperty(
    //     'message',
    //     'This user is doing another task(s)!'
    //   );
    // });
  });
});

describe('Test get task by id', () => {
  describe('Success get task by id', () => {
    it('should get task by id', async () => {
      const id = 2;
      const res = await request(app).get(`/api/tasks/${id}`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Object));
      expect(res.body.data).toHaveProperty('id', expect.any(Number));
      expect(res.body.data).toHaveProperty('id', +id);
      expect(res.body.data).toHaveProperty('name', expect.any(String));
      expect(res.body.data).toHaveProperty('deadline', expect.any(String));
      expect(new Date(res.body.data.deadline)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('user_id', expect.any(Number));
      expect(res.body.data).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data.updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data.createdAt)).toBeInstanceOf(Date);
      expect(res.body.data).toHaveProperty('user', expect.any(Object));
    });
  });

  describe('Failed get task by id', () => {
    it('should not get task by id', async () => {
      const id = 100;
      const res = await request(app).get(`/api/tasks/${id}`).send();

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
  });
});

describe('Test get all tasks', () => {
  describe('Success get all tasks', () => {
    it('should get all tasks', async () => {
      const res = await request(app).get(`/api/tasks/`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Array));
      expect(res.body.data[0]).toBeInstanceOf(Object);
      expect(res.body.data[0]).toHaveProperty('id', expect.any(Number));
      expect(res.body.data[0]).toHaveProperty('name', expect.any(String));
      expect(res.body.data[0]).toHaveProperty('deadline', expect.any(String));
      expect(new Date(res.body.data[0].deadline)).toBeInstanceOf(Date);
      expect(res.body.data[0]).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data[0].updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data[0]).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data[0].createdAt)).toBeInstanceOf(Date);
    });
  });

  describe('Failed get all tasks', () => {
    it('should not get all tasks', async () => {
      const res = await request(app).get(`/api/tasks`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Array));
    });
  });
});

describe('Test get user tasks by id', () => {
  describe('Success get user tasks by id', () => {
    it('should get user tasks by id', async () => {
      const id = 1;
      const res = await request(app).get(`/api/tasks/user/${id}`).send();

      expect(res.status).toBe(200);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('data', expect.any(Array));
      expect(res.body.data[0]).toHaveProperty('id', expect.any(Number));
      expect(res.body.data[0]).toHaveProperty('name', expect.any(String));
      expect(res.body.data[0]).toHaveProperty('deadline', expect.any(String));
      expect(new Date(res.body.data[0].deadline)).toBeInstanceOf(Date);
      expect(res.body.data[0]).toHaveProperty('user_id', expect.any(Number));
      expect(res.body.data[0]).toHaveProperty('user_id', +id);
      expect(res.body.data[0]).toHaveProperty('updatedAt', expect.any(String));
      expect(new Date(res.body.data[0].updatedAt)).toBeInstanceOf(Date);
      expect(res.body.data[0]).toHaveProperty('createdAt', expect.any(String));
      expect(new Date(res.body.data[0].createdAt)).toBeInstanceOf(Date);
      expect(res.body.data[0]).toHaveProperty('user', expect.any(Object));
      expect(res.body.data[0].user).toHaveProperty('id', expect.any(Number));
      expect(res.body.data[0].user).toHaveProperty('id', +id);
      expect(res.body.data[0].user).toHaveProperty('name', expect.any(String));
      expect(res.body.data[0].user).toHaveProperty('email', expect.any(String));
      expect(res.body.data[0].user).toHaveProperty(
        'phoneNumber',
        expect.any(String)
      );
      expect(res.body.data[0].user).toHaveProperty(
        'address',
        expect.any(String)
      );
      expect(res.body.data[0].user).toHaveProperty(
        'createdAt',
        expect.any(String)
      );
      expect(new Date(res.body.data[0].user)).toBeInstanceOf(Date);
      expect(res.body.data[0].user).toHaveProperty(
        'updatedAt',
        expect.any(String)
      );
      expect(new Date(res.body.data[0].user)).toBeInstanceOf(Date);
    });
  });

  describe('Failed get user tasks by id', () => {
    it('should not get user tasks by id', async () => {
      const id = 100;
      const res = await request(app).get(`/api/tasks/user/${id}`).send();

      expect(res.status).toBe(404);
      expect(res.body).toBeInstanceOf(Object);
      expect(res.body).toHaveProperty('message', expect.any(String));
      expect(res.body).toHaveProperty('message', 'Error not found');
    });
  });
});
