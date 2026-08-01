import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
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

  // Create Complaint
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

  // Get All Complaints
  async findAll(): Promise<Complaint[]> {
    return this.complaintModel
      .find()
      .populate('userId')
      .exec();
  }

  // Get Logged-in User Complaints
  async findMyComplaints(
    userId: string,
  ): Promise<Complaint[]> {
    return this.complaintModel
      .find({
        userId: new Types.ObjectId(userId),
      })
      .populate('userId')
      .exec();
  }

  // Update Complaint Status
  async updateStatus(
    id: string,
    status: string,
  ): Promise<Complaint | null> {
    const complaint = await this.complaintModel.findByIdAndUpdate(
      id,
      { status },
      { new: true },
    );

    if (!complaint) {
      throw new NotFoundException('Complaint not found');
    }

    return complaint;
  }
}