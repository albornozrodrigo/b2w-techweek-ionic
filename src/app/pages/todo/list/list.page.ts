import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.page.html',
  styleUrls: ['./list.page.scss'],
})
export class ListPage implements OnInit {
  private list: any;

  constructor(
    public toast: ToastController,
    public router: Router,
    public todoService: TodoService,
    public loader: LoaderHelper
  ) {}

  ngOnInit() {}

  ionViewWillEnter() {
    this.loader.show();
    this.todoService.getAll().subscribe(res => {
      this.list = res;
      this.loader.hide();
    }, err => {
      this.loader.hide();
      this.presentToast('Ocorreu um erro, por favor tente novamente.');
    });
  }

  update(todo: any) {
    this.loader.show();
    this.todoService.update(todo).then(() => {
      this.loader.hide();
      this.presentToast('To-do atualizada com sucesso!');
    }, err => {
      this.loader.hide();
      this.presentToast('Ocorreu um erro, por favor tente novamente.');
    });
  }

  remove(id: any) {
    this.loader.show();
    this.todoService.delete(id).then(() => {
      this.loader.hide();
      this.presentToast('To-do removida com sucesso!');
    }, err => {
      this.loader.hide();
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
