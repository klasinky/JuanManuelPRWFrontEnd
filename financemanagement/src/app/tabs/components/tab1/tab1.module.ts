import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../../../explore-container/explore-container.module';


import { Tab1PageRoutingModule } from './tab1-routing.module';
import { HeaderComponent } from 'src/app/components/header/header.component';

import {ListmonthComponent} from './components/listmonth/listmonth.component';
import { DetailmonthComponent } from './components/detailmonth/detailmonth.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    
  ],
  declarations: [Tab1Page,
     HeaderComponent, 
     ListmonthComponent,
     DetailmonthComponent]
})
export class Tab1PageModule {}
