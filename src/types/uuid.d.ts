/* tslint:disable */

declare module "uuid" {
    type OutputBuffer = ArrayLike<number>;

    export interface V1Options {
        node?: number[];
        clockseq?: number;
        msecs?: number | Date;
        nsecs?: number;
    }

    export type V4Options = { random: number[] } | { rng(): number[] };

    export type v1String = (options?: V1Options) => string;
    export type v1Buffer = <T extends OutputBuffer>(options: V1Options | null | undefined, buffer: T, offset?: number) => T;
    export type v1 = v1String & v1Buffer;

    export type v4String = (options?: V4Options) => string;
    export type v4Buffer = <T extends OutputBuffer>(options: V4Options | null | undefined, buffer: T, offset?: number) => T;
    export type v4 = v4String & v4Buffer;
    interface UuidStatic {
        v1: v1;
        v4: v4;
    }

    const uuid: UuidStatic & v4;
    export default uuid;
}
