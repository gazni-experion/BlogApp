import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.scss']
})
export class PostListComponent implements OnInit {

  page: number=1;
  filter: string;

  constructor(public postsService: PostsService) { }

  ngOnInit(): void {
    console.log('Welcome to life cycle hook')
    this.getPosts();
    this.postsService.bindListPosts();
  }

  getPosts() {
    this.postsService.getAllPosts().subscribe(
      response => {
        console.log('Retrieving data');
        console.log(response);
      },
      error => {
        console.log('Something went wrong');
        console.log(error);
      }
    );
  }

}
