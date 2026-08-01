import { IsIn } from 'class-validator';

export class UpdateStatusDto {
  @IsIn([
    'Pending',
    'In Progress',
    'Resolved',
    'Rejected',
  ])
  status: string;
}