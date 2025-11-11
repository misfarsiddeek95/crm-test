import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';
import { describe, it, beforeEach, afterEach } from 'vitest'; // <-- 1. Import from vitest

describe('AppController (e2e)', () => {
  let app: INestApplication; // <-- 2. Simplified type

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  // 3. Added afterEach to close the app
  afterEach(async () => {
    await app.close();
  });

  // 4. Converted test to async/await for modern syntax
  it('/ (GET)', async () => {
    await request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });
});
