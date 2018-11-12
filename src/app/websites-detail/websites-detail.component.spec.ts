import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsitesDetailComponent } from './websites-detail.component';

describe('ListUserComponent', () => {
  let component: WebsitesDetailComponent;
  let fixture: ComponentFixture<WebsitesDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsitesDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsitesDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
