import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";


@Component({
    selector: 'app-each-task',
    templateUrl: './each-task.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})

export class EachTaskComponent implements OnInit {

    searchFrom = new FormGroup({
        search: new FormControl('')
    })

    checkLocalStorage() {
        if (!localStorage.getItem('tasks')) {
            localStorage.setItem('tasks', JSON.stringify([]))
        }
    }

    ngOnInit(): void {
        this.checkLocalStorage()
    }

    tasksData() {
        const data = JSON.parse(localStorage.getItem('tasks') as string) as { id: string, title: string, date: string }[]
        const filterData = data.filter((e) => e.title.toLowerCase().includes(this.searchFrom.value.search as string))
        return filterData
    }

}