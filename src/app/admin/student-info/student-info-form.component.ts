import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminStudentInfoService } from '../core/services/admin-student-info.service';
import { StudentInfo } from '../../services/student-info.service';
@Component({
  selector: 'app-student-info-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-info-form.component.html',
  styleUrls: ['./student-info-form.component.scss']
})
export class StudentInfoFormComponent {

  info: Partial<StudentInfo> = {
    title: '',
    content: '',
    category: 'Procédure'
  };

  constructor(
    private service: AdminStudentInfoService,
    private router: Router
  ) {}

  submit() {
    this.service.create(this.info).subscribe(() => {
      this.router.navigate(['/admin/student-info']);
    });
  }
}
