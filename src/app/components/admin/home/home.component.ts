import { Component, OnInit } from '@angular/core';
import { Post } from 'src/app/models/post.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
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

  delete(id: string, i: number): void {
    if (window.confirm('Do you want to delete this post?')) {
      this.postsService.deletePost(id).subscribe({
        next: (res) => {
          console.log(res);
          this.posts.splice(i, 1);
        },
        error: (err) => {
          console.log(err);
        }
      });
    }
  }
}
