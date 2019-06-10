import { Component, OnInit } from '@angular/core';
import { NavController, ToastController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.page.html',
  styleUrls: ['./create-update.page.scss'],
})
export class CreateUpdatePage implements OnInit {
  private todo: Todo;
  private id: any;

  constructor(public nav: NavController, public toast: ToastController, private route: ActivatedRoute, private todoService: TodoService) {
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
      this.todoService.getOne(this.id).subscribe(todo => {
        this.todo = todo;
      });
    }
  }

  save() {
    if (this.todo.name && this.todo.description) {
      this.todoService.add(this.todo).then(() => {
        this.presentToast('To-do adicionada com sucesso!');
        this.nav.navigateBack('list');
      }, err => {
        this.presentToast('Ocorreu um erro, por favor tente novamente.');
      });
    } else {
      this.presentToast('Preencha os campos corretamente!');
    }
  }

  update() {
    if (this.todo.name && this.todo.description) {
      this.todoService.update(this.todo).then(() => {
        this.presentToast('To-do adicionada com sucesso!');
        this.nav.navigateBack('list');
      }, err => {
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
