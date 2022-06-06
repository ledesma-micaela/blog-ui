import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatIconModule } from "@angular/material/icon";

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddPostComponent } from './components/admin/add-post/add-post.component';
import { PostDetailComponent } from './components/post-detail/post-detail.component';
import { PostsListComponent } from './components/posts-list/posts-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/admin/home/home.component';
import { EditPostComponent } from './components/admin/edit-post/edit-post.component';
import { SliceTextPipe } from './pipes/slice-text.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AddPostComponent,
    PostDetailComponent,
    PostsListComponent,
    HomeComponent,
    EditPostComponent,
    SliceTextPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
