import { Field, InputType } from "@nestjs/graphql";

@InputType()
export class FilterPostInput {
    @Field()
    search: string;
    @Field()
    limit: string;
    @Field()
    skip: string;
    @Field()
    category: string;
    @Field()
    pageNumber: string;
}