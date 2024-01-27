import { Component } from '@angular/core';
import { RecipesService } from '../../services/recipes.service';
import { Meal } from '../../interfaces/meal';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ContactService } from '../../services/contact.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss'
})
export class MainPageComponent {
  meals: Meal[] = [];
  Masseg: any;
  errorMasseg: any;

  constructor(private _RecipesService: RecipesService, private _ContactService: ContactService, private _FormBuilder: FormBuilder, private _ToastrService: ToastrService) { }


  contactForm: FormGroup = this._FormBuilder.group({
    name: ['', [Validators.required, Validators.maxLength(20), Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]]
    // password: ['', [Validators.required, Validators.pattern(/^\w{6,}$/)]]
  })




  handleForm(): void {
    if (this.contactForm.valid) {
      const userData = this.contactForm.value;
      // this.isLoading = true;

      this._ContactService.contactUs(userData).subscribe({
        next: (response) => {
          console.log(response.message)
          // this.Masseg = response.message;
          this._ToastrService.success(response.message);
          // if (response.message === "success") {
          //   // this._Router.navigate(['/login']);
          //   // this.isLoading = false;

          // }
        },
        error: (error) => {
          console.log(error)
          // this.errorMasseg = error.error.message;
          this.errorMasseg = 're-enter your data correctly';
          this._ToastrService.warning('re-enter your data correctly');
        }
      }
      );
    }
  }






  ngOnInit(): void {
    this._RecipesService.getRecipes().subscribe({
      next: (response) => {
        console.log(response.meals)
        console.log(response)
        this.meals = response.meals;
        console.log(this.meals);
        // this.dataInfo = response.data;
      }
    })
  }





}
