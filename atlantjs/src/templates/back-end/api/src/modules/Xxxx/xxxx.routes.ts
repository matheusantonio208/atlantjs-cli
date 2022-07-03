import { Router } from 'express';
import Xxxx from './xxxx.controller';

export default function routes(
  route: Router,
  baseUrl: string,
  middleware?: any,
): void {
  route.post(`${baseUrl}/store`, Xxxx.store);
  route.get(`${baseUrl}/index/:id`, Xxxx.index);
  route.get(`${baseUrl}/show`, Xxxx.show);
  route.delete(`${baseUrl}/delete/:id`, Xxxx.delete);
  route.put(`${baseUrl}/update/:id`, Xxxx.update);
}
