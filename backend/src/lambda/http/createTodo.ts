import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyHandler, APIGatewayProxyResult } from 'aws-lambda'
import { CreateTodoRequest } from '../../requests/CreateTodoRequest';
import { createToDo } from "../../businessLogic/ToDo";
import { createLogger } from '../../utils/logger'

const logger = createLogger('createTodo');

export const handler: APIGatewayProxyHandler = async (
    event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {

    // TODO: Implement creating a new TODO item
    logger.info("Creating an event ", event);

    try {
        const authorization = event.headers.Authorization;
        const split = authorization.split(' ');
        const jwtToken = split[1];

        const newTodo: CreateTodoRequest = JSON.parse(event.body);
        const toDoItem = await createToDo(newTodo, jwtToken);

        logger.info("Item has been created", toDoItem);

        return {
            statusCode: 201,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                "item": toDoItem
            }),
        }
    } catch (err) {
        logger.error('Fail to create item', err)
    }
};
