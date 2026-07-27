import {
  Prop,
  Schema,
  SchemaFactory,
} from '@nestjs/mongoose';

import {
  Document,
  Types,
} from 'mongoose';


export type ComplaintDocument =
  Complaint & Document;


@Schema({
  timestamps: true,
})
export class Complaint {


  @Prop({
    required: true,
  })
  title: string;



  @Prop({
    required: true,
  })
  description: string;



  @Prop({
    required: true,
    enum: [
      'Road',
      'Water',
      'Electricity',
      'Garbage',
      'Other',
    ],
  })
  category: string;



  @Prop({
    enum: [
      'Pending',
      'In Progress',
      'Resolved',
      'Rejected',
    ],
    default: 'Pending',
  })
  status: string;



  @Prop({
    type: Types.ObjectId,
    ref: 'User',
    required: true,
  })
  userId: Types.ObjectId;

}


export const ComplaintSchema =
  SchemaFactory.createForClass(
    Complaint,
  );