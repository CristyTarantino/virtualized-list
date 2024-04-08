import {ListItem} from "@/interfaces";
import {faker} from "@faker-js/faker";
import {UniqueEnforcer} from "enforce-unique";

const uniqueEnforcerIsbn = new UniqueEnforcer();

export function createRandomProduct(): ListItem {
    const name = faker.commerce.productName();
    const description = faker.commerce.productDescription();
    const price = faker.commerce.price({symbol: '£'});
    const isbn = uniqueEnforcerIsbn.enforce(
        () =>
            faker.commerce.isbn({}),
        {
            maxTime: 50,
            maxRetries: 50,
        }
    );
    const id = isbn;

    return {
        name,
        description,
        price,
        isbn,
        id,
    };
}
