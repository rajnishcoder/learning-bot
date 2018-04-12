import { classToPlain, plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';
import { KeyNames } from '../framework/StorageUtil';

export class ApiGenerator {


}
export class JsonParser {
    static parseJson<T>(response: any, type: ClassType<T>): T {
        const parsedResponse = plainToClass(type, response as object);
        return parsedResponse;
    }

    static parseJsonString(response: any, type: ClassType<any>): any {
        const parsedResponse = plainToClass(type, response as object);
        return parsedResponse;
    }

    static parseJsonArray(response: any, type: ClassType<any>): any {
        const parsedResponse = plainToClass(type, response);
        return parsedResponse;
    }

}
