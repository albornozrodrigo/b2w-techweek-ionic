import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { LoaderHelper } from 'src/app/helpers/loader.helper';
import { Todo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private id: any;
  private todo: Todo;

  constructor(
    public toast: ToastController,
    public route: ActivatedRoute,
    public todoService: TodoService,
    public loader: LoaderHelper
  ) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.loader.show();
      this.todoService.getOne(this.id).subscribe(todo => {
        this.todo = todo;
        this.loader.hide();
      }, err => {
        this.loader.hide();
        this.presentToast('Ocorreu um erro, por favor tente novamente.');
      });
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
