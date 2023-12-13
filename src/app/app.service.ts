
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Person } from './interfaces/person';
import { Post } from './interfaces/post';
import { Credentials } from './interfaces/credentials';
import { retry } from 'rxjs/operators';
import { JWTToken } from './interfaces/jwttoken';
import { BehaviorSubject } from 'rxjs';

const NESTJS_API = 'http://localhost:3001/'

@Injectable({
  providedIn: 'root'
})
export class AppService {
  isLoggedIn= new BehaviorSubject<boolean>(false);
  fullname = new BehaviorSubject<string>('');

  constructor(private http: HttpClient = inject(HttpClient)) { }

  getAllUsers(){
    console.log("all users")
    return this.http.get<Person[]>('http://localhost:3001/users')
  }

  getUserById(id:string){
    console.log("user id" + id)
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Person>(`http://localhost:3001/users/${id}`,{ headers })
  }

  addUser(user: Person){
    console.log(user);
    return this.http.post<Person>('http://localhost:3001/users', user)
  }

  deleteUser(id:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    const userId = localStorage.getItem('user_id')
    return this.http.delete<Person>(`http://localhost:3001/users/${userId}`, { headers })
  }

  updateUser(user: Person){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    const userId = localStorage.getItem('user_id')
    return this.http.put<Person>(`http://localhost:3001/users/${userId}`, user, { headers })
  }

  // NestJS calls

  login(credentials: Credentials){
    console.log(credentials)
    return this.http.post<JWTToken>(`${NESTJS_API}auth/login`, credentials);
  }

  logout() {
    this.isLoggedIn.next(false);
    this.fullname.next('');
    localStorage.removeItem('access_token');
  }

  /************************************ post **********************************/

  getAllPosts(){
    console.log("all posts")
    return this.http.get<Post[]>('http://localhost:3001/posts')
  }

  getPostByUserId(id:string){
    console.log("post id " + id)
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Post>(`http://localhost:3001/posts/userId/${id}`,{ headers })
  }

  getPostByPostTitlerUserId(id:string, postTitle:string){
    console.log("post id title" + id)
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Post>(`http://localhost:3001/posts/title/userId?postTitle=${postTitle}&userId=${id}`,{ headers })
  }

  getPostByTitle(title:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Post>(`http://localhost:3001/posts/${title}`,{ headers })
  }

  addPost(post: Post){
    console.log(post)
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.post<Post>('http://localhost:3001/posts/', post, { headers })
  }

  deletePost(id:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    const postId = localStorage.getItem('post_id')
    return this.http.delete<Post>(`http://localhost:3001/posts/${id}`, { headers })
  }

  updatePost(post: Post, postId: string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    console.log("postaaaaaa")
    return this.http.put<Post>(`http://localhost:3001/posts/${postId}`, post, { headers })
  }
}
