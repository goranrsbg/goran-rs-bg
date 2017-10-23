import { TestBed, inject } from '@angular/core/testing';

import { SnakeGameService } from './snake-game.service';

describe('SnakeGameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SnakeGameService]
    });
  });

  it('should be created', inject([SnakeGameService], (service: SnakeGameService) => {
    expect(service).toBeTruthy();
  }));
});
