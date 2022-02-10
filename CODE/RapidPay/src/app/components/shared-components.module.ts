import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

import { MaterialModules } from '../material-modules';

import { CardComponent } from './card/card.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LoadingProcessComponent } from './loading-process/loading-process.component';
import { SearchEntitiesComponent } from './search-entities/search-entities.component';
import { TableComponent } from './table/table.component';
import { TabsComponent } from './tabs/tabs.component';
import { TabsPipe } from './tabs/tabs.pipe';
import { CardPopupComponent } from './card/card-popup/card-popup.component';
import { PopUpTableComponent } from './table/pop-up-table/pop-up-table.component';


@NgModule({
  declarations: [
    CardComponent,
    FooterComponent,
    HeaderComponent,
    LoadingProcessComponent,
    SearchEntitiesComponent,
    TableComponent,
    TabsComponent,
    TabsPipe,
    CardPopupComponent,
    PopUpTableComponent,
  ],
  imports: [
    CommonModule,
    MaterialModules,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule,
    RouterModule
  ],
  exports:[
    CardComponent,
    FooterComponent,
    HeaderComponent,
    LoadingProcessComponent,
    SearchEntitiesComponent,
    TableComponent,
    TabsComponent,
    CommonModule,
    MaterialModules,
    ReactiveFormsModule,
    FormsModule,
    TranslateModule
  ]
})
export class SharedComponentsModule { }
