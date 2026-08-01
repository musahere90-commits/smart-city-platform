import {
  Controller,
  Post,
  Get,
  Patch,
  Body,
  UseGuards,
  Req,
  Param,
  Query,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiTags,
} from '@nestjs/swagger';

import { ComplaintsService } from './complaints.service';
import { CreateComplaintDto } from './dto/create-complaint.dto';
import { UpdateStatusDto } from './dto/update-status.dto';
import { FilterComplaintsDto } from './dto/filter-complaints.dto';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';

@ApiTags('Complaints')
@ApiBearerAuth('JWT-auth')
@Controller('complaints')
@UseGuards(JwtAuthGuard)
export class ComplaintsController {
  constructor(
    private readonly complaintsService: ComplaintsService,
  ) {}

  // Create Complaint
  @Post()
  create(
    @Body() createComplaintDto: CreateComplaintDto,
    @Req() req: any,
  ) {
    return this.complaintsService.create(
      createComplaintDto,
      req.user.userId,
    );
  }

  // Get All Complaints (with optional status filter)
  @Get()
  findAll(
    @Query() filterDto: FilterComplaintsDto,
  ) {
    return this.complaintsService.filterComplaints(
      filterDto,
    );
  }

  // Get Logged-in User Complaints
  @Get('my')
  findMyComplaints(@Req() req: any) {
    return this.complaintsService.findMyComplaints(
      req.user.userId,
    );
  }

  // Update Complaint Status (Admin Only)
  @Patch(':id/status')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin')
  updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdateStatusDto,
  ) {
    return this.complaintsService.updateStatus(
      id,
      updateStatusDto.status,
    );
  }
}