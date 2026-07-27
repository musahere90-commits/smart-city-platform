import {
  IsNotEmpty,
  IsString,
  IsIn,
} from 'class-validator';

import {
  ApiProperty,
} from '@nestjs/swagger';


export class CreateComplaintDto {


  @ApiProperty({
    example: 'Water supply issue',
    description: 'Title of the complaint',
  })
  @IsString()
  @IsNotEmpty()
  title: string;



  @ApiProperty({
    example: 'No water available in my area',
    description: 'Detailed complaint description',
  })
  @IsString()
  @IsNotEmpty()
  description: string;



  @ApiProperty({
    example: 'Water',
    enum: [
      'Road',
      'Water',
      'Electricity',
      'Garbage',
      'Other',
    ],
  })
  @IsIn([
    'Road',
    'Water',
    'Electricity',
    'Garbage',
    'Other',
  ])
  category: string;

}