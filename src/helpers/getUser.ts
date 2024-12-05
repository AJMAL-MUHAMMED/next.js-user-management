import { NextRequest } from "next/server";
import jwt from "jsonwebtoken";


export const getUser = (request: NextRequest) => {
   try {
      const token = request.cookies.get("authToken")?.value ?? ""
      const decodedToken: any = jwt.verify(token, process.env.SECURE_PASS!)
      return decodedToken.id
   } catch (error: any) {
      throw new Error(error)
   }

}