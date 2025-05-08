// export default function DocumentValidate(data) {
//     const handler = {
//       set(target, prop, value) {
//         if (prop === "date") {
//           // Vérifie que c'est une chaîne de caractères non vide avec au moins 3 lettres (hors espaces)
//           if (typeof value !== "string" || value.trim().replace(/[^a-zA-Z]/g, "").length < 3) {
//             throw new Error("Le type du document doit être une chaîne contenant au moins 3 lettres.");
//           }
//         }
  
//         target[prop] = value;
//         return true;
//       }
//     };
  
//     return new Proxy(data, handler);
//   }
  