import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AdminStudentInfoService } from '../core/services/admin-student-info.service';
import { StudentInfo } from '../../services/student-info.service';

@Component({
  selector: 'app-admin-student-info',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './admin-student-info.component.html',
  styleUrls: ['./admin-student-info.component.scss']
})
export class AdminStudentInfoComponent implements OnInit {
  infos: StudentInfo[] = [];
  isLoading = true;

  constructor(private service: AdminStudentInfoService) {}

  ngOnInit(): void {
    this.service.getAll().subscribe(data => {
      this.infos = data;
      this.isLoading = false;
    });
  }

  deleteInfo(id?: string) {
    if (!id) return;
    if (!confirm('Supprimer cette information ?')) return;

    this.service.delete(id).subscribe(() => {
      this.infos = this.infos.filter(i => i._id !== id);
    });
  }
}
