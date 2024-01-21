import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';

// Param to get the ID on the request and validate before continue to run the other functions
export const IdValidation = createParamDecorator(
  (data: string, ctx: ExecutionContext) => {
    // Accessing te HTTP request through the context to get the parameters that was used
    const request = ctx.switchToHttp().getRequest();
    const paramValue = request.params[data];

    // Converting the string to a number
    const intValue = Number(paramValue);

    // Checking if the ID is a number
    if (isNaN(intValue)) {
      throw new BadRequestException('The ID needs to be a number');
    }

    // Checking if it is not out of the integer scope of the postgres
    if (-2147483648 < intValue && intValue > 2147483647) {
      throw new BadRequestException(
        'Provided number is out of range for an integer.',
      );
    }

    // Checking if the ID provided is an integer
    if (!Number.isInteger(intValue)) {
      throw new BadRequestException('Provided an ID which is an integer.');
    }

    return intValue;
  },
);
