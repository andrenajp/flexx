import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SharingPage } from './sharing.page';

describe('SharingPage', () => {
  let component: SharingPage;
  let fixture: ComponentFixture<SharingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SharingPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SharingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
