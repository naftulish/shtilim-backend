class ValidationError {
    public status:number = 400;
    public message:string;
    public constructor(msg:string) { this.message = msg; }
}

export default ValidationError;


export class ClientError {
    public constructor(public message: string, public status: number) { }
}

export class UnauthorizedError extends ClientError {
    public constructor(message: string) {
        super(message, 401);
    }
}