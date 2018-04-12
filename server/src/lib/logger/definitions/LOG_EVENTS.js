module.exports = {
  RESPONSE: {
    RESPONDING_OK: {
      id: 'RES_200',
      msg: 'RESPONSE_RESPONDING_OK',
      description: 'Responding 200 OK to client',
    },
    RESPONDING_UNAUTHORIZED: {
      id: 'RES_401',
      msg: 'RESPONSE_RESPONDING_UNAUTHORIZED',
      description: 'Responding 401 to client',
    },
    RESPONDING_UNEXPECTED_ERROR: {
      id: 'RES_500',
      msg: 'RESPONSE_RESPONDING_UNEXPECTED_ERROR',
      description: 'Responding 500 to client',
    },
  },
  REQUEST: {
    START: {
      id: 'REQ_00',
      msg: 'REQUEST_STARTED',
      description: 'An API request has started',
    },
    COMPLETE: {
      id: 'REQ_01',
      msg: 'REQUEST_COMPLETE',
      description: 'Request completed without an error',
    },
    COMPLETE_WITH_ERRORS: {
      id: 'REQ_02',
      msg: 'REQUEST_COMPLETE_WITH_ERRORS',
      description: 'Request completed with a 500 series error',
    },
    UNEXPECTED_ERROR: {
      id: 'REQ_03',
      msg: 'REQUEST_UNEXPECTED_ERROR',
      description: 'Something unexpected happened',
    },
  },
  SERVICE: {
    SERVICE_STARTING: {
      id: 'SERVICE_00',
      msg: 'SERVICE_STARTING',
      description: 'Starting service',
    },
  },
  ERROR: {
    UNEXPECTED_ERROR: {
      id: 'ERROR_00',
      msg: 'ERROR_UNEXPECTED_ERROR',
      description: 'An unexpected error occurred',
    },
  },
};
