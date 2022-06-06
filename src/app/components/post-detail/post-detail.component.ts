import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss']
})
export class PostDetailComponent implements OnInit {
  postId: string = '';
  post: Post;

  constructor(
    public formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private postsService: PostsService
  ) {
    this.postId = this.activatedRoute.snapshot.paramMap.get('id')!;
  }

  ngOnInit(): void {
    this.getPost();
  }

  getPost(): void {
    this.postsService.getPost(this.postId).subscribe({
      next: (res: Post) => {
        this.post = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
