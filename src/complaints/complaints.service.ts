import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

import {
  Complaint,
  ComplaintDocument,
} from './schemas/complaint.schema';

import { CreateComplaintDto } from './dto/create-complaint.dto';

@Injectable()
export class ComplaintsService {
  constructor(
    @InjectModel(Complaint.name)
    private complaintModel: Model<ComplaintDocument>,
  ) {}

  async create(
    createComplaintDto: CreateComplaintDto,
    userId: string,
  ): Promise<Complaint> {
    const complaint = new this.complaintModel({
      ...createComplaintDto,
      userId: new Types.ObjectId(userId),
      status: 'Pending',
    });

    return complaint.save();
  }

  async findAll(): Promise<Complaint[]> {
    return this.complaintModel.find().populate('userId').exec();
  }
}