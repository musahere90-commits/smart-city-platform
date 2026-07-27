import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
export declare class ComplaintsController {
    private readonly complaintsService;
    constructor(complaintsService: ComplaintsService);
    create(createComplaintDto: CreateComplaintDto, req: any): Promise<import("./schemas/complaint.schema").Complaint>;
    findAll(): Promise<import("./schemas/complaint.schema").Complaint[]>;
}
