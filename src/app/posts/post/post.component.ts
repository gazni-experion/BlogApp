import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostsService } from 'src/app/shared/posts.service';
import { ToastrService } from 'ngx-toastr';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  ngForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public postsService: PostsService,
    private toastr: ToastrService
  ) {
    this.ngForm = this.fb.group({
      posts: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    
    console.log('Welcome to life cycle hook');
    this.postsService.getCategories();
  }

  //Create form array
  posts(): FormArray{
    return this.ngForm.get('posts') as FormArray;
  }

  //New post when click on add button
  addNewPost(): FormGroup {
    return this.fb.group({
      PostId: 0,
      Title: '',
      CategoryId: 0,
      CreatedDate: new Date(),
      Description: '',
    });
  }

  //Add new post to form array
  addPost() {
    this.posts().push(this.addNewPost());
  }

  //Delete post from form array
  deletePost(index: number) { 
    this.posts().removeAt(index);
  }

  //Submit Post
  onSubmit(form: NgForm) {
    console.log(this.ngForm.value);
    // let addId = this.postsService.formData.PostId;
    // if (addId == 0 || addId == null) {
    //   //Add new post
    //   this.newPost(form);
    //   this.resetForm(form);
    // }
  }

  newPost(form?: NgForm) {
    console.log('Posting...');
    this.postsService.insertPost(form.value).subscribe(
      (res) => {
        console.log(res);
        this.toastr.success('Posted......', 'Blog App');
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //Clear all contents after submit
  resetForm(form?: NgForm) {
    if (form != null) {
      form.resetForm();
    }
  }
}