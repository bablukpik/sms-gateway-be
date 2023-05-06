const httpStatus = {
  codes: {
    OK: 200,
    CREATED: 201,
    NOT_FOUND: 404,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    INTERNAL_SERVER_ERROR: 500,
    ALREADY_EXIST: 409,
  },
  messages: {
    CREATED: 'Successfully Created!',
    UPDATED: 'Successfully Updated!',
    DELETED: 'Successfully Deleted!',
    NOT_FOUND: 'Not Found!',
    BAD_REQUEST: 'Invalid Request!',
    UNAUTHORIZED: 'Invalid Credentials!',
    FORBIDDEN: 'Forbidden!',
    INTERNAL_SERVER_ERROR: 'Server Error!',
    ALREADY_EXIST: 'Already Exists!',
  }
}

export default httpStatus;
