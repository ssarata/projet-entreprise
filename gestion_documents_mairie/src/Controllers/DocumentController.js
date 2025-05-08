
import {
    HTTP_200_OK,
    HTTP_201_CREATE,
    HTTP_500_INTERNAL_SERVER_ERROR,
    HTTP_404_NOT_FOUND  } from "../Constantes/httpStatus.js";
import DocumentService from "../Services/DocumentService.js";

export  class DocumentController {


     documentService ;
      constructor() {
        this.documentService = new DocumentService();
      }
    // Récupérer tous les documents
     async getAllDocuments(req, res) {
        try {
            const documents = await this.documentService.getAllDocuments();
            res.status(HTTP_200_OK).json(documents);
        } catch (error) {
            res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    // Récupérer un document par ID
     async getDocumentById(req, res) {
        try {
            const id = parseInt(req.params.id);
            const document = await this.documentService.getDocumentById(id);
            if (!document) {
                return res.status(HTTP_404_NOT_FOUND).json({ message: 'Document not found' });
            }
            res.status(HTTP_200_OK).json(document);
        } catch (error) {
            res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    // Créer un nouveau document
     async createDocument(req, res) {
        try {
            const documentData = req.body;
         //   documentData.date = new Date();
            const newDocument = await this.documentService.addDocument(documentData);
            res.status(HTTP_201_CREATE).json(newDocument);
        } catch (error) {
            console.log(error);
            

            res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    // Mettre à jour un document
     async updateDocument(req, res) {
        try {
            const id = parseInt(req.params.id);
            const documentData = req.body;

            const updatedDocument = await this.documentService.updateDocument(id, documentData);
            if (!updatedDocument) {
                return res.status(HTTP_404_NOT_FOUND).json({ message: 'Document not found' });
            }
            res.status(HTTP_200_OK).json(updatedDocument);
        } catch (error) {
            console.log(error);
            
            res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }

    // Supprimer un document
     async deleteDocument(req, res) {
        try {
            const id = parseInt(req.params.id);
            const deleted = await this.documentService.deleteDocument(id);
            if (!deleted) {
                return res.status(HTTP_404_NOT_FOUND).json({ message: 'Document not found' });
            }
            res.status(HTTP_200_OK).json({ message: 'Document deleted successfully' });
        } catch (error) {
            res.status(HTTP_500_INTERNAL_SERVER_ERROR).json({ error: error.message });
        }
    }
}

