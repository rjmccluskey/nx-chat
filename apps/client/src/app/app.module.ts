import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { UserFormComponent } from "./user/user-form.component";
import { MatButtonModule } from '@angular/material/button';

const appRoutes: Routes = [
  { path: '', redirectTo: '/new-user', pathMatch: 'full' },
  { path: 'new-user', component: UserFormComponent },
  { path: 'chat', component: ChatRoomComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [AppComponent, ChatRoomComponent, UserFormComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    BrowserAnimationsModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    MatChipsModule,
    FormsModule,
    ScrollingModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
