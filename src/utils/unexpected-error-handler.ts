import { exitHandler } from './exit-handler';

export const unexpectedErrorHandler = (error: any, event: string) => {
  console.error(`=== ${event} ===`);
  console.error(error);
  // exitHandler({ event });
};
