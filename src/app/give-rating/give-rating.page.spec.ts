import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GiveRatingPage } from './give-rating.page';

describe('GiveRatingPage', () => {
  let component: GiveRatingPage;
  let fixture: ComponentFixture<GiveRatingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GiveRatingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GiveRatingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
