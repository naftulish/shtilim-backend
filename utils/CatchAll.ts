// import express, { Request, Response } from "express";

// function catchAll(err:any, req:Request, response:Response)
// {
//     console.log(err);
//     // response.status(400).send("err.message");
//     // response.send(err.message)
//     response.json({})
// }

// export default catchAll;

import { Request, Response, NextFunction } from "express";

function catchAll(err: any, req: Request, res: Response, next: NextFunction) {
    console.log(err);
    res.status(err.status || 500).send(err.message);
}

export default catchAll;


