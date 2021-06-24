import { TestBed } from '@angular/core/testing';

import { ChatGuardGuard } from './chat-guard.guard';

describe('ChatGuardGuard', () => {
  let guard: ChatGuardGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(ChatGuardGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
