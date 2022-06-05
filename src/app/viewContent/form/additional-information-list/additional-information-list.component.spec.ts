import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalInformationListComponent } from './additional-information-list.component';

describe('AdditionalInformationListComponent', () => {
  let component: AdditionalInformationListComponent;
  let fixture: ComponentFixture<AdditionalInformationListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdditionalInformationListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdditionalInformationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
