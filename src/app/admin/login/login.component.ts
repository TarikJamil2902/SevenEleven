import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      remember: [false]
    });
  }

  ngOnInit(): void {
    // Check for saved credentials if "remember me" was checked
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      this.loginForm.patchValue({
        username: savedUsername,
        remember: true
      });
    }
  }

  // Valid credentials
  private readonly ADMIN_CREDENTIALS = {
    username: 'admin',
    password: 'admin123' // ⚠️ Real app e password frontend e rakhben na
  };

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    // Simulate API call delay
    setTimeout(() => {
      const { username, password, remember } = this.loginForm.value;

      // Check credentials
      if (
        username === this.ADMIN_CREDENTIALS.username &&
        password === this.ADMIN_CREDENTIALS.password
      ) {
        // ✅ Save login state
        localStorage.setItem('isLoggedIn', 'true');

        // Save username if "Remember me" checked
        if (remember) {
          localStorage.setItem('savedUsername', username);
        } else {
          localStorage.removeItem('savedUsername');
        }

        // ✅ Use Angular Router instead of window.location
        this.router.navigate(['/admin/dashboard']);
      } else {
        this.error = 'Invalid username or password';
      }

      this.isLoading = false;
    }, 500); // Reduced delay for better UX
  }

  get f() {
    return this.loginForm.controls;
  }
}
