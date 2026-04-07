import { ValidateNested } from "class-validator";
import { UserDtoProject } from "./create-user-projects.dto";
import { Type } from "class-transformer";

export class usersProjectsDto{
    @ValidateNested()
    @Type(()=> UserDtoProject)
    users !: UserDtoProject[];
}