import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule, Routes } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CommonModule } from '@angular/common';

const appRoutes: Routes = [
  { path: '', component: ChatRoomComponent },
  { path: '**', redirectTo: '/' }
];

@NgModule({
  declarations: [AppComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
