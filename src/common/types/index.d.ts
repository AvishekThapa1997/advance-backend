export type APIFieldError = {
  code: string;
  message: string;
};

type APIError = {
  message: string;
  code?: number;
  fields?: Record<string, APIFieldError>;
};

export type APIResult<D> =
  | {
      success: true;
      data: D;
      message?: string;
    }
  | {
      success: false;
      error: APIError;
    };
