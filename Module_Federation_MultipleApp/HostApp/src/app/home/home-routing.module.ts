import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { loadRemoteModule } from '@angular-architects/module-federation';
const routes: Routes = [{
  path: '', component: HomeComponent,
  children: [{
    path: 'remote_app', 
    loadChildren: () =>
      loadRemoteModule({
        type: 'module',
        remoteEntry: 'http://localhost:4201/remoteEntry.js',
        exposedModule: './Module'
      })
        .then(m => { console.log(m.TEST_STRING); return m.AppModule })
        .catch(err => console.error('Error loading remote module:', err))
  }]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
