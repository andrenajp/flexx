import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VerifactionPage } from './verifaction.page';

describe('VerifactionPage', () => {
  let component: VerifactionPage;
  let fixture: ComponentFixture<VerifactionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VerifactionPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VerifactionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
