export type RetrieveError = {
	message: string;
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
