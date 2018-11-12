import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import {  ListWebsitesComponent } from './list-websites.component';

describe('ListUserComponent', () => {
  let component: ListWebsitesComponent;
  let fixture: ComponentFixture<ListWebsitesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListWebsitesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListWebsitesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
