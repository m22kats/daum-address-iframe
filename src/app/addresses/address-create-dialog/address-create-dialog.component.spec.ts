import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressCreateDialogComponent } from './address-create-dialog.component';

describe('AddressCreateDialogComponent', () => {
  let component: AddressCreateDialogComponent;
  let fixture: ComponentFixture<AddressCreateDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddressCreateDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddressCreateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
