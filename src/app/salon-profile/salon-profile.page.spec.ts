import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SalonProfilePage } from './salon-profile.page';

describe('SalonProfilePage', () => {
  let component: SalonProfilePage;
  let fixture: ComponentFixture<SalonProfilePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalonProfilePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SalonProfilePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
