import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
    catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();

        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message= exception.message;

        if (exception.code === 'P2025') {
            status = HttpStatus.NOT_FOUND;
            message = 'Ressource non trouvé';
        }

        response.status(status).json({
            statusCode: status,
            timeStamp: new Date().toISOString(),
            path: request.url,
            message: message,
        });
    }
}