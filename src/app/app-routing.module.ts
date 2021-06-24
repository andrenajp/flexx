import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard  as AuthGuard} from './Guard/auth-guard.guard';
import { LoginGuardGuard as LogGuard } from './Guard/login-guard.guard';
import { ChatGuardGuard as ChatGuard } from './Guard/chat-guard.guard';
const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'first-page',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'register',
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule)
  },
  {
    path: 'forgot-password',
    loadChildren: () => import('./forgot-password/forgot-password.module').then(m => m.ForgotPasswordPageModule)
  },
  {
    path: 'verifaction',
    loadChildren: () => import('./verifaction/verifaction.module').then(m => m.VerifactionPageModule)
  },
  {
    path: 'change-password',
    loadChildren: () => import('./change-password/change-password.module').then(m => m.ChangePasswordPageModule)
  },
  {
    path: 'tabs',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'search-layout',
    loadChildren: () => import('./search-layout/search-layout.module').then(m => m.SearchLayoutPageModule)
  },
  {
    path: 'appointment',
    loadChildren: () => import('./appointment/appointment.module').then(m => m.AppointmentPageModule)
  },
  {
    path: 'profile',
    canActivate:[AuthGuard],
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule)
  },
  {
    path: 'appointment-detail',
    loadChildren: () => import('./appointment-detail/appointment-detail.module').then(m => m.AppointmentDetailPageModule)
  },
  {
    path: 'salon-profile',
    loadChildren: () => import('./salon-profile/salon-profile.module').then(m => m.SalonProfilePageModule)
  },
  {
    path: 'payment',
    loadChildren: () => import('./payment/payment.module').then(m => m.PaymentPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'privacy-policy',
    loadChildren: () => import('./privacy-policy/privacy-policy.module').then(m => m.PrivacyPolicyPageModule)
  },
  {
    path: 'terms-condition',
    loadChildren: () => import('./terms-condition/terms-condition.module').then(m => m.TermsConditionPageModule)
  },

  {
    path: 'edit-profile',
    loadChildren: () => import('./edit-profile/edit-profile.module').then(m => m.EditProfilePageModule)
  },
  {
    path: 'booking-success',
    loadChildren: () => import('./booking-success/booking-success.module').then(m => m.BookingSuccessPageModule)
  },
  {
    path: 'date-time',
    loadChildren: () => import('./date-time/date-time.module').then(m => m.DateTimePageModule)
  },
  {
    path: 'set-location',
    loadChildren: () => import('./set-location/set-location.module').then(m => m.SetLocationPageModule)
  },
  {
    path: 'barbeur-profile',
    loadChildren: () => import('./barbeur-profile/barbeur-profile.module').then( m => m.BarbeurProfilePageModule)
  },
  {
    path: 'profile-image',
    loadChildren: () => import('./profile-image/profile-image.module').then( m => m.ProfileImagePageModule)
  },
  {
    path: 'success',
    loadChildren: () => import('./success/success.module').then( m => m.SuccessPageModule)
  },
  {
    path: 'cancel',
    loadChildren: () => import('./cancel/cancel.module').then( m => m.CancelPageModule)
  },
  {
    path: 'address',
    loadChildren: () => import('./address/address.module').then( m => m.AddressPageModule)
  },
  {
    path: 'choose',
    loadChildren: () => import('./choose/choose.module').then( m => m.ChoosePageModule)
  },
  {
    path: 'cancel-appointment',
    loadChildren: () => import('./cancel-appointment/cancel-appointment.module').then( m => m.CancelAppointmentPageModule)
  },
  {
    path: 'hour',
    loadChildren: () => import('./hour/hour.module').then( m => m.HourPageModule)
  },
  {
    path: 'day',
    loadChildren: () => import('./day/day.module').then( m => m.DayPageModule)
  },
  {
    path: 'first-page',
    canActivate:[LogGuard],
    loadChildren: () => import('./first-page/first-page.module').then( m => m.FirstPagePageModule)
  },
  {
    path: 'chat',
    canActivate:[ChatGuard],
    loadChildren: () => import('./chat/chat.module').then( m => m.ChatPageModule)
  },
  {
    path: 'open-with',
    loadChildren: () => import('./open-with/open-with.module').then( m => m.OpenWithPageModule)
  },




  // {
  //   path: 'location',
  //   loadChildren: () => import('./location/location.module').then( m => m.LocationPageModule)
  // },
  // {
  //   path: 'direction',
  //   loadChildren: () => import('./direction/direction.module').then( m => m.DirectionPageModule)
  // },
  // {
  //   path: 'language',
  //   loadChildren: () => import('./language/language.module').then( m => m.LanguagePageModule)
  // },
  // {
  //   path: 'sharing',
  //   loadChildren: () => import('./sharing/sharing.module').then( m => m.SharingPageModule)
  // },
  // {
  //   path: 'give-rating',
  //   loadChildren: () => import('./give-rating/give-rating.module').then( m => m.GiveRatingPageModule)
  // },
  // {
  //   path: 'filter',
  //   loadChildren: () => import('./filter/filter.module').then( m => m.FilterPageModule)
  // },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, relativeLinkResolution: 'legacy' })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
