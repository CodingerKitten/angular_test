import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-forget-password',
  standalone: true,
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss']
})
export class ForgetPasswordComponent {
  username = new FormControl('', [Validators.required]);

  constructor(private router: Router, private userService: UserService) {}

  onSubmit() {
    if (this.username.valid) {
      if (this.username.value !== null) {
        this.userService.forgetPassword(this.username.value).subscribe({
          next: (response: any) => {
        console.log('Password reset successful:', response);
        this.router.navigate(['/login']); 
          },
          error: (error: any) => {
        console.error('Reset password failed:', error);
          }
        });
      } else {
        console.error('Username is null');
      }
    } else {
      console.error('Form is invalid');
    }
  }
}