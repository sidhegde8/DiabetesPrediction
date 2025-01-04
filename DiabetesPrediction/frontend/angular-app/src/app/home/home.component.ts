import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngForm
import { ApiService } from '../services/api.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { ChartComponent } from '../chart/chart.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, ChartComponent], // Add CommonModule and FormsModule
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  animations: [
    // Fade-in animation for prediction result and error message
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })), // Initial state (hidden)
      transition(':enter', [
        animate('500ms ease-in', style({ opacity: 1 })) // Animate to visible
      ])
    ]),
    // Scale-up animation for the radial gauge chart
    trigger('scaleUp', [
      state('void', style({ transform: 'scale(0)' })), // Initial state (scaled down)
      transition(':enter', [
        animate('500ms ease-in', style({ transform: 'scale(1)' })) // Animate to full size
      ])
    ])
  ]
})
export class HomeComponent {
  prediction: number | null = null; // Store the prediction result (0 or 1)
  error: string | null = null; // Store any error messages
  riskLevel: number = 0; // Store the risk level for the radial gauge

  constructor(private apiService: ApiService) {}

  onSubmit(formData: any) {
    // Prepare the data to send to the Flask backend
    const data = {
      Pregnancies: formData.Pregnancies,
      Glucose: formData.Glucose,
      BloodPressure: formData.BloodPressure,
      SkinThickness: formData.SkinThickness,
      Insulin: formData.Insulin,
      BMI: formData.BMI,
      DiabetesPedigreeFunction: formData.DiabetesPedigreeFunction,
      Age: formData.Age
    };
  
    console.log('Data being sent to Flask:', data); // Log the data
  
    // Call the Flask backend API
    this.apiService.predictDiabetes(data).subscribe(
      (response: any) => {
        // Handle successful response
        this.prediction = response.prediction; // Store the prediction result
        this.error = null; // Clear any previous errors
  
        // Calculate risk level for the radial gauge
        this.riskLevel = this.prediction === 1 ? 75 : 25; // Example: 75% for high risk, 25% for low risk
      },
      (error: any) => {
        // Handle errors
        console.error('Error from Flask backend:', error); // Log the error
        this.error = error.error.error || 'An error occurred.'; // Store the error message
        this.prediction = null; // Clear the prediction result
        this.riskLevel = 0; // Reset risk level
      }
    );
  }
}