import { PieChartService } from './shared/pie-chart.service';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ProfileComponent } from './profile/profile.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RootComponent } from './root/root.component';
import { LoginComponent } from './login/login.component';
import { ROUTING } from './app.routing';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HomeComponent } from './home/home.component';
import { StatisticComponent} from './Statistic/statistic.component'
import { StatiticService } from './shared/statistic.service';
import { SignUpComponent } from './sign-up/sign-up.component';
import { QuizProgramComponent } from './quiz/quiz-program/quiz-program.component';
import { ResultComponent} from './result/result.component';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SignUpService } from './shared/sign-up.service';
import { QuestionCreateComponent } from './quiz/question-create/question-create.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

import { DetailQuizComponent } from './quiz/detail-quiz/detail-quiz.component';
import { DetailQuizService } from './shared/detail-quiz.service';
import { ClasseProgramService} from './shared/classe-program.service'
import { RecapCreationComponent } from './quiz/recap-creation/recap-creation.component';
import { QuestionEditComponent } from './quiz/question-edit/question-edit.component';

import { ClasseProgramComponent } from './class/classe-program/classe-program.component';
import { ClasseComponent } from './class/classe/classe.component';
import { ClasseService} from './shared/classe.service';
import { HomeStudentComponent } from './home-student/home-student.component';
import { SearchClasseComponent } from './class/search-classe/search-classe.component';
import { ClasseListComponent } from './class/classe-list/classe-list.component';

import { UserService } from './shared/user.service';
import { AuthGuard } from './auth/auth.guard';
import { AuthInterceptor } from './auth/auth.interceptor';
import { QuizAnswerComponent } from './quiz/quiz-answer/quiz-answer.component';
import { MaterialModule } from "./material/material.module";
import { ExamCreateComponent } from './exam/exam-create/exam-create.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { RecapExamComponent } from './exam/recap-exam/recap-exam.component';
import { ExamService } from './shared/exam.service';
import { PreviewExamComponent } from './preview/preview-exam/preview-exam.component';
import { PreviewQuizComponent } from './preview/preview-quiz/preview-quiz.component';

import { QuizesService } from './shared/quizes.service';
import { QuestionsService } from './shared/questions.service';
import { ResultTestComponent } from './result-test/result-test.component';
import { ResultService } from './shared/result.services';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ClassOfExamComponent } from './class/class-of-exam/class-of-exam.component';
import { StartExamComponent } from './start-exam/start-exam.component';
import { SubmissionService } from './shared/submission.service';

import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { SondageListComponent } from './poll/sondage-list/sondage-list.component';
import { ExamListStudentComponent } from './exam/exam-list-student/exam-list-student.component';
import { SondageListStudentComponent } from './poll/sondage-list-student/sondage-list-student.component';
import { ClasseListStudentComponent } from './class/classe-list-student/classe-list-student.component';
import { DetailExamComponent } from './exam/detail-exam/detail-exam.component';
import { PollCreateComponent } from './poll/poll-create/poll-create.component';
import { ListStudentsClassComponent } from './class/list-students-class/list-students-class.component';
import { SubmissionOfStudentComponent } from './submission-of-student/submission-of-student.component';
import { ExamOfClassComponent } from './exam/exam-of-class/exam-of-class.component';
import { ResolverForClass } from './class/classe-list/resolver-for-class';

import { ClassOfPollComponent } from './class/class-of-poll/class-of-poll.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { PollAnswerComponent } from './poll/poll-answer/poll-answer.component';
import { PollService } from './shared/poll.service';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ShowListQuizComponent } from './quiz/show-list-quiz/show-list-quiz.component';
registerLocaleData(localeFr, 'fr');

@NgModule({
  declarations: [
    RootComponent,
    LoginComponent,
    HomeComponent,
    StatisticComponent,
    SignUpComponent,
    QuizProgramComponent, 
    NavbarComponent, 
    SidebarComponent, 
    ResultComponent, 
    QuestionCreateComponent,
    ProfileComponent, 
    FooterComponent, 
    DetailQuizComponent, 
    ClasseListComponent,
    ExamListComponent, StartExamComponent, DetailExamComponent, PollCreateComponent,
    RecapCreationComponent, ClasseProgramComponent, ClasseComponent, HomeStudentComponent, SearchClasseComponent, ClasseListComponent, QuizAnswerComponent,QuestionEditComponent, ExamCreateComponent, QuizListComponent, RecapExamComponent, PreviewExamComponent, PreviewQuizComponent, ResultTestComponent, ClassOfExamComponent, ExamListComponent, SondageListComponent, ExamListStudentComponent, SondageListStudentComponent, PieChartComponent, ClasseListStudentComponent, ListStudentsClassComponent, SubmissionOfStudentComponent, ExamOfClassComponent, ClassOfPollComponent, PreloaderComponent, PollAnswerComponent, ShowListQuizComponent

  ],
  imports: [
    BrowserModule,
    ROUTING,
    FormsModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule
  ],

  providers: [{
    provide: HTTP_INTERCEPTORS, 
    useClass: AuthInterceptor,
    multi: true
  },QuizesService,ResolverForClass, PieChartService,QuestionsService,SubmissionService,AuthGuard,UserService,ClasseProgramService,StatiticService,SignUpService, DetailQuizService, ClasseProgramService, ClasseService, ExamService,ResultService,PollService],
  bootstrap: [RootComponent]
})
export class AppModule { }
