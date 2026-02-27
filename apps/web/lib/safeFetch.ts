import z, { ZodSchema } from 'zod';
import { env } from './env';

/**
 * Fetch data from API and validate the response using a Zod schema.
 *
 * @template T - Zod schema type
 * @param {T} schema - Zod schema to validate the response data
 * @param {URL | RequestInfo} url - API endpoint (relative to env.API_URL)
 * @param {RequestInit} [init] - Optional fetch init options
 * @returns {Promise<[string | null, z.TypeOf<T> | null]>} - Returns a tuple of [errorMessage, validatedData]
 */
export const safeFetch = async <T extends ZodSchema<unknown>>(
  schema: T,
  url: URL | RequestInfo,
  init?: RequestInit,
): Promise<[string | null, z.TypeOf<T> | null]> => {
  try {
    const response: Response = await fetch(`${env.API_URL}${url}`, {
      ...init,
      signal: AbortSignal.timeout(10000), // 10 秒超时
    });

    const res = await response.json();

    if (!response.ok) {
      return [res.message, null];
    }

    const validateFields = schema.safeParse(res);

    if (!validateFields.success) {
      console.log(res);
      console.log('Validation errors:', validateFields.error);
      return [`Validation error: ${validateFields.error.message}`, null];
    }

    return [null, validateFields.data];
  } catch (error) {
    // 处理网络错误和超时
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error';
    console.log('safeFetch error:', errorMessage);
    return [`Network error: ${errorMessage}`, null];
  }
};
