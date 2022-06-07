import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private postService: PostsService
  ) { 
  }

  ngOnInit(): void {
    this.postForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
    });
  }

  onSubmit(): void {
    this.postService.addPost(this.postForm.value)
    .subscribe({
      next:() => {
        console.log('Data added successfully!');
        this.ngZone.run(() => this.router.navigateByUrl('/admin'));
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
