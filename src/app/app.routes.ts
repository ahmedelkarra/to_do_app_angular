import { Routes } from '@angular/router';
import { EachTaskComponent } from './task/each-task/each-task.component';
import { DeleteTaskComponent } from './task/delete/delete-task.component';
import { AddTaskComponent } from './task/add/add-task.component';
import { EditTaskComponent } from './task/edit/edit-task.component';

export const routes: Routes = [
    {
        path: '', children: [
            { path: '', component: EachTaskComponent },
            { path: 'add', component: AddTaskComponent },
            { path: 'edit', component: EditTaskComponent },
            { path: 'delete', component: DeleteTaskComponent },
        ]
    },
];
