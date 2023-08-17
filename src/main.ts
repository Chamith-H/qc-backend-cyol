import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NoEmptyValuesPipe } from './configs/pipes/dto-validater.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.enableCors();
  app.useGlobalPipes(new NoEmptyValuesPipe())
  await app.listen(8080);
}
bootstrap();
