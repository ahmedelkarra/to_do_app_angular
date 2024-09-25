import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { SuccessMessageComponent } from "../../success-message/success-message.component";
import { ErrorMessageComponent } from "../../error-message/error-message.component";

@Component({
    selector: 'app-editForm',
    templateUrl: 'editForm.component.html',
    standalone: true,
    imports: [ReactiveFormsModule, SuccessMessageComponent, ErrorMessageComponent]
})

export class EditFormComponent implements OnInit {
    @Input() successMessage: string = ''
    @Output() successMessageChange = new EventEmitter<string>()

    @Input() errorMessage: string = ''
    @Output() errorMessageChange = new EventEmitter<string>()

    @Input() title?: string;
    @Input() date?: string;
    @Input() show: boolean = true
    @Output() showChange = new EventEmitter<boolean>()

    constructor(private router: Router) { }

    editInputForm = new FormGroup({
        id: new FormControl(''),
        title: new FormControl('', [Validators.required, Validators.maxLength(2000)]),
        date: new FormControl('', Validators.required),
    })

    ngOnInit(): void {
        this.editInputForm = new FormGroup({
            id: new FormControl("id" + Math.random().toString(16).slice(2)),
            title: new FormControl(this.title as string, [Validators.required, Validators.maxLength(2000)]),
            date: new FormControl(this.date as string, [Validators.required]),
        })
    }

    activeEditForm(status: boolean) {
        this.showChange.emit(this.show = status)
    }

    editTask() {
        const status = this.editInputForm.valid
        const value = this.editInputForm.value
        if (status) {
            if (!localStorage.getItem('tasks')) {
                localStorage.setItem('tasks', JSON.stringify([]))
            }
            const taskData = JSON.parse(localStorage.getItem('tasks') as string) as { id: string, title: string, date: string }[]
            const indexNumber = taskData.findIndex((e) => e.title.toLowerCase().includes(this.title?.toLowerCase() as string || ''))
            taskData.splice(indexNumber, 1, { id: this.editInputForm.value.id as string, title: this.editInputForm.value.title as string, date: this.editInputForm.value.date as string })
            localStorage.setItem('tasks', JSON.stringify(taskData))
            this.successMessageChange.emit(this.successMessage = 'Your task has been updeted')
            setTimeout(() => {
                this.activeEditForm(false)
                this.successMessageChange.emit(this.successMessage = '')
                this.router.navigate(['/'])
            }, 3000)
        } else if (this.editInputForm.value.title == '') {
            this.errorMessageChange.emit(this.errorMessage = 'Please fill the title input')
            setTimeout(() => {
                this.errorMessageChange.emit(this.errorMessage = '')
            }, 3000)
        } else if (this.editInputForm.value.date == '') {
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