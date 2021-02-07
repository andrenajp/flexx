import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DateTimePage } from './date-time.page';

describe('DateTimePage', () => {
  let component: DateTimePage;
  let fixture: ComponentFixture<DateTimePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DateTimePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
