import 'source-map-support/register'

import { APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler } from 'aws-lambda';
import { getAllToDo } from "../../businessLogic/ToDo";
import { createLogger } from '../../utils/logger';

const logger = createLogger('getTodo');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Get all TODO items for a current user
    console.log("Getting Todo", event);
    logger.info("Getting Todo", event);

    try {
        const authorization = event.headers.Authorization;
        const split = authorization.split(' ');
        const jwtToken = split[1];

        const toDos = await getAllToDo(jwtToken);

        logger.info("Todo item has been got.", toDos);

        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
            },
            body: JSON.stringify({
                "items": toDos,
            }),
        }
    } catch (error) {
        logger.error('Fail to get Todo item', error)
    }
};
