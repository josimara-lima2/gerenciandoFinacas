export function maskNumber(
  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  e.currentTarget.maxLength = 19;

  let v = e.currentTarget.value;
  v = v.replace(/\D/g, '');
  v = v.replace(/^(\d{4})(\d)/g, '$1 $2');
  v = v.replace(/^(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3');
  v = v.replace(/^(\d{4})\s(\d{4})\s(\d{4})(\d)/g, '$1 $2 $3 $4');

  return v;
}

export function maskCode(
  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  e.currentTarget.maxLength = 3;
  let v = e.currentTarget.value;
  v = v.replace(/\D/g, '');

  return v;
}

export function maskValue(
  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  let v = e.currentTarget.value;
  v = v.replace(/\D/g, '');

  return +v;
}

export function maskFatura(
  e: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>,
) {
  e.currentTarget.maxLength = 2;
  let v = e.currentTarget.value;
  v = v.replace(/\D/g, '');

  return +v;
}
