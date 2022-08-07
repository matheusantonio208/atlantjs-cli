import { Router } from 'express';
import  from './.controller';

export default function routes(
  route: Router,
  baseUrl: string,
  middleware?: any,
): void {
  route.post(`${baseUrl}/store`, .store);
  route.get(`${baseUrl}/index/:id`, .index);
  route.get(`${baseUrl}/show`, .show);
  route.delete(`${baseUrl}/delete/:id`, .delete);
  route.put(`${baseUrl}/update/:id`, .update);
}
