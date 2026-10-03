type APIError = {
  message: string;
  code?: number;
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
