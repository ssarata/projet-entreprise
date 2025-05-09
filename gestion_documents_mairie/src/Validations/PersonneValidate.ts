export default function PersonneValidate(data) {
    const handler = {
      set(target, prop, value) {
        if (prop === "nom") {
          if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > 50) {
            throw new Error("Le nom doit être une chaîne contenant entre 2 et 50 caractères.");
          }
        }
  
        if (prop === "prenom") {
          if (typeof value !== "string" || value.trim().length < 2 || value.trim().length > 50) {
            throw new Error("Le prénom doit être une chaîne contenant entre 2 et 50 caractères.");
          }
        }
  
        if (prop === "age") {
          if (typeof value !== "number" || value < 0 || value > 120) {
            throw new Error("L'âge doit être un nombre entre 0 et 120.");
          }
        }
  
        if (prop === "email") {
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          if (value && (typeof value !== "string" || !emailRegex.test(value))) {
            throw new Error("L'email doit être valide.");
          }
        }
  
        target[prop] = value;
        return true;
      }
    };
  
    return new Proxy(data, handler);
  }