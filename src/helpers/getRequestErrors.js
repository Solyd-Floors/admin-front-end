
export default error => {
    if (!error) return []
    if (error.networkError) {
        if (error.networkError.result) 
            if (error.networkError.result.errors) return error.networkError.result.errors;
    }
    alert(error.message)
    return [ error.message ];
}