import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { MainComponent } from './main.component';
import { MonthsComponent } from './components/months/months.component';
import { ListDetailComponent } from './components/months/list-detail/list-detail.component';
import { OverViewComponent } from './components/months/over-view/over-view.component';
import { MomentModule } from 'ngx-moment';
import { SidebarComponent } from 'src/app/components/sidebar/sidebar.component';
import { BotonCrearComponent } from './components/months/boton-crear/boton-crear.component';
import { MonthDetailComponent } from './components/months/month-detail/month-detail.component';
import { AddAmountBaseComponent } from './components/months/add-amount-base/add-amount-base.component';
import { ChartMonthComponent } from './components/months/chart-month/chart-month.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CategoryDetailComponent } from './components/months/category-detail/category-detail.component';
import { DownloadAmountBaseComponent } from './components/months/download-amount-base/download-amount-base.component';
import { ChartDifferenceComponent } from './components/months/chart-difference/chart-difference.component';
import { ProfileComponent } from './components/profile/profile.component';
import { StocksComponent } from './components/stocks/stocks.component';
import { StockDetailComponent } from './components/stocks/stock-detail/stock-detail.component';
import { StockSuscribeComponent } from './components/stocks/stock-suscribe/stock-suscribe.component';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { ForumComponent } from './components/forum/forum.component';
import { PostDetailComponent } from './components/forum/post-detail/post-detail.component';
import { PostCommentComponent } from './components/forum/post-comment/post-comment.component';
import { LikeButtonComponent } from './components/forum/like-button/like-button.component';
import { PostCommentDetailComponent } from './components/forum/post-comment-detail/post-comment-detail.component';
import { DeleteButtonComponent } from './components/forum/delete-button/delete-button.component';
import { TagsPostComponent } from './components/forum/tags-post/tags-post.component';
import { UserProfileComponent } from './components/forum/user-profile/user-profile.component';
// PrimeNG
import { TableModule } from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {InputTextModule} from 'primeng/inputtext';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import {SkeletonModule} from 'primeng/skeleton';
import { AnalysisComponent } from './components/months/analysis/analysis.component';
import {AvatarModule} from 'primeng/avatar';
import {AvatarGroupModule} from 'primeng/avatargroup';
import { PostListComponent } from './components/forum/post-list/post-list.component';
import { CreatePostComponent } from './components/forum/create-post/create-post.component';
import {EditorModule} from 'primeng/editor';
import {TimelineModule} from 'primeng/timeline';
import { CardModule } from "primeng/card";
// Pipes
import { SafeHtmlPipe } from '../../pipe/safe-html.pipe';
import { AtUserPipe } from '../../pipe/at-user.pipe';
import { TagsDetailComponent } from './components/forum/tags-detail/tags-detail.component';
import { StockTutorialComponent } from './components/stocks/stock-tutorial/stock-tutorial.component';
import { PostListSkeletonComponent } from './components/forum/post-list/post-list-skeleton/post-list-skeleton.component';

import {RoundProgressModule} from 'angular-svg-round-progressbar';
import { PostRecommendationSkeletonComponent } from './components/forum/post-detail/post-recommendation-skeleton/post-recommendation-skeleton.component';
import { TopContributorsComponent } from './components/forum/top-contributors/top-contributors.component';


@NgModule({
  declarations: [
    MainComponent,
    MonthsComponent,
    ListDetailComponent,
    OverViewComponent,
    SidebarComponent,
    BotonCrearComponent,
    MonthDetailComponent,
    AddAmountBaseComponent,
    ChartMonthComponent,
    CategoryDetailComponent,
    DownloadAmountBaseComponent,
    ChartDifferenceComponent,
    ProfileComponent,
    StocksComponent,
    StockDetailComponent,
    StockSuscribeComponent,
    ForumComponent,
    PostDetailComponent,
    PostCommentComponent,
    LikeButtonComponent,
    PostCommentDetailComponent,
    AnalysisComponent,
    PostListComponent,
    CreatePostComponent,
    SafeHtmlPipe,
    DeleteButtonComponent,
    TagsPostComponent,
    AtUserPipe,
    UserProfileComponent,
    TagsDetailComponent,
    StockTutorialComponent,
    PostListSkeletonComponent,
    PostRecommendationSkeletonComponent,
    TopContributorsComponent,
  ],
  imports: [
    CommonModule,
    MainRoutingModule,
    MomentModule,
    FormsModule,
    ReactiveFormsModule,
    NgxChartsModule,
    NgxSkeletonLoaderModule,
    TableModule,    
    ButtonModule,
    InputTextModule,
    ConfirmDialogModule,
    SkeletonModule,
    AvatarModule,
    AvatarGroupModule,
    EditorModule,
    TimelineModule,
    CardModule,
    RoundProgressModule
  ],
  providers: [
    ConfirmationService
  ]
})
export class MainModule { }
