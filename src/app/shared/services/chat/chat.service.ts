import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  private dbPath = '/groups';

  tutorialsRef!: AngularFirestoreCollection<any>;

  constructor(private db: AngularFirestore, private afAuth: AngularFireAuth) {
    this.tutorialsRef = db.collection(this.dbPath);
  }
  getAll(userId: any): AngularFirestoreCollection<any> {
    const queryFn = (ref: any) =>
      ref
        .where('members', 'array-contains', userId)
        .where('active', '==', true);
    // return this.tutorialsRef;
    return this.db.collection('/groups', queryFn);
  }

  getAllMessages(
    group: any,
    userId: any = null
  ): AngularFirestoreCollection<any> {
    if (group?.type === 'group') {
      const queryFn = (ref: any) =>
        ref.where('groupId', '==', group.id).orderBy('timestamp', 'asc');
      return this.db.collection('/messages', queryFn);
    } else {
      // console.log(group)
      const queryFn = (ref: any) =>
        ref
          .where('participants', 'in', [group.id, userId])
          .where('type', '==', 'individual')
          .orderBy('timestamp', 'desc');
      return this.db.collection('/messages', queryFn);
    }
  }
  sendMessage(message: any): any {
    return this.db.collection('/messages').add({ ...message });
  }
  async createNewUser(email: string, password: string): Promise<void> {
    try {
      const userCredential = await this.afAuth.signInWithEmailAndPassword(
        email,
        password
      );
      console.log('New user created:', userCredential.user);
    } catch (error) {
      console.error('Error creating new user:', error);
    }
  }

  createGroup(data:any): any {
    return this.db.collection('/groups').add({ ...data });
  }
}
