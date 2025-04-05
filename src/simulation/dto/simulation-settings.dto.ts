import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Min, Max } from 'class-validator';

export class SimulationSettingsDto {
  @ApiProperty({
    description: 'Множитель скорости симуляции (1 = реальное время, 2 = ускорение в 2 раза)',
    default: 60,
    minimum: 1,
    maximum: 1000,
  })
  @IsNumber()
  @Min(1)
  @Max(1000)
  speed: number;

  @ApiProperty({
    description: 'Коэффициент увеличения трафика в пиковые часы (12:00-14:00)',
    default: 2.5,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber()
  @Min(1)
  @Max(5)
  peakHourFactor: number;

  @ApiProperty({
    description: 'Среднее количество новых покупателей в минуту',
    default: 1,
    minimum: 0.1,
    maximum: 10,
  })
  @IsNumber()
  @Min(0.1)
  @Max(10)
  customerArrivalRate: number;

  @ApiProperty({
    description: 'Максимальная длина очереди, после которой покупатели начинают искать другие кассы',
    default: 5,
    minimum: 1,
    maximum: 20,
  })
  @IsNumber()
  @Min(1)
  @Max(20)
  maxQueueLength: number;

  @ApiProperty({
    description: 'Среднее время в минутах, которое покупатель проводит в магазине',
    default: 15,
    minimum: 1,
    maximum: 60,
  })
  @IsNumber()
  @Min(1)
  @Max(60)
  browsingTime: number;
} 