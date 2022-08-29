import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavFabMenuComponent } from './nav-fab-menu.component';

describe('NavFabMenuComponent', () => {
  let component: NavFabMenuComponent;
  let fixture: ComponentFixture<NavFabMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ NavFabMenuComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavFabMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
