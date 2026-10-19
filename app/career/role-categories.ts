export function roleCategory(role: string): string {
  if (role === "Talent Buyer / Marketing Manager" || role === "Marketing Manager") {
    return "Talent Buying / Marketing";
  }

  if (role === "Staffing" || role === "Staffing Manager") {
    return "Staffing / Staffing Management";
  }

  return role;
}
