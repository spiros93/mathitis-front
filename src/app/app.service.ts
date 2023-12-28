
import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Person } from './interfaces/person';
import { Post } from './interfaces/post';
import { Credentials } from './interfaces/credentials';
import { retry } from 'rxjs/operators';
import { JWTToken } from './interfaces/jwttoken';
import { BehaviorSubject, Observable } from 'rxjs';


const NESTJS_API = 'http://localhost:3001/'


@Injectable()
export class RowDetailService {
  rowDetailSource: BehaviorSubject<any> = new BehaviorSubject(null);
  rowDetail$: Observable<any> = this.rowDetailSource.asObservable();
  setRowDetail(detail:any) {
      this.rowDetailSource.next(detail);
  }
}

@Injectable({
  providedIn: 'root'
})
export class AppService {
  
  isLoggedIn= localStorage.getItem('access_token') ? new BehaviorSubject<boolean>(true) : new BehaviorSubject<boolean>(false);
  fullname= localStorage.getItem('fullname') ? new BehaviorSubject<string>(localStorage.getItem('fullname') || '') : new BehaviorSubject<string>('');
  photoUrl= localStorage.getItem('photoUrl') ? new BehaviorSubject<string>(localStorage.getItem('photoUrl') || '') : new BehaviorSubject<string>('');


  constructor(private http: HttpClient = inject(HttpClient)) { }

  getAllUsers(){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Person[]>('http://localhost:3001/users',{ headers })
  }

  getUserById(id:string){
    console.log("user id" + id)
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Person>(`http://localhost:3001/users/${id}`,{ headers })
  }

  getUserName(username:string){
    console.log("user username" + username)
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    return this.http.get<Person>(`http://localhost:3001/users/username/${username}`,{ headers })
  }

  addUser(user: Person){
    console.log(user);
    return this.http.post<Person>('http://localhost:3001/users', user)
  }

  deleteUser(id:string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
   // const userId = localStorage.getItem('user_id')
    return this.http.delete<Person>(`http://localhost:3001/users/${id}`, { headers })
  }

  updateUser(user: Person, id: string){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    console.log("id " +id)
    console.log("user " + user)
    //const userId = id :localStorage.getItem('user_id')
    return this.http.put<Person>(`http://localhost:3001/users/${id}`, user, { headers })
  }

  updateUserPassword(user: Person){
    const headers = { 'authorization': 'Bearer '+  localStorage.getItem('access_token')}
    console.log("user " + user)
    return this.http.put<Person>(`http://localhost:3001/users/password`, user, { headers })
  }

  // NestJS calls

  login(credentials: Credentials){
    return this.http.post<JWTToken>(`${NESTJS_API}auth/login`, credentials);
  }

  logout() {
    this.isLoggedIn.next(false);
    this.fullname.next('');
    this.photoUrl.next('');
    localStorage.removeItem('user_id');
    localStorage.removeItem('username');
    localStorage.removeItem('is_admin');
    localStorage.removeItem('access_token');
    localStorage.removeItem('fullname');
    localStorage.removeItem('photoUrl');
    console.log ("logout " + localStorage.getItem('photoUrl'))
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

  getPostByTitle(title: string){
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
