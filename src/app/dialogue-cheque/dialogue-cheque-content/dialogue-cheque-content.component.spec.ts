import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogueChequeContentComponent } from './dialogue-cheque-content.component';

describe('DialogueChequeContentComponent', () => {
  let component: DialogueChequeContentComponent;
  let fixture: ComponentFixture<DialogueChequeContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogueChequeContentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogueChequeContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
