// 🔹 Verifier permissions
export const canVerify = (role, status) => {
  return role === "VERIFIER" && status === "SUBMITTED";
};

export const canReject = (role, status) => {
  return role === "VERIFIER" && status === "SUBMITTED";
};

// 🔹 Manager permissions
export const canActivate = (role, status) => {
  return role === "MANAGER" && status === "VERIFIED";
};

export const canManagerReject = (role, status) => {
  return role === "MANAGER" && status === "VERIFIED";
};

// 🔹 UI control permissions
export const canAddCustomer = (role) => {
  return role === "REPRESENTATIVE" || role === "ADMIN";
};

export const canEditCustomer = (role) => {
  return role === "ADMIN";
};

export const canViewCustomer = (role) => {
  return (
    role === "ADMIN" ||
    role === "REPRESENTATIVE" ||
    role === "VERIFIER" ||
    role === "MANAGER"
  );
};