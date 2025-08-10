// Import decorators and tools from NestJS’s Mongoose integration
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
// Import Mongoose Document type to extend from
import { Document } from 'mongoose';
// This class is a MongoDB schema
@Schema()
// It’s a special kind of object that can be saved to the MongoDB database.
export class User extends Document {
@Prop({ required: true })
name: string;
    @Prop({ required: true, unique: true })
    email: string;

    @Prop({ required: true })
    password: string;
  @Prop({ required: true, enum: ['admin', 'developer', 'reporter'] })
    role:string;
    @Prop({ 
  type: [String], 
  required: true 
})
BugsReported: string[];}
// Create a schema from the class to be used with MongoDB
export const UserSchema = SchemaFactory.createForClass(User);