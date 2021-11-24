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
