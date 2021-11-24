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
