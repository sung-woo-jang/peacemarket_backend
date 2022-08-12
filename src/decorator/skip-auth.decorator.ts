import { SetMetadata } from '@nestjs/common';

export const Public = () => SetMetadata(process.env.JWT_IS_PUBLIC_KEY, true);
