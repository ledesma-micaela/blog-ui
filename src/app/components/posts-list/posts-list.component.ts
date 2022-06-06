import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Post[] = [];

  constructor(private postsService: PostsService) { }

  ngOnInit(): void {
    this.getPosts();    
  }

  getPosts(): void {
    this.postsService.getPosts().subscribe({
      next: (res: Post[]) => {
        console.log(res);
        this.posts = res;
      },
      error: (err) => {
        console.log(err);
      }
    });
  }
}
