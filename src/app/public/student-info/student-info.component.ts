import { Component, OnInit } from '@angular/core';
import { StudentInfoService, StudentInfo } from '../../services/student-info.service';
import { CommonModule } from '@angular/common';
 @Component(
  { selector: 'app-student-info',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-info.component.html',
  styleUrls: ['./student-info.component.scss'] }) 
  export class StudentInfoComponent 
  implements OnInit { infos: StudentInfo[] = [];
 filteredInfos: StudentInfo[] = [];
  categories: string[] = ['Procédure', 'Université', 'Bourse', 'Conseil pratique'];
   selected: string = this.categories[0];
    isLoading = true; errorMessage = ''; 
    constructor(private infoService: StudentInfoService) {} 
    ngOnInit(): void { this.loadInfos();

     } 
     loadInfos(): void { this.infoService.getAllInfos().subscribe({ next: (data) => { this.infos = data; this.filterInfos(this.selected); 
      this.isLoading = false; },
      error: () => { this.errorMessage = 'Impossible de charger les informations'; 
        this.isLoading = false; } });
     } 
     select(category: string) { this.selected = category; this.filterInfos(category);

      } 
      filterInfos(category: string) { 
        this.filteredInfos = this.infos.filter(i => i.category === category); 
      } 
    }