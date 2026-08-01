import { Model } from 'mongoose';
import { Complaint, ComplaintDocument } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dto/create-complaint.dto';
export declare class ComplaintsService {
    private complaintModel;
    constructor(complaintModel: Model<ComplaintDocument>);
    create(createComplaintDto: CreateComplaintDto, userId: string): Promise<Complaint>;
    findAll(): Promise<Complaint[]>;
    findMyComplaints(userId: string): Promise<Complaint[]>;
    updateStatus(id: string, status: string): Promise<Complaint | null>;
}
