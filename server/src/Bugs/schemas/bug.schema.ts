// src/bug/schemas/bug.schema.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BugDocument = Bug & Document;

@Schema({ timestamps: true })
export class Bug {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ required: true })
  priority: string;
  @Prop({ required: true, enum: ['Solved', 'In progress', 'Unsolved'] })
    status:string;

  @Prop()
  projectName: string;
/*@Prop({ required: true, enum: ['admin', 'developer', 'reporter'] })
role: string;
*/
  @Prop()
  createdBy: string;

  @Prop()
  assignedTo: string;
}

export const BugSchema = SchemaFactory.createForClass(Bug);
