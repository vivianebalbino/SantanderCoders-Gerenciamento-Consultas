import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Necessário para standalone components
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required]),
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      this.authService.login(email, password).subscribe({
        next: (response: any) => {
          this.authService.setUserData(response.token, response.user.role);
          this.router.navigate(['/dashboard']);
        },
        error: (err) => {
          this.errorMessage = 'Erro ao fazer login! Verifique suas credenciais.';
        },
      });
    } else {
      this.errorMessage = 'Preencha todos os campos corretamente.';
    }
  }
}
