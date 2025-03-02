class ErrorResponse extends Error{
    constructor(status,message=""){
        super(message);
        this.status = status || 400;
    }
}

export default ErrorResponse