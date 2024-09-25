import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule } from "@angular/forms";
import { EditFormComponent } from "../editForm/editForm.component";


@Component({
    selector: 'app-edit-task',
    templateUrl: './edit-task.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, EditFormComponent],
})

export class EditTaskComponent {
    @Input() filterData: string = ''
    @Output() filterDataChange = new EventEmitter<string>()

    @Input() id: string = ''
    @Output() idChange = new EventEmitter<string>()

    @Input() title: string = ''
    @Output() titleChange = new EventEmitter<string>()

    @Input() date: string = ''
    @Output() dateChange = new EventEmitter<string>()

    @Input() show: boolean = false
    @Output() showChange = new EventEmitter<boolean>()

    searchInputForm = new FormGroup({
        searchInput: new FormControl('')
    })

    changeData() {
        const data = localStorage.getItem('tasks') as string
        const convertData = JSON.parse(data) as { id: string, title: string, date: string }[]
        this.filterDataChange.emit(this.filterData = this.searchInputForm.value.searchInput as string || '')
        const allData = convertData.filter((ele) => ele.title.toLowerCase().includes(this.filterData.toLowerCase()))
        return allData
    }

    activeEditForm(status: boolean, title: string, date: string) {
        this.titleChange.emit(this.title = title)
        this.dateChange.emit(this.date = date)
        this.showChange.emit(this.show = status)
    }

}
