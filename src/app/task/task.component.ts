import { Component, Input, OnInit, Output } from "@angular/core";
import { RouterLink, RouterOutlet } from "@angular/router";
import { EachTaskComponent } from "./each-task/each-task.component";

@Component({
    selector: 'app-task',
    templateUrl: './task.component.html',
    standalone: true,
    imports: [RouterOutlet, EachTaskComponent, RouterLink],
})

export class TaskComponent implements OnInit {
    @Input() tasksData = JSON.parse(localStorage.getItem('tasks') as string) || []
    testDataTest: string = "Hello Ahmed from parent"

    checkLocalStorage() {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify([]))
        }
    }

    ngOnInit(): void {
        this.checkLocalStorage()
    }
}