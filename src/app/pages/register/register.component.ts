import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  standalone: true,
  selector: 'app-register',
  templateUrl: './register.component.html',
  imports: [ReactiveFormsModule, CommonModule],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(private authService: AuthService, private router: Router) {
    this.registerForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
      role: new FormControl('USER', [Validators.required]),
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { name, email, password, role } = this.registerForm.value; 
      this.authService.register(name, email, password, role).subscribe({
        next: () => {
          alert('Cadastro realizado com sucesso!');
          this.router.navigate(['/login']);
        },
        error: () => alert('Erro ao realizar cadastro!'),
      });
    } else {
      alert('Preencha todos os campos corretamente!');
    }
  }
}
