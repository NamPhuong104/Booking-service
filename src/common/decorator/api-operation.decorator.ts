import { applyDecorators } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiForbiddenResponse,
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';

interface ApiOperatorDecoratorOptions {
  type?: any;
  summary: string;
  description: string;
}

export function ApiOperationDecorator({
  type,
  summary,
  description,
}: ApiOperatorDecoratorOptions) {
  return applyDecorators(
    ApiOperation({ summary }),
    ApiOkResponse({
      type,
      description,
    }),
    ApiUnauthorizedResponse({ description: 'Token is invalid' }), //401
    ApiForbiddenResponse({ description: 'Do not have permission' }), //403
    ApiBadRequestResponse({ description: 'Invalid data' }), //400
    ApiUnprocessableEntityResponse({ description: 'Invalid data' }), //422
    ApiInternalServerErrorResponse({
      description: 'Internal server error, please try later',
    }), // 500
  );
}
