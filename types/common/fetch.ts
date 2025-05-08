export type RetrieveError = {
	message: string;
	description?: string;
};

export type RetrieveResponse<T> =
	| {
			success: true;
			error: null;
			data: T;
	  }
	| {
			success: false;
			error: RetrieveError;
			data: null;
	  };
