import { loadRemoteModule } from '@angular-architects/module-federation';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{
    path: 'remote_app', // The path that will trigger loading the remote
    loadChildren: () => 
      // import('utility/Module')
      loadRemoteModule({
        type: 'module', 
        remoteEntry: 'http://localhost:4201/remoteEntry.js', 
        exposedModule: './Module' 
      })
      .then(m =>{console.log(m.TEST_STRING); return m.AppModule} ) 
      .catch(err => console.error('Error loading remote module:', err)) 
  },
{
  path:'home', loadChildren: ()=> import('./home/home.module').then(m => m.HomeModule)
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
