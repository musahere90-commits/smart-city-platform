import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FilterComplaintsDto } from './dto/filter-complaints.dto';
export declare class ComplaintsController {
    private readonly complaintsService;
    constructor(complaintsService: ComplaintsService);
    create(createComplaintDto: CreateComplaintDto, req: any): Promise<import("./schemas/complaint.schema").Complaint>;
    findAll(filterDto: FilterComplaintsDto): Promise<import("./schemas/complaint.schema").Complaint[]>;
    findMyComplaints(req: any): Promise<import("./schemas/complaint.schema").Complaint[]>;
    updateStatus(id: string, updateStatusDto: UpdateStatusDto): Promise<import("./schemas/complaint.schema").Complaint | null>;
    deleteComplaint(id: string): Promise<{
        message: string;
    }>;
}
