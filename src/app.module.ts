import { Module } from '@nestjs/common';
import { controllers } from 'src/controllers';
import { FilterProvider, ServiceProvider } from 'src/providers'


@Module({
  imports: [],
  controllers: [...controllers],
  providers: [...FilterProvider, ...ServiceProvider],
})
export class AppModule { }




