import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Comment } from 'src/app/models/comment.model';
import { Post } from 'src/app/models/post.model';
import { CommentsService } from 'src/app/services/comments.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: string = '';
  post: Post;
  comments: Comment[] = [];
  commentForm: FormGroup;
  constructor(
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService,
    private commentService: CommentsService,
    public formBuilder: FormBuilder,
  ) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.commentForm = this.formBuilder.group({
      email: ['', Validators.required],
      body: ['', Validators.required],
      post: [this.postId]
    });
    this.getPost();
  }

  getPost(): void {
    this.postsService.getPost(this.postId).subscribe({
      next: (res: Post) => {
        this.post = res;
        this.getComments();
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  getComments(): void {
    this.commentService.getCommentsByPost(this.postId).subscribe({
      next: (res: Comment[]) => {
        this.comments = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }

  onSubmit(): void {
    this.commentService.addComment(this.commentForm.value)
    .subscribe({
      next: (res: Comment) => {
        console.log('Comment added successfully!');
        this.comments.push(res);

        this.commentForm.controls['email'].setValue('');
        this.commentForm.controls['email'].setErrors(null);
        this.commentForm.controls['body'].setValue('');
        this.commentForm.controls['body'].setErrors(null);
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
