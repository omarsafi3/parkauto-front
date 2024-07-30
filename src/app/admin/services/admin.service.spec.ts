import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AdminService } from './admin.service';

describe('AdminService', () => {
  let service: AdminService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Include HttpClientTestingModule to mock HttpClient requests
      providers: [AdminService] // Provide the AdminService
    });
    service = TestBed.inject(AdminService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // Additional test cases can be added here
  it('should fetch admins', () => {
    // Test logic for fetching admins
  });

  it('should create an admin', () => {
    // Test logic for creating an admin
  });
});