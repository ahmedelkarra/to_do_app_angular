import { Component } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { Router } from "@angular/router";


@Component({
    selector: 'app-delete-task',
    templateUrl: './delete-task.component.html',
    standalone: true,
    imports: [ReactiveFormsModule]
})

export class DeleteTaskComponent {
    dataTasks = JSON.parse(localStorage.getItem('tasks') as string) as { id: string, title: string, date: string }[]

    constructor(private router: Router) { }

    seatchFrom = new FormGroup({
        seatch: new FormControl('')
    })

    dataFilter() {
        const dataArray = this.dataTasks.filter((e) => e.title.toLowerCase().includes(this.seatchFrom.value.seatch?.toLowerCase() as string))
        return dataArray
    }

    dataDelete(id: string) {
        const status = confirm('Are you sure to delete this task ?')
        if (status) {
            const indexNumber = this.dataTasks.findIndex((e) => e.id.includes(id))
            this.dataTasks.splice(indexNumber, 1)
            localStorage.setItem('tasks', JSON.stringify(this.dataTasks))
            this.router.navigate(['/'])
        }
    }
}