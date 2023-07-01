function calculateBMI() {
  var heightInput = document.getElementById("height");
  var weightInput = document.getElementById("weight");
  var ageInput = document.getElementById("age");
  var genderInput = document.getElementById("gender");
  var bmiInput = document.getElementById("bmi");
  var weightCategoryInput = document.getElementById("weightCategory");

  var height = parseFloat(heightInput.value);
  var weight = parseFloat(weightInput.value);
  var age = parseInt(ageInput.value);
  var gender = genderInput.value;

  if (height && weight && age && gender) {
    if (age >= 18) {
      // Calculate BMI for adults
      var bmi = weight / ((height / 100) * (height / 100));
      bmiInput.value = bmi.toFixed(2);

      if (bmi < 18.5) {
        weightCategoryInput.value = "Underweight";
      } else if (bmi >= 18.5 && bmi <= 24.9) {
        weightCategoryInput.value = "Normal weight";
      } else if (bmi >= 25.0 && bmi <= 29.9) {
        weightCategoryInput.value = "Overweight";
      } else if (bmi >= 30.0 && bmi <= 34.9) {
        weightCategoryInput.value = "Class 1 Obesity";
      } else if (bmi >= 35.0 && bmi <= 39.9) {
        weightCategoryInput.value = "Class 2 Obesity";
      } else if (bmi >= 40.0) {
        weightCategoryInput.value = "Class 3 (Severe obesity)";
      }
    } else if (age >= 2 && age <= 10) {
      // Calculate BMI for children aged 2-10
      var bmi = weight / ((height / 100) * (height / 100));
      bmiInput.value = bmi.toFixed(2);

      var percentile = getPercentile(age, gender, bmi);

      if (percentile < 5) {
        weightCategoryInput.value = "N/A";
      } else if (percentile >= 5 && percentile < 85) {
        weightCategoryInput.value = "N/A";
      } else if (percentile >= 85 && percentile < 95) {
        weightCategoryInput.value = "N/A";
      } else if (percentile >= 95) {
        weightCategoryInput.value = "N/A";
      }
    } else {
      weightCategoryInput.value = "N/A";
    }
  } else {
    bmiInput.value = "";
    weightCategoryInput.value = "";
  }
}

function getPercentile(age, gender, bmi) {
  // Lookup tables with gender and age-specific percentile ranges for BMI
  // Replace these with your own percentile data or lookup mechanism
  var percentileTable = {
    male: {
      2: { 5: 14.1, 10: 14.8, 25: 15.9, 50: 17.3, 75: 18.6, 85: 19.3, 90: 19.7, 95: 20.2 },
      3: { 5: 13.7, 10: 14.3, 25: 15.4, 50: 16.8, 75: 18.1, 85: 18.8, 90: 19.2, 95: 19.7 },
      4: { 5: 13.4, 10: 14.1, 25: 15.2, 50: 16.5, 75: 17.9, 85: 18.6, 90: 19.0, 95: 19.5 },
      5: { 5: 13.2, 10: 13.9, 25: 15.0, 50: 16.4, 75: 17.7, 85: 18.4, 90: 18.8, 95: 19.3 },
      6: { 5: 13.0, 10: 13.7, 25: 14.8, 50: 16.1, 75: 17.4, 85: 18.1, 90: 18.5, 95: 19.0 },
      7: { 5: 12.8, 10: 13.5, 25: 14.6, 50: 15.9, 75: 17.2, 85: 17.9, 90: 18.3, 95: 18.8 },
      8: { 5: 12.7, 10: 13.3, 25: 14.4, 50: 15.7, 75: 17.0, 85: 17.7, 90: 18.1, 95: 18.6 },
      9: { 5: 12.5, 10: 13.1, 25: 14.2, 50: 15.5, 75: 16.8, 85: 17.5, 90: 17.9, 95: 18.4 },
      10: { 5: 12.4, 10: 13.0, 25: 14.0, 50: 15.3, 75: 16.6, 85: 17.3, 90: 17.7, 95: 18.2 },
      11: { 5: 12.3, 10: 12.8, 25: 13.9, 50: 15.1, 75: 16.4, 85: 17.1, 90: 17.5, 95: 18.0 },
      12: { 5: 12.2, 10: 12.7, 25: 13.7, 50: 15.0, 75: 16.3, 85: 17.0, 90: 17.4, 95: 17.9 },
      13: { 5: 12.1, 10: 12.6, 25: 13.6, 50: 14.8, 75: 16.1, 85: 16.8, 90: 17.2, 95: 17.7 },
      14: { 5: 12.1, 10: 12.5, 25: 13.5, 50: 14.7, 75: 16.0, 85: 16.7, 90: 17.1, 95: 17.6 },
      15: { 5: 12.0, 10: 12.4, 25: 13.4, 50: 14.6, 75: 15.9, 85: 16.6, 90: 17.0, 95: 17.5 },
      16: { 5: 12.0, 10: 12.4, 25: 13.3, 50: 14.5, 75: 15.8, 85: 16.5, 90: 16.9, 95: 17.4 },
      17: { 5: 11.9, 10: 12.3, 25: 13.2, 50: 14.4, 75: 15.7, 85: 16.4, 90: 16.8, 95: 17.3 },
      18: { 5: 11.8, 10: 12.2, 25: 13.1, 50: 14.3, 75: 15.6, 85: 16.3, 90: 16.7, 95: 17.2 },
      19: { 5: 11.8, 10: 12.1, 25: 13.1, 50: 14.2, 75: 15.5, 85: 16.2, 90: 16.6, 95: 17.1 },
      20: { 5: 11.7, 10: 12.0, 25: 13.0, 50: 14.1, 75: 15.4, 85: 16.1, 90: 16.5, 95: 17.0 },
    },
    female: {
      2: { 5: 13.8, 10: 14.6, 25: 15.8, 50: 17.2, 75: 18.5, 85: 19.2, 90: 19.6, 95: 20.2 },
      3: { 5: 13.4, 10: 14.1, 25: 15.3, 50: 16.7, 75: 18.0, 85: 18.7, 90: 19.1, 95: 19.6 },
       4: { 5: 13.1, 10: 13.9, 25: 15.0, 50: 16.4, 75: 17.7, 85: 18.4, 90: 18.8, 95: 19.3 },
       5: { 5: 12.9, 10: 13.6, 25: 14.8, 50: 16.2, 75: 17.5, 85: 18.2, 90: 18.6, 95: 19.1 },
       6: { 5: 12.8, 10: 13.5, 25: 14.6, 50: 16.0, 75: 17.3, 85: 18.0, 90: 18.4, 95: 18.9 },
       7: { 5: 12.7, 10: 13.3, 25: 14.5, 50: 15.9, 75: 17.2, 85: 17.9, 90: 18.3, 95: 18.8 },
       8: { 5: 12.6, 10: 13.2, 25: 14.4, 50: 15.7, 75: 17.0, 85: 17.7, 90: 18.1, 95: 18.6 },
       9: { 5: 12.5, 10: 13.1, 25: 14.3, 50: 15.6, 75: 16.9, 85: 17.6, 90: 18.0, 95: 18.5 },
       10: { 5: 12.4, 10: 13.0, 25: 14.2, 50: 15.5, 75: 16.8, 85: 17.5, 90: 17.9, 95: 18.4 },
       11: { 5: 12.3, 10: 12.9, 25: 14.1, 50: 15.4, 75: 16.7, 85: 17.4, 90: 17.8, 95: 18.3 },
       12: { 5: 12.2, 10: 12.8, 25: 14.0, 50: 15.3, 75: 16.6, 85: 17.3, 90: 17.7, 95: 18.2 },
       13: { 5: 12.1, 10: 12.7, 25: 13.9, 50: 15.2, 75: 16.5, 85: 17.2, 90: 17.6, 95: 18.1 },
       14: { 5: 12.0, 10: 12.6, 25: 13.8, 50: 15.1, 75: 16.4, 85: 17.1, 90: 17.5, 95: 18.0 },
       15: { 5: 11.9, 10: 12.5, 25: 13.7, 50: 15.0, 75: 16.3, 85: 17.0, 90: 17.4, 95: 17.9 },
       16: { 5: 11.9, 10: 12.4, 25: 13.6, 50: 14.9, 75: 16.2, 85: 16.9, 90: 17.3, 95: 17.8 },
       17: { 5: 11.8, 10: 12.4, 25: 13.5, 50: 14.8, 75: 16.1, 85: 16.8, 90: 17.2, 95: 17.7 },
       18: { 5: 11.8, 10: 12.3, 25: 13.4, 50: 14.7, 75: 16.0, 85: 16.7, 90: 17.1, 95: 17.6 },
       19: { 5: 11.7, 10: 12.2, 25: 13.3, 50: 14.6, 75: 15.9, 85: 16.6, 90: 17.0, 95: 17.5 },
       20: { 5: 11.7, 10: 12.1, 25: 13.2, 50: 14.5, 75: 15.8, 85: 16.5, 90: 16.9, 95: 17.4 },
    },
  };

  // Lookup percentile based on gender, age, and BMI
  var percentiles = percentileTable[gender][age];
  if (percentiles) {
    var percentile = Object.keys(percentiles).find((p) => percentiles[p] >= bmi);
    if (percentile) {
      return parseInt(percentile);
    } else {
      return 100; // BMI is equal to or greater than the highest percentile
    }
  } else {
    return 50; // Default to 50th percentile if no data is available for the age and gender
  }
}

