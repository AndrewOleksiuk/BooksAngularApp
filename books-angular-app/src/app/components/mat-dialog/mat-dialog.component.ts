import { Book } from '../../models/book';
import { Component, Inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-mat-dialog',
    templateUrl: 'mat-dialog.component.html',
    styleUrls: ['./mat-dialog.component.scss']
  })

export class MatDialogComponent {
    
    public form = this.fb.group({
       id: [this.book.id],
       name: [this.book.name, Validators.required],
       publisher: [this.book.publisher,  Validators.required],
       isRead: [this.book.isRead],
       notice: [this.book.notice, Validators.required]
    });

    constructor(private fb: FormBuilder,
                @Inject(MAT_DIALOG_DATA) private book: Book,
                private dialogRef: MatDialogRef<MatDialogComponent>) {
    }

    public close(): void {
      this.dialogRef.close();
    }

    public save(): void {
      this.dialogRef.close(this.form.value);
    }
}
