import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostAltComponent } from './post-alt.component';

describe('PostAltComponent', () => {
  let component: PostAltComponent;
  let fixture: ComponentFixture<PostAltComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [PostAltComponent]
    });
    fixture = TestBed.createComponent(PostAltComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
