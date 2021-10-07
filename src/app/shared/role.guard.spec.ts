/**
 * * Title: role.guard.ts
 * Author: Grayton Savickas
 * Date: 10/6/21
 * Description: role guard that prevent users other than ones with the admin role.
 */

import { TestBed } from '@angular/core/testing';

import { RoleGuard } from './role.guard';

describe('RoleGuard', () => {
  let guard: RoleGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(RoleGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
