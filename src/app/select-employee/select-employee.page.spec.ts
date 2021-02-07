import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SelectEmployeePage } from './select-employee.page';

describe('SelectEmployeePage', () => {
  let component: SelectEmployeePage;
  let fixture: ComponentFixture<SelectEmployeePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectEmployeePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SelectEmployeePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
