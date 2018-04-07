import { BaseModelResponse } from './BaseModelResponse';
import { ChatAnswer } from './ChatAnswer';
import { ChatQuestion } from './ChatQuestion';


export class ChatMainModel extends BaseModelResponse {
    questions: ChatQuestion;
    answer: ChatAnswer;
}

