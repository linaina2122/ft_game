import { Test, TestingModule } from '@nestjs/testing';
import { Player1Controller } from './player1.controller';

describe('Player1Controller', () => {
  let controller: Player1Controller;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [Player1Controller],
    }).compile();

    controller = module.get<Player1Controller>(Player1Controller);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
