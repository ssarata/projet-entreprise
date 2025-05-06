import UserValidate from '../Validations/UserValidate.js';
import userService from '../Services/userService.js';
import { HTTP_200_OK, HTTP_201_CREATE, HTTP_400_BAD_REQUEST, HTTP_500_INTERNAL_SERVER_ERROR } from '../Constantes/httpStatus.js';

export class UserController {
  async register(req, res) {
    const data = req.body;

    try {
      // Validation des données utilisateur
      const validatedUser = UserValidate(data);
      validatedUser.username = data.username;
      validatedUser.email = data.email;
      validatedUser.password = data.password;

      // Appel au service pour enregistrer l'utilisateur
      const user = await userService.register(validatedUser);
      res.status(HTTP_201_CREATE).json(user);
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement de l\'utilisateur :', error);
      res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
    }
  }

  async login(req, res) {
    const { email, password } = req.body;

    try {
      // Appel au service pour authentifier l'utilisateur
      const { token, user } = await userService.login(email, password);
      res.status(HTTP_200_OK).json({ token, user });
    } catch (error) {
      console.error('Erreur lors de la connexion :', error);
      res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
    }
  }

  async findAll(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(HTTP_200_OK).json(users);
    } catch (error) {
      console.error('Erreur lors de la récupération des utilisateurs :', error);
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async findById(req, res) {
    const id = parseInt(req.params.id);

    try {
      const user = await userService.getUserById(id);
      if (!user) {
        return res.status(404).json({ error: 'Utilisateur non trouvé' });
      }
      res.status(HTTP_200_OK).json(user);
    } catch (error) {
      console.error('Erreur lors de la récupération de l\'utilisateur :', error);
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }

  async update(req, res) {
    const id = parseInt(req.params.id);
    const data = req.body;

    try {
      // Validation des données utilisateur
      const validatedUser = UserValidate(data);
      validatedUser.username = data.username;
      validatedUser.email = data.email;
      validatedUser.password = data.password;

      // Appel au service pour mettre à jour l'utilisateur
      const user = await userService.updateUser(id, validatedUser);
      res.status(HTTP_200_OK).json(user);
    } catch (error) {
      console.error('Erreur lors de la mise à jour de l\'utilisateur :', error);
      res.status(HTTP_400_BAD_REQUEST).json({ error: error.message });
    }
  }

  async delete(req, res) {
    const id = parseInt(req.params.id);

    try {
      await userService.deleteUser(id);
      res.status(204).send(); // Pas de contenu, suppression réussie
    } catch (error) {
      console.error('Erreur lors de la suppression de l\'utilisateur :', error);
      res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
    }
  }
}