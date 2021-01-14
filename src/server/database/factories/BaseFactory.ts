
export abstract class BaseFactory {
    abstract defineObject(): object;

    async produce(count: number): Promise<object[]> {
        let objects: Array<object> = [];
        for (let i = 0; i < count; i++) {
            objects[i] = this.defineObject();
        }
        return objects;
    }
}