import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  constructor(public postsService: PostsService) {}

  ngOnInit(): void { 
        console.log('Welcome to life cycle hook');
    this.postsService.getCategories();
  }

  //Submit Post
  onSubmit(form: NgForm) {
    console.log(form.value);
    let addId = this.postsService.formData.PostId;
    if (addId == 0 || addId == null) {
      //Add new post
      this.newPost(form);
    }
  }

  newPost(form?: NgForm) {
    console.log("Posting...");
    this.postsService.insertPost(form.value).subscribe(
      res => {
        console.log(res);

      },
      err => {
        console.log(err);
      }
    );
  }
  
}