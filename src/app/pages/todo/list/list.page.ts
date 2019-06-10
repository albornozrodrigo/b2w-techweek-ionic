import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Todo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  private list: any;

  constructor(public toast: ToastController, public router: Router, private todoService: TodoService) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.todoService.getAll().subscribe(res => {
      console.log(res);
      this.list = res;
    });
  }

  update(todo: any) {
    this.todoService.update(todo).then(() => {
      this.presentToast('To-do atualizada com sucesso!');
    }, err => {
      this.presentToast('Ocorreu um erro, por favor tente novamente.');
    });
  }

  remove(id: any) {
    this.todoService.delete(id).then(() => {
      this.presentToast('To-do removida com sucesso!');
    }, err => {
      this.presentToast('Ocorreu um erro, por favor tente novamente.');
    });
  }

  edit(id: number) {
    this.router.navigate(['/create-update', { id }]);
  }

  details(id: number) {
    this.router.navigate(['/details', { id }]);
  }

  async presentToast(text: string) {
    const toast = await this.toast.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}
