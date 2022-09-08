import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { deleteToDo } from "../../businessLogic/ToDo";
import { createLogger } from '../../utils/logger';

const logger = createLogger('deleteTodo');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Remove a TODO item by id
    console.log("Deleting an item", event);
    logger.info("Deleting an item", event);

    try {
        const authorization = event.headers.Authorization;
        const split = authorization.split(' ');
        const jwtToken = split[1];

        const todoId = event.pathParameters.todoId;

        const deleteData = await deleteToDo(todoId, jwtToken);

        logger.info("Item has been deleted", deleteData);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: deleteData,
        }
    } catch (err) {
        logger.error('Fail to delete item', err)
    }

};
