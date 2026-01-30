import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgentService, Agent } from '../../services/agent.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {
  bureau: Agent[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(private agentService: AgentService) {}

  ngOnInit(): void {
    this.agentService.getAgents().subscribe({
      next: (data) => {
        this.bureau = data;
        this.isLoading = false;
      },
      error: () => {
        this.errorMessage = 'Impossible de charger le bureau exécutif.';
        this.isLoading = false;
      }
    });
  }
}
