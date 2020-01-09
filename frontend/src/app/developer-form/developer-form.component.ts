import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormBuilder, ValidatorFn, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {GameService} from '../service/game.service';
import {GenreService} from '../service/genre.service';
import {DeveloperService} from '../service/developer.service';
import {PlatformService} from '../service/platform.service';

@Component({
  selector: 'app-developer-form',
  templateUrl: './developer-form.component.html',
  styleUrls: ['./developer-form.component.scss']
})
export class DeveloperFormComponent implements OnInit {

  developerFormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private route: ActivatedRoute,
              private router: Router, private developerService: DeveloperService) { }

  ngOnInit() {
    this.developerFormGroup = this.fb.group({
      id: [null],
      name: ['', Validators.required],
      country: ['', Validators.required],
      employee_count: [0],
      foundation_date: [null, Validators.required],
      ceo_name: ['', this.noNumbersValidator()],

    });

    const id = this.route.snapshot.paramMap.get('id');

    const data = this.route.snapshot.data;
    if (data.developer) {
      this.developerFormGroup.patchValue(data.developer);
    }

  }

  createDeveloper() {
    const developer = this.developerFormGroup.value;
    if (developer.id) {
      this.developerService.updateDeveloper(developer).subscribe(() => {
        alert('updated succesfully');
      });
    } else {
      this.developerService.createDeveloper(developer).subscribe((response: any) => {
        this.router.navigate(['/developer-form/' + response.id]);
      });
    }
  }

  noNumbersValidator(): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} | null => {
      const forbidden = /([0-9])/.test(control.value);
      return forbidden ? {number: {value: control.value}} : null;
    };
  }

}
