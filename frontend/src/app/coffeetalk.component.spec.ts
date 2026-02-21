import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CoffeeTalkComponent } from './coffeetalk.component';

describe('CoffeeTalkComponent', () => {
  let component: CoffeeTalkComponent;
  let fixture: ComponentFixture<CoffeeTalkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoffeeTalkComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CoffeeTalkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
