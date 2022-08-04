import { Response } from 'express';

interface CustomResponse<T = Record<string, unknown>>
  extends Response<{
    success: boolean;
    data?: T;
    message?: string;
    error?: string;
  }> {}

export default CustomResponse;
