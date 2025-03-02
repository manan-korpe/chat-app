class Success{
    constructor(status=200,message="",data={}){
        this.status = status;
        this.hasError = false;
        this.message = message;
        this.data = data
    }

    SendResponse(res){
        return res.status(this.status).json({hasError:this.hasError,message:this.message,data:this.data});
    }
}

export default Success