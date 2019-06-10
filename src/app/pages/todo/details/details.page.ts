import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Todo, TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {
  private todo: Todo;
  private id: any;

  constructor(private route: ActivatedRoute, private todoService: TodoService) { }

  ngOnInit() {}

  ionViewWillEnter() {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.todoService.getOne(this.id).subscribe(todo => {
        this.todo = todo;
      });
    }
  }

}
