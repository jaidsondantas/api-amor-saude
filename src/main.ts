import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    allowedHeaders: '*',
    origin: '*',
  });

  const config = new DocumentBuilder()
    .setTitle('Amor e Saude Desafio')
    .setDescription('Desafio amor e saude feito por Jaidson Dantas')
    .setVersion('1.0')
    .addBearerAuth({ type: undefined, scheme: '{{token}}' })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}

bootstrap();
