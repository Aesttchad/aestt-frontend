import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminMemberService } from '../core/services/admin-member.service';
import { Member } from '../../services/member.service';

@Component({
  selector: 'app-admin-members',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-members.component.html',
  styleUrls: ['./admin-members.component.scss']
})
export class AdminMembersComponent implements OnInit {
  members: Member[] = [];

  constructor(private service: AdminMemberService) {}

  ngOnInit(): void {
    this.load();
  }

  load() {
    this.service.getAll().subscribe(data => this.members = data);
  }

  validate(member: Member) {
    this.service.update(member._id!, { status: 'validé' }).subscribe(() => {
      member.status = 'validé';
    });
  }

  delete(id: string) {
    if (!confirm('Supprimer ce membre ?')) return;
    this.service.delete(id).subscribe(() => {
      this.members = this.members.filter(m => m._id !== id);
    });
  }
}
