import { Model } from 'mongoose';
import { Complaint, ComplaintDocument } from './schemas/complaint.schema';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { FilterComplaintsDto } from './dto/filter-complaints.dto';
export declare class ComplaintsService {
    private complaintModel;
    constructor(complaintModel: Model<ComplaintDocument>);
    create(createComplaintDto: CreateComplaintDto, userId: string): Promise<Complaint>;
    findAll(): Promise<Complaint[]>;
    filterComplaints(filterDto: FilterComplaintsDto): Promise<Complaint[]>;
    updateStatus(id: string, status: string): Promise<Complaint | null>;
    findMyComplaints(userId: string): Promise<Complaint[]>;
    deleteComplaint(id: string): Promise<{
        message: string;
    }>;
    getStatistics(): Promise<{
        totalComplaints: number;
        pending: number;
        resolved: number;
    }>;
}
