import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import express from 'express';
import userController, * as userControllerModule from '../userController';

jest.mock('@prisma/client');

const app = express();
app.use(express.json());
app.use('/users', userController);

describe('UserController', () => {
  const mockPrisma = {
    user: {
      findMany: jest.fn(),
      findUnique: jest.fn(),
      create: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(() => {
    (userControllerModule as any).prisma = mockPrisma;
    jest.clearAllMocks();
  });

  describe('GET /users', () => {
    it('全てのユーザーを取得できること', async () => {
      const mockUsers = [
        { id: 1, name: 'テストユーザー1', email: 'test1@example.com' },
        { id: 2, name: 'テストユーザー2', email: 'test2@example.com' },
      ];
      mockPrisma.user.findMany.mockResolvedValue(mockUsers);

      const response = await request(app).get('/users');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ users: mockUsers });
    });
  });

  describe('GET /users/:id', () => {
    it('指定したIDのユーザーを取得できること', async () => {
      const mockUser = { id: 1, name: 'テストユーザー', email: 'test@example.com' };
      mockPrisma.user.findUnique.mockResolvedValue(mockUser);

      const response = await request(app).get('/users/1');

      expect(response.status).toBe(200);
      expect(response.body).toEqual({ user: mockUser });
    });

    it('存在しないユーザーIDの場合404を返すこと', async () => {
      mockPrisma.user.findUnique.mockResolvedValue(null);

      const response = await request(app).get('/users/999');

      expect(response.status).toBe(404);
      expect(response.body).toEqual({ error: 'User not found' });
    });
  });

  describe('POST /users', () => {
    it('新規ユーザーを作成できること', async () => {
      const newUser = {
        name: '新規ユーザー',
        email: 'new@example.com',
        password: 'password123'
      };
      const createdUser = { ...newUser, id: 1 };
      mockPrisma.user.create.mockResolvedValue(createdUser);

      const response = await request(app)
        .post('/users')
        .send(newUser);

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('name', newUser.name);
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('必���項目が不足している場合400を返すこと', async () => {
      const response = await request(app)
        .post('/users')
        .send({ name: 'テスト' });

      expect(response.status).toBe(400);
      expect(response.body).toEqual({ error: '必須項目が不足しています' });
    });
  });
}); 