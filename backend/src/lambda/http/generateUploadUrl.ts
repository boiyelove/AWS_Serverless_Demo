import 'source-map-support/register'

import {APIGatewayProxyEvent, APIGatewayProxyResult, APIGatewayProxyHandler} from 'aws-lambda'
import {generateUploadUrl} from "../../businessLogic/ToDo";
import { createLogger } from '../../utils/logger';

const logger = createLogger('generateUploadUrl');

export const handler: APIGatewayProxyHandler = async (event: APIGatewayProxyEvent): Promise<APIGatewayProxyResult> => {
    // TODO: Return a presigned URL to upload a file for a TODO item with the provided id
    console.log("Generating an upload url", event);
    logger.info("Generating an upload url", event);

    try {

    const todoId = event.pathParameters.todoId;
    const URL = await generateUploadUrl(todoId);
    
    logger.info("Upload url has been generated", URL);

    return {
        statusCode: 202,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify({
            uploadUrl: URL,
        })
    };
} catch (err) {
    logger.error('Fail to generate upload url', err)
}
};