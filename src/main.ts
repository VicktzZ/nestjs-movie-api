import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT;

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
    }),
  );

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Catálogo de Filmes')
    .setDescription(
      `Esta é a documentação da RESTful API de Catálogo de Filmes, uma API simples documentada com Swagger e desenvolvida para um desafio backend. Tecnologias utilizadas:
      \n- **TypeScript** (Linguagem);
      \n- **Nestjs** (Backend Framework);
      \n- **TypeORM** (Tipagem);
      \n- **Swagger** (UI);
      \n- **Class Validator** (Validação de dados);
      \n- **Docker** (Containerize);
      \n- **Redis** (Cache);
      \n- **Bcrypt** (Criptografação de dados);
      \n- **Fakerjs** (Criação de dados fictícios);
      \n- **PostgreSQL** (Banco de dados);
      \n- **Supabase** (Deploy do banco de dados).\n
      \nTodos endpoints e seus métodos são protegidos e precisam de autenticação do usuário para serem acessadas. Os usuários possuem uma das possíveis funções:
      \n- **User** (Usuário comum);
      \n- **Admin** (Usuário administrador).
      \nVocê pode acessar os endpoins post-user/create_random ou post-movie/create_random para preencher o banco de dados com informações fictícias.
      \n**Usuário Admin padrão:**
      \n**email: admin@api.com**
      \n**senha: Admin123**
      `,
    )
    .setContact(
      'Vitor Santos',
      'https://vitordev-one.vercel.app',
      'victorhugo220br@gmail.com',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  app.enableCors({
    credentials: true,
    origin: 'http://nest-js-movie-api.vercel.app',
  });

  await app.listen(PORT || 3000);
}
bootstrap();
