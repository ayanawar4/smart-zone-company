import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { ProjectCostItem } from './project-cost-item.entity';
import { ProjectInstallItem } from './project-install-item.entity';
import { ProjectFundEntry } from './project-fund-entry.entity';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, ProjectCostItem, ProjectInstallItem, ProjectFundEntry])],
  controllers: [ProjectsController],
  providers: [ProjectsService],
  exports: [TypeOrmModule],
})
export class ProjectsModule {}
