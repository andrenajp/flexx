import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { TermsConditionPage } from './terms-condition.page';

describe('TermsConditionPage', () => {
  let component: TermsConditionPage;
  let fixture: ComponentFixture<TermsConditionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsConditionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(TermsConditionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
