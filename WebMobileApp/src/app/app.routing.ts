import { ClasseListStudentComponent } from './class/classe-list-student/classe-list-student.component';
import { SondageListComponent } from './poll/sondage-list/sondage-list.component';
import { ExamListComponent } from './exam/exam-list/exam-list.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { ResultTestComponent } from './result-test/result-test.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ClasseListComponent } from './class/classe-list/classe-list.component';
import { SearchClasseComponent } from './class/search-classe/search-classe.component';
import { HomeStudentComponent } from './home-student/home-student.component';
import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core/src/metadata/ng_module';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { StatisticComponent } from './Statistic/statistic.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { QuizProgramComponent } from './quiz/quiz-program/quiz-program.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { QuestionCreateComponent } from './quiz/question-create/question-create.component';
import { DetailQuizComponent } from './quiz/detail-quiz/detail-quiz.component';
import { ResultComponent } from './result/result.component';
import { RecapCreationComponent } from './quiz/recap-creation/recap-creation.component';
import { QuestionEditComponent } from './quiz/question-edit/question-edit.component';

import { AuthGuard } from './auth/auth.guard';
import { QuizAnswerComponent } from './quiz/quiz-answer/quiz-answer.component';
import { ExamCreateComponent } from './exam/exam-create/exam-create.component';
import { QuizListComponent } from './quiz/quiz-list/quiz-list.component';
import { RecapExamComponent } from './exam/recap-exam/recap-exam.component';
import { PreviewExamComponent } from './preview/preview-exam/preview-exam.component';
import { PreviewQuizComponent } from './preview/preview-quiz/preview-quiz.component';

import { ClassOfExamComponent } from './class/class-of-exam/class-of-exam.component';
import { ExamListStudentComponent } from './exam/exam-list-student/exam-list-student.component';
import { SondageListStudentComponent } from './poll/sondage-list-student/sondage-list-student.component';
import { StartExamComponent } from './start-exam/start-exam.component';
import { DetailExamComponent } from './exam/detail-exam/detail-exam.component';
import { PollCreateComponent } from './poll/poll-create/poll-create.component';
import { ListStudentsClassComponent } from './class/list-students-class/list-students-class.component';
import { SubmissionOfStudentComponent } from './submission-of-student/submission-of-student.component';
import { ExamOfClassComponent } from './exam/exam-of-class/exam-of-class.component';
import { ClassOfPollComponent } from './class/class-of-poll/class-of-poll.component';
import { ResolverForClass } from './class/classe-list/resolver-for-class';
import { PollAnswerComponent } from './poll/poll-answer/poll-answer.component';
import { ShowListQuizComponent } from './quiz/show-list-quiz/show-list-quiz.component';

export const AppRoutes: Routes = [

  
  { path: '', component: LoginComponent },

  {
    path: 'home', component: HomeComponent, data: {
      roles: ['Professeur']
    }, canActivate: [AuthGuard]
  },

  { path: 'statistic', component: StatisticComponent},
  { path: 'sign-up', component: SignUpComponent },
  { path: 'quiz', component: QuizProgramComponent, canActivate: [AuthGuard] },
  {
    path: 'profile', component: ProfileComponent, data: {canActivate: [AuthGuard]
    }
  },
  { path: 'editQuestion', component: QuestionEditComponent, canActivate: [AuthGuard] },
  { path: 'createQuestion', component: QuestionCreateComponent, canActivate: [AuthGuard] },
  { path: 'navbar', component: NavbarComponent, canActivate: [AuthGuard] },
  { path: 'sidebar', component: SidebarComponent, canActivate: [AuthGuard] },

  { path: 'QuizDetails/:id', component: DetailQuizComponent, canActivate: [AuthGuard] },
  { path: 'result', component: ResultComponent, canActivate: [AuthGuard] },
  {
    path: 'home-student', component: HomeStudentComponent, data: {
      roles: ['Etudiant']
    }, canActivate: [AuthGuard]
  },
  {
    path: 'search-classe', component: SearchClasseComponent, canActivate: [AuthGuard], data: {
      roles: ['Etudiant']
    }
  },
  { path: 'classe-list', component: ClasseListComponent, canActivate: [AuthGuard] ,resolve: { classes: ResolverForClass }},
  { path: 'recapitulation', component: RecapCreationComponent, canActivate: [AuthGuard] },
  { path: 'quiz-answer', component: QuizAnswerComponent, canActivate: [AuthGuard] },
  { path: 'exam-create', component: ExamCreateComponent, canActivate: [AuthGuard] },
  { path: 'quiz-list', component: QuizListComponent, canActivate: [AuthGuard] },
  { path: 'exam-recap', component: RecapExamComponent, canActivate: [AuthGuard] },
  { path: 'preview-exam', component: PreviewExamComponent, canActivate: [AuthGuard] },
  { path: 'preview-quiz', component: PreviewQuizComponent, canActivate: [AuthGuard] },

  { path: 'QuizDetails', component: DetailQuizComponent, canActivate: [AuthGuard] },
  { path: 'test-result', component : ResultTestComponent , canActivate: [AuthGuard]},
  { path: 'ClassOfExam', component : ClassOfExamComponent , canActivate: [AuthGuard]},
  { path: 'exam-list', component : ExamListComponent, canActivate: [AuthGuard]},
  { path: 'sondage-list', component : SondageListComponent, canActivate: [AuthGuard]},
  { path: 'exam-list-student', component : ExamListStudentComponent, canActivate: [AuthGuard]},
  { path: 'sondage-list-student', component : SondageListStudentComponent, canActivate: [AuthGuard]},
  { path:'stat', component: PieChartComponent},
  { path:'classe-list-student', component: ClasseListStudentComponent, canActivate: [AuthGuard]}, 
  { path:'start-exam', component : StartExamComponent , canActivate: [AuthGuard]},
  { path: 'ExamDetail', component: DetailExamComponent, canActivate: [AuthGuard] },
  { path: 'poll-create', component: PollCreateComponent, canActivate: [AuthGuard] },
  { path: 'student-list', component: ListStudentsClassComponent, canActivate: [AuthGuard] },
  { path: 'SubmissionOfStudentComponent', component: SubmissionOfStudentComponent, canActivate: [AuthGuard] },
  { path: 'examOfClass-list', component: ExamOfClassComponent, canActivate: [AuthGuard] },
  { path: 'class-of-poll', component: ClassOfPollComponent, canActivate: [AuthGuard] },
  { path: 'myQuizes', component: ShowListQuizComponent, canActivate: [AuthGuard] },
  { path: 'poll-answer', component: PollAnswerComponent, canActivate: [AuthGuard]},
];


export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);
