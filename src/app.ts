import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import Controller from './controllers/Controller';

class App {
  public app: express.Application;

  public constructor(controllers: Controller[]) {
    this.app = express();
    this.app.use(cors());

    this.initMongoose();
    this.connectDatabase();
    this.initExpressJson();
    this.initControllers(controllers);
  }

  private async connectDatabase(): Promise<void> {
    await mongoose
      .connect(
        'mongodb+srv://devpgm:DevPgm2020@cluster0.6sege.mongodb.net/curso-javascript?retryWrites=true&w=majority',
        {
          useCreateIndex: true,
          useFindAndModify: false,
          useNewUrlParser: true,
          useUnifiedTopology: true,
        }
      )
      .then(() => console.log('Conexão com o BD inicializada.'))
      .catch((erro) => console.log('Erro ao conectar DB', erro));
  }

  private initMongoose(): void {
    mongoose.set('runValidators', true);
  }

  private initExpressJson(): void {
    this.app.use(express.json());
  }

  private initControllers(controllers: Controller[]): void {
    controllers.forEach((controller) => {
      this.app.use('/', controller.router);
    });
  }

  public listen(port: number): void {
    this.app.listen(port, () => {
      console.log(`Aplicação iniciada na porta: ${port}`);
    });
  }
}

export default App;
