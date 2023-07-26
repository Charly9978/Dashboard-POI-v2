import {
  IsBoolean,
  IsDate,
  IsInt,
  Length,
  Min,
  Max,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { IncidentCinetic, IncidentStatus } from '../entities/incident.entity';
import { Type } from 'class-transformer';

export class CreateIncidentDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  close_at?: Date;

  @Type(() => Date)
  @IsDate()
  date: Date;

  @IsBoolean()
  is_exercice = true;

  @Length(10)
  description: string;

  @Length(3)
  localisation: string;

  @IsOptional()
  @IsBoolean()
  emergency_call?: boolean = false;

  @IsOptional()
  @IsBoolean()
  containment?: boolean = false;

  @IsOptional()
  @IsBoolean()
  evacuation?: boolean = false;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  victims_death?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  victims_ua?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  victims_ur?: number = 0;

  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  victims_involved?: number = 0;

  @IsOptional()
  @IsString()
  impact_on_site?: string;

  @IsOptional()
  @IsString()
  impact_outside?: string;

  @IsOptional()
  @IsString()
  external_communication?: string;

  @IsOptional()
  @IsString()
  observations?: string;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  poi_open_at?: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  poi_close_at?: Date;

  @IsOptional()
  @IsBoolean()
  external_effect?: boolean = false;

  @IsOptional()
  @IsEnum(IncidentStatus)
  status?: IncidentStatus = IncidentStatus.EVOLUTION;

  @IsOptional()
  @Length(0, 45)
  @IsString()
  chemical_name?: string;

  @IsOptional()
  @Length(0, 45)
  @IsString()
  chemical_qty?: string;

  @IsOptional()
  @IsEnum(IncidentCinetic)
  cinetic?: IncidentCinetic;

  @IsOptional()
  @IsBoolean()
  risk_thermic?: boolean = false;

  @IsOptional()
  @IsBoolean()
  risk_toxic?: boolean = false;

  @IsOptional()
  @IsBoolean()
  risk_surpressure?: boolean = false;

  @IsOptional()
  @IsBoolean()
  risk_environmental?: boolean = false;

  @IsOptional()
  @IsBoolean()
  facilities_stop?: boolean = false;

  @IsOptional()
  @IsString()
  facilties_actions?: string;

  @IsOptional()
  @IsBoolean()
  possibleRiskForPopulation?: boolean = false;

  @IsOptional()
  @IsBoolean()
  contactMunicipalty?: boolean = false;

  @IsOptional()
  @IsBoolean()
  contactNeighbourhood?: boolean = false;

  @IsInt()
  @Min(1)
  @Max(10)
  crisisRoomId: number;
}
