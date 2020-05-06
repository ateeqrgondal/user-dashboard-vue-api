
/*
*
* To transform JSON response to our desirable response
*
* */

export default {
  prepareThenPaginate (response) {
    return {
      code: response.status,
      message: response.data.message,
      data: response.data.data,
      lastPage: response.data.lastPage
    }
  },
  prepareThen (response) {
    return {
      code: response.status,
      message: response.data.message,
      data: response.data.data
    }
  },
    prepareValidationCatch (error) {
    return {
      code: error.response.data.code,
      errors: error.response.data.errors
    }
  },
  prepareGeneralCatch (error) {
    return {
      code: error.response.status,
      message: error.response.data.message,
      success: error.response.data.success
    }
  },
  prepareCatch (error) {
    if (error.response.status === 422) {
      return this.prepareValidationCatch(error)
    } else {
      return this.prepareGeneralCatch(error)
    }
  }
}
