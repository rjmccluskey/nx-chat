import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [AppComponent, ChatRoomComponent],
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot([], { initialNavigation: 'enabled' })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
