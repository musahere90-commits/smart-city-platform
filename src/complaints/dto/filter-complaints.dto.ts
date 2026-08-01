import { IsOptional, IsIn } from 'class-validator';

export class FilterComplaintsDto {
  @IsOptional()
  @IsIn(['Pending', 'In Progress', 'Resolved'])
  status?: string;
}