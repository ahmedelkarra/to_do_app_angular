import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SuccessMessageComponent } from "../../success-message/success-message.component";
import { ErrorMessageComponent } from "../../error-message/error-message.component";


@Component({
    selector: 'app-add-task',
    templateUrl: './add-task.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, SuccessMessageComponent, ErrorMessageComponent]
})

export class AddTaskComponent {
    @Input() successMessage: string = ''
    @Output() successMessageChange = new EventEmitter<string>()

    @Input() errorMessage: string = ''
    @Output() errorMessageChange = new EventEmitter<string>()

    profileForm = new FormGroup({
        id: new FormControl("id" + Math.random().toString(16).slice(2)),
        title: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
        date: new FormControl('', Validators.required),
    })
    constructor(private router: Router) { }

    addTask(): void {
        const status = this.profileForm.valid
        const value = this.profileForm.value
        if (status) {
            if (!localStorage.getItem('tasks')) {
                localStorage.setItem('tasks', JSON.stringify([]))
            }
            const getAllTasks = localStorage.getItem('tasks') as string || ''
            const convertAllTasks = JSON.parse(getAllTasks) as {}[]
            convertAllTasks.push(value)
            localStorage.setItem('tasks', JSON.stringify(convertAllTasks))
            this.successMessageChange.emit(this.successMessage = 'Your task has been added')
            this.profileForm.reset()
            setTimeout(() => {
                this.successMessageChange.emit(this.successMessage = '')
                this.router.navigate(['/'])
            }, 3000)
        } else if (this.profileForm.value.title == '') {
            this.errorMessageChange.emit(this.errorMessage = 'Please fill the title input')
            setTimeout(() => {
                this.errorMessageChange.emit(this.errorMessage = '')
            }, 3000)
        } else if (this.profileForm.value.date == '') {
            this.errorMessageChange.emit(this.errorMessage = 'Please fill the date input')
            setTimeout(() => {
                this.errorMessageChange.emit(this.errorMessage = '')
            }, 3000)
        } else {
            this.errorMessageChange.emit(this.errorMessage = 'Form is not valid')
            setTimeout(() => {
                this.errorMessageChange.emit(this.errorMessage = '')
            }, 3000)
        }
    }
}