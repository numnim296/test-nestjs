import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common'
import { FastifyReply, FastifyRequest } from 'fastify'
import { get } from 'lodash'

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  private logger = new Logger(HttpExceptionFilter.name)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp()
    const request = ctx.getRequest<FastifyRequest>()
    const response = ctx.getResponse<FastifyReply>()
    const status = exception.getStatus()
    const ignoreStatus = [404, 401, 403]
    const requestData = {
      path: request.url,
      method: request.method,
      params: request.params,
      body: request.body,
      query: request.query,
    }
    const responseData = {
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message: status === 400 ? get(exception.getResponse(), 'message', '') : exception.message,
    }

    if (!ignoreStatus.includes(status)) {
      this.logger.error({
        request: requestData,
        response: responseData,
      })
    }

    response.status(status).send(responseData)
  }
}
