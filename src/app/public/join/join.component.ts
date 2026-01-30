import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MemberService, Member } from '../../services/member.service';

@Component({
  selector: 'app-join',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.scss']
})
export class JoinComponent {
  member: Member = {
    fullName: '',
    university: '',
    fieldOfStudy: '',
    email: '',
    phone: ''
  };

  success = '';
  error = '';

  constructor(private service: MemberService) {}

  submit() {
    this.service.join(this.member).subscribe({
      next: () => {
        this.success = 'Votre demande d’adhésion a été envoyée avec succès.';
        this.error = '';
        this.member = {
          fullName: '',
          university: '',
          fieldOfStudy: '',
          email: '',
          phone: ''
        };
      },
      error: (err) => {
        this.error = err.error?.message || 'Erreur lors de l’inscription';
        this.success = '';
      }
    });
  }
}
