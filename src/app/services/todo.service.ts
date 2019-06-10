import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument, DocumentReference } from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

export interface Todo {
  id?: string;
  name: string;
  description: string;
  checked: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos: Observable<Todo[]>;
  private todoCollection: AngularFirestoreCollection<Todo>;

  constructor(private firestore: AngularFirestore) {
    this.todoCollection = this.firestore.collection<Todo>('todos');
    this.todos = this.todoCollection.snapshotChanges().pipe(
      map((actions: any) => {
        return actions.map(a => {
          const data = a.payload.doc.data();
          const id = a.payload.doc.id;
          return { id, ...data };
        });
      })
    );
  }

  getAll(): Observable<Todo[]> {
    return this.todos;
  }

  getOne(id: string): Observable<Todo> {
    return this.todoCollection.doc<Todo>(id).valueChanges().pipe(
      take(1),
      map((todo: any) => {
        if (todo) {
          todo.id = id;
          return todo;
        }
      })
    );
  }

  add(todo: Todo): Promise<DocumentReference> {
    return this.todoCollection.add(todo);
  }

  update(todo: Todo): Promise<void> {
    return this.todoCollection.doc(todo.id).update({ name: todo.name, description: todo.description, checked: todo.checked });
  }

  delete(id: string): Promise<void> {
    return this.todoCollection.doc(id).delete();
  }

}
