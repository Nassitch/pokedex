import { CallHandler, ExecutionContext, HttpException, HttpStatus, Injectable, NestInterceptor } from "@nestjs/common";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { catchError, Observable, throwError } from "rxjs";

@Injectable()
export class PrismaInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    return next.handle().pipe(
      catchError((error) => {
        if (error instanceof PrismaClientKnownRequestError) {
          if (error.code === 'P2002') {
            return throwError(() => new HttpException('Ressource déjà éxistante.', HttpStatus.CONFLICT));
          }
        }
        return throwError(() => error);
      })
    );
  }
}