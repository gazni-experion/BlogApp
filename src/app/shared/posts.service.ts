import { Injectable } from '@angular/core';
import { Posts } from './posts';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Categories } from './categories';


@Injectable({
  providedIn: 'root',
})
export class PostsService {
  posts: Posts[];
  formData: Posts = new Posts();
  categories: Categories[];

  constructor(private httpClient: HttpClient) {}

  getAllPosts(): Observable<any> {
    //https://localhost:44376/api/posts/getallposts
    return this.httpClient.get(environment.apiUrl + '/api/posts/getallposts');
  }

  //Get all posts from view model
  bindListPosts() {
    return this.httpClient
      .get(environment.apiUrl + '/api/posts/getallposts')
      .toPromise()
      .then((response) => {
        console.log('From service');
        console.log(response);
        this.posts = response as Posts[];
      });
  }

  //Get all posts
  getPosts() {
    return this.httpClient
      .get(environment.apiUrl + '/api/posts')
      .toPromise()
      .then((response) => {
        console.log('From service, posts');
        console.log(response);
        this.posts = response as Posts[];
      });
  }

  //Get all categories
  getCategories() {
    return this.httpClient
      .get(environment.apiUrl + '/api/categories')
      .toPromise()
      .then(
        (response) => {
          console.log('From service, Categories');
          console.log(response);
          this.categories = response as Categories[];
        },
        (err) => {
          console.log(err);
        }
      );
  }

  //Post a new post
  insertPost(posts: Posts): Observable<any> {
    return this.httpClient.post(environment.apiUrl + '/api/posts', posts);
  }
}
