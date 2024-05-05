import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { userAdminGuard} from './user-admin.guard';

describe('userAdminGuardGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userAdminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
