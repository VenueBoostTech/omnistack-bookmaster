import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { TransactionsModule } from '@/api/transactions/transactions.module'; // Replace with your actual module
import prisma from '@/lib/prisma';

jest.mock('@/lib/prisma', () => ({
  transaction: {
    findMany: jest.fn(),
    count: jest.fn(),
  },
}));

describe('Transactions API (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [TransactionsModule], // Replace with the correct module
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should return a list of transactions with pagination', async () => {
    const mockTransactions = [
      {
        id: '1',
        date: new Date().toISOString(),
        type: 'RECEIPT',
        accountId: 'acc1',
        description: 'Test receipt',
        debit: 100,
        credit: 0,
        status: 'COMPLETED',
      },
      {
        id: '2',
        date: new Date().toISOString(),
        type: 'PAYMENT',
        accountId: 'acc2',
        description: 'Test payment',
        debit: 0,
        credit: 100,
        status: 'POSTED',
      },
    ];

    const mockCount = 2;

    // Mock Prisma methods
    (prisma.transaction.findMany as jest.Mock).mockResolvedValue(mockTransactions);
    (prisma.transaction.count as jest.Mock).mockResolvedValue(mockCount);

    const response = await request(app.getHttpServer())
      .get('/api/transactions')
      .query({ clientId: 'test-client', page: 1, pageSize: 10 });

    expect(response.status).toBe(200);
    expect(response.body.items).toEqual(mockTransactions);
    expect(response.body.total).toBe(mockCount);
    expect(response.body.page).toBe(1);
    expect(response.body.pageSize).toBe(10);
  });
});
