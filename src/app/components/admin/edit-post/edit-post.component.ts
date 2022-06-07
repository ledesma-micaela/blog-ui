import { Component, NgZone, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  postId: string = '';
  updateForm: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    private router: Router,
    private ngZone: NgZone,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getPost();
    this.updateForm = this.formBuilder.group({
      body: [''],
      title: [''],
    });
  }

  getPost(): void {
    this.postsService.getPost(this.postId).subscribe({
      next: (res: Post) => {
        this.updateForm.setValue({
          title: res['title'],
          body: res['body'],
        });
      },
      error: (err) => {
        console.log(err);
      }
    });;
  }

  onUpdate(): void {
    this.postsService.updatePost(this.postId, this.updateForm.value)
      .subscribe({
        next: () => {
          console.log('Data updated successfully!');
          this.ngZone.run(() => this.router.navigateByUrl('/admin'));
        },
        error: (err) => {
          console.log(err);
        }
      });
  }
}
