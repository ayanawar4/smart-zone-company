import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { ProjectCostItem } from './project-cost-item.entity';
import { ProjectInstallItem } from './project-install-item.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { UpdateProjectDto } from './dto/update-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project) private repo: Repository<Project>,
    @InjectRepository(ProjectCostItem) private costRepo: Repository<ProjectCostItem>,
    @InjectRepository(ProjectInstallItem) private installRepo: Repository<ProjectInstallItem>,
  ) {}

  findAll() {
    return this.repo.find({
      relations: ['costItems', 'installItems'],
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number) {
    const project = await this.repo.findOne({
      where: { id },
      relations: ['costItems', 'installItems', 'fundEntries'],
    });
    if (!project) throw new NotFoundException('Project not found');
    return project;
  }

  async create(dto: CreateProjectDto) {
    const { costItems, installItems, ...rest } = dto;
    const project = this.repo.create(rest as Partial<Project>);
    const saved = await this.repo.save(project);
    if (costItems?.length) {
      await this.costRepo.save(
        costItems.map((i) => this.costRepo.create({ ...i, projectId: saved.id })),
      );
    }
    if (installItems?.length) {
      await this.installRepo.save(
        installItems.map((i) => this.installRepo.create({ ...i, projectId: saved.id })),
      );
    }
    return this.findOne(saved.id);
  }

  async update(id: number, dto: UpdateProjectDto) {
    const project = await this.findOne(id);
    const { costItems, installItems, ...rest } = dto;
    Object.assign(project, rest);
    await this.repo.save(project);
    return this.findOne(id);
  }

  async remove(id: number) {
    const project = await this.findOne(id);
    await this.repo.remove(project);
    return { success: true };
  }

  async addCostItem(projectId: number, item: Partial<ProjectCostItem>) {
    await this.findOne(projectId);
    const saved = await this.costRepo.save(this.costRepo.create({ ...item, projectId }));
    await this.recalcTotals(projectId);
    return saved;
  }

  async addInstallItem(projectId: number, item: Partial<ProjectInstallItem>) {
    await this.findOne(projectId);
    const saved = await this.installRepo.save(this.installRepo.create({ ...item, projectId }));
    await this.recalcTotals(projectId);
    return saved;
  }

  async removeCostItem(projectId: number, itemId: number) {
    await this.costRepo.delete({ id: itemId, projectId });
    await this.recalcTotals(projectId);
    return { success: true };
  }

  async removeInstallItem(projectId: number, itemId: number) {
    await this.installRepo.delete({ id: itemId, projectId });
    await this.recalcTotals(projectId);
    return { success: true };
  }

  private async recalcTotals(projectId: number) {
    const costItems = await this.costRepo.find({ where: { projectId } });
    const installItems = await this.installRepo.find({ where: { projectId } });
    const projectCostTotal = costItems.reduce((s, i) => s + (i.totalPrice || 0), 0);
    const installationTotal = installItems.reduce((s, i) => s + (i.totalPrice || 0), 0);
    await this.repo.update(projectId, { projectCostTotal, installationTotal });
  }
}
