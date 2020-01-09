import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AuthGuard} from './auth.guard';
import {GameFormComponent} from './game-form/game-form.component';
import {GameListComponent} from './game-list/game-list.component';
import {DeveloperListComponent} from './developer-list/developer-list.component';
import {DeveloperFormComponent} from './developer-form/developer-form.component';
import {LoginComponent} from './login/login.component';
import {DeveloperOptionsResolver} from './resolver/developer-options.resolver';
import {PlatformOptionsResolver} from './resolver/platform-options.resolver';
import {GameResolver} from './resolver/game.resolver';
import {DeveloperResolver} from './resolver/developer.resolver';


const routes: Routes = [
  { path: '', redirectTo: 'game-list', pathMatch: 'full'},
  { path: 'game-list',
    component: GameListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'game-form',
    component: GameFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      developerOptions: DeveloperOptionsResolver,
      platformOptions: PlatformOptionsResolver,
    }
  },
  { path: 'game-form/:id',
    component: GameFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      developerOptions: DeveloperOptionsResolver,
      platformOptions: PlatformOptionsResolver,
      game: GameResolver,
    }
  },

  { path: 'developer-list',
    component: DeveloperListComponent,
    canActivate: [AuthGuard],
  },
  { path: 'developer-form',
    component: DeveloperFormComponent,
    canActivate: [AuthGuard],
  },
  { path: 'developer-form/:id',
    component: DeveloperFormComponent,
    canActivate: [AuthGuard],
    resolve: {
      developer: DeveloperResolver,
    }
  },
  {path: 'login', component: LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
