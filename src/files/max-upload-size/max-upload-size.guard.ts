import { CanActivate, ExecutionContext, Injectable, NotFoundException, PayloadTooLargeException } from '@nestjs/common';
import { request } from 'http';
import { Observable } from 'rxjs';
import { TasksService } from 'src/tasks/tasks.service';

@Injectable()
export class MaxUploadSizeGuard implements CanActivate {
    constructor(private taskService: TasksService){}

  async canActivate(
    context: ExecutionContext,
  ):Promise<boolean>{
    
    
  
    const req = context.switchToHttp().getRequest();
    const id = req.params.idTask;
    const task = await this.taskService.findOne(id);
    if(!task) throw new NotFoundException()

    const contentLength = parseInt(req.headers['content-length'], 10);
   
    if(contentLength > task.fileSize) throw new PayloadTooLargeException()

    return true;
  }
}
