import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddPostComponent } from './components/admin/add-post/add-post.component';
import { EditPostComponent } from './components/admin/edit-post/edit-post.component';
import { HomeComponent } from './components/admin/home/home.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'posts-list' },
  { path: 'posts-list', component: PostsListComponent },
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'admin', children: [
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: HomeComponent },
    { path: 'add-post', component: AddPostComponent },
    { path: 'edit-post/:id', component: EditPostComponent }
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
