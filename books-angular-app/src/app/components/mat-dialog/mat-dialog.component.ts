import { Component, Inject, OnInit } from '@angular/core';
import { Book } from '../../models/book';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef, MatDialogConfig } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'mat-dialog',
    templateUrl: 'mat-dialog.component.html',
  })

export class MatDialogComponent {
    
    form = this.fb.group({
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

    ngOnInit() {
    }

    close() {
      this.dialogRef.close();
    }

    save() {
      this.dialogRef.close(this.form.value);
    }
}
