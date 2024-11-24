import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost} from "../controllers/postsController.js";
import cors from "cors";

const corsOptions = {
  origin:"http://localhost:8000",
  optionsSuccessStatus: 200
}

// Configura o armazenamento para arquivos enviados via upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos como 'uploads/'
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

// Cria uma instância do middleware Multer com o armazenamento configurado
const upload = multer({ dest: "./uploads", storage });

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor receba dados no formato JSON
  app.use(express.json());
  app.use(cors(corsOptions))

  // Rota GET para listar todos os posts (provavelmente implementada em postsController.js)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (provavelmente implementada em postsController.js)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem e criação de um novo post (provavelmente implementada em postsController.js)
  // Utiliza o middleware 'upload.single("imagem")' para processar um único arquivo chamado "imagem"
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost)
};

export default routes;