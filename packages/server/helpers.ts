import {faker} from '@faker-js/faker';

export type Billboard = {
    x: number;
    y: number;
    id: string;
    billboardText: string;
    advertiser: string;
    address: string;
    photosTaken: number;
    image: string;
};

export function createFakeBillboard(options?: {
    id?: string;
    x?: number;
    y?: number;
    photosTaken?: number;
}): Billboard {
    return {
        id: options?.id ?? faker.database.mongodbObjectId(),
        x: options?.x ?? faker.number.int({max: 100, min: -100}),
        y: options?.y ?? faker.number.int({max: 100, min: -100}),
        photosTaken: options?.photosTaken ?? faker.number.int({max: 10}),
        advertiser: faker.company.name(),
        address: faker.location.streetAddress(),
        billboardText: faker.commerce.productDescription(),
        image: faker.image.urlPicsumPhotos({height: 250, width: 400, blur: 0})
    };
}
