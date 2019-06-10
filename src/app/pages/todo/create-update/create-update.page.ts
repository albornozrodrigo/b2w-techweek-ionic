import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { Todo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.page.html',
  styleUrls: ['./create-update.page.scss'],
})
export class CreateUpdatePage implements OnInit {
  private todo: Todo;
  private id: any;

  constructor(
    public nav: NavController,
    public toast: ToastController,
    public route: ActivatedRoute,
    public todoService: TodoService,
    public loader: LoaderHelper
  ) {
    this.todo = {
      name: '',
      description: '',
      checked: false
    };
  }

  ngOnInit() {}

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loader.show();
      this.todoService.getOne(this.id).subscribe(todo => {
        this.todo = todo;
        this.loader.hide();
      }, err => {
        this.presentToast('Ocorreu um erro, por favor tente novamente.');
        this.loader.hide();
      });
    }
  }

  save() {
    if (this.todo.name && this.todo.description) {
      this.loader.show();
      this.todoService.add(this.todo).then(() => {
        this.loader.hide();
        this.presentToast('To-do adicionada com sucesso!');
        this.nav.navigateBack('list');
      }, err => {
        this.loader.hide();
        this.presentToast('Ocorreu um erro, por favor tente novamente.');
      });
    } else {
      this.presentToast('Preencha os campos corretamente!');
    }
  }

  update() {
    if (this.todo.name && this.todo.description) {
      this.loader.show();
      this.todoService.update(this.todo).then(() => {
        this.loader.hide();
        this.presentToast('To-do adicionada com sucesso!');
        this.nav.navigateBack('list');
      }, err => {
        this.loader.hide();
        this.presentToast('Ocorreu um erro, por favor tente novamente.');
      });
    } else {
      this.presentToast('Preencha os campos corretamente!');
    }
  }

  async presentToast(text: string) {
    const toast = await this.toast.create({
      message: text,
      duration: 2000
    });
    toast.present();
  }

}
