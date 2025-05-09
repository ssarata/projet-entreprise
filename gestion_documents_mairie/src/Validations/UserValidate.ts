export default function UserValidate(data) {
    const handler = {
      set(target, prop, value) {
        if (prop === "username") {
          if (typeof value !== "string" || value.trim().length < 3 || value.trim().length > 30) {
            throw new Error("Le nom d'utilisateur doit être une chaîne contenant entre 3 et 30 caractères.");
          }
        }
  
        if (prop === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (typeof value !== "string" || !emailRegex.test(value)) {
            throw new Error("L'email doit être valide.");
          }
        }
  
        if (prop === "password") {
          if (typeof value !== "string" || value.length < 8) {
            throw new Error("Le mot de passe doit contenir au moins 8 caractères.");
          }
        }
  
        target[prop] = value;
        return true;
      }
    };
  
    return new Proxy(data, handler);
  }