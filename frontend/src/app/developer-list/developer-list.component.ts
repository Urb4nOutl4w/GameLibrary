import { Component, OnInit } from '@angular/core';
import {DeveloperService} from '../service/developer.service';
import {UserService} from '../service/user.service';
import {ConfirmationService} from 'primeng/api';

@Component({
  selector: 'app-developer-list',
  templateUrl: './developer-list.component.html',
  styleUrls: ['./developer-list.component.scss']
})
export class DeveloperListComponent implements OnInit {

  developers: any[];
  displayedColumns = ['name', 'foundation_date', 'ceo_name', 'id']

  constructor(private developerService: DeveloperService, private userService: UserService,
              private confirmationService: ConfirmationService) { }

  ngOnInit() {
    this.developerService.getDevelopers().subscribe( (response: any[]) => {
      this.developers = response;
    });
  }

  deleteDeveloper(developer: any) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to delete this developer?',
      accept: () => {
        this.developerService.deleteDeveloper(developer).subscribe( () => {
          this.ngOnInit();
        });
      }
    });
  }

}
