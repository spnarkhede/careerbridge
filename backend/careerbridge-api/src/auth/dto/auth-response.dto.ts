import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
class UserResponse {
  @Field(() => ID)
  id: string;

  @Field()
  email: string;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  role: string;
}

@ObjectType()
export class AuthResponse {
  @Field(() => UserResponse)
  user: UserResponse;

  @Field()
  accessToken: string;
}
