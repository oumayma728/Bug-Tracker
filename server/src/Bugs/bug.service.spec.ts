import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BugService } from './bug.service';
import { Bug } from './schemas/bug.schema';
import { MongoMemoryServer } from 'mongodb-memory-server'; //MongoMemoryServer: a tool to create a fake in-memory MongoDB database for testing.

import * as mongoose from 'mongoose';

describe('BugService', () => {
  let service: BugService;
  let mongod: MongoMemoryServer; //hold fake mongoDB server
  let bugModel: Model<Bug>;//hold the mongoose model for bugs

  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const uri = mongod.getUri();
    await mongoose.connect(uri);
//Before all tests start, create a fake MongoDB server that runs only in memory (no real database).
    const BugSchema = new mongoose.Schema({
      title: String,
      description: String,
      priority: String,
      projectName: String,
      status: String,
    });

    bugModel = mongoose.model<Bug>('Bug', BugSchema);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BugService,
        {
          provide: getModelToken(Bug.name),
          useValue: bugModel,
        },
      ],
    }).compile();

    service = module.get<BugService>(BugService);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  it('should create a bug', async () => {
    const bugData = {
      title: 'Test Bug',
      description: 'Bug description',
      priority: 'High',
      projectName: 'Project A',
      status: 'open',
    };

    const bug = await service.create(bugData);

    expect(bug).toHaveProperty('_id');
    expect(bug.title).toBe('Test Bug');
  });

  it('should find all bugs', async () => {
    const bugs = await service.findAll();
    expect(bugs.length).toBeGreaterThan(0);
  });
});
