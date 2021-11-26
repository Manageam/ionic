export function fetchTip(hba1c) {
  if (hba1c.number == '') {
    return '';
  } else if (
    (hba1c.unit == 'mmol/mol' && Number(hba1c.number) < 42) ||
    ((hba1c.unit == 'percentage' || hba1c.unit == 'percent') &&
      Number(hba1c.number) < 6)
  ) {
    return `Good work`;
  } else if (
    (hba1c.unit == 'mmol/mol' &&
      Number(hba1c.number) >= 42 &&
      Number(hba1c.number) <= 47) ||
    ((hba1c.unit == 'percentage' || hba1c.unit == 'percent') &&
      Number(hba1c.number) >= 6 &&
      Number(hba1c.number) <= 6.4)
  ) {
    return `<ul class="space-y-5 list-disc pl-4">
      <li>
      You blood test shows that you are at risk or developing Diabetes. But you have not developed diabetes yet.
      </li>
      <li>
      You must make changes in your eating habits and increase your physical activity to ensure that you don't develop diabetes in the future.
      </li>
      <li>
      Yearly checkup with you doctor is recommended.
      </li>
      </ul>`;
  } else if (
    (hba1c.unit == 'mmol/mol' && Number(hba1c.number) >= 48) ||
    ((hba1c.unit == 'percentage' || hba1c.unit == 'percent') &&
      Number(hba1c.number) >= 6.5)
  ) {
    return `
      <ul class="space-y-5 list-disc pl-4">
      <li>
      Your blood test shows that your A1C level is of a Diabetic person.
      </li>
      <li>
      Eating habits and lifestyle changes are recommended.
      </li>
      <li>
      See a doctor to see if you need a medication and please make sure you follow up.
      </li>
      <li>
      YOu must aim to bring down your A1C to less than 6.5%[48mmol/mol].
      </li>
      </ul>
      `;
  } else {
    return '';
  }
}

export function fetchBloodSugarTips(bloodSugar) {
  let tip = [];
  if (bloodSugar.unit === 'mmol/L') {
    switch (true) {
      case bloodSugar.value < 4.4:
        tip = [
          'Your blood sugar is Lower than Desired Level.',
          'Please eat or drink a moderate quantity of fast acting carbohydrate such as glucose tablets, sweets, sugary fizzy drinks or fruit juice to bring your sugar level to desired level.',
          'A blood test should be taken after 15-20 minutes to check whether blood sugar is now within desired level.',
          'If your reading is always LOW, talk to your doctor about your medication(s).',
        ];
        break;
      case bloodSugar.value >= 4.4 && bloodSugar.value <= 7.2:
        tip = ['Good Work'];
        break;
      case bloodSugar.value > 7.2:
        tip = [
          'Your blood sugar is Higher than Desired Level.',
          'You should aim to bring your blood sugar down to less than 130mg/dl.',
          'If your number remains high, talk to your doctor about your medications and make sure you are following recommended lifestyle changes.',
        ];
    }
  } else {
    switch (true) {
      case bloodSugar.value < 80:
        tip = [
          'Your blood sugar is Lower than Desired Level.',
          'Please eat or drink a moderate quantity of fast acting carbohydrate such as glucose tablets, sweets, sugary fizzy drinks or fruit juice to bring your sugar level to desired level.',
          'A blood test should be taken after 15-20 minutes to check whether blood sugar is now within desired level.',
          'If your reading is always LOW, talk to your doctor about your medication(s).',
        ];
        break;
      case bloodSugar.value >= 80 && bloodSugar.value <= 130:
        tip = ['Good Work'];
        break;
      case bloodSugar.value > 130:
        tip = [
          'Your blood sugar is Higher than Desired Level.',
          'You should aim to bring your blood sugar down to less than 130mg/dl.',
          'If your number remains high, talk to your doctor about your medications and make sure you are following recommended lifestyle changes.',
        ];
    }
  }

  if (tip.length == 1) return tip[0];

  return `<ul class="space-y-5 list-disc pl-4">${tip
    .map((t) => '<li>' + t + '</li>')
    .join('')}</ul>`;
}

export function fetchBloodPressureTips(upper, lower) {
  let tip;
  switch (true) {
    case upper >= 90 && upper <= 120 && lower >= 60 && lower <= 80:
      tip = ['Good work.'];
      break;
    case upper < 90:
      tip = [
        'Your blood pressure measurement is Lower than Desired Range.',
        'You can also talk to your doctor if you are required to monitor your blood pressure daily from home. ',
        'If you are not on any medication to reduce your blood pressure, talk to your doctor soonest to see if you need medication. ',
        'If you are already on treatment to reduce your blood pressure, continue the medication given to you by your doctor for better results.',
        'Food habits for Low BP:',
        'Increase consumption of fruits and vegetable (banana, apples',
        'Increase consumption of foods rich Omega 3 (Salmon, Mackerel, etc.)',
        'Increase consumption of Fiber foods (Oats, Beans, etc.)',
        'Increase water consumption and a cup of caffeinated beverage.',
        'Reduction in alcohol intake',
      ];
      break;
    case upper > 120 && upper <= 129:
      tip = [
        'Your blood pressure measurement is Elevated.',
        'If your measurements continue to rise, you will need to talk to your doctor about your rising blood pressure and how to monitor it.',

        'Food habits  to reduce risk of High BP:',
        'Reducing salt intake from food and snacks.',
        'Increasing consumption of fruits and vegetables.',
        'Reduction in  alcohol intake.',
      ];
      break;
    case upper >= 130 && upper <= 139:
      tip = [
        'Your blood pressure measurement is Above the Desired Range. ',
        'If your measurements continue to rise you may be at risk of developing hypertension.',
        'If you are not on any medication to reduce your blood pressure, talk to your doctor soonest to see if you need medication. ',
        'If you are already on treatment to reduce your blood pressure, continue the medication given to you by your doctor for better results.',
        'You can also talk to your doctor if you are required to monitor your blood pressure daily from home.  (*Link to BP page in education)',
        'Food habits  to reduce risk of High BP:',
        'Reducing salt intake from food and snacks.',
        'Increasing consumption of fruits and vegetables.',
        'Reduction in  alcohol intake.',
      ];
      break;
    case upper >= 140 && upper <= 159:
      tip = [
        'Your blood pressure measurement is High.',
        'If your measurements continue to rise you may be at risk of developing hypertension.',
        'If you are not on any medication to reduce your blood pressure, talk to your doctor soonest to see which medication is best for you.',
        'If you are already on treatment to reduce your blood pressure, continue the medication given to you by your doctor for better results.',
        'You can also talk to your doctor if you are required to monitor your blood pressure daily from home.',
        'Food habits  to reduce risk of High BP:',
        'Reducing salt intake from food and snacks.',
        'Increasing consumption of fruits and vegetables.',
        'Reduction in  alcohol intake.',
      ];
      break;
    case upper >= 90 && upper <= 120 && lower > 80:
      tip = [
        'Your blood pressure measurement is High.',
        'If your measurements continue to rise you may be at risk of developing hypertension.',
        'If you are not on any medication to reduce your blood pressure, talk to your doctor soonest to see which medication is best for you.',
        'If you are already on treatment to reduce your blood pressure, continue the medication given to you by your doctor for better results.',
        'You can also talk to your doctor if you are required to monitor your blood pressure daily from home.',
        'Food habits  to reduce risk of High BP:',
        'Reducing salt intake from food and snacks.',
        'Increasing consumption of fruits and vegetables.',
        'Reduction in  alcohol intake.',
      ];
      break;
    case upper >= 90 && upper <= 120 && lower < 60:
      tip = [
        'Your blood pressure measurement is Lower than Desired Range.',
        'You can also talk to your doctor if you are required to monitor your blood pressure daily from home. ',
        'If you are not on any medication to reduce your blood pressure, talk to your doctor soonest to see if you need medication. ',
        'If you are already on treatment to reduce your blood pressure, continue the medication given to you by your doctor for better results.',
        'Food habits for Low BP:',
        'Increase consumption of fruits and vegetable (banana, apples',
        'Increase consumption of foods rich Omega 3 (Salmon, Mackerel, etc.)',
        'Increase consumption of Fiber foods (Oats, Beans, etc.)',
        'Increase water consumption and a cup of caffeinated beverage.',
        'Reduction in alcohol intake',
      ];
      break;
    case upper >= 160:
      tip = [
        'Your blood pressure measurement is severely High.',
        'If your measurements continue to rise you may be at risk of developing hypertension.',
        'If you are not on any medication to reduce your blood pressure, talk to your doctor soonest to see which medication is best for you.',
        'If you are already on treatment to reduce your blood pressure, continue the medication given to you by your doctor for better results.',
        'You can also talk to your doctor if you are required to monitor your blood pressure daily from home.',
        'Food habits  to reduce risk of High BP:',
        'Reducing salt intake from food and snacks.',
        'Increasing consumption of fruits and vegetables.',
        'Reduction in  alcohol intake.',
      ];
      break;
    default:
      tip = ['Invalid blood pressure range'];
  }

  if (tip.length == 1) return tip[0];

  return `<ul class="space-y-5 list-disc pl-4">${tip
    .map((t) => '<li>' + t + '</li>')
    .join('')}</ul>`;
}

export function fetchCholesterolTips(unit, value) {
  let tips = [];
  if (String(unit).toLowerCase() === 'mmol/l') {
    switch (true) {
      case value < 5.2:
        tips = ['Good work.'];
        break;
      case value >= 5.2 && value < 6.3:
        tips = [
          'Total cholesterol in your blood is Borderline High.',
          'Talk to your doctor on how to reduce it. Start by making lifestyle changes and maintain a healthy diet.',
          'Educate yourself on how to manage cholesterol.',
        ];
        break;
      case value >= 6.3:
        tips = [
          'Total cholesterol in your blood is High.',
          'Talk to your doctor on how to reduce it. Start by making lifestyle changes and maintain a healthy diet.',
          'Educate yourself on how to manage cholesterol.',
        ];
        break;
    }
    return false;
  }

  switch (true) {
    case value < 200:
      tips = ['Good work.'];
      break;
    case value >= 200 && value < 240:
      tips = [
        'Total cholesterol in your blood is Borderline High.',
        'Talk to your doctor on how to reduce it. Start by making lifestyle changes and maintain a healthy diet.',
        'Educate yourself on how to manage cholesterol.',
      ];
      break;
    case value >= 240:
      tips = [
        'Total cholesterol in your blood is High.',
        'Talk to your doctor on how to reduce it. Start by making lifestyle changes and maintain a healthy diet.',
        'Educate yourself on how to manage cholesterol.',
      ];
      break;
  }

  if (tips.length == 1) return tips[0];

  return `<ul class="space-y-5 list-disc pl-4">${tips
    .map((t) => '<li>' + t + '</li>')
    .join('')}</ul>`;
}

export function fetchBMI(value) {
  let tips = [];
  switch (true) {
    case value < 18.5:
      tips = [
        'Your BMI is Below Normal.',
        'This may suggest lack of sufficient nutrients in your diet.',
        'Change your food habits to make sure you are consuming enough calories and keep a healthy diet plan.',
      ];
      break;
    case value >= 18.5 && value <= 24.9:
      tips = ['Good work.'];
      break;
    case value >= 25 && value < 30:
      tips = [
        'Your BMI is of an Overweight Person.',
        'This is a risk factor for developing diabetes and other medical conditions.',
        'Change your eating habits and increase physical activity.',
        'Educate yourself on weight management',
      ];
      break;
    case value >= 30:
      tips = [
        'Your BMI is of an Obese Person.',
        'This is a risk factor for developing diabetes and other medical conditions.',
        'Change your eating habits and increase physical activity.',
        'Educate yourself on weight management',
      ];
      break;
  }

  if (tips.length == 1) return tips[0];

  return `<ul class="space-y-5 list-disc pl-4">${tips
    .map((t) => '<li>' + t + '</li>')
    .join('')}</ul>`;
}

export function checkHealthStatus(status) {
  switch (status) {
    case 1:
      return 'Diabetes';
    case 2:
      return 'High Blood Pressure';
    case 3:
      return 'Pre-diabetic';
    case 4:
      return 'Diabetes and HBP';
  }
}

export function calorieCounter(value, type) {
  if (type == 'Breakfast') {
    switch (true) {
      case value < 450:
        return {
          state: 'Good',
          color: 'green',
          percentage: calculateDiabeticPercentage(value),
        };
      case value >= 450 && value < 500:
        return {
          state: 'Fair',
          color: 'yellow',
          percentage: calculateDiabeticPercentage(value),
        };
      case value > 500:
        return {
          state: 'Poor',
          color: 'red',
          percentage: calculateDiabeticPercentage(value),
        };
    }
  }

  if (type == 'Lunch') {
    switch (true) {
      case value < 500:
        return {
          state: 'Good',
          color: 'green',
          percentage: calculateDiabeticPercentage(value),
        };
      case value >= 500 && value < 600:
        return {
          state: 'Fair',
          color: 'orange',
          percentage: calculateDiabeticPercentage(value),
        };
      case value > 600:
        return {
          state: 'Poor',
          color: 'red',
          percentage: calculateDiabeticPercentage(value),
        };
    }
  }

  if (type == 'Dinner') {
    switch (true) {
      case value < 500:
        return {
          state: 'Good',
          color: 'green',
          percentage: calculateDiabeticPercentage(value),
        };
      case value >= 500 && value < 550:
        return {
          state: 'Fair',
          color: 'orange',
          percentage: calculateDiabeticPercentage(value),
        };
      case value > 550:
        return {
          state: 'Poor',
          color: 'red',
          percentage: calculateDiabeticPercentage(value),
        };
    }
  }

  if (type == 'Snack') {
    switch (true) {
      case value < 150:
        return {
          state: 'Good',
          color: 'green',
          percentage: calculateDiabeticPercentage(value),
        };
      case value >= 150 && value < 200:
        return {
          state: 'Fair',
          color: 'orange',
          percentage: calculateDiabeticPercentage(value),
        };
      case value > 200:
        return {
          state: 'Poor',
          color: 'red',
          percentage: calculateDiabeticPercentage(value),
        };
    }
  }
}

export function calculateDiabeticPercentage(value) {
  return ((value / 1600) * 100) / 100;
}
