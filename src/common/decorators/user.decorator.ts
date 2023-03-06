import { createParamDecorator } from '@nestjs/common';

export const User = createParamDecorator((data, req) => {
  return {
    _id: '343255',
  };
});
