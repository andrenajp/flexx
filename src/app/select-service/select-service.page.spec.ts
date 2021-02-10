import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectServicePage } from './select-service.page';

describe('SelectServicePage', () => {
  let component: SelectServicePage;
  let fixture: ComponentFixture<SelectServicePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectServicePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectServicePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
