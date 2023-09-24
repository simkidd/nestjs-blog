// import { ObjectType, Field, registerEnumType } from '@nestjs/graphql';
// import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// import { Types } from 'mongoose';


// // Register the enum type for GraphQL
// registerEnumType(UserRole, {
//   name: 'UserRole',
// });

// // Register the enum type for GraphQL
// registerEnumType(UserStatus, {
//   name: 'UserStatus',
// });

// @ObjectType()
// @Schema({ timestamps: true })
// export class Auth {
//   @Field()
//   id: string;

//   @Field(() => String)
//   @Prop()
//   email: string;

//   @Field({ nullable: true })
//   emailToken: string;

//   @Field(() => String)
//   @Prop()
//   password: string;

//   @Field(() => UserStatus)
//   @Prop({
//     enum: UserStatus,
//     default: UserStatus.active,
//   })
//   status?: UserStatus;

//   @Field(() => Boolean)
//   @Prop({ default: false })
//   isVerified?: boolean;

// }

// export const AuthSchema = SchemaFactory.createForClass(Auth);
