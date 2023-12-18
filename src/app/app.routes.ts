import { Routes } from "@angular/router";
import { WelcomeComponent } from "./welcome/welcome.component";
import { CreateUserComponent } from "./crud-demo/crud/create-user/create-user.component";
import { ReadUserComponent } from "./crud-demo/crud/read-user/read-user.component";
import { UpdateUserComponent } from "./crud-demo/crud/update-user/update-user.component";
import { DeleteUserComponent } from "./crud-demo/crud/delete-user/delete-user.component";
import { CreatePostComponent } from "./crud-post/crud/create-post/create-post.component";
import { ReadPostComponent } from "./crud-post/crud/read-post/read-post.component";
import { UpdatePostComponent } from "./crud-post/crud/update-post/update-post.component";
import { DeletePostComponent } from "./crud-post/crud/delete-post/delete-post.component";
import { ListPostsComponent } from "./crud-post/utils/list-post/list-post.component";
import { ListUsersComponent } from "./crud-demo/utils/list-users/list-users.component";
import { LoginFormComponent } from "./login-form/login-form.component";
import { ReadUsersPostComponent } from "./crud-post/crud/read-user-posts/read-user-posts.component";
import { UpdateUserListComponent } from "./crud-demo/crud/update-user-from-list/update-user-from-list.component";

export const routes: Routes = [
  {path: 'home', component: WelcomeComponent},
  {path: 'login', component: LoginFormComponent},
  {path: 'crud-demo/create', component: CreateUserComponent},
  {path: 'crud-demo/read', component: ReadUserComponent},
  {path: 'crud-demo/update', component: UpdateUserComponent},
  {path: 'crud-demo/delete', component: DeleteUserComponent},
  {path: 'crud-demo/list', component: ListUsersComponent},
  {path: 'crud-post/create', component: CreatePostComponent},
  {path: 'crud-post/read', component: ReadPostComponent},
  {path: 'crud-post/update', component: UpdatePostComponent},
  {path: 'crud-post/delete', component: DeletePostComponent},
  {path: 'crud-post/list', component: ListPostsComponent},
  {path: 'crud-post/read-user-posts', component: ReadUsersPostComponent},
  {path: 'crud-demo/update-from-list', component: UpdateUserListComponent},
];